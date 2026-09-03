import test from 'node:test'
import assert from 'node:assert/strict'
import { importRowToContent } from './bulkImport.ts'
import { materialiseNewItem, mergeContentItem } from './importMerge.ts'
import { questionsInSources } from './qbankScope.ts'
import type { Question } from './qbank.ts'
import type { SourceBucket } from './questionSource.ts'

/**
 * The `## source` column travels: bulkImport parses it into
 * `questionData.tags.sourceCategory`, and usePublishedQuestions.ts (line
 * `source: data.tags.sourceCategory`) copies that onto the student-facing
 * `Question.source`, which `bucketOf`/`questionsInSources` read to filter.
 * That copy pulls in React and the `@/` alias, neither of which `node --test`
 * resolves, so this test reproduces the single-line copy locally and asserts
 * the two ends that do live in importable modules.
 */
const ROW = (source?: string) => ({
  id: 'Q-SRC', title: 'T', subject: 'cvs', question: 'Q?', correct_answer: 'A',
  answer_a: 'x', answer_b: 'y', ...(source === undefined ? {} : { source }),
})

const sourceCategoryOf = (row: Record<string, string>) =>
  materialiseNewItem(importRowToContent('question', row, 'r1')).questionData!.tags.sourceCategory

const asQuestion = (row: Record<string, string>): Question => ({
  id: 'Q-SRC', subjectId: 'cvs', topic: 'General', difficulty: 'Moderate', vignette: '',
  stem: 'T', options: [{ text: 'x', correct: true }, { text: 'y', correct: false }],
  explanation: '', libraryRefs: [], resourceRefs: [], conceptIds: [],
  // The production copy, verbatim (usePublishedQuestions.ts).
  source: sourceCategoryOf(row),
})

test('## source past-paper yields question.source === "past-paper"', () => {
  assert.equal(sourceCategoryOf(ROW('past-paper')), 'past-paper')
  assert.equal(asQuestion(ROW('past-paper')).source, 'past-paper')
})

test('each of the three valid values is carried through', () => {
  assert.equal(sourceCategoryOf(ROW('dept-mcq')), 'dept-mcq')
  assert.equal(sourceCategoryOf(ROW('dept-book')), 'dept-book')
})

test('a blank source yields undefined (absent is a valid rollout state, not an error)', () => {
  assert.equal(sourceCategoryOf(ROW(undefined)), undefined)
  assert.equal(sourceCategoryOf(ROW('')), undefined)
  assert.equal(sourceCategoryOf(ROW('   ')), undefined)
})

test('an unrecognised source yields undefined rather than throwing', () => {
  assert.equal(sourceCategoryOf(ROW('exam-paper')), undefined)
  assert.equal(sourceCategoryOf(ROW('Past Paper')), undefined) // case/format must match exactly
  assert.equal(sourceCategoryOf(ROW('garbage')), undefined)
})

test('re-importing a batch that adds ## source updates the stored question (update path)', () => {
  const existing = materialiseNewItem(importRowToContent('question', ROW(undefined), 'r1'))
  assert.equal(existing.questionData!.tags.sourceCategory, undefined)
  const patch = importRowToContent('question', { id: 'Q-SRC', title: 'T', subject: 'cvs', source: 'past-paper' }, 'r2')
  const merged = mergeContentItem(existing, patch, false)
  assert.equal(merged.questionData!.tags.sourceCategory, 'past-paper')
})

test('a silent source column on an update leaves the stored source alone', () => {
  const existing = materialiseNewItem(importRowToContent('question', ROW('past-paper'), 'r1'))
  const patch = importRowToContent('question', { id: 'Q-SRC', title: 'T (revised)', subject: 'cvs' }, 'r2')
  const merged = mergeContentItem(existing, patch, false)
  assert.equal(merged.questionData!.tags.sourceCategory, 'past-paper')
})

test('questionsInSources narrows on the parsed result', () => {
  const past = asQuestion(ROW('past-paper'))
  const mcq = { ...asQuestion(ROW('dept-mcq')), id: 'Q-MCQ' }
  const untagged = { ...asQuestion(ROW(undefined)), id: 'Q-NONE' }
  const pool = [past, mcq, untagged]

  // Empty selection = all sources (unchanged builder).
  assert.equal(questionsInSources(pool, new Set<SourceBucket>()).length, 3)
  // A single source narrows to it.
  assert.deepEqual(questionsInSources(pool, new Set<SourceBucket>(['past-paper'])).map((q) => q.id), ['Q-SRC'])
  // Untagged questions only match the explicit 'unspecified' bucket.
  assert.deepEqual(questionsInSources(pool, new Set<SourceBucket>(['unspecified'])).map((q) => q.id), ['Q-NONE'])
  assert.deepEqual(
    questionsInSources(pool, new Set<SourceBucket>(['past-paper', 'dept-mcq'])).map((q) => q.id).sort(),
    ['Q-MCQ', 'Q-SRC'],
  )
})
