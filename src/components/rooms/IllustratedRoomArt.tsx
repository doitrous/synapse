import { DEFAULT_PERSONALISATION, type DeskPersonalisation } from '@/lib/rooms/studyWorld'
import type { SeatPreference } from '@/lib/rooms/roomPresence'
import { StudentPortrait } from './StudyWorldArt'
export function DeskScene({ seat, personalisation = DEFAULT_PERSONALISATION, occupied, self = false }: { seat: SeatPreference; personalisation?: DeskPersonalisation; occupied: boolean; self?: boolean }) {
  return <svg viewBox="0 0 180 125" className="world-desk-art" aria-hidden="true">
    <ellipse cx="90" cy="115" rx="69" ry="7" fill="var(--color-ink)" opacity=".07"/>
    <path d={seat.chair === 'stool' ? 'M58 73Q90 63 122 73V85H58Z' : 'M58 48Q58 35 69 35H111Q122 35 122 48V85H58Z'} fill={self ? 'var(--color-primary)' : 'var(--color-accent-strong)'} opacity={occupied ? 1 : .3}/>
    <path d="M70 80V109M110 80V109" stroke="var(--color-ink-2)" strokeWidth="4"/>
    {occupied && <g transform="translate(55 -7) scale(.87)"><StudentPortrait model={personalisation.model}/></g>}
    <path d="M28 78V112M152 78V112" stroke="var(--color-ink-2)" strokeWidth="5"/>
    <path d="M20 65H160L169 83H11Z" fill="var(--world-wood, var(--color-mist-2))" stroke="var(--color-line-2)"/>
    <path d="M11 83H169V89H11Z" fill="var(--world-edge, var(--color-line-2))"/>
    {seat.desk === 'drawer' && <g><rect x="117" y="89" width="38" height="17" rx="2" fill="var(--world-wood, var(--color-mist-2))"/><path d="M130 96H142" stroke="var(--color-ink-2)" strokeWidth="2"/></g>}
    {seat.desk === 'corner' && <path d="M11 83H42V102H11Z" fill="var(--world-wood, var(--color-mist-2))" stroke="var(--color-line-2)"/>}
    {occupied && personalisation.items.map((item,i) => <g key={item} transform={`translate(${27+i*29} 68)`}>
      {item === 'device' && <g fill="var(--color-accent-strong)" stroke="var(--color-ink-2)" strokeWidth="1">
        {seat.device === 'laptop' || seat.device === 'desktop' ? <><rect x="-7" y="-22" width="30" height="20" rx="2"/><path d="M-5 -19H20V-5H-5Z" fill="var(--color-mist)"/>{seat.device === 'laptop' ? <path d="M-7 -2H23L27 3H-11Z" fill="var(--color-line-2)"/> : <path d="M8 -2V3M1 3H15"/>}</> : <rect x="0" y="-15" width={seat.device === 'tablet' ? 20 : 12} height="22" rx="3"/>}
      </g>}
      {item === 'notebook' && <g><path d="M-7 0L5 -3L16 0V10L5 7L-7 10Z" fill="var(--color-surface)" stroke="var(--color-line-2)"/><path d="M5 -3V7" stroke="var(--color-ink-2)"/></g>}
      {item === 'plant' && <g><path d="M0 0L2 10H12L14 0" fill="var(--color-ink-2)"/><path d="M7 0V-15M7 -5Q-8 -15 1 -16Q8 -15 7 -5M7 -8Q21 -22 19 -10Q14 -4 7 -8" fill="var(--color-success)" stroke="var(--color-success)"/></g>}
      {item === 'cup' && <g fill="var(--color-surface)" stroke="var(--color-ink-2)"><path d="M0 -4H12V7Q6 12 0 7Z"/><path d="M12 -2Q23 -2 12 5" fill="none"/></g>}
      {item === 'note' && <g><path d="M-3 0H15L18 11H0Z" fill="var(--color-warning-tint)" stroke="var(--color-line-2)"/><path d="M1 3H12M2 6H10" stroke="var(--color-warning)" strokeWidth="1"/></g>}
    </g>)}
  </svg>
}

export function RoomArchitecture({ style }: { style: string }) {
  const library = style === 'library'
  return <div className="world-architecture" aria-hidden="true">
    <div className="world-window"><i/><i/><i/><i/></div>
    <div className="world-wall-message"><span>Nishany</span><strong>{library ? 'One more chapter.' : style === 'discussion' ? 'Good questions belong here.' : style === 'courtyard' ? 'Grow together.' : 'Small steps, every day.'}</strong></div>
    <div className="world-bookshelf">{Array.from({length: library ? 18 : 9},(_,i)=><i key={i} style={{height: `${17+i%4*6}px`, background: `var(--color-${['accent-strong','ink-2','primary-strong','line-2'][i%4]})`}}/>)}</div>
    <svg viewBox="0 0 70 95" className="world-floor-plant"><path d="M24 72H52L48 94H29Z" fill="var(--color-ink-2)"/><path d="M38 73V18M38 42Q7 25 12 14Q38 14 38 42M38 55Q66 40 63 26Q43 27 38 55M38 69Q8 61 9 45Q33 43 38 69" fill="var(--color-success)" stroke="var(--color-success)" strokeWidth="2"/></svg>
  </div>
}
