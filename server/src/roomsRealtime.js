import { liveTableForSeat, voiceAudience } from './roomVoiceScope.js'
/**
 * The signalling channel for study rooms.
 *
 * A room polled every four seconds cannot carry a conversation: WebRTC needs
 * sub-second, bidirectional exchange of transport parameters, and "who is
 * speaking" arrives and leaves faster than a poll can see. So a room has one
 * WebSocket, and it carries three things — who is in the room, who is talking,
 * and the SFU negotiation in `roomsSfu.js`.
 *
 * The hub below knows nothing about `ws`. It takes clients that can `send` an
 * object and `close`, and a `readRoom` function, which is what lets the
 * whole protocol be tested on Node with stub sockets and no database and no
 * native worker. `attachRoomsRealtime` is the thin edge that binds it to a real
 * HTTP server.
 *
 * Authentication is the HTTP routes' own: the same Supabase token, resolved by
 * the same helper, and then the same membership check `partyFor` makes. A
 * browser cannot set an `Authorization` header on a WebSocket, so the token
 * arrives as a subprotocol rather than in the query string — a URL is logged by
 * every proxy it passes, and an access token in a log is an access token that
 * has leaked.
 */

/** How often a socket is pinged, and every room re-checked. */
export const PING_MS = 25_000

/**
 * The largest frame this endpoint will accept.
 *
 * `rtpParameters` is the biggest thing any legitimate client sends and is a few
 * kilobytes. `ws` would otherwise buffer, stringify and parse up to 100 MiB per
 * frame on the word of any authenticated member.
 */
export const MAX_FRAME_BYTES = 16 * 1024

/** The close code for "you are not a member of this room" — refused at the door. */
export const CLOSE_NOT_A_MEMBER = 4401

/**
 * "You were a member and you are not one any more."
 *
 * Distinct from 4401 because it means something different to the client: 4401
 * is "do not bother retrying, ask the API"; 4403 is "the room moved on without
 * you" — you left, you were removed, or it was archived. Both stop the retry
 * loop; only 4403 is worth re-reading the party over.
 */
export const CLOSE_EVICTED = 4403

/**
 * Something failed on our side.
 *
 * A database that blinked while one student opened a room must cost that
 * student a reconnect, never the process. See the guard in `openRoomSocket`.
 */
export const CLOSE_SERVER_ERROR = 4500

/** The subprotocol that carries the bearer token, and the token itself after it. */
export const BEARER_PROTOCOL = 'nishany.bearer'

/**
 * One inbound frame, or null.
 *
 * Anything that is not a JSON object with a string `type` is not a message —
 * it is noise, or a client from a future version, and either way the room
 * carries on rather than closing the socket over it.
 */
