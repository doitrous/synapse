import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mapAnkiPackage } from './mapper.ts'
import type { AnkiPackage } from './ankiDb.ts'
import type { BasicNote, ClozeNote } from '../../data/flashcards/model.ts'

function counter(): () => string {
  let n = 0
  return () => String(n++)
}

const NOW = new Date('2026-08-29T00:00:00.000Z')

function samplePackage(): AnkiPackage {
  return {
    models: {
      '1': {
        id: '1',
        name: 'Basic',
        type: 0,
        fields: [
          { name: 'Front', ord: 0 },
          { name: 'Back', ord: 1 },
        ],
        templates: [{ name: 'Card 1', ord: 0, qfmt: '{{Front}}', afmt: '{{Back}}' }],
      },
      '2': {
        id: '2',
        name: 'Cloze',
        type: 1,
        fields: [
          { name: 'Text', ord: 0 },
          { name: 'Back Extra', ord: 1 },
        ],
        templates: [{ name: 'Cloze', ord: 0, qfmt: '{{cloze:Text}}', afmt: '' }],
      },
      '3': {
        id: '3',
        name: 'Fancy',
        type: 0,
        fields: [
          { name: 'F1', ord: 0 },
          { name: 'F2', ord: 1 },
          { name: 'F3', ord: 2 },
        ],
        templates: [{ name: 'C', ord: 0, qfmt: '{{F1}}', afmt: '{{F2}}' }],
      },
    },
    decks: {
      '1': { id: '1', name: 'Default' },
      '5': { id: '5', name: 'Spanish::Verbs' },
    },
    notes: [
      { id: 10, mid: '1', tags: ['tag1'], fields: ['Q <img src="a.png">', 'A [sound:s.mp3]'] },
      { id: 11, mid: '2', tags: [], fields: ['{{c1::x}} {{c2::y}}', 'extra'] },
      { id: 12, mid: '3', tags: ['t'], fields: ['f1', 'f2', 'f3'] },
      { id: 13, mid: '999', tags: [], fields: ['front only'] },
    ],
    cards: [
      { id: 100, nid: 10, did: '1', ord: 0, type: 2, queue: 2, due: 5, ivl: 15, factor: 2200, reps: 4, lapses: 1 },
      { id: 101, nid: 11, did: '5', ord: 0, type: 2, queue: 2, due: 5, ivl: 30, factor: 2500, reps: 2, lapses: 0 },
      { id: 102, nid: 11, did: '5', ord: 1, type: 2, queue: 2, due: 5, ivl: 40, factor: 2500, reps: 1, lapses: 0 },
      { id: 103, nid: 12, did: '1', ord: 0, type: 0, queue: 0, due: 0, ivl: 0, factor: 0, reps: 0, lapses: 0 },
    ],
  }
}

test('mapAnkiPackage: basic note type -> BasicNote front/back, tags preserved', () => {
  const mapped = mapAnkiPackage(samplePackage(), { preserveSchedule: false, now: NOW, idFactory: counter() })
  const basic = mapped.notes.find((n) => n.type === 'basic' && (n as BasicNote).fields.front.startsWith('Q ')) as BasicNote
  assert.ok(basic)
  assert.equal(basic.fields.front, 'Q <img src="a.png">')
  assert.equal(basic.fields.back, 'A [sound:s.mp3]')
  assert.deepEqual(basic.tags, ['tag1'])
})

test('mapAnkiPackage: cloze note type -> ClozeNote, native markup preserved', () => {
  const mapped = mapAnkiPackage(samplePackage(), { preserveSchedule: false, now: NOW, idFactory: counter() })
  const cloze = mapped.notes.find((n) => n.type === 'cloze') as ClozeNote
  assert.ok(cloze)
  assert.equal(cloze.fields.text, '{{c1::x}} {{c2::y}}')
  assert.equal(cloze.fields.extra, 'extra')
})

test('mapAnkiPackage: >2-field type merges extras into back and reports it', () => {
  const mapped = mapAnkiPackage(samplePackage(), { preserveSchedule: false, now: NOW, idFactory: counter() })
  const fancy = mapped.notes.find((n) => n.type === 'basic' && (n as BasicNote).fields.front === 'f1') as BasicNote
  assert.ok(fancy)
  assert.equal(fancy.fields.back, 'f2<br>f3')
  assert.ok(mapped.report.approximations.some((a) => /more than two fields/i.test(a)))
})

test('mapAnkiPackage: unknown note type -> best-effort basic + report', () => {
  const mapped = mapAnkiPackage(samplePackage(), { preserveSchedule: false, now: NOW, idFactory: counter() })
  const unknown = mapped.notes.find((n) => n.type === 'basic' && (n as BasicNote).fields.front === 'front only') as BasicNote
  assert.ok(unknown)
  assert.equal(unknown.fields.back, '')
  assert.ok(mapped.report.approximations.some((a) => /unknown note type/i.test(a)))
})

test('mapAnkiPackage: collects img and sound media refs', () => {
  const mapped = mapAnkiPackage(samplePackage(), { preserveSchedule: false, now: NOW, idFactory: counter() })
  assert.deepEqual([...mapped.mediaRefsNeeded].sort(), ['a.png', 's.mp3'])
  assert.equal(mapped.report.mediaRefs, 2)
})

test('mapAnkiPackage: decks are created per Anki deck that receives a note', () => {
  const mapped = mapAnkiPackage(samplePackage(), { preserveSchedule: false, now: NOW, idFactory: counter() })
  const names = mapped.decks.map((d) => d.name).sort()
  assert.deepEqual(names, ['Default', 'Spanish::Verbs'])
})

test('mapAnkiPackage: preserveSchedule maps interval/ease/reps and re-anchors due', () => {
  const mapped = mapAnkiPackage(samplePackage(), { preserveSchedule: true, now: NOW, idFactory: counter() })
  assert.ok(mapped.meta)
  // Deterministic ids: deck-0 (Default), note-1 (basic), deck-2 (Spanish), note-3 (cloze), note-4 (fancy), note-5 (unknown)
  const basicMeta = mapped.meta!['note-1::card']
  assert.ok(basicMeta, 'basic card meta present')
  assert.equal(basicMeta.schedule.state, 'review')
  assert.equal(basicMeta.schedule.interval, 15)
  assert.equal(basicMeta.schedule.ease, 2.2)
  assert.equal(basicMeta.reviewCount, 4)
  assert.equal(basicMeta.schedule.due, new Date(NOW.getTime() + 15 * 86_400_000).toISOString())

  // Cloze cards: ord 0 -> c1, ord 1 -> c2
  assert.ok(mapped.meta!['note-3::c1'])
  assert.equal(mapped.meta!['note-3::c1'].schedule.interval, 30)
  assert.ok(mapped.meta!['note-3::c2'])
  assert.equal(mapped.meta!['note-3::c2'].schedule.interval, 40)

  // A new Anki card stays new.
  assert.equal(mapped.meta!['note-4::card'].schedule.state, 'new')
})

test('mapAnkiPackage: without preserveSchedule there is no meta', () => {
  const mapped = mapAnkiPackage(samplePackage(), { preserveSchedule: false, now: NOW, idFactory: counter() })
  assert.equal(mapped.meta, undefined)
})
