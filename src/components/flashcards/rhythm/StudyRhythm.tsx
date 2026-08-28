import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Settings2, RotateCcw, ChevronLeft, ChevronRight, CalendarDays, Undo2 } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Dialog } from '@/components/ui/Dialog'
import { Segmented } from '@/components/ui/Tabs'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { formatMinutes } from '@/lib/format'
import type { FlashcardsApi } from '@/lib/useFlashcards'
import type { RhythmSettingsApi } from '@/lib/useRhythmSettings'
import { buildRhythmDataset } from '@/data/flashcards/rhythm/rhythmData'
import type { RhythmCard, RhythmScope, RhythmDayCell, RhythmDataset } from '@/data/flashcards/rhythm/rhythmTypes'
import {
  buildCalendarLayout, stepAnchor, todayAnchor,
  type CalendarLayout, type CalendarDay,
} from '@/data/flashcards/rhythm/rhythmCalendar'
import { rhythmRampVars } from '@/data/flashcards/rhythm/schemes'
import { RHYTHM_CALENDAR_MODES, type RhythmCalendarMode, type RhythmColorScheme } from '@/data/flashcards/rhythm/rhythmSettings'
import { addLocalDays, localDay } from '@/data/flashcards/time'
import { RhythmStats } from './RhythmStats'
import { RhythmSettingsDialog, type RhythmDeckOption } from './RhythmSettingsDialog'

/**
 * Study Rhythm: a configurable activity-and-forecast calendar over the student's
 * real review history and scheduling, plus the statistics that share its exact
 * filtered dataset (so a boundary change moves the calendar and the stats
 * together). Placed on the main Flashcards screen (all decks minus excluded) and
 * on a deck screen (that deck), gated by independent visibility settings.
 *
 * Everything visual reads from `buildRhythmDataset` and `buildCalendarLayout`;
 * nothing here invents activity. Historical cells are solid; forecast cells are
 * outlined (distinguishable without colour); today carries a ring/divider.
 */
