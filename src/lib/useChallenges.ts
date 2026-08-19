import { useCallback, useEffect, useRef, useState } from 'react'
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
  not_found: 'That challenge could not be found.',
  not_your_challenge: 'That is not your challenge.',
  not_pending: 'That challenge has already been answered.',
  not_running: 'That challenge is not running.',
  not_in_challenge: 'That question is not part of this challenge.',
  already_finished: 'You have already finished this challenge.',
  question_gone: 'That question is no longer available.',
}

export function useMyChallenges() {
  const [challenges, setChallenges] = useState<ChallengeSummary[]>([])
  const [loading, setLoading] = useState(API_MODE)

  const reload = useCallback(async () => {
    if (!API_MODE) return
    try {
      const result = await apiGet<{ challenges: RawChallengeSummary[] }>('/challenges/mine')
      setChallenges(result.challenges.map(toSummary))
    } catch {
      setChallenges([])
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
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [error, setError] = useState('')
  const statusRef = useRef<ChallengeStatus | null>(null)

  const load = useCallback(async () => {
    if (!challengeId || !API_MODE) return
    try {
      const result = await apiGet<{ challenge: RawChallenge }>(`/challenges/${encodeURIComponent(challengeId)}`)
      const mapped = toChallenge(result.challenge)
      setChallenge(mapped)
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
  const create = useCallback(
    async (input: { opponentId: string; questionIds: string[]; scopeLabel: string }) => {
      const result = await apiPost<{ ok: boolean; reason?: string; challenge?: RawChallenge }>('/challenges', input)
      return { ...result, challenge: result.challenge ? toChallenge(result.challenge) : undefined }
    },
    [],
  )
  const respond = useCallback(
    async (challengeId: string, accept: boolean) => {
      const result = await apiPost<{ ok: boolean; reason?: string; challenge?: RawChallenge }>(
        `/challenges/${encodeURIComponent(challengeId)}/respond`,
        { accept },
      )
      return { ...result, challenge: result.challenge ? toChallenge(result.challenge) : undefined }
    },
    [],
  )
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
      const result = await apiPost<{ ok: boolean; reason?: string; challenge?: RawChallenge }>(
        `/challenges/${encodeURIComponent(challengeId)}/finish`,
      )
      return { ...result, challenge: result.challenge ? toChallenge(result.challenge) : undefined }
    },
    [],
  )
  return { create, respond, answer, finish }
}
