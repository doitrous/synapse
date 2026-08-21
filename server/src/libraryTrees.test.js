import test from 'node:test'
import assert from 'node:assert/strict'
import { LIBRARY_TREES_STATE_KEY, parseTreeScope, treeScope } from './libraryTrees.js'

test('a scope names what it is a tree of', () => {
  assert.equal(treeScope('module', 'MOD_CVS'), 'module:MOD_CVS')
  assert.equal(treeScope('year', 'OMS_Y2'), 'year:OMS_Y2')
})

test('a scope reads back as the thing it names', () => {
  assert.deepEqual(parseTreeScope('module:MOD_CVS'), { kind: 'module', id: 'MOD_CVS' })
  assert.deepEqual(parseTreeScope('year:OMS_Y2'), { kind: 'year', id: 'OMS_Y2' })
})

test('a module id containing a colon survives the round trip', () => {
  // Module ids are typed by a person — "101 ISK" today, anything tomorrow.
  assert.deepEqual(parseTreeScope(treeScope('module', 'A:B')), { kind: 'module', id: 'A:B' })
})

test('anything that is not a scope is refused rather than guessed', () => {
  assert.equal(parseTreeScope('MOD_CVS'), null)
  assert.equal(parseTreeScope('cohort:X'), null)
  assert.equal(parseTreeScope('module:'), null)
  assert.equal(parseTreeScope(':MOD_CVS'), null)
  assert.equal(parseTreeScope(''), null)
  assert.equal(parseTreeScope(null), null)
})

test('the document these live in is named once', () => {
  assert.equal(LIBRARY_TREES_STATE_KEY, 'synapse-library-trees-v1')
})
