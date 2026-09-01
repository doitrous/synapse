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

function parseRecords(stdout) {
  return stdout
    .trim()
    .split(/\n\n---\n\n/)
    .map((record) => record.replace(/^# Item\n\n/, ''))
    .map((record) => {
      const fields = {};
      for (const block of record.split(/\n\n(?=## )/)) {
        const m = block.match(/^## (\w+)\n?([\s\S]*)$/);
        if (m) fields[m[1]] = m[2];
      }
      return fields;
    });
}

test('a per-question value overrides the same-named default, field by field', () => {
  const seed = JSON.parse(readFileSync(SEED, 'utf8'));
  const q1 = seed.questions[0]; // cancer-q01: no hold, real options/explanations
  const q2 = JSON.parse(JSON.stringify(q1)); // same shape, no overrides of its own
  q2.key = 'cancer-q03';
  q2.id = 'QST-ASUMBG-CANCER-Q03';

  q1.library_ids = ['ART-A'];
  q1.module_subject = 'X > Y';
  q1.source_citation = 'Paper p.{page}';
  q1.page = 7;

  seed.questions = [q1, q2]; // drop the held cancer-q02 fixture entry entirely

  const f = path.join(mkdtempSync(path.join(tmpdir(), 'seed-')), 's.json');
  writeFileSync(f, JSON.stringify(seed));
  const r = run(f);
  assert.equal(r.status, 0, r.stderr);

  const [r1, r2] = parseRecords(r.stdout);
  assert.equal(r1.library_ids, 'ART-A');
  assert.equal(r1.module_subject, 'X > Y');
  assert.equal(r1.source_citation, 'Paper p.7');

  // q2 set no overrides, so every one of those keys falls back to `defaults`:
  assert.equal(r2.library_ids ?? '', '');
  assert.equal(r2.module_subject, 'ASU-MBG > Molecular Biology > Cancer');
  assert.equal(r2.source_citation, 'ASU-MBG Cancer chapter question bank, p.12');
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
