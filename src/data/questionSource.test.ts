import test from 'node:test'
import assert from 'node:assert/strict'
import {
  QUESTION_SOURCES,
  QUESTION_SOURCE_LABEL,
  SOURCE_BUCKET_ORDER,
  UNSPECIFIED_SOURCE,
  bucketOf,
  sourceBucketLabel,
} from './questionSource.ts'

test('every source has a label', () => {
  for (const source of QUESTION_SOURCES) {
    assert.equal(typeof QUESTION_SOURCE_LABEL[source], 'string')
    assert.ok(QUESTION_SOURCE_LABEL[source].length > 0)
  }
})

test('bucketOf routes undefined to the unspecified bucket', () => {
  assert.equal(bucketOf(undefined), UNSPECIFIED_SOURCE)
  assert.equal(bucketOf('dept-mcq'), 'dept-mcq')
})

test('unspecified sorts last and is labelled Unspecified', () => {
  assert.equal(SOURCE_BUCKET_ORDER[SOURCE_BUCKET_ORDER.length - 1], UNSPECIFIED_SOURCE)
  assert.equal(sourceBucketLabel(UNSPECIFIED_SOURCE), 'Unspecified')
  assert.equal(sourceBucketLabel('past-paper'), 'Past Papers')
})
