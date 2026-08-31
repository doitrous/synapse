import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '../..')
const baseQuestionPath = resolve(root, 'docs/Helwan-Source-Imports/question/HU-LCS-103-family97-muscle-physiology-mcq.md')
const sourcePath = resolve(root, 'docs/Helwan-Source-Imports/evidence/HU-LCS-103-family146-provenance-sources.md')
const updatePath = resolve(root, 'docs/Helwan-Source-Imports/question/HU-LCS-103-family146-q1-30-provenance-updates.md')

const family146 = 'src_aacbb031f12572131776'

const source = `# Item

## id
${family146}

## title
LCS-103 Physiology Questions — MCQ Muscle and Bone

## institution
Helwan LCS-103 local question-bank corpus

## processing_status
native_text

## collection_id
hu-y1

## source_relative_path
Year 1/LCS 103/Physiology/Questions/MCQs/MCQs - MCQ Physiology.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date


## accessed_at


## page_count
8

## sha256
aacbb031f12572131776bc76f89d69f15759e7cc6e5a3af3d3bc7239f0be610a

## rights
Local Helwan teaching and assessment material held for internal authoring only. No page image is redistributed.

## qualification
Tier-3 direct module-specific Physiology question bank headed Physiology and Questions and footed DR . El-Sawy. Every item has a right-column source-printed answer letter, but the file names no university, formal examination, cohort, sitting or independently issued answer authority. Physical pages 1–6 are byte-identical in extracted text to the governed Family-97 muscle bank and are retained only as provenance for the existing one-question-one-record entries.

## confidence
0.9

## is_assessment
yes
`

const base = await readFile(baseQuestionPath, 'utf8')
const records = base.trim().split(/\n---\n/).map((record) => record.trim()).filter(Boolean)
const selected = records.filter((record) => /## id\nQ-HU-LCS103-PHY-F97-(?:0[1-9]|[12][0-9]|30)(?:\n|$)/.test(record))

if (selected.length !== 30) throw new Error(`Expected 30 Family-97 records, found ${selected.length}`)

const updates = selected.map((record, index) => {
  const expectedId = `Q-HU-LCS103-PHY-F97-${String(index + 1).padStart(2, '0')}`
  if (!record.includes(`## id\n${expectedId}\n`)) throw new Error(`Unexpected record order at ${expectedId}`)
  if (!record.includes('## status\nDraft\n')) throw new Error(`${expectedId} is not Draft`)
  const baselineResources = record.match(/## resource_ids\n([\s\S]*?)(?=\n## )/)?.[1].trim().split(/\n+/).filter(Boolean) ?? []
  if (baselineResources.length !== 2) throw new Error(`${expectedId} does not have the governed two-source baseline`)
  return record.replace(/## resource_ids\n.*?(?=\n## )/s, `## resource_ids\n+${family146}\n`)
})

await writeFile(sourcePath, source)
await writeFile(updatePath, `${updates.join('\n\n---\n\n')}\n`)

console.log(JSON.stringify({
  files: [sourcePath, updatePath],
  counts: { resourcesCreated: 1, questionsUpdated: 30, questionsCreated: 0 },
  mutation: 'resourceIds append only',
  sourceId: family146,
}, null, 2))
