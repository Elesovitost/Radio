const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8787;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

app.use(cors());
app.use(express.json({ limit: '1mb' }));

function buildPrompt(patology) {
  return `Chci analyzovat radiologickou entitu ${patology}. Vyhledej na internetu data z webu Radiopaedia a odborných lékařských článků. Výstup vrať a vygeneruj jako kompletní, interaktivní HTML stránku (využij funkci Canvas). Stránka musí obsahovat:
Stručný popis a typický obraz: Jaké MR/CT sekvence hledat a klíčové znaky.
Klasifikace: Přehledná tabulka klasifikačních stupňů (pokud existuje).
Diferenciální diagnostika: Porovnání s nejpodobnějšími entitami.
Toto vše stručně.
Dále radiologická galerie: Do HTML kódu vlož reálné obrázky této patologie z internetu pomocí klasického HTML tagu <img src="URL_OBRÁZKU">. Najdi přímé adresy obrázků (ideálně z webů Radiopaedia, PubMed nebo ResearchGate), které odpovídají realitě, a pod každý obrázek napiš podrobný radiologický popis, co na něm sledovat.
DŮLEŽITÉ: Vrať POUZE čistý zdrojový kód HTML stránky. Nezačínej odpověď slovy "Zde je kód" ani nepoužívej markdown tagy \`\`\`html. Vrať rovnou <!DOCTYPE html>...`;
}

function stripHtmlFence(text) {
  return String(text || '')
    .replace(/^\s*```(?:html)?\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim();
}

async function callGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      tools: [{ google_search: {} }]
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const err = new Error(data.error?.message || `Gemini API error (${response.status})`);
    err.status = response.status;
    err.payload = data;
    throw err;
  }

  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    hasKey: Boolean(GEMINI_API_KEY),
    model: GEMINI_MODEL
  });
});

app.post('/api/analyze', async (req, res) => {
  try {
    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY není nastaven na serveru.' });
    }

    const patology = String(req.body?.patology || req.body?.pathology || '').trim();
    if (!patology) {
      return res.status(400).json({ error: 'Chybí pole patology.' });
    }

    const prompt = buildPrompt(patology);
    let html = await callGemini(prompt);

    html = stripHtmlFence(html);
    if (!html || !/<html[\s>]/i.test(html)) {
      return res.status(502).json({
        error: 'Model nevrátil platné HTML.',
        preview: String(html).slice(0, 400)
      });
    }

    res.json({ html, mode: 'gemini_google_search', patology });
  } catch (error) {
    console.error('[analyze]', error.message);
    res.status(error.status || 500).json({
      error: error.message || 'Neznámá chyba backendu.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`AI search backend listening on :${PORT}`);
});