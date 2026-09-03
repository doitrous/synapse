import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Check, LockKeyhole } from 'lucide-react'
import { Wordmark } from '@/components/brand/Wordmark'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

export type AuthStep = 'account' | 'verify' | 'setup'

/**
 * Warm-crimson palette for the brand panel. Explicit hex, not tokens: this
 * one surface (pre-login) deliberately breaks from the app's cool design
 * tokens, so the values live here rather than fighting `--color-accent`.
 */
const WARM = {
  panelBg: '#f4ecdd',
  dot: '#e4d5bc',
  ink: '#2b211c',
  ink2: '#6e6157',
  crimson: '#a81d40',
  rose: '#e0859b',
  taupeDotted: '#cabca3',
  taupeRing: '#cdbfa6',
  cardBorder: '#eadfce',
  fieldBorder: '#dccfba',
  fieldBg: '#fffdfa',
}

/**
 * The small lockup mark beside "nishany" on the brand panel: two concentric
 * rings, crimson outer / rose inner. A standalone SVG rather than reusing
 * `NishanyMark`, whose non-monochrome colours are wired to the app's (cool)
 * `--brand-blue` token — wrong on a warm panel — and whose `monochrome` mode
 * collapses both rings to one colour, losing the two-tone read this panel
 * wants.
 */
function WordmarkRingIcon({ size = 24 }: { size?: number }) {
  return (
    <svg aria-hidden focusable="false" viewBox="0 0 32 32" width={size} height={size}>
      <circle cx="16" cy="16" r="14" fill="none" stroke={WARM.crimson} strokeWidth="2" />
      <circle cx="16" cy="16" r="8" fill="none" stroke={WARM.rose} strokeWidth="2.5" />
    </svg>
  )
}

/**
 * The panel's hero graphic: a still echo of `NishanyLoader`'s rings, redrawn
 * in the warm palette — a dotted taupe ring, a solid taupe ring, a thick
 * partial crimson arc, a thin inner crimson ring, and a filled crimson
 * centre dot. Decorative only; anchored into the bottom-right corner and
 * clipped by the panel's own `overflow-hidden` so it bleeds off the edge,
 * clear of the copy that stacks from the top.
 */
function HeroRingGraphic({ size = 300, className }: { size?: number; className?: string }) {
  return (
    <svg aria-hidden focusable="false" viewBox="0 0 100 100" width={size} height={size} className={className}>
      <circle cx="50" cy="50" r="46" fill="none" stroke={WARM.taupeDotted} strokeWidth="1.5" strokeDasharray="1.5 5" strokeLinecap="round" />
      <circle cx="50" cy="50" r="38" fill="none" stroke={WARM.taupeRing} strokeWidth="1.5" />
      <circle cx="50" cy="50" r="30" fill="none" stroke={WARM.crimson} strokeWidth="6" strokeLinecap="round" strokeDasharray="140 189" transform="rotate(-90 50 50)" />
      <circle cx="50" cy="50" r="20" fill="none" stroke={WARM.crimson} strokeWidth="1" opacity="0.55" />
      <circle cx="50" cy="50" r="6" fill={WARM.crimson} />
    </svg>
  )
}

/**
 * The three things a new student actually has to do.
 *
 * The last of these used to be "Protect account", which put an optional second
 * factor on the required path: a student who had just verified their address
 * was shown a numbered step telling them one more thing stood between them and
 * the app, and the screen it led to asked for an authenticator. Adding one is
 * worth offering and is not a step in signing up. What genuinely comes next is
 * choosing a university, a year and a plan, so that is what the rail says, and
 * the authenticator screen no longer draws a rail at all.
 */
const steps: Array<{ id: AuthStep; label: string }> = [
  { id: 'account', label: 'Account' },
  { id: 'verify', label: 'Verify email' },
  { id: 'setup', label: 'Set up your studies' },
]

