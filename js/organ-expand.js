/* =============================================================
   organ-expand.js
   Společná logika „Rozepisování orgánů“ (trup dle nastavení; mozek vždy alwaysOrgans).
   Režimy: none | groups | groupsAndOrgans | alwaysOrgans
   Režim none: při patologii dirty orgány + volitelné superGroup.otherwiseText.
   + připojení ložisek/uzlin pod orgány (lesionFrames).
   ============================================================= */

/**
 * Připojí findings frame ložiska/uzliny k orgánu.
 * Název orgánu zůstane modrý (label), věta ložiska/uzliny barevná (tableId).
 * Při více cílových orgánech se volá opakovaně (stejná věta u každého).
 */
function attachLesionToOrgan(organBag, key, frame) {
    const o = organBag[key];
    if (!o || !frame) return false;
    if (!o.lesionFrames) o.lesionFrames = [];
    o.lesionFrames.push({
        type: 'frame',
        text: frame.text,
        tableId: frame.tableId,
        label: o.label,
        sortAs: o.tableId
    });
    o.dirty = true;
    return true;
}

/** Zapíše připojená ložiska/uzliny před patologii orgánu. */
function emitOrganLesionFrames(reportOut, o) {
    (o.lesionFrames || []).forEach(f => reportOut.push(f));
}

/** Tělo findings framu bez popisku orgánu („Játra: …“ → „…“). */
function organPathBody(frame) {
    if (!frame) return '';
    let t = ReportText.frameText(frame).trim();
    const lab = ReportText.splitLabel(t);
    if (lab) t = t.slice(lab.length).trim();
    return t;
}

/**
 * Findings orgánu: při lézi + patologii jeden blok (název jednou, patologie hned za lézí).
 * Vrací true, pokud něco zapsalo (caller pak neforce-predef).
 */
function emitOrganFindingsReport(reportOut, o, sec) {
    const lesions = o.lesionFrames || [];
    const pathBody = (sec.report || []).map(organPathBody).filter(Boolean).join(' ');

    if (lesions.length && pathBody) {
        const segments = lesions.map(f => ({
            text: String(f.text || '').trim(),
            tone: (f.tableId || '').includes('lymphnode') ? 'lymph' : 'lesion',
            tableId: f.tableId
        }));
        let path = pathBody;
        const prev = segments[segments.length - 1]?.text || '';
        if (/\.\s*$/.test(prev)) path = capitalize(path);
        segments.push({ text: path, tone: 'path', tableId: o.tableId });
        reportOut.push({
            type: 'frame',
            label: o.label,
            tableId: o.tableId,
            sortAs: o.tableId,
            segments
        });
        return true;
    }
    if (lesions.length) {
        emitOrganLesionFrames(reportOut, o);
        return true;
    }
    if (sec.report.length) {
        reportOut.push(...sec.report);
        return true;
    }
    return false;
}

/**
 * Zařadí lézi do pending: při toOrgans zvlášť věta pro každý orgán (jen jeho lokalizace).
 * Závěr (conc) zůstane s kompletní lokalizací.
 */
function queueLesionForOrgans(pendingLes, concMain, ctx, frameOpts, lokaceByOrg, { toOrgans = false } = {}) {
    const entries = Object.entries(lokaceByOrg || {}).filter(([, lok]) => lok && lok.length);
    const allLokace = entries.flatMap(([, lok]) => lok);
    const fFull = LESIONS_DEFINITION.frames(ctx, {
        ...frameOpts,
        lokace: allLokace.length ? allLokace : (frameOpts.lokace || [])
    });
    if (!fFull) return false;
    concMain.push(fFull.conc);
    if (!toOrgans || !entries.length) {
        pendingLes.push({ report: fFull.report, organKeys: entries.map(([k]) => k) });
        return true;
    }
    entries.forEach(([orgKey, lokace]) => {
        const fOrg = LESIONS_DEFINITION.frames(ctx, { ...frameOpts, lokace });
        if (fOrg) pendingLes.push({ report: fOrg.report, organKeys: [orgKey] });
    });
    return true;
}

/**
 * Rozdělení findings frame do orgánů, nebo nahoře regionu (orphan).
 * Vrací true, pokud se alespoň jeden orgán našel.
 */
