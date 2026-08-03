import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Panel } from './Panel'
import { Icon } from './Icon'
import { cn } from '@/lib/cn'

export function Stat({
  label,
  value,
  delta,
  deltaDir = 'up',
  sub,
  icon,
}: {
  label: string
  value: string
  delta?: string
  deltaDir?: 'up' | 'down'
  sub?: string
  icon?: LucideIcon
}) {
  const good = deltaDir === 'up'
  return (
    <Panel className="p-4">
      <div className="flex items-center justify-between">
        <p className="text-[12.5px] font-medium text-ink-2">{label}</p>
        {icon && <Icon icon={icon} size={16} className="text-ink-3" />}
      </div>
      <p className="mt-2 tnum font-mono text-[26px] font-semibold leading-none tracking-tight text-ink">
        {value}
      </p>
      <div className="mt-2 flex items-center gap-1.5 text-[12px]">
        {delta && (
          <span className={cn('inline-flex items-center gap-0.5 font-medium', good ? 'text-success' : 'text-danger')}>
            <Icon icon={good ? ArrowUpRight : ArrowDownRight} size={13} />
            {delta}
          </span>
        )}
        {sub && <span className="text-ink-3">{sub}</span>}
      </div>
    </Panel>
  )
}
