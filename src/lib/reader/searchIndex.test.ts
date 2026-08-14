import test from 'node:test'
import assert from 'node:assert/strict'
import { buildPageText, findMatches, findNoteMatches, mapRangeToItems } from './searchIndex.ts'

function page(items: string[], number = 1) {
  return buildPageText(number, items.map((str) => ({ str })))
}

test('text items are joined with a separator and their offsets recorded', () => {
  const built = page(['Heart', 'failure', 'is'])
  assert.equal(built.text, 'Heart failure is')
  assert.deepEqual(built.itemOffsets, [0, 6, 14])
})

test('every occurrence is found, not just the first', () => {
  // The regression this guards: the old search kept one hit per page, so a term
  // appearing four times on a page was reported once.
  const built = page(['heart', 'and', 'heart', 'and', 'heart'])
  assert.equal(findMatches(built, 'heart').length, 3)
})

test('matching ignores case', () => {
  assert.equal(findMatches(page(['Heart Failure']), 'heart failure').length, 1)
  assert.equal(findMatches(page(['heart failure']), 'HEART').length, 1)
})

test('overlapping occurrences are not double counted', () => {
  // "aa" in "aaaa" is two matches, not three: the scan resumes after each.
  assert.equal(findMatches(page(['aaaa']), 'aa').length, 2)
})

test('an empty or blank query finds nothing rather than everything', () => {
  const built = page(['Heart failure'])
  assert.deepEqual(findMatches(built, ''), [])
  assert.deepEqual(findMatches(built, '   '), [])
})

test('a snippet shows the hit in context and marks where it was cut', () => {
  const built = page([`${'x'.repeat(80)} needle ${'y'.repeat(80)}`])
  const [match] = findMatches(built, 'needle')
  assert.ok(match.snippet.includes('needle'))
  assert.ok(match.snippet.startsWith('…'), 'a truncated start should be marked')
  assert.ok(match.snippet.endsWith('…'), 'a truncated end should be marked')
})

test('a short page needs no ellipsis', () => {
  const [match] = findMatches(page(['a needle here']), 'needle')
  assert.equal(match.snippet, 'a needle here')
})

test('a match inside one item maps back to that item', () => {
  const built = page(['Heart', 'failure', 'is'])
  const [match] = findMatches(built, 'failure')
  const ranges = mapRangeToItems(built, match.start, match.end)
  assert.deepEqual(ranges, [{ itemIndex: 1, start: 0, end: 7 }])
})

test('a match spanning two items maps to both', () => {
  // The regression this guards: highlighting only the item a match starts in
  // leaves the rest of the phrase unmarked, which reads as a missed hit.
  const built = page(['Heart', 'failure'])
  const [match] = findMatches(built, 'heart failure')
  const ranges = mapRangeToItems(built, match.start, match.end)
  assert.deepEqual(ranges.map((range) => range.itemIndex), [0, 1])
  assert.deepEqual(ranges[0], { itemIndex: 0, start: 0, end: 5 })
  assert.deepEqual(ranges[1], { itemIndex: 1, start: 0, end: 7 })
})

test('a match across three items maps to all three', () => {
  const built = page(['the', 'quick', 'brown'])
  const [match] = findMatches(built, 'the quick brown')
  assert.equal(mapRangeToItems(built, match.start, match.end).length, 3)
})

test('mapping a range that touches nothing returns nothing', () => {
  const built = page(['one', 'two'])
  assert.deepEqual(mapRangeToItems(built, 100, 110), [])
})

test('the student\'s own notes are searched too, and say where they came from', () => {
  const notes = [
    { page: 4, label: 'Your note', text: 'Remember the four pillars' },
    { page: 9, label: 'Text box', text: 'pillars again' },
    { page: 12, label: 'Your note', text: 'nothing relevant' },
  ]
  const matches = findNoteMatches(notes, 'pillars')
  assert.deepEqual(matches.map((match) => [match.page, match.label]), [[4, 'Your note'], [9, 'Text box']])
})

test('note search ignores a blank query like page search does', () => {
  assert.deepEqual(findNoteMatches([{ page: 1, label: 'Your note', text: 'anything' }], ' '), [])
})
