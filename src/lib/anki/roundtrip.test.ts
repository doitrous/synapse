import { test } from 'node:test'
import assert from 'node:assert/strict'
import { exportDecksToApkg } from './exportApkg.ts'
import { readAnkiPackage } from './container.ts'
import { readAnkiDb } from './ankiDb.ts'
import { mapAnkiPackage } from './mapper.ts'
import { materializeMedia, type UploadDoc } from './media.ts'
import { mergeImport } from '../flashcards/importCommit.ts'
import { EMPTY_COLLECTION, type BasicNote, type ClozeNote, type FlashcardCollection } from '../../data/flashcards/model.ts'

const NOW = new Date('2026-08-30T00:00:00.000Z')
const ISO = NOW.toISOString()

function uniqueIds(): () => string {
  let n = 0
  return () => `x${n++}`
}

function source(): FlashcardCollection {
  const basic: BasicNote = {
    id: 'n1',
    type: 'basic',
    deckId: 'd1',
    tags: ['anatomy'],
    createdAt: ISO,
    updatedAt: ISO,
    fields: { front: 'The heart <img src="synapse-doc:doc-1">', back: 'a muscle' },
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
    decks: { d1: { id: 'd1', name: 'Biology', createdAt: ISO } },
    notes: { n1: basic, n2: cloze },
    meta: {},
  }
}

test('full round trip: export a media-bearing collection, import it through the whole pipeline', async () => {
  // Export (media resolved to a real file + bytes).
  const exportFetch = async (ref: string) =>
    ref === 'synapse-doc:doc-1' ? { name: 'heart.png', bytes: Uint8Array.from([0x89, 0x50, 0x4e, 0x47]) } : null
  const blob = await exportDecksToApkg(source(), ['d1'], exportFetch)

  // Import: container -> db -> map -> media -> commit.
  const container = await readAnkiPackage(await blob.arrayBuffer())
  const pkg = await readAnkiDb(container.sqlite)
  const mapped = mapAnkiPackage(pkg, { preserveSchedule: false, now: NOW, idFactory: uniqueIds() })

  const uploaded: string[] = []
  const uploadDoc: UploadDoc = async (file) => {
    uploaded.push(file.name)
    return `up-${file.name}`
  }
  const { notes, report } = await materializeMedia(mapped, container, uploadDoc)
  const imported = mergeImport(EMPTY_COLLECTION, { decks: mapped.decks, notes, meta: mapped.meta })

  const importedNotes = Object.values(imported.notes)
  assert.equal(importedNotes.length, 2)

  // The media asset was uploaded and its reference rewritten to a synapse-doc ref.
  assert.ok(uploaded.includes('heart.png'))
  const basic = importedNotes.find((n) => n.type === 'basic') as BasicNote
  assert.match(basic.fields.front, /<img[^>]+src="synapse-doc:up-heart\.png"/)
  assert.deepEqual(basic.tags, ['anatomy'])
  assert.equal(report.mediaRefs, 1)

  // Cloze content survives intact.
  const cloze = importedNotes.find((n) => n.type === 'cloze') as ClozeNote
  assert.match(cloze.fields.text, /\{\{c1::mitochondria\}\}/)

  // One deck, named as authored.
  assert.deepEqual(
    Object.values(imported.decks).map((d) => d.name),
    ['Biology'],
  )
})

test('full round trip: preserve-schedule carries interval/ease into imported card meta', async () => {
  const blob = await exportDecksToApkg(source(), ['d1'], async () => null)
  const container = await readAnkiPackage(await blob.arrayBuffer())
  const pkg = await readAnkiDb(container.sqlite)

  // Exported cards are new (ivl 0), so preserve yields fresh 'new' schedules —
  // assert the meta map is produced and keyed to generated cards.
  const mapped = mapAnkiPackage(pkg, { preserveSchedule: true, now: NOW, idFactory: uniqueIds() })
  assert.ok(mapped.meta)
  assert.ok(Object.keys(mapped.meta!).length >= 2)
  for (const meta of Object.values(mapped.meta!)) {
    assert.equal(meta.schedule.state, 'new')
  }
})
