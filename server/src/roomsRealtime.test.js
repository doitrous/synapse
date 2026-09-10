import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  BEARER_PROTOCOL,
  CLOSE_EVICTED,
  CLOSE_NOT_A_MEMBER,
  CLOSE_SERVER_ERROR,
  MAX_FRAME_BYTES,
  bearerFromProtocols,
  createRoomHub,
  parseMessage,
} from './roomsRealtime.js'

/* ── Framing ─────────────────────────────────────────────────────────────── */

test('a well-formed frame is read', () => {
  assert.deepEqual(parseMessage('{"type":"speaking","speaking":true}'), { type: 'speaking', speaking: true })
})

test('noise is not a message', () => {
  assert.equal(parseMessage('not json'), null)
  assert.equal(parseMessage('[]'), null)
  assert.equal(parseMessage('"hello"'), null)
  assert.equal(parseMessage('{"speaking":true}'), null)
  assert.equal(parseMessage('null'), null)
})

test('the bearer token rides in the subprotocol, never the URL', () => {
  assert.equal(bearerFromProtocols(`${BEARER_PROTOCOL}, tok123`), 'tok123')
  assert.equal(bearerFromProtocols('tok123'), null)
  assert.equal(bearerFromProtocols(BEARER_PROTOCOL), null)
  assert.equal(bearerFromProtocols(undefined), null)
})

/* ── Stubs ───────────────────────────────────────────────────────────────── */

function stubClient(roomId, userId) {
  const sent = []
  const closed = []
  return {
    roomId,
    userId,
    sent,
    closed,
    send(message) { sent.push(message) },
    close(code, reason) { closed.push({ code, reason }) },
    typesSent() { return sent.map((m) => m.type) },
    lastOf(type) { return [...sent].reverse().find((m) => m.type === type) ?? null },
  }
}

const membersOf = (...ids) => ids.map((id) => ({
  userId: id, displayName: id, role: 'member', seat: null, lastActiveAt: null, activity: 'idle',
}))

const roomOf = (...ids) => ({ id: 'party-1', code: 'KTP0R2', name: 'Room', archivedAt: null, members: membersOf(...ids) })

/**
 * A hub over a mutable roster.
 *
 * `state.roster` can be changed mid-test, which is how a member leaving or a
 * room being archived is simulated — the two cases where authorization has to
 * be re-decided *after* admission.
 */
function hubWith({ roster = ['a', 'b'], sfu = null, onError, areBlocked } = {}) {
  const state = { roster: [...roster], archivedAt: null, missing: false, fail: false, reads: 0 }
  const hub = createRoomHub({
    readRoom: async () => {
      state.reads += 1
      if (state.fail) throw new Error('pool exhausted')
      if (state.missing) return null
      return { ...roomOf(...state.roster), archivedAt: state.archivedAt }
    },
    sfu,
    onError: onError ?? (() => {}),
    ...(areBlocked ? { areBlocked } : {}),
  })
  hub.state = state
  return hub
}

/* ── Membership ──────────────────────────────────────────────────────────── */

test('a member is admitted and told who is in the room', async () => {
  const hub = hubWith()
  const client = stubClient('R1', 'a')
  assert.equal(await hub.add(client), true)
  assert.deepEqual(client.typesSent(), ['hello', 'presence'])
  assert.deepEqual(client.lastOf('presence').members.map((m) => m.userId), ['a', 'b'])
})

test('a stranger is closed with 4401 and never joins the room', async () => {
  const hub = hubWith()
  const stranger = stubClient('R1', 'z')
  assert.equal(await hub.add(stranger), false)
  assert.deepEqual(stranger.closed, [{ code: CLOSE_NOT_A_MEMBER, reason: 'not_a_member' }])
  assert.equal(hub.size('R1'), 0)
})

test('everyone already in the room hears that somebody arrived', async () => {
  const hub = hubWith()
  const first = stubClient('R1', 'a')
  await hub.add(first)
  const second = stubClient('R1', 'b')
  await hub.add(second)
  // hello, presence (own), presence (b arriving)
  assert.equal(first.sent.filter((m) => m.type === 'presence').length, 2)
})

