/**
 * The Android half of the Question-of-the-Day reminder — sent through
 * Firebase Cloud Messaging's HTTP v1 API.
 *
 * There is no Firebase project behind this yet (see
 * `docs/qotd-android-push-enablement.md`), so this module is written to be
 * inert until one exists: `readServiceAccount` returns null when
 * `FCM_SERVICE_ACCOUNT` is unset, and `sendFcmAlert` no-ops on that null
 * rather than throwing. That is what lets this ship ahead of the Firebase
 * project — an unconfigured server sends nothing, and the rest of the
 * reminder dispatch (email, web push, iOS) goes on working exactly as it did.
 *
 * HTTP v1 authenticates with a short-lived OAuth2 access token rather than
 * the legacy server key, so sending one push means minting one first: sign a
 * JWT asserting this service account (`crypto`, RS256 — Google's token
 * endpoint, unlike Apple's gateway, wants the ordinary PKCS#1 encoding, not
 * the raw r‖s pair APNs needs), exchange it at Google's token endpoint, and
 * cache the result for less than its real hour so a slow clock never sends a
 * token Google has already expired.
 *
 * Only Node built-ins (`crypto`, global `fetch`) are used — no new dependency
 * for a server that has to keep running for years.
 */

import crypto from 'node:crypto'
import { pool } from './db.js'

const TOKEN_ENDPOINT_FALLBACK = 'https://oauth2.googleapis.com/token'
const FCM_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging'

/** Google issues the token for an hour; refreshing a little early keeps every send inside its window. */
const TOKEN_LIFETIME_MS = 55 * 60 * 1000

/**
 * The service account, or null when none is configured.
 *
 * Accepted either as the raw JSON key file's contents or as that JSON
 * base64-encoded, because a multi-line JSON secret with embedded newlines
 * (inside `private_key`) survives very few deployment forms intact — the
 * same reasoning `server/src/push.js`'s `readConfig` applies to the APNs key.
 */
export function readServiceAccount(env = process.env) {
  const raw = (env.FCM_SERVICE_ACCOUNT || '').trim()
  if (!raw) return null
  const text = raw.startsWith('{') ? raw : decodeBase64(raw)
  if (!text) return null
  try {
    const parsed = JSON.parse(text)
    if (!parsed?.project_id || !parsed?.client_email || !parsed?.private_key) return null
    return parsed
  } catch {
    return null
  }
}

function decodeBase64(value) {
  try {
    const decoded = Buffer.from(value, 'base64').toString('utf8')
    return decoded.trim().startsWith('{') ? decoded : ''
  } catch {
    return ''
  }
}

export function isConfigured(account = readServiceAccount()) {
  return Boolean(account)
}

/* ── The access token ────────────────────────────────────────────────────── */

function base64url(value) {
  return Buffer.from(value).toString('base64url')
}

/**
 * The self-signed JWT Google's token endpoint exchanges for an access token.
 *
 * This is the OAuth2 "service account" assertion, not a token sent to FCM
 * itself — `sendFcmAlert` only ever presents the bearer token this earns.
 */
export function buildAssertion(account, now = Date.now()) {
  const iat = Math.floor(now / 1000)
  const exp = iat + 3600
  const header = { alg: 'RS256', typ: 'JWT' }
  const claims = {
    iss: account.client_email,
    scope: FCM_SCOPE,
    aud: account.token_uri || TOKEN_ENDPOINT_FALLBACK,
    iat,
    exp,
  }
  const body = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claims))}`
  const signature = crypto.sign('RSA-SHA256', Buffer.from(body), account.private_key)
  return `${body}.${signature.toString('base64url')}`
}

let cached = { token: null, at: 0, clientEmail: null }

/** Test seam: the token cache is process-wide and would otherwise leak between tests. */
export function resetFcmTokenCache() {
  cached = { token: null, at: 0, clientEmail: null }
}

async function accessToken(account, now = Date.now()) {
  if (cached.token && cached.clientEmail === account.client_email && now - cached.at < TOKEN_LIFETIME_MS) {
    return cached.token
  }
  const assertion = buildAssertion(account, now)
  const tokenUri = account.token_uri || TOKEN_ENDPOINT_FALLBACK
  const response = await fetch(tokenUri, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  })
  if (!response.ok) throw new Error(`FCM token exchange failed: ${response.status}`)
  const data = await response.json()
  if (!data?.access_token) throw new Error('FCM token exchange returned no access_token')
  cached = { token: data.access_token, at: now, clientEmail: account.client_email }
  return cached.token
}

/* ── Sending ─────────────────────────────────────────────────────────────── */

/**
 * The FCM HTTP v1 message envelope for one device.
 *
 * Pure and side-effect free so the shape can be asserted without a network —
 * `sendFcmAlert` is the only caller, but the split mirrors how
 * `server/src/push.js` separates `buildPayload` from the send that uses it.
 * `data` values must all be strings by FCM's contract, so `path` is coerced
 * even though it is already a string in every call this app makes today.
 */
export function buildFcmMessage(device, notification) {
  return {
    message: {
      token: device.token,
      notification: {
        title: notification.title,
        body: notification.body,
      },
      data: {
        path: String(notification.path ?? ''),
      },
    },
  }
}

/**
 * Whether a send failure means the token is dead rather than the send unlucky.
 *
 * FCM reports a deleted registration either as a plain 404 or as a 200-shaped
 * error body carrying `error.status === 'UNREGISTERED'`, depending on the
 * exact failure; both are treated the same way `push.js` treats APNs' 410.
 */
export function isTokenDead(status, errorStatus) {
  return status === 404 || errorStatus === 'UNREGISTERED' || errorStatus === 'NOT_FOUND'
}

/**
 * Send one Android alert push via FCM HTTP v1.
 *
 * No-op (`false`) when `FCM_SERVICE_ACCOUNT` is absent or the device has no
 * token — this is what keeps Android reminders dormant until a Firebase
 * project exists. Never throws: a bad send here must not fail the reminder
 * dispatch loop it is called from.
 */
export async function sendFcmAlert(device, notification) {
  const account = readServiceAccount()
  if (!account || !device?.token) return false

  let token
  try {
    token = await accessToken(account)
  } catch (error) {
    console.error('FCM token mint failed', error?.message)
    return false
  }

  try {
    const response = await fetch(
      `https://fcm.googleapis.com/v1/projects/${account.project_id}/messages:send`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(buildFcmMessage(device, notification)),
      },
    )
    if (response.ok) return true

    let errorStatus = null
    try {
      const body = await response.json()
      errorStatus = body?.error?.status ?? null
    } catch { /* not JSON */ }

    if (isTokenDead(response.status, errorStatus)) {
      // FCM says this registration is gone. Removing the row is the only way
      // the table does not fill with tokens for apps deleted years ago —
      // same reasoning as `push.js`'s dead-token cleanup for APNs.
      await pool.query('DELETE FROM device_tokens WHERE token = ?', [device.token]).catch(() => {})
    }
    return false
  } catch (error) {
    console.error('FCM send failed', error?.message)
    return false
  }
}
