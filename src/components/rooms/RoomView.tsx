import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, Check, Copy, Hash, Info, Link2 } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { PartyPage } from '@/components/social/PartyPage'
import { DemoPartiesPreview } from '@/components/social/DemoCollaborationPreview'
import { useParty, type PartyMember } from '@/lib/useParties'
import { useIdentity } from '@/lib/useIdentity'
import { API_MODE } from '@/lib/api'
import { useT } from '@/lib/i18n'
import {
  MEMBER_ACTIVE_WINDOW_MS,
  ROOM_CAPACITY,
  isStudying,
  normalizeSeat,
  placeSeats,
  type SeatOccupant,
} from '@/lib/rooms/roomPresence'
import { useSeatPreference } from '@/lib/rooms/useSeatPreference'
import { useRoomSession } from '@/lib/rooms/RoomSessionProvider'
import { demoRoomById, demoRoomSeats } from '@/lib/rooms/demoRoom'
import { StudyHall } from './StudyHall'
import { RoomControls } from './RoomControls'
import { SeatCustomiser } from './SeatCustomiser'

/** How often the hall re-reads its own clock, so a seat dims when its 90 s runs out. */
const TICK_MS = 15_000

/** One shared empty set, so "nobody is speaking" is a stable value the memo can trust. */
const NO_SPEAKING = new Set<string>()

/**
 * Your own activity, measured the way `StudyActivityTracker` measures it.
 *
 * Used only for how the hall draws *your* desk. The room-wide heartbeat lives in
 * `RoomSessionProvider` now, so presence keeps beating while you are on another
 * page; this is the display-only half that the open hall still needs.
 */
function useSelfActivity(): number {
  const [lastActiveAt, setLastActiveAt] = useState(() => Date.now())
  useEffect(() => {
    let pending = 0
    const mark = () => {
      const now = Date.now()
      if (now - pending < 1_000) return
      pending = now
      setLastActiveAt(now)
    }
    const events: Array<keyof WindowEventMap> = ['keydown', 'pointerdown', 'touchstart', 'scroll']
    for (const event of events) window.addEventListener(event, mark, { passive: true })
    return () => { for (const event of events) window.removeEventListener(event, mark) }
  }, [])
  return lastActiveAt
}

/**
 * A copy button's "Copied" flash, cleared if the room closes under it.
 */
function useCopyFlash(): [('code' | 'link') | null, (value: string, kind: 'code' | 'link') => void] {
  const [copied, setCopied] = useState<'code' | 'link' | null>(null)
  const timer = useRef(0)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const copy = (value: string, kind: 'code' | 'link') => {
    void navigator.clipboard?.writeText(value)
    setCopied(kind)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(null), 1600)
  }
  return [copied, copy]
}

/**
 * Inside a room: the hall, who is in it, and everything the party already knew
 * how to do.
 *
 * The live room — its socket, its call, its heartbeat — is owned by
 * `RoomSessionProvider` and reached through `useRoomSession`, so this page is a
 * *view* of the room rather than its owner. That is what lets the room survive
 * the page: closing this view (Back / Minimise) leaves the session running and
 * hands it to the dock, while "Leave" ends it. The party, the seat furniture and
 * the schedule below are still the page's own, read the way they always were.
 */
