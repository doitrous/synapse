import type { ButtonHTMLAttributes } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Icon } from './Icon'
import { cn } from '@/lib/cn'

type Variant = 'ghost' | 'surface' | 'primary'

const VARIANT: Record<Variant, string> = {
  ghost: 'border border-transparent text-ink-2 hover:border-line hover:bg-inset hover:text-ink',
  surface: 'border border-line-2 bg-surface text-ink-2 shadow-[0_1px_1px_rgba(36,29,22,0.04)] hover:bg-surface-2 hover:text-ink',
  primary: 'border border-accent-strong/25 bg-accent text-on-accent shadow-panel hover:bg-accent-strong',
}

export function IconButton({
  icon,
  label,
  variant = 'ghost',
  size = 'md',
  active = false,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: LucideIcon
  label: string
  variant?: Variant
  size?: 'sm' | 'md'
  active?: boolean
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex items-center justify-center rounded-lg transition-[background-color,border-color,color,box-shadow,transform] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]',
        size === 'sm' ? 'size-11 sm:size-8' : 'size-11 sm:size-9',
        active ? 'bg-accent-tint text-accent-strong' : VARIANT[variant],
        className,
      )}
      {...props}
    >
      <Icon icon={icon} size={size === 'sm' ? 16 : 18} strokeWidth={2.1} />
    </button>
  )
}
