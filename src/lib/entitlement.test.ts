import test from 'node:test'
import assert from 'node:assert/strict'
import { hasActiveAccess, FREE_STUDENT_PATHS } from './entitlement.ts'
import type { Entitlement } from './useIdentity'

const ent = (state: Entitlement['state']): Entitlement => ({ state, plan: 'X', expiresAt: null, daysLeft: null })

test('trial and paid grant access; lapsed states do not', () => {
  assert.equal(hasActiveAccess(ent('active')), true)
  assert.equal(hasActiveAccess(ent('trialing')), true)
  assert.equal(hasActiveAccess(ent('expired')), false)
  assert.equal(hasActiveAccess(ent('cancelled')), false)
  assert.equal(hasActiveAccess(ent('none')), false)
})

test('free set keeps the pay/subscribe path reachable and never a gated page', () => {
  // Without these two a lapsed student could never reach the place they subscribe.
  assert.ok(FREE_STUDENT_PATHS.has('account'))
  assert.ok(FREE_STUDENT_PATHS.has('upgrade'))
  // The dashboard index, the daily teaser, study rooms and the minigames
  // (hub + every game) stay open.
  for (const free of ['', 'qotd', 'study-rooms', 'minigames', 'spotter', 'term-match', 'clinical-sequence']) {
    assert.ok(FREE_STUDENT_PATHS.has(free))
  }
  // The flagship paid pages must be gated.
  for (const gated of ['qbank', 'library', 'flashcards', 'adaptive']) assert.ok(!FREE_STUDENT_PATHS.has(gated))
})
