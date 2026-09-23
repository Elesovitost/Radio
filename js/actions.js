/* =============================================================
   actions.js
   Module extracted from index.html inline <script>.
   Edit this file - NOT index.html - to change this part.
   ============================================================= */

/* ═══════════════════════════════════════════════
   STATE ACTIONS
═══════════════════════════════════════════════ */
let isDraggingSlice = false;
let dragSliceLastY = 0;

function isNormalButton(globalId) {
    const cfg = ButtonConfigs[globalId];
    return !!(cfg && cfg.type === 'standard' && cfg.states && cfg.states.includes('normal!'));
}

function isPredefButton(globalId) {
    const cfg = ButtonConfigs[globalId];
    return !!(cfg && cfg.type === 'standard' && cfg.states && cfg.states.includes('predef'));
}

function isAddCustomButton(globalId) {
    return /_add_custom$/.test(globalId);
}

function isButtonOn(val, cfg) {
    if (!cfg) return !!val;
    if (cfg.type === 'standard') {
        if (val === true) return true;
        return (typeof val === 'number' ? val : 0) > 0;
    }
    return val === true || val === 'custom';
}

function buttonOffValue(cfg) {
    return cfg?.type === 'standard' ? 0 : false;
}

/* predef je výlučné: zapnutí smaže patologie + custom + normal;
   patologie / custom / normal při aktivaci vypnou predef. */
function applyPredefMutex(states, globalId, nextVal) {
    const cfg = ButtonConfigs[globalId];
    if (!cfg || !isButtonOn(nextVal, cfg)) return states;

    const btn = document.querySelector(`button[data-id="${globalId}"]`);
    const organ = btn?.closest('table.tbl-main');
    if (!organ) return states;

    const next = { ...states };
    if (isPredefButton(globalId)) {
        organ.querySelectorAll('button[data-id]').forEach(b => {
            const sid = b.dataset.id;
            if (!sid || sid === globalId) return;
            const scfg = ButtonConfigs[sid];
            if (!scfg || !isButtonOn(next[sid], scfg)) return;
            next[sid] = buttonOffValue(scfg);
        });
        // Vymazat vlastní texty orgánu (custom expander + jeho fieldy)
        const fields = { ...Store.fields };
        const customs = { ...Store.customTexts };
        let fieldsChanged = false;
        let customsChanged = false;
        organ.querySelectorAll('table[id$="_add"][data-custom-field-ids]').forEach(addTbl => {
            const examId = Store.activeTab || 'default';
            const regionId = addTbl.dataset.regionId;
            if (!regionId) return;
            for (const localId of addTbl.dataset.customFieldIds.split(',')) {
                if (!localId) continue;
                const fid = `${examId}_${regionId}_${localId}`;
                if (fields[fid]) { fields[fid] = ''; fieldsChanged = true; }
            }
        });
        organ.querySelectorAll('input[data-action="update-custom-input"], input.input-btn-inner[data-id]').forEach(inp => {
            const cid = inp.dataset.id;
            if (!cid) return;
            if (customs[cid]) { customs[cid] = ''; customsChanged = true; }
        });
        if (fieldsChanged) Store.fields = fields;
        if (customsChanged) Store.customTexts = customs;
    } else {
        organ.querySelectorAll('button[data-id]').forEach(b => {
            const sid = b.dataset.id;
            if (!sid || !isPredefButton(sid) || !isButtonOn(next[sid], ButtonConfigs[sid])) return;
            next[sid] = 0;
        });
    }
    return next;
}

function getExclusiveStates(globalId, nextVal) {
    const btn = document.querySelector(`button[data-id="${globalId}"]`);
    if (!btn) return { block: false, states: null };
    
    const table = btn.closest('table[id*="_excl"]');
    if (!table) return { block: false, states: null };

    /* Druh/typ (*_k_*): exclusivní, ale smí zůstat prázdný.
       Ostatní _excl (počet, etiologie, …): vždy právě jedna aktivní volba. */
    const allowEmpty = /_k_/.test(globalId) || (table.id || '').includes('_r2_excl');
    if (!allowEmpty && (nextVal === false || nextVal === 0)) return { block: true, states: null };

    let states = { ...Store.buttonStates };
    if (nextVal !== false && nextVal !== 0) {
        table.querySelectorAll('button[data-id]').forEach(b => {
            const sid = b.dataset.id;
            if (sid !== globalId && ButtonConfigs[sid]) {
                states[sid] = ButtonConfigs[sid].type === 'standard' ? 0 : false;
            }
        });
    }
    
    return { block: false, states };
}

