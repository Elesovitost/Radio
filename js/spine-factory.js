/* =============================================================
   spine-factory.js
   Jedna implementace páteře (layout + compile) pro LS / C / T.

   Region soubory (Region_LSp.js, Region_Cp.js, Region_Tp.js) už
   nejsou kopie ani generátory - jsou to jen konfigurace: co je
   anatomicky a textově odlišné. Logika je zde, na jednom místě.

   Načítá se PŘED region soubory (viz index.html / tests/golden.html).
   ============================================================= */

/* Tlačítka společná pro všechny páteře. Klíč = btn, id dostane prefix regionu. */
const SPINE_BUTTONS = {
    axis: { states: ['přímá', '(', '((', '(((', ')', '))', ')))'] },
    shape: { states: ['obr. tělo', 'schmorl', 'H plotna', 'D plotna', 'klínovitá', 'výrazná', 'propagace'] },
    shift: { states: ['posun', 'ventr', 'ventr+lýza', 'dorz', 'dorz+lýza'] },
    lesion: { states: ['léze', 'hemangiom', 'atyp', 'maligní'] },
    surgery: { states: ['obr. těla', 'stabilizace', 'náhrada'] },
    degen: { states: ['disk', 'DDD I', 'DDD II', 'DDD III'] },
    disc_surgery: { states: ['disku', 'náhrada'] },
    modic: { states: ['Modic', 'Modic I', 'Modic II', 'Modic III', 'destrukce'] },
    protrusion: { states: ['protruze', 'bulging', 'herniace', 'spondylofyty', 'kombinace'] },
    dir_f_r: { type: 'basic', text: 'F' },
    dir_p_r: { type: 'basic', text: 'P' },
    dir_c: { type: 'basic', text: 'C' },
    dir_p_l: { type: 'basic', text: 'P' },
    dir_f_l: { type: 'basic', text: 'F' },
    migration: { states: ['M0', 'M↑', 'M↓'] },
    arthrosis: { states: ['facets', 'I', 'II', 'III', 'edém'] },
    arthro_r: { type: 'basic', text: 'R' },
    arthro_l: { type: 'basic', text: 'L' },
    sten_f: { states: ['F', '0', '1', '2', '3'] },
    sten_p: { states: ['P', '0', '1', '2', '3', 'S', 'F', 'A'] },
    sten_c: { states: ['C', '0', '1', '2', '3'] },
    expansion: { states: ['expanze', 'ED-cysta', 'ID-meningeom', 'ID-schwannom', 'IM-ependymom', 'IM-astrocytom', 'IM-hemangiobl.'] },
    exp_side: { states: ['0', 'R', 'L', 'C'] },
    lamin: { states: ['lamin', 'obou', 'vpravo', 'vlevo'] },
    myelopatie: { states: ['myelopatie', 'centrálně', 'vpravo', 'vlevo', 'difuzně'] }
};

/* =============================================================
   cfg:
     regionId, examId, btnPrefix, tableBase  - identifikátory
     title, adjective                        - text regionu
     curvature: { key, label, states, map }   - lordóza / kyfóza
     lstv: false | [stavy]                    - přechodný obratel
     cordCompression                          - "agregací kaudy" / "útlakem míchy"
     stabilization                            - "Zadní" / "Přední"
     foramenRootFrom: 'vLabel' | 'fRoot'      - čím se popisuje kořen ve foraminu
     hideFirstVertebra                        - skrytá obratlová řádka (C2)
     myeloLevels (nepovinné)                  - výčet etáží myelopatie
     levels: [{ v, disc?, root?, fRoot? }, ...]  (poslední jen { v })
   ============================================================= */
