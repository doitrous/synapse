import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { API_MODE, apiPost } from '@/lib/api'
import { useIdentity } from '@/lib/useIdentity'
import { useRoomAudio, type RoomAudio } from './useRoomAudio'
import { useRoomChannel } from './useRoomChannel'
import type { RoomChannel } from './useRoomChannel'
import { useFocusSession, type FocusSessionController } from './useFocusSession'
import { worldForRoom } from './studyWorld'
import { loadActiveRoom, saveActiveRoom, sameRoom, type ActiveRoom } from './activeRoom'

/**
 * The study room, lifted out of the page so it can outlive it.
 *
 * The socket, the SFU call and the "I am still here" heartbeat used to be owned
 * by the Study Rooms page and were torn down the moment a student navigated
 * anywhere else. This provider owns them instead, mounted once above the router,
 * so a student who has joined a room stays in it — and, if they turned it on, in
 * its voice — while they move around the site. The page and the floating dock
 * are both just views onto this one live session.
 *
 * There is exactly one active room at a time: joining a second leaves the first,
 * which is what the single socket and the single microphone already required.
 */

export interface RoomSession {
  study: FocusSessionController
  /** The room the student is in, or null. Includes demo rooms (page-only, never persisted). */
  room: ActiveRoom | null
  /** The live socket for the active live room; null in demo mode and when idle. */
  channel: RoomChannel | null
  /** The voice/level session for the active room; null when idle. */
  audio: RoomAudio | null
  /** Join a room (leaving any current one). Persisted unless it is a demo room. */
  join(room: ActiveRoom): void
  /** Leave the room entirely: closes the socket, stops the microphone, clears the dock. */
  leave(): void
  /**
   * Whether the full room page is on screen for the active room.
   *
   * Set by the room page while it is mounted; the dock uses it to stay out of
   * the way — there is no point floating a summary over the room it summarises.
   */
  viewingFull: boolean
  setViewingFull(value: boolean): void
  /** The dock's own open/closed state, so it reads the same on every page. */
  dockExpanded: boolean
  setDockExpanded(value: boolean): void
}

const RoomSessionContext = createContext<RoomSession | null>(null)

/**
 * The provider mounts the room hooks unconditionally with the active room's
 * details, or with null when there is none. Both hooks already tolerate that:
 * `useRoomChannel(null)` is the demo/idle path and opens no socket, and
 * `useRoomAudio('', …, null)` sits idle until `join()` is called. Calling them
 * conditionally is what React forbids; feeding them null is not.
 */
export function RoomSessionProvider({ children }: { children: ReactNode }) {
  const identity = useIdentity()
  const selfId = identity.userId ?? 'self'
  const study = useFocusSession()

  // Rehydrate a live room once, at start, so a reload lands the student back in
  // the room rather than at the lobby. Voice is not auto-rejoined — a browser
  // will not open a microphone after a reload without a fresh gesture, and the
  // dock offers "Join voice" for exactly that.
  const [room, setRoom] = useState<ActiveRoom | null>(() => (API_MODE ? loadActiveRoom() : null))
  const [viewingFull, setViewingFull] = useState(false)
  const [dockExpanded, setDockExpanded] = useState(false)

  const isLive = Boolean(room && !room.demo)
  const channel = useRoomChannel(isLive ? room!.roomCode : null)
  const audio = useRoomAudio(room?.roomId ?? '', selfId, room ? (room.demo ? null : channel) : null)

  const roomRef = useRef(room)
  roomRef.current = room
  const release = (current: ActiveRoom | null) => {
    if (current && !current.demo && API_MODE) {
      void apiPost(`/parties/${encodeURIComponent(current.roomId)}/leave`).catch(() => undefined)
    }
  }
  const join = useCallback((next: ActiveRoom) => {
    if (sameRoom(roomRef.current, next)) return
    release(roomRef.current)
    roomRef.current = next
    saveActiveRoom(next)
    setRoom(next)
    setDockExpanded(false)
  }, [])

  const leave = useCallback(() => {
    release(roomRef.current)
    roomRef.current = null
    saveActiveRoom(null)
    setRoom(null)
    setViewingFull(false)
    setDockExpanded(false)
  }, [])

  // The room told us it is gone (archived or deleted), or the socket was
  // refused for good (not a member any more). Either way the membership is over,
  // so end the session rather than sit in a room that no longer holds a seat.
  useEffect(() => {
    if (!isLive) return
    if (channel.archived) { leave(); return }
    if (channel.status === 'closed' && !channel.retrying) leave()
  }, [isLive, channel.archived, channel.status, channel.retrying, leave])

  // "I am still here." Kept here rather than on the page so presence survives
  // navigation: a student reading a slide on another page is still in the room.
  // Activity is the honest available signal — recent input in this tab — and a
  // room the student has walked away from dims on the server's own window.
  const activeRef = useRef(Date.now())
  useEffect(() => {
    const mark = () => { activeRef.current = Date.now() }
    const events: Array<keyof WindowEventMap> = ['keydown', 'pointerdown', 'touchstart', 'scroll']
    for (const event of events) window.addEventListener(event, mark, { passive: true })
    return () => { for (const event of events) window.removeEventListener(event, mark) }
  }, [])
  useEffect(() => {
    if (!isLive || !API_MODE) return undefined
    const code = room!.roomCode
    const path = `/parties/${encodeURIComponent(code)}/heartbeat`
    const beat = () => {
      const activity = Date.now() - activeRef.current < 90_000 ? 'studying' : 'idle'
      void apiPost(path, { activity }).catch(() => undefined)
    }
    beat()
    const timer = window.setInterval(beat, 30_000)
    return () => window.clearInterval(timer)
  }, [isLive, room?.roomCode])

  const resetStudy = study.reset
  useEffect(() => { resetStudy(worldForRoom(room?.roomId ?? '').minutes) }, [room?.roomId, resetStudy])

  const value = useMemo<RoomSession>(() => ({
    room,
    study,
    channel: isLive ? channel : null,
    audio: room ? audio : null,
    join,
    leave,
    viewingFull,
    setViewingFull,
    dockExpanded,
    setDockExpanded,
  }), [room, study, isLive, channel, audio, join, leave, viewingFull, dockExpanded])

  return <RoomSessionContext.Provider value={value}>{children}</RoomSessionContext.Provider>
}

/**
 * The room session, or null when read outside the provider.
 *
 * Returns null rather than throwing so a surface that only *optionally* shows
 * the dock (a shell that also renders the admin portal, say) can ask without a
 * guard clause everywhere.
 */
export function useRoomSession(): RoomSession | null {
  return useContext(RoomSessionContext)
}
