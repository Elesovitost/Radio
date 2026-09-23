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
        { id: 'petct_fdg_trup',  title: 'FDG-PET / CT trupu',  regs: ['neck','thorax','abdomen','skeleton','soft'] },
        { id: 'petct_fmm_mozek', title: 'FMM-PET / CT mozku', regs: ['brain'] },
        { id: 'petct_dopa_mozek', title: 'DOPA-PET / CT mozku', regs: ['brain'] },
        { id: 'petct_dopa_trup', title: 'DOPA-PET / CT trupu', regs: ['neck','thorax','abdomen','skeleton','soft'] },
        { id: 'petct_psma_trup', title: 'PSMA-PET / CT trupu', regs: ['neck','thorax','abdomen','skeleton','soft'] },
        { id: 'petct_dotatoc_trup', title: 'DOTATOC-PET / CT trupu', regs: ['neck','thorax','abdomen','skeleton','soft'] },
        { id: 'petct_naf_pater', title: 'NaF-PET / CT páteře', regs: ['spine_naf'] }
    ],
    "PET / MR": [
        { id: 'petmr_fdg_mozek', title: 'FDG-PET / MR mozku', regs: ['brain'] },
        { id: 'petmr_fdg_trup', title: 'FDG-PET / MR trupu', regs: ['neck','thorax','abdomen','skeleton','soft'] },
        { id: 'petmr_fdg_orl', title: 'FDG-PET / MR ORL', regs: ['neck'] },
        { id: 'petmr_fdg_bricho', title: 'FDG-PET / MR břicha', regs: ['abdomen'] },
        { id: 'petmr_fdg_rekta', title: 'FDG-PET / MR rekta', regs: ['rectum'] },
        { id: 'petmr_fmm_mozek', title: 'FMM-PET / MR mozku', regs: ['brain'] },
        { id: 'petmr_dopa_mozek', title: 'DOPA-PET / MR mozku', regs: ['brain'] },
        { id: 'petmr_psma_prostata', title: 'PSMA-PET / MR prostaty', regs: ['prostate'] }
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

/* =============================================================
   REPORT_PROFILES
   Jak se z ReportDoc složí výstup "Report" (náhled / kopírovat vše).
   Klíč je prefix examId před "_" (typ vyšetření) nebo celý examId;
   konkrétnější klíč přebíjí obecnější, vše se slévá přes "default".

   - title             – titulek vyšetření (u více vyšetření seznam)
   - indication        – řádek s indikací
   - pastDate          – řádek "srovnáno s …"
   - indicationLabel / pastDateLabel / conclusionLabel / incidentalLabel
                       – popisky (null = bez popisku)
   - tracer            – PET radiofarmakum; určuje texty v PET_TEXTS
   - physio            – u celotrupové PET tiskne fyziologickou distribuci RF

   Nález se skládá v pořadí: titulek → indikace → datum → nález →
   fyziologická distribuce RF (blok "OSTATNÍ:" na konci nálezu) →
   závěr → vedlejší nálezy. Pořadí regionů v nálezu = pořadí v REGIONS
   (ne pořadí klikání).

   Záměrná rozhodnutí (neměnit bez domluvy):
   - blok "OSTATNÍ:" se v textu tiskne bez popisku - jen jako poslední
     odstavec nálezu (v panelu Findings se nadpis zobrazuje)
   - nález regionu zůstává inline (jeden odstavec), i když má vyšetření
     víc regionů; 'block' se používá jen tam, kde ho má region sám
   - tiskne se i region aktivovaný mimo regs vyšetření, jen se seřadí
     podle REGIONS
   ============================================================= */
/* Texty vázané na radiofarmakum. */
const PET_TEXTS = {
    fdg: {
        negative: 'Bez známek přítomnosti FDG-avidní neoplázie.',
        physio: 'Neložisková akumulace radiofarmaka ve svalech, v gastrointestinálním traktu a urotraktu je přítomna na podkladě fyziologických procesů či jako zcela nespecifický nález. Akumulace RF vztažena k referenčnímu zdravému parenchymu jater.'
    },
    psma: {
        negative: 'Bez známek přítomnosti ložisek zvýšené exprese PSMA.',
        /* Pozn.: "gastrointestinální traktu" je původní (chybný) tvar - opraví ho až Corrections. */
        physio: 'Neložisková akumulace radiofarmaka ve slinných a slzných žlazách, v jaterním parenchymu, slezině, v gastrointestinální traktu a urotraktu je přítomna na podkladě fyziologických procesů či jako zcela nespecifický nález. Akumulace RF vztažena k referenčnímu zdravému parenchymu jater a event. parotid.'
    },
    dotatoc: {
        negative: 'Bez známek přítomnosti ložisek se zvýšeným nakupením somatostatinových receptorů.',
        physio: 'Neložisková akumulace radiofarmaka v hypofýze, štítné žláze, nadledvinách a urotraktu je přítomna na podkladě fyziologických procesů či jako zcela nespecifický nález. Akumulace RF vztažena k referenčnímu zdravému parenchymu jater a event. sleziny.'
    },
    dopa: {
        negative: 'Bez známek přítomnosti ložisek se zvýšenou konzumpcí aminokyseliny.',
        physio: 'Neložisková akumulace radiofarmaka v (BG bilat. v mozku), pankreatu, žlučových cestách a urotraktu (v břiše) je přítomna na podkladě fyziologických procesů či jako zcela nespecifický nález. k referenčnímu zdravému parenchymu jater.'
    },
    fmm: {}
};

const REPORT_PROFILES = {
    default: {
        title: true,
        indication: true,
        pastDate: true,
        indicationLabel: 'Indikace:',
        pastDateLabel: 'Srovnáno s vyšetřením z',
        conclusionLabel: 'Závěr:',
        incidentalLabel: 'Vedlejší nálezy:',
        tracer: null,
        physio: false
    },

    /* PET / CT */
    petct_fdg_trup: { tracer: 'fdg', physio: true },
    petct_psma_trup: { tracer: 'psma', physio: true },
    petct_dotatoc_trup: { tracer: 'dotatoc', physio: true },
    petct_dopa_trup: { tracer: 'dopa', physio: true },
    petct_dopa_mozek: { tracer: 'dopa' },
    petct_fmm_mozek: { tracer: 'fmm' },

    /* PET / MR */
    petmr_fdg_trup: { tracer: 'fdg', physio: true },
    petmr_fdg_bricho: { tracer: 'fdg', physio: true },
    petmr_psma_prostata: { tracer: 'psma' },
    petmr_fdg_mozek: { tracer: 'fdg' },
    petmr_dopa_mozek: { tracer: 'dopa' },
    petmr_fmm_mozek: { tracer: 'fmm' },
    petmr_fdg_orl: { tracer: 'fdg' },
    petmr_fdg_rekta: { tracer: 'fdg' }
};

/* =============================================================
   Titulky vyšetření – rozklad na přepínatelné části (radiofarmakum / modalita)
   a hledání variant pro cyklus. Sdíleno mezi lištou vyšetření (ui-details)
   a handlerem 'cycle-exam-part' (actions).
   ============================================================= */
const ExamTitle = {
    PET_RE: /^([A-Z]+)(-PET \/ )([A-Z]+)(.*)$/,
    TOMO_RE: /^(CT|MR)( )(.*)$/,

    /* { kind:'pet', pet, tomo, separator, rest } | { kind:'tomo', modality, rest } | { kind:'plain' } */
    parse(title) {
        const pet = title.match(this.PET_RE);
        if (pet) {
            return {
                kind: 'pet', pet: pet[1], tomo: pet[3],
                separator: pet[2].replace('-', '').trim(), rest: pet[4]
            };
        }
        const tomo = title.includes('PET') ? null : title.match(this.TOMO_RE);
        if (tomo) return { kind: 'tomo', modality: tomo[1], rest: tomo[3] };
        return { kind: 'plain' };
    },

    /* ID vyšetření, mezi kterými lze cyklovat danou část ('pet' | 'tomo' | 'modality'). */
    variants(examId, part) {
        const exam = getExamById(examId);
        const parsed = exam ? this.parse(exam.title) : null;
        if (!parsed || parsed.kind === 'plain') return [];
        if (parsed.kind === 'pet' && part !== 'pet' && part !== 'tomo') return [];

        return Object.values(EXAMS).flat()
            .filter(e => {
                const m = this.parse(e.title);
                if (parsed.kind === 'tomo') return m.kind === 'tomo' && m.rest === parsed.rest;
                if (m.kind !== 'pet' || m.rest !== parsed.rest) return false;
                return part === 'pet' ? m.tomo === parsed.tomo : m.pet === parsed.pet;
            })
            .map(e => e.id);
    }
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
