/**
 * Build Maristanas — the study-time construction game.
 */
import { requireAuthenticated } from '../auth.js'
import { wrap } from '../http.js'
import { maristanaOverview, recordStudyHeartbeat, renameHospital } from '../maristanas.js'

export function registerMaristanaRoutes(app) {
  /* ── Build Maristanas ──────────────────────────────────────────────────── */

  app.get('/api/maristanas', requireAuthenticated, wrap(async (req, res) => {
    res.json(await maristanaOverview(req.identity.id))
  }))

  app.post('/api/maristanas/study-heartbeat', requireAuthenticated, wrap(async (req, res) => {
    const result = await recordStudyHeartbeat(req.identity.id, req.body ?? {})
    if (result.error) return res.status(400).json(result)
    res.json(result)
  }))

  app.patch('/api/maristanas/:slot', requireAuthenticated, wrap(async (req, res) => {
    const result = await renameHospital(req.identity.id, req.params.slot, req.body?.name)
    if (result.error) return res.status(result.error === 'hospital_not_unlocked' ? 403 : 400).json(result)
    res.json(result)
  }))
}
