/**
 * The shape of a calendar, as arithmetic.
 *
 * Which day a week begins on is a real curriculum question, not a formatting
 * detail: this app's students study on a Saturday-to-Friday week, and the month
 * header, the week view and every date picker have to agree about it or the
 * same date sits in two different columns. That agreement lives here, where it
 * can be tested without a browser.
 */

/** `Date.getDay()` values: Sunday is 0. */
export type WeekStart = 0 | 1 | 6

export const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const

/** Saturday. The academic week these students actually keep. */
export const DEFAULT_WEEK_START: WeekStart = 6

const DAYS = 7
const MONTH_CELLS = 42

export function addDays(date: Date, amount: number): Date {
  const copy = new Date(date)
  copy.setDate(copy.getDate() + amount)
  return copy
}

export function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
}

/** Midnight on the first day of the week containing `date`. */
export function startOfWeek(date: Date, weekStart: WeekStart): Date {
  const copy = new Date(date)
  copy.setHours(0, 0, 0, 0)
  copy.setDate(copy.getDate() - ((copy.getDay() - weekStart + DAYS) % DAYS))
  return copy
}

/** Column headings in the order the grid draws them. */
export function weekdayLabels(weekStart: WeekStart): string[] {
  return Array.from({ length: DAYS }, (_, i) => WEEKDAY_LABELS[(weekStart + i) % DAYS])
}

/** The seven days of the week containing `anchor`. */
export function weekDays(anchor: Date, weekStart: WeekStart): Date[] {
  const first = startOfWeek(anchor, weekStart)
  return Array.from({ length: DAYS }, (_, i) => addDays(first, i))
}

/**
 * Six weeks of cells covering `anchor`'s month.
 *
 * Always 42 so the grid does not change height from month to month — a shifting
 * calendar makes the page jump under the pointer.
 */
export function monthGrid(anchor: Date, weekStart: WeekStart): Date[] {
  const firstOfMonth = new Date(anchor.getFullYear(), anchor.getMonth(), 1)
  const first = startOfWeek(firstOfMonth, weekStart)
  return Array.from({ length: MONTH_CELLS }, (_, i) => addDays(first, i))
}
