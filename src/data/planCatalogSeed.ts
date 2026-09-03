import {
  MARISTANA_PLAN_ID,
  PLAN_CATALOG_SCHEMA_VERSION,
  type Bilingual,
  type BillingPeriodDef,
  type CatalogPlan,
  type PlanCatalog,
  type PlanFeature,
} from './planCatalog.ts'

/**
 * The catalogue Nishany starts with, and how an older one is carried into it.
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
 * Billing periods.
 *
 * `quarterly` became `term`, which is what an academic year is actually divided
 * into. The year is shown without a price and marked coming soon, so it can be
 * announced without inventing an offer.
 */
export const SEED_PERIODS: BillingPeriodDef[] = [
  { id: 'month', label: bi('1 month', 'شهر واحد'), billedAs: bi('billed monthly', 'تُحصَّل شهريًا'), months: 1 },
  { id: 'term', label: bi('1 term', 'فصل دراسي'), billedAs: bi('billed each term', 'تُحصَّل كل فصل'), months: 3 },
  { id: 'year', label: bi('1 year', 'سنة'), billedAs: bi('billed yearly', 'تُحصَّل سنويًا'), months: 12, comingSoon: true },
]

/** A cell in the comparison: has it, does not, or has it with a qualification. */
type Cell = boolean | Bilingual

const STUDYING = bi('Studying', 'المذاكرة')
const PLANNING = bi('Planning and review', 'التخطيط والمراجعة')
const TOOLS = bi('Tools', 'الأدوات')

/**
 * What each tier includes, in column order: Free, QBank, Adaptive.
 *
 * Declared once and inverted below. Writing it per plan would mean stating the
 * same fifteen labels three times, in two languages, and keeping them aligned by
 * hand — which is how the table and the plans drifted apart in the first place.
 */