export function AuthLayout({
  step,
  title,
  description,
  children,
  aside,
  compact = false,
  completedSteps,
  showProgress = true,
}: {
  step: AuthStep
  title: string
  description: string
  children: ReactNode
  aside?: ReactNode
  compact?: boolean
  completedSteps?: AuthStep[]
  showProgress?: boolean
}) {
  const activeIndex = steps.findIndex((item) => item.id === step)

  return (
    <div className="min-h-dvh bg-paper">
      <header className="border-b border-line bg-surface/70">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link to="/" aria-label="Nishany home"><Wordmark /></Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className={cn('mx-auto', compact ? 'max-w-4xl' : 'max-w-5xl')}>
          <div className="mb-8 max-w-2xl">
            <h1 className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] tracking-[-0.025em] text-ink">{title}</h1>
            <p className="mt-3 max-w-[65ch] text-[15px] leading-relaxed text-ink-2">{description}</p>
          </div>

          {showProgress && <ol className="mb-7 grid grid-cols-3" aria-label="Account setup progress">
            {steps.map((item, index) => {
              const complete = completedSteps ? completedSteps.includes(item.id) : index < activeIndex
              const active = index === activeIndex
              return (
                <li key={item.id} className="relative flex min-w-0 flex-col items-center text-center">
                  {index > 0 && <span className={cn('absolute end-1/2 top-4 h-px w-full', index <= activeIndex ? 'bg-primary' : 'bg-line-2')} aria-hidden />}
                  <span className={cn(
                    'relative z-10 grid size-8 place-items-center rounded-full border bg-paper font-mono text-[12px] font-semibold',
                    complete && 'border-success bg-success text-on-success',
                    active && 'border-primary bg-primary text-on-primary',
                    !complete && !active && 'border-line-2 text-ink-2',
                  )}>
                    {complete ? <Icon icon={Check} size={14} /> : index + 1}
                  </span>
                  <span className={cn('mt-2 truncate text-[12px] font-semibold sm:text-[13px]', active ? 'text-primary-strong' : complete ? 'text-success' : 'text-ink-2')}>{item.label}</span>
                </li>
              )
            })}
          </ol>}

          <section
            className={cn(
              'overflow-hidden rounded-[20px] border bg-surface',
              Boolean(aside) && 'grid lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.78fr)]',
            )}
            style={{ borderColor: WARM.cardBorder, boxShadow: `0 18px 45px -18px ${WARM.crimson}40` }}
          >
            <div className="p-6 sm:p-8 lg:p-10">{children}</div>
            {aside && (
              <aside
                className="relative isolate overflow-hidden border-t p-6 sm:p-8 lg:border-s lg:border-t-0 lg:p-10"
                style={{
                  borderColor: WARM.cardBorder,
                  backgroundColor: WARM.panelBg,
                  backgroundImage: `radial-gradient(circle, ${WARM.dot} 1px, transparent 1.6px)`,
                  backgroundSize: '26px 26px',
                  color: WARM.ink,
                }}
              >
                {/* Only in the two-column layout: stacked below the form on
                    narrow screens the panel is too short for a 340px ring, and
                    it would sit over the copy. */}
                <HeroRingGraphic size={340} className="pointer-events-none absolute -bottom-16 -end-16 hidden lg:block" />
                <div className="relative flex items-center gap-2">
                  <WordmarkRingIcon />
                  <span className="flex min-w-0 flex-col justify-center leading-none">
                    <span className="font-brand text-[15px] font-extrabold" style={{ color: WARM.ink }}>nishany</span>
                    <span className="mt-[0.32em] text-[9px] font-semibold tracking-[0.2em]" style={{ color: WARM.crimson }}>BY CONNECT</span>
                  </span>
                </div>
                <div className="relative mt-7">{aside}</div>
              </aside>
            )}
          </section>

          {/* What this means for the reader, rather than which products it is
              built on. Naming the auth provider and the database engine told a
              student nothing they could act on, and the same sentence used to
              be a checkbox they had to tick to register. */}
          <p className="mx-auto mt-6 flex max-w-2xl items-center justify-center gap-2 text-center text-[12px] leading-relaxed text-ink-2">
            <Icon icon={LockKeyhole} size={14} /> Your notes, answers and progress are private to your account.
          </p>
        </div>
      </main>
    </div>
  )
}
