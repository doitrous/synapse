import { test } from 'node:test'
import assert from 'node:assert/strict'
import { matchFriends } from './facebook.js'

test('only friends who have linked this app are matched', () => {
  const linked = [{ userId: 'u1', fbUserId: 'fb1' }, { userId: 'u2', fbUserId: 'fb2' }]
  assert.deepEqual(matchFriends(['fb1', 'fb9'], linked), ['u1'])
})

test('nobody linked means nobody matched', () => {
  assert.deepEqual(matchFriends(['fb1'], []), [])
})

test('an empty friend list matches nobody', () => {
  assert.deepEqual(matchFriends([], [{ userId: 'u1', fbUserId: 'fb1' }]), [])
})
