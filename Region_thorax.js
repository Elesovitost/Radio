/* ═══════════════════════════════════════════════
   ILD / HRCT rozhodovací strom (v2)
═══════════════════════════════════════════════ */
const ILD_OUTCOMES = {
    cpfe: {
        report: 'emfyzém/buly v horních lalocích v kombinaci s fibrotickými změnami v dolních lalocích (obraz CPFE)',
        conc: 'Obraz kombinované plicní fibrózy a emfyzému (CPFE). Klinická korelace s kuřáckou anamnézou.',
        recommend: ''
    },
    uip: {
        report: 'subpleurální a bazální retikulace s pravým plástvovatěním (honeycombing) a trakčními bronchiektáziemi bez znaků inkonzistentních s UIP',
        conc: 'Vzorec UIP. Dif. dg.: IPF (nejpravděpodobněji), CTD-ILD (např. RA), méně často fibrotizující HP imitující UIP. Nutná klinicko-laboratorní korelace.',
        recommend: 'Doporučena MDT korelace (revmatologický panel, expozice, léky, kouření).'
    },
    probable_uip: {
        report: 'subpleurální a bazální retikulace s trakčními bronchiektáziemi bez honeycombing a bez znaků inkonzistentních s UIP (probable UIP)',
        conc: 'Vzorec Probable UIP. Dif. dg.: IPF, CTD-ILD, fibrotizující HP, idiopatická fibrotická NSIP.',
        recommend: 'Doporučena MDT korelace. Není-li jasný air-trapping, zvážit HRCT v hlubokém exspiriu; k odlišení dependentní atelektázy sken v prone poloze.'
    },
    fhp: {
        report: 'fibrotické změny s three-density pattern a/nebo kraniokaudální predominancí ve středních/horních polích (kombinace normálního parenchymu, GGO a mozaikové atenuace)',
        conc: 'Vzorec fibrotizující hypersenzitivní pneumonitidy (fHP). Dif. dg.: fHP (ptáci, peří, farmářská plíce), CTD-ILD s postižením malých cest, sarkoidóza st. IV.',
        recommend: 'MDT korelace s důrazem na expoziční anamnézu. Indikovat exspirační HRCT k průkazu air-trappingu.'
    },
    nsip_fib: {
        report: 'fibrotické změny s relativním šetřením bezprostředního subpleurálního prostoru, axiálně podél peribronchovaskulárních svazků, často s GGO (fibrotická NSIP)',
        conc: 'Vzorec fibrotické NSIP. Dif. dg.: sklerodermie/CTD-ILD, idiopatická NSIP, poléková pneumonitida (amiodaron, nitrofurantoin, MTX).',
        recommend: 'Doporučena MDT korelace včetně revmatologického panelu a lékové anamnézy.'
    },
    asbest: {
        report: 'pleurální pláty v kombinaci s bazálními/subpleurálními retikulacemi',
        conc: 'Nález kompatibilní s azbestózou (v.s. historická profesní expozice).',
        recommend: 'Korelace s expoziční anamnézou (průmysl, stavebnictví).'
    },
    indeterminate: {
        report: 'nespecifické jemné retikulace bez jasné distribuce (indeterminate for UIP)',
        conc: 'Vzorec Indeterminate for UIP. Nutná klinicko-patologická korelace.',
        recommend: 'Doporučena MDT diskuse; zvážit další klinické a případně histologické došetření.'
    },
    sarcoid: {
        report: 'perilymfatické uzlíky podél interlobulárních sept, fisur a subpleurálně',
        conc: 'Perilymfatický nodulární vzorec. Dif. dg.: sarkoidóza, silikóza/pneumokonióza, lymphangitis carcinomatosa.',
        recommend: ''
    },
    tib_inf: {
        report: 'centrilobulární uzlíky s obrazem tree-in-bud',
        conc: 'Tree-in-bud: bronchiogenní šíření infekce. Dif. dg.: bakteriální bronchopneumonie/aspirace, NTM/TBC.',
        recommend: 'Korelace s klinikou a mikrobiologií.'
    },
    nfhp_rb: {
        report: 'centrilobulární „fuzzy“ GGO uzlíky bez tree-in-bud',
        conc: 'Centrilobulární GGO uzlíky. Dif. dg.: nefibrotizující HP (nfHP), RB-ILD u kuřáků.',
        recommend: 'Korelace s kuřáctvím a expoziční anamnézou.'
    },
    random_nod: {
        report: 'náhodně (random) distribuované uzlíky zasahující i pleuru',
        conc: 'Random nodulární vzorec. Dif. dg.: hematogenní metastázy, miliární TBC, vzácněji mykotické infekce.',
        recommend: 'Korelace s onkologickou anamnézou a infekčními markery.'
    },
    op: {
        report: 'plošné konsolidace (často peribronchovaskulárně/subpleurálně), migrující charakter, event. reversed halo (atoll) sign',
        conc: 'Vzorec organizující pneumonie (OP). Dif. dg.: sekundární OP (léky, radioterapie, postinfekční), COP, chronická eozinofilní pneumonie.',
        recommend: ''
    },
    ggo_cell: {
        report: 'čisté GGO bez trakčních bronchiektázií (difuzně či se šetřením pleury)',
        conc: 'Celulární/exsudativní vzorec GGO. Dif. dg.: akutní virová pneumonie/ARDS/AE-ILD, nfHP, celulární NSIP, DIP u kuřáků.',
        recommend: 'Korelace s akutností kliniky a imunitním stavem.'
    },
    crazy: {
        report: 'crazy-paving – plošné GGO s výrazně ztluštělými interlobulárními septy',
        conc: 'Crazy-paving. Dif. dg.: oportunní infekce (PJP)/těžké virózy, PAP, mucinózní adenokarcinom/lipoidní pneumonie.',
        recommend: ''
    },
    plch: {
        report: 'nepravidelné bizardní cysty s noduly, predominancí v horních lalocích (u kuřáka)',
        conc: 'Cystický vzorec kompatibilní s plicní Langerhansocelulární histiocytózou (PLCH).',
        recommend: 'Korelace s kuřáckou anamnézou.'
    },
    lam: {
        report: 'uniformní tenkostěnné okrouhlé cysty difuzně ve všech polích',
        conc: 'Cystický vzorec kompatibilní s lymfangioleiomyomatózou (LAM), typicky u žen.',
        recommend: 'Klinická korelace (pohlaví, TSC).'
    },
    lip: {
        report: 'cysty v zónách GGO s perivaskulárním vztahem',
        conc: 'Obraz kompatibilní s LIP (často Sjögrenův sy / HIV).',
        recommend: 'Korelace s autoimunitou a HIV statusem.'
    },
    bhd: {
        report: 'paramediastinální a bazální cysty často lentiformního tvaru',
        conc: 'Distribuce cyst suspektní z Birt-Hogg-Dubé syndromu.',
        recommend: 'Korelace s familiární anamnézou pneumotoraxů / kožními lézemi; zvážit genetické došetření.'
    },
    ila: {
        report: 'nevýrazné retikulace či GGO bez podezření na ILD',
        conc: 'ILA (nefibrotizující intersticiální plicní abnormality) jako náhodný nález.',
        recommend: ''
    }
};

function ildIsOn(examId, localId) {
    return !!Store.buttonStates[`${examId}_thorax_${localId}`];
}

function ildChoice(examId, prefix, options) {
    for (const opt of options) {
        if (ildIsOn(examId, `${prefix}_${opt.id}`)) return opt.id;
    }
    return null;
}

function resolveIldTree(examId) {
    const fib = ildChoice(examId, 'ild_fib', [{ id: 'ano' }, { id: 'ne' }]);
    if (!fib) return null;

    if (fib === 'ano') {
        const cpfe = ildChoice(examId, 'ild_cpfe', [{ id: 'ano' }, { id: 'ne' }]);
        if (!cpfe) return null;
        if (cpfe === 'ano') return ILD_OUTCOMES.cpfe;

        const uipHc = ildChoice(examId, 'ild_uip', [{ id: 'ano' }, { id: 'ne' }]);
        if (!uipHc) return null;
        if (uipHc === 'ano') return ILD_OUTCOMES.uip;

        const prob = ildChoice(examId, 'ild_prob', [{ id: 'ano' }, { id: 'ne' }]);
        if (!prob) return null;
        if (prob === 'ano') return ILD_OUTCOMES.probable_uip;

        const morph = ildChoice(examId, 'ild_morph', [
            { id: 'fhp' }, { id: 'nsip' }, { id: 'asbest' }, { id: 'indet' }
        ]);
        if (!morph) return null;
        if (morph === 'fhp') return ILD_OUTCOMES.fhp;
        if (morph === 'nsip') return ILD_OUTCOMES.nsip_fib;
        if (morph === 'asbest') return ILD_OUTCOMES.asbest;
        if (morph === 'indet') return ILD_OUTCOMES.indeterminate;
        return null;
    }

    const pattern = ildChoice(examId, 'ild_pat', [
        { id: 'nod' }, { id: 'dens' }, { id: 'cyst' }, { id: 'ila' }
    ]);
    if (!pattern) return null;

    if (pattern === 'ila') return ILD_OUTCOMES.ila;

    if (pattern === 'nod') {
        const dist = ildChoice(examId, 'ild_nod', [
            { id: 'peri' }, { id: 'cent' }, { id: 'rand' }
        ]);
        if (!dist) return null;
        if (dist === 'peri') return ILD_OUTCOMES.sarcoid;
        if (dist === 'rand') return ILD_OUTCOMES.random_nod;
        if (dist === 'cent') {
            const tib = ildChoice(examId, 'ild_tib', [{ id: 'ano' }, { id: 'ne' }]);
            if (!tib) return null;
            return tib === 'ano' ? ILD_OUTCOMES.tib_inf : ILD_OUTCOMES.nfhp_rb;
        }
        return null;
    }

    if (pattern === 'dens') {
        const ch = ildChoice(examId, 'ild_dens', [
            { id: 'op' }, { id: 'ggo' }, { id: 'crazy' }
        ]);
        if (!ch) return null;
        if (ch === 'op') return ILD_OUTCOMES.op;
        if (ch === 'ggo') return ILD_OUTCOMES.ggo_cell;
        if (ch === 'crazy') return ILD_OUTCOMES.crazy;
        return null;
    }

    if (pattern === 'cyst') {
        const c = ildChoice(examId, 'ild_cyst', [
            { id: 'plch' }, { id: 'lam' }, { id: 'lip' }, { id: 'bhd' }
        ]);
        if (!c) return null;
        return ILD_OUTCOMES[c] || null;
    }

    return null;
}