const MODE_LABEL: Record<RhythmCalendarMode, string> = {
  weekly: 'Weekly', monthly: 'Monthly', yearly: 'Yearly', continuous: 'Continuous',
}
const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function StudyRhythm({
  api, scope, settingsApi, className,
}: {
  api: FlashcardsApi
  scope: RhythmScope
  settingsApi: RhythmSettingsApi
  className?: string
}) {
  const t = useT()
  const now = useMemo(() => new Date(), [])
  const { settings } = settingsApi
  const mode = settings.calendarMode

  const [anchor, setAnchor] = useState(() => todayAnchor(now))
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [resetOpen, setResetOpen] = useState(false)
  const [undoVisible, setUndoVisible] = useState(false)
  const undoTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // The canonical filtered dataset. One source for the calendar AND the stats.
  const dataset: RhythmDataset = useMemo(() => {
    const cards: RhythmCard[] = api.allCards.map((c) => ({ cardId: c.card.id, deckId: c.card.deckId, meta: c.meta }))
    const deckNewPerDay: Record<string, number> = {}
    for (const d of api.decks) deckNewPerDay[d.id] = d.config.newPerDay
    return buildRhythmDataset({ events: api.reviewEvents, cards, deckNewPerDay, settings, now, scope })
  }, [api.allCards, api.decks, api.reviewEvents, settings, now, scope])

  const byDay = useMemo(() => new Map(dataset.days.map((d) => [d.day, d])), [dataset.days])
  const layout: CalendarLayout = useMemo(
    () => buildCalendarLayout({ days: dataset.days, mode, anchor, now }),
    [dataset.days, mode, anchor, now],
  )

  const deckOptions: RhythmDeckOption[] = useMemo(
    () => api.decks.map((d) => ({ id: d.id, name: d.name, cardCount: d.counts.total })),
    [api.decks],
  )

  const goToday = useCallback(() => { setAnchor(todayAnchor(now)); setSelectedDay(localDay(now)) }, [now])
  const step = useCallback((dir: -1 | 1) => setAnchor((a) => stepAnchor(mode, a, dir)), [mode])

  const doReset = useCallback(() => {
    settingsApi.resetBaseline(now)
    setResetOpen(false)
    setUndoVisible(true)
    if (undoTimer.current) clearTimeout(undoTimer.current)
    undoTimer.current = setTimeout(() => setUndoVisible(false), 8000)
  }, [settingsApi, now])
  const doUndo = useCallback(() => {
    settingsApi.undoReset()
    setUndoVisible(false)
    if (undoTimer.current) clearTimeout(undoTimer.current)
  }, [settingsApi])
  useEffect(() => () => { if (undoTimer.current) clearTimeout(undoTimer.current) }, [])

  const selected = selectedDay ? byDay.get(selectedDay) ?? null : null
  const orientation = layout.orientation
  const effectiveStartLabel = settings.ignoreBefore ? settings.ignoreBefore : dataset.effectiveStart

  return (
    <Panel className={className}>
      <PanelHeader
        title={t('Study Rhythm')}
        icon={CalendarDays}
        action={
          <div className="flex items-center gap-1.5">
            <Segmented
              items={RHYTHM_CALENDAR_MODES.map((m) => ({ value: m, label: t(MODE_LABEL[m]) }))}
              value={mode}
              onChange={(m) => settingsApi.update({ calendarMode: m as RhythmCalendarMode })}
            />
            <IconButton icon={Settings2} label={t('Study Rhythm settings')} size="sm" onClick={() => setSettingsOpen(true)} />
            <IconButton icon={RotateCcw} label={t('Reset Study Rhythm')} size="sm" onClick={() => setResetOpen(true)} />
          </div>
        }
      />

      <div className="space-y-3 p-4">
        {/* Navigation */}
        <div className="flex items-center justify-between gap-2">
          <p className="tnum text-[12.5px] font-medium text-ink-2">{layout.rangeLabel}</p>
          <div className="flex items-center gap-1">
            {mode !== 'continuous' && (
              <>
                <IconButton icon={ChevronLeft} label={t('Previous')} size="sm" onClick={() => step(-1)} />
                <IconButton icon={ChevronRight} label={t('Next')} size="sm" onClick={() => step(1)} />
              </>
            )}
            <Button size="sm" variant="ghost" onClick={goToday}>{t('Today')}</Button>
          </div>
        </div>

        {/* The calendar */}
        {dataset.isEmpty ? (
          <p className="rounded-lg border border-dashed border-line-2 bg-surface-2 px-4 py-10 text-center text-[12.5px] text-ink-3">
            {t('No study activity in this range yet. Study some cards and your rhythm will appear here.')}
          </p>
        ) : (
          <RhythmCalendar
            layout={layout}
            scheme={settings.colorScheme}
            orientation={orientation}
            now={now}
            selectedDay={selectedDay}
            onSelect={setSelectedDay}
          />
        )}

        {/* Day detail */}
        <DayDetail cell={selected} day={selectedDay} hasReviewTime={dataset.stats.hasReviewTime} />

        {/* Legend */}
        <Legend scheme={settings.colorScheme} showForecast={settings.forecastLimit !== 'off'} />
      </div>

      {/* Statistics, from the same filtered dataset */}
      <div className="border-t border-line p-4">
        <RhythmStats stats={dataset.stats} settings={settings} />
      </div>

      {settingsOpen && (
        <RhythmSettingsDialog
          settings={settings}
          decks={deckOptions}
          onChange={settingsApi.set}
          onRestoreDefaults={settingsApi.restoreDefaults}
          onClose={() => setSettingsOpen(false)}
        />
      )}
      {resetOpen && (
        <ResetConfirmDialog
          effectiveStart={localDay(now)}
          onClose={() => setResetOpen(false)}
          onConfirm={doReset}
        />
      )}
      {undoVisible && (
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4" role="status">
          <div className="pointer-events-auto flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-2.5 shadow-float">
            <span className="text-[12.5px] text-ink-2">{t('Study Rhythm reset to today.')}</span>
            <Button size="sm" variant="secondary" iconLeft={Undo2} onClick={doUndo}>{t('Undo')}</Button>
          </div>
        </div>
      )}
      <p className="sr-only">{t('Reporting starts')} {effectiveStartLabel}.</p>
    </Panel>
  )
}

