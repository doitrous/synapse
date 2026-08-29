import { test } from 'node:test'
import assert from 'node:assert/strict'
import { answerPercentages } from './answerDistribution.ts'

test('a clean split rounds to whole percentages that still sum to 100', () => {
  const result = answerPercentages([4, 1, 0, 0], 5)
  assert.deepEqual(result, [80, 20, 0, 0])
  assert.equal(result.reduce((sum, value) => sum + value, 0), 100)
})

test('a three-way tie hands the leftover point to the largest remainder', () => {
  // 1/3 of 100 is 33.33... for every option — floored that is 99, one short —
  // so exactly one option is bumped to 34. Which one is unspecified by ties,
  // so the test only pins down what the contract actually promises: the sum.
  const result = answerPercentages([1, 1, 1], 3)
  assert.equal(result.reduce((sum, value) => sum + value, 0), 100)
  assert.equal(result.filter((value) => value === 34).length, 1)
  assert.equal(result.filter((value) => value === 33).length, 2)
})

test('nobody has answered yet, so every share is zero', () => {
  assert.deepEqual(answerPercentages([0, 0, 0, 0], 0), [0, 0, 0, 0])
})

test('no options at all yields no percentages', () => {
  assert.deepEqual(answerPercentages([], 0), [])
})
