/* =============================================================
   table-factory.js
   Module extracted from index.html inline <script>.
   Edit this file - NOT index.html - to change this part.
   ============================================================= */

/* ═══════════════════════════════════════════════
   TABLE FACTORIES
═══════════════════════════════════════════════ */
/* Zobrazovaný text stavu tlačítka – bez [field:...] anotace. */
function _stateLabel(state) {
    return String(state).replace(/\s*\[field:[^\]]+\]/, '');
}

/* Nejdelší popisek tlačítek v tabulce (určuje společnou šířku). */
function _tableLongest(rows, regionId) {
    const texts = [];
    const walk = (item) => {
        if (Array.isArray(item)) return item.forEach(walk);
        if (!item?.btn) return;
        const cfg = (REGIONS[regionId].buttons || {})[item.btn] || {};
        const type = item.type || cfg.type || 'standard';
        if (type.startsWith('basic')) texts.push(item.text || cfg.text || '');
        else texts.push(...(item.states || cfg.states || []).map(_stateLabel));
    };
    walk(rows);
    return texts.reduce((a, b) => (a.length > b.length ? a : b), '');
}

function _renderCell(td, cell, longestObj, regionId) {
    const items = Array.isArray(cell) ? cell : [cell];
    if (items.length > 1) td.appendChild(el('div', { className: 'row' }, items.map(i => _cellItem(i, longestObj, regionId))));
    else                  td.appendChild(_cellItem(items[0], longestObj, regionId));
}

/* Naplní tbody řádky buněk; labelFirst = první buňka dostane třídu popisku. */
function _fillRows(tbody, rows, longest, regionId, labelFirst = false) {
    for (const row of rows) {
        const tr = el('tr');
        row.forEach((cell, ci) => {
            const td = el('td', { className: labelFirst && ci === 0 ? 'cell-label' : '' });
            _renderCell(td, cell, longest, regionId);
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    }
}

/* Tabulka mřížky: rows = pole řádků, každý řádek pole buněk.
   head = popisky sloupců (nebo null; prázdný popisek = úzký středový sloupec),
   longest = null → každé tlačítko si drží vlastní šířku. */
function _gridTable(id, className, rows, regionId, { head = null, longest } = {}) {
    const table = el('table', { id, className });
    if (head) {
        table.appendChild(el('thead', {}, [el('tr', {}, head.map(h => {
            const th = el('th', { textContent: h });
            if (!h) th.style.minWidth = '30px';
            return th;
        }))]));
    }
    const tbody = el('tbody');
    _fillRows(tbody, rows, longest === undefined ? _tableLongest(rows, regionId) : longest, regionId);
    table.appendChild(tbody);
    return table;
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

/* Řádek s hlavičkou tabulky (společný pro LesionMain i TableMain). */
function _headRow(tbody, headAttrs, headNode) {
    tbody.appendChild(el('tr', {}, [el('td', headAttrs, [headNode])]));
}

function LesionMain(id, title, rowsContent) {
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
    _headRow(tbody, { className: 'tbl-lesion-head' },
        el('div', { style: 'display: flex; align-items: center;' }, headContent));

    for (const item of (Array.isArray(rowsContent) ? rowsContent : [rowsContent]).filter(Boolean)) {
        if (!(item instanceof Node)) continue;
        tbody.appendChild(el('tr', {}, [
            el('td', { className: 'tbl-lesion-body' }, [el('div', { className: 'tbl-lesion-container' }, [item])])
        ]));
    }
    return el('table', { id, className: 'tbl-lesion' }, [tbody]);
}

function TableMain(id, title, contents, opts = {}) {
    const collapsible = !!opts.collapsed;
    const headAttrs = { className: 'tbl-main-head' };
    let headNode = title;
    if (collapsible) {
        headAttrs['data-action'] = 'toggle-table-collapse';
        headNode = el('div', { className: 'tbl-main-head-inner' }, [
            el('span', { className: 'tbl-main-chevron', textContent: '▸', 'aria-hidden': 'true' }),
            el('span', { className: 'tbl-main-title', textContent: title })
        ]);
    }
    const tbody = el('tbody');
    _headRow(tbody, headAttrs, headNode);

    const container = el('div', { className: 'tbl-main-container' });
    for (const item of (Array.isArray(contents) ? contents : [contents])) {
        if (item instanceof Node) container.appendChild(item);
    }
    tbody.appendChild(el('tr', {}, [el('td', { className: 'tbl-main-body' }, [container])]));
    return el('table', { id, className: `tbl-main${collapsible ? ' tbl-main-collapsed' : ''}` }, [tbody]);
}

function Table3colRL(id, rows, regionId) {
    return _gridTable(id, 'tbl tbl-center', rows, regionId, { head: ['R', '', 'L'] });
}

function Table3colRCL(id, rows, regionId) {
    return _gridTable(id, 'tbl tbl-center', rows, regionId, { head: ['R', 'C', 'L'] });
}

function Table2colNormal(id, rows, regionId) {
    return _gridTable(id, 'tbl', rows, regionId);
}

function TableGrid(id, rows, regionId) {
    // longest: null → každé tlačítko si zachová šířku pouze dle vlastních stavů
    return _gridTable(id, 'tbl tbl-center', rows, regionId, { longest: null });
}

function Table2rowNormal(id, layoutData, regionId) {
    const longest = _tableLongest(layoutData.map(row => row.slice(1)), regionId);
    const table = el('table', { id, className: 'tbl' });
    const tbody = el('tbody');
    _fillRows(tbody, layoutData, longest, regionId, true);
    table.appendChild(tbody);
    return table;
}

function Table1col(id, cells, regionId, opts = {}) {
    const longest = _tableLongest([cells], regionId);
    const table = el('table', { id: id, className: 'tbl tbl-full' });
    const tbody = el('tbody');
    
    const isAddTable = id.endsWith('_add');

    if (isAddTable) {
        const customFieldIds = cells.filter(c => c?.field && c?.id).map(c => c.id);
        if (customFieldIds.length) {
            table.dataset.regionId = regionId;
            table.dataset.customFieldIds = customFieldIds.join(',');
        }

        const customConfig = getButtonBase(regionId, { btn: `${id}_custom`, id: `${id}_custom`, type: 'basic', text: 'custom' });
        const isExpanded = !!Store.buttonStates[customConfig.globalId];

        const customTr = el('tr');
        const customTd = el('td', { className: 'tbl-full-cell' });
        const customBtn = makeBasicButton(customConfig);
        customBtn.classList.add('btn-green');

        if (opts.normal) {
            const btnRow = el('div', { className: 'row' });
            btnRow.appendChild(customBtn);
            const predefConfig = getButtonBase(regionId, {
                btn: `${id}_predef`,
                id: `${id}_predef`,
                type: 'standard',
                states: ['predef', 'predef']
            });
            const predefBtn = makeStandardButton(predefConfig);
            predefBtn.classList.add('btn-green');
            btnRow.appendChild(predefBtn);
            const normalConfig = getButtonBase(regionId, {
                btn: `${id}_normal`,
                id: `${id}_normal`,
                type: 'standard',
                states: ['normal', 'normal', 'normal!']
            });
            const normalBtn = makeStandardButton(normalConfig);
            normalBtn.classList.add('btn-green');
            btnRow.appendChild(normalBtn);
            customTd.appendChild(btnRow);
        } else {
            customTd.appendChild(customBtn);
        }

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
