import { roomLayout } from '../../../server/shared/roomLayouts.js'
import { worldForRoom } from '@/lib/rooms/studyWorld'
import { roomPreviewSeats } from '@/lib/rooms/roomPreview'
import { RoomDiorama } from './RoomDiorama'
import { DoorOpen, Volume2 } from 'lucide-react'
import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Meter } from '@/components/ui/Meter'
import { Icon } from '@/components/ui/Icon'
import { useT } from '@/lib/i18n'

/**
 * One room in a lobby list.
 *
 * Occupancy is the number and the meter together: "7 / 20" is the fact, and
 * the meter is how full that feels at a glance across a list of eight rooms.
 * The meter carries `target`, so a room at capacity reads as *at* capacity
 * rather than merely long.
 */
export function RoomCard({
  id,
  name,
  layoutKey,
  code,
  members,
  capacity,
  speaking,
  mine,
  busy,
  onEnter,
}: {
  id?: string
  name: string
  layoutKey?:string
  code: string
  members: number
  capacity: number
  /**
   * How many people have the floor, when that is known.
   *
   * Left out in live mode, deliberately: the parties API carries no speaking
   * state, and a hardcoded "0 speaking" on every card would be a fact the
   * product does not have. An absent figure says nothing; a zero says nobody
   * is talking, which we cannot know.
   */
  speaking?: number
  mine?: boolean
  busy?: boolean
  onEnter: () => void
}) {
  const t = useT()
  const full = members >= capacity
  const world = id?.startsWith('demo-') || id?.startsWith('world-')
    ? worldForRoom(id)
    : {...worldForRoom(`world-${layoutKey ?? 'campus'}`), ...roomLayout(layoutKey ?? 'legacy')}

  return (
    <Panel className="room-available-card lift p-4">
      <div className="room-card-thumbnail" role="img" aria-label={`${name}: ${members} / ${capacity} ${t('occupied seats')} — ${t('layout preview')}`}><RoomDiorama world={world} seats={roomPreviewSeats(world,members)} preview/></div>
      <div className="room-card-details flex min-w-0 items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-[14px] font-semibold leading-tight text-ink">{name}</h3>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-ink-3">
            <span className="tnum font-mono tracking-[0.14em]">{code}</span>
            {speaking !== undefined && speaking > 0 && (
              <span className="inline-flex items-center gap-1 text-accent-strong">
                <Icon icon={Volume2} size={13} />
                {speaking} {t('speaking')}
              </span>
            )}
          </p>
        </div>
        {mine ? <Badge tone="primary">{t('Yours')}</Badge> : full ? <Badge tone="outline">{t('Full')}</Badge> : null}
      </div>

      <div className="room-card-occupancy">
        <div className="mb-1.5 flex items-baseline justify-between gap-2">
          <span className="text-[12px] text-ink-2">{t('Occupancy')}</span>
          <span className="tnum font-mono text-[12.5px] font-medium text-ink">{members} / {capacity}</span>
        </div>
        <Meter value={members} max={capacity} target tone={full ? 'warning' : 'primary'} />
      </div>

      <Button
        className="w-full"
        variant={mine ? 'primary' : 'secondary'}
        iconLeft={DoorOpen}
        loading={busy}
        disabled={full && !mine}
        onClick={onEnter}
      >
        {mine ? t('Enter') : full ? t('Room is full') : t('Join and enter')}
      </Button>
    </Panel>
  )
}
