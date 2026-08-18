const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 8787;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_BASE_URL = (process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com').replace(/\/$/, '');

const DEFAULT_GEMINI_MODEL = 'gemini-3.6-flash';
const DEFAULT_DEEPSEEK_MODEL = 'deepseek-v4-flash';

const GEMINI_ALIASES = {
  'gemini-flash': DEFAULT_GEMINI_MODEL,
  flash: DEFAULT_GEMINI_MODEL,
  'gemini-2.0-flash': DEFAULT_GEMINI_MODEL,
  'gemini-2.5-flash': DEFAULT_GEMINI_MODEL
};

const DEEPSEEK_ALIASES = {
  'deepseek-chat': DEFAULT_DEEPSEEK_MODEL,
  'deepseek-reasoner': DEFAULT_DEEPSEEK_MODEL,
  deepseek: DEFAULT_DEEPSEEK_MODEL
};

const ALLOWED_GEMINI = new Set([
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-3.7-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite'
]);

const ALLOWED_DEEPSEEK = new Set([
  'deepseek-v4-flash',
  'deepseek-v4-pro'
]);

const rawGeminiDefault = (process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL).trim();
const GEMINI_MODEL = GEMINI_ALIASES[rawGeminiDefault] || rawGeminiDefault;

const FALLBACK_GEMINI_MODELS = [
  GEMINI_MODEL,
  'gemini-3.5-flash',
  'gemini-3.7-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite'
].filter((m, i, arr) => arr.indexOf(m) === i);

const ai = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;

const FETCH_UA =
  'RadioPathologySearch/1.1 (https://github.com; educational radiology viewer)';

const ALLOWED_IMAGE_HOSTS = [
  'upload.wikimedia.org',
  'commons.wikimedia.org',
  'openi.nlm.nih.gov',
  'www.ncbi.nlm.nih.gov',
  'cdn.ncbi.nlm.nih.gov',
  'europepmc.org',
  'www.ebi.ac.uk',
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

function buildCaseStudyPrompt({ findings, age, gender, indication, patientText }) {
  const who = String(patientText || '').trim() || 'Pacient';
  const ageBit = String(age || '').trim() ? `, ${String(age).trim()} let` : '';
  const ind = String(indication || '').trim();
  const indBit = ind ? ` Indikace: ${ind}.` : '';
  return `Jsi medicínský konzultant s obrovskou praxí a statistický expert. Case: ${who}${ageBit}.${indBit}

Nález (závěr zobrazovacího vyšetření):
${String(findings || '').trim()}

Udělej diferenciálně diagnostickou rozvahu etiologie nálezů, event. s pravděpodobnostmi, vzhledem k indikaci, věku a pohlaví. Navrhni další vyšetření / postup / doporučení pro klinika.

Výstup vrať jako kompletní samostatnou HTML stránku (tmavý vzhled, čitelná, lékařsky strukturovaná).
Stránka musí obsahovat:
1) Nadpis: Case study — diferenciální rozvaha
2) Stručné shrnutí nálezu
3) Diferenciální diagnostika s pravděpodobnostmi (tabulka nebo přehledný seznam).
   U nejpravděpodobnějších možností uveď odkazy na články, které se věnují právě těmto diagnózám — maximálně 3 odkazy celkem.
   První odkaz pokud možno Radiopaedia; další z respektovaných žurnálů / PMC / odborných stránek.
   Pouze plné volně dostupné texty (open access). Žádné paywally, náhledy, uzamčené PDF. URL nevymýšlej.
   Každý odkaz jako klikací <a href="..." target="_blank" rel="noopener">s názvem a zdrojem</a>.
4) Údaje které nebyly uvedeny, ale mohly by zásadně upřesnit diagnózu (např. typ obrazu, změny v okolí, atd.)
5) Doporučený další postup / vyšetření pro klinika

Styl: pozadí #121212, text #e0e0e0, akcent #58a6ff, systémový font, max-width 880px, padding 24px, line-height 1.55.
Tabulky a seznamy přehledné, bez zbytečných ozdob.
ZAKÁZÁNO: <img>, galerie, markdown ploty, javascript, falešné URL.
DŮLEŽITÉ: Vrať POUZE čistý HTML kód od <!DOCTYPE html>... bez markdown.`;
}

function ensureHtmlDocument(html, title) {
  const text = String(html || '').trim();
  if (/<html[\s>]/i.test(text)) return text;
  return `<!DOCTYPE html><html lang="cs"><head><meta charset="UTF-8"><title>${escapeHtml(title)}</title>
<style>body{background:#121212;color:#e0e0e0;font-family:system-ui,sans-serif;padding:24px;max-width:880px;margin:0 auto;line-height:1.55}</style>
</head><body>${text}</body></html>`;
}

function buildPrompt(patology) {
  return `Chci analyzovat radiologickou entitu „${patology}“ (může být česky nebo anglicky).
Využij znalosti z Radiopaedia a odborné literatury. Výstup vrať jako kompletní HTML stránku.

Stránka musí obsahovat:
1) Nadpis s oficiálním anglickým názvem entity
2) Stručný popis a typický obraz (MR/CT sekvence, klíčové znaky)
3) Klasifikace – tabulka stupňů, pokud existuje
4) Diferenciální diagnostika – s vysvětlením odlišností od podobných diagnóz
5) Sekci „Literatura a odkazy“ — vždy 5 položek, pokud existují. Pořadí:
   - 1. článek z Radiopaedia přesně k této entitě (https://radiopaedia.org/...)
   - 2.–5. respektované publikace / žurnály / odborné stránky (RadioGraphics, Radiology, AJR, European Radiology, Insights into Imaging, PubMed Central, RSNA, ESR, NIH)
   Každá položka: klikací <a href="..." target="_blank" rel="noopener">název článku — zdroj</a> a jedna věta, proč je relevantní.

Pravidla pro odkazy:
- Články se musí zabývat PŘESNĚ touto entitou, ne obecným nadřazeným tématem.
- Pouze plně dostupné texty (open access / volně čitelné). ŽÁDNÉ paywally, náhledy, uzamčené PDF, „preview only“.
- Pokud není 5 kvalitních plných textů, uveď jen tolik, kolik opravdu existuje. Nikdy nevymýšlej URL.
- Žádná galerie, žádné obrázky.

ZAKÁZÁNO: <img>, galerie, via.placeholder.com, markdown ploty, falešné URL.
DŮLEŽITÉ: Vrať POUZE čistý HTML kód od <!DOCTYPE html>... bez markdown plotů.`;
}

function extractRadioImagesMeta(html) {
  const empty = { englishName: '', queries: [], related: [], radiopaedia: [] };
  const text = String(html || '');
  const m =
    text.match(/<!--\s*RADIO_IMAGES\s*([\s\S]*?)\s*RADIO_IMAGES\s*-->/i) ||
    text.match(/<!--\s*RADIO_IMAGES\s*(\{[\s\S]*?\})\s*-->/i);
  if (!m) return { ...empty, html: text };

  let meta = { ...empty };
  try {
    const raw = m[1].trim().replace(/^RADIO_IMAGES/i, '').trim();
    const parsed = JSON.parse(raw);
    meta = {
      englishName: String(parsed.englishName || parsed.english || '').trim(),
      queries: [].concat(parsed.queries || []).map((q) => String(q || '').trim()).filter(Boolean),
      related: [].concat(parsed.related || []).map((q) => String(q || '').trim()).filter(Boolean),
      radiopaedia: [].concat(parsed.radiopaedia || parsed.links || [])
        .map((u) => String(u || '').trim())
        .filter((u) => /^https?:\/\/(www\.)?radiopaedia\.org\//i.test(u))
    };
  } catch {
    // ignore malformed meta
  }

  return {
    ...meta,
    html: text.replace(m[0], '').replace(/\n{3,}/g, '\n\n')
  };
}

function uniqQueries(...lists) {
  const out = [];
  const seen = new Set();
  for (const list of lists) {
    for (const q of list || []) {
      const cleaned = String(q || '').replace(/\s+/g, ' ').trim();
      if (!cleaned) continue;
      const key = cleaned.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(cleaned);
    }
  }
  return out;
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

function sniffImageMime(buf) {
  if (!buf || buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8) return 'image/jpeg';
  if (buf[0] === 0x89 && buf[1] === 0x50) return 'image/png';
  if (buf[0] === 0x47 && buf[1] === 0x49) return 'image/gif';
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf.toString('ascii', 8, 12) === 'WEBP') {
    return 'image/webp';
  }
  return null;
}

async function fetchImageAsDataUrl(url, { maxBytes = 800000, timeoutMs = 8000 } = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      redirect: 'follow',
      headers: {
        'User-Agent': FETCH_UA,
        Accept: 'image/jpeg,image/png,image/webp,image/gif,image/*;q=0.8',
        Referer: 'https://commons.wikimedia.org/'
      }
    });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 64 || buf.length > maxBytes) return null;
    const headerType = (res.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
    const mime = /^image\/(jpeg|jpg|png|gif|webp)$/i.test(headerType)
      ? headerType.replace('image/jpg', 'image/jpeg')
      : sniffImageMime(buf);
    if (!mime) return null;
    return `data:${mime};base64,${buf.toString('base64')}`;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchJson(url, { headers = {}, timeoutMs = 12000 } = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        'User-Agent': FETCH_UA,
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

async function searchWikimedia(queryOrQueries, limit = 6, base = '') {
  const seed = Array.isArray(queryOrQueries) ? queryOrQueries : [queryOrQueries];
  const queries = uniqQueries(
    seed,
    seed.flatMap((q) => {
      const s = String(q || '').trim();
      if (!s) return [];
      if (/\b(MRI|CT|radiograph|X-?ray|ultrasound|US)\b/i.test(s)) return [s];
      return [`${s} MRI`, `${s} CT`];
    })
  ).slice(0, 10);

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
        iiurlwidth: '720'
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
      const imageUrl = String(info.thumburl || info.url || '').replace(/\?utm_.*$/, '');
      if (!imageUrl || seen.has(imageUrl)) continue;
      seen.add(imageUrl);
      const meta = info.extmetadata || {};
      const desc =
        meta.ImageDescription?.value?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() ||
        page.title?.replace(/^File:/, '') ||
        q;
      out.push({
        source: 'wikimedia',
        title: page.title?.replace(/^File:/, '') || 'Wikimedia',
        description: desc.slice(0, 280),
        pageUrl: page.canonicalurl || info.descriptionurl || imageUrl,
        imageUrl,
        displayUrl: proxyUrl(imageUrl, base),
        matchedQuery: q
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

  // Open-i často visí – krátký timeout, ať neblokuje galerii
  const data = await fetchJson(url, { timeoutMs: 4000 });
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
        'User-Agent': FETCH_UA
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

async function fetchMedicalGallery(patology, base = '', imageMeta = {}) {
  const errors = [];
  const soft = (label, p) =>
    p.catch((e) => {
      errors.push(`${label}: ${e.message}`);
      return [];
    });

  const englishName = String(imageMeta.englishName || '').trim();
  const primary = uniqQueries(
    imageMeta.queries,
    englishName ? [englishName] : [],
    // český vstup sem NEDÁVEJ – Commons podle něj nic nenajde
    /^[\x00-\x7F]+$/.test(patology) ? [patology] : []
  );
  const related = uniqQueries(imageMeta.related).filter(
    (q) => !primary.some((p) => p.toLowerCase() === q.toLowerCase())
  );

  const searchTerm = primary[0] || englishName || patology;
  const llmRadio = (imageMeta.radiopaedia || []).map((url) => ({
    url,
    title: englishName || patology
  }));

  const [wikiPrimary, openi, radioLinks] = await Promise.all([
    soft('wikimedia', searchWikimedia(primary.length ? primary : [searchTerm], 8, base)),
    soft('openi', searchOpenI(searchTerm, 3, base)),
    soft('radiopaedia', searchRadiopaediaCases(searchTerm, 5))
  ]);

  let wiki = wikiPrimary;
  if (wiki.length < 4 && related.length) {
    const more = await soft('wikimedia-related', searchWikimedia(related, 6, base));
    const seen = new Set(wiki.map((i) => i.imageUrl));
    for (const img of more) {
      if (seen.has(img.imageUrl)) continue;
      seen.add(img.imageUrl);
      wiki.push(img);
      if (wiki.length >= 8) break;
    }
  }

  const results = [];
  const seen = new Set();
  for (const img of [...wiki, ...openi]) {
    if (seen.has(img.imageUrl)) continue;
    seen.add(img.imageUrl);
    results.push(img);
    if (results.length >= 8) break;
  }

  const images = await Promise.all(
    results.map(async (img) => {
      const dataUrl = await fetchImageAsDataUrl(img.imageUrl);
      const fallback =
        img.source === 'wikimedia'
          ? img.imageUrl
          : proxyUrl(img.imageUrl, base) || img.imageUrl;
      return {
        ...img,
        dataUrl: dataUrl || '',
        displayUrl: dataUrl || fallback,
        embedded: Boolean(dataUrl)
      };
    })
  );

  const mergedLinks = [];
  const seenLink = new Set();
  for (const l of [...llmRadio, ...radioLinks]) {
    if (!l?.url || seenLink.has(l.url)) continue;
    seenLink.add(l.url);
    mergedLinks.push(l);
  }

  return {
    images,
    radiopaediaLinks: mergedLinks,
    errors,
    searchQueries: uniqQueries(primary, related)
  };
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
               data-origin="${escapeHtml(img.imageUrl)}"
               data-embedded="${img.embedded ? '1' : '0'}"
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
      Pro tuto entitu se zatím nepodařilo stáhnout otevřené snímky.
      <div style="margin-top:8px;"><a href="https://radiopaedia.org/search?q=${encodeURIComponent(patology)}" target="_blank" rel="noopener noreferrer" style="color:#38bdf8;">Radiopaedia</a></div>
    </div>`;
  }

  return `
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;">
      ${cards}
    </div>
    ${radioList}
    <p style="margin-top:12px;font-size:12px;color:#64748b;">
      Související snímky podle anglických výrazů z AI (Wikimedia Commons). Radiopaedia jen jako odkazy.
    </p>`;
}

function injectGallery(html, galleryHtml) {
  let out = String(html || '');
  const openRe = /<div[^>]*id=["']radiology-gallery["'][^>]*>/i;
  if (openRe.test(out)) {
    out = out.replace(openRe, (openTag) => `${openTag}${galleryHtml}`);
  } else if (/<\/body>/i.test(out)) {
    out = out.replace(
      /<\/body>/i,
      `<section style="padding:20px;"><h2 style="color:#93c5fd;">Radiologická galerie</h2><div id="radiology-gallery">${galleryHtml}</div></section></body>`
    );
  } else {
    out += `<div id="radiology-gallery">${galleryHtml}</div>`;
  }

  if (!/data-img-guard="1"/.test(out)) {
    const guard = `<script data-img-guard="1">document.addEventListener('error',function(e){var t=e.target;if(!t||t.tagName!=='IMG'||t.dataset.failHandled)return;t.dataset.failHandled='1';var origin=t.getAttribute('data-origin')||'';var box=document.createElement('div');box.style.cssText='padding:28px 16px;text-align:center;color:#94a3b8;background:#020617;font-size:13px;';box.innerHTML=origin?'Náhled se nenačetl. <a href=\"'+origin+'\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color:#38bdf8;\">Otevřít zdroj</a>':'Náhled se nenačetl.';t.replaceWith(box);},true);</script>`;
    if (/<\/body>/i.test(out)) out = out.replace(/<\/body>/i, `${guard}</body>`);
    else out += guard;
  }
  return out;
}

function resolveProvider(raw) {
  const p = String(raw || 'gemini').trim().toLowerCase();
  if (p === 'deepseek' || p === 'ds') return 'deepseek';
  return 'gemini';
}

function resolveModel(provider, rawModel) {
  const raw = String(rawModel || '').trim();
  if (provider === 'deepseek') {
    const mapped = DEEPSEEK_ALIASES[raw] || raw || DEFAULT_DEEPSEEK_MODEL;
    if (!ALLOWED_DEEPSEEK.has(mapped)) {
      throw new Error(`Nepovolený DeepSeek model: ${mapped}. Povoleno: ${[...ALLOWED_DEEPSEEK].join(', ')}`);
    }
    return mapped;
  }
  const mapped = GEMINI_ALIASES[raw] || raw || GEMINI_MODEL;
  if (!ALLOWED_GEMINI.has(mapped)) {
    throw new Error(`Nepovolený Gemini model: ${mapped}. Povoleno: ${[...ALLOWED_GEMINI].join(', ')}`);
  }
  return mapped;
}

async function generateOnce(model, prompt, useSearch) {
  const args = { model, contents: prompt };
  if (useSearch) args.config = { tools: [{ googleSearch: {} }] };
  return ai.models.generateContent(args);
}

async function generateWithGemini(prompt, preferredModel) {
  if (!GEMINI_API_KEY || !ai) {
    throw new Error('GEMINI_API_KEY není nastaven na serveru.');
  }

  const models = [preferredModel, ...FALLBACK_GEMINI_MODELS]
    .filter(Boolean)
    .filter((m, i, arr) => arr.indexOf(m) === i);

  let lastError = null;
  for (const model of models) {
    for (const useSearch of [true, false]) {
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const response = await generateOnce(model, prompt, useSearch);
          return {
            text: response.text || '',
            model,
            provider: 'gemini',
            mode: useSearch ? 'gemini_sdk_search' : 'gemini_sdk_no_search',
            attempt
          };
        } catch (error) {
          lastError = error;
          const quota = isQuotaError(error);
          const busy = isBusyError(error);
          console.warn(
            `[analyze/gemini] model=${model} search=${useSearch} attempt=${attempt} quota=${quota} busy=${busy}:`,
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
  throw lastError || new Error('Generování přes Gemini selhalo.');
}

async function generateWithDeepSeek(prompt, model) {
  if (!DEEPSEEK_API_KEY) {
    throw new Error('DEEPSEEK_API_KEY není nastaven na serveru.');
  }

  const url = `${DEEPSEEK_BASE_URL}/chat/completions`;
  const payloads = [
    {
      model,
      messages: [
        {
          role: 'system',
          content:
            'Jsi radiologický asistent. Vracíš POUZE kompletní HTML dokument bez markdown plotů, bez <img> tagů a bez galerie. Odkazy jen na reálné volně dostupné plné texty; URL nevymýšlej.'
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.4,
      thinking: { type: 'disabled' }
    },
    // fallback bez thinking (starší API / neznámý parametr)
    {
      model,
      messages: [
        {
          role: 'system',
          content:
            'Jsi radiologický asistent. Vracíš POUZE kompletní HTML dokument bez markdown plotů, bez <img> tagů a bez galerie. Odkazy jen na reálné volně dostupné plné texty; URL nevymýšlej.'
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.4
    }
  ];

  let lastError = null;

  for (let p = 0; p < payloads.length; p++) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${DEEPSEEK_API_KEY}`
          },
          body: JSON.stringify(payloads[p])
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          const msg =
            data?.error?.message ||
            data?.message ||
            `DeepSeek HTTP ${res.status}`;
          const err = new Error(msg);
          err.status = res.status;
          // neznámý parametr thinking → zkus další payload
          if (res.status === 400 && /thinking/i.test(msg) && p < payloads.length - 1) {
            lastError = err;
            break;
          }
          throw err;
        }

        const text =
          data?.choices?.[0]?.message?.content ||
          data?.choices?.[0]?.message?.reasoning_content ||
          '';

        if (!text) throw new Error('DeepSeek nevrátil text.');

        return {
          text,
          model: data?.model || model,
          provider: 'deepseek',
          mode: p === 0 ? 'deepseek_chat_no_think' : 'deepseek_chat',
          attempt
        };
      } catch (error) {
        lastError = error;
        const quota = isQuotaError(error) || Number(error.status) === 429;
        const busy = isBusyError(error) || Number(error.status) === 503;
        console.warn(
          `[analyze/deepseek] model=${model} payload=${p} attempt=${attempt} quota=${quota} busy=${busy}:`,
          errText(error).slice(0, 240)
        );
        if (quota) throw error;
        if ((busy || Number(error.status) >= 500) && attempt < 3) {
          await sleep(1200 * attempt);
          continue;
        }
        break;
      }
    }
  }

  throw lastError || new Error('Generování přes DeepSeek selhalo.');
}

async function generateContent({ provider, model, prompt }) {
  if (provider === 'deepseek') {
    return generateWithDeepSeek(prompt, model);
  }
  return generateWithGemini(prompt, model);
}

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    hasGeminiKey: Boolean(GEMINI_API_KEY),
    hasDeepseekKey: Boolean(DEEPSEEK_API_KEY),
    geminiModel: GEMINI_MODEL,
    deepseekModels: [...ALLOWED_DEEPSEEK],
    images: 'llm-queries+wikimedia+inline'
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
        'User-Agent': FETCH_UA,
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
    const patology = String(req.body?.patology || req.body?.pathology || '').trim();
    if (!patology) return res.status(400).json({ error: 'Chybí pole patology.' });
    if (patology.length > 200) {
      return res.status(400).json({ error: 'Text patologie je příliš dlouhý (max 200 znaků).' });
    }

    let provider;
    let model;
    try {
      provider = resolveProvider(req.body?.provider);
      model = resolveModel(provider, req.body?.model);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    if (provider === 'gemini' && (!GEMINI_API_KEY || !ai)) {
      return res.status(500).json({ error: 'GEMINI_API_KEY není nastaven na serveru.' });
    }
    if (provider === 'deepseek' && !DEEPSEEK_API_KEY) {
      return res.status(500).json({ error: 'DEEPSEEK_API_KEY není nastaven na serveru.' });
    }

    const prompt = buildPrompt(patology);

    const genResult = await generateContent({ provider, model, prompt });

    let html = stripHtmlFence(genResult.text || '');
    const imageMeta = extractRadioImagesMeta(html);
    html = sanitizeGeneratedHtml(imageMeta.html);

    if (!html || !/<html[\s>]/i.test(html)) {
      return res.status(502).json({
        error: 'Model nevrátil platné HTML.',
        provider: genResult.provider,
        model: genResult.model,
        preview: String(html).slice(0, 400)
      });
    }

    res.json({
      html,
      mode: genResult.mode,
      provider: genResult.provider,
      model: genResult.model,
      attempt: genResult.attempt,
      patology,
      englishName: imageMeta.englishName || ''
    });
  } catch (error) {
    console.error('[analyze]', error);
    const quota = isQuotaError(error) || Number(error.status) === 429;
    const busy = isBusyError(error) || Number(error.status) === 503;
    const providerHint = String(req.body?.provider || 'gemini').toLowerCase();
    res.status(quota ? 429 : busy ? 503 : 500).json({
      error: quota
        ? providerHint === 'deepseek'
          ? 'Vyčerpaná kvóta DeepSeek API (429). Zkontroluj kredit na https://platform.deepseek.com/.'
          : 'Vyčerpaná kvóta Gemini API (429). Zkontroluj plán/billing na https://aistudio.google.com/.'
        : busy
          ? 'AI poskytovatel je teď přetížený. Zkus to za chvíli znovu.'
          : error.message || 'Neznámá chyba backendu.',
      detail: errText(error).slice(0, 500)
    });
  }
});

