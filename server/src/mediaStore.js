/**
 * Managed media and the medical-resource index: the cached reads, the
 * content-addressed storage, and the cache invalidation a state write triggers.
 *
 * Lifted out of index.js because more than one route group needs it — the media
 * routes upload and delete through it, the state routes reclaim removed assets
 * and drop stale snapshots, and the boot path warms the resource index.
 */
import { randomUUID } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, open, rename, rm, stat } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { pool } from './db.js'
import { mediaMeta } from './mediaMeta.js'
import { MEDIA_STATE_KEY, isMediaReleased, storageKeyFor } from './mediaLibrary.js'
import { hasConsoleAccess } from './roles.js'
import { invalidatePublishedQuestions } from './publishedQuestions.js'
import { invalidateStudentContent } from './studentContent.js'
import { resolveUploadWorkspace, resolveWithin } from './uploads.js'
import {
  MEDIA_STORAGE_DIR, MEDIA_TYPE_MAX_BYTES, MEDIA_UPLOAD_MAX_AGE_HOURS,
  MEDICAL_EVIDENCE_STATE_KEY, RESOURCE_STORAGE_DIR,
} from './http.js'

let medicalResourceSnapshot = null
let medicalResourceLoad = null

/**
 * Drop any server-side cache a state write has just made stale.
 *
 * Two caches now read from `app_state` — the medical-resource snapshot, and
 * the published-question set shared by study rooms and challenges — so
 * invalidation is one call rather than a growing list at every write site.
 */
export function invalidateSnapshots(key) {
  if (key === MEDICAL_EVIDENCE_STATE_KEY) {
    medicalResourceSnapshot = null
    medicalResourceLoad = null
  }
  if (key === MEDIA_STATE_KEY) mediaSnapshot = null
  invalidatePublishedQuestions(key)
  invalidateStudentContent(key)
}

/**
 * Every media record, cached until the document is written.
 *
 * Read on every image request, so it cannot be a query per image. Dropped by
 * `invalidateSnapshots` above, the same shape the medical-resource snapshot
 * already uses.
 */
let mediaSnapshot = null

export async function mediaRecords() {
  if (mediaSnapshot) return mediaSnapshot
  const [rows] = await pool.query('SELECT v FROM app_state WHERE k = ?', [MEDIA_STATE_KEY])
  mediaSnapshot = rows.length ? JSON.parse(rows[0].v)?.records ?? [] : []
  return mediaSnapshot
}

/**
 * The file facts used by both authenticated fetches and signed playback URLs.
 * New uploads are authoritative rows, which makes them readable immediately on
 * completion. The JSON lookup is a backward-compatible bridge for assets
 * uploaded before managed_media existed.
 */
export async function managedMediaFile(id) {
  const [rows] = await pool.query(
    `SELECT id, storage_key AS storageKey, sha256, media_type AS mediaType,
       mime_type AS mimeType, size_bytes AS sizeBytes, width, height
     FROM managed_media WHERE id = ? AND status = 'ready'`,
    [id],
  )
  if (rows[0]) return rows[0]
  return (await mediaRecords()).find((entry) => entry.id === id) ?? null
}

export function sendManagedMedia(res, record, { signed = false } = {}) {
  const fullPath = resolveWithin(MEDIA_STORAGE_DIR, record?.storageKey || '')
  if (!fullPath || !existsSync(fullPath)) return false
  res.setHeader('Content-Type', record.mimeType || 'application/octet-stream')
  res.setHeader('Cache-Control', signed ? 'private, no-store' : 'private, max-age=3600')
  if (!signed) res.setHeader('Vary', 'Authorization')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Accept-Ranges', 'bytes')
  res.sendFile(fullPath)
  return true
}

/** Console staff may inspect drafts; students receive only released assets. */
export async function mayReadManagedMedia(identity, id) {
  if (hasConsoleAccess(identity?.role)) return true
  const record = (await mediaRecords()).find((entry) => entry.id === id)
  return Boolean(record && isMediaReleased(record))
}

