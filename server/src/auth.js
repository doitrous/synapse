import { createRemoteJWKSet, jwtVerify } from 'jose'
import { pool } from './db.js'
import { effectiveRole, hasConsoleAccess, mfaEnforced, parseSuperAdminEmails, rank } from './roles.js'
import { ROLE_TABS_STATE_KEY, holdsTab, tabsForRole } from './tabs.js'

const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, '')
const issuer = supabaseUrl ? `${supabaseUrl}/auth/v1` : null
const jwks = issuer ? createRemoteJWKSet(new URL(`${issuer}/.well-known/jwks.json`)) : null

/**
 * The two accounts that cannot be locked out.
 *
 * Super admin is derived from the signed-in email rather than stored, so there
 * is no row for a database edit to change and no endpoint that could grant or
 * remove it. Read once: this is configuration, not state.
 */
const superAdminEmails = parseSuperAdminEmails(process.env.SUPER_ADMIN_EMAILS)
if (!superAdminEmails.length) {
  // Loud, and then carry on. An empty allowlist means nobody holds super admin,
  // which is survivable; refusing to boot over it is not.
  console.warn('SUPER_ADMIN_EMAILS is empty — no account will hold super admin.')
}

function safeParse(value) {
  try { return JSON.parse(value) } catch { return null }
}

/**
 * Whatever was stored in `content_scope`, made safe to read.
 *
 * A scope that survives this is non-empty by construction, so `null` means one
 * thing everywhere downstream: nothing assigned. The driver may hand back a
 * parsed object or the raw JSON text depending on the column type MariaDB
 * reports, so both are accepted.
 */
function readContentScope(raw) {
  if (raw == null) return null
  const parsed = typeof raw === 'string' ? safeParse(raw) : raw
  if (!parsed || typeof parsed !== 'object') return null
  const list = (value) => (Array.isArray(value)
    ? value.filter((entry) => typeof entry === 'string' && entry.trim())
    : [])
  const moduleIds = list(parsed.moduleIds)
  const yearIds = list(parsed.yearIds)
  return moduleIds.length || yearIds.length ? { moduleIds, yearIds } : null
}

async function supabaseIdentity(token) {
  if (!jwks || !issuer) return null
  const { payload } = await jwtVerify(token, jwks, {
    issuer,
    audience: 'authenticated',
  })
  if (!payload.sub) return null

  const userId = String(payload.sub)
  const email = typeof payload.email === 'string' ? payload.email : null
  const appMetadata = payload.app_metadata && typeof payload.app_metadata === 'object' ? payload.app_metadata : {}
  const provider = typeof appMetadata.provider === 'string' ? appMetadata.provider.slice(0, 32) : null
  await pool.query(
    `INSERT INTO user_access (user_id, email, role) VALUES (?, ?, 'student')
     ON DUPLICATE KEY UPDATE email = COALESCE(VALUES(email), email)`,
    [userId, email],
  )
  if (provider && provider !== 'email') {
    await pool.query(
      `UPDATE students
          SET social_provider = COALESCE(social_provider, ?),
              social_subject = COALESCE(social_subject, ?)
        WHERE user_id = ?`,
      [provider, userId, userId],
    )
  }
  const [rows] = await pool.query(
    'SELECT role, status, mfa_required, content_scope FROM user_access WHERE user_id = ?',
    [userId],
  )
  const access = rows[0]
  if (!access || access.status !== 'active') return null
  const role = effectiveRole(email, access.role, superAdminEmails)
  return {
    id: userId,
    email,
    role,
    rank: rank(role),
    // Editors and super admins are never scoped; only a reviewer's writes are
    // confined, and a reviewer with nothing assigned holds nothing.
    contentScope: rank(role) >= 2 ? null : readContentScope(access.content_scope),
    aal: payload.aal === 'aal2' ? 'aal2' : 'aal1',
    // Kept for students and reviewers who asked for a second factor
    // voluntarily. Admin and above are held to aal2 regardless — see
    // `mfaSatisfied`.
    mfaRequired: Boolean(access.mfa_required),
  }
}

/**
 * The identity behind a bearer token, or null.
 *
 * The same resolution `apiAuthGate` performs, exported for the one caller that
 * is not an Express request: the study-room WebSocket. A socket must be
 * authenticated by exactly the rules the HTTP routes use — two answers to "who
 * is this" is how a room ends up admitting somebody the API would refuse — and
 * this is the single implementation both of them run.
 *
 * Never throws. An unreadable, expired or forged token is simply no identity,
 * and the caller refuses on that; distinguishing the reasons would disclose
 * signature and account-state details, exactly as the gate declines to.
 */
export async function identityFromToken(token) {
  if (!token || !supabaseUrl) return null
  try {
    return await supabaseIdentity(token)
  } catch {
    return null
  }
}

