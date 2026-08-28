import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Bell, BellOff, Minus, Pause, Play, Plus, RotateCcw, Settings, SkipForward, TimerReset, Volume2, VolumeX, X } from 'lucide-react'
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

const LABEL: Record<Mode, string> = {
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

const STORAGE_KEY = 'synapse.shell.pomodoro.v1'
const SETTINGS_KEY = 'synapse.shell.pomodoro.settings.v1'

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
  const [rawSettings, setRawSettings] = useLocalJsonPreference<PomodoroSettings>(SETTINGS_KEY, DEFAULT_SETTINGS)
  const settings = clampSettings(rawSettings)
  const durations = durationsFor(settings)
  const [state, setState] = useLocalJsonPreference<PomodoroState>(STORAGE_KEY, initialState)
  const [sound, setSound] = useLocalPreference('synapse.shell.pomodoro.sound', false)
  const [notify, setNotify] = useLocalPreference('synapse.shell.pomodoro.notify', false)
  const [open, setOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const lastCompletedRef = useRef<number | null>(null)
  const current = normalizeState(state, durations)
  const progress = 1 - (current.remainingSeconds / durations[current.mode])

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

  useEffect(() => {
    function close(event: MouseEvent) {
      if (!root.current?.contains(event.target as Node)) { setOpen(false); setSettingsOpen(false) }
    }
    function key(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      if (settingsOpen) setSettingsOpen(false)
      else setOpen(false)
    }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', key)
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', key) }
  }, [settingsOpen])

  async function toggleNotifications() {
    if (!notify && 'Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') return
    }
    setNotify((value) => !value)
  }

  function startPause() {
    setState((stored) => {
      const resolved = resolveState(stored, durations, settings.blocksBeforeLongBreak, settings.autoStartNext)
      return { ...resolved, running: !resolved.running, updatedAt: Date.now() }
    })
  }

  function reset() {
    setState((stored) => {
      const resolved = normalizeState(stored, durations)
      return { ...resolved, remainingSeconds: durations[resolved.mode], running: false, updatedAt: Date.now(), completedAt: null, completedMode: null }
    })
  }

  function skip() {
    setState((stored) => nextState(
      { ...resolveState(stored, durations, settings.blocksBeforeLongBreak, settings.autoStartNext), running: false },
      durations,
      settings.blocksBeforeLongBreak,
      settings.autoStartNext,
      false,
    ))
  }

  function selectMode(mode: Mode) {
    setState((stored) => ({
      ...normalizeState(stored, durations),
      mode,
      remainingSeconds: durations[mode],
      running: false,
      updatedAt: Date.now(),
      completedAt: null,
      completedMode: null,
    }))
  }

  function adjustSetting(key: SettingKey, direction: 1 | -1) {
    setRawSettings((current) => {
      const clamped = clampSettings(current)
      const value = clampStep(clamped[key] + direction * RANGES[key].step, key)
      return { ...clamped, [key]: value }
    })
  }

  function applyPreset(preset: (typeof PRESETS)[number]) {
    setRawSettings((current) => clampSettings({ ...current, focusMinutes: preset.focusMinutes, shortBreakMinutes: preset.shortBreakMinutes, longBreakMinutes: preset.longBreakMinutes }))
  }

  function toggleAutoStart() {
    setRawSettings((current) => clampSettings({ ...current, autoStartNext: !clampSettings(current).autoStartNext }))
  }

  return (
    <div ref={root} className="relative" aria-label={t('Pomodoro timer')}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={current.running ? `${t(LABEL[current.mode])}: ${format(current.remainingSeconds)}` : t('Pomodoro timer')}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          'relative inline-flex h-11 items-center justify-center rounded-md text-ink-2 transition-[width,background-color,color,padding] hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:h-9',
          current.running ? 'min-w-[5.4rem] gap-1.5 bg-inset px-2.5 text-ink lg:min-w-[5rem] lg:px-2' : 'w-11 lg:w-9',
          open && 'bg-inset text-ink',
        )}
      >
        <Icon icon={TimerReset} size={17} />
        {current.running && (
          <span className="tnum font-mono text-[12px] font-semibold tracking-[-0.02em] text-ink" aria-hidden>
            {format(current.remainingSeconds)}
          </span>
        )}
      </button>

      {open && (
        <div role="dialog" aria-label={settingsOpen ? t('Timer settings') : t('Pomodoro timer')} className="animate-pop fixed inset-x-2 top-[calc(3.75rem+env(safe-area-inset-top))] z-50 overflow-hidden rounded-xl border border-line bg-surface shadow-pop sm:absolute sm:inset-x-auto sm:end-0 sm:top-[calc(100%+0.5rem)] sm:w-[min(20rem,calc(100vw-1rem))]">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div className="flex items-center gap-2">
              {settingsOpen && (
                <button type="button" className="grid size-8 shrink-0 place-items-center rounded-md text-ink-3 transition-colors hover:bg-inset hover:text-ink" aria-label={t('Back')} onClick={() => setSettingsOpen(false)}>
                  <Icon icon={ArrowLeft} size={16} className="rtl:-scale-x-100" />
                </button>
              )}
              <div>
                <p className="text-[13.5px] font-semibold text-ink">{settingsOpen ? t('Timer settings') : t('Focus timer')}</p>
                <p className="mt-0.5 text-[10.5px] text-ink-3">{settingsOpen ? t('Make the blocks fit how you study.') : t('Work in calm, deliberate blocks.')}</p>
              </div>
            </div>
            <div className="flex items-center gap-0.5">
              {!settingsOpen && (
                <button type="button" className="grid size-9 place-items-center rounded-md text-ink-3 transition-colors hover:bg-inset hover:text-ink" aria-label={t('Timer settings')} onClick={() => setSettingsOpen(true)}>
                  <Icon icon={Settings} size={16} />
                </button>
              )}
              <button type="button" className="grid size-9 place-items-center rounded-md text-ink-3 transition-colors hover:bg-inset hover:text-ink" aria-label={t('Close')} onClick={() => { setOpen(false); setSettingsOpen(false) }}>
                <Icon icon={X} size={16} />
              </button>
            </div>
          </div>

          {settingsOpen ? (
            <div className="p-4">
              <div className="grid grid-cols-2 gap-1.5">
                {PRESETS.map((preset) => {
                  const active = settings.focusMinutes === preset.focusMinutes && settings.shortBreakMinutes === preset.shortBreakMinutes && settings.longBreakMinutes === preset.longBreakMinutes
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      aria-pressed={active}
                      onClick={() => applyPreset(preset)}
                      className={cn(
                        'min-h-9 rounded-md border px-2 text-[11px] font-semibold tracking-[-0.01em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary',
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
                        onClick={() => adjustSetting(key, -1)}
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
                        onClick={() => adjustSetting(key, 1)}
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
                  <input type="checkbox" className="sr-only peer" checked={settings.autoStartNext} onChange={toggleAutoStart} />
                  <span
                    onClick={toggleAutoStart}
                    role="presentation"
                    className={cn('block h-6 w-10 cursor-pointer rounded-full transition-colors', settings.autoStartNext ? 'bg-primary' : 'bg-line-2')}
                  >
                    <span className={cn('block size-5 translate-x-0.5 rounded-full bg-surface shadow-control transition-transform', settings.autoStartNext && 'translate-x-[1.125rem] rtl:-translate-x-[1.125rem]')} />
                  </span>
                </span>
              </label>
            </div>
          ) : (
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
                  {MODES.map((mode) => (
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
            </>
          )}
        </div>
      )}
      <span className="sr-only" aria-live="polite">{t(LABEL[current.mode])}, {Math.round(Math.max(0, Math.min(1, progress)) * 100)}%</span>
    </div>
  )
}
