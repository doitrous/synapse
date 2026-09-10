import { useEffect, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { LoadingRegion, SkeletonRows } from '@/components/loading/SkeletonParts'

/** Reserves the content's footprint until its first read finishes. Saving is not loading. */
export function AsyncSurface({
  loading,
  children,
  fallback,
  delayMs = 0,
  className,
  busyLabel = 'Loading',
  error,
  empty,
  isEmpty = false,
}: {
  loading: boolean
  children: ReactNode
  fallback?: ReactNode
  delayMs?: number
  className?: string
  busyLabel?: string
  /** Rendered in place of everything else when set (e.g. an offline/error EmptyState with a retry action). */
  error?: ReactNode
  /** Rendered instead of `children` once loading is done, there's no `error`, and `isEmpty` is true. */
  empty?: ReactNode
  isEmpty?: boolean
}) {
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    if (!loading) {
      setShowFallback(false)
      return
    }
    const timer = window.setTimeout(() => setShowFallback(true), delayMs)
    return () => window.clearTimeout(timer)
  }, [delayMs, loading])

  if (error) {
    return <div className={cn('min-w-0', className)}>{error}</div>
  }

  return (
    <div className={cn('min-w-0', className)} aria-busy={loading || undefined} aria-live="polite">
      <span className="sr-only">{loading ? busyLabel : ''}</span>
      {loading
        ? <div className={delayMs > 0 && !showFallback ? 'invisible' : undefined}>
            {fallback ?? <LoadingRegion label={busyLabel}><SkeletonRows /></LoadingRegion>}
          </div>
        : isEmpty && empty
          ? empty
          : children}
    </div>
  )
}
