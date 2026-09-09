/* =============================================================
   events.js
   Module extracted from index.html inline <script>.
   Edit this file - NOT index.html - to change this part.
   ============================================================= */

document.addEventListener('click', e => {
    const modal = document.getElementById('settings-modal');
    const isSettingsBtn = e.target.closest('[data-action="toggle-settings"]');
    if (modal && modal.style.display === 'block' && !modal.contains(e.target) && !isSettingsBtn) {
        modal.style.display = 'none';
    }

    const llmModal = document.getElementById('llm-modal');
    const isLlmBtn = e.target.closest('[data-action="toggle-llm"]');
    if (llmModal && llmModal.style.display === 'block' && !llmModal.contains(e.target) && !isLlmBtn) {
        llmModal.style.display = 'none';
    }

    const target = e.target.closest('[data-action]');
    if (target) {
        const handler = ActionHandlers[target.dataset.action];
        if (handler) {
            handler(target, target.dataset);
            const popup = document.getElementById('organ-popup');
            if (popup && popup.contains(target)) popup.classList.remove('active');
            return;
        }
    }

    if (!Store.activeTable) {
        const organEl = e.target.closest('svg [id]');
        if (organEl && organEl.id && ORGAN_MAP[organEl.id]) {
            const organDef = ORGAN_MAP[organEl.id];
            
            if (organDef.table && (organDef.table.includes('_lesion_main') || organDef.table.includes('_lymphnode_main'))) {
                return;
            }

            let baseTableId = organDef.table;
            
            if (organDef.resolveTable) {
                const activeExam = getExamById(Store.activeTab);
                const activeRegions = activeExam ? activeExam.regs : [];
                baseTableId = organDef.resolveTable(activeRegions);
            }
            
            if (baseTableId) {
                if (baseTableId.includes('lesion') || baseTableId.includes('lymphnode') || baseTableId.includes('hemo')) {
                    Store.activeTable = createNewInstance(baseTableId);
                } else {
                    Store.activeTable = baseTableId;
                }
            }
            return;
        }
    }

    if (Store.activeTable) {
        const isInsideOverlay = e.target.closest('#table-overlay-container');
        const isInsideViewer = e.target.closest('#standalone-slice-viewer');
        const isInputOrInteractive = e.target.closest('.input, select, textarea, #organ-popup');
        if (!isInsideOverlay && !isInsideViewer && !isInputOrInteractive) {
            Store.activeTable = null;
        }
    }
});

document.addEventListener('mousemove', e => {
    if (isDraggingSlice) {
        const delta = e.clientY - dragSliceLastY;
        if (Math.abs(delta) > 5) {
            const cfg = SLICE_VIEWERS[Store.activeViewerKey];
            const maxSlices = cfg ? cfg.max : 1;
            let idx = Store.activeSlice + (delta > 0 ? 1 : -1);
            Store.activeSlice = Math.max(1, Math.min(maxSlices, idx));
            dragSliceLastY = e.clientY;
        }
        return;
    }

    const tooltip = document.getElementById('organ-tooltip');
    const popup = document.getElementById('organ-popup');
    if (!tooltip) return;

    if (Store.activeTable) {
        tooltip.style.display = 'none';
        if (popup) popup.classList.remove('active');
        return;
    }

    const isInsidePopup = e.target.closest('#organ-popup');
    if (isInsidePopup) {
        tooltip.style.display = 'none';
        return;
    }

    const organEl = e.target.closest('svg [id]');
    if (organEl && organEl.id && ORGAN_MAP[organEl.id]) {
        const organDef = ORGAN_MAP[organEl.id];
        
        if (organDef.table && organDef.table.includes('lymphnode_main')) {
            tooltip.style.display = 'none';
            return; 
        }

        if (organDef.table && organDef.table.includes('_lesion_main')) {
            tooltip.style.display = 'none'; 
        } else {
            tooltip.textContent = organDef.name;
            tooltip.style.display = 'block';
            tooltip.style.left = `${e.clientX + 15}px`;
            tooltip.style.top = `${e.clientY + 15}px`;
            
            if (organEl.classList.contains('organ-dimmed')) {
                tooltip.classList.add('tooltip-dimmed');
            } else {
                tooltip.classList.remove('tooltip-dimmed');
            }
        }
    } else {
        tooltip.style.display = 'none';
    }
});

