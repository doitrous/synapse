import test from 'node:test'
import assert from 'node:assert/strict'
import { createMicGuard, stopStream, type MicStream } from './micSession.ts'

/** A stand-in for a `MediaStream` that records which tracks were stopped. */
function fakeStream(trackCount = 2): MicStream & { stopped: number } {
  const state = { stopped: 0 }
  const tracks = Array.from({ length: trackCount }, () => ({
    stop() { state.stopped += 1 },
  }))
  return {
    getTracks: () => tracks,
    get stopped() { return state.stopped },
  } as MicStream & { stopped: number }
}

test('a stream that resolves while its attempt is current is adopted, not stopped', () => {
  const guard = createMicGuard()
  const stream = fakeStream()
  const token = guard.begin()
  assert.equal(guard.adopt(token, stream), true)
  assert.equal(stream.stopped, 0)
})

test('a stream that resolves after the room was left is stopped and refused', () => {
  // The regression this guards, and the whole reason this file exists: the
  // student answers the permission prompt after leaving, and the microphone
  // stays open for the life of the tab because teardown already ran against an
  // empty ref.
  const guard = createMicGuard()
  const stream = fakeStream()
  const token = guard.begin()
  guard.release()
  assert.equal(guard.adopt(token, stream), false)
  assert.equal(stream.stopped, 2, 'every track is stopped, not just the first')
})

test('a stream that resolves after a second attempt started is stopped and refused', () => {
  // Switching rooms while the prompt is open: the first attempt must not win.
  const guard = createMicGuard()
  const first = fakeStream(1)
  const firstToken = guard.begin()
  const secondToken = guard.begin()
  assert.equal(guard.adopt(firstToken, first), false)
  assert.equal(first.stopped, 1)

  const second = fakeStream(1)
  assert.equal(guard.adopt(secondToken, second), true)
  assert.equal(second.stopped, 0)
})

test('isCurrent follows begin and release', () => {
  const guard = createMicGuard()
  const token = guard.begin()
  assert.equal(guard.isCurrent(token), true)
  guard.release()
  assert.equal(guard.isCurrent(token), false)
})

test('a token nobody issued is never current', () => {
  const guard = createMicGuard()
  guard.begin()
  assert.equal(guard.isCurrent(0), false)
  const stream = fakeStream(1)
  assert.equal(guard.adopt(0, stream), false)
  assert.equal(stream.stopped, 1)
})

test('stopStream tolerates a stream that never arrived', () => {
  assert.doesNotThrow(() => stopStream(null))
  assert.doesNotThrow(() => stopStream(undefined))
  const stream = fakeStream(3)
  stopStream(stream)
  assert.equal(stream.stopped, 3)
})
