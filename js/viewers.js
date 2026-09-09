/* =============================================================
   viewers.js
   Module extracted from index.html inline <script>.
   Edit this file - NOT index.html - to change this part.
   ============================================================= */

/* ═══════════════════════════════════════════════
   SLICE VIEWER CONFIG (Data-Driven)
═══════════════════════════════════════════════ */
const SLICE_VIEWERS = {
    'neck_lymphnode_main': { folder: 'pickrknod', prefix: 'krknod', ext: 'jpg', max: 34, title: 'Referenční řezy krku', width: '550px' },
    'thorax_lesion_main': { folder: 'picchestseg', prefix: 'chestseg', ext: 'png', max: 21, title: 'Segmentace plic (Ref.)', width: '500px' },
    'thorax_lymphnode_main': { folder: 'picmednod', prefix: 'mednod', ext: 'png', max: 24, title: 'Mediastinální uzliny (Ref.)', width: '450px' }
};

// Globální registr pro obrázky mapované k ID tlačítek. Plní ho jednotlivé moduly.
window.HOVER_IMAGES = window.HOVER_IMAGES || {};
