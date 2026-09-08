import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  BACKOFF_MAX_MS,
  BACKOFF_MIN_MS,
  backoffDelay,
  initialChannelState,
  parseChannelMessage,
  reduceChannel,
  roomSocketUrl,
  type ChannelMember,
  type ChannelMessage,
  type RoomChannelState,
} from './roomChannel.ts'

const member = (userId: string, over: Partial<ChannelMember> = {}): ChannelMember => ({
  userId,
  displayName: userId,
  role: 'member',
  seat: null,
  lastActiveAt: null,
  activity: 'idle',
  ...over,
})

const apply = (state: RoomChannelState, ...messages: ChannelMessage[]): RoomChannelState =>
  messages.reduce((current, message) => reduceChannel(current, { kind: 'message', message }), state)

/* ---- Framing ----------------------------------------------------------- */

test('a frame with a type is a message', () => {
  assert.deepEqual(parseChannelMessage('{"type":"presence","members":[]}'), { type: 'presence', members: [] })
})

test('noise is not a message', () => {
  assert.equal(parseChannelMessage(']['), null)
  assert.equal(parseChannelMessage('[1,2]'), null)
  assert.equal(parseChannelMessage('{"members":[]}'), null)
  assert.equal(parseChannelMessage('null'), null)
})

/* ---- Presence ---------------------------------------------------------- */

test('before the first presence the room is unknown, not empty', () => {
  assert.equal(initialChannelState.members, null)
})

test('presence replaces the room wholesale', () => {
  const state = apply(initialChannelState, { type: 'presence', members: [member('a'), member('b')] })
  assert.deepEqual(state.members?.map((m) => m.userId), ['a', 'b'])
  assert.equal(state.status, 'open')
})

test('a presence that is not a list is ignored rather than emptying the hall', () => {
  const seeded = apply(initialChannelState, { type: 'presence', members: [member('a')] })
  const after = apply(seeded, { type: 'presence' } as ChannelMessage)
  assert.equal(after, seeded)
})

test('somebody who left the room stops being listed as speaking', () => {
  const state = apply(
    initialChannelState,
    { type: 'presence', members: [member('a'), member('b')] },
    { type: 'speaking', userId: 'b', speaking: true },
    { type: 'presence', members: [member('a')] },
  )
  assert.deepEqual(state.speaking, [])
})

/* ---- Speaking ---------------------------------------------------------- */

test('speaking is added and removed by user', () => {
  let state = apply(initialChannelState, { type: 'speaking', userId: 'a', speaking: true })
  assert.deepEqual(state.speaking, ['a'])
  state = apply(state, { type: 'speaking', userId: 'b', speaking: true })
  assert.deepEqual(state.speaking, ['a', 'b'])
  state = apply(state, { type: 'speaking', userId: 'a', speaking: false })
  assert.deepEqual(state.speaking, ['b'])
})

test('a speaking frame that says what the room already knew changes nothing at all', () => {
  const seeded = apply(initialChannelState, { type: 'speaking', userId: 'a', speaking: true })
  // Identity, not equality: a new object here repaints twenty desks for nothing.
  assert.equal(apply(seeded, { type: 'speaking', userId: 'a', speaking: true }), seeded)
  assert.equal(apply(seeded, { type: 'speaking', userId: 'z', speaking: false }), seeded)
})

/* ---- The SFU ----------------------------------------------------------- */

test('hello carries whether there is any voice at all', () => {
  const yes = apply(initialChannelState, {
    type: 'hello', userId: 'a', roomId: 'r', sfu: { available: true, iceServers: [] },
  })
  assert.equal(yes.sfu?.available, true)
  assert.equal(yes.status, 'open')

  const no = apply(initialChannelState, {
    type: 'hello', userId: 'a', roomId: 'r', sfu: { available: false, reason: 'not installed' },
  })
  assert.equal(no.sfu?.reason, 'not installed')
})

test('a later refusal overrides an optimistic hello', () => {
  const state = apply(
    initialChannelState,
    { type: 'hello', userId: 'a', roomId: 'r', sfu: { available: true } },
    { type: 'sfu:unavailable', reason: 'The voice server could not start.' },
  )
  assert.deepEqual(state.sfu, { available: false, reason: 'The voice server could not start.' })
})

test('producers accumulate, deduplicate and disappear', () => {
  let state = apply(initialChannelState, { type: 'sfu:newProducer', producerId: 'p1', userId: 'b' })
  assert.deepEqual(state.producers, [{ producerId: 'p1', userId: 'b' }])
  const same = apply(state, { type: 'sfu:newProducer', producerId: 'p1', userId: 'b' })
  assert.equal(same, state)
  state = apply(state, { type: 'sfu:newProducer', producerId: 'p2', userId: 'c' })
  state = apply(state, { type: 'sfu:producerClosed', producerId: 'p1', userId: 'b' })
  assert.deepEqual(state.producers, [{ producerId: 'p2', userId: 'c' }])
})

test('the producer list a late joiner asks for replaces what it had', () => {
  const state = apply(
    initialChannelState,
    { type: 'sfu:newProducer', producerId: 'stale', userId: 'x' },
    { type: 'sfu:producers', producers: [{ producerId: 'p1', userId: 'b' }] },
  )
  assert.deepEqual(state.producers, [{ producerId: 'p1', userId: 'b' }])
})

