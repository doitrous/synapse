import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  isDuplicateOcclusion,
  occlusionCardCount,
  occlusionSignature,
  pointInPolygon,
  pointInShape,
  shapeBounds,
} from './occlusion.ts'
import type { ImageOcclusionNote, Occluder } from './model.ts'

const base = {
  deckId: 'd1',
  image: 'synapse-media:img',
  imageWidth: 1000,
  imageHeight: 800,
  mode: 'hide-all' as const,
}

const occluder = (over: Partial<Occluder> = {}): Occluder => ({
  id: 'o1', shape: { kind: 'rect', x: 100, y: 100, w: 50, h: 50 }, label: '', ...over,
})

test('rect bounds and hit test', () => {
  const shape = { kind: 'rect', x: 10, y: 20, w: 30, h: 40 } as const
  assert.deepEqual(shapeBounds(shape), { x: 10, y: 20, w: 30, h: 40 })
  assert.equal(pointInShape(shape, 15, 25), true)
  assert.equal(pointInShape(shape, 5, 25), false)
})

test('ellipse hit test uses the elliptical boundary', () => {
  const shape = { kind: 'ellipse', x: 0, y: 0, w: 100, h: 100 } as const
  assert.equal(pointInShape(shape, 50, 50), true) // centre
  assert.equal(pointInShape(shape, 2, 2), false) // corner is outside the circle
})

test('polygon hit test', () => {
  const pts = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }]
  assert.equal(pointInPolygon(pts, 5, 5), true)
  assert.equal(pointInPolygon(pts, 15, 5), false)
})

test('card count is one per group plus one per ungrouped occluder', () => {
  const occluders = [occluder({ id: 'a' }), occluder({ id: 'b', groupId: 'g1' }), occluder({ id: 'c', groupId: 'g1' })]
  assert.equal(occlusionCardCount(occluders, ['g1']), 2)
})

test('the same layout yields the same signature; a moved shape yields a different one', () => {
  const a = { ...base, occluders: [occluder()] }
  const b = { ...base, occluders: [occluder()] }
  assert.equal(occlusionSignature(a), occlusionSignature(b))

  const moved = { ...base, occluders: [occluder({ shape: { kind: 'rect', x: 400, y: 100, w: 50, h: 50 } })] }
  assert.notEqual(occlusionSignature(a), occlusionSignature(moved))
})

test('sub-pixel jitter does not create a new signature', () => {
  const a = { ...base, occluders: [occluder({ shape: { kind: 'rect', x: 100, y: 100, w: 50, h: 50 } })] }
  const jittered = { ...base, occluders: [occluder({ shape: { kind: 'rect', x: 100.2, y: 100.1, w: 50, h: 50 } })] }
  assert.equal(occlusionSignature(a), occlusionSignature(jittered))
})

test('signature is order-independent across occluders', () => {
  const o1 = occluder({ id: 'a', shape: { kind: 'rect', x: 100, y: 100, w: 50, h: 50 } })
  const o2 = occluder({ id: 'b', shape: { kind: 'rect', x: 300, y: 100, w: 50, h: 50 } })
  assert.equal(
    occlusionSignature({ ...base, occluders: [o1, o2] }),
    occlusionSignature({ ...base, occluders: [o2, o1] }),
  )
})

test('a duplicate set is rejected against saved signatures', () => {
  const candidate = { ...base, occluders: [occluder()] }
  const saved = [occlusionSignature(candidate)]
  assert.equal(isDuplicateOcclusion(candidate, saved), true)
  const different = { ...base, occluders: [occluder({ shape: { kind: 'rect', x: 700, y: 700, w: 20, h: 20 } })] }
  assert.equal(isDuplicateOcclusion(different, saved), false)
})

test('grouping changes the signature', () => {
  const ungrouped = { ...base, occluders: [occluder({ id: 'a' }), occluder({ id: 'b', shape: { kind: 'rect', x: 300, y: 100, w: 50, h: 50 } })] }
  const grouped = {
    ...base,
    occluders: [
      occluder({ id: 'a', groupId: 'g1' }),
      occluder({ id: 'b', shape: { kind: 'rect', x: 300, y: 100, w: 50, h: 50 }, groupId: 'g1' }),
    ],
  }
  assert.notEqual(occlusionSignature(ungrouped), occlusionSignature(grouped))
})

test('the note id is not part of the signature (two notes can be found equal)', () => {
  const asNote = (id: string): Pick<ImageOcclusionNote, 'deckId' | 'image' | 'imageWidth' | 'imageHeight' | 'mode' | 'occluders'> & { id: string } => ({
    id, ...base, occluders: [occluder()],
  })
  assert.equal(occlusionSignature(asNote('noteA')), occlusionSignature(asNote('noteB')))
})
