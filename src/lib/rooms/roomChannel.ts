/**
 * What a study room's socket says, and what it means for the room on screen.
 *
 * Pure, and free of React and of the DOM, so the whole protocol can be tested
 * on Node the way `roomPresence.ts` is: a socket that reconnects mid-sentence,
 * a `presence` that arrives before `hello`, a producer that closes while its
 * consumer is still being built. Those are the cases that are impossible to
 * reproduce by hand in a browser and trivial to state here.
 *
 * `useRoomChannel.ts` owns the WebSocket and does nothing but feed this.
 */

import type { SeatPreference } from './roomPresence'

/* ---- What the server sends ------------------------------------------- */

/** A member's seat as the server stores it. Every piece may be unchosen. */
export interface ChannelSeat {
  desk: SeatPreference['desk'] | null
  device: SeatPreference['device'] | null
  chair: SeatPreference['chair'] | null
  seatIndex: number | null
}

export interface ChannelMember {
  userId: string
  displayName: string
  role: 'host' | 'member'
  joinedAt?: string
  seat: ChannelSeat | null
  lastActiveAt: string | null
  activity: 'studying' | 'idle'
}

export interface ChannelProducer {
  producerId: string
  userId: string
}

export type ChannelMessage =
  | { type: 'hello'; userId: string; roomId: string; sfu: { available: boolean; reason?: string; iceServers?: RTCIceServer[] } }
  | { type: 'presence'; members: ChannelMember[] }
  | { type: 'speaking'; userId: string; speaking: boolean }
  | { type: 'sfu:newProducer'; producerId: string; userId: string }
  | { type: 'sfu:producerClosed'; producerId: string; userId: string }
  | { type: 'sfu:unavailable'; requestId?: string | number; reason: string }
  | { type: 'archived'; roomId: string }
  | { type: 'error'; requestId?: string | number; error: string }
  | { type: string; requestId?: string | number; [key: string]: unknown }

/* ---- The room, as the channel knows it -------------------------------- */

export type ChannelStatus = 'idle' | 'connecting' | 'open' | 'closed'

export interface RoomChannelState {
  voiceReset:number
  status: ChannelStatus
  /**
   * Null until the first `presence` arrives — which is not the same as an empty
   * room, and the hall must be able to tell them apart. Null means "fall back
   * to the polled party"; `[]` would mean "nobody is here", which the socket
   * cannot say, because the caller is in the room.
   */
  members: ChannelMember[] | null
  /** Who is speaking, by user id. Sorted, so equal rooms compare equal. */
  speaking: string[]
  producers: ChannelProducer[]
  /** Null until `hello`. `available: false` carries the reason the room shows. */
  sfu: { available: boolean; reason?: string; iceServers?: RTCIceServer[] } | null
  /**
   * The room was archived, or is gone. The socket is closed for good and the
   * page has to re-read the party rather than sit in a room that no longer
   * exists — which, with the poll standing down while the socket is open, is
   * otherwise a room that stays fully interactive after it was closed.
   */
  archived: boolean
  /**
   * Whether a closed socket is expected back.
   *
   * A drop is transient and the room says "reconnecting"; a 4401 or a 4403 is
   * not, and saying "reconnecting" forever in front of somebody behind a proxy
   * that will never upgrade is a lie the room tells indefinitely.
   */
  retrying: boolean
}

export const initialChannelState: RoomChannelState = {
  status: 'idle',
  members: null,
  speaking: [],
  producers: [],
  voiceReset:0,
  sfu: null,
  archived: false,
  retrying: false,
}

export type ChannelAction =
  | { kind: 'connecting' }
  /** `permanent` for a refusal that retrying cannot fix — 4401, 4403, no session. */
  | { kind: 'closed'; permanent?: boolean }
  | { kind: 'message'; message: ChannelMessage }

/**
 * One frame of JSON, or null.
 *
 * Anything that is not an object with a string `type` is not a message. A
 * socket does not get to crash the room by sending an array.
 */
export function parseChannelMessage(raw: string): ChannelMessage | null {
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return null
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null
  const message = parsed as { type?: unknown }
  if (typeof message.type !== 'string') return null
  return parsed as ChannelMessage
}

function withSpeaking(speaking: string[], userId: string, isSpeaking: boolean): string[] {
  const has = speaking.includes(userId)
  if (isSpeaking === has) return speaking
  return isSpeaking
    ? [...speaking, userId].sort()
    : speaking.filter((id) => id !== userId)
}

/**
 * The room after one thing happened.
 *
 * Returns the same object when nothing changed, so React re-renders twenty
 * desks only when twenty desks changed — a `speaking` frame repeating what the
 * room already knew is common (a client reconnecting mid-word is told the
 * state) and must not repaint the hall.
 */
export function reduceChannel(state: RoomChannelState, action: ChannelAction): RoomChannelState {
  switch (action.kind) {
    case 'connecting':
      return state.status === 'connecting' && state.retrying
        ? state
        : { ...state, status: 'connecting', retrying: true }

    case 'closed':
      // Members are kept across a drop on purpose: the room did not empty, the
      // connection did, and blanking the hall for the second it takes to
      // reconnect is a worse lie than showing it one second stale. Speaking and
      // producers do not survive — those are claims about *now*, and a socket
      // that is closed knows nothing about now.
      return { ...state, status: 'closed', speaking: [], producers: [], retrying: !action.permanent }

    case 'message':
      return reduceMessage(state, action.message)

    default:
      return state
  }
}

