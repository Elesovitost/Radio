const NAF_SEGMENTS_CRANIAL = [
    'C2/3', 'C3/4', 'C4/5', 'C5/6', 'C6/7', 'C7/T1',
    'T1/2', 'T2/3', 'T3/4', 'T4/5', 'T5/6', 'T6/7', 'T7/8', 'T8/9', 'T9/10', 'T10/11', 'T11/12', 'T12/L1',
    'L1/2', 'L2/3', 'L3/4', 'L4/5', 'L5/S1'
];

const NAF_SEGMENTS_CAUDAL = [...NAF_SEGMENTS_CRANIAL].reverse();

const NAF_RF_STATES = ['0', '+', '++'];
const NAF_KRY_STATES = ['Krycí plotny', 'osteofyty', 'osteochondróza', 'cement'];
const NAF_FAC_STATES = ['facety', 'artróza I', 'artróza II', 'artróza III', 'istmy'];

const NAF_RF_SPOTS = [
    { id: 'ant',   svg: 'BF', group: 'endplate', side: '',       report: 'ventrálně' },
    { id: 'lat_l', svg: 'BL', group: 'endplate', side: 'vlevo',  report: 'vlevo' },
    { id: 'lat_r', svg: 'BR', group: 'endplate', side: 'vpravo', report: 'vpravo' },
    { id: 'cen',   svg: 'BB', group: 'endplate', side: '',       report: 'dorzálně' },
    { id: 'fac_l', svg: 'FL', group: 'facet',    side: 'vlevo',  report: 've facetovém skloubení vlevo' },
    { id: 'fac_r', svg: 'FR', group: 'facet',    side: 'vpravo', report: 've facetovém skloubení vpravo' },
    { id: 'sp',    svg: 'SP', group: 'spinous',  side: '',       report: 'interspinózně' }
];

window.NAF_SPINE_SVG_CACHE = window.NAF_SPINE_SVG_CACHE || fetch('Organs_spine_NaF.svg').then(r => r.text());

const NAF_ENDPLATE_ORDER = ['ant', 'lat_l', 'lat_r', 'cen'];

const NAF_MENUS = [
    { id: 'kry', btn: 'kry', x: 50, y: 24 },
    { id: 'fac', btn: 'fac', x: 50, y: 56 }
];

