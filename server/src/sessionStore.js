/**
 * Server-held sessions, so the browser never holds a token.
 *
 * The browser gets one opaque cookie (`nsid`); the Supabase access and refresh
 * tokens live in the `sessions` table, encrypted, and only ever leave this
 * process on their way back to GoTrue. A stolen cookie is useless off this
 * origin, an XSS cannot read it, and signing somebody out is a DELETE rather
 * than a hope that every tab drops its localStorage.
 *
 * Native apps are unaffected: they keep presenting a bearer token, and
 * `apiAuthGate` still answers that path first.
 */
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto'
import { pool } from './db.js'

export const SESSION_COOKIE = 'nsid'
/** How long the cookie itself is offered for. Idle expiry below is the real limit. */
const COOKIE_MAX_AGE_SECONDS = 30 * 24 * 60 * 60
const IDLE_DAYS = 30
const ABSOLUTE_DAYS = 90
/** `last_seen_at` is a heartbeat, not an audit log — one write per session per five minutes. */
const TOUCH_INTERVAL = '5 MINUTE'

let cachedKey = null

/**
 * The key the tokens are sealed with.
 *
 * Resolved on first use rather than at import so a test (and `node --test`,
 * where env is set after the module graph is built) can supply one, and so a
 * process that never touches a cookie session never demands it.
 */
function encryptionKey() {
  if (cachedKey) return cachedKey
  const configured = process.env.SESSION_ENC_KEY
  if (configured) {
    const key = Buffer.from(configured, 'base64')
    if (key.length !== 32) throw new Error('SESSION_ENC_KEY must be 32 random bytes, base64-encoded')
    cachedKey = key
    return cachedKey
  }
  // Refusing to boot is the only safe answer in production: a random key per
  // process would sign everybody out on every deploy, and a fixed one in the
  // source is not a key at all.
  if (process.env.NODE_ENV === 'production') {
    throw new Error('SESSION_ENC_KEY is required in production — generate one with: openssl rand -base64 32')
  }
  console.warn('[security] SESSION_ENC_KEY is unset — using the fixed development key. Sessions are not confidential.')
  cachedKey = createHash('sha256').update('nishany-dev-session-key').digest()
  return cachedKey
}

/** iv || tag || ciphertext, AES-256-GCM. */
export function encryptToken(plain) {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', encryptionKey(), iv)
  const ciphertext = Buffer.concat([cipher.update(String(plain), 'utf8'), cipher.final()])
  return Buffer.concat([iv, cipher.getAuthTag(), ciphertext])
}

/** Throws on a tampered or wrong-key value; every caller here treats that as "no session". */
export function decryptToken(sealed) {
  const buffer = Buffer.isBuffer(sealed) ? sealed : Buffer.from(sealed)
  const decipher = createDecipheriv('aes-256-gcm', encryptionKey(), buffer.subarray(0, 12))
  decipher.setAuthTag(buffer.subarray(12, 28))
  return Buffer.concat([decipher.update(buffer.subarray(28)), decipher.final()]).toString('utf8')
}

/** The cookie carries the secret; the table stores only its hash, like a password. */
export function sessionId(raw) {
  return createHash('sha256').update(String(raw)).digest('hex')
}

/**
 * `undefined` means the production default; an explicit empty string means "no
 * Domain attribute at all", which is what plain `localhost` needs — a cookie
 * with any Domain is rejected there.
 */
function cookieDomain() {
  const configured = process.env.SESSION_COOKIE_DOMAIN
  return (configured === undefined ? '.nishany.com' : configured.trim())
}

export function sessionCookieHeader(raw, maxAge = COOKIE_MAX_AGE_SECONDS) {
  const parts = [`${SESSION_COOKIE}=${raw}`, 'Path=/', 'HttpOnly', 'SameSite=Lax', `Max-Age=${maxAge}`]
  const domain = cookieDomain()
  if (domain) parts.push(`Domain=${domain}`)
  // Secure in production only: dev runs on plain http and a Secure cookie is
  // silently dropped there, which reads as "login does nothing".
  if (process.env.NODE_ENV === 'production') parts.push('Secure')
  return parts.join('; ')
}

/** One regex over the header — a cookie parser is a dependency for a substring. */
export function readSessionCookie(req) {
  const header = req?.headers?.cookie
  if (!header) return null
  const match = new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]*)`).exec(header)
  return match?.[1] ? decodeURIComponent(match[1]) : null
}

export function setSessionCookie(res, raw) {
  res.append('Set-Cookie', sessionCookieHeader(raw))
}

export function clearSessionCookie(res) {
  res.append('Set-Cookie', sessionCookieHeader('', 0))
}

export async function createSession({ userId, accessToken, refreshToken, expiresAt, aal = 'aal1', userAgent = null }) {
  const raw = randomBytes(32).toString('base64url')
  await pool.query(
    `INSERT INTO sessions (id, user_id, refresh_token, access_token, access_expires_at, aal, user_agent)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      sessionId(raw),
      String(userId),
      encryptToken(refreshToken),
      encryptToken(accessToken),
      expiresAt instanceof Date ? expiresAt : new Date(expiresAt),
      aal === 'aal2' ? 'aal2' : 'aal1',
      userAgent ? String(userAgent).slice(0, 255) : null,
    ],
  )
  return raw
}

