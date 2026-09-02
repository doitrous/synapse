/**
 * Which glossary terms the student has marked as known.
 *
 * The Medical Terminology page had no memory: every visit showed every term
 * as new. A single "Got it" per term is enough to make the page a place you
 * come back to — the ring on the hub fills, categories show what is left, and
 * the flashcard shortcut can draw only the terms still being learned.
 */

export const TERMINOLOGY_PROGRESS_KEY = 'nishany.terminology.progress.v1'

export interface TerminologyProgressDoc {
  version: 1
  /** term id → ISO timestamp of when it was marked known. */
  known: Record<string, string>
}

export const EMPTY_TERMINOLOGY_PROGRESS: TerminologyProgressDoc = { version: 1, known: {} }

export function markKnown(doc: TerminologyProgressDoc, id: string, now: Date = new Date()): TerminologyProgressDoc {
  if (doc.known[id]) return doc
  return { ...doc, known: { ...doc.known, [id]: now.toISOString() } }
}

export function unmarkKnown(doc: TerminologyProgressDoc, id: string): TerminologyProgressDoc {
  if (!doc.known[id]) return doc
  const known = { ...doc.known }
  delete known[id]
  return { ...doc, known }
}

export function toggleKnown(doc: TerminologyProgressDoc, id: string, now: Date = new Date()): TerminologyProgressDoc {
  return doc.known[id] ? unmarkKnown(doc, id) : markKnown(doc, id, now)
}

/** How many of the given ids are known — ids the glossary no longer has never count. */
export function knownIn(doc: TerminologyProgressDoc, ids: readonly string[]): number {
  let count = 0
  for (const id of ids) if (doc.known[id]) count += 1
  return count
}
