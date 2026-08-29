import { test } from 'node:test'
import assert from 'node:assert/strict'
import { exportDecksToApkg } from './exportApkg.ts'
import { readAnkiPackage } from './container.ts'
import { readAnkiDb } from './ankiDb.ts'
import { mapAnkiPackage } from './mapper.ts'
import type { BasicNote, ClozeNote, FlashcardCollection } from '../../data/flashcards/model.ts'

const NOW = new Date('2026-08-29T00:00:00.000Z')
const ISO = NOW.toISOString()

function counter(): () => string {
  let n = 0
  return () => String(n++)
}

function sampleCollection(): FlashcardCollection {
  const basic: BasicNote = {
    id: 'n1',
    type: 'basic',
    deckId: 'd1',
    tags: ['anatomy'],
    createdAt: ISO,
    updatedAt: ISO,
    fields: { front: 'What is the heart?', back: 'A muscle' },
  }
  const cloze: ClozeNote = {
    id: 'n2',
    type: 'cloze',
    deckId: 'd1',
    tags: [],
    createdAt: ISO,
    updatedAt: ISO,
    fields: { text: 'The {{c1::mitochondria}} is the powerhouse', extra: 'cell biology' },
  }
  return {
    version: 2,
    decks: { d1: { id: 'd1', name: 'Bio', createdAt: ISO } },
    notes: { n1: basic, n2: cloze },
    meta: {},
  }
}

test('exportDecksToApkg round-trips through our own importer (notes, fields, tags, deck)', async () => {
  const blob = await exportDecksToApkg(sampleCollection(), ['d1'], async () => null)
  const buf = await blob.arrayBuffer()

  const container = await readAnkiPackage(buf)
  assert.equal(container.format, 'legacy')

  const pkg = await readAnkiDb(container.sqlite)
  const mapped = mapAnkiPackage(pkg, { preserveSchedule: false, now: NOW, idFactory: counter() })

  assert.equal(mapped.notes.length, 2)

  const basic = mapped.notes.find((n) => n.type === 'basic') as BasicNote
  assert.ok(basic)
  assert.equal(basic.fields.front, 'What is the heart?')
  assert.equal(basic.fields.back, 'A muscle')
  assert.deepEqual(basic.tags, ['anatomy'])

  const cloze = mapped.notes.find((n) => n.type === 'cloze') as ClozeNote
  assert.ok(cloze)
  assert.equal(cloze.fields.text, 'The {{c1::mitochondria}} is the powerhouse')
  assert.equal(cloze.fields.extra, 'cell biology')

  assert.ok(mapped.decks.some((d) => d.name === 'Bio'))
})

test('exportDecksToApkg only includes notes from the requested decks', async () => {
  const collection = sampleCollection()
  collection.decks.d2 = { id: 'd2', name: 'Other', createdAt: ISO }
  collection.notes.n3 = {
    id: 'n3',
    type: 'basic',
    deckId: 'd2',
    tags: [],
    createdAt: ISO,
    updatedAt: ISO,
    fields: { front: 'excluded', back: 'x' },
  } as BasicNote

  const blob = await exportDecksToApkg(collection, ['d1'], async () => null)
  const container = await readAnkiPackage(await blob.arrayBuffer())
  const pkg = await readAnkiDb(container.sqlite)
  const mapped = mapAnkiPackage(pkg, { preserveSchedule: false, now: NOW, idFactory: counter() })

  assert.equal(mapped.notes.length, 2)
  assert.ok(!mapped.notes.some((n) => n.type === 'basic' && (n as BasicNote).fields.front === 'excluded'))
})

test('exportDecksToApkg embeds media and rewrites refs back to Anki filenames', async () => {
  const collection = sampleCollection()
  ;(collection.notes.n1 as BasicNote).fields.front = 'Heart <img src="synapse-doc:doc-42">'

  const fetchMedia = async (ref: string) =>
    ref === 'synapse-doc:doc-42' ? { name: 'heart.png', bytes: Uint8Array.from([0x89, 0x50]) } : null

  const blob = await exportDecksToApkg(collection, ['d1'], fetchMedia)
  const container = await readAnkiPackage(await blob.arrayBuffer())

  // The asset is packaged under its original name via the legacy media map.
  assert.ok(container.media.some((m) => m.ankiName === 'heart.png' && m.bytes.length === 2))

  // And the note's HTML now points at the bare filename, not our reference.
  const pkg = await readAnkiDb(container.sqlite)
  const basicNote = pkg.notes.find((n) => n.fields[0].includes('img'))!
  assert.match(basicNote.fields[0], /<img src="heart\.png">/)
  assert.doesNotMatch(basicNote.fields[0], /synapse-doc/)
})
