import { ContentSkeleton } from '@/components/loading/PageSkeleton'
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useBlocker, useLocation, useSearchParams } from 'react-router-dom'
import {
  ListChecks,
  Clock,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
  Play,
  AlertTriangle,
  BookOpen,
  RotateCcw,
  Trophy,
  Columns2,
  Layers,
  ChevronRight,
}from 'lucide-react'
import { type Question } from '@/data/qbank'
import { bySession, sessionDetail, type SessionSummary } from '@/data/attemptStats'
import { useSubjectName } from '@/lib/useSubjectName'
import { useMastery } from '@/lib/useMastery'
import {
  attemptedIds,
  incorrectIds,
  omittedIds,
  pruneManifests,
  questionsById,
  type SessionManifests,
}from '@/data/qbankCollections'
import {
  clearsStoredSitting,
  finishedManifests,
  liveSittingId,
  pendingAttempts,
  persistsSitting,
  restorableQuestions,
  selectClearsStrike,
  timedClock,
  type Phase,
}from '@/data/qbankSession'
import { QbankHub, type QbankBank, type QbankHubTab } from '@/components/qbank/hub/QbankHub'
import { TestBuilder } from '@/components/qbank/hub/TestBuilder'
import { UnifiedBuilder } from '@/components/qbank/unified/UnifiedBuilder'
import { useMixedSession } from '@/lib/useMixedSession'
import { mixedClosed, mixedFinished } from '@/data/mixedSession'
import { PreviousTestsTab, type PreviousFilter } from '@/components/qbank/hub/PreviousTestsTab'
import { SittingRows } from '@/components/qbank/unified/SittingRows'
import { useSittings } from '@/lib/useSittings'
import { sittingsOfKind, type SittingKind } from '@/data/sittings'
import { useAttemptHistory, useDeleteAttemptSession, useRecordAttempt, useRecordAttempts } from '@/lib/useAttemptLog'
import { usePersistentState } from '@/lib/usePersistentState'
import { ContinueCard } from '@/components/qbank/ContinueCard'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { IconButton } from '@/components/ui/IconButton'
import { Dialog } from '@/components/ui/Dialog'
import { SubjectDot } from '@/components/ui/Subject'
import { type ReportTarget } from '@/components/reports/ReportContentDialog'
import { cn } from '@/lib/cn'
import { useCatalogueAvailability } from '@/lib/useCatalogueAvailability'
import { CatalogueUnavailable } from '@/components/ui/CatalogueUnavailable'
import { useLiveLibrary } from '@/lib/useLiveLibrary'
import { type QuestionState } from '@/components/qbank/QuestionNavigator'
import {
  HighlightSelectionPopover,
  HighlightableText,
  useQuestionHighlights,
}from '@/components/qbank/QuestionHighlights'
import { chooserTopics, questionsInScope, questionsInSources, type Scope } from '@/data/qbankScope'
import { useT } from '@/lib/i18n'
import { useImmersion } from '@/components/shell/ImmersionContext'
import { useAnswerDistribution } from '@/lib/useAnswerDistribution'
import { answerPercentages } from '@/data/answerDistribution'
import { sourceOptions } from '@/data/sourceCoverage'
import {
  QUESTION_SOURCES,
  QUESTION_SOURCE_LABEL,
  UNSPECIFIED_SOURCE,
  UNSPECIFIED_SOURCE_LABEL,
  type SourceBucket,
}from '@/data/questionSource'
import {
  ACTIVE_SESSION_STORAGE_KEY,
  LETTERS,
  QBANK_MARKED_STORAGE_KEY,
  REVIEW_SESSION_SIZE,
  SESSION_NAMES_STORAGE_KEY,
  SESSION_QUESTIONS_STORAGE_KEY,
  clock,
  diffTone,
  newSessionId,
  readBank,
  readTab,
  shuffle,
  type LiveSession,
  type Mode,
  type Source,
}from './qbank/state'
import { SessionDetailPanel } from './qbank/SessionDetailPanel'
import { WHOLE_BANK, useQbankQuestions } from './qbank/useQbankQuestions'
import {
  LazyAnswerStatBar,
  LazyEndSessionDialog,
  LazyMediaAttachmentView,
  LazyMixedRunner,
  LazyMixedSummary,
  LazyPreviousTests,
  LazyQuestionNavigator,
  LazyQuickAddFlashcardDialog,
  LazyReportContentDialog,
  LazyStudyRail,
  LazyZoomableImage,
  preloadMixedRunner,
  preloadPreviousTests,
  preloadRunnerSurface,
}from './qbank/runnerLazy'

