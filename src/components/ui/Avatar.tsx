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
}: {
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full border border-accent-line bg-accent-tint font-medium text-accent-strong',
        SIZE[size],
        className,
      )}
      aria-hidden
    >
      {initials}
    </span>
  )
}
