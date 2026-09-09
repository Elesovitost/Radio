/* =============================================================
   llm.js
   Module extracted from index.html inline <script>.
   Edit this file - NOT index.html - to change this part.
   ============================================================= */

/* ═══════════════════════════════════════════════
   LLM PANEL (Impression / Case study / Patologie)
═══════════════════════════════════════════════ */
const LLM_DEFAULT_API = 'https://radiology-ai-search.onrender.com';
const LLM_MODEL_KEY = 'medApp_ai_model';
const llmApiBase = (new URLSearchParams(location.search).get('api') || LLM_DEFAULT_API).replace(/\/$/, '');

let LlmImpression = { text: '', error: '', loading: false };

function escHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function parseModelChoice(value) {
    const [provider, model] = String(value || '').split(':');
    return { provider: provider || 'gemini', model: model || 'gemini-3.6-flash' };
}

function llmModelValue() {
    const s = document.getElementById('llm-model-select');
    return s ? s.value : 'gemini:gemini-3.6-flash';
}

function llmSetLoading(isLoading) {
    ['llm-impression-btn', 'llm-case-btn', 'llm-path-btn', 'llm-patology-input', 'llm-model-select'].forEach(id => {
        const n = document.getElementById(id);
        if (n) n.disabled = isLoading;
    });
}

function llmSetStatus(message, isError = false) {
    const st = document.getElementById('llm-status');
    if (!st) return;
    st.textContent = message || '';
    st.style.color = isError ? '#ff6b6b' : 'var(--dim)';
}

function llmOpenBlank(heading, note) {
    const win = window.open('', '_blank');
    if (!win) {
        llmSetStatus('Prohlížeč zablokoval vyskakovací okno. Povolte pop-ups.', true);
        return null;
    }
    win.document.write(
        '<!DOCTYPE html><html lang="cs"><head><meta charset="UTF-8"><title>' + escHtml(heading) + '</title></head>' +
        '<body style="background:#121212;color:#e0e0e0;font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;margin:0;">' +
        // split closing body tag: Live Server injects reload before first match in file
        '<h2>' + escHtml(heading) + '</h2><p style="color:#8b949e;">' + escHtml(note) + '</p></bo' + 'dy></html>'
    );
    win.document.close();
    return win;
}

function llmWriteHtml(win, html) {
    win.document.open();
    win.document.write(html);
    win.document.close();
}

function llmWriteBlankError(win, heading, msg) {
    win.document.open();
    win.document.write(
        '<!DOCTYPE html><html lang="cs"><head><meta charset="UTF-8"><title>' + escHtml(heading) + '</title></head>' +
        '<body style="background:#121212;color:#ff6b6b;font-family:system-ui,sans-serif;padding:2rem;line-height:1.5;">' +
        '<h2>' + escHtml(heading) + '</h2><p>' + escHtml(msg) + '</p></bo' + 'dy></html>'
    );
    win.document.close();
}

async function llmSendImpression() {
    const findings = ClipboardService.formatReport(false) || '';
    if (!findings) {
        llmSetStatus('Nejprve doplň Findings.', true);
        return;
    }
    const { provider, model } = parseModelChoice(llmModelValue());
    localStorage.setItem(LLM_MODEL_KEY, llmModelValue());
    const meta = getLlmHelpContext();

    llmSetLoading(true);
    llmSetStatus(`Generuji Impression přes ${provider}… (30s+)`);
    LlmImpression = { text: '', error: '', loading: true };
    UI.renderReport();
    try {
        const res = await fetch(`${llmApiBase}/api/impression`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                findings,
                provider,
                model,
                age: meta.age,
                gender: meta.gender,
                patientText: meta.patientText,
                indication: meta.indication,
                exams: getLlmExamTitles(),
                comparisonDate: Store.pastDate || ''
            })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
        if (!data.text) throw new Error('Backend nevrátil pole "text".');
        LlmImpression = { text: String(data.text).trim(), error: '', loading: false };
        llmSetStatus(`Hotovo (${data.provider || provider} / ${data.model || model}).`, false);
    } catch (error) {
        LlmImpression = { text: '', error: error.message || 'Neznámá chyba', loading: false };
        llmSetStatus(`Chyba: ${LlmImpression.error}`, true);
    } finally {
        UI.renderReport();
        llmSetLoading(false);
    }
}