test('rooms do not leak into each other', async () => {
  const hub = createRoomHub({ readRoom: async () => roomOf('a'), sfu: null })
  const here = stubClient('R1', 'a')
  const elsewhere = stubClient('R2', 'a')
  await hub.add(here)
  await hub.add(elsewhere)
  hub.broadcast('R1', { type: 'speaking', userId: 'a', speaking: true })
  assert.equal(here.lastOf('speaking').speaking, true)
  assert.equal(elsewhere.lastOf('speaking'), null)
})

test('a socket that drops leaves the room and stops claiming to speak', async () => {
  const hub = hubWith()
  const a = stubClient('R1', 'a')
  const b = stubClient('R1', 'b')
  await hub.add(a)
  await hub.add(b)
  hub.remove(a)
  assert.equal(hub.size('R1'), 1)
  assert.deepEqual(b.lastOf('speaking'), { type: 'speaking', userId: 'a', speaking: false })
})

test('the last socket out drops the room rather than leaving an empty set', async () => {
  const hub = hubWith()
  const a = stubClient('R1', 'a')
  await hub.add(a)
  hub.remove(a)
  assert.deepEqual(hub.rooms(), [])
})

/* ── Speaking ────────────────────────────────────────────────────────────── */

test('speaking is relayed to the whole room, sender included', async () => {
  const hub = hubWith()
  const a = stubClient('R1', 'a')
  const b = stubClient('R1', 'b')
  await hub.add(a)
  await hub.add(b)
  await hub.receive(a, JSON.stringify({ type: 'speaking', speaking: true }))
  assert.deepEqual(a.lastOf('speaking'), { type: 'speaking', userId: 'a', speaking: true })
  assert.deepEqual(b.lastOf('speaking'), { type: 'speaking', userId: 'a', speaking: true })
})

test('a client cannot claim somebody else is speaking', async () => {
  const hub = hubWith()
  const a = stubClient('R1', 'a')
  const b = stubClient('R1', 'b')
  await hub.add(a)
  await hub.add(b)
  await hub.receive(a, JSON.stringify({ type: 'speaking', speaking: true, userId: 'b' }))
  assert.equal(b.lastOf('speaking').userId, 'a')
})

test('an unknown message type is ignored rather than answered or fatal', async () => {
  const hub = hubWith()
  const a = stubClient('R1', 'a')
  await hub.add(a)
  const before = a.sent.length
  await hub.receive(a, JSON.stringify({ type: 'sfu:teleport' }))
  await hub.receive(a, 'garbage')
  assert.equal(a.sent.length, before)
})

/* ── Chat ────────────────────────────────────────────────────────────────── */

test('a public chat reaches the whole room, sender included', async () => {
  const hub = hubWith()
  const a = stubClient('R1', 'a')
  const b = stubClient('R1', 'b')
  await hub.add(a)
  await hub.add(b)
  await hub.receive(a, JSON.stringify({ type: 'chat', text: 'hi everyone' }))
  assert.equal(a.lastOf('chat').text, 'hi everyone')
  assert.equal(a.lastOf('chat').from, 'a')
  assert.equal(b.lastOf('chat').text, 'hi everyone')
  assert.equal(a.lastOf('chat').private, undefined)
})

test('a private chat reaches only the addressed member and the sender', async () => {
  const hub = hubWith({ roster: ['a', 'b', 'c'] })
  const a = stubClient('R1', 'a')
  const b = stubClient('R1', 'b')
  const c = stubClient('R1', 'c')
  await hub.add(a)
  await hub.add(b)
  await hub.add(c)
  await hub.receive(a, JSON.stringify({ type: 'chat', text: 'just us', to: 'b' }))
  assert.deepEqual(b.lastOf('chat'), { ...a.lastOf('chat') })
  assert.equal(a.lastOf('chat').private, true)
  assert.equal(a.lastOf('chat').to, 'b')
  assert.equal(c.lastOf('chat'), null)
})

