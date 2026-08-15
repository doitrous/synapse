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
import { emptyPracticalCommon } from './contentControl.ts'
import { applyListDirective, isAppend } from './importSemantics.ts'

type Dict = Record<string, unknown>

const isPlainObject = (value: unknown): value is Dict =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

/**
 * Merge one authoring-data object.
 *
 * Nested plain objects merge key-by-key, so `fieldNotes` and `calloutEvidence`
 * accumulate rather than being replaced by whatever subset this row carried.
 * Arrays are final by the time they arrive — with one exception. A `+` cell
 * means "add to whatever is already there", which no row parser can resolve,
 * because resolving it needs the record being updated and this is the first
 * place that record is in hand. So an array still carrying its append intent is
 * resolved here, against the existing value, by the same `applyListDirective`
 * that defines what append means everywhere else.
 *
 * The nested case recurses rather than spreading. A spread does not skip
 * `undefined`, so `{ ...current, ...value }` wrote a blank over every key the
 * row had not mentioned — one level down, where the top-level guard could not
 * see it. That is what emptied a question's `tags.questionType`,
 * `tags.clinicalRelevance` and `tags.examWeightByYear` on any partial update.
 * Recursing also carries the append rule to every depth.
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
    out[key] = isPlainObject(value) && isPlainObject(current) ? mergeAuthoringData(current, value) : value
  }
  return out as T
}

/** Keep the existing string when the import carried nothing for it. */
const preferIncoming = (incoming: string | undefined, existing: string) => incoming?.trim() ? incoming : existing

