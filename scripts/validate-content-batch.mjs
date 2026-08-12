/**
 * Check an authored batch file against the importer before anyone imports it.
 *
 *   node --experimental-strip-types scripts/validate-content-batch.mjs docs/medical-library-program/batches/SYS-FND-CONCEPT-001.md
 *
 * Parses the file exactly as the import wizard does, builds the records, and
 * reports what would be written. A batch that fails here would fail in the
 * admin UI too — better to find out from a command than from a half-applied
 * import.
 */
import { readFile, readdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { conceptFromRow, materialiseNewConcept, CONCEPT_IMPORT_FIELDS } from '../src/data/conceptImport.ts'
import { EVIDENCE_IMPORT_FIELDS, evidenceErrors, citationFromRow, claimFromRow } from '../src/data/evidenceImport.ts'
import { RELATION_IMPORT_FIELDS, relationFromRow, relationErrors, isDuplicateRelation } from '../src/data/conceptImport.ts'
import { IMPORT_SCHEMAS, importRowToContent, validateImportRow, parseSections } from '../src/data/bulkImport.ts'
import { materialiseNewItem } from '../src/data/importMerge.ts'
import { missingRequiredSections } from '../src/data/articleTemplates.ts'
import { MEDICAL_TAXONOMY_INDEX } from '../src/data/medicalLibraryTaxonomy.ts'

const file = process.argv[2]
if (!file) throw new Error('Usage: validate-content-batch.mjs <batch.md>')

const normalize = (value) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')

/** Read a `Label: value` line out of a block body, as the importer's parser does. */
const labelled = (body, label) => body.match(new RegExp(`^${label}\\s*:\\s*(.+)$`, 'im'))?.[1].trim() ?? ''

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

const rows = parseMarkdown(await readFile(file, 'utf8'))

/**
 * Which contract this file is written against.
 *
 * Inferred from the columns rather than the filename, so a file cannot be
 * validated against the wrong contract by being misnamed.
 */
function detectKind(sample) {
  if ('source' in sample && 'type' in sample && 'target' in sample) return 'relation'
  if ('correct_answer' in sample && 'answer_a' in sample) return 'question'
  if ('summary' in sample && 'sections' in sample) return 'article'
  if ('claim_id' in sample && 'resource_id' in sample) return 'citation'
  if ('concept_id' in sample && 'display_text' in sample) return 'claim'
  if ('article_id' in sample && 'section_id' in sample) return 'span'
  if ('institution' in sample && 'processing_status' in sample) return 'resource'
  // A positive test rather than a fallback. Falling back to 'concept' meant any
  // unrecognised row became one; the simulator, which shared this shape, applied
  // a stray question batch as sixteen concept upserts without reporting anything.
  if ('label' in sample || 'canonical_key' in sample) return 'concept'
  return 'unknown'
}

const kind = detectKind(rows[0] ?? {})
const errors = []
const notes = []
const records = []

if (kind === 'relation') {
  const dir = dirname(file)
  const concepts = []
  const claims = []
  const citations = []
  for (const name of await readdir(dir)) {
    if (!name.endsWith('.md')) continue
    for (const row of parseMarkdown(await readFile(join(dir, name), 'utf8'))) {
      const k = detectKind(row)
      if (k === 'concept') concepts.push({ id: row.id?.trim() })
      if (k === 'claim') claims.push({ id: row.id?.trim() })
      if (k === 'citation') citations.push({ id: row.id?.trim() })
    }
  }
  const graph = { concepts, relations: [] }
  const evidence = { claims, citations }
  const known = new Set(RELATION_IMPORT_FIELDS.map((field) => field.key))
  const built = []
  rows.forEach((values, index) => {
    const where = `Item ${index + 1} (${values.source ?? '?'} -${values.type ?? '?'}-> ${values.target ?? '?'})`
    for (const key of Object.keys(values)) if (!known.has(key)) errors.push(`${where}: unknown column "${key}"`)
    const relation = relationFromRow(values)
    for (const error of relationErrors(relation, graph, evidence)) errors.push(`${where}: ${error}`)
    if (isDuplicateRelation(relation, built)) errors.push(`${where}: duplicate of an edge already in this batch`)
    // The field audit rejects any relation without an evidence chain at rest.
    if (!(relation.evidenceClaimIds ?? []).length || !(relation.citationIds ?? []).length) {
      errors.push(`${where}: no evidence chain — the audit rejects this at rest`)
    }
    built.push(relation)
  })
  const byType = {}
  for (const r of built) byType[r.type] = (byType[r.type] ?? 0) + 1
  console.log(JSON.stringify({
    file, kind, items: rows.length,
    verified: built.filter((r) => r.verificationStatus === 'verified').length,
    needsEvidence: built.filter((r) => r.verificationStatus === 'needs_evidence').length,
    byType, errors,
  }, null, 1))
  if (errors.length) process.exitCode = 1
  process.exit()
}

if (kind === 'question') {
  // Unlike every other batch kind, a question references records that already
  // exist rather than siblings in the same directory: the concept it tests and
  // the article that teaches it. So the resolution scope is live state, not the
  // batch directory. A question pointing at a concept nobody authored is the
  // failure this whole branch exists to catch.
  const here = dirname(fileURLToPath(import.meta.url))
  const live = JSON.parse(await readFile(join(here, '..', 'server', 'data', 'medical-library-v1.json'), 'utf8'))
  const concepts = new Map((live.states['synapse-concept-graph-v2']?.concepts ?? []).map((concept) => [concept.id, concept]))
  const ledger = live.states['synapse-admin-content-ledger-v4'] ?? []
  const articles = new Map(ledger.filter((item) => item.kind === 'article').map((item) => [item.id, item]))
  const resources = new Set(ledger.filter((item) => item.kind === 'resource').map((item) => item.id))

  // `media_recommendations` is authored ahead of the importer field that will
  // carry it. The Markdown parser drops unknown keys in silence, so without this
  // the blocks would vanish at import with nothing said. Known, not yet wired.
  const PENDING_FIELDS = new Set(['media_recommendations'])
  const known = new Set([...IMPORT_SCHEMAS.question.fields.map((field) => field.key), ...PENDING_FIELDS])
  const DIFFICULTIES = ['Easy', 'Moderate', 'Hard', 'Challenging']
  const built = []
  const difficultyCounts = {}
  let mediaFlagged = 0

  rows.forEach((values, index) => {
    const where = `Item ${index + 1} (${values.title ?? values.question ?? 'untitled'})`
    for (const key of Object.keys(values)) if (!known.has(key)) errors.push(`${where}: unknown column "${key}"`)
    for (const error of validateImportRow('question', values)) errors.push(`${where}: ${error}`)

    const item = materialiseNewItem(importRowToContent('question', values, `row-${index}`))
    const data = item.questionData
    built.push(item)

    // Options and their explanations. An option without an explanation teaches
    // nothing, which is the one thing this content type exists to do.
    const answered = data.answers.filter((answer) => answer.text.trim())
    if (answered.length < 4 || answered.length > 5) {
      errors.push(`${where}: ${answered.length} option${answered.length === 1 ? '' : 's'} — the contract is 4 to 5`)
    }
    for (const answer of answered) {
      if (!answer.explanation.trim()) errors.push(`${where}: option ${answer.label} has no explanation`)
    }
    if (!answered.some((answer) => answer.label === data.correctAnswer)) {
      errors.push(`${where}: correct answer ${data.correctAnswer} is not one of the filled options`)
    }

    // The difficulty the author wrote, not the one the importer settled for.
    const authored = values.difficulty?.trim()
    if (authored && !DIFFICULTIES.includes(authored)) {
      errors.push(`${where}: difficulty "${authored}" is not one of ${DIFFICULTIES.join(', ')} — it would import as Moderate`)
    }
    difficultyCounts[data.tags.intendedDifficulty] = (difficultyCounts[data.tags.intendedDifficulty] ?? 0) + 1

    // Concept tagging. Getting main vs contextual wrong corrupts a student's
    // mastery profile in silence, so it is an error and not a note.
    const main = data.tags.mainConceptIds ?? []
    const also = data.tags.conceptIds ?? []
    const contextual = data.tags.contextualConceptIds ?? []
    if (main.length !== 1) errors.push(`${where}: ${main.length} main concepts — a question tests exactly one`)
    for (const [label, ids] of [['main_concept', main], ['concept_ids', also], ['contextual_concept_ids', contextual]]) {
      for (const id of ids) if (!concepts.has(id)) errors.push(`${where}: ${label} ${id} is not a concept that exists`)
    }
    for (const id of contextual) {
      if (main.includes(id) || also.includes(id)) {
        errors.push(`${where}: ${id} is both assessed and contextual — it would take mastery evidence it never earned`)
      }
    }

    // A question may only test a concept some article covers.
    if (!data.libraryIds.length) errors.push(`${where}: no library_ids — nothing teaches this question's answer`)
    for (const id of data.libraryIds) if (!articles.has(id)) errors.push(`${where}: library_ids ${id} is not an article that exists`)
    for (const id of data.resourceIds) if (!resources.has(id)) errors.push(`${where}: resource_ids ${id} is not a resource that exists`)
    for (const id of main) {
      const concept = concepts.get(id)
      if (!concept) continue
      const covered = (concept.articleIds ?? []).some((articleId) => data.libraryIds.includes(articleId))
      if (!covered) errors.push(`${where}: main concept ${id} is not covered by any article in library_ids`)
      if (concept.publicationStatus !== 'published') {
        notes.push(`${item.id}: main concept ${id} has not passed the evidence gate (${concept.publicationStatus}) — promote the concept and the question together`)
      }
    }

    if (item.status !== 'Draft') errors.push(`${where}: status is ${item.status} — assessment content lands as Draft`)
    if (!data.learningObjective.trim()) errors.push(`${where}: no learning objective`)
    if (!data.sourceCitation.trim()) errors.push(`${where}: no source citation`)

    if (values.media_recommendations?.trim()) {
      mediaFlagged += 1
      // Same shape the article field uses, so it transfers when A2 lands.
      for (const block of parseSections(values.media_recommendations)) {
        if (!labelled(block.body, 'Purpose')) errors.push(`${where}: media recommendation "${block.heading}" has no Purpose`)
      }
    }
  })

  const ids = built.map((item) => item.id)
  for (const id of ids) if (ids.filter((other) => other === id).length > 1) errors.push(`duplicate id ${id} within the file`)
  if (mediaFlagged) {
    notes.push(`${mediaFlagged} question${mediaFlagged === 1 ? '' : 's'} carry media_recommendations, which the importer does not read yet — they will not survive import until the question media field ships`)
  }

  console.log(JSON.stringify({
    file, kind, items: rows.length,
    fieldsUsed: [...new Set(rows.flatMap((row) => Object.keys(row)))].length,
    difficulty: difficultyCounts,
    conceptsTested: [...new Set(built.flatMap((item) => item.questionData.tags.mainConceptIds ?? []))].length,
    mediaFlagged,
    notes, errors,
  }, null, 1))
  if (errors.length) process.exitCode = 1
  process.exit()
}

if (kind === 'article') {
  // Related reading legitimately points at an article authored in a different
  // batch file, so the whole directory is the resolution scope — the same reason
  // the evidence batches read their siblings.
  const dir = dirname(file)
  const siblingArticleIds = new Set()
  for (const name of await readdir(dir)) {
    if (!name.endsWith('.md')) continue
    for (const row of parseMarkdown(await readFile(join(dir, name), 'utf8'))) {
      if ('summary' in row && 'sections' in row && row.id?.trim()) siblingArticleIds.add(row.id.trim())
    }
  }

  const known = new Set(IMPORT_SCHEMAS.article.fields.map((field) => field.key))
  const built = []
  rows.forEach((values, index) => {
    const where = `Item ${index + 1} (${values.id ?? values.title ?? 'untitled'})`
    for (const key of Object.keys(values)) if (!known.has(key)) errors.push(`${where}: unknown column "${key}"`)
    for (const error of validateImportRow('article', values)) errors.push(`${where}: ${error}`)

    const item = materialiseNewItem(importRowToContent('article', values, `row-${index}`))
    const data = item.articleData
    built.push(item)

    // The archetype's section contract is the point of having archetypes.
    const headings = data.sections.map((section) => section.heading)
    const missing = missingRequiredSections(data.templateId ?? '', headings)
    if (missing.length) errors.push(`${where}: missing required sections for ${data.templateId}: ${missing.join(', ')}`)

    for (const nodeId of [data.primaryNodeId, ...(data.secondaryNodeIds ?? [])].filter(Boolean)) {
      if (!MEDICAL_TAXONOMY_INDEX.byId.has(nodeId)) errors.push(`${where}: placement ${nodeId} is not a canonical node`)
    }
    if (!data.arabicTitle && !data.fieldNotes?.arabicTitle) errors.push(`${where}: no Arabic title and no field note saying why (LD-15)`)
    // A callout that publishes must be one the article actually carries.
    for (const text of Object.keys(data.calloutEvidence ?? {})) {
      if (![...(data.holdThese ?? []), ...(data.loseTheMark ?? [])].includes(text)) {
        errors.push(`${where}: callout evidence names a line this article does not have`)
      }
    }
  })

  const ids = built.map((item) => item.id)
  for (const id of ids) if (ids.filter((other) => other === id).length > 1) errors.push(`duplicate id ${id} within the file`)
  // Related reading must resolve, at least within the batch.
  for (const item of built) {
    for (const related of item.articleData.relatedArticleIds ?? []) {
      if (!siblingArticleIds.has(related)) errors.push(`${item.id}: related article ${related} is authored nowhere in the batch directory`)
    }
  }

  console.log(JSON.stringify({
    file, kind, items: rows.length,
    fieldsUsed: [...new Set(rows.flatMap((row) => Object.keys(row)))].length,
    annotations: built.reduce((sum, item) => sum + item.articleData.annotations.length, 0),
    imageRecommendations: built.reduce((sum, item) => sum + (item.articleData.imageRecommendations?.length ?? 0), 0),
    calloutsWithEvidence: built.reduce((sum, item) => sum + Object.keys(item.articleData.calloutEvidence ?? {}).length, 0),
    errors,
  }, null, 1))
  if (errors.length) process.exitCode = 1
  process.exit()
}

if (kind !== 'concept') {
  // Evidence batches reference each other — a citation names a claim, a span
  // names an article — and those records are authored across sibling files that
  // have not been imported yet. Rather than guess filenames from this one, read
  // every batch in the directory and validate against the set. Guessing was
  // tried and broke the moment a span batch and its claims lived in files with
  // different stems.
  const dir = dirname(file)
  const siblings = (await readdir(dir)).filter((name) => name.endsWith('.md')).map((name) => join(dir, name))
  const everything = { concept: [], article: [], resource: [], claim: [], citation: [], span: [], relation: [] }
  for (const path of siblings) {
    const parsed = parseMarkdown(await readFile(path, 'utf8'))
    // `??=` rather than a fixed set of buckets: a new record kind should make
    // the validator report something useful, not throw while collecting context.
    if (parsed.length) (everything[detectKind(parsed[0])] ??= []).push(...parsed)
  }

  const countingCitations = everything.citation.map(citationFromRow).filter((citation) => citation.countsAsClaimEvidence)

  const context = {
    store: { claims: [], citations: [], resources: [], articleSpans: [] },
    conceptIds: new Set(everything.concept.map((row) => row.id?.trim()).filter(Boolean)),
    articleIds: new Set(everything.article.map((row) => row.id?.trim()).filter(Boolean)),
    incoming: {
      claims: new Set(everything.claim.map((row) => row.id?.trim()).filter(Boolean)),
      resources: new Set(everything.resource.map((row) => row.id?.trim()).filter(Boolean)),
      citations: new Set(everything.citation.map((row) => row.id?.trim()).filter(Boolean)),
      claimsWithEvidence: new Set(countingCitations.map((citation) => citation.claimId)),
      evidenceCountByClaim: countingCitations.reduce((map, citation) => map.set(citation.claimId, (map.get(citation.claimId) ?? 0) + 1), new Map()),
    },
  }

  // A local source ID must exist in the corpus. Three invented ones passed every
  // other check once; this is why they cannot again.
  let corpusSources = null
  try {
    corpusSources = JSON.parse(await readFile(join(dirname(dirname(file)), 'evidence', 'corpus-source-index.json'), 'utf8')).sources
  } catch {
    // No index available; the check is skipped rather than failing the batch.
  }

  const known = new Set(EVIDENCE_IMPORT_FIELDS[kind].map((field) => field.key))
  rows.forEach((values, index) => {
    const where = `Item ${index + 1} (${values.id ?? 'no id'})`
    for (const key of Object.keys(values)) if (!known.has(key)) errors.push(`${where}: unknown column "${key}"`)
    for (const error of evidenceErrors(kind, values, context)) errors.push(`${where}: ${error}`)

    const id = values.id?.trim() ?? ''
    if (corpusSources && id.startsWith('src_')) {
      const record = corpusSources[id]
      if (!record) errors.push(`${where}: ${id} is not a source the corpus contains — do not invent a source ID`)
      else if (values.source_relative_path?.trim() && values.source_relative_path.trim() !== record.sourceRelativePath) {
        errors.push(`${where}: ${id} is "${record.sourceRelativePath}" in the corpus, not "${values.source_relative_path.trim()}"`)
      }
    }
    if (corpusSources && kind === 'citation') {
      const resourceId = values.resource_id?.trim() ?? ''
      if (resourceId.startsWith('src_') && !corpusSources[resourceId]) {
        errors.push(`${where}: cites ${resourceId}, which is not a source the corpus contains`)
      }
    }
  })

  // A claim asserting verification will be demoted at import unless a counting
  // citation exists. That is not an error, but it is worth saying out loud.
  if (kind === 'claim') {
    for (const values of rows) {
      const claim = claimFromRow(values)
      if (claim.verificationStatus !== 'verified') continue
      if (!context.incoming.claimsWithEvidence.has(claim.id)) {
        notes.push(`${claim.id} asks to be verified, but no counting citation supports it yet — it will land as needs_evidence`)
      }
    }
  }

  const ids = rows.map((row) => row.id?.trim())
  for (const id of ids) if (id && ids.filter((other) => other === id).length > 1) errors.push(`duplicate id ${id} within the file`)

  console.log(JSON.stringify({ file, kind, items: rows.length, fieldsUsed: [...new Set(rows.flatMap((row) => Object.keys(row)))].length, notes, errors }, null, 1))
  if (errors.length) process.exitCode = 1
  process.exit()
}

// `sourceCandidateIds` is the same trap as `src_`, one field over: a `concept_`
// ID that does not exist would validate cleanly and point at nothing.
let corpusConcepts = null
try {
  corpusConcepts = JSON.parse(await readFile(join(dirname(dirname(file)), 'evidence', 'corpus-concept-index.json'), 'utf8')).candidates
} catch {
  // No index available; the check is skipped rather than failing the batch.
}

const known = new Set(CONCEPT_IMPORT_FIELDS.map((field) => field.key))

rows.forEach((values, index) => {
  const where = `Item ${index + 1} (${values.label ?? 'no label'})`
  for (const key of Object.keys(values)) {
    if (!known.has(key)) errors.push(`${where}: unknown column "${key}"`)
  }
  if (!values.label?.trim()) errors.push(`${where}: label is required`)
  const concept = materialiseNewConcept(conceptFromRow(values))
  for (const nodeId of [concept.primaryNodeId, ...(concept.secondaryNodeIds ?? [])].filter(Boolean)) {
    if (!MEDICAL_TAXONOMY_INDEX.byId.has(nodeId)) errors.push(`${where}: placement ${nodeId} is not a canonical node`)
  }
  for (const candidateId of concept.sourceCandidateIds ?? []) {
    if (corpusConcepts && !corpusConcepts[candidateId]) {
      errors.push(`${where}: ${candidateId} is not a concept candidate the corpus contains — do not invent a candidate ID`)
    }
  }
  if (!concept.definition) errors.push(`${where}: no definition`)
  if (!concept.explicitObjective) errors.push(`${where}: no explicit objective — a concept without one cannot be assessed`)
  if (!concept.arabicLabel && !concept.fieldNotes?.arabicLabel) errors.push(`${where}: no Arabic label and no field note saying why (LD-15)`)
  records.push(concept)
})

const ids = records.map((record) => record.id)
for (const id of ids) if (ids.filter((other) => other === id).length > 1) errors.push(`duplicate id ${id} within the file`)

console.log(JSON.stringify({
  file,
  kind,
  items: rows.length,
  fieldsUsed: [...new Set(rows.flatMap((row) => Object.keys(row)))].length,
  placements: records.map((record) => record.primaryNodeId),
  errors,
}, null, 1))
if (errors.length) process.exitCode = 1