test('a private chat to somebody with no socket in the room still echoes to the sender', async () => {
  const hub = hubWith({ roster: ['a', 'b'] })
  const a = stubClient('R1', 'a')
  await hub.add(a)
  await hub.receive(a, JSON.stringify({ type: 'chat', text: 'are you there', to: 'b' }))
  assert.equal(a.lastOf('chat').text, 'are you there')
  assert.equal(a.lastOf('chat').private, true)
})

test('a client cannot forge who a chat is from', async () => {
  const hub = hubWith()
  const a = stubClient('R1', 'a')
  const b = stubClient('R1', 'b')
  await hub.add(a)
  await hub.add(b)
  await hub.receive(a, JSON.stringify({ type: 'chat', text: 'hi', from: 'b' }))
  assert.equal(b.lastOf('chat').from, 'a')
})

test('a blank or oversized chat is dropped rather than relayed', async () => {
  const hub = hubWith()
  const a = stubClient('R1', 'a')
  const b = stubClient('R1', 'b')
  await hub.add(a)
  await hub.add(b)
  await hub.receive(a, JSON.stringify({ type: 'chat', text: '   ' }))
  await hub.receive(a, JSON.stringify({ type: 'chat', text: 'x'.repeat(2001) }))
  assert.equal(b.lastOf('chat'), null)
  assert.equal(a.lastOf('chat'), null)
})

test('a private chat between a blocked pair is dropped for both of them', async () => {
  const hub = hubWith({ areBlocked: async (x, y) => [x, y].includes('a') && [x, y].includes('b') })
  const a = stubClient('R1', 'a')
  const b = stubClient('R1', 'b')
  await hub.add(a)
  await hub.add(b)
  await hub.receive(a, JSON.stringify({ type: 'chat', text: 'let me in', to: 'b' }))
  assert.equal(b.lastOf('chat'), null)
  assert.equal(a.lastOf('chat'), null)
})

test('a block never stops the same pair from seeing public chat', async () => {
  const hub = hubWith({ areBlocked: async () => true })
  const a = stubClient('R1', 'a')
  const b = stubClient('R1', 'b')
  await hub.add(a)
  await hub.add(b)
  await hub.receive(a, JSON.stringify({ type: 'chat', text: 'hello room' }))
  assert.equal(b.lastOf('chat').text, 'hello room')
})

/* ── Presence pushed from the HTTP routes ────────────────────────────────── */

test('a seat change announced from a route reaches every open socket', async () => {
  const hub = hubWith()
  const a = stubClient('R1', 'a')
  const b = stubClient('R1', 'b')
  await hub.add(a)
  await hub.add(b)
  const before = b.sent.filter((m) => m.type === 'presence').length
  await hub.announcePresence('R1')
  assert.equal(b.sent.filter((m) => m.type === 'presence').length, before + 1)
})

test('announcing presence on a room nobody is watching costs nothing', async () => {
  let reads = 0
  const hub = createRoomHub({
    readRoom: async () => { reads += 1; return roomOf('a') },
    sfu: null,
  })
  await hub.announcePresence('R-empty')
  assert.equal(reads, 0)
})

/* ── SFU relay ───────────────────────────────────────────────────────────── */

function stubSfu() {
  const producers = new Map()
  return {
    available: true,
    iceServers: () => [{ urls: ['stun:example:3478'] }],
    rtpCapabilities: async () => ({ codecs: ['opus'] }),
    createTransport: async (_room, user, direction) => ({
      id: `${user}-${direction}`, iceParameters: {}, iceCandidates: [], dtlsParameters: {},
    }),
    connectTransport: async () => ({ ok: true }),
    produce: async (_room, user) => {
      const producerId = `p-${user}`
      producers.set(producerId, user)
      return { producerId }
    },
    producersFor: (_room, user) => [...producers]
      .filter(([, owner]) => owner !== user)
      .map(([producerId, owner]) => ({ producerId, userId: owner })),
    consume: async (_room, _user, _transport, producerId) => ({ id: `c-${producerId}`, producerId, kind: 'audio', rtpParameters: {} }),
    resume: async () => ({ ok: true }),
    pauseProducer: async () => ({ ok: true }),
    closePeer: (_room, user) => {
      const mine = [...producers].filter(([, owner]) => owner === user).map(([id]) => id)
      for (const id of mine) producers.delete(id)
      return mine
    },
  }
}

