/* =============================================================
   Region_LSp.js - bederní páteř (SVG).
   Implementace je v js/spine-svg-factory.js; zde je jen to odlišné.
   ============================================================= */

const RegionLSp = defineSvgSpineRegion({
    regionId: 'ls_spine',
    title: 'Bederní páteř',
    adjective: 'bederní',
    svgFile: 'Organs_spine.svg',

    curvature: {
        key: 'lordosis',
        label: 'Lordóza:',
        states: ['přiměřená', 'mělká', 'napřímená', 'kyfotizace'],
        map: {
            'přiměřená': 'přiměřená bederní lordóza',
            'mělká': 'mělká bederní lordóza',
            'napřímená': 'napřímená bederní lordóza',
            'kyfotizace': 'kyfotizace bederní páteře'
        }
    },

    lstv: ['není', 'L5', 'S1'],
    cordCompression: 'agregací kaudy',
    stabilization: 'Zadní',
    /* V bederní páteři se kořen ve foraminu popisuje obratlem etáže. */
    foramenRootFrom: 'vLabel',

    /* Myelopatie má v bederní páteři smysl jen do L1 (konus). */
    myeloLevels: ['T11', 'T12', 'L1'],

    /* Obratel + disk pod ním; poslední obratel stojí sám. */
    levels: [
        { v: 'T11', disc: 'T11/12', root: 'T12' },
        { v: 'T12', disc: 'T12/L1', root: 'L1' },
        { v: 'L1', disc: 'L1/2', root: 'L2' },
        { v: 'L2', disc: 'L2/3', root: 'L3' },
        { v: 'L3', disc: 'L3/4', root: 'L4' },
        { v: 'L4', disc: 'L4/5', root: 'L5' },
        { v: 'L5', disc: 'L5/S1', root: 'S1' },
        { v: 'S1' }
    ]
});
