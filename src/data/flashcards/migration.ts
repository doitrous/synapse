/**
 * Carry the flat v1 flashcard store into the v2 note/card model, losslessly.
 *
 * v1 stored a deck as a bag of `{id, front, back}` cards with a schedule per
 * card id (see `useDecks.ts`). v2 separates the note a student wrote from the
 * cards it generates. Migration turns each v1 card into a Basic note — the one
 * note type whose one card is the card — and moves that card's *schedule* onto
 * the generated card's meta untouched. The prime directive is that not a single
 * interval is lost: a student who has been reviewing for months keeps every due
 * date, ease and lapse count exactly as it stood.
 *
 * Identity is derived, never minted: a card's new id is a pure function of its
 * deck and its old id, so running the migration twice is idempotent and a
 * half-migrated store can be finished without duplicating anything. `reps` is
 * the only history v1 kept, so `reviewCount` is seeded from it; the finer log
 * (first/last reviewed, per-answer events) simply starts empty, which the stats
 * treat as an honest "no history before now" rather than inventing one.
 */

import type { CardSchedule } from '../srs.ts'
import {
  cardId,
  newCardMeta,
  type BasicNote,
  type CardMeta,
  type DeckRecord,
  type FlashcardCollection,
} from './model.ts'
import { escapeHtml } from './richText.ts'

/** The v1 stored deck shape, mirrored here so migration doesn't import the hook. */
export interface StoredDeckV1 {
  id: string
  name: string
  sourceId?: string
  cards: { id: string; front: string; back: string }[]
  schedules: Record<string, CardSchedule>
  createdAt: string
}

export type StoredDecksV1 = Record<string, StoredDeckV1>

/** The note id a migrated v1 card lands on — stable across repeated migrations. */
export function migratedNoteId(deckId: string, v1CardId: string): string {
  return `${deckId}::n::${v1CardId}`
}

/**
 * True when a value read from storage is already a v2 collection. A v1 store is
 * a `Record<deckId, StoredDeckV1>` with no `version`; v2 is a tagged object.
 */
export function isV2Collection(value: unknown): value is FlashcardCollection {
  return typeof value === 'object' && value !== null && (value as { version?: unknown }).version === 2
}

/**
 * Migrate a v1 store to a v2 collection. Plain text fronts/backs are escaped
 * into safe rich text (they had no markup); a card with no stored schedule
 * becomes an unseen card, not a dropped one.
 */
export function migrateV1ToV2(v1: StoredDecksV1, now: Date): FlashcardCollection {
  const decks: Record<string, DeckRecord> = {}
  const notes: Record<string, BasicNote> = {}
  const meta: Record<string, CardMeta> = {}

  for (const deck of Object.values(v1)) {
    decks[deck.id] = {
      id: deck.id,
      name: deck.name,
      ...(deck.sourceId ? { sourceId: deck.sourceId } : {}),
      createdAt: deck.createdAt,
    }

    for (const card of deck.cards) {
      const noteId = migratedNoteId(deck.id, card.id)
      const note: BasicNote = {
        id: noteId,
        type: 'basic',
        deckId: deck.id,
        tags: [],
        createdAt: deck.createdAt,
        updatedAt: deck.createdAt,
        fields: { front: escapeHtml(card.front), back: escapeHtml(card.back) },
      }
      notes[noteId] = note

      const id = cardId(noteId, 'card')
      const schedule = deck.schedules[card.id]
      meta[id] = schedule ? metaFromV1Schedule(schedule) : newUnseen(now)
    }
  }

  return { version: 2, decks, notes, meta }
}

/**
 * Seed a card's meta from a v1 schedule. `reps` is v1's only record of how many
 * times the card was answered, so it seeds `reviewCount`; a card that has left
 * the `new` state has demonstrably been reviewed, so it is not marked unseen.
 */
function metaFromV1Schedule(schedule: CardSchedule): CardMeta {
  return {
    schedule,
    flag: null,
    suspended: false,
    buriedUntil: null,
    reviewCount: schedule.reps,
    resetSinceReview: false,
    firstReviewedAt: null,
    lastReviewedAt: null,
  }
}

function newUnseen(now: Date): CardMeta {
  return newCardMeta({ state: 'new', step: 0, interval: 0, ease: 2.5, lapses: 0, reps: 0, due: now.toISOString() })
}

/**
 * Read whatever is under the flashcard key and return a v2 collection: pass a
 * v2 value through, migrate a v1 value, and treat anything unrecognized as an
 * empty collection rather than throwing on a corrupt document.
 */
export function ensureV2(value: unknown, now: Date): FlashcardCollection {
  if (isV2Collection(value)) return value
  if (isV1Store(value)) return migrateV1ToV2(value, now)
  return { version: 2, decks: {}, notes: {}, meta: {} }
}

function isV1Store(value: unknown): value is StoredDecksV1 {
  if (typeof value !== 'object' || value === null) return false
  const entries = Object.values(value as Record<string, unknown>)
  if (entries.length === 0) return true // an empty v1 store is a valid, empty migration
  return entries.every((entry) => {
    const deck = entry as Partial<StoredDeckV1>
    return typeof deck?.id === 'string' && Array.isArray(deck?.cards) && typeof deck?.schedules === 'object'
  })
}
