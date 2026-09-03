import test from 'node:test'
import assert from 'node:assert/strict'
import {
  compareGroups, compareRows, findPlan, isPurchasable, monthlyEquivalent, monthlyPriceFor, offerSelectionFromSearch, perMonth, periodById, plansFor, priceAt, promoPrice, purchasableAt,
  savingPercent, say, signupPathForOffer, type BillingPeriodDef, type CatalogPlan, type PlanCatalog,
} from './planCatalog.ts'
import { initialPlanCatalog } from './planCatalogSeed.ts'

const bi = (en: string) => ({ en, ar: `${en} (ar)` })
const feat = (en: string, value?: string) => (value === undefined ? { label: bi(en) } : { label: bi(en), value: bi(value) })

const PERIODS: BillingPeriodDef[] = [
  { id: 'month', label: bi('1 month'), billedAs: bi('billed monthly'), months: 1 },
  { id: 'term', label: bi('1 term'), billedAs: bi('billed each term'), months: 3 },
  { id: 'year', label: bi('1 year'), billedAs: bi('billed yearly'), months: 12, comingSoon: true },
]

function plan(overrides: Partial<CatalogPlan> = {}): CatalogPlan {
  return {
    id: 'p', name: bi('Plan'), entitlement: bi('Everything'), features: [],
    prices: { month: 100, term: 250, year: 800 },
    cta: bi('Subscribe'), prominence: 'primary', active: true,
    universityIds: [], years: [],
    ...overrides,
  }
}

const catalog = (plans: CatalogPlan[]): PlanCatalog => ({ schemaVersion: 2, periods: PERIODS, plans })

/* ---- Language ------------------------------------------------------------ */

test('a bilingual string is read in the language asked for', () => {
  assert.equal(say(bi('Free'), 'en'), 'Free')
  assert.equal(say(bi('Free'), 'ar'), 'Free (ar)')
})

test('a missing translation reads as the other language rather than as nothing', () => {
  assert.equal(say({ en: 'Free', ar: '' }, 'ar'), 'Free')
  assert.equal(say({ en: '', ar: 'مجاني' }, 'en'), 'مجاني')
})

/* ---- Price --------------------------------------------------------------- */

test('a period a plan is sold at gives that exact price', () => {
  assert.equal(priceAt(plan(), 'term', PERIODS)?.amount, 250)
  assert.equal(priceAt(plan(), 'term', PERIODS)?.period.id, 'term')
})

test('a live period a plan is not sold at falls back to the longest shorter one it is', () => {
  const monthlyOnly = plan({ prices: { month: 100 } })
  assert.equal(priceAt(monthlyOnly, 'term', PERIODS)?.period.id, 'month')
  const upToTerm = plan({ prices: { month: 100, term: 250 } })
  assert.equal(priceAt(upToTerm, 'term', PERIODS)?.period.id, 'term')
})

test('a coming-soon period with no exact price does not invent one from a shorter window', () => {
  assert.equal(priceAt(plan({ prices: { month: 400, term: 1000 } }), 'year', PERIODS), null)
})

test('a plan sold only at a longer period still has a price to show', () => {
  const yearly = plan({ prices: { year: 800 } })
  assert.equal(priceAt(yearly, 'month', PERIODS)?.period.id, 'year')
})

test('a plan with no prices at all has no price, rather than zero', () => {
  assert.equal(priceAt(plan({ prices: {} }), 'month', PERIODS), null)
})

test('a period converts to what it works out to per month', () => {
  assert.equal(perMonth(250, PERIODS[1]), 250 / 3)
  assert.equal(perMonth(100, PERIODS[0]), 100)
})

test('a period is found by its id, and an unknown id finds nothing', () => {
  assert.equal(periodById(catalog([]), 'term')?.months, 3)
  assert.equal(periodById(catalog([]), 'decade'), undefined)
})

test('promoPrice rounds a percent-off promo to the nearest whole EGP', () => {
  const withPromo = plan({
    prices: { month: 400, term: 1000 },
    promo: { month: { enabled: true, percentOff: 25 }, term: { enabled: true, percentOff: 30 } },
  })
  assert.equal(promoPrice(withPromo, 'month'), 300)
  assert.equal(promoPrice(withPromo, 'term'), 700)
})

test('a disabled or absent promo leaves the base price alone', () => {
  assert.equal(promoPrice(plan({ prices: { month: 400 } }), 'month'), 400)
  const disabled = plan({ prices: { month: 400 }, promo: { month: { enabled: false, percentOff: 25 } } })
  assert.equal(promoPrice(disabled, 'month'), 400)
})

test('a period the plan has no price for has no promo price either', () => {
  assert.equal(promoPrice(plan({ prices: {} }), 'month'), null)
})

/* ---- Saving -------------------------------------------------------------- */

test('a longer commitment states what it saves against the shortest one', () => {
  // 3 months at the monthly price is 300; the term costs 250, so 16% saved.
  assert.equal(savingPercent(plan(), 'term', PERIODS), 16)
})

