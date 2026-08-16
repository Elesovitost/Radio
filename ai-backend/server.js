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

const FALLBACK_MODELS = [
  GEMINI_MODEL,
  'gemini-3.5-flash',
  'gemini-3.7-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite'
].filter((m, i, arr) => arr.indexOf(m) === i);

const ai = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;

const ALLOWED_IMAGE_HOSTS = [
  'upload.wikimedia.org',
  'commons.wikimedia.org',
  'openi.nlm.nih.gov',
  'www.ncbi.nlm.nih.gov',
  'prod-images-static.radiopaedia.org',
  'cases.radiopaedia.org',
  'radiopaedia.org'
];

app.use(cors());
app.use(express.json({ limit: '1mb' }));

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildPrompt(patology) {
  return `Chci analyzovat radiologickou entitu ${patology}. Využij znalosti z Radiopaedia a odborné literatury. Výstup vrať jako kompletní HTML stránku.

Stránka musí obsahovat:
1) Stručný popis a typický obraz (MR/CT sekvence, klíčové znaky)
2) Klasifikace – tabulka stupňů, pokud existuje
3) Diferenciální diagnostika – stručně
4) Sekci galerie s přesně tímto placeholderem (NEMĚŇ ID):
<div id="radiology-gallery"></div>
Pod placeholder dej krátké textové popisky typických snímků (bez <img> tagů) – obrázky doplní backend.

ZAKÁZÁNO: <img>, via.placeholder.com, placehold.co, onerror smyčky.
DŮLEŽITÉ: Vrať POUZE čistý HTML kód od <!DOCTYPE html>... bez markdown plotů.`;
}

function stripHtmlFence(text) {
  return String(text || '')
    .replace(/^\s*```(?:html)?\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim();
}

function sanitizeGeneratedHtml(html) {
  let out = String(html || '');
  out = out.replace(/\s+onerror\s*=\s*(['"])[\s\S]*?\1/gi, '');
  out = out.replace(/<img\b[^>]*>/gi, (tag) => {
    const srcMatch = tag.match(/\bsrc\s*=\s*(['"])(.*?)\1/i);
    const src = (srcMatch?.[2] || '').trim();
    const bad = /via\.placeholder\.com|placehold\.co|dummyimage|picsum|loremflickr|fakeimg/i.test(src);
    if (!src || bad) {
      return `<div class="img-missing" style="padding:16px;background:#1e293b;color:#94a3b8;border-radius:8px;text-align:center;">Neověřený obrázek odstraněn</div>`;
    }
    return tag;
  });
  return out;
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

function isQuotaError(error) {
  const t = errText(error).toLowerCase();
  return (
    t.includes('"code":429') ||
    t.includes('exceeded your current quota') ||
    (t.includes('quota') && t.includes('billing')) ||
    t.includes('resource_exhausted')
  );
}

function isBusyError(error) {
  if (isQuotaError(error)) return false;
  const t = errText(error).toLowerCase();
  return (
    t.includes('503') ||
    t.includes('unavailable') ||
    t.includes('high demand') ||
    t.includes('try again later')
  );
}

function isAllowedImageHost(hostname) {
  const h = String(hostname || '').toLowerCase();
  return ALLOWED_IMAGE_HOSTS.some((allowed) => h === allowed || h.endsWith(`.${allowed}`));
}

function getPublicBase(req) {
  const envBase = (process.env.PUBLIC_BASE_URL || '').trim().replace(/\/$/, '');
  if (envBase) return envBase;
  if (!req) return '';
  const proto = (req.headers['x-forwarded-proto'] || req.protocol || 'https').split(',')[0].trim();
  const host = (req.headers['x-forwarded-host'] || req.headers.host || '').split(',')[0].trim();
  return host ? `${proto}://${host}` : '';
}

function proxyUrl(absoluteUrl, base) {
  const path = `/api/proxy-image?u=${encodeURIComponent(absoluteUrl)}`;
  return base ? `${base}${path}` : path;
}

async function fetchJson(url, { headers = {}, timeoutMs = 12000 } = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        'User-Agent': 'RadioAppImageFetcher/1.0 (educational radiology tool)',
        Accept: 'application/json',
        ...headers
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return res.json();
  } finally {
    clearTimeout(timer);
  }
}

