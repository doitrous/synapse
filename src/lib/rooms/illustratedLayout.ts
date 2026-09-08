import { roomSceneLayout } from './sceneLayout.ts'
import type { StudyRoomDefinition } from './studyWorld.ts'
export interface IllustratedPlace { indices:number[];x:number;y:number;width:number;discussion:boolean;privateDesk?:boolean }
/** Compact banks retain the exact seat/table membership of the walkable scene. */
export function illustratedLayout(world:Pick<StudyRoomDefinition,'style'|'capacity'>){
  const layout=roomSceneLayout(world)
  const groups=layout.tables.map(table=>layout.seats.filter(seat=>seat.table===table.id).map(seat=>seat.index))
  if(['collaboration','duo','cafe','lab','garden'].includes(world.style)){
    const duo=world.style==='duo',lab=world.style==='lab',rows=Math.ceil(groups.length/2)
    return {places:groups.map((indices,i)=>({indices,x:duo?245:65+(i%2)*475,y:duo?230:205+Math.floor(i/2)*250,width:duo?510:400,discussion:!duo&&!lab,privateDesk:duo})),height:duo?650:230+rows*250,hasDiscussion:!duo}
  }
  if(world.style==='library'&&world.capacity===12){
    const places:IllustratedPlace[]=groups.map((indices,i)=>i<2
      ?{indices,x:350,y:210+i*270,width:300,discussion:true}
      :{indices,x:(i-2)%2?695:35,y:210+Math.floor((i-2)/2)*270,width:270,discussion:false,privateDesk:true})
    return {places,height:740,hasDiscussion:true}
  }
  const discussions=groups.filter(group=>group.length>=4),regular=groups.filter(group=>group.length<4)
  const places:IllustratedPlace[]=discussions.map((indices,i)=>({indices,x:world.style==='discussion'?160+i*445:655,y:world.style==='discussion'?275:94,width:world.style==='discussion'?340:280,discussion:true}))
  let y=discussions.length?290:230
  for(let start=0;start<regular.length;){
    const solo=regular[start].length===1
    let run=0;while(start+run<regular.length&&(regular[start+run].length===1)===solo)run++
    const columns=solo&&run>=3?3:2,width=columns===3?250:310
    let count=0
    while(count<columns&&start+count<regular.length&&(regular[start+count].length===1)===solo){
      places.push({indices:regular[start+count],x:columns===3?120+count*295:150+count*445,y,width,discussion:false});count++
    }
    start+=count;y+=columns===3?178:195
  }
  const height=Math.max(world.style==='discussion'?535:570,y+25)
  return {places,height,hasDiscussion:discussions.length>0}
}
