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
import { pool, appStateVersions } from './db.js'
import { conceptDetail } from './studentLedger.js'

const CONCEPT_GRAPH_KEY = 'nishany-concept-graph-v2'

let snapshot = null
let rebuilding = null

export async function loadConceptCatalogue() {
  // Version-check without reading the 31 MB `v`; the blob is pulled only on a
  // miss. Selecting `v` here read the whole concept graph out of MariaDB on
  // every call, warm cache or not. Cold rebuilds are coalesced. See
  // appStateVersions and the same pattern in loadStudentContent.
  const versions = await appStateVersions([CONCEPT_GRAPH_KEY])
  const signature = String(versions.get(CONCEPT_GRAPH_KEY) ?? 0)
  if (snapshot && snapshot.signature === signature) return snapshot
  if (rebuilding && rebuilding.signature === signature) return rebuilding.promise
  const promise = (async () => {
    const [rows] = await pool.query('SELECT v FROM app_state WHERE k = ?', [CONCEPT_GRAPH_KEY])
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
  })()
  rebuilding = { signature, promise }
  try {
    return await promise
  } finally {
    if (rebuilding && rebuilding.promise === promise) rebuilding = null
  }
}

/** Drop the in-memory cache. Tests reset between fixtures; nothing else needs it. */
export function resetConceptCatalogue() {
  snapshot = null
}
