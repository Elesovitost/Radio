/* =============================================================
   ui-report.js
   Metody objektu UI přesunuté z js/ui.js (načítá se po něm).
   ============================================================= */
Object.assign(UI, {
    openPreview(text, targetEl = null, isAll = false) {
        Store.previewTarget = targetEl;
        Store.previewTargetOrigText = targetEl ? targetEl.textContent : '';
        Store.previewIsAll = isAll;
        
        const modal = document.getElementById('preview-modal');
        const backdrop = document.getElementById('preview-backdrop');
        const textarea = document.getElementById('preview-textarea');
        
        textarea.value = text;
        modal.style.display = 'flex';
        backdrop.style.display = 'block';
        
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(textarea.value.length, textarea.value.length);
        }, 50);
    },

    renderReport() {
        const doc = this.getReportDoc(true);
        this.renderReportNodes(doc);
    },

    /* Vrátí poslední sestavený dokument; případně ho rovnou postaví. */
    getReportDoc(rebuild = false) {
        if (rebuild || !this._reportDoc) this._reportDoc = buildReportDoc();
        return this._reportDoc;
    },

    /* Vykreslení dokumentu do DOM (findings + závěr + vedlejší nálezy). */
    renderReportNodes(doc) {
        const reportBlocks = doc.findings;
        const mainConclusionBlocks = doc.main;
        const incidentalBlocks = doc.incidental;
        const buildNodes = (blocks, { prefixNove = false, labels = true } = {}) => {
            return blocks.map(b => {
                if (b.type === 'heading' || b.type === 'heading-gray') {
                    const node = el('div', { className: b.type === 'heading-gray' ? 'report-heading heading-gray' : 'report-heading', textContent: b.text });
                    if (b.action) {
                        node.dataset.action = b.action;
                        if (b.regionId) node.dataset.region = b.regionId;
                        if (b.examId) node.dataset.exam = b.examId;
                    }
                    return node;
                }
                if (b.type === 'exam-heading') {
                    return el('div', { className: 'report-exam-heading', textContent: b.text });
                }
                if (b.type === 'frame') {
                    const cleanText = ReportText.frameText(b, { prefixNove });

                    const classes = ['report-frame'];
                    const autoDimText = cleanText.trim();
                    if (b.dimmed || autoDimText === "Osa přímá." || autoDimText === "Přiměřená bederní lordóza.") classes.push('text-dim');
                    if (b.hidden) classes.push('report-frame-hidden');
                    const hasSegments = Array.isArray(b.segments) && b.segments.length > 0;
                    if (!hasSegments && !b.predef && b.tableId && (b.tableId.includes('lesion') || b.tableId.includes('hemo'))) classes.push('frame-lesion');
                    if (!hasSegments && !b.predef && b.tableId && b.tableId.includes('lymphnode')) classes.push('frame-lymphnode');
                    if (b.isGroup) classes.push('is-group');

                    const organLabel = labels ? ReportText.splitLabel(cleanText) : null;
                    const node = el('div', { className: classes.join(' ') });
                    if (hasSegments) {
                        b.segments.forEach((seg, i) => {
                            const raw = String(seg.text || '').trim();
                            if (!raw) return;
                            const toneClass = seg.tone === 'lesion' ? 'seg-lesion'
                                : seg.tone === 'lymph' ? 'seg-lymph' : '';
                            /* Po data-label („Plíce:“) musí být mezera jako u běžných framů. */
                            const prefix = (i === 0 && organLabel) || i > 0 ? ' ' : '';
                            const span = el('span', {
                                className: toneClass,
                                textContent: prefix + raw
                            });
                            if (seg.tableId) {
                                span.dataset.action = 'open-table';
                                span.dataset.table = seg.tableId;
                                if (b.examId) span.dataset.exam = b.examId;
                            }
                            node.appendChild(span);
                        });
                    } else {
                        node.textContent = organLabel ? cleanText.slice(organLabel.length) : cleanText;
                    }
                    if (organLabel) node.dataset.label = organLabel.endsWith(':') ? organLabel : `${organLabel}:`;
                    if (b.tableId) {
                        node.dataset.action = 'open-table';
                        node.dataset.table = b.tableId;
                        if (b.examId) node.dataset.exam = b.examId;
                    }
                    return node;
                }
                return document.createTextNode('');
            });
        };

        const repContainer = document.getElementById('report-container');
        repContainer.className = 'content-area report-content';
        repContainer.replaceChildren(...buildNodes(reportBlocks));
        
        const concContainer = document.getElementById('conclusion-container');
        concContainer.className = 'content-area report-content';
        let concNodes = [];
        /* Nadpis „Závěr:“ jen když má panel co ukázat. V prázdném stavu
           (např. není vybrané vyšetření) zůstává sloupec Impression bez textu;
           v kopírované zprávě nadpis řeší ReportDoc.compose(). */
        const hasConclusion = mainConclusionBlocks.length > 0 || incidentalBlocks.length > 0;
        if (hasConclusion) {
            concNodes.push(el('div', { className: 'report-heading', textContent: 'Závěr:' }));
        }
        if (mainConclusionBlocks.length > 0) {
            concNodes.push(...buildNodes(mainConclusionBlocks, { prefixNove: true, labels: false }));
        }
        if (incidentalBlocks.length > 0) {
            concNodes.push(el('div', { className: 'report-heading', textContent: 'Vedlejší nálezy:' }));
            concNodes.push(...buildNodes(incidentalBlocks, { prefixNove: true, labels: false }));
        }
        concContainer.replaceChildren(...concNodes);
        appendLlmImpressionSection(concContainer);

        // Aktualizace otevřených sublistů lézí / uzlin v levém panelu (po každé změně obsahu)
        this.refreshOrganNavLesubs();
    }
});
