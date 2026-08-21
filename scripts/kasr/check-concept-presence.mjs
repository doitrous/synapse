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
 * Exits non-zero on any absence, so it can be wired into CI.
 */
import { readFileSync } from 'node:fs'
import { conceptFromRow, materialiseNewConcept, resolvePlacement } from '../../src/data/conceptImport.ts'
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

let failed = 0
for (const file of process.argv.slice(2)) {
  const rows = parse(readFileSync(file, 'utf8')).filter((row) => row.id || row.label)
  const absent = {}
  const unpopulated = {}

  for (const row of rows) {
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

  const gaps = [...Object.entries(absent).map(([k, v]) => [`absent: ${k}`, v]),
                ...Object.entries(unpopulated).map(([k, v]) => [`unpopulated with no reason: ${k}`, v])]
  console.log(`${file.split('/').pop()} — ${rows.length} concepts`)
  if (!gaps.length) console.log('   both questions answered for every field')
  for (const [what, ids] of gaps) {
    failed += 1
    console.log(`   ${what} (${ids.length}) e.g. ${ids.slice(0, 2).join(', ')}`)
  }
}
process.exit(failed ? 1 : 0)
