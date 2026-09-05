/**
 * Verified QBank attempts, answer distributions and leaderboards.
 */
import { answerDistributionFor } from '../answerDistribution.js'
import { requireAuthenticated } from '../auth.js'
import { wrap } from '../http.js'
import { leaderboardFor, recordVerifiedAttempts } from '../qbankAttempts.js'

export function registerQbankRoutes(app) {
  app.post('/api/qbank/attempts', requireAuthenticated, wrap(async (req, res) => {
    const result = await recordVerifiedAttempts(req.identity.id, req.body ?? {})
    if (result.error) return res.status(result.error === 'profile_incomplete' ? 409 : 400).json(result)
    res.json(result)
  }))

  app.post('/api/qbank/answer-distribution', requireAuthenticated, wrap(async (req, res) => {
    const result = await answerDistributionFor(req.identity.id, req.body?.questionIds ?? [])
    if (result.error) return res.status(result.error === 'profile_incomplete' ? 409 : 400).json(result)
    res.json(result)
  }))

  app.get('/api/leaderboards', requireAuthenticated, wrap(async (req, res) => {
    const result = await leaderboardFor(req.identity.id, {
      metric: req.query?.metric === 'mastery' ? 'mastery' : 'accuracy',
      term: req.query?.term ? String(req.query.term) : 'current',
      limit: Math.min(Number(req.query?.limit) || 50, 100),
    })
    if (result.error) return res.status(409).json(result)
    res.json(result)
  }))
}
