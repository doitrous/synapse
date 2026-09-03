import test from 'node:test'
import assert from 'node:assert/strict'
import { pool } from './db.js'
import { CATALOG_STATE_KEY, VOUCHERS_STATE_KEY, catalogPricing, discountAmount, pricingQuote, promoPrice, quoteAllAccess } from './pricing.js'

const NOW = new Date('2026-08-24T10:00:00Z')

/** Routes app_state reads to canned rows by key, mirroring answerDistribution.test.js's routedQuery. */
async function withAppState({ catalog = null, vouchers = null }, run) {
  const original = pool.query
  pool.query = async (sql, params) => {
    if (sql.includes('FROM app_state')) {
      const key = params?.[0]
      if (key === CATALOG_STATE_KEY) return [[{ v: JSON.stringify(catalog) }]]
      if (key === VOUCHERS_STATE_KEY) return [[{ v: JSON.stringify(vouchers ?? []) }]]
      return [[]]
    }
    throw new Error(`unexpected query: ${sql}`)
  }
  try {
    await run()
  } finally {
    pool.query = original
  }
}

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

test('promoPrice rounds a percent-off promo to the nearest whole EGP', () => {
  assert.equal(promoPrice(400, { enabled: true, percentOff: 25 }), 300)
  assert.equal(promoPrice(1000, { enabled: true, percentOff: 30 }), 700)
  assert.equal(promoPrice(400, { enabled: false, percentOff: 25 }), 400)
  assert.equal(promoPrice(400, undefined), 400)
})

test('catalogPricing reads the maristana plan the admin console edits, promo included', async () => {
  const catalogDoc = {
    plans: [{
      id: 'maristana',
      prices: { month: 450, term: 1100 },
      promo: { month: { enabled: true, percentOff: 10 }, term: { enabled: false, percentOff: 0 } },
    }],
  }
  await withAppState({ catalog: catalogDoc }, async () => {
    const result = await catalogPricing()
    assert.deepEqual(result.prices, { month: 450, term: 1100 })
    assert.equal(result.promo.month.percentOff, 10)
  })
})

test('catalogPricing falls back to the launch seed when the document is missing', async () => {
  await withAppState({ catalog: null }, async () => {
    const result = await catalogPricing()
    assert.deepEqual(result.prices, { month: 400, term: 1000 })
  })
})

test('the quote matches the catalog price and applies its promo, with no voucher', async () => {
  const catalogDoc = {
    plans: [{
      id: 'maristana',
      prices: { month: 400, term: 1000 },
      promo: { month: { enabled: true, percentOff: 25 }, term: { enabled: true, percentOff: 30 } },
    }],
  }
  await withAppState({ catalog: catalogDoc, vouchers: [] }, async () => {
    const monthly = await pricingQuote({ period: 'month' })
    assert.equal(monthly.baseAmount, 400)
    assert.equal(monthly.totalAmount, 300)
    assert.equal(monthly.appliedDiscount.kind, 'promo')

    const term = await pricingQuote({ period: 'term' })
    assert.equal(term.totalAmount, 700)
  })
})

test('an invalid period is refused', async () => {
  const result = await pricingQuote({ period: 'annual' })
  assert.equal(result.error, 'invalid_period')
})

test('the fallback quote is the plain base price, no promo, when the catalog doc is missing', async () => {
  await withAppState({ catalog: null }, async () => {
    const monthly = await pricingQuote({ period: 'month' })
    assert.equal(monthly.totalAmount, 400)
    assert.equal(monthly.appliedDiscount, null)

    const term = await pricingQuote({ period: 'term' })
    assert.equal(term.totalAmount, 1000)
    assert.equal(term.appliedDiscount, null)
  })
})

test('"monthly" is accepted as a synonym for "month" (legacy caller compatibility)', async () => {
  const catalogDoc = {
    plans: [{
      id: 'maristana',
      prices: { month: 400, term: 1000 },
      promo: { month: { enabled: true, percentOff: 25 }, term: { enabled: true, percentOff: 30 } },
    }],
  }
  await withAppState({ catalog: catalogDoc }, async () => {
    const legacy = await pricingQuote({ period: 'monthly' })
    const current = await pricingQuote({ period: 'month' })
    assert.deepEqual(legacy, current)
    assert.equal(legacy.period, 'month')
  })
})

test('catalogPricing falls back without throwing when the stored doc is unparseable JSON', async () => {
  const original = pool.query
  pool.query = async (sql, params) => {
    if (sql.includes('FROM app_state') && params?.[0] === CATALOG_STATE_KEY) return [[{ v: '{not json' }]]
    throw new Error(`unexpected query: ${sql}`)
  }
  try {
    const result = await catalogPricing()
    assert.deepEqual(result.prices, { month: 400, term: 1000 })
    assert.equal(result.promo.month.enabled, false)
  } finally {
    pool.query = original
  }
})
