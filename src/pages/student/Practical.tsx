import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import {
  Stethoscope,
  ClipboardList,
  ListChecks,
  ScanLine,
  Clock,
  ArrowRight,
  CircleCheck,
  CircleDashed,
  CircleAlert,
  CircleX,
  FlaskConical,
  MessagesSquare,
  Eye,
  EyeOff,
  ChevronRight,
  Mic,
} from 'lucide-react'
import type { Skill } from '@/data/practical'
import { skills, oralQuestions } from '@/data/practical'
import { useCatalogueAvailability } from '@/lib/useCatalogueAvailability'
import { CatalogueUnavailable } from '@/components/ui/CatalogueUnavailable'
import { summariseSkills, type OralMark, type SkillStatus } from '@/data/practicalProgress'
import type { Difficulty } from '@/data/qbank'
import { useLivePracticals } from '@/lib/useLivePracticals'
import { usePracticalProgress } from '@/lib/usePracticalProgress'
import { EmptyState } from '@/components/ui/EmptyState'
import { subjects } from '@/data/subjects'
import { cn } from '@/lib/cn'
import { formatRelativeTime } from '@/lib/format'
import { getSubject } from '@/data/subjects'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Meter } from '@/components/ui/Meter'
import { Tabs } from '@/components/ui/Tabs'
import { Microscope as MicroscopeIcon } from 'lucide-react'
import { Microscope } from '@/components/practical/Microscope'
import { SlideViewer } from '@/components/practical/SlideViewer'
import type { MicroscopeTransitionRect } from '@/components/practical/microscopeTransition'
import { useLiveHistology } from '@/lib/useLiveHistology'
import type { HistologySlide } from '@/data/histology'
import { SystemMark } from '@/components/ui/SystemMark'
import { PracticalRunner } from '@/components/practical/PracticalRunner'
import type { RunnerTarget } from '@/components/practical/PracticalRunner'
import { ConceptText } from '@/components/concepts/ConceptText'
import { useT } from '@/lib/i18n'

type Open = (target: RunnerTarget) => void

function diffTone(d: Difficulty): 'success' | 'warning' | 'danger' {
  return d === 'Easy' ? 'success' : d === 'Moderate' ? 'warning' : 'danger'
}

/** Row that opens the runner on click or Enter. */
function clickable(onOpen: () => void) {
  return {
    role: 'button' as const,
    tabIndex: 0,
    onClick: onOpen,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onOpen()
      }
    },
    className:
      'flex cursor-pointer flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3.5 transition-colors hover:bg-inset/60 focus-visible:bg-inset focus-visible:outline-none',
  }
}

/**
 * Any practical list, divided by system.
 *
 * Oral questions were grouped by subject and the other four tabs were flat, so
 * the same catalogue was organised one way on one tab and not at all on the
 * next. Catalogue order first, then any system the catalogue does not list —
 * nothing is dropped for being unrecognised.
 */
function SystemSections<T extends { id: string; subjectId: string }>({
  items,
  children,
}: {
  items: T[]
  children: (item: T, indexInSystem: number) => ReactNode
}) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())
  const groups = useMemo(() => {
    const buckets = new Map<string, T[]>()
    for (const item of items) {
      const key = item.subjectId || 'unfiled'
      const bucket = buckets.get(key)
      if (bucket) bucket.push(item)
      else buckets.set(key, [item])
    }
    const known = subjects.map((subject) => subject.id).filter((id) => buckets.has(id))
    const rest = [...buckets.keys()].filter((key) => !known.includes(key)).sort()
    return [...known, ...rest].map((key) => ({ key, items: buckets.get(key)! }))
  }, [items])

  return (
    <div className="space-y-3">
      {groups.map((group) => {
        const isCollapsed = collapsed.has(group.key)
        return (
          <Panel key={group.key} className="overflow-hidden">
            <button
              type="button"
              aria-expanded={!isCollapsed}
              onClick={() => setCollapsed((current) => {
                const next = new Set(current)
                if (!next.delete(group.key)) next.add(group.key)
                return next
              })}
              className="flex w-full items-center gap-2.5 border-b border-line bg-surface-2/50 px-4 py-2.5 text-start transition-colors hover:bg-inset/60"
            >
              <Icon icon={ChevronRight} size={15} className={cn('text-ink-3 chevron-turn')} open={!isCollapsed} />
              <SystemMark subjectId={group.key} />
              <h2 className="font-serif text-[15.5px] font-semibold text-ink">{getSubject(group.key).name}</h2>
              <span className="tnum ms-auto font-mono text-[11px] text-ink-3">{group.items.length}</span>
            </button>
            {!isCollapsed && (
              <ul className="divide-y divide-line">
                {group.items.map((item, index) => <li key={item.id}>{children(item, index)}</li>)}
              </ul>
            )}
          </Panel>
        )
      })}
    </div>
  )
}

