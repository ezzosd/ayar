#!/usr/bin/env node
/**
 * Ayar — build-time price prerender.
 *
 * This is a static site, so the prices the browser draws with JavaScript are
 * missing from the raw HTML ("—"). This script runs at deploy
 * time: it fetches the same sources the page uses, copies the site into an
 * output folder and writes the prices into that copy. The source files in the
 * repository are never modified, and the page's own JavaScript still replaces
 * these values with live ones as soon as it loads.
 *
 * Usage:   node scripts/prerender.mjs [--src .] [--out public] [--soft]
 * Env:     GOLD_API_BASE, FX_URL (override the data sources, e.g. for tests)
 * Exit:    1 when no valid gold price could be fetched, so the build stops and the
 *          previous deployment stays online instead of a broken one.
 *          With --soft (use this on Vercel) it never fails: it falls back to the last
 *          published /prices.json (if under 6 h old), then to a build without prices.
 */
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const SRC = path.resolve(arg('src', '.'));
const OUT = path.resolve(arg('out', '_site'));
const GOLD_API_BASE = process.env.GOLD_API_BASE || 'https://api.gold-api.com';
const FX_URL = process.env.FX_URL || 'https://ayar-proxy.ezzoabdo17.workers.dev/api/metals';

// ---- Constants mirrored from index.html (keep in sync with the page) -------
const GRAM_PER_OZ = 31.1034768;
const FALLBACK_RATES = { EGP: 53.88, SAR: 3.75, AED: 3.6725, BHD: 0.376, IQD: 1516, KWD: 0.311, QAR: 3.64, OMR: 0.3846, JOD: 0.709 };
const CUR_DECIMALS = { EGP: 2, SAR: 2, AED: 2, BHD: 3, IQD: 0, KWD: 3, QAR: 2, OMR: 3, JOD: 3, DZD: 2, MAD: 2 };
const COUNTRIES = {
  EG: { cur: 'EGP', symbol: 'ج.م', tax: 0.14, manuf: 0.07, bidSpread: 0.03 },
  SA: { cur: 'SAR', symbol: 'ر.س', tax: 0, manuf: 0.02, bidSpread: 0.02 },
  AE: { cur: 'AED', symbol: 'د.إ', tax: 0.05, manuf: 0.02, bidSpread: 0.02 },
  BH: { cur: 'BHD', symbol: 'د.ب', tax: 0, manuf: 0.02, bidSpread: 0.02 },
  IQ: { cur: 'IQD', symbol: 'د.ع', tax: 0, manuf: 0.03, bidSpread: 0.03 },
  KW: { cur: 'KWD', symbol: 'د.ك', tax: 0, manuf: 0.02, bidSpread: 0.02 },
  QA: { cur: 'QAR', symbol: 'ر.ق', tax: 0, manuf: 0.02, bidSpread: 0.02 },
  OM: { cur: 'OMR', symbol: 'ر.ع', tax: 0, manuf: 0.02, bidSpread: 0.02 },
  JO: { cur: 'JOD', symbol: 'د.أ', tax: 0.16, manuf: 0.03, bidSpread: 0.03 },
  DZ: { cur: 'DZD', symbol: 'دج', tax: 0, manuf: 0.03, bidSpread: 0.03 },
  MA: { cur: 'MAD', symbol: 'د.م', tax: 0, manuf: 0.03, bidSpread: 0.03 },
};
const KARATS = [
  { k: 24, popular: false }, { k: 22, popular: false },
  { k: 21, popular: true }, { k: 18, popular: false },
];
const LOCALES = { ar: 'ar-EG-u-nu-latn', en: 'en-US', fr: 'fr-FR' };

// Sanity bands: a value outside these is treated as a bad response, not a price.
const SANE = { gold: [100, 100000], silver: [1, 5000], platinum: [50, 50000] };

// ---- Fetching --------------------------------------------------------------
async function getJson(url, tries = 3) {
  let lastErr;
  for (let i = 1; i <= tries; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(10000), headers: { accept: 'application/json' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      lastErr = e;
      if (i < tries) await new Promise((r) => setTimeout(r, 1500 * i));
    }
  }
  throw new Error(`${url}: ${lastErr?.message || lastErr}`);
}

async function metal(symbol, [min, max]) {
  try {
    const p = parseFloat((await getJson(`${GOLD_API_BASE}/price/${symbol}`)).price);
    if (Number.isFinite(p) && p >= min && p <= max) return p;
    console.warn(`[prerender] ${symbol}: value out of range (${p}), ignoring`);
  } catch (e) {
    console.warn(`[prerender] ${symbol}: ${e.message}`);
  }
  return null;
}

