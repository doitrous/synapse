import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  AlarmClock, ArrowLeft, ArrowRight, BatteryFull, BookOpen, CalendarDays, CalendarRange,
  Check, Copy, FileQuestion, Gamepad2, Hash, Layers, LayoutDashboard, Mic, Radar,
  Target, Users, Volume2, Wifi, X, type LucideIcon,
} from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { TRIAL_PATH, useRevealOnScroll } from './shared'

/**
 * "See it in action" — one showcase of the real student surfaces, framed on the
 * three devices a student actually uses. The screens are faithful, hand-built
 * mockups of the current product (the "today's target" dashboard, the bank-first
 * question runner, and a study room), drawn with the same design tokens as the
 * app so they read as the real UI. Laptop = the dashboard (sidebar, "today's
 * target" hero, progress rings), iPad = a study room, phone = the question
 * runner. A single CTA closes the section.
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

/** One sidebar nav row — active row carries the app's crimson `nav-selected` look. */
function NavRow({ icon, label, active }: { icon: LucideIcon; label: string; active?: boolean }) {
  return (
    <div className={cn('flex items-center gap-1.5 rounded px-1.5 py-[3px] text-[7.5px] font-medium', active ? 'bg-primary-tint text-primary-strong' : 'text-ink-2')}>
      <Icon icon={icon} size={10} className={active ? 'text-primary' : 'text-ink-3'} />
      <span className="truncate">{label}</span>
    </div>
  )
}

/** The dashboard's concentric progress rings (bank / practical / essay). */
function RingStackMini() {
  const rings: [number, string, number][] = [
    [62, 'var(--color-accent)', 0.62],
    [47, 'var(--color-accent-soft)', 0.45],
    [32, 'var(--color-primary)', 0.30],
  ]
  return (
    <svg viewBox="0 0 148 148" className="size-[62px] shrink-0" fill="none" aria-hidden="true" style={{ transform: 'rotate(-90deg)' }}>
      <circle cx="74" cy="74" r="20" stroke="var(--color-grid-major)" strokeWidth="1" />
      {rings.map(([r, c, pct]) => {
        const circ = 2 * Math.PI * r
        return (
          <g key={r}>
            <circle cx="74" cy="74" r={r} stroke="var(--color-inset)" strokeWidth="9" />
            <circle cx="74" cy="74" r={r} stroke={c} strokeWidth="9" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)} />
          </g>
        )
      })}
    </svg>
  )
}

/* ------------------------------------------------------------------ 1 · dashboard (laptop) */

const NAV_GROUPS: { label?: string; items: [LucideIcon, string][] }[] = [
  { items: [[LayoutDashboard, 'Dashboard']] },
  { label: 'Study', items: [[CalendarRange, 'Plan'], [BookOpen, 'Learn']] },
  { label: 'Test yourself', items: [[Target, 'Practice'], [Radar, 'Adaptive Study'], [Layers, 'Revise']] },
  { label: 'Together', items: [[Gamepad2, 'Minigames'], [Users, 'Study Rooms']] },
]

