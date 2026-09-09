/* =============================================================
   number-fields.js
   Module extracted from index.html inline <script>.
   Edit this file - NOT index.html - to change this part.
   ============================================================= */

/* ═══════════════════════════════════════════════
   NUMBER FIELD HELPERS (text prefix/suffix + wheel)
═══════════════════════════════════════════════ */
function parseAffixedNumber(str) {
    const s = String(str ?? '');
    const m = s.match(/^(.*?)(-?\d+(?:[.,]\d+)?)(.*)$/);
    if (!m) return { prefix: s, num: null, suffix: '', hadComma: false };
    return {
        prefix: m[1],
        num: parseFloat(m[2].replace(',', '.')),
        suffix: m[3],
        hadComma: m[2].includes(',') && !m[2].includes('.')
    };
}

function formatAffixedNumber(prefix, num, suffix, { decimals = null, hadComma = false } = {}) {
    if (num === null || num === undefined || Number.isNaN(num)) return `${prefix || ''}${suffix || ''}`;
    let numStr = decimals != null ? Number(num).toFixed(decimals) : String(num);
    if (hadComma) numStr = numStr.replace('.', ',');
    return `${prefix || ''}${numStr}${suffix || ''}`;
}

function extractNumber(str) {
    const { num } = parseAffixedNumber(str);
    return num === null || Number.isNaN(num) ? NaN : num;
}

function sizeDimsFromValue(val) {
    if (val === '' || val == null) return [null];
    return String(val).split('x').map(part => {
        const { num } = parseAffixedNumber(part);
        if (num === null || Number.isNaN(num)) return null;
        return Math.max(0, Math.round(num));
    });
}

/** Max. číselný rozměr z size pole; null = prázdné / neparsovatelné. */
function sizeMaxDim(val) {
    if (val === '' || val == null) return null;
    const nums = String(val).match(/\d+(?:\.\d+)?/g);
    if (!nums) return null;
    return Math.max(...nums.map(Number));
}

function isSizeNonZero(val) {
    const m = sizeMaxDim(val);
    return m !== null && m > 0;
}

function isSizeExplicitZero(val) {
    const m = sizeMaxDim(val);
    return m === 0;
}
