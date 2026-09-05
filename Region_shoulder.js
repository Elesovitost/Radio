const RegionShoulder = {
    title: 'MR Ramene',
    reportLayout: 'block',
    layout: (helpers) => {
        
        return [
            // --- AC KLOUB A AKROMION ---
            helpers.TableMain('shoulder_ac_main', 'AC kloub a Akromion', [
                helpers.Table2colNormal('shoulder_ac_table', '', [
                    [ 'Tvar akromia:', { btn: 'sh_ac_tvar', states: ['Typ I (ploché)', 'Typ II (křivka)', 'Typ III (hák)'] } ],
                    [ 'AC artróza:', { btn: 'sh_ac_art', states: ['0', 'mírná', 'střední', 'pokročilá'] } ],
                    [ 'AC luxace:', { btn: 'sh_ac_lux', states: ['0', 'Tossy I', 'Tossy II', 'Tossy III'] } ],
                    [ 'AC edém (BML):', { btn: 'sh_ac_edem', states: ['0', '+', '++', 'DCO'] } ],
                    [ 'Os acromiale:', { btn: 'sh_ac_os', states: ['0', 'přítomno', 'edém'] } ],
                    [ 'Impingement:', { btn: 'sh_ac_impingement', states: ['0', 'subakromiální', 'subkorakoidní'] } ]
                ])
            ]),

            // --- GH KLOUB A BURZY ---
            helpers.TableMain('shoulder_bursa_main', 'GH kloub a Burzy', [
                helpers.Table2colNormal('shoulder_bursa_table', '', [
                    [ 'SASD burza:', { btn: 'sh_gh_sasd', states: ['0', 'mírná náplň', 'náplň', 'bursitida', 'výrazná bursitida'] } ],
                    [ 'Subkorak. burza:', { btn: 'sh_gh_subcor', states: ['0', 'tekutina', 'bursitida'] } ],
                    [ 'GH náplň:', { btn: 'sh_gh_napln', states: ['0', '+', '++', '+++'] } ],
                    [ 'Synovitida:', { btn: 'sh_gh_synov', states: ['0', '+', '++', 'Chondromatóza'] } ]
                ])
            ]),

            // --- ROTÁTOROVÁ MANŽETA ---
            helpers.TableMain('shoulder_rm_main', 'Rotátorová manžeta', [
                helpers.TableGrid('sh_ssp_table', 'Supraspinatus (SSP)', [
                    [ ['Léze:', { btn: 'sh_ssp_stav', states: ['0', 'tendinóza', 'gr. I', 'gr. II', 'gr. III', 'kompletní'] }], { btn: 'sh_ssp_plocha', states: ['plocha...', 'A', 'B'] }, { btn: 'sh_ssp_rozmer', states: ['rozměr...', '< 1 cm', '1-3 cm', '> 3 cm'] } ],
                    [ '', { btn: 'sh_ssp_retr', states: ['retrakce?', '+', '++', '+++'] }, { btn: 'sh_ssp_atrofie', states: ['atrofie?', '+', '++'] } ],
                    [ ['Kalcif.:', { btn: 'sh_ssp_kalcif', states: ['0', 'HADD', 'dystrof.'] }], '', '' ]
                ]),
                helpers.TableGrid('sh_isp_table', 'Infraspinatus (ISP)', [
                    [ ['Léze:', { btn: 'sh_isp_stav', states: ['0', 'tendinóza', 'gr. I', 'gr. II', 'gr. III', 'kompletní'] }], { btn: 'sh_isp_plocha', states: ['plocha...', 'A', 'B'] }, { btn: 'sh_isp_rozmer', states: ['rozměr...', '< 1 cm', '1-3 cm', '> 3 cm'] } ],
                    [ '', { btn: 'sh_isp_retr', states: ['retrakce?', '+', '++', '+++'] }, { btn: 'sh_isp_atrofie', states: ['atrofie?', '+', '++'] } ],
                    [ ['Kalcif.:', { btn: 'sh_isp_kalcif', states: ['0', 'HADD', 'dystrof.'] }], '', '' ]
                ]),
                helpers.TableGrid('sh_ssc_table', 'Subscapularis (SSC)', [
                    [ ['Léze:', { btn: 'sh_ssc_stav', states: ['0', 'tendinóza', 'gr. I', 'gr. II', 'gr. III', 'kompletní'] }], { btn: 'sh_ssc_plocha', states: ['plocha...', 'A', 'B'] }, { btn: 'sh_ssc_rozmer', states: ['rozměr...', '< 1 cm', '1-3 cm', '> 3 cm'] } ],
                    [ '', { btn: 'sh_ssc_retr', states: ['retrakce?', '+', '++', '+++'] }, { btn: 'sh_ssc_atrofie', states: ['atrofie?', '+', '++'] } ],
                    [ ['Kalcif.:', { btn: 'sh_ssc_kalcif', states: ['0', 'HADD', 'dystrof.'] }], '', '' ]
                ]),
                helpers.Table1col('sh_rm_vlastni_table', [
                    { field: 'text', id: 'sh_rm_custom_desc', placeholder: 'vlastní popis...' },
                    { field: 'text', id: 'sh_rm_custom_conc', placeholder: 'vlastní závěr...' }
                ])
            ]),
            
            helpers.TableMain('shoulder_tm_main', 'Teres Minor (TM)', [
                helpers.Table2colNormal('sh_tm_table', '', [
                    [ 'Stav šlachy:', { btn: 'sh_tm_stav', states: ['0', 'tendinóza', 'parc. ruptura', 'kompletní'] } ],
                    [ 'Tuk. degen. / atrofie:', { btn: 'sh_tm_gout', states: ['0', '+', '++'] } ]
                ])
            ]),

            // --- BICEPS A BICEPSOVÁ KLADKA ---
            helpers.TableMain('shoulder_lhb_main', 'LHBT', [
                helpers.Table2colNormal('shoulder_lhb_table', '', [
                    [ 'Stav:', { btn: 'sh_lhb_stav', states: ['0', 'tendinóza', 'gr. I', 'gr. II', 'gr. III', 'kompletní'] } ],
                    [ 'Poloha:', { btn: 'sh_lhb_poloha', states: ['in situ', 'pulley', 'subluxace', 'luxace', 'retrakce'] } ]
                ])
            ]),

            // --- LABRUM A LIGAMENTA ---
            helpers.TableMain('shoulder_labrum_main', 'Glenoidální labrum', [
                helpers.Table2colNormal('sh_lab_table', '', [
                    [ 'Horní labrum:', { btn: 'sh_lab_sup', states: ['0', 'degenerace', 'léze', 'SLAP I', 'SLAP II', 'komplexní SLAP'] } ],
                    [ 'Přední labrum:', { btn: 'sh_lab_ant', states: ['0', 'degenerace', 'léze', 'Bankart', 'ALPSA', 'Perthes'] } ],
                    [ 'Zadní labrum:', { btn: 'sh_lab_pos', states: ['0', 'degenerace', 'léze', 'Reverse Bankart'] } ],
                    [ 'Paralabrální cysta:', { btn: 'sh_lab_cysta', states: ['0', 'spinoglenoidní', 'supraskapulární'] } ]
                ])
            ]),

            // --- SKELET A CHRUPAVKY ---
            helpers.TableMain('shoulder_bones_main', 'Skelet a chrupavky', [
                helpers.Table2colNormal('sh_bn_table', '', [
                    [ 'Defekt hlavice:', { btn: 'sh_bn_hlav', states: ['0', 'Hill-Sachs', 'kontuzní edém'] } ],
                    [ 'Defekt glenoidu:', { btn: 'sh_bn_glen', states: ['0', 'Bony Bankart', 'kontuzní edém'] } ],
                    [ 'GH chondropatie:', { btn: 'sh_bn_chr', states: ['0', 'Gr. 1', 'Gr. 2', 'Gr. 3', 'Gr. 4'] } ],
                    [ 'Kostní léze:', { btn: 'sh_bn_lesion', states: ['0', 'Enchondrom', 'Geoda', 'Hemangiom'] } ]
                ])
            ])
        ];
    },

    compile: (ctx) => {
        let reportOut = [{ type: 'heading', text: 'Rameno:', action: 'open-region', regionId: 'shoulder' }];
        let concMain = [];
        let concInc = [];
        const cap = (s) => s && s.charAt(0).toUpperCase() + s.slice(1);

        // --- 1. AC KLOUB A AKROMION ---
        let acParts = [];
        let isAcNormal = true;
        let impCauses = [];
        let acStandaloneConc = [];

        const acTvar = ctx.text('sh_ac_tvar');
        if (acTvar && acTvar.includes('Typ') && acTvar !== 'Typ I (ploché)') {
            acParts.push(`akromion ${acTvar}`);
            if (acTvar.includes('Typ III')) {
                impCauses.push('akromia typu III');
                isAcNormal = false;
            }
        }

        const acArt = ctx.text('sh_ac_art');
        if (acArt && acArt !== '0') {
            acParts.push(`${acArt} hypertrofická AC artróza`);
            impCauses.push(`AC artrózy (${acArt})`);
            isAcNormal = false;
        }

        const acLux = ctx.text('sh_ac_lux');
        if (acLux && acLux !== '0') {
            if (acLux === 'Tossy I') {
                acParts.push('edém pouzdra a AC vazů bez dislokace klíčku s intaktními CC vazy');
                acStandaloneConc.push('distorze AC kloubu (Tossy I)');
            } else if (acLux === 'Tossy II') {
                acParts.push('ruptura AC vazů se subluxací klíčku a edémem okolních měkkých tkání, CC vazy zachovány');
                acStandaloneConc.push('subluxace AC kloubu (Tossy II)');
            } else if (acLux === 'Tossy III') {
                acParts.push('kompletní ruptura AC i CC vazů s kraniální luxací distálního klíčku');
                acStandaloneConc.push('luxace AC kloubu (Tossy III)');
            }
            isAcNormal = false;
        }

        const acEdem = ctx.text('sh_ac_edem');
        if (acEdem && acEdem !== '0') {
            if (acEdem === 'DCO') {
                acParts.push('edém a resorpce distálního konce klíčku');
                acStandaloneConc.push('distální klavikulární osteolýza (DCO)');
            } else {
                const edemStupen = acEdem === '+' ? 'mírný' : 'výrazný';
                acParts.push(`${edemStupen} subchondrální edém kostní dřeně`);
                acStandaloneConc.push(`${edemStupen} aktivní edém AC kloubu`);
            }
            isAcNormal = false;
        }

        const acOs = ctx.text('sh_ac_os');
        if (acOs && acOs !== '0') {
            if (acOs === 'přítomno') {
                acParts.push('přítomno os acromiale bez edému');
                impCauses.push('os acromiale');
            } else {
                acParts.push('přítomno os acromiale s reaktivním edémem přilehlých kostí');
                impCauses.push('symptomatického os acromiale');
            }
            isAcNormal = false;
        }

        const acImp = ctx.text('sh_ac_impingement');
        if (acImp && acImp !== '0') {
            let causeStr = impCauses.length > 0 ? ` na podkladě ${impCauses.join(', ')}` : '';
            acParts.push(`${acImp} impingement syndrom s redukcí prostoru pro manžetu`);
            
            let finalConc = `${cap(acImp)} impingement syndrom${causeStr}`;
            if (acStandaloneConc.length > 0) {
                finalConc += `, přidružena ${acStandaloneConc.join(', ')}`;
            }
            concMain.push({ type: 'frame', text: finalConc + '.', tableId: 'shoulder_ac_main' });
            isAcNormal = false;
        } else if (!isAcNormal) {
            let allFindings = [];
            if (acArt && acArt !== '0') allFindings.push(`AC artróza (${acArt})`);
            if (acTvar && acTvar.includes('Typ III')) allFindings.push('akromion typu III');
            if (acOs && acOs !== '0') allFindings.push(acOs === 'přítomno' ? 'os acromiale' : 'symptomatické os acromiale');
            allFindings = allFindings.concat(acStandaloneConc);

            if (allFindings.length > 0) {
                concMain.push({ type: 'frame', text: cap(allFindings.join(', ')) + '.', tableId: 'shoulder_ac_main' });
            }
        }

        if (isAcNormal) {
            reportOut.push({ type: 'frame', text: 'AC skloubení bez významných degenerativních změn, prostor pod klenbou bez výraznějšího zúžení.', tableId: 'shoulder_ac_main', dimmed: true });
        } else {
            let acText = 'AC kloub a akromion: ' + acParts.join(', ') + '.';
            reportOut.push({ type: 'frame', text: acText, tableId: 'shoulder_ac_main' });
        }

        // --- 2. GH KLOUB A BURZY ---
        let bursaParts = [];
        let bursaConc = [];
        
        const ghNapln = ctx.text('sh_gh_napln');
        if (ghNapln && ghNapln !== '0') {
            const mapNapln = { '+': 'mírně zvýšené', '++': 'středně zvýšené', '+++': 'výrazně zvýšené' };
            const mapNaplnConc = { '+': 'Mírně zvýšená GH náplň', '++': 'Středně zvýšená GH náplň', '+++': 'Výrazně zvýšená GH náplň' };
            bursaParts.push(`${mapNapln[ghNapln]} množství tekutiny v GH kloubu`);
            bursaConc.push(mapNaplnConc[ghNapln]);
        }

        const ghSasd = ctx.text('sh_gh_sasd');
        if (ghSasd && ghSasd !== '0') {
            if (ghSasd === 'mírná náplň') bursaParts.push('mírná náplň SASD burzy');
            else if (ghSasd === 'náplň') { bursaParts.push('zvýšená náplň SASD burzy'); bursaConc.push('Zvýšená náplň SASD burzy'); }
            else if (ghSasd === 'bursitida') { bursaParts.push('náplň a edém stěn SASD burzy'); bursaConc.push('SASD bursitida'); }
            else if (ghSasd === 'výrazná bursitida') { bursaParts.push('výrazná náplň a zesílení stěn SASD burzy'); bursaConc.push('Výrazná SASD bursitida'); }
        }

        const ghSubcor = ctx.text('sh_gh_subcor');
        if (ghSubcor && ghSubcor !== '0') {
            if (ghSubcor === 'tekutina') bursaParts.push('mírná tekutina v subkorakoidní burze');
            else if (ghSubcor === 'bursitida') { bursaParts.push('náplň a edém stěn subkorakoidní burzy'); bursaConc.push('Subkorakoidní bursitida'); }
        }
        
        const ghSynov = ctx.text('sh_gh_synov');
        if (ghSynov && ghSynov !== '0') {
            if (ghSynov === '+') bursaParts.push('mírná hypertrofie synovie');
            else if (ghSynov === '++') { bursaParts.push('výrazná proliferace synovie'); bursaConc.push('Synovitida GH kloubu'); }
            else if (ghSynov === 'Chondromatóza') { bursaParts.push('v kloubu vícečetná tělíska chondroidního signálu'); bursaConc.push('Synoviální chondromatóza GH kloubu'); }
        }

        if (bursaParts.length === 0) {
            reportOut.push({ type: 'frame', text: 'Kloubní dutina a burzy bez patologické tekutinové náplně.', tableId: 'shoulder_bursa_main', dimmed: true });
        } else {
            let bursaText = 'Tekutina a burzy: ' + bursaParts.join(', ') + '.';
            reportOut.push({ type: 'frame', text: bursaText, tableId: 'shoulder_bursa_main' });
            bursaConc.forEach(c => concInc.push({ type: 'frame', text: c + '.', tableId: 'shoulder_bursa_main' }));
        }

        // --- 3. ROTÁTOROVÁ MANŽETA ---
        const parseTendon = (prefix, nameTitle) => {
            const stav = ctx.text(`${prefix}_stav`);
            const plocha = ctx.text(`${prefix}_plocha`);
            const rozmer = ctx.text(`${prefix}_rozmer`);
            const retr = ctx.text(`${prefix}_retr`);
            const atrofie = ctx.text(`${prefix}_atrofie`);
            const kalcif = ctx.text(`${prefix}_kalcif`);

            if ((!stav || stav === '0') && (!kalcif || kalcif === '0')) {
                return null;
            }

            let repParts = [];
            let concParts = [];

            let isComplete = stav === 'kompletní';
            let isPartial = stav === 'gr. I' || stav === 'gr. II' || stav === 'gr. III';

            if (stav && stav !== '0') {
                const repStav = {
                    'tendinóza': 'ztluštění a hyperintenzita signálu charakteru tendinózy',
                    'gr. I': 'parciální ruptura zasahující do 25 % tloušťky šlachy',
                    'gr. II': 'parciální ruptura zasahující do 50 % tloušťky šlachy',
                    'gr. III': 'parciální ruptura zasahující nad 50 % tloušťky šlachy (high-grade)',
                    'kompletní': 'transmurální defekt s úplným přerušením kontinuity vláken'
                };
                const concStav = {
                    'tendinóza': 'tendinopatií',
                    'gr. I': 'low-grade (gr. I) rupturou',
                    'gr. II': 'parciální (gr. II) rupturou',
                    'gr. III': 'high-grade (gr. III) rupturou',
                    'kompletní': 'kompletní rupturou'
                };
                
                let rText = repStav[stav];
                let cText = concStav[stav];

                if (isPartial && plocha && plocha !== 'plocha...') {
                    if (plocha === 'A') {
                        rText = rText.replace('zasahující', 'zasahující z artikulárního povrchu');
                        if (prefix === 'sh_ssp') {
                            cText += ' (PASTA léze)';
                        }
                    } else if (plocha === 'B') {
                        rText = rText.replace('zasahující', 'zasahující z burzálního povrchu');
                    }
                }

                if (isPartial && rozmer && !rozmer.includes('rozměr')) {
                    rText += ` v AP rozsahu ${rozmer}`;
                }

                if (isComplete) {
                    let cRetr = '', cAtr = '';
                    
                    if (retr && !retr.includes('retrakce')) {
                        if (retr === '+') {
                            rText += `, pahýl šlachy je mírně retrahován`;
                            cRetr = `mírnou retrakcí`;
                        } else if (retr === '++') {
                            rText += `, pahýl šlachy je retrahován k úrovni kloubní hlavice`;
                            cRetr = `retrakcí k hlavici`;
                        } else if (retr === '+++') {
                            rText += `, pahýl šlachy je retrahován k úrovni glenoidu`;
                            cRetr = `retrakcí ke glenoidu`;
                        }
                    }
                    
                    if (atrofie && !atrofie.includes('atrofie')) {
                        if (atrofie === '+') {
                            rText += `, svalové bříško vykazuje mírnou tukovou atrofii`;
                            cAtr = `mírnou tukovou atrofií bříška`;
                        } else if (atrofie === '++') {
                            rText += `, svalové bříško vykazuje výraznou tukovou atrofii`;
                            cAtr = `výraznou tukovou atrofií bříška`;
                        }
                    }
                    
                    if (cRetr && cAtr) cText += `, ${cRetr} a ${cAtr}`;
                    else if (cRetr) cText += `, ${cRetr}`;
                    else if (cAtr) cText += `, ${cAtr}`;
                }

                repParts.push(rText);
                concParts.push(cText);
            }

            if (kalcif && kalcif !== '0') {
                if (kalcif === 'HADD') {
                    repParts.push('ložisko nápadně sníženého signálu odpovídající depozitům hydroxyapatitu');
                    if (stav === 'tendinóza') {
                        concParts[0] = 'kalcifikující tendinopatií (HADD)';
                    } else if (concParts.length === 0) {
                        concParts.push('kalcifikující tendinopatií (HADD)');
                    } else {
                        concParts.push('kalcifikací (HADD)');
                    }
                } else if (kalcif === 'dystrof.') {
                    repParts.push('drobné nepravidelné signálové ztráty charakteru dystrofických kalcifikací');
                    if (concParts.length === 0) {
                        concParts.push('dystrofickými kalcifikacemi');
                    } else {
                        concParts.push('dystrofickými kalcifikacemi');
                    }
                }
            }

            return {
                name: nameTitle,
                text: `Šlacha m. ${nameTitle}: ${repParts.join(', ')}.`,
                conc: `šlacha m. ${nameTitle} s ${concParts.join(' a ')}`
            };
        };

        const ssp = parseTendon('sh_ssp', 'supraspinatus');
        const isp = parseTendon('sh_isp', 'infraspinatus');
        const ssc = parseTendon('sh_ssc', 'subscapularis');
        
        let cuffArr = [ssp, isp, ssc].filter(Boolean);
        
        const customDesc = ctx.field('sh_rm_custom_desc');
        const customConc = ctx.field('sh_rm_custom_conc');

        if (cuffArr.length === 0 && !customDesc) {
            reportOut.push({ type: 'frame', text: 'Rotátorová manžeta přiměřeného průběhu, signálu i morfologie bez detekovatelné trhliny.', tableId: 'shoulder_rm_main', dimmed: true });
        } else {
            cuffArr.forEach(item => {
                reportOut.push({ type: 'frame', text: item.text, tableId: 'shoulder_rm_main' });
            });
            
            if (cuffArr.length === 1) {
                let txt = cuffArr[0].conc.charAt(0).toUpperCase() + cuffArr[0].conc.slice(1);
                concMain.push({ type: 'frame', text: txt + '.', tableId: 'shoulder_rm_main' });
            } else if (cuffArr.length > 1) {
                let combined = 'Kombinované postižení šlach RM: ' + cuffArr.map(item => item.conc).join(', ') + '.';
                concMain.push({ type: 'frame', text: combined, tableId: 'shoulder_rm_main' });
            }
            
            if (customDesc) {
                let txt = customDesc.trim();
                if (txt && !txt.endsWith('.')) txt += '.';
                if (txt) {
                    txt = txt.charAt(0).toUpperCase() + txt.slice(1);
                    reportOut.push({ type: 'frame', text: txt, tableId: 'shoulder_rm_main' });
                }
            }
        }

        if (customConc) {
            let txt = customConc.trim();
            if (txt && !txt.endsWith('.')) txt += '.';
            if (txt) {
                txt = txt.charAt(0).toUpperCase() + txt.slice(1);
                concMain.push({ type: 'frame', text: txt, tableId: 'shoulder_rm_main' });
            }
        }


        // Teres minor logic (ponecháno nezávisle na RM bloku)
        let tmText = '';
        let tmConc = '';
        const tmStav = ctx.text('sh_tm_stav');
        const tmGout = ctx.text('sh_tm_gout');
        if ((tmStav && tmStav !== '0') || (tmGout && tmGout !== '0')) {
            let parts = [];
            if (tmStav === 'tendinóza') parts.push('tendinóza šlachy');
            else if (tmStav === 'parc. ruptura') { parts.push('parciální ruptura šlachy'); tmConc = 'Parciální ruptura šlachy m. teres minor'; }
            else if (tmStav === 'kompletní') { parts.push('kompletní ruptura šlachy'); tmConc = 'Kompletní ruptura šlachy m. teres minor'; }
            
            if (tmGout && tmGout !== '0') {
                parts.push(tmGout === '+' ? 'mírná svalová atrofie' : 'pokročilá tuková degenerace a atrofie');
                if (!tmConc && tmStav === '0') tmConc = 'Atrofie / tuková degenerace m. teres minor';
            }
            tmText = `Šlacha m. teres minor: ${parts.join(', ')}.`;
        }

        if (tmText) {
            reportOut.push({ type: 'frame', text: tmText, tableId: 'shoulder_tm_main' });
            if (tmConc) concMain.push({ type: 'frame', text: tmConc + '.', tableId: 'shoulder_tm_main' });
        }

        // --- 4. BICEPS A BICEPSOVÁ KLADKA (LHB) ---
        const lhbStav = ctx.text('sh_lhb_stav');
        const lhbPoloha = ctx.text('sh_lhb_poloha');
        
        let isLhbNormal = (!lhbStav || lhbStav === '0') && (!lhbPoloha || lhbPoloha === 'in situ');

        if (isLhbNormal) {
            reportOut.push({ type: 'frame', text: 'Šlacha dlouhé hlavy bicepsu je v sulku, přim. šíře a signálu, bez výraznějšího tekutinového lemu.', tableId: 'shoulder_lhb_main', dimmed: true });
        } else {
            let repParts = [];
            let concStavText = '';
            let concPolohaText = '';

            if (lhbStav && lhbStav !== '0') {
                const repStavMap = {
                    'tendinóza': 'šlacha je ztluštělá a hyperintenzní charakteru tendinózy',
                    'gr. I': 'mírná parciální léze se zvýšenou SI',
                    'gr. II': 'parciální léze a nehomogenita se zvýšenou SI',
                    'gr. III': 'výrazná parciální léze s rozvlákněním a vysokou SI',
                    'kompletní': 'kompletní ruptura s přerušením kontinuity vláken'
                };
                const concStavMap = {
                    'tendinóza': 'tendinózou',
                    'gr. I': 'low-grade (gr. I) parciální rupturou',
                    'gr. II': 'parciální (gr. II) rupturou',
                    'gr. III': 'high-grade (gr. III) parciální rupturou',
                    'kompletní': 'kompletní rupturou'
                };
                repParts.push(repStavMap[lhbStav]);
                concStavText = concStavMap[lhbStav];
            } else {
                repParts.push('šlacha je zachované kontinuity');
            }

            if (lhbPoloha && lhbPoloha !== 'in situ') {
                const repPolohaMap = {
                    'pulley': 'se mediálním posunem při pravděpod. lézi aparátu kladky',
                    'subluxace': 'je subluxována nad mediální hranu bicepsového sulku',
                    'luxace': 'je kompletně luxována mediálně mimo bicepsový sulkus',
                    'retrakce': 'je retrahována intraartikulárně či distálně'
                };
                const concPolohaMap = {
                    'pulley': 'lézí bicepsové kladky (pulley lesion)',
                    'subluxace': 'subluxací ze sulku',
                    'luxace': 'luxací mediálně',
                    'retrakce': 'retrakcí pahýlu'
                };
                repParts.push(repPolohaMap[lhbPoloha]);
                concPolohaText = concPolohaMap[lhbPoloha];
            } else if (lhbStav && lhbStav !== '0') {
                repParts.push('lokalizace v bicepsovém sulku');
            }

            let lhbRepText = 'Šlacha dlouhé hlavy bicepsu (LHB): ' + repParts.join(', ') + '.';
            reportOut.push({ type: 'frame', text: lhbRepText, tableId: 'shoulder_lhb_main' });

            let polohaPrep = (lhbPoloha === 'subluxace') ? 'se' : 's';

            if (concStavText && concPolohaText) {
                concMain.push({ type: 'frame', text: `LHBT s ${concStavText} a ${polohaPrep} ${concPolohaText}.`, tableId: 'shoulder_lhb_main' });
            } else if (concStavText) {
                concMain.push({ type: 'frame', text: `LHBT s ${concStavText}.`, tableId: 'shoulder_lhb_main' });
            } else if (concPolohaText) {
                concMain.push({ type: 'frame', text: `LHBT ${polohaPrep} ${concPolohaText}.`, tableId: 'shoulder_lhb_main' });
            }
        }

        // --- 5. LABRUM A LIGAMENTA ---
        const labSup = ctx.text('sh_lab_sup');
        const labAnt = ctx.text('sh_lab_ant');
        const labPos = ctx.text('sh_lab_pos');
        const labCysta = ctx.text('sh_lab_cysta');

        let isLabNormal = (!labSup || labSup === '0') && (!labAnt || labAnt === '0') && 
                          (!labPos || labPos === '0') && (!labCysta || labCysta === '0');

        if (isLabNormal) {
            reportOut.push({ type: 'frame', text: 'Glenoidální labrum celistvé, bez zřetelné separace či defektu.', tableId: 'shoulder_labrum_main', dimmed: true });
        } else {
            let labrep = [];
            let labconc = [];
            let labLeze = [];

            if (labSup && labSup !== '0') {
                if (labSup === 'degenerace') {
                    labrep.push('intrasubstanciální hyperintenzita a nehomogenita horního labra bez zřetelné trhliny');
                    labconc.push('Degenerace horního labra');
                } else if (labSup === 'léze') {
                    labrep.push('hyperintenzita horního labra v kontaktu s artik. prostorem');
                    labLeze.push('horního');
                } else if (labSup === 'SLAP I') {
                    labrep.push('povrchové roztřepení a nepravidelnost volného okraje horního labra bez jeho odtržení (SLAP I)');
                    labconc.push('SLAP I léze horního labra');
                } else if (labSup === 'SLAP II') {
                    labrep.push('tekutinou vyplněná lineární trhlina oddělující horní labrum a bicepsový úpon od glenoidu (SLAP II)');
                    labconc.push('SLAP II léze horního labra');
                } else if (labSup === 'komplexní SLAP') {
                    labrep.push('extenzivní defekt horního labra s dislokací fragmentu či propagací do LHB (komplexní SLAP léze)');
                    labconc.push('Komplexní SLAP léze horního labra');
                }
            }

            if (labAnt && labAnt !== '0') {
                if (labAnt === 'degenerace') { labrep.push('změny signálu a tvaru předního labra'); }
                else if (labAnt === 'léze') { labrep.push('hyperintenzita předního labra v kontaktu s artik. prostorem'); labLeze.push('předního'); }
                else if (labAnt === 'Bankart') { labrep.push('odtržení předního a dolního labra vč. periostu (Bankartova léze)'); labconc.push('Bankartova léze (přední instabilita)'); }
                else if (labAnt === 'ALPSA') { labrep.push('odtržení předního labra s periostem, labrum je mediálně dislokováno (ALPSA)'); labconc.push('ALPSA léze předního labra'); }
                else if (labAnt === 'Perthes') { labrep.push('částečné odtržení předního labra bez dislokace, s intaktním periostem (Perthes)'); labconc.push('Perthesova léze labra'); }
            }

            if (labPos && labPos !== '0') {
                if (labPos === 'degenerace') labrep.push('degenerativní změny zadního labra');
                else if (labPos === 'léze') { labrep.push('hyperintenzita zadního labra v kontaktu s artik. prostorem'); labLeze.push('zadního'); }
                else if (labPos === 'Reverse Bankart') { labrep.push('odtržení zadního labra (Reverse Bankart)'); labconc.push('Reverse Bankart léze zadního labra'); }
            }

            if (labLeze.length) {
                const locStr = labLeze.length === 1 ? labLeze[0] : labLeze.length === 2 ? labLeze.join(' a ') : labLeze.slice(0, -1).join(', ') + ' a ' + labLeze[labLeze.length - 1];
                labconc.push(`Léze ${locStr} labra`);
            }

            if (labCysta && labCysta !== '0') {
                labrep.push(`paralabrální formace laločnatého tekutinového signálu v ${labCysta === 'spinoglenoidní' ? 'incisura spinoglenoidalis' : 'incisura scapulae'}`);
                labconc.push(`Paralabrální cysta v oblasti ${labCysta === 'spinoglenoidní' ? 'incisura spinoglenoidalis (s potenc. tlakem na n. suprascapularis)' : 'supraskapulárního zářezu'}`);
            }

            reportOut.push({ type: 'frame', text: 'Glenoidální labrum: ' + cap(labrep.join('; ')) + '.', tableId: 'shoulder_labrum_main' });
            labconc.forEach(c => concMain.push({ type: 'frame', text: c + '.', tableId: 'shoulder_labrum_main' }));
        }

        // --- 6. SKELET A CHRUPAVKY ---
        const bnHlav = ctx.text('sh_bn_hlav');
        const bnGlen = ctx.text('sh_bn_glen');
        const bnChr = ctx.text('sh_bn_chr');
        const bnLesion = ctx.text('sh_bn_lesion');

        let isBnNormal = (!bnHlav || bnHlav === '0') && (!bnGlen || bnGlen === '0') && 
                         (!bnChr || bnChr === '0') && (!bnLesion || bnLesion === '0');

        if (isBnNormal) {
            reportOut.push({ type: 'frame', text: 'Skelet bez patologických ložiskových změn či posttraumatického edému dřeně, chrupavky normální šíře.', tableId: 'shoulder_bones_main', dimmed: true });
        } else {
            let bnRep = [];
            
            if (bnHlav && bnHlav !== '0') {
                if (bnHlav === 'Hill-Sachs') { bnRep.push('klínovitá impresní zploštění posterolaterální části hlavice humeru (Hill-Sachsův defekt)'); concMain.push({ type: 'frame', text: 'Hill-Sachsův defekt hlavice humeru.', tableId: 'shoulder_bones_main' }); }
                else if (bnHlav === 'kontuzní edém') bnRep.push('posttraumatický reaktivní edém (bone bruise) v oblasti hlavice humeru');
            }

            if (bnGlen && bnGlen !== '0') {
                if (bnGlen === 'Bony Bankart') { bnRep.push('avulzní defekt předního dolního okraje kostního glenoidu (bony Bankart)'); concMain.push({ type: 'frame', text: 'Bony Bankart léze glenoidu.', tableId: 'shoulder_bones_main' }); }
                else if (bnGlen === 'kontuzní edém') bnRep.push('edém kostní dřeně glenoidu');
            }

            if (bnChr && bnChr !== '0') {
                bnRep.push(`chondropatie GH kloubu ${bnChr.replace('Gr. ', 'stupně ')}`);
                concInc.push({ type: 'frame', text: `Osteoartróza a chondropatie GH kloubu (${bnChr}).`, tableId: 'shoulder_bones_main' });
            }

            if (bnLesion && bnLesion !== '0') {
                bnRep.push(`ve skeletu je ložisková změna charakteru ${bnLesion.toLowerCase()}`);
                concInc.push({ type: 'frame', text: `${bnLesion} ve skeletu (vedlejší nález).`, tableId: 'shoulder_bones_main' });
            }

            reportOut.push({ type: 'frame', text: 'Skelet a chrupavky: ' + cap(bnRep.join(', ')) + '.', tableId: 'shoulder_bones_main' });
        }

        if (concMain.length === 0) {
            concMain.push({ type: 'frame', text: 'Přiměřený nález, bez signifikantní patologie.' });
        }

        return { report: reportOut, conclusion: { main: concMain, incidental: concInc } };
    }
};

window.HOVER_IMAGES = window.HOVER_IMAGES || {};
Object.assign(window.HOVER_IMAGES, {
    'sh_lab_ant': { url: 'picothers/Shoulder_labrum.png', size: '400px' },
    'sh_lab_pos': { url: 'picothers/Shoulder_labrum.png', size: '400px' }
});