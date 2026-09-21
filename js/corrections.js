/* =============================================================
   corrections.js
   Jediné místo, kde se opravuje text zprávy.

   sanitize()  = filtr modality → gramatika → typografie (normalize)
                 (nad jedním blokem z region.compile())
   normalize() = typografie (mezery, interpunkce, opakovaná slova);
                 i při zobrazení / kopírování (ReportText.frameText)
   validate()  = pojmenuje zbývající chyby (FIXES, krátké věty, …)

   Pořadí kroků je záměrné - gramatika dělí věty podle ". ",
   proto se typografie pouští až po ní.
   ============================================================= */

/* -------------------------------------------------------------
   1) Filtr podle modality - co u daného vyšetření nedává smysl.
   ------------------------------------------------------------- */
function modalityFilter(text, examId, isConclusion) {
    const eId = String(examId || '').toLowerCase();
    let out = text;

    if (eId.includes('pet')) {
        /* U FDG závěru se "akumulace RF" nahrazuje metabolickou aktivitou. */
        if (isConclusion && eId.includes('fdg')) {
            out = out.replace(/akumulací\s+RF/gi, 'metabolickou aktivitou')
                     .replace(/akumulace\s+RF/gi, 'metabolické aktivity');
        }
        return out;
    }

    /* Ne-PET vyšetření: fráze o akumulaci RF se vypouští. */
    return out.replace(/\s*s[e]?\s+(nízkou|intermediární|zvýšenou|vysokou)\s+(akumulací\s+RF|aktivitou)/gi, '')
              .replace(/\s*bez\s+(?:(?:nízké|intermediární|zvýšené|vysoké)\s+)?(akumulace\s+RF|aktivity)/gi, '');
}

/* -------------------------------------------------------------
   2) Gramatika - přeskládání věty podle významu.
   ------------------------------------------------------------- */

/* Rod a číslo podmětu pro dynamický tvar ("hypermetabolické ložisko"). */
function hyperForm(slovo) {
    const s = String(slovo).toLowerCase();
    let rod = 'n';
    let isPlural = false;
    let found = false;

    for (const [key, val] of Object.entries(GRAMMAR_DICT.druh)) {
        const singularLast = key.split(' ').pop();
        const pluralLast = val.plural.split(' ').pop();

        if (s === key || s === singularLast) {
            rod = val.rod; isPlural = false; found = true; break;
        } else if (s === val.plural || s === pluralLast) {
            rod = val.rod; isPlural = true; found = true; break;
        }
    }

    if (!found) {
        if (s.match(/a$/)) { rod = 'f'; isPlural = false; }
        else if (s.match(/y$/) || s === 'léze') { rod = 'f'; isPlural = true; }
        else if (s.match(/l$/)) { rod = 'm'; isPlural = false; }
    }

    if (rod === 'm') return isPlural ? 'hypermetabolické' : 'hypermetabolický';
    if (rod === 'f') return isPlural ? 'hypermetabolické' : 'hypermetabolická';
    return isPlural ? 'hypermetabolická' : 'hypermetabolické';
}

/* Fráze "s … aktivitou" → přídavné jméno před podmětem. */
const AKTIVITY_PRAVIDLA = [
    { find: /\s*s nízkou metabolickou aktivitou/i, prefix: 'nízce metabolicky aktivní' },
    { find: /\s*s intermediární metabolickou aktivitou/i, prefix: 'středně metabolicky aktivní' },
    { find: /\s*se zvýšenou metabolickou aktivitou/i, prefix: 'zvýšeně metabolicky aktivní' },
    { find: /\s*s vysokou metabolickou aktivitou/i, prefix: '', dynamicky: true }
];

const META_REGEX = /\s*:\s*charakteru metastázy/i;
const SUBJEKT_REGEX = /^(.*?)(ložisk[oa]|expanze|infiltrace|defekt[y]?|kolekce|uzlin[ay]|paket[y]?|nodul[y]?|cyst[ay]|léze)(.*)/i;
const TUMOR_REGEX = /^([A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ])([^:.]+?):\s*charakteru tumoru([^.]*)/;

