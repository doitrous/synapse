import type { StudyPresence, StudyRoomDefinition } from '@/lib/rooms/studyWorld'
import { IllustratedRoom } from './IllustratedRoom'

/** The authored 2.5D room contains independent semantic seat controls. */
export function RoomDiorama({world,seats,selfId='',onSeat,selected=null,preview=false,bubbles}:{
  world:StudyRoomDefinition;seats:(StudyPresence|null)[];selfId?:string;onSeat?:(index:number)=>void;selected?:number|null;preview?:boolean;paused?:boolean;bubbles?:Map<number,{id:string;text:string;private?:boolean}>
}){
  return <div className={`room-fallback ${preview?'is-preview':''}`}>
    <div className="room-fallback-scroll"><IllustratedRoom world={world} seats={seats} selfId={selfId} selected={selected} preview={preview} onSeat={index=>onSeat?.(index)} bubbles={bubbles}/></div>

  </div>
}
