/**
 * Maps a parsed Anki collection (`AnkiPackage`) onto this app's flashcard model
 * (`Note`/`DeckRecord`/`CardMeta`). Pure: no I/O, no media upload, no clock of
 * its own — the caller passes `now` and an `idFactory`.
 *
 * What it does and does not do:
 *  - A cloze note type (kind 1) becomes a `ClozeNote`; Anki's `{{c1::…}}` markup
 *    is already this app's native cloze syntax, so the text carries over 1:1.
 *  - Any other note type becomes a best-effort `BasicNote` (front = first field,
 *    back = the rest joined) and, when it isn't a plain two-field type, records
 *    an approximation in the report. Image Occlusion is imported as a plain
 *    image card (its image field survives as `<img>`; the occluder regions do
 *    not) and is likewise reported.
 *  - Field HTML is left RAW here — Anki media tokens (`<img src="x">`,
 *    `[sound:x]`) stay in place and are collected into `mediaRefsNeeded`. The
 *    media stage rewrites those to `synapse-doc:` references and only THEN
 *    sanitizes, because sanitizing first would strip an `<img src="x">` before
 *    the file behind it could be uploaded. See the media task.
 *  - Tags are always preserved.
 *  - `preserveSchedule` maps each mapped card's Anki interval/ease/reps/lapses
 *    into `CardMeta`, re-anchoring the due date to import time + interval (Anki
 *    stores due as a collection-relative day number, which needs the collection
 *    epoch to resolve; re-anchoring keeps the card's maturity without flooding
 *    the student with cards marked overdue against a foreign timeline).
 */

import type {
  BasicNote,
  CardMeta,
  ClozeNote,
  DeckRecord,
  Note,
} from '../../data/flashcards/model.ts'
import { cardId, newCardMeta } from '../../data/flashcards/model.ts'
import { newCard, type CardSchedule } from '../../data/srs.ts'
import type { AnkiCard, AnkiModel, AnkiPackage } from './ankiDb.ts'

export interface ImportReport {
  decks: number
  notes: number
  cards: number
  mediaRefs: number
  approximations: string[]
}

export interface MappedImport {
  decks: DeckRecord[]
  notes: Note[]
  /** Present only when `preserveSchedule` — card id -> preserved standing. */
  meta?: Record<string, CardMeta>
  /** Anki media filenames referenced by the kept notes (deduped). */
  mediaRefsNeeded: string[]
  report: ImportReport
}

export interface MapOptions {
  preserveSchedule: boolean
  now: Date
  idFactory: () => string
}

const DAY_MS = 86_400_000

// ---------------------------------------------------------------------------
// media token extraction
// ---------------------------------------------------------------------------

const IMG_SRC_RE = /<img\b[^>]*?\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)')/gi
const SOUND_RE = /\[sound:([^\]]+)\]/gi

function collectMediaRefs(html: string, into: Set<string>): void {
  for (const m of html.matchAll(IMG_SRC_RE)) {
    const name = m[1] ?? m[2]
    if (name) into.add(name)
  }
  for (const m of html.matchAll(SOUND_RE)) {
    if (m[1]) into.add(m[1].trim())
  }
}

// ---------------------------------------------------------------------------
// scheduling
// ---------------------------------------------------------------------------

/** Anki card types: 0 new, 1 learning, 2 review, 3 relearning. */
function scheduleFromAnkiCard(card: AnkiCard, now: Date): CardSchedule {
  if (card.type === 0) return newCard(now)

  const interval = Math.max(1, Math.round(card.ivl))
  const ease = card.factor > 0 ? card.factor / 1000 : 2.5
  return {
    state: 'review',
    step: 0,
    interval,
    ease,
    lapses: Math.max(0, card.lapses),
    reps: Math.max(0, card.reps),
    due: new Date(now.getTime() + interval * DAY_MS).toISOString(),
  }
}

function metaFromAnkiCard(card: AnkiCard, now: Date): CardMeta {
  const meta = newCardMeta(scheduleFromAnkiCard(card, now))
  meta.reviewCount = Math.max(0, card.reps)
  return meta
}

/** Our template key for an Anki card: cloze card ord o -> `c{o+1}`; else `card`. */
function templateKeyFor(model: AnkiModel | undefined, card: AnkiCard): string {
  if (model?.type === 1) return `c${card.ord + 1}`
  return 'card'
}

// ---------------------------------------------------------------------------
// note mapping
// ---------------------------------------------------------------------------

