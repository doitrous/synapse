import test from 'node:test'
import assert from 'node:assert/strict'
import {
  DEFAULT_STUDENT_ID_DISCOUNT, normaliseDiscountPercent, studentIdDiscountAmount,
} from './studentDiscount.ts'

test('the offer is off until an administrator turns it on', () => {
  assert.equal(DEFAULT_STUDENT_ID_DISCOUNT.enabled, false)
  assert.equal(DEFAULT_STUDENT_ID_DISCOUNT.percent, 5)
})

test('a percent is whole, and stays inside nothing and everything', () => {
  assert.equal(normaliseDiscountPercent(5), 5)
  assert.equal(normaliseDiscountPercent('7.9'), 7)
  assert.equal(normaliseDiscountPercent(-4), 0)
  assert.equal(normaliseDiscountPercent(140), 100)
  assert.equal(normaliseDiscountPercent('nonsense'), 0)
})

test('an accepted document takes its percent off the price', () => {
  assert.equal(studentIdDiscountAmount({ enabled: true, percent: 5 }, 200, true), 10)
  assert.equal(studentIdDiscountAmount({ enabled: true, percent: 100 }, 200, true), 200)
})

test('nothing comes off while the offer is switched off', () => {
  assert.equal(studentIdDiscountAmount({ enabled: false, percent: 5 }, 200, true), 0)
})

test('nothing comes off while the document is still being reviewed', () => {
  assert.equal(studentIdDiscountAmount({ enabled: true, percent: 5 }, 200, false), 0)
})

test('a free plan has nothing to discount', () => {
  assert.equal(studentIdDiscountAmount({ enabled: true, percent: 5 }, 0, true), 0)
})

test('a discount never exceeds the price', () => {
  assert.equal(studentIdDiscountAmount({ enabled: true, percent: 100 }, 50, true), 50)
})
