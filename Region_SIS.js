const RegionSis = {
    title: 'MR SI skloubení',
    reportLayout: 'block',
    layout: (helpers) => {
        return [
            helpers.TableMain('sis_main', 'Sakroiliakální skloubení', [
                helpers.Table3colRL('sis_table', '', [
                    [ { btn: 'sis_r_space', states: ['norma', 'zúžena', 'zaniklá'] }, 'Šíře štěrbiny', { btn: 'sis_l_space', states: ['norma', 'zúžena', 'zaniklá'] } ],
                    [ { btn: 'sis_r_erosions', states: ['0', 'ojedinělé', 'vícečetné'] }, 'Eroze', { btn: 'sis_l_erosions', states: ['0', 'ojedinělé', 'vícečetné'] } ],
                    [ { btn: 'sis_r_edema', states: ['0', '+', '++', '+++'] }, 'Edém', { btn: 'sis_l_edema', states: ['0', '+', '++', '+++'] } ],
                    [ { btn: 'sis_r_edema_bone', states: ['sakra', 'ilicky', 'oboje'] }, 'Edém - skelet', { btn: 'sis_l_edema_bone', states: ['sakra', 'ilicky', 'oboje'] } ],
                    [ { btn: 'sis_r_edema_loc', states: ['lokace...', 'difuzně', 'kraniálně', 'kaudálně', 'ventrálně', 'dorzálně'] }, 'Edém - pozice', { btn: 'sis_l_edema_loc', states: ['lokace...', 'difuzně', 'kraniálně', 'kaudálně', 'ventrálně', 'dorzálně'] } ],
                    [ { field: 'mm', id: 'sis_r_edema_size', placeholder: 'mm' }, 'Edém - velikost', { field: 'mm', id: 'sis_l_edema_size', placeholder: 'mm' } ],
                    [ { btn: 'sis_r_fat', type: 'basic', text: '+' }, 'Tuková metaplazie', { btn: 'sis_l_fat', type: 'basic', text: '+' } ],
                    [ { btn: 'sis_r_sclerosis', type: 'basic', text: '+' }, 'Sklerotizace', { btn: 'sis_l_sclerosis', type: 'basic', text: '+' } ],
                    [ { btn: 'sis_r_osteophytes', type: 'basic', text: '+' }, 'Osteofyty', { btn: 'sis_l_osteophytes', type: 'basic', text: '+' } ]
                ])
            ]),
            helpers.TableMain('sis_other_main', 'Ostatní', [
                helpers.Table1col('sis_other_add', [
                    { field: 'text', id: 'sis_desc', placeholder: 'vlastní popis...' },
                    { field: 'text', id: 'sis_conc', placeholder: 'vlastní závěr...' }
                ])
            ])
        ];
    },

    compile: (ctx) => {
        let reportOut = [{ type: 'heading', text: 'SI skloubení:', action: 'open-region', regionId: 'sis' }];
        let concMain = [];
        let concInc = [];
        
        const cap = (s) => s && s.charAt(0).toUpperCase() + s.slice(1);

        const parseSide = (pfx) => {
            let main = [];
            let inc = [];
            let spaceText = 'kloubní štěrbina přiměřené šířky';

            const space = ctx.text(`sis_${pfx}_space`);
            if (space === 'zúžena') { spaceText = 'kloubní štěrbina je zúžená'; main.push('zúžení štěrbiny'); }
            else if (space === 'zaniklá') { spaceText = 'kloubní štěrbina je zcela zaniklá v rámci ankylózy'; main.push('ankylóza (chronická strukturální sakroiliitida)'); }

            let erosionsText = '';
            const erosions = ctx.text(`sis_${pfx}_erosions`);
            if (erosions === 'ojedinělé') { erosionsText = 's ojedinělými drobnými erozemi'; main.push('ojedinělé eroze'); }
            else if (erosions === 'vícečetné') { erosionsText = 's vícečetnými hlubšími erozemi'; main.push('vícečetné eroze (strukturální sakroiliitida)'); }

            let marrowArr = [];
            const edema = ctx.text(`sis_${pfx}_edema`);
            if (edema && edema !== '0') {
                const bone = ctx.text(`sis_${pfx}_edema_bone`);
                const loc = ctx.text(`sis_${pfx}_edema_loc`);
                const size = ctx.field(`sis_${pfx}_edema_size`);
                
                let edemaStr = 'subchondrální edém kostní dřeně';
                if (edema === '++') edemaStr = 'výraznější ' + edemaStr;
                else if (edema === '+++') edemaStr = 'rozsáhlý ' + edemaStr;

                if (bone === 'sakra') edemaStr += ' na straně sakra';
                else if (bone === 'ilicky') edemaStr += ' na straně ilické kosti';
                else if (bone === 'oboje') edemaStr += ' na straně sakra i ilické kosti';

                if (loc && loc !== 'lokace...') edemaStr += ` ${loc}`;
                if (size) edemaStr += ` do hloubky ${size} mm`;
                
                marrowArr.push(edemaStr);
                main.push('aktivní zánětlivé změny (edém)');
            }

            if (ctx.isActive(`sis_${pfx}_fat`)) { marrowArr.push('ložiska tukové metaplazie'); inc.push('tuková metaplazie'); }
            if (ctx.isActive(`sis_${pfx}_sclerosis`)) { marrowArr.push('pásmovitá sklerotizace'); inc.push('subchondrální sklerotizace'); }

            let marrowText = marrowArr.length > 0 ? marrowArr.join(', ') : 'bez patologického signálu subchondrálně';

            let osteoText = '';
            if (ctx.isActive(`sis_${pfx}_osteophytes`)) { osteoText = 'přítomny přemostující marginální osteofyty'; inc.push('degenerativní osteofytické změny'); }

            let sentenceArr = [];
            sentenceArr.push(erosionsText ? `${spaceText} ${erosionsText}` : spaceText);
            sentenceArr.push(marrowText);
            if (osteoText) sentenceArr.push(osteoText);

            const isPhysio = (!space || space === 'norma') && (!erosions || erosions === '0') && (!edema || edema === '0') && !ctx.isActive(`sis_${pfx}_fat`) && !ctx.isActive(`sis_${pfx}_sclerosis`) && !ctx.isActive(`sis_${pfx}_osteophytes`);

            return {
                reportText: sentenceArr.join(', '),
                mainText: main.length ? main.join(', ') : null,
                incText: inc.length ? inc.join(', ') : null,
                hasPathology: !isPhysio
            };
        };

        const right = parseSide('r');
        const left = parseSide('l');

        const desc = ctx.field('sis_desc');
        const appendDesc = desc ? `, ${desc}` : '';
        const concUser = ctx.field('sis_conc');

        if (!right.hasPathology && !left.hasPathology) {
            reportOut.push({ type: 'frame', text: `Štěrbiny obou SI skloubení jsou přiměřené šířky. Kontury kloubních ploch jsou hladké, subchondrální kostní dřeň je oboustranně bez patologického signálu${appendDesc}.`, tableId: 'sis_main', dimmed: true });
        } else {
            if (right.reportText === left.reportText) {
                reportOut.push({ type: 'frame', text: `Oboustranně: ${right.reportText}${appendDesc}.`, tableId: 'sis_main' });
            } else {
                reportOut.push({ type: 'frame', text: `Vpravo: ${right.reportText}.`, tableId: 'sis_main', dimmed: !right.hasPathology });
                reportOut.push({ type: 'frame', text: `Vlevo: ${left.reportText}.`, tableId: 'sis_main', dimmed: !left.hasPathology });
                if (desc) reportOut.push({ type: 'frame', text: cap(desc) + (desc.endsWith('.') ? '' : '.'), tableId: 'sis_other_main' });
            }
        }

        if (!right.hasPathology && !left.hasPathology) {
            concMain.push({ type: 'frame', text: 'Přiměřený nález. Bez známek přítomnosti sakroiliitis.', tableId: 'sis_main', dimmed: true });
        } else {
            const addConc = (sideText, sideData) => {
                if (sideData.mainText) concMain.push({ type: 'frame', text: `${sideText} ${sideData.mainText}.`, tableId: 'sis_main' });
                if (sideData.incText) concInc.push({ type: 'frame', text: `${sideText} ${sideData.incText}.`, tableId: 'sis_main', dimmed: true });
            };

            if (right.mainText === left.mainText && right.mainText) {
                concMain.push({ type: 'frame', text: `Oboustranně ${right.mainText}.`, tableId: 'sis_main' });
                if (right.incText === left.incText && right.incText) {
                    concInc.push({ type: 'frame', text: `Oboustranně ${right.incText}.`, tableId: 'sis_main', dimmed: true });
                } else {
                    if (right.incText) concInc.push({ type: 'frame', text: `Vpravo ${right.incText}.`, tableId: 'sis_main', dimmed: true });
                    if (left.incText) concInc.push({ type: 'frame', text: `Vlevo ${left.incText}.`, tableId: 'sis_main', dimmed: true });
                }
            } else {
                if (right.hasPathology) addConc('Vpravo', right);
                if (left.hasPathology) addConc('Vlevo', left);
            }
        }

        if (concUser) concMain.push({ type: 'frame', text: cap(concUser) + (concUser.endsWith('.') ? '' : '.'), tableId: 'sis_other_main' });

        return { report: reportOut, conclusion: { main: concMain, incidental: concInc } };
    }
};