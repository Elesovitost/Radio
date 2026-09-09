/* =============================================================
   ui.js
   Module extracted from index.html inline <script>.
   Edit this file - NOT index.html - to change this part.
   ============================================================= */

/* ═══════════════════════════════════════════════
   UI CONTROLLER
═══════════════════════════════════════════════ */
const UI = {
    openPreview(text, targetEl = null, isAll = false) {
        Store.previewTarget = targetEl;
        Store.previewTargetOrigText = targetEl ? targetEl.textContent : '';
        Store.previewIsAll = isAll;
        
        const modal = document.getElementById('preview-modal');
        const backdrop = document.getElementById('preview-backdrop');
        const textarea = document.getElementById('preview-textarea');
        
        textarea.value = text;
        modal.style.display = 'flex';
        backdrop.style.display = 'block';
        
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(textarea.value.length, textarea.value.length);
        }, 50);
    },

    updatePastDateVisibility(hasDate) {
        document.body.classList.toggle('has-past-date', !!hasDate);
    },

    updateSliceViewer(viewerKey, sliceIndex) {
        const img = document.getElementById('slice-image');
        if (img && viewerKey && SLICE_VIEWERS[viewerKey]) {
            const cfg = SLICE_VIEWERS[viewerKey];
            img.src = `${cfg.folder}/${cfg.prefix}-${String(sliceIndex).padStart(2, '0')}.${cfg.ext}`;
        }
    },
    updateSvgHighlighting(activeRegions) {
        const svgContainer = document.getElementById('organ-svg-container');
        if (!svgContainer) return;
        
        const allOrgans = svgContainer.querySelectorAll('svg [id]');
        allOrgans.forEach(organ => {
            const organDef = ORGAN_MAP[organ.id];
            if (organDef && organDef.regions) {
                // Dimming logika
                const isMatch = organDef.regions.some(r => activeRegions.includes(r));
                organ.classList.toggle('organ-dimmed', !isMatch);
            } else {
                organ.classList.add('organ-dimmed');
            }
        });
    },

    // Seskupený seznam kategorií: pro každou aktivní část těla nadpis - klikatelný -
    // a pod ním položky, které k ní patří. Kliknutí na nadpis otevře všechny tabulky
    // regionu, kliknutí na položku danou tabulku.
    buildOrganCategoryNav(activeRegions) {
        const WB_REGIONS = ['brain', 'neck', 'thorax', 'abdomen', 'skeleton'];
        const DEDICATED = ['prostate', 'rectum', 'shoulder', 'knee', 'ankle'];

        // Celotělové schéma (hlava/krk/hrudník/břicho/skeleton) vs. dedikovaná mapa regionu
        const wbActive = WB_REGIONS.filter(r => activeRegions.includes(r));
        const dedicatedActive = DEDICATED.filter(r => activeRegions.includes(r));
        const ordered = wbActive.length
            ? [...wbActive, ...activeRegions.filter(r => !WB_REGIONS.includes(r))]
            : dedicatedActive;

        const groups = ordered
            .map(r => ({ id: r, title: (REGIONS[r] && REGIONS[r].title) || r, items: [] }));

        const usedTables = new Set();
        for (const group of groups) {
            const isWbGroup = WB_REGIONS.includes(group.id);
            for (const organId of Object.keys(ORGAN_MAP)) {
                const def = ORGAN_MAP[organId];
                if (!def.regions || !def.regions.includes(group.id)) continue;
                // Na dedikované mapě (prostata, rektum, rameno, koleno, hlezno) se zobrazí
                // jen položky náležející výhradně tomuto regionu – obecné (břišní) duplicity přeskoč
                if (!wbActive.length && def.regions.length > 1) continue;
                // Na celotělovém schématu položku přiřaď do první aktivní skupiny
                if (wbActive.length) {
                    const primary = groups.find(g => def.regions.includes(g.id));
                    if (primary !== group) continue;
                }
                let table = def.table;
                if (!table) continue;
                if (def.resolveTable) table = def.resolveTable([group.id]);
                if (!table) continue;
                // Léze / lymfadenopatie / krvácení se otevírají popupem na SVG – nepatří sem
                if (table.includes('_lesion_main') || table.includes('_lymphnode_main') || table.includes('_hemo')) continue;
                if (usedTables.has(table)) continue;
                usedTables.add(table);
                group.items.push({ name: def.name, table });
            }
        }

        const visibleGroups = groups.filter(g => g.items.length > 0);
        if (visibleGroups.length === 0) return null;

        const nav = el('div', { className: 'organ-nav' });
        visibleGroups.forEach((group, idx) => {
            const head = el('button', {
                className: 'organ-nav-region',
                'data-action': 'open-region',
                'data-region': group.id,
                textContent: group.title,
                title: `Zobrazit všechny tabulky (${group.title})`
            });
            if (idx > 0) head.style.marginTop = '8px';
            nav.appendChild(head);
            group.items.forEach(({ name, table }) => {
                nav.appendChild(el('button', {
                    className: 'organ-nav-item',
                    'data-action': 'open-table',
                    'data-table': table,
                    textContent: name,
                    title: `Otevřít tabulku: ${name}`
                }));
            });
        });
        return nav;
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

    renderDetails() {
        const tabsContainer = document.getElementById('exam-tabs-container');
        const content = document.getElementById('details-content');
        
        if (!tabsContainer || !content) return;

        if (!Store.activeTab || !Store.exams.has(Store.activeTab)) {
            Store.activeTab = Store.exams.size > 0 ? Array.from(Store.exams)[0] : null;
        }

        this.updateReferencesVisibility();

        tabsContainer.replaceChildren();
        if (Store.exams.size === 0) {
            content.replaceChildren();
            this.updateBackground(['none']);
            return;
        }

        for (const examId of Store.exams) {
            const exam = getExamById(examId);
            if (!exam) continue;
            const tabEl = el('div', {
                className: `exam-tab${Store.activeTab === examId ? ' active' : ''}`,
                'data-action': 'select-tab',
                'data-payload': examId
            });
            
            const tabTitleWrapper = el('div', { style: 'display: flex; align-items: center; gap: 3px;' });
            
            const sideConfig = APP_MANIFEST.examsWithSides[examId];
            if (sideConfig) {
                const side = Store.fields[sideConfig.field];
                const sideText = side === 'R' ? 'pravého' : (side === 'L' ? 'levého' : 'P / L');
                const btnSide = el('button', {
                    className: 'btn btn-side-toggle',
                    textContent: sideText,
                    'data-action': 'cycle-side',
                    'data-payload': sideConfig.field
                });
                tabTitleWrapper.appendChild(el('span', { textContent: 'MR' }));
                tabTitleWrapper.appendChild(btnSide);
                tabTitleWrapper.appendChild(el('span', { textContent: sideConfig.label }));
            } else {
                const petMatch = exam.title.match(/^([A-Z]+)(-PET \/ )([A-Z]+)(.*)$/);
                const tomoMatch = exam.title.match(/^(CT|MR)( )(.*)$/);
                
                if (petMatch) {
                    const currentPet = petMatch[1];
                    const currentTomo = petMatch[3];
                    const separator = petMatch[2].replace('-', '').trim();
                    const rest = petMatch[4].trim();
                    
                    let petCandidates = 0;
                    let tomoCandidates = 0;
                    
                    Object.values(EXAMS).flat().forEach(e => {
                        const m = e.title.match(/^([A-Z]+)(-PET \/ )([A-Z]+)(.*)$/);
                        if (m && m[4] === petMatch[4]) {
                            if (m[3] === currentTomo) petCandidates++;
                            if (m[1] === currentPet) tomoCandidates++;
                        }
                    });
                    
                    if (petCandidates > 1) {
                        tabTitleWrapper.appendChild(el('button', {
                            className: 'btn btn-side-toggle',
                            textContent: currentPet,
                            title: 'Změnit radiofarmakum',
                            'data-action': 'cycle-exam-part',
                            'data-part': 'pet',
                            'data-payload': examId
                        }));
                    } else {
                        tabTitleWrapper.appendChild(el('span', { textContent: currentPet }));
                    }
                    
                    tabTitleWrapper.appendChild(el('span', { textContent: separator }));
                    
                    if (tomoCandidates > 1) {
                        tabTitleWrapper.appendChild(el('button', {
                            className: 'btn btn-side-toggle',
                            textContent: currentTomo,
                            title: 'Změnit modalitu (CT/MR)',
                            'data-action': 'cycle-exam-part',
                            'data-part': 'tomo',
                            'data-payload': examId
                        }));
                    } else {
                        tabTitleWrapper.appendChild(el('span', { textContent: currentTomo }));
                    }
                    
                    tabTitleWrapper.appendChild(el('span', { textContent: rest }));
                } else if (tomoMatch && !exam.title.includes('PET')) {
                    const currentModality = tomoMatch[1];
                    const rest = tomoMatch[3].trim();
                    
                    let candidates = 0;
                    Object.values(EXAMS).flat().forEach(e => {
                        const m = e.title.match(/^(CT|MR)( )(.*)$/);
                        if (m && m[3] === tomoMatch[3] && !e.title.includes('PET')) {
                            candidates++;
                        }
                    });
                    
                    if (candidates > 1) {
                        tabTitleWrapper.appendChild(el('button', {
                            className: 'btn btn-side-toggle',
                            textContent: currentModality,
                            title: 'Změnit modalitu (CT/MR)',
                            'data-action': 'cycle-exam-part',
                            'data-part': 'modality',
                            'data-payload': examId
                        }));
                    } else {
                        tabTitleWrapper.appendChild(el('span', { textContent: currentModality }));
                    }
                    tabTitleWrapper.appendChild(el('span', { textContent: rest }));
                } else {
                    tabTitleWrapper.appendChild(el('span', { textContent: exam.title }));
                }
            }
            
            tabEl.appendChild(tabTitleWrapper);
            tabEl.appendChild(el('span', { className: 'exam-tab-close', textContent: '×', 'data-action': 'remove-exam', 'data-payload': examId }));
            tabsContainer.appendChild(tabEl);
        }

        const indicationInput = el('input', {
            className: 'input',
            style: 'flex: 1 1 auto; min-width: 100px; font-weight: normal; margin-left: auto;',
            value: Store.indication || '',
            'data-action': 'update-indication',
            placeholder: 'Indikace'
        });

        const demoWrapper = el('div', { className: 'row', style: 'margin-left: 8px; flex-shrink: 0;' });
        const genderBtn = el('button', {
            className: 'btn',
            style: 'min-width: 25px; padding: 2px; font-size: 14px; font-weight: bold;',
            textContent: Store.patientGender || '⚥',
            title: 'Pohlaví (⚥ / ♂ / ♀)',
            'data-action': 'cycle-gender'
        });
        const ageInput = el('input', {
            className: 'input field_age',
            style: 'width: 40px; text-align: center;',
            value: Store.patientAge || '',
            'data-action': 'update-age',
            placeholder: 'Věk'
        });
        demoWrapper.appendChild(genderBtn);
        demoWrapper.appendChild(ageInput);
        
        const idWrapper = el('div', { className: 'row', style: 'margin-left: 8px; flex-shrink: 0;' });
        const idBtn = el('button', {
            className: 'btn',
            style: 'min-width: 30px; padding: 2px 2px;',
            textContent: 'ID',
            title: 'Nastavit ID pacienta pro uložení do historie',
            'data-action': 'toggle-id-input'
        });
        const idInput = el('input', {
            className: 'input',
            id: 'report-id-input',
            style: `width: 100px; display: ${Store.reportId ? 'block' : 'none'};`,
            value: Store.reportId || '',
            'data-action': 'update-report-id',
            placeholder: 'ID vyšetření'
        });
        idWrapper.appendChild(idBtn);
        idWrapper.appendChild(idInput);

        tabsContainer.appendChild(indicationInput);
        tabsContainer.appendChild(demoWrapper);
        tabsContainer.appendChild(idWrapper);

        content.replaceChildren();

        const activeExam = getExamById(Store.activeTab);
        if (!activeExam) return;

        const activeRegions = activeExam.regs;
        
        let activeRegionConfig = null;
        for (const reg of activeRegions) {
            if (APP_MANIFEST.regions[reg]) {
                activeRegionConfig = APP_MANIFEST.regions[reg];
                break;
            }
        }
        
        const hasWBSvg = activeRegions.some(r => ['brain', 'neck', 'thorax', 'abdomen'].includes(r));
        const usesSvg = activeRegionConfig !== null || hasWBSvg;

        const sideConfig = APP_MANIFEST.examsWithSides[Store.activeTab];
        const requiresSide = sideConfig !== undefined;
        const selectedSide = requiresSide ? Store.fields[sideConfig.field] : null;

        if (usesSvg) {
            /* ═════════ ZASTAVENÍ VYKRESLENÍ DO VÝBĚRU STRANY ═════════ */
            if (requiresSide && !selectedSide && activeRegionConfig) {
                const wrapper = el('div', { className: 'organ-wrapper', style: 'justify-content: center; align-items: center; width: 100%; min-height: 200px;' });
                const msg = `Zvol stranu ${sideConfig.label} (P/L) v tlačítku záložky nahoře.`;
                
                wrapper.appendChild(el('div', { className: 'label', style: 'font-size: 14px; text-align: center;', textContent: msg }));
                content.appendChild(wrapper);
                this.updateBackground(['none']);
                return;
            }

            const wrapper = el('div', { className: 'organ-wrapper' });
            // Vpravo: plocha se schématem + overlay tabulek; vlevo: navigace kategorií
            const body = el('div', { className: 'organ-body' });
            const svgContainer = el('div', { className: 'organ-svg', id: 'organ-svg-container' });
            body.appendChild(svgContainer);

            // Klikatelný seznam kategorií vlevo od SVG (všechna vyšetření se schématem)
            if (usesSvg) {
                const nav = this.buildOrganCategoryNav(activeRegions);
                if (nav) {
                    wrapper.classList.add('has-organ-nav');
                    wrapper.appendChild(nav);
                }
            }

            const overlay = el('div', { id: 'table-overlay-container' });
            body.appendChild(overlay);
            wrapper.appendChild(body);

            if (!document.getElementById('organ-tooltip')) {
                document.body.appendChild(el('div', { id: 'organ-tooltip' }));
            }

            content.appendChild(wrapper);

            const svgFile = activeRegionConfig ? activeRegionConfig.svgFile : 'Organs_schematic_WB.svg';
            const svgHeight = activeRegionConfig ? activeRegionConfig.svgHeight : '70vh';
            const svgMode = activeRegionConfig ? activeRegionConfig.svgMode : 'normal';

            Promise.all([fetch(svgFile).then(r => r.text()).then(text => ({ file: svgFile, text }))])
                .then(results => {
                    const container = document.getElementById('organ-svg-container');
                    if (container) {
                        container.replaceChildren(); 
                        
                        container.className = 'organ-svg';
                        if (svgMode === 'multi-mirrored') container.classList.add('multi-svg');
                        
                        if ((svgMode === 'mirrored' || svgMode === 'multi-mirrored') && selectedSide === 'L') {
                            container.classList.add('svg-mirrored');
                        }

                        results.forEach((item, index) => {
                            const parser = new DOMParser();
                            const svgDoc = parser.parseFromString(item.text, "image/svg+xml");
                            const svgEl = svgDoc.documentElement;
                            
                            const scopeId = `svg-scope-${index}`;
                            svgEl.id = scopeId;
                            svgEl.style.maxHeight = svgHeight;

                            svgEl.querySelectorAll('style').forEach(style => {
                                style.textContent = style.textContent.replace(/(^|\})([^{]+)(\{)/g, (match, pre, selector, brace) => {
                                    const scoped = selector.split(',').map(s => {
                                        const t = s.trim();
                                        return (!t || t.startsWith('@')) ? s : `#${scopeId} ${t}`;
                                    }).join(', ');
                                    return `${pre}${scoped} ${brace}`;
                                });
                            });

                            container.appendChild(svgEl);
                        });
                        
                        this.updateSvgHighlighting(activeRegions);
                    }
                })
                .catch(err => console.warn('SVG načtení selhalo, ověřte web server.', err));

            this.renderActiveTable();
            this.updateBackground(['none']);
        } else {
            for (const regionId of activeRegions) {
                const region = REGIONS[regionId];
                if (!region) continue;
                content.appendChild(el('div', { className: 'region-header', textContent: region.title }));
                const layoutNodes = this.generateLayoutNodes(regionId, region);
                layoutNodes.forEach(node => content.appendChild(node));
            }
            this.updateBackground(activeRegions);
        }
    },

    generateLayoutNodes(regionId, region) {
        const handleArgs = (fn, id, arg2, arg3) => {
            if (typeof arg2 === 'string') {
                const wrap = el('div', { className: 'table-wrapper', id: id });
                const titleEl = el('div', { className: 'sub-table-title', textContent: arg2 });
                if (fn === TableGrid) {
                    titleEl.style.textAlign = 'left';
                    titleEl.style.paddingLeft = '4px';
                }
                wrap.appendChild(titleEl);
                wrap.appendChild(fn(id + '_tbl', arg3, regionId));
                return wrap;
            }
            return fn(id, arg2, regionId);
        };

        const helpers = {
            LesionMain:         (id, title, rowsContent) => LesionMain(id, title, rowsContent),
            TableMain:          (id, title, contents) => TableMain(id, title, contents),
            Table3colRL:        (id, arg2, arg3) => handleArgs(Table3colRL, id, arg2, arg3),
            Table3colRCL:       (id, arg2, arg3) => handleArgs(Table3colRCL, id, arg2, arg3),
            Table2colNormal:    (id, arg2, arg3) => handleArgs(Table2colNormal, id, arg2, arg3),
            Table2rowNormal:    (id, arg2, arg3) => handleArgs(Table2rowNormal, id, arg2, arg3),
            Table1col: (id, arg2, arg3) => {
                if (typeof arg2 === 'string') {
                    const wrap = el('div', { className: 'table-wrapper', id: id });
                    wrap.appendChild(el('div', { className: 'sub-table-title', textContent: arg2 }));
                    wrap.appendChild(Table1col(id + '_tbl', arg3, regionId, {}));
                    return wrap;
                }
                const opts = (arg3 && typeof arg3 === 'object' && !Array.isArray(arg3)) ? arg3 : {};
                return Table1col(id, arg2, regionId, opts);
            },
            TableGrid:          (id, arg2, arg3) => handleArgs(TableGrid, id, arg2, arg3)
        };
        return region.layout(helpers);
    },

    renderActiveTable() {
        const overlay = document.getElementById('table-overlay-container');
        const svgContainer = document.getElementById('organ-svg-container');
        if (!overlay || !svgContainer) return;

        const existingViewer = document.getElementById('standalone-slice-viewer');
        const viewerExisted = !!existingViewer; // Uložíme si info, zda už tu viewer byl
        if (existingViewer) existingViewer.remove();

        if (!Store.activeTable) {
            overlay.classList.remove('active');
            overlay.replaceChildren();
            svgContainer.classList.remove('dimmed');
            return;
        }

        svgContainer.classList.add('dimmed');
        overlay.classList.add('active');
        overlay.replaceChildren();

        const activeExam = getExamById(Store.activeTab);
        if (!activeExam) return;

        if (Store.activeTable.startsWith('region:') || Store.activeTable.startsWith('group:')) {
            const isGroup = Store.activeTable.startsWith('group:');
            const targetIds = isGroup ? Store.activeTable.substring(6).split(',') : [];
            const rId = isGroup ? null : Store.activeTable.substring(7);
            
            let foundAny = false;
            const regionsToSearch = isGroup ? Object.keys(REGIONS) : [rId];
            
            regionsToSearch.forEach(regionId => {
                const region = REGIONS[regionId];
                if (region) {
                    const layoutNodes = this.generateLayoutNodes(regionId, region);
                    layoutNodes.forEach(n => {
                        if (isGroup) {
                            if (targetIds.includes(n.id)) {
                                overlay.appendChild(n);
                                foundAny = true;
                            }
                        } else {
                            if (n.id && !n.id.includes('lesion') && !n.id.includes('lymphnode') && !n.id.includes('hemo')) {
                                overlay.appendChild(n);
                                foundAny = true;
                            }
                        }
                    });
                }
            });

            if (!foundAny) {
                overlay.appendChild(el('div', { textContent: 'Tabulky nenalezeny.', className: 'label' }));
            } else {
                requestAnimationFrame(() => {
                    const columns = {};
                    // Rozřazení tabulek do sloupců podle jejich reálné X souřadnice
                    Array.from(overlay.children).forEach(child => {
                        const x = child.offsetLeft;
                        if (!columns[x]) columns[x] = [];
                        columns[x].push(child);
                    });
                    
                    // Nalezení maxima a sjednocení šířky pro každý sloupec
                    Object.values(columns).forEach(col => {
                        const maxWidth = Math.max(...col.map(el => el.offsetWidth));
                        col.forEach(el => {
                            el.style.width = `${maxWidth}px`;
                        });
                    });
                });
            }
            return;
        }

        let tableNode = null;

        for (const regionId of Object.keys(REGIONS)) {
            const region = REGIONS[regionId];
            if (!region) continue;
            const layoutNodes = this.generateLayoutNodes(regionId, region);
            const found = layoutNodes.find(n => n.id === Store.activeTable);
            if (found) {
                tableNode = found;
                break;
            }
        }

        if (tableNode) {
            overlay.appendChild(tableNode);
            const baseTableId = Store.activeTable ? Store.activeTable.split('__')[0] : null;
            
            if (baseTableId && SLICE_VIEWERS[baseTableId]) {
                if (!viewerExisted || Store.activeViewerKey !== baseTableId) {
                    Store.activeViewerKey = baseTableId;
                    Store.activeSlice = 1;
                }
                
                const viewer = createImageViewer(baseTableId);
                if (viewer) {
                    viewer.id = 'standalone-slice-viewer';
                    overlay.parentElement.appendChild(viewer); 
                    
                    requestAnimationFrame(() => {
                        viewer.style.left = `${overlay.offsetLeft + overlay.offsetWidth + 15}px`;
                        viewer.style.top = `${overlay.offsetTop}px`;
                    });
                }
            }
        } else {
            overlay.appendChild(el('div', { textContent: 'Tabulka nenalezena nebo neobsahuje cílová data.', className: 'label' }));
        }
    },

    updateBackground(activeRegions) {
        const panel = document.getElementById('details-panel');
        if (activeRegions.includes('none')) {
            panel.dataset.bg = 'none';
            return;
        }
        let bgType = 'none';
        if (activeRegions.includes('thorax') || activeRegions.includes('abdomen')) bgType = 'wb';
        else if (activeRegions.includes('neck')) bgType = 'neck';
        panel.dataset.bg = bgType;
    },

    renderReport() {
        let reportBlocks = [];
        let mainConclusionBlocks = [];
        let incidentalBlocks = [];
        
        const multipleExams = Store.exams.size > 1;

        for (const examId of Store.exams) {
            const exam = getExamById(examId);
            if (!exam) continue;

            const isPETExam = examId.toLowerCase().includes('pet'); // Zjištění, zda jde o PET

            let examRepBlocks = [];
            let examConcMainBlocks = [];
            let examConcIncBlocks = [];

            let officialRegions = new Set(exam.regs);
            let regionsToCompile = new Set(exam.regs);

            Object.keys(REGIONS).forEach(rId => {
                const prefix = `${examId}_${rId}_`;
                const hasActiveState = Object.keys(Store.buttonStates).some(k => k.startsWith(prefix) && Store.buttonStates[k]);
                const hasActiveField = Object.keys(Store.fields).some(k => k.startsWith(prefix) && Store.fields[k] !== '');
                const hasActiveCustom = Object.keys(Store.customTexts).some(k => k.startsWith(prefix) && Store.customTexts[k] !== '');
                
                if (hasActiveState || hasActiveField || hasActiveCustom) {
                    regionsToCompile.add(rId);
                }
            });

            for (const regionId of regionsToCompile) {
                const region = REGIONS[regionId];
                if (!region || !region.compile) continue;
                const ctx = createContext(regionId, examId);
                const compiled = region.compile(ctx);
                
                // --- SANITIZACE TEXTU PODLE MODALITY ---
                const sanitizeText = (txt, isConclusion = false) => {
                    if (typeof txt !== 'string') return txt;
                    
                    let out = txt;
                    
                    if (isPETExam) {
                        if (isConclusion && examId.toLowerCase().includes('fdg')) {
                            out = out.replace(/akumulací\s+RF/gi, 'metabolickou aktivitou')
                                     .replace(/akumulace\s+RF/gi, 'metabolické aktivity');
                        }
                    } else {
                        out = out.replace(/\s*s[e]?\s+(nízkou|intermediární|zvýšenou|vysokou)\s+(akumulací\s+RF|aktivitou)/gi, '')
                                 .replace(/\s*bez\s+(?:(?:nízké|intermediární|zvýšené|vysoké)\s+)?(akumulace\s+RF|aktivity)/gi, '');
                    }

                    if (!APP_SETTINGS.optText) {
                        return out;
                    }
                    
                    const gramatikaHyper = (slovo) => {
                        const s = slovo.toLowerCase();
                        let rod = 'n';
                        let isPlural = false;
                        let found = false;

                        for (const [key, val] of Object.entries(GRAMMAR_DICT.druh)) {
                            const singularLast = key.split(' ').pop();
                            const pluralLast = val.plural.split(' ').pop();

                            if (s === key || s === singularLast) {
                                rod = val.rod;
                                isPlural = false;
                                found = true;
                                break;
                            } else if (s === val.plural || s === pluralLast) {
                                rod = val.rod;
                                isPlural = true;
                                found = true;
                                break;
                            }
                        }

                        if (!found) {
                            if (s.match(/a$/)) { rod = 'f'; isPlural = false; }
                            else if (s.match(/y$/) || s === 'léze') { rod = 'f'; isPlural = true; }
                            else if (s.match(/l$/)) { rod = 'm'; isPlural = false; }
                        }

                        if (rod === 'm') return isPlural ? 'hypermetabolické' : 'hypermetabolický';
                        if (rod === 'f') return isPlural ? 'hypermetabolické' : 'hypermetabolická';
                        return isPlural ? 'hypermetabolická' : 'hypermetabolické';
                    };

                    const aktivityPravidla = [
                        { find: /\s*s nízkou metabolickou aktivitou/i, prefix: 'nízce metabolicky aktivní' },
                        { find: /\s*s intermediární metabolickou aktivitou/i, prefix: 'středně metabolicky aktivní' },
                        { find: /\s*se zvýšenou metabolickou aktivitou/i, prefix: 'zvýšeně metabolicky aktivní' },
                        { find: /\s*s vysokou metabolickou aktivitou/i, prefix: '', dynamicky: true }
                    ];

                    const metaRegex = /\s*:\s*charakteru metastázy/i;

                    out = out.split(/\.\s+(?=[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ])/).map(veta => {
                        let upravena = veta;
                        let maMetu = metaRegex.test(upravena);
                        let nalezenaAkt = aktivityPravidla.find(p => p.find.test(upravena));

                        if (nalezenaAkt) upravena = upravena.replace(nalezenaAkt.find, '');
                        if (maMetu) upravena = upravena.replace(metaRegex, '');

                        if (maMetu || nalezenaAkt) {
                            const regexSubjekt = /^(.*?)(ložisk[oa]|expanze|infiltrace|defekt[y]?|kolekce|uzlin[ay]|paket[y]?|nodul[y]?|cyst[ay]|léze)(.*)/i;
                            const match = upravena.match(regexSubjekt);

                            if (match) {
                                let pred = match[1];
                                let subjekt = match[2];
                                let zbytek = match[3];

                                let vkladanyText = '';
                                if (nalezenaAkt) {
                                    vkladanyText += nalezenaAkt.dynamicky ? gramatikaHyper(subjekt) + ' ' : nalezenaAkt.prefix + ' ';
                                }
                                if (maMetu) {
                                    vkladanyText += 'meta ';
                                }

                                if (pred.trim() === '') {
                                    vkladanyText = vkladanyText.charAt(0).toUpperCase() + vkladanyText.slice(1);
                                    subjekt = subjekt.toLowerCase();
                                }

                                upravena = pred + vkladanyText + subjekt + zbytek;
                            } else {
                                let vkladanyText = '';
                                if (nalezenaAkt) {
                                    vkladanyText += nalezenaAkt.dynamicky ? 'hypermetabolické ' : nalezenaAkt.prefix + ' ';
                                }
                                if (maMetu) {
                                    vkladanyText += 'meta ';
                                }
                                vkladanyText = vkladanyText.charAt(0).toUpperCase() + vkladanyText.slice(1);
                                upravena = vkladanyText + upravena.charAt(0).toLowerCase() + upravena.slice(1);
                            }
                        }

                        upravena = upravena.replace(/^([A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ])([^:.]+?):\s*charakteru tumoru([^.]*)/, (m, f, mid, rest) => {
                            return "Tumorózní " + f.toLowerCase() + mid + rest;
                        });

                        return upravena;
                    }).join('. ');
                    
                    return out.replace(/\s+/g, ' ').replace(/\s\./g, '.');
                };

                if (compiled.report) {
                    let mappedReport = compiled.report.map(b => {
                        let text = sanitizeText(b.text, false);
                        if (!officialRegions.has(regionId) && b.type === 'heading') {
                            text = text.replace(':', ' (v zachyceném rozsahu):');
                        }
                        return { ...b, text, examId };
                    });
                    examRepBlocks.push(...mappedReport);
                }
                
                if (compiled.conclusion) {
                    const sanitizeBlocks = (blocks) => blocks.map(b => ({ ...b, text: sanitizeText(b.text, true), examId }));
                    
                    if (compiled.conclusion.main) {
                        examConcMainBlocks.push(...sanitizeBlocks(compiled.conclusion.main));
                    }
                    if (compiled.conclusion.incidental) {
                        examConcIncBlocks.push(...sanitizeBlocks(compiled.conclusion.incidental));
                    }
                }
            }

            const eIdLower = examId.toLowerCase();
            const isFdg = eIdLower.includes('fdg');
            const isPsma = eIdLower.includes('psma');
            const isDotatoc = eIdLower.includes('dotatoc');
            const isDopa = eIdLower.includes('dopa');
            const isFmm = eIdLower.includes('fmm');

            if (isFmm) {
                const akumIdx = Store.buttonStates[`${examId}_fmm_akum`] || 0;
                const akum = FMM_AKUM_TEXTS[akumIdx] || FMM_AKUM_TEXTS[0];
                examRepBlocks.unshift({ type: 'frame', text: akum.report, tableId: null, examId, dimmed: akumIdx === 0 });
                examConcMainBlocks.unshift({ type: 'frame', text: akum.conc, tableId: null, examId, dimmed: akumIdx === 0 });
            }

            if (isFdg || isPsma || isDotatoc || isDopa) {
                // 1. Detekce přes tlačítka: Hledá stav aktivity >= 3 (zvýšená, vysoká)
                const hasHighActivity = Object.keys(Store.buttonStates).some(k => 
                    k.startsWith(examId) && k.endsWith('_act') && Store.buttonStates[k] >= 3
                );


                // 3. Detekce patologie v závěru (meta, tumor atd.)
                const concText = [...examConcMainBlocks, ...examConcIncBlocks].map(b => b.text).join(' ').toLowerCase();
                const hasConcKeywords = /\bmeta\b/.test(concText) || 
                                        concText.includes('tumor') || 
                                        concText.includes('maligní');

                // Vložení negativního textu, pokud není žádný z indikátorů patologie pozitivní
                if (!(hasHighActivity && hasConcKeywords)) {
                    let autoText = '';
                    if (isFdg) autoText = "Bez známek přítomnosti FDG-avidní neoplázie.";
                    else if (isPsma) autoText = "Bez známek přítomnosti ložisek zvýšené exprese PSMA.";
                    else if (isDotatoc) autoText = "Bez známek přítomnosti ložisek se zvýšeným nakupením somatostatinových receptorů.";
                    else if (isDopa) autoText = "Bez známek přítomnosti ložisek se zvýšenou konzumpcí aminokyseliny.";
                    
                    if (autoText) {
                        examConcMainBlocks.unshift({ type: 'frame', text: autoText, tableId: null, examId });
                    }
                }
            }

            /* ═════════ FYZIOLOGICKÁ DISTRIBUCE PRO PET ═════════ */
            const examIdForPhysio = examId.toLowerCase();
            let physioText = '';
            
            if (examIdForPhysio.includes('trup')) {
                if (examIdForPhysio.includes('fdg')) {
                    physioText = "Neložisková akumulace radiofarmaka ve svalech, v gastrointestinálním traktu a urotraktu je přítomna na podkladě fyziologických procesů či jako zcela nespecifický nález. Akumulace RF vztažena k referenčnímu zdravému parenchymu jater.";
                } else if (examIdForPhysio.includes('psma')) {
                    physioText = "Neložisková akumulace radiofarmaka ve slinných a slzných žlazách, v jaterním parenchymu, slezině, v gastrointestinální traktu a urotraktu je přítomna na podkladě fyziologických procesů či jako zcela nespecifický nález. Akumulace RF vztažena k referenčnímu zdravému parenchymu jater a event. parotid.";
                } else if (examIdForPhysio.includes('dotatoc')) {
                    physioText = "Neložisková akumulace radiofarmaka v hypofýze, štítné žláze, nadledvinách a urotraktu je přítomna na podkladě fyziologických procesů či jako zcela nespecifický nález. Akumulace RF vztažena k referenčnímu zdravému parenchymu jater a event. sleziny.";
                } else if (examIdForPhysio.includes('dopa')) {
                    physioText = "Neložisková akumulace radiofarmaka v BG bilat., játrech a urotraktu je přítomna na podkladě fyziologických procesů či jako zcela nespecifický nález. k referenčnímu zdravému parenchymu jater.";
                }
            }

            let prefixes = [];

            if (Store.buttonStates[`${examId}_skeleton_sk_soft_fat`]) {
                prefixes.push("Zvýšená akumulace RF v oblasti metabolicky aktivního tuku krku a trupu symetricky bilat.");
            }

            const pR = Store.buttonStates[`${examId}_skeleton_sk_soft_parav_r`] === 1;
            const pL = Store.buttonStates[`${examId}_skeleton_sk_soft_parav_l`] === 1;
            
            if (pR || pL) {
                let sideStr = pR && pL ? "PHK a LHK" : (pR ? "PHK" : "LHK");
                prefixes.push(`Zvýšená akumulace RF v průběhu lymfatik ${sideStr} na podkladě parciální paravazace RF při aplikaci.`);
            }

            if (Store.buttonStates[`${examId}_skeleton_sk_soft_dif`]) {
                prefixes.push("Difuzně vysoká akumulace RF v kosterním svalstvu při zátěži po aplikaci či nedodrženém lačnění.");
            }

            if (prefixes.length > 0) {
                physioText = prefixes.join(' ') + (physioText ? ' ' + physioText : '');
            }

            if (physioText) {
                examRepBlocks.push({ type: 'heading-gray', text: 'OSTATNÍ:' });
                examRepBlocks.push({ type: 'frame', text: physioText, tableId: null, examId, dimmed: true });
            }
            /* ════════════════════════════════════════════════ */

            if (multipleExams) {
                if (examRepBlocks.length > 0) reportBlocks.push({ type: 'exam-heading', text: exam.title });
                if (examConcMainBlocks.length > 0) examConcMainBlocks.unshift({ type: 'exam-heading', text: exam.title });
                if (examConcIncBlocks.length > 0) examConcIncBlocks.unshift({ type: 'exam-heading', text: exam.title });
            }

            reportBlocks.push(...examRepBlocks);
            mainConclusionBlocks.push(...examConcMainBlocks);
            incidentalBlocks.push(...examConcIncBlocks);
        }

        const buildNodes = (blocks, { prefixNove = false } = {}) => {
            return blocks.map(b => {
                if (b.type === 'heading' || b.type === 'heading-gray') {
                    const node = el('div', { className: b.type === 'heading-gray' ? 'report-heading heading-gray' : 'report-heading', textContent: b.text });
                    if (b.action) {
                        node.dataset.action = b.action;
                        if (b.regionId) node.dataset.region = b.regionId;
                        if (b.examId) node.dataset.exam = b.examId;
                    }
                    return node;
                }
                if (b.type === 'exam-heading') {
                    return el('div', { className: 'report-exam-heading', textContent: b.text });
                }
                if (b.type === 'frame') {
                    let cleanText = b.text || '';
                    if (prefixNove && /(?:,\s*nově|\(\s*nově\s*\))/.test(cleanText)) {
                        cleanText = cleanText.replace(/(?:,\s*nově|\(\s*nově\s*\))/g, '');
                        cleanText = cleanText.replace(/\s+/g, ' ').trim();
                        if (cleanText) {
                            cleanText = 'Nově ' + cleanText.charAt(0).toLowerCase() + cleanText.slice(1);
                        }
                    }
                    cleanText = cleanText
                        .replace(/bilat\.\./gi, 'bilat.')
                        .replace(/\s+\./g, '.')
                        .replace(/,\s*\./g, '.')
                        .replace(/\.{2,}/g, '.');

                    const classes = ['report-frame'];
                    const autoDimText = cleanText.trim();
                    if (b.dimmed || autoDimText === "Osa přímá." || autoDimText === "Přiměřená bederní lordóza.") classes.push('text-dim');
                    if (b.hidden) classes.push('report-frame-hidden');
                    if (b.tableId && (b.tableId.includes('lesion') || b.tableId.includes('hemo'))) classes.push('frame-lesion');
                    if (b.tableId && b.tableId.includes('lymphnode')) classes.push('frame-lymphnode');

                    const organLabel = (cleanText.match(/^(- [^:\n]+:)/) || [])[1];
                    const node = el('div', { className: classes.join(' '), textContent: organLabel ? cleanText.slice(organLabel.length) : cleanText });
                    if (organLabel) node.dataset.label = organLabel;
                    if (b.tableId) {
                        node.dataset.action = 'open-table';
                        node.dataset.table = b.tableId;
                        if (b.examId) node.dataset.exam = b.examId;
                    }
                    return node;
                }
                return document.createTextNode('');
            });
        };

        const repContainer = document.getElementById('report-container');
        repContainer.className = 'content-area report-content';
        repContainer.replaceChildren(...buildNodes(reportBlocks));
        
        const concContainer = document.getElementById('conclusion-container');
        concContainer.className = 'content-area report-content';
        let concNodes = [];
        if (mainConclusionBlocks.length > 0) {
            concNodes.push(el('div', { className: 'report-heading', textContent: 'Závěr:' }));
            concNodes.push(...buildNodes(mainConclusionBlocks, { prefixNove: true }));
        }
        if (incidentalBlocks.length > 0) {
            concNodes.push(el('div', { className: 'report-heading', textContent: 'Vedlejší nálezy:' }));
            concNodes.push(...buildNodes(incidentalBlocks, { prefixNove: true }));
        }
        concContainer.replaceChildren(...concNodes);
        appendLlmImpressionSection(concContainer);
    }
};
