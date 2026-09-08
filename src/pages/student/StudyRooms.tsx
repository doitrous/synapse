import { RoomInvitation } from '@/components/rooms/RoomInvitation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { HubPage } from '@/components/hub'
import { PageContainer } from '@/components/shell/Page'
import { RoomLobby, type RoomAddress } from '@/components/rooms/RoomLobby'
import { RoomView } from '@/components/rooms/RoomView'
import { PARTY_REFUSALS, usePartyActions } from '@/lib/useParties'
import { API_MODE } from '@/lib/api'
import { useRoomSession } from '@/lib/rooms/RoomSessionProvider'
import { demoRoomByCode } from '@/lib/rooms/demoRoom'
import { useT } from '@/lib/i18n'

/** The canonical param. `?party=` is the same thing under the name it had before the rename. */
const ROOM_PARAM = 'room'
const LEGACY_PARAM = 'party'

/**
 * Study Rooms — the page a student lands on from the sidebar, and the one the
 * old `/app/study-together` link now redirects to.
 *
 * **The open room lives in two places, on purpose.** The *membership* lives in
 * `RoomSessionProvider`, above the router, so it survives navigation and reload
 * and can be shown by the floating dock on every page. The *address bar* says
 * only whether the full hall is currently on screen: `?room=KTP0R2` opens the
 * hall; an empty bar minimises it to the dock. Removing the param no longer
 * leaves the room — that is what "Leave" is for — it just closes the big view,
 * which is what "Back" and browsing away should do now that the room follows
 * the student around.
 *
 * The code is the address, not the id: a party id is a database key nobody can
 * read aloud, and the code is what the Join field takes and what every shared
 * link carries. `?party=` is accepted as an alias and quietly rewritten.
 */
export function StudyRooms() {
  const t = useT()
  const [params, setParams] = useSearchParams()
  const { join } = usePartyActions()
  const session = useRoomSession()
  const [message, setMessage] = useState('')
  const suppressedCode = useRef<string | null>(null)
  const latestRequested = useRef('')

  const requested = (params.get(ROOM_PARAM) ?? params.get(LEGACY_PARAM) ?? '').trim().toUpperCase()
  latestRequested.current = requested
  const active = session?.room ?? null
  // The full hall is open when the address bar names the room the session is in.
  const openRoom = Boolean(active && requested && active.roomCode.toUpperCase() === requested)

  /** Put a room in the address bar, as a real navigation so Back leaves the hall. */
  const enter = useCallback((room: RoomAddress) => {
    suppressedCode.current = null
    session?.join({ roomId: room.id, roomCode: room.code, roomName: room.name, demo: room.demo ?? !API_MODE })
    setParams((current) => {
      const next = new URLSearchParams(current)
      next.set(ROOM_PARAM, room.code)
      next.delete(LEGACY_PARAM)
      return next
    })
  }, [session, setParams])

  /** Minimise: close the hall but stay in the room. The dock takes over. */
  const minimise = useCallback(() => {
    // Membership updates can commit before Router's navigation transition.
    // Do not redeem the old URL again while it is being removed.
    suppressedCode.current = requested
    setMessage('')
    setParams((current) => {
      const next = new URLSearchParams(current)
      next.delete(ROOM_PARAM)
      next.delete(LEGACY_PARAM)
      return next
    })
  }, [setParams, requested])

  /** Leave for good: end the session, then close the hall. */
  const leaveRoom = useCallback(() => {
    session?.leave()
    minimise()
  }, [session, minimise])

  /**
   * Turn the code in the address bar into a joined room, once per code.
   *
   * Skipped entirely when the session is already in the requested room — a
   * reload rehydrates the membership, and "Open the room" from the dock is a
   * navigation, not a re-join. Otherwise, in live mode the redemption *is* the
   * join, which is how a shared link seats a student who was never in the room;
   * in demo mode the code is looked up in the seeded list.
   */
  const resolving = useRef<string | null>(null)
  useEffect(() => {
    if (!requested || !session) {
      suppressedCode.current = null
      resolving.current = null
      return
    }
    if (suppressedCode.current === requested) return
    if ((active && active.roomCode.toUpperCase() === requested) || resolving.current === requested) return
    resolving.current = requested

    void (async () => {
      let found: { id: string; code: string; name?: string; demo?: boolean } | null = null
      let refusal = ''

      const previewRoom = demoRoomByCode(requested)
      if (!API_MODE || previewRoom?.id.startsWith('world-')) {
        const demo = previewRoom
        if (demo) found = { id: demo.id, code: demo.code, name: demo.name, demo: true }
        else refusal = t('No room has that code.')
      } else {
        const result = await join(requested)
        if (result?.ok && result.party) found = { id: result.party.id, code: result.party.code, name: result.party.name }
        else refusal = PARTY_REFUSALS[result?.reason ?? ''] ?? t('That did not work. Try again.')
      }

      if (latestRequested.current !== requested || suppressedCode.current === requested) return

      if (found) {
        setMessage('')
        session.join({ roomId: found.id, roomCode: found.code, roomName: found.name, demo: found.demo })
        // Normalise `?party=` to `?room=` without a history entry: the student
        // did not navigate, the link they followed was simply older.
        setParams((current) => {
          if (current.get(ROOM_PARAM) === found!.code && !current.has(LEGACY_PARAM)) return current
          const next = new URLSearchParams(current)
          next.set(ROOM_PARAM, found!.code)
          next.delete(LEGACY_PARAM)
          return next
        }, { replace: true })
        return
      }

      setMessage(refusal)
      setParams((current) => {
        const next = new URLSearchParams(current)
        next.delete(ROOM_PARAM)
        next.delete(LEGACY_PARAM)
        return next
      }, { replace: true })
    })()
  }, [requested, active, session, setParams, join, t])

  const invitationId=params.get('invitation')
  const invitation=invitationId?<RoomInvitation id={invitationId} onClose={()=>setParams(current=>{const next=new URLSearchParams(current);next.delete('invitation');return next})} onAccept={(party,seatIndex)=>{enter({id:party.id,code:party.code,name:party.name});setParams({room:party.code});if(seatIndex!==null)session?.study.patch({seatIndex})}}/>:null
  if(openRoom)return <>{invitation} <PageContainer className="study-room-page"><RoomView key={active?.roomId} onMinimise={minimise} onLeave={leaveRoom}/></PageContainer></>

  return (
    <HubPage
      eyebrow="STUDY ROOMS"
      title="Study Rooms"
    >
      {/* Rendered unconditionally so the live region exists before it has
          anything to say — a status inserted with its text often goes unread. */}
      <p role="status" className="mb-3 text-[12.5px] text-danger">{message}</p>

      {invitation}<RoomLobby onEnter={enter} />
    </HubPage>
  )
}
