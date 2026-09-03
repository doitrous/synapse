import test from 'node:test'
import assert from 'node:assert/strict'
import { shouldRunBookkeeping } from './auth.js'

test('bookkeeping writes run once, then wait out the TTL', () => {
  const ttl = 5 * 60 * 1000
  assert.equal(shouldRunBookkeeping(null, 1_000_000, ttl), true, 'no prior write ever runs')
  assert.equal(shouldRunBookkeeping(1_000_000, 1_000_000 + ttl - 1, ttl), false, 'inside the TTL window stays quiet')
  assert.equal(shouldRunBookkeeping(1_000_000, 1_000_000 + ttl, ttl), true, 'the TTL boundary itself runs again')
  assert.equal(shouldRunBookkeeping(1_000_000, 1_000_000 + ttl + 1, ttl), true, 'past the TTL runs again')
})
