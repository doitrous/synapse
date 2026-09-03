import { cn } from '@/lib/cn'

const SIZE: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'size-7 text-[11px]',
  md: 'size-9 text-[13px]',
  lg: 'size-11 text-[15px]',
}

export function Avatar({
  name,
  size = 'md',
  className,
  src,
}: {
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  /** An uploaded/imported photo. Omitted (or a load failure) falls back to initials. */
  src?: string
}) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')

  if (src) {
    return (
      <img
        src={src}
        alt=""
        aria-hidden
        className={cn('inline-block rounded-full border border-primary-line object-cover', SIZE[size], className)}
      />
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full border border-primary-line bg-primary-tint font-medium text-primary-strong',
        SIZE[size],
        className,
      )}
      aria-hidden
    >
      {initials}
    </span>
  )
}