export async function medicalResourceRecords() {
  if (medicalResourceSnapshot) return medicalResourceSnapshot.resources
  if (!medicalResourceLoad) {
    medicalResourceLoad = (async () => {
      const [rows] = await pool.query('SELECT v FROM app_state WHERE k = ?', [MEDICAL_EVIDENCE_STATE_KEY])
      const resources = rows.length ? JSON.parse(rows[0].v).resources ?? [] : []
      medicalResourceSnapshot = {
        resources,
        byId: new Map(resources.map((resource) => [resource.id, resource])),
      }
      return medicalResourceSnapshot
    })().finally(() => { medicalResourceLoad = null })
  }
  return (await medicalResourceLoad).resources
}

export async function resourceRecord(resourceId) {
  await medicalResourceRecords()
  return medicalResourceSnapshot?.byId.get(resourceId) || null
}

export function resolvedResourcePath(storageKey) {
  return resolveWithin(RESOURCE_STORAGE_DIR, storageKey)
}

export function resolvedChunkUploadPath(resourceId, uploadId) {
  return resolveUploadWorkspace(RESOURCE_STORAGE_DIR, resourceId, uploadId)
}

/** Managed-media chunks are isolated from the medical-resource cleanup tree. */
export function resolvedMediaUploadPath(mediaId, uploadId) {
  return resolveUploadWorkspace(resolve(MEDIA_STORAGE_DIR, 'media'), `upload-${mediaId}`, uploadId)
}

/** Remove only abandoned managed-media sessions, never active resource work. */
export async function cleanupStaleMediaUploads() {
  const [stale] = await pool.query(
    `SELECT id, upload_id AS uploadId FROM managed_media
      WHERE status = 'uploading' AND updated_at < DATE_SUB(NOW(), INTERVAL ? HOUR)`,
    [MEDIA_UPLOAD_MAX_AGE_HOURS],
  )
  for (const row of stale) {
    const workspace = resolvedMediaUploadPath(row.id, row.uploadId)
    if (workspace) await rm(workspace, { recursive: true, force: true })
    await pool.query(`DELETE FROM managed_media WHERE id = ? AND upload_id = ? AND status = 'uploading'`, [row.id, row.uploadId])
  }

  // A browser can disappear after completion but before it describes the
  // asset in the library document. Keep that recovery window generous, then
  // reclaim the durable orphan through the same reference-aware path.
  const stateConn = await pool.getConnection()
  try {
    await stateConn.beginTransaction()
    // Read the authoritative document while holding the same row lock used by
    // state writes. A second replica's process-local cache must never decide a
    // destructive cleanup.
    const [mediaRows] = await stateConn.query('SELECT v FROM app_state WHERE k = ? FOR UPDATE', [MEDIA_STATE_KEY])
    const describedRecords = mediaRows.length ? JSON.parse(mediaRows[0].v)?.records ?? [] : []
    const describedIds = new Set(describedRecords.map((record) => record.id))
    const [readyOrphans] = await stateConn.query(
      `SELECT id FROM managed_media
       WHERE status = 'ready' AND updated_at < DATE_SUB(NOW(), INTERVAL ? HOUR)`,
      [MEDIA_UPLOAD_MAX_AGE_HOURS],
    )
    for (const row of readyOrphans) {
      if (!describedIds.has(row.id)) await deleteManagedMediaRow({ id: row.id, describedMediaRecords: describedRecords })
    }
    await stateConn.commit()
  } catch (error) {
    await stateConn.rollback()
    throw error
  } finally {
    stateConn.release()
  }
}

/** Serialise file creation and reclamation for one content-addressed object. */
export async function withManagedMediaDigestLock(digest, work) {
  const conn = await pool.getConnection()
  const lockName = `nishany-media:${String(digest).slice(0, 48)}`
  try {
    const [rows] = await conn.query('SELECT GET_LOCK(?, 10) AS acquired', [lockName])
    if (Number(rows[0]?.acquired) !== 1) {
      const error = new Error('media storage is busy; please try again')
      error.status = 503
      throw error
    }
    return await work(conn)
  } finally {
    await conn.query('SELECT RELEASE_LOCK(?)', [lockName]).catch(() => {})
    conn.release()
  }
}

export function completedMediaPayload(row, alreadyStored = false) {
  return {
    id: row.id,
    storageKey: row.storageKey,
    sha256: row.sha256,
    mediaType: row.mediaType,
    mimeType: row.mimeType,
    sizeBytes: Number(row.sizeBytes || 0),
    width: Number(row.width || 0),
    height: Number(row.height || 0),
    alreadyStored,
  }
}

