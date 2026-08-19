import test from 'node:test'
import assert from 'node:assert/strict'
import { normalisePhone, normaliseEmail, withinRateLimit, resetRateLimit } from './identity.js'

test('a phone number is the same number however it is written', () => {
  assert.equal(normalisePhone('+20 100 123 4567'), '+201001234567')
  assert.equal(normalisePhone('0020-100-123-4567'), '+201001234567')
  assert.equal(normalisePhone('(0100) 123.4567'), '+201001234567')
  assert.equal(normalisePhone('01001234567'), normalisePhone('+201001234567'))
})

test('what is not a phone number is refused rather than stored', () => {
  assert.equal(normalisePhone(''), null)
  assert.equal(normalisePhone(null), null)
  assert.equal(normalisePhone('not a phone'), null)
  assert.equal(normalisePhone('12345'), null)
  assert.equal(normalisePhone('+1234567890123456'), null)
})

test('an email is the same address whatever case it is typed in', () => {
  assert.equal(normaliseEmail(' Omar@Example.COM '), 'omar@example.com')
  assert.equal(normaliseEmail('omar@example'), null)
})

test('the client and the server agree on what one number looks like', () => {
  // These are the exact expectations src/data/accountIdentity.test.ts asserts.
  // The two implementations are separate — different languages, different
  // packages — so the agreement is held by both suites rather than by an import.
  for (const written of ['+20 100 123 4567', '0020 100 123 4567', '01001234567', '+20-100-123-4567']) {
    assert.equal(normalisePhone(written), '+201001234567', written)
  }
})

test('a caller gets a budget, and is refused once it is spent', () => {
  resetRateLimit()
  const at = 1_000_000
  for (let i = 0; i < 20; i++) assert.equal(withinRateLimit('1.2.3.4', at + i), true, `call ${i}`)
  assert.equal(withinRateLimit('1.2.3.4', at + 20), false)
  // Another caller is unaffected by the first one's spending.
  assert.equal(withinRateLimit('5.6.7.8', at + 20), true)
})

test('the budget refills once the window has passed', () => {
  resetRateLimit()
  const at = 2_000_000
  for (let i = 0; i < 20; i++) withinRateLimit('9.9.9.9', at + i)
  assert.equal(withinRateLimit('9.9.9.9', at + 20), false)
  assert.equal(withinRateLimit('9.9.9.9', at + 61_000), true)
})
