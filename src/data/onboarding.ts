import { defaultModuleId, isYearLive, type CurriculumCourse, type UniYear, type University } from './universities.ts'
import { plansFor, purchasableAt, type CatalogPlan, type PlanCatalog } from './planCatalog.ts'

/**
 * What a new student is asked, and what answering it gives them.
 *
 * The old onboarding was a dismissible modal asking for a university and a year
 * with a "Not now" beside it, which is how accounts ended up with no cohort at
 * all and every scoped surface empty. This asks three questions in order —
 * where you study, which year, which plan — and each answer decides what the
 * next one may offer.
 *
 * A university or year switched off in Academic Setup is not offered. It is the
 * same `isYearLive` the voucher rules read, so a place that cannot take a
 * voucher cannot take a registration either.
 */

/** Full access, for three days, however they arrive. */
export const TRIAL_DAYS = 3

export const ONBOARDING_STORAGE_KEY = 'synapse-onboarding-v1'

/** Universities open to students. */
export function liveUniversities(catalogue: readonly University[]): University[] {
  return catalogue.filter((university) => university.active !== false)
}

/** Years of this university open to students. */
export function liveYears(university: University): UniYear[] {
  return university.years.filter((year) => isYearLive(university, year))
}

export interface OnboardingModule {
  /** The identifier they will recognise from their timetable. */
  id: string
  name: string
  block: string
  term: string
}

/**
 * The modules on a year, for showing before anyone pays.
 *
 * Read-only, and deliberately shown at the point the year is chosen: a student
 * should be able to see what they are signing up to study before they choose a
 * plan, not after.
 */
export function yearModules(year: UniYear): OnboardingModule[] {
  return year.courses.map((course: CurriculumCourse, index) => ({
    id: course.moduleId?.trim() || defaultModuleId(course.name, index + 1),
    name: course.name,
    block: course.block,
    term: course.term || 'Term 1',
  }))
}

/** The plans a student in this cohort is shown. */
export function offeredPlans(catalog: PlanCatalog, audience: { universityId?: string; year?: string }): CatalogPlan[] {
  return plansFor(catalog, 'primary', audience)
}

/** Whether this plan can be chosen at any period the catalogue sells. */
export function planSelectable(catalog: PlanCatalog, plan: CatalogPlan): boolean {
  return catalog.periods.some((period) => purchasableAt(plan, period.id, catalog.periods))
}

export interface OnboardingAnswers {
  universityId: string
  yearId: string
  planId: string
}

/** Whether every question has an answer. All three are required. */
export function onboardingComplete(answers: Partial<OnboardingAnswers> | null | undefined): answers is OnboardingAnswers {
  return Boolean(answers?.universityId && answers?.yearId && answers?.planId)
}

export interface TrialGrant {
  plan: string
  status: 'trialing'
  source: 'trial'
  startedAt: string
  expiresAt: string
}

/**
 * The subscription finishing onboarding writes.
 *
 * `trialing` and `expires_at` are both things the server already understands —
 * `entitlementOf` derives the state and the days left at read time — so nothing
 * has to run for the trial to end on time. The plan they chose is recorded on
 * it, so when the three days lapse they drop to Free with their intent known.
 */
export function trialFor(planId: string, from: Date, days = TRIAL_DAYS): TrialGrant {
  const expires = new Date(from)
  expires.setDate(expires.getDate() + days)
  return {
    plan: planId,
    status: 'trialing',
    source: 'trial',
    startedAt: from.toISOString(),
    expiresAt: expires.toISOString(),
  }
}
