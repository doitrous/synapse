import test from 'node:test'
import assert from 'node:assert/strict'
import { validateContactMessage } from './contact.js'

const valid = { name: 'Maya', email: 'maya@example.com', topic: 'Billing', message: 'A question about my last invoice.' }

test('accepts a well-formed submission', () => {
  const result = validateContactMessage(valid)
  assert.equal(result.error, undefined)
  assert.equal(result.name, 'Maya')
  assert.equal(result.email, 'maya@example.com')
  assert.equal(result.topic, 'Billing')
})

test('rejects a missing or overlong name', () => {
  assert.equal(validateContactMessage({ ...valid, name: '' }).error, 'invalid_name')
  assert.equal(validateContactMessage({ ...valid, name: 'a'.repeat(201) }).error, 'invalid_name')
})

test('rejects a malformed email', () => {
  assert.equal(validateContactMessage({ ...valid, email: 'not-an-email' }).error, 'invalid_email')
  assert.equal(validateContactMessage({ ...valid, email: '' }).error, 'invalid_email')
})

test('rejects a message that is too short or too long', () => {
  assert.equal(validateContactMessage({ ...valid, message: 'hi' }).error, 'invalid_message')
  assert.equal(validateContactMessage({ ...valid, message: 'x'.repeat(5001) }).error, 'invalid_message')
})

test('topic is optional and defaults to null', () => {
  const { topic } = validateContactMessage({ ...valid, topic: undefined })
  assert.equal(topic, null)
})

test('lowercases and trims the email, trims the name and message', () => {
  const result = validateContactMessage({ ...valid, name: '  Maya  ', email: ' MAYA@Example.com ', message: '  A question about my last invoice.  ' })
  assert.equal(result.name, 'Maya')
  assert.equal(result.email, 'maya@example.com')
  assert.equal(result.message, 'A question about my last invoice.')
})
