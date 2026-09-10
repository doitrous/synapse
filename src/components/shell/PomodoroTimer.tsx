import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from 'react'
import { Bell, BellOff, Minus, Pause, Play, Plus, RotateCcw, SkipForward, Volume2, VolumeX } from 'lucide-react'
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

/** Minutes for each block, plus how the rhythm repeats — the student's own dial. */
interface PomodoroSettings {
  focusMinutes: number
  shortBreakMinutes: number
  longBreakMinutes: number
  blocksBeforeLongBreak: number
  autoStartNext: boolean
}

const DEFAULT_SETTINGS: PomodoroSettings = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  blocksBeforeLongBreak: 4,
  autoStartNext: false,
}

type SettingKey = 'focusMinutes' | 'shortBreakMinutes' | 'longBreakMinutes' | 'blocksBeforeLongBreak'

const RANGES: Record<SettingKey, { min: number; max: number; step: number }> = {
  focusMinutes: { min: 5, max: 90, step: 5 },
  shortBreakMinutes: { min: 1, max: 30, step: 1 },
  longBreakMinutes: { min: 5, max: 45, step: 5 },
  blocksBeforeLongBreak: { min: 2, max: 8, step: 1 },
}

const PRESETS: Array<{ label: string; focusMinutes: number; shortBreakMinutes: number; longBreakMinutes: number }> = [
  { label: '25 / 5 / 15', focusMinutes: 25, shortBreakMinutes: 5, longBreakMinutes: 15 },
  { label: '50 / 10 / 20', focusMinutes: 50, shortBreakMinutes: 10, longBreakMinutes: 20 },
]

export const POMODORO_LABEL: Record<Mode, string> = {
  focus: 'Focus',
  short: 'Short break',
  long: 'Long break',
}

const MODES: Mode[] = ['focus', 'short', 'long']

const SETTING_LABEL: Record<SettingKey, string> = {
  focusMinutes: 'Focus block',
  shortBreakMinutes: 'Short break',
  longBreakMinutes: 'Long break',
  blocksBeforeLongBreak: 'Blocks before a long break',
}

const STORAGE_KEY = 'nishany.shell.pomodoro.v1'
const SETTINGS_KEY = 'nishany.shell.pomodoro.settings.v1'

function clampStep(value: number, key: SettingKey): number {
  const { min, max, step } = RANGES[key]
  const rounded = Math.round(value / step) * step
  return Math.min(max, Math.max(min, rounded))
}

function clampSettings(settings: Partial<PomodoroSettings>): PomodoroSettings {
  return {
    focusMinutes: clampStep(typeof settings.focusMinutes === 'number' ? settings.focusMinutes : DEFAULT_SETTINGS.focusMinutes, 'focusMinutes'),
    shortBreakMinutes: clampStep(typeof settings.shortBreakMinutes === 'number' ? settings.shortBreakMinutes : DEFAULT_SETTINGS.shortBreakMinutes, 'shortBreakMinutes'),
    longBreakMinutes: clampStep(typeof settings.longBreakMinutes === 'number' ? settings.longBreakMinutes : DEFAULT_SETTINGS.longBreakMinutes, 'longBreakMinutes'),
    blocksBeforeLongBreak: clampStep(typeof settings.blocksBeforeLongBreak === 'number' ? settings.blocksBeforeLongBreak : DEFAULT_SETTINGS.blocksBeforeLongBreak, 'blocksBeforeLongBreak'),
    autoStartNext: settings.autoStartNext === true,
  }
}

function durationsFor(settings: PomodoroSettings): Record<Mode, number> {
  return {
    focus: settings.focusMinutes * 60,
    short: settings.shortBreakMinutes * 60,
    long: settings.longBreakMinutes * 60,
  }
}

