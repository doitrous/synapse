/**
 * What a deck is, and which of its cards are worth showing today.
 *
 * This module is pure — no React, no storage, no clock of its own — for the
 * same reason `srs.ts` takes `now` as a parameter: a queue that reads its own
 * clock or its own store can only be asserted against itself.
 *
 * A deck reaches a student from one of two places. `managedDeckToStudentDeck`
 * takes an admin-authored deck off the content ledger. `deckFromTerms` builds
 * one on the fly from a filtered set of Medical Terminology terms, for "study
 * these as flashcards" off a glossary view. Both land on the same shape.
 */

import { isDue, type CardSchedule, type SrsConfig } from './srs.ts'
import { isStudentPublishable, type ManagedContentItem } from './contentControl.ts'

export interface DeckCard {
  id: string
  front: string
  back: string
}

/** The admin-authored half of a deck, kept alongside the ledger item. */
export interface DeckAuthoringData {
  description: string
  cards: DeckCard[]
}

/** A deck as a student sees it: content only, no per-student scheduling. */
export interface StudentDeck {
  id: string
  title: string
  subjectId: string
  description: string
  cards: DeckCard[]
}

/** One card paired with the schedule that decides whether it is due. */
export interface StudyCard {
  id: string
  schedule: CardSchedule
}

/** How many new and review cards a student has already been shown today. */
interface DailyCounts {
  newSeen: number
  reviewsSeen: number
}

/**
 * Which cards are worth showing right now, due cards first.
 *
 * Due comes before new because a pile of overdue reviews buried under fresh
 * material is how a deck gets abandoned — the student never gets back to the
 * reviews they already owe. Caps are Anki's own (20 new, 200 reviews), and
 * `seenToday` is subtracted from them so the limit holds across a whole day's
 * sittings, not just this one call.
 */
export function dueQueue(cards: StudyCard[], now: Date, config: SrsConfig, seenToday: DailyCounts): StudyCard[] {
  const due = cards.filter((card) => card.schedule.state !== 'new' && isDue(card.schedule, now))
  const fresh = cards.filter((card) => card.schedule.state === 'new')

  const dueRoom = Math.max(0, config.maxReviewsPerDay - seenToday.reviewsSeen)
  const newRoom = Math.max(0, config.newPerDay - seenToday.newSeen)

  return [...due.slice(0, dueRoom), ...fresh.slice(0, newRoom)]
}

/**
 * One card per line, front and back split on the first `|`. A line without a
 * separator has no back to show, so it is not a card — silently keeping it
 * would leave a blank-backed card in the deck instead of telling the author
 * their line was malformed.
 */
export function parseCardLines(text: string): DeckCard[] {
  const cards: DeckCard[] = []
  const lines = text.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    const sep = line.indexOf('|')
    if (sep === -1) continue
    const front = line.slice(0, sep).trim()
    const back = line.slice(sep + 1).trim()
    cards.push({ id: `line-${i}`, front, back })
  }
  return cards
}

/**
 * A ledger item as a student would study it, or `null` if there is nothing to
 * study: a draft deck isn't released yet, and a published deck with no cards
 * has nothing in it regardless of status.
 */
export function managedDeckToStudentDeck(item: ManagedContentItem): StudentDeck | null {
  if (!isStudentPublishable(item)) return null
  const data = item.deckData
  if (!data || data.cards.length === 0) return null
  return {
    id: item.id,
    title: item.title,
    subjectId: item.subjectId,
    description: data.description,
    cards: data.cards,
  }
}

/** The shape of a Medical Terminology term, as consumed by `deckFromTerms`. */
interface TaxonomyTerm {
  id: string
  term: string
  def: string
}

/** Lowercase, hyphenated, nothing but that — stable across runs by construction. */
function slugify(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

/**
 * Build a deck from a named filter over Medical Terminology.
 *
 * A student re-running "study these as flashcards" on the same filter should
 * update that deck, not spawn a second one — so the deck id comes from the
 * filter name alone, and each card id comes from its term's own id, never
 * from a counter or the clock. Two runs over the same inputs land on exactly
 * the same ids.
 */
export const TERMINOLOGY_DEFAULT_FILTER = 'Medical Terminology'
/**
 * The page was called "Medical Taxonomy" when the first decks were minted, so
 * the whole-glossary deck keeps that slug: renaming the page must not orphan
 * the deck (and its review schedule) a student already has.
 */
const LEGACY_DEFAULT_SLUG = 'medical-taxonomy'

export function deckFromTerms(filterName: string, terms: TaxonomyTerm[]): StudentDeck {
  const slug = filterName === TERMINOLOGY_DEFAULT_FILTER ? LEGACY_DEFAULT_SLUG : slugify(filterName)
  const id = `deck-taxonomy-${slug}`
  return {
    id,
    title: filterName,
    subjectId: slug,
    description: `Flashcards from Medical Terminology: ${filterName}`,
    cards: terms.map((term) => ({ id: `${id}-${term.id}`, front: term.term, back: term.def })),
  }
}
