/**
 * Reads an Anki collection SQLite database (the bytes `container.ts` hands back)
 * into a plain, typed shape the mapper can consume without touching sql.js.
 *
 * Anki has two on-disk generations of the schema, and a real `.apkg`/`.colpkg`
 * can be either:
 *
 *  - LEGACY (schema <= 11): the note types and decks live as JSON blobs in the
 *    `col` table's `models` and `decks` TEXT columns. Each model carries its
 *    field list (`flds`) and card templates (`tmpls`, with `qfmt`/`afmt`).
 *
 *  - MODERN (schema >= 18, Anki 2.1.50+): the `col.models`/`col.decks` columns
 *    are gone; note types live in `notetypes` (+ `fields`, `templates`) and
 *    decks in `decks`, with per-row configuration stored as PROTOBUF blobs.
 *    We decode only what the importer needs: a note type's `kind`
 *    (normal vs cloze — `Notetype.Config.kind`, field 1) and each template's
 *    `q_format`/`a_format` (`Template.Config`, fields 1 and 2). Field and
 *    template names come from their own columns.
 *
 * Notes store their field values in one `flds` column joined by the 0x1f (unit
 * separator) control character; tags are a single space-separated string.
 */

import { openDb } from './sqljs.ts'
import type { Database } from 'sql.js'

export interface AnkiField {
  name: string
  ord: number
}

export interface AnkiTemplate {
  name: string
  ord: number
  qfmt: string
  afmt: string
}

export interface AnkiModel {
  id: string
  name: string
  /** 0 = standard (Basic-like), 1 = cloze. Matches Anki's notetype kind. */
  type: 0 | 1
  fields: AnkiField[]
  templates: AnkiTemplate[]
}

export interface AnkiDeck {
  id: string
  name: string
}

export interface AnkiNote {
  id: number
  /** Note type id (references `models`). Kept as a string key. */
  mid: string
  tags: string[]
  /** Field values in model field order (split from `flds` on 0x1f). */
  fields: string[]
}

export interface AnkiCard {
  id: number
  nid: number
  did: string
  ord: number
  type: number
  queue: number
  due: number
  ivl: number
  factor: number
  reps: number
  lapses: number
}

export interface AnkiPackage {
  models: Record<string, AnkiModel>
  decks: Record<string, AnkiDeck>
  notes: AnkiNote[]
  cards: AnkiCard[]
}

const FIELD_SEPARATOR = '\x1f'

// ---------------------------------------------------------------------------
// tiny protobuf reader (modern config blobs only)
// ---------------------------------------------------------------------------

interface ProtoField {
  fieldNumber: number
  wireType: number
  varint?: number
  bytes?: Uint8Array
}

function readProtoVarint(bytes: Uint8Array, offset: number): { value: number; offset: number } {
  let result = 0
  let shift = 0
  let pos = offset
  for (;;) {
    if (pos >= bytes.length) throw new Error('readProtoVarint: unexpected end of buffer')
    const byte = bytes[pos]
    pos++
    result += (byte & 0x7f) * 2 ** shift
    if ((byte & 0x80) === 0) break
    shift += 7
    if (shift > 63) throw new Error('readProtoVarint: varint too long')
  }
  return { value: result, offset: pos }
}

/** Parses a flat protobuf message into its top-level fields (no recursion). */
function parseProto(bytes: Uint8Array): ProtoField[] {
  const fields: ProtoField[] = []
  let offset = 0
  while (offset < bytes.length) {
    const tag = readProtoVarint(bytes, offset)
    offset = tag.offset
    const fieldNumber = Math.floor(tag.value / 8)
    const wireType = tag.value % 8
    if (wireType === 0) {
      const v = readProtoVarint(bytes, offset)
      offset = v.offset
      fields.push({ fieldNumber, wireType, varint: v.value })
    } else if (wireType === 2) {
      const len = readProtoVarint(bytes, offset)
      offset = len.offset
      const end = offset + len.value
      if (end > bytes.length) throw new Error('parseProto: length-delimited field overruns buffer')
      fields.push({ fieldNumber, wireType, bytes: bytes.subarray(offset, end) })
      offset = end
    } else if (wireType === 1) {
      offset += 8
    } else if (wireType === 5) {
      offset += 4
    } else {
      throw new Error(`parseProto: unsupported wire type ${wireType}`)
    }
  }
  return fields
}

