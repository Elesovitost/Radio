const RegionProstate = {
    title: 'Prostata a okolí',
    reportLayout: 'block',
    layout: (helpers) => {
        let layoutNodes = [];

        // --- 1. LÉZE PROSTATY ---
        const lesInsts = Store.instances?.['prostate_lesion_main'] || [];
        lesInsts.forEach((instId, idx) => {
            const p = `pl_${instId}`;

            // Wrapper pro SVG s vlastním stylem pro interaktivitu
            const svgId = `${p}_svg_wrap`;
            const svgWrapper = document.createElement('div');
            svgWrapper.id = svgId;
            svgWrapper.className = 'prostate-svg-lesion';
            svgWrapper.style.width = '100%';
            svgWrapper.style.textAlign = 'center';
            svgWrapper.style.minHeight = '150px';
            svgWrapper.style.position = 'relative';

            const style = document.createElement('style');
            style.innerHTML = `
                #${svgId} svg path[id] { cursor: pointer; transition: fill 0.2s; fill: transparent; }
                #${svgId} svg path[id]:hover { fill: rgba(255, 0, 0, 0.5) !important; }
            `;
            svgWrapper.appendChild(style);

            const setupSvgListeners = (svgEl) => {
                svgEl.style.maxHeight = '400px';
                svgEl.style.width = 'auto';
                
                svgEl.querySelectorAll('path[id]').forEach(path => {
                    const examId = Store.activeTab || 'default';
                    const stateId = `${examId}_prostate_${p}_loc_${path.id}`;
                    
                    if (Store.buttonStates[stateId]) {
                        path.style.fill = 'rgba(139, 0, 0, 0.8)';
                    } else {
                        path.style.fill = 'transparent';
                    }
                    
                    path.addEventListener('click', (e) => {
                        const currentState = Store.buttonStates[stateId];
                        const nextState = !currentState;
                        Store.buttonStates[stateId] = nextState;
                        const orderKey = `${examId}_prostate_${p}_loc_order`;
                        let order = Store.customTexts[orderKey] ? JSON.parse(Store.customTexts[orderKey]) : [];
                        if (nextState) {
                            if (!order.includes(path.id)) order.push(path.id);
                        } else {
                            order = order.filter(id => id !== path.id);
                        }
                        Store.customTexts[orderKey] = JSON.stringify(order);
                        e.target.style.fill = nextState ? 'rgba(139, 0, 0, 0.8)' : 'transparent';
                        UI.renderReport();
                    });
                    path.addEventListener('contextmenu', (e) => {
                        e.preventDefault();
                        Store.buttonStates[stateId] = false;
                        const orderKey = `${examId}_prostate_${p}_loc_order`;
                        let order = Store.customTexts[orderKey] ? JSON.parse(Store.customTexts[orderKey]) : [];
                        order = order.filter(id => id !== path.id);
                        Store.customTexts[orderKey] = JSON.stringify(order);
                        e.target.style.fill = 'transparent';
                        UI.renderReport();
                    });
                });
                return svgEl;
            };

            if (window.PROSTATE_SVG_PARSED) {
                const clonedSvg = window.PROSTATE_SVG_PARSED.cloneNode(true);
                svgWrapper.appendChild(setupSvgListeners(clonedSvg));
            } else {
                setTimeout(() => {
                    const wrap = document.getElementById(svgId);
                    if (wrap && wrap.children.length <= 1) { // 1 = vložený style element
                        window.PROSTATE_SVG_CACHE.then(txt => {
                            const tempDiv = document.createElement('div');
                            tempDiv.innerHTML = txt;
                            const svgEl = tempDiv.querySelector('svg');
                            
                            if (svgEl) {
                                window.PROSTATE_SVG_PARSED = svgEl.cloneNode(true);
                                wrap.appendChild(setupSvgListeners(svgEl));
                            }
                        }).catch(() => {
                            const err = document.createElement('span');
                            err.className = 'label';
                            err.textContent = 'SVG Organs_prostate_lesion.svg nelze načíst.';
                            wrap.appendChild(err);
                        });
                    }
                }, 0);
            }

            const locContainer = document.createElement('div');
            locContainer.className = 'table-wrapper';
            locContainer.style.width = '100%';
            locContainer.style.marginBottom = '10px';
            
            const locTitle = document.createElement('div');
            locTitle.className = 'sub-table-title';
            locTitle.textContent = 'Lokalizace (Kliknutím do mapy vyber segmenty)';
            locContainer.appendChild(locTitle);
            locContainer.appendChild(svgWrapper);

            layoutNodes.push(
                helpers.LesionMain(`prostate_lesion_main__${instId}`, `Léze prostaty (${idx + 1})`, [
                    helpers.Table1col(`${p}_r1_excl`, [ [ 'Počet:', { btn: `${p}_c_soli`, type: 'basic', text: 'solitární' }, { btn: `${p}_c_dve`, type: 'basic', text: 'dvě' }, { btn: `${p}_c_vice`, type: 'basic', text: 'vícečetné' }, { btn: `${p}_c_mnoho`, type: 'basic', text: 'mnohočetné' } ] ], 'prostate'),
                    helpers.Table1col(`${p}_r2_excl`, [ [ 'Druh:', { btn: `${p}_k_loz`, type: 'basic', text: 'ložisko'}, { btn: `${p}_k_nod`, type: 'basic', text: 'nodul' }, { btn: `${p}_k_inf`, type: 'basic', text: 'infiltrace' }, { btn: `${p}_k_cust`, states: ['vlastní', 'custom'] } ] ], 'prostate'),
                    locContainer,
                    helpers.Table1col(`${p}_r4`, [ [ 'Vzhled MR:', 
                        { btn: `${p}_t2`, states: ['T2', 'T2 score 1', 'T2 score 2', 'T2 score 3', 'T2 score 4'] }, 
                        { btn: `${p}_dwi`, states: ['DWI', 'DWI score 1', 'DWI score 2', 'DWI score 3', 'DWI score 4'] }, 
                        { btn: `${p}_ce`, states: ['kontrast', 'kontrast -', 'kontrast +'] }, 
                        { btn: `${p}_inv`, states: ['invaze', 'kapsula', 'váčky', 'orgán'] } 
                    ] ], 'prostate'),
                    LESIONS_DEFINITION.getLesionMetricsRow(helpers, `${p}_r5`, `${p}_met`),
                    helpers.Table1col(`${p}_r6`, [ [ 'Etiologie:', { btn: `${p}_pirads`, states: ['PI-RADS 0', 'PI-RADS 1', 'PI-RADS 2', 'PI-RADS 3', 'PI-RADS 4', 'PI-RADS 5'] } ] ], 'prostate')
                ])
            );
        });

        // --- 2. Prostata obecně ---
        layoutNodes.push(
            helpers.TableMain('prostate_prostata_main', 'Prostata obecně', [
                helpers.Table2colNormal('pr_pro_table', '', [
                    [ 'Velikost:', { field: 'size', id: 'pr_size', placeholder: 'mm' } ],
                    [ 'Hyperplazie:', { btn: 'pr_hyp', states: ['0', 'mírná', 'střední', 'pokročilá'] } ],
                    [ 'Operace:', { btn: 'pr_op', states: ['0', 'RAPE', 'TURP'] } ],
                    [ 'Recidiva:', { btn: 'pr_rec', states: ['0', 'sycení', 'akumulace', 'oboje'] } ],
                    [ 'Krvácení:', { btn: 'pr_hem', states: ['0', '+', '++'] } ]
                ], 'prostate'),
                helpers.Table1col('pr_pro_add', [
                    { field: 'text', id: 'pr_custom_desc', placeholder: 'vlastní popis...' },
                    { field: 'text', id: 'pr_custom_conc', placeholder: 'vlastní závěr...' }
                ], 'prostate')
            ])
        );

        // --- 3. Semenné váčky ---
        layoutNodes.push(
            helpers.TableMain('prostate_seminal_main', 'Semenné váčky', [
                helpers.Table2colNormal('pr_sem_table', '', [
                    [ 'Náplň:', { btn: 'pr_sem_fill', states: ['normální', 'snížená', 'není'] } ]
                ], 'prostate')
            ])
        );

        // --- 4. Lymfatické uzliny ---
        const lnInsts = Store.instances?.['prostate_lymphnode_main'] || [];
        lnInsts.forEach((instId, idx) => {
            const p = `prln_${instId}`;
            layoutNodes.push(
                helpers.LesionMain(`prostate_lymphnode_main__${instId}`, `Lymfadenopatie (${idx + 1})`, [
                    ...LESIONS_DEFINITION.getLymphNodeRowsPre(helpers, p),
                    helpers.Table3colRCL(`${p}_loc1`, 'Lokalizace', [
                        [ '', { btn: `${p}_p_hil_c`, type: 'basic', text: 'hilus' }, '' ], [ '', { btn: `${p}_p_por_c`, type: 'basic', text: 'portokaválně' }, '' ],
                        [ '', { btn: `${p}_p_cel_c`, type: 'basic', text: 'celiakálně' }, '' ], [ '', { btn: `${p}_p_per_c`, type: 'basic', text: 'perigastricky' }, '' ],
                        [ '', [ { btn: `${p}_p_mes_r`, type: 'basic', text: 'mesent.' }, { btn: `${p}_p_mes_l`, type: 'basic', text: 'mesent.' } ], '' ], [ '', { btn: `${p}_p_ret_c`, type: 'basic', text: 'retroperit.' }, '' ],
                        [ '', [ { btn: `${p}_p_par_r`, type: 'basic', text: 'para-Ao' }, { btn: `${p}_p_par_l`, type: 'basic', text: 'para-Ao' } ], '' ], [ { btn: `${p}_p_cia_r`, type: 'basic', text: 'AIC' }, '', { btn: `${p}_p_cia_l`, type: 'basic', text: 'AIC' } ],
                        [ { btn: `${p}_p_eia_r`, type: 'basic', text: 'AIE' }, '', { btn: `${p}_p_eia_l`, type: 'basic', text: 'AIE' } ], [ { btn: `${p}_p_iia_r`, type: 'basic', text: 'AII' }, '', { btn: `${p}_p_iia_l`, type: 'basic', text: 'AII' } ],
                        [ { btn: `${p}_p_obt_r`, type: 'basic', text: 'obturátor' }, '', { btn: `${p}_p_obt_l`, type: 'basic', text: 'obturátor' } ], [ '', [ { btn: `${p}_p_pre_r`, type: 'basic', text: 'presakr.' }, { btn: `${p}_p_pre_l`, type: 'basic', text: 'presakr.' } ], '' ],
                        [ '', [ { btn: `${p}_p_mez_r`, type: 'basic', text: 'mezorekt.' }, { btn: `${p}_p_mez_l`, type: 'basic', text: 'mezorekt.' } ], '' ], [ { btn: `${p}_p_ing_r`, type: 'basic', text: 'inguinálně' }, '', { btn: `${p}_p_ing_l`, type: 'basic', text: 'inguinálně' } ]
                    ]),
                    ...LESIONS_DEFINITION.getLymphNodeRowsPost(helpers, p, `${p}_met`, `${p}_e`)
                ])
            );
        });

        return layoutNodes;
    },
    compile: (ctx) => {
        let reportOut = [{ type: 'heading', text: 'Prostata a okolí:', action: 'open-region', regionId: 'prostate' }];
        let concMain = [];
        let concInc = [];

        const examId = ctx.examId || 'default';

        const lesInsts = Store.instances?.['prostate_lesion_main'] || [];
        let parsedLesions = [];
        let maxTLevel = 0;

        if (lesInsts.length > 0) {
            lesInsts.forEach((instId) => {
                const p = `pl_${instId}`;

                let locs = [];
                let isPZ = false;
                let isTZ = false;
                let isCZ = false;

                Object.keys(Store.buttonStates).forEach(k => {
                    if (k.startsWith(`${examId}_prostate_${p}_loc_`) && Store.buttonStates[k]) {
                        const pathId = k.replace(`${examId}_prostate_${p}_loc_`, '');
                        locs.push(pathId);
                        if (pathId.includes('PZ')) isPZ = true;
                        if (pathId.includes('TZ')) isTZ = true;
                        if (pathId.includes('AFS') || pathId.includes('CZ')) isCZ = true;
                    }
                });

                let locText = '';
                if (locs.length > 0) {
                    let parsedLocs = locs.map(loc => {
                        const parts = loc.split(/[-_]/);
                        if (parts.length >= 3) return { raw: loc, level: parts[0], side: parts[1], zone: parts.slice(2).join('-') };
                        if (parts.length === 2) return { raw: loc, level: parts[0], side: '', zone: parts[1] };
                        return { raw: loc, level: '', side: '', zone: loc };
                    });

                    let validFormat = true;
                    let levelData = new Map();

                    parsedLocs.forEach(p => {
                        let l = p.level.toUpperCase();
                        let lName = '';
                        if (l === 'BASE') lName = 'baze';
                        else if (l === 'MID') lName = 'střední etáže';
                        else if (l === 'APEX' || l === 'AP') lName = 'apexu';
                        else validFormat = false;

                        if (lName) {
                            if (!levelData.has(lName)) {
                                levelData.set(lName, { R: new Set(), L: new Set(), none: new Set(), sideOrder: [] });
                            }
                            let s = p.side.toUpperCase();
                            if (s === 'R') {
                                levelData.get(lName).R.add(p.zone);
                                if (!levelData.get(lName).sideOrder.includes('R')) levelData.get(lName).sideOrder.push('R');
                            } else if (s === 'L') {
                                levelData.get(lName).L.add(p.zone);
                                if (!levelData.get(lName).sideOrder.includes('L')) levelData.get(lName).sideOrder.push('L');
                            } else {
                                levelData.get(lName).none.add(p.zone);
                            }
                        }
                    });

                    if (validFormat && levelData.size > 0) {
                        let descGroups = new Map();

                        levelData.forEach((sides, lName) => {
                            let rArrRaw = Array.from(sides.R);
                            let lArrRaw = Array.from(sides.L);
                            let nArr = Array.from(sides.none);
                            
                            let rSorted = [...rArrRaw].sort().join(',');
                            let lSorted = [...lArrRaw].sort().join(',');
                            let isIdenticalBilateral = rSorted && lSorted && rSorted === lSorted;
                            
                            let rStr = rArrRaw.join(', ');
                            let lStr = lArrRaw.join(', ');
                            
                            let descParts = [];
                            
                            if (isIdenticalBilateral) {
                                let primaryStr = sides.sideOrder[0] === 'R' ? rStr : lStr;
                                descParts.push(`bilat. (${primaryStr})`);
                            } else {
                                sides.sideOrder.forEach(sName => {
                                    if (sName === 'R' && rStr) descParts.push(`vpravo (${rStr})`);
                                    if (sName === 'L' && lStr) descParts.push(`vlevo (${lStr})`);
                                });
                            }
                            
                            if (nArr.length > 0) {
                                descParts.push(`(${nArr.join(', ')})`);
                            }
                            
                            let levelDesc = descParts.join(' a ');

                            if (!descGroups.has(levelDesc)) descGroups.set(levelDesc, []);
                            descGroups.get(levelDesc).push(lName);
                        });

                        let finalParts = [];
                        descGroups.forEach((levelsArr, desc) => {
                            let levelStr = "";
                            if (levelsArr.length === 1) levelStr = `v úrovni ${levelsArr[0]}`;
                            else if (levelsArr.length === 2) levelStr = `v úrovni ${levelsArr[0]} a ${levelsArr[1]}`;
                            else if (levelsArr.length > 2) levelStr = `v úrovni ${levelsArr.slice(0, -1).join(', ')} a ${levelsArr[levelsArr.length - 1]}`;
                            
                            finalParts.push(`${levelStr} ${desc}`);
                        });

                        locText = finalParts.join(', ');
                    } else {
                        locText = `v segmentech ${locs.join(', ')}`;
                    }
                }

                const pocetIds = [`${p}_c_soli`, `${p}_c_dve`, `${p}_c_vice`, `${p}_c_mnoho`];
                let pocetRawId = pocetIds.find(id => ctx.isActive(id));
                let pocetText = pocetRawId ? ButtonConfigs[`${examId}_prostate_${pocetRawId}`].text : 'solitární';

                const druhIds = [`${p}_k_loz`, `${p}_k_nod`, `${p}_k_inf`, `${p}_k_cust`];
                let druhRawId = druhIds.find(id => ctx.isActive(id));
                let druhRaw = 'ložisko';
                if (druhRawId === `${p}_k_cust`) druhRaw = Store.customTexts[`${examId}_prostate_${p}_k_cust`] || 'ložisko';
                else if (druhRawId === `${p}_k_nod`) druhRaw = 'nodul';
                else if (druhRawId === `${p}_k_inf`) druhRaw = 'infiltrace';

                let druhObj = { rod: 'n', plural: druhRaw + 'a' };
                if (druhRaw === 'infiltrace') druhObj = { rod: 'f', plural: 'infiltrace' };
                if (druhRaw === 'nodul') druhObj = { rod: 'm', plural: 'noduly' };
                if (druhRaw === 'ložisko') druhObj = { rod: 'n', plural: 'ložiska' };

                let isPlural = pocetText !== 'solitární';
                let pocetSlovo = GRAMMAR_DICT.pocet[pocetText]?.[druhObj.rod] || pocetText;
                let druhSlovo = isPlural ? druhObj.plural : druhRaw;
                let baseText = pocetText === 'solitární' ? (druhSlovo.charAt(0).toUpperCase() + druhSlovo.slice(1)) : (`${pocetSlovo} ${druhSlovo}`.charAt(0).toUpperCase() + `${pocetSlovo} ${druhSlovo}`.slice(1));

                let t2 = ctx.text(`${p}_t2`);
                let dwi = ctx.text(`${p}_dwi`);
                let ce = ctx.text(`${p}_ce`);
                let inv = ctx.text(`${p}_inv`);

                if (inv === 'orgán') maxTLevel = Math.max(maxTLevel, 5);
                else if (inv === 'váčky') maxTLevel = Math.max(maxTLevel, 4);
                else if (inv === 'kapsula') maxTLevel = Math.max(maxTLevel, 3);
                else maxTLevel = Math.max(maxTLevel, 2);

                let vzhledy = [];
                let t2Score = 0, dwiScore = 0, cePos = false;

                if (t2 && t2.includes('score')) {
                    t2Score = parseInt(t2.replace('T2 score ', ''));
                    if (t2Score === 1) vzhledy.push('kulaté, ohraničené a homogenní v T2W');
                    if (t2Score === 2) vzhledy.push('dobře ohraničené homogenně nízké SI v T2W');
                    if (t2Score === 3) vzhledy.push('hůře ohraničené a heterogenní SI v T2W');
                    if (t2Score >= 4) vzhledy.push('neohraničené nehomogenně nízké SI v T2W');
                }
                
                if (dwi && dwi.includes('score')) {
                    dwiScore = parseInt(dwi.replace('DWI score ', ''));
                    if (dwiScore === 1) vzhledy.push('bez zvýšené SI na DWI a bez snížení SI na ADC');
                    if (dwiScore === 2) vzhledy.push('liniární / klínovité lehce vyšší SI na DWI a nižší na ADC');
                    if (dwiScore === 3) vzhledy.push('fokálně vyšší SI na DWI nebo nižší na ADC');
                    if (dwiScore >= 4) vzhledy.push('fokálně vysoké SI na DWI a nízké na ADC');
                }
                
                if (ce === 'kontrast +') {
                    cePos = true;
                    vzhledy.push('s časným postkontrastním sycením');
                } else if (ce === 'kontrast -') {
                    vzhledy.push('bez časného postkontrastního sycení');
                }

                let invTextRep = '';
                let invTextConc = '';
                let hasECE = false;
                if (inv === 'kapsula') { invTextRep = 's invazí přes kapsulu'; invTextConc = 's invazí přes kapsulu'; hasECE = true; }
                else if (inv === 'váčky') { invTextRep = 's infiltrací semenných váčků'; invTextConc = 's infiltrací semenných váčků'; hasECE = true; }
                else if (inv === 'orgán') { invTextRep = 's infiltrací okolních struktur'; invTextConc = 's infiltrací okolních struktur'; hasECE = true; }

                let d = LESIONS_DEFINITION.parseDetails(ctx, examId, 'prostate', p, `${p}_met`, null, false);
                let sizeMm = d.sizeMm || 0;

                const orderKey = `${examId}_prostate_${p}_loc_order`;
                let zone = 'unknown';
                let order = Store.customTexts[orderKey] ? JSON.parse(Store.customTexts[orderKey]) : [];
                order = order.filter(id => locs.includes(id));
                if (order.length > 0) {
                    const firstLoc = order[0];
                    if (firstLoc.includes('PZ')) zone = 'PZ';
                    else if (firstLoc.includes('TZ')) zone = 'TZ';
                    else if (firstLoc.includes('AFS') || firstLoc.includes('CZ')) zone = 'CZ';
                } else {
                    zone = isPZ ? 'PZ' : (isTZ ? 'TZ' : (isCZ ? 'CZ' : 'unknown'));
                }
                let big = (sizeMm >= 15) || hasECE;
                let pi = 0;

                let effDwi = (dwiScore === 4 && big) ? 5 : dwiScore;
                let effT2 = (t2Score === 4 && big) ? 5 : t2Score;

                if (zone === 'PZ' && effDwi > 0) {
                    if (effDwi <= 1) pi = 1;
                    else if (effDwi === 2) pi = 2;
                    else if (effDwi === 3) pi = cePos ? 4 : 3;
                    else pi = effDwi;
                } else if (zone === 'TZ' && effT2 > 0) {
                    if (effT2 <= 1) pi = 1;
                    else if (effT2 === 2) pi = (effDwi >= 4) ? 3 : 2;
                    else if (effT2 === 3) pi = (effDwi >= 4) ? 4 : 3;
                    else pi = effT2;
                } else if (isCZ && Math.max(effT2, effDwi) > 0) {
                    pi = Math.max(effT2, effDwi);
                }

                const globalBtnId = `${examId}_prostate_${p}_pirads`;
                
                if (Store.buttonStates[globalBtnId] !== pi) {
                    if (pi > 0 || zone !== 'unknown') {
                        Store.buttonStates[globalBtnId] = pi;
                        setTimeout(() => {
                            const btn = document.querySelector(`button[data-id="${globalBtnId}"]`);
                            if (btn && ButtonConfigs[globalBtnId]?.states) {
                                btn.querySelector('span').textContent = ButtonConfigs[globalBtnId].states[pi];
                                if (pi > 0) {
                                    btn.classList.add('modified');
                                } else {
                                    btn.classList.remove('modified');
                                }
                            }
                        }, 0);
                    }
                }

                let finalPirads = Store.buttonStates[globalBtnId] || pi;
                let piradsText = finalPirads > 0 ? `PI-RADS ${finalPirads}` : '';

                let partsRep = [];
                if (locText) partsRep.push(locText);
                if (vzhledy.length > 0) partsRep.push(vzhledy.join(', '));
                if (invTextRep) partsRep.push(invTextRep);

                let repT = `${baseText} ${partsRep.join(', ')}${d.metrikyStr}.`.replace(/, ,/g, ',').replace(/\s+/g, ' ').replace(' .', '.');
                
                let partsConc = [];
                if (piradsText) partsConc.push(piradsText);
                if (locText) partsConc.push(`- ${locText}`);
                if (d.actStr) partsConc.push(d.actStr.trim());
                if (invTextConc) partsConc.push(invTextConc);
                
                let concT = `${baseText} ${partsConc.join(' ')}.`.replace(/\s+/g, ' ');

                parsedLesions.push({ tableId: `prostate_lesion_main__${instId}`, repText: repT, concText: concT });
            });
        }

        if (parsedLesions.length === 0) {
            reportOut.push({ type: 'frame', text: 'Bez patrných ložisek abnormálního SI.', tableId: 'prostate_lesion_main', dimmed: true });
        } else {
            parsedLesions.forEach(les => {
                reportOut.push({ type: 'frame', text: les.repText, tableId: les.tableId });
                concMain.push({ type: 'frame', text: les.concText, tableId: les.tableId });
            });
        }

        let prostataText = [];
        let prOp = ctx.text('pr_op');
        let prRec = ctx.text('pr_rec');
        let prSize = ctx.field('pr_size');
        let prHyp = ctx.text('pr_hyp');
        let prHem = ctx.text('pr_hem');
        let prDesc = ctx.field('pr_custom_desc');
        let prConcRaw = ctx.field('pr_custom_conc');

        if (prOp === 'RAPE') {
            prostataText.push('St.p. RAPE.');
            if (prRec === 'sycení') {
                prostataText.push('V lůžku prostaty ložisko s časným sycením.');
                concMain.push({ type: 'frame', text: 'St.p. RAPE. v.s. recidiva v lůžku prostaty.', tableId: 'prostate_prostata_main' });
            } else if (prRec === 'akumulace') {
                prostataText.push('V lůžku prostaty ložisko se zvýšenou akumulací RF.');
                concMain.push({ type: 'frame', text: 'St.p. RAPE. v.s. recidiva v lůžku prostaty.', tableId: 'prostate_prostata_main' });
            } else if (prRec === 'oboje') {
                prostataText.push('V lůžku prostaty ložisko s časným sycením a zvýšenou akumulací RF.');
                concMain.push({ type: 'frame', text: 'St.p. RAPE. v.s. recidiva v lůžku prostaty.', tableId: 'prostate_prostata_main' });
            } else {
                prostataText.push('Bez recidivy v lůžku.');
                concMain.push({ type: 'frame', text: 'St.p. RAPE. Bez známek recidivy v lůžku prostaty.', tableId: 'prostate_prostata_main' });
            }
            if (prDesc) prostataText.push(prDesc);
            
            reportOut.push({ type: 'frame', text: prostataText.join(' '), tableId: 'prostate_prostata_main', dimmed: (!prRec || prRec === '0') && !prDesc });
        } else {
            if (prOp === 'TURP') {
                prostataText.push('St.p. TURP.');
            }
            
            if (prSize) {
                let volStr = '';
                let dims = prSize.split('x').map(d => parseInt(d, 10));
                if (dims.length === 3 && !dims.some(isNaN)) {
                    let vol = Math.round((dims[0] * dims[1] * dims[2]) / 2000);
                    volStr = `, což je orientačně ${vol} ml`;
                }
                prostataText.push(`Prostata velikosti cca ${prSize} mm${volStr}.`);
            } else {
                if (!prOp || prOp === '0') prostataText.push(`Prostata nezvětšena.`);
            }

            if (prHyp === 'mírná') {
                prostataText.push('Mírné zbytnění nodulárně prostavěné přechodové zóny.');
            } else if (prHyp === 'střední') {
                prostataText.push('Zbytnění nodulárně prostavěné přechodové zóny a mírný útlak periferní zóny.');
            } else if (prHyp === 'pokročilá') {
                prostataText.push('Pokročilé zbytnění nodulárně prostavěné přechodové zóny s útlakem periferní zóny.');
                concMain.push({ type: 'frame', text: 'Pokročilá nodulární hyperplazie.', tableId: 'prostate_prostata_main' });
            }

            if (prHem === '+') prostataText.push('Obsahuje okrsek T1+ po zakrvácení (biopsii).');
            else if (prHem === '++') prostataText.push('Obsahuje okrsky T1+ po zakrvácení (biopsii).');

            if (prDesc) prostataText.push(prDesc);

            reportOut.push({ type: 'frame', text: prostataText.join(' '), tableId: 'prostate_prostata_main', dimmed: !prSize && !prHem && !prDesc && (!prOp || prOp === '0') && (!prHyp || prHyp === '0') });
        }

        if (prConcRaw) {
            let prConcClean = prConcRaw.replace(/\u200B/g, '').trim();
            if (prConcClean) {
                let formattedConc = prConcClean.charAt(0).toUpperCase() + prConcClean.slice(1);
                if (!formattedConc.endsWith('.')) {
                    formattedConc += '.';
                }
                concMain.push({ type: 'frame', text: formattedConc, tableId: 'prostate_prostata_main' });
            }
        }

        let semFill = ctx.text('pr_sem_fill');
        if (semFill === 'snížená') {
            reportOut.push({ type: 'frame', text: 'Chabá náplň semenných váčků, jejich hodnotitelnost je limitována.', tableId: 'abdomen_seminal_main' });
        } else if (semFill === 'není') {
            reportOut.push({ type: 'frame', text: 'Není náplň semenných váčků, nejsou hodnotitelné.', tableId: 'abdomen_seminal_main' });
        } else {
            reportOut.push({ type: 'frame', text: 'Normální náplň semenných váčků.', tableId: 'abdomen_seminal_main', dimmed: true });
        }

        const isPETExam = examId.toLowerCase().includes('pet');
        const lnInsts = Store.instances?.['prostate_lymphnode_main'] || [];
        let regionalPositive = false;
        let nonRegionalPositive = false;

        if (lnInsts.length === 0) {
            reportOut.push({ type: 'frame', text: isPETExam ? 'Bez patrné hyperakumulující lymfadenopatie.' : 'Nejsou zřetelné patologické regionální či non-regionální lymfatické uzliny.', tableId: 'prostate_lymphnode_main', dimmed: true });
        } else {
            lnInsts.forEach(instId => {
                const p = `prln_${instId}`;

                let isThisNodePositive = false;
                ['m', 'meta'].forEach(btn => {
                    if (ctx.isActive(`${p}_e_${btn}`)) {
                        let val = ctx.text(`${p}_e_${btn}`);
                        if (val.endsWith('!') || val.endsWith('+') || val.endsWith('?')) isThisNodePositive = true;
                    }
                });

                let lokaceLN = [];
                
                if (ctx.isActive(`${p}_p_hil_c`)) lokaceLN.push('v jaterním hilu');
                if (ctx.isActive(`${p}_p_por_c`)) lokaceLN.push('portokaválně');
                if (ctx.isActive(`${p}_p_cel_c`)) lokaceLN.push('celiakálně');
                if (ctx.isActive(`${p}_p_per_c`)) lokaceLN.push('perigastricky');
                if (ctx.isActive(`${p}_p_ret_c`)) lokaceLN.push('retroperitoneálně');

                const noBilatNodes = [
                    { id: 'mes', name: 'mesenteriálně' },
                    { id: 'par', name: 'paraaortálně' },
                    { id: 'pre', name: 'presakrálně' },
                    { id: 'mez', name: 'mezorektálně' }
                ];

                noBilatNodes.forEach(reg => {
                    let r = ctx.isActive(`${p}_p_${reg.id}_r`);
                    let l = ctx.isActive(`${p}_p_${reg.id}_l`);
                    if (r && l) lokaceLN.push(`${reg.name}`);
                    else if (r) lokaceLN.push(`${reg.name} vpravo`);
                    else if (l) lokaceLN.push(`${reg.name} vlevo`);
                });

                const bilatNodes = [
                    { id: 'cia', name: 'podél AIC' },
                    { id: 'eia', name: 'podél AIE' },
                    { id: 'iia', name: 'podél AII' },
                    { id: 'obt', name: 'v obturátorové jámě' },
                    { id: 'ing', name: 'inguinálně' }
                ];

                bilatNodes.forEach(reg => {
                    let r = ctx.isActive(`${p}_p_${reg.id}_r`);
                    let l = ctx.isActive(`${p}_p_${reg.id}_l`);
                    if (r && l) lokaceLN.push(`${reg.name} bilat.`);
                    else if (r) lokaceLN.push(`${reg.name} vpravo`);
                    else if (l) lokaceLN.push(`${reg.name} vlevo`);
                });

                if (isThisNodePositive) {
                    const m1aIds = ['hil_c', 'por_c', 'cel_c', 'per_c', 'ret_c', 'mes_r', 'mes_l', 'par_r', 'par_l', 'cia_r', 'cia_l', 'ing_r', 'ing_l'];
                    const n1Ids = ['eia_r', 'eia_l', 'iia_r', 'iia_l', 'obt_r', 'obt_l', 'pre_r', 'pre_l', 'mez_r', 'mez_l'];
                    
                    let hasM1aLoc = m1aIds.some(loc => ctx.isActive(`${p}_p_${loc}`));
                    let hasN1Loc = n1Ids.some(loc => ctx.isActive(`${p}_p_${loc}`));
                    
                    if (hasM1aLoc) nonRegionalPositive = true;
                    if (hasN1Loc || (!hasM1aLoc && !hasN1Loc)) regionalPositive = true;
                }

                let lokTextLN = lokaceLN.length > 0 ? formatCzechList(lokaceLN) : '';
                let dLN = LESIONS_DEFINITION.parseDetails(ctx, examId, 'prostate', p, `${p}_met`, `${p}_e`, true);

                if (dLN.hasAny || lokaceLN.length > 0) {
                    let repSentence = `${dLN.baseText}${dLN.doplneniStr} ${lokTextLN}${dLN.vzhledText}${dLN.metrikyStr}.`.replace(/\s+/g, ' ').replace(' .', '.');
                    reportOut.push({ type: 'frame', text: repSentence, tableId: `prostate_lymphnode_main__${instId}` });
                    
                    let concSentence = `${dLN.baseText}${dLN.doplneniStr} ${lokTextLN}${dLN.actStr}${dLN.dynStr}`;
                    if (dLN.etioStr) concSentence += `: ${dLN.etioStr}.`;
                    else concSentence += `.`;
                    
                    concSentence = concSentence.replace(/\s+/g, ' ').replace(' : ', ': ').replace(' .', '.');
                    concMain.push({ type: 'frame', text: concSentence, tableId: `prostate_lymphnode_main__${instId}` });
                }
            });
        }

        if (prOp !== 'RAPE' && lesInsts.length > 0) {
            let maxPirads = 0;
            lesInsts.forEach((instId) => {
                const p = `pl_${instId}`;
                const globalBtnId = `${examId}_prostate_${p}_pirads`;
                const pi = Store.buttonStates[globalBtnId] || 0;
                maxPirads = Math.max(maxPirads, pi);
            });

            if (maxPirads >= 3 || regionalPositive || nonRegionalPositive) {
                let tStageStr = 'Tx';
                if (maxTLevel === 5) tStageStr = 'T4';
                else if (maxTLevel === 4) tStageStr = 'T3b';
                else if (maxTLevel === 3) tStageStr = 'T3a';
                else if (maxTLevel === 2) tStageStr = 'T2';

                let nStageStr = regionalPositive ? 'N1' : 'N0';
                let tnmPrefix = examId.toLowerCase().includes('psma') ? 'mi' : 'c';

                let tnmParts = [`${tnmPrefix}${tStageStr}`, `${tnmPrefix}${nStageStr}`];
                if (nonRegionalPositive) tnmParts.push(`${tnmPrefix}M1a`);

                concMain.push({ type: 'frame', text: `${tnmPrefix}TNM: ${tnmParts.join(', ')}.`, tableId: 'prostate_prostata_main' });
            }
        }

        return { report: reportOut, conclusion: { main: concMain, incidental: concInc } };
    }
};


// Globální keš pro SVG prostaty, aby se nestahovalo při každém otevření znovu
window.PROSTATE_SVG_CACHE = window.PROSTATE_SVG_CACHE || fetch('Organs_prostate_lesion.svg').then(r => r.text());