/** THESIS: A choice of real study places. OWN-WORLD: Nishany's existing mist, crimson, serif and ruled controls.
 * STORY: Find a mood, see the available places, join. FIRST VIEWPORT: five room previews with clear capacity and purpose.
 * FORM: User-specified room cards, extending the incumbent lobby; no new identity. */
import { ArrowUpRight, Users } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useT } from '@/lib/i18n'
import { STUDY_WORLDS, mockWorldPresence } from '@/lib/rooms/studyWorld'
import type { RoomAddress } from './RoomLobby'
import { RoomDiorama } from './RoomDiorama'
import { placeSeats } from '@/lib/rooms/roomPresence'
import './studyWorld.css'

export function WorldChooser({ onEnter }: { onEnter: (room: RoomAddress) => void }) {
  const t = useT()
  return <section aria-labelledby="choose-room-heading" className="world-chooser">
    <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
      <div><h2 id="choose-room-heading" className="font-serif text-2xl text-ink">{t('Choose your room')}</h2><p className="mt-1 text-sm text-ink-2">{t('Find your place. Set a goal. Study together.')}</p></div>
      <span className="text-xs text-ink-2">{t('Preview rooms · sample students · voice not connected')}</span>
    </div>
    <div className="world-cards">{STUDY_WORLDS.map(room => {
      const people = mockWorldPresence('preview',room)
      return <article key={room.id} className={`world-card world-${room.style}`}>
        <div className="world-preview" aria-label={`${t(room.name)} — ${t(room.type)}`}>
          <RoomDiorama world={room} seats={placeSeats(people,room.capacity)} preview/>
        </div>
        <div className="world-card-copy">
          <span className="text-xs font-medium text-accent-strong">{t(room.type)}</span>
          <h3 className="mt-1 font-serif text-xl text-ink">{t(room.name)}</h3>
          <p className="mt-1 text-sm text-ink-2">{t(room.mood)}</p>
          <p className="mt-3 text-xs text-ink-2">{t(room.purpose)}</p>
          <div className="mt-5 flex items-center justify-between gap-2 border-t border-line pt-4">
            <div className="text-xs text-ink-2"><span className="flex items-center gap-1.5"><Users size={14}/>{room.students} {t('students')}</span><strong className="mt-1 block font-medium text-ink">{room.capacity-room.students} {t('seats available')}</strong></div>
            <Button variant="primary" size="sm" iconRight={ArrowUpRight} onClick={()=>onEnter({id:room.id,code:room.code,name:room.name,demo:true})}>{t('Join room')}</Button>
          </div>
        </div>
      </article>
    })}</div>
  </section>
}
