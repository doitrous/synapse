import test from 'node:test'
import assert from 'node:assert/strict'
import {
  entitlementOf, extensionBase, addDays, readReason, stateFamily, normaliseUsername, usernameProblem,
  usernameAvailability, isProfileComplete, saveOwnEnrolment, recordAiConsent,
} from './accounts.js'
import { pool } from './db.js'

const NOW = new Date('2026-08-13T12:00:00Z')

test('a subscription past its expiry reads as expired even while stored active', () => {
  // Status is written once and time keeps moving. If expiry were trusted only
  // when some job had rewritten the row, a lapsed account would keep showing as
  // active until that job ran.
  const entitlement = entitlementOf({ plan: 'QBank', status: 'active', expires_at: '2026-08-01T00:00:00Z' }, NOW)
  assert.equal(entitlement.state, 'expired')
  assert.equal(entitlement.daysLeft, 0)
})

test('an open-ended grant never lapses and reports no day count', () => {
  const entitlement = entitlementOf({ plan: 'Adaptive', status: 'active', expires_at: null }, NOW)
  assert.equal(entitlement.state, 'active')
  assert.equal(entitlement.daysLeft, null)
})

test('a cancelled subscription is cancelled, not expired', () => {
  const entitlement = entitlementOf({ plan: 'QBank', status: 'cancelled', expires_at: '2027-01-01T00:00:00Z' }, NOW)
  assert.equal(entitlement.state, 'cancelled')
})

test('no subscription at all is reported as none rather than as a free plan expiring', () => {
  assert.equal(entitlementOf(null, NOW).state, 'none')
})

test('extending a live subscription adds to the time left rather than restarting it', () => {
  // Granting 30 days to someone with 10 remaining must give 40. Restarting from
  // today would quietly take 10 paid days away.
  const base = extensionBase({ expires_at: '2026-08-23T12:00:00Z' }, NOW)
  assert.equal(base.toISOString(), '2026-08-23T12:00:00.000Z')
  assert.equal(addDays(base, 30).toISOString(), '2026-09-22T12:00:00.000Z')
})

test('extending a lapsed subscription starts from today, not from the old expiry', () => {
  // The days between expiry and now were not paid for, so crediting them would
  // hand back time the person did not have.
  const base = extensionBase({ expires_at: '2026-01-01T00:00:00Z' }, NOW)
  assert.equal(base.getTime(), NOW.getTime())
})

test('a first grant starts from today', () => {
  assert.equal(extensionBase(null, NOW).getTime(), NOW.getTime())
})

test('a reason must be written, not just present', () => {
  assert.equal(readReason({ reason: '   ' }), null)
  assert.equal(readReason({ reason: 'typo' }), null)
  assert.equal(readReason({}), null)
  assert.equal(readReason({ reason: 'refund for the March outage' }), 'refund for the March outage')
})


test('per-user state keys fold into families a person would recognise', () => {
  // An admin asks "has this student written anything", not "what is in
  // nishany.notebook.a3f". The grouping is what makes the answer readable.
  assert.equal(stateFamily('nishany.qbank.attempts'), 'Question bank')
  assert.equal(stateFamily('nishany.notebook.a3f9'), 'Notebook')
  assert.equal(stateFamily('nishany.library.read'), 'Library')
  assert.equal(stateFamily('nishany.maristanas.onboarding.v1'), 'Maristanas')
  assert.equal(stateFamily('nishany-notification-read-v1-42'), 'Notifications')
})

test('an unrecognised state key is reported, not dropped', () => {
  // A key nobody has classified yet is still evidence that somebody used the
  // product. Silently discarding it would understate their activity.
  assert.equal(stateFamily('nishany.something-new.v1'), 'Other')
  assert.equal(stateFamily(''), 'Other')
})

test('usernames normalize case, accents and punctuation for cohort uniqueness', () => {
  assert.equal(normaliseUsername('  Omar Élite!!  '), 'omar-elite')
  assert.equal(usernameProblem('ab'), 'username_too_short')
  assert.equal(usernameProblem('omary98'), null)
})

