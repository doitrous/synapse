// scripts/content/pagetext.test.mjs
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, existsSync, readdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const PDF = 'scripts/content/fixtures/pagetext/two-pages.pdf';
const cacheDir = mkdtempSync(path.join(tmpdir(), 'pagetext-'));
const run = (...args) => spawnSync('node', ['scripts/content/pagetext.mjs', ...args], { encoding: 'utf8', env: { ...process.env, NISHANY_PAGETEXT_CACHE: cacheDir } });

before(() => {
  if (existsSync(PDF)) return;
  const py = `import fitz,os
os.makedirs(${JSON.stringify(path.dirname(PDF))}, exist_ok=True)
d=fitz.open()
for t in ("PAGE ONE alpha","PAGE TWO beta"):
    p=d.new_page(); p.insert_text((72,72), t)
d.save(${JSON.stringify(PDF)})`;
  const r = spawnSync('python3', ['-c', py], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr);
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
  assert.match(r.stdout, /^p1 words=3 garbled=no$/m);
  assert.match(r.stdout, /^p2 words=3 garbled=no$/m);
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
  assert.match(md, /\| file \| pages \| words \| garbled pages \|/);
  assert.match(md, /two-pages\.pdf \| 2 \| 6 \| 1 \|/);
});
