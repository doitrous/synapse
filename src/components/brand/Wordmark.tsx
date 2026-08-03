import { cn } from '@/lib/cn'

/** A vitals-monitor pulse inside a rounded chip — medicine's own instrument,
 *  not the generic red cross. */
export function OslerMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={cn('shrink-0', className)}
      aria-hidden="true"
    >
      <rect x="1.5" y="1.5" width="29" height="29" rx="8.5" className="fill-accent" />
      <rect
        x="1.5"
        y="1.5"
        width="29"
        height="29"
        rx="8.5"
        className="stroke-black/10"
        strokeWidth="1"
      />
      <path
        d="M5.5 18.2 H11 L12.7 12 L15.5 23.2 L17.9 9.2 L19.7 18.2 H26.5"
        className="stroke-[var(--color-on-accent)]"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Wordmark({
  collapsed = false,
  className,
}: {
  collapsed?: boolean
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <OslerMark size={28} />
      {!collapsed && (
        <span className="font-serif text-[20px] font-semibold leading-none tracking-[-0.02em] text-ink">
          Osler
        </span>
      )}
    </div>
  )
}
