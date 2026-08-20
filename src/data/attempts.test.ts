import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  addAttempt, attemptId, attemptMonth, attemptSeconds, emptyMonth, EMPTY_INDEX, indexAttempt, recentMonths,
  removeSession, unindexAttempts, type AttemptRecord,
} from './attempts.ts'

/** A record with everything defaulted, so each test states only what it means. */
function attempt(patch: Partial<AttemptRecord> = {}): AttemptRecord {
  const base = {
    at: '2026-08-13T10:00:00.000Z',
    surface: 'qbank' as const,
    itemId: 'q1',
    subjectId: 'cvs',
    topic: 'Heart failure',
    difficulty: 'Moderate' as const,
    conceptIds: [] as string[],
    correct: true as boolean | null,
    seconds: 40 as number | null,
    sessionId: 's1',
    ...patch,
  }
  return { ...base, id: patch.id ?? attemptId(base) }
}

test('an id names the sitting, the surface and the item', () => {
  assert.equal(attemptId({ sessionId: 's1', surface: 'qbank', itemId: 'q1' }), 's1:qbank:q1')
})

/*
 * The whole reason a timed sitting can be committed at the end rather than
 * question by question: the id is derived, so the same answer offered twice is
 * the same record. Submitting, opening the paper to review, and submitting
 * again must leave the log exactly as one submission did.
 */
test('a second commit of the same answer is refused', () => {
  const once = addAttempt(emptyMonth('2026-08'), attempt())
  const twice = addAttempt(once, attempt())
  assert.equal(twice.records.length, 1)
  assert.equal(twice, once, 'the month is returned by identity, so nothing is rewritten')
})

test('the same question sat again in a later sitting is a new record', () => {
  const month = addAttempt(addAttempt(emptyMonth('2026-08'), attempt()), attempt({ sessionId: 's2' }))
  assert.deepEqual(month.records.map((record) => record.id), ['s1:qbank:q1', 's2:qbank:q1'])
})

test('the same item answered on two surfaces is two records', () => {
  const month = addAttempt(addAttempt(emptyMonth('2026-08'), attempt()), attempt({ surface: 'room' }))
  assert.equal(month.records.length, 2)
})

test('a whole timed sitting lands as one record per answered question', () => {
  const sitting = ['q1', 'q2', 'q3'].map((itemId) => attempt({ itemId, seconds: 30 }))
  const month = sitting.reduce(addAttempt, emptyMonth('2026-08'))
  assert.deepEqual(month.records.map((record) => record.id), ['s1:qbank:q1', 's1:qbank:q2', 's1:qbank:q3'])
})

test('an unmarked record counts as an attempt but not toward accuracy', () => {
  const index = indexAttempt(EMPTY_INDEX, attempt({ surface: 'station', correct: null }))
  assert.deepEqual(index.totals, { attempts: 1, marked: 0, correct: 0, lastAt: '2026-08-13T10:00:00.000Z' })
})

test('a wrong answer is marked but not correct', () => {
  const index = indexAttempt(EMPTY_INDEX, attempt({ correct: false }))
  assert.deepEqual(index.totals, { attempts: 1, marked: 1, correct: 0, lastAt: '2026-08-13T10:00:00.000Z' })
})

test('the index collects the months it has seen, oldest first', () => {
  const index = [
    attempt({ at: '2026-09-01T09:00:00.000Z', sessionId: 's2' }),
    attempt({ at: '2026-08-13T10:00:00.000Z' }),
  ].reduce(indexAttempt, EMPTY_INDEX)
  assert.deepEqual(index.months, ['2026-08', '2026-09'])
})

test('lastAt holds the latest answer, not the latest write', () => {
  const index = [
    attempt({ at: '2026-08-13T12:00:00.000Z', itemId: 'q2' }),
    attempt({ at: '2026-08-13T10:00:00.000Z', itemId: 'q1' }),
  ].reduce(indexAttempt, EMPTY_INDEX)
  assert.equal(index.totals.lastAt, '2026-08-13T12:00:00.000Z')
})

test('deleting a sitting takes its records and only its records', () => {
  const month = [attempt({ itemId: 'q1' }), attempt({ itemId: 'q2' }), attempt({ sessionId: 's2' })]
    .reduce(addAttempt, emptyMonth('2026-08'))
  const left = removeSession(month, 's1')
  assert.deepEqual(left.records.map((record) => record.sessionId), ['s2'])
})

test('a month holding nothing from that sitting is not rewritten', () => {
  const month = addAttempt(emptyMonth('2026-08'), attempt())
  assert.equal(removeSession(month, 's2'), month)
})

test('deleting a sitting takes it back out of the headline totals', () => {
  const records = [attempt({ itemId: 'q1' }), attempt({ itemId: 'q2', correct: false }), attempt({ itemId: 'q3', correct: null })]
  const index = records.reduce(indexAttempt, EMPTY_INDEX)
  const after = unindexAttempts(index, records)
  assert.deepEqual(
    { attempts: after.totals.attempts, marked: after.totals.marked, correct: after.totals.correct },
    { attempts: 0, marked: 0, correct: 0 },
  )
})

test('a timestamp is filed in its own month', () => {
  assert.equal(attemptMonth('2026-01-31T23:00:00.000Z'), attemptMonth(new Date('2026-01-31T23:00:00.000Z')))
  assert.equal(attemptMonth(new Date(2026, 0, 31)), '2026-01')
})

test('the recent window ends at the month asked for and runs backwards', () => {
  assert.deepEqual(recentMonths(3, new Date(2026, 1, 15)), ['2025-12', '2026-01', '2026-02'])
})

test('an untimed answer is filed without a duration', () => {
  assert.equal(attemptSeconds(false, 1_000, 61_000), null)
})

test('a timed answer is filed with whole seconds', () => {
  assert.equal(attemptSeconds(true, 1_000, 61_400), 60)
})

test('a clock corrected backwards mid-question does not file a negative', () => {
  assert.equal(attemptSeconds(true, 61_000, 1_000), 0)
})

test('an answer given the instant the question appears is zero, not null', () => {
  assert.equal(attemptSeconds(true, 5_000, 5_000), 0)
})