export function RoomView({
  onMinimise,
  onLeave,
}: {
  /** Close the hall but stay in the room — the dock takes over. */
  onMinimise: () => void
  /** Leave the room for good: ends the session. */
  onLeave: () => void
}) {
  const t = useT()
  const identity = useIdentity()
  const session = useRoomSession()

  // The full view marks itself present so the dock stays out of the way while
  // the hall it summarises is on screen.
  const setViewingFull = session?.setViewingFull
  useEffect(() => {
    setViewingFull?.(true)
    return () => setViewingFull?.(false)
  }, [setViewingFull])

  const room = session?.room ?? null
  const demo = Boolean(room?.demo) || !API_MODE
  const roomId = room?.roomId ?? ''
  const roomCode = room?.roomCode ?? ''
  const demoRoom = demoRoomById(roomId)

  const channel = session?.channel ?? null
  const audio = session?.audio ?? null

  const { party, error, reload } = useParty(demo ? null : roomId, { background: channel?.connected ?? false })
  const [seat, setSeat] = useSeatPreference(demo ? null : roomCode)
  const [customising, setCustomising] = useState(false)
  const [copied, copy] = useCopyFlash()

  const selfId = identity.userId ?? 'self'
  const selfName = identity.displayName || t('You')

  // The room told us it is gone; re-read the party now rather than on the poll.
  const archived = channel?.archived ?? false
  useEffect(() => {
    if (!archived) return
    void reload()
  }, [archived, reload])

  const lastActiveAt = useSelfActivity()
  const [tick, setTick] = useState(() => Date.now())
  useEffect(() => {
    const timer = window.setInterval(() => setTick(Date.now()), TICK_MS)
    return () => window.clearInterval(timer)
  }, [])
  const now = Math.max(tick, lastActiveAt)

  const roomName = demo ? demoRoom?.name ?? room?.roomName ?? t('Study room') : party?.name ?? room?.roomName ?? t('Study room')
  const code = demo ? demoRoom?.code ?? roomCode : party?.code ?? roomCode
  const capacity = demo ? demoRoom?.capacity ?? ROOM_CAPACITY : ROOM_CAPACITY

  const speaking = audio?.speaking ?? NO_SPEAKING

  const members: PartyMember[] = useMemo(
    () => (channel?.members as PartyMember[] | null) ?? party?.members ?? [],
    [channel?.members, party?.members],
  )

  const occupants = useMemo<SeatOccupant[]>(() => {
    if (demo) {
      return demoRoomSeats(
        { id: selfId, name: selfName, seat, lastActiveAt },
        now,
        speaking,
      )
    }
    return members.map((member) => {
      const isSelf = member.userId === selfId
      return {
        id: member.userId,
        name: member.displayName || t('Student'),
        seat: isSelf ? seat : normalizeSeat(member.seat ?? undefined),
        studying: isSelf
          ? isStudying(lastActiveAt, now)
          : member.activity === 'studying' && isStudying(member.lastActiveAt, now, MEMBER_ACTIVE_WINDOW_MS),
        speaking: speaking.has(member.userId),
        seatIndex: member.seat?.seatIndex ?? null,
      }
    })
  }, [demo, members, selfId, selfName, seat, lastActiveAt, now, speaking, t])

  const desks = useMemo(() => placeSeats(occupants, capacity), [occupants, capacity])

  const link = code ? `${window.location.origin}/app/study-rooms?room=${code}` : ''

  if (!room || !audio) {
    return (
      <Panel className="p-8 text-center">
        <p className="text-[13.5px] text-ink-2">{t('Loading the room…')}</p>
      </Panel>
    )
  }

  if (!demo && error) {
    return (
      <Panel className="p-8 text-center">
        <p className="text-[13.5px] text-ink-2">{error}</p>
        <Button className="mt-4" variant="secondary" iconLeft={ArrowLeft} onClick={onMinimise}>
          {t('Back to Study Rooms')}
        </Button>
      </Panel>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" size="sm" iconLeft={ArrowLeft} onClick={onMinimise}>
          {t('Back to Study Rooms')}
        </Button>
        <div className="flex flex-wrap items-center gap-2">
          {demo && <Badge tone="primary" dot>{t('Demo room')}</Badge>}
          <span className="tnum rounded-lg border border-line bg-surface-2 px-3 py-1.5 font-mono text-[14px] font-semibold tracking-[0.18em] text-ink">
            {code || '—'}
          </span>
          <Button size="sm" variant="secondary" iconLeft={copied === 'code' ? Check : Copy} disabled={!code} onClick={() => copy(code, 'code')}>
            {copied === 'code' ? t('Copied') : t('Copy code')}
          </Button>
          <Button size="sm" variant="ghost" iconLeft={copied === 'link' ? Check : Link2} disabled={!link} onClick={() => copy(link, 'link')}>
            {copied === 'link' ? t('Copied') : t('Copy link')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.62fr)]">
        <Panel className="overflow-hidden">
          <PanelHeader
            title={roomName}
            icon={Hash}
            hint={`${occupants.length} / ${capacity} ${t('seated')}`}
          />
          <div className="p-3 sm:p-4">
            <StudyHall
              seats={desks}
              selfId={selfId}
              capacity={capacity}
              onSeatClick={() => setCustomising(true)}
            />
            <p className="mt-3 flex items-start gap-2 text-[12px] leading-relaxed text-ink-3">
              <Icon icon={Info} size={14} className="mt-0.5" />
              {demo
                ? t('A seeded room, so the scene has someone in it. Your own desk is the one with the crimson cushion — click it to change your furniture.')
                : channel?.connected
                  ? t('Everyone here is live: their desk, their furniture and whether they are working. Your own desk is the one with the crimson cushion — click it to change your furniture.')
                  : channel?.retrying
                    ? t('Reconnecting to the room. Seats and activity are the last thing the room said.')
                    : t('Live updates are not available here, so the room is re-read every few seconds instead.')}
            </p>
          </div>
        </Panel>

        <RoomControls
          audio={audio}
          occupants={occupants}
          selfId={selfId}
          onCustomise={() => setCustomising(true)}
          onLeave={onLeave}
          leaveLabel={t('Leave room')}
        />
      </div>

      {/* Everything a study party could already do, unchanged. */}
      {demo ? (
        <DemoPartiesPreview />
      ) : party ? (
        <PartyPage partyId={roomId} party={party} onReload={reload} onExit={onLeave} />
      ) : (
        <Panel className="p-10 text-center text-[13px] text-ink-3">{t('Loading the room…')}</Panel>
      )}

      {customising && (
        <SeatCustomiser seat={seat} onSave={setSeat} onClose={() => setCustomising(false)} />
      )}
    </div>
  )
}
