/* =============================================================
   settings.js
   Module extracted from index.html inline <script>.
   Edit this file - NOT index.html - to change this part.
   ============================================================= */

/* ═══════════════════════════════════════════════
   STORE & GLOBALS
═══════════════════════════════════════════════ */
const savedConfig = JSON.parse(localStorage.getItem('medAppConfig') || '{}');
const APP_SETTINGS = { 
    grammarMerging: savedConfig.grammarMerging !== undefined ? savedConfig.grammarMerging : true,
    suvWord: savedConfig.suvWord || false,
    hidePredefined: savedConfig.hidePredefined || false,
    previewReport: savedConfig.previewReport || false,
    showTooltips: savedConfig.showTooltips !== undefined ? savedConfig.showTooltips : true,
    optText: savedConfig.optText !== undefined ? savedConfig.optText : true,
    recist: savedConfig.recist || false
};

function saveSettings() {
    localStorage.setItem('medAppConfig', JSON.stringify({ 
        grammarMerging: APP_SETTINGS.grammarMerging,
        suvWord: APP_SETTINGS.suvWord, 
        hidePredefined: APP_SETTINGS.hidePredefined,
        previewReport: APP_SETTINGS.previewReport,
        showTooltips: APP_SETTINGS.showTooltips,
        optText: APP_SETTINGS.optText,
        recist: APP_SETTINGS.recist
    }));
    document.body.classList.toggle('hide-predefined', APP_SETTINGS.hidePredefined);
    document.body.classList.toggle('has-preview', APP_SETTINGS.previewReport);
    UI.renderReport();
}

function formatCzechList(arr) {
    if (!arr || !arr.length) return '';
    arr = arr.map(item => item.trim().replace(/[.,]\s*$/, ''));
    if (!APP_SETTINGS.grammarMerging) {
        return arr.join(', ').replace(/\u200B/g, '');
    }

    const groups = new Map();
    const validSuffixes = ['vpravo', 'vlevo', 'bilat.', 'l.dx.', 'l.sin.'];

    arr.forEach(item => {
        const parts = item.trim().split(' ');
        if (parts.length > 1) {
            const lastWord = parts[parts.length - 1].toLowerCase();
            if (validSuffixes.includes(lastWord)) {
                const suffix = parts.pop();
                const prefix = parts.join(' ');
                if (!groups.has(suffix)) groups.set(suffix, new Set());
                groups.get(suffix).add(prefix);
            } else {
                if (!groups.has('')) groups.set('', new Set());
                groups.get('').add(item.trim());
            }
        } else {
            if (!groups.has('')) groups.set('', new Set());
            groups.get('').add(item.trim());
        }
    });

    if (groups.has('vpravo') && groups.has('vlevo')) {
        const arrR = Array.from(groups.get('vpravo')).sort();
        const arrL = Array.from(groups.get('vlevo')).sort();
        const isIdentical = arrR.length === arrL.length && arrR.every((val, i) => val === arrL[i]);
        if (isIdentical) {
            if (!groups.has('bilat.')) groups.set('bilat.', new Set());
            arrR.forEach(val => groups.get('bilat.').add(val));
            groups.delete('vpravo');
            groups.delete('vlevo');
        }
    }

    function joinWithAnd(list) {
        if (list.length === 0) return '';
        if (list.length === 1) return list[0];
        let res = list[0];
        for (let i = 1; i < list.length; i++) {
            const prevHasMarker = list[i-1].includes('\u200B');
            const currHasMarker = list[i].includes('\u200B');
            if (i === list.length - 1 && !prevHasMarker && !currHasMarker) {
                res += ' a ' + list[i];
            } else {
                res += ', ' + list[i];
            }
        }
        return res;
    }

    function optimizeTerms(list) {
        if (list.length < 2) return list;
        const result = [];
        let i = 0;

        while (i < list.length) {
            let j = i + 1;
            let bestGroup = [list[i]];

            while (j < list.length) {
                const currentGroup = [...bestGroup, list[j]];
                const wordGroups = currentGroup.map(s => s.split(' '));
                
                let prefixIdx = 0;
                while (true) {
                    const word = wordGroups[0][prefixIdx];
                    if (!word || !wordGroups.every(g => g[prefixIdx] === word)) break;
                    prefixIdx++;
                }
                
                let tailIdx = 0;
                while (true) {
                    const word = wordGroups[0][wordGroups[0].length - 1 - tailIdx];
                    if (!word || !wordGroups.every(g => g[g.length - 1 - tailIdx] === word)) break;
                    if (prefixIdx + tailIdx >= Math.min(...wordGroups.map(g => g.length)) - 1) break;
                    tailIdx++;
                }

                if (prefixIdx > 0 || tailIdx > 0) {
                    bestGroup = currentGroup;
                    j++;
                } else {
                    break;
                }
            }

            if (bestGroup.length > 1) {
                const wordGroups = bestGroup.map(s => s.split(' '));
                let pIdx = 0;
                while (pIdx < Math.min(...wordGroups.map(g => g.length)) && wordGroups.every(g => g[pIdx] === wordGroups[0][pIdx])) pIdx++;
                
                let tIdx = 0;
                while (tIdx < Math.min(...wordGroups.map(g => g.length)) - pIdx && wordGroups.every(g => g[g.length - 1 - tIdx] === wordGroups[0][wordGroups[0].length - 1 - tIdx])) tIdx++;

                const prefix = wordGroups[0].slice(0, pIdx).join(' ');
                const tail = wordGroups[0].slice(wordGroups[0].length - tIdx).join(' ');
                const middles = wordGroups.map(g => g.slice(pIdx, g.length - tIdx).join(' '));

                let combined = "";
                if (prefix) combined += prefix + " ";
                combined += joinWithAnd(middles);
                if (tail) combined += " " + tail;
                
                result.push(combined.trim().replace(/\s+/g, ' '));
                i = j;
            } else {
                result.push(list[i]);
                i++;
            }
        }
        return result;
    }

    const finalPhrases = [];
    groups.forEach((prefixesSet, suffixStr) => {
        let prefixes = Array.from(prefixesSet);
        prefixes = optimizeTerms(prefixes);
        
        if (suffixStr === '') {
            finalPhrases.push(...prefixes);
        } else {
            let joinedPrefixes = joinWithAnd(prefixes);
            finalPhrases.push(`${joinedPrefixes} ${suffixStr}`);
        }
    });

    return joinWithAnd(finalPhrases).replace(/\u200B/g, '');
}

