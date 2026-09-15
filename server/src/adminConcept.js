/**
 * The concept graph, sliced — the admin-side mirror of `adminContent.js`.
 *
 * `GET /api/state/nishany-concept-graph-v2` ships the whole graph — ~72 MB in
 * production — to every admin surface that only needs a concept's id, label and
 * taxonomy placement: the concept navigator, the import reference-guards, the
 * curriculum membership maths. This serves that index instead. The prose a
 * single concept's editor needs (definition, pitfalls, evidence, images) stays
 * on the full-document read the editor already uses.
 *
 * Guarded by `requireConsole`, the same gate the whole-graph authoring read sits
 * behind. Reads only; writes are unchanged (the delta path over the graph's
 * `concepts`/`relations` collections — see `stateMerge.js`).
 *
 * Cache shape copied from `adminContent.js`: a cheap version probe first so a
 * warm snapshot never pulls the 72 MB body, re-checked on every use so a second
 * process refreshes after another one's write.
 */
import { pool } from './db.js'
import { requireConsole } from './auth.js'

const GRAPH_KEY = 'nishany-concept-graph-v2'

let snapshot = null

const list = (value) => (Array.isArray(value) ? value.filter((entry) => typeof entry === 'string' && entry) : [])

/**
 * Every concept's id, label and taxonomy placement — the fields the navigator,
 * the import reference-guards and the curriculum membership read. Never the
 * definition/pitfalls/evidence prose, which is most of the weight.
 */
export function conceptIndexRow(concept) {
  return {
    id: concept.id,
    label: concept.label,
    topicTagId: concept.topicTagId,
    subtopicId: concept.subtopicId,
    microtopicId: concept.microtopicId,
    nanotopicId: concept.nanotopicId,
    primaryNodeId: concept.primaryNodeId,
    secondaryNodeIds: list(concept.secondaryNodeIds),
  }
}

async function load() {
  // Cheap version probe first: a warm snapshot must never pull the 72 MB graph
  // just to learn we already have it. Version-checked on every use, not merely
  // invalidated in memory, because another process may have warmed its cache
  // before this one's write (same reasoning as adminContent.js).
  const [vrows] = await pool.query(
    `SELECT MAX(id) AS version FROM app_state_versions WHERE k = ?`,
    [GRAPH_KEY],
  )
  const signature = String(vrows[0]?.version ?? 0)
  if (snapshot && snapshot.signature === signature) return snapshot
  const [rows] = await pool.query(`SELECT v FROM app_state WHERE k = ?`, [GRAPH_KEY])
  let concepts = []
  try {
    const graph = JSON.parse(rows[0]?.v ?? '{"concepts":[]}')
    concepts = Array.isArray(graph?.concepts) ? graph.concepts : []
  } catch {
    concepts = []
  }
  snapshot = { signature, items: concepts.filter((concept) => concept && concept.id).map(conceptIndexRow) }
  return snapshot
}

export async function adminConceptIndexHandler(req, res) {
  const { signature, items } = await load()
  const etag = `W/"admin-concept-index-1-${signature}"`
  res.set('ETag', etag)
  res.set('Cache-Control', 'private, no-cache')
  if (req.get('if-none-match') === etag) return res.status(304).end()
  return res.json({ version: signature, items })
}

export function registerAdminConceptRoutes(app) {
  const wrap = (fn) => (req, res) => Promise.resolve(fn(req, res)).catch((error) => {
    console.error(error)
    res.status(500).json({ error: error.message || 'server error' })
  })
  app.get('/api/admin/concept/index', requireConsole, wrap(adminConceptIndexHandler))
}
