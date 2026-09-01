/**
 * Does every concept in a batch answer both of the audit's questions?
 *
 *   node --experimental-strip-types scripts/kasr/check-concept-presence.mjs docs/Kasr-Source-Imports/concept/*.md
 *
 * `medical:audit` asks two different things of a concept, and a batch can
 * satisfy one while failing the other:
 *
 *   conceptPopulated — does the field carry a value, or a `field_notes` reason?
 *   conceptPresent   — does the KEY EXIST AT ALL? It reports `X absent for <id>`.
 *
 * Nineteen keys on this module's concepts had a carefully written reason and no
 * column, which answers the first and fails the second. Four more were emitted
 * and left empty, and an empty `## key` block parses as *untouched*, so those
 * keys were absent too. `[clear]` is the only thing that says "present, and
 * empty on purpose" — presence has two ways to fail and only one of them looks
 * like a mistake.
 *
 * The audit itself runs against the live ledger, so it cannot see a batch until
 * someone imports it. This asks the same two questions of the batch instead,
 * which is the point: the answer is wanted before the import, not after.
 *
 * It also checks the shape of every column against the parser that actually
 * reads it, which is a second and separate way to be silently wrong:
 *
 *   text column   deliberately empty  ->  empty body     (stores null)
 *   list column   deliberately empty  ->  `[clear]`      (stores [])
 *
 * Get it backwards and a text column holds the literal four characters
 * `[clear]`, or a list column holds null where "considered, and empty" was
 * meant. **The parser is measured, not read**: a probe value goes through the
 * importer and the stored type is observed, because the names mislead in both
 * directions — `pitfalls` reads like a list and is text, while `conflicts`,
 * `uncertainty` and `original_wording` read like prose and are lists.
 *
 * Exits non-zero on any absence, so it can be wired into CI.
 */
import { readFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { conceptFromRow, materialiseNewConcept, resolvePlacement, CONCEPT_IMPORT_FIELDS } from '../../src/data/conceptImport.ts'
import { IMPORT_SCHEMAS, importRowToContent } from '../../src/data/bulkImport.ts'
import { materialiseNewItem } from '../../src/data/importMerge.ts'
import { CURRICULUM_CATALOG } from '../../src/data/curriculumCatalog.ts'

/** Kept identical to `audit-medical-content-fields.mjs`; drift here is silent. */
export const POPULATED = [
  'label', 'canonicalKey', 'definition', 'status', 'articleIds', 'subjectId', 'primaryNodeId',
  'conceptType', 'learnerYears', 'universityIds', 'explicitObjective', 'blueprintWeight',
  'examWeightByYear', 'clinicalRelevance', 'academicRelevance', 'relatedArticleIds', 'resourceIds',
  'atomicClaimIds', 'supportMode', 'confidence', 'originalWording', 'owner', 'reviewer',
  'finalPublisher', 'publicationStatus', 'editorialReviewStatus', 'weightConfidence', 'fieldNotes',
]
/**
 * The only fields the audit lets a `field_notes` reason excuse.
 *
 * `conceptPopulated` does NOT take one — `requirePaths` runs bare `hasValue`.
 * My first version of this check allowed a note for any populated field, which
 * made it *more lenient than the audit it emulates*: it said green where the
 * real thing says red, which is the worst thing a check can do.
 *
 * This restriction applies to the full-record judgement only. An update row
 * (see `isUpdateRow` below) is judged by a different rule with its own excuse
 * mechanism — see `judgeConceptRow`.
 */
export const NOTE_EXCUSES = [
  'arabicLabel', 'aliases', 'pitfalls', 'moduleIds', 'microtopicId', 'nanotopicId',
  'approvedFileResourceIds', 'approvedVideoResourceIds', 'lastReviewed', 'reviewDue',
  'resourceOccurrenceIds', 'sourceCandidateIds',
]

export const PRESENT = [
  'systemId', 'topicTagId', 'subtopicId', 'microtopicId', 'nanotopicId', 'secondaryNodeIds',
  'relatedConceptIds', 'moduleIds', 'aliases', 'arabicLabel', 'arabicAliases', 'pitfalls',
  'approvedFileResourceIds', 'approvedVideoResourceIds', 'conflicts', 'uncertainty', 'evidenceGaps',
  'mergeIds', 'rejectedMergeCandidateIds', 'lastReviewed', 'reviewDue', 'exclusionReason',
]

/**
 * camelCase (`POPULATED`/`PRESENT`) key -> the raw `## column` name that feeds it.
 *
 * Built from `CONCEPT_IMPORT_FIELDS` by camel-casing each column name, plus the
 * handful of cases a straight conversion gets wrong: the catalogue placement
 * fields (`systemId`, `subjectId`, `topicTagId`, `subtopicId`, `microtopicId`,
 * `nanotopicId`) are derived by `resolvePlacement` from `subject`/`topic`/
 * `subtopic`/`microtopic`/`nanotopic`, not from a column of the same shape, and
 * `universityIds`/`moduleIds` read from the singular-vs-list-named
 * `universities`/`modules` columns.
 *
 * This is what lets `judgeConceptRow` answer "did this row name that field at
 * all" for an update row — `column in row` is true the instant `## column`
 * appears in the markdown, blank body or not.
 */
export const FIELD_COLUMN = (() => {
  const toCamel = (snake) => snake.replace(/_([a-z0-9])/g, (_, c) => c.toUpperCase())
  const map = Object.fromEntries(CONCEPT_IMPORT_FIELDS.map(({ key }) => [toCamel(key), key]))
  return {
    ...map,
    universityIds: 'universities',
    moduleIds: 'modules',
    subjectId: 'subject',
    systemId: 'subject',
    topicTagId: 'topic',
    subtopicId: 'subtopic',
    microtopicId: 'microtopic',
    nanotopicId: 'nanotopic',
  }
})()

const normalize = (value) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')

/** The import wizard's parser, kept identical on purpose. */
export const parse = (text) => text.split(/^\s*---\s*$/m).map((part) => part.trim()).filter(Boolean).map((doc) => {
  const row = {}
  const matcher = /^##[ \t]*(.+?)[ \t]*\r?\n([\s\S]*?)(?=\r?\n##[ \t]|(?![\s\S]))/gm
  let match
  while ((match = matcher.exec(doc))) row[normalize(match[1])] = match[2].trim()
  return row
})

export const isEmpty = (value) => value === undefined || value === null || value === ''
  || (Array.isArray(value) && !value.length)
  || (typeof value === 'object' && !Array.isArray(value) && !Object.keys(value).length)

/** First segment of a `module_subject` cell — "101 ISK" from "101 ISK > Anatomy > ...". */
export const moduleOf = (value) => {
  const firstLine = (value ?? '').split(/\r?\n/).find((line) => line.trim())
  if (!firstLine) return undefined
  return firstLine.split('>')[0].trim() || undefined
}

/**
 * Full records elsewhere in the batch set, by id, tagged with the module each
 * one belongs to.
 *
 * "Full" mirrors the manual's own bar for a new concept: `definition` and
 * `explicit_objective` both carry text. A row missing either is not proof
 * anything already covers `id` — it is itself still waiting to be finished,
 * and letting it vouch for a sparse row elsewhere would just move the gap
 * instead of closing it.
 *
 * `fileGroups` is `{ file, rows }` per concept file (article files are the
 * caller's job to filter out first — an article's `definition`-shaped column
 * means something else entirely). Each entry the index carries remembers which
 * file it came from, so `isUpdateRow` can require "elsewhere" literally: a row
 * that is itself a full record must not be able to vouch for itself just
 * because it also satisfies "a full record exists for this id" — that would
 * excuse a brand-new record's real gaps under the update rule's more lenient
 * `field_notes` excuse (see `judgeConceptRow`) instead of the full-record rule
 * they should actually be judged by.
 */
export function indexFullRecords(fileGroups) {
  const index = new Map()
  for (const { file, rows } of fileGroups) {
    const fileModule = rows.map((row) => moduleOf(row.module_subject)).find(Boolean)
    for (const row of rows) {
      const id = row.id?.trim()
      if (!id || !row.definition?.trim() || !row.explicit_objective?.trim()) continue
      const module = moduleOf(row.module_subject) ?? fileModule
      if (!module) continue
      if (!index.has(id)) index.set(id, [])
      index.get(id).push({ module, file })
    }
  }
  return index
}

/**
 * Is this row an update, the way `validate-content-batch.mjs`'s
 * `isRecognisedUpdate` decides one is? That file exports nothing, so the rule
 * is mirrored here rather than imported: the id must resolve — to live state,
 * or to a full record (see `indexFullRecords`) filed under the same module in
 * ANOTHER concept file of the batch set — AND the row must restate its
 * `## label` (the column `isRecognisedUpdate` calls the row's "substance"; a
 * row that omits it is not vouching for itself as a deliberate patch).
 *
 * A row that fails either test is judged as a full record — today's judgement,
 * unchanged by any of this.
 */
export function isUpdateRow(row, { liveIds, fullRecordModules, fileModule, file }) {
  const id = row.id?.trim()
  if (!id || !row.label?.trim()) return false
  if (liveIds.has(id)) return true
  if (!fileModule) return false
  return (fullRecordModules.get(id) ?? []).some((entry) => entry.module === fileModule && entry.file !== file)
}

/**
 * Columns read by `parseSections`, where BOTH sentinels are wrong.
 *
 * There is a third parser and a third convention, and this checker knew only
 * two — so it classified `published_sections` as a list and told authors to put
 * `[clear]` in it. That advice is worse than the gap it was reporting:
 *
 *   parseSections('[clear]') -> [{ heading: '', body: '[clear]' }]
 *   parseSections('')        -> []
 *
 * The sentinel does not store an empty list. It stores one section, no heading,
 * body the literal word — and `published_sections` is the evidence-gated
 * student projection, so a student could read a section containing "[clear]".
 * Thirty articles across three modules held exactly that, and the checker built
 * for this class reported them clean because section columns fall in the gap
 * between its two buckets.
 *
 * Which is the same lesson as the one this file already carries about probes
 * that reach only one code path, one level up: a checker verified against the
 * two parsers it knows is a claim about those two parsers. Kept in step with
 * `validate-content-batch.mjs`, which refuses these by name.
 */
const SECTION_COLUMNS = ['sections', 'published_sections', 'annotations', 'media', 'media_recommendations']

/**
 * The concepts already in the ledger, by ID.
 *
 * The audit this mirrors runs against the **merged** ledger, and an update
 * record is merged over the live one — `id` plus the discriminating columns
 * plus only the fields it changes, with every omitted key keeping its live
 * value. Judging such a record on its own asks a question the audit never
 * asks, and answers it wrongly: five sparse updates in this module reported
 * `definition`, `subjectId`, `primaryNodeId` and `conceptType` unpopulated
 * while every one of them is populated on the record being updated.
 *
 * `medical:batch` has the same blind spot and the manuals say so outright —
 * "validate a partial update with `medical:simulate`, not `medical:batch`".
 * A pre-import check has no such excuse: it can read live state.
 */
const LIVE = 'server/data/medical-library-v1.json'
export let liveConcepts = new Map()
try {
  const graph = JSON.parse(readFileSync(LIVE, 'utf8')).states['nishany-concept-graph-v2']?.concepts ?? {}
  const rows = Array.isArray(graph) ? graph : Object.values(graph)
  liveConcepts = new Map(rows.map((concept) => [concept.id, concept]))
} catch {
  // No live state in this checkout: every record is then judged as new, which
  // is stricter rather than looser, and the run says so below.
}

/**
 * Absent/unpopulated keys for one concept row, `{ id, isUpdate, absent, unpopulated }`.
 *
 * An update row (`isUpdateRow`) is judged only on the fields it names —
 * `column in row` is true the moment `## column` appears in the markdown,
 * blank body or not, so a field the row never mentions is skipped entirely
 * rather than judged against whatever a merge would have inherited for it. A
 * field it DOES name and leaves blank is still flagged, unless `field_notes`
 * excuses it under the field's camelCase name — deliberately not restricted
 * to `NOTE_EXCUSES` the way the full-record path is, because that list mirrors
 * the real audit's excuse rule for a genuinely new record, and an update row's
 * whole reason to exist is to leave most of the record alone and say so.
 *
 * Every other row keeps the merge-with-live judgement this file already had
 * before update rows were told apart from full ones: a key the row leaves
 * blank inherits the live record's value when one exists, so a `label`-less
 * row that happens to hit a live id is still judged against what importing it
 * would actually produce.
 */
export function judgeConceptRow(row, { liveConcepts: live, fullRecordModules, fileModule, file }) {
  const authored = materialiseNewConcept(
    conceptFromRow(row, resolvePlacement(row.subject?.trim() ?? '', row, CURRICULUM_CATALOG)))
  const liveIds = new Set(live.keys())
  const absent = []
  const unpopulated = []

  if (isUpdateRow(row, { liveIds, fullRecordModules, fileModule, file })) {
    for (const key of PRESENT) {
      const column = FIELD_COLUMN[key]
      if (!column || !(column in row)) continue
      if (!(key in authored) || authored[key] === undefined) absent.push(key)
    }
    for (const key of POPULATED) {
      const column = FIELD_COLUMN[key]
      if (!column || !(column in row)) continue
      const excused = authored.fieldNotes?.[key]
      if (isEmpty(authored[key]) && !excused) unpopulated.push(key)
    }
    return { id: authored.id, isUpdate: true, absent, unpopulated }
  }

  // Today's full-record judgement, unchanged: start from the live record and
  // lay the batch over it, rather than the other way round — a key the batch
  // omits entirely is *absent* from `authored`, so iterating the batch's own
  // keys never reaches it. The union is what the importer merges, so the
  // union is what to ask.
  const existing = live.get(authored.id)
  const concept = existing
    ? Object.fromEntries([...new Set([...Object.keys(existing), ...Object.keys(authored)])]
        .map((key) => [key, isEmpty(authored[key]) && !isEmpty(existing[key]) ? existing[key] : authored[key]]))
    : authored
  for (const key of PRESENT) {
    if (!(key in concept) || concept[key] === undefined) absent.push(key)
  }
  for (const key of POPULATED) {
    const excused = NOTE_EXCUSES.includes(key) && concept.fieldNotes?.[key]
    if (isEmpty(concept[key]) && !excused) unpopulated.push(key)
  }
  return { id: concept.id, isUpdate: false, absent, unpopulated }
}

/**
 * Only the CLI entry point runs when this file is imported rather than
 * executed — the shape probes below print to stdout and the run at the
 * bottom calls `process.exit`, neither of which a test importing
 * `judgeConceptRow` wants along for the ride.
 */
const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href

if (isMain) {
  /**
   * Which parser each column goes through, measured rather than read.
   *
   * A probe with a `|` in it goes through the importer for every column; if what
   * comes out is an array the column is a list, and if it is a string it is text.
   * Reading the source would work too, until someone changes a parser without
   * changing the column name.
   */
  const SHAPE = {}
  {
    const base = { id: 'CON-PROBE', label: 'L', canonical_key: 'k', definition: 'd' }
    const before = materialiseNewConcept(conceptFromRow(base))
    for (const { key } of CONCEPT_IMPORT_FIELDS) {
      if (base[key] !== undefined) continue
      const probe = materialiseNewConcept(conceptFromRow({ ...base, [key]: 'AAA | BBB' }))
      for (const prop of new Set([...Object.keys(probe), ...Object.keys(before)])) {
        if (JSON.stringify(probe[prop]) !== JSON.stringify(before[prop])) {
          SHAPE[key] = Array.isArray(probe[prop]) ? 'list' : 'text'
        }
      }
    }
  }

  /**
   * The same measurement for an article, which needs a different probe.
   *
   * `conceptFromRow` takes a bare row; `importRowToContent` needs enough context
   * to materialise, so a single-column probe reaches nothing and every column
   * comes back unclassified. A check that cannot see half its subject reports
   * that half as clean — the errs-toward-green failure, in the fix built to stop
   * it.
   */
  const ARTICLE_SHAPE = {}
  {
    const base = {
      id: 'ART-PROBE', title: 'T', subject: 'fnd', topic: 'X',
      summary: 'S', sections: '### Definition\nBody',
    }
    const build = (row) => materialiseNewItem(importRowToContent('article', row, 'probe'))
    const before = build(base)
    for (const { key } of IMPORT_SCHEMAS.article.fields) {
      if (base[key] !== undefined) continue
      const probe = build({ ...base, [key]: 'AAA | BBB' })
      for (const prop of Object.keys(probe.articleData ?? {})) {
        if (JSON.stringify(probe.articleData[prop]) !== JSON.stringify(before.articleData?.[prop])) {
          ARTICLE_SHAPE[key] = Array.isArray(probe.articleData[prop]) ? 'list' : 'text'
        }
      }
    }
  }

  /**
   * A classification that came back empty means the probe reached nothing.
   *
   * Stronger than the control below, and it catches a different thing: a control
   * proves the checker can fail on a case somebody thought of; this proves it is
   * looking at anything at all. A parallel lane's sentinel check passed its own
   * self-test and reported zero across eight batches while classifying **no text
   * columns outside concepts** — vacuously clean for seventeen articles and every
   * question, and it only surfaced because the classification was printed beside
   * the result.
   *
   * The cause there is worth knowing, because it is a shape rather than a typo:
   * `conceptImport.ts` writes `text(values.subtopic)` while `bulkImport.ts`
   * writes `text('subtopic')` closing over `values`. Two call shapes, one
   * pattern, and a probe written against one sees nothing of the other.
   *
   * So the counts are printed every run and an empty side is a hard stop.
   */
  const summarise = (map) => {
    const list = Object.values(map).filter((kind) => kind === 'list').length
    const text = Object.values(map).filter((kind) => kind === 'text').length
    return { list, text }
  }
  {
    const concepts = summarise(SHAPE)
    const articles = summarise(ARTICLE_SHAPE)
    console.log(`classified from the parsers: ${concepts.list} list / ${concepts.text} text for concepts, `
      + `${articles.list} / ${articles.text} for articles`)
    for (const [what, counts] of [['concept', concepts], ['article', articles]]) {
      if (!counts.list || !counts.text) {
        console.error(`the probe classified ${counts.list} list and ${counts.text} text ${what} columns — `
          + 'it is reaching nothing, so a zero from this run would mean the probe broke rather than that the '
          + 'batches are right. A check that cannot fail must say so rather than pass.')
        process.exit(2)
      }
    }
  }

  /**
   * A checker that cannot fail proves nothing.
   *
   * Both mistakes are fed through deliberately before any real file is read, and
   * if either comes back clean the run aborts — because at that point a zero from
   * this script would mean the probe stopped working, not that the batches are
   * right, and those look identical from outside.
   */
  {
    const wrongWay = { id: 'CON-CTRL', label: 'L', canonical_key: 'k', definition: 'd' }
    const textCol = Object.keys(SHAPE).find((key) => SHAPE[key] === 'text')
    const listCol = Object.keys(SHAPE).find((key) => SHAPE[key] === 'list')
    if (!textCol || !listCol) {
      console.error('control failed: the probe classified no text or no list column — it is not working')
      process.exit(2)
    }
    const built = materialiseNewConcept(conceptFromRow({ ...wrongWay, [textCol]: '[clear]' }))
    const stored = Object.values(built).some((value) => value === '[clear]')
    if (!stored) {
      console.error(`control failed: "[clear]" in the text column ${textCol} did not survive as a literal, `
        + 'so this script can no longer detect the bug it exists for')
      process.exit(2)
    }
  }

  let failed = 0

  const parsedFiles = process.argv.slice(2).map((file) => {
    const rows = parse(readFileSync(file, 'utf8')).filter((row) => row.id || row.label)
    const isArticle = rows.some((row) => row.summary !== undefined && row.sections !== undefined)
    return { file, rows, isArticle }
  })
  // Cross-file, so a sparse update in one file can resolve against a full
  // record authored in a sibling file of the same module (see the 101 ISK and
  // 104 CPS examples in `indexFullRecords`'s own callers below).
  const fullRecordModules = indexFullRecords(parsedFiles.filter(({ isArticle }) => !isArticle))

  for (const { file, rows, isArticle } of parsedFiles) {
    const shapeOf = isArticle ? ARTICLE_SHAPE : SHAPE
    const absent = {}
    const unpopulated = {}
    const fileModule = rows.map((row) => moduleOf(row.module_subject)).find(Boolean)

    for (const row of isArticle ? [] : rows) {
      const result = judgeConceptRow(row, { liveConcepts, fullRecordModules, fileModule, file })
      for (const key of result.absent) (absent[key] ??= []).push(result.id)
      for (const key of result.unpopulated) (unpopulated[key] ??= []).push(result.id)
    }

    const shape = {}
    for (const row of rows) {
      for (const [col, value] of Object.entries(row)) {
        if (SECTION_COLUMNS.includes(col)) {
          // Neither sentinel belongs here; only an empty body means empty.
          if (value === '[clear]') {
            (shape[`${col} holds the literal "[clear]" — it is parsed by parseSections(), which stores that as a section whose body is the word itself. Leave the body empty`] ??= []).push(row.id)
          }
          continue
        }
        if (shapeOf[col] === 'list' && value === '') {
          (shape[`${col} is a list column emitted empty — needs [clear], or it stores null where [] was meant`] ??= []).push(row.id)
        }
        if (shapeOf[col] === 'text' && value === '[clear]') {
          (shape[`${col} is a text column holding the literal string "[clear]"`] ??= []).push(row.id)
        }
      }
    }

    const gaps = [...Object.entries(shape),
                  ...Object.entries(absent).map(([k, v]) => [`absent: ${k}`, v]),
                  ...Object.entries(unpopulated).map(([k, v]) => [`unpopulated with no reason: ${k}`, v])]
    console.log(`${file.split('/').pop()} — ${rows.length} ${isArticle ? 'articles' : 'concepts'}`)
    if (!gaps.length) console.log('   both questions answered for every field')
    for (const [what, ids] of gaps) {
      failed += 1
      console.log(`   ${what} (${ids.length}) e.g. ${ids.slice(0, 2).join(', ')}`)
    }
  }
  process.exit(failed ? 1 : 0)
}