function nafSegKey(label) {
    return String(label || '').toLowerCase().replace(/\//g, '_');
}

function nafSegIdx(label) {
    return NAF_SEGMENTS_CRANIAL.indexOf(label);
}

function nafEnsureStyles() {
    if (document.getElementById('naf-spine-styles')) return;
    const style = document.createElement('style');
    style.id = 'naf-spine-styles';
    style.textContent = `
        .naf-vert-map { position: relative; width: min(308px, 70%); margin-top: 8px; }
        .naf-vert-map .naf-vert-svg { width: 100%; display: block; border-radius: 4px; overflow: hidden; }
        .naf-vert-map .naf-vert-svg svg { width: 100%; height: auto; display: block; }
        .naf-vert-map .naf-vert-svg svg image,
        .naf-vert-map .naf-vert-svg svg use { pointer-events: none; }
        .naf-vert-map .naf-vert-svg svg path[id] {
            cursor: pointer;
            fill: transparent !important;
            stroke: transparent;
            stroke-width: 2.5px;
            transition: fill 0.15s, stroke 0.15s;
        }
        .naf-vert-map .naf-vert-svg svg path[id]:hover { stroke: var(--accent-hi, #58a6ff); }
        .naf-vert-map .naf-vert-svg svg path.naf-on-plus { fill: rgba(227, 121, 8, 0.53) !important; }
        .naf-vert-map .naf-vert-svg svg path.naf-on-plusplus { fill: #e32708 !important; }
        .naf-vert-map .tbl { border: none; background: transparent; margin: 0; width: auto; }
        .naf-vert-map .tbl td { padding: 0; border: none; }
        .naf-menu { position: absolute; transform: translate(-50%, -50%); z-index: 2; }
        .naf-vert-map .btn { background: rgba(0, 0, 0, 0.8); }
        .naf-seg-hint {
            position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
            color: #8b949e; font-size: 12px; z-index: 3; pointer-events: none; text-align: center;
        }
    `;
    document.head.appendChild(style);
}

function nafApplyPathVisual(plusPath, plusPlusPath, stateIdx) {
    plusPath.classList.toggle('naf-on-plus', stateIdx === 1);
    plusPlusPath.classList.toggle('naf-on-plusplus', stateIdx === 2);
    plusPath.style.pointerEvents = stateIdx === 2 ? 'none' : 'all';
    plusPlusPath.style.pointerEvents = stateIdx === 1 ? 'none' : 'all';
}

function nafSetupSpineSvg(svgEl, pfx, examId) {
    svgEl.querySelectorAll('style').forEach(s => s.remove());
    svgEl.querySelectorAll('path[id]').forEach(path => {
        path.removeAttribute('class');
        path.style.fill = '';
    });

    if (!pfx) {
        svgEl.querySelectorAll('path[id]').forEach(path => {
            path.style.pointerEvents = 'none';
            path.style.cursor = 'default';
        });
        return svgEl;
    }

    NAF_RF_SPOTS.forEach((spot) => {
        const plusPath = svgEl.getElementById(`${spot.svg}+`);
        const plusPlusPath = svgEl.getElementById(`${spot.svg}++`);
        if (!plusPath || !plusPlusPath) return;

        const globalId = `${examId}_spine_naf_${pfx}_rf_${spot.id}`;
        ButtonConfigs[globalId] = { type: 'standard', states: NAF_RF_STATES };

        const stateIdx = Store.buttonStates[globalId] || 0;
        nafApplyPathVisual(plusPath, plusPlusPath, stateIdx);

        const bind = (path) => {
            path.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                cycleState(globalId, 1);
            });
            path.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                e.stopPropagation();
                cycleState(globalId, -1);
            });
            path.addEventListener('wheel', (e) => {
                e.preventDefault();
                e.stopPropagation();
                cycleState(globalId, e.deltaY < 0 ? 1 : -1);
            }, { passive: false });
        };
        bind(plusPath);
        bind(plusPlusPath);
    });
    return svgEl;
}

function nafMountSpineSvg(host, pfx, examId) {
    const attach = (svgEl) => {
        host.replaceChildren(nafSetupSpineSvg(svgEl, pfx, examId));
    };

    if (window.NAF_SPINE_SVG_PARSED) {
        attach(window.NAF_SPINE_SVG_PARSED.cloneNode(true));
        return;
    }

    window.NAF_SPINE_SVG_CACHE.then((txt) => {
        if (!host.isConnected) return;
        const temp = document.createElement('div');
        temp.innerHTML = txt;
        const svgEl = temp.querySelector('svg');
        if (!svgEl) {
            host.textContent = 'SVG Organs_spine_NaF.svg nelze načíst.';
            return;
        }
        window.NAF_SPINE_SVG_PARSED = svgEl.cloneNode(true);
        attach(svgEl);
    }).catch(() => {
        if (host.isConnected) host.textContent = 'SVG Organs_spine_NaF.svg nelze načíst.';
    });
}

function nafJoin(arr) {
    const valid = (arr || []).filter(v => v && String(v).trim() !== '');
    if (valid.length === 0) return '';
    if (valid.length === 1) return valid[0];
    if (valid.length === 2) return valid.join(' a ');
    return valid.slice(0, -1).join(', ') + ' a ' + valid[valid.length - 1];
}

