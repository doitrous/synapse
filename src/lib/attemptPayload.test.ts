import { test } from 'node:test'
import assert from 'node:assert/strict'
import { toPendingPayloads } from './attemptPayload.ts'
import type { AttemptRecord } from '../data/attempts.ts'

function base(over: Partial<AttemptRecord>): AttemptRecord {
  return {
    id: 'a1', at: '2026-09-01T10:00:00.000Z', surface: 'qbank', itemId: 'q1',
    subjectId: 's', topic: 't', difficulty: 'Moderate', conceptIds: [],
    correct: true, seconds: 30, selectedIndex: 2, sessionId: 'sess1',
    ...over,
  } as AttemptRecord
}

test('only markable qbank answers become server payloads', () => {
  const records = [
    base({ id: 'a1', selectedIndex: 2 }),
    base({ id: 'a2', surface: 'room', selectedIndex: 1 }), // wrong surface
    base({ id: 'a3', selectedIndex: undefined as unknown as number }), // no choice
    base({ id: 'a4', surface: 'flashcard', selectedIndex: 0 }),
  ]
  const out = toPendingPayloads(records)
  assert.deepEqual(out.map((p) => p.attemptId), ['a1'])
  assert.equal(out[0].questionId, 'q1')
  assert.equal(out[0].answerIndex, 2)
  assert.equal(out[0].answeredAt, '2026-09-01T10:00:00.000Z')
})

test('answerIndex 0 is a real choice, not falsy-dropped', () => {
  const out = toPendingPayloads([base({ id: 'z', selectedIndex: 0 })])
  assert.equal(out.length, 1)
  assert.equal(out[0].answerIndex, 0)
})
