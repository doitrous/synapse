import { strict as assert } from 'node:assert'
import test from 'node:test'
import { formatNumber, formatPercent, perMonth, priceFor, savingPercent } from './pricing.ts'

const QBANK = { monthly: 99, quarterly: 249, yearly: 799 }
const ADAPTIVE = { monthly: 199, quarterly: 499, yearly: 1499 }

test('a price is shown at the period asked for', () => {
  assert.deepEqual(priceFor(QBANK, 'yearly'), { amount: 799, period: 'yearly' })
  assert.deepEqual(priceFor(QBANK, 'monthly'), { amount: 99, period: 'monthly' })
})

test('a plan sold only monthly still has a price when the page shows yearly', () => {
  assert.deepEqual(priceFor({ monthly: 79 }, 'yearly'), { amount: 79, period: 'monthly' })
})

test('a plan sold only for a fixed term keeps that term whatever is selected', () => {
  assert.deepEqual(priceFor({ quarterly: 249 }, 'monthly'), { amount: 249, period: 'quarterly' })
  assert.deepEqual(priceFor({ quarterly: 249 }, 'yearly'), { amount: 249, period: 'quarterly' })
})

test('a plan with no price at all reports none rather than zero', () => {
  assert.equal(priceFor({}, 'monthly'), null)
})

test('the per-month equivalent divides by the months billed', () => {
  assert.equal(perMonth(1499, 'yearly'), 1499 / 12)
  assert.equal(perMonth(99, 'monthly'), 99)
})

test('the saving is computed from the offer, not asserted', () => {
  // 799 against twelve months at 99 is 1188.
  assert.equal(savingPercent(QBANK, 'yearly'), 32)
  assert.equal(savingPercent(ADAPTIVE, 'yearly'), 37)
  assert.equal(savingPercent(QBANK, 'quarterly'), 16)
})

test('monthly has no saving to claim, and nor does a free plan', () => {
  assert.equal(savingPercent(QBANK, 'monthly'), null)
  assert.equal(savingPercent({ monthly: 0 }, 'yearly'), null)
})

test('a period that is not actually cheaper claims nothing', () => {
  assert.equal(savingPercent({ monthly: 100, yearly: 1200 }, 'yearly'), null)
  assert.equal(savingPercent({ monthly: 100, yearly: 1500 }, 'yearly'), null)
})

test('a saving is rounded down, so the page never overstates it', () => {
  // 1187 against 1188 is 0.084%, which is not "1% off".
  assert.equal(savingPercent({ monthly: 99, yearly: 1187 }, 'yearly'), 0)
})

test('English keeps Western digits and grouping', () => {
  assert.equal(formatNumber(1499, 'en'), '1,499')
  assert.equal(formatNumber(0, 'en'), '0')
})

test('Arabic gets Arabic-Indic digits and its own thousands mark', () => {
  assert.equal(formatNumber(1499, 'ar'), '١٬٤٩٩')
  assert.equal(formatNumber(99, 'ar'), '٩٩')
  assert.equal(formatNumber(0, 'ar'), '٠')
})

test('a fractional per-month price is rounded for display, not truncated to nothing', () => {
  assert.equal(formatNumber(perMonth(1499, 'yearly'), 'en'), '125')
})

test('a percentage is written the way each language writes one', () => {
  assert.equal(formatPercent(32, 'en'), '32%')
  assert.equal(formatPercent(32, 'ar'), '٪٣٢')
})