test('a profile is complete only once both a phone and an enrolment are on record', () => {
  // The gap this exists for: Google/Facebook OAuth hands back a name and an
  // email and nothing else, so phone stays null after a social sign-up until
  // CompleteProfile.tsx runs — even though onboarding has already filled in
  // the university.
  assert.equal(isProfileComplete({ phone: null, universityId: 'cairo' }), false, 'social sign-up before completing the form')
  assert.equal(isProfileComplete({ phone: '+201001234567', universityId: null }), false, 'phone on file but onboarding not finished yet')
  assert.equal(isProfileComplete({ phone: '+201001234567', universityId: 'cairo' }), true)
  // Nationality is deliberately not part of this rule — Signup.tsx marks it
  // optional, and a password-signup student who left it blank must not be
  // judged "incomplete" by a stricter rule than the form they filled in.
  assert.equal(isProfileComplete({ phone: '+201001234567', universityId: 'cairo', nationality: null }), true)
})

// saveOwnEnrolment builds its success return *after* the try/finally, so any
// state it reports (phoneConflict) must be declared outside the try block or
// the happy path throws ReferenceError. This drives the real query sequence
// through a fake connection to guard that scope.
function fakeEnrolmentPool(t, { phoneHeldByOther }) {
  const conn = {
    beginTransaction: async () => {},
    commit: async () => {},
    rollback: async () => {},
    release: () => {},
    query: async (sql) => {
      if (/FOR UPDATE/.test(sql)) return [[{ id: 'stu-1', user_id: 'stu-1' }]]
      if (/WHERE phone = /.test(sql)) return [phoneHeldByOther ? [{ id: 'someone-else' }] : []]
      if (/SELECT name, email, university_id/.test(sql)) return [[{ name: null, email: 'a@b.c', universityId: null, year: null, yearId: null, usernameNormalized: null }]]
      if (/FROM subscriptions/.test(sql)) return [[]]
      return [{ affectedRows: 1 }]
    },
  }
  t.mock.method(pool, 'getConnection', async () => conn)
  t.mock.method(pool, 'query', async () => [[]]) // getUserByIdentity → no row
}

test('saveOwnEnrolment returns on the happy path without a scope error', async (t) => {
  fakeEnrolmentPool(t, { phoneHeldByOther: false })
  const result = await saveOwnEnrolment('stu-1', { universityId: 'cairo', year: 'Year 1', phone: '+201001234567' })
  assert.equal(result.ok, true)
  assert.equal(result.phoneConflict, false)
})

test('saveOwnEnrolment reports phoneConflict when the number belongs to someone else', async (t) => {
  fakeEnrolmentPool(t, { phoneHeldByOther: true })
  const result = await saveOwnEnrolment('stu-1', { universityId: 'cairo', year: 'Year 1', phone: '+201001234567' })
  assert.equal(result.ok, true)
  assert.equal(result.phoneConflict, true)
})

/* ── usernameAvailability: the /api/me/username-available pre-check ────── */

test('usernameAvailability rejects an invalid handle without querying', async () => {
  const conn = { query: async () => { throw new Error('must not query on an invalid handle') } }
  const result = await usernameAvailability(conn, { handle: 'ab', universityId: 'cairo', currentUsernameNormalized: null, studentId: 's1' })
  assert.deepEqual(result, { available: false, reason: 'invalid' })
})

test('usernameAvailability reports unchanged for the caller\'s own current handle', async () => {
  const conn = { query: async () => { throw new Error('must not query when the handle has not changed') } }
  const result = await usernameAvailability(conn, { handle: 'Omar_98', universityId: 'cairo', currentUsernameNormalized: 'omar_98', studentId: 's1' })
  assert.deepEqual(result, { available: true, reason: 'unchanged' })
})

test('usernameAvailability reports taken when another student in the same university holds it', async () => {
  const conn = { query: async () => [[{ id: 'someone-else' }]] }
  const result = await usernameAvailability(conn, { handle: 'newhandle', universityId: 'cairo', currentUsernameNormalized: null, studentId: 's1' })
  assert.deepEqual(result, { available: false, reason: 'taken' })
})

