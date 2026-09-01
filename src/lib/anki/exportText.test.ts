import { test } from 'node:test'
import assert from 'node:assert/strict'
import { exportDecksToText } from './exportText.ts'
import type { FlashcardCollection, BasicNote, ClozeNote } from '../../data/flashcards/model.ts'

function basicNote(id: string, deckId: string, front: string, back: string, tags: string[] = []): BasicNote {
  return {
    id,
    type: 'basic',
    deckId,
    tags,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    fields: { front, back },
  }
}

function clozeNote(id: string, deckId: string, text: string, extra: string, tags: string[] = []): ClozeNote {
  return {
    id,
    type: 'cloze',
    deckId,
    tags,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    fields: { text, extra },
  }
}

function collectionOf(notes: (BasicNote | ClozeNote)[], deckIds: string[] = ['d1']): FlashcardCollection {
  const decks: FlashcardCollection['decks'] = {}
  for (const id of deckIds) decks[id] = { id, name: id, createdAt: '2026-01-01T00:00:00.000Z' }
  const notesRecord: FlashcardCollection['notes'] = {}
  for (const note of notes) notesRecord[note.id] = note
  return { version: 2, decks, notes: notesRecord, meta: {} }
}

test('pipe format: front | back per line, in note order', () => {
  const collection = collectionOf([basicNote('n1', 'd1', 'Q1', 'A1'), basicNote('n2', 'd1', 'Q2', 'A2')])
  const text = exportDecksToText(collection, ['d1'], 'pipe')
  assert.equal(text, 'Q1 | A1\nQ2 | A2')
})

test('pipe format: strips HTML to plain text', () => {
  const collection = collectionOf([basicNote('n1', 'd1', '<b>Q1</b>', '<i>A1</i>')])
  const text = exportDecksToText(collection, ['d1'], 'pipe')
  assert.equal(text, 'Q1 | A1')
})

test('csv format: header row then quoted rows, tags space-joined', () => {
  const collection = collectionOf([
    basicNote('n1', 'd1', 'Q1', 'A1', ['tag1', 'tag2']),
    basicNote('n2', 'd1', 'Q2', 'A2'),
  ])
  const text = exportDecksToText(collection, ['d1'], 'csv')
  // A space-separated tag list has no comma/quote/newline, so it stays bare.
  assert.equal(text, 'front,back,tags\nQ1,A1,tag1 tag2\nQ2,A2,')
})

test('csv format: RFC-4180 quotes fields containing a comma or a quote', () => {
  // richToPlainText collapses internal newlines to a single space (see
  // richText.ts), so a raw newline never reaches csv quoting from a rich
  // field in practice; comma and embedded-quote escaping are what's exercised
  // here — the quoting helper itself also treats a raw \n/\r as quote-worthy.
  const collection = collectionOf([basicNote('n1', 'd1', 'Hello, world', 'She said "hi"\nLine two')])
  const text = exportDecksToText(collection, ['d1'], 'csv')
  assert.equal(text, 'front,back,tags\n"Hello, world","She said ""hi"" Line two",')
})

test('anki-tsv format: #separator:tab and #html:true headers, tab-separated rows, HTML kept', () => {
  const collection = collectionOf([basicNote('n1', 'd1', '<b>Q1</b>', 'A1', ['tag-a'])])
  const text = exportDecksToText(collection, ['d1'], 'anki-tsv')
  assert.equal(text, '#separator:tab\n#html:true\n<b>Q1</b>\tA1\ttag-a')
})

test('anki-tsv format: a raw tab inside a field is replaced with a space so columns stay aligned', () => {
  const collection = collectionOf([basicNote('n1', 'd1', 'Q1\twith tab', 'A1')])
  const text = exportDecksToText(collection, ['d1'], 'anki-tsv')
  assert.equal(text, '#separator:tab\n#html:true\nQ1 with tab\tA1\t')
})

test('cloze notes: source text is the front, extra is the back', () => {
  const collection = collectionOf([clozeNote('n1', 'd1', 'The {{c1::mitochondria}} is the powerhouse', 'Extra note')])
  const text = exportDecksToText(collection, ['d1'], 'pipe')
  assert.equal(text, 'The {{c1::mitochondria}} is the powerhouse | Extra note')
})

test('cloze notes keep cloze markup as HTML in anki-tsv', () => {
  const collection = collectionOf([clozeNote('n1', 'd1', '{{c1::foo}}', '')])
  const text = exportDecksToText(collection, ['d1'], 'anki-tsv')
  assert.equal(text, '#separator:tab\n#html:true\n{{c1::foo}}\t\t')
})

test('filters notes to the requested deckIds only', () => {
  const collection = collectionOf(
    [basicNote('n1', 'd1', 'Q1', 'A1'), basicNote('n2', 'd2', 'Q2', 'A2')],
    ['d1', 'd2'],
  )
  const text = exportDecksToText(collection, ['d1'], 'pipe')
  assert.equal(text, 'Q1 | A1')
})

test('deterministic order: by deck order (as given), then note insertion order within a deck', () => {
  const collection = collectionOf(
    [basicNote('n1', 'd2', 'D2-Q1', 'A'), basicNote('n2', 'd1', 'D1-Q1', 'A'), basicNote('n3', 'd2', 'D2-Q2', 'A')],
    ['d1', 'd2'],
  )
  const text = exportDecksToText(collection, ['d2', 'd1'], 'pipe')
  assert.equal(text, 'D2-Q1 | A\nD2-Q2 | A\nD1-Q1 | A')
})

test('empty deckIds or no matching notes yields an empty body after headers', () => {
  const collection = collectionOf([basicNote('n1', 'd1', 'Q1', 'A1')])
  assert.equal(exportDecksToText(collection, [], 'pipe'), '')
  assert.equal(exportDecksToText(collection, [], 'csv'), 'front,back,tags')
  assert.equal(exportDecksToText(collection, [], 'anki-tsv'), '#separator:tab\n#html:true')
})