function grammar(text) {
    return text.split(/\.\s+(?=[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ])/).map(veta => {
        let upravena = veta;
        const maMetu = META_REGEX.test(upravena);
        const nalezenaAkt = AKTIVITY_PRAVIDLA.find(p => p.find.test(upravena));

        if (nalezenaAkt) upravena = upravena.replace(nalezenaAkt.find, '');
        if (maMetu) upravena = upravena.replace(META_REGEX, '');

        if (maMetu || nalezenaAkt) {
            const match = upravena.match(SUBJEKT_REGEX);

            if (match) {
                const pred = match[1];
                let subjekt = match[2];
                const zbytek = match[3];

                let vkladanyText = '';
                if (nalezenaAkt) {
                    vkladanyText += nalezenaAkt.dynamicky ? hyperForm(subjekt) + ' ' : nalezenaAkt.prefix + ' ';
                }
                if (maMetu) vkladanyText += 'meta ';

                if (pred.trim() === '') {
                    vkladanyText = capitalize(vkladanyText);
                    subjekt = subjekt.toLowerCase();
                }

                upravena = pred + vkladanyText + subjekt + zbytek;
            } else {
                let vkladanyText = '';
                if (nalezenaAkt) {
                    vkladanyText += nalezenaAkt.dynamicky ? 'hypermetabolické ' : nalezenaAkt.prefix + ' ';
                }
                if (maMetu) vkladanyText += 'meta ';
                vkladanyText = capitalize(vkladanyText);
                upravena = vkladanyText + upravena.charAt(0).toLowerCase() + upravena.slice(1);
            }
        }

        return upravena.replace(TUMOR_REGEX, (m, f, mid, rest) => "Tumorózní " + f.toLowerCase() + mid + rest);
    }).join('. ');
}

/* -------------------------------------------------------------
   3) Typografie — opravuje se sama (zobrazení i sanitize).
   ------------------------------------------------------------- */

/* Zdvojené mezery, mezera před interpunkcí, zdvojená interpunkce,
   opakovaná krátká slova. Nové řádky zachová. */
function normalize(text) {
    let out = String(text == null ? '' : text)
        .replace(/bilat\.\./gi, 'bilat.')
        .replace(/[ \t]+/g, ' ')
        .replace(/[ \t]+([.,;])/g, '$1')
        .replace(/,\s*\./g, '.')
        .replace(/\.{2,}/g, '.')
        .replace(/,{2,}/g, ',');

    const dupWord = /\b(a|i|v|ve|na|s|se|z|ze|k|ke|o|u|do|je|jsou)\s+\1\b/gi;
    let prev;
    do {
        prev = out;
        out = out.replace(dupWord, '$1');
    } while (out !== prev);

    return out;
}

/* Alias: dříve zhutnění mezer v bloku; teď stejné jako normalize. */
function tighten(text) {
    return normalize(text);
}

/* Doplnění koncové tečky (závěr je souvislý text, findings se slepují mezerou). */
function finishSentence(text) {
    return /[a-záčďéěíňóřšťúůýž]$/.test(text) ? text + '.' : text;
}

/* -------------------------------------------------------------
   4) Deduplikace (sdílená množina napříč částmi závěru).
   ------------------------------------------------------------- */
function dedupe(items, seen = new Set()) {
    const out = [];
    for (const item of items || []) {
        const text = String(item == null ? '' : item).trim();
        if (!text || seen.has(text)) continue;
        seen.add(text);
        out.push(text);
    }
    return out;
}

/* -------------------------------------------------------------
   5) Validace - pojmenuje chyby, které v textu zůstaly.
   ------------------------------------------------------------- */

/* Slovník známých chyb šablon: co najít a čím nahradit. Aplikuje se v sanitize(). */
const FIXES = [
    {
        find: /\bv gastrointestinální traktu\b/,
        replace: 'v gastrointestinálním traktu',
        note: '6. pád po předložce "v"'
    },
    {
        find: /(zcela nespecifický nález)\.\s+k referenčnímu/,
        replace: '$1. Akumulace RF vztažena k referenčnímu',
        note: 'chybí věta o vztažení RF (šablona DOPA)'
    }
];

/* Opraví všechny známé chyby v textu. */
function applyFixes(text) {
    let out = text;
    for (const fix of FIXES) {
        out = out.replace(new RegExp(fix.find.source, fix.find.flags + 'g'), fix.replace);
    }
    return out;
}

/* Zkratky a zkrácená slova, po kterých tečka nekončí větu
   (dělení vět pro kontrolu jednoslovných „vět“). Zkratky o 1–2 znacích
   a římské číslice se berou automaticky. */
const ZKRATKY = ['bilat', 'event', 'tj', 'např', 'tzv', 'č', 'str', 'př', 'min', 'max',
                 'vs', 'atd', 'resp', 'popř', 'susp', 'parc', 'obv', 'vel', 'kol', 'kraj',
                 'pravděp', 'pravděpod', 'ref', 'lig', 'asc', 'dif', 'dg', 'char', 'art',
                 'sin', 'dist', 'tubul', 'st', 'prof', 'mudr', 'mgr', 'ing', 'doc',
                 'judr', 'rndr', 'phdr', 'pharmdr', 'bca', 'diS', 'thlic', 'mvdr',
                 /* anatomické / popisné zkratky užívané v šablonách */
                 'přim', 'prox', 'dist', 'sup', 'inf', 'med', 'later', 'ventr', 'dorz',
                 'tib', 'fem', 'thor', 'lumb', 'cerv', 'potenc', 'vč', 'kompl', 'subtot',
                 'intratend', 'intraart', 'subt'];