/* ---- OSCE -------------------------------------------------------------- */

function OsceTab({ onOpen }: { onOpen: Open }) {
  const { osceStations } = useLivePracticals()
  const availability = useCatalogueAvailability(osceStations.length)
  const { progress } = usePracticalProgress()

  if (availability.kind !== 'ready') {
    return (
      <Panel className="p-8">
        <CatalogueUnavailable
          availability={availability}
          empty={{ title: 'No stations published yet', description: 'OSCE stations and skills checklists appear here once they are published in Practical Setup.' }}
        />
      </Panel>
    )
  }

  return (
    <SystemSections items={osceStations}>
      {(s) => {
        // The student's own record, not a property of the station.
        const run = progress.stations[s.id]
        const bestPct = run && run.outOf ? Math.round((run.bestMarks / run.outOf) * 100) : null
        const open = () =>
          onOpen({ kind: 'osce', id: s.id, title: s.title, subjectId: s.subjectId, minutes: s.minutes })
        return (
          <div {...clickable(open)}>
            <span className="grid size-10 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-ink-2">
              <Icon icon={Stethoscope} size={18} />
            </span>
            <div className="min-w-0 flex-1">
              {/* The system header already names the system, and the number
                  beside it was only the row's position in a flat list. */}
              <p className="text-[14px] font-medium text-ink">{s.title}</p>
              <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[12px] text-ink-3">
                <span>{s.minutes} min</span>
                <span>·</span>
                <span>{s.marks} marks</span>
              </p>
            </div>
            {s.kind === 'checklist' && <Badge tone="outline">Checklist</Badge>}
            <Badge tone={diffTone(s.difficulty)}>{s.difficulty}</Badge>
            <div className="w-24 text-end">
              {run ? (
                <>
                  <p className="tnum font-mono text-[13px] font-medium text-ink">{bestPct}%</p>
                  <p className="text-[11px] text-ink-3">
                    best · {run.attempts} {run.attempts === 1 ? 'try' : 'tries'}
                  </p>
                </>
              ) : (
                <p className="text-[11.5px] text-ink-3">Not attempted</p>
              )}
            </div>
            <Button
              variant={run ? 'secondary' : 'primary'}
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                open()
              }}
            >
              {run ? 'Retry' : 'Start'}
            </Button>
          </div>
        )
      }}
    </SystemSections>
  )
}

/* ---- Cases ------------------------------------------------------------- */

function caseStatus(status: string) {
  if (status === 'completed') return { tone: 'success' as const, label: 'Completed', cta: 'Review' }
  if (status === 'in-progress') return { tone: 'primary' as const, label: 'In progress', cta: 'Continue' }
  return { tone: 'neutral' as const, label: 'Not started', cta: 'Start' }
}

function CasesTab({ onOpen }: { onOpen: Open }) {
  const { clinicalCases } = useLivePracticals()
  const availability = useCatalogueAvailability(clinicalCases.length)
  const { progress } = usePracticalProgress()

  if (availability.kind !== 'ready') {
    return (
      <Panel className="p-8">
        <CatalogueUnavailable
          availability={availability}
          empty={{ title: 'No cases published yet', description: 'Clinical cases appear here once they are published in Practical Setup.' }}
        />
      </Panel>
    )
  }

  return (
    <SystemSections items={clinicalCases}>
      {(c) => {
        const record = progress.cases[c.id]
        const st = caseStatus(record?.status ?? 'not-started')
        const open = () => onOpen({ kind: 'case', id: c.id, title: c.title, subjectId: c.subjectId })
        return (
          <div {...clickable(open)}>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-[14px] font-medium text-ink">{c.title}</p>
                <Badge tone={st.tone}>{st.label}</Badge>
              </div>
              <p className="mt-0.5 text-[13px] text-ink-2">{c.presentation}</p>
              <p className="mt-1 flex items-center gap-x-2 text-[12px] text-ink-3">
                <span className="inline-flex items-center gap-1">
                  <Icon icon={Clock} size={12} />
                  {c.minutes} min
                </span>
                <span>·</span>
                <span>{c.steps} steps</span>
              </p>
            </div>
            <Button
              variant={record?.status === 'in-progress' ? 'primary' : 'secondary'}
              size="sm"
              iconRight={ArrowRight}
              onClick={(e) => {
                e.stopPropagation()
                open()
              }}
            >
              {st.cta}
            </Button>
          </div>
        )
      }}
    </SystemSections>
  )
}

