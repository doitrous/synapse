import { strict as assert } from 'node:assert'
import test from 'node:test'
import { appendBlock, replaceSegment, segmentAt, splitNote } from './noteSegments.ts'

/** The property the whole design rests on: the pieces put the note back. */
function tiles(source: string) {
  const segments = splitNote(source)
  assert.equal(segments.map((segment) => segment.text).join('\n'), source)
  for (const segment of segments) {
    assert.equal(source.slice(segment.start, segment.end), segment.text)
  }
  return segments
}

test('an empty note is one empty segment', () => {
  const segments = tiles('')
  assert.equal(segments.length, 1)
  assert.equal(segments[0].text, '')
})

test('paragraphs separated by a blank line are separate segments', () => {
  const segments = tiles('First para\n\nSecond para')
  assert.deepEqual(segments.map((s) => s.text), ['First para', '', 'Second para'])
  assert.deepEqual(segments.map((s) => s.blank), [false, true, false])
})

test('a wrapped paragraph stays one segment', () => {
  const segments = tiles('One line\nand its continuation')
  assert.equal(segments.filter((s) => !s.blank).length, 1)
})

test('a list is one segment, however many items', () => {
  const segments = tiles('- alpha\n- beta\n- gamma')
  assert.equal(segments.length, 1)
  assert.equal(segments[0].text.split('\n').length, 3)
})

test('a numbered list and a bulleted list run together as one list segment', () => {
  const segments = tiles('1. alpha\n- beta')
  assert.equal(segments.length, 1)
})

test('a heading is its own segment even without a blank line after it', () => {
  const segments = tiles('# Heart failure\nIt begins here')
  assert.deepEqual(segments.map((s) => s.text), ['# Heart failure', 'It begins here'])
})

test('a callout keeps its body lines together', () => {
  const segments = tiles('> [!warning] Where I lose the mark\n> Forgetting the pulse\n> And the JVP')
  assert.equal(segments.length, 1)
})

test('a fenced block is taken whole, blank lines and all', () => {
  const segments = tiles('```\nline one\n\nline two\n```\nafter')
  assert.deepEqual(segments.map((s) => s.text), ['```\nline one\n\nline two\n```', 'after'])
})

test('an unclosed fence runs to the end rather than swallowing nothing', () => {
  const segments = tiles('```\nstill open')
  assert.equal(segments.length, 1)
})

test('a divider stands alone', () => {
  const segments = tiles('above\n---\nbelow')
  assert.deepEqual(segments.map((s) => s.text), ['above', '---', 'below'])
})

test('several blank lines are one blank segment, and the offsets still line up', () => {
  const segments = tiles('a\n\n\n\nb')
  assert.deepEqual(segments.map((s) => s.blank), [false, true, false])
  assert.equal(segments[2].text, 'b')
})

test('a note ending in a newline still tiles', () => {
  tiles('a paragraph\n')
  tiles('a paragraph\n\n')
})

test('the caret finds the segment it is inside', () => {
  const source = '# Title\n\nBody text'
  const segments = splitNote(source)
  assert.equal(segmentAt(segments, 0), 0)
  assert.equal(segmentAt(segments, 7), 0)
  assert.equal(segments[segmentAt(segments, source.length)].text, 'Body text')
})

test('the caret in an empty note finds the only segment', () => {
  assert.equal(segmentAt(splitNote(''), 0), 0)
})

test('replacing a segment leaves the rest of the note untouched', () => {
  const source = '# Title\n\nBody text'
  const segments = splitNote(source)
  assert.equal(replaceSegment(source, segments[2], '**Bold** body'), '# Title\n\n**Bold** body')
  assert.equal(replaceSegment(source, segments[0], '## Title'), '## Title\n\nBody text')
})

test('a longer replacement does not disturb what follows', () => {
  const source = 'a\n\nb\n\nc'
  const segments = splitNote(source)
  assert.equal(replaceSegment(source, segments[2], 'much longer middle'), 'a\n\nmuch longer middle\n\nc')
})

test('appending opens a blank line first, but never a second one', () => {
  assert.equal(appendBlock('', '- item').value, '- item')
  assert.equal(appendBlock('para', '- item').value, 'para\n\n- item')
  assert.equal(appendBlock('para\n', '- item').value, 'para\n\n- item')
  assert.equal(appendBlock('para\n\n', '- item').value, 'para\n\n- item')
})

test('a real note round-trips through split and rejoin', () => {
  tiles([
    '# Heart failure',
    '',
    'Reduced ejection fraction, **below 40%**.',
    '',
    '> [!warning] Where I lose the mark',
    '> Forgetting to say *bilateral*',
    '',
    '- Preload',
    '- Afterload',
    '',
    '---',
    '',
    'Closing thought.',
  ].join('\n'))
})
