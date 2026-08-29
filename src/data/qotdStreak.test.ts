// src/data/qotdStreak.test.ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { computeStreak } from './qotdStreak.ts'

test('consecutive days ending today count as the current streak', () => {
  const r = computeStreak(['2026-08-27', '2026-08-28', '2026-08-29'], '2026-08-29')
  assert.equal(r.current, 3)
  assert.equal(r.longest, 3)
})

test('a run ending yesterday is still live today (today not yet answered)', () => {
  const r = computeStreak(['2026-08-27', '2026-08-28'], '2026-08-29')
  assert.equal(r.current, 2)
})

test('a gap before today breaks the current streak', () => {
  const r = computeStreak(['2026-08-25', '2026-08-26'], '2026-08-29')
  assert.equal(r.current, 0)
  assert.equal(r.longest, 2)
})

test('longest tracks the best run even when current is shorter', () => {
  const r = computeStreak(['2026-08-01', '2026-08-02', '2026-08-03', '2026-08-29'], '2026-08-29')
  assert.equal(r.current, 1)
  assert.equal(r.longest, 3)
})

test('duplicates and disorder are tolerated', () => {
  const r = computeStreak(['2026-08-29', '2026-08-28', '2026-08-29'], '2026-08-29')
  assert.equal(r.current, 2)
})

test('no answers yields zero', () => {
  assert.deepEqual(computeStreak([], '2026-08-29'), { current: 0, longest: 0 })
})
