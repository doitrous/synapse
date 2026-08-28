/**
 * The pure search / filter / sort engine behind the Browse view.
 *
 * The browser is a table over every card a student owns, and the question it
 * answers — "which of my cards match this?" — is a data question, not a React
 * one. So the whole query lives here as total functions over the card list: no
 * hook, no clock of its own (the caller passes `now`), and no knowledge of a
 * deck's name (the caller passes `deckNameOf`). That keeps the definitions —
 * what "overdue" means, how a cloze card's text is searched without its markup,
 * which field a sort key reads — pinned by tests in plain Node, exactly the way
 * `status.ts` pins the state definitions the filters lean on.
 */

import type { CardWithMeta } from '@/lib/useFlashcards'
import type { FlagColor, Note, NoteType } from './model.ts'
import { richToPlainText } from './richText.ts'
import { clozePlainText } from './cloze.ts'
import { exclusiveStatus, isBuried, type ExclusiveStatus } from './status.ts'
import { isDue } from '../srs.ts'
import { localDay } from './time.ts'

/** The full filter spec; every field has an "everything" value so a fresh
 * browser shows the whole collection. */
export interface BrowseFilters {
  /** Free-text query, matched case-insensitively against face text, deck, tags. */
  text: string
  deckId: string | null
  state: ExclusiveStatus | 'any'
  due: 'any' | 'due' | 'overdue' | 'not-due'
  flag: FlagColor | 'any' | 'none'
  tag: string | null
  type: NoteType | 'any'
  suspended: 'any' | 'yes' | 'no'
  buried: 'any' | 'yes' | 'no'
}

export type SortKey = 'created' | 'edited' | 'due' | 'interval' | 'lapses' | 'deck'
export type SortDirection = 'asc' | 'desc'

export interface BrowseSort {
  key: SortKey
  direction: SortDirection
}

/** How a deck id becomes a display name; injected so this stays pure. */
export type DeckNameOf = (deckId: string) => string

export const DEFAULT_FILTERS: BrowseFilters = {
  text: '',
  deckId: null,
  state: 'any',
  due: 'any',
  flag: 'any',
  tag: null,
  type: 'any',
  suspended: 'any',
  buried: 'any',
}

export const DEFAULT_SORT: BrowseSort = { key: 'created', direction: 'desc' }

/** Whether any filter is narrowing the result — drives the "clear" affordance. */
export function isFiltering(filters: BrowseFilters): boolean {
  return (
    filters.text.trim() !== '' ||
    filters.deckId !== null ||
    filters.state !== 'any' ||
    filters.due !== 'any' ||
    filters.flag !== 'any' ||
    filters.tag !== null ||
    filters.type !== 'any' ||
    filters.suspended !== 'any' ||
    filters.buried !== 'any'
  )
}

/* ---- Face text ----------------------------------------------------------- */

/**
 * The card's question side as plain text, for the row excerpt. A cloze card's
 * text is stripped of its `{{c1::…}}` markup first, so the excerpt reads as a
 * sentence and not as source.
 */
export function noteFrontPlain(note: Note): string {
  switch (note.type) {
    case 'basic':
      return richToPlainText(note.fields.front)
    case 'cloze':
      return richToPlainText(clozePlainText(note.fields.text))
    case 'image-occlusion':
      return richToPlainText(note.fields.header)
  }
}

/** Every searchable word on a note — both faces, cloze text without markup,
 * and any occluder labels — as one plain string. */
export function noteSearchText(note: Note): string {
  switch (note.type) {
    case 'basic':
      return `${richToPlainText(note.fields.front)} ${richToPlainText(note.fields.back)}`
    case 'cloze':
      return `${richToPlainText(clozePlainText(note.fields.text))} ${richToPlainText(note.fields.extra)}`
    case 'image-occlusion':
      return [
        richToPlainText(note.fields.header),
        richToPlainText(note.fields.back),
        ...note.occluders.map((o) => richToPlainText(o.label)),
      ].join(' ')
  }
}

