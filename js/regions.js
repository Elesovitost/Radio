/* =============================================================
   regions.js
   Module extracted from index.html inline <script>.
   Edit this file - NOT index.html - to change this part.
   ============================================================= */

/* ═══════════════════════════════════════════════
   MODULAR REGIONS DEFINITION
═══════════════════════════════════════════════ */




const APP_MANIFEST = {
    examsWithSides: {
        'mr_kolene': { field: 'knee_side', label: 'kolene' },
        'mr_ramene': { field: 'shoulder_side', label: 'ramene' },
        'mr_hlezna': { field: 'ankle_side', label: 'hlezna' },
        'mr_zapesti': { field: 'wrist_side', label: 'zápěstí' }
    },
    regions: {
        'shoulder': { svgFile: 'Organs_shoulder_cor.svg', svgHeight: '35vh', svgMode: 'mirrored' },
        'knee':     { svgFile: 'Organs_knee_cor.svg', svgHeight: '35vh', svgMode: 'mirrored' },
        'ankle':    { svgFile: 'Organs_ankle_tra.svg', svgHeight: '50vh', svgMode: 'mirrored' },
        'prostate': { svgFile: 'Organs_prostate.svg', svgHeight: '30vh', svgMode: 'normal' },
        'rectum':   { svgFile: 'Organs_rectum.svg', svgHeight: '30vh', svgMode: 'normal' }
    }
};

const REGIONS = {
    brain: typeof RegionBrain !== 'undefined' ? RegionBrain : null,
    br_angiography: typeof RegionBrAngiography !== 'undefined' ? RegionBrAngiography : null,
    neck: typeof RegionNeck !== 'undefined' ? RegionNeck : null,
    thorax: typeof RegionThorax !== 'undefined' ? RegionThorax : null,
    abdomen: typeof RegionAbdomen !== 'undefined' ? RegionAbdomen : null,
    skeleton: typeof RegionSkeleton !== 'undefined' ? RegionSkeleton : null,
    wrist: typeof RegionWrist !== 'undefined' ? RegionWrist : null,
    shoulder: typeof RegionShoulder !== 'undefined' ? RegionShoulder : null,
    knee: typeof RegionKnee !== 'undefined' ? RegionKnee : null,
    ankle: typeof RegionAnkle !== 'undefined' ? RegionAnkle : null,
    ls_spine: typeof RegionLSp !== 'undefined' ? RegionLSp : null,
    prostate: typeof RegionProstate !== 'undefined' ? RegionProstate : null,
    rectum: typeof RegionRectum !== 'undefined' ? RegionRectum : null,
    tmk: typeof RegionTmk !== 'undefined' ? RegionTmk : null,
    sis: typeof RegionSis !== 'undefined' ? RegionSis : null,
    c_spine: typeof RegionCp !== 'undefined' ? RegionCp : null,
    t_spine: typeof RegionTp !== 'undefined' ? RegionTp : null,
    spine_naf: typeof RegionSpineNaf !== 'undefined' ? RegionSpineNaf : null
};
        