test('a reply to a request is not room state', () => {
  const seeded = apply(initialChannelState, { type: 'presence', members: [member('a')] })
  assert.equal(apply(seeded, { type: 'sfu:consume', requestId: 3, id: 'c1' } as ChannelMessage), seeded)
  assert.equal(apply(seeded, { type: 'error', requestId: 3, error: 'cannot_consume' }), seeded)
})

/* ---- Connection lifecycle ---------------------------------------------- */

test('a dropped socket keeps the room but forgets every claim about now', () => {
  const live = apply(
    initialChannelState,
    { type: 'presence', members: [member('a'), member('b')] },
    { type: 'speaking', userId: 'b', speaking: true },
    { type: 'sfu:newProducer', producerId: 'p1', userId: 'b' },
  )
  const dropped = reduceChannel(live, { kind: 'closed' })
  assert.equal(dropped.status, 'closed')
  assert.deepEqual(dropped.members?.map((m) => m.userId), ['a', 'b'])
  assert.deepEqual(dropped.speaking, [])
  assert.deepEqual(dropped.producers, [])
})

test('connecting twice is one state, so a retry does not repaint', () => {
  const first = reduceChannel(initialChannelState, { kind: 'connecting' })
  assert.equal(reduceChannel(first, { kind: 'connecting' }), first)
})

/* ---- Backoff ----------------------------------------------------------- */

test('backoff doubles from one second and stops at thirty', () => {
  assert.deepEqual([0, 1, 2, 3, 4, 5].map(backoffDelay), [1_000, 2_000, 4_000, 8_000, 16_000, 30_000])
  assert.equal(backoffDelay(0), BACKOFF_MIN_MS)
  assert.equal(backoffDelay(50), BACKOFF_MAX_MS)
  assert.equal(backoffDelay(-3), BACKOFF_MIN_MS)
})

/* ---- The URL ----------------------------------------------------------- */

test('an https api base becomes a wss socket', () => {
  assert.equal(
    roomSocketUrl('https://api.nishany.com', 'KTP0R2'),
    'wss://api.nishany.com/api/rooms/ws?code=KTP0R2',
  )
})

test('a base that already ends in /api does not double it', () => {
  // Production sets VITE_API_BASE to `https://host/api`; every other call is
  // `${base}/me/…`. The socket must land on one `/api`, not `/api/api`.
  assert.equal(
    roomSocketUrl('https://nishany.com/api', 'KTP0R2'),
    'wss://nishany.com/api/rooms/ws?code=KTP0R2',
  )
  assert.equal(
    roomSocketUrl('https://nishany.com/api/', 'KTP0R2'),
    'wss://nishany.com/api/rooms/ws?code=KTP0R2',
  )
})

test('an http api base becomes a ws socket', () => {
  assert.equal(
    roomSocketUrl('http://localhost:8080', 'KTP0R2'),
    'ws://localhost:8080/api/rooms/ws?code=KTP0R2',
  )
})

test('a relative base resolves against the page it is served from', () => {
  assert.equal(
    roomSocketUrl('/api-base', 'KTP0R2', 'https://nishany.com'),
    'wss://nishany.com/api-base/api/rooms/ws?code=KTP0R2',
  )
})

test('demo mode has no socket to open', () => {
  assert.equal(roomSocketUrl(undefined, 'KTP0R2'), null)
  assert.equal(roomSocketUrl('', 'KTP0R2'), null)
  assert.equal(roomSocketUrl('https://api.nishany.com', ''), null)
})

/* ---- Eviction, archiving, and giving up -------------------------------- */

test('a room that says it was archived stays archived', () => {
  const state = apply(initialChannelState, { type: 'archived', roomId: 'r' })
  assert.equal(state.archived, true)
  // Sticky: the socket closes straight after, and the page has to keep knowing.
  assert.equal(reduceChannel(state, { kind: 'closed', permanent: true }).archived, true)
  // And idempotent, so a repeat does not repaint.
  assert.equal(apply(state, { type: 'archived', roomId: 'r' }), state)
})

test('a transient drop is expected back; a refusal is not', () => {
  const live = apply(initialChannelState, { type: 'presence', members: [member('a')] })
  assert.equal(reduceChannel(live, { kind: 'closed' }).retrying, true)
  assert.equal(reduceChannel(live, { kind: 'closed', permanent: true }).retrying, false)
})

test('giving up and then trying again is a new attempt, not a stale one', () => {
  const gaveUp = reduceChannel(initialChannelState, { kind: 'closed', permanent: true })
  const trying = reduceChannel(gaveUp, { kind: 'connecting' })
  assert.equal(trying.retrying, true)
  assert.equal(trying.status, 'connecting')
})


test('each server voice reset reaches the microphone lifecycle even without a seat snapshot', () => {
  const once = apply(initialChannelState, { type: 'sfu:voiceReset' })
  const twice = apply(once, { type: 'sfu:voiceReset' })
  assert.equal(once.voiceReset, 1)
  assert.equal(twice.voiceReset, 2)
  assert.equal(twice.members, null)
})
