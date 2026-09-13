/**
 * The small display pieces Adaptive Study repeats.
 *
 * They exist together because they share one discipline: **an estimate is never
 * rendered as a point**. A mastery figure, a readiness figure and a coverage
 * figure are all ranges or bands, and a component that could quietly print a
 * single confident number is a component that eventually will.
 */

import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Info } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Panel } from '@/components/ui/Panel'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { CONCEPT_STATUS_LABEL, type ConceptStatus } from '@/data/adaptive/masteryModel'
import { STATUS_EXPLANATION } from '@/data/adaptive/explain'

/**
 * Status tone.
 *
 * `attention` is warning, not danger, and that is the whole point: one wrong
 * answer schedules a second look. Painting it the same colour as a confirmed
 * weakness would make the interface say something the model explicitly refuses
 * to say.
 */
const STATUS_TONE: Record<ConceptStatus, 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'outline'> = {
  unmeasured: 'outline',
  attention: 'warning',
  weak: 'danger',
  developing: 'primary',
  secure: 'success',
  'review-due': 'primary',
}

export function StatusBadge({ status }: { status: ConceptStatus }) {
  const t = useT()
  // The explanation sits on a wrapper rather than the badge: `Badge` is a
  // presentational primitive with a closed prop list, and widening it for one
  // caller's tooltip is how a design-system component starts drifting.
  return (
    <span title={t(STATUS_EXPLANATION[status])} className="inline-flex">
      <Badge tone={STATUS_TONE[status]} dot>{t(CONCEPT_STATUS_LABEL[status])}</Badge>
    </span>
  )
}

/**
 * A range on a 0–100 track.
 *
 * The band is the estimate. There is no marker at the midpoint, deliberately —
 * a dot in the middle of a wide band reads as "the real answer, with error
 * bars", when what the model actually knows is only that the value is somewhere
 * in the band.
 */
