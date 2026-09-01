import type { NoteTone } from '@/lib/reader/annotations'
import type { TextAnchor } from '@/lib/library/textAnchor'

/**
 * What a student has marked on a library article.
 *
 * Two things, and deliberately one record: a highlight is a note with nothing
 * written in it yet, and a student who highlights a sentence and then wants to
 * say something about it should not have to make a second mark on the same
 * words. `note` empty means a highlight; `note` set means a sticky note.
 *
 * Tones are `NOTE_TONES` from the PDF reader, which the whiteboard also uses, so
 * a student meets one palette in this app rather than three.
 *
 * One document holds every mark on every article. A mark is a quoted phrase and
 * a short note — tens of kilobytes for a whole library — so the per-page
 * sharding the PDF annotations need would be machinery bought for nothing here.
 */
export interface LibraryMark {
  id: string
  articleId: string
  anchor: TextAnchor
  tone: NoteTone
  /** Empty for a plain highlight. */
  note: string
  /** ISO timestamp, for ordering a student's own marks. */
  createdAt: string
}

/**
 * Dotted and under `nishany.library.`, which `isUserOwnedState` routes to the
 * student's own record. Without that it would go to the shared catalogue store,
 * where a student has no write permission and every save would be refused.
 */
export const LIBRARY_MARKS_STORAGE_KEY = 'nishany.library.marks.v1'

/** Marks keyed by the article they sit on. */
export type LibraryMarkStore = Record<string, LibraryMark[]>

let sequence = 0
export function newMarkId(): string {
  sequence += 1
  return `mk-${Date.now().toString(36)}-${sequence}`
}

/** The tones offered in the selection toolbar, in the order they are shown. */
export const MARK_TONES: NoteTone[] = ['amber', 'teal', 'rose', 'sage']

export function marksFor(store: LibraryMarkStore, articleId: string): LibraryMark[] {
  return store[articleId] ?? []
}

/** Add or replace a mark, keeping each article's list in creation order. */
export function upsertMark(store: LibraryMarkStore, mark: LibraryMark): LibraryMarkStore {
  const existing = marksFor(store, mark.articleId)
  const without = existing.filter((item) => item.id !== mark.id)
  return { ...store, [mark.articleId]: [...without, mark] }
}

/** Remove a mark, and the article's entry entirely once its last one goes. */
export function removeMark(store: LibraryMarkStore, articleId: string, markId: string): LibraryMarkStore {
  const remaining = marksFor(store, articleId).filter((item) => item.id !== markId)
  const next = { ...store }
  if (remaining.length) next[articleId] = remaining
  else delete next[articleId]
  return next
}