/* ---- Skills ------------------------------------------------------------ */

/** The next state each tap moves a skill to, cycling through the three. */
const NEXT_STATUS: Record<SkillStatus, SkillStatus> = {
  'not-started': 'practised',
  practised: 'ready',
  ready: 'not-started',
}

const STATUS_LABEL: Record<SkillStatus, string> = {
  'not-started': 'Not started',
  practised: 'Practised',
  ready: 'Ready',
}

function SkillRow({ skill, status, onCycle }: { skill: Skill; status: SkillStatus; onCycle: () => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={onCycle}
        className="flex w-full items-center gap-3 border-b border-line px-4 py-2.5 text-start transition-colors last:border-b-0 hover:bg-inset"
        aria-label={`${skill.name} — ${STATUS_LABEL[status]}. Change`}
      >
        <span className="flex-1 text-[13px] text-ink">{skill.name}</span>
        <Badge tone={status === 'ready' ? 'success' : status === 'practised' ? 'accent' : 'neutral'}>
          {STATUS_LABEL[status].toUpperCase()}
        </Badge>
      </button>
    </li>
  )
}

/** A small ring showing `value`/`total` as an arc, matching the artboard's summary dial. */
function ProgressRing({ value, total, size = 76 }: { value: number; total: number; size?: number }) {
  const r = size / 2 - 7
  const circumference = 2 * Math.PI * r
  const frac = total ? value / total : 0
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
      >
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={7} className="stroke-inset" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={7}
          strokeLinecap="round"
          className="stroke-success transition-[stroke-dasharray] duration-500"
          strokeDasharray={`${frac * circumference} ${circumference}`}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="tnum font-mono text-[16px] font-semibold text-ink">
          {value}
          <span className="text-[11px] font-medium text-ink-3">/{total}</span>
        </span>
      </div>
    </div>
  )
}

/**
 * The year's skills checklist, marked by the student.
 *
 * This tab previously had no interactive element at all: it rendered twelve
 * skills with six sign-offs attributed to named clinicians and dates, under a
 * headline claiming "14 / 22 signed off". A student can now record what they
 * have practised and what they are ready to be assessed on — and the copy is
 * explicit that this is their own record, not a sign-off, because no assessor
 * identity exists in Maristana to give one.
 */
