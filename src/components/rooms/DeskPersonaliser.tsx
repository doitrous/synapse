import { useState } from 'react'
import { Check, Coffee, Flower2, Laptop, Monitor, NotebookPen, Smartphone, StickyNote, Tablet, X, type LucideIcon } from 'lucide-react'
import { Dialog } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { useT } from '@/lib/i18n'
import { DESK_ITEMS, STUDENT_MODELS, type DeskPersonalisation, type DeskItem } from '@/lib/rooms/studyWorld'
import type { SeatPreference } from '@/lib/rooms/roomPresence'
import { StudentPortrait } from './StudyWorldArt'
import { DeskPreview } from './DeskPreview'
const labels:Record<DeskItem,string>={device:'Device',notebook:'Notebook',plant:'Plant',cup:'Cup',note:'Note'}
const icons:Record<DeskItem,LucideIcon>={device:Laptop,notebook:NotebookPen,plant:Flower2,cup:Coffee,note:StickyNote}
const devices:{value:SeatPreference['device'];label:string;icon:LucideIcon}[]=[{value:'laptop',label:'Laptop',icon:Laptop},{value:'desktop',label:'PC',icon:Monitor},{value:'tablet',label:'iPad',icon:Tablet},{value:'iphone',label:'iPhone',icon:Smartphone},{value:'android',label:'Android',icon:Smartphone}]
export function DeskPersonaliser({value,seat,onSave,onClose,shared=false}:{shared?:boolean;value:DeskPersonalisation;seat:SeatPreference;onSave:(value:DeskPersonalisation,seat:SeatPreference)=>void;onClose:()=>void}){
  const t=useT(),[draft,setDraft]=useState(value),[furniture,setFurniture]=useState(seat),[tab,setTab]=useState<'desk'|'student'>('desk')
  const toggle=(item:DeskItem)=>setDraft(current=>({...current,items:current.items.includes(item)?current.items.filter(v=>v!==item):[...current.items,item]}))
  const chooseDevice=(device:SeatPreference['device'])=>{setFurniture({...furniture,device});setDraft(current=>current.items.includes('device')?current:{...current,items:['device',...current.items]})}
  return <Dialog label={t('Make this desk yours')} size="xl" onClose={onClose} className="desk-editor">
    <header className="desk-editor-header"><div><h2>{t('Make this desk yours')}</h2><p>{t('Pick your tools. Make yourself comfortable.')}</p></div><Button variant="ghost" size="sm" aria-label={t('Close customisation')} onClick={onClose}><X size={18}/></Button></header>
    <div className="desk-editor-body">
      <div className="desk-editor-preview"><DeskPreview personalisation={draft} seat={shared?{...furniture,desk:'plain'}:furniture}/><p>{draft.items.includes('note')?draft.note:t('A little space to make progress.')}</p></div>
      <div className="desk-editor-options">
        <div className="desk-editor-tabs" role="tablist" aria-label={t('Personalisation')}><button type="button" role="tab" id="desk-tools-tab" aria-controls="desk-tools-panel" aria-selected={tab==='desk'} tabIndex={tab==='desk'?0:-1} onClick={()=>setTab('desk')} onKeyDown={e=>{if(e.key==='ArrowRight'){setTab('student');document.getElementById('desk-student-tab')?.focus()}}}>{t('My desk')}</button><button type="button" role="tab" id="desk-student-tab" aria-controls="desk-student-panel" aria-selected={tab==='student'} tabIndex={tab==='student'?0:-1} onClick={()=>setTab('student')} onKeyDown={e=>{if(e.key==='ArrowLeft'){setTab('desk');document.getElementById('desk-tools-tab')?.focus()}}}>{t('My student')}</button></div>
        {tab==='desk'?<div role="tabpanel" id="desk-tools-panel" aria-labelledby="desk-tools-tab">
          <fieldset><legend>{t('Study with')}</legend><div className="desk-device-choices">{devices.map(({value,label,icon:Icon})=><button type="button" key={value} aria-pressed={furniture.device===value&&draft.items.includes('device')} onClick={()=>chooseDevice(value)}><Icon size={22} strokeWidth={1.5}/><span>{t(label)}</span></button>)}</div></fieldset>
          <fieldset><legend>{t('On your desk')}</legend><div className="desk-item-choices">{DESK_ITEMS.map(item=>{const Icon=icons[item];return <button type="button" key={item} aria-pressed={draft.items.includes(item)} onClick={()=>toggle(item)}><Icon size={16}/>{t(labels[item])}{draft.items.includes(item)&&<Check size={13}/>}</button>})}</div></fieldset>
          <fieldset><legend>{t('Your chair')}</legend><div className="desk-item-choices">{([{value:'office',label:'Upholstered'},{value:'stool',label:'Studio stool'},{value:'ergonomic',label:'Ergonomic mesh'},{value:'executive',label:'Executive leather'},{value:'lounge',label:'Designer lounge'},{value:'gaming',label:'Gaming chair'}] as const).map(({value,label})=><button type="button" key={value} aria-pressed={furniture.chair===value} onClick={()=>setFurniture({...furniture,desk:'plain',chair:value})}>{t(label)}</button>)}</div></fieldset>
        </div>:<div role="tabpanel" id="desk-student-panel" aria-labelledby="desk-student-tab"><p className="desk-model-hint">{t('Choose a student. See them at your desk.')}</p><div className="desk-models">{STUDENT_MODELS.map(model=><button type="button" key={model.id} className="world-model" aria-pressed={draft.model===model.id} onClick={()=>setDraft({...draft,model:model.id})}><StudentPortrait model={model.id}/><span>{t(model.label)}</span>{draft.model===model.id&&<Check size={14}/>}</button>)}</div></div>}
      </div>
    </div>
    <footer className="desk-editor-footer"><Button variant="ghost" onClick={onClose}>{t('Cancel')}</Button><Button variant="primary" iconLeft={Check} onClick={()=>{onSave(draft,furniture);onClose()}}>{t('Save my desk')}</Button></footer>
  </Dialog>
}
