import type { ButtonHTMLAttributes } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

const VARIANT: Record<Variant, string> = {
  primary:
    'border border-accent-strong/25 bg-accent text-on-accent shadow-[0_1px_2px_rgba(45,91,85,0.18)] hover:bg-accent-strong hover:shadow-[0_2px_5px_rgba(45,91,85,0.18)] active:bg-accent-strong',
  secondary:
    'border border-line-2 bg-surface text-ink shadow-[0_1px_1px_rgba(36,29,22,0.04)] hover:border-ink-3/45 hover:bg-surface-2',
  ghost: 'border border-transparent text-ink-2 hover:border-line hover:bg-inset hover:text-ink',
  danger: 'border border-danger bg-danger text-on-danger shadow-[0_1px_2px_rgba(159,54,46,0.18)] hover:brightness-[0.94]',
}

const SIZE: Record<Size, string> = {
  sm: 'h-11 gap-1.5 px-2.5 text-[13px] sm:h-8',
  md: 'h-11 gap-2 px-3.5 text-[13.5px] sm:h-9',
  lg: 'h-11 gap-2 px-5 text-[15px]',
}

const ICON: Record<Size, number> = { sm: 15, md: 16, lg: 18 }

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  iconLeft?: LucideIcon
  iconRight?: LucideIcon
  loading?: boolean
}

export function Button({
  variant = 'secondary',
  size = 'md',
  iconLeft: Left,
  iconRight: Right,
  loading = false,
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        'group inline-flex select-none items-center justify-center rounded-lg font-semibold tracking-[-0.005em]',
        'transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-[var(--ease-out-quint)]',
        'active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]',
        'disabled:pointer-events-none disabled:opacity-55',
        VARIANT[variant],
        SIZE[size],
        className,
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <Loader2 size={ICON[size]} strokeWidth={2} className="animate-spin" aria-hidden />
      ) : (
        Left && <Left size={ICON[size]} strokeWidth={2.15} aria-hidden />
      )}
      {children}
      {Right && !loading && <Right size={ICON[size]} strokeWidth={2.15} aria-hidden />}
    </button>
  )
}
