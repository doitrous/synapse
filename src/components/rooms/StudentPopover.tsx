import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { X, MicOff, Mic, MessageCircle, Volume2, VolumeX, Ban } from 'lucide-react'
import { useT } from '@/lib/i18n'
import { clockText, type StudyPresence } from '@/lib/rooms/studyWorld'
import { StudentPortrait } from './StudyWorldArt'
export function StudentPopover({person,index,self,elapsedSeconds,onClose,onCustomise,onInvite,muted,onToggleMute,onMessage,onBlock}:{onInvite?:()=>void;person:StudyPresence;index:number;self:boolean;elapsedSeconds?:number;onClose:()=>void;onCustomise:()=>void;muted?:boolean;onToggleMute?:()=>void;onMessage?:()=>void;onBlock?:()=>void}){
  const t=useT(),ref=useRef<HTMLElement>(null),[position,setPosition]=useState({left:12,top:80,ready:false})
  useLayoutEffect(()=>{
    const element=ref.current
    if(!element)return
    const anchor=document.querySelector<HTMLElement>(`[data-student-anchor="${index}"]`)??document.querySelector<HTMLElement>(`[data-reference-seat="${index}"]`)
    const room=document.getElementById('world-room-region')
    const update=()=>{
      if(!anchor)return
      const a=anchor.getBoundingClientRect(),r=room?.getBoundingClientRect(),box=element.getBoundingClientRect()
      const minLeft=Math.max(10,r?.left??10),maxRight=Math.min(innerWidth-10,r?.right??innerWidth-10)
      const left=Math.max(minLeft,Math.min(a.left+a.width/2-box.width/2,maxRight-box.width))
      const above=a.top-box.height-10
      const preferred=above>=64?above:a.bottom+10
      const top=Math.max(64,Math.min(preferred,Math.max(64,innerHeight-box.height-150)))
      setPosition({left,top,ready:true})
    }
    update()
    const observer=new ResizeObserver(update);observer.observe(element);if(room)observer.observe(room)
    window.addEventListener('resize',update);window.addEventListener('scroll',update,true)
    const outside=(event:PointerEvent)=>{const target=event.target as Element;if(!element.contains(target)&&!target.closest('[data-reference-seat],.diorama-seat-list,.world-students'))onClose()}
    document.addEventListener('pointerdown',outside)
    return()=>{observer.disconnect();window.removeEventListener('resize',update);window.removeEventListener('scroll',update,true);document.removeEventListener('pointerdown',outside)}
  },[index,onClose])
  useEffect(()=>{if(position.ready)ref.current?.focus({preventScroll:true})},[position.ready,index])
  return <section ref={ref} className="student-popover" aria-label={t('Student details')} tabIndex={-1} style={{left:position.left,top:position.top,visibility:position.ready?'visible':'hidden'}} onKeyDown={e=>{if(e.key==='Escape'){e.stopPropagation();onClose()}}}>
    <header><StudentPortrait model={person.personalisation?.model??'man-1'} className="size-9 shrink-0"/><div><h3>{person.name}</h3><p>{t('Desk')} {index+1} · {person.year||t('Student')}</p></div><button type="button" aria-label={t('Close student details')} onClick={onClose}><X size={16}/></button></header>
    {person.university&&<p className="student-popover-university">{person.university}</p>}
    <div className="student-popover-status"><span>{t(person.status??'In the room')}</span><span>{elapsedSeconds===undefined?t('Here'):clockText(elapsedSeconds)}</span>{person.micMuted===undefined?<span aria-label={t('Microphone not shared')}>Mic —</span>:person.micMuted===false?<Mic size={13} aria-label={t('Microphone on')}/>:<MicOff size={13} aria-label={t('Microphone muted')}/>}</div>
    <dl><div><dt>{t('Topic')}</dt><dd>{person.topic||t('Not set')}</dd></div><div><dt>{t('Goal')}</dt><dd>{person.goal||t('Not set')}</dd></div></dl>
    {person.personalisation?.items.includes('note')&&<p className="student-popover-note">{person.personalisation.note}</p>}
    {!self&&onInvite&&<button className="student-popover-edit" type="button" onClick={onInvite}>{t('Invite to my table')}</button>}
    {!self&&onMessage&&<button className="student-popover-edit" type="button" onClick={onMessage}><MessageCircle size={14}/> {t('Message privately')}</button>}
    {!self&&onToggleMute&&<button className="student-popover-edit" type="button" onClick={onToggleMute}>{muted?<Volume2 size={14}/>:<VolumeX size={14}/>} {muted?t('Unmute'):t('Mute')}</button>}
    {!self&&onBlock&&<button className="student-popover-edit student-popover-danger" type="button" onClick={onBlock}><Ban size={14}/> {t('Block')}</button>}
    {self&&<button className="student-popover-edit" type="button" onClick={onCustomise}>{t('Personalise my desk')}</button>}
  </section>
}
