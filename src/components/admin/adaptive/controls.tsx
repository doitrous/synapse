/**
 * The editing primitives the adaptive console repeats.
 *
 * Every tunable in the algorithm is a number with a meaning, a unit and a
 * defensible range, and each one is a launch hypothesis rather than a finding.
 * These controls carry that: a label, the value, and the sentence explaining
 * what moving it does. A settings page that is a grid of unlabelled inputs is
 * how a threshold gets changed by someone who did not know what it governed.
 */

import type { ReactNode } from 'react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Toggle } from '@/components/ui/Toggle'
import { TextInput } from '@/components/ui/Field'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

/** A settings group. `hypothesis` marks values that validation has not settled. */
export function SettingGroup({
  title,
  icon,
  hint,
  hypothesis,
  children,
  action,
}: {
  title: string
  icon?: LucideIcon
  hint?: string
  hypothesis?: boolean
  children: ReactNode
  action?: ReactNode
}) {
  return (
    <Panel>
      <PanelHeader
        title={title}
        icon={icon}
        hint={hint}
        action={
          <div className="flex items-center gap-2">
            {hypothesis && <Badge tone="warning">Launch hypothesis</Badge>}
            {action}
          </div>
        }
      />
      <div className="space-y-5 p-5">{children}</div>
    </Panel>
  )
}

/**
 * One number, with what it governs.
 *
 * The explanation is required, not optional. `step` and the bounds are what stop
 * a mistyped decimal turning a 5% nudge into a 500% one.
 */
export function NumberSetting({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
  explain,
  disabled,
}: {
  label: string
  value: number
  onChange: (next: number) => void
  min: number
  max: number
  step?: number
  suffix?: string
  explain: string
  disabled?: boolean
}) {
  return (
    <div className="grid gap-x-4 gap-y-1.5 sm:grid-cols-[minmax(0,1fr)_140px]">
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-ink">{label}</p>
        <p className="mt-0.5 text-[12px] leading-relaxed text-ink-2">{explain}</p>
      </div>
      <div className="flex items-center gap-2">
        <TextInput
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={(event) => {
            const next = Number(event.target.value)
            if (Number.isNaN(next)) return
            // Clamped on entry rather than on save: a value outside the range is
            // never briefly live, and the field never shows something the
            // algorithm would refuse.
            onChange(Math.max(min, Math.min(max, next)))
          }}
          className="tnum font-mono"
        />
        {suffix && <span className="shrink-0 text-[12px] text-ink-3">{suffix}</span>}
      </div>
    </div>
  )
}

export function ToggleSetting({
  label,
  checked,
  onChange,
  explain,
}: {
  label: string
  checked: boolean
  onChange: (next: boolean) => void
  explain: string
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-ink">{label}</p>
        <p className="mt-0.5 text-[12px] leading-relaxed text-ink-2">{explain}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} label={label} />
    </div>
  )
}

/**
 * A row of shares that must sum to one.
 *
 * The total is shown constantly and flagged the moment it drifts. Silently
 * renormalising on save would mean an admin who typed four numbers gets four
 * different ones back with no explanation.
 */
export function ShareEditor({
  entries,
  onChange,
}: {
  entries: Array<{ key: string; label: string; value: number }>
  onChange: (key: string, next: number) => void
}) {
  const total = entries.reduce((sum, entry) => sum + entry.value, 0)
  const balanced = Math.abs(total - 1) < 0.005

  return (
    <div className="space-y-3">
      {entries.map((entry) => (
        <div key={entry.key} className="grid grid-cols-[minmax(0,1fr)_96px] items-center gap-3">
          <p className="min-w-0 truncate text-[13px] text-ink">{entry.label}</p>
          <div className="flex items-center gap-1.5">
            <TextInput
              type="number"
              min={0}
              max={100}
              step={1}
              value={Math.round(entry.value * 100)}
              onChange={(event) => {
                const next = Number(event.target.value)
                if (Number.isNaN(next)) return
                onChange(entry.key, Math.max(0, Math.min(100, next)) / 100)
              }}
              className="tnum font-mono"
            />
            <span className="text-[12px] text-ink-3">%</span>
          </div>
        </div>
      ))}
      <div className={cn(
        'flex items-center justify-between rounded-lg border px-3 py-2 text-[12.5px]',
        balanced ? 'border-line bg-surface-2 text-ink-2' : 'border-warning bg-warning-tint text-warning',
      )}>
        <span>Total</span>
        <span className="tnum font-mono font-semibold">{Math.round(total * 100)}%</span>
      </div>
      {!balanced && (
        <p className="text-[12px] leading-relaxed text-ink-2">
          Shares are normalised before use, so these will be scaled to sum to 100%. Adjusting them to add up exactly is
          the only way to be sure the block you get is the one you intended.
        </p>
      )}
    </div>
  )
}

/** A reorderable list — used for the documented constraint-relaxation order. */
export function OrderEditor<T extends string>({
  items,
  labels,
  onChange,
}: {
  items: T[]
  labels: Record<T, string>
  onChange: (next: T[]) => void
}) {
  const move = (index: number, delta: number) => {
    const target = index + delta
    if (target < 0 || target >= items.length) return
    const next = [...items]
    const [entry] = next.splice(index, 1)
    next.splice(target, 0, entry)
    onChange(next)
  }

  return (
    <ol className="space-y-1.5">
      {items.map((item, index) => (
        <li key={item} className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2">
          <span className="tnum w-5 shrink-0 font-mono text-[12px] text-ink-3">{index + 1}</span>
          <span className="min-w-0 flex-1 truncate text-[13px] text-ink">{labels[item]}</span>
          <button
            type="button"
            onClick={() => move(index, -1)}
            disabled={index === 0}
            aria-label={`Relax ${labels[item]} earlier`}
            className="rounded px-1.5 py-0.5 text-[12px] text-ink-2 hover:bg-inset disabled:opacity-30"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={() => move(index, 1)}
            disabled={index === items.length - 1}
            aria-label={`Relax ${labels[item]} later`}
            className="rounded px-1.5 py-0.5 text-[12px] text-ink-2 hover:bg-inset disabled:opacity-30"
          >
            ↓
          </button>
        </li>
      ))}
    </ol>
  )
}
