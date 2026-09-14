/* =============================================================
   tests/harness.js
   Golden master: spustí fixtures, sesbírá findings / impression
   a raw bloky z region.compile() a zapíše je jako base64 do #golden-out.

   Porovnání se snapshotem dělá tests/run.py (prohlížeč jen měří).
   ============================================================= */
(function () {
    const PROBLEMS = [];

    function note(message) {
        if (PROBLEMS.indexOf(message) === -1) PROBLEMS.push(message);
    }

    /* ---------- převod symbolického stavu na index ---------- */
    function resolveStateValue(localId, cfg, value) {
        if (value === undefined || value === null) return 0;

        if (!cfg) {
            note(`chybí konfigurace tlačítka "${localId}"`);
            return typeof value === 'string' ? 0 : (value ? 1 : 0);
        }

        if (cfg.type === 'standard') {
            if (typeof value === 'number') return value;
            if (value === true) return 1;
            // "_add_normal" má stavy ['normal','normal','normal!'] -> 'normal' znamená úroveň 1
            if (value === 'normal') return 1;
            const idx = cfg.states ? cfg.states.indexOf(value) : -1;
            if (idx < 0) {
                note(`neznámý stav "${value}" u "${localId}" (${(cfg.states || []).join(' | ')})`);
                return 0;
            }
            return idx;
        }

        // basic / basic_custom
        if (typeof value === 'string') return value === '0' ? false : true;
        return Boolean(value);
    }

    function setKeyed(target, key, value) {
        const idx = key.indexOf(':');
        if (idx === -1) { note(`klíč "${key}" nemá tvar region:localId`); return; }
        target[`${Store.activeTab}_${key.slice(0, idx)}_${key.slice(idx + 1)}`] = value;
    }

    /* ---------- sestavení jednoho fixture ---------- */
    function buildFixture(fx) {
        const examId = fx.exam;
        const exam = getExamById(examId);
        if (!exam) throw new Error(`neznámé vyšetření "${examId}"`);

        const s = fx.settings || {};
        APP_SETTINGS.grammarMerging = s.grammarMerging !== undefined ? s.grammarMerging : true;
        APP_SETTINGS.optText = s.optText !== undefined ? s.optText : true;
        APP_SETTINGS.recist = !!s.recist;
        APP_SETTINGS.suvWord = !!s.suvWord;
        APP_SETTINGS.hidePredefined = false;

        Store._silent = true;
        Store.exams = new Set(fx.exams || [examId]);
        Store.activeTab = examId;
        Store.pastDate = fx.past || '';
        Store.indication = fx.indication || '';
        Store.instances = JSON.parse(JSON.stringify(fx.instances || {}));
        Store.buttonStates = {};
        Store.customTexts = {};
        Store.fields = { suv_jater: '3.0', suv_jater_minule: '3.0' };
        Store.expandedNotes = {};
        Store.activeTable = fx.activeTable || null;
        Store.previewTarget = null;
        Store.previewTargetOrigText = '';
        Store.previewIsAll = false;

        // 1) layouty -> zaregistrují ButtonConfigs (identicky jako v UI).
        //    Strom ILD se staví podle aktuálního stavu, proto registraci a aplikaci
        //    stavů opakujeme, dokud se neustálí (nové úrovně tlačítek se tím doregistrují).
        const regionIds = new Set(exam.regs);
        Object.keys(Store.instances).forEach(t => regionIds.add(t.split('_')[0]));
        const unresolved = new Set();

        const applyButtons = () => {
            Object.entries(fx.buttons || {}).forEach(([key, value]) => {
                const i = key.indexOf(':');
                const regionId = key.slice(0, i);
                const localId = key.slice(i + 1);
                const cfg = ButtonConfigs[`${examId}_${regionId}_${localId}`];
                if (!cfg) { unresolved.add(key); return; }
                unresolved.delete(key);
                Store.buttonStates[`${examId}_${regionId}_${localId}`] =
                    resolveStateValue(localId, cfg, value);
            });
            Object.entries(fx.custom || {}).forEach(([key, value]) => setKeyed(Store.customTexts, key, value));
            /* Stavy bez ButtonConfigs (kliknutí do SVG mapy, např. lokalizace léze prostaty). */
            Object.entries(fx.rawStates || {}).forEach(([key, value]) => setKeyed(Store.buttonStates, key, value));
            Object.entries(fx.fields || {}).forEach(([key, value]) => {
                if (key.indexOf(':') === -1) Store.fields[key] = value;
                else setKeyed(Store.fields, key, value);
            });
        };

        for (let pass = 0; pass < 8; pass++) {
            regionIds.forEach(rId => {
                const region = REGIONS[rId];
                if (region && region.layout) UI.generateLayoutNodes(rId, region);
            });
            applyButtons();
        }
        unresolved.forEach(key => note(`neznámé tlačítko "${key}" (${examId})`));

        Store._silent = false;
        UI.updatePastDateVisibility(!!Store.pastDate);

        // 2b) UI smoke: přesunuté metody (ui-nav/ui-details/ui-report) musí projít
        //     bez výjimky – jinak by se rozbité rozdělení projevilo až v prohlížeči.
        ['render', 'renderExams', 'renderDetails', 'renderActiveTable', 'refreshOrganNavLesubs']
            .forEach(name => {
                if (typeof UI[name] !== 'function') { note(`UI.${name} chybí`); return; }
                try { UI[name](name === 'render' ? 'exams' : undefined); }
                catch (e) { note(`UI.${name}() selhalo: ${e.message}`); }
            });

        // 3) výstup, který vidí uživatel
        UI.renderReport();
        const findings = ClipboardService.formatReport(true);
        const impression = ClipboardService.formatConclusion();
        const report = ClipboardService.formatAll();

        // 4) raw bloky z compile() (před sanitizací) – regresní síť pro refaktor regionů
        const regionsToCompile = new Set(exam.regs);
        Object.keys(REGIONS).forEach(rId => {
            const prefix = `${examId}_${rId}_`;
            const active = (obj) => Object.keys(obj).some(k => k.startsWith(prefix) && obj[k]);
            if (active(Store.buttonStates) || active(Store.fields) || active(Store.customTexts)) {
                regionsToCompile.add(rId);
            }
        });

        const blocks = {};
        regionsToCompile.forEach(rId => {
            const region = REGIONS[rId];
            if (!region || !region.compile) return;
            const compiled = region.compile(createContext(rId, examId));
            blocks[rId] = JSON.parse(JSON.stringify({
                report: compiled.report || [],
                main: (compiled.conclusion && compiled.conclusion.main) || [],
                incidental: (compiled.conclusion && compiled.conclusion.incidental) || []
            }));
        });

        return { findings, impression, report, blocks };
    }

    function toBase64(str) {
        const bytes = new TextEncoder().encode(str);
        let bin = '';
        const CHUNK = 0x8000;
        for (let i = 0; i < bytes.length; i += CHUNK) {
            bin += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK));
        }
        return btoa(bin);
    }

    function run() {
        const fixtures = {};
        const errors = [];
        FIXTURES.forEach(fx => {
            try {
                fixtures[fx.id] = buildFixture(fx);
            } catch (err) {
                errors.push({ id: fx.id, error: String((err && err.stack) || err) });
            }
        });

        // Validace hotového textu: co by měl Corrections ještě opravit.
        const issues = [];
        FIXTURES.forEach(fx => {
            const built = fixtures[fx.id];
            if (!built) return;
            Corrections.validate(built.findings).forEach(i => issues.push(`${fx.id} [findings] ${i.level}: ${i.message}`));
            Corrections.validate(built.impression).forEach(i => issues.push(`${fx.id} [závěr] ${i.level}: ${i.message}`));
        });

        const payload = {
            fixtureCount: FIXTURES.length,
            problems: PROBLEMS.concat(
                Array.from(new Set(window.__BMISS__ || [])).sort()
            ),
            issues,
            errors,
            fixtures
        };

        document.getElementById('golden-out').textContent =
            'GOLDEN_BEGIN' + toBase64(JSON.stringify(payload, null, 2)) + 'GOLDEN_END';
        window.__GOLDEN_READY__ = true;
    }

    /* ---------- režim ?mode=ids: výpis všech registrovaných tlačítek ---------- */
    // Zrcadlí WB_LESION_BLOCKS z js/ui.js (dokud nebude hoistnuto do modulu).
    const FALLBACK_LESION_BLOCKS = {
        brain: ['brain_lesion_main', 'brain_hemo_main'],
        neck: ['neck_lesion_main', 'neck_lymphnode_main'],
        thorax: ['thorax_lesion_main', 'thorax_lymphnode_main'],
        abdomen: ['abdomen_lesion_main', 'abdomen_lymphnode_main'],
        skeleton: ['skeleton_lesion_main'],
        soft: ['soft_lesion_main']
    };

    function runIdsMode() {
        const dump = {};
        const allExams = Object.keys(EXAMS).reduce((acc, group) => acc.concat(EXAMS[group]), []);

        allExams.forEach(exam => {
            const keys = {};

            Store._silent = true;
            Store.exams = new Set([exam.id]);
            Store.activeTab = exam.id;
            Store.pastDate = '';
            Store.indication = '';
            Store.instances = {};
            Store.buttonStates = {};
            Store.customTexts = {};
            Store.fields = {};
            Store.expandedNotes = {};
            exam.regs.forEach(rId => {
                const blocks = FALLBACK_LESION_BLOCKS[rId] || [];
                blocks.forEach(table => Store.instances[table] = ['1']);
            });

            const register = table => {
                Store.activeTable = table;
                exam.regs.forEach(rId => {
                    const region = REGIONS[rId];
                    if (region && region.layout) UI.generateLayoutNodes(rId, region);
                });
                Object.entries(ButtonConfigs)
                    .filter(([k]) => k.startsWith(`${exam.id}_`))
                    .forEach(([k, cfg]) => {
                        keys[k.slice(exam.id.length + 1)] = {
                            type: cfg.type,
                            states: cfg.states || null
                        };
                    });
            };

            [null, 'thorax_ild_main'].forEach(register);

            // Progresivně zapnout všechny známé "basic" přepínače po jednom (one-hot),
            // aby se vygenerovaly i skryté větve (např. celý strom ILD).
            let prevCount = -1;
            for (let pass = 0; pass < 12; pass++) {
                const ids = Object.keys(ButtonConfigs).filter(k => k.startsWith(`${exam.id}_`));
                ids.forEach(id => {
                    const cfg = ButtonConfigs[id];
                    if (cfg.type === 'standard') { Store.buttonStates[id] = 0; return; }
                    if (cfg.type !== 'basic' && cfg.type !== 'basic_custom') return;
                    ids.forEach(other => {
                        const oc = ButtonConfigs[other];
                        if (oc && (oc.type === 'basic' || oc.type === 'basic_custom')) {
                            Store.buttonStates[other] = false;
                        }
                    });
                    Store.buttonStates[id] = true;
                    register('thorax_ild_main');
                });
                const now = Object.keys(keys).length;
                if (now === prevCount) break;
                prevCount = now;
            }

            Store._silent = false;
            dump[exam.id] = Object.fromEntries(
                Object.entries(keys).sort(([a], [b]) => a.localeCompare(b))
            );
        });

        document.getElementById('golden-out').textContent =
            'GOLDEN_BEGIN' + toBase64(JSON.stringify(dump, null, 2)) + 'GOLDEN_END';
        window.__GOLDEN_READY__ = true;
    }

    /* ---------- režim ?mode=validate: kontrola jednoslovných vět ---------- */
    function runValidateMode() {
        const dump = {};
        VALIDATION_CASES.forEach(c => {
            /* Bereme všechny nálezy, ne jen krátké věty - snapshot tak hlídá
               i zkratkovou logiku (aby se opravdová chyba nepřehlédla). */
            const hit = Corrections.validate(c.text).map(i => `${i.level}: ${i.message}`);
            dump[c.id] = { text: c.text, hlasi: hit };
        });

        document.getElementById('golden-out').textContent =
            'GOLDEN_BEGIN' + toBase64(JSON.stringify(dump, null, 2)) + 'GOLDEN_END';
        window.__GOLDEN_READY__ = true;
    }

    document.addEventListener('DOMContentLoaded', () => {
        try {
            if (/[?&]mode=ids/.test(location.search)) runIdsMode();
            else if (/[?&]mode=validate/.test(location.search)) runValidateMode();
            else run();
        } catch (err) {
            document.getElementById('golden-out').textContent =
                'GOLDEN_BEGIN' + toBase64(JSON.stringify({ fatal: String((err && err.stack) || err) })) + 'GOLDEN_END';
            window.__GOLDEN_READY__ = true;
        }
    });
})();
