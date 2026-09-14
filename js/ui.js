/* =============================================================
   ui.js
   Module extracted from index.html inline <script>.
   Edit this file - NOT index.html - to change this part.
   ============================================================= */

/* ═══════════════════════════════════════════════
   UI CONTROLLER
═══════════════════════════════════════════════ */
const UI = {

    updatePastDateVisibility(hasDate) {
        document.body.classList.toggle('has-past-date', !!hasDate);
    },

    updateReferencesVisibility() {
        const activeExamId = (Store.activeTab || '').toLowerCase();
        
        document.body.classList.toggle('is-non-pet', !activeExamId.includes('pet'));
        document.body.classList.toggle('hide-ct', activeExamId.includes('mr'));
        document.body.classList.toggle('hide-mr', activeExamId.includes('ct'));
        
        document.querySelectorAll('.ref-group').forEach(el => el.style.display = 'none');

        if (!activeExamId.includes('pet')) return;

        const configKey = Object.keys(RADIOFARM_CONFIG).find(key => activeExamId.includes(key)) || 'fdg';
        const config = RADIOFARM_CONFIG[configKey];
        const isNewConfig = window._currentRadiofarm !== configKey;

        const setField = (id, defVal) => {
            const inp = document.querySelector(`input[data-id="${id}"]`);
            if (inp) {
                if (isNewConfig || !inp.dataset.edited || ['3.0', '7.0', '15.0', '20.0', '2.0'].includes(inp.value)) {
                    inp.value = defVal;
                    Store.fields[id] = defVal;
                    delete inp.dataset.edited;
                }
            }
        };

        config.showGroups.forEach(groupName => {
            const el = document.querySelector(`.ref-group[data-ref="${groupName}"]`);
            if (el) el.style.display = '';
        });

        if (config.showGroups.includes('jatra')) {
            setField('suv_jater', config.defaultSuvJater);
        }
        
        Object.entries(config.defaults).forEach(([id, val]) => setField(id, val));
        
        window._currentRadiofarm = configKey;
        this.syncFmmAkumButton();
    },

    syncFmmAkumButton() {
        const slot = document.getElementById('fmm-akum-btn-slot');
        if (!slot) return;
        const examId = Store.activeTab || '';
        if (!examId.toLowerCase().includes('fmm')) {
            slot.replaceChildren();
            return;
        }
        const globalId = `${examId}_fmm_akum`;
        ButtonConfigs[globalId] = { type: 'standard', states: FMM_AKUM_STATES };
        const idx = Store.buttonStates[globalId] || 0;
        let btn = slot.querySelector('button');
        if (!btn || btn.dataset.id !== globalId) {
            btn = el('button', {
                className: 'btn btn-state',
                'data-action': 'cycle-state',
                'data-id': globalId,
                'data-longest': '++',
                style: 'min-width: 0;'
            }, [el('span')]);
            slot.replaceChildren(btn);
        }
        btn.classList.toggle('modified', idx > 0);
        btn.setAttribute('aria-pressed', String(idx > 0));
        const span = btn.querySelector('span');
        if (span) span.textContent = FMM_AKUM_STATES[idx] || '-';
    },

    render(prop) {
        if (prop === 'exams') {
            this.renderExams();
            this.renderDetails();
        } else if (prop === 'buttonStates' || prop === 'expandedNotes') {
            if (document.getElementById('organ-svg-container')) {
                this.renderActiveTable();
            } else {
                this.renderDetails();
            }
        }
        this.renderReport();
        this.syncFmmAkumButton();
    },

    renderExams() {
        const container = document.getElementById('exams-container');
        container.replaceChildren();
        for (const [cat, list] of Object.entries(EXAMS)) {
            const active = list.filter(e => Store.exams.has(e.id));
            container.appendChild(el('div', { className: 'dropdown' }, [
                el('button', {
                    className: `btn${active.length ? ' selected' : ''}`,
                    textContent: cat
                }),
                el('div', { className: 'dropdown-menu' }, list.map(exam =>
                    el('button', {
                        className: `btn${Store.exams.has(exam.id) ? ' selected' : ''}`,
                        textContent: exam.title,
                        'data-action': 'toggle-exam',
                        'data-payload': exam.id
                    })
                ))
            ]));
        }
    },
};

