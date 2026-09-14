/* =============================================================
   ui-nav.js
   Metody objektu UI přesunuté z js/ui.js (načítá se po něm).
   ============================================================= */
Object.assign(UI, {

    // Seskupený seznam kategorií: pro každou aktivní část těla nadpis - klikatelný -
    // a pod ním položky, které k ní patří. Kliknutí na nadpis otevře všechny tabulky
    // regionu, kliknutí na položku danou tabulku.
    buildOrganCategoryNav(activeRegions) {
        const WB_REGIONS = ['brain', 'neck', 'thorax', 'abdomen', 'skeleton', 'soft'];
        const DEDICATED = ['prostate', 'rectum', 'shoulder', 'knee', 'ankle'];

        // Regionální tabulky lézí / uzlin, které se na WB schématu otvírají popupem.
        // [tabulka, druh, popisek záhlaví, defaultní typ instance, organName pro fallback]
        const WB_LESION_BLOCKS = {
            brain: [
                ['brain_lesion_main', 'lesion', 'Ložisko', 'Ložisko', 'Léze (Hlava)'],
                ['brain_hemo_main', 'hemo', 'Krvácení / ischemie', 'Krvácení / ischemie', 'Léze (Hlava)']
            ],
            neck: [
                ['neck_lesion_main', 'lesion', 'Ložisko', 'Ložisko', 'Léze (Krk)'],
                ['neck_lymphnode_main', 'lymph', 'Uzliny', 'Uzlina', 'Lymfadenopatie (Krk)']
            ],
            thorax: [
                ['thorax_lesion_main', 'lesion', 'Ložisko', 'Ložisko', 'Léze (Hrudník)'],
                ['thorax_lymphnode_main', 'lymph', 'Uzliny', 'Uzlina', 'Lymfadenopatie (Hrudník)']
            ],
            abdomen: [
                ['abdomen_lesion_main', 'lesion', 'Ložisko', 'Ložisko', 'Léze (Břicho)'],
                ['abdomen_lymphnode_main', 'lymph', 'Uzliny', 'Uzlina', 'Lymfadenopatie (Břicho)']
            ],
            skeleton: [
                ['skeleton_lesion_main', 'lesion', 'Ložisko', 'Ložisko', 'Léze (Skelet)']
            ],
            soft: [
                ['soft_lesion_main', 'lesion', 'Ložisko', 'Ložisko', 'Léze (Měkké tkáně)']
            ]
        };

        // Celotělové schéma (hlava/krk/hrudník/břicho/skeleton) vs. dedikovaná mapa regionu
        const wbActive = WB_REGIONS.filter(r => activeRegions.includes(r));
        const dedicatedActive = DEDICATED.filter(r => activeRegions.includes(r));
        const ordered = wbActive.length
            ? [...wbActive, ...activeRegions.filter(r => !WB_REGIONS.includes(r))]
            : dedicatedActive;

        const groups = ordered
            .map(r => ({ id: r, title: (REGIONS[r] && REGIONS[r].title) || r, items: [] }));

        // Orgány uvedené v includes virtuální nadřazené entity (např. MFC pod kompartmentem) do panelu nepatří
        const navHidden = new Set(Object.values(ORGAN_MAP).flatMap(d => d.includes || []));
        const usedTables = new Set();
        for (const group of groups) {
            for (const organId of Object.keys(ORGAN_MAP)) {
                const def = ORGAN_MAP[organId];
                if (!def.regions || !def.regions.includes(group.id)) continue;
                if (navHidden.has(organId)) continue;
                // Na dedikované mapě (prostata, rektum, rameno, koleno, hlezno) se zobrazí
                // jen položky náležející výhradně tomuto regionu – obecné (břišní) duplicity přeskoč
                if (!wbActive.length && def.regions.length > 1) continue;
                // Na celotělovém schématu položku přiřaď do první aktivní skupiny
                if (wbActive.length) {
                    const primary = groups.find(g => def.regions.includes(g.id));
                    if (primary !== group) continue;
                }
                let table = def.table;
                if (def.resolveTable) table = def.resolveTable([group.id]);
                if (!table) continue;
                // Léze / lymfadenopatie / krvácení se otevírají popupem na SVG – nepatří sem
                if (table.includes('_lesion_main') || table.includes('_lymphnode_main') || table.includes('_hemo')) continue;
                if (usedTables.has(table)) continue;
                usedTables.add(table);
                const name = table === 'brain_sinus_main' ? 'VDN, baze' : def.name;
                group.items.push({ name, table });
            }
        }

        const visibleGroups = groups.filter(g => g.items.length > 0 || (WB_LESION_BLOCKS[g.id] && wbActive.length));
        if (visibleGroups.length === 0) return null;

        const nav = el('div', { className: 'organ-nav' });
        visibleGroups.forEach((group, idx) => {
            const head = el('button', {
                className: 'organ-nav-region',
                'data-action': 'open-region',
                'data-region': group.id,
                textContent: group.title,
                title: `Zobrazit všechny tabulky (${group.title})`
            });
            if (idx > 0) head.style.marginTop = '8px';
            nav.appendChild(head);

            // Hned pod nadpisem WB regionu plochý seznam „Ložisko" / „Uzliny" (jako popup na SVG):
            // bez instance je tu řádek kategorie (klik = vytvoří první), s instancemi řádky jejich
            // znění a na konci řádek „další …" (klik = vytvoří další). Vše na stejné úrovni.
            const blocks = wbActive.length ? (WB_LESION_BLOCKS[group.id] || []) : [];
            blocks.forEach(([table, kind, label, defaultType, organName]) => {
                const addLabel = kind === 'lymph' ? 'další uzliny' : kind === 'lesion' ? 'Další ložisko' : 'Další krvácení / ischemie';
                const cat = el('div', {
                    className: 'organ-nav-lecat',
                    'data-table': table,
                    'data-kind': kind,
                    'data-default': defaultType,
                    'data-organ': organName,
                    'data-label': label,
                    'data-add': addLabel
                });
                nav.appendChild(cat);
                this.populateOrganNavLesub(cat);
            });

            group.items.forEach(({ name, table }) => {
                nav.appendChild(el('button', {
                    className: 'organ-nav-item',
                    'data-action': 'open-table',
                    'data-table': table,
                    textContent: name,
                    title: `Otevřít tabulku: ${name}`
                }));
            });
        });
        return nav;
    },

    // Naplnění plochého seznamu lézí / uzlin pod nadpisem WB regionu (jako popup na SVG):
    // bez instance je tu jen řádek kategorie (klik = vytvoří první), s instancemi řádky jejich
    // znění a na konci řádek „další …" (klik = vytvoří další). Vše na stejné úrovni.
    populateOrganNavLesub(cat) {
        const table = cat.dataset.table;
        const kind = cat.dataset.kind || 'lesion';
        const defaultType = cat.dataset.default || 'Ložisko';
        const organName = cat.dataset.organ || '';
        const firstLabel = cat.dataset.label || (kind === 'lymph' ? 'Uzliny' : kind === 'hemo' ? 'Krvácení / ischemie' : 'Ložisko');
        const addLabel = cat.dataset.add || (kind === 'lymph' ? 'Další uzliny' : kind === 'hemo' ? 'Další krvácení / ischemie' : 'Další ložisko');
        const insts = (Store.instances && Store.instances[table]) || [];

        const children = insts.map(instId => {
            const name = getLesionInstanceName(table, instId, defaultType, organName);
            return el('button', {
                className: `organ-nav-item nav-${kind}`,
                'data-action': 'open-table',
                'data-table': `${table}__${instId}`,
                textContent: name,
                title: name
            });
        });
        children.push(el('button', {
            className: `organ-nav-item organ-nav-le nav-${kind}`,
            'data-action': 'open-table',
            'data-table': table,
            textContent: insts.length ? addLabel : firstLabel,
            title: insts.length ? addLabel : firstLabel
        }));
        cat.replaceChildren(...children);
    },

    // Aktualizace seznamů lézí / uzlin v levém panelu (po každé změně obsahu / instancí)
    refreshOrganNavLesubs() {
        document.querySelectorAll('.organ-nav-lecat').forEach(cat => {
            this.populateOrganNavLesub(cat);
        });
    },
    updateSvgHighlighting(activeRegions) {
        const svgContainer = document.getElementById('organ-svg-container');
        if (!svgContainer) return;
        
        const allOrgans = svgContainer.querySelectorAll('svg [id]');
        allOrgans.forEach(organ => {
            const organDef = ORGAN_MAP[organ.id];
            if (organDef && organDef.regions) {
                // Dimming logika           
                const isMatch = organDef.regions.some(r => activeRegions.includes(r));
                organ.classList.toggle('organ-dimmed', !isMatch);
            } else {
                organ.classList.add('organ-dimmed');
            }
        });
    },

    updateBackground(activeRegions) {
        const panel = document.getElementById('details-panel');
        if (activeRegions.includes('none')) {
            panel.dataset.bg = 'none';
            return;
        }
        let bgType = 'none';
        if (activeRegions.includes('thorax') || activeRegions.includes('abdomen')) bgType = 'wb';
        else if (activeRegions.includes('neck')) bgType = 'neck';
        panel.dataset.bg = bgType;
    },
});
