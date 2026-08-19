import { strict as assert } from 'node:assert'
import test from 'node:test'
import { formatNumber, formatPercent } from './pricing.ts'

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
  assert.equal(formatNumber(1499 / 12, 'en'), '125')
})

test('a percentage is written the way each language writes one', () => {
  assert.equal(formatPercent(32, 'en'), '32%')
  assert.equal(formatPercent(32, 'ar'), '٪٣٢')
})
