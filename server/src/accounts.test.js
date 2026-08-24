import test from 'node:test'
import assert from 'node:assert/strict'
import { entitlementOf, extensionBase, addDays, readReason, stateFamily, normaliseUsername, usernameProblem } from './accounts.js'

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
  // synapse.notebook.a3f". The grouping is what makes the answer readable.
  assert.equal(stateFamily('synapse.qbank.attempts'), 'Question bank')
  assert.equal(stateFamily('synapse.notebook.a3f9'), 'Notebook')
  assert.equal(stateFamily('synapse.library.read'), 'Library')
  assert.equal(stateFamily('synapse-notification-read-v1-42'), 'Notifications')
})

test('an unrecognised state key is reported, not dropped', () => {
  // A key nobody has classified yet is still evidence that somebody used the
  // product. Silently discarding it would understate their activity.
  assert.equal(stateFamily('synapse.something-new.v1'), 'Other')
  assert.equal(stateFamily(''), 'Other')
})

test('usernames normalize case, accents and punctuation for cohort uniqueness', () => {
  assert.equal(normaliseUsername('  Omar Élite!!  '), 'omar-elite')
  assert.equal(usernameProblem('ab'), 'username_too_short')
  assert.equal(usernameProblem('omary98'), null)
})
