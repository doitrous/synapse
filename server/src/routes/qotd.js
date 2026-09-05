/**
 * Question of the Day.
 */
import { requireAuthenticated } from '../auth.js'
import { wrap } from '../http.js'
import { qotdFriends, qotdLeaderboard, qotdToday, recordQotdAnswer } from '../qotd.js'

export function registerQotdRoutes(app) {
  /* ── Question of the Day ────────────────────────────────────────────────── */

  app.get('/api/qotd/today', requireAuthenticated, wrap(async (req, res) => {
    const result = await qotdToday(req.identity.id)
    if (result.error) return res.status(result.error === 'profile_incomplete' ? 409 : 400).json(result)
    res.json(result)
  }))

  app.post('/api/qotd/answer', requireAuthenticated, wrap(async (req, res) => {
    const result = await recordQotdAnswer(req.identity.id, req.body ?? {})
    if (result.error) {
      const code = result.error === 'profile_incomplete' ? 409 : result.error === 'not_todays_question' ? 409 : 400
      return res.status(code).json(result)
    }
    res.json(result)
  }))

  app.get('/api/qotd/leaderboard', requireAuthenticated, wrap(async (req, res) => {
    const result = await qotdLeaderboard(req.identity.id, { limit: Math.min(Number(req.query?.limit) || 50, 100) })
    if (result.error) return res.status(409).json(result)
    res.json(result)
  }))

  app.get('/api/qotd/friends', requireAuthenticated, wrap(async (req, res) => {
    const result = await qotdFriends(req.identity.id)
    if (result.error) return res.status(409).json(result)
    res.json(result)
  }))
}
