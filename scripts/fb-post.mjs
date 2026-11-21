#!/usr/bin/env node
/**
 * Ayar — daily Facebook Page post.
 *
 * Builds an Arabic gold-price post from live prices and (optionally) publishes it
 * to your Facebook Page through the official Graph API. Posting to Pages you
 * administer through the API is allowed by Meta; this script does NOT touch
 * Facebook groups (automated group posting is not supported and gets accounts
 * restricted).
 *
 * Usage:
 *   node scripts/fb-post.mjs --mode morning            # dry run: prints the post only
 *   node scripts/fb-post.mjs --mode evening --publish  # really posts
 * Options:
 *   --country EG        market to post about (default EG)
 *   --state data/post-state.json
 *   --force             publish even if this mode was already posted today
 * Env (only needed with --publish):
 *   FB_PAGE_ID, FB_PAGE_TOKEN   Page ID and a Page access token (pages_manage_posts)
 *   GRAPH_VERSION               Graph API version, default v23.0
 *   SITE_URL                    default https://ayargo.com
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { COUNTRIES, FX_URL, GRAM_PER_OZ, SANE, getJson, metal, nf, normaliseRates } from './prerender.mjs';

const argv = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : fallback;
};
const flag = (name) => argv.includes(`--${name}`);

const MODE = opt('mode', 'morning');
const COUNTRY = opt('country', 'EG').toUpperCase();
const STATE_PATH = path.resolve(opt('state', 'data/post-state.json'));
const PUBLISH = flag('publish');
const FORCE = flag('force');
const SITE_URL = (process.env.SITE_URL || 'https://ayargo.com').replace(/\/$/, '');
const GRAPH_VERSION = process.env.GRAPH_VERSION || 'v23.0';
const TZ = 'Africa/Cairo';

const NAMES = { EG: 'مصر', SA: 'السعودية', AE: 'الإمارات', BH: 'البحرين', IQ: 'العراق', KW: 'الكويت', QA: 'قطر', OM: 'عُمان', JO: 'الأردن', DZ: 'الجزائر', MA: 'المغرب' };
const SLUGS = { EG: 'egypt', SA: 'saudi-arabia', AE: 'uae', BH: 'bahrain', IQ: 'iraq', KW: 'kuwait', QA: 'qatar', OM: 'oman', JO: 'jordan', DZ: 'algeria', MA: 'morocco' };
// Whole numbers read better in a post for high-value currencies.
const POST_DECIMALS = { EGP: 0, IQD: 0, DZD: 0 };
const LOCALE = 'ar-EG-u-nu-latn';

// A genuine question per weekday (Sun..Sat). Avoid "like/share/tag" asks: Facebook demotes those.
const QUESTIONS = [
  'هل تفضّل شراء الذهب مشغولات أم سبائك؟',
  'ما أكثر عيار تشتريه: 21 أم 18؟',
  'هل بدأت تدخّر بالذهب هذا العام؟',
  'ما أكثر ما يهمك عند الشراء: المصنعية أم السعر؟',
  'هل تتابع سعر الذهب يومياً أم عند الشراء فقط؟',
  'هل تخطط لشراء ذهب قريباً؟',
  'ما أفضل نصيحة تعلمتها عند شراء الذهب؟',
];
const HASHTAG_SETS = [
  '#سعر_الذهب #أسعار_الذهب #ذهب',
  '#سعر_الذهب_اليوم #عيار_21 #الذهب',
  '#أسعار_الذهب_اليوم #ذهب #استثمار',
];

if (!COUNTRIES[COUNTRY]) { console.error(`Unknown country ${COUNTRY}`); process.exit(1); }
if (!['morning', 'evening'].includes(MODE)) { console.error('--mode must be morning or evening'); process.exit(1); }

const c = COUNTRIES[COUNTRY];
const dec = POST_DECIMALS[c.cur] ?? 2;
const fmt = (v) => nf(LOCALE, dec, dec).format(v);
const dateKey = (d) => new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(d); // YYYY-MM-DD

async function loadState() {
  try { return JSON.parse(await readFile(STATE_PATH, 'utf8')); } catch { return { published: {}, history: {} }; }
}

function changeLine(prev, now, today) {
  if (!prev) return null;
  const diff = now - prev.gram21;
  const pct = (diff / prev.gram21) * 100;
  const since = dateKey(new Date(prev.t)) === today ? 'منذ الصباح' : 'عن آخر تحديث';
  if (Math.abs(pct) < 0.05) return `➖ عيار 21 مستقر تقريباً ${since}`;
  const arrow = diff > 0 ? '📈 ارتفع' : '📉 انخفض';
  return `${arrow} عيار 21 بمقدار ${fmt(Math.abs(diff))} ${c.symbol} (${nf(LOCALE, 2, 2).format(Math.abs(pct))}%) ${since}`;
}

function buildPost({ goldOz, gram24, now, prev }) {
  const today = dateKey(now);
  const dateText = new Intl.DateTimeFormat('ar-EG-u-nu-latn', { timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(now);
  const g = (k) => (gram24 * k) / 24;
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(new Intl.DateTimeFormat('en-US', { timeZone: TZ, weekday: 'short' }).format(now));

  const lines = [
    MODE === 'morning' ? `🟡 سعر الذهب اليوم في ${NAMES[COUNTRY]}` : `🌙 تحديث أسعار الذهب المسائي في ${NAMES[COUNTRY]}`,
    `📅 ${dateText}`,
    '',
    `✨ عيار 24: ${fmt(g(24))} ${c.symbol}`,
    `⭐ عيار 21: ${fmt(g(21))} ${c.symbol}`,
    `🔸 عيار 22: ${fmt(g(22))} ${c.symbol}`,
    `🔹 عيار 18: ${fmt(g(18))} ${c.symbol}`,
  ];
  if (COUNTRY === 'EG') {
    // Same formula as the site: 8 g of 21K with a 3% premium.
    lines.push(`🪙 الجنيه الذهب: ${fmt(g(21) * 1.03 * 8)} ${c.symbol}`);
  }
  const change = changeLine(prev, g(21), today);
  if (change) lines.push('', change);
  lines.push('', `🌍 الأونصة عالمياً: ${nf(LOCALE, 2, 2).format(goldOz)} دولار`);
  if (MODE === 'evening') lines.push('', `💬 ${QUESTIONS[weekday % QUESTIONS.length]}`);

  const url = `${SITE_URL}/gold-price/${SLUGS[COUNTRY]}/?utm_source=facebook&utm_medium=social&utm_campaign=daily_${MODE}`;
  lines.push(
    '',
    '⚠️ الأسعار استرشادية وتختلف عن محلات الصاغة بسبب المصنعية والضرائب.',
    '🔔 تابع السعر لحظياً، واحسب المصنعية والزكاة، وفعّل تنبيه السعر مجاناً:',
    url,
    '',
    HASHTAG_SETS[weekday % HASHTAG_SETS.length],
  );
  return lines.join('\n');
}

async function publish(message) {
  const { FB_PAGE_ID, FB_PAGE_TOKEN } = process.env;
  if (!FB_PAGE_ID || !FB_PAGE_TOKEN) throw new Error('FB_PAGE_ID and FB_PAGE_TOKEN must be set to publish');
  const base = process.env.GRAPH_BASE || 'https://graph.facebook.com';
  const res = await fetch(`${base}/${GRAPH_VERSION}/${encodeURIComponent(FB_PAGE_ID)}/feed`, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ message, access_token: FB_PAGE_TOKEN }),
    signal: AbortSignal.timeout(20000),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || !body.id) {
    // Never print the token; Graph error messages don't include it.
    throw new Error(`Facebook API ${res.status}: ${body?.error?.message || 'unknown error'}${body?.error?.code ? ` (code ${body.error.code})` : ''}`);
  }
  return body.id;
}

async function main() {
  const now = new Date();
  const today = dateKey(now);
  const state = await loadState();
  const key = `${today}:${COUNTRY}:${MODE}`;
  if (PUBLISH && !FORCE && state.published?.[key]) {
    console.log(`[fb-post] ${key} already published (${state.published[key]}), skipping`);
    return;
  }

  const goldOz = await metal('XAU', SANE.gold);
  if (!goldOz) throw new Error('no valid gold price; not posting');
  const rates = normaliseRates((await getJson(FX_URL)).currencies);
  const rate = rates[c.cur];
  if (!rate) throw new Error(`no exchange rate for ${c.cur}; not posting`);

  const gram24 = (goldOz / GRAM_PER_OZ) * rate;
  const hist = state.history?.[COUNTRY] || [];
  const prev = hist.length ? hist[hist.length - 1] : null;
  const message = buildPost({ goldOz, gram24, now, prev });

  console.log('----- post preview -----\n' + message + '\n------------------------');
  if (!PUBLISH) { console.log('[fb-post] dry run (add --publish to post)'); return; }

  const id = await publish(message);
  console.log(`[fb-post] published: ${id}`);

  state.published = { ...(state.published || {}), [key]: id };
  // Keep the state file small: last 40 snapshots and last 60 publish records.
  state.history = { ...(state.history || {}), [COUNTRY]: [...hist, { t: now.toISOString(), gram21: (gram24 * 21) / 24, mode: MODE }].slice(-40) };
  state.published = Object.fromEntries(Object.entries(state.published).slice(-60));
  await mkdir(path.dirname(STATE_PATH), { recursive: true });
  await writeFile(STATE_PATH, JSON.stringify(state, null, 1) + '\n');
}

main().catch((e) => { console.error(`[fb-post] FAILED: ${e.message}`); process.exit(1); });
