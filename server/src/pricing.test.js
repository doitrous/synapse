import test from 'node:test'
import assert from 'node:assert/strict'
import { discountAmount, quoteAllAccess } from './pricing.js'

const NOW = new Date('2026-08-24T10:00:00Z')

test('one all-access monthly and term price are quoted in EGP', () => {
  assert.deepEqual(quoteAllAccess({ period: 'monthly', now: NOW }), {
    period: 'monthly',
    currency: 'EGP',
    baseAmount: 400,
    totalAmount: 400,
    appliedDiscount: null,
    alternatives: [],
  })
  assert.equal(quoteAllAccess({ period: 'term', now: NOW }).baseAmount, 1000)
})

test('promotions and vouchers never stack and the cheapest single option wins', () => {
  const quote = quoteAllAccess({
    period: 'term',
    voucherCode: 'TERM250',
    now: NOW,
    promotions: [
      { id: 'promo-10', label: '10%', period: 'both', discountType: 'percent', discountValue: 10, startsAt: '2026-08-01', endsAt: '2026-09-01', active: true },
    ],
    vouchers: [
      { id: 'voucher-250', code: 'TERM250', label: '250 off', period: 'term', discountType: 'fixed', discountValue: 250, startsAt: '2026-08-01', endsAt: '2026-09-01', active: true },
    ],
  })
  assert.equal(quote.totalAmount, 750)
  assert.equal(quote.appliedDiscount.kind, 'voucher')
  assert.equal(quote.appliedDiscount.amountOff, 250)
  assert.equal(quote.alternatives.length, 2)
})

test('expired and wrong-period discounts are ignored', () => {
  const quote = quoteAllAccess({
    period: 'monthly',
    voucherCode: 'TERM',
    now: NOW,
    promotions: [
      { id: 'old', label: 'Old', period: 'both', discountType: 'fixed', discountValue: 300, startsAt: '2026-01-01', endsAt: '2026-02-01', active: true },
    ],
    vouchers: [
      { id: 'term', code: 'TERM', label: 'Term only', period: 'term', discountType: 'fixed', discountValue: 300, startsAt: '2026-08-01', endsAt: '2026-09-01', active: true },
    ],
  })
  assert.equal(quote.totalAmount, 400)
  assert.equal(quote.appliedDiscount, null)
})

test('fixed and percentage discounts are clamped to the base price', () => {
  assert.equal(discountAmount(400, { discountType: 'percent', discountValue: 150 }), 400)
  assert.equal(discountAmount(400, { discountType: 'fixed', discountValue: 999 }), 400)
})
