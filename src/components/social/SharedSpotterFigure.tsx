import { useEffect,useState } from 'react'
import { resolveMediaSource } from '@/lib/mediaStorage'
export function SharedSpotterFigure({payload}:{payload:Record<string,unknown>}){
  const image=typeof payload.image==='string'?payload.image:'',at=payload.at as {x:number;y:number}|undefined
  const [url,setUrl]=useState(''),[error,setError]=useState(false)
  useEffect(()=>{let active=true,revoke:()=>void=()=>{};setUrl('');setError(false);if(!image)return;void resolveMediaSource(image).then(result=>{revoke=()=>{if(result.revoke)URL.revokeObjectURL(result.url)};if(active)setUrl(result.url);else revoke()}).catch(()=>{if(active)setError(true)});return()=>{active=false;revoke()}},[image])
  if(!image||!at)return <p role="alert">The image for this round is unavailable.</p>
  if(error)return <p role="alert">The image could not load. Reopen this game to retry.</p>
  if(!url)return <p role="status">Loading image…</p>
  return <div style={{position:'relative',maxWidth:650,margin:'0 auto 20px'}}><img src={url} alt={typeof payload.slideTitle==='string'?payload.slideTitle:'Unlabelled anatomy image'} style={{display:'block',width:'100%',borderRadius:8}}/><span aria-label="Identify this structure" style={{position:'absolute',left:`${Math.max(0,Math.min(1,at.x))*100}%`,top:`${Math.max(0,Math.min(1,at.y))*100}%`,transform:'translate(-50%,-50%)',background:'var(--color-primary)',color:'white',border:'2px solid white',width:26,height:26,borderRadius:'50%',display:'grid',placeItems:'center'}}>?</span></div>
}
