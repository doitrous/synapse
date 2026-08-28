import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

/**
 * Hover is a *material* change, not an opacity change. The primary's shadow is
 * tinted with the action colour rather than black, and deepens one step.
 *
 * The primary hovers to `primary-hover`, never to `primary-strong`: "strong" is
 * the *text* step, and in the dark theme it rises to a pale pink so labels stay
 * readable on a tint. Using it as a fill would make the button turn pale on
 * hover in dark. `primary-hover` darkens in light and brightens in dark, which
 * is what a hover has to do against each ground.
 */
const VARIANT: Record<Variant, string> = {
  primary:
    'border border-primary-strong/25 bg-primary text-on-primary shadow-action hover:bg-primary-hover hover:shadow-action-hover active:bg-primary-hover',
  secondary:
    'border border-line-2 bg-surface text-ink shadow-control hover:border-ink-3/45 hover:bg-surface-2',
  ghost: 'border border-transparent text-ink-2 hover:border-line hover:bg-inset hover:text-ink',
  danger: 'border border-danger bg-danger text-on-danger shadow-control hover:brightness-[0.94]',
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

type SharedButtonProps = {
  variant?: Variant
  size?: Size
  iconLeft?: LucideIcon
  iconRight?: LucideIcon
  loading?: boolean
  className?: string
}

function buttonClasses({ variant = 'secondary', size = 'md', className }: Pick<SharedButtonProps, 'variant' | 'size' | 'className'>) {
  return cn(
    'group inline-flex select-none items-center justify-center rounded-lg font-semibold tracking-[-0.005em]',
    'transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-[var(--ease-out-quint)]',
    'active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
    'disabled:pointer-events-none disabled:opacity-55',
    VARIANT[variant],
    SIZE[size],
    className,
  )
}

function buttonContent({
  loading = false,
  size = 'md',
  iconLeft: Left,
  iconRight: Right,
  children,
}: SharedButtonProps & { children?: ReactNode }) {
  return (
    <>
      {loading ? (
        <Loader2 size={ICON[size]} strokeWidth={2} className="animate-spin" aria-hidden />
      ) : (
        Left && <Left size={ICON[size]} strokeWidth={2.15} aria-hidden />
      )}
      {children}
      {Right && !loading && <Right size={ICON[size]} strokeWidth={2.15} aria-hidden />}
    </>
  )
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
      className={buttonClasses({ variant, size, className })}
      disabled={disabled || loading}
      {...rest}
    >
      {buttonContent({ loading, size, iconLeft: Left, iconRight: Right, children })}
    </button>
  )
}

export function ButtonLink({
  variant = 'secondary',
  size = 'md',
  iconLeft,
  iconRight,
  loading = false,
  className,
  children,
  onClick,
  ...props
}: LinkProps & SharedButtonProps) {
  return (
    <Link
      className={buttonClasses({ variant, size, className: cn(loading && 'pointer-events-none opacity-55', className) })}
      aria-disabled={loading || undefined}
      onClick={(event) => {
        if (loading) {
          event.preventDefault()
          return
        }
        onClick?.(event)
      }}
      {...props}
    >
      {buttonContent({ loading, size, iconLeft, iconRight, children })}
    </Link>
  )
}

export function ButtonAnchor({
  variant = 'secondary',
  size = 'md',
  iconLeft,
  iconRight,
  loading = false,
  className,
  children,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & SharedButtonProps) {
  return (
    <a
      className={buttonClasses({ variant, size, className: cn(loading && 'pointer-events-none opacity-55', className) })}
      aria-disabled={loading || undefined}
      onClick={(event) => {
        if (loading) {
          event.preventDefault()
          return
        }
        onClick?.(event)
      }}
      {...props}
    >
      {buttonContent({ loading, size, iconLeft, iconRight, children })}
    </a>
  )
}
