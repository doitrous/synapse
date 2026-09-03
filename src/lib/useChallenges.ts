import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { API_MODE, apiGet, apiPost } from './api'

/**
 * Head-to-head challenges — the same frozen paper, sat separately.
 *
 * Mirrors `useStudyRooms.ts`: nothing is invented in the browser, the server
 * is polled while a challenge is still open, and every refusal reason it can
 * send back has a sentence a student can read. The one thing this hook adds
 * over a room is the shaping step below — `challenges.js` reports absolute
 * `challengerId`/`opponentId` plus `myRole`, and every caller here wants "the
 * other person" and "am I the one who sent it", so that's computed once.
 */

/** How often an open challenge is re-read. Same cadence as a study room. */
const POLL_MS = 4_000

export type ChallengeStatus = 'sent' | 'declined' | 'running' | 'complete'

export interface ChallengeSummary {
  id: string
  scopeLabel: string
  status: ChallengeStatus
  /** The other participant. Not a name — the server's list endpoint gives only the id. */
  opponentId: string
  iAmChallenger: boolean
  questionCount: number
  myFinished: boolean
  opponentFinished: boolean
  createdAt: string
  /** Set only once both sides have finished — the list view's own copy of the `Challenge.result` rule. */
  result: ChallengeHeadToHead | null
}

export interface ChallengeHeadToHead {
  challenger: { correct: number; answered: number; seconds: number }
  opponent: { correct: number; answered: number; seconds: number }
  questions: { questionId: string; challengerCorrect: boolean; opponentCorrect: boolean }[]
}

export interface Challenge extends ChallengeSummary {
  questionIds: string[]
  myAnswers: { questionId: string; chosenIndex: number; correct: boolean }[]
  /** Null until both sides have finished — see the server's rule. */
  result: ChallengeHeadToHead | null
}

/** The shape `challengeFor` and `myChallenges` actually send, before shaping. */
interface RawChallengeSummary {
  id: string
  scopeLabel: string
  status: ChallengeStatus
  opponentId: string
  myRole: 'challenger' | 'opponent'
  questionCount: number
  myFinished: boolean
  opponentFinished: boolean
  createdAt: string
  result: ChallengeHeadToHead | null
}

interface RawChallenge {
  id: string
  challengerId: string
  opponentId: string
  scopeLabel: string
  status: ChallengeStatus
  questionIds: string[]
  questionCount: number
  createdAt: string
  myRole: 'challenger' | 'opponent'
  myFinished: boolean
  opponentFinished: boolean
  myAnswers: { questionId: string; chosenIndex: number; correct: boolean }[]
  result: ChallengeHeadToHead | null
}

// `myChallenges` already resolves `opponentId` to "the other person" — only
// `challengeFor` (the single-challenge read) reports both ids absolutely, so
// only that one needs `opponentId` recomputed from `myRole`.
function toSummary(raw: RawChallengeSummary): ChallengeSummary {
  return {
    id: raw.id,
    scopeLabel: raw.scopeLabel,
    status: raw.status,
    opponentId: raw.opponentId,
    iAmChallenger: raw.myRole === 'challenger',
    questionCount: raw.questionCount,
    myFinished: raw.myFinished,
    opponentFinished: raw.opponentFinished,
    createdAt: raw.createdAt,
    result: raw.result,
  }
}

function toChallenge(raw: RawChallenge): Challenge {
  return {
    id: raw.id,
    scopeLabel: raw.scopeLabel,
    status: raw.status,
    opponentId: raw.myRole === 'challenger' ? raw.opponentId : raw.challengerId,
    iAmChallenger: raw.myRole === 'challenger',
    questionCount: raw.questionCount,
    myFinished: raw.myFinished,
    opponentFinished: raw.opponentFinished,
    createdAt: raw.createdAt,
    questionIds: raw.questionIds,
    myAnswers: raw.myAnswers,
    result: raw.result,
  }
}

