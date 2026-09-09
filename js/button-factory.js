/* =============================================================
   button-factory.js
   Module extracted from index.html inline <script>.
   Edit this file - NOT index.html - to change this part.
   ============================================================= */

/* ═══════════════════════════════════════════════
   BUTTON FACTORY
═══════════════════════════════════════════════ */
function getButtonBase(regionId, itemConfig, longestOverride) {
    const baseCfg = (REGIONS[regionId].buttons || {})[itemConfig.btn] || {};
    const type   = itemConfig.type || baseCfg.type || 'standard';
    const states = itemConfig.states || baseCfg.states;
    const text   = itemConfig.text || baseCfg.text;
    const custom = Boolean(itemConfig.custom !== undefined ? itemConfig.custom : baseCfg.custom);
    
    const localId = itemConfig.id || itemConfig.btn;
    const examId = Store.activeTab || 'default';
    const globalId = `${examId}_${regionId}_${localId}`;
    ButtonConfigs[globalId] = { type, states, text, custom };
    
    let longestStr = typeof longestOverride === 'string' ? longestOverride : '';
    const longest = longestStr || (states ? states.map(s => s.replace(/\s*\[field:[^\]]+\]/, '')).reduce((a, b) => a.length > b.length ? a : b, '') : (text || ''));
    
    return { type, states, text, custom, globalId, longest };
}

function createButtonElement(config, isActive, btnLabel, action) {
    return el('button', {
        className: `btn btn-state${isActive ? ' modified' : ''}`,
        'data-action': action,
        'data-id': config.globalId,
        'data-longest': config.longest,
        'aria-pressed': isActive.toString()
    }, [el('span', { textContent: btnLabel })]);
}

function makeBasicButton(config) {
    const rawState = Store.buttonStates[config.globalId] ?? false;
    const showCustomInput = Boolean(config.custom && rawState === 'custom');
    const isActive = Boolean(rawState === true || showCustomInput);
    const btn = createButtonElement(config, isActive, config.text, 'toggle-basic');

    if (showCustomInput) {
        const inp = el('input', {
            className: 'input',
            value: Store.customTexts[config.globalId] || '',
            'data-action': 'update-custom-input',
            'data-id': config.globalId,
            placeholder: 'vlastní'
        });
        return el('div', { className: 'row' }, [btn, inp]);
    }
    return btn;
}

function makeBasicCustomButton(config) {
    const isActive = Boolean(Store.buttonStates[config.globalId]);
    const btn = createButtonElement(config, isActive, config.text, 'toggle-basic-custom');

    if (isActive) {
        const inp = el('input', {
            className: 'input',
            value: Store.customTexts[config.globalId] || '',
            'data-action': 'update-custom-input',
            'data-id': config.globalId,
            placeholder: 'Upřesnit...'
        });
        return el('div', { className: 'row' }, [btn, inp]);
    }
    return btn;
}

function makeStandardButton(config) {
    let idx = Store.buttonStates[config.globalId] || 0;
    // Starý basic normal (true) → normal! (zachová impression)
    if (idx === true && config.states && config.states.includes('normal!')) idx = 2;
    const rawStateStr = config.states && config.states[idx] !== undefined ? config.states[idx] : 'N/A';
    const isActive = Boolean(idx > 0);
    
    const fieldMatch = rawStateStr.match(/^(.*?)\s*\[field:([^:]+):([^:\]]+)(?::([^\]]+))?\]$/);
    const isCustomInline = rawStateStr === 'custom';
    
    let btnLabel = rawStateStr;
    let fieldConfig = null;
    let fieldIdSuffix = null;
    let fieldPlaceholder = '';

    if (fieldMatch) {
        btnLabel = fieldMatch[1].trim();
        fieldConfig = fieldMatch[2].trim();
        fieldIdSuffix = fieldMatch[3].trim();
        fieldPlaceholder = fieldMatch[4] ? fieldMatch[4].trim() : '';
    } else if (isCustomInline) {
        btnLabel = '';
    }

    const btn = el('button', {
        className: `btn btn-state${isActive ? (isCustomInline ? ' is-custom-wrapper modified' : ' modified') : ''}`,
        'data-action': 'cycle-state',
        'data-id': config.globalId,
        'data-longest': config.longest,
        'aria-pressed': isActive.toString()
    });

    if (isCustomInline) {
        const inp = el('input', {
            className: 'input-btn-inner',
            value: Store.customTexts[config.globalId] || '',
            'data-action': 'update-custom-input',
            'data-id': config.globalId,
            placeholder: 'vlastní'
        });
        btn.appendChild(inp);
    } else {
        btn.appendChild(el('span', { textContent: btnLabel }));
    }

    if (fieldConfig && fieldIdSuffix) {
        const fieldGlobalId = `${config.globalId}_${fieldIdSuffix}`;
        const inp = el('input', {
            className: `input ${fieldConfig}`,
            'data-action': 'update-field',
            'data-id': fieldGlobalId,
            placeholder: fieldPlaceholder
        });
        inp.value = Store.fields[fieldGlobalId] || '';
        if (fieldConfig === 'field_size' && Store.fields[`${fieldGlobalId}_dims`]) {
            inp.dataset.dims = Store.fields[`${fieldGlobalId}_dims`];
        }
        return el('div', { className: 'row' }, [btn, inp]);
    }

    return btn;
}

function makeButton(regionId, itemConfig, longestOverride = null) {
    const config = getButtonBase(regionId, itemConfig, longestOverride);
    if (config.type === 'basic_custom') return makeBasicCustomButton(config);
    if (config.type === 'basic') return makeBasicButton(config);
    return makeStandardButton(config);
}
