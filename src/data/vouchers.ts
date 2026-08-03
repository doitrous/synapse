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

export const VOUCHER_STORAGE_KEY = 'osler-vouchers-v1'
export const APPLIED_VOUCHER_STORAGE_KEY = 'osler-applied-voucher-v1'

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

export function voucherEligibility(voucher: Voucher, profile = currentStudentAudience()) {
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

export function currentStudentAudience() {
  return { universityId: 'oms', year: 'Year 3', group: 'Cardiovascular block' }
}
