import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AlarmClock, ArrowRight, BatteryFull, Check, DoorOpen, Mic, Volume2, Wifi } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { TRIAL_PATH, useRevealOnScroll } from './shared'

/**
 * "See it in action" — one showcase of the real student surfaces, framed on the
 * three devices a student actually uses. The screens are faithful, hand-built
 * mockups of the current product (the "today's target" dashboard, the bank-first
 * question runner, and a study room), drawn with the same design tokens as the
 * app so they read as the real UI. Laptop = dashboard, iPad = question bank,
 * phone = study rooms. A single CTA closes the section.
 */

/* ------------------------------------------------------------------ device frames */

function LaptopFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('w-full max-w-[560px]', className)}>
      <div className="rounded-t-[14px] border-[7px] border-b-0 border-[#2b2f38] bg-[#2b2f38] shadow-pop">
        <div className="aspect-[16/10] overflow-hidden rounded-[5px] bg-paper">{children}</div>
      </div>
      {/* base / hinge */}
      <div className="relative mx-auto h-[10px] w-[112%] -translate-x-[5.35%] rounded-b-[10px] bg-[#2b2f38]">
        <div className="absolute left-1/2 top-0 h-[3px] w-16 -translate-x-1/2 rounded-b-full bg-black/25" />
      </div>
    </div>
  )
}

function TabletFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('w-[220px] shrink-0', className)}>
      <div className="rounded-[20px] border-[7px] border-[#2b2f38] bg-[#2b2f38] shadow-pop">
        <div className="aspect-[3/4] overflow-hidden rounded-[10px] bg-paper">{children}</div>
      </div>
    </div>
  )
}

function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('w-[178px] shrink-0', className)}>
      <div className="relative rounded-[26px] border-[8px] border-[#2b2f38] bg-[#2b2f38] shadow-pop">
        {/* dynamic island */}
        <div className="absolute left-1/2 top-[7px] z-10 h-[15px] w-[52px] -translate-x-1/2 rounded-full bg-[#2b2f38]" />
        <div className="aspect-[9/19] overflow-hidden rounded-[18px] bg-paper">
          <div className="flex h-full flex-col">
            {/* status bar — keeps content clear of the dynamic island */}
            <div className="flex h-[24px] shrink-0 items-center justify-between px-4 pt-[3px] text-[8px] font-semibold text-ink">
              <span className="tnum">9:41</span>
              <span className="flex items-center gap-1 text-ink-2"><Icon icon={Wifi} size={8} /><Icon icon={BatteryFull} size={11} /></span>
            </div>
            <div className="min-h-0 flex-1">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ shared bits */

function BrandDot() {
  return (
    <svg viewBox="0 0 100 100" className="size-4" fill="none" aria-hidden="true">
      <circle cx="50" cy="50" r="34" stroke="var(--brand-rose)" strokeWidth="9" strokeLinecap="round" strokeDasharray="163 51" />
      <circle cx="72" cy="28" r="6" fill="var(--brand-endorse)" />
    </svg>
  )
}

const HEAT = [1, 0, 2, 3, 1, 4, 5, 2, 0, 3, 4, 2, 5, 1, 3, 0, 2, 4, 1, 3, 5, 2, 4, 0, 3, 1, 2, 5, 4, 3, 1, 0, 2, 4, 5, 3, 2, 1, 4, 0, 3, 5, 2, 1, 4, 3, 0, 2, 5, 3, 1, 4, 2, 0]

/* ------------------------------------------------------------------ 1 · dashboard (laptop) */