function ildStepBlock(helpers, { section, question, exclId, options }) {
    const wrap = el('div', { style: 'width: 100%; margin-bottom: 10px;' });

    if (section) {
        wrap.appendChild(el('div', {
            className: 'label',
            style: 'text-transform: none; font-weight: 700; color: var(--accent-hi); white-space: normal; max-width: 480px; line-height: 1.3; margin: 10px 0 4px 0;',
            textContent: section
        }));
    }

    wrap.appendChild(el('div', {
        className: 'label',
        style: 'text-transform: none; font-weight: 600; color: #c9d1d9; white-space: normal; max-width: 480px; line-height: 1.35; margin: 4px 0 6px 0;',
        textContent: question
    }));

    // A–D se popisem pod sebou; ANO/NE vedle sebe, obojí vlevo.
    const hasDesc = options.some(o => o.desc);
    const rows = hasDesc
        ? options.map(o => [
            { btn: `${exclId}_${o.id}`, id: `${exclId}_${o.id}`, type: 'basic', text: o.label },
            o.desc
        ])
        : [options.map(o => ({ btn: `${exclId}_${o.id}`, id: `${exclId}_${o.id}`, type: 'basic', text: o.label }))];

    wrap.appendChild(helpers.Table1col(`${exclId}_excl`, rows));
    const tbl = wrap.querySelector('table');
    if (tbl) {
        tbl.style.width = '100%';
        tbl.querySelectorAll('td').forEach(td => {
            td.style.textAlign = 'left';
            td.style.verticalAlign = 'top';
            td.style.whiteSpace = 'normal';
            const row = td.querySelector('.row');
            if (row) {
                row.style.justifyContent = 'flex-start';
                row.style.alignItems = 'flex-start';
                row.style.gap = '8px';
                row.style.flexWrap = 'nowrap';
            }
        });
        tbl.querySelectorAll('button.btn').forEach(btn => {
            btn.style.minWidth = hasDesc ? '42px' : '48px';
            btn.style.width = hasDesc ? '42px' : '48px';
            btn.style.flexShrink = '0';
            btn.style.justifyContent = 'center';
        });
        tbl.querySelectorAll('td span').forEach(sp => {
            if (sp.closest('button')) return;
            sp.style.whiteSpace = 'normal';
            sp.style.display = 'inline-block';
            sp.style.lineHeight = '1.35';
            sp.style.color = '#9da5b0';
            sp.style.fontSize = '11px';
            sp.style.maxWidth = '420px';
            sp.style.textAlign = 'left';
        });
    }
    return wrap;
}

function buildIldTreeTable(helpers, examId) {
    const blocks = [];

    blocks.push(ildStepBlock(helpers, {
        section: null,
        question: 'Jsou přítomny známky plicní fibrózy? (Retikulace, trakční bronchiektázie/bronchiolektázie, ztráta objemu plic, plástvovatění/honeycombing)',
        exclId: 'ild_fib',
        options: [{ id: 'ano', label: 'ANO' }, { id: 'ne', label: 'NE' }]
    }));

    const fib = ildChoice(examId, 'ild_fib', [{ id: 'ano' }, { id: 'ne' }]);

    if (fib === 'ano') {
        blocks.push(ildStepBlock(helpers, {
            section: 'Fibrotizující procesy',
            question: 'Je přítomen syndrom CPFE? (Emfyzém/buly v horních lalocích + fibrotické změny v dolních lalocích u kuřáka)',
            exclId: 'ild_cpfe',
            options: [{ id: 'ano', label: 'ANO' }, { id: 'ne', label: 'NE' }]
        }));

        const cpfe = ildChoice(examId, 'ild_cpfe', [{ id: 'ano' }, { id: 'ne' }]);
        if (cpfe === 'ne') {
            blocks.push(ildStepBlock(helpers, {
                section: 'Fibrotizující procesy',
                question: 'Je přítomno pravé plástvovatění (honeycombing) se subpleurální a bazální predominancí BEZ znaků inkonzistentních s UIP (kraniokaudální distribuce, nodulace, výrazné GGO, konsolidace, mozaika, cysty, pleurální pláty)?',
                exclId: 'ild_uip',
                options: [{ id: 'ano', label: 'ANO' }, { id: 'ne', label: 'NE' }]
            }));

            const uip = ildChoice(examId, 'ild_uip', [{ id: 'ano' }, { id: 'ne' }]);
            if (uip === 'ne') {
                blocks.push(ildStepBlock(helpers, {
                    section: 'Fibrotizující bez honeycombingu',
                    question: 'Jsou přítomny retikulace a trakční bronchiektázie v subpleurální a bazální distribuci BEZ znaků inkonzistentních s UIP?',
                    exclId: 'ild_prob',
                    options: [{ id: 'ano', label: 'ANO' }, { id: 'ne', label: 'NE' }]
                }));

                const prob = ildChoice(examId, 'ild_prob', [{ id: 'ano' }, { id: 'ne' }]);
                if (prob === 'ne') {
                    blocks.push(ildStepBlock(helpers, {
                        section: 'Fibrotizující – jiné vzorce / Inkonzistentní s UIP',
                        question: 'Jaká je distribuce a průvodní morfologie?',
                        exclId: 'ild_morph',
                        options: [
                            {
                                id: 'fhp',
                                label: 'A',
                                desc: 'Vzorec tří denzit (Three-density pattern) NEBO kraniokaudální dominance ve středních/horních polích. (Kombinace normálního parenchymu, GGO a mozaikové atenuace/air-trappingu).'
                            },
                            {
                                id: 'nsip',
                                label: 'B',
                                desc: 'Relativní šetření (sparing) bezprostředního subpleurálního prostoru, axiálně podél peribronchovaskulárních svazků, často s GGO.'
                            },
                            {
                                id: 'asbest',
                                label: 'C',
                                desc: 'Pleurální pláty v kombinaci s retikulacemi bazálně/subpleurálně.'
                            },
                            {
                                id: 'indet',
                                label: 'D',
                                desc: 'Nespecifické jemné retikulace bez jasné distribuce.'
                            }
                        ]
                    }));
                }
            }
        }
    } else if (fib === 'ne') {
        blocks.push(ildStepBlock(helpers, {
            section: 'Nefibrotizující procesy',
            question: 'Jaký je dominantní morfologický vzorec?',
            exclId: 'ild_pat',
            options: [
                { id: 'nod', label: 'A', desc: 'Nodulární vzorec.' },
                { id: 'dens', label: 'B', desc: 'Zvýšení denzity (GGO, konsolidace, crazy-paving).' },
                { id: 'cyst', label: 'C', desc: 'Cystický vzorec (dutiny s tenkou stěnou < 2 mm, nesouvisející s emfyzémem).' },
                { id: 'ila', label: 'D', desc: 'Nevýrazné retikulace či GGO bez podezření na ILD.' }
            ]
        }));

        const pat = ildChoice(examId, 'ild_pat', [{ id: 'nod' }, { id: 'dens' }, { id: 'cyst' }, { id: 'ila' }]);
        if (pat === 'nod') {
            blocks.push(ildStepBlock(helpers, {
                section: 'Nodulární vzorec',
                question: 'Jaká je distribuce uzlíků vůči sekundárnímu plicnímu lalůčku a pleuře?',
                exclId: 'ild_nod',
                options: [
                    { id: 'peri', label: 'A', desc: 'Perilymfatická (podél interlobulárních sept, fisur, subpleurálně).' },
                    { id: 'cent', label: 'B', desc: 'Centrilobulární (uzlíky šetří pleuru, > 2 mm od kraje lalůčku).' },
                    { id: 'rand', label: 'C', desc: 'Random / náhodná (uzlíky difuzně, asymetrické, zasahují pleuru bez preference).' }
                ]
            }));
            if (ildChoice(examId, 'ild_nod', [{ id: 'cent' }]) === 'cent') {
                blocks.push(ildStepBlock(helpers, {
                    section: 'Centrilobulární uzlíky',
                    question: 'Je přítomen „tree-in-bud“?',
                    exclId: 'ild_tib',
                    options: [{ id: 'ano', label: 'ANO' }, { id: 'ne', label: 'NE' }]
                }));
            }
        } else if (pat === 'dens') {
            blocks.push(ildStepBlock(helpers, {
                section: 'Zvýšení denzity',
                question: 'Jaký je charakter opacit?',
                exclId: 'ild_dens',
                options: [
                    { id: 'op', label: 'A', desc: 'Plošné konsolidace (často peribronchovaskulárně/subpleurálně), migrující charakter, „reversed halo sign“ (atoll sign).' },
                    { id: 'ggo', label: 'B', desc: 'Čisté GGO bez trakčních bronchiektázií (často difuzně nebo se šetřením pleury).' },
                    { id: 'crazy', label: 'C', desc: 'Crazy-paving (výrazné plošné GGO protkané ztluštělými septy).' }
                ]
            }));
        } else if (pat === 'cyst') {
            blocks.push(ildStepBlock(helpers, {
                section: 'Cystický vzorec',
                question: 'Jaký je tvar, rozložení cyst a fenotyp pacienta?',
                exclId: 'ild_cyst',
                options: [
                    { id: 'plch', label: 'A', desc: 'Nepravidelné, bizardní cysty s noduly, v horních lalocích u kuřáků.' },
                    { id: 'lam', label: 'B', desc: 'Uniformní, pravidelné, tenkostěnné okrouhlé cysty difuzně ve všech polích u žen.' },
                    { id: 'lip', label: 'C', desc: 'Cysty v zónách GGO, úzký vztah k cévám (perivaskulární).' },
                    { id: 'bhd', label: 'D', desc: 'Paramediastinální a bazálně uložené cysty, často čočkovitého (lentiformního) tvaru.' }
                ]
            }));
        }
    }

    const outcome = resolveIldTree(examId);
    if (outcome) {
        blocks.push(el('div', {
            className: 'label',
            style: 'text-transform: none; margin-top: 12px; color: var(--accent-hi); font-weight: 700; white-space: normal; max-width: 480px; line-height: 1.4;',
            textContent: outcome.conc
        }));
        if (outcome.recommend) {
            blocks.push(el('div', {
                className: 'label',
                style: 'text-transform: none; margin-top: 6px; color: #8b949e; white-space: normal; max-width: 480px; line-height: 1.35;',
                textContent: outcome.recommend
            }));
        }
    }

    const table = helpers.TableMain('thorax_ild_main', 'ILD - strom', blocks);
    const headTd = table.querySelector('.tbl-main-head');
    if (headTd) {
        headTd.replaceChildren();
        headTd.appendChild(el('div', {
            style: 'display: flex; align-items: center; justify-content: center; position: relative; min-height: 22px;'
        }, [
            el('span', { textContent: 'ILD - strom' }),
            el('button', {
                className: 'btn exam-tab-close',
                style: 'position: absolute; right: 0; top: 50%; transform: translateY(-50%); min-width: 22px; padding: 0 6px;',
                textContent: '×',
                title: 'Zavřít',
                'data-action': 'open-table',
                'data-table': 'thorax_plice_main'
            })
        ]));
    }
    return table;
}

