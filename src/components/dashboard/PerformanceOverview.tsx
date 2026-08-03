import { useMemo, useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Select } from '@/components/ui/Field'

type Range = 'week' | 'month' | 'year'

const SERIES: Record<Range, { labels: string[]; you: number[]; year: number[] }> = {
  week: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    you: [71, 67, 80, 75, 86, 92, 89],
    year: [64, 65, 66, 67, 68, 69, 69],
  },
  month: {
    labels: ['W1', 'W2', 'W3', 'W4'],
    you: [66, 70, 78, 86],
    year: [64, 65, 67, 69],
  },
  year: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    you: [57, 62, 68, 71, 74, 80, 86],
    year: [61, 62, 63, 64, 66, 68, 69],
  },
}

function points(values: number[]) {
  return values.map((value, index) => {
    const x = values.length === 1 ? 50 : (index / (values.length - 1)) * 100
    const y = 92 - ((value - 40) / 60) * 82
    return { x, y, value }
  })
}

export function PerformanceOverview({ compact = false }: { compact?: boolean }) {
  const [range, setRange] = useState<Range>('week')
  const [hovered, setHovered] = useState<number | null>(null)
  const data = SERIES[range]
  const yourPoints = useMemo(() => points(data.you), [data])
  const yearPoints = useMemo(() => points(data.year), [data])
  const line = (pts: ReturnType<typeof points>) => pts.map((p) => `${p.x},${p.y}`).join(' ')
  const area = `0,92 ${line(yourPoints)} 100,92`

  return (
    <Panel className="flex h-full flex-col">
      <PanelHeader
        title="Performance overview"
        icon={TrendingUp}
        hint="First-attempt accuracy"
        action={
          <Select value={range} onChange={(event) => setRange(event.target.value as Range)} className="h-8 w-28 text-[12px]">
            <option value="week">Last week</option>
            <option value="month">Last month</option>
            <option value="year">Last year</option>
          </Select>
        }
      />
      <div className={compact ? 'flex-1 px-4 pb-3 pt-2' : 'flex-1 px-4 pb-4 pt-3 sm:px-5'}>
        <div className={compact ? 'relative h-[86px] select-none' : 'relative h-52 select-none'}>
          <svg viewBox="-5 0 110 112" preserveAspectRatio="none" className="h-full w-full overflow-visible" role="img" aria-label={`Accuracy over the ${range}`}>
            {[50, 75, 100].map((tick) => {
              const y = 92 - ((tick - 40) / 60) * 82
              return <line key={tick} x1="0" x2="100" y1={y} y2={y} stroke="var(--color-grid-major)" strokeWidth="0.45" strokeDasharray="1.5 1.5" />
            })}
            <polygon key={`area-${range}`} className="performance-area-fill" points={area} fill="var(--color-accent-tint)" opacity="0.55" />
            <polyline points={line(yearPoints)} fill="none" stroke="var(--color-ink-3)" strokeWidth="1" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
            <polyline key={`line-${range}`} className="performance-line-fill" points={line(yourPoints)} fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            {yourPoints.map((point, index) => (
              <g key={data.labels[index]}>
                <rect
                  x={point.x - 100 / data.labels.length / 2}
                  y="0"
                  width={100 / data.labels.length}
                  height="100"
                  fill="transparent"
                  role="button"
                  tabIndex={0}
                  aria-label={`${data.labels[index]}: your accuracy ${data.you[index]}%, year median ${data.year[index]}%`}
                  onPointerEnter={() => setHovered(index)}
                  onPointerLeave={(event) => event.pointerType === 'mouse' && setHovered(null)}
                  onClick={() => setHovered((current) => current === index ? null : index)}
                  onFocus={() => setHovered(index)}
                  onBlur={() => setHovered(null)}
                />
                {hovered === index && <circle cx={point.x} cy={point.y} r="1.8" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="1" vectorEffect="non-scaling-stroke" />}
              </g>
            ))}
          </svg>
          {hovered != null && (
            <div
              className="pointer-events-none absolute top-2 z-10 min-w-36 rounded-lg border border-line bg-surface p-2.5 shadow-raised"
              style={{ left: `clamp(0px, calc(${yourPoints[hovered].x}% - 72px), calc(100% - 144px))` }}
            >
              <p className="text-[11px] font-semibold text-ink">{data.labels[hovered]}</p>
              <p className="mt-1 text-[11.5px] text-ink-2">Your accuracy <span className="tnum font-mono font-semibold text-accent-strong">{data.you[hovered]}%</span></p>
              <p className="text-[11.5px] text-ink-3">Year median <span className="tnum font-mono">{data.year[hovered]}%</span></p>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 flex justify-between text-[10.5px] text-ink-3">
            {data.labels.map((label) => <span key={label}>{label}</span>)}
          </div>
        </div>
        <div className={compact ? 'mt-1 flex items-center gap-4 text-[10.5px] text-ink-2' : 'mt-2 flex items-center gap-5 text-[11.5px] text-ink-2'}>
          <span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-5 bg-accent" />Your accuracy</span>
          <span className="inline-flex items-center gap-1.5"><span className="w-5 border-t border-dashed border-ink-3" />Year median</span>
        </div>
      </div>
    </Panel>
  )
}