function DashboardScreen() {
  return (
    <div dir="ltr" className="grid h-full grid-rows-[auto_1fr] text-start">
      {/* top bar */}
      <div className="flex items-center justify-between border-b border-line bg-surface px-3 py-2">
        <div className="flex items-center gap-1.5"><BrandDot /><span className="font-brand text-[11px] font-bold text-ink">nishany</span></div>
        <div className="flex items-center gap-2">
          <span className="hidden text-[8.5px] font-medium text-ink-3 sm:inline">Today</span>
          <span className="hidden text-[8.5px] font-medium text-ink-3 sm:inline">Question Bank</span>
          <span className="hidden text-[8.5px] font-medium text-ink-3 sm:inline">Library</span>
          <span className="size-5 rounded-full bg-primary-tint ring-1 ring-primary-line" />
        </div>
      </div>

      <div className="min-h-0 space-y-2 overflow-hidden bg-paper p-3">
        {/* greeting */}
        <div>
          <p className="font-serif text-[15px] font-semibold leading-none text-ink">Good morning, Omar</p>
          <p className="mt-1 text-[8px] text-ink-3">Tuesday, 12 May · Year 3</p>
        </div>

        {/* exam countdown hero */}
        <div className="flex items-center gap-3 rounded-lg border border-line bg-surface p-2.5 shadow-panel">
          <div className="flex flex-col items-center">
            <div className="flex items-end gap-[2px]" aria-hidden>
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i} className={cn('w-[2px] rounded-full', i < 11 ? 'bg-primary' : 'bg-inset', i % 5 === 0 ? 'h-4' : 'h-2.5')} />
              ))}
            </div>
            <p className="mt-1 font-mono text-[20px] font-bold leading-none text-ink tnum">18</p>
            <p className="text-[7px] text-ink-3">days left</p>
          </div>
          <div className="min-w-0 flex-1">
            <span className="inline-flex items-center gap-1 rounded-full border border-primary-line bg-primary-tint px-1.5 py-[2px] text-[7.5px] font-semibold text-primary-strong"><Icon icon={AlarmClock} size={8} />Your next step</span>
            <p className="mt-1 font-serif text-[12px] font-semibold text-ink">Question block</p>
            <p className="text-[8px] text-ink-3">Cardiovascular paper · 40 questions · 50 min</p>
            <span className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-[8px] font-semibold text-on-primary shadow-action">Start now<Icon icon={ArrowRight} size={8} /></span>
          </div>
        </div>

        {/* ring stack + rhythm */}
        <div className="grid grid-cols-[auto_1fr] gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-line bg-surface p-2 shadow-panel">
            <svg viewBox="0 0 74 74" className="size-[52px]" fill="none" aria-hidden="true">
              <circle cx="37" cy="37" r="30" stroke="var(--color-inset)" strokeWidth="5" />
              <circle cx="37" cy="37" r="30" stroke="var(--color-accent)" strokeWidth="5" strokeLinecap="round" strokeDasharray="188.5" strokeDashoffset="71" transform="rotate(-90 37 37)" />
              <circle cx="37" cy="37" r="21" stroke="var(--color-inset)" strokeWidth="5" />
              <circle cx="37" cy="37" r="21" stroke="var(--color-accent-soft)" strokeWidth="5" strokeLinecap="round" strokeDasharray="131.9" strokeDashoffset="72.5" transform="rotate(-90 37 37)" />
              <circle cx="37" cy="37" r="12" stroke="var(--color-inset)" strokeWidth="5" />
              <circle cx="37" cy="37" r="12" stroke="var(--color-primary)" strokeWidth="5" strokeLinecap="round" strokeDasharray="75.4" strokeDashoffset="52.8" transform="rotate(-90 37 37)" />
            </svg>
            <div className="space-y-[3px]">
              {[['Question bank', '62%', 'var(--color-accent)'], ['Practical', '45%', 'var(--color-accent-soft)'], ['Essay', '30%', 'var(--color-primary)']].map(([label, pct, c]) => (
                <div key={label} className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full" style={{ background: c }} />
                  <span className="text-[8px] font-medium text-ink">{label}</span>
                  <span className="font-mono text-[8px] font-semibold text-ink-2 tnum">{pct}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-line bg-surface p-2 shadow-panel">
            <div className="flex items-center justify-between">
              <p className="text-[8.5px] font-bold text-ink">Study rhythm</p>
              <span className="rounded-full border border-primary-line bg-primary-tint px-1.5 py-[1px] text-[7px] font-semibold text-primary-strong">312 answered</span>
            </div>
            <div className="mt-1.5 grid grid-flow-col grid-rows-6 gap-[2px]" aria-hidden>
              {HEAT.slice(0, 54).map((v, i) => (
                <span key={i} className="size-[5px] rounded-[1px]" style={{ background: `var(--color-scale-${v})` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ 2 · question bank (tablet) */

function QuestionScreen() {
  const options = [
    ['A', 'Thiazide diuretic', false, false],
    ['B', 'Loop diuretic', true, false],
    ['C', 'ACE inhibitor', false, true],
    ['D', 'Beta-blocker', false, false],
  ] as const
  return (
    <div dir="ltr" className="grid h-full grid-rows-[auto_1fr] text-start">
      <div className="flex items-center justify-between border-b border-line bg-surface px-3 py-2">
        <div className="flex items-center gap-1.5"><BrandDot /><span className="text-[9px] font-bold text-ink">Question Bank</span></div>
        <span className="inline-flex items-center gap-1 rounded-lg border border-line bg-surface px-1.5 py-1 font-mono text-[9px] font-semibold text-ink shadow-panel tnum">12:04</span>
      </div>

      <div className="min-h-0 overflow-hidden bg-paper p-3">
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-inset"><div className="h-full w-[45%] rounded-full bg-primary" /></div>
        <div className="mt-2.5 rounded-lg border border-line bg-surface p-2.5 shadow-panel">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-[8px] font-bold text-ink"><span className="size-1.5 rounded-full bg-accent" />Cardiology <span className="font-normal text-ink-3">· Heart failure</span></span>
            <span className="rounded-full border border-danger/25 bg-danger-tint px-1.5 py-[1px] text-[7px] font-bold text-danger">Hard</span>
          </div>
          <p className="mt-2 text-[9px] font-semibold leading-snug text-ink">A 64-year-old with HFrEF has worsening ankle oedema. Which drug best relieves his congestion?</p>
          <div className="mt-2 space-y-1.5">
            {options.map(([letter, label, correct, chosenWrong]) => (
              <div key={letter} className={cn('flex items-center gap-2 rounded-md border p-1.5', correct ? 'border-success bg-success-tint' : chosenWrong ? 'border-danger bg-danger-tint' : 'border-line bg-surface opacity-80')}>
                <span className={cn('grid size-4 shrink-0 place-items-center rounded-full border font-mono text-[7.5px] font-bold', correct ? 'border-success bg-success text-white' : chosenWrong ? 'border-danger bg-danger text-white' : 'border-line text-ink-2')}>
                  {correct ? <Icon icon={Check} size={8} /> : letter}
                </span>
                <span className={cn('text-[8.5px]', correct ? 'font-semibold text-ink' : 'text-ink-2')}>{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 rounded-md border border-success/20 bg-success-tint/50 p-1.5">
            <p className="text-[7px] leading-relaxed text-ink-2"><span className="font-semibold text-success">Correct — loop diuretic.</span> It gives the greatest, fastest reduction in preload for symptomatic congestion.</p>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[8px] font-semibold text-ink-3">Previous</span>
          <span className="inline-flex items-center gap-1 rounded-md bg-primary px-2.5 py-1 text-[8.5px] font-semibold text-on-primary shadow-action">Next<Icon icon={ArrowRight} size={9} /></span>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ 3 · study rooms (phone) */

function RoomsScreen() {
  // 4 columns × 5 rows of desks; a couple speaking, one is "you".
  const speaking = new Set([2, 9])
  const you = 6
  const filled = 12
  return (
    <div dir="ltr" className="grid h-full grid-rows-[auto_1fr] text-start">
      <div className="flex items-center justify-between border-b border-line bg-surface px-3 py-2">
        <span className="font-serif text-[11px] font-semibold text-ink">Study Rooms</span>
        <span className="rounded-lg border border-line bg-surface-2 px-1.5 py-1 font-mono text-[8px] font-semibold tracking-[0.14em] text-ink">KTP0R2</span>
      </div>
      <div className="min-h-0 overflow-hidden bg-paper p-2.5">
        <div className="flex items-center justify-between">
          <p className="text-[9px] font-semibold text-ink">Cardiology evening sprint</p>
          <span className="flex items-center gap-1 text-[7.5px] font-medium text-accent-strong"><Icon icon={Volume2} size={9} />2 speaking</span>
        </div>
        <div className="mt-1 flex items-center justify-between text-[7.5px] text-ink-3">
          <span>Occupancy</span><span className="font-mono text-ink-2 tnum">{filled} / 20</span>
        </div>
        <div className="mt-1 h-[3px] w-full overflow-hidden rounded-full bg-inset"><div className="h-full rounded-full bg-primary" style={{ width: `${(filled / 20) * 100}%` }} /></div>

        {/* the mist floor */}
        <div className="mt-2 rounded-xl border border-mist-line bg-mist p-2">
          <div className="grid grid-cols-4 gap-1.5">
            {Array.from({ length: 20 }).map((_, i) => {
              const seated = i < filled
              const isYou = i === you
              const isSpeaking = speaking.has(i)
              return (
                <div
                  key={i}
                  className={cn(
                    'flex aspect-square items-center justify-center rounded-md border text-[6px] font-semibold',
                    !seated && 'border-dashed border-mist-line/70 bg-transparent text-transparent',
                    seated && isYou && 'border-primary-line bg-surface text-primary-strong',
                    seated && !isYou && 'border-mist-line bg-surface text-ink-3',
                    isSpeaking && 'ring-2 ring-accent/40',
                  )}
                >
                  {seated && (isYou ? 'You' : <Icon icon={isSpeaking ? Volume2 : Mic} size={7} className={isSpeaking ? 'text-accent-strong' : 'text-ink-3'} />)}
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-2 flex items-center gap-1.5">
          <span className="inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-primary px-2 py-1.5 text-[8px] font-semibold text-on-primary shadow-action"><Icon icon={DoorOpen} size={9} />Enter</span>
          <span className="inline-flex items-center justify-center rounded-md border border-line-2 bg-surface px-2 py-1.5 text-[8px] font-semibold text-ink shadow-control"><Icon icon={Mic} size={9} /></span>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ section */

/**
 * Section copy, per language. The device screens themselves stay in English
 * (dir="ltr") — they mirror the real app UI — but the section's own words
 * follow the page. Arabic drops the italic (Arabic type does not slant well).
 */
const COPY = {
  en: {
    eyebrow: 'Yours on every screen',
    headPre: 'Everything you study, on ',
    headEmph: 'every screen',
    headPost: '.',
    body: 'One study engine that follows you — your dashboard, your question bank, and your study rooms, whether you open it on a laptop between lectures, an iPad in the library, or your phone on the bus.',
    capRooms: 'Study rooms · iPad',
    capDash: 'Today’s dashboard · desktop',
    capQuestions: 'Question bank · iPhone',
    cta: 'Start 3 days free',
    ctaNote: 'Full access for 3 days. No card.',
  },
  ar: {
    eyebrow: 'معك على كل شاشة',
    headPre: 'كل مذاكرتك، على ',
    headEmph: 'كل شاشة',
    headPost: '.',
    body: 'محرك مذاكرة واحد يرافقك — لوحتك، وبنك أسئلتك، وغرف مذاكرتك، سواء فتحته على حاسوبك بين المحاضرات، أو على آيباد في المكتبة، أو على هاتفك في الطريق.',
    capRooms: 'غرف المذاكرة · آيباد',
    capDash: 'لوحة اليوم · سطح المكتب',
    capQuestions: 'بنك الأسئلة · آيفون',
    cta: 'ابدأ ٣ أيام مجانًا',
    ctaNote: 'وصول كامل لمدة ٣ أيام. بدون بطاقة.',
  },
} as const

export function ShowcaseSection({ className, lang = 'en' }: { className?: string; lang?: 'en' | 'ar' }) {
  const { ref, visible } = useRevealOnScroll<HTMLElement>()
  const t = COPY[lang]
  const emClass = lang === 'ar' ? 'font-serif font-semibold text-primary-strong' : 'font-serif italic text-primary-strong'

  return (
    <section ref={ref} className={cn('border-t border-line py-16 sm:py-20', visible ? 'animate-rise' : 'opacity-0', className)}>
      <div className="mx-auto max-w-2xl text-center">
        <p className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.09em] text-primary-strong">
          <span className="h-px w-6 bg-primary-strong" aria-hidden />{t.eyebrow}
        </p>
        <h2 className="mt-3 text-balance font-serif text-[28px] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[38px]">
          {t.headPre}<em className={emClass}>{t.headEmph}</em>{t.headPost}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-ink-2">{t.body}</p>
      </div>

      {/* device cluster: stacks on mobile, lines up on desktop */}
      <div className="mt-12 flex flex-col items-center gap-8 sm:mt-14 lg:flex-row lg:items-end lg:justify-center lg:gap-4">
        <figure className="order-2 lg:order-1 lg:mb-8">
          <TabletFrame><RoomsScreen /></TabletFrame>
          <figcaption className="mt-3 text-center text-[12px] font-medium text-ink-3">{t.capRooms}</figcaption>
        </figure>

        <figure className="order-1 w-full max-w-[560px] lg:order-2">
          <LaptopFrame><DashboardScreen /></LaptopFrame>
          <figcaption className="mt-4 text-center text-[12px] font-medium text-ink-3">{t.capDash}</figcaption>
        </figure>

        <figure className="order-3 lg:mb-6">
          <PhoneFrame><QuestionScreen /></PhoneFrame>
          <figcaption className="mt-3 text-center text-[12px] font-medium text-ink-3">{t.capQuestions}</figcaption>
        </figure>
      </div>

      <div className="mt-12 flex flex-col items-center gap-3">
        <Link to={TRIAL_PATH} className="group inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-6 text-[15px] font-semibold text-on-primary shadow-action transition-colors hover:bg-primary-hover">
          {t.cta}
          <Icon icon={ArrowRight} size={17} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
        </Link>
        <p className="text-[12.5px] font-medium text-ink-3">{t.ctaNote}</p>
      </div>
    </section>
  )
}
