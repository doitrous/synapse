import { useState } from 'react'
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
} from 'lucide-react'
import type { Skill } from '@/data/practical'
import { skills, skillsTotals, oralQuestions } from '@/data/practical'
import type { Difficulty } from '@/data/qbank'
import { useLivePracticals } from '@/lib/useLivePracticals'
import { subjects } from '@/data/student'
import { getSubject } from '@/data/student'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Meter } from '@/components/ui/Meter'
import { Tabs } from '@/components/ui/Tabs'
import { ChapterMark } from '@/components/ui/ChapterMark'
import { PracticalRunner } from '@/components/practical/PracticalRunner'
import type { RunnerTarget } from '@/components/practical/PracticalRunner'
import { ExaminerWarning } from '@/components/practical/ExaminerWarning'
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

/* ---- OSCE -------------------------------------------------------------- */

function OsceTab({ onOpen }: { onOpen: Open }) {
  const { osceStations } = useLivePracticals()
  return (
    <Panel>
      <ul className="divide-y divide-line">
        {osceStations.map((s, index) => {
          const subj = getSubject(s.subjectId)
          const open = () =>
            onOpen({ kind: 'osce', id: s.id, title: s.title, subjectId: s.subjectId, minutes: s.minutes })
          return (
            <li key={s.id}>
              <div {...clickable(open)}>
                <span className="grid size-10 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-ink-2">
                  <Icon icon={Stethoscope} size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2"><ChapterMark subjectId={s.subjectId} index={index + 1} compact /><p className="text-[14px] font-medium text-ink">{s.title}</p></div>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[12px] text-ink-3">
                    <span className="font-medium text-ink-2">{subj.name}</span>
                    <span>·</span>
                    <span>{s.minutes} min</span>
                    <span>·</span>
                    <span>{s.marks} marks</span>
                  </p>
                </div>
                {s.kind === 'checklist' && <Badge tone="outline">Checklist</Badge>}
                <Badge tone={diffTone(s.difficulty)}>{s.difficulty}</Badge>
                <div className="w-24 text-right">
                  {s.attempts > 0 ? (
                    <>
                      <p className="tnum font-mono text-[13px] font-medium text-ink">{s.bestScore}%</p>
                      <p className="text-[11px] text-ink-3">
                        best · {s.attempts} {s.attempts === 1 ? 'try' : 'tries'}
                      </p>
                    </>
                  ) : (
                    <p className="text-[11.5px] text-ink-3">Not attempted</p>
                  )}
                </div>
                <Button
                  variant={s.attempts > 0 ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    open()
                  }}
                >
                  {s.attempts > 0 ? 'Retry' : 'Start'}
                </Button>
              </div>
            </li>
          )
        })}
      </ul>
    </Panel>
  )
}

/* ---- Cases ------------------------------------------------------------- */

function caseStatus(status: string) {
  if (status === 'completed') return { tone: 'success' as const, label: 'Completed', cta: 'Review' }
  if (status === 'in-progress') return { tone: 'accent' as const, label: 'In progress', cta: 'Continue' }
  return { tone: 'neutral' as const, label: 'Not started', cta: 'Start' }
}

function CasesTab({ onOpen }: { onOpen: Open }) {
  const { clinicalCases } = useLivePracticals()
  return (
    <Panel>
      <ul className="divide-y divide-line">
        {clinicalCases.map((c, index) => {
          const subj = getSubject(c.subjectId)
          const st = caseStatus(c.status)
          const open = () => onOpen({ kind: 'case', id: c.id, title: c.title, subjectId: c.subjectId })
          return (
            <li key={c.id}>
              <div {...clickable(open)}>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <ChapterMark subjectId={c.subjectId} index={index + 1} compact /><p className="text-[14px] font-medium text-ink">{c.title}</p>
                    <Badge tone={st.tone}>{st.label}</Badge>
                  </div>
                  <p className="mt-0.5 text-[13px] text-ink-2">{c.presentation}</p>
                  <p className="mt-1 flex items-center gap-x-2 text-[12px] text-ink-3">
                    <span className="font-medium text-ink-2">{subj.name}</span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Icon icon={Clock} size={12} />
                      {c.minutes} min
                    </span>
                    <span>·</span>
                    <span>{c.steps} steps</span>
                  </p>
                </div>
                <Button
                  variant={c.status === 'in-progress' ? 'primary' : 'secondary'}
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
            </li>
          )
        })}
      </ul>
    </Panel>
  )
}

/* ---- Skills ------------------------------------------------------------ */

const STATUS_ICON = {
  signed: { icon: CircleCheck, cls: 'text-success' },
  pending: { icon: Circle, cls: 'text-warning' },
  'not-started': { icon: CircleDashed, cls: 'text-ink-3' },
} as const

