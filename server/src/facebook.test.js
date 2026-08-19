import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import { matchFriends, parseSignedRequest } from './facebook.js'

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

/* ── Meta's signed_request ─────────────────────────────────────────────────
   The deletion callback is the one route Meta calls with no session, so the
   signature is the whole of its authentication. These cases are the ones that
   must never be confused with each other: a real request, a forged one, a
   mangled one, and an app secret nobody configured. */

function signRequest(payload, secret) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = createHmac('sha256', secret).update(encoded).digest('base64url')
  return `${signature}.${encoded}`
}

test('a correctly signed request yields its payload', () => {
  const payload = { algorithm: 'HMAC-SHA256', user_id: 'fb-42', issued_at: 1_700_000_000 }
  assert.deepEqual(parseSignedRequest(signRequest(payload, 'app-secret'), 'app-secret'), payload)
})

test('a request signed with another secret is refused', () => {
  const signed = signRequest({ algorithm: 'HMAC-SHA256', user_id: 'fb-42' }, 'someone-elses-secret')
  assert.equal(parseSignedRequest(signed, 'app-secret'), null)
})

test('a tampered payload no longer matches its signature', () => {
  const signed = signRequest({ algorithm: 'HMAC-SHA256', user_id: 'fb-42' }, 'app-secret')
  const [signature] = signed.split('.')
  const swapped = Buffer.from(JSON.stringify({ algorithm: 'HMAC-SHA256', user_id: 'fb-99' })).toString('base64url')
  assert.equal(parseSignedRequest(`${signature}.${swapped}`, 'app-secret'), null)
})

test('a string with no dot is refused rather than thrown on', () => {
  assert.equal(parseSignedRequest('not-a-signed-request', 'app-secret'), null)
  assert.equal(parseSignedRequest('too.many.parts', 'app-secret'), null)
  assert.equal(parseSignedRequest('', 'app-secret'), null)
  assert.equal(parseSignedRequest(undefined, 'app-secret'), null)
})

test('an unconfigured app secret refuses even a genuinely signed request', () => {
  // Signed with the empty secret, so the HMAC would match if the empty secret
  // were accepted. An unconfigured integration must reject, never accept.
  const signed = signRequest({ algorithm: 'HMAC-SHA256', user_id: 'fb-42' }, '')
  assert.equal(parseSignedRequest(signed, ''), null)
  assert.equal(parseSignedRequest(signed, undefined), null)
  assert.equal(parseSignedRequest(signed, null), null)
})

test('a payload that is not a JSON object is refused', () => {
  const encoded = Buffer.from('"just a string"').toString('base64url')
  const signature = createHmac('sha256', 'app-secret').update(encoded).digest('base64url')
  assert.equal(parseSignedRequest(`${signature}.${encoded}`, 'app-secret'), null)
})

test('a payload naming an algorithm we do not implement is refused', () => {
  const signed = signRequest({ algorithm: 'HMAC-SHA1', user_id: 'fb-42' }, 'app-secret')
  assert.equal(parseSignedRequest(signed, 'app-secret'), null)
})
