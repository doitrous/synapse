import assert from 'node:assert/strict'
import { test } from 'node:test'
import { initialLoadState } from './loadingState.ts'

test('initial reads wait for every required document', () => {
  assert.deepEqual(initialLoadState({ hydrated: true, error: null }, { hydrated: false, error: null }), { loading: true, error: null })
  assert.deepEqual(initialLoadState({ hydrated: true, error: null }), { loading: false, error: null })
  assert.deepEqual(initialLoadState(), { loading: false, error: null })
})
test('failures end the skeleton even when a failed read is not hydrated', () => {
  assert.deepEqual(initialLoadState({ hydrated: false, error: null }, { hydrated: false, error: 'network' }), { loading: false, error: 'network' })
})
test('saving an already loaded document does not hide usable content', () => {
  const saving = { hydrated: true, error: null, pending: true }
  assert.equal(initialLoadState(saving).loading, false)
})
