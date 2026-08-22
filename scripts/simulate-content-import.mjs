/**
 * Apply authored batches to a copy of the live state and report what changed.
 *
 *   node --experimental-strip-types scripts/simulate-content-import.mjs \
 *     --source server/data/medical-library-v1.json \
 *     --emit /tmp/after.json \
 *     docs/medical-library-program/batches/SYS-FND-CONCEPT-001.md ...
 *
 * This is a dry run in the same sense as the v9 migration script: it reads the
 * applied migration bundle rather than the database, needs no credentials, and
 * writes nothing unless `--emit` is given. It uses the real importer functions,
 * so what it reports is what an admin would get from the wizard — not a
 * re-implementation that could drift.
 *
 * Nothing here can reach a student. The emitted file is a candidate state for
 * inspection; promoting it is a separate, owner-approved migration.
 */
import { readFile, writeFile } from 'node:fs/promises'

import { conceptFromRow, materialiseNewConcept, mergeConcept, resolvePlacement, relationFromRow, relationErrors, isDuplicateRelation, CONCEPT_IMPORT_FIELDS, RELATION_IMPORT_FIELDS } from '../src/data/conceptImport.ts'
import { CURRICULUM_CATALOG } from '../src/data/curriculumCatalog.ts'
import { IMPORT_SCHEMAS, importRowToContent, practicalDataFrom, validateImportRow } from '../src/data/bulkImport.ts'
import { materialiseNewItem, mergeContentItem, upsertRecords } from '../src/data/importMerge.ts'
import {
  EVIDENCE_IMPORT_FIELDS, evidenceErrors, reconcileClaimEvidence,
  resourceFromRow, claimFromRow, citationFromRow, spanFromRow,
} from '../src/data/evidenceImport.ts'
import { detectBatchKind } from '../src/data/batchKind.ts'

const args = process.argv.slice(2)
const option = (name) => {
  const index = args.indexOf(`--${name}`)
  return index === -1 ? undefined : args[index + 1]
}
const files = args.filter((arg, index) => !arg.startsWith('--') && !args[index - 1]?.startsWith('--'))
const sourceFile = option('source') ?? 'server/data/medical-library-v1.json'
const emitFile = option('emit')
if (!files.length) throw new Error('Give at least one batch file')

const LEDGER_KEY = 'synapse-admin-content-ledger-v4'
const GRAPH_KEY = 'synapse-concept-graph-v2'
const EVIDENCE_KEY = 'synapse-medical-evidence-v1'

const normalize = (value) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')

/** The import wizard's Markdown parser, kept identical on purpose. */
function parseMarkdown(text) {
  return text.split(/^\s*---\s*$/m).map((part) => part.trim()).filter(Boolean).map((document) => {
    const result = {}
    const matcher = /^##[ \t]*(.+?)[ \t]*\r?\n([\s\S]*?)(?=\r?\n##[ \t]|(?![\s\S]))/gm
    let match
    while ((match = matcher.exec(document))) result[normalize(match[1])] = match[2].trim()
    return result
  })
}

const detectKind = detectBatchKind

/* ---- load ---------------------------------------------------------------- */

const bundle = JSON.parse(await readFile(sourceFile, 'utf8'))
const state = bundle.states
const graph = structuredClone(state[GRAPH_KEY] ?? { concepts: [], relations: [] })
const evidence = structuredClone(state[EVIDENCE_KEY] ?? { claims: [], citations: [], resources: [], articleSpans: [], merges: [], coverage: [] })
const ledger = structuredClone(state[LEDGER_KEY] ?? [])

const before = {
  articles: ledger.filter((item) => item.kind === 'article').length,
  concepts: graph.concepts.length,
  relations: graph.relations.length,
  claims: evidence.claims.length,
  citations: evidence.citations.length,
  resources: evidence.resources.length,
  articleSpans: evidence.articleSpans.length,
}

/* ---- apply, in dependency order ------------------------------------------ */

// Practicals go last: they reference concepts, so anything that creates a
// concept must have been applied before one is checked against the graph.
// Questions run last: each one resolves against both the concept graph and the
// article ledger, so it has to see every concept and article this run creates.
const ORDER = { resource: 0, article: 1, concept: 2, claim: 3, citation: 4, span: 5, relation: 6, practical: 7, question: 8 }

