import { test } from 'node:test'
import assert from 'node:assert/strict'
import { newDb } from './sqljs.ts'
import { readAnkiDb } from './ankiDb.ts'

const US = '\x1f' // Anki field separator

// --- tiny protobuf encoders (mirror the modern config blobs) ---------------

function encVarint(n: number): number[] {
  const out: number[] = []
  let v = n
  do {
    let b = v & 0x7f
    v = Math.floor(v / 128)
    if (v !== 0) b |= 0x80
    out.push(b)
  } while (v !== 0)
  return out
}
function pbVarint(field: number, value: number): number[] {
  return [(field << 3) | 0, ...encVarint(value)]
}
function pbString(field: number, s: string): number[] {
  const b = [...new TextEncoder().encode(s)]
  return [(field << 3) | 2, ...encVarint(b.length), ...b]
}
function blob(...arrs: number[][]): Uint8Array {
  return Uint8Array.from(arrs.flat())
}

// --- fixtures ---------------------------------------------------------------

const MODELS_JSON = JSON.stringify({
  '1': {
    id: 1,
    name: 'Basic',
    type: 0,
    flds: [
      { name: 'Front', ord: 0 },
      { name: 'Back', ord: 1 },
    ],
    tmpls: [{ name: 'Card 1', ord: 0, qfmt: '{{Front}}', afmt: '{{FrontSide}}{{Back}}' }],
  },
  '2': {
    id: 2,
    name: 'Cloze',
    type: 1,
    flds: [
      { name: 'Text', ord: 0 },
      { name: 'Back Extra', ord: 1 },
    ],
    tmpls: [{ name: 'Cloze', ord: 0, qfmt: '{{cloze:Text}}', afmt: '{{cloze:Text}}{{Back Extra}}' }],
  },
})

const DECKS_JSON = JSON.stringify({
  '1': { id: 1, name: 'Default' },
  '1620000000000': { id: 1620000000000, name: 'Spanish::Verbs' },
})

