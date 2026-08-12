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
const known = new Set(CONCEPT_IMPORT_FIELDS.map((field) => field.key))
const errors = []
const records = []

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
  items: rows.length,
  fieldsUsed: [...new Set(rows.flatMap((row) => Object.keys(row)))].length,
  placements: records.map((record) => record.primaryNodeId),
  errors,
}, null, 1))
if (errors.length) process.exitCode = 1
