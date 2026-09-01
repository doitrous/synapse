import test from 'node:test'
import assert from 'node:assert/strict'
import {
  TRIAL_DAYS, liveUniversities, liveYears, offeredPlans, onboardingComplete, planSelectable,
  trialFor, yearModules,
} from './onboarding.ts'
import type { University } from './universities.ts'
import { initialPlanCatalog } from './planCatalogSeed.ts'
import type { PlanCatalog } from './planCatalog.ts'

function catalogue(): University[] {
  return [
    {
      id: 'kau', name: 'Kasr Alainy', short: 'KAU', region: 'Cairo',
      years: [
        { id: 'KAU_Y1', year: 'Year 1', students: 0, terms: ['Term 1'], courses: [
          { id: 'c1', name: 'Cardiovascular System', block: 'Block 1', moduleId: 'CVS 01', term: 'Term 1' },
          { id: 'c2', name: 'Respiratory System', block: 'Block 2', term: 'Term 2' },
        ] },
        { id: 'KAU_Y2', year: 'Year 2', students: 0, terms: ['Term 1'], courses: [], active: false },
      ],
    },
    { id: 'off', name: 'Closed University', short: 'CU', region: 'Cairo', active: false, years: [
      { id: 'CU_Y1', year: 'Year 1', students: 0, terms: ['Term 1'], courses: [] },
    ] },
  ]
}

test('a university switched off is not offered', () => {
  assert.deepEqual(liveUniversities(catalogue()).map((u) => u.id), ['kau'])
})

test('a year switched off is not offered, even where its university is live', () => {
  const kau = catalogue()[0]
  assert.deepEqual(liveYears(kau).map((y) => y.id), ['KAU_Y1'])
})

test('no year of a switched-off university is offered', () => {
  const closed = catalogue()[1]
  assert.deepEqual(liveYears(closed), [])
})

test('a year shows the modules it teaches, by the id on their timetable', () => {
  const kau = catalogue()[0]
  const modules = yearModules(kau.years[0])
  assert.deepEqual(modules.map((m) => m.id), ['CVS 01', 'RESP 02'])
  assert.deepEqual(modules.map((m) => m.name), ['Cardiovascular System', 'Respiratory System'])
  assert.deepEqual(modules.map((m) => m.term), ['Term 1', 'Term 2'])
})

test('a year with no modules shows none rather than failing', () => {
  assert.deepEqual(yearModules(catalogue()[0].years[1]), [])
})

/* ---- Plans --------------------------------------------------------------- */

function targeted(): PlanCatalog {
  const catalog = initialPlanCatalog()
  return {
    ...catalog,
    plans: catalog.plans.map((plan) => (plan.id === 'maristana' ? { ...plan, universityIds: ['asu'] } : plan)),
  }
}

test('the complete membership is offered only to cohorts it is aimed at', () => {
  const offered = offeredPlans(targeted(), { universityId: 'kau', year: 'Year 1' })
  assert.deepEqual(offered.map((plan) => plan.id), [])
})

test('with no targeting, Nishany is the only onboarding offer', () => {
  const offered = offeredPlans(initialPlanCatalog(), { universityId: 'kau', year: 'Year 1' })
  assert.deepEqual(offered.map((plan) => plan.id), ['maristana'])
})

test('a plan is selectable when the catalogue sells it at some live period', () => {
  const catalog = initialPlanCatalog()
  const maristana = catalog.plans.find((plan) => plan.id === 'maristana')!
  const campus = catalog.plans.find((plan) => plan.id === 'campus')!
  assert.equal(planSelectable(catalog, maristana), true)
  assert.equal(planSelectable(catalog, campus), false)
})

test('a plan sold only at a coming-soon period cannot be chosen', () => {
  const catalog = initialPlanCatalog()
  const yearOnly = { ...catalog.plans[1], id: 'later', prices: { year: 800 } }
  assert.equal(planSelectable(catalog, yearOnly), false)
})

/* ---- Completion ---------------------------------------------------------- */

test('all three answers are required', () => {
  assert.equal(onboardingComplete({ universityId: 'kau', yearId: 'KAU_Y1', planId: 'free' }), true)
  assert.equal(onboardingComplete({ universityId: 'kau', yearId: 'KAU_Y1' }), false)
  assert.equal(onboardingComplete({ universityId: 'kau', planId: 'free' }), false)
  assert.equal(onboardingComplete({}), false)
  assert.equal(onboardingComplete(null), false)
})

test('finishing grants exactly three days of full access, recording the plan', () => {
  const grant = trialFor('maristana', new Date(2026, 7, 19, 9, 0))
  assert.equal(grant.plan, 'maristana')
  assert.equal(grant.status, 'trialing')
  assert.equal(grant.source, 'trial')
  const expires = new Date(grant.expiresAt)
  assert.equal(expires.getDate(), 22)
  assert.equal(expires.getMonth(), 7)
  assert.equal(TRIAL_DAYS, 3)
})

test('a trial that spans a month end still lands on the right day', () => {
  const grant = trialFor('free', new Date(2026, 7, 30, 9, 0))
  const expires = new Date(grant.expiresAt)
  assert.equal(expires.getMonth(), 8)
  assert.equal(expires.getDate(), 2)
})
