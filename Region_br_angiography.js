const RegionBrAngiography = {
    title: 'Angiografie',
    reportLayout: 'block',
    layout: (helpers) => {
        let layoutNodes = [];

        layoutNodes.push(
            helpers.TableMain('angio_vessels_main', 'Willisův okruh a přívodné tepny', [
                helpers.Table2colNormal('angio_ves_pat_table', '', [
                    [ 'Typ patologie:', [ { btn: 'angio_ves_pat', states: ['0', 'aneurysma', 'stenóza', 'uzávěr'] }, { field: 'size', id: 'angio_ves_size', placeholder: 'mm' } ] ]
                ]),
                helpers.Table3colRCL('angio_ves_w_table', 'Tepny', [
                    [ { btn: 'angio_ves_aca_r', states: ['ACA', 'ACA', 'A1 ACA', 'A2 ACA'] }, { btn: 'angio_ves_acoa', type: 'basic', text: 'ACoA' }, { btn: 'angio_ves_aca_l', states: ['ACA', 'ACA', 'A1 ACA', 'A2 ACA'] } ],
                    [ { btn: 'angio_ves_ica_r', states: ['ICA', 'ICA', 'C7 ICA', 'C6 ICA', 'C5 ICA', 'C4 ICA', 'C3 ICA', 'C2 ICA', 'C1 ICA'] }, '', { btn: 'angio_ves_ica_l', states: ['ICA', 'ICA', 'C7 ICA', 'C6 ICA', 'C5 ICA', 'C4 ICA', 'C3 ICA', 'C2 ICA', 'C1 ICA'] } ],
                    [ { btn: 'angio_ves_mca_r', states: ['MCA', 'MCA', 'M1 MCA', 'M2 MCA', 'M3 MCA'] }, '', { btn: 'angio_ves_mca_l', states: ['MCA', 'MCA', 'M1 MCA', 'M2 MCA', 'M3 MCA'] } ],
                    [ { btn: 'angio_ves_acop_r', type: 'basic', text: 'ACoP' }, '', { btn: 'angio_ves_acop_l', type: 'basic', text: 'ACoP' } ],
                    [ { btn: 'angio_ves_pca_r', states: ['PCA', 'PCA', 'P1 PCA', 'P2 PCA'] }, '', { btn: 'angio_ves_pca_l', states: ['PCA', 'PCA', 'P1 PCA', 'P2 PCA'] } ],
                    [ '', { btn: 'angio_ves_ba', type: 'basic', text: 'BA' }, '' ],
                    [ { btn: 'angio_ves_pica_r', type: 'basic', text: 'PICA' }, '', { btn: 'angio_ves_pica_l', type: 'basic', text: 'PICA' } ],
                    [ { btn: 'angio_ves_va_r', states: ['VA', 'VA', 'V4 VA', 'V3 VA', 'V2 VA', 'V1 VA'] }, '', { btn: 'angio_ves_va_l', states: ['VA', 'VA', 'V4 VA', 'V3 VA', 'V2 VA', 'V1 VA'] } ]
                ]),
                helpers.Table3colRCL('angio_var_table', 'Variace', [
                    [ { btn: 'angio_var_a1_r', states: ['0', '+'] }, 'Hypoplázie A1 ACA', { btn: 'angio_var_a1_l', states: ['0', '+'] } ],
                    [ { btn: 'angio_var_fetal_r', states: ['0', 'P', 'C'] }, 'Fetální typ PCA', { btn: 'angio_var_fetal_l', states: ['0', 'P', 'C'] } ],
                    [ { btn: 'angio_var_va_r', states: ['0', '+'] }, 'Hypoplázie VA', { btn: 'angio_var_va_l', states: ['0', '+'] } ],
                    [ { btn: 'angio_var_vapica_r', states: ['0', '+'] }, 'VA končící jako PICA', { btn: 'angio_var_vapica_l', states: ['0', '+'] } ],
                    [ { btn: 'angio_var_pica_r', states: ['0', '+'] }, 'Gracilní PICA', { btn: 'angio_var_pica_l', states: ['0', '+'] } ]
                ]),
                helpers.Table1col('angio_ves_ost_add', [ 
                    { field: 'text', id: 'angio_ves_custom_desc', placeholder: 'vlastní cévní popis...' }, 
                    { field: 'text', id: 'angio_ves_custom_conc', placeholder: 'vlastní cévní závěr...' } 
                ])
            ])
        );

        return layoutNodes;
    },
    compile: (ctx) => {
        let reportOut = [{ type: 'heading', text: 'Angiografie:', action: 'open-region', regionId: 'brain_angiography' }];
        let concMain = [];
        let concInc = [];
        let vesRep = [];
        let varRepList = [];
        let varConcList = [];
        
        const cap = (s) => s && s.charAt(0).toUpperCase() + s.slice(1);

        let vesPat = ctx.text('angio_ves_pat');
        if (vesPat && vesPat !== '0') {
            let actVes = [];
            if (ctx.isActive('angio_ves_acoa')) actVes.push('ACoA');
            if (ctx.isActive('angio_ves_ba')) actVes.push('BA');

            const pairedVes = ['aca', 'ica', 'mca', 'acop', 'pca', 'pica', 'va'];
            pairedVes.forEach(v => {
                let isR = ctx.isActive(`angio_ves_${v}_r`);
                let isL = ctx.isActive(`angio_ves_${v}_l`);
                let r = ctx.text(`angio_ves_${v}_r`);
                let l = ctx.text(`angio_ves_${v}_l`);
                
                if (isR && isL) {
                    if (r === l) actVes.push(`${r} bilat.`);
                    else actVes.push(`${r} vpravo a ${l} vlevo`);
                } else if (isR) {
                    actVes.push(`${r} vpravo`);
                } else if (isL) {
                    actVes.push(`${l} vlevo`);
                }
            });

            if (actVes.length > 0) {
                let vStr = actVes.join(' a ');
                if (actVes.length > 1) vStr = `na rozhraní ${vStr}`;
                
                let sizeVal = ctx.field('angio_ves_size');
                let sizeStr = '';
                if (sizeVal && vesPat === 'aneurysma') sizeStr = ` vel. ${sizeVal} mm`;
                else if (sizeVal && vesPat === 'stenóza') sizeStr = ` šíře ${sizeVal} mm`;

                let repText = `${vesPat} ${vStr}${sizeStr}`;
                let vesCust = ctx.field('angio_ves_custom_desc');
                let fullRep = vesCust ? `${repText}, ${vesCust}` : repText;

                vesRep.push(fullRep);
                
                if (['aneurysma', 'stenóza', 'uzávěr'].includes(vesPat)) {
                    concMain.push({ type: 'frame', text: `${cap(repText)}.`, tableId: 'angio_vessels_main' });
                } else {
                    concInc.push({ type: 'frame', text: `${cap(repText)}.`, tableId: 'angio_vessels_main' });
                }
            }
        }

        let vesDescOnly = ctx.field('angio_ves_custom_desc');
        if (vesDescOnly && (vesPat === '0' || !vesPat)) {
            vesRep.push(vesDescOnly);
        }

        if (vesRep.length > 0) {
            reportOut.push({ type: 'frame', text: cap(formatCzechList(vesRep)) + '. Jinak je konfigurace mozkových tepen obvyklá.', tableId: 'angio_vessels_main' });
        } else {
            reportOut.push({ type: 'frame', text: 'Přívodné mozkové tepny mají normální šířku i průběh, Willisův okruh se zobrazuje obvykle, cévy přiměřené šíře do periferie, bez patrných stenóz či aneurysmat.', tableId: 'angio_vessels_main', dimmed: true });
        }

        const stdVariations = [
            { id: 'a1', label: 'hypoplázie A1 ACA' },
            { id: 'va', label: 'hypoplázie VA' },
            { id: 'vapica', label: 'VA končící jako PICA' },
            { id: 'pica', label: 'gracilní PICA' }
        ];

        stdVariations.forEach(v => {
            let r = ctx.isActive(`angio_var_${v.id}_r`);
            let l = ctx.isActive(`angio_var_${v.id}_l`);
            if (r && l) {
                varRepList.push(`${v.label} bilat.`);
                varConcList.push(`${v.label} bilat.`);
            } else if (r) {
                varRepList.push(`${v.label} vpravo`);
                varConcList.push(`${v.label} vpravo`);
            } else if (l) {
                varRepList.push(`${v.label} vlevo`);
                varConcList.push(`${v.label} vlevo`);
            }
        });

        let fetalR = ctx.text('angio_var_fetal_r');
        let fetalL = ctx.text('angio_var_fetal_l');

        let pcoaR = (fetalR === 'P' || fetalR === 'C');
        let pcoaL = (fetalL === 'P' || fetalL === 'C');
        if (pcoaR && pcoaL) varRepList.push('silná zadní komunikanta bilat.');
        else if (pcoaR) varRepList.push('silná zadní komunikanta vpravo');
        else if (pcoaL) varRepList.push('silná zadní komunikanta vlevo');

        let hypoP1R = (fetalR === 'P');
        let hypoP1L = (fetalL === 'P');
        if (hypoP1R && hypoP1L) varRepList.push('hypoplázie P1 PCA bilat.');
        else if (hypoP1R) varRepList.push('hypoplázie P1 PCA vpravo');
        else if (hypoP1L) varRepList.push('hypoplázie P1 PCA vlevo');

        let aplaP1R = (fetalR === 'C');
        let aplaP1L = (fetalL === 'C');
        if (aplaP1R && aplaP1L) varRepList.push('aplázie P1 PCA bilat.');
        else if (aplaP1R) varRepList.push('aplázie P1 PCA vpravo');
        else if (aplaP1L) varRepList.push('aplázie P1 PCA vlevo');

        if (fetalR === 'P' && fetalL === 'P') varConcList.push('parciální fetální typ PCA bilat.');
        else if (fetalR === 'P') varConcList.push('parciální fetální typ PCA vpravo');
        else if (fetalL === 'P') varConcList.push('parciální fetální typ PCA vlevo');

        if (fetalR === 'C' && fetalL === 'C') varConcList.push('kompletní fetální typ PCA bilat.');
        else if (fetalR === 'C') varConcList.push('kompletní fetální typ PCA vpravo');
        else if (fetalL === 'C') varConcList.push('kompletní fetální typ PCA vlevo');

        if (varRepList.length > 0) {
            let varTextRep = `Variační anatomie: ${varRepList.join(', ')}.`;
            reportOut.push({ type: 'frame', text: varTextRep, tableId: 'angio_var_table' });
        }

        if (varConcList.length > 0) {
            let varTextConc = `Variační anatomie: ${varConcList.join(', ')}.`;
            concInc.push({ type: 'frame', text: varTextConc, tableId: 'angio_var_table' });
        }

        let vesConc = ctx.field('angio_ves_custom_conc');
        if (vesConc) concInc.push({ type: 'frame', text: vesConc, tableId: 'angio_vessels_main' });

        return { report: reportOut, conclusion: { main: concMain, incidental: concInc } };
    }
}