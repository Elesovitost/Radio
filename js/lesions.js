/* =============================================================
   lesions.js
   Module extracted from index.html inline <script>.
   Edit this file - NOT index.html - to change this part.
   ============================================================= */

/* ═══════════════════════════════════════════════
   LESIONS DEFINITION
═══════════════════════════════════════════════ */
const LESIONS_DEFINITION = {
    getMinuleRowCells: (prefix) => [
        'Minule:',
        'Rozměry:', { field: 'size', id: `${prefix}_size_old`, placeholder: 'mm' },
        'SUVmax:', { field: 'suv', id: `${prefix}_suv_old`, placeholder: '...' },
        'Počet:', { btn: `${prefix}_cnt_old`, states: ['vyber', '0', 'méně', 'více', 'kolísání'] }
    ],
    getLesionMetricsRow: (helpers, rowId, prefix) => {
        return helpers.Table2rowNormal(rowId, [
            ['Metriky:', 'Rozměry:', { field: 'size', id: `${prefix}_size`, placeholder: 'mm' }, 'SUVmax:', { field: 'suv', id: `${prefix}_suv`, placeholder: '...' }, 'Aktivita:', { btn: `${prefix}_act`, states: ['0', 'není', 'nízká', 'intermediární', 'zvýšená', 'vysoká'] }],
            LESIONS_DEFINITION.getMinuleRowCells(prefix),
        ]);
    },
    getLesionEtiologyRow: (helpers, rowId, prefix) => {
        return helpers.Table1col(rowId, [
            ['Etiologie:', 
                { btn: `${prefix}_q`, states: ['?', '?'] },
                { btn: `${prefix}_b`, states: ['benigní', 'benigní?', 'benigní+', 'benigní!'] },
                { btn: `${prefix}_m`, states: ['maligní', 'maligní?', 'maligní+', 'maligní!'] },
                { btn: `${prefix}_t`, states: ['tumor', 'tumor?', 'tumor+', 'tumor!'] },
                { btn: `${prefix}_meta`, states: ['meta', 'meta?', 'meta+', 'meta!'] },
                { btn: `${prefix}_inf`, states: ['zánět', 'zánět?', 'zánět+', 'zánět!'] },
                { btn: `${prefix}_cust_etio`, states: ['vlastní...', 'custom'] }
            ]
        ]);
    },
    getLesionRowsPre: (helpers, prefix, customInfText = 'infiltrace') => [
        helpers.Table1col(`${prefix}_r1_excl`, [ [ 'Počet:', { btn: `${prefix}_c_soli`, type: 'basic', text: 'solitární' }, { btn: `${prefix}_c_dve`, type: 'basic', text: 'dvě' }, { btn: `${prefix}_c_vice`, type: 'basic', text: 'vícečetné' }, { btn: `${prefix}_c_mnoho`, type: 'basic', text: 'mnohočetné' } ] ]),
        helpers.Table1col(`${prefix}_r2_excl`, [ [ 'Druh:', { btn: `${prefix}_k_les`, type: 'basic', text: 'ložisko'}, { btn: `${prefix}_k_exp`, type: 'basic', text: 'expanze' }, { btn: `${prefix}_k_inf`, type: 'basic', text: customInfText }, { btn: `${prefix}_k_kol`, type: 'basic', text: 'kolekce' }, { btn: `${prefix}_k_cys`, type: 'basic', text: 'cysta' }, { btn: `${prefix}_k_cust`, states: ['vlastní', 'custom'] } ] ])
    ],
    getLesionRowsPost: (helpers, prefix, metPfx, etioPfx) => [
        helpers.Table1col(`${prefix}_r4`, [ [ { btn: `${prefix}_doplneni`, type: 'basic_custom', text: 'doplnění:' } ] ]),
        helpers.Table1col(`${prefix}_r5`, [ [ 'Vzhled MR:', { btn: `${prefix}_mr_t1`, states: ['T1', 'T1 hypo', 'T1 izo', 'T1 hyper'] }, { btn: `${prefix}_mr_t2`, states: ['T2', 'T2 hypo', 'T2 izo', 'T2 hyper'] }, { btn: `${prefix}_mr_dwi`, states: ['DWI', 'DWI -', 'DWI +'] }, { btn: `${prefix}_mr_swi`, states: ['SWI', 'SWI -', 'SWI +'] }, { btn: `${prefix}_mr_t1c`, states: ['kontrast', 'bez sycení', 'sycení', 'izo', 'hyper', 'progresivní', 'wash-out'] } ] ]),
        helpers.Table1col(`${prefix}_r6`, [ [ 'Vzhled CT:', { btn: `${prefix}_ct_nat`, states: ['nativ', 'nativ hypo', 'nativ izo', 'nativ hyper'] }, { btn: `${prefix}_ct_syc`, states: ['kontrast', 'bez sycení', 'sycení', 'izo', 'hyper', 'progresivní', 'wash-out'] }, { btn: `${prefix}_ct_nek`, states: ['nekróza', 'centrální'] }, { btn: `${prefix}_ct_kal`, states: ['kalcif.', 'centrální', 'periferní', 'nepravid.'] }, { btn: `${prefix}_ct_bez`, type: 'basic', text: 'bez korelátu' } ] ]),
        helpers.Table1col(`${prefix}_r7`, [ [ 'Největší:',  { field: 'text', id: `${prefix}_nej_text`, placeholder: 'Kde...' }] ]),
        LESIONS_DEFINITION.getLesionMetricsRow(helpers, `${prefix}_r8`, metPfx),
        LESIONS_DEFINITION.getLesionEtiologyRow(helpers, `${prefix}_r9`, etioPfx)
    ],

    buildPastStr: (ctx, metPfx, size, suv) => {
        if (!Store.pastDate) return '';
        const cntOld = ctx.isActive(`${metPfx}_cnt_old`) ? ctx.text(`${metPfx}_cnt_old`) : '';
        if (cntOld === '0') return ' (nově)';

        let sizeOld = ctx.field(`${metPfx}_size_old`);
        let suvOld = ctx.field(`${metPfx}_suv_old`);
        let pastArr = [];
        if (sizeOld) pastArr.push((size && size.trim() === sizeOld.trim()) ? 'shodného rozměru' : `${sizeOld} mm`);
        if (suvOld) {
            if (APP_SETTINGS.suvWord && suv) {
                const cLiv = extractNumber(Store.fields['suv_jater'] || '3.0');
                const mLiv = extractNumber(Store.fields['suv_jater_minule'] || '3.0');
                pastArr.push(MetricsEngine.getSuvDynamicsWord(suv, suvOld, cLiv, mLiv));
            } else {
                pastArr.push(`SUVmax ${suvOld}`);
            }
        }
        if (cntOld === 'méně') pastArr.push('počet menší');
        else if (cntOld === 'více') pastArr.push('počet větší');
        else if (cntOld === 'kolísání') pastArr.push('část vymizela, část přibyla');
        return pastArr.length ? ` (minule ${pastArr.join(', ')})` : '';
    },

    parseLesionMetrics: (ctx, metPfx, pocetText, nejText) => {
        let size = ctx.field(`${metPfx}_size`);
        let suv = ctx.field(`${metPfx}_suv`);
        
        let prefixNej = '';
        if (nejText && pocetText !== 'solitární') {
            prefixNej = (pocetText === 'dvě') ? `, větší ${nejText}` : `, největší ${nejText}`;
        }

        let pastStr = LESIONS_DEFINITION.buildPastStr(ctx, metPfx, size, suv);

        let suvText = suv ? MetricsEngine.getSuvText(suv) : '';
        let metrikyStr = '';
        
        if (size) {
            let dimLabel = size.includes('x') ? 'rozměru' : 'max. diametru';
            metrikyStr = `${prefixNej} ${dimLabel} ${size} mm${suv ? ' ' + suvText : ''}${pastStr}`;
        } else if (suv) {
            metrikyStr = `${prefixNej} ${suvText}${pastStr}`;
        } else if (prefixNej) {
            metrikyStr = `${prefixNej}${pastStr}`;
        } else if (pastStr) {
            metrikyStr = `${pastStr}`;
        }

        if (metrikyStr && !metrikyStr.startsWith(',') && !metrikyStr.startsWith(' ')) {
             metrikyStr = ' ' + metrikyStr;
        }
        return metrikyStr;
    },

    parseLesionEtiology: (ctx, etioPfx) => {
        let etioMap = [
            { id: `${etioPfx}_b`, base: 'benigní' },
            { id: `${etioPfx}_m`, base: 'maligní' },
            { id: `${etioPfx}_t`, base: 'tumor' },
            { id: `${etioPfx}_meta`, base: 'meta' },
            { id: `${etioPfx}_inf`, base: 'zánět' }
        ];

        let certainties = { '!': [], '+': [], '?': [] };
        let hasQ = ctx.isActive(`${etioPfx}_q`);

        etioMap.forEach(e => {
            if (ctx.isActive(e.id)) {
                let val = ctx.text(e.id);
                if (val.endsWith('!')) certainties['!'].push(e.base);
                else if (val.endsWith('+')) certainties['+'].push(e.base);
                else if (val.endsWith('?')) certainties['?'].push(e.base);
            }
        });

        if (ctx.isActive(`${etioPfx}_cust_etio`)) {
            let val = ctx.text(`${etioPfx}_cust_etio`).trim();
            if (val && val !== 'vlastní') {
                let level = '+'; 
                let base = val;
                if (val.endsWith('!')) { level = '!'; base = val.slice(0, -1).trim(); }
                else if (val.endsWith('+')) { level = '+'; base = val.slice(0, -1).trim(); }
                else if (val.endsWith('?')) { level = '?'; base = val.slice(0, -1).trim(); }
                certainties[level].push(base);
            }
        }

        let etioStr = "";
        if (hasQ) {
            etioStr = "etiologii nyní nelze spolehlivě určit";
        } else {
            let highestLevel = null;
            if (certainties['!'].length > 0) highestLevel = '!';
            else if (certainties['+'].length > 0) highestLevel = '+';
            else if (certainties['?'].length > 0) highestLevel = '?';

            if (highestLevel) {
                let highestItems = certainties[highestLevel];
                let highestStr = "";
                
                if (highestItems.length > 1) {
                    highestStr = "v dif.dg. " + highestItems.join(', ');
                } else {
                    let item = highestItems[0];
                    if (highestLevel === '!') {
                        if (item === 'benigní') highestStr = 'benigního charakteru';
                        else if (item === 'maligní') highestStr = 'maligního charakteru';
                        else if (item === 'tumor') highestStr = 'charakteru tumoru';
                        else if (item === 'meta') highestStr = 'charakteru metastázy';
                        else if (item === 'zánět') highestStr = 'zánětlivé etiologie';
                        else highestStr = 'v.s. ' + (GRAMMAR_DICT.etiologie2pad?.[item.toLowerCase()] || item);
                    } else if (highestLevel === '+') {
                        highestStr = 'v.s. ' + item;
                    } else if (highestLevel === '?') {
                        highestStr = 'susp. ' + item;
                    }
                }

                let otherItems = [];
                if (highestLevel === '!') {
                    otherItems = [...certainties['+'], ...certainties['?']];
                } else if (highestLevel === '+') {
                    otherItems = [...certainties['?']];
                }

                if (otherItems.length > 0) {
                    etioStr = highestStr + ", v dif.dg. " + otherItems.join(', ');
                } else {
                    etioStr = highestStr;
                }
            }
        }
        return etioStr;
    },

    getLymphNodeMetricsRow: (helpers, rowId, prefix) => {
        return helpers.Table2rowNormal(rowId, [
            ['Metriky:', 'Rozměry:', { field: 'size', id: `${prefix}_size`, placeholder: 'mm' }, 'SUVmax:', { field: 'suv', id: `${prefix}_suv`, placeholder: '...' }, 'Aktivita:', { btn: `${prefix}_act`, states: ['0', 'není', 'nízká', 'intermediární', 'zvýšená', 'vysoká'] }],
            LESIONS_DEFINITION.getMinuleRowCells(prefix),
        ]);
    },
    getLymphNodeEtiologyRow: (helpers, rowId, prefix) => {
        return helpers.Table1col(rowId, [
            ['Etiologie:', 
                { btn: `${prefix}_q`, states: ['?', '?'] },
                { btn: `${prefix}_b`, states: ['benigní', 'benigní?', 'benigní+', 'benigní!'] },
                { btn: `${prefix}_m`, states: ['maligní', 'maligní?', 'maligní+', 'maligní!'] },
                { btn: `${prefix}_t`, states: ['tumor', 'tumor?', 'tumor+', 'tumor!'] },
                { btn: `${prefix}_meta`, states: ['meta', 'meta?', 'meta+', 'meta!'] },
                { btn: `${prefix}_inf`, states: ['zánět', 'zánět?', 'zánět+', 'zánět!'] }
            ]
        ]);
    },
    getLymphNodeRowsPre: (helpers, prefix) => [
        helpers.Table1col(`${prefix}_r1_excl`, [ [ 'Počet:', { btn: `${prefix}_c_soli`, type: 'basic', text: 'solitární' }, { btn: `${prefix}_c_dve`, type: 'basic', text: 'dvě' }, { btn: `${prefix}_c_vice`, type: 'basic', text: 'vícečetné' }, { btn: `${prefix}_c_mnoho`, type: 'basic', text: 'mnohočetné' } ] ]),
        helpers.Table1col(`${prefix}_r2_excl`, [ [ 'Druh:', { btn: `${prefix}_k_uzl`, type: 'basic', text: 'uzlina'}, { btn: `${prefix}_k_pak`, type: 'basic', text: 'paket' }, { btn: `${prefix}_k_cust`, states: ['vlastní', 'custom'] } ] ])
    ],
    getLymphNodeRowsPost: (helpers, prefix, metPfx, etioPfx) => [
        helpers.Table1col(`${prefix}_r4`, [ [ { btn: `${prefix}_doplneni`, type: 'basic_custom', text: 'doplnění:' } ] ]),
        helpers.Table1col(`${prefix}_r5`, [ [ 'Vzhled MR:', { btn: `${prefix}_mr_t1`, states: ['T1', 'T1 hypo', 'T1 izo', 'T1 hyper'] }, { btn: `${prefix}_mr_t2`, states: ['T2', 'T2 hypo', 'T2 izo', 'T2 hyper'] }, { btn: `${prefix}_mr_dwi`, states: ['DWI', 'DWI -', 'DWI +'] }, { btn: `${prefix}_mr_swi`, states: ['SWI', 'SWI -', 'SWI +'] }, { btn: `${prefix}_mr_t1c`, states: ['kontrast', 'bez sycení', 'sycení', 'izo', 'hyper', 'progresivní', 'wash-out'] } ] ]),
        helpers.Table1col(`${prefix}_r6`, [ [ 'Vzhled CT:', { btn: `${prefix}_ct_nat`, states: ['nativ', 'nativ hypo', 'nativ izo', 'nativ hyper'] }, { btn: `${prefix}_ct_syc`, states: ['kontrast', 'bez sycení', 'sycení', 'izo', 'hyper', 'progresivní', 'wash-out'] }, { btn: `${prefix}_ct_nek`, states: ['nekróza', 'centrální'] }, { btn: `${prefix}_ct_kal`, states: ['kalcif.', 'centrální', 'periferní', 'nepravid.'] }, { btn: `${prefix}_ct_bez`, type: 'basic', text: 'bez korelátu' } ] ]),
        helpers.Table1col(`${prefix}_r7`, [ [ 'Největší:',  { field: 'text', id: `${prefix}_nej_text`, placeholder: 'Kde...' }] ]),
        LESIONS_DEFINITION.getLymphNodeMetricsRow(helpers, `${prefix}_r8`, metPfx),
        LESIONS_DEFINITION.getLymphNodeEtiologyRow(helpers, `${prefix}_r9`, etioPfx)
    ],

    parseLymphNodeMetrics: (ctx, metPfx, pocetText, nejText) => {
        let size = ctx.field(`${metPfx}_size`);
        let suv = ctx.field(`${metPfx}_suv`);
        
        let prefixNej = '';
        if (nejText && pocetText !== 'solitární') {
            prefixNej = (pocetText === 'dvě') ? `, větší ${nejText}` : `, největší ${nejText}`;
        }

        let pastStr = LESIONS_DEFINITION.buildPastStr(ctx, metPfx, size, suv);

        let suvText = suv ? MetricsEngine.getSuvText(suv) : '';
        let metrikyStr = '';
        
        if (size) {
            let is1D = !size.includes('x');
            let dimLabel = is1D ? 'diametru' : 'rozměru';
            let osaSufix = is1D ? ' v krátké ose' : '';
            metrikyStr = `${prefixNej} ${dimLabel} ${size} mm${osaSufix}${suv ? ' ' + suvText : ''}${pastStr}`;
        } else if (suv) {
            metrikyStr = `${prefixNej} ${suvText}${pastStr}`;
        } else if (prefixNej) {
            metrikyStr = `${prefixNej}${pastStr}`;
        } else if (pastStr) {
            metrikyStr = `${pastStr}`;
        }

        if (metrikyStr && !metrikyStr.startsWith(',') && !metrikyStr.startsWith(' ')) {
             metrikyStr = ' ' + metrikyStr;
        }
        return metrikyStr;
    },

    parseLymphNodeEtiology: (ctx, etioPfx) => {
        let etioMap = [
            { id: `${etioPfx}_b`, base: 'benigní' },
            { id: `${etioPfx}_m`, base: 'maligní' },
            { id: `${etioPfx}_t`, base: 'tumor' },
            { id: `${etioPfx}_meta`, base: 'meta' },
            { id: `${etioPfx}_inf`, base: 'zánět' }
        ];

        let certainties = { '!': [], '+': [], '?': [] };
        let hasQ = ctx.isActive(`${etioPfx}_q`);

        etioMap.forEach(e => {
            if (ctx.isActive(e.id)) {
                let val = ctx.text(e.id);
                if (val.endsWith('!')) certainties['!'].push(e.base);
                else if (val.endsWith('+')) certainties['+'].push(e.base);
                else if (val.endsWith('?')) certainties['?'].push(e.base);
            }
        });

        let etioStr = "";
        if (hasQ) {
            etioStr = "nelze etiologii spolehlivě určit";
        } else {
            let highestLevel = null;
            if (certainties['!'].length > 0) highestLevel = '!';
            else if (certainties['+'].length > 0) highestLevel = '+';
            else if (certainties['?'].length > 0) highestLevel = '?';

            if (highestLevel) {
                let highestItems = certainties[highestLevel];
                let highestStr = "";
                
                if (highestItems.length > 1) {
                    highestStr = "v dif.dg. " + highestItems.join(', ');
                } else {
                    let item = highestItems[0];
                    if (highestLevel === '!') {
                        if (item === 'benigní') highestStr = 'benigního charakteru';
                        else if (item === 'maligní') highestStr = 'maligního charakteru';
                        else if (item === 'tumor') highestStr = 'charakteru tumoru';
                        else if (item === 'meta') highestStr = 'charakteru metastázy';
                        else if (item === 'zánět') highestStr = 'zánětlivé etiologie';
                    } else if (highestLevel === '+') {
                        highestStr = 'v.s. ' + item;
                    } else if (highestLevel === '?') {
                        highestStr = 'susp. ' + item;
                    }
                }

                let otherItems = [];
                if (highestLevel === '!') {
                    otherItems = [...certainties['+'], ...certainties['?']];
                } else if (highestLevel === '+') {
                    otherItems = [...certainties['?']];
                }

                if (otherItems.length > 0) {
                    etioStr = highestStr + ", v dif.dg. " + otherItems.join(', ');
                } else {
                    etioStr = highestStr;
                }
            }
        }
        return etioStr;
    },

    parseDetails: (ctx, examId, regionId, pfx, metPfx, etioPfx, isLN) => {
        const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
        
        const pocetIds = [`${pfx}_c_soli`, `${pfx}_c_dve`, `${pfx}_c_vice`, `${pfx}_c_mnoho`];
        let pocetRawId = pocetIds.find(id => ctx.isActive(id));
        let pocetCfg = pocetRawId ? resolveButtonConfig(examId, regionId, pocetRawId) : null;
        let pocetText = pocetCfg?.text || 'solitární';

        const druhIds = isLN ? [`${pfx}_k_uzl`, `${pfx}_k_pak`, `${pfx}_k_cust`] : [`${pfx}_k_les`, `${pfx}_k_cys`, `${pfx}_k_exp`, `${pfx}_k_inf`, `${pfx}_k_def`, `${pfx}_k_kol`, `${pfx}_k_cust`];
        let druhRawId = druhIds.find(id => ctx.isActive(id));
        let defaultDruh = isLN ? 'uzlina' : 'ložisko';
        let druhRaw = defaultDruh;
        if (druhRawId === `${pfx}_k_cust`) {
            druhRaw = Store.customTexts[`${examId}_${regionId}_${pfx}_k_cust`] || defaultDruh;
        } else if (druhRawId) {
            const btnCfg = resolveButtonConfig(examId, regionId, druhRawId);
            if (btnCfg?.type === 'standard') {
                const stateVal = ctx.text(druhRawId);
                const stateMap = { 'sklerotické': 'sklerotické ložisko', 'lytické': 'lytické ložisko', 'smíšené': 'smíšené ložisko', 'dřeňové': 'ložisko kostní dřeně', 'cystické': 'cystické ložisko' };
                druhRaw = stateMap[stateVal] || stateVal;
            } else if (btnCfg) {
                druhRaw = btnCfg.text === 'cysta' ? 'cystické ložisko' : btnCfg.text;
            }
        }

        let druhObj = GRAMMAR_DICT.druh[druhRaw] || { rod: isLN ? 'f' : 'n', plural: druhRaw };
        let isPlural = pocetText !== 'solitární';
        let pocetSlovo = GRAMMAR_DICT.pocet[pocetText]?.[druhObj.rod] || pocetText;
        let druhSlovo = isPlural ? druhObj.plural : druhRaw;
        
        let baseText = pocetText === 'solitární' ? capitalize(druhSlovo) : capitalize(`${pocetSlovo} ${druhSlovo}`.trim());

        let vzhledy = [];
        
        // --- MR ---
        let mrT1 = ctx.text(`${pfx}_mr_t1`);
        if (mrT1 && mrT1 !== 'T1') vzhledy.push(mrT1 + 'signální');
        
        let mrT2 = ctx.text(`${pfx}_mr_t2`);
        if (mrT2 && mrT2 !== 'T2') vzhledy.push(mrT2 + 'signální');
        
        let mrDwi = ctx.text(`${pfx}_mr_dwi`);
        if (mrDwi === 'DWI -') vzhledy.push('bez restrikce difuze');
        else if (mrDwi === 'DWI +') vzhledy.push('s restrikcí difuze');
        
        let mrSwi = ctx.text(`${pfx}_mr_swi`);
        if (mrSwi === 'SWI -') vzhledy.push('v SWI negativní');
        else if (mrSwi === 'SWI +') vzhledy.push('s výpadky signálu v SWI');

        let mrT1c = ctx.text(`${pfx}_mr_t1c`);
        if (mrT1c === 'bez sycení') vzhledy.push('bez sycení po k.l.');
        else if (mrT1c === 'sycení') vzhledy.push('se sycením po k.l.');
        else if (mrT1c === 'izo' || mrT1c === 'izovaskulární') vzhledy.push('izovaskulární');
        else if (mrT1c === 'hyper' || mrT1c === 'hypervaskulární') vzhledy.push('hypervaskulární bez washoutu');
        else if (mrT1c === 'progresivní') vzhledy.push('s progresivním sycením');
        else if (mrT1c === 'wash-out') vzhledy.push('s wash-out fenoménem');

        if (isLN && ctx.isActive(`${pfx}_mr_ece`)) vzhledy.push('s extrakapsulárním šířením (ECE)');

        // --- CT ---
        if (ctx.isActive(`${pfx}_ct_bez`)) {
            vzhledy.push('bez CT korelátu');
        } else {
            let ctNat = ctx.text(`${pfx}_ct_nat`);
            if (ctNat && ctNat !== 'nativ') vzhledy.push(ctNat.replace('nativ ', 'nativně ') + 'denzní');

            let ctSyc = ctx.text(`${pfx}_ct_syc`);
            if (ctSyc === 'bez sycení') vzhledy.push('bez sycení');
            else if (ctSyc === 'sycení') vzhledy.push('se sycením');
            else if (ctSyc === 'izo' || ctSyc === 'izovaskulární') vzhledy.push('izovaskulární');
            else if (ctSyc === 'hyper' || ctSyc === 'hypervaskulární') vzhledy.push('hypervaskulární bez washoutu');
            else if (ctSyc === 'progresivní') vzhledy.push('s progresivním sycením');
            else if (ctSyc === 'wash-out') vzhledy.push('s wash-out fenoménem');

            let ctNek = ctx.text(`${pfx}_ct_nek`);
            if (ctNek === 'centrální') vzhledy.push('s centrální nekrózou');

            let ctKal = ctx.text(`${pfx}_ct_kal`);
            if (ctKal === 'centrální') vzhledy.push('s centrální kalcifikací');
            else if (ctKal === 'periferní') vzhledy.push('s periferními kalcifikacemi');
            else if (ctKal === 'nepravid.') vzhledy.push('s nepravidelnými kalcifikacemi');
        }

        let vzhledText = vzhledy.length > 0 ? ` (${vzhledy.join(', ')})` : '';

        let rowNej = document.getElementById(`${pfx}_r7`);
        if (rowNej) {
            const wrapperTr = rowNej.closest('tr');
            if (wrapperTr) wrapperTr.style.display = (pocetText === 'solitární') ? 'none' : '';
        }

        let metrikyStr = isLN ? LESIONS_DEFINITION.parseLymphNodeMetrics(ctx, metPfx, pocetText, ctx.field(`${pfx}_nej_text`)) : LESIONS_DEFINITION.parseLesionMetrics(ctx, metPfx, pocetText, ctx.field(`${pfx}_nej_text`));
        let doplneni = ctx.isActive(`${pfx}_doplneni`) ? (Store.customTexts[`${examId}_${regionId}_${pfx}_doplneni`] || '') : '';
        let doplneniStr = doplneni ? ` ${doplneni}` : '';
        let etioStr = isLN ? LESIONS_DEFINITION.parseLymphNodeEtiology(ctx, etioPfx) : LESIONS_DEFINITION.parseLesionEtiology(ctx, etioPfx);
        
        const activityTerms = [
            { match: 'fdg', with: 'metabolickou aktivitou', without: 'metabolické aktivity', adj: { 'nízká': 'nízkou', 'intermediární': 'intermediární', 'zvýšená': 'zvýšenou', 'vysoká': 'vysokou' } },
            { match: 'psma', with: 'PSMA expresí', without: 'PSMA exprese', adj: { 'nízká': 'nízkou', 'intermediární': 'intermediární', 'zvýšená': 'zvýšenou', 'vysoká': 'vysokou' } },
            { match: 'dotatoc', with: 'nakupením somatostatinových receptorů', without: 'nakupení somatostatinových receptorů', adj: { 'nízká': 'nízkým', 'intermediární': 'intermediárním', 'zvýšená': 'zvýšeným', 'vysoká': 'vysokým' } },
            { match: 'dopa', with: 'konzumpcí aminokyseliny', without: 'konzumpce aminokyseliny', adj: { 'nízká': 'nízkou', 'intermediární': 'intermediární', 'zvýšená': 'zvýšenou', 'vysoká': 'vysokou' } },
            { match: '', with: 'akumulací RF', without: 'akumulace RF', adj: { 'nízká': 'nízkou', 'intermediární': 'intermediární', 'zvýšená': 'zvýšenou', 'vysoká': 'vysokou' } }
        ];
        const term = activityTerms.find(t => (examId || '').toLowerCase().includes(t.match)) || activityTerms[activityTerms.length - 1];

        let act = ctx.text(`${metPfx}_act`, true);
        let actStr = '';
        if (act && act !== '0' && act !== 'není') {
            let actLevel = term.adj[act] || act;
            let prep = actLevel.match(/^[szšž]/i) ? 'se' : 's';
            actStr = ` ${prep} ${actLevel} ${term.with}`;

            if ((examId || '').toLowerCase().includes('psma')) {
                let suvRaw = ctx.field(`${metPfx}_suv`);
                if (suvRaw) {
                    let suvVal = extractNumber(suvRaw);
                    let refLiv = extractNumber(Store.fields['suv_jater'] || '3.0');
                    let refPar = extractNumber(Store.fields['suv_parotid'] || '20.0');
                    if (!isNaN(suvVal) && !isNaN(refLiv) && !isNaN(refPar)) {
                        let grade = '';
                        if (suvVal < refLiv) grade = 'grade 1';
                        else if (suvVal < refPar) grade = 'grade 2';
                        else grade = 'grade 3';
                        actStr += ` (${grade})`;
                    }
                }
            }
        } else if (act === 'není') {
            actStr = ` bez ${term.without}`;
        }
        
        let dynStr = ctx.getDynamics(`${metPfx}_size`, `${metPfx}_size_old`, `${metPfx}_suv`, `${metPfx}_suv_old`, `${metPfx}_cnt_old`);
        if (dynStr) dynStr = `, ${dynStr}`;

        let hasAny = !!(pocetRawId || druhRawId || ctx.field(`${metPfx}_size`) || ctx.field(`${metPfx}_suv`) || ctx.isActive(`${metPfx}_cnt_old`) || vzhledy.length > 0 || etioStr !== "");

        return { hasAny, baseText, vzhledText, metrikyStr, doplneniStr, etioStr, actStr, dynStr };
    }
};
