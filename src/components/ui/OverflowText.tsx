import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Tooltip } from './Tooltip'
import { cn } from '@/lib/cn'

export function OverflowText({
  children,
  title,
  tooltip,
  className,
}: {
  children: ReactNode
  title?: string
  tooltip?: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [truncated, setTruncated] = useState(false)
  const label = tooltip ?? title ?? (typeof children === 'string' ? children : '')

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const measure = () => setTruncated(node.scrollWidth > node.clientWidth || node.scrollHeight > node.clientHeight)
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [children])

  const text = (
    <span ref={ref} className={cn('block min-w-0 truncate', className)}>
      {children}
    </span>
  )

  if (!label || !truncated) return text
  return (
    <Tooltip content={label}>
      <span tabIndex={0} className="block min-w-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]">
        {text}
      </span>
    </Tooltip>
  )
}
