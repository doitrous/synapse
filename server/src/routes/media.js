/**
 * Managed teaching media and the medical-resource files. The storage itself
 * lives in mediaStore.js; these are the HTTP shells around it.
 */
import { randomUUID } from 'node:crypto'
import { existsSync } from 'node:fs'
import { rm } from 'node:fs/promises'
import { basename, dirname, join, resolve } from 'node:path'
import { requireAuthenticated, requireSuperAdmin, requireTab } from '../auth.js'
import { pool } from '../db.js'
import { CONTENT_LEDGER_STATE_KEY, MEDIA_CHUNKED_MAX_BYTES, MEDIA_CHUNK_MAX_BYTES, MEDIA_MAX_BYTES, MEDIA_STORAGE_DIR, RESOURCE_CHUNKED_MAX_BYTES, RESOURCE_CHUNK_MAX_BYTES, RESOURCE_MAX_BYTES, RESOURCE_STORAGE_DIR, wrap } from '../http.js'
import { deleteRefusal, isMediaReleased } from '../mediaLibrary.js'
import { createMediaPlaybackToken, readMediaPlaybackToken } from '../mediaPlayback.js'
import { describeProviders } from '../mediaProvider.js'
import { cleanupStaleMediaUploads, deleteManagedMediaRow, managedMediaFile, mayReadManagedMedia, mediaRecords, medicalResourceRecords, registerManagedMedia, resolvedChunkUploadPath, resolvedMediaUploadPath, resolvedResourcePath, resourceRecord, sendManagedMedia } from '../mediaStore.js'
import { hasConsoleAccess } from '../roles.js'
import { assembleChunks, receiveChunk, receiveStream, resolveWithin } from '../uploads.js'

