/**
 * `HH:MM` as a value that can be typed at, not only picked from a list.
 *
 * Study blocks store a plain `"17:00"` string and always have, so this reads
 * and writes that string rather than replacing it with a richer type. What it
 * adds is tolerance: someone entering a start time types `9`, `930`, `9.30` or
 * `9:30 pm`, and every one of those means something unambiguous.
 */

import { formatTimeString } from './format.ts'

export const MINUTES_IN_DAY = 24 * 60

/** Minutes since midnight, or null when the text does not name a time. */
export function parseTime(value: string): number | null {
  const text = value.trim().toLowerCase()
  if (!text) return null

  const meridiem = /(^|[^a-z])(a\.?m\.?|p\.?m\.?)$/.exec(text)?.[2]?.[0]
  const digits = text.replace(/[^0-9]/g, '')
  const separated = /[:.\s]/.test(text)
  if (!digits) return null

  let hour: number
  let minute: number
  if (separated) {
    const [rawHour = '', rawMinute = ''] = text.replace(/[^0-9:.\s]/g, '').trim().split(/[:.\s]+/)
    hour = Number(rawHour)
    minute = rawMinute === '' ? 0 : Number(rawMinute)
  } else if (digits.length <= 2) {
    hour = Number(digits)
    minute = 0
  } else {
    // `930` is half past nine; `1745` is a quarter to six.
    hour = Number(digits.slice(0, digits.length - 2))
    minute = Number(digits.slice(-2))
  }

  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return null
  if (minute > 59) return null

  if (meridiem === 'p' && hour < 12) hour += 12
  if (meridiem === 'a' && hour === 12) hour = 0
  // 24:00 is a legitimate way to type midnight; anything past it is a typo.
  if (hour === 24 && minute === 0) return 0
  if (hour > 23) return null

  return hour * 60 + minute
}

/** Minutes since midnight as `HH:MM`, wrapping across midnight. */
export function formatTime(minutes: number): string {
  const wrapped = ((Math.round(minutes) % MINUTES_IN_DAY) + MINUTES_IN_DAY) % MINUTES_IN_DAY
  const hour = Math.floor(wrapped / 60)
  const minute = wrapped % 60
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

/** Whatever was typed, as `HH:MM` — or null if it named no time. */
export function normalizeTime(value: string): string | null {
  const minutes = parseTime(value)
  return minutes === null ? null : formatTime(minutes)
}

/** Minutes since midnight for a stored `HH:MM`, zero if it is unreadable. */
export function minutesOf(value: string): number {
  return parseTime(value) ?? 0
}

export function addMinutes(value: string, delta: number): string {
  return formatTime(minutesOf(value) + delta)
}

/** The parts a 12-hour picker shows. Midnight and noon both read as 12. */
export function to12Hour(value: string): { hour: number; minute: number; meridiem: 'AM' | 'PM' } {
  const total = minutesOf(value)
  const hour24 = Math.floor(total / 60)
  return {
    hour: hour24 % 12 === 0 ? 12 : hour24 % 12,
    minute: total % 60,
    meridiem: hour24 < 12 ? 'AM' : 'PM',
  }
}

/**
 * `"5:30 PM"` — the label on the field, independent of what is stored.
 *
 * One clock renderer for the whole product: `formatTimeString` in `lib/format`.
 * All this adds is tolerance — anything unreadable normalises to midnight
 * rather than reaching `Intl` as an invalid date.
 */
export function formatTimeLabel(value: string): string {
  return formatTimeString(formatTime(minutesOf(value)))
}
