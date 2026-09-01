import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mergeImport } from './importCommit.ts'
import { EMPTY_COLLECTION, type BasicNote, type DeckRecord } from '../../data/flashcards/model.ts'

const deck: DeckRecord = { id: 'deck-1', name: 'Imported', createdAt: '2026-08-29T00:00:00.000Z' }
const note: BasicNote = {
  id: 'note-1', type: 'basic', deckId: 'deck-1', tags: ['anki'],
  createdAt: '2026-08-29T00:00:00.000Z', updatedAt: '2026-08-29T00:00:00.000Z',
  fields: { front: 'Q', back: 'A' },
}

test('mergeImport adds decks and notes without mutating the input collection', () => {
  const before = structuredClone(EMPTY_COLLECTION)
  const next = mergeImport(EMPTY_COLLECTION, { decks: [deck], notes: [note] })
  assert.deepEqual(EMPTY_COLLECTION, before)           // unchanged
  assert.equal(next.decks['deck-1'].name, 'Imported')
  assert.equal((next.notes['note-1'] as BasicNote).fields.front, 'Q')
  assert.deepEqual(next.notes['note-1'].tags, ['anki'])
})

test('mergeImport merges optional card meta by card id', () => {
  const meta = { 'note-1::card': { schedule: { state: 'review' } } } as any
  const next = mergeImport(EMPTY_COLLECTION, { decks: [deck], notes: [note], meta })
  assert.equal(next.meta['note-1::card'].schedule.state, 'review')
})
