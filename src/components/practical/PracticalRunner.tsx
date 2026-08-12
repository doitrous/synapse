import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { backState } from '@/components/ui/BackBar'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Trophy,
  RotateCcw,
  Clock,
  Play,
  Pause,
  BookOpen,
  Flag,
  ExternalLink,
} from 'lucide-react'
import { getOsceDetail, getCaseDetail, getLabDetail } from '@/data/practicalContent'
import { getSubject } from '@/data/student'
import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Meter } from '@/components/ui/Meter'
import { Icon } from '@/components/ui/Icon'
import { SubjectDot } from '@/components/ui/Subject'
import { cn } from '@/lib/cn'
import { CONTENT_LEDGER_STORAGE_KEY, type ManagedContentItem, type PracticalAuthoringData } from '@/data/contentControl'
import { DIFFICULTIES } from '@/data/qbank'
import { ReportContentDialog, type ReportTarget } from '@/components/reports/ReportContentDialog'
import { ZoomableImage } from '@/components/ui/MediaAttachmentView'
import { ExaminerWarning } from '@/components/practical/ExaminerWarning'

export type RunnerKind = 'osce' | 'case' | 'lab'

export interface RunnerTarget {
  kind: RunnerKind
  id: string
  title: string
  subjectId: string
  minutes?: number
}

