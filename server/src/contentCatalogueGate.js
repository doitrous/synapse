import { pool } from './db.js'

const LOCK_NAME = 'nishany-question-catalogue-mutation-v1'

// Do not let same-process waiters each occupy one connection from the shared
// pool while MariaDB serializes them. One local contender reaches GET_LOCK at
// a time; separate server processes are still coordinated by the advisory
// lock. This leaves the rest of the pool available to the guarded work.
let localTail = Promise.resolve()

/**
 * Serialize catalogue retirement with every operation that freezes or starts a
 * collaborative question session. MariaDB advisory locks work across server
 * processes, unlike an in-memory flag, and are released with this dedicated
 * connection even when the work throws.
 */
export async function withContentCatalogueGate(work, waitSeconds = 15) {
  const previous = localTail
  let releaseLocal
  localTail = new Promise((resolve) => { releaseLocal = resolve })
  await previous

  let conn
  let acquired = false
  try {
    conn = await pool.getConnection()
    const [rows] = await conn.query('SELECT GET_LOCK(?, ?) AS acquired', [LOCK_NAME, waitSeconds])
    acquired = Number(rows[0]?.acquired) === 1
    if (!acquired) {
      const error = new Error('question catalogue is busy; try again in a moment')
      error.code = 'catalogue_busy'
      throw error
    }
    return await work()
  } finally {
    if (conn && acquired) {
      try { await conn.query('SELECT RELEASE_LOCK(?)', [LOCK_NAME]) } catch { /* connection release also drops the lock */ }
    }
    conn?.release()
    releaseLocal()
  }
}
