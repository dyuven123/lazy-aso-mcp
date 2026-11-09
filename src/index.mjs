#!/usr/bin/env node
// Free name check for the App Store, over MCP. Everything runs on your machine: searches go straight to Apple.
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { fromItunes, STOREFRONTS, NAME_LANGS, DEFAULT_LIVE } from '../lib/rule.mjs';

const NAMES = Object.fromEntries(STOREFRONTS);
const MAX_COUNTRIES = 15;
// Apple blocks an address after about 20 searches a minute (measured 07.11.2026).
const PER_MINUTE = 18;
const LINK = 'https://lazyaso.com/?ref=mcp';
const stamps = [];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function slot() {
  for (;;) {
    const now = Date.now();
    while (stamps.length && now - stamps[0] >= 60_000) stamps.shift();
    if (stamps.length < PER_MINUTE) { stamps.push(now); return; }
    await wait(60_000 - (now - stamps[0]) + 50);
  }
}

async function search(term, cc, lang, limit) {
  await slot();
  const q = new URLSearchParams({ term, country: cc.toLowerCase(), media: 'software', limit: String(limit) });
  if (lang) q.set('lang', lang);
  const res = await fetch(`https://itunes.apple.com/search?${q}`);
  if (!res.ok) throw new Error(`Apple answered ${res.status}`);
  return (await res.json()).results ?? [];
}

export async function checkCountry(term, cc) {
  const base = await search(term, cc, null, 25);
  let cell = fromItunes(term, base, []);
  const langs = NAME_LANGS[cc]?.split(',') ?? [];
  if (cell.v === 'free' && langs.length) {
    const local = [];
    for (const lang of langs) local.push(await search(term, cc, lang, 50));
    cell = fromItunes(term, base, local);
  }
  return cell;
}

const LABEL = { free: 'FREE', taken: 'TAKEN', few: 'TOO FEW RESULTS' };

function line(cc, c) {
  const apps = (c.top ?? []).map(([place, name, ratings]) => `${name} (#${place}, ${ratings.toLocaleString('en-US')} ratings)`).join('; ');
  const who = apps ? `${c.v === 'taken' ? 'held by' : 'top results'}: ${apps}` : 'no apps shown';
  const brand = c.brand ? ' Looks like an existing brand.' : '';
  return `- ${NAMES[cc]}: ${LABEL[c.v]}, ${c.n}${c.n >= 25 ? '+' : ''} apps, ${who}.${brand}`;
}

export function report(term, rows, failed) {
  const count = (v) => rows.filter(([, c]) => c.v === v).length;
  return [
    `"${term}" as the start of an App Store name: free in ${count('free')}, taken in ${count('taken')}, too few results in ${count('few')} of ${rows.length} countries checked.`,
    '',
    ...rows.map(([cc, c]) => line(cc, c)),
    ...(failed.length ? ['', `Apple did not answer for: ${failed.map((cc) => NAMES[cc]).join(', ')}.`] : []),
    '',
    'Free = no app in the top 25 for this search starts its name with it. It says nothing about trademarks, how many people search for this, or whether a new app would rank.',
    `Search demand from Apple's official lists and the measured top-10 chance are in Lazy ASO: ${LINK}`,
  ].join('\n');
}

const server = new McpServer({ name: 'lazy-aso-name-check', version: '0.1.0' });

server.registerTool('check_app_name', {
  title: 'Check an App Store name',
  description: `Check whether a search phrase is free to use as the start of an iOS app name: country by country, does any app in the top 25 App Store results already start its name with it, and who holds it. Up to ${MAX_COUNTRIES} countries per call.`,
  inputSchema: {
    name: z.string().min(2).max(60).describe('The search phrase to start the app name with, e.g. "rock identifier"'),
    countries: z.array(z.string().length(2)).max(MAX_COUNTRIES).optional().describe('Two-letter App Store country codes, e.g. ["US","BR"]. Default: 15 large markets.'),
  },
  annotations: { readOnlyHint: true, openWorldHint: true },
}, async ({ name, countries }) => {
  const term = name.normalize('NFC').toLowerCase().replace(/\s+/g, ' ').trim();
  const asked = [...new Set((countries?.length ? countries : DEFAULT_LIVE).map((c) => c.toUpperCase()))];
  const unknown = asked.filter((cc) => !NAMES[cc]);
  if (unknown.length) return { isError: true, content: [{ type: 'text', text: `Not a supported App Store country: ${unknown.join(', ')}.` }] };
  const rows = [], failed = [];
  for (const cc of asked) {
    try { rows.push([cc, await checkCountry(term, cc)]); } catch { failed.push(cc); }
  }
  if (!rows.length) return { isError: true, content: [{ type: 'text', text: 'Apple did not answer. Apple limits searches per minute: try again in a minute.' }] };
  return { content: [{ type: 'text', text: report(term, rows, failed) }] };
});

await server.connect(new StdioServerTransport());
