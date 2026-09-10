import { ContentSkeleton } from '@/components/loading/PageSkeleton'
import { RoomActivities } from './RoomActivities'
import { tableForSeat } from '../../../server/shared/roomLayouts.js'
import { roomLayout } from '../../../server/shared/roomLayouts.js'
import { Dialog } from '@/components/ui/Dialog'
import { randomMotivation } from '@/lib/rooms/motivation'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { ArrowLeft, Check, Copy, Maximize2, Minimize2, MicOff, Hand } from 'lucide-react'
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
import { DEFAULT_PERSONALISATION, clockText, mockWorldPresence, normalizePersonalisation, worldForRoom, type StudyPresence, type DeskPersonalisation } from '@/lib/rooms/studyWorld'
import { WorldHall } from './WorldHall'
import { StudentPopover } from './StudentPopover'
import { RoomChatBox, type ChatTarget } from './RoomChatBox'
import { useFriends } from '@/lib/useFriends'
import { MyStudySession } from './MyStudySession'
import { StudyControlDock } from './StudyControlDock'
import { DeskPersonaliser } from './DeskPersonaliser'
import { illustratedLayout } from '@/lib/rooms/illustratedLayout'
import { roomSceneLayout } from '@/lib/rooms/sceneLayout'
import { StudentPortrait } from './StudyWorldArt'
import './studyWorld.css'

