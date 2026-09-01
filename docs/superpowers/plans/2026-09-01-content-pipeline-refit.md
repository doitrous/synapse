# Content Pipeline Refit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cut the tokens a content-authoring subagent burns per question by roughly an order of magnitude — without moving any quality bar — by making cached text, quiet gates, seed→generate authoring, small ledgers, and 2-page lane cards the standard way every university lane works.

**Architecture:** Three small, university-neutral CLI tools land under `scripts/content/` (a quiet gate wrapper, a page-text cache, an MCQ seed generator + ledger). They wrap the existing gates and formats rather than replacing them, so nothing about validation or the import contract changes. Then the manual and per-lane LANE-CARDs are rewritten to make those tools the default path and the full manual a reference consulted only at a wall.

**Tech Stack:** Node 24 ESM (`.mjs`, `node --test`), `pdftotext`/`pdftoppm` (poppler, installed at /opt/homebrew/bin), Python 3.14 + PyMuPDF (`fitz`, installed) for render fallback. No new npm dependencies.

**Spec:** Omar's approved six refinements (chief-of-staff session, 2026-09-01): (1) extract once, cache forever; (2) 2-page LANE-CARD instead of the manual; (3) small progress ledgers; (4) quiet gates; (5) seed→generate everywhere; (6) tighter dispatch scope. Recorded in `docs/chief-of-staff/BOARD.md` 2026-09-01 entry.

## Global Constraints

