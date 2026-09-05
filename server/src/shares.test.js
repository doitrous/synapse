import test from 'node:test'
import assert from 'node:assert/strict'
import { notifyFollowers } from './shares.js'

test('notifyFollowers writes every notification in one query, not one per follower', async () => {
  const queries = []
  const conn = { query: async (sql, params) => { queries.push({ sql, params }); return [[{ user_id: 'f1' }, { user_id: 'f2' }, { user_id: 'f3' }]] } }
  // The fake conn.query above always answers with the same three-follower
  // rowset regardless of which SQL is asked, which works for both calls this
  // function makes: the event insert (params ignored) and the follower select.
  await notifyFollowers(conn, { shareId: 'share-1', revision: 2, actorId: 'owner-1', title: 'Anatomy notes' })
  // The revision event insert, the follower SELECT, and ONE multi-row insert
  // covering every follower's notification — never one insert per follower,
  // which would have made this 2 + 3 = 5 queries for three followers.
  assert.equal(queries.length, 3)
  const notifyInsert = queries[2]
  assert.match(notifyInsert.sql, /INSERT INTO shared_document_notifications/)
  assert.equal(notifyInsert.params.length, 3 * 6, 'one 6-column row per follower, bound in a single call')
})

test('notifyFollowers skips the notification insert entirely when nobody follows', async () => {
  const queries = []
  const conn = { query: async (sql, params) => { queries.push({ sql, params }); return [[]] } }
  await notifyFollowers(conn, { shareId: 'share-1', revision: 1, actorId: 'owner-1', title: 'Anatomy notes' })
  assert.equal(queries.length, 2, 'the revision event and the (empty) follower SELECT — no empty notification INSERT')
})
