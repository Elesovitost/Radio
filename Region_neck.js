const RegionNeck = {
        title: 'Krk',

        layout: (helpers) => {
            let layoutNodes = [];

            const lesInsts = Store.instances?.['neck_lesion_main'] || [];
            lesInsts.forEach((instId, idx) => {
                const p = `l_${instId}`;
                layoutNodes.push(
                    helpers.LesionMain(`neck_lesion_main__${instId}`, `Léze (${idx + 1})`, [
                        ...LESIONS_DEFINITION.getLesionRowsPre(helpers, p),
                        helpers.Table3colRCL(`${p}_r3`, 'Lokalizace', [
                            [ { btn: `${p}_p_patro_r`, states: ['0', '+'] }, 'patro', { btn: `${p}_p_patro_l`, states: ['0', '+'] } ],
                            [ { btn: `${p}_p_tons_r`, states: ['0', '+'] }, 'tonsila', { btn: `${p}_p_tons_l`, states: ['0', '+'] } ],
                            [ { btn: `${p}_p_jaz_r`, states: ['0', '+'] }, 'jazyk', { btn: `${p}_p_jaz_l`, states: ['0', '+'] } ],
                            [ { btn: `${p}_p_far_r`, states: ['0', '+'] }, 'farynx', { btn: `${p}_p_far_l`, states: ['0', '+'] } ],
                            [ { btn: `${p}_p_hyp_r`, states: ['0', '+'] }, 'hypofarynx', { btn: `${p}_p_hyp_l`, states: ['0', '+'] } ],
                            [ { btn: `${p}_p_lar_r`, states: ['0', '+'] }, 'larynx', { btn: `${p}_p_lar_l`, states: ['0', '+'] } ],
                            [ { btn: `${p}_p_par_r`, states: ['0', '+'] }, 'parotis', { btn: `${p}_p_par_l`, states: ['0', '+'] } ],
                            [ { btn: `${p}_p_sub_r`, states: ['0', '+'] }, 'submandibularis', { btn: `${p}_p_sub_l`, states: ['0', '+'] } ],
                            [ { btn: `${p}_p_thyr_r`, states: ['0', '+'] }, 'thyroidea', { btn: `${p}_p_thyr_l`, states: ['0', '+'] } ]
                        ]),
                        ...LESIONS_DEFINITION.getLesionRowsPost(helpers, p, `${p}_met`, `${p}_e`)
                    ])
                );
            });

            const lnInsts = Store.instances?.['neck_lymphnode_main'] || [];
            lnInsts.forEach((instId, idx) => {
                const p = `ln_${instId}`;
                layoutNodes.push(
                    helpers.LesionMain(`neck_lymphnode_main__${instId}`, `Lymfadenopatie (${idx + 1})`, [
                        ...LESIONS_DEFINITION.getLymphNodeRowsPre(helpers, p),
                        helpers.Table3colRL(`${p}_r3`, 'Lokalizace', [
                            [ { btn: `${p}_p_krk_r`, type: 'basic', text: 'Krk' },'\u00A0', { btn: `${p}_p_krk_l`, type: 'basic', text: 'Krk' } ],
                            [ { btn: `${p}_p_IA_r`, type: 'basic', text: 'IA' },'', { btn: `${p}_p_IA_l`, type: 'basic', text: 'IA' } ],
                            [ { btn: `${p}_p_IB_r`, type: 'basic', text: 'IB' },'', { btn: `${p}_p_IB_l`, type: 'basic', text: 'IB' } ],
                            [ { btn: `${p}_p_IIA_r`, type: 'basic', text: 'IIA' },'', { btn: `${p}_p_IIA_l`, type: 'basic', text: 'IIA' } ],
                            [ { btn: `${p}_p_IIB_r`, type: 'basic', text: 'IIB' },'', { btn: `${p}_p_IIB_l`, type: 'basic', text: 'IIB' } ],
                            [ { btn: `${p}_p_III_r`, type: 'basic', text: 'III' },'', { btn: `${p}_p_III_l`, type: 'basic', text: 'III' } ],
                            [ { btn: `${p}_p_IV_r`, type: 'basic', text: 'IV' },'', { btn: `${p}_p_IV_l`, type: 'basic', text: 'IV' } ],
                            [ { btn: `${p}_p_V_r`, type: 'basic', text: 'V' },'', { btn: `${p}_p_V_l`, type: 'basic', text: 'V' } ],
                            [ { btn: `${p}_p_VI_r`, type: 'basic', text: 'VI' },'', { btn: `${p}_p_VI_l`, type: 'basic', text: 'VI' } ]
                        ]),
                        ...LESIONS_DEFINITION.getLymphNodeRowsPost(helpers, p, `${p}_met`, `${p}_e`)
                    ])
                );
            });

            layoutNodes.push(
                helpers.TableMain('neck_sinus_main', 'Siny', [
                    helpers.Table3colRL('neck_sinus_table', [
                        [ { btn: 'sinus_front_r', states: ['0', 'cysta', 'hyper+', 'hyper++', 'tekutina'] }, 'frontální', { btn: 'sinus_front_l', states: ['0', 'cysta', 'hyper+', 'hyper++', 'tekutina'] } ],
                        [ { btn: 'sinus_ethmo_r', states: ['0', 'cysta', 'hyper+', 'hyper++', 'tekutina'] }, 'ethmoidální', { btn: 'sinus_ethmo_l', states: ['0', 'cysta', 'hyper+', 'hyper++', 'tekutina'] } ],
                        [ { btn: 'sinus_sfeno_r', states: ['0', 'cysta', 'hyper+', 'hyper++', 'tekutina'] }, 'sfenoidální', { btn: 'sinus_sfeno_l', states: ['0', 'cysta', 'hyper+', 'hyper++', 'tekutina'] } ],
                        [ { btn: 'sinus_maxil_r', states: ['0', 'cysta', 'hyper+', 'hyper++', 'tekutina'] }, 'maxilární', { btn: 'sinus_maxil_l', states: ['0', 'cysta', 'hyper+', 'hyper++', 'tekutina'] } ]
                    ]),
                    helpers.Table1col('neck_sinus_add', [
                        { field: 'text', id: 'sinus_custom_desc', placeholder: 'vlastní...popis...' },
                        { field: 'text', id: 'sinus_custom_conc', placeholder: 'vlastní...závěr...' }
                    ])
                ]),
                helpers.TableMain('neck_salivary_main', 'Slinné žlázy', [
                    helpers.Table3colRL('neck_parotis_table', 'Parotické', [
                        [ { btn: 'par_atr_r', states: ['0', '+'] }, 'atrofie', { btn: 'par_atr_l', states: ['0', '+'] } ],
                        [ { btn: 'par_res_r', states: ['0', '+'] }, 'resekce', { btn: 'par_res_l', states: ['0', '+'] } ],
                        [ { btn: 'par_nod_r', states: ['0', '1', 'více'] }, 'nodul', { btn: 'par_nod_l', states: ['0', '1', 'více'] } ],
                        [ { btn: 'par_nod_RF_r', states: ['0', '1', 'více'] }, 'nodul akumulace+', { btn: 'par_nod_RF_l', states: ['0', '1', 'více'] } ]
                    ]),
                    helpers.Table3colRL('neck_subman_table', 'Submandibulární', [
                        [ { btn: 'sub_atr_r', states: ['0', '+'] }, 'atrofie', { btn: 'sub_atr_l', states: ['0', '+'] } ],
                        [ { btn: 'sub_res_r', states: ['0', '+'] }, 'resekce', { btn: 'sub_res_l', states: ['0', '+'] } ],
                        [ { btn: 'sub_nod_r', states: ['0', '1', 'více'] }, 'nodul', { btn: 'sub_nod_l', states: ['0', '1', 'více'] } ],
                        [ { btn: 'sub_nod_RF_r', states: ['0', '1', 'více'] }, 'nodul akumulace+', { btn: 'sub_nod_RF_l', states: ['0', '1', 'více'] } ]
                    ]),
                    helpers.Table1col('neck_salivary_add', [
                        { field: 'text', id: 'salivary_custom_desc', placeholder: 'vlastní...popis...' },
                        { field: 'text', id: 'salivary_custom_conc', placeholder: 'vlastní...závěr...' }
                    ])
                ]),
                helpers.TableMain('neck_pharynx_main', 'Farynx', [
                    helpers.Table3colRL('neck_pharynx_table', [
                        [ { btn: 'far_asym_oro_r', states: ['0', 'poop', 'porad', 'oboje'] }, 'asymetrie orofaryngu', { btn: 'far_asym_oro_l', states: ['0', 'poop', 'porad', 'oboje'] } ],
                        [ { btn: 'far_asym_hypo_r', states: ['0', 'poop', 'porad', 'oboje'] }, 'asymetrie hypofaryngu', { btn: 'far_asym_hypo_l', states: ['0', 'poop', 'porad', 'oboje'] } ],
                        [ { btn: 'far_tons_r', states: ['0', '+'] }, 'tonsila RF+', { btn: 'far_tons_l', states: ['0', '+'] } ]
                    ]),
                    helpers.Table1col('neck_pharynx_add', [
                        { field: 'text', id: 'pharynx_custom_desc', placeholder: 'vlastní...popis...' },
                        { field: 'text', id: 'pharynx_custom_conc', placeholder: 'vlastní...závěr...' }
                    ])
                ]),
                helpers.TableMain('neck_thyroid_main', 'Thyroidea', [
                    helpers.Table3colRL('neck_thyroid_table', [
                        [ '', { btn: 'thyr_enl', type: 'basic', text: 'zvětšení' }, '' ],
                        [ '', { btn: 'thyr_rf', type: 'basic', text: 'RF+' }, '' ],
                        [ { btn: 'thyr_res_r', states: ['0', '+'] }, 'resekce', { btn: 'thyr_res_l', states: ['0', '+'] } ],
                        [ { btn: 'thyr_nod_r', states: ['0', '1', 'více'] }, 'nodul', { btn: 'thyr_nod_l', states: ['0', '1', 'více'] } ],
                        [ { btn: 'thyr_nod_rf_r', states: ['0', '1', 'více'] }, 'nodul RF+', { btn: 'thyr_nod_rf_l', states: ['0', '1', 'více'] } ],
                        [ { btn: 'thyr_cys_r', states: ['0', '1', 'více'] }, 'cysta', { btn: 'thyr_cys_l', states: ['0', '1', 'více'] } ]
                    ]),
                    helpers.Table1col('neck_thyroid_add', [
                        { field: 'text', id: 'thyroid_custom_desc', placeholder: 'vlastní...popis...' },
                        { field: 'text', id: 'thyroid_custom_conc', placeholder: 'vlastní...závěr...' }
                    ])
                ])
            );

            return layoutNodes;
        },

        compile: (ctx) => {
            let reportOut = [{ type: 'heading', text: 'Krk:', action: 'open-region', regionId: 'neck' }];
            let concMain = [];
            let concInc = [];
            const examId = ctx.examId || 'default';
            const formatList = formatCzechList;
            const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
            const isPET = (examId || '').toLowerCase().includes('pet');

            const lesInsts = Store.instances?.['neck_lesion_main'] || [];
            let highAct = false, badEtio = false;
            lesInsts.forEach(id => {
                if (['intermediární', 'zvýšená', 'vysoká'].includes(ctx.text(`l_${id}_met_act`, true))) highAct = true;
                if (!ctx.isActive(`l_${id}_e_b`) && !ctx.isActive(`l_${id}_e_inf`)) badEtio = true;
            });

            if (lesInsts.length === 0 || (lesInsts.length > 0 && isPET && !highAct)) {
                reportOut.push({ type: 'frame', text: isPET ? 'Bez patrných hyperakumulujících ložiskových změn.' : 'Bez patrných ložiskových změn.', tableId: 'neck_lesion_main', dimmed: true });
            }

            lesInsts.forEach(instId => {
                const p = `l_${instId}`;
                    let lokace = [];
                    const lokMap = [
                        { id: 'patro', name: 'patro' }, { id: 'tons', name: 'tonsila' }, { id: 'jaz', name: 'jazyk' },
                        { id: 'far', name: 'farynx' }, { id: 'hyp', name: 'hypofarynx' }, { id: 'lar', name: 'larynx' },
                        { id: 'par', name: 'parotis' }, { id: 'sub', name: 'submandibularis' }, { id: 'thyr', name: 'thyroidea' }
                    ];
                    
                    lokMap.forEach(loc => {
                        let r = ctx.isActive(`${p}_p_${loc.id}_r`), l = ctx.isActive(`${p}_p_${loc.id}_l`);
                        if (!r && !l) return;
                        let pad2 = GRAMMAR_DICT.lokalizace[loc.name]?.pad2 || loc.name;
                        if (r && l) lokace.push(`${pad2} bilat.`);
                        else if (r) lokace.push(`${pad2} vpravo`);
                        else if (l) lokace.push(`${pad2} vlevo`);
                    });
                    let lokText = lokace.length > 0 ? formatCzechList(lokace) : '';

                    let d = LESIONS_DEFINITION.parseDetails(ctx, examId, 'neck', p, `${p}_met`, `${p}_e`, false);

                    if (d.hasAny || lokace.length > 0) {
                        let repSentence = `${d.baseText} ${lokText}${d.doplneniStr}${d.vzhledText}${d.metrikyStr}.`.replace(/\s+/g, ' ').replace(' .', '.').trim();
                        reportOut.push({ type: 'frame', text: repSentence, tableId: `neck_lesion_main__${instId}` });

                        let concSentence = `${d.baseText} ${lokText}${d.doplneniStr}${d.actStr}${d.dynStr}`;
                        if (d.etioStr) concSentence += `: ${d.etioStr}.`;
                        else concSentence += `.`;
                        
                        concSentence = concSentence.replace(/\s+/g, ' ').replace(' : ', ': ').replace(' .', '.');
                        concMain.push({ type: 'frame', text: concSentence, tableId: `neck_lesion_main__${instId}` });
                    }
                });

            if (lesInsts.length > 0 && (!isPET || highAct) && !badEtio) {
                reportOut.push({ type: 'frame', text: 'Jinak bez patrných ložiskových změn.', tableId: 'neck_lesion_main', dimmed: true });
            }

            const lnInsts = Store.instances?.['neck_lymphnode_main'] || [];
            if (lnInsts.length === 0) {
                reportOut.push({ type: 'frame', text: isPET ? 'Bez patrné hyperakumulující lymfadenopatie.' : 'Bez patrné lymfadenopatie.', tableId: 'neck_lymphnode_main', dimmed: true });
            } else {
                lnInsts.forEach(instId => {
                    const p = `ln_${instId}`;
                    let lokaceLN = [];
                    let krk_p = ctx.isActive(`${p}_p_krk_r`), krk_l = ctx.isActive(`${p}_p_krk_l`);
                    if (krk_p && krk_l) lokaceLN.push("na krku bilat.");
                    else if (krk_p) lokaceLN.push("na krku vpravo");
                    else if (krk_l) lokaceLN.push("na krku vlevo");

                    let levelsR = [], levelsL = [];
                    ['IA', 'IB', 'IIA', 'IIB', 'III', 'IV', 'V', 'VI'].forEach(lvl => {
                        if (ctx.isActive(`${p}_p_${lvl}_r`)) levelsR.push(lvl);
                        if (ctx.isActive(`${p}_p_${lvl}_l`)) levelsL.push(lvl);
                    });

                    if (levelsR.length > 0 && levelsR.join(',') === levelsL.join(',')) {
                        lokaceLN.push(`v levelu ${levelsR.join(', ')} bilat.`);
                    } else {
                        if (levelsR.length > 0) lokaceLN.push(`v levelu ${levelsR.join(', ')} vpravo`);
                        if (levelsL.length > 0) lokaceLN.push(`v levelu ${levelsL.join(', ')} vlevo`);
                    }

                    let lokTextLN = lokaceLN.length > 0 ? formatCzechList(lokaceLN) : '';

                    let dLN = LESIONS_DEFINITION.parseDetails(ctx, examId, 'neck', p, `${p}_met`, `${p}_e`, true);

                    if (dLN.hasAny || lokaceLN.length > 0) {
                        let repSentence = `${dLN.baseText}${dLN.doplneniStr} ${lokTextLN}${dLN.vzhledText}${dLN.metrikyStr}.`.replace(/\s+/g, ' ').replace(' .', '.');
                        reportOut.push({ type: 'frame', text: repSentence, tableId: `neck_lymphnode_main__${instId}` });

                        let concSentence = `${dLN.baseText}${dLN.doplneniStr} ${lokTextLN}${dLN.actStr}${dLN.dynStr}`;
                        if (dLN.etioStr) concSentence += `: ${dLN.etioStr}.`;
                        else concSentence += `.`;
                        
                        concSentence = concSentence.replace(/\s+/g, ' ').replace(' : ', ': ').replace(' .', '.');
                        concMain.push({ type: 'frame', text: concSentence, tableId: `neck_lymphnode_main__${instId}` });
                    }
                });
            }

            let sinyStates = ctx.mapStates({
                separator: ', ',
                items: [
                    { id: 'sinus_front_r', 1: 'cysta/polyp ve frontálním sinu vpravo', 2: 'hyperplázie sliznic ve frontálním sinu vpravo', 3: 'výrazná hyperplázie sliznic ve frontálním sinu vpravo', 4: 'tekutina ve frontálním sinu vpravo' },
                    { id: 'sinus_front_l', 1: 'cysta/polyp ve frontálním sinu vlevo', 2: 'hyperplázie sliznic ve frontálním sinu vlevo', 3: 'výrazná hyperplázie sliznic ve frontálním sinu vlevo', 4: 'tekutina ve frontálním sinu vlevo' },
                    { id: 'sinus_ethmo_r', 1: 'cysta/polyp v ethmoidálním sinu vpravo', 2: 'hyperplázie sliznic v ethmoidálním sinu vpravo', 3: 'výrazná hyperplázie sliznic v ethmoidálním sinu vpravo', 4: 'tekutina v ethmoidálním sinu vpravo' },
                    { id: 'sinus_ethmo_l', 1: 'cysta/polyp v ethmoidálním sinu vlevo', 2: 'hyperplázie sliznic v ethmoidálním sinu vlevo', 3: 'výrazná hyperplázie sliznic v ethmoidálním sinu vlevo', 4: 'tekutina v ethmoidálním sinu vlevo' },
                    { id: 'sinus_sfeno_r', 1: 'cysta/polyp ve sfenoidálním sinu vpravo', 2: 'hyperplázie sliznic ve sfenoidálním sinu vpravo', 3: 'výrazná hyperplázie sliznic ve sfenoidálním sinu vpravo', 4: 'tekutina ve sfenoidálním sinu vpravo' },
                    { id: 'sinus_sfeno_l', 1: 'cysta/polyp ve sfenoidálním sinu vlevo', 2: 'hyperplázie sliznic ve sfenoidálním sinu vlevo', 3: 'výrazná hyperplázie sliznic ve sfenoidálním sinu vlevo', 4: 'tekutina ve sfenoidálním sinu vlevo' },
                    { id: 'sinus_maxil_r', 1: 'cysta/polyp v maxilárním sinu vpravo', 2: 'hyperplázie sliznic v maxilárním sinu vpravo', 3: 'výrazná hyperplázie sliznic v maxilárním sinu vpravo', 4: 'tekutina v maxilárním sinu vpravo' },
                    { id: 'sinus_maxil_l', 1: 'cysta/polyp v maxilárním sinu vlevo', 2: 'hyperplázie sliznic v maxilárním sinu vlevo', 3: 'výrazná hyperplázie sliznic v maxilárním sinu vlevo', 4: 'tekutina v maxilárním sinu vlevo' }
                ]
            });
            let sinyCustomDesc = ctx.field('sinus_custom_desc');
            let sinyParts = [];
            if (sinyStates) sinyParts.push(sinyStates);
            if (sinyCustomDesc) sinyParts.push(sinyCustomDesc);
            if (sinyParts.length > 0) reportOut.push({ type: 'frame', text: `- Siny: ${formatCzechList(sinyParts)}.`, tableId: 'neck_sinus_main' });

            const sinusItems = [
                { id: 'sinus_front_r', text: 've frontálním sinu vpravo' },
                { id: 'sinus_front_l', text: 've frontálním sinu vlevo' },
                { id: 'sinus_ethmo_r', text: 'v ethmoidálním sinu vpravo' },
                { id: 'sinus_ethmo_l', text: 'v ethmoidálním sinu vlevo' },
                { id: 'sinus_sfeno_r', text: 've sfenoidálním sinu vpravo' },
                { id: 'sinus_sfeno_l', text: 've sfenoidálním sinu vlevo' },
                { id: 'sinus_maxil_r', text: 'v maxilárním sinu vpravo' },
                { id: 'sinus_maxil_l', text: 'v maxilárním sinu vlevo' }
            ];
            
            let sinyConcStr = ctx.mapConditions([
                { states: [3], prefix: 'Chronická sinusitis (', suffix: ').', separator: ', ', items: sinusItems },
                { states: [4], prefix: 'Akutní sinusitis (', suffix: ').', separator: ', ', items: sinusItems }
            ]).trim();
            let customSinusConc = ctx.field('sinus_custom_conc');
            if (sinyConcStr || customSinusConc) {
                let s = [sinyConcStr, customSinusConc].filter(Boolean).join('\n');
                concInc.push({ type: 'frame', text: s, tableId: 'neck_sinus_main' });
            }

            let salivaryStates = ctx.mapStates({
                separator: ', ',
                items: [
                    { id: 'par_atr_r', 1: 'atrofie parotidy vpravo' },
                    { id: 'par_atr_l', 1: 'atrofie parotidy vlevo' },
                    { id: 'par_res_r', 1: 'stav po resekci parotidy vpravo' },
                    { id: 'par_res_l', 1: 'stav po resekci parotidy vlevo' },
                    { id: 'par_nod_r', 1: 'nespecifický drobný nodul v parotidě vpravo', 2: 'nespecifické drobné noduly v parotidě vpravo' },
                    { id: 'par_nod_l', 1: 'nespecifický drobný nodul v parotidě vlevo', 2: 'nespecifické drobné noduly v parotidě vlevo' },
                    { id: 'par_nod_RF_r', 1: 'RF aktivní nodul v parotidě vpravo', 2: 'RF aktivní noduly v parotidě vpravo' },
                    { id: 'par_nod_RF_l', 1: 'RF aktivní nodul v parotidě vlevo', 2: 'RF aktivní noduly v parotidě vlevo' },
                    { id: 'sub_atr_r', 1: 'atrofie submandibulární žlázy vpravo' },
                    { id: 'sub_atr_l', 1: 'atrofie submandibulární žlázy vlevo' },
                    { id: 'sub_res_r', 1: 'stav po resekci submandibulární žlázy vpravo' },
                    { id: 'sub_res_l', 1: 'stav po resekci submandibulární žlázy vlevo' },
                    { id: 'sub_nod_r', 1: 'nespecifický drobný nodul v submandibulární žláze vpravo', 2: 'nespecifické drobné noduly v submandibulární žláze vpravo' },
                    { id: 'sub_nod_l', 1: 'nespecifický drobný nodul v submandibulární žláze vlevo', 2: 'nespecifické drobné noduly v submandibulární žláze vlevo' },
                    { id: 'sub_nod_RF_r', 1: 'RF aktivní nodul v submandibulární žláze vpravo', 2: 'RF aktivní noduly v submandibulární žláze vpravo' },
                    { id: 'sub_nod_RF_l', 1: 'RF aktivní nodul v submandibulární žláze vlevo', 2: 'RF aktivní noduly v submandibulární žláze vlevo' }
                ]
            });
            let salivaryCustomDesc = ctx.field('salivary_custom_desc');
            let salivaryParts = [];
            if (salivaryStates) salivaryParts.push(salivaryStates);
            if (salivaryCustomDesc) salivaryParts.push(salivaryCustomDesc);
            if (salivaryParts.length > 0) reportOut.push({ type: 'frame', text: `- Slinné žlázy: ${formatCzechList(salivaryParts)}.`, tableId: 'neck_salivary_main' });

            let salConcStr = ctx.mapStates({
                separator: '\n', suffix: '',
                items: [
                    { id: 'par_nod_RF_r', 1: 'Parotida vpravo s akumulujícím nodulem, pravděpodobně Warthinův tumor.', 2: 'Parotida vpravo s akumulujícími noduly, pravděpodobně Warthinův tumor.' },
                    { id: 'par_nod_RF_l', 1: 'Parotida vlevo s akumulujícím nodulem, pravděpodobně Warthinův tumor.', 2: 'Parotida vlevo s akumulujícími noduly, pravděpodobně Warthinův tumor.' },
                    { id: 'sub_nod_RF_r', 1: 'Submandibulární žláza vpravo s akumulujícím nodulem, pravděpodobně Warthinův tumor.', 2: 'Submandibulární žláza vpravo s akumulujícími noduly, pravděpodobně Warthinův tumor.' },
                    { id: 'sub_nod_RF_l', 1: 'Submandibulární žláza vlevo s akumulujícím nodulem, pravděpodobně Warthinův tumor.', 2: 'Submandibulární žláza vlevo s akumulujícími noduly, pravděpodobně Warthinův tumor.' }
                ]
            }).trim();
            let customSalivaryConc = ctx.field('salivary_custom_conc');
            if (salConcStr || customSalivaryConc) {
                let s = [salConcStr, customSalivaryConc].filter(Boolean).join('\n');
                concInc.push({ type: 'frame', text: s, tableId: 'neck_salivary_main' });
            }

            let farRep = [];
            const stateMapFar = { 'poop': 'pooperační', 'porad': 'poradiační', 'oboje': 'pooperační a poradiační' };
            
            ['oro', 'hypo'].forEach(part => {
                let r = ctx.text(`far_asym_${part}_r`), l = ctx.text(`far_asym_${part}_l`);
                if (r && r !== '0' && l && l !== '0' && r === l) {
                    farRep.push(`${stateMapFar[r]} asymetrie ${part}faryngu bilat.`);
                } else {
                    if (r && r !== '0') farRep.push(`${stateMapFar[r]} asymetrie ${part}faryngu vpravo`);
                    if (l && l !== '0') farRep.push(`${stateMapFar[l]} asymetrie ${part}faryngu vlevo`);
                }
            });

            let tonsR = ctx.isActive('far_tons_r'), tonsL = ctx.isActive('far_tons_l');
            if (tonsR && tonsL) {
                farRep.push('zvýšená akumulace RF v obou tonsilách');
                concInc.push({ type: 'frame', text: 'Zvýšená aktivita obou tonsil, korel. s klin. a ORL nál.', tableId: 'neck_pharynx_main' });
            } else if (tonsR || tonsL) {
                let side = tonsR ? 'vpravo' : 'vlevo';
                let sideAdj = tonsR ? 'pravé' : 'levé';
                farRep.push(`zvýšená akumulace RF v ${sideAdj} tonsile`);
                concInc.push({ type: 'frame', text: `Asymetricky zvýšená aktivita tonsily ${side}, vhodné ORL dovyšetření.`, tableId: 'neck_pharynx_main' });
            }

            let farDesc = ctx.field('pharynx_custom_desc');
            if (farDesc) farRep.push(farDesc);

            if (farRep.length > 0) {
                reportOut.push({ type: 'frame', text: `- Farynx: ${(formatCzechList(farRep))}.`, tableId: 'neck_pharynx_main' });
            }

            let pharynxCustomConc = ctx.field('pharynx_custom_conc');
            if (pharynxCustomConc) {
                concInc.push({ type: 'frame', text: pharynxCustomConc, tableId: 'neck_pharynx_main' });
            }

            let thyroidParts = [];
            if (ctx.isActive('thyr_enl')) thyroidParts.push('štítná žláza je difuzně zvětšená');
            if (ctx.isActive('thyr_rf'))  thyroidParts.push('štítná žláza s difuzně zvýšenou akumulací RF');

            const thyrResR = ctx.isActive('thyr_res_r');
            const thyrResL = ctx.isActive('thyr_res_l');
            if (thyrResR && thyrResL) thyroidParts.push('chybí po TTE');
            else if (thyrResR) thyroidParts.push('chybí pravý lalok po resekci');
            else if (thyrResL) thyroidParts.push('chybí levý lalok po resekci');

            let thyroidStates = ctx.mapStates({
                separator: ', ',
                items: [
                    { id: 'thyr_nod_r', 1: 'nespecifický drobný nodul vpravo', 2: 'nespecifické drobné noduly vpravo' },
                    { id: 'thyr_nod_l', 1: 'nespecifický drobný nodul vlevo', 2: 'nespecifické drobné noduly vlevo' },
                    { id: 'thyr_nod_rf_r', 1: 'RF aktivní nodul vpravo', 2: 'RF aktivní noduly vpravo' },
                    { id: 'thyr_nod_rf_l', 1: 'RF aktivní nodul vlevo', 2: 'RF aktivní noduly vlevo' },
                    { id: 'thyr_cys_r', 1: 'cysta vpravo', 2: 'cysty vpravo' },
                    { id: 'thyr_cys_l', 1: 'cysta vlevo', 2: 'cysty vlevo' }
                ]
            });
            if (thyroidStates) thyroidParts.push(thyroidStates);
            let thyroidCustomDesc = ctx.field('thyroid_custom_desc');
            if (thyroidCustomDesc) thyroidParts.push(thyroidCustomDesc);
            if (thyroidParts.length > 0) reportOut.push({ type: 'frame', text: `- Thyroidea: ${formatCzechList(thyroidParts)}.`, tableId: 'neck_thyroid_main' });

            let thyrConcArr = [];
            if (ctx.isActive('thyr_enl')) thyrConcArr.push('Nespecifická struma.');
            if (ctx.isActive('thyr_rf'))  thyrConcArr.push('Difuzně zvýšená akumulace RF štítnice v rámci nespecifické thyreopatie.');
            let thyrStateConc = ctx.mapStates({
                separator: '\n', suffix: '',
                items: [
                    { id: 'thyr_nod_rf_r', 1: 'Štítná žláza vpravo s akumulujícím nodulem.', 2: 'Štítná žláza vpravo s akumulujícími noduly.' },
                    { id: 'thyr_nod_rf_l', 1: 'Štítná žláza vlevo s akumulujícím nodulem.', 2: 'Štítná žláza vlevo s akumulujícími noduly.' }
                ]
            }).trim();
            if (thyrStateConc) thyrConcArr.push(thyrStateConc);
            let customThyroidConc = ctx.field('thyroid_custom_conc');
            if (customThyroidConc) thyrConcArr.push(customThyroidConc);
            
            if (thyrConcArr.length > 0) {
                concInc.push({ type: 'frame', text: thyrConcArr.join('\n'), tableId: 'neck_thyroid_main' });
            }

            return { 
                report: reportOut, 
                conclusion: { main: concMain, incidental: concInc } 
            };
        }
    }