test('usernameAvailability reports available for a free handle', async () => {
  const conn = { query: async () => [[]] }
  const result = await usernameAvailability(conn, { handle: 'freshhandle', universityId: 'cairo', currentUsernameNormalized: null, studentId: 's1' })
  assert.deepEqual(result, { available: true })
})

/* ── recordAiConsent: written once, read back on every later call ──────── */

test('recordAiConsent sets the timestamp the first time and leaves it alone after', async (t) => {
  let stored = null
  const conn = {
    beginTransaction: async () => {},
    commit: async () => {},
    rollback: async () => {},
    release: () => {},
    query: async (sql) => {
      if (/FOR UPDATE/.test(sql)) return [[{ id: 'stu-1', user_id: 'stu-1' }]]
      if (/UPDATE students SET ai_consent_at/.test(sql)) {
        stored = stored ?? '2026-09-03T00:00:00.000Z'
        return [{ affectedRows: 1 }]
      }
      if (/SELECT ai_consent_at/.test(sql)) return [[{ aiConsentAt: stored }]]
      return [{ affectedRows: 1 }]
    },
  }
  t.mock.method(pool, 'getConnection', async () => conn)
  const first = await recordAiConsent('stu-1')
  assert.equal(first.ok, true)
  assert.equal(first.aiConsentAt, '2026-09-03T00:00:00.000Z')
  const second = await recordAiConsent('stu-1')
  assert.equal(second.aiConsentAt, first.aiConsentAt, 're-consenting must not move the timestamp')
})

/* ── saveOwnEnrolment: status_message ────────────────────────────────── */

function fakeEnrolmentPoolWithStatus(t, { storedStatusMessage = null } = {}) {
  let written = undefined
  const conn = {
    beginTransaction: async () => {},
    commit: async () => {},
    rollback: async () => {},
    release: () => {},
    query: async (sql, params) => {
      if (/FOR UPDATE/.test(sql)) return [[{ id: 'stu-1', user_id: 'stu-1' }]]
      if (/WHERE phone = /.test(sql)) return [[]]
      if (/SELECT name, email, university_id/.test(sql)) {
        return [[{ name: null, email: 'a@b.c', universityId: null, year: null, yearId: null, usernameNormalized: null, statusMessage: storedStatusMessage }]]
      }
      if (/UPDATE students/.test(sql)) { written = params; return [{ affectedRows: 1 }] }
      if (/FROM subscriptions/.test(sql)) return [[]]
      return [{ affectedRows: 1 }]
    },
  }
  t.mock.method(pool, 'getConnection', async () => conn)
  t.mock.method(pool, 'query', async () => [[]])
  return () => written
}

test('saveOwnEnrolment strips control characters and caps the status message at 140 chars', async (t) => {
  const writtenParams = fakeEnrolmentPoolWithStatus(t)
  const longMessage = `hithere${'x'.repeat(200)}`
  const result = await saveOwnEnrolment('stu-1', { universityId: 'cairo', year: 'Year 1', statusMessage: longMessage })
  assert.equal(result.ok, true)
  // status_message is the 11th placeholder in the UPDATE, right before the id.
  const stored = writtenParams().at(-2)
  assert.ok(!stored.includes(''), 'control character must be stripped')
  assert.equal(stored.length, 140)
})

test('saveOwnEnrolment clears the status message on an explicit empty string', async (t) => {
  const writtenParams = fakeEnrolmentPoolWithStatus(t, { storedStatusMessage: 'previously set' })
  const result = await saveOwnEnrolment('stu-1', { universityId: 'cairo', year: 'Year 1', statusMessage: '' })
  assert.equal(result.ok, true)
  assert.equal(writtenParams().at(-2), null)
})

test('saveOwnEnrolment leaves the status message untouched when the field is not sent', async (t) => {
  const writtenParams = fakeEnrolmentPoolWithStatus(t, { storedStatusMessage: 'kept as-is' })
  const result = await saveOwnEnrolment('stu-1', { universityId: 'cairo', year: 'Year 1' })
  assert.equal(result.ok, true)
  assert.equal(writtenParams().at(-2), 'kept as-is')
})
