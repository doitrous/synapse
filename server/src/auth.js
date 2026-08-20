import { createRemoteJWKSet, jwtVerify } from 'jose'
import { pool } from './db.js'
import { effectiveRole, hasConsoleAccess, parseSuperAdminEmails, rank } from './roles.js'

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
  await pool.query(
    `INSERT INTO user_access (user_id, email, role) VALUES (?, ?, 'student')
     ON DUPLICATE KEY UPDATE email = COALESCE(VALUES(email), email)`,
    [userId, email],
  )
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
    // Kept for students who asked for a second factor voluntarily. Console
    // roles are held to aal2 regardless — see `mfaSatisfied`.
    mfaRequired: Boolean(access.mfa_required),
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
  if (req.path === '/api/health' || req.path === '/api/webhooks/resend/inbound' || req.path === '/api/unsubscribe') return next()

  const auth = req.header('authorization') || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''

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
 * MFA used to be opt-in for everyone. It is now a consequence of rank: any
 * account that can open the console must present aal2, because the console
 * decides who else can open it. The `mfa_required` column survives for students
 * who asked for a second factor voluntarily.
 *
 * Exported because `GET /api/state/:key` repeats the check inline and the two
 * must never disagree about what counts as sufficient.
 */
export function mfaSatisfied(identity) {
  if (!identity) return false
  if (hasConsoleAccess(identity.role)) return identity.aal === 'aal2'
  return !identity.mfaRequired || identity.aal === 'aal2'
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

/** Temporary: every caller moves to `requireTab` in the next task, then this goes. */
export const requireAdmin = requireConsole
