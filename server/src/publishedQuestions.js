/**
 * The published question set — a snapshot shared by Study Together and challenges.
 *
 * Both features freeze the same admin-authored ledger at the moment a room or
 * challenge is created, and both mark answers server-side against the same
 * `correctIndex`. They used to keep separate copies of this cache and its
 * parsing loop; two copies of the same derivation is exactly the kind of
 * thing that drifts silently once someone touches only one of them. There is
 * now one snapshot and one invalidator, called from the one place in
 * index.js where a ledger write happens.
 *
 * The marking rule itself lives in `questionKey.js`, which has no database
 * import so it can be tested directly.
 */
import { pool, appStateVersions } from './db.js'
import { questionKeysFromLedger } from './questionKey.js'
import { MEDIA_STATE_KEY } from './mediaLibrary.js'
import { releasedMediaIdsFromDocument } from './studentLedger.js'

const LEDGER_KEY = 'nishany-admin-content-ledger-v4'
const ACADEMIC_CATALOGUE_KEY = 'nishany-academic-universities-v1'

let questionSnapshot = null
let questionSnapshotVersion = null
// A rebuild in progress, shared so concurrent cold callers await one 60 MB read
// + build instead of each doing their own. See loadSnapshots.
let rebuilding = null

export function invalidatePublishedQuestions(key) {
  if (key === LEDGER_KEY || key === MEDIA_STATE_KEY || key === ACADEMIC_CATALOGUE_KEY) {
    questionSnapshot = null
    questionSnapshotVersion = null
  }
}

async function loadSnapshots() {
  // Version-check on every authoritative use. Invalidating memory is enough
  // only in a single server process; another process may have warmed its cache
  // before a catalogue archive. app_state_versions is committed in the same
  // transaction as every protected state write, so this signature makes that
  // other process refresh before it freezes or marks another question.
  // Versions only — never the ~60 MB value blobs, which are pulled below solely
  // on a cache miss. Selecting `v` here read the whole ledger out of MariaDB on
  // every authoritative use, warm cache or not. See appStateVersions.
  const keys = [LEDGER_KEY, MEDIA_STATE_KEY, ACADEMIC_CATALOGUE_KEY]
  const rawVersions = await appStateVersions(keys)
  const version = (key) => { const v = rawVersions.get(key); return v == null ? null : String(v) }
  const signature = JSON.stringify([
    version(LEDGER_KEY),
    version(MEDIA_STATE_KEY),
    version(ACADEMIC_CATALOGUE_KEY),
  ])
  if (questionSnapshot && questionSnapshotVersion === signature) return
  // Coalesce concurrent cold rebuilds for the same version onto one promise.
  if (rebuilding && rebuilding.signature === signature) return rebuilding.promise
  const promise = (async () => {
    const [rows] = await pool.query('SELECT k, v FROM app_state WHERE k IN (?, ?, ?)', keys)
    try {
      const ledgerRow = rows.find((row) => row.k === LEDGER_KEY)
      const mediaRow = rows.find((row) => row.k === MEDIA_STATE_KEY)
      const catalogueRow = rows.find((row) => row.k === ACADEMIC_CATALOGUE_KEY)
      const ledger = ledgerRow ? JSON.parse(ledgerRow.v) : []
      const media = mediaRow ? JSON.parse(mediaRow.v) : { records: [] }
      const catalogue = catalogueRow ? JSON.parse(catalogueRow.v) : []
      const released = releasedMediaIdsFromDocument(media)
      questionSnapshot = questionKeysFromLedger(ledger, released, catalogue)
      questionSnapshotVersion = signature
    } catch {
      // A malformed ledger or media document yields an empty set rather than a
      // question entering a room without its required teaching media.
      questionSnapshot = new Map()
      questionSnapshotVersion = signature
    }
  })()
  rebuilding = { signature, promise }
  try {
    return await promise
  } finally {
    if (rebuilding && rebuilding.promise === promise) rebuilding = null
  }
}

export async function publishedQuestions() {
  await loadSnapshots()
  return questionSnapshot
}
