#!/usr/bin/env node
// scripts/content/emit-mcq.mjs — compact seed JSON → import-format MCQ batch
// (hand-authored ASU/AU field order). The agent writes the medicine (stem,
// options, explanations, concept choice) in the seed; this tool writes the
// format. Never hand-edit the generated .md — fix the seed and re-emit.
import { readFileSync, writeFileSync } from 'node:fs';

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

// Field order copied verbatim from the first record of
// docs/Ain-Shams-Source-Imports/question/ASU-IBM-protein-chemistry-mcq.md.
// That file has no field_notes column, and the question import contract
// (src/data/bulkImport.ts, IMPORT_SCHEMAS.question.fields) has no
// `field_notes` field at all — it exists only on concept/relation records —
// so a seed's field_notes are folded into `author_notes` (also internal,
// never shown to a student) rather than emitted as their own, unknown column.
const PRE_OPTIONS = ['id', 'title', 'question', 'subject', 'status', 'owner', 'vignette', 'correct_answer'];
const POST_OPTIONS = [
  'topic', 'subtopic', 'main_concept', 'concept_ids', 'contextual_concept_ids', 'difficulty', 'question_type',
  'cognitive_effort', 'cognitive_effort_score', 'setting', 'reasoning_level', 'inferred_difficulty', 'exam_relevance',
  'clinical_relevance', 'academic_relevance', 'exam_weight_by_year', 'years', 'universities', 'module', 'module_subject',
  'question_only_for', 'library_ids', 'resource_ids', 'learning_objective', 'source_citation', 'attached_image',
  'attachments', 'media_recommendations', 'estimated_seconds', 'randomise_answers', 'author_notes',
];

const COGNITIVE_EFFORT_SCORE = { Low: 0.2, Medium: 0.5, High: 0.8 };
const INFERRED_DIFFICULTY = { Easy: 75, Moderate: 50, Hard: 30, Challenging: 15 };
const SETTING_RELEVANCE = {
  Academic: { clinical: 0.2, academic: 0.8 },
  Clinical: { clinical: 0.8, academic: 0.2 },
  Both: { clinical: 0.5, academic: 0.5 },
};

function die(msg) {
  console.log(`error: ${msg}`);
  process.exit(1);
}

function sentenceCount(text) {
  return text.split(/[.!?](\s|$)/).filter((s) => s.trim()).length;
}

function defaultId(lane, cluster, key) {
  const laneNoDash = lane.replace(/-/g, '');
  const clusterUpper = cluster.toUpperCase();
  const keyPart = key.toUpperCase().replace(/[^A-Z0-9]+/g, '-');
  return `QST-${laneNoDash}-${clusterUpper}-${keyPart}`;
}

function checkNoBareSeparator(key, fields) {
  for (const [name, value] of Object.entries(fields)) {
    if (typeof value !== 'string') continue;
    if (value.split(/\r?\n/).some((line) => line.trim() === '---')) {
      die(`${key}: field "${name}" contains a line that is exactly "---", which would be read as a record separator`);
    }
  }
}

function pipeJoin(list) {
  return (list ?? []).filter((v) => v != null && String(v).trim() !== '').join(' | ');
}

function serializeWeightMap(map) {
  return Object.entries(map ?? {}).map(([k, v]) => `${k}=${v}`).join(' | ');
}

function serializeFieldNotes(notes) {
  return Object.entries(notes ?? {}).map(([k, v]) => `${k}: ${v}`).join('\n');
}