/**
 * The row behind a cookie, or null.
 *
 * Idle and absolute expiry are asked of the database rather than compared here
 * so both clocks are the same clock. A row that fails either test simply does
 * not come back; `sweepIdle` deletes it later.
 */
export async function loadSession(raw) {
  if (!raw) return null
  const [rows] = await pool.query(
    `SELECT id, user_id AS userId, refresh_token AS refreshToken, access_token AS accessToken,
            access_expires_at AS accessExpiresAt, aal, created_at AS createdAt, last_seen_at AS lastSeenAt,
            TIMESTAMPDIFF(SECOND, created_at, NOW()) AS ageSeconds
       FROM sessions
      WHERE id = ?
        AND last_seen_at > NOW() - INTERVAL ${IDLE_DAYS} DAY
        AND created_at   > NOW() - INTERVAL ${ABSOLUTE_DAYS} DAY`,
    [sessionId(raw)],
  )
  const row = rows[0]
  if (!row) return null
  try {
    return {
      ...row,
      accessToken: decryptToken(row.accessToken),
      refreshToken: decryptToken(row.refreshToken),
      accessExpiresAt: new Date(row.accessExpiresAt),
    }
  } catch {
    // Unreadable means the key changed or the row was tampered with. Either
    // way there is no session here, and the row is dead weight.
    await destroySession(row.id)
    return null
  }
}

export async function saveTokens(id, { accessToken, refreshToken, expiresAt, aal }) {
  await pool.query(
    `UPDATE sessions
        SET access_token = ?, refresh_token = ?, access_expires_at = ?, aal = COALESCE(?, aal)
      WHERE id = ?`,
    [
      encryptToken(accessToken),
      encryptToken(refreshToken),
      expiresAt instanceof Date ? expiresAt : new Date(expiresAt),
      aal === 'aal1' || aal === 'aal2' ? aal : null,
      id,
    ],
  )
}

/**
 * Idle expiry needs a heartbeat; a write per request would not be one.
 *
 * Called on every authenticated request, so the SQL is throttled by
 * `last_seen_at` — but that still ran an UPDATE (grabbing a pool connection and
 * a row lock on the session) on every request, only to match zero rows. An
 * in-memory guard skips the round trip entirely between heartbeats, so a page
 * firing 25 requests at once does one touch, not 25. The interval here is
 * shorter than the SQL's so the DB stays the source of truth across processes.
 */
const lastTouchAt = new Map()
const TOUCH_MEMO_MS = 60_000
export async function touchSession(id) {
  const now = Date.now()
  const prev = lastTouchAt.get(id)
  if (prev && now - prev < TOUCH_MEMO_MS) return
  lastTouchAt.set(id, now)
  // Bound the map: this is a heartbeat memo, not a session store.
  if (lastTouchAt.size > 10_000) {
    for (const key of lastTouchAt.keys()) {
      if (now - lastTouchAt.get(key) >= TOUCH_MEMO_MS) lastTouchAt.delete(key)
    }
  }
  await pool.query(
    `UPDATE sessions SET last_seen_at = NOW()
      WHERE id = ? AND last_seen_at < NOW() - INTERVAL ${TOUCH_INTERVAL}`,
    [id],
  )
}

/** A new cookie value for the same session — after MFA and after a password change. */
export async function rotateSession(id) {
  const raw = randomBytes(32).toString('base64url')
  await pool.query('UPDATE sessions SET id = ?, last_seen_at = NOW() WHERE id = ?', [sessionId(raw), id])
  return raw
}

export async function destroySession(id) {
  await pool.query('DELETE FROM sessions WHERE id = ?', [id])
}

export async function destroyUserSessions(userId, exceptId = null) {
  await pool.query(
    exceptId
      ? 'DELETE FROM sessions WHERE user_id = ? AND id <> ?'
      : 'DELETE FROM sessions WHERE user_id = ?',
    exceptId ? [String(userId), exceptId] : [String(userId)],
  )
}

/** Housekeeping: rows nobody can present any more. */
export async function sweepIdle() {
  const [result] = await pool.query(
    `DELETE FROM sessions
      WHERE last_seen_at < NOW() - INTERVAL ${IDLE_DAYS} DAY
         OR created_at   < NOW() - INTERVAL ${ABSOLUTE_DAYS} DAY`,
  )
  return result?.affectedRows ?? 0
}
