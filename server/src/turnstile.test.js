import test from 'node:test'
import assert from 'node:assert/strict'
import { requireTurnstile } from './turnstile.js'

function fakeReq(body, ip = '1.2.3.4') {
  return { body, ip }
}

function fakeRes() {
  const res = { statusCode: 200, body: null }
  res.status = (code) => { res.statusCode = code; return res }
  res.json = (payload) => { res.body = payload; return res }
  return res
}

test('no-ops when TURNSTILE_SECRET_KEY is unset', async () => {
  delete process.env.TURNSTILE_SECRET_KEY
  let called = false
  await requireTurnstile(fakeReq({}), fakeRes(), () => { called = true })
  assert.equal(called, true)
})

test('403s when the secret is set but no token is supplied', async () => {
  process.env.TURNSTILE_SECRET_KEY = 'sk_test'
  const res = fakeRes()
  let called = false
  await requireTurnstile(fakeReq({}), res, () => { called = true })
  assert.equal(called, false)
  assert.equal(res.statusCode, 403)
  assert.deepEqual(res.body, { error: 'bot_check_failed' })
  delete process.env.TURNSTILE_SECRET_KEY
})

test('403s when Cloudflare rejects the token', async () => {
  process.env.TURNSTILE_SECRET_KEY = 'sk_test'
  const originalFetch = globalThis.fetch
  globalThis.fetch = async () => ({ json: async () => ({ success: false }) })
  const res = fakeRes()
  let called = false
  await requireTurnstile(fakeReq({ turnstileToken: 'bad' }), res, () => { called = true })
  assert.equal(called, false)
  assert.equal(res.statusCode, 403)
  globalThis.fetch = originalFetch
  delete process.env.TURNSTILE_SECRET_KEY
})

test('passes through when Cloudflare accepts the token', async () => {
  process.env.TURNSTILE_SECRET_KEY = 'sk_test'
  const originalFetch = globalThis.fetch
  globalThis.fetch = async (url, init) => {
    assert.equal(url, 'https://challenges.cloudflare.com/turnstile/v0/siteverify')
    const params = new URLSearchParams(init.body)
    assert.equal(params.get('secret'), 'sk_test')
    assert.equal(params.get('response'), 'good')
    assert.equal(params.get('remoteip'), '1.2.3.4')
    return { json: async () => ({ success: true }) }
  }
  let called = false
  await requireTurnstile(fakeReq({ turnstileToken: 'good' }), fakeRes(), () => { called = true })
  assert.equal(called, true)
  globalThis.fetch = originalFetch
  delete process.env.TURNSTILE_SECRET_KEY
})

test('403s (fails closed) when the verify call itself throws', async () => {
  process.env.TURNSTILE_SECRET_KEY = 'sk_test'
  const originalFetch = globalThis.fetch
  globalThis.fetch = async () => { throw new Error('network down') }
  const res = fakeRes()
  let called = false
  await requireTurnstile(fakeReq({ turnstileToken: 'good' }), res, () => { called = true })
  assert.equal(called, false)
  assert.equal(res.statusCode, 403)
  globalThis.fetch = originalFetch
  delete process.env.TURNSTILE_SECRET_KEY
})
