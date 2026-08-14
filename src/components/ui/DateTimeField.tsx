import { useCallback, useEffect, useRef, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { Icon } from './Icon'
import { Popover, usePopoverTrigger } from './Popover'
import { isoDay } from '@/data/studyBlocks'
import {
  DEFAULT_WEEK_START, addDays, monthGrid, sameDay, weekdayLabels, type WeekStart,
} from '@/lib/calendarGrid'
import { addMinutes, formatTime, formatTimeLabel, minutesOf, normalizeTime } from '@/lib/timeValue'
import { formatMinutes } from '@/lib/format'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

/**
 * Date and time entry that belongs to this design system.
 *
 * `<input type="date">` and `<input type="time">` render the operating
 * system's own control — a different typeface, a different palette, and on
 * Chromium a spinner that looks a decade old next to everything around it.
 * These keep the same string values (`YYYY-MM-DD`, `HH:MM`) so nothing that
 * stores a date had to change, and add the thing a native picker never had:
 * you can just type. `9`, `930`, `9.30` and `9:30 pm` all mean what you meant.
 */

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const FIELD =
  'flex h-11 w-full items-center gap-2 rounded-md border border-line bg-surface px-3 text-start text-[13.5px] text-ink transition-colors focus-within:border-accent focus-within:ring-2 focus-within:ring-[color-mix(in_srgb,var(--color-accent)_18%,transparent)] sm:h-9'

function fromIsoDay(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim())
  if (!match) return null
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
  return Number.isNaN(date.getTime()) ? null : date
}

/* ---- Date ---------------------------------------------------------------- */

export function DateField({
  value,
  onChange,
  id,
  weekStart = DEFAULT_WEEK_START,
  min,
  disabled,
  className,
}: {
  /** `YYYY-MM-DD`, or an empty string for no date. */
  value: string
  onChange: (next: string) => void
  id?: string
  weekStart?: WeekStart
  /** `YYYY-MM-DD` before which days are not selectable. */
  min?: string
  disabled?: boolean
  className?: string
}) {
  const t = useT()
  const { anchor, setAnchor, open, setOpen, close } = usePopoverTrigger()
  const selected = fromIsoDay(value)
  const [month, setMonth] = useState(() => selected ?? new Date())
  const floor = min ? fromIsoDay(min) : null

  // Reopening on a different value should land on that value's month, not on
  // whatever month was last paged to.
  useEffect(() => { if (open && selected) setMonth(selected) }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  const pick = (date: Date) => { onChange(isoDay(date)); close() }
  const grid = monthGrid(month, weekStart)
  const today = new Date()

  return (
    <>
      <button
        type="button"
        id={id}
        ref={setAnchor}
        disabled={disabled}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(FIELD, 'hover:border-line-2 disabled:cursor-not-allowed disabled:opacity-60', className)}
      >
        <span className={cn('min-w-0 flex-1 truncate', !selected && 'text-ink-3')}>
          {selected ? `${MONTHS[selected.getMonth()].slice(0, 3)} ${selected.getDate()}, ${selected.getFullYear()}` : t('Pick a date')}
        </span>
        <Icon icon={CalendarDays} size={15} className="shrink-0 text-ink-3" />
      </button>

      {open && (
        <Popover anchor={anchor} onClose={close} label={t('Pick a date')} className="p-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))}
              aria-label={t('Previous month')}
              className="grid size-8 place-items-center rounded-md text-ink-3 hover:bg-inset hover:text-ink"
            >
              <Icon icon={ChevronLeft} size={16} className="rtl:-scale-x-100" />
            </button>
            <span className="text-[13px] font-semibold text-ink">
              {t(MONTHS[month.getMonth()])} {month.getFullYear()}
            </span>
            <button
              type="button"
              onClick={() => setMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))}
              aria-label={t('Next month')}
              className="grid size-8 place-items-center rounded-md text-ink-3 hover:bg-inset hover:text-ink"
            >
              <Icon icon={ChevronRight} size={16} className="rtl:-scale-x-100" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-0.5">
            {weekdayLabels(weekStart).map((label) => (
              <span key={label} className="grid h-6 place-items-center text-[10px] font-semibold uppercase tracking-[0.06em] text-ink-3">
                {t(label)}
              </span>
            ))}
            {grid.map((date) => {
              const outside = date.getMonth() !== month.getMonth()
              const isSelected = selected ? sameDay(date, selected) : false
              const blocked = floor ? date < floor && !sameDay(date, floor) : false
              return (
                <button
                  key={date.getTime()}
                  type="button"
                  disabled={blocked}
                  onClick={() => pick(date)}
                  aria-current={isSelected ? 'date' : undefined}
                  className={cn(
                    'tnum grid size-9 place-items-center rounded-md font-mono text-[12px] transition-colors',
                    isSelected
                      ? 'bg-accent font-semibold text-on-accent'
                      : blocked
                        ? 'cursor-not-allowed text-ink-3/45'
                        : outside
                          ? 'text-ink-3 hover:bg-inset'
                          : 'text-ink-2 hover:bg-inset hover:text-ink',
                    !isSelected && sameDay(date, today) && 'ring-1 ring-inset ring-accent/45',
                  )}
                >
                  {date.getDate()}
                </button>
              )
            })}
          </div>

          <div className="mt-2 flex items-center gap-1.5 border-t border-line pt-2">
            <QuickDate label={t('Today')} onPick={() => pick(new Date())} />
            <QuickDate label={t('Tomorrow')} onPick={() => pick(addDays(new Date(), 1))} />
            <QuickDate label={t('Next week')} onPick={() => pick(addDays(new Date(), 7))} />
          </div>
        </Popover>
      )}
    </>
  )
}

