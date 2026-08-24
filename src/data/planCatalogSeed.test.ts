import test from 'node:test'
import assert from 'node:assert/strict'
import { carryOverLegacyPlans, featuresForColumn, initialPlanCatalog, resolvePlanCatalog } from './planCatalogSeed.ts'
import { compareGroups, isPurchasable, periodById, plansFor, priceAt, say } from './planCatalog.ts'

test('the periods are one month and one term, in that order', () => {
  const catalog = initialPlanCatalog()
  assert.deepEqual(catalog.periods.map((period) => period.id), ['month', 'term'])
  assert.deepEqual(catalog.periods.map((period) => period.months), [1, 3])
})

test('the all-access plan is sold monthly and by term', () => {
  const catalog = initialPlanCatalog()
  const allAccess = catalog.plans.find((plan) => plan.id === 'all_access')!
  assert.equal(priceAt(allAccess, 'month', catalog.periods)?.amount, 400)
  assert.equal(priceAt(allAccess, 'term', catalog.periods)?.amount, 1000)
  assert.equal(isPurchasable(allAccess, periodById(catalog, 'month')!), true)
  assert.equal(isPurchasable(allAccess, periodById(catalog, 'term')!), true)
})

test('every plan carries both languages', () => {
  initialPlanCatalog().plans.forEach((plan) => {
    assert.ok(plan.name.en.trim(), `${plan.id} has no English name`)
    assert.ok(plan.name.ar.trim(), `${plan.id} has no Arabic name`)
    assert.ok(plan.entitlement.en.trim(), `${plan.id} has no English entitlement`)
    assert.ok(plan.entitlement.ar.trim(), `${plan.id} has no Arabic entitlement`)
    plan.features.forEach((feature) => {
      assert.ok(feature.label.en.trim() && feature.label.ar.trim(), `${plan.id} has a half-translated feature`)
    })
  })
})

test('trial access is described as onboarding state, not as a plan to buy', () => {
  const allAccess = initialPlanCatalog().plans.find((plan) => plan.id === 'all_access')!
  assert.match(allAccess.entitlement.en, /Trial access remains an onboarding state/)
  assert.doesNotMatch(allAccess.entitlement.en, /7-day/)
})

test('the one all-access plan is the comparison column', () => {
  const catalog = initialPlanCatalog()
  assert.deepEqual(plansFor(catalog, 'primary').map((plan) => plan.id), ['all_access'])
  assert.deepEqual(plansFor(catalog, 'secondary').map((plan) => plan.id), [])
})

test('the comparison rebuilds the table the plans replaced, in its sections', () => {
  const groups = compareGroups(initialPlanCatalog(), 'en')
  assert.deepEqual(groups.map((group) => group.title), ['Studying', 'Planning and review', 'Tools'])
  const library = groups[0].rows.find((row) => row.label === 'Library and verified sources')!
  assert.deepEqual(library.values, [true])
  const adaptive = groups[0].rows.find((row) => row.label === 'Adaptive blocks aimed at your weak points')!
  assert.deepEqual(adaptive.values, [true])
  const questions = groups[0].rows.find((row) => row.label === 'Questions a day')!
  assert.deepEqual(questions.values, ['Unlimited'])
})

test('the comparison rebuilds in Arabic too', () => {
  const groups = compareGroups(initialPlanCatalog(), 'ar')
  assert.deepEqual(groups.map((group) => group.title), ['المذاكرة', 'التخطيط والمراجعة', 'الأدوات'])
  const questions = groups[0].rows.find((row) => row.label === 'أسئلة يوميًا')!
  assert.deepEqual(questions.values, ['بلا حد'])
})

test('the matrix column carries the all-access values', () => {
  const allAccess = featuresForColumn(0)
  assert.equal(allAccess.some((feature) => feature.label.en === 'Adaptive blocks aimed at your weak points'), true)
  assert.equal(say(allAccess.find((feature) => feature.label.en === 'Questions a day')?.value, 'en'), 'Unlimited')
})

test('a plan the admin added to the old list is carried over, not dropped', () => {
  const carried = carryOverLegacyPlans(initialPlanCatalog(), [
    { id: 'bespoke', name: 'Bespoke cohort', priceEGP: 60, active: true },
  ])
  const found = carried.plans.find((plan) => plan.id === 'bespoke')!
  assert.equal(found.prominence, 'secondary')
  assert.equal(found.prices.month, 60)
  assert.equal(found.name.ar, 'Bespoke cohort')
})

test('a plan the seed already knows about is not carried over twice', () => {
  const carried = carryOverLegacyPlans(initialPlanCatalog(), [
    { id: 'all_access', name: 'All access', priceEGP: 400, active: true },
  ])
  assert.equal(carried.plans.filter((plan) => plan.id === 'all_access').length, 1)
})

test('a stored catalogue wins over the seed, and an empty one does not', () => {
  const stored = { periods: [], plans: [{ ...initialPlanCatalog().plans[0], id: 'mine' }] }
  assert.equal(resolvePlanCatalog(stored).plans[0].id, 'mine')
  assert.equal(resolvePlanCatalog(null).plans.length, 1)
  assert.equal(resolvePlanCatalog({ periods: [], plans: [] }).plans.length, 1)
})

test('seeding twice produces the same catalogue', () => {
  assert.deepEqual(
    initialPlanCatalog().plans.map((plan) => plan.id),
    initialPlanCatalog().plans.map((plan) => plan.id),
  )
})
