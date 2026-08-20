import { useCallback, useEffect, useRef, useState } from 'react'
import { API_MODE, apiGet, apiPost } from '@/lib/api'

/**
 * Study parties — a standing group confined to one university and year, with
 * one permanent link and a switch between findable-by-your-year and
 * invite-only.
 *
 * Mirrors `useStudyRooms.ts`: nothing is invented in the browser, the server
 * is polled while there is still something live to learn, and every refusal
 * reason the server can send back has a sentence a student can read. Unlike a
 * study room, a party owns two things worth reading on their own — the party
 * (a standing group) and a session (one frozen sitting within it) — so this
 * file has two polling reads instead of one, `useParty` and `usePartySession`,
 * each stopping for the same reason `useRoom` does: nothing further to learn.
 */

/** How often a live read is re-fetched. Same cadence as a study room. */
const POLL_MS = 4_000

export interface PartySummary {
  id: string
  code: string
  name: string
  isHost: boolean
  visibility: 'open' | 'invite'
  createdAt: string
  archivedAt: string | null
  members: number
}

/**
 * A party as it appears while browsing `/api/parties/open`. Deliberately
 * thinner than `PartySummary`: the endpoint only ever lists parties in the
 * caller's own cohort that are `open` and not archived, so `visibility` and
 * `archivedAt` would be constant, and a party you are merely looking at
 * (not standing in) has no `isHost` to report.
 */
export interface OpenParty {
  id: string
  code: string
  name: string
  hostUserId: string
  createdAt: string
  members: number
}

export interface PartyMember {
  userId: string
  displayName: string
  role: 'host' | 'member'
  joinedAt: string
}

export interface Party {
  id: string
  code: string
  name: string
  hostUserId: string
  isHost: boolean
  universityId: string
  year: string
  visibility: 'open' | 'invite'
  createdAt: string
  archivedAt: string | null
  members: PartyMember[]
}

export type PartySessionItemKind = 'question' | 'practical' | 'essay'

export interface PartySessionItemRef {
  kind: PartySessionItemKind
  id: string
}

/** One party session as it appears in a party's session list — no per-member detail. */
export interface PartySessionSummary {
  id: string
  name: string
  itemCount: number
  state: 'scheduled' | 'open' | 'closed'
  startsAt: string | null
  closedAt: string | null
  createdBy: string
  isMine: boolean
  createdAt: string
}

export interface PartySessionAnswer {
  kind: PartySessionItemKind
  id: string
  /** Null for a practical or essay item — those are self-checked, never marked here. */
  correct: boolean | null
  seconds: number | null
}

export interface PartySessionMemberTally {
  userId: string
  displayName: string
  /** Marked (questions) counted apart from practised (practicals + essays), never averaged together. */
  tally: { marked: { correct: number; of: number } | null; practised: number }
}

/** One session read in full — the frozen items, the caller's own answers, and every member's tally. */
export interface PartySession extends PartySessionSummary {
  partyId: string
  itemRefs: PartySessionItemRef[]
  myAnswers: PartySessionAnswer[]
  members: PartySessionMemberTally[]
}

export const PARTY_REFUSALS: Record<string, string> = {
  no_cohort: 'Your account has no university and year on file yet, so study parties are not available to you.',
  code_collision: 'A code could not be generated. Try again.',
  // Deliberately vague: the server answers a party in another year and a code
  // that names nothing at all the same way, so a guessed code can never be
  // used to learn whether a party exists. This message must stay honest
  // without implying the party is real.
  wrong_cohort: 'That link does not open a party you can join.',
  archived: 'That party has been archived and is no longer taking new members.',
  invalid_visibility: 'That is not a valid visibility setting.',
  // Shared by a party lookup (setting visibility, leaving) and a session
  // lookup (answering, closing) — the server answers both the same way, so
  // one sentence covers either without claiming to know which was meant.
  not_found: 'That could not be found.',
  not_host: 'Only the host of this party can do that.',
  host_cannot_leave: 'As the host, you cannot leave your own party.',
  not_a_member: 'You are not a member of this party.',
  no_items: 'Pick at least one question, practical or essay item for the session.',
  invalid_starts_at: 'That start time is not valid.',
  not_started: 'This session has not started yet.',
  closed: 'This session has already closed.',
  not_in_session: 'That item is not part of this session.',
  question_gone: 'That question is no longer available.',
  not_allowed: 'Only the host or the person who created this session can close it.',
}

