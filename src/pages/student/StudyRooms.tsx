import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { HubPage, HubStat } from '@/components/hub'
import { RoomLobby, type RoomAddress } from '@/components/rooms/RoomLobby'
import { RoomView } from '@/components/rooms/RoomView'
import { PARTY_REFUSALS, usePartyActions } from '@/lib/useParties'
import { API_MODE } from '@/lib/api'
import { ROOM_CAPACITY } from '@/lib/rooms/roomPresence'
import { demoRoomByCode } from '@/lib/rooms/demoRoom'
import { useT } from '@/lib/i18n'

/** The canonical param. `?party=` is the same thing under the name it had before the rename. */
const ROOM_PARAM = 'room'
const LEGACY_PARAM = 'party'

/**
 * Study Rooms — the page a student lands on from the sidebar, and the one the
 * old `/app/study-together` link now redirects to.
 *
 * **The open room lives in the URL.** `/app/study-rooms?room=KTP0R2` is the
 * room: it survives a reload, it goes in the browser's history so Back walks
 * out of the hall rather than off the page, and it is the thing a student
 * pastes into the group chat. Holding it in component state instead — which
 * this page did first — meant the only way to send someone a room was to tell
 * them which buttons to press.
 *
 * The code is the address, not the id: a party id is a database key nobody can
 * read aloud, and the code is already what the Join field takes and what every
 * link minted before the rename carried. `?party=` is accepted as an alias and
 * quietly rewritten, so links already sent keep working.
 */
export function StudyRooms() {
  const t = useT()
  const [params, setParams] = useSearchParams()
  const { join } = usePartyActions()
  const [message, setMessage] = useState('')

  const requested = (params.get(ROOM_PARAM) ?? params.get(LEGACY_PARAM) ?? '').trim().toUpperCase()

  /*
   * The URL says which room is open; this only remembers what a code resolved
   * to, because the hall needs the party id and the address bar carries the
   * code. Keeping "a room is open" as its own state as well made the two fight:
   * `setParams` lands a commit after `setState`, so an effect syncing state to
   * the param would see an empty param beside a set room and close it again.
   * One source of truth, one cache, and nothing to reconcile.
   */
  const [resolved, setResolved] = useState<RoomAddress | null>(null)
  const openRoom = requested && resolved?.code === requested ? resolved : null

  /** Put a room in the address bar, as a real navigation so Back leaves it. */
  const enter = useCallback((room: RoomAddress) => {
    setResolved(room)
    setParams((current) => {
      const next = new URLSearchParams(current)
      next.set(ROOM_PARAM, room.code)
      next.delete(LEGACY_PARAM)
      return next
    })
  }, [setParams])

  const exit = useCallback(() => {
    setResolved(null)
    setMessage('')
    setParams((current) => {
      const next = new URLSearchParams(current)
      next.delete(ROOM_PARAM)
      next.delete(LEGACY_PARAM)
      return next
    })
  }, [setParams])

  /**
   * Turn the code in the address bar into a room, once per code.
   *
   * Guarded by a ref rather than by the param, because resolving ends in a
   * `setParams` that re-renders this effect before the URL change has landed,
   * which would otherwise spend the same code twice. In live mode the
   * redemption *is* the join, which is how a shared link seats a student who
   * was never in the room; in demo mode the code is looked up in the seeded
   * list, so a demo link opens the hall instead of being swallowed.
   */
  const resolving = useRef<string | null>(null)
  useEffect(() => {
    if (!requested) {
      resolving.current = null
      return
    }
    if (resolved?.code === requested || resolving.current === requested) return
    resolving.current = requested

    void (async () => {
      let found: RoomAddress | null = null
      let refusal = ''

      if (!API_MODE) {
        const demo = demoRoomByCode(requested)
        if (demo) found = { id: demo.id, code: demo.code }
        else refusal = t('No room has that code.')
      } else {
        const result = await join(requested)
        if (result?.ok && result.party) found = { id: result.party.id, code: result.party.code }
        else refusal = PARTY_REFUSALS[result?.reason ?? ''] ?? t('That did not work. Try again.')
      }

      if (found) {
        setResolved(found)
        setMessage('')
        // Normalise `?party=` to `?room=` without adding a history entry: the
        // student did not navigate, the link they followed was simply older.
        setParams((current) => {
          if (current.get(ROOM_PARAM) === found.code && !current.has(LEGACY_PARAM)) return current
          const next = new URLSearchParams(current)
          next.set(ROOM_PARAM, found.code)
          next.delete(LEGACY_PARAM)
          return next
        }, { replace: true })
        return
      }

      setMessage(refusal)
      setResolved(null)
      setParams((current) => {
        const next = new URLSearchParams(current)
        next.delete(ROOM_PARAM)
        next.delete(LEGACY_PARAM)
        return next
      }, { replace: true })
    })()
  }, [requested, resolved, setParams, join, t])

  return (
    <HubPage
      eyebrow="STUDY ROOMS"
      title="Study Rooms"
      lede="Sit with your cohort. Up to 20 to a room."
      aside={
        <>
          <HubStat label="Seats to a room" value={String(ROOM_CAPACITY)} sub="four rows of five" />
          <span className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 text-[13px] text-ink-2 shadow-control">
            <span className="size-2 rounded-full bg-ink-3" aria-hidden />
            {t('Voice not connected yet')}
          </span>
        </>
      }
    >
      {/* Rendered unconditionally so the live region exists before it has
          anything to say — a status inserted with its text often goes unread. */}
      <p role="status" className="mb-3 text-[12.5px] text-danger">{message}</p>

      {openRoom ? (
        <RoomView roomId={openRoom.id} roomCode={openRoom.code} onExit={exit} />
      ) : (
        <RoomLobby onEnter={enter} />
      )}
    </HubPage>
  )
}
