import test from 'node:test'
import assert from 'node:assert/strict'
import { carryOverLegacyPlans, featuresForColumn, initialPlanCatalog, migratePlanCatalog, resolvePlanCatalog } from './planCatalogSeed.ts'
import { compareGroups, findPlan, isPurchasable, periodById, plansFor, priceAt, say, PLAN_CATALOG_SCHEMA_VERSION } from './planCatalog.ts'

test('the periods are one month, one term and one year, in that order', () => {
  const catalog = initialPlanCatalog()
  assert.deepEqual(catalog.periods.map((period) => period.id), ['month', 'term', 'year'])
  assert.deepEqual(catalog.periods.map((period) => period.months), [1, 3, 12])
})

test('the year is shown without an invented price and cannot be bought yet', () => {
  const catalog = initialPlanCatalog()
  const year = periodById(catalog, 'year')!
  assert.equal(year.comingSoon, true)
  const maristana = catalog.plans.find((plan) => plan.id === 'maristana')!
  assert.equal(maristana.prices.year, undefined)
  assert.equal(priceAt(maristana, 'year', catalog.periods), null)
  assert.equal(isPurchasable(maristana, year), false)
  assert.equal(isPurchasable(maristana, periodById(catalog, 'term')!), true)
})

test('the launch catalogue is versioned and carries the authoritative Maristana prices', () => {
  const catalog = initialPlanCatalog()
  const maristana = findPlan(catalog, 'maristana')!
  assert.equal(catalog.schemaVersion, PLAN_CATALOG_SCHEMA_VERSION)
  assert.deepEqual(maristana.prices, { month: 400, term: 1000 })
  assert.equal(maristana.name.en, 'MARISTANA')
  assert.equal(maristana.name.ar, 'MARISTANA')
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

test('Maristana is the only new student offer', () => {
  const catalog = initialPlanCatalog()
  assert.deepEqual(plansFor(catalog, 'primary').map((plan) => plan.id), ['maristana'])
  assert.deepEqual(plansFor(catalog, 'secondary').map((plan) => plan.id), [])
})

test('the active offer describes the complete platform in spacious suites', () => {
  const groups = compareGroups(initialPlanCatalog(), 'en')
  assert.deepEqual(groups.map((group) => group.title), ['Your curriculum', 'Practice Suite', 'Adaptive study', 'Study workspace', 'Study with people'])
  assert.equal(groups.flatMap((group) => group.rows).every((row) => row.values.length === 1), true)
  assert.equal(groups.flatMap((group) => group.rows).some((row) => row.label === 'OSCE stations and virtual microscope'), true)
})

test('the complete membership suites are fully translated to Arabic', () => {
  const groups = compareGroups(initialPlanCatalog(), 'ar')
  assert.deepEqual(groups.map((group) => group.title), ['منهجك الدراسي', 'مجموعة التدريب', 'المذاكرة التكيّفية', 'مساحة المذاكرة', 'ذاكر مع الآخرين'])
  assert.equal(groups.flatMap((group) => group.rows).some((row) => row.label === 'محطات OSCE والميكروسكوب الافتراضي'), true)
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
  assert.equal(found.active, false)
})

test('a plan the seed already knows about is not carried over twice', () => {
  const carried = carryOverLegacyPlans(initialPlanCatalog(), [
    { id: 'free', name: 'Free', priceEGP: 0, active: true },
  ])
  assert.equal(carried.plans.filter((plan) => plan.id === 'free').length, 1)
})

test('a stored catalogue wins over the seed, and an empty one does not', () => {
  const stored = { schemaVersion: PLAN_CATALOG_SCHEMA_VERSION, periods: [], plans: [{ ...initialPlanCatalog().plans[0], id: 'mine' }] }
  assert.equal(resolvePlanCatalog(stored).plans[0].id, 'mine')
  assert.equal(resolvePlanCatalog(null).plans.length, 7)
  assert.equal(resolvePlanCatalog({ periods: [], plans: [] }).plans.length, 7)
})

test('an unversioned tier catalogue migrates without losing legacy subscription records', () => {
  const old = initialPlanCatalog()
  const qbank = { ...old.plans.find((plan) => plan.id === 'qbank')!, active: true, prices: { month: 123, term: 321 } }
  const adaptive = { ...old.plans.find((plan) => plan.id === 'adaptive')!, active: true }
  const custom = { ...qbank, id: 'faculty-bundle', name: { en: 'Faculty bundle', ar: 'Faculty bundle' }, prices: { month: 88 } }
  const migrated = migratePlanCatalog({ periods: old.periods, plans: [qbank, adaptive, custom] })

  assert.equal(migrated.schemaVersion, PLAN_CATALOG_SCHEMA_VERSION)
  assert.deepEqual(plansFor(migrated, 'primary').map((plan) => plan.id), ['maristana'])
  assert.equal(findPlan(migrated, 'QBank')?.prices.month, 123)
  assert.equal(findPlan(migrated, 'Adaptive')?.id, 'adaptive')
  assert.equal(findPlan(migrated, 'Faculty bundle')?.prices.month, 88)
  assert.equal(findPlan(migrated, 'qbank')?.active, false)
  assert.equal(findPlan(migrated, 'faculty-bundle')?.active, false)
})

test('seeding twice produces the same catalogue', () => {
  assert.deepEqual(
    initialPlanCatalog().plans.map((plan) => plan.id),
    initialPlanCatalog().plans.map((plan) => plan.id),
  )
})
