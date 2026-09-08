import { Dialog } from '@/components/ui/Dialog'
import { STUDY_WORLDS } from '@/lib/rooms/studyWorld'
import { useFriends } from '@/lib/useFriends'
import { useCallback, useState, type ReactNode } from 'react'
import { ArrowLeft, DoorOpen, Globe, LogIn, Plus, Users } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { RoomCardsSkeleton } from '@/components/loading/PageSkeleton'
import { LoadingRegion } from '@/components/loading/SkeletonParts'
import { Field, Select, TextInput } from '@/components/ui/Field'
import { PARTY_REFUSALS, useMyParties, useOpenParties, usePartyActions } from '@/lib/useParties'
import { API_MODE,apiPost } from '@/lib/api'
import { useOnlineStatus } from '@/lib/useOnlineStatus'
import { useT } from '@/lib/i18n'
import { ROOM_CAPACITY } from '@/lib/rooms/roomPresence'
import { DEMO_OPEN_ROOMS, DEMO_ROOM_SUMMARY, demoRoomByCode } from '@/lib/rooms/demoRoom'
import { ChallengeRunner } from '@/components/social/ChallengeRunner'
import { WorldChooser } from './WorldChooser'
import { RoomCard } from './RoomCard'
import { SharedTestRunner } from './SharedTestRunner'
import { FriendsSection } from './SocialSections'

/** What entering a room needs: the id to read it by, and the code to address it by. */
export interface RoomAddress {
  id: string
  code: string
  /** The room's name when the lobby already knows it — lets the dock label it before the party re-fetches. */
  name?: string
  /** A seeded demo room, so the session opens no socket and never persists it. */
  demo?: boolean
}

function fallbackRefusal(t: (s: string) => string): string {
  return t('That did not work. Try again.')
}

/**
 * A pasted room link carries its code in `?room=` — or, from a link sent before
 * the rename, in `?party=`. Both are accepted, and so is a bare code, because a
 * student should not have to know which of the three they were handed.
 */
function extractCode(input: string): string {
  const trimmed = input.trim()
  try {
    const url = new URL(trimmed)
    return url.searchParams.get('room') ?? url.searchParams.get('party') ?? trimmed
  } catch {
    return trimmed
  }
}

/**
 * A runner — a shared test, a challenge — standing in for the lobby.
 *
 * It replaces the lobby rather than opening underneath it. Both runners used to
 * render inside their own collapsed section at the bottom of a page that still
 * showed Your rooms, Open rooms, Join and Create above them, so starting a test
 * looked like nothing had happened. A sitting is a screen, not a panel.
 */
function RunnerFrame({ onBack, children }: { onBack: () => void; children: ReactNode }) {
  const t = useT()
  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" iconLeft={ArrowLeft} onClick={onBack}>
        {t('Back to Study Rooms')}
      </Button>
      {children}
    </div>
  )
}

/**
 * The way in: join with a code, open a room of your own, or walk into one your
 * year has left open.
 *
 * Underneath sit the two surfaces the old Study Together page owned — shared
 * tests and friends — demoted to secondary sections rather than dropped. They
 * are the same components, wired the same way; only their prominence changed,
 * because a room you can sit in is the point of this page and a friend request
 * is not. What they *open*, though, takes the whole screen: see `RunnerFrame`.
 */
