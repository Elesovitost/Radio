/* =============================================================
   Region_spineNaf.js
   NaF PET/CT páteře.

   Vlevo přepínače skupin (C / T / L) a pod nimi sloupce etáží – podle
   zapnutých skupin vedle sebe. Vpravo mapa segmentu ze SVG
   (Organs_spine_NaF.svg); objekty jsou nativně viditelné (bílá / šedá),
   stav RF se přepíná klikem / kolečkem / pravým tlačítkem.

   Vizuál drží stejnou řeč jako js/spine-svg-factory.js: kompaktní
   seznam etáží vlevo, mapa vpravo, popisky přes mapu černě a verzállkami.
   ============================================================= */

const NAF_SEGMENTS_CRANIAL = [
    'C2/3', 'C3/4', 'C4/5', 'C5/6', 'C6/7', 'C7/T1',
    'T1/2', 'T2/3', 'T3/4', 'T4/5', 'T5/6', 'T6/7', 'T7/8', 'T8/9', 'T9/10', 'T10/11', 'T11/12', 'T12/L1',
    'L1/2', 'L2/3', 'L3/4', 'L4/5', 'L5/S1'
];

/* Skupiny etáží – etáž patří skupině podle horního obratle
   (C7/T1 → C, T12/L1 → T). Nativně je zapnutá jen bederní páteř. */
const NAF_GROUPS = [
    { key: 'C', label: 'C páteř' },
    { key: 'T', label: 'T páteř' },
    { key: 'L', label: 'L páteř' }
];

const NAF_DEFAULT_GROUP = 'L';

const NAF_RF_STATES = ['0', '+', '++'];
const NAF_KRY_STATES = ['Krycí plotny', 'osteofyty', 'osteochondróza', 'cement'];
const NAF_FAC_STATES = ['facety', 'artróza I', 'artróza II', 'artróza III', 'istmy'];

const NAF_RF_SPOTS = [
    { id: 'ant',   svg: 'BF', group: 'endplate', side: '',       report: 'ventrálně' },
    { id: 'lat_l', svg: 'BL', group: 'endplate', side: 'vlevo',  report: 'vlevo' },
    { id: 'lat_r', svg: 'BR', group: 'endplate', side: 'vpravo', report: 'vpravo' },
    { id: 'cen',   svg: 'BB', group: 'endplate', side: '',       report: 'dorzálně' },
    { id: 'fac_l', svg: 'FL', group: 'facet',    side: 'vlevo',  report: 've facetovém skloubení vlevo' },
    { id: 'fac_r', svg: 'FR', group: 'facet',    side: 'vpravo', report: 've facetovém skloubení vpravo' },
    { id: 'sp',    svg: 'SP', group: 'spinous',  side: '',       report: 'interspinózně' }
];

const NAF_ENDPLATE_ORDER = ['ant', 'lat_l', 'lat_r', 'cen'];

/* Příčina patologie se v textu vkládá za „v terénu“ (genitiv). Facet se
   skloňuje podle počtu skloubení, proto nese obě čísla; krycí plotny jsou
   vždy dvě, takže mají jen množné číslo. */
const NAF_CAUSES = {
    'artróza I':      { one: 'mírné facetové artrózy',        many: 'mírných facetových artróz' },
    'artróza II':     { one: 'střední facetové artrózy',      many: 'středních facetových artróz' },
    'artróza III':    { one: 'pokročilé facetové artrózy',    many: 'pokročilých facetových artróz' },
    'istmy':          { one: 'istmické lýzy při spondylolistéze', many: 'istmických lýz při spondylolistéze' },
    'cement':         { many: 'cementoplastiky' },
    'osteochondróza': { many: 'osteochondrózy' },
    'osteofyty':      { many: 'spondylofytů' }
};

/* Klíč příčiny pro daný spot – sloupec (facet / krycí plotna), ze kterého se čte. */
function nafCauseKey(group, kry, fac) {
    if (group === 'facet') return NAF_CAUSES[fac] ? fac : '';
    if (group === 'endplate' && NAF_CAUSES[kry]) return kry;
    return '';
}

function nafCauseText(key, plural) {
    const form = NAF_CAUSES[key];
    if (!form) return '';
    return (plural ? form.many : form.one) || form.many;
}

