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
import { API_MODE, apiPost } from '@/lib/api'
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
import { useRoomAudio } from '@/lib/rooms/useRoomAudio'
import { useRoomChannel } from '@/lib/rooms/useRoomChannel'
import { demoRoomById, demoRoomSeats } from '@/lib/rooms/demoRoom'
import { StudyHall } from './StudyHall'
import { RoomControls } from './RoomControls'
import { SeatCustomiser } from './SeatCustomiser'

/** How often the hall re-reads its own clock, so a seat dims when its 90 s runs out. */
const TICK_MS = 15_000

/**
 * How often this member tells the room they are still here.
 *
 * Thirty seconds against the server's two-minute window: three beats may be
 * lost — a tunnel, a sleeping laptop, one bad request — before anybody's hall
 * dims this desk.
 */
const HEARTBEAT_MS = 30_000

/**
 * Your own activity, measured the way `StudyActivityTracker` measures it.
 *
 * The server carries no per-member activity for a party, so the only honest
 * source for "is this person working" is the one machine that can see it. For
 * you, that is this browser; for everyone else it is a gap, and the room says
 * so rather than filling it in.
 */
function useSelfActivity(): number {
  const [lastActiveAt, setLastActiveAt] = useState(() => Date.now())
  useEffect(() => {
    // Coalesced to one write a second: the value is only ever compared against
    // a 90 second window, and a state update on every keystroke would re-render
    // twenty desks for nothing.
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
 *
 * The timeout used to be fired and forgotten, so leaving the room within
 * 1.6 seconds of copying the code set state on a component that had gone.
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
 * The scene is the new part; the sessions, the schedule, the games and the
 * permanent link underneath it are the existing `PartyPage`, mounted whole and
 * handed the party this component already polls — a study room *is* a study
 * party, and renaming it was never a reason to rebuild what it could already do,
 * nor to fetch it twice.
 */
export function RoomView({
  roomId,
  roomCode,
  onExit,
}: {
  roomId: string
  /** The code in the address bar, so the room is addressable and shareable. */
  roomCode: string
  onExit: () => void
}) {
  const t = useT()
  const identity = useIdentity()
  const demoRoom = demoRoomById(roomId)
  const demo = !API_MODE || Boolean(demoRoom)
  // The one read of this party in the whole screen; `PartyPage` is given the
  // result rather than polling it again.
  // The room's live connection. Presence, speaking and the SFU negotiation all
  // ride it; while it is open the four-second poll below stands down, because
  // everything it would ask for has already been pushed.
  const channel = useRoomChannel(demo ? null : roomCode)
  // Backgrounded rather than stopped while the socket is open: the socket
  // carries members, and only members. Whether the room was archived comes from
  // here, and a member of an archived room with the poll switched off keeps a
  // room that is closed but fully usable.
  const { party, error, reload } = useParty(demo ? null : roomId, { background: channel.connected })
  const [seat, setSeat] = useSeatPreference(demo ? null : roomCode)
  const [customising, setCustomising] = useState(false)
  const [copied, copy] = useCopyFlash()

  const selfId = identity.userId ?? 'self'
  const selfName = identity.displayName || t('You')
  const audio = useRoomAudio(roomId, selfId, demo ? null : channel)

  /**
   * The room told us it is gone.
   *
   * The socket closes with 4403 straight after, so the poll comes back to full
   * speed on its own; this only makes the party re-read happen now rather than
   * up to a minute later, so the archived state is on screen immediately.
   */
  useEffect(() => {
    if (!channel.archived) return
    void reload()
  }, [channel.archived, reload])
  const lastActiveAt = useSelfActivity()

  // The hall has to re-evaluate "studying" on a clock as well as on an event:
  // nobody typing for ninety seconds is exactly the case that has no event.
  const [tick, setTick] = useState(() => Date.now())
  useEffect(() => {
    const timer = window.setInterval(() => setTick(Date.now()), TICK_MS)
    return () => window.clearInterval(timer)
  }, [])
  const now = Math.max(tick, lastActiveAt)

  const roomName = demo ? demoRoom?.name ?? t('Study room') : party?.name ?? t('Study room')
  const code = demo ? demoRoom?.code ?? roomCode : party?.code ?? roomCode
  const capacity = demo ? demoRoom?.capacity ?? ROOM_CAPACITY : ROOM_CAPACITY

  /**
   * Who is in the room, from the socket when it is open and from the poll when
   * it is not.
   *
   * The socket's list is preferred because it is the newer of the two by
   * definition — it is pushed the moment anything changes — but the polled
   * party is kept as the fallback so a room whose connection dropped still
   * shows the people in it rather than emptying.
   */
  const members: PartyMember[] = useMemo(
    () => (channel.members as PartyMember[] | null) ?? party?.members ?? [],
    [channel.members, party?.members],
  )

  const occupants = useMemo<SeatOccupant[]>(() => {
    if (demo) {
      return demoRoomSeats(
        { id: selfId, name: selfName, seat, lastActiveAt },
        now,
        audio.speaking,
      )
    }
    return members.map((member) => {
      const isSelf = member.userId === selfId
      return {
        id: member.userId,
        name: member.displayName || t('Student'),
        // Your own furniture is the preference in this browser, which is
        // already correct before the round trip that stores it; everyone
        // else's is whatever the room says, normalised so an unchosen piece
        // draws as the default rather than as a hole.
        seat: isSelf ? seat : normalizeSeat(member.seat ?? undefined),
        studying: isSelf
          ? isStudying(lastActiveAt, now)
          : member.activity === 'studying' && isStudying(member.lastActiveAt, now, MEMBER_ACTIVE_WINDOW_MS),
        speaking: audio.speaking.has(member.userId),
        seatIndex: member.seat?.seatIndex ?? null,
      }
    })
  }, [demo, members, selfId, selfName, seat, lastActiveAt, now, audio.speaking, t])

  /** The room desk by desk, so a classmate stays at their own desk as people come and go. */
  const desks = useMemo(() => placeSeats(occupants, capacity), [occupants, capacity])

  /**
   * "I am still here, and this is what I am doing."
   *
   * Studying is measured the way the hall already measures it — recent input in
   * this tab — rather than from whether a runner is open, because the runner
   * lives above this component and the room cannot see it. It is the honest
   * available signal: a student reading a slide is studying, and one who has
   * touched nothing for ninety seconds has walked away whatever is on screen.
   *
   * Re-running on `activity` is deliberate: a change of state should reach the
   * room now, not at the end of the current thirty seconds.
   */
  const activity = isStudying(lastActiveAt, now) ? 'studying' : 'idle'
  useEffect(() => {
    if (demo || !API_MODE || !roomCode) return undefined
    const path = `/parties/${encodeURIComponent(roomCode)}/heartbeat`
    const beat = () => { void apiPost(path, { activity }).catch(() => undefined) }
    beat()
    const timer = window.setInterval(beat, HEARTBEAT_MS)
    return () => window.clearInterval(timer)
  }, [demo, roomCode, activity])

  const link = code ? `${window.location.origin}/app/study-rooms?room=${code}` : ''

  if (!demo && error) {
    return (
      <Panel className="p-8 text-center">
        <p className="text-[13.5px] text-ink-2">{error}</p>
        <Button className="mt-4" variant="secondary" iconLeft={ArrowLeft} onClick={onExit}>
          {t('Back to Study Rooms')}
        </Button>
      </Panel>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" size="sm" iconLeft={ArrowLeft} onClick={onExit}>
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
                : channel.connected
                  ? t('Everyone here is live: their desk, their furniture and whether they are working. Your own desk is the one with the crimson cushion — click it to change your furniture.')
                  : channel.retrying
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
          onLeave={onExit}
          leaveLabel={t('Leave room')}
        />
      </div>

      {/* Everything a study party could already do, unchanged — and reading the
          party this component already polled. */}
      {demo ? (
        <DemoPartiesPreview />
      ) : party ? (
        <PartyPage partyId={roomId} party={party} onReload={reload} onExit={onExit} />
      ) : (
        <Panel className="p-10 text-center text-[13px] text-ink-3">{t('Loading the room…')}</Panel>
      )}

      {customising && (
        <SeatCustomiser seat={seat} onSave={setSeat} onClose={() => setCustomising(false)} />
      )}
    </div>
  )
}
