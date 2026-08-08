import { universities, YEARS } from './universities'
import { API_MODE } from '@/lib/api'
import type { PlanTier } from './students'

export interface PlanDef {
  id: string
  name: string
  /** Monthly-equivalent price in EGP used for revenue reporting. */
  priceEGP: number
  /** Display price string (may include cadences). */
  priceLabel: string
  active: boolean
  /** University IDs this plan is offered to (empty = all). */
  universityIds: string[]
  /** Year labels this plan is offered to (empty = all). */
  years: string[]
}

export const PLANS_STORAGE_KEY = 'synapse-plans-v1'

export const initialPlans: PlanDef[] = API_MODE ? [] : [
  { id: 'free', name: 'Free', priceEGP: 0, priceLabel: 'EGP 0', active: true, universityIds: [], years: [] },
  { id: 'qbank', name: 'QBank', priceEGP: 99, priceLabel: 'EGP 99 / mo · 249 / 3mo · 799 / yr', active: true, universityIds: [], years: [] },
  { id: 'adaptive', name: 'Adaptive', priceEGP: 199, priceLabel: 'EGP 199 / mo · 499 / 3mo · 1,499 / yr', active: true, universityIds: [], years: [] },
  { id: 'adaptive-addon', name: 'Adaptive add-on', priceEGP: 79, priceLabel: 'EGP 79 / mo · 199 / term', active: true, universityIds: [], years: [] },
  { id: 'exam-sprint', name: 'Exam Sprint', priceEGP: 249, priceLabel: 'EGP 249 / 30 days', active: true, universityIds: [], years: [] },
]

/** Map a student's plan tier to a monthly price using the current plan catalog. */
export function priceForTier(plans: PlanDef[], tier: PlanTier): number {
  return plans.find((p) => p.name === tier)?.priceEGP ?? 0
}

export const ALL_UNIVERSITIES = universities.map((u) => ({ id: u.id, short: u.short }))
export const ALL_YEARS = YEARS
