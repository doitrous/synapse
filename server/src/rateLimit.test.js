import test from 'node:test'
import assert from 'node:assert/strict'
import { clearLimit, limit, lock, lockedFor, rateLimited, resetRateLimits } from './rateLimit.js'

test('a window allows exactly its maximum and then refuses', () => {
  resetRateLimits()
  const now = 1_000_000
  for (let attempt = 0; attempt < 5; attempt += 1) {
    assert.equal(limit('k', 5, 60_000, now).ok, true, `attempt ${attempt + 1}`)
  }
  const refused = limit('k', 5, 60_000, now)
  assert.equal(refused.ok, false)
  assert.equal(refused.retryAfter, 60)
})

test('a refused attempt does not extend the window — a limit is not a ban', () => {
  resetRateLimits()
  const start = 1_000_000
  for (let attempt = 0; attempt < 5; attempt += 1) limit('k', 5, 60_000, start)
  // Hammering through the whole window must not push the reset time out.
  for (let at = start; at < start + 59_000; at += 1000) assert.equal(limit('k', 5, 60_000, at).ok, false)
  assert.equal(limit('k', 5, 60_000, start + 60_001).ok, true)
})

test('the window slides rather than resetting on a fixed boundary', () => {
  resetRateLimits()
  assert.equal(limit('k', 2, 10_000, 0).ok, true)
  assert.equal(limit('k', 2, 10_000, 6_000).ok, true)
  assert.equal(limit('k', 2, 10_000, 7_000).ok, false)
  // The first hit has aged out by now; the second has not.
  assert.equal(limit('k', 2, 10_000, 11_000).ok, true)
})

test('a lockout reports the time left and then lets go of it', () => {
  resetRateLimits()
  lock('who', 900_000, 0)
  assert.equal(lockedFor('who', 0), 900)
  assert.equal(lockedFor('who', 899_000), 1)
  assert.equal(lockedFor('who', 900_001), 0)
})

test('a success forgives the failures that led to it', () => {
  resetRateLimits()
  for (let attempt = 0; attempt < 5; attempt += 1) limit('k', 5, 60_000, 0)
  lock('k', 900_000, 0)
  clearLimit('k')
  assert.equal(lockedFor('k', 0), 0)
  assert.equal(limit('k', 5, 60_000, 0).ok, true)
})

test('the middleware answers 429 with Retry-After', () => {
  resetRateLimits()
  const guard = rateLimited('signup', () => '1.2.3.4', 1, 60_000)
  const res = {
    headers: {},
    statusCode: 200,
    body: null,
    setHeader(name, value) { this.headers[name] = value },
    status(code) { this.statusCode = code; return this },
    json(payload) { this.body = payload; return this },
  }
  let passed = 0
  guard({ ip: '1.2.3.4' }, res, () => { passed += 1 })
  guard({ ip: '1.2.3.4' }, res, () => { passed += 1 })
  assert.equal(passed, 1)
  assert.equal(res.statusCode, 429)
  assert.equal(res.body.error, 'too_many_requests')
  assert.ok(Number(res.headers['Retry-After']) > 0)
})
