import { test } from 'node:test'
import assert from 'node:assert/strict'
import { diffStateForDelta, isDeltaKey, type StateChange } from './stateDelta.ts'

const LEDGER = 'nishany-admin-content-ledger-v4'
const GRAPH = 'nishany-concept-graph-v2'
const q = (id: string, status = 'Draft') => ({ id, kind: 'question', status, title: `Q ${id}` })

test('a delta key is recognised; an unknown key is not', () => {
  assert.equal(isDeltaKey(LEDGER), true)
  assert.equal(isDeltaKey('nishany-vouchers-v1'), false)
})

test('publishing one question yields exactly one change, carrying before and after', () => {
  const base = [q('q1'), q('q2')]
  // Immutable update: q2 replaced, q1 kept by reference.
  const next = base.map((item) => (item.id === 'q2' ? { ...item, status: 'Published' } : item))
  const changes = diffStateForDelta(LEDGER, base, next) as StateChange[]
  assert.equal(changes.length, 1)
  assert.equal(changes[0].id, 'q2')
  assert.equal(changes[0].collection, 'items')
  assert.equal((changes[0].before as { status: string }).status, 'Draft')
  assert.equal((changes[0].after as { status: string }).status, 'Published')
})

test('an added item has before:null and a removed item has after:null', () => {
  // A realistic-size document, so the two changes stay well under the
  // whole-is-smaller threshold that only matters for broad sweeps.
  const base = Array.from({ length: 20 }, (_, i) => q(`q${i}`))
  const next = base.filter((item) => item.id !== 'q2').concat(q('q99')) // q2 removed, q99 added
  const changes = diffStateForDelta(LEDGER, base, next) as StateChange[]
  const byId = new Map(changes.map((change) => [change.id, change]))
  assert.equal(changes.length, 2)
  assert.equal(byId.get('q2')!.after, null)
  assert.equal(byId.get('q99')!.before, null)
  assert.equal(byId.has('q1'), false) // untouched, not sent
})

test('a no-op save produces no changes', () => {
  const base = [q('q1'), q('q2')]
  assert.deepEqual(diffStateForDelta(LEDGER, base, base), [])
})

test('a change broad enough that whole is smaller returns null (caller sends whole)', () => {
  const base = [q('q1'), q('q2'), q('q3'), q('q4')]
  // Change every item: 4 changes × (before+after) is larger than the 4-item doc.
  const next = base.map((item) => ({ ...item, status: 'Published' }))
  assert.equal(diffStateForDelta(LEDGER, base, next), null)
})

test('the concept graph diffs concepts and relations independently', () => {
  const base = { concepts: [{ id: 'c1' }, { id: 'c2' }], relations: [{ id: 'r1' }] }
  const next = { concepts: [{ id: 'c1' }, { id: 'c2', label: 'x' }], relations: [{ id: 'r1' }] }
  const changes = diffStateForDelta(GRAPH, base, next) as StateChange[]
  assert.equal(changes.length, 1)
  assert.equal(changes[0].collection, 'concepts')
  assert.equal(changes[0].id, 'c2')
})

test('a non-delta key returns null', () => {
  assert.equal(diffStateForDelta('nishany-vouchers-v1', [{ id: 'a' }], [{ id: 'b' }]), null)
})
