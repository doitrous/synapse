import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Copy, Search, UserPlus, X } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { Field, Select, TextInput } from '@/components/ui/Field'
import { API_MODE, apiGet, apiPost } from '@/lib/api'
import { useIdentity } from '@/lib/useIdentity'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { universities as defaults } from '@/data/universities'
import { FRIEND_REFUSALS } from '@/lib/useFriends'
import { useT } from '@/lib/i18n'

type Match={userId:string;displayName:string;username:string;universityId:string;year:string;relationship:'none'|'friends'|'incoming'|'outgoing'}
const previewStudents:Match[]=[{userId:'preview-nora',displayName:'Nora Hassan',username:'neuro-nora',universityId:'asu',year:'Year 1',relationship:'none'},{userId:'preview-karim',displayName:'Karim Adel',username:'cardio-karim',universityId:'asu',year:'Year 1',relationship:'none'},{userId:'preview-hana',displayName:'Hana Samir',username:'hema-hana',universityId:'asu',year:'Year 1',relationship:'none'}]

export function AddFriendButton({onAdded}:{onAdded:()=>void}) {
  const t=useT(), identity=useIdentity(), [catalogue]=useUniversityCatalogue()
  const universities=catalogue.length?catalogue:defaults
  const [open,setOpen]=useState(false),[username,setUsername]=useState(''),[university,setUniversity]=useState('')
  const [busy,setBusy]=useState(false),[sending,setSending]=useState<string|null>(null),[message,setMessage]=useState(''),[matches,setMatches]=useState<Match[]|null>(null)
  const requestVersion=useRef(0)
  const invalidate=()=>{requestVersion.current++;setBusy(false);setMatches(null);setMessage('')}
  async function search() {
    const version=++requestVersion.current
    setBusy(true);setMessage('');setMatches(null)
    try {
      const result=API_MODE?await apiGet<{ok:boolean;reason?:string;people:Match[]}>(`/friends/username?username=${encodeURIComponent(username)}&universityId=${encodeURIComponent(university)}`):{ok:true,people:previewStudents.filter(person=>person.username===username.trim().replace(/^@/,'').toLowerCase()&&(!university||person.universityId===university))}
      if(version!==requestVersion.current)return
      if(!result.ok){setMessage(t('Enter the full username, with or without @.'));return}
      setMatches(result.people)
      if(!result.people.length)setMessage(t('No student found. Check the username and university.'))
    } catch {if(version===requestVersion.current)setMessage(t('Could not search. Check your connection and try again.'))}
    finally {if(version===requestVersion.current)setBusy(false)}
  }
  async function send(person:Match) {
    if(!API_MODE)return
    setSending(person.userId);setMessage('')
    try {
      const result=await apiPost<{ok:boolean;reason?:string}>('/friends/request',{userId:person.userId})
      setMessage(t(result.ok?'Friend request sent. They can accept it from Friends.':FRIEND_REFUSALS[result.reason??'']??'Could not send the request. Try again.'))
      if(result.ok){setMatches(current=>current?.map(match=>match.userId===person.userId?{...match,relationship:'outgoing'}:match)??null);onAdded()}
    } catch {setMessage(t('Check your connection and try again.'))}
    finally {setSending(null)}
  }
  return <><Button size="sm" iconLeft={UserPlus} onClick={()=>{invalidate();setOpen(true)}}>{t('Add')}</Button>
    {open&&<Dialog label={t('Add a friend by username')} onClose={()=>{invalidate();setOpen(false)}}>
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3"><h2 className="font-serif text-xl">{t('Add a friend by username')}</h2><Button size="sm" variant="ghost" aria-label={t('Close add friend')} onClick={()=>{invalidate();setOpen(false)}}><X size={18}/></Button></div>
        <p className="text-sm text-ink-2">{t('Search the full username they shared, then send a request to the right student.')}</p>
        <form className="space-y-3" onSubmit={e=>{e.preventDefault();void search()}}>
          <Field label={t('Their username')}><TextInput aria-label={t('Their username')} autoComplete="off" autoCapitalize="none" spellCheck={false} maxLength={33} placeholder="@username" value={username} onChange={e=>{invalidate();setUsername(e.target.value)}}/></Field>
          <Field label={t('Their university')}><Select aria-label={t('Their university')} value={university} onChange={e=>{invalidate();setUniversity(e.target.value)}}><option value="">{t('All universities')}</option>{universities.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}</Select></Field>
          <Button type="submit" variant="primary" iconLeft={Search} loading={busy} disabled={!username.trim()}>{t('Search')}</Button>
        </form>
        {!API_MODE&&<p className="text-xs text-ink-2">{t('Preview search: try @neuro-nora. Sign in to send real friend requests.')}</p>}
        {matches&&matches.length>0&&<ul className="divide-y divide-line rounded-lg border border-line" aria-label={t('Matching students')}>{matches.map(person=><li key={person.userId} className="flex flex-wrap items-center gap-3 p-3">
          <Avatar name={person.displayName} size="sm"/><div className="min-w-0 flex-1"><strong className="block text-sm">{person.displayName}</strong><span className="block text-xs text-ink-2">@{person.username}</span><span className="block text-xs text-ink-3">{universities.find(u=>u.id===person.universityId)?.name??person.universityId} · {person.year}</span></div>
          <Button size="sm" disabled={!API_MODE||person.relationship!=='none'||sending!==null} loading={sending===person.userId} onClick={()=>void send(person)}>{t(person.relationship==='friends'?'Friends':person.relationship==='outgoing'?'Request sent':person.relationship==='incoming'?'Request received':'Send request')}</Button>
        </li>)}</ul>}
        <p role="status" className="text-sm text-ink-2">{message}</p>
        <div className="border-t border-line pt-4 text-sm text-ink-2">{identity.profile.username?<div className="flex flex-wrap items-center justify-between gap-3"><span>{t('Your username')}: <strong>@{identity.profile.username}</strong></span><Button size="sm" aria-label={t('Copy your username')} iconLeft={Copy} onClick={()=>void navigator.clipboard.writeText(`@${identity.profile.username}`).then(()=>setMessage(t('Username copied.'))).catch(()=>setMessage(t('Could not copy. You can select your username above.')))}>{t('Copy')}</Button></div>:<Link to="/app/account" className="underline">{t('Set your own username in Account')}</Link>}</div>
      </div>
    </Dialog>}
  </>
}
