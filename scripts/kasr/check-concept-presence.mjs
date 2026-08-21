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
import { conceptFromRow, materialiseNewConcept, resolvePlacement, CONCEPT_IMPORT_FIELDS } from '../../src/data/conceptImport.ts'
import { IMPORT_SCHEMAS, importRowToContent } from '../../src/data/bulkImport.ts'
import { materialiseNewItem } from '../../src/data/importMerge.ts'
import { CURRICULUM_CATALOG } from '../../src/data/curriculumCatalog.ts'

/** Kept identical to `audit-medical-content-fields.mjs`; drift here is silent. */
const POPULATED = [
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
 */
const NOTE_EXCUSES = [
  'arabicLabel', 'aliases', 'pitfalls', 'moduleIds', 'microtopicId', 'nanotopicId',
  'approvedFileResourceIds', 'approvedVideoResourceIds', 'lastReviewed', 'reviewDue',
  'resourceOccurrenceIds', 'sourceCandidateIds',
]

const PRESENT = [
  'systemId', 'topicTagId', 'subtopicId', 'microtopicId', 'nanotopicId', 'secondaryNodeIds',
  'relatedConceptIds', 'moduleIds', 'aliases', 'arabicLabel', 'arabicAliases', 'pitfalls',
  'approvedFileResourceIds', 'approvedVideoResourceIds', 'conflicts', 'uncertainty', 'evidenceGaps',
  'mergeIds', 'rejectedMergeCandidateIds', 'lastReviewed', 'reviewDue', 'exclusionReason',
]

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

const normalize = (value) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')

/** The import wizard's parser, kept identical on purpose. */
const parse = (text) => text.split(/^\s*---\s*$/m).map((part) => part.trim()).filter(Boolean).map((doc) => {
  const row = {}
  const matcher = /^##[ \t]*(.+?)[ \t]*\r?\n([\s\S]*?)(?=\r?\n##[ \t]|(?![\s\S]))/gm
  let match
  while ((match = matcher.exec(doc))) row[normalize(match[1])] = match[2].trim()
  return row
})

const isEmpty = (value) => value === undefined || value === null || value === ''
  || (Array.isArray(value) && !value.length)
  || (typeof value === 'object' && !Array.isArray(value) && !Object.keys(value).length)

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
for (const file of process.argv.slice(2)) {
  const rows = parse(readFileSync(file, 'utf8')).filter((row) => row.id || row.label)
  const isArticle = rows.some((row) => row.summary !== undefined && row.sections !== undefined)
  const shapeOf = isArticle ? ARTICLE_SHAPE : SHAPE
  const absent = {}
  const unpopulated = {}

  for (const row of isArticle ? [] : rows) {
    // Placement is resolved the way the importer resolves it. Without the
    // catalogue `subjectId` comes back undefined and every concept looks
    // broken — a check that cries wolf is worse than no check.
    const concept = materialiseNewConcept(
      conceptFromRow(row, resolvePlacement(row.subject?.trim() ?? '', row, CURRICULUM_CATALOG)))
    for (const key of PRESENT) {
      if (!(key in concept) || concept[key] === undefined) (absent[key] ??= []).push(concept.id)
    }
    for (const key of POPULATED) {
      const excused = NOTE_EXCUSES.includes(key) && concept.fieldNotes?.[key]
      if (isEmpty(concept[key]) && !excused) (unpopulated[key] ??= []).push(concept.id)
    }
  }

  const shape = {}
  for (const row of rows) {
    for (const [col, value] of Object.entries(row)) {
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