function defineSpineRegion(cfg) {
    const R = cfg.regionId;
    const P = cfg.btnPrefix;
    const ADJ = cfg.adjective;
    const CURV = cfg.curvature;

    /* Prefixy se odvodí z labelů - nikdy se neopisují ručně. */
    const levels = cfg.levels.map((l) => Object.assign({}, l));
    levels.forEach((l) => {
        l.vPfx = l.v.toLowerCase();
        l.sPfx = l.disc ? l.disc.toLowerCase().replace(/\//g, '_') : null;
    });
    const segments = levels.filter((l) => l.disc).map((l) => ({
        label: l.disc, vPfx: l.vPfx, sPfx: l.sPfx, vLabel: l.v, root: l.root, fRoot: l.fRoot || l.v
    }));

    const myeloLevels = cfg.myeloLevels
        || levels.map((l) => l.v).filter((v, i, a) => a.indexOf(v) === i);

    const buttons = Object.assign({}, SPINE_BUTTONS, {
        [`${P}_op`]: { states: ['ne', 'ano'] },
        [CURV.key]: { states: CURV.states },
        exp_segment: { states: ['etáž'].concat(segments.map((s) => s.label)) },
        myelo_level: { states: ['etáž'].concat(myeloLevels, 'custom') }
    });
    if (cfg.lstv) buttons.lstv = { states: cfg.lstv };

    return {
        title: cfg.title,
        reportLayout: 'block',
        buttons,

        layout: (helpers) => {
            /* Stejný klíč jako button-factory — cfg.examId není reálné exam id. */
            const examId = Store.activeTab || 'default';
            const isOpActive = Store.buttonStates[`${examId}_${R}_${P}_op`] === 1;
            const opV = (id) => isOpActive ? ['operace:', { btn: 'surgery', id }] : '';
            const opD = (idDisc, idLamin) => isOpActive
                ? ['operace:', { btn: 'disc_surgery', id: idDisc }, { btn: 'lamin', id: idLamin }]
                : '';

            const axisCells = [
                'Osa:', { btn: 'axis', id: `${P}_axis` },
                CURV.label, { btn: CURV.key, id: `${P}_${CURV.key}` }
            ];
            if (cfg.lstv) axisCells.push('LSTV:', { btn: 'lstv', id: `${P}_lstv` });
            axisCells.push('Operace:', { btn: `${P}_op`, id: `${P}_op` });

            const axisTable = helpers.TableGrid(`${cfg.tableBase}_axis`, [
                axisCells,
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '']
            ]);

            const pGroup = (id) => {
                const val = Store.buttonStates[`${examId}_${R}_${id}_protrusion`];
                const isActive = val !== undefined && val !== 0;
                const group = [{ btn: 'protrusion', id: `${id}_protrusion` }];
                if (isActive) {
                    group.push(
                        { field: 'mm', id: `${id}_protrusion_mm`, placeholder: 'mm' },
                        { btn: 'dir_f_r', id: `${id}_d_f_r` },
                        { btn: 'dir_p_r', id: `${id}_d_p_r` },
                        { btn: 'dir_c', id: `${id}_d_c` },
                        { btn: 'dir_p_l', id: `${id}_d_p_l` },
                        { btn: 'dir_f_l', id: `${id}_d_f_l` },
                        { btn: 'migration', id: `${id}_migration` }
                    );
                }
                return group;
            };

            const sGroup = (idPrefix) => {
                const val = Store.buttonStates[`${examId}_${R}_${idPrefix}_shift`];
                const isActive = val !== undefined && val !== 0;
                const group = [{ btn: 'shift', id: `${idPrefix}_shift` }];
                if (isActive) {
                    group.push({ field: 'mm', id: `${idPrefix}_shift_mm`, placeholder: 'mm' });
                }
                return group;
            };

            const aGroup = (id) => {
                const val = Store.buttonStates[`${examId}_${R}_${id}_arthro`];
                const isActive = val !== undefined && val !== 0;
                const group = [{ btn: 'arthrosis', id: `${id}_arthro` }];
                if (isActive) {
                    group.push(
                        { btn: 'arthro_r', id: `${id}_arthro_r` },
                        { btn: 'arthro_l', id: `${id}_arthro_l` }
                    );
                }
                return group;
            };

            /* Obratlová řádka + řádka disku pro každou etáž; poslední obratel stojí sám. */
            const rows = [];
            levels.forEach((lvl, index) => {
                if (!(cfg.hideFirstVertebra && index === 0)) {
                    rows.push([
                        lvl.v,
                        { btn: 'shape', id: `${lvl.vPfx}_shape` },
                        { btn: 'lesion', id: `${lvl.vPfx}_lesion` },
                        lvl.disc ? sGroup(lvl.vPfx) : '',
                        '', '', '',
                        opV(`${lvl.vPfx}_surgery`)
                    ]);
                }
                if (lvl.disc) {
                    rows.push([
                        lvl.disc,
                        { btn: 'degen', id: `${lvl.sPfx}_degen` },
                        { btn: 'modic', id: `${lvl.sPfx}_modic` },
                        pGroup(lvl.sPfx),
                        [
                            { btn: 'sten_f', id: `${lvl.sPfx}_f_r` },
                            { btn: 'sten_p', id: `${lvl.sPfx}_p_r` },
                            { btn: 'sten_c', id: `${lvl.sPfx}_c` },
                            { btn: 'sten_p', id: `${lvl.sPfx}_p_l` },
                            { btn: 'sten_f', id: `${lvl.sPfx}_f_l` }
                        ],
                        [{ field: 'size', id: `${lvl.sPfx}_size`, placeholder: 'dur.vak mm' }],
                        aGroup(lvl.sPfx),
                        opD(`${lvl.sPfx}_disc_surgery`, `${lvl.sPfx}_lamin`)
                    ]);
                }
            });
            const table = helpers.TableGrid(`${cfg.tableBase}_main`, rows);

            const slider = el('div', { className: 'row', style: 'margin: 10px 0 15px 0; justify-content: flex-start; width: 100%; padding-left: 5px;' }, [
                el('span', { className: 'label', style: 'font-size: 10px;', textContent: 'text závěru:  První strukturální změny' }),
                el('label', { className: 'switch', style: 'margin: 0 0px;' }, [
                    el('input', {
                        type: 'checkbox',
                        id: `${R}_conc_mode_toggle`,
                        checked: Store.fields[`${R}_conc_mode`] !== 'pathology',
                        onchange: (e) => {
                            Store.fields[`${R}_conc_mode`] = e.target.checked ? 'stenosis' : 'pathology';
                            UI.renderReport();
                        }
                    }),
                    el('span', { className: 'slider' })
                ]),
                el('span', { className: 'label', style: 'font-size: 10px;', textContent: 'První stenózy' })
            ]);

            const expTable = helpers.TableGrid(`${cfg.tableBase}_exp`, [
                [{ btn: 'exp_segment', id: 'exp_segment' }, [{ btn: 'expansion', id: 'exp_type' }, { btn: 'exp_side', id: 'exp_side' }, { field: 'size', id: 'exp_size', placeholder: 'rozměr' }]],
                [{ btn: 'myelo_level', id: 'myelo_level' }, [{ btn: 'myelopatie', id: 'myelopatie' }, { field: 'mm', id: 'myelo_size', placeholder: 'mm' }]]
            ]);
            expTable.classList.remove('tbl-center');
            expTable.querySelectorAll('.row').forEach((row) => row.style.justifyContent = 'flex-start');

            const spacer = el('div', { style: 'height: 20px;' });
            const spacer2 = el('div', { style: 'height: 20px;' });

            const customAdd = helpers.Table1col(`${P}_ost_add`, [
                { field: 'text', id: `${P}_custom_desc`, placeholder: 'vlastní...popis...' },
                { field: 'text', id: `${P}_custom_conc`, placeholder: 'vlastní...závěr...' }
            ]);

            return [axisTable, table, spacer, expTable, spacer2, customAdd, slider];
        },

        compile: (ctx) => {
            let reportBlocks = [];
            let mainConc = [];
            let incConc = [];

            reportBlocks.push({ type: 'heading', text: `${cfg.title}:`, regionId: R, action: 'open-region' });

            const formatSentence = (str) => {
                if (!str) return '';
                let s = str.trim();
                s = capitalize(s);
                if (!s.endsWith('.')) s += '.';
                return s;
            };

            const joinCzech = (arr) => {
                const valid = arr.filter((v) => v && v.trim() !== '');
                if (valid.length === 0) return '';
                if (valid.length === 1) return valid[0];
                if (valid.length === 2) return valid.join(' a ');
                return valid.slice(0, -1).join(', ') + ' a ' + valid[valid.length - 1];
            };

            let staticPhysio = [];
            let staticPatho = [];
            let concStaticSentences = [];
            let concAxisLordosis = [];

            const axisState = ctx.text(`${P}_axis`);
            if (axisState && axisState !== '0') {
                const axisMap = {
                    'přímá': 'Osa přímá',
                    '(': 'mírná dextrokonvexní skolióza',
                    '((': 'dextrokonvexní skolióza',
                    '(((': 'výrazná dextrokonvexní skolióza',
                    ')': 'mírná sinistrokonvexní skolióza',
                    '))': 'sinistrokonvexní skolióza',
                    ')))': 'výrazná sinistrokonvexní skolióza'
                };
                const axisText = axisMap[axisState];
                if (axisText) {
                    const sentence = formatSentence(axisText);
                    if (axisState === 'přímá') {
                        staticPhysio.push(sentence);
                    } else {
                        staticPatho.push(sentence);
                        concAxisLordosis.push(sentence);
                    }
                }
            }

            const curvState = ctx.text(`${P}_${CURV.key}`);
            if (curvState && curvState !== '0') {
                const curvText = CURV.map[curvState];
                if (curvText) {
                    const sentence = formatSentence(curvText);
                    if (curvState === 'přiměřená') {
                        staticPhysio.push(sentence);
                    } else {
                        staticPatho.push(sentence);
                        concAxisLordosis.push(sentence);
                    }
                }
            }

            if (cfg.lstv) {
                const lstvState = ctx.text(`${P}_lstv`);
                if (lstvState && lstvState !== 'není' && lstvState !== '0') {
                    const lstvText = formatSentence(`přechodný LS obratel, počítán jako ${lstvState}`);
                    staticPatho.push(lstvText);
                    concStaticSentences.push(lstvText);
                }
            }

            if (concStaticSentences.length > 0) {
                mainConc.push({ type: 'frame', text: concStaticSentences.join(' ') });
            }

            let collShapes = {};
            let collSurgeries = {};
            let segmentBlocks = [];
            let hasSegmentPathology = false;
            let hasSpinalStenosis = false;
            let hasForaminalStenosis = false;
            let collLesions = {};
            let collLamin = {};
            let collModic = {};
            let collDegenNahrada = [];
            let dddIIPlusCount = 0;
            let dddIIPlusWithStenosis = 0;
            let hasUncomplicatedDegen = false;
            let segmentConcItems = [];
            let segmentLesionItems = [];

            const effectRank = (e) => {
                const t = e.typeOrder;
                const s = e.sev;
                if (t === 1) return s === 3 ? 100 : (s === 2 ? 70 : 50);
                if (t === 2) return s === 3 ? 95 : (s === 2 ? 80 : 30);
                return s === 3 ? 90 : (s === 2 ? 60 : 40);
            };

            const isOpActive = ctx.isActive(`${P}_op`);

            segments.forEach((seg, segIndex) => {
                let sentences = [];
                let activeCauses = [];
                let mappedEffects = [];
                let fibrosisArr = [];
                let adhesionArr = [];

                /* Kořen ve foraminu se v některých regionech popisuje jinou etáží. */
                const fRoot = cfg.foramenRootFrom === 'fRoot' ? seg.fRoot : seg.vLabel;

                const shape = ctx.text(`${seg.vPfx}_shape`);
                if (shape && shape !== 'obr. tělo') {
                    if (shape === 'propagace') {
                        sentences.push(formatSentence('propagace zadní hrany obratl. těla dorzálně'));
                        activeCauses.push({
                            type: 'other',
                            nom: `výrazná komprese těla ${seg.vLabel} s propagací dorzálně`,
                            gen: `výrazné komprese těla ${seg.vLabel} s propagací dorzálně`
                        });
                    }
                    if (!collShapes[shape]) collShapes[shape] = [];
                    collShapes[shape].push(seg.vLabel);
                }

                const surgery = isOpActive ? ctx.text(`${seg.vPfx}_surgery`) : null;
                if (surgery && surgery !== 'operace') {
                    if (!collSurgeries[surgery]) collSurgeries[surgery] = [];
                    collSurgeries[surgery].push(seg.vLabel);
                }

                const lesion = ctx.text(`${seg.vPfx}_lesion`);
                if (lesion && lesion !== 'léze') {
                    if (!collLesions[lesion]) collLesions[lesion] = [];
                    collLesions[lesion].push(seg.vLabel);
                }

                const lamin = isOpActive ? ctx.text(`${seg.sPfx}_lamin`) : null;
                if (lamin && lamin !== 'operace') {
                    if (!collLamin[lamin]) collLamin[lamin] = [];
                    collLamin[lamin].push(seg.vLabel);
                }

                const degen = ctx.text(`${seg.sPfx}_degen`);
                let degenModifier = '';
                let degenDesc = '';

                if (degen && degen !== 'disk') {
                    if (degen === 'DDD I') {
                        degenModifier = 'mírně sníženého ';
                        degenDesc = 'mírně snížený disk';
                    }
                    else if (degen === 'DDD II') {
                        degenModifier = 'sníženého ';
                        degenDesc = 'snížený disk';
                    }
                    else if (degen === 'DDD III') {
                        degenModifier = 'výrazně sníženého ';
                        degenDesc = 'výrazně snížený disk';
                    }
                }

                const discSurgery = isOpActive ? ctx.text(`${seg.sPfx}_disc_surgery`) : null;
                if (discSurgery === 'náhrada') {
                    collDegenNahrada.push(seg.label);
                }

                const modic = ctx.text(`${seg.sPfx}_modic`);
                if (modic && modic !== 'Modic') {
                    const modicMap = { 'Modic I': 'STIR+ signál pod krycími plotnami', 'Modic II': 'T1+ signál pod krycími plotnami', 'Modic III': 'skleróza pod krycími plotnami', 'destrukce': 'destrukce krycích ploten' };
                    sentences.push(formatSentence(modicMap[modic] || modic));

                    if (modic !== 'Modic I') {
                        if (!collModic[modic]) collModic[modic] = [];
                        collModic[modic].push(seg.label);
                    }
                }

                const shift = ctx.text(`${seg.vPfx}_shift`);
                const shiftMm = ctx.field(`${seg.vPfx}_shift_mm`);
                if (shift && shift !== 'posun') {
                    const typeStr = shift.includes('ventr') ? `ventrolistéza ${seg.vLabel}` : `retrolistéza ${seg.vLabel}`;
                    const lStr = shift.includes('lýza') ? 's lýzou oblouku' : 'bez lýzy oblouku';
                    const mmStr = shiftMm ? ` o ${shiftMm} mm` : '';

                    let gradeStr = mmStr;
                    if (shiftMm) {
                        const mm = parseFloat(shiftMm.replace(',', '.'));
                        if (!isNaN(mm)) {
                            if (mm <= 7) gradeStr = ' I.st.';
                            else if (mm <= 9) gradeStr = ' I/II.st.';
                            else if (mm <= 15) gradeStr = ' II.st.';
                            else if (mm <= 17) gradeStr = ' II/III.st.';
                            else gradeStr = ' III.st.';
                        }
                    }

                    sentences.push(formatSentence(`${typeStr}${mmStr} ${shift.includes('lýza') ? 's lýzou oblouku' : ''}`));

                    activeCauses.push({
                        type: 'other',
                        nom: `${typeStr}${gradeStr} ${lStr}`.trim(),
                        gen: `${typeStr.replace('listéza', 'listézy')}${gradeStr} ${lStr}`.trim()
                    });
                }

                const dFR = ctx.isActive(`${seg.sPfx}_d_f_r`);
                const dPR = ctx.isActive(`${seg.sPfx}_d_p_r`);
                const dC  = ctx.isActive(`${seg.sPfx}_d_c`);
                const dPL = ctx.isActive(`${seg.sPfx}_d_p_l`);
                const dFL = ctx.isActive(`${seg.sPfx}_d_f_l`);

                const dirsArr = [];
                if (dFR) dirsArr.push({ id: 'F_R', name: 'foraminálně vpravo' });
                if (dPR) dirsArr.push({ id: 'P_R', name: 'paracentrálně vpravo' });
                if (dC)  dirsArr.push({ id: 'C',   name: 'centrálně' });
                if (dPL) dirsArr.push({ id: 'P_L', name: 'paracentrálně vlevo' });
                if (dFL) dirsArr.push({ id: 'F_L', name: 'foraminálně vlevo' });

                let dirLocStr = '';
                if (dirsArr.length === 1) {
                    dirLocStr = ` ${dirsArr[0].name}`;
                } else if (dirsArr.length > 1) {
                    if (dirsArr.length === 2 && dirsArr[0].id === 'F_R' && dirsArr[1].id === 'F_L') {
                        dirLocStr = ' foraminálně bilaterálně';
                    } else if (dirsArr.length === 2 && dirsArr[0].id === 'P_R' && dirsArr[1].id === 'P_L') {
                        dirLocStr = ' paracentrálně bilaterálně';
                    } else {
                        dirLocStr = ` ${dirsArr[0].name} až ${dirsArr[dirsArr.length - 1].name}`;
                    }
                }

                const protr = ctx.text(`${seg.sPfx}_protrusion`);
                const protrMm = ctx.field(`${seg.sPfx}_protrusion_mm`);
                const migration = ctx.text(`${seg.sPfx}_migration`);

                if (protr && protr !== 'protruze') {
                    const protrMap = { 'bulging': `bulging ${degenModifier}disku`.trim(), 'herniace': `herniace ${degenModifier}disku`.trim(), 'spondylofyty': 'spondylofyty okrajů krycích ploch', 'kombinace': `kombinace spondylofytů a bulgingu ${degenModifier}disku`.trim() };
                    let baseProtr = protrMap[protr] || protr;

                    if (protr === 'spondylofyty' && degenDesc) {
                        sentences.push(formatSentence(degenDesc));
                        if (degen === 'DDD III') {
                            activeCauses.push({ type: 'other', nom: 'pokročilá diskopatie', gen: 'pokročilé diskopatie' });
                        }
                    }

                    if (protrMm) baseProtr += ` o ${protrMm} mm`;

                    const protrMapConc = { 'bulging': 'bulging disku', 'herniace': 'herniace disku', 'spondylofyty': 'spondylofyty', 'kombinace': 'kombinace spondylofytů a bulgingu disku' };
                    let pTxt = protrMapConc[protr] || protr;

                    if (dirLocStr) {
                        if (['bulging', 'spondylofyty', 'kombinace'].includes(protr)) {
                            let verb = protr === 'spondylofyty' ? 'akcentovány' : (protr === 'kombinace' ? 'akcentována' : 'akcentován');
                            baseProtr += ` ${verb}${dirLocStr}`;
                            pTxt += ` ${verb}${dirLocStr}`;
                        } else {
                            baseProtr += dirLocStr;
                            pTxt += dirLocStr;
                        }
                    }

                    if (protr === 'herniace' && migration && migration !== 'M0') {
                        const migText = migration === 'M↑' ? ' s kraniální migrací' : ' s kaudální migrací';
                        baseProtr += migText;
                        pTxt += migText;
                    }

                    sentences.push(formatSentence(baseProtr));

                    activeCauses.push({
                        type: 'specific',
                        nom: pTxt,
                        gen: pTxt.replace(/\bbulging\b/g, 'bulgingu').replace(/\bspondylofyty\b/g, 'spondylofytů'),
                        match: (eff) => {
                            if (dirsArr.length === 0) return true;
                            const m = dirsArr.map((d) => d.id);
                            if (eff.id === 'F_R' && m.includes('F_R')) return true;
                            if (eff.id === 'P_R' && m.includes('P_R')) return true;
                            if (eff.id === 'C' && m.includes('C')) return true;
                            if (eff.id === 'P_L' && m.includes('P_L')) return true;
                            if (eff.id === 'F_L' && m.includes('F_L')) return true;
                            if (eff.id === 'bilat_F' && (m.includes('F_R') || m.includes('F_L'))) return true;
                            if (eff.id === 'bilat_P' && (m.includes('P_R') || m.includes('P_L'))) return true;
                            return false;
                        }
                    });
                } else if (degenDesc) {
                    sentences.push(formatSentence(degenDesc));
                    if (degen === 'DDD III') {
                        activeCauses.push({ type: 'other', nom: 'pokročilá diskopatie', gen: 'pokročilé diskopatie' });
                    }
                }

                const arthro = ctx.text(`${seg.sPfx}_arthro`);
                const arthroR = ctx.isActive(`${seg.sPfx}_arthro_r`);
                const arthroL = ctx.isActive(`${seg.sPfx}_arthro_l`);

                if (arthro && arthro !== 'facets') {
                    let sRep = '';
                    let sConc = '';

                    if (arthroR && arthroL) {
                        sRep = ' bilat.';
                        sConc = ' bilat.';
                    } else if (arthroR) {
                        sRep = ' více vpravo';
                        sConc = ' akcent. vpravo';
                    } else if (arthroL) {
                        sRep = ' více vlevo';
                        sConc = ' akcent. vlevo';
                    }

                    let modRep = '';
                    let modConc = '';
                    let edemRep = '';
                    let edemConc = '';

                    if (arthro === 'I') { modRep = 'mírná '; modConc = 'mírná '; }
                    else if (arthro === 'II') { modRep = 'střední '; modConc = 'střední '; }
                    else if (arthro === 'III') { modRep = 'výrazná '; modConc = 'pokročilá '; }
                    else if (arthro === 'edém') { modRep = 'pokročilá '; modConc = 'pokročilá '; edemRep = ' s edémem'; edemConc = ' s edémem při dekompenzaci'; }

                    let sentence = `${modRep}degenerace facetového skloubení${sRep}${edemRep}`.trim();
                    sentences.push(formatSentence(sentence));

                    let aTxt = `${modConc}facetová artróza${sConc}${edemConc}`.trim();
                    activeCauses.push({
                        type: 'other',
                        nom: aTxt,
                        gen: aTxt.replace('artróza', 'artrózy').replace('mírná', 'mírné').replace('střední', 'střední').replace('výrazná', 'výrazné').replace('pokročilá', 'pokročilé').replace('facetová', 'facetové')
                    });
                }

                const globalExpSeg = ctx.text('exp_segment');
                let expansion = null;
                let expSide = null;
                let expSize = null;

                if (globalExpSeg === seg.label) {
                    expansion = ctx.text('exp_type');
                    expSide = ctx.text('exp_side');
                    expSize = ctx.field('exp_size');
                }
                if (expansion && expansion !== 'expanze') {
                    const expMap = { 'ED-cysta': 'epidurální cystická struktura', 'ID-meningeom': 'intradurální extramedulární expanze', 'ID-schwannom': 'intradurální expanze v průběhu kořene', 'IM-ependymom': 'intramedulární expanze', 'IM-astrocytom': 'intramedulární expanze', 'IM-hemangiobl.': 'intramedulární expanze' };
                    let expText = expMap[expansion] || expansion;
                    if (expSide && expSide !== '0') {
                        const sideMap = { 'R': 'vpravo', 'L': 'vlevo', 'C': 'centrálně' };
                        expText += ` ${sideMap[expSide] || expSide}`;
                    }
                    if (expSize) {
                        if (expSize.includes('x')) expText += ` rozměru ${expSize} mm`;
                        else expText += ` diametru ${expSize} mm`;
                    }
                    sentences.push(formatSentence(expText));

                    const expMapConc = { 'ED-cysta': 'epidurální cysta', 'ID-meningeom': 'intradurální ložisko (susp. meningeom)', 'ID-schwannom': 'intradurální ložisko v průběhu kořene (susp. schwannom)', 'IM-ependymom': 'intramedulární expanze (susp. ependymom)', 'IM-astrocytom': 'intramedulární expanze (susp. astrocytom)', 'IM-hemangiobl.': 'intramedulární expanze (susp. hemangioblastom)' };
                    let eTxt = expMapConc[expansion] || expansion;
                    if (expSide && expSide !== '0') {
                        const sideMap = { 'R': 'vpravo', 'L': 'vlevo', 'C': 'centrálně' };
                        eTxt += ` ${sideMap[expSide] || expSide}`;
                    }
                    activeCauses.push({
                        type: 'specific',
                        nom: eTxt,
                        gen: eTxt.replace('cysta', 'cysty').replace('intradurální ložisko', 'intradurálního ložiska').replace('ložisko', 'ložiska'),
                        match: (eff) => {
                            if (eff.id === 'C') return true;
                            if (eff.id.includes('R') && expSide === 'R') return true;
                            if (eff.id.includes('L') && expSide === 'L') return true;
                            return false;
                        }
                    });
                }

                const valFR = ctx.text(`${seg.sPfx}_f_r`);
                const valPR = ctx.text(`${seg.sPfx}_p_r`);
                const valC  = ctx.text(`${seg.sPfx}_c`);
                const valPL = ctx.text(`${seg.sPfx}_p_l`);
                const valFL = ctx.text(`${seg.sPfx}_f_l`);

                const hasZero = (valFR === '0' || valPR === '0' || valC === '0' || valPL === '0' || valFL === '0');

                const getEffect = (val, type, side, id) => {
                    let nom = '', dat = '';
                    let sev = val === '3' ? 3 : (val === '2' || val === 'S' ? 2 : 1);
                    let typeOrder = type === 'C' ? 1 : (type === 'P' ? 2 : 3);
                    let reportStr = '';

                    if (type === 'F') {
                        const sideConc = side === 'l.dx.' ? 'vpravo' : (side === 'l.sin.' ? 'vlevo' : side);
                        if (val === '0') reportStr = `bez zúžení foramina ${side}`;
                        else if (val === '3') {
                            nom = `výrazná stenóza foramina ${sideConc} s útlakem kořene ${fRoot} ${sideConc}`;
                            dat = `výrazné stenóze foramina ${sideConc} s útlakem kořene ${fRoot} ${sideConc}`;
                            reportStr = `výrazná stenóza foramina ${side} s útlakem kořene ${fRoot} ${side}`;
                        } else {
                            nom = val === '1' ? `mírná stenóza foramina ${sideConc}` : `stenóza foramina ${sideConc}`;
                            dat = val === '1' ? `mírné stenóze foramina ${sideConc}` : `stenóze foramina ${sideConc}`;
                            reportStr = val === '1' ? `mírná stenóza foramina ${side}` : `stenóza foramina ${side}`;
                        }
                    } else if (type === 'P') {
                        if (val === '0') reportStr = `bez tlaku na kořen ${seg.root} ${side}`;
                        else if (val === '1') { nom = `naléhání na kořen ${seg.root} ${side}`; dat = `naléhání na kořen ${seg.root} ${side}`; reportStr = nom; }
                        else if (val === '2') { nom = `útlak kořene ${seg.root} ${side}`; dat = `útlaku kořene ${seg.root} ${side}`; reportStr = nom; }
                        else if (val === '3') { nom = `útlak kořene ${seg.root} ${side}`; dat = `kompresi kořene ${seg.root} ${side}`; reportStr = `komprese kořene ${seg.root} ${side}`; }
                        else if (val === 'S') { nom = `stenóza laterálního recesu ${side}`; dat = `stenóze laterálního recesu ${side}`; reportStr = nom; }
                        else if (val === 'F') {
                            fibrosisArr.push(`epidurální fibróza ${side}`);
                            sentences.push(formatSentence(`okrsek nízké SI epidurálně ${side}`));
                            return null;
                        }
                        else if (val === 'A') {
                            adhesionArr.push(`vzájemná adheze kořenů ${fRoot} a ${seg.root} ${side} v laterálním recesu nejasného klinického významu`);
                            sentences.push(formatSentence(`adheze kořenů ${fRoot} a ${seg.root} ${side} s vzájemným přitažením v laterálním recesu`));
                            return null;
                        }
                    } else if (type === 'C') {
                        const c_size = ctx.field(`${seg.sPfx}_size`);
                        let sizeText = '';
                        if (c_size && val !== '0') sizeText = c_size.includes('x') ? `(který rozměrů ${c_size} mm)` : `(který diametru ${c_size} mm AP)`;

                        if (val === '0') reportStr = 'bez tlaku na durální vak';
                        else if (val === '1') { nom = `mírná spinální stenóza`; dat = `mírné spinální stenóze`; reportStr = `mírné zúžení durálního vaku ${sizeText}`.trim(); }
                        else if (val === '2') { nom = `spinální stenóza`; dat = `spinální stenóze`; reportStr = `zúžení durálního vaku ${sizeText}`.trim(); }
                        else if (val === '3') { nom = `výrazná spinální stenóza s ${cfg.cordCompression}`; dat = `výrazné spinální stenóze s ${cfg.cordCompression}`; reportStr = `výrazné zúžení durálního vaku ${sizeText} s ${cfg.cordCompression}`.trim(); }
                    }

                    if (reportStr) {
                        if (val === '0') {
                            let activeCount = [valFR, valPR, valC, valPL, valFL].filter((v) => v && !['0', 'F', 'P', 'C'].includes(v)).length;
                            if (activeCount === 0) sentences.push(formatSentence(reportStr));
                        } else {
                            sentences.push(formatSentence(reportStr));
                        }
                    }

                    if (['0', 'F', 'P', 'C'].includes(val)) return null;
                    return { nom, dat, sev, typeOrder, id };
                };

                const getBilatEffect = (val, type, id) => {
                    let nom = '', dat = '';
                    let sev = val === '3' ? 3 : (val === '2' || val === 'S' ? 2 : 1);
                    let typeOrder = type === 'C' ? 1 : (type === 'P' ? 2 : 3);
                    let reportStr = '';

                    if (type === 'F') {
                        if (val === '3') {
                            nom = `výrazná stenóza foramin bilat. s útlakem kořenů ${fRoot} bilat.`;
                            dat = `výrazné stenóze foramin bilat. s útlakem kořenů ${fRoot} bilat.`;
                            reportStr = `výrazná stenóza obou foramin s útlakem kořenů ${fRoot} bilat.`;
                        } else {
                            nom = val === '1' ? `mírná stenóza foramin bilat.` : `stenóza foramin bilat.`;
                            dat = val === '1' ? `mírné stenóze foramin bilat.` : `stenóze foramin bilat.`;
                            reportStr = val === '1' ? `mírné zúžení obou foramin` : `zúžení obou foramin`;
                        }
                    } else if (type === 'P') {
                        if (val === '1') { nom = `naléhání na kořeny ${seg.root} bilat.`; dat = `naléhání na kořeny ${seg.root} bilat.`; reportStr = nom; }
                        else if (val === '2') { nom = `útlak kořenů ${seg.root} bilat.`; dat = `útlaku kořenů ${seg.root} bilat.`; reportStr = nom; }
                        else if (val === '3') { nom = `útlak kořenů ${seg.root} bilat.`; dat = `kompresi kořenů ${seg.root} bilat.`; reportStr = `komprese kořenů ${seg.root} bilat.`; }
                        else if (val === 'S') { nom = `stenóza laterálních recesů bilat.`; dat = `stenóze laterálních recesů bilat.`; reportStr = nom; }
                        else if (val === 'F') {
                            fibrosisArr.push(`epidurální fibróza bilat.`);
                            sentences.push(formatSentence(`okrsky nízké SI epidurálně bilat.`));
                            return null;
                        }
                        else if (val === 'A') {
                            adhesionArr.push(`vzájemná adheze kořenů ${fRoot} a ${seg.root} bilat. v laterálních recesech nejasného klinického významu`);
                            sentences.push(formatSentence(`těsné nasedání kořenů ${fRoot} a ${seg.root} bilat. v laterálních recesech`));
                            return null;
                        }
                    }

                    if (reportStr) sentences.push(formatSentence(reportStr));
                    if (['0', 'F', 'P', 'C'].includes(val)) return null;
                    return { nom, dat, sev, typeOrder, id };
                };

                if (valC && valC !== '0' && valC !== 'C') {
                    let eff = getEffect(valC, 'C', '', 'C');
                    if (eff) mappedEffects.push(eff);
                    hasSpinalStenosis = true;
                }

                if (valPR === valPL && valPR && valPR !== '0' && valPR !== 'P') {
                    let eff = getBilatEffect(valPR, 'P', 'bilat_P');
                    if (eff) mappedEffects.push(eff);
                    hasSpinalStenosis = true;
                } else {
                    if (valPR && valPR !== '0' && valPR !== 'P') { let e = getEffect(valPR, 'P', 'l.dx.', 'P_R'); if (e) mappedEffects.push(e); hasSpinalStenosis = true; }
                    if (valPL && valPL !== '0' && valPL !== 'P') { let e = getEffect(valPL, 'P', 'l.sin.', 'P_L'); if (e) mappedEffects.push(e); hasSpinalStenosis = true; }
                }

                if (valFR === valFL && valFR && valFR !== '0' && valFR !== 'F') {
                    let eff = getBilatEffect(valFR, 'F', 'bilat_F');
                    if (eff) mappedEffects.push(eff);
                    hasForaminalStenosis = true;
                } else {
                    if (valFR && valFR !== '0' && valFR !== 'F') { let e = getEffect(valFR, 'F', 'l.dx.', 'F_R'); if (e) mappedEffects.push(e); hasForaminalStenosis = true; }
                    if (valFL && valFL !== '0' && valFL !== 'F') { let e = getEffect(valFL, 'F', 'l.sin.', 'F_L'); if (e) mappedEffects.push(e); hasForaminalStenosis = true; }
                }

                mappedEffects.sort((a, b) => {
                    /* Řazení stenóz jen podle typu (spinální -> paracentrální -> foraminální),
                       případně pak podle závažnosti. */
                    if (a.typeOrder !== b.typeOrder) return a.typeOrder - b.typeOrder;
                    return b.sev - a.sev;
                });

                if (degen === 'DDD II' || degen === 'DDD III') {
                    dddIIPlusCount++;
                    if (mappedEffects.length > 0) dddIIPlusWithStenosis++;
                }

                const size = ctx.field(`${seg.sPfx}_size`);
                if (size && !(['1', '2', '3'].includes(valC))) {
                    if (size.includes('x')) sentences.push(formatSentence(`durální vak rozměrů cca ${size} mm`));
                    else sentences.push(formatSentence(`durální vak šíře ${size} mm`));
                }

                if (sentences.length > 0) {
                    hasSegmentPathology = true;
                    segmentBlocks.push({ type: 'frame', text: `${seg.label}: ${sentences.join(' ')}` });
                }

                let concLines = [];
                const isStenosisFirst = Store.fields[`${R}_conc_mode`] !== 'pathology';
                const fibrosisGenArr = fibrosisArr.map((s) => String(s).replace('fibróza', 'fibrózy'));
                const structuralNomParts = [...activeCauses.map((c) => c.nom), ...fibrosisArr, ...adhesionArr].filter(Boolean);
                const structuralGenParts = [...activeCauses.map((c) => c.gen), ...fibrosisGenArr, ...adhesionArr].filter(Boolean);

                if (mappedEffects.length > 0) {
                    const structuralNom = structuralNomParts.length ? joinCzech(structuralNomParts) : 'strukturální změny';
                    const structuralGen = structuralGenParts.length ? joinCzech(structuralGenParts) : 'strukturálních změn';

                    const effectStrNom = joinCzech(mappedEffects.map((e) => e.nom));
                    const effectStrDat = joinCzech(mappedEffects.map((e) => e.dat));

                    const prep = /^(s[bcdfghjklmnpqrstvwxz]|z[bcdfghjklmnpqrstvwxz]|š[bcdfghjklmnpqrstvwxz]|ž[bcdfghjklmnpqrstvwxz]|k|g)/i.test(effectStrDat)
                        ? 'ke'
                        : 'k';

                    if (!isStenosisFirst) {
                        concLines.push(`${structuralNom} vedoucí ${prep} ${effectStrDat}.`);
                    } else {
                        concLines.push(`${effectStrNom} na podkladě ${structuralGen}.`);
                    }
                } else {
                    const isInsignificantCause = (c) => {
                        const nom = c.nom || '';
                        if (/artróza/i.test(nom) && /pokročilá|výrazná|edém|dekompenzac/i.test(nom)) return false;
                        return /bulging|artróza|spondylofyty|diskopatie/i.test(nom);
                    };
                    const significantCauses = activeCauses.filter((c) => !isInsignificantCause(c));
                    const insignificantCauses = activeCauses.filter(isInsignificantCause);

                    significantCauses.forEach((c) => {
                        if (c && c.nom) {
                            concLines.push(hasZero ? `${c.nom} bez útlaku nervových struktur.` : `${c.nom}.`);
                        }
                    });

                    if (insignificantCauses.length > 0) {
                        hasUncomplicatedDegen = true;
                    }

                    const otherParts = [...fibrosisArr, ...adhesionArr].filter(Boolean);
                    otherParts.forEach((txt) => {
                        if (txt) concLines.push(`${txt}.`);
                    });
                }

                if (modic === 'Modic I') {
                    concLines.push('Edém krycích ploten Modic I.');
                }

                if (concLines.length > 0) {
                    let combined = concLines.map((line, idx) => {
                        let str = line.trim();
                        if (idx > 0 && str.length > 0) {
                            str = capitalize(str);
                        }
                        return str;
                    }).join(' ');
                    const rank = mappedEffects.length
                        ? Math.max(...mappedEffects.map(effectRank))
                        : 0;
                    segmentConcItems.push({ label: seg.label, text: combined, rank, segIndex });
                }

                let iParts = [];
                if (lesion === 'atyp') iParts.push(`atypické ložisko ${seg.vLabel}`);

                if (iParts.length > 0) {
                    let text = iParts.join(', ') + '.';
                    segmentLesionItems.push({ type: 'frame', text: capitalize(text) });
                }
            });

            segmentConcItems.sort((a, b) => b.rank - a.rank || a.segIndex - b.segIndex);
            const mergedSegConc = [];
            segmentConcItems.forEach((item) => {
                const last = mergedSegConc[mergedSegConc.length - 1];
                if (last && last.text === item.text) {
                    last.labels.push(item.label);
                } else {
                    mergedSegConc.push({ labels: [item.label], text: item.text });
                }
            });
            mergedSegConc.forEach((group) => {
                let body = group.text;
                if (group.labels.length > 1 && typeof pluralizeGrammar === 'function') {
                    body = pluralizeGrammar(body, 'spine');
                }
                mainConc.push({ type: 'frame', text: `${group.labels.join(', ')}: ${body}` });
            });
            if (segmentLesionItems.length > 0) {
                mainConc.push(...segmentLesionItems);
            }

            let modicConcSentences = [];
            if (collModic['Modic II']) modicConcSentences.push(`Tuková degenerace krycích ploten ${joinCzech(collModic['Modic II'])} Modic II.`);
            if (collModic['Modic III']) modicConcSentences.push(`Skleróza krycích ploten ${joinCzech(collModic['Modic III'])} Modic III.`);
            if (collModic['destrukce']) modicConcSentences.push(`Destrukce krycích ploten ${joinCzech(collModic['destrukce'])}.`);

            Object.keys(collModic).forEach((k) => {
                if (!['Modic I', 'Modic II', 'Modic III', 'destrukce'].includes(k)) {
                    modicConcSentences.push(`Změny krycích ploten typu ${k} ${joinCzech(collModic[k])}.`);
                }
            });

            if (modicConcSentences.length > 0) {
                mainConc.push({ type: 'frame', text: modicConcSentences.join(' ') });
            }

            let shapeSentences = [];
            let concShapeSentences = [];
            if (collShapes['schmorl']) {
                const txt = collShapes['schmorl'].length > 1 ? `Schmorlovy uzly ${collShapes['schmorl'].join(', ')}.` : `Schmorlův uzel ${collShapes['schmorl'].join(', ')}.`;
                shapeSentences.push(txt);
                concShapeSentences.push(txt);
            }
            if (collShapes['H plotna']) {
                const txt = `Imprese horní krycí plotny ${collShapes['H plotna'].join(', ')}.`;
                shapeSentences.push(txt);
                concShapeSentences.push(txt);
            }
            if (collShapes['D plotna']) {
                const txt = `Imprese dolní krycí plotny ${collShapes['D plotna'].join(', ')}.`;
                shapeSentences.push(txt);
                concShapeSentences.push(txt);
            }
            if (collShapes['klínovitá']) {
                const txt = `Klínovitá komprese ${collShapes['klínovitá'].join(' - ')}.`;
                shapeSentences.push(txt);
                concShapeSentences.push(txt);
            }
            if (collShapes['výrazná']) {
                const txt = `Výrazná komprese těla ${collShapes['výrazná'].join(', ')}.`;
                shapeSentences.push(txt);
                concShapeSentences.push(txt);
            }
            if (collShapes['propagace']) {
                shapeSentences.push(`Výrazná komprese těla ${collShapes['propagace'].join(', ')} s propagací dorzálně.`);
            }

            let surgSentences = [];
            if (collSurgeries['stabilizace']) surgSentences.push(`${cfg.stabilization} stabilizace ${collSurgeries['stabilizace'].join('-')}.`);
            if (collSurgeries['náhrada']) surgSentences.push(`Náhrada těla ${collSurgeries['náhrada'].join(', ')}.`);
            if (collDegenNahrada.length > 0) surgSentences.push(`Náhrada disku ${collDegenNahrada.join(', ')}.`);
            if (collLamin['obou']) surgSentences.push(`Bilaterální laminektomie ${collLamin['obou'].join(', ')}.`);
            if (collLamin['vpravo']) surgSentences.push(`Laminektomie ${collLamin['vpravo'].join(', ')} vpravo.`);
            if (collLamin['vlevo']) surgSentences.push(`Laminektomie ${collLamin['vlevo'].join(', ')} vlevo.`);

            let lesionSentences = [];
            if (collLesions['hemangiom']) {
                let pl = collLesions['hemangiom'].length > 1;
                lesionSentences.push(`${pl ? 'Hemangiomy' : 'Hemangiom'} v obratlovém těle ${collLesions['hemangiom'].join(', ')}.`);
            }
            if (collLesions['maligní']) {
                let pl = collLesions['maligní'].length > 1;
                lesionSentences.push(`${pl ? 'Suspektní ložiska' : 'Suspektní ložisko'} v těle ${collLesions['maligní'].join(', ')}.`);
                mainConc.push({ type: 'frame', text: lesionSentences[lesionSentences.length - 1] });
            }

            if (staticPhysio.length > 0) {
                reportBlocks.push({ type: 'frame', text: staticPhysio.join(' '), dimmed: true });
            }

            if (staticPatho.length > 0) {
                reportBlocks.push({ type: 'frame', text: staticPatho.join(' ') });
            }

            if (shapeSentences.length > 0) {
                reportBlocks.push({ type: 'frame', text: shapeSentences.join(' ') });
                reportBlocks.push({ type: 'frame', text: 'Ostatní těla přiměřených výšek.', dimmed: true });
                if (concShapeSentences.length > 0) {
                    mainConc.push({ type: 'frame', text: concShapeSentences.join(' ') });
                }
            } else {
                reportBlocks.push({ type: 'frame', text: 'Obratlová těla přiměřených výšek.', dimmed: true });
            }

            if (!hasSegmentPathology) {
                reportBlocks.push({ type: 'frame', text: 'Meziobratlové segmenty s disky přiměřených výšek bez výraznějších protruzí, bez facetových artróz.', dimmed: true });
                reportBlocks.push({ type: 'frame', text: 'Páteřní kanál a foramina jsou volná.', dimmed: true });
            }

            if (surgSentences.length > 0) {
                reportBlocks.push({ type: 'frame', text: surgSentences.join(' ') });
                mainConc.push({ type: 'frame', text: surgSentences.join(' ') });
            }
            if (lesionSentences.length > 0) {
                reportBlocks.push({ type: 'frame', text: lesionSentences.join(' ') });
            }

            if (segmentBlocks.length > 0) {
                reportBlocks.push(...segmentBlocks);
            }

            if (hasSegmentPathology) {
                reportBlocks.push({ type: 'frame', text: 'Ostatní meziobratlové segmenty bez výraznější morfologické patologie.', dimmed: true });

                if (hasSpinalStenosis && hasForaminalStenosis) {
                    reportBlocks.push({ type: 'frame', text: 'V ostatních segmentech bez jiných výraznějších spinálních a foraminálních stenóz.', dimmed: true });
                } else if (hasSpinalStenosis) {
                    reportBlocks.push({ type: 'frame', text: 'V ostatních segmentech bez zřetelných spinálních stenóz. Foramina jsou volná.', dimmed: true });
                } else if (hasForaminalStenosis) {
                    reportBlocks.push({ type: 'frame', text: 'Páteřní kanál zůstává volný. Bez jiných zřetelných foraminálních stenóz.', dimmed: true });
                } else {
                    reportBlocks.push({ type: 'frame', text: 'Páteřní kanál a foramina jsou volná.', dimmed: true });
                }
            }

            const myeloLevel = ctx.text('myelo_level');
            const myeloLoc = ctx.text('myelopatie');
            const myeloSize = ctx.field('myelo_size');

            if (myeloLevel && myeloLevel !== 'etáž' && myeloLoc && myeloLoc !== 'myelopatie') {
                let reportMyelo = `ložisko vysoké SI intramedulárně ${myeloLoc} v úrovni ${myeloLevel}`;
                let concMyelo = `myelopatie ${myeloLoc} v úrovni ${myeloLevel}`;
                if (myeloSize) {
                    reportMyelo += ` délky cca ${myeloSize} mm`;
                    concMyelo += ` délky cca ${myeloSize} mm`;
                }
                reportMyelo = capitalize(reportMyelo) + '.';
                concMyelo = capitalize(concMyelo) + '.';

                reportBlocks.push({ type: 'frame', text: reportMyelo });
                mainConc.push({ type: 'frame', text: concMyelo });
            } else if (!(ctx.examId || '').toLowerCase().startsWith('ct')) {
                reportBlocks.push({ type: 'frame', text: 'Přehledný úsek míchy bez signálových změn.', dimmed: true });
            }

            if (concAxisLordosis.length > 0) {
                mainConc.push({ type: 'frame', text: concAxisLordosis.join(' ') });
            }

            if (dddIIPlusCount >= 4 && dddIIPlusWithStenosis >= 3) {
                mainConc.unshift({ type: 'frame', text: `Multietážové degenerativní změny ${ADJ} páteře:` });
            } else if (dddIIPlusCount >= 3 && dddIIPlusWithStenosis >= 2) {
                mainConc.unshift({ type: 'frame', text: `Víceetážové degenerativní změny ${ADJ} páteře:` });
            }

            if (hasUncomplicatedDegen) {
                if (mainConc.length > 0) {
                    mainConc.push({ type: 'frame', text: 'Jinak nevýrazné degenerativní změny bez stenóz a útlaku durálního vaku / kořenů.' });
                } else {
                    mainConc.push({ type: 'frame', text: `Nevýrazné degenerativní změny ${ADJ} páteře bez stenóz a útlaku durálního vaku / kořenů.` });
                }
            }

            if (mainConc.length === 0) {
                mainConc.push({ type: 'frame', text: `Přiměřený nález na ${ADJ} páteři.`, dimmed: true });
            }

            const customDesc = ctx.field(`${P}_custom_desc`);
            if (customDesc) {
                let txt = customDesc.trim();
                if (txt && !txt.endsWith('.')) txt += '.';
                if (txt) {
                    txt = capitalize(txt);
                    reportBlocks.push({ type: 'frame', text: txt });
                }
            }

            const customConc = ctx.field(`${P}_custom_conc`);
            if (customConc) {
                let txt = customConc.trim();
                if (txt && !txt.endsWith('.')) txt += '.';
                if (txt) {
                    txt = txt.charAt(0).toUpperCase() + txt.slice(1);
                    incConc.push({ type: 'frame', text: txt });
                }
            }

            return {
                report: reportBlocks,
                conclusion: { main: mainConc, incidental: incConc }
            };
        }
    };
}