function clock(seconds: number): string {
  const m = Math.floor(Math.max(0, seconds) / 60)
  const s = Math.max(0, seconds) % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

const KIND_LABEL: Record<RunnerKind, string> = {
  osce: 'OSCE station',
  case: 'Clinical case',
  lab: 'Interpretation',
}

/**
 * The intended difficulty of the question on screen.
 *
 * Shown per question rather than per item because a case runs from an easy
 * opening decision to a challenging one, and a student who misses the last step
 * should be able to see that it was the hard one.
 */
function DifficultyMark({ value }: { value?: unknown }) {
  // Seeded practicals predate per-question difficulty and carry none, so an
  // unrecognised value shows nothing rather than a wrong band.
  const tier = DIFFICULTIES.find((candidate) => candidate === value)
  if (!tier) return null
  return <Badge tone={tier === 'Easy' ? 'success' : tier === 'Moderate' ? 'warning' : 'danger'}>{tier}</Badge>
}

function authoredPractical(id: string): PracticalAuthoringData | undefined {
  try {
    const items = JSON.parse(localStorage.getItem(CONTENT_LEDGER_STORAGE_KEY) ?? '[]') as ManagedContentItem[]
    return items.find((item) => item.id === id)?.practicalData
  } catch {
    return undefined
  }
}

function Header({
  target,
  right,
  onExit,
}: {
  target: RunnerTarget
  right?: React.ReactNode
  onExit: () => void
}) {
  return (
    <div className="mb-5">
      <button
        onClick={onExit}
        className="mb-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-2 transition-colors hover:text-ink"
      >
        <Icon icon={ArrowLeft} size={15} />
        Back to practical
      </button>
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="accent">{KIND_LABEL[target.kind]}</Badge>
            <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-2">
              <SubjectDot id={target.subjectId} />
              {getSubject(target.subjectId).name}
            </span>
          </div>
          <h1 className="mt-2 font-serif text-[24px] font-semibold tracking-[-0.02em] text-ink">
            {target.title}
          </h1>
        </div>
        {right}
      </div>
    </div>
  )
}

/* ---- OSCE runner ------------------------------------------------------- */

function OsceRunner({ target, onExit }: { target: RunnerTarget; onExit: () => void }) {
  const location = useLocation()
  const authored = useMemo(() => authoredPractical(target.id), [target.id])
  const staticDetail = getOsceDetail(target.id)
  const detail = authored?.format === 'osce' ? {
    scenario: authored.candidateInstructions,
    markScheme: authored.markSections.flatMap((section) => section.items),
    markSections: authored.markSections,
    actorBrief: { opening: authored.actorOpening, identity: '', prompts: [], sections: authored.actorSections, flags: authored.actorFlags },
    references: authored.references,
  } : staticDetail
  const sections = detail.markSections ?? [{ id: 'core', title: 'Core station skills', marks: 100, items: detail.markScheme }]
  const allItems = sections.flatMap((section) => section.items)
  const total = allItems.length
  const totalMarks = sections.reduce((sum, section) => sum + section.marks, 0)
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [seconds, setSeconds] = useState((target.minutes ?? 8) * 60)
  const [finished, setFinished] = useState(false)
  const [running, setRunning] = useState(false)
  const [tab, setTab] = useState<'candidate' | 'examiner'>('candidate')

  useEffect(() => {
    if (!running || finished || seconds <= 0) return
    const t = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [finished, running, seconds])

  const earnedMarks = sections.reduce((sum, section) => sum + section.marks * (section.items.filter((item) => checked.has(item.id)).length / section.items.length), 0)
  const pct = Math.round((earnedMarks / totalMarks) * 100)

  if (finished) {
    return (
      <div className="mx-auto max-w-[560px]">
        <Header target={target} onExit={onExit} />
        <Panel className="p-6 text-center">
          <div className="mx-auto mb-3 grid size-12 place-items-center rounded-xl bg-accent-tint text-accent">
            <Icon icon={Trophy} size={24} />
          </div>
          <h2 className="font-serif text-[22px] font-semibold text-ink">Station complete</h2>
          <p className="mt-1 text-[14px] text-ink-2">
            You completed{' '}
            <span className="font-medium text-ink">
              {checked.size} of {total}
            </span>{' '}
            mark-scheme steps ({pct}%) in {clock((target.minutes ?? 8) * 60 - seconds)}.
          </p>
          <Meter value={pct} tone="accent" className="mx-auto mt-4 max-w-xs" />
          <div className="mt-6 flex justify-center gap-2">
            <Button
              variant="secondary"
              size="md"
              iconLeft={RotateCcw}
              onClick={() => {
                setChecked(new Set())
                setSeconds((target.minutes ?? 8) * 60)
                setFinished(false)
                setRunning(false)
              }}
            >
              Redo station
            </Button>
            <Button variant="primary" size="md" onClick={onExit}>
              Back to practical
            </Button>
          </div>
        </Panel>
      </div>
    )
  }

  return (
    <div>
      <Header
        target={target}
        onExit={onExit}
        right={
          <div className="w-full space-y-2 sm:w-64">
            <Panel className="p-3">
            <div className="text-right">
            <div
              className={cn(
                'tnum font-mono text-[22px] font-semibold',
                seconds <= 30 ? 'text-danger' : 'text-ink',
              )}
            >
              {clock(seconds)}
            </div>
            <div className="flex items-center justify-end gap-1 text-[11px] text-ink-3">
              <Icon icon={Clock} size={11} />
              remaining
            </div>
            <div className="mt-2 flex justify-end gap-1.5">
              <Button variant={running ? 'secondary' : 'primary'} size="sm" iconLeft={running ? Pause : Play} onClick={() => setRunning((value) => !value)}>{running ? 'Stop' : 'Start'}</Button>
              <Button variant="ghost" size="sm" iconLeft={RotateCcw} onClick={() => { setSeconds((target.minutes ?? 8) * 60); setRunning(false) }}>Reset</Button>
            </div>
            </div>
            </Panel>
            <div className="overflow-hidden rounded-lg border border-line bg-surface text-left">
              <p className="px-3 pt-2.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">Read around it</p>
              <ul className="mt-1.5 divide-y divide-line px-3 pb-1">{(detail.references ?? ['Clinical examination guide', 'Relevant system guideline']).map((reference) => <li key={reference}><Link to={`/app/resources?q=${encodeURIComponent(reference)}`} state={backState(location, 'Back to case')} className="group flex items-center gap-2 py-2 text-[11.5px] leading-snug text-ink-2 hover:text-ink"><span className="grid size-6 place-items-center rounded-md bg-inset"><Icon icon={BookOpen} size={13} /></span><span className="min-w-0 flex-1">{reference}</span><Icon icon={ExternalLink} size={12} className="text-ink-3" /></Link></li>)}</ul>
            </div>
          </div>
        }
      />

      <div className="mb-4 flex border-b border-line">
        <button onClick={() => setTab('candidate')} className={cn('relative min-h-11 px-3 py-2 text-[13px] font-medium', tab === 'candidate' ? 'text-ink' : 'text-ink-3')}>Candidate{tab === 'candidate' && <span className="absolute inset-x-2 -bottom-px h-0.5 bg-accent" />}</button>
        <button onClick={() => setTab('examiner')} className={cn('relative min-h-11 px-3 py-2 text-[13px] font-medium', tab === 'examiner' ? 'text-ink' : 'text-ink-3')}>Examiner &amp; Actor{tab === 'examiner' && <span className="absolute inset-x-2 -bottom-px h-0.5 bg-accent" />}</button>
      </div>

      {tab === 'candidate' ? (
        <div className="mb-4 space-y-3">
          <ExaminerWarning />
          <Panel className="p-4"><p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">Candidate instructions</p><p className="mt-1.5 text-[14.5px] leading-relaxed text-ink">{detail.scenario}</p></Panel>
        </div>
      ) : (
        <Panel className="mb-4 overflow-hidden">
          <div className="border-b border-line px-4 py-3"><p className="text-[12px] font-semibold uppercase tracking-[0.07em] text-ink">Actor brief</p><p className="mt-0.5 font-mono text-[10.5px] text-ink-3">For whoever is playing the patient</p></div>
          <div className="space-y-5 p-4">
            <div><p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-3">Open with this, then stop</p><p className="mt-1 font-serif text-[17px] text-ink">{detail.actorBrief?.opening ?? 'Wait for the candidate to begin.'}</p></div>
            {detail.actorBrief?.sections ? <div className="divide-y divide-line">{detail.actorBrief.sections.map((section) => <div key={section.id} className="py-2.5"><p className="text-[10px] font-bold uppercase tracking-[0.08em] text-ink-3">{section.label}</p><p className="mt-1 max-w-3xl text-[12.5px] leading-relaxed text-ink-2">{section.content}</p></div>)}</div> : <><div><p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-3">Who you are</p><p className="mt-1 max-w-3xl text-[13px] leading-relaxed text-ink-2">{detail.actorBrief?.identity ?? 'Answer in role and offer only information that is asked for.'}</p></div><div className="divide-y divide-line">{detail.actorBrief?.prompts.map((prompt) => <div key={prompt.label} className="py-2.5"><p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-3">{prompt.label}</p><p className="mt-1 text-[12.5px] text-ink-2">“{prompt.response}”</p></div>)}</div></>}
            {(detail.actorBrief?.flags ?? (detail.actorBrief?.examinerNote ? [detail.actorBrief.examinerNote] : [])).map((flag) => <div key={flag} className="flex gap-3 rounded-lg border border-accent/40 bg-accent-tint/50 p-3 text-[12px] leading-relaxed text-ink-2"><Icon icon={Flag} size={15} className="mt-0.5 text-accent" /><span>{flag}</span></div>)}
          </div>
        </Panel>
      )}

      {tab === 'examiner' && <Panel>
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <h3 className="font-sans text-[13px] font-semibold text-ink">Mark scheme</h3>
          <Button variant="ghost" size="sm" iconLeft={RotateCcw} onClick={() => setChecked(new Set())}>Reset</Button>
        </div>
        <div className="border-b border-line px-4 py-4">
          <div className="flex items-end gap-4"><span className="tnum font-mono text-[34px] font-semibold leading-none text-danger">{pct}%</span><div className="flex-1"><Meter value={pct} tone="accent" /><p className="mt-1.5 font-mono text-[10.5px] text-ink-3">{checked.size} of {total} scoring points · pass mark 65%</p></div></div>
        </div>
        <div className="divide-y divide-line px-4">
          {sections.map((section) => <section key={section.id} className="py-4"><div className="mb-1.5 flex items-center justify-between gap-3"><h4 className="text-[13px] font-bold text-ink">{section.title}</h4><span className="font-mono text-[11px] font-semibold text-warning">{section.marks} marks</span></div><ul>{section.items.map((m) => {
            const done = checked.has(m.id)
            return (
              <li key={m.id}>
                <button
                  onClick={() =>
                    setChecked((prev) => {
                      const next = new Set(prev)
                      if (next.has(m.id)) next.delete(m.id)
                      else next.add(m.id)
                      return next
                    })
                  }
                  className="group flex w-full items-start gap-3 rounded-md px-2 py-2.5 text-left transition-colors hover:bg-inset"
                >
                  <span
                    className={cn(
                      'mt-px grid size-[18px] shrink-0 place-items-center rounded-[5px] border transition-colors',
                      done ? 'border-accent bg-accent' : 'border-line-2 bg-surface group-hover:border-ink-3',
                    )}
                  >
                    {done && <Icon icon={Check} size={12} strokeWidth={2.5} className="text-on-accent" />}
                  </span>
                  <span className={cn('text-[14px] leading-snug', done ? 'text-ink-2' : 'text-ink')}>
                    {m.text}
                  </span>
                </button>
              </li>
            )
          })}</ul></section>)}
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
          <Meter value={pct} tone="accent" className="flex-1" />
          <Button variant="primary" size="sm" iconRight={Trophy} onClick={() => setFinished(true)}>
            Finish station
          </Button>
        </div>
      </Panel>}
    </div>
  )
}

