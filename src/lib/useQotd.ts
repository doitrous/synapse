import { useCallback, useEffect, useMemo, useState } from 'react'
import { API_MODE, apiGet, apiPost } from './api'
import { useContentItem, useScopedQuestions } from './content'
import { useIdentity } from './useIdentity'
import { managedQuestionToStudentQuestion, publishedQuestionsFromCatalogue } from './usePublishedQuestions'
import { usePersistentState } from './usePersistentState'
import type { Question } from '@/data/qbank'
import { qotdDateInCairo } from '@/data/qotdCohort'
import { selectQotdId, type QotdCandidate, type QotdCohort, type QotdPins } from '@/data/qotdSelection'
import { computeStreak } from '@/data/qotdStreak'
import {
  QOTD_LOCAL_ANSWERS_KEY,
  QOTD_PINS_KEY,
  type QotdAnswerResponse,
  type QotdLocalAnswer,
  type QotdTodayResponse,
} from '@/data/qotdTypes'

/**
 * Question of the Day — one shared question per cohort, a personal streak, and
 * nothing written to mastery/SRS/`qbank_attempts` (see the design doc's
 * separate-track guarantee).
 *
 * Live: the server is authoritative — `GET /api/qotd/today` names today's
 * question id for the caller's cohort and `POST /api/qotd/answer` re-derives
 * and re-marks it. This hook never picks its own question id in live mode; it
 * only fetches that one id's redacted body via `useContentItem`, never the
 * whole published bank.
 *
 * Demo: the identical selection algorithm (Lane A) runs locally over the
 * published pool, and the answer log lives in a local `app_state` document
 * (localStorage in demo, per `usePersistentState`).
 *
 * `enabled` lets a caller mounted in every portal (the sidebar badge) skip all
 * work off the student app — with it false the hook makes no request and
 * returns an inert, unanswered state.
 */
export interface QotdState {
  loading: boolean
  date: string
  question: Question | null
  answered: boolean
  answerIndex: number | null
  correct: boolean | null
  current: number
  longest: number
  history: string[]
  answer: (index: number) => Promise<void>
}

const EMPTY_HISTORY: string[] = []
const NOOP_ANSWER = async (): Promise<void> => {}

/**
 * Three surfaces mount this hook on the dashboard at once, and each used to
 * ask the server for today's question separately. One in-flight request is
 * shared, and kept for a few seconds so a re-render storm cannot fan out again;
 * a failure is forgotten immediately so the next caller retries.
 */
let todayShared: { at: number; promise: Promise<QotdTodayResponse> } | null = null
function fetchToday(): Promise<QotdTodayResponse> {
  if (todayShared && Date.now() - todayShared.at < 10_000) return todayShared.promise
  const promise = apiGet<QotdTodayResponse>('/qotd/today')
  todayShared = { at: Date.now(), promise }
  promise.catch(() => { if (todayShared?.promise === promise) todayShared = null })
  return promise
}

