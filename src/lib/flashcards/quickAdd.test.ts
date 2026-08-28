import { test } from 'node:test'
import assert from 'node:assert/strict'
import { appendBasicNote, basicNoteFieldsFromText, type AppendOpts } from './quickAdd.ts'
import { EMPTY_COLLECTION, type FlashcardCollection } from '../../data/flashcards/model.ts'

const now = new Date('2026-08-20T09:00:00.000Z')

function opts(overrides: Partial<AppendOpts> = {}): AppendOpts {
  return { now, noteId: 'note-1', newDeckId: 'deck-new', ...overrides }
}

function collectionWithDeck(): FlashcardCollection {
  return {
    ...EMPTY_COLLECTION,
    decks: {
      'deck-existing': { id: 'deck-existing', name: 'Cranial nerves', createdAt: '2026-01-01T00:00:00.000Z' },
    },
  }
}

test('appends into an existing deck when input.deckId is present', () => {
  const collection = collectionWithDeck()
  const result = appendBasicNote(collection, { front: 'Q', back: 'A', deckId: 'deck-existing' }, opts())

  assert.equal(result.deckId, 'deck-existing')
  assert.equal(result.noteId, 'note-1')
  assert.equal(Object.keys(result.collection.decks).length, 1, 'no new deck was created')
  assert.equal(result.collection.notes['note-1'].deckId, 'deck-existing')
})

test('input collection is not mutated', () => {
  const collection = collectionWithDeck()
  const snapshot = JSON.parse(JSON.stringify(collection))
  appendBasicNote(collection, { front: 'Q', back: 'A', deckId: 'deck-existing' }, opts())
  assert.deepEqual(collection, snapshot)
})

test('no deckId creates a new deck named "Quick capture" by default', () => {
  const collection = collectionWithDeck()
  const result = appendBasicNote(collection, { front: 'Q' }, opts())

  assert.equal(result.deckId, 'deck-new')
  assert.equal(result.collection.decks['deck-new'].name, 'Quick capture')
  assert.equal(result.collection.decks['deck-new'].createdAt, now.toISOString())
  assert.equal(result.collection.notes['note-1'].deckId, 'deck-new')
  assert.equal(Object.keys(result.collection.decks).length, 2, 'the existing deck is preserved alongside the new one')
})

test('no deckId with a deckName uses that name, trimmed', () => {
  const result = appendBasicNote(EMPTY_COLLECTION, { front: 'Q', deckName: '  My Deck  ' }, opts())
  assert.equal(result.collection.decks['deck-new'].name, 'My Deck')
})

test('a blank deckName still falls back to "Quick capture"', () => {
  const result = appendBasicNote(EMPTY_COLLECTION, { front: 'Q', deckName: '   ' }, opts())
  assert.equal(result.collection.decks['deck-new'].name, 'Quick capture')
})

test('a deckId not present in the collection is treated as absent: a new deck is created, not attached to nothing', () => {
  const collection = collectionWithDeck()
  const result = appendBasicNote(collection, { front: 'Q', deckId: 'deck-does-not-exist' }, opts())

  assert.equal(result.deckId, 'deck-new')
  assert.ok(!('deck-does-not-exist' in result.collection.decks))
  assert.equal(result.collection.notes['note-1'].deckId, 'deck-new')
  assert.equal(Object.keys(result.collection.decks).length, 2)
})

test('note fields are set from input; back defaults to empty string', () => {
  const result = appendBasicNote(EMPTY_COLLECTION, { front: '<b>front</b>' }, opts())
  const note = result.collection.notes['note-1']
  assert.equal(note.type, 'basic')
  assert.ok(note.type === 'basic')
  assert.equal(note.fields.front, '<b>front</b>')
  assert.equal(note.fields.back, '')

  const withBack = appendBasicNote(EMPTY_COLLECTION, { front: 'Q', back: 'A' }, opts({ noteId: 'note-2' }))
  const noteWithBack = withBack.collection.notes['note-2']
  assert.ok(noteWithBack.type === 'basic')
  assert.equal(noteWithBack.fields.back, 'A')
})

test('note carries the given id, type "basic", empty tags, and matching created/updated timestamps', () => {
  const result = appendBasicNote(EMPTY_COLLECTION, { front: 'Q' }, opts())
  const note = result.collection.notes['note-1']
  assert.equal(note.id, 'note-1')
  assert.equal(note.type, 'basic')
  assert.deepEqual(note.tags, [])
  assert.equal(note.createdAt, now.toISOString())
  assert.equal(note.updatedAt, now.toISOString())
})

test('meta is left unchanged: no key is added for the new note', () => {
  const collection = collectionWithDeck()
  const result = appendBasicNote(collection, { front: 'Q', deckId: 'deck-existing' }, opts())
  assert.deepEqual(result.collection.meta, collection.meta)
  assert.equal(Object.keys(result.collection.meta).length, 0)
})

test('appendBasicNote is deterministic given the same inputs and opts', () => {
  const collection = collectionWithDeck()
  const first = appendBasicNote(collection, { front: 'Q', back: 'A', deckId: 'deck-existing' }, opts())
  const second = appendBasicNote(collection, { front: 'Q', back: 'A', deckId: 'deck-existing' }, opts())
  assert.deepEqual(first, second)
})

test('basicNoteFieldsFromText escapes plain text and trims', () => {
  const fields = basicNoteFieldsFromText('a<b>c', undefined)
  assert.equal(fields.front, 'a&lt;b&gt;c')
  assert.equal(fields.back, '')
})

test('basicNoteFieldsFromText escapes and trims both front and back when given', () => {
  const fields = basicNoteFieldsFromText('  <hi>  ', '  a & b  ')
  assert.equal(fields.front, '&lt;hi&gt;')
  assert.equal(fields.back, 'a &amp; b')
})
