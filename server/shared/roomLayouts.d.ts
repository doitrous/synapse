export type RoomLayoutKey = 'legacy'|'quiet'|'campus'|'discussion'|'library'|'courtyard'|'collaboration'|'duo'|'cafe'|'lab'|'garden'
export interface SharedRoomLayout {style:Exclude<RoomLayoutKey,'legacy'>;capacity:number;groups:number[]}
export const ROOM_LAYOUTS:Record<RoomLayoutKey,SharedRoomLayout>
export function roomLayout(key?:string):SharedRoomLayout
export function tableForSeat(index:number,key?:string):string|null
