import { createRemoteJWKSet, jwtVerify } from 'jose'
import { pool } from './db.js'

const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, '')
const issuer = supabaseUrl ? `${supabaseUrl}/auth/v1` : null
const jwks = issuer ? createRemoteJWKSet(new URL(`${issuer}/.well-known/jwks.json`)) : null

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
    'SELECT role, status, mfa_required FROM user_access WHERE user_id = ?',
    [userId],
  )
  const access = rows[0]
  if (!access || access.status !== 'active') return null
  return {
    id: userId,
    email,
    role: access.role,
    aal: payload.aal === 'aal2' ? 'aal2' : 'aal1',
    // Opt-in second factor. Nobody is locked out for not having enrolled;
    // an account that has asked to be held to aal2 is.
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
    || req.path === '/api/facebook/deletion-callback'
  ) return next()

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

export function requireAdmin(req, res, next) {
  if (req.identity?.role !== 'admin') return res.status(403).json({ error: 'admin role required' })
  if (!mfaSatisfied(req.identity)) return res.status(403).json({ error: 'mfa_required' })
  return next()
}

/**
 * Whether this identity has cleared its own second-factor requirement.
 *
 * MFA is opt-in: an account that has not asked for it is not held to aal2.
 * Exported because `GET /api/state/:key` repeats the admin check inline and the
 * two must never disagree about what counts as sufficient.
 */
export function mfaSatisfied(identity) {
  return !identity?.mfaRequired || identity.aal === 'aal2'
}

/** Explicit route-level guard for student/staff-only files. */
export function requireAuthenticated(req, res, next) {
  if (!req.identity) return res.status(401).json({ error: 'unauthorized' })
  return next()
}
