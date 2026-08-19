/**
 * Pinning a student's mark to a phrase in an article.
 *
 * A library article is prose rendered from stored blocks, not a page with
 * coordinates, so the reader's annotation model — page-space points on a canvas
 * — has nothing to say about it. What it has instead is the mechanism already
 * used to pin media to a phrase: record the words, then find them again.
 *
 * Recording only the words is not enough. "the left ventricle" can occur three
 * times in one paragraph, and the media matcher that came before this silently
 * took the first. So a mark also records a little of what surrounded it, and
 * resolution scores each candidate occurrence by how much of that context still
 * matches. This is the shape the W3C text-quote selector settled on, for the
 * same reason.
 *
 * An article an admin has since edited may no longer contain the phrase at all.
 * That is reported — `resolveAnchor` returns null — rather than papered over,
 * because a mark whose text has gone is a thing the student should be told
 * about and offered, not one that should quietly disappear.
 */

/** How much of either side is kept. Enough to separate repeats, short enough to survive an edit nearby. */
const CONTEXT = 32

export interface TextAnchor {
  /**
   * Which run of text in the article this belongs to.
   *
   * Opaque here: the reader assigns them ("summary", "block:3", "hold:1") and
   * only has to be consistent with itself between renders.
   */
  block: string
  /** The selected words, exactly as they appeared. */
  exact: string
  /** Up to `CONTEXT` characters before the selection. */
  prefix: string
  /** Up to `CONTEXT` characters after it. */
  suffix: string
}

export interface TextRange {
  start: number
  end: number
}

/** Build an anchor for the range `[start, end)` of a block's text. */
export function makeAnchor(block: string, text: string, start: number, end: number): TextAnchor | null {
  if (start < 0 || end > text.length || end <= start) return null
  const exact = text.slice(start, end)
  if (!exact.trim()) return null
  return {
    block,
    exact,
    prefix: text.slice(Math.max(0, start - CONTEXT), start),
    suffix: text.slice(end, Math.min(text.length, end + CONTEXT)),
  }
}

/** How many characters two strings share, reading inward from the given ends. */
function commonRun(a: string, b: string, fromEnd: boolean): number {
  const limit = Math.min(a.length, b.length)
  let run = 0
  while (run < limit) {
    const left = fromEnd ? a[a.length - 1 - run] : a[run]
    const right = fromEnd ? b[b.length - 1 - run] : b[run]
    if (left !== right) break
    run += 1
  }
  return run
}

/** Every index at which `needle` occurs in `haystack`, including overlaps. */
function occurrences(haystack: string, needle: string): number[] {
  const found: number[] = []
  let at = haystack.indexOf(needle)
  while (at !== -1) {
    found.push(at)
    at = haystack.indexOf(needle, at + 1)
  }
  return found
}

/**
 * Where this anchor sits in the text now, or null if its words have gone.
 *
 * When the phrase occurs more than once, the occurrence whose surroundings
 * still match best wins — which is what makes a mark on the second "the left
 * ventricle" in a paragraph stay on the second one.
 *
 * The case-insensitive pass is a deliberate second choice, not a fallback for
 * everything: an editor recasing a sentence should not lose a student's
 * highlight, but a different phrase that merely differs in case is a different
 * phrase, so exact matches are always preferred when any exist.
 */
export function resolveAnchor(text: string, anchor: TextAnchor): TextRange | null {
  if (!anchor.exact) return null

  let starts = occurrences(text, anchor.exact)
  let length = anchor.exact.length
  if (!starts.length) {
    const lowered = text.toLocaleLowerCase()
    starts = occurrences(lowered, anchor.exact.toLocaleLowerCase())
    length = anchor.exact.length
  }
  if (!starts.length) return null
  if (starts.length === 1) return { start: starts[0], end: starts[0] + length }

  let best = starts[0]
  let bestScore = -1
  for (const start of starts) {
    const score = commonRun(text.slice(0, start), anchor.prefix, true)
      + commonRun(text.slice(start + length), anchor.suffix, false)
    if (score > bestScore) {
      bestScore = score
      best = start
    }
  }
  return { start: best, end: best + length }
}

export interface Segment<T> extends TextRange {
  value: T
}

/**
 * Order segments and drop the ones that overlap something already kept.
 *
 * A phrase can only be rendered once, and two marks — or a mark and an anchored
 * figure — may lay claim to overlapping words. First by position wins, which is
 * the rule the media matcher already used, so the two agree.
 */
export function orderedSegments<T>(segments: Segment<T>[]): Segment<T>[] {
  const sorted = [...segments].sort((a, b) => a.start - b.start || b.end - a.end)
  const kept: Segment<T>[] = []
  let cursor = 0
  for (const segment of sorted) {
    if (segment.start < cursor || segment.end <= segment.start) continue
    kept.push(segment)
    cursor = segment.end
  }
  return kept
}
