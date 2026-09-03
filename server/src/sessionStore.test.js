import test from 'node:test'
import assert from 'node:assert/strict'
import { randomBytes } from 'node:crypto'
import {
  decryptToken,
  encryptToken,
  readSessionCookie,
  sessionCookieHeader,
  sessionId,
} from './sessionStore.js'

// The key is resolved on first use, so setting it here reaches every test.
process.env.SESSION_ENC_KEY = randomBytes(32).toString('base64')

test('a sealed token comes back exactly as it went in', () => {
  const token = 'eyJhbGciOiJIUzI1NiJ9.' + 'x'.repeat(400)
  assert.equal(decryptToken(encryptToken(token)), token)
})

test('two seals of the same token differ, so the table leaks nothing by comparison', () => {
  const a = encryptToken('same-token')
  const b = encryptToken('same-token')
  assert.notEqual(a.toString('base64'), b.toString('base64'))
})

test('a tampered ciphertext is refused rather than silently mis-decrypted', () => {
  const sealed = encryptToken('token')
  sealed[sealed.length - 1] ^= 0xff
  assert.throws(() => decryptToken(sealed))
})

test('the cookie value never reaches the table — only its hash does', () => {
  const raw = 'abc123'
  assert.equal(sessionId(raw).length, 64)
  assert.notEqual(sessionId(raw), raw)
  assert.equal(sessionId(raw), sessionId(raw))
})

test('the session cookie is read out of a header full of other cookies', () => {
  const req = { headers: { cookie: 'theme=dark; nsid=abc.def-123; other=1' } }
  assert.equal(readSessionCookie(req), 'abc.def-123')
  assert.equal(readSessionCookie({ headers: {} }), null)
  // A cookie whose name merely ends in nsid is a different cookie.
  assert.equal(readSessionCookie({ headers: { cookie: 'xnsid=nope' } }), null)
})

test('outside production the cookie is not marked Secure, or dev over http drops it', () => {
  const previous = process.env.NODE_ENV
  process.env.NODE_ENV = 'development'
  const header = sessionCookieHeader('raw')
  assert.ok(!header.includes('Secure'))
  assert.ok(header.includes('HttpOnly'))
  assert.ok(header.includes('SameSite=Lax'))
  assert.ok(header.includes('Path=/'))
  process.env.NODE_ENV = previous
})

test('in production the cookie is Secure', () => {
  const previous = process.env.NODE_ENV
  process.env.NODE_ENV = 'production'
  assert.ok(sessionCookieHeader('raw').includes('Secure'))
  process.env.NODE_ENV = previous
})

test('the domain defaults to both portals, is configurable, and is omitted when empty', () => {
  const previous = process.env.SESSION_COOKIE_DOMAIN
  delete process.env.SESSION_COOKIE_DOMAIN
  assert.ok(sessionCookieHeader('raw').includes('Domain=.nishany.com'))

  process.env.SESSION_COOKIE_DOMAIN = '.nishany.test'
  assert.ok(sessionCookieHeader('raw').includes('Domain=.nishany.test'))

  // localhost rejects any Domain attribute at all, so an empty value must not
  // become an empty attribute.
  process.env.SESSION_COOKIE_DOMAIN = ''
  assert.ok(!sessionCookieHeader('raw').includes('Domain'))

  if (previous === undefined) delete process.env.SESSION_COOKIE_DOMAIN
  else process.env.SESSION_COOKIE_DOMAIN = previous
})

test('clearing the cookie is the same cookie with no life left', () => {
  assert.match(sessionCookieHeader('', 0), /^nsid=; .*Max-Age=0/)
})
