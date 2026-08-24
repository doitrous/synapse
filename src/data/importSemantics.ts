/**
 * How an imported cell changes a list that already has values.
 *
 * A spreadsheet cell cannot say "leave this alone but add one item", so the
 * intent has to be written into the value. Three directives cover every case an
 * author needs, and the default is the least surprising one:
 *
 *   Aspirin | Ticagrelor     replace the list with exactly these
 *   +Prasugrel                append, keeping what is already there
 *   [clear]                   empty the list
 *   (blank cell)              leave the existing list untouched
 *
 * The last line is the important one. Before this, an absent column and an empty
 * column were indistinguishable, so a partial update could silently wipe nested
 * data an author never intended to touch.
 */

export type ListMode = 'replace' | 'append' | 'clear' | 'untouched'

export interface ListDirective<T = string> {
  mode: ListMode
  items: T[]
}

const CLEAR = /^\[clear\]$/i

/**
 * Split on new lines, pipes and semicolons — the importer's list separators.
 *
 * A leading `+` is stripped from every item, not only from the first.
 *
 * `+` marks the *cell* as an append, and `listDirective` removes it by slicing
 * one character off the front before splitting. That is correct for a cell of
 * one item and wrong for every other: `+A | +B` appended `A` and then stored
 * the literal string `+B`, and `+A\n+B` did the same, so the "one item per
 * line" workaround did not avoid it. The stored list held an ID no record has,
 * silently, and nothing downstream could tell it from a real one.
 *
 * Stripping here rather than in `listDirective` fixes both separators and both
 * modes at once, and a leading `+` on a stored value is never legitimate: no
 * concept, article, claim or resource ID begins with one.
 */
export function splitList(value: string): string[] {
  return value
    .split(/\r?\n|\||;/)
    .map((item) => item.trim().replace(/^\+\s*/, '').trim())
    .filter(Boolean)
}

/** Read one cell as a list instruction. */
export function listDirective(value: string | undefined): ListDirective {
  if (value === undefined) return { mode: 'untouched', items: [] }
  const trimmed = value.trim()
  if (!trimmed) return { mode: 'untouched', items: [] }
  if (CLEAR.test(trimmed)) return { mode: 'clear', items: [] }
  if (trimmed.startsWith('+')) return { mode: 'append', items: splitList(trimmed.slice(1)) }
  return { mode: 'replace', items: splitList(trimmed) }
}

/**
 * Apply a directive to the list an item already has.
 *
 * Append de-duplicates, so re-importing the same file twice is idempotent rather
 * than doubling every list.
 */
export function applyListDirective<T>(directive: ListDirective<T>, existing: T[] | undefined): T[] | undefined {
  const current = existing ?? []
  switch (directive.mode) {
    case 'untouched': return existing
    case 'clear': return []
    case 'replace': return directive.items
    case 'append': return [...current, ...directive.items.filter((item) => !current.includes(item))]
  }
}

/**
 * Append is the one directive whose result depends on the record being updated.
 *
 * The other three are constants: "untouched" is `undefined`, "clear" is `[]`,
 * "replace" is the items themselves. A row parser can produce all three without
 * ever seeing the existing record — and it never does see one. Append cannot be
 * resolved that way, so the parser carries the *intent* forward and the merge,
 * which does hold the existing record, finishes the job with `applyListDirective`.
 *
 * The intent rides along as a non-enumerable symbol on the array itself, so the
 * list stays an ordinary array to every reader that does not care: `.length`,
 * `.map`, spread and `JSON.stringify` all behave exactly as before, and because
 * `JSON.stringify` ignores symbol keys the marker can never reach stored data.
 *
 * `Symbol.for` rather than a module-local symbol: if this module is ever loaded
 * twice under different specifiers, a local symbol would silently stop matching
 * and append would quietly go back to replacing — the very bug this fixes.
 */
const APPEND = Symbol.for('synapse.import.appendList')

/** Tag a parsed list as "add these", for the merge to resolve later. */
export function markAppend<T>(items: T[]): T[] {
  return Object.defineProperty(items, APPEND, { value: true, enumerable: false })
}

/** Was this list parsed from a `+` cell? */
export function isAppend(value: unknown): boolean {
  return Array.isArray(value) && (value as unknown as Record<symbol, unknown>)[APPEND] === true
}

/**
 * Re-read a parsed list as another element type, keeping its append intent.
 *
 * `learnerYears` converts to numbers on the way out of the row. A bare `.map()`
 * returns a new, unmarked array, which would silently downgrade `+4` to a
 * replace — so any transform of a parsed list has to go through here.
 */
export function mapList<T>(list: string[] | undefined, transform: (items: string[]) => T[]): T[] | undefined {
  if (list === undefined) return undefined
  const mapped = transform(list)
  return isAppend(list) ? markAppend(mapped) : mapped
}

/** Read one cell as a list, ignoring what exists. Use for create-time defaults. */
export function importList(value: string | undefined): string[] {
  const directive = listDirective(value)
  return directive.mode === 'untouched' || directive.mode === 'clear' ? [] : directive.items
}

/**
 * Read one cell as a list, distinguishing "not mentioned" from "empty".
 *
 * `undefined` means the column was absent or blank, so an update leaves the
 * existing list alone. `[]` means the author explicitly wrote `[clear]`. Without
 * this distinction a partial update silently wipes every list it did not
 * re-type.
 */
export function optionalList(value: string | undefined): string[] | undefined {
  const directive = listDirective(value)
  if (directive.mode === 'untouched') return undefined
  if (directive.mode === 'clear') return []
  if (directive.mode === 'append') return markAppend(directive.items)
  return directive.items
}

/**
 * Merge one nested object field.
 *
 * `undefined` on the incoming side means the column was absent or blank, so the
 * existing value survives. This is what stops a partial update from erasing
 * governance or evidence an author did not re-type.
 */
export function mergeOptional<T>(incoming: T | undefined, existing: T | undefined): T | undefined {
  return incoming === undefined ? existing : incoming
}
