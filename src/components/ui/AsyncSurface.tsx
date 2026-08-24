import { useEffect, useState, type ReactNode } from 'react'

export function AsyncSurface({
  loading,
  children,
  fallback,
  delayMs = 150,
}: {
  loading: boolean
  children: ReactNode
  fallback: ReactNode
  delayMs?: number
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

  if (!loading) return <>{children}</>
  if (!showFallback && children) return <>{children}</>
  return <>{fallback}</>
}
