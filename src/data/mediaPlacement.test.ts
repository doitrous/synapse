import test from 'node:test'
import assert from 'node:assert/strict'
import { placementsFor } from './mediaPlacement.ts'
import type { MediaPlacement } from './mediaLibrary.ts'

const media: MediaPlacement[] = [
  { id: 'p1', mediaId: 'm1', slot: 'stem' },
  { id: 'p2', mediaId: 'm2', slot: 'answer', answerLabel: 'A' },
  { id: 'p3', mediaId: 'm3', slot: 'answer', answerLabel: 'C' },
  { id: 'p4', mediaId: 'm4', slot: 'explanation' },
  { id: 'p5', mediaId: 'm5', slot: 'explanation', answerLabel: 'B' },
]

test('each slot gets only what belongs to it', () => {
  assert.deepEqual(placementsFor(media, 'stem').map((p) => p.mediaId), ['m1'])
  assert.deepEqual(placementsFor(media, 'explanation').map((p) => p.mediaId), ['m4'])
  assert.deepEqual(placementsFor(media, 'explanation', 'B').map((p) => p.mediaId), ['m5'])
  assert.deepEqual(placementsFor(media, 'answer', 'A').map((p) => p.mediaId), ['m2'])
  assert.deepEqual(placementsFor(media, 'answer', 'C').map((p) => p.mediaId), ['m3'])
  assert.deepEqual(placementsFor(media, 'answer', 'B'), [])
})

test('an answer slot with no letter belongs to no option', () => {
  // Otherwise a half-written placement would appear under every option at once,
  // which is worse than appearing under none.
  assert.deepEqual(placementsFor([{ id: 'x', mediaId: 'm', slot: 'answer' }], 'answer', 'A'), [])
})

test('absent media is not an error', () => {
  assert.deepEqual(placementsFor(undefined, 'stem'), [])
  assert.deepEqual(placementsFor([], 'stem'), [])
})
