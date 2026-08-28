import { test } from 'node:test'
import assert from 'node:assert/strict'
import { addLocalDays } from '../time.ts'
import { buildCalendarLayout, stepAnchor, todayAnchor, type CalendarLayout, type CalendarWeek } from './rhythmCalendar.ts'
import type { RhythmDayCell, RhythmCellKind } from './rhythmTypes.ts'

// Calendar facts below (day-of-week, days-in-month, Monday-week alignment,
// week counts) were independently derived from plain `Date` arithmetic
// before writing the implementation, not read back out of it.

function mkCell(day: string, kind: RhythmCellKind = 'history', reviews = 0): RhythmDayCell {
  return { day, reviews, timeMs: 0, dueReviews: 0, projectedNew: 0, kind, level: 0 }
}

function daysRange(start: string, end: string, kind: RhythmCellKind = 'history'): RhythmDayCell[] {
  const cells: RhythmDayCell[] = []
  let day = start
  while (true) {
    cells.push(mkCell(day, kind, Number(day.slice(-2))))
    if (day === end) break
    day = addLocalDays(day, 1)
  }
  return cells
}

function flatDays(week: CalendarWeek) {
  return week.days
}

function findTodayWeekIndex(layout: CalendarLayout): number {
  for (let i = 0; i < layout.weeks.length; i++) {
    if (flatDays(layout.weeks[i]).some((d) => d?.isToday)) return i
  }
  return -1
}

// ---------------------------------------------------------------------------
// weekly
// ---------------------------------------------------------------------------

test('weekly: anchor mid-week resolves to the Mon..Sun week, cells matched from the dataset', () => {
  const days = daysRange('2026-06-10', '2026-06-30') // Wed .. following Tue
  const layout = buildCalendarLayout({
    days,
    mode: 'weekly',
    anchor: '2026-06-10', // Wednesday
    now: new Date(2026, 5, 10, 9, 0, 0),
  })

  assert.equal(layout.orientation, 'rows')
  assert.equal(layout.weeks.length, 1)
  const week = layout.weeks[0].days
  assert.equal(week.length, 7)
  const expectedDays = ['2026-06-08', '2026-06-09', '2026-06-10', '2026-06-11', '2026-06-12', '2026-06-13', '2026-06-14']
  assert.deepEqual(week.map((d) => d?.day), expectedDays)

  // June 8-9 precede the dataset's min (June 10) -> no cell, muted.
  assert.equal(week[0]?.cell, null)
  assert.equal(week[0]?.muted, true)
  assert.equal(week[1]?.cell, null)
  assert.equal(week[1]?.muted, true)

  // June 10-14 are in the dataset and within range -> matched cell, not muted.
  for (let i = 2; i < 7; i++) {
    const d = week[i]!
    assert.notEqual(d.cell, null)
    assert.equal(d.cell!.day, d.day)
    assert.equal(d.cell!.reviews, Number(d.day.slice(-2)))
    assert.equal(d.muted, false)
  }

  assert.equal(layout.rangeLabel, 'Jun 8 – 14')
})

test('weekly: rangeLabel crosses months', () => {
  const days = daysRange('2026-06-10', '2026-07-10')
  const layout = buildCalendarLayout({
    days,
    mode: 'weekly',
    anchor: '2026-06-29', // Monday
    now: new Date(2026, 5, 29),
  })
  assert.deepEqual(layout.weeks[0].days.map((d) => d?.day), [
    '2026-06-29', '2026-06-30', '2026-07-01', '2026-07-02', '2026-07-03', '2026-07-04', '2026-07-05',
  ])
  assert.equal(layout.rangeLabel, 'Jun 29 – Jul 5')
})

test('weekly: stepAnchor moves by exactly 7 days', () => {
  assert.equal(stepAnchor('weekly', '2026-06-10', 1), '2026-06-17')
  assert.equal(stepAnchor('weekly', '2026-06-10', -1), '2026-06-03')
})

// ---------------------------------------------------------------------------
// monthly
// ---------------------------------------------------------------------------

