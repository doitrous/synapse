import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { continueList, parseNoteBlocks, toggleLinePrefix, toggleWrap } from './markdownBlocks.ts'

test('a plain note is one paragraph', () => {
  assert.deepEqual(parseNoteBlocks('The coronary sinus is a vein.'), [
    { kind: 'paragraph', text: 'The coronary sinus is a vein.' },
  ])
})

test('headings carry their level', () => {
  assert.deepEqual(parseNoteBlocks('# One\n## Two\n### Three'), [
    { kind: 'heading', level: 1, text: 'One' },
    { kind: 'heading', level: 2, text: 'Two' },
    { kind: 'heading', level: 3, text: 'Three' },
  ])
})

test('a four-hash line is prose, not a heading', () => {
  const [block] = parseNoteBlocks('#### not a heading')
  assert.equal(block.kind, 'paragraph')
})

test('bulleted and numbered lists are told apart', () => {
  assert.deepEqual(parseNoteBlocks('- one\n- two'), [{ kind: 'list', ordered: false, items: ['one', 'two'] }])
  assert.deepEqual(parseNoteBlocks('1. one\n2. two'), [{ kind: 'list', ordered: true, items: ['one', 'two'] }])
})

test('a callout keeps its tone, title and body', () => {
  assert.deepEqual(parseNoteBlocks('> [!warning] Watch out\n> the sinus is not the sulcus'), [
    { kind: 'callout', tone: 'warning', title: 'Watch out', lines: ['the sinus is not the sulcus'] },
  ])
})

test('callout aliases map onto the three tones', () => {
  assert.equal((parseNoteBlocks('> [!tip] x')[0] as { tone: string }).tone, 'success')
  assert.equal((parseNoteBlocks('> [!caution] x')[0] as { tone: string }).tone, 'warning')
  assert.equal((parseNoteBlocks('> [!info] x')[0] as { tone: string }).tone, 'note')
})

test('a quote without a marker is a quote, not a callout', () => {
  assert.deepEqual(parseNoteBlocks('> just a quote'), [{ kind: 'quote', lines: ['just a quote'] }])
})

test('fenced code is taken verbatim', () => {
  const [block] = parseNoteBlocks('```\nconst a = "b"\n```')
  assert.deepEqual(block, { kind: 'code', lines: ['const a = "b"'] })
})

test('prose gets typographic quotes but code does not', () => {
  const [prose] = parseNoteBlocks('she said "no"')
  assert.equal((prose as { text: string }).text, 'she said “no”')
})

test('consecutive lines join into one paragraph, a blank line starts another', () => {
  assert.deepEqual(parseNoteBlocks('one\ntwo\n\nthree'), [
    { kind: 'paragraph', text: 'one two' },
    { kind: 'paragraph', text: 'three' },
  ])
})

test('a rule is a divider', () => {
  assert.deepEqual(parseNoteBlocks('---'), [{ kind: 'divider' }])
})

test('bold wraps the selection and moves it', () => {
  const result = toggleWrap('the sinus', 4, 9, '**')
  assert.equal(result.value, 'the **sinus**')
  assert.equal(result.value.slice(result.start, result.end), 'sinus')
})

test('bold applied twice removes itself', () => {
  const once = toggleWrap('the sinus', 4, 9, '**')
  const twice = toggleWrap(once.value, once.start, once.end, '**')
  assert.equal(twice.value, 'the sinus')
})

test('a line prefix toggles across every line the selection touches', () => {
  const on = toggleLinePrefix('one\ntwo', 0, 7, '- ')
  assert.equal(on.value, '- one\n- two')
  const off = toggleLinePrefix(on.value, on.start, on.end, '- ')
  assert.equal(off.value, 'one\ntwo')
})

test('Enter continues a bulleted list', () => {
  const next = continueList('- one', 5)
  assert.equal(next?.value, '- one\n- ')
  assert.equal(next?.caret, 8)
})

test('Enter continues a numbered list and counts up', () => {
  const next = continueList('1. one', 6)
  assert.equal(next?.value, '1. one\n2. ')
})

test('Enter on an empty item ends the list instead of extending it', () => {
  const next = continueList('- one\n- ', 8)
  assert.equal(next?.value, '- one\n')
})

test('Enter in ordinary prose is left alone', () => {
  assert.equal(continueList('just text', 9), null)
})
