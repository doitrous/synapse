// scripts/content/stamp-source.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { classify, classifyFile, headerOf, stampText, SOURCES } from './stamp-source.mjs';

test('the classifier vocabulary matches questionSource.ts', () => {
  assert.deepEqual([...SOURCES].sort(), ['dept-book', 'dept-mcq', 'past-paper']);
});

test('past-paper: exam/EOM/year/final markers win', () => {
  for (const [file, header] of [
    ['ASU-CNS-3-final2024-mcq.md', 'EOM - CNS FINAL PAPER 1 2024.pdf'],
    ['MU-MED104-msk1-2018-g2-mcq.md', '02- MSK1 endmodule 2018 Group 2.pdf'],
    ['AUN-MPT-104-final-2022-q46-5fu.md', 'All Quizzes MPT 2022.pdf, EOM paper'],
    ['O6U-IMN-105-mid-exam-mcq.md', 'mid exam'],
  ]) {
    assert.equal(classify(file, header).source, 'past-paper', `${file} :: ${header}`);
  }
});

test('dept-book: textbook / chapter / handout / author-book markers win', () => {
  for (const [file, header] of [
    ['ASU-IMM-hegazy-ch3-mcq.md', 'hegazy.pdf Chapter 3 (Antigens & self molecules)'],
    ['HU-ORL-305-ch4-mcq.md', 'Ophthalmology — Chapter 4, all 91 items'],
    ['x-lecture-notes-mcq.md', 'lecture notes handout for the module'],
    ['y-textbook-mcq.md', 'authored from the department textbook'],
  ]) {
    assert.equal(classify(file, header).source, 'dept-book', `${file} :: ${header}`);
  }
});

test('dept-mcq: bank / moodle / quiz markers win (high confidence)', () => {
  for (const [file, header] of [
    ['O6U-IPH-108-pharmabank-mcq.md', 'the department pharma bank'],
    ['AUN-CBF-103-cbfquiz-new-mcq.md', 'All quizzes CBF .pdf (Moodle attempt-review export)'],
    ['z-qbank-mcq.md', 'the question bank'],
  ]) {
    const r = classify(file, header);
    assert.equal(r.source, 'dept-mcq', `${file} :: ${header}`);
    assert.equal(r.confidence, 'high', `${file} should be high confidence`);
  }
});

test('no marker: defaults to dept-mcq, flagged low-confidence', () => {
  const r = classify('ASU-MBG-molecular-biology-of-cancer-mcq.md', 'molecular biology of cancer');
  assert.equal(r.source, 'dept-mcq');
  assert.equal(r.confidence, 'low');
});

test('precedence: an exam delivered via Moodle is still a past paper', () => {
  assert.equal(classify('x-mcq.md', 'Moodle export of the 2023 final exam').source, 'past-paper');
});

test('the bare "mcq" filename suffix is not a dept-mcq marker', () => {
  // Every batch is named *-mcq.md; if `mcq` triggered dept-mcq the whole corpus
  // would classify dept-mcq. A no-marker file must stay low-confidence.
  assert.equal(classify('plain-topic-mcq.md', '').confidence, 'low');
});

test('headerOf reads the first HTML comment only', () => {
  assert.match(headerOf('<!--\n  ASU · FINAL 2024.pdf\n-->\n# Item\n'), /FINAL 2024/);
  assert.equal(headerOf('# Item\n## title\nT\n'), '');
});

test('stampText inserts a well-formed ## source after ## status, idempotently', () => {
  const batch = [
    '<!-- header -->',
    '',
    '# Item',
    '',
    '## id',
    'Q1',
    '',
    '## status',
    'Draft',
    '',
    '## owner',
    'Claude',
    '',
    '## correct_answer',
    'A',
    '',
    '---',
    '',
    '# Item',
    '',
    '## status',
    'Draft',
    '',
    '## owner',
    'Claude',
    '',
  ].join('\n');

  const once = stampText(batch, 'past-paper');
  assert.equal(once.stamped, 2);
  assert.match(once.text, /## status\nDraft\n\n## source\npast-paper\n\n## owner/);

  // Idempotent: a second pass stamps nothing and does not change the text.
  const twice = stampText(once.text, 'past-paper');
  assert.equal(twice.stamped, 0);
  assert.equal(twice.text, once.text);

  // ## source_citation must never be mistaken for ## source.
  const withCitation = '# Item\n\n## status\nDraft\n\n## source_citation\nNICE\n\n## owner\nX\n';
  const cited = stampText(withCitation, 'dept-mcq');
  assert.equal(cited.stamped, 1);
  assert.match(cited.text, /## source\ndept-mcq/);
  assert.match(cited.text, /## source_citation\nNICE/);
});

test('stampText inserts before ## owner when a segment has no ## status', () => {
  const seg = '# Item\n\n## id\nQ2\n\n## owner\nClaude\n';
  const out = stampText(seg, 'dept-book');
  assert.equal(out.stamped, 1);
  assert.match(out.text, /## source\ndept-book\n\n## owner/);
});

test('classifyFile combines filename and extracted header', () => {
  assert.equal(classifyFile('any-mcq.md', '<!-- EOM final 2024 -->\n# Item\n').source, 'past-paper');
});
