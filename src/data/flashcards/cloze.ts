/**
 * Cloze notes: one block of text, `{{c1::hidden}}` markup, many cards.
 *
 * `Hyperplasia is {{c1::proliferation}} of {{c2::cells}}.` is two cards that
 * share a front. Every *distinct* cloze number is its own card; two deletions
 * that reuse `c1` are the same card, hidden together. That rule is the whole
 * reason a card's identity is its cloze *number* (`templateKey = 'c1'`), not its
 * position in the text — inserting a new deletion ahead of it must not renumber
 * it and orphan its schedule.
 *
 * The parse is pure and total: malformed input yields a validation error, never
 * a thrown exception mid-keystroke, because this runs live under the editor as
 * the student types.
 *
 * The source is **sanitized HTML** (the cloze field is the same rich surface as
 * every other field), but the `{{cN::…}}` markers themselves are plain text —
 * they pass through `sanitizeRich` untouched — so the parse only ever matches
 * markers in text, never inside a tag. A run of literal text and a deletion's
 * content are therefore HTML fragments, returned as-is with whatever inline
 * markup surrounds or sits inside them; the caller renders them through the same
 * sanitizing HTML renderer as the extra field. A deletion that spans a tag
 * boundary (`<b>The {{c1::mitral</b> valve}}`) yields a fragment with an
 * unbalanced tag — `sanitizeRich` balances each fragment on render, so the cell
 * is still safe and still readable. A legacy note whose text is plain (no tags
 * at all) tokenizes byte-identically to the pre-HTML parser.
 */

import { decodeEntities, isLegacyPlainText, isRichEmpty } from './richText.ts'

export type ClozeToken =
  | { type: 'text'; text: string }
  | { type: 'cloze'; number: number; content: string; hint: string | null }

/** A tag or comment: opaque to the cloze scanner, never searched for markers. */
const HTML_TOKEN_RE = /<!--[\s\S]*?-->|<[^>]*>/g

const CLOZE_RE = /\{\{c(\d+)::([\s\S]*?)(?:::([\s\S]*?))?\}\}/g

/**
 * The text projection of an HTML string: every character *not* inside a tag,
 * plus `map`, the index in `html` each projected character came from. Markers
 * are matched against the projection, then sliced back out of `html` through
 * `map`, which is what keeps inline markup attached to the fragment it belongs
 * to instead of being swallowed by the neighbouring token.
 *
 * For a string with no tags the projection is the string and `map` is the
 * identity, so every offset below reduces to the plain-text arithmetic the
 * parser used before rich cloze text existed. A *legacy* value short-circuits
 * to exactly that: it holds no tag and no entity, so every `<` in it is a
 * literal the student typed and `a < b && c > d` must not lose ` b && c ` to a
 * scanner that reads `< … >` as a tag.
 */
function textProjection(html: string): { text: string; map: number[] } {
  if (isLegacyPlainText(html)) {
    return { text: html, map: Array.from({ length: html.length }, (_, i) => i) }
  }
  const chars: string[] = []
  const map: number[] = []
  const take = (from: number, to: number) => {
    for (let i = from; i < to; i++) {
      chars.push(html[i])
      map.push(i)
    }
  }
  let last = 0
  let match: RegExpExecArray | null
  HTML_TOKEN_RE.lastIndex = 0
  while ((match = HTML_TOKEN_RE.exec(html)) !== null) {
    take(last, match.index)
    last = HTML_TOKEN_RE.lastIndex
  }
  take(last, html.length)
  return { text: chars.join(''), map }
}

/** The visible characters of an HTML fragment, whitespace left exactly as-is. */
function fragmentText(html: string): string {
  return decodeEntities(textProjection(html).text)
}

/**
 * Split cloze text into literal runs and deletions. A deletion is
 * `{{cN::content}}` or `{{cN::content::hint}}`; the first `::` after the number
 * ends the content, an optional second `::` begins the hint. Non-greedy so
 * adjacent deletions don't swallow each other. Anything that doesn't match the
 * shape is left as literal text and surfaces in `validateCloze`.
 *
 * Runs and contents are HTML fragments (see the module note). Boundaries are
 * taken from the marker characters themselves, so a tag that sits between `::`
 * and the first content character belongs to the content, and a tag after `}}`
 * belongs to the following text run.
 */
export function tokenizeCloze(source: string): ClozeToken[] {
  const { text: plain, map } = textProjection(source)
  const tokens: ClozeToken[] = []
  let last = 0
  let match: RegExpExecArray | null
  CLOZE_RE.lastIndex = 0

  while ((match = CLOZE_RE.exec(plain)) !== null) {
    // Marker characters are text, so every index below maps back exactly.
    const openAt = map[match.index]
    const closeEnd = map[match.index + match[0].length - 1] + 1
    if (openAt > last) tokens.push({ type: 'text', text: source.slice(last, openAt) })

    // `{{` + `c` + digits + `::` — the content starts right after that.
    const contentStart = match.index + 3 + match[1].length + 2
    const contentEnd = contentStart + match[2].length
    const content = source.slice(map[contentStart - 1] + 1, map[contentEnd])

    let hint: string | null = null
    if (match[3] !== undefined) {
      const hintStart = contentEnd + 2
      hint = source.slice(map[hintStart - 1] + 1, map[hintStart + match[3].length])
    }

    tokens.push({ type: 'cloze', number: Number(match[1]), content, hint })
    last = closeEnd
  }

  if (last < source.length) tokens.push({ type: 'text', text: source.slice(last) })
  return tokens
}

