import { useEffect, useRef, useState } from 'react'
import { Bell, BellOff, Pause, Play, RotateCcw, SkipForward, TimerReset, Volume2, VolumeX } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { IconButton } from '@/components/ui/IconButton'
import { cn } from '@/lib/cn'
import { useLocalJsonPreference, useLocalPreference } from '@/lib/useLocalPreference'
import { useT } from '@/lib/i18n'

type Mode = 'focus' | 'short' | 'long'

interface PomodoroState {
  mode: Mode
  remainingSeconds: number
  running: boolean
  focusCycles: number
  updatedAt: number
  completedAt: number | null
  completedMode: Mode | null
}

type StoredPomodoroState = Partial<PomodoroState> & {
  remaining?: number
  completedFocus?: number
  lastTick?: number | null
}

const DURATION: Record<Mode, number> = {
  focus: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
}

const LABEL: Record<Mode, string> = {
  focus: 'Focus',
  short: 'Short break',
  long: 'Long break',
}

const STORAGE_KEY = 'synapse.shell.pomodoro.v1'

function initialState(): PomodoroState {
  return {
    mode: 'focus',
    remainingSeconds: DURATION.focus,
    running: false,
    focusCycles: 0,
    updatedAt: Date.now(),
    completedAt: null,
    completedMode: null,
  }
}

function validMode(mode: unknown): mode is Mode {
  return mode === 'focus' || mode === 'short' || mode === 'long'
}

function normalizeState(stored: StoredPomodoroState): PomodoroState {
  const mode = validMode(stored.mode) ? stored.mode : 'focus'
  const remaining = typeof stored.remainingSeconds === 'number'
    ? stored.remainingSeconds
    : typeof stored.remaining === 'number'
      ? stored.remaining
      : DURATION[mode]

  return {
    mode,
    remainingSeconds: Math.max(0, Math.min(DURATION[mode], Math.floor(remaining))),
    running: stored.running === true,
    focusCycles: typeof stored.focusCycles === 'number' ? stored.focusCycles : stored.completedFocus ?? 0,
    updatedAt: typeof stored.updatedAt === 'number' ? stored.updatedAt : stored.lastTick ?? Date.now(),
    completedAt: typeof stored.completedAt === 'number' ? stored.completedAt : null,
    completedMode: validMode(stored.completedMode) ? stored.completedMode : null,
  }
}

function nextState(current: PomodoroState, completed = false): PomodoroState {
  if (current.mode === 'focus') {
    const cycles = current.focusCycles + 1
    const mode: Mode = cycles % 4 === 0 ? 'long' : 'short'
    return {
      mode,
      remainingSeconds: DURATION[mode],
      running: false,
      focusCycles: cycles,
      updatedAt: Date.now(),
      completedAt: completed ? Date.now() : null,
      completedMode: completed ? current.mode : null,
    }
  }
  return {
    mode: 'focus',
    remainingSeconds: DURATION.focus,
    running: false,
    focusCycles: current.focusCycles,
    updatedAt: Date.now(),
    completedAt: completed ? Date.now() : null,
    completedMode: completed ? current.mode : null,
  }
}

function resolveState(stored: StoredPomodoroState): PomodoroState {
  const state = normalizeState(stored)
  if (!state.running) return state
  const elapsed = Math.max(0, Math.floor((Date.now() - state.updatedAt) / 1000))
  if (elapsed <= 0) return state
  const remaining = state.remainingSeconds - elapsed
  if (remaining > 0) return { ...state, remainingSeconds: remaining, updatedAt: Date.now() }
  return nextState({ ...state, remainingSeconds: 0, running: false, updatedAt: Date.now() }, true)
}

function format(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds))
  const minutes = Math.floor(safe / 60)
  const rest = safe % 60
  return `${minutes}:${rest.toString().padStart(2, '0')}`
}

function chime() {
  const AudioContextCtor: typeof window.AudioContext | undefined = window.AudioContext
    || (window as Window & { webkitAudioContext?: typeof window.AudioContext }).webkitAudioContext
  if (!AudioContextCtor) return
  const audio = new AudioContextCtor()
  const oscillator = audio.createOscillator()
  const gain = audio.createGain()
  oscillator.type = 'sine'
  oscillator.frequency.value = 660
  gain.gain.value = 0.001
  oscillator.connect(gain)
  gain.connect(audio.destination)
  oscillator.start()
  gain.gain.exponentialRampToValueAtTime(0.12, audio.currentTime + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.35)
  window.setTimeout(() => {
    oscillator.stop()
    void audio.close()
  }, 420)
}

