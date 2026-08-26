import test from 'node:test'
import assert from 'node:assert/strict'
import { affectedSessionRows, frozenQuestionIds } from './contentArchiveActivity.js'

test('reads frozen question ids without treating other party items as questions', () => {
  assert.deepEqual(frozenQuestionIds('["q-1","q-2"]'), ['q-1', 'q-2'])
  assert.deepEqual(frozenQuestionIds(JSON.stringify([
    { kind: 'question', id: 'q-1' },
    { kind: 'practical', id: 'p-1' },
  ]), { party: true }), ['q-1'])
})

test('only sessions containing an archive target block the operation', () => {
  const rows = [
    { questionIds: '["assigned-q"]' },
    { questionIds: '["unassigned-q","assigned-q"]' },
    { questionIds: '[]' },
  ]
  assert.equal(affectedSessionRows(rows, 'questionIds', new Set(['unassigned-q'])), 1)
  assert.equal(affectedSessionRows(rows, 'questionIds', new Set(['another-q'])), 0)
})

test('malformed frozen session data remains a conservative blocker', () => {
  assert.equal(affectedSessionRows([{ questionIds: '{broken' }], 'questionIds', new Set(['q-1'])), 1)
})
