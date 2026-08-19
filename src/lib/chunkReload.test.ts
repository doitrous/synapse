import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isChunkLoadError, shouldReloadForChunk } from './chunkReload.ts'

test('each browser\'s way of saying a chunk did not load is recognised', () => {
  // Taken from the real messages; no two agree, and none use a distinct type.
  assert.equal(isChunkLoadError(new TypeError('Failed to fetch dynamically imported module: https://x/assets/Library-ab12.js')), true)
  assert.equal(isChunkLoadError(new TypeError('error loading dynamically imported module')), true)
  assert.equal(isChunkLoadError(new TypeError('Importing a module script failed.')), true)
  assert.equal(isChunkLoadError(new Error('Unable to preload CSS for /assets/main.css')), true)
})

test('a name-only match still counts', () => {
  const error = new Error('Loading chunk 42 failed')
  error.name = 'ChunkLoadError'
  assert.equal(isChunkLoadError(error), true)
})

test('an ordinary bug is not mistaken for a stale build', () => {
  // Reloading on one of these would loop the tab forever, which is worse than
  // the error it was trying to hide.
  assert.equal(isChunkLoadError(new TypeError("Cannot read properties of undefined (reading 'trim')")), false)
  assert.equal(isChunkLoadError(new Error('Minified React error #310')), false)
  assert.equal(isChunkLoadError(null), false)
  assert.equal(isChunkLoadError(undefined), false)
  assert.equal(isChunkLoadError('something went wrong'), false)
})

test('a tab that has never tried reloads', () => {
  assert.equal(shouldReloadForChunk(null, 1_000_000), true)
})

test('a second failure straight after a reload does not reload again', () => {
  // The reload did not fix it. Trying again is a spin, not a recovery.
  const now = 1_000_000
  assert.equal(shouldReloadForChunk(now - 1_000, now), false)
  assert.equal(shouldReloadForChunk(now - 14_000, now), false)
})

test('a failure long after the last one earns its own reload', () => {
  // A different deployment, hours or minutes later, is a new problem with the
  // same remedy — a tab left open all day should still recover.
  const now = 1_000_000
  assert.equal(shouldReloadForChunk(now - 60_000, now), true)
  assert.equal(shouldReloadForChunk(now - 86_400_000, now), true)
})
