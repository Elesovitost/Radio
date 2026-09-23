/* =============================================================
   Region_Cp.js - krční páteř (SVG).
   Implementace je v js/spine-svg-factory.js; zde je jen to odlišné.
   ============================================================= */

const RegionCp = defineSvgSpineRegion({
    regionId: 'c_spine',
    title: 'Krční páteř',
    adjective: 'krční',
    svgFile: 'Organ_spine_C.svg',

    curvature: {
        key: 'lordosis',
        label: 'Lordóza:',
        states: ['přiměřená', 'mělká', 'napřímená', 'kyfotizace'],
        map: {
            'přiměřená': 'přiměřená krční lordóza',
            'mělká': 'mělká krční lordóza',
            'napřímená': 'napřímená krční lordóza',
            'kyfotizace': 'kyfotizace krční páteře'
        }
    },

    lstv: null,
    /* V krční páteři je mícha (ne kauda) - útlak se popisuje jako útlak míchy. */
    cordCompression: 'útlakem míchy',
    stabilization: 'Přední',
    /* Ve foraminu se popisuje vystupující kořen (fRoot), ne obratel. */
    foramenRootFrom: 'fRoot',

    /* Krční SVG nemá laterální recesy, extraforaminální hernie ani epidurální tuk. */
    omitPaths: ['paracentral-L', 'paracentral-R', 'hernia-E-L', 'hernia-E-R', 'epifat'],
    /* Popisek patologie sedí oproti LS o cca 15 px níž — posunout nahoru. */
    infoOffsetY: -15,

    /* Obratel + disk pod ním; poslední obratel stojí sám. */
    levels: [
        { v: 'C2', disc: 'C2/3', fRoot: 'C3', root: 'C4' },
        { v: 'C3', disc: 'C3/4', fRoot: 'C4', root: 'C5' },
        { v: 'C4', disc: 'C4/5', fRoot: 'C5', root: 'C6' },
        { v: 'C5', disc: 'C5/6', fRoot: 'C6', root: 'C7' },
        { v: 'C6', disc: 'C6/7', fRoot: 'C7', root: 'C8' },
        { v: 'C7', disc: 'C7/T1', fRoot: 'C8', root: 'T1' },
        { v: 'T1', disc: 'T1/2', fRoot: 'T1', root: 'T2' },
        { v: 'T2' }
    ]
});
