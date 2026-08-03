import { Activity } from 'lucide-react'
import type { HeatCell } from '@/data/types'
import { studyHeatmap } from '@/data/student'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { formatDayLabel, formatMinutes } from '@/lib/format'

const DAY_MS = 86_400_000
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

function level(minutes: number): number {
  if (minutes <= 0) return 0
  if (minutes < 45) return 1
  if (minutes < 90) return 2
  if (minutes < 150) return 3
  if (minutes < 210) return 4
  return 5
}

function startOfDay(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
}

/** Bucket the flat series into weekday-aligned week columns. */
function buildColumns(cells: HeatCell[]): (HeatCell | null)[][] {
  const first = cells[0].date
  const weekStart0 = new Date(first)
  weekStart0.setDate(first.getDate() - mondayIndex(first))
  const base = startOfDay(weekStart0)

  const cols: (HeatCell | null)[][] = []
  for (const c of cells) {
    const days = Math.round((startOfDay(c.date) - base) / DAY_MS)
    const col = Math.floor(days / 7)
    const row = days % 7
    if (!cols[col]) cols[col] = Array<HeatCell | null>(7).fill(null)
    cols[col][row] = c
  }
  return cols
}

const columns = buildColumns(studyHeatmap)
const totalMinutes = studyHeatmap.reduce((s, c) => s + c.minutes, 0)

function currentStreak(): number {
  let n = 0
  for (let i = studyHeatmap.length - 1; i >= 0; i--) {
    if (studyHeatmap[i].minutes > 0) n++
    else break
  }
  return n
}

const DAY_LABELS = ['Mon', '', 'Wed', '', 'Fri', '', '']

export function StudyHeatmap() {
  const streak = currentStreak()
  const activeDays = studyHeatmap.filter((cell) => cell.minutes > 0).length
  const dailyAverage = Math.round(totalMinutes / Math.max(1, activeDays))
  let longest = 0
  let run = 0
  studyHeatmap.forEach((cell) => {
    run = cell.minutes > 0 ? run + 1 : 0
    longest = Math.max(longest, run)
  })

  return (
    <Panel className="h-full min-w-0">
      <PanelHeader
        title="Study heatmap"
        icon={Activity}
        hint="Minutes per day · last 17 weeks"
        action={
          <div className="flex items-center gap-1.5">
            <Badge tone="accent">{Math.round(totalMinutes / 60)}h total</Badge>
            <Badge tone="success">{streak}-day streak</Badge>
          </div>
        }
      />
      <div className="p-4 sm:p-5">
        <div className="overflow-x-auto pb-1">
          <div className="flex gap-2">
            {/* weekday rail */}
            <div className="flex shrink-0 flex-col gap-[3px] pt-[1px]">
              {DAY_LABELS.map((d, i) => (
                <span
                  key={i}
                  className="h-[13px] text-[9px] leading-[13px] text-ink-3"
                  style={{ width: 22 }}
                >
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
                        style={{ backgroundColor: SCALE[level(cell.minutes)] }}
                        title={
                          cell.minutes > 0
                            ? `${formatMinutes(cell.minutes)} · ${formatDayLabel(cell.date)}`
                            : `No study · ${formatDayLabel(cell.date)}`
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
            You've studied{' '}
            <span className="tnum font-mono font-medium text-ink-2">
              {Math.round(totalMinutes / 60)} hours
            </span>{' '}
            over this block.
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-ink-3">
            <span>Less</span>
            {SCALE.map((c) => (
              <span
                key={c}
                className="size-[11px] rounded-[3px] ring-1 ring-inset ring-black/[0.04]"
                style={{ backgroundColor: c }}
              />
            ))}
            <span>More</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
          {[
            ['Daily average', `${dailyAverage} min`],
            ['Days learned', `${Math.round((activeDays / studyHeatmap.length) * 100)}%`],
            ['Longest streak', `${longest} days`],
            ['Current streak', `${streak} days`],
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
