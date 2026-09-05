import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { useLocalJsonPreference } from './useLocalPreference'
import { API_MODE, apiPost } from './api'
import { MARISTANA_PROGRESS_EVENT } from './useMaristanas'
import {
  accruedSeconds, discard, initialFocusSession, pause, reset, selectTask, setDurationMinutes as setDurationMinutesPure,
  setMode as setModePure, setStrictArmed as setStrictArmedPure, start, tick, type FocusMode, type FocusSessionState,
} from './focusSession'

export {
  DEFAULT_DURATION_MINUTES, DURATION_PRESETS_MINUTES, MAX_DURATION_MINUTES, MIN_DURATION_MINUTES,
  accruedSeconds, formatClock, type FocusMode, type FocusSessionState,
} from './focusSession'

const STORAGE_KEY = 'nishany.focusTimer.session.v1'
/** Grace window strict mode gives a student who alt-tabs or glances at a
 *  notification before the running block is thrown away. */
const STRICT_GRACE_MS = 15_000
const HEARTBEAT_MS = 60_000
const HEARTBEAT_SURFACE = 'focus-timer'

function newSessionId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `focus-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

/**
 * The Focus Timer's live session: persisted across a reload in localStorage
 * (device-local, like the Pomodoro clock — never synced, so two tabs don't
 * fight), ticking once a second while running, and crediting study time
 * through the exact endpoint `StudyActivityTracker` already uses for every
 * other study surface (`POST /maristanas/study-heartbeat`) — the same table
 * feeds both the Performance page's study minutes and Build Maristanas, so
 * one heartbeat genuinely is the one path for both, not two currencies.
 *
 * ponytail: the heartbeat only fires once a minute, matching
 * `StudyActivityTracker`'s own granularity — the last partial minute before a
 * stop or discard is not flushed. Same tradeoff the rest of the app already
 * accepts; revisit only if students notice the last minute going missing.
 */
export function useFocusSession() {
  const [stored, setStored] = useLocalJsonPreference<FocusSessionState>(STORAGE_KEY, initialFocusSession)
  const [, forceTick] = useReducer((n: number) => n + 1, 0)
  const current = tick(stored)

  // The display advances every second while running; `tick` always re-derives
  // from wall time on read, so nothing but a re-render is needed in between.
  useEffect(() => {
    if (!current.running) return
    const id = window.setInterval(forceTick, 1000)
    return () => window.clearInterval(id)
  }, [current.running])

  // A countdown reaching zero is a real transition (running flips, completedAt
  // is stamped) and has to be written back, not just displayed — and so does
  // every tick's progress, in *either* mode, or a refresh mid count-up block
  // would resume from whatever was last written (often 0) instead of where the
  // student actually was.
  useEffect(() => {
    if (
      current.running !== stored.running
      || current.completedAt !== stored.completedAt
      || current.remainingSeconds !== stored.remainingSeconds
      || current.elapsedSeconds !== stored.elapsedSeconds
    ) {
      setStored(current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current.running, current.completedAt, current.remainingSeconds, current.elapsedSeconds])

  const mutate = useCallback((fn: (state: FocusSessionState) => FocusSessionState) => setStored((s) => fn(tick(s))), [setStored])

  const setModeAction = useCallback((mode: FocusMode) => mutate((s) => setModePure(s, mode)), [mutate])
  const setDurationAction = useCallback((minutes: number) => mutate((s) => setDurationMinutesPure(s, minutes)), [mutate])
  const toggleRunning = useCallback(() => mutate((s) => (s.running ? pause(s) : start(s))), [mutate])
  const resetAction = useCallback(() => mutate(reset), [mutate])
  const selectTaskAction = useCallback((taskId: string | null) => mutate((s) => selectTask(s, taskId)), [mutate])
  const setStrictAction = useCallback((armed: boolean) => mutate((s) => setStrictArmedPure(s, armed)), [mutate])
  const discardAction = useCallback(() => mutate(discard), [mutate])

  // One id per run: a fresh block gets a fresh session id, matching how
  // `StudyActivityTracker` mints one per study surface visit. Pause/resume of
  // the *same* block keeps its id — the server dedupes by minute anyway.
  const sessionIdRef = useRef(newSessionId())
  const wasRunning = useRef(current.running)
  useEffect(() => {
    if (current.running && !wasRunning.current) sessionIdRef.current = newSessionId()
    wasRunning.current = current.running
  }, [current.running])

  useEffect(() => {
    if (!API_MODE || !current.running) return
    const beat = () => {
      const bucket = Math.floor(Date.now() / 60_000)
      void apiPost<{ accepted: boolean }>('/maristanas/study-heartbeat', {
        bucket,
        sessionId: sessionIdRef.current,
        surface: HEARTBEAT_SURFACE,
      }).then((result) => {
        if (result.accepted) window.dispatchEvent(new Event(MARISTANA_PROGRESS_EVENT))
      }).catch(() => undefined)
    }
    beat()
    const id = window.setInterval(beat, HEARTBEAT_MS)
    return () => window.clearInterval(id)
  }, [current.running])

  // Strict mode: leaving the tab/window arms a 15s countdown; coming back
  // clears it, letting it run out discards the block. Native `beforeunload`
  // covers closing the tab or navigating the address bar — the closest a web
  // page can come to "prohibit exit". OS-level app-blocking and flip-phone
  // detection (iOS FamilyControls / CoreMotion) are the native ports' job.
  const [strictDeadline, setStrictDeadline] = useState<number | null>(null)

  useEffect(() => {
    if (!current.strictArmed || !current.running) { setStrictDeadline(null); return }
    const arm = () => setStrictDeadline(Date.now() + STRICT_GRACE_MS)
    const clear = () => setStrictDeadline(null)
    const onVisibility = () => (document.visibilityState === 'hidden' ? arm() : clear())
    window.addEventListener('blur', arm)
    window.addEventListener('focus', clear)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('blur', arm)
      window.removeEventListener('focus', clear)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [current.strictArmed, current.running])

  useEffect(() => {
    if (strictDeadline == null) return
    const remaining = strictDeadline - Date.now()
    if (remaining <= 0) { discardAction(); setStrictDeadline(null); return }
    const id = window.setTimeout(() => { discardAction(); setStrictDeadline(null) }, remaining)
    return () => window.clearTimeout(id)
  }, [strictDeadline, discardAction])

  useEffect(() => {
    if (!current.strictArmed || !current.running) return
    const onBeforeUnload = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = '' }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [current.strictArmed, current.running])

  return {
    state: current,
    accruedSeconds: accruedSeconds(current),
    strictWarningSecondsLeft: strictDeadline == null ? null : Math.max(0, Math.ceil((strictDeadline - Date.now()) / 1000)),
    setMode: setModeAction,
    setDurationMinutes: setDurationAction,
    toggleRunning,
    reset: resetAction,
    selectTask: selectTaskAction,
    setStrictArmed: setStrictAction,
    discard: discardAction,
  }
}

export type FocusSessionEngine = ReturnType<typeof useFocusSession>