function commitButtonState(globalId, next) {
    const excl = getExclusiveStates(globalId, next);
    if (excl.block) return false;
    let states = excl.states || Store.buttonStates;
    states = applyPredefMutex(states, globalId, next);
    Store.buttonStates = { ...states, [globalId]: next };
    return true;
}

/* Hromadně zapne/vypne organ predef tlačítka (všechna otevřená, nebo jen zadaná vyšetření). */
function applyAllOrganPredefs(enabled, examIds = null) {
    const openExams = examIds
        ? examIds.filter(id => Store.exams.has(id))
        : Array.from(Store.exams || []);
    if (!openExams.length) return;

    const prevTab = Store.activeTab;
    Store._silent = true;

    let states = { ...Store.buttonStates };

    for (const examId of openExams) {
        const exam = getExamById(examId);
        if (!exam) continue;
        Store.activeTab = examId;

        const holder = document.createElement('div');
        holder.hidden = true;
        document.body.appendChild(holder);
        exam.regs.forEach(regId => {
            const region = REGIONS[regId];
            if (region?.layout) {
                UI.generateLayoutNodes(regId, region).forEach(n => holder.appendChild(n));
            }
        });

        Store.buttonStates = states;

        const predefIds = [...holder.querySelectorAll('button[data-id]')]
            .map(b => b.dataset.id)
            .filter(id => isPredefButton(id));

        for (const gid of predefIds) {
            if (enabled) {
                states = applyPredefMutex(states, gid, 1);
                states = { ...states, [gid]: 1 };
            } else {
                states[gid] = 0;
            }
        }
        Store.buttonStates = states;
        holder.remove();
    }

    Store.activeTab = prevTab;
    Store.buttonStates = states;
    Store._silent = false;
    UI.renderDetails();
    UI.renderReport();
}

function cycleState(globalId, dir = 1) {
    const cfg = ButtonConfigs[globalId];
    if (!cfg || cfg.type !== 'standard') return;
    let cur = Store.buttonStates[globalId] || 0;
    if (cur === true) cur = 2;
    const next = Math.max(0, Math.min(cfg.states.length - 1, cur + dir));
    if (next === cur) return;

    if (!commitButtonState(globalId, next)) return;
    
    const nextStateStr = cfg.states[next];
    if (nextStateStr === 'custom') {
        setTimeout(() => {
            const inp = document.querySelector(`input.input-btn-inner[data-id="${globalId}"]`);
            if (inp) {
                inp.focus();
                inp.setSelectionRange(inp.value.length, inp.value.length);
            }
        }, 0);
    } else {
        const fieldMatch = nextStateStr.match(/\[field:[^:]+:([^\]]+)\]/);
        if (fieldMatch) {
            setTimeout(() => {
                const inp = document.querySelector(`input[data-action="update-field"][data-id="${globalId}_${fieldMatch[1]}"]`);
                if (inp) {
                    inp.focus();
                    inp.setSelectionRange(inp.value.length, inp.value.length);
                }
            }, 0);
        }
    }
}

function toggleBasic(globalId, force = null) {
    const cfg = ButtonConfigs[globalId];
    if (!cfg) return;
    const cur = Store.buttonStates[globalId] ?? false;
    let next;
    
    if (force === false)  next = false;
    else if (force === true) next = true;
    else if (cfg.custom)  next = cur === false ? true : cur === true ? 'custom' : false;
    else                  next = !cur;
    
    if (next === cur) return;

    if (!commitButtonState(globalId, next)) return;
    if (next === 'custom') focusInput(globalId);
}

function toggleBasicCustom(globalId, activate = null) {
    const cur = Store.buttonStates[globalId] || false;
    const next = activate !== null ? activate : !cur;
    if (next === cur) return;

    if (!commitButtonState(globalId, next)) return;
    if (next) focusInput(globalId);
}

/* ═══════════════════════════════════════════════
   MODULARIZOVANÉ AKCE A EVENT LISTENERY
═══════════════════════════════════════════════ */

