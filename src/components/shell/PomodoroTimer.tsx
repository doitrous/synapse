import { useEffect, useMemo, useState } from 'react'
import { Bell, BellOff, Pause, Play, RotateCcw, SkipForward, Timer, Volume2, VolumeX } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { Tooltip } from '@/components/ui/Tooltip'
import { cn } from '@/lib/cn'
import { useLocalJsonPreference, useLocalPreference } from '@/lib/useLocalPreference'
import { useT } from '@/lib/i18n'

type Mode = 'focus' | 'short' | 'long'

const DURATIONS: Record<Mode, number> = { focus: 25 * 60, short: 5 * 60, long: 15 * 60 }

interface TimerState {
  mode: Mode
  remaining: number
  running: boolean
  completedFocus: number
  lastTick: number | null
}

const DEFAULT_STATE: TimerState = {
  mode: 'focus',
  remaining: DURATIONS.focus,
  running: false,
  completedFocus: 0,
  lastTick: null,
}

function labelFor(mode: Mode): string {
  if (mode === 'focus') return 'Focus'
  if (mode === 'short') return 'Short break'
  return 'Long break'
}

function formatTime(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds))
  const minutes = Math.floor(safe / 60)
  const rest = safe % 60
  return `${minutes}:${String(rest).padStart(2, '0')}`
}

function nextState(state: TimerState): TimerState {
  if (state.mode !== 'focus') return { ...state, mode: 'focus', remaining: DURATIONS.focus, running: false, lastTick: null }
  const completedFocus = state.completedFocus + 1
  const mode: Mode = completedFocus % 4 === 0 ? 'long' : 'short'
  return { mode, remaining: DURATIONS[mode], running: false, completedFocus, lastTick: null }
}

export function PomodoroTimer() {
  const t = useT()
  const [state, setState] = useLocalJsonPreference<TimerState>('synapse.shell.pomodoro.v1', DEFAULT_STATE)
  const [sound, setSound] = useLocalPreference('synapse.shell.pomodoro.sound', false)
  const [notify, setNotify] = useLocalPreference('synapse.shell.pomodoro.notify', false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const progress = useMemo(() => 1 - state.remaining / DURATIONS[state.mode], [state.mode, state.remaining])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!state.running) return
    const tick = window.setInterval(() => {
      setState((current) => {
        if (!current.running) return current
        const now = Date.now()
        const elapsed = current.lastTick ? Math.max(1, Math.floor((now - current.lastTick) / 1000)) : 1
        const remaining = current.remaining - elapsed
        if (remaining > 0) return { ...current, remaining, lastTick: now }
        return nextState(current)
      })
    }, 1000)
    return () => window.clearInterval(tick)
  }, [setState, state.running])

  useEffect(() => {
    if (state.running || state.remaining > 0) return
    if (sound) {
      const AudioContextCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (AudioContextCtor) {
        const ctx = new AudioContextCtor()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.frequency.value = 880
        gain.gain.value = 0.06
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.16)
        window.setTimeout(() => void ctx.close(), 260)
      }
    }
    if (notify && Notification.permission === 'granted') {
      new Notification('Synapse timer', { body: `${labelFor(state.mode)} is complete.` })
    }
  }, [notify, sound, state.mode, state.remaining, state.running])

  function toggleRunning() {
    setState((current) => ({ ...current, running: !current.running, lastTick: !current.running ? Date.now() : null }))
  }

  function reset() {
    setState((current) => ({ ...current, remaining: DURATIONS[current.mode], running: false, lastTick: null }))
  }

  function skip() {
    setState((current) => nextState(current))
  }

  async function toggleNotifications() {
    if (!notify && Notification.permission === 'default') {
      const answer = await Notification.requestPermission()
      if (answer !== 'granted') return
    }
    setNotify((value) => !value)
  }

  return (
    <div className="hidden h-9 items-center gap-1 rounded-lg border border-line bg-surface px-1.5 sm:flex" aria-label={t('Pomodoro timer')}>
      <span className="flex min-w-[5.5rem] items-center gap-1.5 px-1 text-[12px] font-semibold text-ink">
        <span className={cn('grid size-6 place-items-center rounded-full bg-primary-tint text-primary-strong', state.running && !reducedMotion && 'animate-pulse')}>
          <Icon icon={Timer} size={14} />
        </span>
        <span className="tnum font-mono">{formatTime(state.remaining)}</span>
        <span className="sr-only">{t(labelFor(state.mode))}</span>
      </span>
      <Tooltip label={state.running ? t('Pause timer') : t('Start timer')}>
        <button type="button" className="grid size-7 place-items-center rounded-md text-ink-2 hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-primary" onClick={toggleRunning} aria-label={state.running ? t('Pause timer') : t('Start timer')}>
          <Icon icon={state.running ? Pause : Play} size={14} />
        </button>
      </Tooltip>
      <Tooltip label={t('Reset this interval')}>
        <button type="button" className="grid size-7 place-items-center rounded-md text-ink-2 hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-primary" onClick={reset} aria-label={t('Reset this interval')}>
          <Icon icon={RotateCcw} size={14} />
        </button>
      </Tooltip>
      <Tooltip label={t('Skip interval')}>
        <button type="button" className="grid size-7 place-items-center rounded-md text-ink-2 hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-primary" onClick={skip} aria-label={t('Skip interval')}>
          <Icon icon={SkipForward} size={14} />
        </button>
      </Tooltip>
      <Tooltip label={sound ? t('Sound on') : t('Sound off')}>
        <button type="button" className="grid size-7 place-items-center rounded-md text-ink-2 hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-primary" onClick={() => setSound((value) => !value)} aria-label={sound ? t('Turn sound off') : t('Turn sound on')}>
          <Icon icon={sound ? Volume2 : VolumeX} size={14} />
        </button>
      </Tooltip>
      <Tooltip label={notify ? t('Browser notifications on') : t('Browser notifications off')}>
        <button type="button" className="grid size-7 place-items-center rounded-md text-ink-2 hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-primary" onClick={() => void toggleNotifications()} aria-label={notify ? t('Turn notifications off') : t('Turn notifications on')}>
          <Icon icon={notify ? Bell : BellOff} size={14} />
        </button>
      </Tooltip>
      <span className="sr-only" aria-live="polite">{t(labelFor(state.mode))}, {Math.round(progress * 100)}%</span>
    </div>
  )
}