- Quality bars are UNCHANGED and must be restated, never weakened, in every doc touched: printed keys stand as printed; `explanation_<correct>` ≥ 3 sentences and one explanation per distractor; law of voice (student-facing text states the medicine directly, provenance only in `field_notes`/citations); search-before-mint, one idea = one concept id across universities (unsalted); two-sided coverage; every record carries non-empty `universities`, canonical year ids (`ASU_Y1`, not `Year 1`), prefixed module ids (`ASU-MBG`, `AU-MED-105`), the six per-university tags; reviewer/publisher = `Medical team, Admin team` / `Admin team`.
- The import contract does not change. `src/data/authoringDocs.test.ts` must stay green after every manual edit (it asserts every contract field key is named in its manual file).
- Existing gates are the gates: `medical:batch` (positional file + repeatable `--with`), `medical:simulate` (positional files ONLY — it has no `--with`; passing one silently drops following files), `medical:audit --source <emit>`. The new wrapper calls them; it never re-implements validation.
- Kasr's generator (`scripts/kasr/build-batches.ts`, salted `mintConceptId`) is NOT touched. The new generator is for lanes that today hand-write markdown (Ain Shams, Alexandria, MUST, future Mansoura/Menoufia); Helwan's per-family scripts are left as they are (module complete).
- Page-text caches are local, shared across worktrees, and gitignored (they are large and derived). What IS committed is the per-lane readability index the cache tool prints.
- Every task: work in an isolated worktree off `origin/main`, fresh `node_modules` symlink (`ln -s "<main checkout>/node_modules" node_modules`), commit small, push gate-clean work to `main` (re-fetch + rebase before each push; other sessions push to main mid-task). Commit trailer: `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.
- Tests for the new scripts live next to them as `scripts/content/*.test.mjs` and run with `npm run test:content` (added in Task 1). Test fixtures live in `scripts/content/fixtures/`.

---

## File map

| Path | Responsibility | Task |
|---|---|---|
| `scripts/content/gate.mjs` | Quiet wrapper over batch / simulate / audit: full JSON to a log file, ≤12-line summary to stdout, exit code mirrors the gate | 1 |
| `scripts/content/gate.test.mjs` | Summary formatting + exit-code + positional-simulate tests against fixtures | 1 |
| `scripts/content/pagetext.mjs` | Page-text cache CLI: extract once per PDF (sha256-keyed), print requested pages, mark/list garbled pages, per-lane readability index | 2 |
| `scripts/content/pagetext.test.mjs` | Cache hit/miss, page ranges, garbled marking, index output | 2 |
| `scripts/content/emit-mcq.mjs` | Seed JSON → import-format MCQ batch markdown (the hand-authored ASU/AU field order) | 3 |
| `scripts/content/ledger.mjs` | Seed dir (+ optional triage key list) → `LEDGER.md` done/held/remaining table | 3 |
| `scripts/content/seed.schema.md` | The seed contract, one page, with a complete example | 3 |
| `scripts/content/emit-mcq.test.mjs`, `ledger.test.mjs` | Round-trip: seed → batch validates with `medical:batch`; ledger counts | 3 |
| `Instruction Manual for Content Creation/LANE-CARD-TEMPLATE.md` | The 2-page card skeleton every lane card follows | 4 |
| `docs/{Ain-Shams,Alexandria,Kasr,MUST,Helwan}-Source-Imports/LANE-CARD.md` | Per-lane 2-page cards | 4 |
| `Instruction Manual for Content Creation/00-START-HERE.md` | New §0.5 "How an agent works (token discipline)"; §8 Gates points at `gate.mjs` | 5 |
| `Instruction Manual for Content Creation/13-orchestration.md` | Dispatch template = LANE-CARD + ledger delta + one cluster; S-stage for extraction cache; hazards | 5 |
| `Instruction Manual for Content Creation/SHARED-TOOLCHAIN.md` | Reference entries for the three new tools | 5 |
| `Instruction Manual for Content Creation/05-questions.md` | "Authoring route: seed → emit-mcq" paragraph (field keys unchanged) | 5 |
| `package.json` | `test:content`, `content:gate`, `content:pagetext`, `content:emit`, `content:ledger` scripts | 1, 2, 3 |
| `.gitignore` | `.gates/` | 1 |

---

### Task 1: Quiet gate wrapper (`scripts/content/gate.mjs`)

**Files:**
- Create: `scripts/content/gate.mjs`, `scripts/content/gate.test.mjs`, `scripts/content/fixtures/gate/` (two tiny batch files: one valid concept batch copied from any 2-record slice of `docs/import-ready/concept/*.md`, one deliberately broken copy with its `## id` line deleted)
- Modify: `package.json` (add `"test:content": "node --test scripts/content/*.test.mjs"`, `"content:gate": "node scripts/content/gate.mjs"`), `.gitignore` (add `.gates/`)

**Interfaces:**
- Consumes: `scripts/validate-content-batch.mjs` (prints one JSON object `{file, kind, items, notes, errors}`), `scripts/simulate-content-import.mjs` (prints `{source, emitted, batches, before, after, delta, ..., skipped, errors}`, exit 1 on errors), `scripts/audit-medical-content-fields.mjs --source <file>` (prints a JSON report).
- Produces (later tasks and LANE-CARDs rely on these exact forms):
  - `node scripts/content/gate.mjs batch <batch.md> [--with <sibling.md> ...]`
  - `node scripts/content/gate.mjs simulate <batch.md> [<batch.md> ...] [--emit <out.json>]` (positional, apply order; if a `--with` is passed it is REJECTED with a one-line error explaining simulate has no `--with`)
  - `node scripts/content/gate.mjs audit --source <emit.json> [--ids <prefix-or-regex>]`
  - Each run writes the full gate stdout to `.gates/<subcommand>-<YYYYMMDD-HHMMSS>.json` and prints to stdout at most: one `GATE <subcommand> <target>: ...` line with the counts, then up to 5 error lines (each truncated to 200 chars), then `full log: .gates/<file>`. Exit code = the underlying gate's exit code, or 1 when its `errors` array is non-empty.

- [ ] **Step 1: Write the failing test**

```js
// scripts/content/gate.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readdirSync, rmSync, existsSync } from 'node:fs';

const run = (...args) => spawnSync('node', ['scripts/content/gate.mjs', ...args], { encoding: 'utf8' });

test('batch: clean fixture prints one summary line and exits 0', () => {
  const r = run('batch', 'scripts/content/fixtures/gate/concepts-ok.md');
  assert.equal(r.status, 0, r.stdout + r.stderr);
  const lines = r.stdout.trim().split('\n');
  assert.match(lines[0], /^GATE batch .*concepts-ok\.md: items=\d+ errors=0$/);
  assert.match(lines.at(-1), /^full log: \.gates\/batch-\d{8}-\d{6}\.json$/);
  assert.ok(lines.length <= 3);
});

test('batch: broken fixture exits 1 and shows at most 5 error lines', () => {
  const r = run('batch', 'scripts/content/fixtures/gate/concepts-broken.md');
  assert.equal(r.status, 1);
  const errLines = r.stdout.split('\n').filter(l => l.startsWith('  - '));
  assert.ok(errLines.length >= 1 && errLines.length <= 5, r.stdout);
  assert.ok(errLines.every(l => l.length <= 204));
});

test('simulate: --with is rejected with an explanation', () => {
  const r = run('simulate', 'scripts/content/fixtures/gate/concepts-ok.md', '--with', 'x.md');
  assert.equal(r.status, 2);
  assert.match(r.stdout + r.stderr, /simulate has no --with/);
});

test('simulate: clean fixture prints counts line', () => {
  const r = run('simulate', 'scripts/content/fixtures/gate/concepts-ok.md');
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /^GATE simulate 1 file\(s\): batches=\d+ created=\d+ updated=\d+ rejected=\d+ skipped=\d+ errors=0/m);
});

test('log files are written under .gates/', () => {
  assert.ok(existsSync('.gates'));
  assert.ok(readdirSync('.gates').some(f => /^batch-\d{8}-\d{6}\.json$/.test(f)));
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node --test scripts/content/gate.test.mjs`
Expected: FAIL — `Cannot find module 'scripts/content/gate.mjs'` (all five tests fail).

- [ ] **Step 3: Create the two fixtures**

`scripts/content/fixtures/gate/concepts-ok.md`: the file header comment plus the first two `# Item` records of `docs/import-ready/concept/102-INT-concepts.md` (copy verbatim; keep the `---` separator between records). Verify it validates on its own: `node --experimental-strip-types scripts/validate-content-batch.mjs scripts/content/fixtures/gate/concepts-ok.md` must print `"errors": []`. If the chosen records reference ids the standalone check flags, pick two other records from the same file until it is clean.
`scripts/content/fixtures/gate/concepts-broken.md`: the same file with the first record's `## id` line and the id value line beneath it deleted.

- [ ] **Step 4: Implement the wrapper**

```js
#!/usr/bin/env node
// scripts/content/gate.mjs — quiet wrapper over the content gates.
// Full gate output goes to .gates/<sub>-<stamp>.json; stdout gets a ≤12-line summary.
import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const NODE = ['--experimental-strip-types'];
const GATES = {
  batch: 'scripts/validate-content-batch.mjs',
  simulate: 'scripts/simulate-content-import.mjs',
  audit: 'scripts/audit-medical-content-fields.mjs',
};
const MAX_ERR_LINES = 5;
const MAX_ERR_CHARS = 200;

function stamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}

function usage(code = 2) {
  console.log(`usage:
  node scripts/content/gate.mjs batch <batch.md> [--with <sibling.md> ...]
  node scripts/content/gate.mjs simulate <batch.md> [<batch.md> ...] [--emit <out.json>]
  node scripts/content/gate.mjs audit --source <emit.json> [--ids <regex>]`);
  process.exit(code);
}

function parseJson(stdout) {
  // Gates print one pretty JSON object; tolerate leading log lines.
  const start = stdout.indexOf('{');
  if (start < 0) return null;
  try { return JSON.parse(stdout.slice(start)); } catch { return null; }
}

function errorLines(errors) {
  return (errors ?? []).slice(0, MAX_ERR_LINES).map((e) => {
    const s = typeof e === 'string' ? e : JSON.stringify(e);
    return '  - ' + (s.length > MAX_ERR_CHARS ? s.slice(0, MAX_ERR_CHARS - 1) + '…' : s);
  });
}

const [sub, ...rest] = process.argv.slice(2);
if (!GATES[sub]) usage();
if (sub === 'simulate' && rest.includes('--with')) {
  console.log('error: simulate has no --with flag (it silently drops every file after it). Pass all files positionally in apply order.');
  process.exit(2);
}
if (sub === 'audit' && !rest.includes('--source')) usage();

let idsFilter = null;
if (sub === 'audit') {
  const i = rest.indexOf('--ids');
  if (i >= 0) { idsFilter = new RegExp(rest[i + 1]); rest.splice(i, 2); }
}

const r = spawnSync('node', [...NODE, GATES[sub], ...rest], { encoding: 'utf8', maxBuffer: 1 << 30 });
mkdirSync('.gates', { recursive: true });
const logFile = path.join('.gates', `${sub}-${stamp()}.json`);
writeFileSync(logFile, (r.stdout ?? '') + (r.stderr ? `\n/* stderr */\n${r.stderr}` : ''));

const j = parseJson(r.stdout ?? '');
let errors = j?.errors ?? [];
let head;
if (sub === 'batch') {
  const target = rest[0];
  head = `GATE batch ${target}: items=${j?.items ?? '?'} errors=${errors.length}`;
} else if (sub === 'simulate') {
  const files = rest.filter((a) => !a.startsWith('--') && !rest[rest.indexOf(a) - 1]?.startsWith('--emit'));
  const d = j?.delta ?? {};
  const created = d.created ?? j?.created ?? '?';
  const updated = d.updated ?? j?.updated ?? '?';
  const rejected = j?.rejected ?? d.rejected ?? 0;
  head = `GATE simulate ${files.length} file(s): batches=${j?.batches?.length ?? j?.batches ?? '?'} created=${created} updated=${updated} rejected=${rejected} skipped=${j?.skipped?.length ?? 0} errors=${errors.length}`;
} else {
  // audit: the report's error entries are nested; flatten anything named errors/issues.
  const flat = [];
  (function walk(v) {
    if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) {
      if ((k === 'errors' || k === 'issues') && Array.isArray(x)) flat.push(...x); else walk(x);
    }
  })(j);
  errors = idsFilter ? flat.filter((e) => idsFilter.test(typeof e === 'string' ? e : JSON.stringify(e))) : flat;
  head = `GATE audit ${rest[rest.indexOf('--source') + 1]}${idsFilter ? ` (ids ~ ${idsFilter.source})` : ''}: errors=${errors.length}`;
}

console.log(head);
for (const l of errorLines(errors)) console.log(l);
if (!j) console.log('  (gate printed no JSON — read the full log)');
console.log(`full log: ${logFile}`);
process.exit(r.status && r.status !== 0 ? r.status : errors.length ? 1 : 0);
```

