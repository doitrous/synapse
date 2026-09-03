/**
 * Sign-in, sign-up, recovery, OAuth and MFA — as server routes.
 *
 * The browser used to hold a Supabase session in localStorage and talk to
 * GoTrue directly. Now it holds one opaque cookie and talks to us; we talk to
 * GoTrue (`goTrue.js`) and keep the tokens (`sessionStore.js`). Three things
 * follow, and they are the reason for the move: a token no script can read, a
 * sign-out that actually ends every session, and one session shared by both
 * portal hostnames — no more handing a session across origins in a URL.
 *
 * Native clients are untouched. They still POST to Supabase themselves and
 * present a bearer token; every route here that needs a caller accepts either.
 */
import express from 'express'
import { createHash, randomBytes } from 'node:crypto'
import * as goTrue from './goTrue.js'
import { expiryFrom, hasVerifiedTotp, tokenAal } from './goTrue.js'
import {
  clearSessionCookie,
  createSession,
  decryptToken,
  destroyUserSessions,
  encryptToken,
  loadSession,
  readSessionCookie,
  rotateSession,
  saveTokens,
  setSessionCookie,
} from './sessionStore.js'
import { clearLimit, clientIp, limit, lock, lockedFor, rateLimited } from './rateLimit.js'

const MINUTE = 60_000
const HOUR = 60 * MINUTE
const OAUTH_COOKIE = 'nsoauth'
const OAUTH_TTL_SECONDS = 600

export const router = express.Router()

/**
 * Only a path inside this app is somewhere we will send a browser.
 *
 * A server-side port of `safeNext` in Login.tsx, and the reason it exists is
 * the same: an absolute or protocol-relative `next` turns our own sign-in into
 * a redirector to somebody else's site. `/\evil.com` is protocol-relative in
 * every browser, so a backslash is rejected alongside the second slash.
 */
export function safeNext(value) {
  if (typeof value !== 'string' || !value.startsWith('/')) return '/app'
  if (/^\/[\\/]/.test(value)) return '/app'
  return value
}

function requestOrigin(req) {
  return `${req.protocol}://${req.get('host')}`
}

function readCookie(req, name) {
  const header = req?.headers?.cookie
  if (!header) return null
  const match = new RegExp(`(?:^|;\\s*)${name}=([^;]*)`).exec(header)
  return match?.[1] ? decodeURIComponent(match[1]) : null
}

function emailHash(email) {
  return createHash('sha256').update(String(email).toLowerCase()).digest('hex').slice(0, 16)
}

function bearerToken(req) {
  const header = req.header('authorization') || ''
  return header.startsWith('Bearer ') ? header.slice(7) : ''
}

/**
 * The caller's access token, however they authenticated.
 *
 * `apiAuthGate` has already decided they are somebody; this is only about which
 * token to forward to GoTrue. A cookie caller's session row comes back too, so
 * MFA can rotate it.
 */
async function callerToken(req) {
  const bearer = bearerToken(req)
  if (bearer) return { token: bearer, session: null }
  const session = req.sessionRow ?? await loadSession(readSessionCookie(req))
  return session ? { token: session.accessToken, session } : null
}

/** GoTrue's own status codes, minus the ones that would mislead a browser. */
function fail(res, error) {
  const status = error.status === 400 || error.status === 422 ? 400 : error.status
  return res.status(status).json({ error: error.code, message: error.message })
}

const wrap = (fn) => (req, res) => Promise.resolve(fn(req, res)).catch((error) => {
  console.error('[auth]', error)
  res.status(500).json({ error: 'server_error' })
})

/** Everything a successful grant implies: a row, a cookie, and the aal it carries. */
async function startSession(req, res, grant) {
  const raw = await createSession({
    userId: grant.user?.id ?? grant.id,
    accessToken: grant.access_token,
    refreshToken: grant.refresh_token,
    expiresAt: expiryFrom(grant),
    aal: tokenAal(grant.access_token),
    userAgent: req.get('user-agent'),
  })
  setSessionCookie(res, raw)
  return raw
}

// ---------------------------------------------------------------- sign in