/** Remove content-addressed bytes only after every database and library alias is gone. */
export async function removePhysicalMediaIfUnreferenced(record, conn, excludedManagedId = null, describedMediaRecords = null) {
  if (!record?.storageKey) return false
  const [databaseReferences] = await conn.query(
    `SELECT COUNT(*) AS total FROM managed_media
     WHERE storage_key = ? AND status = 'ready'${excludedManagedId ? ' AND id <> ?' : ''}`,
    excludedManagedId ? [record.storageKey, excludedManagedId] : [record.storageKey],
  )
  if (Number(databaseReferences[0]?.total || 0) > 0) return false
  const descriptions = describedMediaRecords ?? await mediaRecords()
  const describedReference = descriptions.some((entry) => entry?.storageKey === record.storageKey)
  if (describedReference) return false
  const fullPath = resolveWithin(MEDIA_STORAGE_DIR, record.storageKey)
  if (fullPath) await rm(fullPath, { force: true })
  return true
}

/** Delete one owned upload/asset alias and reclaim its bytes when it was the last. */
export async function deleteManagedMediaRow({ id, uploadedBy = null, uploadId = null, describedMediaRecords = null }) {
  const where = ['id = ?']
  const params = [id]
  if (uploadedBy) { where.push('uploaded_by = ?'); params.push(uploadedBy) }
  if (uploadId) { where.push('upload_id = ?'); params.push(uploadId) }
  const [initialRows] = await pool.query(
    `SELECT id, upload_id AS uploadId, uploaded_by AS uploadedBy, status,
       storage_key AS storageKey, sha256
     FROM managed_media WHERE ${where.join(' AND ')} LIMIT 1`,
    params,
  )
  const initial = initialRows[0]
  if (!initial) return false

  if (initial.status === 'uploading') {
    const workspace = resolvedMediaUploadPath(initial.id, initial.uploadId)
    if (workspace) await rm(workspace, { recursive: true, force: true })
    const [deleted] = await pool.query(`DELETE FROM managed_media WHERE ${where.join(' AND ')} AND status = 'uploading'`, params)
    return Boolean(deleted.affectedRows)
  }

  return withManagedMediaDigestLock(initial.sha256 || initial.id, async (conn) => {
    const [rows] = await conn.query(
      `SELECT id, upload_id AS uploadId, storage_key AS storageKey, sha256 FROM managed_media
       WHERE ${where.join(' AND ')} AND status = 'ready' LIMIT 1`,
      params,
    )
    const record = rows[0]
    if (!record) return false
    const workspace = record.uploadId && resolvedMediaUploadPath(record.id, record.uploadId)
    if (workspace) await rm(workspace, { recursive: true, force: true })
    await removePhysicalMediaIfUnreferenced(record, conn, record.id, describedMediaRecords)
    const [deleted] = await conn.query(`DELETE FROM managed_media WHERE ${where.join(' AND ')} AND status = 'ready'`, params)
    if (!deleted.affectedRows) return false
    return true
  })
}