Adjust the `simulate` field names (`delta.created`/`updated`, `batches`, `skipped`) to whatever `scripts/simulate-content-import.mjs` actually prints — read its final `JSON.stringify({...})` call and mirror the real keys. Do the same for the audit report shape. The summary line formats above are the contract; the key lookups are yours to make correct.

- [ ] **Step 5: Run the tests to verify they pass**

Run: `node --test scripts/content/gate.test.mjs`
Expected: 5 passed.

- [ ] **Step 6: Wire package.json and .gitignore, then run the whole content test file via npm**

`package.json` scripts: add `"test:content": "node --test scripts/content/*.test.mjs"` and `"content:gate": "node scripts/content/gate.mjs"`. `.gitignore`: append a section

```
# scripts/content/gate.mjs writes each gate's full output here (derived, large)
.gates/
```

Run: `npm run test:content` → 5 passed. Run: `npm test` → unchanged pass count (no regressions).

- [ ] **Step 7: Prove it on a real batch and commit**

Run: `node scripts/content/gate.mjs batch docs/import-ready/concept/102-INT-concepts.md` → expect `errors=0` and a `.gates/` log. Then:

```bash
git add scripts/content/gate.mjs scripts/content/gate.test.mjs scripts/content/fixtures/gate package.json .gitignore
git commit -m "tooling(content): quiet gate wrapper — full output to .gates/, ≤12-line summary, simulate --with rejected

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

Push to main (fetch + rebase first).

---

### Task 2: Page-text cache (`scripts/content/pagetext.mjs`)

**Files:**
- Create: `scripts/content/pagetext.mjs`, `scripts/content/pagetext.test.mjs`, `scripts/content/fixtures/pagetext/two-pages.pdf` (generate it in the test setup with Python: `fitz.open()`, two pages, `insert_text((72,72), "PAGE ONE alpha")` / `"PAGE TWO beta"`, save)
- Modify: `package.json` (`"content:pagetext": "node scripts/content/pagetext.mjs"`), `.gitignore` (add `.pagetext-index.tmp` only if you create temp files; the cache itself lives OUTSIDE the repo)

**Interfaces:**
- Consumes: `pdftotext -layout -f N -l N <pdf> -` (poppler); `pdftoppm -r 200 -f N -l N -png` for the optional render.
- Produces:
  - `node scripts/content/pagetext.mjs show <pdf> --pages 3-5` → prints `=== page 3 ===` … text … for each page; extracts the whole PDF on first touch and caches it.
  - `node scripts/content/pagetext.mjs status <pdf>` → one line per page: `p<N> words=<n> garbled=<yes|no>`; empty pages (0 words) are auto-flagged `garbled=yes`.
  - `node scripts/content/pagetext.mjs mark-garbled <pdf> --pages 4` / `unmark-garbled` → flips the per-page flag (an agent marks a page after finding the text unusable; only garbled pages may be rendered).
  - `node scripts/content/pagetext.mjs render <pdf> --pages 4 --out <dir>` → writes `<dir>/<sha8>-p4.png` at 200 dpi; REFUSES (exit 2, message) if the page is not marked garbled, unless `--force`.
  - `node scripts/content/pagetext.mjs index <dir-of-pdfs> --out <file.md>` → a committed readability index table: `| file | pages | words | garbled pages |`, one row per PDF found recursively (this is the per-lane index lanes commit next to their manifest).
  - Cache location: `${NISHANY_PAGETEXT_CACHE:-$HOME/.cache/nishany-pagetext}/<sha256-of-file>.json`, shape `{ "source": "<abs path at first extraction>", "sha256": "…", "extractor": "pdftotext -layout", "extractedAt": "<iso>", "pages": [ { "n": 1, "text": "…", "words": 12, "garbled": false } ] }`. sha256 keying means the same file reached from any worktree or Desktop path hits the same cache entry.

- [ ] **Step 1: Write the failing test**

```js
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
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node --test scripts/content/pagetext.test.mjs`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

```js
#!/usr/bin/env node
// scripts/content/pagetext.mjs — extract each PDF's text ONCE, cache by content hash, serve pages.
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { homedir } from 'node:os';
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

