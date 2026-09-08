import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import {
  backoffDelay,
  initialChannelState,
  parseChannelMessage,
  reduceChannel,
  roomSocketUrl,
  type ChannelMember,
  type ChannelProducer,
  type ChannelStatus,
  type RoomChannelState,
} from './roomChannel'

/**
 * The room's live connection.
 *
 * One WebSocket per open room, carrying presence, speaking, and the SFU
 * negotiation. Everything it *decides* lives in `roomChannel.ts` and is tested
 * there; this file owns only the socket, the retries and the request/response
 * bookkeeping — the parts that need a browser.
 *
 * In demo mode there is no `VITE_API_BASE`, so `roomSocketUrl` returns null and
 * this hook never touches the network. That is not a special case bolted on: it
 * is the same condition that makes the rest of the app demo mode.
 */

/** Refused at the door: not a member, or not signed in. Retrying is pointless. */
const CLOSE_NOT_A_MEMBER = 4401

/**
 * Admitted, and then no longer welcome: the student left the party, was
 * removed, or the room was archived. Retrying is equally pointless, and unlike
 * 4401 it is worth re-reading the party over — the page is showing a room that
 * has moved on without them.
 */
const CLOSE_EVICTED = 4403

/** How long a request waits for its answer before giving up on it. */
const REQUEST_TIMEOUT_MS = 15_000

export interface RoomChannel {
  voiceReset:number
  status: ChannelStatus
  /** Null until the socket has said who is here — not the same as an empty room. */
  members: ChannelMember[] | null
  speaking: Set<string>
  producers: ChannelProducer[]
  sfu: RoomChannelState['sfu']
  /** True while presence from this socket should be preferred over polling. */
  connected: boolean
  /** The room was archived or deleted; the page should re-read the party. */
  archived: boolean
  /** A closed socket that is expected back. False once it has given up. */
  retrying: boolean
  /** Fire and forget: `speaking`, `presence:refresh`. */
  send(message: Record<string, unknown>): void
  /** Ask and wait. Rejects if the socket closes or the answer never comes. */
  request<T = Record<string, unknown>>(message: Record<string, unknown>): Promise<T>
}

interface Pending {
  resolve(value: never): void
  reject(error: Error): void
  timer: number
}

export function useRoomChannel(code: string | null): RoomChannel {
  const [state, dispatch] = useReducer(reduceChannel, initialChannelState)

  const socket = useRef<WebSocket | null>(null)
  const pending = useRef(new Map<number, Pending>())
  const nextRequestId = useRef(0)
  // Bumped on every teardown, so a socket that finishes opening after the room
  // closed — or after React re-ran the effect — cannot install itself. The same
  // shape as the microphone guard in `micSession.ts`, and for the same reason.
  const generation = useRef(0)

  const url = useMemo(
    () => roomSocketUrl(
      import.meta.env.VITE_API_BASE as string | undefined,
      code ?? '',
      typeof window === 'undefined' ? undefined : window.location.origin,
    ),
    [code],
  )

  const failPending = useCallback((reason: string) => {
    for (const request of pending.current.values()) {
      window.clearTimeout(request.timer)
      request.reject(new Error(reason))
    }
    pending.current.clear()
  }, [])

  useEffect(() => {
    if (!url) return undefined

    const mine = ++generation.current
    let retries = 0
    let retryTimer = 0
    let closedForGood = false

    const connect = () => {
      if (closedForGood || generation.current !== mine) return
      dispatch({ kind: 'connecting' })

      // No subprotocol: the session is a cookie, and the browser sends it with
      // the upgrade request because the socket is same-origin. The bearer
      // subprotocol stays in the server for native clients, which still hold a
      // token of their own; there is nothing here to put in it.
      let ws: WebSocket
      try {
        ws = new WebSocket(url)
      } catch {
        schedule()
        return
      }
      socket.current = ws

      ws.addEventListener('open', () => {
        retries = 0
      })

      ws.addEventListener('message', (event) => {
        const message = parseChannelMessage(String(event.data))
        if (!message) return
        const requestId = (message as { requestId?: unknown }).requestId
        if (typeof requestId === 'number' && pending.current.has(requestId)) {
          const request = pending.current.get(requestId)!
          pending.current.delete(requestId)
          window.clearTimeout(request.timer)
          if (message.type === 'error') {
            request.reject(new Error(String((message as { error?: string }).error ?? 'failed')))
          } else {
            ;(request.resolve as (value: unknown) => void)(message)
          }
          // A refusal is also room state — the hall has to be able to say voice
          // is unavailable — so it keeps falling through to the reducer.
          if (message.type !== 'sfu:unavailable') return
        }
        dispatch({ kind: 'message', message })
      })

      ws.addEventListener('close', (event) => {
        if (socket.current === ws) socket.current = null
        failPending('The room connection closed.')
        // 4401 is "you were never allowed in"; 4403 is "you are not allowed in
        // any more" — you left, you were removed, or the room was archived.
        // Retrying either on a timer is a loop that never ends and never
        // succeeds; the poll is the fallback and it will say the same thing.
        const permanent = event.code === CLOSE_NOT_A_MEMBER || event.code === CLOSE_EVICTED
        if (permanent) closedForGood = true
        dispatch({ kind: 'closed', permanent })
        schedule()
      })

      ws.addEventListener('error', () => {
        // `close` always follows, and it is the one that carries the code.
      })
    }

    const schedule = () => {
      if (closedForGood || generation.current !== mine) return
      // A little jitter so twenty students dropped by one flaky wifi do not all
      // come back in the same millisecond.
      const delay = backoffDelay(retries++) + Math.floor(Math.random() * 400)
      retryTimer = window.setTimeout(() => connect(), delay)
    }

    connect()

    return () => {
      closedForGood = true
      generation.current += 1
      window.clearTimeout(retryTimer)
      failPending('The room was closed.')
      const open = socket.current
      socket.current = null
      // 1000 is a clean, deliberate close: the server broadcasts that this
      // member's sockets went away rather than waiting for the ping to notice.
      try { open?.close(1000, 'left') } catch { /* already gone */ }
      dispatch({ kind: 'closed', permanent: true })
    }
  }, [url, failPending])

  const send = useCallback((message: Record<string, unknown>) => {
    const ws = socket.current
    if (ws?.readyState !== WebSocket.OPEN) return
    ws.send(JSON.stringify(message))
  }, [])

  const request = useCallback(<T,>(message: Record<string, unknown>): Promise<T> => {
    const ws = socket.current
    if (ws?.readyState !== WebSocket.OPEN) {
      return Promise.reject(new Error('The room is not connected.'))
    }
    const requestId = ++nextRequestId.current
    return new Promise<T>((resolve, reject) => {
      const timer = window.setTimeout(() => {
        pending.current.delete(requestId)
        reject(new Error('The room did not answer in time.'))
      }, REQUEST_TIMEOUT_MS)
      pending.current.set(requestId, {
        resolve: resolve as unknown as Pending['resolve'],
        reject,
        timer,
      })
      ws.send(JSON.stringify({ ...message, requestId }))
    })
  }, [])

  const speaking = useMemo(() => new Set(state.speaking), [state.speaking])

  return {
    voiceReset:state.voiceReset,
    status: state.status,
    members: state.members,
    speaking,
    producers: state.producers,
    sfu: state.sfu,
    connected: state.status === 'open',
    archived: state.archived,
    retrying: state.retrying,
    send,
    request,
  }
}
