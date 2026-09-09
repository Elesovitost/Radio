/* =============================================================
   dom.js
   Module extracted from index.html inline <script>.
   Edit this file - NOT index.html - to change this part.
   ============================================================= */

/* ═══════════════════════════════════════════════
   DOM HELPERS
═══════════════════════════════════════════════ */
function createImageViewer(viewerKey) {
    const cfg = SLICE_VIEWERS[viewerKey];
    if (!cfg) return null;

    return el('div', { className: 'slice-viewer' }, [
        el('div', { className: 'sub-table-title', textContent: cfg.title }),
        el('img', { 
            id: 'slice-image', 
            src: `${cfg.folder}/${cfg.prefix}-${String(Store.activeSlice).padStart(2, '0')}.${cfg.ext}`, 
            draggable: false,
            style: `width: ${cfg.width || '450px'};`
        }),
        el('div', { className: 'slice-hint', textContent: 'Kolečko myši / Táhnout' })
    ]);
}

function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
        if (k === 'className') node.className = v;
        else if (k.startsWith('data-')) node.setAttribute(k, v);
        else node[k] = v;
    }
    for (const child of children)
        node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    return node;
}

function focusInput(id) {
    setTimeout(() => {
        const inp = document.querySelector(`input[data-action="update-custom-input"][data-id="${id}"]`);
        if (inp) {
            inp.focus();
            inp.setSelectionRange(inp.value.length, inp.value.length);
        }
    }, 0);
}
