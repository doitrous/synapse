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
const STATUS_TONE: Record<ConceptStatus, 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'outline'> = {
  unmeasured: 'outline',
  attention: 'warning',
  weak: 'danger',
  developing: 'accent',
  secure: 'success',
  'review-due': 'accent',
}

export function StatusBadge({ status }: { status: ConceptStatus }) {
  // The explanation sits on a wrapper rather than the badge: `Badge` is a
  // presentational primitive with a closed prop list, and widening it for one
  // caller's tooltip is how a design-system component starts drifting.
  return (
    <span title={STATUS_EXPLANATION[status]} className="inline-flex">
      <Badge tone={STATUS_TONE[status]} dot>{CONCEPT_STATUS_LABEL[status]}</Badge>
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
  tone = 'accent',
  className,
}: {
  lower: number
  upper: number
  tone?: 'accent' | 'success' | 'warning' | 'danger'
  className?: string
}) {
  const left = Math.max(0, Math.min(100, lower * 100))
  const width = Math.max(1.5, Math.min(100 - left, (upper - lower) * 100))
  const fill = { accent: 'bg-accent', success: 'bg-success', warning: 'bg-warning', danger: 'bg-danger' }[tone]

  return (
    <div
      className={cn('relative h-2.5 w-full overflow-hidden rounded-full bg-inset', className)}
      role="meter"
      aria-valuenow={Math.round(((lower + upper) / 2) * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Between ${Math.round(lower * 100)} and ${Math.round(upper * 100)} percent`}
    >
      {/* Quartile ticks make it read as a calibrated scale rather than a bar. */}
      {[25, 50, 75].map((tick) => (
        <span key={tick} className="absolute top-0 h-full w-px bg-line-2" style={{ left: `${tick}%` }} />
      ))}
      <div
        className={cn('absolute top-0 h-full rounded-full opacity-80', fill)}
        style={{ left: `${left}%`, width: `${width}%` }}
      />
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
  return (
    <Panel className="p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[12.5px] font-medium text-ink-2">{label}</p>
        {icon && <Icon icon={icon} size={16} className="text-ink-3" />}
      </div>
      {unavailable ? (
        <>
          <p className="mt-2 font-serif text-[19px] font-semibold leading-none text-ink-3">Not yet</p>
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
  tone = 'accent',
}: {
  label: ReactNode
  value: number
  max: number
  right?: ReactNode
  tone?: 'accent' | 'success' | 'warning' | 'danger' | 'neutral'
}) {
  const width = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0
  const fill = {
    accent: 'bg-accent', success: 'bg-success', warning: 'bg-warning',
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
