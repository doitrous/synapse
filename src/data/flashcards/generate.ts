/**
 * A note's generated cards, and the identity that lets an edit keep history.
 *
 * Regenerating is idempotent: the same note yields the same card ids every
 * time, so `reconcileCards` can diff "what the note generates now" against "what
 * the student has a schedule for" and touch only the difference — a new cloze
 * number adds a card, a deleted occluder removes one, and every sibling in
 * between keeps its schedule untouched. That is the promise in the spec that
 * editing a note must not lose unaffected study history.
 */

import { cardId, newCardMeta, type Card, type CardMeta, type Note } from './model.ts'
import { clozeNumbers } from './cloze.ts'
import type { Scheduler } from './scheduler.ts'

/**
 * The cards a note currently generates, in stable order.
 *  - Basic:           one card, `templateKey === 'card'`.
 *  - Cloze:           one per distinct cloze number, `templateKey === 'c{n}'`.
 *  - Image Occlusion: one per ungrouped occluder and one per group; the
 *    `templateKey` is the occluder id or the group id.
 */
export function generateCards(note: Note): Card[] {
  const keys = templateKeys(note)
  return keys.map((templateKey) => ({
    id: cardId(note.id, templateKey),
    noteId: note.id,
    deckId: note.deckId,
    templateKey,
  }))
}

export function templateKeys(note: Note): string[] {
  switch (note.type) {
    case 'basic':
      return ['card']
    case 'cloze':
      return clozeNumbers(note.fields.text).map((n) => `c${n}`)
    case 'image-occlusion': {
      const groupKeys = note.groups.map((group) => group.id)
      const ungrouped = note.occluders.filter((occ) => !occ.groupId).map((occ) => occ.id)
      // Groups first, then ungrouped occluders, each in authoring order.
      return [...groupKeys, ...ungrouped]
    }
  }
}

/**
 * Bring a note's stored `meta` in line with the cards it now generates. New
 * cards get a fresh, due-now schedule; cards that no longer exist have their
 * meta dropped; surviving cards keep exactly what they had. Returns a new map;
 * the input is never mutated.
 */
export function reconcileCards(
  note: Note,
  existing: Record<string, CardMeta>,
  scheduler: Scheduler,
  now: Date,
): Record<string, CardMeta> {
  const wanted = new Set(generateCards(note).map((card) => card.id))
  const next: Record<string, CardMeta> = {}
  for (const id of wanted) {
    next[id] = existing[id] ?? newCardMeta(scheduler.newCard(now))
  }
  return next
}

/**
 * Reconcile a whole collection's worth of meta after a note changes, preserving
 * the meta of every card that belongs to a *different* note. Only the changed
 * note's card ids are added or removed; nothing else is touched.
 */
export function reconcileNoteInMeta(
  note: Note,
  allMeta: Record<string, CardMeta>,
  scheduler: Scheduler,
  now: Date,
): Record<string, CardMeta> {
  const noteCardIds = new Set(generateCards(note).map((card) => card.id))
  const next: Record<string, CardMeta> = {}
  // Keep every card that isn't this note's — identified by the id prefix.
  const prefix = `${note.id}::`
  for (const [id, meta] of Object.entries(allMeta)) {
    if (!id.startsWith(prefix)) next[id] = meta
  }
  for (const id of noteCardIds) {
    next[id] = allMeta[id] ?? newCardMeta(scheduler.newCard(now))
  }
  return next
}
