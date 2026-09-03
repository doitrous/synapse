import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'

/**
 * Base skeleton block — a muted, pulsing placeholder for content still loading.
 *
 * ponytail: no per-component `motion-reduce:` class here. `index.css` already
 * has a blanket `@media (prefers-reduced-motion: reduce)` rule that collapses
 * every animation-duration to ~0, so `animate-pulse` already stops pulsing for
 * those users — adding it again per-component would be dead weight.
 */
export function Skeleton({
  className,
  width,
  height,
  style,
}: {
  className?: string
  width?: number | string
  height?: number | string
  style?: CSSProperties
}) {
  return (
    <div
      aria-hidden
      className={cn('animate-pulse rounded-lg bg-inset', className)}
      style={{ width, height, ...style }}
    />
  )
}

/** `lines` skeleton text rows; the last one runs short, like real prose does. */
export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton key={i} className={cn('h-3', i === lines - 1 && lines > 1 ? 'w-2/3' : 'w-full')} />
      ))}
    </div>
  )
}

/** A card-shaped placeholder: title bar + a couple of text lines. */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-xl border border-line bg-surface p-4', className)}>
      <Skeleton className="mb-3 h-4 w-1/3" />
      <SkeletonText lines={2} />
    </div>
  )
}

/** `rows` uniform row placeholders, for lists/tables whose rows are all the same shape. */
export function SkeletonList({ rows = 4, className }: { rows?: number; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {Array.from({ length: rows }, (_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  )
}
