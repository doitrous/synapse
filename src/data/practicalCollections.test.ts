import { test } from 'node:test'
import assert from 'node:assert/strict'
import { missedPracticalIds, practicalLastAt, type PracticalCatalogueEntry } from './practicalCollections.ts'
import { EMPTY_PRACTICAL_PROGRESS, type PracticalProgress } from './practicalProgress.ts'
import type { AttemptRecord } from './attempts.ts'

const CATALOGUE: PracticalCatalogueEntry[] = [
  { id: 'osce-pass', kind: 'osce' },
  { id: 'osce-fail', kind: 'osce' },
  { id: 'case-wrong', kind: 'case' },
  { id: 'case-clean', kind: 'case' },
  { id: 'case-open', kind: 'case' },
  { id: 'lab-wrong', kind: 'lab' },
  { id: 'lab-part', kind: 'lab' },
  { id: 'lab-clean', kind: 'lab' },
]

const PROGRESS: PracticalProgress = {
  ...EMPTY_PRACTICAL_PROGRESS,
  stations: {
    'osce-pass': { attempts: 1, bestMarks: 16, outOf: 20, lastAt: '2026-09-01T09:00:00.000Z', checkedItems: [] },
    'osce-fail': { attempts: 2, bestMarks: 7, outOf: 20, lastAt: '2026-09-01T10:00:00.000Z', checkedItems: [] },
  },
  cases: {
    'case-wrong': { status: 'completed', lastStep: 4, steps: 4, lastAt: '2026-09-01T11:00:00.000Z' },
    'case-clean': { status: 'completed', lastStep: 4, steps: 4, lastAt: '2026-09-01T12:00:00.000Z' },
    'case-open': { status: 'in-progress', lastStep: 2, steps: 5, lastAt: '2026-09-01T13:00:00.000Z' },
  },
  labs: {
    'lab-wrong': { done: 6, items: 6, lastAt: '2026-09-01T14:00:00.000Z' },
    'lab-part': { done: 3, items: 8, lastAt: '2026-09-01T15:00:00.000Z' },
    'lab-clean': { done: 5, items: 5, lastAt: '2026-09-01T16:00:00.000Z' },
  },
}

function record(surface: AttemptRecord['surface'], itemId: string, correct: boolean | null): AttemptRecord {
  return {
    id: `${surface}:${itemId}`,
    at: '2026-09-01T11:00:00.000Z',
    surface,
    itemId,
    subjectId: 'cardio',
    topic: 'Fixture',
    difficulty: 'Moderate',
    conceptIds: [],
    correct,
    seconds: null,
  }
}

const RECORDS: AttemptRecord[] = [
  record('case', 'case-wrong:0', true),
  record('case', 'case-wrong:1', false),
  record('case', 'case-clean:0', true),
  record('case', 'case-clean:1', true),
  record('lab', 'lab-wrong:0', false),
  record('lab', 'lab-clean:0', true),
]

test('a station below half marks is missed and one above it is not', () => {
  const missed = missedPracticalIds(PROGRESS, CATALOGUE, RECORDS)
  assert.equal(missed.includes('osce-fail'), true)
  assert.equal(missed.includes('osce-pass'), false)
})

test('a case is missed when a decision was wrong, or when it was left open', () => {
  const missed = missedPracticalIds(PROGRESS, CATALOGUE, RECORDS)
  assert.equal(missed.includes('case-wrong'), true, 'a wrong decision')
  assert.equal(missed.includes('case-open'), true, 'started and unfinished')
  assert.equal(missed.includes('case-clean'), false, 'finished, nothing wrong')
})

test('a lab set is missed when a question was wrong, or when it was left part-done', () => {
  const missed = missedPracticalIds(PROGRESS, CATALOGUE, RECORDS)
  assert.equal(missed.includes('lab-wrong'), true)
  assert.equal(missed.includes('lab-part'), true)
  assert.equal(missed.includes('lab-clean'), false)
})

test('nothing the student has not touched is missed', () => {
  assert.deepEqual(missedPracticalIds(EMPTY_PRACTICAL_PROGRESS, CATALOGUE, RECORDS), [])
})

test('an item the catalogue no longer holds is never offered', () => {
  // A withdrawn station cannot be sat, so listing it would be a dead end.
  const missed = missedPracticalIds(PROGRESS, [{ id: 'osce-pass', kind: 'osce' }], RECORDS)
  assert.deepEqual(missed, [])
})

test('most recently worked on comes first', () => {
  const missed = missedPracticalIds(PROGRESS, CATALOGUE, RECORDS)
  assert.deepEqual(missed, ['lab-part', 'lab-wrong', 'case-open', 'case-wrong', 'osce-fail'])
})

test('without the attempt log only stations and unfinished work are found', () => {
  // The progress store alone cannot say a decision was wrong — it never records
  // one. This is the honest answer in that case, not a guess.
  const missed = missedPracticalIds(PROGRESS, CATALOGUE)
  assert.deepEqual(missed, ['lab-part', 'case-open', 'osce-fail'])
})

test('the last time an item was worked on is readable whichever list it is in', () => {
  assert.equal(practicalLastAt(PROGRESS, 'osce-fail'), '2026-09-01T10:00:00.000Z')
  assert.equal(practicalLastAt(PROGRESS, 'case-open'), '2026-09-01T13:00:00.000Z')
  assert.equal(practicalLastAt(PROGRESS, 'lab-part'), '2026-09-01T15:00:00.000Z')
  assert.equal(practicalLastAt(PROGRESS, 'never-touched'), null)
})
