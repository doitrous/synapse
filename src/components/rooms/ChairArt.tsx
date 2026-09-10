import { useId, type CSSProperties } from 'react'
import type { SeatChair } from '@/lib/rooms/roomPresence'
/** A separate chair layer keeps the selected furniture consistent in both room and editor. */
export function ChairArt({chair,front=false,style}:{chair:SeatChair;front?:boolean;style?:CSSProperties}){
  const id=useId().replaceAll(':',''),gaming=chair==='gaming',mesh=chair==='ergonomic',lounge=chair==='lounge'
  const colors=chair==='executive'?['#695044','#2c2522']:gaming?['#485166','#191f2c']:lounge?['#c4a17b','#866747']:['#7a8990','#34444d']
  return <svg viewBox="0 0 100 125" aria-hidden="true" className={`reference-chair-option chair-${chair} ${front?'chair-front':'chair-rear'}`} style={style}>
    <defs><linearGradient id={id} x2="1" y2="1"><stop stopColor={colors[0]}/><stop offset="1" stopColor={colors[1]}/></linearGradient></defs>
    <path d={lounge?'M25 86L18 121M75 86L83 121':'M47 88V112M47 110L15 121M47 110L82 121M47 110V124'} stroke={lounge?'#72563d':'#68737a'} strokeWidth="4" strokeLinecap="round"/>
    {!lounge&&[15,82,47].map((x,i)=><ellipse key={x} cx={x} cy={i===2?122:120} rx="4" ry="2.5" fill="#293139"/>)}
    <path d="M18 78Q50 69 82 78L78 91Q50 99 22 91Z" fill={`url(#${id})`} stroke={colors[1]}/>
    <g>
      <path d={gaming?'M32 4Q50 0 68 4L74 22L82 32L76 83Q50 94 24 83L18 32L26 22Z':lounge?'M12 41Q50 23 88 41L82 83Q50 96 18 83Z':'M23 14Q50 5 77 14L81 71Q79 87 50 89Q21 87 19 71Z'} fill={`url(#${id})`} stroke={colors[1]} strokeWidth="2"/>
      {gaming?<><path d="M31 10L25 33L32 78M69 10L75 33L68 78" stroke="#859bba" strokeWidth="4" fill="none"/><rect x="36" y="19" width="28" height="8" rx="3" fill="#141c28"/><path d="M37 59H63" stroke="#7c8a9e" strokeWidth="9"/></>:mesh?<>{Array.from({length:10},(_,i)=><path key={i} d={`M26 ${24+i*5}Q50 ${30+i*5}74 ${24+i*5}`} fill="none" stroke="#b0bec2" strokeOpacity=".5"/>)}<path d="M49 24V80" stroke="#43515a" strokeWidth="4"/></>:<><path d="M27 40Q50 46 73 40M25 66Q50 73 75 66" fill="none" stroke={colors[0]} strokeWidth="2"/>{!lounge&&<path d="M29 19Q50 13 71 19" stroke={colors[0]} strokeWidth="5" fill="none"/>}</>}
    </g>
    <path d="M15 62V87M85 62V87" stroke="#586269" strokeWidth="4"/><path d="M9 62H23M77 62H91" stroke={colors[1]} strokeWidth="6" strokeLinecap="round"/>
  </svg>
}