export function parseMessage(raw) {
  let parsed
  try {
    parsed = JSON.parse(typeof raw === 'string' ? raw : String(raw))
  } catch {
    return null
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null
  if (typeof parsed.type !== 'string') return null
  return parsed
}

/**
 * The token a client presented, from the subprotocols it offered.
 *
 * `['nishany.bearer', '<jwt>']` — the browser's only way to authenticate a
 * WebSocket without putting the token where proxies write it down.
 */
export function bearerFromProtocols(header) {
  const offered = String(header ?? '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
  const index = offered.indexOf(BEARER_PROTOCOL)
  if (index === -1) return null
  return offered[index + 1] ?? null
}

/**
 * The room hub: every open socket, grouped by room.
 *
 * `readRoom(roomId)` returns `{ members, archivedAt }` on the *server's own*
 * authority — no caller, and therefore no caller's identity. That is
 * deliberate: reading the roster as one of the connected sockets made the
 * answer depend on which socket happened to be first in a Set, and one belonging
 * to somebody who had since left the party answered "not a member" and silenced
 * presence for the entire room. `sfu` is whatever
 * `loadSfu()` resolved to — including `{ available: false, reason }`, which is
 * a perfectly good SFU as far as this file is concerned: it answers every
 * `sfu:*` message with the reason, and the room says voice is unavailable
 * instead of pretending to negotiate.
 */
export function createRoomHub({ readRoom, sfu, onError = () => {} }) {
  /** roomId → { sockets: Set<client>, snapshot: { members, archivedAt } | null } */
  const rooms = new Map()

  function entryFor(roomId) {
    return rooms.get(roomId) ?? null
  }

  function socketsIn(roomId) {
    return rooms.get(roomId)?.sockets ?? new Set()
  }

  /** Send to one socket, tolerating a socket that has already gone. */
  function post(client, message) {
    try {
      client.send(message)
      return true
    } catch (error) {
      onError(error)
      return false
    }
  }

  function broadcast(roomId, message, { except } = {}) {
    for (const client of [...socketsIn(roomId)]) {
      if (client === except) continue
      post(client, message)
    }
  }

  /**
   * Close one socket and forget it, without pretending it left politely.
   *
   * Used for eviction (the member is gone, or the room is archived) and for a
   * failure on our side. `remove` does the SFU teardown and the presence
   * broadcast, so this is only the close on top of it.
   */
  function evict(client, code, reason) {
    try { client.close(code, reason) } catch (error) { onError(error) }
    remove(client)
  }

  /**
   * Read the room on the server's own authority and evict anyone who no longer
   * belongs in it.
   *
   * Three things had to change here at once. The roster is read *without* a
   * caller, so one departed member's socket can no longer decide what the whole
   * room is allowed to see. A read that fails is logged and dropped rather than
   * closing anybody — a blinked database is not evidence that twenty people
   * left. And an archived room is closed for everyone, because a socket is the
   * only thing that would otherwise keep a dead room fully interactive.
   *
   * Returns the snapshot, or null when it could not be read.
   */
  async function refresh(roomId) {
    const entry = entryFor(roomId)
    if (!entry) return null

    let snapshot
    try {
      snapshot = await readRoom(roomId)
    } catch (error) {
      onError(error)
      return null
    }

    // A party that has vanished, or one that was archived, is not a room
    // anybody may still be sitting in.
    if (!snapshot || snapshot.archivedAt) {
      for (const client of [...entry.sockets]) {
        post(client, { type: 'archived', roomId })
        evict(client, CLOSE_EVICTED, snapshot ? 'archived' : 'not_found')
      }
      return snapshot ?? null
    }

    entry.snapshot = snapshot
    const present = new Set(snapshot.members.map((member) => member.userId))
    for (const client of [...entry.sockets]) {
      if (present.has(client.userId)) continue
      evict(client, CLOSE_EVICTED, 'not_a_member')
    }
    return snapshot
  }

  /**
   * Tell the room who is in it, after checking that they all still are.
   *
   * One read per room rather than one per socket: the list is the same for
   * everybody, and a twenty-person room must not be twenty queries for one
   * seat change.
   */
  async function announcePresence(roomId) {
    if (!socketsIn(roomId).size) return
    const snapshot = await refresh(roomId)
    if (!snapshot || snapshot.archivedAt) return
    broadcast(roomId, { type: 'presence', members: snapshot.members })
  }

  /** Every room this hub is watching, re-checked. Driven by the ping tick. */
  async function sweep() {
    for (const roomId of [...rooms.keys()]) {
      const before = entryFor(roomId)?.snapshot
      const snapshot = await refresh(roomId)
      // Only broadcast when something a client can see actually moved. The
      // sweep runs every 25 seconds in every room; a roster that did not change
      // is not news, and sending it anyway would be the whole room's bandwidth
      // spent on saying nothing.
      if (!snapshot || snapshot.archivedAt) continue
      if (!socketsIn(roomId).size) continue
      if (before && sameRoster(before.members, snapshot.members)) continue
      broadcast(roomId, { type: 'presence', members: snapshot.members })
    }
  }

  async function add(client) {
    if (!rooms.has(client.roomId)) rooms.set(client.roomId, { sockets: new Set(), snapshot: null })
    const entry = rooms.get(client.roomId)

    let snapshot
    try {
      snapshot = await readRoom(client.roomId)
    } catch (error) {
      // The database blinked while somebody opened a room. That costs them a
      // reconnect; it must never reach the process, which serves everything.
      onError(error)
      if (!entry.sockets.size) rooms.delete(client.roomId)
      try { client.close(CLOSE_SERVER_ERROR, 'read_failed') } catch (closeError) { onError(closeError) }
      return false
    }

    const member = snapshot?.members.some((row) => row.userId === client.userId)
    if (!snapshot || snapshot.archivedAt || !member) {
      if (!entry.sockets.size) rooms.delete(client.roomId)
      try { client.close(CLOSE_NOT_A_MEMBER, 'not_a_member') } catch (error) { onError(error) }
      return false
    }

    entry.snapshot = snapshot
    entry.sockets.add(client)

    post(client, {
      type: 'hello',
      userId: client.userId,
      roomId: client.roomId,
      sfu: sfu?.available
        ? { available: true, iceServers: sfu.iceServers() }
        : { available: false, reason: sfu?.reason ?? 'Voice is unavailable right now.' },
    })
    post(client, { type: 'presence', members: snapshot.members })
    // Everyone else learns somebody arrived. The joiner already has the list.
    broadcast(client.roomId, { type: 'presence', members: snapshot.members }, { except: client })
    return true
  }

  function remove(client) {
    const entry = rooms.get(client.roomId)
    if (!entry?.sockets.delete(client)) return
    const stillHere = [...entry.sockets].some((other) => other.userId === client.userId)
    if (!entry.sockets.size) rooms.delete(client.roomId)

    // Only when this was their last socket in the room. A student with the room
    // open in two tabs closes one all the time, and tearing down the SFU peer
    // on that would cut the audio in the tab they are still using.
    if (sfu?.available && !stillHere) {
      const closed = sfu.closePeer(client.roomId, client.userId)
      for (const producerId of closed) {
        broadcast(client.roomId, { type: 'sfu:producerClosed', producerId, userId: client.userId })
      }
    }
    // A member whose socket dropped is still in the party — they have closed
    // the tab, not left the room — so the broadcast is "the room changed", and
    // the seat stays theirs until they leave the party properly.
    if (!stillHere) {
      broadcast(client.roomId, { type: 'speaking', userId: client.userId, speaking: false })
    }
    void announcePresence(client.roomId).catch(onError)
  }

  function refuseSfu(client, requestId) {
    post(client, {
      type: 'sfu:unavailable',
      requestId,
      reason: sfu?.reason ?? 'Voice is unavailable right now.',
    })
  }

  /**
   * Is this socket still allowed to be here?
   *
   * Checked against the room's cached snapshot on **every** inbound frame, so
   * authorization is not a thing that happened once at the door. The cache is
   * refreshed by the leave route, by every seat and heartbeat write, by every
   * join and drop, and by the sweep — so the window in which it can be wrong is
   * bounded by the ping interval rather than by the life of the socket.
   *
   * Deliberately synchronous and deliberately not a query: `speaking` frames
   * arrive several times a sentence, and a database round trip on each one
   * would be a denial of service we wrote ourselves.
   */
  function stillAllowed(client) {
    const entry = rooms.get(client.roomId)
    if (!entry?.sockets.has(client)) return false
    const snapshot = entry.snapshot
    if (!snapshot) return true
    if (snapshot.archivedAt) return false
    return snapshot.members.some((member) => member.userId === client.userId)
  }

  async function receive(client, raw) {
    if (!stillAllowed(client)) {
      evict(client, CLOSE_EVICTED, 'not_a_member')
      return
    }
    const message = parseMessage(raw)
    if (!message) return
    const { requestId } = message
    const reply = (body) => post(client, { ...body, requestId })
    let voiceSnapshot=null
    const seatIndex=()=>voiceSnapshot?.members.find(member=>member.userId===client.userId)?.seat?.seatIndex
    const listenerTable=()=>liveTableForSeat(seatIndex(),voiceSnapshot?.layoutKey)

    try {
      if(['sfu:produce','sfu:consume','sfu:resume','sfu:producers'].includes(message.type)){voiceSnapshot=await refresh(client.roomId);if(!voiceSnapshot)throw new Error('voice_membership_unavailable');if(!stillAllowed(client))return}
      switch (message.type) {
        case 'ping':
          reply({ type: 'pong' })
          return

        case 'presence:refresh': {
          const snapshot = await refresh(client.roomId)
          if (snapshot && !snapshot.archivedAt) post(client, { type: 'presence', members: snapshot.members })
          return
        }

        case 'speaking': {
          // Broadcast to the room including the sender: the sender's own ring
          // is driven by its own analyser, but a client that reconnects mid-word
          // should be told the same thing everyone else was told.
          broadcast(client.roomId, {
            type: 'speaking',
            userId: client.userId,
            speaking: Boolean(message.speaking),
          })
          return
        }

        case 'sfu:rtpCapabilities': {
          if (!sfu?.available) return refuseSfu(client, requestId)
          reply({
            type: 'sfu:rtpCapabilities',
            rtpCapabilities: await sfu.rtpCapabilities(client.roomId),
            iceServers: sfu.iceServers(),
          })
          return
        }

        case 'sfu:createTransport': {
          if (!sfu?.available) return refuseSfu(client, requestId)
          const direction = message.direction === 'recv' ? 'recv' : 'send'
          const transport = await sfu.createTransport(client.roomId, client.userId, direction)
          reply({ type: 'sfu:createTransport', direction, ...transport })
          return
        }

        case 'sfu:connectTransport': {
          if (!sfu?.available) return refuseSfu(client, requestId)
          await sfu.connectTransport(
            client.roomId, client.userId, message.transportId, message.dtlsParameters,
          )
          reply({ type: 'sfu:connectTransport', ok: true })
          return
        }

        case 'sfu:produce': {
          if (!sfu?.available) return refuseSfu(client, requestId)
          const { producerId } = await sfu.produce(
            client.roomId, client.userId, message.transportId, message.kind ?? 'audio', message.rtpParameters, voiceAudience(message.audience,seatIndex(),voiceSnapshot?.layoutKey),
          )
          reply({ type: 'sfu:produce', producerId })
          broadcast(
            client.roomId,
            { type: 'sfu:newProducer', producerId, userId: client.userId },
            { except: client },
          )
          return
        }

        case 'sfu:producers': {
          if (!sfu?.available) return refuseSfu(client, requestId)
          reply({ type: 'sfu:producers', producers: sfu.producersFor(client.roomId, client.userId,listenerTable()) })
          return
        }

        case 'sfu:consume': {
          if (!sfu?.available) return refuseSfu(client, requestId)
          const consumer = await sfu.consume(
            client.roomId, client.userId, message.transportId, message.producerId, message.rtpCapabilities,listenerTable(),
          )
          reply({ type: 'sfu:consume', ...consumer })
          return
        }

        case 'sfu:resume': {
          if (!sfu?.available) return refuseSfu(client, requestId)
          await sfu.resume(client.roomId, client.userId, message.consumerId,listenerTable())
          reply({ type: 'sfu:resume', ok: true })
          return
        }

        case 'sfu:pause': {
          if (!sfu?.available) return refuseSfu(client, requestId)
          await sfu.pauseProducer(client.roomId, client.userId, message.producerId, Boolean(message.paused))
          reply({ type: 'sfu:pause', ok: true })
          return
        }

        case 'sfu:close': {
          if (!sfu?.available) return refuseSfu(client, requestId)
          const closed = sfu.closePeer(client.roomId, client.userId)
          for (const producerId of closed) {
            broadcast(client.roomId, { type: 'sfu:producerClosed', producerId, userId: client.userId })
          }
          reply({ type: 'sfu:close', ok: true })
          return
        }

        default:
          // An unknown type is a client from another version, not an attack.
          return
      }
    } catch (error) {
      onError(error)
      post(client, { type: 'error', requestId, error: String(error?.message ?? 'failed') })
    }
  }

  return {
    add,
    remove,
    receive,
    broadcast,
    announcePresence,
    closeVoice(roomId,userId){
      if(!sfu?.available)return
      for(const client of socketsIn(roomId))if(client.userId===userId)post(client,{type:'sfu:voiceReset'})
      for(const producerId of sfu.closePeer(roomId,userId))broadcast(roomId,{type:'sfu:producerClosed',producerId,userId})
    },
    refresh,
    sweep,
    /** How many sockets are open on a room. Used by the tests. */
    size: (roomId) => socketsIn(roomId).size,
    rooms: () => [...rooms.keys()],
  }
}

/**
 * Whether two rosters say the same thing to a client.
 *
 * Compares only what the hall draws — who is here, where they sit, what their
 * desk looks like and whether they are working. `lastActiveAt` is deliberately
 * excluded: it moves on every heartbeat, and a room whose members are all
 * simply still there is not news worth twenty frames.
 */
function sameRoster(before, after) {
  if (before.length !== after.length) return false
  const key = (member) => [
    member.userId,
    member.activity,
    member.seat?.seatIndex ?? '-',
    member.seat?.desk ?? '-',
    member.seat?.device ?? '-',
    member.seat?.chair ?? '-',
  ].join('|')
  const seen = new Set(before.map(key))
  return after.every((member) => seen.has(key(member)))
}

/* ── The `ws` edge ───────────────────────────────────────────────────────── */

let hub = null

/**
 * Tell every open socket in a room that its members changed.
 *
 * Called by the seat and heartbeat routes, so a student who sits down or starts
 * working appears in everybody else's hall within a frame rather than within
 * four seconds. A no-op before `attachRoomsRealtime` has run, which is exactly
 * what a test importing `parties.js` needs it to be.
 */
export function closeRoomVoice(roomId,userId){hub?.closeVoice(roomId,userId)}

export function notifyRoomPresence(roomId) {
  if (!hub || !roomId) return
  void hub.announcePresence(roomId)
}

/**
 * Bind the hub to the running HTTP server at `/api/rooms/ws?code=<code>`.
 *
 * `noServer: true` and an explicit `upgrade` listener rather than `{ server }`:
 * the party-games SSE stream and every other route share this server, and a
 * WebSocket server that claims every upgrade would answer for paths it knows
 * nothing about.
 *
 * Authentication happens before the handshake completes, but a refusal is
 * delivered *after* it as close code 4401. A failed handshake is an opaque
 * "connection error" in every browser; a close code is something the client can
 * read and say out loud.
 */
export async function attachRoomsRealtime(httpServer, { identityFromToken, identityFromCookies, resolveRoom, readRoom, loadSfu }) {
  let WebSocketServer
  try {
    ({ WebSocketServer } = await import('ws'))
  } catch (error) {
    console.error('Study room signalling is unavailable (ws not installed):', error?.message)
    return null
  }

  const sfu = await loadSfu()
  if (!sfu.available) console.warn('Study room voice:', sfu.reason)

  hub = createRoomHub({
    readRoom,
    sfu,
    onError: (error) => console.error('room socket:', error?.message ?? error),
  })

  const wss = new WebSocketServer({
    noServer: true,
    // The largest legitimate frame is an `rtpParameters` blob, far under 16 KB.
    // `ws` defaults this to 100 MiB, and every frame is buffered, stringified
    // and parsed — so one authenticated member looping 100 MiB frames could OOM
    // the container that serves the entire product.
    maxPayload: MAX_FRAME_BYTES,
    // Only echo the subprotocol back to a client that actually offered it.
    // Answering an offer nobody made is rejected by both browsers and the `ws`
    // client ("Server sent a subprotocol but none was requested"), which made
    // the documented `Authorization: Bearer` path impossible to connect on.
    handleProtocols: (protocols) => (protocols.has(BEARER_PROTOCOL) ? BEARER_PROTOCOL : false),
  })

  httpServer.on('upgrade', async (request, socket, head) => {
    let url
    try {
      url = new URL(request.url, 'http://localhost')
    } catch {
      return socket.destroy()
    }
    /*
     * This is the only WebSocket endpoint the server has.
     *
     * Node destroys an upgrade request itself only while *no* `upgrade`
     * listener is registered; the moment this one exists, every upgrade on
     * every path becomes ours to answer, and one we quietly ignore is a socket
     * that hangs open until the client gives up — and a `server.close()` that
     * never resolves. So anything that is not a room is refused here, in words.
     * A second WebSocket endpoint would have to be matched above this line.
     */
    if (url.pathname !== '/api/rooms/ws') {
      socket.write('HTTP/1.1 404 Not Found\r\nConnection: close\r\n\r\n')
      return socket.destroy()
    }

    const code = url.searchParams.get('code')
    const token = bearerFromProtocols(request.headers['sec-websocket-protocol'])
      ?? (String(request.headers.authorization ?? '').startsWith('Bearer ')
        ? String(request.headers.authorization).slice(7)
        : null)

    let identity = null
    try {
      // A browser cannot set an Authorization header on a WebSocket, and the
      // web client no longer holds a token to smuggle through a subprotocol —
      // its session is the `nsid` cookie, which the upgrade request carries like
      // any other same-origin request. Native clients still offer the token.
      identity = token
        ? await identityFromToken(token)
        : (identityFromCookies ? await identityFromCookies(request.headers.cookie) : null)
    } catch {
      identity = null
    }

    wss.handleUpgrade(request, socket, head, (ws) => {
      if (!identity || !code) {
        ws.close(CLOSE_NOT_A_MEMBER, 'unauthorized')
        return
      }
      void openRoomSocket(ws, { code, userId: identity.id })
    })
  })

  /**
   * One socket, from the handshake to the room.
   *
   * The entire body is guarded. This function is launched with `void` from the
   * upgrade callback, so an unhandled rejection anywhere inside it reaches
   * Node's default `--unhandled-rejections=throw` and exits the process that
   * serves the whole product. A pool exhausted for one second while one student
   * opens one study room is not a reason to log every user out; it is a reason
   * to close that one socket with 4500 and write a line in the log.
   */
  async function openRoomSocket(ws, { code, userId }) {
    try {
      // The socket is addressed by the code in the student's address bar; the
      // hub is keyed by the party id. Resolving here rather than per message is
      // what makes one room one set of sockets — two clients that named the
      // same room two ways would otherwise never hear each other.
      let roomId = null
      try {
        roomId = await resolveRoom(code)
      } catch (error) {
        console.error('room socket: resolving the room failed:', error?.message ?? error)
        ws.close(CLOSE_SERVER_ERROR, 'resolve_failed')
        return
      }
      if (!roomId) {
        ws.close(CLOSE_NOT_A_MEMBER, 'not_a_member')
        return
      }

      const client = {
        roomId,
        userId,
        send(message) {
          if (ws.readyState === ws.OPEN) ws.send(JSON.stringify(message))
        },
        close(closeCode, reason) {
          try { ws.close(closeCode, reason) } catch { /* already gone */ }
        },
      }

      ws.isAlive = true
      ws.on('pong', () => { ws.isAlive = true })
      // `receive` catches its own failures, but a rejection escaping it would
      // be fatal to the process, so it is caught here too. Cheap insurance on
      // the one path an attacker controls the input to.
      ws.on('message', (data) => {
        void hub.receive(client, data.toString())
          .catch((error) => console.error('room socket: message failed:', error?.message ?? error))
      })
      ws.on('close', () => {
        try { hub.remove(client) } catch (error) { console.error('room socket: close failed:', error?.message ?? error) }
      })
      ws.on('error', () => {
        try { hub.remove(client) } catch (error) { console.error('room socket: error teardown failed:', error?.message ?? error) }
      })

      await hub.add(client)
    } catch (error) {
      console.error('room socket: opening failed:', error?.message ?? error)
      try { ws.close(CLOSE_SERVER_ERROR, 'failed') } catch { /* already gone */ }
    }
  }

  // Two jobs on one tick. A socket whose peer vanished — a phone that went into
  // a tunnel — otherwise stays "in the room" forever and the hall shows
  // somebody who left. And every room is re-read, so a member who was removed
  // from the party, or a room that was archived, is closed within one interval
  // even if nothing wrote to the room to trigger it.
  const ping = setInterval(() => {
    for (const ws of wss.clients) {
      if (ws.isAlive === false) {
        ws.terminate()
        continue
      }
      ws.isAlive = false
      try { ws.ping() } catch { ws.terminate() }
    }
    void hub.sweep().catch((error) => console.error('room sweep failed:', error?.message ?? error))
  }, PING_MS)
  ping.unref?.()

  wss.on('close', () => clearInterval(ping))
  return { wss, hub, sfu }
}

/** Only for tests: forget the process-wide hub. */
export function resetRoomsRealtime() {
  hub = null
}
