import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface BarDatum {
  key: string
  label: ReactNode
  value: number
  valueLabel?: string
  color?: string
}

/**
 * Horizontal magnitude bars — single hue by default (color encodes nothing;
 * identity lives in the label). Thin marks, rounded ends, direct value labels.
 */
export function BarList({
  data,
  max = 100,
  className,
}: {
  data: BarDatum[]
  max?: number
  className?: string
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className={cn('space-y-2.5', className)}>
      {data.map((d) => (
        <div
          key={d.key}
          className="grid grid-cols-[minmax(6rem,8.5rem)_1fr_2.5rem] items-center gap-3"
        >
          <div className="truncate text-[13px] text-ink-2">{d.label}</div>
          <div className="h-2 overflow-hidden rounded-full bg-inset">
            <div
              className="h-full rounded-full transition-[width] duration-700 ease-[var(--ease-out-quint)]"
              style={{
                width: mounted ? `${(d.value / max) * 100}%` : '0%',
                backgroundColor: d.color ?? 'var(--color-primary)',
              }}
            />
          </div>
          <div className="tnum text-right font-mono text-[12.5px] font-medium text-ink">
            {d.valueLabel ?? d.value}
          </div>
        </div>
      ))}
    </div>
  )
}