test('with no SFU, the hello says so and every sfu message is refused with the reason', async () => {
  const hub = createRoomHub({
    readRoom: async () => roomOf('a'),
    sfu: { available: false, reason: 'The voice server is not installed on this host.' },
  })
  const a = stubClient('R1', 'a')
  await hub.add(a)
  assert.equal(a.lastOf('hello').sfu.available, false)
  await hub.receive(a, JSON.stringify({ type: 'sfu:rtpCapabilities', requestId: 7 }))
  assert.deepEqual(a.lastOf('sfu:unavailable'), {
    type: 'sfu:unavailable', requestId: 7, reason: 'The voice server is not installed on this host.',
  })
})

test('a request is answered with its own requestId so two in flight cannot be confused', async () => {
  const hub = hubWith({ sfu: stubSfu() })
  const a = stubClient('R1', 'a')
  await hub.add(a)
  await hub.receive(a, JSON.stringify({ type: 'sfu:createTransport', requestId: 'one', direction: 'send' }))
  await hub.receive(a, JSON.stringify({ type: 'sfu:createTransport', requestId: 'two', direction: 'recv' }))
  const replies = a.sent.filter((m) => m.type === 'sfu:createTransport')
  assert.deepEqual(replies.map((m) => [m.requestId, m.direction]), [['one', 'send'], ['two', 'recv']])
})

test('producing tells the rest of the room and not the producer', async () => {
  const hub = hubWith({ sfu: stubSfu() })
  const a = stubClient('R1', 'a')
  const b = stubClient('R1', 'b')
  await hub.add(a)
  await hub.add(b)
  await hub.receive(a, JSON.stringify({ type: 'sfu:produce', requestId: 1, transportId: 't', rtpParameters: {} }))
  assert.equal(a.lastOf('sfu:produce').producerId, 'p-a')
  assert.deepEqual(b.lastOf('sfu:newProducer'), { type: 'sfu:newProducer', producerId: 'p-a', userId: 'a' })
  assert.equal(a.lastOf('sfu:newProducer'), null)
})

test('a member who arrives late can ask for the producers already in the room', async () => {
  const hub = hubWith({ sfu: stubSfu() })
  const a = stubClient('R1', 'a')
  const b = stubClient('R1', 'b')
  await hub.add(a)
  await hub.receive(a, JSON.stringify({ type: 'sfu:produce', requestId: 1, transportId: 't', rtpParameters: {} }))
  await hub.add(b)
  await hub.receive(b, JSON.stringify({ type: 'sfu:producers', requestId: 2 }))
  assert.deepEqual(b.lastOf('sfu:producers').producers, [{ producerId: 'p-a', userId: 'a' }])
})

test('leaving closes the producers and tells the room they are gone', async () => {
  const hub = hubWith({ sfu: stubSfu() })
  const a = stubClient('R1', 'a')
  const b = stubClient('R1', 'b')
  await hub.add(a)
  await hub.add(b)
  await hub.receive(a, JSON.stringify({ type: 'sfu:produce', requestId: 1, transportId: 't', rtpParameters: {} }))
  hub.remove(a)
  assert.deepEqual(b.lastOf('sfu:producerClosed'), { type: 'sfu:producerClosed', producerId: 'p-a', userId: 'a' })
})

test('an SFU that throws is reported to the caller, not to the room', async () => {
  const sfu = { ...stubSfu(), consume: async () => { throw new Error('cannot_consume') } }
  const hub = hubWith({ sfu })
  const a = stubClient('R1', 'a')
  const b = stubClient('R1', 'b')
  await hub.add(a)
  await hub.add(b)
  await hub.receive(a, JSON.stringify({ type: 'sfu:consume', requestId: 9, transportId: 't', producerId: 'p-b' }))
  assert.deepEqual(a.lastOf('error'), { type: 'error', requestId: 9, error: 'cannot_consume' })
  assert.equal(b.lastOf('error'), null)
})