router.post('/login', wrap(async (req, res) => {
  const email = String(req.body?.email ?? '').trim().toLowerCase()
  const password = String(req.body?.password ?? '')
  if (!email || !password) return res.status(400).json({ error: 'invalid_credentials', message: 'Enter your email and password.' })

  const ip = clientIp(req)
  const hashed = emailHash(email)
  const lockKey = `login:lock:${hashed}`

  const locked = lockedFor(lockKey)
  if (locked) {
    res.setHeader('Retry-After', String(locked))
    return res.status(429).json({ error: 'too_many_attempts', retryAfter: locked })
  }
  for (const [key, max, windowMs] of [
    [`login:ip:${ip}`, 20, 15 * MINUTE],
    [`login:email:${hashed}`, 5, 15 * MINUTE],
  ]) {
    const verdict = limit(key, max, windowMs)
    if (!verdict.ok) {
      console.warn('[security]', { event: 'rate_limited', name: 'login', ip, emailHash: hashed })
      res.setHeader('Retry-After', String(verdict.retryAfter))
      return res.status(429).json({ error: 'too_many_attempts', retryAfter: verdict.retryAfter })
    }
  }

  const { data, error } = await goTrue.passwordGrant(email, password)
  if (error) {
    console.warn('[security]', { event: 'login_failed', ip, emailHash: hashed, code: error.code })
    // Five failures buy fifteen minutes. Counted separately from the attempt
    // windows above so a correct password always gets through until then.
    if (!limit(`login:fail:${hashed}`, 5, 15 * MINUTE).ok) lock(lockKey, 15 * MINUTE)
    return res.status(error.status === 400 ? 401 : error.status).json({ error: error.code, message: error.message })
  }

  clearLimit(`login:fail:${hashed}`)
  clearLimit(lockKey)
  await startSession(req, res, data)
  // aal1 plus an enrolled factor means "signed in, but not finished" — the page
  // sends them to the challenge instead of the app.
  res.json({ ok: true, mfaPending: hasVerifiedTotp(data.user) && tokenAal(data.access_token) === 'aal1' })
}))

/**
 * POST only, and it ends every session this account holds.
 *
 * A GET would let an <img> on any page sign somebody out; and a sign-out that
 * only dropped this browser's cookie would leave the refresh token alive on the
 * server, which is the failure the whole cookie move exists to remove.
 */
router.post('/logout', wrap(async (req, res) => {
  const session = req.sessionRow ?? await loadSession(readSessionCookie(req))
  const token = session?.accessToken || bearerToken(req)
  if (token) await goTrue.logout(token, 'global')
  if (session) await destroyUserSessions(session.userId)
  clearSessionCookie(res)
  res.status(204).end()
}))

// ---------------------------------------------------------------- sign up

router.post('/signup', rateLimited('signup', clientIp, 10, HOUR), wrap(async (req, res) => {
  const email = String(req.body?.email ?? '').trim().toLowerCase()
  const password = String(req.body?.password ?? '')
  if (!email || !password) return res.status(400).json({ error: 'invalid_request', message: 'Enter an email and a password.' })

  const { data, error } = await goTrue.signup({
    email,
    password,
    data: req.body?.data && typeof req.body.data === 'object' ? req.body.data : undefined,
    redirectTo: `${requestOrigin(req)}/auth/verify-email`,
  })
  if (error) return fail(res, error)

  // Supabase answers a sign-up for an address that already exists with a
  // success and an obfuscated user carrying no identities, so the form cannot
  // be used to enumerate accounts. Signup.tsx reads exactly this to send the
  // person to sign in rather than leaving them waiting for an email about a
  // password they did not set — so the discriminator is preserved here.
  const user = data?.user ?? data
  res.json({
    ok: true,
    alreadyRegistered: Array.isArray(user?.identities) && user.identities.length === 0,
    // A session in hand means this project does not require confirmation.
    session: Boolean(data?.access_token || data?.session),
  })
}))

router.post('/resend', rateLimited('resend', clientIp, 10, HOUR), wrap(async (req, res) => {
  const email = String(req.body?.email ?? '').trim().toLowerCase()
  const type = req.body?.type === 'email_change' ? 'email_change' : 'signup'
  if (email) await goTrue.resend(type, email, `${requestOrigin(req)}/auth/verify-email`)
  // Always 200: whether that address is waiting on a confirmation is not
  // something an unauthenticated caller gets to learn.
  res.json({ ok: true })
}))