function SkillsTab({ onGoToOsce }: { onGoToOsce: () => void }) {
  const categories = ['Examination', 'Procedures', 'Communication'] as const
  const { progress, markSkill } = usePracticalProgress()
  const summary = summariseSkills(progress, skills.length)
  const readyPct = summary.total ? (summary.ready / summary.total) * 100 : 0
  const practisedOnlyPct = summary.total ? ((summary.practised - summary.ready) / summary.total) * 100 : 0

  const lastAt = useMemo(() => {
    const stamps = Object.values(progress.skills).map((s) => s.lastAt)
    return stamps.length ? stamps.sort().at(-1) : undefined
  }, [progress.skills])

  if (!skills.length) {
    return <Panel className="p-8"><EmptyState icon={CircleCheck} title="No skills checklist yet" description="The year's skills checklist appears here once it has been set up." /></Panel>
  }

  return (
    <div className="space-y-4">
      <p className="text-[11.5px] text-ink-3">Tap a skill to cycle: not started → practised → ready.</p>

      <Panel className="flex flex-wrap items-center gap-5 p-4">
        <ProgressRing value={summary.ready} total={summary.total} />
        <div className="min-w-[220px] flex-1">
          <p className="font-serif text-[15px] font-semibold text-ink">Skills you have marked ready</p>
          <p className="mt-0.5 text-[12px] text-ink-3">
            {summary.total - summary.ready} still to go · {summary.practised - summary.ready} practised so far
            {lastAt ? ` · updated ${formatRelativeTime(lastAt)}` : ''}
          </p>
          <div className="mt-2 flex h-2 w-full max-w-md overflow-hidden rounded-full bg-inset">
            <span className="h-full bg-success" style={{ width: `${readyPct}%` }} />
            <span className="h-full bg-accent" style={{ width: `${practisedOnlyPct}%` }} />
          </div>
        </div>
        <p className="max-w-[260px] rounded-lg border border-dashed border-line-2 bg-surface-2/40 px-3.5 py-2.5 text-[11px] leading-relaxed text-ink-3">
          This is your own record for planning revision — a formal sign-off is given by an assessor and is not recorded here.
        </p>
      </Panel>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const items = skills.filter((s) => s.category === cat)
          if (items.length === 0) return null
          const readyInCat = items.filter((s) => progress.skills[s.id]?.status === 'ready').length
          const suggestion = items.find((s) => (progress.skills[s.id]?.status ?? 'not-started') !== 'ready')

          return (
            <Panel key={cat} className="flex flex-col overflow-hidden">
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                <p className="text-[13px] font-semibold text-ink">{cat}</p>
                <span className="tnum font-mono text-[11px] text-ink-3">{readyInCat}/{items.length} ready</span>
              </div>
              <ul>
                {items.map((skill) => {
                  const status = progress.skills[skill.id]?.status ?? 'not-started'
                  return (
                    <SkillRow
                      key={skill.id}
                      skill={skill}
                      status={status}
                      onCycle={() => markSkill(skill.id, NEXT_STATUS[status])}
                    />
                  )
                })}
              </ul>
              <div className="mt-auto border-t border-line px-4 py-2.5">
                {cat === 'Communication' ? (
                  suggestion ? (
                    <>
                      <p className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">Suggested next</p>
                      <p className="mt-1 text-[12px] leading-relaxed text-ink-2">
                        <span className="font-medium text-ink">{suggestion.name}</span> — practise this to close the gap.
                      </p>
                    </>
                  ) : (
                    <p className="text-[11.5px] text-success">All communication skills are marked ready.</p>
                  )
                ) : (
                  <button
                    type="button"
                    onClick={onGoToOsce}
                    className="text-[11px] font-medium text-primary hover:text-primary-hover"
                  >
                    Practise in OSCE stations →
                  </button>
                )}
              </div>
            </Panel>
          )
        })}
      </div>
    </div>
  )
}

/* ---- Lab & imaging ----------------------------------------------------- */

function LabTab({ onOpen }: { onOpen: Open }) {
  const { labImaging } = useLivePracticals()
  const availability = useCatalogueAvailability(labImaging.length)
  const { progress } = usePracticalProgress()

  if (availability.kind !== 'ready') {
    return (
      <Panel className="p-8">
        <CatalogueUnavailable
          availability={availability}
          empty={{ title: 'No lab or imaging sets yet', description: 'Interpretation sets appear here once they are published in Practical Setup.' }}
        />
      </Panel>
    )
  }

  return (
    <SystemSections items={labImaging}>
      {(l) => {
        const done = progress.labs[l.id]?.done ?? 0
        const pct = l.items ? Math.round((done / l.items) * 100) : 0
        const open = () => onOpen({ kind: 'lab', id: l.id, title: l.title, subjectId: l.subjectId })
        return (
          <div {...clickable(open)}>
            <span className="grid size-10 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-ink-2">
              <Icon icon={l.type === 'Lab' ? FlaskConical : ScanLine} size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-[14px] font-medium text-ink">{l.title}</p>
                <Badge tone="neutral">{l.type}</Badge>
              </div>
              <p className="mt-0.5 flex items-center gap-x-2 text-[12px] text-ink-3">
                <span className="tnum">
                  {done}/{l.items} done
                </span>
              </p>
            </div>
            <Meter value={pct} tone="primary" className="w-28" />
            <Button
              variant="secondary"
              size="sm"
              iconRight={ArrowRight}
              onClick={(e) => {
                e.stopPropagation()
                open()
              }}
            >
              {done === 0 ? 'Start' : 'Continue'}
            </Button>
          </div>
        )
      }}
    </SystemSections>
  )
}

/* ---- Page -------------------------------------------------------------- */

/* ---- Oral questions ---------------------------------------------------- */

const ORAL_MARK_META: Record<OralMark, { icon: typeof CircleCheck; cls: string; label: string }> = {
  got: { icon: CircleCheck, cls: 'text-success', label: 'Got it' },
  partly: { icon: CircleAlert, cls: 'text-warning', label: 'Partly' },
  missed: { icon: CircleX, cls: 'text-danger', label: 'Missed it' },
}