const RegionThorax = {
        title: 'Hrudník',
        layout: (helpers) => {
            let layoutNodes = [];

            const lesInsts = Store.instances?.['thorax_lesion_main'] || [];
            lesInsts.forEach((instId, idx) => {
                const p = `tl_${instId}`;
                layoutNodes.push(
                    helpers.LesionMain(`thorax_lesion_main__${instId}`, `Léze (${idx + 1})`, [
                        ...LESIONS_DEFINITION.getLesionRowsPre(helpers, p, 'konsolidace'),
                        helpers.Table3colRCL(`${p}_r3`, 'Lokalizace', [
                            [ { btn: `${p}_p_pulm_r`, states: ['0', '+'] }, 'plíce', { btn: `${p}_p_pulm_l`, states: ['0', '+'] } ],
                            [ { btn: `${p}_p_hl_r`, states: ['0', '+', 'S1', 'S2', 'S3'] }, 'horní lalok', { btn: `${p}_p_hl_l`, states: ['0', '+', 'S1', 'S2', 'S3'] } ],
                            [ { btn: `${p}_p_sl_r`, states: ['0', '+', 'S4', 'S5'] }, 'střední lalok / lingula', { btn: `${p}_p_sl_l`, states: ['0', '+', 'S4', 'S5'] } ],
                            [ { btn: `${p}_p_dl_r`, states: ['0', '+',  'S6', 'S7', 'S8', 'S9', 'S10'] }, 'dolní lalok', { btn: `${p}_p_dl_l`, states: ['0', '+', 'S6', 'S7', 'S8', 'S9', 'S10'] } ],
                            [ { btn: `${p}_p_pl_r`, states: ['0', '+'] }, 'pleura', { btn: `${p}_p_pl_l`, states: ['0', '+'] } ],
                            [ { btn: `${p}_p_sw_r`, states: ['0', '+'] }, 'hrudní stěna', { btn: `${p}_p_sw_l`, states: ['0', '+'] } ],
                            [ { btn: `${p}_p_ma_r`, states: ['0', 'HZK', 'HVK', 'DVK', 'DZK'] }, 'mamma', { btn: `${p}_p_ma_l`, states: ['0', 'HZK', 'HVK', 'DVK', 'DZK'] } ],
                            [ { btn: `${p}_p_th_r`, states: ['0', '+'] }, 'thymus', { btn: `${p}_p_th_l`, states: ['0', '+'] } ],
                            [ '', { btn: `${p}_p_ji`, states: ['jícen', 'horní', 'střední', 'dolní'] }, '' ]
                        ]),
                        ...LESIONS_DEFINITION.getLesionRowsPost(helpers, p, `${p}_met`, `${p}_e`)
                    ])
                );
            });

            const lnInsts = Store.instances?.['thorax_lymphnode_main'] || [];
            lnInsts.forEach((instId, idx) => {
                const p = `tln_${instId}`;
                layoutNodes.push(
                    helpers.LesionMain(`thorax_lymphnode_main__${instId}`, `Lymfadenopatie (${idx + 1})`, [
                        ...LESIONS_DEFINITION.getLymphNodeRowsPre(helpers, p),
                        helpers.Table3colRCL(`${p}_r3`, 'Lokalizace', [
                            [ { btn: `${p}_p_med_r`, type: 'basic', text: 'Med' }, { btn: `${p}_p_med_c`, type: 'basic', text: 'Med' }, { btn: `${p}_p_med_l`, type: 'basic', text: 'Med' } ],
                            [ { btn: `${p}_p_1_r`, type: 'basic', text: '1R' }, '', { btn: `${p}_p_1_l`, type: 'basic', text: '1L' } ],
                            [ { btn: `${p}_p_2_r`, type: 'basic', text: '2R' }, '', { btn: `${p}_p_2_l`, type: 'basic', text: '2L' } ],
                            [ '', { btn: `${p}_p_3a_c`, type: 'basic', text: '3A' }, '' ],
                            [ '', { btn: `${p}_p_3p_c`, type: 'basic', text: '3P' }, '' ],
                            [ { btn: `${p}_p_4_r`, type: 'basic', text: '4R' }, '', { btn: `${p}_p_4_l`, type: 'basic', text: '4L' } ],
                            [ '', { btn: `${p}_p_5_c`, type: 'basic', text: '5' }, '' ],
                            [ '', { btn: `${p}_p_6_c`, type: 'basic', text: '6' }, '' ],
                            [ '', { btn: `${p}_p_7_c`, type: 'basic', text: '7' }, '' ],
                            [ '', { btn: `${p}_p_8_c`, type: 'basic', text: '8' }, '' ],
                            [ { btn: `${p}_p_hil_r`, type: 'basic', text: 'Hilus' }, '', { btn: `${p}_p_hil_l`, type: 'basic', text: 'Hilus' } ],
                            [ { btn: `${p}_p_10_r`, type: 'basic', text: '10R' }, '', { btn: `${p}_p_10_l`, type: 'basic', text: '10L' } ],
                            [ { btn: `${p}_p_11_r`, type: 'basic', text: '11-14R' }, '', { btn: `${p}_p_11_l`, type: 'basic', text: '11-14L' } ],
                            [ { btn: `${p}_p_axi_r`, type: 'basic', text: 'Axila' }, '', { btn: `${p}_p_axi_l`, type: 'basic', text: 'Axila' } ],
                            [ { btn: `${p}_p_im_r`, type: 'basic', text: 'IM' }, '', { btn: `${p}_p_im_l`, type: 'basic', text: 'IM' } ]
                        ]),
                        ...LESIONS_DEFINITION.getLymphNodeRowsPost(helpers, p, `${p}_met`, `${p}_e`)
                    ])
                );
            });

            layoutNodes.push(
                helpers.TableMain('thorax_plice_main', 'Plíce a Pleura', [
                    helpers.Table3colRL('plice_fokal_table', 'Fokální změny', [
                        [ { btn: 'pl_mikro_r', states: ['0', '1', 'více'] }, 'mikronodul', { btn: 'pl_mikro_l', states: ['0', '1', 'více'] } ],
                        [ { btn: 'pl_nodul_r', states: ['0', '1', 'více'] }, 'nodul', { btn: 'pl_nodul_l', states: ['0', '1', 'více'] } ],
                        [ { btn: 'pl_opac_r', states: ['0', '1', 'více'] }, 'opacita', { btn: 'pl_opac_l', states: ['0', '1', 'více'] } ],
                        [ { btn: 'pl_kons_r', states: ['0', '1', 'více'] }, 'konsolidace', { btn: 'pl_kons_l', states: ['0', '1', 'více'] } ],
                        [ { btn: 'pl_hypo_r', states: ['0', '1', 'více'] }, 'hypoventilace', { btn: 'pl_hypo_l', states: ['0', '1', 'více'] } ],
                        [ { btn: 'pl_jizva_r', states: ['0', '1', 'více'] }, 'jizva', { btn: 'pl_jizva_l', states: ['0', '1', 'více'] } ],
                        [ { btn: 'pl_rad_r', states: ['0', '+'] }, 'poradiační', { btn: 'pl_rad_l', states: ['0', '+'] } ]
                    ]),
                    helpers.Table2colNormal('plice_difuz_table', 'Difuzní změny',[
                        [ 'Fibróza:', { btn: 'pl_fib', states: ['0', 'ANO'] } ],
                        [ 'Emfyzém:', { btn: 'pl_emf', states: ['0', 'parasept.', 'centrilob.', 'panacin.'] }, { btn: 'pl_emf_loc', states: ['distr.', 'apikálně', 'všude', 'bazálně'] } ]
                    ]),
                    helpers.Table3colRL('plice_op_table', 'Operace plic', [
                        [ { btn: 'pl_op_pulm_r', states: ['0', '+'] }, 'pulmonektomie', { btn: 'pl_op_pulm_l', states: ['0', '+'] } ],
                        [ { btn: 'pl_op_lob_h_r', states: ['0', '+'] }, 'lobektomie horní', { btn: 'pl_op_lob_h_l', states: ['0', '+'] } ],
                        [ { btn: 'pl_op_lob_s_r', states: ['0', '+'] }, 'lobektomie střední', '' ],
                        [ { btn: 'pl_op_lob_d_r', states: ['0', '+'] }, 'lobektomie dolní', { btn: 'pl_op_lob_d_l', states: ['0', '+'] } ],
                        [ { btn: 'pl_op_res_h_r', states: ['0', '+'] }, 'resekce horní', { btn: 'pl_op_res_h_l', states: ['0', '+'] } ],
                        [ { btn: 'pl_op_res_s_r', states: ['0', '+'] }, 'resekce střed./lingula', { btn: 'pl_op_res_s_l', states: ['0', '+'] } ],
                        [ { btn: 'pl_op_res_d_r', states: ['0', '+'] }, 'resekce dolní', { btn: 'pl_op_res_d_l', states: ['0', '+'] } ]
                    ]),
                    helpers.Table3colRL('pleura_ost_table', 'Pleura',[
                        [ { field: 'mm', id: 'pl_tek_r', placeholder: 'mm', step: 5 }, 'tekutina:', { field: 'mm', id: 'pl_tek_l', placeholder: 'mm', step: 5 }],
                        [ { field: 'mm', id: 'pl_tek_old_r', placeholder: 'mm', step: 5 }, 'minule:', { field: 'mm', id: 'pl_tek_old_l', placeholder: 'mm', step: 5 } ],
                        [ { btn: 'pl_akt_r', states: ['0', '+'] }, 'RF+', { btn: 'pl_akt_l', states: ['0', '+'] } ],
                        [ { btn: 'pl_talk_r', states: ['0', '+'] }, 'talkáž', { btn: 'pl_talk_l', states: ['0', '+'] } ]
                    ]),
                    helpers.Table1col('plice_ost_add', [
                        { field: 'text', id: 'plice_custom_desc', placeholder: 'vlastní...popis...' },
                        { field: 'text', id: 'plice_custom_conc', placeholder: 'vlastní...závěr...' }
                    ], { normal: true })
                ])
            );
            // ILD jen když je aktivní overlay — ne při otevření celého regionu Plíce
            if (Store.activeTable === 'thorax_ild_main') {
                layoutNodes.push(buildIldTreeTable(helpers, Store.activeTab || 'default'));
            }
            layoutNodes.push(
                helpers.TableMain('thorax_mamma_main', 'Mamma', [
                    helpers.Table3colRL('mamma_table', [
                        [ { btn: 'ma_mast_r', states: ['0', '+'] }, 'mastektomie', { btn: 'ma_mast_l', states: ['0', '+'] } ],
                        [ { btn: 'ma_kvad_r', states: ['0', '+'] }, 'kvadrantektomie', { btn: 'ma_kvad_l', states: ['0', '+'] } ],
                        [ { btn: 'ma_res_r', states: ['0', '+'] }, 'resekce', { btn: 'ma_res_l', states: ['0', '+'] } ],
                        [ { btn: 'ma_nahr_r', states: ['0', '+'] }, 'náhrada', { btn: 'ma_nahr_l', states: ['0', '+'] } ],
                        [ { btn: 'ma_aug_r', states: ['0', '+'] }, 'augmentace', { btn: 'ma_aug_l', states: ['0', '+'] } ],
                        [ { btn: 'ma_koz_r', states: ['0', '+'] }, 'kožní zesílení', { btn: 'ma_koz_l', states: ['0', '+'] } ]
                    ]),
                    helpers.Table1col('mamma_ost_add', [
                        { field: 'text', id: 'mamma_custom_desc', placeholder: 'vlastní...popis...' },
                        { field: 'text', id: 'mamma_custom_conc', placeholder: 'vlastní...závěr...' }
                    ], { normal: true })
                ]),
                helpers.TableMain('thorax_jicen_main', 'Jícen', [
                    helpers.Table2colNormal('jicen_table', [
                        [ 'Hiátová hernie', { btn: 'ji_hernie', states: ['0', 'drobná', 'větší', 'upside-down'] } ],
                        [ 'RF+ distálně', { btn: 'ji_aktdist', states: ['0', '+'] } ],
                        [ 'RF+ difuzně', { btn: 'ji_aktdif', states: ['0', '+'] } ],
                        [ 'Resekce', { btn: 'ji_res', states: ['0', '+', 'žaludek', 'tračník'] } ]
                    ]),
                    helpers.Table1col('jicen_ost_add', [
                        { field: 'text', id: 'jicen_custom_desc', placeholder: 'vlastní...popis...' },
                        { field: 'text', id: 'jicen_custom_conc', placeholder: 'vlastní...závěr...' }
                    ], { normal: true })
                ]),
                helpers.TableMain('thorax_thymus_main', 'Thymus', [
                    helpers.Table2colNormal('thymus_table', [
                        [ 'Zvětšení', { btn: 'th_zvet', states: ['0', '+'] } ],
                        [ 'RF+', { btn: 'th_akt', states: ['0', '+'] } ]
                    ]),
                    helpers.Table1col('thymus_ost_add', [
                        { field: 'text', id: 'thymus_custom_desc', placeholder: 'vlastní...popis...' },
                        { field: 'text', id: 'thymus_custom_conc', placeholder: 'vlastní...závěr...' }
                    ], { normal: true })
                ]),
                helpers.TableMain('thorax_srdce_main', 'Srdce a koronární tepny', [
                    helpers.Table2colNormal('srdce_table', [
                        [ 'Dilatace srdce', { btn: 'sr_dil', states: ['0', 'síní', 'celého'] } ],
                        [ 'Dilatace aorty', { btn: 'sr_dil_ao', states: ['0', 'kořene', 'ascendentní', 'oboje'] }, { field: 'mm', id: 'sr_dil_ao_mm', placeholder: 'mm', step: 1 } ],
                        [ 'Náhrada chlopně', { btn: 'sr_chl', states: ['0', 'Ao', 'Mi', 'obou', 'Ao+Asc R'] } ],
                        [ 'AS koronárek', { btn: 'sr_as', states: ['0', '+'] } ],
                        [ 'Perikard. výpotek:', { field: 'mm', id: 'sr_tek_mm', placeholder: 'mm', step: 5 } ],
                        [ 'Minule:', { field: 'mm', id: 'sr_tek_old_mm', placeholder: 'mm', step: 5 } ]
                    ]),
                    helpers.Table1col('srdce_ost_add', [
                        { field: 'text', id: 'srdce_custom_desc', placeholder: 'vlastní...popis...' },
                        { field: 'text', id: 'srdce_custom_conc', placeholder: 'vlastní...závěr...' }
                    ], { normal: true })
                ]),
                helpers.TableMain('thorax_devices_main', 'Devices', [
                    helpers.Table3colRL('devices_table', [
                        [ { btn: 'dev_port_r', states: ['0', '+'] }, 'portkatetr', { btn: 'dev_port_l', states: ['0', '+'] } ],
                        [ { btn: 'dev_picc_r', states: ['0', '+'] }, 'PICC', { btn: 'dev_picc_l', states: ['0', '+'] } ],
                        [ { btn: 'dev_cvk_r', states: ['0', '+'] }, 'CVK', { btn: 'dev_cvk_l', states: ['0', '+'] } ],
                        [ { btn: 'dev_ks_r', states: ['0', '+'] }, 'KS', { btn: 'dev_ks_l', states: ['0', '+'] } ],
                        [ { btn: 'dev_icd_r', states: ['0', '+'] }, 'ICD', { btn: 'dev_icd_l', states: ['0', '+'] } ]
                    ]),
                    helpers.Table1col('devices_ost_add', [
                        { field: 'text', id: 'devices_custom_desc', placeholder: 'vlastní...popis...' },
                        { field: 'text', id: 'devices_custom_conc', placeholder: 'vlastní...závěr...' }
                    ], { normal: true })
                ]),
                helpers.TableMain('thorax_ostatni_main', 'Ostatní nálezy', [
                    helpers.Table1col('ostatni_ost_add', [
                        { field: 'text', id: 'ostatni_custom_desc', placeholder: 'vlastní...popis...' },
                        { field: 'text', id: 'ostatni_custom_conc', placeholder: 'vlastní...závěr...' }
                    ], { normal: true })
                ])
            );

            return layoutNodes;
        },
        compile: (ctx) => {
            let reportOut = [{ type: 'heading', text: 'Hrudník:', action: 'open-region', regionId: 'thorax' }];
            let concMain = [];
            let concInc = [];
            
            const examId = ctx.examId || 'default';
            const formatList = formatCzechList;
            const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

            const isPET = (examId || '').toLowerCase().includes('pet');

            const lesInsts = Store.instances?.['thorax_lesion_main'] || [];
            let highAct = false, badEtio = false;
            lesInsts.forEach(id => {
                if (['intermediární', 'zvýšená', 'vysoká'].includes(ctx.text(`tl_${id}_met_act`, true))) highAct = true;
                if (!ctx.isActive(`tl_${id}_e_b`) && !ctx.isActive(`tl_${id}_e_inf`)) badEtio = true;
            });

            if (lesInsts.length === 0 || (lesInsts.length > 0 && isPET && !highAct)) {
                reportOut.push({ type: 'frame', text: isPET ? 'Bez patrných hyperakumulujících ložiskových změn.' : 'Bez patrných ložiskových změn.', tableId: 'thorax_lesion_main', dimmed: true });
            }

            lesInsts.forEach(instId => {
                const p = `tl_${instId}`;
                    let lokace = [];
                    const lokItems = [
                        { id: 'hl', name: 'v horním laloku' }, 
                        { id: 'sl', name: 've středním laloku / lingule' }, 
                        { id: 'dl', name: 'v dolním laloku' },
                        { id: 'pl', name: 'pleurálně' }, 
                        { id: 'sw', name: 'v hrudní stěně' }, 
                        { id: 'ma', name: 'v mammě' },
                        { id: 'th', name: 'v thymu' }
                    ];
                    lokItems.forEach(l => {
                        let r = ctx.isActive(`${p}_p_${l.id}_r`), left = ctx.isActive(`${p}_p_${l.id}_l`);
                        if (r || left) {
                            let segR = r && ctx.text(`${p}_p_${l.id}_r`) !== '+' ? ` (${ctx.text(`${p}_p_${l.id}_r`)})` : '';
                            let segL = left && ctx.text(`${p}_p_${l.id}_l`) !== '+' ? ` (${ctx.text(`${p}_p_${l.id}_l`)})` : '';
                            
                            if (['hl', 'sl', 'dl'].includes(l.id)) {
                                if (r && left) {
                                    if (l.id === 'sl') {
                                        lokace.push(`ve středním laloku pravé plíce${segR} a v lingule levé plíce${segL}`);
                                    } else {
                                        if (segR === segL) lokace.push(`${l.name} obou plic${segR}`);
                                        else lokace.push(`${l.name} pravé plíce${segR} a ${l.name} levé plíce${segL}`);
                                    }
                                } else if (r) {
                                    let nameR = l.id === 'sl' ? 've středním laloku' : l.name;
                                    lokace.push(`${nameR} pravé plíce${segR}`);
                                } else if (left) {
                                    let nameL = l.id === 'sl' ? 'v lingule' : l.name;
                                    lokace.push(`${nameL} levé plíce${segL}`);
                                }
                            } else {
                                if (r && left) lokace.push(`${l.name}${segR} bilat.`);
                                else if (r) lokace.push(`${l.name}${segR} vpravo`);
                                else if (left) lokace.push(`${l.name}${segL} vlevo`);
                            }
                        }
                    });
                    
                    if (ctx.isActive(`${p}_p_pulm_r`) && ctx.isActive(`${p}_p_pulm_l`)) lokace.push('v obou plicích');
                    else if (ctx.isActive(`${p}_p_pulm_r`)) lokace.push('v pravé plíci');
                    else if (ctx.isActive(`${p}_p_pulm_l`)) lokace.push('v levé plíci');
                    
                    if (ctx.isActive(`${p}_p_ji`)) {
                        let jiVal = ctx.text(`${p}_p_ji`);
                        if (jiVal === 'horní') lokace.push('v horním jícnu');
                        else if (jiVal === 'střední') lokace.push('ve středním jícnu');
                        else if (jiVal === 'dolní') lokace.push('v dolním jícnu');
                    }

                    let lokText = lokace.length > 0 ? formatCzechList(lokace) : '';
                    
                    let d = LESIONS_DEFINITION.parseDetails(ctx, examId, 'thorax', p, `${p}_met`, `${p}_e`, false);

                    if (d.hasAny || lokace.length > 0) {
                        let repSentence = `${d.baseText} ${lokText}${d.doplneniStr}${d.vzhledText}${d.metrikyStr}.`.replace(/\s+/g, ' ').replace(' .', '.').trim();
                        reportOut.push({ type: 'frame', text: repSentence, tableId: `thorax_lesion_main__${instId}` });
                        
                        let concSentence = `${d.baseText} ${lokText}${d.doplneniStr}${d.actStr}${d.dynStr}`;
                        if (d.etioStr) concSentence += `: ${d.etioStr}.`;
                        else concSentence += `.`;
                        
                        concSentence = concSentence.replace(/\s+/g, ' ').replace(' : ', ': ').replace(' .', '.');
                        concMain.push({ type: 'frame', text: concSentence, tableId: `thorax_lesion_main__${instId}` });
                    }
                });

            if (lesInsts.length > 0 && (!isPET || highAct) && !badEtio) {
                reportOut.push({ type: 'frame', text: 'Jinak bez patrných ložiskových změn.', tableId: 'thorax_lesion_main', dimmed: true });
            }

            const lnInsts = Store.instances?.['thorax_lymphnode_main'] || [];
            if (lnInsts.length === 0) {
                reportOut.push({ type: 'frame', text: isPET ? 'Bez patrné hyperakumulující lymfadenopatie.' : 'Bez patrné lymfadenopatie.', tableId: 'thorax_lymphnode_main', dimmed: true });
            } else {
                lnInsts.forEach(instId => {
                    const p = `tln_${instId}`;
                    let lokaceLN = [];
                    
                    let med_p = ctx.isActive(`${p}_p_med_r`), med_c = ctx.isActive(`${p}_p_med_c`), med_l = ctx.isActive(`${p}_p_med_l`);
                    if (med_p && med_l) lokaceLN.push('v mediastinu bilat.');
                    else if (med_c) lokaceLN.push('v mediastinu');
                    else if (med_p) lokaceLN.push('v mediastinu vpravo');
                    else if (med_l) lokaceLN.push('v mediastinu vlevo');

                    let activeRegs = [];
                    if (ctx.isActive(`${p}_p_1_r`)) activeRegs.push('1R');
                    if (ctx.isActive(`${p}_p_1_l`)) activeRegs.push('1L');
                    if (ctx.isActive(`${p}_p_2_r`)) activeRegs.push('2R');
                    if (ctx.isActive(`${p}_p_2_l`)) activeRegs.push('2L');
                    if (ctx.isActive(`${p}_p_3a_c`)) activeRegs.push('3A');
                    if (ctx.isActive(`${p}_p_3p_c`)) activeRegs.push('3P');
                    if (ctx.isActive(`${p}_p_4_r`)) activeRegs.push('4R');
                    if (ctx.isActive(`${p}_p_4_l`)) activeRegs.push('4L');
                    if (ctx.isActive(`${p}_p_5_c`)) activeRegs.push('5');
                    if (ctx.isActive(`${p}_p_6_c`)) activeRegs.push('6');
                    if (ctx.isActive(`${p}_p_7_c`)) activeRegs.push('7');
                    if (ctx.isActive(`${p}_p_8_c`)) activeRegs.push('8');
                    if (ctx.isActive(`${p}_p_10_r`)) activeRegs.push('10R');
                    if (ctx.isActive(`${p}_p_10_l`)) activeRegs.push('10L');
                    if (ctx.isActive(`${p}_p_11_r`)) activeRegs.push('11-14R');
                    if (ctx.isActive(`${p}_p_11_l`)) activeRegs.push('11-14L');

                    if (activeRegs.length > 0) {
                        let prefix = activeRegs.length > 1 ? 'v regiích' : 'v regiu';
                        lokaceLN.push(`${prefix} ${activeRegs.join(', ')}`);
                    }

                    let hil_r = ctx.isActive(`${p}_p_hil_r`), hil_l = ctx.isActive(`${p}_p_hil_l`);
                    if (hil_r && hil_l) lokaceLN.push('v obou hilech');
                    else if (hil_r) lokaceLN.push('v pravém hilu');
                    else if (hil_l) lokaceLN.push('v levém hilu');

                    let axi_r = ctx.isActive(`${p}_p_axi_r`), axi_l = ctx.isActive(`${p}_p_axi_l`);
                    if (axi_r && axi_l) lokaceLN.push('v obou axilách');
                    else if (axi_r) lokaceLN.push('v pravé axile');
                    else if (axi_l) lokaceLN.push('v levé axile');

                    let im_r = ctx.isActive(`${p}_p_im_r`), im_l = ctx.isActive(`${p}_p_im_l`);
                    if (im_r && im_l) lokaceLN.push('interní mammární bilat.');
                    else if (im_r) lokaceLN.push('interní mammární vpravo');
                    else if (im_l) lokaceLN.push('interní mammární vlevo');

                    let lokTextLN = lokaceLN.length > 0 ? formatCzechList(lokaceLN) : '';

                    let dLN = LESIONS_DEFINITION.parseDetails(ctx, examId, 'thorax', p, `${p}_met`, `${p}_e`, true);

                    if (dLN.hasAny || lokaceLN.length > 0) {
                        let repSentence = `${dLN.baseText}${dLN.doplneniStr} ${lokTextLN}${dLN.vzhledText}${dLN.metrikyStr}.`.replace(/\s+/g, ' ').replace(' .', '.');
                        reportOut.push({ type: 'frame', text: repSentence, tableId: `thorax_lymphnode_main__${instId}` });
                        
                        let concSentence = `${dLN.baseText}${dLN.doplneniStr} ${lokTextLN}${dLN.actStr}${dLN.dynStr}`;
                        if (dLN.etioStr) concSentence += `: ${dLN.etioStr}.`;
                        else concSentence += `.`;
                        
                        concSentence = concSentence.replace(/\s+/g, ' ').replace(' : ', ': ').replace(' .', '.');
                        concMain.push({ type: 'frame', text: concSentence, tableId: `thorax_lymphnode_main__${instId}` });
                    }
                });
            }

            let difuzniRep = [];

            const getLocText = (loc) => {
                if (!loc || loc === '0') return { rep: '', conc: '', isDifuzni: false };
                if (loc === 'distr.') return { rep: ' s nepravidelnou distribucí', conc: ' s nepravidelnou distribucí', isDifuzni: false };
                if (loc === 'apikálně') return { rep: ' s apikální predominancí', conc: ' s maximem apikálně', isDifuzni: false };
                if (loc === 'bazálně') return { rep: ' s bazální predominancí', conc: ' s maximem bazálně', isDifuzni: false };
                if (loc === 'všude') return { rep: '', conc: ' difuzně', isDifuzni: true };
                return { rep: ` ${loc}`, conc: ` ${loc}`, isDifuzni: false };
            };

            let fib = ctx.text('pl_fib');

            let emf = ctx.text('pl_emf'), emfLoc = ctx.text('pl_emf_loc');
            if (emf && emf !== '0') {
                let emfMap = { 'parasept.': 'paraseptální', 'centrilob.': 'centrilobulární', 'panacin.': 'panacinární' };
                let emfFull = emfMap[emf] || emf;
                let loc = getLocText(emfLoc);
                let emfRep = "";

                if (emf === 'centrilob.') {
                    emfRep = loc.isDifuzni ? "difuzní drobné oblasti centrilobulárního projasnění plicního parenchymu bez detekovatelných stěn" : `drobné oblasti centrilobulárního projasnění plicního parenchymu bez detekovatelných stěn${loc.rep}`;
                } else if (emf === 'parasept.') {
                    emfRep = loc.isDifuzni ? "difuzní subpleurálně lokalizované oblasti projasnění plicního parenchymu" : `subpleurálně lokalizované oblasti projasnění plicního parenchymu${loc.rep}`;
                } else if (emf === 'panacin.') {
                    emfRep = loc.isDifuzni ? "difuzní panlobulární úbytek plicního parenchymu s výraznou redukcí cévní kresby" : `panlobulární úbytek plicního parenchymu s výraznou redukcí cévní kresby${loc.rep}`;
                } else {
                    emfRep = loc.isDifuzni ? "difuzní strukturální změny charakteru hyperlucence parenchymu" : `strukturální změny charakteru hyperlucence parenchymu${loc.rep}`;
                }

                if (emfRep) {
                    difuzniRep.push(emfRep);
                }

                if (loc.isDifuzni) {
                    concInc.push({ type: 'frame', text: `Difuzní ${emfFull} plicní emfyzém.`, tableId: 'thorax_plice_main' });
                } else {
                    concInc.push({ type: 'frame', text: `${cap(emfFull)} plicní emfyzém${loc.conc}.`, tableId: 'thorax_plice_main' });
                }
            }
            
            let fokalniRep = [];
            let fokMap = { pl_mikro: { s: 'nespecifický mikronodul', p: 'nespecifické mikronoduly' }, pl_nodul: { s: 'nespecifický nodul', p: 'nespecifické noduly' }, pl_opac: { s: 'nespecifická opacita', p: 'nespecifické opacity' }, pl_kons: { s: 'drobná konsolidace', p: 'drobné konsolidace' }, pl_hypo: { s: 'drobné hypoventilace', p: 'drobné hypoventilace' }, pl_jizva: { s: 'jizva', p: 'jizvy' }, pl_rad: { s: 'poradiační změny', p: 'poradiační změny' } };
            for (let k in fokMap) {
                let p = ctx.text(`${k}_r`), l = ctx.text(`${k}_l`);
                if ((p && p !== '0') || (l && l !== '0')) {
                    let side = (p !== '0' && l !== '0') ? 'obou plic' : (p !== '0' ? 'pravé plíce' : 'levé plíce');
                    fokalniRep.push(`${(p === 'více' || l === 'více' || side === 'obou plic') ? fokMap[k].p : fokMap[k].s} ${side}`);
                }
            }
            
            let opMap = { pl_op_pulm: 'pulmonektomii', pl_op_lob_h: 'lobektomii horního laloku', pl_op_lob_s: 'lobektomii', pl_op_lob_d: 'lobektomii dolního laloku', pl_op_res_h: 'resekci v horním laloku', pl_op_res_s: 'resekci', pl_op_res_d: 'resekci v dolním laloku' };
            let allOps = [];
            for (let k in opMap) {
                if (ctx.isActive(`${k}_r`)) allOps.push(`${k.includes('_s') ? opMap[k] + ' středního laloku' : opMap[k]} pravé plíce`);
                if (ctx.isActive(`${k}_l`)) allOps.push(`${k.includes('_s') ? opMap[k] + ' v lingule' : opMap[k]} levé plíce`);
            }

            let pliceDesc = ctx.field('plice_custom_desc');
            const ildOutcome = (fib === 'ANO') ? resolveIldTree(examId) : null;
            
            let plicePhrases = [];
            if (fokalniRep.length > 0) plicePhrases.push(formatList(fokalniRep));
            if (difuzniRep.length > 0) plicePhrases.push(formatList(difuzniRep));
            if (ildOutcome) plicePhrases.push(ildOutcome.report);
            if (allOps.length > 0) plicePhrases.push(`stav po ${formatList(allOps)}`);
            if (pliceDesc) {
                let descText = pliceDesc.trim();
                if (descText.endsWith('.')) descText = descText.slice(0, -1);
                plicePhrases.push(descText);
            }

            const pliceNormal = ctx.isActive('plice_ost_add_normal');
            if (pliceNormal || plicePhrases.length > 0) {
                let body;
                if (pliceNormal && plicePhrases.length > 0) body = `přiměřené vzdušnosti a kresby, bez ložiskových či difuzních změn. Jinak pouze ${plicePhrases.join(', ')}.`;
                else if (pliceNormal) body = 'přiměřené vzdušnosti a kresby, bez ložiskových či difuzních změn.';
                else body = plicePhrases.join(', ') + '.';
                reportOut.push({ type: 'frame', text: `- Plíce: ${body}`, tableId: 'thorax_plice_main' });
            }
            if (pliceNormal) {
                concMain.push({ type: 'frame', text: 'Přiměřený nález na plicích, bez ložiskové léze.', tableId: 'thorax_plice_main' });
            }
            if (ildOutcome) {
                let concTxt = ildOutcome.conc;
                if (ildOutcome.recommend) concTxt += ' ' + ildOutcome.recommend;
                concMain.push({ type: 'frame', text: concTxt, tableId: 'thorax_ild_main' });
            }

            let pleuraRep = [];
            let tekR = parseInt(ctx.field('pl_tek_r')) || 0, tekL = parseInt(ctx.field('pl_tek_l')) || 0;
            let minR = parseInt(ctx.field('pl_tek_old_r')) || 0, minL = parseInt(ctx.field('pl_tek_old_l')) || 0;
            const hasMin = !!document.body.classList.contains('has-past-date');
            
            if (tekR || tekL || minR || minL) {
                const getSide = (v, m, s) => {
                    if (!v && !m) return null;
                    if (!v) return { r: `${s} tekutina zcela regredovala (minule šíře ${m} mm)`, c: `fluidothorax ${s} zcela regredoval`, reg: 1 };
                    let dynState = "";
                    if (m && hasMin) {
                        if (v > m + 5) dynState = "v progresi";
                        else if (v < m - 5) dynState = "v regresi";
                        else dynState = "stacionární";
                    }
                    const mod = v >= 40 ? "výrazný " : (v <= 15 ? "malý " : "");
                    return { r: `šíře ${v} mm ${s}${(m && hasMin) ? ` (minule šíře ${m} mm)` : ''}`, c: `${mod}fluidothorax ${s}${dynState ? ' ' + dynState : ''}`.trim(), reg: 0, mod, dynState };
                };
                let R = getSide(tekR, minR, 'vpravo'), L = getSide(tekL, minL, 'vlevo');
                let concl = '';
                if (R && L && R.reg && L.reg) {
                    pleuraRep.push(`tekutina bilat. zcela regredovala (minule vpravo šíře ${minR} mm, vlevo šíře ${minL} mm)`);
                    concl = "fluidothorax bilat. zcela regredoval";
                } else if (R && L && !R.reg && !L.reg) {
                    pleuraRep.push(`tekutina ${R.r} a ${L.r}`);
                    concl = (R.mod === L.mod && R.dynState === L.dynState) ? `${R.mod}fluidothorax bilat.${R.dynState ? ' ' + R.dynState : ''}`.trim() : `${R.c}, ${L.c}`;
                } else {
                    let fmt = X => X.reg ? X.r : `tekutina ${X.r}`;
                    pleuraRep.push(R && L ? `${fmt(R)}, ${fmt(L)}` : fmt(R || L));
                    concl = [R?.c, L?.c].filter(Boolean).join(', ');
                }
                concMain.push({ type: 'frame', text: `${cap(concl)}.`.replace('..', '.'), tableId: 'thorax_plice_main' });
            }
            
            ['pl_akt', 'pl_talk'].forEach(k => {
                let p = ctx.isActive(`${k}_r`), l = ctx.isActive(`${k}_l`);
                if (!p && !l) return;
                let side = p && l ? 'bilat.' : (p ? 'vpravo' : 'vlevo');
                if (k === 'pl_akt') {
                    pleuraRep.push(`zvýšená akumulace RF ${side} bez zřetelného zesílení`);
                    concInc.push({ type: 'frame', text: `Zvýšená aktivita pleurálně ${side} bez patrné infiltrace: v.s. reaktivně / v rámci zánětu.`, tableId: 'thorax_plice_main' });
                } else {
                    pleuraRep.push(`difuzní pleurální zesílení s vysokou akumulací RF ${side} po talkáži`);
                    concInc.push({ type: 'frame', text: `Pleurální reaktivní změny s vysokou aktivitou ${side} po talkáži.`, tableId: 'thorax_plice_main' });
                }
            });

            if (pleuraRep.length > 0) {
                let text = formatCzechList(pleuraRep);
                reportOut.push({ type: 'frame', text: `- Pleura: ${text}.`, tableId: 'thorax_plice_main' });
            }

            /* --- AUTO-HODNOCENÍ VZDUŠNOSTI PLIC A PLEURY --- */
            let noFE = (!fib || fib === '0') && (!emf || emf === '0') && !ildOutcome;
            let noTek = !(tekR || tekL || minR || minL);
            let txt = "", top = false;

            if (noFE) {
                let s = (k) => ({ r: ctx.isActive(`${k}_r`), l: ctx.isActive(`${k}_l`) });
                let fok = ['pl_mikro', 'pl_nodul', 'pl_opac', 'pl_hypo', 'pl_jizva', 'pl_rad'].reduce((a,k)=>{ let x=s(k); return {r:a.r||x.r, l:a.l||x.l}; }, {r:false,l:false});
                let kon = s('pl_kons');
                let op = ['pl_op_pulm', 'pl_op_lob_h', 'pl_op_lob_s', 'pl_op_lob_d', 'pl_op_res_h', 'pl_op_res_s', 'pl_op_res_d'].reduce((a,k)=>{ let x=s(k); return {r:a.r||x.r, l:a.l||x.l}; }, {r:false,l:false});
                let pl = { r: tekR > 0 || minR > 0 || ctx.isActive('pl_akt_r') || ctx.isActive('pl_talk_r'), l: tekL > 0 || minL > 0 || ctx.isActive('pl_akt_l') || ctx.isActive('pl_talk_l') };

                let hFok = fok.r || fok.l, hKon = kon.r || kon.l, hOp = op.r || op.l, hPl = pl.r || pl.l;

                if (!hFok && !hKon && !hOp && !hPl) { txt = "Adekvátní plicní objem a vzdušnost."; top = true; }
                else if (!hKon && !hOp && !hPl && hFok) txt = "Jinak adekvátní plicní objem a vzdušnost.";
                else if ((kon.r || op.r || pl.r) && !(kon.l || op.l || pl.l)) txt = "Vlevo adekvátní plicní objem a vzdušnost.";
                else if ((kon.l || op.l || pl.l) && !(kon.r || op.r || pl.r)) txt = "Vpravo adekvátní plicní objem a vzdušnost.";
            }

            if (txt && !pliceNormal) {
                const isNegative = (txt === "Adekvátní plicní objem a vzdušnost.");
                let obj = { type: 'frame', text: txt, tableId: 'thorax_plice_main', dimmed: isNegative };
                
                if (top) {
                    let i = reportOut.findIndex(x => x.tableId === 'thorax_plice_main');
                    reportOut.splice(i > -1 ? i : reportOut.length, 0, obj);
                } else reportOut.push(obj);
            }

            if (noTek) {
                reportOut.push({ type: 'frame', text: "Bez výpotků.", tableId: 'thorax_plice_main', dimmed: true });
            }

            let pliceConc = ctx.field('plice_custom_conc');
            if (pliceConc) concInc.push({ type: 'frame', text: pliceConc, tableId: 'thorax_plice_main' });

            let mammaMap = { ma_mast: 'stav po mastektomii', ma_kvad: 'stav po kvadrantektomii', ma_res: 'stav po parc. resekci', ma_nahr: 'stav po implantaci náhrady', ma_aug: 'stav po augmentaci', ma_koz: 'kožní zesílení' };
            let allMamma = [];
            for (let k in mammaMap) {
                let p = ctx.isActive(`${k}_r`), l = ctx.isActive(`${k}_l`);
                if (!p && !l) continue;
                let side = p && l ? 'bilat.' : (p ? 'vpravo' : 'vlevo');
                allMamma.push(`${mammaMap[k]} ${side}`);
            }
            let mammaText = allMamma.length > 0 ? formatList(allMamma) : "";
            let maDesc = ctx.field('mamma_custom_desc');
            let maParts = [];
            if (mammaText) maParts.push(mammaText);
            if (maDesc) {
                let txt = maDesc.trim();
                if (txt.endsWith('.')) txt = txt.slice(0, -1);
                maParts.push(txt);
            }
            const mammaNormal = ctx.isActive('mamma_ost_add_normal');
            if (mammaNormal || maParts.length > 0) {
                let body;
                if (mammaNormal && maParts.length > 0) body = `obvyklého vzhledu, bez ložiskových změn. Jinak pouze ${formatList(maParts)}.`;
                else if (mammaNormal) body = 'obvyklého vzhledu, bez ložiskových změn.';
                else body = `${formatList(maParts)}.`;
                reportOut.push({ type: 'frame', text: `- Mamma: ${body}`, tableId: 'thorax_mamma_main' });
            }
            
            let maConc = ctx.field('mamma_custom_conc');
            if (maConc) concInc.push({ type: 'frame', text: maConc, tableId: 'thorax_mamma_main' });
            if (mammaNormal) {
                concMain.push({ type: 'frame', text: 'Přiměřený nález na mléčných žlázách, bez ložiskové léze.', tableId: 'thorax_mamma_main' });
            }

            let jicenRep = [];
            let jicenConc = [];
            let jHer = ctx.text('ji_hernie');
            if (jHer !== '0' && jHer !== '') {
                if (jHer === 'drobná') jicenRep.push("drobná herniace žaludku nad hiátus");
                else if (jHer === 'větší') { jicenRep.push("herniace žaludku nad hiátus"); jicenConc.push("Skluzná hiátová hernie."); }
                else if (jHer === 'upside-down') { jicenRep.push("herniace celého žaludku upside-down"); jicenConc.push("Upside-down herniace žaludku."); }
            }
            if (ctx.isActive('ji_aktdist')) jicenRep.push("zvýšená akumulace RF v dist. jícnu funkčně či při refluxu");
            if (ctx.isActive('ji_aktdif')) jicenRep.push("difuzně zvýšená akumulace RF v jícnu zřejmě funkční");
            let jRes = ctx.text('ji_res');
            if (jRes !== '0' && jRes !== '') {
                if (jRes === '+') jicenRep.push("st.p. resekci dist. jícnu s anastomózou v hrudníku");
                else if (jRes === 'žaludek') jicenRep.push("st.p. resekci dist. jícnu s náhradou tubul. žaludkem");
                else if (jRes === 'tračník') jicenRep.push("st.p. resekci dist. jícnu s náhradou tračníkem");
            }
            let jicenText = jicenRep.length > 0 ? formatCzechList(jicenRep) : "";
            let jiDesc = ctx.field('jicen_custom_desc');
            let jiParts = [];
            if (jicenText) jiParts.push(jicenText);
            if (jiDesc) {
                let txt = jiDesc.trim();
                if (txt.endsWith('.')) txt = txt.slice(0, -1);
                jiParts.push(txt);
            }
            const jicenNormal = ctx.isActive('jicen_ost_add_normal');
            if (jicenNormal || jiParts.length > 0) {
                let body;
                if (jicenNormal && jiParts.length > 0) body = `přiměřené šíře, bez ložiskového ztluštění stěny. Jinak pouze ${formatList(jiParts)}.`;
                else if (jicenNormal) body = 'přiměřené šíře, bez ložiskového ztluštění stěny.';
                else body = `${formatList(jiParts)}.`;
                reportOut.push({ type: 'frame', text: `- Jícen: ${body}`, tableId: 'thorax_jicen_main' });
            }
            
            let jiConc = ctx.field('jicen_custom_conc');
            if (jiConc) jicenConc.push(jiConc);
            jicenConc.forEach(c => concInc.push({ type: 'frame', text: c, tableId: 'thorax_jicen_main' }));
            if (jicenNormal) {
                concMain.push({ type: 'frame', text: 'Přiměřený nález na jícnu.', tableId: 'thorax_jicen_main' });
            }

            let thZvet = ctx.isActive('th_zvet'), thAkt = ctx.isActive('th_akt');
            let thymusText = "";
            if (thZvet && thAkt) thymusText = "difuzně zvětšen s difuzně zvýšenou akumulací RF při reaktivaci";
            else if (thZvet) thymusText = "difuzně zvětšen po reaktivaci";
            else if (thAkt) thymusText = "s difuzně zvýšenou akumulací RF po reaktivaci";
            
            let thDesc = ctx.field('thymus_custom_desc');
            let thParts = [];
            if (thymusText) thParts.push(thymusText);
            if (thDesc) {
                let txt = thDesc.trim();
                if (txt.endsWith('.')) txt = txt.slice(0, -1);
                thParts.push(txt);
            }
            const thymusNormal = ctx.isActive('thymus_ost_add_normal');
            if (thymusNormal || thParts.length > 0) {
                let body;
                const thymusNormRep = isPET
                    ? 'obvyklé involuce, bez zvětšení a bez patologické akumulace RF'
                    : 'obvyklé involuce, bez zvětšení';
                if (thymusNormal && thParts.length > 0) body = `${thymusNormRep}. Jinak pouze ${formatList(thParts)}.`;
                else if (thymusNormal) body = `${thymusNormRep}.`;
                else body = `${formatList(thParts)}.`;
                reportOut.push({ type: 'frame', text: `- Thymus: ${body}`, tableId: 'thorax_thymus_main' });
            }
            
            let thConc = ctx.field('thymus_custom_conc');
            if (thConc) concInc.push({ type: 'frame', text: thConc, tableId: 'thorax_thymus_main' });
            if (thymusNormal) {
                concMain.push({ type: 'frame', text: 'Přiměřený nález na thymu.', tableId: 'thorax_thymus_main' });
            }

            let srdceRep = [];
            let srdceConc = [];
            let srDil = ctx.text('sr_dil');
            if (srDil !== '0' && srDil !== '') srdceRep.push(srDil === 'celého' ? "dilatace všech srdečních oddílů" : "dilatace srdečních síní");
            
            let srDilAo = ctx.text('sr_dil_ao');
            let srDilAoMm = parseInt(ctx.field('sr_dil_ao_mm')) || 0;
            if ((srDilAo && srDilAo !== '0') || srDilAoMm > 0) {
                let aoText = "";
                if (srDilAo === 'kořene') aoText = "dilatace kořene aorty";
                else if (srDilAo === 'ascendentní') aoText = "dilatace ascendentní aorty";
                else if (srDilAo === 'oboje') aoText = "dilatace kořene i ascendentní aorty";
                else aoText = "dilatace aorty";
                
                if (srDilAoMm) aoText += ` šíře ${srDilAoMm} mm`;
                srdceRep.push(aoText);
                
                let aoConcText = `${cap(aoText)}.`;
                if (srDilAoMm >= 50) {
                    concMain.push({ type: 'frame', text: `Výrazná ${aoText} (aneurysma).`, tableId: 'thorax_srdce_main' });
                } else if (srDilAoMm >= 40 || srDilAo !== '0') {
                    concInc.push({ type: 'frame', text: aoConcText, tableId: 'thorax_srdce_main' });
                }
            }

            let srChl = ctx.text('sr_chl');
            if (srChl !== '0' && srChl !== '') {
                if (srChl === 'obou') srdceRep.push("stav po náhradě Ao i Mi chlopně");
                else if (srChl === 'Ao+Asc R') srdceRep.push("stav po náhradě Ao chlopně a asc. aorty");
                else srdceRep.push(`stav po náhradě ${srChl} chlopně`);
            }
            if (ctx.isActive('sr_as')) srdceRep.push("aterosklerotické změny koronárních tepen");
            
            let srTekMm = parseInt(ctx.field('sr_tek_mm')) || 0;
            let srMinMm = parseInt(ctx.field('sr_tek_old_mm')) || 0;
            const hasPast = !!document.body.classList.contains('has-past-date');
            
            if (srTekMm || srMinMm) {
                if (!srTekMm) {
                    srdceRep.push(`tekutina v perikardiální dutině zcela regredovala (minule šíře ${srMinMm} mm)`);
                    srdceConc.push(`Perikardiální výpotek zcela regredoval.`);
                } else {
                    let dynState = "";
                    if (srMinMm && hasPast) {
                        if (srTekMm > srMinMm + 5) dynState = "v progresi";
                        else if (srTekMm < srMinMm - 5) dynState = "v regresi";
                        else dynState = "stacionární";
                    }
                    const mod = srTekMm >= 20 ? "výrazný " : (srTekMm <= 10 ? "malý " : "");
                    srdceRep.push(`tekutina v perikardiální dutině šíře ${srTekMm} mm${(srMinMm && hasPast) ? ` (minule šíře ${srMinMm} mm)` : ''}`);
                    srdceConc.push(`${cap(`${mod}perikardiální výpotek`)}${dynState ? ' ' + dynState : ''}.`);
                }
            }
            
            let srdceText = srdceRep.length > 0 ? formatCzechList(srdceRep) : "";
            let srDesc = ctx.field('srdce_custom_desc');
            let srParts = [];
            if (srdceText) srParts.push(srdceText);
            if (srDesc) {
                let txt = srDesc.trim();
                if (txt.endsWith('.')) txt = txt.slice(0, -1);
                srParts.push(txt);
            }
            const srdceNormal = ctx.isActive('srdce_ost_add_normal');
            if (srdceNormal || srParts.length > 0) {
                let body;
                if (srdceNormal && srParts.length > 0) body = `přiměřené velikosti, aorta přiměřené šíře, bez perikardiálního výpotku. Jinak pouze ${formatList(srParts)}.`;
                else if (srdceNormal) body = 'přiměřené velikosti, aorta přiměřené šíře, bez perikardiálního výpotku.';
                else body = `${formatList(srParts)}.`;
                reportOut.push({ type: 'frame', text: `- Srdce a cévy: ${body}`, tableId: 'thorax_srdce_main' });
            }
            
            let srConc = ctx.field('srdce_custom_conc');
            if (srConc) srdceConc.push(srConc);
            srdceConc.forEach(c => concMain.push({ type: 'frame', text: c, tableId: 'thorax_srdce_main' }));
            if (srdceNormal) {
                concMain.push({ type: 'frame', text: 'Přiměřený nález na srdci a velkých cévách.', tableId: 'thorax_srdce_main' });
            }

            let devMap = { dev_port: 'portkatetr', dev_picc: 'PICC', dev_cvk: 'CVK', dev_ks: 'KS', dev_icd: 'ICD' };
            let allDev = [];
            for (let k in devMap) {
                let p = ctx.isActive(`${k}_r`), l = ctx.isActive(`${k}_l`);
                if (!p && !l) continue;
                allDev.push(`${devMap[k]} ${(p && l) ? 'bilat.' : (p ? 'zprava' : 'zleva')}`);
            }
            let devText = allDev.length > 0 ? `zaveden ${formatList(allDev)}` : "";
            let devDesc = ctx.field('devices_custom_desc');
            let devParts = [];
            if (devText) devParts.push(devText);
            if (devDesc) {
                let txt = devDesc.trim();
                if (txt.endsWith('.')) txt = txt.slice(0, -1);
                devParts.push(txt);
            }
            const devicesNormal = ctx.isActive('devices_ost_add_normal');
            if (devicesNormal || devParts.length > 0) {
                let text;
                if (devicesNormal && devParts.length > 0) text = `Bez zavedených invazivních zařízení. Jinak pouze ${formatList(devParts)}.`;
                else if (devicesNormal) text = 'Bez zavedených invazivních zařízení.';
                else text = `${cap(formatList(devParts))}.`;
                reportOut.push({ type: 'frame', text: text, tableId: 'thorax_devices_main' });
            }
            
            let devConc = ctx.field('devices_custom_conc');
            if (devConc) concInc.push({ type: 'frame', text: devConc, tableId: 'thorax_devices_main' });
            if (devicesNormal) {
                concMain.push({ type: 'frame', text: 'Bez zavedených invazivních zařízení.', tableId: 'thorax_devices_main' });
            }

            let ostDesc = ctx.field('ostatni_custom_desc');
            let ostParts = [];
            if (ostDesc) {
                let txt = ostDesc.trim();
                if (txt.endsWith('.')) txt = txt.slice(0, -1);
                if (txt) ostParts.push(txt);
            }
            const ostatniNormal = ctx.isActive('ostatni_ost_add_normal');
            if (ostatniNormal || ostParts.length > 0) {
                let text;
                if (ostatniNormal && ostParts.length > 0) text = `Bez dalších významných nálezů. Jinak pouze ${formatList(ostParts)}.`;
                else if (ostatniNormal) text = 'Bez dalších významných nálezů.';
                else text = `${cap(formatList(ostParts))}.`;
                reportOut.push({ type: 'frame', text: text, tableId: 'thorax_ostatni_main' });
            }

            let ostConc = ctx.field('ostatni_custom_conc');
            if (ostConc) {
                concInc.push({ type: 'frame', text: ostConc, tableId: 'thorax_ostatni_main' });
            }
            if (ostatniNormal) {
                concMain.push({ type: 'frame', text: 'Bez dalších významných nálezů na hrudníku.', tableId: 'thorax_ostatni_main' });
            }

            return { report: reportOut, conclusion: { main: concMain, incidental: concInc } };
        }
    };

