/* =============================================================
   config-exams.js
   Module extracted from index.html inline <script>.
   Edit this file - NOT index.html - to change this part.
   ============================================================= */

/* ══════════════════════════════════════════════
   CONFIG EXAMS
═══════════════════════════════════════════════ */
const EXAMS = {
    "PET / CT": [
        { id: 'petct_fdg_trup',  title: 'FDG-PET / CT trupu',  regs: ['neck','thorax','abdomen','skeleton'] },
        { id: 'petct_psma_trup', title: 'PSMA-PET / CT trupu', regs: ['neck','thorax','abdomen','skeleton'] },
        { id: 'petct_dotatoc_trup', title: 'DOTATOC-PET / CT trupu', regs: ['neck','thorax','abdomen','skeleton'] },
        { id: 'petct_dopa_mozek', title: 'DOPA-PET / CT mozku', regs: ['brain'] },
        { id: 'petct_fmm_mozek', title: 'FMM-PET / CT mozku', regs: ['brain'] },
        { id: 'petct_naf_pater', title: 'NaF-PET / CT páteře', regs: ['spine_naf'] },
        { id: 'petct_dopa_trup', title: 'DOPA-PET / CT trupu', regs: ['neck','thorax','abdomen','skeleton'] }
    ],
    "PET / MR": [
        { id: 'petmr_fdg_trup', title: 'FDG-PET / MR trupu', regs: ['neck','thorax','abdomen','skeleton'] },
        { id: 'petmr_psma_prostata', title: 'PSMA-PET / MR prostaty', regs: ['prostate'] },
        { id: 'petmr_fdg_mozek', title: 'FDG-PET / MR mozku', regs: ['brain'] },
        { id: 'petmr_dopa_mozek', title: 'DOPA-PET / MR mozku', regs: ['brain'] },
        { id: 'petmr_fmm_mozek', title: 'FMM-PET / MR mozku', regs: ['brain'] },
        { id: 'petmr_fdg_orl', title: 'FDG-PET / MR ORL', regs: ['neck'] },
        { id: 'petmr_fdg_rekta', title: 'FDG-PET / MR rekta', regs: ['rectum'] }
    ],
    CT: [
        { id: 'ct_mozek', title: 'CT mozku', regs: ['brain'] },
        { id: 'ct_angio_mozku', title: 'CT angiografie', regs: ['br_angiography'] },
        { id: 'ct_krk', title: 'CT krku', regs: ['neck'] },
        { id: 'ct_plic', title: 'CT hrudníku', regs: ['thorax'] },
        { id: 'ct_bricho', title: 'CT břicha', regs: ['abdomen'] },
        { id: 'ct_trup', title: 'CT trupu', regs: ['neck','thorax','abdomen'] },
        { id: 'ct_hrudnik_bricho', title: 'CT hrudníku a břicha', regs: ['thorax', 'abdomen'] },
        { id: 'ct_c_patere', title: 'CT C páteře', regs: ['c_spine'] },
        { id: 'ct_t_patere', title: 'CT T páteře', regs: ['t_spine'] },
        { id: 'ct_ls_patere', title: 'CT L páteře', regs: ['ls_spine'] }
    ],
    MR: [
        { id: 'mr_mozek', title: 'MR mozku', regs: ['brain'] },
        { id: 'mr_angio_mozku', title: 'MR angiografie', regs: ['br_angiography'] },
        { id: 'mr_krk', title: 'MR krku', regs: ['neck'] },
        { id: 'mr_tmk', title: 'MR TMK', regs: ['tmk'] },
        { id: 'mr_prostata', title: 'MR prostaty', regs: ['prostate'] },
        { id: 'mr_rekta', title: 'MR rekta', regs: ['rectum'] },
        { id: 'mr_bricho', title: 'MR břicha', regs: ['abdomen'] },
        { id: 'mr_zapesti', title: 'MR zápěstí', regs: ['wrist'] },
        { id: 'mr_ramene', title: 'MR ramene', regs: ['shoulder'] },
        { id: 'mr_kolene', title: 'MR kolene', regs: ['knee'] },
        { id: 'mr_hlezna', title: 'MR hlezna', regs: ['ankle'] },
        { id: 'mr_c_patere', title: 'MR C páteře', regs: ['c_spine'] },
        { id: 'mr_t_patere', title: 'MR T páteře', regs: ['t_spine'] },
        { id: 'mr_ls_patere', title: 'MR L páteře', regs: ['ls_spine'] },
        { id: 'mr_sis', title: 'MR SIS', regs: ['sis'] }
    ]
};

