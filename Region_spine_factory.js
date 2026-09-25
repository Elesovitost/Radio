/* =============================================================
   Region_spine_factory.js - společná SVG továrna pro C/T/LS páteř.
   Region_Cp / Region_Tp / Region_LSp jen dodají cfg; logika je tady.
   ============================================================= */

const SPINE_SVG_COLORS = {
    yellow: '#f0d000',
    orange: '#e37908',
    red: '#e32708',
    green: '#c5e8cb',
    lightBlue: '#d4eef6',

    /* Hernie tmavší než bulging. */
    herniaBlue: '#364cd7',
    grey: '#787878',
    black: '#1a1a1a',
    white: '#ffffff'
};

const SPINE_SVG_PATHS = {
    canal: { mode: 'grade123', states: ['0', 'I', 'II', 'III'], defaultFill: 'green' },
    'paracentral-L': {
        mode: 'paracentral',
        states: ['0', 'stenóza', 'fibróza', 'adheze'],
        defaultFill: 'green'
    },
    'paracentral-R': {
        mode: 'paracentral',
        states: ['0', 'stenóza', 'fibróza', 'adheze'],
        defaultFill: 'green'
    },
    'foraminal-L': { mode: 'grade123', states: ['0', 'I', 'II', 'III'], defaultFill: 'green' },
    'foraminal-R': { mode: 'grade123', states: ['0', 'I', 'II', 'III'], defaultFill: 'green' },
    'root-left': { mode: 'grade123', states: ['0', 'I', 'II', 'III'], defaultFill: 'lightBlue' },
    'root-right': { mode: 'grade123', states: ['0', 'I', 'II', 'III'], defaultFill: 'lightBlue' },
    'facet-L': { mode: 'facet', states: ['0', 'I', 'II', 'III', 'edém'], defaultFill: 'white' },
    'facet-R': { mode: 'facet', states: ['0', 'I', 'II', 'III', 'edém'], defaultFill: 'white' },
    disc: { mode: 'grade123', states: ['0', 'I', 'II', 'III'] },

    'hernia-C': { mode: 'red', states: ['0', 'on'], defaultFill: 'herniaBlue' },
    'hernia-P-L': { mode: 'red', states: ['0', 'on'], defaultFill: 'herniaBlue' },
    'hernia-P-R': { mode: 'red', states: ['0', 'on'], defaultFill: 'herniaBlue' },
    'hernia-F-L': { mode: 'red', states: ['0', 'on'], defaultFill: 'herniaBlue' },
    'hernia-F-R': { mode: 'red', states: ['0', 'on'], defaultFill: 'herniaBlue' },
    'hernia-E-L': { mode: 'red', states: ['0', 'on'], defaultFill: 'herniaBlue' },
    'hernia-E-R': { mode: 'red', states: ['0', 'on'], defaultFill: 'herniaBlue' },

    /* Jedna cesta: bulging / osteofyty / kombinace. */
    bulging: {
        mode: 'bulge',
        states: ['0', 'bulging disku', 'osteofyty', 'kombinace']
    },
    'facet-ost-L': { mode: 'red', states: ['0', 'on'], defaultFill: 'white' },
    'facet-ost-R': { mode: 'red', states: ['0', 'on'], defaultFill: 'white' },

    hiz: { mode: 'red', states: ['0', 'on'] },

    epifat: { mode: 'red', states: ['0', 'on'] },
    'bone-lesion': {
        mode: 'boneLesion',
        states: ['0', 'hemangiom', 'schmorl', 'lytická', 'sklerotická'],
        defaultFill: 'white'
    },
    dorsolistesis: { mode: 'red', states: ['0', 'on'], defaultFill: 'white' },
    ventrolistesis: { mode: 'red', states: ['0', 'on'], defaultFill: 'white' },
    lysis: { mode: 'red', states: ['0', 'on'], defaultFill: 'white' },

    'plate-up': {
        mode: 'plateUp',
        states: [
            '0',
            'prolomení krycí plotny',
            'fraktura klínovitá',
            'fraktura výrazná s propagací zadní hrany'
        ],
        defaultFill: 'white'
    },
    'plate-Modic': {
        mode: 'modic',
        states: ['0', 'Modic I', 'Modic II', 'Modic III', 'destrukce'],
        defaultFill: 'white'
    },

    /* Anatomický podklad — neklikací. */
    body: { mode: 'display' },
    'body-upper': { mode: 'display' },
    'body-lower': { mode: 'display' }
};

const SPINE_SVG_HERNIA_MIGR = {
    'bez migrace': null,
    'kraniálně': 'kraniální',
    'kaudálně': 'kaudální'
};

/* Podtlačítka: registrují se pro všechny segmenty (compile). */
const SPINE_SVG_SUB = {
    hernia_migr: Object.keys(SPINE_SVG_HERNIA_MIGR),
    'bone-lesion_hem_type': ['klasický', 'atypický', 'agresivní'],
    'bone-lesion_sch_pos': ['kde...', 'horní', 'dolní'],
    'bone-lesion_sch_act': ['klidný', 'edém']
};

const SPINE_SVG_HOVER_LABELS = {
    body: 'Obratel {v}',
    'body-upper': 'Obratel {v}',
    'body-lower': 'Obratel {next}',
    canal: 'Páteřní kanál',
    'paracentral-L': 'Laterální recesus vlevo',
    'paracentral-R': 'Laterální recesus vpravo',
    'foraminal-L': 'Foramen {disc} vlevo',
    'foraminal-R': 'Foramen {disc} vpravo',
    'root-left': 'Kořen {froot} vlevo',
    'root-right': 'Kořen {froot} vpravo',
    'facet-L': 'Facetové skloubení vlevo',
    'facet-R': 'Facetové skloubení vpravo',
    'facet-ost-L': 'Hypertrofie facet vlevo',
    'facet-ost-R': 'Hypertrofie facet vpravo',
    disc: 'Disk {disc}',
    'plate-up': 'Trauma obratle {v}',
    'plate-Modic': 'Krycí plotny obratlů {disc}',
    bulging: 'Bulge {disc}',
    'hernia-C': 'Herniace centrálně',
    'hernia-P-L': 'Herniace paracentrálně vlevo',
    'hernia-P-R': 'Herniace paracentrálně vpravo',
    'hernia-F-L': 'Herniace foraminálně vlevo',
    'hernia-F-R': 'Herniace foraminálně vpravo',
    'hernia-E-L': 'Herniace extraforaminálně vlevo',
    'hernia-E-R': 'Herniace extraforaminálně vpravo',
    hiz: 'Okrsek vysoké intenzity {disc}',
    epifat: 'Zmnožený epidurální tuk',
    'bone-lesion': 'Ložisko obratle {v}',
    lysis: 'Lýza oblouku {v}',
    ventrolistesis: 'Ventrolistéza {v}',
    dorsolistesis: 'Retrolistéza {v}'
};

/* Ventro/retrolistéza se vzájemně vylučují. */
const SPINE_SVG_MUTEX = {
    ventrolistesis: 'dorsolistesis',
    dorsolistesis: 'ventrolistesis'
};

const SPINE_SVG_GRADE_LABEL = ['', 'mírná', '', 'výrazná'];
const SPINE_SVG_GRADE_NEUTER = ['', 'mírné', '', 'výrazné'];
const SPINE_SVG_ROOT_LABEL = ['', 'mírný tlak', 'útlak', 'komprese'];

/* Hernie: zóna 0→3; ≥4 lokality = o široké bazi. */
const SPINE_SVG_HERNIA = {
    'hernia-C':   { z: 0, side: null },
    'hernia-P-L': { z: 1, side: 'L' },
    'hernia-P-R': { z: 1, side: 'R' },
    'hernia-F-L': { z: 2, side: 'L' },
    'hernia-F-R': { z: 2, side: 'R' },
    'hernia-E-L': { z: 3, side: 'L' },
    'hernia-E-R': { z: 3, side: 'R' }
};
const SPINE_SVG_HERNIA_Z = ['centrálně', 'paracentrálně', 'foraminálně', 'extraforaminálně'];

const SPINE_SVG_OPS = ['stab', 'disk', 'lam'];

function spineSvgVertebraRange(segs) {
    if (!segs.length) return '';
    const parts = [];
    let from = segs[0].v;
    let to = segs[0].vNext;
    for (let i = 1; i < segs.length; i++) {
        if (segs[i].v === to) { to = segs[i].vNext; continue; }
        parts.push(`${from}-${to}`);
        from = segs[i].v;
        to = segs[i].vNext;
    }
    parts.push(`${from}-${to}`);
    return parts.join(', ');
}

const SPINE_SVG_STATE_MAP = {
    canal: { '0': 0, 'I': 1, 'II': 2, 'III': 3 },
    foraminal: { '0': 0, 'I': 1, 'II': 2, 'III': 3 },
    root: { '0': 0, 'I': 1, 'II': 2, 'III': 3 },
    disc: { '0': 0, 'I': 1, 'II': 2, 'III': 3 },
    facet: { '0': 0, 'I': 1, 'II': 2, 'III': 3, 'edém': 4 },
    paracentral: { '0': 0, 'stenóza': 1, 'fibróza': 2, 'adheze': 3 },
    boneLesion: { '0': 0, 'hemangiom': 1, 'schmorl': 2, 'lytická': 3, 'sklerotická': 4 },
    plateUp: { '0': 0, 'prolomení krycí plotny': 1, 'fraktura klínovitá': 2, 'fraktura výrazná s propagací zadní hrany': 3 },
    modic: { '0': 0, 'Modic I': 1, 'Modic II': 2, 'Modic III': 3, 'destrukce': 4 }
};

