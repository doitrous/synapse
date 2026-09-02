import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Settings2, RotateCcw, ChevronLeft, ChevronRight, CalendarDays, Undo2 } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Dialog } from '@/components/ui/Dialog'
import { Segmented } from '@/components/ui/Tabs'
import { useScope } from '@/lib/shortcuts/useShortcuts'
import { cn } from '@/lib/cn'
import { useI18n, useT } from '@/lib/i18n'
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

/**
 * One cell size and gap per mode, so every mode draws the *same* small square
 * in the *same* stage and only the count of squares changes. Weekly and Monthly
 * grow by two or three pixels, never into a full calendar — a month of 16 px
 * cells is still a block you take in at a glance, which is the whole point of a
 * heatmap. Fixed widths (not `w-full`) are what keeps that true: a percentage
 * cell balloons to fill whatever the panel is wide.
 */
const CELL_METRICS: Record<RhythmCalendarMode, { cell: string; gap: string; columns: string }> = {
  weekly: { cell: 'size-[18px]', gap: 'gap-1', columns: 'grid-cols-[repeat(7,18px)]' },
  monthly: { cell: 'size-4', gap: 'gap-[3px]', columns: 'grid-cols-[repeat(7,16px)]' },
  yearly: { cell: 'size-[13px]', gap: 'gap-[3px]', columns: 'grid-cols-[repeat(7,13px)]' },
  continuous: { cell: 'size-[13px]', gap: 'gap-[3px]', columns: 'grid-cols-[repeat(7,13px)]' },
}

/**
 * Monday-first single-letter column heads, in the reader's own language, from
 * `Intl` rather than seven more translation keys — the English initials collide
 * (Tue/Thu, Sat/Sun) and so cannot be keyed by their own text. 2024-01-01 was a
 * Monday; noon keeps the date away from any DST edge.
 */
function weekdayInitials(lang: string): string[] {
  const format = new Intl.DateTimeFormat(lang, { weekday: 'narrow' })
  return Array.from({ length: 7 }, (_, i) => format.format(new Date(2024, 0, 1 + i, 12)))
}

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
  // Keyboard arrow move: select a day AND bring it into view (weekly/monthly/
  // yearly page to its week/month/year; continuous ignores the anchor).
  const onMove = useCallback((day: string) => { setSelectedDay(day); setAnchor(day) }, [])

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
          /* The header's own wrap cannot reach inside a single child, so this
             row wraps too: on a phone the segmented control takes the first
             line and the two icon actions follow it. */
          <div className="flex items-center gap-1.5 max-sm:flex-wrap max-sm:justify-end">
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

      <div className="p-4">
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

        {/* The stage: one centred block of the same vertical rhythm in every
            mode, so switching Weekly → Continuous never moves the panel around
            the reader. Only the number of squares inside it changes. */}
        <div className="flex justify-center py-3.5">
          {dataset.isEmpty ? (
            <p className="rounded-lg border border-dashed border-line-2 bg-surface-2 px-4 py-6 text-center text-[12.5px] text-ink-3">
              {t('No study activity in this range yet. Study some cards and your rhythm will appear here.')}
            </p>
          ) : (
            <RhythmCalendar
              layout={layout}
              mode={mode}
              scheme={settings.colorScheme}
              orientation={orientation}
              now={now}
              anchor={anchor}
              selectedDay={selectedDay}
              onSelect={setSelectedDay}
              onMove={onMove}
            />
          )}
        </div>

        {/* Day detail, centred under the stage */}
        <DayDetail cell={selected} day={selectedDay} hasReviewTime={dataset.stats.hasReviewTime} />

        {/* Legend */}
        <Legend scheme={settings.colorScheme} showForecast={settings.forecastLimit !== 'off'} />
      </div>

      {/* Statistics, from the same filtered dataset — the panel's last row, so
          they read as a footer to the heatmap rather than a separate object. */}
      <RhythmStats stats={dataset.stats} settings={settings} />

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
      <div className="sr-only">
        <p>{t('Reporting starts')} {effectiveStartLabel}.</p>
        <HeatmapDataTable dataset={dataset} />
      </div>
    </Panel>
  )
}

