import { randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { basename, dirname, join, resolve, sep } from 'node:path'
import { existsSync } from 'node:fs'
import { mkdir, open, readFile, rename, rm, stat, unlink } from 'node:fs/promises'
import express from 'express'
import compression from 'compression'
import cors from 'cors'
import { Resend } from 'resend'
import { pool, migrate } from './db.js'
import { fromForCategory, unsubscribeMailtoAddress, replyToForCategory } from './mailFrom.js'
import {
  REDACTED_STATE_KEYS,
  archiveScopeBlockedPublishedItems,
  newlyArchiveScopeBlockedPublishedItems,
  newlyMediaBlockedPublishedItems,
  redactLedgerForStudent,
  releasedMediaIdsFromDocument,
} from './studentLedger.js'
import {
  createShare, deleteShare, listDiscoverableShares, listShareNotifications, listShares,
  markShareNotificationsRead, readShare, readShareAsset, setShareFollow, setShareStar,
  shareRevisionHistory, updateShare,
} from './shares.js'
import { apiAuthGate, heldTabs, identityFromCookieHeader, identityFromToken, invalidateRoleTabs, mfaSatisfied, requireAuthenticated, requireConsole, requireSuperAdmin, requireTab } from './auth.js'
import { router as authRouter } from './authRoutes.js'
import { getUser as goTrueGetUser, hasVerifiedTotp } from './goTrue.js'
import { sweepIdle } from './sessionStore.js'
import { authenticationOptions, listPasskeys, registrationOptions, removePasskey, verifyAuthenticationRequest, verifyRegistration } from './webauthn.js'
import { gradeEssay } from './essayGrade.js'
import { hasConsoleAccess } from './roles.js'
import { ROLE_TABS_STATE_KEY, holdsTab, tabsForStateKey } from './tabs.js'
import { mediaMeta } from './mediaMeta.js'
import { MEDIA_STATE_KEY, deleteRefusal, isMediaReleased, storageKeyFor } from './mediaLibrary.js'
import { createMediaPlaybackToken, readMediaPlaybackToken } from './mediaPlayback.js'
import { authoriseChanges, diffDocument, mergeDocument, isMergeable, reconstructChanges, applyDelta } from './stateMerge.js'
import { canonicalStateKey } from './stateKeys.js'
import { collectMediaRequests } from './mediaRequestPolicy.js'
import { describeProviders } from './mediaProvider.js'
import {
  CONTENT_REPORTS_STATE_KEY, CONTENT_REPORT_TOMBSTONES_KEY,
  buildContentReport, buildTombstone, deletionConfirmed, reporterRoleLabel,
} from './contentReports.js'
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
  setUserPassword,
  saveOwnEnrolment,
  setAccessStatus,
  setContentScope,
  setDiscoverable,
  setRole,
} from './accounts.js'
import { rateLimited, clientIp } from './rateLimit.js'
import { securityHeaders } from './securityHeaders.js'
import { ApiError } from './apiError.js'
import { effectivePlan, limitFor, readStorageLimits } from './storage.js'
import { redeemVoucher, releaseVoucher, myVoucher } from './vouchers.js'
import { createPromotion, createPricingVoucher, listPricingDiscounts, pricingQuote } from './pricing.js'
import { SUBSCRIBER_DISPLAY_STATE_KEY, computeSubscriberCount, nextSubscriberDisplayDoc, publicSubscriberCountPayload, readSubscriberDisplay, writeSubscriberDisplay } from './subscriberCount.js'
import {
  createEnrollmentChangeRequest, decideEnrollmentChangeRequest,
  listEnrollmentChangeRequests, myEnrollmentChangeRequests,
  applyDirectEnrollmentChange,
} from './enrollmentChanges.js'
import { leaderboardFor, recordVerifiedAttempts } from './qbankAttempts.js'
import { qotdToday, recordQotdAnswer, qotdLeaderboard, qotdFriends } from './qotd.js'
import { startQotdReminderScheduler } from './qotdReminders.js'
import { setMailer } from './qotdReminderEmail.js'
import { answerDistributionFor } from './answerDistribution.js'
import { maristanaOverview, recordStudyHeartbeat, renameHospital } from './maristanas.js'
import { activityTrackingSummary } from './studyTrackingAdmin.js'
import { acknowledgeStorageThreshold, activeSubscriptionCount, platformReport } from './platformReports.js'
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
import { sendSilentNudge } from './push.js'
import { deleteAccount } from './accountDeletion.js'
import { clearAvatar, setAvatarFromUpload, setAvatarFromUrl } from './avatar.js'
import {
  createRoom, joinRoom, roomFor, startRoom, submitAnswer, finishRoom, myRooms,
} from './studyRooms.js'
import {
  createParty, joinByCode, setVisibility, myParties, openParties, partyFor, leaveParty,
  createSession, sessionsFor, sessionFor, answerItem, closeSession,
  ensureSeated, partyMembers, recordActivity, resolvePartyId, roomSnapshot, setSeat,
} from './parties.js'
import { attachRoomsRealtime, notifyRoomPresence } from './roomsRealtime.js'
import { loadSfu } from './roomsSfu.js'
import {
  actOnPartyGame, createPartyGame, partyGameFor, partyGamesFor, streamPartyGameEvents,
} from './partyGames.js'
import {
  createChallenge, respondToChallenge, submitChallengeAnswer, finishChallenge, challengeFor, myChallenges,
} from './challenges.js'
import { invalidatePublishedQuestions } from './publishedQuestions.js'
import { invalidateStudentContent, registerContentRoutes } from './studentContent.js'
import { sendRequest, respondToRequest, removeFriend, myFriends, myRequests, directorySearch } from './friends.js'
import { mintInvite, redeemInvite } from './friendInvites.js'
import {
  linkAccount as linkFacebookAccount, unlinkAccount as unlinkFacebookAccount,
  deletionCallback as facebookDeletionCallback, parseSignedRequest as parseFacebookSignedRequest,
  matchFacebookFriends,
} from './facebook.js'
import { toMariaDbDate } from './datetime.js'
import { withContentCatalogueGate } from './contentCatalogueGate.js'
import { affectedSessionIds, affectedSessionSetsMatch } from './contentArchiveActivity.js'
import { assembleChunks, receiveChunk, receiveStream, resolveUploadWorkspace, resolveWithin } from './uploads.js'
import {
  CONTENT_ARCHIVE_TTL_MINUTES,
  CONTENT_ARCHIVE_SELECTION,
  activeArchiveBlockers,
  archiveActivityAllowed,
  applyContentArchive,
  archiveConfirmation,
  contentArchiveManifest,
  contentDigest,
} from './contentArchive.js'
import {
  ACADEMIC_STATE_KEYS,
  academicPreview,
  parseAcademicDocuments,
  studentUniversityProjection,
} from './academic.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const LAUNCH_DATA_PATH = join(__dirname, '..', 'data', 'medical-library-v1.json')
const RESOURCE_STORAGE_DIR = resolve(process.env.RESOURCE_STORAGE_DIR || '/data/medical-library')
const RESOURCE_MAX_BYTES = Number(process.env.RESOURCE_MAX_BYTES) || 250 * 1024 * 1024
/** Managed teaching media shares the resource volume. Small legacy uploads keep
 * a single-request ceiling; the normal path uses bounded chunks up to 2 GB. */
const MEDIA_STORAGE_DIR = RESOURCE_STORAGE_DIR
const MEDIA_MAX_BYTES = Number(process.env.MEDIA_MAX_BYTES) || 100 * 1024 * 1024
// Per-type ceilings, enforced after the bytes are sniffed so the limit follows
// what the file actually is, not what it was named: images 100 MB, audio 500 MB,
// video 5 GB.
const MEDIA_IMAGE_MAX_BYTES = Number(process.env.MEDIA_IMAGE_MAX_BYTES) || 100 * 1024 * 1024
const MEDIA_AUDIO_MAX_BYTES = Number(process.env.MEDIA_AUDIO_MAX_BYTES) || 500 * 1024 * 1024
const MEDIA_VIDEO_MAX_BYTES = Number(process.env.MEDIA_VIDEO_MAX_BYTES) || 5 * 1024 * 1024 * 1024
const MEDIA_TYPE_MAX_BYTES = { image: MEDIA_IMAGE_MAX_BYTES, audio: MEDIA_AUDIO_MAX_BYTES, video: MEDIA_VIDEO_MAX_BYTES }
const MEDIA_CHUNK_MAX_BYTES = Number(process.env.MEDIA_CHUNK_MAX_BYTES) || 8 * 1024 * 1024
// The session ceiling is the largest any single type allows (video), so a large
// video can begin; the per-type cap above is what actually bounds it once known.
const MEDIA_CHUNKED_MAX_BYTES = Number(process.env.MEDIA_CHUNKED_MAX_BYTES) || MEDIA_VIDEO_MAX_BYTES
const MEDIA_UPLOAD_MAX_AGE_HOURS = Math.max(1, Number(process.env.MEDIA_UPLOAD_MAX_AGE_HOURS) || 24)
const RESOURCE_CHUNK_MAX_BYTES = Number(process.env.RESOURCE_CHUNK_MAX_BYTES) || 64 * 1024 * 1024
const RESOURCE_CHUNKED_MAX_BYTES = Number(process.env.RESOURCE_CHUNKED_MAX_BYTES) || 2 * 1024 * 1024 * 1024
const CONTENT_LEDGER_STATE_KEY = 'nishany-admin-content-ledger-v4'
const ACADEMIC_CATALOGUE_STATE_KEY = 'nishany-academic-universities-v1'
const MEDICAL_EVIDENCE_STATE_KEY = 'nishany-medical-evidence-v1'
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
  invalidateStudentContent(key)
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

/** Student activity that contains one of the questions this archive withdraws. */
async function contentVisibilityResetSnapshot(db = pool, targetQuestionIds = null) {
  const [[roomRows], [challengeRows], [partyRows]] = await Promise.all([
    db.query("SELECT id, question_ids AS questionIds FROM study_rooms WHERE status IN ('lobby','running')"),
    db.query("SELECT id, question_ids AS questionIds FROM challenges WHERE status IN ('sent','running')"),
    db.query("SELECT id, item_refs AS itemRefs FROM study_party_sessions WHERE status IN ('open','scheduled')"),
  ])
  const sessionIds = {
    studyRooms: affectedSessionIds(roomRows, 'questionIds', targetQuestionIds),
    challenges: affectedSessionIds(challengeRows, 'questionIds', targetQuestionIds),
    partyQuestionSessions: affectedSessionIds(partyRows, 'itemRefs', targetQuestionIds, { party: true }),
  }
  return {
    active: Object.fromEntries(Object.entries(sessionIds).map(([kind, ids]) => [kind, ids.length])),
    sessionIds,
  }
}

async function contentVisibilityResetActivity(db = pool, targetQuestionIds = null) {
  return (await contentVisibilityResetSnapshot(db, targetQuestionIds)).active
}

/**
 * The file facts used by both authenticated fetches and signed playback URLs.
 * New uploads are authoritative rows, which makes them readable immediately on
 * completion. The JSON lookup is a backward-compatible bridge for assets
 * uploaded before managed_media existed.
 */
async function managedMediaFile(id) {
  const [rows] = await pool.query(
    `SELECT id, storage_key AS storageKey, sha256, media_type AS mediaType,
       mime_type AS mimeType, size_bytes AS sizeBytes, width, height
     FROM managed_media WHERE id = ? AND status = 'ready'`,
    [id],
  )
  if (rows[0]) return rows[0]
  return (await mediaRecords()).find((entry) => entry.id === id) ?? null
}

function sendManagedMedia(res, record, { signed = false } = {}) {
  const fullPath = resolveWithin(MEDIA_STORAGE_DIR, record?.storageKey || '')
  if (!fullPath || !existsSync(fullPath)) return false
  res.setHeader('Content-Type', record.mimeType || 'application/octet-stream')
  res.setHeader('Cache-Control', signed ? 'private, no-store' : 'private, max-age=3600')
  if (!signed) res.setHeader('Vary', 'Authorization')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Accept-Ranges', 'bytes')
  res.sendFile(fullPath)
  return true
}

/** Console staff may inspect drafts; students receive only released assets. */
async function mayReadManagedMedia(identity, id) {
  if (hasConsoleAccess(identity?.role)) return true
  const record = (await mediaRecords()).find((entry) => entry.id === id)
  return Boolean(record && isMediaReleased(record))
}
const app = express()
// One proxy in front (Coolify). Without this every rate limit is charged to the
// proxy's address, which means one abusive client locks out everybody.
app.set('trust proxy', 1)
// __dirname is defined above (see LAUNCH_DATA_PATH). A separate constant from
// the static-file PUBLIC_DIR below: this one only needs to exist early enough
// to hash the built index.html's inline theme script for CSP, before the SPA
// is ever wired up.
const SECURITY_HEADERS_PUBLIC_DIR = process.env.PUBLIC_DIR || join(__dirname, '..', 'public')
app.use(securityHeaders({ publicDir: SECURITY_HEADERS_PUBLIC_DIR }))
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
// Never `true` (reflects any Origin back) — an explicit allowlist, env-overridable
// for staging. `credentials` stays unset: the API is bearer/cookie-gated by
// apiAuthGate, not by browser-sent cookies read cross-origin.
const CORS_ORIGIN = process.env.CORS_ORIGIN?.split(',') ?? ['https://nishany.com', 'https://connectadminacademy.nishany.com']
app.use(cors({ origin: CORS_ORIGIN }))
// The student site moved to nishany.com. Old links, bookmarks, and search
// results still name synapse.doitrous.com, so its page requests are redirected
// permanently. /api is exempt on purpose: the installed iOS and Android builds
// have the old host compiled in as their API base and must keep working
// without an app update — and only GETs move, so nothing mid-POST is dropped.
// The Host header is read directly rather than via req.hostname because
// `req.hostname` also strips the port, which this comparison does not need —
// `trust proxy` above is what makes it trustworthy behind Coolify.
const LEGACY_STUDENT_HOSTS = new Set(['synapse.doitrous.com', 'www.synapse.doitrous.com', 'www.nishany.com'])
app.use((req, res, next) => {
  const host = String(req.headers.host || '').toLowerCase().split(':')[0]
  if (!LEGACY_STUDENT_HOSTS.has(host) || req.method !== 'GET' || req.path.startsWith('/api')) return next()
  res.redirect(301, `https://nishany.com${req.originalUrl}`)
})
app.use(apiAuthGate)
/**
 * A few routes save a whole shared document rather than one field. The
 * question ledger alone is ~23 MB and growing, so 25 MB was one import away
 * from rejecting every save with 413. `limit` is checked against the
 * DECOMPRESSED body, so it must exceed the raw document size even though
 * clients now gzip it on the wire (body-parser inflates gzip automatically).
 * 64 MB is headroom. Mounted only on these paths, and BEFORE the 1 MB default
 * below: body-parser marks a request's body as already parsed once one of
 * these has run, so the smaller parser after it just passes through instead
 * of re-enforcing 1 MB — mounting them in the other order would make this
 * limit dead code.
 */