const RADIOFARM_CONFIG = {
    psma: { defaultSuvJater: '7.0', showGroups: ['jatra', 'jatra_minule', 'parotidy'], defaults: { suv_jater_minule: '7.0', suv_parotid: '20.0' } },
    dotatoc: { defaultSuvJater: '7.0', showGroups: ['jatra', 'jatra_minule', 'slezina'], defaults: { suv_jater_minule: '7.0', suv_sleziny: '20.0' } },
    dopa_mozek: { defaultSuvJater: '3.0', showGroups: ['striatum'], defaults: { suv_jater_minule: '3.0', suv_striata: '2.0' } },
    dopa_trup: { defaultSuvJater: '3.0', showGroups: ['jatra', 'jatra_minule'], defaults: { suv_jater_minule: '3.0' } },
    fdg: { defaultSuvJater: '3.0', showGroups: ['jatra', 'jatra_minule'], defaults: { suv_jater_minule: '3.0' } },
    fmm: { defaultSuvJater: '3.0', showGroups: ['akumulace'], defaults: {} }
};

const FMM_AKUM_STATES = ['-', '+', '++'];
const FMM_AKUM_TEXTS = [
    {
        report: 'Na tomografických řezech nacházíme v amyloidové fázi fyziologickou distribuci radiofarmaka s maximem v bílé hmotě mozkové. V žádné z kritických hodnocených oblastí frontální kůry, předního a zadního cingula a precuneu, temporo-parietální kůry včetně insuly a laterální temporální kůry nenacházíme patologicky zvýšenou akumulaci radiofarmaka.',
        conc: 'Beta-amyloidové plaky nebyly nalezeny. Nález není konzistentní s diagnózou Alzheimerovy choroby.'
    },
    {
        report: 'Na tomografických řezech nacházíme v amyloidové fázi výrazně zvýšenou akumulaci radiofarmaka v šedé kůře mozkové, která přesahuje svojí intenzitou fyziologickou akumulaci v bílé hmotě mozkové - v kritických hodnocených oblastech, tj. ve frontální kůře, předním a zadním cingulu a precuneu, v temporo-parietální kůře včetně insuly a v laterální temporální kůře nacházíme patologicky zvýšenou akumulaci radiofarmaka.',
        conc: 'Pozitivní nález z hlediska přítomnosti beta-amyloidu v šedé kůře mozkové (bez striata) je konzistentní s vaší suspekcí na Alzheimerovu chorobu.'
    },
    {
        report: 'Na tomografických řezech nacházíme v amyloidové fázi výrazně zvýšenou akumulaci radiofarmaka v šedé kůře mozkové, která přesahuje svojí intenzitou fyziologickou akumulaci v bílé hmotě mozkové - v kritických hodnocených oblastech, tj. ve frontální kůře, předním a zadním cingulu a precuneu, v temporo-parietální kůře včetně insuly, v laterální temporální kůře i ve striatu nacházíme patologicky zvýšenou akumulaci radiofarmaka.',
        conc: 'Pozitivní nález z hlediska přítomnosti beta-amyloidu v šedé kůře mozkové včetně striata je konzistentní s vaší suspekcí na Alzheimerovu chorobu.'
    }
];
