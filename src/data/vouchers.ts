export type VoucherDiscountType = 'Percentage' | 'Fixed amount'

export interface Voucher {
  id: string
  code: string
  name: string
  discountType: VoucherDiscountType
  amount: number
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

export function voucherDiscount(voucher: Voucher, price: number) {
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
export function voucherEligibility(voucher: Voucher, profile: AudienceProfile) {
  const now = Date.now()
  if (!voucher.active) return 'This voucher is not active.'
  if (new Date(voucher.startsAt).getTime() > now) return 'This voucher is not available yet.'
  if (new Date(voucher.expiresAt).getTime() < now) return 'This voucher has expired.'
  if (voucher.maxRedemptions > 0 && voucher.redemptionCount >= voucher.maxRedemptions) return 'This voucher has reached its redemption limit.'
  if (voucher.universityIds.length > 0 && !voucher.universityIds.includes(profile.universityId)) return 'This voucher is not available for your university.'
  if (voucher.years.length > 0 && !voucher.years.includes(profile.year)) return 'This voucher is not available for your year.'
  if (voucher.groups.length > 0 && !voucher.groups.includes(profile.group)) return 'This voucher is not available for your group.'
  return null
}
