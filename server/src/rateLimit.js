/**
 * Sliding-window limits for the endpoints that answer before anybody is signed in.
 *
 * `identity.js` already has one of these for `/api/accounts/exists`, with a
 * single fixed window baked in. Auth needs several different windows at once —
 * per IP, per email, per factor — so this is the same idea with the numbers
 * passed in, plus the lockout the login route needs.
 *
 * ponytail: per-process and in-memory, like every other counter in this server.
 * Ceiling: N app instances means N times the allowance, and a restart forgives
 * everyone. Move the maps to Redis if the API is ever scaled horizontally —
 * the shape of `limit()` does not change.
 */

const windows = new Map() // key -> number[] (hit timestamps)
const locks = new Map() // key -> unlocks-at epoch ms

function prune(key, now, windowMs) {
  const hits = (windows.get(key) ?? []).filter((at) => now - at < windowMs)
  if (hits.length) windows.set(key, hits)
  else windows.delete(key)
  return hits
}

/** Callers come and go; without this the maps are a slow leak keyed by address. */
function sweep(now) {
  if (windows.size <= 5000) return
  for (const [key, hits] of windows) {
    // An hour is the longest window any caller here uses.
    if (!hits.some((at) => now - at < 3_600_000)) windows.delete(key)
  }
}

/**
 * One attempt against `key`. Rejected attempts are NOT recorded — otherwise a
 * client that keeps hammering extends its own penalty indefinitely, which turns
 * a rate limit into a permanent ban.
 */
export function limit(key, max, windowMs, now = Date.now()) {
  const hits = prune(key, now, windowMs)
  if (hits.length >= max) {
    return { ok: false, retryAfter: Math.max(1, Math.ceil((windowMs - (now - hits[0])) / 1000)) }
  }
  hits.push(now)
  windows.set(key, hits)
  sweep(now)
  return { ok: true, retryAfter: 0 }
}

export function lock(key, ms, now = Date.now()) {
  locks.set(key, now + ms)
}

/** Seconds still to serve, or 0. */
export function lockedFor(key, now = Date.now()) {
  const until = locks.get(key)
  if (!until) return 0
  if (until <= now) { locks.delete(key); return 0 }
  return Math.max(1, Math.ceil((until - now) / 1000))
}

/** A success forgives the failures that led to it. */
export function clearLimit(key) {
  windows.delete(key)
  locks.delete(key)
}

export function resetRateLimits() {
  windows.clear()
  locks.clear()
}

/** The address a limit is charged to, behind Coolify's proxy (`trust proxy` is set). */
export function clientIp(req) {
  return req?.ip || req?.socket?.remoteAddress || 'unknown'
}

/**
 * The window as middleware, for the routes that need nothing more than "not
 * this often". Login builds its own from `limit` and `lock` because it has
 * three windows and a lockout to coordinate.
 */
export function rateLimited(name, keyFn, max, windowMs) {
  return function guard(req, res, next) {
    const key = `${name}:${keyFn(req)}`
    const verdict = limit(key, max, windowMs)
    if (verdict.ok) return next()
    console.warn('[security]', { event: 'rate_limited', name, ip: clientIp(req) })
    res.setHeader('Retry-After', String(verdict.retryAfter))
    return res.status(429).json({ error: 'too_many_requests', retryAfter: verdict.retryAfter })
  }
}
