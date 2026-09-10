import { Link } from 'react-router-dom'
import { ArrowUpRight, BookOpen, Layers, Brain, Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { TextInput } from '@/components/ui/Field'
import { useRoomSession } from '@/lib/rooms/RoomSessionProvider'
import { STUDY_STATUSES } from '@/lib/rooms/studyWorld'
import { StudyStatusIcon } from './StudyStatusIcon'
import { useT } from '@/lib/i18n'

/**
 * The study-focus editor, without a timer of its own.
 *
 * The countdown moved to the shared menu clock (the "Start focus timer" button
 * runs it), and the goal is edited in the rail's always-visible focus line, so
 * what is left here is the fuller detail a student sets once and rarely touches:
 * what they are working on, a private reminder, their status, and the desk.
 */
export function MyStudySession({onCustomise,reminder,onReminder}: {onCustomise:()=>void;reminder:string;onReminder:(value:string)=>void}) {
  const session=useRoomSession()!,{focus,patch,setStatus}=session.study,t=useT()
  return <section className="session-focus-editor" aria-label={t('Study focus')}>
    <label className="world-field">{t('Module or lecture')}<TextInput maxLength={100} placeholder={t('e.g. Cardiac conduction')} value={focus.topic} onChange={e=>patch({topic:e.target.value})}/></label>
    <label className="world-field">{t('Your reminder')}<TextInput maxLength={100} value={reminder} onChange={e=>onReminder(e.target.value)}/></label>
    <fieldset className="session-status-picker"><legend>{t('Status')}</legend><div>{STUDY_STATUSES.map(status=><button key={status} type="button" aria-pressed={focus.status===status} onClick={()=>setStatus(status)}><StudyStatusIcon status={status}/><span>{t(status)}</span></button>)}</div></fieldset>
    <Button className="session-desk-action" variant="secondary" iconLeft={Settings2} onClick={onCustomise}>{t('Personalise my desk')}</Button>
    <section className="session-resources" aria-label={t('Continue studying')}><h3>{t('Continue studying')}</h3><div className="session-study-links">{[{to:'/app/learn',label:'Lectures',icon:BookOpen},{to:'/app/flashcards',label:'Flashcards',icon:Layers},{to:'/app/qbank',label:'MCQs',icon:Brain}].map(({to,label,icon:Icon})=><Link key={to} to={to}><Icon size={20}/><span>{t(label)}</span><ArrowUpRight size={13}/></Link>)}</div></section>
  </section>
}
