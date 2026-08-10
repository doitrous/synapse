import test from 'node:test'
import assert from 'node:assert/strict'
import { toMariaDbDate } from './datetime.js'

test('converts Resend ISO timestamps to Date values mysql2 can serialize', () => {
  const result = toMariaDbDate('2026-08-10T16:00:51.954Z')

  assert.ok(result instanceof Date)
  assert.equal(result.toISOString(), '2026-08-10T16:00:51.954Z')
})

test('falls back to a valid Date for malformed provider timestamps', () => {
  assert.ok(Number.isFinite(toMariaDbDate('not-a-date').getTime()))
})
