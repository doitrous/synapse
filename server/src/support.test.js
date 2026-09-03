import test from 'node:test'
import assert from 'node:assert/strict'
import { createSupportMessage } from './support.js'
import { pool } from './db.js'

function fakeSupportPool(t, { insertedRow }) {
  let inserted = null
  const conn = {
    beginTransaction: async () => {},
    commit: async () => {},
    rollback: async () => {},
    release: () => {},
    query: async (sql, params) => {
      if (/FOR UPDATE/.test(sql)) return [[{ id: 'stu-1', user_id: 'stu-1' }]]
      if (/INSERT INTO support_messages/.test(sql)) { inserted = params; return [{ affectedRows: 1 }] }
      return [[]]
    },
  }
  t.mock.method(pool, 'getConnection', async () => conn)
  t.mock.method(pool, 'query', async () => [[insertedRow]])
  return () => inserted
}

test('createSupportMessage refuses a blank message', async () => {
  const result = await createSupportMessage('stu-1', { message: '   ' })
  assert.equal(result.error, 'message_required')
})

test('createSupportMessage refuses a missing message', async () => {
  const result = await createSupportMessage('stu-1', {})
  assert.equal(result.error, 'message_required')
})

test('createSupportMessage trims the message and caps it at 4000 characters', async (t) => {
  const insertedRow = { id: 'msg-1', user_id: 'stu-1', student_id: 'stu-1', subject: null, message: 'x', status: 'open', admin_note: null, created_at: '2026-09-03', updated_at: '2026-09-03' }
  const getInserted = fakeSupportPool(t, { insertedRow })
  const overlong = 'y'.repeat(5000)
  const result = await createSupportMessage('stu-1', { message: `  ${overlong}  ` })
  assert.equal(result.ok, true)
  const [, , , , storedMessage] = getInserted()
  assert.equal(storedMessage.length, 4000)
  assert.equal(storedMessage, overlong.slice(0, 4000))
})

test('createSupportMessage scopes the row to the caller and shapes the response', async (t) => {
  const insertedRow = { id: 'msg-2', user_id: 'stu-1', student_id: 'stu-1', subject: 'Billing', message: 'Please help', status: 'open', admin_note: null, created_at: '2026-09-03', updated_at: '2026-09-03' }
  const getInserted = fakeSupportPool(t, { insertedRow })
  const result = await createSupportMessage('stu-1', { subject: 'Billing', message: 'Please help' })
  assert.equal(result.ok, true)
  const [, insertedUserId] = getInserted()
  assert.equal(insertedUserId, 'stu-1')
  assert.deepEqual(result.message, {
    id: 'msg-2', userId: 'stu-1', studentId: 'stu-1', subject: 'Billing', message: 'Please help',
    status: 'open', adminNote: null, createdAt: '2026-09-03', updatedAt: '2026-09-03',
  })
})
