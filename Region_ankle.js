const RegionAnkle = {
    title: 'MR Hlezna',
    reportLayout: 'block',
    layout: (helpers) => {
        return [
            // --- KLOUBNÍ DUTINA ---
            helpers.TableMain('ankle_joint_main', 'Kloubní dutina', [
                helpers.Table2colNormal('ank_jt_table', '', [
                    [ 'Tekutina (TC):', { btn: 'ank_jt_fluid', states: ['0', 'mírná', 'střední', 'výrazná'] } ],
                    [ 'Synovitida:', { btn: 'ank_jt_synov', states: ['0', '+', '++'] } ],
                    [ 'Volná tělíska:', { btn: 'ank_jt_loose', states: ['0', 'přítomna'] } ]
                ]),
                helpers.Table1col('ankle_joint_add', [
                    { field: 'text', id: 'ank_jt_desc', placeholder: 'vlastní popis...' },
                    { field: 'text', id: 'ank_jt_conc', placeholder: 'vlastní závěr...' }
                ])
            ]),

            // --- SKELET ---
            helpers.TableMain('ankle_bones_main', 'Skelet', [
                helpers.Table2colNormal('ank_bn_tc', '', [
                    [ 'TC chrupavky:', { btn: 'ank_tc_chr', states: ['0', 'Gr. 1', 'Gr. 2', 'Gr. 3', 'Gr. 4'] } ],
                    [ 'TC artróza:', { btn: 'ank_tc_art', states: ['0', 'mírná', 'střední', 'pokročilá'] } ]
                ]),
                helpers.Table2colNormal('ank_bn_talus', 'Talus', [
                    [ 'OCL (OCD):', { btn: 'ank_tal_ocd', states: ['0', 'st. I', 'st. II', 'st. III', 'st. IV'] }, { btn: 'ank_tal_loc', states: ['lokalizace...', 'mediálně', 'centrálně', 'laterálně'] } ],
                    [ 'Fraktura:', { btn: 'ank_tal_frac', states: ['0', 'intraart.', 'nedislok.', 'dislok.'] }, { field: 'text', id: 'ank_tal_frac_ext', placeholder: 'doplnění...' } ],
                    [ 'Edém dřeně:', { btn: 'ank_tal_edema', states: ['0', '+', '++'] } ]
                ]),
                helpers.Table2colNormal('ank_bn_navic', 'Naviculare', [
                    [ 'Fraktura:', { btn: 'ank_nav_frac', states: ['0', 'intraart.', 'nedislok.', 'dislok.'] }, { field: 'text', id: 'ank_nav_frac_ext', placeholder: 'doplnění...' } ],
                    [ 'Edém dřeně:', { btn: 'ank_nav_edema', states: ['0', '+', '++'] } ]
                ]),
                helpers.Table2colNormal('ank_bn_calc', 'Kalkaneus', [
                    [ 'Fraktura:', { btn: 'ank_calc_frac', states: ['0', 'intraart.', 'nedislok.', 'dislok.'] }, { field: 'text', id: 'ank_calc_frac_ext', placeholder: 'doplnění...' } ],
                    [ 'Edém dřeně:', { btn: 'ank_calc_edema', states: ['0', '+', '++'] } ],
                    [ 'Haglund:', { btn: 'ank_calc_haglund', states: ['0', '+'] } ],
                    [ 'Plant. calcar:', { btn: 'ank_calc_calcar', states: ['0', '+'] } ]
                ]),
                helpers.Table2colNormal('ank_bn_cub', 'Kuboid', [
                    [ 'Fraktura:', { btn: 'ank_cub_frac', states: ['0', 'intraart.', 'nedislok.', 'dislok.'] }, { field: 'text', id: 'ank_cub_frac_ext', placeholder: 'doplnění...' } ],
                    [ 'Edém dřeně:', { btn: 'ank_cub_edema', states: ['0', '+', '++'] } ]
                ]),
                helpers.Table1col('ankle_bones_add', [
                    { field: 'text', id: 'ank_bones_desc', placeholder: 'vlastní popis...' },
                    { field: 'text', id: 'ank_bones_conc', placeholder: 'vlastní závěr...' }
                ])
            ]),

            // --- MEDIÁLNÍ KOMPARTMENT - VAZY ---
            helpers.TableMain('ankle_med_lig_main', 'Mediální vazy (Deltoideum)', [
                helpers.Table2colNormal('ank_ml_table', '', [
                    [ 'Povrchová porce:', { btn: 'ank_ml_sup', states: ['0', 'distenze (I)', 'parc. léze (II)', 'kompletní (III)'] } ],
                    [ 'Hluboká porce:', { btn: 'ank_ml_deep', states: ['0', 'distenze (I)', 'parc. léze (II)', 'kompletní (III)'] } ]
                ]),
                helpers.Table1col('ankle_med_lig_add', [
                    { field: 'text', id: 'ank_ml_desc', placeholder: 'vlastní popis...' },
                    { field: 'text', id: 'ank_ml_conc', placeholder: 'vlastní závěr...' }
                ])
            ]),

            // --- MEDIÁLNÍ KOMPARTMENT - ŠLACHY ---
            helpers.TableMain('ankle_med_tendon_main', 'Mediální šlachy (Flexory)', [
                helpers.Table2colNormal('ank_mt_table', '', [
                    [ 'Tibialis post. (TP):', { btn: 'ank_mt_tp', states: ['0', 'tenosynovitida', 'tendinóza', 'parc. ruptura', 'kompletní'] } ],
                    [ 'Flex. dig. long. (FDL):', { btn: 'ank_mt_fdl', states: ['0', 'tenosynovitida', 'tendinóza', 'parc. ruptura', 'kompletní'] } ],
                    [ 'Flex. hal. long. (FHL):', { btn: 'ank_mt_fhl', states: ['0', 'tenosynovitida', 'tendinóza', 'parc. ruptura', 'kompletní'] } ]
                ]),
                helpers.Table1col('ankle_med_tendon_add', [
                    { field: 'text', id: 'ank_mt_desc', placeholder: 'vlastní popis...' },
                    { field: 'text', id: 'ank_mt_conc', placeholder: 'vlastní závěr...' }
                ])
            ]),

            // --- LATERÁLNÍ KOMPARTMENT - VAZY ---
            helpers.TableMain('ankle_lat_lig_main', 'Laterální vazy a Syndesmóza', [
                helpers.Table2colNormal('ank_ll_table', '', [
                    [ 'LFTA (ATFL):', { btn: 'ank_ll_atfl', states: ['0', 'distenze (I)', 'parc. léze (II)', 'kompletní (III)'] } ],
                    [ 'LFC (CFL):', { btn: 'ank_ll_cfl', states: ['0', 'distenze (I)', 'parc. léze (II)', 'kompletní (III)'] } ],
                    [ 'LFTP (PTFL):', { btn: 'ank_ll_ptfl', states: ['0', 'distenze (I)', 'parc. léze (II)', 'kompletní (III)'] } ],
                    [ 'AITFL (Syndesmóza):', { btn: 'ank_ll_aitfl', states: ['0', 'distenze', 'parc. léze', 'kompletní'] } ]
                ]),
                helpers.Table1col('ankle_lat_lig_add', [
                    { field: 'text', id: 'ank_ll_desc', placeholder: 'vlastní popis...' },
                    { field: 'text', id: 'ank_ll_conc', placeholder: 'vlastní závěr...' }
                ])
            ]),

            // --- LATERÁLNÍ KOMPARTMENT - ŠLACHY ---
            helpers.TableMain('ankle_lat_tendon_main', 'Laterální šlachy (Peronei)', [
                helpers.Table2colNormal('ank_lt_table', '', [
                    [ 'Peroneus long. (PL):', { btn: 'ank_lt_pl', states: ['0', 'tenosynovitida', 'tendinóza', 'parc. ruptura', 'kompletní'] } ],
                    [ 'Peroneus brevis (PB):', { btn: 'ank_lt_pb', states: ['0', 'tenosynovitida', 'tendinóza', 'parc. ruptura', 'kompletní'] } ],
                    [ 'Retinakulum:', { btn: 'ank_lt_ret', states: ['0', 'edém/léze', 'luxace šlach'] } ]
                ]),
                helpers.Table1col('ankle_lat_tendon_add', [
                    { field: 'text', id: 'ank_lt_desc', placeholder: 'vlastní popis...' },
                    { field: 'text', id: 'ank_lt_conc', placeholder: 'vlastní závěr...' }
                ])
            ]),

            // --- PŘEDNÍ KOMPARTMENT - ŠLACHY ---
            helpers.TableMain('ankle_ant_tendon_main', 'Přední šlachy (Extenzory)', [
                helpers.Table2colNormal('ank_at_table', '', [
                    [ 'Tibialis ant. (TA):', { btn: 'ank_at_ta', states: ['0', 'tenosynovitida', 'tendinóza', 'parc. ruptura', 'kompletní'] } ],
                    [ 'Ext. hal. long. (EHL):', { btn: 'ank_at_ehl', states: ['0', 'tenosynovitida', 'tendinóza', 'parc. ruptura', 'kompletní'] } ],
                    [ 'Ext. dig. long. (EDL):', { btn: 'ank_at_edl', states: ['0', 'tenosynovitida', 'tendinóza', 'parc. ruptura', 'kompletní'] } ]
                ]),
                helpers.Table1col('ankle_ant_tendon_add', [
                    { field: 'text', id: 'ank_at_desc', placeholder: 'vlastní popis...' },
                    { field: 'text', id: 'ank_at_conc', placeholder: 'vlastní závěr...' }
                ])
            ]),

            // --- ACHILLOVA ŠLACHA ---
            helpers.TableMain('ankle_achilles_main', 'Achillova šlacha', [
                helpers.Table2colNormal('ank_ach_table', '', [
                    [ 'Stav šlachy:', { btn: 'ank_ach_stav', states: ['0', 'tendinóza', 'intratend. rpt', 'parc. ruptura', 'kompletní'] } ],
                    [ 'Peritendinitida:', { btn: 'ank_ach_peri', states: ['0', '+'] } ],
                    [ 'Bursitida:', { btn: 'ank_ach_bur', states: ['0', 'retrokalcaneární', 'subkutánní', 'obě'] } ]
                ]),
                helpers.Table1col('ankle_achilles_add', [
                    { field: 'text', id: 'ank_ach_desc', placeholder: 'vlastní popis...' },
                    { field: 'text', id: 'ank_ach_conc', placeholder: 'vlastní závěr...' }
                ])
            ]),

            // --- ZADNÍ KOMPARTMENT - OSTATNÍ ---
            helpers.TableMain('ankle_post_other_main', 'Zadní kompartment - Ostatní', [
                helpers.Table2colNormal('ank_pto_table', '', [
                    [ 'Plantární fascie:', { btn: 'ank_pto_pf', states: ['0', 'fasciitida', 'parc. ruptura', 'fibromatóza'] } ],
                    [ 'Zadní impingement:', { btn: 'ank_pto_imp', states: ['0', 'symptom. os trigonum', 'symptom. proc. Stieda'] } ]
                ]),
                helpers.Table1col('ankle_post_other_add', [
                    { field: 'text', id: 'ank_pto_desc', placeholder: 'vlastní popis...' },
                    { field: 'text', id: 'ank_pto_conc', placeholder: 'vlastní závěr...' }
                ])
            ])
        ];
    },

    compile: (ctx) => {
        let reportOut = [{ type: 'heading', text: 'Hlezno:', action: 'open-region', regionId: 'ankle' }];
        let concMain = [];
        let concInc = [];
        // Pomocné funkce pro parsování textů
        const parseTendon = (id, name) => {
            const val = ctx.text(id);
            if (!val || val === '0') return null;
            if (val === 'tenosynovitida') return { rep: `šlacha ${name} s peritendinózní tekutinou (tenosynovitida)`, conc: `Tenosynovitida ${name}` };
            if (val === 'tendinóza') return { rep: `šlacha ${name} je ztluštělá se zvýšeným signálem (tendinóza)`, conc: `Tendinóza ${name}` };
            if (val === 'parc. ruptura') return { rep: `šlacha ${name} s parciální rupturou a rozvlákněním`, conc: `Parciální ruptura ${name}` };
            if (val === 'kompletní') return { rep: `kompletní ruptura šlachy ${name} s přerušením kontinuity`, conc: `Kompletní ruptura ${name}` };
            return null;
        };

        const parseLigament = (id, name) => {
            const val = ctx.text(id);
            if (!val || val === '0') return null;
            if (val.includes('(I)')) return { rep: `${name} vykazuje distenzi a edém (gr. I)`, conc: `Distenze ${name}` };
            if (val.includes('(II)') || val.includes('parc. léze')) return { rep: `${name} je ztluštělé s parciálním přerušením vláken (gr. II)`, conc: `Parciální léze ${name}` };
            if (val.includes('(III)') || val.includes('kompletní')) return { rep: `kompletní ruptura ${name} s diskontinuitou`, conc: `Kompletní ruptura ${name}` };
            return null;
        };

        // --- 1. KLOUBNÍ DUTINA ---
        const jtFluid = ctx.text('ank_jt_fluid');
        const jtSynov = ctx.text('ank_jt_synov');
        const jtLoose = ctx.text('ank_jt_loose');
        const jtDesc = ctx.field('ank_jt_desc');
        const jtConc = ctx.field('ank_jt_conc');

        let isJtNormal = (!jtFluid || jtFluid === '0') && (!jtSynov || jtSynov === '0') && (!jtLoose || jtLoose === '0') && !jtDesc;
        
        if (isJtNormal) {
            reportOut.push({ type: 'frame', text: 'Kloubní dutina bez zvýšené tekutiny.', tableId: 'ankle_joint_main', dimmed: true });
        } else {
            let parts = [];
            if (jtFluid && jtFluid !== '0') {
                parts.push(`${jtFluid} zmnožení tekutiny v hlezenním kloubu`);
                if (jtFluid !== 'mírná') concInc.push({ type: 'frame', text: `${capitalize(jtFluid)} efuze hlezenního kloubu.`, tableId: 'ankle_joint_main' });
            }
            if (jtSynov && jtSynov !== '0') {
                parts.push(jtSynov === '+' ? 'mírná hypertrofie synovie' : 'výrazná synovitida');
                if (jtSynov === '++') concMain.push({ type: 'frame', text: 'Synovitida hlezenního kloubu.', tableId: 'ankle_joint_main' });
            }
            if (jtLoose === 'přítomna') {
                parts.push('přítomna volná nitrokloubní tělíska');
                concMain.push({ type: 'frame', text: 'Volná intraartikulární tělíska v hleznu.', tableId: 'ankle_joint_main' });
            }
            if (jtDesc) parts.push(jtDesc);
            
            reportOut.push({ type: 'frame', text: 'Kloubní dutina: ' + capitalize(parts.join(', ')) + '.', tableId: 'ankle_joint_main' });
        }
        if (jtConc) concMain.push({ type: 'frame', text: capitalize(jtConc) + (jtConc.endsWith('.') ? '' : '.'), tableId: 'ankle_joint_main' });


        // --- 2. SKELET ---
        let bnParts = [];
        
        // TC kloub
        const tcChr = ctx.text('ank_tc_chr');
        const tcArt = ctx.text('ank_tc_art');
        if (tcChr && tcChr !== '0') {
            bnParts.push(`chrupavky talokrurálního skloubení s chondropatií ${tcChr.replace('Gr. ', 'stupně ')}`);
            concInc.push({ type: 'frame', text: `Chondropatie TC kloubu (${tcChr}).`, tableId: 'ankle_bones_main' });
        }
        if (tcArt && tcArt !== '0') {
            bnParts.push(`${tcArt} osteoartróza TC kloubu`);
            concInc.push({ type: 'frame', text: `Osteoartróza TC kloubu (${tcArt}).`, tableId: 'ankle_bones_main' });
        }

        // Kosti obecně (Fraktury, edém)
        const parseBone = (boneNameGenitive, prefix) => {
            const f = ctx.text(`${prefix}_frac`);
            const fExt = ctx.field(`${prefix}_frac_ext`);
            const e = ctx.text(`${prefix}_edema`);
            
            if ((!f || f === '0') && (!e || e === '0')) return;
            
            if (f && f !== '0') {
                let repF = 'hyposignální linie charakteru fraktury';
                if (f === 'nedislok.') repF = 'hyposignální linie charakteru nedislokované fraktury';
                else if (f === 'dislok.') repF = 'hyposignální linie s posunem fragmentů charakteru dislokované fraktury';
                else if (f === 'intraart.') repF = 'linie charakteru intraartikulární fraktury';
                
                let extStr = fExt ? ` ${fExt.trim()}` : '';
                bnParts.push(`na ${boneNameGenitive} patrná ${repF}${extStr}`);
                
                let concBone = capitalize(boneNameGenitive);
                if (boneNameGenitive === 'talu') concBone = 'talu';
                else if (boneNameGenitive === 'kalkaneu') concBone = 'kalkaneu';
                else if (boneNameGenitive === 'naviculare') concBone = 'naviculare';
                else if (boneNameGenitive === 'kuboidu') concBone = 'kuboidu';
                
                let fZaver = f === 'intraart.' ? 'Intraartikulární' : (f === 'nedislok.' ? 'Nedislokovaná' : 'Dislokovaná');
                
                concMain.push({ type: 'frame', text: `${fZaver} fraktura ${concBone}${extStr}.`, tableId: 'ankle_bones_main' });
            } 
            
            if (e && e !== '0') {
                let eType = e === '+' ? 'subchondrální' : 'difuzní';
                bnParts.push(`${eType} edém kostní dřeně na ${boneNameGenitive}`);
                concInc.push({ type: 'frame', text: `${capitalize(eType)} edém dřeně ${boneNameGenitive}.`, tableId: 'ankle_bones_main' });
            }
        };

        parseBone('talu', 'ank_tal');
        parseBone('naviculare', 'ank_nav');
        parseBone('kalkaneu', 'ank_calc');
        parseBone('kuboidu', 'ank_cub');

        // Talus - OCD
        const talOcd = ctx.text('ank_tal_ocd');
        const talLoc = ctx.text('ank_tal_loc');
        if (talOcd && talOcd !== '0') {
            let ocdDesc = '';
            if (talOcd === 'st. I') ocdDesc = 'subchondrální edém bez porušení chrupavky (st. I)';
            else if (talOcd === 'st. II') ocdDesc = 'částečně oddělený stabilní osteochondrální fragment (st. II)';
            else if (talOcd === 'st. III') ocdDesc = 'zcela oddělený fragment s tekutinou po obvodu, nedislokovaný (st. III)';
            else if (talOcd === 'st. IV') ocdDesc = 'dislokovaný fragment s defektem (st. IV)';
            
            let locStr = (talLoc && talLoc !== 'lokalizace...') ? ` ${talLoc}` : '';
            bnParts.push(`na talu${locStr} osteochondrální léze - ${ocdDesc}`);
            concMain.push({ type: 'frame', text: `Osteochondrální léze (OCL) talu${locStr} - ${talOcd}.`, tableId: 'ankle_bones_main' });
        }

        // Calcaneus - exostózy
        const calcHag = ctx.text('ank_calc_haglund');
        const calcCal = ctx.text('ank_calc_calcar');
        if (calcHag && calcHag !== '0') {
            bnParts.push('prominence posterosuperiorního okraje kalkaneu charakteru Haglundovy exostózy');
            concInc.push({ type: 'frame', text: 'Haglundova exostóza kalkaneu.', tableId: 'ankle_bones_main' });
        }
        if (calcCal && calcCal !== '0') {
            bnParts.push('přítomna plantární patní ostruha');
        }

        const bnDesc = ctx.field('ank_bones_desc');
        const bnConc = ctx.field('ank_bones_conc');
        if (bnDesc) bnParts.push(bnDesc);

        if (bnParts.length === 0) {
            reportOut.push({ type: 'frame', text: 'Skelet: Kosti bez výrazných signálových patologií.', tableId: 'ankle_bones_main', dimmed: true });
        } else {
            reportOut.push({ type: 'frame', text: 'Skelet: ' + capitalize(bnParts.join('; ')) + '.', tableId: 'ankle_bones_main' });
        }
        if (bnConc) concMain.push({ type: 'frame', text: capitalize(bnConc) + (bnConc.endsWith('.') ? '' : '.'), tableId: 'ankle_bones_main' });


        // --- 3. MEDIÁLNÍ KOMPARTMENT (VAZY A ŠLACHY) ---
        let medParts = [];
        const mlSup = parseLigament('ank_ml_sup', 'povrchová porce lig. deltoideum');
        const mlDeep = parseLigament('ank_ml_deep', 'hluboká porce lig. deltoideum');
        const mtTp = parseTendon('ank_mt_tp', 'm. tibialis posterior');
        const mtFdl = parseTendon('ank_mt_fdl', 'm. flexor digitorum longus');
        const mtFhl = parseTendon('ank_mt_fhl', 'm. flexor hallucis longus');

        [mlSup, mlDeep].filter(Boolean).forEach(x => { medParts.push(x.rep); concMain.push({ type: 'frame', text: x.conc + '.', tableId: 'ankle_med_lig_main' }); });
        [mtTp, mtFdl, mtFhl].filter(Boolean).forEach(x => { medParts.push(x.rep); concMain.push({ type: 'frame', text: x.conc + '.', tableId: 'ankle_med_tendon_main' }); });

        const mlDesc = ctx.field('ank_ml_desc'); const mlConc = ctx.field('ank_ml_conc');
        const mtDesc = ctx.field('ank_mt_desc'); const mtConc = ctx.field('ank_mt_conc');
        if (mlDesc) medParts.push(mlDesc); if (mtDesc) medParts.push(mtDesc);
        
        if (medParts.length === 0) {
            reportOut.push({ type: 'frame', text: 'Mediální kompartment: Ligamentum deltoideum je intaktní. Šlachy flexorů bez výraznější patologie.', tableId: 'ankle_med_lig_main', dimmed: true });
        } else {
            reportOut.push({ type: 'frame', text: 'Mediální kompartment: ' + capitalize(medParts.join('; ')) + '.', tableId: 'ankle_med_lig_main' });
        }
        if (mlConc) concMain.push({ type: 'frame', text: capitalize(mlConc) + (mlConc.endsWith('.') ? '' : '.'), tableId: 'ankle_med_lig_main' });
        if (mtConc) concMain.push({ type: 'frame', text: capitalize(mtConc) + (mtConc.endsWith('.') ? '' : '.'), tableId: 'ankle_med_tendon_main' });


        // --- 4. LATERÁLNÍ KOMPARTMENT (VAZY A ŠLACHY) ---
        let latParts = [];
        const llAtfl = parseLigament('ank_ll_atfl', 'LFTA');
        const llCfl = parseLigament('ank_ll_cfl', 'LFC');
        const llPtfl = parseLigament('ank_ll_ptfl', 'LFTP');
        const llAitfl = parseLigament('ank_ll_aitfl', 'AITFL (syndesmóza)');
        const ltPl = parseTendon('ank_lt_pl', 'm. peroneus longus');
        const ltPb = parseTendon('ank_lt_pb', 'm. peroneus brevis');

        [llAtfl, llCfl, llPtfl, llAitfl].filter(Boolean).forEach(x => { latParts.push(x.rep); concMain.push({ type: 'frame', text: x.conc + '.', tableId: 'ankle_lat_lig_main' }); });
        [ltPl, ltPb].filter(Boolean).forEach(x => { latParts.push(x.rep); concMain.push({ type: 'frame', text: x.conc + '.', tableId: 'ankle_lat_tendon_main' }); });

        const ltRet = ctx.text('ank_lt_ret');
        if (ltRet && ltRet !== '0') {
            if (ltRet === 'edém/léze') { latParts.push('léze/edém retinakula peroneů'); concInc.push({ type: 'frame', text: 'Léze retinakula peroneů.', tableId: 'ankle_lat_tendon_main' }); }
            else if (ltRet === 'luxace šlach') { latParts.push('luxace šlach peroneů přes laterální malleolus'); concMain.push({ type: 'frame', text: 'Luxace šlach peroneů.', tableId: 'ankle_lat_tendon_main' }); }
        }

        const llDesc = ctx.field('ank_ll_desc'); const llConc = ctx.field('ank_ll_conc');
        const ltDesc = ctx.field('ank_lt_desc'); const ltConc = ctx.field('ank_lt_conc');
        if (llDesc) latParts.push(llDesc); if (ltDesc) latParts.push(ltDesc);

        if (latParts.length === 0) {
            reportOut.push({ type: 'frame', text: 'Laterální kompartment: LFTA, LFC, LFTP i syndesmóza jsou intaktní. Šlachy peroneů bez výraznější patologie.', tableId: 'ankle_lat_lig_main', dimmed: true });
        } else {
            reportOut.push({ type: 'frame', text: 'Laterální kompartment: ' + capitalize(latParts.join('; ')) + '.', tableId: 'ankle_lat_lig_main' });
        }
        if (llConc) concMain.push({ type: 'frame', text: capitalize(llConc) + (llConc.endsWith('.') ? '' : '.'), tableId: 'ankle_lat_lig_main' });
        if (ltConc) concMain.push({ type: 'frame', text: capitalize(ltConc) + (ltConc.endsWith('.') ? '' : '.'), tableId: 'ankle_lat_tendon_main' });


        // --- 5. PŘEDNÍ KOMPARTMENT (ŠLACHY) ---
        let antParts = [];
        const atTa = parseTendon('ank_at_ta', 'm. tibialis anterior');
        const atEhl = parseTendon('ank_at_ehl', 'm. extensor hallucis longus');
        const atEdl = parseTendon('ank_at_edl', 'm. extensor digitorum longus');

        [atTa, atEhl, atEdl].filter(Boolean).forEach(x => { antParts.push(x.rep); concMain.push({ type: 'frame', text: x.conc + '.', tableId: 'ankle_ant_tendon_main' }); });

        const atDesc = ctx.field('ank_at_desc'); const atConc = ctx.field('ank_at_conc');
        if (atDesc) antParts.push(atDesc);
        
        if (antParts.length === 0) {
            reportOut.push({ type: 'frame', text: 'Přední kompartment: Šlachy extenzorů bez výraznější patologie.', tableId: 'ankle_ant_tendon_main', dimmed: true });
        } else {
            reportOut.push({ type: 'frame', text: 'Přední kompartment: ' + capitalize(antParts.join('; ')) + '.', tableId: 'ankle_ant_tendon_main' });
        }
        if (atConc) concMain.push({ type: 'frame', text: capitalize(atConc) + (atConc.endsWith('.') ? '' : '.'), tableId: 'ankle_ant_tendon_main' });


        // --- 6. ACHILLOVA ŠLACHA ---
        let achParts = [];
        const achStav = ctx.text('ank_ach_stav');
        if (achStav && achStav !== '0') {
            if (achStav === 'tendinóza') { achParts.push('ztluštění a signálová alterace (tendinóza)'); concMain.push({ type: 'frame', text: 'Tendinóza Achillovy šlachy.', tableId: 'ankle_achilles_main' }); }
            else if (achStav === 'intratend. rpt') { achParts.push('intratendinózní defekt vláken'); concMain.push({ type: 'frame', text: 'Intratendinózní ruptura Achillovy šlachy.', tableId: 'ankle_achilles_main' }); }
            else if (achStav === 'parc. ruptura') { achParts.push('parciální defekt vláken'); concMain.push({ type: 'frame', text: 'Parciální ruptura Achillovy šlachy.', tableId: 'ankle_achilles_main' }); }
            else if (achStav === 'kompletní') { achParts.push('kompletní přerušení kontinuity'); concMain.push({ type: 'frame', text: 'Kompletní ruptura Achillovy šlachy.', tableId: 'ankle_achilles_main' }); }
        }

        const achPeri = ctx.text('ank_ach_peri');
        if (achPeri === '+') {
            achParts.push('edém v Kagerově tělese a podél šlachy (peritendinitida)');
            concInc.push({ type: 'frame', text: 'Peritendinitida Achillovy šlachy.', tableId: 'ankle_achilles_main' });
        }

        const achBur = ctx.text('ank_ach_bur');
        if (achBur && achBur !== '0') {
            if (achBur === 'retrokalcaneární') { achParts.push('tekutinová náplň retrokalcaneární bursy'); concInc.push({ type: 'frame', text: 'Retrokalcaneární bursitida.', tableId: 'ankle_achilles_main' }); }
            else if (achBur === 'subkutánní') { achParts.push('tekutinová náplň subkutánní bursy'); concInc.push({ type: 'frame', text: 'Subkutánní bursitida u Achillovy šlachy.', tableId: 'ankle_achilles_main' }); }
            else if (achBur === 'obě') { achParts.push('tekutinová náplň retrokalcaneární i subkutánní bursy'); concInc.push({ type: 'frame', text: 'Retrokalcaneární a subkutánní bursitida.', tableId: 'ankle_achilles_main' }); }
        }

        const achDesc = ctx.field('ank_ach_desc'); const achConc = ctx.field('ank_ach_conc');
        if (achDesc) achParts.push(achDesc);

        if (achParts.length === 0) {
            reportOut.push({ type: 'frame', text: 'Achillova šlacha přim. vzhledu a signálu.', tableId: 'ankle_achilles_main', dimmed: true });
        } else {
            reportOut.push({ type: 'frame', text: 'Achillova šlacha: ' + capitalize(achParts.join('; ')) + '.', tableId: 'ankle_achilles_main' });
        }
        if (achConc) concMain.push({ type: 'frame', text: capitalize(achConc) + (achConc.endsWith('.') ? '' : '.'), tableId: 'ankle_achilles_main' });


        // --- 7. ZADNÍ KOMPARTMENT - OSTATNÍ ---
        let postParts = [];
        const ptPf = ctx.text('ank_pto_pf');
        if (ptPf && ptPf !== '0') {
            if (ptPf === 'fasciitida') { postParts.push('ztluštění a edém plantární fascie u úponu (fasciitida)'); concMain.push({ type: 'frame', text: 'Plantární fasciitida.', tableId: 'ankle_post_other_main' }); }
            else if (ptPf === 'parc. ruptura') { postParts.push('parciální ruptura plantární fascie'); concMain.push({ type: 'frame', text: 'Parciální ruptura plantární fascie.', tableId: 'ankle_post_other_main' }); }
            else if (ptPf === 'fibromatóza') { postParts.push('nodulární ztluštění plantární fascie v distálnějším průběhu (fibromatóza)'); concMain.push({ type: 'frame', text: 'Plantární fibromatóza (M. Ledderhose).', tableId: 'ankle_post_other_main' }); }
        }

        const ptImp = ctx.text('ank_pto_imp');
        if (ptImp && ptImp !== '0') {
            if (ptImp === 'symptom. os trigonum') {
                postParts.push('přítomno os trigonum s reaktivním kostním edémem a edémem okolních měkkých tkání');
                concMain.push({ type: 'frame', text: 'Syndrom zadního impingementu (symptomatické os trigonum).', tableId: 'ankle_post_other_main' });
            } else if (ptImp === 'symptom. proc. Stieda') {
                postParts.push('prominující processus posterior tali (Stieda) s reaktivním edémem');
                concMain.push({ type: 'frame', text: 'Syndrom zadního impingementu (symptomatický processus Stieda).', tableId: 'ankle_post_other_main' });
            }
        }

        const ptDesc = ctx.field('ank_pto_desc'); const ptConc = ctx.field('ank_pto_conc');
        if (ptDesc) postParts.push(ptDesc);

        if (postParts.length === 0) {
            reportOut.push({ type: 'frame', text: 'Ostatní struktury zadního kompartmentu bez patologických změn.', tableId: 'ankle_post_other_main', dimmed: true });
        } else {
            reportOut.push({ type: 'frame', text: 'Zadní kompartment - ostatní: ' + capitalize(postParts.join('; ')) + '.', tableId: 'ankle_post_other_main' });
        }
        if (ptConc) concMain.push({ type: 'frame', text: capitalize(ptConc) + (ptConc.endsWith('.') ? '' : '.'), tableId: 'ankle_post_other_main' });

        if (concMain.length === 0) {
            concMain.push({ type: 'frame', text: 'Přiměřený nález, bez signifikantní patologie.' });
        }

        return { report: reportOut, conclusion: { main: concMain, incidental: concInc } };
    }
};