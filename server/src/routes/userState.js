/**
 * Private, per-user state — the student's own documents, synced across devices.
 */
import { pool } from '../db.js'
import { wrap } from '../http.js'
import { normaliseDeviceToken, sendSilentNudge } from '../push.js'
import { canonicalStateKey } from '../stateKeys.js'

/** How many documents one batch read may name. A page hydrates ~two dozen. */
const MAX_BATCH_KEYS = 100

export function registerUserStateRoutes(app) {
  /* ── Private, per-user state ─────────────────────────────────────────────── */

  /**
   * Read many of the caller's documents in one request.
   *
   * A page mounts ~two dozen `usePersistentState` hooks, each of which used to
   * fetch its own key — two dozen authenticated round trips, all resolving the
   * identity and taking a pool connection. This reads them in a single query so
   * the page pays one auth and one trip. A GET (keys in the query string, which
   * are document names, never user data) so it stays outside CSRF and is plainly
   * a read. Registered before `/:key`, though the paths do not overlap.
   *
   * The response is keyed by the exact key the client asked for; a key with
   * nothing stored comes back as `{ value: null }`, the same as the single read.
   */
  app.get('/api/user-state', wrap(async (req, res) => {
    const requested = String(req.query.keys ?? '')
      .split(',')
      .map((key) => key.trim())
      .filter(Boolean)
      .slice(0, MAX_BATCH_KEYS)
    if (!requested.length) return res.json({ values: {} })
    // Canonicalise for the lookup, but answer under the key the client sent so
    // it can match results to its own callers without knowing the aliasing.
    const canonicalOf = new Map(requested.map((key) => [key, canonicalStateKey(key)]))
    const canonicals = [...new Set(canonicalOf.values())]
    const [rows] = await pool.query(
      `SELECT k, v, updated_at AS updatedAt FROM user_state
        WHERE user_id = ? AND k IN (${canonicals.map(() => '?').join(', ')})`,
      [req.identity.id, ...canonicals],
    )
    const byCanonical = new Map(rows.map((row) => [row.k, row]))
    const values = {}
    for (const key of requested) {
      const row = byCanonical.get(canonicalOf.get(key))
      if (!row) { values[key] = { value: null, updatedAt: null }; continue }
      try { values[key] = { value: JSON.parse(row.v), updatedAt: row.updatedAt } }
      catch { values[key] = { value: null, updatedAt: row.updatedAt } }
    }
    res.json({ values })
  }))

  app.get('/api/user-state/:key', wrap(async (req, res) => {
    const key = canonicalStateKey(req.params.key)
    const [rows] = await pool.query(
      'SELECT v, updated_at AS updatedAt FROM user_state WHERE user_id = ? AND k = ?',
      [req.identity.id, key],
    )
    if (!rows.length) return res.json({ value: null, updatedAt: null })
    try { res.json({ value: JSON.parse(rows[0].v), updatedAt: rows[0].updatedAt }) } catch { res.json({ value: null, updatedAt: rows[0].updatedAt }) }
  }))

  app.put('/api/user-state/:key', wrap(async (req, res) => {
    const key = canonicalStateKey(req.params.key)
    const v = JSON.stringify(req.body?.value ?? null)
    const conn = await pool.getConnection()
    let changed = false
    try {
      await conn.beginTransaction()
      const [current] = await conn.query(
        'SELECT v FROM user_state WHERE user_id = ? AND k = ? FOR UPDATE',
        [req.identity.id, key],
      )
      if (!current.length || current[0].v !== v) {
        changed = true
        await conn.query(
          'INSERT INTO user_state_versions (user_id, k, v) VALUES (?, ?, ?)',
          [req.identity.id, key, v],
        )
        await conn.query(
          `INSERT INTO user_state (user_id, k, v) VALUES (?, ?, ?)
           ON DUPLICATE KEY UPDATE v = VALUES(v)`,
          [req.identity.id, key, v],
        )
      }
      await conn.commit()
    } catch (error) {
      await conn.rollback()
      throw error
    } finally {
      conn.release()
    }
    // Tell this student's other devices that something of theirs moved, so the
    // app does not have to wait for its next refresh to find out. Deliberately
    // not awaited and unable to reject: the write has already succeeded, and a
    // push that fails must not turn it into an error the student sees.
    if (changed) {
      sendSilentNudge({
        userId: req.identity.id,
        exceptToken: normaliseDeviceToken(req.get('X-Device-Token')),
        key: req.params.key,
      }).catch(() => {})
    }
    res.json({ ok: true })
  }))

  app.delete('/api/user-state/:key', wrap(async (req, res) => {
    await pool.query('DELETE FROM user_state WHERE user_id = ? AND k = ?', [req.identity.id, canonicalStateKey(req.params.key)])
    res.json({ ok: true })
  }))
}
