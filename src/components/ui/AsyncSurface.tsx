import { useEffect, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

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
  fallback: ReactNode
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
      {loading && showFallback ? fallback : children}
    </div>
  )
}
