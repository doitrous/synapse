import test from 'node:test'
import assert from 'node:assert/strict'
import { areBlocked, blockUser, blockedList, unblockUser } from './blocks.js'
import { pool } from './db.js'

test('blocking inserts a block and clears any friendship between the two', async (t) => {
  const calls = []
  t.mock.method(pool, 'query', async (sql, params) => { calls.push({ sql, params }); return [[]] })
  const result = await blockUser('me', 'them')
  assert.equal(result.ok, true)
  assert.ok(calls.some((c) => /INSERT IGNORE INTO blocks/.test(c.sql)), 'a block row is written')
  assert.ok(calls.some((c) => /DELETE FROM friendships/.test(c.sql)), 'any friendship is removed')
})

test('you cannot block yourself, or a blank target', async () => {
  assert.equal((await blockUser('me', 'me')).ok, false)
  assert.equal((await blockUser('me', '')).ok, false)
  assert.equal((await blockUser('me', null)).ok, false)
})

test('areBlocked is true whichever direction the row was written', async (t) => {
  t.mock.method(pool, 'query', async (sql, params) => {
    // The one row that matters is checked in both directions in a single query.
    assert.match(sql, /blocker_id = \? AND blocked_id = \?[\s\S]*OR[\s\S]*blocker_id = \? AND blocked_id = \?/)
    assert.deepEqual(params, ['a', 'b', 'b', 'a'])
    return [[{ '1': 1 }]]
  })
  assert.equal(await areBlocked('a', 'b'), true)
})

test('areBlocked is false when neither direction has a row', async (t) => {
  t.mock.method(pool, 'query', async () => [[]])
  assert.equal(await areBlocked('a', 'b'), false)
})

test('unblocking removes only the row this user wrote', async (t) => {
  let seen
  t.mock.method(pool, 'query', async (sql, params) => { seen = { sql, params }; return [[]] })
  await unblockUser('me', 'them')
  assert.match(seen.sql, /DELETE FROM blocks WHERE blocker_id = \? AND blocked_id = \?/)
  assert.deepEqual(seen.params, ['me', 'them'])
})

test('the blocked list resolves ids to display profiles', async (t) => {
  t.mock.method(pool, 'query', async (sql) => {
    if (/FROM blocks WHERE blocker_id/.test(sql)) return [[{ blocked_id: 'them' }]]
    if (/FROM user_access a LEFT JOIN students/.test(sql)) {
      return [[{ user_id: 'them', name: 'Nour', email: 'nour@x.com', username: 'nour', university_id: 'cairo', year: 'Year 2', status_message: null }]]
    }
    return [[]]
  })
  const blocked = await blockedList('me')
  assert.equal(blocked.length, 1)
  assert.equal(blocked[0].userId, 'them')
  assert.equal(blocked[0].displayName, 'Nour')
})
