/* =============================================================
   tests/fixtures.js
   Deklarativní stavy pro golden master.

   buttons / custom / fields: klíč "region:localId"
     - "standard" tlačítko -> název stavu (např. 'ANO', '+', 'hyper++')
         * u tabulek *_add_normal: 'normal' = jen Findings, 'normal!' = Findings + Impression
     - "basic" / "basic_custom" tlačítko -> true
     - číslo -> index stavu přímo
   fields bez ':' jsou globální (např. suv_jater, suv_parotid).
     - číselná pole lézí patří sem: *_met_size, *_met_suv, *_met_size_old, *_met_suv_old

   instances: { "<baseTableId>": ["<instId>", ...] }

   rawStates: klíč "region:localId" -> true
     Stavy, které nemají ButtonConfigs (kliknutí do SVG mapy – lokalizace léze
     u prostaty). Zapisují se přímo do Store.buttonStates.
   ============================================================= */

/* Normalizované "vše v pořádku" sady pro jednotlivé regiony. */
const NORM_NECK = {
    'neck:neck_sinus_add_normal': 'normal!',
    'neck:neck_salivary_add_normal': 'normal!',
    'neck:neck_pharynx_add_normal': 'normal!',
    'neck:neck_thyroid_add_normal': 'normal!',
    'neck:neck_soft_add_normal': 'normal!',
    'neck:neck_ostatni_add_normal': 'normal!'
};
const NORM_THORAX = {
    'thorax:plice_ost_add_normal': 'normal!',
    'thorax:pleura_ost_add_normal': 'normal!',
    'thorax:mamma_ost_add_normal': 'normal!',
    'thorax:jicen_ost_add_normal': 'normal!',
    'thorax:thymus_ost_add_normal': 'normal!',
    'thorax:srdce_ost_add_normal': 'normal!',
    'thorax:devices_ost_add_normal': 'normal!',
    'thorax:ostatni_ost_add_normal': 'normal!'
};
const NORM_ABDOMEN = {
    'abdomen:ja_ost_add_normal': 'normal!',
    'abdomen:zl_ost_add_normal': 'normal!',
    'abdomen:sl_ost_add_normal': 'normal!',
    'abdomen:za_ost_add_normal': 'normal!',
    'abdomen:pa_ost_add_normal': 'normal!',
    'abdomen:tr_ost_add_normal': 'normal!',
    'abdomen:pe_ost_add_normal': 'normal!',
    'abdomen:na_ost_add_normal': 'normal!',
    'abdomen:le_ost_add_normal': 'normal!',
    'abdomen:mm_ost_add_normal': 'normal!',
    'abdomen:de_ost_add_normal': 'normal!',
    'abdomen:ov_ost_add_normal': 'normal!',
    'abdomen:pr_ost_add_normal': 'normal!',
    'abdomen:te_ost_add_normal': 'normal!',
    'abdomen:vc_ost_add_normal': 'normal!',
    'abdomen:aw_ost_add_normal': 'normal!',
    'abdomen:ts_ost_add_normal': 'normal!',
    'abdomen:ostatni_ost_add_normal': 'normal!'
};
const NORM_BRAIN = {
    'brain:br_wml_ost_add_normal': 'normal!',
    'brain:br_atr_ost_add_normal': 'normal!',
    'brain:br_cpa_ost_add_normal': 'normal!',
    'brain:br_sella_ost_add_normal': 'normal!',
    'brain:br_ves_ost_add_normal': 'normal!',
    'brain:br_orb_ost_add_normal': 'normal!',
    'brain:neck_sinus_add_normal': 'normal!'
};

