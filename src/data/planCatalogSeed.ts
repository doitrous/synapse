import type { Bilingual, BillingPeriodDef, CatalogPlan, PlanCatalog, PlanFeature } from './planCatalog.ts'

/**
 * The catalogue Connect Cortex starts with, and how an older one is carried into it.
 *
 * The plans lived in `src/pages/landing/content.ts` as two hand-written lists —
 * one English, one Arabic — beside a third hand-written comparison table. The
 * table is gone: it is declared here once as a matrix and inverted into each
 * plan's own feature list, so a plan and the row describing it can no longer
 * disagree. After seeding, everything here is editable from the admin console
 * and nothing reads this file again.
 */

const bi = (en: string, ar: string): Bilingual => ({ en, ar })

/**
 * Billing periods. The platform now sells one all-access plan by month or term.
 */
export const SEED_PERIODS: BillingPeriodDef[] = [
  { id: 'month', label: bi('1 month', 'شهر واحد'), billedAs: bi('billed monthly', 'تُحصَّل شهريًا'), months: 1 },
  { id: 'term', label: bi('1 term', 'فصل دراسي'), billedAs: bi('billed each term', 'تُحصَّل كل فصل'), months: 3 },
]

/** A cell in the comparison: has it, does not, or has it with a qualification. */
type Cell = boolean | Bilingual

const STUDYING = bi('Studying', 'المذاكرة')
const PLANNING = bi('Planning and review', 'التخطيط والمراجعة')
const TOOLS = bi('Tools', 'الأدوات')

/**
 * What the all-access plan includes.
 *
 * Declared once and inverted below. Writing it per plan would mean stating the
 * same fifteen labels three times, in two languages, and keeping them aligned by
 * hand — which is how the table and the plans drifted apart in the first place.
 */
const MATRIX: Array<{ group: Bilingual; label: Bilingual; values: [Cell, Cell, Cell] }> = [
  { group: STUDYING, label: bi('Library and verified sources', 'المكتبة والمصادر الموثّقة'), values: [true, true, true] },
  { group: STUDYING, label: bi('Questions a day', 'أسئلة يوميًا'), values: [bi('Unlimited', 'بلا حد'), bi('Unlimited', 'بلا حد'), bi('Unlimited', 'بلا حد')] },
  { group: STUDYING, label: bi('A rationale for every option', 'شروح لكل خيار'), values: [true, true, true] },
  { group: STUDYING, label: bi('Review after you submit', 'مراجعة بعد التسليم'), values: [true, true, true] },
  { group: STUDYING, label: bi('Custom blocks by system and topic', 'كتل مخصّصة حسب الجهاز والموضوع'), values: [true, true, true] },
  { group: STUDYING, label: bi('Adaptive blocks aimed at your weak points', 'كتل تكيّفية حسب نقاط ضعفك'), values: [true, true, true] },

  { group: PLANNING, label: bi('Calendar and your plan', 'التقويم وخطتك'), values: [true, true, true] },
  { group: PLANNING, label: bi('Spaced review', 'مراجعة متباعدة'), values: [true, true, true] },
  { group: PLANNING, label: bi('A generated study plan', 'خطة دراسة مولّدة'), values: [true, true, true] },
  { group: PLANNING, label: bi('Exam readiness assessments', 'تقييمات جاهزية للامتحان'), values: [true, true, true] },

  { group: TOOLS, label: bi('PDF reader and editor', 'قارئ ومحرّر PDF'), values: [true, true, true] },
  { group: TOOLS, label: bi('Your own uploaded documents', 'مستنداتك المرفوعة'), values: [true, true, true] },
  { group: TOOLS, label: bi('Notebook and whiteboard', 'دفتر الملاحظات والسبورة'), values: [true, true, true] },
  { group: TOOLS, label: bi('Study Together', 'الدراسة الجماعية'), values: [true, true, true] },
  { group: TOOLS, label: bi('Analytics', 'التحليلات'), values: [bi('Detailed', 'مفصّلة'), bi('Detailed', 'مفصّلة'), bi('Detailed', 'مفصّلة')] },
]

/** One tier's own feature list, taken from its column of the matrix. */
export function featuresForColumn(column: 0 | 1 | 2): PlanFeature[] {
  const out: PlanFeature[] = []
  MATRIX.forEach((row) => {
    const cell = row.values[column]
    if (cell === false) return
    out.push(cell === true
      ? { group: row.group, label: row.label }
      : { group: row.group, label: row.label, value: cell })
  })
  return out
}

const OPEN = { universityIds: [], years: [] }

export function initialPlanCatalog(): PlanCatalog {
  return {
    periods: structuredClone(SEED_PERIODS),
    plans: [
      {
        id: 'all_access',
        name: bi('All access', 'وصول كامل'),
        entitlement: bi(
          'Everything Connect Cortex offers for your university and year. Trial access remains an onboarding state, not a plan you buy.',
          'كل ما يقدمه Connect Cortex لجامعتك وسنتك. الوصول التجريبي حالة بدء، وليس خطة تُشترى.',
        ),
        features: featuresForColumn(0),
        prices: { month: 400, term: 1000 },
        featured: true,
        badge: bi('Best value', 'الأكثر قيمة'),
        cta: bi('Subscribe', 'اشترك'),
        prominence: 'primary',
        active: true,
        ...OPEN,
      },
    ],
  }
}

/** The shape the previous admin-editable plan list was stored in. */
export interface LegacyPlanDef {
  id: string
  name: string
  priceEGP: number
  priceLabel?: string
  active: boolean
  universityIds?: string[]
  years?: string[]
}

/**
 * Carry an admin's own plans into the new catalogue.
 *
 * Anything they added to the old list that the seed does not already know about
 * is kept rather than dropped, as a secondary offer priced by the month. Its
 * Arabic is set to its English: there is no translation to invent, and showing
 * the English is honest where showing nothing would look like a bug.
 */
export function carryOverLegacyPlans(catalog: PlanCatalog, legacy: readonly LegacyPlanDef[]): PlanCatalog {
  const known = new Set(catalog.plans.map((plan) => plan.id))
  const extra: CatalogPlan[] = legacy
    .filter((plan) => !known.has(plan.id) && plan.name.trim().length > 0)
    .map((plan) => ({
      id: plan.id,
      name: bi(plan.name, plan.name),
      entitlement: bi(plan.priceLabel ?? '', plan.priceLabel ?? ''),
      features: [],
      prices: { month: plan.priceEGP },
      cta: bi('Subscribe', 'اشترك'),
      prominence: 'secondary' as const,
      active: plan.active,
      universityIds: plan.universityIds ?? [],
      years: plan.years ?? [],
    }))

  return extra.length ? { ...catalog, plans: [...catalog.plans, ...extra] } : catalog
}

/**
 * The catalogue to use: what was stored, or a fresh seed with any older
 * admin-added plans folded in.
 */
export function resolvePlanCatalog(stored: PlanCatalog | null, legacy: readonly LegacyPlanDef[] = []): PlanCatalog {
  if (stored?.plans?.length) return stored
  return carryOverLegacyPlans(initialPlanCatalog(), legacy)
}
