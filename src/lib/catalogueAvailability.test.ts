import { test } from 'node:test'
import assert from 'node:assert/strict'
import { catalogueAvailability } from './catalogueAvailability.ts'

const ok = { hydrated: true, error: null } as const
const loading = { hydrated: false, error: null } as const

test('a loaded library with articles is ready', () => {
  assert.deepEqual(catalogueAvailability({ statuses: [ok, ok, ok], itemCount: 17 }), { kind: 'ready' })
})

test('a loaded library with no published article is empty, not broken', () => {
  assert.deepEqual(catalogueAvailability({ statuses: [ok, ok, ok], itemCount: 0 }), { kind: 'empty' })
})

test('nothing is called empty until every document has been read', () => {
  // The bug this whole module exists for: reporting "no articles" while the
  // ledger is still in flight tells the student the library is empty when it
  // is merely slow.
  assert.deepEqual(catalogueAvailability({ statuses: [ok, loading, ok], itemCount: 0 }), { kind: 'loading' })
  assert.deepEqual(catalogueAvailability({ statuses: [loading, ok, ok], itemCount: 5 }), { kind: 'loading' })
})

test('a failed read is reported as a failure, never as an empty library', () => {
  // `hydrate` leaves the seed in place and keeps retrying, so a failed key is
  // never hydrated. Without this rule the student waits on a spinner forever,
  // or worse, is told there is no content.
  assert.deepEqual(
    catalogueAvailability({ statuses: [{ hydrated: false, error: 'network' }, ok, ok], itemCount: 0 }),
    { kind: 'error', error: 'network' },
  )
})

test('an error outranks a still-loading sibling', () => {
  assert.deepEqual(
    catalogueAvailability({ statuses: [loading, { hydrated: false, error: 'forbidden' }], itemCount: 0 }),
    { kind: 'error', error: 'forbidden' },
  )
})

test('an error is reported even when other documents did load content', () => {
  // Half a library is still a broken library, and silently showing the half
  // that loaded is how a missing evidence store looks like a thin article.
  assert.deepEqual(
    catalogueAvailability({ statuses: [ok, { hydrated: true, error: 'server' }], itemCount: 12 }),
    { kind: 'error', error: 'server' },
  )
})

test('the first error wins, so the message is stable across re-renders', () => {
  assert.deepEqual(
    catalogueAvailability({
      statuses: [{ hydrated: false, error: 'unauthorized' }, { hydrated: false, error: 'network' }],
      itemCount: 0,
    }),
    { kind: 'error', error: 'unauthorized' },
  )
})

test('no documents at all is loading, not empty', () => {
  assert.deepEqual(catalogueAvailability({ statuses: [], itemCount: 0 }), { kind: 'empty' })
})
