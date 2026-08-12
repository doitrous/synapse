import test from 'node:test'
import assert from 'node:assert/strict'
import { recoveryCopyWins } from './statePrecedence.ts'

const OLDER = '2026-08-11T10:00:00.000Z'
const NEWER = '2026-08-12T10:00:00.000Z'

test('a recovery copy older than the server is discarded', () => {
  // The regression this guards: a stale tab reverting a server-side migration.
  assert.equal(recoveryCopyWins(OLDER, NEWER), false)
})

test('a recovery copy newer than the server is kept', () => {
  assert.equal(recoveryCopyWins(NEWER, OLDER), true)
})

test('an equal timestamp means the server already has the write', () => {
  assert.equal(recoveryCopyWins(NEWER, NEWER), false)
})

test('with no server timestamp the offline edit is kept', () => {
  // An older server that does not return updatedAt, or a key never written.
  assert.equal(recoveryCopyWins(NEWER, null), true)
  assert.equal(recoveryCopyWins(NEWER, undefined), true)
  assert.equal(recoveryCopyWins(NEWER, 'not-a-date'), true)
})

test('no recovery copy means the server value is used', () => {
  assert.equal(recoveryCopyWins(null, NEWER), false)
  assert.equal(recoveryCopyWins(undefined, null), false)
})

test('an unreadable recovery timestamp cannot claim to be newer', () => {
  assert.equal(recoveryCopyWins('not-a-date', OLDER), false)
})
