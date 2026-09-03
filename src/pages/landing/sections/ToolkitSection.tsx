import { Volume2 } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useRevealOnScroll } from './shared'

export function ToolkitSection({ className }: { className?: string }) {
  const { ref, visible } = useRevealOnScroll<HTMLElement>()
  const pomodoroCircumference = 2 * Math.PI * 26

  return (
    <section ref={ref} className={cn('border-t border-line py-16 sm:py-20', visible ? 'animate-rise' : 'opacity-0', className)}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.09em] text-primary-strong"><span className="h-px w-6 bg-primary-strong" aria-hidden />06 · The study toolkit</p>
          <h2 className="mt-3 max-w-lg font-serif text-[28px] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[36px]">Everything a study session needs, <em className="font-serif italic text-primary-strong">built in</em>.</h2>
        </div>
        <ul className="space-y-4 self-center text-[14.5px] leading-relaxed text-ink-2">
          <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">A real notebook, plus notes on every question</strong> — searchable, organised, and shareable. Starred notes rise to the top and help the cohort.</span></li>
          <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">A whiteboard for your whole mind</strong> — wire ideas together the way medicine actually connects.</span></li>
          <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Pomodoro, focus sounds, and flashcards</strong> — no extra app, no tab-switching.</span></li>
        </ul>
      </div>

      <div className="mt-10 grid gap-4 rounded-2xl border border-line bg-surface-2/60 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
        <div className="rounded-xl border border-line bg-surface p-4 shadow-panel">
          <div className="flex items-center justify-between"><p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-ink-3">Notebook</p><span className="text-[10.5px] font-bold text-primary-strong">★ 24 stars</span></div>
          <p className="mt-2.5 text-[12.5px] font-semibold text-ink">Heart failure · compensation to treatment</p>
          <div className="mt-2.5 space-y-1"><div className="h-1.5 w-full rounded-full bg-line" /><div className="h-1.5 w-3/4 rounded-full bg-line" /></div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-primary-tint px-2.5 py-1 text-[10px] font-semibold text-primary-strong">Cardiovascular</span>
            <span className="rounded-full border border-line px-2.5 py-1 text-[10px] font-medium text-ink-2">Shared with cohort</span>
          </div>
        </div>

        <div className="rounded-xl border border-line bg-surface p-4 shadow-panel">
          <div className="flex items-center justify-between"><p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-ink-3">Whiteboard</p><span className="text-[9px] font-bold uppercase tracking-wide text-ink-3">Your whole mind</span></div>
          <div className="relative mt-3 h-24 rounded-lg border border-dashed border-line-2 bg-paper">
            <span className="absolute left-2 top-3 rounded-md bg-primary-tint px-2 py-1 text-[10px] font-semibold text-primary-strong">↓ Cardiac output</span>
            <span className="absolute right-2 top-2 rounded-md bg-success-tint px-2 py-1 text-[10px] font-semibold text-success">Four pillars</span>
            <span className="absolute bottom-3 left-6 rounded-md bg-warning-tint px-2 py-1 text-[10px] font-semibold text-warning">RAAS activation</span>
          </div>
        </div>

        <div className="rounded-xl border border-line bg-surface p-4 shadow-panel">
          <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-ink-3">Pomodoro</p>
          <div className="mt-3 flex justify-center">
            <svg viewBox="0 0 60 60" className="size-16 -rotate-90">
              <circle cx="30" cy="30" r="26" fill="none" stroke="var(--color-line)" strokeWidth="5" />
              <circle cx="30" cy="30" r="26" fill="none" stroke="var(--color-primary)" strokeWidth="5" strokeLinecap="round" strokeDasharray={`${0.42 * pomodoroCircumference} ${pomodoroCircumference}`} />
            </svg>
          </div>
          <p className="mt-1 text-center text-[15px] font-bold tabular-nums text-ink">25:00</p>
          <p className="mt-1 text-center text-[10.5px] font-medium text-ink-3">Focus block 3 of 4</p>
        </div>

        <div className="rounded-xl border border-line bg-surface p-4 shadow-panel">
          <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-ink-3">Focus sounds</p>
          <div className="mt-4 flex h-8 items-end justify-center gap-1">
            {[10, 20, 14, 26, 12, 22, 8].map((h, i) => <span key={i} className="w-1 rounded-full bg-primary" style={{ height: `${h}px` }} />)}
          </div>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-medium text-ink-2"><Icon icon={Volume2} size={13} />Soft rain · in flow</p>
        </div>
      </div>
      <p className="mt-4 text-center font-serif text-[12.5px] italic text-ink-3">Capture the insight the moment it lands — then stay in flow, no tab-switching.</p>
    </section>
  )
}
