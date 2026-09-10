import { pool } from './db.js'
import { tableForSeat } from '../shared/roomLayouts.js'
export function canSeeActivity(tableId,viewerTableId){return tableId==null||Boolean(viewerTableId&&viewerTableId===tableId)}
export async function activityMembership(userId,partyId,conn=pool){
  const [rows]=await conn.query('SELECT p.layout_key AS layoutKey,m.seat_index AS seatIndex FROM study_parties p JOIN study_party_members m ON m.party_id=p.id AND m.user_id=? WHERE p.id=? AND p.archived_at IS NULL',[userId,partyId])
  return rows.length?{tableId:tableForSeat(rows[0].seatIndex,rows[0].layoutKey),layoutKey:rows[0].layoutKey}:null
}
export async function resolveActivityAudience(userId,partyId,scope='room'){
  const membership=await activityMembership(userId,partyId)
  if(!membership)return {ok:false,reason:'not_a_member'}
  if(scope!=='room'&&scope!=='table')return {ok:false,reason:'invalid_scope'}
  if(scope==='table'&&!membership.tableId)return {ok:false,reason:'sit_at_shared_table_first'}
  return {ok:true,tableId:scope==='table'?membership.tableId:null}
}
export async function mayAccessActivity(userId,partyId,tableId,conn=pool){
  const membership=await activityMembership(userId,partyId,conn)
  return Boolean(membership&&canSeeActivity(tableId,membership.tableId))
}
