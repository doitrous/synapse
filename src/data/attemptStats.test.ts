import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  accuracyOf, bySession, bySubject, byDifficulty, currentStreak, dailyCounts, distinctItems,
  firstAttemptSplit, hourHistogram, localDay, longestStreak, marked, medianSeconds,
  sessionDetail, weakest,
} from './attemptStats.ts'
import type { AttemptRecord } from './attempts.ts'

/** A record with everything defaulted, so each test states only what it means. */
function attempt(patch: Partial<AttemptRecord> = {}): AttemptRecord {
  return {
    id: patch.id ?? `a${Math.random()}`,
    at: '2026-08-13T10:00:00.000Z',
    surface: 'qbank',
    itemId: 'q1',
    subjectId: 'cvs',
    topic: 'Heart failure',
    difficulty: 'Moderate',
    conceptIds: [],
    correct: true,
    seconds: 60,
    sessionId: 's1',
    ...patch,
  }
}

/** A local-midnight ISO string `days` before the given day. */
function daysAgo(days: number, from = new Date(2026, 7, 13, 10, 0)): string {
  return new Date(from.getFullYear(), from.getMonth(), from.getDate() - days, 10, 0).toISOString()
}

test('an unmarked attempt is never counted in an accuracy', () => {
  const records = [
    attempt({ correct: true }),
    attempt({ correct: false }),
    // A station ticked by the student: practice, not a marked answer.
    attempt({ surface: 'station', correct: null }),
    attempt({ surface: 'station', correct: null }),
  ]
  assert.equal(marked(records).length, 2)
  assert.equal(accuracyOf(records), 0.5)
})

test('accuracy is null rather than zero when nothing has been marked', () => {
  // Zero would read as "you got everything wrong", which is a different claim.
  assert.equal(accuracyOf([attempt({ correct: null })]), null)
  assert.equal(accuracyOf([]), null)
})

test('a subject breakdown counts attempts and marks separately', () => {
  const rows = bySubject([
    attempt({ subjectId: 'cvs', correct: true }),
    attempt({ subjectId: 'cvs', correct: false }),
    attempt({ subjectId: 'cvs', surface: 'station', correct: null }),
    attempt({ subjectId: 'renal', correct: true }),
  ])
  const cvs = rows.find((row) => row.key === 'cvs')!
  assert.equal(cvs.attempts, 3)
  assert.equal(cvs.marked, 2)
  assert.equal(cvs.correct, 1)
  assert.equal(cvs.accuracy, 0.5)
  assert.equal(rows.find((row) => row.key === 'renal')!.accuracy, 1)
})

test('difficulty bands are reported separately', () => {
  const rows = byDifficulty([
    attempt({ difficulty: 'Easy', correct: true }),
    attempt({ difficulty: 'Hard', correct: false }),
    attempt({ difficulty: 'Hard', correct: false }),
  ])
  assert.equal(rows.find((row) => row.key === 'Easy')!.accuracy, 1)
  assert.equal(rows.find((row) => row.key === 'Hard')!.accuracy, 0)
})

test('a single wrong answer is not reported as a weakness', () => {
  const rows = bySubject([
    attempt({ subjectId: 'endo', correct: false }),
    attempt({ subjectId: 'renal', correct: false }),
    attempt({ subjectId: 'renal', correct: false }),
    attempt({ subjectId: 'renal', correct: true }),
  ])
  const weak = weakest(rows, 3)
  assert.deepEqual(weak.map((row) => row.key), ['renal'])
})

test('weaknesses are ordered worst first, ties broken by evidence', () => {
  const rows = bySubject([
    ...Array.from({ length: 4 }, () => attempt({ subjectId: 'a', correct: false })),
    ...Array.from({ length: 8 }, () => attempt({ subjectId: 'b', correct: false })),
    ...Array.from({ length: 4 }, () => attempt({ subjectId: 'c', correct: true })),
  ])
  assert.deepEqual(weakest(rows, 3).map((row) => row.key), ['b', 'a', 'c'])
})

test('daily counts include the days with no activity', () => {
  const days = dailyCounts([attempt({ at: daysAgo(0) })], 7, new Date(2026, 7, 13))
  assert.equal(days.length, 7)
  assert.equal(days.at(-1)!.attempts, 1)
  assert.equal(days.filter((day) => day.attempts === 0).length, 6)
})

test('a day is the student\'s own calendar day, not a UTC one', () => {
  // 23:30 local on the 13th is the 14th in UTC; grouping by UTC would move a
  // late-night session onto the next day and break the streak it belongs to.
  const lateNight = new Date(2026, 7, 13, 23, 30)
  assert.equal(localDay(lateNight.toISOString()), '2026-08-13')
})

