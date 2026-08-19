import { cn } from '@/lib/cn'
import { useTheme } from '@/lib/useTheme'

/**
 * The Connect Cortex mark — split hemispheres, blue left / crimson right, a
 * radial circuit with ring nodes. This is the client-supplied artwork, not a
 * redrawn or traced approximation.
 *
 * The light artwork's deep blue goes muddy on the dark ground, so a variant
 * with both brand colours lifted is swapped in under the dark theme. Chosen in
 * JS rather than by toggling two `<img>` elements, so only the mark actually
 * being shown is ever fetched.
 */
export function CortexMark({ size = 28, className }: { size?: number; className?: string }) {
  const { theme } = useTheme()
  const src = theme === 'dark' ? '/brand/logo-dark.png' : '/brand/logo.png'

  return (
    <img
      src={src}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      decoding="async"
      className={cn('shrink-0 object-contain', className)}
      style={{ height: size, width: 'auto' }}
    />
  )
}

/**
 * The lockup. The O in "Connect" *is* the mark, so the wordmark and the symbol
 * are one thing — never a real letter O, never the halves recoloured or
 * separated. Letters are set in Jost, the logotype's own geometric sans, at
 * weight 500 / 0.045em / uppercase, with the mark at 1.06em on the cap line.
 * `CONNECT` is blue and `CORTEX` crimson; both read brand tokens, which the
 * dark theme moves up the ramp on their own.
 */
export function Wordmark({
  collapsed = false,
  textSize = 20,
  className,
}: {
  collapsed?: boolean
  textSize?: number
  className?: string
}) {
  if (collapsed) {
    return (
      <span className={cn('inline-flex items-center', className)}>
        <CortexMark size={28} />
        <span className="sr-only">Connect Cortex</span>
      </span>
    )
  }

  return (
    <span className={cn('inline-flex items-center', className)}>
      {/* One accessible name for the lockup; the pieces below are decorative. */}
      <span className="sr-only">Connect Cortex</span>
      <span
        aria-hidden="true"
        className="font-brand font-medium leading-none tracking-[0.045em] whitespace-nowrap"
        style={{ fontSize: textSize }}
      >
        <span className="text-[var(--brand-blue)]">C</span>
        <CortexMark size={textSize * 1.06} className="mx-[0.015em] inline-block align-[-0.25em]" />
        <span className="text-[var(--brand-blue)]">NNECT</span>
        <span className="text-[var(--brand-rose)]">CORTEX</span>
      </span>
    </span>
  )
}
