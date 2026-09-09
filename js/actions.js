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

function getExclusiveStates(globalId, nextVal) {
    const btn = document.querySelector(`button[data-id="${globalId}"]`);
    if (!btn) return { block: false, states: null };
    
    const table = btn.closest('table[id*="_excl"]');
    if (!table) return { block: false, states: null };

    // Zamezení odkliknutí: v tabulce _excl musí zůstat vždy jedna volba aktivní
    if (nextVal === false || nextVal === 0) return { block: true, states: null };

    let states = { ...Store.buttonStates };
    table.querySelectorAll('button[data-id]').forEach(b => {
        const sid = b.dataset.id;
        if (sid !== globalId && ButtonConfigs[sid]) {
            states[sid] = ButtonConfigs[sid].type === 'standard' ? 0 : false;
        }
    });
    
    return { block: false, states };
}

function cycleState(globalId, dir = 1) {
    const cfg = ButtonConfigs[globalId];
    if (!cfg || cfg.type !== 'standard') return;
    let cur = Store.buttonStates[globalId] || 0;
    if (cur === true) cur = 2;
    const next = Math.max(0, Math.min(cfg.states.length - 1, cur + dir));
    if (next === cur) return;

    const excl = getExclusiveStates(globalId, next);
    if (excl.block) return;
    
    Store.buttonStates = { ...(excl.states || Store.buttonStates), [globalId]: next };
    
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

    const excl = getExclusiveStates(globalId, next);
    if (excl.block) return;

    Store.buttonStates = { ...(excl.states || Store.buttonStates), [globalId]: next };
    if (next === 'custom') focusInput(globalId);
}

function toggleBasicCustom(globalId, activate = null) {
    const cur = Store.buttonStates[globalId] || false;
    const next = activate !== null ? activate : !cur;
    if (next === cur) return;

    const excl = getExclusiveStates(globalId, next);
    if (excl.block) return;

    Store.buttonStates = { ...(excl.states || Store.buttonStates), [globalId]: next };
    if (next) focusInput(globalId);
}

/* ═══════════════════════════════════════════════
   MODULARIZOVANÉ AKCE A EVENT LISTENERY
═══════════════════════════════════════════════ */

function createNewInstance(baseTableId) {
    const instId = Date.now().toString();
    const currentInstances = Store.instances || {};
    const tableInstances = currentInstances[baseTableId] || [];
    Store.instances = { ...currentInstances, [baseTableId]: [...tableInstances, instId] };
    
    const isLN = baseTableId.includes('lymphnode');
    const isHemo = baseTableId.includes('hemo');
    const regionId = baseTableId.split('_')[0];
    
    let pfx = 'l';
    if (isHemo) {
        pfx = 'bh';
    } else {
        const prefixMap = { brain: 'bl', thorax: isLN ? 'tln' : 'tl', abdomen: isLN ? 'aln' : 'al', neck: isLN ? 'ln' : 'l', skeleton: 'l', prostate: isLN ? 'prln' : 'pl', rectum: isLN ? 'rtln' : 'rt' };
        pfx = prefixMap[regionId] || (isLN ? 'ln' : 'l');
    }
    
    const p = `${pfx}_${instId}`;
    const defaultLesState = (regionId === 'skeleton' && !isLN) ? 1 : true;
    
    let kindSuffix = isLN ? 'uzl' : 'les';
    if (isHemo) kindSuffix = 'lez';
    
    Store.buttonStates = { 
        ...Store.buttonStates, 
        [`${Store.activeTab}_${regionId}_${p}_c_soli`]: true, 
        [`${Store.activeTab}_${regionId}_${p}_k_${kindSuffix}`]: defaultLesState 
    };
    
    return `${baseTableId}__${instId}`;
}