/** Full room is a view onto the existing provider, so membership, voice and focus survive navigation. */
export function RoomView({onMinimise,onLeave}: {onMinimise:()=>void;onLeave:()=>void}) {
  const t=useT()
  const identity=useIdentity()
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
  const [panelTab,setPanelTab]=useState<'session'|'people'>('session')
  const chatTrigger=useRef<HTMLElement|null>(null)
  const toggleChat=()=>{chatTrigger.current=document.activeElement as HTMLElement;setChatOpen(open=>!open);setSelected(null);if(!chatOpen&&window.innerWidth<=900)setMobileTab('room')}
  const closeChat=()=>{setChatOpen(false);if(chatTrigger.current?.getClientRects().length)chatTrigger.current.focus({preventScroll:true})}
  const [chatOpen,setChatOpen]=useState(false)
  const [chatDraft,setChatDraft]=useState('')
  const [messages,setMessages]=useState<{id:number;text:string}[]>([])
  const [chatTarget,setChatTarget]=useState<ChatTarget|null>(null)
  const {block}=useFriends()
  const switchMobileTab=(next:'session'|'room')=>{setMobileTab(next);setChatOpen(false);setSelected(null)}
  useEffect(()=>{if(!chatOpen)return;const media=window.matchMedia('(max-width:900px)');const sync=()=>{if(media.matches)setMobileTab('room')};sync();media.addEventListener('change',sync);return()=>media.removeEventListener('change',sync)},[chatOpen])
  const [notice,setNotice]=useState('')
  const [busy,setBusy]=useState(false)
  const [copied,setCopied]=useState(false)
  const worldRef=useRef<HTMLDivElement>(null)
  useLayoutEffect(()=>{
    const root=worldRef.current, region=root?.querySelector<HTMLElement>('.world-room-region')
    if(!root||!region)return
    const update=()=>{const box=region.getBoundingClientRect();root.style.setProperty('--room-controls-left',`${box.left}px`);root.style.setProperty('--room-controls-width',`${box.width}px`)}
    const observer=new ResizeObserver(update);observer.observe(region);window.addEventListener('resize',update);update()
    return()=>{observer.disconnect();window.removeEventListener('resize',update)}
  },[activitiesOpen,party?.id,focusMode])
  const detailTrigger=useRef<HTMLElement|null>(null)
  const openDetails=(index:number)=>{detailTrigger.current=document.activeElement as HTMLElement;setSelected(current=>current===index?null:index);setChatOpen(false);if(window.innerWidth<=900)setMobileTab('room')}
  const closeDetails=useCallback(()=>{const trigger=detailTrigger.current?.getClientRects().length?detailTrigger.current:document.querySelector<HTMLElement>('[data-reference-seat][aria-pressed="true"]');setSelected(null);trigger?.focus({preventScroll:true})},[])
  const selfId=identity.userId??'self'
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
  const controls=<StudyControlDock shared={sharedSeat} discussion={world.style==='discussion'} demo={demo} onLeave={onLeave} onChat={toggleChat} chatOpen={chatOpen}/>
  if(activitiesOpen)return <RoomActivities partyId={room.roomId} shared={sharedSeat} demo={demo} onClose={()=>setActivitiesOpen(false)}/>
  return <div ref={worldRef} style={{'--room-fit-ratio':1000/illustratedLayout(world).height} as CSSProperties} role={focusMode?'dialog':undefined} aria-modal={focusMode||undefined} aria-label={focusMode?t('Focus mode'):undefined} tabIndex={-1} className={`study-world world-refined ${libraryLayout?'world-library-layout':''} ${focusMode?'world-focus-mode':''}`}>
    <header className="world-header">
      <div className="flex items-center gap-3"><Button size="sm" variant="ghost" aria-label={t('Back to rooms')} onClick={onMinimise}><ArrowLeft size={17}/></Button><div><h1 className="font-serif text-2xl">{t(roomName)}</h1><p className="text-xs text-ink-2 mt-1">{t(world.type)} · {people.length}/{world.capacity} {t('students')} · {world.capacity-people.length} {t('seats available')}</p></div></div>
      <div className="flex items-center gap-2"><Button variant="secondary" size="sm" onClick={()=>setActivitiesOpen(true)}>{t('Study together')}</Button><span className="world-room-code text-xs text-ink-2">{room.roomCode}</span><Button variant="ghost" size="sm" aria-label={t('Copy room link')} onClick={()=>void copyLink()}>{copied?<Check size={16}/>:<Copy size={16}/>}</Button><Button variant="secondary" size="sm" iconLeft={focusMode?Minimize2:Maximize2} onClick={()=>setFocusMode(!focusMode)}>{t(focusMode?'Exit focus':'Focus mode')}</Button></div>
    </header>
    {!online&&<p className="world-banner" role="status">{t('You are offline. Your focus timer still works; live presence and voice will reconnect when you are online.')}</p>}
    {session.channel?.retrying&&<p className="world-banner" role="status">{t('Reconnecting. Showing the last room snapshot.')}</p>}
    <p className="text-sm text-ink-2" role="status">{notice}</p>
    <div className="world-mobile-tabs" role="tablist" aria-label={t('Study room view')}><button id="session-tab" role="tab" tabIndex={mobileTab==='session'?0:-1} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();switchMobileTab('room');document.getElementById('room-tab')?.focus()}}} aria-controls="world-session-region" aria-selected={mobileTab==='session'} onClick={()=>switchMobileTab('session')}>{t('My Session')}</button><button id="room-tab" role="tab" tabIndex={mobileTab==='room'?0:-1} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();switchMobileTab('session');document.getElementById('session-tab')?.focus()}}} aria-controls="world-room-region" aria-selected={mobileTab==='room'} onClick={()=>switchMobileTab('room')}>{t('Room')}</button></div>
    {focusMode&&<div className="world-focus-timer"><span>{focus.goal||t('One topic at a time.')}</span><time>{clockText(Math.max(0,focus.durationMinutes*60-elapsed/1000))}</time><Button size="sm" variant="secondary" onClick={session.study.toggleTimer}>{t(focus.startedAt!==null?'Pause':'Start focus')}</Button></div>}
    <div className="world-workspace">
      <section id="world-room-region" className={`world-room-region ${mobileTab==='room'?'mobile-visible':''}`} aria-label={t('Room')}>
        <div className="world-room-caption"><span>{t('Choose any available desk to sit down.')}</span><span>{demo?t('Sample students'):t(party?.scope==='global'?'Global room':'University room')}</span></div>
        <WorldHall paused={customising} world={world} seats={desks} selfId={selfId} selected={selected} onSeat={index=>void chooseSeat(index)}/>

      </section>
      <aside id="world-session-region" className={`world-session-region ${mobileTab==='session'?'mobile-visible':''}`} aria-label={t('Your study session')}>
        <div className="session-rail-tabs" role="tablist" aria-label={t('Session panel')} onKeyDown={e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();const next=panelTab==='session'?'people':'session';setPanelTab(next);document.getElementById(`rail-${next}-tab`)?.focus()}}}>
          <button type="button" role="tab" id="rail-session-tab" aria-controls="rail-session" aria-selected={panelTab==='session'} tabIndex={panelTab==='session'?0:-1} onClick={()=>setPanelTab('session')}>{t('My Session')}</button>
          <button type="button" role="tab" id="rail-people-tab" aria-controls="rail-people" aria-selected={panelTab==='people'} tabIndex={panelTab==='people'?0:-1} onClick={()=>setPanelTab('people')}>{t('People')} <span>{people.length}</span></button>
        </div>
        <div id="rail-session" role="tabpanel" aria-labelledby="rail-session-tab" hidden={panelTab!=='session'}><MyStudySession reminder={personalisation.note} onReminder={note=>setStored({...personalisation,note})} onCustomise={()=>setCustomising(true)}/></div>
        <div id="rail-people" role="tabpanel" aria-labelledby="rail-people-tab" hidden={panelTab!=='people'}>
        <section className="world-students"><h3 className="font-semibold text-sm mb-2">{t('In the room')} · {people.length}</h3>{people.length===1&&<p className="text-xs text-ink-2 mb-3">{t('You are the first one here. Settle in, or invite your study partner with the room link.')}</p>}<ul>{desks.map((person,index)=>person&&<li key={person.id}><button type="button" onClick={()=>openDetails(index)}><StudentPortrait model={person.personalisation?.model??'man-1'} className="size-9 shrink-0"/><span><strong>{person.name}</strong><small>{t(person.status??'In the room')}</small></span>{person.handRaised?<Hand size={14}/>:<MicOff size={14}/>}</button></li>)}</ul></section>
        {!demo&&party&&<div className="mt-3"><PartyPage partyId={room.roomId} party={party} onReload={reload} onExit={onLeave}/></div>}
        </div>
      </aside>
    </div>
    {selectedPerson&&selected!==null&&<StudentPopover onInvite={sharedSeat&&selectedPerson.id!==selfId&&tableForSeat(selected,demo?world.style:party?.layoutKey)!==tableForSeat(selfIndex,demo?world.style:party?.layoutKey)?()=>{if(demo){setNotice(t('Invitations are available in connected rooms. Sample students cannot receive requests.'));closeDetails();return}void apiSend<{ok:boolean;reason?:string}>(`/parties/${room.roomId}/invitations`,'POST',{recipientId:selectedPerson.id,scope:'table'}).then(result=>setNotice(t(result.ok?'Table invitation sent.':'The invitation could not be sent. Try again shortly.'))).catch(()=>setNotice(t('Check your connection and try again.')));closeDetails()}:undefined} person={selectedPerson} index={selected} self={selectedPerson.id===selfId} onClose={closeDetails} onCustomise={()=>setCustomising(true)} muted={session.audio?.mutedUsers.has(selectedPerson.id)??false} onToggleMute={!demo&&session.audio?.callActive?()=>session.audio!.toggleUserMute(selectedPerson.id):undefined} onMessage={demo?undefined:()=>{setChatTarget({id:selectedPerson.id,name:selectedPerson.name});setChatOpen(true);closeDetails()}} onBlock={demo?undefined:()=>{void block(selectedPerson.id);setNotice(t('Blocked. They can no longer message you privately.'));closeDetails()}}/>}
    {chatOpen&&<RoomChatBox demo={demo} messages={messages} draft={chatDraft} onDraft={setChatDraft} name={identity.displayName||t('You')} onClose={closeChat} onSend={()=>{if(chatDraft.trim()){setMessages(current=>[...current,{id:Date.now(),text:chatDraft.trim()}]);setChatDraft('')}}} live={demo||!session.channel?null:{messages:session.channel.messages,selfId,nameFor:id=>people.find(p=>p.id===id)?.name||t('Student'),target:chatTarget,onClearTarget:()=>setChatTarget(null),onSend:(text,to)=>session.channel!.sendChat(text,to)}}/>}
    {pendingSeat!==null&&<Dialog label={t('Join this table?')} onClose={()=>setPendingSeat(null)}><div className="p-5"><h2 className="font-serif text-xl">{t(roomSceneLayout(world).seats[pendingSeat]?.shared?'Join this table?':'Take this private seat?')}</h2><p className="text-sm text-ink-2 my-3">{t('Move to seat')} {pendingSeat+1}? {t('Your focus timer will keep running.')}</p><div className="flex justify-end gap-2"><Button variant="ghost" onClick={()=>setPendingSeat(null)}>{t('Cancel')}</Button><Button variant="primary" onClick={()=>void chooseSeat(pendingSeat,true)}>{t('Sit here')}</Button></div></div></Dialog>}
    {controls}
    {!demo&&<p className="text-xs text-ink-2">{t('Your focus goal and study status stay with this session. Room-wide sharing is coming later.')}</p>}
    {selfIndex<0&&<p role="alert">{t('This room is full. Choose another room to take a seat.')}</p>}
    {customising&&<DeskPersonaliser shared={roomSceneLayout(world).seats[selfIndex]?.shared??false} value={personalisation} seat={seat} onSave={(next,furniture)=>{setStored(next);setSeat(furniture)}} onClose={closeCustomiser}/>}
  </div>
}