export function RangeBar({
  lower,
  upper,
  tone = 'primary',
  marker,
  className,
}: {
  lower: number
  upper: number
  tone?: 'primary' | 'success' | 'warning' | 'danger'
  /**
   * The posterior mean, 0–1, drawn as a short tick inside the band. Optional,
   * and deliberately not the default: most callers show the band alone, because
   * a tick in the middle of it reads as "the real answer, with error bars" (see
   * the file header). Where a caller has an actual point estimate behind the
   * interval — the concept grid's mastery mean — the tick is honest, since it
   * marks a value the model actually computed rather than implying the
   * midpoint is special.
   */
  marker?: number
  className?: string
}) {
  const t = useT()
  const left = Math.max(0, Math.min(100, lower * 100))
  const width = Math.max(1.5, Math.min(100 - left, (upper - lower) * 100))
  const fill = { primary: 'bg-primary', success: 'bg-success', warning: 'bg-warning', danger: 'bg-danger' }[tone]
  const ariaLabel = t('Between {lower} and {upper} percent')
    .replace('{lower}', String(Math.round(lower * 100)))
    .replace('{upper}', String(Math.round(upper * 100)))

  return (
    <div
      className={cn('relative h-2.5 w-full overflow-hidden rounded-full bg-inset', className)}
      role="meter"
      aria-valuenow={Math.round(((lower + upper) / 2) * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
    >
      {/* Quartile ticks make it read as a calibrated scale rather than a bar. */}
      {[25, 50, 75].map((tick) => (
        <span key={tick} className="absolute top-0 h-full w-px bg-line-2" style={{ left: `${tick}%` }} />
      ))}
      <div
        className={cn('absolute top-0 h-full rounded-full opacity-80', fill)}
        style={{ left: `${left}%`, width: `${width}%` }}
      />
      {marker !== undefined && (
        <span
          className={cn('absolute -top-0.5 h-[calc(100%+4px)] w-[3px] rounded-full', fill)}
          style={{ left: `${Math.max(0, Math.min(100, marker * 100))}%` }}
        />
      )}
    </div>
  )
}

/** A figure with its own "not yet" state, so sparse evidence never prints a number. */
export function Figure({
  label,
  value,
  sub,
  icon,
  unavailable,
  unavailableNote,
}: {
  label: string
  value: string
  sub?: ReactNode
  icon?: LucideIcon
  /** True when there is not enough evidence for this figure to mean anything. */
  unavailable?: boolean
  unavailableNote?: string
}) {
  const t = useT()
  return (
    <Panel className="p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[12.5px] font-medium text-ink-2">{label}</p>
        {icon && <Icon icon={icon} size={16} className="text-ink-3" />}
      </div>
      {unavailable ? (
        <>
          <p className="mt-2 font-serif text-[19px] font-semibold leading-none text-ink-3">{t('Not yet')}</p>
          {unavailableNote && <p className="mt-2 text-[11.5px] leading-relaxed text-ink-3">{unavailableNote}</p>}
        </>
      ) : (
        <>
          <p className="tnum mt-2 font-mono text-[26px] font-semibold leading-none tracking-tight text-ink">{value}</p>
          {sub && <div className="mt-2 text-[12px] text-ink-3">{sub}</div>}
        </>
      )}
    </Panel>
  )
}

/**
 * A statement the product is making about its own limits.
 *
 * Rendered as a quiet inset note rather than a warning banner. These are not
 * errors — they are the honest terms on which every figure here is offered, and
 * dressing them as alarms would train students to dismiss them.
 */
export function Caveat({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-start gap-2 rounded-lg border border-line bg-surface-2 px-3 py-2.5', className)}>
      <Icon icon={Info} size={14} className="mt-0.5 shrink-0 text-ink-3" />
      <p className="text-[12px] leading-relaxed text-ink-2">{children}</p>
    </div>
  )
}

/** A labelled proportion bar — used for blueprint groups and allocation shares. */
export function ShareRow({
  label,
  value,
  max,
  right,
  tone = 'primary',
}: {
  label: ReactNode
  value: number
  max: number
  right?: ReactNode
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral'
}) {
  const width = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0
  const fill = {
    primary: 'bg-primary', success: 'bg-success', warning: 'bg-warning',
    danger: 'bg-danger', neutral: 'bg-ink-3',
  }[tone]

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1">
      <p className="min-w-0 truncate text-[13px] text-ink">{label}</p>
      {right && <span className="tnum shrink-0 font-mono text-[12px] text-ink-2">{right}</span>}
      <div className="col-span-2 h-1.5 overflow-hidden rounded-full bg-inset">
        <div className={cn('h-full rounded-full', fill)} style={{ width: `${width}%` }} />
      </div>
    </div>
  )
}

/**
 * A bigger, boxier meter for the Today tab's headline reads.
 *
 * Coverage and block composition are the two numbers a student checks at a
 * glance, so they get more visual weight here than `ShareRow` gives the same
 * shape of data elsewhere. At this size a fully-saturated red/amber/green fill
 * reads as an alarm strip rather than a proportion, so the body of the bar
 * stays on the light end of the scale ramp; the tone still shows up as a short
 * solid cap at the fill's leading edge, which is enough to scan without
 * shouting.
 */
export function ProgressBlock({
  label,
  value,
  max,
  right,
  tone = 'primary',
}: {
  label: ReactNode
  value: number
  max: number
  right?: ReactNode
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral'
}) {
  const width = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0
  const fill = {
    primary: 'bg-scale-2', success: 'bg-scale-1', warning: 'bg-scale-2',
    danger: 'bg-scale-3', neutral: 'bg-scale-1',
  }[tone]
  const cap = {
    primary: 'bg-primary', success: 'bg-success', warning: 'bg-warning',
    danger: 'bg-danger', neutral: 'bg-ink-3',
  }[tone]

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3">
        <p className="min-w-0 truncate text-[13px] text-ink">{label}</p>
        {right && <span className="tnum shrink-0 font-mono text-[12px] text-ink-2">{right}</span>}
      </div>
      <div className="relative h-4 overflow-hidden rounded-md border border-line bg-scale-0">
        <div className={cn('absolute inset-0 rounded-[5px] transition-transform duration-700 ease-[var(--ease-out-quint)]', fill)} style={{ transform: `translateX(${width - 100}%)` }} />
        {width > 0.5 && (
          <span className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-quint)]" style={{ transform: `translateX(${width - 100}%)` }}>
            <span className={cn('absolute inset-y-0 end-0 w-[3px] rounded-full', cap)} />
          </span>
        )}
      </div>
    </div>
  )
}

/** A section heading inside a panel body, for panels that hold several readings. */
export function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h4 className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">{children}</h4>
  )
}

export function percent(value: number): string {
  return `${Math.round(value * 100)}%`
}

/** A range in words, at the precision the evidence supports. */
export function rangeText(lower: number, upper: number): string {
  return `${Math.round(lower * 100)}–${Math.round(upper * 100)}%`
}
