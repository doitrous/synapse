import test from 'node:test'
import assert from 'node:assert/strict'
import { offerAmounts, resolvePriced, SEED_MARISTANA_PRICES, EN_PRICING } from './pricingContent.ts'
import { initialPlanCatalog } from '../../data/planCatalogSeed.ts'
import type { PlanCatalog } from '@/data/planCatalog.ts'

test('offerAmounts reads the promo-adjusted maristana price from the catalog', () => {
  const amounts = offerAmounts(initialPlanCatalog())
  assert.equal(amounts.month, 300) // 25% off 400
  assert.equal(amounts.term, 700) // 30% off 1000
  assert.equal(amounts.termMonthly, Math.round(700 / 3))
  assert.equal(amounts.savings, 300 * 3 - 700)
})

test('offerAmounts falls back to the seed constant when maristana is missing', () => {
  const empty: PlanCatalog = { schemaVersion: 2, periods: [], plans: [] }
  assert.deepEqual(
    { month: offerAmounts(empty).month, term: offerAmounts(empty).term },
    SEED_MARISTANA_PRICES,
  )
})

test('the EN pricing copy states the promo-adjusted price, not the hardcoded launch price', () => {
  const amounts = offerAmounts(initialPlanCatalog())
  const description = resolvePriced(EN_PRICING.metaDescription, amounts)
  assert.match(description, /EGP 300 monthly/)
  assert.match(description, /EGP 700 per academic term/)

  const assurances = resolvePriced(EN_PRICING.assurances, amounts)
  assert.deepEqual(assurances, ['EGP 300 monthly', 'EGP 700 per term', 'Trial access is not a purchasable tier'])

  const costFaq = EN_PRICING.faq.find((item) => item.q === 'How much does it cost?')!
  assert.match(resolvePriced(costFaq.a, amounts), /EGP 300\. One academic term costs EGP 700/)
})
