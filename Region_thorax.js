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

/* Rozhodovací strom ILD. Klíč uzlu = suffix id tlačítek (`ild_<klíč>_<volba>`).
   Volba vede buď na další uzel (next), nebo na výsledek (outcome = klíč v ILD_OUTCOMES). */
const ILD_TREE = {
    fib: {
        section: null,
        question: 'Jsou přítomny známky plicní fibrózy? (Retikulace, trakční bronchiektázie/bronchiolektázie, ztráta objemu plic, plástvovatění/honeycombing)',
        options: [{ id: 'ano', label: 'ANO', next: 'cpfe' }, { id: 'ne', label: 'NE', next: 'pat' }]
    },
    cpfe: {
        section: 'Fibrotizující procesy',
        question: 'Je přítomen syndrom CPFE? (Emfyzém/buly v horních lalocích + fibrotické změny v dolních lalocích u kuřáka)',
        options: [{ id: 'ano', label: 'ANO', outcome: 'cpfe' }, { id: 'ne', label: 'NE', next: 'uip' }]
    },
    uip: {
        section: 'Fibrotizující procesy',
        question: 'Je přítomno pravé plástvovatění (honeycombing) se subpleurální a bazální predominancí BEZ znaků inkonzistentních s UIP (kraniokaudální distribuce, nodulace, výrazné GGO, konsolidace, mozaika, cysty, pleurální pláty)?',
        options: [{ id: 'ano', label: 'ANO', outcome: 'uip' }, { id: 'ne', label: 'NE', next: 'prob' }]
    },
    prob: {
        section: 'Fibrotizující bez honeycombingu',
        question: 'Jsou přítomny retikulace a trakční bronchiektázie v subpleurální a bazální distribuci BEZ znaků inkonzistentních s UIP?',
        options: [{ id: 'ano', label: 'ANO', outcome: 'probable_uip' }, { id: 'ne', label: 'NE', next: 'morph' }]
    },
    morph: {
        section: 'Fibrotizující – jiné vzorce / Inkonzistentní s UIP',
        question: 'Jaká je distribuce a průvodní morfologie?',
        options: [
            { id: 'fhp', label: 'A', desc: 'Vzorec tří denzit (Three-density pattern) NEBO kraniokaudální dominance ve středních/horních polích. (Kombinace normálního parenchymu, GGO a mozaikové atenuace/air-trappingu).', outcome: 'fhp' },
            { id: 'nsip', label: 'B', desc: 'Relativní šetření (sparing) bezprostředního subpleurálního prostoru, axiálně podél peribronchovaskulárních svazků, často s GGO.', outcome: 'nsip_fib' },
            { id: 'asbest', label: 'C', desc: 'Pleurální pláty v kombinaci s retikulacemi bazálně/subpleurálně.', outcome: 'asbest' },
            { id: 'indet', label: 'D', desc: 'Nespecifické jemné retikulace bez jasné distribuce.', outcome: 'indeterminate' }
        ]
    },
    pat: {
        section: 'Nefibrotizující procesy',
        question: 'Jaký je dominantní morfologický vzorec?',
        options: [
            { id: 'nod', label: 'A', desc: 'Nodulární vzorec.', next: 'nod' },
            { id: 'dens', label: 'B', desc: 'Zvýšení denzity (GGO, konsolidace, crazy-paving).', next: 'dens' },
            { id: 'cyst', label: 'C', desc: 'Cystický vzorec (dutiny s tenkou stěnou < 2 mm, nesouvisející s emfyzémem).', next: 'cyst' },
            { id: 'ila', label: 'D', desc: 'Nevýrazné retikulace či GGO bez podezření na ILD.', outcome: 'ila' }
        ]
    },
    nod: {
        section: 'Nodulární vzorec',
        question: 'Jaká je distribuce uzlíků vůči sekundárnímu plicnímu lalůčku a pleuře?',
        options: [
            { id: 'peri', label: 'A', desc: 'Perilymfatická (podél interlobulárních sept, fisur, subpleurálně).', outcome: 'sarcoid' },
            { id: 'cent', label: 'B', desc: 'Centrilobulární (uzlíky šetří pleuru, > 2 mm od kraje lalůčku).', next: 'tib' },
            { id: 'rand', label: 'C', desc: 'Random / náhodná (uzlíky difuzně, asymetrické, zasahují pleuru bez preference).', outcome: 'random_nod' }
        ]
    },
    tib: {
        section: 'Centrilobulární uzlíky',
        question: 'Je přítomen „tree-in-bud“?',
        options: [{ id: 'ano', label: 'ANO', outcome: 'tib_inf' }, { id: 'ne', label: 'NE', outcome: 'nfhp_rb' }]
    },
    dens: {
        section: 'Zvýšení denzity',
        question: 'Jaký je charakter opacit?',
        options: [
            { id: 'op', label: 'A', desc: 'Plošné konsolidace (často peribronchovaskulárně/subpleurálně), migrující charakter, „reversed halo sign“ (atoll sign).', outcome: 'op' },
            { id: 'ggo', label: 'B', desc: 'Čisté GGO bez trakčních bronchiektázií (často difuzně nebo se šetřením pleury).', outcome: 'ggo_cell' },
            { id: 'crazy', label: 'C', desc: 'Crazy-paving (výrazné plošné GGO protkané ztluštělými septy).', outcome: 'crazy' }
        ]
    },
    cyst: {
        section: 'Cystický vzorec',
        question: 'Jaký je tvar, rozložení cyst a fenotyp pacienta?',
        options: [
            { id: 'plch', label: 'A', desc: 'Nepravidelné, bizardní cysty s noduly, v horních lalocích u kuřáků.', outcome: 'plch' },
            { id: 'lam', label: 'B', desc: 'Uniformní, pravidelné, tenkostěnné okrouhlé cysty difuzně ve všech polích u žen.', outcome: 'lam' },
            { id: 'lip', label: 'C', desc: 'Cysty v zónách GGO, úzký vztah k cévám (perivaskulární).', outcome: 'lip' },
            { id: 'bhd', label: 'D', desc: 'Paramediastinální a bazálně uložené cysty, často čočkovitého (lentiformního) tvaru.', outcome: 'bhd' }
        ]
    }
};