/** Only the keys the import actually carried. A key left `undefined` is not a value. */
const defined = <T extends object>(value: T): Partial<T> =>
  Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined)) as Partial<T>

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
  // Even an authoritative file gets the create-time defaults filled in, because
  // the importer no longer bakes them into every row it reads.
  if (overrideEmpty) return materialiseNewItem(incoming)

  const fields = { ...existing.fields }
  for (const [key, value] of Object.entries(incoming.fields)) {
    if (value.trim()) fields[key] = value
  }

  return {
    ...existing,
    // Spreading `incoming` whole would copy its `undefined`s over live values —
    // a spread does not skip them — and `undefined` is precisely how the
    // importer says "this row did not mention the field".
    ...defined(incoming),
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
 * Apply imported records to a keyed collection, deciding create versus update
 * *before* anything is materialised.
 *
 * The ordering is the whole point. `materialise` fills in what a brand-new
 * record must carry — the `null`s and empty lists the field audit reads as
 * "empty on purpose" rather than "missing". Every one of those defaults is a
 * concrete value, and `merge` skips only `undefined`. So materialising an
 * *update* hands the merge a full set of blanks that then land on top of the
 * live values the row never mentioned: a three-field concept update used to
 * rewrite twenty fields that way, five of them with no audit diagnostic at all.
 *
 * Passing `materialise` to this function rather than mapping it over the
 * incoming rows is what keeps the two apart. A row that creates a record and a
 * later row that updates it behave correctly in one batch too, because the
 * second finds the already-materialised record and merges into it.
 */
export function upsertRecords<T extends { id: string }>(
  existing: T[],
  incoming: T[],
  { merge, materialise }: { merge?: (current: T, next: T) => T; materialise?: (record: T) => T } = {},
): { records: T[]; created: number; updated: number } {
  const byId = new Map(existing.map((record) => [record.id, record]))
  let created = 0
  let updated = 0
  for (const record of incoming) {
    const current = byId.get(record.id)
    if (current) {
      byId.set(record.id, merge ? merge(current, record) : { ...current, ...record })
      updated += 1
    } else {
      byId.set(record.id, materialise ? materialise(record) : record)
      created += 1
    }
  }
  return { records: [...byId.values()], created, updated }
}

/**
 * Fill in what a brand-new record must have.
 *
 * The audit distinguishes "empty on purpose" from "missing", and treats an
 * absent array as an error. A created record therefore materialises every list
 * the contract requires, even when the import mentioned none of them.
 *
 * It also supplies the record's opening state — `Draft`, an owner, a reading
 * time, a high-yield band. Those used to be written by `importRowToContent` on
 * every row it read, updates included, so a partial update reset the lot: the
 * worst of them silently un-published a live article. They belong here, where
 * they reach creates only.
 *
 * Create-time only. Pass it to `upsertRecords` as `materialise`; never map it
 * over rows that may be updates.
 */
export function materialiseNewItem(item: ManagedContentItem): ManagedContentItem {
  const created: ManagedContentItem = {
    ...item,
    status: item.status ?? 'Draft',
    owner: item.owner ?? 'Import queue',
  }
  if (created.kind === 'question' && created.questionData) return materialiseNewQuestion(created)
  if (created.kind === 'practical' && created.practicalData) return materialiseNewPractical(created)
  if (created.kind !== 'article' || !created.articleData) return created
  const data = created.articleData as unknown as Dict
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
  // `universityNotes` sits on the `present` list above, so an unmentioned column
  // lands as `null` there; a new article wants the empty list instead.
  if (filled.universityNotes === null) filled.universityNotes = []
  if (filled.highYield === undefined) filled.highYield = 'Core'
  return {
    ...created,
    fields: {
      'Reading time': '5',
      'Content owner': created.owner,
      ...created.fields,
    },
    articleData: filled as unknown as ManagedContentItem['articleData'],
  }
}

/**
 * The opening state of a new question.
 *
 * Every one of these used to be written by `importRowToContent` on every row it
 * read. On an update that meant a revised vignette also reset the question's
 * whole blueprint tagging — difficulty, cognitive effort, setting, reasoning
 * level, exam relevance — and emptied every concept, year, university and
 * article it was scoped to: twenty-nine fields from a two-line edit.
 *
 * `module` is the one default that depends on the item, falling back to the
 * subject when the row names no module.
 */
const NEW_QUESTION_TAGS: Dict = {
  topic: '', subtopic: '',
  conceptIds: [], years: [], universityIds: [], contextualConceptIds: [],
  mainConceptIds: [], moduleIds: [], questionOnlyFor: [],
  cognitiveEffort: 'Medium', setting: 'Both', intendedDifficulty: 'Moderate',
  clinicalReasoningLevel: 2, inferredDifficulty: 50, examRelevance: 5,
  examWeightByYear: {},
}

const NEW_QUESTION_DATA: Dict = {
  attachments: [], attachedImage: '', libraryIds: [], resourceIds: [], mediaRequests: [],
  learningObjective: '', authorNotes: '', sourceCitation: '',
  estimatedSeconds: 90, randomiseAnswers: true,
}

function materialiseNewQuestion(created: ManagedContentItem): ManagedContentItem {
  const data = created.questionData as unknown as Dict
  return {
    ...created,
    fields: { Difficulty: 'Moderate', ...defined(created.fields) },
    questionData: {
      ...NEW_QUESTION_DATA,
      ...defined(data),
      tags: { module: created.subjectId, ...NEW_QUESTION_TAGS, ...defined((data.tags ?? {}) as Dict) },
    } as unknown as ManagedContentItem['questionData'],
  }
}

/**
 * The opening state of a new practical.
 *
 * `emptyPracticalCommon` used to be spread inside `practicalDataFrom`, which
 * runs for updates too, so a corrected learning objective also erased the
 * station's references and its entire concept tagging. The format-specific
 * blocks below carry the same risk: an empty mark scheme is indistinguishable
 * from an unmentioned one once it has been written.
 */
const NEW_PRACTICAL_BY_FORMAT: Record<string, Dict> = {
  case: { decisions: [], debrief: '' },
  lab: { questions: [] },
  osce: { candidateInstructions: '', actorOpening: '', actorSections: [], actorFlags: [], markSections: [] },
}

function materialiseNewPractical(created: ManagedContentItem): ManagedContentItem {
  const data = created.practicalData as unknown as Dict
  const tags = (data.conceptTags ?? {}) as Dict
  return {
    ...created,
    fields: { Type: 'OSCE station', Duration: '8', Marks: '20', Difficulty: 'Moderate', ...defined(created.fields) },
    practicalData: {
      ...emptyPracticalCommon(),
      ...NEW_PRACTICAL_BY_FORMAT[data.format as string],
      ...defined(data),
      conceptTags: { mainConceptIds: [], conceptIds: [], contextualConceptIds: [], ...defined(tags) },
    } as unknown as ManagedContentItem['practicalData'],
  }
}
