import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import {
  ListChecks,
  Clock,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
  Play,
  BookOpen,
  ChevronDown,
  RotateCcw,
  Trophy,
  GraduationCap,
  Siren,
  Flame,
  Shuffle,
  Flag,
  Bookmark,
  TrendingDown,
} from 'lucide-react'
import { DEMANDING_DIFFICULTIES, type Question } from '@/data/qbank'
import { getSubject } from '@/data/subjects'
import { accuracyOf, bySubject as accuracyBySubject, currentStreak, dailyCounts, distinctItems, weakest } from '@/data/attemptStats'
import { useMastery } from '@/lib/useMastery'
import { useAttemptHistory, useRecordAttempt, type AttemptHistory } from '@/lib/useAttemptLog'
import { usePersistentState } from '@/lib/usePersistentState'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Meter } from '@/components/ui/Meter'
import { Segmented } from '@/components/ui/Tabs'
import { SubjectDot } from '@/components/ui/Subject'
import { ConceptText } from '@/components/concepts/ConceptText'
import { ReportContentDialog, type ReportTarget } from '@/components/reports/ReportContentDialog'
import { cn } from '@/lib/cn'
import { usePublishedQuestions } from '@/lib/usePublishedQuestions'
import { useLiveLibrary } from '@/lib/useLiveLibrary'
import { MediaAttachmentView, ZoomableImage } from '@/components/ui/MediaAttachmentView'
import { TopicChooser } from '@/components/qbank/TopicChooser'
import { QuestionNavigator, type QuestionState } from '@/components/qbank/QuestionNavigator'
import { StudyRail } from '@/components/qbank/StudyRail'
import { questionsInScope, type Scope } from '@/data/qbankScope'
import { useT } from '@/lib/i18n'

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

const MAX_QUESTIONS = 40

type PresetKind = 'weak' | 'emergency' | 'demanding' | 'everything'

/** How many marked answers a subject needs before it can be called a weakness. */
const WEAKNESS_EVIDENCE = 3

/** A review opened from a link is a short set, not a full sitting. */
const REVIEW_SESSION_SIZE = 5

/** Dotted, so `isUserOwnedState` routes these marks to the student's own record. */
const QBANK_MARKED_STORAGE_KEY = 'synapse.qbank.marked.v1'

