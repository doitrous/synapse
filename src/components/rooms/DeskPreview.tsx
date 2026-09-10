import { useId, type CSSProperties } from 'react'
import type { DeskPersonalisation } from '@/lib/rooms/studyWorld'
import type { SeatPreference } from '@/lib/rooms/roomPresence'
import { useT } from '@/lib/i18n'
import { FurnitureSprite, SeatedStudent, StudyDevice, ReferenceMatte } from './ReferenceRoomArt'
import { deskItemPositions, deskItemDepth } from '@/lib/rooms/deskLayout'

export function DeskPreview({personalisation,seat}:{personalisation:DeskPersonalisation;seat:SeatPreference}){
  const id=useId().replaceAll(':',''),t=useT(),positions=deskItemPositions(personalisation.items,seat.device)
  const person=<SeatedStudent model={personalisation.model} chair={seat.chair} front style={{left:'35%',top:'12%',width:'30%'}}/>
  return <div className="reference-preview-wrap"><div className="reference-preview-switch"><span>{t('Your desk · front view')}</span></div>
    <div className="reference-desk-preview desk-preview-front" role="img" aria-label={t('Front view of your student and desk customisations')} style={{'--reference-matte':`url('#${id}-reference-white-matte')`} as CSSProperties}>
      <svg style={{position:'absolute',width:0,height:0}} aria-hidden="true"><defs><ReferenceMatte id={id}/></defs></svg>
      <div className="reference-rug"/>{person}
      <FurnitureSprite kind="desk" style={{left:0,top:'15%',width:'100%',height:'auto'}}/>
      <div className="reference-far-hands">{person}</div>
      {personalisation.items.map(item=><span key={item} className={`reference-preview-item preview-${item}`} style={{left:`${50+(positions.get(item)??0)*27}%`,top:`${36+deskItemDepth(item)*.55}%`}}>
        {item==='device'?<StudyDevice device={seat.device} facingStudent/>:item==='plant'?<FurnitureSprite kind="plant"/>:item==='notebook'?<span className="reference-notebook"><i/><i/></span>:item==='cup'?<span className="reference-cup"/>:<span className="reference-note">{personalisation.note}</span>}
      </span>)}

    </div>
  </div>
}
