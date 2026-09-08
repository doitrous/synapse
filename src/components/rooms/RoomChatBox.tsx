import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'
import { useT } from '@/lib/i18n'
import { Button } from '@/components/ui/Button'
export interface RoomMessage {id:number;text:string}
export function RoomChatBox({demo,messages,draft,onDraft,onSend,onClose,name,children}:{demo:boolean;messages:RoomMessage[];draft:string;onDraft:(text:string)=>void;onSend:()=>void;onClose:()=>void;name:string;children?:ReactNode}){
  const t=useT(),input=useRef<HTMLTextAreaElement>(null),log=useRef<HTMLDivElement>(null)
  const [placement,setPlacement]=useState({left:12,width:340})
  useLayoutEffect(()=>{
    const room=document.getElementById('world-room-region')
    const update=()=>{const rect=room?.getBoundingClientRect();const available=rect&&rect.width>0?rect.width:innerWidth;setPlacement({left:Math.max(12,(rect?.left??0)+12),width:Math.min(360,available-24)})}
    update();const observer=new ResizeObserver(update);if(room)observer.observe(room)
    window.addEventListener('resize',update);window.addEventListener('scroll',update,true)
    return()=>{observer.disconnect();window.removeEventListener('resize',update);window.removeEventListener('scroll',update,true)}
  },[])
  useEffect(()=>{input.current?.focus()},[])
  useEffect(()=>{if(log.current)log.current.scrollTop=log.current.scrollHeight},[messages.length])
  return <section style={{left:placement.left,width:placement.width,right:'auto'}} className="room-chat-box" aria-label={t('Room chat')} onKeyDown={e=>{if(e.key==='Escape'){e.stopPropagation();onClose()}}}>
    <header><div><MessageCircle size={18}/><h2>{t('Room chat')}</h2></div><button type="button" onClick={onClose} aria-label={t('Close chat')}><X size={18}/></button></header>
    {demo?<>
      <p className="room-chat-context">{t('Preview chat · only visible on this device.')}</p>
      <div ref={log} className="room-chat-log" role="log" aria-label={t('Chat messages')} aria-live="polite" aria-relevant="additions">
        {messages.length===0?<div className="room-chat-empty"><MessageCircle size={28}/><h3>{t('A little company, when you need it.')}</h3><p>{t('Share a study goal, ask a question, or say hello.')}</p></div>:messages.map(message=><article key={message.id}><div><strong>{name}</strong><time dateTime={new Date(message.id).toISOString()}>{new Date(message.id).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</time></div><p>{message.text}</p></article>)}
      </div>
      <form onSubmit={e=>{e.preventDefault();onSend()}}><label className="sr-only" htmlFor="room-chat-message">{t('Message')}</label><textarea id="room-chat-message" ref={input} maxLength={500} rows={2} value={draft} onChange={e=>onDraft(e.target.value)} placeholder={t('Write to the room…')} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.nativeEvent.isComposing){e.preventDefault();onSend()}}}/><Button type="submit" size="sm" disabled={!draft.trim()} aria-label={t('Send message')}><Send size={17}/></Button><small>{t('Enter to send · Shift + Enter for a new line')}</small></form>
    </>:<div className="room-chat-live">{children}</div>}
  </section>
}
