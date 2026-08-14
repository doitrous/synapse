import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { curlyQuotes, decodeEntities, normalizeDashes, normalizeProse } from './prose.ts'

test('a quoted phrase gets the same quotes the rest of the page uses', () => {
  assert.equal(
    normalizeProse('her heart keeps "jumping"'),
    'her heart keeps “jumping”',
  )
})

test('a quote opening a sentence still opens', () => {
  assert.equal(curlyQuotes('"Take a focused history," she said'), '“Take a focused history,” she said')
})

test('a quote after an opening bracket opens', () => {
  assert.equal(curlyQuotes('(see "ECG" on the card)'), '(see “ECG” on the card)')
})

test('an apostrophe inside a word is not mistaken for an opening quote', () => {
  assert.equal(curlyQuotes("the patient's own words: don't"), 'the patient’s own words: don’t')
})

test('a single quote starting a word opens', () => {
  assert.equal(curlyQuotes("a 'thump' after the beat"), 'a ‘thump’ after the beat')
})

test('named and numeric entities are resolved', () => {
  assert.equal(decodeEntities('S&amp;S &mdash; 37&deg;C &#8212; &#x2014;'), 'S&S — 37°C — —')
})

test('an escaped entity survives as text rather than becoming punctuation', () => {
  // &amp;quot; is how a source writes the literal characters &quot;
  assert.equal(decodeEntities('&amp;quot;'), '&quot;')
})

test('an unknown entity is left exactly as written', () => {
  assert.equal(decodeEntities('&notanentity; &frobnicate;'), '&notanentity; &frobnicate;')
})

test('entities are resolved before quotes are decided', () => {
  assert.equal(normalizeProse('wrote &quot;ECG&quot; on a card'), 'wrote “ECG” on a card')
})

test('a spaced double hyphen is an em dash; an unspaced one is left alone', () => {
  assert.equal(normalizeDashes('the sinus -- not the sulcus'), 'the sinus—not the sulcus')
  assert.equal(normalizeDashes('run --commit to apply'), 'run --commit to apply')
})

test('three dots become an ellipsis, four are left as written', () => {
  assert.equal(normalizeDashes('and so on...'), 'and so on…')
  assert.equal(normalizeDashes('a gap....'), 'a gap....')
})

test('prose with nothing to fix is returned unchanged', () => {
  const clean = 'Cardiac rotation places the right chambers anteriorly.'
  assert.equal(normalizeProse(clean), clean)
})

test('already-typographic prose is not double-converted', () => {
  const already = 'her heart keeps “jumping” — really'
  assert.equal(normalizeProse(already), already)
})

test('empty input is returned as-is', () => {
  assert.equal(normalizeProse(''), '')
})

test('Arabic text keeps its apostrophe handling', () => {
  // A quote after an Arabic letter is a closing mark, not an opening one.
  assert.equal(curlyQuotes('القلب "ينط"'), 'القلب “ينط”')
})
