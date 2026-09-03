import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { LiveCount } from '@/components/marketing/LiveCount'
import { cn } from '@/lib/cn'
import { TRIAL_PATH, useRevealOnScroll } from './shared'

/**
 * The Noon Dot mark enlarged into an aiming target — the hero artwork.
 * Moved verbatim from the previous LandingShell.tsx: the word نيشاني means
 * "my target," and the mark's own geometry (bowl, dot in the bowl's mouth)
 * is shifted so the dot lands dead-centre on the target rings. Colours read
 * from tokens so the artwork follows warm/dark/oled like the mark itself.
 */
function TargetArtwork({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 640" fill="none" aria-hidden="true" className={className}>
      <circle cx="320" cy="320" r="116" stroke="var(--color-grid-major)" strokeWidth="2" />
      <circle cx="320" cy="320" r="174" stroke="var(--color-grid-major)" strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" />
      <circle cx="320" cy="320" r="232" stroke="var(--color-grid-major)" strokeWidth="2" />
      <circle cx="320" cy="320" r="290" stroke="var(--color-accent-line)" strokeWidth="6" opacity="0.9" />
      <line x1="320" y1="6" x2="320" y2="34" stroke="var(--color-line-2)" strokeWidth="3" strokeLinecap="round" />
      <line x1="320" y1="606" x2="320" y2="634" stroke="var(--color-line-2)" strokeWidth="3" strokeLinecap="round" />
      <line x1="6" y1="320" x2="34" y2="320" stroke="var(--color-line-2)" strokeWidth="3" strokeLinecap="round" />
      <line x1="606" y1="320" x2="634" y2="320" stroke="var(--color-line-2)" strokeWidth="3" strokeLinecap="round" />
      <path className="landing-target-bowl" d="M186 252.5 A175 175 0 1 0 454 252.5" stroke="var(--brand-blue)" strokeLinecap="round" strokeWidth="90" />
      <circle className="landing-target-pulse" cx="320" cy="320" r="60" stroke="var(--brand-rose)" strokeWidth="5" />
      <circle className="landing-target-dot" cx="320" cy="320" r="60" fill="var(--brand-rose)" />
    </svg>
  )
}

export function HeroSection({ className }: { className?: string }) {
  const { ref, visible } = useRevealOnScroll<HTMLElement>()

  return (
    <section
      ref={ref}
      className={cn('flex flex-col items-center pb-20 pt-10 text-center sm:pt-14 lg:pb-24', visible ? 'animate-rise' : 'opacity-0', className)}
    >
      <TargetArtwork className="h-auto w-[256px] sm:w-[340px]" />
      <div className="mt-8 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1">
        <span dir="rtl" lang="ar" className="font-brand text-[30px] font-bold leading-none text-ink sm:text-[34px]">نيشاني</span>
        <span dir="ltr" className="font-mono text-[13px] text-ink-2">/ni·shaa·ni/</span>
        <span className="font-serif text-[15px] italic text-ink-2 sm:text-[16px]">Egyptian Arabic — &ldquo;my target.&rdquo;</span>
      </div>
      <h1 className="mt-5 max-w-3xl text-balance font-serif text-[40px] font-semibold leading-[1.06] tracking-[-0.03em] text-ink sm:text-[60px]">
        Med school, right on target.
      </h1>
      <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-ink-2 sm:text-[16.5px]">
        Nishany is built around each university&rsquo;s own curriculum — clinical questions, OSCE stations, and a study engine that points at exactly what to learn next.
      </p>
      <Link to={TRIAL_PATH} className="group mt-8 inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-6 text-[15px] font-semibold text-on-primary shadow-action transition-colors hover:bg-primary-hover">
        Start 3 days free
        <Icon icon={ArrowRight} size={17} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
      </Link>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <p className="inline-flex items-center gap-2 text-[12.5px] font-medium text-ink-2">
          <Icon icon={Check} size={14} className="text-success" />
          Full access for 3 days. No card.
        </p>
        <LiveCount variant="chip" className="text-[12.5px] font-medium text-ink-2" />
      </div>
    </section>
  )
}