export function useMyParties() {
  const [parties, setParties] = useState<PartySummary[]>([])
  const [loading, setLoading] = useState(API_MODE)

  const reload = useCallback(async () => {
    if (!API_MODE) return
    try {
      const result = await apiGet<{ parties: PartySummary[] }>('/parties/mine')
      setParties(result.parties)
    } catch {
      setParties([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void reload() }, [reload])
  return { parties, loading, reload }
}

/** Parties in the caller's own cohort they could join, but are not standing in yet. */
export function useOpenParties() {
  const [parties, setParties] = useState<OpenParty[]>([])
  const [loading, setLoading] = useState(API_MODE)

  const reload = useCallback(async () => {
    if (!API_MODE) return
    try {
      const result = await apiGet<{ parties: OpenParty[] }>('/parties/open')
      setParties(result.parties)
    } catch {
      setParties([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void reload() }, [reload])
  return { parties, loading, reload }
}

/**
 * One party, re-read while it is still active.
 *
 * Polling stops once the party is archived: there is nothing further to
 * learn, the same reasoning `useRoom` applies to a closed room.
 */
export function useParty(partyId: string | null) {
  const [party, setParty] = useState<Party | null>(null)
  const [error, setError] = useState('')
  const archivedRef = useRef(false)

  const load = useCallback(async () => {
    if (!partyId || !API_MODE) return
    try {
      const result = await apiGet<{ party: Party }>(`/parties/${encodeURIComponent(partyId)}`)
      setParty(result.party)
      archivedRef.current = result.party.archivedAt !== null
      setError('')
    } catch {
      setError('That party could not be loaded.')
    }
  }, [partyId])

  useEffect(() => {
    if (!partyId || !API_MODE) return
    void load()
    const timer = window.setInterval(() => {
      if (archivedRef.current) return
      void load()
    }, POLL_MS)
    return () => window.clearInterval(timer)
  }, [load, partyId])

  return { party, error, reload: load, setParty }
}

/** A party's sessions. Loaded once with a manual `reload`, like `useMyRooms` — a list, not a single live read. */
export function usePartySessions(partyId: string | null) {
  const [sessions, setSessions] = useState<PartySessionSummary[]>([])
  const [loading, setLoading] = useState(API_MODE)

  const reload = useCallback(async () => {
    if (!partyId || !API_MODE) return
    try {
      const result = await apiGet<{ sessions: PartySessionSummary[] }>(`/parties/${encodeURIComponent(partyId)}/sessions`)
      setSessions(result.sessions)
    } catch {
      setSessions([])
    } finally {
      setLoading(false)
    }
  }, [partyId])

  useEffect(() => { void reload() }, [reload])
  return { sessions, loading, reload }
}

/**
 * One session, re-read while it is still open.
 *
 * Polling stops once the session closes: there is nothing further to learn,
 * exactly the condition `useRoom` stops on.
 */
export function usePartySession(sessionId: string | null) {
  const [session, setSession] = useState<PartySession | null>(null)
  const [error, setError] = useState('')
  const stateRef = useRef<PartySession['state'] | null>(null)

  const load = useCallback(async () => {
    if (!sessionId || !API_MODE) return
    try {
      const result = await apiGet<{ session: PartySession }>(`/party-sessions/${encodeURIComponent(sessionId)}`)
      setSession(result.session)
      stateRef.current = result.session.state
      setError('')
    } catch {
      setError('That session could not be loaded.')
    }
  }, [sessionId])

  useEffect(() => {
    if (!sessionId || !API_MODE) return
    void load()
    const timer = window.setInterval(() => {
      if (stateRef.current === 'closed') return
      void load()
    }, POLL_MS)
    return () => window.clearInterval(timer)
  }, [load, sessionId])

  return { session, error, reload: load, setSession }
}

export function usePartyActions() {
  const create = useCallback(
    (name: string) => apiPost<{ ok: boolean; reason?: string; party?: Party }>('/parties', { name }),
    [],
  )
  const join = useCallback(
    (code: string) => apiPost<{ ok: boolean; reason?: string; party?: Party }>('/parties/join', { code }),
    [],
  )
  const setVisibility = useCallback(
    (partyId: string, visibility: 'open' | 'invite') =>
      apiPost<{ ok: boolean; reason?: string; party?: Party }>(`/parties/${encodeURIComponent(partyId)}/visibility`, { visibility }),
    [],
  )
  const leave = useCallback(
    (partyId: string) => apiPost<{ ok: boolean; reason?: string }>(`/parties/${encodeURIComponent(partyId)}/leave`),
    [],
  )
  const createSession = useCallback(
    (partyId: string, input: { name: string; items: PartySessionItemRef[]; startsAt: string | null }) =>
      apiPost<{ ok: boolean; reason?: string; session?: PartySession }>(`/parties/${encodeURIComponent(partyId)}/sessions`, input),
    [],
  )
  const answer = useCallback(
    (sessionId: string, input: { kind: PartySessionItemKind; id: string; chosenIndex: number | null; seconds: number | null }) =>
      apiPost<{ ok: boolean; reason?: string; correct?: boolean | null; correctIndex?: number }>(
        `/party-sessions/${encodeURIComponent(sessionId)}/answers`,
        input,
      ),
    [],
  )
  const closeSession = useCallback(
    (sessionId: string) =>
      apiPost<{ ok: boolean; reason?: string; session?: PartySession }>(`/party-sessions/${encodeURIComponent(sessionId)}/close`),
    [],
  )
  return { create, join, setVisibility, leave, createSession, answer, closeSession }
}
