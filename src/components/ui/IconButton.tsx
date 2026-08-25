import type { ButtonHTMLAttributes } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Icon } from './Icon'
import { Tooltip } from './Tooltip'
import { cn } from '@/lib/cn'

type Variant = 'ghost' | 'surface' | 'primary'

const VARIANT: Record<Variant, string> = {
  ghost: 'border border-transparent text-ink-2 hover:border-line hover:bg-inset hover:text-ink',
  surface: 'border border-line-2 bg-surface text-ink-2 shadow-control hover:bg-surface-2 hover:text-ink',
  primary: 'border border-primary-strong/25 bg-primary text-on-primary shadow-panel hover:bg-primary-hover',
}

export function IconButton({
  icon,
  label,
  variant = 'ghost',
  size = 'md',
  active = false,
  tooltipPlacement = 'top',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: LucideIcon
  label: string
  variant?: Variant
  size?: 'sm' | 'md'
  active?: boolean
  tooltipPlacement?: 'top' | 'bottom'
}) {
  const button = (
    <button
      type="button"
      aria-label={label}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-lg transition-[background-color,border-color,color,box-shadow,transform] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
        size === 'sm' ? 'size-11 sm:size-8' : 'size-11 sm:size-9',
        active ? 'bg-primary-tint text-primary-strong' : VARIANT[variant],
        className,
      )}
      {...props}
    >
      <Icon icon={icon} size={size === 'sm' ? 16 : 18} strokeWidth={2.1} />
    </button>
  )

  return <Tooltip content={label} placement={tooltipPlacement}>{button}</Tooltip>
}
