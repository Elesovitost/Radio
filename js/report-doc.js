/* =============================================================
   report-doc.js
   ReportDoc = jediný zdroj pravdy pro text zprávy.

   - ReportText: rozložení textu pro zobrazení/serializaci (bez DOM)
   - buildReportDoc(): sestaví findings / závěr / vedlejší nálezy z aktuálního Store
   - ReportDoc: serializace dokumentu do textu pro schránku

   Opravy textu (typografie, modalita, gramatika) řeší Corrections.
   ============================================================= */

const ReportText = {
    /* „nově!“ z dynamiky přepíše na prefix „Nově …“ (jen pro závěr). */
    applyNove(text) {
        if (!/(?:,\s*nově!?|\(\s*nově!?\s*\))/.test(text)) return text;
        let out = text.replace(/(?:,\s*nově!?|\(\s*nově!?\s*\))/g, '').replace(/\s+/g, ' ').trim();
        if (out) out = 'Nově ' + out.charAt(0).toLowerCase() + out.slice(1);
        return out;
    },

    /* Text bloku tak, jak ho vidí uživatel (před rozdělením popisku orgánu). */
    frameText(block, { prefixNove = false } = {}) {
        let text = block.text || '';
        if (block.segments && block.segments.length) {
            text = block.segments.map(s => String(s.text || '').trim()).filter(Boolean).join(' ');
        }
        if (prefixNove) text = ReportText.applyNove(text);
        text = Corrections.normalize(text);
        if (block.label) {
            const lab = String(block.label).replace(/:$/, '');
            text = `${lab}: ${text}`.replace(/\s+/g, ' ').trim();
        }
        return text;
    },

    /* Popisek orgánu / skupiny na začátku věty ("Játra:") – kvůli stylování. */
    splitLabel(text) {
        return (text.match(/^([^:\n]+:)/) || [])[1] || null;
    }
};


/* =============================================================
   Sestavení dokumentu z aktuálního stavu (bez DOM).
   ============================================================= */
