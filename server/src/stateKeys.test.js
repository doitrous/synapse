import test from 'node:test'
import assert from 'node:assert/strict'
import { canonicalStateKey } from './stateKeys.js'

test('a pre-rebrand request key is mapped forward to the renamed row', () => {
  // A browser still running the old bundle sends the retired prefix; it must
  // resolve to the row the migration renamed, across all three separators.
  assert.equal(canonicalStateKey('synapse-media-library-v1'), 'nishany-media-library-v1')
  assert.equal(canonicalStateKey('synapse.qbank.attempts'), 'nishany.qbank.attempts')
  assert.equal(canonicalStateKey('synapse:maristana-progress'), 'nishany:maristana-progress')
})

test('a current key passes through unchanged', () => {
  assert.equal(canonicalStateKey('nishany-media-library-v1'), 'nishany-media-library-v1')
  assert.equal(canonicalStateKey('nishany.qbank.attempts'), 'nishany.qbank.attempts')
})

test('only the leading prefix is rewritten, and unrelated keys are untouched', () => {
  // "synapse" inside the tail (a medical term, an id) must not be rewritten.
  assert.equal(canonicalStateKey('synapse-concept-synapse-graph'), 'nishany-concept-synapse-graph')
  assert.equal(canonicalStateKey('something-else'), 'something-else')
  assert.equal(canonicalStateKey(undefined), undefined)
})
