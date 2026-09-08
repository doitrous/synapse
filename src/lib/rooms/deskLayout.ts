import type { DeskItem } from './studyWorld.ts'
import type { SeatDevice } from './roomPresence.ts'

/** Fixed work zones: device in reach, reading and accessories beside it. */
export function deskItemPositions(items:readonly DeskItem[],device:SeatDevice):Map<DeskItem,number>{
  const slots:Record<DeskItem,number>={device:0,notebook:device==='desktop'?1.12:.95,plant:-1.15,cup:1.35,note:-.67}
  return new Map(items.map(item=>[item,slots[item]]))
}
export function deskItemDepth(item:DeskItem):number {
  return {device:0,notebook:11,plant:-7,cup:-7,note:11}[item]
}
