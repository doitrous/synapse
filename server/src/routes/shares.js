/**
 * Shared notes and whiteboards, plus the notifications they raise.
 */
import { existsSync } from 'node:fs'
import { basename } from 'node:path'
import { requireAuthenticated } from '../auth.js'
import { wrap } from '../http.js'
import { resolvedResourcePath } from '../mediaStore.js'
import { createShare, deleteShare, listDiscoverableShares, listShareNotifications, listShares, markShareNotificationsRead, readShare, readShareAsset, setShareFollow, setShareStar, shareRevisionHistory, updateShare } from '../shares.js'

export function registerShareRoutes(app) {
  /* ── Shared notes and whiteboards ────────────────────────────────────────── */

  /**
   * A note or a board, published behind a link.
   *
   * The permission rules are in `shares.js`, deliberately away from the routing,
   * because they are the only thing between "shared with my study group" and
   * "on the open web". Every share route requires a session, and direct reads
   * remain restricted to the owner's university and year.
   */
  app.post('/api/shares', requireAuthenticated, wrap(async (req, res) => {
    const result = await createShare(req.identity.id, req.body ?? {})
    if (result.error) return res.status(400).json({ error: result.error })
    res.json(result)
  }))

  app.get('/api/shares', requireAuthenticated, wrap(async (req, res) => {
    res.json(await listDiscoverableShares(req.identity.id, { kind: req.query.kind }))
  }))

  app.get('/api/shares/mine', requireAuthenticated, wrap(async (req, res) => {
    res.json(await listShares(req.identity.id, { kind: req.query.kind }))
  }))

  app.get('/api/shares/:id', requireAuthenticated, wrap(async (req, res) => {
    const result = await readShare(req.params.id, req.identity?.id ?? null)
    if (result.error) return res.status(404).json({ error: result.error })
    res.json(result.share)
  }))

  app.get('/api/shares/:id/assets/:documentId', requireAuthenticated, wrap(async (req, res) => {
    const result = await readShareAsset(req.params.id, req.params.documentId, req.identity.id)
    if (result.error) return res.status(404).json({ error: 'asset not found' })
    const fullPath = resolvedResourcePath(result.document.storageKey)
    if (!fullPath || !existsSync(fullPath)) return res.status(404).json({ error: 'asset not found' })
    const safeMime = /^(?:image\/(?:avif|gif|jpeg|png|webp)|application\/pdf)$/i.test(result.document.mimeType ?? '')
      ? result.document.mimeType
      : 'application/octet-stream'
    res.setHeader('Content-Type', safeMime)
    res.setHeader('Content-Disposition', `inline; filename="${basename(result.document.fileName || result.document.title).replace(/["\r\n]/g, '')}"`)
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.sendFile(fullPath)
  }))

  app.put('/api/shares/:id', requireAuthenticated, wrap(async (req, res) => {
    const result = await updateShare(req.params.id, req.identity.id, req.body ?? {})
    if (result.error === 'not_found') return res.status(404).json({ error: result.error })
    if (result.error === 'stale_revision') return res.status(409).json({ error: result.error, currentRevision: result.currentRevision })
    if (result.error) return res.status(400).json({ error: result.error })
    res.json(result.share)
  }))

  app.put('/api/shares/:id/star', requireAuthenticated, wrap(async (req, res) => {
    const result = await setShareStar(req.params.id, req.identity.id, Boolean(req.body?.starred))
    if (result.error) return res.status(result.error === 'not_found' ? 404 : 400).json({ error: result.error })
    res.json(result.share)
  }))

  app.put('/api/shares/:id/follow', requireAuthenticated, wrap(async (req, res) => {
    const result = await setShareFollow(req.params.id, req.identity.id, Boolean(req.body?.following))
    if (result.error) return res.status(result.error === 'not_found' ? 404 : 400).json({ error: result.error })
    res.json(result.share)
  }))

  app.get('/api/shares/:id/revisions', requireAuthenticated, wrap(async (req, res) => {
    const result = await shareRevisionHistory(req.params.id, req.identity.id)
    if (result.error) return res.status(404).json({ error: result.error })
    res.json(result.revisions)
  }))

  app.delete('/api/shares/:id', requireAuthenticated, wrap(async (req, res) => {
    const result = await deleteShare(req.params.id, req.identity.id)
    if (result.error) return res.status(404).json({ error: result.error })
    res.json({ ok: true })
  }))

  app.get('/api/notifications/shared', requireAuthenticated, wrap(async (req, res) => {
    res.json(await listShareNotifications(req.identity.id, { limit: req.query.limit }))
  }))

  app.post('/api/notifications/shared/read', requireAuthenticated, wrap(async (req, res) => {
    res.json(await markShareNotificationsRead(req.identity.id, req.body?.ids))
  }))
}
