(async function initRegionTp() {
    try {
        const response = await fetch('Region_LSp.js');
        let code = await response.text();

        code = code
            .replace(/const RegionLSp\s*=/g, 'const RegionTp =')
            .replace(/'Bederní páteř'/g, "'Hrudní páteř'")
            .replace(/lsp_/g, 'thp_')
            .replace(/ls_spine/g, 't_spine')
            .replace(/spine_lumbar/g, 'spine_thoracic')
            .replace(/bederní/gi, 'hrudní');

        code = code
            .replace(/lordosis:\s*\{\s*states:\s*\[.*?\]\s*\}/, "kyphosis: { states: ['přiměřená', 'zvýrazněná', 'oploštělá', 'inverze'] }")
            .replace(/'Lordóza:',\s*\{\s*btn:\s*'lordosis',\s*id:\s*'thp_lordosis'\s*\}/, "'Kyfóza:', { btn: 'kyphosis', id: 'thp_kyphosis' }")
            .replace(/,\s*'LSTV:',\s*\{\s*btn:\s*'lstv',\s*id:\s*'thp_lstv'\s*\}/, '');

        code = code
            .replace(/útlakem kořene \$\{seg\.vLabel\}/g, 'útlakem kořene ${seg.fRoot}')
            .replace(/útlakem kořenů \$\{seg\.vLabel\}/g, 'útlakem kořenů ${seg.fRoot}')
            .replace(/adheze kořenů \$\{seg\.vLabel\}/g, 'adheze kořenů ${seg.fRoot}')
            .replace(/nasedání kořenů \$\{seg\.vLabel\}/g, 'nasedání kořenů ${seg.fRoot}');

        const lordosisBlockRegex = /const lordosisState = ctx\.text\('thp_lordosis'\);[\s\S]*?concStaticSentences\.push\(sentence\);\s*\}\s*\}\s*\}/;
        const kyphosisBlock = `const kyphosisState = ctx.text('thp_kyphosis');
        if (kyphosisState && kyphosisState !== '0') {
            const kyphosisMap = {
                'přiměřená': 'přiměřená hrudní kyfóza',
                'zvýrazněná': 'zvýrazněná hrudní kyfóza',
                'oploštělá': 'oploštělá hrudní kyfóza',
                'inverze': 'inverze hrudní kyfózy'
            };
            const kyphosisText = kyphosisMap[kyphosisState];
            if (kyphosisText) {
                const sentence = formatSentence(kyphosisText);
                if (kyphosisState === 'přiměřená') {
                    staticPhysio.push(sentence);
                } else {
                    staticPatho.push(sentence);
                    concStaticSentences.push(sentence);
                }
            }
        }`;
        code = code.replace(lordosisBlockRegex, kyphosisBlock);

        const lstvRegex = /const lstvState = ctx\.text\('thp_lstv'\);[\s\S]*?concStaticSentences\.push\(lstvText\);\s*\}/;
        code = code.replace(lstvRegex, '');

        const thoracicSegmentsBlock = `const segments = [
            { label: 'C7/T1',  vPfx: 'c7',  sPfx: 'c7_t1',  vLabel: 'C7',  fRoot: 'C8',  root: 'T1' },
            { label: 'T1/2',   vPfx: 't1',  sPfx: 't1_2',   vLabel: 'T1',  fRoot: 'T1',  root: 'T2' },
            { label: 'T2/3',   vPfx: 't2',  sPfx: 't2_3',   vLabel: 'T2',  fRoot: 'T2',  root: 'T3' },
            { label: 'T3/4',   vPfx: 't3',  sPfx: 't3_4',   vLabel: 'T3',  fRoot: 'T3',  root: 'T4' },
            { label: 'T4/5',   vPfx: 't4',  sPfx: 't4_5',   vLabel: 'T4',  fRoot: 'T4',  root: 'T5' },
            { label: 'T5/6',   vPfx: 't5',  sPfx: 't5_6',   vLabel: 'T5',  fRoot: 'T5',  root: 'T6' },
            { label: 'T6/7',   vPfx: 't6',  sPfx: 't6_7',   vLabel: 'T6',  fRoot: 'T6',  root: 'T7' },
            { label: 'T7/8',   vPfx: 't7',  sPfx: 't7_8',   vLabel: 'T7',  fRoot: 'T7',  root: 'T8' },
            { label: 'T8/9',   vPfx: 't8',  sPfx: 't8_9',   vLabel: 'T8',  fRoot: 'T8',  root: 'T9' },
            { label: 'T9/10',  vPfx: 't9',  sPfx: 't9_10',  vLabel: 'T9',  fRoot: 'T9',  root: 'T10' },
            { label: 'T10/11', vPfx: 't10', sPfx: 't10_11', vLabel: 'T10', fRoot: 'T10', root: 'T11' },
            { label: 'T11/12', vPfx: 't11', sPfx: 't11_12', vLabel: 'T11', fRoot: 'T11', root: 'T12' },
            { label: 'T12/L1', vPfx: 't12', sPfx: 't12_l1', vLabel: 'T12', fRoot: 'T12', root: 'L1' }
        ];`;
        code = code.replace(/const segments\s*=\s*\[\s*\{[\s\S]*?\}\s*\];?/m, thoracicSegmentsBlock);

        code = code.replace(/exp_segment:\s*\{\s*states:\s*\[[\s\S]*?\]\s*\}/, "exp_segment: { states: ['etáž', 'C7/T1', 'T1/2', 'T2/3', 'T3/4', 'T4/5', 'T5/6', 'T6/7', 'T7/8', 'T8/9', 'T9/10', 'T10/11', 'T11/12', 'T12/L1'] }");
        code = code.replace(/myelo_level:\s*\{\s*states:\s*\[[\s\S]*?\]\s*\}/, "myelo_level: { states: ['etáž', 'C7', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12', 'L1', 'custom'] }");

        const tableRegex = /const table = helpers\.TableGrid\('spine_thoracic_main',\s*\[[\s\S]*?\]\);/;
        const newTableDef = `const table = helpers.TableGrid('spine_thoracic_main', [
            [ 'C7', { btn: 'shape', id: 'c7_shape' }, { btn: 'lesion', id: 'c7_lesion' }, [ { btn: 'shift', id: 'c7_shift' }, { field: 'mm', id: 'c7_shift_mm', placeholder: 'mm' } ], '', '', '', opV('c7_surgery') ],
            [ 'C7/T1', { btn: 'degen', id: 'c7_t1_degen' }, { btn: 'modic', id: 'c7_t1_modic' }, pGroup('c7_t1'), [ { btn: 'sten_f', id: 'c7_t1_f_r' }, { btn: 'sten_p', id: 'c7_t1_p_r' }, { btn: 'sten_c', id: 'c7_t1_c' }, { btn: 'sten_p', id: 'c7_t1_p_l' }, { btn: 'sten_f', id: 'c7_t1_f_l' } ], [ { field: 'size', id: 'c7_t1_size', placeholder: 'dur.vak mm' } ], [ { btn: 'arthrosis', id: 'c7_t1_arthro' }, { btn: 'arthro_r', id: 'c7_t1_arthro_r' }, { btn: 'arthro_l', id: 'c7_t1_arthro_l' } ], opD('c7_t1_disc_surgery', 'c7_t1_lamin') ],
            [ 'T1', { btn: 'shape', id: 't1_shape' }, { btn: 'lesion', id: 't1_lesion' }, [ { btn: 'shift', id: 't1_shift' }, { field: 'mm', id: 't1_shift_mm', placeholder: 'mm' } ], '', '', '', opV('t1_surgery') ],
            [ 'T1/2', { btn: 'degen', id: 't1_2_degen' }, { btn: 'modic', id: 't1_2_modic' }, pGroup('t1_2'), [ { btn: 'sten_f', id: 't1_2_f_r' }, { btn: 'sten_p', id: 't1_2_p_r' }, { btn: 'sten_c', id: 't1_2_c' }, { btn: 'sten_p', id: 't1_2_p_l' }, { btn: 'sten_f', id: 't1_2_f_l' } ], [ { field: 'size', id: 't1_2_size', placeholder: 'dur.vak mm' } ], [ { btn: 'arthrosis', id: 't1_2_arthro' }, { btn: 'arthro_r', id: 't1_2_arthro_r' }, { btn: 'arthro_l', id: 't1_2_arthro_l' } ], opD('t1_2_disc_surgery', 't1_2_lamin') ],
            [ 'T2', { btn: 'shape', id: 't2_shape' }, { btn: 'lesion', id: 't2_lesion' }, [ { btn: 'shift', id: 't2_shift' }, { field: 'mm', id: 't2_shift_mm', placeholder: 'mm' } ], '', '', '', opV('t2_surgery') ],
            [ 'T2/3', { btn: 'degen', id: 't2_3_degen' }, { btn: 'modic', id: 't2_3_modic' }, pGroup('t2_3'), [ { btn: 'sten_f', id: 't2_3_f_r' }, { btn: 'sten_p', id: 't2_3_p_r' }, { btn: 'sten_c', id: 't2_3_c' }, { btn: 'sten_p', id: 't2_3_p_l' }, { btn: 'sten_f', id: 't2_3_f_l' } ], [ { field: 'size', id: 't2_3_size', placeholder: 'dur.vak mm' } ], [ { btn: 'arthrosis', id: 't2_3_arthro' }, { btn: 'arthro_r', id: 't2_3_arthro_r' }, { btn: 'arthro_l', id: 't2_3_arthro_l' } ], opD('t2_3_disc_surgery', 't2_3_lamin') ],
            [ 'T3', { btn: 'shape', id: 't3_shape' }, { btn: 'lesion', id: 't3_lesion' }, [ { btn: 'shift', id: 't3_shift' }, { field: 'mm', id: 't3_shift_mm', placeholder: 'mm' } ], '', '', '', opV('t3_surgery') ],
            [ 'T3/4', { btn: 'degen', id: 't3_4_degen' }, { btn: 'modic', id: 't3_4_modic' }, pGroup('t3_4'), [ { btn: 'sten_f', id: 't3_4_f_r' }, { btn: 'sten_p', id: 't3_4_p_r' }, { btn: 'sten_c', id: 't3_4_c' }, { btn: 'sten_p', id: 't3_4_p_l' }, { btn: 'sten_f', id: 't3_4_f_l' } ], [ { field: 'size', id: 't3_4_size', placeholder: 'dur.vak mm' } ], [ { btn: 'arthrosis', id: 't3_4_arthro' }, { btn: 'arthro_r', id: 't3_4_arthro_r' }, { btn: 'arthro_l', id: 't3_4_arthro_l' } ], opD('t3_4_disc_surgery', 't3_4_lamin') ],
            [ 'T4', { btn: 'shape', id: 't4_shape' }, { btn: 'lesion', id: 't4_lesion' }, [ { btn: 'shift', id: 't4_shift' }, { field: 'mm', id: 't4_shift_mm', placeholder: 'mm' } ], '', '', '', opV('t4_surgery') ],
            [ 'T4/5', { btn: 'degen', id: 't4_5_degen' }, { btn: 'modic', id: 't4_5_modic' }, pGroup('t4_5'), [ { btn: 'sten_f', id: 't4_5_f_r' }, { btn: 'sten_p', id: 't4_5_p_r' }, { btn: 'sten_c', id: 't4_5_c' }, { btn: 'sten_p', id: 't4_5_p_l' }, { btn: 'sten_f', id: 't4_5_f_l' } ], [ { field: 'size', id: 't4_5_size', placeholder: 'dur.vak mm' } ], [ { btn: 'arthrosis', id: 't4_5_arthro' }, { btn: 'arthro_r', id: 't4_5_arthro_r' }, { btn: 'arthro_l', id: 't4_5_arthro_l' } ], opD('t4_5_disc_surgery', 't4_5_lamin') ],
            [ 'T5', { btn: 'shape', id: 't5_shape' }, { btn: 'lesion', id: 't5_lesion' }, [ { btn: 'shift', id: 't5_shift' }, { field: 'mm', id: 't5_shift_mm', placeholder: 'mm' } ], '', '', '', opV('t5_surgery') ],
            [ 'T5/6', { btn: 'degen', id: 't5_6_degen' }, { btn: 'modic', id: 't5_6_modic' }, pGroup('t5_6'), [ { btn: 'sten_f', id: 't5_6_f_r' }, { btn: 'sten_p', id: 't5_6_p_r' }, { btn: 'sten_c', id: 't5_6_c' }, { btn: 'sten_p', id: 't5_6_p_l' }, { btn: 'sten_f', id: 't5_6_f_l' } ], [ { field: 'size', id: 't5_6_size', placeholder: 'dur.vak mm' } ], [ { btn: 'arthrosis', id: 't5_6_arthro' }, { btn: 'arthro_r', id: 't5_6_arthro_r' }, { btn: 'arthro_l', id: 't5_6_arthro_l' } ], opD('t5_6_disc_surgery', 't5_6_lamin') ],
            [ 'T6', { btn: 'shape', id: 't6_shape' }, { btn: 'lesion', id: 't6_lesion' }, [ { btn: 'shift', id: 't6_shift' }, { field: 'mm', id: 't6_shift_mm', placeholder: 'mm' } ], '', '', '', opV('t6_surgery') ],
            [ 'T6/7', { btn: 'degen', id: 't6_7_degen' }, { btn: 'modic', id: 't6_7_modic' }, pGroup('t6_7'), [ { btn: 'sten_f', id: 't6_7_f_r' }, { btn: 'sten_p', id: 't6_7_p_r' }, { btn: 'sten_c', id: 't6_7_c' }, { btn: 'sten_p', id: 't6_7_p_l' }, { btn: 'sten_f', id: 't6_7_f_l' } ], [ { field: 'size', id: 't6_7_size', placeholder: 'dur.vak mm' } ], [ { btn: 'arthrosis', id: 't6_7_arthro' }, { btn: 'arthro_r', id: 't6_7_arthro_r' }, { btn: 'arthro_l', id: 't6_7_arthro_l' } ], opD('t6_7_disc_surgery', 't6_7_lamin') ],
            [ 'T7', { btn: 'shape', id: 't7_shape' }, { btn: 'lesion', id: 't7_lesion' }, [ { btn: 'shift', id: 't7_shift' }, { field: 'mm', id: 't7_shift_mm', placeholder: 'mm' } ], '', '', '', opV('t7_surgery') ],
            [ 'T7/8', { btn: 'degen', id: 't7_8_degen' }, { btn: 'modic', id: 't7_8_modic' }, pGroup('t7_8'), [ { btn: 'sten_f', id: 't7_8_f_r' }, { btn: 'sten_p', id: 't7_8_p_r' }, { btn: 'sten_c', id: 't7_8_c' }, { btn: 'sten_p', id: 't7_8_p_l' }, { btn: 'sten_f', id: 't7_8_f_l' } ], [ { field: 'size', id: 't7_8_size', placeholder: 'dur.vak mm' } ], [ { btn: 'arthrosis', id: 't7_8_arthro' }, { btn: 'arthro_r', id: 't7_8_arthro_r' }, { btn: 'arthro_l', id: 't7_8_arthro_l' } ], opD('t7_8_disc_surgery', 't7_8_lamin') ],
            [ 'T8', { btn: 'shape', id: 't8_shape' }, { btn: 'lesion', id: 't8_lesion' }, [ { btn: 'shift', id: 't8_shift' }, { field: 'mm', id: 't8_shift_mm', placeholder: 'mm' } ], '', '', '', opV('t8_surgery') ],
            [ 'T8/9', { btn: 'degen', id: 't8_9_degen' }, { btn: 'modic', id: 't8_9_modic' }, pGroup('t8_9'), [ { btn: 'sten_f', id: 't8_9_f_r' }, { btn: 'sten_p', id: 't8_9_p_r' }, { btn: 'sten_c', id: 't8_9_c' }, { btn: 'sten_p', id: 't8_9_p_l' }, { btn: 'sten_f', id: 't8_9_f_l' } ], [ { field: 'size', id: 't8_9_size', placeholder: 'dur.vak mm' } ], [ { btn: 'arthrosis', id: 't8_9_arthro' }, { btn: 'arthro_r', id: 't8_9_arthro_r' }, { btn: 'arthro_l', id: 't8_9_arthro_l' } ], opD('t8_9_disc_surgery', 't8_9_lamin') ],
            [ 'T9', { btn: 'shape', id: 't9_shape' }, { btn: 'lesion', id: 't9_lesion' }, [ { btn: 'shift', id: 't9_shift' }, { field: 'mm', id: 't9_shift_mm', placeholder: 'mm' } ], '', '', '', opV('t9_surgery') ],
            [ 'T9/10', { btn: 'degen', id: 't9_10_degen' }, { btn: 'modic', id: 't9_10_modic' }, pGroup('t9_10'), [ { btn: 'sten_f', id: 't9_10_f_r' }, { btn: 'sten_p', id: 't9_10_p_r' }, { btn: 'sten_c', id: 't9_10_c' }, { btn: 'sten_p', id: 't9_10_p_l' }, { btn: 'sten_f', id: 't9_10_f_l' } ], [ { field: 'size', id: 't9_10_size', placeholder: 'dur.vak mm' } ], [ { btn: 'arthrosis', id: 't9_10_arthro' }, { btn: 'arthro_r', id: 't9_10_arthro_r' }, { btn: 'arthro_l', id: 't9_10_arthro_l' } ], opD('t9_10_disc_surgery', 't9_10_lamin') ],
            [ 'T10', { btn: 'shape', id: 't10_shape' }, { btn: 'lesion', id: 't10_lesion' }, [ { btn: 'shift', id: 't10_shift' }, { field: 'mm', id: 't10_shift_mm', placeholder: 'mm' } ], '', '', '', opV('t10_surgery') ],
            [ 'T10/11', { btn: 'degen', id: 't10_11_degen' }, { btn: 'modic', id: 't10_11_modic' }, pGroup('t10_11'), [ { btn: 'sten_f', id: 't10_11_f_r' }, { btn: 'sten_p', id: 't10_11_p_r' }, { btn: 'sten_c', id: 't10_11_c' }, { btn: 'sten_p', id: 't10_11_p_l' }, { btn: 'sten_f', id: 't10_11_f_l' } ], [ { field: 'size', id: 't10_11_size', placeholder: 'dur.vak mm' } ], [ { btn: 'arthrosis', id: 't10_11_arthro' }, { btn: 'arthro_r', id: 't10_11_arthro_r' }, { btn: 'arthro_l', id: 't10_11_arthro_l' } ], opD('t10_11_disc_surgery', 't10_11_lamin') ],
            [ 'T11', { btn: 'shape', id: 't11_shape' }, { btn: 'lesion', id: 't11_lesion' }, [ { btn: 'shift', id: 't11_shift' }, { field: 'mm', id: 't11_shift_mm', placeholder: 'mm' } ], '', '', '', opV('t11_surgery') ],
            [ 'T11/12', { btn: 'degen', id: 't11_12_degen' }, { btn: 'modic', id: 't11_12_modic' }, pGroup('t11_12'), [ { btn: 'sten_f', id: 't11_12_f_r' }, { btn: 'sten_p', id: 't11_12_p_r' }, { btn: 'sten_c', id: 't11_12_c' }, { btn: 'sten_p', id: 't11_12_p_l' }, { btn: 'sten_f', id: 't11_12_f_l' } ], [ { field: 'size', id: 't11_12_size', placeholder: 'dur.vak mm' } ], [ { btn: 'arthrosis', id: 't11_12_arthro' }, { btn: 'arthro_r', id: 't11_12_arthro_r' }, { btn: 'arthro_l', id: 't11_12_arthro_l' } ], opD('t11_12_disc_surgery', 't11_12_lamin') ],
            [ 'T12', { btn: 'shape', id: 't12_shape' }, { btn: 'lesion', id: 't12_lesion' }, [ { btn: 'shift', id: 't12_shift' }, { field: 'mm', id: 't12_shift_mm', placeholder: 'mm' } ], '', '', '', opV('t12_surgery') ],
            [ 'T12/L1', { btn: 'degen', id: 't12_l1_degen' }, { btn: 'modic', id: 't12_l1_modic' }, pGroup('t12_l1'), [ { btn: 'sten_f', id: 't12_l1_f_r' }, { btn: 'sten_p', id: 't12_l1_p_r' }, { btn: 'sten_c', id: 't12_l1_c' }, { btn: 'sten_p', id: 't12_l1_p_l' }, { btn: 'sten_f', id: 't12_l1_f_l' } ], [ { field: 'size', id: 't12_l1_size', placeholder: 'dur.vak mm' } ], [ { btn: 'arthrosis', id: 't12_l1_arthro' }, { btn: 'arthro_r', id: 't12_l1_arthro_r' }, { btn: 'arthro_l', id: 't12_l1_arthro_l' } ], opD('t12_l1_disc_surgery', 't12_l1_lamin') ],
            [ 'L1', { btn: 'shape', id: 'l1_shape' }, { btn: 'lesion', id: 'l1_lesion' }, [ { btn: 'shift', id: 'l1_shift' }, { field: 'mm', id: 'l1_shift_mm', placeholder: 'mm' } ], '', '', '', opV('l1_surgery') ]
        ]);`;
        code = code.replace(tableRegex, newTableDef);

        code += "\nif (typeof REGIONS !== 'undefined') { REGIONS['t_spine'] = RegionTp; if (typeof UI !== 'undefined' && Store.activeTab === 'mr_t_patere') { UI.renderDetails(); } }";

        const scriptTag = document.createElement('script');
        scriptTag.textContent = code;
        document.body.appendChild(scriptTag);
    } catch (error) {
        console.error('Chyba při dynamickém generování hrudní páteře:', error);
    }
})();