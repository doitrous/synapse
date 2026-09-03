import { ArrowLeftRight, Flag, Grid3x3, Link2, ListOrdered, Play, Search } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useRevealOnScroll } from './shared'

const MINIGAMES = [
  { icon: Grid3x3, name: 'Term Grid', line: 'Glossary crossword' },
  { icon: Search, name: 'Spotter', line: 'Histology, timed' },
  { icon: ArrowLeftRight, name: 'Term Match', line: 'Terms ↔ meanings' },
  { icon: ListOrdered, name: 'Clinical Sequence', line: 'Order the steps' },
  { icon: Link2, name: 'Mechanism Chain', line: 'Cause → effect' },
  { icon: Flag, name: 'Red Flag Sort', line: 'Triage the findings' },
]

export function StudyTogetherSection({ className }: { className?: string }) {
  const { ref, visible } = useRevealOnScroll<HTMLElement>()

  return (
    <section ref={ref} className={cn('border-t border-line py-16 sm:py-20', visible ? 'animate-rise' : 'opacity-0', className)}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.09em] text-primary-strong"><span className="h-px w-6 bg-primary-strong" aria-hidden />08 · Study together</p>
          <h2 className="mt-3 max-w-lg font-serif text-[28px] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[36px]">Momentum you can <em className="font-serif italic text-primary-strong">share</em>.</h2>
        </div>
        <ul className="space-y-4 self-center text-[14.5px] leading-relaxed text-ink-2">
          <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Study parties for a module, a term, or a whole year</strong> — sit practice tests together, play head to head, follow a schedule you plan as a group.</span></li>
          <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">The hardest part of studying is showing up</strong> — a party makes sure everyone does.</span></li>
          <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Minigames turn revision into a game</strong> — solo or with friends.</span></li>
        </ul>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-line bg-surface p-5 shadow-panel">
          <div className="flex items-center justify-between"><p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-ink-3">Study party · Cardiology evening sprint</p><span className="rounded-md bg-success-tint px-1.5 py-0.5 text-[9px] font-bold text-success">Live</span></div>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {['M', 'S', 'N', 'A'].map((initial) => <span key={initial} className="grid size-7 place-items-center rounded-full border-2 border-surface bg-accent text-[10px] font-bold text-on-primary">{initial}</span>)}
            </div>
            <p className="flex-1 text-[11.5px] text-ink-2">4 colleagues in the room · same questions, same clock</p>
            <span className="shrink-0 rounded-md bg-primary-tint px-2 py-1 font-mono text-[10.5px] font-bold text-primary-strong">K7PQR2</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5 text-[10.5px] font-medium text-ink-2">
            <span className="rounded-full border border-line px-2.5 py-1">Tonight · 10 questions</span>
            <span className="rounded-full border border-line px-2.5 py-1">Timed · pace recorded</span>
            <span className="rounded-full border border-line px-2.5 py-1">Party schedule · week 4</span>
          </div>
          <button type="button" className="mt-4 inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-[12.5px] font-semibold text-on-primary shadow-action">
            <Icon icon={Play} size={12} />Start together
          </button>
        </div>

        <div className="rounded-xl border border-line bg-surface p-5 shadow-panel">
          <div className="flex items-center justify-between"><p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-ink-3">Minigames</p><span className="text-[9.5px] font-semibold text-ink-3">Solo or head to head</span></div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {MINIGAMES.map((game) => (
              <div key={game.name} className="flex items-center gap-2 rounded-lg border border-line px-2.5 py-2">
                <span className="grid size-7 shrink-0 place-items-center rounded-md bg-primary-tint text-primary-strong"><Icon icon={game.icon} size={14} /></span>
                <div className="min-w-0"><p className="truncate text-[11.5px] font-semibold text-ink">{game.name}</p><p className="truncate text-[10px] text-ink-3">{game.line}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 text-center font-serif text-[12.5px] italic text-ink-3">A shared room, one join code — and revision that feels like a game night.</p>
    </section>
  )
}
