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
import { readFile } from 'node:fs/promises'
import { conceptFromRow, materialiseNewConcept, CONCEPT_IMPORT_FIELDS } from '../src/data/conceptImport.ts'
import { EVIDENCE_IMPORT_FIELDS, evidenceErrors, claimFromRow, citationFromRow } from '../src/data/evidenceImport.ts'
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
  if ('claim_id' in sample && 'resource_id' in sample) return 'citation'
  if ('concept_id' in sample && 'display_text' in sample) return 'claim'
  if ('article_id' in sample && 'section_id' in sample) return 'span'
  if ('institution' in sample && 'processing_status' in sample) return 'resource'
  return 'concept'
}

const kind = detectKind(rows[0] ?? {})
const errors = []
const records = []

if (kind !== 'concept') {
  // Evidence batches are checked against whatever the file itself declares,
  // plus the batch directory's other files, since claims and their citations are
  // authored together and neither exists in the store yet.
  const sibling = async (name) => {
    try { return parseMarkdown(await readFile(new URL(name, `file://${process.cwd()}/`), 'utf8')) } catch { return [] }
  }
  const base = file.replace(/-(sources|claims|citations|spans)\.md$/, '')
  const claims = base === file ? [] : await sibling(`${base}-claims.md`)
  const resources = base === file ? [] : await sibling(`${base}-sources.md`)
  const citations = base === file ? [] : await sibling(`${base}-citations.md`)
  const conceptRows = base === file ? [] : await sibling(`${base.replace(/-002$/, '-001')}.md`)

  const countingCitations = citations.map(citationFromRow).filter((citation) => citation.countsAsClaimEvidence)

  const context = {
    store: { claims: [], citations: [], resources: [], articleSpans: [] },
    conceptIds: new Set(conceptRows.map((row) => row.id?.trim()).filter(Boolean)),
    articleIds: new Set(),
    incoming: {
      claims: new Set(claims.map((row) => row.id?.trim()).filter(Boolean)),
      resources: new Set(resources.map((row) => row.id?.trim()).filter(Boolean)),
      citations: new Set(citations.map((row) => row.id?.trim()).filter(Boolean)),
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

  // A verified claim must actually be supported by a citation that counts.
  if (kind === 'claim') {
    const counting = citations.map(citationFromRow).filter((citation) => citation.countsAsClaimEvidence)
    for (const values of rows) {
      const claim = claimFromRow(values)
      if (claim.verificationStatus !== 'verified') continue
      if (!counting.some((citation) => citation.claimId === claim.id)) {
        errors.push(`${claim.id}: marked verified but no citation in this batch counts as evidence for it`)
      }
    }
  }

  const ids = rows.map((row) => row.id?.trim())
  for (const id of ids) if (id && ids.filter((other) => other === id).length > 1) errors.push(`duplicate id ${id} within the file`)

  console.log(JSON.stringify({ file, kind, items: rows.length, fieldsUsed: [...new Set(rows.flatMap((row) => Object.keys(row)))].length, errors }, null, 1))
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
