import test from 'node:test'
import assert from 'node:assert/strict'
import { randomBytes } from 'node:crypto'
import { apiAuthGate, csrfOk } from './auth.js'
import { router, safeNext } from './authRoutes.js'
import { pool } from './db.js'
import { resetRateLimits } from './rateLimit.js'

process.env.SESSION_ENC_KEY = randomBytes(32).toString('base64')

/** An access token GoTrue would have signed. Only its payload is ever read here. */
function accessToken(claims = {}) {
  const part = (value) => Buffer.from(JSON.stringify(value)).toString('base64url')
  return `${part({ alg: 'HS256' })}.${part({ sub: 'user-1', aal: 'aal1', ...claims })}.signature`
}

function grantResponse(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })
}

function fakeReq({ method = 'GET', url = '/', headers = {}, body = {}, query = {} } = {}) {
  const lower = Object.fromEntries(Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v]))
  return {
    method,
    url,
    originalUrl: url,
    path: url.split('?')[0],
    headers: lower,
    body,
    query,
    ip: '203.0.113.9',
    get(name) { return lower[String(name).toLowerCase()] },
    header(name) { return lower[String(name).toLowerCase()] },
  }
}

/** A response that resolves a promise as soon as the route has answered. */
function fakeRes() {
  let settle
  const done = new Promise((resolve) => { settle = resolve })
  const res = {
    statusCode: 200,
    body: undefined,
    cookies: [],
    headers: {},
    location: null,
    done,
    setHeader(name, value) { this.headers[name] = value },
    append(name, value) { if (name === 'Set-Cookie') this.cookies.push(value); return this },
    status(code) { this.statusCode = code; return this },
    json(payload) { this.body = payload; settle(this); return this },
    end() { settle(this); return this },
    redirect(code, location) { this.statusCode = code; this.location = location; settle(this); return this },
  }
  return res
}

async function call(req, res) {
  router(req, res, (error) => { if (error) throw error })
  return res.done
}

function supabaseEnv() {
  process.env.SUPABASE_URL = 'https://stub.supabase.co'
  process.env.SUPABASE_ANON_KEY = 'anon-key'
}

test('a good password sets a session cookie and reports no second factor pending', async (t) => {
  resetRateLimits()
  supabaseEnv()
  t.mock.method(pool, 'query', async () => [[], []])
  t.mock.method(globalThis, 'fetch', async () => grantResponse({
    access_token: accessToken(),
    refresh_token: 'refresh-1',
    expires_in: 3600,
    user: { id: 'user-1', factors: [] },
  }))

  const res = fakeRes()
  await call(fakeReq({ method: 'POST', url: '/login', body: { email: 'A@Example.com', password: 'hunter2' } }), res)

  assert.equal(res.statusCode, 200)
  assert.deepEqual(res.body, { ok: true, mfaPending: false })
  assert.equal(res.cookies.length, 1)
  assert.match(res.cookies[0], /^nsid=[^;]+;/)
  assert.ok(res.cookies[0].includes('HttpOnly'))
})

test('an enrolled factor that has not been presented yet is reported as pending', async (t) => {
  resetRateLimits()
  supabaseEnv()
  t.mock.method(pool, 'query', async () => [[], []])
  t.mock.method(globalThis, 'fetch', async () => grantResponse({
    access_token: accessToken({ aal: 'aal1' }),
    refresh_token: 'refresh-1',
    expires_in: 3600,
    user: { id: 'user-1', factors: [{ id: 'f1', factor_type: 'totp', status: 'verified' }] },
  }))

  const res = fakeRes()
  await call(fakeReq({ method: 'POST', url: '/login', body: { email: 'mfa@example.com', password: 'hunter2' } }), res)
  assert.equal(res.body.mfaPending, true)
})

