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
 * the student types. Rendering a card returns structured cells, not HTML, so the
 * study screen owns the markup and this stays testable as data.
 */

export type ClozeToken =
  | { type: 'text'; text: string }
  | { type: 'cloze'; number: number; content: string; hint: string | null }

/**
 * Split cloze text into literal runs and deletions. A deletion is
 * `{{cN::content}}` or `{{cN::content::hint}}`; the first `::` after the number
 * ends the content, an optional second `::` begins the hint. Non-greedy so
 * adjacent deletions don't swallow each other. Anything that doesn't match the
 * shape is left as literal text and surfaces in `validateCloze`.
 */
export function tokenizeCloze(text: string): ClozeToken[] {
  const tokens: ClozeToken[] = []
  const re = /\{\{c(\d+)::([\s\S]*?)(?:::([\s\S]*?))?\}\}/g
  let last = 0
  let match: RegExpExecArray | null
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) tokens.push({ type: 'text', text: text.slice(last, match.index) })
    tokens.push({
      type: 'cloze',
      number: Number(match[1]),
      content: match[2],
      hint: match[3] === undefined ? null : match[3],
    })
    last = re.lastIndex
  }
  if (last < text.length) tokens.push({ type: 'text', text: text.slice(last) })
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
    if (cloze.content.trim() === '') errors.add('empty-deletion')
    if (cloze.number === 0) errors.add('zero-number')
  }
  // A `{{` or `}}` left over in the literal runs is an unclosed deletion.
  for (const token of tokens) {
    if (token.type === 'text' && (token.text.includes('{{') || token.text.includes('}}'))) {
      errors.add('unbalanced')
    }
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

/** One rendered piece of a cloze card's face. */
export type ClozeCell =
  | { kind: 'text'; text: string }
  | { kind: 'blank'; hint: string | null }
  | { kind: 'answer'; text: string }

/**
 * Render one side of the card for `activeNumber`. On the front the active
 * deletion is a blank (showing its hint if it has one) and every other deletion
 * is revealed as plain text; on the back the active deletion is revealed too.
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

/** Plain, markup-free text of a cloze note, for search and duplicate checks. */
export function clozePlainText(text: string): string {
  return tokenizeCloze(text)
    .map((token) => (token.type === 'text' ? token.text : token.content))
    .join('')
}