export function useQotd(enabled = true): QotdState {
  const identity = useIdentity()
  const date = qotdDateInCairo(new Date())

  /* ---- live mode: server is authoritative ---------------------------- */
  const [live, setLive] = useState<QotdTodayResponse | null>(null)
  const [liveLoading, setLiveLoading] = useState(API_MODE && enabled)

  const loadLive = useCallback(async () => {
    if (!API_MODE || !enabled) return
    setLiveLoading(true)
    try {
      setLive(await fetchToday())
    } catch {
      setLive(null)
    } finally {
      setLiveLoading(false)
    }
  }, [enabled])

  // Refetch when the cohort resolves (e.g. onboarding completes mid-session and
  // the profile gains a university/year), not only on remount.
  useEffect(() => {
    void loadLive()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadLive, identity.audience.universityId, identity.audience.year])

  /* ---- demo mode: identical selection, run locally -------------------- */
  // Live mode never needs the full bank — the server already named today's
  // question id, so only that one item is fetched below. This pool is demo's
  // alone, and the `enabled` gate keeps it from being requested off-app or in
  // live mode.
  const [demoCatalogue] = useScopedQuestions({}, { enabled: !API_MODE && enabled })
  const demoQuestions = useMemo(() => publishedQuestionsFromCatalogue(demoCatalogue), [demoCatalogue])
  const demoQuestionsById = useMemo(
    () => new Map(demoQuestions.map((q) => [q.id, q] as const)),
    [demoQuestions],
  )
  // Demo candidates carry no curriculum scope tags — the student `Question`
  // shape does not expose them — so every candidate is unscoped and
  // `scopeCandidates` keeps the whole published pool.
  const candidates: QotdCandidate[] = useMemo(
    () => demoQuestions.map((q) => ({ id: q.id, universityIds: [], yearIds: [] })),
    [demoQuestions],
  )
  const cohort: QotdCohort = {
    universityId: identity.audience.universityId,
    year: identity.audience.year,
    yearId: identity.audience.yearId,
  }
  // The admin pin document, read straight from localStorage in demo mode so the
  // local selector honours a pin exactly as the server does in live mode. Read
  // directly rather than via usePersistentState because that hook would hydrate
  // the shared key from the server in live mode — a request a student is not
  // authorised to make (it 403s) and whose result the live branch never uses.
  const pins = useMemo<QotdPins>(() => {
    if (API_MODE || !enabled || typeof window === 'undefined') return {}
    try { return JSON.parse(window.localStorage.getItem(QOTD_PINS_KEY) ?? '{}') as QotdPins } catch { return {} }
  }, [enabled])
  const demoQuestionId = useMemo(
    () => selectQotdId(candidates, cohort, date, pins),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [candidates, cohort.universityId, cohort.year, cohort.yearId, date, pins],
  )

  // Called unconditionally (hooks cannot be conditional): in live mode this
  // document is never read or written, only registered.
  const [localAnswers, setLocalAnswers] = usePersistentState<QotdLocalAnswer[]>(QOTD_LOCAL_ANSWERS_KEY, [])
  const demoAnswer = useMemo(() => localAnswers.find((a) => a.date === date) ?? null, [localAnswers, date])
  const demoDates = useMemo(() => localAnswers.map((a) => a.date), [localAnswers])
  const demoStreak = useMemo(() => computeStreak(demoDates, date), [demoDates, date])

  /* ---- merged view ----------------------------------------------------- */
  const questionId = API_MODE ? live?.questionId ?? null : demoQuestionId
  // Live: one redacted item, by id — not the whole catalogue. `catalogue: []`
  // means library/resource ref titles degrade to their raw id (see
  // `managedQuestionToStudentQuestion`), which is fine here — the QotD card
  // never renders those refs.
  const [liveItem] = useContentItem(API_MODE && enabled ? questionId : null)
  const liveQuestion = useMemo(
    () => (liveItem ? managedQuestionToStudentQuestion(liveItem, []) : null),
    [liveItem],
  )
  const question = API_MODE ? liveQuestion : (questionId ? demoQuestionsById.get(questionId) ?? null : null)
  const answered = API_MODE ? Boolean(live?.answered) : demoAnswer !== null
  const answerIndex = API_MODE ? live?.answerIndex ?? null : demoAnswer?.answerIndex ?? null
  const correct = API_MODE ? live?.correct ?? null : demoAnswer?.correct ?? null
  const current = API_MODE ? live?.current ?? 0 : demoStreak.current
  const longest = API_MODE ? live?.longest ?? 0 : demoStreak.longest
  const history = API_MODE ? live?.history ?? EMPTY_HISTORY : demoDates
  const loading = API_MODE && liveLoading

  const answer = useCallback(async (index: number) => {
    // A second submit is a no-op in both modes — the day's answer is
    // immutable once recorded (the server's unique key and this guard agree).
    if (answered) return

    if (API_MODE) {
      const targetId = live?.questionId
      if (!targetId) return
      const result = await apiPost<QotdAnswerResponse>('/qotd/answer', { questionId: targetId, answerIndex: index })
      setLive((prev) => (prev ? {
        ...prev,
        answered: true,
        answerIndex: index,
        correct: result.correct,
        current: result.current,
        longest: result.longest,
        history: [date, ...prev.history],
      } : prev))
      return
    }

    if (!demoQuestionId) return
    const target = demoQuestionsById.get(demoQuestionId)
    if (!target) return
    const wasCorrect = Boolean(target.options[index]?.correct)
    setLocalAnswers((prev) => [...prev, { date, questionId: demoQuestionId, answerIndex: index, correct: wasCorrect }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answered, live?.questionId, demoQuestionId, demoQuestionsById, date, setLocalAnswers])

  // Disabled (e.g. the sidebar badge off the student app): report a stable,
  // unanswered, request-free state. All hooks above still ran, so order holds.
  if (!enabled) {
    return {
      loading: false, date, question: null, answered: false, answerIndex: null,
      correct: null, current: 0, longest: 0, history: EMPTY_HISTORY, answer: NOOP_ANSWER,
    }
  }

  return { loading, date, question, answered, answerIndex, correct, current, longest, history, answer }
}