/** Same orientation logic the page uses: the API may return a rate or its inverse. */
function normaliseRates(currencies) {
  const rates = {};
  for (const { cur } of Object.values(COUNTRIES)) {
    const raw = parseFloat(currencies?.[cur]);
    if (!raw || raw <= 0) continue;
    const fb = FALLBACK_RATES[cur];
    if (!fb) { rates[cur] = raw > 1 ? raw : 1 / raw; continue; }
    const directErr = Math.abs(raw - fb) / fb;
    const flipErr = Math.abs(1 / raw - fb) / fb;
    rates[cur] = directErr <= flipErr ? raw : 1 / raw;
  }
  return rates;
}

// ---- Formatting (mirrors fmtMoney / nf in index.html) ----------------------
const nfCache = new Map();
function nf(locale, min, max) {
  const key = `${locale}:${min}:${max}`;
  if (!nfCache.has(key)) nfCache.set(key, new Intl.NumberFormat(locale, { minimumFractionDigits: min, maximumFractionDigits: max }));
  return nfCache.get(key);
}
const money = (v, cur, locale) => {
  const d = CUR_DECIMALS[cur] ?? 2;
  return nf(locale, d, d).format(v);
};

// ---- HTML injection --------------------------------------------------------
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Replace the text inside the element carrying id="…". Returns [html, replaced?]. */
function setText(html, id, value) {
  const re = new RegExp(`(<([a-z0-9]+)\\b[^>]*\\bid="${escapeRe(id)}"[^>]*>)[^<]*(</\\2>)`, 'i');
  if (!re.test(html)) return [html, false];
  return [html.replace(re, (_m, open, _tag, close) => `${open}${value}${close}`), true];
}

function karatCards(goldGram24, c, locale) {
  return KARATS.map(({ k, popular }) => {
    const gram = (goldGram24 * k) / 24;
    const price = money(gram, c.cur, locale);
    const sell = money(gram * (1 - (c.bidSpread || 0.02)), c.cur, locale);
    const buy = money(gram * (1 + (c.tax || 0) + (c.manuf || 0)), c.cur, locale);
    // Markup must stay identical to buildKaratGrid() so the page's JS can swap it in place.
    return `
      <article class="card karat${popular ? ' is-popular' : ''}" data-k="${k}">
        <div class="k-top"><span class="k-label">عيار</span><span class="k-num">${k}</span>${popular ? '<span class="tag">الأكثر تداولاً</span>' : ''}</div>
        <p class="price">${price}</p><p class="unit">${c.symbol} · عيار ${k}</p>
        <div class="bid-ask">
          <div class="bid-ask-row sell"><span>البيع للتاجر</span><strong class="v-sell">${sell} ${c.symbol}</strong></div>
          <div class="bid-ask-row buy"><span>الشراء من التاجر</span><strong class="v-buy">${buy} ${c.symbol}</strong></div>
        </div>
      </article>`;
  }).join('');
}

