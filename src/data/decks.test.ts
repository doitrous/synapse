import { test } from 'node:test'
import assert from 'node:assert/strict'
import { dueQueue, parseCardLines, managedDeckToStudentDeck, deckFromTerms } from './decks.ts'
import { newCard, ANKI_DEFAULTS, type CardSchedule } from './srs.ts'
import type { ManagedContentItem } from './contentControl.ts'

const at = new Date('2026-08-20T09:00:00.000Z')
const sched = (over: Partial<CardSchedule> = {}): CardSchedule => ({ ...newCard(at), ...over })

test('the queue offers due cards before new ones', () => {
  const queue = dueQueue([
    { id: 'n', schedule: sched() },
    { id: 'd', schedule: sched({ state: 'review', due: new Date(at.getTime() - 1000).toISOString() }) },
  ], at, ANKI_DEFAULTS, { newSeen: 0, reviewsSeen: 0 })
  assert.equal(queue[0].id, 'd')
})

test('a card that is not yet due is not in the queue', () => {
  const queue = dueQueue([
    { id: 'later', schedule: sched({ state: 'review', due: new Date(at.getTime() + 86_400_000).toISOString() }) },
  ], at, ANKI_DEFAULTS, { newSeen: 0, reviewsSeen: 0 })
  assert.deepEqual(queue, [])
})

test('the daily new cap bounds how many new cards are offered', () => {
  const cards = Array.from({ length: 30 }, (_, i) => ({ id: `n${i}`, schedule: sched() }))
  const queue = dueQueue(cards, at, ANKI_DEFAULTS, { newSeen: 0, reviewsSeen: 0 })
  assert.equal(queue.length, ANKI_DEFAULTS.newPerDay)
})

test('cards already seen today count against the cap', () => {
  const cards = Array.from({ length: 30 }, (_, i) => ({ id: `n${i}`, schedule: sched() }))
  const queue = dueQueue(cards, at, ANKI_DEFAULTS, { newSeen: 18, reviewsSeen: 0 })
  assert.equal(queue.length, 2)
})

test('cards parse one per line, front and back split on a pipe', () => {
  const cards = parseCardLines('Aorta | Largest artery\nVein | Carries blood back')
  assert.equal(cards.length, 2)
  assert.equal(cards[0].front, 'Aorta')
  assert.equal(cards[0].back, 'Largest artery')
})

test('a line with no separator is not a card', () => {
  assert.equal(parseCardLines('Aorta\n\nVein | Back').length, 1)
})

test('an unpublished deck is not offered to students', () => {
  const item = { id: 'd1', kind: 'deck', title: 'CVS', subjectId: 'cvs', status: 'Draft', owner: '', updatedAt: '', fields: {},
    deckData: { description: '', cards: [{ id: 'c1', front: 'a', back: 'b' }] } } as unknown as ManagedContentItem
  assert.equal(managedDeckToStudentDeck(item), null)
})

test('a published deck with no cards is not offered either', () => {
  const item = { id: 'd1', kind: 'deck', title: 'CVS', subjectId: 'cvs', status: 'Published', owner: '', updatedAt: '', fields: {},
    deckData: { description: '', cards: [] } } as unknown as ManagedContentItem
  assert.equal(managedDeckToStudentDeck(item), null)
})

test('a deck built from taxonomy terms is stable across two runs', () => {
  const terms = [{ id: 't1', term: 'Aorta', ar: 'الأبهر', def: 'Largest artery' }]
  const first = deckFromTerms('Anatomy', terms)
  const second = deckFromTerms('Anatomy', terms)
  assert.equal(first.id, second.id)
  assert.deepEqual(first.cards.map((card) => card.id), second.cards.map((card) => card.id))
  assert.equal(first.cards[0].front, 'Aorta')
})
