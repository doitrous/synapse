import test from 'node:test'
import assert from 'node:assert/strict'
import { offerAmounts, SEED_MARISTANA_PRICES } from './pricingContent.ts'
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