export function RoomLobby({ onEnter }: { onEnter: (room: RoomAddress) => void }) {
  const t = useT()
  const online = useOnlineStatus()
  const { parties, loading: loadingMine, reload: reloadMine } = useMyParties()
  const { parties: openParties, loading: loadingOpen, reload: reloadOpen } = useOpenParties()
  const { create, join } = usePartyActions()

  const {friends}=useFriends()
  const [creating,setCreating]=useState(false)
  const [layoutKey,setLayoutKey]=useState('campus')
  const [globalAudience,setGlobalAudience]=useState<'global'|'university'>('global')
  const [scope,setScope]=useState<'cohort'|'university'|'global'>('cohort')
  const [visibility,setVisibilityChoice]=useState<'open'|'invite'>('open')
  const [inviteFriend,setInviteFriend]=useState('')
  const [inviteRoom,setInviteRoom]=useState('')
  const [name, setName] = useState('')
  const [joinInput, setJoinInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [openSharedTestId, setOpenSharedTestId] = useState<string | null>(null)
  const [openChallengeId, setOpenChallengeId] = useState<string | null>(null)

  const reloadAll = useCallback(async () => {
    await Promise.all([reloadMine(), reloadOpen()])
  }, [reloadMine, reloadOpen])

  async function createRoom() {
    setBusy(true)
    setMessage('')
    if(!API_MODE){const world=STUDY_WORLDS.find(w=>w.style===layoutKey)!;setBusy(false);setCreating(false);onEnter({id:world.id,code:world.code,name:world.name,demo:true});return}
    try {
      const result = await create(name.trim() || t('Study room'),{layoutKey,scope,visibility})
      if (!result.ok) { setMessage(PARTY_REFUSALS[result.reason ?? ''] ?? fallbackRefusal(t)); return }
      setName('')
      setCreating(false)
      await reloadAll()
      onEnter({ id: result.party!.id, code: result.party!.code, name: result.party!.name })
    } catch { setMessage(t('Check your connection and try again.')) }
    finally { setBusy(false) }
  }

  async function joinAndEnter(raw: string) {
    const code = extractCode(raw)
    if (!code) return
    if (!API_MODE) {
      const room = demoRoomByCode(code)
      if (room) { setJoinInput(''); onEnter({...room, demo:true}) }
      else setMessage(t('No preview room has that code. Choose a room below.'))
      return
    }
    setBusy(true)
    setMessage('')
    try {
      const result = await join(code)
      if (!result.ok) { setMessage(PARTY_REFUSALS[result.reason ?? ''] ?? fallbackRefusal(t)); return }
      setJoinInput('')
      await reloadAll()
      onEnter({ id: result.party!.id, code: result.party!.code, name: result.party!.name })
    } catch { setMessage(t('Check your connection and try again.')) }
    finally { setBusy(false) }
  }

  if (openSharedTestId) {
    return (
      <RunnerFrame onBack={() => setOpenSharedTestId(null)}>
        <SharedTestRunner roomId={openSharedTestId} onExit={() => setOpenSharedTestId(null)} />
      </RunnerFrame>
    )
  }

  if (openChallengeId) {
    return (
      <RunnerFrame onBack={() => setOpenChallengeId(null)}>
        <ChallengeRunner challengeId={openChallengeId} onExit={() => setOpenChallengeId(null)} />
      </RunnerFrame>
    )
  }

  const mine = API_MODE
    ? parties.filter((party) => party.archivedAt === null).map((party) => ({
      id: party.id, code: party.code, name: party.name, members: party.members,
      capacity: party.capacity??ROOM_CAPACITY, scope:party.scope??'cohort', layoutKey:party.layoutKey, mine: true,
    }))
    : [DEMO_ROOM_SUMMARY]

  const open = API_MODE
    ? openParties.map((party) => ({
      id: party.id, code: party.code, name: party.name, members: party.members,
      capacity: party.capacity??ROOM_CAPACITY, scope:party.scope??'cohort', layoutKey:party.layoutKey, mine: false,
    }))
    : [...DEMO_OPEN_ROOMS]

  async function sendInvite(){
    if(!inviteFriend||!inviteRoom)return
    setBusy(true)
    try{const result=await apiPost<{ok:boolean;reason?:string}>(`/parties/${encodeURIComponent(inviteRoom)}/invitations`,{recipientId:inviteFriend,scope:'room'});setMessage(t(result.ok?'Invitation sent to your friend’s notifications.':result.reason==='wrong_cohort'?'Choose a global room to invite a friend from another university or year.':'Could not send the invitation. Try again shortly.'))}catch{setMessage(t('Check your connection and try again.'))}finally{setBusy(false)}
  }
  const global=open.filter(room=>'scope' in room&&room.scope===globalAudience)
  const university=open.filter(room=>!('scope' in room)||room.scope==='cohort')
  return <div className="room-discovery">
    <div className="room-discovery-main">
      <header className="room-discovery-heading"><div><h2 className="font-serif text-2xl">{t('Available rooms')}</h2></div><Button variant="primary" iconLeft={Plus} onClick={()=>setCreating(true)}>{t('Create a new room')}</Button></header>
      <form className="room-code-form" onSubmit={e=>{e.preventDefault();void joinAndEnter(joinInput)}}><label htmlFor="room-code">{t('Have a room code?')}</label><TextInput id="room-code" value={joinInput} onChange={e=>setJoinInput(e.target.value)} placeholder={t('Code or invitation link')}/><Button iconLeft={LogIn} disabled={busy||!joinInput.trim()||(API_MODE&&!online)} type="submit">{t('Join room')}</Button></form>
      {message&&<p className="text-sm text-ink-2" role="status">{message}</p>}
      <section aria-label={t('Your rooms')}><PanelHeader title={t('Your rooms')} icon={Users} hint={String(mine.length)}/>{loadingMine?<LoadingRegion><RoomCardsSkeleton /></LoadingRegion>:mine.length?<div className="room-live-cards">{mine.map(room=><RoomCard key={room.id} {...room} busy={busy} onEnter={()=>onEnter(room)}/>)}</div>:<EmptyState icon={DoorOpen} title={t('Your next study space starts here')} description={t('Create a room or join one below. It will stay here for your next session.')}/>}</section>
      <section aria-label={t('Global rooms')}><PanelHeader title={t('Global rooms')} icon={Globe} hint={t(globalAudience==='global'?'Open across all universities':'Your university, every year')}/><div className="room-audience-choice" role="group" aria-label={t('Room audience')}><button aria-pressed={globalAudience==='global'} onClick={()=>setGlobalAudience('global')}>{t('All universities')}</button><button aria-pressed={globalAudience==='university'} onClick={()=>setGlobalAudience('university')}>{t('My university · all years')}</button></div>{loadingOpen?<LoadingRegion><RoomCardsSkeleton /></LoadingRegion>:global.length?<div className="room-live-cards">{global.map(room=><RoomCard key={room.id} {...room} busy={busy} onEnter={()=>void joinAndEnter(room.code)}/>)}</div>:<p className="py-4 text-sm text-ink-2">{t(API_MODE?'No rooms are open for this audience yet. Create one to get started.':'Connect your account to create and join platform-wide rooms.')}</p>}</section>
      <section aria-label={t('University rooms')}><PanelHeader title={t('University rooms')} icon={Users} hint={t('Your university and year')}/>{university.length?<div className="room-live-cards">{university.map(room=><RoomCard key={room.id} {...room} busy={busy} onEnter={()=>API_MODE?void joinAndEnter(room.code):onEnter(room)}/>)}</div>:<p className="py-4 text-sm text-ink-2">{t('No open rooms in your year right now.')}</p>}</section>
      <WorldChooser onEnter={onEnter}/>
    </div>
    <aside className="room-discovery-friends" aria-label={t('Friends')}>
      <FriendsSection onOpenSharedTest={setOpenSharedTestId} onOpenChallenge={setOpenChallengeId}/>
      {API_MODE&&<Panel className="p-4"><h3 className="font-semibold mb-3">{t('Invite a friend to your room')}</h3>{friends.length&&mine.length?<div className="space-y-3"><Field label={t('Friend')}><Select value={inviteFriend} onChange={e=>setInviteFriend(e.target.value)}><option value="">{t('Choose a friend')}</option>{friends.map(friend=><option key={friend.userId} value={friend.userId}>{friend.displayName}</option>)}</Select></Field><Field label={t('Room')}><Select value={inviteRoom} onChange={e=>setInviteRoom(e.target.value)}><option value="">{t('Choose your room')}</option>{mine.map(room=><option key={room.id} value={room.id}>{room.name}</option>)}</Select></Field><Button disabled={!inviteFriend||!inviteRoom||busy} onClick={()=>void sendInvite()}>{t('Send invitation')}</Button><p className="text-xs text-ink-2">{t('They can accept from their in-app notifications.')}</p></div>:<p className="text-sm text-ink-2">{t('Add a friend and join a room to invite them here.')}</p>}</Panel>}
    </aside>
    {creating&&<Dialog label={t('Create a new room')} onClose={()=>setCreating(false)}><form className="p-5 space-y-4" onSubmit={e=>{e.preventDefault();void createRoom()}}><h2 className="font-serif text-2xl">{t('Make space for your study group')}</h2><Field label={t('Room name')}><TextInput maxLength={100} value={name} onChange={e=>setName(e.target.value)} placeholder={t('e.g. Our evening study room')}/></Field><Field label={t('Room layout')}><Select value={layoutKey} onChange={e=>setLayoutKey(e.target.value)}>{STUDY_WORLDS.map(world=><option key={world.style} value={world.style}>{world.name} · {world.capacity} {t('seats')}</option>)}</Select></Field><Field label={t('Who can join?')}><Select value={scope} onChange={e=>setScope(e.target.value as typeof scope)}><option value="cohort">{t('My university and year')}</option><option value="university">{t('My university · all years')}</option><option value="global">{t('Global · all universities')}</option></Select></Field><Field label={t('Privacy')}><Select value={visibility} onChange={e=>setVisibilityChoice(e.target.value as typeof visibility)}><option value="open">{t('Public · listed in available rooms')}</option><option value="invite">{t('Private · invitation or room code')}</option></Select></Field>{!API_MODE&&<p className="text-sm text-ink-2">{t('You are previewing rooms. Connect an account to create a shared room.')}</p>}<div className="flex justify-end gap-2"><Button variant="ghost" onClick={()=>setCreating(false)}>{t('Cancel')}</Button><Button type="submit" variant="primary" loading={busy}>{t(API_MODE?'Create room':'Preview this layout')}</Button></div></form></Dialog>}
  </div>
}
