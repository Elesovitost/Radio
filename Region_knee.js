const RegionKnee = {
    title: 'MR Kolene',
    reportLayout: 'block',
    layout: (helpers) => {
        return [
            helpers.TableMain('knee_joint_main', 'Kloubní dutina', [
                helpers.Table2colNormal('kn_joint_table', '', [
                    [ 'Náplň:', { btn: 'kn_napln', states: ['0', '+', '++', '+++'] } ],
                    [ 'Bakerova cysta:', { btn: 'kn_baker', states: ['0', '+', '++', '+++'] } ],
                    [ 'Synovitida:', { btn: 'kn_synov', states: ['0', '+', '++', 'PVS'] } ],
                    [ 'Volná tělíska:', { btn: 'kn_teliska', states: ['0', '+ [field:field_text:loc:kde...]', '++ [field:field_text:loc:kde...]', 'Syn. Chon.'] } ]
                ])
            ]),
            helpers.TableMain('knee_patella_main', 'Patella a Přední kompartment', [
                helpers.Table2colNormal('kn_pat_table', 'Patella', [
                    [ 'Wiberg:', { btn: 'kn_pat_wib', states: ['0', 'I', 'II', 'III', 'IV'] } ],
                    [ 'Bipartita:', { btn: 'kn_pat_bip', states: ['0', '+'] } ],
                    [ 'Later. tilt:', [ { btn: 'kn_pat_tilt', states: ['0', '+'] }, { field: 'mm', id: 'kn_pat_tilt_deg', placeholder: 'X°' } ] ],
                    [ 'St.p. luxaci:', { btn: 'kn_pat_lux', states: ['0', '+', '+ fr'] } ]
                ]),
                helpers.Table2colNormal('kn_fp_table', 'FP skloubení a chondropatie', [
                    [ 'Patelární:', [ { btn: 'kn_fp_pat_chp', states: ['GR 0', 'GR I', 'GR II', 'GR III', 'GR IV'] }, { btn: 'kn_fp_pat_lez', states: ['Léze 0', 'Fisura', 'Fisury', 'Defekt', 'Defekty', 'Delamin.'] }, { btn: 'kn_fp_pat_edem', states: ['bez edému', 'edém +', 'edém ++'] } ] ],
                    [ 'Femorální:', [ { btn: 'kn_fp_fem_chp', states: ['GR 0', 'GR I', 'GR II', 'GR III', 'GR IV'] }, { btn: 'kn_fp_fem_lez', states: ['Léze 0', 'Fisura', 'Fisury', 'Defekt', 'Defekty', 'Delamin.'] }, { btn: 'kn_fp_fem_edem', states: ['bez edému', 'edém +', 'edém ++'] } ] ],
                    [ 'Osteofyty:', { btn: 'kn_fp_art', states: ['0', 'I', 'II', 'III'] } ]
                ]),
                helpers.Table2colNormal('kn_ant_comp_table', 'Ostatní přední kompartment', [
                    [ 'Jumpers knee:', { btn: 'kn_ant_jump', states: ['0', '+', 'S-L-J'] } ],
                    [ 'Osgood-Schlatter:', { btn: 'kn_ant_osg', states: ['0', 'st.p.', 'aktivní'] } ],
                    [ 'Med. plica:', { btn: 'kn_ant_plica', states: ['0', '+'] } ],
                    [ 'Edém Hoffa:', { btn: 'kn_ant_hoffa', states: ['0', '+'] } ],
                    [ 'Fat pad imping.:', { btn: 'kn_ant_imp', states: ['0', '+'] } ]
                ])
            ]),
            
            // --- KONDYLY A MENISKY ---
            ...(() => {
                const makeCondyleTable = (title, prefix) => helpers.Table2colNormal(`${prefix}_table`, title, [
                    [ 'Chrupavka:', [ { btn: `${prefix}_chr_gr`, states: ['GR 0', 'GR I', 'GR II', 'GR III', 'GR IV'] }, { btn: `${prefix}_chr_lez`, states: ['Léze 0', 'Fisura', 'Fisury', 'Defekt', 'Defekty', 'Delamin.'] }, { btn: `${prefix}_chr_edem`, states: ['edém 0', 'edém +', 'edém ++'] } ] ],
                    [ 'Subchondr. kost:', [ { btn: `${prefix}_sub_sifk`, states: ['SIFK 0', 'SIFK +', 'SIFK ++'] }, { btn: `${prefix}_sub_ocd`, states: ['OCD 0', 'OCD I', 'OCD II', 'OCD III', 'OCD IV'] }, { btn: `${prefix}_sub_bml`, states: ['BML 0', 'BML +', 'BML ++', 'BML +++'] } ] ],
                    [ 'Fraktura:', { btn: `${prefix}_frac`, states: ['0', 'OC', 'impakční', 'vertikální', 'komin.'] } ]
                ]);

                const makeMeniscus = (id, title, prefix) => helpers.TableMain(id, title, [
                    helpers.Table2colNormal(`${prefix}_table`, '', [
                        [ 'Léze:', [ 
                            { btn: `${prefix}_base`, states: ['0', 'ruptura', 'degenerace'] }, 
                            { btn: `${prefix}_typ`, states: ['typ...', 'horizontální', 'longitudinální', 'radiální part', 'radiální full', 'komplexní', 'bucket-handle', 'flap', 'parrot-beak', 'macerace'] },
                            { btn: `${prefix}_loc`, states: ['lokace...', 'přední úpon', 'přední roh', 'tělo', 'zadní roh', 'zadní úpon'] }
                        ] ],
                        [ 'Cysta:', { btn: `${prefix}_cyst`, states: ['0', 'malá', 'střední', 'výrazná'] } ],
                        [ 'Extruze:', { btn: `${prefix}_extr`, states: ['0', '< 50 %', '> 50 %'] } ],
                        [ 'Operace:', { btn: `${prefix}_oper`, states: ['0', 'parciální', 'subtotální', 'totální'] } ]
                    ])
                ]);

                const makeCollateralLigament = (id, title, prefix) => helpers.TableMain(id, title, [
                    helpers.Table2colNormal(`${prefix}_table`, '', [
                        [ 'Ruptura:', [ 
                            { btn: `${prefix}_rupt`, states: ['0', 'low-grade', 'parciální', 'high-grade', 'kompletní', 'po starší'] },
                            { btn: `${prefix}_loc`, states: ['lokace...', 'femorálně', 'střed', 'tibiálně'] }
                        ] ]
                    ])
                ]);

                return [
                    helpers.TableMain('knee_lat_comp_main', 'Laterální kompartment', [
                        makeCondyleTable('Laterální kondyl femuru (LFC)', 'kn_lfc'),
                        makeCondyleTable('Laterální plato tibie (LTC)', 'kn_ltc'),
                        helpers.Table2colNormal('kn_lat_shared_ost_table', 'SPOLEČNÉ', [
                            [ 'Osteofyty:', { btn: 'kn_lat_shared_ost', states: ['0', 'I', 'II', 'III'] } ]
                        ])
                    ]),
                    makeMeniscus('knee_lm_main', 'Laterální meniskus (LM)', 'kn_lm'),
                    makeCollateralLigament('knee_lcl_main', 'Laterální kolaterální vaz', 'kn_lcl'),
                    
                    // --- MEDIÁLNÍ KOMPARTMENT ---
                    helpers.TableMain('knee_med_comp_main', 'Mediální kompartment', [
                        makeCondyleTable('Mediální kondyl femuru (MFC)', 'kn_mfc'),
                        makeCondyleTable('Mediální plato tibie (MTC)', 'kn_mtc'),
                        helpers.Table2colNormal('kn_med_shared_ost_table', 'SPOLEČNÉ', [
                            [ 'Osteofyty:', { btn: 'kn_med_shared_ost', states: ['0', 'I', 'II', 'III'] } ]
                        ])
                    ]),
                    makeMeniscus('knee_mm_main', 'Mediální meniskus (MM)', 'kn_mm'),
                    makeCollateralLigament('knee_mcl_main', 'Mediální kolaterální vaz', 'kn_mcl')
                ];
            })(),

            helpers.TableMain('knee_acl_main', 'Přední zkřížený vaz (ACL)', [
                helpers.Table2colNormal('kn_acl_table', '', [
                    [ 'Ruptura:', [ { btn: 'kn_acl_rupt', states: ['0', 'low-grade', 'parciální', 'high-grade', 'kompletní'] }, { btn: 'kn_acl_bml', states: ['skelet 0', 'kont. edém', '+ fr. F', '+ fr. T', '+ fr. F+T'] } ] ],
                    [ 'Morfologie:', { btn: 'kn_acl_morf', states: ['0', 'zvlnění', 'elongace', 'mukoid. deg.', 'ganglion'] } ],
                    [ 'Náhrada (štěp):', [ { btn: 'kn_acl_plast', states: ['0', 'intaktní', 'parc. léze', 'kompl. rupt.'] }, { btn: 'kn_acl_vzhled', states: ['orientace OK', 'laxita', 'vertikální', 'horizontální', 'impingement'] } ] ],
                    [ '', { btn: 'kn_acl_tunel', states: ['tunely', 'širší F', 'širší T', 'ventrální T'] } ],
                    [ 'Kyklop léze:', { btn: 'kn_acl_kyklop', states: ['0', '+', '+/-'] } ]
                ])
            ]),
            helpers.TableMain('knee_pcl_main', 'Zadní zkřížený vaz (PCL)', [
                helpers.Table2colNormal('kn_pcl_table', '', [
                    [ 'Ruptura:', [ { btn: 'kn_pcl_rupt', states: ['0', 'low-grade', 'parciální', 'high-grade', 'kompletní'] }, { btn: 'kn_pcl_bml', states: ['skelet 0', 'BML +', 'avulze tibie'] } ] ],
                    [ 'Morfologie:', { btn: 'kn_pcl_morf', states: ['0', 'elongace', 'mukoid. deg.', 'cysta'] } ]
                ])
            ]),
            
            // --- MĚKKÉ TKÁNĚ A OKOLÍ ---
            helpers.TableMain('knee_soft_main', 'Měkké tkáně a okolí', [
                helpers.Table2colNormal('kn_st_tendons_table', 'Šlachy a úpony', [
                    [ 'Šlacha quadricepsu:', { btn: 'kn_st_quad', states: ['0', 'tendinopatie', 'parc. ruptura', 'kompl. ruptura'] } ],
                    [ 'Pes anserinus:', { btn: 'kn_st_pes', states: ['0', 'edém/bursitida', 'tendinopatie'] } ],
                    [ 'IT trakt:', { btn: 'kn_st_itb', states: ['0', 'friction syndrom', 'tendinopatie', 'parc. léze'] } ]
                ]),
                helpers.Table2colNormal('kn_st_corners_table', 'Postranní rohy (PLC/PMC)', [
                    [ 'PLC (posterolat.):', { btn: 'kn_st_plc', states: ['0', 'edém/distenze', 'parc. léze', 'kompl. léze'] } ],
                    [ 'PMC (posteromed.):', { btn: 'kn_st_pmc', states: ['0', 'edém/distenze', 'parc. léze', 'kompl. léze'] } ]
                ]),
                helpers.Table2colNormal('kn_st_other_table', 'Svaly a burzy', [
                    [ 'Gastrocnemius med.:', { btn: 'kn_m_gastro', states: ['0', '+'] } ],
                    [ 'Popliteus:', { btn: 'kn_m_popl', states: ['0', '+'] } ],
                    [ 'Biceps femoris:', { btn: 'kn_m_biceps', states: ['0', '+'] } ],
                    [ 'Prepatelární burza:', { btn: 'kn_b_prepat', states: ['0', '+'] } ],
                    [ 'Hluboká infrapat.:', { btn: 'kn_b_infrap_deep', states: ['0', '+'] } ],
                    [ 'Subkut. infrapat.:', { btn: 'kn_b_infrap_sub', states: ['0', '+'] } ],
                    [ 'MCL burza:', { btn: 'kn_b_mcl', states: ['0', '+'] } ],
                    [ 'TF ganglion:', { btn: 'kn_g_tf', states: ['0', '+'] } ]
                ])
            ]),
            
            // --- SKELET A KOSTNÍ LÉZE ---
            helpers.TableMain('knee_bones_main', 'Skelet a ložiskové léze', [
                helpers.Table2colNormal('kn_bones_table', 'Typická benigní ložiska', [
                    [ 'Ložisko:', { btn: 'kn_bn_typ', states: ['0', 'Enchondrom', 'NOF / FCD', 'Osteochondrom', 'Kostní infarkt', 'Hemangiom'] } ],
                    [ 'Lokalizace:', { btn: 'kn_bn_loc', states: ['0', 'femur', 'tibie', 'fibuly', 'patella'] } ],
                    [ 'Velikost:', { field: 'size', id: 'kn_bn_size', placeholder: 'mm' } ],
                    [ 'Aktivita:', { btn: 'kn_bn_edema', states: ['0', 'bez edému', 's edémem'] } ]
                ])
            ])
        ];
    },

    compile: (ctx) => {
        let reportOut = [{ type: 'heading', text: 'Koleno:', action: 'open-region', regionId: 'knee' }];
        let concMain = [];
        let concInc = [];
        const cap = (s) => s && s.charAt(0).toUpperCase() + s.slice(1);
        const examId = ctx.examId || 'default';
        
        // --- HELPERY PRO CHRUPAVKY A SKELET ---
        const getChondroRep = (grade, lesion, edema, nameRep) => {
            if ((!grade || grade === 'GR 0') && (!lesion || lesion === 'Léze 0') && (!edema || edema === 'edém 0' || edema === 'bez edému')) return null;

            let cRep = `Chrupavka ${nameRep}`;
            const lezMapGrammar = { 'Fisura': 'fisurou', 'Fisury': 'fisurami', 'Defekt': 'defektem', 'Defekty': 'defekty', 'Delamin.': 'delaminací' };
            let hasLez = lesion && lesion !== 'Léze 0';
            let lesionText = hasLez ? lezMapGrammar[lesion] : '';

            if (grade && grade !== 'GR 0') {
                if (grade === 'GR I') {
                    cRep += hasLez ? ` se signálovými změnami, ${lesionText}` : ` se signálovými změnami`;
                } else if (grade === 'GR II') {
                    cRep += hasLez ? ` s ${lesionText} do zevní poloviny` : ` snížena do poloviny tloušťky`;
                } else if (grade === 'GR III') {
                    cRep += hasLez ? ` s ${lesionText} do vnitřní poloviny` : ` snížena o více jak polovinu tloušťky`;
                } else if (grade === 'GR IV') {
                    cRep += hasLez ? ` s ${lesionText} až ke kosti` : ` prakticky chybí`;
                }
            } else if (hasLez) {
                cRep += ` s ${lesionText}`;
            } else {
                cRep += ` normální šíře`;
            }

            if (edema && edema !== 'edém 0' && edema !== 'bez edému') {
                const edemText = (edema === 'edém +') ? 'mírným subchondrálním edémem' : 'výrazným subchondrálním edémem';
                cRep += (cRep.includes(' s ') || cRep.includes(' se ')) ? ' a ' + edemText : ' s ' + edemText;
            }
            return cRep;
        };

        const getChondroConc = (grade, lesion, edema, nameConc) => {
            if ((!grade || grade === 'GR 0') && (!lesion || lesion === 'Léze 0') && (!edema || edema === 'edém 0' || edema === 'bez edému')) return null;

            const lezMapConc = { 'Fisura': 'fisurou', 'Fisury': 'fisurami', 'Defekt': 'defektem', 'Defekty': 'defekty', 'Delamin.': 'delaminací' };
            let hasLez = lesion && lesion !== 'Léze 0';
            let lesionText = hasLez ? lezMapConc[lesion] : '';
            let gradeText = (grade && grade !== 'GR 0') ? grade.replace('GR ', 'gr.') : '';

            let res = gradeText ? `${gradeText} ${nameConc}` : `${nameConc}`;
            res = res.trim();

            let modifiers = [];
            if (hasLez) modifiers.push(lesionText);
            if (edema && edema !== 'edém 0' && edema !== 'bez edému') {
                modifiers.push(edema === 'edém +' ? 'mírným subchondrálním edémem' : 'subchondrálním edémem');
            }

            if (modifiers.length > 0) {
                res += ` s ${modifiers.join(' a ')}`;
            }
            return res;
        };

        const bonePrep = (items) => (/^[sšzž]/i.test(items[0]) ? 'se' : 's');

        const getBonePathologies = (prefix) => {
            let frac = ctx.text(`${prefix}_frac`);
            let sifk = ctx.text(`${prefix}_sub_sifk`);
            let ocd = ctx.text(`${prefix}_sub_ocd`);
            let bml = ctx.text(`${prefix}_sub_bml`);

            let rep = [];
            let conc = [];
            if (frac && frac !== '0') {
                if (frac === 'OC') {
                    rep.push('osteochondrální frakturou s přerušením artikulárního povrchu a okolním edémem kostní dřeně');
                    conc.push('osteochondrální frakturou (OCF)');
                } else {
                    const fracMap = { 'impakční': 'impakční frakturou', 'vertikální': 'vertikální frakturou', 'komin.': 'kominutivní frakturou' };
                    rep.push(fracMap[frac]);
                    conc.push(fracMap[frac]);
                }
            }
            if (sifk && sifk !== 'SIFK 0') {
                if (sifk === 'SIFK +') {
                    rep.push('subchondrální lineární hypointenzní frakturou a okolním edémem kostní dřeně');
                    conc.push('SIFK');
                } else {
                    rep.push('subchondrální lineární hypointenzní frakturou, okolním edémem kostní dřeně a fokálním kolapsem artikulárního povrchu');
                    conc.push('SIFK s fokálním kolapsem');
                }
            }
            if (ocd && ocd !== 'OCD 0') {
                const stage = ocd.replace('OCD ', '');
                const ocdRepMap = {
                    'I': 'subchondrálním edémem a změnou signálu bez přerušení chrupavky',
                    'II': 'osteochondrální lézí s částečně uvolněným fragmentem',
                    'III': 'osteochondrální lézí s uvolněným nestabilním fragmentem in situ',
                    'IV': 'osteochondrálním defektem s dislokovaným fragmentem'
                };
                rep.push(ocdRepMap[stage] || `osteochondrální lézí ${stage}. st.`);
                conc.push(`osteochondrální lézí (OCD) ${stage}. st.`);
            }
            if (bml && bml !== 'BML 0') {
                const bmlMap = { 'BML +': 'mírným edémem dřeně', 'BML ++': 'středním edémem dřeně', 'BML +++': 'výrazným edémem dřeně' };
                rep.push(bmlMap[bml]);
                conc.push(bmlMap[bml]);
            }
            return { rep, conc };
        };

        // ═══ KLOUBNÍ DUTINA ═══
        let jointRep = [];
        
        let napln = ctx.text('kn_napln');
        if (napln && napln !== '0') {
            if (napln === '+') { jointRep.push('mírně zvýšené množství kloubní tekutiny'); concMain.push({ type: 'frame', text: 'Mírně zvýšená kloubní náplň.', tableId: 'knee_joint_main' }); }
            else if (napln === '++') { jointRep.push('středně zvýšené množství kloubní tekutiny'); concMain.push({ type: 'frame', text: 'Středně zvýšená kloubní náplň.', tableId: 'knee_joint_main' }); }
            else if (napln === '+++') { jointRep.push('výrazně zvýšené množství kloubní tekutiny'); concMain.push({ type: 'frame', text: 'Výrazně zvýšená kloubní náplň.', tableId: 'knee_joint_main' }); }
        }

        let baker = ctx.text('kn_baker');
        if (baker && baker !== '0') {
            if (baker === '+') { jointRep.push('drobná pseudocysta mediodorzálně v typické lokalizaci'); concMain.push({ type: 'frame', text: 'Drobná Bakerova pseudocysta.', tableId: 'knee_joint_main' }); }
            else if (baker === '++') { jointRep.push('střední pseudocysta mediodorzálně v typické lokalizaci'); concMain.push({ type: 'frame', text: 'Bakerova pseudocysta.', tableId: 'knee_joint_main' }); }
            else if (baker === '+++') { jointRep.push('výrazná pseudocysta mediodorzálně v typické lokalizaci'); concMain.push({ type: 'frame', text: 'Výrazná Bakerova pseudocysta.', tableId: 'knee_joint_main' }); }
        }

        let synov = ctx.text('kn_synov');
        if (synov && synov !== '0') {
            if (synov === '+') { jointRep.push('mírně prominentní synovie'); concMain.push({ type: 'frame', text: 'Mírná synoviální hypertrofie.', tableId: 'knee_joint_main' }); }
            else if (synov === '++') { jointRep.push('rozšířená prominentní synovie'); concMain.push({ type: 'frame', text: 'Synoviální hypertrofie.', tableId: 'knee_joint_main' }); }
            else if (synov === 'PVS') { jointRep.push('difuzní vilózně-nodulární zbytnění synovie s nízkým signálem v T1W i T2W'); concMain.push({ type: 'frame', text: 'Pigmentovaná vilonodulární synovitida.', tableId: 'knee_joint_main' }); }
        }

        let telIdx = Store.buttonStates[`${examId}_knee_kn_teliska`] || 0;
        let telLoc = ctx.field('kn_teliska_loc');
        let telLocStr = telLoc ? ` ${telLoc}` : '';
        
        if (telIdx > 0) {
            if (telIdx === 1) { jointRep.push(`ojedinělá volná tělíska v kloubní dutině${telLocStr}`); concMain.push({ type: 'frame', text: `Ojedinělá volná tělíska v kloubní dutině${telLocStr}.`, tableId: 'knee_joint_main' }); }
            else if (telIdx === 2) { jointRep.push(`vícečetná volná tělíska v kloubní dutině${telLocStr}`); concMain.push({ type: 'frame', text: `Vícečetná volná tělíska v kloubní dutině${telLocStr}.`, tableId: 'knee_joint_main' }); }
            else if (telIdx === 3) { jointRep.push('mnohočetná volná tělíska různé velikosti, převážně chondroidního signálu'); concMain.push({ type: 'frame', text: 'Synoviální chondromatóza.', tableId: 'knee_joint_main' }); }
        }

        if (jointRep.length === 0) {
            reportOut.push({ type: 'frame', text: 'Normální množství nitrokloubní tekutiny.', tableId: 'knee_joint_main', dimmed: true });
        } else {
            let finalJointText = jointRep.join(', ');
            finalJointText = finalJointText.charAt(0).toUpperCase() + finalJointText.slice(1) + '.';
            reportOut.push({ type: 'frame', text: finalJointText, tableId: 'knee_joint_main' });
        }

        // ═══ PATELLA A FP SKLOUBENÍ ═══
        let patRep = [];
        let antRep = [];
        let hasPatellaPathology = false;

        let wib = ctx.text('kn_pat_wib');
        if (wib && wib !== '0') { patRep.push(`patella tvaru Wiberg ${wib}`); hasPatellaPathology = true; }
        let bip = ctx.text('kn_pat_bip');
        if (bip && bip !== '0') { patRep.push('patella bipartita'); concMain.push({ type: 'frame', text: 'Patella bipartita.', tableId: 'knee_patella_main' }); hasPatellaPathology = true; }
        let tilt = ctx.text('kn_pat_tilt');
        if (tilt === '+') {
            let deg = ctx.field('kn_pat_tilt_deg');
            patRep.push(`laterální tilt patelly${deg ? ` ${deg}°` : ''}`);
            if (deg && parseInt(deg) > 15) concMain.push({ type: 'frame', text: 'Laterální tilt patelly.', tableId: 'knee_patella_main' });
            hasPatellaPathology = true;
        }
        let lux = ctx.text('kn_pat_lux');
        if (lux && lux !== '0') {
            let isFr = lux === '+ fr';
            patRep.push(`ložiska edému kostní dřeně mediální hrany patelly ${isFr ? '(s frakturou) ' : ''}a ventrolaterálního kondylu femuru. Vysoká SI v oblasti rozšířeného MPFL`);
            concMain.push({ type: 'frame', text: `St.p. laterální luxaci patelly a odpovídajícím postkontuzním edémem patelly ${isFr ? '(s frakturou med. hrany) ' : ''}a later. femuru a porušením MPFL.`, tableId: 'knee_patella_main' });
            hasPatellaPathology = true;
        }

        let jump = ctx.text('kn_ant_jump');
        if (jump && jump !== '0') {
            hasPatellaPathology = true;
            if (jump === '+') { antRep.push('zvýšená SI prox. úponu patelární šlachy a okolních měkkých tkání'); concMain.push({ type: 'frame', text: 'Edém prox. úponu patelární šlachy a okolí obrazu skokanského kolena (Jumper\'s knee).', tableId: 'knee_patella_main' }); }
            else if (jump === 'S-L-J') { antRep.push('zvýšená SI prox. úponu patelární šlachy, okolních měkkých tkání a apexu patelly'); concMain.push({ type: 'frame', text: 'Edém prox. úponu patelární šlachy a okolí obrazu Sinding-Larsen-Johansson syndromu.', tableId: 'knee_patella_main' }); }
        }
        let osg = ctx.text('kn_ant_osg');
        if (osg && osg !== '0') {
            hasPatellaPathology = true;
            if (osg === 'st.p.') { antRep.push('nepravidelnosti a prominence distálního úponu patelární šlachy na tuberositas tibiae'); concMain.push({ type: 'frame', text: 'Stav po Osgood-Schlatterově chorobě.', tableId: 'knee_patella_main' }); }
            else if (osg === 'aktivní') { antRep.push('prominence a fragmentace tuberositas tibiae se subchondrálním edémem kostní dřeně a zvýšenou SI distálního úponu patelární šlachy'); concMain.push({ type: 'frame', text: 'Aktivní Osgood-Schlatterova choroba.', tableId: 'knee_patella_main' }); }
        }
        let plica = ctx.text('kn_ant_plica');
        if (plica === '+') { hasPatellaPathology = true; antRep.push('zbytnělá mediální patelární plika'); concMain.push({ type: 'frame', text: 'Zbytnělá plica medialis patellaris.', tableId: 'knee_patella_main' }); }
        let hoffa = ctx.text('kn_ant_hoffa');
        if (hoffa === '+') { hasPatellaPathology = true; antRep.push('edém Hoffova tukového tělesa'); concMain.push({ type: 'frame', text: 'Edém Hoffova tukového tělesa (Hoffitis).', tableId: 'knee_patella_main' }); }
        let imp = ctx.text('kn_ant_imp');
        if (imp === '+') { hasPatellaPathology = true; antRep.push('vysoká SI suprapatelárního tukového tělesa'); concMain.push({ type: 'frame', text: 'Suprapatelární fat pad impingement syndrom.', tableId: 'knee_patella_main' }); }

        let fpPatRep = getChondroRep(ctx.text('kn_fp_pat_chp'), ctx.text('kn_fp_pat_lez'), ctx.text('kn_fp_pat_edem'), 'patelly');
        let fpFemRep = getChondroRep(ctx.text('kn_fp_fem_chp'), ctx.text('kn_fp_fem_lez'), ctx.text('kn_fp_fem_edem'), 'ventr. femuru');
        let fpPatConc = getChondroConc(ctx.text('kn_fp_pat_chp'), ctx.text('kn_fp_pat_lez'), ctx.text('kn_fp_pat_edem'), 'patelárně');
        let fpFemConc = getChondroConc(ctx.text('kn_fp_fem_chp'), ctx.text('kn_fp_fem_lez'), ctx.text('kn_fp_fem_edem'), 'femorálně');
        let art = ctx.text('kn_fp_art');

        if (fpPatRep || fpFemRep || (art && art !== '0')) hasPatellaPathology = true;

        if (!hasPatellaPathology) {
            reportOut.push({ type: 'frame', text: 'Patella obvyklého vzhledu, FP chrupavky nesníženy bez výraznější léze.', tableId: 'knee_patella_main', dimmed: true });
        } else {
            if (patRep.length > 0) reportOut.push({ type: 'frame', text: cap(patRep.join(', ').replace(/, ([^,]*)$/, ' a $1')) + '.', tableId: 'knee_patella_main' });

            let fpReportParts = [];
            if (fpPatRep) fpReportParts.push(fpPatRep + '.');
            if (fpFemRep) fpReportParts.push(fpFemRep + '.');
            if (art && art !== '0') {
                const artMapRep = { 'I': 'Počínající marginální osteofyty.', 'II': 'Marginální osteofyty.', 'III': 'Výrazné marginální osteofyty.' };
                fpReportParts.push(artMapRep[art]);
                concMain.push({ type: 'frame', text: `FP artróza ${art}.st.`, tableId: 'knee_patella_main' });
            }
            if (fpReportParts.length > 0) {
                reportOut.push({ type: 'frame', text: `FP kompartment: ${fpReportParts.join(' ')}`, tableId: 'knee_patella_main' });
            }

            if (antRep.length > 0) reportOut.push({ type: 'frame', text: cap(antRep.join(', ').replace(/, ([^,]*)$/, ' a $1')) + '.', tableId: 'knee_patella_main' });

            if (fpPatConc || fpFemConc) {
                let concs = [];
                if (fpPatConc) concs.push(fpPatConc);
                if (fpFemConc) concs.push(fpFemConc);
                concMain.push({ type: 'frame', text: `FP chondropatie ${concs.join(', ')}.`, tableId: 'knee_patella_main' });
            }
        }

        // ═══ EXEKUCE LATERÁLNÍHO A MEDIÁLNÍHO KOMPARTMENTU ═══
        const buildCompartment = (compName, femPrefix, tibPrefix, femBoneName, tibBoneName, tableId, ostBtnId) => {
            let femBones = getBonePathologies(femPrefix);
            let tibBones = getBonePathologies(tibPrefix);

            let femChrRep = getChondroRep(ctx.text(`${femPrefix}_chr_gr`), ctx.text(`${femPrefix}_chr_lez`), ctx.text(`${femPrefix}_chr_edem`), 'femuru');
            let tibChrRep = getChondroRep(ctx.text(`${tibPrefix}_chr_gr`), ctx.text(`${tibPrefix}_chr_lez`), ctx.text(`${tibPrefix}_chr_edem`), 'tibie');

            let femChrConc = getChondroConc(ctx.text(`${femPrefix}_chr_gr`), ctx.text(`${femPrefix}_chr_lez`), ctx.text(`${femPrefix}_chr_edem`), 'femorálně');
            let tibChrConc = getChondroConc(ctx.text(`${tibPrefix}_chr_gr`), ctx.text(`${tibPrefix}_chr_lez`), ctx.text(`${tibPrefix}_chr_edem`), 'tibiálně');

            let ost = ctx.text(ostBtnId);
            let ostRep = '';
            if (ost && ost !== '0') {
                 const ostMap = { 'I': 'počínající marginální osteofyty', 'II': 'drobné marginální osteofyty', 'III': 'výrazné marginální osteofyty' };
                 ostRep = ostMap[ost];
            }

            let repParts = [];
            if (femBones.rep.length > 0) {
                repParts.push(`${femBoneName} ${bonePrep(femBones.rep)} ${femBones.rep.join(' a ')}.`);
            }
            if (tibBones.rep.length > 0) {
                repParts.push(`${tibBoneName} ${bonePrep(tibBones.rep)} ${tibBones.rep.join(' a ')}.`);
            }

            if (femChrRep) repParts.push(femChrRep + '.');
            if (tibChrRep) repParts.push(tibChrRep + '.');
            if (ostRep) repParts.push(ostRep.charAt(0).toUpperCase() + ostRep.slice(1) + '.');

            if (repParts.length > 0) {
                reportOut.push({ type: 'frame', text: `${compName}: ${repParts.join(' ')}`, tableId: tableId });
            } else {
                reportOut.push({ type: 'frame', text: `${compName} bez výraznější léze chrupavek či skeletu.`, tableId: tableId, dimmed: true });
            }

            if (femBones.conc.length > 0) {
                concMain.push({ type: 'frame', text: `${femBoneName} ${bonePrep(femBones.conc)} ${femBones.conc.join(' a ')}.`, tableId: tableId });
            }
            if (tibBones.conc.length > 0) {
                concMain.push({ type: 'frame', text: `${tibBoneName} ${bonePrep(tibBones.conc)} ${tibBones.conc.join(' a ')}.`, tableId: tableId });
            }

            if (femChrConc || tibChrConc) {
                let concs = [];
                if (femChrConc) concs.push(femChrConc);
                if (tibChrConc) concs.push(tibChrConc);
                concMain.push({ type: 'frame', text: `${compName} s chondropatií ${concs.join(', ')}.`, tableId: tableId });
            }
        };

        // ═══ KOMPILÁTOR PRO MENISKY (LM, MM) ═══
        const parseMeniscus = (prefix, nameTitle, nameTitleGen, nameConc, tableId) => {
            const mBase = ctx.text(`${prefix}_base`);
            const mTyp = ctx.text(`${prefix}_typ`);
            const mLoc = ctx.text(`${prefix}_loc`);
            const mCyst = ctx.text(`${prefix}_cyst`);
            const mExtr = ctx.text(`${prefix}_extr`);
            const mOper = ctx.text(`${prefix}_oper`);

            const isMNormal = (!mBase || mBase === '0') && (!mCyst || mCyst === '0') && (!mExtr || mExtr === '0') && (!mOper || mOper === '0');

            if (isMNormal) {
                reportOut.push({ type: 'frame', text: `${nameTitle} přiměřeného vzhledu bez patrné léze.`, tableId: tableId, dimmed: true });
            } else if (mOper === 'totální') {
                reportOut.push({ type: 'frame', text: `Stav po totální resekci ${nameTitleGen}.`, tableId: tableId });
                concMain.push({ type: 'frame', text: `${nameTitle} chybí susp. po totální menisektomii.`, tableId: tableId });
            } else {
                const locMapGen = { 'přední úpon': 'předního úponu', 'přední roh': 'předního rohu', 'tělo': 'těla', 'zadní roh': 'zadního rohu', 'zadní úpon': 'zadního úponu' };
                const locMapLoc = { 'přední úpon': 'v oblasti předního úponu', 'přední roh': 'v předním rohu', 'tělo': 'v oblasti těla', 'zadní roh': 'v zadním rohu', 'zadní úpon': 'v oblasti zadního úponu' };

                let locGen = (mLoc && mLoc !== 'lokace...') ? ` ${locMapGen[mLoc]}` : '';
                let locLoc = (mLoc && mLoc !== 'lokace...') ? ` ${locMapLoc[mLoc]}` : '';

                let operRep = '';
                let operConc = '';
                if (mOper && mOper !== '0') {
                    const opRepMap = { 'parciální': 'parc. redukci objemu', 'subtotální': 'subtotální redukci objemu' };
                    const opConcMap = { 'parciální': 'parc. menisektomii', 'subtotální': 'subtot. menisektomii' };
                    operRep = ` po ${opRepMap[mOper]}${locGen}`;
                    operConc = ` po ${opConcMap[mOper]}${locGen}`;
                }

                let ruptRep = '';
                let ruptConc = '';

                if (mBase && mBase !== '0') {
                    if (mBase === 'degenerace') {
                        ruptRep = `s intrameniskální vysokou SI${locLoc} bez kontaktu s artikulární plochou`;
                        ruptConc = `s degenerací${locLoc}`;
                    } else if (mBase === 'ruptura') {
                        const rRep = {
                            'horizontální': 'horizontální trhlinou', 'longitudinální': 'longitudinální trhlinou',
                            'radiální part': 'parciálním radiálním přerušením', 'radiální full': 'kompletním radiálním přerušením',
                            'komplexní': 'komplexní trhlinou', 'bucket-handle': 'obrazem luxace fragmentu typu bucket-handle',
                            'flap': 'dislokovanou flap rupturou', 'parrot-beak': 'parrot-beak rupturou volného okraje',
                            'macerace': 'macerací a destrukcí tkáně'
                        };
                        const rConc = {
                            'horizontální': 'horizontální rupturou', 'longitudinální': 'longitudinální rupturou',
                            'radiální part': 'parciální radiální rupturou', 'radiální full': 'kompletní radiální rupturou',
                            'komplexní': 'komplexní rupturou', 'bucket-handle': 'bucket-handle rupturou',
                            'flap': 'flap rupturou', 'parrot-beak': 'parrot-beak rupturou',
                            'macerace': 'pokročilou macerací'
                        };

                        let tRep = (mTyp && mTyp !== 'typ...' && rRep[mTyp]) ? rRep[mTyp] : 'trhlinou';
                        let tConc = (mTyp && mTyp !== 'typ...' && rConc[mTyp]) ? rConc[mTyp] : 'rupturou';

                        ruptRep = `s ${tRep}${locLoc}`;
                        if (['horizontální', 'longitudinální'].includes(mTyp)) ruptRep += ' v kontaktu s artik. plochou';
                        ruptConc = `s ${tConc}${locLoc}`;
                    }
                } else if (mOper && mOper !== '0') {
                    ruptRep = 'přiměřeného postoperačního vzhledu bez přesvědčivé recidivy ruptury';
                }

                let extraRepParts = [];
                let extraConcParts = [];

                if (mExtr && mExtr !== '0') {
                    let extrStr = mExtr === '< 50 %' ? 'extruzí vně štěrbiny do 50 % šířky' : 'extruzí vně štěrbiny o více jak 50 %';
                    extraRepParts.push(`s ${extrStr}`);
                    let extrConcStr = mExtr === '< 50 %' ? 'mírnou extruzí vně štěrbiny' : 'pokročilou extruzí vně štěrbiny';
                    extraConcParts.push(`s ${extrConcStr}`);
                }

                if (mCyst && mCyst !== '0') {
                    const cRepStr = mCyst === 'malá' ? 'drobnou parameniskální cystickou lézí' : (mCyst === 'střední' ? 'parameniskální cystickou lézí' : 'výraznou parameniskální cystickou lézí');
                    extraRepParts.push(`s ${cRepStr}`);
                    const cConcStr = mCyst === 'malá' ? 'drobnou parameniskální cystou' : (mCyst === 'střední' ? 'parameniskální cystou' : 'výraznou parameniskální cystou');
                    extraConcParts.push(`s ${cConcStr}`);
                }

                const joinWithA = (arr) => {
                    if (arr.length === 0) return '';
                    if (arr.length === 1) return arr[0];
                    return arr.join(' a ');
                };

                let extraRepStr = joinWithA(extraRepParts);
                let extraConcStr = joinWithA(extraConcParts);

                let repSentence = `${nameTitle}${operRep}`;
                if (ruptRep) repSentence += ` ${ruptRep}`;
                if (extraRepStr) repSentence += (ruptRep ? `, ${extraRepStr}` : ` ${extraRepStr}`);
                repSentence = repSentence.replace(/\s+/g, ' ').trim() + '.';
                reportOut.push({ type: 'frame', text: repSentence, tableId });

                let baseConc = (mOper !== '0' && !ruptConc) ? `${nameTitle} s redukcí objemu${locGen} susp. po ${mOper === 'parciální' ? 'parc.' : 'subtot.'} menisektomii` : `${nameTitle}${operConc}`;
                
                let concSentence = baseConc;
                if (ruptConc) concSentence += ` ${ruptConc}`;
                if (extraConcStr) concSentence += (ruptConc ? `, ${extraConcStr}` : ` ${extraConcStr}`);
                concSentence = concSentence.replace(/\s+/g, ' ').trim() + '.';
                concMain.push({ type: 'frame', text: concSentence, tableId });
            }
        };

        // ═══ KOMPILÁTOR PRO KOLATERÁLNÍ VAZY (LCL, MCL) ═══
        const parseCollateralLigament = (prefix, nameTitle, tableId) => {
            const lRupt = ctx.text(`${prefix}_rupt`);
            const lLoc = ctx.text(`${prefix}_loc`);

            if (!lRupt || lRupt === '0') {
                reportOut.push({ type: 'frame', text: `${nameTitle} přiměřeného vzhledu bez známek léze.`, tableId: tableId, dimmed: true });
            } else {
                const distalRep = prefix === 'kn_lcl' ? 'při fibulárním úponu' : 'při tibiálním úponu';
                const distalConc = prefix === 'kn_lcl' ? 'fibulárního úponu' : 'tibiálního úponu';

                const locMapRep = { 'femorálně': 'při femorálním úponu', 'střed': 'v průběhu vazu', 'tibiálně': distalRep };
                const locMapConc = { 'femorálně': 'femorálního úponu', 'střed': 'v průběhu vazu', 'tibiálně': distalConc };
                
                let locRep = (lLoc && lLoc !== 'lokace...') ? ` ${locMapRep[lLoc]}` : '';
                let locConc = (lLoc && lLoc !== 'lokace...') ? ` ${locMapConc[lLoc]}` : '';

                let repStr = '';
                let concStr = '';

                if (lRupt === 'low-grade') {
                    repStr = `vaz je${locRep} s periligamentózním edémem, zachovanou kontinuitou vláken`;
                    concStr = `${nameTitle} s low-grade lézí (distenzí)${locConc}`;
                } else if (lRupt === 'parciální') {
                    repStr = `vaz je${locRep} se zvýšeným intrasubstanciálním signálem a drobným defektem kontinuity vláken`;
                    concStr = `${nameTitle} s parciální rupturou${locConc}`;
                } else if (lRupt === 'high-grade') {
                    repStr = `vaz je${locRep} nehomogenní se zřetelným zvýšením signálu a parciálním defektem kontinuity vláken`;
                    concStr = `${nameTitle} s high-grade parciální rupturou${locConc}`;
                } else if (lRupt === 'kompletní') {
                    repStr = `zřetelná diskontinuita všech vláken vazu${locRep} s defektem vyplněným tekutinou`;
                    concStr = `${nameTitle} s kompletní rupturou${locConc}`;
                } else if (lRupt === 'po starší') {
                    repStr = `vaz je${locRep} nepravidelně konturovaný a ztluštělý s chronickými pozánětlivými změnami bez přesvědčivého čerstvého edému`;
                    concStr = `${nameTitle} s chronickými poúrazovými změnami (st. p. starší ruptuře)${locConc}`;
                }

                reportOut.push({ type: 'frame', text: `${nameTitle}: ${repStr}.`, tableId: tableId });
                concMain.push({ type: 'frame', text: `${concStr}.`, tableId: tableId });
            }
        };

        // Generování kompartmentů
        buildCompartment('Laterální kompartment', 'kn_lfc', 'kn_ltc', 'Laterální kondyl femuru', 'Laterální plato tibie', 'knee_lat_comp_main', 'kn_lat_shared_ost');
        parseMeniscus('kn_lm', 'Laterální meniskus', 'laterálního menisku', 'LM', 'knee_lm_main');
        parseCollateralLigament('kn_lcl', 'Laterální kolaterální vaz', 'knee_lcl_main');

        buildCompartment('Mediální kompartment', 'kn_mfc', 'kn_mtc', 'Mediální kondyl femuru', 'Mediální plato tibie', 'knee_med_comp_main', 'kn_med_shared_ost');
        parseMeniscus('kn_mm', 'Mediální meniskus', 'mediálního menisku', 'MM', 'knee_mm_main');
        parseCollateralLigament('kn_mcl', 'Mediální kolaterální vaz', 'knee_mcl_main');

        // Jednotná věta pro gonartrózu dle osteofytů
        const ostLat = ctx.text('kn_lat_shared_ost');
        const ostMed = ctx.text('kn_med_shared_ost');
        const osteoRank = { '0': 0, 'I': 1, 'II': 2, 'III': 3 };
        const osteoSeverity = { 'I': 'Mírná gonartróza', 'II': 'Gonartróza', 'III': 'Pokročilá gonartróza' };
        if ((osteoRank[ostLat] || 0) > 0 || (osteoRank[ostMed] || 0) > 0) {
            const rLat = osteoRank[ostLat] || 0;
            const rMed = osteoRank[ostMed] || 0;
            let sentence = '';
            if (rLat > 0 && rMed > 0 && rLat === rMed) {
                sentence = `${osteoSeverity[ostLat]} oboustranně.`;
            } else if (rMed >= rLat && rMed > 0) {
                sentence = `${osteoSeverity[ostMed]} s převahou mediálně.`;
            } else {
                sentence = `${osteoSeverity[ostLat]} s převahou laterálně.`;
            }
            concMain.push({ type: 'frame', text: sentence, tableId: 'knee_joint_main' });
        }

        // ═══ KOMPILÁTOR PRO PŘEDNÍ ZKŘÍŽENÝ VAZ (ACL) ═══
        const aclRupt = ctx.text('kn_acl_rupt');
        const aclBml = ctx.text('kn_acl_bml');
        const aclMorf = ctx.text('kn_acl_morf');
        const aclPlast = ctx.text('kn_acl_plast');
        const aclVzhled = ctx.text('kn_acl_vzhled');
        const aclTunel = ctx.text('kn_acl_tunel');
        const aclKyklop = ctx.text('kn_acl_kyklop');

        const isAclPlastika = aclPlast && aclPlast !== '0';
        const isNativNormal = (!aclRupt || aclRupt === '0') && (!aclMorf || aclMorf === '0');

        if (isAclPlastika) {
            let pRep = [];
            let pConc = [];

            if (aclPlast === 'intaktní') {
                pRep.push('Náhrada předního zkříženého vazu vykazuje zachovalou kontinuitu, pravidelnou šíři, nízký signál');
                pConc.push('Intaktní plastika ACL');
            } else if (aclPlast === 'parc. léze') {
                pRep.push('Náhrada ACL se zvýšením intrasubstanciálního signálu a částečným defektem vláken');
                pConc.push('Parciální léze náhrady ACL');
            } else if (aclPlast === 'kompl. rupt.') {
                pRep.push('Náhrada ACL s úplnou diskontinuitou a dezintegrací vláken');
                pConc.push('Kompletní ruptura plastiky ACL');
            }

            if (aclVzhled && aclVzhled !== 'orientace') {
                if (aclVzhled === 'laxita') { pRep.push('průběh štěpu je laxní a zvlněný'); pConc.push('laxita štěpu'); }
                else if (aclVzhled === 'vertikální') pRep.push('průběh štěpu je nápadně strmější (vertikalizovaný)');
                else if (aclVzhled === 'horizontální') pRep.push('průběh štěpu je oploštělý (horizontalizovaný)');
                else if (aclVzhled === 'impingement') { pRep.push('ventrální okraj štěpu naléhá na strop interkondylární incisury se zvýšením signálu (impingement)'); pConc.push('impingement štěpu'); }
            }

            if (aclTunel && aclTunel !== '0') {
                if (aclTunel === 'širší F') pRep.push('femorální kostní tunel je mírně rozšířený');
                else if (aclTunel === 'širší T') pRep.push('tibiální kostní tunel je rozšířený');
                else if (aclTunel === 'ventrální T') { pRep.push('ústí tibiálního tunelu je uloženo ventrálně (před Blumensaatovou linií)'); pConc.push('ventrální umístění T tunelu'); }
            }

            if (aclKyklop && aclKyklop !== '0') {
                if (aclKyklop === '+') {
                    pRep.push('oválný okrsek nízké SI před tib. okrajem náhrady');
                    pConc.push('kyklop léze');
                } else if (aclKyklop === '+/-') {
                    pRep.push('nepravidelný okrsek smíšené SI před tib. okrajem náhrady');
                    pConc.push('vazivový nepravidelný okrsek při tibiálním okraji náhrady: v dif.dg. porušená vlákna či kyklop léze');
                }
            }

            reportOut.push({ type: 'frame', text: pRep.join(', ') + '.', tableId: 'knee_acl_main' });
            concMain.push({ type: 'frame', text: pConc.join(', ') + '.', tableId: 'knee_acl_main' });

        } else {
            if (isNativNormal && (!aclBml || aclBml === 'skelet 0')) {
                reportOut.push({ type: 'frame', text: 'Přední zkřížený vaz přiměřeného vzhledu.', tableId: 'knee_acl_main', dimmed: true });
            } else {
                let nRep = [];
                let concParts = [];

                let isRuptured = aclRupt && aclRupt !== '0';
                if (isRuptured) {
                    if (aclRupt === 'low-grade') {
                        nRep.push('vlákna vazu se zvýšenou intenzitou signálu, jejich kontinuita je však zachována');
                        concParts.push('s low-grade parciální lézí');
                    } else if (aclRupt === 'parciální') {
                        nRep.push('vaz je prosáklý se zvýšeným intrasubstanciálním signálem a parc. defektem kontinuity vláken');
                        concParts.push('s parciální rupturou');
                    } else if (aclRupt === 'high-grade') {
                        nRep.push('vaz je ztenčený, se zvýšeným intrasubstanciálním signálem a parciálním defektem kontinuity vláken');
                        concParts.push('s high-grade rupturou');
                    } else if (aclRupt === 'kompletní') {
                        nRep.push('zřetelná diskontinuita všech vláken s retrakcí a horizontalizací pahýlu, defekt je vyplněn edémem a tekutinou');
                        concParts.push('s kompletní rupturou');
                    }
                }

                if (aclBml && aclBml !== 'skelet 0') {
                    let bmlRepMap = {
                        'kont. edém': 'edém dorzálního plata tibie a ventrálního LFC',
                        '+ fr. F': 'edém dorzálního plata tibie s osteochondrální impresní frakturou LFC',
                        '+ fr. T': 'edém ventrálního LFC s impresní frakturou dorzálního plata tibie',
                        '+ fr. F+T': 'impresní fraktura LFC i dorzálního plata tibie s rozsáhlým edémem v obou lokalizacích'
                    };
                    let bmlConcMap = {
                        'kont. edém': 's postkontuzním pivot-shift edémem later. femuru a dorz. tibie',
                        '+ fr. F': 's pivot-shift edémem a impresní frakturou LFC',
                        '+ fr. T': 's pivot-shift edémem a impresní frakturou dorzálního plata tibie',
                        '+ fr. F+T': 's pivot-shift impresní frakturou LFC i dorzálního plata tibie'
                    };

                    let bmlRep = bmlRepMap[aclBml];
                    if (isRuptured) {
                        nRep[0] += `, je přítomen ${bmlRep}`;
                    } else {
                        nRep.push(`vaz je intaktní, v okolí je však přítomen ${bmlRep}`);
                        concParts.push('intaktní');
                    }
                    
                    concParts.push(bmlConcMap[aclBml]);
                }

                if (aclMorf && aclMorf !== '0') {
                    if (aclMorf === 'zvlnění') { 
                        nRep.push('ochablého a zvlněného průběhu'); 
                        if (!isRuptured) concParts.push('se zvlněným průběhem (insuficience)'); 
                    } else if (aclMorf === 'elongace') { 
                        nRep.push('elongovaný průběh'); 
                        if (!isRuptured) concParts.push('s elongací'); 
                    } else if (aclMorf === 'mukoid. deg.') {
                        nRep.push('difuzně ztluštělý s longitudinálním prosáknutím při zachované kontinuitě');
                        concParts.push('s mukoidní degenerací');
                    } else if (aclMorf === 'ganglion') {
                        nRep.push('uvnitř s tekutinovou formací roztlačující vlákna');
                        concParts.push('s intraligamentózní gangliovou cystou');
                    }
                }

                let finalReportText = `Přední zkřížený vaz: ${nRep.join(', ')}.`;
                finalReportText = finalReportText.replace('Přední zkřížený vaz: vaz je', 'Přední zkřížený vaz je');

                reportOut.push({ type: 'frame', text: finalReportText.charAt(0).toUpperCase() + finalReportText.slice(1), tableId: 'knee_acl_main' });
                
                let concSentence = 'Přední zkřížený vaz';
                if (concParts.length === 1) {
                    concSentence += ` ${concParts[0]}`;
                } else if (concParts.length > 1) {
                    let last = concParts.pop();
                    concSentence += ` ${concParts.join(', ')} a ${last}`;
                }
                concSentence = concSentence.replace('intaktní a s', 'intaktní, s');
                concSentence += '.';

                concMain.push({ type: 'frame', text: concSentence, tableId: 'knee_acl_main' });
            }
        }

        // ═══ KOMPILÁTOR PRO ZADNÍ ZKŘÍŽENÝ VAZ (PCL) ═══
        const pclRupt = ctx.text('kn_pcl_rupt');
        const pclBml = ctx.text('kn_pcl_bml');
        const pclMorf = ctx.text('kn_pcl_morf');

        const isPclNormal = (!pclRupt || pclRupt === '0') && (!pclMorf || pclMorf === '0') && (!pclBml || pclBml === 'skelet 0');

        if (isPclNormal) {
            reportOut.push({ type: 'frame', text: 'Zadní zkřížený vaz přiměřeného vzhledu.', tableId: 'knee_pcl_main', dimmed: true });
        } else {
            let nRepPcl = [];
            let concPartsPcl = [];

            let isPclRuptured = pclRupt && pclRupt !== '0';
            if (isPclRuptured) {
                if (pclRupt === 'low-grade') {
                    nRepPcl.push('vlákna vazu se zvýšenou SI, kontinuita je zachována');
                    concPartsPcl.push('s low-grade parciální lézí');
                } else if (pclRupt === 'parciální') {
                    nRepPcl.push('vaz je se zvýšeným intrasubstanciálním signálem a parc. defektem kontinuity vláken');
                    concPartsPcl.push('s parciální rupturou');
                } else if (pclRupt === 'high-grade') {
                    nRepPcl.push('vaz je difuzně ztluštělý, s parciálním defektem kontinuity vláken');
                    concPartsPcl.push('s high-grade parciální rupturou');
                } else if (pclRupt === 'kompletní') {
                    nRepPcl.push('zřetelná diskontinuita vláken vazu s retrakcí pahýlu');
                    concPartsPcl.push('s kompletní rupturou');
                }
            }

            if (pclBml && pclBml !== 'skelet 0') {
                let bmlRepMapPcl = {
                    'BML +': 'edém ventrální části kondylu femuru i plata tibie',
                    'kontuze femuru': 'edém a postkontuzní změny skeletu femorálního kondylu',
                    'avulze tibie': 'avulzní fraktura kostního tibiálního úponu vazu'
                };
                let bmlConcMapPcl = {
                    'BML +': 's postkontuzním edémem ventrálního femoru i tibie',
                    'kontuze femuru': 's postkontuzním edémem femuru',
                    'avulze tibie': 's avulzní frakturou tibiálního úponu'
                };

                let bmlRep = bmlRepMapPcl[pclBml];
                if (isPclRuptured) {
                    nRepPcl[0] += `, je přítomen ${bmlRep}`;
                } else {
                    nRepPcl.push(`vaz je intaktní, v okolí je však přítomen ${bmlRep}`);
                    concPartsPcl.push('intaktní');
                }
                
                concPartsPcl.push(bmlConcMapPcl[pclBml]);
            }

            if (pclMorf && pclMorf !== '0') {
                if (pclMorf === 'elongace') { 
                    nRepPcl.push('vaz vykazuje elongovaný a ochablý průběh'); 
                    if (!isPclRuptured) concPartsPcl.push('s elongací'); 
                } else if (pclMorf === 'mukoid. deg.') {
                    nRepPcl.push('vaz je difuzně ztluštělý s intraligamentózním zvýšením signálu charakteru mukoidní degenerace');
                    concPartsPcl.push('s mukoidní degenerací');
                } else if (pclMorf === 'cysta') {
                    nRepPcl.push('v těsné blízkosti či uvnitř vazu je přítomna gangliová cysta');
                    concPartsPcl.push('s gangliovou cystou');
                }
            }

            let finalReportTextPcl = `Zadní zkřížený vaz: ${nRepPcl.join(', ')}.`;
            finalReportTextPcl = finalReportTextPcl.replace('Zadní zkřížený vaz: vaz je', 'Zadní zkřížený vaz je');

            reportOut.push({ type: 'frame', text: finalReportTextPcl.charAt(0).toUpperCase() + finalReportTextPcl.slice(1), tableId: 'knee_pcl_main' });
            
            let concSentencePcl = 'Zadní zkřížený vaz';
            if (concPartsPcl.length === 1) {
                concSentencePcl += ` ${concPartsPcl[0]}`;
            } else if (concPartsPcl.length > 1) {
                let lastPcl = concPartsPcl.pop();
                concSentencePcl += ` ${concPartsPcl.join(', ')} a ${lastPcl}`;
            }
            concSentencePcl = concSentencePcl.replace('intaktní a s', 'intaktní, s');
            concSentencePcl += '.';

            concMain.push({ type: 'frame', text: concSentencePcl, tableId: 'knee_pcl_main' });
        }

        // ═══ KOMPILÁTOR PRO MĚKKÉ TKÁNĚ A OKOLÍ ═══
        const stQuad = ctx.text('kn_st_quad');
        const stPes = ctx.text('kn_st_pes');
        const stItb = ctx.text('kn_st_itb');
        const stPlc = ctx.text('kn_st_plc');
        const stPmc = ctx.text('kn_st_pmc');
        const mGastro = ctx.text('kn_m_gastro');
        const mPopl = ctx.text('kn_m_popl');
        const mBiceps = ctx.text('kn_m_biceps');
        const bPrepat = ctx.text('kn_b_prepat');
        const bInfrapDeep = ctx.text('kn_b_infrap_deep');
        const bInfrapSub = ctx.text('kn_b_infrap_sub');
        const bMcl = ctx.text('kn_b_mcl');
        const gTf = ctx.text('kn_g_tf');

        const isStNormal = (!stQuad || stQuad === '0') && (!stPes || stPes === '0') && 
                           (!stItb || stItb === '0') && (!stPlc || stPlc === '0') && 
                           (!stPmc || stPmc === '0') && 
                           (!mGastro || mGastro === '0') && (!mPopl || mPopl === '0') && (!mBiceps || mBiceps === '0') &&
                           (!bPrepat || bPrepat === '0') && (!bInfrapDeep || bInfrapDeep === '0') &&
                           (!bInfrapSub || bInfrapSub === '0') && (!bMcl || bMcl === '0') && (!gTf || gTf === '0');

        let finalSoftText = '';
        let finalBoneText = '';
        let isSoftDimmed = false;
        let isBoneDimmed = false;

        if (isStNormal) {
            finalSoftText = '';
            isSoftDimmed = true;
        } else {
            let stRepParts = [];
            
            if (stQuad && stQuad !== '0') {
                if (stQuad === 'tendinopatie') { stRepParts.push('šlacha m. quadriceps femoris je ztluštělá se zvýšeným signálem, bez přerušení vláken'); concMain.push({ type: 'frame', text: 'Tendinopatie šlachy m. quadriceps femoris.', tableId: 'knee_soft_main' }); }
                else if (stQuad === 'parc. ruptura') { stRepParts.push('parciální defekt a edém vláken šlachy m. quadriceps femoris'); concMain.push({ type: 'frame', text: 'Parciální ruptura šlachy m. quadriceps femoris.', tableId: 'knee_soft_main' }); }
                else if (stQuad === 'kompl. ruptura') { stRepParts.push('kompletní diskontinuita šlachy m. quadriceps femoris s retrakcí proximálního pahýlu'); concMain.push({ type: 'frame', text: 'Kompletní ruptura šlachy m. quadriceps femoris.', tableId: 'knee_soft_main' }); }
            }

            if (stPes && stPes !== '0') {
                if (stPes === 'edém/bursitida') { stRepParts.push('tekutinová kolekce a edém podél úponu pes anserinus superficialis'); concMain.push({ type: 'frame', text: 'Pes anserinus bursitida.', tableId: 'knee_soft_main' }); }
                else if (stPes === 'tendinopatie') { stRepParts.push('ztluštění a hyperintenzita úponových šlach pes anserinus'); concMain.push({ type: 'frame', text: 'Tendinopatie úponu pes anserinus.', tableId: 'knee_soft_main' }); }
            }

            if (stItb && stItb !== '0') {
                if (stItb === 'friction syndrom') { stRepParts.push('ložiskový edém měkkých tkání interponovaných mezi IT traktem a laterálním epikondylem femuru'); concMain.push({ type: 'frame', text: 'Iliotibial band (ITB) friction syndrom.', tableId: 'knee_soft_main' }); }
                else if (stItb === 'tendinopatie') { stRepParts.push('ztluštění IT traktu při tibiálním úponu na Gerdyho hrbolek'); concMain.push({ type: 'frame', text: 'Entezopatie úponu IT traktu.', tableId: 'knee_soft_main' }); }
                else if (stItb === 'parc. léze') { stRepParts.push('parciální rozvláknění IT traktu s okolním edémem'); concMain.push({ type: 'frame', text: 'Parciální léze iliotibiálního traktu.', tableId: 'knee_soft_main' }); }
            }

            if (stPlc && stPlc !== '0') {
                if (stPlc === 'edém/distenze') { stRepParts.push('periligamentózní edém a distenze struktur posterolaterálního rohu'); concMain.push({ type: 'frame', text: 'Low-grade léze (distenze) struktur posterolaterálního rohu (PLC).', tableId: 'knee_soft_main' }); }
                else if (stPlc === 'parc. léze') { stRepParts.push('nehomogenita a částečný defekt struktur posterolaterálního rohu vč. šlachy m. popliteus'); concMain.push({ type: 'frame', text: 'High-grade parciální léze struktur posterolaterálního rohu (PLC).', tableId: 'knee_soft_main' }); }
                else if (stPlc === 'kompl. léze') { stRepParts.push('zřetelná diskontinuita struktur posterolaterálního rohu s masivním edémem'); concMain.push({ type: 'frame', text: 'Kompletní léze struktur posterolaterálního rohu (PLC).', tableId: 'knee_soft_main' }); }
            }

            if (stPmc && stPmc !== '0') {
                if (stPmc === 'edém/distenze') { stRepParts.push('edém a distenze tkání posteromediálního rohu (zejm. v průběhu POL a úponu semimembranosu)'); concMain.push({ type: 'frame', text: 'Low-grade léze (distenze) struktur posteromediálního rohu (PMC).', tableId: 'knee_soft_main' }); }
                else if (stPmc === 'parc. léze') { stRepParts.push('parciální defekt a vysoká SI struktur posteromediálního rohu'); concMain.push({ type: 'frame', text: 'High-grade parciální léze struktur posteromediálního rohu (PMC).', tableId: 'knee_soft_main' }); }
                else if (stPmc === 'kompl. léze') { stRepParts.push('kompletní diskontinuita struktur posteromediálního rohu'); concMain.push({ type: 'frame', text: 'Kompletní léze struktur posteromediálního rohu (PMC).', tableId: 'knee_soft_main' }); }
            }

            if (mGastro === '+') { stRepParts.push('edém a ložisková trhlina myotendinózní junkce caput mediale m. gastrocnemius s okolní tekutinou'); concMain.push({ type: 'frame', text: 'Parciální ruptura caput mediale m. gastrocnemius (Tennis leg).', tableId: 'knee_soft_main' }); }
            if (mPopl === '+') { stRepParts.push('intramuskulární edém a rozvláknění svalového bříška m. popliteus'); concMain.push({ type: 'frame', text: 'Parciální ruptura m. popliteus.', tableId: 'knee_soft_main' }); }
            if (mBiceps === '+') { stRepParts.push('edém a částečný defekt myotendinózní junkce distálního bicepsu femoris'); concMain.push({ type: 'frame', text: 'Parciální ruptura svalového bříška / úponu m. biceps femoris.', tableId: 'knee_soft_main' }); }

            if (bPrepat === '+') { stRepParts.push('ohraničená kolekce tekutiny s reaktivním edémem stěny v prepatelární burze'); concMain.push({ type: 'frame', text: 'Prepatelární bursitida.', tableId: 'knee_soft_main' }); }
            if (bInfrapDeep === '+') { stRepParts.push('tekutina v hluboké infrapatelární burze mezi tibií a distální patelární šlachou'); concMain.push({ type: 'frame', text: 'Hluboká infrapatelární bursitida.', tableId: 'knee_soft_main' }); }
            if (bInfrapSub === '+') { stRepParts.push('kolekce tekutiny v podkoží před distální patelární šlachou a tuberositas tibiae'); concMain.push({ type: 'frame', text: 'Subkutánní infrapatelární bursitida.', tableId: 'knee_soft_main' }); }
            if (bMcl === '+') { stRepParts.push('tekutinová kolekce uložená mezi povrchovou a hlubokou vrstvou mediálního kolaterálního vazu'); concMain.push({ type: 'frame', text: 'Bursitida v oblasti MCL.', tableId: 'knee_soft_main' }); }
            if (gTf === '+') { stRepParts.push('laločnatá cystická formace vycházející z proximálního tibiofibulárního skloubení'); concInc.push({ type: 'frame', text: 'Gangliová cysta tibiofibulárního skloubení.', tableId: 'knee_soft_main' }); }

            if (stRepParts.length > 0) {
                let finalStRep = stRepParts.join(', ');
                finalStRep = finalStRep.charAt(0).toUpperCase() + finalStRep.slice(1) + '.';
                finalSoftText = `Měkké tkáně: ${finalStRep}`;
            }
        }

        // ═══ KOMPILÁTOR PRO SKELET A LÉZE ═══
        const bnTyp = ctx.text('kn_bn_typ');
        const bnLoc = ctx.text('kn_bn_loc');
        const bnSize = ctx.field('kn_bn_size');
        const bnEdema = ctx.text('kn_bn_edema');

        if (bnTyp && bnTyp !== '0') {
            let repText = "";
            const locMap = { 'femur': 've femuru', 'tibie': 'v tibii', 'fibuly': 've fibule', 'patella': 'v patelle' };
            let locText = (bnLoc && bnLoc !== '0') ? ` ${locMap[bnLoc] || bnLoc}` : "";
            
            let sizeText = "";
            if (bnSize) {
                let dimLabel = bnSize.includes('x') ? 'rozměru' : 'velikosti';
                sizeText = ` ${dimLabel} cca ${bnSize} mm`;
            }
            
            let edemaRep = "";
            if (bnEdema === 's edémem') edemaRep = ' s reaktivním edémem v okolí';
            else if (bnEdema === 'bez edému') edemaRep = ' bez reaktivního edému';
            
            if (bnTyp === 'Enchondrom') {
                repText = `Laločnaté ložisko s vysokým T2/PD signálem a okrsky výpadků${locText}${sizeText}${edemaRep}.`;
            } else if (bnTyp === 'NOF / FCD') {
                repText = `Kortikálně-subkortikální laločnaté ložisko se sklerotickým lemem${locText}${sizeText}${edemaRep}.`;
            } else if (bnTyp === 'Osteochondrom') {
                repText = `Kostní prominence s plynulým přechodem kortikalis a spongiózy${locText}${sizeText}${edemaRep}, s chrupavčitou čepičkou (osteochondrom).`;
            } else if (bnTyp === 'Kostní infarkt') {
                repText = `Okrsek zachovalého signálu tuku se serpiginózním lemem${locText}${sizeText}${edemaRep}.`;
            } else if (bnTyp === 'Hemangiom') {
                repText = `Hyperintenzní ložisko v T1 i T2 s trabekulární strukturou${locText}${sizeText}${edemaRep}.`;
            } else {
                repText = `Ve skeletu${locText} je patrné ložisko${sizeText}${edemaRep}.`;
            }

            finalBoneText = repText;
            
            let concLoc = (bnLoc && bnLoc !== '0') ? `${locMap[bnLoc] || bnLoc}` : "ve skeletu";
            let concEdema = bnEdema === 's edémem' ? 's edémem' : 'bez edému';
            
            const typGenitive = {
                'Enchondrom': 'enchondromu',
                'NOF / FCD': 'NOF / FCD',
                'Osteochondrom': 'osteochondromu',
                'Kostní infarkt': 'kostního infarktu',
                'Hemangiom': 'hemangiomu'
            };
            
            let concText = `Ložisko ${concLoc} ${concEdema} charakteru ${typGenitive[bnTyp] || bnTyp.toLowerCase()}.`;
            
            if (bnEdema === 's edémem') {
                concMain.push({ type: 'frame', text: concText, tableId: 'knee_bones_main' });
            } else {
                concInc.push({ type: 'frame', text: concText, tableId: 'knee_bones_main' });
            }
        } else {
            finalBoneText = '';
            isBoneDimmed = true;
        }

        const combinedStBnText = `${finalSoftText} ${finalBoneText}`.trim();
        if (combinedStBnText !== '') {
            reportOut.push({ type: 'frame', text: combinedStBnText, tableId: 'knee_soft_main', dimmed: isSoftDimmed && isBoneDimmed });
        }

        const conclusionOrder = {
            'knee_acl_main': 1,
            'knee_pcl_main': 2,
            'knee_mm_main': 3,
            'knee_mcl_main': 4,
            'knee_med_comp_main': 5,
            'knee_lm_main': 6,
            'knee_lcl_main': 7,
            'knee_lat_comp_main': 8,
            'knee_patella_main': 9,
            'knee_joint_main': 10,
            'knee_soft_main': 11,
            'knee_bones_main': 12
        };

        const sortConclusions = (a, b) => {
            const orderA = conclusionOrder[a.tableId] || 99;
            const orderB = conclusionOrder[b.tableId] || 99;
            return orderA - orderB;
        };

        if (concMain.length === 0) {
            concMain.push({ type: 'frame', text: 'Přiměřený nález. Menisky, vazy, chrupavky bez signifikantní patologie.' });
        }

        concMain.sort(sortConclusions);
        concInc.sort(sortConclusions);

        return { report: reportOut, conclusion: { main: concMain, incidental: concInc } };
    }
};