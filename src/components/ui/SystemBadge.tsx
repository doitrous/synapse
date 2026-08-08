import { cn } from '@/lib/cn'

/**
 * A premium, unified marker for a curriculum System — a monogram tile (rounded
 * square, hairline border, mono short code). When a `color` is given it renders
 * as a tasteful tinted chip in that colour; otherwise it stays neutral.
 */
export function SystemBadge({ short, color, size = 'md', className }: {
  short: string
  color?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const code = short.replace(/[^A-Za-z0-9]/g, '').slice(0, 3).toUpperCase() || '—'
  const dims = size === 'lg' ? 'size-8 text-[11px]' : size === 'sm' ? 'size-5 text-[8.5px]' : 'size-6 text-[9.5px]'
  const tint = color
    ? {
        backgroundColor: `color-mix(in srgb, ${color} 15%, var(--color-surface))`,
        color: `color-mix(in srgb, ${color} 82%, var(--color-ink))`,
        borderColor: `color-mix(in srgb, ${color} 34%, var(--color-line))`,
      }
    : undefined
  return (
    <span
      className={cn(
        'inline-grid shrink-0 place-items-center rounded-[6px] border font-mono font-semibold tracking-[0.03em] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]',
        color ? '' : 'border-line-2 bg-surface-2 text-ink-2',
        dims,
        className,
      )}
      style={tint}
      title={short}
      aria-hidden
    >
      {code}
    </span>
  )
}
