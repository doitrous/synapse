import { test } from 'node:test'
import assert from 'node:assert/strict'
import { orderedPair, isSelf, canSendRequest, resolveResponse } from './friendship.js'

test('a pair sorts the same way round either way', () => {
  assert.deepEqual(orderedPair('b', 'a'), { userA: 'a', userB: 'b' })
  assert.deepEqual(orderedPair('a', 'b'), { userA: 'a', userB: 'b' })
})

test('a student cannot befriend themselves', () => {
  assert.equal(isSelf('a', 'a'), true)
  assert.equal(isSelf('a', 'b'), false)
})

test('a first request is allowed', () => {
  assert.deepEqual(canSendRequest(null), { ok: true })
})

test('a second request while one is pending is refused', () => {
  assert.deepEqual(canSendRequest({ status: 'pending' }), { ok: false, reason: 'already_pending' })
})

test('requesting someone who is already a friend is refused', () => {
  assert.deepEqual(canSendRequest({ status: 'accepted' }), { ok: false, reason: 'already_friends' })
})

test('requesting again after a decline is allowed', () => {
  assert.deepEqual(canSendRequest({ status: 'declined' }), { ok: true })
})

test('only the person who did not ask may answer', () => {
  const row = { userA: 'a', userB: 'b', requestedBy: 'a', status: 'pending' }
  assert.equal(resolveResponse(row, 'a', true), null)
  assert.deepEqual(resolveResponse(row, 'b', true), { status: 'accepted' })
  assert.deepEqual(resolveResponse(row, 'b', false), { status: 'declined' })
})

test('a request that is not pending cannot be answered', () => {
  const row = { userA: 'a', userB: 'b', requestedBy: 'a', status: 'accepted' }
  assert.equal(resolveResponse(row, 'b', true), null)
})

test('someone outside the pair cannot answer the request', () => {
  const row = { userA: 'a', userB: 'b', requestedBy: 'a', status: 'pending' }
  assert.equal(resolveResponse(row, 'c', true), null)
})
