/**
 * How an update import combines with the record it is updating.
 *
 * The old rule was a shallow spread: `{ ...existing, ...imported }`. That is
 * correct for a full re-export and destructive for anything else, because the
 * incoming `articleData` replaced the existing one wholesale — so an import that
 * only meant to fix a title also erased every annotation, evidence link and
 * governance field the author had not re-typed.
 *
 * The rule now is: a value the import did not mention survives. The importer
 * signals "did not mention" with `undefined` (see `optionalList`), and an author
 * who genuinely wants a field emptied writes `[clear]`.
 */

import type { ManagedContentItem } from './contentControl.ts'

type Dict = Record<string, unknown>

const isPlainObject = (value: unknown): value is Dict =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

/**
 * Merge one authoring-data object.
 *
 * Nested plain objects merge key-by-key, so `fieldNotes` and `calloutEvidence`
 * accumulate rather than being replaced by whatever subset this row carried.
 * Arrays do not merge element-wise: the importer already resolved append versus
 * replace before this point, so an array that arrives here is final.
 */
export function mergeAuthoringData<T extends Dict | undefined>(existing: T, incoming: T): T {
  if (!incoming) return existing
  if (!existing) return incoming
  const out: Dict = { ...existing }
  for (const [key, value] of Object.entries(incoming)) {
    if (value === undefined) continue
    const current = out[key]
    out[key] = isPlainObject(value) && isPlainObject(current) ? { ...current, ...value } : value
  }
  return out as T
}

/** Keep the existing string when the import carried nothing for it. */
const preferIncoming = (incoming: string | undefined, existing: string) => incoming?.trim() ? incoming : existing

/**
 * Combine an imported row with the record it updates.
 *
 * `overrideEmpty` is the explicit escape hatch: the author has said the file is
 * authoritative and blanks in it mean blanks. It is off by default, and the
 * import screen states what it does before the author confirms.
 */
export function mergeContentItem(
  existing: ManagedContentItem,
  incoming: ManagedContentItem,
  overrideEmpty: boolean,
): ManagedContentItem {
  if (overrideEmpty) return incoming

  const fields = { ...existing.fields }
  for (const [key, value] of Object.entries(incoming.fields)) {
    if (value.trim()) fields[key] = value
  }

  return {
    ...existing,
    ...incoming,
    title: preferIncoming(incoming.title, existing.title),
    subjectId: preferIncoming(incoming.subjectId, existing.subjectId),
    fields,
    articleData: mergeAuthoringData(existing.articleData as unknown as Dict | undefined, incoming.articleData as unknown as Dict | undefined) as unknown as ManagedContentItem['articleData'],
    questionData: mergeAuthoringData(existing.questionData as unknown as Dict | undefined, incoming.questionData as unknown as Dict | undefined) as unknown as ManagedContentItem['questionData'],
    practicalData: mergeAuthoringData(existing.practicalData as unknown as Dict | undefined, incoming.practicalData as unknown as Dict | undefined) as unknown as ManagedContentItem['practicalData'],
    resourceData: mergeAuthoringData(existing.resourceData as unknown as Dict | undefined, incoming.resourceData as unknown as Dict | undefined) as unknown as ManagedContentItem['resourceData'],
  }
}

/**
 * Fill in the arrays a brand-new record must have.
 *
 * The audit distinguishes "empty on purpose" from "missing", and treats an
 * absent array as an error. A created record therefore materialises every list
 * the contract requires, even when the import mentioned none of them.
 */
export function materialiseNewItem(item: ManagedContentItem): ManagedContentItem {
  if (item.kind !== 'article' || !item.articleData) return item
  const data = item.articleData as unknown as Dict
  const required = [
    'holdThese', 'loseTheMark', 'questionIds', 'resourceIds', 'annotations', 'universityIds',
    'yearIds', 'moduleIds', 'relatedConceptIds', 'relatedArticleIds', 'secondaryNodeIds',
    'evidenceBasis', 'articleLevelSourceIds', 'claimIds', 'spanIds', 'conflicts', 'evidenceGaps', 'media', 'aliases',
  ]
  const filled: Dict = { ...data }
  for (const key of required) if (filled[key] === undefined) filled[key] = []
  return { ...item, articleData: filled as unknown as ManagedContentItem['articleData'] }
}
