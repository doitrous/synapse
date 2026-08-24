import { useEffect, useMemo, useRef } from 'react'
import { Bell, BellOff, Pause, Play, RotateCcw, SkipForward, TimerReset } from 'lucide-react'
import { Button } from '@/components/ui/Button'
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
  return { mode: 'focus', remainingSeconds: DURATION.focus, running: false, focusCycles: 0, updatedAt: Date.now() }
}

function nextState(current: PomodoroState): PomodoroState {
  if (current.mode === 'focus') {
    const cycles = current.focusCycles + 1
    const mode: Mode = cycles % 4 === 0 ? 'long' : 'short'
    return { mode, remainingSeconds: DURATION[mode], running: false, focusCycles: cycles, updatedAt: Date.now() }
  }
  return { mode: 'focus', remainingSeconds: DURATION.focus, running: false, focusCycles: current.focusCycles, updatedAt: Date.now() }
}

function resolveState(stored: PomodoroState): PomodoroState {
  if (!stored.running) return stored
  const elapsed = Math.max(0, Math.floor((Date.now() - stored.updatedAt) / 1000))
  const remaining = stored.remainingSeconds - elapsed
  if (remaining > 0) return { ...stored, remainingSeconds: remaining, updatedAt: Date.now() }
  return nextState({ ...stored, remainingSeconds: 0, running: false, updatedAt: Date.now() })
}

function format(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const rest = seconds % 60
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
  const lastCompletedRef = useRef<number | null>(null)
  const hydrated = useMemo(() => resolveState(state), [])
  const progress = 1 - (state.remainingSeconds / DURATION[state.mode])

  useEffect(() => setState(hydrated), [])

  useEffect(() => {
    if (!state.running) return
    const timer = window.setInterval(() => {
      setState((current) => {
        const next = resolveState(current)
        if (next.remainingSeconds <= 0) return nextState(next)
        return { ...next, remainingSeconds: Math.max(0, next.remainingSeconds - 1), updatedAt: Date.now() }
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [setState, state.running])

  useEffect(() => {
    const completed = state.remainingSeconds === DURATION[state.mode] && !state.running ? state.updatedAt : null
    if (!completed || completed === lastCompletedRef.current) return
    lastCompletedRef.current = completed
    if (sound) chime()
    if (notify && 'Notification' in window && Notification.permission === 'granted') {
      const body = state.mode === 'focus' ? t('Break time is ready.') : t('Your next focus block is ready.')
      new Notification(t('Pomodoro timer'), { body })
    }
  }, [notify, sound, state.mode, state.remainingSeconds, state.running, state.updatedAt, t])

  async function toggleNotifications() {
    if (!notify && 'Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') return
    }
    setNotify((current) => !current)
  }

  function startPause() {
    setState((current) => ({ ...resolveState(current), running: !current.running, updatedAt: Date.now() }))
  }

  function reset() {
    setState((current) => ({ ...current, remainingSeconds: DURATION[current.mode], running: false, updatedAt: Date.now() }))
  }

  function skip() {
    setState((current) => nextState({ ...resolveState(current), running: false }))
  }

  return (
    <div className="hidden items-center gap-1 rounded-xl border border-line bg-surface-2/65 p-1 shadow-panel md:flex" aria-label={t('Pomodoro timer')}>
      <div className="flex min-w-[8.5rem] items-center gap-2 px-2">
        <span className="relative grid size-7 place-items-center rounded-full bg-surface text-primary-strong">
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ background: `conic-gradient(var(--color-primary) ${Math.max(0, Math.min(1, progress)) * 360}deg, transparent 0deg)` }}
          />
          <span className="absolute inset-[3px] rounded-full bg-surface" />
          <Icon icon={TimerReset} size={14} className="relative" />
        </span>
        <span className="min-w-0">
          <span className="block text-[10px] font-bold uppercase tracking-[0.06em] text-ink-3">{t(LABEL[state.mode])}</span>
          <span className="tnum block font-mono text-[13px] font-semibold text-ink">{format(state.remainingSeconds)}</span>
        </span>
      </div>
      <IconButton icon={state.running ? Pause : Play} label={state.running ? t('Pause timer') : t('Start timer')} size="sm" variant={state.running ? 'surface' : 'primary'} onClick={startPause} />
      <IconButton icon={RotateCcw} label={t('Reset this block')} size="sm" onClick={reset} />
      <IconButton icon={SkipForward} label={t('Skip to the next block')} size="sm" onClick={skip} />
      <IconButton icon={notify ? Bell : BellOff} label={notify ? t('Notifications on') : t('Notifications off')} size="sm" active={notify} onClick={() => void toggleNotifications()} />
      <Button
        type="button"
        size="sm"
        variant={sound ? 'secondary' : 'ghost'}
        className={cn('h-8 px-2 text-[11.5px]', sound && 'text-primary-strong')}
        onClick={() => setSound((current) => !current)}
      >
        {sound ? t('Sound') : t('Silent')}
      </Button>
    </div>
  )
}