async function searchWikimedia(query, limit = 6, base = '') {
  const queries = [
    `${query} MRI`,
    `${query} CT`,
    `${query} radiograph`
  ];
  const out = [];
  const seen = new Set();

  for (const q of queries) {
    if (out.length >= limit) break;
    const url =
      'https://commons.wikimedia.org/w/api.php?' +
      new URLSearchParams({
        action: 'query',
        format: 'json',
        origin: '*',
        generator: 'search',
        gsrsearch: q,
        gsrnamespace: '6',
        gsrlimit: String(Math.max(limit * 2, 8)),
        prop: 'imageinfo|info',
        inprop: 'url',
        iiprop: 'url|mime|size|extmetadata',
        iiurlwidth: '900'
      });

    let data;
    try {
      data = await fetchJson(url, { timeoutMs: 10000 });
    } catch {
      continue;
    }

    for (const page of Object.values(data?.query?.pages || {})) {
      if (out.length >= limit) break;
      const info = page.imageinfo?.[0];
      if (!info) continue;
      const mime = info.mime || '';
      if (!/^image\/(jpeg|png|gif|webp)$/i.test(mime)) continue;
      const thumb = info.thumburl || info.url;
      if (!thumb || seen.has(thumb)) continue;
      seen.add(thumb);
      const meta = info.extmetadata || {};
      const desc =
        meta.ImageDescription?.value?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() ||
        page.title?.replace(/^File:/, '') ||
        query;
      out.push({
        source: 'wikimedia',
        title: page.title?.replace(/^File:/, '') || 'Wikimedia',
        description: desc.slice(0, 280),
        pageUrl: page.canonicalurl || info.descriptionurl || thumb,
        imageUrl: thumb,
        displayUrl: proxyUrl(thumb, base)
      });
    }
  }
  return out;
}

async function searchOpenI(query, limit = 6, base = '') {
  const url =
    'https://openi.nlm.nih.gov/api/search?' +
    new URLSearchParams({
      query: `${query} radiology`,
      it: 'xg,m',
      m: '1',
      n: String(Math.min(limit, 12))
    });

  // Open-i bývá pomalé – krátký timeout, ať neblokuje odpověď
  const data = await fetchJson(url, { timeoutMs: 9000 });
  const list = data?.list || [];
  const out = [];

  for (const item of list) {
    const img =
      item.imgLarge ||
      item.imgMedium ||
      item.imgSmall ||
      item.imgThumb ||
      null;
    if (!img) continue;
    const absolute = img.startsWith('http')
      ? img
      : `https://openi.nlm.nih.gov${img.startsWith('/') ? '' : '/'}${img}`;
    out.push({
      source: 'openi',
      title: item.title || item.uid || 'Open-i',
      description: String(item.caption || item.abstract || item.title || query)
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 280),
      pageUrl: item.pmcDocUrl || item.docUrl || absolute,
      imageUrl: absolute,
      displayUrl: proxyUrl(absolute, base)
    });
    if (out.length >= limit) break;
  }
  return out;
}

async function searchRadiopaediaCases(query, limit = 5) {
  const url = `https://radiopaedia.org/search.xml?${new URLSearchParams({
    q: query,
    scope: 'cases',
    sort: 'relevance'
  })}`;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        Accept: 'application/xml',
        'User-Agent': 'RadioAppImageFetcher/1.0 (educational radiology tool)'
      }
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const links = [];
    const re = /<(?:case|article|result)[^>]*>[\s\S]*?<url>([^<]+)<\/url>[\s\S]*?(?:<title>([^<]*)<\/title>)?/gi;
    let m;
    while ((m = re.exec(xml)) && links.length < limit) {
      links.push({ url: m[1].trim(), title: (m[2] || query).trim() });
    }
    if (!links.length) {
      const hrefRe = /https?:\/\/radiopaedia\.org\/(?:cases|articles)\/[a-z0-9\-]+/gi;
      const found = [...xml.matchAll(hrefRe)].map((x) => x[0]);
      for (const u of [...new Set(found)].slice(0, limit)) {
        links.push({ url: u, title: query });
      }
    }
    return links;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchMedicalGallery(patology, base = '') {
  const errors = [];
  const soft = (label, p) =>
    p.catch((e) => {
      errors.push(`${label}: ${e.message}`);
      return [];
    });

  const [wiki, openi, radioLinks] = await Promise.all([
    soft('wikimedia', searchWikimedia(patology, 6, base)),
    soft('openi', searchOpenI(patology, 4, base)),
    soft('radiopaedia', searchRadiopaediaCases(patology, 5))
  ]);

  const results = [];
  const seen = new Set();
  for (const img of [...wiki, ...openi]) {
    if (seen.has(img.imageUrl)) continue;
    seen.add(img.imageUrl);
    results.push(img);
    if (results.length >= 8) break;
  }

  return { images: results, radiopaediaLinks: radioLinks, errors };
}

