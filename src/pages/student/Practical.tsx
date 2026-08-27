import { useMemo, useState, type ReactNode } from 'react'
import {
  Stethoscope,
  ClipboardList,
  ListChecks,
  ScanLine,
  Clock,
  ArrowRight,
  CircleCheck,
  CircleDashed,
  Circle,
  FlaskConical,
  MessagesSquare,
  Eye,
  EyeOff,
  ChevronRight,
} from 'lucide-react'
import type { Skill } from '@/data/practical'
import { skills, oralQuestions } from '@/data/practical'
import { useCatalogueAvailability } from '@/lib/useCatalogueAvailability'
import { CatalogueUnavailable } from '@/components/ui/CatalogueUnavailable'
import { summariseSkills, type SkillStatus } from '@/data/practicalProgress'
import type { Difficulty } from '@/data/qbank'
import { useLivePracticals } from '@/lib/useLivePracticals'
import { usePracticalProgress } from '@/lib/usePracticalProgress'
import { EmptyState } from '@/components/ui/EmptyState'
import { subjects } from '@/data/subjects'
import { cn } from '@/lib/cn'
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

const STATUS_ICON: Record<SkillStatus, { icon: typeof CircleCheck; cls: string }> = {
  ready: { icon: CircleCheck, cls: 'text-success' },
  practised: { icon: Circle, cls: 'text-warning' },
  'not-started': { icon: CircleDashed, cls: 'text-ink-3' },
}

/** The next state each tap moves a skill to, cycling through the three. */
const NEXT_STATUS: Record<SkillStatus, SkillStatus> = {
  'not-started': 'practised',
  practised: 'ready',
  ready: 'not-started',
}

const STATUS_LABEL: Record<SkillStatus, string> = {
  'not-started': 'Not started',
  practised: 'Practised',
  ready: 'Ready to be assessed',
}

function SkillRow({ skill, status, onCycle }: { skill: Skill; status: SkillStatus; onCycle: () => void }) {
  const meta = STATUS_ICON[status]
  return (
    <li>
      <button
        type="button"
        onClick={onCycle}
        className="flex w-full items-center gap-3 rounded-md py-2.5 text-start transition-colors hover:bg-inset"
        aria-label={`${skill.name} — ${STATUS_LABEL[status]}. Change`}
      >
        <Icon icon={meta.icon} size={18} className={meta.cls} />
        <span className="flex-1 text-[13.5px] text-ink">{skill.name}</span>
        <Badge tone={status === 'ready' ? 'success' : status === 'practised' ? 'warning' : 'neutral'}>
          {STATUS_LABEL[status]}
        </Badge>
      </button>
    </li>
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
function SkillsTab() {
  const categories = ['Examination', 'Procedures', 'Communication'] as const
  const { progress, markSkill } = usePracticalProgress()
  const summary = summariseSkills(progress, skills.length)
  const pct = summary.total ? Math.round((summary.ready / summary.total) * 100) : 0

  if (!skills.length) {
    return <Panel className="p-8"><EmptyState icon={CircleCheck} title="No skills checklist yet" description="The year's skills checklist appears here once it has been set up." /></Panel>
  }

  return (
    <div className="space-y-4">
      <Panel className="flex flex-wrap items-center gap-4 p-4">
        <div className="flex-1">
          <p className="text-[13px] font-medium text-ink">Skills you have marked ready</p>
          <p className="mt-0.5 text-[12px] text-ink-3">
            {summary.total - summary.ready} still to go · {summary.practised} practised so far
          </p>
        </div>
        <span className="tnum font-mono text-[20px] font-semibold text-ink">
          {summary.ready} / {summary.total}
        </span>
        <Meter value={pct} tone="primary" className="w-full sm:w-56" />
      </Panel>

      <p className="flex items-start gap-2 rounded-lg border border-line bg-surface-2/40 px-3.5 py-2.5 text-[12px] leading-relaxed text-ink-2">
        <Icon icon={CircleCheck} size={14} className="mt-0.5 shrink-0 text-ink-3" />
        This is your own record of what you have practised. A formal sign-off is given by an assessor and is not recorded in Maristana.
      </p>

      {categories.map((cat) => {
        const items = skills.filter((s) => s.category === cat)
        if (items.length === 0) return null
        return (
          <Panel key={cat} className="px-4 py-3">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{cat}</p>
            <ul className="divide-y divide-line">
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
          </Panel>
        )
      })}
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

function OralTab() {
  const [revealed, setRevealed] = useState<Set<string>>(new Set())
  const [collapsedSystems, setCollapsedSystems] = useState<Set<string>>(new Set())
  const toggle = (id: string) =>
    setRevealed((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const groups = subjects
    .map((subj) => ({ subj, questions: oralQuestions.filter((q) => q.subjectId === subj.id) }))
    .filter((g) => g.questions.length > 0)

  return (
    <div className="space-y-5">
      <p className="flex items-center gap-2 text-[12.5px] text-ink-3">
        <MessagesSquare size={14} />
        The most common viva questions by module. Attempt each one aloud, then reveal the model answer to mark yourself.
      </p>
      {groups.map(({ subj, questions }) => {
        const isCollapsed = collapsedSystems.has(subj.id)
        return (
        <section key={subj.id}>
          {/* This tab was already divided by system; what it lacked was the
              chevron every other tab now has. */}
          <button
            type="button"
            aria-expanded={!isCollapsed}
            onClick={() => setCollapsedSystems((current) => {
              const next = new Set(current)
              if (!next.delete(subj.id)) next.add(subj.id)
              return next
            })}
            className="mb-2 flex w-full items-center gap-2 rounded-md px-1 py-1 text-start transition-colors hover:bg-inset/60"
          >
            <Icon icon={ChevronRight} size={15} className={cn('text-ink-3 chevron-turn')} open={!isCollapsed} />
            <SystemMark subjectId={subj.id} />
            <h2 className="font-serif text-[16px] font-semibold text-ink">{subj.name}</h2>
            <span className="tnum ms-auto font-mono text-[11px] text-ink-3">{questions.length}</span>
          </button>
          {!isCollapsed && (
          <div className="space-y-2.5">
            {questions.map((q) => {
              const isOpen = revealed.has(q.id)
              return (
                <Panel key={q.id} className="p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{q.topic}</p>
                  <p className="mt-1 text-[14.5px] font-medium leading-snug text-ink">{q.question}</p>
                  {isOpen ? (
                    <div className="mt-3 rounded-lg border border-primary-line bg-primary-tint/30 p-3">
                      <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-primary-strong">
                        <CircleCheck size={13} /> Model answer
                      </p>
                      <p className="text-[13.5px] leading-relaxed text-ink"><ConceptText text={q.modelAnswer} /></p>
                      <Button variant="ghost" size="sm" iconLeft={EyeOff} className="mt-2" onClick={() => toggle(q.id)}>
                        Hide answer
                      </Button>
                    </div>
                  ) : (
                    <Button variant="secondary" size="sm" iconLeft={Eye} className="mt-3" onClick={() => toggle(q.id)}>
                      Reveal model answer
                    </Button>
                  )}
                </Panel>
              )
            })}
          </div>
          )}
        </section>
        )
      })}
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
      {tab === 'skills' && <SkillsTab />}
      {tab === 'lab' && <LabTab onOpen={setActive} />}
      {tab === 'histology' && <HistologyTab />}
    </PageContainer>
  )
}
