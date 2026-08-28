import { cn } from '@/lib/cn'
import type { StatusTabOption } from './types'

/**
 * Quick-status segmented control: one pill per status, each carrying its own
 * count. The caller owns the tab list and the counts (usually derived from
 * the same rows the page already loaded) — this component only renders and
 * reports selection.
 */
export function StatusTabs({
  tabs,
  value,
  onChange,
  label,
  className,
}: {
  tabs: StatusTabOption[]
  value: string
  onChange: (id: string) => void
  /** Names the tablist for assistive technology, e.g. "Filter by status". */
  label: string
  className?: string
}) {
  if (tabs.length === 0) return null
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn(
        'flex max-w-full items-center gap-1 overflow-x-auto overscroll-x-contain rounded-lg border border-line bg-surface-2 p-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        className,
      )}
    >
      {tabs.map((tab) => {
        const active = tab.id === value
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={cn(
              'inline-flex h-10 shrink-0 items-center gap-1.5 rounded-md px-3 text-[12.5px] font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] sm:h-7.5',
              active ? 'bg-surface text-ink shadow-panel' : 'text-ink-2 hover:text-ink',
            )}
          >
            {tab.label}
            {tab.count != null && (
              <span
                className={cn(
                  'tnum rounded-full px-1.5 text-[11px] font-medium',
                  active ? 'bg-primary-tint text-primary-strong' : 'bg-inset text-ink-3',
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
