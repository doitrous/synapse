import { useCallback, useEffect, useRef, useState } from 'react'
import { API_MODE, apiGet, apiPost } from './api'

/**
 * Shared tests, against the server that now holds them.
 *
 * Every value here comes from `/api/study-rooms`. Nothing is generated in the
 * browser — most importantly not the room code, which the old page invented
 * with `Math.random()` and registered nowhere, so no one could ever join it.
 */

/** How often an open room is re-read. Fast enough to feel live, cheap enough to poll. */
const POLL_MS = 4_000

export interface RoomMember {
  userId: string
  displayName: string | null
  finished: boolean
  answered: number
  /** Null until results are open to the viewer. */
  correct: number | null
}

export interface StudyRoom {
  id: string
  code: string
  name: string
  hostUserId: string
  isHost: boolean
  status: 'lobby' | 'running' | 'closed'
  timed: boolean
  secondsPerQuestion: number | null
  questionCount: number
  /** Empty while the room is in the lobby, so nobody can read ahead. */
  questionIds: string[]
  startedAt: string | null
  closedAt: string | null
  resultsOpen: boolean
  members: RoomMember[]
  myAnswers: { questionId: string; chosenIndex: number; correct: boolean }[]
  myFinished: boolean
}

export interface RoomSummary {
  id: string
  code: string
  name: string
  status: 'lobby' | 'running' | 'closed'
  createdAt: string
  isHost: boolean
  members: number
  questionCount: number
  answered: number
  correct: number
  finished: boolean
}

export const ROOM_REFUSALS: Record<string, string> = {
  not_found: 'No shared test has that code. Check it and try again.',
  closed: 'That shared test has already finished.',
  no_questions: 'Pick at least one published question for the test.',
  code_collision: 'A code could not be generated. Try again.',
  not_host: 'Only the person who created the test can start it.',
  not_started: 'The test has not been started yet.',
  not_in_room: 'That question is not part of this test.',
  not_a_member: 'You are not in this shared test.',
  already_finished: 'You have already finished this test.',
  question_gone: 'That question is no longer available.',
}

export function useMyRooms() {
  const [rooms, setRooms] = useState<RoomSummary[]>([])
  const [loading, setLoading] = useState(API_MODE)

  const reload = useCallback(async () => {
    if (!API_MODE) return
    try {
      const result = await apiGet<{ rooms: RoomSummary[] }>('/study-rooms/mine')
      setRooms(result.rooms)
    } catch {
      setRooms([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void reload() }, [reload])
  return { rooms, loading, reload }
}

/**
 * One room, re-read while it is still open.
 *
 * Polling stops once the room closes: there is nothing further to learn, and a
 * finished test should not keep a request running every four seconds.
 */
export function useRoom(roomId: string | null) {
  const [room, setRoom] = useState<StudyRoom | null>(null)
  const [error, setError] = useState('')
  const statusRef = useRef<StudyRoom['status'] | null>(null)

  const load = useCallback(async () => {
    if (!roomId || !API_MODE) return
    try {
      const result = await apiGet<{ room: StudyRoom }>(`/study-rooms/${encodeURIComponent(roomId)}`)
      setRoom(result.room)
      statusRef.current = result.room.status
      setError('')
    } catch {
      setError('That shared test could not be loaded.')
    }
  }, [roomId])

  useEffect(() => {
    if (!roomId || !API_MODE) return
    void load()
    const timer = window.setInterval(() => {
      if (statusRef.current === 'closed') return
      void load()
    }, POLL_MS)
    return () => window.clearInterval(timer)
  }, [load, roomId])

  return { room, error, reload: load, setRoom }
}

export function useStudyRoomActions() {
  const create = useCallback(
    (input: {
      name: string
      questionIds: string[]
      timed: boolean
      secondsPerQuestion: number | null
      /** Seated in the room at creation, so it opens with a friend already in it — no code needed. */
      inviteUserIds?: string[]
    }) => apiPost<{ ok: boolean; reason?: string; room?: StudyRoom }>('/study-rooms', input),
    [],
  )
  const join = useCallback(
    (code: string) => apiPost<{ ok: boolean; reason?: string; room?: StudyRoom }>('/study-rooms/join', { code }),
    [],
  )
  const start = useCallback(
    (roomId: string) => apiPost<{ ok: boolean; reason?: string; room?: StudyRoom }>(`/study-rooms/${encodeURIComponent(roomId)}/start`),
    [],
  )
  const answer = useCallback(
    (roomId: string, input: { questionId: string; chosenIndex: number; seconds: number | null }) =>
      apiPost<{ ok: boolean; reason?: string; correct?: boolean; correctIndex?: number }>(`/study-rooms/${encodeURIComponent(roomId)}/answers`, input),
    [],
  )
  const finish = useCallback(
    (roomId: string) => apiPost<{ ok: boolean; room?: StudyRoom }>(`/study-rooms/${encodeURIComponent(roomId)}/finish`),
    [],
  )
  return { create, join, start, answer, finish }
}
