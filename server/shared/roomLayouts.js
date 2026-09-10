/** Seat membership shared by the renderer, reservations, voice, and activities. */
export const ROOM_LAYOUTS = {
  legacy: {style:'campus',capacity:20,groups:[1,1,1,1,1,1,1,1,2,2,2,2,4]},
  quiet: {style:'quiet',capacity:12,groups:[1,1,1,1,1,1,1,1,1,1,1,1]},
  campus: {style:'campus',capacity:14,groups:[1,1,4,2,2,2,2]},
  discussion: {style:'discussion',capacity:8,groups:[4,4]},
  library: {style:'library',capacity:12,groups:[4,4,1,1,1,1]},
  courtyard: {style:'courtyard',capacity:16,groups:[1,1,1,1,2,2,2,2,4]},
  collaboration: {style:'collaboration',capacity:24,groups:[6,6,6,6]},
  duo: {style:'duo',capacity:2,groups:[2]},
  cafe: {style:'cafe',capacity:24,groups:[4,4,4,4,4,4]},
  lab: {style:'lab',capacity:18,groups:[3,3,3,3,3,3]},
  garden: {style:'garden',capacity:16,groups:[4,4,4,4]},
}
export function roomLayout(key='legacy') { return ROOM_LAYOUTS[key] ?? ROOM_LAYOUTS.legacy }
export function tableForSeat(index,key='legacy') {
  if(!Number.isInteger(index)||index<0)return null
  let first=0
  for(const count of roomLayout(key).groups){
    if(index<first+count)return count===1?null:`${count===2?'pair':'table'}-${first}`
    first+=count
  }
  return null
}