function formatTimer(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

/**
 * One question rehearsed at a time — attempt it aloud, reveal the model
 * answer, then mark yourself before moving on. The self-mark persists via
 * `usePracticalProgress` (`oral`), so it survives a reload; only the reveal
 * state and the "answer aloud" timer stay session-local, since replaying
 * whether the model answer was on screen a moment ago has no lasting value.
 */
function OralTab() {
  const flat = useMemo(() => {
    const known = subjects.filter((s) => oralQuestions.some((q) => q.subjectId === s.id))
    return known.flatMap((subj) => oralQuestions.filter((q) => q.subjectId === subj.id).map((q) => ({ ...q, subjectName: subj.name })))
  }, [])
  const groups = useMemo(
    () =>
      subjects
        .map((subj) => ({ subj, questions: oralQuestions.filter((q) => q.subjectId === subj.id) }))
        .filter((g) => g.questions.length > 0),
    [],
  )

  const { progress, markOral } = usePracticalProgress()
  const marks = progress.oral ?? {}

  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const tick = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running) {
      tick.current = setInterval(() => setElapsed((e) => e + 1), 1000)
      return () => { if (tick.current) clearInterval(tick.current) }
    }
  }, [running])

  const goTo = (i: number) => {
    setIndex(Math.min(Math.max(i, 0), flat.length - 1))
    setRevealed(false)
    setRunning(false)
    setElapsed(0)
  }

  if (!flat.length) {
    return <Panel className="p-8"><EmptyState icon={MessagesSquare} title="No oral questions yet" description="Viva questions appear here once they are published in Practical Setup." /></Panel>
  }

  const current = flat[index]
  const doneCount = flat.filter((q) => marks[q.id]?.mark === 'got').length
  const partlyCount = flat.filter((q) => marks[q.id]?.mark === 'partly').length
  const answeredCount = flat.filter((q) => marks[q.id]).length
  const isLast = index === flat.length - 1

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="primary">Viva rehearsal</Badge>
        <span className="tnum font-mono text-[11.5px] text-ink-3">
          Question {index + 1} of {flat.length} · {current.subjectName}
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        {/* Rehearsal column */}
        <div className="flex flex-col gap-3">
          <Panel className="flex flex-col items-center gap-3 p-6 text-center">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">The examiner asks</span>
            <h1 className="font-serif text-[19px] font-semibold leading-snug text-ink sm:text-[21px]">
              &ldquo;{current.question}&rdquo;
            </h1>
            <Badge tone="outline">{current.topic}</Badge>
            <div className="mt-1 flex flex-wrap items-center justify-center gap-2.5">
              <Button
                variant="secondary"
                size="sm"
                iconLeft={Mic}
                onClick={() => setRunning((r) => !r)}
                aria-pressed={running}
              >
                {running ? `Answering aloud · ${formatTimer(elapsed)}` : elapsed > 0 ? `Paused · ${formatTimer(elapsed)}` : 'Answer aloud'}
              </Button>
              {!revealed && (
                <Button
                  variant="primary"
                  size="sm"
                  iconLeft={Eye}
                  onClick={() => { setRevealed(true); setRunning(false) }}
                >
                  Reveal the model answer
                </Button>
              )}
            </div>
            <p className="flex items-center gap-1.5 text-[11px] text-ink-3">
              <MessagesSquare size={12} /> Say it out loud before revealing — recognising an answer isn&rsquo;t the same as producing one.
            </p>
          </Panel>

          {revealed && (
            <Panel className="p-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-primary-strong">
                  <CircleCheck size={13} /> Model answer
                </span>
                <Button variant="ghost" size="sm" iconLeft={EyeOff} onClick={() => setRevealed(false)}>Hide</Button>
              </div>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink"><ConceptText text={current.modelAnswer} /></p>

              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-3">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">How did you do?</span>
                {(Object.keys(ORAL_MARK_META) as OralMark[]).map((m) => {
                  const meta = ORAL_MARK_META[m]
                  const active = marks[current.id]?.mark === m
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => markOral(current.id, m)}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-md border px-3 py-1 text-[12px] font-medium transition-colors',
                        active
                          ? m === 'got'
                            ? 'border-success/40 bg-success-tint text-success'
                            : m === 'partly'
                              ? 'border-warning/40 bg-warning-tint text-warning'
                              : 'border-danger/40 bg-danger-tint text-danger'
                          : 'border-line-2 bg-surface text-ink-2 hover:bg-inset',
                      )}
                    >
                      <Icon icon={meta.icon} size={13} className={active ? '' : 'text-ink-3'} />
                      {meta.label}
                    </button>
                  )
                })}
                <span className="ms-auto text-[10.5px] text-ink-3">Self-marked · never counts toward accuracy</span>
                <Button variant="primary" size="sm" iconRight={ArrowRight} disabled={isLast} onClick={() => goTo(index + 1)}>
                  {isLast ? 'Last question' : 'Next'}
                </Button>
              </div>
            </Panel>
          )}
        </div>

        {/* Queue rail */}
        <Panel className="flex max-h-[560px] flex-col overflow-hidden p-2">
          <p className="px-2 pb-1.5 pt-1 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">
            Tonight&rsquo;s queue · by module
          </p>
          <div className="flex-1 space-y-0.5 overflow-y-auto">
            {groups.map(({ subj, questions }) => (
              <div key={subj.id}>
                <p className="px-2 pb-1 pt-2 text-[11px] font-semibold text-ink-2">{subj.name}</p>
                {questions.map((q) => {
                  const i = flat.findIndex((f) => f.id === q.id)
                  const mark = marks[q.id]?.mark
                  const isCurrent = i === index
                  const meta = mark ? ORAL_MARK_META[mark] : { icon: CircleDashed, cls: 'text-ink-3', label: 'Not answered' }
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => goTo(i)}
                      className={cn(
                        'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-start text-[12px] transition-colors',
                        isCurrent ? 'bg-primary-tint text-primary-strong font-medium' : 'text-ink-2 hover:bg-inset',
                      )}
                    >
                      <Icon icon={meta.icon} size={13} className={isCurrent ? '' : meta.cls} />
                      <span className="min-w-0 flex-1 truncate">{q.question}</span>
                      {isCurrent && <span className="shrink-0 font-mono text-[10px]">now</span>}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-line px-2 pt-2 text-[11px] text-ink-3">
            <span>{doneCount} done · {partlyCount} partly</span>
            <span className="tnum font-mono">{answeredCount}/{flat.length} answered</span>
          </div>
        </Panel>
      </div>
    </div>
  )
}

/**
 * The bench: the instrument, the slides beside it, and what you see once one is
 * under the lens. Kept apart from the tab so the viewer can take the whole
 * width without the chooser above it.
 */
function HistologyTab() {
  const [open, setOpen] = useState<{ slide: HistologySlide; origin?: MicroscopeTransitionRect } | null>(null)
  if (open) {
    return (
      <SlideViewer
        slide={open.slide}
        transitionOrigin={open.origin}
        onClose={() => setOpen(null)}
      />
    )
  }
  return <Microscope onOpen={(slide, origin) => setOpen({ slide, origin })} />
}

export function Practical() {
  const t = useT()
  const { osceStations, clinicalCases, labImaging } = useLivePracticals()
  const { slides } = useLiveHistology()
  const [tab, setTab] = useState('osce')
  const [active, setActive] = useState<RunnerTarget | null>(null)

  if (active) {
    return <PracticalRunner target={active} onExit={() => setActive(null)} />
  }

  return (
    <PageContainer>
      <PageHeader
        title={t('Practical')}
        description={t('Rehearse OSCE stations, work through clinical cases, track skills sign-off, and practise lab and imaging interpretation.')}
        back={{ fallback: '/app' }}
      />

      <Tabs
        value={tab}
        onChange={setTab}
        className="mb-5"
        items={[
          { value: 'osce', label: 'OSCE stations', icon: Stethoscope, count: osceStations.length },
          { value: 'cases', label: 'Clinical cases', icon: ClipboardList, count: clinicalCases.length },
          { value: 'oral', label: 'Oral questions', icon: MessagesSquare, count: oralQuestions.length },
          { value: 'skills', label: 'Skills', icon: ListChecks, count: skills.length },
          { value: 'lab', label: 'Lab & imaging', icon: ScanLine, count: labImaging.length },
          { value: 'histology', label: 'Histology', icon: MicroscopeIcon, count: slides.length },
        ]}
      />

      {tab === 'osce' && <OsceTab onOpen={setActive} />}
      {tab === 'cases' && <CasesTab onOpen={setActive} />}
      {tab === 'oral' && <OralTab />}
      {tab === 'skills' && <SkillsTab onGoToOsce={() => setTab('osce')} />}
      {tab === 'lab' && <LabTab onOpen={setActive} />}
      {tab === 'histology' && <HistologyTab />}
    </PageContainer>
  )
}
