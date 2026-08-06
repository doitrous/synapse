import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import {
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  Globe,
  BookOpen,
  ListChecks,
  Stethoscope,
  CalendarDays,
  LineChart,
  FolderOpen,
  PenTool,
  Users,
} from 'lucide-react'
import { Wordmark } from '@/components/brand/Wordmark'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'

/* ---- A live specimen of the product, to prove rather than claim --------- */

function ReferenceBar({ value }: { value: number }) {
  return (
    <div className="relative pt-2.5">
      <div className="absolute top-0 z-10 -translate-x-1/2" style={{ left: `${value}%` }} aria-hidden>
        <svg width="9" height="6" viewBox="0 0 9 6" className="fill-ink">
          <path d="M4.5 6 0 0h9z" />
        </svg>
      </div>
      <div className="relative flex h-2.5 overflow-hidden rounded-full">
        <div className="bg-danger/20" style={{ width: '40%' }} />
        <div className="bg-warning/25" style={{ width: '30%' }} />
        <div className="bg-success/25" style={{ width: '30%' }} />
        <span
          className="absolute inset-y-0 w-0.5 -translate-x-1/2 rounded-full bg-ink"
          style={{ left: `${value}%` }}
          aria-hidden
        />
      </div>
    </div>
  )
}

function Specimen() {
  return (
    <div className="grid-chart-major rounded-2xl border border-line bg-surface-2/60 p-5 sm:p-8">
      <Panel className="mx-auto max-w-sm shadow-raised">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <h3 className="font-sans text-[13px] font-semibold text-ink">Today · your focus</h3>
          <span className="tnum font-mono text-[12px] text-ink-3">31 Jul</span>
        </div>

        <div className="space-y-4 p-4">
          <div className="flex items-center gap-3">
            <span className="tnum font-mono text-[15px] font-medium text-ink">09:00</span>
            <span className="size-2 rounded-full" style={{ backgroundColor: '#a8462f' }} />
            <span className="flex-1 truncate text-[13.5px] text-ink">
              Heart failure: pathophysiology
            </span>
            <Badge tone="accent">Lecture</Badge>
          </div>

          <div className="border-t border-line pt-3">
            <div className="flex items-baseline justify-between">
              <span className="text-[12.5px] font-medium text-ink-2">Exam readiness</span>
              <span className="tnum font-mono text-[15px] font-semibold text-ink">68%</span>
            </div>
            <ReferenceBar value={68} />
          </div>

          <div className="space-y-2 border-t border-line pt-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">
              Deserves attention
            </p>
            <div className="flex items-center gap-2.5">
              <span className="size-2 rounded-full" style={{ backgroundColor: '#a8462f' }} />
              <span className="flex-1 truncate text-[13px] text-ink">Acute coronary syndromes</span>
              <Badge tone="danger">Overdue</Badge>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="size-2 rounded-full" style={{ backgroundColor: '#c06a3f' }} />
              <span className="flex-1 truncate text-[13px] text-ink">Diuretics: sites of action</span>
              <Badge tone="warning">Due today</Badge>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  )
}

/* ---- Pathway doors ------------------------------------------------------ */

