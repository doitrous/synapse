import { randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { basename, dirname, join, resolve, sep } from 'node:path'
import { existsSync } from 'node:fs'
import { mkdir, open, readFile, rename, rm, unlink } from 'node:fs/promises'
import express from 'express'
import compression from 'compression'
import cors from 'cors'
import { Resend } from 'resend'
import { pool, migrate } from './db.js'
import { REDACTED_STATE_KEYS } from './studentLedger.js'
import { createShare, deleteShare, listShares, readShare, updateShare } from './shares.js'
import { apiAuthGate, heldTabs, invalidateRoleTabs, mfaSatisfied, requireAuthenticated, requireConsole, requireSuperAdmin, requireTab } from './auth.js'
import { hasConsoleAccess } from './roles.js'
import { ROLE_TABS_STATE_KEY, holdsTab, tabsForStateKey } from './tabs.js'
import { imageMeta } from './imageMeta.js'
import { MEDIA_STATE_KEY, deleteRefusal, storageKeyFor } from './mediaLibrary.js'
import { authoriseChanges, diffDocument, mergeDocument } from './stateMerge.js'
import {
  cancelSubscription,
  entitlementOf,
  getDiscoverable,
  getUser,
  getUserActivity,
  getUserByIdentity,
  grantSubscription,
  identifierTaken,
  listUsers,
  passwordResetConfigured,
  readReason,
  recordAction,
  requestPasswordReset,
  saveOwnEnrolment,
  setAccessStatus,
  setContentScope,
  setDiscoverable,
  setRole,
} from './accounts.js'
import { withinRateLimit } from './identity.js'
import { effectivePlan, limitFor, readStorageLimits } from './storage.js'
import { redeemVoucher, releaseVoucher, myVoucher } from './vouchers.js'
import {
  statusFor as assistantStatus,
  chat as assistantChat,
  adminSettings as assistantAdminSettings,
  saveSettings as assistantSaveSettings,
  saveTierLimit as assistantSaveTierLimit,
  deleteTierLimit as assistantDeleteTierLimit,
  usageSummary as assistantUsage,
  listModels as assistantModels,
} from './assistant.js'
import {
  createRoom, joinRoom, roomFor, startRoom, submitAnswer, finishRoom, myRooms,
} from './studyRooms.js'
import {
  createParty, joinByCode, setVisibility, myParties, openParties, partyFor, leaveParty,
  createSession, sessionsFor, sessionFor, answerItem, closeSession,
} from './parties.js'
import {
  createChallenge, respondToChallenge, submitChallengeAnswer, finishChallenge, challengeFor, myChallenges,
} from './challenges.js'
import { invalidatePublishedQuestions } from './publishedQuestions.js'
import { sendRequest, respondToRequest, removeFriend, myFriends, myRequests, directorySearch } from './friends.js'
import { mintInvite, redeemInvite } from './friendInvites.js'
import {
  linkAccount as linkFacebookAccount, unlinkAccount as unlinkFacebookAccount,
  deletionCallback as facebookDeletionCallback, parseSignedRequest as parseFacebookSignedRequest,
} from './facebook.js'
import { toMariaDbDate } from './datetime.js'
import { assembleChunks, receiveChunk, receiveStream, resolveUploadWorkspace, resolveWithin } from './uploads.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const LAUNCH_DATA_PATH = join(__dirname, '..', 'data', 'medical-library-v1.json')
const RESOURCE_STORAGE_DIR = resolve(process.env.RESOURCE_STORAGE_DIR || '/data/medical-library')
const RESOURCE_MAX_BYTES = Number(process.env.RESOURCE_MAX_BYTES) || 250 * 1024 * 1024
/** Images share the resource volume; they are bounded far lower than a textbook. */
const MEDIA_STORAGE_DIR = RESOURCE_STORAGE_DIR
const MEDIA_MAX_BYTES = Number(process.env.MEDIA_MAX_BYTES) || 20 * 1024 * 1024
const RESOURCE_CHUNK_MAX_BYTES = Number(process.env.RESOURCE_CHUNK_MAX_BYTES) || 64 * 1024 * 1024
const RESOURCE_CHUNKED_MAX_BYTES = Number(process.env.RESOURCE_CHUNKED_MAX_BYTES) || 2 * 1024 * 1024 * 1024
const MEDICAL_EVIDENCE_STATE_KEY = 'synapse-medical-evidence-v1'
let medicalResourceSnapshot = null
let medicalResourceLoad = null

/**
 * Drop any server-side cache a state write has just made stale.
 *
 * Two caches now read from `app_state` — the medical-resource snapshot, and
 * the published-question set shared by study rooms and challenges — so
 * invalidation is one call rather than a growing list at every write site.
 */
function invalidateSnapshots(key) {
  if (key === MEDICAL_EVIDENCE_STATE_KEY) {
    medicalResourceSnapshot = null
    medicalResourceLoad = null
  }
  if (key === MEDIA_STATE_KEY) mediaSnapshot = null
  invalidatePublishedQuestions(key)
}

/**
 * Every media record, cached until the document is written.
 *
 * Read on every image request, so it cannot be a query per image. Dropped by
 * `invalidateSnapshots` above, the same shape the medical-resource snapshot
 * already uses.
 */
let mediaSnapshot = null

async function mediaRecords() {
  if (mediaSnapshot) return mediaSnapshot
  const [rows] = await pool.query('SELECT v FROM app_state WHERE k = ?', [MEDIA_STATE_KEY])
  mediaSnapshot = rows.length ? JSON.parse(rows[0].v)?.records ?? [] : []
  return mediaSnapshot
}
const app = express()
/**
 * Compress responses.
 *
 * The catalogue documents are the reason this is here. `app_state` holds whole
 * JSON trees — the content ledger, a taxonomy of some 1,800 nodes, a concept
 * graph of similar size — and every read returns one entire document, because
 * there is no per-item route to ask for less. Uncompressed that is megabytes
 * over a phone connection for a student opening the library on a ward.
 *
 * JSON of this shape compresses by roughly an order of magnitude, so this is
 * the cheapest bandwidth win available and it costs the API almost nothing.
 * Placed before every route so it covers the SPA assets too.
 */
app.use(compression())
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') ?? true }))
app.use(express.json({
  limit: '25mb',
  verify: (req, _res, buffer) => {
    if (req.originalUrl === '/api/webhooks/resend/inbound') req.rawBody = buffer.toString('utf8')
  },
}))

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const resendReceivingKey = process.env.RESEND_ADMIN_API_KEY || process.env.RESEND_API_KEY
const resendReceiving = resendReceivingKey ? new Resend(resendReceivingKey) : null
const MAIL_FROM = process.env.MAIL_FROM || 'synapse@mail.doitrous.com'
// Where unsubscribe links point. The student origin, not the admin one — the
// reader of a campaign is a student, and the link has to work signed out.
const PUBLIC_ORIGIN = (process.env.PUBLIC_ORIGIN || 'https://synapse.doitrous.com').replace(/\/$/, '')

/**
 * Mail nobody asked to stop receiving.
 *
 * Transactional categories are never suppressed — a password reset is sent
 * because something happened to that account, and withholding it would harm the
 * reader rather than respect them. Everything else is checked against the
 * suppression list before it is sent, and a suppressed address is reported as
 * suppressed rather than quietly dropped.
 */
const TRANSACTIONAL_CATEGORIES = new Set(['Onboarding', 'Billing & subscription', 'Security & account', 'Privacy & data'])

async function isSuppressed(address, category) {
  if (!address || !category || TRANSACTIONAL_CATEGORIES.has(category)) return false
  const [rows] = await pool.query(
    'SELECT 1 FROM email_suppressions WHERE address = ? AND (category IS NULL OR category = ?) LIMIT 1',
    [String(address).toLowerCase(), category],
  )
  return rows.length > 0
}

/** Mint the opaque token an unsubscribe link carries, so no address rides in a URL. */
async function unsubscribeTokenFor(address, category) {
  const token = randomUUID().replace(/-/g, '') + randomUUID().replace(/-/g, '').slice(0, 16)
  await pool.query(
    'INSERT INTO email_unsubscribe_tokens (token, address, category) VALUES (?,?,?)',
    [token, String(address).toLowerCase(), category || null],
  )
  return token
}

app.use(apiAuthGate)

const wrap = (fn) => (req, res) => Promise.resolve(fn(req, res)).catch((e) => {
  console.error(e); res.status(500).json({ error: e.message || 'server error' })
})

app.get('/api/health', (_req, res) => res.json({ ok: true }))

/**
 * Whether an email or a phone is already registered.
 *
 * Sign-up asks before creating anything, so a person who already has an account
 * is sent to sign in rather than being handed an error after Supabase has made
 * an auth user with no roster row behind it. It answers only taken or not, and
 * it is rate limited because it is the one route here that has to work before
 * anybody is authenticated.
 */
app.post('/api/accounts/exists', wrap(async (req, res) => {
  const caller = req.ip || req.socket?.remoteAddress || 'unknown'
  if (!withinRateLimit(caller)) return res.status(429).json({ error: 'too many requests' })
  const { email, phone } = req.body ?? {}
  res.json(await identifierTaken({ email, phone }))
}))

app.get('/api/session', wrap(async (req, res) => res.json({
  user: req.identity ? {
    id: req.identity.id,
    email: req.identity.email,
    role: req.identity.role,
    rank: req.identity.rank,
    // What the console should render. Resolved here so the browser never has to
    // work out its own permissions, and never disagrees with the guard.
    tabs: await heldTabs(req.identity),
    contentScope: req.identity.contentScope,
    aal: req.identity.aal,
    mfaRequired: Boolean(req.identity.mfaRequired),
  } : null,
})))

/**
 * The caller's own profile and entitlement.
 *
 * A student surface needs to know who it is showing and what they have paid
 * for. Both answers already exist for admins; this exposes exactly the caller's
 * own row and nothing else. A missing roster row is a 200 with nulls rather
 * than a 404: "your university has not set up your profile yet" is a state the
 * app should render, not an error it should treat as a broken request.
 */
app.get('/api/me', requireAuthenticated, wrap(async (req, res) => {
  const user = await getUserByIdentity(req.identity.id)
  res.json({
    user: {
      id: req.identity.id,
      email: req.identity.email,
      role: req.identity.role,
      rank: req.identity.rank,
      tabs: await heldTabs(req.identity),
      contentScope: req.identity.contentScope,
      aal: req.identity.aal,
      mfaRequired: Boolean(req.identity.mfaRequired),
    },
    profile: user
      ? { studentId: user.id, name: user.name, email: user.email, universityId: user.universityId, year: user.year, group: user.group, status: user.status }
      : null,
    subscription: user?.subscription ?? null,
    entitlement: user?.entitlement ?? { state: 'none', plan: 'Free', expiresAt: null, daysLeft: null },
  })
}))

/**
 * Where this account studies, set by the student.
 *
 * Onboarding writes here, and the account page writes here when a student
 * corrects their year. It is the only writer of that fact, and `/api/me` is the
 * only reader — so a second browser cannot hold a different answer. This
 * replaced a browser-local document that each device kept its own copy of,
 * which is how one account came to show two different enrolled years.
 */
app.put('/api/me/enrolment', requireAuthenticated, wrap(async (req, res) => {
  const result = await saveOwnEnrolment(req.identity.id, req.body ?? {})
  if (result.error) return res.status(result.error === 'no_identity' ? 404 : 400).json({ error: result.error })
  res.json({ ok: true, profile: result.profile })
}))

/**
 * Everything this account has stored, as the account's own data.
 *
 * The Account page has always offered a download. It exported the settings blob
 * the page happened to hold, while promising notes, highlights and progress —
 * this returns what the promise says: every `user_state` document owned by the
 * caller.
 */
app.get('/api/me/export', requireAuthenticated, wrap(async (req, res) => {
  const [rows] = await pool.query(
    'SELECT k, v, updated_at AS updatedAt FROM user_state WHERE user_id = ? ORDER BY k',
    [req.identity.id],
  )
  const documents = {}
  for (const row of rows) {
    try { documents[row.k] = { value: JSON.parse(row.v), updatedAt: row.updatedAt } }
    catch { documents[row.k] = { value: null, updatedAt: row.updatedAt } }
  }
  const profile = await getUserByIdentity(req.identity.id)
  // The uploads themselves are too large to inline, but an export that lists
  // annotations for a document it never mentions is not the whole record.
  const [uploads] = await pool.query(
    `SELECT id, title, media_type AS mediaType, size_bytes AS sizeBytes, sha256, created_at AS createdAt
     FROM user_documents WHERE user_id = ? AND deleted_at IS NULL ORDER BY created_at`,
    [req.identity.id],
  )
  res.json({
    exportedAt: new Date().toISOString(),
    account: { id: req.identity.id, email: req.identity.email },
    profile,
    documents,
    uploads: uploads.map((row) => ({ ...row, downloadPath: `/api/my-documents/${row.id}/file` })),
  })
}))

/**
 * Whether the caller shows up in their own year's directory.
 *
 * The column defaults to findable, because the cohort is already closed and
 * being found by your own classmates is the point of the directory — but
 * default-on only stays honest if a student can see and change it, which is
 * what these two routes are for. The actor is always the verified session;
 * the value being written is the only thing that comes from the body.
 */
app.get('/api/account/discoverable', requireAuthenticated, wrap(async (req, res) => {
  res.json({ discoverable: await getDiscoverable(req.identity.id) })
}))

app.post('/api/account/discoverable', requireAuthenticated, wrap(async (req, res) => {
  const result = await setDiscoverable(req.identity.id, Boolean(req.body?.discoverable))
  if (result.error === 'not_found') return res.status(404).json({ error: 'no account to update' })
  res.json(result)
}))

/* ── A student's own documents ───────────────────────────────────────────── */

/**
 * Uploads that belong to one account.
 *
 * Every query filters on `user_id = req.identity.id`: ownership is a `WHERE`
 * clause, never a claim the client makes. The storage key is generated here for
 * the same reason — the client says what the file is called, not where it goes.
 *
 * The bytes live on the server rather than in the browser because the notes
 * about them already do. Annotations are `user_state` and therefore sync; a
 * document that lived only in IndexedDB would leave the same reader empty on a
 * phone with the student's own marks stranded behind it.
 */
const MY_DOCUMENT_MAX_BYTES = Number(process.env.MY_DOCUMENT_MAX_BYTES) || 100 * 1024 * 1024
/**
 * The fallback ceiling, used until an administrator sets one.
 *
 * The quota used to be this number and nothing else — the same for everybody,
 * changeable only by redeploying. It is now the default a stored settings
 * document starts from, and each plan may name its own.
 */
const MY_DOCUMENT_QUOTA_BYTES = Number(process.env.MY_DOCUMENT_QUOTA_BYTES) || 1024 * 1024 * 1024
const STORAGE_LIMITS_KEY = 'synapse-storage-limits-v1'

/**
 * How much room this caller has, and how much of it is gone.
 *
 * Resolved per request from the plan they are on rather than written onto their
 * record, so an upgrade takes effect at once and a lapse does too. A settings
 * document that is missing or malformed falls back to the default: a broken
 * one must not stop students uploading, and must certainly not hand them
 * unlimited room.
 */
async function documentAllowance(userId) {
  const [[settings]] = await pool.query('SELECT v FROM app_state WHERE k = ?', [STORAGE_LIMITS_KEY])
  let stored = null
  try { stored = settings?.v ? JSON.parse(settings.v) : null } catch { stored = null }
  const limits = readStorageLimits(stored ?? { defaultBytes: MY_DOCUMENT_QUOTA_BYTES })

  const [[subscription]] = await pool.query(
    `SELECT s.plan, s.status, s.expires_at
       FROM subscriptions s
       JOIN students st ON st.id = s.student_id
      WHERE st.user_id = ?
      ORDER BY s.started_at DESC LIMIT 1`,
    [userId],
  )
  const plan = effectivePlan(entitlementOf(subscription))

  const [[usage]] = await pool.query(
    'SELECT COALESCE(SUM(size_bytes), 0) AS usedBytes FROM user_documents WHERE user_id = ? AND deleted_at IS NULL',
    [userId],
  )
  return { plan, usedBytes: Number(usage.usedBytes), quotaBytes: limitFor(limits, plan) }
}
const MY_DOCUMENT_ROOT = resolve(RESOURCE_STORAGE_DIR, 'my-documents')

function documentTitle(raw) {
  const title = String(raw ?? '').trim().replace(/[\r\n\t]/g, ' ').slice(0, 200)
  return title || 'Untitled document'
}

/**
 * What a student is uploading, decided here rather than taken on trust.
 *
 * Only two kinds exist. `pdf` is what the in-app reader can open and is
 * therefore what the annotation surfaces list. `file` is everything else — a
 * slide deck, an image, a spreadsheet a student wants pinned to a whiteboard —
 * and is only ever handed back as a download.
 *
 * The extension is derived from the name and reduced to letters and digits: it
 * decides a path on disk, so it is a value this server computes, never one the
 * client supplies.
 */
const PDF_MIME = 'application/pdf'

function describeUpload(body) {
  const fileName = String(body?.fileName ?? '').trim().replace(/[\r\n\t/\\]/g, ' ').slice(0, 200)
  const declaredMime = String(body?.mimeType ?? '').trim().slice(0, 120)
  const extension = (fileName.match(/\.([A-Za-z0-9]{1,8})$/)?.[1] ?? '').toLowerCase()
  const isPdf = declaredMime === PDF_MIME || extension === 'pdf' || (!declaredMime && !extension)
  return {
    kind: isPdf ? 'pdf' : 'file',
    extension: isPdf ? 'pdf' : (extension || 'bin'),
    fileName: fileName || null,
    // A type the browser will act on is not something to accept from a client.
    // Anything that is not a PDF is stored and returned as opaque bytes.
    mimeType: isPdf ? PDF_MIME : 'application/octet-stream',
  }
}

async function myDocument(userId, id) {
  const [rows] = await pool.query(
    `SELECT id, title, storage_key AS storageKey, media_type AS mediaType, file_name AS fileName,
       mime_type AS mimeType, size_bytes AS sizeBytes, sha256, page_count AS pageCount, created_at AS createdAt
     FROM user_documents WHERE id = ? AND user_id = ? AND deleted_at IS NULL`,
    [id, userId],
  )
  return rows[0] || null
}

app.get('/api/my-documents', requireAuthenticated, wrap(async (req, res) => {
  const [rows] = await pool.query(
    `SELECT id, title, media_type AS mediaType, file_name AS fileName, mime_type AS mimeType,
       size_bytes AS sizeBytes, page_count AS pageCount, created_at AS createdAt
     FROM user_documents WHERE user_id = ? AND deleted_at IS NULL ORDER BY created_at DESC`,
    [req.identity.id],
  )
  const allowance = await documentAllowance(req.identity.id)
  res.json({ items: rows, usedBytes: allowance.usedBytes, quotaBytes: allowance.quotaBytes, plan: allowance.plan })
}))

app.post('/api/my-documents', requireAuthenticated, wrap(async (req, res) => {
  const id = randomUUID()
  const upload = describeUpload(req.body)
  // Generated here, never accepted: a path is not something a client gets to say.
  const storageKey = join('my-documents', req.identity.id.replace(/[^a-zA-Z0-9_-]/g, '_'), `${id}.${upload.extension}`)
  await pool.query(
    'INSERT INTO user_documents (id, user_id, title, storage_key, media_type, file_name, mime_type) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id, req.identity.id, documentTitle(req.body?.title), storageKey, upload.kind, upload.fileName, upload.mimeType],
  )
  res.json({ id, uploadId: randomUUID().replace(/-/g, ''), chunkMaxBytes: RESOURCE_CHUNK_MAX_BYTES, mediaType: upload.kind })
}))

app.put('/api/my-documents/:id/chunks/:uploadId/:index', requireAuthenticated, wrap(async (req, res) => {
  const document = await myDocument(req.identity.id, req.params.id)
  if (!document) return res.status(404).json({ error: 'document not found' })
  const fullPath = resolveWithin(RESOURCE_STORAGE_DIR, document.storageKey)
  if (!fullPath) return res.status(400).json({ error: 'document has no valid storage key' })
  if (existsSync(fullPath)) return res.status(409).json({ error: 'document is already uploaded' })
  const workspace = resolveUploadWorkspace(RESOURCE_STORAGE_DIR, `u-${req.identity.id}-${document.id}`, req.params.uploadId)
  const index = Number(req.params.index)
  if (!workspace || !Number.isInteger(index) || index < 0 || index > 1023) return res.status(400).json({ error: 'invalid chunk upload path' })
  const declaredLength = Number(req.header('content-length'))
  if (Number.isFinite(declaredLength) && declaredLength > RESOURCE_CHUNK_MAX_BYTES) return res.status(413).json({ error: 'chunk exceeds configured limit' })
  const { sizeBytes } = await receiveChunk(req, workspace, index, RESOURCE_CHUNK_MAX_BYTES)
  res.json({ ok: true, index, sizeBytes })
}))

app.post('/api/my-documents/:id/chunks/:uploadId/complete', requireAuthenticated, wrap(async (req, res) => {
  const document = await myDocument(req.identity.id, req.params.id)
  if (!document) return res.status(404).json({ error: 'document not found' })
  const fullPath = resolveWithin(RESOURCE_STORAGE_DIR, document.storageKey)
  if (!fullPath || !fullPath.startsWith(`${MY_DOCUMENT_ROOT}${sep}`)) return res.status(400).json({ error: 'document has no valid storage key' })
  if (existsSync(fullPath)) return res.status(409).json({ error: 'document is already uploaded' })
  const workspace = resolveUploadWorkspace(RESOURCE_STORAGE_DIR, `u-${req.identity.id}-${document.id}`, req.params.uploadId)
  const totalChunks = Number(req.body?.totalChunks)
  const declaredSize = Number(req.body?.sizeBytes)
  if (!workspace || !Number.isInteger(totalChunks) || totalChunks < 1 || totalChunks > 1024) return res.status(400).json({ error: 'invalid chunk count' })
  if (!Number.isFinite(declaredSize) || declaredSize < 1 || declaredSize > MY_DOCUMENT_MAX_BYTES) {
    return res.status(413).json({ error: `a document may be up to ${Math.round(MY_DOCUMENT_MAX_BYTES / (1024 * 1024))} MB` })
  }

  // Checked here rather than at the start: only now is the real size known,
  // and a quota that is enforced against a declaration is not enforced.
  const allowance = await documentAllowance(req.identity.id)
  if (allowance.quotaBytes <= 0) {
    return res.status(409).json({ error: 'your plan does not include space for your own documents' })
  }
  if (allowance.usedBytes + declaredSize > allowance.quotaBytes) {
    return res.status(409).json({ error: 'that would go past the space on your account' })
  }

  try {
    const result = await assembleChunks(workspace, fullPath, {
      totalChunks,
      declaredSize,
      maxBytes: MY_DOCUMENT_MAX_BYTES,
      chunkMaxBytes: RESOURCE_CHUNK_MAX_BYTES,
      // Only a document that claims to be a PDF is held to being one.
      requirePdf: document.mediaType === 'pdf',
    })
    await pool.query(
      'UPDATE user_documents SET size_bytes = ?, sha256 = ?, page_count = ? WHERE id = ? AND user_id = ?',
      [result.sizeBytes, result.sha256, Number(req.body?.pageCount) || null, document.id, req.identity.id],
    )
    res.json({ ok: true, id: document.id, ...result })
  } catch (error) {
    if (error.status) return res.status(error.status).json({ error: error.message })
    throw error
  }
}))

app.patch('/api/my-documents/:id', requireAuthenticated, wrap(async (req, res) => {
  const [result] = await pool.query(
    'UPDATE user_documents SET title = ? WHERE id = ? AND user_id = ? AND deleted_at IS NULL',
    [documentTitle(req.body?.title), req.params.id, req.identity.id],
  )
  if (!result.affectedRows) return res.status(404).json({ error: 'document not found' })
  res.json({ ok: true })
}))

app.get('/api/my-documents/:id/file', requireAuthenticated, wrap(async (req, res) => {
  const document = await myDocument(req.identity.id, req.params.id)
  if (!document) return res.status(404).json({ error: 'document not found' })
  const fullPath = resolveWithin(RESOURCE_STORAGE_DIR, document.storageKey)
  if (!fullPath || !existsSync(fullPath)) return res.status(404).json({ error: 'document file is still uploading' })
  const isPdf = document.mediaType === 'pdf'
  const name = basename(document.fileName || `${document.title}.${isPdf ? 'pdf' : 'bin'}`).replace(/["\r\n]/g, '')
  res.setHeader('Content-Type', isPdf ? 'application/pdf' : 'application/octet-stream')
  // A PDF is opened in the reader. Anything else is handed over as a download
  // rather than rendered on this origin, whatever it claims to be.
  res.setHeader('Content-Disposition', `${isPdf ? 'inline' : 'attachment'}; filename="${name}"`)
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.sendFile(fullPath)
}))

app.delete('/api/my-documents/:id', requireAuthenticated, wrap(async (req, res) => {
  const document = await myDocument(req.identity.id, req.params.id)
  if (!document) return res.status(404).json({ error: 'document not found' })
  await pool.query(
    'UPDATE user_documents SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
    [document.id, req.identity.id],
  )
  const fullPath = resolveWithin(RESOURCE_STORAGE_DIR, document.storageKey)
  if (fullPath) await unlink(fullPath).catch(() => {})
  res.json({ ok: true })
}))

/* ── Shared notes and whiteboards ────────────────────────────────────────── */

/**
 * A note or a board, published behind a link.
 *
 * The permission rules are in `shares.js`, deliberately away from the routing,
 * because they are the only thing between "shared with my study group" and
 * "on the open web". Read is the one route that answers without a session —
 * see the note in `apiAuthGate` — and it still refuses a private share to
 * anybody but its owner.
 */
app.post('/api/shares', requireAuthenticated, wrap(async (req, res) => {
  const result = await createShare(req.identity.id, req.body ?? {})
  if (result.error) return res.status(400).json({ error: result.error })
  res.json(result)
}))

app.get('/api/shares', requireAuthenticated, wrap(async (req, res) => {
  res.json({ items: await listShares(req.identity.id) })
}))

app.get('/api/shares/:id', wrap(async (req, res) => {
  const result = await readShare(req.params.id, req.identity?.id ?? null)
  if (result.error) return res.status(404).json({ error: result.error })
  res.json(result.share)
}))

app.put('/api/shares/:id', requireAuthenticated, wrap(async (req, res) => {
  const result = await updateShare(req.params.id, req.identity.id, req.body ?? {})
  if (result.error === 'not_found') return res.status(404).json({ error: result.error })
  if (result.error) return res.status(400).json({ error: result.error })
  res.json(result.share)
}))

app.delete('/api/shares/:id', requireAuthenticated, wrap(async (req, res) => {
  const result = await deleteShare(req.params.id, req.identity.id)
  if (result.error) return res.status(404).json({ error: result.error })
  res.json({ ok: true })
}))

/* ── Vouchers ────────────────────────────────────────────────────────────── */

app.post('/api/vouchers/redeem', requireAuthenticated, wrap(async (req, res) => {
  const result = await redeemVoucher(req.identity.id, req.body?.code)
  // A refused voucher is a 200 with a typed reason, not an error status: the
  // client has to render the reason, and a 4xx would put the persistence layer
  // into its terminal-error path for something that is a normal answer.
  res.json(result)
}))

app.delete('/api/vouchers/redemption', requireAuthenticated, wrap(async (req, res) => {
  res.json(await releaseVoucher(req.identity.id))
}))

app.get('/api/vouchers/mine', requireAuthenticated, wrap(async (req, res) => {
  res.json({ redemption: await myVoucher(req.identity.id) })
}))

/* ── Study Together ──────────────────────────────────────────────────────── */

app.post('/api/study-rooms', requireAuthenticated, wrap(async (req, res) => {
  res.json(await createRoom(req.identity.id, req.body ?? {}))
}))

app.post('/api/study-rooms/join', requireAuthenticated, wrap(async (req, res) => {
  res.json(await joinRoom(req.identity.id, req.body?.code))
}))

app.get('/api/study-rooms/mine', requireAuthenticated, wrap(async (req, res) => {
  res.json({ rooms: await myRooms(req.identity.id) })
}))

app.get('/api/study-rooms/:id', requireAuthenticated, wrap(async (req, res) => {
  const room = await roomFor(req.identity.id, req.params.id)
  // A non-member gets the same answer as a non-existent room: whether a room
  // exists is not something a stranger should be able to probe.
  if (!room) return res.status(404).json({ error: 'room not found' })
  res.json({ room })
}))

app.post('/api/study-rooms/:id/start', requireAuthenticated, wrap(async (req, res) => {
  res.json(await startRoom(req.identity.id, req.params.id))
}))

app.post('/api/study-rooms/:id/answers', requireAuthenticated, wrap(async (req, res) => {
  res.json(await submitAnswer(req.identity.id, req.params.id, req.body ?? {}))
}))

app.post('/api/study-rooms/:id/finish', requireAuthenticated, wrap(async (req, res) => {
  res.json(await finishRoom(req.identity.id, req.params.id))
}))

/* ── Study parties ───────────────────────────────────────────────────────── */

app.post('/api/parties', requireAuthenticated, wrap(async (req, res) => {
  res.json(await createParty(req.identity.id, req.body ?? {}))
}))

app.post('/api/parties/join', requireAuthenticated, wrap(async (req, res) => {
  res.json(await joinByCode(req.identity.id, req.body?.code))
}))

app.get('/api/parties/mine', requireAuthenticated, wrap(async (req, res) => {
  res.json({ parties: await myParties(req.identity.id) })
}))

app.get('/api/parties/open', requireAuthenticated, wrap(async (req, res) => {
  res.json({ parties: await openParties(req.identity.id) })
}))

app.get('/api/parties/:id', requireAuthenticated, wrap(async (req, res) => {
  const party = await partyFor(req.identity.id, req.params.id)
  if (!party) return res.status(404).json({ error: 'party not found' })
  res.json({ party })
}))

app.post('/api/parties/:id/visibility', requireAuthenticated, wrap(async (req, res) => {
  res.json(await setVisibility(req.identity.id, req.params.id, req.body?.visibility))
}))

app.post('/api/parties/:id/leave', requireAuthenticated, wrap(async (req, res) => {
  res.json(await leaveParty(req.identity.id, req.params.id))
}))

/* ── Study party sessions ────────────────────────────────────────────────── */

app.post('/api/parties/:id/sessions', requireAuthenticated, wrap(async (req, res) => {
  res.json(await createSession(req.identity.id, req.params.id, req.body ?? {}))
}))

app.get('/api/parties/:id/sessions', requireAuthenticated, wrap(async (req, res) => {
  res.json({ sessions: await sessionsFor(req.identity.id, req.params.id) })
}))

app.get('/api/party-sessions/:sessionId', requireAuthenticated, wrap(async (req, res) => {
  const session = await sessionFor(req.identity.id, req.params.sessionId)
  // A non-member gets the same answer as a non-existent session: whether a
  // session exists is not something a stranger should be able to probe.
  if (!session) return res.status(404).json({ error: 'session not found' })
  res.json({ session })
}))

app.post('/api/party-sessions/:sessionId/answers', requireAuthenticated, wrap(async (req, res) => {
  res.json(await answerItem(req.identity.id, req.params.sessionId, req.body ?? {}))
}))

app.post('/api/party-sessions/:sessionId/close', requireAuthenticated, wrap(async (req, res) => {
  res.json(await closeSession(req.identity.id, req.params.sessionId))
}))

/* ── Challenges ──────────────────────────────────────────────────────────── */

app.post('/api/challenges', requireAuthenticated, wrap(async (req, res) => {
  res.json(await createChallenge(req.identity.id, req.body ?? {}))
}))

app.get('/api/challenges/mine', requireAuthenticated, wrap(async (req, res) => {
  res.json({ challenges: await myChallenges(req.identity.id) })
}))

app.get('/api/challenges/:id', requireAuthenticated, wrap(async (req, res) => {
  const challenge = await challengeFor(req.identity.id, req.params.id)
  // A non-participant gets the same answer as a non-existent challenge: whether
  // a challenge exists between two other people is not theirs to probe.
  if (!challenge) return res.status(404).json({ error: 'challenge not found' })
  res.json({ challenge })
}))

app.post('/api/challenges/:id/respond', requireAuthenticated, wrap(async (req, res) => {
  res.json(await respondToChallenge(req.identity.id, req.params.id, Boolean(req.body?.accept)))
}))

app.post('/api/challenges/:id/answers', requireAuthenticated, wrap(async (req, res) => {
  res.json(await submitChallengeAnswer(req.identity.id, req.params.id, req.body ?? {}))
}))

app.post('/api/challenges/:id/finish', requireAuthenticated, wrap(async (req, res) => {
  res.json(await finishChallenge(req.identity.id, req.params.id))
}))

/* ── Friends ─────────────────────────────────────────────────────────────── */

app.get('/api/friends', requireAuthenticated, wrap(async (req, res) => {
  res.json({ friends: await myFriends(req.identity.id), requests: await myRequests(req.identity.id) })
}))

app.get('/api/friends/directory', requireAuthenticated, wrap(async (req, res) => {
  res.json({ people: await directorySearch(req.identity.id, req.query?.q) })
}))

app.post('/api/friends/request', requireAuthenticated, wrap(async (req, res) => {
  res.json(await sendRequest(req.identity.id, req.body?.userId))
}))

app.post('/api/friends/respond', requireAuthenticated, wrap(async (req, res) => {
  res.json(await respondToRequest(req.identity.id, req.body?.userId, Boolean(req.body?.accept)))
}))

app.post('/api/friends/remove', requireAuthenticated, wrap(async (req, res) => {
  res.json(await removeFriend(req.identity.id, req.body?.userId))
}))

app.post('/api/friends/invite', requireAuthenticated, wrap(async (req, res) => {
  res.json(await mintInvite(req.identity.id))
}))

app.post('/api/friends/invite/redeem', requireAuthenticated, wrap(async (req, res) => {
  res.json(await redeemInvite(req.identity.id, req.body?.token))
}))

/* ── Facebook link ────────────────────────────────────────────────────────
   Dark until Meta approves `user_friends` for this app: nothing here starts
   an OAuth handshake, so these routes exist for the day the flag flips on. */

/**
 * The same off switch the front end has.
 *
 * `VITE_FEATURE_FACEBOOK_FRIENDS` only ever hid the button, so linking still
 * shipped live as an API — "it ships off" was true of the screen and not of
 * the server. Off is the default: a flag nobody has set means the feature is
 * not on, never that the check was forgotten.
 */
function facebookFriendsEnabled(_req, res, next) {
  if (process.env.FEATURE_FACEBOOK_FRIENDS !== 'true') {
    // A refusal with a reason, not a status code: every other refusal in this
    // file answers 200 with `{ ok, reason }`, and the client's `apiSend` throws
    // away the body of anything else — so a 4xx here would reach a student as
    // "something went wrong" instead of a sentence.
    return res.json({ ok: false, reason: 'facebook_disabled' })
  }
  return next()
}

app.post('/api/friends/facebook/link', requireAuthenticated, facebookFriendsEnabled, wrap(async (req, res) => {
  res.json(await linkFacebookAccount(req.identity.id, req.body?.fbUserId))
}))

app.post('/api/friends/facebook/unlink', requireAuthenticated, facebookFriendsEnabled, wrap(async (req, res) => {
  res.json(await unlinkFacebookAccount(req.identity.id))
}))

/**
 * Meta's data-deletion callback, required for App Review.
 *
 * Public because Meta's own servers call it — there is no student session to
 * require, and requiring one meant this route answered 401 to every deletion
 * request, so the requirement it exists for did not work at all. What
 * authenticates it instead is the `signed_request` Meta signs with the app
 * secret: no secret configured, or a signature that does not verify, and the
 * request is refused rather than processed. It is listed in `apiAuthGate`'s
 * allowlist for that reason and no other.
 *
 * Left ungated by `FEATURE_FACEBOOK_FRIENDS` deliberately: anybody who ever
 * linked an account must be able to have it deleted, including after linking
 * is switched back off.
 *
 * Meta posts this form-encoded, so the parser is attached here rather than
 * globally — no other route takes a form body.
 */
app.post('/api/facebook/deletion-callback', express.urlencoded({ extended: false }), wrap(async (req, res) => {
  const appSecret = process.env.FACEBOOK_APP_SECRET
  if (!appSecret) return res.status(503).json({ error: 'facebook_not_configured' })

  const payload = parseFacebookSignedRequest(req.body?.signed_request ?? req.query?.signed_request, appSecret)
  if (!payload?.user_id) return res.status(401).json({ error: 'invalid_signed_request' })

  const fbUserId = String(payload.user_id)
  await facebookDeletionCallback(fbUserId)
  res.json({ url: `${PUBLIC_ORIGIN}/privacy`, confirmation_code: fbUserId })
}))

/* ── State store (mirrors localStorage keys) ─────────────────────────────── */

/* ── Push notification devices ───────────────────────────────────────────── */

/**
 * A device token is opaque to us, so the only thing worth checking is that it
 * looks like one rather than like a mistake. APNs issues hex, but pinning the
 * exact length would mean a future token format silently failing to register,
 * which is a hard problem to notice — nobody reports the notification they
 * never received.
 */
function normaliseDeviceToken(value) {
  const token = typeof value === 'string' ? value.trim() : ''
  if (token.length < 32 || token.length > 255) return null
  return /^[A-Za-z0-9]+$/.test(token) ? token : null
}

/**
 * Register this device for push, or move it to the current user.
 *
 * Upserting on the token is deliberate: see the note on `device_tokens` in
 * schema.sql. Whoever signed in most recently on a device is who that device
 * belongs to, so a shared or resold phone stops receiving the previous
 * student's reminders.
 */
app.post('/api/devices', requireAuthenticated, wrap(async (req, res) => {
  const token = normaliseDeviceToken(req.body?.token)
  if (!token) return res.status(400).json({ error: 'invalid device token' })
  const environment = req.body?.environment === 'sandbox' ? 'sandbox' : 'production'
  const locale = typeof req.body?.locale === 'string' ? req.body.locale.slice(0, 16) : null
  const appVersion = typeof req.body?.appVersion === 'string' ? req.body.appVersion.slice(0, 32) : null
  await pool.query(
    `INSERT INTO device_tokens (token, user_id, platform, environment, locale, app_version)
     VALUES (?, ?, 'ios', ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       user_id = VALUES(user_id), environment = VALUES(environment),
       locale = VALUES(locale), app_version = VALUES(app_version),
       last_seen_at = CURRENT_TIMESTAMP`,
    [token, req.identity.id, environment, locale, appVersion],
  )
  res.json({ ok: true })
}))

/**
 * Stop sending to this device — sign-out, or the student turning reminders off.
 *
 * Scoped to the caller's own rows. Tokens are not secret (the device hands
 * ours to us and Apple's to everyone), so without the `user_id` filter anyone
 * holding a token could silence someone else's notifications.
 */
app.delete('/api/devices/:token', requireAuthenticated, wrap(async (req, res) => {
  const token = normaliseDeviceToken(req.params.token)
  if (!token) return res.status(400).json({ error: 'invalid device token' })
  await pool.query('DELETE FROM device_tokens WHERE token = ? AND user_id = ?', [token, req.identity.id])
  res.json({ ok: true })
}))

// Shared catalogue documents that students need in order to use the learning
// product. All other shared documents (reports, imports, email logs, settings)
// remain admin-only even when a key is guessed.
const STUDENT_READABLE_STATE = new Set([
  // Alt text and dimensions for every image a student may be shown. The bytes
  // are a separate, individually authenticated request.
  MEDIA_STATE_KEY,
  'synapse-academic-universities-v1',
  'synapse-course-curricula-v1',
  'synapse-module-schedules-v1',
  'synapse-admin-content-ledger-v4',
  'synapse-concept-graph-v2',
  'synapse-relation-types-v1',
  'synapse-taxonomy-tree-v4',
  'synapse-medical-library-taxonomy-v1',
  // The bilingual glossary behind /app/taxonomy. Admin-written, student-read.
  'synapse-medical-glossary-v1',
  'synapse-medical-evidence-published-v1',
  'synapse-plans-v1',
  'synapse-notification-campaigns-v1',
  'synapse-vouchers-v1',
  'synapse-system-colors-v1',
  // The current plan catalogue. Billing and onboarding both price against it,
  // and without it a student was offered the seeded plans instead of the ones
  // actually being sold.
  'synapse-plan-catalog-v1',
  // The student-ID discount offer, shown on Billing to the students it is for.
  'synapse-student-id-discount-v1',
  // The upload allowance, so the demo build can show the limit an admin set.
  'synapse-storage-limits-v1',
  // Adaptive Study runs entirely on these three, on the student's own screen.
  // Admin-written and student-read: a student must not be able to edit the
  // thresholds they are judged by, but a page that cannot read them silently
  // falls back to defaults and reports figures nobody configured.
  'synapse-adaptive-config-v1',
  'synapse-adaptive-blueprints-v1',
  'synapse-adaptive-heldout-v1',
])

/**
 * When each catalogue document last changed.
 *
 * A phone cannot ask whether a document is stale without downloading all of it:
 * reads return the whole value, and there is no `HEAD` and no `If-None-Match`.
 * So an offline-first client had the choice of refetching every catalogue on
 * every launch or showing content it could not prove was current. This answers
 * the question directly — timestamps only, a few hundred bytes — and the client
 * fetches just the documents whose timestamp moved.
 *
 * A key that has never been written is reported as `null` rather than omitted,
 * so a client can tell "nothing stored yet" from "key not in the contract" and
 * stop asking for it.
 *
 * Registered before `/api/state/:key`, which would otherwise match this path
 * with `key = 'manifest'`. If that ordering is ever broken the request fails
 * closed — `manifest` is not in the readable set, so it would 403 rather than
 * disclose anything.
 */
app.get('/api/state/manifest', requireAuthenticated, wrap(async (_req, res) => {
  const keys = [...STUDENT_READABLE_STATE]
  const [rows] = await pool.query(
    `SELECT k, updated_at AS updatedAt FROM app_state WHERE k IN (${keys.map(() => '?').join(',')})`,
    keys,
  )
  const stored = new Map(rows.map((row) => [row.k, row.updatedAt]))
  const out = {}
  for (const key of keys) out[key] = stored.get(key) ?? null
  res.json({ keys: out })
}))

// Bulk hydrate on app boot.
app.get('/api/state', requireSuperAdmin, wrap(async (_req, res) => {
  const [rows] = await pool.query('SELECT k, v FROM app_state')
  const out = {}
  for (const r of rows) { try { out[r.k] = JSON.parse(r.v) } catch { out[r.k] = null } }
  res.json(out)
}))

app.get('/api/state/:key', wrap(async (req, res) => {
  // Console access, not the single role 'admin': an editor or a reviewer
  // authors this content and must read it whole. Redaction is for students.
  const authoring = hasConsoleAccess(req.identity?.role)
  if (!STUDENT_READABLE_STATE.has(req.params.key)) {
    if (!authoring) return res.status(403).json({ error: 'console access required' })
    if (!mfaSatisfied(req.identity)) return res.status(403).json({ error: 'mfa_required' })
  }
  // `updatedAt` lets the client decide whether its crash-recovery copy is newer
  // than the stored document. Without it a stale browser silently wins and
  // re-uploads old data over a newer server-side write.
  //
  // `version` is the row this document was read at. The client sends it back on
  // save, which is what lets the write below reconstruct what that client
  // actually changed instead of taking its whole document on trust.
  const [rows] = await pool.query(
    `SELECT s.v, s.updated_at AS updatedAt,
            (SELECT MAX(id) FROM app_state_versions WHERE k = s.k) AS version
       FROM app_state s WHERE s.k = ?`,
    [req.params.key],
  )
  if (!rows.length) return res.json({ value: null, updatedAt: null, version: null })
  const { updatedAt, version } = rows[0]
  let value
  try { value = JSON.parse(rows[0].v) } catch { return res.json({ value: null, updatedAt, version }) }
  // Some readable documents are readable only in part. The content ledger holds
  // every authored item in every state, including drafts, the author's private
  // notes and the provenance of borrowed papers; a student gets its published
  // projection instead. That happens here rather than in the browser, because a
  // field removed after delivery has already been delivered.
  const redact = authoring ? undefined : REDACTED_STATE_KEYS.get(req.params.key)
  res.json({ value: redact ? redact(value) : value, updatedAt, version })
}))

/**
 * Save a shared document.
 *
 * Three refusals, in the order they become knowable: you must hold a tab that
 * owns this key; the changes you are making must be yours to make; and nobody
 * may have changed the same item underneath you. Each answers with what is
 * wrong, because a save that fails silently is the bug this route used to have.
 */
app.put('/api/state/:key', requireConsole, wrap(async (req, res) => {
  const key = req.params.key
  const owners = tabsForStateKey(key)
  const held = await heldTabs(req.identity)
  const superAdmin = req.identity.role === 'super_admin'

  // A key no tab declares is reachable only by a super admin. Fail closed: a
  // document added later without a registry entry becomes a bug report, never
  // a hole.
  if (!superAdmin && !holdsTab(held, owners)) {
    return res.status(403).json({ error: 'that area is not part of your role' })
  }

  const baseVersion = req.body?.baseVersion
  if (baseVersion === undefined) {
    return res.status(400).json({ error: 'baseVersion is required; reload this page and try again' })
  }

  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const [currentRows] = await conn.query('SELECT v FROM app_state WHERE k = ? FOR UPDATE', [key])
    const storedRaw = currentRows.length ? currentRows[0].v : null
    const [versionRows] = await conn.query('SELECT MAX(id) AS version FROM app_state_versions WHERE k = ?', [key])
    const storedVersion = versionRows[0]?.version ?? null

    let base = null
    if (baseVersion !== null) {
      const [baseRows] = await conn.query('SELECT v FROM app_state_versions WHERE id = ? AND k = ?', [baseVersion, key])
      if (!baseRows.length) {
        await conn.rollback()
        return res.status(409).json({
          error: 'stale',
          reason: 'this page was loaded from a version that is no longer on record — reload and try again',
        })
      }
      base = JSON.parse(baseRows[0].v)
    } else if (storedVersion !== null) {
      // The client believed this document did not exist, and it does.
      await conn.rollback()
      return res.status(409).json({
        error: 'stale',
        reason: 'this document was created while you were editing — reload and try again',
      })
    }

    const stored = storedRaw === null ? null : JSON.parse(storedRaw)
    const incoming = req.body?.value ?? null

    if (!superAdmin) {
      const changes = diffDocument(key, base, incoming)
      // A document with no adapter yields no changes; the base-version check
      // above is what protects it, and the tab check above is its authorisation.
      const authorised = authoriseChanges(changes, { heldTabs: held, contentScope: req.identity.contentScope })
      if (!authorised.ok) {
        await conn.rollback()
        return res.status(403).json({ error: 'refused', refusals: authorised.refusals })
      }
    }

    const merged = mergeDocument(key, base, stored, incoming)
    if (!merged.ok) {
      await conn.rollback()
      return res.status(409).json({
        error: 'conflict',
        conflicts: merged.conflicts,
        reason: 'somebody else changed the same items while you were editing',
      })
    }

    const v = JSON.stringify(merged.value ?? null)
    let version = storedVersion
    if (storedRaw !== v) {
      const [inserted] = await conn.query(
        'INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)', [key, v, req.identity.id],
      )
      version = inserted.insertId
      await conn.query(
        'INSERT INTO app_state (k, v) VALUES (?, ?) ON DUPLICATE KEY UPDATE v = VALUES(v)', [key, v],
      )
    }
    await conn.commit()
    invalidateSnapshots(key)
    if (key === ROLE_TABS_STATE_KEY) invalidateRoleTabs()
    res.json({ ok: true, version })
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}))

app.delete('/api/state/:key', requireSuperAdmin, wrap(async (req, res) => {
  // Deleting a whole document is not an edit: it has no per-item diff and so no
  // scope to judge it against. Super admin only.
  await pool.query('DELETE FROM app_state WHERE k = ?', [req.params.key])
  invalidateSnapshots(req.params.key)
  if (req.params.key === ROLE_TABS_STATE_KEY) invalidateRoleTabs()
  res.json({ ok: true })
}))

/* ── Private, per-user state ─────────────────────────────────────────────── */

app.get('/api/user-state/:key', wrap(async (req, res) => {
  const [rows] = await pool.query(
    'SELECT v, updated_at AS updatedAt FROM user_state WHERE user_id = ? AND k = ?',
    [req.identity.id, req.params.key],
  )
  if (!rows.length) return res.json({ value: null, updatedAt: null })
  try { res.json({ value: JSON.parse(rows[0].v), updatedAt: rows[0].updatedAt }) } catch { res.json({ value: null, updatedAt: rows[0].updatedAt }) }
}))

app.put('/api/user-state/:key', wrap(async (req, res) => {
  const v = JSON.stringify(req.body?.value ?? null)
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const [current] = await conn.query(
      'SELECT v FROM user_state WHERE user_id = ? AND k = ? FOR UPDATE',
      [req.identity.id, req.params.key],
    )
    if (!current.length || current[0].v !== v) {
      await conn.query(
        'INSERT INTO user_state_versions (user_id, k, v) VALUES (?, ?, ?)',
        [req.identity.id, req.params.key, v],
      )
      await conn.query(
        `INSERT INTO user_state (user_id, k, v) VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE v = VALUES(v)`,
        [req.identity.id, req.params.key, v],
      )
    }
    await conn.commit()
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
  res.json({ ok: true })
}))

app.delete('/api/user-state/:key', wrap(async (req, res) => {
  await pool.query('DELETE FROM user_state WHERE user_id = ? AND k = ?', [req.identity.id, req.params.key])
  res.json({ ok: true })
}))

// Student accounts can read shared catalogue state, but operational records and
// mailbox contents remain admin-only even if a route is guessed manually.
/**
 * Unsubscribe.
 *
 * Deliberately public and deliberately before the admin guard: the reader is a
 * signed-out student clicking a link in their inbox, or Gmail's own one-click
 * control POSTing on their behalf. Requiring a session here would mean the
 * unsubscribe silently failed, which is exactly what "report spam" is for.
 *
 * The token is opaque and single-purpose, so no address travels in a URL and a
 * leaked link reveals nothing about who else is subscribed.
 */
async function applyUnsubscribe(token) {
  const [rows] = await pool.query('SELECT address, category FROM email_unsubscribe_tokens WHERE token = ? LIMIT 1', [token])
  if (!rows.length) return null
  const { address, category } = rows[0]
  await pool.query(
    'INSERT INTO email_suppressions (id, address, category, reason) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE created_at = created_at',
    [`sup-${randomUUID().slice(0, 12)}`, address, category, 'unsubscribed'],
  )
  return { address, category }
}

// RFC 8058 one-click: the mail client POSTs this itself, with no human present.
app.post('/api/unsubscribe', wrap(async (req, res) => {
  const token = req.query.token || (req.body && req.body.token)
  if (!token) return res.status(400).json({ error: 'token required' })
  const result = await applyUnsubscribe(String(token))
  if (!result) return res.status(404).json({ error: 'unknown token' })
  res.json({ ok: true, category: result.category })
}))

// The link a person clicks. The SPA renders the confirmation at /unsubscribe.
app.get('/api/unsubscribe', wrap(async (req, res) => {
  const token = req.query.token
  if (!token) return res.status(400).json({ error: 'token required' })
  const result = await applyUnsubscribe(String(token))
  if (!result) return res.status(404).json({ error: 'unknown token' })
  res.json({ ok: true, category: result.category })
}))

app.use('/api/students', requireTab('students'))
app.use(['/api/mailboxes', '/api/mail'], requireTab('mailbox'))

/* ── Roles and recoverable snapshots ───────────────────────────────────── */

/* ── Account administration ────────────────────────────────────────────────
   Every route here is admin-only and every mutating one requires a written
   reason, which is stored beside the change. These actions decide whether a
   person can sign in and what they have paid for; an audit trail that says who
   and why is the difference between an administrative record and a mystery. */

app.get('/api/admin/users', requireTab('users'), wrap(async (req, res) => {
  res.json(await listUsers({
    query: req.query.q ? String(req.query.q) : undefined,
    status: req.query.status ? String(req.query.status) : undefined,
    plan: req.query.plan ? String(req.query.plan) : undefined,
    universityId: req.query.universityId ? String(req.query.universityId) : undefined,
    accessStatus: req.query.accessStatus ? String(req.query.accessStatus) : undefined,
    limit: Math.min(Number(req.query.limit) || 200, 1000),
  }))
}))

app.get('/api/admin/users/capabilities', requireTab('users'), (_req, res) => {
  // The UI asks before it offers. A reset button that cannot work should be
  // explained on the screen, not discovered when someone presses it.
  res.json({ passwordReset: passwordResetConfigured })
})

app.get('/api/admin/users/:id', requireTab('users'), wrap(async (req, res) => {
  const user = await getUser(req.params.id)
  if (!user) return res.status(404).json({ error: 'user not found' })
  res.json(user)
}))

app.patch('/api/admin/users/:id', requireTab('users'), wrap(async (req, res) => {
  const reason = readReason(req.body)
  if (!reason) return res.status(400).json({ error: 'reason must be explicit (8 characters or more)' })
  const fields = ['name', 'email', 'university_id', 'year', 'study_group', 'notes']
  const updates = []
  const params = []
  for (const [key, column] of [['name', 'name'], ['email', 'email'], ['universityId', 'university_id'], ['year', 'year'], ['group', 'study_group'], ['notes', 'notes']]) {
    if (req.body?.[key] !== undefined && fields.includes(column)) { updates.push(`${column} = ?`); params.push(req.body[key] || null) }
  }
  if (!updates.length) return res.status(400).json({ error: 'nothing to update' })
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const [rows] = await conn.query('SELECT id FROM students WHERE id = ? FOR UPDATE', [req.params.id])
    if (!rows.length) { await conn.rollback(); return res.status(404).json({ error: 'no profile to update' }) }
    await conn.query(`UPDATE students SET ${updates.join(', ')} WHERE id = ?`, [...params, req.params.id])
    await recordAction(conn, { studentId: req.params.id, action: 'profile.update', detail: updates.join(', '), reason, actorId: req.identity.id })
    await conn.commit()
    res.json({ ok: true })
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}))

app.post('/api/admin/users/:id/subscription', requireTab('users'), wrap(async (req, res) => {
  const reason = readReason(req.body)
  if (!reason) return res.status(400).json({ error: 'reason must be explicit (8 characters or more)' })
  const plan = String(req.body?.plan || '').trim()
  if (!plan) return res.status(400).json({ error: 'plan is required' })
  const days = req.body?.days === null || req.body?.days === undefined ? null : Number(req.body.days)
  if (days !== null && (!Number.isFinite(days) || days <= 0 || days > 3650)) {
    return res.status(400).json({ error: 'days must be between 1 and 3650, or null for open-ended' })
  }
  const result = await grantSubscription(req.params.id, {
    plan, days, source: req.body?.source, note: req.body?.note, reason, actorId: req.identity.id,
  })
  if (result.error) return res.status(404).json({ error: result.error })
  res.json(result)
}))

app.post('/api/admin/users/:id/subscription/cancel', requireTab('users'), wrap(async (req, res) => {
  const reason = readReason(req.body)
  if (!reason) return res.status(400).json({ error: 'reason must be explicit (8 characters or more)' })
  const result = await cancelSubscription(req.params.id, {
    reason, actorId: req.identity.id, immediate: Boolean(req.body?.immediate),
  })
  if (result.error) return res.status(result.error === 'no_subscription' ? 409 : 404).json({ error: result.error })
  res.json(result)
}))

app.post('/api/admin/users/:id/access', requireTab('users'), wrap(async (req, res) => {
  const reason = readReason(req.body)
  if (!reason) return res.status(400).json({ error: 'reason must be explicit (8 characters or more)' })
  const status = req.body?.status
  if (!['active', 'suspended'].includes(status)) return res.status(400).json({ error: 'status must be active or suspended' })
  const result = await setAccessStatus(req.params.id, { status, reason, actorId: req.identity.id })
  if (result.error === 'no_identity') return res.status(409).json({ error: 'this person has never signed in, so there is no account to suspend' })
  if (result.error === 'cannot_suspend_console') return res.status(409).json({ error: 'demote this account to student before suspending it' })
  if (result.error) return res.status(404).json({ error: result.error })
  res.json(result)
}))

app.post('/api/admin/users/:id/password-reset', requireTab('users'), wrap(async (req, res) => {
  const reason = readReason(req.body)
  if (!reason) return res.status(400).json({ error: 'reason must be explicit (8 characters or more)' })
  const result = await requestPasswordReset(req.params.id, { reason, actorId: req.identity.id })
  if (result.error === 'supabase_not_configured') {
    return res.status(503).json({ error: 'password resets need SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY on the server' })
  }
  if (result.error === 'no_email') return res.status(409).json({ error: 'this account has no email address to send a reset to' })
  if (result.error === 'supabase_rejected') return res.status(502).json({ error: `Supabase refused the request (${result.status})` })
  if (result.error) return res.status(404).json({ error: result.error })
  res.json(result)
}))

app.get('/api/admin/users/:id/activity', requireTab('users'), wrap(async (req, res) => {
  // Keyed on the Supabase user id, because `user_state` is written by the app
  // under the signed-in identity. A roster row that has never signed in owns no
  // state, and reports none rather than erroring.
  const user = await getUser(req.params.id)
  if (!user) return res.status(404).json({ error: 'user not found' })
  res.json(await getUserActivity(user.identity?.userId ?? null))
}))

app.post('/api/admin/users/:id/role', requireTab('users'), wrap(async (req, res) => {
  const reason = readReason(req.body)
  if (!reason) return res.status(400).json({ error: 'reason must be explicit (8 characters or more)' })
  if (req.params.id === req.identity.id) return res.status(409).json({ error: 'you cannot change your own role' })
  const result = await setRole(req.params.id, {
    role: req.body?.role, reason, actorId: req.identity.id, actorRole: req.identity.role,
  })
  const REFUSALS = {
    invalid_role: [400, 'role must be student, reviewer, admin or editor'],
    forbidden: [403, 'that change is above your level'],
    no_identity: [409, 'this person has never signed in, so there is no role to change'],
    suspended: [409, 'reactivate this account before changing its role'],
    unchanged: [409, 'that is already their role'],
    last_console: [409, 'this is the last account with console access — promote someone else first'],
    not_found: [404, 'user not found'],
  }
  if (result.error) {
    const [status, message] = REFUSALS[result.error] ?? [400, result.error]
    return res.status(status).json({ error: message })
  }
  res.json(result)
}))

app.post('/api/admin/users/:id/scope', requireTab('users'), wrap(async (req, res) => {
  const reason = readReason(req.body)
  if (!reason) return res.status(400).json({ error: 'reason must be explicit (8 characters or more)' })
  const result = await setContentScope(req.params.id, {
    moduleIds: req.body?.moduleIds, yearIds: req.body?.yearIds,
    reason, actorId: req.identity.id, actorRole: req.identity.role,
  })
  const REFUSALS = {
    forbidden: [403, 'that change is above your level'],
    not_scoped: [409, 'only a reviewer is assigned modules and years'],
    no_identity: [409, 'this person has never signed in, so there is nothing to scope'],
    not_found: [404, 'user not found'],
  }
  if (result.error) {
    const [status, message] = REFUSALS[result.error] ?? [400, result.error]
    return res.status(status).json({ error: message })
  }
  res.json(result)
}))

/* `GET /api/access/users` and `POST /api/access/users/:userId/promote` used to
   live here, behind the Students tab's own panel. The promote route wrote the
   same `user_access.role` column as `/api/admin/users/:id/role` while checking
   neither the actor's rank nor a self-edit, which under a hierarchy is an
   escalation route rather than a duplication. Both are gone with that panel:
   roles are changed in Users, one door with one lock. */

app.get('/api/backups', requireTab('audit'), wrap(async (_req, res) => {
  const [rows] = await pool.query(
    'SELECT id, label, created_by AS createdBy, created_at AS createdAt, OCTET_LENGTH(snapshot_json) AS sizeBytes FROM data_snapshots ORDER BY created_at DESC LIMIT 50',
  )
  res.json(rows)
}))

async function createDataSnapshot(label, createdBy) {
  // Snapshot current recoverable state, not the append-only version ledgers.
  // Including those ledgers duplicates large historical JSON documents inside
  // one packet and can exceed MariaDB's max_allowed_packet as the library grows.
  const tables = ['schema_migrations', 'app_state', 'user_state', 'students', 'mailboxes', 'emails', 'attachments', 'user_access', 'role_promotion_audit']
  const snapshot = { schemaVersion: 1, createdAt: new Date().toISOString(), tables: {} }
  for (const table of tables) {
    const [rows] = await pool.query(`SELECT * FROM ${table}`)
    snapshot.tables[table] = rows
  }
  const id = `snapshot-${randomUUID()}`
  await pool.query(
    'INSERT INTO data_snapshots (id, label, snapshot_json, created_by) VALUES (?, ?, ?, ?)',
    [id, String(label).slice(0, 255), JSON.stringify(snapshot), createdBy],
  )
  return { id, label }
}

async function readMedicalLibraryLaunchData() {
  return JSON.parse(await readFile(LAUNCH_DATA_PATH, 'utf8'))
}

/** Read-only launch preflight. It never changes production data. */
app.get('/api/launch/medical-library-v1/preview', requireTab('audit'), wrap(async (_req, res) => {
  const launch = await readMedicalLibraryLaunchData()
  const [migration] = await pool.query('SELECT id, applied_at AS appliedAt FROM schema_migrations WHERE id = ?', [launch.migrationId])
  const keys = Object.keys(launch.states)
  const [stateRows] = await pool.query('SELECT k, OCTET_LENGTH(v) AS sizeBytes, updated_at AS updatedAt FROM app_state WHERE k IN (?)', [keys])
  res.json({
    migrationId: launch.migrationId,
    alreadyApplied: Boolean(migration.length),
    appliedAt: migration[0]?.appliedAt || null,
    report: launch.report,
    statesToReplace: keys,
    existingStates: stateRows,
  })
}))

/* ── Medical library coverage review (admin-only) ───────────────────────── */

app.get('/api/medical-library/coverage/summary', requireTab('library'), wrap(async (_req, res) => {
  const [[totals], destinations, systems, sourceStates, collections] = await Promise.all([
    pool.query('SELECT COUNT(*) AS candidates, COUNT(DISTINCT source_id) AS candidateSources FROM medical_library_candidate_coverage').then(([rows]) => rows),
    pool.query('SELECT destination, COUNT(*) AS count FROM medical_library_candidate_coverage GROUP BY destination ORDER BY count DESC').then(([rows]) => rows),
    pool.query('SELECT system_id AS systemId, COUNT(*) AS count FROM medical_library_candidate_coverage GROUP BY system_id ORDER BY count DESC').then(([rows]) => rows),
    pool.query('SELECT availability_status AS status, COUNT(*) AS count FROM medical_library_source_availability GROUP BY availability_status ORDER BY count DESC').then(([rows]) => rows),
    pool.query('SELECT collection_id AS collectionId, COUNT(*) AS count FROM medical_library_source_availability GROUP BY collection_id ORDER BY count DESC').then(([rows]) => rows),
  ])
  res.json({
    candidates: Number(totals?.candidates || 0),
    candidateSources: Number(totals?.candidateSources || 0),
    destinations: destinations.map((row) => ({ ...row, count: Number(row.count) })),
    systems: systems.map((row) => ({ ...row, count: Number(row.count) })),
    sourceStates: sourceStates.map((row) => ({ ...row, count: Number(row.count) })),
    collections: collections.map((row) => ({ ...row, count: Number(row.count) })),
  })
}))

app.get('/api/medical-library/coverage/candidates', requireTab('library'), wrap(async (req, res) => {
  const page = Math.max(1, Number.parseInt(String(req.query.page || '1'), 10) || 1)
  const pageSize = Math.min(100, Math.max(10, Number.parseInt(String(req.query.pageSize || '50'), 10) || 50))
  const destination = String(req.query.destination || '').trim()
  const systemId = String(req.query.systemId || '').trim()
  const sourceId = String(req.query.sourceId || '').trim()
  const search = String(req.query.search || '').trim().slice(0, 160)
  const where = []
  const params = []
  if (destination) { where.push('destination = ?'); params.push(destination) }
  if (systemId) { where.push('system_id = ?'); params.push(systemId) }
  if (sourceId) { where.push('source_id = ?'); params.push(sourceId) }
  if (search) {
    where.push('(label LIKE ? OR statement LIKE ? OR candidate_id LIKE ? OR source_id LIKE ?)')
    const like = `%${search}%`
    params.push(like, like, like, like)
  }
  const clause = where.length ? `WHERE ${where.join(' AND ')}` : ''
  const [[countRow]] = await pool.query(`SELECT COUNT(*) AS total FROM medical_library_candidate_coverage ${clause}`, params)
  const [rows] = await pool.query(
    `SELECT candidate_id AS candidateId, source_id AS sourceId, system_id AS systemId,
       subject, topic, subtopic, microtopic, label, statement, concept_type AS conceptType,
       risk_class AS riskClass, confidence, destination, reason_code AS reasonCode, reason,
       target_concept_id AS targetConceptId, resource_relative_path AS resourceRelativePath,
       locator_page AS locatorPage, locator_printed_page AS locatorPrintedPage,
       locator_section AS locatorSection, locator_start AS locatorStart, locator_end AS locatorEnd,
       coverage_unit_id AS coverageUnitId, support_span AS supportSpan
     FROM medical_library_candidate_coverage ${clause}
     ORDER BY system_id, source_id, candidate_id LIMIT ? OFFSET ?`,
    [...params, pageSize, (page - 1) * pageSize],
  )
  res.json({
    page,
    pageSize,
    total: Number(countRow.total || 0),
    items: rows.map((row) => ({ ...row, confidence: row.confidence == null ? null : Number(row.confidence) })),
  })
}))

app.get('/api/medical-library/coverage/sources', requireTab('library'), wrap(async (req, res) => {
  const collectionId = String(req.query.collectionId || '').trim()
  const status = String(req.query.status || '').trim()
  const where = []
  const params = []
  if (collectionId) { where.push('collection_id = ?'); params.push(collectionId) }
  if (status) { where.push('availability_status = ?'); params.push(status) }
  const clause = where.length ? `WHERE ${where.join(' AND ')}` : ''
  const [rows] = await pool.query(
    `SELECT source_id AS sourceId, collection_id AS collectionId, relative_path AS relativePath,
       availability_status AS status FROM medical_library_source_availability ${clause}
     ORDER BY collection_id, relative_path, source_id`,
    params,
  )
  res.json({ items: rows })
}))

async function medicalResourceRecords() {
  if (medicalResourceSnapshot) return medicalResourceSnapshot.resources
  if (!medicalResourceLoad) {
    medicalResourceLoad = (async () => {
      const [rows] = await pool.query('SELECT v FROM app_state WHERE k = ?', [MEDICAL_EVIDENCE_STATE_KEY])
      const resources = rows.length ? JSON.parse(rows[0].v).resources ?? [] : []
      medicalResourceSnapshot = {
        resources,
        byId: new Map(resources.map((resource) => [resource.id, resource])),
      }
      return medicalResourceSnapshot
    })().finally(() => { medicalResourceLoad = null })
  }
  return (await medicalResourceLoad).resources
}

async function resourceRecord(resourceId) {
  await medicalResourceRecords()
  return medicalResourceSnapshot?.byId.get(resourceId) || null
}

function resolvedResourcePath(storageKey) {
  return resolveWithin(RESOURCE_STORAGE_DIR, storageKey)
}

function resolvedChunkUploadPath(resourceId, uploadId) {
  return resolveUploadWorkspace(RESOURCE_STORAGE_DIR, resourceId, uploadId)
}

/** Remove interrupted upload work only after every stored resource is live. */
/**
 * Receive one image.
 *
 * A single request, unlike a medical resource: there the catalogue already
 * knows the digest and the upload is checked against it, and here the digest is
 * what the upload produces. So the bytes land in a staging file, are measured
 * and identified from their own content, and only then move to the path their
 * digest names.
 */
app.post('/api/media', requireTab('resources'), wrap(async (req, res) => {
  const staging = resolveWithin(MEDIA_STORAGE_DIR, join('media', '.staging', randomUUID()))
  if (!staging) return res.status(500).json({ error: 'media staging path could not be resolved' })

  let received
  try {
    received = await receiveStream(req, staging, { maxBytes: MEDIA_MAX_BYTES })
  } catch (error) {
    await rm(staging, { force: true })
    return res.status(413).json({ error: error.message })
  }

  try {
    // Identified from the file, never from the Content-Type the caller sent.
    const head = Buffer.alloc(Math.min(64 * 1024, received.sizeBytes))
    const handle = await open(staging, 'r')
    try { await handle.read(head, 0, head.length, 0) } finally { await handle.close() }
    const meta = imageMeta(head)
    if (!meta) return res.status(415).json({ error: 'that file is not a PNG, JPEG, GIF or WebP image' })

    const storageKey = storageKeyFor(received.sha256, meta.mimeType)
    const fullPath = storageKey && resolveWithin(MEDIA_STORAGE_DIR, storageKey)
    if (!fullPath) return res.status(500).json({ error: 'media path could not be resolved' })

    // Two people uploading the same file store it once. They still each get
    // their own record — the client is told about the match and offers the
    // existing one rather than merging two people's alt text because the bytes
    // happened to agree.
    const alreadyStored = existsSync(fullPath)
    if (!alreadyStored) {
      await mkdir(dirname(fullPath), { recursive: true })
      await rename(staging, fullPath)
    }

    return res.json({
      ok: true,
      storageKey,
      sha256: received.sha256,
      sizeBytes: received.sizeBytes,
      mimeType: meta.mimeType,
      width: meta.width,
      height: meta.height,
      alreadyStored,
    })
  } finally {
    // Whatever happened above, nothing is left in staging. A rename has already
    // moved it; every other path abandoned it.
    await rm(staging, { force: true })
  }
}))

/**
 * Serve one image.
 *
 * Authenticated, like every other stored file here: these are a paying
 * product's teaching assets. Cached immutably because the path is the digest —
 * this URL cannot ever come to mean a different picture.
 */
app.get('/api/media/:id', requireAuthenticated, wrap(async (req, res) => {
  const record = (await mediaRecords()).find((entry) => entry.id === req.params.id)
  if (!record) return res.status(404).json({ error: 'media not found' })
  const fullPath = resolveWithin(MEDIA_STORAGE_DIR, record.storageKey || '')
  if (!fullPath || !existsSync(fullPath)) return res.status(404).json({ error: 'media file is pending upload' })
  res.setHeader('Content-Type', record.mimeType || 'application/octet-stream')
  res.setHeader('Cache-Control', 'private, max-age=31536000, immutable')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.sendFile(fullPath)
}))

/**
 * Whether this image may be removed.
 *
 * The record itself is removed by the client's write to the library document;
 * this route exists to refuse, and to say who is still using it. The bytes stay
 * where they are: they are content-addressed, so another record may
 * legitimately name the same file.
 */
app.delete('/api/media/:id', requireTab('resources'), wrap(async (req, res) => {
  const [ledgerRow] = await pool.query('SELECT v FROM app_state WHERE k = ?', ['synapse-admin-content-ledger-v4'])
  const [graphRow] = await pool.query('SELECT v FROM app_state WHERE k = ?', ['synapse-concept-graph-v2'])
  const ledger = ledgerRow.length ? JSON.parse(ledgerRow[0].v) : []
  const concepts = graphRow.length ? (JSON.parse(graphRow[0].v)?.concepts ?? []) : []
  const refusal = deleteRefusal(req.params.id, ledger, concepts)
  if (refusal) return res.status(409).json({ error: refusal })
  res.json({ ok: true })
}))

app.post('/api/medical-resources/cleanup-uploads', requireTab('resources'), wrap(async (_req, res) => {
  const storedResources = (await medicalResourceRecords()).filter((resource) => resource.storageKey)
  if (!storedResources.length) return res.status(409).json({ error: 'no qualified stored resources are registered' })
  const missingResourceIds = storedResources
    .filter((resource) => {
      const fullPath = resolvedResourcePath(resource.storageKey)
      return !fullPath || !existsSync(fullPath)
    })
    .map((resource) => resource.id)
  if (missingResourceIds.length) return res.status(409).json({ error: 'qualified resources are still pending upload', missingResourceIds })
  await rm(resolve(RESOURCE_STORAGE_DIR, '.__uploads'), { recursive: true, force: true })
  res.json({ ok: true, storedResources: storedResources.length })
}))

app.get('/api/medical-resources/:resourceId/status', requireAuthenticated, wrap(async (req, res) => {
  const resource = await resourceRecord(req.params.resourceId)
  if (!resource) return res.status(404).json({ error: 'resource not found' })
  const fullPath = resolvedResourcePath(resource.storageKey)
  res.json({
    id: resource.id,
    available: Boolean(fullPath && existsSync(fullPath)),
    externalUrl: resource.sourceUri || null,
    storageKey: hasConsoleAccess(req.identity.role) ? resource.storageKey || null : undefined,
  })
}))

app.get('/api/medical-resources/:resourceId', requireAuthenticated, wrap(async (req, res) => {
  const resource = await resourceRecord(req.params.resourceId)
  if (!resource) return res.status(404).json({ error: 'resource not found' })
  if (resource.sourceUri) return res.redirect(302, resource.sourceUri)
  const fullPath = resolvedResourcePath(resource.storageKey)
  if (!fullPath || !existsSync(fullPath)) return res.status(404).json({ error: 'resource file is pending secure upload' })
  res.setHeader('Content-Type', resource.mediaType === 'pdf' ? 'application/pdf' : 'application/octet-stream')
  res.setHeader('Content-Disposition', `inline; filename="${basename(resource.title).replace(/["\r\n]/g, '')}"`)
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.sendFile(fullPath)
}))

app.put('/api/medical-resources/:resourceId/file', requireTab('resources'), wrap(async (req, res) => {
  const resource = await resourceRecord(req.params.resourceId)
  if (!resource) return res.status(404).json({ error: 'resource not found' })
  const fullPath = resolvedResourcePath(resource.storageKey)
  if (!fullPath) return res.status(400).json({ error: 'resource has no valid authenticated storage key' })
  if (existsSync(fullPath)) return res.status(409).json({ error: 'resource is already uploaded; replacement requires a separate reviewed operation' })
  const result = await receiveStream(req, fullPath, {
    maxBytes: RESOURCE_MAX_BYTES,
    expectedSha256: resource.sha256 || null,
  })
  res.json({ ok: true, id: resource.id, ...result })
}))

/**
 * Cloud delivery networks commonly cap a single request below textbook size.
 * These endpoints accept bounded chunks, then verify the reconstructed file
 * against the qualified source hash before it becomes visible to readers.
 */
app.put('/api/medical-resources/:resourceId/chunks/:uploadId/:index', requireTab('resources'), wrap(async (req, res) => {
  const resource = await resourceRecord(req.params.resourceId)
  if (!resource) return res.status(404).json({ error: 'resource not found' })
  const fullPath = resolvedResourcePath(resource.storageKey)
  if (!fullPath) return res.status(400).json({ error: 'resource has no valid authenticated storage key' })
  if (existsSync(fullPath)) return res.status(409).json({ error: 'resource is already uploaded' })
  const uploadPath = resolvedChunkUploadPath(resource.id, req.params.uploadId)
  const index = Number(req.params.index)
  if (!uploadPath || !Number.isInteger(index) || index < 0 || index > 1023) return res.status(400).json({ error: 'invalid chunk upload path' })
  const declaredLength = Number(req.header('content-length'))
  if (Number.isFinite(declaredLength) && declaredLength > RESOURCE_CHUNK_MAX_BYTES) return res.status(413).json({ error: 'chunk exceeds configured limit' })
  const { sizeBytes } = await receiveChunk(req, uploadPath, index, RESOURCE_CHUNK_MAX_BYTES)
  res.json({ ok: true, index, sizeBytes })
}))

app.post('/api/medical-resources/:resourceId/chunks/:uploadId/complete', requireTab('resources'), wrap(async (req, res) => {
  const resource = await resourceRecord(req.params.resourceId)
  if (!resource) return res.status(404).json({ error: 'resource not found' })
  const fullPath = resolvedResourcePath(resource.storageKey)
  if (!fullPath) return res.status(400).json({ error: 'resource has no valid authenticated storage key' })
  if (existsSync(fullPath)) return res.status(409).json({ error: 'resource is already uploaded' })
  const uploadPath = resolvedChunkUploadPath(resource.id, req.params.uploadId)
  const totalChunks = Number(req.body?.totalChunks)
  const declaredSize = Number(req.body?.sizeBytes)
  if (!uploadPath || !Number.isInteger(totalChunks) || totalChunks < 1 || totalChunks > 1024) return res.status(400).json({ error: 'invalid chunk count' })
  if (!Number.isFinite(declaredSize) || declaredSize < 1 || declaredSize > RESOURCE_CHUNKED_MAX_BYTES) return res.status(413).json({ error: 'resource exceeds configured chunked-upload limit' })

  try {
    const result = await assembleChunks(uploadPath, fullPath, {
      totalChunks,
      declaredSize,
      maxBytes: RESOURCE_CHUNKED_MAX_BYTES,
      chunkMaxBytes: RESOURCE_CHUNK_MAX_BYTES,
      expectedSha256: resource.sha256 || null,
    })
    // A successful, hash-verified assembly makes every partial attempt for
    // this resource obsolete. Remove the resource's entire upload workspace
    // so interrupted retry profiles do not consume persistent-volume space.
    await rm(dirname(uploadPath), { recursive: true, force: true })
    res.json({ ok: true, id: resource.id, ...result })
  } catch (error) {
    if (error.status) return res.status(error.status).json({ error: error.message })
    throw error
  }
}))

app.post('/api/backups', requireTab('audit'), wrap(async (req, res) => {
  const label = req.body?.label || `Manual snapshot ${new Date().toISOString()}`
  res.json(await createDataSnapshot(label, req.identity.id))
}))

app.get('/api/backups/:id/download', requireTab('audit'), wrap(async (req, res) => {
  const [rows] = await pool.query(
    'SELECT label, snapshot_json AS snapshotJson FROM data_snapshots WHERE id = ?',
    [req.params.id],
  )
  if (!rows.length) return res.status(404).json({ error: 'snapshot not found' })
  const filename = `${req.params.id.replace(/[^a-zA-Z0-9_-]/g, '')}.json`
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
  res.send(rows[0].snapshotJson)
}))

/* ── Students ────────────────────────────────────────────────────────────── */

const STUDENT_COLS = 'id, name, email, university_id AS universityId, year, plan, status, joined, last_active AS lastActive, questions_answered AS questionsAnswered, accuracy, readiness'

app.get('/api/students', wrap(async (_req, res) => {
  const [rows] = await pool.query(`SELECT ${STUDENT_COLS} FROM students ORDER BY name`)
  res.json(rows)
}))

app.post('/api/students', wrap(async (req, res) => {
  const s = req.body || {}
  const id = s.id || `stu-${randomUUID().slice(0, 8)}`
  await pool.query(
    `INSERT INTO students (id, name, email, university_id, year, plan, status, joined, last_active, questions_answered, accuracy, readiness)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [id, s.name, s.email, s.universityId, s.year, s.plan, s.status, s.joined || null, s.lastActive || null, s.questionsAnswered || 0, s.accuracy || 0, s.readiness || 0],
  )
  res.json({ id })
}))

app.patch('/api/students/:id', wrap(async (req, res) => {
  const allowed = { name: 'name', email: 'email', universityId: 'university_id', year: 'year', plan: 'plan', status: 'status', lastActive: 'last_active', questionsAnswered: 'questions_answered', accuracy: 'accuracy', readiness: 'readiness' }
  const sets = [], vals = []
  for (const [k, col] of Object.entries(allowed)) if (k in (req.body || {})) { sets.push(`${col} = ?`); vals.push(req.body[k]) }
  if (sets.length) { vals.push(req.params.id); await pool.query(`UPDATE students SET ${sets.join(', ')} WHERE id = ?`, vals) }
  res.json({ ok: true })
}))

app.delete('/api/students/:id', wrap(async (req, res) => {
  await pool.query('DELETE FROM students WHERE id = ?', [req.params.id])
  res.json({ ok: true })
}))

/* ── Mail ────────────────────────────────────────────────────────────────── */

app.get('/api/mailboxes', wrap(async (_req, res) => {
  const [rows] = await pool.query('SELECT address, label, created_at AS createdAt FROM mailboxes ORDER BY created_at')
  res.json(rows)
}))
app.post('/api/mailboxes', wrap(async (req, res) => {
  const { address, label } = req.body || {}
  if (!address) return res.status(400).json({ error: 'address required' })
  await pool.query('INSERT IGNORE INTO mailboxes (address, label) VALUES (?, ?)', [address, label || address])
  res.json({ ok: true })
}))

app.get('/api/mail', wrap(async (req, res) => {
  const { box, dir } = req.query
  const where = [], vals = []
  if (box) { where.push('mailbox = ?'); vals.push(box) }
  if (dir === 'inbox') where.push("direction = 'inbound'")
  if (dir === 'outbox') where.push("direction = 'outbound'")
  const sql = `SELECT id, direction, mailbox, from_addr AS fromAddr, to_addr AS toAddr, subject, status, at,
    (SELECT COUNT(*) FROM attachments a WHERE a.email_id = e.id) AS attachmentCount
    FROM emails e ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY COALESCE(at, created_at) DESC LIMIT 500`
  const [rows] = await pool.query(sql, vals)
  res.json(rows)
}))

app.get('/api/mail/:id', wrap(async (req, res) => {
  const [rows] = await pool.query('SELECT id, direction, mailbox, from_addr AS fromAddr, to_addr AS toAddr, cc, bcc, subject, html, text, status, at FROM emails WHERE id = ?', [req.params.id])
  if (!rows.length) return res.status(404).json({ error: 'not found' })
  const [atts] = await pool.query('SELECT id, filename, content_type AS contentType, size_bytes AS sizeBytes FROM attachments WHERE email_id = ?', [req.params.id])
  res.json({ ...rows[0], attachments: atts })
}))

app.get('/api/mail/attachment/:id', wrap(async (req, res) => {
  const [rows] = await pool.query('SELECT filename, content_type AS contentType, content_b64 AS b64, storage_url AS url FROM attachments WHERE id = ?', [req.params.id])
  if (!rows.length) return res.status(404).json({ error: 'not found' })
  const a = rows[0]
  if (a.url) return res.redirect(a.url)
  res.setHeader('Content-Type', a.contentType || 'application/octet-stream')
  res.setHeader('Content-Disposition', `attachment; filename="${a.filename || 'file'}"`)
  res.send(Buffer.from(a.b64 || '', 'base64'))
}))

// Send + record. attachments: [{ filename, contentType, content_b64 }]
app.post('/api/mail/send', wrap(async (req, res) => {
  const { from, to, cc, bcc, subject, html, text, category, headers = {}, attachments = [] } = req.body || {}
  if (!to || !subject) return res.status(400).json({ error: 'to and subject required' })
  const fromAddr = from || MAIL_FROM
  const id = `mail-${randomUUID().slice(0, 12)}`
  const recipients = Array.isArray(to) ? to : [to]

  // Asked not to receive this? Then it is not sent, and the caller is told so
  // rather than being handed a success it can misread as delivery.
  const allowed = []
  for (const address of recipients) {
    if (await isSuppressed(address, category)) continue
    allowed.push(address)
  }
  if (recipients.length && !allowed.length) {
    return res.json({ id, status: 'Suppressed', resendId: null, suppressed: recipients.length })
  }

  // One-click unsubscribe. Gmail and Outlook surface their own control when these
  // headers are present, which is a far better outcome than the reader reaching
  // for "report spam" — the single strongest negative signal there is.
  const outHeaders = { ...headers }
  if (category && !TRANSACTIONAL_CATEGORIES.has(category) && allowed.length === 1) {
    const token = await unsubscribeTokenFor(allowed[0], category)
    const url = `${PUBLIC_ORIGIN}/unsubscribe?token=${token}`
    outHeaders['List-Unsubscribe'] = `<${url}>, <mailto:${MAIL_FROM}?subject=unsubscribe>`
    outHeaders['List-Unsubscribe-Post'] = 'List-Unsubscribe=One-Click'
  }

  let status = 'Queued', resendId = null
  if (resend) {
    const { data, error } = await resend.emails.send({
      from: fromAddr, to: allowed, cc, bcc, subject, html: html || undefined, text: text || undefined,
      headers: Object.keys(outHeaders).length ? outHeaders : undefined,
      attachments: attachments.map((a) => ({ filename: a.filename, content: a.content_b64 })),
    })
    if (error) return res.status(502).json({ error: error.message })
    status = 'Sent'; resendId = data?.id ?? null
  }
  await pool.query(
    'INSERT INTO emails (id, direction, mailbox, from_addr, to_addr, cc, bcc, subject, html, text, status, resend_id, at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,NOW())',
    [id, 'outbound', fromAddr, fromAddr, allowed.join(', '), cc || null, bcc || null, subject, html || null, text || null, status, resendId],
  )
  for (const a of attachments) {
    await pool.query('INSERT INTO attachments (id, email_id, filename, content_type, size_bytes, content_b64) VALUES (?,?,?,?,?,?)',
      [`att-${randomUUID().slice(0, 12)}`, id, a.filename, a.contentType || 'application/octet-stream', a.size || 0, a.content_b64 || null])
  }
  res.json({ id, status, resendId })
}))

// Verified Resend email.received webhook → retrieve and store the complete
// message. Webhook events contain metadata only, so the Receiving API is used
// for the body and signed attachment downloads.
app.post('/api/webhooks/resend/inbound', wrap(async (req, res) => {
  if (!resendReceiving) return res.status(503).json({ error: 'Resend receiving is not configured' })
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET
  if (!webhookSecret) return res.status(503).json({ error: 'Resend webhook verification is not configured' })

  let event
  try {
    event = resendReceiving.webhooks.verify({
      payload: req.rawBody || JSON.stringify(req.body || {}),
      headers: {
        id: req.header('svix-id') || '',
        timestamp: req.header('svix-timestamp') || '',
        signature: req.header('svix-signature') || '',
      },
      webhookSecret,
    })
  } catch {
    return res.status(401).json({ error: 'invalid webhook signature' })
  }

  if (event.type !== 'email.received') return res.json({ ok: true, ignored: true })
  const p = event.data
  const { data: received, error } = await resendReceiving.emails.receiving.get(p.email_id)
  if (error || !received) throw new Error(error?.message || 'Could not retrieve received email')

  const id = `mail-in-${p.email_id}`
  const to = received.to?.length ? received.to : p.to
  const toAddr = to.join(', ')
  const mailbox = (toAddr.split(',')[0] || '').trim()
  await pool.query(
    `INSERT INTO emails (id, direction, mailbox, from_addr, to_addr, cc, bcc, subject, html, text, status, resend_id, at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
     ON DUPLICATE KEY UPDATE from_addr=VALUES(from_addr), to_addr=VALUES(to_addr), cc=VALUES(cc), bcc=VALUES(bcc),
       subject=VALUES(subject), html=VALUES(html), text=VALUES(text), status=VALUES(status), at=VALUES(at)`,
    [id, 'inbound', mailbox, received.from || p.from || '', toAddr, received.cc?.join(', ') || null,
      received.bcc?.join(', ') || null, received.subject || p.subject || '', received.html || null,
      received.text || null, 'Received', p.email_id, toMariaDbDate(received.created_at || p.created_at)],
  )

  for (const a of received.attachments || []) {
    const { data: attachment, error: attachmentError } = await resendReceiving.emails.receiving.attachments.get({
      emailId: p.email_id,
      id: a.id,
    })
    if (attachmentError || !attachment?.download_url) throw new Error(attachmentError?.message || `Could not retrieve attachment ${a.id}`)
    const download = await fetch(attachment.download_url)
    if (!download.ok) throw new Error(`Could not download attachment ${a.id}: ${download.status}`)
    const b64 = Buffer.from(await download.arrayBuffer()).toString('base64')
    await pool.query(
      `INSERT INTO attachments (id, email_id, filename, content_type, size_bytes, content_b64) VALUES (?,?,?,?,?,?)
       ON DUPLICATE KEY UPDATE filename=VALUES(filename), content_type=VALUES(content_type), size_bytes=VALUES(size_bytes), content_b64=VALUES(content_b64)`,
      [`att-in-${a.id}`, id, a.filename || 'attachment', a.content_type || 'application/octet-stream', a.size || 0, b64],
    )
  }
  res.json({ ok: true })
}))

/* ── Serve the built SPA (single-origin deploy) ──────────────────────────────
 * If a ../public folder exists (the Vite build, copied in by the Dockerfile),
 * serve it and fall back to index.html for client-side routes. When it's absent
 * (API-only deploy), these are no-ops. */
/* ── Study assistant ──────────────────────────────────────────────────────
   The student routes are thin: every decision that costs money or grants
   access is made in `assistant.js`, so there is one place to read to know what
   a student is allowed to spend. The admin routes never return the API key —
   only whether one is set and its last four characters. */

app.get('/api/assistant/status', requireAuthenticated, wrap(async (req, res) => {
  res.json(await assistantStatus(req.identity))
}))

app.post('/api/assistant/chat', requireAuthenticated, wrap(async (req, res) => {
  const result = await assistantChat(req.identity, {
    messages: req.body?.messages,
    lang: req.body?.lang === 'ar' ? 'ar' : 'en',
    context: req.body?.context ?? null,
  })
  if (result.error) return res.status(result.status ?? 400).json(result)
  return res.json(result)
}))

app.get('/api/admin/assistant', requireTab('assistant'), wrap(async (_req, res) => {
  res.json(await assistantAdminSettings())
}))

app.put('/api/admin/assistant', requireTab('assistant'), wrap(async (req, res) => {
  const result = await assistantSaveSettings(req.body ?? {}, req.identity.id)
  if (result.error) return res.status(400).json(result)
  return res.json(result)
}))

app.put('/api/admin/assistant/tiers/:plan', requireTab('assistant'), wrap(async (req, res) => {
  const result = await assistantSaveTierLimit({ ...req.body, plan: req.params.plan })
  if (result.error) return res.status(400).json(result)
  return res.json(result)
}))

app.delete('/api/admin/assistant/tiers/:plan', requireTab('assistant'), wrap(async (req, res) => {
  const result = await assistantDeleteTierLimit(req.params.plan)
  if (result.error) return res.status(400).json(result)
  return res.json(result)
}))

app.get('/api/admin/assistant/usage', requireTab('assistant'), wrap(async (req, res) => {
  res.json(await assistantUsage({ days: req.query.days }))
}))

// Asked of the provider, so the model list is what it will actually accept
// today rather than what was true when this was written.
app.get('/api/admin/assistant/models', requireTab('assistant'), wrap(async (req, res) => {
  const result = await assistantModels(req.query.provider)
  if (result.error) return res.status(result.status ?? 502).json(result)
  return res.json(result)
}))

/** Locales built as their own entry document — one per extra `input` in
 *  `vite.config.ts`. Adding one there means adding it here. */
const LOCALE_ENTRY_PATHS = ['en', 'ar']

const PUBLIC_DIR = process.env.PUBLIC_DIR || join(__dirname, '..', 'public')
if (existsSync(join(PUBLIC_DIR, 'index.html'))) {
  /* The localized entry documents, matched before anything else touches them.
   *
   * `/en` and `/ar` are real HTML files, built as separate Vite inputs, because
   * a link crawler runs no JavaScript: WhatsApp, iMessage, Slack and Google see
   * only what is in the document they are served. Their Open Graph card, their
   * `lang`/`dir`, and their canonical URL therefore have to be in the file, and
   * cannot be set by the SPA after it mounts.
   *
   * They must be matched here, above the static middleware, because that
   * middleware would otherwise see `public/ar` as a directory and 301 `/ar` to
   * `/ar/` — and then, with directory indexes off, decline to serve it and drop
   * it into the catch-all below, which sends the English root document. That is
   * what shipped: every crawler asking for the Arabic page was handed the
   * English one, with the wrong card and a canonical pointing at `/`.
   *
   * Never cached, exactly like the root document: these are the files a deploy
   * needs to be able to change.
   *
   * (`nginx.conf` used to carry this as `location = /en` blocks. It was never
   * copied into the image by the Dockerfile — the production container is this
   * server, not nginx — so it never ran. It has been deleted rather than left
   * to describe routing that does not happen.)
   */
  for (const locale of LOCALE_ENTRY_PATHS) {
    const document = join(PUBLIC_DIR, locale, 'index.html')
    if (!existsSync(document)) continue
    app.get([`/${locale}`, `/${locale}/`], (_req, res) => {
      res.setHeader('Cache-Control', 'no-cache')
      res.sendFile(document)
    })
  }

  app.use('/assets', express.static(join(PUBLIC_DIR, 'assets'), { index: false, maxAge: '1y', immutable: true }))
  app.use(express.static(PUBLIC_DIR, {
    index: false,
    maxAge: '1h',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache')
    },
  }))
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next()
    res.sendFile(join(PUBLIC_DIR, 'index.html'))
  })
  console.log('Serving SPA from', PUBLIC_DIR)
}

const port = Number(process.env.PORT) || 8080
migrate()
  .then(async () => {
    app.listen(port, () => {
      console.log(`Connect Cortex on :${port}`)
      void medicalResourceRecords()
        .then((resources) => console.log(`Medical resource index ready (${resources.length} records)`))
        .catch((error) => console.error('Medical resource index warm-up failed:', error.message))
    })
    // Recovery-point creation must never prevent the HTTP server from coming
    // online. A backup failure is reported for operators but is non-fatal.
    try {
      const [recent] = await pool.query(
        "SELECT id FROM data_snapshots WHERE created_at >= NOW() - INTERVAL 24 HOUR AND created_by = 'system:daily' LIMIT 1",
      )
      if (!recent.length) await createDataSnapshot(`Daily recovery point ${new Date().toISOString()}`, 'system:daily')
    } catch (error) {
      console.error('Daily recovery snapshot skipped:', error.message)
    }
  })
  .catch((e) => { console.error('startup failed (DB unreachable?):', e.message); process.exit(1) })