export function registerMediaRoutes(app) {
  /** Legacy bounded request, kept for older clients. New clients use chunks. */
  app.post('/api/media', requireTab('resources', 'media'), wrap(async (req, res) => {
    const staging = resolveWithin(MEDIA_STORAGE_DIR, join('media', '.staging', randomUUID()))
    if (!staging) return res.status(500).json({ error: 'media staging path could not be resolved' })

    let received
    try {
      received = await receiveStream(req, staging, { maxBytes: MEDIA_MAX_BYTES })
    } catch (error) {
      await rm(staging, { force: true })
      return res.status(413).json({ error: error.message })
    }

    try { return res.json({ ok: true, ...(await registerManagedMedia(staging, received, { uploadedBy: req.identity.id })) }) }
    catch (error) { return res.status(error.status || 500).json({ error: error.message }) }
    finally { await rm(staging, { force: true }) }
  }))

  /**
   * Which media storage providers are configured, for a super admin auditing the
   * Cloudflare wiring. Reports presence and readiness only — never a secret value.
   * The filesystem provider is always available; R2/Stream report configured only
   * when their env is complete, and name (never print) any variables still missing.
   */
  app.get('/api/admin/media/providers', requireSuperAdmin, wrap(async (_req, res) => {
    res.json(describeProviders(process.env))
  }))

  /** Start a large, resumable managed-media upload. */
  app.post('/api/media/uploads', requireTab('resources', 'media'), wrap(async (req, res) => {
    await cleanupStaleMediaUploads()
    const sizeBytes = Number(req.body?.sizeBytes)
    if (!Number.isFinite(sizeBytes) || sizeBytes < 1 || sizeBytes > MEDIA_CHUNKED_MAX_BYTES) {
      return res.status(413).json({ error: `managed media may be up to ${Math.round(MEDIA_CHUNKED_MAX_BYTES / (1024 * 1024))} MB` })
    }
    const id = `med-${randomUUID()}`
    const uploadId = randomUUID().replace(/-/g, '')
    await pool.query(
      `INSERT INTO managed_media (id, upload_id, uploaded_by, status, size_bytes) VALUES (?, ?, ?, 'uploading', ?)`,
      [id, uploadId, req.identity.id, sizeBytes],
    )
    res.json({ id, uploadId, chunkMaxBytes: MEDIA_CHUNK_MAX_BYTES, maxBytes: MEDIA_CHUNKED_MAX_BYTES })
  }))

  app.put('/api/media/uploads/:id/:uploadId/chunks/:index', requireTab('resources', 'media'), wrap(async (req, res) => {
    const [rows] = await pool.query(
      `SELECT id FROM managed_media WHERE id = ? AND upload_id = ? AND uploaded_by = ? AND status = 'uploading'`,
      [req.params.id, req.params.uploadId, req.identity.id],
    )
    if (!rows.length) return res.status(404).json({ error: 'media upload not found' })
    const index = Number(req.params.index)
    if (!Number.isInteger(index) || index < 0 || index > 4095) return res.status(400).json({ error: 'invalid chunk index' })
    const workspace = resolvedMediaUploadPath(req.params.id, req.params.uploadId)
    if (!workspace) return res.status(400).json({ error: 'invalid media upload path' })
    const declaredLength = Number(req.header('content-length'))
    if (Number.isFinite(declaredLength) && declaredLength > MEDIA_CHUNK_MAX_BYTES) return res.status(413).json({ error: 'chunk exceeds configured limit' })
    const result = await receiveChunk(req, workspace, index, MEDIA_CHUNK_MAX_BYTES)
    await pool.query(`UPDATE managed_media SET updated_at = NOW() WHERE id = ? AND upload_id = ? AND uploaded_by = ? AND status = 'uploading'`, [req.params.id, req.params.uploadId, req.identity.id])
    res.json({ ok: true, index, sizeBytes: result.sizeBytes })
  }))

  app.post('/api/media/uploads/:id/:uploadId/complete', requireTab('resources', 'media'), wrap(async (req, res) => {
    const [rows] = await pool.query(
      `SELECT id, status, storage_key AS storageKey, sha256, media_type AS mediaType,
         mime_type AS mimeType, size_bytes AS sizeBytes, width, height, failure_reason AS failureReason
       FROM managed_media
       WHERE id = ? AND upload_id = ? AND uploaded_by = ? AND status IN ('uploading', 'ready', 'failed')`,
      [req.params.id, req.params.uploadId, req.identity.id],
    )
    const pending = rows[0]
    if (!pending) return res.status(404).json({ error: 'media upload not found' })
    // A prior attempt that failed verification stays failed — report it honestly on
    // retry rather than pretending the upload is still in progress.
    if (pending.status === 'failed') {
      return res.json({ ok: true, id: pending.id, status: 'failed', failureReason: pending.failureReason || 'verification failed' })
    }
    if (pending.status === 'ready') {
      const workspace = resolvedMediaUploadPath(req.params.id, req.params.uploadId)
      if (workspace) await rm(workspace, { recursive: true, force: true })
      const [duplicates] = await pool.query(
        `SELECT COUNT(*) AS total FROM managed_media
         WHERE storage_key = ? AND status = 'ready' AND id <> ?`,
        [pending.storageKey, pending.id],
      )
      const describedDuplicate = (await mediaRecords()).some(
        (record) => record.id !== pending.id && record.storageKey === pending.storageKey,
      )
      return res.json({
        ok: true,
        status: 'ready',
        ...completedMediaPayload(pending, Number(duplicates[0]?.total || 0) > 0 || describedDuplicate),
      })
    }
    const totalChunks = Number(req.body?.totalChunks)
    const declaredSize = Number(req.body?.sizeBytes)
    if (!Number.isInteger(totalChunks) || totalChunks < 1 || totalChunks > 4096) return res.status(400).json({ error: 'invalid chunk count' })
    if (!Number.isFinite(declaredSize) || declaredSize !== Number(pending.sizeBytes) || declaredSize > MEDIA_CHUNKED_MAX_BYTES) {
      return res.status(409).json({ error: 'uploaded size does not match the initiated upload' })
    }
    const workspace = resolvedMediaUploadPath(req.params.id, req.params.uploadId)
    const staging = resolveWithin(MEDIA_STORAGE_DIR, join('media', '.staging', req.params.id))
    if (!workspace || !staging) return res.status(400).json({ error: 'invalid media upload path' })
    try {
      const received = await assembleChunks(workspace, staging, {
        totalChunks, declaredSize, maxBytes: MEDIA_CHUNKED_MAX_BYTES, chunkMaxBytes: MEDIA_CHUNK_MAX_BYTES,
        removeWorkspace: false,
      })
      const registered = await registerManagedMedia(staging, received, { id: req.params.id, uploadedBy: req.identity.id })
      await rm(workspace, { recursive: true, force: true })
      res.json({ ok: true, ...registered })
    } catch (error) {
      await rm(staging, { force: true })
      res.status(error.status || 500).json({ error: error.message || 'media upload could not be completed' })
    }
  }))

  app.delete('/api/media/uploads/:id/:uploadId', requireTab('resources', 'media'), wrap(async (req, res) => {
    const deleted = await deleteManagedMediaRow({
      id: req.params.id,
      uploadId: req.params.uploadId,
      uploadedBy: req.identity.id,
    })
    if (!deleted) return res.status(404).json({ error: 'media upload not found' })
    res.json({ ok: true })
  }))

  /** Authenticated fetch for images and downloads. */
  app.get('/api/media/:id', requireAuthenticated, wrap(async (req, res) => {
    if (!await mayReadManagedMedia(req.identity, req.params.id)) return res.status(404).json({ error: 'media not found' })
    const record = await managedMediaFile(req.params.id)
    if (!record) return res.status(404).json({ error: 'media not found' })
    if (!sendManagedMedia(res, record)) return res.status(404).json({ error: 'media file is pending upload' })
  }))

  /** Native audio/video playback uses a signed URL so Range requests can seek. */
  app.post('/api/media/:id/playback', requireAuthenticated, wrap(async (req, res) => {
    if (!await mayReadManagedMedia(req.identity, req.params.id)) return res.status(404).json({ error: 'media not found' })
    const record = await managedMediaFile(req.params.id)
    if (!record) return res.status(404).json({ error: 'media not found' })
    const token = createMediaPlaybackToken(record.id, Date.now(), 4 * 60 * 60 * 1000, hasConsoleAccess(req.identity?.role))
    res.json({ url: `/api/media-playback/${encodeURIComponent(token)}` })
  }))

  app.get('/api/media-playback/:token', wrap(async (req, res) => {
    const claim = readMediaPlaybackToken(req.params.token)
    if (!claim) return res.status(404).json({ error: 'media link expired' })
    if (!claim.allowDraft) {
      const released = (await mediaRecords()).find((entry) => entry.id === claim.mediaId)
      if (!released || !isMediaReleased(released)) return res.status(404).json({ error: 'media not found' })
    }
    const record = await managedMediaFile(claim.mediaId)
    if (!record || !sendManagedMedia(res, record, { signed: true })) return res.status(404).json({ error: 'media not found' })
  }))

  /**
   * Whether this image may be removed.
   *
   * The record itself is removed by the client's write to the library document;
   * this route refuses active use and drops this managed alias. Content-addressed
   * bytes are reclaimed only after every database and library alias is gone.
   */
  app.delete('/api/media/:id', requireTab('resources', 'media'), wrap(async (req, res) => {
    const [ledgerRow] = await pool.query('SELECT v FROM app_state WHERE k = ?', [CONTENT_LEDGER_STATE_KEY])
    const [graphRow] = await pool.query('SELECT v FROM app_state WHERE k = ?', ['nishany-concept-graph-v2'])
    const ledger = ledgerRow.length ? JSON.parse(ledgerRow[0].v) : []
    const concepts = graphRow.length ? (JSON.parse(graphRow[0].v)?.concepts ?? []) : []
    const refusal = deleteRefusal(req.params.id, ledger, concepts)
    if (refusal) return res.status(409).json({ error: refusal })
    // A described library record is removed by the following state write. Keep
    // its durable row and bytes until that write commits; pending/duplicate
    // uploads have no description and can be reclaimed immediately.
    if (!(await mediaRecords()).some((record) => record.id === req.params.id)) {
      await deleteManagedMediaRow({ id: req.params.id })
    }
    res.json({ ok: true })
  }))

  app.post('/api/medical-resources/cleanup-uploads', requireTab('resources'), wrap(async (_req, res) => {
    const storedResources = (await medicalResourceRecords()).filter((resource) => resource.storageKey)
    if (!storedResources.length) return res.status(409).json({ error: 'no qualified stored resources are registered' })
    const missingResourceIds = storedResources
      .filter((resource) => {
        const fullPath = resolvedResourcePath(resource.storageKey)
        return !fullPath || !existsSync(fullPath)
      })
      .map((resource) => resource.id)
    if (missingResourceIds.length) return res.status(409).json({ error: 'qualified resources are still pending upload', missingResourceIds })
    await rm(resolve(RESOURCE_STORAGE_DIR, '.__uploads'), { recursive: true, force: true })
    res.json({ ok: true, storedResources: storedResources.length })
  }))

  app.get('/api/medical-resources/:resourceId/status', requireAuthenticated, wrap(async (req, res) => {
    const resource = await resourceRecord(req.params.resourceId)
    if (!resource) return res.status(404).json({ error: 'resource not found' })
    const fullPath = resolvedResourcePath(resource.storageKey)
    res.json({
      id: resource.id,
      available: Boolean(fullPath && existsSync(fullPath)),
      externalUrl: resource.sourceUri || null,
      storageKey: hasConsoleAccess(req.identity.role) ? resource.storageKey || null : undefined,
    })
  }))

  app.get('/api/medical-resources/:resourceId', requireAuthenticated, wrap(async (req, res) => {
    const resource = await resourceRecord(req.params.resourceId)
    if (!resource) return res.status(404).json({ error: 'resource not found' })
    if (resource.sourceUri) return res.redirect(302, resource.sourceUri)
    const fullPath = resolvedResourcePath(resource.storageKey)
    if (!fullPath || !existsSync(fullPath)) return res.status(404).json({ error: 'resource file is pending secure upload' })
    res.setHeader('Content-Type', resource.mediaType === 'pdf' ? 'application/pdf' : 'application/octet-stream')
    res.setHeader('Content-Disposition', `inline; filename="${basename(resource.title).replace(/["\r\n]/g, '')}"`)
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.sendFile(fullPath)
  }))

  app.put('/api/medical-resources/:resourceId/file', requireTab('resources'), wrap(async (req, res) => {
    const resource = await resourceRecord(req.params.resourceId)
    if (!resource) return res.status(404).json({ error: 'resource not found' })
    const fullPath = resolvedResourcePath(resource.storageKey)
    if (!fullPath) return res.status(400).json({ error: 'resource has no valid authenticated storage key' })
    if (existsSync(fullPath)) return res.status(409).json({ error: 'resource is already uploaded; replacement requires a separate reviewed operation' })
    const result = await receiveStream(req, fullPath, {
      maxBytes: RESOURCE_MAX_BYTES,
      expectedSha256: resource.sha256 || null,
    })
    res.json({ ok: true, id: resource.id, ...result })
  }))

  /**
   * Cloud delivery networks commonly cap a single request below textbook size.
   * These endpoints accept bounded chunks, then verify the reconstructed file
   * against the qualified source hash before it becomes visible to readers.
   */
  app.put('/api/medical-resources/:resourceId/chunks/:uploadId/:index', requireTab('resources'), wrap(async (req, res) => {
    const resource = await resourceRecord(req.params.resourceId)
    if (!resource) return res.status(404).json({ error: 'resource not found' })
    const fullPath = resolvedResourcePath(resource.storageKey)
    if (!fullPath) return res.status(400).json({ error: 'resource has no valid authenticated storage key' })
    if (existsSync(fullPath)) return res.status(409).json({ error: 'resource is already uploaded' })
    const uploadPath = resolvedChunkUploadPath(resource.id, req.params.uploadId)
    const index = Number(req.params.index)
    if (!uploadPath || !Number.isInteger(index) || index < 0 || index > 1023) return res.status(400).json({ error: 'invalid chunk upload path' })
    const declaredLength = Number(req.header('content-length'))
    if (Number.isFinite(declaredLength) && declaredLength > RESOURCE_CHUNK_MAX_BYTES) return res.status(413).json({ error: 'chunk exceeds configured limit' })
    const { sizeBytes } = await receiveChunk(req, uploadPath, index, RESOURCE_CHUNK_MAX_BYTES)
    res.json({ ok: true, index, sizeBytes })
  }))

  app.post('/api/medical-resources/:resourceId/chunks/:uploadId/complete', requireTab('resources'), wrap(async (req, res) => {
    const resource = await resourceRecord(req.params.resourceId)
    if (!resource) return res.status(404).json({ error: 'resource not found' })
    const fullPath = resolvedResourcePath(resource.storageKey)
    if (!fullPath) return res.status(400).json({ error: 'resource has no valid authenticated storage key' })
    if (existsSync(fullPath)) return res.status(409).json({ error: 'resource is already uploaded' })
    const uploadPath = resolvedChunkUploadPath(resource.id, req.params.uploadId)
    const totalChunks = Number(req.body?.totalChunks)
    const declaredSize = Number(req.body?.sizeBytes)
    if (!uploadPath || !Number.isInteger(totalChunks) || totalChunks < 1 || totalChunks > 1024) return res.status(400).json({ error: 'invalid chunk count' })
    if (!Number.isFinite(declaredSize) || declaredSize < 1 || declaredSize > RESOURCE_CHUNKED_MAX_BYTES) return res.status(413).json({ error: 'resource exceeds configured chunked-upload limit' })

    try {
      const result = await assembleChunks(uploadPath, fullPath, {
        totalChunks,
        declaredSize,
        maxBytes: RESOURCE_CHUNKED_MAX_BYTES,
        chunkMaxBytes: RESOURCE_CHUNK_MAX_BYTES,
        expectedSha256: resource.sha256 || null,
      })
      // A successful, hash-verified assembly makes every partial attempt for
      // this resource obsolete. Remove the resource's entire upload workspace
      // so interrupted retry profiles do not consume persistent-volume space.
      await rm(dirname(uploadPath), { recursive: true, force: true })
      res.json({ ok: true, id: resource.id, ...result })
    } catch (error) {
      if (error.status) return res.status(error.status).json({ error: error.message })
      throw error
    }
  }))
}