// ---------------------------------------------------------------- recovery

router.post('/recover', rateLimited('recover', clientIp, 10, HOUR), wrap(async (req, res) => {
  const email = String(req.body?.email ?? '').trim().toLowerCase()
  if (email && limit(`recover:email:${emailHash(email)}`, 3, HOUR).ok) {
    await goTrue.recover(email, `${requestOrigin(req)}/auth/reset-password`)
  }
  // Always 200, always the same body. Anything else is an account-existence
  // oracle, and the rate limit above must not become one either.
  res.json({ ok: true })
}))

/**
 * Set a new password, then evict every other session.
 *
 * A password change is what somebody does after they suspect a device is
 * compromised. Leaving that device's session alive would make the act
 * ceremonial, so GoTrue is told to drop the others and the rows go with them.
 * This session survives with a fresh cookie id.
 */
router.put('/password', wrap(async (req, res) => {
  const password = String(req.body?.password ?? '')
  if (password.length < 8) return res.status(400).json({ error: 'weak_password', message: 'Use at least 8 characters.' })
  const session = req.sessionRow ?? await loadSession(readSessionCookie(req))
  if (!session) return res.status(401).json({ error: 'unauthorized' })

  const { error } = await goTrue.updateUser(session.accessToken, { password })
  if (error) return fail(res, error)

  await goTrue.logout(session.accessToken, 'others')
  await destroyUserSessions(session.userId, session.id)
  setSessionCookie(res, await rotateSession(session.id))
  res.json({ ok: true })
}))

/**
 * Where a confirmation or recovery email lands.
 *
 * The link must point here rather than at the SPA: Supabase's default
 * `ConfirmationURL` puts the token in the URL fragment, which never reaches a
 * server. The template has to name `{{ .SiteURL }}/api/auth/verify?token_hash=…`.
 */
router.get('/verify', wrap(async (req, res) => {
  const tokenHash = String(req.query.token_hash ?? '')
  const type = String(req.query.type ?? 'email')
  const next = safeNext(typeof req.query.next === 'string' ? req.query.next : null)
  if (!tokenHash) return res.redirect(302, '/login?error=verify_failed')

  const { data, error } = await goTrue.verify(type, tokenHash)
  if (error || !data?.access_token) return res.redirect(302, '/login?error=verify_failed')
  await startSession(req, res, data)
  res.redirect(302, next)
}))

// ---------------------------------------------------------------- OAuth (PKCE)

function setOAuthCookie(res, value) {
  const parts = [`${OAUTH_COOKIE}=${value}`, 'Path=/api/auth/callback', 'HttpOnly', 'SameSite=Lax', `Max-Age=${value ? OAUTH_TTL_SECONDS : 0}`]
  if (process.env.NODE_ENV === 'production') parts.push('Secure')
  res.append('Set-Cookie', parts.join('; '))
}

/**
 * Start a provider sign-in.
 *
 * The PKCE verifier is ours, not the page's, so it is kept in a cookie the
 * browser cannot read and only sends back to the one path that needs it. `next`
 * rides along in the same cookie rather than in the redirect URL, where the
 * provider would echo it back to us unvalidated.
 */
router.get('/oauth/:provider', wrap(async (req, res) => {
  const provider = String(req.params.provider ?? '')
  const base = process.env.SUPABASE_URL?.replace(/\/$/, '')
  if (!base || !/^[a-z0-9_]{2,32}$/.test(provider)) return res.redirect(302, '/login?error=oauth')

  const verifier = randomBytes(32).toString('base64url')
  const challenge = createHash('sha256').update(verifier).digest('base64url')
  const next = safeNext(typeof req.query.next === 'string' ? req.query.next : null)
  setOAuthCookie(res, encryptToken(JSON.stringify({ verifier, next })).toString('base64url'))

  const params = new URLSearchParams({
    provider,
    flow_type: 'pkce',
    code_challenge: challenge,
    code_challenge_method: 'S256',
    redirect_to: `${requestOrigin(req)}/api/auth/callback`,
  })
  res.redirect(302, `${base}/auth/v1/authorize?${params}`)
}))

