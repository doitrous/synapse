import { test } from 'node:test'
import assert from 'node:assert/strict'
import { refreshFailureIsFatal } from './auth.js'

test('a transient GoTrue outage is never fatal — the session must survive', () => {
  assert.equal(refreshFailureIsFatal({ status: 502, code: 'auth_unreachable' }), false)
  assert.equal(refreshFailureIsFatal({ status: 503, code: 'auth_not_configured' }), false)
  assert.equal(refreshFailureIsFatal({ status: 500, code: 'auth_error' }), false)
  assert.equal(refreshFailureIsFatal({ status: 504, code: 'auth_error' }), false)
  assert.equal(refreshFailureIsFatal({ status: 429, code: 'over_request_rate_limit' }), false)
})

test('an explicit rejection of the refresh token is fatal — destroy the session', () => {
  assert.equal(refreshFailureIsFatal({ status: 400, code: 'invalid_grant' }), true)
  assert.equal(refreshFailureIsFatal({ status: 401, code: 'bad_jwt' }), true)
  assert.equal(refreshFailureIsFatal({ status: 403, code: 'refresh_token_not_found' }), true)
})

test('no error object is not fatal (a missing token without a rejection keeps the session)', () => {
  assert.equal(refreshFailureIsFatal(null), false)
  assert.equal(refreshFailureIsFatal(undefined), false)
})
