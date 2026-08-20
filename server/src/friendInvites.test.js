import { test } from 'node:test'
import assert from 'node:assert/strict'
import { inviteState } from './friendInvites.js'

const now = new Date('2026-08-19T12:00:00Z')

test('a fresh invite from someone else is usable', () => {
  const row = { userId: 'a', expiresAt: new Date('2026-08-20T12:00:00Z'), usedBy: null }
  assert.equal(inviteState(row, now, 'b'), 'ok')
})

test('an expired invite is refused', () => {
  const row = { userId: 'a', expiresAt: new Date('2026-08-18T12:00:00Z'), usedBy: null }
  assert.equal(inviteState(row, now, 'b'), 'expired')
})

test('an invite that has been used is refused', () => {
  const row = { userId: 'a', expiresAt: new Date('2026-08-20T12:00:00Z'), usedBy: 'c' }
  assert.equal(inviteState(row, now, 'b'), 'used')
})

test('you cannot redeem your own invite', () => {
  const row = { userId: 'a', expiresAt: new Date('2026-08-20T12:00:00Z'), usedBy: null }
  assert.equal(inviteState(row, now, 'a'), 'self')
})

test('a missing invite is refused rather than thrown', () => {
  assert.equal(inviteState(null, now, 'b'), 'used')
})