/* Pořadí v textu etáže: stenózy, pak útlak kořene. */
const SPINE_SVG_EFFECT_ORDER = { canal: 1, recess: 2, foramen: 3, root: 4 };

const SPINE_SVG_ROOT_WORD = {
    uni: { nom: 'kořen', gen: 'kořene', ins: 'kořenem' },
    bil: { nom: 'kořeny', gen: 'kořenů', ins: 'kořeny' }
};

const SPINE_SVG_ROOT_TEXT = {
    1: { nom: 'mírný tlak na {acc}', dat: 'kontaktu s {ins}' },
    2: { nom: 'útlak {gen}', dat: 'útlaku {gen}' },
    3: { nom: 'komprese {gen}', dat: 'kompresi {gen}' }
};

/* Priorita etáže v závěru (ne pořadí v textu). */
const SPINE_SVG_EFFECT_RANK = (e) => {
    if (e.kind === 'canal') return e.sev === 3 ? 100 : (e.sev === 2 ? 70 : 50);
    if (e.kind === 'recess' || e.kind === 'root') return e.sev === 3 ? 95 : (e.sev === 2 ? 80 : 30);
    return e.sev === 3 ? 90 : (e.sev === 2 ? 60 : 40);
};

const SPINE_SVG_IS_INSIGNIFICANT = (c) => {
    const nom = c.nom || '';
    if (/artróza/i.test(nom) && /pokročilá|výrazná|edém|dekompenzac/i.test(nom)) return false;
    return /bulging|artróza|spondylofyty|diskopatie|hypertrofie/i.test(nom);
};

/* LS a T sdílí Organs_spine.svg. */
const SPINE_SVG_CACHE = {};
const SPINE_SVG_PARSED = {};

function spineSvgJoinCzech(arr) {
    const v = arr.filter((x) => x && String(x).trim() !== '');
    if (v.length === 0) return '';
    if (v.length === 1) return v[0];
    if (v.length === 2) return v.join(' a ');
    return v.slice(0, -1).join(', ') + ' a ' + v[v.length - 1];
}

function spineSvgSentence(str) {
    if (!str) return '';
    let s = String(str).trim();
    if (!s) return '';
    s = capitalize(s);
    if (!s.endsWith('.')) s += '.';
    return s;
}

function spineSvgGrade(state, map) {
    return map[state] || 0;
}

function spineSvgFillFor(spec, idx) {
    if (!idx) {
        return spec.defaultFill ? SPINE_SVG_COLORS[spec.defaultFill] : null;
    }
    const C = SPINE_SVG_COLORS;
    if (spec.mode === 'grade123' || spec.mode === 'plateUp') {
        return [null, C.yellow, C.orange, C.red][idx] || null;
    }
    if (spec.mode === 'paracentral') {
        return [null, C.red, C.black, C.grey][idx] || null;
    }
    if (spec.mode === 'facet') {
        return [null, C.yellow, C.orange, C.red, C.red][idx] || null;
    }
    if (spec.mode === 'modic') {
        return [null, C.red, C.yellow, C.grey, C.black][idx] || null;
    }
    if (spec.mode === 'boneLesion') {
        return [null, C.yellow, C.black, C.red, C.white][idx] || null;
    }
    if (spec.mode === 'bulge') {
        return [null, C.yellow, C.white, C.orange][idx] || null;
    }
    if (spec.mode === 'red') return SPINE_SVG_COLORS.red;
    return null;
}

