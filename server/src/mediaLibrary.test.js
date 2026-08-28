import test from 'node:test'
import assert from 'node:assert/strict'
import {
  MEDIA_STATE_KEY, deleteRefusal, isMediaReleased, mediaReleaseBlockers, storageKeyFor, usageOf,
} from './mediaLibrary.js'

const SHA = 'ab12cd34'.padEnd(64, '0')

const question = (id, placements) => ({
  id, kind: 'question', title: `Question ${id}`,
  questionData: { tags: {}, media: placements },
})

test('the stored path is derived from the digest, and fans out', () => {
  assert.equal(storageKeyFor(SHA, 'image/png'), `media/ab/12/${SHA}.png`)
  assert.equal(storageKeyFor(SHA, 'image/jpeg'), `media/ab/12/${SHA}.jpg`)
})

test('a path is refused for anything that is not a real digest and type', () => {
  assert.equal(storageKeyFor('short', 'image/png'), null)
  assert.equal(storageKeyFor(SHA, 'application/pdf'), null)
  assert.equal(storageKeyFor(SHA.toUpperCase(), 'image/png'), null, 'a digest is lowercase hex')
  assert.equal(storageKeyFor('../../etc/passwd'.padEnd(64, 'a'), 'image/png'), null)
})

test('an image reaches a student only once it can be described and is cleared', () => {
  const complete = { storageKey: `media/ab/12/${SHA}.png`, altText: 'Anterior upper limb', rights: 'CC BY 4.0' }
  assert.deepEqual(mediaReleaseBlockers(complete), [])
  assert.equal(isMediaReleased(complete), true)

  assert.deepEqual(mediaReleaseBlockers({ ...complete, altText: '  ' }), ['no alt text'])
  assert.deepEqual(mediaReleaseBlockers({ ...complete, rights: '' }), ['no cleared rights'])
  assert.deepEqual(mediaReleaseBlockers({ ...complete, storageKey: '' }), ['no stored file'])
  assert.equal(isMediaReleased({ ...complete, rights: '' }), false)
})

test('usage names every item that points at this image, and where', () => {
  const ledger = [
    question('q1', [{ id: 'p1', mediaId: 'med-a', slot: 'stem' }]),
    question('q2', [{ id: 'p2', mediaId: 'med-a', slot: 'answer', answerLabel: 'C' }]),
    question('q3', [{ id: 'p3', mediaId: 'med-b', slot: 'stem' }]),
  ]
  const usage = usageOf('med-a', ledger, [])
  assert.deepEqual(usage.map((entry) => [entry.ownerId, entry.where]), [['q1', 'stem'], ['q2', 'answer C']])
  assert.deepEqual(usageOf('med-b', ledger, []).map((entry) => entry.ownerId), ['q3'])
  assert.deepEqual(usageOf('med-nobody', ledger, []), [])
})

test('article, practical and histology media also prevent deletion', () => {
  const ledger = [
    { id: 'a1', kind: 'article', title: 'Article', articleData: { media: [{ sourceId: 'med-a' }] } },
    { id: 'p1', kind: 'practical', title: 'Case', practicalData: { decisions: [{ id: 'd1', mediaUrl: '/media/med-a' }] } },
    { id: 'h1', kind: 'histology', title: 'Slide', histologyData: { views: [{ objective: 4, image: '/media/med-a' }] } },
  ]
  assert.deepEqual(usageOf('med-a', ledger, []).map((entry) => entry.where), ['article media', 'decision d1', '4× field'])
  assert.match(deleteRefusal('med-a', ledger, []), /3 items/)
})

test('a concept that shows an image counts as using it', () => {
  const concepts = [{ id: 'c1', label: 'Brachial plexus', mediaIds: ['med-a'] }]
  const usage = usageOf('med-a', [], concepts)
  assert.deepEqual(
    usage.map((entry) => [entry.ownerKind, entry.ownerId, entry.where]),
    [['concept', 'c1', 'concept media']],
  )
})

test('an image in use cannot be deleted, and the refusal says who is using it', () => {
  const ledger = [question('q1', [{ id: 'p1', mediaId: 'med-a', slot: 'stem' }])]
  const refusal = deleteRefusal('med-a', ledger, [])
  assert.match(refusal, /1 item/)
  assert.match(refusal, /Question q1/)
  assert.equal(deleteRefusal('med-free', ledger, []), null)
})

test('a long usage list is summarised rather than printed whole', () => {
  const ledger = Array.from({ length: 9 }, (_, index) =>
    question(`q${index}`, [{ id: `p${index}`, mediaId: 'med-a', slot: 'stem' }]))
  const refusal = deleteRefusal('med-a', ledger, [])
  assert.match(refusal, /9 items/)
  assert.match(refusal, /and 4 more/)
})

test('the document this library lives in is named once', () => {
  assert.equal(MEDIA_STATE_KEY, 'synapse-media-library-v1')
})
