import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  clozeNumbers,
  clozePlainText,
  insertCloze,
  nextClozeNumber,
  renderClozeSide,
  tokenizeCloze,
  validateCloze,
} from './cloze.ts'

test('distinct cloze numbers each become a card, sorted', () => {
  assert.deepEqual(clozeNumbers('a {{c2::x}} b {{c1::y}} c {{c2::z}}'), [1, 2])
})

test('a hint after a second :: is parsed apart from the content', () => {
  const tokens = tokenizeCloze('{{c1::answer::hint}}')
  assert.deepEqual(tokens, [{ type: 'cloze', number: 1, content: 'answer', hint: 'hint' }])
})

test('the front hides the active cloze and reveals the others', () => {
  const text = 'Hyperplasia is {{c1::proliferation}} of {{c2::cells}}.'
  const front = renderClozeSide(text, 1, 'front')
  assert.deepEqual(front, [
    { kind: 'text', text: 'Hyperplasia is ' },
    { kind: 'blank', hint: null },
    { kind: 'text', text: ' of ' },
    { kind: 'text', text: 'cells' },
    { kind: 'text', text: '.' },
  ])
  const back = renderClozeSide(text, 1, 'back')
  assert.deepEqual(back[1], { kind: 'answer', text: 'proliferation' })
})

test('deletions sharing a number blank together on the same card', () => {
  const text = '{{c1::A}} and {{c1::B}}'
  const front = renderClozeSide(text, 1, 'front')
  assert.deepEqual(front.filter((c) => c.kind === 'blank').length, 2)
})

test('malformed and empty clozes are rejected', () => {
  assert.equal(validateCloze('no clozes here').ok, false)
  assert.deepEqual(validateCloze('no clozes here').errors, ['no-cloze'])
  assert.equal(validateCloze('{{c1::}}').ok, false)
  assert.ok(validateCloze('{{c1::}}').errors.includes('empty-deletion'))
  assert.ok(validateCloze('{{c0::x}}').errors.includes('zero-number'))
  assert.ok(validateCloze('half {{c1::x').errors.includes('unbalanced'))
})

test('a well-formed cloze validates', () => {
  assert.equal(validateCloze('The {{c1::mitral}} valve').ok, true)
})

test('the next cloze number is one past the highest', () => {
  assert.equal(nextClozeNumber(''), 1)
  assert.equal(nextClozeNumber('{{c1::a}} {{c3::b}}'), 4)
})

test('inserting with a selection wraps it; without one, drops the caret inside', () => {
  const wrapped = insertCloze('the mitral valve', 4, 10, 1)
  assert.equal(wrapped.text, 'the {{c1::mitral}} valve')

  const empty = insertCloze('abc', 3, 3, 1)
  assert.equal(empty.text, 'abc{{c1::}}')
  assert.equal(empty.caret, 'abc{{c1::'.length)
})

test('plain text strips markup and keeps the deletion content', () => {
  assert.equal(clozePlainText('The {{c1::mitral::valve?}} one'), 'The mitral one')
})