function buildReportDoc() {
    const findings = [];
    const main = [];
    const incidental = [];

    const multipleExams = Store.exams.size > 1;

    for (const examId of Store.exams) {
        const exam = getExamById(examId);
        if (!exam) continue;

        /* Per-exam pravidla Reportu (radiofarmakum → texty, fyziologická distribuce). */
        const profile = ReportDoc.profile([examId]);
        const petTexts = (typeof PET_TEXTS !== 'undefined' && PET_TEXTS[profile.tracer]) || {};

        let examRepBlocks = [];
        let examConcMainBlocks = [];
        let examConcIncBlocks = [];

        const regionsToCompile = new Set(exam.regs);
        Object.keys(REGIONS).forEach(rId => {
            const prefix = `${examId}_${rId}_`;
            const hasActiveState = Object.keys(Store.buttonStates).some(k => k.startsWith(prefix) && Store.buttonStates[k]);
            const hasActiveField = Object.keys(Store.fields).some(k => k.startsWith(prefix) && Store.fields[k] !== '');
            const hasActiveCustom = Object.keys(Store.customTexts).some(k => k.startsWith(prefix) && Store.customTexts[k] !== '');
            if (hasActiveState || hasActiveField || hasActiveCustom) regionsToCompile.add(rId);
        });

        /* Pořadí regionů v nálezu = pořadí v REGIONS (ne pořadí klikání). */
        const regionOrder = Object.keys(REGIONS);
        const rank = (rId) => {
            const i = regionOrder.indexOf(rId);
            return i < 0 ? regionOrder.length : i;
        };

        [...regionsToCompile].sort((a, b) => rank(a) - rank(b)).forEach(regionId => {
            const region = REGIONS[regionId];
            if (!region || !region.compile) return;

            const compiled = region.compile(createContext(regionId, examId));

            if (compiled.report) {
                examRepBlocks.push(...compiled.report.map(b => ({
                    ...b,
                    text: Corrections.sanitize(b.text, { examId, isConclusion: false }),
                    examId
                })));
            }

            if (compiled.conclusion) {
                const prep = (blocks) => (blocks || []).map(b => ({
                    ...b,
                    text: Corrections.sanitize(b.text, { examId, isConclusion: true }),
                    examId
                }));
                examConcMainBlocks.push(...prep(compiled.conclusion.main));
                examConcIncBlocks.push(...prep(compiled.conclusion.incidental));
            }
        });

        /* --- FMM: text podle fáze akumulace --- */
        if (profile.tracer === 'fmm') {
            const akumIdx = Store.buttonStates[`${examId}_fmm_akum`] || 0;
            const akum = FMM_AKUM_TEXTS[akumIdx] || FMM_AKUM_TEXTS[0];
            examRepBlocks.unshift({ type: 'frame', text: Corrections.sanitize(akum.report, { examId }), tableId: null, examId, dimmed: akumIdx === 0 });
            examConcMainBlocks.unshift({ type: 'frame', text: Corrections.sanitize(akum.conc, { examId, isConclusion: true }), tableId: null, examId, dimmed: akumIdx === 0 });
        }

        /* --- PET: negativní věta, pokud není jasná patologie --- */
        if (petTexts.negative) {
            const hasHighActivity = Object.keys(Store.buttonStates).some(k =>
                k.startsWith(examId) && k.endsWith('_act') && Store.buttonStates[k] >= 3
            );

            const concText = [...examConcMainBlocks, ...examConcIncBlocks].map(b => b.text).join(' ').toLowerCase();
            const hasConcKeywords = /\bmeta\b/.test(concText) || concText.includes('tumor') || concText.includes('maligní');

            if (!(hasHighActivity && hasConcKeywords)) {
                examConcMainBlocks.unshift({
                    type: 'frame',
                    text: Corrections.sanitize(petTexts.negative, { examId, isConclusion: true }),
                    tableId: null, examId
                });
            }
        }

        /* --- PET: fyziologická distribuce radiofarmaka (blok "OSTATNÍ:" na konci nálezu) --- */
        let physioText = profile.physio ? (petTexts.physio || '') : '';

        const prefixes = [];
        if (Store.buttonStates[`${examId}_soft_st_fat`]) {
            prefixes.push("Zvýšená akumulace RF v oblasti metabolicky aktivního tuku krku a trupu symetricky bilat.");
        }
        const pR = Store.buttonStates[`${examId}_soft_st_parav_r`] === 1;
        const pL = Store.buttonStates[`${examId}_soft_st_parav_l`] === 1;
        if (pR || pL) {
            const sideStr = pR && pL ? "PHK a LHK" : (pR ? "PHK" : "LHK");
            prefixes.push(`Zvýšená akumulace RF v průběhu lymfatik ${sideStr} na podkladě parciální paravazace RF při aplikaci.`);
        }
        if (Store.buttonStates[`${examId}_soft_st_dif`]) {
            prefixes.push("Difuzně vysoká akumulace RF v kosterním svalstvu při zátěži po aplikaci či nedodrženém lačnění.");
        }
        if (prefixes.length > 0) {
            physioText = prefixes.join(' ') + (physioText ? ' ' + physioText : '');
        }
        if (physioText) {
            examRepBlocks.push({ type: 'heading-gray', text: 'OSTATNÍ:' });
            examRepBlocks.push({
                type: 'frame',
                text: Corrections.sanitize(physioText, { examId }),
                tableId: null, examId, dimmed: true
            });
        }

        if (multipleExams) {
            if (examRepBlocks.length > 0) findings.push({ type: 'exam-heading', text: exam.title, examId });
            if (examConcMainBlocks.length > 0) examConcMainBlocks.unshift({ type: 'exam-heading', text: exam.title, examId });
            if (examConcIncBlocks.length > 0) examConcIncBlocks.unshift({ type: 'exam-heading', text: exam.title, examId });
        }

        findings.push(...examRepBlocks);
        main.push(...examConcMainBlocks);
        incidental.push(...examConcIncBlocks);
    }

    return { exams: Array.from(Store.exams), findings, main, incidental };
}


/* =============================================================
   Serializace pro schránku (dřív čtení z DOM).
   ============================================================= */
