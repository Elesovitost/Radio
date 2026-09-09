/* =============================================================
   grammar.js
   Module extracted from index.html inline <script>.
   Edit this file - NOT index.html - to change this part.
   ============================================================= */

/* ═══════════════════════════════════════════════
   GRAMMAR DICTIONARY
═══════════════════════════════════════════════ */
const GRAMMAR_DICT = {
    pocet: {
        'solitární':  { m: 'solitární',  f: 'solitární',  n: 'solitární' },
        'dvě':        { m: 'dva',        f: 'dvě',        n: 'dvě' },
        'vícečetné':  { m: 'vícečetné',  f: 'vícečetné',  n: 'vícečetná' },
        'mnohočetné': { m: 'mnohočetné', f: 'mnohočetné', n: 'mnohočetná' }
    },
    druh: {
        'ložisko':    { rod: 'n', plural: 'ložiska' },
        'sklerotické ložisko': { rod: 'n', plural: 'sklerotická ložiska' },
        'lytické ložisko': { rod: 'n', plural: 'lytická ložiska' },
        'smíšené ložisko': { rod: 'n', plural: 'smíšená ložiska' },
        'ložisko kostní dřeně': { rod: 'n', plural: 'ložiska kostní dřeně' },
        'expanze':    { rod: 'f', plural: 'expanze' },
        'infiltrace': { rod: 'f', plural: 'infiltrace' },
        'konsolidace': { rod: 'f', plural: 'konsolidace' },
        'defekt':     { rod: 'm', plural: 'defekty' },
        'nodul':     { rod: 'm', plural: 'noduly' },
        'fokus':     { rod: 'm', plural: 'fokusy' },
        'kolekce':    { rod: 'f', plural: 'kolekce' },
        'lem tekutiny': { rod: 'm', plural: 'lemy tekutiny' },
        'cystické ložisko': { rod: 'n', plural: 'cystická ložiska' },
        'vlastní':    { rod: 'n', plural: 'vlastní' },
        'uzlina':     { rod: 'f', plural: 'uzliny' },
        'paket':      { rod: 'm', plural: 'pakety' }
    },
    lokalizace: {
        'patro':           { pad2: 'patra', pad6: 'patře' },
        'tonsila':         { pad2: 'tonsily', pad6: 'tonsile' },
        'jazyk':           { pad2: 'jazyka', pad6: 'jazyku' },
        'farynx':          { pad2: 'faryngu', pad6: 'faryngu' },
        'hypofarynx':      { pad2: 'hypofaryngu', pad6: 'hypofaryngu' },
        'larynx':          { pad2: 'laryngu', pad6: 'laryngu' },
        'parotis':         { pad2: 'parotidy', pad6: 'parotidě' },
        'submandibularis': { pad2: 'submandibulární žlázy', pad6: 'submandibulární žláze' },
        'thyroidea':       { pad2: 'thyroidey', pad6: 'thyroidee' }
    },
    spine: {
        'mírná spinální stenóza': {
            pad1: 'mírná spinální stenóza', pad1pl: 'mírné spinální stenózy',
            pad2: 'mírné spinální stenózy', pad2pl: 'mírných spinálních stenóz',
            pad3: 'mírné spinální stenóze', pad3pl: 'mírným spinálním stenózám'
        },
        'výrazná spinální stenóza': {
            pad1: 'výrazná spinální stenóza', pad1pl: 'výrazné spinální stenózy',
            pad2: 'výrazné spinální stenózy', pad2pl: 'výrazných spinálních stenóz',
            pad3: 'výrazné spinální stenóze', pad3pl: 'výrazným spinálním stenózám'
        },
        'spinální stenóza': {
            pad1: 'spinální stenóza', pad1pl: 'spinální stenózy',
            pad2: 'spinální stenózy', pad2pl: 'spinálních stenóz',
            pad3: 'spinální stenóze', pad3pl: 'spinálním stenózám'
        },
        'mírná stenóza': {
            pad1: 'mírná stenóza', pad1pl: 'mírné stenózy',
            pad2: 'mírné stenózy', pad2pl: 'mírných stenóz',
            pad3: 'mírné stenóze', pad3pl: 'mírným stenózám'
        },
        'výrazná stenóza': {
            pad1: 'výrazná stenóza', pad1pl: 'výrazné stenózy',
            pad2: 'výrazné stenózy', pad2pl: 'výrazných stenóz',
            pad3: 'výrazné stenóze', pad3pl: 'výrazným stenózám'
        },
        'stenóza': {
            pad1: 'stenóza', pad1pl: 'stenózy',
            pad2: 'stenózy', pad2pl: 'stenóz',
            pad3: 'stenóze', pad3pl: 'stenózám'
        },
        'bulging disku': {
            pad1: 'bulging disku', pad1pl: 'bulgingy disků',
            pad2: 'bulgingu disku', pad2pl: 'bulgingů disků'
        },
        'herniace disku': {
            pad1: 'herniace disku', pad1pl: 'herniace disků',
            pad2: 'herniace disku', pad2pl: 'herniace disků'
        },
        'mírná facetová artróza': {
            pad1: 'mírná facetová artróza', pad1pl: 'mírné facetové artrózy',
            pad2: 'mírné facetové artrózy', pad2pl: 'mírných facetových artróz'
        },
        'střední facetová artróza': {
            pad1: 'střední facetová artróza', pad1pl: 'střední facetové artrózy',
            pad2: 'střední facetové artrózy', pad2pl: 'středních facetových artróz'
        },
        'pokročilá facetová artróza': {
            pad1: 'pokročilá facetová artróza', pad1pl: 'pokročilé facetové artrózy',
            pad2: 'pokročilé facetové artrózy', pad2pl: 'pokročilých facetových artróz'
        },
        'facetová artróza': {
            pad1: 'facetová artróza', pad1pl: 'facetové artrózy',
            pad2: 'facetové artrózy', pad2pl: 'facetových artróz'
        },
        'bulging': {
            pad1: 'bulging', pad1pl: 'bulgingy',
            pad2: 'bulgingu', pad2pl: 'bulgingů'
        },
        'disk': {
            pad1: 'disk', pad1pl: 'disky',
            pad2: 'disku', pad2pl: 'disků'
        },
        'herniace': {
            pad1: 'herniace', pad1pl: 'herniace',
            pad2: 'herniace', pad2pl: 'herniace'
        }
    }
};

