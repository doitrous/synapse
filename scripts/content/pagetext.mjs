#!/usr/bin/env node
// scripts/content/pagetext.mjs — extract each PDF's text ONCE, cache by content hash, serve pages.
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync, statSync, mkdtempSync, rmSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import path from 'node:path';

const CACHE = process.env.NISHANY_PAGETEXT_CACHE || path.join(homedir(), '.cache', 'nishany-pagetext');

function die(msg, code = 2) { console.log(msg); process.exit(code); }
function sha256(file) { return createHash('sha256').update(readFileSync(file)).digest('hex'); }
function cachePath(hash) { return path.join(CACHE, `${hash}.json`); }
function parsePages(spec, max) {
  if (!spec) return Array.from({ length: max }, (_, i) => i + 1);
  const out = new Set();
  for (const part of spec.split(',')) {
    const [a, b] = part.split('-').map(Number);
    for (let n = a; n <= (b ?? a); n++) if (n >= 1 && n <= max) out.add(n);
  }
  return [...out].sort((x, y) => x - y);
}
function pageCount(pdf) {
  const r = spawnSync('pdfinfo', [pdf], { encoding: 'utf8' });
  const m = /^Pages:\s+(\d+)/m.exec(r.stdout ?? '');
  if (!m) die(`pdfinfo could not read ${pdf}: ${r.stderr}`);
  return Number(m[1]);
}
function extract(pdf) {
  const n = pageCount(pdf);
  const pages = [];
  for (let p = 1; p <= n; p++) {
    const r = spawnSync('pdftotext', ['-layout', '-f', String(p), '-l', String(p), pdf, '-'], { encoding: 'utf8', maxBuffer: 1 << 28 });
    const text = (r.stdout ?? '').replace(/\f/g, '').trimEnd();
    const words = text.split(/\s+/).filter(Boolean).length;
    pages.push({ n: p, text, words, garbled: words === 0 });
  }
  return { source: path.resolve(pdf), sha256: sha256(pdf), extractor: 'pdftotext -layout', extractedAt: new Date().toISOString(), pages };
}
function load(pdf) {
  if (!existsSync(pdf)) die(`no such file: ${pdf}`);
  const hash = sha256(pdf);
  const file = cachePath(hash);
  if (existsSync(file)) return { entry: JSON.parse(readFileSync(file, 'utf8')), file };
  mkdirSync(CACHE, { recursive: true });
  const entry = extract(pdf);
  writeFileSync(file, JSON.stringify(entry));
  return { entry, file };
}
function save(entry, file) { writeFileSync(file, JSON.stringify(entry)); }
function opt(args, name) { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; }
function countWords(text) { return text.split(/\s+/).filter(Boolean).length; }
function ocrPage(target, n, dpi, tmpDir) {
  const prefix = path.join(tmpDir, `p${n}`);
  const r = spawnSync('pdftoppm', ['-r', String(dpi), '-f', String(n), '-l', String(n), '-png', '-singlefile', target, prefix], { encoding: 'utf8' });
  if (r.status !== 0) die(`pdftoppm failed on page ${n}: ${r.stderr}`, 1);
  const png = `${prefix}.png`;
  try {
    let psm = 6;
    let t = spawnSync('tesseract', [png, '-', '--psm', '6', '-l', 'eng'], { encoding: 'utf8', maxBuffer: 1 << 28 });
    let text = (t.stdout ?? '').trim();
    let words = countWords(text);
    if (words < 20) {
      const t2 = spawnSync('tesseract', [png, '-', '--psm', '4', '-l', 'eng'], { encoding: 'utf8', maxBuffer: 1 << 28 });
      text = (t2.stdout ?? '').trim();
      words = countWords(text);
      psm = 4;
    }
    return { text, words, psm };
  } finally {
    rmSync(png, { force: true });
  }
}

const [cmd, target, ...args] = process.argv.slice(2);
if (!cmd || !target) die(`usage: pagetext.mjs <show|status|mark-garbled|unmark-garbled|render|ocr|index> <pdf|dir> [--pages 3-5] [--out <dir|file>] [--dpi 300] [--force]`);

if (cmd === 'index') {
  const rows = [];
  (function walk(dir) {
    for (const f of readdirSync(dir)) {
      const p = path.join(dir, f);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.pdf$/i.test(f)) {
        const { entry } = load(p);
        rows.push(`| ${path.relative(target, p)} | ${entry.pages.length} | ${entry.pages.reduce((s, x) => s + x.words, 0)} | ${entry.pages.filter((x) => x.garbled).length} | ${entry.pages.filter((x) => x.ocr).length} |`);
      }
    }
  })(target);
  const md = ['| file | pages | words | garbled pages | ocr pages |', '|---|---:|---:|---:|---:|', ...rows.sort()].join('\n') + '\n';
  const out = opt(args, '--out');
  if (out) writeFileSync(out, md); else process.stdout.write(md);
  process.exit(0);
}

const { entry, file } = load(target);
const pages = parsePages(opt(args, '--pages'), entry.pages.length);

if (cmd === 'show') {
  for (const n of pages) {
    const p = entry.pages[n - 1];
    console.log(`=== page ${n}${p.ocr ? ' (ocr)' : ''} ===\n${p.text}\n`);
  }
} else if (cmd === 'status') {
  for (const p of entry.pages) console.log(`p${p.n} words=${p.words} garbled=${p.garbled ? 'yes' : 'no'} ocr=${p.ocr ? 'yes' : 'no'}`);
} else if (cmd === 'mark-garbled' || cmd === 'unmark-garbled') {
  for (const n of pages) entry.pages[n - 1].garbled = cmd === 'mark-garbled';
  save(entry, file);
  console.log(`${cmd}: pages ${pages.join(',')}`);
} else if (cmd === 'ocr') {
  const dpi = Number(opt(args, '--dpi') || 300);
  const force = args.includes('--force');
  const tmp = mkdtempSync(path.join(tmpdir(), 'pagetext-ocr-'));
  try {
    for (const n of pages) {
      const page = entry.pages[n - 1];
      if (page.words !== 0 && !force) continue;
      const { text, words, psm } = ocrPage(target, n, dpi, tmp);
      page.text = text;
      page.words = words;
      page.garbled = words < 20;
      page.ocr = true;
      page.ocrDpi = dpi;
      page.ocrPsm = psm;
      console.log(`p${n} ocr words=${words} psm=${psm}`);
    }
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
  save(entry, file);
} else if (cmd === 'render') {
  const out = opt(args, '--out') || '.';
  mkdirSync(out, { recursive: true });
  for (const n of pages) {
    const page = entry.pages[n - 1];
    if (!page.garbled && !args.includes('--force')) die(`page ${n} is not marked garbled — read it with 'show' instead, or mark-garbled first (render costs ~50× the tokens of text)`);
    if (page.words === 0 && !page.ocr) console.log(`page ${n}: run \`pagetext.mjs ocr\` first; render only if OCR is unreadable`);
    const prefix = path.join(out, `${entry.sha256.slice(0, 8)}-p${n}`);
    const r = spawnSync('pdftoppm', ['-r', '200', '-f', String(n), '-l', String(n), '-png', '-singlefile', target, prefix], { encoding: 'utf8' });
    if (r.status !== 0) die(`pdftoppm failed: ${r.stderr}`, 1);
    console.log(`${prefix}.png`);
  }
} else die(`unknown command ${cmd}`);
