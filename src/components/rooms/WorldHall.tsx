import type { StudyPresence, StudyRoomDefinition } from '@/lib/rooms/studyWorld'
import { RoomDiorama } from './RoomDiorama'

export function WorldHall({world,seats,selfId,onSeat,selected,paused=false}:{paused?:boolean;world:StudyRoomDefinition;seats:(StudyPresence|null)[];selfId:string;onSeat:(index:number)=>void;selected:number|null}){
  return <RoomDiorama world={world} seats={seats} selfId={selfId} onSeat={onSeat} selected={selected} paused={paused}/>
}
