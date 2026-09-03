/**
 * Study Together rooms.
 */
import { requireAuthenticated } from '../auth.js'
import { wrap } from '../http.js'
import { createRoom, finishRoom, joinRoom, myRooms, roomFor, startRoom, submitAnswer } from '../studyRooms.js'

export function registerStudyRoomRoutes(app) {
  /* ── Study Together ──────────────────────────────────────────────────────── */

  app.post('/api/study-rooms', requireAuthenticated, wrap(async (req, res) => {
    res.json(await createRoom(req.identity.id, req.body ?? {}))
  }))

  app.post('/api/study-rooms/join', requireAuthenticated, wrap(async (req, res) => {
    res.json(await joinRoom(req.identity.id, req.body?.code))
  }))

  app.get('/api/study-rooms/mine', requireAuthenticated, wrap(async (req, res) => {
    res.json({ rooms: await myRooms(req.identity.id) })
  }))

  app.get('/api/study-rooms/:id', requireAuthenticated, wrap(async (req, res) => {
    const room = await roomFor(req.identity.id, req.params.id)
    // A non-member gets the same answer as a non-existent room: whether a room
    // exists is not something a stranger should be able to probe.
    if (!room) return res.status(404).json({ error: 'room not found' })
    res.json({ room })
  }))

  app.post('/api/study-rooms/:id/start', requireAuthenticated, wrap(async (req, res) => {
    res.json(await startRoom(req.identity.id, req.params.id))
  }))

  app.post('/api/study-rooms/:id/answers', requireAuthenticated, wrap(async (req, res) => {
    res.json(await submitAnswer(req.identity.id, req.params.id, req.body ?? {}))
  }))

  app.post('/api/study-rooms/:id/finish', requireAuthenticated, wrap(async (req, res) => {
    res.json(await finishRoom(req.identity.id, req.params.id))
  }))
}