test('the shortest period saves nothing against itself', () => {
  assert.equal(savingPercent(plan(), 'month', PERIODS), null)
})

test('a free plan claims no saving', () => {
  assert.equal(savingPercent(plan({ prices: { month: 0, term: 0 } }), 'term', PERIODS), null)
})

test('a longer commitment that is not actually cheaper claims nothing', () => {
  assert.equal(savingPercent(plan({ prices: { month: 100, term: 300 } }), 'term', PERIODS), null)
  assert.equal(savingPercent(plan({ prices: { month: 100, term: 400 } }), 'term', PERIODS), null)
})

test('a saving is rounded down, never up', () => {
  // 3 months at 100 is 300; 251 saves 16.33%, which must report as 16.
  assert.equal(savingPercent(plan({ prices: { month: 100, term: 251 } }), 'term', PERIODS), 16)
})

/* ---- Purchasable --------------------------------------------------------- */

test('a plan sold at a live period is purchasable', () => {
  assert.equal(isPurchasable(plan(), PERIODS[0]), true)
  assert.equal(isPurchasable(plan(), PERIODS[1]), true)
})

test('a coming-soon period cannot be bought in any plan', () => {
  assert.equal(isPurchasable(plan(), PERIODS[2]), false)
})

test('a coming-soon plan cannot be bought at any period', () => {
  assert.equal(isPurchasable(plan({ comingSoon: true }), PERIODS[0]), false)
})

test('an inactive plan cannot be bought', () => {
  assert.equal(isPurchasable(plan({ active: false }), PERIODS[0]), false)
})

test('a period the plan is not sold at cannot be bought', () => {
  assert.equal(isPurchasable(plan({ prices: { term: 250 } }), PERIODS[0]), false)
})

/* ---- Revenue ------------------------------------------------------------- */

test('a plan reports what it is worth a month, whatever it is sold at', () => {
  assert.equal(monthlyEquivalent(plan({ prices: { month: 99 } }), PERIODS), 99)
  assert.equal(monthlyEquivalent(plan({ prices: { term: 300 } }), PERIODS), 100)
  assert.equal(monthlyEquivalent(plan({ prices: {} }), PERIODS), 0)
})

/* ---- Comparison ---------------------------------------------------------- */

test('the comparison is the union of what the plans list, in the order first seen', () => {
  const free = plan({ id: 'free', name: bi('Free'), features: [feat('Library', 'Limited'), feat('Questions a day', '10')] })
  const paid = plan({ id: 'paid', name: bi('Paid'), features: [feat('Library'), feat('Adaptive blocks')] })
  const rows = compareRows(catalog([free, paid]), 'en')
  assert.deepEqual(rows.map((row) => row.label), ['Library', 'Questions a day', 'Adaptive blocks'])
  // Free qualified the library as limited; the paid plan simply has it.
  assert.deepEqual(rows[0].values, ['Limited', true])
  assert.deepEqual(rows[1].values, ['10', false])
  assert.deepEqual(rows[2].values, [false, true])
})

test('the comparison compares the tiers, not the offers beneath them', () => {
  const tier = plan({ id: 'tier', features: [feat('Library')] })
  const extra = plan({ id: 'extra', prominence: 'secondary', features: [feat('Campus analytics')] })
  const rows = compareRows(catalog([tier, extra]), 'en')
  assert.deepEqual(rows.map((row) => row.label), ['Library'])
  assert.equal(rows[0].values.length, 1)
})

test('the comparison reads in Arabic too', () => {
  const one = plan({ features: [feat('Library')] })
  assert.equal(compareRows(catalog([one]), 'ar')[0].label, 'Library (ar)')
})

test('an inactive plan is not compared', () => {
  const live = plan({ id: 'live', features: [feat('Library')] })
  const off = plan({ id: 'off', active: false, features: [feat('Secret')] })
  assert.deepEqual(compareRows(catalog([live, off]), 'en').map((row) => row.label), ['Library'])
})

/* ---- Offering ------------------------------------------------------------ */

test('only active plans of the asked-for prominence are offered', () => {
  const list = catalog([
    plan({ id: 'a' }),
    plan({ id: 'b', prominence: 'secondary' }),
    plan({ id: 'c', active: false }),
  ])
  assert.deepEqual(plansFor(list, 'primary').map((entry) => entry.id), ['a'])
  assert.deepEqual(plansFor(list, 'secondary').map((entry) => entry.id), ['b'])
})

test('a plan aimed at one university and year is offered to nobody else', () => {
  const list = catalog([
    plan({ id: 'everyone' }),
    plan({ id: 'kau-only', universityIds: ['kau'] }),
    plan({ id: 'y1-only', years: ['Year 1'] }),
  ])
  assert.deepEqual(plansFor(list, 'primary', { universityId: 'kau', year: 'Year 1' }).map((e) => e.id), ['everyone', 'kau-only', 'y1-only'])
  assert.deepEqual(plansFor(list, 'primary', { universityId: 'asu', year: 'Year 2' }).map((e) => e.id), ['everyone'])
})

