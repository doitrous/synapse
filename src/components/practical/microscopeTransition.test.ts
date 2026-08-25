import assert from 'node:assert/strict'
import test from 'node:test'
import { centeredSquareTransitionRect, microscopeTransitionStart } from './microscopeTransition.ts'

test('the transformed viewer rectangle starts exactly over the microscope', () => {
  const origin = { left: 72, top: 184, width: 144, height: 144 }
  const destination = { left: 408, top: 132, width: 384, height: 384 }
  const start = microscopeTransitionStart(origin, destination)

  const transformedCenter = {
    x: destination.left + destination.width / 2 + start.x,
    y: destination.top + destination.height / 2 + start.y,
  }

  assert.deepEqual(transformedCenter, {
    x: origin.left + origin.width / 2,
    y: origin.top + origin.height / 2,
  })
  assert.equal(destination.width * start.scaleX, origin.width)
  assert.equal(destination.height * start.scaleY, origin.height)
})
test('zero-size destination data never creates an infinite transform', () => {
  const start = microscopeTransitionStart(
    { left: 10, top: 20, width: 100, height: 100 },
    { left: 0, top: 0, width: 0, height: 0 },
  )
  assert.equal(start.scaleX, 1)
  assert.equal(start.scaleY, 1)
})

test('a landscape slide stage receives a centred square animation target', () => {
  assert.deepEqual(
    centeredSquareTransitionRect({ left: 100, top: 80, width: 800, height: 500 }),
    { left: 250, top: 80, width: 500, height: 500 },
  )
})

test('a portrait slide stage receives a centred square animation target', () => {
  assert.deepEqual(
    centeredSquareTransitionRect({ left: 100, top: 80, width: 320, height: 600 }),
    { left: 100, top: 220, width: 320, height: 320 },
  )
})