function PrimaryDoor() {
  return (
    <Link
      to="/app"
      className="group flex items-center gap-4 rounded-xl bg-accent p-4 text-on-accent shadow-panel transition-all hover:bg-accent-strong hover:shadow-raised sm:p-5"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-white/12 ring-1 ring-white/15">
        <Icon icon={GraduationCap} size={22} className="text-on-accent" />
      </span>
      <span className="flex-1">
        <span className="block text-[15px] font-semibold">Enter as a student</span>
        <span className="block text-[13px] text-on-accent/80">
          Dashboard, library, question bank, practicals and more
        </span>
      </span>
      <Icon
        icon={ArrowRight}
        size={20}
        className="text-on-accent/80 transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  )
}

function SecondaryDoor() {
  return (
    <Link
      to="/admin"
      className="group flex items-center gap-4 rounded-xl border border-line bg-surface p-4 text-ink shadow-panel transition-all hover:border-line-2 hover:shadow-raised sm:p-5"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-line bg-surface-2 text-ink-2">
        <Icon icon={ShieldCheck} size={22} />
      </span>
      <span className="flex-1">
        <span className="block text-[15px] font-semibold">Admin console</span>
        <span className="block text-[13px] text-ink-3">
          Curriculum, content, payments and governance
        </span>
      </span>
      <Icon
        icon={ArrowRight}
        size={20}
        className="text-ink-3 transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  )
}

/* ---- Inside Synapse (a chart-index, not a card grid) ---------------------- */

const INSIDE: { icon: LucideIcon; label: string; line: string }[] = [
  { icon: BookOpen, label: 'Library', line: 'Every topic and subtopic in one place' },
  { icon: ListChecks, label: 'Question Bank', line: 'Explained answers, linked to the library' },
  { icon: Stethoscope, label: 'Practical', line: 'OSCE, cases, skills, lab & imaging' },
  { icon: CalendarDays, label: 'Calendar', line: 'Curriculum and your plan, one view' },
  { icon: LineChart, label: 'Performance', line: 'By subject, by question type, over time' },
  { icon: FolderOpen, label: 'Resources', line: 'Books, videos and guidelines, filtered' },
  { icon: PenTool, label: 'Whiteboard', line: 'An infinite canvas to connect ideas' },
  { icon: Users, label: 'Study Together', line: 'Solve a shared test from a link' },
]

export function Landing() {
  // The English marketing page is always LTR, regardless of any in-app
  // language preference the visitor may have set.
  useEffect(() => {
    const el = document.documentElement
    el.dir = 'ltr'
    el.lang = 'en'
  }, [])
  return (
    <div className="min-h-dvh">
      <header className="mx-auto flex max-w-[1140px] items-center justify-between px-5 py-5 sm:px-8">
        <Wordmark />
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            to="/ar"
            lang="ar"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink-2 transition-colors hover:text-ink"
          >
            <Icon icon={Globe} size={15} />
            العربية
          </Link>
          <Link
            to="/app"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink-2 transition-colors hover:text-ink"
          >
            Sign in
            <Icon icon={ArrowRight} size={15} />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1140px] px-5 pb-20 sm:px-8">
        <section className="grid items-center gap-10 pt-8 lg:grid-cols-2 lg:gap-14 lg:pt-16">
          <div>
            <h1 className="max-w-xl font-serif text-[38px] font-semibold leading-[1.05] tracking-[-0.025em] text-ink text-balance sm:text-[52px]">
              See exactly what to study next.
            </h1>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-ink-2">
              Synapse brings your library, question bank, practicals, and schedule into one calm
              clinical workspace for undergraduate medicine — then tells you what deserves attention
              today.
            </p>

            <div className="mt-8 flex max-w-md flex-col gap-3">
              <PrimaryDoor />
              <SecondaryDoor />
            </div>

            <p className="mt-6 text-[13px] text-ink-3">
              Built around spaced repetition and the organ-system curriculum.
            </p>
          </div>

          <div className="lg:pl-4">
            <Specimen />
          </div>
        </section>

        <section className="mt-20 border-t border-line pt-10">
          <h2 className="font-serif text-[22px] font-semibold tracking-[-0.015em] text-ink">
            Everything in one place
          </h2>
          <dl className="mt-6 grid gap-x-10 sm:grid-cols-2">
            {INSIDE.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 border-b border-line py-4"
              >
                <Icon icon={item.icon} size={18} className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <dt className="text-[14px] font-semibold text-ink">{item.label}</dt>
                  <dd className="mt-0.5 text-[13px] text-ink-2">{item.line}</dd>
                </div>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1140px] flex-col items-start justify-between gap-3 px-5 py-6 text-[12.5px] text-ink-3 sm:flex-row sm:items-center sm:px-8">
          <div className="flex items-center gap-2">
            <Wordmark />
          </div>
          <p className="max-w-md sm:text-right">
            A demonstration build. Content is illustrative for undergraduate medical education, not
            clinical guidance.
          </p>
        </div>
      </footer>
    </div>
  )
}
