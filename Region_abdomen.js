/* ═══════════════════════════════════════════════════════════
   PŘEDDEFINOVANÉ TEXTY — skupiny + orgány (editovat zde)
   findings = text ve Findings; conclusion = při normal!
   ═══════════════════════════════════════════════════════════ */
const RegionAbdomen_PREDEFS = {
    groups: {
        all: 'Orgány a struktury břicha bez patrné patologie.',
        allOtherwise: 'Jinak orgány v břiše bez patrné ložiskové či strukturální patologie.',
        epigastrium: 'Játra a slezina přiměřené velikosti a vzhledu. Žlučové cesty nedilatovány. Žlučník jemné stěny bez konkrementů. Pankreas obvyklého vzhledu.',
        gi: 'Žaludek, tenké střevo, tračník bez ložiskového zesílení stěny či dilatace.',
        uro: 'Nadledviny bez expanze. Ledviny přiměřeného vzhledu, bez dilatace dutého systému a bez patrné litiázy. Močový měchýř bez ložiskového zesílení stěny.',
        repro: 'Přiměřené velikosti a vzhledu, bez ložiskových změn.'
    },
    organs: {
        ja: {
            findings: 'přiměřené velikosti, parenchym homogení, bez ložisek a bez dilatace intrahepatálních žlučovodů',
            conclusion: 'Přiměřený nález na játrech, bez ložiskové léze.'
        },
        zl: {
            findings: 'bez konkrementů a bez zesílení stěny, d. choledochus přiměřené šíře',
            conclusion: 'Přiměřený nález na žlučníku a žlučových cestách.'
        },
        sl: {
            findings: 'přiměřené velikosti, parenchym bez ložiskových změn',
            conclusion: 'Přiměřený nález na slezině, bez ložiskové léze.'
        },
        pa: {
            findings: 'přiměřené velikosti a struktury, bez ložiskových změn, ductus Wirsungi nedilatovaný',
            conclusion: 'Přiměřený nález na pankreatu, bez ložiskové léze.'
        },
        za: {
            findings: 'stěna bez ložiskového ztluštění, bez zřetelných patologických změn',
            conclusion: 'Přiměřený nález na žaludku.'
        },
        ts: {
            findings: 'bez patrných ložiskových změn stěny, mesenterium bez zastření',
            conclusion: 'Přiměřený nález na tenkém střevě, bez ložiskové léze.'
        },
        tr: {
            findings: 'bez ložiskového ztluštění stěny a bez známek divertikulitidy',
            conclusion: 'Přiměřený nález na tračníku.'
        },
        pe: {
            findings: 'bez volné tekutiny v dutině',
            conclusion: 'Bez ascitu a bez zřetelné peritoneální patologie.'
        },
        na: {
            findings: 'obvyklého tvaru a velikosti, bez ložiskových změn',
            conclusion: 'Přiměřený nález na nadledvinách, bez ložiskové léze.'
        },
        le: {
            findings: 'přiměřené velikosti a šíře parenchymu, bez ložisek, bez dilatace dutého systému, bez patrné litiázy',
            conclusion: 'Přiměřený nález na ledvinách, bez ložiskové léze, hydronefrózy či litiázy.'
        },
        mm: {
            findings: 'stěna bez ložiskového ztluštění, bez divertiklů',
            conclusion: 'Přiměřený nález na močovém měchýři.'
        },
        ov: {
            findings: 'bez ložiskových a bez komplexních cystických změn',
            conclusion: 'Přiměřený nález na ovariích a adnexech, bez ložiskové léze.'
        },
        de: {
            findings: 'přiměřené velikosti, bez myomů a bez patologického zesílení endometria',
            conclusion: 'Přiměřený nález na děloze.'
        },
        pr: {
            findings: 'přiměřené velikosti, kontury hladké, bez ložiskových změn',
            conclusion: 'Přiměřený nález na prostatě.'
        },
        vc: {
            findings: 'abdominální aorta a iliaky přiměřené šíře, bez aneurysmatu',
            conclusion: 'Přiměřený nález na abdominální aortě a pánevních tepnách.'
        },
        te: {
            findings: 'bez hydrokély, bez varikokély a bez ložiskových změn',
            conclusion: 'Přiměřený nález na varlatech.'
        },
        aw: {
            findings: 'bez herniace a bez patologických infiltrátů v podkoží',
            conclusion: 'Přiměřený nález na břišní stěně, bez hernie.'
        }
    },
    ostatni: {
        findings: 'Bez dalších významných nálezů.',
        conclusion: 'Bez dalších významných nálezů v dutině břišní.'
    }
};