const ReportDoc = {
    isHeading: (b) => b.type === 'heading' || b.type === 'heading-gray',

    serializeFindings(doc, { includeIndicationLabel = false, includePastDate = true, profile = null } = {}) {
        const p = profile || (typeof REPORT_PROFILES !== 'undefined' && REPORT_PROFILES.default) || {};
        const lines = [];
        const indication = (Store.indication || '').trim();

        if (indication && includeIndicationLabel) {
            lines.push(`${p.indicationLabel || 'Indikace:'} ${indication}`);
            lines.push("");
        }
        if (Store.pastDate && includePastDate) {
            const [y, m, d] = Store.pastDate.split('-');
            lines.push(`${p.pastDateLabel || 'Srovnáno s vyšetřením z'} ${d}.${m}.${y}:`);
        }

        const headingCount = doc.findings.filter(ReportDoc.isHeading).length;
        let currentLine = '';
        let currentLayout = 'inline';

        for (const b of doc.findings) {
            if (b.type === 'exam-heading') {
                if (currentLine) { lines.push(currentLine.trim()); currentLine = ''; }
                if (lines.length > 0 && lines[lines.length - 1] !== '') lines.push('');
                continue;
            }

            if (ReportDoc.isHeading(b)) {
                if (currentLine) { lines.push(currentLine.trim()); currentLine = ''; }
                const text = (b.text || '').trim();
                if (text === 'OSTATNÍ:') {
                    currentLayout = APP_SETTINGS.organsStacked ? 'block' : 'inline';
                    continue;
                }

                // Orgány pod sebe: vždy block. Jinak orgány inline, nový řádek jen u regionu.
                currentLayout = APP_SETTINGS.organsStacked ? 'block' : 'inline';
                currentLine = headingCount > 1 ? text.toUpperCase().replace(/:$/, '') + ':' : '';
                continue;
            }

            if (b.type !== 'frame') continue;

            const text = ReportText.frameText(b).trim();
            const cleanText = text.replace(/^- /, '');
            // Skupiny orgánů vždy na vlastním řádku (i když je „Orgány pod sebe“ vypnuté).
            if (currentLayout === 'block' || b.isGroup || b.hidden || text.startsWith('Neložisková')) {
                if (currentLine) { lines.push(currentLine.trim()); currentLine = ''; }
                lines.push(cleanText);
            } else {
                currentLine = currentLine === '' ? cleanText : currentLine + ' ' + cleanText;
            }
        }
        if (currentLine) lines.push(currentLine.trim());
        return lines.join('\n').replace(/  +/g, ' ').trim();
    },

    /* Závěr rozdělený na hlavní část a vedlejší nálezy (bez popisků).
       Deduplikace je společná, aby se text neopakoval v obou částech. */
    impressionParts(doc) {
        const main = [];
        const incidental = [];
        const seen = new Set();

        if (Store.pastDate) {
            const [y, m, d] = Store.pastDate.split('-');
            main.push(`Oproti vyšetření z ${d}.${m}.${y}:`);
        }

        const collect = (blocks, target) => {
            const texts = blocks.filter(b => b.type === 'frame')
                                .map(b => ReportText.frameText(b, { prefixNove: true }).trim());
            target.push(...Corrections.dedupe(texts, seen));
        };
        collect(doc.main, main);
        collect(doc.incidental, incidental);

        return { main, incidental };
    },

    serializeImpression(doc, { incidentalLabel = 'Vedlejší nálezy:' } = {}) {
        const { main, incidental } = ReportDoc.impressionParts(doc);

        let out = main.join('\n');
        if (incidental.length > 0) {
            out += "\n\n" + (incidentalLabel ? incidentalLabel + ' ' : "") + incidental.join(' ');
        }
        return out.trim();
    },

    /* ---------- výstup 3: Report (náhled / kopírovat vše) ---------- */

    /* Titulek vyšetření - u laterality se bere strana z formuláře. */
    title(examIds = Store.exams) {
        const titleOf = (id) => {
            const exam = getExamById(id);
            if (!exam) return '';
            const side = APP_MANIFEST.examsWithSides[id];
            if (side) {
                const value = Store.fields[side.field];
                if (value === 'R') return `MR pravého ${side.label}`;
                if (value === 'L') return `MR levého ${side.label}`;
            }
            return exam.title;
        };

        const ids = Array.from(examIds || []);
        if (ids.length >= 2) return ids.map(titleOf).filter(Boolean).join(', ');
        return titleOf(Store.activeTab) || 'Lékařský nález';
    },

    /* Profil = default + typ vyšetření + konkrétní examId. */
    profile(examIds = Store.exams) {
        const profiles = (typeof REPORT_PROFILES !== 'undefined' && REPORT_PROFILES) || {};
        const merged = Object.assign({}, profiles.default);
        const apply = (key) => Object.assign(merged, profiles[key] || {});
        Array.from(examIds || []).forEach(id => apply(String(id).split('_')[0]));
        Array.from(examIds || []).forEach(apply);
        return merged;
    },

    /* Složí celý text zprávy k náhledu/kopírování. */
    compose(doc = null, { examIds = Store.exams, profile = null } = {}) {
        const built = doc || buildReportDoc();
        const p = profile || ReportDoc.profile(examIds);
        const parts = [];

        if (p.title) {
            const title = ReportDoc.title(examIds);
            if (title) parts.push(title);
        }

        const findings = ReportDoc.serializeFindings(built, {
            includeIndicationLabel: !!p.indication,
            includePastDate: !!p.pastDate,
            profile: p
        });
        if (findings) parts.push(findings);

        const { main, incidental } = ReportDoc.impressionParts(built);
        if (main.length) {
            parts.push((p.conclusionLabel ? p.conclusionLabel + '\n' : '') + main.join('\n'));
        }
        if (incidental.length) {
            parts.push((p.incidentalLabel ? p.incidentalLabel + ' ' : '') + incidental.join(' '));
        }

        return parts.join('\n\n').replace(/\n{3,}/g, '\n\n').trim();
    }
};