async function llmSendCaseStudy() {
    const conclusion = ClipboardService.formatConclusion(true) || '';
    if (!conclusion) {
        llmSetStatus('Nejprve doplň závěr (Impression).', true);
        return;
    }
    const { provider, model } = parseModelChoice(llmModelValue());
    localStorage.setItem(LLM_MODEL_KEY, llmModelValue());
    const meta = getLlmHelpContext();

    llmSetLoading(true);
    llmSetStatus(`Case study přes ${provider}… (30s+)`);
    const win = llmOpenBlank('Case study', `Model: ${provider} / ${model} — AI připravuje diferenciální rozvahu…`);
    if (!win) {
        llmSetLoading(false);
        return;
    }
    try {
        const res = await fetch(`${llmApiBase}/api/case-study`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                findings: conclusion,
                provider,
                model,
                age: meta.age,
                gender: meta.gender,
                patientText: meta.patientText,
                indication: meta.indication
            })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
        if (!data.html) throw new Error('Backend nevrátil pole "html".');
        llmWriteHtml(win, data.html);
        llmSetStatus(`Hotovo (${data.provider || provider} / ${data.model || model}).`, false);
    } catch (error) {
        llmWriteBlankError(win, 'Chyba při Case study', error.message || 'Neznámá chyba');
        llmSetStatus(`Chyba: ${error.message || 'Neznámá chyba'}`, true);
    } finally {
        llmSetLoading(false);
    }
}

async function llmSendPathology() {
    const inp = document.getElementById('llm-patology-input');
    const patology = (inp ? inp.value : '').trim();
    if (!patology) {
        llmSetStatus('Zadejte hledanou patologii / entitu.', true);
        return;
    }
    const { provider, model } = parseModelChoice(llmModelValue());
    localStorage.setItem(LLM_MODEL_KEY, llmModelValue());

    llmSetLoading(true);
    llmSetStatus(`Generuji přes ${provider}… (30s+)`);
    const win = llmOpenBlank('Analýza: ' + patology, `Model: ${provider} / ${model} — AI připravuje text a odkazy na články…`);
    if (!win) {
        llmSetLoading(false);
        return;
    }
    try {
        const res = await fetch(`${llmApiBase}/api/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ patology, provider, model })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
        if (!data.html) throw new Error('Backend nevrátil pole "html".');
        llmWriteHtml(win, data.html);
        llmSetStatus(`Hotovo (${data.provider || provider} / ${data.model || model}).`, false);
    } catch (error) {
        llmWriteBlankError(win, 'Chyba při generování', error.message || 'Neznámá chyba');
        llmSetStatus(`Chyba: ${error.message || 'Neznámá chyba'}`, true);
    } finally {
        llmSetLoading(false);
        if (inp) inp.focus();
    }
}

function appendLlmImpressionSection(container) {
    const old = container.querySelector('.llm-impression-section');
    if (old) old.remove();
    if (!LlmImpression.text && !LlmImpression.error && !LlmImpression.loading) return;

    const sec = el('div', { className: 'llm-impression-section' });

    const headRow = el('div', { className: 'llm-impression-head-row' });
    const head = el('div', {
        className: 'report-heading llm-impression-head',
        'data-action': 'copy-llm-impression',
        title: 'Kliknutím zkopíruješ závěr LLM',
        textContent: 'Impression LLM'
    });
    headRow.appendChild(head);
    if (LlmImpression.text) {
        headRow.appendChild(el('button', {
            className: 'btn llm-clear-btn',
            'data-action': 'llm-clear-impression',
            title: 'Smazat závěr LLM',
            textContent: '✕'
        }));
    }
    sec.appendChild(headRow);

    let bodyCls = 'llm-impression-frame';
    let bodyTxt = '';
    if (LlmImpression.loading) {
        bodyCls += ' llm-loading';
        bodyTxt = 'Generuji Impression LLM…';
    } else if (LlmImpression.error) {
        bodyCls += ' llm-error';
        bodyTxt = 'Chyba: ' + LlmImpression.error;
    } else if (LlmImpression.text) {
        bodyTxt = LlmImpression.text;
    } else {
        return;
    }
    sec.appendChild(el('div', { className: bodyCls, textContent: bodyTxt }));
    container.appendChild(sec);
}
