// scripts/content/pagetext.test.mjs
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, existsSync, readdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const PDF = 'scripts/content/fixtures/pagetext/two-pages.pdf';
const SCAN_PDF = 'scripts/content/fixtures/pagetext/scanned-page.pdf';
const KEYS_PDF = 'scripts/content/fixtures/pagetext/visual-keys.pdf';
const cacheDir = mkdtempSync(path.join(tmpdir(), 'pagetext-'));
const run = (...args) => spawnSync('node', ['scripts/content/pagetext.mjs', ...args], { encoding: 'utf8', env: { ...process.env, NISHANY_PAGETEXT_CACHE: cacheDir } });

before(() => {
  if (!existsSync(PDF)) {
    const py = `import fitz,os
os.makedirs(${JSON.stringify(path.dirname(PDF))}, exist_ok=True)
d=fitz.open()
for t in ("PAGE ONE alpha","PAGE TWO beta"):
    p=d.new_page(); p.insert_text((72,72), t)
d.save(${JSON.stringify(PDF)})`;
    const r = spawnSync('python3', ['-c', py], { encoding: 'utf8' });
    assert.equal(r.status, 0, r.stderr);
  }
  if (!existsSync(SCAN_PDF)) {
    // Build a page whose only content is an IMAGE of text (no text layer), so
    // pdftotext yields 0 words and the page can only be read via OCR.
    const py = `import fitz, os
os.makedirs(${JSON.stringify(path.dirname(SCAN_PDF))}, exist_ok=True)
src = fitz.open()
sp = src.new_page(width=900, height=300)
sp.insert_text((30, 170), "SURFACTANT REDUCES ALVEOLAR SURFACE TENSION", fontsize=42)
pix = sp.get_pixmap(dpi=150)
png_bytes = pix.tobytes("png")
d = fitz.open()
page = d.new_page(width=900, height=300)
page.insert_image(fitz.Rect(0, 0, 900, 300), stream=png_bytes)
d.save(${JSON.stringify(SCAN_PDF)}, deflate=True, garbage=4)`;
    const r = spawnSync('python3', ['-c', py], { encoding: 'utf8' });
    assert.equal(r.status, 0, r.stderr);
  }
  if (!existsSync(KEYS_PDF)) {
    // Two questions with a visually-marked key (Q1 option C in red text, Q2
    // option B under a highlight annotation) plus a third, unmarked question.
    const py = `import pymupdf as fitz, os
os.makedirs(${JSON.stringify(path.dirname(KEYS_PDF))}, exist_ok=True)
d = fitz.open()
p = d.new_page()
y = 72
p.insert_text((72, y), "Q1) What is the powerhouse of the cell?", fontsize=12); y += 20
p.insert_text((72, y), "A) Nucleus", fontsize=12); y += 20
p.insert_text((72, y), "B) Ribosome", fontsize=12); y += 20
p.insert_text((72, y), "C) Mitochondria", fontsize=12, color=(1, 0, 0)); y += 20
p.insert_text((72, y), "D) Golgi", fontsize=12); y += 30
p.insert_text((72, y), "Q2) Which vitamin is fat soluble?", fontsize=12); y += 20
p.insert_text((72, y), "A) Vitamin C", fontsize=12); y += 20
opt_b_y = y
p.insert_text((72, y), "B) Vitamin D", fontsize=12); y += 20
p.insert_text((72, y), "C) Vitamin B12", fontsize=12); y += 20
p.insert_text((72, y), "D) Folate", fontsize=12); y += 30
rect = fitz.Rect(68, opt_b_y - 10, 200, opt_b_y + 4)
p.add_highlight_annot(rect)
p.insert_text((72, y), "Q3) Unmarked question with no visible key", fontsize=12); y += 20
p.insert_text((72, y), "A) One", fontsize=12); y += 20
p.insert_text((72, y), "B) Two", fontsize=12); y += 20
p.insert_text((72, y), "C) Three", fontsize=12); y += 20
p.insert_text((72, y), "D) Four", fontsize=12)
d.save(${JSON.stringify(KEYS_PDF)})`;
    const r = spawnSync('python3', ['-c', py], { encoding: 'utf8' });
    assert.equal(r.status, 0, r.stderr);
  }
});

test('show extracts on first touch, caches, and prints page headers', () => {
  const r = run('show', PDF, '--pages', '2');
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /=== page 2 ===/);
  assert.match(r.stdout, /PAGE TWO beta/);
  assert.doesNotMatch(r.stdout, /PAGE ONE/);
  const files = readdirSync(cacheDir);
  assert.equal(files.length, 1);
  const j = JSON.parse(readFileSync(path.join(cacheDir, files[0]), 'utf8'));
  assert.equal(j.pages.length, 2);
  assert.equal(j.pages[1].garbled, false);
});

test('status lists pages with word counts', () => {
  const r = run('status', PDF);
  assert.match(r.stdout, /^p1 words=3 garbled=no ocr=no$/m);
  assert.match(r.stdout, /^p2 words=3 garbled=no ocr=no$/m);
});

