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
 */
import { pool } from './db.js'

const LEDGER_KEY = 'synapse-admin-content-ledger-v4'

let questionSnapshot = null

export function invalidatePublishedQuestions(key) {
  if (key === LEDGER_KEY) questionSnapshot = null
}

export async function publishedQuestions() {
  if (questionSnapshot) return questionSnapshot
  const [rows] = await pool.query('SELECT v FROM app_state WHERE k = ?', [LEDGER_KEY])
  const byId = new Map()
  if (rows.length) {
    try {
      const ledger = JSON.parse(rows[0].v)
      for (const item of Array.isArray(ledger) ? ledger : []) {
        if (item?.kind !== 'question' || item.status !== 'Published') continue
        const answers = item.questionData?.answers ?? []
        byId.set(item.id, {
          id: item.id,
          title: item.title,
          // The index of the correct option, or -1 when the author marked none.
          correctIndex: answers.findIndex((answer) => answer?.correct),
          optionCount: answers.length,
        })
      }
    } catch {
      // A malformed ledger yields an empty set rather than a thrown request.
    }
  }
  questionSnapshot = byId
  return byId
}
