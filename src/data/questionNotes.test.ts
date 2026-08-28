import test from 'node:test'
import assert from 'node:assert/strict'
import { EMPTY_QUESTION_NOTE_STATS, questionNoteStats } from './questionNotes.ts'
import type { AttemptRecord } from './attempts.ts'

function record(overrides: Partial<AttemptRecord>): AttemptRecord {
  return {
    id: overrides.id ?? `${overrides.sessionId ?? 's1'}:qbank:${overrides.itemId ?? 'q1'}`,
    at: '2026-01-01T00:00:00.000Z',
    surface: 'qbank',
    itemId: 'q1',
    subjectId: 'cvs',
    topic: 'Arrhythmia',
    difficulty: 'Moderate',
    conceptIds: [],
    correct: null,
    seconds: null,
    sessionId: 's1',
    ...overrides,
  }
}

test('a question with no attempts returns the empty stats', () => {
  assert.deepEqual(questionNoteStats([], 'q1'), EMPTY_QUESTION_NOTE_STATS)
})

test('records for other questions or other surfaces are ignored', () => {
  const records = [
    record({ itemId: 'other', correct: true }),
    record({ itemId: 'q1', surface: 'case', correct: true }),
  ]
  assert.deepEqual(questionNoteStats(records, 'q1'), EMPTY_QUESTION_NOTE_STATS)
})

test('one attempt reports itself, with no trend to report yet', () => {
  const records = [record({ at: '2026-01-01T00:00:00.000Z', correct: true, seconds: 42, sessionId: 's1' })]
  const stats = questionNoteStats(records, 'q1')
  assert.equal(stats.attempts, 1)
  assert.equal(stats.lastAt, '2026-01-01T00:00:00.000Z')
  assert.equal(stats.lastCorrect, true)
  assert.equal(stats.lastSeconds, 42)
  assert.equal(stats.trend, null)
})

test('the most recent attempt wins regardless of record order', () => {
  const records = [
    record({ id: 'b', at: '2026-01-05T00:00:00.000Z', correct: false, seconds: 10, sessionId: 's2' }),
    record({ id: 'a', at: '2026-01-01T00:00:00.000Z', correct: true, seconds: 20, sessionId: 's1' }),
  ]
  const stats = questionNoteStats(records, 'q1')
  assert.equal(stats.attempts, 2)
  assert.equal(stats.lastAt, '2026-01-05T00:00:00.000Z')
  assert.equal(stats.lastCorrect, false)
  assert.equal(stats.lastSeconds, 10)
})

test('going from wrong to right reports improved', () => {
  const records = [
    record({ id: 'a', at: '2026-01-01T00:00:00.000Z', correct: false, sessionId: 's1' }),
    record({ id: 'b', at: '2026-01-02T00:00:00.000Z', correct: true, sessionId: 's2' }),
  ]
  assert.equal(questionNoteStats(records, 'q1').trend, 'improved')
})

test('going from right to wrong reports slipped', () => {
  const records = [
    record({ id: 'a', at: '2026-01-01T00:00:00.000Z', correct: true, sessionId: 's1' }),
    record({ id: 'b', at: '2026-01-02T00:00:00.000Z', correct: false, sessionId: 's2' }),
  ]
  assert.equal(questionNoteStats(records, 'q1').trend, 'slipped')
})

test('two attempts with the same verdict report steady', () => {
  const records = [
    record({ id: 'a', at: '2026-01-01T00:00:00.000Z', correct: true, sessionId: 's1' }),
    record({ id: 'b', at: '2026-01-02T00:00:00.000Z', correct: true, sessionId: 's2' }),
  ]
  assert.equal(questionNoteStats(records, 'q1').trend, 'steady')
})

test('an unmarked attempt does not count toward the trend comparison', () => {
  const records = [
    record({ id: 'a', at: '2026-01-01T00:00:00.000Z', correct: true, sessionId: 's1' }),
    record({ id: 'b', at: '2026-01-02T00:00:00.000Z', correct: null, sessionId: 's2' }),
  ]
  const stats = questionNoteStats(records, 'q1')
  // Only one marked attempt exists, so there is nothing yet to compare.
  assert.equal(stats.trend, null)
  // But the unmarked attempt is still the most recent one shown.
  assert.equal(stats.attempts, 2)
  assert.equal(stats.lastCorrect, null)
})
