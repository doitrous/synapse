import test from 'node:test'
import assert from 'node:assert/strict'
import { dailyMultiplierPercent, syntheticValueAt, computeSubscriberCount, publicSubscriberCountPayload, nextSubscriberDisplayDoc, DEFAULT_SUBSCRIBER_DISPLAY, SUBSCRIBER_DISPLAY_STATE_KEY } from './subscriberCount.js'
import { requireSuperAdmin } from './auth.js'

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

test('changing base re-captures epoch and the real count at that moment', () => {
  const current = { enabled: true, base: 790, epoch: 1000, realCountAtEpoch: 50, minPct: 0.3, maxPct: 2.5 }
  const patch = { enabled: true, base: 900, minPct: 0.3, maxPct: 2.5 }
  const result = nextSubscriberDisplayDoc(current, patch, { realCountNow: 77, now: 5000 })
  assert.equal(result.ok, true)
  assert.equal(result.doc.epoch, 5000)
  assert.equal(result.doc.realCountAtEpoch, 77)
  assert.equal(result.doc.base, 900)
})

test('leaving base unchanged keeps the existing epoch and real count', () => {
  const current = { enabled: true, base: 790, epoch: 1000, realCountAtEpoch: 50, minPct: 0.3, maxPct: 2.5 }
  const patch = { enabled: false, base: 790, minPct: 0.5, maxPct: 2 }
  const result = nextSubscriberDisplayDoc(current, patch, { realCountNow: 77, now: 5000 })
  assert.equal(result.ok, true)
  assert.equal(result.doc.epoch, 1000)
  assert.equal(result.doc.realCountAtEpoch, 50)
  assert.equal(result.doc.enabled, false)
  assert.equal(result.doc.minPct, 0.5)
})

test('the very first save captures an epoch even when base matches the default', () => {
  const current = { ...DEFAULT_SUBSCRIBER_DISPLAY } // epoch: 0 → "never configured"
  const result = nextSubscriberDisplayDoc(current, { enabled: true, base: 790, minPct: 0.3, maxPct: 2.5 }, { realCountNow: 12, now: 9000 })
  assert.equal(result.ok, true)
  assert.equal(result.doc.epoch, 9000)
  assert.equal(result.doc.realCountAtEpoch, 12)
})

test('a negative base is refused', () => {
  const current = { ...DEFAULT_SUBSCRIBER_DISPLAY, epoch: 1000 }
  const result = nextSubscriberDisplayDoc(current, { enabled: true, base: -5, minPct: 0.3, maxPct: 2.5 }, { realCountNow: 0, now: 1000 })
  assert.equal(result.ok, false)
})

test('minPct greater than maxPct is refused', () => {
  const current = { ...DEFAULT_SUBSCRIBER_DISPLAY, epoch: 1000 }
  const result = nextSubscriberDisplayDoc(current, { enabled: true, base: 790, minPct: 3, maxPct: 1 }, { realCountNow: 0, now: 1000 })
  assert.equal(result.ok, false)
})

test('a non-boolean enabled is refused', () => {
  const current = { ...DEFAULT_SUBSCRIBER_DISPLAY, epoch: 1000 }
  const result = nextSubscriberDisplayDoc(current, { enabled: 'yes', base: 790, minPct: 0.3, maxPct: 2.5 }, { realCountNow: 0, now: 1000 })
  assert.equal(result.ok, false)
  const result2 = nextSubscriberDisplayDoc(current, { enabled: 1, base: 790, minPct: 0.3, maxPct: 2.5 }, { realCountNow: 0, now: 1000 })
  assert.equal(result2.ok, false)
})

test('a patch omitting enabled preserves the current enabled value', () => {
  const current = { enabled: true, base: 790, epoch: 1000, realCountAtEpoch: 50, minPct: 0.3, maxPct: 2.5 }
  const result = nextSubscriberDisplayDoc(current, { base: 900, minPct: 0.3, maxPct: 2.5 }, { realCountNow: 77, now: 5000 })
  assert.equal(result.ok, true)
  assert.equal(result.doc.enabled, true)
})

test('a present boolean enabled:false is applied', () => {
  const current = { enabled: true, base: 790, epoch: 1000, realCountAtEpoch: 50, minPct: 0.3, maxPct: 2.5 }
  const result = nextSubscriberDisplayDoc(current, { enabled: false, base: 790, minPct: 0.3, maxPct: 2.5 }, { realCountNow: 50, now: 1000 })
  assert.equal(result.ok, true)
  assert.equal(result.doc.enabled, false)
})

test('requireSuperAdmin refuses anyone who is not a super admin', () => {
  let statusCode = null
  let body = null
  const res = { status(code) { statusCode = code; return this }, json(payload) { body = payload; return this } }
  let nextCalled = false
  requireSuperAdmin({ identity: { role: 'admin', aal: 'aal2' } }, res, () => { nextCalled = true })
  assert.equal(nextCalled, false)
  assert.equal(statusCode, 403)
  assert.deepEqual(body, { error: 'super admin required' })
})

test('requireSuperAdmin admits a super admin who has satisfied MFA', () => {
  let nextCalled = false
  const res = { status() { return this }, json() { return this } }
  requireSuperAdmin({ identity: { role: 'super_admin', aal: 'aal2', mfaRequired: true } }, res, () => { nextCalled = true })
  assert.equal(nextCalled, true)
})
