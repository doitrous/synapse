/**
 * The bulk sibling of `quickAdd.ts`'s `appendBasicNote`: merges a whole batch of
 * decks, notes, and optional per-card meta (preserve-schedule imports) into an
 * existing `FlashcardCollection` in one shot.
 *
 * A pure core — no clock, no storage, no id generator — so the import UI (a
 * later task) can call it, then hand the result to the app's real persistence
 * layer the same way `appendBasicNote` does. The input collection is never
 * mutated: every map is spread fresh before incoming entries are written in.
 *
 * Deck and note ids are keyed as given; a colliding id is the caller's
 * contract to resolve (e.g. by minting fresh ids before calling in), and the
 * incoming record wins here as a last-write-wins merge.
 */

import type { CardMeta, DeckRecord, FlashcardCollection, Note } from '../../data/flashcards/model.ts'

export interface ImportInput {
  decks: DeckRecord[]
  notes: Note[]
  /** Card id -> meta (preserve-schedule import). */
  meta?: Record<string, CardMeta>
}

/**
 * Merge a batch import into `collection`, returning a new collection. Decks
 * and notes are added keyed by id; `meta`, when present, is merged in by card
 * id alongside any existing schedule data.
 */
export function mergeImport(collection: FlashcardCollection, input: ImportInput): FlashcardCollection {
  const decks = { ...collection.decks }
  for (const deck of input.decks) {
    decks[deck.id] = deck
  }

  const notes = { ...collection.notes }
  for (const note of input.notes) {
    notes[note.id] = note
  }

  const meta = { ...collection.meta }
  if (input.meta) {
    for (const [cardId, cardMeta] of Object.entries(input.meta)) {
      meta[cardId] = cardMeta
    }
  }

  return { version: 2, decks, notes, meta }
}
