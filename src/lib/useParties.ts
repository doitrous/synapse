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
  layoutKey?:string
  scope?:'global'|'university'|'cohort'
  capacity?:number
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
  layoutKey?:string
  scope?:'global'|'university'|'cohort'
  capacity?:number
  id: string
  code: string
  name: string
  hostUserId: string
  createdAt: string
  members: number
}

/** A member's seat as the server stores it. Every piece may be unchosen. */
export interface PartyMemberSeat {
  desk: 'plain' | 'drawer' | 'corner' | null
  device: 'laptop' | 'desktop' | 'tablet' | 'iphone' | 'android' | null
  chair: 'stool' | 'office' | 'ergonomic' | 'executive' | 'lounge' | 'gaming' | null
  /** Which of the room's twenty desks, or null for "here, nowhere in particular". */
  seatIndex: number | null
}

export interface PartyMember {
  userId: string
  displayName: string
  /** Self-set, shown read-only next to the name. See status_message in accounts.js. */
  statusMessage?: string | null
  role: 'host' | 'member'
  joinedAt: string
  /** Null until this member has chosen anything. Absent from a server that predates seats. */
  seat?: PartyMemberSeat | null
  /** The last heartbeat, ISO. Null for a member who has never sent one. */
  lastActiveAt?: string | null
  /** What that heartbeat claimed, expired by the server against its own clock. */
  activity?: 'studying' | 'idle'
}

export interface Party {
  layoutKey?:string
  scope?:'global'|'university'|'cohort'
  capacity?:number
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
  tableId?:string|null
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
  room_full:'This room is full. Choose another room or try again later.',
  invalid_room_options:'Choose a room layout and audience.',
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

/**
 * Stale-while-revalidate caches, module-level so they outlive a component that
 * unmounts on navigation. Going back to Study Rooms and reopening a room are
 * the two round-trips a student makes constantly, and both used to blank to a
 * skeleton while a fetch they had already done ran again. Now the last good
 * answer paints instantly and the fetch refreshes it underneath. A transient
 * failure keeps the last good answer rather than blanking; only a first-ever
 * load with nothing cached shows empty.
 */
let myPartiesCache: PartySummary[] | null = null
let openPartiesCache: OpenParty[] | null = null
const partyCache = new Map<string, Party>()

export function useMyParties() {
  const [parties, setParties] = useState<PartySummary[]>(() => myPartiesCache ?? [])
  const [loading, setLoading] = useState(API_MODE && myPartiesCache === null)

  const reload = useCallback(async () => {
    if (!API_MODE) return
    try {
      const result = await apiGet<{ parties: PartySummary[] }>('/parties/mine')
      myPartiesCache = result.parties
      setParties(result.parties)
    } catch {
      if (myPartiesCache === null) setParties([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void reload()
    if (!API_MODE) return
    const refresh=()=>{if(document.visibilityState==='visible')void reload()}
    const timer=window.setInterval(refresh,15_000)
    window.addEventListener('focus',refresh)
    return()=>{window.clearInterval(timer);window.removeEventListener('focus',refresh)}
  }, [reload])
  return { parties, loading, reload }
}

/** Parties in the caller's own cohort they could join, but are not standing in yet. */
export function useOpenParties() {
  const [parties, setParties] = useState<OpenParty[]>(() => openPartiesCache ?? [])
  const [loading, setLoading] = useState(API_MODE && openPartiesCache === null)

  const reload = useCallback(async () => {
    if (!API_MODE) return
    try {
      const result = await apiGet<{ parties: OpenParty[] }>('/parties/open')
      openPartiesCache = result.parties
      setParties(result.parties)
    } catch {
      if (openPartiesCache === null) setParties([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void reload()
    if (!API_MODE) return
    const refresh=()=>{if(document.visibilityState==='visible')void reload()}
    const timer=window.setInterval(refresh,15_000)
    window.addEventListener('focus',refresh)
    return()=>{window.clearInterval(timer);window.removeEventListener('focus',refresh)}
  }, [reload])
  return { parties, loading, reload }
}

/**
 * One party, re-read while it is still active.
 *
 * Polling stops once the party is archived: there is nothing further to
 * learn, the same reasoning `useRoom` applies to a closed room.
 */
/** A backgrounded read still watches, at a fifteenth of the rate. */
const SLOW_POLL_MS = POLL_MS * 15

/**
 * One party, re-read while it is still active — slowly, when something better
 * is watching it.
 *
 * `background` stands the four-second poll down to one a minute rather than
 * stopping it: a study room with an open WebSocket already learns about every
 * membership and seat change the instant it happens, and polling underneath it
 * would be a query a minute per member for news the room already has. But the
 * socket carries members and nothing else — `archivedAt`, `visibility`, the
 * name and the host all come from this read, and stopping it outright left a
 * member of an archived room with a fully interactive room until they navigated
 * away.
 */
export function useParty(partyId: string | null, options?: { background?: boolean }) {
  // Seeded from the cache so reopening a room the student was just in paints the
  // hall immediately instead of flashing "Loading students and seats…". RoomView
  // is keyed by room id, so this hook remounts per room and the initializer is
  // always reading the right room's cached party.
  const [party, setParty] = useState<Party | null>(() => (partyId ? partyCache.get(partyId) ?? null : null))
  const [error, setError] = useState('')
  const archivedRef = useRef(false)
  const background = Boolean(options?.background)

  const load = useCallback(async () => {
    if (!partyId || !API_MODE) return
    try {
      const result = await apiGet<{ party: Party }>(`/parties/${encodeURIComponent(partyId)}`)
      partyCache.set(partyId, result.party)
      setParty(result.party)
      archivedRef.current = result.party.archivedAt !== null
      setError('')
    } catch {
      // Keep the cached party on a transient failure; only surface the error
      // when there was nothing to show in the first place.
      if (!partyCache.has(partyId)) setError('That party could not be loaded.')
    }
  }, [partyId])

  useEffect(() => {
    if (!partyId || !API_MODE) return
    void load()
    const timer = window.setInterval(() => {
      if (archivedRef.current) return
      void load()
    }, background ? SLOW_POLL_MS : POLL_MS)
    return () => window.clearInterval(timer)
  }, [load, partyId, background])

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
    (name: string, options?:{layoutKey:string;scope:'cohort'|'university'|'global';visibility:'open'|'invite'}) => apiPost<{ ok: boolean; reason?: string; party?: Party }>('/parties', { name,...options }),
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
    (partyId: string, input: { name: string; items: PartySessionItemRef[]; startsAt: string | null; scope?:'room'|'table' }) =>
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
