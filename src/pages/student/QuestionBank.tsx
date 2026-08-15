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
  MessageSquareWarning,
  XCircle,
  LogOut,
  History,
  TrendingDown,
  MoreHorizontal,
  Square,
  Eye,
  Trash2,
} from 'lucide-react'
import { DEMANDING_DIFFICULTIES, type Question } from '@/data/qbank'
import { bySession, type SessionSummary } from '@/data/attemptStats'
import { formatLongDate } from '@/lib/format'
import { getSubject } from '@/data/subjects'
import { accuracyOf, bySubject as accuracyBySubject, currentStreak, dailyCounts, distinctItems, weakest } from '@/data/attemptStats'
import { useMastery } from '@/lib/useMastery'
import { useAttemptHistory, useDeleteAttemptSession, useRecordAttempt, type AttemptHistory } from '@/lib/useAttemptLog'
import { usePersistentState } from '@/lib/usePersistentState'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Meter } from '@/components/ui/Meter'
import { Segmented, Tabs } from '@/components/ui/Tabs'
import { TextInput } from '@/components/ui/Field'
import { IconButton } from '@/components/ui/IconButton'
import { ContextMenu } from '@/components/ui/ContextMenu'
import { Dialog } from '@/components/ui/Dialog'
import { SubjectDot } from '@/components/ui/Subject'
import { ConceptText } from '@/components/concepts/ConceptText'
import { ReportContentDialog, type ReportTarget } from '@/components/reports/ReportContentDialog'
import { cn } from '@/lib/cn'
import { useCatalogueAvailability } from '@/lib/useCatalogueAvailability'
import { CatalogueUnavailable } from '@/components/ui/CatalogueUnavailable'
import { usePublishedQuestions } from '@/lib/usePublishedQuestions'
import { useLiveLibrary } from '@/lib/useLiveLibrary'
import { MediaAttachmentView, ZoomableImage } from '@/components/ui/MediaAttachmentView'
import { TopicChooser } from '@/components/qbank/TopicChooser'
import { QuestionNavigator, type QuestionState } from '@/components/qbank/QuestionNavigator'
import { StudyRail } from '@/components/qbank/StudyRail'
import { chooserTopics, questionsInScope, type Scope } from '@/data/qbankScope'
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
                    {/* The marker carries the code, so repeating it as text
                        beside itself was saying the same word twice. */}
                    <span className="inline-flex w-24 shrink-0 items-center gap-1.5 truncate text-[11.5px] text-ink-2" title={subject.name}><SubjectDot id={row.key} /></span>
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

/** Everything needed to put a half-finished sitting back on screen. */
interface LiveSession {
  questionIds: string[]
  idx: number
  answers: Record<string, number>
  checked: Record<string, boolean>
  mode: Mode
  sessionId: string
  elapsed: number
  visited: number[]
  reviewing: boolean
  name: string
  phase: Exclude<Phase, 'setup'>
  startedAt: string
}

/** Dotted, so `isUserOwnedState` routes it to the student's own record. */
const ACTIVE_SESSION_STORAGE_KEY = 'synapse.qbank.activeSession.v1'
const SESSION_NAMES_STORAGE_KEY = 'synapse.qbank.sessionNames.v1'

/**
 * Tests already taken.
 *
 * Reconstructed from the attempt log rather than stored twice: every record has
 * always carried the sessionId of the sitting that produced it, and nothing ever
 * read it back, so a student had no way to see what they had done.
 */
