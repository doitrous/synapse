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
}: {
  icon: LucideIcon
  size?: number
  strokeWidth?: number
  className?: string
}) {
  return (
    <Glyph
      size={size}
      strokeWidth={strokeWidth}
      className={cn('shrink-0', className)}
      aria-hidden="true"
    />
  )
}
