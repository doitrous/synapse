/**
 * The two things that identify an account, and what makes two of them the same.
 *
 * Sign-up asked for a name and an email and stopped, and only the email was
 * unique. A phone number is now required and unique too — which only means
 * anything if `0100 123 4567`, `+20 100 123 4567` and `0020-100-123-4567` are
 * recognised as one number. A uniqueness check that compared what was typed
 * would not have noticed, and the second registration would have gone through.
 *
 * Nothing here verifies a phone. It is collected and made unique; email stays
 * the channel that is actually proven.
 */

/** Egypt's country code, used to read a local `01…` number as its full form. */
const DEFAULT_COUNTRY = '20'

/**
 * A phone number reduced to what makes it that number, or null if it is not one.
 *
 * Spacing, hyphens, brackets and dots carry no meaning and are dropped. A
 * leading `00` is the same instruction as a leading `+`. A local number written
 * with a trunk `0` is the same number as its international form, so the `0` is
 * replaced by the country code rather than being kept — otherwise one person
 * holds two numbers and can register twice.
 */
export function normalisePhone(raw: string | null | undefined): string | null {
  if (!raw) return null
  let value = String(raw).replace(/[\s()\-. ]/g, '')
  if (!value) return null

  if (value.startsWith('00')) value = `+${value.slice(2)}`
  const international = value.startsWith('+')
  const digits = international ? value.slice(1) : value
  if (!/^\d+$/.test(digits)) return null

  const full = international
    ? digits
    : digits.startsWith('0')
      ? `${DEFAULT_COUNTRY}${digits.slice(1)}`
      : digits

  // Short enough to be a typo rather than a number, or long enough to be one of
  // several run together. E.164 allows fifteen digits at most.
  if (full.length < 8 || full.length > 15) return null
  return `+${full}`
}

/** An email reduced to what makes it that address. */
export function normaliseEmail(raw: string | null | undefined): string | null {
  if (!raw) return null
  const value = String(raw).trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return null
  return value
}

/** How a person is written down. Either field may be missing on an older record. */
export interface AccountIdentity {
  email?: string | null
  phone?: string | null
}

export interface IdentityConflict {
  field: 'email' | 'phone'
  /** What the visitor typed, so the sign-in page can be filled in with it. */
  value: string
}

/**
 * Whether this person already has an account, and which field says so.
 *
 * Email is checked first because it is the field someone is most likely to
 * remember signing up with, and it is the one the sign-in page takes.
 *
 * A malformed value is not a conflict — it is a validation problem, answered by
 * the form rather than here. Saying "that number is taken" about something that
 * is not a number would send someone to a sign-in page they cannot use.
 */
export function findIdentityConflict(
  existing: readonly AccountIdentity[],
  candidate: { email?: string; phone?: string },
): IdentityConflict | null {
  const email = normaliseEmail(candidate.email)
  const phone = normalisePhone(candidate.phone)

  if (email && existing.some((entry) => normaliseEmail(entry.email) === email)) {
    return { field: 'email', value: candidate.email!.trim() }
  }
  if (phone && existing.some((entry) => normalisePhone(entry.phone) === phone)) {
    return { field: 'phone', value: candidate.phone!.trim() }
  }
  return null
}

/** Where to send someone who already has an account, with the field filled in. */
export function signInPathFor(conflict: IdentityConflict): string {
  return `/login?${conflict.field}=${encodeURIComponent(conflict.value)}`
}

export const CONFLICT_MESSAGE: Record<IdentityConflict['field'], string> = {
  email: 'That email is already registered. Sign in instead — we have filled it in for you.',
  phone: 'That phone number is already registered. Sign in instead — we have filled in the account it belongs to.',
}

/**
 * The only rule a password has to satisfy.
 *
 * One number, in one place, read by sign-up and by the reset form. Two
 * different minimums would mean a password accepted at registration could be
 * refused when the same person came back to change it.
 */
export const MIN_PASSWORD = 6
