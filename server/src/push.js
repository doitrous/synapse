/**
 * The silent nudge that makes sync feel instant.
 *
 * When a student changes something on one device, their *other* devices are
 * sent a `content-available` push carrying no content — only the fact that
 * something of theirs moved. Each then refreshes through the ordinary sync
 * path. The payload is deliberately not the change: APNs does not promise
 * delivery, and a design where the push carries the data makes delivery a
 * correctness problem. Here a dropped nudge costs nothing, because the next
 * refresh finds the same change anyway.
 *
 * Two built-ins do the whole job — `crypto` signs the ES256 token Apple wants,
 * and `http2` speaks the only protocol its gateway accepts — so this adds no
 * dependency to a server that has to keep running for years.
 *
 * Everything here is inert until an APNs key is configured. That is what lets
 * the feature ship before the credentials exist: an unconfigured server does
 * not nudge, and sync goes on working exactly as it did.
 */

import crypto from 'node:crypto'
import http2 from 'node:http2'
import { pool } from './db.js'

const PRODUCTION = 'https://api.push.apple.com'
const SANDBOX = 'https://api.sandbox.push.apple.com'

/**
 * A device token is opaque to us, so the only thing worth checking is that it
 * looks like one rather than like a mistake. APNs issues hex, but pinning the
 * exact length would mean a future token format silently failing to register,
 * which is a hard problem to notice — nobody reports the notification they
 * never received.
 *
 * Here rather than in a route file because both the device routes and the
 * per-user state write (which excludes the calling device from the nudge) read
 * a token off a request, and one of them must not drift from the other.
 */
export function normaliseDeviceToken(value) {
  const token = typeof value === 'string' ? value.trim() : ''
  if (token.length < 32 || token.length > 255) return null
  return /^[A-Za-z0-9]+$/.test(token) ? token : null
}

/** Apple rejects a token older than an hour and refuses one refreshed too often. */
const TOKEN_LIFETIME_MS = 45 * 60 * 1000

/**
 * At most one nudge per student per window.
 *
 * Answering a question writes progress, and a student working through a block
 * writes one every few seconds. Without this, a single sitting would spend a
 * hundred pushes to say the same thing, and iOS answers that by delivering
 * fewer of them — including the one that mattered.
 */
const NUDGE_WINDOW_MS = 10_000
const lastNudgeAt = new Map()

/**
 * Whether this student is due another nudge, recording it if so.
 *
 * Separated out because it is the one piece of judgement here that is worth
 * testing on its own: the rest of `sendSilentNudge` needs a gateway and a
 * database, and this needs neither.
 */
export function claimNudgeSlot(userId, now = Date.now()) {
  const last = lastNudgeAt.get(userId) ?? -Infinity
  if (now - last < NUDGE_WINDOW_MS) return false
  lastNudgeAt.set(userId, now)
  return true
}

export function readConfig(env = process.env) {
  const key = (env.APNS_KEY_P8 || '').trim()
  return {
    keyId: (env.APNS_KEY_ID || '').trim(),
    teamId: (env.APNS_TEAM_ID || '').trim(),
    bundleId: (env.APNS_BUNDLE_ID || 'com.nishany.app').trim(),
    // Accepted either as the PEM itself or base64-encoded, because a private
    // key with newlines in it survives very few deployment forms intact.
    key: key.includes('BEGIN') ? key : decodeBase64Key(key),
  }
}

function decodeBase64Key(value) {
  if (!value) return ''
  try {
    const decoded = Buffer.from(value, 'base64').toString('utf8')
    return decoded.includes('BEGIN') ? decoded : ''
  } catch {
    return ''
  }
}

export function isConfigured(config = readConfig()) {
  return Boolean(config.keyId && config.teamId && config.bundleId && config.key)
}

/* ── The provider token ──────────────────────────────────────────────────── */

let cached = { token: null, at: 0, keyId: null }

/**
 * The JWT Apple authenticates the sender with.
 *
 * `ieee-p1363` is not a detail to skip: Node signs ES256 into DER by default,
 * and Apple wants the raw r‖s pair. A DER signature is accepted by every local
 * test that only checks the shape and then rejected by the gateway with a bare
 * 403, which is a miserable thing to debug.
 */
