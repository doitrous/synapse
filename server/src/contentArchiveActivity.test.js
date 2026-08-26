import test from 'node:test'
import assert from 'node:assert/strict'
import { affectedSessionIds, affectedSessionRows, affectedSessionSetsMatch, frozenQuestionIds } from './contentArchiveActivity.js'

test('reads frozen question ids without treating other party items as questions', () => {
  assert.deepEqual(frozenQuestionIds('["q-1","q-2"]'), ['q-1', 'q-2'])
  assert.deepEqual(frozenQuestionIds(JSON.stringify([
    { kind: 'question', id: 'q-1' },
    { kind: 'practical', id: 'p-1' },
  ]), { party: true }), ['q-1'])
})

test('only sessions containing an archive target block the operation', () => {
  const rows = [
    { id: 'assigned-room', questionIds: '["assigned-q"]' },
    { id: 'target-room', questionIds: '["unassigned-q","assigned-q"]' },
    { id: 'empty-room', questionIds: '[]' },
  ]
  assert.equal(affectedSessionRows(rows, 'questionIds', new Set(['unassigned-q'])), 1)
  assert.equal(affectedSessionRows(rows, 'questionIds', new Set(['another-q'])), 0)
  assert.deepEqual(affectedSessionIds(rows, 'questionIds', new Set(['unassigned-q'])), ['target-room'])
})

test('malformed frozen session data remains a conservative blocker', () => {
  assert.equal(affectedSessionRows([{ id: 'broken-room', questionIds: '{broken' }], 'questionIds', new Set(['q-1'])), 1)
  assert.deepEqual(affectedSessionIds([{ id: 'broken-room', questionIds: '{broken' }], 'questionIds', new Set(['q-1'])), ['broken-room'])
})

test('session acknowledgement matches identities rather than counts alone', () => {
  const expected = { studyRooms: ['room-1'], challenges: ['challenge-1'], partyQuestionSessions: [] }
  assert.equal(affectedSessionSetsMatch(expected, { studyRooms: ['room-1'], challenges: ['challenge-1'], partyQuestionSessions: [] }), true)
  assert.equal(affectedSessionSetsMatch(expected, { studyRooms: ['room-2'], challenges: ['challenge-1'], partyQuestionSessions: [] }), false)
  assert.equal(affectedSessionSetsMatch(expected, { studyRooms: ['room-1'], challenges: ['challenge-1'], partyQuestionSessions: ['party-1'] }), false)
  assert.equal(affectedSessionSetsMatch(undefined, expected), false)
})
