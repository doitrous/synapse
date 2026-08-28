import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cardId, newCardMeta, type CardMeta, type Note } from './model.ts'
import type { CardSchedule } from '../srs.ts'
import type { CardWithMeta } from '@/lib/useFlashcards'
import {
  DEFAULT_FILTERS,
  DEFAULT_SORT,
  applyBrowse,
  isFiltering,
  noteFrontPlain,
  searchText,
  type BrowseFilters,
  type BrowseSort,
} from './browseQuery.ts'

const now = new Date('2026-08-20T09:00:00.000Z')

const sched = (over: Partial<CardSchedule> = {}): CardSchedule => ({
  state: 'new', step: 0, interval: 0, ease: 2.5, lapses: 0, reps: 0, due: now.toISOString(), ...over,
})
const meta = (over: Partial<CardMeta> = {}): CardMeta => ({ ...newCardMeta(sched()), ...over })

let seq = 0
function basic(
  front: string,
  back: string,
  over: { deckId?: string; tags?: string[]; meta?: Partial<CardMeta>; createdAt?: string; updatedAt?: string } = {},
): CardWithMeta {
  const id = `n${seq++}`
  const note: Note = {
    id,
    type: 'basic',
    deckId: over.deckId ?? 'deck-a',
    tags: over.tags ?? [],
    createdAt: over.createdAt ?? '2026-08-01T00:00:00.000Z',
    updatedAt: over.updatedAt ?? '2026-08-01T00:00:00.000Z',
    fields: { front, back },
  }
  return { card: { id: cardId(id, 'card'), noteId: id, deckId: note.deckId, templateKey: 'card' }, note, meta: meta(over.meta) }
}

function cloze(text: string, over: { deckId?: string; tags?: string[] } = {}): CardWithMeta {
  const id = `n${seq++}`
  const note: Note = {
    id, type: 'cloze', deckId: over.deckId ?? 'deck-a', tags: over.tags ?? [],
    createdAt: '2026-08-01T00:00:00.000Z', updatedAt: '2026-08-01T00:00:00.000Z',
    fields: { text, extra: '' },
  }
  return { card: { id: cardId(id, 'c1'), noteId: id, deckId: note.deckId, templateKey: 'c1' }, note, meta: meta() }
}

const deckNameOf = (id: string) => ({ 'deck-a': 'Anatomy', 'deck-b': 'Biochem' }[id] ?? id)

/* ---- Text search --------------------------------------------------------- */

test('text search hits card face text, case-insensitively', () => {
  const entry = basic('The <b>femur</b> is the thigh bone', 'A long bone')
  assert.equal(searchText(entry, 'FEMUR'), true)
  assert.equal(searchText(entry, 'thigh'), true)
  assert.equal(searchText(entry, 'skull'), false)
})

test('text search ignores cloze markup', () => {
  const entry = cloze('Hyperplasia is {{c1::proliferation}} of {{c2::cells}}.')
  assert.equal(searchText(entry, 'proliferation'), true, 'matches inside the deletion')
  assert.equal(searchText(entry, 'c1'), false, 'never matches the markup itself')
  assert.equal(searchText(entry, '{{c1'), false)
  assert.equal(noteFrontPlain(entry.note), 'Hyperplasia is proliferation of cells.')
})

test('text search hits deck name and tags', () => {
  const entry = basic('front', 'back', { tags: ['pathology'] })
  assert.equal(searchText(entry, 'anatomy', deckNameOf('deck-a')), true)
  assert.equal(searchText(entry, 'pathology'), true)
})

test('an empty term matches everything', () => {
  assert.equal(searchText(basic('a', 'b'), '   '), true)
})

/* ---- Filters ------------------------------------------------------------- */

const filters = (over: Partial<BrowseFilters> = {}): BrowseFilters => ({ ...DEFAULT_FILTERS, ...over })
const run = (entries: CardWithMeta[], over: Partial<BrowseFilters> = {}, sort: BrowseSort = DEFAULT_SORT) =>
  applyBrowse(entries, filters(over), sort, now, deckNameOf)

test('state filter matches exclusiveStatus', () => {
  const newCard = basic('a', 'b')
  const mature = basic('c', 'd', { meta: { schedule: sched({ state: 'review', interval: 40 }), reviewCount: 3 } })
  const out = run([newCard, mature], { state: 'mature' })
  assert.deepEqual(out.map((e) => e.card.id), [mature.card.id])
})

test('due filter separates due, overdue, and not-due', () => {
  const overdue = basic('a', 'b', { meta: { schedule: sched({ state: 'review', interval: 5, due: '2026-08-18T09:00:00.000Z' }), reviewCount: 1 } })
  const future = basic('c', 'd', { meta: { schedule: sched({ state: 'review', interval: 10, due: '2026-08-25T09:00:00.000Z' }), reviewCount: 1 } })
  const all = [overdue, future]
  assert.deepEqual(run(all, { due: 'due' }).map((e) => e.card.id), [overdue.card.id])
  assert.deepEqual(run(all, { due: 'overdue' }).map((e) => e.card.id), [overdue.card.id])
  assert.deepEqual(run(all, { due: 'not-due' }).map((e) => e.card.id), [future.card.id])
})

