/**
 * What Connect Cortex sells, defined once.
 *
 * Plans used to be written twice: a `PlanDef[]` the admin console edited and
 * Billing read, and a separate hardcoded `Plan[]` in the landing content that
 * the public pricing page read. Nothing joined them, so editing a price in the
 * console changed what a student was charged and left the public page
 * advertising the old number. This is the single document both read.
 *
 * Feature tiers are the plans; duration is the billing axis. A plan carries a
 * price per period, and a period a plan is not sold at simply has no entry —
 * the page falls back to the longest shorter period rather than inventing one.
 *
 * Every piece of text is bilingual because both landing pages are first-class:
 * an Arabic page showing English plan names is a page that has gone stale, and
 * a fallback would have hidden that rather than prevented it.
 */

export type Lang = 'en' | 'ar'

/** Text the admin writes in both languages. */
export interface Bilingual { en: string; ar: string }

/**
 * One language of a bilingual string.
 *
 * An empty translation reads as the other language rather than as a blank: a
 * half-filled plan should look unfinished, not broken.
 */
export function say(text: Bilingual | undefined, lang: Lang): string {
  if (!text) return ''
  const wanted = text[lang]?.trim()
  if (wanted) return wanted
  return (lang === 'en' ? text.ar : text.en)?.trim() ?? ''
}

export interface BillingPeriodDef {
  id: string
  label: Bilingual
  /** "billed each term" — what is actually charged, and when. */
  billedAs: Bilingual
  /** Months this period covers. Drives per-month equivalence and the saving. */
  months: number
  /** Priced and shown, but not purchasable yet. */
  comingSoon?: boolean
}

/**
 * One line of what a plan includes.
 *
 * `value` exists because "limited" and "unlimited" are the honest difference
 * between these tiers, and a tick would flatten it. A feature with no value is
 * a plain tick; one with a value prints the value in the comparison table.
 */
export interface PlanFeature {
  /** The section this line belongs to — "Studying", "Tools". Blank groups sit last. */
  group?: Bilingual
  label: Bilingual
  value?: Bilingual
}

export interface CatalogPlan {
  id: string
  name: Bilingual
  entitlement: Bilingual
  /** Feature lines. The comparison table is built from these, not written twice. */
  features: PlanFeature[]
  /** Period id → price. An absent period is not sold for this plan. */
  prices: Record<string, number>
  /** Shown instead of a price where there is no list price — campus, cohort. */
  quoted?: Bilingual
  /** A fixed-scope offer whose period is the product, not a billing choice. */
  fixedPeriod?: Bilingual
  cta: Bilingual
  /** `primary` plans are the tiers and the comparison columns; `secondary` sits beneath. */
  prominence: 'primary' | 'secondary'
  featured?: boolean
  badge?: Bilingual
  /** Announced, not yet available. */
  comingSoon?: boolean
  /** Off hides it from the landing page and from onboarding entirely. */
  active: boolean
  /** Empty means everyone. */
  universityIds: string[]
  years: string[]
}

export interface PlanCatalog {
  periods: BillingPeriodDef[]
  plans: CatalogPlan[]
}

export const PLAN_CATALOG_STORAGE_KEY = 'synapse-plan-catalog-v1'

export function periodById(catalog: PlanCatalog, id: string): BillingPeriodDef | undefined {
  return catalog.periods.find((period) => period.id === id)
}

/** Periods shortest first, whatever order they were entered in. */
function byLength(periods: readonly BillingPeriodDef[]): BillingPeriodDef[] {
  return [...periods].sort((a, b) => a.months - b.months)
}

/**
 * The price to show for a period.
 *
 * A plan sold only by the month still has a price when the page is showing the
 * year, so this falls back to the longest shorter period the plan is actually
 * sold at, and then to the shortest longer one. The period it landed on comes
 * back with the amount, because "billed monthly" underneath a yearly column is
 * the honest label.
 */
