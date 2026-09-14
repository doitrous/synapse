/**
 * The admin content ledger, sliced.
 *
 * `GET /api/state/nishany-admin-content-ledger-v4` ships the whole authoring
 * ledger — ~60 MB in production — to every admin surface on mount, even a tab
 * that only needs one item or a count. This is the admin-side mirror of
 * `studentContent.js`: it parses the ledger once per version and serves the
 * slices an admin surface actually reads.
 *
 * Unlike the student slicer it does NOT redact — an admin authors every status
 * and needs full item bodies — so there is no `redactLedgerForStudent` here and
 * every route is guarded by `requireConsole`, the same gate the whole-ledger
 * authoring read already sits behind (`routes/state.js` GET `authoring` branch).
 *
 * Writes are unchanged: a sliced tab saves through the existing delta path
 * (`PUT /api/state/:key` with `changes`), which needs no base document — the
 * `before` each change carries is the per-item conflict guard. So a tab can hold
 * a slice, edit it, and save exactly the items it touched.
 *
 * Cache shape copied from `studentContent.js`/`publishedQuestions.js`: a version
 * signature over the ledger doc, checked on every use so a second server process
 * refreshes after another one's write. Invalidated in `invalidateSnapshots`.
 */
import { pool } from './db.js'
import { requireConsole } from './auth.js'
import { countsFor } from './studentContent.js'

const LEDGER_KEY = 'nishany-admin-content-ledger-v4'

let snapshot = null

export function invalidateAdminContent(key) {
  if (key === LEDGER_KEY) snapshot = null
}

function build(signature, ledger) {
  const items = Array.isArray(ledger) ? ledger : []
  const byId = new Map()
  const byKind = new Map()
  for (const item of items) {
    if (!item || typeof item !== 'object') continue
    const kind = String(item.kind ?? 'unknown')
    if (!byKind.has(kind)) byKind.set(kind, [])
    byKind.get(kind).push(item)
    if (item.id) byId.set(String(item.id), item)
  }
  return { signature, items, byId, byKind, summary: countsFor(items) }
}

export async function loadAdminContent() {
  // Version-checked on every use, not merely invalidated in memory: another
  // process may have warmed its cache before this one's write. Same reasoning as
  // studentContent.js/publishedQuestions.js.
  const [rows] = await pool.query(
    `SELECT s.v, (SELECT MAX(id) FROM app_state_versions WHERE k = s.k) AS version
       FROM app_state s WHERE s.k = ?`,
    [LEDGER_KEY],
  )
  const signature = String(rows[0]?.version ?? 0)
  if (snapshot && snapshot.signature === signature) return snapshot
  try {
    snapshot = build(signature, JSON.parse(rows[0]?.v ?? '[]'))
  } catch {
    snapshot = build(signature, [])
  }
  return snapshot
}

/**
 * Answer with the ledger version, or 304 when the caller already has it. The
 * signature is the max app_state_versions id, which advances on every write, so
 * a re-opened tab that has not missed a publish costs a 304 and no body.
 */
function sendVersioned(req, res, signature, body) {
  const etag = `W/"admin-content-${signature}"`
  res.set('ETag', etag)
  res.set('Cache-Control', 'private, no-cache')
  if (req.get('if-none-match') === etag) return res.status(304).end()
  return res.json({ version: signature, ...body })
}

export async function adminItemHandler(req, res) {
  const content = await loadAdminContent()
  const item = content.byId.get(String(req.params.id)) ?? null
  return sendVersioned(req, res, content.signature, { item })
}

const wrap = (fn) => (req, res) => Promise.resolve(fn(req, res)).catch((error) => {
  console.error(error)
  res.status(500).json({ error: error.message || 'server error' })
})

export function registerAdminContentRoutes(app) {
  app.get('/api/admin/content/item/:id', requireConsole, wrap(adminItemHandler))
}
