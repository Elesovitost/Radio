/* =============================================================
   table-factory.js
   Module extracted from index.html inline <script>.
   Edit this file - NOT index.html - to change this part.
   ============================================================= */

/* ═══════════════════════════════════════════════
   TABLE FACTORIES
═══════════════════════════════════════════════ */
function _tableLongest(rows, regionId) {
    const texts = [];
    for (const row of rows) {
        for (const cell of (Array.isArray(row) ? row : [row])) {
            for (const item of (Array.isArray(cell) ? cell : [cell])) {
                if (item?.btn) {
                    const cfg = (REGIONS[regionId].buttons || {})[item.btn] || {};
                    const type = item.type || cfg.type || 'standard';
                    
                    if (type.startsWith('basic')) {
                        texts.push(item.text || cfg.text || '');
                    } else {
                        const states = item.states || cfg.states || [];
                        texts.push(...states.map(s => s.replace(/\s*\[field:[^\]]+\]/, '')));
                    }
                }
            }
        }
    }
    return texts.reduce((a, b) => (a.length > b.length ? a : b), '');
}

function _renderCell(td, cell, longestObj, regionId) {
    const items = Array.isArray(cell) ? cell : [cell];
    if (items.length > 1) td.appendChild(el('div', { className: 'row' }, items.map(i => _cellItem(i, longestObj, regionId))));
    else                  td.appendChild(_cellItem(items[0], longestObj, regionId));
}

function _cellItem(item, longestObj, regionId) {
    if (typeof item === 'string') {
        const span = document.createElement('span');
        span.textContent = item;
        return span;
    }
    if (item?.btn) return makeButton(regionId, item, longestObj);
    if (item?.field) {
        const examId = Store.activeTab || 'default';
        const cls = { size: 'field_size', suv: 'field_suv', mm: 'field_mm', text: 'field_text' }[item.field] || 'field_mm';
        const fieldGlobalId = `${examId}_${regionId}_${item.id || item.field}`;
        const inp = el('input', { 
            className: `input ${cls}`, 
            placeholder: item.placeholder || '',
            'data-action': 'update-field',
            'data-id': fieldGlobalId
        });
        inp.value = Store.fields[fieldGlobalId] || '';
        
        if (item.field === 'size' && Store.fields[`${fieldGlobalId}_dims`]) {
            inp.dataset.dims = Store.fields[`${fieldGlobalId}_dims`];
        }

        if (item.step) inp.dataset.step = item.step;
        return inp;
    }
    return document.createTextNode('');
}

function LesionMain(id, title, rowsContent) {
    const table = el('table', { id, className: 'tbl-lesion' });
    const tbody = el('tbody');
    
    const headContent = [el('span', { textContent: title })];
    if (id.includes('__')) {
        headContent.push(el('button', {
            className: 'btn exam-tab-close',
            style: 'min-width: 20px; min-height: 20px; padding: 0 4px; margin-left: auto;',
            textContent: '🗑️',
            title: 'Smazat obsah',
            'data-action': 'remove-instance',
            'data-id': id
        }));
    }

    const trHead = el('tr', {}, [
        el('td', { className: 'tbl-lesion-head' }, [
            el('div', { style: 'display: flex; align-items: center;' }, headContent)
        ])
    ]);
    tbody.appendChild(trHead);
    const contentArr = (Array.isArray(rowsContent) ? rowsContent : [rowsContent]).filter(Boolean);
    contentArr.forEach(item => {
        if (item instanceof Node) {
            const trBody = el('tr', {}, [
                el('td', { className: 'tbl-lesion-body' }, [
                    el('div', { className: 'tbl-lesion-container' }, [item])
                ])
            ]);
            tbody.appendChild(trBody);
        }
    });

    table.appendChild(tbody);
    return table;
}

function TableMain(id, title, contents) {
    const table = el('table', { id, className: 'tbl-main' });
    const tbody = el('tbody');
    const trHead = el('tr', {}, [el('td', { className: 'tbl-main-head', textContent: title })]);
    const container = el('div', { className: 'tbl-main-container' });
    const contentArr = Array.isArray(contents) ? contents : [contents];
    contentArr.forEach(item => { if (item instanceof Node) container.appendChild(item); });
    const trBody = el('tr', {}, [el('td', { className: 'tbl-main-body' }, [container])]);
    tbody.appendChild(trHead);
    tbody.appendChild(trBody);
    table.appendChild(tbody);
    return table;
}