const LARGE_JSON_BODY = express.json({ limit: '64mb' })
for (const path of ['/api/state/:key', '/api/user-state/:key', '/api/admin/academic/preview', '/api/admin/academic/publish']) {
  app.use(path, LARGE_JSON_BODY)
}
// Everything else defaults to a small body. `apiAuthGate` above never reads
// `req.body` (headers and path/method only), so parsing after it is safe and
// means an unauthenticated caller can't run a 1 MB parse before being refused.
app.use(express.json({
  limit: '1mb',
  verify: (req, _res, buffer) => {
    if (req.originalUrl === '/api/webhooks/resend/inbound') req.rawBody = buffer.toString('utf8')
  },
}))

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const resendReceivingKey = process.env.RESEND_ADMIN_API_KEY || process.env.RESEND_API_KEY
const resendReceiving = resendReceivingKey ? new Resend(resendReceivingKey) : null
// Where unsubscribe links point. The student origin, not the admin one — the
// reader of a campaign is a student, and the link has to work signed out.
const PUBLIC_ORIGIN = (process.env.PUBLIC_ORIGIN || 'https://nishany.com').replace(/\/$/, '')

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

/** Logged server-side only — a stack trace is not something to hand a caller. */
function logServerError(route, error) {
  console.error(`[error] ${route}`, error?.stack || error)
}

const wrap = (fn) => (req, res) => Promise.resolve(fn(req, res)).catch((error) => {
  if (error instanceof ApiError) return res.status(error.status).json({ error: error.code, message: error.publicMessage })
  logServerError(req.originalUrl, error)
  res.status(500).json({ error: 'internal' })
})

/** Per-signed-in-caller rate-limit key. These routes all sit behind requireAuthenticated. */
const byUser = (req) => req.identity?.id || clientIp(req)

app.get('/api/health', (_req, res) => res.json({ ok: true }))

/*
 * The voice deployment, as a browser would see it — minus anything secret.
 *
 * Public on purpose: it is the only way to check from outside the host that
 * the media server announces a reachable address and that the host forwards
 * its ports, and the candidates it returns are useless without the ICE
 * credentials, which stay on the transport. See `roomsSfu.probe`.
 */
app.get('/api/rooms/voice', async (_req, res) => {
  const sfu = await loadSfu()
  if (!sfu.available) return res.json({ available: false, reason: sfu.reason })
  try {
    res.json({ available: true, config: sfu.describe(), ...(await sfu.probe()) })
  } catch (error) {
    res.status(500).json({ available: true, config: sfu.describe(), error: error?.message ?? 'probe failed' })
  }
})

/**
 * Whether an email or a phone is already registered.
 *
 * Sign-up asks before creating anything, so a person who already has an account
 * is sent to sign in rather than being handed an error after Supabase has made
 * an auth user with no roster row behind it. It answers only taken or not, and
 * it is rate limited because it is the one route here that has to work before
 * anybody is authenticated.
 */
app.post('/api/accounts/exists', rateLimited('accounts_exists', clientIp, 20, 60_000), wrap(async (req, res) => {
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
 * Sign-in and everything around it — see authRoutes.js.
 *
 * This replaced the cross-origin handoff apparatus. Both portal hostnames are
 * served by this app and share one cookie at `.nishany.com`, so there is no
 * longer a session on one origin that the other cannot see, and nothing to hand
 * across in a URL.
 */
app.use('/api/auth', authRouter)

// Passkeys (WebAuthn) — register/list/remove require a session; authenticate is
// pre-login (public, allowlisted in auth.js) and mints a Supabase session on success.
app.post('/api/auth/passkey/register/options', requireAuthenticated, wrap(async (req, res) => res.json(await registrationOptions(req.identity.id, req.identity.email))))
app.post('/api/auth/passkey/register/verify', requireAuthenticated, wrap(async (req, res) => { const r = await verifyRegistration(req.identity.id, req.body ?? {}); if (r.error) return res.status(400).json(r); res.json(r) }))
app.get('/api/auth/passkey/credentials', requireAuthenticated, wrap(async (req, res) => res.json({ credentials: await listPasskeys(req.identity.id) })))
app.delete('/api/auth/passkey/credentials/:id', requireAuthenticated, wrap(async (req, res) => { const r = await removePasskey(req.identity.id, req.params.id); if (r.error) return res.status(404).json(r); res.json({ ok: true }) }))
app.post('/api/auth/passkey/authenticate/options', wrap(async (req, res) => res.json(await authenticationOptions(req.body?.email))))
app.post('/api/auth/passkey/authenticate/verify', wrap(verifyAuthenticationRequest))

// AI essay grading — advisory, display-only; charges the assistant AI quota.
app.post('/api/essay/grade', requireAuthenticated, rateLimited('essay_grade', byUser, 30, 15 * 60_000), wrap(async (req, res) => {
  const result = await gradeEssay(req.identity, req.body ?? {})
  if (result.error) return res.status(result.status ?? 400).json(result)
  return res.json(result)
}))

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
  /**
   * Two facts that only Supabase holds: whether the address is confirmed, and
   * whether a second factor is enrolled. Asking costs a round trip, so it is
   * asked only when the answer can still change — during the first hour of a
   * session, while somebody is waiting on a confirmation email — or when the
   * caller says it needs the current answer (`?fresh=1`, which the verify-email
   * page polls with). Otherwise `emailVerified` is null, meaning "not asked".
   */
  const session = req.sessionRow ?? null
  const wantsFresh = req.query.fresh === '1'
  const account = session && (wantsFresh || Date.now() - new Date(session.createdAt).getTime() < 3_600_000)
    ? (await goTrueGetUser(session.accessToken)).data
    : null
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
      emailVerified: account ? Boolean(account.email_confirmed_at || account.confirmed_at) : null,
      // Enrolled but not yet presented on this session. Without a fresh user
      // record the best available answer is the account's own flag.
      mfaPending: req.identity.aal !== 'aal2'
        && (account ? hasVerifiedTotp(account) : Boolean(req.identity.mfaRequired)),
    },
    profile: user
      ? {
          studentId: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          nationality: user.nationality,
          // True once phone and enrolment are both on record. False for a
          // social sign-up until CompleteProfile.tsx runs — Google/Facebook
          // hand back a name and an email and nothing else.
          profileComplete: user.profileComplete,
          universityId: user.universityId,
          year: user.year,
          yearId: user.yearId,
          group: user.group,
          status: user.status,
          username: user.username,
          profileIcon: user.profileIcon,
          avatarMediaId: user.avatarMediaId,
          discoverable: user.discoverable,
          socialProvider: user.socialProvider,
        }
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
  if (result.error) {
    const status = result.error === 'no_identity' ? 404 : (result.error === 'enrollment_locked' || result.error === 'username_taken' ? 409 : 400)
    return res.status(status).json(result)
  }
  res.json({ ok: true, profile: result.profile, phoneConflict: result.phoneConflict })
}))

/**
 * Profile photo: upload, import from a social sign-up's provider photo, or
 * clear back to the glyph. Business logic (validation, storage, SSRF guards
 * on the import) lives in avatar.js; these three routes are the thin HTTP
 * shell around it, same split as saveOwnEnrolment above.
 */
app.post('/api/me/avatar', requireAuthenticated, wrap(async (req, res) => {
  const result = await setAvatarFromUpload(req.identity.id, req.body?.image)
  if (result.error) return res.status(result.error === 'no_identity' ? 404 : 400).json(result)
  res.json({ ok: true, avatarMediaId: result.avatarMediaId })
}))

app.post('/api/me/avatar/import', requireAuthenticated, wrap(async (req, res) => {
  const result = await setAvatarFromUrl(req.identity.id, req.body?.url)
  if (result.error) return res.status(result.error === 'no_identity' ? 404 : 400).json(result)
  res.json({ ok: true, avatarMediaId: result.avatarMediaId })
}))

app.delete('/api/me/avatar', requireAuthenticated, wrap(async (req, res) => {
  const result = await clearAvatar(req.identity.id)
  if (result.error) return res.status(404).json(result)
  res.json({ ok: true })
}))

/**
 * Serve a stored avatar. Authenticated but otherwise unrestricted — unlike
 * `/api/media/:id`, which gates on the teaching-content release rules in
 * `mayReadManagedMedia`, a profile photo is not curated content and any
 * signed-in user may see any other's (the same exposure a leaderboard row
 * already has via a display name).
 */
app.get('/api/me/avatar/:id', requireAuthenticated, wrap(async (req, res) => {
  const record = await managedMediaFile(req.params.id)
  if (!record || record.mediaType !== 'image') return res.status(404).json({ error: 'avatar not found' })
  if (!sendManagedMedia(res, record)) return res.status(404).json({ error: 'avatar not found' })
}))

app.post('/api/me/enrollment-change-requests', requireAuthenticated, wrap(async (req, res) => {
  const result = await createEnrollmentChangeRequest(req.identity.id, req.body ?? {})
  if (result.error) {
    const status = result.error === 'pending_exists' || result.error === 'unchanged' ? 409 : 400
    return res.status(status).json(result)
  }
  res.json(result)
}))

app.get('/api/me/enrollment-change-requests', requireAuthenticated, wrap(async (req, res) => {
  res.json({ requests: await myEnrollmentChangeRequests(req.identity.id) })
}))

