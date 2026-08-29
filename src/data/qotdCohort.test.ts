// src/data/qotdCohort.test.ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { hash32, cohortKey, qotdDateInCairo, dayNumber } from './qotdCohort.ts'

test('hash32 is stable and unsigned', () => {
  assert.equal(hash32('kau|Year 2'), hash32('kau|Year 2'))
  assert.ok(hash32('kau|Year 2') >= 0)
  assert.notEqual(hash32('kau|Year 2'), hash32('kau|Year 3'))
})

test('cohortKey joins university and year label', () => {
  assert.equal(cohortKey({ universityId: 'kau', year: 'Year 2' }), 'kau|Year 2')
})

test('qotdDateInCairo returns the Cairo calendar date', () => {
  // 2026-08-29 23:30 UTC is already 2026-08-30 in Cairo (UTC+2 or +3).
  const d = new Date('2026-08-29T23:30:00Z')
  assert.equal(qotdDateInCairo(d), '2026-08-30')
  // 2026-08-29 12:00 UTC is still the 29th in Cairo.
  assert.equal(qotdDateInCairo(new Date('2026-08-29T12:00:00Z')), '2026-08-29')
})

test('dayNumber counts whole days from the epoch and advances by one', () => {
  assert.equal(dayNumber('1970-01-01'), 0)
  assert.equal(dayNumber('2026-08-30') - dayNumber('2026-08-29'), 1)
})
