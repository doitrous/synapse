import { Flame } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useRevealOnScroll } from './shared'

const LEADERBOARD = [
  { rank: 1, name: 'Falcon-42', pct: 94, you: false },
  { rank: 2, name: 'Ibis-17', pct: 92, you: false },
  { rank: 7, name: 'You · visible only to you', pct: 87, you: true },
  { rank: 8, name: 'Oryx-88', pct: 86, you: false },
]

export function CohortSection({ className }: { className?: string }) {
  const { ref, visible } = useRevealOnScroll<HTMLElement>()

  return (
    <section ref={ref} className={cn('border-t border-line py-16 sm:py-20', visible ? 'animate-rise' : 'opacity-0', className)}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.09em] text-primary-strong"><span className="h-px w-6 bg-primary-strong" aria-hidden />05 · The cohort, without the exposure</p>
          <h2 className="mt-3 max-w-lg font-serif text-[28px] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[36px]">Compare yourself — <em className="font-serif italic text-primary-strong">anonymously</em>.</h2>
        </div>
        <ul className="space-y-4 self-center text-[14.5px] leading-relaxed text-ink-2">
          <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">See where you stand against your whole cohort</strong> — percentile standing, top performers, accuracy across the year.</span></li>
          <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Question of the Day:</strong> one shared question, a daily streak, and a friendly cohort race that keeps everyone consistent.</span></li>
          <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Your anonymity is sacred.</strong> You are invisible until you decide otherwise — you appear to colleagues only after you opt in.</span></li>
        </ul>
      </div>

      <div className="mt-10 grid gap-4 rounded-2xl border border-line bg-surface-2/60 p-4 sm:p-5 lg:grid-cols-3">
        <div className="rounded-xl border border-line bg-surface p-4 shadow-panel">
          <div className="flex items-center justify-between"><p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-ink-3">Cohort leaderboard · Year 1</p><span className="text-[9.5px] font-semibold text-ink-3">312 students</span></div>
          <ul className="mt-3 space-y-1">
            {LEADERBOARD.map((row) => (
              <li key={row.rank} className={cn('flex items-center gap-2.5 rounded-lg px-2 py-1.5', row.you && 'border border-primary-line bg-primary-tint')}>
                <span className="w-4 shrink-0 text-[11px] font-semibold text-ink-3">{row.rank}</span>
                <span className={cn('grid size-6 shrink-0 place-items-center rounded-full text-[10px] font-bold text-on-primary', row.you ? 'bg-primary' : 'bg-accent')}>{row.name[0]}</span>
                <span className={cn('flex-1 truncate text-[12px] font-medium', row.you ? 'text-primary-strong' : 'text-ink')}>{row.name}</span>
                <span className="text-[12px] font-bold text-ink">{row.pct}%</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-line bg-surface p-4 shadow-panel">
          <div className="flex items-center justify-between"><p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-ink-3">Question of the Day</p><span className="rounded-md bg-primary-tint px-1.5 py-0.5 text-[9px] font-bold text-primary-strong">Cohort race</span></div>
          <div className="mt-3 flex gap-1">
            {['S', 'M', 'T', 'W', 'T'].map((d, i) => <span key={i} className="grid size-6 place-items-center rounded-md bg-primary text-[9.5px] font-bold text-on-primary">{d}</span>)}
            {['F', 'S'].map((d, i) => <span key={i} className="grid size-6 place-items-center rounded-md bg-inset text-[9.5px] font-bold text-ink-3">{d}</span>)}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Icon icon={Flame} size={22} className="text-primary" />
            <p className="text-[24px] font-bold leading-none text-ink">12<span className="ms-1 text-[11px] font-medium text-ink-2">day streak</span></p>
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-ink-3">One shared question, the whole cohort, every day.</p>
        </div>

        <div className="rounded-xl border border-line bg-surface p-4 shadow-panel">
          <div className="flex items-center justify-between"><p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-ink-3">Privacy</p><span className="rounded-md bg-success-tint px-1.5 py-0.5 text-[9px] font-bold text-success">Default: private</span></div>
          <div className="mt-3 space-y-2.5">
            {['Appear on cohort leaderboard', 'Share progress with friends'].map((label) => (
              <div key={label} className="flex items-center justify-between gap-2">
                <span className="text-[11.5px] font-medium text-ink-2">{label}</span>
                <span className="inline-flex h-5 w-9 items-center rounded-full bg-inset p-0.5"><span className="size-4 rounded-full bg-surface shadow-control" /></span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[10.5px] leading-relaxed text-ink-3">Compete on merit; reveal nothing you don&rsquo;t choose. Privacy is not a buried setting — it is a promise we lead with.</p>
        </div>
      </div>
      <p className="mt-4 text-center font-serif text-[12.5px] italic text-ink-3">The whole cohort race — with every student invisible until they opt in.</p>
    </section>
  )
}