test('one socket that throws on send does not stop the broadcast reaching the others', async () => {
  const hub = hubWith()
  const broken = stubClient('R1', 'a')
  broken.send = () => { throw new Error('socket gone') }
  const fine = stubClient('R1', 'b')
  const errors = []
  const guarded = createRoomHub({
    readRoom: async () => roomOf('a', 'b'),
    sfu: null,
    onError: (error) => errors.push(error.message),
  })
  await guarded.add(broken).catch(() => {})
  await guarded.add(fine)
  guarded.broadcast('R1', { type: 'speaking', userId: 'b', speaking: true })
  assert.equal(fine.lastOf('speaking').speaking, true)
  assert.ok(errors.length > 0)
})

/* ── C1: a failed read never reaches the process ─────────────────────────── */

test('a database failure at connect closes that one socket with 4500 and nothing else', async () => {
  const errors = []
  const hub = hubWith({ onError: (error) => errors.push(error.message) })
  hub.state.fail = true
  const client = stubClient('R1', 'a')
  assert.equal(await hub.add(client), false)
  assert.deepEqual(client.closed, [{ code: CLOSE_SERVER_ERROR, reason: 'read_failed' }])
  assert.deepEqual(errors, ['pool exhausted'])
  assert.equal(hub.size('R1'), 0)
  assert.deepEqual(hub.rooms(), [])
})

test('a database failure during a presence read leaves the room standing', async () => {
  const errors = []
  const hub = hubWith({ onError: (error) => errors.push(error.message) })
  const a = stubClient('R1', 'a')
  const b = stubClient('R1', 'b')
  await hub.add(a)
  await hub.add(b)
  hub.state.fail = true
  await hub.announcePresence('R1')
  // Nobody was evicted on the strength of a query that did not answer.
  assert.equal(hub.size('R1'), 2)
  assert.deepEqual(a.closed, [])
  assert.ok(errors.includes('pool exhausted'))
})

/* ── C2: authorization is re-decided, not remembered ─────────────────────── */

test('a member who left the party is evicted with 4403 on the next announcement', async () => {
  const hub = hubWith()
  const a = stubClient('R1', 'a')
  const b = stubClient('R1', 'b')
  await hub.add(a)
  await hub.add(b)

  hub.state.roster = ['b']
  await hub.announcePresence('R1')

  assert.deepEqual(a.closed, [{ code: CLOSE_EVICTED, reason: 'not_a_member' }])
  assert.equal(hub.size('R1'), 1)
  // And the room that is left is told who is actually in it.
  assert.deepEqual(b.lastOf('presence').members.map((m) => m.userId), ['b'])
})

test('a member who left cannot keep sending frames on the socket they still hold', async () => {
  const hub = hubWith()
  const a = stubClient('R1', 'a')
  const b = stubClient('R1', 'b')
  await hub.add(a)
  await hub.add(b)

  // The roster changed and the snapshot has caught up, but nobody has closed
  // this socket yet — the exact window the old code left open indefinitely.
  hub.state.roster = ['b']
  await hub.refresh('R1')
  // Let the eviction's own presence broadcast settle before measuring.
  await new Promise((resolve) => setImmediate(resolve))
  a.closed.length = 0
  hub.state.roster = ['a', 'b']

  await hub.receive(a, JSON.stringify({ type: 'speaking', speaking: true }))
  // Their claim was not relayed — the only thing the room heard about them is
  // the eviction's own "they stopped speaking" — and the socket is closed.
  assert.equal(b.lastOf('speaking').speaking, false)
  assert.deepEqual(a.closed, [{ code: CLOSE_EVICTED, reason: 'not_a_member' }])
})

