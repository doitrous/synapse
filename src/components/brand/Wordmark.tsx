import { cn } from '@/lib/cn'

/** Synapse mark — a simplified synaptic junction (presynaptic bouton with
 *  vesicles, transmitters crossing the cleft, receiving membrane), tilted 45°.
 *  Rendered in the clay accent system: accent chip, on-accent (cream) glyph. */
export function SynapseMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={cn('shrink-0', className)}
      aria-hidden="true"
    >
      <rect x="1" y="1" width="62" height="62" rx="16" className="fill-accent" />
      <rect
        x="1.5"
        y="1.5"
        width="61"
        height="61"
        rx="15.5"
        fill="none"
        className="stroke-black/10"
        strokeWidth="1"
      />
      <g transform="rotate(45 32 32)" className="fill-[var(--color-on-accent)]">
        {/* presynaptic: axon stalk + bouton terminal */}
        <rect x="28" y="7" width="8" height="15" rx="4" />
        <circle cx="32" cy="27" r="11.5" />
        {/* synaptic vesicles (knocked out to the chip) */}
        <circle cx="27.5" cy="25" r="2.4" className="fill-accent" />
        <circle cx="35.5" cy="24" r="2" className="fill-accent" />
        <circle cx="31" cy="31" r="2.7" className="fill-accent" />
        {/* neurotransmitters crossing the cleft */}
        <circle cx="30" cy="41.5" r="1.4" />
        <circle cx="34.5" cy="42" r="1.1" />
        {/* postsynaptic: receiving membrane + dendrite */}
        <path d="M18 46 Q32 61 46 46 L41.5 46 Q32 54 22.5 46 Z" />
        <rect x="29" y="54" width="6" height="6" rx="3" />
      </g>
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
      <SynapseMark size={28} />
      {!collapsed && (
        <span className="font-serif text-[20px] font-semibold leading-none tracking-[-0.02em] text-ink">
          Synapse
        </span>
      )}
    </div>
  )
}
