import { isBoxed, type AnnotationObject } from './annotations.ts'

/**
 * Every word the student typed into a document, in one small list.
 *
 * Search has to find a sticky note on page 240 while the reader is on page 3,
 * and only a window of three shards is ever open — so the text is mirrored
 * outside the shards. It is the text and its page, nothing more: the mark
 * itself still lives on its own page, and this list is rebuilt from it rather
 * than being the record of it.
 *
 * Tape and ink are absent on purpose. Tape carries no words, and handwriting is
 * not readable text; claiming to search it would be a lie the student would
 * find out about the first time they looked for something they had written by
 * hand.
 */

export interface NoteEntry {
  id: string
  page: number
  text: string
  kind: 'note' | 'textbox'
}

function indexable(object: AnnotationObject): NoteEntry | null {
  if (!isBoxed(object) || object.kind === 'tape') return null
  const text = object.text.trim()
  if (!text) return null
  return { id: object.id, page: object.page, text, kind: object.kind }
}

/** Add or replace the entries for these objects, keeping the list page-ordered. */
export function upsertNotes(entries: readonly NoteEntry[], objects: readonly AnnotationObject[]): NoteEntry[] {
  const incoming = objects.map(indexable).filter((entry): entry is NoteEntry => entry !== null)
  // An object whose text was cleared is no longer indexable, so it has to be
  // dropped rather than merely skipped — otherwise search keeps finding words
  // the student deleted.
  const touched = new Set(objects.map((object) => object.id))
  const kept = entries.filter((entry) => !touched.has(entry.id))
  if (!incoming.length && kept.length === entries.length) return [...entries]
  return [...kept, ...incoming].sort((a, b) => a.page - b.page || a.id.localeCompare(b.id))
}

export function dropNotes(entries: readonly NoteEntry[], ids: readonly string[]): NoteEntry[] {
  if (!ids.length) return [...entries]
  const gone = new Set(ids)
  const kept = entries.filter((entry) => !gone.has(entry.id))
  return kept.length === entries.length ? [...entries] : kept
}
