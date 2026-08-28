import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { IconButton } from '@/components/ui/IconButton'
import { useT } from '@/lib/i18n'
import { formatMinutes } from '@/lib/format'
import type { HeatmapDay } from '@/data/flashcards/stats'
import { localDay, addLocalDays } from '@/data/flashcards/time'

/**
 * A GitHub-style study calendar, built from review events and coloured with the
 * shared `--color-scale-0..5` tokens so it follows the theme. Cells are focusable
 * and carry an accessible label with the exact reviews and time studied; no-data
 * is `scale-0`, distinct from a low-activity `scale-1`. The year window shifts
 * with the arrows so history further back stays reachable.
 */

const WEEKS = 26
const SCALE = ['var(--color-scale-0)', 'var(--color-scale-1)', 'var(--color-scale-2)', 'var(--color-scale-3)', 'var(--color-scale-4)', 'var(--color-scale-5)']

function level(reviews: number): number {
  if (reviews <= 0) return 0
  if (reviews < 5) return 1
  if (reviews < 10) return 2
  if (reviews < 20) return 3
  if (reviews < 35) return 4
  return 5
}

function mondayIndex(day: string): number {
  const [y, m, d] = day.split('-').map(Number)
  return (new Date(y, m - 1, d).getDay() + 6) % 7
}

export function HeatmapGrid({ days, now }: { days: HeatmapDay[]; now: Date }) {
  const t = useT()
  const [weeksBack, setWeeksBack] = useState(0)
  const byDay = useMemo(() => new Map(days.map((d) => [d.day, d])), [days])

  // The window ends `weeksBack` weeks before today, snapped to the week end.
  const endDay = addLocalDays(localDay(now), -weeksBack * 7)
  const columns = useMemo(() => {
    // Walk back from endDay to fill WEEKS columns of 7 days, Monday-first.
    const endMon = mondayIndex(endDay)
    const lastCellDay = addLocalDays(endDay, 6 - endMon)
    const cols: { day: string; data?: HeatmapDay }[][] = []
    for (let w = WEEKS - 1; w >= 0; w--) {
      const col: { day: string; data?: HeatmapDay }[] = []
      for (let d = 0; d < 7; d++) {
        const day = addLocalDays(lastCellDay, -(w * 7) - (6 - d))
        col.push({ day, data: byDay.get(day) })
      }
      cols.push(col)
    }
    return cols
  }, [endDay, byDay])

  const first = columns[0]?.[0]?.day
  const last = columns[columns.length - 1]?.[6]?.day

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="tnum text-[12px] text-ink-3">{first} → {last}</p>
        <div className="flex items-center gap-1">
          <IconButton icon={ChevronLeft} label={t('Earlier')} size="sm" onClick={() => setWeeksBack((w) => w + WEEKS)} />
          <IconButton icon={ChevronRight} label={t('Later')} size="sm" onClick={() => setWeeksBack((w) => Math.max(0, w - WEEKS))} disabled={weeksBack === 0} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-[3px]" role="img" aria-label={t('Study calendar')}>
          {columns.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-[3px]">
              {col.map((cell) => {
                const reviews = cell.data?.reviews ?? 0
                const minutes = Math.round((cell.data?.timeMs ?? 0) / 60000)
                return (
                  <div
                    key={cell.day}
                    tabIndex={0}
                    className="size-[11px] rounded-[2px] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                    style={{ backgroundColor: SCALE[level(reviews)] }}
                    aria-label={`${cell.day}: ${reviews} ${reviews === 1 ? t('review') : t('reviews')}${minutes > 0 ? `, ${formatMinutes(minutes)}` : ''}`}
                    title={`${cell.day} · ${reviews} ${reviews === 1 ? t('review') : t('reviews')}${minutes > 0 ? ` · ${formatMinutes(minutes)}` : ''}`}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-end gap-1.5 text-[11px] text-ink-3">
        {t('Less')}
        {SCALE.map((c, i) => <span key={i} className="size-[10px] rounded-[2px]" style={{ backgroundColor: c }} aria-hidden />)}
        {t('More')}
      </div>
    </div>
  )
}
