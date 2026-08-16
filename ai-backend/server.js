const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 8787;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Aktuální Flash (2.5 už pro nové účty není). Alias mapuje staré názvy.
const DEFAULT_MODEL = 'gemini-3.6-flash';
const MODEL_ALIASES = {
  'gemini-flash': DEFAULT_MODEL,
  'flash': DEFAULT_MODEL,
  'gemini-2.0-flash': DEFAULT_MODEL,
  'gemini-2.5-flash': DEFAULT_MODEL
};
const rawModel = (process.env.GEMINI_MODEL || DEFAULT_MODEL).trim();
const GEMINI_MODEL = MODEL_ALIASES[rawModel] || rawModel;

const ai = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;

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

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    hasKey: Boolean(GEMINI_API_KEY),
    model: GEMINI_MODEL,
    requestedModel: rawModel
  });
});

app.post('/api/analyze', async (req, res) => {
  try {
    if (!GEMINI_API_KEY || !ai) {
      return res.status(500).json({ error: 'GEMINI_API_KEY není nastaven na serveru.' });
    }

    const patology = String(req.body?.patology || req.body?.pathology || '').trim();
    if (!patology) {
      return res.status(400).json({ error: 'Chybí pole patology.' });
    }
    if (patology.length > 200) {
      return res.status(400).json({ error: 'Text patologie je příliš dlouhý (max 200 znaků).' });
    }

    const prompt = buildPrompt(patology);
    let response;
    try {
      response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });
    } catch (searchErr) {
      console.warn('[analyze] googleSearch failed, retry without tools:', searchErr.message);
      response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt
      });
    }

    let html = response.text || '';
    html = stripHtmlFence(html);

    if (!html || !/<html[\s>]/i.test(html)) {
      return res.status(502).json({
        error: 'Model nevrátil platné HTML.',
        model: GEMINI_MODEL,
        preview: String(html).slice(0, 400)
      });
    }

    res.json({ html, mode: 'gemini_sdk_search', model: GEMINI_MODEL, patology });
  } catch (error) {
    console.error('[analyze]', error);
    res.status(500).json({
      error: error.message || 'Neznámá chyba backendu.',
      model: GEMINI_MODEL
    });
  }
});

app.listen(PORT, () => {
  console.log(`AI search backend listening on :${PORT} (model=${GEMINI_MODEL})`);
});
