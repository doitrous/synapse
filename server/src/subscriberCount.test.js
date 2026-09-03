import test from 'node:test'
import assert from 'node:assert/strict'
import { dailyMultiplierPercent, syntheticValueAt, computeSubscriberCount, publicSubscriberCountPayload, DEFAULT_SUBSCRIBER_DISPLAY, SUBSCRIBER_DISPLAY_STATE_KEY } from './subscriberCount.js'

test('the daily multiplier always lands within [minPct, maxPct]', () => {
  for (let day = 0; day < 2000; day++) {
    const m = dailyMultiplierPercent(day, 0.3, 2.5)
    assert.ok(m >= 0.3 && m <= 2.5, `day ${day} multiplier ${m} out of range`)
  }
})

test('the daily multiplier is deterministic for the same day and seed', () => {
  assert.equal(dailyMultiplierPercent(19000, 0.3, 2.5, 7), dailyMultiplierPercent(19000, 0.3, 2.5, 7))
})

test('the synthetic value is always a whole number', () => {
  const doc = { base: 790, epoch: Date.UTC(2026, 0, 1), minPct: 0.3, maxPct: 2.5 }
  for (let days = 0; days < 30; days++) {
    const at = doc.epoch + days * 86_400_000 + 12 * 3_600_000
    assert.ok(Number.isInteger(syntheticValueAt(at, doc)), `day ${days} not an integer`)
  }
})

test('the synthetic value never drops as time moves forward within a day', () => {
  const doc = { base: 790, epoch: Date.UTC(2026, 0, 1), minPct: 0.3, maxPct: 2.5 }
  const dayStart = doc.epoch + 3 * 86_400_000
  let previous = syntheticValueAt(dayStart, doc)
  for (let hour = 1; hour <= 24; hour++) {
    const value = syntheticValueAt(dayStart + hour * 3_600_000, doc)
    assert.ok(value >= previous, `hour ${hour}: ${value} < ${previous}`)
    previous = value
  }
})

test('the synthetic value does not jump at a day boundary', () => {
  const doc = { base: 790, epoch: Date.UTC(2026, 0, 1), minPct: 0.3, maxPct: 2.5 }
  const boundary = doc.epoch + 5 * 86_400_000
  const justBefore = syntheticValueAt(boundary - 1000, doc)
  const justAfter = syntheticValueAt(boundary + 1000, doc)
  assert.ok(justAfter >= justBefore, `${justAfter} < ${justBefore}`)
  assert.ok(justAfter - justBefore <= 1, `jumped by ${justAfter - justBefore}`)
})

test('the synthetic value keeps growing, never shrinking, across many days', () => {
  const doc = { base: 790, epoch: Date.UTC(2026, 0, 1), minPct: 0.3, maxPct: 2.5 }
  let previous = doc.base
  for (let days = 1; days <= 60; days++) {
    const value = syntheticValueAt(doc.epoch + days * 86_400_000, doc)
    assert.ok(value >= previous, `day ${days}: ${value} < ${previous}`)
    previous = value
  }
})

test('a real-subscriber delta on top of epoch is added to the displayed total', () => {
  const doc = { base: 790, epoch: Date.UTC(2026, 0, 1), realCountAtEpoch: 100, minPct: 0.3, maxPct: 2.5 }
  const now = doc.epoch
  const noGrowth = computeSubscriberCount(doc, { realCountNow: 100, now })
  const withGrowth = computeSubscriberCount(doc, { realCountNow: 130, now })
  assert.equal(withGrowth.value - noGrowth.value, 30)
})

test('a lapsed real subscriber (count below epoch) never lowers the displayed total', () => {
  const doc = { base: 790, epoch: Date.UTC(2026, 0, 1), realCountAtEpoch: 100, minPct: 0.3, maxPct: 2.5 }
  const now = doc.epoch
  const atEpoch = computeSubscriberCount(doc, { realCountNow: 100, now })
  const belowEpoch = computeSubscriberCount(doc, { realCountNow: 60, now })
  assert.equal(belowEpoch.value, atEpoch.value)
})

test('computeSubscriberCount always returns a whole number and a non-negative rate', () => {
  const doc = { base: 790, epoch: Date.UTC(2026, 0, 1), realCountAtEpoch: 100, minPct: 0.3, maxPct: 2.5 }
  const { value, ratePerSecond } = computeSubscriberCount(doc, { realCountNow: 115, now: doc.epoch + 10 * 86_400_000 })
  assert.ok(Number.isInteger(value))
  assert.ok(ratePerSecond >= 0)
})

test('a disabled document reports disabled with no value', () => {
  const doc = { ...DEFAULT_SUBSCRIBER_DISPLAY, enabled: false }
  assert.deepEqual(publicSubscriberCountPayload(doc, { realCountNow: 500, now: Date.now() }), { enabled: false })
})

test('an enabled document reports enabled, a value, and a rate', () => {
  const doc = { enabled: true, base: 790, epoch: Date.UTC(2026, 0, 1), realCountAtEpoch: 100, minPct: 0.3, maxPct: 2.5 }
  const payload = publicSubscriberCountPayload(doc, { realCountNow: 100, now: doc.epoch })
  assert.equal(payload.enabled, true)
  assert.ok(Number.isInteger(payload.value))
  assert.equal(typeof payload.ratePerSecond, 'number')
})

test('the state key and default document match the spec defaults', () => {
  assert.equal(SUBSCRIBER_DISPLAY_STATE_KEY, 'nishany-subscriber-display-v1')
  assert.equal(DEFAULT_SUBSCRIBER_DISPLAY.enabled, false)
  assert.equal(DEFAULT_SUBSCRIBER_DISPLAY.base, 790)
  assert.equal(DEFAULT_SUBSCRIBER_DISPLAY.minPct, 0.3)
  assert.equal(DEFAULT_SUBSCRIBER_DISPLAY.maxPct, 2.5)
})
