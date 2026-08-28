/**
 * A shared "quick add flashcard" write path — the thing any screen (question
 * bank, library, practical) reaches for when it wants to append a single Basic
 * card to the student's collection without standing up the full per-page
 * `useFlashcards` hook.
 *
 * A pure core that takes a collection and returns a new one, with no clock, no
 * storage and no id generator of its own, so it is trivial to test. It never
 * sanitizes — callers hand it already-safe rich-text HTML (see
 * `basicNoteFieldsFromText` below for the plain-text case). The actual read and
 * write go through the app's real persistence layer: the quick-add dialog holds
 * the collection with `usePersistentState(FLASHCARDS_COLLECTION_KEY, …)`, which
 * works in both demo (localStorage) and live (backend) mode and keeps a mounted
 * `useFlashcards` in sync — a plain `localStorage` write would be dropped in
 * live mode and desync a mounted reader in demo mode.
 */

import type { FlashcardCollection } from '../../data/flashcards/model.ts'
import { escapeHtml } from '../../data/flashcards/richText.ts'

/** The storage keys the flashcards collection lives under — must match `useFlashcards`. */
export const FLASHCARDS_COLLECTION_KEY = 'synapse.flashcards.collection.v2'
export const FLASHCARDS_LEGACY_DECKS_KEY = 'synapse.flashcards.decks.v1'

export interface QuickAddInput {
  front: string
  back?: string
  deckId?: string
  deckName?: string
}

export interface AppendOpts {
  now: Date
  noteId: string
  newDeckId: string
}

export interface QuickAddResult {
  collection: FlashcardCollection
  deckId: string
  noteId: string
}

/**
 * Append a Basic note to `collection`, resolving its deck and returning a new
 * collection — the input is never mutated. If `input.deckId` names a deck that
 * already exists it is used as-is; otherwise a fresh deck is minted (named
 * `input.deckName`, trimmed, or 'Quick capture' when that's blank/absent), so
 * a stale or typo'd deck id never silently attaches a note to the wrong deck.
 *
 * `meta` is left untouched: derived cards get fresh meta lazily on read in
 * `useFlashcards`, and writing it here would duplicate that policy.
 */
export function appendBasicNote(
  collection: FlashcardCollection,
  input: QuickAddInput,
  opts: AppendOpts,
): QuickAddResult {
  const existingDeck = input.deckId !== undefined ? collection.decks[input.deckId] : undefined

  const decks = { ...collection.decks }
  let deckId: string
  if (existingDeck) {
    deckId = existingDeck.id
  } else {
    deckId = opts.newDeckId
    decks[deckId] = {
      id: deckId,
      name: input.deckName?.trim() || 'Quick capture',
      createdAt: opts.now.toISOString(),
    }
  }

  const noteId = opts.noteId
  const notes = {
    ...collection.notes,
    [noteId]: {
      id: noteId,
      type: 'basic' as const,
      deckId,
      tags: [],
      createdAt: opts.now.toISOString(),
      updatedAt: opts.now.toISOString(),
      fields: { front: input.front, back: input.back ?? '' },
    },
  }

  const next: FlashcardCollection = { ...collection, decks, notes }
  return { collection: next, deckId, noteId }
}

/**
 * Turn a raw text selection into safe rich-text fields. Plain text has no
 * markup to preserve, so it is escaped rather than run through
 * `sanitizeRich` — escaping is lossless for plain text and cheaper.
 */
export function basicNoteFieldsFromText(front: string, back?: string): { front: string; back: string } {
  return {
    front: escapeHtml(front.trim()),
    back: back ? escapeHtml(back.trim()) : '',
  }
}

/** Fresh, collision-resistant ids for a quick-added note and any new deck. */
export function quickAddIds(): { noteId: string; newDeckId: string } {
  return {
    noteId: `note-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    newDeckId: `deck-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
  }
}
