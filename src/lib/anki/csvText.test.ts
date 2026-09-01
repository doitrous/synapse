import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parsePipeLines, parseFrontBackTagsCsv, parseAnkiCsv, detectTextFormat, rowsToBasicNotes } from './csvText.ts'

test('parsePipeLines: one card per line, split on first pipe', () => {
  const rows = parsePipeLines('Q1 | A1\nQ2 | A2 | ignored-extra')
  assert.deepEqual(rows, [
    { front: 'Q1', back: 'A1', tags: [] },
    { front: 'Q2', back: 'A2 | ignored-extra', tags: [] },
  ])
})

test('parsePipeLines: blank lines skipped, a line with no pipe is front-only', () => {
  const rows = parsePipeLines('Solo\n\nQ | A')
  assert.deepEqual(rows, [
    { front: 'Solo', back: '', tags: [] },
    { front: 'Q', back: 'A', tags: [] },
  ])
})

test('parseFrontBackTagsCsv: header row maps front/back/tags, tags space-split', () => {
  const rows = parseFrontBackTagsCsv('front,back,tags\n"Hello, world",Hi,"tag1 tag2"')
  assert.deepEqual(rows, [{ front: 'Hello, world', back: 'Hi', tags: ['tag1', 'tag2'] }])
})

test('parseAnkiCsv: honors #separator:tab and #tags column, skips # comment lines', () => {
  const text = '#separator:tab\n#tags column:3\nFront\tBack\ttag-a tag-b'
  assert.deepEqual(parseAnkiCsv(text), [{ front: 'Front', back: 'Back', tags: ['tag-a', 'tag-b'] }])
})

test('detectTextFormat: #-headers => anki, comma header => csv, else pipe', () => {
  assert.equal(detectTextFormat('#separator:tab\nA\tB'), 'anki')
  assert.equal(detectTextFormat('front,back,tags\nA,B,'), 'csv')
  assert.equal(detectTextFormat('A | B'), 'pipe')
})

test('parseFrontBackTagsCsv: an escaped "" quote inside a quoted field decodes to a literal quote', () => {
  const rows = parseFrontBackTagsCsv('front,back,tags\n"She said ""hi""",back1,tag1')
  assert.deepEqual(rows, [{ front: 'She said "hi"', back: 'back1', tags: ['tag1'] }])
})

test('parseFrontBackTagsCsv: an embedded newline inside a quoted field is preserved, not treated as a row break', () => {
  const rows = parseFrontBackTagsCsv('front,back,tags\n"line1\nline2",back2,tag2')
  assert.deepEqual(rows, [{ front: 'line1\nline2', back: 'back2', tags: ['tag2'] }])
})

test('parseAnkiCsv: #separator:comma is honored as a literal-char separator alias', () => {
  const text = '#separator:comma\nFront,Back'
  assert.deepEqual(parseAnkiCsv(text), [{ front: 'Front', back: 'Back', tags: [] }])
})

test('rowsToBasicNotes: builds a deck + escaped basic notes, dropping empty rows', () => {
  let n = 0
  const { decks, notes } = rowsToBasicNotes(
    [
      { front: 'a < b', back: 'x', tags: ['t1', ''] },
      { front: '', back: '', tags: [] },
    ],
    { deckId: 'deck-x', deckName: 'My Import', html: false, now: new Date('2026-08-30T00:00:00.000Z'), idFactory: () => `note-${n++}` },
  )
  assert.equal(decks.length, 1)
  assert.equal(decks[0].name, 'My Import')
  assert.equal(notes.length, 1)
  assert.equal(notes[0].type, 'basic')
  assert.equal((notes[0] as { fields: { front: string } }).fields.front, 'a &lt; b')
  assert.deepEqual(notes[0].tags, ['t1'])
})

test('rowsToBasicNotes: html mode sanitizes instead of escaping', () => {
  const { notes } = rowsToBasicNotes([{ front: '<b>bold</b><script>x</script>', back: '', tags: [] }], {
    deckId: 'd',
    deckName: 'D',
    html: true,
    now: new Date('2026-08-30T00:00:00.000Z'),
    idFactory: () => 'note-1',
  })
  const front = (notes[0] as { fields: { front: string } }).fields.front
  assert.match(front, /<b>bold<\/b>/)
  assert.doesNotMatch(front, /<script>/)
})
