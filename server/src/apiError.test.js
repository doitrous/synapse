import test from 'node:test'
import assert from 'node:assert/strict'
import { ApiError } from './apiError.js'

test('ApiError carries status, code and a public message a caller may see', () => {
  const error = new ApiError(403, 'not_your_share', 'You do not have access to this document.')
  assert.ok(error instanceof Error)
  assert.equal(error.status, 403)
  assert.equal(error.code, 'not_your_share')
  assert.equal(error.publicMessage, 'You do not have access to this document.')
})

test('a missing publicMessage falls back to the code, never to undefined', () => {
  const error = new ApiError(500, 'internal')
  assert.equal(error.publicMessage, 'internal')
  assert.equal(error.message, 'internal')
})