function placeLesionReport(organBag, reportOut, frame, organKeys) {
    const keys = [...new Set(organKeys || [])].filter(k => organBag[k]);
    if (!keys.length) {
        if (frame) reportOut.push(frame);
        return false;
    }
    keys.forEach(k => attachLesionToOrgan(organBag, k, frame));
    return true;
}

/**
 * Stav odloženého zápisu orgánů pro jeden region.
 * emitOrgan → flush (flushOrganExpand).
 */
function createOrganExpandState(ctx, { reportOut, concMain, concInc }) {
    const organBag = {};

    const emitOrgan = (key, opts) => {
        const rawParts = opts.parts || [];
        const cleanParts = rawParts.map(p => (typeof p === 'string' ? p.trim() : p)).filter(Boolean);
        const predefText = opts.predefText || opts.normalText || '';
        organBag[key] = {
            key,
            label: opts.label || '',
            tableId: opts.tableId,
            normRep: String(predefText).replace(/\.\s*$/, ''),
            opts,
            parts: cleanParts,
            dirty: cleanParts.length > 0,
            lesionFrames: []
        };
    };

    const attachLesion = (key, frame) => attachLesionToOrgan(organBag, key, frame);

    const writeOrganSection = (o, { forcePredef = false, skipReport = false } = {}) => {
        const so = o.opts;
        const hasLesions = (o.lesionFrames || []).length > 0;
        /* Léze pod orgánem = patologie → ignorovat predef/normal (negativní text). */
        const sec = ctx.section({
            label: so.label,
            tableId: so.tableId,
            desc: so.desc,
            normal: hasLesions ? null : so.normal,
            normalText: so.normalText,
            normalConc: so.normalConc,
            predef: hasLesions ? null : so.predef,
            predefText: so.predefText,
            concField: so.concField,
            concTarget: so.concTarget,
            capitalize: so.capitalize,
            main: so.main,
            incidental: so.incidental,
            parts: o.parts
        });
        if (!skipReport) {
            if (!emitOrganFindingsReport(reportOut, o, sec)) {
                if (forcePredef && !o.dirty) {
                    const body = so.predefText || so.normalText || '';
                    reportOut.push({
                        type: 'frame',
                        label: so.label || undefined,
                        text: body,
                        tableId: so.tableId,
                        predef: true
                    });
                }
            }
        }
        concMain.push(...sec.main);
        concInc.push(...sec.incidental);
    };

    const flush = ({ groups, organOrder, expandMode, hasExtraPath = false, formatList = formatCzechList }) => {
        flushOrganExpand({
            expandMode,
            groups,
            organOrder,
            organBag,
            writeOrganSection,
            reportOut,
            formatList,
            hasExtraPath
        });
    };

    return { organBag, emitOrgan, attachLesion, writeOrganSection, flush };
}

/**
 * Odložený zápis orgánů podle expandMode.
 */
