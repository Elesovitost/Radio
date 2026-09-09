/* =============================================================
   dom.js
   Module extracted from index.html inline <script>.
   Edit this file - NOT index.html - to change this part.
   ============================================================= */

/* ═══════════════════════════════════════════════
   DOM HELPERS
═══════════════════════════════════════════════ */
function createEyeIconSvg(slashed = false) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z');
    svg.appendChild(path);

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '12');
    circle.setAttribute('cy', '12');
    circle.setAttribute('r', '3');
    svg.appendChild(circle);

    if (slashed) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', '3');
        line.setAttribute('y1', '3');
        line.setAttribute('x2', '21');
        line.setAttribute('y2', '21');
        svg.appendChild(line);
    }
    return svg;
}

function createImageViewer(viewerKey) {
    const cfg = SLICE_VIEWERS[viewerKey];
    if (!cfg) return null;

    const hideBtn = el('button', {
        type: 'button',
        className: 'slice-viewer-toggle',
        title: 'Skrýt referenční obrázek',
        'data-action': 'hide-slice-viewer'
    });
    hideBtn.appendChild(createEyeIconSvg(true));

    return el('div', { className: 'slice-viewer' }, [
        hideBtn,
        el('div', { className: 'sub-table-title', textContent: cfg.title }),
        el('img', { 
            id: 'slice-image', 
            src: `${cfg.folder}/${cfg.prefix}-${String(Store.activeSlice).padStart(2, '0')}.${cfg.ext}`, 
            draggable: false,
            'data-preferred-width': String(parseInt(cfg.width, 10) || 450)
        }),
        el('div', { className: 'slice-hint', textContent: 'Kolečko myši / Táhnout' })
    ]);
}

function createSliceViewerShowBtn() {
    const btn = el('button', {
        type: 'button',
        id: 'slice-viewer-show-btn',
        className: 'slice-viewer-show',
        title: 'Zobrazit referenční obrázek',
        'data-action': 'show-slice-viewer'
    });
    btn.appendChild(createEyeIconSvg(false));
    return btn;
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