function Table3colRL(id, rows, regionId) {
    const longest = _tableLongest(rows, regionId);
    const table = el('table', { id: id, className: 'tbl tbl-center' });
    const thMid = el('th', { textContent: '' });
    thMid.style.minWidth = '30px';
    const thead = el('thead', {}, [el('tr', {}, [
        el('th', { textContent: 'R' }), 
        thMid, 
        el('th', { textContent: 'L' })
    ])]);
    const tbody = el('tbody');
    for (const [r, c, l] of rows) {
        const tr = el('tr');
        for (const cell of [r, c, l]) {
            const td = el('td');
            _renderCell(td, cell, longest, regionId);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
}

function Table3colRCL(id, rows, regionId) {
    const longest = _tableLongest(rows, regionId);
    const table = el('table', { id: id, className: 'tbl tbl-center' });
    const thead = el('thead', {}, [el('tr', {}, [el('th', { textContent: 'R' }), el('th', { textContent: 'C' }), el('th', { textContent: 'L' })])]);
    const tbody = el('tbody');
    for (const [r, c, l] of rows) {
        const tr = el('tr');
        for (const cell of [r, c, l]) {
            const td = el('td');
            _renderCell(td, cell, longest, regionId);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
}

function Table2colNormal(id, rows, regionId) {
    const longest = _tableLongest(rows, regionId);
    const table = el('table', { id: id, className: 'tbl' });
    const tbody = el('tbody');
    for (const row of rows) {
        const tr = el('tr');
        for (const cell of row) {
            const td = el('td');
            _renderCell(td, cell, longest, regionId);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    return table;
}

function TableGrid(id, rows, regionId) {
    const table = el('table', { id: id, className: 'tbl tbl-center' });
    const tbody = el('tbody');
    for (const row of rows) {
        const tr = el('tr');
        for (const cell of row) {
            const td = el('td');
            // Předáním null si každé tlačítko zachová šířku pouze dle vlastních stavů
            _renderCell(td, cell, null, regionId);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    return table;
}

function Table2rowNormal(id, layoutData, regionId) {
    const longest = _tableLongest(layoutData.map(row => row.slice(1)), regionId);
    const table = el('table', { id: id, className: 'tbl' });
    const tbody = el('tbody');
    layoutData.forEach(rowData => {
        const tr = el('tr');
        rowData.forEach((cell, ci) => {
            const td = el('td', { className: ci === 0 ? 'cell-label' : '' });
            _renderCell(td, cell, longest, regionId);
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
}

function Table1col(id, cells, regionId, opts = {}) {
    const longest = _tableLongest([cells], regionId);
    const table = el('table', { id: id, className: 'tbl tbl-full' });
    const tbody = el('tbody');
    
    const isAddTable = id.endsWith('_add');

    if (isAddTable) {
        const customConfig = getButtonBase(regionId, { btn: `${id}_custom`, id: `${id}_custom`, type: 'basic', text: 'custom' });
        const isExpanded = !!Store.buttonStates[customConfig.globalId];

        const customTr = el('tr');
        const customTd = el('td', { className: 'tbl-full-cell' });
        const customBtn = makeBasicButton(customConfig);
        customBtn.classList.add('btn-green');
        customTd.appendChild(customBtn);
        customTr.appendChild(customTd);
        tbody.appendChild(customTr);

        if (isExpanded) {
            for (const cell of cells) {
                const fieldTr = el('tr');
                const fieldTd = el('td', { className: 'tbl-full-cell' });
                _renderCell(fieldTd, cell, longest, regionId);
                fieldTr.appendChild(fieldTd);
                tbody.appendChild(fieldTr);
            }
        }

        if (opts.normal) {
            const normalConfig = getButtonBase(regionId, { btn: `${id}_normal`, id: `${id}_normal`, type: 'basic', text: 'normal' });
            const normalTr = el('tr');
            const normalTd = el('td', { className: 'tbl-full-cell' });
            const normalBtn = makeBasicButton(normalConfig);
            normalBtn.classList.add('btn-green');
            normalTd.appendChild(normalBtn);
            normalTr.appendChild(normalTd);
            tbody.appendChild(normalTr);
        }
    } else {
        for (const cell of cells) {
            const tr = el('tr');
            const td = el('td', { className: 'tbl-full-cell' });
            _renderCell(td, cell, longest, regionId);
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
    }
    table.appendChild(tbody);
    return table;
}
