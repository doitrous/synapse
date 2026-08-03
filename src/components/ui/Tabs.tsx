import type { LucideIcon } from 'lucide-react'
import { Icon } from './Icon'
import { cn } from '@/lib/cn'

export interface TabItem {
  value: string
  label: string
  icon?: LucideIcon
  count?: number
}

/** Underline tabs for switching sections within a surface. */
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
      className={cn('flex max-w-full items-center gap-1 overflow-x-auto overscroll-x-contain border-b border-line [scrollbar-width:none] [&::-webkit-scrollbar]:hidden', className)}
    >
      {items.map((t) => {
        const active = t.value === value
        return (
          <button
            key={t.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.value)}
            className={cn(
              'relative flex h-11 shrink-0 items-center gap-2 px-3 text-[13.5px] font-medium whitespace-nowrap transition-colors sm:h-9',
              active ? 'text-ink' : 'text-ink-2 hover:text-ink',
            )}
          >
            {t.icon && (
              <Icon icon={t.icon} size={16} className={active ? 'text-accent' : 'text-ink-3'} />
            )}
            {t.label}
            {t.count != null && (
              <span className="tnum rounded-full bg-inset px-1.5 text-[11px] font-medium text-ink-2">
                {t.count}
              </span>
            )}
            {active && (
              <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent" />
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
        'inline-flex items-center gap-0.5 rounded-lg border border-line bg-surface-2 p-0.5',
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
              'h-10 rounded-md px-3 text-[12.5px] font-medium transition-colors sm:h-7',
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