function flushOrganExpand(opts) {
    const {
        expandMode,
        groups = [],
        organOrder = [],
        organBag = {},
        writeOrganSection,
        reportOut,
        formatList = formatCzechList,
        hasExtraPath = false
    } = opts;

    const covered = new Set();
    const subgroups = groups.filter(g => g.id !== 'all');
    const superGroup = groups.find(g => g.id === 'all');

    const membersOf = (g) => g.members.map(k => organBag[k]).filter(Boolean);
    const allClean = (g) => {
        const mems = membersOf(g);
        return mems.length === g.members.length && mems.every(o => !o.dirty);
    };
    const anyUncovered = (g) => g.members.some(k => organBag[k] && !covered.has(k));
    const markCovered = (g) => g.members.forEach(k => { if (organBag[k]) covered.add(k); });

    const emitGroupPredef = (g) => {
        if (!g.text) return;
        reportOut.push({
            type: 'frame',
            label: g.name,
            text: g.text,
            tableId: g.tableId,
            predef: true,
            isGroup: true
        });
        markCovered(g);
    };

    const writeCoveredConclusions = () => {
        organOrder.forEach(k => {
            const o = organBag[k];
            if (!o || !covered.has(k)) return;
            writeOrganSection(o, { skipReport: true });
        });
    };

    const cleanGroupOf = (key) => subgroups.find(g =>
        g.members.includes(key) && allClean(g) && anyUncovered(g)
    );

    /* Čisté skupiny i orgány mimo skupiny podle organOrder (ne všechny skupiny napřed). */
    const emitCleanSubgroups = () => {
        organOrder.forEach(k => {
            if (covered.has(k)) return;
            const g = cleanGroupOf(k);
            if (g) {
                emitGroupPredef(g);
                return;
            }
            const o = organBag[k];
            if (!o) return;
            writeOrganSection(o, { forcePredef: true });
            covered.add(k);
        });
    };

    /* Skupina s patologií: „Skupina: Orgán: patologie. X, Y bez patrné patologie.“
       Ložiska/uzliny jako barevné segmenty, zbytek bíle. */
    const emitGroupPathologies = (g) => {
        const mems = g.members.map(k => organBag[k]).filter(Boolean);
        const dirty = mems.filter(o => o.dirty);
        const clean = mems.filter(o => !o.dirty);

        const segments = [];
        const pushSeg = (text, tone, tableId) => {
            const t = String(text || '').trim();
            if (!t) return;
            segments.push({ text: t, tone, tableId: tableId || g.tableId });
        };

        dirty.forEach(o => {
            const lesionFrames = o.lesionFrames || [];
            const path = formatList(o.parts);
            if (!lesionFrames.length && !path) return;

            pushSeg(`${o.label}:`, 'path', o.tableId);
            lesionFrames.forEach(f => {
                const tone = (f.tableId || '').includes('lymphnode') ? 'lymph' : 'lesion';
                pushSeg(f.text, tone, f.tableId);
            });
            if (path) {
                const prev = lesionFrames.length
                    ? String(lesionFrames[lesionFrames.length - 1].text || '').trim()
                    : '';
                const pathBit = prev && /\.\s*$/.test(prev) ? capitalize(path) : path;
                pushSeg(`${pathBit}.`, 'path', o.tableId);
            }
        });
        if (clean.length) {
            const names = clean.map((o, i) => {
                const lab = String(o.label || '');
                if (i === 0) return lab;
                return lab ? lab.charAt(0).toLowerCase() + lab.slice(1) : lab;
            });
            pushSeg(`${formatList(names)} bez patrné patologie.`, 'path', g.tableId);
        }

        if (segments.length) {
            reportOut.push({
                type: 'frame',
                label: g.name,
                tableId: g.tableId,
                isGroup: true,
                segments
            });
        }
        markCovered(g);
        mems.forEach(o => writeOrganSection(o, { skipReport: true }));
    };

    const emitExplodedGroup = (g) => {
        g.members.forEach(k => {
            const o = organBag[k];
            if (!o || covered.has(k)) return;
            writeOrganSection(o, { forcePredef: true });
            covered.add(k);
        });
    };

    // ── vůbec: jedna nadskupina; při patologii jen špinavé orgány + otherwiseText ──
    if (expandMode === 'none') {
        if (superGroup && allClean(superGroup) && !hasExtraPath) {
            emitGroupPredef(superGroup);
            writeCoveredConclusions();
            organOrder.forEach(k => {
                const o = organBag[k];
                if (!o || covered.has(k)) return;
                writeOrganSection(o);
                covered.add(k);
            });
        } else {
            organOrder.forEach(k => {
                const o = organBag[k];
                if (!o) return;
                if (o.dirty) writeOrganSection(o);
                else writeOrganSection(o, { skipReport: true });
            });
            if (superGroup?.otherwiseText) {
                reportOut.push({
                    type: 'frame',
                    text: superGroup.otherwiseText,
                    tableId: superGroup.tableId,
                    predef: true,
                    isGroup: true
                });
            }
        }
        return;
    }

    // ── vždy orgány: každý orgán zvlášť (predef i bez tlačítka) ──
    if (expandMode === 'alwaysOrgans') {
        organOrder.forEach(k => {
            const o = organBag[k];
            if (!o) return;
            writeOrganSection(o, { forcePredef: true });
        });
        return;
    }

    // ── jen skupiny | skupiny i orgány ──
    for (const g of subgroups) {
        const mems = membersOf(g);
        if (!mems.length || mems.every(o => !o.dirty)) continue;
        const uncoveredDirty = mems.some(o => o.dirty && !covered.has(o.key));
        if (!uncoveredDirty) continue;

        if (expandMode === 'groups') {
            emitGroupPathologies(g);
        } else {
            emitExplodedGroup(g);
        }
    }

    emitCleanSubgroups();
}
