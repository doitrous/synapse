import type { CSSProperties } from 'react'
import { ReferenceMatte } from './ReferenceRoomArt'

export const libraryArtwork='/assets/study-room/library-props.png'
export function LibraryProp({kind,style}:{kind:'bookcase'|'platform'|'lamp'|'print';style?:CSSProperties}){
  const box={bookcase:'0 0 630 565',platform:'630 75 818 490',lamp:'170 565 470 500',print:'800 565 440 500'}[kind]
  return <svg className={`library-prop library-${kind}`} viewBox={box} style={style} aria-hidden="true"><image href={libraryArtwork} width="1448" height="1086"/></svg>
}

/** Lit architectural layers leave the desks, stairs and people independently interactive. */
export function LibraryArchitecture({id,height}:{id:string;height:number}){
  return <>
    <svg className="reference-architecture library-architecture" viewBox={`0 0 1000 ${height}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <ReferenceMatte id={id}/>
        <filter id={`${id}-library-prop-matte`} colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -.2126 -.7152 -.0722 0 1"/>
          <feComponentTransfer><feFuncA type="discrete" tableValues="0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1"/></feComponentTransfer>
          <feComposite in2="SourceAlpha" operator="in"/>
        </filter>
        <linearGradient id={`${id}-library-wall`} x2="0" y2="1"><stop stopColor="#091724"/><stop offset="1" stopColor="#253640"/></linearGradient>
        <radialGradient id={`${id}-library-floor`}><stop stopColor="#4a565b"/><stop offset="1" stopColor="#233440"/></radialGradient>
        <radialGradient id={`${id}-library-light`}><stop stopColor="#ffdca0" stopOpacity=".2"/><stop offset="1" stopColor="#edbf77" stopOpacity="0"/></radialGradient>
        <pattern id={`${id}-library-tiles`} width="180" height="96" patternUnits="userSpaceOnUse" patternTransform="matrix(1 .08 -.45 .8 0 0)">
          <rect x="1" y="1" width="178" height="46" rx="2" fill="#83918c" fillOpacity=".09" stroke="#0b1c25" strokeWidth="2"/>
          <path d="M0 48H180M90 49V96" stroke="#0b1c25" strokeWidth="2"/>
          <path d="M3 3H177M3 50H87M93 50H177" stroke="#abb5ab" strokeOpacity=".17"/>
          <path d="M24 17L71 19M110 31L158 29M12 69L48 74M110 83L167 79" stroke="#c6c9b9" strokeOpacity=".045"/>
        </pattern>
        <linearGradient id={`${id}-library-side`}><stop stopColor="#101e29"/><stop offset="1" stopColor="#30414a"/></linearGradient>
      </defs>
      <rect width="1000" height={height} fill={`url(#${id}-library-floor)`}/>
      <path d={`M0 180H1000V${height}H0Z`} fill={`url(#${id}-library-tiles)`}/>
      <path d="M0 0H1000V184L500 209L0 184Z" fill={`url(#${id}-library-wall)`}/>
      {[30,220,410,600,790].map(x=><g key={x}><rect x={x} y="20" width="178" height="137" rx="2" fill="none" stroke="#807358" strokeOpacity=".38" strokeWidth="3"/><rect x={x+7} y="27" width="164" height="123" fill="none" stroke="#080f18" strokeOpacity=".65" strokeWidth="2"/></g>)}
      <path d="M0 174L500 199L1000 174V195L500 220L0 195Z" fill="#4c443a"/>
      <path d="M0 174L500 199L1000 174" fill="none" stroke="#ad9266" strokeOpacity=".65" strokeWidth="3"/>
      <path d={`M0 0L28 20V192L0 ${height}Z`} fill={`url(#${id}-library-side)`}/>
      <path d={`M1000 0L972 20V192L1000 ${height}Z`} fill={`url(#${id}-library-side)`}/>
      {[260,740].map(x=><g key={x}><ellipse cx={x} cy="95" rx="78" ry="92" fill={`url(#${id}-library-light)`}/><path d={`M${x} 78V113`} stroke="#af9160" strokeWidth="4"/><path d={`M${x-17} 78L${x-11} 57H${x+11}L${x+17} 78Z`} fill="#e7c88f"/><ellipse cx={x} cy="78" rx="17" ry="4" fill="#ffdfa0"/></g>)}
      {[190,810].flatMap(x=>[300,595].map(y=><ellipse key={`${x}-${y}`} cx={x} cy={y} rx="200" ry="145" fill={`url(#${id}-library-light)`}/>))}

    </svg>
    <LibraryProp kind="bookcase" style={{left:'33%',top:'-2%',width:'18%'}}/>
    <LibraryProp kind="bookcase" style={{left:'49%',top:'-2%',width:'18%',transform:'scaleX(-1)'}}/>
    <LibraryProp kind="print" style={{left:'9%',top:'2%',width:'10%'}}/>
    <LibraryProp kind="print" style={{left:'81%',top:'2%',width:'10%'}}/>
  </>
}
