import { test } from 'node:test'
import assert from 'node:assert/strict'
import { addLocalDays, daysBetweenDays, localDay, localDayPlus } from './time.ts'

test('localDay uses local calendar fields', () => {
  // Build a date from local parts so the assertion is timezone-independent.
  const d = new Date(2026, 7, 20, 23, 30, 0) // Aug 20, 11:30pm local
  assert.equal(localDay(d), '2026-08-20')
})

test('a late-night and an early-morning study land on different local days', () => {
  const lateNight = new Date(2026, 7, 20, 23, 59, 0)
  const earlyNext = new Date(2026, 7, 21, 0, 1, 0)
  assert.notEqual(localDay(lateNight), localDay(earlyNext))
})

test('addLocalDays crosses month and year boundaries', () => {
  assert.equal(addLocalDays('2026-08-31', 1), '2026-09-01')
  assert.equal(addLocalDays('2026-12-31', 1), '2027-01-01')
  assert.equal(addLocalDays('2026-03-01', -1), '2026-02-28')
})

test('daysBetweenDays is signed and whole', () => {
  assert.equal(daysBetweenDays('2026-08-20', '2026-08-30'), 10)
  assert.equal(daysBetweenDays('2026-08-30', '2026-08-20'), -10)
  assert.equal(daysBetweenDays('2026-08-20', '2026-08-20'), 0)
})

test('localDayPlus shifts from a given clock', () => {
  assert.equal(localDayPlus(new Date(2026, 7, 20, 12, 0, 0), 1), '2026-08-21')
})