// Global registry of all button configurations extracted during render
const ButtonConfigs = {};

const Store = new Proxy(
    { 
        exams: new Set(), 
        activeTab: null,
        indication: '',
        patientGender: '⚥',
        patientAge: '',
        reportId: '', 
        pastDate: '', 
        buttonStates: {}, 
        customTexts: {}, 
        fields: { suv_jater: '3.0', suv_jater_minule: '3.0' }, 
        activeTable: null,
        activeSlice: 1,
        activeViewerKey: null,
        sliceViewerHidden: true,
        instances: {},
        expandedNotes: {},
        _silent: false
    },
    {
        set(target, prop, value) {
            if (prop === '_silent') {
                target._silent = value;
                return true;
            }
            if (target[prop] === value) return true;
            target[prop] = value;
            if (target._silent) return true;

            if (prop === 'patientGender' || prop === 'patientAge') {
                // demografická data se čtou v LLM help; žádné extra UI
            } else if (prop === 'exams') {
                UI.render('exams');
            } else if (prop === 'activeTab') {
                UI.renderDetails();
                UI.renderReport();
            } else if (prop === 'pastDate') {
                UI.updatePastDateVisibility(value);
                UI.renderReport();
            } else if (prop === 'customTexts' || prop === 'fields') {
                UI.renderReport();
            } else if (prop === 'reportId') {
                const inp = document.getElementById('report-id-input');
                if (inp) {
                    inp.value = value;
                    inp.style.display = value ? 'block' : 'none';
                }
                document.body.classList.toggle('has-report-id', !!(value && value.trim()));
            } else if (prop === 'activeTable') {
                if (value === null) {
                    const newExpanded = { ...target.expandedNotes };
                    let changed = false;
                    Object.keys(newExpanded).forEach(tableKey => {
                        const parts = tableKey.split('_');
                        const regionId = parts[parts.length - 3]; 
                        const hasContent = Object.keys(target.fields).some(fKey => fKey.includes(`_${regionId}_`) && target.fields[fKey] !== '');
                        if (!hasContent) {
                            delete newExpanded[tableKey];
                            changed = true;
                        }
                    });
                    if (changed) target.expandedNotes = newExpanded;
                }
                UI.renderActiveTable();
                UI.renderReport();
            } else if (prop === 'activeSlice' || prop === 'activeViewerKey') {
                UI.updateSliceViewer(target.activeViewerKey, target.activeSlice);
            } else if (prop === 'sliceViewerHidden') {
                // přepíná se v ActionHandlers → UI.renderActiveTable()
            } else {
                UI.render(prop);
            }
            return true;
        }
    }
);