const DIRECTIONAL_ACTIONS = ['cycle-state', 'toggle-basic', 'toggle-basic-custom', 'cycle-side', 'cycle-exam-part', 'cycle-gender'];

function handleDirectionalAction(btn, dir) {
    const { action, id } = btn.dataset;
    if (!DIRECTIONAL_ACTIONS.includes(action)) return false;
    
    if (action === 'cycle-state')              cycleState(id, dir);
    else if (action === 'toggle-basic')        toggleBasic(id, dir > 0);
    else if (action === 'toggle-basic-custom') toggleBasicCustom(id, dir > 0);
    else if (action === 'cycle-side')          ActionHandlers['cycle-side'](btn, btn.dataset, dir);
    else if (action === 'cycle-exam-part')     ActionHandlers['cycle-exam-part'](btn, btn.dataset, dir);
    else if (action === 'cycle-gender')        ActionHandlers['cycle-gender'](btn, btn.dataset, dir);
    
    return true;
}

document.addEventListener('contextmenu', e => {
    const btn = e.target.closest('.btn');
    if (btn && handleDirectionalAction(btn, -1)) {
        e.preventDefault();
        return;
    }
    
    const reportItem = e.target.closest('.report-frame, .report-heading');
    if (reportItem) {
        e.preventDefault();
        navigator.clipboard.writeText(reportItem.textContent.trim()).then(() => {
            reportItem.classList.add('blink-border');
            setTimeout(() => {
                reportItem.classList.remove('blink-border');
            }, 300);
        }).catch(err => console.error('Chyba při kopírování do schránky:', err));
    }
});

document.addEventListener('wheel', e => {
    const t = e.target;

    if (t.id === 'slice-image') {
        e.preventDefault();
        const cfg = SLICE_VIEWERS[Store.activeViewerKey];
        const maxSlices = cfg ? cfg.max : 1;
        let idx = Store.activeSlice + (e.deltaY > 0 ? 1 : -1);
        Store.activeSlice = Math.max(1, Math.min(maxSlices, idx));
        return;
    }

    if (t.classList.contains('input')) {
        if (t.dataset.action === 'update-field') {
            e.preventDefault();
            const id = t.dataset.id;
            
            if (t.classList.contains('field_size')) {
                let parts = t.value === '' ? [''] : String(t.value).split('x');
                let aI = parts.length - 1;
                let parsed = parseAffixedNumber(parts[aI] ?? '');
                let v = parsed.num === null || Number.isNaN(parsed.num) ? null : Math.round(parsed.num);
                
                if (v === null) {
                    if (e.deltaY > 0) return;
                    v = 0;
                    parts[aI] = formatAffixedNumber(parsed.prefix, v, parsed.suffix);
                } else if (e.deltaY < 0) {
                    v = Math.min(999, v + 1);
                    parts[aI] = formatAffixedNumber(parsed.prefix, v, parsed.suffix);
                } else {
                    v -= 1;
                    if (v < 0) {
                        if (aI > 0) parts.pop();
                        else parts = [''];
                    } else {
                        parts[aI] = formatAffixedNumber(parsed.prefix, v, parsed.suffix);
                    }
                }
                
                const strVal = (parts.length === 1 && parts[0] === '') ? '' : parts.join('x');
                const dims = sizeDimsFromValue(strVal);
                t.dataset.dims = JSON.stringify(dims);
                Store.fields = { ...Store.fields, [id]: strVal, [`${id}_dims`]: t.dataset.dims };
                t.value = strVal;
                return;
            }

            if (t.classList.contains('field_suv')) {
                const parsed = parseAffixedNumber(t.value);
                let v = parsed.num;
                
                if (v === null || Number.isNaN(v)) {
                    if (e.deltaY > 0) return;
                    v = 0.0;
                } else if (e.deltaY < 0) {
                    v = Math.min(50.0, parseFloat((v + 0.1).toFixed(1)));
                } else {
                    v = parseFloat((v - 0.1).toFixed(1));
                    if (v < 0) {
                        Store.fields = { ...Store.fields, [id]: '' };
                        t.value = '';
                        MetricsEngine.updateActivityForField(id, '');
                        return;
                    }
                }
                
                const strVal = formatAffixedNumber(parsed.prefix, v, parsed.suffix, { decimals: 1, hadComma: parsed.hadComma });
                Store.fields = { ...Store.fields, [id]: strVal };
                t.value = strVal;
                
                MetricsEngine.updateActivityForField(id, strVal);
                return;
            }

            if (t.classList.contains('field_mm')) {
                const step = parseInt(t.dataset.step) || 1;
                const parsed = parseAffixedNumber(t.value);
                let v = parsed.num === null || Number.isNaN(parsed.num) ? NaN : Math.round(parsed.num);
                
                if (Number.isNaN(v)) {
                    if (e.deltaY > 0) return;
                    v = 0;
                } else {
                    v = e.deltaY < 0 ? v + step : v - step;
                }
                
                if (v < 0) {
                    Store.fields = { ...Store.fields, [id]: '' };
                    t.value = '';
                    return;
                }
                
                const strVal = formatAffixedNumber(parsed.prefix, v, parsed.suffix);
                Store.fields = { ...Store.fields, [id]: strVal };
                t.value = strVal;
                return;
            }
        }
        
        if (t.dataset.action === 'update-age') {
            e.preventDefault();
            let v = parseInt(t.value, 10);
            if (isNaN(v)) {
                if (e.deltaY > 0) return;
                v = 50; 
            } else {
                v = e.deltaY < 0 ? v + 1 : v - 1;
            }
            if (v < 0) v = 0;
            if (v > 130) v = 130;
            const strVal = v.toString();
            Store.patientAge = strVal;
            t.value = strVal;
            return;
        }
    }

    const btn = t.closest('.btn');
    if (btn) {
        const dir = e.deltaY < 0 ? 1 : -1;
        if (handleDirectionalAction(btn, dir)) {
            e.preventDefault();
        }
    }
}, { passive: false });