/** The calendar grid itself, orientation-aware, with roving keyboard focus. */
function RhythmCalendar({
  layout, scheme, orientation, now, selectedDay, onSelect,
}: {
  layout: CalendarLayout
  scheme: RhythmColorScheme
  orientation: 'rows' | 'columns'
  now: Date
  selectedDay: string | null
  onSelect: (day: string) => void
}) {
  const t = useT()
  const ramp = useMemo(() => rhythmRampVars(scheme), [scheme])
  const today = localDay(now)
  const focusDay = selectedDay ?? today

  // Roving focus: arrow keys move by one day (±1) or one week (±7).
  const onKeyDown = useCallback((e: React.KeyboardEvent, day: string) => {
    let delta = 0
    if (e.key === 'ArrowLeft') delta = orientation === 'columns' ? -7 : -1
    else if (e.key === 'ArrowRight') delta = orientation === 'columns' ? 7 : 1
    else if (e.key === 'ArrowUp') delta = orientation === 'columns' ? -1 : -7
    else if (e.key === 'ArrowDown') delta = orientation === 'columns' ? 1 : 7
    else return
    e.preventDefault()
    onSelect(addLocalDays(day, delta))
  }, [orientation, onSelect])

  const cellFor = (cd: CalendarDay | null, key: string) => {
    if (!cd) return <div key={key} className="size-[13px]" aria-hidden />
    const c = cd.cell
    const level = c?.level ?? 0
    const isForecast = cd.isForecast
    const solid = !isForecast
    const bg = solid ? ramp[level] : 'transparent'
    const label = cellLabel(cd, t)
    return (
      <button
        key={key}
        type="button"
        role="gridcell"
        tabIndex={cd.day === focusDay ? 0 : -1}
        onFocus={() => onSelect(cd.day)}
        onMouseEnter={() => onSelect(cd.day)}
        onClick={() => onSelect(cd.day)}
        onKeyDown={(e) => onKeyDown(e, cd.day)}
        aria-label={label}
        aria-current={cd.isToday ? 'date' : undefined}
        title={label}
        className={cn(
          'relative rounded-[2px] border outline-none transition-[box-shadow] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]',
          orientation === 'columns' ? 'size-[13px]' : 'aspect-square w-full min-w-[26px]',
          cd.muted && 'opacity-40',
          cd.isToday ? 'border-[var(--color-ink)]' : 'border-line',
          isForecast && 'border-dashed',
        )}
        style={{
          backgroundColor: bg,
          borderColor: cd.isToday ? 'var(--color-ink)' : isForecast && level > 0 ? ramp[level] : undefined,
        }}
      >
        {/* Forecast marker: a centered dot so it reads without colour. */}
        {isForecast && level > 0 && (
          <span
            className="absolute left-1/2 top-1/2 size-[4px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: ramp[level] }}
            aria-hidden
          />
        )}
      </button>
    )
  }

  if (orientation === 'rows') {
    // Weekly / Monthly: weeks stacked, weekday columns.
    return (
      <div className="space-y-1.5" role="grid" aria-label={t('Study Rhythm calendar')}>
        <div className="grid grid-cols-7 gap-1 text-center text-[10.5px] font-medium text-ink-3" aria-hidden>
          {WEEKDAY_LABELS.map((w) => <span key={w}>{t(w)}</span>)}
        </div>
        {layout.weeks.map((week, wi) => (
          <div key={wi} role="row" className="grid grid-cols-7 gap-1">
            {week.days.map((cd, di) => cellFor(cd, `${wi}-${di}`))}
          </div>
        ))}
      </div>
    )
  }

  // Yearly / Continuous: weeks as columns, weekday rows. Today divider on the column.
  return (
    <div className="overflow-x-auto" role="grid" aria-label={t('Study Rhythm calendar')}>
      <div className="flex gap-[3px]">
        {layout.weeks.map((week, wi) => (
          <div
            key={wi}
            role="row"
            className={cn('flex flex-col gap-[3px]', wi === layout.todayWeekIndex && 'relative')}
          >
            {wi === layout.todayWeekIndex && (
              <span className="absolute -left-[2px] top-0 h-full w-[1.5px] bg-[var(--color-primary)]" aria-hidden />
            )}
            {week.days.map((cd, di) => cellFor(cd, `${wi}-${di}`))}
          </div>
        ))}
      </div>
    </div>
  )
}

