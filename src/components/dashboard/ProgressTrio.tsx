import { LoadingRegion, SkeletonPanel } from '@/components/loading/SkeletonParts'
import { Skeleton, SkeletonText } from '@/components/ui/Skeleton'
import { ProgressSkeleton } from '@/components/loading/DashboardSkeletons'
import { LoadingError } from '@/components/loading/LoadingError'
import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { CatalogueUnavailable } from '@/components/ui/CatalogueUnavailable'
import { cn } from '@/lib/cn'
import { clamp } from '@/lib/format'
import { useI18n, useT } from '@/lib/i18n'
import { masteryBand } from '@/data/mastery'
import { CONCEPT_STORAGE_KEY, initialConceptGraph, type ConceptGraph } from '@/data/conceptGraph'
import { useMastery } from '@/lib/useMastery'
import { usePersistentState } from '@/lib/usePersistentState'
import { usePracticeProgress } from '@/lib/usePracticeProgress'
import { useCatalogueAvailability } from '@/lib/useCatalogueAvailability'

type Tone = 'danger' | 'primary' | 'success'

function zoneOf(v: number): { name: string; tone: Tone } {
  if (v < 40) return { name: 'Building', tone: 'danger' }
  if (v < 70) return { name: 'On track', tone: 'primary' }
  return { name: 'Exam-ready', tone: 'success' }
}

/** A lab-style reference range: zones + a marker at the reading. */
function ReadinessScale({ value }: { value: number }) {
  const t = useT()
  const zones = [
    { label: 'Building', width: 40, fill: 'bg-danger/20' },
    { label: 'On track', width: 30, fill: 'bg-warning/25' },
    { label: 'Exam-ready', width: 30, fill: 'bg-success/25' },
  ]
  const active = zoneOf(value).name
  const readinessStyle = { '--readiness-value': `${value}%` } as CSSProperties

  return (
    <div>
      <div className="relative pt-2.5">
        <div
          className="readiness-marker-fill absolute top-0 z-10 -translate-x-1/2"
          style={readinessStyle}
          aria-hidden
        >
          <svg width="9" height="6" viewBox="0 0 9 6" className="fill-ink">
            <path d="M4.5 6 0 0h9z" />
          </svg>
        </div>
        <div className="relative flex h-2.5 overflow-hidden rounded-full">
          {zones.map((z) => (
            <div key={z.label} className={z.fill} style={{ width: `${z.width}%` }} />
          ))}
          <span
            className="readiness-marker-fill absolute inset-y-0 w-0.5 -translate-x-1/2 rounded-full bg-ink"
            style={readinessStyle}
            aria-hidden
          />
        </div>
      </div>
      <div className="mt-1.5 flex text-[10px] leading-none">
        {zones.map((z) => (
          <span
            key={z.label}
            style={{ width: `${z.width}%` }}
            className={cn(
              'text-center',
              z.label === active ? 'font-semibold text-ink' : 'text-ink-3',
            )}
          >
            {t(z.label)}
          </span>
        ))}
      </div>
    </div>
  )
}

/**
 * Three completion metrics drawn as one target: concentric rings closing on a
 * shared bullseye instead of a row of separate meters. Ring order runs
 * outside-in from the widest field to the narrowest — bank explored, then
 * practicals attempted, then essays marked — and the crimson centre dot is
 * earned only when all three rings close. Accuracy is a score, not a goal, so
 * it rides in the legend as text rather than claiming a ring.
 */
