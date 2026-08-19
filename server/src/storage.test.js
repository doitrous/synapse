import test from 'node:test'
import assert from 'node:assert/strict'
import {
  DEFAULT_STORAGE_LIMITS, GIGABYTE, MEGABYTE, effectivePlan, fitsWithinLimit, limitFor, normaliseBytes, readStorageLimits,
} from './storage.js'

const limits = { defaultBytes: 512 * MEGABYTE, byPlan: { free: 100 * MEGABYTE, Adaptive: 4 * GIGABYTE, locked: 0 } }

test('a plan that names a limit gets it, however it was capitalised', () => {
  assert.equal(limitFor(limits, 'free'), 100 * MEGABYTE)
  assert.equal(limitFor(limits, 'ADAPTIVE'), 4 * GIGABYTE)
  assert.equal(limitFor(limits, ' adaptive '), 4 * GIGABYTE)
})

test('a plan that names no limit falls back to the default', () => {
  assert.equal(limitFor(limits, 'qbank'), 512 * MEGABYTE)
  assert.equal(limitFor(limits, null), 512 * MEGABYTE)
})

test('a plan given no room is different from a plan given no limit', () => {
  assert.equal(limitFor(limits, 'locked'), 0)
  assert.equal(fitsWithinLimit(limits, 'locked', 0, 1), false)
})

test('a broken settings document falls back to the default, never to unlimited', () => {
  assert.deepEqual(readStorageLimits(null), DEFAULT_STORAGE_LIMITS)
  assert.deepEqual(readStorageLimits('nonsense'), DEFAULT_STORAGE_LIMITS)
  assert.equal(readStorageLimits({}).defaultBytes, GIGABYTE)
  assert.equal(readStorageLimits({ defaultBytes: -1 }).defaultBytes, GIGABYTE)
  assert.deepEqual(readStorageLimits({ byPlan: 'nope' }).byPlan, {})
})

test('a stored document is read as written', () => {
  const read = readStorageLimits({ defaultBytes: 2 * GIGABYTE, byPlan: { free: MEGABYTE, '': 5, ' ': 5 } })
  assert.equal(read.defaultBytes, 2 * GIGABYTE)
  assert.deepEqual(read.byPlan, { free: MEGABYTE })
})

test('a limit is whole bytes and never negative', () => {
  assert.equal(normaliseBytes(1024.9), 1024)
  assert.equal(normaliseBytes(-5), 0)
  assert.equal(normaliseBytes('2048'), 2048)
})

test('a file fits while it stays inside the limit', () => {
  assert.equal(fitsWithinLimit(limits, 'free', 99 * MEGABYTE, MEGABYTE), true)
  assert.equal(fitsWithinLimit(limits, 'free', 99 * MEGABYTE, 2 * MEGABYTE), false)
})

test('the client and the server agree on how a plan resolves to a limit', () => {
  // The same table src/data/storageLimits.test.ts asserts against.
  assert.equal(limitFor(limits, 'free'), 100 * MEGABYTE)
  assert.equal(limitFor(limits, 'Adaptive'), 4 * GIGABYTE)
  assert.equal(limitFor(limits, 'qbank'), 512 * MEGABYTE)
  assert.equal(limitFor(limits, 'locked'), 0)
})

test('a live subscription is judged against its own plan', () => {
  assert.equal(effectivePlan({ state: 'active', plan: 'Adaptive' }), 'Adaptive')
  assert.equal(effectivePlan({ state: 'trialing', plan: 'Adaptive' }), 'Adaptive')
})

test('a lapsed subscription keeps neither the plan nor the room it paid for', () => {
  assert.equal(effectivePlan({ state: 'expired', plan: 'Adaptive' }), 'Free')
  assert.equal(effectivePlan({ state: 'cancelled', plan: 'Adaptive' }), 'Free')
  assert.equal(effectivePlan({ state: 'none', plan: 'Free' }), 'Free')
  assert.equal(effectivePlan(null), 'Free')
})

test('dropping to Free lowers the ceiling without touching what is already stored', () => {
  const lapsed = effectivePlan({ state: 'expired', plan: 'Adaptive' })
  // From 4 GB down to whatever Free is given — here 100 MB.
  assert.equal(limitFor(limits, lapsed), 100 * MEGABYTE)
  // Already far over the new ceiling: nothing more may be added, and this
  // function is the only thing consulted — no caller is asked to delete.
  assert.equal(fitsWithinLimit(limits, lapsed, 600 * MEGABYTE, 1), false)
})
