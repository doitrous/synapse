/**
 * A shared "quick add flashcard" write path — the thing any screen (question
 * bank, library, practical) reaches for when it wants to append a single Basic
 * card to the student's collection without standing up the full per-page
 * `useFlashcards` hook.
 *
 * Split the way `migration.ts` and `richText.ts` are split: a pure core that
 * takes a collection and returns a new one, with no clock, no storage and no
 * id generator of its own, so it is trivial to test; and a thin wrapper that
 * supplies those effects and talks to `localStorage`. The core never
 * sanitizes — callers are expected to hand it already-safe rich-text HTML
 * (see `basicNoteFieldsFromText` below for the plain-text case) — because
 * sanitizing here would mean importing DOM-adjacent policy into a module whose
 * only job is "append a note to a collection."
 */

import { ensureV2 } from '../../data/flashcards/migration.ts'
import type { FlashcardCollection } from '../../data/flashcards/model.ts'
import { escapeHtml } from '../../data/flashcards/richText.ts'

const STORAGE_KEY = 'synapse.flashcards.collection.v2'

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

/**
 * The localStorage adapter: read whatever is under the flashcards key
 * (tolerating an absent, corrupt or v1 value via `ensureV2`), append a Basic
 * note with fresh ids and the current time, and write the result back.
 *
 * Kept deliberately thin — all branching lives in `appendBasicNote` so tests
 * cover it without touching storage, `Date.now()` or `Math.random()`.
 */
export function quickAddFlashcard(input: QuickAddInput): QuickAddResult {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    let parsed: unknown = null
    if (raw !== null) {
      try {
        parsed = JSON.parse(raw)
      } catch {
        parsed = null
      }
    }
    const now = new Date()
    const collection = ensureV2(parsed, now)

    const noteId = `note-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
    const newDeckId = `deck-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`

    const result = appendBasicNote(collection, input, { now, noteId, newDeckId })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result.collection))
    return result
  } catch (error) {
    throw new Error(
      `quickAddFlashcard: failed to save flashcard (${error instanceof Error ? error.message : String(error)})`,
    )
  }
}