function jeZkratka(token) {
    /* Token může mít před sebou interpunkci ("(st", "(susp"). */
    const core = String(token).replace(/^[^0-9A-Za-zÁ-Žá-ž]+/, '');
    return core.length <= 2
        || /^[IVXLCDM]+$/i.test(core)
        || ZKRATKY.includes(core.toLowerCase());
}

function snippet(text, index, length) {
    const from = Math.max(0, index - 25);
    const to = Math.min(text.length, index + length + 25);
    return (from > 0 ? '…' : '') + text.slice(from, to).replace(/\n/g, '\\n') + (to < text.length ? '…' : '');
}

/* Jednoslovná "věta" = pravděpodobně nedostatečně určený nález. */
const KRATKA_VETA = /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ][A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽa-záčďéěíňóřšťúůýž]{3,}$/;

/* Samostatně stojící diagnóza (Cholecystolitiáza., Splenomegalie., Nefrolitiáza.)
   je platný závěr, ne nedostatečně určený nález - pozná se podle koncovky. */
const DIAGNOZA_KONCOVKA = /(óza|oza|áza|aza|ita|itida|itída|émie|emie|patie|megalia|plazie|skleróza|fibróza|ektázie|stenóza|infarkt|absces|hematom|lymfom|karcinom|metastáza|fraktura|cysta|hernie|aneurysma|trombóza|embolie|ie)$/i;

/* Rozdělí text na věty; tečka po zkratce (m., v.s., dif. dg.) větu nekončí. */
function splitSentences(text) {
    const parts = [];
    let start = 0;
    for (const m of text.matchAll(/[.!?]+/g)) {
        const slovo = (text.slice(0, m.index).match(/[^\s.]+$/) || [''])[0];
        if (m[0] === '.' && jeZkratka(slovo)) continue;
        parts.push(text.slice(start, m.index));
        start = m.index + m[0].length;
    }
    parts.push(text.slice(start));
    return parts.map(s => s.trim()).filter(Boolean);
}

function checkShortSentences(text, found) {
    let section = '';

    for (let line of text.split('\n')) {
        line = line.trim();
        if (!line) continue;

        /* Hlavička sekce: "HRUDNÍK:" nebo celý řádek velkými písmeny. */
        const header = line.match(/^([A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ ]+):/);
        if (header) section = header[1].trim();
        else if (line === line.toUpperCase() && line.length > 2) section = line;

        for (const sentence of splitSentences(line)) {
            const clean = sentence.replace(/^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ ]+:\s*/, '').trim();
            /* Samotná římská číslice ani název diagnózy není nedostatečně určený nález. */
            if (KRATKA_VETA.test(clean) && !/^[IVXLCDM]+$/.test(clean) && !DIAGNOZA_KONCOVKA.test(clean)) {
                const kde = section ? ` v sekci ${section}` : '';
                found.push({
                    level: 'error',
                    message: `Pozor, překontroluj ${clean}.${kde}, pravděpodobně nedostatečně určeno.`
                });
            }
        }
    }
}

function validate(text) {
    const found = [];
    if (typeof text !== 'string' || !text) return found;

    /* Slovník známých chyb - sem se dostane jen text, který neprošel sanitize(). */
    for (const fix of FIXES) {
        const hit = new RegExp(fix.find.source, fix.find.flags).exec(text);
        if (hit) {
            const replacement = fix.replace.replace('$1', hit[1] || '');
            found.push({
                level: 'error',
                message: `neopravená známá chyba: "${snippet(text, hit.index, hit[0].length)}" → "${replacement}" (${fix.note})`
            });
        }
    }

    /* Typografie (mezery, interpunkce, opakovaná slova) se opravuje v normalize(). */

    const missingSpace = /[a-záčďéěíňóřšťúůýž]\.[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/.exec(text);
    if (missingSpace) {
        found.push({
            level: 'warn',
            message: `chybí mezera po tečce: "${snippet(text, missingSpace.index, missingSpace[0].length)}"`
        });
    }

    /* Neuzavřená poslední věta. */
    if (!/[.):]$/.test(text.trim())) {
        found.push({ level: 'warn', message: `chybí tečka na konci: "…${text.trim().slice(-40)}"` });
    }

    checkShortSentences(text, found);
    return found;
}

/* -------------------------------------------------------------
   Orchestrátor: oprava jednoho bloku textu z region.compile().
   ------------------------------------------------------------- */
function sanitize(text, { examId = '', isConclusion = false } = {}) {
    if (typeof text !== 'string') return text;

    let out = modalityFilter(text, examId, isConclusion);
    if (APP_SETTINGS.optText) out = grammar(out);
    out = applyFixes(normalize(out));
    return isConclusion ? finishSentence(out) : out;
}

const Corrections = { sanitize, normalize, tighten, dedupe, validate, applyFixes, FIXES };
