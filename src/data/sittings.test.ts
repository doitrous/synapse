import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  EMPTY_SITTINGS,
  MAX_SITTINGS,
  forgetSitting,
  kindOfItems,
  recordSitting,
  sittingsOfKind,
  type Sitting,
  type SittingKind,
} from './sittings.ts'

function sitting(id: string, kind: SittingKind, finishedAt: string): Sitting {
  return {
    id,
    kind,
    startedAt: finishedAt,
    finishedAt,
    itemCount: 3,
    result: { total: 3, covered: 3 },
    itemIds: ['a', 'b', 'c'],
  }
}

test('a sitting is filed and read back', () => {
  const doc = recordSitting(EMPTY_SITTINGS, sitting('s1', 'practical', '2026-09-01T10:00:00.000Z'))
  assert.equal(doc.sittings.length, 1)
  assert.equal(doc.sittings[0].kind, 'practical')
})

test('newest first, whatever order they arrive in', () => {
  let doc = recordSitting(EMPTY_SITTINGS, sitting('old', 'mcq', '2026-09-01T10:00:00.000Z'))
  doc = recordSitting(doc, sitting('new', 'essay', '2026-09-03T10:00:00.000Z'))
  doc = recordSitting(doc, sitting('mid', 'mixed', '2026-09-02T10:00:00.000Z'))
  assert.deepEqual(doc.sittings.map((entry) => entry.id), ['new', 'mid', 'old'])
})

test('the same sitting recorded twice stays one row', () => {
  // The summary screen can mount more than once; a second record is a newer
  // reading of the same sitting, not a second sitting.
  const first = recordSitting(EMPTY_SITTINGS, sitting('s1', 'mixed', '2026-09-01T10:00:00.000Z'))
  const again = recordSitting(first, { ...sitting('s1', 'mixed', '2026-09-01T10:05:00.000Z'), itemCount: 6 })
  assert.equal(again.sittings.length, 1)
  assert.equal(again.sittings[0].itemCount, 6)
})

test('the ledger is capped and drops the oldest', () => {
  const base = Date.UTC(2026, 8, 1, 10, 0, 0)
  let doc = EMPTY_SITTINGS
  for (let index = 0; index < MAX_SITTINGS + 5; index += 1) {
    doc = recordSitting(doc, sitting(`s${index}`, 'mcq', new Date(base + index * 1000).toISOString()))
  }
  assert.equal(doc.sittings.length, MAX_SITTINGS)
  assert.equal(doc.sittings[0].id, `s${MAX_SITTINGS + 4}`)
  assert.equal(doc.sittings.at(-1)?.id, 's5')
})

test('filtering by kind, and asking for all of them', () => {
  let doc = EMPTY_SITTINGS
  doc = recordSitting(doc, sitting('a', 'mcq', '2026-09-01T10:00:00.000Z'))
  doc = recordSitting(doc, sitting('b', 'practical', '2026-09-02T10:00:00.000Z'))
  doc = recordSitting(doc, sitting('c', 'practical', '2026-09-03T10:00:00.000Z'))
  assert.deepEqual(sittingsOfKind(doc, 'practical').map((entry) => entry.id), ['c', 'b'])
  assert.deepEqual(sittingsOfKind(doc, 'essay'), [])
  assert.equal(sittingsOfKind(doc, 'all').length, 3)
})

test('forgetting a sitting removes only that one', () => {
  let doc = recordSitting(EMPTY_SITTINGS, sitting('a', 'mcq', '2026-09-01T10:00:00.000Z'))
  doc = recordSitting(doc, sitting('b', 'mcq', '2026-09-02T10:00:00.000Z'))
  assert.deepEqual(forgetSitting(doc, 'a').sittings.map((entry) => entry.id), ['b'])
})

test('a document with no sittings array still reads', () => {
  const legacy = { version: 1 } as never
  assert.deepEqual(sittingsOfKind(legacy, 'all'), [])
  assert.equal(recordSitting(legacy, sitting('a', 'mcq', '2026-09-01T10:00:00.000Z')).sittings.length, 1)
})

test('a queue of one bank is that bank; more than one is mixed', () => {
  assert.equal(kindOfItems([{ kind: 'practical' }, { kind: 'practical' }]), 'practical')
  assert.equal(kindOfItems([{ kind: 'essay' }]), 'essay')
  assert.equal(kindOfItems([{ kind: 'mcq' }, { kind: 'essay' }]), 'mixed')
})
