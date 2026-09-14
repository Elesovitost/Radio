/* =============================================================
   Region_Tp.js - hrudní páteř.
   Implementace je v js/spine-factory.js; zde je jen to odlišné.
   ============================================================= */

const RegionTp = defineSpineRegion({
    regionId: 't_spine',
    examId: 'spine_thoracic',
    btnPrefix: 'thp',
    tableBase: 'spine_thoracic',
    title: 'Hrudní páteř',
    adjective: 'hrudní',

    curvature: {
        key: 'kyphosis',
        label: 'Kyfóza:',
        states: ['přiměřená', 'zvýrazněná', 'oploštělá', 'inverze'],
        map: {
            'přiměřená': 'přiměřená hrudní kyfóza',
            'zvýrazněná': 'zvýrazněná hrudní kyfóza',
            'oploštělá': 'oploštělá hrudní kyfóza',
            'inverze': 'inverze hrudní kyfózy'
        }
    },

    lstv: false,
    /* V hrudní páteři je mícha (ne kauda) - útlak se popisuje jako útlak míchy. */
    cordCompression: 'útlakem míchy',
    stabilization: 'Zadní',
    foramenRootFrom: 'fRoot',

    levels: [
        { v: 'C7', disc: 'C7/T1', fRoot: 'C8', root: 'T1' },
        { v: 'T1', disc: 'T1/2', fRoot: 'T1', root: 'T2' },
        { v: 'T2', disc: 'T2/3', fRoot: 'T2', root: 'T3' },
        { v: 'T3', disc: 'T3/4', fRoot: 'T3', root: 'T4' },
        { v: 'T4', disc: 'T4/5', fRoot: 'T4', root: 'T5' },
        { v: 'T5', disc: 'T5/6', fRoot: 'T5', root: 'T6' },
        { v: 'T6', disc: 'T6/7', fRoot: 'T6', root: 'T7' },
        { v: 'T7', disc: 'T7/8', fRoot: 'T7', root: 'T8' },
        { v: 'T8', disc: 'T8/9', fRoot: 'T8', root: 'T9' },
        { v: 'T9', disc: 'T9/10', fRoot: 'T9', root: 'T10' },
        { v: 'T10', disc: 'T10/11', fRoot: 'T10', root: 'T11' },
        { v: 'T11', disc: 'T11/12', fRoot: 'T11', root: 'T12' },
        { v: 'T12', disc: 'T12/L1', fRoot: 'T12', root: 'L1' },
        { v: 'L1' }
    ]
});