function PreviousTests({
  sessions,
  names,
  liveSessionId,
  onRename,
  onResume,
  onTerminate,
  onReview,
  onDelete,
  canReview,
  t,
}: {
  sessions: SessionSummary[]
  names: Record<string, string>
  /** The sitting still in progress, if there is one. */
  liveSessionId: string | null
  onRename: (sessionId: string, name: string) => void
  onResume: () => void
  onTerminate: () => void
  onReview: (sessionId: string) => void
  onDelete: (sessionId: string) => void
  canReview: (sessionId: string) => boolean
  t: (key: string) => string
}) {
  const [editing, setEditing] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [menu, setMenu] = useState<{ sessionId: string; x: number; y: number } | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  if (!sessions.length) {
    return (
      <Panel>
        <div className="px-5 py-12 text-center">
          <span className="mx-auto grid size-11 place-items-center rounded-xl bg-inset text-ink-3"><Icon icon={History} size={20} /></span>
          <p className="mt-3 text-[14px] font-semibold text-ink">{t('No tests yet')}</p>
          <p className="mx-auto mt-1 max-w-sm text-[12.5px] leading-relaxed text-ink-3">{t('Start a session and it will be kept here, with what you scored.')}</p>
        </div>
      </Panel>
    )
  }

  return (
    <Panel>
      <ul className="divide-y divide-line">
        {sessions.map((entry) => {
          const name = names[entry.sessionId]?.trim() || t('Untitled test')
          const isEditing = editing === entry.sessionId
          return (
            <li key={entry.sessionId} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3.5">
              <div className="min-w-0 flex-1">
                {isEditing ? (
                  <form
                    onSubmit={(event) => { event.preventDefault(); onRename(entry.sessionId, draft.trim()); setEditing(null) }}
                    className="flex items-center gap-2"
                  >
                    <TextInput
                      value={draft}
                      autoFocus
                      maxLength={60}
                      onChange={(event) => setDraft(event.target.value)}
                      onBlur={() => { onRename(entry.sessionId, draft.trim()); setEditing(null) }}
                      aria-label={t('Test name')}
                    />
                  </form>
                ) : (
                  <button
                    type="button"
                    onClick={() => { setDraft(names[entry.sessionId] ?? ''); setEditing(entry.sessionId) }}
                    className="block max-w-full truncate text-start text-[13.5px] font-semibold text-ink hover:text-accent-strong"
                    title={t('Rename')}
                  >
                    {name}
                  </button>
                )}
                <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[11.5px] text-ink-3">
                  <span>{formatLongDate(new Date(entry.startedAt))}</span>
                  <span aria-hidden>·</span>
                  <span>{entry.answered} {entry.answered === 1 ? t('question') : t('questions')}</span>
                  {entry.subjectIds.slice(0, 2).map((subjectId) => (
                    <span key={subjectId} className="inline-flex items-center gap-1"><SubjectDot id={subjectId} />{getSubject(subjectId).name}</span>
                  ))}
                </p>
              </div>
              {entry.sessionId === liveSessionId && (
                <Badge tone="warning">{t('In progress')}</Badge>
              )}
              {/* An unmarked sitting shows a dash, not a nought: nobody scored it. */}
              <span className="tnum shrink-0 font-mono text-[15px] font-semibold text-ink">
                {entry.accuracy == null ? '—' : `${Math.round(entry.accuracy * 100)}%`}
              </span>
              {/* A sitting could be renamed and nothing else — not resumed, not
                  reopened, not removed. */}
              <IconButton
                icon={MoreHorizontal}
                label={`${t('Actions for')} ${name}`}
                size="sm"
                onClick={(event) => {
                  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
                  setMenu({ sessionId: entry.sessionId, x: rect.left, y: rect.bottom + 4 })
                }}
              />
            </li>
          )
        })}
      </ul>

      {menu && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          onClose={() => setMenu(null)}
          items={[
            ...(menu.sessionId === liveSessionId ? [
              { id: 'resume', label: t('Resume this test'), icon: Play, onSelect: onResume },
              { id: 'terminate', label: t('End this test'), icon: Square, onSelect: onTerminate },
            ] : []),
            {
              id: 'review',
              label: t('Review answers'),
              icon: Eye,
              disabled: !canReview(menu.sessionId),
              onSelect: () => onReview(menu.sessionId),
            },
            {
              id: 'delete',
              label: t('Delete this test'),
              icon: Trash2,
              tone: 'danger' as const,
              separated: true,
              onSelect: () => setConfirmDelete(menu.sessionId),
            },
          ]}
        />
      )}

      {confirmDelete && (
        <Dialog onClose={() => setConfirmDelete(null)} label={t('Delete this test')} size="sm">
          <PanelHeader title={t('Delete this test')} icon={Trash2} />
          <div className="space-y-4 p-5">
            {/* Said plainly, because it is not only a row disappearing: these
                answers are part of the accuracy every other screen reports. */}
            <p className="text-[13.5px] leading-relaxed text-ink-2">
              {t('This removes every answer from that sitting. Your overall accuracy and progress will be recalculated without them, and it cannot be undone.')}
            </p>
            <div className="flex justify-end gap-2 border-t border-line pt-4">
              <Button variant="ghost" onClick={() => setConfirmDelete(null)}>{t('Cancel')}</Button>
              <Button
                variant="danger"
                iconLeft={Trash2}
                onClick={() => { onDelete(confirmDelete); setConfirmDelete(null) }}
              >
                {t('Delete')}
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </Panel>
  )
}

export function QuestionBank() {
  const t = useT()
  const location = useLocation()
  const questions = usePublishedQuestions()
  const availability = useCatalogueAvailability(questions.length)
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
  /** What the student called this sitting, if anything. */
  const [sessionName, setSessionName] = useState('')
  const [hubTab, setHubTab] = useState<'new' | 'previous'>('new')
  /**
   * What each finished sitting is called.
   *
   * The records themselves carry no name — only a sessionId — so the names live
   * beside them, keyed by that id. A sitting with no entry falls back to what it
   * covered, so nothing is ever nameless.
   */
  const [savedNames, setSavedNames] = usePersistentState<Record<string, string>>(SESSION_NAMES_STORAGE_KEY, {})


  /**
   * The sitting in progress, kept where a route change cannot take it.
   *
   * All of the above is component state, and this page is a route element — so
   * following a link to the library or a resource unmounted it and threw the
   * session away. Coming back landed on an empty setup form with no way to
   * reach the questions again. Only ids are stored; the questions themselves
   * are rebuilt from the published bank, which is already cached.
   */
  const [saved, setSaved, savedStatus] = usePersistentState<LiveSession | null>(ACTIVE_SESSION_STORAGE_KEY, null)
  const restored = useRef(false)
  // Held in a ref, not read back from `saved`: the mirror effect below writes
  // `saved`, so depending on it there would make the write retrigger the effect
  // that performed it — which is exactly the render loop this avoids.
  const startedAt = useRef<string | null>(null)

  useEffect(() => {
    if (restored.current || !savedStatus.hydrated || !saved || !questions.length) return
    const rebuilt = saved.questionIds
      .map((id) => questions.find((question) => question.id === id))
      .filter((question): question is Question => Boolean(question))
    // A session whose questions have since been unpublished cannot be resumed
    // honestly, so it is dropped rather than silently shortened.
    if (rebuilt.length !== saved.questionIds.length) { setSaved(null); restored.current = true; return }
    restored.current = true
    startedAt.current = saved.startedAt
    setSession(rebuilt)
    setIdx(Math.min(saved.idx, rebuilt.length - 1))
    setAnswers(saved.answers)
    setChecked(saved.checked)
    setMode(saved.mode)
    setSessionId(saved.sessionId)
    setElapsed(saved.elapsed)
    setVisited(new Set(saved.visited))
    setReviewing(saved.reviewing)
    setSessionName(saved.name)
    setPhase(saved.phase)
  }, [questions, saved, savedStatus.hydrated, setSaved])

  // Mirror the sitting outward. Debounced by the state store, so this is one
  // write per pause rather than one per answer.
  useEffect(() => {
    if (!savedStatus.hydrated) return
    // Being at the hub no longer means the sitting is over. Leaving a session
    // used to discard it outright, so "End session" was the only way out of a
    // test and it destroyed the test — there was nothing left to resume. The
    // stored sitting is now cleared only where it is genuinely finished with:
    // `discardSession`, called from Terminate, from "Start another", and from
    // the guards that find themselves with no questions.
    if (phase === 'setup') return
    if (!startedAt.current) startedAt.current = new Date().toISOString()
    setSaved({
      questionIds: session.map((question) => question.id),
      idx, answers, checked, mode, sessionId, elapsed,
      visited: [...visited],
      reviewing,
      name: sessionName,
      phase,
      startedAt: startedAt.current,
    })
    // `saved` is deliberately not a dependency — see startedAt above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, session, idx, answers, checked, mode, sessionId, elapsed, visited, reviewing, sessionName, savedStatus.hydrated, setSaved])

  const articleQuestions = useMemo(
    () => (articleFilter ? questions.filter((question) => question.libraryRefs.some((ref) => ref.id === articleFilter)) : questions),
    [articleFilter, questions],
  )
  // The live chapter tree, so a whole-chapter selection matches real content.
  const { topics: publishedTopics } = useLiveLibrary()
  // The same merged tree the chooser offers, or a chapter picked there — one
  // the library has no article for — would resolve to no questions at all.
  const libraryTopics = useMemo(() => chooserTopics(questions, publishedTopics), [questions, publishedTopics])
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

  /**
   * Names the student's own tests per subject: "Cardiovascular · Test 3".
   *
   * Counting only sittings whose name shares the stem means renaming one does
   * not renumber the rest, and a session spanning subjects is simply "Mixed".
   */
  const sessionSummaries = useMemo(() => bySession(history.records), [history.records])

  /**
   * The questions a finished sitting can be reopened with.
   *
   * Rebuilt from the attempt log, which has always recorded which item each
   * answer belonged to. A question since unpublished simply is not in the list,
   * and a sitting with none left cannot be reviewed — said by disabling the
   * action rather than by opening an empty runner.
   */
  const reviewableQuestions = useCallback((sessionId: string) => {
    const itemIds = history.records
      .filter((record) => record.sessionId === sessionId && record.surface === 'qbank')
      .map((record) => record.itemId)
    return itemIds
      .map((itemId) => questions.find((question) => question.id === itemId))
      .filter((question): question is Question => Boolean(question))
  }, [history.records, questions])

  /** Put a finished sitting back on screen, read-only, with its answers. */
  function reviewSession(sessionId: string) {
    const rebuilt = reviewableQuestions(sessionId)
    if (!rebuilt.length) return
    const answered: Record<string, number> = {}
    const marked: Record<string, boolean> = {}
    for (const record of history.records) {
      if (record.sessionId !== sessionId || record.surface !== 'qbank') continue
      marked[record.itemId] = true
      const question = rebuilt.find((item) => item.id === record.itemId)
      if (!question) continue
      // The log records whether the answer was right, not which option was
      // chosen, so a wrong answer is shown as wrong without inventing which.
      const correctIndex = question.options.findIndex((option) => option.correct)
      if (record.correct === true && correctIndex >= 0) answered[record.itemId] = correctIndex
    }
    setSession(rebuilt)
    setAnswers(answered)
    setChecked(marked)
    setVisited(new Set(rebuilt.map((_, index) => index)))
    setSessionId(sessionId)
    setSessionName(savedNames[sessionId] ?? t('Untitled test'))
    setIdx(0)
    setReviewing(true)
    setPhase('running')
  }

  /** Pick a paused sitting back up exactly where it was left. */
  function resumeSaved() {
    if (!saved) return
    setPhase(saved.phase)
  }

  /** The sitting is finished with — stop offering to resume it. */
  function discardSession() {
    startedAt.current = null
    setSaved(null)
    setPhase('setup')
  }

  const removeAttemptSession = useDeleteAttemptSession()
  function deleteSession(sessionId: string) {
    removeAttemptSession(sessionId)
    setSavedNames((current) => {
      const next = { ...current }
      delete next[sessionId]
      return next
    })
    if (saved?.sessionId === sessionId) setSaved(null)
  }

  const scopeSubjectName = useMemo(() => {
    const subjectIds = new Set(available.map((question) => question.subjectId))
    return subjectIds.size === 1 ? getSubject([...subjectIds][0]).name : t('Mixed')
  }, [available, t])
  const autoSessionName = useMemo(() => {
    const used = sessionSummaries.filter((summary: SessionSummary) => (savedNames[summary.sessionId] ?? '').startsWith(scopeSubjectName)).length
    return `${scopeSubjectName} · ${t('Test')} ${used + 1}`
  }, [scopeSubjectName, sessionSummaries, savedNames, t])

  function start() {
    // Named now rather than when it ends: a sitting abandoned halfway still
    // produced records, and those should not appear as an unnamed row.
    setSavedNames((current) => ({ ...current, [sessionId]: sessionName.trim() || autoSessionName }))
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
  if (phase === 'setup' && availability.kind !== 'ready') {
    return (
      <PageContainer>
        <PageHeader title={t('Question Bank')} />
        <CatalogueUnavailable
          availability={availability}
          empty={{
            title: t('No questions have been published yet'),
            description: t('Questions appear here once they are published. Nothing is lost — your progress and saved sessions are kept.'),
          }}
        />
      </PageContainer>
    )
  }

  if (phase === 'setup') {
    return (
      <PageContainer>
        <PageHeader title={t('Question Bank')} />

        <section className="mb-4 sm:mb-5" aria-labelledby="quick-start-title">
          <h2 id="quick-start-title" className="mb-2 text-[11px] font-bold uppercase tracking-[0.09em] text-ink-3">{t('Quick start')}</h2>
          {/* One compact row. These were four tall cards carrying a sentence of
              explanation each, which took the whole first screen to say what a
              label and a count already say. */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'weak' as const, title: t('Your weakest topics'), icon: TrendingDown, count: presetCounts.weak },
              { id: 'emergency' as const, title: t('Emergencies only'), icon: Siren, count: presetCounts.emergency },
              { id: 'demanding' as const, title: t('Demanding questions'), icon: Flame, count: presetCounts.demanding },
              { id: 'everything' as const, title: t('Everything, shuffled'), icon: Shuffle, count: presetCounts.everything },
            ].map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => startPreset(preset.id)}
                disabled={preset.count === 0}
                title={preset.count === 0 ? t('No questions match this yet') : undefined}
                className="group inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-[13px] font-medium text-ink shadow-panel transition-colors hover:border-accent-line hover:bg-accent-tint/20 disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:border-line disabled:hover:bg-surface sm:min-h-9"
              >
                <Icon icon={preset.icon} size={15} className="text-accent group-disabled:text-ink-3" />
                {preset.title}
                <span className="tnum rounded-full bg-inset px-1.5 font-mono text-[11px] text-ink-2">{preset.count}</span>
              </button>
            ))}
          </div>
        </section>

        <Tabs
          className="mb-4"
          value={hubTab}
          onChange={(next) => setHubTab(next as 'new' | 'previous')}
          items={[
            { value: 'new', label: t('New session'), icon: GraduationCap },
            { value: 'previous', label: t('Previous tests'), icon: History, count: sessionSummaries.length },
          ]}
        />

        {hubTab === 'previous' ? (
          <PreviousTests
            sessions={sessionSummaries}
            names={savedNames}
            liveSessionId={saved?.sessionId ?? null}
            onRename={(sessionId, name) => setSavedNames((current) => ({ ...current, [sessionId]: name }))}
            onResume={resumeSaved}
            onTerminate={discardSession}
            onReview={reviewSession}
            onDelete={deleteSession}
            canReview={(sessionId) => reviewableQuestions(sessionId).length > 0}
            t={t}
          />
        ) : (
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

              <div>
                <label htmlFor="session-name" className="mb-2 block text-[12.5px] font-medium text-ink-2">{t('Name this test')}</label>
                <TextInput
                  id="session-name"
                  value={sessionName}
                  onChange={(event) => setSessionName(event.target.value)}
                  placeholder={autoSessionName}
                  maxLength={60}
                />
                <p className="mt-1.5 text-[11.5px] text-ink-3">{t('Optional. Left blank, it is named for what it covers.')}</p>
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
        )}
      </PageContainer>
    )
  }

  /* ---- Results ------------------------------------------------------- */
  if (phase === 'results') {
    // `beginSession` refuses an empty set, so this can only be reached by a
    // stale state. Dividing by zero would print "NaN%" as a score.
    if (!session.length) { discardSession(); return null }
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
          <Button variant="primary" size="md" iconLeft={RotateCcw} onClick={discardSession}>
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
  if (!q) { discardSession(); return null }
  const revealed = reviewing || Boolean(checked[q.id])
  const chosen = answers[q.id]
  const last = idx === session.length - 1
  const correctRationale = q.options.find((option) => option.correct)?.rationale.trim() ?? ''
  // The importer copies the correct option's explanation into `Explanation`, so on
  // an imported question the panel below would repeat the rationale already sitting
  // under the right answer. Only show it when it genuinely says something else.
  const hasSeparateExplanation = Boolean(q.explanation.trim()) && q.explanation.trim() !== correctRationale
  // Every option that is neither correct nor the one chosen, and that actually
  // has something to say. The index is kept so each keeps its own letter.
  const wrongOptions = q.options
    .map((option, index) => ({ option, index }))
    .filter(({ option, index }) => !option.correct && index !== chosen && option.rationale.trim())

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
        {/* The position is stated once, by the navigator below. This line used
            to repeat it as "Question 1 of 5" directly above "QUESTIONS 1/5". */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {reviewing && <span className="text-[13px] font-medium text-accent">{t('Reviewing')}</span>}
          <div className="flex items-center gap-2 sm:ms-auto">
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
              <Icon icon={Flag} size={13} className={cn(marked.has(q.id) && 'fill-current')} />
              {marked.has(q.id) ? t('Flagged') : t('Flag')}
            </button>
            <button
              type="button"
              onClick={() => setReportTarget({ kind: 'question', id: q.id, title: q.stem })}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-md px-2 text-[12.5px] font-medium text-ink-3 transition-colors hover:bg-danger-tint hover:text-danger sm:min-h-0"
            >
              <Icon icon={MessageSquareWarning} size={13} />
              {t('Report')}
            </button>
            <button
              onClick={() => setPhase(reviewing ? 'results' : 'setup')}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-line-2 bg-surface px-3 text-[12.5px] font-semibold text-ink shadow-panel transition-colors hover:bg-inset sm:min-h-9"
            >
              <Icon icon={reviewing ? ArrowLeft : LogOut} size={14} />
              {reviewing ? t('Back to results') : t('End session')}
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
          <span className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-ink">
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

        {/* Once the answer is revealed an option stops being a control and
            becomes prose. It used to stay a `<button disabled>`, which swallows
            pointer events for everything inside it — so the concept links in
            the answers went live and dead at the same instant, and the one
            place they matter most was the one place they never worked. */}
        <div className="mt-5 space-y-2.5">
          {q.options.map((opt, i) => {
            const body = (
              <>
                <span
                  className={cn(
                    'grid size-6 shrink-0 place-items-center rounded-full border text-[12px] font-semibold',
                    revealed && opt.correct
                      ? 'border-success bg-success text-on-success'
                      : revealed && chosen === i
                        ? 'border-danger bg-danger text-on-danger'
                        : chosen === i
                          ? 'border-accent bg-accent text-on-accent'
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
              </>
            )
            const shape = cn('flex w-full items-start gap-3 rounded-lg border p-3 text-start transition-colors', optionClasses(i))
            return (
              <div key={i}>
                {revealed ? (
                  <div className={shape}>{body}</div>
                ) : (
                  <button onClick={() => setAnswers((a) => ({ ...a, [q.id]: i }))} className={cn(shape, 'cursor-pointer')}>
                    {body}
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {/* Everything explanatory reads at the end of the page, in order: why
            the right answer is right, then why each wrong one is wrong. It used
            to be scattered under whichever options happened to be revealed. */}
        {revealed && (
          <div className="mt-6 space-y-3">
            {correctRationale && (
              <div className="rounded-xl border border-success/30 bg-success-tint/40 p-4">
                <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-success">
                  <Icon icon={Check} size={13} strokeWidth={2.6} />
                  {t('Why the right answer is right')}
                </p>
                <p className="text-[14px] leading-relaxed text-ink"><ConceptText text={correctRationale} enabled /></p>
              </div>
            )}

            {hasSeparateExplanation && (
              <div className="rounded-xl border border-line bg-surface-2 p-4">
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Explanation')}</p>
                <p className="text-[14px] leading-relaxed text-ink"><ConceptText text={q.explanation} enabled /></p>
              </div>
            )}

            {wrongOptions.length > 0 && (
              <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-panel">
                <button
                  type="button"
                  onClick={() => setShowAllRationales((value) => !value)}
                  aria-expanded={showAllRationales}
                  className="flex w-full items-center gap-2 px-4 py-3.5 text-start transition-colors hover:bg-inset"
                >
                  <Icon icon={XCircle} size={16} className="shrink-0 text-danger" />
                  <span className="flex-1 text-[13.5px] font-semibold text-ink">{t('Why the wrong answers are wrong')}</span>
                  <span className="tnum rounded-full bg-inset px-2 py-0.5 font-mono text-[11px] text-ink-2">{wrongOptions.length}</span>
                  <Icon
                    icon={ChevronDown}
                    size={16}
                    className={cn('shrink-0 text-ink-3 transition-transform duration-200', !showAllRationales && '-rotate-90 rtl:rotate-90')}
                  />
                </button>
                {showAllRationales && (
                  <ul className="divide-y divide-line border-t border-line">
                    {wrongOptions.map(({ option, index }) => (
                      <li key={index} className="flex gap-3 px-4 py-3">
                        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-line-2 bg-surface-2 font-mono text-[11px] font-bold text-ink-2">{LETTERS[index]}</span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[13px] font-medium text-ink">{option.text}</span>
                          <span className="mt-1 block text-[12.5px] leading-relaxed text-ink-2"><ConceptText text={option.rationale} enabled /></span>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
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
