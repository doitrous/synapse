import { Check, Users } from 'lucide-react'
import { RoomDiorama } from './RoomDiorama'
import { STUDY_WORLDS, mockWorldPresence } from '@/lib/rooms/studyWorld'
import { placeSeats } from '@/lib/rooms/roomPresence'
import { useT } from '@/lib/i18n'

/**
 * Pick a room layout by looking at it.
 *
 * The create dialog used to offer the ten layouts as a bare dropdown — a name
 * and a seat count with no idea what the room actually looks like. Each choice
 * is now a card that draws the real room (the same diorama the student will sit
 * in) with sample classmates placed at its desks, so "Library Room" or "Study
 * Café" is a picture, not a guess.
 */
export function RoomLayoutPicker({ value, onChange }: { value: string; onChange: (style: string) => void }) {
  const t = useT()
  return (
    <div className="layout-picker" role="radiogroup" aria-label={t('Room layout')}>
      {STUDY_WORLDS.map((world) => {
        const selected = value === world.style
        return (
          <button
            type="button"
            key={world.style}
            role="radio"
            aria-checked={selected}
            className={`layout-card ${selected ? 'is-selected' : ''}`}
            onClick={() => onChange(world.style)}
          >
            <span className="layout-preview" aria-hidden>
              <RoomDiorama world={world} seats={placeSeats(mockWorldPresence('preview', world), world.capacity)} preview />
            </span>
            <span className="layout-card-body">
              <span className="layout-card-name">{t(world.name)}</span>
              <span className="layout-card-meta"><Users size={13} />{world.capacity} {t('seats')} · {t(world.type)}</span>
            </span>
            {selected && <span className="layout-card-check"><Check size={13} /></span>}
          </button>
        )
      })}
    </div>
  )
}
