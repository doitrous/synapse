import { useEffect, useRef, useState, type JSX } from 'react'
import { API_MODE, apiGet } from '@/lib/api'
import { cn } from '@/lib/cn'

interface SubscriberCountResponse {
  enabled: boolean
  value?: number
  ratePerSecond?: number
}

/**
 * The marketing subscriber count: a small pulsing "live" dot next to a
 * number that counts up from 0 the first time it scrolls into view, then
 * ticks up in real time. Renders nothing at all while the feature is off,
 * in demo mode, or before the first successful fetch — never a placeholder
 * "0" that a visitor could mistake for the real figure.
 */
export function LiveCount({ variant = 'chip', className }: { variant?: 'chip' | 'band'; className?: string }): JSX.Element | null {
  const [data, setData] = useState<{ value: number; ratePerSecond: number } | null>(null)
  const [displayed, setDisplayed] = useState<number | null>(null)
  const rootRef = useRef<HTMLSpanElement | null>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!API_MODE) return
    let active = true
    apiGet<SubscriberCountResponse>('/public/subscriber-count')
      .then((res) => {
        if (!active || !res.enabled || typeof res.value !== 'number') return
        setData({ value: res.value, ratePerSecond: res.ratePerSecond ?? 0 })
      })
      .catch(() => {})
    return () => { active = false }
  }, [])

  // Count up from 0 the first time the number scrolls into view.
  useEffect(() => {
    const node = rootRef.current
    if (!node || !data || startedRef.current) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || startedRef.current) return
      startedRef.current = true
      observer.disconnect()
      if (reduceMotion) { setDisplayed(data.value); return }
      const durationMs = 1200
      const startedAt = performance.now()
      const tick = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / durationMs)
        setDisplayed(Math.round(data.value * progress))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [data])

  // After the count-up finishes, keep ticking up by ratePerSecond.
  useEffect(() => {
    if (!data || displayed === null || displayed < data.value) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const interval = window.setInterval(() => {
      setDisplayed((current) => (current === null ? current : current + data.ratePerSecond))
    }, 1000)
    return () => window.clearInterval(interval)
  }, [data, displayed])

  if (!data) return null

  // The pulsing dot keeps this span in the DOM with real layout size so the
  // IntersectionObserver has something to watch — but the number itself stays
  // absent until the count-up begins (`displayed !== null`), so a visitor never
  // sees a static placeholder "0" sitting before the reveal.
  return (
    <span ref={rootRef} className={cn('inline-flex items-center gap-2', className)}>
      <span className="relative flex size-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-success motion-reduce:animate-none" />
        <span className="relative inline-flex size-2 rounded-full bg-success" />
      </span>
      {displayed !== null && (
        <span className={cn('tnum font-mono font-semibold', variant === 'band' ? 'text-2xl' : 'text-sm')}>
          {Math.round(displayed).toLocaleString('en-US')}
        </span>
      )}
    </span>
  )
}
