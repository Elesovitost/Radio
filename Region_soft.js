const RegionSoft = {
    title: 'Měkké tkáně',

    layout: (helpers) => {
        let layoutNodes = [];

        const lesInsts = Store.instances?.['soft_lesion_main'] || [];
        lesInsts.forEach((instId, idx) => {
            const p = `l_${instId}`;

            const locTab = helpers.Table3colRCL(`${p}_loc_r4`, [
                [ { btn: `${p}_p_hlava_r`, states: ['0', '+'] }, 'Hlava', { btn: `${p}_p_hlava_l`, states: ['0', '+'] } ],
                [ { btn: `${p}_p_krk_r`, states: ['0', '+'] }, 'Krk', { btn: `${p}_p_krk_l`, states: ['0', '+'] } ],
                [ { btn: `${p}_p_hkk_r`, states: ['0', '+'] }, 'HK', { btn: `${p}_p_hkk_l`, states: ['0', '+'] } ],
                [ { btn: `${p}_p_hrud_r`, states: ['0', '+'] }, 'Hrudník', { btn: `${p}_p_hrud_l`, states: ['0', '+'] } ],
                [ { btn: `${p}_p_bris_r`, states: ['0', '+'] }, 'Břicho', { btn: `${p}_p_bris_l`, states: ['0', '+'] } ],
                [ { btn: `${p}_p_pan_r`, states: ['0', '+'] }, 'Pánev', { btn: `${p}_p_pan_l`, states: ['0', '+'] } ],
                [ { btn: `${p}_p_dkk_r`, states: ['0', '+'] }, 'DK', { btn: `${p}_p_dkk_l`, states: ['0', '+'] } ]
            ]);

            const vztahTab = helpers.Table1col(`${p}_vztah`, [
                { btn: `${p}_v_intra`, type: 'basic', text: 'intramuskulárně' },
                { btn: `${p}_v_inter`, type: 'basic', text: 'intermuskulárně' },
                { btn: `${p}_v_subk`, type: 'basic', text: 'subkutánně' },
                { btn: `${p}_v_fasc`, type: 'basic', text: 'podél fascie' }
            ]);

            const locPair = el('div', { className: 'row' }, [locTab, vztahTab]);
            locPair.style.alignItems = 'flex-start';
            locPair.style.gap = '8px';

            const locBox = el('div', { className: 'table-wrapper' }, [
                el('div', { className: 'sub-table-title', textContent: 'Lokalizace' }),
                locPair
            ]);
            locBox.style.width = '100%';
            locBox.style.alignItems = 'center';

            layoutNodes.push(
                helpers.LesionMain(`soft_lesion_main__${instId}`, `Léze měkkých tkání (${idx + 1})`, [
                    helpers.Table1col(`${p}_r1_excl`, [ [ 'Počet:', { btn: `${p}_c_soli`, type: 'basic', text: 'solitární' }, { btn: `${p}_c_dve`, type: 'basic', text: 'dvě' }, { btn: `${p}_c_vice`, type: 'basic', text: 'vícečetné' }, { btn: `${p}_c_mnoho`, type: 'basic', text: 'mnohočetné' } ] ]),
                    helpers.Table1col(`${p}_r2_excl`, [ [ 'Druh:',
                        { btn: `${p}_k_les`, states: ['0', 'ložisko', 'nodul', 'fokus'] },
                        { btn: `${p}_k_exp`, type: 'basic', text: 'expanze' },
                        { btn: `${p}_k_inf`, type: 'basic', text: 'infiltrace' },
                        { btn: `${p}_k_cys`, type: 'basic', text: 'cysta' },
                        { btn: `${p}_k_kol`, type: 'basic', text: 'kolekce' },
                        { btn: `${p}_k_cust`, states: ['vlastní', 'custom'] }
                    ] ]),
                    locBox,
                    ...LESIONS_DEFINITION.getLesionRowsPost(helpers, p, `${p}_met`, `${p}_e`)
                ])
            );
        });

        layoutNodes.push(
            helpers.TableMain('soft_tissue_main', 'Svaly a měkké tkáně', [
                helpers.Table3colRCL('st_table', [
                    [ '', { btn: 'st_fat', type: 'basic', text: 'RF+ tuk' }, '' ],
                    [ '', { btn: 'st_dif', type: 'basic', text: 'RF+ difuzně' }, '' ],
                    [ { btn: 'st_parav_r', states: ['0', '+'] }, 'Paravazace', { btn: 'st_parav_l', states: ['0', '+'] } ]
                ]),
                helpers.Table1col('st_add', [
                    { field: 'text', id: 'st_custom_desc', placeholder: 'vlastní popis...' },
                    { field: 'text', id: 'st_custom_conc', placeholder: 'vlastní závěr...' }
                ])
            ])
        );

        return layoutNodes;
    },

    compile: (ctx) => {
        let reportOut = [];
        let concMain = [];
        let concInc = [];

        const examId = ctx.examId || 'default';
        const cap = (s) => s && s[0].toUpperCase() + s.slice(1);
        const formatList = formatCzechList;

        // --- LÉZE MĚKKÝCH TKÁNÍ (jen zadané; bez automatického negativního textu) ---
        const lesInsts = Store.instances?.['soft_lesion_main'] || [];
        lesInsts.forEach(instId => {
            const p = `l_${instId}`;
            let lokace = [];

            const addBilat = (id, sR, sL, sB) => {
                const r = ctx.isActive(`${p}_p_${id}_r`), l = ctx.isActive(`${p}_p_${id}_l`);
                if (r && l) lokace.push(sB);
                else if (r) lokace.push(sR);
                else if (l) lokace.push(sL);
            };

            addBilat('hlava', 'na hlavě vpravo', 'na hlavě vlevo', 'na hlavě bilat.');
            addBilat('krk', 'na krku vpravo', 'na krku vlevo', 'na krku bilat.');
            addBilat('hkk', 'v měkkých tkáních HK vpravo', 'v měkkých tkáních HK vlevo', 'v měkkých tkáních HK bilat.');
            addBilat('hrud', 'v hrudní stěně vpravo', 'v hrudní stěně vlevo', 'v hrudní stěně bilat.');
            addBilat('bris', 'v břišní stěně vpravo', 'v břišní stěně vlevo', 'v břišní stěně bilat.');
            addBilat('pan', 'v pánevní stěně vpravo', 'v pánevní stěně vlevo', 'v pánevní stěně bilat.');
            addBilat('dkk', 'v měkkých tkáních DK vpravo', 'v měkkých tkáních DK vlevo', 'v měkkých tkáních DK bilat.');

            let vztah = [];
            if (ctx.isActive(`${p}_v_intra`)) vztah.push('intramuskulárně');
            if (ctx.isActive(`${p}_v_inter`)) vztah.push('intermuskulárně');
            if (ctx.isActive(`${p}_v_subk`)) vztah.push('subkutánně');
            if (ctx.isActive(`${p}_v_fasc`)) vztah.push('podél fascie');

            let lokText = lokace.length > 0 ? formatList(lokace) : '';
            let vztahStr = vztah.length > 0 ? `, ${formatList(vztah)}` : '';
            let d = LESIONS_DEFINITION.parseDetails(ctx, examId, 'soft', p, `${p}_met`, `${p}_e`, false);

            if (d.hasAny || lokace.length > 0 || vztah.length > 0) {
                let repSentence = `${d.baseText} ${lokText}${vztahStr}${d.doplneniStr}${d.vzhledText}${d.metrikyStr}.`.replace(/\s+/g, ' ').replace(' .', '.').trim();
                reportOut.push({ type: 'frame', text: repSentence, tableId: `soft_lesion_main__${instId}` });

                let concSentence = `${d.baseText} ${lokText}${vztahStr}${d.doplneniStr}${d.actStr}${d.dynStr}`;
                if (d.etioStr) concSentence += `: ${d.etioStr}.`;
                else concSentence += `.`;

                concSentence = concSentence.replace(/\s+/g, ' ').replace(' : ', ': ').replace(' .', '.').trim();
                concMain.push({ type: 'frame', text: concSentence, tableId: `soft_lesion_main__${instId}` });
            }
        });

        // --- SVALY A MĚKKÉ TKÁNĚ (obecné) ---
        let stDesc = ctx.field('st_custom_desc');
        if (stDesc) reportOut.push({ type: 'frame', text: cap(stDesc), tableId: 'soft_tissue_main' });

        let stConc = ctx.field('st_custom_conc');
        if (stConc) concInc.push({ type: 'frame', text: stConc, tableId: 'soft_tissue_main' });

        if (reportOut.length > 0) {
            reportOut.unshift({ type: 'heading', text: 'Měkké tkáně:', action: 'open-region', regionId: 'soft' });
        }

        return { report: reportOut, conclusion: { main: concMain, incidental: concInc } };
    }
};
