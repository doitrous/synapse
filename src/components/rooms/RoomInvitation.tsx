import { useEffect,useState } from 'react'
import { Dialog } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { API_MODE,apiGet,apiPost } from '@/lib/api'
import { useT } from '@/lib/i18n'
import type { Party } from '@/lib/useParties'
export function RoomInvitation({id,onClose,onAccept}:{id:string;onClose:()=>void;onAccept:(party:Party,seatIndex:number|null)=>void}){
  const t=useT(),[invitation,setInvitation]=useState<{senderName:string;name:string;tableId:string|null}|null>(null),[message,setMessage]=useState(''),[busy,setBusy]=useState(false)
  useEffect(()=>{let active=true;if(!API_MODE){setMessage('Invitations need a connected account.');return}void apiGet<{invitation:typeof invitation}>(`/room-invitations/${encodeURIComponent(id)}`).then(result=>{if(active)setInvitation(result.invitation)}).catch(()=>{if(active)setMessage('This invitation has expired or is no longer available.')});return()=>{active=false}},[id])
  async function respond(accept:boolean){setBusy(true);setMessage('');try{const result=await apiPost<{ok:boolean;reason?:string;party?:Party;seatIndex:number|null}>(`/room-invitations/${encodeURIComponent(id)}/respond`,{accept});if(!result.ok){setMessage(result.reason==='table_full'?'This table is full. Ask for a new invitation when a seat is free.':'This invitation is no longer available.');return}if(result.party)onAccept(result.party,result.seatIndex);else onClose()}catch{setMessage('Could not respond. Check your connection and try again.')}finally{setBusy(false)}}
  return <Dialog label={t('Study invitation')} onClose={onClose}><div className="p-5"><h2 className="font-serif text-xl">{t(invitation?.tableId?'Join my table':'Study together')}</h2>{invitation?<><p className="my-3 text-sm">{invitation.senderName} {t('invited you to')} {invitation.tableId?t('their table in'):''} {invitation.name}.</p><div className="flex gap-2 justify-end"><Button disabled={busy} variant="ghost" onClick={()=>void respond(false)}>{t('Decline')}</Button><Button loading={busy} variant="primary" onClick={()=>void respond(true)}>{t('Accept invitation')}</Button></div></>:!message&&<p className="my-3" role="status">{t('Loading invitation…')}</p>}<p className="text-sm text-danger mt-3" role="status">{t(message)}</p></div></Dialog>
}
