import { randomUUID } from 'node:crypto'
import { pool } from './db.js'
import { partyFor, joinByCode, setSeat, cohortFor } from './parties.js'
import { canJoin } from './partyRules.js'
import { tableForSeat,roomLayout } from '../shared/roomLayouts.js'

export async function inviteToRoom(senderId,partyId,{recipientId,scope='room'}={}){
  const party=await partyFor(senderId,partyId)
  if(!party||party.archivedAt)return {ok:false,reason:'not_found'}
  if(typeof recipientId!=='string'||recipientId===senderId||!['room','table'].includes(scope))return {ok:false,reason:'invalid_invitation'}
  let tableId=null
  if(scope==='table'){
    tableId=tableForSeat(party.members.find(m=>m.userId===senderId)?.seat?.seatIndex,party.layoutKey)
    if(!tableId||!party.members.some(m=>m.userId===recipientId))return {ok:false,reason:'same_room_required'}
    if(tableForSeat(party.members.find(m=>m.userId===recipientId)?.seat?.seatIndex,party.layoutKey)===tableId)return {ok:false,reason:'already_at_table'}
  }else{
    const [a,b]=[senderId,recipientId].sort()
    const [friends]=await pool.query("SELECT 1 FROM friendships WHERE user_a=? AND user_b=? AND status='accepted'",[a,b])
    if(!friends.length)return {ok:false,reason:'friends_only'}
    const cohort=await cohortFor(recipientId)
    if(!cohort||!canJoin(party,cohort).ok)return {ok:false,reason:'wrong_cohort'}
  }
  const [recent]=await pool.query('SELECT COUNT(*) AS count FROM study_room_invitations WHERE sender_id=? AND created_at>DATE_SUB(NOW(),INTERVAL 1 HOUR)',[senderId])
  if(Number(recent[0].count)>=20)return {ok:false,reason:'invitation_limit'}
  const [pending]=await pool.query("SELECT id FROM study_room_invitations WHERE sender_id=? AND recipient_id=? AND party_id=? AND status='pending' AND expires_at>NOW() AND table_id <=> ?",[senderId,recipientId,partyId,tableId])
  if(pending.length)return {ok:true,id:pending[0].id}
  const id=randomUUID()
  await pool.query('INSERT INTO study_room_invitations (id,party_id,sender_id,recipient_id,table_id,expires_at) VALUES (?,?,?,?,?,DATE_ADD(NOW(),INTERVAL 1 DAY))',[id,partyId,senderId,recipientId,tableId])
  return {ok:true,id}
}
export async function roomInvitationFor(userId,id){
  const [rows]=await pool.query(`SELECT i.id,i.party_id AS partyId,i.table_id AS tableId,i.sender_id AS senderId,p.code,p.name,p.layout_key AS layoutKey,COALESCE(s.name,'A student') AS senderName FROM study_room_invitations i JOIN study_parties p ON p.id=i.party_id LEFT JOIN students s ON s.user_id=i.sender_id WHERE i.id=? AND i.recipient_id=? AND i.status='pending' AND i.expires_at>NOW() AND p.archived_at IS NULL`,[id,userId])
  return rows[0]??null
}
export async function respondToRoomInvitation(userId,id,accept){
  const invite=await roomInvitationFor(userId,id)
  if(!invite)return {ok:false,reason:'invitation_expired'}
  if(accept!==true&&accept!==false)return {ok:false,reason:'invalid_response'}
  if(!accept){await pool.query("UPDATE study_room_invitations SET status='declined',read_at=NOW() WHERE id=? AND recipient_id=?",[id,userId]);return {ok:true}}
  // Accepting a table request moves the recipient to a free seat at the
  // inviter's table — but only if the inviter is still sitting there, so a
  // stale invite can't drag someone to an empty corner.
  let seatIndex=null
  if(invite.tableId){
    const party=await partyFor(userId,invite.partyId)
    if(!party||!party.members.some(m=>m.userId===invite.senderId))return {ok:false,reason:'invitation_expired'}
    if(tableForSeat(party.members.find(m=>m.userId===invite.senderId)?.seat?.seatIndex,party.layoutKey)!==invite.tableId)return {ok:false,reason:'invitation_expired'}
    const candidates=Array.from({length:roomLayout(party.layoutKey).capacity},(_,i)=>i).filter(i=>tableForSeat(i,party.layoutKey)===invite.tableId&&!party.members.some(m=>m.userId!==userId&&m.seat?.seatIndex===i))
    for(const index of candidates){const result=await setSeat(userId,party.id,{seatIndex:index});if(result.ok){seatIndex=index;break}if(result.reason!=='seat_taken')return result}
    if(seatIndex===null)return {ok:false,reason:'table_full'}
  }else{
    const result=await joinByCode(userId,invite.code)
    if(!result.ok)return result
  }
  await pool.query("UPDATE study_room_invitations SET status='accepted',read_at=NOW() WHERE id=? AND recipient_id=?",[id,userId])
  return {ok:true,party:await partyFor(userId,invite.partyId),seatIndex}
}
export async function roomInvitationNotifications(userId){
  const [rows]=await pool.query(`SELECT i.id,i.table_id AS tableId,i.created_at AS createdAt,p.code,p.name,COALESCE(s.name,'A student') AS senderName FROM study_room_invitations i JOIN study_parties p ON p.id=i.party_id LEFT JOIN students s ON s.user_id=i.sender_id WHERE i.recipient_id=? AND i.status='pending' AND i.expires_at>NOW() AND p.archived_at IS NULL ORDER BY i.created_at DESC LIMIT 30`,[userId])
  return rows.map(row=>({id:`room-invite-${row.id}`,title:row.tableId?'Join my table':'Study room invitation',message:`${row.senderName} invited you to ${row.tableId?'their table in ':''}${row.name}.`,to:`/app/study-rooms?invitation=${encodeURIComponent(row.id)}`,active:true,delivery:'Immediate',automation:'None',leadMinutes:0,universityIds:[],years:[],groups:[],createdAt:row.createdAt,scheduledAt:row.createdAt,sentAt:row.createdAt}))
}
