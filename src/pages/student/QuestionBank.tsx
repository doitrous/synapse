import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ListChecks,
  Clock,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
  Play,
  BookOpen,
  FileText,
  RotateCcw,
  Trophy,
  GraduationCap,
  Siren,
  Flame,
  Shuffle,
  Flag,
  TrendingDown,
} from 'lucide-react'
import type { Question } from '@/data/qbank'
import { dueReviews, subjects, getSubject } from '@/data/student'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Meter } from '@/components/ui/Meter'
import { Segmented } from '@/components/ui/Tabs'
import { FilterChip } from '@/components/ui/FilterChip'
import { SubjectDot } from '@/components/ui/Subject'
import { ConceptText } from '@/components/concepts/ConceptText'
import { ReportContentDialog, type ReportTarget } from '@/components/reports/ReportContentDialog'
import { cn } from '@/lib/cn'
import { usePublishedQuestions } from '@/lib/usePublishedQuestions'
import { MediaAttachmentView, ZoomableImage } from '@/components/ui/MediaAttachmentView'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']
type Mode = 'tutor' | 'timed'
type Phase = 'setup' | 'running' | 'results'

function shuffle<T>(a: T[]): T[] {
  const b = [...a]
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[b[i], b[j]] = [b[j], b[i]]
  }
  return b
}