async function buildLegacyDbBytes(): Promise<Uint8Array> {
  const db = await newDb()
  db.run('CREATE TABLE col (id INTEGER, ver INTEGER, models TEXT, decks TEXT)')
  db.run('INSERT INTO col (id, ver, models, decks) VALUES (1, 11, ?, ?)', [MODELS_JSON, DECKS_JSON])
  db.run('CREATE TABLE notes (id INTEGER, mid TEXT, tags TEXT, flds TEXT)')
  db.run('INSERT INTO notes VALUES (?, ?, ?, ?)', [10, '1', ' tag1 tag2 ', `Front text${US}Back text`])
  db.run('INSERT INTO notes VALUES (?, ?, ?, ?)', [11, '2', '', `{{c1::hidden}}${US}extra`])
  db.run(
    'CREATE TABLE cards (id INTEGER, nid INTEGER, did TEXT, ord INTEGER, type INTEGER, queue INTEGER, due INTEGER, ivl INTEGER, factor INTEGER, reps INTEGER, lapses INTEGER)',
  )
  db.run('INSERT INTO cards VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [100, 10, '1', 0, 2, 2, 5, 12, 2500, 3, 1])
  const bytes = db.export()
  db.close()
  return bytes
}

async function buildModernDbBytes(): Promise<Uint8Array> {
  const db = await newDb()
  // Modern col has no models/decks columns.
  db.run('CREATE TABLE col (id INTEGER, ver INTEGER)')
  db.run('INSERT INTO col (id, ver) VALUES (1, 18)')

  db.run('CREATE TABLE notetypes (id INTEGER, name TEXT, config BLOB)')
  db.run('INSERT INTO notetypes VALUES (?, ?, ?)', [1, 'Basic', blob(pbVarint(1, 0))])
  db.run('INSERT INTO notetypes VALUES (?, ?, ?)', [2, 'Cloze', blob(pbVarint(1, 1))])

  db.run('CREATE TABLE fields (ntid INTEGER, ord INTEGER, name TEXT)')
  db.run('INSERT INTO fields VALUES (1, 0, ?)', ['Front'])
  db.run('INSERT INTO fields VALUES (1, 1, ?)', ['Back'])
  db.run('INSERT INTO fields VALUES (2, 0, ?)', ['Text'])
  db.run('INSERT INTO fields VALUES (2, 1, ?)', ['Back Extra'])

  db.run('CREATE TABLE templates (ntid INTEGER, ord INTEGER, name TEXT, config BLOB)')
  db.run('INSERT INTO templates VALUES (1, 0, ?, ?)', [
    'Card 1',
    blob(pbString(1, '{{Front}}'), pbString(2, '{{FrontSide}}{{Back}}')),
  ])
  db.run('INSERT INTO templates VALUES (2, 0, ?, ?)', [
    'Cloze',
    blob(pbString(1, '{{cloze:Text}}'), pbString(2, '{{cloze:Text}}{{Back Extra}}')),
  ])

  // Modern deck names use 0x1f as the hierarchy separator.
  db.run('CREATE TABLE decks (id INTEGER, name TEXT)')
  db.run('INSERT INTO decks VALUES (?, ?)', [1, 'Default'])
  db.run('INSERT INTO decks VALUES (?, ?)', [1620000000000, `Spanish${US}Verbs`])

  db.run('CREATE TABLE notes (id INTEGER, mid TEXT, tags TEXT, flds TEXT)')
  db.run('INSERT INTO notes VALUES (?, ?, ?, ?)', [10, '1', ' tag1 tag2 ', `Front text${US}Back text`])
  db.run('INSERT INTO notes VALUES (?, ?, ?, ?)', [11, '2', '', `{{c1::hidden}}${US}extra`])

  db.run(
    'CREATE TABLE cards (id INTEGER, nid INTEGER, did TEXT, ord INTEGER, type INTEGER, queue INTEGER, due INTEGER, ivl INTEGER, factor INTEGER, reps INTEGER, lapses INTEGER)',
  )
  db.run('INSERT INTO cards VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [100, 10, '1', 0, 2, 2, 5, 12, 2500, 3, 1])

  const bytes = db.export()
  db.close()
  return bytes
}

// --- shared assertions ------------------------------------------------------

function assertPackage(pkg: Awaited<ReturnType<typeof readAnkiDb>>): void {
  // models
  assert.equal(pkg.models['1'].type, 0)
  assert.equal(pkg.models['1'].name, 'Basic')
  assert.deepEqual(
    pkg.models['1'].fields.map((f) => f.name),
    ['Front', 'Back'],
  )
  assert.equal(pkg.models['1'].templates[0].qfmt, '{{Front}}')
  assert.equal(pkg.models['1'].templates[0].afmt, '{{FrontSide}}{{Back}}')
  assert.equal(pkg.models['2'].type, 1)
  assert.deepEqual(
    pkg.models['2'].fields.map((f) => f.name),
    ['Text', 'Back Extra'],
  )

  // decks (hierarchy normalized to ::)
  assert.equal(pkg.decks['1'].name, 'Default')
  assert.equal(pkg.decks['1620000000000'].name, 'Spanish::Verbs')

  // notes: flds split on 0x1f, tags trimmed/split
  assert.equal(pkg.notes.length, 2)
  const basicNote = pkg.notes.find((n) => n.id === 10)!
  assert.equal(basicNote.mid, '1')
  assert.deepEqual(basicNote.fields, ['Front text', 'Back text'])
  assert.deepEqual(basicNote.tags, ['tag1', 'tag2'])
  const clozeNote = pkg.notes.find((n) => n.id === 11)!
  assert.equal(clozeNote.mid, '2')
  assert.deepEqual(clozeNote.tags, [])

  // cards
  assert.equal(pkg.cards.length, 1)
  assert.equal(pkg.cards[0].nid, 10)
  assert.equal(pkg.cards[0].ivl, 12)
  assert.equal(pkg.cards[0].factor, 2500)
  assert.equal(pkg.cards[0].reps, 3)
}

// --- tests ------------------------------------------------------------------

test('readAnkiDb: legacy schema (col.models/col.decks JSON)', async () => {
  const pkg = await readAnkiDb(await buildLegacyDbBytes())
  assertPackage(pkg)
})

test('readAnkiDb: modern schema (notetypes/fields/templates/decks tables, protobuf configs)', async () => {
  const pkg = await readAnkiDb(await buildModernDbBytes())
  assertPackage(pkg)
})
