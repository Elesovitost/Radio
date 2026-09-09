/* =============================================================
   report-context.js
   Module extracted from index.html inline <script>.
   Edit this file - NOT index.html - to change this part.
   ============================================================= */

/* ═══════════════════════════════════════════════
   CONTEXT HELPER FOR REPORTS
═══════════════════════════════════════════════ */

function resolveButtonConfig(examId, regionId, localId) {
    const exact = `${examId}_${regionId}_${localId}`;
    if (ButtonConfigs[exact]) return ButtonConfigs[exact];
    const suffix = `_${regionId}_${localId}`;
    for (const key in ButtonConfigs) {
        if (key.endsWith(suffix)) return ButtonConfigs[key];
    }
    return null;
}

function migrateButtonConfigs(oldId, newId) {
    Object.keys(ButtonConfigs).forEach((key) => {
        if (key.startsWith(oldId + '_')) {
            ButtonConfigs[newId + key.substring(oldId.length)] = ButtonConfigs[key];
            delete ButtonConfigs[key];
        }
    });
}

function createContext(regionId, examId) {
    const isPET = examId.includes('pet');
    const isPetOnly = (id) => !isPET && (id.includes('_suv') || id.includes('_act') || id.includes('_akt') || id.includes('_neakt') || id.includes('_fok') || id.includes('_poly') || id.includes('ji_aktdist') || id.includes('ji_aktdif'));
    return {
        examId,
        _val(localId) {
            if (isPetOnly(localId)) return 0;
            return Store.buttonStates[`${examId}_${regionId}_${localId}`];
        },
        isActive(localId, statesArray = null) {
            if (isPetOnly(localId)) return false;
            const globalId = `${examId}_${regionId}_${localId}`;
            const val = this._val(localId);
            const cfg = resolveButtonConfig(examId, regionId, localId);
            if (!cfg) {
                if (statesArray) return statesArray.includes(val || 0);
                return val === true || val === 'custom' || (typeof val === 'number' && val > 0);
            }
            
            if (cfg.type === 'standard') {
                if (statesArray) return statesArray.includes(val || 0);
                return (val || 0) > 0;
            }
            return val === true || val === 'custom';
        },
        text(localId, lowercase = false) {
            if (isPetOnly(localId)) return '';
            const globalId = `${examId}_${regionId}_${localId}`;
            const val = Store.buttonStates[globalId] || 0;
            const cfg = resolveButtonConfig(examId, regionId, localId);
            if (!cfg) return '';
            
            let txt = '';
            if (cfg.type === 'standard') {
                const stateNameRaw = cfg.states[val];
                if (stateNameRaw === 'custom') {
                    txt = '\u200B' + (Store.customTexts[globalId] || '[Nevyplněno]');
                } else {
                    const fieldMatch = stateNameRaw.match(/^(.*?)\s*\[field:([^:]+):([^:\]]+)(?::([^\]]+))?\]$/);
                    if (fieldMatch) {
                        const baseName = fieldMatch[1].trim();
                        const fieldGlobalId = `${globalId}_${fieldMatch[3].trim()}`;
                        const fieldVal = Store.fields[fieldGlobalId] || '[Nevyplněno]';
                        txt = `${baseName} ${fieldVal}`;
                    } else {
                        txt = stateNameRaw;
                    }
                }
            } else if (cfg.type === 'basic') {
                if (val === 'custom') txt = '\u200B' + (Store.customTexts[globalId] || '[Nevyplněno]');
                else if (val === true) txt = cfg.text;
                else txt = 'Negativní';
            } else if (cfg.type === 'basic_custom') {
                txt = val ? ('\u200B' + (Store.customTexts[globalId] || '[Nevyplněno]')) : 'Negativní';
            }
            
            return lowercase ? txt.toLowerCase() : txt;
        },
        field(fieldId) {
            if (isPetOnly(fieldId)) return '';
            const val = Store.fields[`${examId}_${regionId}_${fieldId}`] || '';
            if (val && (fieldId.includes('custom') || fieldId.includes('desc') || fieldId.includes('conc'))) {
                return '\u200B' + val;
            }
            return val;
        },
        getDynamics(sizeId, sizeOldId, suvId, suvOldId, cntOldId) {
            if (!Store.pastDate) return "";

            const currSize = this.field(sizeId);
            const minSize = this.field(sizeOldId);
            const currSuv = this.field(suvId);
            const minSuv = this.field(suvOldId);
            const cntOld = cntOldId && this.isActive(cntOldId) ? this.text(cntOldId) : '';
            
            const cLiv = extractNumber(Store.fields['suv_jater'] || '3.0');
            const mLiv = extractNumber(Store.fields['suv_jater_minule'] || '3.0');

            return MetricsEngine.calculateDynamics(currSize, minSize, currSuv, minSuv, cLiv, mLiv, APP_SETTINGS.recist, cntOld);
        },
        mapStates(config) {
            const found = [];
            for (const item of config.items) {
                const globalId = `${examId}_${regionId}_${item.id}`;
                const val = Store.buttonStates[globalId] || 0;
                
                if (val > 0 && item[val]) {
                    found.push(item[val]);
                } else if (val === 'custom' || (val > 0 && ButtonConfigs[globalId]?.states[val] === 'custom')) {
                    const customTxt = Store.customTexts[globalId];
                    if (customTxt) found.push(customTxt);
                }
            }
            if (found.length === 0) return '';
            const merged = formatCzechList(found);
            return (config.prefix || '') + merged + (config.suffix || '');
        },
        mapConditions(rules) {
            let result = "";
            for (const rule of rules) {
                const matched = [];
                for (const item of rule.items) {
                    if (this.isActive(item.id, rule.states)) matched.push(item.text);
                }
                if (matched.length > 0) {
                    result += `${rule.prefix || ''}${matched.join(rule.separator || ', ')}${rule.suffix || ''}\n`;
                }
            }
            return result;
        }
    };
}
