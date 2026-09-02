/**
 * Every test a student sits, whatever it was made of.
 *
 * "Previous tests" was built out of the MCQ attempt log — group the records by
 * `sessionId` and you have the sittings. That works exactly as long as every
 * sitting is MCQs. A practical sitting produces records on three different
 * surfaces with per-step ids, and a mixed sitting produces records on all of
 * them at once, so neither was a row in that list: a student could finish six
 * stations and find no evidence they had sat anything.
 *
 * This ledger is the one place that says "a test happened, and this is what
 * kind it was". It is not a second copy of the student's work — every answer
 * still lives in the log, `usePracticalProgress` or `useEssayAnswers`, and
 * clearing this loses no marks, only the list.
 */

export const SITTINGS_STORAGE_KEY = 'nishany.sittings.v1'

/** What a sitting was made of. `mixed` means more than one bank in one queue. */
export type SittingKind = 'mcq' | 'practical' | 'essay' | 'mixed'

/** The four kinds, in the order they are filtered and reported in. */
export const SITTING_KINDS: readonly SittingKind[] = ['mcq', 'practical', 'essay', 'mixed']

export interface Sitting {
  /** The same id the sitting's own records carry, so the two ledgers agree. */
  id: string
  kind: SittingKind
  startedAt: string
  finishedAt: string
  /** What the student called it, when they called it anything. */
  name?: string
  itemCount: number
  /**
   * The result, in whatever terms this kind is actually marked in.
   *
   * `correct` is only ever set where something was marked against a key — an
   * MCQ, or the MCQ share of a mixed sitting. `covered` is how many items were
   * reached or recorded. `total` is how many the sitting held. There is
   * deliberately no single score across kinds; see `MixedSummary`.
   */
  result: { correct?: number; covered?: number; total: number }
  /** For a mixed sitting: how many items each bank contributed. */
  bankCounts?: { mcq: number; practical: number; essay: number }
  /** The items it held, `kind:id` for a mixed sitting and bare ids otherwise. */
  itemIds: string[]
}

export interface SittingsDoc {
  version: 1
  sittings: Sitting[]
}

export const EMPTY_SITTINGS: SittingsDoc = { version: 1, sittings: [] }

/**
 * How many sittings are kept.
 *
 * A cap rather than unbounded growth: this document is written on every test
 * and read on every hub render, and a student two years in would otherwise be
 * carrying every sitting they have ever done into the page load.
 */
export const MAX_SITTINGS = 200

/**
 * File a finished sitting.
 *
 * Deduped by id and newest first. Recording the same sitting twice is normal,
 * not a bug to guard against elsewhere: the summary screen can mount more than
 * once, and a re-record simply replaces the entry with the newer reading of it.
 */
export function recordSitting(doc: SittingsDoc, sitting: Sitting): SittingsDoc {
  const rest = (doc.sittings ?? []).filter((entry) => entry.id !== sitting.id)
  const sittings = [sitting, ...rest]
    .sort((a, b) => (b.finishedAt.localeCompare(a.finishedAt) || b.startedAt.localeCompare(a.startedAt)))
    .slice(0, MAX_SITTINGS)
  return { version: 1, sittings }
}

/** Forget one sitting — the ledger half of deleting a test. */
export function forgetSitting(doc: SittingsDoc, id: string): SittingsDoc {
  return { version: 1, sittings: (doc.sittings ?? []).filter((entry) => entry.id !== id) }
}

/** One kind's sittings, or all of them, newest first. */
export function sittingsOfKind(doc: SittingsDoc, kind: SittingKind | 'all'): Sitting[] {
  const all = doc.sittings ?? []
  return kind === 'all' ? all : all.filter((sitting) => sitting.kind === kind)
}

/**
 * What kind a queue of items adds up to.
 *
 * A practical-only sitting is built as a mixed session with two empty banks —
 * that is deliberate, one queue and one runner rather than three code paths —
 * so the kind cannot be read off how it was started. It is read off what it
 * actually contained: one bank means that bank, more than one means mixed.
 */
export function kindOfItems(items: { kind: 'mcq' | 'practical' | 'essay' }[]): SittingKind {
  const kinds = new Set(items.map((item) => item.kind))
  if (kinds.size === 1) return [...kinds][0]
  return 'mixed'
}