/* Menus nad mapou – jen pro zvolenou etáž. */
const NAF_MENUS = [
    { id: 'kry', btn: 'kry', x: 50, y: 26 },
    { id: 'fac', btn: 'fac', x: 50, y: 60 }
];

window.NAF_SPINE_SVG_CACHE = window.NAF_SPINE_SVG_CACHE || fetch('Organs_spine_NaF.svg').then(r => r.text());

/* ── identifikátory stavů ─────────────────────────────────────── */

function nafActiveId(examId) {
    return `${examId}_spine_naf_naf_seg`;
}

function nafGroupId(examId, key) {
    return `${examId}_spine_naf_g_${key}`;
}

function nafSpotId(examId, pfx, spotId) {
    return `${examId}_spine_naf_${pfx}_rf_${spotId}`;
}

function nafSegKey(label) {
    return String(label || '').toLowerCase().replace(/\//g, '_');
}

function nafSegIdx(label) {
    return NAF_SEGMENTS_CRANIAL.indexOf(label);
}

function nafGroupOf(label) {
    return String(label || '').charAt(0).toUpperCase();
}

function nafGroupOn(examId, key) {
    const val = Store.buttonStates[nafGroupId(examId, key)];
    if (val === undefined) return key === NAF_DEFAULT_GROUP;
    return val === true;
}

function nafSetGroup(examId, key, on) {
    const activeId = nafActiveId(examId);
    const activeIdx = Store.buttonStates[activeId] || 0;
    const next = { ...Store.buttonStates, [nafGroupId(examId, key)]: on };

    /* Zrušená skupina nesmí nechat vybranou etáž, kterou už není vidět. */
    if (!on && activeIdx > 0 && nafGroupOf(NAF_SEGMENTS_CRANIAL[activeIdx - 1]) === key) {
        next[activeId] = 0;
    }
    Store.buttonStates = next;
}

/* ── styly ────────────────────────────────────────────────────── */

function nafEnsureStyles() {
    if (document.getElementById('naf-spine-styles')) return;
    const style = document.createElement('style');
    style.id = 'naf-spine-styles';
    style.textContent = `
        .naf-spine-layout {
            display: flex; gap: 12px; align-items: flex-start;
            width: 100%; min-height: 260px;
        }
        .naf-spine-left { flex: 0 0 auto; display: flex; flex-direction: column; gap: 6px; padding-top: 2px; }

        .naf-spine-groups { display: flex; gap: 4px; }
        .naf-spine-groups .btn {
            min-width: 62px; width: auto; padding: 1px 5px;
            font-size: 11px; font-weight: 700; letter-spacing: 0.4px; text-transform: uppercase;
        }

        .naf-spine-cols { display: flex; gap: 8px; align-items: flex-start; }
        .naf-spine-col { display: flex; flex-direction: column; gap: 4px; }
        .naf-spine-col .btn { min-width: 72px; width: 72px; padding: 1px 2px; font-size: 12px; }

        .naf-spine-map { position: relative; flex: 1 1 auto; min-width: 0; max-width: min(480px, 100%); }
        .naf-spine-host { width: 100%; display: block; }
        .naf-spine-host svg { width: 100%; height: auto; display: block; border-radius: 4px; }
        .naf-spine-host svg image,
        .naf-spine-host svg use { pointer-events: none; }

        /* Objekty jsou vidět i bez patologie – nativně bílé (krycí plotny)
           a šedé (facety, trn). */
        .naf-spine-host svg path[id] {
            fill: rgba(255, 255, 255, 0.30);
            stroke: rgba(255, 255, 255, 0.85);
            stroke-width: 1px;
            cursor: pointer;
            transition: fill 0.15s, stroke 0.15s;
        }
        .naf-spine-host svg path.naf-facet { fill: rgba(170, 170, 170, 0.30); }
        .naf-spine-host svg path.naf-plus { fill: #e37908; }
        .naf-spine-host svg path.naf-plusplus { fill: #e32708; }
        .naf-spine-host svg path.naf-off,
        .naf-spine-host svg path.naf-static {
            fill: transparent; stroke: transparent; pointer-events: none; cursor: default;
        }
        .naf-spine-host svg path[id]:hover {
            stroke: var(--accent-hi, #58a6ff); stroke-width: 2px;
        }

        .naf-spine-hint {
            position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
            color: #8b949e; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;
            z-index: 3; pointer-events: none; text-align: center;
        }

        .naf-menu { position: absolute; transform: translate(-50%, -50%); z-index: 2; }
        .naf-menu .tbl { border: none; background: transparent; margin: 0; width: auto; }
        .naf-menu .tbl td { padding: 0; border: none; }
        .naf-menu .btn {
            min-width: 0; padding: 1px 5px;
            font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px;
            background: rgba(255, 255, 255, 0.85); border-color: rgba(0, 0, 0, 0.4); color: #000;
        }
        .naf-menu .btn:hover { background: #fff; border-color: var(--accent-hi, #58a6ff); color: #000; }
        .naf-menu .btn.modified { background: var(--accent-hi, #58a6ff); border-color: #fff; color: #fff; }
    `;
    document.head.appendChild(style);
}

/* ── SVG mapa ─────────────────────────────────────────────────── */

/* Stav 0 = nativní objekt (bílá / šedá), 1 = + (oranžová), 2 = ++ (červená).
   Vždy je aktivní jen jedna z dvojice cest, aby hover seděl na to, co je vidět. */
function nafApplySpotState(plusPath, plusPlusPath, stateIdx) {
    plusPath.classList.toggle('naf-plus', stateIdx === 1);
    plusPath.classList.toggle('naf-off', stateIdx === 2);
    plusPlusPath.classList.toggle('naf-plusplus', stateIdx === 2);
    plusPlusPath.classList.toggle('naf-off', stateIdx < 2);
}

function nafBindSpot(path, globalId) {
    const cycle = (e, dir) => {
        e.preventDefault();
        e.stopPropagation();
        cycleState(globalId, dir);
    };
    path.addEventListener('click', (e) => cycle(e, 1));
    path.addEventListener('contextmenu', (e) => cycle(e, -1));
    path.addEventListener('wheel', (e) => cycle(e, e.deltaY < 0 ? 1 : -1), { passive: false });
}

function nafSetupSpineSvg(svgEl, pfx, examId) {
    /* Původní <style> (oranžová/červená výplň) zahodíme – barvy řídí stav. */
    svgEl.querySelectorAll('style').forEach(s => s.remove());

    svgEl.querySelectorAll('path[id]').forEach((path) => {
        path.removeAttribute('class');
        path.removeAttribute('style');
        const name = path.id.replace(/\+\+?$/, '');
        const spot = NAF_RF_SPOTS.find(s => s.svg === name);
        if (spot && spot.group !== 'endplate') path.classList.add('naf-facet');
    });

    if (!pfx) {
        svgEl.querySelectorAll('path[id]').forEach(p => p.classList.add('naf-static'));
        return svgEl;
    }

    NAF_RF_SPOTS.forEach((spot) => {
        const plusPath = svgEl.getElementById(`${spot.svg}+`);
        const plusPlusPath = svgEl.getElementById(`${spot.svg}++`);
        if (!plusPath || !plusPlusPath) return;

        const globalId = nafSpotId(examId, pfx, spot.id);
        nafApplySpotState(plusPath, plusPlusPath, Store.buttonStates[globalId] || 0);
        nafBindSpot(plusPath, globalId);
        nafBindSpot(plusPlusPath, globalId);
    });
    return svgEl;
}

function nafMountSpineSvg(host, pfx, examId) {
    const attach = (svgEl) => {
        host.replaceChildren(nafSetupSpineSvg(svgEl, pfx, examId));
    };

    if (window.NAF_SPINE_SVG_PARSED) {
        attach(window.NAF_SPINE_SVG_PARSED.cloneNode(true));
        return;
    }

    window.NAF_SPINE_SVG_CACHE.then((txt) => {
        if (!host.isConnected) return;
        const temp = document.createElement('div');
        temp.innerHTML = txt;
        const svgEl = temp.querySelector('svg');
        if (!svgEl) {
            host.textContent = 'SVG Organs_spine_NaF.svg nelze načíst.';
            return;
        }
        window.NAF_SPINE_SVG_PARSED = svgEl.cloneNode(true);
        attach(svgEl);
    }).catch(() => {
        if (host.isConnected) host.textContent = 'SVG Organs_spine_NaF.svg nelze načíst.';
    });
}

/* ── levá lišta: skupiny + sloupce etáží ──────────────────────── */

/* Konfigurace pro všechny etáže – compile čte stavy celé páteře
   bez ohledu na to, co je právě vybrané. */
function nafRegisterButtons(examId) {
    ButtonConfigs[nafActiveId(examId)] = {
        type: 'standard',
        states: ['segment', ...NAF_SEGMENTS_CRANIAL]
    };
    NAF_GROUPS.forEach((group) => {
        ButtonConfigs[nafGroupId(examId, group.key)] = { type: 'basic', text: group.label };
    });
    NAF_SEGMENTS_CRANIAL.forEach((label) => {
        const pfx = nafSegKey(label);
        NAF_RF_SPOTS.forEach((spot) => {
            ButtonConfigs[nafSpotId(examId, pfx, spot.id)] = { type: 'standard', states: NAF_RF_STATES };
        });
        ButtonConfigs[`${examId}_spine_naf_${pfx}_kry`] = { type: 'standard', states: NAF_KRY_STATES };
        ButtonConfigs[`${examId}_spine_naf_${pfx}_fac`] = { type: 'standard', states: NAF_FAC_STATES };
    });
}

function nafBuildGroupBar(examId) {
    const bar = el('div', { className: 'naf-spine-groups' });
    NAF_GROUPS.forEach((group) => {
        const on = nafGroupOn(examId, group.key);
        const btn = el('button', {
            type: 'button',
            className: 'btn' + (on ? ' selected' : ''),
            textContent: group.label,
            'aria-pressed': String(on)
        });
        const set = (e, nextOn) => {
            e.preventDefault();
            e.stopPropagation();
            if (nextOn === on) return;
            nafSetGroup(examId, group.key, nextOn);
        };
        btn.addEventListener('click', (e) => set(e, !on));
        btn.addEventListener('contextmenu', (e) => set(e, false));
        btn.addEventListener('wheel', (e) => set(e, e.deltaY < 0), { passive: false });
        bar.appendChild(btn);
    });
    return bar;
}

function nafBuildSegButton(examId, label, idx, activeIdx) {
    const btn = el('button', {
        type: 'button',
        className: 'btn' + (activeIdx === idx ? ' selected' : ''),
        textContent: label
    });
    const set = (e, on) => {
        e.preventDefault();
        e.stopPropagation();
        const next = on ? idx : (activeIdx === idx ? 0 : activeIdx);
        if (next === activeIdx) return;
        commitButtonState(nafActiveId(examId), next);
    };
    btn.addEventListener('click', (e) => set(e, true));
    btn.addEventListener('contextmenu', (e) => set(e, false));
    btn.addEventListener('wheel', (e) => set(e, e.deltaY < 0), { passive: false });
    return btn;
}

/* Jedna skupina = jeden sloupec; zapnuté skupiny stojí vedle sebe. */
function nafBuildSegColumns(examId, activeIdx) {
    const cols = el('div', { className: 'naf-spine-cols' });
    NAF_GROUPS.forEach((group) => {
        if (!nafGroupOn(examId, group.key)) return;
        const col = el('div', { className: 'naf-spine-col' });
        NAF_SEGMENTS_CRANIAL.forEach((label, i) => {
            if (nafGroupOf(label) !== group.key) return;
            col.appendChild(nafBuildSegButton(examId, label, i + 1, activeIdx));
        });
        cols.appendChild(col);
    });
    return cols;
}

function nafBuildMap(examId, seg, helpers) {
    const map = el('div', { className: 'naf-spine-map' });
    const host = el('div', { className: 'naf-spine-host' });
    map.appendChild(host);
    nafMountSpineSvg(host, seg ? nafSegKey(seg) : null, examId);

    if (seg) {
        const pfx = nafSegKey(seg);
        NAF_MENUS.forEach((menu) => {
            const wrap = el('div', {
                className: 'naf-menu',
                style: `left:${menu.x}%;top:${menu.y}%;`
            });
            wrap.appendChild(helpers.TableGrid(`naf_${pfx}_${menu.id}`, [[
                { btn: menu.btn, id: `${pfx}_${menu.id}` }
            ]]));
            map.appendChild(wrap);
        });
    } else {
        map.appendChild(el('div', {
            className: 'naf-spine-hint',
            textContent: 'Vyber segment vlevo'
        }));
    }
    return map;
}

/* ── text nálezu ──────────────────────────────────────────────── */

function nafJoin(arr) {
    const valid = (arr || []).filter(v => v && String(v).trim() !== '');
    if (valid.length === 0) return '';
    if (valid.length === 1) return valid[0];
    if (valid.length === 2) return valid.join(' a ');
    return valid.slice(0, -1).join(', ') + ' a ' + valid[valid.length - 1];
}

function nafCap(s) {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function nafReadNamed(examId, localId, states) {
    const idx = Store.buttonStates[`${examId}_spine_naf_${localId}`] || 0;
    return states[idx] || states[0];
}

function nafCompactSegs(entries) {
    if (!entries.length) return '';
    const sorted = [...entries].sort((a, b) => nafSegIdx(a.label) - nafSegIdx(b.label));

    const runs = [];
    let runStart = sorted[0], runEnd = sorted[0];
    for (let i = 1; i < sorted.length; i++) {
        const prev = nafSegIdx(runEnd.label);
        const cur = nafSegIdx(sorted[i].label);
        if (cur === prev + 1 && sorted[i].sideStr === runEnd.sideStr) {
            runEnd = sorted[i];
        } else {
            runs.push({ start: runStart, end: runEnd });
            runStart = sorted[i];
            runEnd = sorted[i];
        }
    }
    runs.push({ start: runStart, end: runEnd });

    return runs.map(r => {
        const seg = r.start.label === r.end.label
            ? r.start.label
            : `${r.start.label} - ${r.end.label}`;
        return `${seg}${r.start.sideStr}`;
    }).join(', ');
}

/* ── region ───────────────────────────────────────────────────── */

const RegionSpineNaf = {
    title: 'NaF páteř',
    reportLayout: 'block',
    buttons: {
        kry: { states: NAF_KRY_STATES },
        fac: { states: NAF_FAC_STATES }
    },
    layout: (helpers) => {
        nafEnsureStyles();

        const examId = Store.activeTab || 'default';
        nafRegisterButtons(examId);

        const activeIdx = Store.buttonStates[nafActiveId(examId)] || 0;
        const seg = activeIdx > 0 ? NAF_SEGMENTS_CRANIAL[activeIdx - 1] : null;

        const root = el('div', { id: 'spine_naf_seg', className: 'naf-spine-layout' });

        const left = el('div', { className: 'naf-spine-left' });
        left.appendChild(nafBuildGroupBar(examId));
        left.appendChild(nafBuildSegColumns(examId, activeIdx));
        root.appendChild(left);

        root.appendChild(nafBuildMap(examId, seg, helpers));

        return [
            root,
            el('div', { style: 'height: 14px;' }),
            helpers.Table1col('spine_naf_add', [
                { field: 'text', id: 'custom_desc', placeholder: 'vlastní popis...' },
                { field: 'text', id: 'custom_conc', placeholder: 'vlastní závěr...' }
            ])
        ];
    },
    compile: (ctx) => {
        const examId = ctx.examId;

        const pathologyReport = (seg) => {
            const parts = [];
            if (seg.kry === 'osteofyty') parts.push('okrajové spondylofyty');
            if (seg.kry === 'osteochondróza') parts.push('osteochondrotická degenerace krycích ploten');
            if (seg.kry === 'cement') parts.push('materiál vysoké denzity v MO prostoru');
            if (seg.fac === 'artróza I') parts.push('mírná facetová degenerace');
            if (seg.fac === 'artróza II') parts.push('střední facetová degenerace');
            if (seg.fac === 'artróza III') parts.push('pokročilá facetová degenerace');
            if (seg.fac === 'istmy') parts.push('istmická lýza');
            return parts;
        };

        const phraseEndplates = (spots) => {
            if (!spots.length) return '';
            if (spots.length >= 3) return 'v krycích plotnách difuzně';
            const ids = new Set(spots.map(s => s.id));
            if (ids.has('lat_l') && ids.has('lat_r') && spots.length === 2) {
                return 'v krycích plotnách po obou stranách';
            }
            const sorted = [...spots].sort(
                (a, b) => NAF_ENDPLATE_ORDER.indexOf(a.id) - NAF_ENDPLATE_ORDER.indexOf(b.id)
            );
            return `v krycích plotnách ${nafJoin(sorted.map(s => s.report))}`;
        };

        const phraseLocs = (spots) => {
            const parts = [];
            const endplates = spots.filter(s => s.group === 'endplate');
            const facets = spots.filter(s => s.group === 'facet');
            const spin = spots.filter(s => s.group === 'spinous');

            const ep = phraseEndplates(endplates);
            if (ep) parts.push(ep);

            if (facets.length === 2) parts.push('ve facetových skloubeních bilat.');
            else facets.forEach(f => parts.push(f.report));

            if (spin.length) parts.push('interspinózně');
            return nafJoin(parts);
        };

        /* Jedno facetové skloubení (jeden spot) = jednotné číslo; víc skloubení,
           víc různých nálezů i krycí plotny (ty jsou vždy dvě) = množné. */
        const resolveCause = (hits, group, plural) => {
            const keys = [...new Set(hits.map(h => h.cause).filter(Boolean))];
            if (!keys.length) return '';
            if (keys.length === 1) return nafCauseText(keys[0], plural);
            if (group === 'facet') return 'variabilních facetových artróz';
            if (group === 'endplate') return 'variabilních degenerativních změn krycích ploten';
            return 'variabilních změn';
        };

        const readSeg = (label) => {
            const pfx = nafSegKey(label);
            const rf = [];
            NAF_RF_SPOTS.forEach((spot) => {
                const val = nafReadNamed(examId, `${pfx}_rf_${spot.id}`, NAF_RF_STATES);
                if (val && val !== '0') rf.push({ ...spot, val });
            });
            const kry = nafReadNamed(examId, `${pfx}_kry`, NAF_KRY_STATES);
            const fac = nafReadNamed(examId, `${pfx}_fac`, NAF_FAC_STATES);
            return {
                label,
                rf,
                kry: kry && kry !== 'Krycí plotny' ? kry : '',
                fac: fac && fac !== 'facety' ? fac : ''
            };
        };

        const segSideStr = (group, list) => {
            if (group === 'facet') {
                const sides = new Set(list.map(x => x.side).filter(Boolean));
                if (sides.has('vpravo') && sides.has('vlevo')) return ' bilat.';
                if (sides.size === 1) return ` ${[...sides][0]}`;
                return '';
            }
            if (group === 'endplate') {
                const ids = new Set(list.map(x => x.id));
                if (ids.size >= 3) return ' difuzně';
                if (ids.has('lat_l') && ids.has('lat_r') && ids.size === 2) return ' po obou stranách';
                if (ids.size === 2) {
                    const locs = [...list]
                        .sort((a, b) => NAF_ENDPLATE_ORDER.indexOf(a.id) - NAF_ENDPLATE_ORDER.indexOf(b.id))
                        .map(x => NAF_RF_SPOTS.find(s => s.id === x.id)?.report || '')
                        .filter(Boolean);
                    return ` ${nafJoin(locs)}`;
                }
                if (ids.has('lat_l')) return ' vlevo';
                if (ids.has('lat_r')) return ' vpravo';
                if (ids.has('ant')) return ' ventrálně';
                if (ids.has('cen')) return ' dorzálně';
            }
            return '';
        };

        const mergeHits = (hits) => {
            const byGroup = new Map();
            hits.forEach((h) => {
                if (!byGroup.has(h.group)) byGroup.set(h.group, []);
                byGroup.get(h.group).push(h);
            });

            const order = { facet: 0, endplate: 1, spinous: 2 };
            const groups = [...byGroup.entries()].sort(
                (a, b) => (order[a[0]] ?? 9) - (order[b[0]] ?? 9)
            );

            const parts = [];
            groups.forEach(([group, arr]) => {
                const plural = group !== 'facet' || arr.length > 1;
                const cause = resolveCause(arr, group, plural);

                const bySide = new Map();
                arr.forEach((h) => {
                    const bySeg = bySide.get(h.label) || [];
                    bySeg.push(h);
                    bySide.set(h.label, bySeg);
                });

                const entries = [];
                bySide.forEach((list, label) => {
                    entries.push({ label, sideStr: segSideStr(group, list) });
                });

                const segList = nafCompactSegs(entries);
                let head = '';
                if (group === 'facet') {
                    head = plural
                        ? `ve facetových skloubeních ${segList}`
                        : `ve facetovém skloubení ${segList}`;
                } else if (group === 'spinous') head = `interspinózně v ${segList}`;
                else head = `v krycích plotnách ${segList}`;
                if (cause) head += ` v terénu ${cause}`;
                parts.push(head);
            });
            return nafJoin(parts);
        };

        const reportBlocks = [{ type: 'heading', text: 'Páteř:', action: 'open-region', regionId: 'spine_naf' }];
        const concMain = [];
        const highHits = [];
        const lowHits = [];
        let anyRf = false;

        const segResults = [];
        NAF_SEGMENTS_CRANIAL.forEach((label) => {
            const seg = readSeg(label);
            if (seg.rf.length === 0) return;
            anyRf = true;

            const plusPlus = seg.rf.filter(r => r.val === '++');
            const plus = seg.rf.filter(r => r.val === '+');
            const sentences = [];

            const addIntensity = (spots, intensita) => {
                if (!spots.length) return;
                sentences.push(`${intensita} akumulace RF ${phraseLocs(spots)}`);
            };

            addIntensity(plusPlus, 'výrazná');
            addIntensity(plus, 'mírná');
            pathologyReport(seg).forEach(p => sentences.push(p));

            const lineText = sentences.map(nafCap).join('. ') + '.';
            segResults.push({ label, text: lineText.replace(/\.\./g, '.') });

            plusPlus.forEach((s) => {
                highHits.push({
                    label,
                    group: s.group,
                    side: s.side,
                    id: s.id,
                    cause: nafCauseKey(s.group, seg.kry, seg.fac)
                });
            });
            plus.forEach((s) => {
                lowHits.push({
                    label,
                    group: s.group,
                    side: s.side,
                    id: s.id,
                    cause: nafCauseKey(s.group, seg.kry, seg.fac)
                });
            });
        });

        // Merge identical report lines into ranges
        let i = 0;
        while (i < segResults.length) {
            const text = segResults[i].text;
            const groupLabels = [segResults[i].label];
            let j = i + 1;
            while (j < segResults.length && segResults[j].text === text) {
                groupLabels.push(segResults[j].label);
                j++;
            }
            const labelStr = nafCompactSegs(groupLabels.map(l => ({ label: l, sideStr: '' })));
            reportBlocks.push({ type: 'frame', text: `${labelStr}: ${text}`, tableId: 'spine_naf_seg' });
            i = j;
        }

        if (!anyRf) {
            reportBlocks.push({
                type: 'frame',
                text: 'Bez ložiskové akumulace RF na páteři.',
                dimmed: true,
                tableId: 'spine_naf_seg'
            });
            concMain.push({
                type: 'frame',
                text: 'Bez ložisek zvýšené osteoblastické aktivity na páteři.',
                dimmed: true
            });
        } else {
            if (highHits.length) {
                concMain.push({
                    type: 'frame',
                    text: `Vysoká osteoblastická aktivita: ${mergeHits(highHits)}.`
                });
            }
            if (lowHits.length) {
                const prefix = highHits.length
                    ? 'Nevýrazně vyšší osteoblastická aktivita dále: '
                    : 'Nevýrazně vyšší osteoblastická aktivita: ';
                concMain.push({
                    type: 'frame',
                    text: `${prefix}${mergeHits(lowHits)}.`
                });
            }
        }

        /* Vlastní texty z pole „custom“ na konci regionu. */
        const customText = (fieldId) => {
            const raw = String(ctx.field(fieldId) || '').replace(/\u200B/g, '').trim();
            if (!raw) return '';
            const txt = nafCap(raw);
            return /[.!?]$/.test(txt) ? txt : `${txt}.`;
        };

        const customDesc = customText('custom_desc');
        if (customDesc) {
            reportBlocks.push({ type: 'frame', text: customDesc, tableId: 'spine_naf_add' });
        }
        const customConc = customText('custom_conc');

        return {
            report: reportBlocks,
            conclusion: {
                main: concMain,
                incidental: customConc ? [{ type: 'frame', text: customConc, tableId: 'spine_naf_add' }] : []
            }
        };
    }
};