function createNewInstance(baseTableId) {
    const examId = Store.activeTab || 'default';
    const instId = Date.now().toString();
    const tableInstances = getExamInstances(baseTableId, examId);
    
    const isLN = baseTableId.includes('lymphnode');
    const isHemo = baseTableId.includes('hemo');
    const regionId = baseTableId.split('_')[0];
    
    let pfx = 'l';
    if (isHemo) {
        pfx = 'bh';
    } else {
        const prefixMap = { brain: 'bl', thorax: isLN ? 'tln' : 'tl', abdomen: isLN ? 'aln' : 'al', neck: isLN ? 'ln' : 'l', skeleton: 'l', soft: 'l', prostate: isLN ? 'prln' : 'pl', rectum: isLN ? 'rtln' : 'rt' };
        pfx = prefixMap[regionId] || (isLN ? 'ln' : 'l');
    }
    
    const p = `${pfx}_${instId}`;
    const defaultLesState = (regionId === 'skeleton' || regionId === 'soft') && !isLN ? 1 : true;
    
    let kindSuffix = isLN ? 'uzl' : 'les';
    if (isHemo) kindSuffix = 'lez';
    else if (regionId === 'prostate' && !isLN) kindSuffix = 'loz';

    /* Nevolat UI.render uprostřed vytváření – activeTable se nastaví až potom. */
    const prevSilent = Store._silent;
    Store._silent = true;
    setExamInstances(baseTableId, [...tableInstances, instId], examId);
    Store.buttonStates = { 
        ...Store.buttonStates, 
        [`${examId}_${regionId}_${p}_c_soli`]: true, 
        [`${examId}_${regionId}_${p}_k_${kindSuffix}`]: defaultLesState 
    };
    Store._silent = prevSilent;
    
    return `${baseTableId}__${instId}`;
}

const ClipboardService = {
    formatReport: function(includeIndicationLabel = false) {
        return ReportDoc.serializeFindings(UI.getReportDoc(), { includeIndicationLabel });
    },

    formatConclusion: function(incidentalLabel = 'Vedlejší nálezy:') {
        return ReportDoc.serializeImpression(UI.getReportDoc(), { incidentalLabel });
    },

    /* Výstup 3: celá zpráva (titulek + nález + závěr) dle REPORT_PROFILES. */
    formatAll: function() {
        return ReportDoc.compose(UI.getReportDoc());
    },

    copyToClipboard: function(text, targetEl, originalText) {
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            if (targetEl) {
                targetEl.textContent = 'Zkopírováno!';
                targetEl.style.color = '#58a6ff';
                setTimeout(() => { targetEl.textContent = originalText; targetEl.style.color = ''; }, 1200);
            }
        }).catch(err => console.error('Nelze kopírovat:', err));
    }
};

function getLlmHelpContext() {
    const gender = Store.patientGender || '⚥';
    const isFemale = gender === '♀';
    const isMale = gender === '♂';
    return {
        conclusion: ClipboardService.formatConclusion() || '',
        age: (Store.patientAge || '').trim(),
        gender,
        patientText: isFemale ? 'Pacientka' : (isMale ? 'Pacient' : 'Pacient'),
        indication: (Store.indication || '').trim()
    };
}

function getLlmExamTitles() {
    const ids = (Store.exams && Store.exams.size) ? Array.from(Store.exams) : [Store.activeTab];
    return ids.map(id => {
        const exam = getExamById(id);
        if (!exam) return '';
        const sideConfig = APP_MANIFEST.examsWithSides[id];
        if (sideConfig) {
            const side = Store.fields[sideConfig.field];
            if (side === 'R') return `MR pravého ${sideConfig.label}`;
            if (side === 'L') return `MR levého ${sideConfig.label}`;
        }
        return exam.title;
    }).filter(Boolean);
}

