import test from 'node:test'
import assert from 'node:assert/strict'
import { monthGrid, startOfWeek, weekDays, weekdayLabels } from './calendarGrid.ts'

/** 14 August 2026 is a Friday. */
const FRIDAY = new Date(2026, 7, 14)

function iso(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

test('a Saturday week containing a Friday starts on the Saturday before it', () => {
  // The regression this guards: a Saturday-first calendar putting Friday at the
  // head of next week instead of the end of this one.
  assert.equal(iso(startOfWeek(FRIDAY, 6)), '2026-08-08')
})

test('a Saturday week containing a Saturday starts on that Saturday', () => {
  assert.equal(iso(startOfWeek(new Date(2026, 7, 15), 6)), '2026-08-15')
})

test('Monday and Sunday week starts still work', () => {
  assert.equal(iso(startOfWeek(FRIDAY, 1)), '2026-08-10')
  assert.equal(iso(startOfWeek(FRIDAY, 0)), '2026-08-09')
})

test('start of week is midnight, whatever time of day was given', () => {
  const afternoon = new Date(2026, 7, 14, 16, 45, 30, 250)
  const start = startOfWeek(afternoon, 6)
  assert.deepEqual(
    [start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds()],
    [0, 0, 0, 0],
  )
})

test('column headings are rotated to the chosen first day', () => {
  assert.deepEqual(weekdayLabels(6), ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
  assert.deepEqual(weekdayLabels(1), ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
  assert.deepEqual(weekdayLabels(0), ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
})

test('the days of a week line up with their headings', () => {
  // Headings and cells are produced by different functions; if these disagree,
  // every event in the week view is drawn a column out.
  const labels = weekdayLabels(6)
  const days = weekDays(FRIDAY, 6)
  const named = days.map((day) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day.getDay()])
  assert.deepEqual(named, labels)
})

test('a week is seven consecutive days', () => {
  const days = weekDays(FRIDAY, 6)
  assert.equal(days.length, 7)
  assert.deepEqual(days.map(iso), [
    '2026-08-08', '2026-08-09', '2026-08-10', '2026-08-11',
    '2026-08-12', '2026-08-13', '2026-08-14',
  ])
})

test('a month grid is always six weeks, so the page does not change height', () => {
  for (const month of [0, 1, 5, 11]) {
    assert.equal(monthGrid(new Date(2026, month, 1), 6).length, 42)
  }
})

test('a month grid begins on the chosen first day and contains the whole month', () => {
  const grid = monthGrid(FRIDAY, 6)
  assert.equal(grid[0].getDay(), 6)
  assert.equal(iso(grid[0]), '2026-08-01') // 1 August 2026 is itself a Saturday
  assert.ok(grid.some((day) => iso(day) === '2026-08-31'))
})

test('a month whose first day is the week start does not gain a blank leading week', () => {
  // February 2026 starts on a Sunday, so a Sunday-first grid must not open with
  // seven days of the previous month.
  const grid = monthGrid(new Date(2026, 1, 10), 0)
  assert.equal(iso(grid[0]), '2026-02-01')
})