const MATRIX: Array<{ group: Bilingual; label: Bilingual; values: [Cell, Cell, Cell] }> = [
  { group: STUDYING, label: bi('Library and verified sources', 'المكتبة والمصادر الموثّقة'), values: [bi('Limited', 'محدود'), true, true] },
  { group: STUDYING, label: bi('Questions a day', 'أسئلة يوميًا'), values: [bi('10', '١٠'), bi('Unlimited', 'بلا حد'), bi('Unlimited', 'بلا حد')] },
  { group: STUDYING, label: bi('A rationale for every option', 'شروح لكل خيار'), values: [true, true, true] },
  { group: STUDYING, label: bi('Review after you submit', 'مراجعة بعد التسليم'), values: [false, true, true] },
  { group: STUDYING, label: bi('Custom blocks by system and topic', 'كتل مخصّصة حسب الجهاز والموضوع'), values: [false, true, true] },
  { group: STUDYING, label: bi('Adaptive blocks aimed at your weak points', 'كتل تكيّفية حسب نقاط ضعفك'), values: [false, false, true] },

  { group: PLANNING, label: bi('Calendar and your plan', 'التقويم وخطتك'), values: [true, true, true] },
  { group: PLANNING, label: bi('Spaced review', 'مراجعة متباعدة'), values: [false, bi('Basic', 'أساسية'), true] },
  { group: PLANNING, label: bi('A generated study plan', 'خطة دراسة مولّدة'), values: [false, false, true] },
  { group: PLANNING, label: bi('Exam readiness assessments', 'تقييمات جاهزية للامتحان'), values: [false, false, true] },

  { group: TOOLS, label: bi('PDF reader and editor', 'قارئ ومحرّر PDF'), values: [true, true, true] },
  { group: TOOLS, label: bi('Your own uploaded documents', 'مستنداتك المرفوعة'), values: [bi('One file', 'ملف واحد'), true, true] },
  { group: TOOLS, label: bi('Notebook and whiteboard', 'دفتر الملاحظات والسبورة'), values: [true, true, true] },
  { group: TOOLS, label: bi('Study Together', 'الدراسة الجماعية'), values: [bi('As a guest', 'ضيف'), true, true] },
  { group: TOOLS, label: bi('Analytics', 'التحليلات'), values: [bi('Basic', 'أساسية'), bi('Basic', 'أساسية'), bi('Detailed', 'مفصّلة')] },
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

/**
 * The complete membership is deliberately described as suites rather than
 * tiers. These lines feed the admin and Billing surfaces as well as the public
 * offer, so no one has to infer whether a capability is included.
 */
const MARISTANA_FEATURES: PlanFeature[] = [
  { group: bi('Your curriculum', 'منهجك الدراسي'), label: bi('University schedule, modules and finals', 'جدول الجامعة والمقررات والامتحانات النهائية') },
  { group: bi('Your curriculum', 'منهجك الدراسي'), label: bi('Personal calendar and daily plan', 'تقويمك الشخصي وخطتك اليومية') },
  { group: bi('Practice Suite', 'مجموعة التدريب'), label: bi('MCQs, clinical cases, labs, imaging and essay practice', 'أسئلة اختيار وحالات سريرية ومعامل وأشعة وتدريب مقالي') },
  { group: bi('Practice Suite', 'مجموعة التدريب'), label: bi('OSCE stations and virtual microscope', 'محطات OSCE والميكروسكوب الافتراضي') },
  { group: bi('Adaptive study', 'المذاكرة التكيّفية'), label: bi('Concept mastery and targeted review', 'إتقان المفاهيم والمراجعة الموجّهة') },
  { group: bi('Adaptive study', 'المذاكرة التكيّفية'), label: bi('Deep performance reports and anonymous cohort comparison', 'تقارير أداء متعمقة ومقارنة مجهولة مع الدفعة') },
  { group: bi('Study workspace', 'مساحة المذاكرة'), label: bi('Synced PDF reader, notes, notebook and whiteboard', 'قارئ PDF متزامن وملاحظات ودفتر وسبورة') },
  { group: bi('Study with people', 'ذاكر مع الآخرين'), label: bi('Study buddies, shared work and study parties', 'زملاء مذاكرة ومحتوى مشترك وجلسات جماعية') },
  { group: bi('Study with people', 'ذاكر مع الآخرين'), label: bi('Pomodoro, challenges, minigames and Grow', 'بومودورو وتحديات وألعاب قصيرة وGrow') },
]

export function initialPlanCatalog(): PlanCatalog {
  return {
    schemaVersion: PLAN_CATALOG_SCHEMA_VERSION,
    periods: structuredClone(SEED_PERIODS),
    plans: [
      {
        id: 'free',
        name: bi('Free', 'مجاني'),
        // The old copy promised a seven-day trial. It is three days now, and a
        // price page that overstates what it gives is worse than a plain one.
        entitlement: bi(
          'A diagnostic and 10 questions a day, after a 3-day full trial — no card required.',
          'تشخيص أولي و١٠ أسئلة يوميًا، بعد تجربة كاملة ٣ أيام — دون بطاقة.',
        ),
        features: featuresForColumn(0),
        prices: { month: 0 },
        cta: bi('Start free', 'ابدأ مجانًا'),
        prominence: 'primary',
        // Free is the permanent state after the trial, not a second product a
        // new student has to choose beside the complete membership.
        active: false,
        ...OPEN,
      },
      {
        id: MARISTANA_PLAN_ID,
        name: bi('NISHANY', 'NISHANY'),
        entitlement: bi(
          'Complete Nishany access for your university and year, with a 3-day full trial and no card required.',
          'وصول كامل إلى نيشاني لجامعتك وسنتك، مع تجربة كاملة لمدة ٣ أيام دون بطاقة.',
        ),
        features: structuredClone(MARISTANA_FEATURES),
        prices: { month: 400, term: 1000 },
        promo: {
          month: { enabled: true, percentOff: 25 },
          term: { enabled: true, percentOff: 30 },
        },
        featured: true,
        badge: bi('Complete membership', 'العضوية الكاملة'),
        cta: bi('Start 3 days free', 'ابدأ ٣ أيام مجانًا'),
        prominence: 'primary',
        active: true,
        ...OPEN,
      },
      {
        id: 'qbank',
        name: bi('QBank', 'بنك الأسئلة'),
        entitlement: bi(
          'The full approved question bank, custom blocks, explanations, bookmarks and notes, and basic progress.',
          'بنك الأسئلة المعتمد كاملًا، كتل مخصّصة، شروح، إشارات وملاحظات، وتقدّم أساسي.',
        ),
        features: featuresForColumn(1),
        prices: { month: 99, term: 249, year: 799 },
        cta: bi('Subscribe', 'اشترك'),
        prominence: 'primary',
        active: false,
        ...OPEN,
      },
      {
        id: 'adaptive',
        name: bi('Adaptive', 'Adaptive'),
        entitlement: bi(
          'Everything above, plus adaptive blocks, a study plan, spaced review, readiness assessments and richer analytics.',
          'كل ما سبق، مع كتل تكيّفية وخطة دراسة ومراجعة متباعدة وتقييمات جاهزية وتحليلات أغنى.',
        ),
        features: featuresForColumn(2),
        prices: { month: 199, term: 499, year: 1499 },
        featured: true,
        badge: bi('Best value', 'الأكثر قيمة'),
        cta: bi('Subscribe', 'اشترك'),
        prominence: 'primary',
        active: false,
        ...OPEN,
      },
      {
        id: 'addon',
        name: bi('Adaptive add-on', 'إضافة Adaptive'),
        entitlement: bi(
          'Adds Adaptive to an eligible current course without paying twice for overlapping content.',
          'أضِف Adaptive إلى اشتراك حالي مؤهّل دون دفع مرتين عن المحتوى المتداخل.',
        ),
        features: [],
        prices: { month: 79, term: 199 },
        cta: bi('Add on', 'أضِف'),
        prominence: 'secondary',
        active: false,
        ...OPEN,
      },
      {
        id: 'sprint',
        name: bi('Exam Sprint', 'Exam Sprint'),
        entitlement: bi(
          'One defined exam scope: a compressed plan, mocks, adaptive repair and sprint analytics.',
          'نطاق امتحان واحد محدّد: خطة مكثّفة، اختبارات محاكاة، إصلاح تكيّفي، وتحليلات السبرنت.',
        ),
        features: [],
        prices: { month: 249 },
        fixedPeriod: bi('/ 30 days', '/ ٣٠ يومًا'),
        cta: bi('Start a sprint', 'ابدأ سبرنت'),
        prominence: 'secondary',
        active: false,
        ...OPEN,
      },
      {
        id: 'campus',
        name: bi('Campus / cohort', 'المؤسسات / الدفعات'),
        entitlement: bi(
          'Institution-wide access and analytics, priced per student.',
          'وصول وتحليلات على مستوى الجامعة أو الدفعة، بتسعير لكل طالب.',
        ),
        features: [],
        prices: {},
        quoted: bi('Quoted', 'حسب الطلب'),
        cta: bi('Start, then talk to us', 'ابدأ ثم تواصل معنا'),
        prominence: 'secondary',
        active: false,
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
      // Legacy admin offers remain resolvable, but Nishany is the only new
      // paid offer. Their original active state is historical data, not a
      // licence to surface another acquisition card after the migration.
      active: false,
      universityIds: plan.universityIds ?? [],
      years: plan.years ?? [],
    }))

  return extra.length ? { ...catalog, plans: [...catalog.plans, ...extra] } : catalog
}

/** The unversioned shape persisted before the Nishany launch. */
export type StoredPlanCatalog = Omit<PlanCatalog, 'schemaVersion'> & { schemaVersion?: number }

/**
 * Upgrade an unversioned tier catalogue without deleting anything it referred
 * to. Old plan ids, names and prices remain intact for subscription lookup and
 * finance history; only their availability to new students is switched off.
 */
export function migratePlanCatalog(stored: StoredPlanCatalog): PlanCatalog {
  const seed = initialPlanCatalog()
  const seedById = new Map(seed.plans.map((plan) => [plan.id, plan]))

  const free = seedById.get('free')!
  const maristana = seedById.get(MARISTANA_PLAN_ID)!
  const retained = stored.plans
    .filter((plan) => plan.id !== 'free' && plan.id !== MARISTANA_PLAN_ID)
    .map((plan) => ({ ...plan, active: false }))
  const retainedIds = new Set(retained.map((plan) => plan.id))
  const missingHistorical = seed.plans.filter((plan) => (
    plan.id !== 'free'
    && plan.id !== MARISTANA_PLAN_ID
    && !retainedIds.has(plan.id)
  ))

  const seedPeriodIds = new Set(seed.periods.map((period) => period.id))
  const extraPeriods = (stored.periods ?? []).filter((period) => !seedPeriodIds.has(period.id))

  return {
    schemaVersion: PLAN_CATALOG_SCHEMA_VERSION,
    periods: [...structuredClone(seed.periods), ...structuredClone(extraPeriods)],
    plans: [
      // The canonical sampler and launch offer intentionally win over an old
      // admin edit: their public price, trial and scope are launch facts.
      structuredClone(free),
      structuredClone(maristana),
      ...retained,
      ...missingHistorical,
    ],
  }
}

/**
 * The catalogue to use: what was stored, or a fresh seed with any older
 * admin-added plans folded in.
 */
export function resolvePlanCatalog(stored: StoredPlanCatalog | PlanCatalog | null, legacy: readonly LegacyPlanDef[] = []): PlanCatalog {
  if (stored?.plans?.length) {
    if (stored.schemaVersion === PLAN_CATALOG_SCHEMA_VERSION) return stored as PlanCatalog
    return migratePlanCatalog(stored)
  }
  return carryOverLegacyPlans(initialPlanCatalog(), legacy)
}