/** The calendar grid itself, orientation-aware, with roving keyboard focus. */
function RhythmCalendar({
  layout, mode, scheme, orientation, now, anchor, selectedDay, onSelect, onMove,
}: {
  layout: CalendarLayout
  mode: RhythmCalendarMode
  scheme: RhythmColorScheme
  orientation: 'rows' | 'columns'
  now: Date
  anchor: string
  selectedDay: string | null
  onSelect: (day: string) => void
  onMove: (day: string) => void
}) {
  const { t, lang } = useI18n()
  const ramp = useMemo(() => rhythmRampVars(scheme), [scheme])
  const initials = useMemo(() => weekdayInitials(lang), [lang])
  const metrics = CELL_METRICS[mode]
  const today = localDay(now)
  const focusDay = selectedDay ?? today
  const gridRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const navPending = useRef(false)

  // After a keyboard move, follow DOM focus to the newly-active cell (the parent
  // re-anchors the view so that day is rendered). Guarded by navPending so
  // hover/click — which also set the selected day — never steal focus.
  useEffect(() => {
    if (!navPending.current) return
    navPending.current = false
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-day="${focusDay}"]`)?.focus()
  }, [focusDay])

  // Roving focus: arrow keys move by one day or one week (following orientation),
  // moving both the selection and the view so traversal never dead-ends at an edge.
  const onKeyDown = useCallback((e: React.KeyboardEvent, day: string) => {
    let delta = 0
    if (e.key === 'ArrowLeft') delta = orientation === 'columns' ? -7 : -1
    else if (e.key === 'ArrowRight') delta = orientation === 'columns' ? 7 : 1
    else if (e.key === 'ArrowUp') delta = orientation === 'columns' ? -1 : -7
    else if (e.key === 'ArrowDown') delta = orientation === 'columns' ? 1 : 7
    else return
    e.preventDefault()
    navPending.current = true
    onMove(addLocalDays(day, delta))
  }, [orientation, onMove])

  // Keep today in view when the grid is wider than the stage. Only the columns
  // orientation can be — a week or a month is always narrower than the panel —
  // and the scroller is the stage's own child, never the panel, so a wide
  // Continuous range never turns the whole card into a scroll box.
  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const target = scroller.querySelector<HTMLElement>(`[data-day="${today}"]`)
    // `block: 'nearest'` so bringing a column into view never scrolls the page.
    target?.scrollIntoView({ inline: 'center', block: 'nearest' })
  }, [today, anchor, mode])

  const cellFor = (cd: CalendarDay | null, key: string) => {
    if (!cd) return <div key={key} className={metrics.cell} aria-hidden />
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
        data-day={cd.day}
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
          metrics.cell,
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
    // Weekly / Monthly: weeks stacked, weekday columns — the same squares as
    // the other two modes, in a 7-column block sized to the cell, not to the
    // panel. Weekly is that block one row deep.
    return (
      <div
        ref={gridRef}
        className={cn('flex flex-col items-center', metrics.gap)}
        role="grid"
        aria-label={t('Study Rhythm calendar')}
      >
        <div className={cn('grid text-center text-[9.5px] text-ink-3', metrics.columns, metrics.gap)} aria-hidden>
          {initials.map((initial, i) => <span key={WEEKDAY_LABELS[i]}>{initial}</span>)}
        </div>
        {layout.weeks.map((week, wi) => (
          <div key={wi} role="row" className={cn('grid', metrics.columns, metrics.gap)}>
            {week.days.map((cd, di) => cellFor(cd, `${wi}-${di}`))}
          </div>
        ))}
      </div>
    )
  }

  // Yearly / Continuous: weeks as columns, weekday rows. Today divider on the
  // column. The scroll box is here, inside the stage — a wide range scrolls
  // itself and leaves the panel (and its tooltips and focus rings) alone.
  return (
    <div ref={scrollerRef} className="max-w-full overflow-x-auto">
      <div ref={gridRef} className={cn('flex', metrics.gap)} role="grid" aria-label={t('Study Rhythm calendar')}>
        {layout.weeks.map((week, wi) => (
          <div
            key={wi}
            role="row"
            className={cn('flex flex-col', metrics.gap, wi === layout.todayWeekIndex && 'relative')}
          >
            {wi === layout.todayWeekIndex && (
              <span className="absolute -start-[2px] top-0 h-full w-[1.5px] bg-[var(--color-primary)]" aria-hidden />
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
  if (!day) return <p className="min-h-[1.25rem] text-center text-[11.5px] text-ink-3">{t('Hover or focus a day for details.')}</p>
  const isForecast = cell?.kind === 'forecast'
  const mins = Math.round((cell?.timeMs ?? 0) / 60000)
  return (
    <p className="min-h-[1.25rem] text-center text-[11.5px] text-ink-2">
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
    <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 text-[11px] text-ink-3">
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

/** A screen-reader data-table mirror of the heatmap — the days that carry data. */
function HeatmapDataTable({ dataset }: { dataset: RhythmDataset }) {
  const t = useT()
  const rows = dataset.days.filter((d) => d.reviews > 0 || d.dueReviews > 0 || d.projectedNew > 0)
  if (rows.length === 0) return null
  return (
    <table>
      <caption>{t('Study Rhythm activity and forecast by day')}</caption>
      <thead>
        <tr>
          <th scope="col">{t('Day')}</th>
          <th scope="col">{t('Reviews')}</th>
          <th scope="col">{t('Due')}</th>
          <th scope="col">{t('Projected new')}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((d) => (
          <tr key={d.day}>
            <th scope="row">{d.day}{d.kind === 'forecast' ? ` (${t('forecast')})` : ''}</th>
            <td>{d.reviews}</td>
            <td>{d.dueReviews}</td>
            <td>{d.projectedNew}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function ResetConfirmDialog({ effectiveStart, onClose, onConfirm }: { effectiveStart: string; onClose: () => void; onConfirm: () => void }) {
  const t = useT()
  useScope('dialog', { exclusive: true })
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