test('flag filter, including none', () => {
  const flagged = basic('a', 'b', { meta: { flag: 'red' } })
  const other = basic('c', 'd', { meta: { flag: 'blue' } })
  const unflagged = basic('e', 'f')
  const all = [flagged, other, unflagged]
  assert.deepEqual(run(all, { flag: 'red' }).map((e) => e.card.id), [flagged.card.id])
  assert.deepEqual(run(all, { flag: 'none' }).map((e) => e.card.id), [unflagged.card.id])
  assert.equal(run(all, { flag: 'any' }).length, 3)
})

test('suspended and buried filters', () => {
  const suspended = basic('a', 'b', { meta: { suspended: true } })
  const buried = basic('c', 'd', { meta: { buriedUntil: '2026-08-25' } })
  const plain = basic('e', 'f')
  const all = [suspended, buried, plain]
  assert.deepEqual(run(all, { suspended: 'yes' }).map((e) => e.card.id), [suspended.card.id])
  assert.deepEqual(run(all, { suspended: 'no' }).map((e) => e.card.id).sort(), [buried.card.id, plain.card.id].sort())
  assert.deepEqual(run(all, { buried: 'yes' }).map((e) => e.card.id), [buried.card.id])
  assert.deepEqual(run(all, { buried: 'no' }).map((e) => e.card.id).sort(), [plain.card.id, suspended.card.id].sort())
})

test('deck and type filters', () => {
  const a = basic('a', 'b', { deckId: 'deck-a' })
  const b = basic('c', 'd', { deckId: 'deck-b' })
  const cl = cloze('a {{c1::x}}', { deckId: 'deck-a' })
  const all = [a, b, cl]
  assert.deepEqual(run(all, { deckId: 'deck-b' }).map((e) => e.card.id), [b.card.id])
  assert.deepEqual(run(all, { type: 'cloze' }).map((e) => e.card.id), [cl.card.id])
})

test('tag filter', () => {
  const tagged = basic('a', 'b', { tags: ['heart'] })
  const untagged = basic('c', 'd')
  assert.deepEqual(run([tagged, untagged], { tag: 'heart' }).map((e) => e.card.id), [tagged.card.id])
})

/* ---- Sorting ------------------------------------------------------------- */

test('each sort key orders in both directions', () => {
  const low = basic('a', 'b', { deckId: 'deck-a', createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z', meta: { schedule: sched({ state: 'review', interval: 2, lapses: 0, due: '2026-08-21T00:00:00.000Z' }) } })
  const high = basic('c', 'd', { deckId: 'deck-b', createdAt: '2026-06-01T00:00:00.000Z', updatedAt: '2026-06-01T00:00:00.000Z', meta: { schedule: sched({ state: 'review', interval: 50, lapses: 4, due: '2026-09-30T00:00:00.000Z' }) } })
  const all = [low, high]
  const ids = (o: BrowseSort) => applyBrowse(all, DEFAULT_FILTERS, o, now, deckNameOf).map((e) => e.card.id)

  for (const key of ['created', 'edited', 'due', 'interval', 'lapses', 'deck'] as const) {
    assert.deepEqual(ids({ key, direction: 'asc' }), [low.card.id, high.card.id], `${key} asc`)
    assert.deepEqual(ids({ key, direction: 'desc' }), [high.card.id, low.card.id], `${key} desc`)
  }
})

test('sort is stable across ties via the card id', () => {
  const x = basic('a', 'b', { createdAt: '2026-05-01T00:00:00.000Z' })
  const y = basic('c', 'd', { createdAt: '2026-05-01T00:00:00.000Z' })
  const out = applyBrowse([y, x], DEFAULT_FILTERS, { key: 'created', direction: 'asc' }, now, deckNameOf)
  assert.deepEqual(out.map((e) => e.card.id), [x.card.id, y.card.id].sort((a, b) => a.localeCompare(b)))
})

test('applyBrowse does not mutate its input', () => {
  const all = [basic('a', 'b'), basic('c', 'd')]
  const snapshot = [...all]
  applyBrowse(all, DEFAULT_FILTERS, { key: 'due', direction: 'desc' }, now, deckNameOf)
  assert.deepEqual(all, snapshot)
})

/* ---- Empty result & helpers --------------------------------------------- */

test('a query that matches nothing returns an empty array', () => {
  const out = run([basic('a', 'b'), basic('c', 'd')], { text: 'nonexistent-term' })
  assert.deepEqual(out, [])
})

test('isFiltering reflects whether any filter narrows', () => {
  assert.equal(isFiltering(DEFAULT_FILTERS), false)
  assert.equal(isFiltering(filters({ text: '  ' })), false)
  assert.equal(isFiltering(filters({ text: 'x' })), true)
  assert.equal(isFiltering(filters({ flag: 'none' })), true)
  assert.equal(isFiltering(filters({ deckId: 'deck-a' })), true)
})