const FIXTURES = [
    /* ═════════════ negativní / all-normal ═════════════ */
    {
        id: 'neg-pet-fdg-trup',
        exam: 'petct_fdg_trup',
        buttons: Object.assign({}, NORM_NECK, NORM_THORAX, NORM_ABDOMEN)
    },
    {
        id: 'neg-ct-trup',
        exam: 'ct_trup',
        buttons: Object.assign({}, NORM_NECK, NORM_THORAX, NORM_ABDOMEN)
    },
    {
        id: 'neg-pet-psma-trup',
        exam: 'petct_psma_trup',
        fields: { suv_parotid: '20.0' },
        buttons: Object.assign({}, NORM_NECK, NORM_THORAX, NORM_ABDOMEN)
    },
    {
        id: 'neg-pet-dotatoc-trup',
        exam: 'petct_dotatoc_trup',
        buttons: Object.assign({}, NORM_NECK, NORM_THORAX, NORM_ABDOMEN)
    },
    {
        id: 'neg-pet-dopa-trup',
        exam: 'petct_dopa_trup',
        buttons: Object.assign({}, NORM_NECK, NORM_THORAX, NORM_ABDOMEN)
    },
    {
        id: 'neg-mr-krk',
        exam: 'mr_krk',
        buttons: Object.assign({}, NORM_NECK)
    },
    {
        id: 'neg-mr-mozek',
        exam: 'mr_mozek',
        buttons: Object.assign({}, NORM_BRAIN)
    },
    {
        id: 'neg-ct-mozek',
        exam: 'ct_mozek',
        buttons: Object.assign({}, NORM_BRAIN)
    },
    {
        id: 'neg-ct-hrudnik-bricho',
        exam: 'ct_hrudnik_bricho',
        buttons: Object.assign({}, NORM_THORAX, NORM_ABDOMEN)
    },
    {
        id: 'neg-petmr-fdg-mozek',
        exam: 'petmr_fdg_mozek',
        buttons: Object.assign({}, NORM_BRAIN)
    },

    /* ═════════════ KRK ═════════════ */
    {
        id: 'neck-lesion-pet',
        exam: 'petct_fdg_trup',
        instances: { neck_lesion_main: ['1'] },
        buttons: {
            'neck:l_1_c_soli': true,
            'neck:l_1_k_les': true,
            'neck:l_1_p_patro_r': '+',
            'neck:l_1_p_par_l': '+',
            'neck:l_1_met_act': 'zvýšená',
            'neck:l_1_ct_nat': 'nativ hypo',
            'neck:l_1_ct_syc': 'hyper',
            'neck:l_1_e_m': 'maligní+',
            'neck:l_1_e_meta': 'meta?'
        },
        fields: { 'neck:l_1_met_size': '18', 'neck:l_1_met_suv': '7.2' }
    },
    {
        id: 'neck-lesion-mr',
        exam: 'mr_krk',
        instances: { neck_lesion_main: ['1', '2'] },
        buttons: {
            'neck:l_1_c_soli': true,
            'neck:l_1_k_les': true,
            'neck:l_1_p_lar_r': '+',
            'neck:l_1_mr_t1': 'T1 hypo',
            'neck:l_1_mr_t2': 'T2 hyper',
            'neck:l_1_mr_dwi': 'DWI +',
            'neck:l_1_mr_t1c': 'sycení',
            'neck:l_1_e_t': 'tumor+',
            'neck:l_2_c_vice': true,
            'neck:l_2_k_cys': true,
            'neck:l_2_p_sub_l': '+',
            'neck:l_2_mr_t2': 'T2 hyper',
            'neck:l_2_e_b': 'benigní+'
        },
        fields: { 'neck:l_1_met_size': '22x18', 'neck:l_2_met_size': '9' }
    },
    {
        id: 'neck-lesion-dynamics',
        exam: 'ct_krk',
        past: '2026-03-01',
        instances: { neck_lesion_main: ['1'] },
        buttons: {
            'neck:l_1_c_soli': true,
            'neck:l_1_k_inf': true,
            'neck:l_1_p_far_r': '+',
            'neck:l_1_met_cnt_old': 'více',
            'neck:l_1_met_act': 'intermediární',
            'neck:l_1_ct_nat': 'nativ hypo',
            'neck:l_1_ct_syc': 'sycení',
            'neck:l_1_doplneni': true,
            'neck:l_1_e_t': 'tumor!'
        },
        fields: {
            'neck:l_1_met_size': '26',
            'neck:l_1_met_size_old': '20',
            'neck:l_1_met_suv': '6.0',
            'neck:l_1_met_suv_old': '6.4'
        },
        custom: { 'neck:l_1_doplneni': 'infiltrace okolní tukové tkáně' }
    },
    {
        id: 'neck-lymphnodes',
        exam: 'petct_fdg_trup',
        instances: { neck_lymphnode_main: ['1'] },
        buttons: {
            'neck:ln_1_c_vice': true,
            'neck:ln_1_k_pak': true,
            'neck:ln_1_p_krk_r': true,
            'neck:ln_1_p_IA_r': true,
            'neck:ln_1_p_IIA_l': true,
            'neck:ln_1_p_III_l': true,
            'neck:ln_1_met_act': 'intermediární',
            'neck:ln_1_e_meta': 'meta+'
        },
        fields: { 'neck:ln_1_met_size': '22x15', 'neck:ln_1_met_suv': '5.5' }
    },
    {
        id: 'neck-sinus-salivary',
        exam: 'petct_fdg_trup',
        buttons: {
            'neck:sinus_maxil_r': 'hyper++',
            'neck:sinus_maxil_l': 'hyper++',
            'neck:sinus_front_r': 'tekutina',
            'neck:sinus_front_l': 'tekutina',
            'neck:par_nod_RF_r': 'více',
            'neck:par_atr_l': '+',
            'neck:sub_nod_r': '1',
            'neck:sub_res_l': '+'
        },
        custom: { 'neck:sinus_custom_desc': 'drobná mukózní retence' },
        fields: { 'neck:sinus_custom_conc': 'Kontrola za 6 měsíců.' }
    },
    {
        id: 'neck-pharynx-thyroid-soft',
        exam: 'petct_fdg_trup',
        buttons: {
            'neck:far_asym_oro_r': 'poop',
            'neck:far_asym_oro_l': 'poop',
            'neck:far_tons_r': '+',
            'neck:far_hlas_l': '+',
            'neck:thyr_enl': true,
            'neck:thyr_res_r': '+',
            'neck:thyr_nod_rf_l': '1',
            'neck:thyr_cys_r': '1'
        },
        custom: {
            'neck:neck_soft_custom_desc': 'difuzně prosáklé podkoží',
            'neck:neck_ostatni_custom_desc': 'drobná uzlinka v jizvě'
        }
    },

    /* ═════════════ HRUDNÍK ═════════════ */
    {
        id: 'thorax-lesion-pet',
        exam: 'petct_fdg_trup',
        instances: { thorax_lesion_main: ['1'] },
        buttons: {
            'thorax:tl_1_c_soli': true,
            'thorax:tl_1_k_les': true,
            'thorax:tl_1_p_hl_r': 'S2',
            'thorax:tl_1_p_dl_l': 'S10',
            'thorax:tl_1_met_act': 'vysoká',
            'thorax:tl_1_ct_nat': 'nativ hypo',
            'thorax:tl_1_ct_syc': 'progresivní',
            'thorax:tl_1_e_m': 'maligní!'
        },
        fields: { 'thorax:tl_1_met_size': '24', 'thorax:tl_1_met_suv': '9.1' }
    },
    {
        id: 'thorax-lymphnodes',
        exam: 'ct_hrudnik_bricho',
        instances: { thorax_lymphnode_main: ['1'] },
        buttons: {
            'thorax:tln_1_c_mnoho': true,
            'thorax:tln_1_k_uzl': true,
            'thorax:tln_1_p_med_c': true,
            'thorax:tln_1_p_4_r': true,
            'thorax:tln_1_p_4_l': true,
            'thorax:tln_1_p_7_c': true,
            'thorax:tln_1_p_hil_r': true,
            'thorax:tln_1_p_axi_l': true,
            'thorax:tln_1_met_act': 'vysoká',
            'thorax:tln_1_ct_syc': 'hyper',
            'thorax:tln_1_e_meta': 'meta!'
        },
        fields: { 'thorax:tln_1_met_size': '30x20' }
    },
    {
        id: 'thorax-plice-ild-uip',
        exam: 'ct_plic',
        activeTable: 'thorax_ild_main',
        buttons: {
            'thorax:pl_fib': 'ANO',
            'thorax:ild_fib_ano': true,
            'thorax:ild_cpfe_ne': true,
            'thorax:ild_uip_ano': true
        },
        custom: { 'thorax:plice_custom_desc': 'současně drobná trakční bronchiektázie' }
    },
    {
        id: 'thorax-plice-ild-fhp',
        exam: 'ct_plic',
        activeTable: 'thorax_ild_main',
        buttons: {
            'thorax:pl_fib': 'ANO',
            'thorax:ild_fib_ano': true,
            'thorax:ild_cpfe_ne': true,
            'thorax:ild_uip_ne': true,
            'thorax:ild_prob_ne': true,
            'thorax:ild_morph_fhp': true
        }
    },
    {
        id: 'thorax-plice-ild-nodularni',
        exam: 'ct_plic',
        activeTable: 'thorax_ild_main',
        buttons: {
            'thorax:pl_fib': 'ANO',
            'thorax:ild_fib_ne': true,
            'thorax:ild_pat_nod': true,
            'thorax:ild_nod_cent': true,
            'thorax:ild_tib_ano': true
        }
    },
    {
        id: 'thorax-plice-ild-cysticky',
        exam: 'ct_plic',
        activeTable: 'thorax_ild_main',
        buttons: {
            'thorax:pl_fib': 'ANO',
            'thorax:ild_fib_ne': true,
            'thorax:ild_pat_cyst': true,
            'thorax:ild_cyst_bhd': true
        }
    },
    {
        id: 'thorax-plice-ild-cpfe',
        exam: 'ct_plic',
        activeTable: 'thorax_ild_main',
        buttons: {
            'thorax:pl_fib': 'ANO',
            'thorax:ild_fib_ano': true,
            'thorax:ild_cpfe_ano': true
        }
    },
    {
        id: 'thorax-plice-ild-ila',
        exam: 'ct_plic',
        activeTable: 'thorax_ild_main',
        buttons: {
            'thorax:pl_fib': 'ANO',
            'thorax:ild_fib_ne': true,
            'thorax:ild_pat_ila': true
        }
    },
    {
        id: 'thorax-plice-ild-dens',
        exam: 'ct_plic',
        activeTable: 'thorax_ild_main',
        buttons: {
            'thorax:pl_fib': 'ANO',
            'thorax:ild_fib_ne': true,
            'thorax:ild_pat_dens': true,
            'thorax:ild_dens_crazy': true
        }
    },
    {
        id: 'thorax-plice-ild-nod-peri',
        exam: 'ct_plic',
        activeTable: 'thorax_ild_main',
        buttons: {
            'thorax:pl_fib': 'ANO',
            'thorax:ild_fib_ne': true,
            'thorax:ild_pat_nod': true,
            'thorax:ild_nod_peri': true
        }
    },
    {
        id: 'thorax-plice-ild-nod-rand',
        exam: 'ct_plic',
        activeTable: 'thorax_ild_main',
        buttons: {
            'thorax:pl_fib': 'ANO',
            'thorax:ild_fib_ne': true,
            'thorax:ild_pat_nod': true,
            'thorax:ild_nod_rand': true
        }
    },
    {
        id: 'thorax-plice-ild-nod-tib-ne',
        exam: 'ct_plic',
        activeTable: 'thorax_ild_main',
        buttons: {
            'thorax:pl_fib': 'ANO',
            'thorax:ild_fib_ne': true,
            'thorax:ild_pat_nod': true,
            'thorax:ild_nod_cent': true,
            'thorax:ild_tib_ne': true
        }
    },
    {
        id: 'thorax-plice-ild-cyst-lam',
        exam: 'ct_plic',
        activeTable: 'thorax_ild_main',
        buttons: {
            'thorax:pl_fib': 'ANO',
            'thorax:ild_fib_ne': true,
            'thorax:ild_pat_cyst': true,
            'thorax:ild_cyst_lam': true
        }
    },
    {
        id: 'thorax-plice-emfyzem-operace',
        exam: 'ct_plic',
        buttons: {
            'thorax:pl_emf': 'panacin.',
            'thorax:pl_emf_loc': 'bazálně',
            'thorax:pl_mikro_r': 'více',
            'thorax:pl_nodul_l': '1',
            'thorax:pl_jizva_r': '1',
            'thorax:pl_op_lob_r': 'H',
            'thorax:pl_op_res_l': 'D'
        }
    },
    {
        id: 'thorax-pleura-dynamics',
        exam: 'ct_plic',
        past: '2026-02-10',
        fields: {
            'thorax:pl_tek_r': '35',
            'thorax:pl_tek_old_r': '20',
            'thorax:pl_vzd_l': '10',
            'thorax:pl_vzd_old_l': '18',
            'thorax:sr_tek_mm': '22',
            'thorax:sr_tek_old_mm': '12'
        },
        buttons: {
            'thorax:pl_akt_r': '+',
            'thorax:pl_talk_l': '+'
        }
    },
    {
        id: 'thorax-srdce-mediastinum-jicen',
        exam: 'ct_hrudnik_bricho',
        buttons: {
            'thorax:sr_dil': 'celého',
            'thorax:sr_dil_ao': 'oboje',
            'thorax:sr_chl': 'Ao+Asc R',
            'thorax:sr_as': '+',
            'thorax:th_zvet': '+',
            'thorax:th_akt': '+',
            'thorax:th_med_pred': 'kombinace',
            'thorax:th_med_zad': 'solidní',
            'thorax:ji_hernie': 'větší',
            'thorax:ji_aktdist': '+',
            'thorax:ji_res': 'žaludek'
        },
        fields: { 'thorax:sr_dil_ao_mm': '46' }
    },
    {
        id: 'thorax-mamma-devices-ostatni',
        exam: 'ct_hrudnik_bricho',
        buttons: {
            'thorax:ma_mast_r': '+',
            'thorax:ma_kvad_l': '+',
            'thorax:ma_aug_r': '+',
            'thorax:dev_port_r': '+',
            'thorax:dev_cvk_l': '+',
            'thorax:dev_icd_r': '+'
        },
        custom: {
            'thorax:mamma_custom_desc': 'drobná retrakce bradavky vlevo',
            'thorax:devices_custom_desc': 'hrot portkatetru v pravé síni',
            'thorax:ostatni_custom_desc': 'drobná skolióza Th páteře'
        },
        fields: {
            'thorax:mamma_custom_conc': 'Suspektní drobný karcinom.',
            'thorax:devices_custom_conc': 'Hrot portkatetru ve správné pozici.',
            'thorax:ostatni_custom_conc': 'Bez akutní patologie.'
        }
    },

    /* ═════════════ BŘICHO ═════════════ */
    {
        id: 'abdomen-lesion-jatra',
        exam: 'ct_bricho',
        instances: { abdomen_lesion_main: ['1'] },
        buttons: {
            'abdomen:al_1_c_soli': true,
            'abdomen:al_1_k_les': true,
            'abdomen:al_1_p_ja_s6': '+',
            'abdomen:al_1_p_led_l': '+',
            'abdomen:al_1_met_act': 'zvýšená',
            'abdomen:al_1_ct_nat': 'nativ hypo',
            'abdomen:al_1_ct_syc': 'wash-out',
            'abdomen:al_1_e_meta': 'meta!'
        },
        fields: { 'abdomen:al_1_met_size': '32' }
    },
    {
        id: 'abdomen-lymphnodes',
        exam: 'ct_bricho',
        instances: { abdomen_lymphnode_main: ['1'] },
        buttons: {
            'abdomen:aln_1_c_vice': true,
            'abdomen:aln_1_k_uzl': true,
            'abdomen:aln_1_p_hil_c': true,
            'abdomen:aln_1_p_par_r': true,
            'abdomen:aln_1_p_par_l': true,
            'abdomen:aln_1_p_ret_c': true,
            'abdomen:aln_1_p_ing_l': true,
            'abdomen:aln_1_met_act': 'intermediární',
            'abdomen:aln_1_e_meta': 'meta?'
        },
        fields: { 'abdomen:aln_1_met_size': '18' }
    },
    {
        id: 'abdomen-jatra-zlucnik-slezina',
        exam: 'ct_bricho',
        buttons: {
            'abdomen:ja_cys_r': 'více',
            'abdomen:ja_hem_l': '1',
            'abdomen:ja_dil_r': '+',
            'abdomen:ja_zvet': 'mírné',
            'abdomen:ja_dif': 'steatóza',
            'abdomen:ja_port': '+',
            'abdomen:ja_hemi_r': '+',
            'abdomen:ja_rfa_l': '+',
            'abdomen:zl_lit': 'více',
            'abdomen:zl_chol': 'mírná',
            'abdomen:zl_chod': 'mírná',
            'abdomen:zl_chce': '+',
            'abdomen:sl_zvet': '+',
            'abdomen:sl_akt': '+',
            'abdomen:sl_cys': 'více',
            'abdomen:sl_inf': '1',
            'abdomen:sl_reg': '+'
        }
    },
    {
        id: 'abdomen-zaludek-pankreas-tracnik',
        exam: 'ct_bricho',
        buttons: {
            'abdomen:za_res': 'parc.',
            'abdomen:za_bar': 'bypass',
            'abdomen:za_fun': '+',
            'abdomen:za_son': 'PEG',
            'abdomen:za_zes': 'výrazné',
            'abdomen:za_zes_loc': 'antrum',
            'abdomen:pa_atr': 'kalcifikace',
            'abdomen:pa_wir': '+',
            'abdomen:pa_cys': 'více',
            'abdomen:pa_op': 'kauda',
            'abdomen:tr_res': 'sigmoidea',
            'abdomen:tr_app': 'APPE',
            'abdomen:tr_sto': 'kolostomie',
            'abdomen:tr_sto_loc': 'vlevo',
            'abdomen:tr_fok': 'fokus',
            'abdomen:tr_fok_loc': 'sigmoideum',
            'abdomen:tr_zes': 'výrazné',
            'abdomen:tr_zes_loc': 'rektum',
            'abdomen:tr_div': 'divertikulitida',
            'abdomen:tr_div_loc': 'sigmoideum'
        },
        fields: { 'abdomen:pa_wir_mm': '5', 'abdomen:pa_cys_mm': '22' }
    },
    {
        id: 'abdomen-peritoneum-ascites',
        exam: 'ct_bricho',
        past: '2025-12-01',
        buttons: {
            'abdomen:pe_mis': 'panikulitis',
            'abdomen:pe_asc': 'střední',
            'abdomen:pe_asc_old': 'malý'
        },
        custom: { 'abdomen:pe_custom_desc': 'peritoneální depozita podél ligamenta teres' }
    },
    {
        id: 'abdomen-nadledviny-ledviny',
        exam: 'ct_bricho',
        buttons: {
            'abdomen:na_akt_r': '+',
            'abdomen:na_hyp_l': '+',
            'abdomen:na_inc_r': 'I',
            'abdomen:na_mye_l': '+',
            'abdomen:na_adr_r': '+',
            'abdomen:le_cys_r': 'více',
            'abdomen:le_aml_l': '1',
            'abdomen:le_hyd_r': 'II',
            'abdomen:le_lit_l': 'ureter',
            'abdomen:le_ste_r': 'dislokace',
            'abdomen:le_nef_l': '+',
            'abdomen:le_res_r': 'horní',
            'abdomen:le_nek_l': '+'
        }
    },
    {
        id: 'abdomen-pelvis-organy',
        exam: 'ct_bricho',
        buttons: {
            'abdomen:mm_kat': 'PMK',
            'abdomen:mm_div': 'více',
            'abdomen:mm_sto': 'Bricker',
            'abdomen:mm_op': 'TURB',
            'abdomen:de_myo': 'více',
            'abdomen:de_myo_loc': 'submukózní',
            'abdomen:de_end': 'zesílení',
            'abdomen:de_end_int': 'výrazné/á',
            'abdomen:de_akt': '+',
            'abdomen:de_iud': '+',
            'abdomen:de_hys': '+',
            'abdomen:ov_pc_l': '1',
            'abdomen:ov_kc_r': 'více',
            'abdomen:ov_akt_l': '+',
            'abdomen:ov_adn_r': '+',
            'abdomen:pr_zvet': '+',
            'abdomen:pr_fok': '+',
            'abdomen:pr_tur': '+',
            'abdomen:pr_rap': '+'
        },
        fields: { 'abdomen:pr_zvet_ml': '40', 'abdomen:ov_kc_mm_r': '55' }
    },
    {
        id: 'abdomen-testes-cevy-stena',
        exam: 'ct_bricho',
        buttons: {
            'abdomen:te_hyd_r': '+',
            'abdomen:te_var_l': '+',
            'abdomen:te_orc_r': '+',
            'abdomen:vc_an': 'subrenální',
            'abdomen:vc_sg': '+',
            'abdomen:vc_sk_aorta': true,
            'abdomen:vc_sk_cia_r': true,
            'abdomen:vc_sk_fa_l': true,
            'abdomen:vc_st_ams': true,
            'abdomen:vc_by_af_r': '+',
            'abdomen:vc_by_ff_l': '+',
            'abdomen:aw_sc_r': '+',
            'abdomen:aw_scar_l': 'RF+',
            'abdomen:aw_her_umb': 'střední',
            'abdomen:aw_her_ing_r': 'velká'
        },
        fields: { 'abdomen:vc_an_val': '52' }
    },
    {
        id: 'abdomen-ostatni-tenke-strevo',
        exam: 'ct_bricho',
        custom: {
            'abdomen:ts_custom_desc': 'difuzní ztluštění klků',
            'abdomen:ostatni_custom_desc': 'drobný kožní defekt v levém hypogastriu'
        },
        fields: {
            'abdomen:ts_custom_conc': 'Suspektní enteritida.',
            'abdomen:ostatni_custom_conc': 'Doporučena klinická korelace.'
        }
    },

    /* ═════════════ SKELET, MĚKKÉ TKÁNĚ ═════════════ */
    {
        id: 'skeleton-lesion-pet',
        exam: 'petct_fdg_trup',
        instances: { skeleton_lesion_main: ['1'] },
        buttons: {
            'skeleton:l_1_c_vice': true,
            'skeleton:l_1_k_les': 'sklerotické',
            'skeleton:l_1_p_t_obr': 'T10',
            'skeleton:l_1_p_cely': true,
            'skeleton:l_1_met_act': 'vysoká',
            'skeleton:l_1_ct_nat': 'nativ hyper',
            'skeleton:l_1_ct_syc': 'hyper',
            'skeleton:l_1_e_meta': 'meta!'
        },
        fields: { 'skeleton:l_1_met_size': '28', 'skeleton:l_1_met_suv': '11.0' }
    },
    {
        id: 'skeleton-obecne',
        exam: 'petct_fdg_trup',
        buttons: {
            'skeleton:sk_md_akt': '++',
            'skeleton:sk_md_enost': 'více',
            'skeleton:sk_md_neakt': '+',
            'skeleton:sk_dg_kyc_l': true,
            'skeleton:sk_dg_ac_r': true,
            'skeleton:sk_in_kyc_r': 'TEP',
            'skeleton:sk_sy_bech': '+',
            'skeleton:sk_sy_dish': '+'
        }
    },
    {
        id: 'soft-tkane-lesion',
        exam: 'petct_fdg_trup',
        instances: { soft_lesion_main: ['1'] },
        buttons: {
            'soft:l_1_c_soli': true,
            'soft:l_1_k_les': 'nodul',
            'soft:l_1_p_hkk_r': '+',
            'soft:l_1_v_intra': true,
            'soft:l_1_met_act': 'zvýšená',
            'soft:l_1_e_m': 'maligní?'
        },
        fields: { 'soft:l_1_met_size': '19', 'soft:l_1_met_suv': '4.8' }
    },
    {
        id: 'soft-tkane-obecne',
        exam: 'petct_fdg_trup',
        buttons: { 'soft:st_dif': true, 'soft:st_parav_l': '+' },
        custom: { 'soft:st_custom_desc': 'difuzní atrofie svalstva pánve a DKK' },
        fields: { 'soft:st_custom_conc': 'Sarkopenie.' }
    },

    /* ═════════════ MOZEK ═════════════ */
    {
        id: 'brain-lesion-mr',
        exam: 'mr_mozek',
        instances: { brain_lesion_main: ['1'] },
        buttons: {
            'brain:bl_1_c_soli': true,
            'brain:bl_1_k_les': true,
            'brain:bl_1_p_fro_r': '+',
            'brain:bl_1_p_bg_l': '+',
            'brain:bl_1_mr_t1': 'T1 hypo',
            'brain:bl_1_mr_t2': 'T2 hyper',
            'brain:bl_1_mr_dwi': 'DWI +',
            'brain:bl_1_mr_t1c': 'sycení',
            'brain:bl_1_met_act': 'zvýšená',
            'brain:bl_1_e_t': 'tumor+',
            'brain:bl_1_edem': 'edém +',
            'brain:bl_1_mshift': 'midshift →',
            'brain:bl_1_hern': 'subfalcinní'
        },
        fields: { 'brain:bl_1_met_size': '15', 'brain:bl_1_mshift_mm': '4' }
    },
    {
        id: 'brain-hemo-ct',
        exam: 'ct_mozek',
        instances: { brain_hemo_main: ['1'] },
        buttons: {
            'brain:bh_1_c_soli': true,
            'brain:bh_1_k_lez': true,
            'brain:bh_1_p_fro_r': '+',
            'brain:bh_1_sp_subd': '+',
            'brain:bh_1_ct_ak': true,
            'brain:bh_1_e_sdh': true,
            'brain:bh_1_edem': 'edém ++'
        },
        fields: { 'brain:bh_1_met_size': '12' }
    },
    {
        id: 'brain-hemo-lem-tekutiny',
        exam: 'ct_mozek',
        instances: { brain_hemo_main: ['1'] },
        buttons: {
            'brain:bh_1_c_dve': true,
            'brain:bh_1_k_lem': true,
            'brain:bh_1_p_par_l': '+',
            'brain:bh_1_sp_subd': '+'
        }
    },
    {
        id: 'brain-wml',
        exam: 'mr_mozek',
        buttons: {
            'brain:br_faz': '3',
            'brain:br_lak': 'BG',
            'brain:br_lak_lat': 'bilat.',
            'brain:br_pvs': 'CSO',
            'brain:br_pvs_lat': 'R',
            'brain:br_gli': '++',
            'brain:br_gli_loc': 'F-B',
            'brain:br_dem_peri': '1+',
            'brain:br_dem_cc': 'více-'
        },
        custom: { 'brain:br_wml_custom_conc': 'Dif. dg. zahrnuje i vaskulitidu.' }
    },
    {
        id: 'brain-atrofie-komory',
        exam: 'mr_mozek',
        buttons: {
            'brain:br_gca': '2',
            'brain:br_mta': '3',
            'brain:br_koedam': '2',
            'brain:br_sa_prostory': 'rozšířené',
            'brain:br_kom_sire': '++',
            'brain:br_hydro': 'NPH'
        }
    },
    {
        id: 'brain-cpa-sella',
        exam: 'mr_mozek',
        buttons: {
            'brain:br_cpa_exp_r': 'schwanom',
            'brain:br_cpa_exp_l': 'cysta',
            'brain:br_cpa_kon_l': 'II',
            'brain:br_cpa_kon5_r': '++',
            'brain:br_sella': 'partial',
            'brain:br_epi': 'cysta [field:field_mm:mm]'
        },
        fields: { 'brain:br_epi_mm': '6' }
    },
    {
        id: 'brain-cevy-orbity',
        exam: 'mr_mozek',
        buttons: {
            'brain:br_ves_pat': 'aneurysma',
            'brain:br_ves_mca_r': 'M1 MCA',
            'brain:br_ves_acoa': true,
            'brain:br_ves_ba': true,
            'brain:br_var_a1_l': '+',
            'brain:br_var_fetal_r': 'C',
            'brain:br_orb_exo_r': '+',
            'brain:br_orb_iol_l': '+',
            'brain:br_orb_slz_zvet_r': '+'
        },
        fields: { 'brain:br_ves_size': '4' }
    },
    {
        id: 'brain-siny-ucho',
        exam: 'ct_mozek',
        buttons: {
            'brain:sinus_front_r': 'cysta',
            'brain:sinus_maxil_l': 'tekutina',
            'brain:ucho_stred_r': 'tekutina',
            'brain:ucho_mast_l': 'zastření'
        },
        fields: { 'brain:sinus_custom_conc': 'Kontrola ORL.' }
    },
    {
        id: 'angio-cevy',
        exam: 'mr_angio_mozku',
        buttons: {
            'br_angiography:angio_ves_pat': 'aneurysma',
            'br_angiography:angio_ves_mca_l': 'M1 MCA',
            'br_angiography:angio_ves_ica_r': 'C6 ICA',
            'br_angiography:angio_ves_acoa': true,
            'br_angiography:angio_ves_pica_l': true,
            'br_angiography:angio_var_va_r': '+',
            'br_angiography:angio_var_fetal_l': 'C'
        }
    },

    /* ═════════════ PÁTEŘ (L / C / T) ═════════════ */
    {
        id: 'spine-ls-normal',
        exam: 'mr_ls_patere',
        buttons: {
            'ls_spine:lsp_lordosis': 'přiměřená',
            'ls_spine:lsp_lstv': 'není',
            'ls_spine:lsp_op': 'ne'
        }
    },
    {
        id: 'spine-ls-degen',
        exam: 'mr_ls_patere',
        buttons: {
            'ls_spine:l4_5_degen': 'DDD II',
            'ls_spine:l4_5_protrusion': 'protruze',
            'ls_spine:l4_5_modic': 'Modic I',
            'ls_spine:l4_5_p_r': '2',
            'ls_spine:l4_5_f_r': '1',
            'ls_spine:l4_5_arthro': 'II',
            'ls_spine:l5_s1_degen': 'DDD III',
            'ls_spine:l5_s1_protrusion': 'herniace',
            'ls_spine:l5_s1_p_r': '3',
            'ls_spine:l5_s1_c': '1',
            'ls_spine:l5_shift': 'ventr',
            'ls_spine:l5_shape': 'schmorl',
            'ls_spine:lsp_lordosis': 'napřímená',
            'ls_spine:lsp_lstv': 'L5',
            'ls_spine:lsp_axis': '('
        }
    },
    {
        id: 'spine-ls-stenoza',
        exam: 'mr_ls_patere',
        buttons: {
            'ls_spine:l4_5_degen': 'DDD III',
            'ls_spine:l4_5_protrusion': 'kombinace',
            'ls_spine:l4_5_c': '3',
            'ls_spine:l4_5_f_l': '3',
            'ls_spine:l4_5_f_r': '3',
            'ls_spine:l4_5_p_l': '3',
            'ls_spine:l4_5_p_r': '3',
            'ls_spine:l4_5_arthro': 'III',
            'ls_spine:lsp_lordosis': 'kyfotizace',
            'ls_spine:lsp_op': 'ano',
            'ls_spine:lsp_lstv': 'S1'
        },
        fields: { 'ls_spine:lsp_ost_custom_conc': 'Stenoza kanálu L4/5.' }
    },
    {
        id: 'spine-ls-expanze',
        exam: 'mr_ls_patere',
        buttons: {
            'ls_spine:exp_segment': 'L4/5',
            'ls_spine:exp_side': 'R',
            'ls_spine:exp_type': 'ID-meningeom'
        }
    },
    {
        id: 'spine-c-degen',
        exam: 'mr_c_patere',
        buttons: {
            'c_spine:c5_6_degen': 'DDD II',
            'c_spine:c5_6_protrusion': 'protruze',
            'c_spine:c5_6_p_r': '2',
            'c_spine:c5_6_modic': 'Modic I',
            'c_spine:c6_7_degen': 'DDD III',
            'c_spine:c6_7_protrusion': 'herniace',
            'c_spine:c6_7_p_r': '3',
            'c_spine:c6_7_c': '2',
            'c_spine:c3_shape': 'schmorl',
            'c_spine:cp_axis': ')',
            'c_spine:cp_lordosis': 'napřímená'
        }
    },
    {
        id: 'spine-c-myelopatie',
        exam: 'mr_c_patere',
        buttons: {
            'c_spine:c4_5_degen': 'DDD III',
            'c_spine:c4_5_protrusion': 'herniace',
            'c_spine:c4_5_c': '3',
            'c_spine:c4_5_p_r': '3',
            'c_spine:myelopatie': 'myelopatie',
            'c_spine:myelo_level': 'C5',
            'c_spine:cp_op': 'ano'
        }
    },
    {
        id: 'spine-t-degen',
        exam: 'mr_t_patere',
        buttons: {
            't_spine:t8_9_degen': 'DDD II',
            't_spine:t8_9_protrusion': 'protruze',
            't_spine:t8_9_p_r': '2',
            't_spine:t7_8_degen': 'DDD III',
            't_spine:t7_8_protrusion': 'herniace',
            't_spine:t7_8_c': '2',
            't_spine:t9_shift': 'ventr',
            't_spine:t9_shape': 'klínovitá',
            't_spine:thp_kyphosis': 'zvýrazněná'
        }
    },
    {
        id: 'spine-c-shift',
        exam: 'mr_c_patere',
        buttons: {
            'c_spine:c3_shift': 'ventr',
            'c_spine:c5_6_degen': 'DDD II'
        },
        fields: { 'c_spine:c3_shift_mm': '3' }
    },
    {
        id: 'spine-t-stenoza',
        exam: 'mr_t_patere',
        buttons: {
            't_spine:t8_9_degen': 'DDD III',
            't_spine:t8_9_c': '3',
            't_spine:t7_8_c': '2'
        }
    },
    {
        id: 'spine-ct-ls-degen',
        exam: 'ct_ls_patere',
        buttons: {
            'ls_spine:l4_5_degen': 'DDD II',
            'ls_spine:l4_5_protrusion': 'bulging',
            'ls_spine:l4_5_arthro': 'II',
            'ls_spine:l5_s1_degen': 'DDD III',
            'ls_spine:lsp_lordosis': 'napřímená',
            'ls_spine:lsp_lstv': 'L5'
        }
    },
    {
        id: 'spine-naf-normal',
        exam: 'petct_naf_pater'
    },

    /* ═════════════ MSK: koleno ═════════════ */
    { id: 'knee-normal', exam: 'mr_kolene' },
    {
        id: 'knee-joint',
        exam: 'mr_kolene',
        buttons: {
            'knee:kn_napln': '+++',
            'knee:kn_baker': '++',
            'knee:kn_synov': 'PVS',
            'knee:kn_teliska': '+ [field:field_text:loc:kde...]'
        },
        fields: {
            'knee:kn_teliska_loc': 'dorzálně v Recessus suprapatellaris',
            'knee:kn_joint_custom_desc': 'Bez dalších změn',
            'knee:kn_joint_custom_conc': 'Stav po synovektomii'
        }
    },
    {
        id: 'knee-menisk',
        exam: 'mr_kolene',
        buttons: {
            'knee:kn_lm_base': 'ruptura',
            'knee:kn_lm_typ': 'bucket-handle',
            'knee:kn_lm_loc': 'zadní roh',
            'knee:kn_lm_cyst': 'střední',
            'knee:kn_lm_extr': '> 50 %',
            'knee:kn_lm_oper': 'parciální',
            'knee:kn_mm_base': 'degenerace',
            'knee:kn_mm_loc': 'tělo',
            'knee:kn_mm_cyst': 'malá'
        },
        fields: { 'knee:kn_lm_custom_conc': 'Susp. na recidivu léze LM' }
    },
    {
        id: 'knee-chondro',
        exam: 'mr_kolene',
        buttons: {
            'knee:kn_mfc_chr_gr': 'GR III',
            'knee:kn_mfc_chr_lez': 'Defekt',
            'knee:kn_mfc_chr_edem': 'edém ++',
            'knee:kn_mfc_sub_bml': 'BML ++',
            'knee:kn_mfc_sub_ocd': 'OCD III',
            'knee:kn_mtc_chr_gr': 'GR II',
            'knee:kn_mtc_chr_lez': 'Fisura',
            'knee:kn_lfc_sub_sifk': 'SIFK +',
            'knee:kn_lfc_frac': 'impakční',
            'knee:kn_ltc_chr_gr': 'GR I',
            'knee:kn_lat_shared_ost': 'I',
            'knee:kn_med_shared_ost': 'II',
            'knee:kn_fp_pat_chp': 'GR II',
            'knee:kn_fp_pat_lez': 'Fisura',
            'knee:kn_fp_fem_chp': 'GR I',
            'knee:kn_fp_fem_edem': 'edém +',
            'knee:kn_fp_art': 'II'
        }
    },
    {
        id: 'knee-acl-plastika',
        exam: 'mr_kolene',
        buttons: {
            'knee:kn_acl_plast': 'kompl. rupt.',
            'knee:kn_acl_vzhled': 'impingement',
            'knee:kn_acl_tunel': 'širší F',
            'knee:kn_acl_kyklop': '+'
        },
        fields: { 'knee:kn_acl_custom_conc': 'Stav po rekonstrukci ACL' }
    },
    {
        id: 'knee-acl-nativ',
        exam: 'mr_kolene',
        buttons: {
            'knee:kn_acl_rupt': 'kompletní',
            'knee:kn_acl_bml': '+ fr. F+T',
            'knee:kn_acl_morf': 'mukoid. deg.',
            'knee:kn_pcl_rupt': 'parciální',
            'knee:kn_pcl_bml': 'BML +',
            'knee:kn_pcl_morf': 'cysta'
        }
    },
    {
        id: 'knee-patella-soft',
        exam: 'mr_kolene',
        buttons: {
            'knee:kn_pat_wib': 'II',
            'knee:kn_pat_bip': '+',
            'knee:kn_pat_tilt': '+',
            'knee:kn_pat_lux': '+ fr',
            'knee:kn_ant_jump': 'S-L-J',
            'knee:kn_ant_osg': 'aktivní',
            'knee:kn_ant_plica': '+',
            'knee:kn_ant_hoffa': '+',
            'knee:kn_ant_imp': '+',
            'knee:kn_st_quad': 'kompl. ruptura',
            'knee:kn_st_pes': 'tendinopatie',
            'knee:kn_st_itb': 'friction syndrom',
            'knee:kn_st_plc': 'kompl. léze',
            'knee:kn_st_pmc': 'parc. léze',
            'knee:kn_m_gastro': '+',
            'knee:kn_b_prepat': '+',
            'knee:kn_g_tf': '+',
            'knee:kn_lcl_rupt': 'kompletní',
            'knee:kn_lcl_loc': 'femorálně',
            'knee:kn_mcl_rupt': 'po starší',
            'knee:kn_bn_typ': 'Enchondrom',
            'knee:kn_bn_loc': 'femur',
            'knee:kn_bn_edema': 's edémem'
        },
        fields: { 'knee:kn_pat_tilt_deg': '20', 'knee:kn_bn_size': '12' }
    },

    /* ═════════════ MSK: rameno ═════════════ */
    { id: 'shoulder-normal', exam: 'mr_ramene' },
    {
        id: 'shoulder-cuff',
        exam: 'mr_ramene',
        buttons: {
            'shoulder:sh_ssp_stav': 'gr. II',
            'shoulder:sh_ssp_retr': '++',
            'shoulder:sh_ssp_rozmer': '1-3 cm',
            'shoulder:sh_ssp_plocha': 'A',
            'shoulder:sh_ssp_kalcif': 'HADD',
            'shoulder:sh_ssp_atrofie': '+',
            'shoulder:sh_isp_stav': 'kompletní',
            'shoulder:sh_isp_retr': '+++',
            'shoulder:sh_ssc_stav': 'tendinóza',
            'shoulder:sh_lhb_stav': 'gr. III',
            'shoulder:sh_lhb_poloha': 'subluxace',
            'shoulder:sh_lhb_sulkus': 'tekutina'
        }
    },
    {
        id: 'shoulder-ac-gh',
        exam: 'mr_ramene',
        buttons: {
            'shoulder:sh_ac_art': 'střední',
            'shoulder:sh_ac_edem': '++',
            'shoulder:sh_ac_impingement': 'subakromiální',
            'shoulder:sh_ac_os': 'přítomno',
            'shoulder:sh_ac_lux': 'Tossy II',
            'shoulder:sh_gh_napln': '++',
            'shoulder:sh_gh_synov': '++',
            'shoulder:sh_gh_sasd': 'bursitida',
            'shoulder:sh_gh_subcor': 'tekutina'
        },
        fields: { 'shoulder:sh_ac_custom_conc': 'Impingement syndrom' }
    },
    {
        id: 'shoulder-labrum',
        exam: 'mr_ramene',
        buttons: {
            'shoulder:sh_lab_sup': 'SLAP II',
            'shoulder:sh_lab_ant': 'Bankart',
            'shoulder:sh_lab_pos': 'Reverse Bankart',
            'shoulder:sh_lab_ighl': 'léze',
            'shoulder:sh_lab_cysta': 'spinoglenoidní',
            'shoulder:sh_bn_hlav': 'Hill-Sachs',
            'shoulder:sh_bn_glen': 'Bony Bankart',
            'shoulder:sh_bn_chr': 'Gr. 3',
            'shoulder:sh_bn_lesion': 'Geoda',
            'shoulder:sh_tm_stav': 'parc. ruptura',
            'shoulder:sh_tm_gout': '+'
        },
        fields: { 'shoulder:sh_lab_custom_desc': 'St.p. luxaci ramene' }
    },
    {
        id: 'shoulder-custom',
        exam: 'mr_ramene',
        buttons: { 'shoulder:sh_rm_add_custom': true },
        fields: {
            'shoulder:sh_rm_custom_desc': 'Svaly bez atrofie',
            'shoulder:sh_rm_custom_conc': 'Bez léze rotátorové manžety',
            'shoulder:sh_lhb_custom_conc': 'LHB v sulku'
        }
    },

    /* ═════════════ MSK: hlezno ═════════════ */
    { id: 'ankle-normal', exam: 'mr_hlezna' },
    {
        id: 'ankle-tendons',
        exam: 'mr_hlezna',
        buttons: {
            'ankle:ank_ach_stav': 'kompletní',
            'ankle:ank_ach_bur': 'obě',
            'ankle:ank_ach_peri': '+',
            'ankle:ank_at_ta': 'tenosynovitida',
            'ankle:ank_at_ehl': 'tendinóza',
            'ankle:ank_at_edl': 'parc. ruptura',
            'ankle:ank_lt_pb': 'tendinóza',
            'ankle:ank_lt_pl': 'parc. ruptura',
            'ankle:ank_lt_ret': 'edém/léze',
            'ankle:ank_mt_fdl': 'tenosynovitida',
            'ankle:ank_mt_fhl': 'kompletní',
            'ankle:ank_mt_tp': 'tendinóza'
        }
    },
    {
        id: 'ankle-ligaments',
        exam: 'mr_hlezna',
        buttons: {
            'ankle:ank_ll_atfl': 'kompletní (III)',
            'ankle:ank_ll_cfl': 'parc. léze (II)',
            'ankle:ank_ll_ptfl': 'distenze (I)',
            'ankle:ank_ll_aitfl': 'kompletní',
            'ankle:ank_ml_deep': 'parc. léze (II)',
            'ankle:ank_ml_sup': 'distenze (I)'
        }
    },
    {
        id: 'ankle-bones',
        exam: 'mr_hlezna',
        buttons: {
            'ankle:ank_tal_ocd': 'st. III',
            'ankle:ank_tal_edema': '++',
            'ankle:ank_tal_frac': 'intraart.',
            'ankle:ank_tal_loc': 'mediálně',
            'ankle:ank_calc_frac': 'nedislok.',
            'ankle:ank_calc_edema': '+',
            'ankle:ank_calc_haglund': '+',
            'ankle:ank_calc_calcar': '+',
            'ankle:ank_nav_frac': 'dislok.',
            'ankle:ank_nav_edema': '+',
            'ankle:ank_cub_frac': 'intraart.',
            'ankle:ank_cub_edema': '+',
            'ankle:ank_jt_fluid': 'výrazná',
            'ankle:ank_jt_loose': 'přítomna',
            'ankle:ank_jt_synov': '++',
            'ankle:ank_tc_art': 'střední',
            'ankle:ank_tc_chr': 'Gr. 3',
            'ankle:ank_pto_imp': 'symptom. os trigonum',
            'ankle:ank_pto_pf': 'fasciitida'
        }
    },

    /* ═════════════ MSK: zápěstí, TMK, SIS ═════════════ */
    { id: 'wrist-normal', exam: 'mr_zapesti' },
    {
        id: 'wrist-patho',
        exam: 'mr_zapesti',
        buttons: {
            'wrist:wri_jt_fluid': 'střední',
            'wrist:wri_jt_loose': true,
            'wrist:wri_jt_syn': true,
            'wrist:wri_jt_ganglion': true,
            'wrist:wri_sn_cts': true,
            'wrist:wri_sn_dq': true,
            'wrist:wri_sn_ecu': true,
            'wrist:wri_sn_flex': true,
            'wrist:wri_lig_sl': 'ruptura (DISI+)',
            'wrist:wri_lig_lt': 'parciální',
            'wrist:wri_lig_druj': 'instabilita',
            'wrist:wri_tfcc_disk': 'centr. perforace',
            'wrist:wri_tfcc_uc': 'UL+UT',
            'wrist:wri_tfcc_uln': 'parciální',
            'wrist:wri_tfcc_add': 'edém styloidu',
            'wrist:wri_bn_kienbock': 'časný',
            'wrist:wri_bn_scaphoid': 'fraktura pasu',
            'wrist:wri_bn_edema': true,
            'wrist:wri_bn_uimp': true
        }
    },
    { id: 'tmk-normal', exam: 'mr_tmk' },
    {
        id: 'tmk-patho',
        exam: 'mr_tmk',
        buttons: {
            'tmk:tmk_l_cart': 'defekt',
            'tmk:tmk_l_eff': '↑↑',
            'tmk:tmk_l_syn': true,
            'tmk:tmk_l_boneEdema': true,
            'tmk:tmk_l_caps': true,
            'tmk:tmk_l_perfor': true,
            'tmk:tmk_l_retroEdema': true,
            'tmk:tmk_l_discPos': 'ant. dislokace',
            'tmk:tmk_l_discMorph': 'ztenčený',
            'tmk:tmk_l_reduction': 's redukcí',
            'tmk:tmk_l_translation': 'omezená',
            'tmk:tmk_l_mobility': 'hypomobilita',
            'tmk:tmk_l_condContour': 'osteofytická',
            'tmk:tmk_l_arthr': 'mírná art.',
            'tmk:tmk_r_cart': 'chondromalacie',
            'tmk:tmk_r_discPos': 'post. dislokace',
            'tmk:tmk_r_eff': '↑',
            'tmk:tmk_r_arthr': 'těžká art.',
            'tmk:tmk_r_ankyl': 'fibrotická?'
        }
    },
    { id: 'sis-normal', exam: 'mr_sis' },
    {
        id: 'sis-sakroiliitida',
        exam: 'mr_sis',
        buttons: {
            'sis:sis_r_edema': '++',
            'sis:sis_r_edema_bone': 'obě strany',
            'sis:sis_r_edema_loc': 'difuzně',
            'sis:sis_r_erosions': 'vícečetné',
            'sis:sis_r_sclerosis': true,
            'sis:sis_r_fat': true,
            'sis:sis_r_osteophytes': true,
            'sis:sis_r_space': 'zúžena',
            'sis:sis_l_edema': '+',
            'sis:sis_l_space': 'norma'
        },
        fields: { 'sis:sis_r_edema_size': '8' }
    },

    /* ═════════════ přepínače nastavení ═════════════ */
    {
        id: 'opt-suv-word-recist',
        exam: 'petct_psma_trup',
        past: '2026-01-15',
        settings: { suvWord: true, recist: true },
        instances: { thorax_lesion_main: ['1'] },
        buttons: {
            'thorax:tl_1_c_soli': true,
            'thorax:tl_1_k_les': true,
            'thorax:tl_1_p_hl_r': 'S1',
            'thorax:tl_1_met_act': 'vysoká',
            'thorax:tl_1_e_meta': 'meta!'
        },
        fields: {
            'thorax:tl_1_met_size': '30',
            'thorax:tl_1_met_size_old': '18',
            'thorax:tl_1_met_suv': '12.5',
            'thorax:tl_1_met_suv_old': '7.0',
            suv_parotid: '20.0'
        }
    },
    {
        id: 'opt-opt-text-off',
        exam: 'petct_fdg_trup',
        settings: { optText: false },
        instances: { neck_lesion_main: ['1'] },
        buttons: {
            'neck:l_1_c_soli': true,
            'neck:l_1_k_les': true,
            'neck:l_1_p_patro_r': '+',
            'neck:l_1_met_act': 'zvýšená',
            'neck:l_1_e_meta': 'meta!'
        },
        fields: { 'neck:l_1_met_size': '18' }
    },
    {
        id: 'opt-grammar-merging-off',
        exam: 'ct_bricho',
        settings: { grammarMerging: false },
        buttons: {
            'abdomen:ja_cys_r': '1',
            'abdomen:ja_cys_l': '1',
            'abdomen:ja_hem_r': '1',
            'abdomen:ja_hem_l': '1'
        }
    },

    /* ═════════════ PROSTATA (mr_prostata) ═════════════ */
    { id: 'prostata-normal', exam: 'mr_prostata' },
    {
        /* Léze v periferní zóně: DWI 4-5 + velikost >= 15 mm → PI-RADS 5, T3a. */
        id: 'prostata-pirads5-pz',
        exam: 'mr_prostata',
        instances: { prostate_lesion_main: ['1'] },
        rawStates: {
            'prostate:pl_1_loc_BASE-R-PZa': true,
            'prostate:pl_1_loc_BASE-R-PZp': true
        },
        custom: { 'prostate:pl_1_loc_order': '["BASE-R-PZa","BASE-R-PZp"]' },
        buttons: {
            'prostate:pl_1_c_soli': true,
            'prostate:pl_1_k_loz': true,
            'prostate:pl_1_t2': 'T2 score 4-5',
            'prostate:pl_1_dwi': 'DWI score 4-5',
            'prostate:pl_1_ce': 'kontrast +',
            'prostate:pl_1_inv': 'kapsula'
        },
        fields: { 'prostate:pl_1_met_size': '18' }
    },
    {
        /* Léze v tranzitorní zóně: T2 3 + DWI 3 → PI-RADS 3 (bez sycení). */
        id: 'prostata-tz-pirads3',
        exam: 'mr_prostata',
        instances: { prostate_lesion_main: ['1'] },
        rawStates: { 'prostate:pl_1_loc_MID-L-TZp': true },
        custom: { 'prostate:pl_1_loc_order': '["MID-L-TZp"]' },
        buttons: {
            'prostate:pl_1_c_soli': true,
            'prostate:pl_1_k_nod': true,
            'prostate:pl_1_t2': 'T2 score 3',
            'prostate:pl_1_dwi': 'DWI score 3',
            'prostate:pl_1_ce': 'kontrast -'
        },
        fields: { 'prostate:pl_1_met_size': '11' }
    },
    {
        id: 'prostata-rape-recidiva',
        exam: 'mr_prostata',
        buttons: {
            'prostate:pr_op': 'RAPE',
            'prostate:pr_rec': 'akumulace',
            'prostate:pr_sem_fill': 'snížená'
        }
    },
    {
        id: 'prostata-turp-hyperplazie',
        exam: 'mr_prostata',
        buttons: {
            'prostate:pr_op': 'TURP',
            'prostate:pr_hyp': 'pokročilá',
            'prostate:pr_hem': '++'
        },
        fields: { 'prostate:pr_size': '45x35x40' }
    },
    {
        /* Léze + pozitivní obturátorové uzliny → regionální N1 (cTNM). */
        id: 'prostata-ln-n1',
        exam: 'mr_prostata',
        instances: { prostate_lesion_main: ['1'], prostate_lymphnode_main: ['1'] },
        rawStates: { 'prostate:pl_1_loc_BASE-R-PZp': true },
        custom: { 'prostate:pl_1_loc_order': '["BASE-R-PZp"]' },
        buttons: {
            'prostate:pl_1_c_soli': true,
            'prostate:pl_1_k_loz': true,
            'prostate:pl_1_dwi': 'DWI score 4-5',
            'prostate:prln_1_c_vice': true,
            'prostate:prln_1_k_uzl': true,
            'prostate:prln_1_p_obt_r': true,
            'prostate:prln_1_p_obt_l': true,
            'prostate:prln_1_met_act': 'zvýšená',
            'prostate:prln_1_e_meta': 'meta!'
        },
        fields: { 'prostate:pl_1_met_size': '14', 'prostate:prln_1_met_size': '16' }
    },
    {
        /* PSMA-PET/MR: prefix TNM "mi", uzliny popsané jako hyperakumulující. */
        id: 'petmr-psma-prostata',
        exam: 'petmr_psma_prostata',
        instances: { prostate_lesion_main: ['1'], prostate_lymphnode_main: ['1'] },
        rawStates: { 'prostate:pl_1_loc_AP-L-PZa': true },
        custom: { 'prostate:pl_1_loc_order': '["AP-L-PZa"]' },
        buttons: {
            'prostate:pl_1_c_soli': true,
            'prostate:pl_1_k_loz': true,
            'prostate:pl_1_dwi': 'DWI score 4-5',
            'prostate:pl_1_inv': 'váčky',
            'prostate:prln_1_c_vice': true,
            'prostate:prln_1_k_uzl': true,
            'prostate:prln_1_p_mez_r': true,
            'prostate:prln_1_met_act': 'zvýšená',
            'prostate:prln_1_e_meta': 'meta+'
        },
        fields: { 'prostate:pl_1_met_size': '17', 'prostate:prln_1_met_size': '12', 'prostate:prln_1_met_suv': '9.4' }
    },

    /* ═════════════ REKTUM (mr_rekta) ═════════════ */
    { id: 'rekta-normal', exam: 'mr_rekta' },
    {
        /* Karcinom 6 cm od AR úhlu, extramurální invaze 5-15 mm → T3c, MRF+, EMVI+. */
        id: 'rekta-karcinom-t3c',
        exam: 'mr_rekta',
        instances: { rectum_lesion_main: ['1'] },
        buttons: {
            'rectum:rt_1_c_soli': true,
            'rectum:rt_1_k_les': true,
            'rectum:rt_1_inv': '5-15 mm',
            'rectum:rt_1_mrf': '0',
            'rectum:rt_1_emvi': '+',
            'rectum:rt_1_td': '+',
            'rectum:rt_1_dno': '+',
            'rectum:rt_1_mr_t2': 'T2 hyper',
            'rectum:rt_1_mr_dwi': 'DWI +',
            'rectum:rt_1_e_cust_etio': true
        },
        custom: { 'rectum:rt_1_e_cust_etio': 'karcinom!' },
        fields: { 'rectum:rt_1_dist': '6', 'rectum:rt_1_len': '4', 'rectum:rt_1_met_size': '32' }
    },
    {
        /* Po neoadjuvantní terapii: malé reziduum (TRG). */
        id: 'rekta-po-terapii',
        exam: 'mr_rekta',
        instances: { rectum_lesion_main: ['1'] },
        buttons: {
            'rectum:rt_1_c_soli': true,
            'rectum:rt_1_k_les': true,
            'rectum:rt_1_inv': '< 1 mm',
            'rectum:rt_1_mrf': '0',
            'rectum:rt_1_terapie': 'malé reziduum',
            'rectum:rt_1_e_cust_etio': true
        },
        custom: { 'rectum:rt_1_e_cust_etio': 'karcinom!' },
        fields: { 'rectum:rt_1_dist': '8', 'rectum:rt_1_len': '3', 'rectum:rt_1_met_size': '14' }
    },
    {
        /* Stav po amputaci rekta s presakrální fibrózou a chronickou kolekcí. */
        id: 'rekta-amputace',
        exam: 'mr_rekta',
        buttons: {
            'rectum:rt_op': 'amputace',
            'rectum:rt_rad': '+',
            'rectum:rt_inf': '+',
            'rectum:rt_kol': 'chronická',
            'rectum:rt_rec': 'ne'
        }
    },
    {
        /* Pozitivní mezorektální uzlina → závěr s (cN+). */
        id: 'rekta-ln-pozitivni',
        exam: 'mr_rekta',
        instances: { rectum_lymphnode_main: ['1'] },
        buttons: {
            'rectum:rtln_1_c_vice': true,
            'rectum:rtln_1_k_uzl': true,
            'rectum:rtln_1_p_mez_r': true,
            'rectum:rtln_1_met_act': 'zvýšená',
            'rectum:rtln_1_e_meta': 'meta+'
        },
        fields: { 'rectum:rtln_1_met_size': '9' }
    },

    /* ═════════════ CT/MR ANGIOGRAFIE (br_angiography) ═════════════ */
    { id: 'angio-normal', exam: 'ct_angio_mozku' },
    {
        /* Aneuryzma na rozhraní ACoA + variační anatomie (fetální PCA, hypoplázie VA). */
        id: 'angio-aneurysma-variace',
        exam: 'ct_angio_mozku',
        buttons: {
            'br_angiography:angio_ves_pat': 'aneurysma',
            'br_angiography:angio_ves_acoa': true,
            'br_angiography:angio_ves_mca_r': 'MCA',
            'br_angiography:angio_ves_mca_l': 'MCA',
            'br_angiography:angio_var_a1_r': '+',
            'br_angiography:angio_var_va_l': '+',
            'br_angiography:angio_var_fetal_r': 'P',
            'br_angiography:angio_var_fetal_l': 'C'
        },
        fields: { 'br_angiography:angio_ves_size': '5' }
    },
    {
        /* Stenóza karotického sífonu + uzávěr MCA vlevo. */
        id: 'angio-stenoza-uzavet',
        exam: 'mr_angio_mozku',
        buttons: {
            'br_angiography:angio_ves_pat': 'stenóza',
            'br_angiography:angio_ves_ica_r': 'C4 ICA',
            'br_angiography:angio_ves_mca_l': 'M1 MCA',
            'br_angiography:angio_ves_va_r': 'V3 VA'
        },
        fields: { 'br_angiography:angio_ves_size': '1,5' }
    },

    /* ═════════════ PET/FMM mozek (profil + distribuce RF) ═════════════ */
    {
        id: 'fmm-mozek-negativni',
        exam: 'petct_fmm_mozek',
        rawStates: { 'fmm:akum': 1 }
    },
    {
        id: 'fmm-mozek-pozitivni-striatum',
        exam: 'petmr_fmm_mozek',
        rawStates: { 'fmm:akum': 2 }
    },
    {
        /* DOPA-PET/MR mozku: fyziologická distribuce ve striatu. */
        id: 'dopa-mozek-normalni',
        exam: 'petct_dopa_mozek'
    }
];