function DashboardScreen() {
  return (
    <div dir="ltr" className="flex h-full bg-paper text-start">
      {/* sidebar — the real student nav */}
      <aside className="flex w-[104px] shrink-0 flex-col border-e border-line bg-surface">
        <div className="flex h-7 shrink-0 items-center gap-1 border-b border-line px-2"><BrandDot /><span className="font-brand text-[9px] font-bold text-ink">nishany</span></div>
        <div className="min-h-0 flex-1 space-y-[2px] overflow-hidden px-1.5 py-1.5">
          {NAV_GROUPS.map((group, gi) => (
            <div key={group.label ?? gi} className={cn(gi > 0 && 'pt-0.5')}>
              {group.label && <p className="px-1.5 pb-[1px] pt-0.5 text-[6px] font-bold uppercase tracking-[0.08em] text-ink-3">{group.label}</p>}
              {group.items.map(([icon, label]) => <NavRow key={label} icon={icon} label={label} active={label === 'Dashboard'} />)}
            </div>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-1.5 border-t border-line px-2 py-1.5">
          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary-tint text-[7px] font-bold text-primary-strong">O</span>
          <div className="min-w-0"><p className="truncate text-[7.5px] font-medium text-ink">Omar Elbasat</p><p className="truncate text-[6.5px] text-ink-3">KAU · Year 3</p></div>
        </div>
      </aside>

      {/* main dashboard column */}
      <div className="min-w-0 flex-1 space-y-2 overflow-hidden p-2.5">
        {/* today's target — greeting + facts */}
        <div className="flex items-center justify-between gap-2 rounded-xl border border-line bg-surface px-2.5 py-2 shadow-pop">
          <div className="min-w-0">
            <p className="font-serif text-[13px] font-semibold leading-none text-ink">Good morning, Omar</p>
            <p className="mt-1 flex items-center gap-1 text-[7px] text-ink-3"><Icon icon={CalendarDays} size={7} />Wednesday, 7 May · Year 3</p>
          </div>
          <div className="flex shrink-0 items-stretch">
            <div className="border-e border-line px-2.5 text-center">
              <p className="font-mono text-[13px] font-semibold leading-none text-primary-strong tnum">12<span className="text-[7px] font-medium text-ink-3"> days</span></p>
              <p className="mt-1 text-[6.5px] text-ink-3">Streak</p>
            </div>
            <div className="px-2.5 text-center">
              <p className="font-mono text-[13px] font-semibold leading-none text-warning tnum">3</p>
              <p className="mt-1 text-[6.5px] text-ink-3">Reviews due</p>
            </div>
          </div>
        </div>

        {/* the hero: exam countdown + next step */}
        <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-2.5 shadow-pop">
          <div className="flex shrink-0 flex-col items-center gap-1">
            <div className="flex items-end gap-[1.5px]" aria-hidden>
              {Array.from({ length: 20 }).map((_, i) => (
                <span key={i} className={cn('w-[1.5px] rounded-full', i < 13 ? 'bg-primary' : 'bg-inset', i % 5 === 0 ? 'h-3.5' : 'h-2.5')} />
              ))}
            </div>
            <p className="font-mono text-[24px] font-bold leading-none tracking-tight text-ink tnum">18</p>
            <p className="text-[6.5px] font-medium text-ink-3">days left</p>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <span className="inline-flex items-center gap-1 rounded-full border border-primary-line bg-primary-tint px-1.5 py-[1.5px] text-[7px] font-semibold text-primary-strong"><Icon icon={AlarmClock} size={8} />Your next step</span>
              <span className="rounded-full border border-primary-line bg-primary-tint px-1.5 py-[1px] text-[6.5px] font-semibold text-primary-strong">Final</span>
            </div>
            <p className="mt-1 font-serif text-[13px] font-semibold leading-tight text-ink">Question block</p>
            <p className="text-[7.5px] text-ink-3">Cardiovascular paper</p>
            <p className="mt-0.5 font-mono text-[7.5px] text-ink-3 tnum">40 questions · 50 min</p>
            <p className="mt-1 text-[7px] leading-snug text-ink-3">Today, weighted the way this paper is marked.</p>
            <span className="mt-1.5 inline-flex items-center gap-1 rounded-lg bg-primary px-2 py-1 text-[8px] font-semibold text-on-primary shadow-action"><Icon icon={FileQuestion} size={8} />Start now</span>
          </div>
        </div>

        {/* progress ring stack */}
        <div className="flex items-center gap-3 rounded-xl border border-line bg-surface p-2.5 shadow-panel">
          <RingStackMini />
          <div className="min-w-0 flex-1">
            {([['Question bank', '62%', 'var(--color-accent)', '864 / 1,400 questions'], ['Practical', '45%', 'var(--color-accent-soft)', '18 / 40 items'], ['Essay', '30%', 'var(--color-primary)', '6 / 20 marked']] as const).map(([label, pct, c, detail]) => (
              <div key={label} className="flex items-baseline gap-2 border-b border-line py-1 first:pt-0 last:border-b-0 last:pb-0">
                <span className="relative top-[1px] size-1.5 shrink-0 rounded-full" style={{ background: c }} />
                <span className="min-w-0 flex-1 truncate text-[8.5px] font-medium text-ink">{label}</span>
                <span className="text-[6.5px] text-ink-3">{detail}</span>
                <span className="w-6 text-right font-mono text-[8.5px] font-semibold text-ink tnum">{pct}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ 2 · question bank (phone) */

function QuestionScreen() {
  const options = [
    ['A', 'Thiazide diuretic', 'neutral'],
    ['B', 'Loop diuretic', 'correct'],
    ['C', 'ACE inhibitor', 'wrong'],
    ['D', 'Beta-blocker', 'neutral'],
  ] as const
  return (
    <div dir="ltr" className="flex h-full flex-col bg-paper text-start">
      <div className="flex items-center justify-between border-b border-line bg-surface px-3 py-1.5">
        <div className="flex items-center gap-1"><BrandDot /><span className="text-[9px] font-bold text-ink">Question Bank</span></div>
        <span className="inline-flex items-center gap-1 rounded-lg border border-line bg-surface px-1.5 py-1 font-mono text-[8.5px] font-semibold text-ink shadow-panel tnum"><span className="size-1.5 rounded-full bg-primary" />12:04</span>
      </div>
      <div className="h-[3px] w-full bg-inset"><div className="h-full w-[45%] bg-primary" /></div>
      <div className="min-h-0 flex-1 overflow-hidden p-2.5">
        {/* meta row */}
        <div className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-accent" />
          <span className="text-[8.5px] font-bold text-ink">Cardiology</span>
          <span className="text-[8px] text-ink-3">· Heart failure</span>
          <span className="ms-auto rounded-full border border-danger/25 bg-danger-tint px-1.5 py-[1px] text-[7px] font-bold text-danger">Hard</span>
        </div>
        <p className="mt-2 text-[9px] font-semibold leading-snug text-ink">A 64-year-old man with HFrEF has worsening ankle oedema. Which single drug best relieves his congestion?</p>
        <div className="mt-2.5 space-y-1.5">
          {options.map(([letter, label, state]) => (
            <div key={letter} className={cn('flex items-center gap-2 rounded-lg border p-1.5', state === 'correct' ? 'border-success bg-success-tint' : state === 'wrong' ? 'border-danger bg-danger-tint' : 'border-line bg-surface')}>
              <span className={cn('grid size-4 shrink-0 place-items-center rounded-full border font-mono text-[7px] font-bold', state === 'correct' ? 'border-success bg-success text-on-success' : state === 'wrong' ? 'border-danger bg-danger text-on-danger' : 'border-line-2 text-ink-2')}>
                {state === 'correct' ? <Icon icon={Check} size={8} strokeWidth={2.6} /> : state === 'wrong' ? <Icon icon={X} size={8} strokeWidth={2.6} /> : letter}
              </span>
              <span className={cn('text-[8.5px] text-ink', state !== 'neutral' && 'font-medium')}>{label}</span>
            </div>
          ))}
        </div>
        <div className="mt-2.5 flex items-center justify-between border-t border-line pt-2">
          <span className="text-[8px] font-semibold text-ink-3">Previous</span>
          <span className="inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1 text-[8.5px] font-semibold text-on-primary shadow-action">Next<Icon icon={ArrowRight} size={9} /></span>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ 3 · study rooms (tablet) */

const SEATS: ({ i: string; self?: boolean; speaking?: boolean } | null)[] = [
  { i: 'MH' }, { i: 'OA', speaking: true }, { i: 'You', self: true }, { i: 'SK' },
  { i: 'RA' }, { i: 'LM', speaking: true }, { i: 'TN' }, { i: 'YB' },
  { i: 'FZ' }, { i: 'DS' }, { i: 'KP' }, { i: 'JW' },
  null, null, null, null, null, null, null, null,
]

function RoomsScreen() {
  return (
    <div dir="ltr" className="flex h-full flex-col bg-paper text-start">
      {/* room top bar */}
      <div className="flex items-center justify-between border-b border-line bg-surface px-2.5 py-2">
        <span className="flex items-center gap-1 text-[8px] font-medium text-ink-3"><Icon icon={ArrowLeft} size={9} />Study Rooms</span>
        <div className="flex items-center gap-1.5">
          <span className="rounded-lg border border-line bg-surface-2 px-1.5 py-1 font-mono text-[8px] font-semibold tracking-[0.16em] text-ink">KTP0R2</span>
          <span className="inline-flex items-center gap-1 rounded-md border border-line-2 bg-surface px-1.5 py-1 text-[7.5px] font-semibold text-ink shadow-control"><Icon icon={Copy} size={8} />Copy</span>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden p-2.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 font-serif text-[11px] font-semibold text-ink"><Icon icon={Hash} size={10} className="text-ink-3" />Cardiology evening sprint</span>
          <span className="font-mono text-[7.5px] text-ink-3 tnum">12 / 20 seated</span>
        </div>

        {/* the mist floor — desks with name plates */}
        <div className="mt-2 rounded-2xl border border-mist-line bg-mist p-2.5">
          <div className="grid grid-cols-4 gap-x-2 gap-y-2.5">
            {SEATS.map((seat, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <span className={cn('h-2.5 w-full rounded-t-[3px] border-x border-t', seat ? 'border-mist-line bg-surface' : 'border-dashed border-mist-line/60', seat?.speaking && 'ring-2 ring-accent/40')} />
                {seat ? (
                  <span className={cn('max-w-full truncate rounded-md border px-1 py-[0.5px] text-[6.5px] font-medium leading-tight', seat.self ? 'border-primary-line bg-surface text-primary-strong' : 'border-mist-line bg-surface text-ink')}>{seat.i}</span>
                ) : <span className="h-[9px]" />}
              </div>
            ))}
          </div>
        </div>

        {/* controls */}
        <div className="mt-2.5 flex items-center justify-between rounded-xl border border-line bg-surface px-2.5 py-2 shadow-panel">
          <span className="flex items-center gap-1 text-[7.5px] font-medium text-accent-strong"><Icon icon={Volume2} size={9} />2 speaking now</span>
          <span className="inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-[8px] font-semibold text-on-primary shadow-action"><Icon icon={Mic} size={8} />Mute</span>
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
