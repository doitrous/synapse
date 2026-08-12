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
import { conceptFromRow, materialiseNewConcept, CONCEPT_IMPORT_FIELDS } from '../src/data/conceptImport.ts'
import { EVIDENCE_IMPORT_FIELDS, evidenceErrors, citationFromRow, claimFromRow } from '../src/data/evidenceImport.ts'
import { IMPORT_SCHEMAS, importRowToContent, validateImportRow } from '../src/data/bulkImport.ts'
import { materialiseNewItem } from '../src/data/importMerge.ts'
import { missingRequiredSections } from '../src/data/articleTemplates.ts'
import { MEDICAL_TAXONOMY_INDEX } from '../src/data/medicalLibraryTaxonomy.ts'

const file = process.argv[2]
if (!file) throw new Error('Usage: validate-content-batch.mjs <batch.md>')

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

const rows = parseMarkdown(await readFile(file, 'utf8'))

/**
 * Which contract this file is written against.
 *
 * Inferred from the columns rather than the filename, so a file cannot be
 * validated against the wrong contract by being misnamed.
 */
function detectKind(sample) {
  if ('summary' in sample && 'sections' in sample) return 'article'
  if ('claim_id' in sample && 'resource_id' in sample) return 'citation'
  if ('concept_id' in sample && 'display_text' in sample) return 'claim'
  if ('article_id' in sample && 'section_id' in sample) return 'span'
  if ('institution' in sample && 'processing_status' in sample) return 'resource'
  return 'concept'
}

const kind = detectKind(rows[0] ?? {})
const errors = []
const notes = []
const records = []

if (kind === 'article') {
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
      if (!ids.includes(related)) errors.push(`${item.id}: related article ${related} is not in this batch — confirm it exists before import`)
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
  const everything = { concept: [], article: [], resource: [], claim: [], citation: [], span: [] }
  for (const path of siblings) {
    const parsed = parseMarkdown(await readFile(path, 'utf8'))
    if (parsed.length) everything[detectKind(parsed[0])].push(...parsed)
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

  const known = new Set(EVIDENCE_IMPORT_FIELDS[kind].map((field) => field.key))
  rows.forEach((values, index) => {
    const where = `Item ${index + 1} (${values.id ?? 'no id'})`
    for (const key of Object.keys(values)) if (!known.has(key)) errors.push(`${where}: unknown column "${key}"`)
    for (const error of evidenceErrors(kind, values, context)) errors.push(`${where}: ${error}`)
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
