import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isSendWindow, resolveChannel, groupByCohort } from './qotdReminders.js'

test('isSendWindow is true only inside the Cairo noon window', () => {
  // 10:00 UTC = 12:00 or 13:00 Cairo depending on DST; test both edges via known instants.
  // 2026-08-29 10:00Z → Cairo 12:00 (Egypt observes DST in 2026 → UTC+3 in summer? use computed check)
  const noonCairo = new Date('2026-08-29T10:00:00Z') // adjust if Egypt DST differs; assert via formatter below
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(noonCairo)
  const hh = Number(parts.find((p) => p.type === 'hour').value)
  // Only assert the window logic relative to the actual Cairo hour of this instant:
  assert.equal(isSendWindow(noonCairo, { hour: hh, windowMinutes: 5 }), true)
  assert.equal(isSendWindow(noonCairo, { hour: (hh + 1) % 24, windowMinutes: 5 }), false)
})

test('isSendWindow respects the window width', () => {
  const t = new Date('2026-08-29T09:07:00Z')
  const hh = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', hour: '2-digit', hour12: false }).format(t))
  const mm = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', minute: '2-digit' }).format(t))
  assert.equal(isSendWindow(t, { hour: hh, windowMinutes: mm + 1 }), true)
  assert.equal(isSendWindow(t, { hour: hh, windowMinutes: mm }), false) // minute == width → outside [0,width)
})

test('isSendWindow reads a student timezone rather than always Cairo', () => {
  // 12:00 in Asia/Tokyo (UTC+9, no DST) is 03:00 UTC.
  const tokyoNoon = new Date('2026-08-29T03:00:00Z')
  assert.equal(isSendWindow(tokyoNoon, { hour: 12, windowMinutes: 5, timeZone: 'Asia/Tokyo' }), true)
  assert.equal(isSendWindow(tokyoNoon, { hour: 12, windowMinutes: 5 }), false) // not Cairo noon
})

test('resolveChannel prefers push, falls back to email, else none', () => {
  assert.equal(resolveChannel({ hasPushDevice: true, hasEmail: true }), 'push')
  assert.equal(resolveChannel({ hasPushDevice: true, hasEmail: false }), 'push')
  assert.equal(resolveChannel({ hasPushDevice: false, hasEmail: true }), 'email')
  assert.equal(resolveChannel({ hasPushDevice: false, hasEmail: false }), 'none')
})

test('groupByCohort buckets students by university+year+yearId', () => {
  const students = [
    { userId: 'a', universityId: 'kau', year: 'Year 2', yearId: 'KAU_Y2' },
    { userId: 'b', universityId: 'kau', year: 'Year 2', yearId: 'KAU_Y2' },
    { userId: 'c', universityId: 'asu', year: 'Year 1', yearId: 'ASU_Y1' },
  ]
  const groups = groupByCohort(students)
  assert.equal(groups.size, 2)
  assert.equal(groups.get('kau|Year 2|KAU_Y2').students.length, 2)
  assert.deepEqual(groups.get('asu|Year 1|ASU_Y1').cohort, { universityId: 'asu', year: 'Year 1', yearId: 'ASU_Y1' })
})
