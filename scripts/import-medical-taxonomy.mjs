import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import vm from 'node:vm'

const [, , inputArg, outputArg] = process.argv
if (!inputArg) throw new Error('Usage: node scripts/import-medical-taxonomy.mjs <library-data.js> [output.ts]')

const inputPath = resolve(inputArg)
const outputPath = resolve(outputArg || 'src/data/medicalLibraryTaxonomy.generated.ts')
const source = await readFile(inputPath, 'utf8')
const context = { window: {} }
vm.createContext(context)
vm.runInContext(source, context, { filename: inputPath })

const data = context.window.LIBRARY_DATA
if (!data || !Array.isArray(data.schema) || !Array.isArray(data.nodes)) {
  throw new Error('The source does not contain a valid window.LIBRARY_DATA payload.')
}

const expectedSchema = ['id', 'parent', 'division', 'level', 'root', 'topic', 'subtopic', 'microtopic', 'role', 'template', 'slots', 'priority', 'note']
if (JSON.stringify(data.schema) !== JSON.stringify(expectedSchema)) {
  throw new Error(`Unexpected taxonomy schema: ${JSON.stringify(data.schema)}`)
}

const ids = new Set()
for (const row of data.nodes) {
  if (!Array.isArray(row) || row.length !== expectedSchema.length) throw new Error('Invalid taxonomy row shape.')
  if (ids.has(row[0])) throw new Error(`Duplicate taxonomy ID: ${row[0]}`)
  ids.add(row[0])
}

for (const row of data.nodes) {
  const parentId = row[1]
  if (!parentId.startsWith('ROOT-') && !ids.has(parentId)) throw new Error(`Missing parent ${parentId} for ${row[0]}`)
}

const payload = JSON.stringify(data.nodes)
const output = `/**\n * Generated from UniNect-Medical-Library-Blueprint.xlsx.\n * Do not hand-edit rows; rerun scripts/import-medical-taxonomy.mjs.\n */\nexport const MEDICAL_TAXONOMY_ROWS = ${payload} as const\n`

await writeFile(outputPath, output)
console.log(`Wrote ${data.nodes.length} taxonomy nodes to ${outputPath}`)
