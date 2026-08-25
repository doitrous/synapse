import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

// Configure one shared secret when the API runs on more than one process. A
// per-process fallback is safe for local/single-instance use, but tokens minted
// by one replica cannot otherwise be verified by another.
const configuredSecret = process.env.MEDIA_PLAYBACK_SECRET?.trim()
const secret = configuredSecret ? Buffer.from(configuredSecret, 'utf8') : randomBytes(32)

function signature(payload) {
  return createHmac('sha256', secret).update(payload).digest('base64url')
}

/** Mint a short-lived URL token a native audio/video element can use. */
export function createMediaPlaybackToken(mediaId, now = Date.now(), lifetimeMs = 4 * 60 * 60 * 1000, allowDraft = false) {
  const payload = Buffer.from(JSON.stringify({ mediaId, expiresAt: now + lifetimeMs, allowDraft: Boolean(allowDraft) })).toString('base64url')
  return `${payload}.${signature(payload)}`
}

/** Verify without leaking whether the id or the signature was the bad part. */
export function readMediaPlaybackToken(token, now = Date.now()) {
  if (typeof token !== 'string') return null
  const [payload, supplied, extra] = token.split('.')
  if (!payload || !supplied || extra) return null
  const expected = signature(payload)
  const a = Buffer.from(supplied)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    if (typeof parsed.mediaId !== 'string' || !parsed.mediaId || !Number.isFinite(parsed.expiresAt) || parsed.expiresAt <= now) return null
    return { mediaId: parsed.mediaId, expiresAt: parsed.expiresAt, allowDraft: parsed.allowDraft === true }
  } catch {
    return null
  }
}
