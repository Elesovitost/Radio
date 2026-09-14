/* =============================================================
   ui-details.js
   Metody objektu UI přesunuté z js/ui.js (načítá se po něm).
   ============================================================= */
Object.assign(UI, {

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
        
        const hasWBSvg = activeRegions.some(r => ['brain', 'neck', 'thorax', 'abdomen', 'skeleton', 'soft'].includes(r));
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
            TableMain:          (id, title, contents, opts) => TableMain(id, title, contents, opts || {}),
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
        const existingShowBtn = document.getElementById('slice-viewer-show-btn');
        const viewerExisted = !!existingViewer || !!existingShowBtn;
        if (existingViewer) existingViewer.remove();
        if (existingShowBtn) existingShowBtn.remove();

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
            if (tableNode.classList?.contains('tbl-main-collapsed')) {
                tableNode.classList.remove('tbl-main-collapsed');
            }
            const baseTableId = Store.activeTable ? Store.activeTable.split('__')[0] : null;
            
            if (baseTableId && SLICE_VIEWERS[baseTableId]) {
                if (!viewerExisted || Store.activeViewerKey !== baseTableId) {
                    Store.activeViewerKey = baseTableId;
                    Store.activeSlice = 1;
                }
                this.mountSliceViewer(overlay, baseTableId);
            }
        } else {
            overlay.appendChild(el('div', { textContent: 'Tabulka nenalezena nebo neobsahuje cílová data.', className: 'label' }));
        }
    },

    /** Umístí viewer / očičko vedle tabulky v rámci organ-body; šířka podle zbývajícího místa. */
    mountSliceViewer(overlay, baseTableId) {
        document.getElementById('standalone-slice-viewer')?.remove();
        document.getElementById('slice-viewer-show-btn')?.remove();

        const host = overlay?.parentElement;
        if (!overlay || !host || !baseTableId || !SLICE_VIEWERS[baseTableId]) return;

        const placeBesideOverlay = (node, gap = 15, fitWidth = false) => {
            node.style.left = `${overlay.offsetLeft + overlay.offsetWidth + gap}px`;
            node.style.top = `${overlay.offsetTop}px`;
            if (!fitWidth) return;

            const preferred = parseInt(node.querySelector('#slice-image')?.dataset.preferredWidth, 10) || 450;
            const available = Math.max(80, host.clientWidth - (overlay.offsetLeft + overlay.offsetWidth + gap) - 8);
            const width = Math.min(preferred, available);
            node.style.width = `${width}px`;
            node.style.maxWidth = `${available}px`;
        };

        if (Store.sliceViewerHidden) {
            const showBtn = createSliceViewerShowBtn();
            host.appendChild(showBtn);
            requestAnimationFrame(() => placeBesideOverlay(showBtn, 8, false));
            return;
        }

        const viewer = createImageViewer(baseTableId);
        if (!viewer) return;
        viewer.id = 'standalone-slice-viewer';
        host.appendChild(viewer);
        requestAnimationFrame(() => placeBesideOverlay(viewer, 15, true));
    },

    /** Jen přepne referenční obrázek / tlačítko oka — nepřekresluje otevřenou tabulku. */
    refreshSliceViewer() {
        const overlay = document.getElementById('table-overlay-container');
        if (!overlay || !Store.activeTable) {
            document.getElementById('standalone-slice-viewer')?.remove();
            document.getElementById('slice-viewer-show-btn')?.remove();
            return;
        }
        const baseTableId = Store.activeTable.split('__')[0];
        this.mountSliceViewer(overlay, baseTableId);
    },

    updateSliceViewer(viewerKey, sliceIndex) {
        const img = document.getElementById('slice-image');
        if (img && viewerKey && SLICE_VIEWERS[viewerKey]) {
            const cfg = SLICE_VIEWERS[viewerKey];
            img.src = `${cfg.folder}/${cfg.prefix}-${String(sliceIndex).padStart(2, '0')}.${cfg.ext}`;
        }
    },
});
