const RegionWrist = {
    title: 'MR Zápěstí',
    reportLayout: 'block',
    layout: (helpers) => {
        return [
            // --- KLOUBNÍ DUTINA ---
            helpers.TableMain('wrist_joint_main', 'Kloubní dutina', [
                helpers.Table2colNormal('wri_jt_table', '', [
                    [ 'Náplň:', { btn: 'wri_jt_fluid', states: ['0', 'mírná', 'střední', 'výrazná'] } ],
                    [ 'Synovitida:', { btn: 'wri_jt_syn', type: 'basic', text: '+' } ],
                    [ 'Volná tělíska:', { btn: 'wri_jt_loose', type: 'basic', text: '+' } ],
                    [ 'Ganglion:', { btn: 'wri_jt_ganglion', type: 'basic_custom', text: 'kde:' } ]
                ]),
                helpers.Table1col('wrist_joint_add', [
                    { field: 'text', id: 'wri_jt_desc', placeholder: 'vlastní popis...' },
                    { field: 'text', id: 'wri_jt_conc', placeholder: 'vlastní závěr...' }
                ])
            ]),

            // --- KOSTI ---
            helpers.TableMain('wrist_bones_main', 'Kosti', [
                helpers.Table2colNormal('wri_bn_table', '', [
                    [ 'Skafoideum:', { btn: 'wri_bn_scaphoid', states: ['0', 'suspektní', 'fraktura prox. pólu', 'fraktura pasu', 'fraktura dist. pólu'] } ],
                    [ 'Lunatum (Kienböck):', { btn: 'wri_bn_kienbock', states: ['0', 'časný', 'pokročilý'] } ],
                    [ 'Ulnar impaction:', { btn: 'wri_bn_uimp', type: 'basic', text: '+' } ],
                    [ 'Subchondr. edém / cysty:', { btn: 'wri_bn_edema', type: 'basic_custom', text: 'kde:' } ]
                ]),
                helpers.Table1col('wrist_bones_add', [
                    { field: 'text', id: 'wri_bn_desc', placeholder: 'vlastní popis...' },
                    { field: 'text', id: 'wri_bn_conc', placeholder: 'vlastní závěr...' }
                ])
            ]),

            // --- VAZY & TFCC ---
            helpers.TableMain('wrist_lig_main', 'Vazy & TFCC', [
                helpers.Table2colNormal('wri_lig_table', '', [
                    [ 'SL vaz:', { btn: 'wri_lig_sl', states: ['OK', 'parciální', 'ruptura (DISI-)', 'ruptura (DISI+)'] } ],
                    [ 'LT vaz:', { btn: 'wri_lig_lt', states: ['OK', 'parciální', 'ruptura (VISI-)', 'ruptura (VISI+)'] } ],
                    [ 'TFCC:', { btn: 'wri_lig_tfcc', states: ['OK', 'degenerace', 'parciální', 'foveální rpt.'] } ],
                    [ 'DRUJ stabilita:', { btn: 'wri_lig_druj', states: ['stabilní', 'instabilita'] } ]
                ]),
                helpers.Table1col('wrist_lig_add', [
                    { field: 'text', id: 'wri_lig_desc', placeholder: 'vlastní popis...' },
                    { field: 'text', id: 'wri_lig_conc', placeholder: 'vlastní závěr...' }
                ])
            ]),

            // --- ŠLACHY & NERVY ---
            helpers.TableMain('wrist_tendons_main', 'Šlachy & Nervy', [
                helpers.Table2colNormal('wri_sn_table', '', [
                    [ 'De Quervain:', { btn: 'wri_sn_dq', type: 'basic', text: '+' } ],
                    [ 'ECU subluxace:', { btn: 'wri_sn_ecu', type: 'basic', text: '+' } ],
                    [ 'Tenosynovitida flexorů:', { btn: 'wri_sn_flex', type: 'basic', text: '+' } ],
                    [ 'Karpální tunel:', { btn: 'wri_sn_cts', type: 'basic', text: '+' } ]
                ]),
                helpers.Table1col('wrist_tendons_add', [
                    { field: 'text', id: 'wri_sn_desc', placeholder: 'vlastní popis...' },
                    { field: 'text', id: 'wri_sn_conc', placeholder: 'vlastní závěr...' }
                ])
            ]),

            // --- OSTATNÍ ---
            helpers.TableMain('wrist_other_main', 'Ostatní', [
                helpers.Table1col('wrist_other_add', [
                    { field: 'text', id: 'wri_other_desc', placeholder: 'vlastní popis...' },
                    { field: 'text', id: 'wri_other_conc', placeholder: 'vlastní závěr...' }
                ])
            ])
        ];
    },

    compile: (ctx) => {
        const side = Store.fields['wrist_side'];
        let sideTitle = 'Zápěstí:';
        if (side === 'R') sideTitle = 'Pravé zápěstí:';
        else if (side === 'L') sideTitle = 'Levé zápěstí:';

        let reportOut = [{ type: 'heading', text: sideTitle, action: 'open-region', regionId: 'wrist' }];
        let concMain = [];
        let hasPathology = false;
        
        const cap = (s) => s && s.charAt(0).toUpperCase() + s.slice(1);
        const formatZaver = (str) => cap(str) + (str.endsWith('.') ? '' : '.');
        const pushConc = (txt) => { concMain.push({ type: 'frame', text: formatZaver(txt), tableId: 'wrist_joint_main' }); hasPathology = true; };

        // 1. Kloubní dutina
        let jtPatho = [];
        let jtPhysio = [];
        const fluid = ctx.text('wri_jt_fluid');
        if (!fluid || fluid === '0') jtPhysio.push('radiokarpální a mediokarpální klouby bez patologické náplně');
        else if (fluid === 'mírná') { jtPatho.push('mírně zvýšené množství kloubní tekutiny radiokarpálně/mediokarpálně bez synoviální proliferace'); pushConc('Zmnožená tekutina v kloubních dutinách'); }
        else if (fluid === 'střední') { jtPatho.push('zvýšené množství tekutiny v kloubních dutinách, přiměřeně napjaté pouzdro'); pushConc('Zmnožená tekutina v kloubních dutinách'); }
        else if (fluid === 'výrazná') { jtPatho.push('výrazná náplň kloubních dutin se známkami napětí pouzdra'); pushConc('Výrazně zmnožená tekutina v kloubních dutinách'); }

        if (ctx.isActive('wri_jt_syn')) { jtPatho.push('synoviální ztluštění s vyšším signálem na T2/PD-FS'); pushConc('Synovitida'); }
        if (ctx.isActive('wri_jt_loose')) { jtPatho.push('v kloubu ložiskově drobná tělíska/kalcifikace (hypoT1/hypoT2 až s bloomingem), bez jasné impakce'); pushConc('Volná nitrokloubní tělíska'); }
        
        const gang = ctx.text('wri_jt_ganglion', true);
        if (ctx.isActive('wri_jt_ganglion')) {
            const loc = (gang && gang !== '[nevyplněno]') ? ` (${gang.replace('\u200B', '')})` : '';
            jtPatho.push(`cystická léze tekutinového signálu s tenkou stěnou${loc}`);
            pushConc(`Ganglion${loc}`);
        }
        
        const jtDesc = ctx.field('wri_jt_desc');
        if (jtDesc) jtPatho.push(jtDesc);

        if (jtPatho.length > 0) reportOut.push({ type: 'frame', text: cap(jtPatho.join('. ')) + '.', tableId: 'wrist_joint_main' });
        if (jtPhysio.length > 0) reportOut.push({ type: 'frame', text: cap(jtPhysio.join('. ')) + '.', tableId: 'wrist_joint_main', dimmed: true });
        
        const jtConc = ctx.field('wri_jt_conc');
        if (jtConc) pushConc(jtConc);

        // 2. Kosti
        let bnPatho = [];
        let bnPhysio = [];
        const scaph = ctx.text('wri_bn_scaphoid');
        if (!scaph || scaph === '0') bnPhysio.push('skafoideum bez linie fraktury, bez kostního edému a bez poruchy kortikalis');
        else if (scaph === 'suspektní') { bnPatho.push('v oblasti skafoidea jemná liniová nízkosignální kresba na T1 s okolním edémem na STIR/PD-FS'); pushConc('Suspektní okultní fraktura skafoidea'); }
        else if (scaph.includes('fraktura')) {
            const loc = scaph.replace('fraktura ', '');
            bnPatho.push(`zřetelná frakturní linie skafoidea v oblasti ${loc} s porušením kortikalis`);
            pushConc(`Fraktura ${loc} skafoidea`);
        }

        const kien = ctx.text('wri_bn_kienbock');
        if (kien === 'časný') { bnPatho.push('lunatum s difuzním snížením T1 signálu a kolísavým T2/STIR, bez kolapsu – obraz časné AVN (Kienböck)'); pushConc('Kienböckova choroba lunata – časná fáze'); }
        else if (kien === 'pokročilý') { bnPatho.push('lunatum se sníženým T1 signálem, fragmentací a subchondrálním kolapsem, okolní reaktivní změny – pokročilá AVN (Kienböck)'); pushConc('Kienböckova choroba lunata – pokročilá fáze'); }
        else if (!kien || kien === '0') { bnPhysio.push('lunatum normálního signálu, bez kolapsu'); }

        if (ctx.isActive('wri_bn_uimp')) {
            bnPatho.push('znaky ulnar impaction: plus varianta ulny, subchondrální edém/chondromalacie ulnární části lunata a triquetra, změny u ulnární hlavičky a ulnárního úponu TFCC');
            pushConc('Ulnar impaction syndrom');
        }

        const edem = ctx.text('wri_bn_edema', true);
        if (ctx.isActive('wri_bn_edema')) {
            const loc = (edem && edem !== '[nevyplněno]') ? ` (${edem.replace('\u200B', '')})` : '';
            bnPatho.push(`subchondrální edém / cysty${loc}`);
            pushConc(`Subchondrální edém / cysty${loc}`);
        }

        const bnDesc = ctx.field('wri_bn_desc');
        if (bnDesc) bnPatho.push(bnDesc);

        if (bnPatho.length > 0) reportOut.push({ type: 'frame', text: cap(bnPatho.join('. ')) + '.', tableId: 'wrist_bones_main' });
        if (bnPhysio.length > 0) reportOut.push({ type: 'frame', text: cap(bnPhysio.join('. ')) + '.', tableId: 'wrist_bones_main', dimmed: true });
        
        const bnConc = ctx.field('wri_bn_conc');
        if (bnConc) pushConc(bnConc);

        // 3. Vazy a TFCC
        let ligPatho = [];
        let ligPhysio = [];
        const sl = ctx.text('wri_lig_sl');
        if (!sl || sl === 'OK') ligPhysio.push('SL vaz intaktní, bez diskontinuity a bez tekutinové fisury');
        else if (sl === 'parciální') { ligPatho.push('SL vaz ztluštělý se zvýšeným signálem na PD-FS, bez kompletní diskontinuity (parciální léze)'); pushConc('Parciální léze scapholunátního vazu'); }
        else if (sl.includes('ruptura')) {
            const hasDisi = sl.includes('DISI+');
            ligPatho.push(`SL vaz s diskontinuitou a tekutinou v intervalu; ${hasDisi ? 'přítomny známky DISI' : 'bez jednoznačných známek DISI'}`);
            pushConc(`Ruptura scapholunátního vazu${hasDisi ? ' se známkami DISI' : ''}`);
        }

        const lt = ctx.text('wri_lig_lt');
        if (!lt || lt === 'OK') ligPhysio.push('LT vaz intaktní, bez diskontinuity');
        else if (lt === 'parciální') { ligPatho.push('LT vaz s vyšším signálem na PD-FS a ztluštěním, kontinuální (parciální léze)'); pushConc('Parciální léze lunotriquetrálního vazu'); }
        else if (lt.includes('ruptura')) {
            const hasVisi = lt.includes('VISI+');
            ligPatho.push(`LT vaz přerušen, tekutina v intervalu; ${hasVisi ? 'přítomny známky VISI' : 'bez jednoznačných známek VISI'}`);
            pushConc(`Ruptura lunotriquetrálního vazu${hasVisi ? ' se známkami VISI' : ''}`);
        }

        const tfcc = ctx.text('wri_lig_tfcc');
        if (!tfcc || tfcc === 'OK') ligPhysio.push('TFCC normální tloušťky a signálu, bez defektu');
        else if (tfcc === 'degenerace') { ligPatho.push('TFCC ztluštělý s vyšším signálem v centrální části, bez prokazatelné komunikace – degenerativní změny'); pushConc('Degenerativní změny TFCC'); }
        else if (tfcc === 'parciální') { ligPatho.push('TFCC s intrasubstanční fisurou/zvýšeným signálem, bez kompletního defektu disku'); pushConc('Parciální léze TFCC'); }
        else if (tfcc === 'foveální rpt.') { ligPatho.push('diskontinuita u foveálního ulnárního úponu TFCC s tekutinovou komunikací do DRUJ, přidružené změny u ulnární hlavičky možné'); pushConc('Ruptura TFCC u foveálního úponu'); }

        const druj = ctx.text('wri_lig_druj');
        if (!druj || druj === 'stabilní') ligPhysio.push('DRUJ morfologicky přiměřený, bez známek subluxace');
        else if (druj === 'instabilita') { ligPatho.push('DRUJ s jemnou ventrální/dorzální předsazeností ulnární hlavičky a asymetrií štěrbiny – MR známky laxity; korelace klinicky'); pushConc('MR známky instability DRUJ'); }

        const ligDesc = ctx.field('wri_lig_desc');
        if (ligDesc) ligPatho.push(ligDesc);

        if (ligPatho.length > 0) reportOut.push({ type: 'frame', text: cap(ligPatho.join('. ')) + '.', tableId: 'wrist_lig_main' });
        if (ligPhysio.length > 0) reportOut.push({ type: 'frame', text: cap(ligPhysio.join('. ')) + '.', tableId: 'wrist_lig_main', dimmed: true });
        
        const ligConc = ctx.field('wri_lig_conc');
        if (ligConc) pushConc(ligConc);

        // 4. Šlachy a nervy
        let snParts = [];
        if (ctx.isActive('wri_sn_dq')) { snParts.push('obraz De Quervain: zbytnění retinakula 1. kompartmentu, tekutina v pochvě APL/EPB a ztluštění šlach'); pushConc('Tendovaginitida De Quervain'); }
        if (ctx.isActive('wri_sn_ecu')) { snParts.push('ECU: excentrická poloha v sulcus ulnaris s tekutinou v pochvě, známky porušeného subsheath – odpovídá subluxaci'); pushConc('Subluxace šlachy ECU'); }
        if (ctx.isActive('wri_sn_flex')) { snParts.push('flexory s tenosynovitidou – tekutina v pochvách, ztluštění synovie, zvýšený signál šlach na PD-FS'); pushConc('Tenosynovitida flexorů'); }
        if (ctx.isActive('wri_sn_cts')) { snParts.push('karpální tunel: ztluštění n. medianus proximálně s T2 hyperintenzitou a zploštěním pod retinakulem, částečná obliterace tukového lemu'); pushConc('MR známky syndromu karpálního tunelu'); }
        
        const snDesc = ctx.field('wri_sn_desc');
        if (snDesc) snParts.push(snDesc);
        
        if (snParts.length === 0) {
            reportOut.push({ type: 'frame', text: 'Šlachy a nervy bez signálních změn či ztluštění.', tableId: 'wrist_tendons_main', dimmed: true });
        } else {
            reportOut.push({ type: 'frame', text: cap(snParts.join('. ')) + '.', tableId: 'wrist_tendons_main' });
        }

        const snConc = ctx.field('wri_sn_conc');
        if (snConc) pushConc(snConc);

        // Ostatní
        const otherDesc = ctx.field('wri_other_desc');
        if (otherDesc) reportOut.push({ type: 'frame', text: otherDesc, tableId: 'wrist_other_main' });
        const otherConc = ctx.field('wri_other_conc');
        if (otherConc) pushConc(otherConc);

        if (!hasPathology) {
            concMain.push({ type: 'frame', text: 'MR zápěstí bez průkazu závažné patologie.', tableId: 'wrist_joint_main', dimmed: true });
        }

        return { report: reportOut, conclusion: { main: concMain, incidental: [] } };
    }
};