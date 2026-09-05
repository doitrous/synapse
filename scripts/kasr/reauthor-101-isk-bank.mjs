#!/usr/bin/env node
// Re-emit generator-authored 101-ISK seed items (docs/import-ready/question/101-ISK-mcq.md)
// into the full-contract MCQ-bank.md, matching 102-INT item contract field-for-field.
// Deterministic transform; explanations are the seed's own authored text. Not build-batches
// output, so a rebuild will not delete the bank.
//
// Usage: node scripts/kasr/reauthor-101-isk-bank.mjs "<subtopic1>||<subtopic2>..." [--write]
import fs from 'node:fs';

const SRC = 'docs/import-ready/question/101-ISK-mcq.md';
const BANK = 'docs/import-ready/question/101-ISK-MCQ-bank.md';
const CONCEPT_FILES = [
  'docs/import-ready/concept/101-ISK-mcq-concepts.md',
  'docs/import-ready/concept/101-ISK-concepts.md',
  'docs/import-ready/concept/101-ISK-practical-concepts.md',
];

const wantSubtopics = new Set((process.argv[2] || '').split('||').map(s => s.trim()).filter(Boolean));
const WRITE = process.argv.includes('--write');
if (!wantSubtopics.size) { console.error('need subtopic allowlist'); process.exit(1); }

