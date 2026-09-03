import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { API_BASE, apiPost } from '@/lib/api'
import type { PartyGameAction, PartyGamePublicState, PublicPartyGameEvent } from '@/data/partyGameSync'

export interface UsePartyGameSyncOptions {
  partyId: string
  gameId: string
  initialState: PartyGamePublicState | null
  /**
   * Defaults to the future canonical route:
   * /parties/:partyId/games/:gameId/events
   */
  eventsPath?: string
  /**
   * Defaults to the future canonical route:
   * /parties/:partyId/games/:gameId/actions
   */
  actionsPath?: string
  enabled?: boolean
}

export interface PartyGameActionResponse {
  state?: PartyGamePublicState
  events?: PublicPartyGameEvent[]
}

export function partyGameEventsPath(partyId: string, gameId: string, after?: string): string {
  const base = `/parties/${encodeURIComponent(partyId)}/games/${encodeURIComponent(gameId)}/events`
  return after ? `${base}?after=${encodeURIComponent(after)}` : base
}

export function partyGameActionsPath(partyId: string, gameId: string): string {
  return `/parties/${encodeURIComponent(partyId)}/games/${encodeURIComponent(gameId)}/actions`
}

function applyPublicEvent(state: PartyGamePublicState | null, event: PublicPartyGameEvent): PartyGamePublicState | null {
  if (event.publicState) return event.publicState
  if (!state) return state
  // The SSE contract should normally stream publicState snapshots, because the
  // client never has answer keys and therefore must not reduce authoritative
  // scoring locally. These light patches keep liveness indicators useful if an
  // older server emits small public events during rollout.
  if (event.type === 'participant_reconnected' || event.type === 'participant_left') {
    const participantId = event.payload.participantId as string | undefined
    if (!participantId || !state.participants[participantId]) return state
    return {
      ...state,
      participants: {
        ...state.participants,
        [participantId]: {
          ...state.participants[participantId],
          connected: event.type === 'participant_reconnected',
          lastSeenAt: event.createdAt,
        },
      },
      updatedAt: event.createdAt,
      version: event.sequence,
    }
  }
  return state
}

function eventsFromSseChunk(chunk: string): PublicPartyGameEvent[] {
  return chunk
    .split('\n\n')
    .map((block) => block
      .split('\n')
      .filter((line) => line.startsWith('data:'))
      .map((line) => line.slice(5).trimStart())
      .join('\n'))
    .filter(Boolean)
    .map((data) => JSON.parse(data) as PublicPartyGameEvent)
}

function reconnectDelay(signal: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    const timer = window.setTimeout(resolve, 2_000)
    signal.addEventListener('abort', () => {
      window.clearTimeout(timer)
      resolve()
    }, { once: true })
  })
}

export function usePartyGameSync({
  partyId,
  gameId,
  initialState,
  eventsPath,
  actionsPath,
  enabled = true,
}: UsePartyGameSyncOptions) {
  const [state, setState] = useState<PartyGamePublicState | null>(initialState)
  const [events, setEvents] = useState<PublicPartyGameEvent[]>([])
  const [connected, setConnected] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const lastEventId = useRef<string | null>(null)

  useEffect(() => {
    setState(initialState)
  }, [initialState])

  const resolvedEventsPath = useMemo(
    () => eventsPath ?? partyGameEventsPath(partyId, gameId, lastEventId.current ?? undefined),
    [eventsPath, gameId, partyId],
  )
  const resolvedActionsPath = useMemo(
    () => actionsPath ?? partyGameActionsPath(partyId, gameId),
    [actionsPath, gameId, partyId],
  )

  useEffect(() => {
    if (!enabled) return undefined
    const abort = new AbortController()
    let carry = ''

    async function connect() {
      while (!abort.signal.aborted) {
        try {
          const after = lastEventId.current
          const separator = resolvedEventsPath.includes('?') ? '&' : '?'
          const path = after ? `${resolvedEventsPath}${separator}after=${encodeURIComponent(after)}` : resolvedEventsPath
          // No Authorization header: the session is a same-origin cookie the
          // browser attaches itself, and there is no token in this page to send.
          const response = await fetch(`${API_BASE}${path}`, {
            credentials: 'same-origin',
            signal: abort.signal,
          })
          if (!response.ok || !response.body) throw new Error('Live party updates are reconnecting.')
          setConnected(true)
          setError(null)
          const reader = response.body.getReader()
          const decoder = new TextDecoder()
          while (!abort.signal.aborted) {
            const { done, value } = await reader.read()
            if (done) break
            carry += decoder.decode(value, { stream: true })
            const boundary = carry.lastIndexOf('\n\n')
            if (boundary < 0) continue
            const complete = carry.slice(0, boundary + 2)
            carry = carry.slice(boundary + 2)
            const parsed = eventsFromSseChunk(complete)
            if (!parsed.length) continue
            lastEventId.current = parsed[parsed.length - 1].id
            setEvents((previous) => [...previous, ...parsed])
            for (const event of parsed) setState((previous) => applyPublicEvent(previous, event))
          }
        } catch (cause) {
          if (abort.signal.aborted) return
          setError(cause instanceof Error ? cause.message : 'Live party updates are reconnecting.')
        }
        setConnected(false)
        await reconnectDelay(abort.signal)
      }
    }

    void connect()
    return () => {
      abort.abort()
      setConnected(false)
    }
  }, [enabled, resolvedEventsPath])

  const sendAction = useCallback(async (action: PartyGameAction) => {
    setBusy(true)
    setError(null)
    try {
      const response = await apiPost<PartyGameActionResponse>(resolvedActionsPath, { action })
      if (response.state) setState(response.state)
      if (response.events?.length) {
        setEvents((previous) => [...previous, ...response.events!])
        lastEventId.current = response.events[response.events.length - 1].id
      }
      return response
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : 'Party action failed.'
      setError(message)
      throw cause
    } finally {
      setBusy(false)
    }
  }, [resolvedActionsPath])

  return {
    state,
    events,
    connected,
    busy,
    error,
    sendAction,
  }
}
