/**
 * Builds a legacy `.apkg` (a `collection.anki2` plain-SQLite database zipped with
 * its media) from selected decks of a student's `FlashcardCollection`.
 *
 * Legacy on purpose: a modern `.colpkg`/`.anki21b` would need a zstd *encoder*
 * (we only ship the decoder) and a protobuf media manifest, for no real gain —
 * current Anki imports a legacy `.apkg` without complaint. Two note types are
 * emitted, Basic and Cloze, matching this app's own note kinds; everything a
 * student authored maps onto one of them.
 *
 * Media travels in reverse of import: a field's `nishany-doc:`/`nishany-media:`
 * reference is resolved back to its original filename + bytes via the injected
 * `fetchMedia`, the reference in the HTML is rewritten to that bare filename
 * (and a note's audio becomes a trailing `[sound:name]`, Anki's own convention),
 * and the files are written into the zip under numeric names with a `media` map.
 *
 * Ids are derived from a counter, not the clock, so the same collection always
 * exports byte-for-byte the same package — which is what makes an export→import
 * round trip testable.
 */

import { zipSync, strToU8 } from 'fflate'
import type { FlashcardCollection, Note } from '../../data/flashcards/model.ts'
import { newDb } from './sqljs.ts'

export interface FetchedMedia {
  name: string
  bytes: Uint8Array
}

export type FetchMedia = (reference: string) => Promise<FetchedMedia | null>

const BASIC_MID = 1
const CLOZE_MID = 2
const DEFAULT_DECK_ID = 1

// Model definitions kept deliberately close to Anki's stock Basic/Cloze so a
// reimport recognizes them. Only the keys Anki needs to render and schedule are
// included.
function modelsJson(): string {
  const field = (name: string, ord: number) => ({
    name,
    ord,
    sticky: false,
    rtl: false,
    font: 'Arial',
    size: 20,
    media: [],
  })
  const css =
    '.card {\n font-family: arial;\n font-size: 20px;\n text-align: center;\n color: black;\n background-color: white;\n}\n'
  return JSON.stringify({
    [BASIC_MID]: {
      id: BASIC_MID,
      name: 'Basic',
      type: 0,
      mod: 0,
      usn: 0,
      sortf: 0,
      did: DEFAULT_DECK_ID,
      tmpls: [
        {
          name: 'Card 1',
          ord: 0,
          qfmt: '{{Front}}',
          afmt: '{{FrontSide}}\n\n<hr id=answer>\n\n{{Back}}',
          bqfmt: '',
          bafmt: '',
          did: null,
        },
      ],
      flds: [field('Front', 0), field('Back', 1)],
      css,
      latexPre: '',
      latexPost: '',
      req: [[0, 'any', [0]]],
      vers: [],
      tags: [],
    },
    [CLOZE_MID]: {
      id: CLOZE_MID,
      name: 'Cloze',
      type: 1,
      mod: 0,
      usn: 0,
      sortf: 0,
      did: DEFAULT_DECK_ID,
      tmpls: [
        {
          name: 'Cloze',
          ord: 0,
          qfmt: '{{cloze:Text}}',
          afmt: '{{cloze:Text}}<br>\n{{Extra}}',
          bqfmt: '',
          bafmt: '',
          did: null,
        },
      ],
      flds: [field('Text', 0), field('Extra', 1)],
      css,
      latexPre: '',
      latexPost: '',
      req: [[0, 'any', [0]]],
      vers: [],
      tags: [],
    },
  })
}

function deckJsonEntry(id: number, name: string): Record<string, unknown> {
  return {
    id,
    name,
    mod: 0,
    usn: 0,
    lrnToday: [0, 0],
    revToday: [0, 0],
    newToday: [0, 0],
    timeToday: [0, 0],
    conf: 1,
    desc: '',
    dyn: 0,
    collapsed: false,
    extendNew: 0,
    extendRev: 0,
  }
}

function confJson(): string {
  return JSON.stringify({
    nextPos: 1,
    estTimes: true,
    activeDecks: [1],
    sortType: 'noteFld',
    timeLim: 0,
    sortBackwards: false,
    addToCur: true,
    curDeck: 1,
    newBury: true,
    newSpread: 0,
    dueCounts: true,
    curModel: String(BASIC_MID),
    collapseTime: 1200,
  })
}

