import { test } from 'node:test'
import assert from 'node:assert/strict'
import { missedEssayIds, type EssayCollectionItem, type EssayMarking } from './essayCollections.ts'

const ESSAYS: EssayCollectionItem[] = [
  { id: 'e-short', keyPoints: [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }] },
  { id: 'e-good', keyPoints: [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }] },
  { id: 'e-half', keyPoints: [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }] },
  { id: 'e-unmarked', keyPoints: [{ id: 'a' }, { id: 'b' }] },
  { id: 'e-untouched', keyPoints: [{ id: 'a' }, { id: 'b' }] },
  { id: 'e-nopoints', keyPoints: [] },
]

const ANSWERS: Record<string, EssayMarking> = {
  'e-short': { ticked: ['a'], updatedAt: '2026-09-01T10:00:00.000Z' },
  'e-good': { ticked: ['a', 'b', 'c'], updatedAt: '2026-09-01T11:00:00.000Z' },
  'e-half': { ticked: ['a', 'b'], updatedAt: '2026-09-01T12:00:00.000Z' },
  'e-unmarked': { ticked: null, updatedAt: '2026-09-01T13:00:00.000Z' },
  'e-nopoints': { ticked: [], updatedAt: '2026-09-01T14:00:00.000Z' },
}

test('an essay marked under half its key points is missed', () => {
  assert.equal(missedEssayIds(ANSWERS, ESSAYS).includes('e-short'), true)
})

test('half is a pass, not a miss', () => {
  // Two of four is exactly the line. It reads as "you had half of it", which is
  // not the same as having missed it.
  assert.equal(missedEssayIds(ANSWERS, ESSAYS).includes('e-half'), false)
  assert.equal(missedEssayIds(ANSWERS, ESSAYS).includes('e-good'), false)
})

test('an answer that has not been marked yet is not a miss', () => {
  // `ticked: null` is written-but-not-marked, or only revealed. Counting it
  // would put an essay the student has not judged into the list of ones they
  // got wrong.
  assert.equal(missedEssayIds(ANSWERS, ESSAYS).includes('e-unmarked'), false)
})

test('an essay with no key points is skipped rather than scored nought of nought', () => {
  assert.equal(missedEssayIds(ANSWERS, ESSAYS).includes('e-nopoints'), false)
})

test('an essay never opened is not a miss', () => {
  assert.equal(missedEssayIds(ANSWERS, ESSAYS).includes('e-untouched'), false)
})

test('ticks against key points that no longer exist do not count toward coverage', () => {
  // Editing a question must not leave an old tick propping up a score.
  const stale: Record<string, EssayMarking> = {
    'e-good': { ticked: ['a', 'gone-1', 'gone-2'], updatedAt: '2026-09-01T11:00:00.000Z' },
  }
  assert.deepEqual(missedEssayIds(stale, ESSAYS), ['e-good'])
})

test('most recently marked comes first', () => {
  const answers: Record<string, EssayMarking> = {
    'e-short': { ticked: [], updatedAt: '2026-09-01T10:00:00.000Z' },
    'e-good': { ticked: [], updatedAt: '2026-09-03T10:00:00.000Z' },
    'e-half': { ticked: [], updatedAt: '2026-09-02T10:00:00.000Z' },
  }
  assert.deepEqual(missedEssayIds(answers, ESSAYS), ['e-good', 'e-half', 'e-short'])
})
