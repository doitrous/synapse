import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'
import { useT } from '@/lib/i18n'
import { Button } from '@/components/ui/Button'
import type { ChatMessage } from '@/lib/rooms/roomChannel'
export interface RoomMessage {id:number;text:string}

/** Who a private line is addressed to, or being composed for. Just enough to label a bubble or a chip. */
export interface ChatTarget { id: string; name: string }

/**
 * What the live chat needs from the room around it.
 *
 * `messages` and `onSend` are the socket's — the same public/private protocol
 * the server relays — so this box is a real conversation, not the local
 * preview the demo path still shows. `target` is the composer's private
 * recipient, set from a member's popover; clearing it returns to the room.
 */
export interface LiveChat {
  messages: ChatMessage[]
  selfId: string
  nameFor: (userId: string) => string
  target: ChatTarget | null
  onClearTarget: () => void
  onSend: (text: string, toUserId?: string) => void
}

export function RoomChatBox({demo,messages,draft,onDraft,onSend,onClose,name,live}:{demo:boolean;messages:RoomMessage[];draft:string;onDraft:(text:string)=>void;onSend:()=>void;onClose:()=>void;name:string;live?:LiveChat|null}){
  const t=useT(),input=useRef<HTMLTextAreaElement>(null),log=useRef<HTMLDivElement>(null)
  const [liveDraft,setLiveDraft]=useState('')
  const [placement,setPlacement]=useState({left:12,width:340})
  useLayoutEffect(()=>{
    const room=document.getElementById('world-room-region')
    const update=()=>{const rect=room?.getBoundingClientRect();const available=rect&&rect.width>0?rect.width:innerWidth;setPlacement({left:Math.max(12,(rect?.left??0)+12),width:Math.min(360,available-24)})}
    update();const observer=new ResizeObserver(update);if(room)observer.observe(room)
    window.addEventListener('resize',update);window.addEventListener('scroll',update,true)
    return()=>{observer.disconnect();window.removeEventListener('resize',update);window.removeEventListener('scroll',update,true)}
  },[])
  useEffect(()=>{input.current?.focus()},[])
  const liveCount=live?.messages.length??0
  useEffect(()=>{if(log.current)log.current.scrollTop=log.current.scrollHeight},[messages.length,liveCount])
  function submitLive(){const text=liveDraft.trim();if(!text||!live)return;setLiveDraft('');live.onSend(text,live.target?.id)}
  return <section style={{left:placement.left,width:placement.width,right:'auto'}} className="room-chat-box" aria-label={t('Room chat')} onKeyDown={e=>{if(e.key==='Escape'){e.stopPropagation();onClose()}}}>
    <header><div><MessageCircle size={18}/><h2>{t('Room chat')}</h2></div><button type="button" onClick={onClose} aria-label={t('Close chat')}><X size={18}/></button></header>
    {demo?<>
      <p className="room-chat-context">{t('Preview chat · only visible on this device.')}</p>
      <div ref={log} className="room-chat-log" role="log" aria-label={t('Chat messages')} aria-live="polite" aria-relevant="additions">
        {messages.length===0?<div className="room-chat-empty"><MessageCircle size={28}/><h3>{t('A little company, when you need it.')}</h3><p>{t('Share a study goal, ask a question, or say hello.')}</p></div>:messages.map(message=><article key={message.id}><div><strong>{name}</strong><time dateTime={new Date(message.id).toISOString()}>{new Date(message.id).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</time></div><p>{message.text}</p></article>)}
      </div>
      <form onSubmit={e=>{e.preventDefault();onSend()}}><label className="sr-only" htmlFor="room-chat-message">{t('Message')}</label><textarea id="room-chat-message" ref={input} maxLength={500} rows={2} value={draft} onChange={e=>onDraft(e.target.value)} placeholder={t('Write to the room…')} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.nativeEvent.isComposing){e.preventDefault();onSend()}}}/><Button type="submit" size="sm" disabled={!draft.trim()} aria-label={t('Send message')}><Send size={17}/></Button><small>{t('Enter to send · Shift + Enter for a new line')}</small></form>
    </>:live?<>
      {live.target&&<p className="room-chat-context" style={{display:'flex',alignItems:'center',gap:8}}>
        <span>{t('To')} <strong>{live.target.name}</strong> · {t('Private')}</span>
        <button type="button" onClick={live.onClearTarget} aria-label={t('Message everyone instead')} style={{marginInlineStart:'auto',cursor:'pointer'}}><X size={13}/></button>
      </p>}
      <div ref={log} className="room-chat-log" role="log" aria-label={t('Chat messages')} aria-live="polite" aria-relevant="additions">
        {live.messages.length===0?<div className="room-chat-empty"><MessageCircle size={28}/><h3>{t('A little company, when you need it.')}</h3><p>{t('Share a study goal, ask a question, or say hello.')}</p></div>:live.messages.map(message=>{
          const mine=message.from===live.selfId
          return <article key={message.id}><div><strong>{mine?name:live.nameFor(message.from)}{message.private?` · ${message.private&&mine?`${t('To')} ${live.nameFor(message.to??'')}`:t('Private')}`:''}</strong><time dateTime={message.at}>{new Date(message.at).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</time></div><p>{message.text}</p></article>
        })}
      </div>
      <form onSubmit={e=>{e.preventDefault();submitLive()}}><label className="sr-only" htmlFor="room-chat-message">{t('Message')}</label><textarea id="room-chat-message" ref={input} maxLength={2000} rows={2} value={liveDraft} onChange={e=>setLiveDraft(e.target.value)} placeholder={live.target?t('Message privately…'):t('Write to the room…')} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.nativeEvent.isComposing){e.preventDefault();submitLive()}}}/><Button type="submit" size="sm" disabled={!liveDraft.trim()} aria-label={t('Send message')}><Send size={17}/></Button><small>{t('Enter to send · Shift + Enter for a new line')}</small></form>
    </>:<div className="room-chat-live"><p>{t('Chat will be available when the room reconnects.')}</p></div>}
  </section>
}
