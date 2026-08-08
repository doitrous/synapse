import { cn } from '@/lib/cn'

/**
 * A premium, unified marker for a curriculum System — a quiet monogram tile
 * (rounded square, hairline border, mono short code) that replaces the old
 * coloured dot. Used everywhere a system is labelled, in both admin and student
 * views, so the taxonomy reads as one system.
 */
export function SystemBadge({ short, size = 'md', className }: {
  short: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const code = short.replace(/[^A-Za-z0-9]/g, '').slice(0, 3).toUpperCase() || '—'
  const dims = size === 'lg' ? 'size-8 text-[11px]' : size === 'sm' ? 'size-5 text-[8.5px]' : 'size-6 text-[9.5px]'
  return (
    <span
      className={cn(
        'inline-grid shrink-0 place-items-center rounded-[6px] border border-line-2 bg-surface-2 font-mono font-semibold tracking-[0.03em] text-ink-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]',
        dims,
        className,
      )}
      title={short}
      aria-hidden
    >
      {code}
    </span>
  )
}
