import test from 'node:test'
import assert from 'node:assert/strict'
import {
  MEDIA_STATE_KEY, deleteRefusal, isMediaReleased, mediaReleaseBlockers, storageKeyFor, usageOf,
} from './mediaLibrary.ts'
import * as server from '../../server/src/mediaLibrary.js'

const SHA = 'ab12cd34'.padEnd(64, '0')

test('the client and the server agree where a file is stored', () => {
  assert.equal(MEDIA_STATE_KEY, server.MEDIA_STATE_KEY)
  for (const mime of ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'application/pdf']) {
    assert.equal(storageKeyFor(SHA, mime), server.storageKeyFor(SHA, mime), mime)
  }
  for (const digest of ['short', SHA.toUpperCase(), '../../etc/passwd'.padEnd(64, 'a')]) {
    assert.equal(storageKeyFor(digest, 'image/png'), server.storageKeyFor(digest, 'image/png'), digest)
  }
})

test('the client and the server agree on what holds an image back', () => {
  const cases = [
    { storageKey: 'media/ab/12/x.png', altText: 'a', rights: 'b' },
    { storageKey: '', altText: 'a', rights: 'b' },
    { storageKey: 'x', altText: ' ', rights: 'b' },
    { storageKey: 'x', altText: 'a', rights: '' },
    {},
  ]
  for (const record of cases) {
    assert.deepEqual(mediaReleaseBlockers(record), server.mediaReleaseBlockers(record))
    assert.equal(isMediaReleased(record), server.isMediaReleased(record))
  }
})

test('the client and the server agree who is using an image', () => {
  const ledger = [
    { id: 'q1', kind: 'question', title: 'Q1', questionData: { media: [{ id: 'p1', mediaId: 'med-a', slot: 'stem' as const }] } },
    { id: 'q2', kind: 'question', title: 'Q2', questionData: { media: [{ id: 'p2', mediaId: 'med-a', slot: 'answer' as const, answerLabel: 'C' as const }] } },
    { id: 'q3', kind: 'question', title: 'Q3', questionData: { media: [] } },
  ]
  const concepts = [{ id: 'c1', label: 'Plexus', mediaIds: ['med-a'] }]
  for (const id of ['med-a', 'med-none']) {
    assert.deepEqual(usageOf(id, ledger, concepts), server.usageOf(id, ledger, concepts), id)
    assert.equal(deleteRefusal(id, ledger, concepts), server.deleteRefusal(id, ledger, concepts), id)
  }
})