test('monthly: January 2026 grid has leading/trailing muted padding, correct week count and today row', () => {
  const days = daysRange('2026-01-01', '2026-01-31')
  const layout = buildCalendarLayout({
    days,
    mode: 'monthly',
    anchor: '2026-01-15',
    now: new Date(2026, 0, 15, 12, 0, 0), // today = Jan 15 (row index 2)
  })

  assert.equal(layout.orientation, 'rows')
  assert.equal(layout.weeks.length, 5) // Jan 1, 2026 is a Thursday -> 5 grid rows
  assert.equal(layout.rangeLabel, 'January 2026')

  const row0 = layout.weeks[0].days
  assert.deepEqual(row0.map((d) => d?.day), [
    '2025-12-29', '2025-12-30', '2025-12-31', '2026-01-01', '2026-01-02', '2026-01-03', '2026-01-04',
  ])
  // Leading padding from December is muted; Jan 1-4 are not.
  assert.deepEqual(row0.slice(0, 3).map((d) => d?.muted), [true, true, true])
  assert.deepEqual(row0.slice(3).map((d) => d?.muted), [false, false, false, false])
  assert.equal(row0[3]?.day, '2026-01-01')
  assert.equal(row0[3]?.muted, false)

  const row4 = layout.weeks[4].days
  assert.deepEqual(row4.map((d) => d?.day), [
    '2026-01-26', '2026-01-27', '2026-01-28', '2026-01-29', '2026-01-30', '2026-01-31', '2026-02-01',
  ])
  // Jan 31 (last of month) is not muted; Feb 1 trailing padding is.
  assert.equal(row4[5]?.day, '2026-01-31')
  assert.equal(row4[5]?.muted, false)
  assert.equal(row4[6]?.day, '2026-02-01')
  assert.equal(row4[6]?.muted, true)

  assert.equal(layout.todayWeekIndex, 2)
  assert.equal(findTodayWeekIndex(layout), 2)
  assert.equal(layout.weeks[0].monthLabel, 'Jan')
  assert.equal(layout.weeks[1].monthLabel, null)
})

test('monthly: stepAnchor crosses months and clamps day-of-month', () => {
  assert.equal(stepAnchor('monthly', '2026-01-31', 1), '2026-02-28') // Feb 2026 has 28 days
  assert.equal(stepAnchor('monthly', '2026-03-31', -1), '2026-02-28')
  assert.equal(stepAnchor('monthly', '2026-01-15', -1), '2025-12-15')
})

// ---------------------------------------------------------------------------
// yearly
// ---------------------------------------------------------------------------