export async function apiAuthGate(req, res, next) {
  if (!req.path.startsWith('/api')) return next()
  // Public by design, and each for the same reason: the caller cannot possibly
  // hold a session. A health probe has no user, Resend's webhook is a server,
  // and whoever follows an unsubscribe link is signed out in their inbox — or is
  // Gmail itself, POSTing one-click on their behalf. Guarding unsubscribe would
  // mean List-Unsubscribe advertising a control that answers 401, which costs
  // more in sender reputation than having no unsubscribe at all.
  //
  // It is safe to leave open: it accepts nothing but a 48-character opaque
  // token, returns 404 for anything it does not recognise, reads nothing back to
  // the caller, and can only ever add a suppression.
  //
  // `/api/accounts/exists` is on this list for the same reason: sign-up asks it
  // before an account exists, so there is no session to present. It was behind
  // the gate and answered 401 to every caller, which the sign-up form swallowed
  // — so the duplicate check it exists to perform never once ran. It answers
  // taken or not taken, nothing else, and carries its own rate limit.
  //
  // Meta's deletion callback is here for the same reason and is authenticated
  // its own way: Meta signs each call with the app secret, and the route
  // refuses anything whose `signed_request` does not verify — including every
  // call at all when no secret is configured. It sat behind this gate once and
  // therefore answered 401 to every deletion request Meta ever sent, which is
  // the failure this list exists to prevent.
  if (
    req.path === '/api/health'
    || req.path === '/api/webhooks/resend/inbound'
    || req.path === '/api/unsubscribe'
    || req.path === '/api/accounts/exists'
    || req.path === '/api/pricing/quote'
    || req.path === '/api/facebook/deletion-callback'
    // Native media elements cannot attach the Supabase bearer header. They use
    // a short-lived signed URL minted for an authenticated viewer instead.
    || ((req.method === 'GET' || req.method === 'HEAD') && req.path.startsWith('/api/media-playback/'))
  ) return next()

  const auth = req.header('authorization') || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''

  /**
   * Reading one shared document is answerable either way.
   *
   * A link to a note shared with a study group has to open for somebody who has
   * no account, and it has to keep opening for somebody whose token has since
   * expired — a stale session is not a reason to refuse a public page. So the
   * identity is resolved when there is one and the request continues when there
   * is not; `readShare` then decides, and answers 404 for a private share held
   * by somebody else. Only this exact shape is optional: the list, the create
   * and the update below it all require a session.
   */
  if (req.method === 'GET' && /^\/api\/shares\/[^/]+$/.test(req.path)) {
    if (token && supabaseUrl) {
      try {
        const identity = await supabaseIdentity(token)
        if (identity) req.identity = identity
      } catch { /* an unreadable token is simply no identity here */ }
    }
    return next()
  }

  // There is deliberately no bypass here. A shared secret that mints an admin
  // identity is indistinguishable from a stolen one, and the "no Supabase
  // configured" escape hatch that used to sit below turned every unauthenticated
  // request into an admin. Local development runs the front end in demo mode
  // (no VITE_API_BASE) or against a real Supabase project.
  if (token && supabaseUrl) {
    try {
      const identity = await supabaseIdentity(token)
      if (identity) {
        req.identity = identity
        return next()
      }
    } catch {
      // Do not disclose signature or account-state details.
    }
  }

  return res.status(401).json({ error: 'unauthorized' })
}

/**
 * Whether this identity has cleared its second-factor requirement.
 *
 * MFA used to be opt-in for everyone. For most console roles it is now a
 * consequence of rank: any account that can hand out console access — admin and
 * above — must present aal2. `reviewer` is deliberately exempt: it can open the
 * console but holds no role-management power, so it is not forced to enrol and
 * falls through to the opt-in path like a student. The `mfa_required` column
 * survives for anyone — student or reviewer — who asked for a factor voluntarily.
 *
 * Exported because `GET /api/state/:key` repeats the check inline and the two
 * must never disagree about what counts as sufficient.
 */
export function mfaSatisfied(identity) {
  if (!identity) return false
  if (mfaEnforced(identity.role)) return identity.aal === 'aal2'
  return !identity.mfaRequired || identity.aal === 'aal2'
}

/**
 * The role→tabs document, cached until it is written.
 *
 * Every guarded request reads it, so it cannot be a query per request. The
 * cache is dropped by `invalidateRoleTabs`, which the state route calls when
 * this key changes — the same invalidation shape the medical-resource snapshot
 * already uses.
 */
let roleTabsCache = null

export function invalidateRoleTabs() {
  roleTabsCache = null
}

async function roleTabs() {
  if (roleTabsCache) return roleTabsCache
  const [rows] = await pool.query('SELECT v FROM app_state WHERE k = ?', [ROLE_TABS_STATE_KEY])
  roleTabsCache = (rows.length ? safeParse(rows[0].v) : null) ?? {}
  return roleTabsCache
}

/** Every tab this identity holds. */
export async function heldTabs(identity) {
  if (!identity) return []
  return tabsForRole(identity.role, await roleTabs())
}

/**
 * A route belongs to a tab, and you must hold that tab.
 *
 * This is the whole permission model: hiding a tab in Access Control is not a
 * cosmetic change, it is this refusal.
 */
export function requireTab(...tabIds) {
  return async function guard(req, res, next) {
    if (!hasConsoleAccess(req.identity?.role)) return res.status(403).json({ error: 'console access required' })
    if (!mfaSatisfied(req.identity)) return res.status(403).json({ error: 'mfa_required' })
    try {
      if (!holdsTab(await heldTabs(req.identity), tabIds)) {
        return res.status(403).json({ error: 'that area is not part of your role' })
      }
    } catch (error) { return next(error) }
    return next()
  }
}

/** Any console role at all. Not sufficient on its own — see `requireTab`. */
export function requireConsole(req, res, next) {
  if (!hasConsoleAccess(req.identity?.role)) return res.status(403).json({ error: 'console access required' })
  if (!mfaSatisfied(req.identity)) return res.status(403).json({ error: 'mfa_required' })
  return next()
}

export function requireSuperAdmin(req, res, next) {
  if (req.identity?.role !== 'super_admin') return res.status(403).json({ error: 'super admin required' })
  if (!mfaSatisfied(req.identity)) return res.status(403).json({ error: 'mfa_required' })
  return next()
}

/** Explicit route-level guard for student/staff-only files. */
export function requireAuthenticated(req, res, next) {
  if (!req.identity) return res.status(401).json({ error: 'unauthorized' })
  return next()
}
