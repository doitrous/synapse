/**
 * A note, cut into the pieces a writer edits one at a time.
 *
 * The notebook renders formatting live — bold is bold, a callout is a tinted
 * panel — while the block the caret is in shows its markdown source, so the
 * markers are there exactly when you need to change them and gone the rest of
 * the time. That needs one thing this module provides: the character range each
 * block occupies in the source string.
 *
 * The alternative was a `contentEditable` surface that round-trips to markdown,
 * which means owning selection, IME, paste and every DOM-to-offset mapping
 * yourself. This keeps the string authoritative and the caret native: an edit is
 * a `<textarea>` over one block's substring, spliced back by offset. Nothing
 * about how a note is stored changes, and no note needs migrating.
 *
 * The invariant that makes the splice safe — and that the tests pin down — is
 * that the segments tile the source exactly: joining them back with newlines
 * reproduces the original string, character for character.
 */

export interface NoteSegment {
  /** Character offset of the first character, inclusive. */
  start: number
  /** Character offset just past the last character. */
  end: number
  /** The source text of this segment, without the separating newline. */
  text: string
  /** Blank runs are segments too, so the tiling is complete. */
  blank: boolean
}

/** Lines that begin a block which continues over the lines that follow. */
const QUOTE = /^>/
const BULLET = /^\s*[-*]\s+/
const NUMBERED = /^\s*\d+[.)]\s+/
const HEADING = /^#{1,3}\s+/
const DIVIDER = /^\s*(-{3,}|\*{3,})\s*$/
const FENCE = /^\s*```/

function kindOf(line: string): 'blank' | 'fence' | 'heading' | 'divider' | 'quote' | 'bullet' | 'numbered' | 'paragraph' {
  if (!line.trim()) return 'blank'
  if (FENCE.test(line)) return 'fence'
  if (DIVIDER.test(line)) return 'divider'
  if (HEADING.test(line)) return 'heading'
  if (QUOTE.test(line)) return 'quote'
  if (BULLET.test(line)) return 'bullet'
  if (NUMBERED.test(line)) return 'numbered'
  return 'paragraph'
}

export function splitNote(source: string): NoteSegment[] {
  const lines = source.split('\n')
  const segments: NoteSegment[] = []
  let offset = 0
  let index = 0

  const push = (count: number, blank: boolean) => {
    const text = lines.slice(index, index + count).join('\n')
    segments.push({ start: offset, end: offset + text.length, text, blank })
    // +1 for the newline that separated this run from the next.
    offset += text.length + 1
    index += count
  }

  while (index < lines.length) {
    const kind = kindOf(lines[index])

    if (kind === 'blank') {
      let count = 0
      while (index + count < lines.length && kindOf(lines[index + count]) === 'blank') count += 1
      push(count, true)
      continue
    }

    // A fence runs to its closing marker, whatever is inside it — that is what
    // a fence is for.
    if (kind === 'fence') {
      let count = 1
      while (index + count < lines.length && !FENCE.test(lines[index + count])) count += 1
      if (index + count < lines.length) count += 1
      push(count, false)
      continue
    }

    if (kind === 'heading' || kind === 'divider') { push(1, false); continue }

    // Quotes, callouts and lists continue across their own kind of line.
    let count = 1
    while (index + count < lines.length) {
      const next = kindOf(lines[index + count])
      if (kind === 'quote' && next === 'quote') { count += 1; continue }
      if ((kind === 'bullet' || kind === 'numbered') && (next === 'bullet' || next === 'numbered')) { count += 1; continue }
      if (kind === 'paragraph' && next === 'paragraph') { count += 1; continue }
      break
    }
    push(count, false)
  }

  return segments
}

/** Which segment holds the caret. Ties go to the later one, as typing does. */
export function segmentAt(segments: readonly NoteSegment[], caret: number): number {
  for (let index = segments.length - 1; index >= 0; index--) {
    if (caret >= segments[index].start) return index
  }
  return segments.length ? 0 : -1
}

/** Splice a segment's replacement back into the whole note. */
export function replaceSegment(source: string, segment: NoteSegment, next: string): string {
  return source.slice(0, segment.start) + next + source.slice(segment.end)
}

/**
 * Where a new segment should be opened when the writer asks for one.
 *
 * Appending to a note that does not end in a blank line needs the blank line
 * first, or the new block joins the paragraph above it.
 */
export function appendBlock(source: string, block: string): { value: string; caret: number } {
  const separator = !source || source.endsWith('\n\n') ? '' : source.endsWith('\n') ? '\n' : '\n\n'
  const value = `${source}${separator}${block}`
  return { value, caret: value.length }
}
