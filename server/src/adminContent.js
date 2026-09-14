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

const LEDGER_KEY = 'nishany-admin-content-ledger-v4'

let snapshot = null

export function invalidateAdminContent(key) {
  if (key === LEDGER_KEY) snapshot = null
}

/**
 * The list projection: a question with its stem and answer bank dropped. Those
 * two fields are the ledger's dominant weight (questions vastly outnumber every
 * other kind), and no list path reads them — verified against the search string,
 * the row, `itemFacetTokens`, `itemScope`, `contentOptions` and `publishReadiness`.
 * Scope and placement live in `questionData.tags`, which is kept.
 *
 * Only questions are projected. Articles keep their `sections` because
 * `publishReadiness` checks them for a body; decks keep their cards; both kinds
 * are few, so the weight saved by touching them would not pay for the risk. The
 * editor fetches the full item on open, so this projection never feeds a save.
 */
const omit = (obj, keys) => { const out = { ...obj }; for (const key of keys) delete out[key]; return out }

export function toIndexItem(item) {
  if (!item || typeof item !== 'object') return item
  if (!item.questionData || typeof item.questionData !== 'object') return item
  return { ...item, questionData: omit(item.questionData, ['stem', 'answers']) }
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
}