function executeCopyFlow(textToCopy, target, isAll) {
    let warningMessages = Corrections.validate(textToCopy).map(w => w.message);
    
    if (Store.pastDate) {
        const pastDate = new Date(Store.pastDate);
        const today = new Date();
        const diffTime = Math.abs(today - pastDate);
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        if (diffDays <= 7) {
            warningMessages.push("Pozor, datum současné.");
        }
    }

    const finalizeCopy = () => {
        HistoryManager.saveCurrentState();
        
        if (APP_SETTINGS.previewReport) {
            UI.openPreview(textToCopy, target, isAll);
        } else {
            navigator.clipboard.writeText(textToCopy).then(() => {
                if (isAll) {
                    const panels = document.querySelectorAll('#panel-report, #panel-conclusion');
                    panels.forEach(panel => panel.classList.add('blink-border'));
                    setTimeout(() => { panels.forEach(panel => panel.classList.remove('blink-border')); }, 300);
                } else if (target) {
                    const panel = target.closest('.panel');
                    if (panel) {
                        panel.classList.add('blink-border');
                        setTimeout(() => { panel.classList.remove('blink-border'); }, 300);
                    }
                }
            }).catch(err => console.error('Nelze kopírovat:', err));
        }
    };

    if (warningMessages.length > 0) {
        const overlay = document.createElement('div');
        Object.assign(overlay.style, {
            position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
            backgroundColor: 'rgba(220, 38, 38, 0.95)', color: '#fff', padding: '15px 25px',
            borderRadius: '6px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', zIndex: '9999',
            fontSize: '14px', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ff4444',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px'
        });
        
        const textContainer = document.createElement('div');
        textContainer.innerHTML = warningMessages.join('<br><br>');
        overlay.appendChild(textContainer);

        const okBtn = document.createElement('button');
        okBtn.textContent = 'OK';
        Object.assign(okBtn.style, {
            padding: '6px 20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px',
            backgroundColor: '#fff', color: '#dc2626', border: 'none', borderRadius: '4px'
        });
        okBtn.onclick = () => {
            if (document.body.contains(overlay)) document.body.removeChild(overlay);
            finalizeCopy();
        };
        overlay.appendChild(okBtn);

        document.body.appendChild(overlay);
    } else {
        finalizeCopy();
    }
}

