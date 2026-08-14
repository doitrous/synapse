import test from 'node:test'
import assert from 'node:assert/strict'
import { pointInPolygon, rectanglePolygon, selectInLasso, selectionBounds } from './lasso.ts'
import { encodePoints } from './strokeCodec.ts'
import { boundsOf, type AnnotationObject, type InkObject, type ObjectKind, type Point } from './annotations.ts'

const ALL: ReadonlySet<ObjectKind> = new Set<ObjectKind>(['ink', 'highlighter'])

function ink(id: string, points: Point[], kind: 'ink' | 'highlighter' = 'ink'): InkObject {
  return {
    id, kind, page: 1, z: 1, t: 0, tool: kind === 'highlighter' ? 'highlighter' : 'ball',
    color: '#000', w: 0.004, bbox: boundsOf(points, 0.002), p: encodePoints(points),
  }
}

function line(from: Point, to: Point, count = 20): Point[] {
  return Array.from({ length: count }, (_, i) => ({
    x: from.x + (to.x - from.x) * (i / (count - 1)),
    y: from.y + (to.y - from.y) * (i / (count - 1)),
  }))
}

const BOX = rectanglePolygon({ x: 0.2, y: 0.2 }, { x: 0.6, y: 0.6 })

test('a point inside the polygon is inside, one outside is not', () => {
  assert.equal(pointInPolygon({ x: 0.4, y: 0.4 }, BOX), true)
  assert.equal(pointInPolygon({ x: 0.9, y: 0.4 }, BOX), false)
})

test('a degenerate polygon contains nothing', () => {
  assert.equal(pointInPolygon({ x: 0.5, y: 0.5 }, [{ x: 0, y: 0 }, { x: 1, y: 1 }]), false)
  assert.deepEqual(selectInLasso([ink('a', line({ x: 0.3, y: 0.3 }, { x: 0.5, y: 0.5 }))], [], ALL), [])
})

test('a stroke wholly inside is selected', () => {
  const inside = ink('inside', line({ x: 0.3, y: 0.3 }, { x: 0.5, y: 0.5 }))
  assert.deepEqual(selectInLasso([inside], BOX, ALL), ['inside'])
})

test('a stroke wholly outside is not', () => {
  const outside = ink('outside', line({ x: 0.7, y: 0.7 }, { x: 0.9, y: 0.9 }))
  assert.deepEqual(selectInLasso([outside], BOX, ALL), [])
})

test('a long stroke barely clipped by the lasso is left alone', () => {
  // "Any point inside" would make a stroke across the page impossible to avoid
  // selecting — you could never lasso a word without taking the underline too.
  const long = ink('long', line({ x: 0.55, y: 0.4 }, { x: 0.95, y: 0.4 }, 40))
  assert.deepEqual(selectInLasso([long], BOX, ALL), [])
})

test('a stroke mostly inside is selected even with a tail outside', () => {
  // And "every point inside" would make it impossible to select at all.
  const mostly = ink('mostly', line({ x: 0.25, y: 0.4 }, { x: 0.64, y: 0.4 }, 40))
  assert.deepEqual(selectInLasso([mostly], BOX, ALL), ['mostly'])
})

test('the object-class filter is the settings popover', () => {
  const pen = ink('pen', line({ x: 0.3, y: 0.3 }, { x: 0.5, y: 0.5 }))
  const marker = ink('marker', line({ x: 0.3, y: 0.35 }, { x: 0.5, y: 0.45 }), 'highlighter')
  assert.deepEqual(selectInLasso([pen, marker], BOX, ALL).sort(), ['marker', 'pen'])
  assert.deepEqual(selectInLasso([pen, marker], BOX, new Set<ObjectKind>(['ink'])), ['pen'])
  assert.deepEqual(selectInLasso([pen, marker], BOX, new Set<ObjectKind>(['highlighter'])), ['marker'])
  assert.deepEqual(selectInLasso([pen, marker], BOX, new Set<ObjectKind>()), [])
})

test('a freehand lasso works like a rectangular one', () => {
  const freehand: Point[] = Array.from({ length: 40 }, (_, i) => {
    const t = (i / 39) * Math.PI * 2
    return { x: 0.4 + Math.cos(t) * 0.2, y: 0.4 + Math.sin(t) * 0.2 }
  })
  const inside = ink('inside', line({ x: 0.35, y: 0.4 }, { x: 0.45, y: 0.4 }))
  assert.deepEqual(selectInLasso([inside], freehand, ALL), ['inside'])
})

test('a rectangle polygon is the same whichever corner it started from', () => {
  const a = rectanglePolygon({ x: 0.6, y: 0.6 }, { x: 0.2, y: 0.2 })
  assert.deepEqual(a, BOX)
})

test('a selection reports the box around it', () => {
  const one = ink('a', line({ x: 0.2, y: 0.2 }, { x: 0.3, y: 0.3 }))
  const two = ink('b', line({ x: 0.5, y: 0.5 }, { x: 0.6, y: 0.6 }))
  const box = selectionBounds([one, two] as AnnotationObject[])!
  assert.ok(box[0] <= 0.2 && box[1] <= 0.2)
  assert.ok(box[2] >= 0.6 && box[3] >= 0.6)
})

test('nothing selected has no bounds', () => {
  assert.equal(selectionBounds([]), null)
})