const ClipboardService = {
    formatReport: function(includeIndicationLabel = false) {
        const container = document.getElementById('report-container');
        if (!container) return "";
        let lines = [];
        const indication = (Store.indication || "").trim();

        if (indication && includeIndicationLabel) { 
            lines.push(`Indikace: ${indication}`); 
            lines.push(""); 
        }

        if (Store.pastDate) {
            const [y, m, d] = Store.pastDate.split('-');
            lines.push(`Srovnáno s vyšetřením z ${d}.${m}.${y}:`);
        }

        let currentLine = "";
        let currentLayout = "inline";
        const hasMultipleHeadings = Array.from(container.children).filter(el => el.classList.contains('report-heading')).length > 1;

        Array.from(container.children).forEach(el => {
            const text = ((el.dataset.label || '') + el.textContent).trim();
            if (el.classList.contains('report-exam-heading')) {
                if (currentLine) {
                    lines.push(currentLine.trim());
                    currentLine = "";
                }
                if (lines.length > 0 && lines[lines.length - 1] !== "") {
                    lines.push("");
                }
            } else if (el.classList.contains('report-heading')) {
                if (currentLine) { lines.push(currentLine.trim()); currentLine = ""; }
                if (text === 'OSTATNÍ:') {
                    currentLayout = 'block';
                    return; 
                }

                const regionId = el.dataset.region;
                currentLayout = (regionId && REGIONS[regionId] && REGIONS[regionId].reportLayout) ? REGIONS[regionId].reportLayout : 'inline';
                if (hasMultipleHeadings) {
                    currentLine = text.toUpperCase().replace(/:$/, '') + ":";
                } else {
                    currentLine = "";
                }
            } else if (el.classList.contains('report-frame') || el.classList.contains('report-frame-hidden')) {
                const cleanText = text.replace(/^- /, '');
                if (currentLayout === 'block' || el.classList.contains('report-frame-hidden') || text.startsWith('Neložisková')) {
                    if (currentLine) { lines.push(currentLine.trim()); currentLine = ""; }
                    lines.push(cleanText);
                } else {
                    currentLine = currentLine === "" ? cleanText : currentLine + " " + cleanText;
                }
            }
        });
        if (currentLine) lines.push(currentLine.trim());
        return lines.join('\n').replace(/  +/g, ' ').trim();
    },

    formatConclusion: function(includeIncidentalLabel = true) {
        const container = document.getElementById('conclusion-container');
        if (!container) return "";
        let mainParts = [], incidentalParts = [], state = "none";
        const seen = new Set();

        if (Store.pastDate) {
            const [y, m, d] = Store.pastDate.split('-');
            mainParts.push(`Oproti vyšetření z ${d}.${m}.${y}:`);
        }

        Array.from(container.children).forEach(el => {
            const txt = el.textContent.trim();
            if (txt === "Závěr:") { state = "main"; return; }
            if (txt === "Vedlejší nálezy:") { state = "incidental"; return; }
            if ((state === "main" || state === "incidental") && el.classList.contains('report-frame')) {
                if (seen.has(txt)) return;
                seen.add(txt);
                if (state === "main") mainParts.push(txt);
                else incidentalParts.push(txt);
            }
        });

        let out = mainParts.join('\n');
        if (incidentalParts.length > 0) out += "\n\n" + (includeIncidentalLabel ? "Vedlejší nálezy: " : "") + incidentalParts.join(' ');
        return out.trim();
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
        conclusion: ClipboardService.formatConclusion(true) || '',
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

function validateTextForSingleWords(text) {
    let warnings = [];
    let currentSection = "Neznámá sekce";
    
    const lines = text.split('\n');
    for (let line of lines) {
        line = line.trim();
        if (!line) continue;
        
        // Detekce hlavičky na začátku řádku (např. "HRUDNÍK:" nebo "HRUDNÍK A BŘICHO:")
        const headerMatch = line.match(/^([A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ ]+):/);
        if (headerMatch) {
            currentSection = headerMatch[1].trim();
        } else if (line === line.toUpperCase() && line.length > 2) {
            // Alternativa: Celý řádek je velkými písmeny (samostatná hlavička bez dvojtečky)
            currentSection = line.trim();
        }
        
        // Rozdělení textu na věty podle ukončovací interpunkce
        const sentences = line.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
        
        for (let sentence of sentences) {
            // Oříznutí hlavičky sekce, aby první věta (např. "HRUDNÍK: Ložisko") nezklamala validaci
            let cleanSentence = sentence.replace(/^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ ]+:\s*/, '').trim();
            
            // Nová podmínka: 1 velké písmeno a alespoň 3 další písmena (celkem min. 4 znaky)
            if (/^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ][A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽa-záčďéěíňóřšťúůýž]{3,}$/.test(cleanSentence)) {
                warnings.push({ word: cleanSentence + '.', section: currentSection });
            }
        }
    }
    return warnings;
}