export function priceAt(
  plan: CatalogPlan,
  periodId: string,
  periods: readonly BillingPeriodDef[],
): { amount: number; period: BillingPeriodDef } | null {
  const sorted = byLength(periods)
  const wanted = sorted.find((period) => period.id === periodId)
  const has = (period: BillingPeriodDef) => plan.prices[period.id] !== undefined

  if (wanted && has(wanted)) return { amount: plan.prices[wanted.id], period: wanted }

  if (wanted) {
    const shorter = sorted.filter((period) => period.months < wanted.months && has(period)).pop()
    if (shorter) return { amount: plan.prices[shorter.id], period: shorter }
  }

  const any = sorted.find(has)
  return any ? { amount: plan.prices[any.id], period: any } : null
}

/** What an amount at this period works out to per month. */
export function perMonth(amount: number, period: BillingPeriodDef): number {
  return period.months > 0 ? amount / period.months : amount
}

/**
 * How much cheaper this period is than the shortest one the plan is sold at.
 *
 * Null when there is nothing to compare — a free plan, the shortest period
 * itself, or a longer commitment that is not actually cheaper. Rounded down, so
 * the page never claims a saving larger than the one on offer.
 */
export function savingPercent(
  plan: CatalogPlan,
  periodId: string,
  periods: readonly BillingPeriodDef[],
): number | null {
  const sorted = byLength(periods)
  const base = sorted.find((period) => plan.prices[period.id] !== undefined)
  if (!base || base.id === periodId) return null

  const basePrice = plan.prices[base.id]
  if (!basePrice) return null

  const chosen = sorted.find((period) => period.id === periodId)
  if (!chosen || plan.prices[chosen.id] === undefined) return null

  const full = basePrice * (chosen.months / base.months)
  const price = plan.prices[chosen.id]
  if (price >= full) return null
  return Math.floor(((full - price) / full) * 100)
}

/**
 * Whether this plan can actually be bought at this period, right now.
 *
 * Four separate facts can refuse it, and they are read through one predicate so
 * that no caller can check the plan and forget the period — which is how a
 * "coming soon" year plan would have ended up with a working buy button.
 */
export function isPurchasable(plan: CatalogPlan, period: BillingPeriodDef): boolean {
  if (!plan.active) return false
  if (plan.comingSoon) return false
  if (period.comingSoon) return false
  return plan.prices[period.id] !== undefined
}

/**
 * Whether a plan can be bought while the page is showing this period.
 *
 * `isPurchasable` asks about one exact period; this asks the question the page
 * actually has, which is about the period the *price* resolved to. A plan sold
 * only by the month is still on sale while the page shows the term — its price
 * falls back, and so must its button. Asking the raw selected period instead
 * put "Coming soon" under the Free plan for anyone looking at term pricing.
 */
export function purchasableAt(plan: CatalogPlan, periodId: string, periods: readonly BillingPeriodDef[]): boolean {
  const resolved = priceAt(plan, periodId, periods)
  return resolved ? isPurchasable(plan, resolved.period) : false
}

/** What a plan is worth a month, for revenue reporting. */
export function monthlyEquivalent(plan: CatalogPlan, periods: readonly BillingPeriodDef[]): number {
  const sorted = byLength(periods)
  const base = sorted.find((period) => plan.prices[period.id] !== undefined)
  return base ? perMonth(plan.prices[base.id], base) : 0
}

export interface PlanAudience { universityId?: string; year?: string }

/** Whether a plan is offered to this university and year. Empty lists mean everyone. */
export function planMatchesAudience(plan: CatalogPlan, audience?: PlanAudience): boolean {
  if (!audience) return true
  if (audience.universityId && plan.universityIds.length > 0 && !plan.universityIds.includes(audience.universityId)) return false
  if (audience.year && plan.years.length > 0 && !plan.years.includes(audience.year)) return false
  return true
}

/**
 * The plans to show.
 *
 * A coming-soon plan is still offered: it is meant to be seen. It is refused at
 * the point of choosing, by `isPurchasable`, rather than hidden — announcing a
 * plan and then not listing it would defeat the flag.
 */