const [cmd, target, ...args] = process.argv.slice(2);
if (!cmd || !target) die(`usage: pagetext.mjs <show|status|mark-garbled|unmark-garbled|render|index> <pdf|dir> [--pages 3-5] [--out <dir|file>] [--force]`);

if (cmd === 'index') {
  const rows = [];
  (function walk(dir) {
    for (const f of readdirSync(dir)) {
      const p = path.join(dir, f);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.pdf$/i.test(f)) {
        const { entry } = load(p);
        rows.push(`| ${path.relative(target, p)} | ${entry.pages.length} | ${entry.pages.reduce((s, x) => s + x.words, 0)} | ${entry.pages.filter((x) => x.garbled).length} |`);
      }
    }
  })(target);
  const md = ['| file | pages | words | garbled pages |', '|---|---:|---:|---:|', ...rows.sort()].join('\n') + '\n';
  const out = opt(args, '--out');
  if (out) writeFileSync(out, md); else process.stdout.write(md);
  process.exit(0);
}

const { entry, file } = load(target);
const pages = parsePages(opt(args, '--pages'), entry.pages.length);

if (cmd === 'show') {
  for (const n of pages) console.log(`=== page ${n} ===\n${entry.pages[n - 1].text}\n`);
} else if (cmd === 'status') {
  for (const p of entry.pages) console.log(`p${p.n} words=${p.words} garbled=${p.garbled ? 'yes' : 'no'}`);
} else if (cmd === 'mark-garbled' || cmd === 'unmark-garbled') {
  for (const n of pages) entry.pages[n - 1].garbled = cmd === 'mark-garbled';
  save(entry, file);
  console.log(`${cmd}: pages ${pages.join(',')}`);
} else if (cmd === 'render') {
  const out = opt(args, '--out') || '.';
  mkdirSync(out, { recursive: true });
  for (const n of pages) {
    if (!entry.pages[n - 1].garbled && !args.includes('--force')) die(`page ${n} is not marked garbled — read it with 'show' instead, or mark-garbled first (render costs ~50× the tokens of text)`);
    const prefix = path.join(out, `${entry.sha256.slice(0, 8)}-p${n}`);
    const r = spawnSync('pdftoppm', ['-r', '200', '-f', String(n), '-l', String(n), '-png', '-singlefile', target, prefix], { encoding: 'utf8' });
    if (r.status !== 0) die(`pdftoppm failed: ${r.stderr}`, 1);
    console.log(`${prefix}.png`);
  }
} else die(`unknown command ${cmd}`);
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test scripts/content/pagetext.test.mjs` → 4 passed. (If `pdfinfo` word counts differ from 3 per page because of layout spacing, fix the test expectation to the observed count — the invariant is that both pages have the same non-zero count and the index total equals their sum.)

- [ ] **Step 5: Prove it on a real source and commit**

Run: `node scripts/content/pagetext.mjs status "/Users/doitrous/Desktop/Universities/MUST/Year 1/Semester 102/FHB 102-2/00 Module-wide/08 Midterm Exams/FHB102-2 MCQs till mid_MUCIZE DOCTORS PUPLISH.pdf" | head -5` — expect page lines. Add `"content:pagetext": "node scripts/content/pagetext.mjs"` to package.json. Commit:

```bash
git add scripts/content/pagetext.mjs scripts/content/pagetext.test.mjs scripts/content/fixtures/pagetext package.json
git commit -m "tooling(content): page-text cache — extract once per PDF, serve pages, render only garbled pages

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

Push to main.

---

### Task 3: MCQ seed generator + ledger (`emit-mcq.mjs`, `ledger.mjs`)

**Files:**
- Create: `scripts/content/emit-mcq.mjs`, `scripts/content/ledger.mjs`, `scripts/content/seed.schema.md`, `scripts/content/emit-mcq.test.mjs`, `scripts/content/ledger.test.mjs`, `scripts/content/fixtures/seed/ASU-MBG-cancer-example.json`, `scripts/content/fixtures/seed/triage-keys.txt`
- Modify: `package.json` (`"content:emit": "node scripts/content/emit-mcq.mjs"`, `"content:ledger": "node scripts/content/ledger.mjs"`)

**Interfaces:**
- Consumes: the hand-authored ASU question record field order (read the first record of `docs/Ain-Shams-Source-Imports/question/ASU-IBM-protein-chemistry-mcq.md` — 40 fields from `id` to `author_notes`); `Instruction Manual for Content Creation/05-questions.md` for allowed values of `difficulty`, `question_type`, `cognitive_effort`, `reasoning_level`, `setting`, `status`, `format`.
- Produces:
  - `node scripts/content/emit-mcq.mjs <seed.json> [--out <batch.md>]` → the batch markdown (stdout when no `--out`). Deterministic: same seed → byte-identical output.
  - `node scripts/content/ledger.mjs <seed-dir> [--triage <keys.txt>] [--out LEDGER.md]` → table `| cluster | authored | held | remaining | total |` plus a `## Held` list (`key — reason`) and a `## Remaining` list of triage keys not present in any seed.
  - Seed contract (documented verbatim in `seed.schema.md`):