test('the sixth attempt on one address is refused before it reaches Supabase', async (t) => {
  resetRateLimits()
  supabaseEnv()
  t.mock.method(console, 'warn', () => {})
  t.mock.method(pool, 'query', async () => [[], []])
  const fetched = t.mock.method(globalThis, 'fetch', async () => grantResponse(
    { error_code: 'invalid_credentials', msg: 'Invalid login credentials' },
    400,
  ))

  const attempt = async () => {
    const res = fakeRes()
    await call(fakeReq({
      method: 'POST',
      url: '/login',
      body: { email: 'flood@example.com', password: 'wrong' },
    }), res)
    return res
  }

  for (let n = 0; n < 5; n += 1) assert.equal((await attempt()).statusCode, 401, `attempt ${n + 1}`)
  const sixth = await attempt()
  assert.equal(sixth.statusCode, 429)
  assert.equal(sixth.body.error, 'too_many_attempts')
  assert.ok(Number(sixth.headers['Retry-After']) > 0)
  // The refusal is ours; Supabase was asked five times, not six.
  assert.equal(fetched.mock.callCount(), 5)
})

test('signing out clears the cookie even when there is nothing left to sign out of', async (t) => {
  resetRateLimits()
  supabaseEnv()
  t.mock.method(pool, 'query', async () => [[], []])
  const res = fakeRes()
  await call(fakeReq({ method: 'POST', url: '/logout' }), res)
  assert.equal(res.statusCode, 204)
  assert.equal(res.cookies.length, 1)
  assert.match(res.cookies[0], /^nsid=; .*Max-Age=0/)
})

test('a next that leaves this site is not a next', () => {
  assert.equal(safeNext('/app/library'), '/app/library')
  assert.equal(safeNext('https://evil.test'), '/app')
  assert.equal(safeNext('//evil.test'), '/app')
  // Protocol-relative in every browser, whatever the spec says.
  assert.equal(safeNext('/\\evil.test'), '/app')
  assert.equal(safeNext(null), '/app')
  assert.equal(safeNext('app'), '/app')
})

test('an origin outside the portals cannot make a cookie-authenticated write', async (t) => {
  t.mock.method(console, 'warn', () => {})
  const req = fakeReq({
    method: 'PUT',
    url: '/api/me/enrolment',
    headers: { cookie: 'nsid=whatever', origin: 'https://evil.test' },
  })
  const res = fakeRes()
  let nexted = false
  await apiAuthGate(req, res, () => { nexted = true })
  assert.equal(nexted, false)
  assert.equal(res.statusCode, 403)
  assert.deepEqual(res.body, { error: 'bad_origin' })
})

test('a cookie write from a portal origin is not refused on origin', async (t) => {
  // No session row comes back, so this ends at 401 — the point is that it got
  // past the CSRF check rather than being turned away at 403.
  t.mock.method(pool, 'query', async () => [[], []])
  const req = fakeReq({
    method: 'PUT',
    url: '/api/me/enrolment',
    headers: { cookie: 'nsid=whatever', origin: 'https://nishany.com' },
  })
  const res = fakeRes()
  await apiAuthGate(req, res, () => {})
  assert.equal(res.statusCode, 401)
})

test('a bearer write is never judged on its Origin — native apps send none', async () => {
  // Supabase is not configured in tests, so the token cannot resolve and this
  // ends at 401. What matters is that it is 401 and not 403: the CSRF rule was
  // never consulted for a bearer caller.
  const req = fakeReq({
    method: 'PUT',
    url: '/api/me/enrolment',
    headers: { authorization: 'Bearer some-native-token' },
  })
  const res = fakeRes()
  await apiAuthGate(req, res, () => {})
  assert.equal(res.statusCode, 401)
  assert.deepEqual(res.body, { error: 'unauthorized' })
})

test('reads are never refused on origin, and a referer stands in for a missing Origin', () => {
  const origins = ['https://nishany.com']
  assert.equal(csrfOk(fakeReq({ method: 'GET', headers: { origin: 'https://evil.test' } }), origins), true)
  assert.equal(csrfOk(fakeReq({ method: 'POST', headers: { referer: 'https://nishany.com/app/library' } }), origins), true)
  assert.equal(csrfOk(fakeReq({ method: 'POST', headers: { referer: 'https://evil.test/x' } }), origins), false)
  // Neither header on a write is not a browser doing what we expect.
  assert.equal(csrfOk(fakeReq({ method: 'POST' }), origins), false)
})
