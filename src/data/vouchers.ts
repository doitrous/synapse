import { findYearByLabel, isYearLive, type University } from './universities.ts'

export type VoucherDiscountType = 'Percentage' | 'Fixed amount'

/**
 * What redeeming a voucher actually gives.
 *
 * Absent means a discount, so every voucher written before trials existed keeps
 * behaving exactly as it did.
 */
export type VoucherGrantKind = 'Discount' | 'Full-access trial'

/** The trial length the platform offers, and the default a new trial voucher takes. */
export const DEFAULT_TRIAL_DAYS = 3

export interface Voucher {
  id: string
  code: string
  name: string
  discountType: VoucherDiscountType
  amount: number
  /** What redeeming gives. Absent means `'Discount'`. */
  grant?: VoucherGrantKind
  /** Days of full access when `grant` is a trial. Ignored otherwise. */
  trialDays?: number
  active: boolean
  startsAt: string
  expiresAt: string
  maxRedemptions: number
  redemptionCount: number
  universityIds: string[]
  years: string[]
  groups: string[]
  createdAt: string
  updatedAt: string
}

export const VOUCHER_STORAGE_KEY = 'synapse-vouchers-v1'
export const APPLIED_VOUCHER_STORAGE_KEY = 'synapse-applied-voucher-v1'

export const initialVouchers: Voucher[] = [
  {
    id: 'voucher-welcome',
    code: 'WELCOME20',
    name: 'New student welcome offer',
    discountType: 'Percentage',
    amount: 20,
    active: true,
    startsAt: new Date(2026, 7, 1, 0, 0).toISOString(),
    expiresAt: new Date(2026, 8, 30, 23, 59).toISOString(),
    maxRedemptions: 500,
    redemptionCount: 143,
    universityIds: [],
    years: [],
    groups: [],
    createdAt: new Date(2026, 6, 20, 11, 0).toISOString(),
    updatedAt: new Date(2026, 6, 20, 11, 0).toISOString(),
  },
]

export function isTrialVoucher(voucher: Voucher): boolean {
  return voucher.grant === 'Full-access trial'
}

/** Days of full access this voucher grants, or 0 when it is a discount. */
export function voucherTrialDays(voucher: Voucher): number {
  if (!isTrialVoucher(voucher)) return 0
  const days = Math.floor(voucher.trialDays ?? DEFAULT_TRIAL_DAYS)
  return days > 0 ? days : DEFAULT_TRIAL_DAYS
}

/** When a trial redeemed at `from` runs out, or null for a discount voucher. */
export function trialEndsAt(voucher: Voucher, from: Date): Date | null {
  const days = voucherTrialDays(voucher)
  if (!days) return null
  const end = new Date(from)
  end.setDate(end.getDate() + days)
  return end
}

/**
 * Money off the price.
 *
 * A trial takes nothing off: it opens the whole platform for a few days and
 * then ends. Returning its `amount` here would show a student a discount they
 * were never given.
 */
export function voucherDiscount(voucher: Voucher, price: number) {
  if (isTrialVoucher(voucher)) return 0
  return voucher.discountType === 'Percentage'
    ? Math.min(price, price * (voucher.amount / 100))
    : Math.min(price, voucher.amount)
}

/** The three facts a targeted rule is written against. */
export interface AudienceProfile {
  universityId: string
  year: string
  group: string
}

/**
 * Why this voucher is not for this student, or null when it is.
 *
 * The audience is passed in rather than looked up. It comes from the signed-in
 * account, and a function that fetched it would have to be a hook — which the
 * admin voucher screens, which check eligibility against a chosen cohort rather
 * than against the viewer, could not call.
 *
 * A restriction the student cannot satisfy fails closed. If a voucher names
 * universities and we do not know theirs, the answer is no: guessing yes would
 * hand a targeted discount to whoever asked.
 */
export function voucherEligibility(voucher: Voucher, profile: AudienceProfile, catalogue?: University[]) {
  const now = Date.now()
  if (!voucher.active) return 'This voucher is not active.'
  if (new Date(voucher.startsAt).getTime() > now) return 'This voucher is not available yet.'
  if (new Date(voucher.expiresAt).getTime() < now) return 'This voucher has expired.'
  if (voucher.maxRedemptions > 0 && voucher.redemptionCount >= voucher.maxRedemptions) return 'This voucher has reached its redemption limit.'
  if (voucher.universityIds.length > 0 && !voucher.universityIds.includes(profile.universityId)) return 'This voucher is not available for your university.'
  if (voucher.years.length > 0 && !voucher.years.includes(profile.year)) return 'This voucher is not available for your year.'
  if (voucher.groups.length > 0 && !voucher.groups.includes(profile.group)) return 'This voucher is not available for your group.'

  // A voucher may only be redeemed into a place that is actually open. The
  // catalogue is optional because the admin screens test a chosen cohort
  // against rules rather than against a live enrolment; when it is supplied, a
  // university or year that is switched off refuses the code — the same
  // fail-closed rule the targeting checks above follow.
  if (catalogue) {
    const university = catalogue.find((candidate) => candidate.id === profile.universityId)
    if (!university) return 'This voucher is not available for your university.'
    const year = findYearByLabel(university, profile.year)
    if (!year) return 'This voucher is not available for your year.'
    if (university.active === false) return 'This voucher is not available for your university right now.'
    if (!isYearLive(university, year)) return 'This voucher is not available for your year right now.'
  }

  return null
}
