import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function FilterChip({
  active,
  onClick,
  children,
  color,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
  color?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex h-10 items-center gap-1.5 rounded-full border px-3 text-[12.5px] font-medium transition-colors sm:h-7',
        active
          ? 'border-primary-line bg-primary-tint text-primary-strong'
          : 'border-line bg-surface text-ink-2 hover:border-line-2 hover:text-ink',
      )}
    >
      {color && <span className="size-2 rounded-full" style={{ backgroundColor: color }} />}
      {children}
    </button>
  )
}