function reduceMessage(state: RoomChannelState, message: ChannelMessage): RoomChannelState {
  switch (message.type) {
    case 'hello': {
      const hello = message as Extract<ChannelMessage, { type: 'hello' }>
      return { ...state, status: 'open', retrying: true, sfu: hello.sfu ?? { available: false } }
    }

    case 'archived':
      // Sticky. The socket closes immediately after this, and the room has to
      // keep knowing why for as long as the page is open.
      return state.archived ? state : { ...state, archived: true }

    case 'presence': {
      const members = (message as { members?: unknown }).members
      if (!Array.isArray(members)) return state
      // A member who left is no longer speaking, whatever the last frame about
      // them said — otherwise a name lingers in "Speaking now" forever.
      const present = new Set(members.map((member: ChannelMember) => member.userId))
      const speaking = state.speaking.filter((id) => present.has(id))
      return {
        ...state,
        status: 'open',
        members: members as ChannelMember[],
        speaking: speaking.length === state.speaking.length ? state.speaking : speaking,
      }
    }

    case 'speaking': {
      const { userId, speaking } = message as Extract<ChannelMessage, { type: 'speaking' }>
      if (typeof userId !== 'string') return state
      const next = withSpeaking(state.speaking, userId, Boolean(speaking))
      return next === state.speaking ? state : { ...state, speaking: next }
    }

    case 'sfu:newProducer': {
      const { producerId, userId } = message as Extract<ChannelMessage, { type: 'sfu:newProducer' }>
      if (!producerId || state.producers.some((producer) => producer.producerId === producerId)) return state
      return { ...state, producers: [...state.producers, { producerId, userId }] }
    }

    case 'sfu:producerClosed': {
      const { producerId } = message as Extract<ChannelMessage, { type: 'sfu:producerClosed' }>
      if (!state.producers.some((producer) => producer.producerId === producerId)) return state
      return { ...state, producers: state.producers.filter((producer) => producer.producerId !== producerId) }
    }

    case 'sfu:producers': {
      const producers = (message as { producers?: unknown }).producers
      if (!Array.isArray(producers)) return state
      return { ...state, producers: producers as ChannelProducer[] }
    }

    case 'sfu:voiceReset': return {...state,voiceReset:state.voiceReset+1}
    case 'sfu:unavailable': {
      const { reason } = message as Extract<ChannelMessage, { type: 'sfu:unavailable' }>
      return { ...state, sfu: { available: false, reason } }
    }

    default:
      // A reply to a request (`sfu:createTransport`, `sfu:consume`, …) is
      // delivered to whoever asked, not to the room. An unknown type is a
      // server from another version, and the room carries on.
      return state
  }
}

/* ---- Reconnection ------------------------------------------------------ */

/** First retry, and the ceiling. A room is worth waiting half a minute for. */
export const BACKOFF_MIN_MS = 1_000
export const BACKOFF_MAX_MS = 30_000

/**
 * How long to wait before retry number `attempt` (0-based).
 *
 * Doubling from one second to thirty. Deterministic — the jitter is added by
 * the caller, where a random number belongs — so the schedule can be asserted.
 */
export function backoffDelay(attempt: number): number {
  const step = Math.max(0, Math.floor(attempt))
  return Math.min(BACKOFF_MAX_MS, BACKOFF_MIN_MS * 2 ** step)
}

/* ---- What the hall needs ---------------------------------------------- */

/**
 * The socket URL for a room, from the configured API base.
 *
 * `http` → `ws` and `https` → `wss`; a relative base (the app served by the
 * same Express server, which is production) resolves against the page. Returns
 * null when there is no base at all — demo mode has no socket and must never
 * open one.
 *
 * The configured base already ends in `/api` in every live deployment — every
 * other call is `${base}/me/…`, `${base}/parties/…` — so the endpoint is
 * `${base}/rooms/ws`. A trailing `/api` path segment is stripped before the
 * `/api/rooms/ws` suffix is added, so a base written either way resolves to
 * one `/api`, never the `/api/api/rooms/ws` that silently 404'd the upgrade and
 * left every room reporting voice unavailable. Only a trailing path segment is
 * touched; a host like `api.nishany.com` is left alone.
 */
export function roomSocketUrl(base: string | undefined, code: string, origin?: string): string | null {
  if (!base || !code) return null
  const normalised = base.replace(/\/+$/, '').replace(/\/api$/i, '')
  let resolved: URL
  try {
    resolved = /^https?:\/\//i.test(normalised)
      ? new URL(`${normalised}/api/rooms/ws`)
      : new URL(`${normalised}/api/rooms/ws`, origin ?? 'http://localhost')
  } catch {
    return null
  }
  resolved.protocol = resolved.protocol === 'https:' ? 'wss:' : 'ws:'
  resolved.searchParams.set('code', code)
  return resolved.toString()
}
