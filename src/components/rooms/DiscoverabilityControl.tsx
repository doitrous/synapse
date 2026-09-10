import { useEffect,useState } from 'react'
import { Eye,EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { API_MODE,apiGet,apiPost } from '@/lib/api'
import { usePersistentState } from '@/lib/usePersistentState'
import { useT } from '@/lib/i18n'
export function DiscoverabilityControl(){
  const t=useT(),[preview,setPreview]=usePersistentState('nishany.discoverability.preview.v1',false),[enabled,setEnabled]=useState(false),[busy,setBusy]=useState(API_MODE),[message,setMessage]=useState(''),[loaded,setLoaded]=useState(!API_MODE)
  useEffect(()=>{if(!API_MODE)return;let active=true;void apiGet<{discoverable:boolean}>('/account/discoverable').then(result=>{if(active){setEnabled(result.discoverable);setLoaded(true)}}).catch(()=>{if(active)setMessage('Could not load your privacy setting. Reopen this page to retry.')}).finally(()=>{if(active)setBusy(false)});return()=>{active=false}},[])
  const on=API_MODE?enabled:preview
  async function toggle(){setBusy(true);setMessage('');try{if(API_MODE){const result=await apiPost<{ok:boolean;discoverable:boolean}>('/account/discoverable',{discoverable:!on});if(!result.ok)throw new Error();setEnabled(result.discoverable);window.dispatchEvent(new Event('nishany:discoverability-changed'))}else setPreview(!on);setMessage(API_MODE?(!on?'Classmates can now find you. You can turn this off anytime.':'You are hidden from the student directory.'):'Preview preference saved. Other students cannot see this demo account.')}catch{setMessage('Could not update discoverability. Check your connection and try again.')}finally{setBusy(false)}}
  return <div className="mt-3"><Button className="w-full whitespace-normal text-center" variant={on?'secondary':'primary'} size="sm" iconLeft={on?EyeOff:Eye} aria-pressed={on} loading={busy} disabled={!loaded} onClick={()=>void toggle()}>{t(on?'Turn off discoverability':'Opt in · let classmates find me')}</Button><p className="text-xs text-ink-2 mt-2" role="status">{t(message)}</p></div>
}