// The columns each kind actually has, taken from the importer's own field lists
// rather than a copy kept here — a vocabulary maintained in two places is a
// vocabulary that drifts, and the drift shows up as a false error on a good
// batch. `IMPORT_SCHEMAS` is the authority for the three wizard kinds; concepts,
// relations and evidence carry their own.
const COLUMNS = {
  article: IMPORT_SCHEMAS.article.fields,
  practical: IMPORT_SCHEMAS.practical.fields,
  question: IMPORT_SCHEMAS.question.fields,
  concept: CONCEPT_IMPORT_FIELDS,
  relation: RELATION_IMPORT_FIELDS,
  resource: EVIDENCE_IMPORT_FIELDS.resource,
  claim: EVIDENCE_IMPORT_FIELDS.claim,
  citation: EVIDENCE_IMPORT_FIELDS.citation,
  span: EVIDENCE_IMPORT_FIELDS.span,
}
const KNOWN_COLUMNS = Object.fromEntries(
  Object.entries(COLUMNS).map(([kind, fields]) => [kind, new Set(fields.map((field) => field.key))]),
)
const batches = []
// Declared before the file loop below, which reports an id-bearing file it
// cannot type as an error rather than a skip.
const errors = []

/** Files this run will not apply, reported under `skipped` rather than `errors`. */
const refused = []
for (const file of files) {
  const rows = parseMarkdown(await readFile(file, 'utf8'))
  const kind = detectKind(rows[0] ?? {})
  // A batch whose kind is not in ORDER has no place in this run. Sorting it by
  // `undefined` used to leave it wherever it landed and then apply it as
  // whatever the fallback guessed, which is how a question batch became sixteen
  // concept upserts. Refuse it, name it, and carry on with the rest.
  if (!(kind in ORDER)) {
    // A file carrying `## id` rows is content, whatever the detector made of
    // it — most often an update batch of `id` plus the columns it changes,
    // which matches no kind's shape and so comes back "unknown". Reported as a
    // skip and nothing else, this run exited 0 and a lane reading the exit code
    // saw a clean simulation of a file that applied nothing at all.
    //
    // A file with no ids is a different thing — a stray note, a README — and
    // stays a skip.
    const carriesIds = rows.some((row) => row.id?.trim())
    if (carriesIds) {
      const ids = rows.map((row) => row.id?.trim()).filter(Boolean)
      errors.push(`${file}: detected as "${kind}", so this run applies none of it — but it carries ${ids.length} row(s) with an id `
        + `(${ids.slice(0, 3).join(', ')}${ids.length > 3 ? ', …' : ''}). A row with an id is a record somebody meant to import. `
        + 'Give each row the column its kind is recognised by — a concept needs `label` or `canonical_key`, a question `question`, '
        + 'an article `summary`, a practical `type`.')
      continue
    }
    refused.push(`${file}: detected as "${kind}", which this simulation does not apply. Move it out of the batch directory or add support for it.`)
    continue
  }
  batches.push({ file, kind, rows })
}
batches.sort((a, b) => ORDER[a.kind] - ORDER[b.kind])

// The upsert itself lives with the merge rules it has to stay consistent with,
// and is covered by their tests. It used to be re-implemented here, which is how
// this script came to materialise every incoming row before deciding whether the
// row was a create or an update — so the dry run reported data loss the real
// import does not cause, and hid the loss it does.
const upsert = (existing, incoming, merge, materialise) =>
  upsertRecords(existing, incoming, { merge, materialise })

const report = []
// Refusals are deliberately *not* errors. A batch this run cannot apply is a
// batch of a kind nobody has taught it yet — a question bank, say — and that is
// a fact about the simulator, not a defect in the file. Counting it as an error
// would fail a run whose data is fine, and `errors.length` is the signal every
// caller uses to decide whether a batch is safe to import.

