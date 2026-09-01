/**
 * `SYS-*-INVENTORY-001` — classify a system's nodes and dispose of its content.
 *
 *   node --experimental-strip-types scripts/build-system-inventory.mjs SYS-FND
 *
 * Two outputs per system:
 *
 * - a node classification, one of the five values the master plan allows, for
 *   every node under the root;
 * - a disposition ledger for every article and concept that already touches the
 *   system, one of keep/enrich/correct/merge/split/redirect/deprecate/exclude.
 *
 * The classification is a *proposal with a stated rule*, not an assertion. LD-04
 * forbids mechanically giving every node an article, so the rule errs toward
 * hubs and marks a node as an article home only where it is plausibly a distinct
 * studiable unit. Local teaching evidence from the corpus raises priority; it
 * never invents an article.
 *
 * Writes docs/medical-library-program/evidence/<SYS>-node-classification.json
 * and <SYS>-disposition-ledger.json. Read-only with respect to all content.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { norm, MEDICAL_TAXONOMY_SEED, MEDICAL_TAXONOMY_INDEX } from './lib/taxonomy-match.mjs'
import { CURRICULUM_CATALOG } from '../src/data/curriculumCatalog.ts'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const outDir = join(root, 'docs', 'medical-library-program', 'evidence')

const systemId = process.argv[2]
if (!systemId) throw new Error('Usage: build-system-inventory.mjs <SYS-ID>')
const systemNode = MEDICAL_TAXONOMY_INDEX.byId.get(systemId)
if (!systemNode) throw new Error(`${systemId} is not a canonical node`)

/* ---- what the corpus actually teaches ----------------------------------- */

const taughtLabels = new Map()
const taughtByNode = new Map()
try {
  const gaps = JSON.parse(await readFile(join(outDir, 'curriculum-gap-list.json'), 'utf8'))
  for (const entry of gaps.taught ?? []) {
    taughtLabels.set(norm(entry.label), entry.distinctSources)
    // A label that matched a node carries its signal to that node too, so a
    // canonical title the corpus teaches under a different name still counts.
    if (entry.synapseNodeId) taughtByNode.set(entry.synapseNodeId, (taughtByNode.get(entry.synapseNodeId) ?? 0) + entry.distinctSources)
  }
} catch {
  // The gap list is optional; without it every node simply has no local signal.
}

/* ---- existing content --------------------------------------------------- */

const launch = JSON.parse(await readFile(join(root, 'server', 'data', 'medical-library-v1.json'), 'utf8'))
const ledger = launch.states['nishany-admin-content-ledger-v4'] ?? []
const graph = launch.states['nishany-concept-graph-v2'] ?? { concepts: [], relations: [] }
const articles = ledger.filter((item) => item.kind === 'article')

const VALID_SUBJECT_IDS = new Set(CURRICULUM_CATALOG.map((system) => system.id))

const under = (nodeId) => Boolean(nodeId) && MEDICAL_TAXONOMY_INDEX.lineage(nodeId).some((entry) => entry.id === systemId)
const placements = (record) => [record.primaryNodeId, ...(record.secondaryNodeIds ?? [])].filter(Boolean)

const systemArticles = articles.filter((article) => placements(article.articleData ?? {}).some(under))
const systemConcepts = graph.concepts.filter((concept) => placements(concept).some(under))

/* ---- node classification ------------------------------------------------ */

const CLASSIFICATIONS = [
  'navigation-only hub',
  'overview article',
  'atomic article home',
  'secondary placement only',
  'empty but legitimate planned destination',
]

/**
 * Classify one node.
 *
 * A parent is a hub: its children carry the teaching, and an overview on top of
 * them has to earn its place rather than be assumed. A leaf is an article home
 * only when its label reads as a studiable unit — a node named for a facet or a
 * pairing is a placement, not an article.
 */
function classify(node) {
  const children = MEDICAL_TAXONOMY_INDEX.children(node.id)
  const taught = Math.max(taughtLabels.get(norm(node.title)) ?? 0, taughtByNode.get(node.id) ?? 0)
  const placed = [...systemArticles.filter((article) => placements(article.articleData ?? {}).includes(node.id))]

  if (children.length) {
    // A topic with many children benefits from an overview that says how they
    // fit together; a small cluster does not need one.
    const wantsOverview = node.level === 'Topic' && children.length >= 3
    return {
      classification: wantsOverview ? 'overview article' : 'navigation-only hub',
      rationale: wantsOverview
        ? `${children.length} child clusters — an overview earns its place by saying how they relate. The teaching itself sits in the children.`
        : `Has ${children.length} child node${children.length === 1 ? '' : 's'} that carry the teaching. A hub, not an article (LD-04).`,
      existingArticles: placed.map((article) => article.id),
      localTeachingSources: taught,
    }
  }

  if (placed.length) {
    return {
      classification: 'atomic article home',
      rationale: `Already the canonical or secondary home of ${placed.length} article${placed.length === 1 ? '' : 's'}.`,
      existingArticles: placed.map((article) => article.id),
      localTeachingSources: taught,
    }
  }

  // A leaf whose label names a thing a student could revise on its own.
  const words = node.title.split(/\s+/).length
  const isStudiable = words <= 6 && !/^(other|misc|general)\b/i.test(node.title)
  return {
    classification: isStudiable ? 'atomic article home' : 'empty but legitimate planned destination',
    rationale: isStudiable
      ? `Leaf naming a distinct, reusable unit${taught ? `, taught in ${taught} processed corpus source${taught === 1 ? '' : 's'}` : ''}.`
      : 'Leaf whose label is a grouping rather than a studiable unit. A legitimate empty destination until evidence says otherwise.',
    existingArticles: [],
    localTeachingSources: taught,
  }
}

