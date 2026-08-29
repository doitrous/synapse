import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parsePipeLines, parseFrontBackTagsCsv, parseAnkiCsv, detectTextFormat } from './csvText.ts'

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
