import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ApiError, errorKind, isRetryable } from './apiErrors.ts'

test('a refusal is classified by what the server decided', () => {
  assert.equal(errorKind(new ApiError(401, 'GET /state/x')), 'unauthorized')
  assert.equal(errorKind(new ApiError(403, 'PUT /state/x')), 'forbidden')
  assert.equal(errorKind(new ApiError(404, 'GET /state/x')), 'notfound')
  assert.equal(errorKind(new ApiError(413, 'PUT /user-state/x')), 'toolarge')
})

test('a server fault is told apart from a refusal', () => {
  assert.equal(errorKind(new ApiError(500, 'GET /state/x')), 'server')
  assert.equal(errorKind(new ApiError(502, 'GET /state/x')), 'server')
})

test('anything that never reached the server counts as a network fault', () => {
  assert.equal(errorKind(new TypeError('Failed to fetch')), 'network')
  assert.equal(errorKind('offline'), 'network')
  assert.equal(errorKind(undefined), 'network')
})

test('an unclassified 4xx is treated as a refusal, not retried', () => {
  // Guessing that a 400 or 422 will fix itself is how a bad payload becomes an
  // endless request loop; the safe default for a client-side fault is to stop.
  assert.equal(errorKind(new ApiError(400, 'PUT /state/x')), 'forbidden')
  assert.equal(errorKind(new ApiError(422, 'PUT /state/x')), 'forbidden')
})

test('only faults that might pass on a second try are retried', () => {
  assert.equal(isRetryable('network'), true)
  assert.equal(isRetryable('server'), true)
  // These are the four that produced the two-second retry storm.
  assert.equal(isRetryable('unauthorized'), false)
  assert.equal(isRetryable('forbidden'), false)
  assert.equal(isRetryable('notfound'), false)
  assert.equal(isRetryable('toolarge'), false)
})

test('an ApiError keeps the status and path it was built from', () => {
  const error = new ApiError(403, 'PUT /state/nishany-vouchers-v1')
  assert.equal(error.status, 403)
  assert.equal(error.path, 'PUT /state/nishany-vouchers-v1')
  assert.match(error.message, /403/)
  assert.ok(error instanceof Error)
})
