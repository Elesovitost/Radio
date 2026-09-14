const RegionSkeleton = {
    title: 'Skeleton',
        layout: (helpers) => {
            let layoutNodes = [];

            const traumaRowsFn = (pfx) => [
                [ '', { btn: `${pfx}_c_obr`, states: ['C obratel', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'více', 'custom'] }, '' ],
                [ { btn: `${pfx}_klav_r`, type: 'basic', text: 'Klavikula' }, { btn: `${pfx}_sternum`, type: 'basic', text: 'Sternum' }, { btn: `${pfx}_klav_l`, type: 'basic', text: 'Klavikula' } ],
                [ { btn: `${pfx}_scap_r`, type: 'basic', text: 'Scapula' }, '', { btn: `${pfx}_scap_l`, type: 'basic', text: 'Scapula' } ],
                [ { btn: `${pfx}_hum_r`, type: 'basic', text: 'Humerus' }, '', { btn: `${pfx}_hum_l`, type: 'basic', text: 'Humerus' } ],
                [ '', { btn: `${pfx}_t_obr`, states: ['T obratel', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12', 'více', 'custom'] }, '' ],
                [ { btn: `${pfx}_zeb_r`, states: ['žebro', '1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.', 'více', 'custom'] }, '', { btn: `${pfx}_zeb_l`, states: ['žebro', '1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.', 'více', 'custom'] } ],
                [ '', { btn: `${pfx}_l_obr`, states: ['L obratel', 'L1', 'L2', 'L3', 'L4', 'L5', 'více', 'custom'] }, '' ],
                [ '', { btn: `${pfx}_sakrum`, type: 'basic', text: 'Sakrum' }, '' ],
                [ { btn: `${pfx}_kyc_r`, type: 'basic', text: 'Kyčelní k.' }, '', { btn: `${pfx}_kyc_l`, type: 'basic', text: 'Kyčelní k.' } ],
                [ { btn: `${pfx}_sed_r`, type: 'basic', text: 'Sedací k.' }, '', { btn: `${pfx}_sed_l`, type: 'basic', text: 'Sedací k.' } ],
                [ { btn: `${pfx}_styd_r`, type: 'basic', text: 'Stydká kost' }, '', { btn: `${pfx}_styd_l`, type: 'basic', text: 'Stydká kost' } ],
                [ { btn: `${pfx}_fem_r`, type: 'basic', text: 'Femur' }, '', { btn: `${pfx}_fem_l`, type: 'basic', text: 'Femur' } ]
            ];

            const degInfRowsFn = (pfx) => [
                [ '', { btn: `${pfx}_c_pat`, type: 'basic', text: 'C páteř' }, '' ],
                [ { btn: `${pfx}_ac_r`, type: 'basic', text: 'AC' }, '', { btn: `${pfx}_ac_l`, type: 'basic', text: 'AC' } ],
                [ { btn: `${pfx}_ram_r`, type: 'basic', text: 'Rameno' }, '', { btn: `${pfx}_ram_l`, type: 'basic', text: 'Rameno' } ],
                [ '', { btn: `${pfx}_t_pat`, type: 'basic', text: 'T páteř' }, '' ],
                [ '', { btn: `${pfx}_l_pat`, type: 'basic', text: 'L páteř' }, '' ],
                [ { btn: `${pfx}_si_r`, type: 'basic', text: 'SI' }, '', { btn: `${pfx}_si_l`, type: 'basic', text: 'SI' } ],
                [ { btn: `${pfx}_kyc_r`, type: 'basic', text: 'Kyčel' }, '', { btn: `${pfx}_kyc_l`, type: 'basic', text: 'Kyčel' } ]
            ];

            const lesInsts = Store.instances?.['skeleton_lesion_main'] || [];
            lesInsts.forEach((instId, idx) => {
                const p = `l_${instId}`;
                layoutNodes.push(
                    helpers.LesionMain(`skeleton_lesion_main__${instId}`, `Skeletální léze (${idx + 1})`, [
                        helpers.Table1col(`${p}_r1_excl`, [ [ 'Počet:', { btn: `${p}_c_soli`, type: 'basic', text: 'solitární' }, { btn: `${p}_c_dve`, type: 'basic', text: 'dvě' }, { btn: `${p}_c_vice`, type: 'basic', text: 'vícečetné' }, { btn: `${p}_c_mnoho`, type: 'basic', text: 'mnohočetné' } ] ]),
                        helpers.Table1col(`${p}_r2_excl`, [ [ 'Druh:', { btn: `${p}_k_les`, states: ['0', 'ložisko', 'sklerotické', 'lytické', 'smíšené', 'dřeňové'] }, { btn: `${p}_k_exp`, type: 'basic', text: 'expanze' }, { btn: `${p}_k_inf`, type: 'basic', text: 'infiltrace' }, { btn: `${p}_k_cust`, states: ['vlastní', 'custom'] } ] ]),
                        helpers.Table3colRCL(`${p}_loc_r3`, 'Lokalizace', [
                            [ '', { btn: `${p}_p_cely`, type: 'basic', text: 'Celý skelet' }, '' ],
                            [ '', { btn: `${p}_p_dren`, type: 'basic', text: 'Kostní dřeň' }, '' ],
                            [ '', { btn: `${p}_p_c_obr`, states: ['C obratel', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'více', 'custom'] }, '' ],
                            [ { btn: `${p}_p_klav_r`, type: 'basic', text: 'Klavikula' }, { btn: `${p}_p_sternum`, type: 'basic', text: 'Sternum' }, { btn: `${p}_p_klav_l`, type: 'basic', text: 'Klavikula' } ],
                            [ { btn: `${p}_p_scap_r`, type: 'basic', text: 'Scapula' }, '', { btn: `${p}_p_scap_l`, type: 'basic', text: 'Scapula' } ],
                            [ { btn: `${p}_p_hum_r`, type: 'basic', text: 'Humerus' }, '', { btn: `${p}_p_hum_l`, type: 'basic', text: 'Humerus' } ],
                            [ '', { btn: `${p}_p_t_obr`, states: ['T obratel', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12', 'více', 'custom'] }, '' ],
                            [ { btn: `${p}_p_zeb_r`, states: ['žebro', '1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.', 'více', 'custom'] }, '', { btn: `${p}_p_zeb_l`, states: ['žebro', '1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.', 'více', 'custom'] } ],
                            [ '', { btn: `${p}_p_l_obr`, states: ['L obratel', 'L1', 'L2', 'L3', 'L4', 'L5', 'více', 'custom'] }, '' ],
                            [ '', { btn: `${p}_p_sakrum`, type: 'basic', text: 'Sakrum' }, '' ],
                            [ { btn: `${p}_p_kyc_r`, type: 'basic', text: 'Kyčelní k.' }, '', { btn: `${p}_p_kyc_l`, type: 'basic', text: 'Kyčelní k.' } ],
                            [ { btn: `${p}_p_sed_r`, type: 'basic', text: 'Sedací k.' }, '', { btn: `${p}_p_sed_l`, type: 'basic', text: 'Sedací k.' } ],
                            [ { btn: `${p}_p_styd_r`, type: 'basic', text: 'Stydká kost' }, '', { btn: `${p}_p_styd_l`, type: 'basic', text: 'Stydká kost' } ],
                            [ { btn: `${p}_p_fem_r`, type: 'basic', text: 'Femur' }, '', { btn: `${p}_p_fem_l`, type: 'basic', text: 'Femur' } ]
                        ]),
                        ...LESIONS_DEFINITION.getLesionRowsPost(helpers, p, `${p}_met`, `${p}_e`)
                    ])
                );
            });

            layoutNodes.push(
                helpers.TableMain('skeleton_marrow', 'Kostní dřeň', [
                    helpers.Table2colNormal('sk_marrow_table', [
                        [ 'RF+ difuzně', { btn: 'sk_md_akt', states: ['0', '+', '++'] } ],
                        [ 'RF- lokální', { btn: 'sk_md_neakt', states: ['0', '+'] } ],
                        [ 'Enostózy', { btn: 'sk_md_enost', states: ['0', '1', 'více'] } ]
                    ]),
                    helpers.Table1col('sk_marrow_ost_add', [
                        { field: 'text', id: 'sk_marrow_custom_desc', placeholder: 'vlastní popis...' },
                        { field: 'text', id: 'sk_marrow_custom_conc', placeholder: 'vlastní závěr...' }
                    ])
                ])
            );

            layoutNodes.push(
                helpers.TableMain('skeleton_systemic', 'Systémové procesy', [
                    helpers.Table2colNormal('sk_systemic_table', [
                        [ 'DISH', { btn: 'sk_sy_dish', states: ['0', '+'] } ],
                        [ 'Bechterew', { btn: 'sk_sy_bech', states: ['0', '+'] } ],
                        [ 'Polymyalgia RF+', { btn: 'sk_sy_poly', states: ['0', '+'] } ]
                    ]),
                    helpers.Table1col('sk_systemic_ost_add', [
                        { field: 'text', id: 'sk_systemic_custom_desc', placeholder: 'vlastní popis...' },
                        { field: 'text', id: 'sk_systemic_custom_conc', placeholder: 'vlastní závěr...' }
                    ])
                ])
            );

            layoutNodes.push(
                helpers.TableMain('skeleton_degen', 'Degenerativní změny', [
                    helpers.Table3colRCL('sk_degen_table', degInfRowsFn('sk_dg')),
                    helpers.Table1col('sk_degen_ost_add', [
                        { field: 'text', id: 'sk_degen_custom_desc', placeholder: 'vlastní popis...' },
                        { field: 'text', id: 'sk_degen_custom_conc', placeholder: 'vlastní závěr...' }
                    ])
                ], { collapsed: true })
            );

            layoutNodes.push(
                helpers.TableMain('skeleton_inflam', 'Zánětlivé změny', [
                    helpers.Table3colRCL('sk_inflam_table', degInfRowsFn('sk_za')),
                    helpers.Table1col('sk_inflam_ost_add', [
                        { field: 'text', id: 'sk_inflam_custom_desc', placeholder: 'vlastní popis...' },
                        { field: 'text', id: 'sk_inflam_custom_conc', placeholder: 'vlastní závěr...' }
                    ])
                ], { collapsed: true })
            );

            layoutNodes.push(
                helpers.TableMain('skeleton_acute', 'Akutní trauma', [
                    helpers.Table3colRCL('sk_acute_table', traumaRowsFn('sk_ta')),
                    helpers.Table1col('sk_acute_ost_add', [
                        { field: 'text', id: 'sk_acute_custom_desc', placeholder: 'vlastní popis...' },
                        { field: 'text', id: 'sk_acute_custom_conc', placeholder: 'vlastní závěr...' }
                    ])
                ], { collapsed: true })
            );

            layoutNodes.push(
                helpers.TableMain('skeleton_chronic', 'Chronické trauma', [
                    helpers.Table3colRCL('sk_chronic_table', traumaRowsFn('sk_tc')),
                    helpers.Table1col('sk_chronic_ost_add', [
                        { field: 'text', id: 'sk_chronic_custom_desc', placeholder: 'vlastní popis...' },
                        { field: 'text', id: 'sk_chronic_custom_conc', placeholder: 'vlastní závěr...' }
                    ])
                ], { collapsed: true })
            );

            layoutNodes.push(
                helpers.TableMain('skeleton_instrumentace', 'Instrumentace', [
                    helpers.Table3colRCL('sk_inst_table', [
                        [ '', { btn: 'sk_in_c_pat', states: ['C páteř', 'custom'] }, '' ],
                        [ { btn: 'sk_in_klav_r', states: ['klavikula', 'OS', 'cerkláž'] }, { btn: 'sk_in_sternum', states: ['sternum', 'cerkláž'] }, { btn: 'sk_in_klav_l', states: ['klavikula', 'OS', 'cerkláž'] } ],
                        [ { btn: 'sk_in_hum_r', states: ['humerus', 'OS', 'TEP', 'CCEP'] }, '', { btn: 'sk_in_hum_l', states: ['humerus', 'OS', 'TEP', 'CCEP'] } ],
                        [ '', { btn: 'sk_in_t_pat', states: ['T páteř', 'custom'] }, '' ],
                        [ '', { btn: 'sk_in_l_pat', states: ['L páteř', 'custom'] }, '' ],
                        [ '', { btn: 'sk_in_panev', states: ['pánev', 'OS'] }, '' ],
                        [ { btn: 'sk_in_kyc_r', states: ['kyčelní k.', 'TEP'] }, '', { btn: 'sk_in_kyc_l', states: ['kyčelní k.', 'TEP'] } ],
                        [ { btn: 'sk_in_fem_r', states: ['femur', 'PFN', 'OS'] }, '', { btn: 'sk_in_fem_l', states: ['femur', 'PFN', 'OS'] } ]
                    ]),
                    helpers.Table1col('sk_inst_ost_add', [
                        { field: 'text', id: 'sk_inst_custom_desc', placeholder: 'vlastní popis...' }
                    ])
                ], { collapsed: true })
            );

            layoutNodes.push(
                helpers.TableMain('skeleton_ostatni', 'Ostatní / Vlastní', [
                    helpers.Table1col('sk_ost_add', [
                        { field: 'text', id: 'sk_custom_desc', placeholder: 'vlastní popis...' },
                        { field: 'text', id: 'sk_custom_conc', placeholder: 'vlastní závěr...' }
                    ])
                ])
            );

            return layoutNodes;
        },
        compile: (ctx) => {
            let reportOut = [{ type: 'heading', text: 'Skelet:', action: 'open-region', regionId: 'skeleton' }];
            let concMain = [];
            let concInc = [];
            
            const examId = ctx.examId || 'default';
            const formatList = formatCzechList;

            // --- LÉZE ---
            const isPET = (examId || '').toLowerCase().includes('pet');

            const lesInsts = Store.instances?.['skeleton_lesion_main'] || [];
            let highAct = false, badEtio = false;
            lesInsts.forEach(id => {
                if (['intermediární', 'zvýšená', 'vysoká'].includes(ctx.text(`l_${id}_met_act`, true))) highAct = true;
                if (!ctx.isActive(`l_${id}_e_b`) && !ctx.isActive(`l_${id}_e_inf`)) badEtio = true;
            });

            if (lesInsts.length === 0 || (lesInsts.length > 0 && isPET && !highAct)) {
                reportOut.push({ type: 'frame', text: isPET ? 'Bez patrných hyperakumulujících ložiskových změn.' : 'Bez patrných ložiskových změn.', tableId: 'skeleton_lesion_main', dimmed: true });
            }

            lesInsts.forEach(instId => {
                const p = `l_${instId}`;
                    let lokace = [];
                    
                    if (ctx.isActive(`${p}_p_cely`)) lokace.push('v celém skeletu');
                    if (ctx.isActive(`${p}_p_dren`)) lokace.push('v kostní dřeni');
                    
                    const parseVert = (suffix) => {
                        const localId = `${p}_${suffix}`;
                        const idx = ctx._val(localId) || 0;
                        if (idx === 0) return null;
                        const txt = ctx.text(localId);
                        if (txt === 'custom') return Store.customTexts[`${examId}_skeleton_${localId}`];
                        if (txt === 'více') {
                            const part = suffix.includes('c_obr') ? 'C' : suffix.includes('t_obr') ? 'T' : 'L';
                            return `ve vícečetných obratlích ${part} páteře`;
                        }
                        return `v obratli ${txt}`;
                    };

                    let cO = parseVert('p_c_obr'); if (cO) lokace.push(cO);
                    let tO = parseVert('p_t_obr'); if (tO) lokace.push(tO);
                    let lO = parseVert('p_l_obr'); if (lO) lokace.push(lO);
                    
                    if (ctx.isActive(`${p}_p_sakrum`)) lokace.push('v sakru');
                    if (ctx.isActive(`${p}_p_sternum`)) lokace.push('ve sternu');

                    const addBilat = (id, sR, sL, sB) => {
                        let r = ctx.isActive(`${p}_p_${id}_r`), l = ctx.isActive(`${p}_p_${id}_l`);
                        if (r && l) lokace.push(sB);
                        else if (r) lokace.push(sR);
                        else if (l) lokace.push(sL);
                    };

                    addBilat('klav', 'v pravé klavikule', 'v levé klavikule', 'v klavikulách bilat.');
                    addBilat('scap', 'v pravé lopatce', 'v levé lopatce', 'v lopatkách bilat.');
                    addBilat('hum', 'v pravém humeru', 'v levém humeru', 'v humerech bilat.');
                    
                    const parseZebro = (side) => {
                        const localId = `${p}_p_zeb_${side}`;
                        const idx = ctx._val(localId) || 0;
                        if (idx === 0) return null;
                        const txt = ctx.text(localId);
                        const suffix = side === 'r' ? 'vpravo' : 'vlevo';
                        if (txt === 'custom') return Store.customTexts[`${examId}_skeleton_${localId}`];
                        if (txt === 'více') return `ve vícečetných žebrech ${suffix}`;
                        return `v ${txt} žebru ${suffix}`;
                    };

                    let zR = parseZebro('r'), zL = parseZebro('l');
                    if (zR && zL && ctx.text(`${p}_p_zeb_r`) === ctx.text(`${p}_p_zeb_l`)) {
                        const val = ctx.text(`${p}_p_zeb_r`);
                        if (val === 'custom') {
                            lokace.push(Store.customTexts[`${examId}_skeleton_${p}_p_zeb_r`]);
                        } else if (val === 'více') {
                            lokace.push(`ve vícečetných žebrech bilat.`);
                        } else {
                            lokace.push(`v ${val} žebru bilat.`);
                        }
                    } else {
                        if (zR) lokace.push(zR);
                        if (zL) lokace.push(zL);
                    }

                    addBilat('kyc', 'v pravé kyčelní kosti', 'v levé kyčelní kosti', 'v kyčelních kostech bilat.');
                    addBilat('sed', 'v pravé sedací kosti', 'v levé sedací kosti', 'v sedacích kostech bilat.');
                    addBilat('styd', 'v pravé stydké kosti', 'v levé stydké kosti', 've stydkých kostech bilat.');
                    addBilat('fem', 'v pravém femuru', 'v levém femuru', 've femurech bilat.');

                    const f = LESIONS_DEFINITION.frames(ctx, { examId, regionId: 'skeleton', p, tableId: `skeleton_lesion_main__${instId}`, lokace });
                    if (f) {
                        reportOut.push(f.report);
                        concMain.push(f.conc);
                    }
                });

            if (lesInsts.length > 0 && (!isPET || highAct) && !badEtio) {
                reportOut.push({ type: 'frame', text: 'Jinak bez patrných ložiskových změn.', tableId: 'skeleton_lesion_main', dimmed: true });
            }

            // --- KOSTNÍ DŘEŇ ---
            let marrow = [];
            let mdAkt = ctx.text('sk_md_akt');
            if (mdAkt === '+') marrow.push("difuzně zvýšená akumulace RF při aktivaci");
            else if (mdAkt === '++') {
                marrow.push("difuzně výrazně zvýšená akumulace RF při aktivaci");
                concInc.push({ type: 'frame', text: "Difuzní hypermetabolismus kostní dřeně při její aktivaci.", tableId: 'skeleton_marrow' });
            }
            
            if (ctx.isActive('sk_md_neakt')) marrow.push("lokálně snížená akumulace RF po ozáření");
            let enost = ctx.text('sk_md_enost');
            if (enost === '1') marrow.push("drobný sklerotický okrsek (enostóza)");
            else if (enost === 'více') marrow.push("drobné sklerotické okrsky (enostózy)");
            
            let mdDesc = ctx.field('sk_marrow_custom_desc');
            if (mdDesc) marrow.push(mdDesc);
            
            if (marrow.length > 0) {
                reportOut.push({ type: 'frame', text: `${capitalize(formatList(marrow))}.`, tableId: 'skeleton_marrow' });
            }
            
            let mdConc = ctx.field('sk_marrow_custom_conc');
            if (mdConc) concInc.push({ type: 'frame', text: mdConc, tableId: 'skeleton_marrow' });

            // --- DEGENERACE & ZÁNĚT ---
            const processDegInflam = (pfx, isDeg, idSuffix, tableId) => {
                let locs = [];
                if (ctx.isActive(`${pfx}_c_pat`)) locs.push(isDeg ? 'krční páteře' : 'krční páteř');
                if (ctx.isActive(`${pfx}_t_pat`)) locs.push(isDeg ? 'hrudní páteře' : 'hrudní páteř');
                if (ctx.isActive(`${pfx}_l_pat`)) locs.push(isDeg ? 'bederní páteře' : 'bederní páteř');

                const addBilatDI = (id, baseR, baseL, baseB) => {
                    let r = ctx.isActive(`${pfx}_${id}_r`), l = ctx.isActive(`${pfx}_${id}_l`);
                    if (r && l) locs.push(baseB);
                    else if (r) locs.push(baseR);
                    else if (l) locs.push(baseL);
                };

                addBilatDI('ac', 'AC skloubení vpravo', 'AC skloubení vlevo', 'AC skloubení bilat.');
                addBilatDI('si', 'SI skloubení vpravo', 'SI skloubení vlevo', 'SI skloubení bilat.');
                
                if (isDeg) {
                    addBilatDI('ram', 'ramenního kloubu vpravo', 'ramenního kloubu vlevo', 'ramenních kloubů bilat.');
                    addBilatDI('kyc', 'kyčelního kloubu vpravo', 'kyčelního kloubu vlevo', 'kyčelních kloubů bilat.');
                } else {
                    addBilatDI('ram', 'ramenní kloub vpravo', 'ramenní kloub vlevo', 'ramenní klouby bilat.');
                    addBilatDI('kyc', 'kyčelní kloub vpravo', 'kyčelní kloub vlevo', 'kyčelní klouby bilat.');
                }

                let repText = "";
                if (locs.length > 0) {
                    const locsStr = formatList(locs);
                    if (isDeg) {
                        repText = `pokročilé degenerativní změny ${locsStr}`;
                        concInc.push({ type: 'frame', text: `${capitalize(repText)}.`, tableId: tableId });
                    } else {
                        repText = `${locsStr} se zvýšenou aktivitou okolních měkkých tkání v rámci nespec. zánětlivých změn`;
                    }
                }
                
                let descParts = [];
                if (repText) descParts.push(repText);
                
                let customDesc = ctx.field(`${idSuffix}_custom_desc`);
                if (customDesc) descParts.push(customDesc);
                
                if (descParts.length > 0) {
                    reportOut.push({ type: 'frame', text: `${capitalize(formatList(descParts))}.`, tableId: tableId });
                }
                
                let customConc = ctx.field(`${idSuffix}_custom_conc`);
                if (customConc) concInc.push({ type: 'frame', text: customConc, tableId: tableId });
            };
            processDegInflam('sk_dg', true, 'sk_degen', 'skeleton_degen');
            processDegInflam('sk_za', false, 'sk_inflam', 'skeleton_inflam');

            // --- SYSTÉMOVÉ PROCESY ---
            if (ctx.isActive('sk_sy_dish')) {
                reportOut.push({ type: 'frame', text: `Osifikace v oblasti předního longitudinálního lig. páteře, nejvýrazněji v thorakálním úseku, s tvorbou osteofytů. Zachovaná výška meziobratlových plotének a bez známek erozí SI či sakroiliitidy. Osifikační změny v oblasti entézí pánevního skeletu.`, tableId: 'skeleton_systemic' });
                concInc.push({ type: 'frame', text: "Strukturální změny skeletu obrazu DISH.", tableId: 'skeleton_systemic' });
            }
            if (ctx.isActive('sk_sy_bech')) {
                reportOut.push({ type: 'frame', text: `Změny v oblasti sakroiliakálních kloubů, bilaterálně, s ankylózou. Osifikace zejména předních longitudinálních ligament a interspinozní úponů.`, tableId: 'skeleton_systemic' });
                concMain.push({ type: 'frame', text: "Obraz suspektní ze spondyloartritidy charakteru m. Bechtěrev. Bilaterální sakroiliitida, entezopatie axiálního skeletu.", tableId: 'skeleton_systemic' });
            }
            if (ctx.isActive('sk_sy_poly')) {
                reportOut.push({ type: 'frame', text: `Zvýšená akumulace RF v oblastech ramenních, SC, AC, kyčelních kloubech, při symfýze, velkých trochanterech, interspinózně.`, tableId: 'skeleton_systemic' });
                concMain.push({ type: 'frame', text: "Obraz suspektní z polymyalgia rheumatica. Zvýšená metabolická aktivita v mnohočetných kloubních lokalizacích a při šlachových úponech v rámci burzitis, entezitis a synovitis.", tableId: 'skeleton_systemic' });
            }
            
            let sysDesc = ctx.field('sk_systemic_custom_desc');
            if (sysDesc) reportOut.push({ type: 'frame', text: capitalize(sysDesc), tableId: 'skeleton_systemic' });
            let sysConc = ctx.field('sk_systemic_custom_conc');
            if (sysConc) concInc.push({ type: 'frame', text: sysConc, tableId: 'skeleton_systemic' });

            // --- TRAUMA ---
            const processTrauma = (pfx, isAcute, idSuffix, tableId) => {
                let locsVert = [];
                let locsOther = [];

                const parseVert = (vSuffix) => {
                    const txt = ctx.text(`${pfx}_${vSuffix}`);
                    if (txt && txt !== '0' && !txt.includes('obratel')) {
                        if (txt === 'custom') {
                            locsVert.push(ctx.field(`${pfx}_${vSuffix}`) || 'vlastní');
                        } else if (txt === 'více') {
                            const part = vSuffix.includes('c') ? 'C' : vSuffix.includes('t') ? 'T' : 'L';
                            locsVert.push(`vícečetných ${part} obratlů`);
                        } else {
                            locsVert.push(txt);
                        }
                    }
                };
                parseVert('c_obr');
                parseVert('t_obr');
                parseVert('l_obr');

                if (ctx.isActive(`${pfx}_sakrum`)) locsOther.push('kosti křížové');
                if (ctx.isActive(`${pfx}_sternum`)) locsOther.push('sterna');

                const addBilatTrauma = (id, baseName) => {
                    let r = ctx.isActive(`${pfx}_${id}_r`), l = ctx.isActive(`${pfx}_${id}_l`);
                    if (r && l) locsOther.push(`${baseName} bilat.`);
                    else if (r) locsOther.push(`${baseName} vpravo`);
                    else if (l) locsOther.push(`${baseName} vlevo`);
                };

                addBilatTrauma('klav', 'klavikuly');
                addBilatTrauma('scap', 'lopatky');
                addBilatTrauma('hum', 'prox. humeru');
                addBilatTrauma('kyc', 'kosti kyčelní');
                addBilatTrauma('sed', 'kosti sedací');
                addBilatTrauma('styd', 'kosti stydké');
                addBilatTrauma('fem', 'prox. femuru');

                let zR = ctx.text(`${pfx}_zeb_r`), zL = ctx.text(`${pfx}_zeb_l`);
                let rAct = zR && zR !== '0' && zR !== 'žebro';
                let lAct = zL && zL !== '0' && zL !== 'žebro';
                
                if (rAct && lAct && zR === zL) {
                    if (zR === 'více') {
                        locsOther.push(`vícečetných žeber bilat.`);
                    } else {
                        locsOther.push(`${zR} žebra bilat.`);
                    }
                } else {
                    if (rAct) {
                        locsOther.push(zR === 'více' ? `vícečetných žeber vpravo` : `${zR} žebra vpravo`);
                    }
                    if (lAct) {
                        locsOther.push(zL === 'více' ? `vícečetných žeber vlevo` : `${zL} žebra vlevo`);
                    }
                }

                let repParts = [];
                let conclParts = [];

                if (locsVert.length > 0) {
                    const vertStr = formatList(locsVert);
                    const telWord = (locsVert.length > 1 || vertStr.includes(' a ') || vertStr.includes(',') || vertStr.includes('vícečetných')) ? 'těl' : 'těla';
                    if (isAcute) {
                        repParts.push(`klínovité snížení obratl. ${telWord} ${vertStr} se zvýšenou akumulací RF`);
                        conclParts.push(`Kompresivní fraktura obratl. ${telWord} ${vertStr} se zvýšenou akumulací RF (recentní).`);
                    } else {
                        const txt = `stav po starší kompresi obratl. ${telWord} ${vertStr} bez zvýšené akumulace RF`;
                        repParts.push(txt);
                        conclParts.push(capitalize(txt) + '.');
                    }
                }

                if (locsOther.length > 0) {
                    const otherStr = formatList(locsOther);
                    if (isAcute) {
                        repParts.push(`fraktura ${otherStr} se zvýšenou akumulací RF`);
                        conclParts.push(`Fraktura ${otherStr} se zvýšenou akumulací RF (recentní).`);
                    } else {
                        const txt = `stav po starší fraktuře ${otherStr} bez zvýšené akumulace RF`;
                        repParts.push(txt);
                        conclParts.push(capitalize(txt) + '.');
                    }
                }
                
                let customDesc = ctx.field(`${idSuffix}_custom_desc`);
                if (customDesc) repParts.push(customDesc);

                if (repParts.length > 0) {
                    reportOut.push({ type: 'frame', text: `${capitalize(repParts.join(', '))}.`, tableId: tableId });
                }
                
                let customConc = ctx.field(`${idSuffix}_custom_conc`);
                if (customConc) conclParts.push(customConc);
                
                conclParts.forEach(c => concInc.push({ type: 'frame', text: c, tableId: tableId }));
            };
            
            processTrauma('sk_ta', true, 'sk_acute', 'skeleton_acute');
            processTrauma('sk_tc', false, 'sk_chronic', 'skeleton_chronic');

            // --- INSTRUMENTACE ---
            const processInstrumentace = () => {
                let instRep = [];

                const getInstText = (id) => {
                    let val = ctx.text(id);
                    if (!val || val === '0' || val === '[Nevyplněno]') return null;
                    const defaults = ['klavikula', 'sternum', 'humerus', 'T páteř', 'L páteř', 'C páteř', 'pánev', 'kyčelní k.', 'femur'];
                    if (defaults.includes(val)) return null;
                    return val;
                };

                const parseBilatInst = (idBase, partR, partL, partB) => {
                    let r = getInstText(`${idBase}_r`);
                    let l = getInstText(`${idBase}_l`);
                    if (r && l && r === l) {
                        instRep.push(`${r} ${partB}`);
                    } else {
                        if (r) instRep.push(`${r} ${partR}`);
                        if (l) instRep.push(`${l} ${partL}`);
                    }
                };

                ['c_pat', 't_pat', 'l_pat'].forEach(id => {
                    let val = getInstText(`sk_in_${id}`);
                    if (val) instRep.push(val);
                });

                let sternum = getInstText('sk_in_sternum');
                if (sternum) instRep.push(`${sternum} sterna`);

                let panev = getInstText('sk_in_panev');
                if (panev) instRep.push(`${panev} pánve`);

                parseBilatInst('sk_in_klav', 'pravé klavikuly', 'levé klavikuly', 'klavikul bilat.');
                parseBilatInst('sk_in_hum', 'pravého humeru', 'levého humeru', 'humerů bilat.');
                parseBilatInst('sk_in_kyc', 'pravého kyčelního kloubu', 'levého kyčelního kloubu', 'kyčelních kloubů bilat.');
                parseBilatInst('sk_in_fem', 'pravého femuru', 'levého femuru', 'femurů bilat.');

                let customDesc = ctx.field(`sk_inst_custom_desc`);
                if (customDesc) instRep.push(customDesc);

                if (instRep.length > 0) {
                    reportOut.push({ type: 'frame', text: `${capitalize(instRep.join(', '))}.`, tableId: 'skeleton_instrumentace' });
                }
            };
            processInstrumentace();

            let skDesc = ctx.field('sk_custom_desc'); 
            if (skDesc) reportOut.push({ type: 'frame', text: capitalize(skDesc), tableId: 'skeleton_ostatni' });
            
            let skConc = ctx.field('sk_custom_conc'); 
            if (skConc) concInc.push({ type: 'frame', text: skConc, tableId: 'skeleton_ostatni' });

            return { report: reportOut, conclusion: { main: concMain, incidental: concInc } };
        }
    };