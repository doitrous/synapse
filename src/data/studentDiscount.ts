/**
 * The student-ID discount, and whether students are asked for one at all.
 *
 * Deliberately absent from onboarding. Asking a stranger to upload an identity
 * document before they have seen the product is the wrong first request, so
 * this is offered later, from Billing, and only when an administrator has
 * switched it on. Off by default: until then no student can tell it exists.
 */

export interface StudentIdDiscount {
  /** Whether the upload is offered to students at all. */
  enabled: boolean
  /** Percent off, applied once an administrator has accepted the document. */
  percent: number
}

export const STUDENT_ID_DISCOUNT_STORAGE_KEY = 'synapse-student-id-discount-v1'

export const DEFAULT_STUDENT_ID_DISCOUNT: StudentIdDiscount = { enabled: false, percent: 5 }

/** A percent that is actually a discount: whole, above zero, at most everything. */
export function normaliseDiscountPercent(value: number | string): number {
  const parsed = typeof value === 'number' ? value : Number(String(value).trim())
  if (!Number.isFinite(parsed)) return 0
  return Math.min(100, Math.max(0, Math.floor(parsed)))
}

/**
 * What the discount takes off a price, or nothing.
 *
 * Nothing while the offer is switched off, and nothing while the document is
 * still being reviewed — a discount shown before it has been granted is a
 * number the invoice will disagree with.
 */
export function studentIdDiscountAmount(
  setting: StudentIdDiscount,
  price: number,
  accepted: boolean,
): number {
  if (!setting.enabled || !accepted || price <= 0) return 0
  return Math.min(price, price * (normaliseDiscountPercent(setting.percent) / 100))
}

export type StudentIdStatus = 'none' | 'review' | 'accepted' | 'rejected'

export interface StudentIdSubmission {
  filename: string
  uploadedAt: string
  status: StudentIdStatus
}

export const STUDENT_ID_SUBMISSION_STORAGE_KEY = 'synapse.account.student-id.v1'

export const STUDENT_ID_STATUS_LABEL: Record<StudentIdStatus, string> = {
  none: 'Not submitted',
  review: 'Awaiting review',
  accepted: 'Accepted',
  rejected: 'Not accepted',
}
