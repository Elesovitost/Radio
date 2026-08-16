const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 8787;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const DEFAULT_MODEL = 'gemini-3.6-flash';
const MODEL_ALIASES = {
  'gemini-flash': DEFAULT_MODEL,
  'flash': DEFAULT_MODEL,
  'gemini-2.0-flash': DEFAULT_MODEL,
  'gemini-2.5-flash': DEFAULT_MODEL
};
const rawModel = (process.env.GEMINI_MODEL || DEFAULT_MODEL).trim();
const GEMINI_MODEL = MODEL_ALIASES[rawModel] || rawModel;

// Pořadí při 503 / high demand
const FALLBACK_MODELS = [
  GEMINI_MODEL,
  'gemini-3.5-flash',
  'gemini-3.7-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite'
].filter((m, i, arr) => arr.indexOf(m) === i);

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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function errText(error) {
  if (!error) return '';
  if (typeof error === 'string') return error;
  return [
    error.message,
    error.status,
    error.code,
    typeof error.error === 'string' ? error.error : '',
    error.error?.message,
    JSON.stringify(error)
  ].filter(Boolean).join(' ');
}

function isBusyError(error) {
  const t = errText(error).toLowerCase();
  return (
    t.includes('503') ||
    t.includes('unavailable') ||
    t.includes('high demand') ||
    t.includes('resource_exhausted') ||
    t.includes('429') ||
    t.includes('try again later')
  );
}

async function generateOnce(model, prompt, useSearch) {
  const args = {
    model,
    contents: prompt
  };
  if (useSearch) {
    args.config = { tools: [{ googleSearch: {} }] };
  }
  return ai.models.generateContent(args);
}

async function generateWithRetries(prompt) {
  let lastError = null;

  for (const model of FALLBACK_MODELS) {
    for (const useSearch of [true, false]) {
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const response = await generateOnce(model, prompt, useSearch);
          return {
            response,
            model,
            mode: useSearch ? 'gemini_sdk_search' : 'gemini_sdk_no_search',
            attempt
          };
        } catch (error) {
          lastError = error;
          const busy = isBusyError(error);
          console.warn(
            `[analyze] model=${model} search=${useSearch} attempt=${attempt} busy=${busy}:`,
            errText(error).slice(0, 240)
          );

          if (busy && attempt < 3) {
            await sleep(1200 * attempt);
            continue;
          }
          // non-busy → zkus další režim/model; busy po 3 pokusech → další model
          break;
        }
      }
    }
  }

  throw lastError || new Error('Generování selhalo u všech modelů.');
}

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    hasKey: Boolean(GEMINI_API_KEY),
    model: GEMINI_MODEL,
    requestedModel: rawModel,
    fallbacks: FALLBACK_MODELS
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
    const { response, model, mode, attempt } = await generateWithRetries(prompt);

    let html = response.text || '';
    html = stripHtmlFence(html);

    if (!html || !/<html[\s>]/i.test(html)) {
      return res.status(502).json({
        error: 'Model nevrátil platné HTML.',
        model,
        preview: String(html).slice(0, 400)
      });
    }

    res.json({ html, mode, model, attempt, patology });
  } catch (error) {
    console.error('[analyze]', error);
    const busy = isBusyError(error);
    res.status(busy ? 503 : 500).json({
      error: busy
        ? 'Gemini je teď přetížený (high demand). Zkus to za chvíli znovu — backend už automaticky zkouší více modelů.'
        : (error.message || 'Neznámá chyba backendu.'),
      model: GEMINI_MODEL,
      detail: errText(error).slice(0, 500)
    });
  }
});

app.listen(PORT, () => {
  console.log(`AI search backend listening on :${PORT} (model=${GEMINI_MODEL})`);
});
