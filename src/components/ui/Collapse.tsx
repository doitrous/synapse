import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * An expand / collapse region.
 *
 * The height is measured from the content and written inline, because a
 * transition from 0 to `auto` does not animate. On open it settles back to
 * `auto` so the region still reflows if its content changes while open, and a
 * ResizeObserver — not a `children` dependency — is what watches for that:
 * depending on `children` re-runs the effect on every parent render, which
 * together with the settle timer becomes an infinite render loop.
 */
export function Collapse({
  open,
  children,
  className,
  id,
}: {
  open: boolean
  children: ReactNode
  className?: string
  id?: string
}) {
  const inner = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | 'auto'>(open ? 'auto' : 0)

  useEffect(() => {
    const el = inner.current
    if (!el) return
    if (open) {
      setHeight(el.scrollHeight)
      // Slightly longer than --dur-collapse, so the settle to `auto` lands
      // after the transition rather than cutting it short.
      const timer = setTimeout(() => setHeight('auto'), 300)
      return () => clearTimeout(timer)
    }
    // Closing from `auto` would not animate either, so the measured height is
    // written first and the collapse to 0 happens on the next frame.
    setHeight(el.scrollHeight)
    const frame = requestAnimationFrame(() => setHeight(0))
    return () => cancelAnimationFrame(frame)
  }, [open])

  useEffect(() => {
    const el = inner.current
    if (!el || !open || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => {
      setHeight((current) => (current === 'auto' ? current : el.scrollHeight))
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [open])

  return (
    <div
      id={id}
      className={cn('cortex-collapse', className)}
      data-open={open ? 'true' : 'false'}
      style={{ height: height === 'auto' ? 'auto' : `${height}px` }}
      // Hidden from assistive tech while closed, so a collapsed answer is not
      // read out as if it were on the page.
      aria-hidden={!open}
    >
      <div ref={inner}>{children}</div>
    </div>
  )
}
