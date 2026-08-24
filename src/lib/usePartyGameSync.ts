import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { apiPost } from '@/lib/api'
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
    if (!enabled || typeof EventSource === 'undefined') return undefined
    const stream = new EventSource(resolvedEventsPath)
    stream.onopen = () => {
      setConnected(true)
      setError(null)
    }
    stream.onerror = () => {
      setConnected(false)
      setError('Live party updates are reconnecting.')
    }
    stream.onmessage = (message) => {
      try {
        const event = JSON.parse(message.data) as PublicPartyGameEvent
        lastEventId.current = message.lastEventId || event.id
        setEvents((previous) => [...previous, event])
        setState((previous) => applyPublicEvent(previous, event))
      } catch {
        setError('A party update could not be read.')
      }
    }
    return () => {
      stream.close()
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
