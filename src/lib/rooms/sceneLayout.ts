import type { StudyRoomDefinition } from './studyWorld.ts'

export interface SceneSeat {
  index: number
  x: number
  z: number
  /** Rotation around vertical axis. Zero faces the back wall (-Z), never the camera. */
  rotation: number
  table: string
  shared: boolean
}
export interface SceneTable { id: string; x: number; z: number; width: number; depth: number }
export interface RoomSceneLayout { seats: SceneSeat[]; tables: SceneTable[] }

/** Every furniture mesh, person, pick target and HTML nameplate shares this coordinate map. */
export function roomSceneLayout(room: Pick<StudyRoomDefinition,'style'|'capacity'>): RoomSceneLayout {
  const seats: SceneSeat[] = []
  const tables: SceneTable[] = []
  const solo = (x:number,z:number) => {
    const id=`desk-${seats.length}`
    tables.push({id,x,z,width:1.95,depth:1.14})
    seats.push({index:seats.length,x,z,rotation:0,table:id,shared:false})
  }
  const pair = (x:number,z:number) => {
    const id=`pair-${seats.length}`
    tables.push({id,x,z,width:3.92,depth:1.14})
    for(const dx of [-1,1])seats.push({index:seats.length,x:x+dx,z,rotation:0,table:id,shared:true})
  }
  const discussion = (x:number,z:number) => {
    const id=`table-${seats.length}`
    tables.push({id,x,z,width:1.9,depth:3.3})
    // Side-facing students look across the tabletop; no audience-facing portrait row.
    for(const side of [-1,1])for(const dz of [-.85,.85]){
      seats.push({index:seats.length,x:x+side*.77,z:z+dz,rotation:side*Math.PI/2,table:id,shared:true})
    }
  }
  if(['collaboration','duo','cafe','lab','garden'].includes(room.style)){
    const count=room.style==='collaboration'?6:room.style==='duo'?2:room.style==='lab'?3:4
    for(let start=0;start<room.capacity;start+=count){
      const table=`${count===2?'pair':'table'}-${start}`,i=start/count,x=i%2?3.1:-3.1,z=-3+Math.floor(i/2)*3
      tables.push({id:table,x,z,width:count===3?4.6:3.6,depth:2.4})
      for(let seat=0;seat<count;seat++)seats.push({index:start+seat,x:x+(seat%Math.ceil(count/2)-.5)*1.2,z:z+(seat<Math.ceil(count/2)?-.8:.8),rotation:seat<Math.ceil(count/2)?Math.PI:0,table,shared:true})
    }
  }else if(room.capacity===20){
    for(const z of [-4.2,-1.55])for(const x of [-4.65,-1.55,1.55,4.65])solo(x,z)
    for(const x of [-4.4,0,4.4])pair(x,1.15)
    pair(-3.4,4.05);discussion(3.4,4.05)
  }else if(room.style==='discussion'){
    discussion(-3.2,-.4);discussion(3.2,-.4)
  }else if(room.style==='campus' && room.capacity===14){
    // The reference's two desk banks leave a clear central aisle and a rear conversation corner.
    solo(-4.65,-3.6);solo(-1.6,-3.6);discussion(3.45,-3.45)
    for(const z of [-.15,3.2]){pair(-3.4,z);pair(3.4,z)}
  }else if(room.style==='library' && room.capacity===12){
    discussion(0,-2.65);discussion(0,2.25)
    solo(-4.45,-3.4);solo(4.45,-3.4);solo(-4.45,2.5);solo(4.45,2.5)
  }else if(room.style==='library' && room.capacity===10){
    for(const z of [-3.2,.15])for(const x of [-4.7,-1.6,1.6,4.7])solo(x,z)
    solo(-3.1,3.4);solo(3.1,3.4)
  }else if(room.style==='courtyard' && room.capacity===16){
    for(const x of [-4.8,-1.6,1.6,4.8])solo(x,-4.2)
    pair(-3.4,-1.25);pair(3.4,-1.25)
    pair(-3.4,1.7);pair(-3.4,4.35);discussion(3.45,3.15)
  }else{
    const cols=room.capacity>16?5:4
    const rows=Math.ceil(room.capacity/cols)
    for(let i=0;i<room.capacity;i++)solo((i%cols-(cols-1)/2)*(cols===5?2.35:3.08),-3.9+Math.floor(i/cols)*(rows>3?2.65:3.55))
  }
  // Existing live capacities can differ from the five authored previews.
  if(seats.length!==room.capacity){
    return roomSceneLayout({style:'quiet',capacity:room.capacity})
  }
  return {seats,tables}
}