// Otevření / zavření ILD stromu při cyklu Fibrózy (bez zásahu do index.html).
// Nelze wrapovat cycleState — je lexikálně vázaný ve skriptu index.html.
(function installThoraxIldOpenHook() {
    function syncFromFibButton(btn) {
        if (!btn || btn.dataset.action !== 'cycle-state') return;
        const globalId = btn.dataset.id || '';
        if (!globalId.endsWith('_thorax_pl_fib')) return;
        const cfg = ButtonConfigs[globalId];
        const idx = Store.buttonStates[globalId] || 0;
        const state = cfg?.states?.[idx];
        if (state === 'ANO') Store.activeTable = 'thorax_ild_main';
        else if (state === '0' && Store.activeTable === 'thorax_ild_main') Store.activeTable = 'thorax_plice_main';
    }

    function onUiEvent(e) {
        const btn = e.target?.closest?.('button[data-action="cycle-state"]');
        if (btn) syncFromFibButton(btn);
    }

    const install = () => {
        // Bubble fáze po handlerech v index.html (ty se registrují dřív při parsování skriptu)
        document.addEventListener('click', onUiEvent);
        document.addEventListener('contextmenu', onUiEvent);
        document.addEventListener('wheel', onUiEvent, { passive: true });
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install);
    else install();
})();
