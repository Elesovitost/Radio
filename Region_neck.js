/* ═══════════════════════════════════════════════════════════
   PŘEDDEFINOVANÉ TEXTY — skupiny + orgány (editovat zde)
   findings = text ve Findings; conclusion = při normal!
   ═══════════════════════════════════════════════════════════ */
const RegionNeck_PREDEFS = {
    groups: {
        all: 'bez signifikantní patologie.',
        allOtherwise: 'Jinak bez patrné signifikantní patologie.'
    },
    organs: {
        sinus: { findings: 'vzdušné, bez patologického obsahu.', conclusion: 'Přiměřený nález v oblasti sinů.' },
        salivary: { findings: 'obvyklé velikosti a struktury, bez ložiskových změn.', conclusion: 'Přiměřený nález na slinných žlázách, bez ložiskové léze.' },
        pharynx: { findings: 'symetrický, bez ložiskového ztluštění stěny.', conclusion: 'Přiměřený nález na faryngu, bez ložiskové léze.' },
        thyroid: { findings: 'normální velikosti, parenchym bez zřetelných cyst či ložisek.', conclusion: 'Přiměřený nález na štítné žláze, bez ložiskové léze.' },
        soft: { findings: 'bez ložiskových změn.', conclusion: 'Přiměřený nález v měkkých tkáních krku, bez ložiskové léze.' }
    },
    ostatni: { findings: 'Bez dalších významných nálezů.', conclusion: 'Bez dalších významných nálezů na krku.' }
};