app.get('/api/me/university', requireAuthenticated, wrap(async (req, res) => {
  const [profileRows] = await pool.query(
    `SELECT id, university_id AS universityId, year, year_id AS yearId, study_group AS studyGroup
       FROM students WHERE user_id = ? LIMIT 1`,
    [req.identity.id],
  )
  const [stateRows] = await pool.query(
    `SELECT k, v FROM app_state WHERE k IN (${ACADEMIC_STATE_KEYS.map(() => '?').join(',')})`,
    ACADEMIC_STATE_KEYS,
  )
  const rawDocuments = Object.fromEntries(stateRows.map((row) => [row.k, row.v]))
  const projection = studentUniversityProjection(profileRows[0] ?? null, parseAcademicDocuments(rawDocuments))
  res.json(projection)
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
 * The column defaults to private. A student must deliberately opt in before
 * they can appear in, or browse, their cohort directory. The actor is always
 * the verified session;
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
const STORAGE_LIMITS_KEY = 'nishany-storage-limits-v1'

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
       mime_type AS mimeType, size_bytes AS sizeBytes, sha256, page_count AS pageCount,
       source_kind AS sourceKind, source_id AS sourceId, created_at AS createdAt
     FROM user_documents WHERE id = ? AND user_id = ? AND deleted_at IS NULL`,
    [id, userId],
  )
  return rows[0] || null
}

app.get('/api/my-documents', requireAuthenticated, wrap(async (req, res) => {
  const [rows] = await pool.query(
    `SELECT id, title, media_type AS mediaType, file_name AS fileName, mime_type AS mimeType,
       size_bytes AS sizeBytes, page_count AS pageCount, source_kind AS sourceKind,
       source_id AS sourceId, created_at AS createdAt
     FROM user_documents WHERE user_id = ? AND deleted_at IS NULL ORDER BY created_at DESC`,
    [req.identity.id],
  )
  const allowance = await documentAllowance(req.identity.id)
  res.json({ items: rows, usedBytes: allowance.usedBytes, quotaBytes: allowance.quotaBytes, plan: allowance.plan })
}))

app.post('/api/my-documents', requireAuthenticated, rateLimited('my_documents_upload_start', byUser, 20, 60 * 60_000), wrap(async (req, res) => {
  const id = randomUUID()
  const upload = describeUpload(req.body)
  // Generated here, never accepted: a path is not something a client gets to say.
  const storageKey = join('my-documents', req.identity.id.replace(/[^a-zA-Z0-9_-]/g, '_'), `${id}.${upload.extension}`)
  const sourceKind = ['notebook', 'whiteboard'].includes(req.body?.sourceKind) ? req.body.sourceKind : 'resource'
  const sourceId = String(req.body?.sourceId ?? '').trim().replace(/[\r\n\t]/g, ' ').slice(0, 64) || null
  await pool.query(
    `INSERT INTO user_documents
       (id, user_id, title, storage_key, media_type, file_name, mime_type, source_kind, source_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, req.identity.id, documentTitle(req.body?.title), storageKey, upload.kind, upload.fileName, upload.mimeType, sourceKind, sourceId],
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
  const safeImageMime = /^(?:image\/(?:avif|gif|jpeg|png|webp))$/i.test(document.mimeType ?? '') ? document.mimeType : null
  const name = basename(document.fileName || `${document.title}.${isPdf ? 'pdf' : 'bin'}`).replace(/["\r\n]/g, '')
  res.setHeader('Content-Type', isPdf ? 'application/pdf' : safeImageMime ?? 'application/octet-stream')
  // Reviewed raster types and PDFs can render inline. Everything else remains
  // a download, whatever MIME type the uploader supplied.
  res.setHeader('Content-Disposition', `${isPdf || safeImageMime ? 'inline' : 'attachment'}; filename="${name}"`)
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
 * "on the open web". Every share route requires a session, and direct reads
 * remain restricted to the owner's university and year.
 */
app.post('/api/shares', requireAuthenticated, wrap(async (req, res) => {
  const result = await createShare(req.identity.id, req.body ?? {})
  if (result.error) return res.status(400).json({ error: result.error })
  res.json(result)
}))

app.get('/api/shares', requireAuthenticated, wrap(async (req, res) => {
  res.json(await listDiscoverableShares(req.identity.id, { kind: req.query.kind }))
}))

app.get('/api/shares/mine', requireAuthenticated, wrap(async (req, res) => {
  res.json(await listShares(req.identity.id, { kind: req.query.kind }))
}))

app.get('/api/shares/:id', requireAuthenticated, wrap(async (req, res) => {
  const result = await readShare(req.params.id, req.identity?.id ?? null)
  if (result.error) return res.status(404).json({ error: result.error })
  res.json(result.share)
}))

app.get('/api/shares/:id/assets/:documentId', requireAuthenticated, wrap(async (req, res) => {
  const result = await readShareAsset(req.params.id, req.params.documentId, req.identity.id)
  if (result.error) return res.status(404).json({ error: 'asset not found' })
  const fullPath = resolveWithin(RESOURCE_STORAGE_DIR, result.document.storageKey)
  if (!fullPath || !existsSync(fullPath)) return res.status(404).json({ error: 'asset not found' })
  const safeMime = /^(?:image\/(?:avif|gif|jpeg|png|webp)|application\/pdf)$/i.test(result.document.mimeType ?? '')
    ? result.document.mimeType
    : 'application/octet-stream'
  res.setHeader('Content-Type', safeMime)
  res.setHeader('Content-Disposition', `inline; filename="${basename(result.document.fileName || result.document.title).replace(/["\r\n]/g, '')}"`)
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.sendFile(fullPath)
}))

app.put('/api/shares/:id', requireAuthenticated, wrap(async (req, res) => {
  const result = await updateShare(req.params.id, req.identity.id, req.body ?? {})
  if (result.error === 'not_found') return res.status(404).json({ error: result.error })
  if (result.error === 'stale_revision') return res.status(409).json({ error: result.error, currentRevision: result.currentRevision })
  if (result.error) return res.status(400).json({ error: result.error })
  res.json(result.share)
}))

app.put('/api/shares/:id/star', requireAuthenticated, wrap(async (req, res) => {
  const result = await setShareStar(req.params.id, req.identity.id, Boolean(req.body?.starred))
  if (result.error) return res.status(result.error === 'not_found' ? 404 : 400).json({ error: result.error })
  res.json(result.share)
}))

app.put('/api/shares/:id/follow', requireAuthenticated, wrap(async (req, res) => {
  const result = await setShareFollow(req.params.id, req.identity.id, Boolean(req.body?.following))
  if (result.error) return res.status(result.error === 'not_found' ? 404 : 400).json({ error: result.error })
  res.json(result.share)
}))

app.get('/api/shares/:id/revisions', requireAuthenticated, wrap(async (req, res) => {
  const result = await shareRevisionHistory(req.params.id, req.identity.id)
  if (result.error) return res.status(404).json({ error: result.error })
  res.json(result.revisions)
}))

app.delete('/api/shares/:id', requireAuthenticated, wrap(async (req, res) => {
  const result = await deleteShare(req.params.id, req.identity.id)
  if (result.error) return res.status(404).json({ error: result.error })
  res.json({ ok: true })
}))

app.get('/api/notifications/shared', requireAuthenticated, wrap(async (req, res) => {
  res.json(await listShareNotifications(req.identity.id, { limit: req.query.limit }))
}))

app.post('/api/notifications/shared/read', requireAuthenticated, wrap(async (req, res) => {
  res.json(await markShareNotificationsRead(req.identity.id, req.body?.ids))
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

/* ── Pricing and verified QBank records ─────────────────────────────────── */

app.get('/api/pricing/quote', wrap(async (req, res) => {
  const result = await pricingQuote({ period: req.query?.period, voucherCode: req.query?.voucher })
  if (result.error) return res.status(400).json(result)
  res.json(result)
}))

/**
 * The marketing subscriber count. No auth guard — it is read by anonymous
 * landing-page visitors, the same way `/api/pricing/quote` is. Hidden
 * entirely (`{ enabled: false }`) until a superadmin turns it on.
 */
app.get('/api/public/subscriber-count', wrap(async (req, res) => {
  const doc = await readSubscriberDisplay()
  if (!doc.enabled) return res.json({ enabled: false })
  const realCountNow = await activeSubscriptionCount()
  res.json(publicSubscriberCountPayload(doc, { realCountNow, now: Date.now() }))
}))

/**
 * Superadmin-only. `requireSuperAdmin`, not `requireConsole` — the generic
 * `PUT /api/state/:key` must never write this key, because a base change
 * has to re-capture the real subscription count in the same request as the
 * write, and the generic route has no way to express that.
 */
app.post('/api/admin/subscriber-count', requireSuperAdmin, wrap(async (req, res) => {
  const current = await readSubscriberDisplay()
  const realCountNow = await activeSubscriptionCount()
  const result = nextSubscriberDisplayDoc(current, req.body ?? {}, { realCountNow, now: Date.now() })
  if (!result.ok) return res.status(400).json({ error: result.error })
  await writeSubscriberDisplay(result.doc, req.identity.id)
  const preview = computeSubscriberCount(result.doc, { realCountNow, now: Date.now() })
  res.json({ ok: true, doc: result.doc, preview })
}))

app.post('/api/qbank/attempts', requireAuthenticated, wrap(async (req, res) => {
  const result = await recordVerifiedAttempts(req.identity.id, req.body ?? {})
  if (result.error) return res.status(result.error === 'profile_incomplete' ? 409 : 400).json(result)
  res.json(result)
}))

app.post('/api/qbank/answer-distribution', requireAuthenticated, wrap(async (req, res) => {
  const result = await answerDistributionFor(req.identity.id, req.body?.questionIds ?? [])
  if (result.error) return res.status(result.error === 'profile_incomplete' ? 409 : 400).json(result)
  res.json(result)
}))

app.get('/api/leaderboards', requireAuthenticated, wrap(async (req, res) => {
  const result = await leaderboardFor(req.identity.id, {
    metric: req.query?.metric === 'mastery' ? 'mastery' : 'accuracy',
    term: req.query?.term ? String(req.query.term) : 'current',
    limit: Math.min(Number(req.query?.limit) || 50, 100),
  })
  if (result.error) return res.status(409).json(result)
  res.json(result)
}))

/* ── Question of the Day ────────────────────────────────────────────────── */

app.get('/api/qotd/today', requireAuthenticated, wrap(async (req, res) => {
  const result = await qotdToday(req.identity.id)
  if (result.error) return res.status(result.error === 'profile_incomplete' ? 409 : 400).json(result)
  res.json(result)
}))

app.post('/api/qotd/answer', requireAuthenticated, wrap(async (req, res) => {
  const result = await recordQotdAnswer(req.identity.id, req.body ?? {})
  if (result.error) {
    const code = result.error === 'profile_incomplete' ? 409 : result.error === 'not_todays_question' ? 409 : 400
    return res.status(code).json(result)
  }
  res.json(result)
}))

app.get('/api/qotd/leaderboard', requireAuthenticated, wrap(async (req, res) => {
  const result = await qotdLeaderboard(req.identity.id, { limit: Math.min(Number(req.query?.limit) || 50, 100) })
  if (result.error) return res.status(409).json(result)
  res.json(result)
}))

app.get('/api/qotd/friends', requireAuthenticated, wrap(async (req, res) => {
  const result = await qotdFriends(req.identity.id)
  if (result.error) return res.status(409).json(result)
  res.json(result)
}))

/* ── Build Maristanas ──────────────────────────────────────────────────── */

app.get('/api/maristanas', requireAuthenticated, wrap(async (req, res) => {
  res.json(await maristanaOverview(req.identity.id))
}))

app.post('/api/maristanas/study-heartbeat', requireAuthenticated, wrap(async (req, res) => {
  const result = await recordStudyHeartbeat(req.identity.id, req.body ?? {})
  if (result.error) return res.status(400).json(result)
  res.json(result)
}))

app.patch('/api/maristanas/:slot', requireAuthenticated, wrap(async (req, res) => {
  const result = await renameHospital(req.identity.id, req.params.slot, req.body?.name)
  if (result.error) return res.status(result.error === 'hospital_not_unlocked' ? 403 : 400).json(result)
  res.json(result)
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

/* ── Study room seats and activity ───────────────────────────────────────── */

/**
 * Where this member sits, and what their desk looks like.
 *
 * `:code` is the room code the browser has in its address bar, but a party id
 * is accepted too — every route above this one is addressed by id, and making
 * the caller translate between the two would be a translation that can be got
 * wrong. `resolvePartyId` takes either.
 *
 * A refused seat is 409, not 400: asking for a desk somebody is sitting at is
 * a race, not a malformed request, and the client's answer is to try another
 * desk rather than to fix its code.
 */
app.patch('/api/parties/:code/seat', requireAuthenticated, wrap(async (req, res) => {
  const result = await setSeat(req.identity.id, req.params.code, req.body ?? {})
  if (!result.ok) {
    const status = result.reason === 'seat_taken' ? 409
      : result.reason === 'not_found' || result.reason === 'not_a_member' ? 404
        : 400
    return res.status(status).json(result)
  }
  // Everybody watching the hall sees the seat move now rather than in four
  // seconds. A room with no open sockets pays nothing for this.
  notifyRoomPresence(result.partyId)
  return res.json(result)
}))

/**
 * Seat a member who has just opened a room without a desk of their own.
 *
 * Idempotent: a member who already has a desk keeps it, and a full room
 * answers `seatIndex: null` rather than inventing a twenty-first desk.
 */
app.post('/api/parties/:code/seat/claim', requireAuthenticated, wrap(async (req, res) => {
  const partyId = await resolvePartyId(req.params.code)
  if (!partyId) return res.status(404).json({ ok: false, reason: 'not_found' })
  const members = await partyMembers(partyId, req.identity.id)
  if (!members) return res.status(404).json({ ok: false, reason: 'not_a_member' })
  const seatIndex = await ensureSeated(req.identity.id, partyId)
  notifyRoomPresence(partyId)
  return res.json({ ok: true, seatIndex, party: await partyFor(req.identity.id, partyId) })
}))

/** "I am still here, and this is what I am doing." Thirty seconds apart, from the room. */
app.post('/api/parties/:code/heartbeat', requireAuthenticated, wrap(async (req, res) => {
  const result = await recordActivity(req.identity.id, req.params.code, req.body?.activity)
  if (!result.ok) return res.status(404).json(result)
  notifyRoomPresence(result.partyId)
  return res.json(result)
}))

/** The room's members, seats and activity — the same list the socket broadcasts. */
app.get('/api/parties/:code/members', requireAuthenticated, wrap(async (req, res) => {
  const partyId = await resolvePartyId(req.params.code)
  const members = partyId ? await partyMembers(partyId, req.identity.id) : null
  if (!members) return res.status(404).json({ error: 'party not found' })
  return res.json({ members })
}))

/* ── Study party games ───────────────────────────────────────────────────── */

app.post('/api/parties/:id/games', requireAuthenticated, wrap(async (req, res) => {
  res.json(await createPartyGame(req.identity.id, req.params.id, req.body ?? {}))
}))

app.get('/api/parties/:id/games', requireAuthenticated, wrap(async (req, res) => {
  res.json({ games: await partyGamesFor(req.identity.id, req.params.id) })
}))

app.get('/api/parties/:id/games/:gameId', requireAuthenticated, wrap(async (req, res) => {
  const game = await partyGameFor(req.identity.id, req.params.id, req.params.gameId)
  if (!game) return res.status(404).json({ error: 'game not found' })
  res.json({ game })
}))

app.post('/api/parties/:id/games/:gameId/actions', requireAuthenticated, wrap(async (req, res) => {
  res.json(await actOnPartyGame(req.identity.id, req.params.id, req.params.gameId, req.body?.action ?? req.body ?? {}))
}))

app.get('/api/parties/:id/games/:gameId/events', requireAuthenticated, wrap(async (req, res) => {
  await streamPartyGameEvents(req.identity.id, req.params.id, req.params.gameId, req, res)
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
 * The intersection itself.
 *
 * `fbFriendIds` is the caller's own Facebook friend list, read by the browser
 * straight from Facebook's `/me/friends` for the account it just connected.
 * This route never talks to Facebook — it only matches that list against
 * `facebook_links`, same as the deletion callback never re-derives what Meta
 * already told it.
 */
app.post('/api/friends/facebook/match', requireAuthenticated, facebookFriendsEnabled, wrap(async (req, res) => {
  const fbFriendIds = Array.isArray(req.body?.fbFriendIds) ? req.body.fbFriendIds : []
  res.json({ people: await matchFacebookFriends(req.identity.id, fbFriendIds) })
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

/* ── Deleting an account ─────────────────────────────────────────────────── */

/**
 * A student erasing their own account.
 *
 * Scoped to the caller and to nobody else: there is no id in the path, so the
 * only account this route can delete is the one whose token was presented.
 * App Store guideline 5.1.1(v) requires this to exist and to actually delete.
 */
app.delete('/api/account', requireAuthenticated, wrap(async (req, res) => {
  const result = await deleteAccount(req.identity)
  if (result.error) return res.status(result.status ?? 400).json(result)
  return res.json(result)
}))

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
  const platform = ['ios', 'android', 'web'].includes(req.body?.platform) ? req.body.platform : 'ios'
  const locale = typeof req.body?.locale === 'string' ? req.body.locale.slice(0, 16) : null
  const appVersion = typeof req.body?.appVersion === 'string' ? req.body.appVersion.slice(0, 32) : null

  if (platform === 'web') {
    // A web subscription's identity is its endpoint (used as the PK token).
    const sub = req.body?.subscription
    const endpoint = typeof sub?.endpoint === 'string' ? sub.endpoint : null
    const p256dh = typeof sub?.keys?.p256dh === 'string' ? sub.keys.p256dh : null
    const auth = typeof sub?.keys?.auth === 'string' ? sub.keys.auth : null
    if (!endpoint || !p256dh || !auth) return res.status(400).json({ error: 'invalid web subscription' })
    await pool.query(
      `INSERT INTO device_tokens (token, user_id, platform, environment, locale, app_version, web_endpoint, web_p256dh, web_auth)
       VALUES (?, ?, 'web', 'production', ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), locale = VALUES(locale),
         app_version = VALUES(app_version), web_endpoint = VALUES(web_endpoint),
         web_p256dh = VALUES(web_p256dh), web_auth = VALUES(web_auth), last_seen_at = CURRENT_TIMESTAMP`,
      [endpoint, req.identity.id, locale, appVersion, endpoint, p256dh, auth],
    )
    return res.json({ ok: true })
  }

  const token = normaliseDeviceToken(req.body?.token)
  if (!token) return res.status(400).json({ error: 'invalid device token' })
  const environment = req.body?.environment === 'sandbox' ? 'sandbox' : 'production'
  await pool.query(
    `INSERT INTO device_tokens (token, user_id, platform, environment, locale, app_version)
     VALUES (?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), platform = VALUES(platform),
       environment = VALUES(environment), locale = VALUES(locale),
       app_version = VALUES(app_version), last_seen_at = CURRENT_TIMESTAMP`,
    [token, req.identity.id, platform, environment, locale, appVersion],
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

/**
 * Remove a web-push subscription. Its identity is the endpoint URL, which is not
 * a hex APNs token, so it cannot go through the token-validating DELETE above.
 * Scoped to the caller's own rows.
 */
app.post('/api/devices/web/unsubscribe', requireAuthenticated, wrap(async (req, res) => {
  const endpoint = typeof req.body?.endpoint === 'string' ? req.body.endpoint : null
  if (!endpoint) return res.status(400).json({ error: 'endpoint required' })
  await pool.query(
    "DELETE FROM device_tokens WHERE platform = 'web' AND web_endpoint = ? AND user_id = ?",
    [endpoint, req.identity.id],
  )
  res.json({ ok: true })
}))

// Shared catalogue documents that students need in order to use the learning
// product. All other shared documents (reports, imports, email logs, settings)
// remain admin-only even when a key is guessed.
const STUDENT_READABLE_STATE = new Set([
  // Alt text and dimensions for every image a student may be shown. The bytes
  // are a separate, individually authenticated request.
  MEDIA_STATE_KEY,
  // The admin's edits to Terms, Privacy, Refund Policy and Contact. The most
  // public documents the platform has: they are read from the marketing footer
  // by somebody who has not signed up yet, so this one is readable with no
  // session at all. Only the `legal` tab may write it.
  'nishany-legal-pages-v1',
  // The faculty's own by-module and by-year structures. Students browse them.
  'nishany-library-trees-v1',
  'nishany-academic-universities-v1',
  'nishany-course-curricula-v1',
  'nishany-module-schedules-v1',
  'nishany-admin-content-ledger-v4',
  'nishany-concept-graph-v2',
  'nishany-relation-types-v1',
  'nishany-taxonomy-tree-v4',
  'nishany-medical-library-taxonomy-v1',
  // The bilingual glossary behind /app/taxonomy. Admin-written, student-read.
  'nishany-medical-glossary-v1',
  'nishany-medical-evidence-published-v1',
  'nishany-plans-v1',
  'nishany-notification-campaigns-v1',
  'nishany-vouchers-v1',
  'nishany-system-colors-v1',
  // The current plan catalogue. Billing and onboarding both price against it,
  // and without it a student was offered the seeded plans instead of the ones
  // actually being sold.
  'nishany-plan-catalog-v1',
  // The student-ID discount offer, shown on Billing to the students it is for.
  'nishany-student-id-discount-v1',
  // The upload allowance, so the demo build can show the limit an admin set.
  'nishany-storage-limits-v1',
  // The construction economy is set by an admin and explained on the student
  // dashboard. Students can read the multipliers but only Settings can write.
  'nishany-maristana-config-v1',
  // Adaptive Study runs entirely on these three, on the student's own screen.
  // Admin-written and student-read: a student must not be able to edit the
  // thresholds they are judged by, but a page that cannot read them silently
  // falls back to defaults and reports figures nobody configured.
  'nishany-adaptive-config-v1',
  'nishany-adaptive-blueprints-v1',
  'nishany-adaptive-heldout-v1',
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

// Cross-student activity tracking for the Settings console: answer-change
// transitions from the verified attempt ledger and highlighting behaviour from
// every student's highlight document. Optional ?university=&year=&term= scope.
app.get('/api/admin/activity-tracking', requireSuperAdmin, wrap(async (req, res) => {
  res.json(await activityTrackingSummary({
    universityId: typeof req.query.university === 'string' ? req.query.university : undefined,
    year: typeof req.query.year === 'string' ? req.query.year : undefined,
    term: typeof req.query.term === 'string' ? req.query.term : undefined,
  }))
}))

// A mass withdrawal is intentionally not a normal editor action. The
// operational script reads this immediately before its versioned ledger write
// and refuses to interrupt live question sessions without an explicit flag.
app.get('/api/admin/content-visibility-reset-preflight', requireSuperAdmin, wrap(async (_req, res) => {
  res.json({ active: await contentVisibilityResetActivity() })
}))

/**
 * Prepare an exact, expiring retirement manifest.
 *
 * The response contains compact target summaries, never mutable item bodies.
 * Originals stay server-side in `content_archive_operations`, where they are a
 * manual-recovery record and cannot be swapped by a browser before apply.
 */
app.post('/api/admin/content-archive/preview', requireSuperAdmin, wrap(async (req, res) => {
  const [[ledgerRows], [versionRows]] = await Promise.all([
    pool.query('SELECT v FROM app_state WHERE k = ?', [CONTENT_LEDGER_STATE_KEY]),
    pool.query('SELECT MAX(id) AS version FROM app_state_versions WHERE k = ?', [CONTENT_LEDGER_STATE_KEY]),
  ])
  const raw = ledgerRows[0]?.v ?? '[]'
  let ledger
  try { ledger = JSON.parse(raw) } catch { return res.status(409).json({ error: 'content ledger is malformed' }) }
  if (!Array.isArray(ledger)) return res.status(409).json({ error: 'content ledger is not a list' })

  let manifest
  try { manifest = contentArchiveManifest(ledger) } catch (error) {
    return res.status(409).json({ error: error?.message ?? 'content ledger cannot be archived safely' })
  }
  const targetQuestionIds = new Set(manifest.targets.filter((target) => target.kind === 'question').map((target) => target.id))
  const activity = await contentVisibilityResetSnapshot(pool, targetQuestionIds)
  manifest.affectedSessions = activity.sessionIds
  const active = activity.active
  const operationId = `archive-${randomUUID()}`
  const confirmationPhrase = archiveConfirmation(manifest.counts)
  const expiresAt = new Date(Date.now() + CONTENT_ARCHIVE_TTL_MINUTES * 60_000)
  const ledgerVersion = versionRows[0]?.version ?? null
  const ledgerDigest = contentDigest(raw)
  // A refresh replaces the caller's unused preflight rather than multiplying
  // ledger-sized manifests. Applied receipts remain immutable.
  await pool.query(
    `DELETE FROM content_archive_operations
      WHERE status = 'prepared' AND (created_by = ? OR expires_at <= CURRENT_TIMESTAMP)`,
    [req.identity.id],
  )
  await pool.query(
    `INSERT INTO content_archive_operations
       (id, created_by, ledger_version, ledger_digest, manifest_json, confirmation_phrase, expires_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [operationId, req.identity.id, ledgerVersion, ledgerDigest, JSON.stringify(manifest), confirmationPhrase, toMariaDbDate(expiresAt)],
  )
  res.json({
    operationId,
    selection: manifest.selection,
    expiresAt: expiresAt.toISOString(),
    ledgerVersion,
    ledgerDigest,
    counts: manifest.counts,
    statusCounts: manifest.statusCounts,
    sourceCounts: manifest.sourceCounts,
    targets: manifest.targets.map((target) => ({
      id: target.id,
      title: target.before?.title ?? target.id,
      kind: target.kind,
      status: target.before?.status ?? 'Unknown',
      source: target.before?.source ?? target.before?.owner ?? null,
    })),
    confirmationPhrase,
    active,
    blocked: activeArchiveBlockers(active) > 0,
  })
}))

/** Apply only the server-held manifest prepared above. */
app.post('/api/admin/content-archive/apply', requireSuperAdmin, wrap(async (req, res) => withContentCatalogueGate(async () => {
  const operationId = String(req.body?.operationId ?? '').trim()
  const confirmation = String(req.body?.confirmation ?? '').trim()
  const reason = String(req.body?.reason ?? '').trim().slice(0, 500)
  const allowAffectedSessions = req.body?.allowAffectedSessions === true
  if (!operationId) return res.status(400).json({ error: 'operationId is required' })
  if (reason.length < 10) return res.status(400).json({ error: 'a clear reason of at least 10 characters is required' })

  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const [operationRows] = await conn.query(
      `SELECT id, created_by AS createdBy, status, ledger_version AS ledgerVersion,
              ledger_digest AS ledgerDigest, manifest_json AS manifestJson,
              confirmation_phrase AS confirmationPhrase, result_json AS resultJson,
              expires_at AS expiresAt
         FROM content_archive_operations WHERE id = ? FOR UPDATE`,
      [operationId],
    )
    const operation = operationRows[0]
    if (!operation || operation.createdBy !== req.identity.id) {
      await conn.rollback()
      return res.status(404).json({ error: 'archive preflight not found' })
    }
    if (operation.status === 'applied') {
      await conn.commit()
      return res.json(JSON.parse(operation.resultJson))
    }
    if (operation.status !== 'prepared' || new Date(operation.expiresAt).getTime() <= Date.now()) {
      await conn.query("UPDATE content_archive_operations SET status = 'expired' WHERE id = ? AND status = 'prepared'", [operationId])
      await conn.commit()
      return res.status(409).json({ error: 'archive preflight expired; run it again' })
    }
    if (confirmation !== operation.confirmationPhrase) {
      await conn.rollback()
      return res.status(400).json({ error: 'the confirmation phrase does not match this preflight' })
    }

    let manifest
    try {
      manifest = JSON.parse(operation.manifestJson)
    } catch {
      await conn.rollback()
      return res.status(409).json({ error: 'the stored archive manifest is malformed' })
    }
    if (manifest?.selection !== CONTENT_ARCHIVE_SELECTION) {
      await conn.rollback()
      return res.status(409).json({ error: 'archive preflight uses an obsolete selection; run it again' })
    }
    const targetQuestionIds = new Set((manifest.targets ?? []).filter((target) => target?.kind === 'question').map((target) => target.id))
    const activity = await contentVisibilityResetSnapshot(conn, targetQuestionIds)
    const active = activity.active
    if (!affectedSessionSetsMatch(manifest.affectedSessions, activity.sessionIds)) {
      await conn.rollback()
      return res.status(409).json({ error: 'affected question sessions changed after preflight; refresh and review again', active })
    }
    if (!archiveActivityAllowed(active, allowAffectedSessions)) {
      await conn.rollback()
      return res.status(409).json({ error: 'affected question sessions require explicit acknowledgement', active })
    }

    const [ledgerRows] = await conn.query('SELECT v FROM app_state WHERE k = ? FOR UPDATE', [CONTENT_LEDGER_STATE_KEY])
    const raw = ledgerRows[0]?.v ?? '[]'
    const [versionRows] = await conn.query('SELECT MAX(id) AS version FROM app_state_versions WHERE k = ?', [CONTENT_LEDGER_STATE_KEY])
    const currentVersion = versionRows[0]?.version ?? null
    const expectedVersion = operation.ledgerVersion ?? null
    if (String(currentVersion ?? '') !== String(expectedVersion ?? '') || contentDigest(raw) !== operation.ledgerDigest) {
      await conn.rollback()
      return res.status(409).json({ error: 'content changed after preflight; review the refreshed counts before trying again' })
    }

    let ledger
    try {
      ledger = JSON.parse(raw)
    } catch {
      await conn.rollback()
      return res.status(409).json({ error: 'the content ledger is malformed' })
    }
    const archivedAt = new Date()
    let archived
    try {
      archived = applyContentArchive(ledger, manifest, {
        operationId,
        actorId: req.identity.id,
        reason,
        archivedAt: archivedAt.toISOString(),
      })
    } catch (error) {
      await conn.rollback()
      if (error?.code === 'stale_manifest' || error?.code === 'invalid_manifest') return res.status(409).json({ error: error.message })
      throw error
    }

    const value = JSON.stringify(archived.value)
    const [inserted] = await conn.query(
      'INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)',
      [CONTENT_LEDGER_STATE_KEY, value, req.identity.id],
    )
    await conn.query('UPDATE app_state SET v = ? WHERE k = ?', [value, CONTENT_LEDGER_STATE_KEY])
    const result = {
      ok: true,
      operationId,
      counts: archived.counts,
      affectedSessionsAcknowledged: active,
      affectedSessionOverrideUsed: allowAffectedSessions && activeArchiveBlockers(active) > 0,
      archivedAt: archivedAt.toISOString(),
      version: inserted.insertId,
    }
    await conn.query(
      `UPDATE content_archive_operations
          SET status = 'applied', reason = ?, result_json = ?, applied_at = ?
        WHERE id = ?`,
      [reason, JSON.stringify(result), toMariaDbDate(archivedAt), operationId],
    )
    await conn.commit()
    invalidateSnapshots(CONTENT_LEDGER_STATE_KEY)
    res.json(result)
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
})))

function cleanAcademicDocuments(input) {
  const documents = input && typeof input === 'object' ? input : {}
  const out = {}
  for (const key of ACADEMIC_STATE_KEYS) {
    if (Object.hasOwn(documents, key)) out[key] = documents[key]
  }
  return out
}

async function readAcademicState(conn, lock = false) {
  const [rows] = await conn.query(
    `SELECT s.k, s.v, (SELECT MAX(id) FROM app_state_versions WHERE k = s.k) AS version
       FROM app_state s
      WHERE s.k IN (${ACADEMIC_STATE_KEYS.map(() => '?').join(',')})
      ${lock ? 'FOR UPDATE' : ''}`,
    ACADEMIC_STATE_KEYS,
  )
  const found = new Map(rows.map((row) => [row.k, row]))
  const documents = {}
  const versions = {}
  for (const key of ACADEMIC_STATE_KEYS) {
    const row = found.get(key)
    documents[key] = row ? JSON.parse(row.v) : null
    versions[key] = row?.version ?? null
  }
  return { documents, versions }
}

function academicVersionMismatch(expectedVersions, versions) {
  if (!expectedVersions || typeof expectedVersions !== 'object') return [{ key: '*', expected: undefined, actual: null }]
  const mismatches = []
  for (const key of ACADEMIC_STATE_KEYS) {
    if (!Object.hasOwn(expectedVersions, key)) {
      mismatches.push({ key, expected: undefined, actual: versions[key] ?? null })
      continue
    }
    const expected = expectedVersions[key] ?? null
    const actual = versions[key] ?? null
    if (String(expected) !== String(actual)) mismatches.push({ key, expected, actual })
  }
  return mismatches
}

app.post('/api/admin/academic/preview', requireTab('academic', 'marks'), wrap(async (req, res) => {
  const incoming = cleanAcademicDocuments(req.body?.documents)
  if (!Object.keys(incoming).length) return res.status(400).json({ error: 'documents are required' })
  const conn = await pool.getConnection()
  try {
    const { documents, versions } = await readAcademicState(conn)
    const next = { ...documents, ...incoming }
    res.json({ ...academicPreview(documents, next), versions })
  } finally {
    conn.release()
  }
}))

app.post('/api/admin/academic/publish', requireSuperAdmin, wrap(async (req, res) => {
  const idempotencyKey = String(req.body?.idempotencyKey ?? '').trim().slice(0, 128)
  if (!idempotencyKey) return res.status(400).json({ error: 'idempotencyKey is required' })
  const incoming = cleanAcademicDocuments(req.body?.documents)
  if (!Object.keys(incoming).length) return res.status(400).json({ error: 'documents are required' })

  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    try {
      await conn.query(
        'INSERT INTO academic_publish_requests (idempotency_key, actor_id, response_json) VALUES (?, ?, ?)',
        [idempotencyKey, req.identity.id, '{}'],
      )
    } catch {
      const [previous] = await conn.query(
        'SELECT actor_id AS actorId, response_json AS responseJson FROM academic_publish_requests WHERE idempotency_key = ?',
        [idempotencyKey],
      )
      await conn.rollback()
      if (!previous.length) return res.status(409).json({ error: 'idempotency_conflict' })
      if (previous[0].actorId !== req.identity.id) return res.status(409).json({ error: 'idempotency_key_used' })
      return res.json(JSON.parse(previous[0].responseJson))
    }

    const { documents, versions } = await readAcademicState(conn, true)
    const mismatches = academicVersionMismatch(req.body?.expectedVersions, versions)
    if (mismatches.length) {
      await conn.rollback()
      return res.status(409).json({ error: 'stale', mismatches })
    }

    const next = { ...documents, ...incoming }
    const preview = academicPreview(documents, next)
    if (!preview.ok) {
      await conn.rollback()
      return res.status(400).json({ error: 'academic_batch_refused', preview })
    }

    const changedVersions = {}
    for (const key of preview.changedKeys) {
      const value = JSON.stringify(next[key] ?? null)
      const [inserted] = await conn.query(
        'INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)',
        [key, value, req.identity.id],
      )
      changedVersions[key] = inserted.insertId
      await conn.query(
        'INSERT INTO app_state (k, v) VALUES (?, ?) ON DUPLICATE KEY UPDATE v = VALUES(v)',
        [key, value],
      )
    }

    const response = {
      ok: true,
      changedKeys: preview.changedKeys,
      versions: { ...versions, ...changedVersions },
      fingerprints: preview.fingerprints,
    }
    await conn.query(
      'UPDATE academic_publish_requests SET response_json = ? WHERE idempotency_key = ?',
      [JSON.stringify(response), idempotencyKey],
    )
    await conn.commit()
    for (const key of preview.changedKeys) invalidateSnapshots(key)
    res.json(response)
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}))

app.get('/api/state/:key', wrap(async (req, res) => {
  // Console access, not the single role 'admin': an editor or a reviewer
  // authors this content and must read it whole. Redaction is for students.
  const authoring = hasConsoleAccess(req.identity?.role)
  const key = canonicalStateKey(req.params.key)
  if (!STUDENT_READABLE_STATE.has(key)) {
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
  // Tells the client this server understands delta saves (change-only writes)
  // for this document. A client withholds deltas until it sees this, so a client
  // built for delta can never send one to an older server that would read the
  // absent whole `value` as "delete everything". Only meaningful for authors —
  // students do not write.
  const deltaSupported = authoring && isMergeable(key)
  const [rows] = await pool.query(
    `SELECT s.v, s.updated_at AS updatedAt,
            (SELECT MAX(id) FROM app_state_versions WHERE k = s.k) AS version
       FROM app_state s WHERE s.k = ?`,
    [key],
  )
  if (!rows.length) return res.json({ value: null, updatedAt: null, version: null, deltaSupported })
  const { updatedAt, version } = rows[0]
  let value
  try { value = JSON.parse(rows[0].v) } catch { return res.json({ value: null, updatedAt, version, deltaSupported }) }
  // Some readable documents are readable only in part. The content ledger holds
  // every authored item in every state, including drafts, the author's private
  // notes and the provenance of borrowed papers; a student gets its published
  // projection instead. That happens here rather than in the browser, because a
  // field removed after delivery has already been delivered.
  const redact = authoring ? undefined : REDACTED_STATE_KEYS.get(key)
  if (!authoring && key === CONTENT_LEDGER_STATE_KEY) {
    // The whole-ledger read the sliced `/api/content/*` routes replace. Native
    // bundles still take this path, so it stays — logged so we can see who is
    // left on it before anyone proposes deleting it.
    console.info('[content] legacy ledger fetch', { userId: req.identity?.id })
    const releasedMediaIds = releasedMediaIdsFromDocument({ records: await mediaRecords() })
    const [catalogueRows] = await pool.query('SELECT v FROM app_state WHERE k = ?', [ACADEMIC_CATALOGUE_STATE_KEY])
    let catalogue = []
    try { catalogue = catalogueRows[0] ? JSON.parse(catalogueRows[0].v) : [] } catch { catalogue = [] }
    value = redactLedgerForStudent(value, releasedMediaIds, catalogue)
  } else if (redact) value = redact(value)
  // Archived reports stay on the record for editors and super admins, but a
  // reviewer's queue is only the live work: they are filtered out before the
  // document ever reaches a reviewer, not merely hidden in the browser.
  if (req.identity?.role === 'reviewer' && key === CONTENT_REPORTS_STATE_KEY && Array.isArray(value)) {
    value = value.filter((report) => report?.status !== 'Archived')
  }
  res.json({ value, updatedAt, version, deltaSupported })
}))

/**
 * How many version rows to keep per document, and how many to drop per save.
 *
 * Each version row is a full snapshot — the content ledger's are ~23 MB — so an
 * unbounded history was the table's runaway growth. Older rows are only ever
 * read as the merge base for a whole-document save from a client that loaded
 * long ago; a delta save needs none of them, and a base that has been pruned
 * simply asks that client to reload. Keeping a generous recent window preserves
 * that base for all but the most stale client, and the last resort for undoing
 * a bad write. Both are env-tunable. The delete is bounded so a large backlog
 * drains over successive saves instead of one heavy, locking delete.
 */
const STATE_VERSION_RETENTION = Math.max(2, Number(process.env.STATE_VERSION_RETENTION) || 20)
// Gentle by default: at steady state only one row per save exceeds the window,
// so a small batch keeps up, and a large existing backlog drains over many
// saves rather than in heavy 23 MB-a-row deletes that fight foreground writes.
// Raise STATE_VERSION_PRUNE_BATCH to reclaim a big backlog faster.
const STATE_VERSION_PRUNE_BATCH = Math.max(1, Number(process.env.STATE_VERSION_PRUNE_BATCH) || 5)
const pruningVersionKeys = new Set()

/**
 * Trim a key's version history to the newest STATE_VERSION_RETENTION rows.
 *
 * Runs after commit, off the write's transaction and lock, best-effort: it is
 * housekeeping, never part of whether the save succeeded. One key prunes at a
 * time so rapid saves cannot stack heavy deletes on top of each other.
 */
async function pruneStateVersions(key) {
  if (pruningVersionKeys.has(key)) return
  pruningVersionKeys.add(key)
  try {
    // The oldest row we keep; everything with a smaller id is prunable. LIMIT and
    // OFFSET are inlined, not bound — they are validated server integers, and
    // mysql2 quotes bound LIMIT/OFFSET values into a syntax error.
    const [rows] = await pool.query(
      `SELECT id FROM app_state_versions WHERE k = ? ORDER BY id DESC LIMIT 1 OFFSET ${STATE_VERSION_RETENTION - 1}`,
      [key],
    )
    const floor = rows[0]?.id
    if (!floor) return
    await pool.query(
      `DELETE FROM app_state_versions WHERE k = ? AND id < ? ORDER BY id ASC LIMIT ${STATE_VERSION_PRUNE_BATCH}`,
      [key, floor],
    )
  } finally {
    pruningVersionKeys.delete(key)
  }
}

/**
 * Enforce that a media request only becomes supplied with verified media.
 *
 * Compares the merged ledger against what was stored and looks at every request
 * whose media was just attached, or that now claims to be supplied. A managed
 * upload must be 'ready' — genuinely round-tripped and verified — for the request
 * to stand: a ready one is promoted to 'supplied' in place (the server's decision,
 * not a label the client can assert), and one still verifying or failed refuses
 * the whole save. A mediaId with no managed row is pre-existing/legacy media and
 * is left untouched, so this never falsely blocks media the state machine does
 * not own.
 */
async function enforceMediaSupply(conn, mergedLedger, storedLedger) {
  const merged = collectMediaRequests(mergedLedger)
  const stored = collectMediaRequests(storedLedger)
  const candidates = []
  for (const [id, request] of merged) {
    if (!request?.mediaId) continue
    const before = stored.get(id) ?? null
    const attachedNow = request.mediaId !== before?.mediaId
    const claimsSupplied = request.status === 'supplied' && before?.status !== 'supplied'
    if (attachedNow || claimsSupplied) candidates.push(request)
  }
  if (!candidates.length) return { ok: true, readyMediaIds: new Set() }

  const mediaIds = [...new Set(candidates.map((request) => request.mediaId))]
  const [rows] = await conn.query('SELECT id, status FROM managed_media WHERE id IN (?)', [mediaIds])
  const statusById = new Map(rows.map((row) => [row.id, row.status]))

  const notReady = []
  // The managed ids this save legitimately attaches, now verified ready. The
  // descriptive media record (its alt text and rights) rides a second, separate
  // save to the media document; until that lands the id is not yet "released",
  // which would otherwise make supplying media to an already-published item fail
  // purely on save ordering. Students never see the difference — they only ever
  // receive released media (see redactMediaForStudent) — so the publish guard may
  // safely treat a verified, just-attached asset as acceptable.
  const readyMediaIds = new Set()
  for (const request of candidates) {
    const status = statusById.get(request.mediaId)
    if (status === undefined) continue // not a managed upload — legacy media, left as-is
    if (status !== 'ready') { notReady.push({ id: request.id, mediaId: request.mediaId, status }); continue }
    if (request.status !== 'supplied') request.status = 'supplied'
    readyMediaIds.add(request.mediaId)
  }
  return notReady.length ? { ok: false, notReady } : { ok: true, readyMediaIds }
}

/**
 * Save a shared document.
 *
 * Three refusals, in the order they become knowable: you must hold a tab that
 * owns this key; the changes you are making must be yours to make; and nobody
 * may have changed the same item underneath you. Each answers with what is
 * wrong, because a save that fails silently is the bug this route used to have.
 */
app.put('/api/state/:key', requireConsole, wrap(async (req, res) => {
  const key = canonicalStateKey(req.params.key)

  // The subscriber-display doc has a dedicated endpoint that re-captures the
  // real subscription count in the same transaction as a base change; the
  // generic route cannot express that, so it never writes this key — not even
  // for a super admin, who could otherwise bypass the tab check below.
  if (key === SUBSCRIBER_DISPLAY_STATE_KEY) {
    return res.status(403).json({ error: 'use POST /api/admin/subscriber-count for this document' })
  }

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
  let removedMediaRecords = []
  try {
    await conn.beginTransaction()
    let guardedRows = []
    let currentRows
    if (key === CONTENT_LEDGER_STATE_KEY || key === MEDIA_STATE_KEY || key === ACADEMIC_CATALOGUE_STATE_KEY) {
      // Publication, release, and valid curriculum placement are one invariant.
      // Lock all three documents in one deterministic query so concurrent
      // writes cannot validate against different catalogue/media generations.
      const [rows] = await conn.query(
        'SELECT k, v FROM app_state WHERE k IN (?, ?, ?) ORDER BY k FOR UPDATE',
        [ACADEMIC_CATALOGUE_STATE_KEY, CONTENT_LEDGER_STATE_KEY, MEDIA_STATE_KEY],
      )
      guardedRows = rows
      currentRows = rows.filter((row) => row.k === key)
    } else {
      const [rows] = await conn.query('SELECT v FROM app_state WHERE k = ? FOR UPDATE', [key])
      currentRows = rows
    }
    const storedRaw = currentRows.length ? currentRows[0].v : null
    const [versionRows] = await conn.query('SELECT MAX(id) AS version FROM app_state_versions WHERE k = ?', [key])
    const storedVersion = versionRows[0]?.version ?? null

    const stored = storedRaw === null ? null : JSON.parse(storedRaw)

    // A delta save sends only the items this client changed. It is the same
    // authorisation and per-item conflict check as a whole-document save, but it
    // never needs the base document — the `before` carried by each change is the
    // conflict guard — so it is immune to a pruned version row, and one changed
    // question no longer costs a 22 MB upload. A `changes` array that is present
    // but malformed is refused; a whole-document `value` takes the path below.
    const rawChanges = req.body?.changes
    let merged
    let changesForAuth
    if (rawChanges !== undefined) {
      if (!isMergeable(key)) {
        await conn.rollback()
        return res.status(400).json({ error: 'delta_unsupported', reason: 'this document is saved whole, not by change' })
      }
      changesForAuth = reconstructChanges(key, rawChanges)
      if (!changesForAuth) {
        await conn.rollback()
        return res.status(400).json({ error: 'malformed_changes', reason: 'the change set is malformed; reload this page and try again' })
      }
      merged = applyDelta(key, stored, changesForAuth)
    } else {
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
      const incoming = req.body?.value ?? null
      // A document with no adapter yields no changes; the base-version check
      // above is what protects it, and the tab check below is its authorisation.
      changesForAuth = diffDocument(key, base, incoming)
      merged = mergeDocument(key, base, stored, incoming)
    }

    if (!superAdmin) {
      const authorised = authoriseChanges(changesForAuth, { heldTabs: held, contentScope: req.identity.contentScope, role: req.identity.role, rank: req.identity.rank })
      if (!authorised.ok) {
        await conn.rollback()
        return res.status(403).json({ error: 'refused', refusals: authorised.refusals })
      }
    }

    if (!merged.ok) {
      await conn.rollback()
      return res.status(409).json({
        error: 'conflict',
        conflicts: merged.conflicts,
        reason: 'somebody else changed the same items while you were editing',
      })
    }

    if (key === CONTENT_LEDGER_STATE_KEY || key === MEDIA_STATE_KEY || key === ACADEMIC_CATALOGUE_STATE_KEY) {
      const ledgerRow = guardedRows.find((row) => row.k === CONTENT_LEDGER_STATE_KEY)
      const mediaRow = guardedRows.find((row) => row.k === MEDIA_STATE_KEY)
      const catalogueRow = guardedRows.find((row) => row.k === ACADEMIC_CATALOGUE_STATE_KEY)
      const beforeLedger = ledgerRow ? JSON.parse(ledgerRow.v) : []
      const beforeMedia = mediaRow ? JSON.parse(mediaRow.v) : { records: [] }
      const beforeCatalogue = catalogueRow ? JSON.parse(catalogueRow.v) : []
      const ledger = key === CONTENT_LEDGER_STATE_KEY
        ? merged.value
        : beforeLedger
      const media = key === MEDIA_STATE_KEY
        ? merged.value
        : beforeMedia
      const catalogue = key === ACADEMIC_CATALOGUE_STATE_KEY
        ? merged.value
        : beforeCatalogue
      // "Supplied" is the server's word, not the client's: a request may only
      // become supplied with media that has finished verifying. Newly attached
      // (or newly supplied-claiming) requests are checked against the media
      // table; a ready managed upload is promoted to supplied here, and a request
      // pointing at media that is still verifying or has failed is refused. This
      // runs before the publish guard below so that guard can see the media just
      // supplied as acceptable, rather than blocking on the descriptive record's
      // separate, still-in-flight save.
      let suppliedReadyMediaIds = new Set()
      if (key === CONTENT_LEDGER_STATE_KEY) {
        const supply = await enforceMediaSupply(conn, ledger, beforeLedger)
        if (!supply.ok) {
          await conn.rollback()
          return res.status(409).json({
            error: 'media_not_ready',
            reason: 'a request can be supplied only with media that has finished verifying',
            requests: supply.notReady,
          })
        }
        suppliedReadyMediaIds = supply.readyMediaIds
      }
      const blockedItems = newlyMediaBlockedPublishedItems(
        beforeLedger,
        releasedMediaIdsFromDocument(beforeMedia),
        ledger,
        new Set([...releasedMediaIdsFromDocument(media), ...suppliedReadyMediaIds]),
      )
      if (blockedItems.length) {
        await conn.rollback()
        return res.status(409).json({
          error: 'media_required',
          reason: 'published content cannot be saved while required teaching media is unresolved or unreleased',
          blockedItems,
        })
      }
      const archiveScopeBlockedItems = key === ACADEMIC_CATALOGUE_STATE_KEY
        ? (() => {
            const beforeIds = new Set(archiveScopeBlockedPublishedItems(beforeLedger, beforeCatalogue).map((item) => item.id))
            return archiveScopeBlockedPublishedItems(ledger, catalogue).filter((item) => !beforeIds.has(item.id))
          })()
        : newlyArchiveScopeBlockedPublishedItems(beforeLedger, ledger, catalogue)
      if (archiveScopeBlockedItems.length) {
        await conn.rollback()
        return res.status(409).json({
          error: 'archive_scope_required',
          reason: 'archived content must be assigned to a valid university, year, and module before it can be published',
          blockedItems: archiveScopeBlockedItems,
        })
      }
      if (key === MEDIA_STATE_KEY) {
        const nextIds = new Set((Array.isArray(media?.records) ? media.records : []).map((record) => record.id))
        removedMediaRecords = (Array.isArray(beforeMedia?.records) ? beforeMedia.records : [])
          .filter((record) => !nextIds.has(record.id))
      }
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
    if (removedMediaRecords.length) {
      // The descriptive document is now authoritative. Reclaim each removed
      // managed alias only after that commit, so a failed state save can never
      // strand a live library record without its bytes.
      for (const record of removedMediaRecords) {
        try {
          const deleted = await deleteManagedMediaRow({ id: record.id })
          if (!deleted && record.storageKey) {
            await withManagedMediaDigestLock(record.sha256 || record.id, (mediaConn) => (
              removePhysicalMediaIfUnreferenced(record, mediaConn)
            ))
          }
        } catch (error) {
          // A remaining managed row is a durable cleanup marker. The stale
          // upload sweep retries it after the recovery window.
          console.error(`media cleanup failed for ${record.id}:`, error)
        }
      }
    }
    if (key === ROLE_TABS_STATE_KEY) invalidateRoleTabs()
    // A new version row was written iff the id advanced. Keep the history bounded
    // — after the response, so it never adds to save latency, and best-effort, so
    // a housekeeping hiccup is never a failed save.
    if (version !== storedVersion) {
      void pruneStateVersions(key).catch((error) => console.error(`version prune failed for ${key}:`, error?.message ?? error))
    }
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
  const key = canonicalStateKey(req.params.key)
  if ([CONTENT_LEDGER_STATE_KEY, MEDIA_STATE_KEY, ACADEMIC_CATALOGUE_STATE_KEY].includes(key)) {
    return res.status(409).json({
      error: 'protected_state',
      reason: 'the content ledger, media library, and academic catalogue must be changed through their guarded editors',
    })
  }
  // Reports are removed one at a time, with typed confirmation and a tombstone —
  // never wiped wholesale by a single call. See POST /api/content-reports/:id/delete.
  if (key === CONTENT_REPORTS_STATE_KEY) {
    return res.status(409).json({
      error: 'protected_state',
      reason: 'a content report is deleted one at a time through its own confirmed, audited action',
    })
  }
  await pool.query('DELETE FROM app_state WHERE k = ?', [key])
  invalidateSnapshots(key)
  if (key === ROLE_TABS_STATE_KEY) invalidateRoleTabs()
  res.json({ ok: true })
}))

/* ── Content reports ─────────────────────────────────────────────────────── */

/**
 * The student's sliced view of the content ledger — summary, kind slices, the
 * article index, scoped questions and one item at a time. Routes and cache live
 * in `studentContent.js`; this is only where they are mounted.
 */
registerContentRoutes(app)

/**
 * File a content report.
 *
 * Open to any signed-in account, because the people who hit a wrong answer or a
 * broken image are students, who hold no console tab and so cannot reach the
 * shared write path. The server stamps the reporter's identity, role and time
 * itself — never the caller's word for them — and appends under the same row
 * lock the console write path uses, so a report filed here and a review saved
 * there cannot lose one another.
 */
app.post('/api/content-reports', requireAuthenticated, rateLimited('content_reports', byUser, 10, 60 * 60_000), wrap(async (req, res) => {
  const body = req.body ?? {}
  const contentId = typeof body.contentId === 'string' ? body.contentId.trim() : ''
  const note = typeof body.note === 'string' ? body.note.trim() : ''
  if (!contentId) return res.status(400).json({ error: 'contentId is required' })
  if (!note) return res.status(400).json({ error: 'a description is required' })

  const actor = await getUserByIdentity(req.identity.id)
  const reporterName = actor?.name || String(req.identity.email ?? '').split('@')[0] || 'Someone'
  const report = buildContentReport(body, {
    id: `report-${randomUUID()}`,
    reporterUserId: req.identity.id,
    reporterRole: reporterRoleLabel(req.identity.role),
    reporterName,
    createdAt: new Date().toISOString(),
  })

  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const [rows] = await conn.query('SELECT v FROM app_state WHERE k = ? FOR UPDATE', [CONTENT_REPORTS_STATE_KEY])
    let current = []
    if (rows.length) { try { current = JSON.parse(rows[0].v) } catch { current = [] } }
    if (!Array.isArray(current)) current = []
    const next = [report, ...current]
    const v = JSON.stringify(next)
    await conn.query('INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)', [CONTENT_REPORTS_STATE_KEY, v, req.identity.id])
    await conn.query('INSERT INTO app_state (k, v) VALUES (?, ?) ON DUPLICATE KEY UPDATE v = VALUES(v)', [CONTENT_REPORTS_STATE_KEY, v])
    await conn.commit()
    invalidateSnapshots(CONTENT_REPORTS_STATE_KEY)
    res.json({ ok: true, id: report.id })
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}))

/**
 * Permanently delete one report. Super admin only, never a one-click action: the
 * caller must type the report's id or its exact title back, and what is removed
 * leaves a tombstone — who deleted it, when, and which report — so the deletion
 * is itself on the record. The reports document and the tombstone log are written
 * under one transaction, so a report never disappears without its marker.
 */
app.post('/api/content-reports/:id/delete', requireSuperAdmin, wrap(async (req, res) => {
  const reportId = req.params.id
  const actor = await getUserByIdentity(req.identity.id)
  const deletedByName = actor?.name || String(req.identity.email ?? '').split('@')[0] || 'Super admin'

  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const [rows] = await conn.query('SELECT v FROM app_state WHERE k = ? FOR UPDATE', [CONTENT_REPORTS_STATE_KEY])
    let current = []
    if (rows.length) { try { current = JSON.parse(rows[0].v) } catch { current = [] } }
    if (!Array.isArray(current)) current = []
    const report = current.find((item) => item?.id === reportId)
    if (!report) { await conn.rollback(); return res.status(404).json({ error: 'no such report' }) }
    if (!deletionConfirmed(report, req.body?.confirmation)) {
      await conn.rollback()
      return res.status(400).json({ error: 'confirmation_mismatch', reason: 'type the report id or its exact title to confirm deletion' })
    }
    const next = current.filter((item) => item?.id !== reportId)
    const v = JSON.stringify(next)
    await conn.query('INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)', [CONTENT_REPORTS_STATE_KEY, v, req.identity.id])
    await conn.query('INSERT INTO app_state (k, v) VALUES (?, ?) ON DUPLICATE KEY UPDATE v = VALUES(v)', [CONTENT_REPORTS_STATE_KEY, v])

    const [tombRows] = await conn.query('SELECT v FROM app_state WHERE k = ? FOR UPDATE', [CONTENT_REPORT_TOMBSTONES_KEY])
    let tombstones = []
    if (tombRows.length) { try { tombstones = JSON.parse(tombRows[0].v) } catch { tombstones = [] } }
    if (!Array.isArray(tombstones)) tombstones = []
    const tombstone = buildTombstone(report, {
      deletedBy: req.identity.id, deletedByName, deletedAt: new Date().toISOString(), reason: req.body?.reason,
    })
    const tv = JSON.stringify([tombstone, ...tombstones])
    await conn.query('INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)', [CONTENT_REPORT_TOMBSTONES_KEY, tv, req.identity.id])
    await conn.query('INSERT INTO app_state (k, v) VALUES (?, ?) ON DUPLICATE KEY UPDATE v = VALUES(v)', [CONTENT_REPORT_TOMBSTONES_KEY, tv])

    await conn.commit()
    invalidateSnapshots(CONTENT_REPORTS_STATE_KEY)
    invalidateSnapshots(CONTENT_REPORT_TOMBSTONES_KEY)
    res.json({ ok: true, tombstone })
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}))

/* ── Media escalations ───────────────────────────────────────────────────── */

/**
 * How many media requests are escalated and still open, for the nav badge on the
 * Escalations queue. Editor-and-above only (the tab is theirs). Counts from the
 * ledger; escalations are rare, so a scan on an occasional nav fetch is cheap
 * enough, and it never ships the whole ledger to the browser to do it.
 */
app.get('/api/admin/escalations/count', requireTab('escalations'), wrap(async (req, res) => {
  const [rows] = await pool.query('SELECT v FROM app_state WHERE k = ?', [CONTENT_LEDGER_STATE_KEY])
  let ledger = []
  if (rows.length) { try { ledger = JSON.parse(rows[0].v) } catch { ledger = [] } }
  let open = 0
  for (const request of collectMediaRequests(ledger).values()) {
    if (request?.escalation?.status === 'open') open += 1
  }
  res.json({ open })
}))

/* ── Private, per-user state ─────────────────────────────────────────────── */

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
  const fields = ['name', 'email', 'study_group', 'notes']
  const updates = []
  const params = []
  for (const [key, column] of [['name', 'name'], ['email', 'email'], ['group', 'study_group'], ['notes', 'notes']]) {
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

/**
 * Move a student to a new university and year.
 *
 * The Users tab holds admins too, but changing a cohort is an editor-and-above
 * action — it resets what progress the student sees — so rank is checked past the
 * tab. The change is one transaction: persist the cohort, re-derive year_id, reset
 * the cached aggregates to the destination cohort (a clean slate on a new one,
 * the old numbers exactly on a return), and write the audit row. The response
 * carries the before and after so the confirmation screen can state both.
 */
app.post('/api/admin/users/:id/enrollment', requireTab('users'), wrap(async (req, res) => {
  if (req.identity.rank < 2) {
    return res.status(403).json({ error: 'only an editor or super admin may change a student’s university and year' })
  }
  const reason = readReason(req.body)
  if (!reason) return res.status(400).json({ error: 'reason must be explicit (8 characters or more)' })
  const universityId = String(req.body?.universityId || '').trim()
  const year = String(req.body?.year || '').trim()
  if (!universityId || !year) return res.status(400).json({ error: 'universityId and year are required' })

  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const [rows] = await conn.query(
      'SELECT id, university_id AS universityId, year, year_id AS yearId, user_id AS userId FROM students WHERE id = ? FOR UPDATE',
      [req.params.id],
    )
    if (!rows.length) { await conn.rollback(); return res.status(404).json({ error: 'no profile to update' }) }
    const current = rows[0]
    if (String(current.universityId ?? '') === universityId && String(current.year ?? '') === year) {
      await conn.rollback()
      return res.status(409).json({ error: 'that is already their university and year' })
    }
    const result = await applyDirectEnrollmentChange(conn, {
      studentId: req.params.id, userId: current.userId, universityId, year,
      oldUniversityId: current.universityId, oldYear: current.year, oldYearId: current.yearId,
      actorId: req.identity.id, reason,
    })
    await conn.commit()
    res.json({ ok: true, ...result })
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

/**
 * Set a user's password directly.
 *
 * Editor-and-above only — an admin holds the Users tab but is rank 1, so the tab
 * is not enough. The account whose password is being set must itself be below
 * editor (student, reviewer or admin); accounts.setUserPassword enforces that, so
 * an editor can never reach a peer's or a super admin's credentials. The password
 * is never stored or logged here.
 */
app.post('/api/admin/users/:id/password', requireTab('users'), wrap(async (req, res) => {
  if (req.identity.rank < 2) {
    return res.status(403).json({ error: 'only an editor or super admin may set a user’s password' })
  }
  const reason = readReason(req.body)
  if (!reason) return res.status(400).json({ error: 'reason must be explicit (8 characters or more)' })
  const result = await setUserPassword(req.params.id, { password: req.body?.password, reason, actorId: req.identity.id })
  const REFUSALS = {
    weak_password: [400, 'password must be at least 8 characters'],
    not_found: [404, 'user not found'],
    no_identity: [409, 'this person has never signed in, so there is no account to set a password for'],
    forbidden_target: [403, 'passwords can only be set for students, reviewers and admins'],
    supabase_not_configured: [503, 'setting passwords needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY on the server'],
    supabase_rejected: [502, `Supabase refused the request${result?.status ? ` (${result.status})` : ''}`],
  }
  if (result.error) {
    const [status, message] = REFUSALS[result.error] ?? [400, result.error]
    return res.status(status).json({ error: message })
  }
  res.json({ ok: true })
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

app.get('/api/admin/enrollment-change-requests', requireTab('users'), wrap(async (req, res) => {
  res.json({ requests: await listEnrollmentChangeRequests({ status: req.query?.status ? String(req.query.status) : 'pending' }) })
}))

app.post('/api/admin/enrollment-change-requests/:id/approve', requireTab('users'), wrap(async (req, res) => {
  const result = await decideEnrollmentChangeRequest(req.params.id, {
    approve: true, note: req.body?.note ?? req.body?.reason, actorId: req.identity.id,
  })
  if (result.error) {
    const status = result.error === 'username_conflict' || result.error === 'already_decided' ? 409 : (result.error === 'not_found' ? 404 : 400)
    return res.status(status).json(result)
  }
  res.json(result)
}))

app.post('/api/admin/enrollment-change-requests/:id/reject', requireTab('users'), wrap(async (req, res) => {
  const result = await decideEnrollmentChangeRequest(req.params.id, {
    approve: false, note: req.body?.note ?? req.body?.reason, actorId: req.identity.id,
  })
  if (result.error) {
    const status = result.error === 'already_decided' ? 409 : (result.error === 'not_found' ? 404 : 400)
    return res.status(status).json(result)
  }
  res.json(result)
}))

app.get('/api/admin/platform/reports', requireTab('dashboard'), wrap(async (_req, res) => {
  res.json(await platformReport())
}))

app.post('/api/admin/platform/storage-thresholds/:thresholdGb/ack', requireTab('dashboard'), wrap(async (req, res) => {
  const result = await acknowledgeStorageThreshold(req.params.thresholdGb, req.identity.id)
  if (result.error) return res.status(400).json(result)
  res.json(result)
}))

app.get('/api/admin/pricing', requireTab('payments'), wrap(async (_req, res) => {
  res.json(await listPricingDiscounts())
}))

app.post('/api/admin/pricing/promotions', requireTab('payments'), wrap(async (req, res) => {
  const result = await createPromotion(req.body ?? {}, req.identity.id)
  if (result.error) return res.status(400).json(result)
  res.json(result)
}))

app.post('/api/admin/pricing/vouchers', requireTab('payments'), wrap(async (req, res) => {
  const result = await createPricingVoucher(req.body ?? {}, req.identity.id)
  if (result.error) return res.status(400).json(result)
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

/** Managed-media chunks are isolated from the medical-resource cleanup tree. */
function resolvedMediaUploadPath(mediaId, uploadId) {
  return resolveUploadWorkspace(resolve(MEDIA_STORAGE_DIR, 'media'), `upload-${mediaId}`, uploadId)
}

/** Remove only abandoned managed-media sessions, never active resource work. */
async function cleanupStaleMediaUploads() {
  const [stale] = await pool.query(
    `SELECT id, upload_id AS uploadId FROM managed_media
      WHERE status = 'uploading' AND updated_at < DATE_SUB(NOW(), INTERVAL ? HOUR)`,
    [MEDIA_UPLOAD_MAX_AGE_HOURS],
  )
  for (const row of stale) {
    const workspace = resolvedMediaUploadPath(row.id, row.uploadId)
    if (workspace) await rm(workspace, { recursive: true, force: true })
    await pool.query(`DELETE FROM managed_media WHERE id = ? AND upload_id = ? AND status = 'uploading'`, [row.id, row.uploadId])
  }

  // A browser can disappear after completion but before it describes the
  // asset in the library document. Keep that recovery window generous, then
  // reclaim the durable orphan through the same reference-aware path.
  const stateConn = await pool.getConnection()
  try {
    await stateConn.beginTransaction()
    // Read the authoritative document while holding the same row lock used by
    // state writes. A second replica's process-local cache must never decide a
    // destructive cleanup.
    const [mediaRows] = await stateConn.query('SELECT v FROM app_state WHERE k = ? FOR UPDATE', [MEDIA_STATE_KEY])
    const describedRecords = mediaRows.length ? JSON.parse(mediaRows[0].v)?.records ?? [] : []
    const describedIds = new Set(describedRecords.map((record) => record.id))
    const [readyOrphans] = await stateConn.query(
      `SELECT id FROM managed_media
       WHERE status = 'ready' AND updated_at < DATE_SUB(NOW(), INTERVAL ? HOUR)`,
      [MEDIA_UPLOAD_MAX_AGE_HOURS],
    )
    for (const row of readyOrphans) {
      if (!describedIds.has(row.id)) await deleteManagedMediaRow({ id: row.id, describedMediaRecords: describedRecords })
    }
    await stateConn.commit()
  } catch (error) {
    await stateConn.rollback()
    throw error
  } finally {
    stateConn.release()
  }
}

/** Serialise file creation and reclamation for one content-addressed object. */
async function withManagedMediaDigestLock(digest, work) {
  const conn = await pool.getConnection()
  const lockName = `nishany-media:${String(digest).slice(0, 48)}`
  try {
    const [rows] = await conn.query('SELECT GET_LOCK(?, 10) AS acquired', [lockName])
    if (Number(rows[0]?.acquired) !== 1) {
      const error = new Error('media storage is busy; please try again')
      error.status = 503
      throw error
    }
    return await work(conn)
  } finally {
    await conn.query('SELECT RELEASE_LOCK(?)', [lockName]).catch(() => {})
    conn.release()
  }
}

function completedMediaPayload(row, alreadyStored = false) {
  return {
    id: row.id,
    storageKey: row.storageKey,
    sha256: row.sha256,
    mediaType: row.mediaType,
    mimeType: row.mimeType,
    sizeBytes: Number(row.sizeBytes || 0),
    width: Number(row.width || 0),
    height: Number(row.height || 0),
    alreadyStored,
  }
}

/** Remove content-addressed bytes only after every database and library alias is gone. */
async function removePhysicalMediaIfUnreferenced(record, conn, excludedManagedId = null, describedMediaRecords = null) {
  if (!record?.storageKey) return false
  const [databaseReferences] = await conn.query(
    `SELECT COUNT(*) AS total FROM managed_media
     WHERE storage_key = ? AND status = 'ready'${excludedManagedId ? ' AND id <> ?' : ''}`,
    excludedManagedId ? [record.storageKey, excludedManagedId] : [record.storageKey],
  )
  if (Number(databaseReferences[0]?.total || 0) > 0) return false
  const descriptions = describedMediaRecords ?? await mediaRecords()
  const describedReference = descriptions.some((entry) => entry?.storageKey === record.storageKey)
  if (describedReference) return false
  const fullPath = resolveWithin(MEDIA_STORAGE_DIR, record.storageKey)
  if (fullPath) await rm(fullPath, { force: true })
  return true
}

/** Delete one owned upload/asset alias and reclaim its bytes when it was the last. */
async function deleteManagedMediaRow({ id, uploadedBy = null, uploadId = null, describedMediaRecords = null }) {
  const where = ['id = ?']
  const params = [id]
  if (uploadedBy) { where.push('uploaded_by = ?'); params.push(uploadedBy) }
  if (uploadId) { where.push('upload_id = ?'); params.push(uploadId) }
  const [initialRows] = await pool.query(
    `SELECT id, upload_id AS uploadId, uploaded_by AS uploadedBy, status,
       storage_key AS storageKey, sha256
     FROM managed_media WHERE ${where.join(' AND ')} LIMIT 1`,
    params,
  )
  const initial = initialRows[0]
  if (!initial) return false

  if (initial.status === 'uploading') {
    const workspace = resolvedMediaUploadPath(initial.id, initial.uploadId)
    if (workspace) await rm(workspace, { recursive: true, force: true })
    const [deleted] = await pool.query(`DELETE FROM managed_media WHERE ${where.join(' AND ')} AND status = 'uploading'`, params)
    return Boolean(deleted.affectedRows)
  }

  return withManagedMediaDigestLock(initial.sha256 || initial.id, async (conn) => {
    const [rows] = await conn.query(
      `SELECT id, upload_id AS uploadId, storage_key AS storageKey, sha256 FROM managed_media
       WHERE ${where.join(' AND ')} AND status = 'ready' LIMIT 1`,
      params,
    )
    const record = rows[0]
    if (!record) return false
    const workspace = record.uploadId && resolvedMediaUploadPath(record.id, record.uploadId)
    if (workspace) await rm(workspace, { recursive: true, force: true })
    await removePhysicalMediaIfUnreferenced(record, conn, record.id, describedMediaRecords)
    const [deleted] = await conn.query(`DELETE FROM managed_media WHERE ${where.join(' AND ')} AND status = 'ready'`, params)
    if (!deleted.affectedRows) return false
    return true
  })
}

/** Turn an assembled staging file into one immediately readable managed asset. */
async function registerManagedMedia(staging, received, { id = `med-${randomUUID()}`, uploadedBy }) {
  // MP4/M4A track metadata may live in a trailing `moov` atom, especially for
  // large/non-fast-start files. Probe a bounded head and tail rather than
  // loading a multi-gigabyte upload into memory or guessing from its filename.
  const headLength = Math.min(1024 * 1024, received.sizeBytes)
  const tailLength = Math.min(4 * 1024 * 1024, Math.max(0, received.sizeBytes - headLength))
  const probe = Buffer.alloc(headLength + tailLength)
  const handle = await open(staging, 'r')
  try {
    await handle.read(probe, 0, headLength, 0)
    if (tailLength) await handle.read(probe, headLength, tailLength, received.sizeBytes - tailLength)
  } finally { await handle.close() }
  const meta = mediaMeta(probe)
  if (!meta) {
    const error = new Error('that file is not a supported image, audio recording or video')
    error.status = 415
    throw error
  }
  const typeCap = MEDIA_TYPE_MAX_BYTES[meta.mediaType]
  if (typeCap && received.sizeBytes > typeCap) {
    const error = new Error(`${meta.mediaType} may be up to ${Math.round(typeCap / (1024 * 1024))} MB`)
    error.status = 413
    throw error
  }

  const storageKey = storageKeyFor(received.sha256, meta.mimeType)
  const fullPath = storageKey && resolveWithin(MEDIA_STORAGE_DIR, storageKey)
  if (!fullPath) throw new Error('media path could not be resolved')

  return withManagedMediaDigestLock(received.sha256, async (conn) => {
    // Identical uploads share one physical object but retain their own row and
    // upload id. That makes completion and cleanup safely retryable even when
    // the first HTTP response is lost.
    const alreadyStored = existsSync(fullPath)
    if (!alreadyStored) {
      await mkdir(dirname(fullPath), { recursive: true })
      await rename(staging, fullPath)
    } else {
      await rm(staging, { force: true })
    }
    try {
      // The file is on disk but not yet trusted: land it as 'verifying', prove it
      // reads back, and only then promote to 'ready'. A record is never 'ready'
      // because an upload's last request returned — only because its stored bytes
      // were round-tripped.
      await conn.query(
        `INSERT INTO managed_media
           (id, uploaded_by, status, storage_key, sha256, media_type, mime_type, size_bytes, width, height)
         VALUES (?, ?, 'verifying', ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE status = 'verifying', storage_key = VALUES(storage_key),
           sha256 = VALUES(sha256), media_type = VALUES(media_type), mime_type = VALUES(mime_type),
           size_bytes = VALUES(size_bytes), width = VALUES(width), height = VALUES(height),
           failure_reason = NULL`,
        [id, uploadedBy, storageKey, received.sha256, meta.mediaType, meta.mimeType, received.sizeBytes, meta.width || null, meta.height || null],
      )
    } catch (error) {
      if (!alreadyStored) await removePhysicalMediaIfUnreferenced({ storageKey }, conn)
      throw error
    }

    const failure = await verifyStoredMedia(fullPath, received.sizeBytes, meta.mediaType)
    if (failure) {
      await conn.query('UPDATE managed_media SET status = ?, failure_reason = ? WHERE id = ?', ['failed', failure, id])
      return { id, status: 'failed', failureReason: failure }
    }
    await conn.query('UPDATE managed_media SET status = ?, verified_at = NOW(), ready_at = NOW() WHERE id = ?', ['ready', id])
    return {
      ...completedMediaPayload({
        id, storageKey, sha256: received.sha256, mediaType: meta.mediaType,
        mimeType: meta.mimeType, sizeBytes: received.sizeBytes,
        width: meta.width, height: meta.height,
      }, alreadyStored),
      status: 'ready',
    }
  })
}

/**
 * Verify a stored media object at rest, returning a failure reason or null.
 *
 * This is what "verifying" actually means without a transcoder: the file exists
 * where it was written, is the size we recorded, reads back, and still parses as
 * the media type it claimed. It catches a truncated or corrupted write that a
 * successful HTTP upload would otherwise have reported as done. Audio and video
 * are confirmed as readable and correctly typed; playback itself is not claimed
 * verified, because the server has no player — the honest ceiling here.
 */
async function verifyStoredMedia(fullPath, sizeBytes, mediaType) {
  try {
    const info = await stat(fullPath)
    if (!info.isFile()) return 'stored media is not a file'
    if (info.size !== sizeBytes) return `stored media is ${info.size} bytes, expected ${sizeBytes}`
    const headLength = Math.min(1024 * 1024, sizeBytes)
    const tailLength = Math.min(4 * 1024 * 1024, Math.max(0, sizeBytes - headLength))
    const back = Buffer.alloc(headLength + tailLength)
    const handle = await open(fullPath, 'r')
    try {
      await handle.read(back, 0, headLength, 0)
      if (tailLength) await handle.read(back, headLength, tailLength, sizeBytes - tailLength)
    } finally { await handle.close() }
    const recheck = mediaMeta(back)
    if (!recheck) return 'stored media did not read back as a recognised format'
    if (recheck.mediaType !== mediaType) return `stored media read back as ${recheck.mediaType}, not ${mediaType}`
    return null
  } catch {
    return 'stored media could not be read back'
  }
}

/** Legacy bounded request, kept for older clients. New clients use chunks. */
app.post('/api/media', requireTab('resources', 'media'), wrap(async (req, res) => {
  const staging = resolveWithin(MEDIA_STORAGE_DIR, join('media', '.staging', randomUUID()))
  if (!staging) return res.status(500).json({ error: 'media staging path could not be resolved' })

  let received
  try {
    received = await receiveStream(req, staging, { maxBytes: MEDIA_MAX_BYTES })
  } catch (error) {
    await rm(staging, { force: true })
    return res.status(413).json({ error: error.message })
  }

  try { return res.json({ ok: true, ...(await registerManagedMedia(staging, received, { uploadedBy: req.identity.id })) }) }
  catch (error) { return res.status(error.status || 500).json({ error: error.message }) }
  finally { await rm(staging, { force: true }) }
}))

/**
 * Which media storage providers are configured, for a super admin auditing the
 * Cloudflare wiring. Reports presence and readiness only — never a secret value.
 * The filesystem provider is always available; R2/Stream report configured only
 * when their env is complete, and name (never print) any variables still missing.
 */
app.get('/api/admin/media/providers', requireSuperAdmin, wrap(async (_req, res) => {
  res.json(describeProviders(process.env))
}))

/** Start a large, resumable managed-media upload. */
app.post('/api/media/uploads', requireTab('resources', 'media'), wrap(async (req, res) => {
  await cleanupStaleMediaUploads()
  const sizeBytes = Number(req.body?.sizeBytes)
  if (!Number.isFinite(sizeBytes) || sizeBytes < 1 || sizeBytes > MEDIA_CHUNKED_MAX_BYTES) {
    return res.status(413).json({ error: `managed media may be up to ${Math.round(MEDIA_CHUNKED_MAX_BYTES / (1024 * 1024))} MB` })
  }
  const id = `med-${randomUUID()}`
  const uploadId = randomUUID().replace(/-/g, '')
  await pool.query(
    `INSERT INTO managed_media (id, upload_id, uploaded_by, status, size_bytes) VALUES (?, ?, ?, 'uploading', ?)`,
    [id, uploadId, req.identity.id, sizeBytes],
  )
  res.json({ id, uploadId, chunkMaxBytes: MEDIA_CHUNK_MAX_BYTES, maxBytes: MEDIA_CHUNKED_MAX_BYTES })
}))

app.put('/api/media/uploads/:id/:uploadId/chunks/:index', requireTab('resources', 'media'), wrap(async (req, res) => {
  const [rows] = await pool.query(
    `SELECT id FROM managed_media WHERE id = ? AND upload_id = ? AND uploaded_by = ? AND status = 'uploading'`,
    [req.params.id, req.params.uploadId, req.identity.id],
  )
  if (!rows.length) return res.status(404).json({ error: 'media upload not found' })
  const index = Number(req.params.index)
  if (!Number.isInteger(index) || index < 0 || index > 4095) return res.status(400).json({ error: 'invalid chunk index' })
  const workspace = resolvedMediaUploadPath(req.params.id, req.params.uploadId)
  if (!workspace) return res.status(400).json({ error: 'invalid media upload path' })
  const declaredLength = Number(req.header('content-length'))
  if (Number.isFinite(declaredLength) && declaredLength > MEDIA_CHUNK_MAX_BYTES) return res.status(413).json({ error: 'chunk exceeds configured limit' })
  const result = await receiveChunk(req, workspace, index, MEDIA_CHUNK_MAX_BYTES)
  await pool.query(`UPDATE managed_media SET updated_at = NOW() WHERE id = ? AND upload_id = ? AND uploaded_by = ? AND status = 'uploading'`, [req.params.id, req.params.uploadId, req.identity.id])
  res.json({ ok: true, index, sizeBytes: result.sizeBytes })
}))

app.post('/api/media/uploads/:id/:uploadId/complete', requireTab('resources', 'media'), wrap(async (req, res) => {
  const [rows] = await pool.query(
    `SELECT id, status, storage_key AS storageKey, sha256, media_type AS mediaType,
       mime_type AS mimeType, size_bytes AS sizeBytes, width, height, failure_reason AS failureReason
     FROM managed_media
     WHERE id = ? AND upload_id = ? AND uploaded_by = ? AND status IN ('uploading', 'ready', 'failed')`,
    [req.params.id, req.params.uploadId, req.identity.id],
  )
  const pending = rows[0]
  if (!pending) return res.status(404).json({ error: 'media upload not found' })
  // A prior attempt that failed verification stays failed — report it honestly on
  // retry rather than pretending the upload is still in progress.
  if (pending.status === 'failed') {
    return res.json({ ok: true, id: pending.id, status: 'failed', failureReason: pending.failureReason || 'verification failed' })
  }
  if (pending.status === 'ready') {
    const workspace = resolvedMediaUploadPath(req.params.id, req.params.uploadId)
    if (workspace) await rm(workspace, { recursive: true, force: true })
    const [duplicates] = await pool.query(
      `SELECT COUNT(*) AS total FROM managed_media
       WHERE storage_key = ? AND status = 'ready' AND id <> ?`,
      [pending.storageKey, pending.id],
    )
    const describedDuplicate = (await mediaRecords()).some(
      (record) => record.id !== pending.id && record.storageKey === pending.storageKey,
    )
    return res.json({
      ok: true,
      status: 'ready',
      ...completedMediaPayload(pending, Number(duplicates[0]?.total || 0) > 0 || describedDuplicate),
    })
  }
  const totalChunks = Number(req.body?.totalChunks)
  const declaredSize = Number(req.body?.sizeBytes)
  if (!Number.isInteger(totalChunks) || totalChunks < 1 || totalChunks > 4096) return res.status(400).json({ error: 'invalid chunk count' })
  if (!Number.isFinite(declaredSize) || declaredSize !== Number(pending.sizeBytes) || declaredSize > MEDIA_CHUNKED_MAX_BYTES) {
    return res.status(409).json({ error: 'uploaded size does not match the initiated upload' })
  }
  const workspace = resolvedMediaUploadPath(req.params.id, req.params.uploadId)
  const staging = resolveWithin(MEDIA_STORAGE_DIR, join('media', '.staging', req.params.id))
  if (!workspace || !staging) return res.status(400).json({ error: 'invalid media upload path' })
  try {
    const received = await assembleChunks(workspace, staging, {
      totalChunks, declaredSize, maxBytes: MEDIA_CHUNKED_MAX_BYTES, chunkMaxBytes: MEDIA_CHUNK_MAX_BYTES,
      removeWorkspace: false,
    })
    const registered = await registerManagedMedia(staging, received, { id: req.params.id, uploadedBy: req.identity.id })
    await rm(workspace, { recursive: true, force: true })
    res.json({ ok: true, ...registered })
  } catch (error) {
    await rm(staging, { force: true })
    res.status(error.status || 500).json({ error: error.message || 'media upload could not be completed' })
  }
}))

app.delete('/api/media/uploads/:id/:uploadId', requireTab('resources', 'media'), wrap(async (req, res) => {
  const deleted = await deleteManagedMediaRow({
    id: req.params.id,
    uploadId: req.params.uploadId,
    uploadedBy: req.identity.id,
  })
  if (!deleted) return res.status(404).json({ error: 'media upload not found' })
  res.json({ ok: true })
}))

/** Authenticated fetch for images and downloads. */
app.get('/api/media/:id', requireAuthenticated, wrap(async (req, res) => {
  if (!await mayReadManagedMedia(req.identity, req.params.id)) return res.status(404).json({ error: 'media not found' })
  const record = await managedMediaFile(req.params.id)
  if (!record) return res.status(404).json({ error: 'media not found' })
  if (!sendManagedMedia(res, record)) return res.status(404).json({ error: 'media file is pending upload' })
}))

/** Native audio/video playback uses a signed URL so Range requests can seek. */
app.post('/api/media/:id/playback', requireAuthenticated, wrap(async (req, res) => {
  if (!await mayReadManagedMedia(req.identity, req.params.id)) return res.status(404).json({ error: 'media not found' })
  const record = await managedMediaFile(req.params.id)
  if (!record) return res.status(404).json({ error: 'media not found' })
  const token = createMediaPlaybackToken(record.id, Date.now(), 4 * 60 * 60 * 1000, hasConsoleAccess(req.identity?.role))
  res.json({ url: `/api/media-playback/${encodeURIComponent(token)}` })
}))

app.get('/api/media-playback/:token', wrap(async (req, res) => {
  const claim = readMediaPlaybackToken(req.params.token)
  if (!claim) return res.status(404).json({ error: 'media link expired' })
  if (!claim.allowDraft) {
    const released = (await mediaRecords()).find((entry) => entry.id === claim.mediaId)
    if (!released || !isMediaReleased(released)) return res.status(404).json({ error: 'media not found' })
  }
  const record = await managedMediaFile(claim.mediaId)
  if (!record || !sendManagedMedia(res, record, { signed: true })) return res.status(404).json({ error: 'media not found' })
}))

/**
 * Whether this image may be removed.
 *
 * The record itself is removed by the client's write to the library document;
 * this route refuses active use and drops this managed alias. Content-addressed
 * bytes are reclaimed only after every database and library alias is gone.
 */
app.delete('/api/media/:id', requireTab('resources', 'media'), wrap(async (req, res) => {
  const [ledgerRow] = await pool.query('SELECT v FROM app_state WHERE k = ?', [CONTENT_LEDGER_STATE_KEY])
  const [graphRow] = await pool.query('SELECT v FROM app_state WHERE k = ?', ['nishany-concept-graph-v2'])
  const ledger = ledgerRow.length ? JSON.parse(ledgerRow[0].v) : []
  const concepts = graphRow.length ? (JSON.parse(graphRow[0].v)?.concepts ?? []) : []
  const refusal = deleteRefusal(req.params.id, ledger, concepts)
  if (refusal) return res.status(409).json({ error: refusal })
  // A described library record is removed by the following state write. Keep
  // its durable row and bytes until that write commits; pending/duplicate
  // uploads have no description and can be reclaimed immediately.
  if (!(await mediaRecords()).some((record) => record.id === req.params.id)) {
    await deleteManagedMediaRow({ id: req.params.id })
  }
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

const STUDENT_COLS = 'id, name, email, university_id AS universityId, year, year_id AS yearId, plan, status, joined, last_active AS lastActive, questions_answered AS questionsAnswered, accuracy, readiness'

app.get('/api/students', wrap(async (_req, res) => {
  const [rows] = await pool.query(`SELECT ${STUDENT_COLS} FROM students ORDER BY name`)
  res.json(rows)
}))

app.post('/api/students', wrap(async (req, res) => {
  const s = req.body || {}
  const id = s.id || `stu-${randomUUID().slice(0, 8)}`
  await pool.query(
    `INSERT INTO students (id, name, email, university_id, year, year_id, plan, status, joined, last_active, questions_answered, accuracy, readiness)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [id, s.name, s.email, s.universityId, s.year, s.yearId || null, s.plan, s.status, s.joined || null, s.lastActive || null, s.questionsAnswered || 0, s.accuracy || 0, s.readiness || 0],
  )
  res.json({ id })
}))

app.patch('/api/students/:id', wrap(async (req, res) => {
  // University, year and year_id are deliberately NOT editable here: a cohort
  // change resets what progress the student sees, so it must go through
  // POST /api/admin/users/:id/enrollment, which is editor-and-above, audited,
  // and resets the aggregates. Persisting them here silently — as the profile
  // dialog once did — is exactly the bug that let a cohort look changed while the
  // record still said otherwise.
  const allowed = { name: 'name', email: 'email', plan: 'plan', status: 'status', lastActive: 'last_active', questionsAnswered: 'questions_answered', accuracy: 'accuracy', readiness: 'readiness' }
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

/**
 * Send one email through Resend, applying suppression and one-click
 * unsubscribe, and log it. Extracted from the `/api/mail/send` handler so the
 * QotD reminder dispatch (and any future caller) shares the exact same
 * suppression/unsubscribe/logging path rather than forking it.
 *
 * Returns `{ id, status, resendId, suppressed? }` on success (`status` is
 * one of 'Suppressed' | 'Queued' | 'Sent'), or `{ error, status }` — a
 * message plus the HTTP status the caller should respond with — for the two
 * failure cases the old route handled inline (missing to/subject, Resend
 * error). Callers that are not an HTTP route (the reminder dispatch) just
 * check `result.status === 'Sent' || result.status === 'Queued'`.
 */
async function sendMail({ from, to, cc, bcc, subject, html, text, category, headers = {}, attachments = [] }) {
  if (!to || !subject) return { error: 'to and subject required', status: 400 }
  const fromAddr = fromForCategory(category, from)
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
    return { id, status: 'Suppressed', resendId: null, suppressed: recipients.length }
  }

  // One-click unsubscribe. Gmail and Outlook surface their own control when these
  // headers are present, which is a far better outcome than the reader reaching
  // for "report spam" — the single strongest negative signal there is.
  const outHeaders = { ...headers }
  if (category && !TRANSACTIONAL_CATEGORIES.has(category) && allowed.length === 1) {
    const token = await unsubscribeTokenFor(allowed[0], category)
    const url = `${PUBLIC_ORIGIN}/unsubscribe?token=${token}`
    outHeaders['List-Unsubscribe'] = `<${url}>, <mailto:${unsubscribeMailtoAddress(category)}?subject=unsubscribe>`
    outHeaders['List-Unsubscribe-Post'] = 'List-Unsubscribe=One-Click'
  }
  // Transactional mail goes out from a no-reply@ address on the mail
  // subdomain — Reply-To keeps a reply reaching the support inbox instead of
  // bouncing.
  const replyTo = replyToForCategory(category)

  let status = 'Queued', resendId = null
  if (resend) {
    const { data, error } = await resend.emails.send({
      from: fromAddr, to: allowed, cc, bcc, subject, html: html || undefined, text: text || undefined,
      headers: Object.keys(outHeaders).length ? outHeaders : undefined,
      replyTo: replyTo || undefined,
      attachments: attachments.map((a) => ({ filename: a.filename, content: a.content_b64 })),
    })
    if (error) return { error: error.message, status: 502 }
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
  return { id, status, resendId }
}

// Send + record. attachments: [{ filename, contentType, content_b64 }]
app.post('/api/mail/send', wrap(async (req, res) => {
  const result = await sendMail(req.body || {})
  if (result.error) return res.status(result.status ?? 400).json({ error: result.error })
  res.json(result)
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

app.post('/api/assistant/chat', requireAuthenticated, rateLimited('assistant_chat', byUser, 30, 15 * 60_000), wrap(async (req, res) => {
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

/**
 * The terminal handler. Reached only when something upstream called
 * `next(err)` instead of handling its own error — body-parser rejecting an
 * oversized or malformed body being the main case, since every route itself
 * goes through `wrap`, above, which never lets an error fall through to here.
 * Same rule as `wrap`: never echo `err.message` to the caller.
 */
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err)
  if (err?.type === 'entity.too.large' || err?.status === 413) {
    return res.status(413).json({ error: 'payload_too_large' })
  }
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'bad_json' })
  }
  if (err instanceof ApiError) {
    return res.status(err.status).json({ error: err.code, message: err.publicMessage })
  }
  logServerError(req.originalUrl, err)
  res.status(500).json({ error: 'internal' })
})

const port = Number(process.env.PORT) || 8080
migrate()
  .then(async () => {
    const httpServer = app.listen(port, () => {
      console.log(`Nishany on :${port}`)
      void medicalResourceRecords()
        .then((resources) => console.log(`Medical resource index ready (${resources.length} records)`))
        .catch((error) => console.error('Medical resource index warm-up failed:', error.message))
    })

    // The study-room signalling channel shares this HTTP server rather than
    // binding a second port: one origin, one TLS certificate, one thing for
    // Coolify to route. Attached after `listen` and never awaited into the boot
    // path — a host that cannot run the SFU still serves the whole product, and
    // the room says voice is unavailable rather than the process failing to
    // start. See docs/rooms-voice.md.
    // Sessions nobody can present any more. Hourly, unref'd so it never holds
    // the process open, and failure is logged rather than fatal.
    setInterval(() => { void sweepIdle().catch((error) => console.error('session sweep failed:', error.message)) }, 3_600_000).unref()

    void attachRoomsRealtime(httpServer, {
      identityFromToken,
      // The web client has no bearer token to offer as a subprotocol any more.
      identityFromCookies: identityFromCookieHeader,
      resolveRoom: resolvePartyId,
      readRoom: roomSnapshot,
      loadSfu,
    })
      .then((realtime) => {
        if (!realtime) return
        console.log(
          realtime.sfu.available
            ? `Study room signalling ready, voice ready (${realtime.sfu.describe?.() ?? 'no config'})`
            : `Study room signalling ready, voice unavailable (${realtime.sfu.reason})`,
        )
      })
      .catch((error) => console.error('Study room signalling failed to attach:', error.message))
    setMailer(sendMail) // inject the email sender the reminder dispatcher uses
    startQotdReminderScheduler()
    // Recovery-point creation must never prevent the HTTP server from coming
    // online, or even delay it — this used to sit on the boot path, awaited
    // inside the same chain that gates `app.listen`'s readiness. Deferred
    // a minute past listen instead, and unref'd so it never holds the process
    // open. A backup failure is reported for operators but is non-fatal.
    setTimeout(() => {
      void (async () => {
        try {
          const [recent] = await pool.query(
            "SELECT id FROM data_snapshots WHERE created_at >= NOW() - INTERVAL 24 HOUR AND created_by = 'system:daily' LIMIT 1",
          )
          if (!recent.length) await createDataSnapshot(`Daily recovery point ${new Date().toISOString()}`, 'system:daily')
        } catch (error) {
          console.error('Daily recovery snapshot skipped:', error.message)
        }
      })()
    }, 60_000).unref()
  })
  .catch((e) => { console.error('startup failed (DB unreachable?):', e.message); process.exit(1) })