function protoVarint(bytes: Uint8Array, fieldNumber: number): number | undefined {
  return parseProto(bytes).find((f) => f.fieldNumber === fieldNumber && f.wireType === 0)?.varint
}

function protoString(bytes: Uint8Array, fieldNumber: number): string {
  const field = parseProto(bytes).find((f) => f.fieldNumber === fieldNumber && f.wireType === 2)
  return field?.bytes ? new TextDecoder().decode(field.bytes) : ''
}

// ---------------------------------------------------------------------------
// sql helpers
// ---------------------------------------------------------------------------

/** Runs a query and returns rows as objects keyed by column name; [] if empty. */
function queryRows(db: Database, sql: string): Record<string, unknown>[] {
  const result = db.exec(sql)
  if (result.length === 0) return []
  const { columns, values } = result[0]
  return values.map((row) => {
    const obj: Record<string, unknown> = {}
    columns.forEach((col, i) => {
      obj[col] = row[i]
    })
    return obj
  })
}

function tableExists(db: Database, name: string): boolean {
  const rows = queryRows(db, `SELECT name FROM sqlite_master WHERE type='table' AND name='${name}'`)
  return rows.length > 0
}

function columnExists(db: Database, table: string, column: string): boolean {
  const rows = queryRows(db, `PRAGMA table_info(${table})`)
  return rows.some((r) => r.name === column)
}

function asString(value: unknown): string {
  return value === null || value === undefined ? '' : String(value)
}

function asNumber(value: unknown): number {
  return typeof value === 'number' ? value : Number(value ?? 0)
}

function asBytes(value: unknown): Uint8Array {
  if (value instanceof Uint8Array) return value
  return new Uint8Array()
}

// ---------------------------------------------------------------------------
// note types + decks — legacy JSON vs modern tables
// ---------------------------------------------------------------------------

interface LegacyModelJson {
  id: number | string
  name: string
  type?: number
  flds?: { name: string; ord: number }[]
  tmpls?: { name: string; ord: number; qfmt: string; afmt: string }[]
}

interface LegacyDeckJson {
  id: number | string
  name: string
}

function modelsFromJson(json: string): Record<string, AnkiModel> {
  const parsed = JSON.parse(json) as Record<string, LegacyModelJson>
  const models: Record<string, AnkiModel> = {}
  for (const [mid, model] of Object.entries(parsed)) {
    models[mid] = {
      id: String(model.id ?? mid),
      name: model.name ?? '',
      type: model.type === 1 ? 1 : 0,
      fields: (model.flds ?? []).map((f) => ({ name: f.name, ord: f.ord })),
      templates: (model.tmpls ?? []).map((t) => ({ name: t.name, ord: t.ord, qfmt: t.qfmt, afmt: t.afmt })),
    }
  }
  return models
}

function decksFromJson(json: string): Record<string, AnkiDeck> {
  const parsed = JSON.parse(json) as Record<string, LegacyDeckJson>
  const decks: Record<string, AnkiDeck> = {}
  for (const [did, deck] of Object.entries(parsed)) {
    decks[did] = { id: String(deck.id ?? did), name: deck.name ?? '' }
  }
  return decks
}