/** Turn an assembled staging file into one immediately readable managed asset. */
export async function registerManagedMedia(staging, received, { id = `med-${randomUUID()}`, uploadedBy }) {
  // MP4/M4A track metadata may live in a trailing `moov` atom, especially for
  // large/non-fast-start files. Probe a bounded head and tail rather than
  // loading a multi-gigabyte upload into memory or guessing from its filename.
  const headLength = Math.min(1024 * 1024, received.sizeBytes)
  const tailLength = Math.min(4 * 1024 * 1024, Math.max(0, received.sizeBytes - headLength))
  const probe = Buffer.alloc(headLength + tailLength)
  const handle = await open(staging, 'r')
  try {
    await handle.read(probe, 0, headLength, 0)
    if (tailLength) await handle.read(probe, headLength, tailLength, received.sizeBytes - tailLength)
  } finally { await handle.close() }
  const meta = mediaMeta(probe)
  if (!meta) {
    const error = new Error('that file is not a supported image, audio recording or video')
    error.status = 415
    throw error
  }
  const typeCap = MEDIA_TYPE_MAX_BYTES[meta.mediaType]
  if (typeCap && received.sizeBytes > typeCap) {
    const error = new Error(`${meta.mediaType} may be up to ${Math.round(typeCap / (1024 * 1024))} MB`)
    error.status = 413
    throw error
  }

  const storageKey = storageKeyFor(received.sha256, meta.mimeType)
  const fullPath = storageKey && resolveWithin(MEDIA_STORAGE_DIR, storageKey)
  if (!fullPath) throw new Error('media path could not be resolved')

  return withManagedMediaDigestLock(received.sha256, async (conn) => {
    // Identical uploads share one physical object but retain their own row and
    // upload id. That makes completion and cleanup safely retryable even when
    // the first HTTP response is lost.
    const alreadyStored = existsSync(fullPath)
    if (!alreadyStored) {
      await mkdir(dirname(fullPath), { recursive: true })
      await rename(staging, fullPath)
    } else {
      await rm(staging, { force: true })
    }
    try {
      // The file is on disk but not yet trusted: land it as 'verifying', prove it
      // reads back, and only then promote to 'ready'. A record is never 'ready'
      // because an upload's last request returned — only because its stored bytes
      // were round-tripped.
      await conn.query(
        `INSERT INTO managed_media
           (id, uploaded_by, status, storage_key, sha256, media_type, mime_type, size_bytes, width, height)
         VALUES (?, ?, 'verifying', ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE status = 'verifying', storage_key = VALUES(storage_key),
           sha256 = VALUES(sha256), media_type = VALUES(media_type), mime_type = VALUES(mime_type),
           size_bytes = VALUES(size_bytes), width = VALUES(width), height = VALUES(height),
           failure_reason = NULL`,
        [id, uploadedBy, storageKey, received.sha256, meta.mediaType, meta.mimeType, received.sizeBytes, meta.width || null, meta.height || null],
      )
    } catch (error) {
      if (!alreadyStored) await removePhysicalMediaIfUnreferenced({ storageKey }, conn)
      throw error
    }

    const failure = await verifyStoredMedia(fullPath, received.sizeBytes, meta.mediaType)
    if (failure) {
      await conn.query('UPDATE managed_media SET status = ?, failure_reason = ? WHERE id = ?', ['failed', failure, id])
      return { id, status: 'failed', failureReason: failure }
    }
    await conn.query('UPDATE managed_media SET status = ?, verified_at = NOW(), ready_at = NOW() WHERE id = ?', ['ready', id])
    return {
      ...completedMediaPayload({
        id, storageKey, sha256: received.sha256, mediaType: meta.mediaType,
        mimeType: meta.mimeType, sizeBytes: received.sizeBytes,
        width: meta.width, height: meta.height,
      }, alreadyStored),
      status: 'ready',
    }
  })
}

/**
 * Verify a stored media object at rest, returning a failure reason or null.
 *
 * This is what "verifying" actually means without a transcoder: the file exists
 * where it was written, is the size we recorded, reads back, and still parses as
 * the media type it claimed. It catches a truncated or corrupted write that a
 * successful HTTP upload would otherwise have reported as done. Audio and video
 * are confirmed as readable and correctly typed; playback itself is not claimed
 * verified, because the server has no player — the honest ceiling here.
 */
async function verifyStoredMedia(fullPath, sizeBytes, mediaType) {
  try {
    const info = await stat(fullPath)
    if (!info.isFile()) return 'stored media is not a file'
    if (info.size !== sizeBytes) return `stored media is ${info.size} bytes, expected ${sizeBytes}`
    const headLength = Math.min(1024 * 1024, sizeBytes)
    const tailLength = Math.min(4 * 1024 * 1024, Math.max(0, sizeBytes - headLength))
    const back = Buffer.alloc(headLength + tailLength)
    const handle = await open(fullPath, 'r')
    try {
      await handle.read(back, 0, headLength, 0)
      if (tailLength) await handle.read(back, headLength, tailLength, sizeBytes - tailLength)
    } finally { await handle.close() }
    const recheck = mediaMeta(back)
    if (!recheck) return 'stored media did not read back as a recognised format'
    if (recheck.mediaType !== mediaType) return `stored media read back as ${recheck.mediaType}, not ${mediaType}`
    return null
  } catch {
    return 'stored media could not be read back'
  }
}
