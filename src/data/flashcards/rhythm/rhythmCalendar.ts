/**
 * Pure calendar-layout engine for the Study Rhythm panel.
 *
 * Turns a `RhythmDataset`'s day cells into a render-ready grid for the four
 * `RhythmCalendarMode`s (weekly/monthly/yearly/continuous), plus the anchor
 * navigation helpers the controller uses to page/jump the focus. Nothing here
 * reads a clock or does DOM/React work — `now` comes in, days are `YYYY-MM-DD`
 * strings, and all day arithmetic goes through `time.ts` so DST and month/year
 * boundaries are handled the same way as the rest of the app.
 *
 * Weeks are Monday-first (Mon..Sun), matching the rest of the app. A day cell
 * is only ever "muted" for one of two reasons: it's a padding day outside the
 * focused month/year for that mode, or it's outside the dataset's own
 * min/max span (nothing will ever be there). Everything else — including a
 * legitimate in-range day with no activity — renders as a normal (non-muted)
 * cell with `cell: null`.
 */

import type { RhythmDayCell } from './rhythmTypes.ts'
import type { RhythmCalendarMode } from './rhythmSettings.ts'
import { addLocalDays, daysBetweenDays, localDay } from '../time.ts'

export interface CalendarDay {
  day: string // YYYY-MM-DD
  cell: RhythmDayCell | null // null when the dataset has no cell for this day (render as no-data/out-of-range)
  isToday: boolean
  isForecast: boolean // cell?.kind === 'forecast'
  muted: boolean // padding day (outside the focused month, or outside the dataset range)
}

export interface CalendarWeek {
  days: (CalendarDay | null)[] // length 7, index 0=Monday … 6=Sunday; null only for a trimmed edge (weekly never trims → always 7)
  /** Month name when this is the first week that starts a new month (for markers). */
  monthLabel: string | null
}

export interface CalendarLayout {
  /** 'rows' → weeks stacked vertically, weekday = column (weekly, monthly). 'columns' → weeks side by side, weekday = row (yearly, continuous). */
  orientation: 'rows' | 'columns'
  weeks: CalendarWeek[]
  rangeLabel: string // 'Jun 9 – 15', 'June 2026', '2026', 'Mar 2026 – Jul 2026'
  /** Index into weeks of the week containing today; -1 if today is out of the shown range. */
  todayWeekIndex: number
}

const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const
const MONTH_FULL = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

function yearOf(day: string): number {
  return Number(day.slice(0, 4))
}

/** 0-based month index (0=Jan). */
function monthIndex(day: string): number {
  return Number(day.slice(5, 7)) - 1
}

function dayOfMonthOf(day: string): number {
  return Number(day.slice(8, 10))
}

function daysInMonthOf(year: number, monthIdx0: number): number {
  // Day 0 of the *next* month is the last day of this one; noon avoids any DST edge case.
  return new Date(year, monthIdx0 + 1, 0, 12, 0, 0, 0).getDate()
}

/** 0=Monday … 6=Sunday, derived from the platform's local weekday (0=Sun..6=Sat). */
function weekdayMonFirst(day: string): number {
  const [y, m, d] = day.split('-').map(Number)
  const dow = new Date(y, m - 1, d, 12, 0, 0, 0).getDay()
  return (dow + 6) % 7
}

/** The Monday of the Mon..Sun week containing `day`. */
function mondayOf(day: string): string {
  return addLocalDays(day, -weekdayMonFirst(day))
}

function datasetBounds(days: RhythmDayCell[]): [string | null, string | null] {
  if (days.length === 0) return [null, null]
  let min = days[0].day
  let max = days[0].day
  for (const d of days) {
    if (daysBetweenDays(d.day, min) > 0) min = d.day // d.day < min
    if (daysBetweenDays(max, d.day) > 0) max = d.day // d.day > max
  }
  return [min, max]
}

function inDatasetRange(day: string, min: string | null, max: string | null): boolean {
  if (min === null || max === null) return false
  return daysBetweenDays(min, day) >= 0 && daysBetweenDays(day, max) >= 0
}

function makeCalendarDay(
  day: string,
  byDay: Map<string, RhythmDayCell>,
  today: string,
  min: string | null,
  max: string | null,
  focusPadding: boolean,
): CalendarDay {
  const cell = byDay.get(day) ?? null
  const outsideDataset = !inDatasetRange(day, min, max)
  return {
    day,
    cell,
    isToday: day === today,
    isForecast: cell?.kind === 'forecast',
    muted: focusPadding || outsideDataset,
  }
}

