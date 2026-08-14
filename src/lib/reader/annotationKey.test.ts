import test from 'node:test'
import assert from 'node:assert/strict'
import {
  SHARD_PAGES, annotationScope, manifestKey, shardIndexFor, shardKey, shardPageRange, shardsForPages,
} from './annotationKey.ts'

/** The column these keys have to fit: `k VARCHAR(160)` in `user_state`. */
const MAX_KEY_LENGTH = 160

test('pages fall into shards of a fixed size', () => {
  assert.equal(shardIndexFor(1), 0)
  assert.equal(shardIndexFor(SHARD_PAGES), 0)
  assert.equal(shardIndexFor(SHARD_PAGES + 1), 1)
  assert.equal(shardIndexFor(300), Math.floor(299 / SHARD_PAGES))
})

test('a page below one is clamped rather than producing a negative shard', () => {
  assert.equal(shardIndexFor(0), 0)
  assert.equal(shardIndexFor(-5), 0)
})

test('a shard reports the page range it covers', () => {
  assert.deepEqual(shardPageRange(0), [1, SHARD_PAGES])
  assert.deepEqual(shardPageRange(2), [2 * SHARD_PAGES + 1, 3 * SHARD_PAGES])
  // And the range round-trips back to the same shard.
  const [from, to] = shardPageRange(7)
  assert.equal(shardIndexFor(from), 7)
  assert.equal(shardIndexFor(to), 7)
})

test('a viewport spanning a boundary needs both shards', () => {
  assert.deepEqual(shardsForPages(SHARD_PAGES - 1, SHARD_PAGES + 2), [0, 1])
  assert.deepEqual(shardsForPages(1, 1), [0])
  assert.deepEqual(shardsForPages(1, 300).length, shardIndexFor(300) + 1)
})

test('a realistic key fits the column with room to spare', () => {
  // The regression this guards: a key over 160 characters is silently
  // truncated by the column, and two documents would then share notes.
  const scope = annotationScope('resource', 'RES-WEB-OPENSTAX-A2E-19-1')
  assert.ok(manifestKey(scope).length < MAX_KEY_LENGTH)
  assert.ok(shardKey(scope, 999).length < MAX_KEY_LENGTH)
})

test('an absurdly long id is hashed, never truncated', () => {
  const long = `RES-${'x'.repeat(400)}`
  const scope = annotationScope('resource', long)
  assert.ok(shardKey(scope, 9999).length <= MAX_KEY_LENGTH, 'key exceeded the column')
  // Two different long ids must not collapse onto the same scope.
  const other = annotationScope('resource', `${long}-different`)
  assert.notEqual(scope, other)
})

test('the same id always produces the same scope', () => {
  assert.equal(annotationScope('resource', 'abc'), annotationScope('resource', 'abc'))
  const long = 'y'.repeat(400)
  assert.equal(annotationScope('document', long), annotationScope('document', long))
})

test('a resource and an upload with the same id are different documents', () => {
  assert.notEqual(annotationScope('resource', 'same'), annotationScope('document', 'same'))
})

test('characters that would break a key are replaced', () => {
  const scope = annotationScope('resource', 'a b/c?d#e')
  assert.match(scope, /^r-[A-Za-z0-9._-]+$/)
})

test('manifest and shard keys never collide', () => {
  const scope = annotationScope('resource', 'RES-1')
  const keys = new Set([manifestKey(scope), ...Array.from({ length: 20 }, (_, i) => shardKey(scope, i))])
  assert.equal(keys.size, 21)
})

test('every key is routed to the student\'s own record', () => {
  // `USER_OWNED_PATTERNS` matches on the prefix; if this changes, annotations
  // silently become shared admin state.
  const scope = annotationScope('resource', 'RES-1')
  assert.ok(manifestKey(scope).startsWith('synapse.annotations.'))
  assert.ok(shardKey(scope, 3).startsWith('synapse.annotations.'))
})
