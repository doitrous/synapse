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
import { applyListDirective, isAppend } from './importSemantics.ts'

type Dict = Record<string, unknown>

const isPlainObject = (value: unknown): value is Dict =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

/**
 * Merge one authoring-data object.
 *
 * Nested plain objects merge key-by-key, so `fieldNotes` and `calloutEvidence`
 * accumulate rather than being replaced by whatever subset this row carried.
 *
 * Arrays are final by the time they arrive — with one exception. A `+` cell
 * means "add to whatever is already there", which no row parser can resolve,
 * because resolving it needs the record being updated and this is the first
 * place that record is in hand. So an array still carrying its append intent is
 * resolved here, against the existing value, by the same `applyListDirective`
 * that defines what append means everywhere else.
 */
export function mergeAuthoringData<T extends Dict | undefined>(existing: T, incoming: T): T {
  if (!incoming) return existing
  if (!existing) return incoming
  const out: Dict = { ...existing }
  for (const [key, value] of Object.entries(incoming)) {
    if (value === undefined) continue
    const current = out[key]
    if (isAppend(value)) {
      // Anything other than a list to append onto — a null, a field that used to
      // hold something else — starts from empty rather than throwing away the row.
      const base = Array.isArray(current) ? current as unknown[] : []
      out[key] = applyListDirective({ mode: 'append', items: value as unknown[] }, base)
      continue
    }
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
  // The audit distinguishes a field that is absent from one that is empty on
  // purpose, so every optional key is written even when it has no value —
  // as `null`, not `undefined`, because `JSON.stringify` drops the latter and
  // the key would vanish the moment the record was persisted.
  const present = [
    'publishedSections', 'publishedSummary', 'subtopicId', 'microtopicId', 'nanotopicId',
    'universityNotes', 'mediaRequests', 'calloutEvidence', 'fieldNotes',
    'lastReviewed', 'reviewDue', 'arabicTitle', 'notes',
  ]
  const filled: Dict = { ...data }
  for (const key of required) if (filled[key] === undefined) filled[key] = []
  for (const key of present) if (filled[key] === undefined) filled[key] = null
  return { ...item, articleData: filled as unknown as ManagedContentItem['articleData'] }
}
