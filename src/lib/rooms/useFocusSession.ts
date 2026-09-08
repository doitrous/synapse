import { useCallback, useEffect, useState } from 'react'
import { elapsedMs, newFocusSession, type FocusSession, type StudyStatus } from './studyWorld'

/** Provider-owned clock: elapsed time is derived from timestamps, never interval counts. */
export function useFocusSession() {
  const [focus, setFocus] = useState<FocusSession>(() => newFocusSession())
  const [now, setNow] = useState(Date.now)
  useEffect(() => {
    if (focus.startedAt === null) return
    const update = () => setNow(Date.now())
    update()
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [focus.startedAt])
  const elapsed = elapsedMs(focus, now)
  useEffect(() => {
    if (focus.startedAt !== null && elapsed >= focus.durationMinutes * 60000) {
      setFocus(current => ({ ...current, startedAt: null, accumulatedMs: current.durationMinutes * 60000, completed: true }))
    }
  }, [elapsed, focus.startedAt, focus.durationMinutes])
  const patch = useCallback((next: Partial<FocusSession>) => setFocus(current => ({ ...current, ...next })), [])
  const toggleTimer = useCallback(() => {
    const time = Date.now()
    setNow(time)
    setFocus(current => current.startedAt !== null
      ? { ...current, accumulatedMs: elapsedMs(current,time), startedAt: null }
      : { ...current, startedAt: time, status: current.status==='On Break'?'Focusing':current.status, completed: false, accumulatedMs: current.completed ? 0 : current.accumulatedMs })
  }, [])
  const setStatus = useCallback((status: StudyStatus) => {
    setFocus(current => ({ ...current, status, ...(status === 'On Break' ? { accumulatedMs: elapsedMs(current,Date.now()), startedAt: null } : {}) }))
  }, [])
  const reset = useCallback((minutes = 25) => { setFocus(newFocusSession(minutes)); setNow(Date.now()) }, [])
  return { focus, elapsed, patch, toggleTimer, setStatus, reset }
}
export type FocusSessionController = ReturnType<typeof useFocusSession>