function newSessionId(): string {
  return `qb-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

const WEEKDAY_INITIALS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

/**
 * The student's own standing in the bank.
 *
 * Every figure here was a literal: a 58% ring, "1,842 / 3,200", 72% accuracy, a
 * nine-day streak, a seven-bar chart of `[12, 20, 8, 24, 18, 30, 16]`, and five
 * per-subject accuracies — all shown identically to a student who had answered
 * nothing. They now come from the attempt log and the published bank, and the
 * panel says so plainly when there is nothing to report.
 */
function YourQbank({ questions, history }: { questions: Question[]; history: AttemptHistory }) {
  const t = useT()
  const qbankRecords = useMemo(
    () => history.records.filter((record) => record.surface === 'qbank' || record.surface === 'room'),
    [history.records],
  )
  const seen = distinctItems(qbankRecords)
  const total = questions.length
  const completedPct = total ? Math.round((Math.min(seen, total) / total) * 100) : 0
  const accuracy = accuracyOf(qbankRecords)
  const week = dailyCounts(qbankRecords, 7)
  const weekTotal = week.reduce((sum, day) => sum + day.attempts, 0)
  const peak = Math.max(1, ...week.map((day) => day.attempts))
  const streak = currentStreak(qbankRecords)
  const subjectRows = useMemo(
    () => accuracyBySubject(qbankRecords).filter((row) => row.marked >= WEAKNESS_EVIDENCE).slice(0, 6),
    [qbankRecords],
  )

  return (
    <Panel className="h-fit">
      <PanelHeader title={t('Your Qbank')} icon={ListChecks} />
      <div className="space-y-5 p-5">
        {/* Completion ring + headline */}
        <div className="flex items-center gap-4">
          <div className="relative grid size-[76px] shrink-0 place-items-center">
            <svg viewBox="0 0 36 36" className="size-full -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--color-inset)" strokeWidth="3.2" />
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--color-accent)" strokeWidth="3.2" strokeLinecap="round" strokeDasharray={`${completedPct * 0.9739} 100`} pathLength={100} />
            </svg>
            <span className="absolute tnum font-mono text-[16px] font-semibold text-ink">{completedPct}%</span>
          </div>
          <div className="min-w-0">
            <p className="text-[12px] text-ink-3">{t('Bank completed')}</p>
            <p className="tnum font-mono text-[17px] font-semibold text-ink">{seen.toLocaleString()} / {total.toLocaleString()}</p>
            <p className="mt-0.5 text-[11.5px] text-ink-3">{Math.max(0, total - seen).toLocaleString()} {t('remaining')}</p>
          </div>
        </div>

        {/* Stat trio */}
        <div className="grid grid-cols-3 gap-2 border-t border-line pt-4">
          {[
            { value: accuracy === null ? '—' : `${Math.round(accuracy * 100)}%`, label: t('Accuracy'), tone: 'text-success' },
            { value: String(weekTotal), label: t('This week'), tone: 'text-ink' },
            { value: String(streak), label: t('Day streak'), tone: 'text-accent' },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-line bg-surface-2/40 p-2.5 text-center">
              <p className={cn('tnum font-mono text-[19px] font-semibold', s.tone)}>{s.value}</p>
              <p className="mt-0.5 text-[10.5px] leading-tight text-ink-3">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Weekly activity */}
        <div className="border-t border-line pt-4">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Last 7 days')}</p>
          <div className="flex items-end justify-between gap-1.5" aria-hidden>
            {week.map((day) => (
              <div key={day.date} className="flex flex-1 flex-col items-center gap-1" title={`${day.attempts} · ${day.date}`}>
                <div className="flex h-16 w-full items-end rounded-sm bg-inset/60">
                  <div className="w-full rounded-sm bg-accent-soft" style={{ height: `${(day.attempts / peak) * 100}%` }} />
                </div>
                <span className="text-[9px] text-ink-3">{WEEKDAY_INITIALS[new Date(`${day.date}T00:00:00`).getDay()]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Accuracy by subject */}
        <div className="border-t border-line pt-4">
          <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Accuracy by subject')}</p>
          {subjectRows.length === 0 ? (
            <p className="text-[12px] leading-relaxed text-ink-3">
              {t('Answer a few questions in a subject and its accuracy appears here.')}
            </p>
          ) : (
            <div className="space-y-2.5">
              {subjectRows.map((row) => {
                const subject = getSubject(row.key)
                const acc = Math.round((row.accuracy ?? 0) * 100)
                return (
                  <div key={row.key} className="flex items-center gap-2.5">
                    <span className="inline-flex w-24 shrink-0 items-center gap-1.5 truncate text-[11.5px] text-ink-2"><SubjectDot id={row.key} />{subject.short}</span>
                    <Meter value={acc} tone={acc >= 75 ? 'success' : acc >= 60 ? 'accent' : 'warning'} className="flex-1" />
                    <span className="tnum w-9 text-end font-mono text-[11px] text-ink-2">{acc}%</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </Panel>
  )
}

export function QuestionBank() {
  const t = useT()
  const location = useLocation()
  const questions = usePublishedQuestions()
  const [params] = useSearchParams()
  const articleFilter = params.get('article')
  const [phase, setPhase] = useState<Phase>('setup')
  const [scope, setScope] = useState<Scope>(() => new Set())
  const [mode, setMode] = useState<Mode>('tutor')
  const [lenChoice, setLenChoice] = useState<'5' | '10' | '20' | '40' | 'custom'>('5')
  const [customLen, setCustomLen] = useState(15)
  const count = lenChoice === 'custom' ? Math.min(MAX_QUESTIONS, Math.max(1, customLen || 1)) : Number(lenChoice)

  const [session, setSession] = useState<Question[]>([])
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [reviewing, setReviewing] = useState(false)
  const { record } = useMastery()
  const logAttempt = useRecordAttempt()
  const history = useAttemptHistory()
  /** Groups this sitting's records, so a later attempt at the same item is distinct. */
  const [sessionId, setSessionId] = useState(() => newSessionId())
  const [elapsed, setElapsed] = useState(0)
  /** Elapsed seconds when the current question was first shown. */
  const questionStartedAt = useRef(0)
  const [reportTarget, setReportTarget] = useState<ReportTarget | null>(null)
  /** Indexes the student has actually landed on — what separates "omitted" from "unseen". */
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]))
  /**
   * Questions flagged for another look.
   *
   * Persisted per student rather than held in component state: a mark whose
   * whole purpose is "come back to this" was previously discarded the moment
   * the session ended.
   */
  const [markedIds, setMarkedIds] = usePersistentState<string[]>(QBANK_MARKED_STORAGE_KEY, [])
  const marked = useMemo(() => new Set(markedIds), [markedIds])
  const setMarked = useCallback((update: (current: Set<string>) => Set<string>) => {
    setMarkedIds((current) => [...update(new Set(current))])
  }, [setMarkedIds])
  const [showAllRationales, setShowAllRationales] = useState(false)

  const articleQuestions = useMemo(
    () => (articleFilter ? questions.filter((question) => question.libraryRefs.some((ref) => ref.id === articleFilter)) : questions),
    [articleFilter, questions],
  )
  // The live chapter tree, so a whole-chapter selection matches real content.
  const { topics: libraryTopics } = useLiveLibrary()
  const available = useMemo(() => questionsInScope(articleQuestions, scope, libraryTopics), [articleQuestions, libraryTopics, scope])

  /**
   * The subjects this student is actually weakest in.
   *
   * Was the literal `['renal', 'pharm', 'endo']` — the same three subjects for
   * everyone, including a student who had never answered a question. Empty
   * until there is enough marked work to name one.
   */
  const weakestSubjects = useMemo(
    () => weakest(accuracyBySubject(history.records), WEAKNESS_EVIDENCE, 3).map((entry) => entry.key),
    [history.records],
  )

  /**
   * The four quick-start pools, defined once.
   *
   * The counts on the buttons and the questions a button actually opens have to
   * come from the same expression, or a button can advertise a number and then
   * serve a different set — which is what happened when an empty pool silently
   * fell back to the whole bank.
   */
  const presetPool = useCallback((kind: PresetKind): Question[] => {
    if (kind === 'weak') {
      const weakSubjects = new Set(weakestSubjects)
      return questions.filter((question) => weakSubjects.has(question.subjectId))
    }
    if (kind === 'emergency') return questions.filter((question) => /acute|STEMI|acidosis|hypox/i.test(`${question.topic} ${question.vignette} ${question.stem}`))
    if (kind === 'demanding') return questions.filter((question) => DEMANDING_DIFFICULTIES.includes(question.difficulty))
    return questions
  }, [questions, weakestSubjects])

  const presetCounts = useMemo(() => ({
    weak: presetPool('weak').length,
    emergency: presetPool('emergency').length,
    demanding: presetPool('demanding').length,
    everything: questions.length,
  }), [presetPool, questions])

  /**
   * A review session opened from elsewhere in the app.
   *
   * `?concepts=` is what the dashboard's due-review list sends: the concepts the
   * mastery ledger says are shaky. `?subject=` is the broader entry point used
   * by notifications. Neither can open an empty session — `beginSession`
   * refuses one, so a stale link lands on the setup screen instead of a crash.
   */
  const reviewConcepts = params.get('concepts')
  const reviewSubject = params.get('subject')
  const openedReview = useRef(false)
  useEffect(() => {
    if (openedReview.current || (!reviewConcepts && !reviewSubject)) return
    if (!questions.length) return
    const wanted = new Set((reviewConcepts ?? '').split(',').map((id) => id.trim()).filter(Boolean))
    const pool = questions.filter((question) => {
      if (reviewSubject && question.subjectId !== reviewSubject) return false
      if (!wanted.size) return true
      return (question.conceptIds ?? []).some((id) => wanted.has(id))
    })
    if (!pool.length) return
    openedReview.current = true
    beginSession(shuffle(pool).slice(0, Math.min(REVIEW_SESSION_SIZE, pool.length)))
    // beginSession is redefined every render; the ref above is what makes this
    // run once, so re-running on its identity would defeat the guard.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, reviewConcepts, reviewSubject])

  useEffect(() => {
    if (phase !== 'running' || mode !== 'timed' || reviewing) return
    const id = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(id)
  }, [phase, mode, reviewing])

  // Landing on a question is what makes it "seen", however the student got here —
  // Next, Previous, or a jump from the navigator.
  useEffect(() => {
    setVisited((current) => (current.has(idx) ? current : new Set(current).add(idx)))
    setShowAllRationales(false)
  }, [idx])

  /**
   * Open a session on a chosen set of questions.
   *
   * An empty set is refused rather than entered. The runner indexes straight
   * into `session[idx]`, so starting with nothing to ask crashed the page —
   * which is what every quick-start button did on a bank with no published
   * questions in it.
   */
  function beginSession(picked: Question[]) {
    if (!picked.length) return
    setSession(picked)
    setSessionId(newSessionId())
    setIdx(0)
    setAnswers({})
    setChecked({})
    setReviewing(false)
    setElapsed(0)
    questionStartedAt.current = 0
    setVisited(new Set([0]))
    setShowAllRationales(false)
    setPhase('running')
  }

  function start() {
    beginSession(shuffle(available).slice(0, Math.min(count, available.length)))
  }

  function startPreset(kind: 'weak' | 'emergency' | 'demanding' | 'everything') {
    beginSession(shuffle(presetPool(kind)).slice(0, count))
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
          title={t('Question Bank')}
          description={t('Build a session, then work through exam-style questions with worked explanations linked back to the library.')}
        />

        <section className="mb-4 sm:mb-5" aria-labelledby="quick-start-title">
          <h2 id="quick-start-title" className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.09em] text-ink-3">{t('Quick start')}</h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              // Each card shows the size of the set it will actually open. The
              // old `|| questions.length` fallback made an empty preset display
              // the whole bank's count and then serve the whole bank.
              { id: 'weak' as const, title: t('Your weakest topics'), text: weakestSubjects.length ? t('Targets the subjects you score lowest in.') : t('Answer a few more questions and this will target your weakest subjects.'), icon: TrendingDown, count: presetCounts.weak },
              { id: 'emergency' as const, title: t('Emergencies only'), text: t('Time-critical questions across all systems.'), icon: Siren, count: presetCounts.emergency },
              // Named for what it filters on. It reads difficulty, and no
              // cohort accuracy exists to compare anyone against.
              { id: 'demanding' as const, title: t('Demanding questions'), text: t('The hardest questions in the bank.'), icon: Flame, count: presetCounts.demanding },
              { id: 'everything' as const, title: t('Everything, shuffled'), text: t('The full bank in random order.'), icon: Shuffle, count: presetCounts.everything },
            ].map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => startPreset(preset.id)}
                disabled={preset.count === 0}
                className="group min-h-40 rounded-xl border border-line bg-surface p-4 text-left shadow-panel transition-[border-color,background-color,box-shadow,transform] duration-150 ease-[var(--ease-out-quint)] hover:-translate-y-0.5 hover:border-accent-line hover:bg-accent-tint/15 hover:shadow-float active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 disabled:hover:border-line disabled:hover:bg-surface disabled:hover:shadow-panel sm:min-h-44"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-tint text-accent transition-colors group-hover:bg-accent group-hover:text-on-accent group-disabled:bg-inset group-disabled:text-ink-3">
                    <Icon icon={preset.icon} size={19} strokeWidth={2.15} />
                  </span>
                  <span className="tnum pt-1 font-mono text-[11.5px] text-ink-3">{preset.count} {preset.count === 1 ? t('Q') : t('Qs')}</span>
                </span>
                <strong className="mt-5 block text-[14px] font-semibold tracking-[-0.01em] text-ink">{preset.title}</strong>
                <span className="mt-1 block text-[12.5px] leading-relaxed text-ink-2">{preset.text}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="grid items-start gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Panel>
            <PanelHeader title={t('New session')} icon={GraduationCap} />
            <div className="space-y-6 p-5">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[12.5px] font-medium text-ink-2">{t('Choose a topic or subtopic')}</p>
                  {scope.size > 0 && (
                    <button onClick={() => setScope(new Set())} className="text-[12px] font-medium text-accent hover:text-accent-strong">
                      {t('Clear')}
                    </button>
                  )}
                </div>
                <TopicChooser value={scope} onChange={setScope} pool={articleQuestions} />
                <p className="mt-2 text-[11.5px] text-ink-3">
                  {scope.size === 0
                    ? t('Nothing selected — questions are drawn from the whole bank.')
                    : t('Pick a whole chapter, or expand it to choose individual subtopics.')}
                </p>
              </div>

              <div className="flex flex-wrap gap-x-10 gap-y-5">
                <div>
                  <p className="mb-2 text-[12.5px] font-medium text-ink-2">{t('Mode')}</p>
                  <Segmented
                    value={mode}
                    onChange={(v) => setMode(v as Mode)}
                    items={[
                      { value: 'tutor', label: t('Tutor') },
                      { value: 'timed', label: t('Timed') },
                    ]}
                  />
                  <p className="mt-2 max-w-xs text-[12px] text-ink-3">
                    {mode === 'tutor'
                      ? t('Explanations shown after each question.')
                      : t('Explanations shown at the end, with a timer.')}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-[12.5px] font-medium text-ink-2">{t('Number of questions')}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Segmented
                      value={lenChoice}
                      onChange={(v) => setLenChoice(v as typeof lenChoice)}
                      items={[
                        { value: '5', label: '5' },
                        { value: '10', label: '10' },
                        { value: '20', label: '20' },
                        { value: '40', label: '40' },
                        { value: 'custom', label: t('Custom') },
                      ]}
                    />
                    {lenChoice === 'custom' && (
                      <input
                        type="number"
                        min={1}
                        max={MAX_QUESTIONS}
                        value={customLen}
                        onChange={(e) => setCustomLen(Math.min(MAX_QUESTIONS, Math.max(1, Number(e.target.value) || 1)))}
                        className="h-9 w-20 rounded-md border border-line bg-surface px-2.5 text-[13.5px] text-ink focus:border-accent focus:outline-none"
                        aria-label={t('Number of questions')}
                      />
                    )}
                  </div>
                  <p className="mt-2 text-[12px] text-ink-3">{t('Up to 40 questions per block.')}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                <span className="text-[13px] text-ink-3">
                  <span className="tnum font-mono font-medium text-ink">
                    {Math.min(count, available.length)}
                  </span>{' '}
                  {t('of')} {available.length} {t('available questions')}
                </span>
                <Button variant="primary" size="md" iconLeft={Play} onClick={start} disabled={available.length === 0}>
                  {t('Start session')}
                </Button>
              </div>
            </div>
          </Panel>

          <YourQbank questions={questions} history={history} />
        </div>
      </PageContainer>
    )
  }

  /* ---- Results ------------------------------------------------------- */
  if (phase === 'results') {
    // `beginSession` refuses an empty set, so this can only be reached by a
    // stale state. Dividing by zero would print "NaN%" as a score.
    if (!session.length) { setPhase('setup'); return null }
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
  // The runner indexes straight into the session, so a missing question is a
  // crash rather than a blank screen. Falling back to setup is the only safe
  // reading of "running with nothing to ask".
  if (!q) { setPhase('setup'); return null }
  const revealed = reviewing || Boolean(checked[q.id])
  const chosen = answers[q.id]
  const last = idx === session.length - 1
  const correctRationale = q.options.find((option) => option.correct)?.rationale.trim() ?? ''
  // The importer copies the correct option's explanation into `Explanation`, so on
  // an imported question the panel below would repeat the rationale already sitting
  // under the right answer. Only show it when it genuinely says something else.
  const hasSeparateExplanation = Boolean(q.explanation.trim()) && q.explanation.trim() !== correctRationale

  /**
   * Record what this question demonstrated, once, when its answer is checked.
   *
   * `q.conceptIds` is already main-then-related with contextual concepts left
   * out, so what reaches the ledger is only what the question assessed.
   */
  function checkAnswer() {
    setChecked((c) => ({ ...c, [q.id]: true }))
    if (checked[q.id] || chosen == null) return
    const correct = Boolean(q.options[chosen]?.correct)
    const conceptIds = q.conceptIds ?? []
    // The mastery ledger only takes concept-tagged evidence, but the attempt
    // log takes every answer: an untagged question still happened, and the
    // student's totals, streak and accuracy have to include it.
    if (conceptIds.length) record({ conceptIds, source: 'question', correct })
    logAttempt({
      surface: 'qbank',
      itemId: q.id,
      subjectId: q.subjectId,
      topic: q.topic,
      difficulty: q.difficulty,
      conceptIds,
      correct,
      seconds: mode === 'timed' ? Math.max(0, elapsed - questionStartedAt.current) : null,
      sessionId,
    })
    questionStartedAt.current = elapsed
  }

  function stateFor(i: number): QuestionState {
    const item = session[i]
    const picked = answers[item.id]
    if (picked == null) return visited.has(i) && i !== idx ? 'omitted' : 'unseen'
    if (reviewing || checked[item.id]) return item.options[picked]?.correct ? 'correct' : 'incorrect'
    return 'answered'
  }

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
    <div className="mx-auto max-w-[1100px] px-4 py-6 sm:px-6">
      {/* Runner header */}
      <div className="mb-4">
        {/* Four controls will not sit on one 375px line, so the count takes its own. */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="w-full text-[13px] font-medium text-ink-2 sm:w-auto">
            Question <span className="tnum font-mono text-ink">{idx + 1}</span> of {session.length}
            {reviewing && <span className="ml-2 text-accent">· review</span>}
          </span>
          <div className="flex items-center gap-3 sm:ms-auto">
            {mode === 'timed' && !reviewing && (
              <span className="tnum inline-flex items-center gap-1.5 font-mono text-[13px] text-ink-2">
                <Icon icon={Clock} size={14} />
                {clock(elapsed)}
              </span>
            )}
            <button
              type="button"
              aria-pressed={marked.has(q.id)}
              onClick={() =>
                setMarked((current) => {
                  const next = new Set(current)
                  if (!next.delete(q.id)) next.add(q.id)
                  return next
                })
              }
              className={cn(
                'inline-flex min-h-10 items-center gap-1.5 rounded-md px-2 text-[12.5px] font-medium transition-colors sm:min-h-0',
                marked.has(q.id) ? 'text-accent-strong' : 'text-ink-3 hover:text-ink',
              )}
            >
              <Icon icon={Bookmark} size={13} className={cn(marked.has(q.id) && 'fill-current')} />
              {marked.has(q.id) ? t('Marked') : t('Mark')}
            </button>
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

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-5">
        <div className="min-w-0">
      <QuestionNavigator
        className="mb-4"
        count={session.length}
        current={idx}
        stateFor={stateFor}
        isFlagged={(i) => marked.has(session[i].id)}
        onJump={setIdx}
        graded={reviewing || mode === 'tutor'}
      />

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

        <p className="mt-4 text-[15px] leading-[1.65] text-ink/90"><ConceptText text={q.vignette} enabled={revealed} /></p>
        <p className="mt-3 text-[15.5px] font-semibold leading-snug text-ink"><ConceptText text={q.stem} enabled={revealed} /></p>

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
                <span className="flex-1 pt-0.5 text-[14px] text-ink"><ConceptText text={opt.text} enabled={revealed} /></span>
              </button>
              {revealed && (showAllRationales || chosen === i || opt.correct) && opt.rationale.trim() && (
                <p className="mt-1 ps-9 pe-1 text-[12.5px] leading-snug text-ink-2"><ConceptText text={opt.rationale} enabled={revealed} /></p>
              )}
            </div>
          ))}
        </div>

        {/* The two that matter come first; the rest are one click away. */}
        {revealed && q.options.some((option, i) => !option.correct && chosen !== i && option.rationale.trim()) && (
          <button
            type="button"
            onClick={() => setShowAllRationales((value) => !value)}
            aria-expanded={showAllRationales}
            className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-[12.5px] font-medium text-accent-strong transition-colors hover:text-accent sm:min-h-0"
          >
            <Icon
              icon={ChevronDown}
              size={14}
              className={cn('transition-transform duration-200', !showAllRationales && '-rotate-90 rtl:rotate-90')}
            />
            {showAllRationales ? t('Hide the other options') : t('Why the other options fail')}
          </button>
        )}

        {/* Only when it adds something the option rationales did not already say. */}
        {revealed && hasSeparateExplanation && (
          <div className="mt-5 rounded-xl border border-line bg-surface-2 p-4">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">
              {t('Explanation')}
            </p>
            <p className="text-[14px] leading-relaxed text-ink"><ConceptText text={q.explanation} enabled={revealed} /></p>
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
              onClick={checkAnswer}
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
        </div>

        <StudyRail question={q} revealed={revealed} location={location} className="lg:sticky lg:top-6" />
      </div>
      <ReportContentDialog open={Boolean(reportTarget)} target={reportTarget} onClose={() => setReportTarget(null)} />
    </div>
  )
}