function SkillRow({ s }: { s: Skill }) {
  const meta = STATUS_ICON[s.status]
  return (
    <li className="flex items-center gap-3 py-2.5">
      <Icon icon={meta.icon} size={18} className={meta.cls} />
      <span className="flex-1 text-[13.5px] text-ink">{s.name}</span>
      {s.status === 'signed' ? (
        <span className="text-[12px] text-ink-3">
          {s.signedBy} · {s.date}
        </span>
      ) : (
        <Badge tone={s.status === 'pending' ? 'warning' : 'neutral'}>
          {s.status === 'pending' ? 'Awaiting sign-off' : 'Not started'}
        </Badge>
      )}
    </li>
  )
}

function SkillsTab() {
  const categories = ['Examination', 'Procedures', 'Communication'] as const
  const pct = Math.round((skillsTotals.signed / skillsTotals.total) * 100)
  return (
    <div className="space-y-4">
      <Panel className="flex flex-wrap items-center gap-4 p-4">
        <div className="flex-1">
          <p className="text-[13px] font-medium text-ink">Skills signed off this year</p>
          <p className="mt-0.5 text-[12px] text-ink-3">
            {skillsTotals.total - skillsTotals.signed} remaining before the end of the block
          </p>
        </div>
        <span className="tnum font-mono text-[20px] font-semibold text-ink">
          {skillsTotals.signed} / {skillsTotals.total}
        </span>
        <Meter value={pct} tone="accent" className="w-full sm:w-56" />
      </Panel>

      {categories.map((cat) => {
        const items = skills.filter((s) => s.category === cat)
        if (items.length === 0) return null
        return (
          <Panel key={cat} className="px-4 py-3">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{cat}</p>
            <ul className="divide-y divide-line">
              {items.map((s) => (
                <SkillRow key={s.id} s={s} />
              ))}
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
  return (
    <Panel>
      <ul className="divide-y divide-line">
        {labImaging.map((l, index) => {
          const subj = getSubject(l.subjectId)
          const pct = Math.round((l.done / l.items) * 100)
          const open = () => onOpen({ kind: 'lab', id: l.id, title: l.title, subjectId: l.subjectId })
          return (
            <li key={l.id}>
              <div {...clickable(open)}>
                <span className="grid size-10 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-ink-2">
                  <Icon icon={l.type === 'Lab' ? FlaskConical : ScanLine} size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <ChapterMark subjectId={l.subjectId} index={index + 1} compact /><p className="text-[14px] font-medium text-ink">{l.title}</p>
                    <Badge tone="neutral">{l.type}</Badge>
                  </div>
                  <p className="mt-0.5 flex items-center gap-x-2 text-[12px] text-ink-3">
                    <span className="font-medium text-ink-2">{subj.name}</span>
                    <span>·</span>
                    <span className="tnum">
                      {l.done}/{l.items} done
                    </span>
                  </p>
                </div>
                <Meter value={pct} tone="accent" className="w-28" />
                <Button
                  variant="secondary"
                  size="sm"
                  iconRight={ArrowRight}
                  onClick={(e) => {
                    e.stopPropagation()
                    open()
                  }}
                >
                  {l.done === 0 ? 'Start' : 'Continue'}
                </Button>
              </div>
            </li>
          )
        })}
      </ul>
    </Panel>
  )
}

/* ---- Page -------------------------------------------------------------- */

/* ---- Oral questions ---------------------------------------------------- */

function OralTab() {
  const [revealed, setRevealed] = useState<Set<string>>(new Set())
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
      {groups.map(({ subj, questions }, gi) => (
        <section key={subj.id}>
          <div className="mb-2 flex items-center gap-2">
            <ChapterMark subjectId={subj.id} index={gi + 1} compact />
            <h2 className="font-serif text-[16px] font-semibold text-ink">{subj.name}</h2>
            <span className="tnum font-mono text-[11px] text-ink-3">{questions.length}</span>
          </div>
          <div className="space-y-2.5">
            {questions.map((q) => {
              const isOpen = revealed.has(q.id)
              return (
                <Panel key={q.id} className="p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{q.topic}</p>
                  <p className="mt-1 text-[14.5px] font-medium leading-snug text-ink">{q.question}</p>
                  {isOpen ? (
                    <div className="mt-3 rounded-lg border border-accent-line bg-accent-tint/30 p-3">
                      <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-accent-strong">
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
        </section>
      ))}
    </div>
  )
}

export function Practical() {
  const t = useT()
  const { osceStations, clinicalCases, labImaging } = useLivePracticals()
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
      />

      <ExaminerWarning className="mb-4" />

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
        ]}
      />

      {tab === 'osce' && <OsceTab onOpen={setActive} />}
      {tab === 'cases' && <CasesTab onOpen={setActive} />}
      {tab === 'oral' && <OralTab />}
      {tab === 'skills' && <SkillsTab />}
      {tab === 'lab' && <LabTab onOpen={setActive} />}
    </PageContainer>
  )
}
