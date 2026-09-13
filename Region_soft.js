const RegionSoft = {
    title: 'Měkké tkáně',

    layout: (helpers) => {
        let layoutNodes = [];

        const lesInsts = Store.instances?.['soft_lesion_main'] || [];
        lesInsts.forEach((instId, idx) => {
            const p = `l_${instId}`;
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
                    helpers.Table1col(`${p}_r3_vztah`, [ [ 'Vztah:',
                        { btn: `${p}_v_intra`, type: 'basic', text: 'intramuskulárně' },
                        { btn: `${p}_v_inter`, type: 'basic', text: 'intermuskulárně' },
                        { btn: `${p}_v_subk`, type: 'basic', text: 'subkutánně' },
                        { btn: `${p}_v_fasc`, type: 'basic', text: 'podél fascie' }
                    ] ]),
                    helpers.Table3colRCL(`${p}_loc_r4`, 'Lokalizace', [
                        [ { btn: `${p}_p_krk_r`, type: 'basic', text: 'Krk' }, '', { btn: `${p}_p_krk_l`, type: 'basic', text: 'Krk' } ],
                        [ { btn: `${p}_p_hrud_r`, type: 'basic', text: 'Hrudní stěna' }, '', { btn: `${p}_p_hrud_l`, type: 'basic', text: 'Hrudní stěna' } ],
                        [ { btn: `${p}_p_bris_r`, type: 'basic', text: 'Břišní stěna' }, '', { btn: `${p}_p_bris_l`, type: 'basic', text: 'Břišní stěna' } ],
                        [ '', { btn: `${p}_p_retro`, type: 'basic', text: 'Retroperitoneum' }, '' ],
                        [ { btn: `${p}_p_para_r`, type: 'basic', text: 'Paravertebr.' }, '', { btn: `${p}_p_para_l`, type: 'basic', text: 'Paravertebr.' } ],
                        [ { btn: `${p}_p_pan_r`, type: 'basic', text: 'Pánev/gluteál.' }, '', { btn: `${p}_p_pan_l`, type: 'basic', text: 'Pánev/gluteál.' } ],
                        [ { btn: `${p}_p_hkk_r`, type: 'basic', text: 'Horní končetina' }, '', { btn: `${p}_p_hkk_l`, type: 'basic', text: 'Horní končetina' } ],
                        [ { btn: `${p}_p_dkk_r`, type: 'basic', text: 'Dolní končetina' }, '', { btn: `${p}_p_dkk_l`, type: 'basic', text: 'Dolní končetina' } ]
                    ]),
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
        let reportOut = [{ type: 'heading', text: 'Měkké tkáně:', action: 'open-region', regionId: 'soft' }];
        let concMain = [];
        let concInc = [];

        const examId = ctx.examId || 'default';
        const cap = (s) => s && s[0].toUpperCase() + s.slice(1);
        const formatList = formatCzechList;
        const isPET = (examId || '').toLowerCase().includes('pet');

        // --- LÉZE MĚKKÝCH TKÁNÍ ---
        const lesInsts = Store.instances?.['soft_lesion_main'] || [];
        let highAct = false, badEtio = false;
        lesInsts.forEach(id => {
            if (['intermediární', 'zvýšená', 'vysoká'].includes(ctx.text(`l_${id}_met_act`, true))) highAct = true;
            if (!ctx.isActive(`l_${id}_e_b`) && !ctx.isActive(`l_${id}_e_inf`)) badEtio = true;
        });

        if (lesInsts.length === 0 || (lesInsts.length > 0 && isPET && !highAct)) {
            reportOut.push({ type: 'frame', text: isPET ? 'Bez patrných hyperakumulujících ložiskových změn v měkkých tkáních.' : 'Bez patrných ložiskových změn v měkkých tkáních.', tableId: 'soft_lesion_main', dimmed: true });
        }

        lesInsts.forEach(instId => {
            const p = `l_${instId}`;
            let lokace = [];

            const addBilat = (id, sR, sL, sB) => {
                const r = ctx.isActive(`${p}_p_${id}_r`), l = ctx.isActive(`${p}_p_${id}_l`);
                if (r && l) lokace.push(sB);
                else if (r) lokace.push(sR);
                else if (l) lokace.push(sL);
            };

            addBilat('krk', 'vpravo v krku', 'vlevo v krku', 'v krku bilat.');
            addBilat('hrud', 'v pravé hrudní stěně', 'v levé hrudní stěně', 'v hrudní stěně bilat.');
            addBilat('bris', 'v pravé břišní stěně', 'v levé břišní stěně', 'v břišní stěně bilat.');
            if (ctx.isActive(`${p}_p_retro`)) lokace.push('v retroperitoneu');
            addBilat('para', 'paravertebrálně vpravo', 'paravertebrálně vlevo', 'paravertebrálně bilat.');
            addBilat('pan', 'v pravé gluteální oblasti', 'v levé gluteální oblasti', 'v gluteální oblasti bilat.');
            addBilat('hkk', 'vpravo na horní končetině', 'vlevo na horní končetině', 'na horních končetinách bilat.');
            addBilat('dkk', 'vpravo na dolní končetině', 'vlevo na dolní končetině', 'na dolních končetinách bilat.');

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

        if (lesInsts.length > 0 && (!isPET || highAct) && !badEtio) {
            reportOut.push({ type: 'frame', text: 'Jinak bez patrných ložiskových změn v měkkých tkáních.', tableId: 'soft_lesion_main', dimmed: true });
        }

        // --- SVALY A MĚKKÉ TKÁNĚ (obecné) ---
        let stDesc = ctx.field('st_custom_desc');
        if (stDesc) reportOut.push({ type: 'frame', text: cap(stDesc), tableId: 'soft_tissue_main' });

        let stConc = ctx.field('st_custom_conc');
        if (stConc) concInc.push({ type: 'frame', text: stConc, tableId: 'soft_tissue_main' });

        return { report: reportOut, conclusion: { main: concMain, incidental: concInc } };
    }
};