document.addEventListener('input', e => {
    const actionTarget = e.target.closest('[data-action]');
    if (actionTarget && actionTarget.dataset.action === 'update-setting') {
        APP_SETTINGS[actionTarget.dataset.setting] = e.target.checked;
        saveSettings();
        return;
    }

    if (e.target.dataset.action === 'update-field') {
        e.target.dataset.edited = 'true';
        const id = e.target.dataset.id;
        let val = e.target.value;
        const sStart = e.target.selectionStart;
        const sEnd = e.target.selectionEnd;

        if (e.target.classList.contains('field_suv')) val = val.replace(',', '.');

        if (e.target.classList.contains('field_size')) {
            val = val.split('x').map(d => {
                if (d === '') return d;
                const parsed = parseAffixedNumber(d);
                if (parsed.num === null || Number.isNaN(parsed.num)) return d;
                if (parsed.num < 0) return formatAffixedNumber(parsed.prefix, 0, parsed.suffix);
                return d;
            }).join('x');
            e.target.value = val;
            const dims = sizeDimsFromValue(val);
            Store.fields = { ...Store.fields, [id]: val, [`${id}_dims`]: JSON.stringify(dims) };
            e.target.dataset.dims = JSON.stringify(dims);
        } else {
            Store.fields = { ...Store.fields, [id]: val };
        }
        
        MetricsEngine.updateActivityForField(id, val);

        setTimeout(() => {
            const restoredInput = document.querySelector(`input[data-id="${id}"]`);
            if (restoredInput) {
                restoredInput.focus();
                restoredInput.setSelectionRange(sStart, sEnd);
            }
        }, 0);

        return;
    }

    const target = e.target.closest('[data-action]');
    if (!target) return;
    const { action, id } = target.dataset;
    if (action === 'update-indication')   Store.indication  = e.target.value;
    if (action === 'update-age')          Store.patientAge  = e.target.value;
    if (action === 'update-report-id')    Store.reportId    = e.target.value;
    if (action === 'update-date')         Store.pastDate    = e.target.value;
    if (action === 'update-custom-input') Store.customTexts = { ...Store.customTexts, [id]: e.target.value };
});

let organPopupTimeout = null;
let currentHoveredOrganId = null;

