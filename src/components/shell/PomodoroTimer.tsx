import { useEffect, useRef, useState } from 'react'
import { Bell, BellOff, Pause, Play, RotateCcw, SkipForward, TimerReset, Volume2, VolumeX, X } from 'lucide-react'
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
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const lastCompletedRef = useRef<number | null>(null)
  const current = normalizeState(state)
  const progress = 1 - (current.remainingSeconds / DURATION[current.mode])

  useEffect(() => {
    setState((stored) => resolveState(stored))
  }, [setState])

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

  useEffect(() => {
    function close(event: MouseEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    function key(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', key)
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', key) }
  }, [])

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

  function selectMode(mode: Mode) {
    setState((stored) => ({
      ...normalizeState(stored),
      mode,
      remainingSeconds: DURATION[mode],
      running: false,
      updatedAt: Date.now(),
      completedAt: null,
      completedMode: null,
    }))
  }

  return (
    <div ref={root} className="relative" aria-label={t('Pomodoro timer')}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={t('Pomodoro timer')}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          'relative inline-flex size-11 items-center justify-center rounded-md text-ink-2 transition-colors hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:size-9',
          open && 'bg-inset text-ink',
        )}
      >
        <Icon icon={TimerReset} size={17} />
        {current.running && <span className="absolute end-1.5 top-1.5 size-1.5 rounded-full bg-primary ring-2 ring-paper" />}
      </button>

      {open && (
        <div role="dialog" aria-label={t('Pomodoro timer')} className="animate-pop fixed inset-x-2 top-[calc(3.75rem+env(safe-area-inset-top))] z-50 overflow-hidden rounded-xl border border-line bg-surface shadow-pop sm:absolute sm:inset-x-auto sm:end-0 sm:top-[calc(100%+0.5rem)] sm:w-[min(20rem,calc(100vw-1rem))]">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div>
              <p className="text-[13.5px] font-semibold text-ink">{t('Focus timer')}</p>
              <p className="mt-0.5 text-[10.5px] text-ink-3">{t('Work in calm, deliberate blocks.')}</p>
            </div>
            <button type="button" className="grid size-9 place-items-center rounded-md text-ink-3 transition-colors hover:bg-inset hover:text-ink" aria-label={t('Close')} onClick={() => setOpen(false)}>
              <Icon icon={X} size={16} />
            </button>
          </div>

          <div className="p-4">
            <div className="grid place-items-center py-1">
              <div className="relative grid size-32 place-items-center">
                <svg viewBox="0 0 120 120" className="absolute inset-0 size-full -rotate-90" aria-hidden>
                  <circle cx="60" cy="60" r="54" fill="none" stroke="var(--color-inset)" strokeWidth="5" />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    pathLength="1"
                    strokeDasharray="1"
                    strokeDashoffset={1 - Math.max(0, Math.min(1, progress))}
                    className="transition-[stroke-dashoffset] duration-500 ease-[var(--ease-out-quint)] motion-reduce:transition-none"
                  />
                </svg>
                <span className="text-center">
                  <span className="block text-[9.5px] font-bold uppercase tracking-[0.08em] text-ink-3">{t(LABEL[current.mode])}</span>
                  <span className="tnum mt-1 block font-mono text-[27px] font-semibold tracking-[-0.035em] text-ink">{format(current.remainingSeconds)}</span>
                </span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-1 rounded-lg bg-surface-2/65 p-1">
              {(Object.keys(DURATION) as Mode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  aria-pressed={current.mode === mode}
                  onClick={() => selectMode(mode)}
                  className={cn(
                    'min-h-9 rounded-md px-2 text-[10.5px] font-semibold transition-[background-color,color,box-shadow,transform] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary',
                    current.mode === mode ? 'bg-surface text-ink shadow-control' : 'text-ink-3 hover:text-ink',
                  )}
                >
                  {t(LABEL[mode])}
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-1.5">
              <IconButton icon={RotateCcw} label={t('Reset this block')} onClick={reset} />
              <IconButton icon={current.running ? Pause : Play} label={current.running ? t('Pause timer') : t('Start timer')} variant="primary" onClick={startPause} />
              <IconButton icon={SkipForward} label={t('Skip to the next block')} onClick={skip} />
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-line bg-surface-2/40 px-3 py-2.5">
            <p className="text-[10.5px] text-ink-3">{current.focusCycles} {t('focus blocks completed')}</p>
            <div className="flex items-center gap-0.5">
              <IconButton icon={sound ? Volume2 : VolumeX} label={sound ? t('Turn sound off') : t('Turn sound on')} size="sm" active={sound} onClick={() => setSound((value) => !value)} />
              <IconButton icon={notify ? Bell : BellOff} label={notify ? t('Notifications on') : t('Notifications off')} size="sm" active={notify} onClick={() => void toggleNotifications()} />
            </div>
          </div>
        </div>
      )}
      <span className="sr-only" aria-live="polite">{t(LABEL[current.mode])}, {Math.round(Math.max(0, Math.min(1, progress)) * 100)}%</span>
    </div>
  )
}
