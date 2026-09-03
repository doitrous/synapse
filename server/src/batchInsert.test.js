import test from 'node:test'
import assert from 'node:assert/strict'
import { chunk } from './batchInsert.js'

test('chunk splits into batches of at most size, preserving order', () => {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]])
  assert.deepEqual(chunk([], 2), [])
  assert.deepEqual(chunk([1], 500), [[1]])
})
