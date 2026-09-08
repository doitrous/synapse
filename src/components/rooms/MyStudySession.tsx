import { Link } from 'react-router-dom'
import { ArrowUpRight, BookOpen, Layers, Brain, Pause, Play, RotateCcw, Settings2, Target } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { TextInput } from '@/components/ui/Field'
import { useRoomSession } from '@/lib/rooms/RoomSessionProvider'
import { STUDY_STATUSES, clockText } from '@/lib/rooms/studyWorld'
import { StudyStatusIcon } from './StudyStatusIcon'
import { useT } from '@/lib/i18n'
export function MyStudySession({onCustomise,reminder,onReminder}: {onCustomise:()=>void;reminder:string;onReminder:(value:string)=>void}) {
  const session=useRoomSession()!,{focus,elapsed,patch,toggleTimer,setStatus}=session.study,t=useT()
  const remaining=Math.max(0,focus.durationMinutes*60-elapsed/1000)
  return <section className="world-session session-redesigned" aria-label={t('Focus session')}>

    <div className="world-timer">
      <span>{t(focus.completed?'Focus block complete':focus.startedAt!==null?'Make this time yours':focus.status==='On Break'?'Take a breather':'A little progress, every day.')}</span>
      <time aria-label={`${t('Time remaining')}: ${clockText(remaining)}`}>{clockText(remaining)}</time>
      <div className="session-duration" role="group" aria-label={t('Focus length')}>{[15,25,50,90].map(minutes=><button key={minutes} type="button" aria-label={`${minutes} ${t('minutes')}`} aria-pressed={focus.durationMinutes===minutes} disabled={focus.startedAt!==null} onClick={()=>patch({durationMinutes:minutes,accumulatedMs:0,completed:false})}>{minutes} <span>{t('min')}</span></button>)}</div>
      <div className="session-timer-actions"><Button variant="primary" iconLeft={focus.startedAt!==null?Pause:Play} onClick={toggleTimer}>{t(focus.startedAt!==null?'Pause focus':focus.completed?'Start another block':'Start focus')}</Button><Button variant="secondary" aria-label={t('Reset timer')} onClick={()=>patch({startedAt:null,accumulatedMs:0,completed:false})}><RotateCcw size={17}/></Button></div>
      <div className="session-progress-copy"><span>{t('This focus block')}</span><span>{Math.min(focus.durationMinutes,Math.floor(elapsed/60000))} / {focus.durationMinutes} {t('min')}</span></div><progress aria-label={t('Focus block progress')} max={focus.durationMinutes*60000} value={Math.min(elapsed,focus.durationMinutes*60000)} className="world-progress"/>
      {focus.completed&&<p role="status" className="session-complete">{t('Block complete. Take a break or start another.')}</p>}
    </div>

    <div className="session-plan"><label className="world-field session-focus-label"><span><Target size={17}/>{t('Your focus')}</span><TextInput maxLength={120} placeholder={t('What would make this session a win?')} value={focus.goal} onChange={e=>patch({goal:e.target.value})}/></label><label className="world-field">{t('Module or lecture')}<TextInput maxLength={100} placeholder={t('e.g. Cardiac conduction')} value={focus.topic} onChange={e=>patch({topic:e.target.value})}/></label>
      <label className="world-field">{t('Your reminder')}<TextInput maxLength={100} value={reminder} onChange={e=>onReminder(e.target.value)}/></label>
      <fieldset className="session-status-picker"><legend>{t('Status')}</legend><div>{STUDY_STATUSES.map(status=><button key={status} type="button" aria-pressed={focus.status===status} onClick={()=>setStatus(status)}><StudyStatusIcon status={status}/><span>{t(status)}</span></button>)}</div></fieldset>
    <Button className="session-desk-action" variant="secondary" iconLeft={Settings2} onClick={onCustomise}>{t('Personalise my desk')}</Button>
    </div>
    <section className="session-resources" aria-label={t('Continue studying')}><h3>{t('Continue studying')}</h3><div className="session-study-links">{[{to:'/app/learn',label:'Lectures',icon:BookOpen},{to:'/app/flashcards',label:'Flashcards',icon:Layers},{to:'/app/qbank',label:'MCQs',icon:Brain}].map(({to,label,icon:Icon})=><Link key={to} to={to}><Icon size={20}/><span>{t(label)}</span><ArrowUpRight size={13}/></Link>)}</div></section>
  </section>
}
