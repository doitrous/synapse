import test from 'node:test'
import assert from 'node:assert/strict'
import { addMinutes, formatTime, formatTimeLabel, minutesOf, normalizeTime, parseTime, to12Hour } from './timeValue.ts'

test('a stored HH:MM round-trips unchanged', () => {
  for (const value of ['00:00', '09:05', '17:00', '23:59']) {
    assert.equal(normalizeTime(value), value)
  }
})

test('a bare hour means the top of that hour', () => {
  assert.equal(normalizeTime('9'), '09:00')
  assert.equal(normalizeTime('17'), '17:00')
})

test('four digits with no separator are read as hours and minutes', () => {
  assert.equal(normalizeTime('930'), '09:30')
  assert.equal(normalizeTime('1745'), '17:45')
})

test('a dot or a space separates as well as a colon does', () => {
  assert.equal(normalizeTime('9.30'), '09:30')
  assert.equal(normalizeTime('9 30'), '09:30')
})

test('am and pm move the hour, in every spelling', () => {
  assert.equal(normalizeTime('5pm'), '17:00')
  assert.equal(normalizeTime('5 PM'), '17:00')
  assert.equal(normalizeTime('5:30 p.m.'), '17:30')
  assert.equal(normalizeTime('9am'), '09:00')
})

test('12 am is midnight and 12 pm is noon', () => {
  // The one pair everybody gets wrong, so it is pinned here.
  assert.equal(normalizeTime('12am'), '00:00')
  assert.equal(normalizeTime('12:30am'), '00:30')
  assert.equal(normalizeTime('12pm'), '12:00')
  assert.equal(normalizeTime('12:30pm'), '12:30')
})

test('24:00 is midnight, and anything past it is refused', () => {
  assert.equal(normalizeTime('24:00'), '00:00')
  assert.equal(normalizeTime('24:30'), null)
  assert.equal(normalizeTime('25:00'), null)
})

test('an impossible minute is refused rather than silently wrapped', () => {
  // Wrapping would turn a typo into a real, wrong time that saves cleanly.
  assert.equal(normalizeTime('10:75'), null)
})

test('text that names no time is refused', () => {
  assert.equal(parseTime(''), null)
  assert.equal(parseTime('   '), null)
  assert.equal(parseTime('lunch'), null)
})

test('minutes since midnight and back again agree', () => {
  assert.equal(minutesOf('17:45'), 17 * 60 + 45)
  assert.equal(formatTime(17 * 60 + 45), '17:45')
})

test('adding minutes wraps around midnight in both directions', () => {
  assert.equal(addMinutes('23:30', 45), '00:15')
  assert.equal(addMinutes('00:15', -45), '23:30')
})

test('an unreadable stored value counts as midnight rather than NaN', () => {
  // A corrupted block must still render a field, not "NaN:NaN".
  assert.equal(minutesOf('nonsense'), 0)
  assert.equal(formatTimeLabel('nonsense'), '12:00 AM')
})

test('the twelve-hour reading of a stored time', () => {
  assert.deepEqual(to12Hour('00:00'), { hour: 12, minute: 0, meridiem: 'AM' })
  assert.deepEqual(to12Hour('12:00'), { hour: 12, minute: 0, meridiem: 'PM' })
  assert.deepEqual(to12Hour('13:05'), { hour: 1, minute: 5, meridiem: 'PM' })
  assert.equal(formatTimeLabel('17:00'), '5:00 PM')
})