```json
{
  "lane": "ASU-MBG",
  "cluster": "cancer",
  "header": "ASU-MBG · Molecular Biology of Cancer — authored from <source>, keys read from the printed answer table p.<n>.",
  "defaults": {
    "subject": "gen",
    "status": "Draft",
    "owner": "Claude",
    "universities": ["asu"],
    "years": ["ASU_Y1"],
    "module": "ASU-MBG",
    "module_subject": "ASU-MBG > Molecular Biology > Cancer",
    "exam_weight_by_year": { "ASU_Y1": "high" },
    "question_only_for": "",
    "library_ids": [],
    "resource_ids": ["src_…"],
    "source_citation": "MBG bank, Cancer chapter, p.{page}",
    "setting": "preclinical",
    "estimated_seconds": 60,
    "randomise_answers": true
  },
  "questions": [
    {
      "key": "cancer-q01",
      "id": "QST-ASUMBG-CANCER-Q01",
      "page": 12,
      "title": "Which gene is a tumour suppressor?",
      "question": "Which of the following is a tumour suppressor gene?",
      "options": { "A": "RAS", "B": "TP53", "C": "MYC", "D": "BCR-ABL" },
      "correct": "B",
      "explanations": {
        "A": "Incorrect. RAS is a proto-oncogene …",
        "B": "Correct. TP53 encodes p53, which … (three or more sentences)",
        "C": "Incorrect. MYC …",
        "D": "Incorrect. BCR-ABL …"
      },
      "main_concept": "CON-GEN-…",
      "concept_ids": ["CON-GEN-…"],
      "contextual_concept_ids": [],
      "topic": "Molecular biology of cancer",
      "subtopic": "Tumour suppressor genes",
      "difficulty": "medium",
      "question_type": "recall",
      "cognitive_effort": "low",
      "reasoning_level": "recall",
      "learning_objective": "Distinguish tumour suppressor genes from proto-oncogenes.",
      "media_recommendations": "",
      "field_notes": { "keySource": "printed answer table p.30", "asu": "MBG bank p.12" },
      "author_notes": ""
    },
    { "key": "cancer-q02", "hold": "printed key conflicts with the stem (B vs D on the answer sheet)" }
  ]
}
```

  Rules the generator enforces (exit 1 with the key and reason): `correct` must be one of the option letters; every option needs an explanation; `explanations[correct]` must contain ≥ 3 sentences (count `[.!?]` followed by space/end); no option value may start with `+`; no field value may contain a line that is exactly `---`; `id` defaults to `QST-<LANE without dashes>-<CLUSTER upper>-<KEY upper, non-alnum→'-'>`; held questions (`hold` present) emit nothing. `field_notes` is emitted one `camelCaseKey: value` per line. Question records are separated by `---` exactly as hand-authored files are; the header comment goes at the top as `<!-- … -->` and ends with `Import: Admin › Bulk import → question.`

- [ ] **Step 1: Write the failing tests**

```js
// scripts/content/emit-mcq.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const SEED = 'scripts/content/fixtures/seed/ASU-MBG-cancer-example.json';
const run = (...a) => spawnSync('node', ['scripts/content/emit-mcq.mjs', ...a], { encoding: 'utf8' });

test('emits one record per non-held question in the hand-authored field order', () => {
  const r = run(SEED);
  assert.equal(r.status, 0, r.stderr);
  const md = r.stdout;
  assert.equal((md.match(/^# Item$/mg) ?? []).length, 1);          // q02 is held
  const order = [...md.matchAll(/^## (\w+)$/mg)].map((m) => m[1]);
  const expectedStart = ['id', 'title', 'question', 'subject', 'status', 'owner', 'vignette', 'correct_answer', 'answer_a', 'explanation_a'];
  assert.deepEqual(order.slice(0, expectedStart.length), expectedStart);
  assert.ok(order.includes('author_notes'));
  assert.match(md, /^QST-ASUMBG-CANCER-Q01$/m);
  assert.match(md, /^keySource: printed answer table p\.30$/m);
});

test('is deterministic', () => {
  assert.equal(run(SEED).stdout, run(SEED).stdout);
});

test('rejects a correct explanation under 3 sentences', () => {
  const seed = JSON.parse(readFileSync(SEED, 'utf8'));
  seed.questions[0].explanations.B = 'Correct. Short.';
  const f = path.join(mkdtempSync(path.join(tmpdir(), 'seed-')), 's.json');
  writeFileSync(f, JSON.stringify(seed));
  const r = run(f);
  assert.equal(r.status, 1);
  assert.match(r.stdout + r.stderr, /cancer-q01.*explanation for correct answer B has 2 sentences/);
});

test('rejects an option starting with +', () => {
  const seed = JSON.parse(readFileSync(SEED, 'utf8'));
  seed.questions[0].options.A = '+RAS';
  const f = path.join(mkdtempSync(path.join(tmpdir(), 'seed-')), 's.json');
  writeFileSync(f, JSON.stringify(seed));
  assert.equal(run(f).status, 1);
});

test('generated batch passes medical:batch standalone', () => {
  const out = path.join(mkdtempSync(path.join(tmpdir(), 'batch-')), 'ASU-MBG-cancer-mcq.md');
  assert.equal(run(SEED, '--out', out).status, 0);
  const g = spawnSync('node', ['--experimental-strip-types', 'scripts/validate-content-batch.mjs', out], { encoding: 'utf8' });
  const j = JSON.parse(g.stdout.slice(g.stdout.indexOf('{')));
  // The fixture's concept ids are placeholders, so only structural errors are disallowed:
  const structural = j.errors.filter((e) => !/concept|library_ids|resource/i.test(JSON.stringify(e)));
  assert.deepEqual(structural, [], JSON.stringify(j.errors, null, 1));
});
```