function buildGalleryHtml(patology, gallery) {
  const images = gallery.images || [];
  const links = gallery.radiopaediaLinks || [];

  const cards = images
    .map(
      (img) => `
      <figure style="margin:0;background:#0f172a;border:1px solid #334155;border-radius:10px;overflow:hidden;">
        <a href="${escapeHtml(img.pageUrl)}" target="_blank" rel="noopener noreferrer">
          <img src="${escapeHtml(img.displayUrl)}" alt="${escapeHtml(img.title)}"
               loading="lazy" referrerpolicy="no-referrer"
               style="width:100%;height:220px;object-fit:contain;background:#020617;display:block;" />
        </a>
        <figcaption style="padding:10px 12px;color:#cbd5e1;font-size:13px;line-height:1.4;">
          <strong style="color:#e2e8f0;">${escapeHtml(img.title)}</strong><br/>
          ${escapeHtml(img.description)}
          <div style="margin-top:6px;font-size:11px;color:#64748b;">Zdroj: ${escapeHtml(img.source)}</div>
        </figcaption>
      </figure>`
    )
    .join('\n');

  const radioList = links.length
    ? `<div style="margin-top:16px;">
        <h3 style="margin:0 0 8px;color:#93c5fd;font-size:15px;">Radiopaedia (ověřené odkazy)</h3>
        <ul style="margin:0;padding-left:18px;color:#cbd5e1;">
          ${links
            .map(
              (l) =>
                `<li style="margin:4px 0;"><a href="${escapeHtml(l.url)}" target="_blank" rel="noopener noreferrer" style="color:#38bdf8;">${escapeHtml(l.title)}</a></li>`
            )
            .join('')}
        </ul>
      </div>`
    : '';

  if (!images.length && !links.length) {
    return `<div style="padding:16px;border:1px dashed #475569;border-radius:8px;color:#94a3b8;">
      Nepodařilo se dohledat otevřené snímky pro „${escapeHtml(patology)}“. Zkus přesnější anglický název (např. „ACL tear MRI“).
      <div style="margin-top:8px;"><a href="https://radiopaedia.org/search?q=${encodeURIComponent(patology)}" target="_blank" rel="noopener noreferrer" style="color:#38bdf8;">Otevřít Radiopaedia search</a></div>
    </div>`;
  }

  return `
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;">
      ${cards}
    </div>
    ${radioList}
    <p style="margin-top:12px;font-size:12px;color:#64748b;">
      Obrázky stáhl backend z otevřených zdrojů (Wikimedia Commons / Open-i NLM) a zobrazuje je přes vlastní proxy.
    </p>`;
}

function injectGallery(html, galleryHtml) {
  let out = String(html || '');
  if (/id=["']radiology-gallery["']/i.test(out)) {
    out = out.replace(
      /(<div[^>]*id=["']radiology-gallery["'][^>]*>)([\s\S]*?)(<\/div>)/i,
      `$1${galleryHtml}$3`
    );
  } else if (/<\/body>/i.test(out)) {
    out = out.replace(
      /<\/body>/i,
      `<section style="padding:20px;"><h2 style="color:#93c5fd;">Radiologická galerie</h2><div id="radiology-gallery">${galleryHtml}</div></section></body>`
    );
  } else {
    out += `<div id="radiology-gallery">${galleryHtml}</div>`;
  }

  if (!/data-img-guard="1"/.test(out)) {
    const guard = `<script data-img-guard="1">document.addEventListener('error',function(e){var t=e.target;if(!t||t.tagName!=='IMG')return;if(t.dataset.failHandled)return;t.dataset.failHandled='1';t.style.display='none';},true);</script>`;
    if (/<\/body>/i.test(out)) out = out.replace(/<\/body>/i, `${guard}</body>`);
    else out += guard;
  }
  return out;
}

async function generateOnce(model, prompt, useSearch) {
  const args = { model, contents: prompt };
  if (useSearch) args.config = { tools: [{ googleSearch: {} }] };
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
          const quota = isQuotaError(error);
          const busy = isBusyError(error);
          console.warn(
            `[analyze] model=${model} search=${useSearch} attempt=${attempt} quota=${quota} busy=${busy}:`,
            errText(error).slice(0, 240)
          );
          if (quota) throw error;
          if (busy && attempt < 3) {
            await sleep(1200 * attempt);
            continue;
          }
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
    fallbacks: FALLBACK_MODELS,
    images: 'wikimedia+openi+proxy'
  });
});

