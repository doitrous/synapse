import test from 'node:test'
import assert from 'node:assert/strict'
import { dailyMultiplierPercent } from './subscriberCount.js'

test('the daily multiplier always lands within [minPct, maxPct]', () => {
  for (let day = 0; day < 2000; day++) {
    const m = dailyMultiplierPercent(day, 0.3, 2.5)
    assert.ok(m >= 0.3 && m <= 2.5, `day ${day} multiplier ${m} out of range`)
  }
})

test('the daily multiplier is deterministic for the same day and seed', () => {
  assert.equal(dailyMultiplierPercent(19000, 0.3, 2.5, 7), dailyMultiplierPercent(19000, 0.3, 2.5, 7))
})