function buildRow(seed, question) {
  const { lane, cluster, defaults } = seed;
  const key = question.key;

  // Per-question value always overrides the seed-wide default; `??` means an
  // explicit `null` in the question also falls through to the default.
  const ov = (field) => question[field] ?? defaults[field];

  const options = question.options ?? {};
  const letters = OPTION_LETTERS.filter((l) => l in options);
  if (letters.length < 4 || letters.length > 5) {
    die(`${key}: ${letters.length} options — the contract is 4 to 5`);
  }

  const correct = question.correct;
  if (!letters.includes(correct)) {
    die(`${key}: correct "${correct}" is not one of the option letters (${letters.join(', ')})`);
  }

  const explanations = question.explanations ?? {};
  for (const letter of letters) {
    const optionValue = String(options[letter] ?? '');
    if (optionValue.trim().startsWith('+')) {
      die(`${key}: option ${letter} starts with "+" — not allowed`);
    }
    if (!explanations[letter]?.trim()) {
      die(`${key}: option ${letter} has no explanation`);
    }
  }

  const correctExplanation = explanations[correct] ?? '';
  const n = sentenceCount(correctExplanation);
  if (n < 3) {
    die(`${key}: explanation for correct answer ${correct} has ${n} sentence${n === 1 ? '' : 's'} (need >= 3)`);
  }

  const setting = ov('setting') ?? 'Both';
  const relevance = SETTING_RELEVANCE[setting] ?? SETTING_RELEVANCE.Both;
  const cognitiveEffort = ov('cognitive_effort') ?? 'Medium';
  const difficulty = ov('difficulty') ?? 'Moderate';

  const citationTemplate = ov('source_citation') ?? '';
  const page = question.page ?? defaults.page ?? '';
  const sourceCitation = citationTemplate.replace('{page}', page);

  const fieldNotesText = serializeFieldNotes(question.field_notes);
  const authorNotes = [fieldNotesText, question.author_notes ?? ''].filter((s) => s.trim()).join('\n');

  const row = {
    id: question.id?.trim() || defaultId(lane, cluster, key),
    title: ov('title') ?? '',
    question: ov('question') ?? '',
    subject: ov('subject') ?? '',
    status: ov('status') ?? 'Draft',
    owner: ov('owner') ?? '',
    vignette: ov('vignette') ?? '',
    correct_answer: correct,
    topic: ov('topic') ?? '',
    subtopic: ov('subtopic') ?? '',
    main_concept: ov('main_concept') ?? '',
    concept_ids: pipeJoin(ov('concept_ids')),
    contextual_concept_ids: pipeJoin(ov('contextual_concept_ids')),
    difficulty,
    question_type: ov('question_type') ?? '',
    cognitive_effort: cognitiveEffort,
    cognitive_effort_score: String(ov('cognitive_effort_score') ?? COGNITIVE_EFFORT_SCORE[cognitiveEffort] ?? 0.5),
    setting,
    reasoning_level: String(ov('reasoning_level') ?? 2),
    inferred_difficulty: String(ov('inferred_difficulty') ?? INFERRED_DIFFICULTY[difficulty] ?? 50),
    exam_relevance: String(ov('exam_relevance') ?? 5),
    clinical_relevance: String(ov('clinical_relevance') ?? relevance.clinical),
    academic_relevance: String(ov('academic_relevance') ?? relevance.academic),
    exam_weight_by_year: serializeWeightMap(ov('exam_weight_by_year')),
    years: pipeJoin(ov('years')),
    universities: pipeJoin(ov('universities')),
    module: ov('module') ?? '',
    module_subject: ov('module_subject') ?? '',
    question_only_for: ov('question_only_for') ?? '',
    library_ids: pipeJoin(ov('library_ids')),
    resource_ids: pipeJoin(ov('resource_ids')),
    learning_objective: ov('learning_objective') ?? '',
    source_citation: sourceCitation,
    attached_image: '',
    attachments: '',
    media_recommendations: ov('media_recommendations') ?? '',
    estimated_seconds: String(ov('estimated_seconds') ?? 60),
    randomise_answers: (ov('randomise_answers') ?? true) ? 'yes' : 'no',
    author_notes: authorNotes,
  };

  for (const letter of letters) {
    row[`answer_${letter.toLowerCase()}`] = String(options[letter]);
    row[`explanation_${letter.toLowerCase()}`] = String(explanations[letter]);
  }

  checkNoBareSeparator(key, row);
  return { row, letters };
}

function fieldOrder(letters) {
  const optionFields = letters.flatMap((l) => [`answer_${l.toLowerCase()}`, `explanation_${l.toLowerCase()}`]);
  return [...PRE_OPTIONS, ...optionFields, ...POST_OPTIONS];
}

function serializeBlock(name, value) {
  const trimmed = (value ?? '').trim();
  return trimmed ? `## ${name}\n${value}` : `## ${name}`;
}

function serializeRecord(row, letters) {
  const order = fieldOrder(letters);
  const blocks = order.map((name) => serializeBlock(name, row[name] ?? ''));
  return `# Item\n\n${blocks.join('\n\n')}`;
}

function serializeHeader(header) {
  return `<!--\n  ${header}\n\n  Import: Admin › Bulk import → question.\n-->`;
}

function main() {
  const args = process.argv.slice(2);
  const seedPath = args[0];
  if (!seedPath) {
    console.log('usage: emit-mcq.mjs <seed.json> [--out <batch.md>]');
    process.exit(2);
  }
  const outIdx = args.indexOf('--out');
  const outPath = outIdx >= 0 ? args[outIdx + 1] : null;

  const seed = JSON.parse(readFileSync(seedPath, 'utf8'));
  const records = [];
  for (const question of seed.questions ?? []) {
    if (question.hold) continue; // held questions emit nothing
    const { row, letters } = buildRow(seed, question);
    records.push(serializeRecord(row, letters));
  }

  const out = `${serializeHeader(seed.header ?? '')}\n\n${records.join('\n\n---\n\n')}\n`;

  if (outPath) writeFileSync(outPath, out);
  else process.stdout.write(out);
}

main();