```js
// scripts/content/ledger.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

test('ledger counts authored / held / remaining per cluster', () => {
  const r = spawnSync('node', ['scripts/content/ledger.mjs', 'scripts/content/fixtures/seed', '--triage', 'scripts/content/fixtures/seed/triage-keys.txt'], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /\| cluster \| authored \| held \| remaining \| total \|/);
  assert.match(r.stdout, /\| cancer \| 1 \| 1 \| 2 \| 4 \|/);
  assert.match(r.stdout, /^## Held\n- cancer-q02 — printed key conflicts/m);
  assert.match(r.stdout, /^## Remaining\n- cancer-q03\n- cancer-q04$/m);
});
```

`triage-keys.txt` fixture: four lines `cancer-q01` … `cancer-q04`.

- [ ] **Step 2: Run to verify they fail**

Run: `node --test scripts/content/emit-mcq.test.mjs scripts/content/ledger.test.mjs` → FAIL, modules not found.

- [ ] **Step 3: Write the fixture seed**

Create `scripts/content/fixtures/seed/ASU-MBG-cancer-example.json` exactly as in the Interfaces block above, with real ≥3-sentence explanations (write genuine, correct oncology teaching text — the fixture doubles as the documentation example; use `CON-GEN-EXAMPLE0000001` as the placeholder concept id).

- [ ] **Step 4: Implement emit-mcq.mjs**

Implementation outline (write the full file; keep it under ~200 lines):

```js
#!/usr/bin/env node
// scripts/content/emit-mcq.mjs — compact seed JSON → import-format MCQ batch (hand-authored field order).
import { readFileSync, writeFileSync } from 'node:fs';

const FIELD_ORDER = ['id','title','question','subject','status','owner','vignette','correct_answer',
  /* answer_x / explanation_x pairs inserted here per option letter */
  'topic','subtopic','main_concept','concept_ids','contextual_concept_ids','difficulty','question_type',
  'cognitive_effort','cognitive_effort_score','setting','reasoning_level','inferred_difficulty','exam_relevance',
  'clinical_relevance','academic_relevance','exam_weight_by_year','years','universities','module','module_subject',
  'question_only_for','library_ids','resource_ids','learning_objective','source_citation','attached_image',
  'attachments','media_recommendations','estimated_seconds','randomise_answers','author_notes'];
```

Read the first record of `docs/Ain-Shams-Source-Imports/question/ASU-IBM-protein-chemistry-mcq.md` and make `FIELD_ORDER` match it exactly (including where `field_notes` sits if that file has one; if it does not, emit `field_notes` immediately before `author_notes`). Fill fields from `question` → `defaults` → sensible empty. Serialise: lists as `A | B | C` on one line (the pipe form the importer parses); objects (`exam_weight_by_year`, `field_notes`) one `key: value` per line; booleans/numbers as literals. Validation as listed in Interfaces; on failure print `error: <key>: <reason>` and exit 1 without writing. Default `id` rule as specified. Sentence count = `text.split(/[.!?](\s|$)/).filter(s => s.trim()).length`.

- [ ] **Step 5: Implement ledger.mjs**