const ActionHandlers = {
    'toggle-settings': () => {
        const modal = document.getElementById('settings-modal');
        if (modal) {
            const show = modal.style.display === 'none';
            if (show) {
                const llm = document.getElementById('llm-modal');
                if (llm) llm.style.display = 'none';
            }
            modal.style.display = show ? 'block' : 'none';
        }
    },
    'hide-slice-viewer': () => {
        Store.sliceViewerHidden = true;
        UI.refreshSliceViewer();
    },
    'show-slice-viewer': () => {
        Store.sliceViewerHidden = false;
        UI.refreshSliceViewer();
    },
    'toggle-table-collapse': (target) => {
        const table = target.closest('.tbl-main');
        if (!table) return;
        table.classList.toggle('tbl-main-collapsed');
        if (!table.id) return;
        Store.collapsedTables = {
            ...Store.collapsedTables,
            [table.id]: table.classList.contains('tbl-main-collapsed')
        };
    },
    'toggle-llm': () => {
        const modal = document.getElementById('llm-modal');
        if (modal) {
            const show = modal.style.display === 'none';
            if (show) {
                const settings = document.getElementById('settings-modal');
                if (settings) settings.style.display = 'none';
            }
            modal.style.display = show ? 'block' : 'none';
        }
    },
    'llm-impression': () => llmSendImpression(),
    'llm-case-study': () => llmSendCaseStudy(),
    'llm-pathology': () => llmSendPathology(),
    'copy-llm-impression': (target) => {
        if (!LlmImpression.text) return;
        navigator.clipboard.writeText(LlmImpression.text).then(() => {
            if (!target) return;
            const orig = target.textContent;
            target.textContent = 'Zkopírováno!';
            target.classList.add('llm-copied');
            setTimeout(() => {
                target.textContent = orig;
                target.classList.remove('llm-copied');
            }, 1200);
        }).catch(err => console.error('Nelze kopírovat:', err));
    },
    'llm-clear-impression': () => {
        LlmImpression = { text: '', error: '', loading: false };
        UI.renderReport();
    },
    'copy-text': (target) => {
        const isReport = target.dataset.target === 'report-container';
        const textToCopy = isReport ? ClipboardService.formatReport() : ClipboardService.formatConclusion();
        executeCopyFlow(textToCopy, target, false);
    },
    'copy-all': () => {
        executeCopyFlow(ClipboardService.formatAll(), null, true);
    },
    'preview-close': () => {
        document.getElementById('preview-modal').style.display = 'none';
        document.getElementById('preview-backdrop').style.display = 'none';
    },
    'preview-copy': () => {
        const text = document.getElementById('preview-textarea').value;
        navigator.clipboard.writeText(text).then(() => {
            const modal = document.getElementById('preview-modal');
            modal.classList.add('blink-border');
            
            if (Store.previewIsAll) {
                const panels = document.querySelectorAll('#panel-report, #panel-conclusion');
                panels.forEach(panel => panel.classList.add('blink-border'));
                setTimeout(() => { panels.forEach(panel => panel.classList.remove('blink-border')); }, 300);
            } else if (Store.previewTarget) {
                 const panel = Store.previewTarget.closest('.panel');
                 if (panel) {
                     panel.classList.add('blink-border');
                     setTimeout(() => { panel.classList.remove('blink-border'); }, 300);
                 }
            }

            setTimeout(() => { 
                modal.classList.remove('blink-border');
                ActionHandlers['preview-close'](); 
            }, 300);
        }).catch(err => console.error('Nelze kopírovat:', err));
    },
    'open-region': (target, dataset) => {
        if (dataset.exam) Store.activeTab = dataset.exam;
        Store.activeTable = `region:${dataset.region}`;
    },
    'open-table': (target, dataset) => {
        if (dataset.exam) Store.activeTab = dataset.exam;
        
        if (dataset.table && dataset.table.includes('__')) {
            Store.activeTable = dataset.table;
        } else if (dataset.table && (dataset.table.includes('lesion') || dataset.table.includes('lymphnode') || dataset.table.includes('hemo'))) {
            Store.activeTable = createNewInstance(dataset.table);
        } else {
            Store.activeTable = dataset.table;
        }
    },
    'cycle-exam-part': (target, dataset, dir = 1) => {
        const oldId = dataset.payload;
        const part = dataset.part;
        const oldExam = getExamById(oldId);
        if (!oldExam) return;
        
        const candidates = ExamTitle.variants(oldId, part);
        if (candidates.length <= 1) return;

        let idx = candidates.indexOf(oldId);
        idx = (idx + dir + candidates.length) % candidates.length;
        const newId = candidates[idx];
        
        const migrateObj = (obj) => {
            const res = {};
            for (const [k, v] of Object.entries(obj)) {
                if (k.startsWith(oldId + '_')) {
                    res[newId + '_' + k.substring(oldId.length + 1)] = v;
                } else {
                    res[k] = v;
                }
            }
            return res;
        };

        Store._silent = true;
        Store.buttonStates = migrateObj(Store.buttonStates);
        Store.customTexts = migrateObj(Store.customTexts);
        Store.fields = migrateObj(Store.fields);
        Store.expandedNotes = migrateObj(Store.expandedNotes);
        migrateButtonConfigs(oldId, newId);
        if (Store.activeTab === oldId) Store.activeTab = newId;
        const newExams = new Set(Store.exams);
        newExams.delete(oldId);
        newExams.add(newId);
        Store.exams = newExams;

        const migratedInstances = {};
        for (const [k, v] of Object.entries(Store.instances || {})) {
            if (k.startsWith(oldId + '__')) {
                migratedInstances[newId + k.substring(oldId.length)] = v;
            } else {
                migratedInstances[k] = v;
            }
        }
        Store.instances = migratedInstances;

        const oldRadiofarm = Object.keys(RADIOFARM_CONFIG).find(key => oldId.toLowerCase().includes(key));
        const newRadiofarm = Object.keys(RADIOFARM_CONFIG).find(key => newId.toLowerCase().includes(key));
        if (oldRadiofarm !== newRadiofarm) window._currentRadiofarm = null;

        Store._silent = false;

        UI.render('exams');
    },
    'remove-instance': (target, dataset) => {
        const [baseTableId, instId] = dataset.id.split('__');
        const examId = Store.activeTab || 'default';
        const tableInstances = getExamInstances(baseTableId, examId);
        if (tableInstances.length) {
            setExamInstances(baseTableId, tableInstances.filter(i => i !== instId), examId);
            const filterObj = (obj) => Object.fromEntries(Object.entries(obj).filter(([k]) => !k.includes(`_${instId}`)));
            
            Store.buttonStates = filterObj(Store.buttonStates);
            Store.customTexts = filterObj(Store.customTexts);
            Store.fields = filterObj(Store.fields);
            
            Store.activeTable = null;
            UI.renderReport();
        }
    },
    'cycle-side': (target, dataset, dir = 1) => {
        const field = dataset.payload;
        const current = Store.fields[field];
        const states = ['R', 'L'];
        
        let idx = states.indexOf(current);
        if (idx === -1) {
            Store.fields = { ...Store.fields, [field]: dir > 0 ? 'R' : 'L' };
        } else {
            idx = (idx + dir + states.length) % states.length;
            Store.fields = { ...Store.fields, [field]: states[idx] };
        }
        UI.renderDetails();
    },
    'toggle-exam': (target, dataset) => {
        const next = new Set(Store.exams);
        if (next.has(dataset.payload)) {
            next.delete(dataset.payload);
            if (Store.activeTab === dataset.payload) Store.activeTab = next.size > 0 ? Array.from(next).pop() : null;
        } else {
            next.add(dataset.payload);
            Store.activeTab = dataset.payload;
        }
        Store.exams = next;
        Store.activeTable = null;
    },
    'select-tab': (target, dataset) => {
        Store.activeTab = dataset.payload;
        Store.activeTable = null;
    },
    'remove-exam': (target, dataset) => {
        const examId = dataset.payload;
        const next = new Set(Store.exams);
        next.delete(examId);
        
        if (Store.activeTab === examId) {
            Store.activeTab = next.size > 0 ? Array.from(next).pop() : null;
        }
        
        Store.indication = '';
        Store.pastDate = '';
        Store.reportId = '';
        Store.patientGender = '⚥';
        Store.patientAge = '';
        HistoryManager.clearUrl();
        const dateInput = document.querySelector('input[data-action="update-date"]');
        if (dateInput) {
            dateInput.value = '';
        }
        
        Store.exams = next;
        Store.activeTable = null;
        
        const filterExamData = (obj) => Object.fromEntries(Object.entries(obj).filter(([k]) => !k.startsWith(`${examId}_`)));
        
        Store.buttonStates = filterExamData(Store.buttonStates);
        Store.customTexts = filterExamData(Store.customTexts);
        
        let newFields = filterExamData(Store.fields);
        if (examId.toLowerCase().includes('pet') || next.size === 0) {
            ['suv_jater', 'suv_jater_minule', 'suv_parotid', 'suv_sleziny', 'suv_striata'].forEach(k => delete newFields[k]);
            window._currentRadiofarm = null;
            document.querySelectorAll('.ref-group input').forEach(inp => delete inp.dataset.edited);
        }
        Store.fields = newFields;
        
        Store.expandedNotes = filterExamData(Store.expandedNotes);
        
        if (next.size === 0) {
            Store.instances = {};
        } else {
            const instPrefix = `${examId}__`;
            Store.instances = Object.fromEntries(
                Object.entries(Store.instances || {}).filter(([k]) => !k.startsWith(instPrefix))
            );
        }
        
        UI.renderReport(); 
    },
    'cycle-state': (target, dataset) => cycleState(dataset.id, 1),
    'toggle-basic': (target, dataset) => toggleBasic(dataset.id, null),
    'toggle-basic-custom': (target, dataset) => toggleBasicCustom(dataset.id, true),
    'toggle-id-input': () => {
        const inp = document.getElementById('report-id-input');
        if (inp) {
            inp.style.display = inp.style.display === 'none' ? 'block' : 'none';
            if (inp.style.display === 'block') inp.focus();
        }
    },
    'open-history': (target, dataset) => {
        const id = dataset.payload;
        const url = new URL(window.location.href);
        url.searchParams.set('historyId', id);
        window.history.pushState({}, '', url.toString());
        HistoryManager.loadStateFromUrl();
    },
    'delete-all-history': () => {
        if (confirm('Opravdu vymazat veškerou lokální historii vyšetření?')) {
            localStorage.removeItem(HistoryManager.getKey());
            HistoryManager.renderDropdown();
        }
    },
    'cycle-gender': (target, dataset, dir = 1) => {
        const states = ['⚥', '♂', '♀'];
        let idx = states.indexOf(Store.patientGender);
        idx = (idx + dir + states.length) % states.length;
        Store.patientGender = states[idx];
        target.textContent = Store.patientGender;
    }
};
