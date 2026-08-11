const RegionAbdomen = {
    title: 'Břicho',
    layout: (helpers) => {
        let layoutNodes = [];

            // 1. Lesions (Generic)
            const lesInsts = Store.instances?.['abdomen_lesion_main'] || [];
            lesInsts.forEach((instId, idx) => {
                const p = `al_${instId}`;
                
                const t1 = helpers.Table2colNormal(`${p}_loc1_liver`, [
                    [ 'Játra:', { btn: `${p}_p_ja`, states: ['0', '+', 'pravý l.', 'levý l.'] } ],
                    [ 'S1:', { btn: `${p}_p_ja_s1`, states: ['0', '+'] } ], [ 'S2:', { btn: `${p}_p_ja_s2`, states: ['0', '+'] } ],
                    [ 'S3:', { btn: `${p}_p_ja_s3`, states: ['0', '+'] } ], [ 'S4A:', { btn: `${p}_p_ja_s4a`, states: ['0', '+'] } ],
                    [ 'S4B:', { btn: `${p}_p_ja_s4b`, states: ['0', '+'] } ], [ 'S5:', { btn: `${p}_p_ja_s5`, states: ['0', '+'] } ],
                    [ 'S6:', { btn: `${p}_p_ja_s6`, states: ['0', '+'] } ], [ 'S7:', { btn: `${p}_p_ja_s7`, states: ['0', '+'] } ],
                    [ 'S8:', { btn: `${p}_p_ja_s8`, states: ['0', '+'] } ], [ 'Všechny:', { btn: `${p}_p_ja_vse`, states: ['0', '+'] } ]
                ]);
                const t2 = helpers.Table2colNormal(`${p}_loc2_gi`, [
                    [ 'Žlučník:', { btn: `${p}_p_zl`, states: ['0', '+', 'fundus', 'tělo', 'krček'] } ],
                    [ 'Pankreas:', { btn: `${p}_p_pa`, states: ['0', '+', 'hlava', 'tělo', 'kauda'] } ],
                    [ 'Slezina:', { btn: `${p}_p_sl`, states: ['0', '+'] } ],
                    [ 'Mesenterium:', { btn: `${p}_p_me`, states: ['0', '+'] } ],
                    [ 'Peritoneum:', { btn: `${p}_p_pe`, states: ['0', '+', 'omentum', 'pánevní'] } ],
                    [ 'Žaludek:', { btn: `${p}_p_za`, states: ['0', '+', 'kardie', 'fundus', 'tělo', 'pylorus'] } ],
                    [ 'Tračník:', { btn: `${p}_p_tr`, states: ['0', '+', 'anus', 'anorektum', 'rektum', 'sigma', 'descendens', 'transverzum', 'ascendens', 'cékum', 'appendix'] } ]
                ]);
                const t3 = helpers.Table3colRCL(`${p}_loc3_pelvis`, [
                    [ { btn: `${p}_p_nadl_r`, states: ['0', '+'] }, 'nadledvina', { btn: `${p}_p_nadl_l`, states: ['0', '+'] } ],
                    [ { btn: `${p}_p_led_r`, states: ['0', '+', 'horní', 'střední', 'dolní'] }, 'ledvina', { btn: `${p}_p_led_l`, states: ['0', '+', 'horní', 'střední', 'dolní'] } ],
                    [ { btn: `${p}_p_ova_r`, states: ['0', '+'] }, 'ovárium', { btn: `${p}_p_ova_l`, states: ['0', '+'] } ],
                    [ '', { btn: `${p}_p_del`, states: ['děloha', 'děloha', 'krček', 'tělo', 'fundus'] }, '' ],
                    [ '', { btn: `${p}_p_mec`, states: ['měchýř', 'měchýř'] }, '' ],
                    [ { btn: `${p}_p_pro_r`, states: ['0', '+'] }, 'prostata', { btn: `${p}_p_pro_l`, states: ['0', '+'] } ],
                    [ { btn: `${p}_p_tes_r`, states: ['0', '+'] }, 'testes', { btn: `${p}_p_tes_l`, states: ['0', '+'] } ]
                ]);

                const wrapper = document.createElement('div'); wrapper.className = 'row'; wrapper.style.alignItems = 'flex-start'; wrapper.style.gap = '15px';
                wrapper.appendChild(t1); wrapper.appendChild(t2); wrapper.appendChild(t3);
                const locContainer = document.createElement('div'); locContainer.className = 'table-wrapper'; locContainer.style.width = '100%';
                const locTitle = document.createElement('div'); locTitle.className = 'sub-table-title'; locTitle.textContent = 'Lokalizace';
                locContainer.appendChild(locTitle); locContainer.appendChild(wrapper);

                layoutNodes.push(
                    helpers.LesionMain(`abdomen_lesion_main__${instId}`, `Léze (${idx + 1})`, [
                        ...LESIONS_DEFINITION.getLesionRowsPre(helpers, p),
                        locContainer,
                        ...LESIONS_DEFINITION.getLesionRowsPost(helpers, p, `${p}_met`, `${p}_e`)
                    ])
                );
            });

            // 2. Lymphnodes (Generic)
            const lnInsts = Store.instances?.['abdomen_lymphnode_main'] || [];
            lnInsts.forEach((instId, idx) => {
                const p = `aln_${instId}`;
                layoutNodes.push(
                    helpers.LesionMain(`abdomen_lymphnode_main__${instId}`, `Lymfadenopatie (${idx + 1})`, [
                        ...LESIONS_DEFINITION.getLymphNodeRowsPre(helpers, p),
                        helpers.Table3colRCL(`${p}_loc1`, 'Lokalizace', [
                            [ '', { btn: `${p}_p_cel_c`, type: 'basic', text: 'celiakálně' }, '' ], [ '', { btn: `${p}_p_per_c`, type: 'basic', text: 'perigastricky' }, '' ],
                            [ '', { btn: `${p}_p_hil_c`, type: 'basic', text: 'jat. hilus' }, '' ], [ '', { btn: `${p}_p_por_c`, type: 'basic', text: 'portokaválně' }, '' ],
                            [ '', { btn: `${p}_p_ppa_c`, type: 'basic', text: 'peripankreat.' }, '' ],
                            [ '', [ { btn: `${p}_p_mes_r`, type: 'basic', text: 'mesent.' }, { btn: `${p}_p_mes_l`, type: 'basic', text: 'mesent.' } ], '' ], [ '', { btn: `${p}_p_ret_c`, type: 'basic', text: 'retroperit.' }, '' ],
                            [ '', [ { btn: `${p}_p_par_r`, type: 'basic', text: 'para-Ao' }, { btn: `${p}_p_par_l`, type: 'basic', text: 'para-Ao' } ], '' ], [ '', { btn: `${p}_p_pan_c`, type: 'basic', text: 'pánevní' }, '' ],
                            [ { btn: `${p}_p_cia_r`, type: 'basic', text: 'AIC' }, '', { btn: `${p}_p_cia_l`, type: 'basic', text: 'AIC' } ],
                            [ { btn: `${p}_p_eia_r`, type: 'basic', text: 'AIE' }, '', { btn: `${p}_p_eia_l`, type: 'basic', text: 'AIE' } ], [ { btn: `${p}_p_iia_r`, type: 'basic', text: 'AII' }, '', { btn: `${p}_p_iia_l`, type: 'basic', text: 'AII' } ],
                            [ { btn: `${p}_p_obt_r`, type: 'basic', text: 'obturátor' }, '', { btn: `${p}_p_obt_l`, type: 'basic', text: 'obturátor' } ], [ '', [ { btn: `${p}_p_pre_r`, type: 'basic', text: 'presakr.' }, { btn: `${p}_p_pre_l`, type: 'basic', text: 'presakr.' } ], '' ],
                            [ '', [ { btn: `${p}_p_mez_r`, type: 'basic', text: 'mezorekt.' }, { btn: `${p}_p_mez_l`, type: 'basic', text: 'mezorekt.' } ], '' ], [ { btn: `${p}_p_ing_r`, type: 'basic', text: 'inguinálně' }, '', { btn: `${p}_p_ing_l`, type: 'basic', text: 'inguinálně' } ]
                        ]),
                        ...LESIONS_DEFINITION.getLymphNodeRowsPost(helpers, p, `${p}_met`, `${p}_e`)
                    ])
                );
            });

            // 3. Játra (Obsahuje podsekce, ponechán titulek)
            layoutNodes.push(helpers.TableMain('abdomen_jatra_main', 'Játra', [
                helpers.Table3colRL('ja_fokal_table', 'Fokální změny', [
                    [ { btn: 'ja_cys_r', states: ['0', '1', 'více'] }, 'Cysta', { btn: 'ja_cys_l', states: ['0', '1', 'více'] } ],
                    [ { btn: 'ja_inc_r', states: ['0', '1', 'více'] }, 'Incidentalom', { btn: 'ja_inc_l', states: ['0', '1', 'více'] } ],
                    [ { btn: 'ja_hem_r', states: ['0', '1', 'více'] }, 'Hemangiom', { btn: 'ja_hem_l', states: ['0', '1', 'více'] } ],
                    [ { btn: 'ja_dil_r', states: ['0', '+'] }, 'Dilatace žlučovodů', { btn: 'ja_dil_l', states: ['0', '+'] } ]
                ]),
                helpers.Table2colNormal('ja_difuz_table', 'Difuzní změny', [
                    [ 'Zvětšení', { btn: 'ja_zvet', states: ['0', 'mírné', 'výrazné'] } ],
                    [ 'Difuzní léze', { btn: 'ja_dif', states: ['0', 'fibróza', 'cirhóza'] } ],
                    [ 'Portální hypertenze', { btn: 'ja_port', states: ['0', '+'] } ]
                ]),
                helpers.Table3colRL('ja_op_table', 'Operace', [
                    [ { btn: 'ja_hemi_r', states: ['0', '+'] }, 'Hemihepatektomie', { btn: 'ja_hemi_l', states: ['0', '+'] } ],
                    [ { btn: 'ja_res_r', states: ['0', '+'] }, 'Resekce', { btn: 'ja_res_l', states: ['0', '+'] } ],
                    [ { btn: 'ja_rfa_r', states: ['0', '+'] }, 'RFA', { btn: 'ja_rfa_l', states: ['0', '+'] } ]
                ]),
                helpers.Table1col('ja_ost_add', [ { field: 'text', id: 'ja_custom_desc', placeholder: 'vlastní popis...' }, { field: 'text', id: 'ja_custom_conc', placeholder: 'vlastní závěr...' } ])
            ]));

            // 4. Žlučník
            layoutNodes.push(helpers.TableMain('abdomen_zlucnik_main', 'Žlučník a cesty', [
                helpers.Table2colNormal('zl_table', [
                    [ 'Litiáza', { btn: 'zl_lit', states: ['0', 'sludge', '1', 'více'] } ],
                    [ 'Cholecystitis', { btn: 'zl_chol', states: ['0', 'mírná', 'výrazná'] } ],
                    [ 'Dilatace d. choledochus', { btn: 'zl_chod', states: ['0', 'mírná', 'výrazná'] } ],
                    [ 'CHCE', { btn: 'zl_chce', states: ['0', '+'] } ]
                ]),
                helpers.Table1col('zl_ost_add', [ { field: 'text', id: 'zl_custom_desc', placeholder: 'vlastní popis...' }, { field: 'text', id: 'zl_custom_conc', placeholder: 'vlastní závěr...' } ])
            ]));

            // 5. Slezina
            layoutNodes.push(helpers.TableMain('abdomen_slezina_main', 'Slezina', [
                helpers.Table2colNormal('sl_table', [
                    [ 'Zvětšená', { btn: 'sl_zvet', states: ['0', '+'] }, { field: 'mm', id: 'sl_zvet_mm', placeholder: 'mm' } ],
                    [ 'Difuzně RF+', { btn: 'sl_akt', states: ['0', '+'] } ],
                    [ 'Cystoid', { btn: 'sl_cys', states: ['0', '1', 'více'] } ],
                    [ 'Hemangiom', { btn: 'sl_hem', states: ['0', '1', 'více'] } ],
                    [ 'Infarkt', { btn: 'sl_inf', states: ['0', '1', 'více'] } ],
                    [ 'Splenektomie', { btn: 'sl_spl', states: ['0', '+'] } ],
                    [ 'Regenerát', { btn: 'sl_reg', states: ['0', '+'] } ]
                ]),
                helpers.Table1col('sl_ost_add', [ { field: 'text', id: 'sl_custom_desc', placeholder: 'vlastní popis...' }, { field: 'text', id: 'sl_custom_conc', placeholder: 'vlastní závěr...' } ])
            ]));

            // 6. Žaludek
            layoutNodes.push(helpers.TableMain('abdomen_zaludek_main', 'Žaludek', [
                helpers.Table2colNormal('za_table', [
                    [ 'Resekce', { btn: 'za_res', states: ['0', 'parc.', 'total.', 'sleeve'] } ],
                    [ 'Bariatrie', { btn: 'za_bar', states: ['0', 'bandáž', 'bypass'] } ],
                    [ 'Fundoplikace', { btn: 'za_fun', states: ['0', '+'] } ],
                    [ 'Sonda', { btn: 'za_son', states: ['0', 'PEG', 'NGS', 'NJS'] } ],
                    [ 'Zesílení stěny', { btn: 'za_zes', states: ['0', 'mírné', 'výrazné'] }, { btn: 'za_zes_loc', states: ['0', 'difuzně', 'kardie', 'korpus', 'antrum', 'pylorus'] } ]
                ]),
                helpers.Table1col('za_ost_add', [ { field: 'text', id: 'za_custom_desc', placeholder: 'vlastní popis...' }, { field: 'text', id: 'za_custom_conc', placeholder: 'vlastní závěr...' } ])
            ]));

            // 7. Pankreas
            layoutNodes.push(helpers.TableMain('abdomen_pankreas_main', 'Pankreas', [
                helpers.Table2colNormal('pa_table', [
                    [ 'Atrofie', { btn: 'pa_atr', states: ['0', 'mírná', 'výrazná', 'lipomatózní', 'kalcifikace'] } ],
                    [ 'Dilat. Wirsungu', { btn: 'pa_wir', states: ['0', '+'] }, { field: 'mm', id: 'pa_wir_mm', placeholder: 'mm' } ],
                    [ 'Cystoid', { btn: 'pa_cys', states: ['0', '1', 'více'] }, { field: 'mm', id: 'pa_cys_mm', placeholder: 'mm' } ],
                    [ 'Operace', { btn: 'pa_op', states: ['0', 'duodenopankreat.', 'total pankreat.', 'kauda', 'nekrektomie'] } ]
                ]),
                helpers.Table1col('pa_ost_add', [ { field: 'text', id: 'pa_custom_desc', placeholder: 'vlastní popis...' }, { field: 'text', id: 'pa_custom_conc', placeholder: 'vlastní závěr...' } ])
            ]));

            // 8. Tračník
            layoutNodes.push(helpers.TableMain('abdomen_tracnik_main', 'Tračník', [
                helpers.Table2colNormal('tr_table', [
                    [ 'Resekce', { btn: 'tr_res', states: ['0', 'P hemikol.', 'L hemikol.', 'sigmoidea', 'rekta', 'amputace'] } ],
                    [ 'Appendektomie', { btn: 'tr_app', states: ['0', 'APPE'] } ],
                    [ 'Stomie', { btn: 'tr_sto', states: ['0', 'kolostomie', 'ileostomie'] }, { btn: 'tr_sto_loc', states: ['0', 'vpravo', 'vlevo'] } ],
                    [ 'Fokus RF+', { btn: 'tr_fok', states: ['0', 'fokus', 'více fokusů'] }, { btn: 'tr_fok_loc', states: ['0', 'caecum', 'ascendens', 'transversum', 'descendens', 'sigmoideum', 'rektum'] } ],
                    [ 'Zesílení stěny', { btn: 'tr_zes', states: ['0', 'mírné', 'výrazné'] }, { btn: 'tr_zes_loc', states: ['0', 'tračník', 'rektum'] } ],
                    [ 'Divertikulóza', { btn: 'tr_div', states: ['0', '+', 'divertikulitida'] }, { btn: 'tr_div_loc', states: ['0', 'sigmoideum', 'descendens', 'difuzně'] } ]
                ]),
                helpers.Table1col('tr_ost_add', [ { field: 'text', id: 'tr_custom_desc', placeholder: 'vlastní popis...' }, { field: 'text', id: 'tr_custom_conc', placeholder: 'vlastní závěr...' } ])
            ]));

            // 9. Peritoneum
            layoutNodes.push(helpers.TableMain('abdomen_peritoneum_main', 'Peritoneum a mesenterium', [
                helpers.Table2colNormal('pe_table', [
                    [ 'Misty Mesenterium', { btn: 'pe_mis', states: ['0', 'zastření', 'panikulitis'] } ],
                    [ 'Ascites', { btn: 'pe_asc', states: ['0', 'diskrétně', 'malý', 'střední', 'výrazný'] } ],
                    [ 'Ascites minule', { btn: 'pe_asc_old', states: ['0', 'diskrétně', 'malý', 'střední', 'výrazný'] } ]
                ]),
                helpers.Table1col('pe_ost_add', [ { field: 'text', id: 'pe_custom_desc', placeholder: 'vlastní popis...' }, { field: 'text', id: 'pe_custom_conc', placeholder: 'vlastní závěr...' } ])
            ]));

            // 10. Nadledviny
            layoutNodes.push(helpers.TableMain('abdomen_nadledviny_main', 'Nadledviny', [
                helpers.Table3colRL('na_table', [
                    [ { btn: 'na_akt_r', states: ['0', '+'] }, 'RF+', { btn: 'na_akt_l', states: ['0', '+'] } ],
                    [ { btn: 'na_hyp_r', states: ['0', '+'] }, 'Hyperplázie', { btn: 'na_hyp_l', states: ['0', '+'] } ],
                    [ { btn: 'na_inc_r', states: ['0', 'B', 'I', 'M'] }, 'Incidentalom', { btn: 'na_inc_l', states: ['0', 'B', 'I', 'M'] } ],
                    [ { btn: 'na_mye_r', states: ['0', '+'] }, 'Myelolipom', { btn: 'na_mye_l', states: ['0', '+'] } ],
                    [ { btn: 'na_adr_r', states: ['0', '+'] }, 'Adrenalektomie', { btn: 'na_adr_l', states: ['0', '+'] } ]
                ]),
                helpers.Table1col('na_ost_add', [ { field: 'text', id: 'na_custom_desc', placeholder: 'vlastní popis...' }, { field: 'text', id: 'na_custom_conc', placeholder: 'vlastní závěr...' } ])
            ]));

            // 11. Ledviny (Obsahuje podsekce, ponechán titulek)
            layoutNodes.push(helpers.TableMain('abdomen_ledviny_main', 'Ledviny', [
                helpers.Table3colRL('le_fok_table', 'Fokální léze', [
                    [ { btn: 'le_cys_r', states: ['0', '1', 'více'] }, 'Cysta', { btn: 'le_cys_l', states: ['0', '1', 'více'] } ],
                    [ { btn: 'le_aml_r', states: ['0', '1', 'více'] }, 'AML', { btn: 'le_aml_l', states: ['0', '1', 'více'] } ],
                    [ { btn: 'le_jiz_r', states: ['0', '1', 'více'] }, 'Jizva', { btn: 'le_jiz_l', states: ['0', '1', 'více'] } ]
                ]),
                helpers.Table3colRL('le_obs_table', 'Obstrukce a derivace', [
                    [ { btn: 'le_hyd_r', states: ['0', 'I', 'II', 'III', 'IV'] }, 'Hydronefróza', { btn: 'le_hyd_l', states: ['0', 'I', 'II', 'III', 'IV'] } ],
                    [ { btn: 'le_lit_r', states: ['0', 'kaliko', 'pelvi', 'PU junkce', 'ureter', 'VU junkce'] }, 'Litiáza', { btn: 'le_lit_l', states: ['0', 'kaliko', 'pelvi', 'PU junkce', 'ureter', 'VU junkce'] } ],
                    [ { btn: 'le_ste_r', states: ['0', 'správně', 'dislokace'] }, 'Stent', { btn: 'le_ste_l', states: ['0', 'správně', 'dislokace'] } ],
                    [ { btn: 'le_nef_r', states: ['0', '+'] }, 'Nefrostomie', { btn: 'le_nef_l', states: ['0', '+'] } ]
                ]),
                helpers.Table3colRL('le_op_table', 'Operace', [
                    [ { btn: 'le_res_r', states: ['0', 'horní', 'střední', 'dolní'] }, 'Resekce', { btn: 'le_res_l', states: ['0', 'horní', 'střední', 'dolní'] } ],
                    [ { btn: 'le_nek_r', states: ['0', '+'] }, 'Nefrektomie', { btn: 'le_nek_l', states: ['0', '+'] } ]
                ]),
                helpers.Table1col('le_ost_add', [ { field: 'text', id: 'le_custom_desc', placeholder: 'vlastní popis...' }, { field: 'text', id: 'le_custom_conc', placeholder: 'vlastní závěr...' } ])
            ]));

            // 12. Močový měchýř
            layoutNodes.push(helpers.TableMain('abdomen_moc_mechyr_main', 'Močový měchýř', [
                helpers.Table2colNormal('mm_table', [
                    [ 'Katetr', { btn: 'mm_kat', states: ['0', 'PMK', 'epicystostomie'] } ],
                    [ 'Divertikl', { btn: 'mm_div', states: ['0', '1', 'více'] } ],
                    [ 'Stomie', { btn: 'mm_sto', states: ['0', 'urostomie', 'Bricker'] } ],
                    [ 'Operace', { btn: 'mm_op', states: ['0', 'TURB', 'cystektomie'] } ]
                ]),
                helpers.Table1col('mm_ost_add', [ { field: 'text', id: 'mm_custom_desc', placeholder: 'vlastní popis...' }, { field: 'text', id: 'mm_custom_conc', placeholder: 'vlastní závěr...' } ])
            ]));

            // 13. Děloha
            layoutNodes.push(helpers.TableMain('abdomen_deloha_main', 'Děloha', [
                helpers.Table2colNormal('de_table', [
                    [ 'Myom', { btn: 'de_myo', states: ['0', '1', 'více'] }, { btn: 'de_myo_loc', states: ['0', 'intramurální', 'subserózní', 'submukózní'] } ],
                    [ 'Endometrium', { btn: 'de_end', states: ['0', 'zesílení', 'tekutina'] }, { btn: 'de_end_int', states: ['0', 'mírné/á', 'výrazné/á'] } ],
                    [ 'Endo RF+', { btn: 'de_akt', states: ['0', '+'] } ],
                    [ 'IUD', { btn: 'de_iud', states: ['0', '+'] } ],
                    [ 'Hysterektomie', { btn: 'de_hys', states: ['0', '+'] } ]
                ]),
                helpers.Table1col('de_ost_add', [ { field: 'text', id: 'de_custom_desc', placeholder: 'vlastní popis...' }, { field: 'text', id: 'de_custom_conc', placeholder: 'vlastní závěr...' } ])
            ]));

            // 14. Ovária
            layoutNodes.push(helpers.TableMain('abdomen_ovaria_main', 'Ovária / Adnexa', [
                helpers.Table3colRL('ov_table', [
                    [ { btn: 'ov_pc_r', states: ['0', '1', 'více'] }, 'Prostá cysta', { btn: 'ov_pc_l', states: ['0', '1', 'více'] } ],
                    [ { btn: 'ov_kc_r', states: ['0', '1', 'více'] }, 'Komplexní cysta', { btn: 'ov_kc_l', states: ['0', '1', 'více'] } ],
                    [ { field: 'mm', id: 'ov_kc_mm_r', placeholder: 'mm' }, 'Velikost', { field: 'mm', id: 'ov_kc_mm_l', placeholder: 'mm' } ],
                    [ { btn: 'ov_akt_r', states: ['0', '+'] }, 'RF+', { btn: 'ov_akt_l', states: ['0', '+'] } ],
                    [ { btn: 'ov_adn_r', states: ['0', '+'] }, 'Adnexektomie', { btn: 'ov_adn_l', states: ['0', '+'] } ]
                ]),
                helpers.Table1col('ov_ost_add', [ { field: 'text', id: 'ov_custom_desc', placeholder: 'vlastní popis...' }, { field: 'text', id: 'ov_custom_conc', placeholder: 'vlastní závěr...' } ])
            ]));

            // 15. Prostata
            layoutNodes.push(helpers.TableMain('abdomen_prostata_main', 'Prostata', [
                helpers.Table2colNormal('pr_table', [
                    [ 'Zvětšená', { btn: 'pr_zvet', states: ['0', '+'] }, { field: 'mm', id: 'pr_zvet_ml', placeholder: 'ml' } ],
                    [ 'Fokus RF+', { btn: 'pr_fok', states: ['0', '+'] } ],
                    [ 'TURP', { btn: 'pr_tur', states: ['0', '+'] } ],
                    [ 'RAPE', { btn: 'pr_rap', states: ['0', '+'] } ]
                ]),
                helpers.Table1col('pr_ost_add', [ { field: 'text', id: 'pr_custom_desc', placeholder: 'vlastní popis...' }, { field: 'text', id: 'pr_custom_conc', placeholder: 'vlastní závěr...' } ])
            ]));

            // 16. Testes
            layoutNodes.push(helpers.TableMain('abdomen_testes_main', 'Testes a skrotum', [
                helpers.Table3colRL('te_table', [
                    [ { btn: 'te_hyd_r', states: ['0', '+'] }, 'Hydrokéla', { btn: 'te_hyd_l', states: ['0', '+'] } ],
                    [ { btn: 'te_var_r', states: ['0', '+'] }, 'Varikokéla', { btn: 'te_var_l', states: ['0', '+'] } ],
                    [ { btn: 'te_orc_r', states: ['0', '+'] }, 'Orchiektomie', { btn: 'te_orc_l', states: ['0', '+'] } ]
                ]),
                helpers.Table1col('te_ost_add', [ { field: 'text', id: 'te_custom_desc', placeholder: 'vlastní popis...' }, { field: 'text', id: 'te_custom_conc', placeholder: 'vlastní závěr...' } ])
            ]));

            // 17. Velké cévy
            layoutNodes.push(helpers.TableMain('abdomen_velke_cevy_main', 'Velké cévy', [
                helpers.Table2colNormal('vc_aneur_table', 'Aneurysma a Stentgraft', [
                    [ 'Aneurysma aorty', { btn: 'vc_an', states: ['0', 'suprarenální', 'subrenální', 'bifurkační'] }, { field: 'mm', id: 'vc_an_val', placeholder: 'mm' } ],
                    [ 'Stentgraft', { btn: 'vc_sg', states: ['0', '+'] } ]
                ]),
                helpers.Table3colRCL('vc_sklero_table', 'Ateroskleróza', [
                    [ '', { btn: 'vc_sk_aorta', type: 'basic', text: 'Aorta' }, '' ],
                    [ '', { btn: 'vc_sk_tc', type: 'basic', text: 'TC' }, '' ],
                    [ '', { btn: 'vc_sk_ams', type: 'basic', text: 'AMS' }, '' ],
                    [ { btn: 'vc_sk_cia_r', type: 'basic', text: 'AIC' }, '', { btn: 'vc_sk_cia_l', type: 'basic', text: 'AIC' } ],
                    [ { btn: 'vc_sk_eia_r', type: 'basic', text: 'AIE' }, '', { btn: 'vc_sk_eia_l', type: 'basic', text: 'AIE' } ],
                    [ { btn: 'vc_sk_iia_r', type: 'basic', text: 'AII' }, '', { btn: 'vc_sk_iia_l', type: 'basic', text: 'AII' } ],
                    [ { btn: 'vc_sk_fa_r', type: 'basic', text: 'FA' }, '', { btn: 'vc_sk_fa_l', type: 'basic', text: 'FA' } ]
                ]),
                helpers.Table3colRCL('vc_stent_table', 'Stenty', [
                    [ '', { btn: 'vc_st_aorta', type: 'basic', text: 'Aorta' }, '' ],
                    [ '', { btn: 'vc_st_tc', type: 'basic', text: 'TC' }, '' ],
                    [ '', { btn: 'vc_st_ams', type: 'basic', text: 'AMS' }, '' ],
                    [ { btn: 'vc_st_cia_r', type: 'basic', text: 'AIC' }, '', { btn: 'vc_st_cia_l', type: 'basic', text: 'AIC' } ],
                    [ { btn: 'vc_st_eia_r', type: 'basic', text: 'AIE' }, '', { btn: 'vc_st_eia_l', type: 'basic', text: 'AIE' } ],
                    [ { btn: 'vc_st_iia_r', type: 'basic', text: 'AII' }, '', { btn: 'vc_st_iia_l', type: 'basic', text: 'AII' } ],
                    [ { btn: 'vc_st_fa_r', type: 'basic', text: 'FA' }, '', { btn: 'vc_st_fa_l', type: 'basic', text: 'FA' } ]
                ]),
                helpers.Table3colRL('vc_bypass_table', 'Bypassy', [
                    [ { btn: 'vc_by_af_r', states: ['0', '+'] }, 'Aortofemorální', { btn: 'vc_by_af_l', states: ['0', '+'] } ],
                    [ { btn: 'vc_by_if_r', states: ['0', '+'] }, 'Iliofemorální', { btn: 'vc_by_if_l', states: ['0', '+'] } ],
                    [ { btn: 'vc_by_ff_r', states: ['0', '+'] }, 'Femorofemorální', { btn: 'vc_by_ff_l', states: ['0', '+'] } ]
                ]),
                helpers.Table1col('vc_ost_add', [ { field: 'text', id: 'vc_custom_desc', placeholder: 'vlastní popis...' }, { field: 'text', id: 'vc_custom_conc', placeholder: 'vlastní závěr...' } ])
            ]));

            // 18. Břišní stěna
            layoutNodes.push(helpers.TableMain('abdomen_wall_main', 'Břišní stěna', [
                helpers.Table3colRCL('aw_table', [
                    [ { btn: 'aw_sc_r', states: ['0', '+'] }, 'RF podkoží', { btn: 'aw_sc_l', states: ['0', '+'] } ],
                    [ { btn: 'aw_scar_r', states: ['0', 'RF-', 'RF+'] }, 'RF jizvy', { btn: 'aw_scar_l', states: ['0', 'RF-', 'RF+'] } ],
                    [ { btn: 'aw_her_scar_r', states: ['0', 'malá', 'střední', 'velká'] }, 'Hernie v jizvě', { btn: 'aw_her_scar_l', states: ['0', 'malá', 'střední', 'velká'] } ],
                    [ '', 'Supraumbilik.', '' ],
                    [ '', { btn: 'aw_her_supra', states: ['0', 'malá', 'střední', 'velká'] }, '' ],
                    [ '', 'Umbilik.', '' ],
                    [ '', { btn: 'aw_her_umb', states: ['0', 'malá', 'střední', 'velká'] }, '' ],
                    [ { btn: 'aw_her_ing_r', states: ['0', 'malá', 'střední', 'velká'] }, 'Inguinální', { btn: 'aw_her_ing_l', states: ['0', 'malá', 'střední', 'velká'] } ]
                ]),
                helpers.Table1col('aw_ost_add', [ { field: 'text', id: 'aw_custom_desc', placeholder: 'vlastní popis...' }, { field: 'text', id: 'aw_custom_conc', placeholder: 'vlastní závěr...' } ])
            ]));

            layoutNodes.push(helpers.TableMain('abdomen_ostatni_main', 'Ostatní nálezy', [
                helpers.Table1col('ostatni_ost_add', [
                    { field: 'text', id: 'ostatni_custom_desc', placeholder: 'vlastní popis...' },
                    { field: 'text', id: 'ostatni_custom_conc', placeholder: 'vlastní závěr...' }
                ])
            ]));

            return layoutNodes;
        },

        compile: (ctx) => {
            let reportOut = [{ type: 'heading', text: 'Břicho:', action: 'open-region', regionId: 'abdomen' }];
            let concMain = [];
            let concInc = [];
            
            const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
            const formatList = formatCzechList;
            const examId = ctx.examId || 'default';

            const isPET = (examId || '').toLowerCase().includes('pet');

            // Generic helper for R/L elements
            const checkSide = (baseId) => {
                let p = ctx.text(`${baseId}_r`), l = ctx.text(`${baseId}_l`);
                if ((!p || p === '0') && (!l || l === '0')) return null;
                let isP = p && p !== '0', isL = l && l !== '0';
                return { p, l, isP, isL, sideText: (isP && isL) ? 'bilat.' : (isP ? 'vpravo' : 'vlevo'), isPlural: (p === 'více' || l === 'více' || (isP && isL)) };
            };

            const lesInsts = Store.instances?.['abdomen_lesion_main'] || [];
            let highAct = false, badEtio = false;
            lesInsts.forEach(id => {
                if (['intermediární', 'zvýšená', 'vysoká'].includes(ctx.text(`al_${id}_met_act`, true))) highAct = true;
                if (!ctx.isActive(`al_${id}_e_b`) && !ctx.isActive(`al_${id}_e_inf`)) badEtio = true;
            });

            if (lesInsts.length === 0 || (lesInsts.length > 0 && isPET && !highAct)) {
                reportOut.push({ type: 'frame', text: isPET ? 'Bez patrných hyperakumulujících ložiskových změn.' : 'Bez patrných ložiskových změn.', tableId: 'abdomen_lesion_main', dimmed: true });
            }

            lesInsts.forEach(instId => {
                const p = `al_${instId}`;
                    let lokace = [];
                    
                    let ja = ctx.text(`${p}_p_ja`);
                    let segs = [];
                    ['s1', 's2', 's3', 's4a', 's4b', 's5', 's6', 's7', 's8'].forEach(s => {
                        if (ctx.isActive(`${p}_p_ja_${s}`)) segs.push(s.toUpperCase());
                    });
                    let vse = ctx.isActive(`${p}_p_ja_vse`);

                    if (ja === 'pravý l.') lokace.push('v pravém laloku jater');
                    else if (ja === 'levý l.') lokace.push('v levém laloku jater');
                    else if (ja === '+') lokace.push('jater');

                    if (vse) lokace.push('ve všech segmentech jater');
                    else if (segs.length > 0) lokace.push(`v ${segs.join(', ')} jater`);

                    let zl = ctx.text(`${p}_p_zl`);
                    if (zl === '+') lokace.push('stěny žlučníku');
                    else if (zl === 'fundus') lokace.push('fundu žlučníku');
                    else if (zl === 'tělo') lokace.push('těla žlučníku');
                    else if (zl === 'krček') lokace.push('krčku žlučníku');

                    let pa = ctx.text(`${p}_p_pa`);
                    if (pa === '+') lokace.push('pankreatu');
                    else if (pa === 'hlava') lokace.push('hlavy pankreatu');
                    else if (pa === 'tělo') lokace.push('těla pankreatu');
                    else if (pa === 'kauda') lokace.push('kaudy pankreatu');

                    let za = ctx.text(`${p}_p_za`);
                    if (za === '+') lokace.push('žaludku');
                    else if (za === 'kardie') lokace.push('kardie žaludku');
                    else if (za === 'fundus') lokace.push('fundu žaludku');
                    else if (za === 'tělo') lokace.push('těla žaludku');
                    else if (za === 'pylorus') lokace.push('pyloru žaludku');

                    let tr = ctx.text(`${p}_p_tr`);
                    const trMap = {
                        '+': 'tračníku', 'anus': 'anu', 'anorektum': 'anorekta', 'rektum': 'rekta',
                        'sigma': 'sigmatu', 'descendens': 'tračníku descendens', 'transverzum': 'tračníku transverzum',
                        'ascendens': 'tračníku ascendens', 'cékum': 'céka', 'appendix': 'appendixu'
                    };
                    if (tr && trMap[tr]) lokace.push(trMap[tr]);

                    if (ctx.isActive(`${p}_p_sl`)) lokace.push('sleziny');
                    if (ctx.isActive(`${p}_p_me`)) lokace.push('mesenteria');
                    
                    let pe = ctx.text(`${p}_p_pe`);
                    if (pe === '+') lokace.push('peritonea');
                    else if (pe === 'omentum') lokace.push('omenta');
                    else if (pe === 'pánevní') lokace.push('pánevního peritonea');

                    const processPair = (id, rootRight, rootLeft, rootBilat) => {
                        let txtR = ctx.text(`${p}_p_${id}_r`);
                        let txtL = ctx.text(`${p}_p_${id}_l`);
                        let actR = txtR && txtR !== '0';
                        let actL = txtL && txtL !== '0';

                        if (actR && actL) {
                            if (txtR === '+' && txtL === '+') {
                                lokace.push(rootBilat);
                            } else if (txtR === txtL && txtR !== '+') {
                                if (txtR === 'horní') lokace.push(`horních pólů ${rootBilat}`);
                                else if (txtR === 'dolní') lokace.push(`dolních pólů ${rootBilat}`);
                                else if (txtR === 'střední') lokace.push(`středních částí ${rootBilat}`);
                            } else {
                                let strR = txtR === '+' ? rootRight : (txtR === 'horní' ? `horního pólu ${rootRight}` : (txtR === 'dolní' ? `dolního pólu ${rootRight}` : `střední části ${rootRight}`));
                                let strL = txtL === '+' ? rootLeft : (txtL === 'horní' ? `horního pólu ${rootLeft}` : (txtL === 'dolní' ? `dolního pólu ${rootLeft}` : `střední části ${rootLeft}`));
                                lokace.push(`${strR} a ${strL}`);
                            }
                        } else if (actR) {
                            if (txtR === '+') lokace.push(rootRight);
                            else if (txtR === 'horní') lokace.push(`horního pólu ${rootRight}`);
                            else if (txtR === 'dolní') lokace.push(`dolního pólu ${rootRight}`);
                            else if (txtR === 'střední') lokace.push(`střední části ${rootRight}`);
                        } else if (actL) {
                            if (txtL === '+') lokace.push(rootLeft);
                            else if (txtL === 'horní') lokace.push(`horního pólu ${rootLeft}`);
                            else if (txtL === 'dolní') lokace.push(`dolního pólu ${rootLeft}`);
                            else if (txtL === 'střední') lokace.push(`střední části ${rootLeft}`);
                        }
                    };

                    processPair('nadl', 'pravé nadledviny', 'levé nadledviny', 'nadledvin bilat.');
                    processPair('led', 'pravé ledviny', 'levé ledviny', 'ledvin bilat.');
                    processPair('ova', 'pravého ovária', 'levého ovária', 'ovárií bilat.');
                    processPair('tes', 'pravého varlete', 'levého varlete', 'varlat bilat.');

                    let proR = ctx.isActive(`${p}_p_pro_r`);
                    let proL = ctx.isActive(`${p}_p_pro_l`);
                    if (proR && proL) lokace.push('prostaty bilat.');
                    else if (proR) lokace.push('prostaty vpravo');
                    else if (proL) lokace.push('prostaty vlevo');

                    if (ctx.isActive(`${p}_p_del`)) {
                        let del = ctx.text(`${p}_p_del`);
                        if (del === 'děloha') lokace.push('dělohy');
                        else if (del === 'krček') lokace.push('krčku dělohy');
                        else if (del === 'tělo') lokace.push('těla dělohy');
                        else if (del === 'fundus') lokace.push('fundu dělohy');
                    }

                    if (ctx.isActive(`${p}_p_mec`)) {
                        let mec = ctx.text(`${p}_p_mec`);
                        if (mec === 'měchýř') lokace.push('měchýře');
                    }

                    let lokText = lokace.length > 0 ? formatCzechList(lokace) : '';
                    let d = LESIONS_DEFINITION.parseDetails(ctx, examId, 'abdomen', p, `${p}_met`, `${p}_e`, false);

                    if (d.hasAny || lokace.length > 0) {
                        let repSentence = `${d.baseText} ${lokText}${d.doplneniStr}${d.vzhledText}${d.metrikyStr}.`.replace(/\s+/g, ' ').replace(' .', '.').trim();
                        reportOut.push({ type: 'frame', text: repSentence, tableId: `abdomen_lesion_main__${instId}` });
                        
                        let concSentence = `${d.baseText} ${lokText}${d.doplneniStr}${d.actStr}${d.dynStr}`;
                        if (d.etioStr) concSentence += `: ${d.etioStr}.`;
                        else concSentence += `.`;
                        
                        concSentence = concSentence.replace(/\s+/g, ' ').replace(' : ', ': ').replace(' .', '.');
                        concMain.push({ type: 'frame', text: concSentence, tableId: `abdomen_lesion_main__${instId}` });
                    }
                });

            if (lesInsts.length > 0 && (!isPET || highAct) && !badEtio) {
                reportOut.push({ type: 'frame', text: 'Jinak bez patrných ložiskových změn.', tableId: 'abdomen_lesion_main', dimmed: true });
            }

            const lnInsts = Store.instances?.['abdomen_lymphnode_main'] || [];
            if (lnInsts.length === 0) {
                reportOut.push({ type: 'frame', text: isPET ? 'Bez patrné hyperakumulující lymfadenopatie.' : 'Bez patrné lymfadenopatie.', tableId: 'abdomen_lymphnode_main', dimmed: true });
            } else {
                lnInsts.forEach(instId => {
                    const p = `aln_${instId}`;
                    let lokaceLN = [];
                    
                    if (ctx.isActive(`${p}_p_hil_c`)) lokaceLN.push('v jaterním hilu');
                    if (ctx.isActive(`${p}_p_por_c`)) lokaceLN.push('portokaválně');
                    if (ctx.isActive(`${p}_p_cel_c`)) lokaceLN.push('celiakálně');
                    if (ctx.isActive(`${p}_p_per_c`)) lokaceLN.push('perigastricky');
                    if (ctx.isActive(`${p}_p_ppa_c`)) lokaceLN.push('peripankreaticky');
                    if (ctx.isActive(`${p}_p_ret_c`)) lokaceLN.push('v retroperitoneu');
                    if (ctx.isActive(`${p}_p_pan_c`)) lokaceLN.push('v pánvi');

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

                    let lokTextLN = lokaceLN.length > 0 ? formatCzechList(lokaceLN) : '';
                    let dLN = LESIONS_DEFINITION.parseDetails(ctx, examId, 'abdomen', p, `${p}_met`, `${p}_e`, true);

                    if (dLN.hasAny || lokaceLN.length > 0) {
                        let repSentence = `${dLN.baseText}${dLN.doplneniStr} ${lokTextLN}${dLN.vzhledText}${dLN.metrikyStr}.`.replace(/\s+/g, ' ').replace(' .', '.');
                        reportOut.push({ type: 'frame', text: repSentence, tableId: `abdomen_lymphnode_main__${instId}` });
                        
                        let concSentence = `${dLN.baseText}${dLN.doplneniStr} ${lokTextLN}${dLN.actStr}${dLN.dynStr}`;
                        if (dLN.etioStr) concSentence += `: ${dLN.etioStr}.`;
                        else concSentence += `.`;
                        
                        concSentence = concSentence.replace(/\s+/g, ' ').replace(' : ', ': ').replace(' .', '.');
                        concMain.push({ type: 'frame', text: concSentence, tableId: `abdomen_lymphnode_main__${instId}` });
                    }
                });
            }

            // 3. Játra
            let jaRep = [];
            let jaCys = checkSide('ja_cys'); if (jaCys) jaRep.push(`${jaCys.isPlural ? 'prosté cysty' : 'prostá cysta'} ${jaCys.p !== '0' && jaCys.l !== '0' ? 'v obou lalocích' : jaCys.isP ? 'v pravém laloku' : 'v levém laloku'}`);
            let jaInc = checkSide('ja_inc'); if (jaInc) { jaRep.push(`${jaInc.isPlural ? 'necharakteristická ložiska' : 'necharakteristické ložisko'} ${jaInc.p !== '0' && jaInc.l !== '0' ? 'v obou lalocích' : jaInc.isP ? 'v pravém laloku' : 'v levém laloku'}`); concInc.push({ type: 'frame', text: `${jaInc.isPlural ? 'Incidentalomy' : 'Incidentalom'} ${jaInc.p !== '0' && jaInc.l !== '0' ? 'v obou lalocích' : jaInc.isP ? 'v pravém laloku jater' : 'v levém laloku jater'} k dovyšetření.`, tableId: 'abdomen_jatra_main' }); }
            let jaHem = checkSide('ja_hem'); if (jaHem) jaRep.push(`${jaHem.isPlural ? 'ložiska' : 'ložisko'} s periferním sycením (${jaHem.isPlural ? 'hemangiomy' : 'hemangiom'}) ${jaHem.p !== '0' && jaHem.l !== '0' ? 'v obou lalocích' : jaHem.isP ? 'v pravém laloku' : 'v levém laloku'}`);
            let jaDil = checkSide('ja_dil'); if (jaDil) { jaRep.push(`dilatace intrahepatálních žlučovodů ${jaDil.p !== '0' && jaDil.l !== '0' ? 'v obou lalocích' : jaDil.isP ? 'v pravém laloku' : 'v levém laloku'}`); concInc.push({ type: 'frame', text: `Dilatace intrahepatálních žlučovodů ${jaDil.p !== '0' && jaDil.l !== '0' ? 'v obou lalocích' : jaDil.isP ? 'v pravém laloku' : 'v levém laloku'}.`, tableId: 'abdomen_jatra_main' }); }
            let jaZvet = ctx.text('ja_zvet'); if (jaZvet && jaZvet !== '0') { jaRep.push(`${jaZvet} zvětšení`); concInc.push({ type: 'frame', text: `${cap(jaZvet)} hepatomegalie.`, tableId: 'abdomen_jatra_main' }); }
            let jaDif = ctx.text('ja_dif'); if (jaDif === 'fibróza') jaRep.push("parenchym mírně nehomogenní"); else if (jaDif === 'cirhóza') { jaRep.push("zmenšení s laločnatým povrchem"); concMain.push({ type: 'frame', text: "Známky jaterní cirhózy.", tableId: 'abdomen_jatra_main' }); }
            if (ctx.isActive('ja_port')) { jaRep.push("rozšířená v. portae a kolaterály"); concMain.push({ type: 'frame', text: "Známky portální hypertenze.", tableId: 'abdomen_jatra_main' }); }
            let jaOps = [];
            ['hemi', 'res', 'rfa'].forEach(op => { let o = checkSide(`ja_${op}`); if (o) jaOps.push(`${op === 'hemi' ? 'hemihepatektomii' : op === 'res' ? 'resekci' : 'RFA'} ${o.sideText}`); });
            if (jaOps.length) jaRep.push(`stav po ${formatList(jaOps)}`);
            let jaDesc = ctx.field('ja_custom_desc'); if (jaDesc) jaRep.push(jaDesc);
            if (jaRep.length > 0) reportOut.push({ type: 'frame', text: `- Játra: ${formatList(jaRep)}.`, tableId: 'abdomen_jatra_main' });
            let jaConc = ctx.field('ja_custom_conc'); if (jaConc) concInc.push({ type: 'frame', text: jaConc, tableId: 'abdomen_jatra_main' });

            // 4. Žlučník
            let zlRep = [];
            let zlLit = ctx.text('zl_lit'); if (zlLit && zlLit !== '0') { zlRep.push(zlLit === 'sludge' ? 'v lumen sludge' : (zlLit === '1' ? 'solitární konkrement' : 'vícečetné konkrementy')); concInc.push({ type: 'frame', text: zlLit === 'sludge' ? "Sludge ve žlučníku." : "Cholecystolitiáza.", tableId: 'abdomen_zlucnik_main' }); }
            let zlChol = ctx.text('zl_chol'); if (zlChol && zlChol !== '0') { zlRep.push(`${zlChol} zesílení stěny a edém okolí`); concMain.push({ type: 'frame', text: `${cap(zlChol)} cholecystitis.`, tableId: 'abdomen_zlucnik_main' }); }
            let zlChod = ctx.text('zl_chod'); if (zlChod && zlChod !== '0') { zlRep.push(`${zlChod} dilatace d. choledochus`); concInc.push({ type: 'frame', text: `${cap(zlChod)} dilatace d. choledochus.`, tableId: 'abdomen_zlucnik_main' }); }
            if (ctx.isActive('zl_chce')) zlRep.push("stav po cholecystektomii");
            let zlDesc = ctx.field('zl_custom_desc'); if (zlDesc) zlRep.push(zlDesc);
            if (zlRep.length > 0) reportOut.push({ type: 'frame', text: `- Žlučník: ${formatList(zlRep)}.`, tableId: 'abdomen_zlucnik_main' });
            let zlConc = ctx.field('zl_custom_conc'); if (zlConc) concInc.push({ type: 'frame', text: zlConc, tableId: 'abdomen_zlucnik_main' });

            // 5. Slezina
            let slRep = [];
            if (ctx.isActive('sl_zvet')) { let mm = ctx.field('sl_zvet_mm'); slRep.push(`zvětšená${mm ? ' (KK diametr ' + mm + ' mm)' : ''}`); concInc.push({ type: 'frame', text: "Splenomegalie.", tableId: 'abdomen_slezina_main' }); }
            if (ctx.isActive('sl_akt')) { slRep.push("difuzně zvýšená akumulací RF"); concInc.push({ type: 'frame', text: "Difuzně zvýšená aktivita sleziny (v.s. reaktivně/zánětlivě).", tableId: 'abdomen_slezina_main' }); }
            let slCys = ctx.text('sl_cys'); if (slCys && slCys !== '0') slRep.push(slCys === '1' ? 'cystoidní léze' : 'vícečetné cystoidní léze');
            let slHem = ctx.text('sl_hem'); if (slHem && slHem !== '0') slRep.push(slHem === '1' ? 'ložisko (hemangiom)' : 'vícečetné hemangiomy');
            let slInf = ctx.text('sl_inf'); if (slInf && slInf !== '0') { slRep.push(slInf === '1' ? 'klínovité ložisko pravděp. po infarktu' : 'vícečetná klínovitá ložiska pravděp. po infarktech'); concInc.push({ type: 'frame', text: "Stav po infarktu sleziny.", tableId: 'abdomen_slezina_main' }); }
            if (ctx.isActive('sl_spl')) slRep.push("po splenektomii");
            if (ctx.isActive('sl_reg')) slRep.push("nodulus charakteru regenerátu");
            let slDesc = ctx.field('sl_custom_desc'); if (slDesc) slRep.push(slDesc);
            if (slRep.length > 0) reportOut.push({ type: 'frame', text: `- Slezina: ${formatList(slRep)}.`, tableId: 'abdomen_slezina_main' });
            let slConc = ctx.field('sl_custom_conc'); if (slConc) concInc.push({ type: 'frame', text: slConc, tableId: 'abdomen_slezina_main' });

            // 6. Žaludek
            let zaRep = [];
            let zaRes = ctx.text('za_res'); if (zaRes && zaRes !== '0') zaRep.push(`stav po ${zaRes === 'parc.' ? 'parc. resekci s gastoenteroanastomózou' : zaRes === 'total.' ? 'totální gastrektomii s gastoenteroanastomózou' : 'tubulizaci'}`);
            let zaBar = ctx.text('za_bar'); if (zaBar && zaBar !== '0') zaRep.push(`stav po bariatrické operaci (${zaBar === 'bandáž' ? 'bandáž' : 'gastrický bypass'})`);
            if (ctx.isActive('za_fun')) zaRep.push("známky fundoplikace");
            let zaSon = ctx.text('za_son'); if (zaSon && zaSon !== '0') zaRep.push(`zavedena ${zaSon} sonda`);
            let zaZes = ctx.text('za_zes'), zaZesLoc = ctx.text('za_zes_loc'); if (zaZes && zaZes !== '0') { let zloc = zaZesLoc !== '0' ? ` v oblasti ${zaZesLoc}` : ''; zaRep.push(`${zaZes} zesílení stěny${zloc}`); if (zaZes === 'výrazné') concInc.push({ type: 'frame', text: `Zesílení stěny žaludku${zloc}.`, tableId: 'abdomen_zaludek_main' }); }
            let zaDesc = ctx.field('za_custom_desc'); if (zaDesc) zaRep.push(zaDesc);
            if (zaRep.length > 0) reportOut.push({ type: 'frame', text: `- Žaludek: ${formatList(zaRep)}.`, tableId: 'abdomen_zaludek_main' });
            let zaConc = ctx.field('za_custom_conc'); if (zaConc) concInc.push({ type: 'frame', text: zaConc, tableId: 'abdomen_zaludek_main' });

            // 7. Pankreas
            let paRep = [];
            let paAtr = ctx.text('pa_atr');
            if (paAtr && paAtr !== '0') {
                if (paAtr === 'kalcifikace') {
                    paRep.push('atrofie s mnohočetnými kalcifikacemi');
                    concInc.push({ type: 'frame', text: "Chronická pankreatitis s kalcifikacemi.", tableId: 'abdomen_pankreas_main' });
                } else {
                    paRep.push(`${paAtr} atrofie`);
                    concInc.push({ type: 'frame', text: "Atrofie pankreatu.", tableId: 'abdomen_pankreas_main' });
                }
            }
            if (ctx.isActive('pa_wir')) { let mm = ctx.field('pa_wir_mm'); paRep.push(`dilatace ductus Wirsungi${mm ? ' na ' + mm + ' mm' : ''}`); concInc.push({ type: 'frame', text: "Dilatace vývodu pankreatu.", tableId: 'abdomen_pankreas_main' }); }
            let paCys = ctx.text('pa_cys'); if (paCys && paCys !== '0') { let mm = ctx.field('pa_cys_mm'); paRep.push(`${paCys === '1' ? 'cystoidní léze' : 'vícečetné cystoidní léze'}${mm ? ' vel. do ' + mm + ' mm' : ''}`); concInc.push({ type: 'frame', text: `${paCys === '1' ? 'Cystoidní léze' : 'Vícečetné cystoidní léze'} pankreatu.`, tableId: 'abdomen_pankreas_main' }); }
            let paOp = ctx.text('pa_op'); if (paOp && paOp !== '0') paRep.push(`stav po ${paOp === 'duodenopankreat.' ? 'duodenopankreatektomii' : paOp === 'total pankreat.' ? 'totální pankreatektomii' : paOp === 'kauda' ? 'resekci kaudy' : 'nekrektomii'}`);
            let paDesc = ctx.field('pa_custom_desc'); if (paDesc) paRep.push(paDesc);
            if (paRep.length > 0) reportOut.push({ type: 'frame', text: `- Pankreas: ${formatList(paRep)}.`, tableId: 'abdomen_pankreas_main' });
            let paConc = ctx.field('pa_custom_conc'); if (paConc) concInc.push({ type: 'frame', text: paConc, tableId: 'abdomen_pankreas_main' });

            // 8. Tračník
            let trRep = [];
            let trRes = ctx.text('tr_res'); if (trRes && trRes !== '0') trRep.push(`stav po ${trRes === 'P hemikol.' ? 'pravostranné hemikolektomii' : trRes === 'L hemikol.' ? 'levostranné hemikolektomii' : trRes === 'sigmoidea' ? 'resekci sigmoidea' : trRes === 'rekta' ? 'resekci rekta' : 'amputaci rekta'}`);
            if (ctx.isActive('tr_app')) trRep.push("stav po appendektomii");
            let trSto = ctx.text('tr_sto'), trStoLoc = ctx.text('tr_sto_loc'); if (trSto && trSto !== '0') trRep.push(`vyvedena ${trSto}${trStoLoc !== '0' ? ' ' + trStoLoc : ''}`);
            let trFok = ctx.text('tr_fok'), trFokLoc = ctx.text('tr_fok_loc'); if (trFok && trFok !== '0') { let loc = trFokLoc !== '0' ? trFokLoc : 'tračníku'; trRep.push(`ložiskově zvýšená akumulace RF v oblasti ${loc} (${trFok})`); concInc.push({ type: 'frame', text: `Fokální aktivita v oblasti ${loc} - k dovyšetření (v.s. polyp/tumor).`, tableId: 'abdomen_tracnik_main' }); }
            let trZes = ctx.text('tr_zes'), trZesLoc = ctx.text('tr_zes_loc'); if (trZes && trZes !== '0') { let loc = trZesLoc !== '0' ? trZesLoc : 'střeva'; trRep.push(`${trZes} zesílení stěny v oblasti ${loc}`); if (trZes === 'výrazné') concInc.push({ type: 'frame', text: `Zesílení stěny v oblasti ${loc}.`, tableId: 'abdomen_tracnik_main' }); }
            let trDiv = ctx.text('tr_div'), trDivLoc = ctx.text('tr_div_loc'); if (trDiv && trDiv !== '0') { let loc = trDivLoc !== '0' ? ` v oblasti ${trDivLoc}` : ''; trRep.push(`divertikulóza${loc}${trDiv === 'divertikulitida' ? ' se známkami zánětlivé iritace okolí' : ''}`); if (trDiv === 'divertikulitida') concInc.push({ type: 'frame', text: `Známky divertikulitidy${loc}.`, tableId: 'abdomen_tracnik_main' }); }
            let trDesc = ctx.field('tr_custom_desc'); if (trDesc) trRep.push(trDesc);
            if (trRep.length > 0) reportOut.push({ type: 'frame', text: `- Tračník: ${formatList(trRep)}.`, tableId: 'abdomen_tracnik_main' });
            let trConc = ctx.field('tr_custom_conc'); if (trConc) concInc.push({ type: 'frame', text: trConc, tableId: 'abdomen_tracnik_main' });

            // 9. Peritoneum
            let peRep = [];
            let peMis = ctx.text('pe_mis'); if (peMis === 'zastření') peRep.push("mírné nespecifické lokální zastření mesenteria"); else if (peMis === 'panikulitis') { peRep.push("lokální zastření mesenteria s uzlinami (panikulitis)"); concInc.push({ type: 'frame', text: "Mesenteriální panikulitis.", tableId: 'abdomen_peritoneum_main' }); }
            let ascCurr = ctx.text('pe_asc'), ascMin = ctx.text('pe_asc_old'); const hasPastDate = !!document.body.classList.contains('has-past-date');
            const ascMap = { 'diskrétně': { v: 1, r: 'stopově tekutina v malé pánvi', c: '' }, 'malý': { v: 2, r: 'tekutina v pánvi a mezikličkově', c: 'Malý ascites v pánvi' }, 'střední': { v: 3, r: 'tekutina v pánvi a mezikličkově, mírně pod játry', c: 'Přítomen ascites' }, 'výrazný': { v: 4, r: 'větší množství volné tekutiny v pánvi a břiše', c: 'Výrazný ascites' } };
            
            let isAscCurrValid = ascCurr && ascCurr !== '0';
            let isAscMinValid = ascMin && ascMin !== '0';

            if (isAscCurrValid || (!isAscCurrValid && hasPastDate && isAscMinValid)) {
                if (!isAscCurrValid) { 
                    peRep.push("minule přítomný ascites zcela regredoval"); 
                    concMain.push({ type: 'frame', text: "Minule přítomný ascites zcela regredoval.", tableId: 'abdomen_peritoneum_main' }); 
                }
                else if (ascMap[ascCurr]) {
                    let d = ascMap[ascCurr], repStr = d.r, dyn = "";
                    if (hasPastDate) {
                        if (!isAscMinValid) dyn = "nově";
                        else { let vC = d.v, vM = ascMap[ascMin]?.v || 0; if (vC > vM) dyn = "v progresi"; else if (vC < vM) dyn = "v regresi"; else dyn = "stacionární"; }
                    }
                    peRep.push(`${repStr}${dyn ? ' (' + dyn + ')' : ''}`); 
                    if (d.c) concInc.push({ type: 'frame', text: `${d.c}${dyn ? ' ' + dyn : ''}.`, tableId: 'abdomen_peritoneum_main' });
                }
            }
            let peDesc = ctx.field('pe_custom_desc'); if (peDesc) peRep.push(peDesc);
            if (peRep.length > 0) reportOut.push({ type: 'frame', text: `- Peritoneum a mesenterium: ${formatList(peRep)}.`, tableId: 'abdomen_peritoneum_main' });
            let peConc = ctx.field('pe_custom_conc'); if (peConc) concInc.push({ type: 'frame', text: peConc, tableId: 'abdomen_peritoneum_main' });

            // 10. Nadledviny
            let naRep = [];
            
            ['akt', 'hyp', 'mye', 'adr'].forEach(type => {
                let s = checkSide(`na_${type}`); if (!s) return;
                const m = { 
                    akt: { t: 'zvýšená akumulace RF (funkčně)', c: '' }, 
                    hyp: { t: 'zvětšení (hyperplázie)', c: 'Hyperplázie' }, 
                    mye: { t: 'ložisko tukové denzity (myelolipom)', p: 'ložiska tukové denzity (myelolipomy)', c: 'Myelolipom' }, 
                    adr: { t: 'stav po odstranění', c: '' } 
                };
                let item = m[type]; let txt = s.isPlural && item.p ? item.p : item.t;
                naRep.push(`${txt} ${s.sideText}`);
                if (item.c) { let l = s.sideText === 'bilat.' ? 'nadledvin bilat.' : s.sideText === 'vpravo' ? 'pravé nadledviny' : 'levé nadledviny'; concInc.push({ type: 'frame', text: `${s.isPlural && type !== 'hyp' ? item.c + 'y' : item.c} ${l}.`, tableId: 'abdomen_nadledviny_main' }); }
            });

            let incR = ctx.text('na_inc_r');
            let incL = ctx.text('na_inc_l');
            
            const incMap = {
                'B': {
                    r: 'ložisko (incidentalom) benigního charakteru',
                    p: 'ložiska (incidentalomy) benigního charakteru',
                    c: null
                },
                'I': {
                    r: 'ložisko (incidentalom) s nedefiničním vzhledem',
                    p: 'ložiska (incidentalomy) s nedefiničním vzhledem',
                    c: 'Incidentalom {loc}, pravděpodobně benigní, ke kontrole stacionarity za 6-12 měsíců.'
                },
                'M': {
                    r: 'větší ložisko (incidentalom) bez prokazatelných benigních charakteristik',
                    p: 'větší ložiska (incidentalomy) bez prokazatelných benigních charakteristik',
                    c: 'Větší incidentalom {loc} k dovyšetření.'
                }
            };

            if ((incR && incR !== '0') || (incL && incL !== '0')) {
                let isR = incR && incR !== '0';
                let isL = incL && incL !== '0';
                
                if (isR && isL && incR === incL) {
                    let data = incMap[incR];
                    naRep.push(`${data.p} bilat.`);
                    if (data.c) {
                        concInc.push({ type: 'frame', text: data.c.replace('{loc}', 'nadledvin bilat.'), tableId: 'abdomen_nadledviny_main' });
                    }
                } else {
                    if (isR) {
                        let data = incMap[incR];
                        naRep.push(`${data.r} vpravo`);
                        if (data.c) concInc.push({ type: 'frame', text: data.c.replace('{loc}', 'pravé nadledviny'), tableId: 'abdomen_nadledviny_main' });
                    }
                    if (isL) {
                        let data = incMap[incL];
                        naRep.push(`${data.r} vlevo`);
                        if (data.c) concInc.push({ type: 'frame', text: data.c.replace('{loc}', 'levé nadledviny'), tableId: 'abdomen_nadledviny_main' });
                    }
                }
            }

            let naDesc = ctx.field('na_custom_desc'); if (naDesc) naRep.push(naDesc);
            if (naRep.length > 0) reportOut.push({ type: 'frame', text: `- Nadledviny: ${formatList(naRep)}.`, tableId: 'abdomen_nadledviny_main' });
            let naConc = ctx.field('na_custom_conc'); if (naConc) concInc.push({ type: 'frame', text: naConc, tableId: 'abdomen_nadledviny_main' });

            // 11. Ledviny
            let leRep = [];
            let lCys = checkSide('le_cys'); if (lCys) leRep.push(`${lCys.isPlural ? 'prosté kortikální cysty' : 'prostá kortikální cysta'} ${lCys.sideText}`);
            let lAml = checkSide('le_aml'); if (lAml) leRep.push(`${lAml.isPlural ? 'ložiska tukové denzity (angiomyolipomy)' : 'ložisko tukové denzity (angiomyolipom)'} ${lAml.sideText}`);
            let lJiz = checkSide('le_jiz'); if (lJiz) leRep.push(`${lJiz.isPlural ? 'jizevnaté okrsky' : 'jizevnatý okrsek'} ${lJiz.sideText}`);
            let lHyd = checkSide('le_hyd'); if (lHyd) { let mapH = {'I':'mírná dilatace pánvičky', 'II':'dilatace pánvičky a některých kalichů', 'III':'dilatace pánvičky a všech kalichů', 'IV':'těžká dilatace dutého systému'}; let t = lHyd.sideText === 'bilat.' && lHyd.p === lHyd.l ? `${mapH[lHyd.p]} bilat.` : `${lHyd.isP ? mapH[lHyd.p] + ' vpravo' : ''}${lHyd.isP && lHyd.isL ? ' a ' : ''}${lHyd.isL ? mapH[lHyd.l] + ' vlevo' : ''}`; leRep.push(t); concMain.push({ type: 'frame', text: `Hydronefróza ${lHyd.sideText}.`, tableId: 'abdomen_ledviny_main' }); }
            let lLit = checkSide('le_lit'); if (lLit) { let getLoc = (v) => ({ 'kaliko': 'v kalichu', 'pelvi': 'v pánvičce', 'pu junkce': 'v pyelo-ureterální junkci', 'ureter': 'v ureteru', 'vu junkce': 'v uretero-vezikální junkci' }[v] || v); let t = lLit.sideText === 'bilat.' && lLit.p === lLit.l ? `litiáza ${getLoc(lLit.p)} bilat.` : `${lLit.isP ? 'litiáza ' + getLoc(lLit.p) + ' vpravo' : ''}${lLit.isP && lLit.isL ? ' a ' : ''}${lLit.isL ? 'litiáza ' + getLoc(lLit.l) + ' vlevo' : ''}`; leRep.push(t); concInc.push({ type: 'frame', text: `Urolitiáza ${lLit.sideText}.`, tableId: 'abdomen_ledviny_main' }); }
            let lSte = checkSide('le_ste'); if (lSte) { let gs = (v) => v === 'správně' ? 've správné pozici' : 's dislokací'; let t = lSte.sideText === 'bilat.' && lSte.p === lSte.l ? `ureterální stent ${gs(lSte.p)} bilat.` : `${lSte.isP ? 'ureterální stent ' + gs(lSte.p) + ' vpravo' : ''}${lSte.isP && lSte.isL ? ' a ' : ''}${lSte.isL ? 'ureterální stent ' + gs(lSte.l) + ' vlevo' : ''}`; leRep.push(t); if (lSte.p === 'dislokace' || lSte.l === 'dislokace') concMain.push({ type: 'frame', text: `Dislokace stentu ${lSte.sideText}.`, tableId: 'abdomen_ledviny_main' }); }
            let lNef = checkSide('le_nef'); if (lNef) leRep.push(`zavedena nefrostomie ${lNef.sideText}`);
            let lRes = checkSide('le_res'); if (lRes) { let gp = (v) => v === 'horní' ? 'horního' : v === 'střední' ? 'středního' : 'dolního'; let t = lRes.sideText === 'bilat.' && lRes.p === lRes.l ? `stav po parciální resekci ${gp(lRes.p)} pólu bilat.` : `${lRes.isP ? 'stav po parciální resekci ' + gp(lRes.p) + ' pólu vpravo' : ''}${lRes.isP && lRes.isL ? ' a ' : ''}${lRes.isL ? 'stav po parciální resekci ' + gp(lRes.l) + ' pólu vlevo' : ''}`; leRep.push(t); }
            let lNek = checkSide('le_nek'); if (lNek) leRep.push(`stav po nefrektomii ${lNek.sideText}`);
            let leDesc = ctx.field('le_custom_desc'); if (leDesc) leRep.push(leDesc);
            if (leRep.length > 0) reportOut.push({ type: 'frame', text: `- Ledviny: ${formatList(leRep)}.`, tableId: 'abdomen_ledviny_main' });
            let leConc = ctx.field('le_custom_conc'); if (leConc) concInc.push({ type: 'frame', text: leConc, tableId: 'abdomen_ledviny_main' });

            // 12. Močový měchýř
            let mmRep = [];
            let mmKat = ctx.text('mm_kat'); if (mmKat && mmKat !== '0') mmRep.push(`zaveden ${mmKat === 'PMK' ? 'permanentní močový katetr' : 'epikutánní katetr (epicystostomie)'}`);
            let mmDiv = ctx.text('mm_div'); if (mmDiv && mmDiv !== '0') { mmRep.push(mmDiv === '1' ? 'divertikl' : 'vícečetné divertikly'); concInc.push({ type: 'frame', text: mmDiv === '1' ? 'Divertikl močového měchýře.' : 'Divertikulóza močového měchýře.', tableId: 'abdomen_moc_mechyr_main' }); }
            let mmSto = ctx.text('mm_sto'); if (mmSto && mmSto !== '0') mmRep.push(`vyvedena ${mmSto === 'urostomie' ? 'urostomie' : 'urostomie dle Brickera'}`);
            let mmOp = ctx.text('mm_op'); if (mmOp && mmOp !== '0') mmRep.push(`stav po ${mmOp === 'TURB' ? 'TURB' : 'cystektomii'}`);
            let mmDesc = ctx.field('mm_custom_desc'); if (mmDesc) mmRep.push(mmDesc);
            if (mmRep.length > 0) reportOut.push({ type: 'frame', text: `- Močový měchýř: ${formatList(mmRep)}.`, tableId: 'abdomen_moc_mechyr_main' });
            let mmConc = ctx.field('mm_custom_conc'); if (mmConc) concInc.push({ type: 'frame', text: mmConc, tableId: 'abdomen_moc_mechyr_main' });

            // 13. Děloha
            let deRep = [];
            let deMyo = ctx.text('de_myo'), deMyoLoc = ctx.text('de_myo_loc'); if (deMyo && deMyo !== '0') { let loc = deMyoLoc !== '0' ? ` (${deMyoLoc})` : ''; deRep.push(`${deMyo === '1' ? 'solitární myom' : 'vícečetné myomy'}${loc}`); concInc.push({ type: 'frame', text: deMyo === '1' ? 'Myom dělohy.' : 'Uterus myomatosus.', tableId: 'abdomen_deloha_main' }); }
            let deEnd = ctx.text('de_end'), deEndInt = ctx.text('de_end_int'); if (deEnd && deEnd !== '0') { let int = deEndInt !== '0' ? ` ${deEndInt.split('/')[deEnd === 'zesílení' ? 0 : 1]}` : ''; deRep.push(`${int ? cap(int) : ''} ${deEnd === 'zesílení' ? 'zesílení sliznice endometria' : 'kolekce tekutiny v endometrální dutině'}`.trim()); concInc.push({ type: 'frame', text: deEnd === 'zesílení' ? 'Zesílení endometria.' : 'Fluidometra.', tableId: 'abdomen_deloha_main' }); }
            if (ctx.isActive('de_akt')) deRep.push("mírná difuzní fyziologická akumulace RF v endometriu");
            if (ctx.isActive('de_iud')) deRep.push("IUD in situ");
            if (ctx.isActive('de_hys')) deRep.push("stav po hysterektomii");
            let deDesc = ctx.field('de_custom_desc'); if (deDesc) deRep.push(deDesc);
            if (deRep.length > 0) reportOut.push({ type: 'frame', text: `- Děloha: ${formatList(deRep)}.`, tableId: 'abdomen_deloha_main' });
            let deConc = ctx.field('de_custom_conc'); if (deConc) concInc.push({ type: 'frame', text: deConc, tableId: 'abdomen_deloha_main' });

            // 14. Ovária
            let ovRep = [];
            let ovPc = checkSide('ov_pc'); if (ovPc) ovRep.push(`${ovPc.isPlural ? 'vícečetné prosté cysty' : 'solitární prostá cysta'} adnexálně ${ovPc.sideText}`);
            let ovKc = checkSide('ov_kc'); if (ovKc) { let valP = ctx.field('ov_kc_mm_r'), valL = ctx.field('ov_kc_mm_l'); let sizeStr = ''; if (ovKc.sideText === 'bilat.') { if (valP && valL) sizeStr = ` vel. do ${valP} mm vpravo a ${valL} mm vlevo`; else if (valP) sizeStr = ` vel. do ${valP} mm vpravo`; else if (valL) sizeStr = ` vel. do ${valL} mm vlevo`; } else { let val = ovKc.isP ? valP : valL; if (val) sizeStr = ` vel. do ${val} mm`; } ovRep.push(`${ovKc.isPlural ? 'vícečetné komplexní cystické léze' : 'komplexní cystická léze'} adnexálně ${ovKc.sideText}${sizeStr}`); concInc.push({ type: 'frame', text: `Komplexní cystická léze ovaria ${ovKc.sideText} k UZ korelaci.`, tableId: 'abdomen_ovaria_main' }); }
            let ovAkt = checkSide('ov_akt'); if (ovAkt) ovRep.push(`zvýšená ložisková akumulace RF v ovariu ${ovAkt.sideText} fyziologického charakteru (ovulační projev)`);
            let ovAdn = checkSide('ov_adn'); if (ovAdn) ovRep.push(`stav po adnexektomii ${ovAdn.sideText}`);
            let ovDesc = ctx.field('ov_custom_desc'); if (ovDesc) ovRep.push(ovDesc);
            if (ovRep.length > 0) reportOut.push({ type: 'frame', text: `- Ovária a adnexa: ${formatList(ovRep)}.`, tableId: 'abdomen_ovaria_main' });
            let ovConc = ctx.field('ov_custom_conc'); if (ovConc) concInc.push({ type: 'frame', text: ovConc, tableId: 'abdomen_ovaria_main' });

            // 15. Prostata
            let prRep = [];
            if (ctx.isActive('pr_zvet')) { let ml = ctx.field('pr_zvet_ml'); prRep.push(`zvětšená${ml ? ' (' + ml + ' ml)' : ''}`); concInc.push({ type: 'frame', text: "Hypertrofie prostaty.", tableId: 'abdomen_prostata_main' }); }
            if (ctx.isActive('pr_fok')) { prRep.push("ložiskově zvýšená akumulace RF v prostatě"); concMain.push({ type: 'frame', text: "Fokus zvýšené aktivity v prostatě, dop. korelaci.", tableId: 'abdomen_prostata_main' }); }
            if (ctx.isActive('pr_tur')) prRep.push("stav po TURP");
            if (ctx.isActive('pr_rap')) prRep.push("stav po radikální prostatektomii");
            let prDesc = ctx.field('pr_custom_desc'); if (prDesc) prRep.push(prDesc);
            if (prRep.length > 0) reportOut.push({ type: 'frame', text: `- Prostata: ${formatList(prRep)}.`, tableId: 'abdomen_prostata_main' });
            let prConc = ctx.field('pr_custom_conc'); if (prConc) concInc.push({ type: 'frame', text: prConc, tableId: 'abdomen_prostata_main' });


            // Ostatní břisní orgány předdef. text - shrnutí
            let hasSig = (lesInsts.length > 0 || lnInsts.length > 0 || concMain.length > 0 || concInc.length > 0);
            let hasAnyOrganRep = (jaRep.length > 0 || zlRep.length > 0 || slRep.length > 0 || zaRep.length > 0 || 
                                  paRep.length > 0 || trRep.length > 0 || peRep.length > 0 || naRep.length > 0 || 
                                  leRep.length > 0 || mmRep.length > 0 || deRep.length > 0 || ovRep.length > 0 || prRep.length > 0);
            let orgSummaryTxt = "";
            if (hasSig) {
                orgSummaryTxt = "Ostatní hodnotitelné orgány bez zřetelné signifikantní patologie.";
            } else if (hasAnyOrganRep) {
                orgSummaryTxt = "Jinak orgány dutiny břišní bez signifikantní patologie.";
            } else {
                orgSummaryTxt = "Orgány dutiny břišní bez signifikantní patologie.";
            }
            reportOut.push({ type: 'frame', text: orgSummaryTxt, tableId: null, dimmed: (!hasSig && !hasAnyOrganRep) });
            


            // 16. Testes
            let teRep = [];
            let teHyd = checkSide('te_hyd'); if (teHyd) { teRep.push(`hydrokéla ${teHyd.sideText}`); concInc.push({ type: 'frame', text: `Hydrokéla ${teHyd.sideText}.`, tableId: 'abdomen_testes_main' }); }
            let teVar = checkSide('te_var'); if (teVar) { teRep.push(`varikokéla ${teVar.sideText}`); concInc.push({ type: 'frame', text: `Varikokéla ${teVar.sideText}.`, tableId: 'abdomen_testes_main' }); }
            let teOrc = checkSide('te_orc'); if (teOrc) teRep.push(`stav po orchiektomii ${teOrc.sideText}`);
            let teDesc = ctx.field('te_custom_desc'); if (teDesc) teRep.push(teDesc);
            if (teRep.length > 0) reportOut.push({ type: 'frame', text: `- Testes a skrotum: ${formatList(teRep)}.`, tableId: 'abdomen_testes_main' });
            let teConc = ctx.field('te_custom_conc'); if (teConc) concInc.push({ type: 'frame', text: teConc, tableId: 'abdomen_testes_main' });

            // 17. Velké cévy - sekce Aneurysma
            let vcRep = [];
            let vcSg = ctx.isActive('vc_sg');
            
            let vcAn = ctx.text('vc_an');
            let vcAnMm = ctx.field('vc_an_val');

            if (vcAn && vcAn !== '0') {
                let mmString = vcAnMm ? ` (max diametru ${vcAnMm} mm)` : '';
                let fullAnText = `${cap(vcAn)} aneurysma aorty${mmString}`;
                
                if (vcSg) {
                    vcRep.push(`${fullAnText} ošetřeno stentgraftem`);
                    concMain.push({ type: 'frame', text: `${fullAnText} ošetřeno stentgraftem.`, tableId: 'abdomen_velke_cevy_main' });
                } else {
                    vcRep.push(fullAnText);
                    concMain.push({ type: 'frame', text: `${fullAnText}.`, tableId: 'abdomen_velke_cevy_main' });
                }
            } else if (vcSg) {
                vcRep.push(`zaveden stentgraft`);
                concInc.push({ type: 'frame', text: "Stentgraft in situ.", tableId: 'abdomen_velke_cevy_main' });
            }
            
            const parseVasc = (pfx, isSk) => {
                let locs = [];
                
                // Centrální cévy
                if (ctx.isActive(`vc_${pfx}_aorta`)) locs.push('abdominální aorty');
                if (ctx.isActive(`vc_${pfx}_tc`)) locs.push('truncus coeliacus');
                if (ctx.isActive(`vc_${pfx}_ams`)) locs.push('a. mesenterica sup.');
                
                // Párové cévy
                const vessels = [
                    { id: 'cia', s: 'společné iliky', p: 'společných ilik' }, 
                    { id: 'eia', s: 'zevní iliky', p: 'zevních ilik' }, 
                    { id: 'iia', s: 'vnitřní iliky', p: 'vnitřních ilik' }, 
                    { id: 'fa', s: 'femorální arterie', p: 'femorálních arterií' }
                ];
                
                vessels.forEach(v => {
                    let isR = ctx.isActive(`vc_${pfx}_${v.id}_r`);
                    let isL = ctx.isActive(`vc_${pfx}_${v.id}_l`);
                    
                    if (isR && isL) locs.push(`${v.p} bilat.`);
                    else if (isR) locs.push(`${v.s} vpravo`);
                    else if (isL) locs.push(`${v.s} vlevo`);
                });
                
                if (locs.length > 0) {
                    vcRep.push(`${isSk ? 'aterosklerotické pláty' : 'zaveden stent do'} ${formatList(locs)}`);
                }
            };
            
            parseVasc('sk', true); 
            parseVasc('st', false);
            
            let bypassLocs = [];
            ['af', 'if', 'ff'].forEach(id => {
                let s = checkSide(`vc_by_${id}`); 
                if (!s) return;
                
                if (id === 'ff') bypassLocs.push("femorofemorální crossover");
                else bypassLocs.push(`${id === 'af' ? 'aortofemorální' : 'iliofemorální'} ${s.sideText}`);
            });
            if (bypassLocs.length > 0) vcRep.push(`vytvořen bypass ${formatList(bypassLocs)}`);
            
            let vcDesc = ctx.field('vc_custom_desc'); if (vcDesc) vcRep.push(vcDesc);
            if (vcRep.length > 0) reportOut.push({ type: 'frame', text: `- Velké cévy: ${formatList(vcRep)}.`, tableId: 'abdomen_velke_cevy_main' });
            let vcConc = ctx.field('vc_custom_conc'); if (vcConc) concInc.push({ type: 'frame', text: vcConc, tableId: 'abdomen_velke_cevy_main' });

            // 18. Břišní stěna
            let awRep = [];
            let awScR = ctx.isActive('aw_sc_r'), awScL = ctx.isActive('aw_sc_l');
            if (awScR || awScL) {
                let side = awScR && awScL ? 'bilat.' : (awScR ? 'vpravo' : 'vlevo');
                awRep.push(`v podkoží infiltráty se zvýšenou akumulací RF pravděpod. postinjekční ${side}`);
            }

            let scarR = ctx.text('aw_scar_r'), scarL = ctx.text('aw_scar_l');
            if (scarR && scarR !== '0' && scarR === scarL) {
                awRep.push(`jizvy bilat. ${scarR === 'RF-' ? 'bez zvýšené akumulace RF' : 's přetrvávající zvýšenou akumulací RF'}`);
            } else {
                if (scarR && scarR !== '0') awRep.push(`jizva vpravo ${scarR === 'RF-' ? 'bez zvýšené akumulace RF' : 's přetrvávající zvýšenou akumulací RF'}`);
                if (scarL && scarL !== '0') awRep.push(`jizva vlevo ${scarL === 'RF-' ? 'bez zvýšené akumulace RF' : 's přetrvávající zvýšenou akumulací RF'}`);
            }

            const getHerText = (val, loc, cname) => {
                let repText = val === 'malá' ? `drobná herniace ${loc}` : 
                              val === 'střední' ? `herniace ${loc}` : 
                              `výrazná herniace s obsahem střevních kliček ${loc}`;
                let concText = (val === 'střední' || val === 'velká') ? `${cname}.` : null;
                return { rep: repText, conc: concText };
            };

            const processHernia = (idBase, locStr, concName) => {
                let r = ctx.text(`${idBase}_r`), l = ctx.text(`${idBase}_l`), c = ctx.text(idBase);
                if (c && c !== '0') {
                    let h = getHerText(c, locStr, concName);
                    awRep.push(h.rep); if (h.conc) concInc.push({ type: 'frame', text: h.conc, tableId: 'abdomen_wall_main' });
                } else {
                    if (r && r !== '0' && r === l) {
                        let h = getHerText(r, `${locStr} bilat.`, `${concName} bilat.`);
                        awRep.push(h.rep); if (h.conc) concInc.push({ type: 'frame', text: h.conc, tableId: 'abdomen_wall_main' });
                    } else {
                        if (r && r !== '0') { let h = getHerText(r, `${locStr} vpravo`, `${concName} l.dx.`); awRep.push(h.rep); if (h.conc) concInc.push({ type: 'frame', text: h.conc, tableId: 'abdomen_wall_main' }); }
                        if (l && l !== '0') { let h = getHerText(l, `${locStr} vlevo`, `${concName} l.sin.`); awRep.push(h.rep); if (h.conc) concInc.push({ type: 'frame', text: h.conc, tableId: 'abdomen_wall_main' }); }
                    }
                }
            };

            processHernia('aw_her_scar', 'v jizvě', 'Hernie v jizvě');
            processHernia('aw_her_supra', 'supraumbilikálně', 'Supraumbilikální hernie');
            processHernia('aw_her_umb', 'umbilikálně', 'Umbilikální hernie');
            processHernia('aw_her_ing', 'inguinálně', 'Inguinální hernie');

            let awDesc = ctx.field('aw_custom_desc'); if (awDesc) awRep.push(awDesc);
            if (awRep.length > 0) reportOut.push({ type: 'frame', text: `- Břišní stěna: ${formatList(awRep)}.`, tableId: 'abdomen_wall_main' });
            let awConc = ctx.field('aw_custom_conc'); if (awConc) concInc.push({ type: 'frame', text: awConc, tableId: 'abdomen_wall_main' });

            let finalAscCurr = ctx.text('pe_asc');
            let finalAscMin = ctx.text('pe_asc_old');
            let finalHasPastDate = !!document.body.classList.contains('has-past-date');
            if (!(finalAscCurr && finalAscCurr !== '0') && !(finalHasPastDate && finalAscMin && finalAscMin !== '0')) {
                reportOut.push({ type: 'frame', text: 'Bez volné tekutiny.', tableId: 'abdomen_peritoneum_main', dimmed: true });
            }

            let ostDesc = ctx.field('ostatni_custom_desc');
            if (ostDesc) {
                let txt = ostDesc.trim();
                if (txt) {
                    txt = txt.charAt(0).toUpperCase() + txt.slice(1);
                    if (!txt.endsWith('.')) txt += '.';
                    reportOut.push({ type: 'frame', text: txt, tableId: 'abdomen_ostatni_main' });
                }
            }

            let ostConc = ctx.field('ostatni_custom_conc');
            if (ostConc) {
                concInc.push({ type: 'frame', text: ostConc, tableId: 'abdomen_ostatni_main' });
            }

            return { report: reportOut, conclusion: { main: concMain, incidental: concInc } };
        }
    };