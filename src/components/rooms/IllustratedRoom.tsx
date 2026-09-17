import { LoadingRegion } from '@/components/loading/SkeletonParts'
import { Skeleton } from '@/components/ui/Skeleton'
/** THESIS: A daylight study room assembled from real furniture and lifelike students.
 * OWN-WORLD: The supplied oak, blue upholstery and pale floor; Nishany controls surround it.
 * STORY: Find a free chair, sit, customise your desk, and study with your cohort.
 * FIRST VIEWPORT: Tall left windows, a rear quiet corner and discussion table, two desk banks.
 * FORM: User-pinned reference, layered 2.5D scene with independent semantic seat controls. */
import { Fragment, useEffect, useId, useState, type CSSProperties } from 'react'
import { Hand, Lock } from 'lucide-react'
import { useT } from '@/lib/i18n'
import { clockText, DEFAULT_PERSONALISATION, type StudyPresence, type StudyRoomDefinition } from '@/lib/rooms/studyWorld'
import { illustratedLayout } from '@/lib/rooms/illustratedLayout'
import { roomArtwork } from '@/lib/rooms/characterAtlas'
import { deskItemPositions, deskItemDepth } from '@/lib/rooms/deskLayout'
import { FurnitureSprite, ReferenceArchitecture, SeatedStudent, StudyDevice } from './ReferenceRoomArt'
import { StudyStatusIcon } from './StudyStatusIcon'
import { LibraryArchitecture, LibraryProp, libraryArtwork } from './LibraryRoomArt'
import './illustratedRoom.css'

const position=(x:number,y:number,w:number):CSSProperties=>({left:`${x}%`,top:`${y}%`,width:`${w}%`})