test('a streak survives a today that has not been studied yet', () => {
  const today = new Date(2026, 7, 13, 9, 0)
  const records = [1, 2, 3].map((back) => attempt({ at: daysAgo(back, today) }))
  assert.equal(currentStreak(records, today), 3)
})

test('a streak ends when the day before yesterday is the last one', () => {
  const today = new Date(2026, 7, 13, 9, 0)
  assert.equal(currentStreak([attempt({ at: daysAgo(2, today) })], today), 0)
})

test('a streak counts today plus the run behind it', () => {
  const today = new Date(2026, 7, 13, 9, 0)
  const records = [0, 1, 2, 4].map((back) => attempt({ at: daysAgo(back, today) }))
  assert.equal(currentStreak(records, today), 3)
})

test('no activity is a streak of zero', () => {
  assert.equal(currentStreak([], new Date(2026, 7, 13)), 0)
})

test('the longest streak is the best run anywhere in the record', () => {
  const today = new Date(2026, 7, 13, 9, 0)
  const records = [0, 5, 6, 7, 8, 12].map((back) => attempt({ at: daysAgo(back, today) }))
  assert.equal(longestStreak(records), 4)
})

test('the median ignores untimed attempts', () => {
  const records = [
    attempt({ seconds: 30 }), attempt({ seconds: 60 }), attempt({ seconds: 90 }),
    attempt({ seconds: null }),
  ]
  assert.equal(medianSeconds(records), 60)
  assert.equal(medianSeconds([attempt({ seconds: null })]), null)
})

test('an even number of timed attempts averages the middle pair', () => {
  assert.equal(medianSeconds([attempt({ seconds: 40 }), attempt({ seconds: 70 })]), 55)
})

test('the hour histogram has a slot for every hour', () => {
  const hours = hourHistogram([attempt({ at: new Date(2026, 7, 13, 21, 15).toISOString() })])
  assert.equal(hours.length, 24)
  assert.equal(hours[21], 1)
  assert.equal(hours.reduce((sum, count) => sum + count, 0), 1)
})

test('seeing an item again is a repeat, not a first attempt', () => {
  const split = firstAttemptSplit([
    attempt({ itemId: 'q1', at: '2026-08-01T10:00:00.000Z', correct: false }),
    attempt({ itemId: 'q1', at: '2026-08-09T10:00:00.000Z', correct: true }),
    attempt({ itemId: 'q2', at: '2026-08-05T10:00:00.000Z', correct: true }),
  ])
  assert.equal(split.first.attempts, 2)
  assert.equal(split.first.accuracy, 0.5)
  assert.equal(split.repeat.attempts, 1)
  assert.equal(split.repeat.accuracy, 1)
})

test('the first attempt is the earliest one, whatever order they arrive in', () => {
  const split = firstAttemptSplit([
    attempt({ itemId: 'q1', at: '2026-08-09T10:00:00.000Z', correct: true }),
    attempt({ itemId: 'q1', at: '2026-08-01T10:00:00.000Z', correct: false }),
  ])
  assert.equal(split.first.accuracy, 0)
  assert.equal(split.repeat.accuracy, 1)
})

test('the same item id on two surfaces is two different items', () => {
  const records = [attempt({ itemId: 'x', surface: 'qbank' }), attempt({ itemId: 'x', surface: 'lab' })]
  assert.equal(distinctItems(records), 2)
  assert.equal(firstAttemptSplit(records).repeat.attempts, 0)
})

test('coverage counts items, not answers', () => {
  const records = [
    attempt({ itemId: 'q1' }), attempt({ itemId: 'q1' }), attempt({ itemId: 'q2' }),
  ]
  assert.equal(records.length, 3)
  assert.equal(distinctItems(records), 2)
})

test('records group into the sittings that produced them, newest first', () => {
  const sessions = bySession([
    attempt({ id: '1', sessionId: 's1', at: '2026-08-01T10:00:00.000Z' }),
    attempt({ id: '2', sessionId: 's1', at: '2026-08-01T10:05:00.000Z', correct: false }),
    attempt({ id: '3', sessionId: 's2', at: '2026-08-02T09:00:00.000Z' }),
  ])
  assert.deepEqual(sessions.map((s) => s.sessionId), ['s2', 's1'])
  const [, first] = sessions
  assert.equal(first.answered, 2)
  assert.equal(first.correct, 1)
  assert.equal(first.accuracy, 0.5)
  assert.equal(first.startedAt, '2026-08-01T10:00:00.000Z')
  assert.equal(first.endedAt, '2026-08-01T10:05:00.000Z')
})

