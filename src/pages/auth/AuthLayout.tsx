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

/** The wordmark lockup that sits at the top of the brand panel, linking home. */
function BrandLockup({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const lg = size === 'lg'
  return (
    <Link to="/" aria-label="Nishany home" className="relative flex items-center gap-2.5">
      <WordmarkRingIcon size={lg ? 30 : 28} />
      <span className="flex flex-col leading-none">
        <span className={cn('font-brand font-extrabold', lg ? 'text-[18px]' : 'text-[16px]')} style={{ color: WARM.ink }}>nishany</span>
        <span className="mt-[0.3em] text-[10px] font-semibold tracking-[0.2em]" style={{ color: WARM.crimson }}>BY CONNECT</span>
      </span>
    </Link>
  )
}

/**
 * The panel's hero graphic: a still, warm-palette echo of `NishanyLoader`'s
 * rings — a dotted taupe ring, a solid taupe ring, a thick crimson ring, a
 * thin inner crimson ring, and a filled crimson centre dot, drawn as a
 * complete concentric "target". Decorative only; sits in normal flow at the
 * foot of the brand panel, whole and centred rather than bled off an edge.
 */
function HeroRingGraphic({ size = 300, className }: { size?: number; className?: string }) {
  return (
    <svg aria-hidden focusable="false" viewBox="0 0 100 100" width={size} height={size} className={className}>
      <circle cx="50" cy="50" r="46" fill="none" stroke={WARM.taupeDotted} strokeWidth="1.5" strokeDasharray="1.5 5" strokeLinecap="round" />
      <circle cx="50" cy="50" r="38" fill="none" stroke={WARM.taupeRing} strokeWidth="1.5" />
      <circle cx="50" cy="50" r="30" fill="none" stroke={WARM.crimson} strokeWidth="6" />
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

function StepRail({ activeIndex, completedSteps }: { activeIndex: number; completedSteps?: AuthStep[] }) {
  return (
    <ol className="mb-6 grid grid-cols-3" aria-label="Account setup progress">
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
    </ol>
  )
}

const privacyNote = (
  <p className="flex items-center justify-center gap-2 text-center text-[12px] leading-relaxed" style={{ color: WARM.ink2 }}>
    <Icon icon={LockKeyhole} size={14} /> Your notes, answers and progress are private to your account.
  </p>
)

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

  /**
   * Full-bleed split screen for the branded flows (sign-in, sign-up): the warm
   * brand panel fills one half at full height with the hero ring bleeding off
   * its corner, and the form sits in a card on the other half — edge to edge,
   * matching the auth redesign canvas. Below `lg` the brand half drops away and
   * the form card centres on the cream ground. The plainer auth screens (verify
   * email, second factor) pass no `aside` and keep the centred card further
   * down instead.
   */
  if (aside) {
    return (
      <div
        className="min-h-dvh lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
        style={{
          backgroundColor: WARM.panelBg,
          backgroundImage: `radial-gradient(circle, ${WARM.dot} 1px, transparent 1.6px)`,
          backgroundSize: '26px 26px',
          color: WARM.ink,
        }}
      >
        <aside className="relative hidden overflow-hidden p-12 xl:p-16 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col">
          <BrandLockup size="lg" />
          {/* Copy centred in the space between the lockup and the ring; the ring
              sits in normal flow at the bottom, centred and whole — not bled off
              the edge — so the complete circle shows. */}
          <div className="flex max-w-md flex-1 flex-col justify-center">{aside}</div>
          <div className="flex shrink-0 justify-center pt-8">
            <HeroRingGraphic size={320} />
          </div>
        </aside>

        <div className="flex min-h-dvh items-center justify-center p-5 sm:p-8 lg:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden"><BrandLockup /></div>
            <div
              className="rounded-[22px] border bg-white p-6 sm:p-8"
              style={{ borderColor: WARM.cardBorder, boxShadow: `0 26px 60px -34px ${WARM.crimson}47` }}
            >
              <div className="mb-6">
                <h1 className="text-[26px] leading-tight tracking-[-0.01em] text-ink">{title}</h1>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{description}</p>
              </div>
              {showProgress && <StepRail activeIndex={activeIndex} completedSteps={completedSteps} />}
              {children}
            </div>
            <div className="mt-5">{privacyNote}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-paper">
      <header className="border-b border-line bg-surface/70">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link to="/" aria-label="Nishany home"><Wordmark /></Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className={cn('mx-auto', compact ? 'max-w-2xl' : 'max-w-3xl')}>
          <div className="mb-8">
            <h1 className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] tracking-[-0.025em] text-ink">{title}</h1>
            <p className="mt-3 max-w-[65ch] text-[15px] leading-relaxed text-ink-2">{description}</p>
          </div>

          {showProgress && <StepRail activeIndex={activeIndex} completedSteps={completedSteps} />}

          <section
            className="overflow-hidden rounded-[20px] border bg-surface"
            style={{ borderColor: WARM.cardBorder, boxShadow: `0 18px 45px -18px ${WARM.crimson}40` }}
          >
            <div className="p-6 sm:p-8 lg:p-10">{children}</div>
          </section>

          <p className="mx-auto mt-6 flex max-w-2xl items-center justify-center gap-2 text-center text-[12px] leading-relaxed text-ink-2">
            <Icon icon={LockKeyhole} size={14} /> Your notes, answers and progress are private to your account.
          </p>
        </div>
      </main>
    </div>
  )
}
