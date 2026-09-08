import type { CSSProperties } from 'react'
import { ChairArt } from './ChairArt'
import type { SeatChair, SeatDevice } from '@/lib/rooms/roomPresence'
import type { StudentModel } from '@/lib/rooms/studyWorld'

import { characterSprite } from '@/lib/rooms/characterAtlas'
export function SeatedStudent({model,front=false,stool=false,style,seatIndex,chair='office'}:{chair?:SeatChair;seatIndex?:number;model:StudentModel;front?:boolean;stool?:boolean;style?:CSSProperties}){
  const sprite=characterSprite(model,front,stool||chair!=='office')
  return <span data-student-anchor={seatIndex} aria-hidden="true" className={`reference-student ${front?'faces-front':stool?'on-stool':''}`} style={{backgroundImage:`url('${sprite.src}')`,backgroundSize:`400% ${sprite.rows*100}%`,backgroundPosition:`${sprite.column/3*100}% ${sprite.row/(sprite.rows-1)*100}%`,...style}}>{chair!=='office'&&chair!=='stool'&&<ChairArt chair={chair} front={front} style={{position:'absolute',width:front?'82%':'60%',height:front?'82%':'58%',left:front?'9%':'20%',top:front?'15%':'40%',zIndex:front?-1:1}}/>}</span>
}
export function FurnitureSprite({kind,style}:{kind:'desk'|'chair'|'chair-front'|'round'|'plant';style?:CSSProperties}){
  const box={desk:'0 0 770 543',chair:'780 0 668 520','chair-front':'780 0 668 520',round:'0 543 770 543',plant:'780 543 668 543'}[kind]
  return <svg className={`reference-furniture furniture-${kind}`} viewBox={box} style={style} aria-hidden="true"><image href={kind==='chair-front'?'/assets/study-room/furniture-front-chair.png':'/assets/study-room/furniture-clean.png'} width="1448" height="1086"/></svg>
}
function DeviceLogo({android=false,x=40,y=30,scale=1}:{android?:boolean;x?:number;y?:number;scale?:number}){
  return <g transform={`translate(${x} ${y}) scale(${scale})`} fill={android?'#c5dec0':'#e3e7e9'}>{android?<><path d="M-8 0A8 8 0 0 1 8 0V7H-8Z"/><path d="M-5-5L-8-10M5-5L8-10" fill="none" stroke="#c5dec0" strokeWidth="1.6"/><circle cx="-4" cy="-1" r="1" fill="#385044"/><circle cx="4" cy="-1" r="1" fill="#385044"/></>:<><path d="M0-5C-7-10-11-3-8 4C-5 12-2 10 0 9C3 11 6 10 9 4C4 2 4-3 8-5C4-9 2-7 0-5Z"/><path d="M0-7C-1-11 2-14 5-14C6-11 3-7 0-7Z"/></>}</g>
}
export function StudyDevice({device,facingStudent=false}:{device:SeatDevice;facingStudent?:boolean}){
  const back=facingStudent
  return <svg viewBox="0 0 100 82" className={`reference-device device-${device} ${back?'faces-student':''}`} aria-hidden="true">
    {device==='laptop'?<>
      <path d="M16 14L79 10L82 51L20 55Z" fill={back?'#8f9ca6':'#27323b'} stroke="#596773" strokeWidth="1.5"/>
      {back?<DeviceLogo x={49} y={34} scale={.45}/>:<><path d="M20 18L75 15L78 47L23 50Z" fill="#e5eef0"/><path d="M27 24L66 22M28 31L59 29M28 37L67 35" stroke="#91a3b0" strokeWidth="2"/></>}
      <path d={back?'M20 55L82 51L78 60L13 63Z':'M20 55L82 51L96 71L9 77Z'} fill="#b4bdc4" stroke="#6c7985"/>
      {!back&&<><path d="M24 58L77 55L84 66L19 71Z" fill="#4d5963"/><path d="M41 69L59 68L63 73L38 75Z" fill="#8997a3"/><path d="M27 60L75 58M24 64L80 62" stroke="#a2acb3"/></>}
    </>:device==='desktop'?<>
      {back&&<><path d="M13 0H61L66 7H9Z" fill="#c5cdd1" stroke="#75858f"/><ellipse cx="78" cy="5" rx="4" ry="5" fill="#a0afb9"/></>}
      <rect x="81" y="30" width="17" height="43" rx="2" fill="#303d47" stroke="#697782"/><path d="M84 35H95M84 38H95M84 41H95" stroke="#72838d"/><circle cx="89" cy="66" r="2" fill="#95c7bd"/>
      <rect x="4" y="4" width="74" height="45" rx="3" fill={back?'#4d5c67':'#253039'} stroke="#83939d"/>
      {back?<><path d="M16 12H65M16 15H65" stroke="#2a3741"/><circle cx="41" cy="29" r="4" fill="#8e9da8"/></>:<><rect x="8" y="8" width="66" height="35" fill="#e6ecee"/><rect x="11" y="11" width="17" height="29" fill="#c5d5db"/><path d="M34 16H65M34 22H59M34 28H66M34 34H55" stroke="#8ea6b4" strokeWidth="2"/></>}
      <path d="M35 49H46L49 58H57V61H23V58H33Z" fill="#7b8a93"/>
      {!back&&<><path d="M8 64H62L70 77H2Z" fill="#c5cdd1" stroke="#75858f"/><path d="M12 67H59M9 71H62M7 74H65" stroke="#788791" strokeWidth="1.5"/><ellipse cx="77" cy="71" rx="5" ry="7" fill="#a0afb9"/></>}
    </>:<g transform={device==='tablet'?'translate(19 13) rotate(-7 30 28)':'translate(33 7) rotate(-8 17 31)'}>
      <rect width={device==='tablet'?60:34} height={device==='tablet'?54:65} rx={device==='android'?3:6} fill={back?(device==='android'?'#526459':'#a6b3bc'):'#263540'} stroke="#667783" strokeWidth="1.5"/>
      {back?<>{device==='iphone'?<><rect x="3" y="3" width="16" height="18" rx="4" fill="#b9c5cd"/>{[[7,7],[14,11],[7,16]].map(([x,y])=><circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#263947" stroke="#718896"/>)}</>:device==='android'?<>{[7,15,23].map(y=><circle key={y} cx="7" cy={y} r="3.6" fill="#21352b" stroke="#9aac9d"/>)}</>:<circle cx="7" cy="7" r="3.5" fill="#263947"/>}<DeviceLogo android={device==='android'} x={device==='tablet'?30:18} y={device==='tablet'?30:39} scale={device==='tablet'?.65:.62}/></>:<><rect x="3" y="4" width={device==='tablet'?54:28} height={device==='tablet'?45:56} rx="3" fill={device==='android'?'#dae6d8':'#dae7ed'}/>{device==='iphone'?<rect x="12" y="5" width="10" height="3" rx="2" fill="#263540"/>:device==='android'?<circle cx="17" cy="7" r="1.3" fill="#263540"/>:null}<path d="M8 18H25M8 25H21M8 32H25" stroke="#8aa5b5" strokeWidth="2"/>{device!=='tablet'&&<DeviceLogo android={device==='android'} x={18} y={46} scale={.43}/>}</>}
      {device==='tablet'&&<path d="M64 5V48" stroke="#eeeae3" strokeWidth="3" strokeLinecap="round"/>}
    </g>}
  </svg>
}

export function ReferenceMatte({id}:{id:string}){
  return (<filter id={`${id}-reference-white-matte`} colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -.2126 -.7152 -.0722 0 1"/>
        <feComponentTransfer><feFuncA type="discrete" tableValues="0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1"/></feComponentTransfer>
        <feComposite in2="SourceAlpha" operator="in"/>
      </filter>)
}

/** Architectural surfaces are vector geometry; desks and students remain independent layers. */
export function ReferenceArchitecture({height=1020,roomStyle='campus',id,hasDiscussion=true}:{height?:number;roomStyle:string;id:string;hasDiscussion?:boolean}){
  const night=roomStyle==='library'||roomStyle==='cafe',courtyard=roomStyle==='courtyard'||roomStyle==='garden'
  return <svg className="reference-architecture" viewBox={`0 0 1000 ${height}`} preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <ReferenceMatte id={id}/>
      <linearGradient id={`${id}-room-day-floor`} x2="0" y2="1"><stop stopColor={night?'#a39077':'#efeae1'}/><stop offset="1" stopColor={night?'#bcaa8e':'#faf6ed'}/></linearGradient>
      <linearGradient id={`${id}-room-day-wall`}><stop stopColor={night?'#6f7974':'#e1e2df'}/><stop offset=".6" stopColor={night?'#9c9b88':'#f5f3ee'}/><stop offset="1" stopColor={night?'#898c7b':'#e7e5df'}/></linearGradient>
      <linearGradient id={`${id}-room-window-sky`} x2="0" y2="1"><stop stopColor={night?'#506779':'#dce8ee'}/><stop offset="1" stopColor={night?'#697b73':'#b7c7a2'}/></linearGradient>
      <pattern id={`${id}-room-floorboards`} width="190" height="32" patternUnits="userSpaceOnUse"><path d="M0 31H190M95 0V31" stroke="#c8b9a3" strokeOpacity=".35"/><path d="M12 10Q70 6 178 12M27 20Q105 16 185 21" fill="none" stroke="#d4c4ab" strokeOpacity=".25"/></pattern>
    </defs>
    <path d={`M115 192H1000V${height}H0Z`} fill={`url(#${id}-room-day-floor)`}/>
    <path d={`M115 192H1000V${height}H0Z`} fill={`url(#${id}-room-floorboards)`}/>
    {roomStyle==='garden'&&<><path d={`M115 192H1000V${height}H0Z`} fill="#a8b49a"/><path d={`M365 200H660L785 ${height}H230Z`} fill="#d6cfbb"/>{[215,440,665,890].map(x=><g key={x}><path d={`M${x} 0V190`} stroke="#716d55" strokeWidth="13"/><path d={`M${x-80} 0L${x+160} 190`} stroke="#899776" strokeWidth="9"/></g>)}</>}
    <path d="M114 0H1000V199H114Z" fill={roomStyle==='garden'?'#c0cfb2':`url(#${id}-room-day-wall)`}/>
    <path d="M112 186H1000V200H112Z" fill="#c8c8c2"/><path d="M114 185H1000" stroke="#faf9f6" strokeWidth="4"/>
    <path d={`M0 0H114V195L0 ${height}Z`} fill="#d9dcd8"/>
    <path d={`M9 0H105V184L9 ${height-110}Z`} fill={`url(#${id}-room-window-sky)`}/>
    {Array.from({length:35},(_,i)=><ellipse key={i} cx={12+(i*47)%84} cy={25+(i*91)%650} rx={10+i%4*3} ry={5+i%3*4} transform={`rotate(${i*29} ${12+(i*47)%84} ${25+(i*91)%650})`} fill={['#849774','#a2af8d','#c3cba9'][i%3]} opacity=".55"/>)}
    {!courtyard&&[0,1,2,3].map(i=><g key={i}><path d={`M${14+i*29} 0V${height-160-i*190}`} stroke="#f5f4ed" strokeWidth="7"/><path d={`M${19+i*29} 0V${height-165-i*190}`} stroke="#a6ada9" strokeWidth="1.5"/></g>)}
    {!courtyard&&[170,350,540].map(y=><path key={y} d={`M8 ${y+100}L105 ${y*.28}`} stroke="#fafaf5" strokeWidth="7"/>)}
    {courtyard&&<g>{[120,340,560].map(y=><g key={y}><path d={`M6 ${y+130}V${y}Q50 ${y-70}104 ${y-100}V${y+45}`} fill="none" stroke="#e8ddc6" strokeWidth="19"/><path d={`M7 ${y+130}L110 ${y+46}`} stroke="#d6c7ae" strokeWidth="9"/></g>)}</g>}
    <path d={`M108 183L0 ${height-50}`} stroke="#eeece4" strokeWidth="12"/>
    <path d={`M504 245H575L634 ${height}H435Z`} fill="#bcc2c5" opacity=".69"/>
    {[340,555,765].map(y=><path key={y} d={`M35 ${y}L365 ${y+90}L390 ${y+135}L24 ${y+40}Z`} fill="#fff" opacity=".34"/>)}
    <path d="M140 0H318V185H140Z" fill="#617581"/>
    <text x="230" y="40" fill="#fff" textAnchor="middle" fontSize="13" fontFamily="sans-serif">{roomStyle==='garden'?'STUDY GARDEN':roomStyle==='cafe'?'STUDY CAFÉ':roomStyle==='lab'?'STUDY LAB':roomStyle==='collaboration'?'COLLABORATION HALL':roomStyle==='duo'?'FOCUS FOR TWO':courtyard?'COURTYARD':night?'READING ROOM':'QUIET ZONE'}</text><text x="230" y="60" fill="#e9eef0" textAnchor="middle" fontSize="9" fontFamily="sans-serif">Focus. Learn. Grow.</text>
    <rect x="346" y="32" width="256" height="117" fill="#b7b4ab" rx="2"/><rect x="350" y="36" width="248" height="108" fill="#f8f7f2"/>
    <text x="383" y="80" fill="#757d81" fontSize="14" fontFamily="Georgia" fontStyle="italic">Discipline today.</text><text x="383" y="104" fill="#757d81" fontSize="14" fontFamily="Georgia" fontStyle="italic">Doctor tomorrow.</text><path d="M360 148H586" stroke="#979d9d" strokeWidth="4"/>
    <circle cx="635" cy="49" r="15" fill="#faf9f5" stroke="#7c8588"/><path d="M635 39V49L643 54" fill="none" stroke="#535e65" strokeWidth="1.5"/>
    <text x="820" y="44" textAnchor="middle" fill="#354149" fontFamily="sans-serif" fontSize="13">{hasDiscussion?'DISCUSSION TABLE':'INDEPENDENT STUDY'}</text><text x="820" y="64" textAnchor="middle" fill="#657076" fontFamily="sans-serif" fontSize="9">{hasDiscussion?'Share. Clarify. Excel.':'A little quiet. A lot of progress.'}</text>
    <path d="M915 0V49" stroke="#525e67" strokeWidth="2"/><path d="M900 65Q900 44 915 44Q930 44 930 65Q916 73 900 65" fill="#3f515e"/>
    <g transform="translate(140 81)"><rect width="71" height="112" fill="#a89373"/><rect x="5" y="4" width="61" height="100" fill="#52616a"/>{[0,1,2].map(row=><g key={row}>{Array.from({length:7},(_,i)=><rect key={i} x={8+i*8} y={10+row*31+(i%2)*4} width="6" height={24-i%3*3} fill={['#c1ad8a','#dfd5c0','#87918c','#8b6b54'][i%4]}/>)}<path d={`M5 ${37+row*31}H66`} stroke="#b5a183" strokeWidth="4"/></g>)}</g>
  </svg>
}