function countClozeCards(text: string): number {
  const nums = new Set<number>()
  for (const m of text.matchAll(/\{\{c(\d+)::/gi)) nums.add(Number(m[1]))
  return Math.max(1, nums.size)
}

function isOcclusionModel(model: AnkiModel | undefined): boolean {
  return !!model && /occlusion/i.test(model.name)
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

export function mapAnkiPackage(pkg: AnkiPackage, opts: MapOptions): MappedImport {
  const { now, idFactory, preserveSchedule } = opts
  const nowIso = now.toISOString()

  // nid -> the note's cards (a note can generate several).
  const cardsByNote = new Map<number, AnkiCard[]>()
  for (const card of pkg.cards) {
    const list = cardsByNote.get(card.nid)
    if (list) list.push(card)
    else cardsByNote.set(card.nid, [card])
  }

  // Lazily mint one of our decks per Anki deck that actually receives a note.
  const deckIdByAnki = new Map<string, string>()
  const decks: DeckRecord[] = []
  const ensureDeck = (ankiDid: string): string => {
    const existing = deckIdByAnki.get(ankiDid)
    if (existing) return existing
    const id = `deck-${idFactory()}`
    deckIdByAnki.set(ankiDid, id)
    decks.push({ id, name: pkg.decks[ankiDid]?.name || 'Imported', createdAt: nowIso })
    return id
  }

  const notes: Note[] = []
  const meta: Record<string, CardMeta> = {}
  const mediaRefsNeeded = new Set<string>()
  const approximations: string[] = []
  const approxSeen = new Set<string>()
  const note_ = (msg: string) => {
    if (!approxSeen.has(msg)) {
      approxSeen.add(msg)
      approximations.push(msg)
    }
  }

  let cardCount = 0

  for (const ankiNote of pkg.notes) {
    const model = pkg.models[ankiNote.mid]
    const noteCards = cardsByNote.get(ankiNote.id) ?? []
    const ankiDid = noteCards[0]?.did ?? '1'
    const deckId = ensureDeck(ankiDid)
    const noteId = `note-${idFactory()}`
    const fields = ankiNote.fields

    for (const f of fields) collectMediaRefs(f, mediaRefsNeeded)

    let note: Note
    if (model?.type === 1) {
      const text = fields[0] ?? ''
      const extra = pickExtraField(model, fields)
      note = {
        id: noteId,
        type: 'cloze',
        deckId,
        tags: [...ankiNote.tags],
        createdAt: nowIso,
        updatedAt: nowIso,
        fields: { text, extra },
      } satisfies ClozeNote
      cardCount += countClozeCards(text)
    } else {
      const front = fields[0] ?? ''
      const back = fields.slice(1).filter((f) => f.trim().length > 0).join('<br>')
      note = {
        id: noteId,
        type: 'basic',
        deckId,
        tags: [...ankiNote.tags],
        createdAt: nowIso,
        updatedAt: nowIso,
        fields: { front, back },
      } satisfies BasicNote
      cardCount += 1

      if (isOcclusionModel(model)) {
        note_('Image Occlusion notes were imported as plain image cards (occluder regions are not preserved).')
      } else if (!model) {
        note_('Some notes had an unknown note type and were imported as basic front/back.')
      } else if (model.fields.length > 2) {
        note_(`Note type "${model.name}" has more than two fields; extra fields were merged into the back.`)
      }
    }

    notes.push(note)

    if (preserveSchedule) {
      for (const card of noteCards) {
        // Only cards our model actually generates get preserved standing.
        const key = templateKeyFor(model, card)
        meta[cardId(noteId, key)] = metaFromAnkiCard(card, now)
      }
    }
  }

  const report: ImportReport = {
    decks: decks.length,
    notes: notes.length,
    cards: cardCount,
    mediaRefs: mediaRefsNeeded.size,
    approximations,
  }

  const result: MappedImport = {
    decks,
    notes,
    mediaRefsNeeded: [...mediaRefsNeeded],
    report,
  }
  if (preserveSchedule) result.meta = meta
  return result
}

/** The cloze "extra" field: a field named Extra/Back Extra if present, else the second field. */
function pickExtraField(model: AnkiModel, fields: string[]): string {
  const idx = model.fields.findIndex((f) => /^(back extra|extra)$/i.test(f.name))
  if (idx >= 0) return fields[idx] ?? ''
  return fields[1] ?? ''
}
