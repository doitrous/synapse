import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loaderRings } from './NishanyLoader.geometry.ts'

test('two rings, outer to inner, widths shrink with radius', () => {
  const rings = loaderRings(40)
  assert.equal(rings.length, 2)
  assert.ok(rings[0].r > rings[1].r)
  assert.ok(rings[0].width > rings[1].width)
  assert.ok(rings.every((ring) => ring.width >= 2 && ring.r - ring.width / 2 > 0))
})

test('the outermost ring fills its box without clipping', () => {
  for (const size of [16, 24, 40, 48, 96]) {
    const [outer] = loaderRings(size)
    assert.ok(outer.r + outer.width / 2 <= size / 2 + 0.001, `outer ring escapes the box at size ${size}`)
  }
})
