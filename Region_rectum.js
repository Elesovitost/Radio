const RegionRectum = {
    title: 'Rektum a mezorektum',
    reportLayout: 'block',
    layout: (helpers) => {
        let layoutNodes = [];

        // Přidání celkové tabulky pro rektum (včetně pooperačních stavů)
        layoutNodes.push(
            helpers.TableMain('rectum_rectum_main', 'Rektum obecně / Po operaci', [
                helpers.Table2colNormal('rt_obecne_table', '', [
                    [ 'Operace:', { btn: 'rt_op', states: ['0', 'resekce', 'amputace'] } ],
                    [ 'Anastomóza:', { btn: 'rt_ana', states: ['0', 'kolekce', 'absces'] } ],
                    [ 'Radiace:', { btn: 'rt_rad', states: ['0', '+'] } ],
                    [ 'Presakr. infiltr.:', { btn: 'rt_inf', states: ['0', '+', '++'] } ],
                    [ 'Presakr. kolekce:', { btn: 'rt_kol', states: ['0', 'chronická'] } ],
                    [ 'Recidiva:', { btn: 'rt_rec', states: ['0', 'ne', 'ano'] } ]
                ], 'rectum'),
                helpers.Table1col('rt_obecne_add', [
                    { field: 'text', id: 'rt_custom_desc', placeholder: 'vlastní popis...' },
                    { field: 'text', id: 'rt_custom_conc', placeholder: 'vlastní závěr...' }
                ], 'rectum')
            ])
        );

        const lesInsts = Store.instances?.['rectum_lesion_main'] || [];
        lesInsts.forEach((instId, idx) => {
            const p = `rt_${instId}`;
            
            const locRows = [
                el('div', { className: 'sub-table-title', textContent: 'Lokalizace', style: 'text-align: left; padding-left: 8px; margin-top: 4px;' }),
                el('div', { style: 'text-align: left;' }, [
                    helpers.Table1col(`${p}_loc1`, [['Od AR úhlu:', { field: 'mm', id: `${p}_dist`, placeholder: 'cm' }, 'Délka:', { field: 'mm', id: `${p}_len`, placeholder: 'cm' }, 'Rozsah:', { field: 'mm', id: `${p}_c_od`, placeholder: 'od' }, { field: 'mm', id: `${p}_c_do`, placeholder: 'do' }]], 'rectum'),
                    helpers.Table1col(`${p}_loc2`, [['Invaze:', { btn: `${p}_inv`, states: ['0', '< 1 mm', '1-5 mm', '5-15 mm', '> 15 mm', 'perit. recesu', 'orgánu'] }, 'Kde:', { field: 'text', id: `${p}_inv_kde`, placeholder: 'upřesnění...' }]], 'rectum'),
                    helpers.Table1col(`${p}_loc3`, [['Invaze MRF:', { btn: `${p}_mrf`, states: ['0', '+'] }, 'EMVI:', { btn: `${p}_emvi`, states: ['0', '+'] }, 'Tumor depozita:', { btn: `${p}_td`, states: ['0', '+', '++'] }]], 'rectum'),
                    helpers.Table1col(`${p}_loc4`, [['Invaze dna:', { btn: `${p}_dno`, states: ['0', '+'] }, 'Invaze sfinkteru:', { btn: `${p}_sfinkter`, states: ['0', 'interní', 'intersfinkter.', 'externí'] }]], 'rectum')
                ]),
                el('div', { style: 'height: 12px;' }),
                el('div', { className: 'sub-table-title', textContent: 'Po terapii', style: 'text-align: left; padding-left: 8px;' }),
                el('div', { style: 'text-align: left;' }, [
                    helpers.Table1col(`${p}_loc5`, [['Response:', { btn: `${p}_terapie`, states: ['0', '(near) complete', 'malé reziduum', 'velké reziduum'] }]], 'rectum')
                ])
            ];

            layoutNodes.push(
                helpers.LesionMain(`rectum_lesion_main__${instId}`, `Léze rekta (${idx + 1})`, [
                    ...LESIONS_DEFINITION.getLesionRowsPre(helpers, p),
                    ...locRows,
                    ...LESIONS_DEFINITION.getLesionRowsPost(helpers, p, `${p}_met`, `${p}_e`)
                ])
            );
        });

        const lnInsts = Store.instances?.['rectum_lymphnode_main'] || [];
        lnInsts.forEach((instId, idx) => {
            const p = `rtln_${instId}`;
            layoutNodes.push(
                helpers.LesionMain(`rectum_lymphnode_main__${instId}`, `Lymfadenopatie (${idx + 1})`, [
                    ...LESIONS_DEFINITION.getLymphNodeRowsPre(helpers, p),
                    el('div', { style: 'text-align: left;' }, [
                        helpers.Table3colRCL(`${p}_loc1`, 'Lokalizace', [
                            [ '', { btn: `${p}_p_ima_c`, type: 'basic', text: 'IMA + RS' }, '' ],
                            [ '', [ { btn: `${p}_p_par_r`, type: 'basic', text: 'para-Ao' }, { btn: `${p}_p_par_l`, type: 'basic', text: 'para-Ao' } ], '' ],
                            [ { btn: `${p}_p_cia_r`, type: 'basic', text: 'AIC' }, '', { btn: `${p}_p_cia_l`, type: 'basic', text: 'AIC' } ],
                            [ { btn: `${p}_p_eia_r`, type: 'basic', text: 'AIE' }, '', { btn: `${p}_p_eia_l`, type: 'basic', text: 'AIE' } ],
                            [ { btn: `${p}_p_iia_r`, type: 'basic', text: 'AII' }, '', { btn: `${p}_p_iia_l`, type: 'basic', text: 'AII' } ],
                            [ { btn: `${p}_p_obt_r`, type: 'basic', text: 'obturátor' }, '', { btn: `${p}_p_obt_l`, type: 'basic', text: 'obturátor' } ],
                            [ '', [ { btn: `${p}_p_pre_r`, type: 'basic', text: 'presakr.' }, { btn: `${p}_p_pre_l`, type: 'basic', text: 'presakr.' } ], '' ],
                            [ '', [ { btn: `${p}_p_mez_r`, type: 'basic', text: 'mezorekt.' }, { btn: `${p}_p_mez_l`, type: 'basic', text: 'mezorekt.' } ], '' ],
                            [ { btn: `${p}_p_ing_r`, type: 'basic', text: 'inguinálně' }, '', { btn: `${p}_p_ing_l`, type: 'basic', text: 'inguinálně' } ]
                        ], 'rectum')
                    ]),
                    ...LESIONS_DEFINITION.getLymphNodeRowsPost(helpers, p, `${p}_met`, `${p}_e`)
                ])
            );
        });

        return layoutNodes;
    },
    compile: (ctx) => {
        let reportOut = [{ type: 'heading', text: 'Rektum a mezorektum:', action: 'open-region', regionId: 'rectum' }];
        let concMain = [];
        let concInc = [];
        
        const isPet = ctx.examId.toLowerCase().includes('pet');

        // Zpracování celkového stavu a pooperačních změn
        let rtOp = ctx.text('rt_op');
        let rtAna = ctx.text('rt_ana');
        let rtRad = ctx.text('rt_rad');
        let rtInf = ctx.text('rt_inf');
        let rtKol = ctx.text('rt_kol');
        let rtRec = ctx.text('rt_rec');
        let rtDesc = ctx.field('rt_custom_desc');
        let rtConcRaw = ctx.field('rt_custom_conc');

        let repGeneral = [];
        let concGeneral = [];
        let isOperated = false;

        if (rtOp === 'resekce') {
            isOperated = true;
            let radRep = rtRad === '+' ? ' a po radioterapii' : '';
            let radConc = rtRad === '+' ? ' s poradiačními změnami' : '';
            repGeneral.push(`Rektum po resekci${radRep}.`);
            
            let concBase = `St.p. resekci rekta${radConc}`;
            
            if (rtAna === 'kolekce') {
                repGeneral.push('Anastomóza je porušena, v jejím bezprostředním okolí je patrná ohraničená kolekce tekutiny v T2W.');
                concGeneral.push(`${concBase}, dehiscence anastomózy s ohraničenou kolekcí tekutiny.`);
            } else if (rtAna === 'absces') {
                repGeneral.push('Anastomóza je porušena, přítomna kolekce tekutiny s plynem a okolními zánětlivými změnami v T2W.');
                concGeneral.push(`${concBase}, selhání anastomózy s abscesem.`);
            } else {
                concGeneral.push(`${concBase}.`);
            }
        } else if (rtOp === 'amputace') {
            isOperated = true;
            let radRep = rtRad === '+' ? ' s postradiačními změnami v pánvi' : '';
            let radConc = rtRad === '+' ? ' s poradiačními změnami' : '';
            repGeneral.push(`Stav po amputaci rekta${radRep}.`);
            
            let concBase = `St.p. amputaci rekta${radConc}`;
            let hasComplication = false;

            if (rtInf === '+') {
                repGeneral.push('V presakrálním prostoru jsou patrné pruhovité fibrotické T2W hyposignální změny.');
                concGeneral.push(`${concBase}. Změny v presakrálním prostoru charakteru fibrózy.`);
                hasComplication = true;
            } else if (rtInf === '++') {
                repGeneral.push('V presakrálním prostoru je přítomna uzlovitá infiltrace s vyšším SI v T2W.');
                concGeneral.push(`${concBase}. Uzlovitá infiltrace presakrálního prostoru, suspektní z rezidua/recidivy.`);
                hasComplication = true;
            }

            if (rtKol === 'chronická') {
                repGeneral.push('V presakrálním prostoru je patrná ohraničená tekutinová kolekce bez okolní zánětlivé reakce.');
                concGeneral.push(hasComplication ? 'Přítomna chronická presakrální tekutinová kolekce.' : `${concBase}. Chronická presakrální tekutinová kolekce.`);
                hasComplication = true;
            }

            if (!hasComplication) {
                concGeneral.push(`${concBase}.`);
            }
        }

        if (isOperated) {
            if (rtRec === 'ne') {
                repGeneral.push('Bez patrné ložiskové recidivy.');
                concGeneral.push('Bez známek lokální recidivy.');
            } else if (rtRec === 'ano') {
                repGeneral.push('V oblasti lůžka je přítomno ložisko s vyšším SI v T2W a restrikcí difuze.');
                concGeneral.push('Patrna lokální recidiva v lůžku.');
            }
            if (rtDesc) repGeneral.push(rtDesc.replace(/\u200B/g, '').trim());
            
            reportOut.push({ type: 'frame', text: repGeneral.join(' '), tableId: 'rectum_obecne_main' });
            concGeneral.forEach(c => concMain.push({ type: 'frame', text: c, tableId: 'rectum_obecne_main' }));
        }

        if (rtConcRaw) {
            let rtConcClean = rtConcRaw.replace(/\u200B/g, '').trim();
            if (rtConcClean) {
                let formattedConc = rtConcClean.charAt(0).toUpperCase() + rtConcClean.slice(1);
                if (!formattedConc.endsWith('.')) formattedConc += '.';
                concMain.push({ type: 'frame', text: formattedConc, tableId: 'rectum_obecne_main' });
            }
        }

        const lesInsts = Store.instances?.['rectum_lesion_main'] || [];
        
        if (lesInsts.length === 0) {
            if (!isOperated && !rtDesc) {
                reportOut.push({ type: 'frame', text: 'Stěna rekta je bez zjevného patologického / ložiskového zesílení, mezorektum bez patrné infiltrace.', tableId: 'rectum_lesion_main', dimmed: true });
            }
        } else {
            lesInsts.forEach((instId) => {
                const p = `rt_${instId}`;
                let dL = LESIONS_DEFINITION.parseDetails(ctx, ctx.examId, 'rectum', p, `${p}_met`, `${p}_e`, false);
                
                let dist = ctx.field(`${p}_dist`);
                let len = ctx.field(`${p}_len`);
                let cOd = ctx.field(`${p}_c_od`);
                let cDo = ctx.field(`${p}_c_do`);
                
                let locParts = [];
                if (dist) locParts.push(`ve vzdálenosti cca ${dist} cm od AR úhlu`);
                if (len) locParts.push(`v délce ${len} cm`);
                if (cOd && cDo) locParts.push(`cirkumferenčně od č. ${cOd} do ${cDo}`);
                let locStr = locParts.length > 0 ? ` ${locParts.join(', ')}` : '';

                let inv = ctx.text(`${p}_inv`);
                let invKde = ctx.field(`${p}_inv_kde`);
                let stageStr = "T1/T2";
                let stageDesc = "";
                let kdeSuffix = invKde ? `, lokalizace: ${invKde}` : "";

                if (inv) {
                    if (inv === '0') { stageStr = "T1/T2"; stageDesc = `Bez známek šíření mimo stěnu rekta${kdeSuffix}.`; }
                    else if (inv === '< 1 mm') { stageStr = "T3a"; stageDesc = `Extramurální hloubka invaze do 1 mm${kdeSuffix}.`; }
                    else if (inv === '1-5 mm') { stageStr = "T3b"; stageDesc = `Extramurální hloubka invaze 1-5 mm${kdeSuffix}.`; }
                    else if (inv === '5-15 mm') { stageStr = "T3c"; stageDesc = `Extramurální hloubka invaze 5-15 mm${kdeSuffix}.`; }
                    else if (inv === '> 15 mm') { stageStr = "T3d"; stageDesc = `Extramurální hloubka invaze nad 15 mm${kdeSuffix}.`; }
                    else if (inv === 'perit. recesu') { stageStr = "T4a"; stageDesc = `Infiltrace peritoneální reflexe${kdeSuffix}.`; }
                    else if (inv === 'orgánu') { stageStr = "T4b"; stageDesc = `Infiltrace okolních orgánů${kdeSuffix}.`; }
                }

                let riskParts = [];
                let mrf = ctx.text(`${p}_mrf`);
                let emvi = ctx.text(`${p}_emvi`);
                let td = ctx.text(`${p}_td`);
                
                let mrfStr = mrf === '+' ? "MRF+" : "MRF-";
                let emviStr = emvi === '+' ? "EMVI+" : "EMVI-";
                let mrfDesc = mrf === '+' ? "Fascie mezorekta (MRF) je infiltrována (vzdálenost tumoru ≤ 1 mm)." : "Fascie mezorekta (MRF) bez známek invaze (vzdálenost > 1 mm).";
                let emviDesc = emvi === '+' ? "Přítomna extramurální vaskulární invaze (EMVI pozitivní)." : "";
                
                let tdDesc = "";
                if (td === '+') { tdDesc = "V mezorektu přítomna tumorózní depozita (TD)."; riskParts.push("TD+"); }
                else if (td === '++') { tdDesc = "V mezorektu přítomna vícečetná tumorózní depozita (TD)."; riskParts.push("TD+ (vícečetná)"); }

                let dno = ctx.text(`${p}_dno`);
                let sfinkter = ctx.text(`${p}_sfinkter`);
                let dnoDesc = dno === '+' ? "Zřetelná invaze tumoru do pánevního dna." : "";
                let sfinDesc = "";
                if (sfinkter && sfinkter !== '0') {
                    if (sfinkter === 'interní') sfinDesc = "Tumor infiltruje interní sfinkter.";
                    if (sfinkter === 'intersfinkter.') sfinDesc = "Tumor se šíří do intersfinkterického prostoru.";
                    if (sfinkter === 'externí') sfinDesc = "Tumor infiltruje externí sfinkter.";
                }

                let terapie = ctx.text(`${p}_terapie`);
                let terStr = "";
                if (terapie) {
                    if (terapie === '(near) complete') terStr = "Dle MR (téměř) kompletní odpověď na terapii (odpovídá TRG 1-2).";
                    if (terapie === 'malé reziduum') terStr = "Dle MR částečná odpověď, trvá malé tumorózní reziduum.";
                    if (terapie === 'velké reziduum') terStr = "Dle MR stacionární nález, trvá velké tumorózní reziduum.";
                }

                let repBase = `${dL.baseText}${locStr}${dL.vzhledText}${dL.metrikyStr}${dL.doplneniStr}.`.replace(/\s+/g, ' ').replace(' .', '.');
                let repDetails = [stageDesc, mrfDesc, emviDesc, tdDesc, dnoDesc, sfinDesc].filter(Boolean).join(' ');
                
                reportOut.push({ type: 'frame', text: `${repBase} ${repDetails}`.trim(), tableId: `rectum_lesion_main__${instId}` });

                let stageArr = [stageStr, mrfStr, emviStr].filter(Boolean).join(', ');
                let extRisk = riskParts.length > 0 ? ` (${riskParts.join(', ')})` : "";
                let dnoSfin = (dno === '+' || (sfinkter && sfinkter !== '0')) ? "s invazí dna/sfinkteru" : "";
                
                let etioLower = (dL.etioStr || '').toLowerCase();
                let isKarcinom = etioLower.includes('karcinom') || etioLower.includes('maligní');
                let isTumor = etioLower.includes('tumor');

                let baseLabel = dL.baseText.replace(/ rekta/gi, '');
                if (isKarcinom) {
                    baseLabel = "Karcinom";
                } else if (isTumor) {
                    baseLabel = "Tumorózní ložisko";
                }

                let distNum = parseFloat((dist || '').replace(',', '.'));
                let lenNum = parseFloat((len || '').replace(',', '.'));
                
                let orgWord = (sfinkter && sfinkter !== '0') ? "rektoanu" : "rekta";
                if (dist === '0' || distNum === 0) {
                    orgWord = "anorekta";
                }
                
                let locSuffix = orgWord;
                if (dist === '0' || distNum === 0) {
                    locSuffix = len ? `${orgWord} (délky cca ${len} cm)` : `${orgWord}`;
                } else if (dist) {
                    locSuffix = len ? `${orgWord} (cca ${dist}-${(distNum + lenNum).toFixed(1).replace('.0', '')} cm od AR úhlu)` : `${orgWord} (cca ${dist} cm od AR úhlu)`;
                }

                let cParts = [];
                let titlePart = `${baseLabel} ${locSuffix}`.trim();
                
                if (dL.actStr) titlePart += dL.actStr;
                if (dL.dynStr) titlePart += dL.dynStr;
                
                if (dL.etioStr) {
                    let isRedundant = false;
                    if (isKarcinom && (etioLower.includes('maligní') || etioLower.includes('karcinom'))) isRedundant = true;
                    if (isTumor && etioLower.includes('tumor')) isRedundant = true;
                    
                    if (!isRedundant) {
                        titlePart += `, ${dL.etioStr}`;
                    }
                }
                
                cParts.push(titlePart);
                if (dnoSfin) cParts.push(dnoSfin);
                cParts.push(`- lokální staging: ${stageArr}${extRisk}.`);
                if (terStr) cParts.push(terStr);

                concMain.push({ type: 'frame', text: cParts.join(' ').replace(/\s+/g, ' ').trim(), tableId: `rectum_lesion_main__${instId}` });
            });
        }

        const lnInsts = Store.instances?.['rectum_lymphnode_main'] || [];
        if (lnInsts.length === 0) {
            reportOut.push({ type: 'frame', text: isPet ? 'Bez patrné hyperakumulující lymfadenopatie.' : 'Bez zjevné patologické regionální či non-regionální lymfadenopatie.', tableId: 'rectum_lymphnode_main', dimmed: true });
        } else {
            lnInsts.forEach(instId => {
                const p = `rtln_${instId}`;
                let lokaceLN = [];
                
                if (ctx.isActive(`${p}_p_ima_c`)) lokaceLN.push('podél a. mesenterica inf. (IMA) / a. rectalis sup. (RS)');

                const noBilatNodes = [
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
                let dLN = LESIONS_DEFINITION.parseDetails(ctx, ctx.examId, 'rectum', p, `${p}_met`, `${p}_e`, true);

                if (dLN.hasAny || lokaceLN.length > 0) {
                    let repSentence = `${dLN.baseText} ${lokTextLN}${dLN.vzhledText}${dLN.metrikyStr}${dLN.doplneniStr}.`.replace(/\s+/g, ' ').replace(' .', '.');
                    reportOut.push({ type: 'frame', text: repSentence, tableId: `rectum_lymphnode_main__${instId}` });
                    
                    // Detekce N-stagingu z tlačítek etiologie
                    let nStage = "cN0";
                    ['m', 'meta'].forEach(btn => {
                        if (ctx.isActive(`${p}_e_${btn}`)) {
                            let val = ctx.text(`${p}_e_${btn}`);
                            if (val.endsWith('!') || val.endsWith('+')) nStage = "cN+";
                            else if (val.endsWith('?') && nStage !== "cN+") nStage = "susp. cN+";
                        }
                    });

                    let concSentence = `${dLN.baseText} ${lokTextLN}${dLN.actStr}${dLN.dynStr}`;
                    if (dLN.etioStr) concSentence += `, ${dLN.etioStr}`;
                    
                    // Připojení N-stagingu na úplný konec před tečku
                    concSentence = `${concSentence.trim()} (${nStage}).`.replace(/\s+/g, ' ').replace(' ,', ',');
                    
                    let isSus = concSentence.toLowerCase().includes('meta') || concSentence.toLowerCase().includes('maligní') || concSentence.toLowerCase().includes('susp') || nStage.includes('N+');
                    if (isSus) {
                        concMain.push({ type: 'frame', text: concSentence, tableId: `rectum_lymphnode_main__${instId}` });
                    } else {
                        concInc.push({ type: 'frame', text: concSentence, tableId: `rectum_lymphnode_main__${instId}` });
                    }
                }
            });
        }

        return { report: reportOut, conclusion: { main: concMain, incidental: concInc } };
    }
};