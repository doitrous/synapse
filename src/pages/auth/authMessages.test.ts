import test from 'node:test'
import assert from 'node:assert/strict'
import { verificationLinkError } from './authMessages.ts'

/* 1. A link that worked says nothing, and the page stays on its success path. */
test('a landing URL without error parameters reports no failure', () => {
  assert.equal(verificationLinkError('', ''), null)
  assert.equal(verificationLinkError('?email=amina%40university.edu', '#access_token=abc&type=signup'), null)
})

/* 2. The expiry a student is most likely to hit, named as expiry. */
test('an expired link is explained as expired', () => {
  const failure = verificationLinkError('', '#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired')
  assert.match(String(failure), /expired/i)
})

/* 3. A reused link denies access without an expiry code of its own. */
test('a denied link is explained as no longer valid', () => {
  const failure = verificationLinkError('', '#error=access_denied&error_description=Email+link+is+invalid')
  assert.match(String(failure), /no longer valid/i)
})

/* 4. Server-side failures arrive on the query string instead of the hash. */
test('an error carried in the query string is still read', () => {
  const failure = verificationLinkError('?error=server_error&error_code=unexpected_failure', '')
  assert.match(String(failure), /could not complete/i)
})

/* 5. error_description is attacker-editable text; it is never repeated back. */
test('the description from the URL is never shown to the student', () => {
  const failure = verificationLinkError('', '#error=access_denied&error_description=Call+555-0100+to+restore+your+account')
  assert.doesNotMatch(String(failure), /555-0100/)
})