function modelsFromTables(db: Database): Record<string, AnkiModel> {
  const models: Record<string, AnkiModel> = {}

  for (const row of queryRows(db, 'SELECT id, name, config FROM notetypes')) {
    const mid = asString(row.id)
    const kind = protoVarint(asBytes(row.config), 1) ?? 0
    models[mid] = {
      id: mid,
      name: asString(row.name),
      type: kind === 1 ? 1 : 0,
      fields: [],
      templates: [],
    }
  }

  for (const row of queryRows(db, 'SELECT ntid, ord, name FROM fields ORDER BY ntid, ord')) {
    const model = models[asString(row.ntid)]
    if (model) model.fields.push({ name: asString(row.name), ord: asNumber(row.ord) })
  }

  for (const row of queryRows(db, 'SELECT ntid, ord, name, config FROM templates ORDER BY ntid, ord')) {
    const model = models[asString(row.ntid)]
    if (!model) continue
    const config = asBytes(row.config)
    model.templates.push({
      name: asString(row.name),
      ord: asNumber(row.ord),
      qfmt: protoString(config, 1),
      afmt: protoString(config, 2),
    })
  }

  return models
}

function decksFromTable(db: Database): Record<string, AnkiDeck> {
  const decks: Record<string, AnkiDeck> = {}
  for (const row of queryRows(db, 'SELECT id, name FROM decks')) {
    const did = asString(row.id)
    // Modern deck names use "\x1f" as the hierarchy separator internally; the
    // mapper flattens hierarchy anyway, so normalize it to Anki's "::" here.
    decks[did] = { id: did, name: asString(row.name).replace(/\x1f/g, '::') }
  }
  return decks
}

function readModelsAndDecks(db: Database): {
  models: Record<string, AnkiModel>
  decks: Record<string, AnkiDeck>
} {
  const hasColModels = columnExists(db, 'col', 'models')
  if (hasColModels) {
    const colRows = queryRows(db, 'SELECT models, decks FROM col LIMIT 1')
    const modelsJson = asString(colRows[0]?.models)
    const decksJson = asString(colRows[0]?.decks)
    // A modern collection may keep empty legacy columns; only trust non-empty JSON.
    if (modelsJson && modelsJson !== '{}') {
      return {
        models: modelsFromJson(modelsJson),
        decks: decksJson && decksJson !== '{}' ? decksFromJson(decksJson) : decksFromTableIfPresent(db),
      }
    }
  }
  return {
    models: tableExists(db, 'notetypes') ? modelsFromTables(db) : {},
    decks: decksFromTableIfPresent(db),
  }
}

function decksFromTableIfPresent(db: Database): Record<string, AnkiDeck> {
  return tableExists(db, 'decks') ? decksFromTable(db) : {}
}

// ---------------------------------------------------------------------------
// notes + cards
// ---------------------------------------------------------------------------

function readNotes(db: Database): AnkiNote[] {
  return queryRows(db, 'SELECT id, mid, tags, flds FROM notes').map((row) => ({
    id: asNumber(row.id),
    mid: asString(row.mid),
    tags: asString(row.tags)
      .split(' ')
      .map((t) => t.trim())
      .filter((t) => t.length > 0),
    fields: asString(row.flds).split(FIELD_SEPARATOR),
  }))
}

function readCards(db: Database): AnkiCard[] {
  return queryRows(
    db,
    'SELECT id, nid, did, ord, type, queue, due, ivl, factor, reps, lapses FROM cards',
  ).map((row) => ({
    id: asNumber(row.id),
    nid: asNumber(row.nid),
    did: asString(row.did),
    ord: asNumber(row.ord),
    type: asNumber(row.type),
    queue: asNumber(row.queue),
    due: asNumber(row.due),
    ivl: asNumber(row.ivl),
    factor: asNumber(row.factor),
    reps: asNumber(row.reps),
    lapses: asNumber(row.lapses),
  }))
}

// ---------------------------------------------------------------------------
// public API
// ---------------------------------------------------------------------------

export async function readAnkiDb(sqlite: Uint8Array): Promise<AnkiPackage> {
  const db = await openDb(sqlite)
  try {
    const { models, decks } = readModelsAndDecks(db)
    return { models, decks, notes: readNotes(db), cards: readCards(db) }
  } finally {
    db.close()
  }
}