export const CHALLENGE_REFUSALS: Record<string, string> = {
  invalid_opponent: 'Choose a friend to challenge.',
  not_friends: 'You can only challenge a friend.',
  no_questions: 'Pick at least one published question for the challenge.',
  // One sentence covers both "no such challenge" and "a real one that is not
  // yours" — the server deliberately answers the same for either, so telling
  // them apart here would put back the difference it removes.
  not_found: 'That challenge could not be found.',
  not_pending: 'That challenge has already been answered.',
  not_running: 'That challenge is not running.',
  not_in_challenge: 'That question is not part of this challenge.',
  already_finished: 'You have already finished this challenge.',
  question_gone: 'That question is no longer available.',
}

export type Updater<T> = T | ((previous: T) => T)

/**
 * Two small broadcast caches: the "mine" list `useMyChallenges` shows, and one
 * challenge at a time keyed by id for `useChallenge`.
 *
 * `useChallengeActions`'s `respond`/`finish` are called from wherever the
 * button lives — a different hook instance than the one holding the list or
 * the single record. Routing both through a cache instead of per-instance
 * `useState` is what lets those actions apply instantly to whatever is on
 * screen, and roll back into the same place if the request fails.
 */
function createKeyedStore<T>() {
  const values = new Map<string, T>()
  const listeners = new Map<string, Set<() => void>>()
  return {
    ensure(key: string, initial: T): T {
      if (!values.has(key)) values.set(key, initial)
      return values.get(key) as T
    },
    set(key: string, value: T): void {
      values.set(key, value)
      for (const listener of listeners.get(key) ?? []) listener()
    },
    subscribe(key: string, listener: () => void): () => void {
      let bucket = listeners.get(key)
      if (!bucket) { bucket = new Set(); listeners.set(key, bucket) }
      bucket.add(listener)
      return () => bucket!.delete(listener)
    },
  }
}

const challengeListStore = createKeyedStore<ChallengeSummary[]>()
/** The single key `useMyChallenges` reads/writes — one list, not one per id. */
const MINE_KEY = 'mine'

const challengeStore = createKeyedStore<Challenge | null>()

/**
 * Only undo `challengeId`'s optimistic value if nothing newer — the next
 * poll, or a second action — has already replaced it. A blind restore here
 * could clobber fresher data; leaving it alone instead means a stale flag at
 * worst self-corrects at the next four-second poll.
 */
function rollbackChallenge(challengeId: string, optimistic: Challenge | null, before: Challenge | null): void {
  if (challengeStore.ensure(challengeId, null) === optimistic) challengeStore.set(challengeId, before)
}

/** Patch one row of the "mine" list by id; returns the row as it was before, or null if not cached. */
function patchChallengeSummary(challengeId: string, patch: (item: ChallengeSummary) => ChallengeSummary): ChallengeSummary | null {
  const list = challengeListStore.ensure(MINE_KEY, [])
  const index = list.findIndex((entry) => entry.id === challengeId)
  if (index === -1) return null
  const before = list[index]
  const next = list.slice()
  next[index] = patch(before)
  challengeListStore.set(MINE_KEY, next)
  return before
}

