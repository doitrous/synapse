import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isDuplicateNote, noteDuplicateSignature } from './duplicate.ts'
import type { BasicNote, ClozeNote } from './model.ts'

function basic(id: string, deckId: string, front: string, back = ''): BasicNote {
  return { id, type: 'basic', deckId, tags: [], createdAt: '', updatedAt: '', fields: { front, back } }
}

function cloze(id: string, deckId: string, text: string, extra = ''): ClozeNote {
  return { id, type: 'cloze', deckId, tags: [], createdAt: '', updatedAt: '', fields: { text, extra } }
}

test('identical basic notes in the same deck collide', () => {
  const a = basic('n1', 'deck-1', 'Capital of France', 'Paris')
  const b = basic('n2', 'deck-1', 'Capital of France', 'Paris')
  assert.equal(noteDuplicateSignature(a), noteDuplicateSignature(b))
  assert.equal(isDuplicateNote(a, [b]), true)
})

test('the same content in different decks does not collide', () => {
  const a = basic('n1', 'deck-1', 'Capital of France', 'Paris')
  const b = basic('n2', 'deck-2', 'Capital of France', 'Paris')
  assert.notEqual(noteDuplicateSignature(a), noteDuplicateSignature(b))
  assert.equal(isDuplicateNote(a, [b]), false)
})

test('formatting-only differences still collide', () => {
  const plain = basic('n1', 'deck-1', 'Heart', 'A muscular organ')
  const formatted = basic('n2', 'deck-1', '<b>Heart</b>', 'A <em>muscular</em> organ')
  assert.equal(noteDuplicateSignature(plain), noteDuplicateSignature(formatted))
  assert.equal(isDuplicateNote(plain, [formatted]), true)
})

test('whitespace and case differences are normalized away', () => {
  const a = basic('n1', 'deck-1', 'Mitral   valve', 'Left AV valve')
  const b = basic('n2', 'deck-1', 'mitral valve', 'left av valve')
  assert.equal(isDuplicateNote(a, [b]), true)
})

test('cloze notes are compared by their plain revealed text, not their markup', () => {
  const a = cloze('n1', 'deck-1', 'The {{c1::mitochondrion}} is the powerhouse of the cell')
  const b = cloze('n2', 'deck-1', 'The {{c2::mitochondrion}} is the powerhouse of the cell')
  assert.equal(noteDuplicateSignature(a), noteDuplicateSignature(b))
  assert.equal(isDuplicateNote(a, [b]), true)
})

test('different cloze content does not collide', () => {
  const a = cloze('n1', 'deck-1', 'The {{c1::mitochondrion}} makes ATP')
  const b = cloze('n2', 'deck-1', 'The {{c1::ribosome}} makes protein')
  assert.equal(isDuplicateNote(a, [b]), false)
})

test('a basic and a cloze note that reduce to the same words do not collide', () => {
  const a = basic('n1', 'deck-1', 'mitochondrion', '')
  const b = cloze('n2', 'deck-1', '{{c1::mitochondrion}}')
  assert.notEqual(noteDuplicateSignature(a), noteDuplicateSignature(b))
})

test('a note is never its own duplicate', () => {
  const a = basic('n1', 'deck-1', 'Capital of France', 'Paris')
  assert.equal(isDuplicateNote(a, [a]), false)
})
