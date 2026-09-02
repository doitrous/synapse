import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { API_MODE, apiPost } from '@/lib/api'
import { MARISTANA_PROGRESS_EVENT } from '@/lib/useMaristanas'

const ACTIVE_FOR_MS = 3 * 60_000
const HEARTBEAT_MS = 60_000

const STUDY_SURFACES = new Set([
  'library', 'qbank', 'adaptive', 'resources', 'taxonomy', 'practical', 'essays',
  'flashcards', 'minigames', 'term-grid', 'spotter', 'term-match',
  'clinical-sequence', 'mechanism-chain', 'red-flag-sort', 'whiteboard', 'notebook',
  'study-together',
  // The renamed and new destinations, each beside the surface it replaces:
  // `terminology` is `taxonomy`, `study-rooms` is `study-together`, and the
  // four hubs are where the study surfaces above are now reached from. Both
  // names of a renamed route stay in the set — a minute on the old URL is the
  // same minute of study as one on the new one.
  'terminology', 'study-rooms', 'plan', 'learn', 'practice', 'revise',
])

function sessionId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `study-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

/**
 * Records active learning minutes without turning "an open tab" into study.
 * A minute is eligible only on a study surface, while the document is visible,
 * and within three minutes of a real keyboard, pointer, touch, or scroll event.
 * The server's per-minute unique key is the final duplicate/replay guard.
 */
export function StudyActivityTracker() {
  const { pathname } = useLocation()
  const lastActive = useRef(Date.now())
  const studySession = useRef(sessionId())
  const section = pathname.split('/')[2] ?? ''

  useEffect(() => {
    lastActive.current = Date.now()
    studySession.current = sessionId()
  }, [section])

  useEffect(() => {
    if (!API_MODE) return
    const markActive = () => { lastActive.current = Date.now() }
    const events: Array<keyof WindowEventMap> = ['keydown', 'pointerdown', 'touchstart', 'scroll']
    for (const event of events) window.addEventListener(event, markActive, { passive: true })

    const timer = window.setInterval(() => {
      if (!STUDY_SURFACES.has(section)) return
      if (document.visibilityState !== 'visible') return
      if (Date.now() - lastActive.current > ACTIVE_FOR_MS) return
      const bucket = Math.floor(Date.now() / 60_000)
      void apiPost<{ accepted: boolean }>('/maristanas/study-heartbeat', {
        bucket,
        sessionId: studySession.current,
        surface: section,
      }).then((result) => {
        if (result.accepted) window.dispatchEvent(new Event(MARISTANA_PROGRESS_EVENT))
      }).catch(() => undefined)
    }, HEARTBEAT_MS)

    return () => {
      window.clearInterval(timer)
      for (const event of events) window.removeEventListener(event, markActive)
    }
  }, [section])

  return null
}
