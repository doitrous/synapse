import { test } from 'node:test'
import assert from 'node:assert/strict'
import { detectBatchKind } from './batchKind.ts'
import { IMPORT_SCHEMAS } from './bulkImport.ts'
import { WRITTEN_FORMATS } from './questionFormat.ts'

test('a single-best-answer batch is a question batch', () => {
  assert.equal(detectBatchKind({ question: 'Which?', correct_answer: 'A', answer_a: 'This one' }), 'question')
})

test('a written batch is a question batch, with no lettered answer anywhere in it', () => {
  const row = { title: 'Decidua', question: 'Describe the decidua.', written_parts: '### (a) 6 marks\nExpects: it is shed' }
  assert.equal(detectBatchKind(row), 'question')
  assert.ok(!('correct_answer' in row), 'a written question has no lettered answer to detect it by')
})

test('every non-lettered format has a column that identifies its batch', () => {
  // The bug this replaces: a matching, completion or labelling batch carried
  // none of the three columns the detector tested for, so a whole file came
  // back "unknown" and nothing checked it.
  const byFormat: Record<string, Record<string, string>> = {
    matching: { question: 'Match these', matching_prompts: 'a = A', matching_options: 'A | thing' },
    completion: { question: 'Fill in', completion_text: 'The [[nerve]] runs here' },
    labelling: { question: 'Label it', labeling_points: '1 @ 10,10 = Scaphoid' },
    'multiple response': { question: 'Pick all', correct_answers: 'A | C' },
  }
  for (const [name, row] of Object.entries(byFormat)) {
    assert.equal(detectBatchKind(row), 'question', `a ${name} batch should be detected as a question batch`)
  }
})

test('a written format alone identifies a question, since format is a question-only column', () => {
  const questionColumns = new Set(IMPORT_SCHEMAS.question.fields.map((field) => field.key))
  assert.ok(questionColumns.has('format'), 'format is a question column')
  for (const kind of ['article', 'practical', 'concept'] as const) {
    const other = IMPORT_SCHEMAS[kind as keyof typeof IMPORT_SCHEMAS]
    if (!other) continue
    assert.ok(!other.fields.some((field) => field.key === 'format'),
      `${kind} must not also carry a "format" column, or the detector would confuse the two`)
  }
  assert.ok(WRITTEN_FORMATS.length > 0)
})

test('a concept batch is still a concept batch', () => {
  assert.equal(detectBatchKind({ label: 'The decidua is shed at birth', canonical_key: 'decidua' }), 'concept')
})

test('an article batch is not mistaken for a question batch', () => {
  assert.equal(detectBatchKind({ title: 'The decidua', summary: 'A summary', sections: '### Definition\nText' }), 'article')
})

test('a practical batch is not mistaken for a question batch', () => {
  assert.equal(detectBatchKind({ title: 'Station', type: 'OSCE station', mark_scheme: 'Opening (5): greets' }), 'practical')
})

test('a catalogue resource batch is distinct from an evidence source batch', () => {
  assert.equal(detectBatchKind({ title: 'Slides', subject: 'cvs', type: 'Deck', source: 'ASU', status: 'Draft' }), 'catalogue-resource')
  assert.equal(detectBatchKind({ title: 'Source PDF', institution: 'ASU', processing_status: 'pending' }), 'resource')
})

test('an authored minigame batch is detected from its game kind and payload', () => {
  assert.equal(detectBatchKind({ kind: 'clinical_sequence', prompt: 'Order these', steps: 'a | First' }), 'minigame')
  assert.equal(detectBatchKind({ kind: 'red_flag_sort', prompt: 'Sort these', findings: 'a | urgent | Finding | Why' }), 'minigame')
})

test('a bilingual glossary batch is detected from its authored fields', () => {
  assert.equal(detectBatchKind({
    id: 'tachycardia',
    term: 'Tachycardia',
    ar: 'تسرّع القلب',
    category: 'Signs & symptoms',
    def: 'A faster than normal heart rate.',
    definition_ar: 'تسارع ضربات القلب عن المعدل الطبيعي.',
  }), 'glossary')
})

test('a row that matches no contract stays unknown rather than becoming a concept', () => {
  // The failure this guards: falling back to 'concept' meant a stray question
  // batch was applied as sixteen concept upserts and nothing said so.
  assert.equal(detectBatchKind({ some_column: 'x', another: 'y' }), 'unknown')
})

test('a question column list that grows a new payload keeps the detector honest', () => {
  // A drift guard. If someone adds a thirteenth format with its own column and
  // does not teach the detector about it, that format's batches go unvalidated
  // in silence — which is exactly what happened to the written formats.
  const payloads = ['written_parts', 'correct_answers', 'completion_text',
    'matching_prompts', 'matching_options', 'labeling_points']
  const questionColumns = new Set(IMPORT_SCHEMAS.question.fields.map((field) => field.key))
  for (const payload of payloads) {
    assert.ok(questionColumns.has(payload), `${payload} is no longer a question column — update detectBatchKind`)
    assert.equal(detectBatchKind({ question: 'q', [payload]: 'v' }), 'question')
  }
})