function prerenderPage(html, market, rates, stamp) {
  const code = /const state = \{ code:'([A-Z]{2})'/.exec(html)?.[1];
  const c = code && COUNTRIES[code];
  if (!c) return { html, status: 'no-country' };
  const rate = rates[c.cur];
  if (!rate) return { html, status: `no-rate-${c.cur}` };

  const lang = /<html[^>]*\blang="([a-z]{2})"/i.exec(html)?.[1] || 'ar';
  const locale = LOCALES[lang] || LOCALES.ar;
  const sym = c.symbol;
  const goldGram24 = (market.goldOz / GRAM_PER_OZ) * rate;

  let out = html;
  const set = (id, value) => { [out] = setText(out, id, value); };

  set('ozLocal', money(market.goldOz * rate, c.cur, locale));
  set('ozCur', sym);
  set('ozUsd', nf(locale, 2, 2).format(market.goldOz));

  const grid = /(<div[^>]*\bid="karatGrid"[^>]*>)\s*(<\/div>)/;
  if (!grid.test(out)) return { html, status: 'no-karat-grid' };
  out = out.replace(grid, (_m, open, close) => `${open}${karatCards(goldGram24, c, locale)}\n    ${close}`);

  if (market.silverOz) {
    const g = (market.silverOz / GRAM_PER_OZ) * rate;
    set('silverGram', money(g, c.cur, locale));
    set('silverUnit', `${sym} للجرام · نقاء 99.9%`);
    set('silverOz', `${money(market.silverOz * rate, c.cur, locale)} ${sym}`);
    set('silverKilo', `${money(g * 1000, c.cur, locale)} ${sym}`);
  }
  if (market.platinumOz) {
    const g950 = (market.platinumOz / GRAM_PER_OZ) * rate * 0.95;
    set('platinumGram', money(g950, c.cur, locale));
    set('platinumUnit', `${sym} للجرام · نقاء 950`);
    set('platinumOz', `${money(market.platinumOz * rate, c.cur, locale)} ${sym}`);
    set('platinumKilo', `${money(g950 * 1000, c.cur, locale)} ${sym}`);
    set('platinumUsd', `${nf(locale, 2, 2).format(market.platinumOz)} $`);
  }

  // Time of the snapshot, in UTC so it is correct for every reader.
  const hhmm = stamp.toISOString().slice(11, 16);
  out = out.replace(/<time id="updatedAt">[^<]*<\/time>/, `<time id="updatedAt" datetime="${stamp.toISOString()}">${hhmm} UTC</time>`);
  out = out.replace('</head>', `<meta name="ayar:prices-generated" content="${stamp.toISOString()}">\n</head>`);

  return { html: out, status: 'ok' };
}

// ---- Main ------------------------------------------------------------------
async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

const SOFT = args.includes('--soft');
const SITE_URL = (process.env.SITE_URL || 'https://ayargo.com').replace(/\/$/, '');
const MAX_STALE_MS = 6 * 3600 * 1000;

/** Fresh prices from the live sources. Throws if gold or the exchange rates are unavailable. */
async function fetchLive() {
  const [goldOz, silverOz, platinumOz] = await Promise.all([
    metal('XAU', SANE.gold), metal('XAG', SANE.silver), metal('XPT', SANE.platinum),
  ]);
  if (!goldOz) throw new Error('no valid gold price');
  let rates;
  try {
    rates = normaliseRates((await getJson(FX_URL)).currencies);
  } catch (e) {
    throw new Error(`exchange rates unavailable (${e.message})`);
  }
  return { market: { goldOz, silverOz, platinumOz }, rates, stamp: new Date() };
}

/** Last snapshot this script published, used when the live sources are down (--soft only). */
async function fetchPublishedSnapshot() {
  const d = await getJson(`${SITE_URL}/prices.json`, 2);
  const stamp = new Date(d.generatedAt);
  const age = Date.now() - stamp.getTime();
  if (!(age >= 0 && age <= MAX_STALE_MS)) throw new Error(`published snapshot is too old (${stamp.toISOString()})`);
  if (!(d.goldOz >= SANE.gold[0] && d.goldOz <= SANE.gold[1]) || !d.rates) throw new Error('published snapshot is invalid');
  return { market: { goldOz: d.goldOz, silverOz: d.silverOz ?? null, platinumOz: d.platinumOz ?? null }, rates: d.rates, stamp };
}

async function copySite() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
  const skip = new Set(['.git', '.github', 'scripts', 'data', 'node_modules', path.basename(OUT)]);
  await cp(SRC, OUT, {
    recursive: true,
    filter: (p) => !skip.has(path.basename(p)) || path.resolve(p) === SRC,
  });
}

async function main() {
  let data;
  try {
    data = await fetchLive();
  } catch (e) {
    if (!SOFT) throw new Error(`${e.message}. Aborting so the previous deployment stays live`);
    console.warn(`[prerender] live prices unavailable (${e.message}); trying the last published snapshot`);
    try {
      data = await fetchPublishedSnapshot();
      console.warn(`[prerender] using snapshot from ${data.stamp.toISOString()}`);
    } catch (e2) {
      // Never block a code deploy over prices: the page still loads them in the browser.
      console.warn(`[prerender] no usable snapshot either (${e2.message}); building WITHOUT prerendered prices`);
      await copySite();
      return;
    }
  }
  const { market, rates, stamp } = data;
  const { goldOz, silverOz, platinumOz } = market;

  await copySite();

  const tally = {};
  for await (const file of walk(OUT)) {
    if (!file.endsWith('.html')) continue;
    const html = await readFile(file, 'utf8');
    if (!html.includes('id="karatGrid"')) continue;
    const res = prerenderPage(html, market, rates, stamp);
    tally[res.status] = (tally[res.status] || 0) + 1;
    if (res.status === 'ok') await writeFile(file, res.html);
    else console.warn(`[prerender] skipped ${path.relative(OUT, file)}: ${res.status}`);
  }

  await writeFile(path.join(OUT, 'prices.json'), JSON.stringify({ generatedAt: stamp.toISOString(), goldOz, silverOz, platinumOz, rates }, null, 1));
  console.log(`[prerender] gold=${goldOz} silver=${silverOz} platinum=${platinumOz} @ ${stamp.toISOString()}`);
  console.log('[prerender] pages:', JSON.stringify(tally));
}

// Shared with scripts/fb-post.mjs so the price constants live in one place.
export { COUNTRIES, GRAM_PER_OZ, SANE, LOCALES, FX_URL, getJson, metal, normaliseRates, money, nf };

// Run only when executed directly, not when imported.
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => { console.error(`[prerender] FAILED: ${e.message}`); process.exit(1); });
}
