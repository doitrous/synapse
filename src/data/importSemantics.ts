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

export interface ListDirective {
  mode: ListMode
  items: string[]
}

const CLEAR = /^\[clear\]$/i

/** Split on new lines, pipes and semicolons — the importer's list separators. */
export function splitList(value: string): string[] {
  return value.split(/\r?\n|\||;/).map((item) => item.trim()).filter(Boolean)
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
export function applyListDirective(directive: ListDirective, existing: string[] | undefined): string[] | undefined {
  const current = existing ?? []
  switch (directive.mode) {
    case 'untouched': return existing
    case 'clear': return []
    case 'replace': return directive.items
    case 'append': return [...current, ...directive.items.filter((item) => !current.includes(item))]
  }
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
