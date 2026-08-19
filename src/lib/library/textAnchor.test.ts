import { test } from 'node:test'
import assert from 'node:assert/strict'
import { makeAnchor, orderedSegments, resolveAnchor } from './textAnchor.ts'

const PARAGRAPH = 'The left ventricle ejects into the aorta. The left ventricle then relaxes, and the left ventricle fills again.'

test('an anchor records the words and a little of both sides', () => {
  const start = PARAGRAPH.indexOf('ejects')
  const anchor = makeAnchor('block:0', PARAGRAPH, start, start + 'ejects'.length)!
  assert.equal(anchor.exact, 'ejects')
  assert.equal(anchor.block, 'block:0')
  assert.ok(anchor.prefix.endsWith('The left ventricle '))
  assert.ok(anchor.suffix.startsWith(' into the aorta'))
})

test('a selection of nothing is not an anchor', () => {
  assert.equal(makeAnchor('b', PARAGRAPH, 5, 5), null)
  assert.equal(makeAnchor('b', PARAGRAPH, 10, 3), null)
  // Whitespace is a selection the browser will hand you from a stray drag.
  assert.equal(makeAnchor('b', '  \n  ', 0, 4), null)
})

test('a phrase that occurs once resolves to where it is', () => {
  const start = PARAGRAPH.indexOf('aorta')
  const anchor = makeAnchor('b', PARAGRAPH, start, start + 5)!
  assert.deepEqual(resolveAnchor(PARAGRAPH, anchor), { start, end: start + 5 })
})

test('a repeated phrase resolves to the one it was made on', () => {
  // Three "the left ventricle"s. Recording only the words would put every mark
  // on the first, which is what the media matcher beside this used to do.
  const occurrences = [
    PARAGRAPH.indexOf('The left ventricle'),
    PARAGRAPH.indexOf('The left ventricle', 1),
    PARAGRAPH.indexOf('the left ventricle fills'),
  ]
  for (const start of occurrences) {
    const anchor = makeAnchor('b', PARAGRAPH, start, start + 18)!
    assert.deepEqual(resolveAnchor(PARAGRAPH, anchor), { start, end: start + 18 })
  }
})

test('a mark survives an edit elsewhere in the paragraph', () => {
  const start = PARAGRAPH.indexOf('The left ventricle', 1)
  const anchor = makeAnchor('b', PARAGRAPH, start, start + 18)!
  const edited = PARAGRAPH.replace('ejects into the aorta', 'ejects blood into the aorta')
  const found = resolveAnchor(edited, anchor)!
  assert.equal(edited.slice(found.start, found.end), 'The left ventricle')
  // Still the second one, not the first.
  assert.ok(found.start > edited.indexOf('The left ventricle'))
})

test('a mark whose words have gone is reported, not guessed at', () => {
  const anchor = makeAnchor('b', PARAGRAPH, 0, 18)!
  assert.equal(resolveAnchor('An entirely rewritten paragraph about something else.', anchor), null)
})

test('recasing a sentence does not lose the mark on it', () => {
  const start = PARAGRAPH.indexOf('aorta')
  const anchor = makeAnchor('b', PARAGRAPH, start, start + 5)!
  const recased = PARAGRAPH.replace('aorta', 'Aorta')
  const found = resolveAnchor(recased, anchor)!
  assert.equal(recased.slice(found.start, found.end), 'Aorta')
})

test('an exact match is preferred over one that differs only in case', () => {
  const text = 'Aorta at the start. Then aorta in the middle.'
  const start = text.indexOf('aorta')
  const anchor = makeAnchor('b', text, start, start + 5)!
  const found = resolveAnchor(text, anchor)!
  assert.equal(found.start, start)
})

test('segments come back in reading order', () => {
  const ordered = orderedSegments([
    { start: 20, end: 25, value: 'c' },
    { start: 0, end: 5, value: 'a' },
    { start: 10, end: 15, value: 'b' },
  ])
  assert.deepEqual(ordered.map((segment) => segment.value), ['a', 'b', 'c'])
})

test('a segment overlapping one already kept is dropped', () => {
  // A phrase can only be rendered once. Two marks, or a mark and an anchored
  // figure, cannot both wrap the same words.
  const ordered = orderedSegments([
    { start: 0, end: 10, value: 'first' },
    { start: 5, end: 15, value: 'overlaps' },
    { start: 12, end: 20, value: 'clear' },
  ])
  assert.deepEqual(ordered.map((segment) => segment.value), ['first', 'clear'])
})

test('the longer of two segments starting together wins', () => {
  const ordered = orderedSegments([
    { start: 0, end: 4, value: 'short' },
    { start: 0, end: 9, value: 'long' },
  ])
  assert.deepEqual(ordered.map((segment) => segment.value), ['long'])
})

test('an empty segment is never kept', () => {
  assert.deepEqual(orderedSegments([{ start: 3, end: 3, value: 'x' }]), [])
})
