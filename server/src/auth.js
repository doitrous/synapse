import { createRemoteJWKSet, jwtVerify } from 'jose'
import { pool } from './db.js'

const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, '')
const issuer = supabaseUrl ? `${supabaseUrl}/auth/v1` : null
const jwks = issuer ? createRemoteJWKSet(new URL(`${issuer}/.well-known/jwks.json`)) : null

export const bypassEnabled = process.env.AUTH_BYPASS_ENABLED !== 'false'

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
    'SELECT role, status FROM user_access WHERE user_id = ?',
    [userId],
  )
  const access = rows[0]
  if (!access || access.status !== 'active') return null
  return {
    id: userId,
    email,
    role: access.role,
    aal: payload.aal === 'aal2' ? 'aal2' : 'aal1',
    bypass: false,
  }
}

export async function apiAuthGate(req, res, next) {
  if (!req.path.startsWith('/api')) return next()
  if (req.path === '/api/health' || req.path === '/api/webhooks/resend/inbound') return next()

  const auth = req.header('authorization') || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  const previewToken = process.env.API_BEARER

  // Temporary owner preview. It deliberately remains available until the user
  // explicitly disables AUTH_BYPASS_ENABLED. The server still requires the
  // private preview token; the portal switch itself is not an authorization
  // claim.
  if (bypassEnabled && previewToken && token === previewToken) {
    req.identity = {
      id: 'preview-owner',
      email: 'preview@synapse.local',
      role: 'admin',
      aal: 'aal2',
      bypass: true,
    }
    return next()
  }

  // Local development stays usable when neither auth system is configured.
  if (bypassEnabled && !previewToken && !supabaseUrl) {
    req.identity = { id: 'preview-owner', email: null, role: 'admin', aal: 'aal2', bypass: true }
    return next()
  }

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
  if (!req.identity.bypass && req.identity.aal !== 'aal2') {
    return res.status(403).json({ error: 'mfa_required' })
  }
  return next()
}