for (const batch of batches) {
  // A column the importer does not recognise is dropped, in silence, along with
  // everything the author wrote under it: a misspelt `## explanaton_b` imports a
  // clean-looking question whose option explains nothing. `validate-content-batch`
  // has always refused unknown columns, but that script is directory-scoped and
  // this one is the gate — so a typo could pass the only check the manual says
  // must be green before an import. It is an error and not a note because the
  // content is already lost by the time anyone reads the report.
  const known = KNOWN_COLUMNS[batch.kind]
  batch.rows.forEach((row, index) => {
    for (const key of Object.keys(row)) {
      if (!known.has(key)) errors.push(`${batch.file} row ${index + 2}: unknown column "${key}"`)
    }
  })

  const context = {
    store: evidence,
    conceptIds: new Set(graph.concepts.map((concept) => concept.id)),
    articleIds: new Set(ledger.filter((item) => item.kind === 'article').map((item) => item.id)),
  }

  if (batch.kind === 'article') {
    let created = 0
    let updated = 0
    batch.rows.forEach((row, index) => {
      const rowErrors = validateImportRow('article', row)
      if (rowErrors.length) { errors.push(`${batch.file} row ${index + 2}: ${rowErrors.join('; ')}`); return }
      const incoming = importRowToContent('article', row, `row-${index}`)
      const position = ledger.findIndex((item) => item.id === incoming.id)
      if (position >= 0) { ledger[position] = mergeContentItem(ledger[position], incoming, false); updated += 1 }
      else { ledger.unshift(materialiseNewItem(incoming)); created += 1 }
    })
    report.push({ file: batch.file, kind: batch.kind, created, updated, rejected: batch.rows.length - created - updated })
    continue
  }

  if (batch.kind === 'practical') {
    let created = 0
    let updated = 0
    batch.rows.forEach((row, index) => {
      const rowErrors = validateImportRow('practical', row)
      // A practical teaches concepts, and one pointing at a concept nobody
      // authored would import cleanly and teach nothing.
      // A column the row omitted now reads as `undefined` rather than an empty
      // list, so that an update keeps what the practical already had. Only the
      // concepts this row actually names can be checked here.
      const data = practicalDataFrom(row)
      const tagged = [
        ...(data.conceptTags?.mainConceptIds ?? []),
        ...(data.conceptTags?.conceptIds ?? []),
        ...(data.conceptTags?.contextualConceptIds ?? []),
        ...((data.format === 'case' ? data.decisions : data.format === 'lab' ? data.questions : []) ?? [])
          .flatMap((block) => [block.conceptId, ...(block.secondaryConceptIds ?? [])]),
      ].filter(Boolean)
      for (const id of tagged) if (!context.conceptIds.has(id)) rowErrors.push(`concept ${id} does not exist`)
      if (rowErrors.length) { errors.push(`${batch.file} row ${index + 2}: ${rowErrors.join('; ')}`); return }
      const incoming = importRowToContent('practical', row, `row-${index}`)
      const position = ledger.findIndex((item) => item.id === incoming.id)
      if (position >= 0) { ledger[position] = mergeContentItem(ledger[position], incoming, false); updated += 1 }
      else { ledger.unshift(materialiseNewItem(incoming)); created += 1 }
    })
    report.push({ file: batch.file, kind: batch.kind, created, updated, rejected: batch.rows.length - created - updated })
    continue
  }

  if (batch.kind === 'question') {
    let created = 0
    let updated = 0
    batch.rows.forEach((row, index) => {
      const rowErrors = validateImportRow('question', row)
      // A question carries the same two referential risks a practical does, and
      // they fail the same silent way: a tag pointing at a concept nobody
      // authored imports cleanly and tracks mastery against nothing, and a
      // `library_ids` entry naming no article leaves the student with no way
      // back to where the answer is taught.
      const incoming = importRowToContent('question', row, `row-${index}`)
      const data = materialiseNewItem(incoming).questionData
      const tagged = [
        ...(data.tags.mainConceptIds ?? []),
        ...(data.tags.conceptIds ?? []),
        ...(data.tags.contextualConceptIds ?? []),
      ].filter(Boolean)
      for (const id of tagged) if (!context.conceptIds.has(id)) rowErrors.push(`concept ${id} does not exist`)
      for (const id of data.libraryIds ?? []) if (!context.articleIds.has(id)) rowErrors.push(`article ${id} does not exist`)
      if (rowErrors.length) { errors.push(`${batch.file} row ${index + 2}: ${rowErrors.join('; ')}`); return }
      const position = ledger.findIndex((item) => item.id === incoming.id)
      if (position >= 0) { ledger[position] = mergeContentItem(ledger[position], incoming, false); updated += 1 }
      else { ledger.unshift(materialiseNewItem(incoming)); created += 1 }
    })
    report.push({ file: batch.file, kind: batch.kind, created, updated, rejected: batch.rows.length - created - updated })
    continue
  }

  if (batch.kind === 'concept') {
    const incoming = batch.rows.map((row) => conceptFromRow(row, resolvePlacement(row.subject?.trim() ?? '', row, CURRICULUM_CATALOG)))
    // `materialiseNewConcept` is passed in rather than mapped over `incoming`: it
    // must touch creates only. Mapped, it filled every unmentioned field with
    // `null` first, and the merge — which skips `undefined`, not `null` — then
    // wrote all of them over the live record.
    const result = upsert(graph.concepts, incoming, mergeConcept, materialiseNewConcept)
    graph.concepts = result.records
    report.push({ file: batch.file, kind: batch.kind, ...result, records: undefined, created: result.created, updated: result.updated })
    continue
  }

  if (batch.kind === 'relation') {
    let created = 0
    batch.rows.forEach((row, index) => {
      const relation = relationFromRow(row)
      const rowErrors = relationErrors(relation, graph, evidence)
      if (isDuplicateRelation(relation, graph.relations)) rowErrors.push('duplicate of an edge already in the graph')
      if (rowErrors.length) { errors.push(`${batch.file} row ${index + 2}: ${rowErrors.join('; ')}`); return }
      graph.relations.push(relation)
      created += 1
    })
    report.push({ file: batch.file, kind: batch.kind, created, updated: 0, rejected: batch.rows.length - created })
    continue
  }

  // Evidence rows are validated with the same rules the wizard applies, against
  // the state as it stands after the earlier batches in this run.
  const counting = [...evidence.citations, ...(batch.kind === 'citation' ? batch.rows.map(citationFromRow) : [])]
    .filter((citation) => citation.countsAsClaimEvidence)
  const evidenceCountByClaim = new Map()
  for (const citation of counting) evidenceCountByClaim.set(citation.claimId, (evidenceCountByClaim.get(citation.claimId) ?? 0) + 1)
  const ids = new Set(batch.rows.map((row) => row.id?.trim()).filter(Boolean))
  const rowContext = {
    ...context,
    incoming: { claims: ids, resources: ids, citations: ids, claimsWithEvidence: new Set(evidenceCountByClaim.keys()), evidenceCountByClaim },
  }

  const accepted = []
  batch.rows.forEach((row, index) => {
    const rowErrors = evidenceErrors(batch.kind, row, rowContext)
    if (rowErrors.length) errors.push(`${batch.file} row ${index + 2}: ${rowErrors.join('; ')}`)
    else accepted.push(row)
  })

  if (batch.kind === 'resource') {
    const result = upsert(evidence.resources, accepted.map(resourceFromRow))
    evidence.resources = result.records
    report.push({ file: batch.file, kind: batch.kind, created: result.created, updated: result.updated, rejected: batch.rows.length - accepted.length })
  } else if (batch.kind === 'claim') {
    const result = upsert(evidence.claims, accepted.map(claimFromRow))
    evidence.claims = reconcileClaimEvidence(result.records, evidence.citations)
    report.push({ file: batch.file, kind: batch.kind, created: result.created, updated: result.updated, rejected: batch.rows.length - accepted.length })
  } else if (batch.kind === 'citation') {
    const result = upsert(evidence.citations, accepted.map(citationFromRow))
    evidence.citations = result.records
    evidence.claims = reconcileClaimEvidence(evidence.claims, evidence.citations)
    report.push({ file: batch.file, kind: batch.kind, created: result.created, updated: result.updated, rejected: batch.rows.length - accepted.length })
  } else {
    const result = upsert(evidence.articleSpans, accepted.map(spanFromRow))
    evidence.articleSpans = result.records
    report.push({ file: batch.file, kind: batch.kind, created: result.created, updated: result.updated, rejected: batch.rows.length - accepted.length })
  }
}

