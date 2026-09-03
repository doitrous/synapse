import test from 'node:test'
import assert from 'node:assert/strict'
import { dailyMultiplierPercent, syntheticValueAt } from './subscriberCount.js'

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