function pluralizeGrammar(text, dictKey = 'spine') {
    const dict = GRAMMAR_DICT[dictKey];
    if (!dict || !text) return text;

    const phrases = [];
    Object.values(dict).forEach((entry) => {
        if (entry.pad1 && entry.pad1pl && entry.pad1 !== entry.pad1pl) {
            phrases.push({ from: entry.pad1, to: entry.pad1pl });
        }
        if (entry.pad2 && entry.pad2pl && entry.pad2 !== entry.pad2pl) {
            phrases.push({ from: entry.pad2, to: entry.pad2pl });
        }
        if (entry.pad3 && entry.pad3pl && entry.pad3 !== entry.pad3pl) {
            phrases.push({ from: entry.pad3, to: entry.pad3pl });
        }
    });
    phrases.sort((a, b) => b.from.length - a.from.length);

    const occupied = new Array(text.length).fill(false);
    const matches = [];
    phrases.forEach(({ from, to }) => {
        let idx = 0;
        while ((idx = text.indexOf(from, idx)) !== -1) {
            let overlap = false;
            for (let i = idx; i < idx + from.length; i++) {
                if (occupied[i]) { overlap = true; break; }
            }
            if (!overlap) {
                matches.push({ start: idx, end: idx + from.length, to });
                for (let i = idx; i < idx + from.length; i++) occupied[i] = true;
            }
            idx += from.length;
        }
    });
    matches.sort((a, b) => a.start - b.start);

    let out = '';
    let pos = 0;
    matches.forEach((m) => {
        out += text.slice(pos, m.start) + m.to;
        pos = m.end;
    });
    return out + text.slice(pos);
}
