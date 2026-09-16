import { useMemo, useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Select } from '@/components/ui/Field'
import { EmptyState } from '@/components/ui/EmptyState'
import { accuracyOf, localDay, marked } from '@/data/attemptStats'
import { HISTORY_MONTHS, useAttemptHistory } from '@/lib/useAttemptLog'
import type { AttemptRecord } from '@/data/attempts'
import { useT } from '@/lib/i18n'

type Range = 'week' | 'month' | 'year'

/** Marked answers needed in a bucket before its accuracy is worth plotting. */
const MIN_MARKED_PER_POINT = 3

/** Marked answers needed overall before the chart says anything at all. */
const MIN_MARKED_TOTAL = 10

interface Bucket {
  label: string
  accuracy: number | null
  marked: number
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/**
 * Group marked answers into the buckets a range is drawn from.
 *
 * A bucket with too little in it reports null rather than a percentage: one
 * answer on a Tuesday is not a Tuesday accuracy, and plotting it as 0% or 100%
 * makes the line swing on noise.
 */
function bucketsFor(records: AttemptRecord[], range: Range, now = new Date()): Bucket[] {
  const scored = marked(records)
  const buckets: Bucket[] = []

  const summarise = (label: string, items: AttemptRecord[]): Bucket => ({
    label,
    accuracy: items.length >= MIN_MARKED_PER_POINT ? accuracyOf(items) : null,
    marked: items.length,
  })

  if (range === 'week') {
    for (let back = 6; back >= 0; back--) {
      const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() - back)
      const key = localDay(day)
      buckets.push(summarise(WEEKDAYS[day.getDay()], scored.filter((record) => localDay(record.at) === key)))
    }
    return buckets
  }

  if (range === 'month') {
    for (let back = 3; back >= 0; back--) {
      const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() - back * 7)
      const start = new Date(end.getFullYear(), end.getMonth(), end.getDate() - 6)
      buckets.push(summarise(`W${4 - back}`, scored.filter((record) => {
        const at = new Date(record.at)
        return at >= start && at <= new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59)
      })))
    }
    return buckets
  }

  for (let back = HISTORY_MONTHS - 1; back >= 0; back--) {
    const month = new Date(now.getFullYear(), now.getMonth() - back, 1)
    buckets.push(summarise(MONTHS[month.getMonth()], scored.filter((record) => {
      const at = new Date(record.at)
      return at.getFullYear() === month.getFullYear() && at.getMonth() === month.getMonth()
    })))
  }
  return buckets
}

function points(buckets: Bucket[]) {
  return buckets.map((bucket, index) => {
    const x = buckets.length === 1 ? 50 : (index / (buckets.length - 1)) * 100
    const value = bucket.accuracy === null ? null : Math.round(bucket.accuracy * 100)
    // The plot is zoomed to the 40–100% band (gridlines only mark 50/75/100),
    // so the formula below extrapolates past the bottom of the SVG's own
    // viewBox for anything under it — a struggling student scoring, say, 10%
    // first-attempt accuracy in a bucket got a y far past the chart's drawable
    // area, rendering the point (and the line into it) below the panel and
    // over whatever sits under it on the page. Clamp to the viewBox's usable
    // floor so a low score pins to the bottom of the chart instead of escaping it.
    const y = value === null ? null : Math.min(100, 92 - ((value - 40) / 60) * 82)
    return { x, y, value, bucket }
  })
}

/**
 * First-attempt accuracy over time, from the student's own answers.
 *
 * The "year median" comparison line is gone. It was a literal array, and there
 * is no cohort aggregate anywhere in this product to replace it with — a
 * comparison drawn against invented numbers is worse than no comparison.
 */