export function useMyChallenges() {
  const getSnapshot = useCallback(() => challengeListStore.ensure(MINE_KEY, []), [])
  const subscribe = useCallback((listener: () => void) => challengeListStore.subscribe(MINE_KEY, listener), [])
  const challenges = useSyncExternalStore(subscribe, getSnapshot)
  const [loading, setLoading] = useState(API_MODE)

  const reload = useCallback(async () => {
    if (!API_MODE) return
    try {
      const result = await apiGet<{ challenges: RawChallengeSummary[] }>('/challenges/mine')
      challengeListStore.set(MINE_KEY, result.challenges.map(toSummary))
    } catch {
      challengeListStore.set(MINE_KEY, [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void reload() }, [reload])
  return { challenges, loading, reload }
}

/**
 * One challenge, re-read while it is still open.
 *
 * Polling stops once the challenge is declined or complete: there is nothing
 * further either side can do, and a finished paper should not keep a request
 * running every four seconds.
 */
export function useChallenge(challengeId: string | null) {
  const key = challengeId ?? ''
  const getSnapshot = useCallback(() => challengeStore.ensure(key, null), [key])
  const subscribe = useCallback((listener: () => void) => challengeStore.subscribe(key, listener), [key])
  const challenge = useSyncExternalStore(subscribe, getSnapshot)
  const setChallenge = useCallback((next: Updater<Challenge | null>) => {
    const current = challengeStore.ensure(key, null)
    challengeStore.set(key, typeof next === 'function' ? (next as (previous: Challenge | null) => Challenge | null)(current) : next)
  }, [key])
  const [error, setError] = useState('')
  const statusRef = useRef<ChallengeStatus | null>(null)

  const load = useCallback(async () => {
    if (!challengeId || !API_MODE) return
    try {
      const result = await apiGet<{ challenge: RawChallenge }>(`/challenges/${encodeURIComponent(challengeId)}`)
      const mapped = toChallenge(result.challenge)
      challengeStore.set(challengeId, mapped)
      statusRef.current = mapped.status
      setError('')
    } catch {
      setError('That challenge could not be loaded.')
    }
  }, [challengeId])

  useEffect(() => {
    if (!challengeId || !API_MODE) return
    void load()
    const timer = window.setInterval(() => {
      if (statusRef.current === 'declined' || statusRef.current === 'complete') return
      void load()
    }, POLL_MS)
    return () => window.clearInterval(timer)
  }, [load, challengeId])

  return { challenge, error, reload: load, setChallenge }
}

export function useChallengeActions() {
  // create stays request-then-render: it mints the challenge's own id and
  // freezes its question set server-side, and `not_friends`/`no_questions`
  // are common enough refusals (not_friends especially — this UI does not
  // recheck friendship before offering Challenge) that success is not
  // near-certain here.
  const create = useCallback(
    async (input: { opponentId: string; questionIds: string[]; scopeLabel: string }) => {
      const result = await apiPost<{ ok: boolean; reason?: string; challenge?: RawChallenge }>('/challenges', input)
      return { ...result, challenge: result.challenge ? toChallenge(result.challenge) : undefined }
    },
    [],
  )
  const respond = useCallback(
    async (challengeId: string, accept: boolean) => {
      const targetStatus: ChallengeStatus = accept ? 'running' : 'declined'
      const before = patchChallengeSummary(challengeId, (item) => ({ ...item, status: targetStatus }))
      try {
        const result = await apiPost<{ ok: boolean; reason?: string; challenge?: RawChallenge }>(
          `/challenges/${encodeURIComponent(challengeId)}/respond`,
          { accept },
        )
        if (result.challenge) {
          patchChallengeSummary(challengeId, (item) => (item.status === targetStatus ? { ...item, status: result.challenge!.status } : item))
        } else if (!result.ok && before) {
          // Same compare-and-restore guard as the room/share stores: only
          // undo if a second response to this same challenge has not already
          // moved the status on.
          patchChallengeSummary(challengeId, (item) => (item.status === targetStatus ? before : item))
        }
        return { ...result, challenge: result.challenge ? toChallenge(result.challenge) : undefined }
      } catch (error) {
        if (before) patchChallengeSummary(challengeId, (item) => (item.status === targetStatus ? before : item))
        throw error
      }
    },
    [],
  )
  // answer never goes optimistic: the server is the sole grader (see the file
  // docstring above) — showing a verdict before it answers would be inventing
  // one, and the opponent sees the same score.
  const answer = useCallback(
    (challengeId: string, input: { questionId: string; chosenIndex: number; seconds: number | null }) =>
      apiPost<{ ok: boolean; reason?: string; correct?: boolean; correctIndex?: number }>(
        `/challenges/${encodeURIComponent(challengeId)}/answers`,
        input,
      ),
    [],
  )
  const finish = useCallback(
    async (challengeId: string) => {
      const before = challengeStore.ensure(challengeId, null)
      const optimistic = before ? { ...before, myFinished: true } : null
      if (optimistic) challengeStore.set(challengeId, optimistic)
      try {
        const result = await apiPost<{ ok: boolean; reason?: string; challenge?: RawChallenge }>(
          `/challenges/${encodeURIComponent(challengeId)}/finish`,
        )
        const challenge = result.challenge ? toChallenge(result.challenge) : undefined
        if (challenge) challengeStore.set(challengeId, challenge)
        else if (!result.ok) rollbackChallenge(challengeId, optimistic, before)
        return { ...result, challenge }
      } catch (error) {
        rollbackChallenge(challengeId, optimistic, before)
        throw error
      }
    },
    [],
  )
  return { create, respond, answer, finish }
}
