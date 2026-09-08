import { Coffee, Hand, Headphones, HeadphoneOff, LogOut, MessageCircle, Mic, MicOff } from 'lucide-react'
import { useRoomSession } from '@/lib/rooms/RoomSessionProvider'
import { useT } from '@/lib/i18n'
export function StudyControlDock({onLeave,onChat,chatOpen,demo,discussion,shared=false}: {onLeave:()=>void;onChat:()=>void;chatOpen:boolean;demo:boolean;discussion:boolean;shared?:boolean}) {
  const session=useRoomSession()!
  const {audio,study}=session
  const t=useT()
  const micOn=Boolean(audio?.callActive&&!audio.muted)
  return <div className={`world-dock-wrap ${discussion?'discussion-dock':''}`}>{discussion&&<p className="world-discussion-prompt">{t('Have a question? Raise your hand and take a turn.')}</p>}<div className="world-voice-audience"><span>{t('Speak to')}</span><button type="button" aria-pressed={audio?.audience!=='table'} onClick={()=>audio?.setAudience('room')}>{t('Entire room')}</button><button type="button" aria-pressed={audio?.audience==='table'} disabled={!shared} onClick={()=>audio?.setAudience('table')}>{t('My table')}</button></div><div className="world-control-dock" role="toolbar" aria-label={t('Study room controls')}>
    <button type="button" aria-pressed={micOn} disabled={demo||audio?.state==='joining'||audio?.state==='unsupported'} onClick={()=>audio?.callActive?audio.toggleMute():void audio?.join()}>{micOn?<Mic/>:<MicOff/>}<span>{t(micOn?'Mute':'Mic')}</span></button>
    <button type="button" aria-pressed={audio?.deafened??false} disabled={demo||!audio?.callActive} onClick={()=>audio?.toggleDeafen()}>{audio?.deafened?<HeadphoneOff/>:<Headphones/>}<span>{t('Deafen')}</span></button>
    <button type="button" className={study.focus.handRaised?'active':''} aria-pressed={study.focus.handRaised} onClick={()=>study.patch({handRaised:!study.focus.handRaised})}><Hand/><span>{t(study.focus.handRaised?'Lower hand':'Raise hand')}</span></button>
    <button type="button" className={study.focus.status==='On Break'?'active':''} aria-pressed={study.focus.status==='On Break'} onClick={()=>study.setStatus(study.focus.status==='On Break'?'Focusing':'On Break')}><Coffee/><span>{t(study.focus.status==='On Break'?'Back to focus':'Break')}</span></button>
    <button type="button" aria-pressed={chatOpen} onClick={onChat}><MessageCircle/><span>{t('Chat')}</span></button>
    <button type="button" onClick={onLeave}><LogOut/><span>{t('Leave room')}</span></button>
  </div><p className="text-center text-xs text-ink-2 mt-2" role="status">{demo?t('Preview room · voice is not connected'):audio?.reason?t(audio.reason):audio?.callActive?t(audio.audience==='table'?'Voice connected · only your table hears you':'Voice connected · entire room'):t('Microphone off · join voice when you are ready')}</p></div>
}
