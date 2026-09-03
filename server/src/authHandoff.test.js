import test from 'node:test'
import assert from 'node:assert/strict'
import { mintHandoffCode, redeemHandoffCode } from './authHandoff.js'

test('a minted code redeems the refresh token exactly once', () => {
  const code = mintHandoffCode('rt_abc')
  assert.equal(redeemHandoffCode(code), 'rt_abc')
  assert.equal(redeemHandoffCode(code), null)
})

test('an unknown code redeems to nothing', () => {
  assert.equal(redeemHandoffCode('never-minted'), null)
})

test('a code past its TTL is refused and consumed', () => {
  const now = Date.now()
  const code = mintHandoffCode('rt_xyz', now)
  assert.equal(redeemHandoffCode(code, now + 30_001), null)
  // Consumed even though it expired — no second attempt inside the window helps.
  assert.equal(redeemHandoffCode(code, now), null)
})

test('two codes for the same session are independent', () => {
  const a = mintHandoffCode('rt_1')
  const b = mintHandoffCode('rt_2')
  assert.equal(redeemHandoffCode(a), 'rt_1')
  assert.equal(redeemHandoffCode(b), 'rt_2')
})
