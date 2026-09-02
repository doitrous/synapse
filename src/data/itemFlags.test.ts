import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  EMPTY_ITEM_FLAGS,
  flaggedAt,
  flaggedIds,
  isFlagged,
  toggleFlag,
  type ItemFlagsDoc,
} from './itemFlags.ts'

test('a flag goes up and comes down again', () => {
  const up = toggleFlag(EMPTY_ITEM_FLAGS, 'practical', 'osce-1', '2026-09-01T10:00:00.000Z')
  assert.equal(isFlagged(up, 'practical', 'osce-1'), true)
  assert.equal(flaggedAt(up, 'practical', 'osce-1'), '2026-09-01T10:00:00.000Z')

  const down = toggleFlag(up, 'practical', 'osce-1', '2026-09-01T11:00:00.000Z')
  assert.equal(isFlagged(down, 'practical', 'osce-1'), false)
  assert.deepEqual(flaggedIds(down, 'practical'), [])
})

test('toggling does not mutate the document it was given', () => {
  const before = toggleFlag(EMPTY_ITEM_FLAGS, 'essay', 'e1', '2026-09-01T10:00:00.000Z')
  const snapshot = JSON.stringify(before)
  toggleFlag(before, 'essay', 'e2', '2026-09-01T10:05:00.000Z')
  assert.equal(JSON.stringify(before), snapshot)
})

test('the two banks are separate id spaces', () => {
  // A station and an essay can legitimately carry the same id, and flagging one
  // must never light up the other.
  let doc = toggleFlag(EMPTY_ITEM_FLAGS, 'practical', 'shared-id', '2026-09-01T10:00:00.000Z')
  assert.equal(isFlagged(doc, 'essay', 'shared-id'), false)
  doc = toggleFlag(doc, 'essay', 'shared-id', '2026-09-01T10:01:00.000Z')
  assert.equal(isFlagged(doc, 'practical', 'shared-id'), true)
  assert.equal(isFlagged(doc, 'essay', 'shared-id'), true)

  doc = toggleFlag(doc, 'practical', 'shared-id', '2026-09-01T10:02:00.000Z')
  assert.equal(isFlagged(doc, 'practical', 'shared-id'), false)
  assert.equal(isFlagged(doc, 'essay', 'shared-id'), true)
})

test('ids come back newest flag first', () => {
  let doc = EMPTY_ITEM_FLAGS
  doc = toggleFlag(doc, 'practical', 'first', '2026-09-01T08:00:00.000Z')
  doc = toggleFlag(doc, 'practical', 'third', '2026-09-01T20:00:00.000Z')
  doc = toggleFlag(doc, 'practical', 'second', '2026-09-01T12:00:00.000Z')
  assert.deepEqual(flaggedIds(doc, 'practical'), ['third', 'second', 'first'])
})

test('a document written before a bank existed still reads', () => {
  // Exactly what loads off a device that last saved when only practical items
  // could be flagged. It must read as "nothing flagged there", not throw.
  const legacy = { version: 1, practical: { 'osce-1': '2026-09-01T10:00:00.000Z' } } as unknown as ItemFlagsDoc
  assert.deepEqual(flaggedIds(legacy, 'essay'), [])
  assert.equal(isFlagged(legacy, 'essay', 'anything'), false)
  const added = toggleFlag(legacy, 'essay', 'e1', '2026-09-02T10:00:00.000Z')
  assert.deepEqual(flaggedIds(added, 'essay'), ['e1'])
  assert.deepEqual(flaggedIds(added, 'practical'), ['osce-1'])
})
