/**
 * `SYS-*-SOURCE-001` — where the evidence for a system's articles comes from.
 *
 *   node --experimental-strip-types scripts/build-system-source-plan.mjs SYS-FND
 *
 * For every node the inventory marked as an article home, this says which
 * processed corpus files teach it, at which page, in what review state — and,
 * just as importantly, which nodes no local source covers at all.
 *
 * A node with no local source is not a problem to solve later: under `LD-14` it
 * is authored from current authoritative sources, and its lack of local
 * curriculum signal is recorded as a coverage risk rather than hidden. A node
 * with local sources is authored from them *and* corroborated, because
 * extraction confidence is not medical verification (`LD-08`).
 *
 * Writes docs/medical-library-program/evidence/<SYS>-source-plan.{json,md}.
 * Read-only.
 */
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { norm, bestTokenMatch, canonicalByTitle, canonicalByStem, stem, MEDICAL_TAXONOMY_INDEX } from './lib/taxonomy-match.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const outDir = join(root, 'docs', 'medical-library-program', 'evidence')
const CORPUS = process.env.CURRICULUM_CORPUS ?? join(here, '..', 'corpus')

const systemId = process.argv[2]
if (!systemId) throw new Error('Usage: build-system-source-plan.mjs <SYS-ID>')
const systemNode = MEDICAL_TAXONOMY_INDEX.byId.get(systemId)
if (!systemNode) throw new Error(`${systemId} is not a canonical node`)

const USABLE_STATUS = new Set([
  'taxonomy_complete', 'taxonomy_complete_review_required', 'machine_complete_review_required',
  'taxonomy_complete_with_explicit_media_dependencies', 'taxonomy_complete_with_explicit_page_blockers',
  'completed_with_explicit_blockers_review_required',
])

const under = (nodeId) => Boolean(nodeId) && MEDICAL_TAXONOMY_INDEX.lineage(nodeId).some((entry) => entry.id === systemId)

/* ---- the nodes that need evidence --------------------------------------- */

const classification = JSON.parse(await readFile(join(outDir, `${systemId}-node-classification.json`), 'utf8'))
const wanted = classification.nodes.filter((node) =>
  node.classification === 'atomic article home' || node.classification === 'overview article')
const wantedIds = new Set(wanted.map((node) => node.nodeId))

/* ---- match a corpus label to one of them -------------------------------- */

const cache = new Map()
function resolve(label) {
  const key = norm(label ?? '')
  if (!key) return null
  if (cache.has(key)) return cache.get(key)
  let hit = null
  for (const candidate of canonicalByTitle.get(key) ?? []) if (under(candidate.id)) { hit = candidate.id; break }
  if (!hit) for (const candidate of canonicalByStem.get(stem(label)) ?? []) if (under(candidate.id)) { hit = candidate.id; break }
  if (!hit) {
    const token = bestTokenMatch(label, systemId, 3, systemNode.division)
    if (token) hit = token.node.id
  }
  cache.set(key, hit)
  return hit
}

/* ---- walk the processed corpus ------------------------------------------ */

const rootDir = join(CORPUS, '01-explicitly-taught')
const byNode = new Map()
const filesTouched = new Map()
let recordsSeen = 0

for (const collection of await readdir(rootDir, { withFileTypes: true })) {
  if (!collection.isDirectory()) continue
  let sources
  try { sources = await readdir(join(rootDir, collection.name), { withFileTypes: true }) } catch { continue }
  for (const source of sources) {
    if (!source.isDirectory()) continue
    let doc
    try { doc = JSON.parse(await readFile(join(rootDir, collection.name, source.name, 'taxonomy.json'), 'utf8')) } catch { continue }
    if (!USABLE_STATUS.has(doc.processing_status)) continue

    for (const concept of doc.concepts ?? []) {
      recordsSeen += 1
      // Try the most specific label first: a microtopic names one thing, a
      // subject names a whole course.
      const nodeId = [concept.microtopic, concept.subtopic, concept.topic, concept.subject]
        .map((label) => (label ? resolve(label) : null))
        .find((hit) => hit && wantedIds.has(hit))
      if (!nodeId) continue

      const occurrence = (concept.occurrences ?? [])[0] ?? {}
      const entry = byNode.get(nodeId) ?? { nodeId, records: 0, sources: new Map() }
      entry.records += 1
      const existing = entry.sources.get(doc.source_id)
      if (existing) {
        existing.records += 1
        if (occurrence.page_number && !existing.pages.includes(occurrence.page_number) && existing.pages.length < 8) existing.pages.push(occurrence.page_number)
      } else {
        entry.sources.set(doc.source_id, {
          sourceId: doc.source_id,
          sourceRelativePath: doc.source_relative_path,
          sha256: doc.current_file_sha256,
          processingStatus: doc.processing_status,
          reviewState: doc.processing_status.includes('review_required') ? 'review required' : 'processed',
          pages: occurrence.page_number ? [occurrence.page_number] : [],
          records: 1,
        })
      }
      byNode.set(nodeId, entry)
      filesTouched.set(doc.source_id, doc.source_relative_path)
    }
  }
}