function RingStack({ rings, allEarned }: { rings: { value: number; color: string }[]; allEarned: boolean }) {
  const { dir } = useI18n()
  const size = 148
  const center = size / 2
  const radii = [62, 47, 32]
  const thickness = 9
  const [sweep, setSweep] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setSweep(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const svgTransform = dir === 'rtl' ? 'rotate(-90deg) scaleX(-1)' : 'rotate(-90deg)'

  return (
    <div className="relative inline-grid shrink-0 place-items-center" style={{ width: size, height: size }} aria-hidden>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: svgTransform, transformOrigin: '50% 50%' }}>
        <circle cx={center} cy={center} r={20} fill="none" stroke="var(--color-grid-major)" strokeWidth="1" />
        {rings.map((ring, i) => {
          const radius = radii[i]
          const circumference = 2 * Math.PI * radius
          const pct = clamp(ring.value, 0, 100)
          return (
            <g key={i}>
              <circle cx={center} cy={center} r={radius} fill="none" stroke="var(--color-inset)" strokeWidth={thickness} />
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={ring.color}
                strokeWidth={thickness}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={sweep ? circumference * (1 - pct / 100) : circumference}
                style={{ transition: 'stroke-dashoffset 700ms var(--ease-out-quint)' }}
              />
            </g>
          )
        })}
      </svg>
      {allEarned && (
        <span
          className="target-ring-dot pointer-events-none absolute inset-0 m-auto rounded-full"
          style={{ width: 12, height: 12, backgroundColor: 'var(--color-primary)' }}
        />
      )}
    </div>
  )
}

/**
 * The dashboard's single progress panel: the ring stack beside a legend, one
 * row per domain with its counts (and, for the bank, first-attempt accuracy
 * as a note). Replaces the old three-card, six-ring row.
 */
