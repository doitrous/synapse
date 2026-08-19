import test from 'node:test'
import assert from 'node:assert/strict'
import { carryOverLegacyPlans, featuresForColumn, initialPlanCatalog, resolvePlanCatalog } from './planCatalogSeed.ts'
import { compareGroups, isPurchasable, periodById, plansFor, priceAt, say } from './planCatalog.ts'

test('the periods are one month, one term and one year, in that order', () => {
  const catalog = initialPlanCatalog()
  assert.deepEqual(catalog.periods.map((period) => period.id), ['month', 'term', 'year'])
  assert.deepEqual(catalog.periods.map((period) => period.months), [1, 3, 12])
})

test('the year is priced and shown, but cannot be bought yet', () => {
  const catalog = initialPlanCatalog()
  const year = periodById(catalog, 'year')!
  assert.equal(year.comingSoon, true)
  const qbank = catalog.plans.find((plan) => plan.id === 'qbank')!
  assert.equal(priceAt(qbank, 'year', catalog.periods)?.amount, 799)
  assert.equal(isPurchasable(qbank, year), false)
  assert.equal(isPurchasable(qbank, periodById(catalog, 'term')!), true)
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

test('the free plan no longer promises a seven-day trial', () => {
  const free = initialPlanCatalog().plans.find((plan) => plan.id === 'free')!
  assert.match(free.entitlement.en, /3-day/)
  assert.doesNotMatch(free.entitlement.en, /7-day/)
})

test('the three tiers are the comparison columns; the other offers are not', () => {
  const catalog = initialPlanCatalog()
  assert.deepEqual(plansFor(catalog, 'primary').map((plan) => plan.id), ['free', 'qbank', 'adaptive'])
  assert.deepEqual(plansFor(catalog, 'secondary').map((plan) => plan.id), ['addon', 'sprint', 'campus'])
})

test('the comparison rebuilds the table the plans replaced, in its sections', () => {
  const groups = compareGroups(initialPlanCatalog(), 'en')
  assert.deepEqual(groups.map((group) => group.title), ['Studying', 'Planning and review', 'Tools'])
  const library = groups[0].rows.find((row) => row.label === 'Library and verified sources')!
  assert.deepEqual(library.values, ['Limited', true, true])
  const adaptive = groups[0].rows.find((row) => row.label === 'Adaptive blocks aimed at your weak points')!
  assert.deepEqual(adaptive.values, [false, false, true])
  const questions = groups[0].rows.find((row) => row.label === 'Questions a day')!
  assert.deepEqual(questions.values, ['10', 'Unlimited', 'Unlimited'])
})

test('the comparison rebuilds in Arabic too', () => {
  const groups = compareGroups(initialPlanCatalog(), 'ar')
  assert.deepEqual(groups.map((group) => group.title), ['المذاكرة', 'التخطيط والمراجعة', 'الأدوات'])
  const questions = groups[0].rows.find((row) => row.label === 'أسئلة يوميًا')!
  assert.deepEqual(questions.values, ['١٠', 'بلا حد', 'بلا حد'])
})

test('a column of the matrix keeps only what that tier has', () => {
  const free = featuresForColumn(0)
  const adaptive = featuresForColumn(2)
  assert.equal(free.some((feature) => feature.label.en === 'Adaptive blocks aimed at your weak points'), false)
  assert.equal(adaptive.some((feature) => feature.label.en === 'Adaptive blocks aimed at your weak points'), true)
  assert.equal(say(free.find((feature) => feature.label.en === 'Questions a day')?.value, 'en'), '10')
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
    { id: 'free', name: 'Free', priceEGP: 0, active: true },
  ])
  assert.equal(carried.plans.filter((plan) => plan.id === 'free').length, 1)
})

test('a stored catalogue wins over the seed, and an empty one does not', () => {
  const stored = { periods: [], plans: [{ ...initialPlanCatalog().plans[0], id: 'mine' }] }
  assert.equal(resolvePlanCatalog(stored).plans[0].id, 'mine')
  assert.equal(resolvePlanCatalog(null).plans.length, 6)
  assert.equal(resolvePlanCatalog({ periods: [], plans: [] }).plans.length, 6)
})

test('seeding twice produces the same catalogue', () => {
  assert.deepEqual(
    initialPlanCatalog().plans.map((plan) => plan.id),
    initialPlanCatalog().plans.map((plan) => plan.id),
  )
})