function executeCopyFlow(textToCopy, target, isAll) {
    let warningMessages = validateTextForSingleWords(textToCopy).map(w => `Pozor, překontroluj ${w.word} v sekci ${w.section}, pravděpodobně nedostatečně určeno.`);
    
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
        const getExamTitle = (id) => {
            const exam = getExamById(id);
            if (!exam) return "";
            const sideConfig = APP_MANIFEST.examsWithSides[id];
            if (sideConfig) {
                const side = Store.fields[sideConfig.field];
                if (side === 'R') return `MR pravého ${sideConfig.label}`;
                if (side === 'L') return `MR levého ${sideConfig.label}`;
            }
            return exam.title;
        };

        let title = "";
        if (Store.exams.size >= 2) {
            title = Array.from(Store.exams).map(getExamTitle).filter(Boolean).join(', ');
        } else {
            title = getExamTitle(Store.activeTab) || "Lékařský nález";
        }
        
        const report = ClipboardService.formatReport(true);
        const conclusion = ClipboardService.formatConclusion(true);
        const incidentalMatch = conclusion.match(/\n\nVedlejší nálezy: (.*)/s);
        const mainConc = conclusion.replace(/\n\nVedlejší nálezy: .*/s, '');
        const incidental = incidentalMatch ? incidentalMatch[0].trim() : '';

        const combined = `${title}\n\n${report}\n\nZávěr:\n${mainConc}${incidental ? '\n\n' + incidental : ''}`.trim().replace(/\n{3,}/g, '\n\n');
        executeCopyFlow(combined, null, true);
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
        
        const petMatch = oldExam.title.match(/^([A-Z]+)(-PET \/ )([A-Z]+)(.*)$/);
        const tomoMatch = oldExam.title.match(/^(CT|MR)( )(.*)$/);
        
        let candidates = [];
        
        if (petMatch) {
            const currentPet = petMatch[1];
            const currentTomo = petMatch[3];
            const rest = petMatch[4];
            
            Object.values(EXAMS).flat().forEach(e => {
                const m = e.title.match(/^([A-Z]+)(-PET \/ )([A-Z]+)(.*)$/);
                if (m && m[4] === rest) {
                    if (part === 'pet' && m[3] === currentTomo) candidates.push(e.id);
                    if (part === 'tomo' && m[1] === currentPet) candidates.push(e.id);
                }
            });
        } else if (tomoMatch && !oldExam.title.includes('PET')) {
            const rest = tomoMatch[3];
            Object.values(EXAMS).flat().forEach(e => {
                const m = e.title.match(/^(CT|MR)( )(.*)$/);
                if (m && m[3] === rest && !e.title.includes('PET')) {
                    candidates.push(e.id);
                }
            });
        }
        
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

        const oldRadiofarm = Object.keys(RADIOFARM_CONFIG).find(key => oldId.toLowerCase().includes(key));
        const newRadiofarm = Object.keys(RADIOFARM_CONFIG).find(key => newId.toLowerCase().includes(key));
        if (oldRadiofarm !== newRadiofarm) window._currentRadiofarm = null;

        Store._silent = false;

        UI.render('exams');
    },
    'remove-instance': (target, dataset) => {
        const [baseTableId, instId] = dataset.id.split('__');
        if (Store.instances && Store.instances[baseTableId]) {
            const newInstances = { ...Store.instances, [baseTableId]: Store.instances[baseTableId].filter(i => i !== instId) };
            const filterObj = (obj) => Object.fromEntries(Object.entries(obj).filter(([k]) => !k.includes(`_${instId}`)));
            
            Store.instances = newInstances;
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
            const newInstances = {};
            const hasData = (instId) => {
                const check = (obj) => Object.keys(obj).some(k => k.includes(instId));
                return check(Store.buttonStates) || check(Store.customTexts) || check(Store.fields);
            };
            for (const [tableId, insts] of Object.entries(Store.instances || {})) {
                const validInsts = insts.filter(instId => hasData(instId));
                if (validInsts.length > 0) {
                    newInstances[tableId] = validInsts;
                }
            }
            Store.instances = newInstances;
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