export function buildProviderToken(config, now = Date.now()) {
  const header = { alg: 'ES256', kid: config.keyId }
  const claims = { iss: config.teamId, iat: Math.floor(now / 1000) }
  const body = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claims))}`
  const signature = crypto.sign('SHA256', Buffer.from(body), {
    key: config.key,
    dsaEncoding: 'ieee-p1363',
  })
  return `${body}.${signature.toString('base64url')}`
}

function base64url(value) {
  return Buffer.from(value).toString('base64url')
}

function providerToken(config, now = Date.now()) {
  if (cached.token && cached.keyId === config.keyId && now - cached.at < TOKEN_LIFETIME_MS) {
    return cached.token
  }
  cached = { token: buildProviderToken(config, now), at: now, keyId: config.keyId }
  return cached.token
}

/* ── Sending ─────────────────────────────────────────────────────────────── */

/**
 * The payload.
 *
 * `content-available: 1` and nothing else that could draw attention: no alert,
 * no badge, no sound. `apns-priority: 5` is required for a silent push — Apple
 * rejects priority 10 — and `apns-push-type: background` is required on iOS 13
 * and later or the push is dropped without an error the sender ever sees.
 */
export function buildPayload(key) {
  // The key is carried only so a log line can say what woke the device. The app
  // refreshes everything regardless, and must not come to depend on this.
  return JSON.stringify({ aps: { 'content-available': 1 }, k: key ?? null })
}

async function post({ host, token, deviceToken, payload, config, pushType = 'background', priority = '5' }) {
  return new Promise((resolve) => {
    const client = http2.connect(host)
    // Without this a gateway that never answers holds a connection, and enough
    // of them hold the process.
    const timer = setTimeout(() => {
      client.destroy()
      resolve({ status: 0, reason: 'timeout' })
    }, 10_000)

    client.on('error', () => {
      clearTimeout(timer)
      resolve({ status: 0, reason: 'connection' })
    })

    const request = client.request({
      ':method': 'POST',
      ':path': `/3/device/${deviceToken}`,
      authorization: `bearer ${token}`,
      'apns-topic': config.bundleId,
      // 'background'/5 for the silent sync nudge (Apple rejects priority 10
      // for a silent push); 'alert'/10 for a visible reminder — the caller
      // decides, but a call that says nothing gets the nudge's own behaviour.
      'apns-push-type': pushType,
      'apns-priority': priority,
      'content-type': 'application/json',
    })

    let status = 0
    let body = ''
    request.on('response', (headers) => { status = Number(headers[':status']) || 0 })
    request.on('data', (chunk) => { body += chunk })
    request.on('error', () => {
      clearTimeout(timer)
      client.close()
      resolve({ status: 0, reason: 'stream' })
    })
    request.on('end', () => {
      clearTimeout(timer)
      client.close()
      let reason = null
      try { reason = JSON.parse(body)?.reason ?? null } catch { /* not JSON */ }
      resolve({ status, reason })
    })

    request.end(payload)
  })
}

/**
 * Whether a failure means the token is dead rather than the send unlucky.
 *
 * Only these. Treating a transient failure as a dead token would unregister a
 * device over one bad minute, and nobody reports the notification they stopped
 * receiving.
 */
export function isTokenDead(status, reason) {
  if (status === 410) return true
  return status === 400 && (reason === 'BadDeviceToken' || reason === 'DeviceTokenNotForTopic')
}

/**
 * Nudge a student's other devices.
 *
 * `exceptToken` is the device that made the change: waking a phone to tell it
 * about its own write is pure waste, and it is also how a nudge loop starts.
 * Never throws — a push that fails must not fail the write that triggered it.
 */
export async function sendSilentNudge({ userId, exceptToken = null, key = null, now = Date.now() }) {
  const config = readConfig()
  if (!isConfigured(config) || !userId) return { sent: 0, skipped: 'unconfigured' }

  if (!claimNudgeSlot(userId, now)) return { sent: 0, skipped: 'debounced' }

  let devices = []
  try {
    const [rows] = await pool.query(
      'SELECT token, environment FROM device_tokens WHERE user_id = ?',
      [userId],
    )
    devices = rows.filter((row) => row.token !== exceptToken)
  } catch {
    return { sent: 0, skipped: 'unreadable' }
  }
  if (!devices.length) return { sent: 0, skipped: 'no-devices' }

  const token = providerToken(config, now)
  const payload = buildPayload(key)
  let sent = 0

  for (const device of devices) {
    const host = device.environment === 'sandbox' ? SANDBOX : PRODUCTION
    let result
    try {
      result = await post({ host, token, deviceToken: device.token, payload, config })
    } catch {
      continue
    }
    if (result.status === 200) { sent += 1; continue }
    if (isTokenDead(result.status, result.reason)) {
      // Apple says this device is gone. Removing the row is the only way the
      // table does not fill with tokens for apps that were deleted years ago.
      try {
        await pool.query('DELETE FROM device_tokens WHERE token = ?', [device.token])
      } catch { /* the row can go next time */ }
    }
  }

  return { sent, of: devices.length }
}

/* ── Visible reminders ───────────────────────────────────────────────────── */

/**
 * The payload for a reminder someone is meant to see.
 *
 * Unlike `buildPayload`, this carries content — that is the whole point of a
 * visible push — so it carries only what the notification already says: a
 * title, a body, and where a tap should go. Nothing else about the student
 * rides along.
 */
export function buildAlertPayload(notification) {
  return JSON.stringify({
    aps: { alert: { title: notification.title, body: notification.body }, sound: 'default' },
    path: notification.path,
  })
}

/**
 * "Your Question of the Day is waiting" — a reminder, not a sync signal.
 *
 * Reuses everything `sendSilentNudge` does to reach Apple's gateway: the
 * provider token, the per-device sandbox/production host, the dead-token
 * cleanup. It differs only in what it asks Apple to do with the push —
 * `alert`/`10` instead of `background`/`5`, because a reminder nobody sees is
 * not a reminder. No-op until APNs is configured, and never throws: a failed
 * push must not fail the dispatch loop that is still sending everyone else's.
 */
export async function sendApnsAlert(device, notification) {
  const config = readConfig()
  if (!isConfigured(config) || !device?.token) return false

  const token = providerToken(config)
  const host = device.environment === 'sandbox' ? SANDBOX : PRODUCTION
  const payload = buildAlertPayload(notification)

  let result
  try {
    result = await post({
      host, token, deviceToken: device.token, payload, config, pushType: 'alert', priority: '10',
    })
  } catch {
    return false
  }

  if (result.status === 200) return true
  if (isTokenDead(result.status, result.reason)) {
    // Same reasoning as the silent nudge: Apple says this device is gone, and
    // the row would otherwise sit there for years addressed to a deleted app.
    try {
      await pool.query('DELETE FROM device_tokens WHERE token = ?', [device.token])
    } catch { /* the row can go next time */ }
  }
  return false
}

/** Test seam: the debounce is process-wide and would otherwise leak between tests. */
export function resetNudgeWindow() {
  lastNudgeAt.clear()
  cached = { token: null, at: 0, keyId: null }
}