const descendants = MEDICAL_TAXONOMY_SEED.filter((node) => node.id !== systemId && under(node.id))
const classified = descendants.map((node) => ({
  nodeId: node.id,
  title: node.title,
  level: node.level,
  templateId: node.templateId ?? null,
  parentId: node.parentId,
  ...classify(node),
}))

/* ---- disposition ledger ------------------------------------------------- */

/**
 * What to do with a record that already exists.
 *
 * Nothing is ever `keep` on sight: every current article lacks annotations,
 * image recommendations and a related-reading reason, all of which Phase 0 made
 * possible and none of which exist yet. `enrich` is the honest default.
 */
function disposeArticle(article) {
  const data = article.articleData ?? {}
  const reasons = []
  if (!(data.annotations ?? []).length) reasons.push('no statement annotations')
  if (!(data.mediaRequests ?? []).length) reasons.push('no media requests')
  if (!(data.calloutEvidence && Object.keys(data.calloutEvidence).length)) reasons.push('callouts carry no per-line evidence')
  if (!VALID_SUBJECT_IDS.has(article.subjectId)) reasons.push(`subjectId "${article.subjectId}" is outside the live subject contract (BLK-09)`)
  if (article.status === 'Published' && data.publicationGate !== 'publishable') reasons.push(`published while its gate says ${data.publicationGate} (BLK-10)`)

  return {
    id: article.id,
    title: article.title,
    status: article.status,
    subjectId: article.subjectId,
    primaryNodeId: data.primaryNodeId ?? null,
    canonicalHere: under(data.primaryNodeId),
    publicationGate: data.publicationGate ?? null,
    templateId: data.templateId ?? null,
    disposition: reasons.some((reason) => reason.includes('BLK-09')) ? 'correct' : 'enrich',
    why: reasons.length ? reasons.join('; ') : 'complete against the current contract',
  }
}

function disposeConcept(concept) {
  const reasons = []
  if (!VALID_SUBJECT_IDS.has(concept.subjectId)) reasons.push(`subjectId "${concept.subjectId}" is outside the live subject contract (BLK-09)`)
  if (!concept.explicitObjective) reasons.push('no explicit objective — a concept without one cannot be assessed')
  if (!graph.relations.some((relation) => relation.sourceId === concept.id || relation.targetId === concept.id)) reasons.push('no typed relation')
  if (concept.publicationStatus !== 'published') reasons.push(`publication status ${concept.publicationStatus}`)

  return {
    id: concept.id,
    label: concept.label,
    subjectId: concept.subjectId,
    primaryNodeId: concept.primaryNodeId ?? null,
    canonicalHere: under(concept.primaryNodeId),
    conceptType: concept.conceptType ?? null,
    publicationStatus: concept.publicationStatus ?? null,
    disposition: reasons.some((reason) => reason.includes('BLK-09')) ? 'correct' : 'enrich',
    why: reasons.length ? reasons.join('; ') : 'complete against the current contract',
  }
}

const articleLedger = systemArticles.map(disposeArticle)
const conceptLedger = systemConcepts.map(disposeConcept)

const tally = (rows, key) => rows.reduce((acc, row) => ({ ...acc, [row[key]]: (acc[row[key]] ?? 0) + 1 }), {})

const summary = {
  system: systemId,
  title: systemNode.title,
  nodes: {
    total: classified.length,
    byLevel: tally(classified, 'level'),
    byClassification: tally(classified, 'classification'),
  },
  plannedArticles: classified.filter((node) => node.classification === 'atomic article home').length
    + classified.filter((node) => node.classification === 'overview article').length,
  articles: {
    touching: articleLedger.length,
    canonicalHere: articleLedger.filter((row) => row.canonicalHere).length,
    byDisposition: tally(articleLedger, 'disposition'),
    outsideSubjectContract: articleLedger.filter((row) => !VALID_SUBJECT_IDS.has(row.subjectId)).length,
  },
  concepts: {
    touching: conceptLedger.length,
    canonicalHere: conceptLedger.filter((row) => row.canonicalHere).length,
    byDisposition: tally(conceptLedger, 'disposition'),
    outsideSubjectContract: conceptLedger.filter((row) => !VALID_SUBJECT_IDS.has(row.subjectId)).length,
  },
  localTeachingSignal: classified.filter((node) => node.localTeachingSources > 0).length,
}

await mkdir(outDir, { recursive: true })
await writeFile(join(outDir, `${systemId}-node-classification.json`), `${JSON.stringify({
  task: `${systemId}-INVENTORY-001`,
  rule: 'A parent is a hub; a leaf is an article home only where its label names a distinct studiable unit (LD-04). Local corpus signal raises priority, never creates an article.',
  classifications: CLASSIFICATIONS,
  summary: summary.nodes,
  nodes: classified,
}, null, 1)}\n`)

await writeFile(join(outDir, `${systemId}-disposition-ledger.json`), `${JSON.stringify({
  task: `${systemId}-INVENTORY-001`,
  rule: 'Stable IDs are preserved (LD-06). Nothing is deleted; BLK-09 records are corrected under a documented migration.',
  summary: { articles: summary.articles, concepts: summary.concepts },
  articles: articleLedger,
  concepts: conceptLedger,
}, null, 1)}\n`)

console.log(JSON.stringify(summary, null, 1))
