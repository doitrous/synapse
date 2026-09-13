import { ContentSkeleton } from '@/components/loading/PageSkeleton'
import { RoomActivities } from './RoomActivities'
import { tableForSeat } from '../../../server/shared/roomLayouts.js'
import { roomLayout } from '../../../server/shared/roomLayouts.js'
import { Dialog } from '@/components/ui/Dialog'
import { randomMotivation } from '@/lib/rooms/motivation'
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { ArrowLeft, Check, Copy, Maximize2, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Panel } from '@/components/ui/Panel'
import { PartyPage } from '@/components/social/PartyPage'
import { useParty } from '@/lib/useParties'
import { useIdentity } from '@/lib/useIdentity'
import { API_MODE, apiSend } from '@/lib/api'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { universities as seededUniversities } from '@/data/universities'
import { focusFirstWithin, wrapTab } from '@/lib/focusTrap'
import { pushOverlay, popOverlay, isTopOverlay } from '@/lib/overlayStack'
import { useT } from '@/lib/i18n'
import { useOnlineStatus } from '@/lib/useOnlineStatus'
import { usePersistentState } from '@/lib/usePersistentState'
import { useRoomSession } from '@/lib/rooms/RoomSessionProvider'
import { useSeatPreference } from '@/lib/rooms/useSeatPreference'
import { normalizeSeat, placeSeats } from '@/lib/rooms/roomPresence'
import { DEFAULT_PERSONALISATION, mockWorldPresence, normalizePersonalisation, worldForRoom, type StudyPresence, type DeskPersonalisation } from '@/lib/rooms/studyWorld'
import { WorldHall } from './WorldHall'
import { StudentPopover } from './StudentPopover'
import { type ChatTarget } from './RoomChatBox'
import { useFriends } from '@/lib/useFriends'
import { RoomSessionRail } from './RoomSessionRail'
import { StudyTimerButton } from './StudyTimerButton'
import { usePomodoro } from '@/components/shell/PomodoroTimer'
import { DeskPersonaliser } from './DeskPersonaliser'
import { illustratedLayout } from '@/lib/rooms/illustratedLayout'
import { roomSceneLayout } from '@/lib/rooms/sceneLayout'
import './studyWorld.css'