export function plansFor(catalog: PlanCatalog, prominence: CatalogPlan['prominence'], audience?: PlanAudience): CatalogPlan[] {
  return catalog.plans.filter((plan) => plan.active && plan.prominence === prominence && planMatchesAudience(plan, audience))
}

export interface CompareRow {
  label: string
  /**
   * One entry per primary plan, in the order `plansFor` returns them: a string
   * where the plan qualified the feature, true where it simply has it, false
   * where it does not.
   */
  values: (boolean | string)[]
}

/**
 * The comparison table, built from what the plans say they include.
 *
 * It used to be written by hand next to the plans it described, which is a
 * second place for the same fact to live and a second place for it to be wrong.
 * Editing a plan's features now moves the table.
 */
export function compareRows(catalog: PlanCatalog, lang: Lang, audience?: PlanAudience): CompareRow[] {
  const plans = plansFor(catalog, 'primary', audience)
  const order: string[] = []
  const carried = new Map<string, Map<string, boolean | string>>()

  plans.forEach((plan) => {
    plan.features.forEach((feature) => {
      const label = say(feature.label, lang)
      if (!label) return
      if (!carried.has(label)) { carried.set(label, new Map()); order.push(label) }
      const qualified = say(feature.value, lang)
      carried.get(label)!.set(plan.id, qualified || true)
    })
  })

  return order.map((label) => ({
    label,
    values: plans.map((plan) => carried.get(label)!.get(plan.id) ?? false),
  }))
}

export interface CompareGroup {
  title: string
  rows: CompareRow[]
}

/**
 * The comparison, in the sections the plans put their features in.
 *
 * A flat list of every feature across three tiers is fifteen rows with no
 * shape; the groups are what make it readable, and they come from the plans
 * rather than from a second hand-written structure beside them. Sections appear
 * in the order they are first named, and anything ungrouped falls to the end.
 */
export function compareGroups(catalog: PlanCatalog, lang: Lang, audience?: PlanAudience): CompareGroup[] {
  const plans = plansFor(catalog, 'primary', audience)
  const order: string[] = []
  const groupOf = new Map<string, string>()

  plans.forEach((plan) => {
    plan.features.forEach((feature) => {
      const label = say(feature.label, lang)
      if (!label || groupOf.has(label)) return
      const title = say(feature.group, lang)
      groupOf.set(label, title)
      if (!order.includes(title)) order.push(title)
    })
  })

  const rows = compareRows(catalog, lang, audience)
  // An untitled section is a real section — it just has no heading — so it is
  // kept and sorted last rather than dropped along with the features in it.
  return order
    .sort((a, b) => (a ? 0 : 1) - (b ? 0 : 1))
    .map((title) => ({ title, rows: rows.filter((row) => groupOf.get(row.label) === title) }))
    .filter((group) => group.rows.length > 0)
}

/**
 * A plan by the handle another record refers to it with.
 *
 * A subscription stores a plan *name*, written when it was taken out, so a plan
 * since renamed still has to be findable. Id first, then either language's name,
 * so a student on "بنك الأسئلة" and one on "QBank" resolve to the same plan.
 */
export function findPlan(catalog: PlanCatalog, handle: string): CatalogPlan | undefined {
  const wanted = handle.trim().toLowerCase()
  if (!wanted) return undefined
  return catalog.plans.find((plan) => plan.id.toLowerCase() === wanted)
    ?? catalog.plans.find((plan) => plan.name.en.trim().toLowerCase() === wanted)
    ?? catalog.plans.find((plan) => plan.name.ar.trim().toLowerCase() === wanted)
}

/** What a student on this plan is worth a month. Zero when the plan is unknown. */
export function monthlyPriceFor(catalog: PlanCatalog, handle: string): number {
  const plan = findPlan(catalog, handle)
  return plan ? monthlyEquivalent(plan, catalog.periods) : 0
}
