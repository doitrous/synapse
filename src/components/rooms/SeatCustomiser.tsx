import { useState } from 'react'
import { Armchair } from 'lucide-react'
import { Dialog } from '@/components/ui/Dialog'
import { PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/cn'
import {
  SEAT_CHAIRS,
  SEAT_DESKS,
  SEAT_DEVICES,
  type SeatChair,
  type SeatDesk,
  type SeatDevice,
  type SeatPreference,
} from '@/lib/rooms/roomPresence'
import { SeatPiecePreview } from './seatArt'

const DESK_LABELS: Record<SeatDesk, string> = {
  plain: 'Plain',
  drawer: 'With a drawer',
  corner: 'Corner',
}

const DEVICE_LABELS: Record<SeatDevice, string> = {
  laptop: 'Laptop',
  desktop: 'Desktop PC',
  tablet: 'Tablet',
  iphone: 'iPhone',
  android: 'Android phone',
}

const CHAIR_LABELS: Record<SeatChair, string> = {
  stool: 'Stool',
  office: 'Office chair',
}

/**
 * One row of choices.
 *
 * A radiogroup rather than a row of buttons, so arrow keys move between the
 * variants the way they do in every other picker in the app, and so the
 * selected piece is announced as selected rather than merely drawn darker —
 * the sketch alone would be a colour-and-weight-only state.
 */
function PieceRow<T extends SeatDesk | SeatDevice | SeatChair>({
  legend,
  kind,
  options,
  labels,
  value,
  onChange,
}: {
  legend: string
  kind: 'desk' | 'device' | 'chair'
  options: readonly T[]
  labels: Record<T, string>
  value: T
  onChange: (next: T) => void
}) {
  const t = useT()
  return (
    <fieldset>
      <legend className="mb-2 text-[12.5px] font-medium text-ink-2">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = option === value
          return (
            <label
              key={option}
              className={cn(
                'flex min-h-11 min-w-[5.5rem] flex-1 cursor-pointer flex-col items-center gap-1 rounded-lg border p-2 transition-[border-color,background-color,transform] duration-[var(--dur-base)] ease-[var(--ease-out-quint)] hover:-translate-y-px',
                selected ? 'nav-selected border-primary-line bg-surface' : 'border-line bg-surface-2 hover:border-line-2',
              )}
            >
              <input
                type="radio"
                name={`seat-${kind}`}
                value={option}
                checked={selected}
                onChange={() => onChange(option)}
                className="sr-only"
              />
              <SeatPiecePreview kind={kind} variant={option} className="h-12 w-full" />
              <span className={cn('text-center text-[11.5px] leading-tight', selected ? 'font-medium text-ink' : 'text-ink-2')}>
                {t(labels[option])}
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

/**
 * Pick your desk, your device and your chair.
 *
 * The dialog edits a draft and only commits on Save, so backing out of it
 * leaves the hall exactly as it was — the seat is persisted, and a preference
 * that rewrote itself while you were still browsing would be impossible to
 * undo.
 */
export function SeatCustomiser({
  seat,
  onSave,
  onClose,
}: {
  seat: SeatPreference
  onSave: (next: SeatPreference) => void
  onClose: () => void
}) {
  const t = useT()
  const [draft, setDraft] = useState<SeatPreference>(seat)

  return (
    <Dialog label={t('Customise your seat')} size="lg" onClose={onClose}>
      <div className="flex items-center gap-3 rounded-t-xl border-b border-mist-line bg-mist px-5 py-4">
        <span className="flex size-10 items-center justify-center rounded-lg border border-mist-line bg-surface">
          <Icon icon={Armchair} size={18} className="text-primary-strong" />
        </span>
        <div className="min-w-0">
          <h2 className="font-serif text-[19px] leading-tight text-on-mist">{t('Customise your seat')}</h2>
          <p className="mt-0.5 text-[12.5px] text-ink-2">
            {t('Everyone in the room sees the desk you choose.')}
          </p>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <PieceRow
          legend={t('Desk')}
          kind="desk"
          options={SEAT_DESKS}
          labels={DESK_LABELS}
          value={draft.desk}
          onChange={(desk) => setDraft((current) => ({ ...current, desk }))}
        />
        <PieceRow
          legend={t('Device')}
          kind="device"
          options={SEAT_DEVICES}
          labels={DEVICE_LABELS}
          value={draft.device}
          onChange={(device) => setDraft((current) => ({ ...current, device }))}
        />
        <PieceRow
          legend={t('Chair')}
          kind="chair"
          options={SEAT_CHAIRS}
          labels={CHAIR_LABELS}
          value={draft.chair}
          onChange={(chair) => setDraft((current) => ({ ...current, chair }))}
        />
      </div>

      <PanelHeader
        className="border-b-0 border-t"
        title={t('Your seat')}
        action={
          <>
            <Button variant="ghost" onClick={onClose}>{t('Cancel')}</Button>
            <Button variant="primary" onClick={() => { onSave(draft); onClose() }}>{t('Save seat')}</Button>
          </>
        }
      />
    </Dialog>
  )
}
