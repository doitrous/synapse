import { heldTabs, mfaSatisfied, requireTab } from '../auth.js'
import { wrap } from '../http.js'
import {
  VALIDATOR_ROLE,
  assignValidationBatch,
  createValidationBatch,
  ownValidationBatch,
  ownValidationMedia,
  ownValidationWorkspace,
  submitValidationResponse,
  uploadValidationSource,
  validationAnalytics,
  validationSetup,
  validationSource,
} from '../mcqValidation.js'
import { sendManagedMedia } from '../mediaStore.js'

const ANALYTICS_ROLES = new Set(['admin', 'editor', 'super_admin'])

export function isValidationAdmin(role) {
  return ANALYTICS_ROLES.has(role)
}

function requireValidator(req, res, next) {
  if (req.identity?.role !== VALIDATOR_ROLE) return res.status(403).json({ error: 'mcq validator role required' })
  return next()
}

function requireValidationAdmin(req, res, next) {
  if (!isValidationAdmin(req.identity?.role)) return res.status(403).json({ error: 'administrator role required' })
  return requireTab('validation')(req, res, next)
}

function sendResult(res, result, created = false) {
  if (!result?.error) return res.status(created ? 201 : 200).json(result)
  const status = result.error.includes('not_found') || result.error === 'assignment_not_found' ? 404
    : result.error === 'already_submitted' || result.error === 'assignment_completed' || result.error === 'batch_closed' ? 409
      : 400
  return res.status(status).json(result)
}

export function registerMcqValidationRoutes(app) {
  app.get('/api/mcq-validator/workspace', requireValidator, wrap(async (req, res) => {
    res.json(await ownValidationWorkspace(req.identity.id))
  }))

  app.get('/api/mcq-validator/batches/:id', requireValidator, wrap(async (req, res) => {
    const batch = await ownValidationBatch(req.identity.id, req.params.id)
    if (!batch) return res.status(404).json({ error: 'assignment not found' })
    res.json(batch)
  }))

  app.post('/api/mcq-validator/batches/:id/submissions', requireValidator, wrap(async (req, res) => {
    sendResult(res, await submitValidationResponse(req.identity.id, req.params.id, req.body))
  }))

  app.post('/api/mcq-validator/sources', requireValidator, wrap(async (req, res) => {
    sendResult(res, await uploadValidationSource(req.identity.id, req.body), true)
  }))

  app.get('/api/mcq-validator/media/:id', requireValidator, wrap(async (req, res) => {
    const record = await ownValidationMedia(req.identity.id, req.params.id)
    if (!record || !sendManagedMedia(res, record)) return res.status(404).json({ error: 'media not found' })
  }))

  // A single content route serves an owner and an authorised administrator.
  // Ownership is checked here, before bytes or even metadata leave the server.
  app.get('/api/mcq-validator/sources/:id/content', wrap(async (req, res) => {
    const ownerRequest = req.identity?.role === VALIDATOR_ROLE
    if (!ownerRequest) {
      if (!isValidationAdmin(req.identity?.role)) return res.status(403).json({ error: 'administrator role required' })
      if (!mfaSatisfied(req.identity) || !(await heldTabs(req.identity)).includes('validation')) {
        return res.status(403).json({ error: 'validation analytics access required' })
      }
    }
    const source = await validationSource(req.params.id)
    if (!source) return res.status(404).json({ error: 'source not found' })
    if (ownerRequest && req.identity?.id !== source.validatorId) {
      return res.status(404).json({ error: 'source not found' })
    }
    if (source.contentBytes) {
      res.set('Content-Type', source.mimeType || 'application/octet-stream')
      res.set('X-Content-Type-Options', 'nosniff')
      res.set('Cache-Control', 'private, no-store')
      const safeName = [...String(source.fileName || source.title || 'evidence')]
        .map((character) => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127 || character === '"' || character === '\\' ? '_' : character)
        .join('')
      const inline = source.mimeType === 'application/pdf' || ['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(source.mimeType)
      res.set('Content-Disposition', `${inline ? 'inline' : 'attachment'}; filename="${safeName}"`)
      return res.send(source.contentBytes)
    }
    if (source.sourceUrl) return res.redirect(302, source.sourceUrl)
    return res.status(404).json({ error: 'source content not found' })
  }))

  app.get('/api/admin/mcq-validation/setup', requireValidationAdmin, wrap(async (_req, res) => {
    res.json(await validationSetup())
  }))

  app.post('/api/admin/mcq-validation/batches', requireValidationAdmin, wrap(async (req, res) => {
    sendResult(res, await createValidationBatch(req.identity.id, req.body), true)
  }))

  app.post('/api/admin/mcq-validation/batches/:id/assign', requireValidationAdmin, wrap(async (req, res) => {
    sendResult(res, await assignValidationBatch(req.identity.id, req.params.id, req.body?.validatorIds))
  }))

  app.get('/api/admin/mcq-validation/analytics', requireValidationAdmin, wrap(async (req, res) => {
    res.json(await validationAnalytics(req.query))
  }))
}
