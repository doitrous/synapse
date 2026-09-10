import type { RoomSceneLayout } from './sceneLayout.ts'
export interface FloorPoint{x:number;z:number}
export function openFloor(point:FloorPoint,layout:RoomSceneLayout,selfIndex:number){
  if(point.x< -6||point.x>6||point.z< -5.15||point.z>6.15)return false
  if(layout.tables.some(t=>Math.abs(point.x-t.x)<t.width/2+.22&&Math.abs(point.z-t.z)<t.depth/2+.22))return false
  return !layout.seats.some(s=>s.index!==selfIndex&&Math.hypot(point.x-s.x-Math.sin(s.rotation)*1.05,point.z-s.z-Math.cos(s.rotation)*1.05)<.43)
}
/** A bounded aisle route. No walking through desks or other students' chairs. */
export function walkRoute(from:FloorPoint,to:FloorPoint,layout:RoomSceneLayout,selfIndex:number):FloorPoint[]{
  if(!openFloor(to,layout,selfIndex))return []
  const step=.3,key=(p:FloorPoint)=>`${Math.round(p.x/step)},${Math.round(p.z/step)}`
  const start={x:Math.round(from.x/step)*step,z:Math.round(from.z/step)*step},target={x:Math.round(to.x/step)*step,z:Math.round(to.z/step)*step}
  if(!openFloor(target,layout,selfIndex))return []
  const queue=[start],visited=new Map<string,FloorPoint|null>([[key(start),null]])
  for(let cursor=0;cursor<queue.length&&cursor<2000;cursor++){
    const point=queue[cursor]
    if(key(point)===key(target)){
      const path:FloorPoint[]=[to];let current:FloorPoint|null=point
      while(current){path.push(current);current=visited.get(key(current))??null}
      return path.reverse()
    }
    for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){
      const next={x:point.x+dx*step,z:point.z+dz*step},id=key(next)
      if(visited.has(id)||!openFloor(next,layout,selfIndex))continue
      visited.set(id,point);queue.push(next)
    }
  }
  return []
}
