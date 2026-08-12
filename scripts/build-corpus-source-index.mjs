/**
 * An index of every corpus source ID, so a citation cannot name one that does
 * not exist.
 *
 *   node --experimental-strip-types scripts/build-corpus-source-index.mjs
 *
 * Written after a batch was authored with three invented `src_` IDs. They
 * validated cleanly — nothing checked them against the corpus — and would have
 * become citations pointing at sources that never existed. Inventing an ID is
 * exactly what the standing rules forbid, so the check is now mechanical rather
 * than a matter of remembering.
 */
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const outDir = join(here, '..', 'docs', 'medical-library-program', 'evidence')
const CORPUS = process.env.CURRICULUM_CORPUS ?? '/Users/doitrous/Downloads/Resources Digestion Current aug 7'

const rootDir = join(CORPUS, '01-explicitly-taught')
const sources = {}

for (const collection of await readdir(rootDir, { withFileTypes: true })) {
  if (!collection.isDirectory()) continue
  let entries
  try { entries = await readdir(join(rootDir, collection.name), { withFileTypes: true }) } catch { continue }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    let doc
    try { doc = JSON.parse(await readFile(join(rootDir, collection.name, entry.name, 'taxonomy.json'), 'utf8')) } catch { continue }
    if (!doc.source_id) continue
    sources[doc.source_id] = {
      sourceRelativePath: doc.source_relative_path,
      sha256: doc.current_file_sha256,
      processingStatus: doc.processing_status,
      pageCount: doc.page_count ?? null,
      languages: doc.languages ?? [],
    }
  }
}

await mkdir(outDir, { recursive: true })
await writeFile(join(outDir, 'corpus-source-index.json'), `${JSON.stringify({
  note: 'Every source ID the corpus actually contains. A batch naming a src_ ID absent from here is naming a source that does not exist.',
  count: Object.keys(sources).length,
  sources,
}, null, 1)}\n`)
console.log(JSON.stringify({ sources: Object.keys(sources).length }, null, 1))