export function QuestionBank() {
  const t = useT()
  const subjectName = useSubjectName()
  const location = useLocation()
  const { questions, realQuestions, setNeedsFullQuestions, setFullScope, runWhenHydrated } = useQbankQuestions()
  const availability = useCatalogueAvailability(questions.length)
  const [params, setParams] = useSearchParams()
  const articleFilter = params.get('article')
  const [phase, setPhase] = useState<Phase>('setup')
  const [scope, setScope] = useState<Scope>(() => new Set())
  const [mode, setMode] = useState<Mode>('tutor')
  const [source, setSource] = useState<Source>('all')
  // Empty set = all sources, the pre-feature behaviour — an untouched builder
  // draws from everything, exactly as `questionsInSources` already treats it.
  const [sourceSel, setSourceSel] = useState<Set<SourceBucket>>(() => new Set())
  // Toggles one bucket in or out of the selection, immutably, like the topic
  // scope toggles elsewhere in this file.
  const toggleSource = useCallback((bucket: SourceBucket) => {
    setSourceSel((current) => {
      const next = new Set(current)
      if (next.has(bucket)) next.delete(bucket)
      else next.add(bucket)
      return next
    })
  }, [])
  const [count, setCount] = useState(5)

  const [session, setSession] = useState<Question[]>([])
  /**
   * A start whose questions are still being built.
   *
   * The first sitting in a subject waits on `useScopedPublishedQuestions` to
   * fetch and build the heavy options/explanations — a second or two on a cold
   * subject. Rather than leave the student on the hub staring at a Start button
   * that has visibly done nothing, the runner opens *now*, on a shape of the
   * test with the first stem already legible (summaries carry it), and swaps in
   * the real, answerable questions the moment they land. `preview` is the
   * lightweight slice picked for the sitting; `phase` stays `'setup'` under this
   * overlay, so nothing is timed, mirrored to storage or graded until the swap.
   */
  const [preparing, setPreparing] = useState<{ preview: Question[]; name?: string } | null>(null)
  const [idx, setIdx] = useState(0)
  // Called unconditionally, ahead of the phase branches below, like every
  // other hook in this component — `session[idx]` is simply undefined outside
  // the running phase, which the hook treats as just another (empty) key.
  const highlights = useQuestionHighlights(session[idx]?.id ?? '')
  const questionCardRef = useRef<HTMLDivElement>(null)
  const [flashcardSeed, setFlashcardSeed] = useState<{ front: string; back: string } | null>(null)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [struck, setStruck] = useState<Record<string, number[]>>({})
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [reviewing, setReviewing] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  // Peer answer breakdown for whatever question is currently on screen. Same
  // unconditional-hook reasoning as `highlights` above: outside the running
  // phase this resolves to a null id and the hook simply returns null.
  const distribution = useAnswerDistribution(
    session[idx]?.id ?? null,
    reviewing || (mode === 'tutor' && Boolean(checked[session[idx]?.id ?? ''])),
  )
  /**
   * Direction 2's sitting: one queue drawn from the MCQ, practical and essay
   * banks. It is deliberately separate from the MCQ session state above — the
   * runner below the hub, its timer, its navigator and its report are
   * untouched, and a mixed sitting is a different thing that happens to start
   * from the same tab.
   *
   * Declared here, above the immersion and navigation guards, because a mixed
   * sitting is a sitting: it takes the screen and it warns before it is left,
   * exactly as an MCQ paper does.
   */
  const mixed = useMixedSession()
  // Stamped when the queue runs out rather than read at render, so the report's
  // "Time" is the time the sitting took and not the time the page has been open.
  const [mixedEndedAt, setMixedEndedAt] = useState<number | null>(null)
  /** A mixed queue is open and not yet finished — the runner is on screen. */
  const mixedRunning = Boolean(mixed.session) && !mixedFinished(mixed.session!)
  /** The student is being asked whether to leave a mixed sitting. */
  const [mixedLeaveOpen, setMixedLeaveOpen] = useState(false)

  /**
   * Clear a mixed sitting that is already over.
   *
   * This is the one thing standing between a student and a Question Bank they
   * cannot open. The document is written on a debounce, so a tab closed on the
   * report — or a render that throws before the write flushes — leaves a
   * finished sitting in `nishany.qbank.mixedSession.v1`; every later visit then
   * rendered that sitting's report instead of the hub, and the only control on
   * that screen was the one whose write had already failed to land. Sweeping it
   * here means the key is cleared on the next persisted write however the
   * previous visit ended, so nothing has to be deleted by hand.
   *
   * `mixedEndedAt` is component state and is null on every fresh mount, so this
   * can never fire on a report the student is actually reading.
   */
  const endMixed = mixed.end
  const mixedSession = mixed.session
  useEffect(() => {
    if (!mixedSession || mixedEndedAt != null) return
    if (mixedClosed(mixedSession) || mixedFinished(mixedSession)) endMixed()
  }, [mixedSession, endMixed, mixedEndedAt])

  // Sitting a test is the one thing here that wants the width, and the one
  // thing a student should not have to tidy the screen for first. A mixed
  // sitting is one too: it used to leave the sidebar up while an OSCE station
  // ran, which is the one screen that needs the width most.
  const { setImmersive } = useImmersion()
  useEffect(() => {
    // `preparing` is the running frame opening ahead of its questions, so it
    // owns the width the same way a live sitting does.
    setImmersive(phase === 'running' || preparing != null || (phase === 'setup' && mixedRunning))
    return () => setImmersive(false)
  }, [phase, preparing, mixedRunning, setImmersive])
  const { record } = useMastery()
  const logAttempt = useRecordAttempt()
  const logAttempts = useRecordAttempts()
  const history = useAttemptHistory()
  /** Groups this sitting's records, so a later attempt at the same item is distinct. */
  const [sessionId, setSessionId] = useState(() => newSessionId())
  const [elapsed, setElapsed] = useState(0)
  /** Elapsed seconds when the current question was first shown. */
  const questionStartedAt = useRef(0)
  /**
   * How long has been spent on each question, and which one the clock is on.
   *
   * A timed block only ever knew the total. Per-question time was measured
   * exclusively inside `checkAnswer`, which Tutor is the only mode that
   * reaches — so the mode built around a clock recorded no times at all.
   */
  const elapsedRef = useRef(0)
  elapsedRef.current = elapsed
  const timeSpent = useRef<Record<string, number>>({})
  const timingId = useRef<string | null>(null)
  const [reportTarget, setReportTarget] = useState<ReportTarget | null>(null)
  const [endOpen, setEndOpen] = useState(false)
  /** A hidden timed test stays paused until the student explicitly decides. */
  const [visibilityPaused, setVisibilityPaused] = useState(false)
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
  /**
   * Desktop-only layout preference: once an answer is revealed, split the
   * question (stem/vignette/options) from the answer area (explanations and
   * per-option rationale) into two columns instead of stacking them.
   * Persisted so a student who likes it does not re-toggle every sitting.
   */
  const [splitView, setSplitView] = usePersistentState<boolean>('nishany.qbank.splitView.v1', false)
  /** Mirrors the `lg` breakpoint — split view never applies below it. */
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => setIsDesktop(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  /** What the student called this sitting, if anything. */
  const [sessionName, setSessionName] = useState('')
  /**
   * Which bank the page is about, and what is being done with it.
   *
   * Both are mirrored into the URL, so a link to `?bank=practical&tab=previous`
   * opens on the practical bank's ledger rather than on the MCQ composer — and
   * a reload does not silently move a student back to a different bank than
   * the one they were reading.
   */
  const [bank, setBankState] = useState<QbankBank>(() => readBank(params.get('bank')))
  const [hubTab, setHubTabState] = useState<QbankHubTab>(() => readTab(params.get('tab')))
  /** Which kinds of sitting the Previous tests list is showing. */
  const [previousFilter, setPreviousFilter] = useState<PreviousFilter>(() => readBank(params.get('bank')))
  const setBank = useCallback((next: QbankBank) => {
    setBankState(next)
    // The filter follows the bank on a switch, because "Previous tests" under
    // the practical tab meaning "all tests" is the confusion this package is
    // fixing. It is still a filter: the chips can widen it again.
    setPreviousFilter(next)
    setParams((current) => {
      const draft = new URLSearchParams(current)
      draft.set('bank', next)
      return draft
    }, { replace: true })
  }, [setParams])
  const setHubTab = useCallback((next: QbankHubTab) => {
    // The Previous tab's chunk is not part of the hub's first paint (the
    // builder is), so the click that switches to it is the intent that should
    // start fetching it.
    if (next === 'previous') preloadPreviousTests()
    setHubTabState(next)
    setParams((current) => {
      const draft = new URLSearchParams(current)
      draft.set('tab', next)
      return draft
    }, { replace: true })
  }, [setParams])
  /**
   * What each finished sitting is called.
   *
   * The records themselves carry no name — only a sessionId — so the names live
   * beside them, keyed by that id. A sitting with no entry falls back to what it
   * covered, so nothing is ever nameless.
   */
  const [savedNames, setSavedNames] = usePersistentState<Record<string, string>>(SESSION_NAMES_STORAGE_KEY, {})
  /**
   * The ledger of every test sat, of every kind.
   *
   * The MCQ ledger above is names keyed by session id; this one is the sitting
   * itself — what kind it was, what it held, what it came to. MCQ sittings are
   * filed here under the *same* id, so the two never disagree about which test
   * a name belongs to.
   */
  const sittingsLedger = useSittings()
  const [sessionQuestions, setSessionQuestions] = usePersistentState<SessionManifests>(SESSION_QUESTIONS_STORAGE_KEY, {})

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
  /**
   * An active mixed sitting (`MixedRunner`) reads a question's real content
   * straight off a prop rather than through `runWhenHydrated`, so the heavy
   * whole-bank build has to be on for as long as one is running. A paused
   * *plain* MCQ sitting needs no entry here: the restore effect below already
   * reaches `runWhenHydrated` through `restoreFrom`.
   *
   * It reads questions the student sat across any subject, so this widens the
   * fetch back to the whole bank rather than leaving whatever slice the last
   * start narrowed it to. Both setters are no-ops when nothing changes
   * (`WHOLE_BANK` is one shared object), so this cannot loop.
   */
  useEffect(() => {
    if (mixed.session && !mixedFinished(mixed.session)) {
      setFullScope(WHOLE_BANK)
      setNeedsFullQuestions(true)
    }
    // Both setters come from `useState` inside `useQbankQuestions`, so they are
    // stable — listed only because the linter can no longer see that.
  }, [mixed.session, setFullScope, setNeedsFullQuestions])

  /**
   * The Previous-tests answer review (`SessionDetailPanel`, via `PreviousTests`)
   * is the other prop reader — but the *list* of past tests needs nothing from
   * the full bank, only an expanded row's per-question breakdown does. Building
   * 2895 questions with every option and explanation the moment the tab opens
   * blocked the main thread for ~3.7s and was the whole of the "ages to load".
   * So the build waits for a row to actually open, where the panel fills in its
   * stems and option text once the questions land (it shows the topic and
   * generic text in the meantime). Whole-bank, because a past test may have
   * been sat in any subject.
   */
  const revealPreviousTestQuestions = useCallback(() => {
    setFullScope(WHOLE_BANK)
    setNeedsFullQuestions(true)
  }, [setFullScope, setNeedsFullQuestions])
  const restored = useRef(false)
  // Held in a ref, not read back from `saved`: the mirror effect below writes
  // `saved`, so depending on it there would make the write retrigger the effect
  // that performed it — which is exactly the render loop this avoids.
  const startedAt = useRef<string | null>(null)
  /**
   * Which sitting the mirror below is allowed to write.
   *
   * The runner's state is one slot serving three things: a live sitting, a past
   * test, and a collection. Leaving a past test lands on its results screen with
   * `reviewing` already cleared, and the mirror would then write that finished
   * test straight over the sitting the student still has paused. Only the
   * sitting that was actually started or resumed here may be mirrored.
   */
  const mirroredSittingId = useRef<string | null>(null)

  /**
   * A start that is waiting on the student's answer about the open sitting.
   *
   * Every way of starting a test funnels through `beginSession`, which replaces
   * the stored sitting outright. Once the hub could show a paused test and a
   * Start button at the same time, that replacement became silent loss of work
   * — and for a timed sitting, total loss, since nothing reaches the attempt
   * log until it is committed at the end.
   */
  const [pendingStart, setPendingStart] = useState<{ picked: Question[]; name?: string } | null>(null)

  /**
   * Put a stored sitting back into the runner's state.
   *
   * Shared by the restore below and by `resumeSaved`, because restoring once on
   * mount is not enough: viewing a collection or a past test overwrites the same
   * state slot the sitting lives in, and nothing put it back. Continue then
   * dropped the student into whatever they had just looked at, read-only, with
   * their own paused sitting unreachable until a reload.
   */
  const restoreFrom = useCallback((sitting: LiveSession, after?: () => void) => {
    // `runWhenHydrated` resolves the stored ids against the real, fully-built
    // questions — never the lightweight `questions` above, which have no real
    // options for the runner to show. `after` runs once that lands, so a
    // caller that also changes `phase` (`resumeSaved`) does it in the same
    // beat the questions actually arrive, not before.
    runWhenHydrated(sitting.questionIds, (rebuilt) => {
      startedAt.current = sitting.startedAt
      mirroredSittingId.current = sitting.sessionId
      setSession(rebuilt)
      setIdx(Math.min(sitting.idx, rebuilt.length - 1))
      setAnswers(sitting.answers)
      setStruck(sitting.struck ?? {})
      setChecked(sitting.checked)
      setMode(sitting.mode)
      setSessionId(sitting.sessionId)
      setElapsed(sitting.elapsed)
      timeSpent.current = sitting.questionSeconds ?? {}
      timingId.current = null
      questionStartedAt.current = sitting.elapsed
      setVisited(new Set(sitting.visited))
      // Not `sitting.reviewing`. The mirror below refuses to write while a review
      // is on screen, so a stored sitting is never a review; reading the field
      // back was the only way a stale `true` could outlive the review it belonged
      // to. The field stays on `LiveSession` for documents already persisted.
      setReviewing(false)
      setSubmitted(sitting.submitted ?? false)
      setSessionName(sitting.name)
      after?.()
    })
  }, [runWhenHydrated])

  useEffect(() => {
    if (restored.current || !savedStatus.hydrated || !saved || !questions.length) return
    // Reconciled: main guarded this effect against overwriting a live sitting
    // (the stored document arrives asynchronously, and it used to arrive *after*
    // the student had picked Timed and pressed Start — restoring the old sitting
    // straight over the new one, mode, answers and `checked` map included); the
    // incoming branch replaced the inline rebuild with `restorableQuestions` +
    // `restoreFrom` and stopped it forcing the phase. Both are kept. The guard
    // costs the Continue card nothing, because the card reads `saved` directly
    // and `resumeSaved` restores from it on demand — so refusing here only ever
    // protects what is on screen. Whatever is on screen wins.
    if (session.length || phase !== 'setup') { restored.current = true; return }
    // Null when a question has since been unpublished — see `restorableQuestions`.
    if (!restorableQuestions(saved, questions)) { setSaved(null); restored.current = true; return }
    restored.current = true
    restoreFrom(saved)
    // Deliberately not `setPhase(saved.phase)`. Everything about the sitting is
    // back — questions, answers, timer, strikes — but the student lands on the
    // hub and chooses to go back in, rather than arriving mid-question with no
    // idea where they are.
    // `session.length` and `phase` are read above to decide whether restoring is
    // still the right thing to do, so they belong here: reading a stale pair is
    // what the guard exists to prevent. `restored.current` stops this repeating.
  }, [questions, saved, savedStatus.hydrated, setSaved, restoreFrom, session.length, phase])

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
    // A review is not work in progress either — see `persistsSitting`.
    if (!persistsSitting(phase, reviewing)) return
    // And never write a session that is not the live sitting. Leaving a past
    // test clears `reviewing` but stays on that test's results screen, which was
    // enough for the mirror to file it as the open sitting — over the paused one.
    if (mirroredSittingId.current !== sessionId) return
    if (!startedAt.current) startedAt.current = new Date().toISOString()
    setSaved({
      questionIds: session.map((question) => question.id),
      idx, answers, checked, mode, sessionId, elapsed,
      questionSeconds: timeSpent.current,
      visited: [...visited],
      struck,
      reviewing,
      submitted,
      name: sessionName,
      phase,
      startedAt: startedAt.current,
    })
    // `saved` is deliberately not a dependency — see startedAt above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, session, idx, answers, checked, mode, sessionId, elapsed, visited, struck, reviewing, submitted, sessionName, savedStatus.hydrated, setSaved])

  /**
   * Something is open that should not be walked out of by accident.
   *
   * A mixed sitting counts. It persists, so nothing is lost by leaving — but a
   * student halfway through a station has not decided to leave, and the MCQ
   * paper has warned them for as long as it has existed. One blocker, not two:
   * the router supports exactly one, and which dialog it opens is decided here.
   */
  const mixedGuardActive = phase === 'setup' && mixedRunning
  const guardActive = (phase === 'running' && !reviewing && !submitted) || mixedGuardActive
  const blocker = useBlocker(useCallback(({ currentLocation, nextLocation }) => (
    guardActive && `${currentLocation.pathname}${currentLocation.search}` !== `${nextLocation.pathname}${nextLocation.search}`
  ), [guardActive]))

  /** Internal links use the same deliberate exit choice as the End control. */
  useEffect(() => {
    if (blocker.state !== 'blocked') return
    if (mixedGuardActive) setMixedLeaveOpen(true)
    else setEndOpen(true)
  }, [blocker.state, mixedGuardActive])

  /** Browser close, reload, and external navigation can only use the native warning. */
  useEffect(() => {
    if (!guardActive) return
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [guardActive])

  /**
   * Browsers cannot cancel an operating-system tab switch. Pause immediately
   * while hidden, then require the same choice before the clock can resume.
   */
  useEffect(() => {
    // `mode` belongs to the MCQ composer, and a mixed sitting has no timer of
    // its own — pausing one against a setting it does not use would open the
    // MCQ end dialog over a station.
    if (!guardActive || mode !== 'timed' || mixedGuardActive) return
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        setVisibilityPaused(true)
        return
      }
      setEndOpen(true)
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [guardActive, mode, mixedGuardActive])

  const articleQuestions = useMemo(
    () => (articleFilter ? questions.filter((question) => question.libraryRefs.some((ref) => ref.id === articleFilter)) : questions),
    [articleFilter, questions],
  )
  // The live chapter tree, so a whole-chapter selection matches real content.
  const { topics: publishedTopics } = useLiveLibrary()
  // The same merged tree the chooser offers, or a chapter picked there — one
  // the library has no article for — would resolve to no questions at all.
  const libraryTopics = useMemo(() => chooserTopics(questions, publishedTopics), [questions, publishedTopics])

  const flaggedQuestions = useMemo(() => questionsById(questions, marked), [questions, marked])
  // Never attempted anywhere — the fresh questions a student wants to work through.
  const unsolvedQuestions = useMemo(() => {
    const attempted = attemptedIds(history.records)
    return articleQuestions.filter((question) => !attempted.has(question.id))
  }, [articleQuestions, history.records])
  const incorrectQuestions = useMemo(
    () => questionsById(questions, incorrectIds(history.records)),
    [questions, history.records],
  )
  const omittedQuestions = useMemo(() => {
    // Without the sitting still open — see `finishedManifests`.
    const finished = finishedManifests(sessionQuestions, saved)
    return questionsById(questions, omittedIds(finished, history.records))
  }, [questions, sessionQuestions, history.records, saved])

  const sourcePool = useMemo(() => {
    if (source === 'unsolved') return unsolvedQuestions
    if (source === 'flagged') return flaggedQuestions
    if (source === 'incorrect') return incorrectQuestions
    if (source === 'omitted') return omittedQuestions
    return articleQuestions
  }, [source, articleQuestions, unsolvedQuestions, flaggedQuestions, incorrectQuestions, omittedQuestions])

  const scoped = useMemo(
    () => questionsInScope(sourcePool, scope, libraryTopics),
    [sourcePool, libraryTopics, scope],
  )
  const sourceOpts = useMemo(() => sourceOptions(scoped), [scoped])
  // The picker always renders: every canonical source is offered as a card,
  // and one with nothing in it is disabled rather than hidden — the option
  // stays discoverable even while the bank is still being tagged. Untagged
  // questions get their own "Unspecified" card only once tagged ones exist;
  // alone it would just be the whole bank wearing a confusing name.
  const sourceCards = useMemo(() => {
    const counts = new Map(sourceOpts.map((o) => [o.bucket, o.count]))
    const cards = QUESTION_SOURCES.map((s) => ({
      bucket: s as SourceBucket, label: QUESTION_SOURCE_LABEL[s], count: counts.get(s) ?? 0,
    }))
    const untagged = counts.get(UNSPECIFIED_SOURCE) ?? 0
    if (untagged > 0 && cards.some((c) => c.count > 0)) {
      cards.push({ bucket: UNSPECIFIED_SOURCE, label: UNSPECIFIED_SOURCE_LABEL, count: untagged })
    }
    return cards
  }, [sourceOpts])
  // Prune only buckets that exist nowhere in the whole bank (e.g. a source that
  // was relabelled away), so a stale selection self-heals. Do NOT prune a bucket
  // merely because the current topic scope has none of it: pruning to empty made
  // `questionsInSources` fall through to its "empty = all sources" case, so
  // picking one source under a scope with zero of it silently showed every other
  // source. Basing presence on the full bank keeps the selection strict — an
  // unmatched scope now honestly yields zero, not everything.
  const knownSourceBuckets = useMemo(
    () => new Set(sourceOptions(articleQuestions).map((o) => o.bucket)),
    [articleQuestions],
  )
  const effectiveSources = useMemo(
    () => new Set([...sourceSel].filter((b) => knownSourceBuckets.has(b))),
    [sourceSel, knownSourceBuckets],
  )
  // An empty selection means "all sources", so the unfiltered case is unchanged.
  const available = useMemo(
    () => questionsInSources(scoped, effectiveSources),
    [scoped, effectiveSources],
  )

  // The chapter tree's per-topic counts must reflect the same source filter as
  // `available`, so a filtered session's totals match the tree. When no source
  // filter is active (the shipping all-Unspecified state) this is exactly the
  // previous `sourcePool`, so behaviour there is unchanged.
  const treeCountPool = useMemo(
    () => questionsInSources(sourcePool, effectiveSources),
    [sourcePool, effectiveSources],
  )

  /**
   * The MCQs this student has singled out, each of them once.
   *
   * These three lists used to be a tab of their own. They are the composer's
   * first step now — and, together, the pool a mixed sitting draws its MCQ
   * share from when it is asked for "flagged and missed".
   */
  const collectionQuestions = useMemo(() => {
    const seen = new Set<string>()
    return [...flaggedQuestions, ...incorrectQuestions, ...omittedQuestions].filter((question) => {
      if (seen.has(question.id)) return false
      seen.add(question.id)
      return true
    })
  }, [flaggedQuestions, incorrectQuestions, omittedQuestions])

  /** What each chip in the composer's first step stands for. */
  const sourceCounts = useMemo(() => ({
    all: articleQuestions.length,
    unsolved: unsolvedQuestions.length,
    flagged: flaggedQuestions.length,
    incorrect: incorrectQuestions.length,
    omitted: omittedQuestions.length,
  }), [articleQuestions.length, unsolvedQuestions.length, flaggedQuestions.length, incorrectQuestions.length, omittedQuestions.length])

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
    // Unnamed, as it has always been: a link arrives with no name to give it,
    // and `autoSessionName` describes the setup form's scope, not this one's.
    requestSession(shuffle(pool).slice(0, Math.min(REVIEW_SESSION_SIZE, pool.length)))
    // beginSession is redefined every render; the ref above is what makes this
    // run once, so re-running on its identity would defeat the guard.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, reviewConcepts, reviewSubject])

  /**
   * A single question opened by id — e.g. from a Question Notes card. `?q=<id>`
   * begins a one-question tutor sitting on exactly that question, so a note
   * links back to the thing it was written about.
   */
  const singleQuestion = params.get('q')
  const openedSingle = useRef(false)
  useEffect(() => {
    if (openedSingle.current || !singleQuestion || !questions.length) return
    const question = questions.find((entry) => entry.id === singleQuestion)
    if (!question) return
    openedSingle.current = true
    requestSession([question])
    // requestSession is redefined every render; the ref above makes this run once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, singleQuestion])

  // Every live test has an elapsed clock. Timed mode interprets it against the
  // sitting allowance; Tutor mode presents the same value as a calm count-up.
  useEffect(() => {
    if (phase !== 'running' || reviewing || visibilityPaused) return
    const id = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(id)
  }, [phase, reviewing, visibilityPaused])

  /** Close the clock on whichever question was showing, and open it on this one. */
  const switchTiming = useCallback((nextId: string | null) => {
    const previous = timingId.current
    if (previous && previous !== nextId) {
      timeSpent.current[previous] = (timeSpent.current[previous] ?? 0) + Math.max(0, elapsedRef.current - questionStartedAt.current)
    }
    if (previous !== nextId) {
      timingId.current = nextId
      questionStartedAt.current = elapsedRef.current
    }
  }, [])

  // Landing on a question is what makes it "seen", however the student got here —
  // Next, Previous, or a jump from the navigator.
  useEffect(() => {
    setVisited((current) => (current.has(idx) ? current : new Set(current).add(idx)))
    switchTiming(session[idx]?.id ?? null)
  }, [idx, session, switchTiming])

  /**
   * Open a session on a chosen set of questions.
   *
   * An empty set is refused rather than entered. The runner indexes straight
   * into `session[idx]`, so starting with nothing to ask crashed the page —
   * which is what every quick-start button did on a bank with no published
   * questions in it.
   */
  function beginSession(picked: Question[], name?: string) {
    if (!picked.length) return
    // Every path into the runner funnels through here, so this is the one place
    // that has to fire it: the click is about to need `QuestionNavigator`,
    // `StudyRail` and the rest, and this starts that fetch before the state
    // change below asks Suspense to render them.
    preloadRunnerSurface()
    // Open the runner frame *now*, on the lightweight slice, so the start reads
    // as instant even when the heavy build is a cold fetch away. On a warm
    // subject `run` below fires synchronously and this overlay never paints;
    // on a cold one it holds the frame until the swap. `picked` carries the
    // first stem (summaries do), which is what the frame shows meanwhile.
    setPreparing({ preview: picked, name })
    // `picked` came off the lightweight `questions` above (or a stored
    // sitting's ids) — never the real thing to hand the runner. `runWhenHydrated`
    // resolves the same ids against the fully-built questions, triggering that
    // build the first time any test starts.
    runWhenHydrated(picked.map((question) => question.id), (real) => {
      // Nothing answerable came back (every picked question unpublished between
      // the pick and the fetch): drop the frame rather than hold it on a test
      // that will never fill.
      if (!real.length) { setPreparing(null); return }
      // Three things hang off one id, and all three are minted here.
      //
      // The name, because callers used to write it against whatever `sessionId`
      // happened to hold and then this replaced it — so every test a student
      // named was filed under the previous id and read as "Untitled test".
      //
      // The manifest, because the other cure for that bug was to mint the id at
      // the caller and pass it down, which each caller then had to get right.
      // Minting once here is the same fix without the obligation, and the
      // manifest has to travel with it: "omitted" is a sitting's served questions
      // minus its attempt records, and those records are written against
      // `sessionId`, so a manifest under any other id subtracts nothing and every
      // question served looks omitted.
      const id = newSessionId()
      // Starting is also a decision about the stored sitting: it is superseded,
      // so a read still in flight must not be allowed to land on top of this one.
      restored.current = true
      startedAt.current = new Date().toISOString()
      timeSpent.current = {}
      timingId.current = null
      if (name?.trim()) setSavedNames((current) => ({ ...current, [id]: name.trim() }))
      // Filed at the start, not at the end: a test abandoned halfway still served
      // its questions, and the ones never reached are still omitted.
      setSessionQuestions((current) => pruneManifests({ ...current, [id]: real.map((question) => question.id) }))
      mirroredSittingId.current = id
      setSession(real)
      setSessionId(id)
      setIdx(0)
      setAnswers({})
      setStruck({})
      setChecked({})
      setReviewing(false)
      setReviewReturn('results')
      setSubmitted(false)
      setElapsed(0)
      setVisibilityPaused(false)
      questionStartedAt.current = 0
      setVisited(new Set([0]))
      setPhase('running')
      // The answerable questions are on screen now; the frame has done its job.
      setPreparing(null)
    })
  }

  /**
   * Start a sitting, asking first if it would throw an open one away.
   *
   * Carries the name rather than an id: the id is `beginSession`'s to mint, and
   * a start the student may yet cancel should not have minted one.
   */
  function requestSession(picked: Question[], name?: string) {
    if (!picked.length) return
    if (saved && !saved.submitted && saved.questionIds.length > 0) {
      setPendingStart({ picked, name })
      return
    }
    beginSession(picked, name)
  }

  /**
   * Names the student's own tests per subject: "Cardiovascular · Test 3".
   *
   * Counting only sittings whose name shares the stem means renaming one does
   * not renumber the rest, and a session spanning subjects is simply "Mixed".
   */
  const sessionSummaries = useMemo(() => bySession(history.records), [history.records])

  /**
   * Sittings that are not MCQ papers, under whichever filter is on.
   *
   * MCQ rows still come from the attempt log rather than from the ledger: that
   * grouping is what every MCQ sitting a student has ever sat is recorded as,
   * including the ones from before this ledger existed. Reading them out of the
   * ledger instead would have quietly emptied the list for everyone already
   * using the app.
   */
  const otherSittings = useMemo(() => {
    const others = sittingsLedger.sittings.filter((sitting) => sitting.kind !== 'mcq')
    return previousFilter === 'all' ? others : others.filter((sitting) => sitting.kind === previousFilter)
  }, [sittingsLedger.sittings, previousFilter])

  /** What each filter chip stands for, and what the hub's tab counts. */
  const previousCounts = useMemo(() => {
    const doc = { version: 1 as const, sittings: sittingsLedger.sittings }
    const counts: Record<SittingKind, number> = {
      mcq: sessionSummaries.length,
      practical: sittingsOfKind(doc, 'practical').length,
      essay: sittingsOfKind(doc, 'essay').length,
      mixed: sittingsOfKind(doc, 'mixed').length,
    }
    return { ...counts, all: counts.mcq + counts.practical + counts.essay + counts.mixed }
  }, [sittingsLedger.sittings, sessionSummaries.length])

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

  /**
   * Where a read-only view goes when it is done.
   *
   * A past test has results to go back to; a collection does not — it was never
   * sat as a sitting — so it returns to the hub instead.
   */
  const [reviewReturn, setReviewReturn] = useState<'setup' | 'results'>('results')

  /**
   * Sit the same questions again, as a new test.
   *
   * A new session id, so this is a second sitting rather than an edit of the
   * first: both stay in the history and the comparison between them is the
   * whole point. Reshuffled, because remembering that the answer to number four
   * was B is not the same as knowing it.
   */
  function retakeSameQuestions(previousId: string) {
    const rebuilt = reviewableQuestions(previousId)
    if (!rebuilt.length) return
    // Through `requestSession`, not straight into `beginSession`: a retake is
    // another way of starting a test, and starting one over a sitting the
    // student still has paused would throw that sitting away without asking.
    requestSession(shuffle(rebuilt), `${savedNames[previousId]?.trim() || t('Untitled test')} · ${t('retake')}`)
  }

  /**
   * A fresh test over the same ground.
   *
   * The subjects that sitting covered, drawn from everything published in them
   * — including the questions it asked, since a bank rarely holds enough to
   * exclude them and silently returning four questions for a twenty-question
   * retake would be worse than repeating some.
   */
  function retakeSameScope(entry: SessionSummary) {
    const wanted = new Set(entry.subjectIds)
    const pool = questions.filter((question) => wanted.has(question.subjectId))
    if (!pool.length) return
    const scopeName = entry.subjectIds.length === 1 ? subjectName(entry.subjectIds[0]) : t('Mixed')
    requestSession(
      shuffle(pool).slice(0, Math.min(Math.max(entry.answered, 1), pool.length)),
      `${scopeName} · ${t('Test')} ${sessionSummaries.length + 1}`,
    )
  }

  /** Put a finished sitting back on screen, read-only, with its answers. */
  function reviewSession(sessionId: string) {
    // `reviewableQuestions` reads the lightweight `questions` above — enough to
    // know which ids still exist, not to read `.options` from below.
    // `runWhenHydrated` resolves them against the real, fully-built questions.
    const ids = reviewableQuestions(sessionId).map((question) => question.id)
    if (!ids.length) return
    preloadRunnerSurface()
    runWhenHydrated(ids, (rebuilt) => {
      if (!rebuilt.length) return
      const answered: Record<string, number> = {}
      const marked: Record<string, boolean> = {}
      for (const record of history.records) {
        if (record.sessionId !== sessionId || record.surface !== 'qbank') continue
        marked[record.itemId] = true
        const question = rebuilt.find((item) => item.id === record.itemId)
        if (!question) continue
        const correctIndex = question.options.findIndex((option) => option.correct)
        if (typeof record.selectedIndex === 'number') answered[record.itemId] = record.selectedIndex
        // Legacy attempts predate selected-option storage. A correct answer can
        // still be reconstructed honestly; a wrong one remains unselected.
        else if (record.correct === true && correctIndex >= 0) answered[record.itemId] = correctIndex
      }
      mirroredSittingId.current = null
      setSession(rebuilt)
      setAnswers(answered)
      setChecked(marked)
      setVisited(new Set(rebuilt.map((_, index) => index)))
      setSessionId(sessionId)
      setSessionName(savedNames[sessionId] ?? t('Untitled test'))
      setIdx(0)
      setReviewing(true)
      setReviewReturn('results')
      setPhase('running')
    })
  }

  /**
   * Pick a paused sitting back up exactly where it was left.
   *
   * The state it needs is restored here, not assumed: a collection or a past
   * test viewed since the last restore is sitting in the same slot, and the
   * stored document is the only durable copy of the real sitting.
   */
  function resumeSaved() {
    if (!saved) return
    preloadRunnerSurface()
    // The same drop the mount effect performs, because that effect runs once and
    // never again: `usePublishedQuestions` can retire a question long after
    // `restored` is set, and `restoreFrom` filters tolerantly rather than
    // refusing. Without this, Continue opened a paper shorter than the one the
    // student started, still answering to their original answers, and the mirror
    // then wrote the shortened `questionIds` back over the stored sitting — the
    // full paper gone with no way back. See `restorableQuestions`.
    if (!restorableQuestions(saved, questions)) { setSaved(null); setPhase('setup'); return }
    restoreFrom(saved, () => setPhase(saved.phase))
  }

  /** The sitting is finished with — stop offering to resume it. */
  function discardSession() {
    startedAt.current = null
    mirroredSittingId.current = null
    // Only the sitting actually on screen — see `clearsStoredSitting`.
    if (clearsStoredSitting(saved, sessionId)) setSaved(null)
    setPhase('setup')
  }

  /**
   * Throw the stored sitting away, whatever the runner happens to be holding.
   *
   * The hub's two controls — Discard on the Continue card, End this test on the
   * live row of Previous tests — name the *stored* sitting; it is the only thing
   * either of them is describing. The runner's state slot is not it: viewing a
   * collection or a past test reassigns `sessionId`, so guarding these with
   * `clearsStoredSitting` the way the in-runner exits are guarded left them
   * silently doing nothing after any such detour, with the card still sitting
   * there. The in-runner exits keep that guard, because there "end this" really
   * does mean the sitting on screen — which may be a past test's results, and
   * must not take a separately paused sitting down with it.
   */
  function discardSaved() {
    startedAt.current = null
    mirroredSittingId.current = null
    setSaved(null)
  }

  /** Step out, keep the sitting. */
  function leaveSession() {
    switchTiming(null)
    setEndOpen(false)
    setVisibilityPaused(false)
    setPhase('setup')
    if (blocker.state === 'blocked') blocker.proceed()
  }

  /** Finish for good: mark what was answered, then show the paper. */
  function submitSession() {
    commitAnswers()
    setSubmitted(true)
    setEndOpen(false)
    setVisibilityPaused(false)
    setPhase('results')
    // Filed here, where the sitting actually ends, and under the same id its
    // records and its name already carry — so "Previous tests" can show an MCQ
    // paper beside a practical and a mixed sitting without three lists.
    recordMcqSitting()
    if (blocker.state === 'blocked') blocker.proceed()
  }

  /** File the MCQ sitting on screen into the unified ledger. */
  function recordMcqSitting() {
    if (!session.length) return
    const answered = session.filter((question) => answers[question.id] != null).length
    sittingsLedger.record({
      id: sessionId,
      kind: 'mcq',
      startedAt: startedAt.current ?? new Date().toISOString(),
      finishedAt: new Date().toISOString(),
      name: savedNames[sessionId]?.trim() || sessionName.trim() || undefined,
      itemCount: session.length,
      result: {
        total: session.length,
        covered: answered,
        correct: session.filter((question) => question.options[answers[question.id]]?.correct).length,
      },
      itemIds: session.map((question) => question.id),
    })
  }

  function closeEndDialog() {
    setEndOpen(false)
    setVisibilityPaused(false)
    if (blocker.state === 'blocked') blocker.reset()
  }

  const removeAttemptSession = useDeleteAttemptSession()
  function deleteSession(sessionId: string) {
    removeAttemptSession(sessionId)
    setSavedNames((current) => {
      const next = { ...current }
      delete next[sessionId]
      return next
    })
    setSessionQuestions((current) => {
      const next = { ...current }
      delete next[sessionId]
      return next
    })
    if (clearsStoredSitting(saved, sessionId)) setSaved(null)
    // Both ledgers, or a deleted test would keep its row under Previous tests
    // with nothing behind it.
    sittingsLedger.forget(sessionId)
  }

  const scopeSubjectName = useMemo(() => {
    const subjectIds = new Set(available.map((question) => question.subjectId))
    return subjectIds.size === 1 ? subjectName([...subjectIds][0]) : t('Mixed')
  }, [available, t, subjectName])
  const autoSessionName = useMemo(() => {
    const used = sessionSummaries.filter((summary: SessionSummary) => (savedNames[summary.sessionId] ?? '').startsWith(scopeSubjectName)).length
    return `${scopeSubjectName} · ${t('Test')} ${used + 1}`
  }, [scopeSubjectName, sessionSummaries, savedNames, t])

  function start() {
    // Named now rather than when it ends: a sitting abandoned halfway still
    // produced records, and those should not appear as an unnamed row. The name
    // travels with the questions instead of being filed here, because only
    // `beginSession` knows the id it will be filed under.
    requestSession(shuffle(available).slice(0, Math.min(count, available.length)), sessionName.trim() || autoSessionName)
  }

  const stats = useMemo(() => {
    const correct = session.filter((q) => q.options[answers[q.id]]?.correct).length
    return { correct }
  }, [session, answers])

  /* ---- Mixed sitting (direction 2) ------------------------------------ */
  // Ahead of the catalogue guard below: a mixed sitting can be all essays and
  // all practicals, and an empty MCQ catalogue must not swallow it.
  if (phase === 'setup' && mixed.session && !mixedFinished(mixed.session)) {
    return (
      <Suspense fallback={<ContentSkeleton shape="qbank" />}>
        <LazyMixedRunner
          session={mixed.session}
          questions={realQuestions}
          onMark={mixed.mark}
          onNext={() => {
            if (mixed.session && mixed.session.cursor >= mixed.session.items.length - 1) setMixedEndedAt(Date.now())
            mixed.next()
          }}
          onEnd={() => { setMixedEndedAt(Date.now()); mixed.finish() }}
        />
        {mixedLeaveOpen && (
          <Dialog onClose={() => { setMixedLeaveOpen(false); if (blocker.state === 'blocked') blocker.reset() }} label={t('Leave this test?')} size="sm">
            <PanelHeader title={t('Leave this test?')} icon={AlertTriangle} />
            <div className="space-y-4 p-5">
              <p className="text-[13.5px] leading-relaxed text-ink-2">
                {t('The sitting is kept where it is — everything you have already done is recorded, and coming back opens the same item.')}
              </p>
              <div className="flex flex-col gap-2">
                <Button variant="secondary" size="md" onClick={() => { setMixedLeaveOpen(false); if (blocker.state === 'blocked') blocker.reset() }}>
                  {t('Stay in the test')}
                </Button>
                <Button variant="primary" size="md" onClick={() => { setMixedLeaveOpen(false); if (blocker.state === 'blocked') blocker.proceed() }}>
                  {t('Leave, and keep it')}
                </Button>
                <Button variant="ghost" size="md" onClick={() => { setMixedLeaveOpen(false); setMixedEndedAt(Date.now()); mixed.finish(); if (blocker.state === 'blocked') blocker.reset() }}>
                  {t('End the test and see the report')}
                </Button>
              </div>
            </div>
          </Dialog>
        )}
      </Suspense>
    )
  }

  // Only the sitting that ended *in this visit* shows its report. A finished
  // document found in storage belongs to a visit that is over — the tab was
  // closed on the report, or the write that cleared it never flushed — and
  // rendering it again put the student in front of a screen whose only exit was
  // the button they had already pressed. The sweep effect clears it instead;
  // the sitting itself is still in Previous tests. See `mixedClosed`.
  if (phase === 'setup' && mixed.session && mixedEndedAt != null) {
    return (
      <Suspense fallback={<ContentSkeleton shape="qbank" />}>
        <LazyMixedSummary
          session={mixed.session}
          endedAt={mixedEndedAt}
          onDone={() => { setMixedEndedAt(null); mixed.end() }}
        />
      </Suspense>
    )
  }

  /* ---- Preparing (the runner opening ahead of its questions) --------- */
  if (preparing) {
    const first = preparing.preview[0]
    const total = preparing.preview.length
    return (
      <PageContainer className="max-w-[820px]">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="truncate font-serif text-[22px] font-semibold tracking-[-0.01em] text-ink">
              {preparing.name?.trim() || t('Your test')}
            </h1>
            <p className="mt-1 flex items-center gap-2 text-[13px] text-ink-2">
              <span className="size-2 animate-pulse rounded-full bg-ink-2" aria-hidden />
              {t('Preparing')} {total} {total === 1 ? t('question') : t('questions')}…
            </p>
          </div>
          {/* The frame can outlive its fetch on a dead connection; Cancel is the
              way back to the hub rather than a spinner with no exit. */}
          <Button variant="ghost" size="sm" onClick={() => setPreparing(null)}>{t('Cancel')}</Button>
        </div>
        <div className="rounded-xl border border-line bg-surface p-5 shadow-panel sm:p-6">
          <div className="mb-5 flex flex-wrap gap-1.5">
            {Array.from({ length: Math.min(total, 20) }).map((_, i) => (
              <span key={i} className="size-2.5 rounded-full bg-inset" aria-hidden />
            ))}
          </div>
          {/* The first stem is already in hand (summaries carry it), so the
              student reads the question they are about to sit while the
              answerable options are still being built below. */}
          {first?.vignette?.trim() && (
            <p className="mb-3 text-[14px] leading-relaxed text-ink-2">{first.vignette}</p>
          )}
          {first?.stem?.trim()
            ? <p className="text-[15px] font-medium leading-relaxed text-ink">{first.stem}</p>
            : <div className="h-4 w-3/4 rounded bg-inset" aria-hidden />}
          <div className="mt-5 space-y-2.5" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-11 animate-pulse rounded-lg border border-line bg-inset/60" />
            ))}
          </div>
          <p className="sr-only">{t('Loading the answers…')}</p>
        </div>
      </PageContainer>
    )
  }

  /* ---- Setup --------------------------------------------------------- */
  if (phase === 'setup' && availability.kind !== 'ready') {
    return (
      <PageContainer>
        <PageHeader title={t('Question Bank')} />
        <CatalogueUnavailable skeleton={<ContentSkeleton shape="qbank" />}
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
        {pendingStart && (
          <Dialog onClose={() => setPendingStart(null)} label={t('Replace the open test?')} size="sm">
            <PanelHeader title={t('Replace the open test?')} icon={AlertTriangle} />
            <div className="space-y-4 p-5">
              <p className="text-[13.5px] leading-relaxed text-ink-2">
                {t('You have a test still open. Starting a new one replaces it, and anything you have not had marked is lost.')}
              </p>
              <div className="flex flex-col gap-2">
                <Button variant="secondary" size="md" iconLeft={Play} onClick={() => { setPendingStart(null); resumeSaved() }}>
                  {t('Go back to the open test')}
                </Button>
                <Button variant="primary" size="md" onClick={() => { const next = pendingStart; setPendingStart(null); beginSession(next.picked, next.name) }}>
                  {t('Replace it and start')}
                </Button>
                <Button variant="ghost" size="md" onClick={() => setPendingStart(null)}>{t('Cancel')}</Button>
              </div>
            </div>
          </Dialog>
        )}

        <QbankHub
          bank={bank}
          onBankChange={setBank}
          tab={hubTab}
          onTabChange={setHubTab}
          previousCount={previousCounts[bank]}
          banner={saved && !saved.submitted && saved.questionIds.length > 0 ? (
            <div className="mb-5">
              <ContinueCard
                name={savedNames[saved.sessionId]?.trim() || t('Untitled test')}
                answered={Object.keys(saved.answers).length}
                total={saved.questionIds.length}
                onContinue={resumeSaved}
                onDiscard={discardSaved}
              />
            </div>
          ) : undefined}
        >
          {hubTab === 'previous' ? (
            <PreviousTestsTab
              filter={previousFilter}
              onFilterChange={setPreviousFilter}
              counts={previousCounts}
              showMcq={previousFilter === 'all' || previousFilter === 'mcq'}
              showOthers={previousFilter !== 'mcq'}
              others={<SittingRows sittings={otherSittings} onDelete={sittingsLedger.forget} />}
              mcq={(
                <Suspense fallback={<ContentSkeleton shape="qbank" />}>
                  <LazyPreviousTests
                    sessions={sessionSummaries}
                    names={savedNames}
                    // `liveSittingId`, not `saved?.sessionId`: a submitted sitting is
                    // still stored, and calling that one "in progress" put Resume on a
                    // test that was already finished.
                    liveSessionId={liveSittingId(saved)}
                    records={history.records}
                    questions={realQuestions}
                    onOpenDetail={revealPreviousTestQuestions}
                    onRename={(sessionId, name) => setSavedNames((current) => ({ ...current, [sessionId]: name }))}
                    onResume={resumeSaved}
                    onTerminate={discardSaved}
                    onReview={reviewSession}
                    onRetakeSame={retakeSameQuestions}
                    onRetakeScope={retakeSameScope}
                    onDelete={deleteSession}
                    canReview={(sessionId) => reviewableQuestions(sessionId).length > 0}
                    canRetakeSame={(sessionId) => reviewableQuestions(sessionId).length > 0}
                    t={t}
                  />
                </Suspense>
              )}
            />
          ) : (
            <UnifiedBuilder
              bank={bank}
              questions={questions}
              collections={collectionQuestions}
              onStart={(pools, split) => { preloadMixedRunner(); mixed.start(pools, split) }}
              // "Your progress" now lives on the Performance tab, next to the
              // rest of a student's record, rather than beside the builder.
              mcq={(
                <TestBuilder
                  source={source}
                  setSource={setSource}
                  sourceCounts={sourceCounts}
                  sourceSel={sourceSel}
                  onToggleSource={toggleSource}
                  sourceCards={sourceCards}
                  scope={scope}
                  setScope={setScope}
                  scopePool={articleQuestions}
                  scopeCountPool={treeCountPool}
                  count={count}
                  setCount={setCount}
                  mode={mode}
                  setMode={setMode}
                  sessionName={sessionName}
                  setSessionName={setSessionName}
                  autoSessionName={autoSessionName}
                  matching={available.length}
                  pool={articleQuestions.length}
                  onStart={start}
                />
              )}
            />
          )}
        </QbankHub>
      </PageContainer>
    )
  }

  /* ---- Results ------------------------------------------------------- */
  if (phase === 'results') {
    // `beginSession` refuses an empty set, so this can only be reached by a
    // stale state. Dividing by zero would print "NaN%" as a score.
    if (!session.length) { discardSession(); return null }
    const pct = Math.round((stats.correct / session.length) * 100)
    const recorded = history.records.filter((record) => record.sessionId === sessionId && record.surface === 'qbank')
    const reportRecords = recorded.length
      ? history.records
      : [
          ...history.records,
          ...session.flatMap((question) => {
            const selectedIndex = answers[question.id]
            if (selectedIndex == null) return []
            const correctIndex = question.options.findIndex((option) => option.correct)
            const timing = timedClock(session.length, elapsed)
            return [{
              id: `${sessionId}:qbank:${question.id}`,
              at: new Date().toISOString(),
              surface: 'qbank' as const,
              itemId: question.id,
              subjectId: question.subjectId,
              topic: question.topic,
              difficulty: question.difficulty,
              conceptIds: question.conceptIds ?? [],
              correct: Boolean(question.options[selectedIndex]?.correct),
              seconds: mode === 'timed' ? timeSpent.current[question.id] ?? null : null,
              selectedIndex,
              ...(correctIndex >= 0 ? { correctIndex } : {}),
              ...(question.libraryRefs[0]?.title ? { subtopic: question.libraryRefs[0].title } : {}),
              ...(question.source ? { source: question.source } : {}),
              ...(mode === 'timed' ? {
                sessionDurationSeconds: elapsed,
                sessionOvertimeSeconds: timing.overtime,
              } : {}),
              sessionId,
            }]
          }),
        ]
    const report = sessionDetail(reportRecords, sessionId)
    const resultClock = timedClock(session.length, elapsed)
    return (
      <PageContainer className="max-w-[900px]">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 grid size-12 place-items-center rounded-xl bg-primary-tint text-primary">
            <Icon icon={Trophy} size={24} />
          </div>
          <h1 className="font-serif text-[28px] font-semibold tracking-[-0.02em] text-ink">
            {t('Session complete')}
          </h1>
          <p className="mt-1 text-[14px] text-ink-2">
            {t('You scored')}{' '}
            <span className="font-medium text-ink">
              {stats.correct} {t('of')} {session.length}
            </span>{' '}
            ({pct}%){mode === 'timed' && <>{' '}{t('in')} {clock(elapsed)}{resultClock.overtime > 0 ? ` · +${clock(resultClock.overtime)} ${t('overtime')}` : ''}</>}.
          </p>
        </div>

        <Panel className="mb-4">
          <PanelHeader title={t('Full test report')} icon={ListChecks} hint={t('Accuracy, pace, weak areas, and every marked answer')} />
          <SessionDetailPanel detail={report} questions={session} total={session.length} t={t} />
        </Panel>

        <div className="flex justify-center gap-2">
          <Button
            variant="secondary"
            size="md"
            iconLeft={BookOpen}
            onMouseEnter={preloadRunnerSurface}
            onFocus={preloadRunnerSurface}
            onClick={() => {
              // Every opener of a review has to state its own exit, because
              // `reviewReturn` outlives the review that last set it. A collection
              // viewed earlier in the same mount leaves it at 'setup', and this
              // button — pressed from the results screen the student is standing
              // on — then offered "Done" back to the hub instead of "Back to
              // results". The other two openers already declare it.
              preloadRunnerSurface()
              setReviewReturn('results')
              setReviewing(true)
              setIdx(0)
              setPhase('running')
            }}
          >
            {t('Review answers')}
          </Button>
          <Button variant="primary" size="md" iconLeft={RotateCcw} onClick={discardSession}>
            {t('New session')}
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
  // Reviewing always reveals. Otherwise only Tutor does, and only for a
  // question whose answer the student asked to check. Reading `checked` alone
  // meant anything that put a value in that map — a restored sitting, the
  // grading pass at the end of a timed block — turned the marking on underneath
  // a student who was still working.
  const revealed = reviewing || (mode === 'tutor' && Boolean(checked[q.id]))
  const chosen = answers[q.id]
  // `distribution` was fetched above for `session[idx]?.id`, which is this
  // same `q` by construction — see the unconditional hook call near the top.
  const showStats = revealed && Boolean(distribution?.eligible) && Boolean(distribution?.counts)
  const percentages = showStats ? answerPercentages(distribution!.counts!, distribution!.total) : null
  const last = idx === session.length - 1
  const correctRationale = q.options.find((option) => option.correct)?.rationale.trim() ?? ''
  // The importer copies the correct option's explanation into `Explanation`, so on
  // an imported question the panel below would repeat the rationale already sitting
  // under the right answer. Only show it when it genuinely says something else.
  const hasSeparateExplanation = Boolean(q.explanation.trim()) && q.explanation.trim() !== correctRationale
  // Split view only ever changes anything once there is an answer to show —
  // and only at the breakpoint the toggle itself is offered at.
  const splitActive = revealed && splitView && isDesktop

  /**
   * The record one answer produces, and the mastery evidence that goes with it.
   *
   * Shared by the two writers so they cannot drift: one commits a single answer
   * as it is checked, the other commits a whole sitting at the end, and a
   * question must not be worth different things depending on which ran.
   */
  function attemptFor(question: Question, chosenIndex: number, seconds: number | null) {
    const correct = Boolean(question.options[chosenIndex]?.correct)
    const correctIndex = question.options.findIndex((option) => option.correct)
    const conceptIds = question.conceptIds ?? []
    const timing = timedClock(session.length, elapsedRef.current)
    // The mastery ledger only takes concept-tagged evidence, but the attempt
    // log takes every answer: an untagged question still happened.
    if (conceptIds.length) record({ conceptIds, source: 'question', correct })
    return {
      surface: 'qbank' as const,
      itemId: question.id,
      subjectId: question.subjectId,
      topic: question.topic,
      difficulty: question.difficulty,
      conceptIds,
      correct,
      seconds,
      selectedIndex: chosenIndex,
      ...(correctIndex >= 0 ? { correctIndex } : {}),
      ...(question.libraryRefs[0]?.title ? { subtopic: question.libraryRefs[0].title } : {}),
      ...(question.source ? { source: question.source } : {}),
      ...(mode === 'timed' ? {
        sessionDurationSeconds: elapsedRef.current,
        sessionOvertimeSeconds: timing.overtime,
      } : {}),
      sessionId,
    }
  }

  function checkAnswer() {
    // Nothing is revealed until there is an answer to reveal. Marking the
    // question checked first meant pressing Check with no option selected
    // exposed the right answer and recorded nothing.
    if (checked[q.id] || chosen == null) return
    // Reconciled: main moved this `setChecked` below the guard above, so
    // pressing Check with nothing selected can no longer expose the right
    // answer; the incoming branch factored the record out into `attemptFor`, so
    // one answer and a whole sitting cannot value a question differently. Both.
    setChecked((c) => ({ ...c, [q.id]: true }))
    // Tutor's visible clock measures the sitting, not the speed of a single
    // answer. Keep its attempt untimed so time spent reading feedback is never
    // mistaken for answer latency. A timed sitting is measured by
    // `switchTiming`, which owns `questionStartedAt`, and committed by
    // `commitAnswers`.
    logAttempt(attemptFor(q, chosen, null))
  }

  /*
   * Reconciled here. Main added `gradeTimedBlock` — write the missing records
   * for a timed block when the student leaves it, carrying the per-question
   * time its `switchTiming` clock measures — plus a `showResults` that ran it on
   * the way to the paper. The incoming branch added `commitAnswers`, built on
   * the tested `pendingAttempts`, run from "End and submit" and from "See
   * results".
   *
   * They are the same fix for the same defect, so one survives: the tested one.
   * But `commitAnswers` wrote `seconds: null` because at the time nothing had
   * measured a timed question, and main's clock now has — so the measurement is
   * carried across rather than thrown away with the function that took it.
   *
   * Main's other call site is not carried across. It graded on *any* exit from
   * the runner, which was right when End was the only way out; the incoming
   * branch splits that into "Leave for now" and "End and submit", and grading a
   * sitting the student has explicitly kept open would freeze their answers —
   * `addAttempt` refuses a second record for the same id, so an answer changed
   * after resuming would never reach the log. Committing is what submitting
   * means.
   */

  /**
   * Rule an option in or out.
   *
   * Ruling out the option that is currently selected clears the selection:
   * leaving a pick on something the student has just crossed off would submit
   * an answer they have visibly stopped believing.
   */
  function toggleStrike(index: number) {
    const ruledOut = !(struck[q.id] ?? []).includes(index)
    setStruck((current) => {
      const next = new Set(current[q.id] ?? [])
      if (!next.delete(index)) next.add(index)
      return { ...current, [q.id]: [...next] }
    })
    if (ruledOut && answers[q.id] === index) {
      setAnswers((current) => {
        const next = { ...current }
        delete next[q.id]
        return next
      })
    }
  }

  /**
   * Write a record for every answered question that does not have one.
   *
   * What a timed sitting owes the log at the end — see `pendingAttempts`.
   *
   * `seconds` comes from the per-question clock in timed mode. Tutor's count-up
   * is session context only, so it deliberately files no answer-latency value.
   */
  function commitAnswers() {
    const pending = pendingAttempts(session, answers, checked)
    if (!pending.length) return
    // Close the clock on the question still showing, or its time is lost.
    switchTiming(null)
    logAttempts(pending.map((question) => attemptFor(
      question,
      answers[question.id],
      mode === 'timed' ? timeSpent.current[question.id] ?? null : null,
    )))
    setChecked((current) => {
      const next = { ...current }
      for (const question of pending) next[question.id] = true
      return next
    })
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
        ? 'border-primary bg-primary-tint/50'
        : 'border-line bg-surface hover:border-line-2'
    if (q.options[i].correct) return 'border-success bg-success-tint'
    if (chosen === i) return 'border-danger bg-danger-tint'
    return 'border-line bg-surface opacity-70'
  }

  const sessionClock = timedClock(session.length, elapsed)

  // The clock, shown in both layouts. Timed mode reads it against the sitting
  // allowance; Tutor presents the same value as a calm count-up.
  const timer = !reviewing ? (
    <span
      className={cn(
        'tnum inline-flex items-center gap-1.5 rounded-lg border bg-surface px-2.5 py-1.5 font-mono text-[14px] font-semibold shadow-panel',
        mode === 'timed' && sessionClock.overtime > 0 ? 'border-danger/40 text-danger' : 'border-line-2 text-ink',
      )}
      aria-label={mode === 'tutor'
        ? `${t('Elapsed time')} ${clock(elapsed)}`
        : sessionClock.overtime > 0
          ? `${t('Overtime')} ${clock(sessionClock.overtime)}`
          : `${t('Time remaining')} ${clock(sessionClock.remaining)}`}
    >
      <Icon icon={Clock} size={15} className="text-primary" />
      {mode === 'tutor'
        ? clock(elapsed)
        : sessionClock.overtime > 0
          ? `+${clock(sessionClock.overtime)}`
          : clock(sessionClock.remaining)}
    </span>
  ) : null

  // "Why the wrong answers are wrong" — the consolidated block. It holds the
  // rationale for every wrong option the student did *not* pick (the correct
  // option and the picked-wrong one are shown inline under the options), plus
  // the explicit `Explanation` text. In split view it moves to the right column
  // beside the study tools; in single column it sits below the question.
  const otherWrong = revealed
    ? q.options
        .map((opt, i) => ({ opt, i }))
        .filter(({ opt, i }) => !opt.correct && i !== chosen && opt.rationale.trim())
    : []
  const showExplanations = revealed && (otherWrong.length > 0 || hasSeparateExplanation)
  const explanations = showExplanations ? (
    <div className="space-y-2.5 rounded-xl border border-line bg-surface-2/50 p-4">
      <p className="text-[13px] font-semibold text-ink">{t('Answer explanations')}</p>
      {/* The other wrong answers are collapsed by default — a student wants the
          right answer's explanation first, and the rest on demand. Native
          <details>, so no extra state. */}
      {otherWrong.length > 0 && (
        <details className="group overflow-hidden rounded-xl border border-danger/40 bg-danger-tint/40">
          {/* Its own banner, deliberately loud — the wrong-answer breakdown is the
              highest-value part of a review, so it reads as a call to action, not
              a footnote tucked inside the explanations card. */}
          <summary className="flex cursor-pointer list-none items-center gap-2 bg-danger-tint px-3.5 py-3 text-[13px] font-semibold text-danger">
            <AlertTriangle size={16} className="shrink-0" />
            <span className="flex-1">{t('Why the other answers are wrong')}</span>
            <span className="tnum rounded-full bg-danger/15 px-2 py-0.5 font-mono text-[11.5px] text-danger">{otherWrong.length}</span>
            <ChevronRight size={16} className="shrink-0 transition-transform group-open:rotate-90 rtl:rotate-180 rtl:group-open:rotate-90" />
          </summary>
          <div className="space-y-2.5 p-3">
            {otherWrong.map(({ opt, i }) => (
              // The answer's letter leads the line, and the explanation sits
              // right beside it — no "Why this is wrong" label, since the banner
              // above already says these are the wrong answers.
              <div key={i} className="flex gap-2.5 rounded-lg border border-line bg-surface-2/50 px-3 py-2.5">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-line-2 bg-surface text-[11px] font-semibold text-ink-2">{LETTERS[i]}</span>
                <p className="min-w-0 flex-1 text-[12.5px] leading-relaxed text-ink-2">
                  <HighlightableText text={opt.rationale.trim()} enabled blockId={`rationale-${i}`} highlights={highlights} />
                </p>
              </div>
            ))}
          </div>
        </details>
      )}
      {hasSeparateExplanation && (
        <div className="rounded-lg border border-line bg-surface p-3.5">
          <p className="mb-1.5 text-[13px] font-semibold text-ink">{t('Explanation')}</p>
          <p className="text-[14px] leading-relaxed text-ink"><HighlightableText text={q.explanation} enabled blockId="explanation" highlights={highlights} /></p>
        </div>
      )}
    </div>
  ) : null

  return (
    <Suspense fallback={<ContentSkeleton shape="qbank" />}>
    <div className="mx-auto max-w-[1180px] px-3 pt-2 pb-6 sm:px-4">
      {/* Top strip: the question-number grid spans the full width, and the
          timer and split toggle are embedded at the top-right of that same
          count box rather than sitting on a row of their own. */}
      <LazyQuestionNavigator
        className="mb-2"
        count={session.length}
        current={idx}
        stateFor={stateFor}
        isFlagged={(i) => marked.has(session[i].id)}
        onJump={setIdx}
        graded={reviewing || mode === 'tutor'}
        headerRight={
          <>
            {reviewing && <span className="hidden text-[12px] font-medium text-primary sm:inline">{t('Reviewing')}</span>}
            {/* Split only exists on desktop (`splitActive` gates on `isDesktop`),
                so the toggle is left out of the DOM entirely on a phone rather
                than hidden with a class — that keeps the crowded mobile header
                to just the timer. */}
            {isDesktop && (
              <IconButton
                icon={Columns2}
                label={splitView ? t('Single column') : t('Split view')}
                active={splitView}
                variant="surface"
                onClick={() => setSplitView((value) => !value)}
              />
            )}
            {timer}
          </>
        }
      />
      <div className="relative mb-3 h-1 overflow-hidden rounded-full bg-inset">
        <div
          className="absolute inset-0 rounded-full bg-primary transition-transform duration-300 ease-[var(--ease-out-quint)]"
          style={{ transform: `translateX(${((idx + 1) / session.length) * 100 - 100}%)` }}
        />
      </div>

      {/* Split view gives the answer explanations a wider companion column so
          the whole left side stays the question. Single column keeps the slim
          study rail on the right. */}
      <div className={cn('grid gap-4 lg:items-start lg:gap-5', splitActive ? 'lg:grid-cols-2' : 'lg:grid-cols-[minmax(0,1fr)_300px]')}>
        <div className="min-w-0">
      <Panel ref={questionCardRef} className="p-5 sm:p-6">
        {/* Select any of the stem, an option, or an explanation to highlight
            it — one colour, no toolbar. Scoped to this card so a selection
            made anywhere else on the page (the navigator, the study rail)
            never opens it. */}
        <HighlightSelectionPopover container={questionCardRef} highlights={highlights} />
        <div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-ink">
                <SubjectDot id={q.subjectId} />
                {subjectName(q.subjectId)}
              </span>
              <span className="text-ink-3">·</span>
              <span className="text-[12.5px] text-ink-3">{q.topic}</span>
              <Badge tone={diffTone(q.difficulty)} className="ml-auto">
                {q.difficulty}
              </Badge>
            </div>

            <p className="mt-4 text-[15px] leading-[1.65] text-ink/90"><HighlightableText text={q.vignette} enabled={revealed} blockId="vignette" highlights={highlights} /></p>
            <p className="mt-3 text-[15.5px] font-semibold leading-snug text-ink"><HighlightableText text={q.stem} enabled={revealed} blockId="stem" highlights={highlights} /></p>

            {q.attachedImage && (
              <div className="mt-4 overflow-hidden rounded-xl border border-line bg-inset p-2">
                <LazyZoomableImage src={q.attachedImage} alt={t('Question attachment')} className="max-h-80 w-full rounded-lg object-contain" />
              </div>
            )}
            {q.attachments && q.attachments.length > 0 && (
              <div className="mt-4 space-y-2">
                {q.attachments.map((attachment) => <LazyMediaAttachmentView key={attachment.id} attachment={attachment} />)}
              </div>
            )}

            {/* Once the answer is revealed an option stops being a control and
                becomes prose. It used to stay a `<button disabled>`, which swallows
                pointer events for everything inside it — so the concept links in
                the answers went live and dead at the same instant, and the one
                place they matter most was the one place they never worked. */}
            <div className="mt-5 space-y-2.5">
              {q.options.map((opt, i) => {
                const ruledOut = (struck[q.id] ?? []).includes(i)
                // Only two rationales are shown right under the options: the
                // correct answer's, and — if it was wrong — the one the student
                // picked. Every other wrong option is explained in the
                // consolidated "Answer explanations" block instead.
                const rationaleText = opt.rationale.trim()
                const inlineRationale = rationaleText && (opt.correct || chosen === i)
                const badge = (
                  <span
                    className={cn(
                      'grid size-6 shrink-0 place-items-center rounded-full border text-[12px] font-semibold',
                      revealed && opt.correct
                        ? 'border-success bg-success text-on-success'
                        : revealed && chosen === i
                          ? 'border-danger bg-danger text-on-danger'
                          : chosen === i
                            ? 'border-primary bg-primary text-on-primary'
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
                )
                const text = (
                  <span className={cn('flex-1 pt-0.5 text-[14px] text-ink', ruledOut && 'line-through decoration-ink-3')}>
                    <HighlightableText text={opt.text} enabled={revealed} blockId={`option-${i}`} highlights={highlights} />
                  </span>
                )
                // main kept the badge and the option text as one inseparable
                // `body`, because on its side the whole row was a single control.
                // Here they are two: the badge answers and the text rules out, so
                // each needs to be placed on its own.
                const shape = cn(
                  'flex w-full items-start gap-3 rounded-lg border p-3 text-start transition-colors',
                  optionClasses(i),
                  ruledOut && !revealed && 'opacity-55',
                )
                const statTone = opt.correct ? 'correct' as const : chosen === i ? 'wrong' as const : 'neutral' as const
                return (
                  <div key={i}>
                    {revealed ? (
                      <div className={cn(shape, 'relative overflow-hidden')}>
                        {badge}
                        <div className="min-w-0 flex-1">
                          <span className="flex items-start gap-2">
                            {text}
                            {percentages && (
                              <span className="tnum shrink-0 self-start pt-0.5 font-mono text-[12px] font-semibold text-ink-2">
                                {percentages[i] ?? 0}%
                              </span>
                            )}
                          </span>
                          {inlineRationale && (
                            <p
                              className={cn(
                                'mt-2 rounded-lg border px-3 py-2 text-[12.5px] leading-relaxed',
                                opt.correct
                                  ? 'border-success/20 bg-success-tint/40 text-ink-2'
                                  : 'border-danger/20 bg-danger-tint/40 text-ink-2',
                              )}
                            >
                              {/* No "Why this is right/wrong" label — the option
                                  it sits under already shows its letter and
                                  correct/incorrect colour. */}
                              <HighlightableText text={rationaleText} enabled blockId={`rationale-${i}`} highlights={highlights} />
                            </p>
                          )}
                        </div>
                        {percentages && <LazyAnswerStatBar pct={percentages[i] ?? 0} tone={statTone} />}
                      </div>
                    ) : (
                      <div className={cn(shape, 'relative p-0')}>
                        <button
                          type="button"
                          onClick={() => {
                            // A drag that ends inside this button still fires a
                            // click. Without this guard, dragging across an
                            // option's text to highlight it would also select
                            // that option as the answer.
                            if (window.getSelection()?.isCollapsed === false) return
                            setAnswers((a) => ({ ...a, [q.id]: i }))
                            // Symmetric with `toggleStrike`, which drops the
                            // selection when it strikes the selected option — see
                            // `selectClearsStrike`.
                            setStruck((current) => selectClearsStrike(current, q.id, i))
                          }}
                          aria-pressed={chosen === i}
                          aria-label={`${t('Choose answer')} ${LETTERS[i]}: ${opt.text}`}
                          className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 rounded-lg p-3 pe-12 text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                        >
                          {badge}
                          {text}
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleStrike(i)}
                          aria-pressed={ruledOut}
                          aria-label={`${ruledOut ? t('Rule back in') : t('Rule out')}: ${opt.text}`}
                          title={ruledOut ? t('Include this answer again') : t('Exclude this answer')}
                          className={cn(
                            'absolute end-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-md border transition-colors sm:size-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
                            ruledOut
                              ? 'border-danger/30 bg-danger-tint text-danger'
                              : 'border-transparent text-ink-3 hover:border-line hover:bg-inset hover:text-ink',
                          )}
                        >
                          <Icon icon={X} size={16} strokeWidth={2.3} />
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {revealed && (
              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => { const correct = q.options.find((option) => option.correct); setFlashcardSeed({ front: q.stem, back: correct ? correct.text : q.explanation }) }}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-line bg-surface px-3 py-1.5 text-[12.5px] font-medium text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink sm:min-h-0"
                >
                  <Icon icon={Layers} size={14} /> {t('Create flashcard')}
                </button>
              </div>
            )}

            {/* Consolidated explanations stay with the question in single
                column; in split view they move to the right column below. */}
            {!splitActive && explanations && <div className="mt-6">{explanations}</div>}
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
          <Button
            variant="ghost"
            size="md"
            iconLeft={ArrowLeft}
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={idx === 0}
          >
            {t('Previous')}
          </Button>

          {!reviewing && mode === 'tutor' && !checked[q.id] ? (
            <Button
              variant="primary"
              size="md"
              disabled={chosen == null}
              onClick={checkAnswer}
            >
              {t('Check answer')}
            </Button>
          ) : last ? (
            <Button
              variant="primary"
              size="md"
              iconRight={reviewing ? undefined : Trophy}
              // Reconciled: main's `showResults` graded a timed block on the
              // way to the paper — `commitAnswers` is the same commit, tested,
              // and the incoming branch also marks the sitting submitted and
              // clears `reviewing` on the other exit from a review.
              onClick={() => {
                if (!reviewing) { commitAnswers(); setSubmitted(true) }
                // The other way out of a review, and the same reason it has to
                // clear the flag as it goes.
                else setReviewing(false)
                setPhase(reviewing ? reviewReturn : 'results')
              }}
            >
              {reviewing ? t('Finish review') : t('See results')}
            </Button>
          ) : (
            <Button variant="primary" size="md" iconRight={ArrowRight} onClick={() => setIdx((i) => i + 1)}>
              {t('Next')}
            </Button>
          )}
        </div>
      </Panel>
        </div>

        {/* Right column: in split view the answer explanations sit above the
            study tools (flag, notes, concepts); otherwise it is the study rail
            alone. */}
        <div className="space-y-4 lg:sticky lg:top-4">
          {splitActive && explanations}
          <LazyStudyRail
            question={q}
            revealed={revealed}
            location={location}
            flagged={marked.has(q.id)}
            onFlag={() => setMarked((current) => {
              const next = new Set(current)
              if (!next.delete(q.id)) next.add(q.id)
              return next
            })}
            onReport={() => setReportTarget({ kind: 'question', id: q.id, title: q.stem })}
            onEnd={() => {
              if (!reviewing) { setEndOpen(true); return }
              setReviewing(false)
              setPhase(reviewReturn)
            }}
            endLabel={reviewing ? (reviewReturn === 'results' ? t('Back') : t('Done')) : t('End')}
          />
        </div>
      </div>
      <LazyReportContentDialog open={Boolean(reportTarget)} target={reportTarget} onClose={() => setReportTarget(null)} />
      {flashcardSeed && (
        <LazyQuickAddFlashcardDialog initialFront={flashcardSeed.front} initialBack={flashcardSeed.back} onClose={() => setFlashcardSeed(null)} />
      )}
      {endOpen && (
        <LazyEndSessionDialog
          answered={session.filter((question) => answers[question.id] != null).length}
          total={session.length}
          onLeave={leaveSession}
          onSubmit={submitSession}
          onClose={closeEndDialog}
          interrupted={visibilityPaused || blocker.state === 'blocked'}
        />
      )}
    </div>
    </Suspense>
  )
}
