import test from 'node:test'
import assert from 'node:assert/strict'
import { fillDays, readinessScore } from './studentAnalytics.js'

test('fillDays returns one point per day, zero-filling gaps', () => {
  const series = fillDays([], ['count'])
  assert.equal(series.length, 30)
  assert.equal(series[0].count, 0)
  assert.ok(series[0].day < series[29].day, 'days run oldest → newest')
})

test('fillDays places a known row on its own day and leaves the rest at zero', () => {
  const today = new Date(); today.setUTCHours(0, 0, 0, 0)
  const key = today.toISOString().slice(0, 10)
  const series = fillDays([{ day: key, count: 7 }], ['count'], 3)
  assert.equal(series.length, 3)
  assert.equal(series.at(-1).count, 7)
  assert.equal(series[0].count, 0)
})

test('readinessScore damps thin practice and equals accuracy only at full volume', () => {
  assert.equal(readinessScore(0.9, 5, 300), 0.9 * (5 / 300)) // 90% over five questions ≈ 1.5%, not ready
  assert.equal(readinessScore(0.82, 300, 300), 0.82) // full volume → raw accuracy
  assert.equal(readinessScore(0.82, 600, 300), 0.82) // capped: over-practice never inflates past accuracy
  assert.equal(readinessScore(0.9, 0, 300), 0) // no attempts → 0
  assert.equal(readinessScore(null, 100, 300), 0) // no accuracy → 0
})