test('an unmarked sitting reports no accuracy rather than zero', () => {
  // A practical station is ticked against a checklist; it is practice, not a score.
  const [session] = bySession([
    attempt({ id: '1', surface: 'practical', correct: null }),
    attempt({ id: '2', surface: 'practical', correct: null }),
  ])
  assert.equal(session.answered, 2)
  assert.equal(session.marked, 0)
  assert.equal(session.accuracy, null)
})

test('subjects are listed most-answered first', () => {
  const [session] = bySession([
    attempt({ id: '1', subjectId: 'resp' }),
    attempt({ id: '2', subjectId: 'cvs' }),
    attempt({ id: '3', subjectId: 'cvs' }),
  ])
  assert.deepEqual(session.subjectIds, ['cvs', 'resp'])
})

test('a record with no sessionId is not a sitting', () => {
  assert.deepEqual(bySession([attempt({ sessionId: '' })]), [])
})

test('a sitting reports what was right, what was wrong, and what nobody marked', () => {
  const detail = sessionDetail([
    attempt({ sessionId: 's1', itemId: 'q1', correct: true }),
    attempt({ sessionId: 's1', itemId: 'q2', correct: false }),
    attempt({ sessionId: 's1', itemId: 'q3', correct: false }),
    // A station is ticked by the student against a checklist. Counting it as
    // right would inflate the accuracy; as wrong, deflate it.
    attempt({ sessionId: 's1', itemId: 'st1', surface: 'station', correct: null }),
    attempt({ sessionId: 's2', itemId: 'q9', correct: true }),
  ], 's1')

  assert.equal(detail.answered, 4)
  assert.equal(detail.marked, 3)
  assert.equal(detail.correct, 1)
  assert.equal(detail.wrong, 2)
  assert.equal(detail.unmarked, 1)
  assert.equal(detail.accuracy, 1 / 3)
})

test('a sitting with nothing marked has no accuracy rather than nought', () => {
  const detail = sessionDetail([
    attempt({ sessionId: 's1', itemId: 'st1', surface: 'station', correct: null }),
  ], 's1')
  assert.equal(detail.accuracy, null)
  assert.equal(detail.weakestTopic, null)
})

test('a sitting counts only its own records', () => {
  const detail = sessionDetail([
    attempt({ sessionId: 'other', correct: false, seconds: 999 }),
    attempt({ sessionId: 's1', correct: true, seconds: 30 }),
  ], 's1')
  assert.equal(detail.answered, 1)
  assert.equal(detail.seconds, 30)
  assert.equal(detail.medianSeconds, 30)
})

test('topics that lost marks are listed, worst first', () => {
  const detail = sessionDetail([
    attempt({ sessionId: 's1', itemId: 'q1', topic: 'Valves', correct: false }),
    attempt({ sessionId: 's1', itemId: 'q2', topic: 'Conduction', correct: false }),
    attempt({ sessionId: 's1', itemId: 'q3', topic: 'Conduction', correct: false }),
    attempt({ sessionId: 's1', itemId: 'q4', topic: 'Cardiac output', correct: true }),
  ], 's1')
  assert.deepEqual(detail.missed.map((topic) => topic.key), ['Conduction', 'Valves'])
  // A topic answered correctly is not a place marks were lost.
  assert.equal(detail.missed.some((topic) => topic.key === 'Cardiac output'), false)
})

test('one wrong answer is a wrong answer, not a weak topic', () => {
  const detail = sessionDetail([
    attempt({ sessionId: 's1', itemId: 'q1', topic: 'Valves', correct: false }),
    attempt({ sessionId: 's1', itemId: 'q2', topic: 'Conduction', correct: true }),
  ], 's1')
  assert.equal(detail.weakestTopic, null)
  // It is still reported as a mark lost, which is the honest reading of it.
  assert.deepEqual(detail.missed.map((topic) => topic.key), ['Valves'])
})

test('a topic missed twice in one sitting is called weak', () => {
  const detail = sessionDetail([
    attempt({ sessionId: 's1', itemId: 'q1', topic: 'Conduction', correct: false }),
    attempt({ sessionId: 's1', itemId: 'q2', topic: 'Conduction', correct: false }),
    attempt({ sessionId: 's1', itemId: 'q3', topic: 'Valves', correct: true }),
    attempt({ sessionId: 's1', itemId: 'q4', topic: 'Valves', correct: true }),
  ], 's1')
  assert.equal(detail.weakestTopic?.key, 'Conduction')
  assert.equal(detail.weakestTopic?.accuracy, 0)
})
