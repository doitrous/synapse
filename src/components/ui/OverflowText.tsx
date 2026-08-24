import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Tooltip } from './Tooltip'
import { cn } from '@/lib/cn'

export function OverflowText({
  children,
  className,
  tooltip,
}: {
  children: ReactNode
  className?: string
  tooltip?: ReactNode
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [truncated, setTruncated] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const measure = () => setTruncated(node.scrollWidth > node.clientWidth || node.scrollHeight > node.clientHeight)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [children])

  const text = (
    <span ref={ref} className={cn('block min-w-0 truncate', className)} tabIndex={truncated ? 0 : undefined}>
      {children}
    </span>
  )

  return truncated ? <Tooltip label={tooltip ?? children}>{text}</Tooltip> : text
}