/* Projde strom podle aktuálních voleb:
   path = klíče uzlů k vykreslení (včetně dosud nezodpověděného),
   outcome = výsledek ILD_OUTCOMES, nebo null (větev není dokončená). */
function ildPath(examId) {
    const path = [];
    let key = 'fib';
    while (key) {
        const node = ILD_TREE[key];
        path.push(key);
        const opt = node.options.find(o => ildIsOn(examId, `ild_${key}_${o.id}`));
        if (!opt) return { path, outcome: null };
        if (opt.outcome) return { path, outcome: ILD_OUTCOMES[opt.outcome] || null };
        key = opt.next;
    }
    return { path, outcome: null };
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
    const { path, outcome } = ildPath(examId);
    const blocks = path.map(key => ildStepBlock(helpers, { ...ILD_TREE[key], exclId: `ild_${key}` }));

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
                'data-table': 'group:thorax_plice_main,thorax_pleura_main'
            })
        ]));
    }
    return table;
}

/* ═══════════════════════════════════════════════════════════
   PŘEDDEFINOVANÉ TEXTY — skupiny + orgány (editovat zde)
   findings = text ve Findings; conclusion = při normal!
   ═══════════════════════════════════════════════════════════ */
const RegionThorax_PREDEFS = {
    groups: {
        all: 'Adekvátní plicní objem a vzdušnost, orgány hrudníku bez patrné patologie.',
        allOtherwise: 'Jinak v hrudníku bez patrné ložiskové patologie.',
        plice_pleura: 'Plíce přiměřené vzdušnosti a kresby, bez ložiskových či difuzních změn. Pleurálně bez výpotku a bez pneumotoraxu.'
    },
    organs: {
        plice: { findings: 'přiměřené vzdušnosti a kresby, bez ložiskových či difuzních změn.', conclusion: 'Přiměřený nález na plicích, bez ložiskové léze.' },
        pleura: { findings: 'bez výpotku a bez pneumotoraxu.', conclusion: 'Bez výpotku a bez pneumotoraxu.' },
        mamma: { findings: 'obvyklého vzhledu, bez ložiskových změn.', conclusion: 'Přiměřený nález na mléčných žlázách, bez ložiskové léze.' },
        jicen: { findings: 'přiměřené šíře, bez ložiskového ztluštění stěny.', conclusion: 'Přiměřený nález na jícnu.' },
        thymus: {
            findings: 'bez ložiskových změn .',
            findingsPet: 'bez ložiskových změn a bez patologické akumulace RF.',
            conclusion: 'Přiměřený nález v mediastinu.'
        },
        srdce: { findings: 'přiměřené velikosti, aorta přiměřené šíře, bez perikardiálního výpotku.', conclusion: 'Přiměřený nález na srdci a velkých cévách.' }
    },
    devices: { findings: 'Bez zavedených invazivních zařízení.', conclusion: 'Bez zavedených invazivních zařízení.' },
    ostatni: { findings: 'Bez dalších významných nálezů.', conclusion: 'Bez dalších významných nálezů na hrudníku.' }
};

