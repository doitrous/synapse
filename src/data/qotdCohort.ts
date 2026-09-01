// src/data/qotdCohort.ts

/** Unsigned 32-bit FNV-1a. seededRandom takes a number, so cohort strings hash here. */
export function hash32(input: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

/** The people/answer cohort key: university id + year LABEL (not year id). */
export function cohortKey(cohort: { universityId: string; year: string }): string {
  return `${cohort.universityId}|${cohort.year}`
}

/**
 * The Africa/Cairo calendar date of an instant, as YYYY-MM-DD.
 *
 * `en-CA` formats as YYYY-MM-DD; forcing the Cairo time zone is what makes a
 * whole cohort roll over at the same wall-clock midnight regardless of where
 * each student's device is.
 */
export function qotdDateInCairo(now: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Cairo',
    year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(now)
}

/** Whole days from 1970-01-01 for a YYYY-MM-DD string (UTC math, no DST drift). */
export function dayNumber(isoDate: string): number {
  const [y, m, d] = isoDate.split('-').map(Number)
  return Math.floor(Date.UTC(y, m - 1, d) / 86_400_000)
}
