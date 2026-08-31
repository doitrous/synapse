import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '../..')
const baseQuestionPath = resolve(root, 'docs/Helwan-Source-Imports/question/HU-LCS-103-family98-bone-physiology-mcq.md')
const updatePath = resolve(root, 'docs/Helwan-Source-Imports/question/HU-LCS-103-family146-q31-40-provenance-updates.md')

const family146 = 'src_aacbb031f12572131776'

const base = await readFile(baseQuestionPath, 'utf8')
const records = base.trim().split(/\n---\n/).map((record) => record.trim()).filter(Boolean)
const selected = records.filter((record) => /## id\nQ-HU-LCS103-PHY-F98-(?:0[1-9]|10)(?:\n|$)/.test(record))

if (selected.length !== 10) throw new Error(`Expected 10 Family-98 records, found ${selected.length}`)

const updates = selected.map((record, index) => {
  const expectedId = `Q-HU-LCS103-PHY-F98-${String(index + 1).padStart(2, '0')}`
  if (!record.includes(`## id\n${expectedId}\n`)) throw new Error(`Unexpected record order at ${expectedId}`)
  if (!record.includes('## status\nDraft\n')) throw new Error(`${expectedId} is not Draft`)
  const baselineResources = record.match(/## resource_ids\n([\s\S]*?)(?=\n## )/)?.[1].trim().split(/\n+/).filter(Boolean) ?? []
  if (baselineResources.length !== 2) throw new Error(`${expectedId} does not have the governed two-source baseline`)
  if (baselineResources.includes(family146)) throw new Error(`${expectedId} already carries Family-146 provenance`)
  return record.replace(/## resource_ids\n.*?(?=\n## )/s, `## resource_ids\n+${family146}\n`)
})

await writeFile(updatePath, `${updates.join('\n\n---\n\n')}\n`)

console.log(JSON.stringify({
  files: [updatePath],
  counts: { resourcesCreated: 0, questionsUpdated: 10, questionsCreated: 0 },
  mutation: 'resourceIds append only',
  sourceId: family146,
}, null, 2))