app.post('/api/case-study', async (req, res) => {
  try {
    const findings = String(req.body?.findings || req.body?.conclusion || '').trim();
    if (!findings) return res.status(400).json({ error: 'Chybí pole findings (závěr).' });
    if (findings.length > 20000) {
      return res.status(400).json({ error: 'Závěr je příliš dlouhý (max 20000 znaků).' });
    }

    let provider;
    let model;
    try {
      provider = resolveProvider(req.body?.provider);
      model = resolveModel(provider, req.body?.model);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    if (provider === 'gemini' && (!GEMINI_API_KEY || !ai)) {
      return res.status(500).json({ error: 'GEMINI_API_KEY není nastaven na serveru.' });
    }
    if (provider === 'deepseek' && !DEEPSEEK_API_KEY) {
      return res.status(500).json({ error: 'DEEPSEEK_API_KEY není nastaven na serveru.' });
    }

    const prompt = buildCaseStudyPrompt({
      findings,
      age: req.body?.age,
      gender: req.body?.gender,
      indication: req.body?.indication,
      patientText: req.body?.patientText
    });

    const genResult = await generateContent({ provider, model, prompt });
    let html = ensureHtmlDocument(stripHtmlFence(genResult.text || ''), 'Case study');
    html = sanitizeGeneratedHtml(html);

    if (!html || !/<html[\s>]/i.test(html)) {
      return res.status(502).json({
        error: 'Model nevrátil platné HTML.',
        provider: genResult.provider,
        model: genResult.model,
        preview: String(html).slice(0, 400)
      });
    }

    res.json({
      html,
      mode: genResult.mode,
      provider: genResult.provider,
      model: genResult.model,
      attempt: genResult.attempt
    });
  } catch (error) {
    console.error('[case-study]', error);
    const quota = isQuotaError(error) || Number(error.status) === 429;
    const busy = isBusyError(error) || Number(error.status) === 503;
    const providerHint = String(req.body?.provider || 'gemini').toLowerCase();
    res.status(quota ? 429 : busy ? 503 : 500).json({
      error: quota
        ? providerHint === 'deepseek'
          ? 'Vyčerpaná kvóta DeepSeek API (429). Zkontroluj kredit na https://platform.deepseek.com/.'
          : 'Vyčerpaná kvóta Gemini API (429). Zkontroluj plán/billing na https://aistudio.google.com/.'
        : busy
          ? 'AI poskytovatel je teď přetížený. Zkus to za chvíli znovu.'
          : error.message || 'Neznámá chyba backendu.',
      detail: errText(error).slice(0, 500)
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `AI search backend listening on :${PORT} (gemini=${Boolean(GEMINI_API_KEY)}, deepseek=${Boolean(DEEPSEEK_API_KEY)})`
  );
});