test('with no audience given, every active plan is offered', () => {
  const list = catalog([plan({ id: 'kau-only', universityIds: ['kau'] })])
  assert.deepEqual(plansFor(list, 'primary').map((e) => e.id), ['kau-only'])
})

test('a coming-soon plan is still offered — it is shown, and refused at the point of choosing', () => {
  const list = catalog([plan({ id: 'soon', comingSoon: true })])
  assert.deepEqual(plansFor(list, 'primary').map((e) => e.id), ['soon'])
  assert.equal(isPurchasable(list.plans[0], PERIODS[0]), false)
})

test('the comparison keeps the sections the plans put their features in', () => {
  const study = { en: 'Studying', ar: 'المذاكرة' }
  const tools = { en: 'Tools', ar: 'الأدوات' }
  const free = plan({ id: 'free', features: [
    { group: study, label: bi('Library'), value: bi('Limited') },
    { group: tools, label: bi('Notebook') },
  ] })
  const paid = plan({ id: 'paid', features: [
    { group: study, label: bi('Library') },
    { group: study, label: bi('Adaptive blocks') },
    { group: tools, label: bi('Notebook') },
  ] })
  const groups = compareGroups(catalog([free, paid]), 'en')
  assert.deepEqual(groups.map((group) => group.title), ['Studying', 'Tools'])
  assert.deepEqual(groups[0].rows.map((row) => row.label), ['Library', 'Adaptive blocks'])
  assert.deepEqual(groups[1].rows.map((row) => row.label), ['Notebook'])
  assert.deepEqual(groups[0].rows[0].values, ['Limited', true])
})

test('an ungrouped feature is kept, in a section of its own at the end', () => {
  const one = plan({ features: [
    { label: bi('Loose') },
    { group: bi('Studying'), label: bi('Library') },
  ] })
  const groups = compareGroups(catalog([one]), 'en')
  assert.deepEqual(groups.map((group) => group.title), ['Studying', ''])
  assert.deepEqual(groups[1].rows.map((row) => row.label), ['Loose'])
})

test('the sections read in Arabic too', () => {
  const one = plan({ features: [{ group: { en: 'Tools', ar: 'الأدوات' }, label: bi('Notebook') }] })
  assert.equal(compareGroups(catalog([one]), 'ar')[0].title, 'الأدوات')
})

test('a plan is found by its id or by either language of its name', () => {
  const list = catalog([plan({ id: 'qbank', name: { en: 'QBank', ar: 'بنك الأسئلة' } })])
  assert.equal(findPlan(list, 'qbank')?.id, 'qbank')
  assert.equal(findPlan(list, 'QBank')?.id, 'qbank')
  assert.equal(findPlan(list, 'qbank ')?.id, 'qbank')
  assert.equal(findPlan(list, 'بنك الأسئلة')?.id, 'qbank')
  assert.equal(findPlan(list, 'Adaptive'), undefined)
  assert.equal(findPlan(list, ''), undefined)
})

test('an unknown plan is worth nothing a month, rather than throwing', () => {
  const list = catalog([plan({ id: 'qbank', prices: { month: 99 } })])
  assert.equal(monthlyPriceFor(list, 'qbank'), 99)
  assert.equal(monthlyPriceFor(list, 'nothing'), 0)
})

test('a plan sold only by the month is still on sale while the page shows a live longer period', () => {
  const free = plan({ prices: { month: 0 } })
  // The exact period says no — it is not sold that way — but the price falls
  // back to the month, and the button must follow the price.
  assert.equal(isPurchasable(free, PERIODS[1]), false)
  assert.equal(purchasableAt(free, 'term', PERIODS), true)
  assert.equal(purchasableAt(free, 'year', PERIODS), false)
})

test('a plan priced at a coming-soon period is refused while that period is showing', () => {
  assert.equal(purchasableAt(plan(), 'year', PERIODS), false)
  assert.equal(purchasableAt(plan(), 'term', PERIODS), true)
})

test('a plan with no price at all cannot be bought at any period', () => {
  assert.equal(purchasableAt(plan({ prices: {} }), 'month', PERIODS), false)
})

/* ---- Offer selection ---------------------------------------------------- */

test('the chosen Nishany period survives in an identifiers-only sign-up URL', () => {
  const selection = offerSelectionFromSearch(initialPlanCatalog(), '?plan=maristana&period=month')
  assert.deepEqual(selection, { planId: 'maristana', periodId: 'month' })
  assert.equal(signupPathForOffer(selection), '/signup?plan=maristana&period=month')
})

test('the academic term is the safe default for an unknown or coming-soon offer', () => {
  const launch = initialPlanCatalog()
  assert.deepEqual(offerSelectionFromSearch(launch, ''), { planId: 'maristana', periodId: 'term' })
  assert.deepEqual(
    offerSelectionFromSearch(launch, '?plan=qbank&period=year'),
    { planId: 'maristana', periodId: 'term' },
  )
})
