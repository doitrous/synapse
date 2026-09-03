/**
 * Head-to-head challenges.
 */
import { requireAuthenticated } from '../auth.js'
import { challengeFor, createChallenge, finishChallenge, myChallenges, respondToChallenge, submitChallengeAnswer } from '../challenges.js'
import { wrap } from '../http.js'

export function registerChallengeRoutes(app) {
  /* ── Challenges ──────────────────────────────────────────────────────────── */

  app.post('/api/challenges', requireAuthenticated, wrap(async (req, res) => {
    res.json(await createChallenge(req.identity.id, req.body ?? {}))
  }))

  app.get('/api/challenges/mine', requireAuthenticated, wrap(async (req, res) => {
    res.json({ challenges: await myChallenges(req.identity.id) })
  }))

  app.get('/api/challenges/:id', requireAuthenticated, wrap(async (req, res) => {
    const challenge = await challengeFor(req.identity.id, req.params.id)
    // A non-participant gets the same answer as a non-existent challenge: whether
    // a challenge exists between two other people is not theirs to probe.
    if (!challenge) return res.status(404).json({ error: 'challenge not found' })
    res.json({ challenge })
  }))

  app.post('/api/challenges/:id/respond', requireAuthenticated, wrap(async (req, res) => {
    res.json(await respondToChallenge(req.identity.id, req.params.id, Boolean(req.body?.accept)))
  }))

  app.post('/api/challenges/:id/answers', requireAuthenticated, wrap(async (req, res) => {
    res.json(await submitChallengeAnswer(req.identity.id, req.params.id, req.body ?? {}))
  }))

  app.post('/api/challenges/:id/finish', requireAuthenticated, wrap(async (req, res) => {
    res.json(await finishChallenge(req.identity.id, req.params.id))
  }))
}
