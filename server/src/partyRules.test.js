import { test } from 'node:test'
import assert from 'node:assert/strict'
import { canJoin, visibleTo, sessionState, tally } from './partyRules.js'

const party = (over = {}) => ({
  id: 'p1', universityId: 'kasr', year: 'Y3', visibility: 'open', archivedAt: null, ...over,
})
const viewer = (over = {}) => ({ universityId: 'kasr', year: 'Y3', ...over })

test('someone from the same cohort may join', () => {
  assert.equal(canJoin(party(), viewer()).ok, true)
})

test('another university may not, even holding the code', () => {
  assert.equal(canJoin(party(), viewer({ universityId: 'ain-shams' })).ok, false)
})

test('another year may not either', () => {
  assert.equal(canJoin(party(), viewer({ year: 'Y2' })).ok, false)
})

test('an invite-only party can still be joined with the code', () => {
  assert.equal(canJoin(party({ visibility: 'invite' }), viewer()).ok, true)
})

test('an archived party is closed to everyone', () => {
  assert.equal(canJoin(party({ archivedAt: '2026-01-01' }), viewer()).ok, false)
})

test('only open parties in your own cohort are browsable', () => {
  const list = [
    party({ id: 'open-here' }),
    party({ id: 'invite-here', visibility: 'invite' }),
    party({ id: 'open-elsewhere', universityId: 'ain-shams' }),
    party({ id: 'archived', archivedAt: '2026-01-01' }),
  ]
  assert.deepEqual(visibleTo(list, viewer()).map((p) => p.id), ['open-here'])
})

const now = new Date('2026-08-20T12:00:00.000Z')

test('a session with no start time is open from the moment it exists', () => {
  assert.equal(sessionState({ startsAt: null, closedAt: null }, now), 'open')
})

test('a session starting later is scheduled until then', () => {
  assert.equal(sessionState({ startsAt: '2026-08-20T18:00:00.000Z', closedAt: null }, now), 'scheduled')
})

test('and open once its time has passed', () => {
  assert.equal(sessionState({ startsAt: '2026-08-20T06:00:00.000Z', closedAt: null }, now), 'open')
})

test('a closed session stays closed whatever its start time said', () => {
  assert.equal(sessionState({ startsAt: null, closedAt: '2026-08-20T09:00:00.000Z' }, now), 'closed')
})

test('a mixed session counts what was marked apart from what was practised', () => {
  const result = tally([
    { itemKind: 'question', correct: true },
    { itemKind: 'question', correct: false },
    { itemKind: 'question', correct: true },
    { itemKind: 'practical', correct: null },
    { itemKind: 'essay', correct: null },
  ])
  assert.deepEqual(result, { marked: { correct: 2, of: 3 }, practised: 2 })
})

test('nothing answered reports nothing rather than zero of zero', () => {
  assert.deepEqual(tally([]), { marked: null, practised: 0 })
})

test('a guessed code for another cohort never reveals that the party exists', () => {
  // Archived *and* wrong cohort must read as wrong cohort: answering "archived"
  // would confirm the code names something real.
  const refusal = canJoin(party({ archivedAt: '2026-01-01' }), viewer({ universityId: 'ain-shams' }))
  assert.deepEqual(refusal, { ok: false, reason: 'wrong_cohort' })
})
