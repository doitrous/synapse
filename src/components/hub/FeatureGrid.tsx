import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * A hub's card grid: three across on a wide screen, two on a tablet, one on a
 * phone, entering as a staggered rise rather than a fade — the house rule is
 * that a page arrives by moving, never by becoming visible. The `stagger`
 * utility already handles `prefers-reduced-motion` and the RTL direction.
 */
export function FeatureGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('stagger grid gap-4 sm:grid-cols-2 xl:grid-cols-3', className)}>
      {children}
    </div>
  )
}
