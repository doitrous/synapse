#!/usr/bin/env node
// Re-emit the 108-INT seed (docs/import-ready/question/108-INT-EOY-mcq.md) into the
// full-contract MCQ-bank.md, matching the 102-INT gold-standard item contract field-for-field.
// Deterministic transform; explanations/notes are the seed's own hand-written text.
//
// Usage: node scripts/kasr/reauthor-108-int-bank.mjs [--write]
import fs from 'node:fs';

const SRC = 'docs/import-ready/question/108-INT-EOY-mcq.md';
const BANK = 'docs/import-ready/question/108-INT-MCQ-bank.md';
const CONCEPT_FILES = [
  'docs/import-ready/concept/108-INT-concepts-pathology.md',
  'docs/import-ready/concept/108-INT-concepts-pharmacology.md',
  'docs/import-ready/concept/108-INT-concepts-pharmacology-updates.md',
];
const WRITE = process.argv.includes('--write');

const field = (block, name) => {
  const m = block.match(new RegExp('^## ' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\n([\\s\\S]*?)(?=\\n## |\\n# Item|\\n---)', 'm'));
  return m ? m[1].replace(/\s+$/, '') : '';
};

const DIFF_INFERRED = { Easy: 79, Moderate: 60, Hard: 45, Medium: 68 };
const EFFORT_SCORE = { Low: 0.2, Medium: 0.5, Med: 0.5, High: 0.8 };

const conceptText = CONCEPT_FILES.map(f => fs.readFileSync(f, 'utf8')).join('\n');
const normStem = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');

const src = fs.readFileSync(SRC, 'utf8');
const items = src.split(/\n# Item\n/).slice(1).map(it => /\n---(\n|$)/.test(it) ? it : it + '\n---');

const out = [];
const seen = new Set();
const report = { emitted: 0, skippedDupe: 0, skippedKeyless: 0, missingConcept: [], path: 0, pharm: 0 };
let n = 0;

for (const it of items) {
  const question = field(it, 'question');
  const correct = field(it, 'correct_answer').trim().toUpperCase().slice(0, 1);
  if (!correct || !/[ABCD]/.test(correct)) { report.skippedKeyless++; continue; }
  const key = normStem(question);
  if (seen.has(key)) { report.skippedDupe++; continue; }
  seen.add(key);

  const mainConcept = field(it, 'main_concept');
  if (mainConcept && !conceptText.includes(mainConcept)) report.missingConcept.push(mainConcept);

  const difficulty = field(it, 'difficulty') || 'Moderate';
  const inferred = DIFF_INFERRED[difficulty] ?? 60;
  const effort = field(it, 'cognitive_effort') || 'Medium';
  const effortScore = EFFORT_SCORE[effort] ?? 0.5;

  const cite = field(it, 'source_citation');
  const resMatch = cite.match(/Manifest (src_[0-9a-f]+)/);
  const resourceIds = resMatch ? resMatch[1] : '';

  const opts = ['a', 'b', 'c', 'd'];
  const ans = {}, exp = {};
  for (const o of opts) {
    ans[o] = field(it, 'answer_' + o);
    let e = field(it, 'explanation_' + o).replace(/\s+$/, '');
    if (o === correct.toLowerCase() && !/^Correct[.\s]/.test(e)) e = 'Correct. ' + e;
    exp[o] = e;
  }

  const learningObj = field(it, 'learning_objective');
  let vignette = field(it, 'vignette');
  if (!vignette) vignette = `This item asks the student to ${learningObj ? learningObj.charAt(0).toLowerCase() + learningObj.slice(1).replace(/\.$/, '') : 'recall the keyed fact'}.`;

  const subject = field(it, 'subject');
  if (subject === 'pharm') report.pharm++; else report.path++;

  n += 1;
  report.emitted++;

  const lines = [
    '# Item',
    '## id', `QST-108-INT-MCQ-${String(n).padStart(3, '0')}`,
    '## title', field(it, 'title'),
    '## question', question,
    '## vignette', vignette,
    '## subject', subject,
    '## status', 'Draft',
    '## owner', 'Claude',
    '## format', 'single best answer',
    '## correct_answer', correct,
    '## answer_a', ans.a, '## explanation_a', exp.a,
    '## answer_b', ans.b, '## explanation_b', exp.b,
    '## answer_c', ans.c, '## explanation_c', exp.c,
    '## answer_d', ans.d, '## explanation_d', exp.d,
    '## topic', field(it, 'topic'),
    '## subtopic', field(it, 'subtopic'),
    '## main_concept', mainConcept,
    '## concept_ids', '',
    '## contextual_concept_ids', '',
    '## difficulty', difficulty,
    '## question_type', field(it, 'question_type'),
    '## cognitive_effort', effort,
    '## cognitive_effort_score', String(effortScore),
    '## setting', field(it, 'setting') || 'Academic',
    '## reasoning_level', field(it, 'reasoning_level') || '1',
    '## inferred_difficulty', String(inferred),
    '## exam_relevance', field(it, 'exam_relevance') || '4.5',
    '## clinical_relevance', field(it, 'clinical_relevance') || '0.3',
    '## academic_relevance', field(it, 'academic_relevance') || '0.9',
    '## exam_weight_by_year', field(it, 'exam_weight_by_year') || 'KAU_Y1=0.45',
    '## years', 'Year 1',
    '## universities', field(it, 'universities') || 'kau',
    '## module', '108 INT',
    '## module_subject', field(it, 'module_subject'),
    '## question_only_for', field(it, 'question_only_for') || 'KAU_Y1',
    '## library_ids', field(it, 'library_ids'),
    '## resource_ids', resourceIds,
    '## learning_objective', learningObj,
    '## source_citation', cite,
    '## estimated_seconds', field(it, 'estimated_seconds') || '60',
    '## randomise_answers', field(it, 'randomise_answers') || 'yes',
    '## derived_from', 'Exam MCQ, transcribed rather than derived.',
    '## author_notes', field(it, 'author_notes'),
  ];
  out.push(lines.join('\n'));
}

console.error(JSON.stringify(report, null, 2));
console.error(`emitted ids: QST-108-INT-MCQ-001..${String(n).padStart(3, '0')}`);

const header = `<!--
  108 INT — single-best-answer questions of both end-of-year papers (Pathology +
  Pharmacology), authored to the 102-INT full-contract standard.

  Sources (manifest ../manifest/kasr-y1-sources.json):
    src_bd1595e59d116b78436a — "EOY 108 exam 199 [solved] (2).pdf", 2025 sitting (batch 199).
    src_3deab75f7f81cc5f5260 — "EOY Exam {INT-108} 198 (Solved) (3).pdf", 2024 sitting (batch 198).

  Every question, title and answer here is a TRANSCRIPTION of the examiner's own
  wording; answers come from the recovered highlight key
  (scripts/kasr/extract/108-INT/answerkey.json), never from an author's judgement.
  Re-emitted from 108-INT-EOY-mcq.md by scripts/kasr/reauthor-108-int-bank.mjs.

  concept_ids / contextual_concept_ids are left blank in this bank, as in 102-INT;
  main_concept names the concept each item tests. The 2025 Q22 pharmacogenomics
  item is not here — no concept or article covers it yet (single omission).
-->
`;

if (WRITE && out.length) {
  fs.writeFileSync(BANK, header + '\n' + out.join('\n\n---\n\n') + '\n');
  console.error('WROTE ' + BANK + ` (${out.length} items)`);
} else if (!WRITE) {
  console.log(header + '\n' + out.join('\n\n---\n\n') + '\n');
}