function clock(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function diffTone(d: Question['difficulty']): 'success' | 'warning' | 'danger' {
  return d === 'Easy' ? 'success' : d === 'Moderate' ? 'warning' : 'danger'
}

export function QuestionBank() {
  const questions = usePublishedQuestions()
  const [params] = useSearchParams()
  const articleFilter = params.get('article')
  const [phase, setPhase] = useState<Phase>('setup')
  const [filter, setFilter] = useState<Set<string>>(() => new Set((params.get('topics') ?? '').split(',').filter(Boolean)))
  const [mode, setMode] = useState<Mode>('tutor')
  const [count, setCount] = useState(5)

  const [session, setSession] = useState<Question[]>([])
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [reviewing, setReviewing] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [reportTarget, setReportTarget] = useState<ReportTarget | null>(null)

  const available = useMemo(
    () => {
      const articleQuestions = articleFilter ? questions.filter((question) => question.libraryRefs.some((ref) => ref.id === articleFilter)) : questions
      return filter.size === 0 ? articleQuestions : articleQuestions.filter((q) => filter.has(q.subjectId))
    },
    [articleFilter, filter, questions],
  )

  const presetCounts = useMemo(() => ({
    weak: questions.filter((question) => ['renal', 'pharm', 'endo'].includes(question.subjectId)).length,
    emergency: questions.filter((question) => /acute|STEMI|acidosis|hypox/i.test(`${question.topic} ${question.vignette} ${question.stem}`)).length,
    demanding: questions.filter((question) => question.difficulty === 'Hard' || question.difficulty === 'Moderate').length,
    everything: questions.length,
  }), [questions])

  const requestedReview = params.get('review') ?? params.get('session')
  useEffect(() => {
    if (!requestedReview) return
    const review = dueReviews.find((item) => item.id === requestedReview)
    const pool = review ? questions.filter((question) => question.subjectId === review.subjectId) : questions
    setSession(shuffle(pool).slice(0, Math.min(5, pool.length)))
    setIdx(0)
    setAnswers({})
    setChecked({})
    setReviewing(false)
    setElapsed(0)
    setPhase('running')
  }, [questions, requestedReview])

  useEffect(() => {
    if (phase !== 'running' || mode !== 'timed' || reviewing) return
    const id = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(id)
  }, [phase, mode, reviewing])

  function toggle(id: string) {
    setFilter((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function start() {
    const picked = shuffle(available).slice(0, Math.min(count, available.length))
    setSession(picked)
    setIdx(0)
    setAnswers({})
    setChecked({})
    setReviewing(false)
    setElapsed(0)
    setPhase('running')
  }

  function startPreset(kind: 'weak' | 'emergency' | 'demanding' | 'everything') {
    const pool = kind === 'weak'
      ? questions.filter((question) => ['renal', 'pharm', 'endo'].includes(question.subjectId))
      : kind === 'emergency'
        ? questions.filter((question) => /acute|STEMI|acidosis|hypox/i.test(`${question.topic} ${question.vignette} ${question.stem}`))
        : kind === 'demanding'
          ? questions.filter((question) => question.difficulty === 'Hard' || question.difficulty === 'Moderate')
          : questions
    const picked = shuffle(pool.length ? pool : questions).slice(0, Math.min(count, pool.length || questions.length))
    setSession(picked)
    setIdx(0)
    setAnswers({})
    setChecked({})
    setReviewing(false)
    setElapsed(0)
    setPhase('running')
  }

  const stats = useMemo(() => {
    const correct = session.filter((q) => q.options[answers[q.id]]?.correct).length
    const answered = session.filter((q) => answers[q.id] != null).length
    const bySubject = new Map<string, { correct: number; total: number }>()
    for (const q of session) {
      const rec = bySubject.get(q.subjectId) ?? { correct: 0, total: 0 }
      rec.total++
      if (q.options[answers[q.id]]?.correct) rec.correct++
      bySubject.set(q.subjectId, rec)
    }
    return { correct, answered, bySubject }
  }, [session, answers])

  /* ---- Setup --------------------------------------------------------- */
  if (phase === 'setup') {
    return (
      <PageContainer>
        <PageHeader
          title="Question Bank"
          description="Build a session, then work through exam-style questions with worked explanations linked back to the library."
        />

        <section className="mb-4 sm:mb-5" aria-labelledby="quick-start-title">
          <h2 id="quick-start-title" className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.09em] text-ink-3">Quick start</h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { id: 'weak' as const, title: 'Your weakest topics', text: 'Targets the subjects you score lowest in.', icon: TrendingDown, count: presetCounts.weak || questions.length },
              { id: 'emergency' as const, title: 'Emergencies only', text: 'Time-critical questions across all systems.', icon: Siren, count: presetCounts.emergency || questions.length },
              { id: 'demanding' as const, title: 'Demanding questions', text: 'Cohort accuracy below 50%.', icon: Flame, count: presetCounts.demanding || questions.length },
              { id: 'everything' as const, title: 'Everything, shuffled', text: 'The full bank in random order.', icon: Shuffle, count: presetCounts.everything },
            ].map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => startPreset(preset.id)}
                className="group min-h-40 rounded-xl border border-line bg-surface p-4 text-left shadow-panel transition-[border-color,background-color,box-shadow,transform] duration-150 ease-[var(--ease-out-quint)] hover:-translate-y-0.5 hover:border-accent-line hover:bg-accent-tint/15 hover:shadow-float active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] sm:min-h-44"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-tint text-accent transition-colors group-hover:bg-accent group-hover:text-on-accent">
                    <Icon icon={preset.icon} size={19} strokeWidth={2.15} />
                  </span>
                  <span className="tnum pt-1 font-mono text-[11.5px] text-ink-3">{preset.count} {preset.count === 1 ? 'Q' : 'Qs'}</span>
                </span>
                <strong className="mt-5 block text-[14px] font-semibold tracking-[-0.01em] text-ink">{preset.title}</strong>
                <span className="mt-1 block text-[12.5px] leading-relaxed text-ink-2">{preset.text}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="grid items-start gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Panel>
            <PanelHeader title="New session" icon={GraduationCap} />
            <div className="space-y-6 p-5">
              <div>
                <p className="mb-2 text-[12.5px] font-medium text-ink-2">Subjects</p>
                <div className="flex flex-wrap gap-2">
                  <FilterChip active={filter.size === 0} onClick={() => setFilter(new Set())}>
                    All subjects
                  </FilterChip>
                  {subjects
                    .filter((s) => questions.some((q) => q.subjectId === s.id))
                    .map((s) => (
                      <FilterChip
                        key={s.id}
                        active={filter.has(s.id)}
                        onClick={() => toggle(s.id)}
                        color={s.color}
                      >
                        {s.name}
                      </FilterChip>
                    ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-x-10 gap-y-5">
                <div>
                  <p className="mb-2 text-[12.5px] font-medium text-ink-2">Mode</p>
                  <Segmented
                    value={mode}
                    onChange={(v) => setMode(v as Mode)}
                    items={[
                      { value: 'tutor', label: 'Tutor' },
                      { value: 'timed', label: 'Timed' },
                    ]}
                  />
                  <p className="mt-2 max-w-xs text-[12px] text-ink-3">
                    {mode === 'tutor'
                      ? 'Explanations shown after each question.'
                      : 'Explanations shown at the end, with a timer.'}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-[12.5px] font-medium text-ink-2">Length</p>
                  <Segmented
                    value={String(count)}
                    onChange={(v) => setCount(Number(v))}
                    items={[
                      { value: '5', label: '5' },
                      { value: '10', label: '10' },
                      { value: '20', label: '20' },
                    ]}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                <span className="text-[13px] text-ink-3">
                  <span className="tnum font-mono font-medium text-ink">
                    {Math.min(count, available.length)}
                  </span>{' '}
                  of {available.length} available questions
                </span>
                <Button variant="primary" size="md" iconLeft={Play} onClick={start} disabled={available.length === 0}>
                  Start session
                </Button>
              </div>
            </div>
          </Panel>

          <Panel className="h-fit">
            <PanelHeader title="Your Qbank" icon={ListChecks} />
            <div className="space-y-4 p-5">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] text-ink-2">Answered</span>
                <span className="tnum font-mono text-[15px] font-semibold text-ink">1,842 / 3,200</span>
              </div>
              <Meter value={58} tone="accent" ticks />
              <div className="grid grid-cols-2 gap-4 border-t border-line pt-4">
                <div>
                  <p className="tnum font-mono text-[24px] font-semibold text-ink">72%</p>
                  <p className="text-[12px] text-ink-3">Overall accuracy</p>
                </div>
                <div>
                  <p className="tnum font-mono text-[24px] font-semibold text-ink">128</p>
                  <p className="text-[12px] text-ink-3">Answered this week</p>
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </PageContainer>
    )
  }

  /* ---- Results ------------------------------------------------------- */
  if (phase === 'results') {
    const pct = Math.round((stats.correct / session.length) * 100)
    return (
      <PageContainer className="max-w-[760px]">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 grid size-12 place-items-center rounded-xl bg-accent-tint text-accent">
            <Icon icon={Trophy} size={24} />
          </div>
          <h1 className="font-serif text-[28px] font-semibold tracking-[-0.02em] text-ink">
            Session complete
          </h1>
          <p className="mt-1 text-[14px] text-ink-2">
            You scored{' '}
            <span className="font-medium text-ink">
              {stats.correct} of {session.length}
            </span>{' '}
            ({pct}%){mode === 'timed' && <> in {clock(elapsed)}</>}.
          </p>
        </div>

        <Panel className="mb-4">
          <PanelHeader title="By subject" />
          <div className="divide-y divide-line">
            {[...stats.bySubject.entries()].map(([sid, rec]) => {
              const subject = getSubject(sid)
              return (
                <div key={sid} className="flex items-center gap-3 px-4 py-3">
                  <SubjectDot id={sid} />
                  <span className="flex-1 text-[13.5px] text-ink">{subject.name}</span>
                  <Meter
                    value={(rec.correct / rec.total) * 100}
                    tone="accent"
                    className="w-28"
                  />
                  <span className="tnum w-12 text-right font-mono text-[12.5px] text-ink-2">
                    {rec.correct}/{rec.total}
                  </span>
                </div>
              )
            })}
          </div>
        </Panel>

        <div className="flex justify-center gap-2">
          <Button
            variant="secondary"
            size="md"
            iconLeft={BookOpen}
            onClick={() => {
              setReviewing(true)
              setIdx(0)
              setPhase('running')
            }}
          >
            Review answers
          </Button>
          <Button variant="primary" size="md" iconLeft={RotateCcw} onClick={() => setPhase('setup')}>
            New session
          </Button>
        </div>
      </PageContainer>
    )
  }

  /* ---- Running ------------------------------------------------------- */
  const q = session[idx]
  const revealed = reviewing || checked[q.id]
  const chosen = answers[q.id]
  const last = idx === session.length - 1

  function optionClasses(i: number): string {
    if (!revealed)
      return chosen === i
        ? 'border-accent bg-accent-tint/50'
        : 'border-line bg-surface hover:border-line-2'
    if (q.options[i].correct) return 'border-success bg-success-tint'
    if (chosen === i) return 'border-danger bg-danger-tint'
    return 'border-line bg-surface opacity-70'
  }

  return (
    <div className="mx-auto max-w-[760px] px-4 py-6 sm:px-6">
      {/* Runner header */}
      <div className="mb-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[13px] font-medium text-ink-2">
            Question <span className="tnum font-mono text-ink">{idx + 1}</span> of {session.length}
            {reviewing && <span className="ml-2 text-accent">· review</span>}
          </span>
          <div className="flex items-center gap-3">
            {mode === 'timed' && !reviewing && (
              <span className="tnum inline-flex items-center gap-1.5 font-mono text-[13px] text-ink-2">
                <Icon icon={Clock} size={14} />
                {clock(elapsed)}
              </span>
            )}
            <button
              type="button"
              onClick={() => setReportTarget({ kind: 'question', id: q.id, title: q.stem })}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-md px-2 text-[12.5px] font-medium text-ink-3 transition-colors hover:bg-danger-tint hover:text-danger sm:min-h-0"
            >
              <Icon icon={Flag} size={13} />
              Report
            </button>
            <button
              onClick={() => setPhase(reviewing ? 'results' : 'setup')}
              className="text-[12.5px] font-medium text-ink-3 hover:text-ink"
            >
              {reviewing ? 'Back to results' : 'End session'}
            </button>
          </div>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-inset">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-300"
            style={{ width: `${((idx + 1) / session.length) * 100}%` }}
          />
        </div>
      </div>

      <Panel className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-2">
            <SubjectDot id={q.subjectId} />
            {getSubject(q.subjectId).name}
          </span>
          <span className="text-ink-3">·</span>
          <span className="text-[12.5px] text-ink-3">{q.topic}</span>
          <Badge tone={diffTone(q.difficulty)} className="ml-auto">
            {q.difficulty}
          </Badge>
        </div>

        <p className="mt-4 text-[15px] leading-[1.65] text-ink/90"><ConceptText text={q.vignette} /></p>
        <p className="mt-3 text-[15.5px] font-semibold leading-snug text-ink"><ConceptText text={q.stem} /></p>

        {q.attachedImage && (
          <div className="mt-4 overflow-hidden rounded-xl border border-line bg-inset p-2">
            <ZoomableImage src={q.attachedImage} alt="Question attachment" className="max-h-80 w-full rounded-lg object-contain" />
          </div>
        )}
        {q.attachments && q.attachments.length > 0 && (
          <div className="mt-4 space-y-2">
            {q.attachments.map((attachment) => <MediaAttachmentView key={attachment.id} attachment={attachment} />)}
          </div>
        )}

        <div className="mt-5 space-y-2.5">
          {q.options.map((opt, i) => (
            <div key={i}>
              <button
                disabled={revealed}
                onClick={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                className={cn(
                  'flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors',
                  optionClasses(i),
                  !revealed && 'cursor-pointer',
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
                    LETTERS[i]
                  )}
                </span>
                <span className="flex-1 pt-0.5 text-[14px] text-ink">{opt.text}</span>
              </button>
              {revealed && (chosen === i || opt.correct) && (
                <p className="mt-1 pl-9 pr-1 text-[12.5px] leading-snug text-ink-2">{opt.rationale}</p>
              )}
            </div>
          ))}
        </div>

        {/* Explanation */}
        {revealed && (
          <div className="mt-5 rounded-xl border border-line bg-surface-2 p-4">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">
              Explanation
            </p>
            <p className="text-[14px] leading-relaxed text-ink">{q.explanation}</p>
            <div className="mt-3 flex flex-wrap gap-2 border-t border-line pt-3">
              {q.libraryRefs.map((r) => (
                <Link
                  key={r.id}
                  to={`/app/library?s=${r.id}`}
                  className="inline-flex items-center gap-1.5 rounded-md border border-accent-line bg-accent-tint/60 px-2.5 py-1.5 text-[12.5px] font-medium text-accent-strong transition-colors hover:bg-accent-tint"
                >
                  <Icon icon={BookOpen} size={14} />
                  {r.title}
                </Link>
              ))}
              {q.resourceRefs.map((r) => (
                <Link
                  key={r}
                  to="/app/resources"
                  className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1.5 text-[12.5px] text-ink-2 transition-colors hover:text-ink"
                >
                  <Icon icon={FileText} size={14} className="text-ink-3" />
                  {r}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
          <Button
            variant="ghost"
            size="md"
            iconLeft={ArrowLeft}
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={idx === 0}
          >
            Previous
          </Button>

          {!reviewing && mode === 'tutor' && !checked[q.id] ? (
            <Button
              variant="primary"
              size="md"
              disabled={chosen == null}
              onClick={() => setChecked((c) => ({ ...c, [q.id]: true }))}
            >
              Check answer
            </Button>
          ) : last ? (
            <Button
              variant="primary"
              size="md"
              iconRight={reviewing ? undefined : Trophy}
              onClick={() => setPhase('results')}
            >
              {reviewing ? 'Finish review' : 'See results'}
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