/**
 * True when `term` is found on the card. Matched case-insensitively against the
 * note's face text (cloze markup removed), its deck's name, and its tags. An
 * empty term matches everything.
 */
export function searchText(entry: CardWithMeta, term: string, deckName?: string): boolean {
  const q = term.trim().toLowerCase()
  if (!q) return true
  const haystack = `${noteSearchText(entry.note)} ${deckName ?? ''} ${entry.note.tags.join(' ')}`
  return haystack.toLowerCase().includes(q)
}

/* ---- Filtering ----------------------------------------------------------- */

function matchesDue(due: BrowseFilters['due'], entry: CardWithMeta, now: Date): boolean {
  const schedule = entry.meta.schedule
  switch (due) {
    case 'any':
      return true
    case 'due':
      return isDue(schedule, now)
    case 'overdue':
      // Its due day is a calendar day already behind us, not merely "now".
      return localDay(new Date(Date.parse(schedule.due))) < localDay(now)
    case 'not-due':
      return !isDue(schedule, now)
  }
}

function matchesFilters(
  entry: CardWithMeta,
  filters: BrowseFilters,
  now: Date,
  deckNameOf: DeckNameOf,
): boolean {
  const { card, note, meta } = entry

  if (filters.deckId !== null && card.deckId !== filters.deckId) return false
  if (filters.type !== 'any' && note.type !== filters.type) return false
  if (filters.tag !== null && !note.tags.includes(filters.tag)) return false

  if (filters.state !== 'any' && exclusiveStatus(meta, now) !== filters.state) return false
  if (!matchesDue(filters.due, entry, now)) return false

  if (filters.flag === 'none') {
    if (meta.flag !== null) return false
  } else if (filters.flag !== 'any' && meta.flag !== filters.flag) {
    return false
  }

  if (filters.suspended === 'yes' && !meta.suspended) return false
  if (filters.suspended === 'no' && meta.suspended) return false

  const buried = isBuried(meta, now)
  if (filters.buried === 'yes' && !buried) return false
  if (filters.buried === 'no' && buried) return false

  if (!searchText(entry, filters.text, deckNameOf(card.deckId))) return false

  return true
}

/* ---- Sorting ------------------------------------------------------------- */

function sortValue(entry: CardWithMeta, key: SortKey, deckNameOf: DeckNameOf): string | number {
  switch (key) {
    case 'created':
      return entry.note.createdAt
    case 'edited':
      return entry.note.updatedAt
    case 'due':
      return Date.parse(entry.meta.schedule.due) || 0
    case 'interval':
      return entry.meta.schedule.interval
    case 'lapses':
      return entry.meta.schedule.lapses
    case 'deck':
      return deckNameOf(entry.card.deckId).toLowerCase()
  }
}

function compareValues(a: string | number, b: string | number): number {
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return String(a).localeCompare(String(b))
}

/**
 * Filter, then sort. `now` decides every time-relative state; `deckNameOf`
 * resolves the deck name used by both the text search and the deck sort. The
 * result is a new array — the input is never mutated. Ties break on the stable
 * card id so the order never shuffles between renders.
 */
export function applyBrowse(
  entries: CardWithMeta[],
  filters: BrowseFilters,
  sort: BrowseSort,
  now: Date,
  deckNameOf: DeckNameOf,
): CardWithMeta[] {
  const dir = sort.direction === 'desc' ? -1 : 1
  const filtered = entries.filter((entry) => matchesFilters(entry, filters, now, deckNameOf))
  return filtered.sort((a, b) => {
    const cmp = compareValues(sortValue(a, sort.key, deckNameOf), sortValue(b, sort.key, deckNameOf))
    return cmp !== 0 ? cmp * dir : a.card.id.localeCompare(b.card.id)
  })
}
