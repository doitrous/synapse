import { randomBytes } from 'crypto'

/**
 * One-time cross-origin session handoff.
 *
 * A Supabase session lives in per-origin localStorage, but `HandOver` (see
 * router.tsx) moves a signed-in user from one domain to the other — admin to
 * student, or back — by path alone. The target origin has no session of its
 * own, so without this the user was asked to sign in a second time.
 *
 * The source origin exchanges its own refresh_token for an opaque, single-use
 * code (`POST /api/auth/handoff`, index.js); the target origin redeems that
 * code, once, within `TTL_MS`, for the refresh_token (`POST
 * /api/auth/handoff/redeem`), then restores the session with it. Only the
 * opaque code ever travels in a URL — the token itself never leaves the
 * server.
 *
 * ponytail: the map is in-memory and per-process, which is fine for the one
 * Express instance this runs behind. Move it to Redis/DB if the server is
 * ever horizontally scaled — a code minted on one instance must be
 * redeemable on whichever instance answers the redeem request.
 */
const TTL_MS = 30_000
const codes = new Map() // code -> { refreshToken, expiresAt }

function sweep(now) {
  for (const [code, entry] of codes) {
    if (entry.expiresAt <= now) codes.delete(code)
  }
}

export function mintHandoffCode(refreshToken, now = Date.now()) {
  sweep(now)
  const code = randomBytes(32).toString('hex')
  codes.set(code, { refreshToken, expiresAt: now + TTL_MS })
  return code
}

/** Single-use: the code is gone whether or not it was still valid. */
export function redeemHandoffCode(code, now = Date.now()) {
  const entry = codes.get(code)
  codes.delete(code)
  if (!entry || entry.expiresAt <= now) return null
  return entry.refreshToken
}