function dconfJson(): string {
  return JSON.stringify({
    1: {
      id: 1,
      name: 'Default',
      mod: 0,
      usn: 0,
      maxTaken: 60,
      autoplay: true,
      timer: 0,
      replayq: true,
      new: { bury: false, delays: [1, 10], initialFactor: 2500, ints: [1, 4, 0], order: 1, perDay: 20 },
      rev: { bury: false, ease4: 1.3, ivlFct: 1, maxIvl: 36500, perDay: 200, hardFactor: 1.2 },
      lapse: { delays: [10], leechAction: 1, leechFails: 8, minInt: 1, mult: 0 },
      dyn: false,
    },
  })
}

const FIELD_SEPARATOR = '\x1f'
const IMG_SRC_RE = /(<img\b[^>]*?\bsrc\s*=\s*)("([^"]*)"|'([^']*)')/gi

function isMediaReference(value: string): boolean {
  // Current (`nishany-`) and pre-rebrand (`synapse-`) prefixes both count: a deck
  // saved before the rebrand still carries the old references until re-saved.
  return value.startsWith('nishany-doc:') || value.startsWith('nishany-media:')
    || value.startsWith('synapse-doc:') || value.startsWith('synapse-media:')
    || /^\/media\/[^/?#]+$/.test(value)
}

interface NoteRowInput {
  mid: number
  field0: string
  field1: string
  tags: string[]
  clozeCount: number
}

/** Turns one of our notes into Anki field values, resolving media as a side effect. */
async function toAnkiFields(
  note: Note,
  fetchMedia: FetchMedia,
  mediaByName: Map<string, Uint8Array>,
): Promise<NoteRowInput> {
  const resolveInImg = async (html: string): Promise<string> => {
    const refs = new Set<string>()
    for (const m of html.matchAll(IMG_SRC_RE)) {
      const name = m[3] ?? m[4]
      if (name && isMediaReference(name)) refs.add(name)
    }
    let out = html
    for (const ref of refs) {
      const media = await fetchMedia(ref)
      if (!media) continue
      mediaByName.set(media.name, media.bytes)
      out = out.split(`"${ref}"`).join(`"${media.name}"`).split(`'${ref}'`).join(`'${media.name}'`)
    }
    return out
  }

  const audioSuffix = async (ref: string | undefined): Promise<string> => {
    if (!ref) return ''
    const media = await fetchMedia(ref)
    if (!media) return ''
    mediaByName.set(media.name, media.bytes)
    return `[sound:${media.name}]`
  }

  if (note.type === 'cloze') {
    const text = await resolveInImg(note.fields.text)
    const extra = (await resolveInImg(note.fields.extra)) + (await audioSuffix(note.fields.audio))
    return { mid: CLOZE_MID, field0: text, field1: extra, tags: note.tags, clozeCount: countCloze(text) }
  }
  if (note.type === 'basic') {
    const front = await resolveInImg(note.fields.front)
    const back = (await resolveInImg(note.fields.back)) + (await audioSuffix(note.fields.audio))
    return { mid: BASIC_MID, field0: front, field1: back, tags: note.tags, clozeCount: 0 }
  }
  // Image Occlusion (or any other): export the image + back as a Basic card.
  const front = await resolveInImg(note.image ? `<img src="${note.image}">` : '')
  const back = await resolveInImg(note.fields.back)
  return { mid: BASIC_MID, field0: front, field1: back, tags: note.tags, clozeCount: 0 }
}

function countCloze(text: string): number {
  const nums = new Set<number>()
  for (const m of text.matchAll(/\{\{c(\d+)::/gi)) nums.add(Number(m[1]))
  return Math.max(1, nums.size)
}

export async function exportDecksToApkg(
  collection: FlashcardCollection,
  deckIds: string[],
  fetchMedia: FetchMedia,
): Promise<Blob> {
  const wanted = new Set(deckIds)
  const mediaByName = new Map<string, Uint8Array>()

  // Assign each exported deck a stable Anki did (Default stays 1).
  const ankiDidByDeck = new Map<string, number>()
  let nextDid = 1000
  const decksJson: Record<string, unknown> = { [DEFAULT_DECK_ID]: deckJsonEntry(DEFAULT_DECK_ID, 'Default') }
  for (const deckId of deckIds) {
    const deck = collection.decks[deckId]
    if (!deck) continue
    const did = nextDid++
    ankiDidByDeck.set(deckId, did)
    decksJson[String(did)] = deckJsonEntry(did, deck.name)
  }

  const db = await newDb()
  db.run(SCHEMA_SQL)
  db.run(
    'INSERT INTO col (id, crt, mod, scm, ver, dty, usn, ls, conf, models, decks, dconf, tags) VALUES (1, 0, 0, 0, 11, 0, 0, 0, ?, ?, ?, ?, ?)',
    [confJson(), modelsJson(), JSON.stringify(decksJson), dconfJson(), '{}'],
  )

  let nextId = 1
  let position = 0
  for (const note of Object.values(collection.notes)) {
    if (!wanted.has(note.deckId)) continue
    const row = await toAnkiFields(note, fetchMedia, mediaByName)
    const noteId = nextId++
    const flds = `${row.field0}${FIELD_SEPARATOR}${row.field1}`
    db.run('INSERT INTO notes (id, guid, mid, mod, usn, tags, flds, sfld, csum, flags, data) VALUES (?, ?, ?, 0, -1, ?, ?, ?, 0, 0, ?)', [
      noteId,
      note.id,
      row.mid,
      row.tags.length ? ` ${row.tags.join(' ')} ` : '',
      flds,
      stripHtml(row.field0),
      '',
    ])

    const did = ankiDidByDeck.get(note.deckId) ?? DEFAULT_DECK_ID
    const cardCount = row.mid === CLOZE_MID ? row.clozeCount : 1
    for (let ord = 0; ord < cardCount; ord++) {
      db.run(
        'INSERT INTO cards (id, nid, did, ord, mod, usn, type, queue, due, ivl, factor, reps, lapses, left, odue, odid, flags, data) VALUES (?, ?, ?, ?, 0, -1, 0, 0, ?, 0, 0, 0, 0, 0, 0, 0, 0, ?)',
        [nextId++, noteId, did, ord, position++, ''],
      )
    }
  }

  const sqlite = db.export()
  db.close()

  const files: Record<string, Uint8Array> = { 'collection.anki2': sqlite }
  const mediaMap: Record<string, string> = {}
  let index = 0
  for (const [name, bytes] of mediaByName) {
    mediaMap[String(index)] = name
    files[String(index)] = bytes
    index++
  }
  files['media'] = strToU8(JSON.stringify(mediaMap))

  const zipped = zipSync(files)
  // Copy into a fresh ArrayBuffer-backed view so the DOM Blob types accept it
  // (fflate returns Uint8Array<ArrayBufferLike>, which BlobPart rejects).
  const part = new Uint8Array(zipped.byteLength)
  part.set(zipped)
  return new Blob([part], { type: 'application/octet-stream' })
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim()
}

const SCHEMA_SQL = `
CREATE TABLE col (id integer PRIMARY KEY, crt integer NOT NULL, mod integer NOT NULL, scm integer NOT NULL, ver integer NOT NULL, dty integer NOT NULL, usn integer NOT NULL, ls integer NOT NULL, conf text NOT NULL, models text NOT NULL, decks text NOT NULL, dconf text NOT NULL, tags text NOT NULL);
CREATE TABLE notes (id integer PRIMARY KEY, guid text NOT NULL, mid integer NOT NULL, mod integer NOT NULL, usn integer NOT NULL, tags text NOT NULL, flds text NOT NULL, sfld integer NOT NULL, csum integer NOT NULL, flags integer NOT NULL, data text NOT NULL);
CREATE TABLE cards (id integer PRIMARY KEY, nid integer NOT NULL, did integer NOT NULL, ord integer NOT NULL, mod integer NOT NULL, usn integer NOT NULL, type integer NOT NULL, queue integer NOT NULL, due integer NOT NULL, ivl integer NOT NULL, factor integer NOT NULL, reps integer NOT NULL, lapses integer NOT NULL, left integer NOT NULL, odue integer NOT NULL, odid integer NOT NULL, flags integer NOT NULL, data text NOT NULL);
CREATE TABLE graves (usn integer NOT NULL, oid integer NOT NULL, type integer NOT NULL);
CREATE TABLE revlog (id integer PRIMARY KEY, cid integer NOT NULL, usn integer NOT NULL, ease integer NOT NULL, ivl integer NOT NULL, lastIvl integer NOT NULL, factor integer NOT NULL, time integer NOT NULL, type integer NOT NULL);
`
