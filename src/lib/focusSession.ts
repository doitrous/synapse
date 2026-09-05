/**
 * The Focus Timer's session state machine — the reference logic the iOS and
 * Android ports mirror. Deliberately dependency-free (no React, no browser
 * API) so it reads as one self-contained model and runs under plain
 * `node --test`; `useFocusSession.ts` is the only place it meets the DOM.
 */

export type FocusMode = 'countdown' | 'countup'

export interface FocusSessionState {
  mode: FocusMode
  /** Countdown target length. Irrelevant in count-up, but kept rather than
   *  dropped so switching back to countdown restores the student's last pick. */
  durationSeconds: number
  /** Countdown only — clamped to `[0, durationSeconds]`. */
  remainingSeconds: number
  /** Count-up only — seconds counted since the block started. */
  elapsedSeconds: number
  running: boolean
  strictArmed: boolean
  selectedTaskId: string | null
  /** Wall clock the fields above were last accurate at. `tick` catches up from
   *  here, so a closed panel, a backgrounded tab, or a reload all resume at the
   *  right second instead of freezing at the last write. */
  updatedAt: number
  /** Set the moment a countdown reaches zero on its own; cleared by any user
   *  action (start, reset, mode/duration change). Null in count-up. */
  completedAt: number | null
}

export const DEFAULT_DURATION_MINUTES = 25
export const DURATION_PRESETS_MINUTES = [25, 50] as const
export const MIN_DURATION_MINUTES = 5
export const MAX_DURATION_MINUTES = 180

export function clampDurationMinutes(minutes: number): number {
  if (!Number.isFinite(minutes)) return DEFAULT_DURATION_MINUTES
  return Math.min(MAX_DURATION_MINUTES, Math.max(MIN_DURATION_MINUTES, Math.round(minutes)))
}

export function initialFocusSession(now: number = Date.now()): FocusSessionState {
  const durationSeconds = DEFAULT_DURATION_MINUTES * 60
  return {
    mode: 'countdown',
    durationSeconds,
    remainingSeconds: durationSeconds,
    elapsedSeconds: 0,
    running: false,
    strictArmed: false,
    selectedTaskId: null,
    updatedAt: now,
    completedAt: null,
  }
}

/** Seconds actually spent working this block — what credits study time. */
export function accruedSeconds(state: FocusSessionState): number {
  return state.mode === 'countdown' ? state.durationSeconds - state.remainingSeconds : state.elapsedSeconds
}

/**
 * Catches a persisted state up to `now`. Pure, and safe to call on every
 * render: idle state is returned untouched, so calling it speculatively costs
 * nothing.
 */
export function tick(state: FocusSessionState, now: number = Date.now()): FocusSessionState {
  if (!state.running) return state
  const elapsed = Math.max(0, Math.floor((now - state.updatedAt) / 1000))
  if (elapsed <= 0) return state
  if (state.mode === 'countup') {
    return { ...state, elapsedSeconds: state.elapsedSeconds + elapsed, updatedAt: now }
  }
  const remaining = state.remainingSeconds - elapsed
  if (remaining > 0) return { ...state, remainingSeconds: remaining, updatedAt: now }
  return { ...state, remainingSeconds: 0, running: false, updatedAt: now, completedAt: now }
}

export function setMode(state: FocusSessionState, mode: FocusMode, now: number = Date.now()): FocusSessionState {
  if (state.mode === mode) return state
  return mode === 'countdown'
    ? { ...state, mode, remainingSeconds: state.durationSeconds, running: false, updatedAt: now, completedAt: null }
    : { ...state, mode, elapsedSeconds: 0, running: false, updatedAt: now, completedAt: null }
}

export function setDurationMinutes(state: FocusSessionState, minutes: number, now: number = Date.now()): FocusSessionState {
  const durationSeconds = clampDurationMinutes(minutes) * 60
  return { ...state, durationSeconds, remainingSeconds: durationSeconds, running: false, updatedAt: now, completedAt: null }
}

export function start(state: FocusSessionState, now: number = Date.now()): FocusSessionState {
  const caught = tick(state, now)
  if (caught.running) return caught
  // Starting again after a countdown finished restarts the block rather than
  // leaving "Start" dead at 0:00.
  const remainingSeconds = caught.mode === 'countdown' && caught.remainingSeconds <= 0 ? caught.durationSeconds : caught.remainingSeconds
  return { ...caught, running: true, remainingSeconds, updatedAt: now, completedAt: null }
}

export function pause(state: FocusSessionState, now: number = Date.now()): FocusSessionState {
  return { ...tick(state, now), running: false, updatedAt: now }
}

export function reset(state: FocusSessionState, now: number = Date.now()): FocusSessionState {
  return { ...state, remainingSeconds: state.durationSeconds, elapsedSeconds: 0, running: false, updatedAt: now, completedAt: null }
}

export function selectTask(state: FocusSessionState, taskId: string | null): FocusSessionState {
  return { ...state, selectedTaskId: taskId }
}

export function setStrictArmed(state: FocusSessionState, strictArmed: boolean): FocusSessionState {
  return { ...state, strictArmed }
}

/**
 * Strict mode's penalty for leaving: the running block is thrown away exactly
 * as a manual reset would, rather than quietly paused and resumable. Whatever
 * whole minutes already reached the server via the study-heartbeat stay
 * credited — this only stops the block from counting as finished.
 */
export function discard(state: FocusSessionState, now: number = Date.now()): FocusSessionState {
  return reset(state, now)
}

export function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds))
  const hours = Math.floor(safe / 3600)
  const minutes = Math.floor((safe % 3600) / 60)
  const seconds = safe % 60
  if (hours > 0) return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}