function nafCap(s) {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function nafReadNamed(examId, localId, states) {
    const idx = Store.buttonStates[`${examId}_spine_naf_${localId}`] || 0;
    return states[idx] || states[0];
}

function nafCompactSegs(entries) {
    if (!entries.length) return '';
    const sorted = [...entries].sort((a, b) => nafSegIdx(a.label) - nafSegIdx(b.label));

    const runs = [];
    let runStart = sorted[0], runEnd = sorted[0];
    for (let i = 1; i < sorted.length; i++) {
        const prev = nafSegIdx(runEnd.label);
        const cur = nafSegIdx(sorted[i].label);
        if (cur === prev + 1 && sorted[i].sideStr === runEnd.sideStr) {
            runEnd = sorted[i];
        } else {
            runs.push({ start: runStart, end: runEnd });
            runStart = sorted[i];
            runEnd = sorted[i];
        }
    }
    runs.push({ start: runStart, end: runEnd });

    return runs.map(r => {
        const seg = r.start.label === r.end.label
            ? r.start.label
            : `${r.start.label} - ${r.end.label}`;
        return `${seg}${r.start.sideStr}`;
    }).join(', ');
}

const RegionSpineNaf = {
    title: 'NaF páteř',
    reportLayout: 'block',
    buttons: {
        seg: { states: ['segment', ...NAF_SEGMENTS_CAUDAL] },
        rf: { states: NAF_RF_STATES },
        kry: { states: NAF_KRY_STATES },
        fac: { states: NAF_FAC_STATES }
    },
    layout: (helpers) => {
        nafEnsureStyles();

        const examId = Store.activeTab || 'default';
        const segIdx = Store.buttonStates[`${examId}_spine_naf_naf_seg`] || 0;
        const segLabel = RegionSpineNaf.buttons.seg.states[segIdx] || 'segment';
        const pfx = segLabel === 'segment' ? null : nafSegKey(segLabel);

        const nodes = [
            helpers.TableGrid('spine_naf_seg', [[{ btn: 'seg', id: 'naf_seg' }]])
        ];

        const map = el('div', { className: 'naf-vert-map' });
        const svgHost = el('div', { className: 'naf-vert-svg' });
        map.appendChild(svgHost);
        nafMountSpineSvg(svgHost, pfx, examId);

        if (pfx) {
            NAF_RF_SPOTS.forEach((spot) => {
                ButtonConfigs[`${examId}_spine_naf_${pfx}_rf_${spot.id}`] = {
                    type: 'standard',
                    states: NAF_RF_STATES
                };
            });

            NAF_MENUS.forEach((menu) => {
                const wrap = el('div', {
                    className: 'naf-menu',
                    style: `left:${menu.x}%;top:${menu.y}%;`
                });
                wrap.appendChild(helpers.TableGrid(`naf_${pfx}_${menu.id}`, [[
                    { btn: menu.btn, id: `${pfx}_${menu.id}` }
                ]]));
                map.appendChild(wrap);
            });
        } else {
            map.appendChild(el('div', {
                className: 'naf-seg-hint',
                textContent: 'Vyber segment (kolečko myši)'
            }));
        }

        nodes.push(map);
        return nodes;
    },
    compile: (ctx) => {
        const examId = ctx.examId;

        const causeOf = (group, kry, fac) => {
            if (group === 'facet' && fac) {
                if (fac === 'artróza III') return 'pokročilých facetových artróz';
                if (fac === 'artróza II') return 'středních facetových artróz';
                if (fac === 'artróza I') return 'mírných facetových artróz';
                if (fac === 'istmy') return 'istmické lýzy při spondylolistéze';
            }
            if (group === 'endplate') {
                if (kry === 'cement') return 'cementoplastiky';
                if (kry === 'osteochondróza') return 'osteochondrózy';
                if (kry === 'osteofyty') return 'spondylofytů';
            }
            return '';
        };

        const pathologyReport = (seg) => {
            const parts = [];
            if (seg.kry === 'osteofyty') parts.push('okrajové spondylofyty');
            if (seg.kry === 'osteochondróza') parts.push('osteochondrotická degenerace krycích ploten');
            if (seg.kry === 'cement') parts.push('materiál vysoké denzity v MO prostoru');
            if (seg.fac === 'artróza I') parts.push('mírná facetová degenerace');
            if (seg.fac === 'artróza II') parts.push('střední facetová degenerace');
            if (seg.fac === 'artróza III') parts.push('pokročilá facetová degenerace');
            if (seg.fac === 'istmy') parts.push('istmická lýza');
            return parts;
        };

        const phraseEndplates = (spots) => {
            if (!spots.length) return '';
            if (spots.length >= 3) return 'v krycích plotnách difuzně';
            const ids = new Set(spots.map(s => s.id));
            if (ids.has('lat_l') && ids.has('lat_r') && spots.length === 2) {
                return 'v krycích plotnách po obou stranách';
            }
            const sorted = [...spots].sort(
                (a, b) => NAF_ENDPLATE_ORDER.indexOf(a.id) - NAF_ENDPLATE_ORDER.indexOf(b.id)
            );
            return `v krycích plotnách ${nafJoin(sorted.map(s => s.report))}`;
        };

        const phraseLocs = (spots) => {
            const parts = [];
            const endplates = spots.filter(s => s.group === 'endplate');
            const facets = spots.filter(s => s.group === 'facet');
            const spin = spots.filter(s => s.group === 'spinous');

            const ep = phraseEndplates(endplates);
            if (ep) parts.push(ep);

            if (facets.length === 2) parts.push('ve facetových skloubeních bilat.');
            else facets.forEach(f => parts.push(f.report));

            if (spin.length) parts.push('interspinózně');
            return nafJoin(parts);
        };

        const resolveGroupCause = (hits, group) => {
            const causes = [...new Set(hits.map(h => h.cause).filter(Boolean))];
            if (!causes.length) return '';
            if (causes.length === 1) return causes[0];
            if (group === 'facet') return 'variabilních facetových artróz';
            if (group === 'endplate') return 'variabilních degenerativních změn krycích ploten';
            return 'variabilních změn';
        };

        const readSeg = (label) => {
            const pfx = nafSegKey(label);
            const rf = [];
            NAF_RF_SPOTS.forEach((spot) => {
                const val = nafReadNamed(examId, `${pfx}_rf_${spot.id}`, NAF_RF_STATES);
                if (val && val !== '0') rf.push({ ...spot, val });
            });
            const kry = nafReadNamed(examId, `${pfx}_kry`, NAF_KRY_STATES);
            const fac = nafReadNamed(examId, `${pfx}_fac`, NAF_FAC_STATES);
            return {
                label,
                rf,
                kry: kry && kry !== 'Krycí plotny' ? kry : '',
                fac: fac && fac !== 'facety' ? fac : ''
            };
        };

        const segSideStr = (group, list) => {
            if (group === 'facet') {
                const sides = new Set(list.map(x => x.side).filter(Boolean));
                if (sides.has('vpravo') && sides.has('vlevo')) return ' bilat.';
                if (sides.size === 1) return ` ${[...sides][0]}`;
                return '';
            }
            if (group === 'endplate') {
                const ids = new Set(list.map(x => x.id));
                if (ids.size >= 3) return ' difuzně';
                if (ids.has('lat_l') && ids.has('lat_r') && ids.size === 2) return ' po obou stranách';
                if (ids.size === 2) {
                    const locs = [...list]
                        .sort((a, b) => NAF_ENDPLATE_ORDER.indexOf(a.id) - NAF_ENDPLATE_ORDER.indexOf(b.id))
                        .map(x => NAF_RF_SPOTS.find(s => s.id === x.id)?.report || '')
                        .filter(Boolean);
                    return ` ${nafJoin(locs)}`;
                }
                if (ids.has('lat_l')) return ' vlevo';
                if (ids.has('lat_r')) return ' vpravo';
                if (ids.has('ant')) return ' ventrálně';
                if (ids.has('cen')) return ' dorzálně';
            }
            return '';
        };

        const mergeHits = (hits) => {
            const byGroup = new Map();
            hits.forEach((h) => {
                if (!byGroup.has(h.group)) byGroup.set(h.group, []);
                byGroup.get(h.group).push(h);
            });

            const order = { facet: 0, endplate: 1, spinous: 2 };
            const groups = [...byGroup.entries()].sort(
                (a, b) => (order[a[0]] ?? 9) - (order[b[0]] ?? 9)
            );

            const parts = [];
            groups.forEach(([group, arr]) => {
                const cause = resolveGroupCause(arr, group);

                const bySide = new Map();
                arr.forEach((h) => {
                    const bySeg = bySide.get(h.label) || [];
                    bySeg.push(h);
                    bySide.set(h.label, bySeg);
                });

                const entries = [];
                bySide.forEach((list, label) => {
                    entries.push({ label, sideStr: segSideStr(group, list) });
                });

                const segList = nafCompactSegs(entries);
                let head = '';
                if (group === 'facet') head = `ve facetových skloubeních ${segList}`;
                else if (group === 'spinous') head = `interspinózně v ${segList}`;
                else head = `v krycích plotnách ${segList}`;
                if (cause) head += ` v terénu ${cause}`;
                parts.push(head);
            });
            return nafJoin(parts);
        };

        const reportBlocks = [{ type: 'heading', text: 'Páteř:', action: 'open-region', regionId: 'spine_naf' }];
        const concMain = [];
        const highHits = [];
        const lowHits = [];
        let anyRf = false;

        const segResults = [];
        NAF_SEGMENTS_CRANIAL.forEach((label) => {
            const seg = readSeg(label);
            if (seg.rf.length === 0) return;
            anyRf = true;

            const plusPlus = seg.rf.filter(r => r.val === '++');
            const plus = seg.rf.filter(r => r.val === '+');
            const sentences = [];

            const addIntensity = (spots, intensita) => {
                if (!spots.length) return;
                sentences.push(`${intensita} akumulace RF ${phraseLocs(spots)}`);
            };

            addIntensity(plusPlus, 'výrazná');
            addIntensity(plus, 'mírná');
            pathologyReport(seg).forEach(p => sentences.push(p));

            const lineText = sentences.map(nafCap).join('. ') + '.';
            segResults.push({ label, text: lineText.replace(/\.\./g, '.') });

            plusPlus.forEach((s) => {
                highHits.push({
                    label,
                    group: s.group,
                    side: s.side,
                    id: s.id,
                    cause: causeOf(s.group, seg.kry, seg.fac)
                });
            });
            plus.forEach((s) => {
                lowHits.push({
                    label,
                    group: s.group,
                    side: s.side,
                    id: s.id,
                    cause: causeOf(s.group, seg.kry, seg.fac)
                });
            });
        });

        // Merge identical report lines into ranges
        let i = 0;
        while (i < segResults.length) {
            const text = segResults[i].text;
            const groupLabels = [segResults[i].label];
            let j = i + 1;
            while (j < segResults.length && segResults[j].text === text) {
                groupLabels.push(segResults[j].label);
                j++;
            }
            const labelStr = nafCompactSegs(groupLabels.map(l => ({ label: l, sideStr: '' })));
            reportBlocks.push({ type: 'frame', text: `${labelStr}: ${text}`, tableId: 'spine_naf_seg' });
            i = j;
        }

        if (!anyRf) {
            reportBlocks.push({
                type: 'frame',
                text: 'Bez ložiskové akumulace RF na páteři.',
                dimmed: true,
                tableId: 'spine_naf_seg'
            });
            concMain.push({
                type: 'frame',
                text: 'Bez ložisek zvýšené osteoblastické aktivity na páteři.',
                dimmed: true
            });
        } else {
            if (highHits.length) {
                concMain.push({
                    type: 'frame',
                    text: `Vysoká osteoblastická aktivita: ${mergeHits(highHits)}.`
                });
            }
            if (lowHits.length) {
                const prefix = highHits.length
                    ? 'Nevýrazně vyšší osteoblastická aktivita dále: '
                    : 'Nevýrazně vyšší osteoblastická aktivita: ';
                concMain.push({
                    type: 'frame',
                    text: `${prefix}${mergeHits(lowHits)}.`
                });
            }
        }

        return {
            report: reportBlocks,
            conclusion: { main: concMain, incidental: [] }
        };
    }
};
