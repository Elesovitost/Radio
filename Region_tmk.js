const RegionTmk = {
    title: 'MR TMK',
    reportLayout: 'block',
    layout: (helpers) => {
        return [
            // --- KLOUBNÍ DUTINA ---
            helpers.TableMain('tmk_joint_main', 'Kloubní dutina a Synovie', [
                helpers.Table3colRL('tmk_jt_table', '', [
                    [ { btn: 'tmk_r_eff', states: ['0', '↑', '↑↑', '↑↑↑'] }, 'Náplň dutiny', { btn: 'tmk_l_eff', states: ['0', '↑', '↑↑', '↑↑↑'] } ],
                    [ { btn: 'tmk_r_syn', type: 'basic', text: '+' }, 'Synovitida', { btn: 'tmk_l_syn', type: 'basic', text: '+' } ],
                    [ { btn: 'tmk_r_caps', type: 'basic', text: '+' }, 'Kapsulitida', { btn: 'tmk_l_caps', type: 'basic', text: '+' } ]
                ])
            ]),

            // --- KONDYL ---
            helpers.TableMain('tmk_condyle_main', 'Kondyl a Chrupavka', [
                helpers.Table3colRL('tmk_cond_table', '', [
                    [ { btn: 'tmk_r_boneEdema', type: 'basic', text: '+' }, 'Subchondr. edém', { btn: 'tmk_l_boneEdema', type: 'basic', text: '+' } ],
                    [ { btn: 'tmk_r_arthr', states: ['0', 'mírná art.', 'těžká art.'] }, 'Artróza', { btn: 'tmk_l_arthr', states: ['0', 'mírná art.', 'těžká art.'] } ],
                    [ { btn: 'tmk_r_cart', states: ['normální', 'thinning', 'chondromalacie', 'defekt'] }, 'Chrupavka', { btn: 'tmk_l_cart', states: ['normální', 'thinning', 'chondromalacie', 'defekt'] } ],
                    [ { btn: 'tmk_r_condContour', states: ['fyziologická', 'plochá', 'osteofytická', 'deformovaná'] }, 'Kontura kondylu', { btn: 'tmk_l_condContour', states: ['fyziologická', 'plochá', 'osteofytická', 'deformovaná'] } ]
                ])
            ]),

            // --- DISK ---
            helpers.TableMain('tmk_disc_main', 'Disk', [
                helpers.Table3colRL('tmk_disc_table', '', [
                    [ { btn: 'tmk_r_discPos', states: ['centrická', 'ant. dislokace', 'post. dislokace', 'mediální/laterální'] }, 'Poloha (zavřeno)', { btn: 'tmk_l_discPos', states: ['centrická', 'ant. dislokace', 'post. dislokace', 'mediální/laterální'] } ],
                    [ { btn: 'tmk_r_reduction', states: ['neprovedeno', 's redukcí', 'bez redukce'] }, 'Redukce (otevření)', { btn: 'tmk_l_reduction', states: ['neprovedeno', 's redukcí', 'bez redukce'] } ],
                    [ { btn: 'tmk_r_discMorph', states: ['normální', 'ztenčený', 'deformovaný', 'dysplastický'] }, 'Morfologie', { btn: 'tmk_l_discMorph', states: ['normální', 'ztenčený', 'deformovaný', 'dysplastický'] } ],
                    [ { btn: 'tmk_r_perfor', type: 'basic', text: '+' }, 'Perforace', { btn: 'tmk_l_perfor', type: 'basic', text: '+' } ],
                    [ { btn: 'tmk_r_retroEdema', type: 'basic', text: '+' }, 'Retrodiskální edém', { btn: 'tmk_l_retroEdema', type: 'basic', text: '+' } ]
                ])
            ]),

            // --- FUNKCE ---
            helpers.TableMain('tmk_func_main', 'Funkce a Translace', [
                helpers.Table3colRL('tmk_func_table', '', [
                    [ { btn: 'tmk_r_translation', states: ['normální', 'omezená', 'hypertranslace'] }, 'Translace', { btn: 'tmk_l_translation', states: ['normální', 'omezená', 'hypertranslace'] } ],
                    [ { btn: 'tmk_r_mobility', states: ['0', 'hypomobilita', 'hypermobilita'] }, 'Hyper/hypomob.', { btn: 'tmk_l_mobility', states: ['0', 'hypomobilita', 'hypermobilita'] } ],
                    [ { btn: 'tmk_r_ankyl', states: ['0', 'fibrotická?', 'kostní?'] }, 'Ankylóza', { btn: 'tmk_l_ankyl', states: ['0', 'fibrotická?', 'kostní?'] } ]
                ])
            ]),

            // --- OSTATNÍ ---
            helpers.TableMain('tmk_other_main', 'Ostatní', [
                helpers.Table1col('tmk_other_add', [
                    { field: 'text', id: 'tmk_desc', placeholder: 'vlastní popis...' },
                    { field: 'text', id: 'tmk_conc', placeholder: 'vlastní závěr...' }
                ])
            ])
        ];
    },

    compile: (ctx) => {
        let reportOut = [{ type: 'heading', text: 'Temporomandibulární klouby (TMK):', action: 'open-region', regionId: 'tmk' }];
        let concMain = [];
        let concInc = [];
        
        const cap = (s) => s && s.charAt(0).toUpperCase() + s.slice(1);
        const formatZaver = (arr) => arr.map(a => cap(a) + (a.endsWith('.') ? '' : '.')).join(' ');

        const parseSide = (pfx, label) => {
            let rPatho = [];
            let rPhysio = [];
            let cMain = [];

            // 1. Kloubní dutina
            const eff = ctx.text(`tmk_${pfx}_eff`);
            if (eff === '↑') { rPatho.push('mírná tekutinová náplň kloubní dutiny'); cMain.push('mírně zmnožená tekutina v kloubu'); }
            else if (eff === '↑↑') { rPatho.push('zvýšená tekutinová náplň kloubní dutiny'); cMain.push('zmnožená tekutina v kloubu'); }
            else if (eff === '↑↑↑') { rPatho.push('výrazná tekutinová náplň kloubní dutiny s napětím pouzdra'); cMain.push('výrazně zmnožená tekutina v kloubu'); }
            else if (!eff || eff === '0') { rPhysio.push('bez patologické náplně kloubní dutiny'); }
            
            if (ctx.isActive(`tmk_${pfx}_syn`)) { rPatho.push('synoviální ztluštění a zvýšený signál (synovitida)'); cMain.push('synovitida'); }
            if (ctx.isActive(`tmk_${pfx}_caps`)) { rPatho.push('ztluštění a sycení pouzdra (kapsulitida)'); cMain.push('kapsulitida'); }

            // 2. Kondyl
            if (ctx.isActive(`tmk_${pfx}_boneEdema`)) { rPatho.push('subchondrální edém kondylu/eminence'); cMain.push('subchondrální edém kondylu/eminence'); }
            
            const arthr = ctx.text(`tmk_${pfx}_arthr`);
            if (arthr === 'mírná art.') { rPatho.push('osteofytické nárůstky'); cMain.push('mírné artrotické změny'); }
            else if (arthr === 'těžká art.') { rPatho.push('výrazné degenerativní změny se sklerotizací'); cMain.push('pokročilé artrotické změny'); }
            
            const cart = ctx.text(`tmk_${pfx}_cart`);
            if (cart === 'thinning') { rPatho.push('tenká kloubní chrupavka (thinning)'); cMain.push('ztenčení chrupavky'); }
            else if (cart === 'chondromalacie') { rPatho.push('chondromalacie chrupavky'); cMain.push('chondromalacie'); }
            else if (cart === 'defekt') { rPatho.push('ohraničený defekt chrupavky'); cMain.push('defekt chrupavky'); }
            else if (cart === 'normální') { rPhysio.push('kloubní chrupavka obvyklé tloušťky a signálu'); }
            
            const cont = ctx.text(`tmk_${pfx}_condContour`);
            if (cont === 'plochá') { rPatho.push('zploštění kontury kondylu'); }
            else if (cont === 'osteofytická') { rPatho.push('osteofytické změny kontury kondylu'); }
            else if (cont === 'deformovaná') { rPatho.push('deformovaná kontura kondylu'); cMain.push('deformace kondylu'); }
            else if (cont === 'fyziologická') { rPhysio.push('fyziologická kontura kondylu'); }
            
            // 3. Disk
            const dPos = ctx.text(`tmk_${pfx}_discPos`);
            const dRed = ctx.text(`tmk_${pfx}_reduction`);
            if (dPos === 'ant. dislokace') {
                if (dRed === 's redukcí') { rPatho.push('anteriorní dislokace disku v uzavření, s redukcí při otevření'); cMain.push('anteriorní dislokace disku s redukcí při otevření'); }
                else if (dRed === 'bez redukce') { rPatho.push('anteriorní dislokace disku v uzavření, bez redukce při otevření'); cMain.push('anteriorní dislokace disku bez redukce při otevření'); }
                else { rPatho.push('anteriorní dislokace disku v uzavření'); cMain.push('anteriorní dislokace disku'); }
            } else if (dPos === 'post. dislokace') { rPatho.push('posteriorní dislokace disku'); cMain.push('posteriorní dislokace disku'); }
            else if (dPos === 'mediální/laterální') { rPatho.push('mediolaterální komponenta dislokace disku'); cMain.push('mediolaterální dislokace disku'); }
            else { rPhysio.push('disk v centrální pozici v uzavření'); }
            
            const dMorph = ctx.text(`tmk_${pfx}_discMorph`);
            if (dMorph === 'ztenčený') { rPatho.push('disk je ztenčený'); cMain.push('ztenčení disku'); }
            else if (dMorph === 'deformovaný') { rPatho.push('disk deformovaný (bikonvexní tvar)'); cMain.push('deformace disku'); }
            else if (dMorph === 'dysplastický') { rPatho.push('disk dysplastického tvaru'); cMain.push('dysplazie disku'); }
            else if (dMorph === 'normální') { rPhysio.push('disk normální morfologie'); }
            
            if (ctx.isActive(`tmk_${pfx}_perfor`)) { rPatho.push('suspektní perforace disku'); cMain.push('suspektní perforace disku'); }
            if (ctx.isActive(`tmk_${pfx}_retroEdema`)) { rPatho.push('edém či zánětlivé sycení retrodiskální tkáně'); cMain.push('edém retrodiskální tkáně'); }

            // 4. Funkce
            const transl = ctx.text(`tmk_${pfx}_translation`);
            if (transl === 'omezená') { rPatho.push('omezená translace při otevření'); cMain.push('omezená translace'); }
            else if (transl === 'hypertranslace') { rPatho.push('hypertranslace při otevření'); cMain.push('hypertranslace'); }
            else if (transl === 'normální') { rPhysio.push('normální translace kondylu'); }
            
            const mob = ctx.text(`tmk_${pfx}_mobility`);
            if (mob === 'hypomobilita') { rPatho.push('MR známky hypomobility'); cMain.push('hypomobilita'); }
            else if (mob === 'hypermobilita') { rPatho.push('MR známky hypermobility'); cMain.push('hypermobilita'); }
            
            const ankyl = ctx.text(`tmk_${pfx}_ankyl`);
            if (ankyl === 'fibrotická?') { rPatho.push('možná fibrotická ankylóza'); cMain.push('suspektní fibrotická ankylóza (korelace klinicky)'); }
            else if (ankyl === 'kostní?') { rPatho.push('možná kostní ankylóza'); cMain.push('suspektní kostní ankylóza (korelace s CT)'); }
            
            return {
                reportPatho: rPatho.length ? `${label} TMK: ${cap(rPatho.join('; '))}.` : null,
                reportPhysio: rPhysio.length ? (rPatho.length ? `${cap(rPhysio.join('; '))}.` : `${label} TMK: ${cap(rPhysio.join('; '))}.`) : null,
                main: cMain.length ? `${label} TMK: ${formatZaver(cMain)}` : null,
                hasPathology: cMain.length > 0
            };
        };

        const right = parseSide('r', 'Pravý');
        const left = parseSide('l', 'Levý');

        // Report output
        if (right.reportPatho) reportOut.push({ type: 'frame', text: right.reportPatho, tableId: 'tmk_joint_main' });
        if (right.reportPhysio) reportOut.push({ type: 'frame', text: right.reportPhysio, tableId: 'tmk_joint_main', dimmed: true });
        
        if (left.reportPatho) reportOut.push({ type: 'frame', text: left.reportPatho, tableId: 'tmk_joint_main' });
        if (left.reportPhysio) reportOut.push({ type: 'frame', text: left.reportPhysio, tableId: 'tmk_joint_main', dimmed: true });
        
        const desc = ctx.field('tmk_desc');
        if (desc) reportOut.push({ type: 'frame', text: desc, tableId: 'tmk_other_main' });

        // Conclusion output
        if (!right.hasPathology && !left.hasPathology) {
            concMain.push({ type: 'frame', text: 'Přiměřený nález oboustranně bez signifikantní patologie.', tableId: 'tmk_joint_main', dimmed: true });
        } else {
            // Pravý TMK
            if (right.hasPathology) {
                concMain.push({ type: 'frame', text: right.main, tableId: 'tmk_joint_main' });
            } else {
                concMain.push({ type: 'frame', text: 'Pravý TMK: bez signifikantní patologie.', tableId: 'tmk_joint_main', dimmed: true });
            }
            // Levý TMK
            if (left.hasPathology) {
                concMain.push({ type: 'frame', text: left.main, tableId: 'tmk_joint_main' });
            } else {
                concMain.push({ type: 'frame', text: 'Levý TMK: bez signifikantní patologie.', tableId: 'tmk_joint_main', dimmed: true });
            }
        }

        const conc = ctx.field('tmk_conc');
        if (conc) concMain.push({ type: 'frame', text: cap(conc) + (conc.endsWith('.') ? '' : '.'), tableId: 'tmk_other_main' });

        return { report: reportOut, conclusion: { main: concMain, incidental: concInc } };
    }
};