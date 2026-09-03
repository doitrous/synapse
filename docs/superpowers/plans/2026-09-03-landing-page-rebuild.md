# Landing Page Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Rebuild `src/pages/landing/LandingShell.tsx` so the English landing page (`/`, `/en`) tells the full 12-section Nishany story from `Nishany-Showcase-EN.pdf`, as faithful on-brand HTML/CSS recreations on the existing warm-palette design tokens — not screenshots — while the Arabic route (`/ar`) keeps rendering exactly what it renders today. Fix the "one method, the whole road" timeline so its milestone dots sit exactly on the drawn path (shared coordinate array, not independently-placed elements).

**Architecture:**
- `LandingShell.tsx` branches on `content.lang`: `'ar'` renders the **current** JSX verbatim (nothing about the Arabic page changes in this plan); `'en'` renders a new composition of 12 focused section components under `src/pages/landing/sections/`, each a self-contained file with its own real (non-templated) English copy lifted from the PDF. `MarketingShell` (header/footer/theme switch/language offer) is untouched and wraps both branches exactly as it does today.
- **Theme tokens, confirmed by reading `src/index.css` and `src/lib/useTheme.tsx`:** there is no per-page theme opt-in. `data-theme` (`light` | `warm` | `dark` | `oled`) is set once on `<html>` by `ThemeProvider`/`ThemeSwitch` (already rendered inside `MarketingShell`'s header) and defaults to `light`. Every semantic Tailwind class used across the app (`bg-surface`, `text-ink`, `border-line`, `bg-primary`, `text-success`, `bg-warning-tint`, `shadow-raised`, …) resolves against whichever theme is active — including `warm` — because they read the `@theme` custom properties, which `:root[data-theme='warm']` (index.css:227) overrides. So "build on the warm tokens" means: use only these semantic classes (the PDF mockup itself renders in the `warm` palette — `--color-paper: #f7f2ea`, `--color-ink: #1f1b16`, `--color-primary: #d13a63`, `--color-success: #1a6e56`, etc.) and never hardcode a hex value; the page then looks right in `warm` and automatically stays correct in `light`/`dark`/`oled` too, exactly like the existing hero (`TargetArtwork`) already does with `var(--color-...)`.
- **Scroll-in motion, confirmed by reading `src/index.css`:** the codebase already ships a one-shot mount entrance — `.animate-rise` / `@keyframes nishany-rise` (index.css:706-727), `animation-fill-mode: backwards`, driven by `--ease-out-quint` — and a **global** `@media (prefers-reduced-motion: reduce)` rule (index.css:950-957) that collapses every animation/transition duration to ~0ms for `*`. That means `prefers-reduced-motion` needs **no new code**: reuse `animate-rise`, and toggle it on with a tiny `useRevealOnScroll` hook (`IntersectionObserver`, fires once) instead of a new CSS system. This keeps the motion in line with the file's own doctrine ("no scroll-driven animation, no looping ambient motion") — it is a single fire-once entrance, not a continuous scroll-linked effect.
- **Timeline bug fix technique (Task 3):** the milestone road is built from one `const ROAD_MILESTONES = [{x,y,label}, ...]` array. The SVG `<path>` `d` string is *derived* from that same array (cubic Béziers with horizontal tangents through each anchor), and every `<circle>` is placed at `cx={p.x} cy={p.y}` read from the same array element used to build the path segment. Because a cubic Bézier curve always passes through its own start/end anchor points, and those anchors are the literal numbers used for both the path and the circles, the dots cannot drift off the line — there is only one coordinate source, not two.
- Every section is written directly against the PDF's real copy (`/Users/doitrous/Desktop/Nishany-Showcase-EN.pdf`, pages 1-10, read in full while planning) — no lorem ipsum, no "TBD".

**Tech Stack:** TypeScript, Vite, React, react-router v7 (routes in `src/router.tsx`, lazy-loaded), Tailwind v4 (tokens in `src/index.css` `@theme`), warm theme via `data-theme` (see above), fonts Source Serif 4 (`font-serif`, headings) / Geist (`font-sans`, body) / Geist Mono (`font-mono`, eyebrows) / Baloo 2 (`font-brand`, the Arabic wordmark glyph), `lucide-react` icons (already a dependency — every icon name used below was verified present in the installed package).

**Spec:** docs/superpowers/specs/2026-09-03-landing-pricing-subscriber-count-design.md

## Global Constraints

- TypeScript + Vite + React + react-router v7 (routes in `src/router.tsx`, lazy-loaded).
- Tailwind v4, tokens in `src/index.css` `@theme`; warm theme via `data-theme` (global, user-controlled — see Architecture above, not a per-page override).
- Fonts: Source Serif 4 (display/headings), Geist (body/UI), Geist Mono (eyebrows/labels).
- English first. Arabic routes (`/ar`) must keep working, rendering their current content — no RTL redesign in this pass.
- Reuse `MarketingShell` for header/footer/theme-switch/language-offer chrome; do not rebuild it.
- No new npm dependencies.
- Respect `prefers-reduced-motion` (already handled globally — see Architecture; do not add a second reduced-motion mechanism).
- Consume `useSubscriberCount` / `LiveCount` from the Live Subscriber Count plan; do not reimplement counting, animation-on-view, or the pulsing-dot logic here.

## Dependencies

This plan **consumes, but does not build**, two files from the "Live Subscriber Count" section of the spec (section 3 of `docs/superpowers/specs/2026-09-03-landing-pricing-subscriber-count-design.md`):
- `src/lib/useSubscriberCount.ts` exporting `useSubscriberCount(): { enabled: boolean; value: number | null }`
- `src/components/marketing/LiveCount.tsx` exporting `LiveCount(props: { variant?: 'chip' | 'band'; className?: string }): JSX.Element | null`

**As of this writing neither file exists yet in this worktree** (verified: `ls src/lib/useSubscriberCount.ts src/components/marketing/LiveCount.tsx` → not found). Task 2 (Hero) and Task 11 (Trust band) import `LiveCount` directly. **Do not stub or reimplement it here** — if the subscriber-count plan has not landed by the time Task 2/11 run, pause those two tasks (everything else in this plan is independent of it) until `src/components/marketing/LiveCount.tsx` exists, then resume. `LiveCount` renders `null` when `enabled` is false, so once the file exists the import is safe even before a superadmin turns the feature on.

---

### Task 1: Shared landing-section infrastructure (trial link + scroll-reveal hook)

**Files:**
- Create: `src/pages/landing/sections/shared.ts`

**Interfaces:**
- Produces: `TRIAL_PATH: string` (`'/signup?plan=maristana&period=term'`, moved verbatim from the top of the current `LandingShell.tsx:11`).
- Produces: `useRevealOnScroll<T extends HTMLElement>(): { ref: RefObject<T>; visible: boolean }`.
- Consumes: nothing external (plain `react` hooks).

- [ ] **Step 1: Create `src/pages/landing/sections/shared.ts` with the trial-path constant and the reveal hook.**
  ```ts
  import { useEffect, useRef, useState, type RefObject } from 'react'

  /** Every primary CTA on the rebuilt landing page starts the same trial. */
  export const TRIAL_PATH = '/signup?plan=maristana&period=term'

  /**
   * True once the element has entered the viewport — sticks, never reverts.
   * Pair with `opacity-0` before / `animate-rise` after (src/index.css:706-727,
   * `nishany-rise` uses `animation-fill-mode: backwards` so swapping the class
   * mid-render never flashes). `prefers-reduced-motion` needs no branch here:
   * the file's global rule (index.css:950-957) already collapses every
   * animation/transition duration to ~0ms for `*`, so a reduced-motion reader
   * sees the final state almost immediately instead of a fade.
   */
  export function useRevealOnScroll<T extends HTMLElement>(): { ref: RefObject<T>; visible: boolean } {
    const ref = useRef<T>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
      const el = ref.current
      if (!el) return
      if (visible) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        },
        { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
      )
      observer.observe(el)
      return () => observer.disconnect()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { ref, visible }
  }
  ```
- [ ] **Step 2: Typecheck the new file in isolation.** Run `npx tsc --noEmit -p . 2>&1 | grep sections/shared.ts` from the worktree root. Expected: no output (no errors reported for this file). A repo-wide preexisting error unrelated to this file is fine to ignore; anything pointing at `shared.ts` must be fixed before continuing.
- [ ] **Step 3: Commit.**
  ```
  git add src/pages/landing/sections/shared.ts
  git commit -m "feat(landing): add shared trial-path constant and scroll-reveal hook for the rebuild"
  ```

---

### Task 2: HeroSection ("Med school, right on target.")

**Files:**
- Create: `src/pages/landing/sections/HeroSection.tsx`

**Interfaces:**
- Produces: `export function HeroSection({ className }: { className?: string }): JSX.Element`
- Consumes: `TRIAL_PATH`, `useRevealOnScroll` (from `./shared`), `Icon` (`@/components/ui/Icon`), `LiveCount` (`@/components/marketing/LiveCount`, `variant="chip"` — dependency, see plan header), `ArrowRight`/`Check` from `lucide-react`, `Link` from `react-router-dom`.
- The existing `TargetArtwork` SVG is **moved** here verbatim from the current `LandingShell.tsx:22-38` (it already uses `var(--color-...)` tokens and the `.landing-target-*` animation classes in `index.css:918-948` — nothing about it changes, it is simply relocated so `LandingShell.tsx` no longer needs to define it).

- [ ] **Step 1: Create the file, moving `TargetArtwork` in unchanged and adding the new hero copy from PDF page 1.**
  ```tsx
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
  ```
- [ ] **Step 2: Browser-verify in isolation is not possible yet (LandingShell isn't wired up until Task 14) — skip live verification here and confirm only that the file typechecks:** `npx tsc --noEmit -p . 2>&1 | grep sections/HeroSection.tsx` → expect no output. If it errors on the `LiveCount` import because that file doesn't exist yet, stop and follow the Dependencies note above rather than working around it.
- [ ] **Step 3: Commit.**
  ```
  git add src/pages/landing/sections/HeroSection.tsx
  git commit -m "feat(landing): add HeroSection with PDF hero copy and compact live count"
  ```

---

### Task 3: RoadmapSection ("A decade with the doctors above you") — timeline bug fix

**Files:**
- Create: `src/pages/landing/sections/RoadmapSection.tsx`

**Interfaces:**
- Produces: `export function RoadmapSection({ className, id }: { className?: string; id?: string }): JSX.Element` (the `id` prop lets `LandingShell` attach `id="why-nishany"` here so the header's "Why Nishany" nav link keeps working — see Task 14).
- Consumes: `useRevealOnScroll` (`./shared`), `cn` (`@/lib/cn`).

- [ ] **Step 1: Create the file with the eyebrow, heading, and the three bullet points from PDF page 2.**
  ```tsx
  import { cn } from '@/lib/cn'
  import { useRevealOnScroll } from './shared'

  const ROAD_MILESTONES = [
    { x: 40, y: 130, label: 'Day one' },
    { x: 360, y: 60, label: 'Years 1–3' },
    { x: 680, y: 110, label: 'Clinical years' },
    { x: 1000, y: 50, label: 'Residency & boards' },
  ] as const

  /**
   * "One method, the whole road" — the road as a single SVG path built from
   * ROAD_MILESTONES, with each milestone <circle> placed at the exact (x, y)
   * from the same array element used to build that path segment. A cubic
   * Bézier always passes through its own start/end anchors, so the dots
   * cannot drift off the drawn line the way two independently-authored
   * coordinate sets could (the bug being fixed here).
   */
  function RoadTimeline() {
    const d = ROAD_MILESTONES.slice(1).reduce((path, point, i) => {
      const prev = ROAD_MILESTONES[i]
      const half = (point.x - prev.x) / 2
      return `${path} C${prev.x + half},${prev.y} ${point.x - half},${point.y} ${point.x},${point.y}`
    }, `M${ROAD_MILESTONES[0].x},${ROAD_MILESTONES[0].y}`)

    return (
      <svg viewBox="0 0 1040 210" className="w-full" aria-hidden="true">
        <path d={d} fill="none" stroke="var(--color-primary-line)" strokeWidth="6" strokeLinecap="round" />
        <path d={d} fill="none" stroke="var(--color-primary)" strokeWidth="6" strokeLinecap="round" pathLength={100} strokeDasharray="58 100" />
        {ROAD_MILESTONES.map((p, i) => {
          const isLast = i === ROAD_MILESTONES.length - 1
          return (
            <g key={p.label}>
              <circle
                cx={p.x}
                cy={p.y}
                r={isLast ? 11 : 9 - i * 1.5}
                fill={isLast ? 'var(--color-surface)' : 'var(--color-primary)'}
                stroke="var(--color-primary)"
                strokeWidth={isLast ? 4 : 0}
              />
              <text
                x={p.x}
                y={190}
                textAnchor={i === 0 ? 'start' : isLast ? 'end' : 'middle'}
                className="text-[11px] font-bold uppercase tracking-wide"
                fill={i === 0 || isLast ? 'var(--color-primary-strong)' : 'var(--color-ink-2)'}
              >
                {p.label}
              </text>
            </g>
          )
        })}
      </svg>
    )
  }

  export function RoadmapSection({ className, id }: { className?: string; id?: string }) {
    const { ref, visible } = useRevealOnScroll<HTMLElement>()

    return (
      <section id={id} ref={ref} className={cn('grid scroll-mt-24 gap-10 border-t border-line py-16 sm:py-20 lg:grid-cols-2 lg:gap-16', visible ? 'animate-rise' : 'opacity-0', className)}>
        <div>
          <p className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.09em] text-primary-strong">
            <span className="h-px w-6 bg-primary-strong" aria-hidden />01 · Who we are
          </p>
          <h2 className="mt-3 max-w-lg font-serif text-[28px] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[36px]">
            A decade with the doctors <em className="text-primary-strong not-italic font-serif italic">above</em> you.
          </h2>
          <ul className="mt-6 space-y-4 text-[14.5px] leading-relaxed text-ink-2">
            <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Built by Connect,</strong> with more than ten years guiding postgraduate medical students. We have already taught the exams you are heading toward — now we teach you from day one.</span></li>
            <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">The international method, from your very first day.</strong> We bring the way the world&rsquo;s best doctors study to the Egyptian curriculum, so you learn it right the first time.</span></li>
            <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Don&rsquo;t study medicine twice.</strong> Most students relearn how to study halfway through. Nishany builds the postgraduate mindset from the second you step into medicine.</span></li>
          </ul>
        </div>

        <div className="rounded-2xl border border-line bg-surface-2/60 p-4 sm:p-5">
          <div className="rounded-xl border border-line bg-surface p-5 shadow-panel">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-ink-3">The Connect pedigree</p>
              <span className="font-mono text-[10px] font-bold text-primary-strong">10+ years</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-primary text-[10px] font-bold text-primary-strong">10y</span>
              <div>
                <p className="text-[13.5px] font-semibold text-ink">Teaching postgraduate doctors since 2015</p>
                <p className="mt-0.5 text-[12px] leading-relaxed text-ink-2">The exams at the end of your road are the ones we already teach. Nishany moves that method to day one.</p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-line bg-surface p-5 shadow-panel">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-ink-3">One method, the whole road</p>
              <span className="font-mono text-[10px] font-bold text-ink-3">No relearning</span>
            </div>
            <div className="mt-3">
              <RoadTimeline />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-xl border border-line bg-surface p-4 shadow-panel">
            <p className="flex-1 font-serif text-[13.5px] italic leading-relaxed text-ink-2">
              &ldquo;Adapt to the international system early — by the time it matters, it is already how you think.&rdquo;
            </p>
            <span className="shrink-0 rounded-full bg-primary-tint px-3 py-1.5 text-[10.5px] font-semibold text-primary-strong">The Nishany promise</span>
          </div>

          <p className="mt-4 text-center font-serif text-[12.5px] italic text-ink-3">Ten years of postgraduate teaching, folded back into year one.</p>
        </div>
      </section>
    )
  }
  ```
- [ ] **Step 2: Typecheck.** `npx tsc --noEmit -p . 2>&1 | grep sections/RoadmapSection.tsx` → expect no output.
- [ ] **Step 3: Commit.**
  ```
  git add src/pages/landing/sections/RoadmapSection.tsx
  git commit -m "feat(landing): add RoadmapSection with the fixed on-track timeline"
  ```

---

### Task 4: ConceptMasterySection ("We grade understanding, not just accuracy")

**Files:**
- Create: `src/pages/landing/sections/ConceptMasterySection.tsx`

**Interfaces:**
- Produces: `export function ConceptMasterySection({ className }: { className?: string }): JSX.Element`
- Consumes: `useRevealOnScroll`, `cn`.

- [ ] **Step 1: Create the file with the concept-digestion rings and next-block bar from PDF page 3.**
  ```tsx
  import { cn } from '@/lib/cn'
  import { useRevealOnScroll } from './shared'

  const RINGS: { label: string; value: number; status: string; tone: 'success' | 'warning' | 'primary' }[] = [
    { label: 'Heart failure', value: 92, status: 'Secure', tone: 'success' },
    { label: 'Arrhythmias', value: 61, status: 'Developing', tone: 'warning' },
    { label: 'Valve disease', value: 28, status: 'Shaky', tone: 'primary' },
  ]

  const TONE_STROKE: Record<(typeof RINGS)[number]['tone'], string> = {
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    primary: 'var(--color-primary)',
  }
  const TONE_PILL: Record<(typeof RINGS)[number]['tone'], string> = {
    success: 'bg-success-tint text-success',
    warning: 'bg-warning-tint text-warning',
    primary: 'bg-primary-tint text-primary-strong',
  }

  function ConceptRing({ label, value, status, tone }: (typeof RINGS)[number]) {
    const r = 24
    const c = 2 * Math.PI * r
    return (
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 60 60" className="size-12 shrink-0 -rotate-90">
          <circle cx="30" cy="30" r={r} fill="none" stroke="var(--color-line)" strokeWidth="6" />
          <circle cx="30" cy="30" r={r} fill="none" stroke={TONE_STROKE[tone]} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${(value / 100) * c} ${c}`} />
        </svg>
        <div>
          <p className="text-[13px] font-semibold text-ink">{value} — {label}</p>
          <span className={cn('mt-0.5 inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide', TONE_PILL[tone])}>{status}</span>
        </div>
      </div>
    )
  }

  const NEXT_BLOCK = [
    { label: 'Confirmed weak concepts', pct: 45, className: 'bg-primary' },
    { label: 'Exam-blueprint coverage', pct: 25, className: 'bg-primary-soft' },
    { label: 'Spaced review', pct: 20, className: 'bg-primary-line' },
    { label: 'Unmeasured concepts', pct: 10, className: 'bg-line-2' },
  ]

  export function ConceptMasterySection({ className }: { className?: string }) {
    const { ref, visible } = useRevealOnScroll<HTMLElement>()

    return (
      <section ref={ref} className={cn('grid gap-10 border-t border-line py-16 sm:py-20 lg:grid-cols-2 lg:gap-16', visible ? 'animate-rise' : 'opacity-0', className)}>
        <div>
          <p className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.09em] text-primary-strong"><span className="h-px w-6 bg-primary-strong" aria-hidden />02 · Concepts, not question counts</p>
          <h2 className="mt-3 max-w-lg font-serif text-[28px] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[36px]">We grade <em className="font-serif italic text-primary-strong">understanding</em>, not just accuracy.</h2>
          <ul className="mt-6 space-y-4 text-[14.5px] leading-relaxed text-ink-2">
            <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Built on the concepts you must understand to pass</strong> — not on how many questions we can pile up. Questions are a tool; understanding is the goal.</span></li>
            <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Mastery of the exact concepts on your exam paper.</strong> Progress reflects concept digestion as well as percentage correct — the number that actually predicts your exam.</span></li>
            <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">An adaptive engine that knows what you&rsquo;ve learned and what you haven&rsquo;t.</strong> Every new block is a genuine step forward — never wasted repetition.</span></li>
            <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Built for full digestion</strong> of a topic, a module, a year — and ultimately, of medicine itself.</span></li>
          </ul>
        </div>

        <div className="rounded-2xl border border-line bg-surface-2/60 p-4 sm:p-5">
          <div className="rounded-xl border border-line bg-surface p-5 shadow-panel">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-ink-3">Concept digestion · Cardiovascular</p>
              <span className="font-mono text-[10px] font-bold text-success">Exam-ready</span>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {RINGS.map((ring) => <ConceptRing key={ring.label} {...ring} />)}
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-line bg-surface p-5 shadow-panel">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-ink-3">What your next block will contain</p>
              <span className="font-mono text-[10px] font-bold text-ink-3">Decided per student</span>
            </div>
            <div className="mt-4 flex h-8 overflow-hidden rounded-lg" role="img" aria-label="45% confirmed weak concepts, 25% exam-blueprint coverage, 20% spaced review, 10% unmeasured concepts">
              {NEXT_BLOCK.map((seg) => (
                <div key={seg.label} className={cn('flex items-center justify-center text-[10.5px] font-bold text-on-primary', seg.className)} style={{ width: `${seg.pct}%` }}>{seg.pct}%</div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-ink-2">
              {NEXT_BLOCK.map((seg) => (
                <span key={seg.label} className="inline-flex items-center gap-1.5"><span className={cn('size-2 rounded-full', seg.className)} aria-hidden />{seg.label}</span>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-xl border border-line bg-surface p-4 shadow-panel">
            <span className="shrink-0 rounded-full bg-success-tint px-3 py-1.5 text-[10.5px] font-semibold text-success">Never wasted repetition</span>
            <p className="flex-1 text-[12.5px] leading-relaxed text-ink-2">The engine weighs what you have digested, what the blueprint demands, and what is due for review — then builds the one block that moves you forward.</p>
          </div>

          <p className="mt-4 text-center font-serif text-[12.5px] italic text-ink-3">Mastery is measured on the concepts your exam paper actually tests.</p>
        </div>
      </section>
    )
  }
  ```
- [ ] **Step 2: Typecheck.** `npx tsc --noEmit -p . 2>&1 | grep sections/ConceptMasterySection.tsx` → expect no output.
- [ ] **Step 3: Commit.**
  ```
  git add src/pages/landing/sections/ConceptMasterySection.tsx
  git commit -m "feat(landing): add ConceptMasterySection with concept-digestion rings"
  ```

---

### Task 5: WeakConceptSection ("Never let a weak concept survive")

**Files:**
- Create: `src/pages/landing/sections/WeakConceptSection.tsx`

**Interfaces:**
- Produces: `export function WeakConceptSection({ className }: { className?: string }): JSX.Element`
- Consumes: `useRevealOnScroll`, `cn`, `Icon` (`@/components/ui/Icon`), `ArrowRight`/`X`/`Check`/`RefreshCcw` from `lucide-react`.

- [ ] **Step 1: Create the file with the three-step drill from PDF page 4.**
  ```tsx
  import { ArrowRight, Check, RefreshCcw, X } from 'lucide-react'
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
  ```
  (`Check` is imported for parity with the codebase's icon-import style even though this file's current draft doesn't render it standalone — remove the unused import if `tsc`/eslint flags it as unused in Step 2.)
- [ ] **Step 2: Typecheck and lint for unused imports.** `npx tsc --noEmit -p . 2>&1 | grep sections/WeakConceptSection.tsx`. Remove the `Check` import if it is unused (it is — delete it from the `lucide-react` import line before continuing).
- [ ] **Step 3: Commit.**
  ```
  git add src/pages/landing/sections/WeakConceptSection.tsx
  git commit -m "feat(landing): add WeakConceptSection with the three-step drill"
  ```

---

### Task 6: QuestionBankSection ("Every format your exams throw at you, in one bank")

**Files:**
- Create: `src/pages/landing/sections/QuestionBankSection.tsx`

**Interfaces:**
- Produces: `export function QuestionBankSection({ className }: { className?: string }): JSX.Element`
- Consumes: `useRevealOnScroll`, `cn`.

- [ ] **Step 1: Create the file with the four format cards from PDF page 5.**
  ```tsx
  import { cn } from '@/lib/cn'
  import { useRevealOnScroll } from './shared'

  export function QuestionBankSection({ className }: { className?: string }) {
    const { ref, visible } = useRevealOnScroll<HTMLElement>()

    return (
      <section ref={ref} className={cn('border-t border-line py-16 sm:py-20', visible ? 'animate-rise' : 'opacity-0', className)}>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.09em] text-primary-strong"><span className="h-px w-6 bg-primary-strong" aria-hidden />04 · The question bank</p>
            <h2 className="mt-3 max-w-lg font-serif text-[28px] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[36px]">Every format your exams throw at you, in <em className="font-serif italic text-primary-strong">one bank</em>.</h2>
          </div>
          <ul className="space-y-4 self-center text-[14.5px] leading-relaxed text-ink-2">
            <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">MCQs, OSCE stations, clinical cases, and written questions</strong> — one bank, mapped to your university&rsquo;s own curriculum.</span></li>
            <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Key words made obvious.</strong> Each written question states its key words clearly, so students know exactly what earns the mark and what examiners look for.</span></li>
          </ul>
        </div>

        <div className="mt-10 grid gap-4 rounded-2xl border border-line bg-surface-2/60 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
          <div className="rounded-xl border border-line bg-surface p-4 shadow-panel">
            <div className="flex items-center justify-between"><p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-ink-3">MCQ</p><span className="rounded-md bg-primary-tint px-1.5 py-0.5 text-[9px] font-bold text-primary-strong">Timed</span></div>
            <div className="mt-3 space-y-1">
              <div className="h-1.5 w-4/5 rounded-full bg-line" /><div className="h-1.5 w-3/5 rounded-full bg-line" />
            </div>
            <div className="mt-3 space-y-1.5">
              <div className="rounded-lg border border-line px-2.5 py-1.5 text-[11.5px] text-ink-2">A · Thiazides</div>
              <div className="rounded-lg border border-success/25 bg-success-tint px-2.5 py-1.5 text-[11.5px] font-medium text-success">B · Loop diuretics</div>
              <div className="rounded-lg border border-line px-2.5 py-1.5 text-[11.5px] text-ink-2">C · Acetazolamide</div>
            </div>
          </div>

          <div className="rounded-xl border border-line bg-surface p-4 shadow-panel">
            <div className="flex items-center justify-between"><p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-ink-3">OSCE station</p><span className="rounded-md bg-accent-tint px-1.5 py-0.5 text-[9px] font-bold text-accent-strong">Checklist</span></div>
            <ul className="mt-3 space-y-1.5 text-[11.5px] text-ink-2">
              <li className="flex items-center gap-1.5"><span className="text-success">✓</span>Introduces self, confirms patient</li>
              <li className="flex items-center gap-1.5"><span className="text-success">✓</span>Inspects JVP at 45°</li>
              <li className="flex items-center gap-1.5"><span className="text-success">✓</span>Auscultates the four areas</li>
              <li className="flex items-center gap-1.5 text-ink-3"><span>○</span>Offers to examine the ankles</li>
            </ul>
            <span className="mt-3 inline-block rounded-md bg-success-tint px-2 py-1 text-[10.5px] font-bold text-success">7 / 9 marks</span>
          </div>

          <div className="rounded-xl border border-line bg-surface p-4 shadow-panel">
            <div className="flex items-center justify-between"><p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-ink-3">Clinical case</p><span className="rounded-md bg-primary-tint px-1.5 py-0.5 text-[9px] font-bold text-primary-strong">Stepwise</span></div>
            <div className="mt-3 space-y-1"><div className="h-1.5 w-full rounded-full bg-line" /><div className="h-1.5 w-2/5 rounded-full bg-line" /></div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="rounded-full border border-line px-2.5 py-1 text-[10.5px] font-medium text-ink-2">History</span>
              <span className="rounded-full border border-line px-2.5 py-1 text-[10.5px] font-medium text-ink-2">Examination</span>
              <span className="rounded-full bg-primary-tint px-2.5 py-1 text-[10.5px] font-semibold text-primary-strong">Investigations</span>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-ink-3">The case unfolds as you commit — like the ward, not like a quiz.</p>
          </div>

          <div className="rounded-xl border border-line bg-surface p-4 shadow-panel">
            <div className="flex items-center justify-between"><p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-ink-3">Written question</p><span className="rounded-md bg-accent-tint px-1.5 py-0.5 text-[9px] font-bold text-accent-strong">Key words</span></div>
            <p className="mt-2.5 text-[12.5px] font-semibold text-ink">Explain neurohormonal compensation in HFrEF.</p>
            <p className="mt-2 text-[10.5px] font-semibold uppercase tracking-wide text-ink-3">What earns the mark:</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {['RAAS activation', 'sympathetic drive', 'adverse remodelling', 'four pillars'].map((w) => (
                <span key={w} className="rounded-full bg-primary-tint px-2.5 py-1 text-[10.5px] font-semibold text-primary-strong">{w}</span>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-4 text-center font-serif text-[12.5px] italic text-ink-3">One bank, four formats — each graded the way your faculty grades it.</p>
      </section>
    )
  }
  ```
- [ ] **Step 2: Typecheck.** `npx tsc --noEmit -p . 2>&1 | grep sections/QuestionBankSection.tsx` → expect no output.
- [ ] **Step 3: Commit.**
  ```
  git add src/pages/landing/sections/QuestionBankSection.tsx
  git commit -m "feat(landing): add QuestionBankSection with the four exam formats"
  ```

---

### Task 7: CohortSection ("Compare yourself — anonymously")

**Files:**
- Create: `src/pages/landing/sections/CohortSection.tsx`

**Interfaces:**
- Produces: `export function CohortSection({ className }: { className?: string }): JSX.Element`
- Consumes: `useRevealOnScroll`, `cn`, `Icon`, `Flame` from `lucide-react`.

- [ ] **Step 1: Create the file with the leaderboard, Question of the Day, and privacy panels from PDF page 6.**
  ```tsx
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
  ```
- [ ] **Step 2: Typecheck.** `npx tsc --noEmit -p . 2>&1 | grep sections/CohortSection.tsx` → expect no output.
- [ ] **Step 3: Commit.**
  ```
  git add src/pages/landing/sections/CohortSection.tsx
  git commit -m "feat(landing): add CohortSection with the anonymous leaderboard and QOTD"
  ```

---

### Task 8: ToolkitSection ("Everything a study session needs, built in")

**Files:**
- Create: `src/pages/landing/sections/ToolkitSection.tsx`

**Interfaces:**
- Produces: `export function ToolkitSection({ className }: { className?: string }): JSX.Element`
- Consumes: `useRevealOnScroll`, `cn`, `Icon`, `Volume2` from `lucide-react`.

- [ ] **Step 1: Create the file with the notebook/whiteboard/pomodoro/focus-sounds cards from PDF page 7.**
  ```tsx
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
  ```
- [ ] **Step 2: Typecheck.** `npx tsc --noEmit -p . 2>&1 | grep sections/ToolkitSection.tsx` → expect no output.
- [ ] **Step 3: Commit.**
  ```
  git add src/pages/landing/sections/ToolkitSection.tsx
  git commit -m "feat(landing): add ToolkitSection with notebook, whiteboard, pomodoro, focus sounds"
  ```

---

### Task 9: BringYourBookSection ("Your material, our tools")

**Files:**
- Create: `src/pages/landing/sections/BringYourBookSection.tsx`

**Interfaces:**
- Produces: `export function BringYourBookSection({ className }: { className?: string }): JSX.Element`
- Consumes: `useRevealOnScroll`, `cn`, `Icon`, `Check` from `lucide-react`.

- [ ] **Step 1: Create the file with the PDF-editor and cross-platform-sync panels from PDF page 8.**
  ```tsx
  import { Check } from 'lucide-react'
  import { Icon } from '@/components/ui/Icon'
  import { cn } from '@/lib/cn'
  import { useRevealOnScroll } from './shared'

  export function BringYourBookSection({ className }: { className?: string }) {
    const { ref, visible } = useRevealOnScroll<HTMLElement>()

    return (
      <section ref={ref} className={cn('grid gap-10 border-t border-line py-16 sm:py-20 lg:grid-cols-2 lg:gap-16', visible ? 'animate-rise' : 'opacity-0', className)}>
        <div>
          <p className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.09em] text-primary-strong"><span className="h-px w-6 bg-primary-strong" aria-hidden />07 · Bring your own book</p>
          <h2 className="mt-3 max-w-lg font-serif text-[28px] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[36px]">Your material, <em className="font-serif italic text-primary-strong">our tools</em>.</h2>
          <ul className="mt-6 space-y-4 text-[14.5px] leading-relaxed text-ink-2">
            <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Upload any book and study on it freely</strong> in our advanced PDF editor — your material, our tools.</span></li>
            <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Write like it&rsquo;s paper.</strong> Natural handwritten ink, highlighters, shapes, and typed notes over any page — the fluid, tactile feel of Notability and GoodNotes.</span></li>
            <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Nothing gets lost.</strong> Every annotation is searchable and organised, so a marked-up book becomes a study asset, not a pile of PDFs.</span></li>
            <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Truly cross-platform, instantly synced</strong> — web, tablet, and phone, iOS and Android. Your ink follows you everywhere in real time.</span></li>
          </ul>
        </div>

        <div className="rounded-2xl border border-line bg-surface-2/60 p-4 sm:p-5">
          <div className="rounded-xl border border-line bg-surface p-5 shadow-panel">
            <div className="flex items-center justify-between"><p className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-ink-3">Guyton &amp; Hall · Chapter 22</p><span className="text-[10px] font-bold text-primary-strong">Your upload</span></div>
            <div className="mt-4 space-y-2">
              <div className="h-2 w-4/5 rounded-full bg-warning-tint" />
              <div className="h-2 w-full rounded-full bg-primary-line" />
              <div className="h-2 w-3/5 rounded-full bg-warning-tint" />
              <div className="h-2 w-2/3 rounded-full bg-line" />
            </div>
            <p className="mt-3 font-serif text-[12.5px] italic text-primary-strong">↴ the four pillars — this exact figure came in the 2025 paper ★</p>
          </div>

          <div className="mt-4 rounded-xl border border-line bg-surface p-5 shadow-panel">
            <div className="flex items-center justify-between"><p className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-ink-3">Synced in real time</p><span className="text-[10px] font-bold text-ink-3">Web · iOS · Android</span></div>
            <div className="mt-4 flex items-center justify-center gap-4">
              {['Web', 'iOS', 'Android'].map((platform) => (
                <div key={platform} className="relative flex h-16 w-11 items-center justify-center rounded-md border-2 border-line-2 bg-paper">
                  <span className="h-0.5 w-5 rounded-full bg-primary" />
                  <span className="absolute -right-1.5 -top-1.5 grid size-4 place-items-center rounded-full bg-success text-on-primary"><Icon icon={Check} size={10} /></span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4 text-center font-serif text-[12.5px] italic text-ink-3">Ink, highlights, and typed notes over any page — searchable forever, synced everywhere.</p>
        </div>
      </section>
    )
  }
  ```
- [ ] **Step 2: Typecheck.** `npx tsc --noEmit -p . 2>&1 | grep sections/BringYourBookSection.tsx` → expect no output.
- [ ] **Step 3: Commit.**
  ```
  git add src/pages/landing/sections/BringYourBookSection.tsx
  git commit -m "feat(landing): add BringYourBookSection with the PDF editor and device sync"
  ```

---

### Task 10: StudyTogetherSection ("Momentum you can share")

**Files:**
- Create: `src/pages/landing/sections/StudyTogetherSection.tsx`

**Interfaces:**
- Produces: `export function StudyTogetherSection({ className }: { className?: string }): JSX.Element`
- Consumes: `useRevealOnScroll`, `cn`, `Icon`, `Play`, `Grid3x3`, `Search`, `ArrowLeftRight`, `ListOrdered`, `Link2`, `Flag` from `lucide-react`.

- [ ] **Step 1: Create the file with the study-party and minigames panels from PDF page 9.**
  ```tsx
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
  ```
- [ ] **Step 2: Typecheck.** `npx tsc --noEmit -p . 2>&1 | grep sections/StudyTogetherSection.tsx` → expect no output.
- [ ] **Step 3: Commit.**
  ```
  git add src/pages/landing/sections/StudyTogetherSection.tsx
  git commit -m "feat(landing): add StudyTogetherSection with study parties and minigames"
  ```

---

### Task 11: TrustBandSection ("790 students across universities")

**Files:**
- Create: `src/pages/landing/sections/TrustBandSection.tsx`

**Interfaces:**
- Produces: `export function TrustBandSection({ className }: { className?: string }): JSX.Element`
- Consumes: `useRevealOnScroll`, `cn`, `LiveCount` (`@/components/marketing/LiveCount`, `variant="band"` — dependency, see plan header).

- [ ] **Step 1: Create the file — a full-width crimson band echoing PDF page 10's dark treatment, built entirely from `bg-primary`/`text-on-primary` tokens (no new hex values).**
  ```tsx
  import { LiveCount } from '@/components/marketing/LiveCount'
  import { cn } from '@/lib/cn'
  import { useRevealOnScroll } from './shared'

  export function TrustBandSection({ className }: { className?: string }) {
    const { ref, visible } = useRevealOnScroll<HTMLElement>()

    return (
      <section ref={ref} className={cn('border-t border-line py-16 sm:py-20', visible ? 'animate-rise' : 'opacity-0', className)}>
        <div className="-mx-5 rounded-2xl bg-primary px-6 py-14 text-center sm:-mx-8 sm:px-10 sm:py-16">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.09em] text-on-primary/70">Trusted by your colleagues</p>
          <div className="mt-4 flex flex-col items-center gap-1">
            <LiveCount variant="band" className="font-serif text-[56px] font-semibold leading-none text-on-primary sm:text-[72px]" />
            <p className="max-w-md text-[14.5px] font-medium text-on-primary/85">students across universities, studying with Nishany</p>
          </div>
        </div>
      </section>
    )
  }
  ```
- [ ] **Step 2: Typecheck.** `npx tsc --noEmit -p . 2>&1 | grep sections/TrustBandSection.tsx` → expect no output. If `LiveCount` doesn't exist yet, stop per the Dependencies note in the plan header.
- [ ] **Step 3: Commit.**
  ```
  git add src/pages/landing/sections/TrustBandSection.tsx
  git commit -m "feat(landing): add TrustBandSection with the live subscriber count band"
  ```

---

### Task 12: PricingTeaserSection

**Files:**
- Create: `src/pages/landing/sections/PricingTeaserSection.tsx`

**Interfaces:**
- Produces: `export function PricingTeaserSection({ className }: { className?: string }): JSX.Element`
- Consumes: `useRevealOnScroll`, `cn`, `Icon`, `ArrowRight`/`Check` from `lucide-react`, `Link` from `react-router-dom`, `pricingFor` from `./../pricingContent` (reuses the already-existing `EN_PRICING.teaser` copy — the pricing plan's single source of truth for this text — rather than re-authoring pricing language here).

- [ ] **Step 1: Create the file, reusing `pricingFor('en').teaser`.**
  ```tsx
  import { Link } from 'react-router-dom'
  import { ArrowRight, Check } from 'lucide-react'
  import { Icon } from '@/components/ui/Icon'
  import { cn } from '@/lib/cn'
  import { pricingFor } from '../pricingContent'
  import { useRevealOnScroll } from './shared'

  export function PricingTeaserSection({ className }: { className?: string }) {
    const { ref, visible } = useRevealOnScroll<HTMLElement>()
    const { teaser, path } = pricingFor('en')

    return (
      <section ref={ref} className={cn('border-t border-line py-16 sm:py-20', visible ? 'animate-rise' : 'opacity-0', className)}>
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-surface-2/60 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.09em] text-primary-strong">{teaser.eyebrow}</p>
            <h2 className="mt-2 max-w-md font-serif text-[24px] font-semibold leading-tight text-ink sm:text-[28px]">{teaser.title}</h2>
            <p className="mt-2.5 max-w-lg text-[13.5px] leading-relaxed text-ink-2">{teaser.sub}</p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-2"><Icon icon={Check} size={13} className="text-success" />{teaser.termDetail}</p>
          </div>
          <Link to={path} className="group inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg border border-line-2 bg-surface px-5 text-[14px] font-semibold text-ink shadow-control transition-colors hover:bg-surface-2">
            {teaser.link}
            <Icon icon={ArrowRight} size={15} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
          </Link>
        </div>
      </section>
    )
  }
  ```
- [ ] **Step 2: Typecheck.** `npx tsc --noEmit -p . 2>&1 | grep sections/PricingTeaserSection.tsx` → expect no output.
- [ ] **Step 3: Commit.**
  ```
  git add src/pages/landing/sections/PricingTeaserSection.tsx
  git commit -m "feat(landing): add PricingTeaserSection reusing the pricing page's teaser copy"
  ```

---

### Task 13: ClosingCtaSection

**Files:**
- Create: `src/pages/landing/sections/ClosingCtaSection.tsx`

**Interfaces:**
- Produces: `export function ClosingCtaSection({ className }: { className?: string }): JSX.Element`
- Consumes: `useRevealOnScroll`, `cn`, `Icon`, `ArrowRight` from `lucide-react`, `Link` from `react-router-dom`, `NishanyMark` from `@/components/brand/Wordmark`, `TRIAL_PATH` from `./shared`.

- [ ] **Step 1: Create the file with the "priced for students" three-column pitch from PDF page 10, plus the closing CTA.**
  ```tsx
  import { Link } from 'react-router-dom'
  import { ArrowRight } from 'lucide-react'
  import { Icon } from '@/components/ui/Icon'
  import { NishanyMark } from '@/components/brand/Wordmark'
  import { cn } from '@/lib/cn'
  import { TRIAL_PATH, useRevealOnScroll } from './shared'

  const REASONS = [
    { title: 'Because we were students', line: 'We price for students because we were students — a wide, complete platform without the wide price tag. Full access starts with three free days, no card required.' },
    { title: 'Scholarships, because we understand', line: 'Scholarships are available for colleagues who need them, under their terms and conditions. No one left behind.' },
    { title: 'Speak medicine on day one', line: 'A dedicated medical-terminology track gives first-year students the language of the field — before it&rsquo;s assumed they already know it.' },
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
  ```
- [ ] **Step 2: Typecheck.** `npx tsc --noEmit -p . 2>&1 | grep sections/ClosingCtaSection.tsx` → expect no output.
- [ ] **Step 3: Commit.**
  ```
  git add src/pages/landing/sections/ClosingCtaSection.tsx
  git commit -m "feat(landing): add ClosingCtaSection with the priced-for-students pitch and final CTA"
  ```

---

### Task 14: Assemble LandingShell — compose the 12 sections for EN, keep AR verbatim

**Files:**
- Modify: `src/pages/landing/LandingShell.tsx` (full rewrite of the body; `MarketingShell`/`usePageMeta`/imports change)

**Interfaces:**
- Produces: `export function LandingShell({ content }: { content: LandingContent }): JSX.Element` (signature unchanged — `Landing.tsx` and `LandingAr.tsx` keep calling it exactly as today).
- Consumes: all 12 section components from `./sections/*`, `MarketingShell`, `usePageMeta`, `pricingFor`, `nishanyCopy`.

- [ ] **Step 1: Read the current file once more (`src/pages/landing/LandingShell.tsx`, 157 lines) to copy its Arabic-path JSX verbatim into the new branch — do not paraphrase it.**

- [ ] **Step 2: Rewrite `LandingShell.tsx`.** The English branch renders the 12 new sections in spec order; the Arabic branch is the file's current body, untouched, moved under `content.lang === 'ar'`. `TargetArtwork` and its trial-path constant are removed from this file (they now live in `HeroSection.tsx` / `sections/shared.ts`), but the `nishanyCopy`/`pricingFor`/`NishanyMark` imports the Arabic branch still needs stay.
  ```tsx
  import { Link, useLocation } from 'react-router-dom'
  import { ArrowRight, CalendarDays, Check } from 'lucide-react'
  import { Icon } from '@/components/ui/Icon'
  import { NishanyMark } from '@/components/brand/Wordmark'
  import { usePageMeta } from '@/lib/pageMeta'
  import { MarketingShell } from './MarketingShell'
  import { pricingFor } from './pricingContent'
  import { nishanyCopy } from './nishanyContent'
  import type { LandingContent } from './content'
  import { HeroSection } from './sections/HeroSection'
  import { RoadmapSection } from './sections/RoadmapSection'
  import { ConceptMasterySection } from './sections/ConceptMasterySection'
  import { WeakConceptSection } from './sections/WeakConceptSection'
  import { QuestionBankSection } from './sections/QuestionBankSection'
  import { CohortSection } from './sections/CohortSection'
  import { ToolkitSection } from './sections/ToolkitSection'
  import { BringYourBookSection } from './sections/BringYourBookSection'
  import { StudyTogetherSection } from './sections/StudyTogetherSection'
  import { TrustBandSection } from './sections/TrustBandSection'
  import { PricingTeaserSection } from './sections/PricingTeaserSection'
  import { ClosingCtaSection } from './sections/ClosingCtaSection'

  const TRIAL_PATH = '/signup?plan=maristana&period=term'

  /** Unchanged from the previous build: the pre-rebuild Arabic hero surface. */
  function TodaySurface({ c }: { c: ReturnType<typeof nishanyCopy> }) {
    return (
      <div className="relative">
        <div className="absolute -inset-x-3 top-8 bottom-8 -z-10 border-y border-line bg-surface-2/45" aria-hidden />
        <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-raised">
          <div className="grid-chart-major flex items-start justify-between gap-5 border-b border-line px-5 py-5 sm:px-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-primary-strong">{c.today.title}</p>
              <h3 className="mt-1.5 font-serif text-[20px] font-semibold text-ink">{c.today.university}</h3>
              <p className="mt-1 text-[11px] text-ink-3">{c.today.date}</p>
            </div>
            <span className="grid size-10 place-items-center rounded-xl border border-accent-line bg-accent-tint text-accent-strong"><Icon icon={CalendarDays} size={19} /></span>
          </div>
          <div className="p-4 sm:p-5">
            <div className="border-s-2 border-accent px-3 py-2.5">
              <div className="flex items-center justify-between gap-4"><p className="text-[10px] font-bold uppercase tracking-[0.07em] text-accent-strong">{c.today.institution}</p><span className="font-mono text-[10px] text-ink-3">{c.today.institutionTime}</span></div>
              <p className="mt-1.5 text-[13px] font-semibold text-ink">{c.today.module}</p>
            </div>
            <div className="my-3 ms-4 h-4 border-s border-dashed border-line-2" aria-hidden />
            <div className="border-s-2 border-line-2 px-3 py-2.5">
              <div className="flex items-center justify-between gap-4"><p className="text-[10px] font-bold uppercase tracking-[0.07em] text-ink-3">{c.today.personal}</p><span className="font-mono text-[10px] text-ink-3">{c.today.personalTime}</span></div>
              <p className="mt-1.5 text-[13px] font-semibold text-ink">مراجعة شرائح الباثولوجي</p>
            </div>
            <div className="mt-4 rounded-xl border border-primary-line bg-primary-tint p-4">
              <div className="flex items-center justify-between gap-3"><p className="text-[10px] font-bold uppercase tracking-[0.07em] text-primary-strong">{c.today.next}</p><span className="rounded-md bg-surface px-2 py-1 font-mono text-[9.5px] font-semibold text-primary-strong">{c.today.nextTime}</span></div>
              <p className="mt-2 text-[13px] font-semibold text-ink">اختبر فهمك: الاحتقان الوريدي</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-primary-line"><div className="h-full w-[62%] rounded-full bg-primary" /></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  export function LandingShell({ content }: { content: LandingContent }) {
    const c = nishanyCopy(content.lang)
    const pricing = pricingFor(c.lang)
    const location = useLocation()

    usePageMeta({
      title: c.lang === 'ar' ? 'Nishany · مذاكرة الطب، في قلب الهدف' : 'Nishany · Med school, right on target',
      description: c.lang === 'ar' ? c.hero.body : 'Nishany is built around each university’s own curriculum — clinical questions, OSCE stations, and a study engine that points at exactly what to learn next.',
      canonical: c.lang === 'ar' ? '/ar' : location.pathname === '/en' ? '/en' : '/',
      alternates: { en: '/en', ar: '/ar', 'x-default': '/' },
      ogImage: c.lang === 'ar' ? '/og-image-ar.png' : '/og-image.png',
      jsonLd: [{ '@context': 'https://schema.org', '@type': 'EducationalOrganization', name: 'Nishany by Connect', foundingDate: '2011', url: 'https://nishany.com' }],
    })

    if (content.lang === 'ar') {
      return (
        <MarketingShell c={content}>
          <section className="flex flex-col items-center pb-20 pt-10 text-center sm:pt-14 lg:pb-24">
            <h1 className="mt-5 max-w-3xl text-balance font-serif text-[40px] font-semibold leading-[1.06] tracking-[-0.03em] text-ink sm:text-[60px]">{c.hero.title}</h1>
            <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-ink-2 sm:text-[16.5px]">{c.hero.body}</p>
            <Link to={TRIAL_PATH} className="group mt-8 inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-6 text-[15px] font-semibold text-on-primary shadow-action transition-colors hover:bg-primary-hover">
              {c.hero.primary}
              <Icon icon={ArrowRight} size={17} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
            </Link>
            <p className="mt-4 inline-flex items-center gap-2 text-[12.5px] font-medium text-ink-2"><Icon icon={Check} size={14} className="text-success" />{c.hero.trust}</p>
          </section>
          <section id="why-nishany" className="grid scroll-mt-24 gap-10 border-t border-line py-16 sm:py-20 md:grid-cols-3 md:gap-14">
            {c.steps.map((step) => (
              <div key={step.k}>
                <p className="font-mono text-[13px] font-semibold text-primary-strong">{step.k}</p>
                <h2 className="mt-3 font-serif text-[22px] font-semibold text-ink">{step.title}</h2>
                <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-ink-2">{step.line}</p>
              </div>
            ))}
          </section>
          <section className="grid items-center gap-12 border-t border-line py-16 sm:py-24 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.09em] text-accent-strong">{c.proof.eyebrow}</p>
              <h2 className="mt-3 max-w-xl font-serif text-[30px] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[38px]">{c.proof.title}</h2>
              <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-ink-2">{c.proof.body}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                <span className="rounded-md border border-line bg-surface px-2.5 py-1.5 text-[10.5px] font-semibold text-ink-2">{c.proof.university}</span>
                <span className="rounded-md border border-line bg-surface px-2.5 py-1.5 text-[10.5px] font-semibold text-ink-2">{c.proof.year}</span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-success/25 bg-success-tint px-2.5 py-1.5 text-[10.5px] font-semibold text-success"><Icon icon={Check} size={12} />{c.proof.ready}</span>
              </div>
            </div>
            <TodaySurface c={c} />
          </section>
          <section className="flex flex-col items-start justify-between gap-5 border-t border-line py-12 sm:flex-row sm:items-center sm:py-14">
            <div>
              <h2 className="font-serif text-[24px] font-semibold text-ink">{c.pricing.title}</h2>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-2">{c.pricing.sub}</p>
            </div>
            <Link to={pricing.path} className="group inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg border border-line-2 bg-surface px-5 text-[14px] font-semibold text-ink shadow-control transition-colors hover:bg-surface-2">
              {c.pricing.cta}
              <Icon icon={ArrowRight} size={15} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
            </Link>
          </section>
          <section className="flex flex-col items-center border-t border-line py-20 text-center sm:py-24">
            <NishanyMark size={44} />
            <h2 className="mt-6 font-serif text-[32px] font-semibold tracking-[-0.02em] text-ink sm:text-[42px]">{c.close.title}</h2>
            <p className="mt-3 text-[14.5px] text-ink-2">{c.close.sub}</p>
            <Link to={TRIAL_PATH} className="group mt-7 inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-6 text-[15px] font-semibold text-on-primary shadow-action transition-colors hover:bg-primary-hover">
              {c.close.button}
              <Icon icon={ArrowRight} size={17} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
            </Link>
          </section>
        </MarketingShell>
      )
    }

    return (
      <MarketingShell c={content}>
        <HeroSection />
        <RoadmapSection id="why-nishany" />
        <ConceptMasterySection />
        <WeakConceptSection />
        <QuestionBankSection />
        <CohortSection />
        <ToolkitSection />
        <BringYourBookSection />
        <StudyTogetherSection />
        <TrustBandSection />
        <PricingTeaserSection />
        <ClosingCtaSection />
      </MarketingShell>
    )
  }
  ```
  Note the `why-nishany` anchor: the header's "Why Nishany" nav link (`MarketingShell.tsx:121`, `anchor('why-nishany')`) now scrolls to `RoadmapSection` (section 2) on the English page — the first substantive story section — matching where it pointed in the previous build (the section immediately after the hero).

- [ ] **Step 3: Typecheck the whole page.** `npx tsc --noEmit -p . 2>&1 | grep -E "LandingShell|sections/"` → expect no output.
- [ ] **Step 4: Start the dev server and browser-verify the English page.** Use `mcp__Claude_Browser__preview_start` with `name: "nishany"` (reads `.claude/launch.json`, `npm run dev` on port 5173), then `mcp__Claude_Browser__navigate` to `http://localhost:5173/en`. Expected: all 12 sections render top to bottom in the order above, the hero shows the نيشاني target artwork and "Med school, right on target.", the header's "Why Nishany" link scrolls to the roadmap/timeline section, and there are no console errors (`mcp__Claude_Browser__read_console_messages`). If `LiveCount` is still a stub/missing, the hero and trust band should render everything else around it without throwing — confirm no red error boundary appears.
- [ ] **Step 5: Browser-verify the Arabic page is unchanged.** Navigate to `http://localhost:5173/ar`. Expected: identical to production today — Arabic hero, three steps, one product surface ("Today in Nishany" / اليوم في نيشاني), pricing line, close — RTL, no English section content, no console errors.
- [ ] **Step 6: Commit.**
  ```
  git add src/pages/landing/LandingShell.tsx
  git commit -m "feat(landing): compose the 12-section English rebuild in LandingShell, keep AR unchanged"
  ```

---

### Task 15: Responsive pass, timeline bug-fix confirmation, and final visual QA

**Files:** none (verification-only; fixes here are small in-place edits to whichever section file needs them).

**Interfaces:** none — this task exercises the composed page from Task 14.

- [ ] **Step 1: Confirm the dev server is running (`nishany`, port 5173) and open `http://localhost:5173/en` at desktop width.** Use `mcp__Claude_Browser__resize_window` with `preset: "desktop"`, then scroll through the full page with `mcp__Claude_Browser__computer` (`scroll`, `down`, several times) taking a screenshot after each scroll. Expected: every section is legible, no horizontal scrollbar appears on the page body, panels keep their `rounded-2xl`/`shadow-panel` card look, and the crimson `TrustBandSection` band reads clearly against the surrounding page background in whichever theme is active.

- [ ] **Step 2: Zoom into the RoadmapSection timeline and confirm the bug fix.** Use `mcp__Claude_Browser__computer` `zoom` on the timeline SVG's screen region. Expected: each milestone circle's center sits exactly on the drawn crimson line at every zoom level — no visible gap or offset between a dot and the path beneath it, at "Day one", "Years 1–3", "Clinical years", and "Residency & boards". If any dot appears off the line, the bug is in `RoadTimeline()` in `RoadmapSection.tsx` — re-check that the `<circle>` `cx`/`cy` for that milestone reads directly from the same `ROAD_MILESTONES[i].x`/`.y` used to build the `d` string segment touching it (not a separately-computed or hardcoded number), fix, and re-zoom to confirm before moving on.

- [ ] **Step 3: Resize to a phone width and re-check the same page.** Use `mcp__Claude_Browser__resize_window` with `width: 390, height: 844` (iPhone 12/13/14-class viewport). Reload `/en`. Expected: the header collapses to the mobile menu (hamburger), the hero stacks and the target artwork shrinks per its existing `w-[256px] sm:w-[340px]` classes, every two/three/four-column grid in the sections collapses to a single column (all section grids use `sm:grid-cols-*`/`lg:grid-cols-*` with no unqualified `grid-cols-*`, so verify no section overflows horizontally), the `RoadTimeline` SVG scales down with its container (it's `viewBox`-based and `w-full`) and its dots still sit on the line, and the `TrustBandSection` number stays readable at the smaller `text-[56px]` size. Confirm no horizontal scrollbar with `mcp__Claude_Browser__read_page` or a screenshot at the page edges.

- [ ] **Step 4: Confirm `prefers-reduced-motion` still degrades correctly.** Use `mcp__Claude_Browser__resize_window` `colorScheme` is unrelated — instead set the emulated preference via `mcp__Claude_Browser__javascript_tool` (`javascript_exec`, read-only check): confirm `window.matchMedia('(prefers-reduced-motion: reduce)').matches` reflects the OS/browser setting, and if a reduced-motion profile is available in this environment, reload the page with it on and confirm sections appear immediately without a visible fade/rise (per the global CSS rule in `index.css:950-957` — no code change expected here, this is a read-only confirmation).

- [ ] **Step 5: Confirm the two CTA destinations.** Click the hero's "Start 3 days free" button and confirm the URL becomes `/signup?plan=maristana&period=term`; navigate back, click the pricing teaser's link, and confirm it lands on `/pricing`. Both are existing routes (`src/router.tsx:373,386`) — no router changes are needed in this plan.

- [ ] **Step 6: Reset the emulated viewport back to desktop** with `mcp__Claude_Browser__resize_window` `preset: "desktop"` before finishing, so the pane is left in its normal state.

- [ ] **Step 7: Final commit only if Steps 1-5 required any fixes.** If everything passed as written, there is nothing to commit for this task. If a fix was needed (e.g. the timeline coordinate bug found in Step 2, or an overflow found in Step 3), stage exactly the file(s) touched and commit:
  ```
  git add <fixed files>
  git commit -m "fix(landing): <describe the specific responsive/timeline fix>"
  ```

---

## Self-review: spec coverage

| Spec requirement | Task |
|---|---|
| 1. Hero (نيشاني target, "Med school, right on target.", subhead, primary CTA → `/signup?plan=maristana&period=term`, compact live count) | Task 2 (`HeroSection`) |
| 2. "A decade with the doctors above you" / "one method, the whole road" timeline | Task 3 (`RoadmapSection`) |
| 3. "We grade understanding, not just accuracy" (concept rings) | Task 4 (`ConceptMasterySection`) |
| 4. "Never let a weak concept survive" (3-step drill) | Task 5 (`WeakConceptSection`) |
| 5. "Every format your exams throw at you, in one bank" (4 formats) | Task 6 (`QuestionBankSection`) |
| 6. "Compare yourself — anonymously" (cohort) | Task 7 (`CohortSection`) |
| 7. "Everything a study session needs, built in" (toolkit) | Task 8 (`ToolkitSection`) |
| 8. "Your material, our tools" (BYO book) | Task 9 (`BringYourBookSection`) |
| 9. "Momentum you can share" (study party) | Task 10 (`StudyTogetherSection`) |
| 10. Trust band ("790 students…", large live count) | Task 11 (`TrustBandSection`) |
| 11. Pricing teaser | Task 12 (`PricingTeaserSection`) |
| 12. Closing CTA + footer | Task 13 (`ClosingCtaSection`) body + `MarketingShell` footer (unmodified, already wraps every branch) |
| Timeline dots-on-track bug fix | Task 3 (shared-coordinate technique) + re-confirmed visually in Task 15 Step 2 |
| EN/AR constraint (AR keeps rendering current content, no RTL redesign) | Task 14 (explicit `content.lang === 'ar'` branch keeping the current JSX verbatim) + re-confirmed in Task 14 Step 5 |
| Warm theme tokens only, no invented colors | Architecture section (confirmed `data-theme` is global via `ThemeSwitch`, not per-page) + every task's Steps use only semantic Tailwind classes/`var(--color-*)` |
| Subtle scroll-in motion, `prefers-reduced-motion` respected | Task 1 (`useRevealOnScroll` + reused `animate-rise`/global reduced-motion rule) + Task 15 Step 4 |
| LiveCount/useSubscriberCount consumed, not reimplemented | Plan header Dependencies + Task 2, Task 11 |
| Responsive verification (desktop + ~390px) | Task 15 Steps 1 and 3 |
| SEO (`usePageMeta`/JSON-LD) kept | Task 14 Step 2 (unchanged `usePageMeta` call, both language branches) |

**Nothing in the spec's Section 4 scope was left unmapped.** One explicit scope note carried over from the spec rather than resolved here: "no Arabic/RTL redesign in this pass" — Task 14 satisfies this by leaving the Arabic branch's markup byte-for-byte the same as today, not by translating or adapting the new 12-section design; a future RTL pass is out of scope, as the spec itself states.