router.get('/callback', wrap(async (req, res) => {
  const sealed = readCookie(req, OAUTH_COOKIE)
  setOAuthCookie(res, '')
  const code = String(req.query.code ?? '')
  let stash = null
  try { stash = sealed ? JSON.parse(decryptToken(Buffer.from(sealed, 'base64url'))) : null } catch { stash = null }
  if (!code || !stash?.verifier) return res.redirect(302, '/login?error=oauth')

  const { data, error } = await goTrue.pkceGrant(code, stash.verifier)
  if (error || !data?.access_token) return res.redirect(302, '/login?error=oauth')
  await startSession(req, res, data)
  res.redirect(302, safeNext(stash.next))
}))

// ---------------------------------------------------------------- MFA

router.get('/mfa/factors', wrap(async (req, res) => {
  const caller = await callerToken(req)
  if (!caller) return res.status(401).json({ error: 'unauthorized' })
  const { data, error } = await goTrue.factors.list(caller.token)
  if (error) return fail(res, error)
  res.json({
    factors: data.factors.map((factor) => ({
      id: factor.id,
      friendlyName: factor.friendly_name ?? null,
      factorType: factor.factor_type ?? 'totp',
      status: factor.status,
    })),
  })
}))

router.post('/mfa/enroll', wrap(async (req, res) => {
  const caller = await callerToken(req)
  if (!caller) return res.status(401).json({ error: 'unauthorized' })
  const { data, error } = await goTrue.factors.enroll(caller.token, { friendlyName: req.body?.friendlyName })
  if (error) return fail(res, error)
  res.json({ id: data.id, type: data.type ?? 'totp', totp: data.totp ?? null })
}))

router.post('/mfa/challenge', wrap(async (req, res) => {
  const caller = await callerToken(req)
  if (!caller) return res.status(401).json({ error: 'unauthorized' })
  const factorId = String(req.body?.factorId ?? '')
  if (!factorId) return res.status(400).json({ error: 'invalid_request' })
  const { data, error } = await goTrue.factors.challenge(caller.token, factorId)
  if (error) return fail(res, error)
  res.json({ id: data.id, expiresAt: data.expires_at ?? null })
}))

/**
 * The second factor, and the session's promotion to aal2.
 *
 * GoTrue answers with a new pair of tokens carrying the higher assurance level,
 * so the stored pair is replaced — and the cookie id is rotated, because the
 * session this browser now holds is not the one it authenticated with.
 */
router.post('/mfa/verify', wrap(async (req, res) => {
  const caller = await callerToken(req)
  if (!caller) return res.status(401).json({ error: 'unauthorized' })
  const factorId = String(req.body?.factorId ?? '')
  const challengeId = String(req.body?.challengeId ?? '')
  const code = String(req.body?.code ?? '')
  if (!factorId || !challengeId || !code) return res.status(400).json({ error: 'invalid_request' })

  const verdict = limit(`mfa:${factorId}`, 5, 15 * MINUTE)
  if (!verdict.ok) {
    console.warn('[security]', { event: 'rate_limited', name: 'mfa_verify', ip: clientIp(req) })
    res.setHeader('Retry-After', String(verdict.retryAfter))
    return res.status(429).json({ error: 'too_many_attempts', retryAfter: verdict.retryAfter })
  }

  const { data, error } = await goTrue.factors.verify(caller.token, factorId, { challengeId, code })
  if (error) return fail(res, error)

  if (caller.session && data?.access_token) {
    await saveTokens(caller.session.id, {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: expiryFrom(data),
      aal: tokenAal(data.access_token),
    })
    setSessionCookie(res, await rotateSession(caller.session.id))
  }
  res.json({ ok: true, aal: data?.access_token ? tokenAal(data.access_token) : 'aal2' })
}))

router.delete('/mfa/factors/:id', wrap(async (req, res) => {
  const caller = await callerToken(req)
  if (!caller) return res.status(401).json({ error: 'unauthorized' })
  const { error } = await goTrue.factors.unenroll(caller.token, String(req.params.id))
  if (error) return fail(res, error)
  res.json({ ok: true })
}))

export default router