const RegionNeck = {
    title: 'Krk',
    predefs: RegionNeck_PREDEFS,

    /* Nabídky stavů na jednom místě - v layoutu se odkazuje jako
       { btn: 'plus', id: 'par_atr_r' } (id je potřeba jen když se liší od klíče). */
    buttons: {
        plus:      { states: ['0', '+'] },
        pocet:     { states: ['0', '1', 'více'] },
        sinus:     { states: ['0', 'cysta', 'hyper+', 'hyper++', 'tekutina'] },
        asymetrie: { states: ['0', 'poop', 'porad', 'oboje'] },

        ln_krk: { type: 'basic', text: 'Krk' },
        ln_IA:  { type: 'basic', text: 'IA' },
        ln_IB:  { type: 'basic', text: 'IB' },
        ln_IIA: { type: 'basic', text: 'IIA' },
        ln_IIB: { type: 'basic', text: 'IIB' },
        ln_III: { type: 'basic', text: 'III' },
        ln_IV:  { type: 'basic', text: 'IV' },
        ln_V:   { type: 'basic', text: 'V' },
        ln_VI:  { type: 'basic', text: 'VI' },

        thyr_enl: { type: 'basic', text: 'zvětšení' },
        thyr_rf:  { type: 'basic', text: 'RF+' }
    },

    /* Lokalizace léze - jedna tabulka pro layout i compile. */
    lokalizace: [
        ['patro', 'patro'], ['tons', 'tonsila'], ['jaz', 'jazyk'],
        ['far', 'farynx'], ['hyp', 'hypofarynx'], ['lar', 'larynx'],
        ['par', 'parotis'], ['sub', 'submandibularis'], ['thyr', 'thyroidea']
    ],

    /* Hladiny lymfatických uzlin krku (layout i compile). */
    lnLevels: ['IA', 'IB', 'IIA', 'IIB', 'III', 'IV', 'V', 'VI'],

    /* Virtuální skupiny — struktura; texty v RegionNeck_PREDEFS.groups */
    virtualGroups: [
        {
            id: 'all',
            name: 'Orgány krku',
            members: ['sinus', 'salivary', 'pharynx', 'thyroid', 'soft'],
            tableId: 'group:neck_sinus_main,neck_salivary_main,neck_pharynx_main,neck_thyroid_main,neck_soft_main',
            text: RegionNeck_PREDEFS.groups.all,
            otherwiseText: RegionNeck_PREDEFS.groups.allOtherwise
        }
    ],
    organOrder: ['sinus', 'salivary', 'pharynx', 'thyroid', 'soft'],

    layout: (helpers) => {
            let layoutNodes = [];

            const lesInsts = getExamInstances('neck_lesion_main');
            lesInsts.forEach((instId, idx) => {
                const p = `l_${instId}`;
                layoutNodes.push(
                    helpers.LesionMain(`neck_lesion_main__${instId}`, `Léze (${idx + 1})`, [
                        ...LESIONS_DEFINITION.getLesionRowsPre(helpers, p),
                        helpers.Table3colRCL(`${p}_r3`, 'Lokalizace', RegionNeck.lokalizace.map(([site, label]) => [
                            { btn: 'plus', id: `${p}_p_${site}_r` }, label, { btn: 'plus', id: `${p}_p_${site}_l` }
                        ])),
                        ...LESIONS_DEFINITION.getLesionRowsPost(helpers, p, `${p}_met`, `${p}_e`)
                    ])
                );
            });

            const lnInsts = getExamInstances('neck_lymphnode_main');
            lnInsts.forEach((instId, idx) => {
                const p = `ln_${instId}`;
                layoutNodes.push(
                    helpers.LesionMain(`neck_lymphnode_main__${instId}`, `Lymfadenopatie (${idx + 1})`, [
                        ...LESIONS_DEFINITION.getLymphNodeRowsPre(helpers, p),
                        helpers.Table3colRL(`${p}_r3`, 'Lokalizace', [
                            [ { btn: 'ln_krk', id: `${p}_p_krk_r` }, '\u00A0', { btn: 'ln_krk', id: `${p}_p_krk_l` } ],
                            ...RegionNeck.lnLevels.map(lvl => [
                                { btn: `ln_${lvl}`, id: `${p}_p_${lvl}_r` }, '', { btn: `ln_${lvl}`, id: `${p}_p_${lvl}_l` }
                            ])
                        ]),
                        ...LESIONS_DEFINITION.getLymphNodeRowsPost(helpers, p, `${p}_met`, `${p}_e`)
                    ])
                );
            });

            layoutNodes.push(
                helpers.TableMain('neck_sinus_main', 'Siny', [
                    helpers.Table3colRL('neck_sinus_table', [
                        [ { btn: 'sinus', id: 'sinus_front_r' }, 'frontální', { btn: 'sinus', id: 'sinus_front_l' } ],
                        [ { btn: 'sinus', id: 'sinus_ethmo_r' }, 'ethmoidální', { btn: 'sinus', id: 'sinus_ethmo_l' } ],
                        [ { btn: 'sinus', id: 'sinus_sfeno_r' }, 'sfenoidální', { btn: 'sinus', id: 'sinus_sfeno_l' } ],
                        [ { btn: 'sinus', id: 'sinus_maxil_r' }, 'maxilární', { btn: 'sinus', id: 'sinus_maxil_l' } ]
                    ]),
                    helpers.Table1col('neck_sinus_add', [
                        { field: 'text', id: 'sinus_custom_desc', placeholder: 'vlastní...popis...' },
                        { field: 'text', id: 'sinus_custom_conc', placeholder: 'vlastní...závěr...' }
                    ], { normal: true })
                ]),
                helpers.TableMain('neck_salivary_main', 'Slinné žlázy', [
                    helpers.Table3colRL('neck_parotis_table', 'Parotické', [
                        [ { btn: 'plus', id: 'par_atr_r' }, 'atrofie', { btn: 'plus', id: 'par_atr_l' } ],
                        [ { btn: 'plus', id: 'par_res_r' }, 'resekce', { btn: 'plus', id: 'par_res_l' } ],
                        [ { btn: 'pocet', id: 'par_nod_r' }, 'nodul', { btn: 'pocet', id: 'par_nod_l' } ],
                        [ { btn: 'pocet', id: 'par_nod_RF_r' }, 'nodul akumulace+', { btn: 'pocet', id: 'par_nod_RF_l' } ]
                    ]),
                    helpers.Table3colRL('neck_subman_table', 'Submandibulární', [
                        [ { btn: 'plus', id: 'sub_atr_r' }, 'atrofie', { btn: 'plus', id: 'sub_atr_l' } ],
                        [ { btn: 'plus', id: 'sub_res_r' }, 'resekce', { btn: 'plus', id: 'sub_res_l' } ],
                        [ { btn: 'pocet', id: 'sub_nod_r' }, 'nodul', { btn: 'pocet', id: 'sub_nod_l' } ],
                        [ { btn: 'pocet', id: 'sub_nod_RF_r' }, 'nodul akumulace+', { btn: 'pocet', id: 'sub_nod_RF_l' } ]
                    ]),
                    helpers.Table1col('neck_salivary_add', [
                        { field: 'text', id: 'salivary_custom_desc', placeholder: 'vlastní...popis...' },
                        { field: 'text', id: 'salivary_custom_conc', placeholder: 'vlastní...závěr...' }
                    ], { normal: true })
                ]),
                helpers.TableMain('neck_pharynx_main', 'Hltan/hrtan', [
                    helpers.Table3colRL('neck_pharynx_table', [
                        [ { btn: 'asymetrie', id: 'far_asym_oro_r' }, 'asymetrie orofaryngu', { btn: 'asymetrie', id: 'far_asym_oro_l' } ],
                        [ { btn: 'asymetrie', id: 'far_asym_hypo_r' }, 'asymetrie hypofaryngu', { btn: 'asymetrie', id: 'far_asym_hypo_l' } ],
                        [ { btn: 'plus', id: 'far_tons_r' }, 'tonsila RF-', { btn: 'plus', id: 'far_tons_l' } ],
                        [ { btn: 'plus', id: 'far_hlas_r' }, 'hlasivky RF-', { btn: 'plus', id: 'far_hlas_l' } ]
                    ]),
                    helpers.Table1col('neck_pharynx_add', [
                        { field: 'text', id: 'pharynx_custom_desc', placeholder: 'vlastní...popis...' },
                        { field: 'text', id: 'pharynx_custom_conc', placeholder: 'vlastní...závěr...' }
                    ], { normal: true })
                ]),
                helpers.TableMain('neck_thyroid_main', 'Thyroidea', [
                    helpers.Table3colRL('neck_thyroid_table', [
                        [ '', { btn: 'thyr_enl' }, '' ],
                        [ '', { btn: 'thyr_rf' }, '' ],
                        [ { btn: 'plus', id: 'thyr_res_r' }, 'resekce', { btn: 'plus', id: 'thyr_res_l' } ],
                        [ { btn: 'pocet', id: 'thyr_nod_r' }, 'nodul', { btn: 'pocet', id: 'thyr_nod_l' } ],
                        [ { btn: 'pocet', id: 'thyr_nod_rf_r' }, 'nodul RF+', { btn: 'pocet', id: 'thyr_nod_rf_l' } ],
                        [ { btn: 'pocet', id: 'thyr_cys_r' }, 'cysta', { btn: 'pocet', id: 'thyr_cys_l' } ]
                    ]),
                    helpers.Table1col('neck_thyroid_add', [
                        { field: 'text', id: 'thyroid_custom_desc', placeholder: 'vlastní...popis...' },
                        { field: 'text', id: 'thyroid_custom_conc', placeholder: 'vlastní...závěr...' }
                    ], { normal: true })
                ]),
                helpers.TableMain('neck_soft_main', 'Měkké tkáně', [
                    helpers.Table1col('neck_soft_add', [
                        { field: 'text', id: 'neck_soft_custom_desc', placeholder: 'vlastní...popis...' },
                        { field: 'text', id: 'neck_soft_custom_conc', placeholder: 'vlastní...závěr...' }
                    ], { normal: true })
                ]),
                helpers.TableMain('neck_ostatni_main', 'Ostatní nálezy', [
                    helpers.Table1col('neck_ostatni_add', [
                        { field: 'text', id: 'neck_ostatni_custom_desc', placeholder: 'vlastní...popis...' },
                        { field: 'text', id: 'neck_ostatni_custom_conc', placeholder: 'vlastní...závěr...' }
                    ], { normal: true })
                ])
            );

            return layoutNodes;
        },

        compile: (ctx) => {
            let reportOut = [{ type: 'heading', text: 'Krk:', action: 'open-region', regionId: 'neck' }];
            let concMain = [];
            let concInc = [];
            const examId = ctx.examId || 'default';
            const isPET = (examId || '').toLowerCase().includes('pet');
            const toOrgans = shouldPlaceLesionsInOrgans(examId);
            const expandMode = getOrganExpandMode(examId);
            const { organBag, emitOrgan, flush } = createOrganExpandState(ctx, { reportOut, concMain, concInc });
            const OP = RegionNeck_PREDEFS.organs;

            /* Lokalizace léze → klíč orgánu pro zápis „k orgánům“. */
            const NECK_SITE_ORGAN = {
                patro: 'pharynx', tons: 'pharynx', jaz: 'pharynx',
                far: 'pharynx', hyp: 'pharynx', lar: 'pharynx',
                par: 'salivary', sub: 'salivary', thyr: 'thyroid'
            };

            const pendingLes = [];
            const lesInsts = getExamInstances('neck_lesion_main', examId);
            let highAct = false, badEtio = false;
            lesInsts.forEach(id => {
                if (['intermediární', 'zvýšená', 'vysoká'].includes(ctx.text(`l_${id}_met_act`, true))) highAct = true;
                if (!ctx.isActive(`l_${id}_e_b`) && !ctx.isActive(`l_${id}_e_inf`)) badEtio = true;
            });

            lesInsts.forEach(instId => {
                const p = `l_${instId}`;
                const lokaceByOrg = {};
                RegionNeck.lokalizace.forEach(([site, name]) => {
                    const r = ctx.isActive(`${p}_p_${site}_r`), l = ctx.isActive(`${p}_p_${site}_l`);
                    if (!r && !l) return;
                    const orgKey = NECK_SITE_ORGAN[site];
                    if (!orgKey) return;
                    const pad2 = GRAMMAR_DICT.lokalizace[name]?.pad2 || name;
                    const lok = (r && l) ? `${pad2} bilat.` : `${pad2} ${r ? 'vpravo' : 'vlevo'}`;
                    (lokaceByOrg[orgKey] ||= []).push(lok);
                });
                queueLesionForOrgans(pendingLes, concMain, ctx, {
                    examId, regionId: 'neck', p, tableId: `neck_lesion_main__${instId}`
                }, lokaceByOrg, { toOrgans });
            });

            const pendingLn = [];
            const lnInsts = getExamInstances('neck_lymphnode_main', examId);
            lnInsts.forEach(instId => {
                const p = `ln_${instId}`;
                let lokaceLN = [];
                let krk_p = ctx.isActive(`${p}_p_krk_r`), krk_l = ctx.isActive(`${p}_p_krk_l`);
                if (krk_p && krk_l) lokaceLN.push("na krku bilat.");
                else if (krk_p) lokaceLN.push("na krku vpravo");
                else if (krk_l) lokaceLN.push("na krku vlevo");

                let levelsR = [], levelsL = [];
                RegionNeck.lnLevels.forEach(lvl => {
                    if (ctx.isActive(`${p}_p_${lvl}_r`)) levelsR.push(lvl);
                    if (ctx.isActive(`${p}_p_${lvl}_l`)) levelsL.push(lvl);
                });

                if (levelsR.length > 0 && levelsR.join(',') === levelsL.join(',')) {
                    lokaceLN.push(`v levelu ${levelsR.join(', ')} bilat.`);
                } else {
                    if (levelsR.length > 0) lokaceLN.push(`v levelu ${levelsR.join(', ')} vpravo`);
                    if (levelsL.length > 0) lokaceLN.push(`v levelu ${levelsL.join(', ')} vlevo`);
                }

                const f = LESIONS_DEFINITION.frames(ctx, { examId, regionId: 'neck', p, tableId: `neck_lymphnode_main__${instId}`, isLN: true, lokace: lokaceLN });
                if (f) {
                    concMain.push(f.conc);
                    /* Uzliny krku → Měkké tkáně */
                    pendingLn.push({ report: f.report, organKeys: ['soft'] });
                }
            });

            const { hasLesFindings, hasLnFindings } = emitLesionAndLymphSections({
                reportOut, pendingLes, pendingLn, toOrgans, isPET,
                lesionTable: 'neck_lesion_main', lymphTable: 'neck_lymphnode_main',
                highAct, badEtio
            });

            /* Siny: lokalita se píše jednou, varianty nálezu i text do závěru se z ní skládají. */
            const SINY_LOK = [
                { id: 'sinus_front_r', lok: 've frontálním sinu vpravo' },
                { id: 'sinus_front_l', lok: 've frontálním sinu vlevo' },
                { id: 'sinus_ethmo_r', lok: 'v ethmoidálním sinu vpravo' },
                { id: 'sinus_ethmo_l', lok: 'v ethmoidálním sinu vlevo' },
                { id: 'sinus_sfeno_r', lok: 've sfenoidálním sinu vpravo' },
                { id: 'sinus_sfeno_l', lok: 've sfenoidálním sinu vlevo' },
                { id: 'sinus_maxil_r', lok: 'v maxilárním sinu vpravo' },
                { id: 'sinus_maxil_l', lok: 'v maxilárním sinu vlevo' }
            ];
            const sinyItems = SINY_LOK.map(({ id, lok }) => ({
                id, text: lok,
                1: `cysta/polyp ${lok}`,
                2: `hyperplázie sliznic ${lok}`,
                3: `výrazná hyperplázie sliznic ${lok}`,
                4: `tekutina ${lok}`
            }));

            const sinyNormalLvl = ctx.normalLevel('neck_sinus_add_normal');
            const sinyConcParts = [
                ctx.mapConditions([
                    { states: [3], prefix: 'Chronická sinusitis (', suffix: ').', separator: ', ', items: sinyItems },
                    { states: [4], prefix: 'Akutní sinusitis (', suffix: ').', separator: ', ', items: sinyItems }
                ]).trim(),
                ctx.field('sinus_custom_conc')
            ].filter(Boolean);

            emitOrgan('sinus', {
                label: 'Siny', tableId: 'neck_sinus_main', desc: 'sinus_custom_desc',
                normal: 'neck_sinus_add_normal', normalText: OP.sinus.findings,
                normalConc: OP.sinus.conclusion,
                predef: 'neck_sinus_add_predef', predefText: OP.sinus.findings,
                incidental: [sinyConcParts.join('\n')],
                parts: [ctx.mapStates({ items: sinyItems })]
            });

            const salConcParts = [
                ctx.mapStates({
                    suffix: '',
                    items: [
                        { id: 'par_nod_RF_r', 1: 'Parotida vpravo s akumulujícím nodulem, pravděpodobně Warthinův tumor.', 2: 'Parotida vpravo s akumulujícími noduly, pravděpodobně Warthinův tumor.' },
                        { id: 'par_nod_RF_l', 1: 'Parotida vlevo s akumulujícím nodulem, pravděpodobně Warthinův tumor.', 2: 'Parotida vlevo s akumulujícími noduly, pravděpodobně Warthinův tumor.' },
                        { id: 'sub_nod_RF_r', 1: 'Submandibulární žláza vpravo s akumulujícím nodulem, pravděpodobně Warthinův tumor.', 2: 'Submandibulární žláza vpravo s akumulujícími noduly, pravděpodobně Warthinův tumor.' },
                        { id: 'sub_nod_RF_l', 1: 'Submandibulární žláza vlevo s akumulujícím nodulem, pravděpodobně Warthinův tumor.', 2: 'Submandibulární žláza vlevo s akumulujícími noduly, pravděpodobně Warthinův tumor.' }
                    ]
                }).trim(),
                ctx.field('salivary_custom_conc')
            ].filter(Boolean);

            emitOrgan('salivary', {
                label: 'Slinné žlázy', tableId: 'neck_salivary_main', desc: 'salivary_custom_desc',
                normal: 'neck_salivary_add_normal',
                normalText: OP.salivary.findings,
                normalConc: OP.salivary.conclusion,
                predef: 'neck_salivary_add_predef',
                predefText: OP.salivary.findings,
                incidental: [salConcParts.join('\n')],
                parts: [ctx.mapStates({
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
                })]
            });

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

            let hlasR = ctx.isActive('far_hlas_r'), hlasL = ctx.isActive('far_hlas_l');
            if (hlasR && hlasL) {
                farRep.push('asymetrie akumulace RF v hlasivkách bilat.');
                concInc.push({ type: 'frame', text: 'Paréza hlasivek bilat.', tableId: 'neck_pharynx_main' });
            } else if (hlasR || hlasL) {
                let side = hlasR ? 'vpravo' : 'vlevo';
                farRep.push(`asymetrie akumulace RF v hlasivkách ${side}`);
                concInc.push({ type: 'frame', text: `Paréza hlasivky ${side}.`, tableId: 'neck_pharynx_main' });
            }

            let farDesc = ctx.field('pharynx_custom_desc');
            if (farDesc) farRep.push(farDesc);

            emitOrgan('pharynx', {
                label: 'Hltan/hrtan', tableId: 'neck_pharynx_main', parts: farRep,
                normal: 'neck_pharynx_add_normal',
                normalText: OP.pharynx.findings,
                normalConc: OP.pharynx.conclusion,
                predef: 'neck_pharynx_add_predef',
                predefText: OP.pharynx.findings,
                concField: 'pharynx_custom_conc'
            });

            let thyroidParts = [];
            if (ctx.isActive('thyr_enl')) thyroidParts.push('štítná žláza je difuzně zvětšená');
            if (ctx.isActive('thyr_rf'))  thyroidParts.push('štítná žláza s difuzně zvýšenou akumulací RF');

            const thyrResR = ctx.isActive('thyr_res_r');
            const thyrResL = ctx.isActive('thyr_res_l');
            if (thyrResR && thyrResL) thyroidParts.push('chybí po TTE');
            else if (thyrResR) thyroidParts.push('chybí pravý lalok po resekci');
            else if (thyrResL) thyroidParts.push('chybí levý lalok po resekci');

            const thyrConcParts = [
                ctx.isActive('thyr_enl') && 'Nespecifická struma.',
                ctx.isActive('thyr_rf') && 'Difuzně zvýšená akumulace RF štítnice v rámci nespecifické thyreopatie.',
                ctx.mapStates({
                    suffix: '',
                    items: [
                        { id: 'thyr_nod_rf_r', 1: 'Štítná žláza vpravo s akumulujícím nodulem.', 2: 'Štítná žláza vpravo s akumulujícími noduly.' },
                        { id: 'thyr_nod_rf_l', 1: 'Štítná žláza vlevo s akumulujícím nodulem.', 2: 'Štítná žláza vlevo s akumulujícími noduly.' }
                    ]
                }).trim(),
                ctx.field('thyroid_custom_conc')
            ].filter(Boolean);

            emitOrgan('thyroid', {
                label: 'Thyroidea', tableId: 'neck_thyroid_main', desc: 'thyroid_custom_desc',
                normal: 'neck_thyroid_add_normal',
                normalText: OP.thyroid.findings,
                normalConc: OP.thyroid.conclusion,
                predef: 'neck_thyroid_add_predef',
                predefText: OP.thyroid.findings,
                incidental: [thyrConcParts.join('\n')],
                parts: [...thyroidParts, ctx.mapStates({
                    items: [
                        { id: 'thyr_nod_r', 1: 'nespecifický drobný nodul vpravo', 2: 'nespecifické drobné noduly vpravo' },
                        { id: 'thyr_nod_l', 1: 'nespecifický drobný nodul vlevo', 2: 'nespecifické drobné noduly vlevo' },
                        { id: 'thyr_nod_rf_r', 1: 'RF aktivní nodul vpravo', 2: 'RF aktivní noduly vpravo' },
                        { id: 'thyr_nod_rf_l', 1: 'RF aktivní nodul vlevo', 2: 'RF aktivní noduly vlevo' },
                        { id: 'thyr_cys_r', 1: 'cysta vpravo', 2: 'cysty vpravo' },
                        { id: 'thyr_cys_l', 1: 'cysta vlevo', 2: 'cysty vlevo' }
                    ]
                })]
            });

            // --- Měkké tkáně krku (vlastní nálezy) ---
            emitOrgan('soft', {
                label: 'Měkké tkáně', tableId: 'neck_soft_main', desc: 'neck_soft_custom_desc',
                normal: 'neck_soft_add_normal', normalText: OP.soft.findings,
                normalConc: OP.soft.conclusion,
                predef: 'neck_soft_add_predef', predefText: OP.soft.findings,
                concField: 'neck_soft_custom_conc'
            });

            const orphanLes = toOrgans
                ? placeLesionsToOrgans(organBag, reportOut, pendingLes, pendingLn).lesionOrphan
                : false;

            flush({
                groups: RegionNeck.virtualGroups,
                organOrder: RegionNeck.organOrder,
                expandMode,
                hasExtraPath: toOrgans ? orphanLes : (hasLesFindings || hasLnFindings)
            });

            useSection(ctx.section({
                tableId: 'neck_ostatni_main', desc: 'neck_ostatni_custom_desc', capitalize: true,
                normal: 'neck_ostatni_add_normal', normalText: RegionNeck_PREDEFS.ostatni.findings,
                normalConc: RegionNeck_PREDEFS.ostatni.conclusion,
                predef: 'neck_ostatni_add_predef', predefText: RegionNeck_PREDEFS.ostatni.findings,
                concField: 'neck_ostatni_custom_conc'
            }), { report: reportOut, main: concMain, incidental: concInc });

            return { 
                report: reportOut, 
                conclusion: { main: concMain, incidental: concInc } 
            };
        }
    }