import { inviteToRoom,roomInvitationFor,respondToRoomInvitation,roomInvitationNotifications } from '../roomInvitations.js'
/**
 * Study parties: the party itself, its seats and activity, its games and its
 * question sessions.
 */
import { requireAuthenticated } from '../auth.js'
import { wrap } from '../http.js'
import { answerItem, closeSession, createParty, createSession, ensureSeated, joinByCode, leaveParty, myParties, openParties, partyFor, partyMembers, recordActivity, resolvePartyId, sessionFor, sessionsFor, setSeat, setScope, setVisibility } from '../parties.js'
import { actOnPartyGame, createPartyGame, partyGameFor, partyGamesFor, streamPartyGameEvents } from '../partyGames.js'
import { notifyRoomPresence } from '../roomsRealtime.js'

export function registerPartyRoutes(app) {
  app.get('/api/notifications/rooms',requireAuthenticated,wrap(async(req,res)=>res.json(await roomInvitationNotifications(req.identity.id))))
  app.post('/api/parties/:id/invitations',requireAuthenticated,wrap(async(req,res)=>res.json(await inviteToRoom(req.identity.id,req.params.id,req.body))))
  app.get('/api/room-invitations/:id',requireAuthenticated,wrap(async(req,res)=>{const invitation=await roomInvitationFor(req.identity.id,req.params.id);res.status(invitation?200:404).json({invitation})}))
  app.post('/api/room-invitations/:id/respond',requireAuthenticated,wrap(async(req,res)=>{const result=await respondToRoomInvitation(req.identity.id,req.params.id,req.body?.accept);if(result.party)notifyRoomPresence(result.party.id);res.json(result)}))

  /* ── Study parties ───────────────────────────────────────────────────────── */

  app.post('/api/parties', requireAuthenticated, wrap(async (req, res) => {
    res.json(await createParty(req.identity.id, req.body ?? {}))
  }))

  app.post('/api/parties/join', requireAuthenticated, wrap(async (req, res) => {
    res.json(await joinByCode(req.identity.id, req.body?.code))
  }))

  app.get('/api/parties/mine', requireAuthenticated, wrap(async (req, res) => {
    res.json({ parties: await myParties(req.identity.id) })
  }))

  app.get('/api/parties/open', requireAuthenticated, wrap(async (req, res) => {
    res.json({ parties: await openParties(req.identity.id) })
  }))

  app.get('/api/parties/:id', requireAuthenticated, wrap(async (req, res) => {
    const party = await partyFor(req.identity.id, req.params.id)
    if (!party) return res.status(404).json({ error: 'party not found' })
    res.json({ party })
  }))

  app.post('/api/parties/:id/visibility', requireAuthenticated, wrap(async (req, res) => {
    res.json(await setVisibility(req.identity.id, req.params.id, req.body?.visibility))
  }))

  app.post('/api/parties/:id/scope', requireAuthenticated, wrap(async (req, res) => {
    res.json(await setScope(req.identity.id, req.params.id, req.body?.scope))
  }))

  app.post('/api/parties/:id/leave', requireAuthenticated, wrap(async (req, res) => {
    res.json(await leaveParty(req.identity.id, req.params.id))
  }))

  /* ── Study room seats and activity ───────────────────────────────────────── */

  /**
   * Where this member sits, and what their desk looks like.
   *
   * `:code` is the room code the browser has in its address bar, but a party id
   * is accepted too — every route above this one is addressed by id, and making
   * the caller translate between the two would be a translation that can be got
   * wrong. `resolvePartyId` takes either.
   *
   * A refused seat is 409, not 400: asking for a desk somebody is sitting at is
   * a race, not a malformed request, and the client's answer is to try another
   * desk rather than to fix its code.
   */
  app.patch('/api/parties/:code/seat', requireAuthenticated, wrap(async (req, res) => {
    const result = await setSeat(req.identity.id, req.params.code, req.body ?? {})
    if (!result.ok) {
      const status = result.reason === 'seat_taken' ? 409
        : result.reason === 'not_found' || result.reason === 'not_a_member' ? 404
          : 400
      return res.status(status).json(result)
    }
    // Everybody watching the hall sees the seat move now rather than in four
    // seconds. A room with no open sockets pays nothing for this.
    notifyRoomPresence(result.partyId)
    return res.json(result)
  }))

  /**
   * Seat a member who has just opened a room without a desk of their own.
   *
   * Idempotent: a member who already has a desk keeps it, and a full room
   * answers `seatIndex: null` rather than inventing a twenty-first desk.
   */
  app.post('/api/parties/:code/seat/claim', requireAuthenticated, wrap(async (req, res) => {
    const partyId = await resolvePartyId(req.params.code)
    if (!partyId) return res.status(404).json({ ok: false, reason: 'not_found' })
    const members = await partyMembers(partyId, req.identity.id)
    if (!members) return res.status(404).json({ ok: false, reason: 'not_a_member' })
    const seatIndex = await ensureSeated(req.identity.id, partyId)
    notifyRoomPresence(partyId)
    return res.json({ ok: true, seatIndex, party: await partyFor(req.identity.id, partyId) })
  }))

  /** "I am still here, and this is what I am doing." Thirty seconds apart, from the room. */
  app.post('/api/parties/:code/heartbeat', requireAuthenticated, wrap(async (req, res) => {
    const result = await recordActivity(req.identity.id, req.params.code, req.body?.activity)
    if (!result.ok) return res.status(404).json(result)
    notifyRoomPresence(result.partyId)
    return res.json(result)
  }))

  /** The room's members, seats and activity — the same list the socket broadcasts. */
  app.get('/api/parties/:code/members', requireAuthenticated, wrap(async (req, res) => {
    const partyId = await resolvePartyId(req.params.code)
    const members = partyId ? await partyMembers(partyId, req.identity.id) : null
    if (!members) return res.status(404).json({ error: 'party not found' })
    return res.json({ members })
  }))

  /* ── Study party games ───────────────────────────────────────────────────── */

  app.post('/api/parties/:id/games', requireAuthenticated, wrap(async (req, res) => {
    res.json(await createPartyGame(req.identity.id, req.params.id, req.body ?? {}))
  }))

  app.get('/api/parties/:id/games', requireAuthenticated, wrap(async (req, res) => {
    res.json({ games: await partyGamesFor(req.identity.id, req.params.id) })
  }))

  app.get('/api/parties/:id/games/:gameId', requireAuthenticated, wrap(async (req, res) => {
    const game = await partyGameFor(req.identity.id, req.params.id, req.params.gameId)
    if (!game) return res.status(404).json({ error: 'game not found' })
    res.json({ game })
  }))

  app.post('/api/parties/:id/games/:gameId/actions', requireAuthenticated, wrap(async (req, res) => {
    res.json(await actOnPartyGame(req.identity.id, req.params.id, req.params.gameId, req.body?.action ?? req.body ?? {}))
  }))

  app.get('/api/parties/:id/games/:gameId/events', requireAuthenticated, wrap(async (req, res) => {
    await streamPartyGameEvents(req.identity.id, req.params.id, req.params.gameId, req, res)
  }))

  /* ── Study party sessions ────────────────────────────────────────────────── */

  app.post('/api/parties/:id/sessions', requireAuthenticated, wrap(async (req, res) => {
    res.json(await createSession(req.identity.id, req.params.id, req.body ?? {}))
  }))

  app.get('/api/parties/:id/sessions', requireAuthenticated, wrap(async (req, res) => {
    res.json({ sessions: await sessionsFor(req.identity.id, req.params.id) })
  }))

  app.get('/api/party-sessions/:sessionId', requireAuthenticated, wrap(async (req, res) => {
    const session = await sessionFor(req.identity.id, req.params.sessionId)
    // A non-member gets the same answer as a non-existent session: whether a
    // session exists is not something a stranger should be able to probe.
    if (!session) return res.status(404).json({ error: 'session not found' })
    res.json({ session })
  }))

  app.post('/api/party-sessions/:sessionId/answers', requireAuthenticated, wrap(async (req, res) => {
    res.json(await answerItem(req.identity.id, req.params.sessionId, req.body ?? {}))
  }))

  app.post('/api/party-sessions/:sessionId/close', requireAuthenticated, wrap(async (req, res) => {
    res.json(await closeSession(req.identity.id, req.params.sessionId))
  }))
}