Walk `<seed-dir>` for `*.json` seeds (skip files whose top level lacks `questions`), group by `cluster`, count `authored` (no `hold`) and `held`, read `--triage` keys (one per line, `#` comments allowed), `remaining` = triage keys not present in any seed of that cluster (cluster inferred from the key's prefix before the first `-q`; if no triage file, remaining = 0 and total = authored + held). Print the table + `## Held` + `## Remaining` sections; `--out` writes the same text.

- [ ] **Step 6: Run the tests**

Run: `npm run test:content` → all content tests pass (Task 1 + Task 2 + these). If Task 1/2 are not yet on main in your worktree, run just the two new test files.

- [ ] **Step 7: Write seed.schema.md, wire package.json, commit**

`scripts/content/seed.schema.md`: one page — purpose (agent writes the medicine, tool writes the format), the JSON contract (paste the fixture), the enforced rules, the id default, the `hold` convention, the exact commands (`content:emit`, `content:ledger`, then `content:gate batch <out> --with <concept files>`), and the sentence "Never hand-edit the generated `.md`; fix the seed and re-emit."

```bash
git add scripts/content/emit-mcq.mjs scripts/content/ledger.mjs scripts/content/seed.schema.md scripts/content/*.test.mjs scripts/content/fixtures/seed package.json
git commit -m "tooling(content): MCQ seed generator + ledger — seed JSON → import batch, held rows tracked, gates unchanged

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

Push to main.

---

### Task 4: LANE-CARD template + five lane cards

**Files:**
- Create: `Instruction Manual for Content Creation/LANE-CARD-TEMPLATE.md`; `docs/Ain-Shams-Source-Imports/LANE-CARD.md`; `docs/Alexandria-Source-Imports/LANE-CARD.md`; `docs/Kasr-Source-Imports/LANE-CARD.md`; `docs/MUST-Source-Imports/LANE-CARD.md` (this directory exists only on branch `codex/must-year1-content` — create the file on main anyway, the directory will merge); `docs/Helwan-Source-Imports/LANE-CARD.md` (same — directory lives on `codex/helwan-year1-content`; on main create it with a header line saying the module content is on that branch)
- Read (do not modify): `00-START-HERE.md` §0, §3, §4, §8; `13-orchestration.md` §10 Hazards; `docs/Alexandria-Source-Imports/LANE-BRIEF.md` §Hard rules + §Corpus hazards; `docs/Kasr-Source-Imports/LANE-BRIEF.md`; `docs/Ain-Shams-Source-Imports/coverage/ASU-IBM-triage.md` header; the MUST and Helwan `CLAUDE-HANDOVER.md` (via `git show <branch>:<path>`); `scripts/content/seed.schema.md`.

**Interfaces:**
- Consumes the exact commands from Tasks 1–3: `node scripts/content/gate.mjs batch|simulate|audit …`, `node scripts/content/pagetext.mjs show|status|mark-garbled|render|index …`, `node scripts/content/emit-mcq.mjs <seed> --out <batch>`, `node scripts/content/ledger.mjs <seed-dir> --triage <keys>`.
- Produces: cards that Task 5's dispatch template names as the FIRST and normally ONLY thing an authoring agent reads.

- [ ] **Step 1: Write the template**

`LANE-CARD-TEMPLATE.md` — hard limit 6,000 bytes when filled. Sections, in this order, each ≤ 12 lines:

```markdown
# LANE-CARD — <University> <Year> (<lane id>)
Read this card first. Open the full manual only when you hit a wall; name the wall in your report.

## 1. Identity and ids
university id · year id(s) · module id prefix · concept id shape · question id shape · where the lane's files live (concept/ article/ question/ evidence/ coverage/ pending-live/).

## 2. The ten rules that cannot bend
1. Printed keys stand as printed; a conflict is a hold, never an inference.
2. explanation_<correct> ≥ 3 sentences; one explanation per distractor.
3. Law of voice: state the medicine; provenance only in field_notes / citations.
4. Search before mint: `tools/find-existing.mjs` + `grep -ril <canonical_key> docs/*-Source-Imports/concept/`; a hit → sparse overlay, never a full-record overwrite (full records evict other universities' tags).
5. Teach before test: a question's main concept must have an article that names it in related_concepts and teaches it.
6. Six per-university tags on every record (list them for this lane).
7. Reviewer/publisher = "Medical team, Admin team" / "Admin team".
8. Never hand-edit a generated batch; fix the seed and re-emit.
9. Media: describe nothing in prose that the image shows; `media_recommendations: required` → record imports as Draft; labelling questions HARD-reject without an image.
10. Missing key (nothing printed, nothing recoverable) → key editorially + field note; garbled key → hold + mark the page garbled.

## 3. Read text, don't look at pictures
`node scripts/content/pagetext.mjs show "<pdf>" --pages a-b` (≤ 3 pages per call). `status` first. Only a page marked garbled may be rendered. The lane's readability index: `<path>`.

## 4. Author: seed → emit → gate
seed dir: `<path>` · `node scripts/content/emit-mcq.mjs <seed> --out <batch>` · `node scripts/content/gate.mjs batch <batch> --with <the lane's concept + article files, listed>` · `node scripts/content/gate.mjs simulate <files in apply order>` · never read the .gates/ log unless the summary shows errors.

## 5. Progress ledger
`node scripts/content/ledger.mjs <seed dir> --triage coverage/<lane>-triage-keys.txt --out coverage/<lane>-LEDGER.md` after every commit. The ledger is the only progress record; the brief you were given is a delta of it.

## 6. Commit rhythm
First commit within minutes; commit + push every 5–10 questions; branch/land rule for this lane; report format (≤ 20 lines, ends with `HANDOFF: <branch>@<sha> · resume-first: <next>`).

## 7. This lane's known traps
≤ 8 bullets, lane-specific only (twins, garbled banks, importer quirks, id collisions).

## 8. Walls → where the answer lives
wall type → manual section (00 §n / 05 §n / SHARED-TOOLCHAIN §n / LANE-BRIEF §n).
```

- [ ] **Step 2: Write the five cards**

Fill the template per lane from the sources listed under Files. Lane-specific facts that MUST appear: Kasr — `mintConceptId` is module-salted and Kasr keeps its generator (`scripts/kasr/build-batches.ts "<module>"`), the `--with` set of 9 companion files for 104, no full-module regen, no removeOrphans; Alexandria — twins (`nameTwinOf`/`twinPreferred`), the six tags with `learner_years` on concepts, pending-live for Kasr-overlay questions, the 29 image-blocked labelling questions; Ain Shams — no LANE-BRIEF exists so this card is the brief, cluster 6 blacked keys = needs-Omar, IBM needs `--with` Kasr 102-INT + AU-MED-102 files; MUST — local-only Draft, never upload, one question per commit, holds over inference, source path; Helwan — complete, blockers are Omar's, do not re-import. Check each card ≤ 6,000 bytes: `wc -c docs/*-Source-Imports/LANE-CARD.md`.

- [ ] **Step 3: Verify and commit**

Run `npm test` (authoringDocs test must still pass — cards add no contract fields). Then:

```bash
git add "Instruction Manual for Content Creation/LANE-CARD-TEMPLATE.md" docs/*-Source-Imports/LANE-CARD.md
git commit -m "docs(lanes): 2-page LANE-CARDs for Kasr, Alexandria, Ain Shams, MUST, Helwan + template

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

Push to main.

---

### Task 5: Manual update (00, 13, SHARED-TOOLCHAIN, 05)

**Files:**
- Modify: `Instruction Manual for Content Creation/00-START-HERE.md` (add §0.5 after §0; edit §8 Gates), `13-orchestration.md` (§4 staged pipeline, §10 hazards, §11 templates), `SHARED-TOOLCHAIN.md` (new "Content CLI" section), `05-questions.md` (new "Authoring route" paragraph near the top; every existing backtick field key stays)
- Test: `src/data/authoringDocs.test.ts` (existing; must stay green)

**Interfaces:**
- Consumes: Task 1–3 commands (exact strings above), Task 4 card paths.
- Produces: the manual that every future dispatch quotes.

- [ ] **Step 1: 00-START-HERE.md — add §0.5 "How an agent works: token discipline"**

Insert after §0 (before "Roles and the chain of command"), ≤ 40 lines:

```markdown
## 0.5 How an agent works — token discipline (in force 2026-09-01)

Quality bars never move (§0 law of voice, §3 ids, §4 search-before-mint, 05 explanation bar). What changed is how you reach them:

1. **Read the LANE-CARD first, the manual only at a wall.** Every lane has `docs/<University>-Source-Imports/LANE-CARD.md` (≤ 2 pages). Your dispatch names it. Do not open 00/05/13/SHARED-TOOLCHAIN unless the card's §8 sends you there for a specific wall — then read that section only.
2. **Text, not pictures.** Every PDF is extracted once and cached: `node scripts/content/pagetext.mjs show "<pdf>" --pages a-b` (≤ 3 pages per call; `status` first). A page may be rendered as an image only after `mark-garbled` — and then only that page. Keys already recorded in a lane's triage file with page + method are the authority; do not re-look.
3. **Seed → emit → gate.** You write the medicine (stem, options, explanations, concept choice) in a seed JSON (`scripts/content/seed.schema.md`); `emit-mcq.mjs` writes the format. Never hand-edit a generated batch.
4. **Quiet gates.** `node scripts/content/gate.mjs batch|simulate|audit …` — read the ≤ 12-line summary; the full log is in `.gates/` for when the summary shows errors. `simulate` takes files positionally, in apply order, never `--with`.
5. **Ledger, not archaeology.** Progress is `coverage/<lane>-LEDGER.md` from `ledger.mjs`. Never reconstruct "what is done" by reading batch files.
6. **One cluster per dispatch (~20–50 questions), commit + push every 5–10.** A death costs minutes, not a module.
```

Edit §8 Gates: keep the gate list, add one line under it: "Run them through `scripts/content/gate.mjs` (§0.5) — same gates, summarised output."

- [ ] **Step 2: 13-orchestration.md**

§4 staged pipeline: add stage **S1b Extraction cache** between intake and triage: "one pagetext pass per source; commit `coverage/<lane>-readability-index.md` from `pagetext.mjs index`; triage lanes read cached text". §10 hazards register: add rows — `simulate --with silently drops files` → use `gate.mjs simulate`; `render-heavy lanes die at the 600 s watchdog` → cached text, render only garbled pages; `stale brief → re-derivation expedition` → ledger delta in every brief; `hand-edited generated batch destroyed by regen` → seeds only. §11 templates: replace the LANE-BRIEF skeleton's "read" list with:

```markdown
### DISPATCH skeleton (one cluster)
- Read: `docs/<Uni>-Source-Imports/LANE-CARD.md` (only).
- Base: `<branch>@<sha>`. Worktree off it. `ln -s` node_modules from the main checkout.
- Scope: cluster `<name>` — ledger delta: authored <n>, held <n>, remaining <n> (keys: <list or path>).
- Sources: `<pdf path>` pages <a–b> via pagetext (already cached; garbled pages: <list>).
- Do: seed → emit → gate batch (--with <files>) → gate simulate (<files, apply order>) → ledger → commit+push every 5–10 q.
- Stop at: <n> questions or any wall. Report ≤ 20 lines, ends `HANDOFF: <branch>@<sha> · resume-first: <next>`.
```

- [ ] **Step 3: SHARED-TOOLCHAIN.md — "Content CLI (scripts/content/)" section**

One subsection per tool: purpose, exact usage lines (copy from Tasks 1–3), output contract, cache location + env var, the seed contract pointer. ≤ 80 lines total.

- [ ] **Step 4: 05-questions.md — "Authoring route"**

Add after the file's opening section, ≤ 10 lines: MCQs are authored as seeds (`scripts/content/seed.schema.md`) and emitted; the field reference below is what the emitted record contains and what a hand-authored written question still uses. Do not delete or rename any backticked field key in the file.

- [ ] **Step 5: Verify and commit**

Run: `npm test` → `src/data/authoringDocs.test.ts` passes (same count as before). Run: `grep -c '' "Instruction Manual for Content Creation/00-START-HERE.md"` to confirm the insert landed once. Commit:

```bash
git add "Instruction Manual for Content Creation/00-START-HERE.md" "Instruction Manual for Content Creation/13-orchestration.md" "Instruction Manual for Content Creation/SHARED-TOOLCHAIN.md" "Instruction Manual for Content Creation/05-questions.md"
git commit -m "docs(manual): token discipline §0.5, extraction-cache stage, quiet gates, seed authoring route, one-cluster dispatch skeleton

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

Push to main.

---

## Self-review

- Spec coverage: (1) cache → Task 2 + manual §0.5.2 + S1b; (2) lane cards → Task 4 + §0.5.1; (3) ledgers → Task 3 `ledger.mjs` + §0.5.5; (4) quiet gates → Task 1 + §0.5.4 + §8; (5) seed→generate → Task 3 + §0.5.3 + 05 route; (6) dispatch scope → §0.5.6 + §11 skeleton (and the chief of staff applies it from the next dispatch).
- Placeholder scan: field-name lookups in Task 1 Step 4 are explicitly delegated to reading the real gate output shape — that is a verification step, not a TBD. Task 3 Step 4 gives the field order and asks the implementer to confirm it against the real file — same.
- Consistency: command names (`gate.mjs batch|simulate|audit`, `pagetext.mjs show|status|mark-garbled|unmark-garbled|render|index`, `emit-mcq.mjs <seed> --out`, `ledger.mjs <dir> --triage --out`) are identical across Tasks 1–5 and the cards. Cache env var `NISHANY_PAGETEXT_CACHE` appears in Task 2 and SHARED-TOOLCHAIN only. Log dir `.gates/` in Task 1, .gitignore, cards, manual.
- Ordering: Tasks 1, 2, 3 are independent (parallel); Task 4 and Task 5 depend on the command contracts above (fixed here), and should run after 1–3 land so their examples are checked against real behaviour.
