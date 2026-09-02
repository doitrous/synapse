/**
 * Flags on the items that are not multiple-choice questions.
 *
 * The MCQ bank has had "flag this, I want to come back to it" since it shipped,
 * kept in `nishany.qbank.marked.v1` as a flat list of question ids. A station
 * and a written question are exactly as worth coming back to, and neither could
 * be marked at all — so the one habit a student builds while revising stopped
 * working the moment they left the MCQ bank.
 *
 * This is that store for the other two banks. It is deliberately *not* a
 * migration of the MCQ one: that key is live on every student's device, it is
 * read in four places, and renaming or reshaping it to fit two more banks would
 * risk a flag list for the sake of tidiness. Two documents, one meaning.
 *
 * The value is the ISO time the flag was raised, not `true`, so the lists can
 * be ordered newest-first — "what was I looking at last night" is the question
 * a flag list is actually asked.
 */

export const ITEM_FLAGS_STORAGE_KEY = 'nishany.practice.flags.v1'

/** The banks that keep their flags here. MCQ keeps its own, older, store. */
export type FlagKind = 'practical' | 'essay'

export interface ItemFlagsDoc {
  version: 1
  /** Practical item id → when it was flagged. */
  practical: Record<string, string>
  /** Essay id → when it was flagged. */
  essay: Record<string, string>
}

export const EMPTY_ITEM_FLAGS: ItemFlagsDoc = { version: 1, practical: {}, essay: {} }

/**
 * One bank's map, never undefined.
 *
 * A document saved before a bank existed loads without that key, and every
 * helper below would then be one property access away from throwing on a
 * student's real, valid, older document.
 */
function mapOf(doc: ItemFlagsDoc, kind: FlagKind): Record<string, string> {
  return doc[kind] ?? {}
}

export function isFlagged(doc: ItemFlagsDoc, kind: FlagKind, id: string): boolean {
  return Boolean(mapOf(doc, kind)[id])
}

/** Raise the flag, or lower it if it is already up. */
export function toggleFlag(doc: ItemFlagsDoc, kind: FlagKind, id: string, now: string): ItemFlagsDoc {
  const current = mapOf(doc, kind)
  const next = { ...current }
  if (next[id]) delete next[id]
  else next[id] = now
  return { ...doc, version: 1, practical: mapOf(doc, 'practical'), essay: mapOf(doc, 'essay'), [kind]: next }
}

/** Everything flagged in one bank, most recently flagged first. */
export function flaggedIds(doc: ItemFlagsDoc, kind: FlagKind): string[] {
  return Object.entries(mapOf(doc, kind))
    // Ties fall back to the id, so the order is stable rather than whatever
    // key order the document happened to be written in.
    .sort((a, b) => (b[1].localeCompare(a[1]) || a[0].localeCompare(b[0])))
    .map(([id]) => id)
}

/** When one item was flagged, or null if it is not flagged. */
export function flaggedAt(doc: ItemFlagsDoc, kind: FlagKind, id: string): string | null {
  return mapOf(doc, kind)[id] ?? null
}