test('a frame on a socket whose room went archived is refused, not relayed', async () => {
  const hub = hubWith()
  const a = stubClient('R1', 'a')
  const b = stubClient('R1', 'b')
  await hub.add(a)
  await hub.add(b)
  // The snapshot knows, but the sweep has not closed anybody yet.
  hub.state.archivedAt = '2026-09-02T12:00:00.000Z'
  const entrySnapshotRefreshed = hub.refresh('R1')
  hub.state.archivedAt = null
  await entrySnapshotRefreshed
  await new Promise((resolve) => setImmediate(resolve))
  assert.deepEqual(a.closed, [{ code: CLOSE_EVICTED, reason: 'archived' }])
  assert.deepEqual(b.closed, [{ code: CLOSE_EVICTED, reason: 'archived' }])
})

test('an archived room is closed for everybody, and told so first', async () => {
  const hub = hubWith()
  const a = stubClient('R1', 'a')
  const b = stubClient('R1', 'b')
  await hub.add(a)
  await hub.add(b)

  hub.state.archivedAt = '2026-09-02T12:00:00.000Z'
  await hub.announcePresence('R1')

  for (const client of [a, b]) {
    assert.deepEqual(client.lastOf('archived'), { type: 'archived', roomId: 'R1' })
    assert.deepEqual(client.closed, [{ code: CLOSE_EVICTED, reason: 'archived' }])
  }
  assert.deepEqual(hub.rooms(), [])
})

test('a party that no longer exists closes its sockets rather than serving them', async () => {
  const hub = hubWith()
  const a = stubClient('R1', 'a')
  await hub.add(a)
  hub.state.missing = true
  await hub.announcePresence('R1')
  assert.deepEqual(a.closed, [{ code: CLOSE_EVICTED, reason: 'not_found' }])
})

test('the periodic sweep evicts without anybody having written to the room', async () => {
  const hub = hubWith()
  const a = stubClient('R1', 'a')
  const b = stubClient('R1', 'b')
  await hub.add(a)
  await hub.add(b)
  hub.state.roster = ['b']
  await hub.sweep()
  assert.deepEqual(a.closed, [{ code: CLOSE_EVICTED, reason: 'not_a_member' }])
})

test('a sweep over a room nothing changed in sends no frames', async () => {
  const hub = hubWith()
  const a = stubClient('R1', 'a')
  await hub.add(a)
  const before = a.sent.length
  await hub.sweep()
  assert.equal(a.sent.length, before)
})

test('a sweep that finds a new seat does tell the room', async () => {
  const hub = hubWith({ roster: ['a'] })
  const a = stubClient('R1', 'a')
  await hub.add(a)
  const before = a.sent.filter((m) => m.type === 'presence').length
  hub.state.roster = ['a', 'b']
  await hub.sweep()
  assert.equal(a.sent.filter((m) => m.type === 'presence').length, before + 1)
})

/* ── C3: one stale socket cannot silence the room ────────────────────────── */

test('the roster is read on the server\u2019s own authority, not as one arbitrary socket', async () => {
  // The failure this replaces: the earliest-connected socket belongs to somebody
  // who has since left, `readMembers(room, thatUser)` returns null, and every
  // announcement for the whole room returns early — forever.
  const hub = hubWith()
  const departed = stubClient('R1', 'gone')
  const staying = stubClient('R1', 'b')
  hub.state.roster = ['gone', 'b']
  await hub.add(departed)
  await hub.add(staying)

  hub.state.roster = ['b']
  await hub.announcePresence('R1')
  assert.deepEqual(departed.closed, [{ code: CLOSE_EVICTED, reason: 'not_a_member' }])

  // And the room keeps working afterwards, which is the actual point.
  const before = staying.sent.filter((m) => m.type === 'presence').length
  hub.state.roster = ['b', 'c']
  await hub.announcePresence('R1')
  assert.equal(staying.sent.filter((m) => m.type === 'presence').length, before + 1)
})