/* ---- Case runner ------------------------------------------------------- */

function CaseRunner({ target, onExit }: { target: RunnerTarget; onExit: () => void }) {
  const location = useLocation()
  const authored = useMemo(() => authoredPractical(target.id), [target.id])
  const staticDetail = getCaseDetail(target.id)
  const detail = authored?.format === 'case' ? {
    stages: authored.decisions.map((decision) => ({ title: decision.title, context: decision.context, question: decision.question, prompt: decision.question, options: decision.answers.filter((answer) => answer.text.trim()).map((answer) => answer.text), optionExplanations: decision.answers.filter((answer) => answer.text.trim()).map((answer) => answer.explanation), correctIndex: Math.max(0, decision.answers.filter((answer) => answer.text.trim()).findIndex((answer) => answer.correct)), answer: decision.rationale, difficulty: decision.difficulty })),
    debrief: authored.debrief,
    references: authored.references,
  } : staticDetail
  const stages = detail.stages
  const [idx, setIdx] = useState(0)
  const [choices, setChoices] = useState<Record<number, number>>({})
  const [debrief, setDebrief] = useState(false)
  const stage = stages[idx]
  const last = idx === stages.length - 1
  const options = stage.options ?? [
    `Take a structured ${stage.title.toLowerCase()} approach now`,
    'Delay action until every investigation is available',
    'Reassure and discharge without safety-netting',
  ]
  const correctIndex = stage.correctIndex ?? 0
  const selected = choices[idx]
  const revealed = selected != null

  if (debrief) {
    return (
      <div>
        <Header target={target} onExit={onExit} />
        <Panel className="overflow-hidden">
          <div className="border-b border-line px-5 py-4"><p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-accent">Case debrief</p><h2 className="mt-1 font-serif text-[22px] font-semibold text-ink">See the debrief</h2><p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-ink-2">{detail.debrief ?? 'The case rewards a structured approach, early treatment of immediate threats, and decisions that remain coherent as new information arrives.'}</p></div>
          <div className="divide-y divide-line px-5">{stages.map((decision, decisionIndex) => <div key={decision.title} className="grid gap-2 py-4 sm:grid-cols-[9rem_1fr]"><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">Decision {decisionIndex + 1}</p><div><p className="text-[13px] font-medium text-ink">{decision.prompt}</p><p className="mt-1 text-[12.5px] leading-relaxed text-ink-2">{decision.answer}</p></div></div>)}</div>
        </Panel>
        <Panel className="mt-4 p-4"><h3 className="text-[13px] font-semibold text-ink">Read around it</h3><ul className="mt-2 divide-y divide-line">{(detail.references ?? ['Relevant clinical guideline']).map((reference) => <li key={reference}><Link to={`/app/resources?q=${encodeURIComponent(reference)}`} state={backState(location, 'Back to case')} className="group flex items-start gap-2.5 py-2.5 text-[12.5px] leading-snug text-ink-2 hover:text-ink"><span className="grid size-7 shrink-0 place-items-center rounded-md bg-inset"><Icon icon={BookOpen} size={14} className="text-ink-3" /></span><span className="min-w-0 flex-1">{reference}<span className="mt-0.5 block text-[10.5px] text-ink-3">Open at the relevant page</span></span><Icon icon={ExternalLink} size={14} className="mt-1 text-ink-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></li>)}</ul><Button className="mt-4" variant="primary" onClick={onExit}>Finish case</Button></Panel>
      </div>
    )
  }

  return (
    <div>
      <Header target={target} onExit={onExit} />

      <div className="mb-4 flex items-center gap-3">
        <span className="text-[13px] font-medium text-ink-2">
          Decision <span className="tnum font-mono text-ink">{idx + 1}</span> of {stages.length}
        </span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-inset">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-300"
            style={{ width: `${((idx + 1) / stages.length) * 100}%` }}
          />
        </div>
      </div>

      <Panel className="p-5 sm:p-6">
        <div className="flex items-center gap-2"><p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-accent">{stage.title}</p><DifficultyMark value={'difficulty' in stage ? stage.difficulty : undefined} /></div>
        {stage.context && <p className="mt-3 max-w-3xl text-[15px] leading-[1.7] text-ink-2">{stage.context}</p>}
        <h2 className="mt-4 font-sans text-[18px] font-semibold tracking-[-0.01em] text-ink">{stage.question ?? stage.prompt}</h2>

        <div className="mt-5 space-y-2">{options.map((option, optionIndex) => {
          const correct = optionIndex === correctIndex
          return <div key={option} className={cn('overflow-hidden rounded-lg border transition-colors', !revealed && 'border-line bg-surface hover:border-accent-line', revealed && correct && 'border-success bg-success-tint', revealed && selected === optionIndex && !correct && 'border-danger bg-danger-tint', revealed && !correct && selected !== optionIndex && 'border-line opacity-65')}><button disabled={revealed} onClick={() => setChoices((current) => ({ ...current, [idx]: optionIndex }))} className="flex w-full items-start gap-3 p-3 text-left text-[13.5px]"><span className="grid size-6 shrink-0 place-items-center rounded-full border border-line-2 font-mono text-[11px]">{String.fromCharCode(65 + optionIndex)}</span><span>{option}</span></button>{revealed && stage.optionExplanations?.[optionIndex] && <p className="border-t border-current/10 px-12 py-2.5 text-[12px] leading-relaxed text-ink-2">{stage.optionExplanations[optionIndex]}</p>}</div>
        })}</div>
        {revealed && <div className="mt-4 rounded-lg border border-accent-line bg-accent-tint/50 p-4"><p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-accent-strong">Decision rationale</p><p className="mt-1.5 text-[14px] leading-relaxed text-ink">{stage.answer}</p></div>}

        <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
          <Button
            variant="ghost"
            size="md"
            iconLeft={ArrowLeft}
            disabled={idx === 0}
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
          >
            Previous
          </Button>
          {last ? (
            <Button variant="primary" size="md" onClick={() => setDebrief(true)} disabled={!revealed}>
              See the debrief
            </Button>
          ) : (
            <Button variant="primary" size="md" iconRight={ArrowRight} onClick={() => setIdx((i) => i + 1)} disabled={!revealed}>
              Next decision
            </Button>
          )}
        </div>
      </Panel>
    </div>
  )
}

/* ---- Lab runner -------------------------------------------------------- */

function LabRunner({ target, onExit }: { target: RunnerTarget; onExit: () => void }) {
  const authored = useMemo(() => authoredPractical(target.id), [target.id])
  const staticDetail = getLabDetail(target.id)
  const detail = authored?.format === 'lab' ? {
    questions: authored.questions.map((question) => ({ stem: question.question, context: question.context, question: question.question, mediaUrl: question.mediaUrl, options: question.answers.filter((answer) => answer.text.trim()).map((answer) => ({ text: answer.text, correct: answer.correct, explanation: answer.explanation })), explanation: question.explanation, difficulty: question.difficulty })),
  } : staticDetail
  const qs = detail.questions
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [checked, setChecked] = useState<Set<number>>(new Set())
  const [finished, setFinished] = useState(false)
  const [reportTarget, setReportTarget] = useState<ReportTarget | null>(null)

  const q = qs[idx]
  const mediaUrl = 'mediaUrl' in q && typeof q.mediaUrl === 'string' ? q.mediaUrl : ''
  const revealed = checked.has(idx)
  const chosen = answers[idx]
  const last = idx === qs.length - 1

  if (finished) {
    const correct = qs.filter((qq, i) => qq.options[answers[i]]?.correct).length
    const pct = Math.round((correct / qs.length) * 100)
    return (
      <div className="mx-auto max-w-[560px]">
        <Header target={target} onExit={onExit} />
        <Panel className="p-6 text-center">
          <div className="mx-auto mb-3 grid size-12 place-items-center rounded-xl bg-accent-tint text-accent">
            <Icon icon={Trophy} size={24} />
          </div>
          <h2 className="font-serif text-[22px] font-semibold text-ink">Set complete</h2>
          <p className="mt-1 text-[14px] text-ink-2">
            You scored{' '}
            <span className="font-medium text-ink">
              {correct} of {qs.length}
            </span>{' '}
            ({pct}%).
          </p>
          <Meter value={pct} tone="accent" className="mx-auto mt-4 max-w-xs" />
          <div className="mt-6 flex justify-center">
            <Button variant="primary" size="md" onClick={onExit}>
              Back to practical
            </Button>
          </div>
        </Panel>
      </div>
    )
  }

  function optionClasses(i: number) {
    if (!revealed)
      return chosen === i ? 'border-accent bg-accent-tint/50' : 'border-line bg-surface hover:border-line-2'
    if (q.options[i].correct) return 'border-success bg-success-tint'
    if (chosen === i) return 'border-danger bg-danger-tint'
    return 'border-line bg-surface opacity-70'
  }

  return (
    <div>
      <Header target={target} onExit={onExit} />

      <div className="mb-4 flex items-center gap-3">
        <span className="text-[13px] font-medium text-ink-2">
          Question <span className="tnum font-mono text-ink">{idx + 1}</span> of {qs.length}
        </span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-inset">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-300"
            style={{ width: `${((idx + 1) / qs.length) * 100}%` }}
          />
        </div>
      </div>

      <Panel className="p-5 sm:p-6">
        {q.context && <p className="mb-3 text-[14.5px] leading-relaxed text-ink-2">{q.context}</p>}
        <div className="flex items-start gap-2"><p className="flex-1 text-[16px] font-semibold leading-snug text-ink">{q.question ?? q.stem}</p><DifficultyMark value={'difficulty' in q ? q.difficulty : undefined} /></div>
        {mediaUrl && <div className="mt-4 overflow-hidden rounded-lg border border-line bg-inset p-2"><ZoomableImage src={mediaUrl} alt="Investigation" className="max-h-96 w-full object-contain" /><div className="flex justify-end border-t border-line px-1 pt-2"><Button variant="ghost" size="sm" iconLeft={Flag} onClick={() => setReportTarget({ kind: 'image', id: `${target.id}-${idx}`, title: `${target.title} · image ${idx + 1}` })}>Report image</Button></div></div>}
        <div className="mt-4 space-y-2.5">
          {q.options.map((opt, i) => (
            <div key={i}>
              <button
                disabled={revealed}
                onClick={() => setAnswers((a) => ({ ...a, [idx]: i }))}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors',
                  optionClasses(i),
                )}
              >
                <span
                  className={cn(
                    'grid size-6 shrink-0 place-items-center rounded-full border text-[12px] font-semibold',
                    revealed && opt.correct
                      ? 'border-success bg-success text-white'
                      : revealed && chosen === i
                        ? 'border-danger bg-danger text-white'
                        : chosen === i
                          ? 'border-accent bg-accent text-white'
                          : 'border-line-2 text-ink-2',
                  )}
                >
                  {revealed && opt.correct ? (
                    <Icon icon={Check} size={14} strokeWidth={2.6} />
                  ) : revealed && chosen === i ? (
                    <Icon icon={X} size={14} strokeWidth={2.6} />
                  ) : (
                    ['A', 'B', 'C', 'D'][i]
                  )}
                </span>
                <span className="flex-1 text-[14px] text-ink">{opt.text}</span>
              </button>
              {revealed && opt.explanation && <p className="border-x border-b border-line px-12 py-2.5 text-[12px] leading-relaxed text-ink-2">{opt.explanation}</p>}
            </div>
          ))}
        </div>

        {revealed && (
          <div className="mt-4 rounded-lg border border-line bg-surface-2 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">Explanation</p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-ink">{q.explanation}</p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
          <Button
            variant="ghost"
            size="md"
            iconLeft={ArrowLeft}
            disabled={idx === 0}
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
          >
            Previous
          </Button>
          {!revealed ? (
            <Button
              variant="primary"
              size="md"
              disabled={chosen == null}
              onClick={() => setChecked((prev) => new Set(prev).add(idx))}
            >
              Check answer
            </Button>
          ) : last ? (
            <Button variant="primary" size="md" iconRight={Trophy} onClick={() => setFinished(true)}>
              See results
            </Button>
          ) : (
            <Button variant="primary" size="md" iconRight={ArrowRight} onClick={() => setIdx((i) => i + 1)}>
              Next
            </Button>
          )}
        </div>
      </Panel>
      <ReportContentDialog open={Boolean(reportTarget)} target={reportTarget} onClose={() => setReportTarget(null)} />
    </div>
  )
}

export function PracticalRunner({ target, onExit }: { target: RunnerTarget; onExit: () => void }) {
  return (
    <div className="mx-auto max-w-[760px] px-4 py-6 sm:px-6">
      {target.kind === 'osce' && <OsceRunner target={target} onExit={onExit} />}
      {target.kind === 'case' && <CaseRunner target={target} onExit={onExit} />}
      {target.kind === 'lab' && <LabRunner target={target} onExit={onExit} />}
    </div>
  )
}