/** Full room is a view onto the existing provider, so membership, voice and focus survive navigation. */
export function RoomView({onMinimise,onLeave}: {onMinimise:()=>void;onLeave:()=>void}) {
  const t=useT()
  const identity=useIdentity()
  // Back doesn't just cut to the lobby: the hall shrinks toward the bottom-left
  // corner where the floating room dock lives, so leaving reads as the room
  // folding into its companion rather than blinking away. Reduced motion skips
  // straight to the lobby.
  const [collapsing,setCollapsing]=useState(false)
  const minimiseWithCollapse=useCallback(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){onMinimise();return}
    setCollapsing(true)
    window.setTimeout(onMinimise,430)
  },[onMinimise])
  const [configuredUniversities] = useUniversityCatalogue()
  const universities = configuredUniversities.length ? configuredUniversities : seededUniversities
  const universityName = universities.find(u => u.id === identity.audience.universityId)?.name
  const session=useRoomSession()!
  const room=session.room
  const demo=Boolean(room?.demo)||!API_MODE
  const online=useOnlineStatus()
  const {party,error,reload}=useParty(demo?null:room?.roomId??null,{background:session.channel?.connected??false})
  const definition=worldForRoom(demo?room?.roomId??'':`world-${party?.layoutKey??'campus'}`)
  const world=useMemo(()=>demo?definition:{...definition,...roomLayout(party?.layoutKey??'legacy')},[definition,demo,party?.layoutKey])
  const [seat,setSeat]=useSeatPreference(demo?null:room?.roomCode)
  const [initialReminder]=useState(randomMotivation)
  const [stored,setStored]=usePersistentState<DeskPersonalisation>('nishany.studyRooms.personalisation.v1',{...DEFAULT_PERSONALISATION,note:initialReminder})
  const personalisation=useMemo(()=>normalizePersonalisation(stored),[stored])
  const [activitiesOpen,setActivitiesOpen]=useState(false)
  const [pendingSeat,setPendingSeat]=useState<number|null>(null)
  const [customising,setCustomising]=useState(false)
  const closeCustomiser=useCallback(()=>setCustomising(false),[])
  const [selected,setSelected]=useState<number|null>(null)
  const [focusMode,setFocusMode]=useState(false)
  const [mobileTab,setMobileTab]=useState<'session'|'room'>('session')
  const [chatDraft,setChatDraft]=useState('')
  const [messages,setMessages]=useState<{id:number;text:string}[]>([])
  const [chatTarget,setChatTarget]=useState<ChatTarget|null>(null)
  const {block}=useFriends()
  const switchMobileTab=(next:'session'|'room')=>{setMobileTab(next);setSelected(null)}
  const [notice,setNotice]=useState('')
  const [busy,setBusy]=useState(false)
  const [copied,setCopied]=useState(false)
  const worldRef=useRef<HTMLDivElement>(null)
  const detailTrigger=useRef<HTMLElement|null>(null)
  const openDetails=(index:number)=>{detailTrigger.current=document.activeElement as HTMLElement;setSelected(current=>current===index?null:index);if(window.innerWidth<=900)setMobileTab('room')}
  const closeDetails=useCallback(()=>{const trigger=detailTrigger.current?.getClientRects().length?detailTrigger.current:document.querySelector<HTMLElement>('[data-reference-seat][aria-pressed="true"]');setSelected(null);trigger?.focus({preventScroll:true})},[])
  const selfId=identity.userId??'self'
  const timer=usePomodoro()
  const {focus,elapsed,patch}=session.study
  const setViewingFull=session.setViewingFull
  useEffect(()=>{setViewingFull(true);return()=>setViewingFull(false)},[setViewingFull])
  useEffect(()=>{
    if(!focusMode)return
    const previous=document.activeElement as HTMLElement|null
    const overlayId='study-room-focus'
    pushOverlay(overlayId,'dialog')
    const hidden: {node:HTMLElement;inert:boolean}[]=[]
    let branch:HTMLElement|null=worldRef.current
    while(branch?.parentElement && branch.parentElement!==document.body){
      for(const sibling of branch.parentElement.children){
        if(sibling!==branch && sibling instanceof HTMLElement){hidden.push({node:sibling,inert:sibling.inert});sibling.inert=true}
      }
      branch=branch.parentElement
    }
    const overflow=document.body.style.overflow
    document.body.style.overflow='hidden'
    focusFirstWithin(worldRef.current)
    const close=(event:KeyboardEvent)=>{
      if(!isTopOverlay(overlayId))return
      if(event.key==='Escape'){event.preventDefault();setFocusMode(false)}
      wrapTab(event,worldRef.current)
    }
    document.addEventListener('keydown',close,true)
    return()=>{document.removeEventListener('keydown',close,true);hidden.forEach(({node,inert})=>{node.inert=inert});document.body.style.overflow=overflow;popOverlay(overlayId);previous?.focus()}
  },[focusMode])
  const sample=useMemo(()=>mockWorldPresence(selfId,world),[selfId,world])
  const people=useMemo<StudyPresence[]>(()=>{
    const others:StudyPresence[]=demo?sample:(session.channel?.members??party?.members??[]).filter(m=>m.userId!==selfId).map(m=>({id:m.userId,name:m.displayName||t('Student'),seat:normalizeSeat(m.seat),seatIndex:m.seat?.seatIndex,studying:m.activity==='studying',speaking:session.audio?.speaking.has(m.userId)??false,goal:'statusMessage' in m ? m.statusMessage??undefined : undefined,status:m.activity==='studying'?'Focusing':undefined}))
    const self:StudyPresence={id:selfId,name:identity.displayName||t('You'),seat,seatIndex:focus.seatIndex??(demo?1:party?.members.find(m=>m.userId===selfId)?.seat?.seatIndex),studying:!['On Break','Needs Help','Available to Talk'].includes(focus.status),speaking:session.audio?.speaking.has(selfId)??false,university:universityName,year:identity.audience.year||undefined,topic:focus.topic,goal:focus.goal,status:focus.status,elapsedSeconds:elapsed/1000,micMuted:!session.audio?.callActive||session.audio.muted,handRaised:focus.handRaised,personalisation}
    return [...others,self]
  },[demo,sample,session.channel?.members,party?.members,selfId,t,identity.displayName,universityName,identity.audience.year,seat,focus,elapsed,session.audio,personalisation])
  const desks=useMemo(()=>placeSeats(people,world.capacity) as (StudyPresence|null)[],[people,world.capacity])
  const selectedPerson=selected!==null?desks[selected]:null
  const selfIndex=desks.findIndex(p=>p?.id===selfId)
  const sharedSeat=roomSceneLayout(world).seats[selfIndex]?.shared??false
  useEffect(()=>{if(!sharedSeat&&session.audio?.audience==='table')session.audio.setAudience('room')},[sharedSeat,session.audio])
  async function chooseSeat(index:number,confirmed=false) {
    if(desks[index]){openDetails(index);return}
    if(busy)return
    if(!demo&&!online){setNotice(t('Reconnect before changing your seat.'));return}
    if(!confirmed){setPendingSeat(index);return}
    setPendingSeat(null)
    session.audio?.leave()
    setBusy(true)
    try {
      if(!demo){const result=await apiSend<{ok:boolean;reason?:string}>(`/parties/${encodeURIComponent(room!.roomCode)}/seat`,'PATCH',{seatIndex:index});if(!result.ok)throw new Error(t('That seat could not be reserved. Refresh the room and try again.'));await reload()}
      patch({seatIndex:index});setSelected(null);setNotice(`${t('You are now at desk')} ${index+1}.`)
    }catch(e){setNotice(e instanceof Error?e.message:t('Could not change seats. Try again.'))}finally{setBusy(false)}
  }
  async function copyLink(){try{await navigator.clipboard.writeText(`${window.location.origin}/app/study-rooms?room=${encodeURIComponent(room!.roomCode)}`);setCopied(true)}catch{setNotice(t('Could not copy the link. Copy the room code instead.'))}}
  if(!room)return <ContentSkeleton shape="room" />
  if(!demo&&!party&&!error)return <Panel className="p-8" role="status" aria-busy="true">{t('Loading students and seats…')}</Panel>
  if(!demo&&error)return <Panel className="p-8"><p role="alert">{error}</p><div className="flex gap-2 mt-4"><Button onClick={()=>void reload()}>{t('Try again')}</Button><Button variant="ghost" onClick={onMinimise}>{t('Back to rooms')}</Button></div></Panel>
  const roomName=room.roomId.startsWith('world-')?world.name:party?.name??room.roomName??world.name
  const libraryLayout=world.style==='library'&&world.capacity===12&&!focusMode
  const chatName=identity.displayName||t('You')
  const liveChat=demo||!session.channel?null:{messages:session.channel.messages,selfId,nameFor:(id:string)=>people.find(p=>p.id===id)?.name||t('Student'),target:chatTarget,onClearTarget:()=>setChatTarget(null),onSend:(text:string,to?:string)=>session.channel!.sendChat(text,to)}
  const sendDemoMessage=()=>{if(chatDraft.trim()){setMessages(current=>[...current,{id:Date.now(),text:chatDraft.trim()}]);setChatDraft('')}}
  if(activitiesOpen)return <RoomActivities partyId={room.roomId} shared={sharedSeat} demo={demo} onClose={()=>setActivitiesOpen(false)}/>
  return <div ref={worldRef} style={{'--room-fit-ratio':1000/illustratedLayout(world).height} as CSSProperties} role={focusMode?'dialog':undefined} aria-modal={focusMode||undefined} aria-label={focusMode?t('Focus mode'):undefined} tabIndex={-1} className={`study-world world-refined ${libraryLayout?'world-library-layout':''} ${focusMode?'world-focus-mode':''} ${collapsing?'is-collapsing':''}`}>
    <header className="world-header">
      <div className="flex items-center gap-3"><Button size="sm" variant="ghost" aria-label={t('Back to rooms')} onClick={minimiseWithCollapse}><ArrowLeft size={17}/></Button><div><h1 className="font-serif text-2xl">{t(roomName)}</h1><p className="text-xs text-ink-2 mt-1">{t(world.type)} · {people.length}/{world.capacity} {t('students')} · {world.capacity-people.length} {t('seats available')}</p></div></div>
      <div className="flex items-center gap-2"><Button variant="secondary" size="sm" onClick={()=>setActivitiesOpen(true)}>{t('Study together')}</Button><span className="world-room-code text-xs text-ink-2">{room.roomCode}</span><Button variant="ghost" size="sm" aria-label={t('Copy room link')} onClick={()=>void copyLink()}>{copied?<Check size={16}/>:<Copy size={16}/>}</Button><Button variant="secondary" size="sm" iconLeft={focusMode?Minimize2:Maximize2} onClick={()=>setFocusMode(!focusMode)}>{t(focusMode?'Exit focus':'Focus mode')}</Button></div>
    </header>
    {!online&&<p className="world-banner" role="status">{t('You are offline. Your focus timer still works; live presence and voice will reconnect when you are online.')}</p>}
    {session.channel?.retrying&&<p className="world-banner" role="status">{t('Reconnecting. Showing the last room snapshot.')}</p>}
    <p className="text-sm text-ink-2" role="status">{notice}</p>
    <div className="world-mobile-tabs" role="tablist" aria-label={t('Study room view')}><button id="session-tab" role="tab" tabIndex={mobileTab==='session'?0:-1} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();switchMobileTab('room');document.getElementById('room-tab')?.focus()}}} aria-controls="world-session-region" aria-selected={mobileTab==='session'} onClick={()=>switchMobileTab('session')}>{t('My Session')}</button><button id="room-tab" role="tab" tabIndex={mobileTab==='room'?0:-1} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();switchMobileTab('session');document.getElementById('session-tab')?.focus()}}} aria-controls="world-room-region" aria-selected={mobileTab==='room'} onClick={()=>switchMobileTab('room')}>{t('Room')}</button></div>
    {focusMode&&<div className="world-focus-timer"><span>{focus.goal||t('One topic at a time.')}</span>{timer&&<time className="tnum">{timer.timeLabel}</time>}<StudyTimerButton/></div>}
    <div className="world-workspace">
      <section id="world-room-region" className={`world-room-region ${mobileTab==='room'?'mobile-visible':''}`} aria-label={t('Room')}>
        <div className="world-room-caption"><span>{t('Choose any available desk to sit down.')}</span><span>{demo?t('Sample students'):t(party?.scope==='global'?'Global room':'University room')}</span></div>
        <WorldHall paused={customising} world={world} seats={desks} selfId={selfId} selected={selected} onSeat={index=>void chooseSeat(index)}/>

      </section>
      <aside id="world-session-region" className={`world-session-region session-dock-region ${mobileTab==='session'?'mobile-visible':''}`} aria-label={t('Your study session')}>
        <RoomSessionRail
          demo={demo}
          people={people}
          onOpenMember={id=>{const index=desks.findIndex(p=>p?.id===id);if(index>=0)openDetails(index)}}
          reminder={personalisation.note}
          onReminder={note=>setStored({...personalisation,note})}
          onCustomise={()=>setCustomising(true)}
          shared={sharedSeat}
          onLeaveRoom={onLeave}
          chat={{name:chatName,messages,draft:chatDraft,onDraft:setChatDraft,onSend:sendDemoMessage,target:chatTarget,live:liveChat}}
          manage={!demo&&party?<PartyPage partyId={room.roomId} party={party} onReload={reload} onExit={onLeave}/>:undefined}
        />
      </aside>
    </div>
    {selectedPerson&&selected!==null&&<StudentPopover onInvite={sharedSeat&&selectedPerson.id!==selfId&&tableForSeat(selected,demo?world.style:party?.layoutKey)!==tableForSeat(selfIndex,demo?world.style:party?.layoutKey)?()=>{if(demo){setNotice(t('Invitations are available in connected rooms. Sample students cannot receive requests.'));closeDetails();return}void apiSend<{ok:boolean;reason?:string}>(`/parties/${room.roomId}/invitations`,'POST',{recipientId:selectedPerson.id,scope:'table'}).then(result=>setNotice(t(result.ok?'Table invitation sent.':'The invitation could not be sent. Try again shortly.'))).catch(()=>setNotice(t('Check your connection and try again.')));closeDetails()}:undefined} person={selectedPerson} index={selected} self={selectedPerson.id===selfId} onClose={closeDetails} onCustomise={()=>setCustomising(true)} muted={session.audio?.mutedUsers.has(selectedPerson.id)??false} onToggleMute={!demo&&session.audio?.callActive?()=>session.audio!.toggleUserMute(selectedPerson.id):undefined} onMessage={demo?undefined:()=>{setChatTarget({id:selectedPerson.id,name:selectedPerson.name});if(window.innerWidth<=900)setMobileTab('session');closeDetails()}} onBlock={demo?undefined:()=>{void block(selectedPerson.id);setNotice(t('Blocked. They can no longer message you privately.'));closeDetails()}}/>}
    {pendingSeat!==null&&<Dialog label={t('Join this table?')} onClose={()=>setPendingSeat(null)}><div className="p-5"><h2 className="font-serif text-xl">{t(roomSceneLayout(world).seats[pendingSeat]?.shared?'Join this table?':'Take this private seat?')}</h2><p className="text-sm text-ink-2 my-3">{t('Move to seat')} {pendingSeat+1}? {t('Your focus timer will keep running.')}</p><div className="flex justify-end gap-2"><Button variant="ghost" onClick={()=>setPendingSeat(null)}>{t('Cancel')}</Button><Button variant="primary" onClick={()=>void chooseSeat(pendingSeat,true)}>{t('Sit here')}</Button></div></div></Dialog>}
    {selfIndex<0&&<p role="alert">{t('This room is full. Choose another room to take a seat.')}</p>}
    {customising&&<DeskPersonaliser shared={roomSceneLayout(world).seats[selfIndex]?.shared??false} value={personalisation} seat={seat} onSave={(next,furniture)=>{setStored(next);setSeat(furniture)}} onClose={closeCustomiser}/>}
  </div>
}