// Zobrazovaný název instance (ložisko / uzlina / hemo) – sdílený mezi SVG popupem a levou navigací
function getLesionInstanceName(tableId, instId, defaultType, organName) {
    const reportFrame = document.querySelector(`.report-frame[data-table="${tableId}__${instId}"]`);
    if (reportFrame) {
        let fullText = reportFrame.textContent.trim().split('.')[0];
        const cutRegex = /\s+(diametru|velikosti|rozměru|se SUV|s nízkou|s intermediární|středně|zvýšeně|nízce|se zvýšenou|s vysokou|bez metabolické|bez PSMA|bez exprese|bez akumulace|s izovaskulárním|izovaskulární|hypervaskulární|s wash-out|s restrikcí|bez restrikce|kulat|dobře ohraničen|hůře ohraničen|neohraničen|s časným|bez časného|s invazí|s infiltrací|s extrakapsulárním|bez CT|bez sycení|se sycením|nativně|v dif\.dg\.|v\.s\.|susp\.|benigního|maligního|charakteru|etiologie|\(T1|\(T2|\(DWI|\(SWI|\(nativ|\(kontrast)/i;

        let match = fullText.match(cutRegex);
        let result = match ? fullText.substring(0, match.index) : fullText;

        result = result.replace(/[,.]$/, '').trim();
        if (result) {
            const words = result.split(/\s+/);
            if (words.length > 4) {
                return words.slice(0, 4).join(' ') + '...';
            }
            return result;
        }
    }

    let typeName = defaultType;
    let locParts = [];
    let instPrefix = '';

    const allKeys = Object.keys(Store.buttonStates);
    for (const key of allKeys) {
        const match = key.match(new RegExp(`_([a-zA-Z]+_${instId})_`));
        if (match) {
            instPrefix = match[1];
            break;
        }
    }

    if (instPrefix) {
        const examId = Store.activeTab || 'default';
        const regionId = tableId.split('_')[0];
        const searchStr = `${examId}_${regionId}_${instPrefix}_`;

        const typeKey = allKeys.find(k => k.startsWith(searchStr + 'k_') && Store.buttonStates[k]);
        if (typeKey && ButtonConfigs[typeKey]) {
            const btnCfg = ButtonConfigs[typeKey];
            if (btnCfg.custom && Store.buttonStates[typeKey] === 'custom') {
                typeName = Store.customTexts[typeKey] || defaultType;
            } else if (btnCfg.type === 'basic') {
                typeName = btnCfg.text;
            } else if (btnCfg.type === 'standard') {
                typeName = btnCfg.states[Store.buttonStates[typeKey]];
            }
        }
        typeName = typeName.charAt(0).toUpperCase() + typeName.slice(1);

        const textInput = Store.fields[`${searchStr}nej_text`];
        if (textInput) locParts.push(textInput);

        const lnLocKeys = allKeys.filter(k => k.startsWith(searchStr + 'p_') && Store.buttonStates[k]);
        lnLocKeys.forEach(k => {
            if (ButtonConfigs[k]) locParts.push(ButtonConfigs[k].text);
        });
    }

    if (locParts.length > 0) {
        return `${typeName} ${locParts.join(', ')}`;
    } else {
        let cleanOrgan = organName.replace(/Léze\s*\(/i, '').replace(/Lymfadenopatie\s*\(/i, '').replace(/\)/g, '').toLowerCase();
        return `${typeName} (${cleanOrgan})`;
    }
}

function renderOrganPopup(organDef, organId) {
    const popup = document.getElementById('organ-popup');
    if (!popup) return;
    
    const lesionTable = organDef.table;
    const isBrain = organDef.regions && organDef.regions.includes('brain');
    const isSkeleton = organDef.regions && organDef.regions.includes('skeleton');
    
    const lymphTable = lesionTable ? lesionTable.replace('_lesion_main', '_lymphnode_main') : null;
    const hemoTable = isBrain ? 'brain_hemo_main' : null;

    const locMatch = (organDef.name || '').match(/\(([^)]+)\)/);
    const locLabel = locMatch ? locMatch[1].toUpperCase() : '';
    const withLoc = (base) => locLabel ? `${base} (${locLabel})` : base;
    
    let html = '';
    
    // Vykreslení tlačítek - Existující instance VŽDY před novými / dalšími
    if (lesionTable && lesionTable.includes('_lesion_main')) {
        const lesionInsts = Store.instances?.[lesionTable] || [];
        lesionInsts.forEach((instId) => {
            const name = getLesionInstanceName(lesionTable, instId, 'Ložisko', organDef.name);
            html += `<button class="popup-btn btn-lesion" data-action="open-table" data-table="${lesionTable}__${instId}">🔴 ${name}</button>`;
        });
        const lesionAddLabel = lesionInsts.length > 0 ? withLoc('DALŠÍ LOŽISKO') : withLoc('LOŽISKO');
        html += `<button class="popup-btn btn-lesion" data-action="open-table" data-table="${lesionTable}">${lesionAddLabel}</button>`;
    }

    if (!isBrain && !isSkeleton && lymphTable) {
        const lymphInsts = Store.instances?.[lymphTable] || [];
        lymphInsts.forEach((instId) => {
            const name = getLesionInstanceName(lymphTable, instId, 'Uzlina', organDef.name);
            html += `<button class="popup-btn btn-lymph" data-action="open-table" data-table="${lymphTable}__${instId}">🟡 ${name}</button>`;
        });
        const lymphAddLabel = lymphInsts.length > 0 ? withLoc('DALŠÍ UZLINY') : withLoc('UZLINY');
        html += `<button class="popup-btn btn-lymph" data-action="open-table" data-table="${lymphTable}">${lymphAddLabel}</button>`;
    }
    
    if (isBrain && hemoTable) {
        const hemoInsts = Store.instances?.[hemoTable] || [];
        hemoInsts.forEach((instId) => {
            const name = getLesionInstanceName(hemoTable, instId, 'Krvácení / ischemie', organDef.name);
            html += `<button class="popup-btn btn-hemo" data-action="open-table" data-table="${hemoTable}__${instId}">🟣 ${name}</button>`;
        });
        const hemoAddLabel = hemoInsts.length > 0 ? withLoc('DALŠÍ KRVÁCENÍ / ISCHEMIE') : withLoc('KRVÁCENÍ / ISCHEMIE');
        html += `<button class="popup-btn btn-hemo" data-action="open-table" data-table="${hemoTable}">${hemoAddLabel}</button>`;
    }
    
    popup.innerHTML = html;
}

document.addEventListener('mouseover', e => {
    if (e.target.closest && e.target.closest('[data-action="copy-all"]')) {
        document.querySelectorAll('h2[data-action="copy-text"]').forEach(el => el.classList.add('highlight-force'));
    }

    if (!Store.activeTable) {
        const organEl = e.target.closest('svg [id]');
        const popup = document.getElementById('organ-popup');
        const isInsidePopup = e.target.closest('#organ-popup');

        if (organEl && organEl.id && ORGAN_MAP[organEl.id]) {
            const organDef = ORGAN_MAP[organEl.id];
            if (organDef.table && organDef.table.includes('_lesion_main')) {
                clearTimeout(organPopupTimeout);
                if (currentHoveredOrganId !== organEl.id) {
                    currentHoveredOrganId = organEl.id;
                    renderOrganPopup(organDef, organEl.id);
                    popup.style.left = `${e.clientX + 15}px`;
                    popup.style.top = `${e.clientY + 15}px`;
                    popup.classList.add('active');
                }
            }
        } else if (isInsidePopup) {
            clearTimeout(organPopupTimeout);
        } else {
            organPopupTimeout = setTimeout(() => {
                if (popup) popup.classList.remove('active');
                currentHoveredOrganId = null;
            }, 200);
        }
    }

    if (!APP_SETTINGS.showTooltips) return;

    const btn = e.target.closest('.btn');
    const titleEl = e.target.closest('.sub-table-title');
    let imgConfig = null;
    let anchorEl = null;

    if (btn && btn.dataset.id) {
        for (const key in window.HOVER_IMAGES) {
            if (btn.dataset.id.endsWith(`_${key}`) || btn.dataset.id === key) {
                imgConfig = window.HOVER_IMAGES[key];
                anchorEl = btn;
                break;
            }
        }
    } else if (titleEl) {
        const titleKey = (titleEl.textContent || '').trim();
        if (titleKey && window.HOVER_IMAGES[titleKey]) {
            imgConfig = window.HOVER_IMAGES[titleKey];
            anchorEl = titleEl;
        }
    }

    if (imgConfig && anchorEl) {
        const tooltip = document.getElementById('image-tooltip');
        const img = document.getElementById('image-tooltip-img');
        if (tooltip && img) {
            const isObj = typeof imgConfig === 'object' && imgConfig !== null;
            const url = isObj ? imgConfig.url : imgConfig;
            const size = isObj && imgConfig.size ? imgConfig.size : '500px';
            const numericSize = parseInt(size, 10) || 500;

            img.src = url;
            img.style.maxWidth = size;
            img.style.maxHeight = size;
            tooltip.style.display = 'block';

            const rect = anchorEl.getBoundingClientRect();
            let leftPos = rect.right + 10;
            let topPos = rect.top;

            if (leftPos + numericSize > window.innerWidth) leftPos = rect.left - (numericSize + 10);
            if (topPos + numericSize > window.innerHeight) topPos = window.innerHeight - (numericSize + 10);

            tooltip.style.left = `${leftPos}px`;
            tooltip.style.top = `${topPos}px`;
        }
    }
});

document.addEventListener('mouseout', e => {
    if (e.target.closest && e.target.closest('[data-action="copy-all"]')) {
        document.querySelectorAll('h2[data-action="copy-text"]').forEach(el => el.classList.remove('highlight-force'));
    }

    const btn = e.target.closest('.btn');
    const titleEl = e.target.closest('.sub-table-title');
    if ((btn && btn.dataset.id) || titleEl) {
        const tooltip = document.getElementById('image-tooltip');
        if (tooltip) tooltip.style.display = 'none';
    }
});

document.addEventListener('mouseup', () => {
    isDraggingSlice = false;
});

document.addEventListener('mousedown', e => {
    if (e.target.id === 'slice-image') {
        e.preventDefault();
        isDraggingSlice = true;
        dragSliceLastY = e.clientY;
        return;
    }

    if (!e.target.classList.contains('field_size')) return;
    let dims = e.target.dataset.dims ? JSON.parse(e.target.dataset.dims) : sizeDimsFromValue(e.target.value);
    if (dims.length > 0 && dims.length < 3 && dims[dims.length - 1] !== null) {
        dims.push(null);
        e.target.dataset.dims = JSON.stringify(dims);
        const strVal = e.target.value.endsWith('x') ? e.target.value : `${e.target.value}x`;
        Store.fields = { ...Store.fields, [e.target.dataset.id]: strVal, [`${e.target.dataset.id}_dims`]: e.target.dataset.dims };
        e.target.value = strVal;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    HistoryManager.loadStateFromUrl();
    HistoryManager.renderDropdown();

    const grammarMergingCheckbox = document.getElementById('setting-grammar-merging');
    if (grammarMergingCheckbox) grammarMergingCheckbox.checked = APP_SETTINGS.grammarMerging;

    const suvWordCheckbox = document.getElementById('setting-suv-word');
    if (suvWordCheckbox) suvWordCheckbox.checked = APP_SETTINGS.suvWord;
    
    const hidePredefinedCheckbox = document.getElementById('setting-hide-predefined');
    if (hidePredefinedCheckbox) hidePredefinedCheckbox.checked = APP_SETTINGS.hidePredefined;

    const previewCheckbox = document.getElementById('setting-preview');
    if (previewCheckbox) previewCheckbox.checked = APP_SETTINGS.previewReport;
    
    const tooltipsCheckbox = document.getElementById('setting-show-tooltips');
    if (tooltipsCheckbox) tooltipsCheckbox.checked = APP_SETTINGS.showTooltips;

    const optTextCheckbox = document.getElementById('setting-opt-text');
    if (optTextCheckbox) optTextCheckbox.checked = APP_SETTINGS.optText;
    
    const recistCheckbox = document.getElementById('setting-recist');
    if (recistCheckbox) recistCheckbox.checked = APP_SETTINGS.recist;
    
    const llmModelSelect = document.getElementById('llm-model-select');
    if (llmModelSelect) {
        const savedModel = localStorage.getItem(LLM_MODEL_KEY);
        if (savedModel && [...llmModelSelect.options].some(o => o.value === savedModel)) {
            llmModelSelect.value = savedModel;
        }
        llmModelSelect.addEventListener('change', () => {
            localStorage.setItem(LLM_MODEL_KEY, llmModelSelect.value);
        });
    }
    const llmPatologyInput = document.getElementById('llm-patology-input');
    if (llmPatologyInput) {
        llmPatologyInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                llmSendPathology();
            }
        });
    }
    
    document.body.classList.toggle('hide-predefined', APP_SETTINGS.hidePredefined);
    document.body.classList.toggle('has-preview', APP_SETTINGS.previewReport);
    
    UI.render('exams');
});
