import { test } from 'node:test'
import assert from 'node:assert/strict'
import { generateCards, reconcileNoteInMeta, templateKeys } from './generate.ts'
import { newCardMeta, type BasicNote, type ClozeNote, type ImageOcclusionNote, type CardMeta } from './model.ts'
import { sm2Scheduler } from './scheduler.ts'
import type { CardSchedule } from '../srs.ts'

const now = new Date('2026-08-20T09:00:00.000Z')
const scheduler = sm2Scheduler()

const basic: BasicNote = {
  id: 'n1', type: 'basic', deckId: 'd1', tags: [], createdAt: '', updatedAt: '',
  fields: { front: 'Q', back: 'A' },
}
const cloze: ClozeNote = {
  id: 'n2', type: 'cloze', deckId: 'd1', tags: [], createdAt: '', updatedAt: '',
  fields: { text: '{{c1::a}} {{c2::b}} {{c1::c}}', extra: '' },
}
const occ: ImageOcclusionNote = {
  id: 'n3', type: 'image-occlusion', deckId: 'd1', tags: [], createdAt: '', updatedAt: '',
  image: 'synapse-media:img', imageWidth: 100, imageHeight: 100, mode: 'hide-all',
  occluders: [
    { id: 'o1', shape: { kind: 'rect', x: 0, y: 0, w: 10, h: 10 }, label: '' },
    { id: 'o2', shape: { kind: 'rect', x: 20, y: 0, w: 10, h: 10 }, label: '', groupId: 'g1' },
    { id: 'o3', shape: { kind: 'rect', x: 40, y: 0, w: 10, h: 10 }, label: '', groupId: 'g1' },
  ],
  groups: [{ id: 'g1', label: 'pair' }],
  fields: { header: '', back: '' },
}

test('a basic note makes one card', () => {
  assert.deepEqual(templateKeys(basic), ['card'])
  assert.equal(generateCards(basic)[0].id, 'n1::card')
})

test('a cloze note makes one card per distinct number', () => {
  assert.deepEqual(templateKeys(cloze), ['c1', 'c2'])
  assert.deepEqual(generateCards(cloze).map((c) => c.id), ['n2::c1', 'n2::c2'])
})

test('grouped occluders make one card for the group plus one per ungrouped', () => {
  // o1 ungrouped + group g1 (holding o2,o3) = 2 cards, not 3.
  assert.deepEqual(templateKeys(occ).sort(), ['g1', 'o1'])
  assert.equal(generateCards(occ).length, 2)
})

test('editing a note keeps unaffected siblings and other notes untouched', () => {
  const studied: CardSchedule = { state: 'review', step: 0, interval: 30, ease: 2.6, lapses: 1, reps: 8, due: now.toISOString() }
  const other = newCardMeta(scheduler.newCard(now))
  const before: Record<string, CardMeta> = {
    'n2::c1': { ...newCardMeta(studied), schedule: studied },
    'n2::c2': newCardMeta(scheduler.newCard(now)),
    'z1::card': other, // a different note — must survive
  }
  // Add a third cloze number to the same note.
  const edited: ClozeNote = { ...cloze, fields: { text: '{{c1::a}} {{c2::b}} {{c3::new}}', extra: '' } }
  const after = reconcileNoteInMeta(edited, before, scheduler, now)

  assert.equal(after['n2::c1'].schedule.interval, 30, 'c1 keeps its earned schedule')
  assert.ok(after['n2::c3'], 'c3 is created fresh')
  assert.equal(after['n2::c3'].schedule.state, 'new')
  assert.equal(after['z1::card'], other, 'a card from another note is untouched')
})

test('removing a cloze number drops only its card', () => {
  const before: Record<string, CardMeta> = {
    'n2::c1': newCardMeta(scheduler.newCard(now)),
    'n2::c2': newCardMeta(scheduler.newCard(now)),
  }
  const edited: ClozeNote = { ...cloze, fields: { text: '{{c1::a}}', extra: '' } }
  const after = reconcileNoteInMeta(edited, before, scheduler, now)
  assert.ok(after['n2::c1'])
  assert.equal(after['n2::c2'], undefined)
})
