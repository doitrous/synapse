/**
 * A student's profile photo: uploaded, imported from a Google/Facebook
 * sign-up, or cleared back to the glyph.
 *
 * Reuses the machinery `managed_media` already has rather than inventing a
 * second store: `imageMeta` sniffs the real bytes (never a claimed
 * Content-Type), `storageKeyFor` gives the same content-addressed path
 * teaching media uses, and the row lands in `managed_media` as 'ready'
 * directly — there is no chunked upload here, just a base64 body capped well
 * under one request. `students.avatar_media_id` points at it; null means
 * "show the profile_icon glyph instead" (see accounts.js `saveOwnEnrolment`).
 */
import { randomUUID, createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { pool } from './db.js'
import { imageMeta } from './imageMeta.js'
import { resolveWithin } from './uploads.js'
import { storageKeyFor } from './mediaLibrary.js'
import { ensureStudentRow } from './accounts.js'

const MEDIA_STORAGE_DIR = resolve(process.env.RESOURCE_STORAGE_DIR || '/data/medical-library')
export const AVATAR_MAX_BYTES = 2 * 1024 * 1024
const IMPORT_FETCH_TIMEOUT_MS = 8000

function tooLarge() {
  return { error: `avatar images may be up to ${Math.round(AVATAR_MAX_BYTES / (1024 * 1024))} MB` }
}

/** A data URL or bare base64 string, decoded and size-capped before it is ever sniffed. */
export function decodeImageBase64(input) {
  if (typeof input !== 'string' || !input.trim()) return { error: 'image data is required' }
  const match = input.match(/^data:[^;,]*;base64,(.+)$/s)
  const base64 = (match ? match[1] : input).trim()
  // Reject on the encoded length first so an absurd string is never handed to
  // Buffer.from at all — base64 is ~4/3 the decoded size.
  if (base64.length > Math.ceil((AVATAR_MAX_BYTES * 4) / 3) + 1024) return tooLarge()
  let buffer
  try {
    buffer = Buffer.from(base64, 'base64')
  } catch {
    return { error: 'that is not valid image data' }
  }
  if (!buffer.length) return { error: 'that is not valid image data' }
  if (buffer.length > AVATAR_MAX_BYTES) return tooLarge()
  return { buffer }
}

/** What this buffer actually is, from its own bytes — never the caller's claim. */
export function sniffAvatarImage(buffer) {
  const meta = imageMeta(buffer)
  if (!meta) return { error: 'that file is not a supported image (PNG, JPEG, GIF or WebP)' }
  return { meta }
}

/** Write the bytes (if not already stored) and register a ready managed_media row. */
async function storeAvatarImage(buffer, meta, uploadedBy) {
  const sha256 = createHash('sha256').update(buffer).digest('hex')
  const storageKey = storageKeyFor(sha256, meta.mimeType)
  if (!storageKey) return { error: 'unsupported image type' }
  const fullPath = resolveWithin(MEDIA_STORAGE_DIR, storageKey)
  if (!fullPath) return { error: 'avatar path could not be resolved' }
  if (!existsSync(fullPath)) {
    await mkdir(dirname(fullPath), { recursive: true })
    // Two students uploading the same photo race here; `wx` lets the loser's
    // write fail on EEXIST rather than clobber the winner's already-verified file.
    await writeFile(fullPath, buffer, { flag: 'wx' }).catch((error) => {
      if (error.code !== 'EEXIST') throw error
    })
  }
  const id = `avt-${randomUUID()}`
  await pool.query(
    `INSERT INTO managed_media
       (id, uploaded_by, status, storage_key, sha256, media_type, mime_type, size_bytes, width, height, verified_at, ready_at)
     VALUES (?, ?, 'ready', ?, ?, 'image', ?, ?, ?, ?, NOW(), NOW())`,
    [id, uploadedBy, storageKey, sha256, meta.mimeType, buffer.length, meta.width || null, meta.height || null],
  )
  return { id }
}

/** Point the caller's own roster row at a stored avatar, creating the row if needed. */
async function applyAvatar(userId, mediaId) {
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const student = await ensureStudentRow(conn, userId)
    if (!student) { await conn.rollback(); return { error: 'no_identity' } }
    await conn.query('UPDATE students SET avatar_media_id = ? WHERE id = ?', [mediaId, student.id])
    await conn.commit()
    return { ok: true, avatarMediaId: mediaId }
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}

/** Store an uploaded photo (base64 JSON body) as the caller's avatar. */
export async function setAvatarFromUpload(userId, imageInput) {
  const decoded = decodeImageBase64(imageInput)
  if (decoded.error) return decoded
  const sniffed = sniffAvatarImage(decoded.buffer)
  if (sniffed.error) return sniffed
  const stored = await storeAvatarImage(decoded.buffer, sniffed.meta, userId)
  if (stored.error) return stored
  return applyAvatar(userId, stored.id)
}

/** Read a stream up to `maxBytes`, or null if it runs over. */
async function readCapped(stream, maxBytes) {
  if (!stream) return null
  const reader = stream.getReader()
  const chunks = []
  let total = 0
  try {
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      total += value.length
      if (total > maxBytes) {
        await reader.cancel().catch(() => {})
        return null
      }
      chunks.push(value)
    }
  } finally {
    reader.releaseLock?.()
  }
  return Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)))
}

/**
 * Fetch a provider photo (Google/Facebook `avatar_url`/`picture`) server-side
 * and store it as the caller's avatar.
 *
 * SSRF guards: https only, no redirects followed (a redirect to an internal
 * URL is refused rather than chased), a declared and a measured size cap, and
 * the response is sniffed as an image before anything is written to disk.
 *
 * ponytail: no private-IP/DNS-rebinding check on the resolved host — a
 * provider CDN name that itself resolves internally would still be fetched.
 * Add a resolved-address allowlist if that becomes a real risk; today's
 * callers are Google/Facebook's own photo CDNs, not student-supplied hosts.
 */
export async function setAvatarFromUrl(userId, url) {
  if (typeof url !== 'string' || !/^https:\/\//i.test(url)) return { error: 'only https image URLs are supported' }
  let parsed
  try {
    parsed = new URL(url)
  } catch {
    return { error: 'that is not a valid URL' }
  }
  let response
  try {
    response = await fetch(parsed.href, { redirect: 'manual', signal: AbortSignal.timeout(IMPORT_FETCH_TIMEOUT_MS) })
  } catch {
    return { error: 'that photo could not be fetched' }
  }
  if (response.type === 'opaqueredirect' || !response.ok) return { error: 'that photo could not be fetched' }
  const declaredType = response.headers.get('content-type') || ''
  if (!declaredType.toLowerCase().startsWith('image/')) return { error: 'that URL is not an image' }
  const declaredLength = Number(response.headers.get('content-length'))
  if (Number.isFinite(declaredLength) && declaredLength > AVATAR_MAX_BYTES) return tooLarge()
  const buffer = await readCapped(response.body, AVATAR_MAX_BYTES)
  if (!buffer) return tooLarge()
  const sniffed = sniffAvatarImage(buffer)
  if (sniffed.error) return sniffed
  const stored = await storeAvatarImage(buffer, sniffed.meta, userId)
  if (stored.error) return stored
  return applyAvatar(userId, stored.id)
}

/** Revert to the glyph. */
export async function clearAvatar(userId) {
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const student = await ensureStudentRow(conn, userId)
    if (!student) { await conn.rollback(); return { error: 'no_identity' } }
    await conn.query('UPDATE students SET avatar_media_id = NULL WHERE id = ?', [student.id])
    await conn.commit()
    return { ok: true }
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}