test('an evicted member\u2019s SFU peer is closed and the room told', async () => {
  const sfu = stubSfu()
  const hub = hubWith({ sfu })
  const a = stubClient('R1', 'a')
  const b = stubClient('R1', 'b')
  await hub.add(a)
  await hub.add(b)
  await hub.receive(a, JSON.stringify({ type: 'sfu:produce', requestId: 1, transportId: 't', rtpParameters: {} }))

  hub.state.roster = ['b']
  await hub.announcePresence('R1')
  assert.deepEqual(b.lastOf('sfu:producerClosed'), { type: 'sfu:producerClosed', producerId: 'p-a', userId: 'a' })
})

/* ── I1 ──────────────────────────────────────────────────────────────────── */

test('the frame limit is small enough that no legitimate message reaches it', () => {
  assert.equal(MAX_FRAME_BYTES, 16 * 1024)
})

/* ── The `ws` edge, over a real socket ───────────────────────────────────── */

import http from 'node:http'
import { WebSocket } from 'ws'
import { BEARER_PROTOCOL as PROTOCOL, attachRoomsRealtime, resetRoomsRealtime } from './roomsRealtime.js'

/**
 * A real server on a real port, with the database and the SFU stubbed out.
 *
 * The hub tests above prove the protocol; this proves the wiring — that the
 * upgrade is claimed only for our path, that the token arrives in the
 * subprotocol, and that a refusal is a readable close code rather than an
 * opaque handshake failure.
 */
async function withServer(roster, run) {
  const server = http.createServer((_req, res) => { res.writeHead(404); res.end() })
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  resetRoomsRealtime()
  const realtime = await attachRoomsRealtime(server, {
    identityFromToken: async (token) => (token?.startsWith('good.') ? { id: token.slice(5) } : null),
    resolveRoom: async (code) => (code === 'KTP0R2' ? 'party-1' : null),
    readRoom: async (roomId) => (roomId === 'party-1'
      ? { id: 'party-1', code: 'KTP0R2', name: 'Room', archivedAt: null, members: membersOf(...roster) }
      : null),
    loadSfu: async () => ({ available: false, reason: 'Voice is unavailable right now.' }),
  })
  const url = `ws://127.0.0.1:${server.address().port}/api/rooms/ws`
  const opened = []

  /**
   * A socket that records everything it was ever sent.
   *
   * Waiting on the *next* frame is a race this protocol loses: `hello` and the
   * first `presence` are two sends inside one turn, so a listener attached
   * after awaiting the first has already missed the second. So every frame is
   * kept, and `waitFor` answers from what has arrived before it agrees to wait.
   */
  const open = (path, token) => {
    const socket = new WebSocket(path, token ? [PROTOCOL, token] : undefined)
    const received = []
    const waiters = []
    let closeCode = null
    socket.on('message', (data) => {
      const message = JSON.parse(data.toString())
      received.push(message)
      for (const waiter of [...waiters]) {
        if (waiter.type && waiter.type !== message.type) continue
        waiters.splice(waiters.indexOf(waiter), 1)
        waiter.resolve(message)
      }
    })
    socket.on('close', (code) => {
      closeCode = code
      for (const waiter of waiters.splice(0)) waiter.reject(new Error(`closed ${code}`))
    })
    // A handshake refused before it completed surfaces as an error and then a
    // close; the close is what the cases assert on.
    socket.on('error', () => {})

    const handle = {
      socket,
      send: (message) => socket.send(JSON.stringify(message)),
      waitFor(type) {
        const already = received.find((message) => message.type === type)
        if (already) return Promise.resolve(already)
        if (closeCode !== null) return Promise.reject(new Error(`closed ${closeCode}`))
        return new Promise((resolve, reject) => waiters.push({ type, resolve, reject }))
      },
      closed() {
        if (closeCode !== null) return Promise.resolve(closeCode)
        return new Promise((resolve) => socket.once('close', resolve))
      },
      opened() {
        if (socket.readyState === WebSocket.OPEN) return Promise.resolve(true)
        return new Promise((resolve) => {
          socket.once('open', () => resolve(true))
          socket.once('close', () => resolve(false))
        })
      },
    }
    opened.push(handle)
    return handle
  }

  try {
    await run({ url, open })
  } finally {
    // Closed by the harness rather than by each case: a test that asserts and
    // returns must not leave a live connection behind, and one that did would
    // hang the whole file rather than fail under its own name.
    for (const handle of opened) handle.socket.terminate()
    realtime?.wss.close()
    server.closeAllConnections?.()
    await new Promise((resolve) => server.close(resolve))
    resetRoomsRealtime()
  }
}

