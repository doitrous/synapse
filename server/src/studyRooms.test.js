import test from 'node:test'
import assert from 'node:assert/strict'
import { seatInvitedFriends } from './studyRooms.js'
import { pool } from './db.js'

test('seatInvitedFriends seats every accepted friend in one insert, not one round trip each', async (t) => {
  const queries = []
  t.mock.method(pool, 'query', async (sql, params) => {
    queries.push({ sql, params })
    if (/FROM friendships/.test(sql)) {
      // f2 is invited but not actually an accepted friend — must be dropped
      // silently rather than seated or reported as invalid.
      return [[{ user_a: 'host', user_b: 'f1' }, { user_a: 'f3', user_b: 'host' }]]
    }
    if (/FROM user_access a LEFT JOIN students s ON s\.user_id = a\.user_id WHERE a\.user_id IN/.test(sql)) {
      return [[{ user_id: 'f1', name: 'Friend One', email: 'f1@x.com', username: 'friendone' }]]
    }
    return [{ affectedRows: 1 }]
  })

  await seatInvitedFriends('host', 'room-1', ['f1', 'f2', 'f3', 'host'])

  // Friendship check, name lookup, one multi-row insert — three queries total
  // regardless of invite count, never two round trips per invitee.
  assert.equal(queries.length, 3)
  const insert = queries[2]
  assert.match(insert.sql, /INSERT INTO study_room_members/)
  assert.equal(insert.params.length, 2 * 3, 'one 3-column row per accepted friend (f1, f3) — f2 was never a friend')
  assert.deepEqual(insert.params, ['room-1', 'f1', 'Friend One', 'room-1', 'f3', 'Student'])
})

test('seatInvitedFriends makes no query at all when nobody was invited', async (t) => {
  const spy = t.mock.method(pool, 'query', async () => { throw new Error('must not query') })
  await seatInvitedFriends('host', 'room-1', [])
  assert.equal(spy.mock.calls.length, 0)
})
