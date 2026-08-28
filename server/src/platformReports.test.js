import test from 'node:test'
import assert from 'node:assert/strict'
import { GIGABYTE } from './storage.js'
import { reachedStorageThresholdGb, storageWarningState } from './platformReports.js'

test('storage warnings fire at 20, 50, 70, 90, 110 GB and every 20 GB after', () => {
  assert.equal(reachedStorageThresholdGb(19 * GIGABYTE), null)
  assert.equal(reachedStorageThresholdGb(20 * GIGABYTE), 20)
  assert.equal(reachedStorageThresholdGb(69 * GIGABYTE), 50)
  assert.equal(reachedStorageThresholdGb(90 * GIGABYTE), 90)
  assert.equal(reachedStorageThresholdGb(109 * GIGABYTE), 90)
  assert.equal(reachedStorageThresholdGb(110 * GIGABYTE), 110)
  assert.equal(reachedStorageThresholdGb(129 * GIGABYTE), 110)
  assert.equal(reachedStorageThresholdGb(130 * GIGABYTE), 130)
})

test('a dismissed storage threshold stays quiet until the next threshold is crossed', () => {
  assert.deepEqual(storageWarningState({ usedBytes: 55 * GIGABYTE, acknowledgedThresholdGb: 50 }), {
    reachedThresholdGb: 50,
    acknowledgedThresholdGb: 50,
    warning: false,
  })
  assert.deepEqual(storageWarningState({ usedBytes: 70 * GIGABYTE, acknowledgedThresholdGb: 50 }), {
    reachedThresholdGb: 70,
    acknowledgedThresholdGb: 50,
    warning: true,
  })
})