test('a member connecting with a code is admitted and greeted', async () => {
  await withServer(['u1', 'u2'], async ({ url, open }) => {
    const client = open(`${url}?code=KTP0R2`, 'good.u1')
    const hello = await client.waitFor('hello')
    assert.equal(hello.userId, 'u1')
    assert.equal(hello.roomId, 'party-1')
    assert.equal(hello.sfu.available, false)
    const presence = await client.waitFor('presence')
    assert.deepEqual(presence.members.map((m) => m.userId), ['u1', 'u2'])
  })
})

test('a non-member is closed with 4401, not left waiting', async () => {
  await withServer(['u1'], async ({ url, open }) => {
    assert.equal(await open(`${url}?code=KTP0R2`, 'good.stranger').closed(), CLOSE_NOT_A_MEMBER)
  })
})

test('no token at all is 4401 too', async () => {
  await withServer(['u1'], async ({ url, open }) => {
    assert.equal(await open(`${url}?code=KTP0R2`, null).closed(), CLOSE_NOT_A_MEMBER)
  })
})

test('a room code that names nothing is 4401, the same answer a stranger gets', async () => {
  await withServer(['u1'], async ({ url, open }) => {
    assert.equal(await open(`${url}?code=NOPE99`, 'good.u1').closed(), CLOSE_NOT_A_MEMBER)
  })
})

test('two members in one room hear each other speak', async () => {
  await withServer(['u1', 'u2'], async ({ url, open }) => {
    const first = open(`${url}?code=KTP0R2`, 'good.u1')
    await first.waitFor('presence')
    const second = open(`${url}?code=KTP0R2`, 'good.u2')
    await second.waitFor('presence')

    second.send({ type: 'speaking', speaking: true })
    assert.deepEqual(await first.waitFor('speaking'), { type: 'speaking', userId: 'u2', speaking: true })
  })
})

test('with voice unavailable an sfu request is answered with the reason', async () => {
  await withServer(['u1'], async ({ url, open }) => {
    const client = open(`${url}?code=KTP0R2`, 'good.u1')
    await client.waitFor('presence')
    client.send({ type: 'sfu:rtpCapabilities', requestId: 'r1' })
    const refusal = await client.waitFor('sfu:unavailable')
    assert.equal(refusal.requestId, 'r1')
    assert.equal(refusal.reason, 'Voice is unavailable right now.')
  })
})

test('an upgrade on another path is not claimed by the room socket', async () => {
  await withServer(['u1'], async ({ url, open }) => {
    const client = open(url.replace('/api/rooms/ws', '/api/parties/x/games/y/events'), 'good.u1')
    assert.equal(await client.opened(), false)
  })
})

test('closing one of a member’s two tabs does not cut the audio in the other', async () => {
  const sfu = stubSfu()
  const hub = createRoomHub({ readRoom: async () => roomOf('a', 'b'), sfu })
  const firstTab = stubClient('R1', 'a')
  const secondTab = stubClient('R1', 'a')
  const other = stubClient('R1', 'b')
  await hub.add(firstTab)
  await hub.add(secondTab)
  await hub.add(other)
  await hub.receive(firstTab, JSON.stringify({ type: 'sfu:produce', requestId: 1, transportId: 't', rtpParameters: {} }))

  hub.remove(secondTab)
  assert.equal(other.lastOf('sfu:producerClosed'), null)
  assert.equal(other.lastOf('speaking'), null)

  hub.remove(firstTab)
  assert.deepEqual(other.lastOf('sfu:producerClosed'), { type: 'sfu:producerClosed', producerId: 'p-a', userId: 'a' })
})