function defineSvgSpineRegion(cfg) {
    const R = cfg.regionId;
    const ADJ = cfg.adjective;
    const CURV = cfg.curvature;

    const levels = cfg.levels.map((l, i) => Object.assign({}, l, {
        sPfx: l.disc ? l.disc.toLowerCase().replace(/\//g, '_') : null,
        fRoot: l.fRoot || l.v,
        /* vNext = dolní obratel; root = vystupující kořen (C8). */
        vNext: cfg.levels[i + 1] ? cfg.levels[i + 1].v : l.v
    }));
    const segmentLevels = levels.filter((l) => l.disc);
    const segments = segmentLevels.map((l) => l.disc);
    const myeloLevels = cfg.myeloLevels
        || levels.map((l) => l.v).filter((v, i, a) => a.indexOf(v) === i);

    let allowedPaths = Object.keys(SPINE_SVG_PATHS);
    if (cfg.omitPaths) allowedPaths = allowedPaths.filter((k) => cfg.omitPaths.indexOf(k) === -1);
    const pathSpec = (key) => (allowedPaths.indexOf(key) !== -1 ? SPINE_SVG_PATHS[key] : null);

    let focusPath = null;
    let pendingPath = null;
    let showInfoTimer = null;
    let hideInfoTimer = null;
    const SPINE_SVG_INFO_DELAY = 500;
    const SPINE_SVG_INFO_HIDE_DELAY = 400;

    function activeSeg() {
        const examId = Store.activeTab || 'default';
        const idx = Store.buttonStates[`${examId}_${R}_active`] || 0;
        return idx > 0 ? segmentLevels[idx - 1] : null;
    }

    function svgLabel(pathEl) {
        const pattern = SPINE_SVG_HOVER_LABELS[pathEl.id];
        if (!pattern) return null;
        const seg = activeSeg();
        if (!seg) return null;
        return pattern
            .replace('{disc}', seg.disc)
            .replace('{next}', seg.root)
            .replace('{froot}', seg.fRoot)
            .replace('{v}', seg.v);
    }

    function ensureStyles() {
        let style = document.getElementById('spine-svg-styles');
        if (!style) {
            style = document.createElement('style');
            style.id = 'spine-svg-styles';
            document.head.appendChild(style);
        }
        style.textContent = `
        .spine-svg-layout {
            display: flex; gap: 12px; align-items: flex-start;
            width: 100%; min-height: 280px;
        }
        .spine-svg-segs {
            display: grid; grid-template-columns: 72px; gap: 4px;
            flex: 0 0 auto; align-content: start; padding-top: 4px;
        }
        .spine-svg-segs .btn {
            min-width: 72px; width: 72px; padding: 1px 2px; font-size: 12px;
        }
        .spine-svg-segs .spine-svg-op-btn {
            min-width: 32px; width: auto; padding: 1px 5px; font-size: 11px;
        }
        .spine-svg-map {
            position: relative; flex: 1 1 auto; min-width: 0;
            max-width: min(640px, 100%);
        }
        .spine-svg-map .spine-svg-host { width: 100%; display: block; }
        .spine-svg-map .spine-svg-host svg { width: 100%; height: auto; display: block; }
        .spine-svg-map .spine-svg-host svg path.spine-svg-display {
            cursor: default;
            pointer-events: visiblePainted;
        }
        .spine-svg-map .spine-svg-host svg path.spine-svg-hit {
            cursor: pointer;
            pointer-events: visiblePainted;
            transition: filter 0.12s, stroke 0.12s, stroke-width 0.12s;
        }
        .spine-svg-map .spine-svg-host svg path.spine-svg-hit:hover {
            stroke: var(--accent-hi, #58a6ff);
            stroke-width: 2.5px;
            filter: brightness(1.15);
        }
        .spine-svg-info {
            position: absolute;
            left: 15%;
            top: 20%;
            width: 34%;
            max-width: 170px;
            z-index: 5;
            pointer-events: none; /* text neblokuje cesty; ovládání má auto */
            font-size: 12px;
            line-height: 1.35;
            font-weight: 700;
            text-transform: uppercase;
            color: #000;
            -webkit-text-stroke: 1px #fff;
            paint-order: stroke fill;
            text-shadow: none;
        }
        .spine-svg-info-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
            background: transparent;
            border-radius: 4px;
            padding: 4px 6px;
            text-align: center;
        }
        .spine-svg-info-title,
        .spine-svg-info-where,
        .spine-svg-info-detail {
            font-size: inherit;
            font-weight: inherit;
            color: inherit;
            -webkit-text-stroke: inherit;
            paint-order: inherit;
            text-align: center;
        }
        .spine-svg-info-detail {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            gap: 4px;
        }
        .spine-svg-info-detail .input {
            width: 48px;
            min-width: 48px;
            padding: 1px 4px;
            pointer-events: auto;
            font-size: 11px;
            font-weight: 700;
            text-align: center;
            text-transform: uppercase;
            color: #000;
            -webkit-text-stroke: 0;
        }
        .spine-svg-info-detail .spine-svg-info-btn {
            min-width: 0;
            padding: 2px 6px;
            pointer-events: auto;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            color: #000; /* .modified nesmí být bílé nad SVG */
            -webkit-text-stroke: 0;
            text-shadow: none;
        }
        .spine-svg-hint {
            color: #8b949e; font-size: 12px; padding: 24px 8px;
            text-align: center;
        }
        .spine-conc-row .label { color: var(--dim); }
        .spine-conc-row:has(input:checked) .on,
        .spine-conc-row:has(input:not(:checked)) .off { color: #fff; }
    `;
    }

    function pathId(examId, segKey, pathKey) {
        return `${examId}_${R}_${segKey}_${pathKey}`;
    }

    function fieldId(examId, segKey, pathKey, suffix) {
        return `${examId}_${R}_${segKey}_${pathKey}_${suffix}`;
    }

    function readIdx(examId, segKey, pathKey) {
        return Store.buttonStates[pathId(examId, segKey, pathKey)] || 0;
    }

    function cycle(globalId, pathKey, dir) {
        const spec = pathSpec(pathKey);
        const states = spec && spec.states;
        if (!states || !states.length) return;

        focusPath = pathKey;
        ButtonConfigs[globalId] = { type: 'standard', states };
        const cur = Store.buttonStates[globalId] || 0;
        const next = Math.max(0, Math.min(states.length - 1, cur + dir));
        if (next === cur) {
            if (typeof UI !== 'undefined' && UI.renderActiveTable) UI.renderActiveTable();
            return;
        }

        const other = SPINE_SVG_MUTEX[pathKey];
        if (other && next > 0) {
            const otherId = globalId.replace(new RegExp(`_${pathKey}$`), `_${other}`);
            if (Store.buttonStates[otherId]) Store.buttonStates[otherId] = 0;
        }

        commitButtonState(globalId, next);
    }

    function herniaWhere(examId, segKey) {
        let hasC = false;
        const L = [];
        const Rr = [];

        Object.keys(SPINE_SVG_HERNIA).forEach((key) => {
            if (!pathSpec(key)) return;
            if (!readIdx(examId, segKey, key)) return;
            const { z, side } = SPINE_SVG_HERNIA[key];
            if (side === null) hasC = true;
            else if (side === 'L') L.push(z);
            else Rr.push(z);
        });

        const n = (hasC ? 1 : 0) + L.length + Rr.length;
        if (!n) return '';
        if (n >= 4) return 'o široké bazi';
        if (L.length && Rr.length) return 'široká centrální';
        if (!L.length && !Rr.length) return 'centrálně';

        const side = L.length ? 'vlevo' : 'vpravo';
        const zs = L.length ? L : Rr;
        const outer = Math.max(...zs);
        const inner = Math.min(...zs);

        if (hasC) return `centrálně - ${SPINE_SVG_HERNIA_Z[outer]} ${side}`;
        if (inner === outer) return `${SPINE_SVG_HERNIA_Z[outer]} ${side}`;
        return `${SPINE_SVG_HERNIA_Z[inner]} - ${SPINE_SVG_HERNIA_Z[outer]} ${side}`;
    }

    function mmInput(id) {
        const inp = el('input', {
            className: 'input field_mm',
            placeholder: 'mm',
            'data-action': 'update-field',
            'data-id': id,
            'data-step': '1'
        });
        inp.value = Store.fields[id] || '';
        return inp;
    }

    function infoBtn(globalId, states) {
        ButtonConfigs[globalId] = { type: 'standard', states };
        let idx = Store.buttonStates[globalId] || 0;
        if (idx < 0 || idx >= states.length) idx = 0;
        const longest = states.reduce((a, b) => (a.length >= b.length ? a : b), '');
        const isActive = idx > 0;
        return el('button', {
            className: `btn btn-state${isActive ? ' modified' : ''} spine-svg-info-btn`,
            'data-action': 'cycle-state',
            'data-id': globalId,
            'data-longest': longest,
            'aria-pressed': isActive.toString()
        }, [el('span', { textContent: states[idx] })]);
    }

    function infoRowFor(examId, segKey, pathKey) {
        if (!pathKey) return null;
        const idx = readIdx(examId, segKey, pathKey);
        const grade = (labels) => labels[idx] || null;

        if (SPINE_SVG_HERNIA[pathKey]) {
            return {
                title: 'Hernie',
                where: herniaWhere(examId, segKey),
                detail: null,
                mmIds: idx ? [fieldId(examId, segKey, 'hernia', 'mm')] : [],
                btns: idx ? [{
                    id: fieldId(examId, segKey, 'hernia', 'migr'),
                    states: SPINE_SVG_SUB.hernia_migr
                }] : []
            };
        }
        if (pathKey === 'canal') {
            return {
                title: 'Stenóza',
                where: 'páteřní kanál',
                detail: grade(SPINE_SVG_GRADE_LABEL),
                mmIds: idx ? [fieldId(examId, segKey, 'canal', 'mm')] : []
            };
        }
        if (pathKey === 'foraminal-L' || pathKey === 'foraminal-R') {
            const side = pathKey.endsWith('-L') ? 'vlevo' : 'vpravo';
            return {
                title: 'Stenóza',
                where: `foramina ${side}`,
                detail: grade(SPINE_SVG_GRADE_LABEL),
                mmIds: []
            };
        }
        if (pathKey === 'disc') {
            return {
                title: 'Snížení disku',
                where: '',
                detail: grade(SPINE_SVG_GRADE_NEUTER),
                mmIds: []
            };
        }
        if (pathKey === 'paracentral-L' || pathKey === 'paracentral-R') {
            const side = pathKey.endsWith('-L') ? 'vlevo' : 'vpravo';
            const titles = ['Later. recesus', 'Stenóza', 'Fibróza', 'Adheze'];
            return {
                title: titles[idx] || 'Later. recesus',
                where: idx === 1 ? `later. recesu ${side}`
                    : (idx === 3 ? `kořenů ${side}` : side),
                detail: null,
                mmIds: []
            };
        }
        if (pathKey === 'facet-L' || pathKey === 'facet-R') {
            const side = pathKey.endsWith('-L') ? 'vlevo' : 'vpravo';
            return {
                title: 'Degenerace',
                where: `facet ${side}`,
                detail: idx === 4 ? 'pokročilá s edémem' : grade(SPINE_SVG_GRADE_LABEL),
                mmIds: []
            };
        }
        if (pathKey === 'facet-ost-L' || pathKey === 'facet-ost-R') {
            const side = pathKey.endsWith('-L') ? 'vlevo' : 'vpravo';
            return {
                title: 'Hypertrofie',
                where: `facety ${side}`,
                detail: null,
                mmIds: []
            };
        }
        if (pathKey === 'root-left' || pathKey === 'root-right') {
            const side = pathKey === 'root-left' ? 'vlevo' : 'vpravo';
            return {
                title: SPINE_SVG_ROOT_LABEL[idx] || 'Kořen',
                where: `kořen ${side}`,
                detail: null,
                mmIds: []
            };
        }
        if (pathKey === 'bulging') {
            /* Bulging/osteofyty/kombinace sdílí jedno mm. */
            const titles = ['Bulging disku', 'Bulging disku', 'Osteofyty', 'Kombinace'];
            return {
                title: titles[idx] || 'Bulging disku',
                where: '',
                detail: null,
                mmIds: [fieldId(examId, segKey, 'bulging', 'mm')]
            };
        }
        if (pathKey === 'hiz') {
            return {
                title: 'Anulární fisura',
                where: 'zadní část disku',
                detail: null,
                mmIds: []
            };
        }
        if (pathKey === 'epifat') {
            return {
                title: 'Epidurální lipomatóza',
                where: 'páteřní kanál',
                detail: null,
                mmIds: []
            };
        }
        if (pathKey === 'bone-lesion') {
            const titles = ['Léze', 'Hemangiom', 'Schmorl', 'Lytická', 'Sklerotická'];
            const row = {
                title: titles[idx] || 'Léze',
                where: '',
                detail: null,
                mmIds: [],
                btns: []
            };
            if (idx === 1) {
                row.btns.push({
                    id: fieldId(examId, segKey, 'bone-lesion', 'hem_type'),
                    states: SPINE_SVG_SUB['bone-lesion_hem_type']
                });
            } else if (idx === 2) {
                row.btns.push({
                    id: fieldId(examId, segKey, 'bone-lesion', 'sch_pos'),
                    states: SPINE_SVG_SUB['bone-lesion_sch_pos']
                });
                row.btns.push({
                    id: fieldId(examId, segKey, 'bone-lesion', 'sch_act'),
                    states: SPINE_SVG_SUB['bone-lesion_sch_act']
                });
            }
            return row;
        }
        if (pathKey === 'plate-Modic') {
            return {
                title: ['Modic', 'Modic I', 'Modic II', 'Modic III', 'Destrukce'][idx] || 'Modic',
                where: '',
                detail: null,
                mmIds: []
            };
        }
        if (pathKey === 'plate-up') {
            const titles = [
                'Trauma',
                'Prolomení krycí plotny',
                'Fraktura klínovitá',
                'Fraktura výrazná s propagací zadní hrany'
            ];
            return {
                title: titles[idx] || 'Trauma',
                where: '',
                detail: null,
                mmIds: []
            };
        }
        if (pathKey === 'ventrolistesis') {
            return {
                title: 'Ventrolistéza',
                where: '',
                detail: null,
                mmIds: idx ? [fieldId(examId, segKey, 'listhesis', 'mm')] : []
            };
        }
        if (pathKey === 'dorsolistesis') {
            return {
                title: 'Retrolistéza',
                where: '',
                detail: null,
                mmIds: idx ? [fieldId(examId, segKey, 'listhesis', 'mm')] : []
            };
        }
        if (pathKey === 'lysis') {
            return {
                title: 'Lýza',
                where: '',
                detail: null,
                mmIds: []
            };
        }
        return null;
    }

    function fillInfoPanel(panel, examId, segKey) {
        panel.replaceChildren();
        const row = segKey ? infoRowFor(examId, segKey, focusPath) : null;
        if (!row) {
            panel.style.display = 'none';
            return;
        }

        const card = el('div', { className: 'spine-svg-info-card' });
        card.appendChild(el('div', { className: 'spine-svg-info-title', textContent: row.title }));
        if (row.where) {
            card.appendChild(el('div', { className: 'spine-svg-info-where', textContent: row.where }));
        }

        if (row.detail || row.mmIds.length || (row.btns && row.btns.length)) {
            const detail = el('div', { className: 'spine-svg-info-detail' });
            if (row.detail) detail.appendChild(el('span', { textContent: row.detail }));
            if (row.btns) {
                row.btns.forEach((b) => detail.appendChild(infoBtn(b.id, b.states)));
            }
            row.mmIds.forEach((id) => detail.appendChild(mmInput(id)));
            card.appendChild(detail);
        }

        panel.appendChild(card);
        panel.style.display = '';
    }

    function buildInfoPanel() {
        const panel = el('div', { className: 'spine-svg-info' });
        /* Základ −15 px; Region_Cp přidává další offset přes infoOffsetY. */
        const dy = -15 + (Number(cfg.infoOffsetY) || 0);
        panel.style.transform = `translateY(${dy}px)`;
        panel.style.display = 'none';
        return panel;
    }

    function cancelHide() {
        if (hideInfoTimer) clearTimeout(hideInfoTimer);
        hideInfoTimer = null;
    }

    function cancelPendingShow() {
        if (showInfoTimer) clearTimeout(showInfoTimer);
        showInfoTimer = null;
        pendingPath = null;
    }

    function overPanelControls(panel, target, x, y) {
        if (target && panel.contains(target)) return true;
        if (panel.style.display === 'none') return false;
        /* Celá karta (nadpis + lokalizace + ovládání) — ne jen detail. */
        const card = panel.querySelector('.spine-svg-info-card') || panel;
        const r = card.getBoundingClientRect();
        return x >= r.left - 6 && x <= r.right + 6 && y >= r.top - 6 && y <= r.bottom + 6;
    }

    function hideInfo(panel) {
        cancelPendingShow();
        cancelHide();
        focusPath = null;
        panel.style.display = 'none';
    }

    function showInfo(panel, examId, segKey, pathKey) {
        cancelPendingShow();
        cancelHide();
        focusPath = pathKey;
        fillInfoPanel(panel, examId, segKey);
    }

    function scheduleShow(panel, examId, segKey, pathKey) {
        cancelPendingShow();
        pendingPath = pathKey;
        showInfoTimer = setTimeout(() => {
            showInfoTimer = null;
            pendingPath = null;
            showInfo(panel, examId, segKey, pathKey);
        }, SPINE_SVG_INFO_DELAY);
    }

    function scheduleHide(panel) {
        cancelHide();
        hideInfoTimer = setTimeout(() => {
            hideInfoTimer = null;
            hideInfo(panel);
        }, SPINE_SVG_INFO_HIDE_DELAY);
    }

    function trackPointer(map, panel, examId, segKey) {
        map.addEventListener('pointermove', (e) => {
            const x = e.clientX;
            const y = e.clientY;

            if (overPanelControls(panel, e.target, x, y)) {
                cancelPendingShow();
                cancelHide();
                if (focusPath && panel.style.display === 'none') fillInfoPanel(panel, examId, segKey);
                return;
            }

            const path = e.target.closest && e.target.closest('path.spine-svg-hit');
            if (path) {
                cancelHide();
                if (focusPath === path.id && panel.style.display !== 'none') {
                    cancelPendingShow();
                } else {
                    scheduleShow(panel, examId, segKey, path.id);
                }
                return;
            }

            cancelPendingShow();
            if (panel.style.display !== 'none') scheduleHide(panel);
        });

        map.addEventListener('pointerleave', () => {
            cancelPendingShow();
            if (panel.style.display !== 'none') scheduleHide(panel);
        });
    }

    function setupSvg(svgEl, segKey, examId) {

        svgEl.querySelectorAll('path[id]').forEach((path) => {
            path.style.fill = '';
            path.style.stroke = '';
            path.style.pointerEvents = '';
            path.classList.remove('spine-svg-display', 'spine-svg-hit', 'spine-svg-on');

            const key = path.id;
            const spec = pathSpec(key);
            if (!spec) {
                path.style.pointerEvents = 'none';
                return;
            }

            if (spec.mode === 'display') {
                path.classList.add('spine-svg-display');
                return;
            }

            const globalId = pathId(examId, segKey, key);
            ButtonConfigs[globalId] = { type: 'standard', states: spec.states };
            const idx = Store.buttonStates[globalId] || 0;
            const fill = spineSvgFillFor(spec, idx);

            path.classList.add('spine-svg-hit');
            if (idx) path.classList.add('spine-svg-on');
            if (fill) path.style.fill = fill;

            const bind = (e, dir) => {
                e.preventDefault();
                e.stopPropagation();
                cycle(globalId, key, dir);
            };
            path.addEventListener('click', (e) => bind(e, 1));
            path.addEventListener('contextmenu', (e) => bind(e, -1));
            path.addEventListener('wheel', (e) => {
                bind(e, e.deltaY < 0 ? 1 : -1);
            }, { passive: false });
        });
        return svgEl;
    }

    function mountSvg(host, segKey, examId, panel) {
        const file = cfg.svgFile;
        const attach = (svgEl) => {
            host.replaceChildren(setupSvg(svgEl, segKey, examId));

            if (focusPath) fillInfoPanel(panel, examId, segKey);
        };

        if (SPINE_SVG_PARSED[file]) {
            attach(SPINE_SVG_PARSED[file].cloneNode(true));
            return;
        }

        if (!SPINE_SVG_CACHE[file]) {
            SPINE_SVG_CACHE[file] = fetch(file).then((r) => r.text());
        }

        SPINE_SVG_CACHE[file].then((txt) => {
            if (!host.isConnected) return;
            const temp = document.createElement('div');
            temp.innerHTML = txt;
            const svgEl = temp.querySelector('svg');
            if (!svgEl) {
                host.textContent = `SVG ${file} nelze načíst.`;
                return;
            }
            SPINE_SVG_PARSED[file] = svgEl.cloneNode(true);
            attach(svgEl);
        }).catch(() => {
            if (host.isConnected) host.textContent = `SVG ${file} nelze načíst.`;
        });
    }

    function globalTable(helpers) {
        const cells = [
            'Osa:', { btn: 'axis', id: 'axis', states: ['přímá', '(', '((', '(((', ')', '))', ')))'] },
            CURV.label, { btn: CURV.key, id: CURV.key, states: CURV.states },
            'Operace:', { btn: 'op', id: 'op', states: ['ne', 'ano'] }
        ];
        if (cfg.lstv) {
            cells.splice(4, 0, 'LSTV:', { btn: 'lstv', id: 'lstv', states: cfg.lstv });
        }
        return helpers.TableGrid('lsp_global', [cells]);
    }

    function expTable(helpers) {
        const table = helpers.TableGrid('lsp_exp', [
            [
                { btn: 'exp_segment', id: 'exp_segment', states: ['etáž'].concat(segments) },
                [
                    { btn: 'expansion', id: 'exp_type', states: ['expanze', 'ED-cysta', 'ID-meningeom', 'ID-schwannom', 'IM-ependymom', 'IM-astrocytom', 'IM-hemangiobl.'] },
                    { btn: 'exp_side', id: 'exp_side', states: ['0', 'R', 'L', 'C'] },
                    { field: 'size', id: 'exp_size', placeholder: 'rozměr' }
                ]
            ],
            [
                { btn: 'myelo_level', id: 'myelo_level', states: ['etáž'].concat(myeloLevels, 'custom') },
                [
                    { btn: 'myelopatie', id: 'myelopatie', states: ['myelopatie', 'centrálně', 'vpravo', 'vlevo', 'difuzně'] },
                    { field: 'mm', id: 'myelo_size', placeholder: 'mm' }
                ]
            ]
        ]);
        table.classList.remove('tbl-center');
        table.querySelectorAll('.row').forEach((row) => { row.style.justifyContent = 'flex-start'; });
        return table;
    }

    function concSlider() {
        const sw = (id, checked, set) => el('label', { className: 'switch', style: 'margin: 0;' }, [
            el('input', {
                type: 'checkbox', id, checked,
                onchange: (e) => { set(e.target.checked); UI.renderReport(); }
            }),
            el('span', { className: 'slider' })
        ]);
        const row = (...kids) => el('div', {
            className: 'row spine-conc-row',
            style: 'margin: 6px 0; justify-content: flex-start; width: 100%; padding-left: 5px;'
        }, kids);
        const lbl = (text, side) => el('span', {
            className: `label${side ? ` ${side}` : ''}`,
            style: 'font-size: 10px;',
            textContent: text
        });

        return el('div', {}, [
            row(
                lbl('První strukturální změny', 'off'),
                sw(`${R}_conc_mode_toggle`, Store.fields[`${R}_conc_mode`] !== 'pathology',
                    (on) => { Store.fields[`${R}_conc_mode`] = on ? 'stenosis' : 'pathology'; }),
                lbl('První stenózy', 'on')
            ),
            row(
                lbl('Slučování degenerací', 'on'),
                sw(`${R}_degen_merge_toggle`, Store.fields[`${R}_degen_merge`] === 'ano',
                    (on) => { Store.fields[`${R}_degen_merge`] = on ? 'ano' : 'ne'; })
            )
        ]);
    }

    function compile(ctx) {
        const examId = ctx.examId;

        const report = [];
        const main = [];
        const incidental = [];

        report.push({ type: 'heading', text: `${cfg.title}:`, action: 'open-region', regionId: R });

        const T = (localId) => ctx.text(localId);
        const S = (seg, key) => ctx.text(`${seg.sPfx}_${key}`);
        const Fd = (seg, key) => ctx.field(`${seg.sPfx}_${key}`);

        /* omitPaths: nevolat ctx.text (jinak MISS). */
        const has = (key) => !!pathSpec(key);
        const on = (seg, key) => has(key) && S(seg, key) === 'on';
        const g = (seg, key, mapName) => (has(key) ? spineSvgGrade(S(seg, key), SPINE_SVG_STATE_MAP[mapName]) : 0);

        const isStenosisFirst = Store.fields[`${R}_conc_mode`] !== 'pathology';

        const staticPhysio = [];
        const staticPatho = [];
        const concStaticSentences = [];
        const concAxisLordosis = [];

        const axisState = T('axis');
        const axisMap = {
            'přímá': 'Osa přímá',
            '(': 'mírná dextrokonvexní skolióza',
            '((': 'dextrokonvexní skolióza',
            '(((': 'výrazná dextrokonvexní skolióza',
            ')': 'mírná sinistrokonvexní skolióza',
            '))': 'sinistrokonvexní skolióza',
            ')))': 'výrazná sinistrokonvexní skolióza'
        };
        if (axisState && axisState !== '0' && axisMap[axisState]) {
            const sentence = spineSvgSentence(axisMap[axisState]);
            if (axisState === 'přímá') staticPhysio.push(sentence);
            else { staticPatho.push(sentence); concAxisLordosis.push(sentence); }
        }

        const curvState = T(CURV.key);
        if (curvState && curvState !== '0') {
            const curvText = CURV.map[curvState];
            if (curvText) {
                const sentence = spineSvgSentence(curvText);
                if (curvState === 'přiměřená') staticPhysio.push(sentence);
                else { staticPatho.push(sentence); concAxisLordosis.push(sentence); }
            }
        }

        if (cfg.lstv) {
            const lstvState = T('lstv');
            if (lstvState && lstvState !== 'není' && lstvState !== '0') {
                const t = spineSvgSentence(`přechodný LS obratel, počítán jako ${lstvState}`);
                staticPatho.push(t);
                concStaticSentences.push(t);
            }
        }

        const opActive = ctx.isActive('op');

        const collShapes = {};
        const collLesions = {};
        const hizSegments = [];
        const collModic = {};

        const stabSegments = [];
        const discReplacements = [];
        const laminVertebrae = [];
        let dddIIPlusCount = 0;
        let dddIIPlusWithStenosis = 0;
        let hasUncomplicatedDegen = false;
        const segmentConcItems = [];
        const segmentBlocks = [];
        let hasSegmentPathology = false;
        let hasSpinalStenosis = false;
        let hasForaminalStenosis = false;

        segmentLevels.forEach((seg, segIndex) => {
            const sentences = [];
            const causes = [];
            const effects = [];
            const fibrosisArr = [];
            const adhesionArr = [];

            const rootSentences = [];

            const fRoot = cfg.foramenRootFrom === 'fRoot' ? seg.fRoot : seg.v;

            const discIdx = g(seg, 'disc', 'disc');
            let degenModifier = '';
            let degenDesc = '';
            if (discIdx === 1) { degenModifier = 'mírně sníženého '; degenDesc = 'mírně snížený disk'; }
            else if (discIdx === 2) { degenModifier = 'sníženého '; degenDesc = 'snížený disk'; }
            else if (discIdx === 3) { degenModifier = 'výrazně sníženého '; degenDesc = 'výrazně snížený disk'; }

            const modicIdx = g(seg, 'plate-Modic', 'modic');
            if (modicIdx) {
                const modicMap = {
                    1: 'STIR+ signál pod krycími plotnami',
                    2: 'T1+ signál pod krycími plotnami',
                    3: 'skleróza pod krycími plotnami',
                    4: 'destrukce krycích ploten'
                };
                sentences.push(spineSvgSentence(modicMap[modicIdx]));
                if (modicIdx === 1) {
                    /* Modic I → concLines níže. */
                } else {
                    const key = { 2: 'Modic II', 3: 'Modic III', 4: 'destrukce' }[modicIdx];
                    if (!collModic[key]) collModic[key] = [];
                    collModic[key].push(seg.disc);
                }
            }

            const ventro = on(seg, 'ventrolistesis');
            const dorso = on(seg, 'dorsolistesis');
            const lysis = on(seg, 'lysis');
            const listMm = Fd(seg, 'listhesis_mm');
            if (ventro || dorso) {
                const typeStr = ventro ? `ventrolistéza ${seg.v}` : `retrolistéza ${seg.v}`;
                const lStr = lysis ? 's lýzou oblouku' : 'bez lýzy oblouku';
                const mmStr = listMm ? ` o ${listMm} mm` : '';

                let gradeStr = mmStr;
                if (listMm) {
                    const mm = parseFloat(String(listMm).replace(',', '.'));
                    if (!isNaN(mm)) {
                        if (mm <= 7) gradeStr = ' I.st.';
                        else if (mm <= 9) gradeStr = ' I/II.st.';
                        else if (mm <= 15) gradeStr = ' II.st.';
                        else if (mm <= 17) gradeStr = ' II/III.st.';
                        else gradeStr = ' III.st.';
                    }
                }

                sentences.push(spineSvgSentence(`${typeStr}${mmStr} ${lysis ? 's lýzou oblouku' : ''}`.trim()));
                causes.push({
                    nom: `${typeStr}${gradeStr} ${lStr}`.trim(),
                    gen: `${typeStr.replace('listéza', 'listézy')}${gradeStr} ${lStr}`.trim()
                });
            }

            const herniaLoc = herniaWhere(examId, seg.sPfx);
            const herniaMm = Fd(seg, 'hernia_mm');
            const herniaMigr = T(`${seg.sPfx}_hernia_migr`);
            if (herniaLoc) {
                let rep = `herniace ${degenModifier}disku ${herniaLoc}`.trim();
                if (herniaMm) rep += ` o ${herniaMm} mm`;
                let conc = `herniace disku ${herniaLoc}`;
                const migAdj = SPINE_SVG_HERNIA_MIGR[herniaMigr] ?? null;
                if (migAdj) {
                    const migText = ` s ${migAdj} migrací`;
                    rep += migText;
                    conc += migText;
                }
                sentences.push(spineSvgSentence(rep));
                causes.push({ nom: conc, gen: conc });
            }

            const bulgeState = S(seg, 'bulging');
            const bulgeMm = Fd(seg, 'bulging_mm');
            const mmText = bulgeMm ? ` o ${bulgeMm} mm` : '';
            let bulgeConc = null;
            if (bulgeState === 'kombinace') {

                if (degenDesc) sentences.push(spineSvgSentence(degenDesc));
                if (discIdx === 3) causes.push({ nom: 'pokročilá diskopatie', gen: 'pokročilé diskopatie' });
                sentences.push(spineSvgSentence(`kombinace spondylofytů a bulgingu disku${mmText}`));
                bulgeConc = { nom: 'kombinace spondylofytů a bulgingu disku', gen: 'kombinace spondylofytů a bulgingu disku' };
            } else if (bulgeState === 'bulging disku') {
                sentences.push(spineSvgSentence(`bulging ${degenModifier}disku${mmText}`.trim()));
                bulgeConc = { nom: 'bulging disku', gen: 'bulgingu disku' };
            } else if (bulgeState === 'osteofyty') {
                if (degenDesc) sentences.push(spineSvgSentence(degenDesc));
                if (discIdx === 3) causes.push({ nom: 'pokročilá diskopatie', gen: 'pokročilé diskopatie' });
                sentences.push(spineSvgSentence(`spondylofyty okrajů krycích ploch${mmText}`));
                bulgeConc = { nom: 'spondylofyty', gen: 'spondylofytů' };
            } else if (!herniaLoc && degenDesc) {
                /* Snížení disku samostatně jen bez protruzí. */
                sentences.push(spineSvgSentence(degenDesc));
                if (discIdx === 3) causes.push({ nom: 'pokročilá diskopatie', gen: 'pokročilé diskopatie' });
            }
            if (bulgeConc) causes.push(bulgeConc);

            if (on(seg, 'hiz')) {
                sentences.push(spineSvgSentence('okrsek vysoké intenzity v zadní části disku'));
                hizSegments.push(seg.disc);
            }

            const facetBuild = (val, sideWord, sideAbbr) => {
                let modRep = '', modConc = '', edemRep = '', edemConc = '';
                if (val === 1) { modRep = 'mírná '; modConc = 'mírná '; }
                else if (val === 2) { modRep = ''; modConc = ''; }
                else if (val === 3) { modRep = 'výrazná '; modConc = 'pokročilá '; }
                else if (val === 4) { modRep = 'pokročilá '; modConc = 'pokročilá '; edemRep = ' s edémem'; edemConc = ' s edémem při dekompenzaci'; }

                sentences.push(spineSvgSentence(`${modRep}degenerace facetového skloubení${sideAbbr}${edemRep}`));

                const concTxt = `${modConc}facetová artróza${sideWord}${edemConc}`.trim();
                causes.push({
                    nom: concTxt,
                    gen: concTxt
                        .replace('artróza', 'artrózy')
                        .replace('mírná', 'mírné')
                        .replace('výrazná', 'výrazné')
                        .replace('pokročilá', 'pokročilé')
                        .replace('facetová', 'facetové')
                });
            };
            const fL = g(seg, 'facet-L', 'facet');
            const fR = g(seg, 'facet-R', 'facet');
            if (fL > 0 && fL === fR) {
                facetBuild(fL, ' bilat.', ' bilat.');
            } else {
                if (fL > 0) facetBuild(fL, ' vlevo', ' vlevo');
                if (fR > 0) facetBuild(fR, ' vpravo', ' vpravo');
            }

            const hoL = on(seg, 'facet-ost-L');
            const hoR = on(seg, 'facet-ost-R');
            if (hoL || hoR) {
                const side = (hoL && hoR) ? ' bilat.' : (hoL ? ' vlevo' : ' vpravo');
                const txt = `hypertrofie facetových skloubení${side}`;
                sentences.push(spineSvgSentence(txt));
                causes.push({ nom: txt, gen: txt });
            }

            const rootBuild = (val, sideAbbr, bilateral) => {
                const tpl = SPINE_SVG_ROOT_TEXT[val];
                if (!tpl) return null;
                const w = SPINE_SVG_ROOT_WORD[bilateral ? 'bil' : 'uni'];
                const phrase = (t) => `${t
                    .replace('{acc}', w.nom)
                    .replace('{gen}', w.gen)
                    .replace('{ins}', w.ins)} ${fRoot} ${sideAbbr}`;
                const nom = phrase(tpl.nom);
                const dat = phrase(tpl.dat);
                rootSentences.push(spineSvgSentence(nom));
                return { kind: 'root', nom, dat, sev: val };
            };
            const rL = g(seg, 'root-left', 'root');
            const rR = g(seg, 'root-right', 'root');
            if (rL > 0 && rL === rR) {
                const e = rootBuild(rL, 'bilat.', true);
                if (e) effects.push(e);
            } else {
                if (rL > 0) { const e = rootBuild(rL, 'l.sin.', false); if (e) effects.push(e); }
                if (rR > 0) { const e = rootBuild(rR, 'l.dx.', false); if (e) effects.push(e); }
            }

            const paraBuild = (val, sideAbbr) => {
                if (val === 1) {
                    const nom = `stenóza laterálního recesu ${sideAbbr}`;
                    sentences.push(spineSvgSentence(nom));
                    effects.push({ kind: 'recess', nom, dat: `stenóze laterálního recesu ${sideAbbr}`, sev: 2 });
                    /* Laterální recesus = součást stenózy kanálu. */
                    hasSpinalStenosis = true;
                } else if (val === 2) {
                    fibrosisArr.push(`epidurální fibróza ${sideAbbr}`);
                    sentences.push(spineSvgSentence(`okrsek nízké SI epidurálně ${sideAbbr}`));
                } else if (val === 3) {
                    adhesionArr.push(`vzájemná adheze kořenů ${fRoot} a ${seg.root} ${sideAbbr} v laterálním recesu nejasného klinického významu`);
                    sentences.push(spineSvgSentence(`adheze kořenů ${fRoot} a ${seg.root} ${sideAbbr} s vzájemným přitažením v laterálním recesu`));
                }
            };
            const pL = g(seg, 'paracentral-L', 'paracentral');
            const pR = g(seg, 'paracentral-R', 'paracentral');
            if (pL > 0 && pL === pR) paraBuild(pL, 'bilat.');
            else {
                if (pL > 0) paraBuild(pL, 'l.sin.');
                if (pR > 0) paraBuild(pR, 'l.dx.');
            }

            if (on(seg, 'epifat')) {
                sentences.push(spineSvgSentence('zmnožený epidurální tuk v páteřním kanálu'));
                causes.push({ nom: 'epidurální lipomatóza', gen: 'epidurální lipomatózy' });
            }

            const cIdx = g(seg, 'canal', 'canal');
            if (cIdx) {
                const size = Fd(seg, 'canal_mm');
                let sizeText = '';
                if (size && cIdx) sizeText = String(size).includes('x') ? `(který rozměrů ${size} mm)` : `(který diametru ${size} mm AP)`;

                let rep = '';
                if (cIdx === 1) {
                    rep = `mírné zúžení durálního vaku ${sizeText}`;
                    effects.push({ kind: 'canal', nom: 'mírná spinální stenóza', dat: 'mírné spinální stenóze', sev: 1 });
                } else if (cIdx === 2) {
                    rep = `zúžení durálního vaku ${sizeText}`;
                    effects.push({ kind: 'canal', nom: 'spinální stenóza', dat: 'spinální stenóze', sev: 2 });
                } else if (cIdx === 3) {
                    rep = `výrazné zúžení durálního vaku ${sizeText} s ${cfg.cordCompression}`;
                    effects.push({ kind: 'canal', nom: `výrazná spinální stenóza s ${cfg.cordCompression}`, dat: `výrazné spinální stenóze s ${cfg.cordCompression}`, sev: 3 });
                }
                sentences.push(spineSvgSentence(rep));
                hasSpinalStenosis = true;
            }

            const foramBuild = (val, sideWord, sideAbbr) => {
                let nom = '', dat = '', rep = '';
                if (val === 1) {
                    nom = `mírná stenóza foramina ${sideWord}`;
                    dat = `mírné stenóze foramina ${sideWord}`;
                    rep = `mírná stenóza foramina ${sideAbbr}`;
                } else if (val === 2) {
                    nom = `stenóza foramina ${sideWord}`;
                    dat = `stenóze foramina ${sideWord}`;
                    rep = `stenóza foramina ${sideAbbr}`;
                } else if (val === 3) {
                    nom = `výrazná stenóza foramina ${sideWord}`;
                    dat = `výrazné stenóze foramina ${sideWord}`;
                    rep = `výrazná stenóza foramina ${sideAbbr}`;
                }
                sentences.push(spineSvgSentence(rep));
                return { kind: 'foramen', nom, dat, sev: val };
            };
            const foramBilat = (val) => {
                let nom = '', dat = '', rep = '';
                if (val === 1) {
                    nom = 'mírná stenóza foramin bilat.';
                    dat = 'mírné stenóze foramin bilat.';
                    rep = 'mírné zúžení obou foramin';
                } else if (val === 2) {
                    nom = 'stenóza foramin bilat.';
                    dat = 'stenóze foramin bilat.';
                    rep = 'zúžení obou foramin';
                } else if (val === 3) {
                    nom = 'výrazná stenóza foramin bilat.';
                    dat = 'výrazné stenóze foramin bilat.';
                    rep = 'výrazná stenóza obou foramin';
                }
                sentences.push(spineSvgSentence(rep));
                return { kind: 'foramen', nom, dat, sev: val };
            };
            const wL = g(seg, 'foraminal-L', 'foraminal');
            const wR = g(seg, 'foraminal-R', 'foraminal');
            if (wL > 0 && wL === wR) {
                effects.push(foramBilat(wL));
            } else {
                if (wL > 0) effects.push(foramBuild(wL, 'vlevo', 'l.sin.'));
                if (wR > 0) effects.push(foramBuild(wR, 'vpravo', 'l.dx.'));
            }
            if (wL > 0 || wR > 0) hasForaminalStenosis = true;

            /* Útlak kořene až za stenózami. */
            rootSentences.forEach((s) => sentences.push(s));

            const lesIdx = g(seg, 'bone-lesion', 'boneLesion');
            const addLes = (key, vertebr) => {
                if (!collLesions[key]) collLesions[key] = [];
                collLesions[key].push(vertebr);
            };
            if (lesIdx === 1) {
                const hemType = S(seg, 'bone-lesion_hem_type');
                const key = hemType === 'atypický' ? 'atypický hemangiom'
                    : (hemType === 'agresivní' ? 'agresivní hemangiom' : 'hemangiom');
                addLes(key, seg.v);
            } else if (lesIdx === 2) {
                const pos = S(seg, 'bone-lesion_sch_pos');
                const act = S(seg, 'bone-lesion_sch_act');
                let txt = 'Schmorlův uzel';
                if (pos === 'horní') txt += ' horní krycí plotny';
                else if (pos === 'dolní') txt += ' dolní krycí plotny';
                txt += ` ${seg.v}`;
                if (act === 'edém') txt += ' s edémem okolní kostní dřeně';
                if (!collShapes.schmorl) collShapes.schmorl = [];
                collShapes.schmorl.push(txt);
            } else if (lesIdx === 3) {
                addLes('lytická', seg.v);
            } else if (lesIdx === 4) {
                addLes('sklerotická', seg.v);
            }

            const plateIdx = g(seg, 'plate-up', 'plateUp');
            if (plateIdx === 1) {
                if (!collShapes.prolomení) collShapes.prolomení = [];
                collShapes.prolomení.push(seg.v);
            } else if (plateIdx === 2) {
                if (!collShapes.klínovitá) collShapes.klínovitá = [];
                collShapes.klínovitá.push(seg.v);
            } else if (plateIdx === 3) {
                if (!collShapes.propagace) collShapes.propagace = [];
                collShapes.propagace.push(seg.v);
                causes.push({
                    nom: `výrazná komprese těla ${seg.v} s propagací dorzálně`,
                    gen: `výrazné komprese těla ${seg.v} s propagací dorzálně`
                });
            }

            if (opActive) {
                if (ctx.isActive(`${seg.sPfx}_stab`)) stabSegments.push(seg);
                if (ctx.isActive(`${seg.sPfx}_disk`)) discReplacements.push(seg.disc);
                if (ctx.isActive(`${seg.sPfx}_lam`)) laminVertebrae.push(seg.v);
            }

            if (T('exp_segment') === seg.disc) {
                const expansion = T('exp_type');
                const expSide = T('exp_side');
                const expSize = ctx.field('exp_size');
                if (expansion && expansion !== 'expanze') {
                    const expMap = {
                        'ED-cysta': 'epidurální cystická struktura',
                        'ID-meningeom': 'intradurální extramedulární expanze',
                        'ID-schwannom': 'intradurální expanze v průběhu kořene',
                        'IM-ependymom': 'intramedulární expanze',
                        'IM-astrocytom': 'intramedulární expanze',
                        'IM-hemangiobl.': 'intramedulární expanze'
                    };
                    const expMapConc = {
                        'ED-cysta': 'epidurální cysta',
                        'ID-meningeom': 'intradurální ložisko (susp. meningeom)',
                        'ID-schwannom': 'intradurální ložisko v průběhu kořene (susp. schwannom)',
                        'IM-ependymom': 'intramedulární expanze (susp. ependymom)',
                        'IM-astrocytom': 'intramedulární expanze (susp. astrocytom)',
                        'IM-hemangiobl.': 'intramedulární expanze (susp. hemangioblastom)'
                    };
                    const sideMap = { 'R': 'vpravo', 'L': 'vlevo', 'C': 'centrálně' };
                    let expText = expMap[expansion] || expansion;
                    let eTxt = expMapConc[expansion] || expansion;
                    if (expSide && expSide !== '0') {
                        expText += ` ${sideMap[expSide] || expSide}`;
                        eTxt += ` ${sideMap[expSide] || expSide}`;
                    }
                    if (expSize) {
                        const dim = String(expSize).includes('x') ? ` rozměru ${expSize} mm` : ` diametru ${expSize} mm`;
                        expText += dim;
                    }
                    sentences.push(spineSvgSentence(expText));
                    causes.push({
                        nom: eTxt,
                        gen: eTxt.replace('cysta', 'cysty').replace('intradurální ložisko', 'intradurálního ložiska').replace('ložisko', 'ložiska')
                    });
                }
            }

            if (sentences.length > 0) {
                hasSegmentPathology = true;
                segmentBlocks.push({ type: 'frame', text: `${seg.disc}: ${sentences.join(' ')}` });
            }

            const concLines = [];
            const fibrosisGenArr = fibrosisArr.map((s) => String(s).replace('fibróza', 'fibrózy'));
            const structuralNomParts = [...causes.map((c) => c.nom), ...fibrosisArr, ...adhesionArr].filter(Boolean);
            const structuralGenParts = [...causes.map((c) => c.gen), ...fibrosisGenArr, ...adhesionArr].filter(Boolean);

            effects.sort((a, b) => {
                if (a.kind !== b.kind) return SPINE_SVG_EFFECT_ORDER[a.kind] - SPINE_SVG_EFFECT_ORDER[b.kind];
                return b.sev - a.sev;
            });

            if (discIdx === 2 || discIdx === 3) {
                dddIIPlusCount++;
                if (effects.length > 0) dddIIPlusWithStenosis++;
            }

            if (effects.length > 0) {
                const structuralNom = structuralNomParts.length ? spineSvgJoinCzech(structuralNomParts) : 'strukturální změny';
                const structuralGen = structuralGenParts.length ? spineSvgJoinCzech(structuralGenParts) : 'strukturálních změn';
                const effectStrNom = spineSvgJoinCzech(effects.map((e) => e.nom));
                const effectStrDat = spineSvgJoinCzech(effects.map((e) => e.dat));
                const prep = /^(s[bcdfghjklmnpqrstvwxz]|z[bcdfghjklmnpqrstvwxz]|š[bcdfghjklmnpqrstvwxz]|ž[bcdfghjklmnpqrstvwxz]|k|g)/i.test(effectStrDat) ? 'ke' : 'k';

                concLines.push(isStenosisFirst
                    ? `${effectStrNom} na podkladě ${structuralGen}.`
                    : `${structuralNom} vedoucí ${prep} ${effectStrDat}.`);
            } else {
                const significantCauses = causes.filter((c) => !SPINE_SVG_IS_INSIGNIFICANT(c));
                const insignificantCauses = causes.filter(SPINE_SVG_IS_INSIGNIFICANT);
                significantCauses.forEach((c) => {
                    if (c && c.nom) concLines.push(`${c.nom}.`);
                });
                if (insignificantCauses.length > 0) hasUncomplicatedDegen = true;
                [...fibrosisArr, ...adhesionArr].forEach((txt) => {
                    if (txt) concLines.push(`${txt}.`);
                });
            }

            if (modicIdx === 1) concLines.push('Edém krycích ploten Modic I.');

            if (concLines.length > 0) {
                const combined = concLines.map((line, i) => {
                    let str = String(line).trim();
                    if (i > 0 && str.length > 0) str = capitalize(str);
                    return str;
                }).join(' ');
                const rank = effects.length ? Math.max(...effects.map(SPINE_SVG_EFFECT_RANK)) : 0;
                segmentConcItems.push({ label: seg.disc, text: combined, rank, segIndex });
            }
        });

        segmentConcItems.sort((a, b) => b.rank - a.rank || a.segIndex - b.segIndex);
        const mergedSegConc = [];
        segmentConcItems.forEach((item) => {
            const last = mergedSegConc[mergedSegConc.length - 1];
            if (last && last.text === item.text) last.labels.push(item.label);
            else mergedSegConc.push({ labels: [item.label], text: item.text });
        });

        if (concStaticSentences.length > 0) {
            main.push({ type: 'frame', text: concStaticSentences.join(' ') });
        }

        mergedSegConc.forEach((group) => {
            let body = group.text;
            if (group.labels.length > 1 && typeof pluralizeGrammar === 'function') {
                body = pluralizeGrammar(body, 'spine');
            }
            main.push({ type: 'frame', text: `${group.labels.join(', ')}: ${body}` });
        });

        const modicConcSentences = [];
        if (collModic['Modic II']) modicConcSentences.push(`Tuková degenerace krycích ploten ${spineSvgJoinCzech(collModic['Modic II'])} Modic II.`);
        if (collModic['Modic III']) modicConcSentences.push(`Skleróza krycích ploten ${spineSvgJoinCzech(collModic['Modic III'])} Modic III.`);
        if (collModic['destrukce']) modicConcSentences.push(`Destrukce krycích ploten ${spineSvgJoinCzech(collModic['destrukce'])}.`);
        if (modicConcSentences.length > 0) {
            main.push({ type: 'frame', text: modicConcSentences.join(' ') });
        }

        const shapeSentences = [];
        const concShapeSentences = [];
        if (collShapes.schmorl) {
            const l = collShapes.schmorl;
            const txt = l.length > 1
                ? `Schmorlovy uzly ${l.join(', ')}.`
                : `${l[0]}.`;
            shapeSentences.push(txt);
            concShapeSentences.push(txt);
        }
        if (collShapes.klínovitá) {
            const txt = `Klínovitá komprese ${collShapes.klínovitá.join(' - ')}.`;
            shapeSentences.push(txt);
            concShapeSentences.push(txt);
        }
        if (collShapes.prolomení) {
            const txt = `Prolomení krycí plotny obratle ${collShapes.prolomení.join(', ')}.`;
            shapeSentences.push(txt);
            concShapeSentences.push(txt);
        }
        if (collShapes.propagace) {
            shapeSentences.push(`Výrazná komprese těla ${collShapes.propagace.join(', ')} s propagací dorzálně.`);
        }

        const surgSentences = [];
        const stabRange = spineSvgVertebraRange(stabSegments);
        if (stabRange) surgSentences.push(`${cfg.stabilization} stabilizace ${stabRange}.`);
        if (discReplacements.length > 0) surgSentences.push(`Náhrada disku ${discReplacements.join(', ')}.`);
        if (laminVertebrae.length > 0) surgSentences.push(`Laminektomie ${laminVertebrae.join(', ')}.`);

        const lesionSentences = [];
        const lesionList = (key) => collLesions[key] || [];
        const plural = (arr) => arr.length > 1;
        if (lesionList('hemangiom').length) {
            lesionSentences.push(plural(lesionList('hemangiom'))
                ? `Hemangiomy v obratlových tělech ${lesionList('hemangiom').join(', ')}.`
                : `Hemangiom v obratlovém těle ${lesionList('hemangiom').join(', ')}.`);
        }
        if (lesionList('atypický hemangiom').length) {
            const t = plural(lesionList('atypický hemangiom'))
                ? `Atypické hemangiomy v obratlových tělech ${lesionList('atypický hemangiom').join(', ')}.`
                : `Atypický hemangiom v obratlovém těle ${lesionList('atypický hemangiom').join(', ')}.`;
            lesionSentences.push(t);
            main.push({ type: 'frame', text: t });
        }
        if (lesionList('agresivní hemangiom').length) {
            const t = plural(lesionList('agresivní hemangiom'))
                ? `Agresivní hemangiomy v obratlových tělech ${lesionList('agresivní hemangiom').join(', ')}.`
                : `Agresivní hemangiom v obratlovém těle ${lesionList('agresivní hemangiom').join(', ')}.`;
            lesionSentences.push(t);
            main.push({ type: 'frame', text: t });
        }
        if (lesionList('lytická').length) {
            const t = plural(lesionList('lytická'))
                ? `Lytická ložiska v obratlových tělech ${lesionList('lytická').join(', ')}.`
                : `Lytické ložisko v obratlovém těle ${lesionList('lytická').join(', ')}.`;
            lesionSentences.push(t);
            main.push({ type: 'frame', text: `Suspektní lytické ložisko ${lesionList('lytická').join(', ')}.` });
        }
        if (lesionList('sklerotická').length) {
            const t = plural(lesionList('sklerotická'))
                ? `Sklerotická ložiska v obratlových tělech ${lesionList('sklerotická').join(', ')}.`
                : `Sklerotické ložisko v obratlovém těle ${lesionList('sklerotická').join(', ')}.`;
            lesionSentences.push(t);
            main.push({ type: 'frame', text: `Sklerotické ložisko ${lesionList('sklerotická').join(', ')}.` });
        }

        if (staticPhysio.length > 0) {
            report.push({ type: 'frame', text: staticPhysio.join(' '), dimmed: true });
        }
        if (staticPatho.length > 0) {
            report.push({ type: 'frame', text: staticPatho.join(' ') });
        }

        if (shapeSentences.length > 0) {
            report.push({ type: 'frame', text: shapeSentences.join(' ') });
            report.push({ type: 'frame', text: 'Ostatní těla přiměřených výšek.', dimmed: true });
            if (concShapeSentences.length > 0) {
                main.push({ type: 'frame', text: concShapeSentences.join(' ') });
            }
        } else {
            report.push({ type: 'frame', text: 'Obratlová těla přiměřených výšek.', dimmed: true });
        }

        if (!hasSegmentPathology) {
            report.push({ type: 'frame', text: 'Meziobratlové segmenty s disky přiměřených výšek bez výraznějších protruzí, bez facetových artróz.', dimmed: true });
            report.push({ type: 'frame', text: 'Páteřní kanál a foramina jsou volná.', dimmed: true });
        }

        if (surgSentences.length > 0) {
            report.push({ type: 'frame', text: surgSentences.join(' ') });
            main.push({ type: 'frame', text: surgSentences.join(' ') });
        }
        if (lesionSentences.length > 0) {
            report.push({ type: 'frame', text: lesionSentences.join(' ') });
        }

        if (segmentBlocks.length > 0) {
            report.push(...segmentBlocks);
        }

        if (hasSegmentPathology) {
            report.push({ type: 'frame', text: 'Ostatní meziobratlové segmenty bez výraznější morfologické patologie.', dimmed: true });
            if (hasSpinalStenosis && hasForaminalStenosis) {
                report.push({ type: 'frame', text: 'V ostatních segmentech bez jiných výraznějších spinálních a foraminálních stenóz.', dimmed: true });
            } else if (hasSpinalStenosis) {
                report.push({ type: 'frame', text: 'V ostatních segmentech bez zřetelných spinálních stenóz. Foramina jsou volná.', dimmed: true });
            } else if (hasForaminalStenosis) {
                report.push({ type: 'frame', text: 'Páteřní kanál zůstává volný. Bez jiných zřetelných foraminálních stenóz.', dimmed: true });
            } else {
                report.push({ type: 'frame', text: 'Páteřní kanál a foramina jsou volná.', dimmed: true });
            }
        }

        const myeloLevel = T('myelo_level');
        const myeloLoc = T('myelopatie');
        const myeloSize = ctx.field('myelo_size');
        if (myeloLevel && myeloLevel !== 'etáž' && myeloLoc && myeloLoc !== 'myelopatie') {
            let reportMyelo = `ložisko vysoké SI intramedulárně ${myeloLoc} v úrovni ${myeloLevel}`;
            let concMyelo = `myelopatie ${myeloLoc} v úrovni ${myeloLevel}`;
            if (myeloSize) {
                reportMyelo += ` délky cca ${myeloSize} mm`;
                concMyelo += ` délky cca ${myeloSize} mm`;
            }
            report.push({ type: 'frame', text: capitalize(reportMyelo) + '.' });
            main.push({ type: 'frame', text: capitalize(concMyelo) + '.' });
        } else if (!(ctx.examId || '').toLowerCase().startsWith('ct')) {
            report.push({ type: 'frame', text: 'Přehledný úsek míchy bez signálových změn.', dimmed: true });
        }

        if (concAxisLordosis.length > 0) {
            main.push({ type: 'frame', text: concAxisLordosis.join(' ') });
        }

        if (dddIIPlusCount >= 4 && dddIIPlusWithStenosis >= 3) {
            main.unshift({ type: 'frame', text: `Multietážové degenerativní změny ${ADJ} páteře:` });
        } else if (dddIIPlusCount >= 3 && dddIIPlusWithStenosis >= 2) {
            main.unshift({ type: 'frame', text: `Víceetážové degenerativní změny ${ADJ} páteře:` });
        }

        if (hasUncomplicatedDegen) {
            if (main.length > 0) {
                main.push({ type: 'frame', text: 'Jinak nevýrazné degenerativní změny bez stenóz a útlaku durálního vaku / kořenů.' });
            } else {
                main.push({ type: 'frame', text: `Nevýrazné degenerativní změny ${ADJ} páteře bez stenóz a útlaku durálního vaku / kořenů.` });
            }
        }

        if (main.length === 0) {
            main.push({ type: 'frame', text: `Přiměřený nález na ${ADJ} páteři.`, dimmed: true });
        }

        if (hizSegments.length > 0) {
            incidental.push({
                type: 'frame',
                text: `Anulární fisura (HIZ) v zadní části disku ${spineSvgJoinCzech(hizSegments)}.`
            });
        }

        const customDesc = ctx.field('custom_desc');
        if (customDesc) {
            let txt = customDesc.trim();
            if (txt && !txt.endsWith('.')) txt += '.';
            if (txt) report.push({ type: 'frame', text: capitalize(txt) });
        }
        const customConc = ctx.field('custom_conc');
        if (customConc) {
            let txt = customConc.trim();
            if (txt && !txt.endsWith('.')) txt += '.';
            if (txt) incidental.push({ type: 'frame', text: capitalize(txt) });
        }

        return {
            report,
            conclusion: { main, incidental }
        };
    }

    return {
        title: cfg.title,
        reportLayout: 'block',
        buttons: {},

        svgLabel: (pathEl) => svgLabel(pathEl),

        layout: (helpers) => {
            ensureStyles();

            const examId = Store.activeTab || 'default';
            const activeId = `${examId}_${R}_active`;
            ButtonConfigs[activeId] = {
                type: 'standard',
                states: ['—', ...segments]
            };
            const activeIdx = Store.buttonStates[activeId] || 0;
            const seg = activeSeg();
            const segKey = seg ? seg.sPfx : null;

            /* Všechny segmenty — compile čte celou páteř. */
            segmentLevels.forEach((l) => {
                allowedPaths.forEach((pathKey) => {
                    const spec = SPINE_SVG_PATHS[pathKey];
                    if (!spec.states) return;
                    ButtonConfigs[pathId(examId, l.sPfx, pathKey)] = { type: 'standard', states: spec.states };
                });
                Object.keys(SPINE_SVG_SUB).forEach((subKey) => {
                    ButtonConfigs[pathId(examId, l.sPfx, subKey)] = { type: 'standard', states: SPINE_SVG_SUB[subKey] };
                });

                SPINE_SVG_OPS.forEach((key) => {
                    ButtonConfigs[pathId(examId, l.sPfx, key)] = { type: 'basic', text: key };
                });
            });

            const nodes = [];
            nodes.push(globalTable(helpers));

            const root = el('div', {
                id: `${R}_main`,
                className: 'spine-svg-layout'
            });

            const isOpActive = Store.buttonStates[`${examId}_${R}_op`] === 1;
            const segs = el('div', { className: 'spine-svg-segs' });
            segments.forEach((label, i) => {
                const idx = i + 1;
                const lvl = segmentLevels[i];
                const btn = el('button', {
                    className: 'btn' + (activeIdx === idx ? ' selected' : ''),
                    type: 'button',
                    textContent: label
                });
                btn.style.gridRow = String(idx);
                btn.style.gridColumn = '1';
                const setSeg = (e, on) => {
                    e.preventDefault();
                    e.stopPropagation();
                    focusPath = null;
                    const next = on ? idx : (activeIdx === idx ? 0 : activeIdx);
                    if (next === activeIdx) return;
                    commitButtonState(activeId, next);
                };
                btn.addEventListener('click', (e) => setSeg(e, true));
                btn.addEventListener('contextmenu', (e) => setSeg(e, false));
                btn.addEventListener('wheel', (e) => setSeg(e, e.deltaY < 0), { passive: false });
                segs.appendChild(btn);

                if (!isOpActive) return;
                SPINE_SVG_OPS.forEach((key, col) => {
                    const opBtn = makeButton(R, { btn: key, id: `${lvl.sPfx}_${key}`, type: 'basic', text: key });
                    opBtn.classList.add('spine-svg-op-btn');
                    opBtn.style.gridRow = String(idx);
                    opBtn.style.gridColumn = String(col + 2);
                    segs.appendChild(opBtn);
                });
            });
            root.appendChild(segs);

            const map = el('div', { className: 'spine-svg-map' });
            if (segKey) {
                const svgHost = el('div', { className: 'spine-svg-host' });
                const infoPanel = buildInfoPanel();
                map.appendChild(svgHost);
                map.appendChild(infoPanel);
                mountSvg(svgHost, segKey, examId, infoPanel);

                trackPointer(map, infoPanel, examId, segKey);
            } else {
                focusPath = null;
                map.appendChild(el('div', {
                    className: 'spine-svg-hint',
                    textContent: 'Vyber segment vlevo'
                }));
            }
            root.appendChild(map);
            nodes.push(root);

            nodes.push(el('div', { style: 'height: 20px;' }));
            nodes.push(expTable(helpers));
            nodes.push(el('div', { style: 'height: 20px;' }));
            nodes.push(helpers.Table1col('lsp_ost_add', [
                { field: 'text', id: 'custom_desc', placeholder: 'vlastní...popis...' },
                { field: 'text', id: 'custom_conc', placeholder: 'vlastní...závěr...' }
            ]));
            nodes.push(concSlider());
            nodes.push(el('div', { style: 'height: 6px;' }));

            return nodes;
        },

        compile: (ctx) => compile(ctx)
    };
}
