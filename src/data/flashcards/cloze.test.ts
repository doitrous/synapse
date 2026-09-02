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
import { decodeEntities, escapeHtml, sanitizeRich } from './richText.ts'

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

/* ---- HTML-aware parsing (the cloze field is a rich surface) --------------- */

test('a legacy plain-text note tokenizes byte-identically', () => {
  // No tags anywhere: every run, content and hint must come back as the exact
  // substrings the pre-HTML parser produced, or a stored note changes meaning.
  const text = 'Hyperplasia is {{c1::proliferation}} of {{c2::cells::plural}}.'
  assert.deepEqual(tokenizeCloze(text), [
    { type: 'text', text: 'Hyperplasia is ' },
    { type: 'cloze', number: 1, content: 'proliferation', hint: null },
    { type: 'text', text: ' of ' },
    { type: 'cloze', number: 2, content: 'cells', hint: 'plural' },
    { type: 'text', text: '.' },
  ])
})

test('bold inside a deletion stays inside the deletion', () => {
  assert.deepEqual(tokenizeCloze('The {{c1::<b>mitral</b>}} valve'), [
    { type: 'text', text: 'The ' },
    { type: 'cloze', number: 1, content: '<b>mitral</b>', hint: null },
    { type: 'text', text: ' valve' },
  ])
})

test('markup outside the markers stays with the literal run', () => {
  assert.deepEqual(tokenizeCloze('<b>The</b> {{c1::mitral}}<i> valve</i>'), [
    { type: 'text', text: '<b>The</b> ' },
    { type: 'cloze', number: 1, content: 'mitral', hint: null },
    { type: 'text', text: '<i> valve</i>' },
  ])
})

test('a deletion spanning a tag boundary keeps the tag it crossed', () => {
  // The fragments are individually unbalanced; `sanitizeRich` balances each on
  // render, so the cell is safe and the words survive.
  assert.deepEqual(tokenizeCloze('<b>The {{c1::mitral</b> valve}} lies'), [
    { type: 'text', text: '<b>The ' },
    { type: 'cloze', number: 1, content: 'mitral</b> valve', hint: null },
    { type: 'text', text: ' lies' },
  ])
})

test('a list renders one deletion per item without eating the markup', () => {
  const html = '<ul><li>{{c1::Atria}}</li><li>{{c2::Ventricles}}</li></ul>'
  assert.deepEqual(tokenizeCloze(html), [
    { type: 'text', text: '<ul><li>' },
    { type: 'cloze', number: 1, content: 'Atria', hint: null },
    { type: 'text', text: '</li><li>' },
    { type: 'cloze', number: 2, content: 'Ventricles', hint: null },
    { type: 'text', text: '</li></ul>' },
  ])
  assert.deepEqual(clozeNumbers(html), [1, 2])
})

test('a hint carries its own markup and is parsed apart from the content', () => {
  assert.deepEqual(tokenizeCloze('{{c1::<b>answer</b>::<i>hint</i>}}'), [
    { type: 'cloze', number: 1, content: '<b>answer</b>', hint: '<i>hint</i>' },
  ])
})

test('braces inside a tag attribute are markup, not an unbalanced deletion', () => {
  assert.equal(validateCloze('<span style="font-family: {{x">{{c1::a}}</span>').ok, true)
})

test('a deletion holding only empty markup hides nothing', () => {
  assert.ok(validateCloze('a {{c1::<b></b>}} b').errors.includes('empty-deletion'))
  assert.equal(validateCloze('a {{c1::<b>x</b>}} b').ok, true)
})

test('rendered cells carry HTML, and a hidden deletion is still a blank', () => {
  const html = '<p>The {{c1::<b>mitral</b>}} and {{c2::tricuspid}} valves</p>'
  assert.deepEqual(renderClozeSide(html, 1, 'front'), [
    { kind: 'text', text: '<p>The ' },
    { kind: 'blank', hint: null },
    { kind: 'text', text: ' and ' },
    { kind: 'text', text: 'tricuspid' },
    { kind: 'text', text: ' valves</p>' },
  ])
  assert.deepEqual(renderClozeSide(html, 1, 'back')[1], { kind: 'answer', text: '<b>mitral</b>' })
})

test('plain text drops the tags too, so duplicates still collide', () => {
  assert.equal(clozePlainText('The <b>{{c1::<i>mitral</i>}}</b> valve'), 'The mitral valve')
  assert.equal(clozePlainText('Aorta &amp; pulmonary {{c1::trunk}}'), 'Aorta & pulmonary trunk')
})

test('the next cloze number reads through markup', () => {
  assert.equal(nextClozeNumber('<ul><li>{{c1::a}}</li><li>{{c3::b}}</li></ul>'), 4)
})

/* ---- Legacy plain text: no character may be lost ------------------------- */

const LEGACY = 'If {{c1::a < b && c > d}} then stop'

test('a legacy note is never parsed as if its < and > were tags', () => {
  // Read straight from storage, with the editor never opened: `< b && c >` is
  // text the student typed, not a tag, so nothing may disappear.
  assert.deepEqual(tokenizeCloze(LEGACY), [
    { type: 'text', text: 'If ' },
    { type: 'cloze', number: 1, content: 'a < b && c > d', hint: null },
    { type: 'text', text: ' then stop' },
  ])
  assert.equal(clozePlainText(LEGACY), 'If a < b && c > d then stop')
  assert.equal(validateCloze(LEGACY).ok, true)
})

test('a legacy note survives the seed → read-back → store round trip intact', () => {
  // `seedHtml` in RichField escapes a legacy value before `innerHTML`, or the
  // browser eats `< b && c >` as a tag…
  const seeded = escapeHtml(LEGACY)
  // …and this is what it hands back out of `innerHTML`, through `emitFromDom`.
  const stored = sanitizeRich(seeded)
  assert.equal(stored, seeded, 'read-back must not add an escaping layer')
  assert.equal(sanitizeRich(stored), stored, 'nor may any later save or render')

  // Every character the student typed is still there…
  assert.equal(clozePlainText(stored), 'If a < b && c > d then stop')
  assert.equal(clozePlainText(stored), clozePlainText(LEGACY))
  // …so search, duplicate detection and card generation see what they saw before.
  assert.equal(validateCloze(stored).ok, true)
  assert.deepEqual(clozeNumbers(stored), clozeNumbers(LEGACY))

  // And the card shows the same words. The stored cells are escaped HTML with
  // no tags left in them, so what the DOM renders is just their entities
  // decoded — character for character what the old text-node cells showed.
  const before = renderClozeSide(LEGACY, 1, 'back')
  const after = renderClozeSide(stored, 1, 'back')
  assert.equal(after.length, before.length)
  after.forEach((cell, i) => {
    const was = before[i]
    if (cell.kind === 'blank' || was.kind === 'blank') {
      assert.equal(cell.kind, was.kind)
      return
    }
    assert.equal(cell.kind, was.kind)
    assert.equal(decodeEntities(cell.text), was.text)
  })
  assert.equal(after[1].kind === 'answer' && decodeEntities(after[1].text), 'a < b && c > d')
})

test('an ampersand does not multiply across repeated saves and renders', () => {
  let stored = sanitizeRich(escapeHtml('{{c1::Q & A}} matters'))
  for (let i = 0; i < 3; i++) stored = sanitizeRich(stored)
  assert.equal(clozePlainText(stored), 'Q & A matters')
})