function initialState(): PomodoroState {
  return {
    mode: 'focus',
    remainingSeconds: DEFAULT_SETTINGS.focusMinutes * 60,
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

function normalizeState(stored: StoredPomodoroState, durations: Record<Mode, number>): PomodoroState {
  const mode = validMode(stored.mode) ? stored.mode : 'focus'
  const remaining = typeof stored.remainingSeconds === 'number'
    ? stored.remainingSeconds
    : typeof stored.remaining === 'number'
      ? stored.remaining
      : durations[mode]

  return {
    mode,
    remainingSeconds: Math.max(0, Math.min(durations[mode], Math.floor(remaining))),
    running: stored.running === true,
    focusCycles: typeof stored.focusCycles === 'number' ? stored.focusCycles : stored.completedFocus ?? 0,
    updatedAt: typeof stored.updatedAt === 'number' ? stored.updatedAt : stored.lastTick ?? Date.now(),
    completedAt: typeof stored.completedAt === 'number' ? stored.completedAt : null,
    completedMode: validMode(stored.completedMode) ? stored.completedMode : null,
  }
}

function nextState(current: PomodoroState, durations: Record<Mode, number>, blocksBeforeLongBreak: number, autoStartNext: boolean, completed = false): PomodoroState {
  const running = completed && autoStartNext
  if (current.mode === 'focus') {
    const cycles = current.focusCycles + 1
    const mode: Mode = cycles % blocksBeforeLongBreak === 0 ? 'long' : 'short'
    return {
      mode,
      remainingSeconds: durations[mode],
      running,
      focusCycles: cycles,
      updatedAt: Date.now(),
      completedAt: completed ? Date.now() : null,
      completedMode: completed ? current.mode : null,
    }
  }
  return {
    mode: 'focus',
    remainingSeconds: durations.focus,
    running,
    focusCycles: current.focusCycles,
    updatedAt: Date.now(),
    completedAt: completed ? Date.now() : null,
    completedMode: completed ? current.mode : null,
  }
}

function resolveState(stored: StoredPomodoroState, durations: Record<Mode, number>, blocksBeforeLongBreak: number, autoStartNext: boolean): PomodoroState {
  const state = normalizeState(stored, durations)
  if (!state.running) return state
  const elapsed = Math.max(0, Math.floor((Date.now() - state.updatedAt) / 1000))
  if (elapsed <= 0) return state
  const remaining = state.remainingSeconds - elapsed
  if (remaining > 0) return { ...state, remainingSeconds: remaining, updatedAt: Date.now() }
  return nextState({ ...state, remainingSeconds: 0, running: false, updatedAt: Date.now() }, durations, blocksBeforeLongBreak, autoStartNext, true)
}

export function formatPomodoro(seconds: number): string {
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

/**
 * The clock itself, lifted out of the button that used to own it.
 *
 * The top bar now keeps the timer behind the Tools popover, and a popover
 * unmounts its contents when it closes. So the ticking, the chime and the
 * completion notification live in this hook, which the always-mounted Tools
 * button calls — a closed popover no longer stops the student's block.
 */
export function usePomodoroEngine() {
  const t = useT()
  const [rawSettings, setRawSettings] = useLocalJsonPreference<PomodoroSettings>(SETTINGS_KEY, DEFAULT_SETTINGS)
  const settings = clampSettings(rawSettings)
  const durations = durationsFor(settings)
  const [state, setState] = useLocalJsonPreference<PomodoroState>(STORAGE_KEY, initialState)
  const [sound, setSound] = useLocalPreference('nishany.shell.pomodoro.sound', false)
  const [notify, setNotify] = useLocalPreference('nishany.shell.pomodoro.notify', false)
  const lastCompletedRef = useRef<number | null>(null)
  const current = normalizeState(state, durations)
  const progress = Math.max(0, Math.min(1, 1 - (current.remainingSeconds / durations[current.mode])))

  // Re-derives the visible countdown whenever the block lengths change, so
  // editing settings while idle snaps the ring to the new length right away,
  // and shrinking a length mid-run clamps a longer-than-new-max remainder.
  useEffect(() => {
    setState((stored) => resolveState(stored, durations, settings.blocksBeforeLongBreak, settings.autoStartNext))
  }, [setState, durations.focus, durations.short, durations.long, settings.blocksBeforeLongBreak, settings.autoStartNext])

  useEffect(() => {
    if (!current.running) return
    const timer = window.setInterval(() => {
      setState((stored) => resolveState(stored, durations, settings.blocksBeforeLongBreak, settings.autoStartNext))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [current.running, setState, durations.focus, durations.short, durations.long, settings.blocksBeforeLongBreak, settings.autoStartNext])

  useEffect(() => {
    if (!current.completedAt || current.completedAt === lastCompletedRef.current) return
    lastCompletedRef.current = current.completedAt
    if (sound) chime()
    if (notify && 'Notification' in window && Notification.permission === 'granted') {
      const body = current.completedMode === 'focus' ? t('Break time is ready.') : t('Your next focus block is ready.')
      new Notification(t('Pomodoro timer'), { body })
    }
  }, [current.completedAt, current.completedMode, notify, sound, t])

  const toggleNotifications = useCallback(async () => {
    if (!notify && 'Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') return
    }
    setNotify((value) => !value)
  }, [notify, setNotify])

  const startPause = useCallback(() => {
    setState((stored) => {
      const resolved = resolveState(stored, durationsFor(clampSettings(rawSettings)), clampSettings(rawSettings).blocksBeforeLongBreak, clampSettings(rawSettings).autoStartNext)
      return { ...resolved, running: !resolved.running, updatedAt: Date.now() }
    })
  }, [rawSettings, setState])

  const reset = useCallback(() => {
    setState((stored) => {
      const resolvedDurations = durationsFor(clampSettings(rawSettings))
      const resolved = normalizeState(stored, resolvedDurations)
      return { ...resolved, remainingSeconds: resolvedDurations[resolved.mode], running: false, updatedAt: Date.now(), completedAt: null, completedMode: null }
    })
  }, [rawSettings, setState])

  const skip = useCallback(() => {
    setState((stored) => {
      const applied = clampSettings(rawSettings)
      const resolvedDurations = durationsFor(applied)
      return nextState(
        { ...resolveState(stored, resolvedDurations, applied.blocksBeforeLongBreak, applied.autoStartNext), running: false },
        resolvedDurations,
        applied.blocksBeforeLongBreak,
        applied.autoStartNext,
        false,
      )
    })
  }, [rawSettings, setState])

  const selectMode = useCallback((mode: Mode) => {
    setState((stored) => {
      const resolvedDurations = durationsFor(clampSettings(rawSettings))
      return {
        ...normalizeState(stored, resolvedDurations),
        mode,
        remainingSeconds: resolvedDurations[mode],
        running: false,
        updatedAt: Date.now(),
        completedAt: null,
        completedMode: null,
      }
    })
  }, [rawSettings, setState])

  const adjustSetting = useCallback((key: SettingKey, direction: 1 | -1) => {
    setRawSettings((stored) => {
      const clamped = clampSettings(stored)
      const value = clampStep(clamped[key] + direction * RANGES[key].step, key)
      return { ...clamped, [key]: value }
    })
  }, [setRawSettings])

  const applyPreset = useCallback((preset: (typeof PRESETS)[number]) => {
    setRawSettings((stored) => clampSettings({ ...stored, focusMinutes: preset.focusMinutes, shortBreakMinutes: preset.shortBreakMinutes, longBreakMinutes: preset.longBreakMinutes }))
  }, [setRawSettings])

  const toggleAutoStart = useCallback(() => {
    setRawSettings((stored) => clampSettings({ ...stored, autoStartNext: !clampSettings(stored).autoStartNext }))
  }, [setRawSettings])

  return {
    current,
    settings,
    progress,
    running: current.running,
    timeLabel: formatPomodoro(current.remainingSeconds),
    modeLabel: POMODORO_LABEL[current.mode],
    sound,
    setSound,
    notify,
    toggleNotifications,
    startPause,
    reset,
    skip,
    selectMode,
    adjustSetting,
    applyPreset,
    toggleAutoStart,
  }
}

export type PomodoroEngine = ReturnType<typeof usePomodoroEngine>

/**
 * One clock for the whole student app.
 *
 * The top bar and the study room both need to show — and drive — the same
 * countdown, and two `usePomodoroEngine()` instances would each run their own
 * ticking interval writing the same localStorage key, fighting each other. So
 * the engine is created exactly once here and shared: start it from the room's
 * "Start focus timer" button and the top-bar pill moves too, because it is
 * literally the same timer.
 */
const PomodoroContext = createContext<PomodoroEngine | null>(null)

export function PomodoroProvider({ children }: { children: ReactNode }) {
  const engine = usePomodoroEngine()
  return <PomodoroContext.Provider value={engine}>{children}</PomodoroContext.Provider>
}

/** The shared engine. Null outside the provider (e.g. the admin portal top bar). */
export function usePomodoro(): PomodoroEngine | null {
  return useContext(PomodoroContext)
}

/** The timer's own surface, with no chrome of its own — the host frames it. */
export function PomodoroPanel({ engine, settingsOpen }: { engine: PomodoroEngine; settingsOpen: boolean }) {
  const t = useT()
  const { current, settings, progress } = engine

  if (settingsOpen) {
    return (
      <div className="p-4">
        <div className="grid grid-cols-2 gap-1.5">
          {PRESETS.map((preset) => {
            const active = settings.focusMinutes === preset.focusMinutes && settings.shortBreakMinutes === preset.shortBreakMinutes && settings.longBreakMinutes === preset.longBreakMinutes
            return (
              <button
                key={preset.label}
                type="button"
                aria-pressed={active}
                onClick={() => engine.applyPreset(preset)}
                className={cn(
                  'min-h-11 rounded-md border px-2 text-[11px] font-semibold tracking-[-0.01em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary sm:min-h-9',
                  active ? 'border-transparent bg-primary-tint text-primary-strong' : 'border-line text-ink-2 hover:bg-inset hover:text-ink',
                )}
              >
                {preset.label}
              </button>
            )
          })}
        </div>

        <div className="mt-3 divide-y divide-line">
          {(['focusMinutes', 'shortBreakMinutes', 'longBreakMinutes', 'blocksBeforeLongBreak'] as SettingKey[]).map((key) => (
            <div key={key} className="flex items-center justify-between gap-2 py-2.5 first:pt-0">
              <span className="text-[12.5px] font-medium text-ink">{t(SETTING_LABEL[key])}</span>
              <div className="flex items-center gap-1">
                <IconButton
                  icon={Minus}
                  label={t('Decrease')}
                  size="sm"
                  onClick={() => engine.adjustSetting(key, -1)}
                  disabled={settings[key] <= RANGES[key].min}
                  className="disabled:pointer-events-none disabled:opacity-35"
                />
                <span className="tnum w-14 text-center font-mono text-[12.5px] text-ink">
                  {key === 'blocksBeforeLongBreak' ? settings[key] : `${settings[key]} ${t('min')}`}
                </span>
                <IconButton
                  icon={Plus}
                  label={t('Increase')}
                  size="sm"
                  onClick={() => engine.adjustSetting(key, 1)}
                  disabled={settings[key] >= RANGES[key].max}
                  className="disabled:pointer-events-none disabled:opacity-35"
                />
              </div>
            </div>
          ))}
        </div>

        <label className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-surface-2/65 px-3 py-2.5">
          <span>
            <span className="block text-[12.5px] font-medium text-ink">{t('Auto-start the next block')}</span>
            <span className="mt-0.5 block text-[10.5px] text-ink-3">{t('Skip the tap between focus and breaks.')}</span>
          </span>
          <span className="shrink-0">
            <input type="checkbox" className="sr-only peer" checked={settings.autoStartNext} onChange={engine.toggleAutoStart} />
            <span
              onClick={engine.toggleAutoStart}
              role="presentation"
              className={cn('block h-6 w-10 cursor-pointer rounded-full transition-colors', settings.autoStartNext ? 'bg-primary' : 'bg-line-2')}
            >
              <span className={cn('block size-5 translate-x-0.5 rounded-full bg-surface shadow-control transition-transform', settings.autoStartNext && 'translate-x-[1.125rem] rtl:-translate-x-[1.125rem]')} />
            </span>
          </span>
        </label>
      </div>
    )
  }

  return (
    <>
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
                strokeDashoffset={1 - progress}
                className="transition-[stroke-dashoffset] duration-500 ease-[var(--ease-out-quint)] motion-reduce:transition-none"
              />
            </svg>
            <span className="text-center">
              <span className="block text-[11px] font-semibold text-ink-3">{t(POMODORO_LABEL[current.mode])}</span>
              <span className="tnum mt-1 block font-mono text-[27px] font-semibold tracking-[-0.035em] text-ink">{formatPomodoro(current.remainingSeconds)}</span>
            </span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-1 rounded-lg bg-surface-2/65 p-1">
          {MODES.map((mode) => (
            <button
              key={mode}
              type="button"
              aria-pressed={current.mode === mode}
              onClick={() => engine.selectMode(mode)}
              className={cn(
                'min-h-11 rounded-md px-2 text-[11px] font-semibold transition-[background-color,color,box-shadow,transform] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary sm:min-h-9',
                current.mode === mode ? 'bg-surface text-ink shadow-control' : 'text-ink-3 hover:text-ink',
              )}
            >
              {t(POMODORO_LABEL[mode])}
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5">
          <IconButton icon={RotateCcw} label={t('Reset this block')} onClick={engine.reset} />
          <IconButton icon={current.running ? Pause : Play} label={current.running ? t('Pause timer') : t('Start timer')} variant="primary" onClick={engine.startPause} />
          <IconButton icon={SkipForward} label={t('Skip to the next block')} onClick={engine.skip} />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line bg-surface-2/40 px-3 py-2.5">
        <p className="text-[10.5px] text-ink-3">{current.focusCycles} {t('focus blocks completed')}</p>
        <div className="flex items-center gap-0.5">
          <IconButton icon={engine.sound ? Volume2 : VolumeX} label={engine.sound ? t('Turn sound off') : t('Turn sound on')} size="sm" active={engine.sound} onClick={() => engine.setSound((value) => !value)} />
          <IconButton icon={engine.notify ? Bell : BellOff} label={engine.notify ? t('Notifications on') : t('Notifications off')} size="sm" active={engine.notify} onClick={() => void engine.toggleNotifications()} />
        </div>
      </div>
    </>
  )
}
