/**
 * Local-day arithmetic, kept pure and away from any clock of its own.
 *
 * A student studying at 11pm and one studying at 1am are on different calendar
 * days regardless of what UTC thinks, and every day-bounded rule in this
 * feature — the new/review caps, bury rollover, true retention's one-review-
 * per-day count, the heatmap's cells — turns on the *student's* local day. So
 * days are `YYYY-MM-DD` strings built from local getters, and callers pass the
 * `Date` in rather than letting these read `Date.now()`, so a test can put the
 * clock anywhere. `useDecks.ts` already computes the day this way; this is the
 * shared, tested version the whole feature uses.
 */

/** Local calendar date as `YYYY-MM-DD` (not UTC). */
export function localDay(now: Date): string {
  return `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`
}

/** Shift a `YYYY-MM-DD` day by whole days, staying on calendar boundaries. */
export function addLocalDays(day: string, delta: number): string {
  const [y, m, d] = day.split('-').map(Number)
  // Constructed at local noon so a ±12h DST shift can never roll the date.
  const shifted = new Date(y, m - 1, d + delta, 12, 0, 0, 0)
  return localDay(shifted)
}

/** Whole days from `from` to `to` (`to - from`); negative when `to` precedes. */
export function daysBetweenDays(from: string, to: string): number {
  return Math.round((dayValue(to) - dayValue(from)) / 86_400_000)
}

/** The local day exactly `n` days after `now`'s day. */
export function localDayPlus(now: Date, n: number): string {
  return addLocalDays(localDay(now), n)
}

function dayValue(day: string): number {
  const [y, m, d] = day.split('-').map(Number)
  return new Date(y, m - 1, d, 12, 0, 0, 0).getTime()
}

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}
