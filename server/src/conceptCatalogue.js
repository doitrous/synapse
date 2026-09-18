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
import { conceptDetail, conceptGraphForStudent } from './studentLedger.js'

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
    let relations = []
    try {
      const graph = JSON.parse(rows[0]?.v ?? '{"concepts":[]}')
      concepts = Array.isArray(graph?.concepts) ? graph.concepts : []
      relations = Array.isArray(graph?.relations) ? graph.relations : []
    } catch {
      concepts = []
      relations = []
    }
    const byId = new Map()
    for (const concept of concepts) {
      if (concept?.id) byId.set(String(concept.id), conceptDetail(concept))
    }
    // `relations` is small (a few thousand edges) and the per-university slim
    // index is built and cached on demand — see `loadConceptIndex`.
    snapshot = { signature, byId, relations, indexByUni: new Map() }
    return snapshot
  })()
  rebuilding = { signature, promise }
  try {
    return await promise
  } finally {
    if (rebuilding && rebuilding.promise === promise) rebuilding = null
  }
}

/**
 * The slim concept *index* for a student's university — the bulk read the
 * many-concept surfaces (dashboard, library, performance, qbank, adaptive) hold.
 *
 * `conceptGraphForStudent` scopes to the university and keeps only the index
 * fields; the prose is fetched per concept from `/api/content/concept/:id`. This
 * is served regardless of role, so a console user browsing a student surface
 * gets the ~few-MB index rather than the whole ~70 MB authoring graph the state
 * route hands authors. Reuses `loadConceptCatalogue`'s single parse — the
 * `byId` details already carry every index field (none are author-only) — and
 * memoises the projection per university on the snapshot, so a returning
 * student's 304 costs nothing and a cold projection runs once per version.
 */
export async function loadConceptIndex(universityId) {
  const snap = await loadConceptCatalogue()
  const uni = universityId ? String(universityId).trim().toLowerCase() : null
  const cacheKey = uni ?? 'all'
  let graph = snap.indexByUni.get(cacheKey)
  if (!graph) {
    graph = conceptGraphForStudent({ concepts: [...snap.byId.values()], relations: snap.relations }, uni)
    snap.indexByUni.set(cacheKey, graph)
  }
  return { signature: snap.signature, uni: cacheKey, graph }
}

/** Drop the in-memory cache. Tests reset between fixtures; nothing else needs it. */
export function resetConceptCatalogue() {
  snapshot = null
}
