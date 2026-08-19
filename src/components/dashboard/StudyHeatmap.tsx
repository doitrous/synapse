import { useMemo } from 'react'
import { Activity } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { currentStreak, dailyCounts, longestStreak, type DayCount } from '@/data/attemptStats'
import { useAttemptHistory } from '@/lib/useAttemptLog'
import { formatDayLabel } from '@/lib/format'
import { useT } from '@/lib/i18n'

const DAY_MS = 86_400_000
const WEEKS = 17
const DAYS = WEEKS * 7
const SCALE = [
  'var(--color-scale-0)',
  'var(--color-scale-1)',
  'var(--color-scale-2)',
  'var(--color-scale-3)',
  'var(--color-scale-4)',
  'var(--color-scale-5)',
]

function mondayIndex(d: Date): number {
  return (d.getDay() + 6) % 7 // Mon = 0 … Sun = 6
}

/**
 * How dark a day is, by questions answered.
 *
 * This used to be minutes of study, which nothing ever measured — the series
 * was generated from a seeded random number generator. Answers are what the
 * app actually records, so that is what the squares mean now.
 */
function level(answered: number): number {
  if (answered <= 0) return 0
  if (answered < 5) return 1
  if (answered < 10) return 2
  if (answered < 20) return 3
  if (answered < 35) return 4
  return 5
}

function startOfDay(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
}

interface Cell extends DayCount {
  day: Date
}

/** Bucket the flat series into weekday-aligned week columns. */
function buildColumns(cells: Cell[]): (Cell | null)[][] {
  if (!cells.length) return []
  const first = cells[0].day
  const weekStart0 = new Date(first)
  weekStart0.setDate(first.getDate() - mondayIndex(first))
  const base = startOfDay(weekStart0)

  const cols: (Cell | null)[][] = []
  for (const c of cells) {
    const days = Math.round((startOfDay(c.day) - base) / DAY_MS)
    const col = Math.floor(days / 7)
    const row = days % 7
    if (!cols[col]) cols[col] = Array<Cell | null>(7).fill(null)
    cols[col][row] = c
  }
  return cols
}

const DAY_LABELS = ['Mon', '', 'Wed', '', 'Fri', '', '']

export function StudyHeatmap() {
  const t = useT()
  const { records } = useAttemptHistory()

  const cells = useMemo<Cell[]>(
    () => dailyCounts(records, DAYS).map((day) => ({ ...day, day: new Date(`${day.date}T00:00:00`) })),
    [records],
  )
  const columns = useMemo(() => buildColumns(cells), [cells])

  const totalAnswered = cells.reduce((sum, cell) => sum + cell.attempts, 0)
  const activeDays = cells.filter((cell) => cell.attempts > 0).length
  const dailyAverage = activeDays ? Math.round(totalAnswered / activeDays) : 0
  const streak = currentStreak(records)
  const longest = longestStreak(records)

  return (
    <Panel className="h-full min-w-0">
      <PanelHeader
        title={t('Study heatmap')}
        icon={Activity}
        hint={t('Questions answered per day · last 17 weeks')}
        action={
          <div className="flex items-center gap-1.5">
            <Badge tone="primary">{totalAnswered} {t('answered')}</Badge>
            {streak > 0 && <Badge tone="success">{streak}{t('-day streak')}</Badge>}
          </div>
        }
      />
      <div className="p-4 sm:p-5">
        <div className="overflow-x-auto pb-1">
          <div className="mx-auto flex w-max gap-2">
            {/* weekday rail */}
            <div className="flex shrink-0 flex-col gap-[3px] pt-[1px]">
              {DAY_LABELS.map((d, i) => (
                <span key={i} className="h-[13px] text-[9px] leading-[13px] text-ink-3" style={{ width: 22 }}>
                  {d}
                </span>
              ))}
            </div>
            {/* week columns */}
            <div className="flex gap-[3px]">
              {columns.map((col, ci) => (
                <div key={ci} className="flex flex-col gap-[3px]">
                  {Array.from({ length: 7 }).map((_, ri) => {
                    const cell = col[ri]
                    if (!cell) return <span key={ri} className="size-[13px]" />
                    return (
                      <span
                        key={ri}
                        className="size-[13px] rounded-[3px] ring-1 ring-inset ring-black/[0.04] transition-transform duration-100 hover:scale-[1.35]"
                        style={{ backgroundColor: SCALE[level(cell.attempts)] }}
                        title={
                          cell.attempts > 0
                            ? `${cell.attempts} ${cell.attempts === 1 ? t('answer') : t('answers')} · ${formatDayLabel(cell.day)}`
                            : `${t('Nothing answered')} · ${formatDayLabel(cell.day)}`
                        }
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-[12px] text-ink-3">
            {totalAnswered > 0 ? (
              <>
                {t("You've answered")}{' '}
                <span className="tnum font-mono font-medium text-ink-2">{totalAnswered} {t('questions')}</span>{' '}
                {t('over this block.')}
              </>
            ) : (
              t('Nothing answered yet — every question you work through fills a square.')
            )}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-ink-3">
            <span>{t('Less')}</span>
            {SCALE.map((c) => (
              <span key={c} className="size-[11px] rounded-[3px] ring-1 ring-inset ring-black/[0.04]" style={{ backgroundColor: c }} />
            ))}
            <span>{t('More')}</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
          {[
            [t('Daily average'), activeDays ? `${dailyAverage} ${t('a day')}` : '—'],
            [t('Days learned'), cells.length ? `${Math.round((activeDays / cells.length) * 100)}%` : '—'],
            [t('Longest streak'), `${longest} ${t('days')}`],
            [t('Current streak'), `${streak} ${t('days')}`],
          ].map(([label, value]) => (
            <div key={label} className="bg-surface px-3 py-2.5">
              <p className="tnum font-mono text-[14px] font-semibold text-ink">{value}</p>
              <p className="mt-0.5 text-[11px] text-ink-3">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  )
}
