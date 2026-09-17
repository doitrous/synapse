import type { StudyPresence, StudyRoomDefinition } from '@/lib/rooms/studyWorld'
import { RoomDiorama } from './RoomDiorama'

export function WorldHall({world,seats,selfId,onSeat,selected,paused=false,bubbles,selfElapsedSeconds}:{paused?:boolean;world:StudyRoomDefinition;seats:(StudyPresence|null)[];selfId:string;onSeat:(index:number)=>void;selected:number|null;bubbles?:Map<number,{id:string;text:string;private?:boolean}>;selfElapsedSeconds?:number}){
  return <RoomDiorama world={world} seats={seats} selfId={selfId} onSeat={onSeat} selected={selected} paused={paused} bubbles={bubbles} selfElapsedSeconds={selfElapsedSeconds}/>
}
