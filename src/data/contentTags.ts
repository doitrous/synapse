import type { ManagedContentItem } from './contentControl.ts'

/** One canonical display value without allowing invisible duplicate labels. */
export function normalizeContentTag(value: string): string {
  return value.trim().replace(/\s+/g, ' ')
}

/** Case-insensitive tag identity while preserving the first authored spelling. */
export function uniqueContentTags(values: readonly string[]): string[] {
  const seen = new Set<string>()
  const result: string[] = []
  for (const value of values) {
    const display = normalizeContentTag(value)
    const key = display.toLocaleLowerCase()
    if (!display || seen.has(key)) continue
    seen.add(key)
    result.push(display)
  }
  return result
}

export function contentTagsOf(item: Pick<ManagedContentItem, 'editorialTags'>): string[] {
  return uniqueContentTags(item.editorialTags ?? [])
}

/** All labels available to reuse, ordered for a predictable picker. */
export function availableContentTags(items: readonly ManagedContentItem[]): string[] {
  return uniqueContentTags(items.flatMap((item) => item.editorialTags ?? []))
    .sort((left, right) => left.localeCompare(right, undefined, { sensitivity: 'base' }))
}

/** Add labels without replacing any metadata another editor already recorded. */
export function addContentTags(
  item: ManagedContentItem,
  tags: readonly string[],
  updatedAt: string,
): ManagedContentItem {
  const editorialTags = uniqueContentTags([...(item.editorialTags ?? []), ...tags])
  const before = contentTagsOf(item)
  if (editorialTags.length === before.length && editorialTags.every((tag, index) => tag === before[index])) return item
  return { ...item, editorialTags, updatedAt }
}
