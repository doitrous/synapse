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
import { pool } from './db.js'
import { questionKeysFromLedger } from './questionKey.js'
import { MEDIA_STATE_KEY } from './mediaLibrary.js'
import { releasedMediaIdsFromDocument } from './studentLedger.js'

const LEDGER_KEY = 'synapse-admin-content-ledger-v4'
const ACADEMIC_CATALOGUE_KEY = 'synapse-academic-universities-v1'

let questionSnapshot = null
let questionSnapshotVersion = null

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
  const [rows] = await pool.query(
    `SELECT s.k, s.v,
            (SELECT MAX(id) FROM app_state_versions WHERE k = s.k) AS version
       FROM app_state s WHERE s.k IN (?, ?, ?)`,
    [LEDGER_KEY, MEDIA_STATE_KEY, ACADEMIC_CATALOGUE_KEY],
  )
  const versions = new Map(rows.map((row) => [row.k, row.version === null ? null : String(row.version)]))
  const signature = JSON.stringify([
    versions.get(LEDGER_KEY) ?? null,
    versions.get(MEDIA_STATE_KEY) ?? null,
    versions.get(ACADEMIC_CATALOGUE_KEY) ?? null,
  ])
  if (questionSnapshot && questionSnapshotVersion === signature) return
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
}

export async function publishedQuestions() {
  await loadSnapshots()
  return questionSnapshot
}
