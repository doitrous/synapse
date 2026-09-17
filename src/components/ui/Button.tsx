import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'
import { preloadStudentRoute } from '@/router'
import { NishanyLoader } from './NishanyLoader'

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

/**
 * Height *and* a matching `min-height`: a button is a flex item too, and in a
 * column that runs out of room `height` alone is shrunk away — a 44px control
 * rendered 25px tall. `min-height` is the floor flex-shrink respects.
 *
 * `cn` is a plain joiner, not tailwind-merge, so a caller passing its own
 * `h-*` would leave these in place and fight them. No caller does; anyone who
 * needs a different height has to override `min-h-*` alongside it.
 */
const SIZE: Record<Size, string> = {
  sm: 'h-11 min-h-11 gap-1.5 px-2.5 text-[13px] sm:h-8 sm:min-h-8',
  md: 'h-11 min-h-11 gap-2 px-3.5 text-[13.5px] sm:h-9 sm:min-h-9',
  lg: 'h-11 min-h-11 gap-2 px-5 text-[15px]',
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
        // The single-ring variant in `currentColor`, so a loading primary and
        // a loading ghost each spin in their own label colour.
        <NishanyLoader mini decorative className="shrink-0" />
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
  onMouseEnter,
  onFocus,
  onTouchStart,
  to,
  ...props
}: LinkProps & SharedButtonProps) {
  return (
    <Link
      to={to}
      className={buttonClasses({ variant, size, className: cn(loading && 'pointer-events-none opacity-55', className) })}
      aria-disabled={loading || undefined}
      onClick={(event) => {
        if (loading) {
          event.preventDefault()
          return
        }
        onClick?.(event)
      }}
      onMouseEnter={(event) => {
        preloadStudentRoute(typeof to === 'string' ? to : to.pathname ?? '')
        onMouseEnter?.(event)
      }}
      onFocus={(event) => {
        preloadStudentRoute(typeof to === 'string' ? to : to.pathname ?? '')
        onFocus?.(event)
      }}
      onTouchStart={(event) => {
        preloadStudentRoute(typeof to === 'string' ? to : to.pathname ?? '')
        onTouchStart?.(event)
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
