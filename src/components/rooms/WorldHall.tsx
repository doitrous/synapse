import type { StudyPresence, StudyRoomDefinition } from '@/lib/rooms/studyWorld'
import { RoomDiorama } from './RoomDiorama'

export function WorldHall({world,seats,selfId,onSeat,selected,paused=false,bubbles}:{paused?:boolean;world:StudyRoomDefinition;seats:(StudyPresence|null)[];selfId:string;onSeat:(index:number)=>void;selected:number|null;bubbles?:Map<number,{id:string;text:string;private?:boolean}>}){
  return <RoomDiorama world={world} seats={seats} selfId={selfId} onSeat={onSeat} selected={selected} paused={paused} bubbles={bubbles}/>
}