/** The distinct cloze numbers present, ascending. Each becomes one card. */
export function clozeNumbers(text: string): number[] {
  const seen = new Set<number>()
  for (const token of tokenizeCloze(text)) {
    if (token.type === 'cloze') seen.add(token.number)
  }
  return [...seen].sort((a, b) => a - b)
}

export type ClozeError = 'no-cloze' | 'empty-deletion' | 'unbalanced' | 'zero-number'

export interface ClozeValidation {
  ok: boolean
  errors: ClozeError[]
}

/**
 * Whether the text would generate valid cards. Empty deletions (`{{c1::}}`),
 * `c0`, a stray unbalanced `{{`, or no deletion at all are each rejected before
 * a save so a note can never generate a card with nothing to hide.
 */
export function validateCloze(text: string): ClozeValidation {
  const errors = new Set<ClozeError>()
  const tokens = tokenizeCloze(text)
  const clozes = tokens.filter((t): t is Extract<ClozeToken, { type: 'cloze' }> => t.type === 'cloze')

  if (clozes.length === 0) errors.add('no-cloze')
  for (const cloze of clozes) {
    // `isRichEmpty` rather than a `trim()`: a deletion holding only `<b></b>`
    // hides nothing, while one holding only an `<img>` legitimately does.
    if (isRichEmpty(cloze.content)) errors.add('empty-deletion')
    if (cloze.number === 0) errors.add('zero-number')
  }
  // A `{{` or `}}` left over in the literal runs is an unclosed deletion. Only
  // the *text* of a run counts — braces inside a tag's attributes are markup.
  for (const token of tokens) {
    if (token.type !== 'text') continue
    const text = fragmentText(token.text)
    if (text.includes('{{') || text.includes('}}')) errors.add('unbalanced')
  }

  return { ok: errors.size === 0, errors: [...errors] }
}

/**
 * The cloze number the editor should reach for next: one past the highest in
 * use, or 1 for empty text. The student can still overwrite it — reusing an
 * existing number to fold a new deletion into an existing card is a legitimate
 * choice the editor must not fight.
 */
export function nextClozeNumber(text: string): number {
  const numbers = clozeNumbers(text)
  return numbers.length === 0 ? 1 : Math.max(...numbers) + 1
}

/**
 * Wrap a selection in cloze markup, or insert an empty deletion when there is
 * no selection, returning the new text and where the caret should land. With no
 * selection the caret goes *inside* the deletion, right after `::`, so the
 * student types straight into it.
 *
 * String offsets, so this is the path for a plain-text caller. The rich editor
 * has a DOM selection instead of offsets and inserts the two markers as text
 * nodes around it (`RichField`), taking only the number from `nextClozeNumber`
 * — which reads the same HTML this parser does.
 */
export function insertCloze(
  text: string,
  selStart: number,
  selEnd: number,
  numberOverride?: number,
): { text: string; caret: number } {
  const number = numberOverride ?? nextClozeNumber(text)
  const selected = text.slice(selStart, selEnd)
  const before = text.slice(0, selStart)
  const after = text.slice(selEnd)
  if (selected === '') {
    const open = `{{c${number}::`
    return { text: `${before}${open}}}${after}`, caret: before.length + open.length }
  }
  const wrapped = `{{c${number}::${selected}}}`
  return { text: `${before}${wrapped}${after}`, caret: before.length + wrapped.length }
}

/**
 * One rendered piece of a cloze card's face. `text` and `hint` are HTML
 * fragments — the caller renders them through the sanitizing HTML renderer it
 * already uses for the extra field, never as a raw text node, or a deletion's
 * bold would show up as literal `<b>` on the card.
 */
export type ClozeCell =
  | { kind: 'text'; text: string }
  | { kind: 'blank'; hint: string | null }
  | { kind: 'answer'; text: string }

/**
 * Render one side of the card for `activeNumber`. On the front the active
 * deletion is a blank (showing its hint if it has one) and every other deletion
 * is revealed in place; on the back the active deletion is revealed too.
 * Deletions that share the active number all become blanks together — that is
 * what "same number, same card" means at render time.
 */
export function renderClozeSide(text: string, activeNumber: number, side: 'front' | 'back'): ClozeCell[] {
  const cells: ClozeCell[] = []
  for (const token of tokenizeCloze(text)) {
    if (token.type === 'text') {
      cells.push({ kind: 'text', text: token.text })
      continue
    }
    if (token.number !== activeNumber) {
      cells.push({ kind: 'text', text: token.content })
      continue
    }
    cells.push(side === 'front' ? { kind: 'blank', hint: token.hint } : { kind: 'answer', text: token.content })
  }
  return cells
}

/**
 * Plain, markup-free text of a cloze note, for search and duplicate checks:
 * the deletions revealed, the `{{c…}}` markup gone, and — now that the field is
 * rich — the HTML tags gone too, so `<b>Heart</b>` and `Heart` still collide in
 * `noteDuplicateSignature`. Whitespace is left exactly as authored (callers
 * normalize it themselves), which keeps the output byte-identical to the
 * plain-text era for a legacy note.
 */
export function clozePlainText(text: string): string {
  return tokenizeCloze(text)
    .map((token) => (token.type === 'text' ? token.text : token.content))
    .map(fragmentText)
    .join('')
}