const RegionThorax = {
        title: 'Hrudník',
    predefs: RegionThorax_PREDEFS,

    /* Virtuální skupiny orgánů (režim z nastavení „Rozepisování orgánů“).
       `all` = nadskupina pro režim „vůbec“; ostatní = podskupiny pro „jen skupiny“ / „skupiny i orgány“.
       Devices a ostatní nejsou ve skupinách. */
    virtualGroups: [
        {
            id: 'all',
            name: 'Orgány hrudníku',
            members: ['plice', 'pleura', 'mamma', 'jicen', 'thymus', 'srdce'],
            tableId: 'group:thorax_plice_main,thorax_pleura_main,thorax_mamma_main,thorax_jicen_main,thorax_thymus_main,thorax_srdce_main',
            text: RegionThorax_PREDEFS.groups.all,
            otherwiseText: RegionThorax_PREDEFS.groups.allOtherwise
        },
        {
            id: 'plice_pleura',
            name: 'Plíce a pleura',
            members: ['plice', 'pleura'],
            tableId: 'group:thorax_plice_main,thorax_pleura_main',
            text: RegionThorax_PREDEFS.groups.plice_pleura
        }
    ],

    organOrder: ['plice', 'pleura', 'mamma', 'jicen', 'thymus', 'srdce'],

    /* Nabídky stavů na jednom místě - v layoutu se odkazuje jako { btn: 'plus', id: 'ma_mast_r' }. */
    buttons: {
        plus:    { states: ['0', '+'] },
        pocet:   { states: ['0', '1', 'více'] },
        cystoid: { states: ['0', 'cystoid', 'kombinace', 'solidní'] },
        /* plicní segmenty podle laloku */
        seg_hl:  { states: ['0', '+', 'S1', 'S2', 'S3'] },
        seg_sl:  { states: ['0', '+', 'S4', 'S5'] },
        seg_dl:  { states: ['0', '+', 'S6', 'S7', 'S8', 'S9', 'S10'] },
        seg_ma:  { states: ['0', 'HZK', 'HVK', 'DVK', 'DZK'] },
        jicen:   { states: ['jícen', 'horní', 'střední', 'dolní'] },
        /* plicní operace: pravé plíce mají navíc střední lalok */
        lalok_r: { states: ['0', 'H', 'S', 'D'] },
        lalok_l: { states: ['0', 'H', 'D'] },
        /* TNM uzlina: popisek přebírá z tabulky lnTnm */
        ln:      { type: 'basic' }
    },

    /* Lokalizace ložiska: [klíč, popisek, nabídka stavů]. */
    sites: [
        ['pulm', 'plíce', 'plus'], ['hl', 'horní lalok', 'seg_hl'],
        ['sl', 'střední lalok / lingula', 'seg_sl'], ['dl', 'dolní lalok', 'seg_dl'],
        ['pl', 'pleura', 'plus'], ['sw', 'hrudní stěna', 'plus'],
        ['ma', 'mamma', 'seg_ma'], ['th', 'thymus', 'plus']
    ],

    /* TNM uzliny: [klíč, vpravo, střed, vlevo]; null = bez tlačítka.
       med/hil/axi/im nejsou "regie" - v závěru mají vlastní formulaci. */
    lnTnm: [
        ['med', 'Med', 'Med', 'Med'],
        ['1', '1R', null, '1L'],
        ['2', '2R', null, '2L'],
        ['3a', null, '3A', null],
        ['3p', null, '3P', null],
        ['4', '4R', null, '4L'],
        ['5', null, '5', null],
        ['6', null, '6', null],
        ['7', null, '7', null],
        ['8', null, '8', null],
        ['hil', 'Hilus', null, 'Hilus'],
        ['10', '10R', null, '10L'],
        ['11', '11-14R', null, '11-14L'],
        ['axi', 'Axila', null, 'Axila'],
        ['im', 'IM', null, 'IM']
    ],
    lnTnmMimoRegie: ['med', 'hil', 'axi', 'im'],

        layout: (helpers) => {
            let layoutNodes = [];
            /* Rozměrové pole v mm (step 5, u aorty 1). */
            const mm = (id, step = 5) => ({ field: 'mm', id, placeholder: 'mm', step });

            const lesInsts = getExamInstances('thorax_lesion_main');
            lesInsts.forEach((instId, idx) => {
                const p = `tl_${instId}`;
                layoutNodes.push(
                    helpers.LesionMain(`thorax_lesion_main__${instId}`, `Léze (${idx + 1})`, [
                        ...LESIONS_DEFINITION.getLesionRowsPre(helpers, p, 'konsolidace'),
                        helpers.Table3colRCL(`${p}_r3`, 'Lokalizace', [
                            ...RegionThorax.sites.map(([site, label, btn]) => [
                                { btn, id: `${p}_p_${site}_r` }, label, { btn, id: `${p}_p_${site}_l` }
                            ]),
                            [ '', { btn: 'jicen', id: `${p}_p_ji` }, '' ]
                        ]),
                        ...LESIONS_DEFINITION.getLesionRowsPost(helpers, p, `${p}_met`, `${p}_e`)
                    ])
                );
            });

            const lnInsts = getExamInstances('thorax_lymphnode_main');
            lnInsts.forEach((instId, idx) => {
                const p = `tln_${instId}`;
                layoutNodes.push(
                    helpers.LesionMain(`thorax_lymphnode_main__${instId}`, `Lymfadenopatie (${idx + 1})`, [
                        ...LESIONS_DEFINITION.getLymphNodeRowsPre(helpers, p),
                        helpers.Table3colRCL(`${p}_r3`, 'Lokalizace', RegionThorax.lnTnm.map(([key, ...cells]) => cells.map((text, i) => (
                            text ? { btn: 'ln', id: `${p}_p_${key}_${'rcl'[i]}`, text } : ''
                        )))),
                        ...LESIONS_DEFINITION.getLymphNodeRowsPost(helpers, p, `${p}_met`, `${p}_e`)
                    ])
                );
            });

            layoutNodes.push(
                helpers.TableMain('thorax_plice_main', 'Plíce', [
                    helpers.Table3colRL('plice_fokal_table', 'Fokální změny', [
                        [ { btn: 'pocet', id: 'pl_mikro_r' }, 'mikronodul', { btn: 'pocet', id: 'pl_mikro_l' } ],
                        [ { btn: 'pocet', id: 'pl_nodul_r' }, 'nodul', { btn: 'pocet', id: 'pl_nodul_l' } ],
                        [ { btn: 'pocet', id: 'pl_opac_r' }, 'opacita', { btn: 'pocet', id: 'pl_opac_l' } ],
                        [ { btn: 'pocet', id: 'pl_kons_r' }, 'konsolidace', { btn: 'pocet', id: 'pl_kons_l' } ],
                        [ { btn: 'pocet', id: 'pl_hypo_r' }, 'hypoventilace', { btn: 'pocet', id: 'pl_hypo_l' } ],
                        [ { btn: 'pocet', id: 'pl_jizva_r' }, 'jizva', { btn: 'pocet', id: 'pl_jizva_l' } ],
                        [ { btn: 'plus', id: 'pl_rad_r' }, 'poradiační', { btn: 'plus', id: 'pl_rad_l' } ]
                    ]),
                    helpers.Table2colNormal('plice_difuz_table', 'Difuzní změny',[
                        [ 'Fibróza:', { btn: 'pl_fib', states: ['0', 'ANO'] } ],
                        [ 'Emfyzém:', { btn: 'pl_emf', states: ['0', 'parasept.', 'centrilob.', 'panacin.'] }, { btn: 'pl_emf_loc', states: ['distr.', 'apikálně', 'všude', 'bazálně'] } ]
                    ]),
                    helpers.Table3colRL('plice_op_table', 'Operace plic', [
                        [ { btn: 'plus', id: 'pl_op_pulm_r' }, 'pulmonektomie', { btn: 'plus', id: 'pl_op_pulm_l' } ],
                        [ { btn: 'lalok_r', id: 'pl_op_lob_r' }, 'lobektomie', { btn: 'lalok_l', id: 'pl_op_lob_l' } ],
                        [ { btn: 'lalok_r', id: 'pl_op_res_r' }, 'resekce', { btn: 'lalok_l', id: 'pl_op_res_l' } ]
                    ]),
                    helpers.Table1col('plice_ost_add', [
                        { field: 'text', id: 'plice_custom_desc', placeholder: 'vlastní...popis...' },
                        { field: 'text', id: 'plice_custom_conc', placeholder: 'vlastní...závěr...' }
                    ], { normal: true })
                ]),
                helpers.TableMain('thorax_pleura_main', 'Pleura', [
                    helpers.Table3colRL('pleura_ost_table', [
                        [ mm('pl_tek_r'), 'tekutina:', mm('pl_tek_l')],
                        [ mm('pl_tek_old_r'), 'minule:', mm('pl_tek_old_l') ],
                        [ mm('pl_vzd_r'), 'vzduch:', mm('pl_vzd_l')],
                        [ mm('pl_vzd_old_r'), 'minule:', mm('pl_vzd_old_l') ],
                        [ { btn: 'plus', id: 'pl_akt_r' }, 'RF+', { btn: 'plus', id: 'pl_akt_l' } ],
                        [ { btn: 'plus', id: 'pl_talk_r' }, 'talkáž', { btn: 'plus', id: 'pl_talk_l' } ]
                    ]),
                    helpers.Table1col('pleura_ost_add', [
                        { field: 'text', id: 'pleura_custom_desc', placeholder: 'vlastní...popis...' },
                        { field: 'text', id: 'pleura_custom_conc', placeholder: 'vlastní...závěr...' }
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
                        [ { btn: 'plus', id: 'ma_mast_r' }, 'mastektomie', { btn: 'plus', id: 'ma_mast_l' } ],
                        [ { btn: 'plus', id: 'ma_kvad_r' }, 'kvadrantektomie', { btn: 'plus', id: 'ma_kvad_l' } ],
                        [ { btn: 'plus', id: 'ma_res_r' }, 'resekce', { btn: 'plus', id: 'ma_res_l' } ],
                        [ { btn: 'plus', id: 'ma_nahr_r' }, 'náhrada', { btn: 'plus', id: 'ma_nahr_l' } ],
                        [ { btn: 'plus', id: 'ma_aug_r' }, 'augmentace', { btn: 'plus', id: 'ma_aug_l' } ],
                        [ { btn: 'plus', id: 'ma_koz_r' }, 'kožní zesílení', { btn: 'plus', id: 'ma_koz_l' } ]
                    ]),
                    helpers.Table1col('mamma_ost_add', [
                        { field: 'text', id: 'mamma_custom_desc', placeholder: 'vlastní...popis...' },
                        { field: 'text', id: 'mamma_custom_conc', placeholder: 'vlastní...závěr...' }
                    ], { normal: true })
                ]),
                helpers.TableMain('thorax_jicen_main', 'Jícen', [
                    helpers.Table2colNormal('jicen_table', [
                        [ 'Hiátová hernie', { btn: 'ji_hernie', states: ['0', 'drobná', 'větší', 'upside-down'] } ],
                        [ 'RF+ distálně', { btn: 'plus', id: 'ji_aktdist' } ],
                        [ 'RF+ difuzně', { btn: 'plus', id: 'ji_aktdif' } ],
                        [ 'Resekce', { btn: 'ji_res', states: ['0', '+', 'žaludek', 'tračník'] } ]
                    ]),
                    helpers.Table1col('jicen_ost_add', [
                        { field: 'text', id: 'jicen_custom_desc', placeholder: 'vlastní...popis...' },
                        { field: 'text', id: 'jicen_custom_conc', placeholder: 'vlastní...závěr...' }
                    ], { normal: true })
                ]),
                helpers.TableMain('thorax_thymus_main', 'Mediastinum', [
                    helpers.Table2colNormal('thymus_table', [
                        [ 'Thymus - zvětšení', { btn: 'plus', id: 'th_zvet' } ],
                        [ 'Thymus RF+', { btn: 'plus', id: 'th_akt' } ],
                        [ 'Přední med.', { btn: 'cystoid', id: 'th_med_pred' } ],
                        [ 'Střední med.', { btn: 'cystoid', id: 'th_med_stred' } ],
                        [ 'Zadní med.', { btn: 'cystoid', id: 'th_med_zad' } ]
                    ]),
                    helpers.Table1col('thymus_ost_add', [
                        { field: 'text', id: 'thymus_custom_desc', placeholder: 'vlastní...popis...' },
                        { field: 'text', id: 'thymus_custom_conc', placeholder: 'vlastní...závěr...' }
                    ], { normal: true })
                ]),
                helpers.TableMain('thorax_srdce_main', 'Srdce', [
                    helpers.Table2colNormal('srdce_table', [
                        [ 'Dilatace srdce', { btn: 'sr_dil', states: ['0', 'síní', 'celého'] } ],
                        [ 'Dilatace aorty', { btn: 'sr_dil_ao', states: ['0', 'kořene', 'ascendentní', 'oboje'] }, mm('sr_dil_ao_mm', 1) ],
                        [ 'Náhrada chlopně', { btn: 'sr_chl', states: ['0', 'Ao', 'Mi', 'obou', 'Ao+Asc R'] } ],
                        [ 'AS koronárek', { btn: 'plus', id: 'sr_as' } ],
                        [ 'Perikard. výpotek:', mm('sr_tek_mm') ],
                        [ 'Minule:', mm('sr_tek_old_mm') ]
                    ]),
                    helpers.Table1col('srdce_ost_add', [
                        { field: 'text', id: 'srdce_custom_desc', placeholder: 'vlastní...popis...' },
                        { field: 'text', id: 'srdce_custom_conc', placeholder: 'vlastní...závěr...' }
                    ], { normal: true })
                ]),
                helpers.TableMain('thorax_devices_main', 'Devices', [
                    helpers.Table3colRL('devices_table', [
                        [ { btn: 'plus', id: 'dev_port_r' }, 'portkatetr', { btn: 'plus', id: 'dev_port_l' } ],
                        [ { btn: 'plus', id: 'dev_picc_r' }, 'PICC', { btn: 'plus', id: 'dev_picc_l' } ],
                        [ { btn: 'plus', id: 'dev_cvk_r' }, 'CVK', { btn: 'plus', id: 'dev_cvk_l' } ],
                        [ { btn: 'plus', id: 'dev_ks_r' }, 'KS', { btn: 'plus', id: 'dev_ks_l' } ],
                        [ { btn: 'plus', id: 'dev_icd_r' }, 'ICD', { btn: 'plus', id: 'dev_icd_l' } ]
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
            const isPET = (examId || '').toLowerCase().includes('pet');
            const toOrgans = shouldPlaceLesionsInOrgans(examId);
            const expandMode = getOrganExpandMode(examId);
            const { organBag, emitOrgan, flush } = createOrganExpandState(ctx, { reportOut, concMain, concInc });
            const OP = RegionThorax_PREDEFS.organs;

            const THORAX_SITE_ORGAN = {
                pulm: 'plice', hl: 'plice', sl: 'plice', dl: 'plice',
                pl: 'pleura', sw: 'mamma', ma: 'mamma', th: 'thymus', ji: 'jicen'
            };

            const lesInsts = getExamInstances('thorax_lesion_main', examId);
            let highAct = false, badEtio = false;
            lesInsts.forEach(id => {
                if (['intermediární', 'zvýšená', 'vysoká'].includes(ctx.text(`tl_${id}_met_act`, true))) highAct = true;
                if (!ctx.isActive(`tl_${id}_e_b`) && !ctx.isActive(`tl_${id}_e_inf`)) badEtio = true;
            });

            const pendingLes = [];
            lesInsts.forEach(instId => {
                const p = `tl_${instId}`;
                    const lokaceByOrg = {};
                    const addLok = (key, text) => {
                        if (!key || !text) return;
                        (lokaceByOrg[key] ||= []).push(text);
                    };
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
                            const orgKey = THORAX_SITE_ORGAN[l.id];
                            
                            if (['hl', 'sl', 'dl'].includes(l.id)) {
                                if (r && left) {
                                    if (l.id === 'sl') {
                                        addLok(orgKey, `ve středním laloku pravé plíce${segR} a v lingule levé plíce${segL}`);
                                    } else {
                                        if (segR === segL) addLok(orgKey, `${l.name} obou plic${segR}`);
                                        else addLok(orgKey, `${l.name} pravé plíce${segR} a ${l.name} levé plíce${segL}`);
                                    }
                                } else if (r) {
                                    let nameR = l.id === 'sl' ? 've středním laloku' : l.name;
                                    addLok(orgKey, `${nameR} pravé plíce${segR}`);
                                } else if (left) {
                                    let nameL = l.id === 'sl' ? 'v lingule' : l.name;
                                    addLok(orgKey, `${nameL} levé plíce${segL}`);
                                }
                            } else {
                                if (r && left) addLok(orgKey, `${l.name}${segR} bilat.`);
                                else if (r) addLok(orgKey, `${l.name}${segR} vpravo`);
                                else if (left) addLok(orgKey, `${l.name}${segL} vlevo`);
                            }
                        }
                    });
                    
                    if (ctx.isActive(`${p}_p_pulm_r`) && ctx.isActive(`${p}_p_pulm_l`)) {
                        addLok('plice', 'v obou plicích');
                    } else if (ctx.isActive(`${p}_p_pulm_r`)) {
                        addLok('plice', 'v pravé plíci');
                    } else if (ctx.isActive(`${p}_p_pulm_l`)) {
                        addLok('plice', 'v levé plíci');
                    }
                    
                    if (ctx.isActive(`${p}_p_ji`)) {
                        let jiVal = ctx.text(`${p}_p_ji`);
                        if (jiVal === 'horní') addLok('jicen', 'v horním jícnu');
                        else if (jiVal === 'střední') addLok('jicen', 've středním jícnu');
                        else if (jiVal === 'dolní') addLok('jicen', 'v dolním jícnu');
                        else addLok('jicen', 'v jícnu');
                    }

                    queueLesionForOrgans(pendingLes, concMain, ctx, {
                        examId, regionId: 'thorax', p, tableId: `thorax_lesion_main__${instId}`
                    }, lokaceByOrg, { toOrgans });
                });

            const pendingLn = [];
            const lnInsts = getExamInstances('thorax_lymphnode_main', examId);
            lnInsts.forEach(instId => {
                const p = `tln_${instId}`;
                const lokaceByOrg = {};
                const addLok = (key, text) => {
                    if (!key || !text) return;
                    (lokaceByOrg[key] ||= []).push(text);
                };

                let med_p = ctx.isActive(`${p}_p_med_r`), med_c = ctx.isActive(`${p}_p_med_c`), med_l = ctx.isActive(`${p}_p_med_l`);
                if (med_p && med_l) addLok('thymus', 'v mediastinu bilat.');
                else if (med_c) addLok('thymus', 'v mediastinu');
                else if (med_p) addLok('thymus', 'v mediastinu vpravo');
                else if (med_l) addLok('thymus', 'v mediastinu vlevo');

                let activeRegs = [];
                RegionThorax.lnTnm.forEach(([key, r, c, l]) => {
                    if (RegionThorax.lnTnmMimoRegie.includes(key)) return;
                    if (r && ctx.isActive(`${p}_p_${key}_r`)) activeRegs.push(r);
                    if (c && ctx.isActive(`${p}_p_${key}_c`)) activeRegs.push(c);
                    if (l && ctx.isActive(`${p}_p_${key}_l`)) activeRegs.push(l);
                });

                if (activeRegs.length > 0) {
                    let prefix = activeRegs.length > 1 ? 'v regiích' : 'v regiu';
                    addLok('thymus', `${prefix} ${activeRegs.join(', ')}`);
                }

                let hil_r = ctx.isActive(`${p}_p_hil_r`), hil_l = ctx.isActive(`${p}_p_hil_l`);
                if (hil_r && hil_l) addLok('thymus', 'v obou hilech');
                else if (hil_r) addLok('thymus', 'v pravém hilu');
                else if (hil_l) addLok('thymus', 'v levém hilu');

                let axi_r = ctx.isActive(`${p}_p_axi_r`), axi_l = ctx.isActive(`${p}_p_axi_l`);
                if (axi_r && axi_l) addLok('mamma', 'v obou axilách');
                else if (axi_r) addLok('mamma', 'v pravé axile');
                else if (axi_l) addLok('mamma', 'v levé axile');

                let im_r = ctx.isActive(`${p}_p_im_r`), im_l = ctx.isActive(`${p}_p_im_l`);
                if (im_r && im_l) addLok('mamma', 'interní mammární bilat.');
                else if (im_r) addLok('mamma', 'interní mammární vpravo');
                else if (im_l) addLok('mamma', 'interní mammární vlevo');

                queueLesionForOrgans(pendingLn, concMain, ctx, {
                    examId, regionId: 'thorax', p, tableId: `thorax_lymphnode_main__${instId}`, isLN: true
                }, lokaceByOrg, { toOrgans });
            });

            let hasLesFindings = pendingLes.length > 0;
            let hasLnFindings = pendingLn.length > 0;
            let orphanLes = false;

            if (!toOrgans) {
                const lesStart = reportOut.length;
                pendingLes.forEach(item => reportOut.push(item.report));
                if (!hasLesFindings || (isPET && !highAct)) {
                    reportOut.splice(lesStart, 0, LESIONS_DEFINITION.virtualPredef(
                        'thorax_lesion_main', LESIONS_DEFINITION.predefText.lesion(isPET)));
                }
                if (hasLesFindings && (!isPET || highAct) && !badEtio) {
                    reportOut.push(LESIONS_DEFINITION.virtualPredef(
                        'thorax_lesion_main', LESIONS_DEFINITION.predefText.lesionJinak));
                }
                pendingLn.forEach(item => reportOut.push(item.report));
                if (!hasLnFindings) {
                    reportOut.push(LESIONS_DEFINITION.virtualPredef(
                        'thorax_lymphnode_main', LESIONS_DEFINITION.predefText.lymph(isPET)));
                }
            } else if (!hasLesFindings || (isPET && !highAct)) {
                /* U PET bez vysoké aktivity zůstává negativní text nahoře i při zápisu k orgánům. */
                reportOut.push(LESIONS_DEFINITION.virtualPredef(
                    'thorax_lesion_main', LESIONS_DEFINITION.predefText.lesion(isPET)));
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
                    concInc.push({ type: 'frame', text: `${capitalize(emfFull)} plicní emfyzém${loc.conc}.`, tableId: 'thorax_plice_main' });
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
            
            let allOps = [];
            if (ctx.isActive('pl_op_pulm_r')) allOps.push('pulmonektomii pravé plíce');
            if (ctx.isActive('pl_op_pulm_l')) allOps.push('pulmonektomii levé plíce');

            const lobMapR = { H: 'lobektomii horního laloku pravé plíce', S: 'lobektomii středního laloku pravé plíce', D: 'lobektomii dolního laloku pravé plíce' };
            const lobMapL = { H: 'lobektomii horního laloku levé plíce', D: 'lobektomii dolního laloku levé plíce' };
            const resMapR = { H: 'resekci v horním laloku pravé plíce', S: 'resekci ve středním laloku pravé plíce', D: 'resekci v dolním laloku pravé plíce' };
            const resMapL = { H: 'resekci v horním laloku levé plíce', D: 'resekci v dolním laloku levé plíce' };

            let lobR = ctx.text('pl_op_lob_r'), lobL = ctx.text('pl_op_lob_l');
            if (lobR && lobMapR[lobR]) allOps.push(lobMapR[lobR]);
            if (lobL && lobMapL[lobL]) allOps.push(lobMapL[lobL]);

            let resR = ctx.text('pl_op_res_r'), resL = ctx.text('pl_op_res_l');
            if (resR && resMapR[resR]) allOps.push(resMapR[resR]);
            if (resL && resMapL[resL]) allOps.push(resMapL[resL]);

            let pliceDesc = ctx.field('plice_custom_desc');
            const ildOutcome = (fib === 'ANO') ? ildPath(examId).outcome : null;
            
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

            emitOrgan('plice', {
                label: 'Plíce', tableId: 'thorax_plice_main',
                normal: 'plice_ost_add_normal',
                normalText: OP.plice.findings,
                normalConc: OP.plice.conclusion,
                predef: 'plice_ost_add_predef',
                predefText: OP.plice.findings,
                concField: 'plice_custom_conc',
                parts: [plicePhrases.join(', ')]
            });
            if (ildOutcome) {
                let concTxt = ildOutcome.conc;
                if (ildOutcome.recommend) concTxt += ' ' + ildOutcome.recommend;
                concMain.push({ type: 'frame', text: concTxt, tableId: 'thorax_ild_main' });
            }

            let pleuraRep = [];
            let pleuraMain = [];
            let pleuraInc = [];
            let tekR = parseInt(ctx.field('pl_tek_r')) || 0, tekL = parseInt(ctx.field('pl_tek_l')) || 0;
            let minR = parseInt(ctx.field('pl_tek_old_r')) || 0, minL = parseInt(ctx.field('pl_tek_old_l')) || 0;
            let vzdR = parseInt(ctx.field('pl_vzd_r')) || 0, vzdL = parseInt(ctx.field('pl_vzd_l')) || 0;
            let vzdMinR = parseInt(ctx.field('pl_vzd_old_r')) || 0, vzdMinL = parseInt(ctx.field('pl_vzd_old_l')) || 0;
            const hasMin = !!document.body.classList.contains('has-past-date');

            const emitPleuraMm = (curR, curL, oldR, oldL, noun, nounBilat, nounConc) => {
                if (!(curR || curL || oldR || oldL)) return;
                const getSide = (v, m, s) => {
                    if (!v && !m) return null;
                    if (!v) return { r: `${s} ${noun} zcela regredoval${noun.endsWith('a') ? 'a' : ''} (minule šíře ${m} mm)`, c: `${nounConc} ${s} zcela regredoval`, reg: 1 };
                    let dynState = "";
                    if (m && hasMin) {
                        if (v > m + 5) dynState = "v progresi";
                        else if (v < m - 5) dynState = "v regresi";
                        else dynState = "stacionární";
                    }
                    const mod = v >= 40 ? "výrazný " : (v <= 15 ? "malý " : "");
                    return { r: `šíře ${v} mm ${s}${(m && hasMin) ? ` (minule šíře ${m} mm)` : ''}`, c: `${mod}${nounConc} ${s}${dynState ? ' ' + dynState : ''}`.trim(), reg: 0, mod, dynState };
                };
                let R = getSide(curR, oldR, 'vpravo'), L = getSide(curL, oldL, 'vlevo');
                let concl = '';
                if (R && L && R.reg && L.reg) {
                    pleuraRep.push(`${nounBilat} bilat. zcela regredoval${nounBilat.endsWith('a') ? 'a' : ''} (minule vpravo šíře ${oldR} mm, vlevo šíře ${oldL} mm)`);
                    concl = `${nounConc} bilat. zcela regredoval`;
                } else if (R && L && !R.reg && !L.reg) {
                    pleuraRep.push(`${noun} ${R.r} a ${L.r}`);
                    concl = (R.mod === L.mod && R.dynState === L.dynState) ? `${R.mod}${nounConc} bilat.${R.dynState ? ' ' + R.dynState : ''}`.trim() : `${R.c}, ${L.c}`;
                } else {
                    let fmt = X => X.reg ? X.r : `${noun} ${X.r}`;
                    pleuraRep.push(R && L ? `${fmt(R)}, ${fmt(L)}` : fmt(R || L));
                    concl = [R?.c, L?.c].filter(Boolean).join(', ');
                }
                pleuraMain.push(`${capitalize(concl)}.`.replace('..', '.'));
            };

            emitPleuraMm(tekR, tekL, minR, minL, 'tekutina', 'tekutina', 'fluidothorax');
            emitPleuraMm(vzdR, vzdL, vzdMinR, vzdMinL, 'vzduch', 'vzduch', 'PNO');
            
            ['pl_akt', 'pl_talk'].forEach(k => {
                let p = ctx.isActive(`${k}_r`), l = ctx.isActive(`${k}_l`);
                if (!p && !l) return;
                let side = p && l ? 'bilat.' : (p ? 'vpravo' : 'vlevo');
                if (k === 'pl_akt') {
                    pleuraRep.push(`zvýšená akumulace RF ${side} bez zřetelného zesílení`);
                    pleuraInc.push(`Zvýšená aktivita pleurálně ${side} bez patrné infiltrace: v.s. reaktivně / v rámci zánětu.`);
                } else {
                    pleuraRep.push(`difuzní pleurální zesílení s vysokou akumulací RF ${side} po talkáži`);
                    pleuraInc.push(`Pleurální reaktivní změny s vysokou aktivitou ${side} po talkáži.`);
                }
            });

            emitOrgan('pleura', {
                label: 'Pleurálně', tableId: 'thorax_pleura_main',
                desc: 'pleura_custom_desc',
                normal: 'pleura_ost_add_normal',
                normalText: OP.pleura.findings,
                normalConc: OP.pleura.conclusion,
                predef: 'pleura_ost_add_predef',
                predefText: OP.pleura.findings,
                concField: 'pleura_custom_conc',
                parts: [pleuraRep.length ? formatCzechList(pleuraRep) : ''],
                main: pleuraMain,
                incidental: pleuraInc
            });

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
            emitOrgan('mamma', {
                label: 'Mamma', tableId: 'thorax_mamma_main', desc: 'mamma_custom_desc',
                normal: 'mamma_ost_add_normal',
                normalText: OP.mamma.findings,
                normalConc: OP.mamma.conclusion,
                predef: 'mamma_ost_add_predef',
                predefText: OP.mamma.findings,
                concField: 'mamma_custom_conc',
                parts: [mammaText]
            });

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
            emitOrgan('jicen', {
                label: 'Jícen', tableId: 'thorax_jicen_main', desc: 'jicen_custom_desc',
                normal: 'jicen_ost_add_normal',
                normalText: OP.jicen.findings,
                normalConc: OP.jicen.conclusion,
                predef: 'jicen_ost_add_predef',
                predefText: OP.jicen.findings,
                concField: 'jicen_custom_conc',
                incidental: jicenConc,
                parts: [jicenText]
            });

            let thZvet = ctx.isActive('th_zvet'), thAkt = ctx.isActive('th_akt');
            let thymusText = "";
            if (thZvet && thAkt) thymusText = "thymus difuzně zvětšen s difuzně zvýšenou akumulací RF při reaktivaci";
            else if (thZvet) thymusText = "thymus difuzně zvětšen po reaktivaci";
            else if (thAkt) thymusText = "thymus s difuzně zvýšenou akumulací RF po reaktivaci";
            
            let thDesc = ctx.field('thymus_custom_desc');
            let thParts = [];
            if (thymusText) thParts.push(thymusText);
            if (thDesc) {
                let txt = thDesc.trim();
                if (txt.endsWith('.')) txt = txt.slice(0, -1);
                thParts.push(txt);
            }
            const thymusDgConc = [];
            [
                {
                    id: 'th_med_pred', loc: 'v předním mediastinu',
                    dg: {
                        'cystoid':    'thymická cysta, teratom, bronchogenní cysta',
                        'kombinace':  'thymom s cystickou složkou, teratom, lymfom',
                        'solidní':    'thymom, lymfom, germinální tumor, hyperplázie thymu, retrosternální struma'
                    }
                },
                {
                    id: 'th_med_stred', loc: 've středním mediastinu',
                    dg: {
                        'cystoid':    'bronchogenní cysta, perikardiální cysta, duplikatura jícnu',
                        'kombinace':  'lymfom s nekrózou/cystickou složkou, metastáza, teratom',
                        'solidní':    'lymfadenopatie (lymfom, sarkoidóza, metastázy), bronchogenní tumor'
                    }
                },
                {
                    id: 'th_med_zad', loc: 'v zadním mediastinu',
                    dg: {
                        'cystoid':    'neuroenterická cysta, meningokéla',
                        'kombinace':  'neurogenní tumor s cystickou složkou, ganglioneurom',
                        'solidní':    'neurogenní tumor (schwannom, neurofibrom, ganglioneurom)'
                    }
                }
            ].forEach(({ id, loc, dg }) => {
                const st = ctx.text(id);
                if (!dg[st]) return;
                const rep = st === 'cystoid' ? `cystoidní léze ${loc}`
                          : st === 'kombinace' ? `cystoidně-solidní léze ${loc}`
                          : `solidní ložisko ${loc}`;
                thParts.push(rep);
                const conc = st === 'cystoid' ? `Cystoidní léze ${loc} - dif. dg.: ${dg[st]}.`
                           : st === 'kombinace' ? `Cystoidně-solidní léze ${loc} - dif. dg.: ${dg[st]}.`
                           : `Solidní ložisko ${loc} - dif. dg.: ${dg[st]}.`;
                thymusDgConc.push(conc);
            });
            emitOrgan('thymus', {
                label: 'Mediastinum', tableId: 'thorax_thymus_main', desc: 'thymus_custom_desc',
                normal: 'thymus_ost_add_normal',
                normalText: isPET ? OP.thymus.findingsPet : OP.thymus.findings,
                normalConc: OP.thymus.conclusion,
                predef: 'thymus_ost_add_predef',
                predefText: isPET ? OP.thymus.findingsPet : OP.thymus.findings,
                concField: 'thymus_custom_conc',
                incidental: thymusDgConc,
                parts: thParts
            });

            let srdceRep = [];
            let srdceConc = [];
            let srdceInc = [];
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
                
                let aoConcText = `${capitalize(aoText)}.`;
                if (srDilAoMm >= 50) {
                    srdceConc.push(`Výrazná ${aoText} (aneurysma).`);
                } else if (srDilAoMm >= 40 || srDilAo !== '0') {
                    srdceInc.push(aoConcText);
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
                    srdceConc.push(`${capitalize(`${mod}perikardiální výpotek`)}${dynState ? ' ' + dynState : ''}.`);
                }
            }
            
            let srdceText = srdceRep.length > 0 ? formatCzechList(srdceRep) : "";
            emitOrgan('srdce', {
                label: 'Srdce', tableId: 'thorax_srdce_main', desc: 'srdce_custom_desc',
                normal: 'srdce_ost_add_normal',
                normalText: OP.srdce.findings,
                normalConc: OP.srdce.conclusion,
                predef: 'srdce_ost_add_predef',
                predefText: OP.srdce.findings,
                concField: 'srdce_custom_conc', concTarget: 'main',
                main: srdceConc,
                incidental: srdceInc,
                parts: [srdceText]
            });

            if (toOrgans) {
                pendingLes.forEach(item => {
                    if (!placeLesionReport(organBag, reportOut, item.report, item.organKeys)) orphanLes = true;
                });
                pendingLn.forEach(item => {
                    if (!placeLesionReport(organBag, reportOut, item.report, item.organKeys)) orphanLes = true;
                });
            }

            flush({
                groups: RegionThorax.virtualGroups,
                organOrder: RegionThorax.organOrder,
                expandMode,
                hasExtraPath: toOrgans ? orphanLes : (hasLesFindings || hasLnFindings)
            });

            let devMap = { dev_port: 'portkatetr', dev_picc: 'PICC', dev_cvk: 'CVK', dev_ks: 'KS', dev_icd: 'ICD' };
            let allDev = [];
            for (let k in devMap) {
                let p = ctx.isActive(`${k}_r`), l = ctx.isActive(`${k}_l`);
                if (!p && !l) continue;
                allDev.push(`${devMap[k]} ${(p && l) ? 'bilat.' : (p ? 'zprava' : 'zleva')}`);
            }
            let devText = allDev.length > 0 ? `zaveden ${formatList(allDev)}` : "";
            useSection(ctx.section({
                tableId: 'thorax_devices_main', desc: 'devices_custom_desc',
                normal: 'devices_ost_add_normal',
                normalText: RegionThorax_PREDEFS.devices.findings,
                normalConc: RegionThorax_PREDEFS.devices.conclusion,
                predef: 'devices_ost_add_predef',
                predefText: RegionThorax_PREDEFS.devices.findings,
                concField: 'devices_custom_conc',
                capitalize: true,
                parts: [devText]
            }), { report: reportOut, main: concMain, incidental: concInc });

            useSection(ctx.section({
                tableId: 'thorax_ostatni_main', desc: 'ostatni_custom_desc',
                normal: 'ostatni_ost_add_normal',
                normalText: RegionThorax_PREDEFS.ostatni.findings,
                normalConc: RegionThorax_PREDEFS.ostatni.conclusion,
                predef: 'ostatni_ost_add_predef',
                predefText: RegionThorax_PREDEFS.ostatni.findings,
                concField: 'ostatni_custom_conc',
                capitalize: true
            }), { report: reportOut, main: concMain, incidental: concInc });

            // Pořadí sekcí ve Findings je dáno tímto seznamem, ne pořadím kódu výše.
            // Ložiska a uzliny zůstávají první, dále plíce → pleura → srdce → mediastinum → jícen → mamma → devices.
            const REPORT_ORDER = [
                'thorax_lesion_main',
                'thorax_lymphnode_main',
                'thorax_plice_main',
                'thorax_pleura_main',
                'thorax_srdce_main',
                'thorax_thymus_main',
                'thorax_jicen_main',
                'thorax_mamma_main',
                'thorax_devices_main',
                'thorax_ostatni_main'
            ];
            const reportRank = (frame) => {
                if (!frame.tableId && !frame.sortAs) return -1; // heading a podobné zůstávají na začátku
                const raw = frame.sortAs || frame.tableId;
                const ids = raw.startsWith('group:')
                    ? raw.slice(6).split(',')
                    : [raw];
                let best = REPORT_ORDER.length;
                for (const id of ids) {
                    const i = REPORT_ORDER.findIndex(prefix => id.startsWith(prefix));
                    if (i !== -1 && i < best) best = i;
                }
                return best;
            };
            reportOut = reportOut
                .map((frame, i) => ({ frame, i, rank: reportRank(frame) }))
                .sort((a, b) => a.rank - b.rank || a.i - b.i)
                .map(x => x.frame);

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
        else if (state === '0' && Store.activeTable === 'thorax_ild_main') Store.activeTable = 'group:thorax_plice_main,thorax_pleura_main';
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