/* Případy pro režim ?mode=validate: co má (a nemá) hlásit kontrola
   jednoslovných "vět" v Corrections.validate(). */
const VALIDATION_CASES = [
    { id: 'diagnoza-litiasa', text: 'Játra: přiměřené velikosti. Cholecystolitiáza.' },
    { id: 'diagnoza-splenomegalie', text: 'Splenomegalie.' },
    { id: 'diagnoza-nefrolitiaza', text: 'Nefrolitiáza.' },
    { id: 'diagnoza-hypomobilita', text: 'Levý TMK: Omezená translace. Hypomobilita.' },
    { id: 'zkratka-zkracene-slovo', text: 'Achillova šlacha přim. vzhledu a signálu. Chrupavka ventr. femuru bez defektu.' },
    { id: 'zkratka-v-zavorce', text: 'Poúrazové změny (st. p. ruptuře). Bez progrese.' },
    /* Nový blok začínající zkratkou (staging) není "malé písmeno po tečce". */
    { id: 'zkratka-na-zacatku-bloku', text: 'Karcinom rekta s invazí přes kapsulu. cTNM: cT3a, cN0.' },
    /* Kontrolní případ: rozbité spojení vět se musí dál hlásit. */
    { id: 'spojene-vety', text: 'Skafoideum bez poruchy kortikalis. lunatum normálního signálu.' },
    { id: 'zkratka-eponymum', text: 'Obraz suspektní ze spondyloartritidy charakteru m. Bechtěrev. Bilaterální sakroiliitida, entezopatie axiálního skeletu.' },
    { id: 'zkratka-titul', text: 'Kontrola dle prof. Nováka. Bez progrese.' },
    { id: 'vagne-slovo', text: 'Zvětšení.' },
    { id: 'vagne-slovo-2', text: 'HRUDNÍK: Změny.' },
    { id: 'bezna-veta', text: 'Játra: přiměřené velikosti, parenchym homogenní.' }
];