export function PomodoroTimer() {
  const t = useT()
  const [state, setState] = useLocalJsonPreference<PomodoroState>(STORAGE_KEY, initialState)
  const [sound, setSound] = useLocalPreference('synapse.shell.pomodoro.sound', false)
  const [notify, setNotify] = useLocalPreference('synapse.shell.pomodoro.notify', false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const lastCompletedRef = useRef<number | null>(null)
  const current = normalizeState(state)
  const progress = 1 - (current.remainingSeconds / DURATION[current.mode])

  useEffect(() => {
    setState((stored) => resolveState(stored))
  }, [setState])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!current.running) return
    const timer = window.setInterval(() => {
      setState((stored) => resolveState(stored))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [current.running, setState])

  useEffect(() => {
    if (!current.completedAt || current.completedAt === lastCompletedRef.current) return
    lastCompletedRef.current = current.completedAt
    if (sound) chime()
    if (notify && 'Notification' in window && Notification.permission === 'granted') {
      const body = current.completedMode === 'focus' ? t('Break time is ready.') : t('Your next focus block is ready.')
      new Notification(t('Pomodoro timer'), { body })
    }
  }, [current.completedAt, current.completedMode, notify, sound, t])

  async function toggleNotifications() {
    if (!notify && 'Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') return
    }
    setNotify((value) => !value)
  }

  function startPause() {
    setState((stored) => {
      const resolved = resolveState(stored)
      return { ...resolved, running: !resolved.running, updatedAt: Date.now() }
    })
  }

  function reset() {
    setState((stored) => {
      const resolved = normalizeState(stored)
      return { ...resolved, remainingSeconds: DURATION[resolved.mode], running: false, updatedAt: Date.now(), completedAt: null, completedMode: null }
    })
  }

  function skip() {
    setState((stored) => nextState({ ...resolveState(stored), running: false }, false))
  }

  return (
    <div className="hidden items-center gap-1 rounded-xl border border-line bg-surface-2/65 p-1 shadow-panel md:flex" aria-label={t('Pomodoro timer')}>
      <div className="flex min-w-[8.5rem] items-center gap-2 px-2">
        <span className={cn('relative grid size-7 place-items-center rounded-full bg-surface text-primary-strong', current.running && !reducedMotion && 'animate-pulse')}>
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ background: `conic-gradient(var(--color-primary) ${Math.max(0, Math.min(1, progress)) * 360}deg, transparent 0deg)` }}
          />
          <span className="absolute inset-[3px] rounded-full bg-surface" />
          <Icon icon={TimerReset} size={14} className="relative" />
        </span>
        <span className="min-w-0">
          <span className="block text-[10px] font-bold uppercase tracking-[0.06em] text-ink-3">{t(LABEL[current.mode])}</span>
          <span className="tnum block font-mono text-[13px] font-semibold text-ink">{format(current.remainingSeconds)}</span>
        </span>
      </div>
      <IconButton icon={current.running ? Pause : Play} label={current.running ? t('Pause timer') : t('Start timer')} size="sm" variant={current.running ? 'surface' : 'primary'} onClick={startPause} />
      <IconButton icon={RotateCcw} label={t('Reset this block')} size="sm" onClick={reset} />
      <IconButton icon={SkipForward} label={t('Skip to the next block')} size="sm" onClick={skip} />
      <IconButton icon={sound ? Volume2 : VolumeX} label={sound ? t('Turn sound off') : t('Turn sound on')} size="sm" active={sound} onClick={() => setSound((value) => !value)} />
      <IconButton icon={notify ? Bell : BellOff} label={notify ? t('Notifications on') : t('Notifications off')} size="sm" active={notify} onClick={() => void toggleNotifications()} />
      <span className="sr-only" aria-live="polite">{t(LABEL[current.mode])}, {Math.round(Math.max(0, Math.min(1, progress)) * 100)}%</span>
    </div>
  )
}
