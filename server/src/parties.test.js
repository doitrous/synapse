import test from 'node:test'
import assert from 'node:assert/strict'
import { openParties, setScope } from './parties.js'
import { pool } from './db.js'

test('setScope rejects an audience that is not one of the three', async () => {
  const result = await setScope('u1', 'p1', 'everyone')
  assert.deepEqual(result, { ok: false, reason: 'invalid_room_scope' })
})

test('setScope refuses anyone who is not the host', async (t) => {
  t.mock.method(pool, 'query', async () => [[{ hostUserId: 'someone-else' }]])
  const result = await setScope('u1', 'p1', 'global')
  assert.deepEqual(result, { ok: false, reason: 'not_host' })
})

test('setScope updates room_scope for the host', async (t) => {
  const sql = []
  // Host lookup, the UPDATE, then partyFor's reads (party row + members).
  t.mock.method(pool, 'query', async (text, params) => {
    sql.push({ text, params })
    if (/SELECT host_user_id/.test(text)) return [[{ hostUserId: 'u1' }]]
    if (/UPDATE study_parties SET room_scope/.test(text)) return [{ affectedRows: 1 }]
    if (/FROM study_parties WHERE id/.test(text)) return [[{ id: 'p1', code: 'ABC123', name: 'R', hostUserId: 'u1', universityId: 'kasr', year: 'Y1', visibility: 'open', layoutKey: 'campus', scope: 'global', createdAt: null, archivedAt: null }]]
    return [[]] // members, names, minutes
  })
  const result = await setScope('u1', 'p1', 'global')
  assert.equal(result.ok, true)
  const update = sql.find((q) => /UPDATE study_parties SET room_scope/.test(q.text))
  assert.ok(update, 'it issues the room_scope UPDATE')
  assert.deepEqual(update.params, ['global', 'p1'])
})

test('openParties still lists global rooms for a student with no cohort on file', async (t) => {
  const globalRoom = {
    id: 'g1', code: 'GLOB01', name: 'All-unis room', hostUserId: 'host', universityId: 'kasr', year: 'Y1',
    visibility: 'open', layoutKey: 'campus', scope: 'global', createdAt: null, archivedAt: null, members: 2,
  }
  t.mock.method(pool, 'query', async (text, params) => {
    // cohortFor: no student row → the caller has no university/year yet.
    if (/FROM students WHERE user_id/.test(text)) return [[]]
    // The browse query must still run (not be skipped) and is passed a null
    // cohort, so its university branch is inert and only global rooms match.
    if (/FROM study_parties p/.test(text)) {
      assert.equal(params[0], null, 'the university param is null for a cohortless viewer')
      return [[globalRoom]]
    }
    return [[]]
  })
  const rooms = await openParties('u-no-cohort')
  assert.deepEqual(rooms.map((r) => r.id), ['g1'], 'the global room is returned, not an empty list')
})
