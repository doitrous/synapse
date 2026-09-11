/**
 * One concept's full detail, on demand.
 *
 * The student concept read is split like articles and questions: the bulk index
 * (`conceptGraphForStudent`) carries every field the many-concept surfaces read,
 * and the prose a single concept's glossary card needs — `definition`,
 * `pitfalls`, its images and evidence — is fetched here, one concept at a time,
 * only when the reader opens that concept. That is what keeps the index small.
 *
 * The 31 MB document is parsed once per version and held as a by-id map, the
 * same version-checked cache `loadStudentContent` uses: another process may have
 * warmed a different version, so the signature is re-read on every call and the
 * map rebuilt only when it moved.
 */
import { pool } from './db.js'
import { conceptDetail } from './studentLedger.js'

const CONCEPT_GRAPH_KEY = 'nishany-concept-graph-v2'

let snapshot = null

export async function loadConceptCatalogue() {
  const [rows] = await pool.query(
    `SELECT v, (SELECT MAX(id) FROM app_state_versions WHERE k = ?) AS version
       FROM app_state WHERE k = ?`,
    [CONCEPT_GRAPH_KEY, CONCEPT_GRAPH_KEY],
  )
  const signature = String(rows[0]?.version ?? 0)
  if (snapshot && snapshot.signature === signature) return snapshot
  let concepts = []
  try {
    const graph = JSON.parse(rows[0]?.v ?? '{"concepts":[]}')
    concepts = Array.isArray(graph?.concepts) ? graph.concepts : []
  } catch {
    concepts = []
  }
  const byId = new Map()
  for (const concept of concepts) {
    if (concept?.id) byId.set(String(concept.id), conceptDetail(concept))
  }
  snapshot = { signature, byId }
  return snapshot
}

/** Drop the in-memory cache. Tests reset between fixtures; nothing else needs it. */
export function resetConceptCatalogue() {
  snapshot = null
}