const RegionAbdomen = {
    title: 'Břicho',
    predefs: RegionAbdomen_PREDEFS,

    /* Sdílené sady stavů tlačítek - v layoutu se používají jako ...RegionAbdomen.buttons.plus. */
    buttons: {
        plus:  { states: ['0', '+'] },
        pocet: { states: ['0', '1', 'více'] },
        vel:   { states: ['0', 'malá', 'střední', 'velká'] }
    },

    /* Virtuální skupiny — struktura; texty v RegionAbdomen_PREDEFS.groups */
    virtualGroups: [
        {
            id: 'all',
            name: 'Orgány dutiny břišní',
            members: ['ja', 'zl', 'sl', 'pa', 'za', 'ts', 'tr', 'pe', 'na', 'le', 'mm', 'ov', 'de', 'pr', 'vc', 'te', 'aw'],
            tableId: 'group:abdomen_jatra_main,abdomen_zlucnik_main,abdomen_slezina_main,abdomen_pankreas_main,abdomen_zaludek_main,abdomen_tenke_strevo_main,abdomen_tracnik_main,abdomen_peritoneum_main,abdomen_nadledviny_main,abdomen_ledviny_main,abdomen_moc_mechyr_main,abdomen_ovaria_main,abdomen_deloha_main,abdomen_prostata_main,abdomen_velke_cevy_main,abdomen_testes_main,abdomen_wall_main',
            text: RegionAbdomen_PREDEFS.groups.all,
            otherwiseText: RegionAbdomen_PREDEFS.groups.allOtherwise
        },
        {
            id: 'epigastrium',
            name: 'Orgány epigastria',
            members: ['ja', 'zl', 'pa', 'sl'],
            tableId: 'group:abdomen_jatra_main,abdomen_zlucnik_main,abdomen_pankreas_main,abdomen_slezina_main',
            text: RegionAbdomen_PREDEFS.groups.epigastrium
        },
        {
            id: 'gi',
            name: 'Trávicí trubice',
            members: ['za', 'ts', 'tr'],
            tableId: 'group:abdomen_zaludek_main,abdomen_tenke_strevo_main,abdomen_pankreas_main,abdomen_tracnik_main',
            text: RegionAbdomen_PREDEFS.groups.gi
        },
        {
            id: 'uro',
            name: 'Uropoetický trakt a nadledviny',
            members: ['na', 'le', 'mm'],
            tableId: 'group:abdomen_nadledviny_main,abdomen_ledviny_main,abdomen_moc_mechyr_main',
            text: RegionAbdomen_PREDEFS.groups.uro
        },
        {
            id: 'repro',
            name: 'Reprodukční orgány',
            members: ['de', 'ov', 'pr', 'te'],
            tableId: 'group:abdomen_deloha_main,abdomen_ovaria_main,abdomen_prostata_main,abdomen_testes_main',
            text: RegionAbdomen_PREDEFS.groups.repro
        }
    ],

    organOrder: ['ja', 'zl', 'sl', 'pa', 'za', 'ts', 'tr', 'pe', 'na', 'le', 'mm', 'ov', 'de', 'pr', 'vc', 'te', 'aw'],

    layout: (helpers) => {
        let layoutNodes = [];
        const B = RegionAbdomen.buttons;

            // Vlastní popis + vlastní závěr + tlačítko "normal" pro danou sekci.
            const addText = (prefix) => helpers.Table1col(`${prefix}_ost_add`, [
                { field: 'text', id: `${prefix}_custom_desc`, placeholder: 'vlastní popis...' },
                { field: 'text', id: `${prefix}_custom_conc`, placeholder: 'vlastní závěr...' }
            ], { normal: true });

            // 1. Lesions (Generic)
            const lesInsts = getExamInstances('abdomen_lesion_main');
            lesInsts.forEach((instId, idx) => {
                const p = `al_${instId}`;
                
                const t1 = helpers.Table2colNormal(`${p}_loc1_liver`, [
                    [ 'Játra:', { btn: `${p}_p_ja`, states: ['0', '+', 'pravý l.', 'levý l.'] } ],
                    [ 'S1:', { btn: `${p}_p_ja_s1`, ...B.plus } ], [ 'S2:', { btn: `${p}_p_ja_s2`, ...B.plus } ],
                    [ 'S3:', { btn: `${p}_p_ja_s3`, ...B.plus } ], [ 'S4A:', { btn: `${p}_p_ja_s4a`, ...B.plus } ],
                    [ 'S4B:', { btn: `${p}_p_ja_s4b`, ...B.plus } ], [ 'S5:', { btn: `${p}_p_ja_s5`, ...B.plus } ],
                    [ 'S6:', { btn: `${p}_p_ja_s6`, ...B.plus } ], [ 'S7:', { btn: `${p}_p_ja_s7`, ...B.plus } ],
                    [ 'S8:', { btn: `${p}_p_ja_s8`, ...B.plus } ], [ 'Všechny:', { btn: `${p}_p_ja_vse`, ...B.plus } ]
                ]);
                const t2 = helpers.Table2colNormal(`${p}_loc2_gi`, [
                    [ 'Žlučník:', { btn: `${p}_p_zl`, states: ['0', '+', 'fundus', 'tělo', 'krček'] } ],
                    [ 'Pankreas:', { btn: `${p}_p_pa`, states: ['0', '+', 'hlava', 'tělo', 'kauda'] } ],
                    [ 'Slezina:', { btn: `${p}_p_sl`, ...B.plus } ],
                    [ 'Mesenterium:', { btn: `${p}_p_me`, ...B.plus } ],
                    [ 'Peritoneum:', { btn: `${p}_p_pe`, states: ['0', '+', 'omentum', 'pánevní'] } ],
                    [ 'Žaludek:', { btn: `${p}_p_za`, states: ['0', '+', 'kardie', 'fundus', 'tělo', 'pylorus'] } ],
                    [ 'Tračník:', { btn: `${p}_p_tr`, states: ['0', '+', 'anus', 'anorektum', 'rektum', 'sigma', 'descendens', 'transverzum', 'ascendens', 'cékum', 'appendix'] } ]
                ]);
                const t3 = helpers.Table3colRCL(`${p}_loc3_pelvis`, [
                    [ { btn: `${p}_p_nadl_r`, ...B.plus }, 'nadledvina', { btn: `${p}_p_nadl_l`, ...B.plus } ],
                    [ { btn: `${p}_p_led_r`, states: ['0', '+', 'horní', 'střední', 'dolní'] }, 'ledvina', { btn: `${p}_p_led_l`, states: ['0', '+', 'horní', 'střední', 'dolní'] } ],
                    [ { btn: `${p}_p_ova_r`, ...B.plus }, 'ovárium', { btn: `${p}_p_ova_l`, ...B.plus } ],
                    [ '', { btn: `${p}_p_del`, states: ['děloha', 'děloha', 'krček', 'tělo', 'fundus'] }, '' ],
                    [ '', { btn: `${p}_p_mec`, states: ['měchýř', 'měchýř'] }, '' ],
                    [ { btn: `${p}_p_pro_r`, ...B.plus }, 'prostata', { btn: `${p}_p_pro_l`, ...B.plus } ],
                    [ { btn: `${p}_p_tes_r`, ...B.plus }, 'testes', { btn: `${p}_p_tes_l`, ...B.plus } ]
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
            const lnInsts = getExamInstances('abdomen_lymphnode_main');
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
                    [ { btn: 'ja_cys_r', ...B.pocet }, 'Cysta', { btn: 'ja_cys_l', ...B.pocet } ],
                    [ { btn: 'ja_inc_r', ...B.pocet }, 'Incidentalom', { btn: 'ja_inc_l', ...B.pocet } ],
                    [ { btn: 'ja_hem_r', ...B.pocet }, 'Hemangiom', { btn: 'ja_hem_l', ...B.pocet } ],
                    [ { btn: 'ja_dil_r', ...B.plus }, 'Dilatace žlučovodů', { btn: 'ja_dil_l', ...B.plus } ]
                ]),
                helpers.Table2colNormal('ja_difuz_table', 'Difuzní změny', [
                    [ 'Zvětšení', { btn: 'ja_zvet', states: ['0', 'mírné', 'výrazné'] } ],
                    [ 'Difuzní léze', { btn: 'ja_dif', states: ['0', 'steatóza', 'fibróza', 'cirhóza'] } ],
                    [ 'Portální hypertenze', { btn: 'ja_port', ...B.plus } ]
                ]),
                helpers.Table3colRL('ja_op_table', 'Operace', [
                    [ { btn: 'ja_hemi_r', ...B.plus }, 'Hemihepatektomie', { btn: 'ja_hemi_l', ...B.plus } ],
                    [ { btn: 'ja_res_r', ...B.plus }, 'Resekce', { btn: 'ja_res_l', ...B.plus } ],
                    [ { btn: 'ja_rfa_r', ...B.plus }, 'RFA', { btn: 'ja_rfa_l', ...B.plus } ]
                ]),
                addText('ja')
            ]));

            // 4. Žlučník
            layoutNodes.push(helpers.TableMain('abdomen_zlucnik_main', 'Žlučník a cesty', [
                helpers.Table2colNormal('zl_table', [
                    [ 'Litiáza', { btn: 'zl_lit', states: ['0', 'sludge', '1', 'více'] } ],
                    [ 'Cholecystitis', { btn: 'zl_chol', states: ['0', 'mírná', 'výrazná'] } ],
                    [ 'Dilatace d. choledochus', { btn: 'zl_chod', states: ['0', 'mírná', 'výrazná'] } ],
                    [ 'CHCE', { btn: 'zl_chce', ...B.plus } ]
                ]),
                addText('zl')
            ]));

            // 5. Slezina
            layoutNodes.push(helpers.TableMain('abdomen_slezina_main', 'Slezina', [
                helpers.Table2colNormal('sl_table', [
                    [ 'Zvětšená', { btn: 'sl_zvet', ...B.plus }, { field: 'mm', id: 'sl_zvet_mm', placeholder: 'mm' } ],
                    [ 'Difuzně RF+', { btn: 'sl_akt', ...B.plus } ],
                    [ 'Cystoid', { btn: 'sl_cys', ...B.pocet } ],
                    [ 'Hemangiom', { btn: 'sl_hem', ...B.pocet } ],
                    [ 'Infarkt', { btn: 'sl_inf', ...B.pocet } ],
                    [ 'Splenektomie', { btn: 'sl_spl', ...B.plus } ],
                    [ 'Regenerát', { btn: 'sl_reg', ...B.plus } ]
                ]),
                addText('sl')
            ]));

            // 6. Pankreas
            layoutNodes.push(helpers.TableMain('abdomen_pankreas_main', 'Pankreas', [
                helpers.Table2colNormal('pa_table', [
                    [ 'Atrofie', { btn: 'pa_atr', states: ['0', 'mírná', 'výrazná', 'lipomatózní', 'kalcifikace'] } ],
                    [ 'Dilat. Wirsungu', { btn: 'pa_wir', ...B.plus }, { field: 'mm', id: 'pa_wir_mm', placeholder: 'mm' } ],
                    [ 'Cystoid', { btn: 'pa_cys', ...B.pocet }, { field: 'mm', id: 'pa_cys_mm', placeholder: 'mm' } ],
                    [ 'Operace', { btn: 'pa_op', states: ['0', 'duodenopankreat.', 'total pankreat.', 'kauda', 'nekrektomie'] } ]
                ]),
                addText('pa')
            ]));

            // 7. Žaludek
            layoutNodes.push(helpers.TableMain('abdomen_zaludek_main', 'Žaludek', [
                helpers.Table2colNormal('za_table', [
                    [ 'Resekce', { btn: 'za_res', states: ['0', 'parc.', 'total.', 'sleeve'] } ],
                    [ 'Bariatrie', { btn: 'za_bar', states: ['0', 'bandáž', 'bypass'] } ],
                    [ 'Fundoplikace', { btn: 'za_fun', ...B.plus } ],
                    [ 'Sonda', { btn: 'za_son', states: ['0', 'PEG', 'NGS', 'NJS'] } ],
                    [ 'Zesílení stěny', { btn: 'za_zes', states: ['0', 'mírné', 'výrazné'] }, { btn: 'za_zes_loc', states: ['0', 'difuzně', 'kardie', 'korpus', 'antrum', 'pylorus'] } ]
                ]),
                addText('za')
            ]));

            // 8. Tenké střevo
            layoutNodes.push(helpers.TableMain('abdomen_tenke_strevo_main', 'Tenké střevo', [
                helpers.Table2colNormal('ts_table', [
                    [ 'Misty Mesenterium', { btn: 'pe_mis', states: ['0', 'zastření', 'panikulitis'] } ]
                ]),
                addText('ts')
            ]));

            // 9. Tračník
            layoutNodes.push(helpers.TableMain('abdomen_tracnik_main', 'Tračník', [
                helpers.Table2colNormal('tr_table', [
                    [ 'Resekce', { btn: 'tr_res', states: ['0', 'P hemikol.', 'L hemikol.', 'sigmoidea', 'rekta', 'amputace'] } ],
                    [ 'Appendektomie', { btn: 'tr_app', states: ['0', 'APPE'] } ],
                    [ 'Stomie', { btn: 'tr_sto', states: ['0', 'kolostomie', 'ileostomie'] }, { btn: 'tr_sto_loc', states: ['0', 'vpravo', 'vlevo'] } ],
                    [ 'Fokus RF+', { btn: 'tr_fok', states: ['0', 'fokus', 'více fokusů'] }, { btn: 'tr_fok_loc', states: ['0', 'caecum', 'ascendens', 'transversum', 'descendens', 'sigmoideum', 'rektum'] } ],
                    [ 'Zesílení stěny', { btn: 'tr_zes', states: ['0', 'mírné', 'výrazné'] }, { btn: 'tr_zes_loc', states: ['0', 'tračník', 'rektum'] } ],
                    [ 'Divertikulóza', { btn: 'tr_div', states: ['0', '+', 'divertikulitida'] }, { btn: 'tr_div_loc', states: ['0', 'sigmoideum', 'descendens', 'difuzně'] } ]
                ]),
                addText('tr')
            ]));

            // 10. Peritoneum
            layoutNodes.push(helpers.TableMain('abdomen_peritoneum_main', 'Peritoneum', [
                helpers.Table2colNormal('pe_table', [
                    [ 'Ascites', { btn: 'pe_asc', states: ['0', 'diskrétně', 'malý', 'střední', 'výrazný'] } ],
                    [ 'Ascites minule', { btn: 'pe_asc_old', states: ['0', 'diskrétně', 'malý', 'střední', 'výrazný'] } ]
                ]),
                addText('pe')
            ]));

            // 11. Nadledviny
            layoutNodes.push(helpers.TableMain('abdomen_nadledviny_main', 'Nadledviny', [
                helpers.Table3colRL('na_table', [
                    [ { btn: 'na_akt_r', ...B.plus }, 'RF+', { btn: 'na_akt_l', ...B.plus } ],
                    [ { btn: 'na_hyp_r', ...B.plus }, 'Hyperplázie', { btn: 'na_hyp_l', ...B.plus } ],
                    [ { btn: 'na_inc_r', states: ['0', 'B', 'I', 'M'] }, 'Incidentalom', { btn: 'na_inc_l', states: ['0', 'B', 'I', 'M'] } ],
                    [ { btn: 'na_mye_r', ...B.plus }, 'Myelolipom', { btn: 'na_mye_l', ...B.plus } ],
                    [ { btn: 'na_adr_r', ...B.plus }, 'Adrenalektomie', { btn: 'na_adr_l', ...B.plus } ]
                ]),
                addText('na')
            ]));

            // 12. Ledviny (Obsahuje podsekce, ponechán titulek)
            layoutNodes.push(helpers.TableMain('abdomen_ledviny_main', 'Ledviny', [
                helpers.Table3colRL('le_fok_table', 'Fokální léze', [
                    [ { btn: 'le_cys_r', ...B.pocet }, 'Cysta', { btn: 'le_cys_l', ...B.pocet } ],
                    [ { btn: 'le_aml_r', ...B.pocet }, 'AML', { btn: 'le_aml_l', ...B.pocet } ],
                    [ { btn: 'le_jiz_r', ...B.pocet }, 'Jizva', { btn: 'le_jiz_l', ...B.pocet } ]
                ]),
                helpers.Table3colRL('le_obs_table', 'Obstrukce a derivace', [
                    [ { btn: 'le_hyd_r', states: ['0', 'I', 'II', 'III', 'IV'] }, 'Hydronefróza', { btn: 'le_hyd_l', states: ['0', 'I', 'II', 'III', 'IV'] } ],
                    [ { btn: 'le_lit_r', states: ['0', 'kaliko', 'pelvi', 'PU junkce', 'ureter', 'VU junkce'] }, 'Litiáza', { btn: 'le_lit_l', states: ['0', 'kaliko', 'pelvi', 'PU junkce', 'ureter', 'VU junkce'] } ],
                    [ { btn: 'le_ste_r', states: ['0', 'správně', 'dislokace'] }, 'Stent', { btn: 'le_ste_l', states: ['0', 'správně', 'dislokace'] } ],
                    [ { btn: 'le_nef_r', ...B.plus }, 'Nefrostomie', { btn: 'le_nef_l', ...B.plus } ]
                ]),
                helpers.Table3colRL('le_op_table', 'Operace', [
                    [ { btn: 'le_res_r', states: ['0', 'horní', 'střední', 'dolní'] }, 'Resekce', { btn: 'le_res_l', states: ['0', 'horní', 'střední', 'dolní'] } ],
                    [ { btn: 'le_nek_r', ...B.plus }, 'Nefrektomie', { btn: 'le_nek_l', ...B.plus } ]
                ]),
                addText('le')
            ]));

            // 13. Močový měchýř
            layoutNodes.push(helpers.TableMain('abdomen_moc_mechyr_main', 'Močový měchýř', [
                helpers.Table2colNormal('mm_table', [
                    [ 'Katetr', { btn: 'mm_kat', states: ['0', 'PMK', 'epicystostomie'] } ],
                    [ 'Divertikl', { btn: 'mm_div', ...B.pocet } ],
                    [ 'Stomie', { btn: 'mm_sto', states: ['0', 'urostomie', 'Bricker'] } ],
                    [ 'Operace', { btn: 'mm_op', states: ['0', 'TURB', 'cystektomie'] } ]
                ]),
                addText('mm')
            ]));

            // 14. Ovária
            layoutNodes.push(helpers.TableMain('abdomen_ovaria_main', 'Ovária / Adnexa', [
                helpers.Table3colRL('ov_table', [
                    [ { btn: 'ov_pc_r', ...B.pocet }, 'Prostá cysta', { btn: 'ov_pc_l', ...B.pocet } ],
                    [ { btn: 'ov_kc_r', ...B.pocet }, 'Komplexní cysta', { btn: 'ov_kc_l', ...B.pocet } ],
                    [ { field: 'mm', id: 'ov_kc_mm_r', placeholder: 'mm' }, 'Velikost', { field: 'mm', id: 'ov_kc_mm_l', placeholder: 'mm' } ],
                    [ { btn: 'ov_akt_r', ...B.plus }, 'RF+', { btn: 'ov_akt_l', ...B.plus } ],
                    [ { btn: 'ov_adn_r', ...B.plus }, 'Adnexektomie', { btn: 'ov_adn_l', ...B.plus } ]
                ]),
                addText('ov')
            ]));

            // 15. Děloha
            layoutNodes.push(helpers.TableMain('abdomen_deloha_main', 'Děloha', [
                helpers.Table2colNormal('de_table', [
                    [ 'Myom', { btn: 'de_myo', ...B.pocet }, { btn: 'de_myo_loc', states: ['0', 'intramurální', 'subserózní', 'submukózní'] } ],
                    [ 'Endometrium', { btn: 'de_end', states: ['0', 'zesílení', 'tekutina'] }, { btn: 'de_end_int', states: ['0', 'mírné/á', 'výrazné/á'] } ],
                    [ 'Endo RF+', { btn: 'de_akt', ...B.plus } ],
                    [ 'IUD', { btn: 'de_iud', ...B.plus } ],
                    [ 'Hysterektomie', { btn: 'de_hys', ...B.plus } ]
                ]),
                addText('de')
            ]));

            // 16. Prostata
            layoutNodes.push(helpers.TableMain('abdomen_prostata_main', 'Prostata', [
                helpers.Table2colNormal('pr_table', [
                    [ 'Zvětšená', { btn: 'pr_zvet', ...B.plus }, { field: 'mm', id: 'pr_zvet_ml', placeholder: 'ml' } ],
                    [ 'Fokus RF+', { btn: 'pr_fok', ...B.plus } ],
                    [ 'TURP', { btn: 'pr_tur', ...B.plus } ],
                    [ 'RAPE', { btn: 'pr_rap', ...B.plus } ]
                ]),
                addText('pr')
            ]));

            // 17. Velké cévy
            layoutNodes.push(helpers.TableMain('abdomen_velke_cevy_main', 'Velké cévy', [
                helpers.Table2colNormal('vc_aneur_table', 'Aneurysma a Stentgraft', [
                    [ 'Aneurysma aorty', { btn: 'vc_an', states: ['0', 'suprarenální', 'subrenální', 'bifurkační'] }, { field: 'mm', id: 'vc_an_val', placeholder: 'mm' } ],
                    [ 'Stentgraft', { btn: 'vc_sg', ...B.plus } ]
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
                    [ { btn: 'vc_by_af_r', ...B.plus }, 'Aortofemorální', { btn: 'vc_by_af_l', ...B.plus } ],
                    [ { btn: 'vc_by_if_r', ...B.plus }, 'Iliofemorální', { btn: 'vc_by_if_l', ...B.plus } ],
                    [ { btn: 'vc_by_ff_r', ...B.plus }, 'Femorofemorální', { btn: 'vc_by_ff_l', ...B.plus } ]
                ]),
                addText('vc')
            ]));

            // 18. Testes
            layoutNodes.push(helpers.TableMain('abdomen_testes_main', 'Testes a skrotum', [
                helpers.Table3colRL('te_table', [
                    [ { btn: 'te_hyd_r', ...B.plus }, 'Hydrokéla', { btn: 'te_hyd_l', ...B.plus } ],
                    [ { btn: 'te_var_r', ...B.plus }, 'Varikokéla', { btn: 'te_var_l', ...B.plus } ],
                    [ { btn: 'te_orc_r', ...B.plus }, 'Orchiektomie', { btn: 'te_orc_l', ...B.plus } ]
                ]),
                addText('te')
            ]));

            // 19. Břišní stěna
            layoutNodes.push(helpers.TableMain('abdomen_wall_main', 'Břišní stěna', [
                helpers.Table3colRCL('aw_table', [
                    [ { btn: 'aw_sc_r', ...B.plus }, 'RF podkoží', { btn: 'aw_sc_l', ...B.plus } ],
                    [ { btn: 'aw_scar_r', states: ['0', 'RF-', 'RF+'] }, 'RF jizvy', { btn: 'aw_scar_l', states: ['0', 'RF-', 'RF+'] } ],
                    [ { btn: 'aw_her_scar_r', ...B.vel }, 'Hernie v jizvě', { btn: 'aw_her_scar_l', ...B.vel } ],
                    [ '', 'Supraumbilik.', '' ],
                    [ '', { btn: 'aw_her_supra', ...B.vel }, '' ],
                    [ '', 'Umbilik.', '' ],
                    [ '', { btn: 'aw_her_umb', ...B.vel }, '' ],
                    [ { btn: 'aw_her_ing_r', ...B.vel }, 'Inguinální', { btn: 'aw_her_ing_l', ...B.vel } ]
                ]),
                addText('aw')
            ]));

            layoutNodes.push(helpers.TableMain('abdomen_ostatni_main', 'Ostatní nálezy', [
                addText('ostatni')
            ]));

            return layoutNodes;
        },

        compile: (ctx) => {
            let reportOut = [{ type: 'heading', text: 'Břicho:', action: 'open-region', regionId: 'abdomen' }];
            let concMain = [];
            let concInc = [];
            
            const formatList = formatCzechList;
            const examId = ctx.examId || 'default';
            const toOrgans = shouldPlaceLesionsInOrgans(examId);
            const expandMode = getOrganExpandMode(examId);
            const organBag = {};
            const ORGAN_ORDER = RegionAbdomen.organOrder;
            const GROUPS = RegionAbdomen.virtualGroups;
            const OP = RegionAbdomen_PREDEFS.organs;

            /* Odložený zápis orgánu — findings se rozhodnou až ve flushOrgans podle expandMode. */
            const emitOrgan = (key, addId, parts, label, tableId, normRep, normConc) => {
                const cleanParts = (parts || []).filter(Boolean);
                organBag[key] = {
                    key, addId, label, tableId, normRep, normConc,
                    parts: cleanParts,
                    dirty: cleanParts.length > 0,
                    lesionFrames: []
                };
            };

            const writeOrganSection = (o, { forcePredef = false, skipReport = false } = {}) => {
                const hasLesions = (o.lesionFrames || []).length > 0;
                /* Léze pod orgánem = patologie → ignorovat predef/normal (negativní text). */
                const sec = ctx.section({
                    label: o.label, tableId: o.tableId,
                    normal: hasLesions ? null : `${o.addId}_normal`,
                    normalText: `${o.normRep}.`,
                    normalConc: o.normConc,
                    predef: hasLesions ? null : `${o.addId}_predef`,
                    predefText: `${o.normRep}.`,
                    concField: o.addId.replace('_ost_add', '_custom_conc'),
                    parts: o.parts
                });
                if (!skipReport) {
                    if (!emitOrganFindingsReport(reportOut, o, sec)) {
                        if (forcePredef && !o.dirty) {
                            reportOut.push({
                                type: 'frame',
                                text: `${o.label}: ${o.normRep}.`,
                                tableId: o.tableId,
                                predef: true
                            });
                        }
                    }
                }
                concMain.push(...sec.main);
                concInc.push(...sec.incidental);
            };

            let orphanLes = false;
            let hasLesFindings = false;
            let hasLnFindings = false;
            const flushOrgans = () => {
                flushOrganExpand({
                    expandMode,
                    groups: GROUPS,
                    organOrder: ORGAN_ORDER,
                    organBag,
                    writeOrganSection,
                    reportOut,
                    formatList,
                    hasExtraPath: toOrgans ? orphanLes : (hasLesFindings || hasLnFindings)
                });
            };

            const isPET = (examId || '').toLowerCase().includes('pet');

            // Generic helper for R/L elements
            const checkSide = (baseId) => {
                let p = ctx.text(`${baseId}_r`), l = ctx.text(`${baseId}_l`);
                if ((!p || p === '0') && (!l || l === '0')) return null;
                let isP = p && p !== '0', isL = l && l !== '0';
                return { p, l, isP, isL, sideText: (isP && isL) ? 'bilat.' : (isP ? 'vpravo' : 'vlevo'), isPlural: (p === 'více' || l === 'více' || (isP && isL)) };
            };

            const pendingLes = [];
            const lesInsts = getExamInstances('abdomen_lesion_main', examId);
            let highAct = false, badEtio = false;
            lesInsts.forEach(id => {
                if (['intermediární', 'zvýšená', 'vysoká'].includes(ctx.text(`al_${id}_met_act`, true))) highAct = true;
                if (!ctx.isActive(`al_${id}_e_b`) && !ctx.isActive(`al_${id}_e_inf`)) badEtio = true;
            });

            lesInsts.forEach(instId => {
                const p = `al_${instId}`;
                    const lokaceByOrg = {};
                    const addLok = (key, text) => {
                        if (!key || !text) return;
                        (lokaceByOrg[key] ||= []).push(text);
                    };
                    
                    let ja = ctx.text(`${p}_p_ja`);
                    let segs = [];
                    ['s1', 's2', 's3', 's4a', 's4b', 's5', 's6', 's7', 's8'].forEach(s => {
                        if (ctx.isActive(`${p}_p_ja_${s}`)) segs.push(s.toUpperCase());
                    });
                    let vse = ctx.isActive(`${p}_p_ja_vse`);

                    if (ja === 'pravý l.') addLok('ja', 'v pravém laloku jater');
                    else if (ja === 'levý l.') addLok('ja', 'v levém laloku jater');
                    else if (ja === '+') addLok('ja', 'jater');

                    if (vse) addLok('ja', 've všech segmentech jater');
                    else if (segs.length > 0) addLok('ja', `v ${segs.join(', ')} jater`);

                    let zl = ctx.text(`${p}_p_zl`);
                    if (zl === '+') addLok('zl', 'stěny žlučníku');
                    else if (zl === 'fundus') addLok('zl', 'fundu žlučníku');
                    else if (zl === 'tělo') addLok('zl', 'těla žlučníku');
                    else if (zl === 'krček') addLok('zl', 'krčku žlučníku');

                    let pa = ctx.text(`${p}_p_pa`);
                    if (pa === '+') addLok('pa', 'pankreatu');
                    else if (pa === 'hlava') addLok('pa', 'hlavy pankreatu');
                    else if (pa === 'tělo') addLok('pa', 'těla pankreatu');
                    else if (pa === 'kauda') addLok('pa', 'kaudy pankreatu');

                    let za = ctx.text(`${p}_p_za`);
                    if (za === '+') addLok('za', 'žaludku');
                    else if (za === 'kardie') addLok('za', 'kardie žaludku');
                    else if (za === 'fundus') addLok('za', 'fundu žaludku');
                    else if (za === 'tělo') addLok('za', 'těla žaludku');
                    else if (za === 'pylorus') addLok('za', 'pyloru žaludku');

                    let tr = ctx.text(`${p}_p_tr`);
                    const trMap = {
                        '+': 'tračníku', 'anus': 'anu', 'anorektum': 'anorekta', 'rektum': 'rekta',
                        'sigma': 'sigmatu', 'descendens': 'tračníku descendens', 'transverzum': 'tračníku transverzum',
                        'ascendens': 'tračníku ascendens', 'cékum': 'céka', 'appendix': 'appendixu'
                    };
                    if (tr && trMap[tr]) addLok('tr', trMap[tr]);

                    if (ctx.isActive(`${p}_p_sl`)) addLok('sl', 'sleziny');
                    if (ctx.isActive(`${p}_p_me`)) addLok('ts', 'mesenteria');
                    
                    let pe = ctx.text(`${p}_p_pe`);
                    if (pe === '+') addLok('pe', 'peritonea');
                    else if (pe === 'omentum') addLok('pe', 'omenta');
                    else if (pe === 'pánevní') addLok('pe', 'pánevního peritonea');

                    const processPair = (id, rootRight, rootLeft, rootBilat, orgKey) => {
                        let txtR = ctx.text(`${p}_p_${id}_r`);
                        let txtL = ctx.text(`${p}_p_${id}_l`);
                        let actR = txtR && txtR !== '0';
                        let actL = txtL && txtL !== '0';
                        if (!actR && !actL) return;

                        if (actR && actL) {
                            if (txtR === '+' && txtL === '+') {
                                addLok(orgKey, rootBilat);
                            } else if (txtR === txtL && txtR !== '+') {
                                if (txtR === 'horní') addLok(orgKey, `horních pólů ${rootBilat}`);
                                else if (txtR === 'dolní') addLok(orgKey, `dolních pólů ${rootBilat}`);
                                else if (txtR === 'střední') addLok(orgKey, `středních částí ${rootBilat}`);
                            } else {
                                let strR = txtR === '+' ? rootRight : (txtR === 'horní' ? `horního pólu ${rootRight}` : (txtR === 'dolní' ? `dolního pólu ${rootRight}` : `střední části ${rootRight}`));
                                let strL = txtL === '+' ? rootLeft : (txtL === 'horní' ? `horního pólu ${rootLeft}` : (txtL === 'dolní' ? `dolního pólu ${rootLeft}` : `střední části ${rootLeft}`));
                                addLok(orgKey, `${strR} a ${strL}`);
                            }
                        } else if (actR) {
                            if (txtR === '+') addLok(orgKey, rootRight);
                            else if (txtR === 'horní') addLok(orgKey, `horního pólu ${rootRight}`);
                            else if (txtR === 'dolní') addLok(orgKey, `dolního pólu ${rootRight}`);
                            else if (txtR === 'střední') addLok(orgKey, `střední části ${rootRight}`);
                        } else if (actL) {
                            if (txtL === '+') addLok(orgKey, rootLeft);
                            else if (txtL === 'horní') addLok(orgKey, `horního pólu ${rootLeft}`);
                            else if (txtL === 'dolní') addLok(orgKey, `dolního pólu ${rootLeft}`);
                            else if (txtL === 'střední') addLok(orgKey, `střední části ${rootLeft}`);
                        }
                    };

                    processPair('nadl', 'pravé nadledviny', 'levé nadledviny', 'nadledvin bilat.', 'na');
                    processPair('led', 'pravé ledviny', 'levé ledviny', 'ledvin bilat.', 'le');
                    processPair('ova', 'pravého ovária', 'levého ovária', 'ovárií bilat.', 'ov');
                    processPair('tes', 'pravého varlete', 'levého varlete', 'varlat bilat.', 'te');

                    let proR = ctx.isActive(`${p}_p_pro_r`);
                    let proL = ctx.isActive(`${p}_p_pro_l`);
                    if (proR && proL) addLok('pr', 'prostaty bilat.');
                    else if (proR) addLok('pr', 'prostaty vpravo');
                    else if (proL) addLok('pr', 'prostaty vlevo');

                    if (ctx.isActive(`${p}_p_del`)) {
                        let del = ctx.text(`${p}_p_del`);
                        if (del === 'děloha') addLok('de', 'dělohy');
                        else if (del === 'krček') addLok('de', 'krčku dělohy');
                        else if (del === 'tělo') addLok('de', 'těla dělohy');
                        else if (del === 'fundus') addLok('de', 'fundu dělohy');
                    }

                    if (ctx.isActive(`${p}_p_mec`)) {
                        let mec = ctx.text(`${p}_p_mec`);
                        if (mec === 'měchýř') addLok('mm', 'měchýře');
                    }

                    queueLesionForOrgans(pendingLes, concMain, ctx, {
                        examId, regionId: 'abdomen', p, tableId: `abdomen_lesion_main__${instId}`
                    }, lokaceByOrg, { toOrgans });
                });

            hasLesFindings = pendingLes.length > 0;

            const pendingLn = [];
            const lnInsts = getExamInstances('abdomen_lymphnode_main', examId);
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

                    const f = LESIONS_DEFINITION.frames(ctx, { examId, regionId: 'abdomen', p, tableId: `abdomen_lymphnode_main__${instId}`, isLN: true, lokace: lokaceLN });
                    if (f) {
                        concMain.push(f.conc);
                        pendingLn.push({ report: f.report, organKeys: ['vc'] });
                    }
                });
            hasLnFindings = pendingLn.length > 0;

            if (!toOrgans) {
                const lesStart = reportOut.length;
                pendingLes.forEach(item => reportOut.push(item.report));
                if (!hasLesFindings || (isPET && !highAct)) {
                    reportOut.splice(lesStart, 0, LESIONS_DEFINITION.virtualPredef(
                        'abdomen_lesion_main', LESIONS_DEFINITION.predefText.lesion(isPET)));
                }
                if (hasLesFindings && (!isPET || highAct) && !badEtio) {
                    reportOut.push(LESIONS_DEFINITION.virtualPredef(
                        'abdomen_lesion_main', LESIONS_DEFINITION.predefText.lesionJinak));
                }
                pendingLn.forEach(item => reportOut.push(item.report));
                if (!hasLnFindings) {
                    reportOut.push(LESIONS_DEFINITION.virtualPredef(
                        'abdomen_lymphnode_main', LESIONS_DEFINITION.predefText.lymph(isPET)));
                }
            } else if (!hasLesFindings || (isPET && !highAct)) {
                /* U PET bez vysoké aktivity zůstává negativní text nahoře i při zápisu k orgánům. */
                reportOut.push(LESIONS_DEFINITION.virtualPredef(
                    'abdomen_lesion_main', LESIONS_DEFINITION.predefText.lesion(isPET)));
            }

            // 3. Játra
            let jaRep = [];
            const jaFocalText = (side, one, many, manyVicetne) => {
                const both = side.p !== '0' && side.l !== '0';
                const vicetne = side.p === 'více' || side.l === 'více';
                if (both) return vicetne ? manyVicetne : many;
                const loc = side.isP ? ' v pravém laloku' : ' v levém laloku';
                return (vicetne ? manyVicetne : one) + loc;
            };
            let jaCys = checkSide('ja_cys'); if (jaCys) jaRep.push(jaFocalText(jaCys, 'prostá cysta', 'prosté cysty', 'vícečetné prosté cysty'));
            let jaInc = checkSide('ja_inc'); if (jaInc) { jaRep.push(jaFocalText(jaInc, 'necharakteristické ložisko', 'necharakteristická ložiska', 'vícečetná necharakteristická ložiska')); const both = jaInc.p !== '0' && jaInc.l !== '0'; const vicetne = jaInc.p === 'více' || jaInc.l === 'více'; const incConc = both ? (vicetne ? 'Vícečetné incidentalomy k dovyšetření.' : 'Incidentalomy k dovyšetření.') : (vicetne ? `Vícečetné incidentalomy ${jaInc.isP ? 'v pravém laloku' : 'v levém laloku'} jater k dovyšetření.` : `Incidentalom ${jaInc.isP ? 'v pravém laloku' : 'v levém laloku'} jater k dovyšetření.`); concInc.push({ type: 'frame', text: incConc, tableId: 'abdomen_jatra_main' }); }
            let jaHem = checkSide('ja_hem'); if (jaHem) jaRep.push(jaFocalText(jaHem, 'ložisko s periferním sycením (hemangiom)', 'ložiska s periferním sycením (hemangiomy)', 'vícečetná ložiska s periferním sycením (hemangiomy)'));
            let jaDil = checkSide('ja_dil'); if (jaDil) { jaRep.push(`dilatace intrahepatálních žlučovodů ${jaDil.p !== '0' && jaDil.l !== '0' ? 'v obou lalocích' : jaDil.isP ? 'v pravém laloku' : 'v levém laloku'}`); concInc.push({ type: 'frame', text: `Dilatace intrahepatálních žlučovodů ${jaDil.p !== '0' && jaDil.l !== '0' ? 'v obou lalocích' : jaDil.isP ? 'v pravém laloku' : 'v levém laloku'}.`, tableId: 'abdomen_jatra_main' }); }
            let jaZvet = ctx.text('ja_zvet'); if (jaZvet && jaZvet !== '0') { jaRep.push(`${jaZvet} zvětšení`); concInc.push({ type: 'frame', text: `${capitalize(jaZvet)} hepatomegalie.`, tableId: 'abdomen_jatra_main' }); }
            let jaDif = ctx.text('ja_dif'); if (jaDif === 'steatóza') jaRep.push("difuzní steatóza"); else if (jaDif === 'fibróza') jaRep.push("parenchym mírně nehomogenní"); else if (jaDif === 'cirhóza') { jaRep.push("zmenšení s laločnatým povrchem"); concMain.push({ type: 'frame', text: "Známky jaterní cirhózy.", tableId: 'abdomen_jatra_main' }); }
            if (ctx.isActive('ja_port')) { jaRep.push("rozšířená v. portae a kolaterály"); concMain.push({ type: 'frame', text: "Známky portální hypertenze.", tableId: 'abdomen_jatra_main' }); }
            let jaOps = [];
            ['hemi', 'res', 'rfa'].forEach(op => { let o = checkSide(`ja_${op}`); if (o) jaOps.push(`${op === 'hemi' ? 'hemihepatektomii' : op === 'res' ? 'resekci' : 'RFA'} ${o.sideText}`); });
            if (jaOps.length) jaRep.push(`stav po ${formatList(jaOps)}`);
            let jaDesc = ctx.field('ja_custom_desc'); if (jaDesc) jaRep.push(jaDesc);
            emitOrgan('ja', 'ja_ost_add', jaRep, 'Játra', 'abdomen_jatra_main', OP.ja.findings, OP.ja.conclusion);

            // 4. Žlučník
            let zlRep = [];
            let zlLit = ctx.text('zl_lit'); if (zlLit && zlLit !== '0') { zlRep.push(zlLit === 'sludge' ? 'v lumen sludge' : (zlLit === '1' ? 'solitární konkrement' : 'vícečetné konkrementy')); concInc.push({ type: 'frame', text: zlLit === 'sludge' ? "Sludge ve žlučníku." : "Cholecystolitiáza.", tableId: 'abdomen_zlucnik_main' }); }
            let zlChol = ctx.text('zl_chol'); if (zlChol && zlChol !== '0') { zlRep.push(`${zlChol} zesílení stěny a edém okolí`); concMain.push({ type: 'frame', text: `${capitalize(zlChol)} cholecystitis.`, tableId: 'abdomen_zlucnik_main' }); }
            let zlChod = ctx.text('zl_chod'); if (zlChod && zlChod !== '0') { zlRep.push(`${zlChod} dilatace d. choledochus`); concInc.push({ type: 'frame', text: `${capitalize(zlChod)} dilatace d. choledochus.`, tableId: 'abdomen_zlucnik_main' }); }
            if (ctx.isActive('zl_chce')) zlRep.push("stav po cholecystektomii");
            let zlDesc = ctx.field('zl_custom_desc'); if (zlDesc) zlRep.push(zlDesc);
            emitOrgan('zl', 'zl_ost_add', zlRep, 'Žlučník', 'abdomen_zlucnik_main', OP.zl.findings, OP.zl.conclusion);
            let slRep = [];
            if (ctx.isActive('sl_zvet')) { let mm = ctx.field('sl_zvet_mm'); slRep.push(`zvětšená${mm ? ' (KK diametr ' + mm + ' mm)' : ''}`); concInc.push({ type: 'frame', text: "Splenomegalie.", tableId: 'abdomen_slezina_main' }); }
            if (ctx.isActive('sl_akt')) { slRep.push("difuzně zvýšená akumulací RF"); concInc.push({ type: 'frame', text: "Difuzně zvýšená aktivita sleziny (v.s. reaktivně/zánětlivě).", tableId: 'abdomen_slezina_main' }); }
            let slCys = ctx.text('sl_cys'); if (slCys && slCys !== '0') slRep.push(slCys === '1' ? 'cystoidní léze' : 'vícečetné cystoidní léze');
            let slHem = ctx.text('sl_hem'); if (slHem && slHem !== '0') slRep.push(slHem === '1' ? 'ložisko (hemangiom)' : 'vícečetné hemangiomy');
            let slInf = ctx.text('sl_inf'); if (slInf && slInf !== '0') { slRep.push(slInf === '1' ? 'klínovité ložisko pravděp. po infarktu' : 'vícečetná klínovitá ložiska pravděp. po infarktech'); concInc.push({ type: 'frame', text: "Stav po infarktu sleziny.", tableId: 'abdomen_slezina_main' }); }
            if (ctx.isActive('sl_spl')) slRep.push("po splenektomii");
            if (ctx.isActive('sl_reg')) slRep.push("nodulus charakteru regenerátu");
            let slDesc = ctx.field('sl_custom_desc'); if (slDesc) slRep.push(slDesc);
            emitOrgan('sl', 'sl_ost_add', slRep, 'Slezina', 'abdomen_slezina_main', OP.sl.findings, OP.sl.conclusion);
            // 6. Pankreas
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
            emitOrgan('pa', 'pa_ost_add', paRep, 'Pankreas', 'abdomen_pankreas_main', OP.pa.findings, OP.pa.conclusion);
            // 7. Žaludek
            let zaRep = [];
            let zaRes = ctx.text('za_res'); if (zaRes && zaRes !== '0') zaRep.push(`stav po ${zaRes === 'parc.' ? 'parc. resekci s gastoenteroanastomózou' : zaRes === 'total.' ? 'totální gastrektomii s gastoenteroanastomózou' : 'tubulizaci'}`);
            let zaBar = ctx.text('za_bar'); if (zaBar && zaBar !== '0') zaRep.push(`stav po bariatrické operaci (${zaBar === 'bandáž' ? 'bandáž' : 'gastrický bypass'})`);
            if (ctx.isActive('za_fun')) zaRep.push("známky fundoplikace");
            let zaSon = ctx.text('za_son'); if (zaSon && zaSon !== '0') zaRep.push(`zavedena ${zaSon} sonda`);
            let zaZes = ctx.text('za_zes'), zaZesLoc = ctx.text('za_zes_loc'); if (zaZes && zaZes !== '0') { let zloc = zaZesLoc !== '0' ? ` v oblasti ${zaZesLoc}` : ''; zaRep.push(`${zaZes} zesílení stěny${zloc}`); if (zaZes === 'výrazné') concInc.push({ type: 'frame', text: `Zesílení stěny žaludku${zloc}.`, tableId: 'abdomen_zaludek_main' }); }
            let zaDesc = ctx.field('za_custom_desc'); if (zaDesc) zaRep.push(zaDesc);
            emitOrgan('za', 'za_ost_add', zaRep, 'Žaludek', 'abdomen_zaludek_main', OP.za.findings, OP.za.conclusion);
            // 8. Tenké střevo
            let tsRep = [];
            let peMis = ctx.text('pe_mis'); if (peMis === 'zastření') tsRep.push("mírné nespecifické lokální zastření mesenteria"); else if (peMis === 'panikulitis') { tsRep.push("lokální zastření mesenteria s uzlinami (panikulitis)"); concInc.push({ type: 'frame', text: "Mesenteriální panikulitis.", tableId: 'abdomen_tenke_strevo_main' }); }
            let tsDesc = ctx.field('ts_custom_desc'); if (tsDesc) tsRep.push(tsDesc);
            emitOrgan('ts', 'ts_ost_add', tsRep, 'Tenké střevo', 'abdomen_tenke_strevo_main', OP.ts.findings, OP.ts.conclusion);
            // 9. Tračník
            let trRep = [];
            let trRes = ctx.text('tr_res'); if (trRes && trRes !== '0') trRep.push(`stav po ${trRes === 'P hemikol.' ? 'pravostranné hemikolektomii' : trRes === 'L hemikol.' ? 'levostranné hemikolektomii' : trRes === 'sigmoidea' ? 'resekci sigmoidea' : trRes === 'rekta' ? 'resekci rekta' : 'amputaci rekta'}`);
            if (ctx.isActive('tr_app')) trRep.push("stav po appendektomii");
            let trSto = ctx.text('tr_sto'), trStoLoc = ctx.text('tr_sto_loc'); if (trSto && trSto !== '0') trRep.push(`vyvedena ${trSto}${trStoLoc !== '0' ? ' ' + trStoLoc : ''}`);
            let trFok = ctx.text('tr_fok'), trFokLoc = ctx.text('tr_fok_loc'); if (trFok && trFok !== '0') { let loc = trFokLoc !== '0' ? trFokLoc : 'tračníku'; trRep.push(`ložiskově zvýšená akumulace RF v oblasti ${loc} (${trFok})`); concInc.push({ type: 'frame', text: `Fokální aktivita v oblasti ${loc} - k dovyšetření (v.s. polyp/tumor).`, tableId: 'abdomen_tracnik_main' }); }
            let trZes = ctx.text('tr_zes'), trZesLoc = ctx.text('tr_zes_loc'); if (trZes && trZes !== '0') { let loc = trZesLoc !== '0' ? trZesLoc : 'střeva'; trRep.push(`${trZes} zesílení stěny v oblasti ${loc}`); if (trZes === 'výrazné') concInc.push({ type: 'frame', text: `Zesílení stěny v oblasti ${loc}.`, tableId: 'abdomen_tracnik_main' }); }
            let trDiv = ctx.text('tr_div'), trDivLoc = ctx.text('tr_div_loc'); if (trDiv && trDiv !== '0') { let loc = trDivLoc !== '0' ? ` v oblasti ${trDivLoc}` : ''; trRep.push(`divertikulóza${loc}${trDiv === 'divertikulitida' ? ' se známkami zánětlivé iritace okolí' : ''}`); if (trDiv === 'divertikulitida') concInc.push({ type: 'frame', text: `Známky divertikulitidy${loc}.`, tableId: 'abdomen_tracnik_main' }); }
            let trDesc = ctx.field('tr_custom_desc'); if (trDesc) trRep.push(trDesc);
            emitOrgan('tr', 'tr_ost_add', trRep, 'Tračník', 'abdomen_tracnik_main', OP.tr.findings, OP.tr.conclusion);
            // 10. Peritoneum
            let peRep = [];
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
            emitOrgan('pe', 'pe_ost_add', peRep, 'Peritoneum', 'abdomen_peritoneum_main', OP.pe.findings, OP.pe.conclusion);
            // 11. Nadledviny
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
            emitOrgan('na', 'na_ost_add', naRep, 'Nadledviny', 'abdomen_nadledviny_main', OP.na.findings, OP.na.conclusion);
            // 12. Ledviny
            let leRep = [];
            let lCys = checkSide('le_cys'); if (lCys) leRep.push(`${lCys.isPlural ? 'prosté kortikální cysty' : 'prostá kortikální cysta'} ${lCys.sideText}`);
            let lAml = checkSide('le_aml'); if (lAml) leRep.push(`${lAml.isPlural ? 'ložiska tukové denzity (angiomyolipomy)' : 'ložisko tukové denzity (angiomyolipom)'} ${lAml.sideText}`);
            let lJiz = checkSide('le_jiz'); if (lJiz) leRep.push(`${lJiz.isPlural ? 'jizevnaté okrsky' : 'jizevnatý okrsek'} ${lJiz.sideText}`);
            let lHyd = checkSide('le_hyd'); if (lHyd) { let mapH = {'I':'mírná dilatace pánvičky', 'II':'dilatace pánvičky a některých kalichů', 'III':'dilatace pánvičky a všech kalichů', 'IV':'těžká dilatace dutého systému'}; let t = lHyd.sideText === 'bilat.' && lHyd.p === lHyd.l ? `${mapH[lHyd.p]} bilat.` : `${lHyd.isP ? mapH[lHyd.p] + ' vpravo' : ''}${lHyd.isP && lHyd.isL ? ' a ' : ''}${lHyd.isL ? mapH[lHyd.l] + ' vlevo' : ''}`; leRep.push(t); concMain.push({ type: 'frame', text: `Hydronefróza ${lHyd.sideText}.`, tableId: 'abdomen_ledviny_main' }); }
            let lLit = checkSide('le_lit'); if (lLit) {
                const litKey = (v) => String(v || '').toLowerCase();
                const getLoc = (v) => ({ 'kaliko': 'v kalichu', 'pelvi': 'v pánvičce', 'pu junkce': 'v pyelo-ureterální junkci', 'ureter': 'v ureteru', 'vu junkce': 'v uretero-vezikální junkci' }[litKey(v)] || v);
                const getLit = (v) => ({ 'kaliko': 'kalikolitiáza', 'pelvi': 'pelviolitiáza', 'pu junkce': 'litiáza pyeloureterální junkce', 'ureter': 'ureterolitiáza', 'vu junkce': 'litiáza uretero-vezikální junkce' }[litKey(v)] || 'urolitiáza');
                let t = lLit.sideText === 'bilat.' && lLit.p === lLit.l
                    ? `litiáza ${getLoc(lLit.p)} bilat.`
                    : `${lLit.isP ? 'litiáza ' + getLoc(lLit.p) + ' vpravo' : ''}${lLit.isP && lLit.isL ? ' a ' : ''}${lLit.isL ? 'litiáza ' + getLoc(lLit.l) + ' vlevo' : ''}`;
                leRep.push(t);
                let concT = lLit.sideText === 'bilat.' && lLit.p === lLit.l
                    ? `${getLit(lLit.p)} bilat.`
                    : `${lLit.isP ? getLit(lLit.p) + ' vpravo' : ''}${lLit.isP && lLit.isL ? ' a ' : ''}${lLit.isL ? getLit(lLit.l) + ' vlevo' : ''}.`;
                concInc.push({ type: 'frame', text: capitalize(concT.endsWith('.') ? concT : concT + '.'), tableId: 'abdomen_ledviny_main' });
            }
            let lSte = checkSide('le_ste'); if (lSte) { let gs = (v) => v === 'správně' ? 've správné pozici' : 's dislokací'; let t = lSte.sideText === 'bilat.' && lSte.p === lSte.l ? `ureterální stent ${gs(lSte.p)} bilat.` : `${lSte.isP ? 'ureterální stent ' + gs(lSte.p) + ' vpravo' : ''}${lSte.isP && lSte.isL ? ' a ' : ''}${lSte.isL ? 'ureterální stent ' + gs(lSte.l) + ' vlevo' : ''}`; leRep.push(t); if (lSte.p === 'dislokace' || lSte.l === 'dislokace') concMain.push({ type: 'frame', text: `Dislokace stentu ${lSte.sideText}.`, tableId: 'abdomen_ledviny_main' }); }
            let lNef = checkSide('le_nef'); if (lNef) leRep.push(`zavedena nefrostomie ${lNef.sideText}`);
            let lRes = checkSide('le_res'); if (lRes) { let gp = (v) => v === 'horní' ? 'horního' : v === 'střední' ? 'středního' : 'dolního'; let t = lRes.sideText === 'bilat.' && lRes.p === lRes.l ? `stav po parciální resekci ${gp(lRes.p)} pólu bilat.` : `${lRes.isP ? 'stav po parciální resekci ' + gp(lRes.p) + ' pólu vpravo' : ''}${lRes.isP && lRes.isL ? ' a ' : ''}${lRes.isL ? 'stav po parciální resekci ' + gp(lRes.l) + ' pólu vlevo' : ''}`; leRep.push(t); }
            let lNek = checkSide('le_nek'); if (lNek) leRep.push(`stav po nefrektomii ${lNek.sideText}`);
            let leDesc = ctx.field('le_custom_desc'); if (leDesc) leRep.push(leDesc);
            emitOrgan('le', 'le_ost_add', leRep, 'Ledviny', 'abdomen_ledviny_main', OP.le.findings, OP.le.conclusion);
            // 13. Močový měchýř
            let mmRep = [];
            let mmKat = ctx.text('mm_kat'); if (mmKat && mmKat !== '0') mmRep.push(`zaveden ${mmKat === 'PMK' ? 'permanentní močový katetr' : 'epikutánní katetr (epicystostomie)'}`);
            let mmDiv = ctx.text('mm_div'); if (mmDiv && mmDiv !== '0') { mmRep.push(mmDiv === '1' ? 'divertikl' : 'vícečetné divertikly'); concInc.push({ type: 'frame', text: mmDiv === '1' ? 'Divertikl močového měchýře.' : 'Divertikulóza močového měchýře.', tableId: 'abdomen_moc_mechyr_main' }); }
            let mmSto = ctx.text('mm_sto'); if (mmSto && mmSto !== '0') mmRep.push(`vyvedena ${mmSto === 'urostomie' ? 'urostomie' : 'urostomie dle Brickera'}`);
            let mmOp = ctx.text('mm_op'); if (mmOp && mmOp !== '0') mmRep.push(`stav po ${mmOp === 'TURB' ? 'TURB' : 'cystektomii'}`);
            let mmDesc = ctx.field('mm_custom_desc'); if (mmDesc) mmRep.push(mmDesc);
            emitOrgan('mm', 'mm_ost_add', mmRep, 'Močový měchýř', 'abdomen_moc_mechyr_main', OP.mm.findings, OP.mm.conclusion);
            // 14. Ovária
            let ovRep = [];
            let ovPc = checkSide('ov_pc'); if (ovPc) ovRep.push(`${ovPc.isPlural ? 'vícečetné prosté cysty' : 'solitární prostá cysta'} adnexálně ${ovPc.sideText}`);
            let ovKc = checkSide('ov_kc'); if (ovKc) { let valP = ctx.field('ov_kc_mm_r'), valL = ctx.field('ov_kc_mm_l'); let sizeStr = ''; if (ovKc.sideText === 'bilat.') { if (valP && valL) sizeStr = ` vel. do ${valP} mm vpravo a ${valL} mm vlevo`; else if (valP) sizeStr = ` vel. do ${valP} mm vpravo`; else if (valL) sizeStr = ` vel. do ${valL} mm vlevo`; } else { let val = ovKc.isP ? valP : valL; if (val) sizeStr = ` vel. do ${val} mm`; } ovRep.push(`${ovKc.isPlural ? 'vícečetné komplexní cystické léze' : 'komplexní cystická léze'} adnexálně ${ovKc.sideText}${sizeStr}`); concInc.push({ type: 'frame', text: `Komplexní cystická léze ovaria ${ovKc.sideText} k UZ korelaci.`, tableId: 'abdomen_ovaria_main' }); }
            let ovAkt = checkSide('ov_akt'); if (ovAkt) ovRep.push(`zvýšená ložisková akumulace RF v ovariu ${ovAkt.sideText} fyziologického charakteru (ovulační projev)`);
            let ovAdn = checkSide('ov_adn'); if (ovAdn) ovRep.push(`stav po adnexektomii ${ovAdn.sideText}`);
            let ovDesc = ctx.field('ov_custom_desc'); if (ovDesc) ovRep.push(ovDesc);
            emitOrgan('ov', 'ov_ost_add', ovRep, 'Ovária a adnexa', 'abdomen_ovaria_main', OP.ov.findings, OP.ov.conclusion);
            // 15. Děloha
            let deRep = [];
            let deMyo = ctx.text('de_myo'), deMyoLoc = ctx.text('de_myo_loc'); if (deMyo && deMyo !== '0') { let loc = deMyoLoc !== '0' ? ` (${deMyoLoc})` : ''; deRep.push(`${deMyo === '1' ? 'solitární myom' : 'vícečetné myomy'}${loc}`); concInc.push({ type: 'frame', text: deMyo === '1' ? 'Myom dělohy.' : 'Uterus myomatosus.', tableId: 'abdomen_deloha_main' }); }
            let deEnd = ctx.text('de_end'), deEndInt = ctx.text('de_end_int'); if (deEnd && deEnd !== '0') { let int = deEndInt !== '0' ? ` ${deEndInt.split('/')[deEnd === 'zesílení' ? 0 : 1]}` : ''; deRep.push(`${int ? capitalize(int) : ''} ${deEnd === 'zesílení' ? 'zesílení sliznice endometria' : 'kolekce tekutiny v endometrální dutině'}`.trim()); concInc.push({ type: 'frame', text: deEnd === 'zesílení' ? 'Zesílení endometria.' : 'Fluidometra.', tableId: 'abdomen_deloha_main' }); }
            if (ctx.isActive('de_akt')) deRep.push("mírná difuzní fyziologická akumulace RF v endometriu");
            if (ctx.isActive('de_iud')) deRep.push("IUD in situ");
            if (ctx.isActive('de_hys')) deRep.push("stav po hysterektomii");
            let deDesc = ctx.field('de_custom_desc'); if (deDesc) deRep.push(deDesc);
            emitOrgan('de', 'de_ost_add', deRep, 'Děloha', 'abdomen_deloha_main', OP.de.findings, OP.de.conclusion);
            // 16. Prostata
            let prRep = [];
            if (ctx.isActive('pr_zvet')) { let ml = ctx.field('pr_zvet_ml'); prRep.push(`zvětšená${ml ? ' (' + ml + ' ml)' : ''}`); concInc.push({ type: 'frame', text: "Hypertrofie prostaty.", tableId: 'abdomen_prostata_main' }); }
            if (ctx.isActive('pr_fok')) { prRep.push("ložiskově zvýšená akumulace RF v prostatě"); concMain.push({ type: 'frame', text: "Fokus zvýšené aktivity v prostatě, dop. korelaci.", tableId: 'abdomen_prostata_main' }); }
            if (ctx.isActive('pr_tur')) prRep.push("stav po TURP");
            if (ctx.isActive('pr_rap')) prRep.push("stav po radikální prostatektomii");
            let prDesc = ctx.field('pr_custom_desc'); if (prDesc) prRep.push(prDesc);
            emitOrgan('pr', 'pr_ost_add', prRep, 'Prostata', 'abdomen_prostata_main', OP.pr.findings, OP.pr.conclusion);

            // 17. Velké cévy - sekce Aneurysma
            let vcRep = [];
            let vcSg = ctx.isActive('vc_sg');
            
            let vcAn = ctx.text('vc_an');
            let vcAnMm = ctx.field('vc_an_val');

            if (vcAn && vcAn !== '0') {
                let mmString = vcAnMm ? ` (max diametru ${vcAnMm} mm)` : '';
                let fullAnText = `${capitalize(vcAn)} aneurysma aorty${mmString}`;
                
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
            emitOrgan('vc', 'vc_ost_add', vcRep, 'Velké cévy', 'abdomen_velke_cevy_main', OP.vc.findings, OP.vc.conclusion);
            // 18. Testes
            let teRep = [];
            let teHyd = checkSide('te_hyd'); if (teHyd) { teRep.push(`hydrokéla ${teHyd.sideText}`); concInc.push({ type: 'frame', text: `Hydrokéla ${teHyd.sideText}.`, tableId: 'abdomen_testes_main' }); }
            let teVar = checkSide('te_var'); if (teVar) { teRep.push(`varikokéla ${teVar.sideText}`); concInc.push({ type: 'frame', text: `Varikokéla ${teVar.sideText}.`, tableId: 'abdomen_testes_main' }); }
            let teOrc = checkSide('te_orc'); if (teOrc) teRep.push(`stav po orchiektomii ${teOrc.sideText}`);
            let teDesc = ctx.field('te_custom_desc'); if (teDesc) teRep.push(teDesc);
            emitOrgan('te', 'te_ost_add', teRep, 'Testes a skrotum', 'abdomen_testes_main', OP.te.findings, OP.te.conclusion);
            // 19. Břišní stěna
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
            emitOrgan('aw', 'aw_ost_add', awRep, 'Břišní stěna', 'abdomen_wall_main', OP.aw.findings, OP.aw.conclusion);

            if (toOrgans) {
                pendingLes.forEach(item => {
                    if (!placeLesionReport(organBag, reportOut, item.report, item.organKeys)) orphanLes = true;
                });
                pendingLn.forEach(item => {
                    placeLesionReport(organBag, reportOut, item.report, item.organKeys);
                });
            }

            flushOrgans();

            useSection(ctx.section({
                tableId: 'abdomen_ostatni_main', desc: 'ostatni_custom_desc',
                normal: 'ostatni_ost_add_normal',
                normalText: RegionAbdomen_PREDEFS.ostatni.findings,
                normalConc: RegionAbdomen_PREDEFS.ostatni.conclusion,
                predef: 'ostatni_ost_add_predef',
                predefText: RegionAbdomen_PREDEFS.ostatni.findings,
                concField: 'ostatni_custom_conc',
                capitalize: true
            }), { report: reportOut, main: concMain, incidental: concInc });

            return { report: reportOut, conclusion: { main: concMain, incidental: concInc } };
        }
    };