/**
 * Build `numWeeks` consecutive Monday-first weeks starting at `startMonday`.
 *
 * `isPadding` marks a day as "outside the focused window" (month for
 * monthly, year for yearly) independent of the dataset-range muting that
 * `makeCalendarDay` always applies.
 *
 * `labelMode: 'firstOnly'` sets `firstLabel` on week 0 only (monthly's
 * explicit rule: the grid always starts with its one focused month, even
 * when week 0's Monday itself is padding from the previous month).
 * `labelMode: 'transition'` labels each week whose Monday's month differs
 * from the previous week's Monday's month (the day before `startMonday`
 * stands in for "previous" at week 0), used by weekly/yearly/continuous.
 */
function buildWeeks(
  startMonday: string,
  numWeeks: number,
  byDay: Map<string, RhythmDayCell>,
  today: string,
  min: string | null,
  max: string | null,
  isPadding: (day: string) => boolean,
  labelMode: 'firstOnly' | 'transition',
  firstLabel: string | null = null,
): CalendarWeek[] {
  const weeks: CalendarWeek[] = []
  let prevMonth = labelMode === 'transition' ? monthIndex(addLocalDays(startMonday, -1)) : -1

  for (let w = 0; w < numWeeks; w++) {
    const weekMonday = addLocalDays(startMonday, w * 7)
    const dayList: CalendarDay[] = []
    for (let i = 0; i < 7; i++) {
      const day = addLocalDays(weekMonday, i)
      dayList.push(makeCalendarDay(day, byDay, today, min, max, isPadding(day)))
    }

    let monthLabel: string | null = null
    if (labelMode === 'firstOnly') {
      monthLabel = w === 0 ? firstLabel : null
    } else {
      const mondayMonth = monthIndex(weekMonday)
      if (mondayMonth !== prevMonth) {
        monthLabel = MONTH_SHORT[mondayMonth]
        prevMonth = mondayMonth
      }
    }
    weeks.push({ days: dayList, monthLabel })
  }
  return weeks
}

/** Number of Monday-first weeks needed to span `startMonday..endSunday` inclusive (always a whole number). */
function weekSpan(startMonday: string, endSunday: string): number {
  return (daysBetweenDays(startMonday, endSunday) + 1) / 7
}

function findWeekIndexForDay(weeks: CalendarWeek[], target: string): number {
  for (let i = 0; i < weeks.length; i++) {
    for (const d of weeks[i].days) {
      if (d && d.day === target) return i
    }
  }
  return -1
}

function formatWeekRangeLabel(monday: string, sunday: string): string {
  const sm = monthIndex(monday)
  const em = monthIndex(sunday)
  const sd = dayOfMonthOf(monday)
  const ed = dayOfMonthOf(sunday)
  if (sm === em && yearOf(monday) === yearOf(sunday)) return `${MONTH_SHORT[sm]} ${sd} – ${ed}`
  return `${MONTH_SHORT[sm]} ${sd} – ${MONTH_SHORT[em]} ${ed}`
}

function formatSpanRangeLabel(start: string, end: string): string {
  return `${MONTH_SHORT[monthIndex(start)]} ${yearOf(start)} – ${MONTH_SHORT[monthIndex(end)]} ${yearOf(end)}`
}

function buildWeekly(
  byDay: Map<string, RhythmDayCell>,
  anchor: string,
  today: string,
  min: string | null,
  max: string | null,
): CalendarLayout {
  const monday = mondayOf(anchor)
  const sunday = addLocalDays(monday, 6)
  const weeks = buildWeeks(monday, 1, byDay, today, min, max, () => false, 'transition')
  return {
    orientation: 'rows',
    weeks,
    rangeLabel: formatWeekRangeLabel(monday, sunday),
    todayWeekIndex: findWeekIndexForDay(weeks, today),
  }
}

function buildMonthly(
  byDay: Map<string, RhythmDayCell>,
  anchor: string,
  today: string,
  min: string | null,
  max: string | null,
): CalendarLayout {
  const focusYear = yearOf(anchor)
  const focusMonth = monthIndex(anchor)
  const firstOfMonth = `${anchor.slice(0, 7)}-01`
  const lastOfMonth = `${anchor.slice(0, 7)}-${pad2(daysInMonthOf(focusYear, focusMonth))}`
  const startMonday = mondayOf(firstOfMonth)
  const endSunday = addLocalDays(mondayOf(lastOfMonth), 6)
  const numWeeks = weekSpan(startMonday, endSunday)

  const isPadding = (day: string) => monthIndex(day) !== focusMonth || yearOf(day) !== focusYear
  const weeks = buildWeeks(startMonday, numWeeks, byDay, today, min, max, isPadding, 'firstOnly', MONTH_SHORT[focusMonth])

  return {
    orientation: 'rows',
    weeks,
    rangeLabel: `${MONTH_FULL[focusMonth]} ${focusYear}`,
    todayWeekIndex: findWeekIndexForDay(weeks, today),
  }
}

