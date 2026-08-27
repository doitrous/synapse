import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ensureV2, isV2Collection, migrateV1ToV2, migratedNoteId, type StoredDecksV1 } from './migration.ts'
import { cardId } from './model.ts'
import { richToPlainText } from './richText.ts'
import type { CardSchedule } from '../srs.ts'

const now = new Date('2026-08-20T09:00:00.000Z')

const studied: CardSchedule = {
  state: 'review', step: 0, interval: 42, ease: 2.35, lapses: 2, reps: 9, due: '2026-09-01T09:00:00.000Z',
}

const v1: StoredDecksV1 = {
  d1: {
    id: 'd1',
    name: 'Cranial nerves',
    createdAt: '2026-01-01T00:00:00.000Z',
    cards: [
      { id: 'c-a', front: 'CN I', back: 'Olfactory' },
      { id: 'c-b', front: 'a < b & "x"', back: 'escaped safely' },
      { id: 'c-fresh', front: 'unseen', back: 'card' },
    ],
    schedules: {
      'c-a': studied,
      'c-b': { state: 'learning', step: 1, interval: 0, ease: 2.5, lapses: 0, reps: 1, due: '2026-08-20T09:10:00.000Z' },
      // c-fresh has no schedule → should become unseen, not be dropped.
    },
  },
}

test('every card survives and its schedule is preserved exactly', () => {
  const v2 = migrateV1ToV2(v1, now)
  assert.equal(Object.keys(v2.notes).length, 3)
  const id = cardId(migratedNoteId('d1', 'c-a'), 'card')
  assert.deepEqual(v2.meta[id].schedule, studied, 'the studied schedule is carried over untouched')
  assert.equal(v2.meta[id].reviewCount, 9, 'reviewCount seeds from reps')
})

test('a card with no stored schedule becomes an unseen new card, not a loss', () => {
  const v2 = migrateV1ToV2(v1, now)
  const id = cardId(migratedNoteId('d1', 'c-fresh'), 'card')
  assert.ok(v2.meta[id])
  assert.equal(v2.meta[id].schedule.state, 'new')
  assert.equal(v2.meta[id].reviewCount, 0)
})

test('plain-text fronts are escaped into safe rich text', () => {
  const v2 = migrateV1ToV2(v1, now)
  const note = v2.notes[migratedNoteId('d1', 'c-b')]
  assert.equal(note.type, 'basic')
  assert.ok(note.type === 'basic')
  assert.ok(!note.fields.front.includes('<'), 'raw < is escaped')
  assert.equal(richToPlainText(note.fields.front), 'a < b & "x"')
})

test('migration is idempotent by id, so running it twice is safe', () => {
  const first = migrateV1ToV2(v1, now)
  const second = migrateV1ToV2(v1, now)
  assert.deepEqual(Object.keys(first.meta).sort(), Object.keys(second.meta).sort())
  assert.deepEqual(Object.keys(first.notes).sort(), Object.keys(second.notes).sort())
})

test('ensureV2 passes a v2 collection through untouched', () => {
  const v2 = migrateV1ToV2(v1, now)
  assert.equal(ensureV2(v2, now), v2)
  assert.equal(isV2Collection(v2), true)
})

test('ensureV2 migrates a v1 store and tolerates an empty or corrupt one', () => {
  assert.equal(ensureV2(v1, now).version, 2)
  assert.deepEqual(ensureV2({}, now), { version: 2, decks: {}, notes: {}, meta: {} })
  assert.deepEqual(ensureV2(null, now).decks, {})
  assert.deepEqual(ensureV2('garbage', now).decks, {})
})