const field = (block, name) => {
  const m = block.match(new RegExp('^## ' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\n([\\s\\S]*?)(?=\\n## |\\n# Item|\\n---)', 'm'));
  return m ? m[1].replace(/\s+$/, '') : '';
};

const DIFF_INFERRED = { Easy: 79, Moderate: 60, Med: 68, Medium: 68, Hard: 45, Challenging: 45 };
const EFFORT_SCORE = { Low: 0.2, Medium: 0.5, Med: 0.5, High: 0.8 };
const QT_REMAP = { 'Clinical correlation': 'Reasoning', 'Normal values': 'Definition' };

const ocr = s => s
  .replace(/^ls /, 'Is ')
  .replace(/\bls\b(?= (a|an|the|responsible|supplied|stimulated|formed|found))/g, 'Is')
  .replace(/[ \t]{2,}/g, ' ')
  .replace(/[ \t]+\n/g, '\n')
  .trim();

const bankText = fs.existsSync(BANK) ? fs.readFileSync(BANK, 'utf8') : '';
const conceptText = CONCEPT_FILES.map(f => fs.readFileSync(f, 'utf8')).join('\n');

const normStem = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const seenStems = new Set();               // dedupe: existing bank + intra-run
for (const b of bankText.split(/\n## id\n/).slice(1)) seenStems.add(normStem(field(b + '\n---', 'question')));

let maxN = 0;
for (const m of bankText.matchAll(/QST-101-ISK-MCQ-(\d+)/g)) maxN = Math.max(maxN, +m[1]);

const src = fs.readFileSync(SRC, 'utf8');
const items = src.split(/\n# Item\n/).slice(1).map(it => it.endsWith('\n---') || /\n---(\n|$)/.test(it) ? it : it + '\n---');

const out = [];
const report = { emitted: 0, skippedDupe: 0, excluded5opt: 0, excludedKeyless: 0, missingConcept: [], subtopics: {} };
let n = maxN;

for (const it of items) {
  const subtopic = field(it, 'subtopic');
  if (!wantSubtopics.has(subtopic)) continue;

  const correct = field(it, 'correct_answer').trim().toUpperCase().slice(0, 1);
  if (!correct || !'ABCD'.includes(correct)) {           // 4-option contract only
    if (/^## answer_e/m.test(it)) report.excluded5opt++; else report.excludedKeyless++;
    continue;
  }
  if (/^## answer_e/m.test(it)) { report.excluded5opt++; continue; }  // 5-option: keep strict a-d contract

  const question = ocr(field(it, 'question'));
  if (seenStems.has(normStem(question))) { report.skippedDupe++; continue; }
  seenStems.add(normStem(question));

  const mainConcept = field(it, 'main_concept');
  if (mainConcept && !conceptText.includes(mainConcept)) report.missingConcept.push(mainConcept);

  const difficulty = field(it, 'difficulty') || 'Moderate';
  const inferred = DIFF_INFERRED[difficulty] ?? 60;
  const effort = field(it, 'cognitive_effort') || 'Medium';
  const effortScore = EFFORT_SCORE[effort] ?? 0.5;
  let qtype = field(it, 'question_type');
  qtype = QT_REMAP[qtype] || qtype;
  const cite = field(it, 'source_citation');
  const resMatch = cite.match(/Manifest (src_[0-9a-f]+)/);
  const resourceIds = resMatch ? resMatch[1] : '';
  const title = field(it, 'title');

  const opts = ['a', 'b', 'c', 'd'];
  const ans = {}, exp = {};
  for (const o of opts) {
    ans[o] = ocr(field(it, 'answer_' + o));
    let e = field(it, 'explanation_' + o).replace(/\s+$/, '');
    if (o === correct.toLowerCase() && !/^Correct[.\s]/.test(e)) e = 'Correct. ' + e;
    exp[o] = e;
  }

  n += 1;
  report.emitted++;
  report.subtopics[subtopic] = (report.subtopics[subtopic] || 0) + 1;

  const learningObj = field(it, 'learning_objective');
  const vignette = `This item asks the student to ${learningObj ? learningObj.charAt(0).toLowerCase() + learningObj.slice(1).replace(/\.$/, '') : 'recall the keyed fact'}.`;

  const lines = [
    '', '---', '', '# Item', '## id', `QST-101-ISK-MCQ-${String(n).padStart(3, '0')}`,
    '## title', title,
    '## question', question,
    '## vignette', vignette,
    '## subject', field(it, 'subject'),
    '## status', 'Draft',
    '## owner', 'Claude',
    '## format', 'single best answer',
    '## correct_answer', correct,
    '## answer_a', ans.a, '## explanation_a', exp.a,
    '## answer_b', ans.b, '## explanation_b', exp.b,
    '## answer_c', ans.c, '## explanation_c', exp.c,
    '## answer_d', ans.d, '## explanation_d', exp.d,
    '## topic', field(it, 'topic'),
    '## subtopic', subtopic,
    '## main_concept', mainConcept,
    '## concept_ids', '',
    '## contextual_concept_ids', '',
    '## difficulty', difficulty,
    '## question_type', qtype,
    '## cognitive_effort', effort,
    '## cognitive_effort_score', String(effortScore),
    '## setting', field(it, 'setting') || 'Academic',
    '## reasoning_level', field(it, 'reasoning_level') || '1',
    '## inferred_difficulty', String(inferred),
    '## exam_relevance', field(it, 'exam_relevance') || '4.5',
    '## clinical_relevance', field(it, 'clinical_relevance') || '0.3',
    '## academic_relevance', field(it, 'academic_relevance') || '0.9',
    '## exam_weight_by_year', field(it, 'exam_weight_by_year') || 'KAU_Y1=0.45',
    '## years', field(it, 'years') || 'Year 1',
    '## universities', field(it, 'universities') || 'kau',
    '## module', '101 ISK',
    '## module_subject', field(it, 'module_subject'),
    '## question_only_for', field(it, 'question_only_for') || 'KAU_Y1',
    '## library_ids', field(it, 'library_ids'),
    '## resource_ids', resourceIds,
    '## learning_objective', learningObj,
    '## source_citation', cite,
    '## estimated_seconds', field(it, 'estimated_seconds') || '60',
    '## randomise_answers', field(it, 'randomise_answers') || 'yes',
    '## derived_from', 'Department book MCQ, transcribed rather than derived.',
    '## author_notes', field(it, 'author_notes'),
  ];
  out.push(lines.join('\n'));
}

console.error(JSON.stringify(report, null, 2));
console.error(`next id range: ${String(maxN + 1).padStart(3, '0')}..${String(n).padStart(3, '0')}`);

if (WRITE && out.length) {
  // The header comment must glue to item 1 (no `---` between), or the importer splits
  // it into a headerless record and the file detects as "unknown". A leading `---` is
  // only wanted when appending after an existing item.
  if (maxN === 0) out[0] = out[0].replace(/^\n---\n/, '');
  fs.appendFileSync(BANK, out.join('\n') + '\n');
  console.error('APPENDED to ' + BANK);
} else if (!WRITE) {
  console.log(out.join('\n'));
}