test('render refuses a page that is not marked garbled, then allows it after marking', () => {
  const out = mkdtempSync(path.join(tmpdir(), 'render-'));
  let r = run('render', PDF, '--pages', '1', '--out', out);
  assert.equal(r.status, 2);
  assert.match(r.stdout + r.stderr, /not marked garbled/);
  r = run('mark-garbled', PDF, '--pages', '1');
  assert.equal(r.status, 0);
  r = run('render', PDF, '--pages', '1', '--out', out);
  assert.equal(r.status, 0, r.stderr);
  assert.ok(readdirSync(out).some((f) => /-p1\.png$/.test(f)));
});

test('index writes a markdown table with one row per pdf', () => {
  const outFile = path.join(mkdtempSync(path.join(tmpdir(), 'idx-')), 'INDEX.md');
  const r = run('index', path.dirname(PDF), '--out', outFile);
  assert.equal(r.status, 0, r.stderr);
  const md = readFileSync(outFile, 'utf8');
  assert.match(md, /\| file \| pages \| words \| garbled pages \| ocr pages \|/);
  assert.match(md, /two-pages\.pdf \| 2 \| 6 \| 1 \| 0 \|/);
});

test('a scanned (image-only) page extracts as 0 words and garbled', () => {
  const r = run('status', SCAN_PDF);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /^p1 words=0 garbled=yes ocr=no$/m);
});

test('ocr fills in text for a scanned page, marks it ocr=yes, and show/index reflect it', () => {
  let r = run('ocr', SCAN_PDF, '--pages', '1');
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /^p1 ocr words=\d+ psm=\d+$/m);

  r = run('status', SCAN_PDF);
  assert.match(r.stdout, /^p1 words=(\d+) garbled=(yes|no) ocr=yes$/m);
  const wordsMatch = /^p1 words=(\d+) /m.exec(r.stdout);
  assert.ok(Number(wordsMatch[1]) >= 2, `expected >=2 OCR'd words, got: ${r.stdout}`);

  r = run('show', SCAN_PDF, '--pages', '1');
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /=== page 1 \(ocr\) ===/);
  assert.match(r.stdout, /SURFACTANT/i);

  const outFile = path.join(mkdtempSync(path.join(tmpdir(), 'idx-ocr-')), 'INDEX.md');
  r = run('index', path.dirname(SCAN_PDF), '--out', outFile);
  assert.equal(r.status, 0, r.stderr);
  const md = readFileSync(outFile, 'utf8');
  assert.match(md, /scanned-page\.pdf \| 1 \| \d+ \| \d+ \| 1 \|/);
});

test('grep on a pdf finds a single matching line and reports the page', () => {
  const r = run('grep', PDF, 'beta');
  assert.equal(r.status, 0, r.stderr);
  const matches = r.stdout.split('\n').filter((l) => l.includes(`${PDF} p2: `) && l.includes('PAGE TWO beta'));
  assert.equal(matches.length, 1, r.stdout);
  assert.match(r.stdout, /^1 hit\(s\) in 2 page\(s\) across 1 file\(s\)$/m);
});

test('grep with no matches prints the 0-hit summary and exits 1', () => {
  const r = run('grep', PDF, 'zzzz');
  assert.equal(r.status, 1, r.stderr);
  assert.match(r.stdout, /^0 hit\(s\) in 2 page\(s\) across 1 file\(s\)$/m);
});

test('grep on a directory walks all pdfs and reports the two-page fixture', () => {
  const r = run('grep', path.dirname(PDF), 'PAGE');
  assert.equal(r.status, 0, r.stderr);
  const lines = r.stdout.split('\n').filter((l) => / p\d+: /.test(l));
  assert.ok(lines.length >= 2, r.stdout);
  assert.ok(lines.some((l) => l.includes('two-pages.pdf')), r.stdout);
});

test('keys finds a red-text key, a highlight-annot key, and reports the unmarked question as ambiguous', () => {
  const r = run('keys', KEYS_PDF);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /^p1 Q1: C {2}\(red-text\)$/m);
  assert.match(r.stdout, /^p1 Q2: B {2}\(highlight-annot\)$/m);
  assert.match(r.stdout, /^p1 Q3: \? {2}\(0 marked\)$/m);
  assert.match(r.stdout, /^2 keyed \/ 0 ambiguous \/ 1 unmarked across 1 page\(s\)$/m);
});

test('keys --json reports one row per question with letter|null and reasons', () => {
  const r = run('keys', KEYS_PDF, '--json');
  assert.equal(r.status, 0, r.stderr);
  const rows = JSON.parse(r.stdout.trim());
  assert.equal(rows.length, 3);
  assert.deepEqual(rows[0], { page: 1, question: '1', letter: 'C', reasons: ['red-text'], markedOptions: ['C'] });
  assert.deepEqual(rows[1], { page: 1, question: '2', letter: 'B', reasons: ['highlight-annot'], markedOptions: ['B'] });
  assert.deepEqual(rows[2], { page: 1, question: '3', letter: null, reasons: [], markedOptions: [] });
});

test('keys on a page with no text layer reports it and skips it from the summary', () => {
  const r = run('keys', SCAN_PDF, '--pages', '1');
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /^p1: no text layer — keys need ocr\+render$/m);
  assert.match(r.stdout, /^0 keyed \/ 0 ambiguous \/ 0 unmarked across 0 page\(s\)$/m);
});
