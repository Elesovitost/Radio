const RegionBrain = {
    title: 'Hlava a CNS',
    reportLayout: 'block',
    layout: (helpers) => {
        let layoutNodes = [];
        
        // --- 1. LÉZE (Standardní) ---
        const lesInsts = Store.instances?.['brain_lesion_main'] || [];
        lesInsts.forEach((instId, idx) => {
            const p = `bl_${instId}`;
            
            const leftTab = helpers.Table3colRL(`${p}_loc_l`, [
                [{ btn: `${p}_p_fro_r`, states: ['0', '+'] }, 'frontálně', { btn: `${p}_p_fro_l`, states: ['0', '+'] }],
                [{ btn: `${p}_p_par_r`, states: ['0', '+'] }, 'parietálně', { btn: `${p}_p_par_l`, states: ['0', '+'] }],
                [{ btn: `${p}_p_tem_r`, states: ['0', '+'] }, 'temporálně', { btn: `${p}_p_tem_l`, states: ['0', '+'] }],
                [{ btn: `${p}_p_occ_r`, states: ['0', '+'] }, 'okcipitálně', { btn: `${p}_p_occ_l`, states: ['0', '+'] }],
                [{ btn: `${p}_p_bg_r`, states: ['0', '+'] }, 'BG', { btn: `${p}_p_bg_l`, states: ['0', '+'] }],
                [{ btn: `${p}_p_tal_r`, states: ['0', '+'] }, 'talamus', { btn: `${p}_p_tal_l`, states: ['0', '+'] }],
                [{ btn: `${p}_p_moz_r`, states: ['0', '+'] }, 'mozeček', { btn: `${p}_p_moz_l`, states: ['0', '+'] }],
                [{ btn: `${p}_p_mes_r`, states: ['0', '+'] }, 'mesencephalon', { btn: `${p}_p_mes_l`, states: ['0', '+'] }],
                [{ btn: `${p}_p_pon_r`, states: ['0', '+'] }, 'pons', { btn: `${p}_p_pon_l`, states: ['0', '+'] }],
                [{ btn: `${p}_p_obl_r`, states: ['0', '+'] }, 'oblongata', { btn: `${p}_p_obl_l`, states: ['0', '+'] }],
                ['', { btn: 'spacer', type: 'basic', text: '\u00A0' }, ''],
                [{ btn: `${p}_p_men_r`, states: ['0', '+'] }, 'meningy', { btn: `${p}_p_men_l`, states: ['0', '+'] }],
                [{ btn: `${p}_p_kal_r`, states: ['0', '+'] }, 'kalva', { btn: `${p}_p_kal_l`, states: ['0', '+'] }],
                [{ btn: `${p}_p_orb_r`, states: ['0', 'intra', 'extra', 'bulbus'] }, 'orbita', { btn: `${p}_p_orb_l`, states: ['0', 'intra', 'extra', 'bulbus'] }]
            ], 'brain');

            const rightTab = helpers.Table3colRCL(`${p}_loc_r`, [
                ['', { btn: `${p}_p_epi`, type: 'basic', text: 'epifýza' }, ''],
                ['', { btn: 'spacer', type: 'basic', text: '\u00A0' }, ''],
                ['', { btn: `${p}_p_supra`, type: 'basic', text: 'suprasella' }, ''],
                [{ btn: `${p}_p_para_r`, type: 'basic', text: 'parasella' }, { btn: `${p}_p_intra`, type: 'basic', text: 'intrasella' }, { btn: `${p}_p_para_l`, type: 'basic', text: 'parasella' }],
                ['', { btn: 'spacer', type: 'basic', text: '\u00A0' }, ''],
                [{ btn: `${p}_p_latk_r`, type: 'basic', text: 'lat. komora' }, { btn: `${p}_p_3k`, type: 'basic', text: 'III. komora' }, { btn: `${p}_p_latk_l`, type: 'basic', text: 'lat. komora' }],
                ['', { btn: `${p}_p_4k`, type: 'basic', text: 'IV. komora' }, ''],
                ['', { btn: 'spacer', type: 'basic', text: '\u00A0' }, ''],
                [{ btn: `${p}_p_mmk_r`, type: 'basic', text: 'MMK' }, '', { btn: `${p}_p_mmk_l`, type: 'basic', text: 'MMK' }]
            ], 'brain');

            const axTab = helpers.Table2colNormal(`${p}_loc_ax`, [
                ['', { btn: 'spacer', type: 'basic', text: '\u00A0' }, ''],
                ['extraaxiálně', { btn: `${p}_p_extra`, states: ['0', '+'] }],
                ['intraaxiálně', { btn: `${p}_p_intra_ax`, states: ['0', '+'] }]
            ], 'brain');

            const locWrapper = el('div', { className: 'row', style: 'align-items: flex-start; gap: 20px;' }, [
                leftTab,
                el('div', { className: 'table-wrapper', style: 'gap: 10px;' }, [rightTab, axTab])
            ]);

            const locContainer = el('div', { className: 'table-wrapper', style: 'width: 100%;' }, [
                el('div', { className: 'sub-table-title', textContent: 'Lokalizace' }),
                locWrapper
            ]);

            layoutNodes.push(
                helpers.LesionMain(`brain_lesion_main__${instId}`, `Léze (${idx + 1})`, [
                    ...LESIONS_DEFINITION.getLesionRowsPre(helpers, p),
                    locContainer,
                    ...(() => {
                        const postR = LESIONS_DEFINITION.getLesionRowsPost(helpers, p, `${p}_met`, `${p}_e`);
                        const assocRow = helpers.Table1col(`${p}_assoc`, [
                            ['Související:',
                                { btn: `${p}_edem`, states: ['edém', 'edém +', 'edém ++'] },
                                { btn: `${p}_mshift`, states: ['midshift', 'midshift →', '← midshift'] },
                                { field: 'mm', id: `${p}_mshift_mm`, placeholder: 'mm' },
                                { btn: `${p}_hern`, states: ['herniace', 'subfalcinní', 'transtent.', 'tonzilární'] }
                            ]
                        ], 'brain');
                        postR.splice(5, 0, assocRow); 
                        return postR;
                    })()
                ])
            );
        });

        // --- 2. KRVÁCENÍ A ISCHEMIE ---
        const hemoInsts = Store.instances?.['brain_hemo_main'] || [];
        hemoInsts.forEach((instId, idx) => {
            const p = `bh_${instId}`;
            
            const leftTab = helpers.Table3colRL(`${p}_loc_l`, [
                [{ btn: `${p}_p_fro_r`, states: ['0', '+'] }, 'frontálně', { btn: `${p}_p_fro_l`, states: ['0', '+'] }],
                [{ btn: `${p}_p_par_r`, states: ['0', '+'] }, 'parietálně', { btn: `${p}_p_par_l`, states: ['0', '+'] }],
                [{ btn: `${p}_p_tem_r`, states: ['0', '+'] }, 'temporálně', { btn: `${p}_p_tem_l`, states: ['0', '+'] }],
                [{ btn: `${p}_p_occ_r`, states: ['0', '+'] }, 'okcipitálně', { btn: `${p}_p_occ_l`, states: ['0', '+'] }],
                [{ btn: `${p}_p_bg_r`, states: ['0', '+'] }, 'BG', { btn: `${p}_p_bg_l`, states: ['0', '+'] }],
                [{ btn: `${p}_p_tal_r`, states: ['0', '+'] }, 'talamus', { btn: `${p}_p_tal_l`, states: ['0', '+'] }],
                [{ btn: `${p}_p_moz_r`, states: ['0', '+'] }, 'mozeček', { btn: `${p}_p_moz_l`, states: ['0', '+'] }],
                [{ btn: `${p}_p_mes_r`, states: ['0', '+'] }, 'mesencephalon', { btn: `${p}_p_mes_l`, states: ['0', '+'] }],
                [{ btn: `${p}_p_pon_r`, states: ['0', '+'] }, 'pons', { btn: `${p}_p_pon_l`, states: ['0', '+'] }],
                [{ btn: `${p}_p_obl_r`, states: ['0', '+'] }, 'oblongata', { btn: `${p}_p_obl_l`, states: ['0', '+'] }]
            ], 'brain');

            const rightTab = helpers.Table2colNormal(`${p}_loc_r`, [
                ['epidurálně', { btn: `${p}_sp_epi`, states: ['0', '+'] }],
                ['subdurálně', { btn: `${p}_sp_subd`, states: ['0', '+'] }],
                ['subarachnoid.', { btn: `${p}_sp_suba`, states: ['0', '+'] }],
                ['intraventrik.', { btn: `${p}_sp_iv`, states: ['0', '+'] }],
                ['kortiko-subkortik.', { btn: `${p}_sp_ks`, states: ['0', '+'] }],
                ['intraparenchym.', { btn: `${p}_sp_ip`, states: ['0', '+'] }]
            ], 'brain');

            const locWrapper = el('div', { className: 'row', style: 'align-items: flex-start; gap: 20px;' }, [
                leftTab,
                el('div', { className: 'table-wrapper', style: 'gap: 10px;' }, [rightTab])
            ]);

            const locContainer = el('div', { className: 'table-wrapper', style: 'width: 100%;' }, [
                el('div', { className: 'sub-table-title', textContent: 'Lokalizace' }),
                locWrapper
            ]);

            layoutNodes.push(
                helpers.LesionMain(`brain_hemo_main__${instId}`, `Ischemie / Krvácení (${idx + 1})`, [
                    helpers.Table1col(`${p}_r1_excl`, [ [ 'Počet:', { btn: `${p}_c_soli`, type: 'basic', text: 'solitární' }, { btn: `${p}_c_dve`, type: 'basic', text: 'dvě' }, { btn: `${p}_c_vice`, type: 'basic', text: 'vícečetné' }, { btn: `${p}_c_mnoho`, type: 'basic', text: 'mnohočetné' } ] ]),
                    helpers.Table1col(`${p}_r2_excl`, [ [ 'Typ:', { btn: `${p}_k_lez`, type: 'basic', text: 'léze'}, { btn: `${p}_k_kol`, type: 'basic', text: 'kolekce' }, { btn: `${p}_k_lem`, type: 'basic', text: 'lem tekutiny' }, { btn: `${p}_k_cust`, states: ['vlastní', 'custom'] } ] ]),
                    locContainer,
                    helpers.Table1col(`${p}_r4`, [ [ { btn: `${p}_doplneni`, type: 'basic_custom', text: 'doplnění:' } ] ]),
                    helpers.Table1col(`${p}_mr_excl`, [ [ 'Vzhled MR:', { btn: `${p}_mr_hyp`, type: 'basic', text: 'hyperakutní' }, { btn: `${p}_mr_ak`, type: 'basic', text: 'akutní' }, { btn: `${p}_mr_sub`, type: 'basic', text: 'subakutní' }, { btn: `${p}_mr_chr`, type: 'basic', text: 'chronické' } ] ]),
                    helpers.Table1col(`${p}_ct_excl`, [ [ 'Vzhled CT:', { btn: `${p}_ct_hyp`, type: 'basic', text: 'hyperakutní' }, { btn: `${p}_ct_ak`, type: 'basic', text: 'akutní' }, { btn: `${p}_ct_sub`, type: 'basic', text: 'subakutní' }, { btn: `${p}_ct_chr`, type: 'basic', text: 'chronické' } ] ]),
                    helpers.Table1col(`${p}_r7`, [ [ 'Největší:',  { field: 'text', id: `${p}_nej_text`, placeholder: 'Kde...' }] ]),
                    LESIONS_DEFINITION.getLesionMetricsRow(helpers, `${p}_r8`, `${p}_met`),
                    helpers.Table1col(`${p}_assoc`, [
                        ['Související:',
                            { btn: `${p}_edem`, states: ['edém', 'edém +', 'edém ++'] },
                            { btn: `${p}_mshift`, states: ['midshift', 'midshift →', '← midshift'] },
                            { field: 'mm', id: `${p}_mshift_mm`, placeholder: 'mm' },
                            { btn: `${p}_hern`, states: ['herniace', 'subfalcinní', 'transtent.', 'tonzilární'] }
                        ]
                    ], 'brain'),
                    helpers.Table1col(`${p}_e_excl`, [ [ 'Etiologie:', { btn: `${p}_e_isc`, type: 'basic', text: 'ischemie' }, { btn: `${p}_e_ick`, type: 'basic', text: 'ICK' }, { btn: `${p}_e_sdh`, type: 'basic', text: 'SDH' }, { btn: `${p}_e_edh`, type: 'basic', text: 'EDH' }, { btn: `${p}_e_sak`, type: 'basic', text: 'SAK' }, { btn: `${p}_e_ivh`, type: 'basic', text: 'IVH' } ] ])
                ])
            );
        });

        layoutNodes.push(
            helpers.TableMain('brain_wml_main', 'Mozkový parenchym', [
                helpers.Table2colNormal('br_svd_table', 'SVD, PVS a glióza', [
                    [ 'Fazekas:', { btn: 'br_faz', states: ['0', '1', '2', '3'] } ],
                    [ 'Lakuny:', [ { btn: 'br_lak', states: ['0', 'difuzně', 'CSO', 'BG', 'talamus'] }, { btn: 'br_lak_lat', states: ['bilat.', 'R', 'L'] } ] ],
                    [ 'PVS:', [ { btn: 'br_pvs', states: ['0', 'BG', 'CSO', 'etat'] }, { btn: 'br_pvs_lat', states: ['bilat.', 'R', 'L'] } ] ],
                    [ 'Nespec. glióza:', [ { btn: 'br_gli', states: ['0', '+', '++', '+++'] }, { btn: 'br_gli_loc', states: [ 'S-B', 'S-R', 'S-L', 'F-B', 'F-R', 'F-L', 'P-B', 'P-R', 'P-L'] } ] ]
                ]),
                helpers.Table2colNormal('br_dem_table', 'Demyelinizace', [
                    [ 'Periventrikulární:', { btn: 'br_dem_peri', states: ['0', '1', '1-', '1+', 'více', 'více-', 'více+'] } ],
                    [ 'Juxtakortikální:', { btn: 'br_dem_jux', states: ['0', '1', '1-', '1+', 'více', 'více-', 'více+'] } ],
                    [ 'Infratentoriální:', { btn: 'br_dem_inf', states: ['0', '1', '1-', '1+', 'více', 'více-', 'více+'] } ],
                    [ 'Corpus Callosum:', { btn: 'br_dem_cc', states: ['0', '1', '1-', '1+', 'více', 'více-', 'více+'] } ]
                ]),
                helpers.Table1col('br_wml_ost_add', [ 
                    { field: 'text', id: 'br_wml_custom_desc', placeholder: 'vlastní popis WML...' }, 
                    { field: 'text', id: 'br_wml_custom_conc', placeholder: 'vlastní závěr WML...' } 
                ])
            ])
        );

        layoutNodes.push(
            helpers.TableMain('brain_atr_main', 'Komory, extra-axiální prostory', [
                helpers.Table2colNormal('br_atr_table', 'Kortex a atrofie', [
                    [ 'GCA (Globální):', { btn: 'br_gca', states: ['0', '1', '2', '3'] } ],
                    [ 'MTA (Mediotemporální):', { btn: 'br_mta', states: ['0', '1', '2', '3', '4'] } ],
                    [ 'Koedam (Parietální):', { btn: 'br_koedam', states: ['0', '1', '2', '3'] } ]
                ]),
                helpers.Table2colNormal('br_likvor_table', 'Komory a SA prostory', [
                    [ 'Komory:', { btn: 'br_kom_sire', states: ['0', '+', '++', 'asym.'] } ],
                    [ 'Hydrocefalus:', { btn: 'br_hydro', states: ['0', 'e vacuo', 'NPH', 'obstrukční', 'komunikující'] } ],
                    [ 'SA prostory:', { btn: 'br_sa_prostory', states: ['0', 'přiměřené', 'zúžené', 'vymizelé', 'rozšířené'] } ]
                ]),
                helpers.Table1col('br_atr_ost_add', [ 
                    { field: 'text', id: 'br_atr_custom_desc', placeholder: 'vlastní popis kortexu a komor...' }, 
                    { field: 'text', id: 'br_atr_custom_conc', placeholder: 'vlastní závěr kortexu a komor...' } 
                ])
            ])
        );

        layoutNodes.push(
            helpers.TableMain('brain_cpa_main', 'Kraniální nervy, IAC', [
                helpers.Table3colRL('br_cpa_table', 'Expanze a konflikty', [
                    [ { btn: 'br_cpa_exp_r', states: ['0', 'schwanom', 'meningeom', 'cysta'] }, 'Expanze', { btn: 'br_cpa_exp_l', states: ['0', 'schwanom', 'meningeom', 'cysta'] } ],
                    [ { btn: 'br_cpa_kon_r', states: ['0', 'I', 'II', 'III'] }, 'konflikt VIII.', { btn: 'br_cpa_kon_l', states: ['0', 'I', 'II', 'III'] } ],
                    [ { btn: 'br_cpa_kon5_r', states: ['0', '+', '++'] }, 'konflikt V.', { btn: 'br_cpa_kon5_l', states: ['0', '+', '++'] } ]
                ]),
                helpers.Table1col('br_cpa_ost_add', [ 
                    { field: 'text', id: 'br_cpa_custom_desc', placeholder: 'vlastní popis MMK...' }, 
                    { field: 'text', id: 'br_cpa_custom_conc', placeholder: 'vlastní závěr MMK...' } 
                ])
            ])
        );

        layoutNodes.push(
            helpers.TableMain('brain_sella_main', 'Sella, hypofýza', [
                helpers.Table2colNormal('br_sella_table', 'Sella a epifýza', [
                    [ 'Sella:', { btn: 'br_sella', states: ['0', 'cysta', 'partial', 'empty'] } ],
                    [ 'Epifýza:', { btn: 'br_epi', states: ['0', 'cysta [field:field_mm:mm]', 'ložisko [field:field_mm:mm]'] } ]
                ]),
                helpers.Table1col('br_sella_ost_add', [ 
                    { field: 'text', id: 'br_sella_custom_desc', placeholder: 'vlastní popis selly a epifýzy...' }, 
                    { field: 'text', id: 'br_sella_custom_conc', placeholder: 'vlastní závěr selly a epifýzy...' } 
                ])
            ])
        );

        /* --- WILLISŮV OKRUH A ARTERIE --- */
        layoutNodes.push(
            helpers.TableMain('brain_vessels_main', 'Cévy', [
                helpers.Table2colNormal('br_ves_pat_table', '', [
                    [ 'Typ patologie:', [ { btn: 'br_ves_pat', states: ['0', 'aneurysma', 'stenóza', 'uzávěr'] }, { field: 'size', id: 'br_ves_size', placeholder: 'mm' } ] ]
                ]),
                helpers.Table3colRCL('br_ves_w_table', 'Tepny', [
                    [ { btn: 'br_ves_aca_r', states: ['ACA', 'ACA', 'A1 ACA', 'A2 ACA'] }, { btn: 'br_ves_acoa', type: 'basic', text: 'ACoA' }, { btn: 'br_ves_aca_l', states: ['ACA', 'ACA', 'A1 ACA', 'A2 ACA'] } ],
                    [ { btn: 'br_ves_ica_r', states: ['ICA', 'ICA', 'C7 ICA', 'C6 ICA', 'C5 ICA', 'C4 ICA', 'C3 ICA', 'C2 ICA', 'C1 ICA'] }, '', { btn: 'br_ves_ica_l', states: ['ICA', 'ICA', 'C7 ICA', 'C6 ICA', 'C5 ICA', 'C4 ICA', 'C3 ICA', 'C2 ICA', 'C1 ICA'] } ],
                    [ { btn: 'br_ves_mca_r', states: ['MCA', 'MCA', 'M1 MCA', 'M2 MCA', 'M3 MCA'] }, '', { btn: 'br_ves_mca_l', states: ['MCA', 'MCA', 'M1 MCA', 'M2 MCA', 'M3 MCA'] } ],
                    [ { btn: 'br_ves_acop_r', type: 'basic', text: 'ACoP' }, '', { btn: 'br_ves_acop_l', type: 'basic', text: 'ACoP' } ],
                    [ { btn: 'br_ves_pca_r', states: ['PCA', 'PCA', 'P1 PCA', 'P2 PCA'] }, '', { btn: 'br_ves_pca_l', states: ['PCA', 'PCA', 'P1 PCA', 'P2 PCA'] } ],
                    [ '', { btn: 'br_ves_ba', type: 'basic', text: 'BA' }, '' ],
                    [ { btn: 'br_ves_pica_r', type: 'basic', text: 'PICA' }, '', { btn: 'br_ves_pica_l', type: 'basic', text: 'PICA' } ],
                    [ { btn: 'br_ves_va_r', states: ['VA', 'VA', 'V4 VA', 'V3 VA', 'V2 VA', 'V1 VA'] }, '', { btn: 'br_ves_va_l', states: ['VA', 'VA', 'V4 VA', 'V3 VA', 'V2 VA', 'V1 VA'] } ]
                ]),
                helpers.Table3colRCL('br_var_table', 'Variace', [
                    [ { btn: 'br_var_a1_r', states: ['0', '+'] }, 'Hypoplázie A1 ACA', { btn: 'br_var_a1_l', states: ['0', '+'] } ],
                    [ { btn: 'br_var_fetal_r', states: ['0', 'P', 'C'] }, 'Fetální typ PCA', { btn: 'br_var_fetal_l', states: ['0', 'P', 'C'] } ],
                    [ { btn: 'br_var_va_r', states: ['0', '+'] }, 'Hypoplázie VA', { btn: 'br_var_va_l', states: ['0', '+'] } ],
                    [ { btn: 'br_var_vapica_r', states: ['0', '+'] }, 'VA končící jako PICA', { btn: 'br_var_vapica_l', states: ['0', '+'] } ],
                    [ { btn: 'br_var_pica_r', states: ['0', '+'] }, 'Gracilní PICA', { btn: 'br_var_pica_l', states: ['0', '+'] } ]
                ]),
                helpers.Table1col('br_ves_ost_add', [ 
                    { field: 'text', id: 'br_ves_custom_desc', placeholder: 'vlastní cévní popis...' }, 
                    { field: 'text', id: 'br_ves_custom_conc', placeholder: 'vlastní cévní závěr...' } 
                ])
            ])
        );

        /* --- ORBITY --- */
        layoutNodes.push(
            helpers.TableMain('brain_orbits_main', 'Orbity', [
                helpers.Table3colRL('br_orb_bulbus', 'Bulbus', [
                    [ { btn: 'br_orb_exo_r', states: ['0', '+'] }, 'Exoftalmus', { btn: 'br_orb_exo_l', states: ['0', '+'] } ],
                    [ { btn: 'br_orb_pht_r', states: ['0', '+'] }, 'Phthisis', { btn: 'br_orb_pht_l', states: ['0', '+'] } ],
                    [ { btn: 'br_orb_iol_r', states: ['0', '+'] }, 'IOL / Artefakie', { btn: 'br_orb_iol_l', states: ['0', '+'] } ],
                    [ { btn: 'br_orb_amo_r', states: ['0', '+'] }, 'Odchlípení sítnice', { btn: 'br_orb_amo_l', states: ['0', '+'] } ]
                ]),
                helpers.Table3colRL('br_orb_nerv', 'Nervus opticus a svaly', [
                    [ { btn: 'br_orb_no_ztl_r', states: ['0', '+'] }, 'N. opticus - ztluštění', { btn: 'br_orb_no_ztl_l', states: ['0', '+'] } ],
                    [ { btn: 'br_orb_no_atr_r', states: ['0', '+'] }, 'N. opticus - atrofie', { btn: 'br_orb_no_atr_l', states: ['0', '+'] } ],
                    [ { btn: 'br_orb_sval_r', states: ['0', '+'] }, 'Okohybné svaly - ztluštění', { btn: 'br_orb_sval_l', states: ['0', '+'] } ]
                ]),
                helpers.Table3colRL('br_orb_slz', 'Slzná žláza', [
                    [ { btn: 'br_orb_slz_zvet_r', states: ['0', '+'] }, 'Zvětšení', { btn: 'br_orb_slz_zvet_l', states: ['0', '+'] } ],
                    [ { btn: 'br_orb_slz_res_r', states: ['0', '+'] }, 'Resekce', { btn: 'br_orb_slz_res_l', states: ['0', '+'] } ]
                ]),
                helpers.Table1col('br_orb_ost_add', [
                    { field: 'text', id: 'br_orb_custom_desc', placeholder: 'vlastní popis orbit...' },
                    { field: 'text', id: 'br_orb_custom_conc', placeholder: 'vlastní závěr orbit...' }
                ])
            ])
        );

        layoutNodes.push(
            helpers.TableMain('brain_sinus_main', 'VDN, baze', [
                helpers.Table3colRL('br_sinus_table', [
                    [ { btn: 'sinus_front_r', states: ['0', 'cysta', 'hyper+', 'hyper++', 'tekutina'] }, 'frontální', { btn: 'sinus_front_l', states: ['0', 'cysta', 'hyper+', 'hyper++', 'tekutina'] } ],
                    [ { btn: 'sinus_ethmo_r', states: ['0', 'cysta', 'hyper+', 'hyper++', 'tekutina'] }, 'ethmoidální', { btn: 'sinus_ethmo_l', states: ['0', 'cysta', 'hyper+', 'hyper++', 'tekutina'] } ],
                    [ { btn: 'sinus_sfeno_r', states: ['0', 'cysta', 'hyper+', 'hyper++', 'tekutina'] }, 'sfenoidální', { btn: 'sinus_sfeno_l', states: ['0', 'cysta', 'hyper+', 'hyper++', 'tekutina'] } ],
                    [ { btn: 'sinus_maxil_r', states: ['0', 'cysta', 'hyper+', 'hyper++', 'tekutina'] }, 'maxilární', { btn: 'sinus_maxil_l', states: ['0', 'cysta', 'hyper+', 'hyper++', 'tekutina'] } ]
                ]),
                helpers.Table3colRL('br_ucho_table', [
                    [ { btn: 'ucho_stred_r', states: ['0', 'tekutina', 'zastření', 'sklerotizace', 'defekt'] }, 'středouší', { btn: 'ucho_stred_l', states: ['0', 'tekutina', 'zastření', 'sklerotizace', 'defekt'] } ],
                    [ { btn: 'ucho_mast_r', states: ['0', 'tekutina', 'zastření', 'sklerotizace', 'defekt'] }, 'mastoidy', { btn: 'ucho_mast_l', states: ['0', 'tekutina', 'zastření', 'sklerotizace', 'defekt'] } ]
                ]),
                helpers.Table1col('neck_sinus_add', [
                    { field: 'text', id: 'sinus_custom_desc', placeholder: 'vlastní...popis...' },
                    { field: 'text', id: 'sinus_custom_conc', placeholder: 'vlastní...závěr...' }
                ])
            ])
        );

        return layoutNodes;
    },
    compile: (ctx) => {
        let reportOut = [{ type: 'heading', text: 'Mozek:', action: 'open-region', regionId: 'brain' }];
        let concMain = [];
        let concInc = [];
        
        const examId = ctx.examId || 'default';
        const isMR = (examId || '').toLowerCase().includes('mr');
        const cap = (s) => s && s.charAt(0).toUpperCase() + s.slice(1);

        let bilaHmotaRep = [];
        let atrofieSaRep = [];
        let komoryRep = [];
        let cpaRep = [];
        let sellaRep = [];
        let epiRep = [];
        let vesRep = [];

        // --- PŘÍPRAVA LÉZÍ A JEJICH LOKALIZACÍ ---
        const lesInsts = Store.instances?.['brain_lesion_main'] || [];
        const hemoInsts = Store.instances?.['brain_hemo_main'] || [];
        let parsedLesions = [];
        let hasDwiPlus = false;
        let hasMmkLesion = false;
        let hasSellaLesion = false;

        // ZPRACOVÁNÍ BĚŽNÝCH LÉZÍ
        if (lesInsts.length > 0) {
            lesInsts.forEach(instId => {
                const p = `bl_${instId}`;
                let lok = [];
                const addS = (id, lab) => {
                    let r = ctx.isActive(`${p}_p_${id}_r`), l = ctx.isActive(`${p}_p_${id}_l`);
                    if (r && l) {
                        if (id === 'mes') lok.push('v mesencephalu centrálně');
                        else if (id === 'pon') lok.push('v pontu centrálně');
                        else if (id === 'obl') lok.push('v oblongatě centrálně');
                        else lok.push(`${lab} bilat.`);
                    } else if (r) {
                        lok.push(`${lab} vpravo`);
                    } else if (l) {
                        lok.push(`${lab} vlevo`);
                    }
                };
                const labs = { fro:'frontálně', par:'parietálně', tem:'temporálně', occ:'okcipitálně', bg:'v BG', tal:'v talamu', moz:'v mozečku', mes:'v mesencephalu', pon:'v pontu', obl:'v oblongatě', men:'na meningách', kal:'v kalvě' };
                Object.entries(labs).forEach(([k,v]) => addS(k, v));
                const orR = ctx.text(`${p}_p_orb_r`), orL = ctx.text(`${p}_p_orb_l`);
                const getOrbText = (val, side) => {
                    if (val === 'bulbus') return side === 'bilat' ? 'v obou bulbech' : (side === 'r' ? 'v pravém bulbu' : 'v levém bulbu');
                    const orbStr = side === 'bilat' ? 'v orbitách bilat.' : (side === 'r' ? 'v pravé orbitě' : 'v levé orbitě');
                    return `${orbStr} ${val === 'intra' ? 'intrakonálně' : 'extrakonálně'}`;
                };
                
                if (orR !== '0' || orL !== '0') {
                    if (orR === orL) {
                        lok.push(getOrbText(orR, 'bilat'));
                    } else {
                        if (orR !== '0') lok.push(getOrbText(orR, 'r'));
                        if (orL !== '0') lok.push(getOrbText(orL, 'l'));
                    }
                }
                if (ctx.isActive(`${p}_p_epi`)) lok.push('v epifýze');
                if (ctx.isActive(`${p}_p_intra`)) lok.push('intraselárně');
                if (ctx.isActive(`${p}_p_supra`)) lok.push('supraselárně');
                addS('para', 'paraselárně');
                addS('latk', 'v postranní komoře');
                if (ctx.isActive(`${p}_p_3k`)) lok.push('ve III. komoře');
                if (ctx.isActive(`${p}_p_4k`)) lok.push('ve IV. komoře');
                addS('mmk', 'v MMK');
                let axSuffix = "";
                if (ctx.isActive(`${p}_p_extra`)) axSuffix += " extraaxiálně";
                if (ctx.isActive(`${p}_p_intra_ax`)) axSuffix += " intraaxiálně";

                if (ctx.isActive(`${p}_p_mmk_r`) || ctx.isActive(`${p}_p_mmk_l`)) hasMmkLesion = true;
                if (ctx.isActive(`${p}_p_supra`) || ctx.isActive(`${p}_p_para_r`) || ctx.isActive(`${p}_p_intra`) || ctx.isActive(`${p}_p_para_l`)) hasSellaLesion = true;
                if (ctx.text(`${p}_mr_dwi`) === 'DWI +') hasDwiPlus = true;

                let edem = ctx.text(`${p}_edem`);
                let mshift = ctx.text(`${p}_mshift`);
                let mshift_mm = ctx.field(`${p}_mshift_mm`);
                let hern = ctx.text(`${p}_hern`);

                let hasEdem = ctx.isActive(`${p}_edem`);
                let hasMshift = ctx.isActive(`${p}_mshift`);
                let hasHern = ctx.isActive(`${p}_hern`);

                let d = LESIONS_DEFINITION.parseDetails(ctx, examId, 'brain', p, `${p}_met`, `${p}_e`, false);
                
                if (d.hasAny || lok.length > 0 || axSuffix || hasEdem || hasMshift || hasHern) {
                    let fullLok = formatCzechList(lok);
                    if (fullLok && axSuffix) fullLok += axSuffix; 
                    else if (axSuffix) fullLok = axSuffix.trim();

                    let repText = `${d.baseText} ${fullLok}${d.doplneniStr}${d.vzhledText}${d.metrikyStr}.`.replace(/\s+/g, ' ').replace(' .', '.');

                    let repSentences = [];
                    if (hasEdem) repSentences.push(`Je vyjádřen ${edem.includes('++') ? 'výraznější ' : ''}perifokální edém.`);
                    if (hasMshift) repSentences.push(`Je přítomen midline shift${mshift_mm ? ' '+mshift_mm+' mm' : ''} ${mshift.includes('doleva') ? 'doleva' : 'doprava'}.`);
                    if (hasHern) repSentences.push(`Jsou patrny známky ${hern} herniace.`);
                    if (repSentences.length > 0) repText += ` ${repSentences.join(' ')}`;

                    let cPart1 = `${d.baseText} ${fullLok}${d.doplneniStr}${d.actStr}${d.dynStr}`;
                    if (hasEdem) cPart1 += ` s ${edem.includes('++') ? 'výraznějším ' : ''}perifokálním edémem`;
                    let c = cPart1;
                    if (d.etioStr) c += `: ${d.etioStr}.`; else c += `.`;

                    let concSentences = [];
                    if (hasMshift || hasHern) {
                        let causes = [];
                        if (hasMshift) causes.push(`midline shift ${mshift.includes('doleva') ? 'doleva' : 'doprava'}${mshift_mm ? ' o '+mshift_mm+' mm' : ''}`);
                        if (hasHern) causes.push(`susp. ${hern === 'transtent.' ? 'transtentoriální' : hern} herniaci`);
                        concSentences.push(`Způsobuje ${causes.join(', ')}.`);
                    }
                    if (concSentences.length > 0) c += ` ${concSentences.join(' ')}`;

                    parsedLesions.push({ tableId: `brain_lesion_main__${instId}`, repText, concText: c.replace(/\s+/g, ' ').replace(' : ', ': ') });
                }
            });
        }

        // ZPRACOVÁNÍ ISCHEMIÍ A KRVÁCENÍ (HEMO)
        if (hemoInsts.length > 0) {
            hemoInsts.forEach(instId => {
                const p = `bh_${instId}`;
                let lok = [];
                const addS = (id, lab) => {
                    let r = ctx.isActive(`${p}_p_${id}_r`), l = ctx.isActive(`${p}_p_${id}_l`);
                    if (r && l) {
                        if (id === 'mes') lok.push('v mesencephalu centrálně');
                        else if (id === 'pon') lok.push('v pontu centrálně');
                        else if (id === 'obl') lok.push('v oblongatě centrálně');
                        else lok.push(`${lab} bilat.`);
                    } else if (r) {
                        lok.push(`${lab} vpravo`);
                    } else if (l) {
                        lok.push(`${lab} vlevo`);
                    }
                };
                const labs = { fro:'frontálně', par:'parietálně', tem:'temporálně', occ:'okcipitálně', bg:'v BG', tal:'v talamu', moz:'v mozečku', mes:'v mesencephalu', pon:'v pontu', obl:'v oblongatě' };
                Object.entries(labs).forEach(([k,v]) => addS(k, v));

                let spaces = [];
                if (ctx.isActive(`${p}_sp_epi`)) spaces.push('epidurálně');
                if (ctx.isActive(`${p}_sp_subd`)) spaces.push('subdurálně');
                if (ctx.isActive(`${p}_sp_suba`)) spaces.push('subarachnoidálně');
                if (ctx.isActive(`${p}_sp_iv`)) spaces.push('intraventrikulárně');
                if (ctx.isActive(`${p}_sp_ks`)) spaces.push('kortiko-subkortikálně');
                if (ctx.isActive(`${p}_sp_ip`)) spaces.push('intraparenchymatózně');

                const pocetIds = [`${p}_c_soli`, `${p}_c_dve`, `${p}_c_vice`, `${p}_c_mnoho`];
                let pocetRawId = pocetIds.find(id => ctx.isActive(id));
                let pocetText = pocetRawId ? ButtonConfigs[`${examId}_brain_${pocetRawId}`].text : 'solitární';

                const druhIds = [`${p}_k_lez`, `${p}_k_kol`, `${p}_k_lem`, `${p}_k_cust`];
                let druhRawId = druhIds.find(id => ctx.isActive(id));
                let druhRaw = 'léze';
                if (druhRawId === `${p}_k_cust`) druhRaw = Store.customTexts[`${examId}_brain_${p}_k_cust`] || 'léze';
                else if (druhRawId === `${p}_k_kol`) druhRaw = 'kolekce';
                else if (druhRawId === `${p}_k_lem`) druhRaw = 'lem tekutiny';

                let druhObj = GRAMMAR_DICT.druh[druhRaw] || { rod: 'f', plural: druhRaw };
                let isPlural = pocetText !== 'solitární';
                let pocetSlovo = GRAMMAR_DICT.pocet[pocetText]?.[druhObj.rod] || pocetText;
                let druhSlovo = isPlural ? druhObj.plural : druhRaw;
                let baseText = pocetText === 'solitární' ? cap(druhSlovo) : cap(`${pocetSlovo} ${druhSlovo}`.trim());

                const phaseIds = ['hyp', 'ak', 'sub', 'chr'];
                let phaseMRId = phaseIds.find(id => ctx.isActive(`${p}_mr_${id}`));
                let phaseMR = phaseMRId ? ButtonConfigs[`${examId}_brain_${p}_mr_${phaseMRId}`].text : null;

                let phaseCTId = phaseIds.find(id => ctx.isActive(`${p}_ct_${id}`));
                let phaseCT = phaseCTId ? ButtonConfigs[`${examId}_brain_${p}_ct_${phaseCTId}`].text : null;

                const etioIds = ['isc', 'ick', 'sdh', 'edh', 'sak', 'ivh'];
                let etioId = etioIds.find(id => ctx.isActive(`${p}_e_${id}`));
                let etio = etioId ? ButtonConfigs[`${examId}_brain_${p}_e_${etioId}`].text : null;

                let isBleed = etio && etio !== 'ischemie';
                let vzhledArr = [];

                if (phaseMR) {
                    if (etio === 'ischemie') {
                        if (phaseMR === 'hyperakutní') { vzhledArr.push('s restrikcí difuze bez jasného T2/FLAIR korelátu'); hasDwiPlus = true; }
                        else if (phaseMR === 'akutní') { vzhledArr.push('s restrikcí difuze a T2/FLAIR hypersignálem'); hasDwiPlus = true; }
                        else if (phaseMR === 'subakutní') vzhledArr.push('s T2/FLAIR hypersignálem, postkontrastním sycením a pseudonormalizací ADC');
                        else if (phaseMR === 'chronické') vzhledArr.push('charakteru postmalatické pseudocysty s gliózou v okolí');
                    } else {
                        if (phaseMR === 'hyperakutní') vzhledArr.push('izo/hypersignální v T1 a hypersignální v T2');
                        else if (phaseMR === 'akutní') vzhledArr.push('izosignální v T1 a výrazně hyposignální v T2');
                        else if (phaseMR === 'subakutní') vzhledArr.push('hypersignální v T1 a T2');
                        else if (phaseMR === 'chronické') vzhledArr.push('s výrazným hyposignálním lemem v T2* obrazu - hemosiderin');
                    }
                }
                if (phaseCT) {
                        if (etio === 'ischemie') {
                            if (phaseCT === 'hyperakutní') vzhledArr.push('bez zřetelných hypodenzit, s event. setřením kortiko-medulární hranice');
                            else if (phaseCT === 'akutní') vzhledArr.push('s patrným edémem a hypodenzitou parenchymu');
                            else if (phaseCT === 'subakutní') vzhledArr.push('s hypodenzitou a event. sycením');
                            else if (phaseCT === 'chronické') vzhledArr.push('s postmalatickou hypodenzitou blížící se denzitě likvoru');
                        } else {
                            if (phaseCT === 'hyperakutní' || phaseCT === 'akutní') vzhledArr.push('hyperdenzní');
                            else if (phaseCT === 'subakutní') vzhledArr.push('izodenzní');
                            else if (phaseCT === 'chronické') vzhledArr.push('hypodenzní');
                        }
                }

                let vzhledText = vzhledArr.length > 0 ? ` (${vzhledArr.join(', v CT ')})` : '';

                let rowNej = document.getElementById(`${p}_r7`);
                if (rowNej) {
                    const wrapperTr = rowNej.closest('tr');
                    if (wrapperTr) wrapperTr.style.display = (pocetText === 'solitární') ? 'none' : '';
                }

                let metrikyStr = LESIONS_DEFINITION.parseLesionMetrics(ctx, `${p}_met`, pocetText, ctx.field(`${p}_nej_text`));
                let doplneni = ctx.isActive(`${p}_doplneni`) ? (Store.customTexts[`${examId}_brain_${p}_doplneni`] || '') : '';
                let doplneniStr = doplneni ? ` ${doplneni}` : '';

                let edem = ctx.text(`${p}_edem`);
                let mshift = ctx.text(`${p}_mshift`);
                let mshift_mm = ctx.field(`${p}_mshift_mm`);
                let hern = ctx.text(`${p}_hern`);
                let hasEdem = ctx.isActive(`${p}_edem`);
                let hasMshift = ctx.isActive(`${p}_mshift`);
                let hasHern = ctx.isActive(`${p}_hern`);

                let fullLok = spaces.join(' a ');
                if (fullLok && lok.length > 0) fullLok += ` ${formatCzechList(lok)}`;
                else if (lok.length > 0) fullLok = formatCzechList(lok);

                if (baseText || fullLok || vzhledText || metrikyStr || doplneniStr) {
                    let repText = `${baseText} ${fullLok}${doplneniStr}${vzhledText}${metrikyStr}.`.replace(/\s+/g, ' ').replace(' .', '.');
                    let repSentences = [];
                    if (hasEdem) repSentences.push(`Je vyjádřen ${edem.includes('++') ? 'výraznější ' : ''}perifokální edém.`);
                    if (hasMshift) repSentences.push(`Je přítomen midline shift${mshift_mm ? ' '+mshift_mm+' mm' : ''} ${mshift.includes('doleva') ? 'doleva' : 'doprava'}.`);
                    if (hasHern) repSentences.push(`Jsou patrny známky ${hern} herniace.`);
                    if (repSentences.length > 0) repText += ` ${repSentences.join(' ')}`;

                    let phasePrefix = phaseMR || phaseCT || '';
                    if (phasePrefix) phasePrefix = cap(phasePrefix);
                    
                    let diag = etio === 'ischemie' ? 'Ischemie' : (etio || cap(druhSlovo));
                    if (etio === 'ICK') diag = 'Intracerebrální krvácení';
                    
                    let cDiag = phasePrefix ? `${phasePrefix} ${diag.toLowerCase()}` : diag;
                    
                    let cPart1 = `${cDiag} ${fullLok}`;
                    if (hasEdem) cPart1 += ` s ${edem.includes('++') ? 'výraznějším ' : ''}perifokálním edémem`;
                    let c = cPart1 + '.';

                    let concSentences = [];
                    if (hasMshift || hasHern) {
                        let causes = [];
                        if (hasMshift) causes.push(`midline shift ${mshift.includes('doleva') ? 'doleva' : 'doprava'}${mshift_mm ? ' o '+mshift_mm+' mm' : ''}`);
                        if (hasHern) causes.push(`susp. ${hern === 'transtent.' ? 'transtentoriální' : hern} herniaci`);
                        concSentences.push(`Způsobuje ${causes.join(', ')}.`);
                    }
                    if (concSentences.length > 0) c += ` ${concSentences.join(' ')}`;

                    parsedLesions.push({ tableId: `brain_hemo_main__${instId}`, repText, concText: c.replace(/\s+/g, ' ') });
                }
            });
        }

        // --- 1. LÉZE ---
        if (parsedLesions.length > 0) {
            parsedLesions.forEach(les => {
                reportOut.push({ type: 'frame', text: cap(les.repText), tableId: les.tableId });
                concMain.push({ type: 'frame', text: cap(les.concText), tableId: les.tableId });
            });
        }

        // --- 2. RESTRIKCE DIFUZE (Pouze MR, pokud už je ložisko / krvácení / ischemie) ---
        if (parsedLesions.length > 0 && isMR && !hasDwiPlus) {
            reportOut.push({ type: 'frame', text: 'Bez zvýšené restrikce difuze.', tableId: 'brain_lesion_main', dimmed: true });
        }

        // --- 1. WML: SVD, PVS A DEMYELINIZACE ---
        let faz = ctx.text('br_faz');
        if (faz && faz !== '0') {
            if (faz === '1') { bilaHmotaRep.push('ojedinělá tečkovitá T2W+ FLAIR+ ložiska'); concInc.push({ type: 'frame', text: 'Mírná chronická ischemizace bílé hmoty (Fazekas 1).', tableId: 'brain_wml_main' }); }
            if (faz === '2') { bilaHmotaRep.push('mnohočetná T2W+ FLAIR+ ložiska s tendencí ke splývání'); concInc.push({ type: 'frame', text: 'Střední chronická ischemizace bílé hmoty (Fazekas 2).', tableId: 'brain_wml_main' }); }
            if (faz === '3') { bilaHmotaRep.push('rozsáhlé konfluující T2W+ FLAIR+ změny'); concInc.push({ type: 'frame', text: 'Pokročilá chronická ischemizace bílé hmoty (Fazekas 3).', tableId: 'brain_wml_main' }); }
        }

        let lak = ctx.text('br_lak');
        if (lak && lak !== '0') {
            let lakLat = ctx.text('br_lak_lat');
            let latStr = lakLat === 'R' ? ' vpravo' : (lakLat === 'L' ? ' vlevo' : (lakLat === 'bilat.' ? ' bilat.' : ''));
            const lMap = { 'difuzně': 'difuzně', 'CSO': 'v CSO', 'BG': 'v BG', 'talamus': 'v talamu' };
            let lLoc = lMap[lak] || lak;
            bilaHmotaRep.push(`vícečetné lakuny ${lLoc}${latStr}`);
            concInc.push({ type: 'frame', text: `Postmalatické změny char. lakunárních infarktů ${lLoc}${latStr}.`, tableId: 'brain_wml_main' });
        }

        let pvs = ctx.text('br_pvs');
        if (pvs && pvs !== '0') {
            let pvsLat = ctx.text('br_pvs_lat');
            let latStr = pvsLat === 'R' ? ' vpravo' : (pvsLat === 'L' ? ' vlevo' : (pvsLat === 'bilat.' ? ' bilat.' : ''));
            const pMap = { 'BG': 'v BG', 'CSO': 'v centrum semiovale', 'etat': 'etat crible' };
            let pLoc = pMap[pvs] || pvs;
            let pTxt = `zvýrazněné perivaskulární prostory (${pLoc}${latStr})`;
            bilaHmotaRep.push(pTxt);
            concInc.push({ type: 'frame', text: cap(`zvýrazněné perivaskulární prostory ${pLoc}${latStr}.`), tableId: 'brain_wml_main' });
        }

        let gli = ctx.text('br_gli');
        if (gli && gli !== '0') {
            let gLoc = ctx.text('br_gli_loc');
            let locStr = '';
            let latStr = '';
            
            if (gLoc && gLoc !== '0') {
                const parts = gLoc.split('-');
                if (parts.length === 2) {
                    const locMap = { 'S': 'supratentoriálně', 'F': 'frontálně', 'P': 'parietálně' };
                    const latMap = { 'B': 'bilat.', 'R': 'vpravo', 'L': 'vlevo' };
                    locStr = ` ${locMap[parts[0]]}`;
                    latStr = ` ${latMap[parts[1]]}`;
                }
            }
            
            let gWord = gli === '+' ? 'ojedinělé' : (gli === '++' ? 'sporadické' : 'vícečetné');
            let gWordCap = gWord.charAt(0).toUpperCase() + gWord.slice(1);
            bilaHmotaRep.push(`${gWord} drobné T2W+ FLAIR+ léze v hlubší bílé hmotě${locStr}${latStr}`);
            concInc.push({ type: 'frame', text: `${gWordCap} nespecifické drobné gliové léze v bílé hmotě${locStr}${latStr}.`, tableId: 'brain_wml_main' });
        }

        const demLocs = [
            { id: 'br_dem_peri', name: 'periventrikulární' },
            { id: 'br_dem_jux', name: 'juxtakortikální' },
            { id: 'br_dem_inf', name: 'infratentoriální' },
            { id: 'br_dem_cc', name: 'v corpus callosum' }
        ];

        let demReportParts = [];
        let demConcParts = [];

        demLocs.forEach(l => {
            let val = ctx.text(l.id);
            if (val && val !== '0') {
                let isPlural = val.includes('více');
                let actSign = val.includes('-') ? '-' : (val.includes('+') ? '+' : '');

                let countWord = isPlural ? 'vícečetné' : 'solitární';
                let actRep = actSign === '-' ? ' bez sycení' : (actSign === '+' ? ' se sycením' : '');
                let actConcAdj = actSign === '-' ? 'neaktivní ' : (actSign === '+' ? 'aktivní ' : '');

                if (l.name === 'v corpus callosum') {
                    demReportParts.push(`${countWord} T2W+ FLAIR+ léze v corpus callosum${actRep}`);
                    demConcParts.push(`${countWord} ${actConcAdj}léze v corpus callosum`);
                } else {
                    demReportParts.push(`${countWord} ${l.name} T2W+ FLAIR+ léze${actRep}`);
                    demConcParts.push(`${countWord} ${actConcAdj}${l.name} léze`);
                }
            }
        });

        if (demReportParts.length > 0) {
            bilaHmotaRep.push(formatCzechList(demReportParts));
            let finalConc = cap(formatCzechList(demConcParts)) + " susp. demyelinizační etiologie.";
            concMain.push({ type: 'frame', text: finalConc, tableId: 'brain_wml_main' });
        }

        let wmlDesc = ctx.field('br_wml_custom_desc');
        if (wmlDesc) bilaHmotaRep.push(wmlDesc);
        
        let wmlConc = ctx.field('br_wml_custom_conc');
        if (wmlConc) concInc.push({ type: 'frame', text: wmlConc, tableId: 'brain_wml_main' });

        if (bilaHmotaRep.length > 0) {
            reportOut.push({ type: 'frame', text: cap(formatCzechList(bilaHmotaRep)) + '.', tableId: 'brain_wml_main' });
        }

        if (parsedLesions.length === 0) {
            const intensita = isMR ? 'signálová intenzita' : 'denzita';
            let normalTxt = `Normální ${intensita} a morfologie parenchymu. Bez ložisek, akutní ischemie, hemorrhagie, mass efektu.`;
            if (bilaHmotaRep.length === 0) normalTxt += ' Bez lézí v bílé hmotě.';
            reportOut.splice(1, 0, { type: 'frame', text: normalTxt, tableId: 'brain_lesion_main', dimmed: true });
        }

        // --- 2. KORTEX, ATROFIE A KOMORY ---
        let gca = ctx.text('br_gca');
        if (gca && gca !== '0') {
            if (gca === '1') { atrofieSaRep.push('mírné rozšíření kortikálních sulků'); concInc.push({ type: 'frame', text: 'Mírná globální kortikální atrofie (GCA 1).', tableId: 'brain_atr_main' }); }
            if (gca === '2') { atrofieSaRep.push('difuzní atrofie gyrů s rozšířením sulků'); concMain.push({ type: 'frame', text: 'Středně pokročilá globální kortikální atrofie (GCA 2).', tableId: 'brain_atr_main' }); }
            if (gca === '3') { atrofieSaRep.push('výrazná difuzní kortikální atrofie ("knife-blade")'); concMain.push({ type: 'frame', text: 'Pokročilá globální kortikální atrofie (GCA 3).', tableId: 'brain_atr_main' }); }
        }

        let mta = ctx.text('br_mta');
        if (mta && mta !== '0') {
            if (mta === '1') { atrofieSaRep.push('mírné rozšíření choroidálních fisur'); concInc.push({ type: 'frame', text: 'Mírná mediotemporální atrofie (MTA 1).', tableId: 'brain_atr_main' }); }
            if (mta === '2') { atrofieSaRep.push('rozšíření temporálních rohů postranních komor a choroidálních fisur'); concMain.push({ type: 'frame', text: 'Střední mediotemporální atrofie (MTA 2).', tableId: 'brain_atr_main' }); }
            if (mta === '3') { atrofieSaRep.push('výrazný úbytek objemu hipokampů'); concMain.push({ type: 'frame', text: 'Pokročilá mediotemporální atrofie (MTA 3).', tableId: 'brain_atr_main' }); }
            if (mta === '4') { atrofieSaRep.push('těžká atrofie hipokampů s rozsáhlou dilatací temporálních rohů'); concMain.push({ type: 'frame', text: 'Těžká mediotemporální atrofie (MTA 4).', tableId: 'brain_atr_main' }); }
        }

        let koedam = ctx.text('br_koedam');
        if (koedam && koedam !== '0') {
            if (koedam === '1') { atrofieSaRep.push('mírné rozšíření parietálních sulků'); concInc.push({ type: 'frame', text: 'Mírná parietální atrofie (Koedam 1).', tableId: 'brain_atr_main' }); }
            if (koedam === '2') { atrofieSaRep.push('zřetelná atrofie parietálního kortexu a precuneu'); concMain.push({ type: 'frame', text: 'Střední parietální atrofie (Koedam 2).', tableId: 'brain_atr_main' }); }
            if (koedam === '3') { atrofieSaRep.push('výrazná atrofie parietálních laloků'); concMain.push({ type: 'frame', text: 'Výrazná parietální atrofie (Koedam 3).', tableId: 'brain_atr_main' }); }
        }

        let saProstory = ctx.text('br_sa_prostory');
        if (saProstory && saProstory !== '0' && saProstory !== 'přiměřené') {
            if (saProstory === 'zúžené') {
                atrofieSaRep.push('zúžené SA prostory');
                concInc.push({ type: 'frame', text: 'Zúžení zevních likvorových prostorů.', tableId: 'brain_atr_main' });
            }
            else if (saProstory === 'vymizelé') {
                atrofieSaRep.push('vymizelé SA prostory');
                concMain.push({ type: 'frame', text: 'Vymizení SA prostorů (v.s. při edému mozku).', tableId: 'brain_atr_main' });
            }
            else if (saProstory === 'rozšířené') {
                atrofieSaRep.push('rozšířené SA prostory');
            }
        }

        let komSire = ctx.text('br_kom_sire');
        if (komSire && komSire !== '0' && komSire !== 'štíhlé') {
            if (komSire === 'asym.') komoryRep.push('asymetrie postranních komor');
            else if (komSire === '+') {
                komoryRep.push('mírná dilatace komorového systému');
                concInc.push({ type: 'frame', text: 'Mírná dilatace komorového systému.', tableId: 'brain_atr_main' });
            }
            else if (komSire === '++') {
                komoryRep.push('výraznější dilatace komorového systému');
                concMain.push({ type: 'frame', text: 'Dilatace komorového systému ex vacuo.', tableId: 'brain_atr_main' });
            }
        }

        let hydro = ctx.text('br_hydro');
        if (hydro && hydro !== '0') {
            if (hydro === 'e vacuo') {
                komoryRep.push('rozšíření komor a SA prostorů úměrné úbytku parenchymu');
                concInc.push({ type: 'frame', text: 'Hydrocefalus ex vacuo v rámci atrofie.', tableId: 'brain_atr_main' });
            } else if (hydro === 'NPH') {
                komoryRep.push('disproporční dilatace komorového systému, zúžení SA prostorů na konvexitě a rozšíření Sylvijských rýh (obraz DESH)');
                concMain.push({ type: 'frame', text: 'Obraz suspektní z normotenzního hydrocefalu (NPH).', tableId: 'brain_atr_main' });
            } else if (hydro === 'obstrukční') {
                komoryRep.push('balónovitá dilatace komor orálně od suspektní překážky s transependymálním prosáknutím a zúžením zevních SA prostorů');
                concMain.push({ type: 'frame', text: 'Obstrukční hydrocefalus.', tableId: 'brain_atr_main' });
            } else if (hydro === 'komunikující') {
                komoryRep.push('symetrická dilatace komorového systému s volnou komunikací do zevních SA prostorů bez zjevné překážky');
                concMain.push({ type: 'frame', text: 'Komunikující hydrocefalus.', tableId: 'brain_atr_main' });
            }
        }

        let atrDesc = ctx.field('br_atr_custom_desc');
        let atrCombinedRep = [];
        if (atrofieSaRep.length === 0 && komoryRep.length === 0) {
            atrCombinedRep.push('Přiměřená šíře komor a extra-axiálních prostorů odpovídající věku.');
        } else {
            if (atrofieSaRep.length === 0) atrCombinedRep.push('Subarachnoidální prostory oboustranně šířkou přiměřené k věku.');
            else atrCombinedRep.push(cap(formatCzechList(atrofieSaRep)) + '.');

            if (komoryRep.length === 0) atrCombinedRep.push('Komorový systém obvyklé konfigurace, nedilatován.');
            else atrCombinedRep.push(cap(formatCzechList(komoryRep)) + '.');
        }
        
        if (atrDesc) atrCombinedRep.push(cap(atrDesc) + (atrDesc.endsWith('.') ? '' : '.'));

        let atrConc = ctx.field('br_atr_custom_conc');
        if (atrConc) concInc.push({ type: 'frame', text: atrConc, tableId: 'brain_atr_main' });

        let isAtrDimmed = (atrofieSaRep.length === 0 && komoryRep.length === 0 && !atrDesc);
        reportOut.push({ type: 'frame', text: atrCombinedRep.join(' '), tableId: 'brain_atr_main', dimmed: isAtrDimmed });

        // --- 3. MOSTOMOZEČKOVÝ KOUT (CPA) ---
        const cpaSides = ['r', 'l'];
        cpaSides.forEach(side => {
            const sSuffix = side === 'r' ? 'vpravo' : 'vlevo';
            const sLat = side === 'r' ? 'l.dx.' : 'l.sin.';
            
            let exp = ctx.text(`br_cpa_exp_${side}`);
            if (exp && exp !== '0') {
                if (exp === 'schwanom') {
                    cpaRep.push(`drobná ložisková expanze ve vchodu do vnitřního zvukovodu ${sSuffix}`);
                    concMain.push({ type: 'frame', text: `Drobné ložisko ve vchodu do vnitřního zvukovodu ${sSuffix} charakteru vestibulárního schwanomu.`, tableId: 'brain_cpa_main' });
                } else if (exp === 'meningeom') {
                    cpaRep.push(`drobná ložisková expanze nasedající na zadní plochu pyramidy ${sSuffix}`);
                    concMain.push({ type: 'frame', text: `Drobné ložisko nasedající na zadní plochu pyramidy ${sSuffix} charakteru meningeomu.`, tableId: 'brain_cpa_main' });
                } else if (exp === 'cysta') {
                    cpaRep.push(`drobná arachnoideální cysta v MMK ${sSuffix}`);
                    concInc.push({ type: 'frame', text: `Drobná arachnoideální cysta v MMK ${sLat}.`, tableId: 'brain_cpa_main' });
                }
            }

            let kon = ctx.text(`br_cpa_kon_${side}`);
            if (kon && kon !== '0') {
                const konMap = { 'I': 'kontakt cévy s nervem VIII. (Grade I)', 'II': 'dislokace nervu VIII. cévní kličkou (Grade II)', 'III': 'imprese nervu VIII. cévní kličkou (Grade III)' };
                cpaRep.push(`${konMap[kon]} v CPA ${sSuffix}`);
                if (kon === 'I') {
                    concInc.push({ type: 'frame', text: `Neurovaskulární kontakt s n. VIII. v CPA ${sLat} bez známek imprese.`, tableId: 'brain_cpa_main' });
                } else {
                    concMain.push({ type: 'frame', text: `Neurovaskulární konflikt n. VIII. v CPA ${sLat} s ${kon === 'II' ? 'dislokací' : 'impresí'} nervu.`, tableId: 'brain_cpa_main' });
                }
            }

            let kon5 = ctx.text(`br_cpa_kon5_${side}`);
            if (kon5 && kon5 !== '0') {
                if (kon5 === '+') {
                    cpaRep.push(`kořen n. V ${sSuffix} v kontaktu s cévou`);
                    concInc.push({ type: 'frame', text: `Cévní kontakt na kořen n. V ${sLat} sporného významu.`, tableId: 'brain_cpa_main' });
                } else if (kon5 === '++') {
                    cpaRep.push(`kořen n. V ${sSuffix} s útlakem cévou`);
                    concMain.push({ type: 'frame', text: `v.s. NV konflikt n. V ${sLat}.`, tableId: 'brain_cpa_main' });
                }
            }
        });

        let cpaDesc = ctx.field('br_cpa_custom_desc');
        if (cpaDesc) cpaRep.push(cpaDesc);
        let cpaConc = ctx.field('br_cpa_custom_conc');
        if (cpaConc) concInc.push({ type: 'frame', text: cpaConc, tableId: 'brain_cpa_main' });

        if (cpaRep.length === 0 && !hasMmkLesion) {
            reportOut.push({ type: 'frame', text: 'Oblast MMK a vnitřních zvukovodů bez patrné patologie.', tableId: 'brain_cpa_main', dimmed: true });
        } else if (cpaRep.length > 0) {
            reportOut.push({ type: 'frame', text: cap(formatCzechList(cpaRep)) + '.', tableId: 'brain_cpa_main' });
        }

        // --- 4. SELLA A HYPOFÝZA ---
        let sella = ctx.text('br_sella');
        if (sella && sella !== '0') {
            if (sella === 'cysta') {
                sellaRep.push('drobná cysta v sella turcica v pars intermedia');
                concInc.push({ type: 'frame', text: 'Intrasellárně drobná cysta rathkeho výchlipky.', tableId: 'brain_sella_main' });
            } else if (sella === 'partial') {
                sellaRep.push('sella z větší části vyplněna tekutinou, na dně výrazně ztenčená hypofýza');
                concInc.push({ type: 'frame', text: 'Parciálně prázdná sella.', tableId: 'brain_sella_main' });
            } else if (sella === 'empty') {
                sellaRep.push('sella vyplněna tekutinou, hypofýza není patrna');
                concInc.push({ type: 'frame', text: 'Obraz empty sella.', tableId: 'brain_sella_main' });
            }
        }

        let epiRaw = ctx.text('br_epi');
        if (epiRaw && epiRaw !== '0') {
            let size = ctx.field('br_epi_mm');
            let sizeStr = size ? ` vel. ${size} mm` : '';
            if (epiRaw.toLowerCase().includes('cysta')) {
                epiRep.push(`drobná cysta epifýzy bez abnormit${sizeStr}`);
                concInc.push({ type: 'frame', text: `Drobná epifyzární cysta${sizeStr}.`, tableId: 'brain_sella_main' });
            } else {
                epiRep.push(`ložisko epifýzy${sizeStr}`);
                concInc.push({ type: 'frame', text: `Ložisková léze epifýzy${sizeStr}.`, tableId: 'brain_sella_main' });
            }
        }

        let sellaDesc = ctx.field('br_sella_custom_desc');
        if (sellaDesc) sellaRep.push(sellaDesc);
        let sellaConc = ctx.field('br_sella_custom_conc');
        if (sellaConc) concInc.push({ type: 'frame', text: sellaConc, tableId: 'brain_sella_main' });

        let sellaEpiCombined = [];
        if (sellaRep.length === 0 && !hasSellaLesion && !sellaDesc) sellaEpiCombined.push('Nezvětšená hypofýza uložena v nerozšířeném tureckém sedle.');
        else if (sellaRep.length > 0) sellaEpiCombined.push(cap(formatCzechList(sellaRep)) + '.');
        
        if (epiRep.length === 0 && (!epiRaw || epiRaw === '0')) sellaEpiCombined.push('Epifýza nezvětšena.');
        else if (epiRep.length > 0) sellaEpiCombined.push(cap(formatCzechList(epiRep)) + '.');

        let isSellaDimmed = (sellaRep.length === 0 && !hasSellaLesion && epiRep.length === 0 && !sellaDesc);
        if (sellaEpiCombined.length > 0) {
            reportOut.push({ type: 'frame', text: sellaEpiCombined.join(' '), tableId: 'brain_sella_main', dimmed: isSellaDimmed });
        }

        
        // --- WILLISŮV OKRUH A ARTERIE ---
        let varRepList = [];
        let varConcList = [];

        let vesPat = ctx.text('br_ves_pat');
        if (vesPat && vesPat !== '0') {
            let actVes = [];
            // Nepárové cévy
            if (ctx.isActive('br_ves_acoa')) actVes.push('ACoA');
            if (ctx.isActive('br_ves_ba')) actVes.push('BA');

            // Párové cévy
            const pairedVes = ['aca', 'ica', 'mca', 'acop', 'pca', 'pica', 'va'];
            pairedVes.forEach(v => {
                let isR = ctx.isActive(`br_ves_${v}_r`);
                let isL = ctx.isActive(`br_ves_${v}_l`);
                let r = ctx.text(`br_ves_${v}_r`);
                let l = ctx.text(`br_ves_${v}_l`);
                
                if (isR && isL) {
                    if (r === l) actVes.push(`${r} bilat.`);
                    else actVes.push(`${r} vpravo a ${l} vlevo`);
                } else if (isR) {
                    actVes.push(`${r} vpravo`);
                } else if (isL) {
                    actVes.push(`${l} vlevo`);
                }
            });

            if (actVes.length > 0) {
                let vStr = actVes.join(' a ');
                if (actVes.length > 1) vStr = `na rozhraní ${vStr}`;
                
                let sizeVal = ctx.field('br_ves_size');
                let sizeStr = '';
                if (sizeVal && vesPat === 'aneurysma') sizeStr = ` vel. ${sizeVal} mm`;
                else if (sizeVal && vesPat === 'stenóza') sizeStr = ` šíře ${sizeVal} mm`;

                let repText = `${vesPat} ${vStr}${sizeStr}`;
                let vesCust = ctx.field('br_ves_custom_desc');
                let fullRep = vesCust ? `${repText}, ${vesCust}` : repText;

                vesRep.push(fullRep);
                
                if (['aneurysma', 'stenóza', 'uzávěr'].includes(vesPat)) {
                    concMain.push({ type: 'frame', text: `${cap(repText)}.`, tableId: 'brain_vessels_main' });
                } else {
                    concInc.push({ type: 'frame', text: `${cap(repText)}.`, tableId: 'brain_vessels_main' });
                }
            }
        }

        let vesDescOnly = ctx.field('br_ves_custom_desc');
        if (vesDescOnly && (vesPat === '0' || !vesPat)) {
            vesRep.push(vesDescOnly);
        }

        // VÝSTUP: CÉVY (Bez prefixu)
        if (vesRep.length > 0) {
            reportOut.push({ type: 'frame', text: cap(formatCzechList(vesRep)) + '. Jinak je konfigurace mozkových tepen obvyklá.', tableId: 'brain_vessels_main' });
        }

        const stdVariations = [
            { id: 'a1', label: 'hypoplázie A1 ACA' },
            { id: 'va', label: 'hypoplázie VA' },
            { id: 'vapica', label: 'VA končící jako PICA' },
            { id: 'pica', label: 'gracilní PICA' }
        ];

        stdVariations.forEach(v => {
            let r = ctx.isActive(`br_var_${v.id}_r`);
            let l = ctx.isActive(`br_var_${v.id}_l`);
            if (r && l) {
                varRepList.push(`${v.label} bilat.`);
                varConcList.push(`${v.label} bilat.`);
            } else if (r) {
                varRepList.push(`${v.label} vpravo`);
                varConcList.push(`${v.label} vpravo`);
            } else if (l) {
                varRepList.push(`${v.label} vlevo`);
                varConcList.push(`${v.label} vlevo`);
            }
        });

        let fetalR = ctx.text('br_var_fetal_r');
        let fetalL = ctx.text('br_var_fetal_l');

        let pcoaR = (fetalR === 'P' || fetalR === 'C');
        let pcoaL = (fetalL === 'P' || fetalL === 'C');
        if (pcoaR && pcoaL) varRepList.push('silná zadní komunikanta bilat.');
        else if (pcoaR) varRepList.push('silná zadní komunikanta vpravo');
        else if (pcoaL) varRepList.push('silná zadní komunikanta vlevo');

        let hypoP1R = (fetalR === 'P');
        let hypoP1L = (fetalL === 'P');
        if (hypoP1R && hypoP1L) varRepList.push('hypoplázie P1 PCA bilat.');
        else if (hypoP1R) varRepList.push('hypoplázie P1 PCA vpravo');
        else if (hypoP1L) varRepList.push('hypoplázie P1 PCA vlevo');

        let aplaP1R = (fetalR === 'C');
        let aplaP1L = (fetalL === 'C');
        if (aplaP1R && aplaP1L) varRepList.push('aplázie P1 PCA bilat.');
        else if (aplaP1R) varRepList.push('aplázie P1 PCA vpravo');
        else if (aplaP1L) varRepList.push('aplázie P1 PCA vlevo');

        if (fetalR === 'P' && fetalL === 'P') varConcList.push('parciální fetální typ PCA bilat.');
        else if (fetalR === 'P') varConcList.push('parciální fetální typ PCA vpravo');
        else if (fetalL === 'P') varConcList.push('parciální fetální typ PCA vlevo');

        if (fetalR === 'C' && fetalL === 'C') varConcList.push('kompletní fetální typ PCA bilat.');
        else if (fetalR === 'C') varConcList.push('kompletní fetální typ PCA vpravo');
        else if (fetalL === 'C') varConcList.push('kompletní fetální typ PCA vlevo');

        if (varRepList.length > 0) {
            let varTextRep = `Variační anatomie: ${varRepList.join(', ')}.`;
            reportOut.push({ type: 'frame', text: varTextRep, tableId: 'br_var_table' });
        }

        if (varConcList.length > 0) {
            let varTextConc = `Variační anatomie: ${varConcList.join(', ')}.`;
            concInc.push({ type: 'frame', text: varTextConc, tableId: 'br_var_table' });
        }

        let vesConc = ctx.field('br_ves_custom_conc');
        if (vesConc) concInc.push({ type: 'frame', text: vesConc, tableId: 'brain_vessels_main' });

        // --- ORBITY ---
        const checkOrbSide = (baseId) => {
            let r = ctx.isActive(`${baseId}_r`), l = ctx.isActive(`${baseId}_l`);
            if (!r && !l) return null;
            return r && l ? 'bilat.' : (r ? 'vpravo' : 'vlevo');
        };

        let orbItems = [
            { id: 'br_orb_exo', rep: 'exoftalmus {s}', conc: 'Exoftalmus {s}', type: 'inc' },
            { id: 'br_orb_pht', rep: 'phthisis bulbi {s}', conc: 'Phthisis bulbi {s}', type: 'inc' },
            { id: 'br_orb_iol', rep: 'stav po implantaci nitrooční čočky (IOL) {s}', type: null },
            { id: 'br_orb_amo', rep: 'známky odchlípení sítnice {s}', conc: 'Amotio retinae {s}', type: 'main' },
            { id: 'br_orb_no_ztl', rep: 'ztluštění nervus opticus {s}', conc: 'Ztluštění zrakového nervu {s}', type: 'inc' },
            { id: 'br_orb_no_atr', rep: 'atrofie nervus opticus {s}', conc: 'Atrofie zrakového nervu {s}', type: 'inc' },
            { id: 'br_orb_sval', rep: 'ztluštění okohybných svalů {s}', conc: 'Myopatie okohybných svalů {s} (např. v rámci endokrinní orbitopatie)', type: 'inc' },
            { id: 'br_orb_slz_zvet', rep: 'zvětšení slzné žlázy {s}', conc: 'Dakryoadenomegalie {s}', type: 'inc' },
            { id: 'br_orb_slz_res', rep: 'stav po resekci slzné žlázy {s}', type: null }
        ];

        let orbRep = [];
        orbItems.forEach(item => {
            let s = checkOrbSide(item.id);
            if (s) {
                orbRep.push(item.rep.replace('{s}', s));
                if (item.type === 'main') concMain.push({ type: 'frame', text: item.conc.replace('{s}', s) + '.', tableId: 'brain_orbits_main' });
                else if (item.type === 'inc') concInc.push({ type: 'frame', text: item.conc.replace('{s}', s) + '.', tableId: 'brain_orbits_main' });
            }
        });

        let orbDesc = ctx.field('br_orb_custom_desc');
        if (orbDesc) orbRep.push(orbDesc);

        // --- 8. VÝSTUP: ORBITY ---
        let extracranialText = [];
        let isOrbDimmed = false;
        let isSinusDimmed = false;
        let isUchoDimmed = false;

        // --- 8. VÝSTUP: ORBITY ---
        if (orbRep.length === 0) {
            extracranialText.push('Orbity bez patologie.');
            isOrbDimmed = true;
        } else {
            extracranialText.push(cap(formatCzechList(orbRep)) + '.');
        }

        // --- SINY (Vedlejší nosní dutiny) ---
        const sinusTypes = [
            { id: 'front', bilat: 've frontálních sinech bilat.', r: 've frontálním sinu vpravo', l: 've frontálním sinu vlevo' },
            { id: 'ethmo', bilat: 'v ethmoidálních sinech bilat.', r: 'v ethmoidálním sinu vpravo', l: 'v ethmoidálním sinu vlevo' },
            { id: 'sfeno', bilat: 've sfenoidálních sinech bilat.', r: 've sfenoidálním sinu vpravo', l: 've sfenoidálním sinu vlevo' },
            { id: 'maxil', bilat: 'v maxilárních sinech bilat.', r: 'v maxilárním sinu vpravo', l: 'v maxilárním sinu vlevo' }
        ];

        const sinusStateMap = {
            'cysta': 'cysta/polyp',
            'hyper+': 'hyperplázie sliznic',
            'hyper++': 'výrazná hyperplázie sliznic',
            'tekutina': 'tekutina'
        };

        let sinyPartsArr = [];
        
        Object.keys(sinusStateMap).forEach(stateKey => {
            let locsForState = [];
            sinusTypes.forEach(st => {
                let valR = ctx.text(`sinus_${st.id}_r`);
                let valL = ctx.text(`sinus_${st.id}_l`);

                if (valR === stateKey && valL === stateKey) {
                    locsForState.push(st.bilat);
                } else {
                    if (valR === stateKey) locsForState.push(st.r);
                    if (valL === stateKey) locsForState.push(st.l);
                }
            });

            if (locsForState.length > 0) {
                sinyPartsArr.push(`${sinusStateMap[stateKey]} ${locsForState.join(', ')}`);
            }
        });

        let sinyCustomDesc = ctx.field('sinus_custom_desc');
        if (sinyCustomDesc) {
            sinyPartsArr.push(sinyCustomDesc);
        }
        
        // --- 10. VÝSTUP: SINY ---
        if (sinyPartsArr.length === 0) {
            extracranialText.push('Dutiny vzdušné.');
            isSinusDimmed = true;
        } else {
            extracranialText.push(cap(formatCzechList(sinyPartsArr)) + '.');
        }

        let concChron = [];
        let concAkut = [];
        sinusTypes.forEach(st => {
            let valR = ctx.text(`sinus_${st.id}_r`);
            let valL = ctx.text(`sinus_${st.id}_l`);
            
            if (valR === 'hyper++' && valL === 'hyper++') concChron.push(st.bilat);
            else {
                if (valR === 'hyper++') concChron.push(st.r);
                if (valL === 'hyper++') concChron.push(st.l);
            }
            
            if (valR === 'tekutina' && valL === 'tekutina') concAkut.push(st.bilat);
            else {
                if (valR === 'tekutina') concAkut.push(st.r);
                if (valL === 'tekutina') concAkut.push(st.l);
            }
        });

        let sinyConcArr = [];
        if (concChron.length > 0) sinyConcArr.push(`Chronická sinusitis (${concChron.join(', ')}).`);
        if (concAkut.length > 0) sinyConcArr.push(`Akutní sinusitis (${concAkut.join(', ')}).`);
        
        let customSinusConc = ctx.field('sinus_custom_conc');
        if (customSinusConc) sinyConcArr.push(customSinusConc);

        if (sinyConcArr.length > 0) {
            concInc.push({ type: 'frame', text: sinyConcArr.join('\n'), tableId: 'brain_sinus_main' });
        }

        // --- UŠI A MASTOIDY ---
        let uchoRep = [];
        const earItems = [
            { id: 'ucho_stred', loc: 'středouší' },
            { id: 'ucho_mast', loc: 'mastoidy' }
        ];

        earItems.forEach(item => {
            let r = ctx.text(`${item.id}_r`), l = ctx.text(`${item.id}_l`);
            if ((!r || r === '0') && (!l || l === '0')) return;

            const makeEarText = (state, side) => {
                let textR = '', textC = '', typeC = 'incidental';
                const sideL = side === 'vpravo' ? 'l.dx.' : (side === 'vlevo' ? 'l.sin.' : 'bilat.');
                
                if (item.loc === 'středouší') {
                    if (state === 'tekutina') { textR = `tekutina ve středoušní dutině ${side}`; textC = `Fluidotympanum ${sideL}.`; }
                    else if (state === 'zastření') { textR = `zastření středoušní dutiny ${side}`; textC = `Zánětlivé změny středouší ${sideL}.`; }
                    else if (state === 'sklerotizace') { textR = `chronické sklerotické změny středouší ${side}`; textC = `Chronické změny středouší ${sideL}.`; }
                    else if (state === 'defekt') { textR = `stav po operaci středouší ${side}`; textC = ``; typeC = null; }
                } else if (item.loc === 'mastoidy') {
                    if (state === 'tekutina') { textR = `tekutina v mastoidálních sklípcích ${side}`; textC = `Fluidomastoid ${sideL}.`; }
                    else if (state === 'zastření') { textR = `snížená vzdušnost až zastření mastoidálních sklípků ${side}`; textC = `Mastoiditis ${sideL}.`; typeC = 'main'; }
                    else if (state === 'sklerotizace') { textR = `sklerotizace mastoidálních sklípků ${side}`; textC = `Chronická mastoiditis ${sideL}.`; }
                    else if (state === 'defekt') { textR = `stav po mastoidektomii ${side}`; textC = ``; typeC = null; }
                }
                return { textR, textC, typeC };
            };

            if (r === l && r !== '0') {
                const t = makeEarText(r, 'bilat.');
                uchoRep.push(t.textR);
                if (t.typeC === 'main') concMain.push({ type: 'frame', text: t.textC, tableId: 'brain_sinus_main' });
                else if (t.typeC === 'incidental') concInc.push({ type: 'frame', text: t.textC, tableId: 'brain_sinus_main' });
            } else {
                if (r && r !== '0') {
                    const t = makeEarText(r, 'vpravo');
                    uchoRep.push(t.textR);
                    if (t.typeC === 'main') concMain.push({ type: 'frame', text: t.textC, tableId: 'brain_sinus_main' });
                    else if (t.typeC === 'incidental') concInc.push({ type: 'frame', text: t.textC, tableId: 'brain_sinus_main' });
                }
                if (l && l !== '0') {
                    const t = makeEarText(l, 'vlevo');
                    uchoRep.push(t.textR);
                    if (t.typeC === 'main') concMain.push({ type: 'frame', text: t.textC, tableId: 'brain_sinus_main' });
                    else if (t.typeC === 'incidental') concInc.push({ type: 'frame', text: t.textC, tableId: 'brain_sinus_main' });
                }
            }
        });

        // --- 9. VÝSTUP: UŠI A MASTOIDY ---
        if (uchoRep.length === 0) {
            extracranialText.push('Mastoideální sklípky vzdušné.');
            isUchoDimmed = true;
        } else {
            extracranialText.push(cap(formatCzechList(uchoRep)) + '.');
        }

        // --- KOMBINOVANÝ VÝSTUP ---
        reportOut.push({ 
            type: 'frame', 
            text: extracranialText.join(' '), 
            tableId: 'brain_sinus_main', 
            dimmed: (isOrbDimmed && isSinusDimmed && isUchoDimmed)
        });

        if (concMain.length === 0 && concInc.length === 0) {
            concMain.push({ type: 'frame', text: 'Přiměřený nález bez patrné ložiskové patologie.' });
        }

        if ((examId || '').toLowerCase().startsWith('ct')) {
            reportOut.forEach(b => { if (b.text) b.text = b.text.replaceAll('T2W+ FLAIR+', 'hypodenzní'); });
        }

        return { report: reportOut, conclusion: { main: concMain, incidental: concInc } };
    }
}

window.HOVER_IMAGES = window.HOVER_IMAGES || {};
Object.assign(window.HOVER_IMAGES, {
    'br_mta': 'picothers/Brain_MTA.jpg',
    'br_koedam': 'picothers/Brain_Koedam.jpg',
    'br_gca': 'picothers/Brain_GCA.jpg',
   
});