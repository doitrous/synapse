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
import { collectMediaRequests } from './mediaRequestPolicy.js'
import { toIndexItem } from './adminContentProject.js'
import { adminContentListHandler } from './adminContentList.js'

export { toIndexItem }

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
  // Projected once per ledger version (this snapshot is memoised by signature).
  const indexItems = items.map(toIndexItem)
  return { signature, items, indexItems, byId, byKind, summary: countsFor(items) }
}

// One in-flight cold build, so concurrent misses share a single parse instead
// of each holding its own ~250 MB copy of the ledger (that concurrency OOM-killed
// the process). Keyed by the signature it is building for, so a publish landing
// mid-build starts a fresh build rather than reusing a stale one.
let building = null

export async function loadAdminContent() {
  // Cheap version probe FIRST: a warm snapshot must never pull the ~250 MB ledger
  // body just to learn we already have it. Version-checked on every use, not
  // merely invalidated in memory, because another process may have warmed its
  // cache before this one's write (same reasoning as studentContent.js).
  const [vrows] = await pool.query(
    `SELECT MAX(id) AS version FROM app_state_versions WHERE k = ?`,
    [LEDGER_KEY],
  )
  const signature = String(vrows[0]?.version ?? 0)
  if (snapshot && snapshot.signature === signature) return snapshot
  if (building && building.signature === signature) return building.promise
  const promise = (async () => {
    // The blob is fetched only on a miss — the whole point of the probe above.
    const [rows] = await pool.query(`SELECT v FROM app_state WHERE k = ?`, [LEDGER_KEY])
    try {
      snapshot = build(signature, JSON.parse(rows[0]?.v ?? '[]'))
    } catch {
      snapshot = build(signature, [])
    }
    return snapshot
  })()
  building = { signature, promise }
  try {
    return await promise
  } finally {
    if (building && building.signature === signature) building = null
  }
}

// Bump when a slice's PROJECTION shape changes without the ledger version
// moving — otherwise a cached body revalidates to a 304 and the client keeps the
// old shape. (v2: list index slimmed from 178MB to 77MB.)
const PROJECTION_VERSION = 2

/**
 * Answer with the ledger version, or 304 when the caller already has it. The
 * signature is the max app_state_versions id, which advances on every write, so
 * a re-opened tab that has not missed a publish costs a 304 and no body. The
 * projection version is folded in so a server-side shape change also busts it.
 */
function sendVersioned(req, res, signature, body) {
  const etag = `W/"admin-content-${PROJECTION_VERSION}-${signature}"`
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

const list = (value) => (Array.isArray(value) ? value.filter((entry) => typeof entry === 'string' && entry.trim()) : [])

/**
 * Every article's id and taxonomy placement — the fields the import pages read
 * to validate evidence rows and to find which records a taxonomy change would
 * strand. Never the article body (`sections`), which is most of the weight.
 */
export function articleIndexRow(item) {
  const data = item.articleData ?? {}
  return {
    id: item.id,
    subtopicId: data.subtopicId,
    microtopicId: data.microtopicId,
    nanotopicId: data.nanotopicId,
    // Media Requests inherits a question's placement from the article it links,
    // by that article's primaryNodeId.
    primaryNodeId: data.primaryNodeId,
    moduleIds: list(data.moduleIds),
  }
}

export async function adminArticleIndexHandler(req, res) {
  const content = await loadAdminContent()
  const articles = (content.byKind.get('article') ?? []).map(articleIndexRow)
  return sendVersioned(req, res, content.signature, { articles })
}

/**
 * The full items that carry an escalated media request — the Escalations queue's
 * whole working set. Escalations are rare, so this is a handful of items, not the
 * 60 MB ledger the tab used to download to find them. Full items (not an index)
 * because the queue previews the owner and, on acting, needs the exact stored
 * item as the delta `before`.
 */
export async function adminEscalationsHandler(req, res) {
  const content = await loadAdminContent()
  const items = content.items.filter((item) =>
    [...collectMediaRequests(item).values()].some((request) => request && request.escalation))
  return sendVersioned(req, res, content.signature, { items })
}

/**
 * The full items carrying any media request — the Media Requests queue's working
 * set, instead of the whole ledger. Full items (not projected) because the queue
 * previews the owner, writes media placements into it (which spreads the whole
 * item), and needs the exact stored item as each write's delta `before`.
 */
export async function adminMediaRequestItemsHandler(req, res) {
  const content = await loadAdminContent()
  const items = content.items.filter((item) => collectMediaRequests(item).size > 0)
  return sendVersioned(req, res, content.signature, { items })
}

/**
 * Questions holding an image that lives only in one browser (a legacy
 * `nishany-media:`/`synapse-media:` reference, never uploaded to the server) —
 * the Media Requests banner's whole working set. Just id + title, since the
 * banner only links each one; a data-integrity nudge, usually empty.
 */
const MEDIA_REFERENCE_PREFIXES = ['nishany-media:', 'synapse-media:']
const isStoredMediaReference = (value) =>
  typeof value === 'string' && MEDIA_REFERENCE_PREFIXES.some((prefix) => value.startsWith(prefix))

function hasStrandedImage(item) {
  const data = item.questionData
  if (!data || typeof data !== 'object') return false
  if (isStoredMediaReference(data.attachedImage ?? '')) return true
  return Array.isArray(data.attachments) && data.attachments.some((attachment) => isStoredMediaReference(attachment?.url ?? ''))
}

export async function adminStrandedMediaHandler(req, res) {
  const content = await loadAdminContent()
  const items = content.items.filter(hasStrandedImage).map((item) => ({ id: item.id, title: item.title }))
  return sendVersioned(req, res, content.signature, { items })
}

/**
 * Every item, list-projected (heavy bodies dropped). The Content dashboard's
 * whole catalogue in one versioned read, without the article bodies and answer
 * banks it never shows in a list.
 */
export async function adminContentIndexHandler(req, res) {
  const content = await loadAdminContent()
  return sendVersioned(req, res, content.signature, { items: content.indexItems })
}

/**
 * The FULL items for a set of ids — what an editor needs to open, and what a
 * bulk or rename write needs as its per-item `before`. POST because the id list
 * can be long. Missing ids are simply absent from the result.
 */
export async function adminContentItemsHandler(req, res) {
  const content = await loadAdminContent()
  const ids = Array.isArray(req.body?.ids) ? req.body.ids : []
  const items = ids.map((id) => content.byId.get(String(id))).filter(Boolean)
  return res.json({ version: content.signature, items })
}

const wrap = (fn) => (req, res) => Promise.resolve(fn(req, res)).catch((error) => {
  console.error(error)
  res.status(500).json({ error: error.message || 'server error' })
})

export function registerAdminContentRoutes(app) {
  app.get('/api/admin/content/item/:id', requireConsole, wrap(adminItemHandler))
  app.get('/api/admin/content/article-index', requireConsole, wrap(adminArticleIndexHandler))
  app.get('/api/admin/content/escalations', requireConsole, wrap(adminEscalationsHandler))
  app.get('/api/admin/content/media-request-items', requireConsole, wrap(adminMediaRequestItemsHandler))
  app.get('/api/admin/content/stranded-media', requireConsole, wrap(adminStrandedMediaHandler))
  app.get('/api/admin/content/index', requireConsole, wrap(adminContentIndexHandler))
  app.post('/api/admin/content/items', requireConsole, wrap(adminContentItemsHandler))
  app.post('/api/admin/content/list', requireConsole, wrap(adminContentListHandler))
}
