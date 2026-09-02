import type { LucideIcon } from 'lucide-react'
import { Icon } from './Icon'
import { cn } from '@/lib/cn'

export interface TabItem {
  value: string
  label: string
  icon?: LucideIcon
  count?: number
}

/**
 * Tabs for switching sections within a surface, drawn as a row of buttons.
 *
 * They used to be underline tabs with a sliding rule. Omar asked for the
 * sections to read as obvious controls — the way the Flag button reads while
 * solving a question — so each tab is now a bordered button and the selected
 * one carries the same crimson tint, hairline and text step that "Flagged"
 * does. State is still announced through `aria-selected`, never colour alone:
 * the tint, the border and the icon colour move together.
 */
export function Tabs({
  items,
  value,
  onChange,
  className,
}: {
  items: TabItem[]
  value: string
  onChange: (value: string) => void
  className?: string
}) {
  return (
    <div
      role="tablist"
      className={cn('flex max-w-full flex-wrap items-center gap-1.5', className)}
    >
      {items.map((t) => {
        const active = t.value === value
        return (
          <button
            key={t.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.value)}
            className={cn(
              'inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-md border px-3 text-[13px] font-semibold whitespace-nowrap transition-colors sm:min-h-9',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
              active
                ? 'border-primary-line bg-primary-tint text-primary-strong'
                : 'border-line bg-surface text-ink-2 hover:bg-inset hover:text-ink',
            )}
          >
            {t.icon && (
              <Icon icon={t.icon} size={14} className={active ? 'text-primary' : 'text-ink-3'} />
            )}
            {t.label}
            {t.count != null && (
              <span className={cn('tnum rounded-full px-1.5 text-[11px] font-medium', active ? 'bg-primary-line/60 text-primary-strong' : 'bg-inset text-ink-2')}>
                {t.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export interface SegItem {
  value: string
  label: string
}

/** Compact segmented control for view toggles (week/month, etc.). */
export function Segmented({
  items,
  value,
  onChange,
  className,
}: {
  items: SegItem[]
  value: string
  onChange: (value: string) => void
  className?: string
}) {
  return (
    <div
      className={cn(
        // Wraps below `sm` rather than running off the panel: a four- or
        // five-way switch with real labels ("Lab & imaging") is wider than a
        // phone, and `html` carries `overflow-x: clip`, so what runs off is
        // gone rather than scrollable. Nothing changes from `sm` up.
        'inline-flex items-center gap-0.5 rounded-lg border border-line bg-surface-2 p-0.5 max-sm:flex-wrap',
        className,
      )}
    >
      {items.map((t) => {
        const active = t.value === value
        return (
          <button
            key={t.value}
            onClick={() => onChange(t.value)}
            aria-pressed={active}
            className={cn(
              'h-11 min-w-11 whitespace-nowrap rounded-md px-3 text-[12.5px] font-medium transition-colors sm:h-7 sm:min-w-0',
              active ? 'bg-surface text-ink shadow-panel' : 'text-ink-2 hover:text-ink',
            )}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}