function cellLabel(cd: CalendarDay, t: (s: string) => string): string {
  const c = cd.cell
  if (cd.isForecast) {
    const due = c?.dueReviews ?? 0
    const proj = c?.projectedNew ?? 0
    return `${cd.day}: ${due} ${t('due')}, ${proj} ${t('projected new')} (${t('forecast')})`
  }
  const reviews = c?.reviews ?? 0
  const mins = Math.round((c?.timeMs ?? 0) / 60000)
  return `${cd.day}: ${reviews} ${reviews === 1 ? t('review') : t('reviews')}${mins > 0 ? `, ${formatMinutes(mins)}` : ''}`
}

function DayDetail({ cell, day, hasReviewTime }: { cell: RhythmDayCell | null; day: string | null; hasReviewTime: boolean }) {
  const t = useT()
  if (!day) return <p className="min-h-[1.25rem] text-[11.5px] text-ink-3">{t('Hover or focus a day for details.')}</p>
  const isForecast = cell?.kind === 'forecast'
  const mins = Math.round((cell?.timeMs ?? 0) / 60000)
  return (
    <p className="min-h-[1.25rem] text-[11.5px] text-ink-2">
      <span className="tnum font-medium text-ink">{day}</span>
      {' · '}
      {isForecast ? (
        <>
          <span className="tnum">{cell?.dueReviews ?? 0}</span> {t('due')} · <span className="tnum">{cell?.projectedNew ?? 0}</span> {t('projected new (est.)')}
        </>
      ) : (
        <>
          <span className="tnum">{cell?.reviews ?? 0}</span> {t('reviews')}
          {hasReviewTime && mins > 0 && <> · {formatMinutes(mins)}</>}
        </>
      )}
    </p>
  )
}

function Legend({ scheme, showForecast }: { scheme: import('@/data/flashcards/rhythm/rhythmSettings').RhythmColorScheme; showForecast: boolean }) {
  const t = useT()
  const ramp = rhythmRampVars(scheme)
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 text-[11px] text-ink-3">
      <div className="flex items-center gap-1.5">
        <span>{t('Less')}</span>
        {ramp.map((c, i) => <span key={i} className="size-[10px] rounded-[2px] border border-line" style={{ backgroundColor: c }} aria-hidden />)}
        <span>{t('More')}</span>
      </div>
      {showForecast && (
        <div className="flex items-center gap-1.5">
          <span className="grid size-[10px] place-items-center rounded-[2px] border border-dashed" style={{ borderColor: ramp[3] }} aria-hidden>
            <span className="size-[3px] rounded-full" style={{ backgroundColor: ramp[3] }} />
          </span>
          <span>{t('Forecast (estimated)')}</span>
        </div>
      )}
    </div>
  )
}

function ResetConfirmDialog({ effectiveStart, onClose, onConfirm }: { effectiveStart: string; onClose: () => void; onConfirm: () => void }) {
  const t = useT()
  const [busy, setBusy] = useState(false)
  return (
    <Dialog onClose={onClose} label={t('Reset Study Rhythm')} size="sm">
      <PanelHeader title={t('Reset Study Rhythm')} icon={RotateCcw} />
      <div className="space-y-4 p-5">
        <p className="text-[13.5px] leading-relaxed text-ink-2">
          {t('This sets your rhythm baseline to today. Streaks and totals will start fresh from')} <span className="tnum font-medium text-ink">{effectiveStart}</span>.
        </p>
        <p className="rounded-md border border-line bg-surface-2 px-3 py-2 text-[12.5px] text-ink-2">
          {t('Your flashcards, decks, schedules and review history are NOT deleted. You can bring older activity back any time by changing or clearing the “ignore before” date in settings.')}
        </p>
        <div className="flex justify-end gap-2 border-t border-line pt-4">
          <Button variant="ghost" onClick={onClose}>{t('Cancel')}</Button>
          <Button variant="primary" iconLeft={RotateCcw} disabled={busy} onClick={() => { setBusy(true); onConfirm() }}>{t('Reset to today')}</Button>
        </div>
      </div>
    </Dialog>
  )
}