function QuickDate({ label, onPick }: { label: string; onPick: () => void }) {
  return (
    <button
      type="button"
      onClick={onPick}
      className="rounded-md px-2 py-1 text-[11.5px] font-medium text-ink-2 transition-colors hover:bg-inset hover:text-ink"
    >
      {label}
    </button>
  )
}

/* ---- Time ---------------------------------------------------------------- */

const STEP_MINUTES = 15

export function TimeField({
  value,
  onChange,
  id,
  after,
  disabled,
  className,
}: {
  /** `HH:MM`. */
  value: string
  onChange: (next: string) => void
  id?: string
  /**
   * Another `HH:MM` this one follows, as an end time follows a start. Options
   * begin there and carry how long each one would make the block, which is the
   * question someone setting an end time is actually asking.
   */
  after?: string
  disabled?: boolean
  className?: string
}) {
  const t = useT()
  const { anchor, setAnchor, open, setOpen, close } = usePopoverTrigger()
  const [draft, setDraft] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const commit = (text: string) => {
    const next = normalizeTime(text)
    setDraft(null)
    if (next && next !== value) onChange(next)
  }

  const base = after ? minutesOf(after) : 0
  const options = Array.from({ length: Math.floor(24 * 60 / STEP_MINUTES) }, (_, i) => {
    const minutes = after ? base + (i + 1) * STEP_MINUTES : i * STEP_MINUTES
    return { key: i, value: formatTime(minutes), delta: after ? (i + 1) * STEP_MINUTES : 0 }
  })

  // Open onto the current value rather than at midnight, and place it in the
  // middle so the neighbouring times are visible without scrolling first.
  const centreOnSelected = useCallback((node: HTMLDivElement | null) => {
    listRef.current = node
    if (!node) return
    const current = node.querySelector<HTMLElement>('[data-current="true"]')
    if (current) node.scrollTop = current.offsetTop - node.clientHeight / 2 + current.offsetHeight / 2
  }, [])

  return (
    <>
      <div ref={setAnchor} className={cn(FIELD, disabled && 'opacity-60', className)}>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          disabled={disabled}
          value={draft ?? formatTimeLabel(value)}
          onChange={(event) => setDraft(event.target.value)}
          onFocus={(event) => event.currentTarget.select()}
          onBlur={(event) => commit(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') { event.preventDefault(); commit(event.currentTarget.value); setOpen(false) }
            if (event.key === 'ArrowUp') { event.preventDefault(); onChange(addMinutes(value, STEP_MINUTES)); setDraft(null) }
            if (event.key === 'ArrowDown') { event.preventDefault(); onChange(addMinutes(value, -STEP_MINUTES)); setDraft(null) }
          }}
          className="tnum min-w-0 flex-1 bg-transparent font-mono text-[13px] text-ink outline-none disabled:cursor-not-allowed"
          aria-label={t('Time')}
        />
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((current) => !current)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={t('Choose a time')}
          className="-me-1 grid size-7 shrink-0 place-items-center rounded text-ink-3 transition-colors hover:bg-inset hover:text-ink"
        >
          <Icon icon={Clock} size={15} />
        </button>
      </div>

      {open && (
        <Popover
          anchor={anchor}
          onClose={close}
          label={t('Choose a time')}
          role="listbox"
          matchAnchorWidth
          className="py-1"
        >
          <div ref={centreOnSelected} className="max-h-64 overflow-y-auto overscroll-contain">
            {options.map((option) => {
              const current = option.value === value
              return (
                <button
                  key={option.key}
                  type="button"
                  role="option"
                  aria-selected={current}
                  data-current={current}
                  onClick={() => { onChange(option.value); setDraft(null); close() }}
                  className={cn(
                    'flex w-full items-center justify-between gap-3 px-3 py-1.5 text-start text-[12.5px] transition-colors',
                    current ? 'bg-accent-tint font-semibold text-accent-strong' : 'text-ink-2 hover:bg-inset hover:text-ink',
                  )}
                >
                  <span className="tnum font-mono">{formatTimeLabel(option.value)}</span>
                  {option.delta > 0 && (
                    <span className="tnum font-mono text-[11px] text-ink-3">{formatMinutes(option.delta)}</span>
                  )}
                </button>
              )
            })}
          </div>
        </Popover>
      )}
    </>
  )
}
