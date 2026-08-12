/**
 * An index of every corpus concept candidate, so `sourceCandidateIds` cannot
 * name one that does not exist.
 *
 *   node --experimental-strip-types scripts/build-corpus-concept-index.mjs
 *
 * The companion of `build-corpus-source-index.mjs`, and written for the same
 * reason. A `src_` ID that did not exist once validated cleanly because nothing
 * checked it; `concept_` IDs are the identical trap one field over. This index
 * makes the check mechanical, and it doubles as the lookup an author uses to
 * find the real candidate for a concept rather than leaving the field empty.
 */
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const outDir = join(here, '..', 'docs', 'medical-library-program', 'evidence')
const CORPUS = process.env.CURRICULUM_CORPUS ?? '/Users/doitrous/Downloads/Resources Digestion Current aug 7'
const rootDir = join(CORPUS, '01-explicitly-taught')

/** Candidate ID → the labels and sources it was extracted from. */
const candidates = {}
/** Normalised label → candidate IDs, which is how an author actually searches. */
const byLabel = {}

const norm = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

let files = 0
for (const collection of await readdir(rootDir, { withFileTypes: true })) {
  if (!collection.isDirectory()) continue
  let entries
  try { entries = await readdir(join(rootDir, collection.name), { withFileTypes: true }) } catch { continue }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    let doc
    try { doc = JSON.parse(await readFile(join(rootDir, collection.name, entry.name, 'taxonomy.json'), 'utf8')) } catch { continue }
    files += 1
    for (const concept of doc.concepts ?? []) {
      const id = concept.candidate_id
      if (!id) continue
      const label = concept.canonical_looking_label || concept.atomic_concept_name || ''
      candidates[id] ??= { labels: [], sources: [], statements: [] }
      if (label && !candidates[id].labels.includes(label)) candidates[id].labels.push(label)
      const source = `${collection.name}/${entry.name}`
      if (!candidates[id].sources.includes(source)) candidates[id].sources.push(source)
      if (concept.atomic_statement && candidates[id].statements.length < 3) candidates[id].statements.push(concept.atomic_statement)
      const key = norm(label)
      if (key) { byLabel[key] ??= []; if (!byLabel[key].includes(id)) byLabel[key].push(id) }
    }
  }
}

await mkdir(outDir, { recursive: true })
await writeFile(join(outDir, 'corpus-concept-index.json'), JSON.stringify({ files, candidates, byLabel }, null, 1))
console.log(JSON.stringify({ files, candidates: Object.keys(candidates).length, labels: Object.keys(byLabel).length }, null, 1))
