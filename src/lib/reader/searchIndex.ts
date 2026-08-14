/**
 * Finding words in a document.
 *
 * The old search read every page in sequence, kept only the *first* hit on each
 * one, stopped at eighty, and could not be cancelled — so a second keystroke
 * raced the first, and a word appearing four times on a page was reported once.
 * The matching itself is pure and lives here; the page-by-page reading and its
 * cancellation live in the hook that calls it.
 */

export interface TextItem {
  /** The string as pdf.js reports it. */
  str: string
}

/** One page's text, flattened, with where each source item began. */
export interface PageText {
  page: number
  text: string
  /** `itemOffsets[i]` is the index in `text` where item `i` starts. */
  itemOffsets: number[]
}

export interface Match {
  page: number
  /** Character range within `PageText.text`. */
  start: number
  end: number
  /** Enough surrounding text to recognise the hit in a list. */
  snippet: string
}

/** Which text items a character range touches, for highlighting. */
export interface ItemRange {
  itemIndex: number
  start: number
  end: number
}

const SNIPPET_BEFORE = 40
const SNIPPET_AFTER = 60

/**
 * Join pdf.js text items into one searchable string.
 *
 * A single space between items, because a match spanning two of them is
 * normal — a hyphenated word, a line break mid-phrase — and the offsets are
 * what let the highlight find its way back to the right spans.
 */
export function buildPageText(page: number, items: readonly TextItem[]): PageText {
  const parts: string[] = []
  const itemOffsets: number[] = []
  let offset = 0
  for (const item of items) {
    itemOffsets.push(offset)
    parts.push(item.str)
    offset += item.str.length + 1
  }
  return { page, text: parts.join(' '), itemOffsets }
}

/** Every occurrence, not just the first. Overlaps are not counted twice. */
export function findMatches(pageText: PageText, needle: string): Match[] {
  const query = needle.trim().toLowerCase()
  if (!query) return []
  const haystack = pageText.text.toLowerCase()
  const matches: Match[] = []
  let cursor = 0
  for (;;) {
    const at = haystack.indexOf(query, cursor)
    if (at === -1) break
    matches.push({
      page: pageText.page,
      start: at,
      end: at + query.length,
      snippet: snippetAround(pageText.text, at, at + query.length),
    })
    cursor = at + query.length
  }
  return matches
}

function snippetAround(text: string, start: number, end: number): string {
  const from = Math.max(0, start - SNIPPET_BEFORE)
  const to = Math.min(text.length, end + SNIPPET_AFTER)
  const body = text.slice(from, to).replace(/\s+/g, ' ').trim()
  return `${from > 0 ? '…' : ''}${body}${to < text.length ? '…' : ''}`
}

/**
 * Which rendered text spans a match falls across.
 *
 * A hit is very often split over two or three items, so highlighting the item
 * the match *starts* in would leave the rest of the word unmarked.
 */
export function mapRangeToItems(pageText: PageText, start: number, end: number): ItemRange[] {
  const ranges: ItemRange[] = []
  const { itemOffsets, text } = pageText
  for (let index = 0; index < itemOffsets.length; index++) {
    const itemStart = itemOffsets[index]
    const itemEnd = index + 1 < itemOffsets.length ? itemOffsets[index + 1] - 1 : text.length
    if (itemEnd <= start) continue
    if (itemStart >= end) break
    ranges.push({
      itemIndex: index,
      start: Math.max(0, start - itemStart),
      end: Math.min(itemEnd - itemStart, end - itemStart),
    })
  }
  return ranges
}

/**
 * A student's own writing, searched alongside the document's.
 *
 * Notes are the thing most worth finding again, and the old search could not
 * see them at all. Kept here so both sources produce the same shape of result.
 */
export interface NoteText {
  page: number
  /** What to show as the source: a sticky note, a text box, a section title. */
  label: string
  text: string
}

export interface NoteMatch extends Match {
  label: string
}

export function findNoteMatches(notes: readonly NoteText[], needle: string): NoteMatch[] {
  const query = needle.trim().toLowerCase()
  if (!query) return []
  const found: NoteMatch[] = []
  for (const note of notes) {
    const pageText = buildPageText(note.page, [{ str: note.text }])
    for (const match of findMatches(pageText, query)) found.push({ ...match, label: note.label })
  }
  return found
}
