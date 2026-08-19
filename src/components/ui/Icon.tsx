import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

/**
 * One consistent stroke weight across the whole product. Icons are always
 * decorative here (labels carry meaning), so they are hidden from a11y tree.
 */
export function Icon({
  icon: Glyph,
  size = 16,
  strokeWidth = 1.95,
  className,
  open,
}: {
  icon: LucideIcon
  size?: number
  strokeWidth?: number
  className?: string
  /**
   * Disclosure state, published as `data-open` for the `chevron-turn` utility
   * to key off. A chevron turns rather than swapping glyph, and doing it in CSS
   * keeps the turn — and its mirrored direction in Arabic — in one place
   * instead of at every call site.
   */
  open?: boolean
}) {
  return (
    <Glyph
      size={size}
      strokeWidth={strokeWidth}
      className={cn('shrink-0', className)}
      data-open={open === undefined ? undefined : String(open)}
      aria-hidden="true"
    />
  )
}
