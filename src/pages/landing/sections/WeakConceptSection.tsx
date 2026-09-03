import { ArrowRight, RefreshCcw, X } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useRevealOnScroll } from './shared'

export function WeakConceptSection({ className }: { className?: string }) {
  const { ref, visible } = useRevealOnScroll<HTMLElement>()

  return (
    <section ref={ref} className={cn('border-t border-line py-16 sm:py-20', visible ? 'animate-rise' : 'opacity-0', className)}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.09em] text-primary-strong"><span className="h-px w-6 bg-primary-strong" aria-hidden />03 · Our signature feature</p>
          <h2 className="mt-3 max-w-lg font-serif text-[28px] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[36px]">Never let a weak concept <em className="font-serif italic text-primary-strong">survive</em>.</h2>
        </div>
        <ul className="space-y-4 self-center text-[14.5px] leading-relaxed text-ink-2">
          <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Re-solve every question you got wrong, flagged, or skipped</strong> — collected automatically from every test you sit.</span></li>
          <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">And not just the questions — the whole scope around them.</strong> One wrong answer exposes a concept; Nishany drills the entire concept until it holds.</span></li>
          <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">One-of-a-kind, and brandable:</strong> we understand what you don&rsquo;t know better than you do.</span></li>
        </ul>
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-surface-2/60 p-4 sm:p-5">
        <div className="grid items-center gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <div className="rounded-xl border border-line bg-surface p-4 shadow-panel">
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-ink-3">Step 1 · You miss a question</p>
              <span className="shrink-0 rounded-md bg-primary-tint px-2 py-0.5 text-[9.5px] font-bold text-primary-strong">CVS · Heart failure</span>
            </div>
            <p className="mt-2.5 text-[13px] font-semibold text-ink">Which drug class relieves congestive symptoms but has no proven mortality benefit in HFrEF?</p>
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center justify-between gap-2 rounded-lg border border-primary-line bg-primary-tint px-3 py-2">
                <span className="flex items-center gap-2 text-[12.5px] font-medium text-ink"><span className="grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-on-primary">B</span>ARNI</span>
                <span className="flex items-center gap-1 text-[10.5px] font-semibold text-primary-strong"><Icon icon={X} size={11} />your answer</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-success/25 bg-success-tint px-3 py-2">
                <span className="grid size-5 place-items-center rounded-full bg-success text-[10px] font-bold text-on-primary">A</span>
                <span className="text-[12.5px] font-medium text-ink">Loop diuretics</span>
              </div>
            </div>
          </div>

          <Icon icon={ArrowRight} size={20} className="mx-auto hidden text-ink-3 lg:block rtl:-scale-x-100" />

          <div className="rounded-xl border border-line bg-surface p-4 shadow-panel">
            <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-ink-3">Step 2 · The concept it exposes</p>
            <p className="mt-2.5 font-serif text-[15px] font-semibold text-primary-strong">Symptom relief vs. mortality benefit</p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-ink-2">One wrong answer rarely means one missing fact. Nishany maps it to the concept underneath.</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['Diuretics', 'Four pillars', 'HFrEF'].map((chip) => (
                <span key={chip} className="rounded-full bg-primary-tint px-2.5 py-1 text-[10.5px] font-semibold text-primary-strong">{chip}</span>
              ))}
            </div>
          </div>

          <Icon icon={ArrowRight} size={20} className="mx-auto hidden text-ink-3 lg:block rtl:-scale-x-100" />

          <div className="rounded-xl border border-line bg-surface p-4 shadow-panel">
            <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-ink-3">Step 3 · Drill the whole scope</p>
            <p className="mt-2.5 text-[13px] leading-relaxed text-ink"><strong className="font-semibold">12 questions</strong> across the full concept — not just the one you missed.</p>
            <button type="button" className="mt-4 inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-[12.5px] font-semibold text-on-primary shadow-action">
              <Icon icon={RefreshCcw} size={13} />Test this scope
            </button>
          </div>
        </div>
        <p className="mt-4 text-center font-serif text-[12.5px] italic text-ink-3">Wrong, flagged, and omitted questions wait in one place — each with its full concept scope one tap away.</p>
      </div>
    </section>
  )
}