test('yearly: 53 week columns for 2026, Jan 1 / Dec 31 present and non-muted, one marker per month in order', () => {
  const days = daysRange('2026-01-01', '2026-12-31')
  const layout = buildCalendarLayout({
    days,
    mode: 'yearly',
    anchor: '2026-06-15',
    now: new Date(2026, 5, 15),
  })

  assert.equal(layout.orientation, 'columns')
  assert.equal(layout.rangeLabel, '2026')
  assert.equal(layout.weeks.length, 53) // Jan 1 and Dec 31, 2026 are both Thursdays

  let jan1: { muted: boolean } | null = null
  let dec31: { muted: boolean } | null = null
  for (const week of layout.weeks) {
    for (const d of week.days) {
      if (d?.day === '2026-01-01') jan1 = d
      if (d?.day === '2026-12-31') dec31 = d
    }
  }
  assert.ok(jan1, 'Jan 1 should be present in the grid')
  assert.ok(dec31, 'Dec 31 should be present in the grid')
  assert.equal(jan1!.muted, false)
  assert.equal(dec31!.muted, false)

  const markers = layout.weeks.map((w) => w.monthLabel).filter((m): m is string => m !== null)
  assert.deepEqual(markers, ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
})

test('yearly: stepAnchor moves by one year', () => {
  assert.equal(stepAnchor('yearly', '2026-06-15', 1), '2027-06-15')
  assert.equal(stepAnchor('yearly', '2026-06-15', -1), '2025-06-15')
  // Leap-day anchor clamps into a non-leap target year.
  assert.equal(stepAnchor('yearly', '2028-02-29', 1), '2029-02-28')
})

// ---------------------------------------------------------------------------
// continuous
// ---------------------------------------------------------------------------

test('continuous: covers exactly the dataset span, flags forecast days, correct today column, DST-safe weeks', () => {
  // Span crosses a month boundary (Mar -> Apr -> May) and Africa/Cairo's 2026
  // DST start (Apr 24). Last 5 days are forecast, the rest history/today.
  const start = '2026-03-20'
  const end = '2026-05-05'
  const today = '2026-04-24'
  const historyEnd = '2026-04-30'
  const days: RhythmDayCell[] = [
    ...daysRange(start, historyEnd, 'history'),
    ...daysRange(addLocalDays(historyEnd, 1), end, 'forecast'),
  ]

  const layout = buildCalendarLayout({
    days,
    mode: 'continuous',
    anchor: 'unused-in-continuous',
    now: new Date(2026, 3, 24, 8, 0, 0),
  })

  assert.equal(layout.orientation, 'columns')
  assert.equal(layout.rangeLabel, 'Mar 2026 – May 2026')

  const byDay = new Map<string, { day: string; cell: unknown; muted: boolean; isForecast: boolean; isToday: boolean }>()
  for (const week of layout.weeks) {
    assert.equal(week.days.length, 7, 'every column must have exactly 7 slots')
    for (const d of week.days) {
      assert.ok(d, 'continuous never trims to null slots')
      byDay.set(d!.day, d!)
    }
  }

  // Every dataset day is present, has its cell, and is not muted.
  for (const cell of days) {
    const d = byDay.get(cell.day)!
    assert.ok(d, `expected ${cell.day} in the grid`)
    assert.notEqual(d.cell, null)
    assert.equal(d.muted, false)
  }
  // Days immediately outside the span (edge padding) are muted with no cell.
  const before = addLocalDays(start, -1)
  const after = addLocalDays(end, 1)
  if (byDay.has(before)) {
    assert.equal(byDay.get(before)!.cell, null)
    assert.equal(byDay.get(before)!.muted, true)
  }
  if (byDay.has(after)) {
    assert.equal(byDay.get(after)!.cell, null)
    assert.equal(byDay.get(after)!.muted, true)
  }

  // Forecast flag matches the dataset's kind.
  for (const cell of days) {
    const d = byDay.get(cell.day)!
    assert.equal(d.isForecast, cell.kind === 'forecast')
  }

  // Today column: exactly one week contains the isToday cell, and it matches todayWeekIndex.
  assert.equal(findTodayWeekIndex(layout), layout.todayWeekIndex)
  assert.notEqual(layout.todayWeekIndex, -1)
  const todayWeek = layout.weeks[layout.todayWeekIndex].days
  assert.ok(todayWeek.some((d) => d?.day === today && d.isToday))
  for (let i = 0; i < layout.weeks.length; i++) {
    if (i === layout.todayWeekIndex) continue
    assert.ok(!layout.weeks[i].days.some((d) => d?.isToday))
  }

  // DST-safety: every week is Mon..Sun by the platform's own weekday reading,
  // independent of rhythmCalendar's internals.
  for (const week of layout.weeks) {
    const expectedDow = [1, 2, 3, 4, 5, 6, 0] // Mon..Sun as JS Date#getDay()
    week.days.forEach((d, i) => {
      const [y, m, dd] = d!.day.split('-').map(Number)
      assert.equal(new Date(y, m - 1, dd, 12, 0, 0, 0).getDay(), expectedDow[i], `day ${i} of week should be weekday ${expectedDow[i]}`)
    })
  }
})

test('continuous: stepAnchor is a no-op (navigation is by scrolling)', () => {
  assert.equal(stepAnchor('continuous', '2026-06-15', 1), '2026-06-15')
  assert.equal(stepAnchor('continuous', '2026-06-15', -1), '2026-06-15')
})

test('continuous: empty dataset yields an empty, non-crashing layout', () => {
  const layout = buildCalendarLayout({ days: [], mode: 'continuous', anchor: 'x', now: new Date(2026, 5, 1) })
  assert.equal(layout.weeks.length, 0)
  assert.equal(layout.todayWeekIndex, -1)
  assert.equal(layout.rangeLabel, '')
})

// ---------------------------------------------------------------------------
// todayAnchor, determinism, non-mutation
// ---------------------------------------------------------------------------

test('todayAnchor returns the local day of `now`', () => {
  assert.equal(todayAnchor(new Date(2026, 7, 20, 23, 59, 0)), '2026-08-20')
})

test('buildCalendarLayout is deterministic and does not mutate its input', () => {
  const days = daysRange('2026-01-01', '2026-01-31')
  const snapshot = JSON.parse(JSON.stringify(days))
  const input = { days, mode: 'monthly' as const, anchor: '2026-01-15', now: new Date(2026, 0, 15, 12, 0, 0) }

  const a = buildCalendarLayout(input)
  const b = buildCalendarLayout(input)
  assert.deepEqual(a, b)
  assert.deepEqual(days, snapshot)
})