/* ---- assemble ----------------------------------------------------------- */

const plan = wanted.map((node) => {
  const found = byNode.get(node.nodeId)
  const sources = found ? [...found.sources.values()].sort((a, b) => b.records - a.records) : []
  return {
    nodeId: node.nodeId,
    title: node.title,
    level: node.level,
    templateId: node.templateId,
    classification: node.classification,
    localRecords: found?.records ?? 0,
    localSources: sources.length,
    sourcePlan: sources.length ? 'local corpus, corroborated' : 'authoritative sources only',
    coverageRisk: sources.length
      ? null
      : 'No processed local source teaches this node. Authored from current authoritative sources; local curriculum emphasis is unverified until more of the corpus is processed (LD-14).',
    sources: sources.slice(0, 6),
  }
})

const withLocal = plan.filter((node) => node.localSources > 0)
const withoutLocal = plan.filter((node) => node.localSources === 0)

const summary = {
  system: systemId,
  title: systemNode.title,
  plannedArticles: plan.length,
  withLocalEvidence: withLocal.length,
  withoutLocalEvidence: withoutLocal.length,
  distinctCorpusFiles: filesTouched.size,
  corpusRecordsScanned: recordsSeen,
  reviewedSources: [...new Set(plan.flatMap((node) => node.sources).filter((source) => source.reviewState === 'processed').map((source) => source.sourceId))].length,
}

await mkdir(outDir, { recursive: true })
await writeFile(join(outDir, `${systemId}-source-plan.json`), `${JSON.stringify({
  task: `${systemId}-SOURCE-001`,
  rule: 'Only files the corpus marks as processed are read. Extraction confidence is not medical verification (LD-08); every local claim is corroborated before publication.',
  summary,
  nodes: plan,
}, null, 1)}\n`)

const md = [
  `# ${systemId} source plan`,
  '',
  `\`${systemId}-SOURCE-001\`. Regenerate with`,
  '`node --experimental-strip-types scripts/build-system-source-plan.mjs ' + systemId + '`.',
  '',
  '| | |',
  '|---|---:|',
  `| Planned articles | ${summary.plannedArticles} |`,
  `| — with a processed local source | ${summary.withLocalEvidence} |`,
  `| — authored from authoritative sources only | ${summary.withoutLocalEvidence} |`,
  `| Distinct corpus files touching this system | ${summary.distinctCorpusFiles} |`,
  `| Corpus concept records scanned | ${summary.corpusRecordsScanned.toLocaleString('en-GB')} |`,
  '',
  '## Author these first',
  '',
  'Nodes the corpus actually teaches, ordered by how much local material supports',
  'them. Local material establishes curriculum emphasis; it never substitutes for',
  'medical verification (`LD-08`).',
  '',
  '| Node | Title | Local sources | Records | First source |',
  '|---|---|---:|---:|---|',
  ...withLocal.sort((a, b) => b.localRecords - a.localRecords).slice(0, 60).map((node) =>
    `| \`${node.nodeId}\` | ${node.title} | ${node.localSources} | ${node.localRecords} | \`${node.sources[0]?.sourceRelativePath ?? '—'}\`${node.sources[0]?.pages.length ? `, p${node.sources[0].pages.slice(0, 3).join(', ')}` : ''} |`),
  ...(withLocal.length > 60 ? ['', `*Showing the first 60 of ${withLocal.length}. The rest are in the JSON.*`] : []),
  '',
  '## Coverage risks',
  '',
  withoutLocal.length
    ? `${withoutLocal.length} planned articles have no processed local source. They are authored from current authoritative sources, and their local curriculum emphasis is **unverified** until more of the corpus is processed. That is a recorded risk, not a blocker (\`LD-14\`).`
    : 'Every planned article has at least one processed local source.',
  '',
  ...(withoutLocal.length
    ? ['| Node | Title |', '|---|---|', ...withoutLocal.slice(0, 60).map((node) => `| \`${node.nodeId}\` | ${node.title} |`),
       ...(withoutLocal.length > 60 ? ['', `*Showing the first 60 of ${withoutLocal.length}.*`] : [])]
    : []),
  '',
].join('\n')

await writeFile(join(outDir, `${systemId}-source-plan.md`), `${md}\n`)
console.log(JSON.stringify(summary, null, 1))
