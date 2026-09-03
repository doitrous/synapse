import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { NishanyMark } from '@/components/brand/Wordmark'
import { cn } from '@/lib/cn'
import { TRIAL_PATH, useRevealOnScroll } from './shared'

const REASONS = [
  { title: 'Because we were students', line: 'We price for students because we were students — a wide, complete platform without the wide price tag. Full access starts with three free days, no card required.' },
  { title: 'Scholarships, because we understand', line: 'Scholarships are available for colleagues who need them, under their terms and conditions. No one left behind.' },
  { title: 'Speak medicine on day one', line: 'A dedicated medical-terminology track gives first-year students the language of the field — before it’s assumed they already know it.' },
]

export function ClosingCtaSection({ className }: { className?: string }) {
  const { ref, visible } = useRevealOnScroll<HTMLElement>()

  return (
    <section ref={ref} className={cn('border-t border-line py-16 sm:py-20', visible ? 'animate-rise' : 'opacity-0', className)}>
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.09em] text-primary-strong">09 · Priced for students</p>
      <h2 className="mt-3 max-w-2xl font-serif text-[26px] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[32px]">The most affordable serious medical platform there is.</h2>

      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        {REASONS.map((reason) => (
          <div key={reason.title}>
            <h3 className="font-serif text-[16px] font-semibold text-ink">{reason.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-2">{reason.line}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 flex flex-col items-center border-t border-line pt-14 text-center">
        <NishanyMark size={44} />
        <h2 className="mt-6 font-serif text-[32px] font-semibold tracking-[-0.02em] text-ink sm:text-[42px]">Start your first 3 days.</h2>
        <p className="mt-3 text-[14.5px] text-ink-2">Full access from the first minute. No card.</p>
        <Link to={TRIAL_PATH} className="group mt-7 inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-6 text-[15px] font-semibold text-on-primary shadow-action transition-colors hover:bg-primary-hover">
          Start 3 days free
          <Icon icon={ArrowRight} size={17} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
        </Link>
      </div>
    </section>
  )
}