app.get('/api/proxy-image', async (req, res) => {
  try {
    const raw = String(req.query.u || '');
    if (!raw) return res.status(400).send('Missing u');
    let parsed;
    try {
      parsed = new URL(raw);
    } catch {
      return res.status(400).send('Invalid URL');
    }
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return res.status(400).send('Invalid protocol');
    }
    if (!isAllowedImageHost(parsed.hostname)) {
      return res.status(403).send('Host not allowed');
    }

    const upstream = await fetch(parsed.toString(), {
      headers: {
        'User-Agent': 'RadioAppImageFetcher/1.0 (educational radiology tool)',
        Accept: 'image/*,*/*;q=0.8',
        Referer: parsed.origin + '/'
      }
    });
    if (!upstream.ok) {
      return res.status(upstream.status).send('Upstream image fetch failed');
    }

    const ctype = upstream.headers.get('content-type') || 'image/jpeg';
    if (!/^image\//i.test(ctype)) {
      return res.status(415).send('Not an image');
    }

    res.setHeader('Content-Type', ctype);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    const buf = Buffer.from(await upstream.arrayBuffer());
    res.send(buf);
  } catch (error) {
    console.error('[proxy-image]', error.message);
    res.status(502).send('Proxy failed');
  }
});

app.post('/api/analyze', async (req, res) => {
  try {
    if (!GEMINI_API_KEY || !ai) {
      return res.status(500).json({ error: 'GEMINI_API_KEY není nastaven na serveru.' });
    }

    const patology = String(req.body?.patology || req.body?.pathology || '').trim();
    if (!patology) return res.status(400).json({ error: 'Chybí pole patology.' });
    if (patology.length > 200) {
      return res.status(400).json({ error: 'Text patologie je příliš dlouhý (max 200 znaků).' });
    }

    const prompt = buildPrompt(patology);
    const publicBase = getPublicBase(req);

    const [genResult, gallery] = await Promise.all([
      generateWithRetries(prompt),
      fetchMedicalGallery(patology, publicBase)
    ]);

    let html = genResult.response.text || '';
    html = stripHtmlFence(html);
    html = sanitizeGeneratedHtml(html);
    html = injectGallery(html, buildGalleryHtml(patology, gallery));

    if (!html || !/<html[\s>]/i.test(html)) {
      return res.status(502).json({
        error: 'Model nevrátil platné HTML.',
        model: genResult.model,
        preview: String(html).slice(0, 400)
      });
    }

    res.json({
      html,
      mode: genResult.mode,
      model: genResult.model,
      attempt: genResult.attempt,
      patology,
      imagesFound: gallery.images.length,
      radiopaediaLinks: gallery.radiopaediaLinks.length,
      imageErrors: gallery.errors
    });
  } catch (error) {
    console.error('[analyze]', error);
    const quota = isQuotaError(error);
    const busy = isBusyError(error);
    res.status(quota ? 429 : busy ? 503 : 500).json({
      error: quota
        ? 'Vyčerpaná kvóta Gemini API (429). Zkontroluj plán/billing na https://aistudio.google.com/.'
        : busy
          ? 'Gemini je teď přetížený (high demand). Zkus to za chvíli znovu.'
          : error.message || 'Neznámá chyba backendu.',
      model: GEMINI_MODEL,
      detail: errText(error).slice(0, 500)
    });
  }
});

app.listen(PORT, () => {
  console.log(`AI search backend listening on :${PORT} (model=${GEMINI_MODEL})`);
});
