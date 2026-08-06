import type { CSSProperties, ReactNode } from 'react'
import { TrendingUp } from 'lucide-react'
import { progress } from '@/data/student'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

type Tone = 'danger' | 'accent' | 'success'

function zoneOf(v: number): { name: string; tone: Tone } {
  if (v < 40) return { name: 'Building', tone: 'danger' }
  if (v < 70) return { name: 'On track', tone: 'accent' }
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

function RingReading({ value, label, tone = 'accent', compact = false }: { value: number; label: string; tone?: 'accent' | 'success'; compact?: boolean }) {
  const radius = 34
  const circumference = 2 * Math.PI * radius
  const targetOffset = circumference * (1 - value / 100)
  const color = tone === 'success' ? 'var(--color-success)' : 'var(--color-accent)'
  const ringStyle = {
    '--ring-circumference': circumference,
    '--ring-target-offset': targetOffset,
  } as CSSProperties

  return (
    <div className={cn('relative shrink-0', compact ? 'size-[6.5rem]' : 'size-[6.75rem]')} aria-label={`${value}% ${label}`}>
      <svg className="size-full -rotate-90" viewBox="0 0 84 84" aria-hidden>
        <circle cx="42" cy="42" r={radius} fill="none" stroke="var(--color-inset)" strokeWidth="7.5" />
        <circle
          className="metric-ring-fill"
          cx="42"
          cy="42"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={ringStyle}
        />
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <span className={cn('tnum font-mono font-semibold leading-none text-ink', compact ? 'text-[18px]' : 'text-[21px]')}>{value}%</span>
        <span className={cn('mt-1 font-medium text-ink-3', compact ? 'text-[10px]' : 'text-[11px]')}>{label}</span>
      </div>
    </div>
  )
}

function DualReading({ accuracy, used, detail, compact = false }: { accuracy: number; used: number; detail: string; compact?: boolean }) {
  const t = useT()
  return (
    <div>
      <div className={cn('grid grid-cols-[1fr_auto_1fr] items-center', compact ? 'gap-2' : 'gap-3 py-1')}>
        <div className="grid place-items-center">
          <RingReading value={accuracy} label={t('Correct')} tone="success" compact={compact} />
        </div>
        <div className={cn('w-px bg-line', compact ? 'h-16' : 'h-20')} aria-hidden />
        <div className="grid place-items-center">
          <RingReading value={used} label={t('Used')} compact={compact} />
        </div>
      </div>
      <p className={cn('text-center font-mono text-ink-3', compact ? 'mt-0.5 text-[9.5px] leading-none' : 'mt-2 text-[10.5px]')}>{detail}</p>
    </div>
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

export function ExamReadinessCard({ compact = false }: { compact?: boolean }) {
  const t = useT()
  const zone = zoneOf(progress.examReadiness)

  return (
    <StatBox
      label={t('Exam readiness')}
      value={String(progress.examReadiness)}
      unit="%"
      sub={`${progress.examLabel} · ${progress.daysToExam} ${t('days')}`}
      footer={<Badge tone={zone.tone}>{t(zone.name)}</Badge>}
      compact={compact}
    >
      <ReadinessScale value={progress.examReadiness} />
    </StatBox>
  )
}

export function QuestionBankCard({ compact = false }: { compact?: boolean }) {
  const t = useT()
  const qbankPct = Math.round((progress.qbankAnswered / progress.qbankTotal) * 100)

  return (
    <StatBox
      label={t('Question bank')}
      value=""
      sub={t('First attempt · whole bank')}
      footer={
        <span className="inline-flex items-center gap-1 text-[11.5px] font-medium text-success">
          <Icon icon={TrendingUp} size={13} />
          128 {t('this week')}
        </span>
      }
      compact={compact}
    >
      <DualReading accuracy={72} used={qbankPct} detail={`${progress.qbankAnswered.toLocaleString()} / ${progress.qbankTotal.toLocaleString()} ${t('questions')}`} compact={compact} />
    </StatBox>
  )
}

export function PracticalSkillsCard({ compact = false }: { compact?: boolean }) {
  const t = useT()
  const practicalPct = Math.round((progress.practicalSigned / progress.practicalTotal) * 100)

  return (
    <StatBox
      label={t('Practical skills')}
      value=""
      sub={t('First attempt · assigned stations')}
      compact={compact}
    >
      <DualReading accuracy={78} used={practicalPct} detail={`${progress.practicalSigned} / ${progress.practicalTotal} ${t('skills signed off')}`} compact={compact} />
    </StatBox>
  )
}

export function ProgressTrio({ layout = 'row' }: { layout?: 'row' | 'stacked' }) {
  const compact = layout === 'stacked'

  return (
    <div className={cn('grid gap-4', compact ? 'h-full grid-rows-3' : 'sm:grid-cols-3')}>
      <ExamReadinessCard compact={compact} />

      <QuestionBankCard compact={compact} />

      <PracticalSkillsCard compact={compact} />
    </div>
  )
}
