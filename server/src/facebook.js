import { createHmac, timingSafeEqual } from 'node:crypto'
import { pool } from './db.js'

/**
 * Which of a student's Facebook friends are here.
 *
 * `user_friends` only ever returns friends who have also signed into this app
 * and granted the same permission, so this intersection is the whole of the
 * matching — there is nothing to look up at Facebook beyond the list it gives.
 */
export function matchFriends(fbFriendIds, linkedRows) {
  const wanted = new Set(fbFriendIds ?? [])
  return (linkedRows ?? []).filter((row) => wanted.has(row.fbUserId)).map((row) => row.userId)
}

export async function linkAccount(userId, fbUserId) {
  if (!fbUserId) return { ok: false, reason: 'invalid_target' }
  await pool.query(
    `INSERT INTO facebook_links (user_id, fb_user_id) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE fb_user_id = VALUES(fb_user_id), unlinked_at = NULL`,
    [userId, String(fbUserId)],
  )
  return { ok: true }
}

export async function unlinkAccount(userId) {
  await pool.query('DELETE FROM facebook_links WHERE user_id = ?', [userId])
  return { ok: true }
}

/**
 * Meta's data-deletion callback.
 *
 * Required for App Review, and built with the link rather than after it: an
 * integration that can be connected but not disconnected is not one we should
 * ship.
 */
export async function deletionCallback(fbUserId) {
  await pool.query('DELETE FROM facebook_links WHERE fb_user_id = ?', [String(fbUserId)])
  return { ok: true }
}

/**
 * Meta's `signed_request`, verified.
 *
 * `<base64url signature>.<base64url payload>`, HMAC-SHA256 over the *encoded*
 * payload — the string after the dot, not the JSON it decodes to. This is the
 * only thing authenticating the deletion callback, which Meta calls with no
 * session of any kind, so everything it cannot prove is refused: no secret, a
 * secret that does not match, a shape that is not two dot-separated parts, a
 * payload that is not a JSON object, or an algorithm other than the one
 * implemented here. Returns the payload, or null — never a partial answer.
 */
export function parseSignedRequest(signedRequest, appSecret) {
  // An unconfigured integration must reject, never accept: without a secret
  // there is nothing to check a signature against, and treating the empty
  // string as one would let anybody who guesses that sign their own requests.
  if (typeof appSecret !== 'string' || !appSecret) return null
  if (typeof signedRequest !== 'string' || !signedRequest) return null

  const parts = signedRequest.split('.')
  if (parts.length !== 2) return null
  const [encodedSignature, encodedPayload] = parts
  if (!encodedSignature || !encodedPayload) return null

  const signature = Buffer.from(encodedSignature, 'base64url')
  const expected = createHmac('sha256', appSecret).update(encodedPayload).digest()
  // timingSafeEqual throws on a length mismatch, and a forged signature is
  // free to be the wrong length, so the lengths are compared first.
  if (signature.length !== expected.length) return null
  if (!timingSafeEqual(signature, expected)) return null

  let payload
  try {
    payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'))
  } catch {
    return null
  }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return null
  // Meta names the algorithm in the payload. Anything else is a request this
  // function did not actually verify, whatever the bytes happened to match.
  if (String(payload.algorithm ?? 'HMAC-SHA256').toUpperCase() !== 'HMAC-SHA256') return null
  return payload
}
