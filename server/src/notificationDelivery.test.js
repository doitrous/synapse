import test from 'node:test'
import assert from 'node:assert/strict'
import { projectCampaignsForStudent } from './notificationDelivery.js'

const NOW = Date.UTC(2026, 8, 10, 12, 0, 0)
const student = { universityId: 'kau', year: 'Year 1', group: 'A' }

const base = {
  id: 'c1', title: 't', message: 'm', to: '/app', active: true,
  delivery: 'Immediate', scheduledAt: new Date(NOW).toISOString(),
  automation: 'None', leadMinutes: 0, universityIds: [], years: [], groups: [],
}
const ids = (rows) => rows.map((r) => r.id)

test('an untargeted, active, immediate campaign reaches everyone', () => {
  assert.deepEqual(ids(projectCampaignsForStudent([base], student, NOW)), ['c1'])
  assert.deepEqual(ids(projectCampaignsForStudent([base], {}, NOW)), ['c1'])
})

test('an inactive campaign reaches nobody', () => {
  assert.deepEqual(projectCampaignsForStudent([{ ...base, active: false }], student, NOW), [])
})

test('a scheduled campaign waits for its time', () => {
  const future = { ...base, id: 'f', delivery: 'Scheduled', scheduledAt: new Date(NOW + 3_600_000).toISOString() }
  const past = { ...base, id: 'p', delivery: 'Scheduled', scheduledAt: new Date(NOW - 3_600_000).toISOString() }
  assert.deepEqual(ids(projectCampaignsForStudent([future, past], student, NOW)), ['p'])
})

test('cohort targeting keeps out other universities, years and groups', () => {
  const otherUni = { ...base, id: 'u', universityIds: ['asu'] }
  const otherYear = { ...base, id: 'y', years: ['Year 2'] }
  const otherGroup = { ...base, id: 'g', groups: ['B'] }
  const mine = { ...base, id: 'mine', universityIds: ['kau'], years: ['Year 1'], groups: ['A'] }
  assert.deepEqual(ids(projectCampaignsForStudent([otherUni, otherYear, otherGroup, mine], student, NOW)), ['mine'])
})

test('a student we cannot place gets only untargeted campaigns', () => {
  const targeted = { ...base, id: 'tg', universityIds: ['kau'] }
  const open = { ...base, id: 'op' }
  assert.deepEqual(ids(projectCampaignsForStudent([targeted, open], {}, NOW)), ['op'])
})

test('automation campaigns are due but still cohort-gated; the client applies prefs', () => {
  const auto = { ...base, id: 'a', delivery: 'Automated', automation: 'Review becomes due' }
  assert.deepEqual(ids(projectCampaignsForStudent([auto], student, NOW)), ['a'])
  // The automation field survives, so the browser can still honour the student's
  // review/calendar toggles.
  assert.equal(projectCampaignsForStudent([auto], student, NOW)[0].automation, 'Review becomes due')
})

test('junk input is dropped, not thrown on', () => {
  assert.deepEqual(projectCampaignsForStudent(null, student, NOW), [])
  assert.deepEqual(projectCampaignsForStudent([null, 42, base], student, NOW).map((r) => r.id), ['c1'])
})