export function PerformanceOverview({ compact = false }: { compact?: boolean }) {
  const t = useT()
  const [range, setRange] = useState<Range>('week')
  const [hovered, setHovered] = useState<number | null>(null)
  const { records } = useAttemptHistory()

  const buckets = useMemo(() => bucketsFor(records, range), [records, range])
  const plotted = useMemo(() => points(buckets), [buckets])
  const totalMarked = buckets.reduce((sum, bucket) => sum + bucket.marked, 0)

  // Only consecutive plotted points can be joined; a gap is a gap.
  const segments = useMemo(() => {
    const runs: Array<Array<{ x: number; y: number }>> = []
    let run: Array<{ x: number; y: number }> = []
    for (const point of plotted) {
      if (point.y === null) { if (run.length) runs.push(run); run = [] }
      else run.push({ x: point.x, y: point.y })
    }
    if (run.length) runs.push(run)
    return runs
  }, [plotted])

  if (totalMarked < MIN_MARKED_TOTAL) {
    return (
      <Panel className="flex h-full flex-col">
        <PanelHeader title={t('Performance overview')} icon={TrendingUp} hint={t('First-attempt accuracy')} />
        <div className="flex flex-1 items-center justify-center p-4">
          <EmptyState
            icon={TrendingUp}
            title={t('Not enough answers yet')}
            description={t('Answer at least ten questions and your accuracy over time appears here.')}
          />
        </div>
      </Panel>
    )
  }

  return (
    <Panel className="flex h-full flex-col">
      <PanelHeader
        title={t('Performance overview')}
        icon={TrendingUp}
        hint={t('Your accuracy on marked answers')}
        action={
          <Select value={range} onChange={(event) => setRange(event.target.value as Range)} className="h-8 w-28 text-[12px]">
            <option value="week">{t('Last week')}</option>
            <option value="month">{t('Last month')}</option>
            <option value="year">{t('Last 6 months')}</option>
          </Select>
        }
      />
      <div className={compact ? 'flex-1 px-4 pb-3 pt-2' : 'flex-1 px-4 pb-4 pt-3 sm:px-5'}>
        <div className={compact ? 'relative h-[86px] select-none' : 'relative h-52 select-none'}>
          <svg viewBox="-5 0 110 112" preserveAspectRatio="none" className="h-full w-full overflow-visible" role="img" aria-label={t('Your accuracy over time')}>
            {[50, 75, 100].map((tick) => {
              const y = 92 - ((tick - 40) / 60) * 82
              return <line key={tick} x1="0" x2="100" y1={y} y2={y} stroke="var(--color-grid-major)" strokeWidth="0.45" strokeDasharray="1.5 1.5" />
            })}
            {segments.map((segment, index) => (
              <polyline
                key={`${range}-${index}`}
                className="performance-line-fill"
                points={segment.map((point) => `${point.x},${point.y}`).join(' ')}
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {plotted.map((point, index) => (
              <g key={`${point.bucket.label}-${index}`}>
                <rect
                  x={point.x - 100 / plotted.length / 2}
                  y="0"
                  width={100 / plotted.length}
                  height="100"
                  fill="transparent"
                  role="button"
                  tabIndex={0}
                  aria-label={point.value === null
                    ? `${point.bucket.label}: ${t('not enough answers')}`
                    : `${point.bucket.label}: ${point.value}%`}
                  onPointerEnter={() => setHovered(index)}
                  onPointerLeave={(event) => event.pointerType === 'mouse' && setHovered(null)}
                  onClick={() => setHovered((current) => current === index ? null : index)}
                  onKeyDown={(event) => {
                    if (event.key !== 'Enter' && event.key !== ' ') return
                    event.preventDefault()
                    setHovered((current) => current === index ? null : index)
                  }}
                  onFocus={() => setHovered(index)}
                  onBlur={() => setHovered(null)}
                />
                {point.y !== null && (
                  <circle cx={point.x} cy={point.y} r={hovered === index ? 1.8 : 1.1} fill="var(--color-surface)" stroke="var(--color-primary)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                )}
              </g>
            ))}
          </svg>
          {hovered != null && (
            <div
              className="pointer-events-none absolute top-2 z-10 min-w-36 rounded-lg border border-line bg-surface p-2.5 shadow-raised"
              style={{ left: `clamp(0px, calc(${plotted[hovered].x}% - 72px), calc(100% - 144px))` }}
            >
              <p className="text-[11px] font-semibold text-ink">{plotted[hovered].bucket.label}</p>
              {plotted[hovered].value === null ? (
                <p className="mt-1 text-[11.5px] text-ink-3">{t('Not enough answers to score')}</p>
              ) : (
                <>
                  <p className="mt-1 text-[11.5px] text-ink-2">{t('Your accuracy')} <span className="tnum font-mono font-semibold text-primary-strong">{plotted[hovered].value}%</span></p>
                  <p className="text-[11.5px] text-ink-3">{plotted[hovered].bucket.marked} {t('marked answers')}</p>
                </>
              )}
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 flex justify-between text-[10.5px] text-ink-3">
            {buckets.map((bucket, index) => <span key={`${bucket.label}-${index}`}>{bucket.label}</span>)}
          </div>
        </div>
      </div>
    </Panel>
  )
}