export function ProgressRingStack() {
  const t = useT()
  const { seen, bankTotal, firstAccuracy, practicalTotal, attempted, essayTotal, markedCount, loading, error } = usePracticeProgress()
  const bankPct = bankTotal ? Math.round((Math.min(seen, bankTotal) / bankTotal) * 100) : 0
  const practicalPct = practicalTotal ? Math.round((attempted / practicalTotal) * 100) : 0
  const essayPct = essayTotal ? Math.round((markedCount / essayTotal) * 100) : 0

  const rows = [
    {
      color: 'var(--color-accent)',
      label: t('Question bank'),
      pct: bankPct,
      present: bankTotal > 0,
      detail: `${seen.toLocaleString()} / ${bankTotal.toLocaleString()} ${t('questions')}`,
      note: firstAccuracy === null ? null : `${Math.round(firstAccuracy * 100)}% ${t('first attempt')}`,
    },
    {
      color: 'var(--color-accent-soft)',
      label: t('Practical'),
      pct: practicalPct,
      present: practicalTotal > 0,
      detail: `${attempted} / ${practicalTotal} ${t('items attempted')}`,
      note: null,
    },
    {
      color: 'var(--color-primary)',
      label: t('Essay'),
      pct: essayPct,
      present: essayTotal > 0,
      detail: `${markedCount} / ${essayTotal} ${t('marked')}`,
      note: null,
    },
  ]

  const shown = rows.filter((row) => row.present)
  // Re-subscribes to the ledger entry the counts above are already derived
  // from, just to recover the load status they otherwise drop.
  const availability = useCatalogueAvailability(bankTotal + practicalTotal + essayTotal)
  if (error) return <LoadingError />
  if (loading || availability.kind === 'loading') return <ProgressSkeleton />
  if (!shown.length) {
    if (availability.kind === 'error') {
      return (
        <Panel className="p-4">
          <CatalogueUnavailable
            availability={availability}
            empty={{ title: t('Progress'), description: t('Nothing has been published for your year yet.') }}
          />
        </Panel>
      )
    }
    return (
      <Panel className="p-4">
        <p className="text-[12.5px] font-medium text-ink-2">{t('Progress')}</p>
        <p className="mt-1.5 text-[12px] text-ink-3">{t('Nothing has been published for your year yet.')}</p>
      </Panel>
    )
  }

  const allEarned = shown.every((row) => row.pct >= 100)

  return (
    <Panel className="p-4">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <RingStack rings={rows.map((row) => ({ value: row.present ? row.pct : 0, color: row.color }))} allEarned={allEarned} />
        <div className="min-w-0 flex-1 basis-52" role="list" aria-label={t('Progress')}>
          {rows.map((row) => (
            <div
              key={row.label}
              role="listitem"
              className="flex items-baseline gap-2.5 border-b border-line py-2.5 last:border-b-0 first:pt-1 last:pb-1"
            >
              <span className="relative top-[1px] size-2.5 shrink-0 rounded-full" style={{ backgroundColor: row.color }} aria-hidden />
              <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">{row.label}</span>
              {row.present ? (
                <>
                  {row.note && <span className="hidden text-[11px] text-ink-3 sm:inline">{row.note}</span>}
                  <span className="text-[11.5px] text-ink-3">{row.detail}</span>
                  <span className="tnum w-10 text-right font-mono text-[13px] font-semibold text-ink">{row.pct}%</span>
                </>
              ) : (
                <span className="text-[11.5px] text-ink-3">{t('Nothing published yet')}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  )
}

function StatBox({
  label,
  value,
  unit,
  sub,
  children,
  footer,
  compact = false,
}: {
  label: string
  value: string
  unit?: string
  sub: string
  children?: ReactNode
  footer?: ReactNode
  compact?: boolean
}) {
  return (
    <Panel className={cn('flex h-full min-w-0 flex-col', compact ? 'p-3' : 'p-4')}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-[12.5px] font-medium text-ink-2">{label}</p>
        {footer}
      </div>
      {value && <div className={cn('flex items-baseline gap-1', compact ? 'mt-1' : 'mt-1.5')}>
        <span className={cn('tnum font-mono font-semibold leading-none tracking-tight text-ink', compact ? 'text-[27px]' : 'text-[32px]')}>{value}</span>
        {unit && <span className={cn('text-ink-3', compact ? 'text-[14px]' : 'text-[16px]')}>{unit}</span>}
      </div>}
      <p className={cn('text-ink-3', compact ? 'mt-0.5 text-[11px]' : 'mt-1.5 text-[12px]')}>{sub}</p>
      {children && <div className={compact ? 'mt-0' : 'mt-4'}>{children}</div>}
    </Panel>
  )
}

/**
 * How much of the curriculum the student has actually demonstrated.
 *
 * This replaced an "exam readiness" percentage that was a literal 68. A single
 * readiness figure needs an exam blueprint to weight topics and a cohort to
 * calibrate against, and this product has neither — so it is not recomputed,
 * it is dropped. Coverage is a claim the ledger can support: of the concepts
 * the curriculum defines, how many has this student been measured on, and how
 * did those go.
 */
export function ExamReadinessCard({ compact = false }: { compact?: boolean }) {
  const t = useT()
  const { ledger, loading: masteryLoading, status: masteryStatus } = useMastery()
  const [graph, , graphStatus] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, initialConceptGraph)

  const totalConcepts = graph.concepts.length
  const bands = useMemo(() => {
    const counts = { secure: 0, developing: 0, shaky: 0, practised: 0 }
    for (const concept of graph.concepts) {
      const band = masteryBand(ledger[concept.id])
      if (band !== 'unseen') counts[band] += 1
    }
    return counts
  }, [graph.concepts, ledger])

  const met = bands.secure + bands.developing + bands.shaky + bands.practised
  const coverage = totalConcepts ? Math.round((met / totalConcepts) * 100) : 0

  if (graphStatus.error || masteryStatus.error) return <LoadingError />
  if (!graphStatus.hydrated || masteryLoading) return <LoadingRegion><SkeletonPanel title={false} className={compact ? 'space-y-3 p-3' : 'space-y-4 p-4'}><Skeleton className="h-4 w-36" /><Skeleton className="h-8 w-20" /><SkeletonText lines={2} /><Skeleton className="h-2 w-full" /></SkeletonPanel></LoadingRegion>

  if (!totalConcepts) {
    return (
      <StatBox
        label={t('Curriculum coverage')}
        value=""
        sub={t('Coverage appears once your curriculum concepts are published.')}
        compact={compact}
      />
    )
  }

  const zone = zoneOf(coverage)
  return (
    <StatBox
      label={t('Curriculum coverage')}
      value={String(coverage)}
      unit="%"
      sub={met
        ? `${bands.secure} ${t('secure')} · ${bands.developing} ${t('developing')} · ${bands.shaky} ${t('shaky')}`
        : t('Answer some questions to start building this.')}
      footer={met ? <Badge tone={zone.tone}>{t(zone.name)}</Badge> : undefined}
      compact={compact}
    >
      <ReadinessScale value={coverage} />
    </StatBox>
  )
}