/* ---- what changed -------------------------------------------------------- */

const after = {
  articles: ledger.filter((item) => item.kind === 'article').length,
  concepts: graph.concepts.length,
  relations: graph.relations.length,
  claims: evidence.claims.length,
  citations: evidence.citations.length,
  resources: evidence.resources.length,
  articleSpans: evidence.articleSpans.length,
}

// The point of the exercise: which concepts can now leave needs_evidence.
const claimsByConcept = new Map()
for (const claim of evidence.claims) {
  if (claim.verificationStatus !== 'verified') continue
  const counting = claim.citationIds.filter((id) => evidence.citations.find((citation) => citation.id === id)?.countsAsClaimEvidence)
  if (counting.length) claimsByConcept.set(claim.conceptId, (claimsByConcept.get(claim.conceptId) ?? 0) + 1)
}
const nowSupported = [...claimsByConcept.entries()]
  .map(([conceptId, verifiedClaims]) => {
    const concept = graph.concepts.find((entry) => entry.id === conceptId)
    return concept ? { conceptId, label: concept.label, publicationStatus: concept.publicationStatus, verifiedClaims } : null
  })
  .filter(Boolean)
  .filter((entry) => entry.publicationStatus !== 'published')

if (emitFile) {
  await writeFile(emitFile, `${JSON.stringify({ ...bundle, states: { ...state, [LEDGER_KEY]: ledger, [GRAPH_KEY]: graph, [EVIDENCE_KEY]: evidence } }, null, 1)}\n`)
}

console.log(JSON.stringify({
  source: sourceFile,
  emitted: emitFile ?? null,
  batches: report,
  before,
  after,
  delta: Object.fromEntries(Object.keys(before).map((key) => [key, after[key] - before[key]])),
  conceptsNowCarryingVerifiedClaims: nowSupported,
  // Named separately so a caller can see what went unapplied without treating it
  // as a failure. Silence was the original bug; a false alarm is the other one.
  skipped: refused,
  errors,
}, null, 1))
if (errors.length) process.exitCode = 1
