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

test('batch: space-separated --with list is rejected before spawning, not reported as errors=0', () => {
  const r = run('batch', 'scripts/content/fixtures/gate/concepts-ok.md', '--with', 'a.md', 'b.md');
  assert.notEqual(r.status, 0, r.stdout + r.stderr);
  assert.doesNotMatch(r.stdout, /errors=\d+/);
  assert.match(r.stdout, /repeat/i);
});

test('batch: a validator crash with no JSON on stdout prints FAILED, not errors=0, and exits non-zero', () => {
  // validate-content-batch.mjs throws on ENOENT before it ever prints JSON —
  // confirmed by running it directly against this same missing path.
  const r = run('batch', 'scripts/content/fixtures/gate/does-not-exist.md');
  assert.notEqual(r.status, 0, r.stdout + r.stderr);
  assert.doesNotMatch(r.stdout, /errors=\d+/);
  assert.match(r.stdout, /FAILED/);
  assert.match(r.stdout, /full log:/);
  assert.match(r.stdout, /ENOENT|no such file/i);
});

test('simulate: nonexistent file path prints FAILED and exits non-zero', () => {
  // simulate-content-import.mjs also throws on ENOENT before printing JSON —
  // confirmed by running it directly against this same missing path.
  const r = run('simulate', 'scripts/content/fixtures/gate/does-not-exist.md');
  assert.notEqual(r.status, 0, r.stdout + r.stderr);
  assert.doesNotMatch(r.stdout, /errors=\d+/);
  assert.match(r.stdout, /FAILED/);
  assert.match(r.stdout, /full log:/);
  assert.match(r.stdout, /ENOENT|no such file/i);
});

test('usage text (no args) mentions repeating --with per file', () => {
  const r = run();
  assert.equal(r.status, 2);
  assert.match(r.stdout + r.stderr, /repeat/i);
});

test('batch: a thrown validator Error shows its message inline, not just stack frames', () => {
  // A trailing --with with no file makes the validator throw. Node prints the
  // message above the stack, so a naive tail loses it.
  const r = run('batch', 'scripts/content/fixtures/gate/concepts-ok.md', '--with');
  assert.notEqual(r.status, 0);
  assert.match(r.stdout, /FAILED/);
  assert.match(r.stdout, /--with was given with no file after it/);
  assert.doesNotMatch(r.stdout, /^\s+\[stderr\]\s+at\s/m);
});