export function IllustratedRoom({world,seats,selfId,onSeat,selected,preview=false,bubbles,selfElapsedSeconds}:{preview?:boolean;world:StudyRoomDefinition;seats:(StudyPresence|null)[];selfId:string;onSeat:(index:number)=>void;selected:number|null;bubbles?:Map<number,{id:string;text:string;private?:boolean}>;selfElapsedSeconds?:number}){
  const t=useT(),[showNames,setShowNames]=useState(false),[expanded,setExpanded]=useState(false)
  const id=useId().replaceAll(':',''),[artState,setArtState]=useState<'loading'|'ready'|'error'>('loading'),[artRetry,setArtRetry]=useState(0)
  const library=world.style==='library'&&world.capacity===12
  // The full room holds its art behind a skeleton until every sprite has
  // preloaded, so the layered 2.5D scene appears all at once rather than
  // architecture-then-furniture. A lobby thumbnail (`preview`) has no such need
  // and the gate actively hurt it: on a cold cache every card sat under a
  // skeleton until its sprites loaded, so the room list showed *no* images until
  // the student had entered a room and warmed the cache. Previews now render the
  // sprites straight away — the browser paints them as they arrive, just like
  // the room a round-trip used to reveal — so the preload only runs off-preview.
  useEffect(()=>{
    if(preview)return
    let active=true;setArtState('loading')
    Promise.all([...roomArtwork,...(library?[libraryArtwork]:[])].map(src=>new Promise<void>((resolve,reject)=>{const image=new Image();image.onload=()=>resolve();image.onerror=()=>reject();image.src=src}))).then(()=>{if(active)setArtState('ready')},()=>{if(active)setArtState('error')})
    return()=>{active=false}
  },[artRetry,library,preview])
  const {places,height,hasDiscussion}=illustratedLayout(world)
  const personArt=(index:number,x:number,y:number,width:number,front=false)=>{
    const person=seats[index]
    return person?<Fragment key={`person-${index}`}><SeatedStudent seatIndex={index} model={(person.personalisation??DEFAULT_PERSONALISATION).model} front={front} chair={person.seat.chair} stool={person.seat.chair==='stool'} style={position(x,y,width)}/>{person.handRaised&&<span data-raised-hand={index} className="reference-raised-hand" style={{left:`${x+width*.84}%`,top:`${y+4}%`}} title={t('Hand raised')} aria-hidden="true"><Hand size={14}/></span>}</Fragment>:<FurnitureSprite key={`chair-${index}`} kind={front?'chair-front':'chair'} style={{...position(x-3,y+19,width+6),height:'auto'}}/>

  }
  const items=(index:number,x:number,y:number,scale=1,facingStudent=false)=>{
    const person=seats[index];if(!person)return null
    const personal=person.personalisation??DEFAULT_PERSONALISATION
    const slots=deskItemPositions(personal.items,person.seat.device)
    return <div key={`desk-items-${index}`} className="reference-desk-items" style={{left:`${x}%`,top:`${y}%`,width:`${scale*42}%`}} aria-hidden="true">{personal.items.map(item=>{
      const offset=(slots.get(item)??0)*30+50
      return <span key={item} className={`reference-item item-${item}`} style={{left:`${offset}%`,top:`${deskItemDepth(item)*1.1}%`}}>
        {item==='device'?<StudyDevice device={person.seat.device} facingStudent={facingStudent}/>:item==='plant'?<FurnitureSprite kind="plant"/>:item==='notebook'?<span className="reference-notebook"><i/><i/></span>:item==='cup'?<span className="reference-cup"/>:<span className="reference-note" title={personal.note}>{personal.note}</span>}
      </span>
    })}</div>
  }
  return <div className={`reference-room reference-${world.style} ${preview?'is-preview':''} ${expanded?'is-expanded':''}`} style={{'--reference-ratio':1000/height,'--library-prop-matte':`url('#${id}-library-prop-matte')`,'--reference-matte':`url('#${id}-reference-white-matte')`} as CSSProperties}>
    {!preview&&<div className="reference-room-options"><div className="reference-seat-legend" aria-label={t('Seat availability')}><span><i className="legend-available"/>{t('Available')}</span><span><i className="legend-occupied"/>{t('Occupied')}</span><span><i className="legend-self"/>{t('You')}</span></div><div className="reference-room-view-actions"><button type="button" className="reference-size-toggle" aria-pressed={expanded} onClick={()=>setExpanded(!expanded)}>{t(expanded?'Fit to screen':'Larger view')}</button><button type="button" aria-pressed={showNames} onClick={()=>setShowNames(!showNames)}>{t(showNames?'Hide names':'Show names')}</button></div></div>}
    {!preview&&artState==='error'&&<div className="reference-art-status" role="status">{t('Some room artwork could not load. You can still use the seats below.')}<button type="button" onClick={()=>setArtRetry(artRetry+1)}>{t('Retry artwork')}</button></div>}
    <div className="reference-room-pan" tabIndex={preview?undefined:0} aria-label={t('Room layout — scroll to explore')}>
      <div className="reference-room-stage" style={{aspectRatio:`1000 / ${height}`}}>
        {!preview&&artState==='loading'&&<LoadingRegion label={t('Preparing room artwork…')} className="pointer-events-none absolute inset-0 z-10"><Skeleton className="size-full" /></LoadingRegion>}
        <>{library?<LibraryArchitecture height={height} id={id}/>:<ReferenceArchitecture height={height} roomStyle={world.style} id={id} hasDiscussion={hasDiscussion}/>}</>
        {!library&&<>
        {/* No lone chair against the back wall — it read as a seat but had no
            desk or pick target, so students clicked it and nothing happened.
            Every real seat is a data-driven .reference-seat-target below. */}
        <FurnitureSprite kind="plant" style={{left:'2%',top:'25%',width:'9%',height:'auto'}}/>
        <FurnitureSprite kind="plant" style={{left:'50%',top:'55%',width:'10%',height:'auto'}}/>
        <FurnitureSprite kind="plant" style={{left:'88%',top:'13%',width:'10%',height:'auto'}}/>
        <FurnitureSprite kind="plant" style={{left:'0%',top:'80%',width:'13%',height:'auto'}}/>
        </>}
        {library&&[0,1].map(i=><FurnitureSprite key={i} kind="plant" style={{left:i?'91%':'0%',top:'12%',width:'9%',height:'auto'}}/>)}
        {places.map(place=><div key={place.indices[0]} className={`reference-station ${place.discussion?'is-discussion':''} ${place.privateDesk?'is-private':''}`} style={{left:`${place.x/10}%`,top:`${place.y/height*100}%`,width:`${place.width/10}%`,zIndex:Math.floor(place.y)}}>
          {place.privateDesk?<LibraryProp kind="platform" style={{left:'-10%',top:'26%',width:'120%'}}/>:<div className="reference-rug"/>}
          {place.discussion&&place.indices.slice(0,Math.ceil(place.indices.length/2)).map((index,i)=>personArt(index,place.indices.length===6?12+i*28:18+i*34,-13,place.indices.length===6?21:25,true))}
          <FurnitureSprite kind={place.discussion?'round':'desk'} style={{left:0,top:place.discussion?'1%':'-6%',width:'100%',height:'auto'}}/>
          {place.discussion&&<div className="reference-far-hands">{place.indices.slice(0,Math.ceil(place.indices.length/2)).map((index,i)=>personArt(index,place.indices.length===6?12+i*28:18+i*34,-13,place.indices.length===6?21:25,true))}</div>}
          {!place.discussion&&place.indices.map((index,i)=>items(index,place.indices.length===1?29:place.indices.length===3?3+i*30:8+i*43,20,place.indices.length===1?1:place.indices.length===3?.52:.72))}
          {place.discussion&&place.indices.map((index,i)=>items(index,place.indices.length===6?7+(i%3)*29:14+(i%2)*36,i<Math.ceil(place.indices.length/2)?22:34,place.indices.length===6?.43:.62,i<Math.ceil(place.indices.length/2)))}
          {(place.discussion?place.indices.slice(Math.ceil(place.indices.length/2)):place.indices).map((index,i)=>{
            const personal=seats[index]?.personalisation??DEFAULT_PERSONALISATION
            const slots=deskItemPositions(personal.items,seats[index]?.seat.device??'laptop')
            const shift=(slots.get('device')??0)*(place.indices.length===1?13:6)
            return personArt(index,(place.discussion?(place.indices.length===6?12+i*28:18+i*34):place.indices.length===1?34:place.indices.length===3?8+i*30:14+i*43)+shift,place.discussion?31:10,place.indices.length===6?21:place.indices.length===3?24:place.discussion?25:30)
          })}
          {library&&<><span className="library-lamp-pool"/><LibraryProp kind="lamp" style={{left:place.discussion?'43%':'68%',top:place.discussion?'-6%':'-22%',width:place.discussion?'14%':'23%'}}/></>}
          {place.privateDesk&&<span className="library-private-label">{t('Private desk')}</span>}
          {place.indices.length===1&&seats[place.indices[0]]?.seat.desk==='drawer'&&<span className="reference-drawer"/>}
          {place.indices.length===1&&seats[place.indices[0]]?.seat.desk==='corner'&&<span className="reference-corner-extension"/>}
          {!preview&&place.indices.map((index,i)=>{
            const person=seats[index],self=person?.id===selfId
            const elapsedSeconds=self&&selfElapsedSeconds!==undefined?selfElapsedSeconds:person?.elapsedSeconds
            return <button key={index} type="button" data-reference-seat={index} className={`reference-seat-target ${self?'is-self':''} ${person?'':'is-empty'}`} style={{left:place.discussion?`${3+(i%Math.ceil(place.indices.length/2))*(94/Math.ceil(place.indices.length/2))}%`:place.indices.length===1?'3%':`${2+i*(96/place.indices.length)}%`,top:place.discussion?(i<Math.ceil(place.indices.length/2)?'-29%':'82%'):'84%',width:place.discussion?`${90/Math.ceil(place.indices.length/2)}%`:`${94/place.indices.length}%`}} onClick={()=>onSeat(index)} aria-pressed={selected===index} aria-label={person?`${person.name}, ${t(person.status??'In the room')}${person.handRaised?`, ${t('Hand raised')}`:''}, ${t('desk')} ${index+1}. ${t('View student details')}`:`${t('Sit at desk')} ${index+1}`}>
              <b>{index+1}</b>{person?.status&&<i className="reference-status-icon" title={t(person.status)}><StudyStatusIcon status={person.status} size={13}/></i>}{!person&&<i className="reference-availability-mark" aria-hidden="true">+</i>}{showNames&&<span><strong>{person?(self?t('You'):person.name.split(' ')[0]):t('Sit here')}</strong>{person&&<small><i data-status={person.status}/>{elapsedSeconds===undefined?t('Here'):clockText(elapsedSeconds)}</small>}</span>}
            </button>
          })}
          {!preview&&bubbles&&place.indices.map((index,i)=>{
            const bubble=bubbles.get(index)
            if(!bubble)return null
            const half=Math.ceil(place.indices.length/2)
            const left=place.discussion?`${3+(i%half)*(94/half)}%`:place.indices.length===1?'3%':`${2+i*(96/place.indices.length)}%`
            const width=place.discussion?`${90/half}%`:`${94/place.indices.length}%`
            // Float over the seated student's head; discussion tops sit lower.
            const top=place.discussion?(i<half?'6%':'62%'):'-7%'
            return <div key={`bubble-${index}`} className={`reference-chat-bubble animate-pop ${bubble.private?'is-private':''}`} style={{left,width,top}}><span>{bubble.private&&<Lock size={10} aria-label={t('Private')}/>}<b>{bubble.text}</b></span></div>
          })}
        </div>)}
      </div>
    </div>
  </div>
}
