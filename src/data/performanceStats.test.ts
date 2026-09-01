import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  averageSecondsPerQuestion, medianOf, percentileStanding, solvingSecondsTotal,
  studyTimeBreakdown, withinLastDays,
} from './performanceStats.ts'
import type { AttemptRecord } from './attempts.ts'

function attempt(patch: Partial<AttemptRecord> = {}): AttemptRecord {
  return {
    id: patch.id ?? `a${Math.random()}`,
    at: '2026-08-20T10:00:00.000Z',
    surface: 'qbank',
    itemId: 'q1',
    subjectId: 'cvs',
    topic: 'Heart failure',
    difficulty: 'Moderate',
    conceptIds: [],
    correct: true,
    seconds: 30,
    sessionId: 's1',
    ...patch,
  }
}

test('medianOf handles even, odd and empty distributions', () => {
  assert.equal(medianOf([]), null)
  assert.equal(medianOf([5]), 5)
  assert.equal(medianOf([1, 3, 5]), 3)
  assert.equal(medianOf([1, 2, 3, 4]), 2.5)
})

test('percentileStanding is null with no peer evidence', () => {
  assert.equal(percentileStanding(0.8, []), null)
})

test('percentileStanding places a value above every peer near the top', () => {
  const standing = percentileStanding(0.95, [0.5, 0.6, 0.7, 0.8])
  assert.equal(standing?.percentile, 100)
  assert.ok(Math.abs((standing?.peerMedian ?? 0) - 0.65) < 1e-9)
  assert.equal(standing?.peerCount, 4)
})

test('percentileStanding treats a tie as half a step, not a full one', () => {
  // Two peers below 0.7, one peer tied at 0.7, one peer above it.
  const standing = percentileStanding(0.7, [0.5, 0.6, 0.7, 0.9])
  assert.equal(standing?.percentile, Math.round(((2 + 0.5) / 4) * 100))
})

test('averageSecondsPerQuestion ignores untimed attempts and returns null with none timed', () => {
  assert.equal(averageSecondsPerQuestion([attempt({ seconds: null })]), null)
  const records = [attempt({ seconds: 20 }), attempt({ id: 'b', seconds: 40 }), attempt({ id: 'c', seconds: null })]
  assert.equal(averageSecondsPerQuestion(records), 30)
})

test('withinLastDays keeps only records inside the window', () => {
  const now = new Date('2026-08-27T12:00:00.000Z')
  const records = [
    attempt({ id: 'recent', at: '2026-08-26T12:00:00.000Z' }),
    attempt({ id: 'old', at: '2026-08-01T12:00:00.000Z' }),
  ]
  const kept = withinLastDays(records, 7, now)
  assert.deepEqual(kept.map((record) => record.id), ['recent'])
})

test('solvingSecondsTotal prefers the recorded sitting duration over summed timings', () => {
  const records = [
    attempt({ id: 'a', sessionId: 'sit1', seconds: 30, sessionDurationSeconds: 500 }),
    attempt({ id: 'b', sessionId: 'sit1', seconds: 40, sessionDurationSeconds: 500 }),
    attempt({ id: 'c', sessionId: 'sit2', seconds: 25, sessionDurationSeconds: undefined }),
  ]
  // sit1 reports its recorded 500s once, not the 70s sum; sit2 has no recorded
  // duration so falls back to its own summed timing.
  assert.equal(solvingSecondsTotal(records), 525)
})

test('studyTimeBreakdown is null for the heartbeat-derived figures without a total', () => {
  const records = [attempt({ seconds: 600 })]
  const breakdown = studyTimeBreakdown(records, 7, null)
  assert.equal(breakdown.studyingMinutesPerDay, null)
  assert.equal(breakdown.readingMinutesPerDay, null)
  assert.equal(breakdown.solvingMinutesPerDay, 10 / 7)
})

test('studyTimeBreakdown estimates reading as the remainder, floored at zero', () => {
  const records = [attempt({ seconds: 60 * 60 })] // 60 minutes solving, single sitting
  const breakdown = studyTimeBreakdown(records, 1, 90)
  assert.equal(breakdown.solvingMinutesPerDay, 60)
  assert.equal(breakdown.studyingMinutesPerDay, 90)
  assert.equal(breakdown.readingMinutesPerDay, 30)

  // Heartbeat total smaller than measured solving time never goes negative.
  const shortfall = studyTimeBreakdown(records, 1, 20)
  assert.equal(shortfall.readingMinutesPerDay, 0)
})