function buildYearly(
  byDay: Map<string, RhythmDayCell>,
  anchor: string,
  today: string,
  min: string | null,
  max: string | null,
): CalendarLayout {
  const focusYear = yearOf(anchor)
  const jan1 = `${focusYear}-01-01`
  const dec31 = `${focusYear}-12-31`
  const startMonday = mondayOf(jan1)
  const endSunday = addLocalDays(mondayOf(dec31), 6)
  const numWeeks = weekSpan(startMonday, endSunday)

  const isPadding = (day: string) => yearOf(day) !== focusYear
  const weeks = buildWeeks(startMonday, numWeeks, byDay, today, min, max, isPadding, 'transition')

  return {
    orientation: 'columns',
    weeks,
    rangeLabel: `${focusYear}`,
    todayWeekIndex: findWeekIndexForDay(weeks, today),
  }
}

function buildContinuous(
  byDay: Map<string, RhythmDayCell>,
  today: string,
  min: string | null,
  max: string | null,
): CalendarLayout {
  if (min === null || max === null) {
    return { orientation: 'columns', weeks: [], rangeLabel: '', todayWeekIndex: -1 }
  }
  const startMonday = mondayOf(min)
  const endSunday = addLocalDays(mondayOf(max), 6)
  const numWeeks = weekSpan(startMonday, endSunday)

  // No focus-window padding beyond the dataset's own span — makeCalendarDay's
  // dataset-range check already mutes anything before `min` or after `max`.
  const weeks = buildWeeks(startMonday, numWeeks, byDay, today, min, max, () => false, 'transition')

  return {
    orientation: 'columns',
    weeks,
    rangeLabel: formatSpanRangeLabel(min, max),
    todayWeekIndex: findWeekIndexForDay(weeks, today),
  }
}

export function buildCalendarLayout(input: {
  days: RhythmDayCell[]
  mode: RhythmCalendarMode
  anchor: string
  now: Date
}): CalendarLayout {
  const { days, mode, anchor, now } = input
  const byDay = new Map(days.map((d) => [d.day, d]))
  const today = localDay(now)
  const [min, max] = datasetBounds(days)

  switch (mode) {
    case 'weekly':
      return buildWeekly(byDay, anchor, today, min, max)
    case 'monthly':
      return buildMonthly(byDay, anchor, today, min, max)
    case 'yearly':
      return buildYearly(byDay, anchor, today, min, max)
    case 'continuous':
      return buildContinuous(byDay, today, min, max)
  }
}

function stepMonthAnchor(anchor: string, dir: -1 | 1): string {
  const dom = dayOfMonthOf(anchor)
  let targetMonth = monthIndex(anchor) + dir
  let targetYear = yearOf(anchor)
  if (targetMonth < 0) {
    targetMonth = 11
    targetYear -= 1
  } else if (targetMonth > 11) {
    targetMonth = 0
    targetYear += 1
  }
  const clampedDom = Math.min(dom, daysInMonthOf(targetYear, targetMonth))
  return `${targetYear}-${pad2(targetMonth + 1)}-${pad2(clampedDom)}`
}

function stepYearAnchor(anchor: string, dir: -1 | 1): string {
  const targetYear = yearOf(anchor) + dir
  const month = monthIndex(anchor)
  const clampedDom = Math.min(dayOfMonthOf(anchor), daysInMonthOf(targetYear, month))
  return `${targetYear}-${pad2(month + 1)}-${pad2(clampedDom)}`
}

/** Move the focus anchor one unit for the mode (week/month/year/window). */
export function stepAnchor(mode: RhythmCalendarMode, anchor: string, dir: -1 | 1): string {
  switch (mode) {
    case 'weekly':
      return addLocalDays(anchor, dir * 7)
    case 'monthly':
      return stepMonthAnchor(anchor, dir)
    case 'yearly':
      return stepYearAnchor(anchor, dir)
    case 'continuous':
      // Navigation in continuous is by scrolling, not paging — the controller
      // scrolls to `todayWeekIndex` instead of moving the anchor.
      return anchor
  }
}

/** The anchor that focuses 'today'. */
export function todayAnchor(now: Date): string {
  return localDay(now)
}
