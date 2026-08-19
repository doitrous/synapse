import test from 'node:test'
import assert from 'node:assert/strict'
import {
  DEFAULT_STORAGE_LIMITS, GIGABYTE, MEGABYTE, fitsWithinLimit, formatBytes, limitFor,
  normaliseBytes, remainingBytes, type StorageLimits,
} from './storageLimits.ts'

const limits: StorageLimits = {
  defaultBytes: 512 * MEGABYTE,
  byPlan: { free: 100 * MEGABYTE, Adaptive: 4 * GIGABYTE, locked: 0 },
}

test('the starting point is what every student already had', () => {
  assert.equal(DEFAULT_STORAGE_LIMITS.defaultBytes, GIGABYTE)
  assert.deepEqual(DEFAULT_STORAGE_LIMITS.byPlan, {})
})

test('a plan that names a limit gets it', () => {
  assert.equal(limitFor(limits, 'free'), 100 * MEGABYTE)
  assert.equal(limitFor(limits, 'Adaptive'), 4 * GIGABYTE)
})

test('a plan is matched however its name was capitalised when the subscription was taken out', () => {
  assert.equal(limitFor(limits, 'ADAPTIVE'), 4 * GIGABYTE)
  assert.equal(limitFor(limits, ' adaptive '), 4 * GIGABYTE)
})

test('a plan that names no limit falls back to the default', () => {
  assert.equal(limitFor(limits, 'qbank'), 512 * MEGABYTE)
  assert.equal(limitFor(limits, null), 512 * MEGABYTE)
  assert.equal(limitFor(limits, ''), 512 * MEGABYTE)
})

test('a plan given no room is different from a plan given no limit', () => {
  assert.equal(limitFor(limits, 'locked'), 0)
  assert.equal(fitsWithinLimit(limits, 'locked', 0, 1), false)
})

test('a limit is whole bytes and never negative', () => {
  assert.equal(normaliseBytes(1024.9), 1024)
  assert.equal(normaliseBytes(-5), 0)
  assert.equal(normaliseBytes('nonsense'), 0)
  assert.equal(normaliseBytes('2048'), 2048)
})

test('a file fits while it stays inside the limit, and not once it passes it', () => {
  assert.equal(fitsWithinLimit(limits, 'free', 0, 100 * MEGABYTE), true)
  assert.equal(fitsWithinLimit(limits, 'free', 0, 100 * MEGABYTE + 1), false)
  assert.equal(fitsWithinLimit(limits, 'free', 99 * MEGABYTE, MEGABYTE), true)
  assert.equal(fitsWithinLimit(limits, 'free', 99 * MEGABYTE, 2 * MEGABYTE), false)
})

test('what is left never goes below nothing, even when already over', () => {
  assert.equal(remainingBytes(limits, 'free', 40 * MEGABYTE), 60 * MEGABYTE)
  assert.equal(remainingBytes(limits, 'free', 200 * MEGABYTE), 0)
  assert.equal(remainingBytes(limits, 'free', -5), 100 * MEGABYTE)
})

test('a size is written the way a person reads one', () => {
  assert.equal(formatBytes(0), '0 B')
  assert.equal(formatBytes(900), '900 B')
  assert.equal(formatBytes(2048), '2 KB')
  assert.equal(formatBytes(5 * MEGABYTE), '5 MB')
  assert.equal(formatBytes(GIGABYTE), '1.0 GB')
  assert.equal(formatBytes(1.5 * GIGABYTE), '1.5 GB')
  assert.equal(formatBytes(-100), '0 B')
})
