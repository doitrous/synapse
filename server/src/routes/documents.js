/**
 * A student's own uploads — quota, chunked upload, download and delete.
 */
import { randomUUID } from 'node:crypto'
import { existsSync } from 'node:fs'
import { unlink } from 'node:fs/promises'
import { basename, join, resolve, sep } from 'node:path'
import { entitlementOf } from '../accounts.js'
import { requireAuthenticated } from '../auth.js'
import { pool } from '../db.js'
import { RESOURCE_CHUNK_MAX_BYTES, RESOURCE_STORAGE_DIR, byUser, wrap } from '../http.js'
import { resolvedResourcePath } from '../mediaStore.js'
import { rateLimited } from '../rateLimit.js'
import { effectivePlan, limitFor, readStorageLimits } from '../storage.js'
import { assembleChunks, receiveChunk, resolveUploadWorkspace } from '../uploads.js'

export function registerDocumentRoutes(app) {
  /* ── A student's own documents ───────────────────────────────────────────── */

  /**
   * Uploads that belong to one account.
   *
   * Every query filters on `user_id = req.identity.id`: ownership is a `WHERE`
   * clause, never a claim the client makes. The storage key is generated here for
   * the same reason — the client says what the file is called, not where it goes.
   *
   * The bytes live on the server rather than in the browser because the notes
   * about them already do. Annotations are `user_state` and therefore sync; a
   * document that lived only in IndexedDB would leave the same reader empty on a
   * phone with the student's own marks stranded behind it.
   */
  const MY_DOCUMENT_MAX_BYTES = Number(process.env.MY_DOCUMENT_MAX_BYTES) || 100 * 1024 * 1024
  /**
   * The fallback ceiling, used until an administrator sets one.
   *
   * The quota used to be this number and nothing else — the same for everybody,
   * changeable only by redeploying. It is now the default a stored settings
   * document starts from, and each plan may name its own.
   */
  const MY_DOCUMENT_QUOTA_BYTES = Number(process.env.MY_DOCUMENT_QUOTA_BYTES) || 1024 * 1024 * 1024
  const STORAGE_LIMITS_KEY = 'nishany-storage-limits-v1'

  /**
   * How much room this caller has, and how much of it is gone.
   *
   * Resolved per request from the plan they are on rather than written onto their
   * record, so an upgrade takes effect at once and a lapse does too. A settings
   * document that is missing or malformed falls back to the default: a broken
   * one must not stop students uploading, and must certainly not hand them
   * unlimited room.
   */
  async function documentAllowance(userId) {
    const [[settings]] = await pool.query('SELECT v FROM app_state WHERE k = ?', [STORAGE_LIMITS_KEY])
    let stored = null
    try { stored = settings?.v ? JSON.parse(settings.v) : null } catch { stored = null }
    const limits = readStorageLimits(stored ?? { defaultBytes: MY_DOCUMENT_QUOTA_BYTES })

    const [[subscription]] = await pool.query(
      `SELECT s.plan, s.status, s.expires_at
         FROM subscriptions s
         JOIN students st ON st.id = s.student_id
        WHERE st.user_id = ?
        ORDER BY s.started_at DESC LIMIT 1`,
      [userId],
    )
    const plan = effectivePlan(entitlementOf(subscription))

    const [[usage]] = await pool.query(
      'SELECT COALESCE(SUM(size_bytes), 0) AS usedBytes FROM user_documents WHERE user_id = ? AND deleted_at IS NULL',
      [userId],
    )
    return { plan, usedBytes: Number(usage.usedBytes), quotaBytes: limitFor(limits, plan) }
  }
  const MY_DOCUMENT_ROOT = resolve(RESOURCE_STORAGE_DIR, 'my-documents')

  function documentTitle(raw) {
    const title = String(raw ?? '').trim().replace(/[\r\n\t]/g, ' ').slice(0, 200)
    return title || 'Untitled document'
  }

  /**
   * What a student is uploading, decided here rather than taken on trust.
   *
   * Only two kinds exist. `pdf` is what the in-app reader can open and is
   * therefore what the annotation surfaces list. `file` is everything else — a
   * slide deck, an image, a spreadsheet a student wants pinned to a whiteboard —
   * and is only ever handed back as a download.
   *
   * The extension is derived from the name and reduced to letters and digits: it
   * decides a path on disk, so it is a value this server computes, never one the
   * client supplies.
   */
  const PDF_MIME = 'application/pdf'

  function describeUpload(body) {
    const fileName = String(body?.fileName ?? '').trim().replace(/[\r\n\t/\\]/g, ' ').slice(0, 200)
    const declaredMime = String(body?.mimeType ?? '').trim().slice(0, 120)
    const extension = (fileName.match(/\.([A-Za-z0-9]{1,8})$/)?.[1] ?? '').toLowerCase()
    const isPdf = declaredMime === PDF_MIME || extension === 'pdf' || (!declaredMime && !extension)
    return {
      kind: isPdf ? 'pdf' : 'file',
      extension: isPdf ? 'pdf' : (extension || 'bin'),
      fileName: fileName || null,
      // A type the browser will act on is not something to accept from a client.
      // Anything that is not a PDF is stored and returned as opaque bytes.
      mimeType: isPdf ? PDF_MIME : 'application/octet-stream',
    }
  }

  async function myDocument(userId, id) {
    const [rows] = await pool.query(
      `SELECT id, title, storage_key AS storageKey, media_type AS mediaType, file_name AS fileName,
         mime_type AS mimeType, size_bytes AS sizeBytes, sha256, page_count AS pageCount,
         source_kind AS sourceKind, source_id AS sourceId, created_at AS createdAt
       FROM user_documents WHERE id = ? AND user_id = ? AND deleted_at IS NULL`,
      [id, userId],
    )
    return rows[0] || null
  }

  app.get('/api/my-documents', requireAuthenticated, wrap(async (req, res) => {
    const [rows] = await pool.query(
      `SELECT id, title, media_type AS mediaType, file_name AS fileName, mime_type AS mimeType,
         size_bytes AS sizeBytes, page_count AS pageCount, source_kind AS sourceKind,
         source_id AS sourceId, created_at AS createdAt
       FROM user_documents WHERE user_id = ? AND deleted_at IS NULL ORDER BY created_at DESC`,
      [req.identity.id],
    )
    const allowance = await documentAllowance(req.identity.id)
    res.json({ items: rows, usedBytes: allowance.usedBytes, quotaBytes: allowance.quotaBytes, plan: allowance.plan })
  }))

  app.post('/api/my-documents', requireAuthenticated, rateLimited('my_documents_upload_start', byUser, 20, 60 * 60_000), wrap(async (req, res) => {
    const id = randomUUID()
    const upload = describeUpload(req.body)
    // Generated here, never accepted: a path is not something a client gets to say.
    const storageKey = join('my-documents', req.identity.id.replace(/[^a-zA-Z0-9_-]/g, '_'), `${id}.${upload.extension}`)
    const sourceKind = ['notebook', 'whiteboard'].includes(req.body?.sourceKind) ? req.body.sourceKind : 'resource'
    const sourceId = String(req.body?.sourceId ?? '').trim().replace(/[\r\n\t]/g, ' ').slice(0, 64) || null
    await pool.query(
      `INSERT INTO user_documents
         (id, user_id, title, storage_key, media_type, file_name, mime_type, source_kind, source_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, req.identity.id, documentTitle(req.body?.title), storageKey, upload.kind, upload.fileName, upload.mimeType, sourceKind, sourceId],
    )
    res.json({ id, uploadId: randomUUID().replace(/-/g, ''), chunkMaxBytes: RESOURCE_CHUNK_MAX_BYTES, mediaType: upload.kind })
  }))

  app.put('/api/my-documents/:id/chunks/:uploadId/:index', requireAuthenticated, wrap(async (req, res) => {
    const document = await myDocument(req.identity.id, req.params.id)
    if (!document) return res.status(404).json({ error: 'document not found' })
    const fullPath = resolvedResourcePath(document.storageKey)
    if (!fullPath) return res.status(400).json({ error: 'document has no valid storage key' })
    if (existsSync(fullPath)) return res.status(409).json({ error: 'document is already uploaded' })
    const workspace = resolveUploadWorkspace(RESOURCE_STORAGE_DIR, `u-${req.identity.id}-${document.id}`, req.params.uploadId)
    const index = Number(req.params.index)
    if (!workspace || !Number.isInteger(index) || index < 0 || index > 1023) return res.status(400).json({ error: 'invalid chunk upload path' })
    const declaredLength = Number(req.header('content-length'))
    if (Number.isFinite(declaredLength) && declaredLength > RESOURCE_CHUNK_MAX_BYTES) return res.status(413).json({ error: 'chunk exceeds configured limit' })
    const { sizeBytes } = await receiveChunk(req, workspace, index, RESOURCE_CHUNK_MAX_BYTES)
    res.json({ ok: true, index, sizeBytes })
  }))

  app.post('/api/my-documents/:id/chunks/:uploadId/complete', requireAuthenticated, wrap(async (req, res) => {
    const document = await myDocument(req.identity.id, req.params.id)
    if (!document) return res.status(404).json({ error: 'document not found' })
    const fullPath = resolvedResourcePath(document.storageKey)
    if (!fullPath || !fullPath.startsWith(`${MY_DOCUMENT_ROOT}${sep}`)) return res.status(400).json({ error: 'document has no valid storage key' })
    if (existsSync(fullPath)) return res.status(409).json({ error: 'document is already uploaded' })
    const workspace = resolveUploadWorkspace(RESOURCE_STORAGE_DIR, `u-${req.identity.id}-${document.id}`, req.params.uploadId)
    const totalChunks = Number(req.body?.totalChunks)
    const declaredSize = Number(req.body?.sizeBytes)
    if (!workspace || !Number.isInteger(totalChunks) || totalChunks < 1 || totalChunks > 1024) return res.status(400).json({ error: 'invalid chunk count' })
    if (!Number.isFinite(declaredSize) || declaredSize < 1 || declaredSize > MY_DOCUMENT_MAX_BYTES) {
      return res.status(413).json({ error: `a document may be up to ${Math.round(MY_DOCUMENT_MAX_BYTES / (1024 * 1024))} MB` })
    }

    // Checked here rather than at the start: only now is the real size known,
    // and a quota that is enforced against a declaration is not enforced.
    const allowance = await documentAllowance(req.identity.id)
    if (allowance.quotaBytes <= 0) {
      return res.status(409).json({ error: 'your plan does not include space for your own documents' })
    }
    if (allowance.usedBytes + declaredSize > allowance.quotaBytes) {
      return res.status(409).json({ error: 'that would go past the space on your account' })
    }

    try {
      const result = await assembleChunks(workspace, fullPath, {
        totalChunks,
        declaredSize,
        maxBytes: MY_DOCUMENT_MAX_BYTES,
        chunkMaxBytes: RESOURCE_CHUNK_MAX_BYTES,
        // Only a document that claims to be a PDF is held to being one.
        requirePdf: document.mediaType === 'pdf',
      })
      await pool.query(
        'UPDATE user_documents SET size_bytes = ?, sha256 = ?, page_count = ? WHERE id = ? AND user_id = ?',
        [result.sizeBytes, result.sha256, Number(req.body?.pageCount) || null, document.id, req.identity.id],
      )
      res.json({ ok: true, id: document.id, ...result })
    } catch (error) {
      if (error.status) return res.status(error.status).json({ error: error.message })
      throw error
    }
  }))

  app.patch('/api/my-documents/:id', requireAuthenticated, wrap(async (req, res) => {
    const [result] = await pool.query(
      'UPDATE user_documents SET title = ? WHERE id = ? AND user_id = ? AND deleted_at IS NULL',
      [documentTitle(req.body?.title), req.params.id, req.identity.id],
    )
    if (!result.affectedRows) return res.status(404).json({ error: 'document not found' })
    res.json({ ok: true })
  }))

  app.get('/api/my-documents/:id/file', requireAuthenticated, wrap(async (req, res) => {
    const document = await myDocument(req.identity.id, req.params.id)
    if (!document) return res.status(404).json({ error: 'document not found' })
    const fullPath = resolvedResourcePath(document.storageKey)
    if (!fullPath || !existsSync(fullPath)) return res.status(404).json({ error: 'document file is still uploading' })
    const isPdf = document.mediaType === 'pdf'
    const safeImageMime = /^(?:image\/(?:avif|gif|jpeg|png|webp))$/i.test(document.mimeType ?? '') ? document.mimeType : null
    const name = basename(document.fileName || `${document.title}.${isPdf ? 'pdf' : 'bin'}`).replace(/["\r\n]/g, '')
    res.setHeader('Content-Type', isPdf ? 'application/pdf' : safeImageMime ?? 'application/octet-stream')
    // Reviewed raster types and PDFs can render inline. Everything else remains
    // a download, whatever MIME type the uploader supplied.
    res.setHeader('Content-Disposition', `${isPdf || safeImageMime ? 'inline' : 'attachment'}; filename="${name}"`)
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.sendFile(fullPath)
  }))

  app.delete('/api/my-documents/:id', requireAuthenticated, wrap(async (req, res) => {
    const document = await myDocument(req.identity.id, req.params.id)
    if (!document) return res.status(404).json({ error: 'document not found' })
    await pool.query(
      'UPDATE user_documents SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
      [document.id, req.identity.id],
    )
    const fullPath = resolvedResourcePath(document.storageKey)
    if (fullPath) await unlink(fullPath).catch(() => {})
    res.json({ ok: true })
  }))
}