const HistoryManager = {
    getKey: () => 'medApp_history_records',
    getRecords: () => JSON.parse(localStorage.getItem(HistoryManager.getKey()) || '{}'),
    saveCurrentState: () => {
        if (!Store.reportId || Store.reportId.trim() === '') return;
        const records = HistoryManager.getRecords();
        const baseId = Store.reportId.trim();
        const timestamp = Date.now();
        const dateStr = new Date().toLocaleString('cs-CZ');
        
        records[baseId] = {
            baseId: baseId,
            timestamp: timestamp,
            dateStr: dateStr,
            pastDate: Store.pastDate, // Uložení datumu
            patientGender: Store.patientGender,
            patientAge: Store.patientAge,
            exams: Array.from(Store.exams),
            activeTab: Store.activeTab,
            indication: Store.indication,
            buttonStates: Store.buttonStates,
            customTexts: Store.customTexts,
            fields: Store.fields,
            instances: Store.instances,
            expandedNotes: Store.expandedNotes
        };
        localStorage.setItem(HistoryManager.getKey(), JSON.stringify(records));
        HistoryManager.renderDropdown();
    },
    loadStateFromUrl: () => {
        const urlParams = new URLSearchParams(window.location.search);
        const hId = urlParams.get('historyId');
        if (hId) {
            const records = HistoryManager.getRecords();
            if (records[hId]) {
                const rec = records[hId];
                Store.reportId = rec.baseId || hId;
                Store.pastDate = rec.pastDate || ''; // Načtení datumu
                
                Store.patientGender = rec.patientGender || '⚥';
                Store.patientAge = rec.patientAge || '';
                Store.exams = new Set(rec.exams || []);
                Store.activeTab = rec.activeTab;
                Store.indication = rec.indication || '';
                Store.buttonStates = rec.buttonStates || {};
                Store.customTexts = rec.customTexts || {};
                Store.instances = rec.instances || {};
                Store.expandedNotes = rec.expandedNotes || {};
                
                // Aktualizace UI s datem
                const dateInput = document.querySelector('input[data-action="update-date"]');
                if (dateInput) dateInput.value = Store.pastDate;

                setTimeout(() => {
                    // Přiřazení fieldů až po vykreslení, aby nebyly přepsány funkcí updateReferencesVisibility
                    Store.fields = rec.fields || {};

                    // Obnova referenčních hodnot do UI a zamezení jejich automatickému smazání
                    for (const [key, val] of Object.entries(Store.fields)) {
                        const inp = document.querySelector(`input[data-id="${key}"]`);
                        if (inp) {
                            inp.value = val;
                            inp.dataset.edited = 'true';
                        }
                    }

                    const activeExam = getExamById(Store.activeTab);
                    if (activeExam) {
                        activeExam.regs.forEach(regId => {
                            const region = REGIONS[regId];
                            if (region && region.layout) {
                                UI.generateLayoutNodes(regId, region);
                            }
                        });
                    }
                    UI.renderDetails();
                    UI.renderReport();
                }, 50);
            }
        }
    },
    clearUrl: () => {
        const url = new URL(window.location.href);
        if (url.searchParams.has('historyId')) {
            url.searchParams.delete('historyId');
            window.history.replaceState({}, '', url.pathname + url.search);
        }
    },
    renderDropdown: () => {
        const menu = document.getElementById('history-dropdown-menu');
        const historyBtn = document.getElementById('history-btn');
        if (!menu) return;
        const records = HistoryManager.getRecords();
        const keys = Object.keys(records).sort((a,b) => records[b].timestamp - records[a].timestamp);
        
        if (historyBtn) {
            if (keys.length > 0) {
                historyBtn.classList.add('selected');
            } else {
                historyBtn.classList.remove('selected');
            }
        }

        if (keys.length === 0) {
            menu.innerHTML = '<span class="label" style="padding: 4px; white-space: nowrap;">Žádná</span>';
            return;
        }
        
        const items = keys.map(k => {
            return el('button', {
                className: 'btn',
                textContent: `${k} (${records[k].dateStr})`,
                'data-action': 'open-history',
                'data-payload': k
            });
        });
        
        items.push(el('div', { style: 'height: 1px; background: var(--border); width: 100%; flex-shrink: 0;' }));
        items.push(el('button', {
            className: 'btn',
            style: 'color: #ff4444; font-weight: bold; text-align: center; justify-content: center;',
            textContent: 'VYMAZAT VŠE',
            'data-action': 'delete-all-history'
        }));
        
        menu.replaceChildren(...items);
    }
};

function getExamById(id) {
    for (const cat of Object.values(EXAMS)) {
        const found = cat.find(e => e.id === id);
        if (found) return found;
    }
    return null;
}
