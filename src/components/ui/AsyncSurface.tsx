import { useEffect, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { NishanyLoader } from './NishanyLoader'

/**
 * Content, or what stands in its place while it is still arriving.
 *
 * `fallback` is optional now: a surface that has nothing better to show than
 * "wait" gets the app's loader rather than each caller hand-rolling a spinner,
 * which is how the codebase ended up with four different ones. Pass a skeleton
 * only where its shape genuinely matches the content that replaces it.
 */
export function AsyncSurface({
  loading,
  children,
  fallback,
  delayMs = 150,
  className,
  busyLabel = 'Loading',
}: {
  loading: boolean
  children: ReactNode
  fallback?: ReactNode
  delayMs?: number
  className?: string
  busyLabel?: string
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

  return (
    <div className={cn('min-w-0', className)} aria-busy={loading || undefined} aria-live="polite">
      <span className="sr-only">{loading ? busyLabel : ''}</span>
      {loading && showFallback
        ? (fallback ?? (
            <div className="grid min-h-32 place-items-center">
              <NishanyLoader size={40} decorative />
            </div>
          ))
        : children}
    </div>
  )
}
