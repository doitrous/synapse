/**
 * The study assistant and the essay grader — both spend the assistant AI quota,
 * so they share a file. Every decision that costs money is made in assistant.js.
 */
import { adminSettings as assistantAdminSettings, chat as assistantChat, deleteTierLimit as assistantDeleteTierLimit, listModels as assistantModels, saveSettings as assistantSaveSettings, saveTierLimit as assistantSaveTierLimit, statusFor as assistantStatus, usageSummary as assistantUsage } from '../assistant.js'
import { requireAuthenticated, requireTab } from '../auth.js'
import { gradeEssay } from '../essayGrade.js'
import { byUser, wrap } from '../http.js'
import { rateLimited } from '../rateLimit.js'

export function registerEssayRoutes(app) {
  // AI essay grading — advisory, display-only; charges the assistant AI quota.
  app.post('/api/essay/grade', requireAuthenticated, rateLimited('essay_grade', byUser, 30, 15 * 60_000), wrap(async (req, res) => {
    const result = await gradeEssay(req.identity, req.body ?? {})
    if (result.error) return res.status(result.status ?? 400).json(result)
    return res.json(result)
  }))
}

export function registerAssistantRoutes(app) {
  /* ── Study assistant ──────────────────────────────────────────────────────
     The student routes are thin: every decision that costs money or grants
     access is made in `assistant.js`, so there is one place to read to know what
     a student is allowed to spend. The admin routes never return the API key —
     only whether one is set and its last four characters. */

  app.get('/api/assistant/status', requireAuthenticated, wrap(async (req, res) => {
    res.json(await assistantStatus(req.identity))
  }))

  app.post('/api/assistant/chat', requireAuthenticated, rateLimited('assistant_chat', byUser, 30, 15 * 60_000), wrap(async (req, res) => {
    const result = await assistantChat(req.identity, {
      messages: req.body?.messages,
      lang: req.body?.lang === 'ar' ? 'ar' : 'en',
      context: req.body?.context ?? null,
    })
    if (result.error) return res.status(result.status ?? 400).json(result)
    return res.json(result)
  }))

  app.get('/api/admin/assistant', requireTab('assistant'), wrap(async (_req, res) => {
    res.json(await assistantAdminSettings())
  }))

  app.put('/api/admin/assistant', requireTab('assistant'), wrap(async (req, res) => {
    const result = await assistantSaveSettings(req.body ?? {}, req.identity.id)
    if (result.error) return res.status(400).json(result)
    return res.json(result)
  }))

  app.put('/api/admin/assistant/tiers/:plan', requireTab('assistant'), wrap(async (req, res) => {
    const result = await assistantSaveTierLimit({ ...req.body, plan: req.params.plan })
    if (result.error) return res.status(400).json(result)
    return res.json(result)
  }))

  app.delete('/api/admin/assistant/tiers/:plan', requireTab('assistant'), wrap(async (req, res) => {
    const result = await assistantDeleteTierLimit(req.params.plan)
    if (result.error) return res.status(400).json(result)
    return res.json(result)
  }))

  app.get('/api/admin/assistant/usage', requireTab('assistant'), wrap(async (req, res) => {
    res.json(await assistantUsage({ days: req.query.days }))
  }))

  // Asked of the provider, so the model list is what it will actually accept
  // today rather than what was true when this was written.
  app.get('/api/admin/assistant/models', requireTab('assistant'), wrap(async (req, res) => {
    const result = await assistantModels(req.query.provider)
    if (result.error) return res.status(result.status ?? 502).json(result)
    return res.json(result)
  }))
}
