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

let questionSnapshot = null

export function invalidatePublishedQuestions(key) {
  if (key === LEDGER_KEY || key === MEDIA_STATE_KEY) questionSnapshot = null
}

export async function publishedQuestions() {
  if (questionSnapshot) return questionSnapshot
  const [rows] = await pool.query('SELECT k, v FROM app_state WHERE k IN (?, ?)', [LEDGER_KEY, MEDIA_STATE_KEY])
  let byId = new Map()
  try {
    const ledgerRow = rows.find((row) => row.k === LEDGER_KEY)
    const mediaRow = rows.find((row) => row.k === MEDIA_STATE_KEY)
    const ledger = ledgerRow ? JSON.parse(ledgerRow.v) : []
    const media = mediaRow ? JSON.parse(mediaRow.v) : { records: [] }
    byId = questionKeysFromLedger(ledger, releasedMediaIdsFromDocument(media))
  } catch {
    // A malformed ledger or media document yields an empty set rather than a
    // question entering a room without its required teaching media.
    byId = new Map()
  }
  questionSnapshot = byId
  return byId
}
