import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { Pause, Play, Volume1, Volume2, VolumeX } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useLocalJsonPreference } from '@/lib/useLocalPreference'
import { useT } from '@/lib/i18n'
import { SOUND_ID_MIGRATIONS, SOUNDS, type SoundChoice, type SoundId } from '@/data/focusAudioTracks'

interface WebEngine {
  kind: 'web'
  context: AudioContext
  master: GainNode
  nodes: AudioNode[]
  timers: number[]
}

/** HTMLAudioElement is simplest for a looping file — good enough here.
 *  ponytail: `loop = true` is a hard cut at the file boundary, not gapless.
 *  True seamless looping needs Web Audio buffer scheduling; upgrade if a
 *  track's loop point is audible. */
interface FileEngine {
  kind: 'file'
  audio: HTMLAudioElement
}

type AudioEngine = WebEngine | FileEngine

function noiseBuffer(context: AudioContext, brown = false): AudioBuffer {
  const buffer = context.createBuffer(1, context.sampleRate * 3, context.sampleRate)
  const data = buffer.getChannelData(0)
  let last = 0
  for (let index = 0; index < data.length; index++) {
    const white = Math.random() * 2 - 1
    if (brown) {
      last = (last + 0.02 * white) / 1.02
      data[index] = last * 3.5
    } else data[index] = white
  }
  return buffer
}

function loopingNoise(engine: WebEngine, gainValue: number, brown = false, filters: Array<[BiquadFilterType, number]> = []) {
  const source = engine.context.createBufferSource()
  source.buffer = noiseBuffer(engine.context, brown)
  source.loop = true
  let tail: AudioNode = source
  for (const [type, frequency] of filters) {
    const filter = engine.context.createBiquadFilter()
    filter.type = type
    filter.frequency.value = frequency
    tail.connect(filter)
    engine.nodes.push(filter)
    tail = filter
  }
  const gain = engine.context.createGain()
  gain.gain.value = gainValue
  tail.connect(gain).connect(engine.master)
  source.start()
  engine.nodes.push(source, gain)
}

/**
 * 14 Hz binaural beat: two oscillators a few Hz apart, panned hard left/right
 * through a channel merger so each ear hears a different tone. The brain
 * perceives the 14 Hz *difference* as a beat — only audible over headphones,
 * which is why the UI labels/tooltips call that out.
 */
function binauralBeat(engine: WebEngine, gainValue = 0.05) {
  const merger = engine.context.createChannelMerger(2)
  const left = engine.context.createOscillator()
  const right = engine.context.createOscillator()
  left.frequency.value = 200
  right.frequency.value = 214
  const leftGain = engine.context.createGain()
  const rightGain = engine.context.createGain()
  leftGain.gain.value = gainValue
  rightGain.gain.value = gainValue
  left.connect(leftGain).connect(merger, 0, 0)
  right.connect(rightGain).connect(merger, 0, 1)
  merger.connect(engine.master)
  left.start()
  right.start()
  engine.nodes.push(left, right, leftGain, rightGain, merger)
}

function startSound(sound: SoundChoice, volume: number, onFileError: () => void): AudioEngine {
  if (sound.kind === 'file') {
    const audio = new Audio(sound.src)
    audio.loop = true
    audio.volume = volume
    audio.addEventListener('error', onFileError)
    void audio.play().catch(onFileError)
    return { kind: 'file', audio }
  }

  const context = new AudioContext()
  const master = context.createGain()
  master.gain.value = volume
  master.connect(context.destination)
  const engine: WebEngine = { kind: 'web', context, master, nodes: [master], timers: [] }

  if (sound.id === 'white') loopingNoise(engine, 0.18, false, [['lowpass', 12_000]])
  if (sound.id === 'brown') loopingNoise(engine, 0.32, true, [['lowpass', 4_000]])
  if (sound.id === 'rain') {
    loopingNoise(engine, 0.12, false, [['highpass', 1_700], ['lowpass', 9_500]])
    loopingNoise(engine, 0.075, true, [['lowpass', 1_100]])
  }
  if (sound.id === 'beta') binauralBeat(engine)
  return engine
}

async function stopEngine(engine: AudioEngine | null) {
  if (!engine) return
  if (engine.kind === 'file') {
    engine.audio.pause()
    engine.audio.src = ''
    return
  }
  engine.timers.forEach(window.clearInterval)
  engine.nodes.forEach((node) => {
    try { node.disconnect() } catch { /* already disconnected */ }
  })
  await engine.context.close().catch(() => undefined)
}

interface FocusAudioContextValue {
  preference: { sound: SoundId; volume: number }
  playing: boolean
  play: (id?: SoundId) => Promise<void>
  pause: () => Promise<void>
  choose: (id: SoundId) => Promise<void>
  setVolume: (volume: number) => void
  /** Silence and restore, remembering the level from before the mute. */
  toggleMute: () => void
  /** File-backed tracks whose file 404s or fails to decode — the panel shows them disabled instead of throwing. */
  unavailable: Partial<Record<SoundId, boolean>>
}

const FocusAudioContext = createContext<FocusAudioContextValue | null>(null)

/** Keeps audio alive while the top bar temporarily disappears in focus mode. */
export function FocusAudioProvider({ children }: { children: ReactNode }) {
  const [rawPreference, setPreference] = useLocalJsonPreference('nishany.focusAudio.v1', { sound: 'lofi' as SoundId, volume: 0.32 })
  // A stored id from before this change ('soft') or any id that no longer
  // exists is remapped on read, so an old pref degrades gracefully instead of
  // pointing at nothing. The next `choose()` call persists the fixed id.
  const resolvedSoundId = SOUNDS.some((sound) => sound.id === rawPreference.sound)
    ? rawPreference.sound
    : (SOUND_ID_MIGRATIONS[rawPreference.sound as string] ?? SOUNDS[0].id)
  const preference = { sound: resolvedSoundId, volume: rawPreference.volume }

  const [playing, setPlaying] = useState(false)
  const [unavailable, setUnavailable] = useState<Partial<Record<SoundId, boolean>>>({})
  const engine = useRef<AudioEngine | null>(null)
  // Remembers the level from before a mute so unmuting restores it, instead of
  // guessing one. It lives here rather than in the panel because the panel is
  // now inside a popover: a ref there would forget the level every time the
  // menu closed, and unmuting would snap back to the default.
  const preMuteVolume = useRef(preference.volume > 0 ? preference.volume : 0.32)

  useEffect(() => {
    if (preference.volume > 0) preMuteVolume.current = preference.volume
  }, [preference.volume])

  useEffect(() => () => { void stopEngine(engine.current) }, [])

  // Probes each file-backed track once on mount so a missing file disables
  // its row up front, rather than only failing when the user presses play.
  useEffect(() => {
    const probes: HTMLAudioElement[] = []
    for (const sound of SOUNDS) {
      if (sound.kind !== 'file') continue
      const probe = new Audio()
      probe.preload = 'metadata'
      probe.addEventListener('error', () => setUnavailable((current) => ({ ...current, [sound.id]: true })))
      probe.src = sound.src
      probes.push(probe)
    }
    return () => probes.forEach((probe) => { probe.src = '' })
  }, [])

  useEffect(() => {
    const current = engine.current
    if (!current) return
    if (current.kind === 'file') current.audio.volume = preference.volume
    else current.master.gain.setTargetAtTime(preference.volume, current.context.currentTime, 0.04)
  }, [preference.volume])

  const play = useCallback(async (id = preference.sound) => {
    const sound = SOUNDS.find((candidate) => candidate.id === id) ?? SOUNDS[0]
    await stopEngine(engine.current)
    engine.current = startSound(sound, preference.volume, () => {
      setPlaying(false)
      setUnavailable((current) => ({ ...current, [sound.id]: true }))
    })
    if (engine.current.kind === 'web') await engine.current.context.resume()
    setPlaying(true)
  }, [preference.sound, preference.volume])

  const pause = useCallback(async () => {
    await stopEngine(engine.current)
    engine.current = null
    setPlaying(false)
  }, [])

  const choose = useCallback(async (id: SoundId) => {
    setPreference((current) => ({ ...current, sound: id }))
    if (playing) await play(id)
  }, [play, playing, setPreference])

  const setVolume = useCallback((volume: number) => {
    setPreference((current) => ({ ...current, volume }))
  }, [setPreference])

  const toggleMute = useCallback(() => {
    setPreference((current) => ({ ...current, volume: current.volume > 0 ? 0 : preMuteVolume.current }))
  }, [setPreference])

  return (
    <FocusAudioContext.Provider value={{ preference, playing, play, pause, choose, setVolume, toggleMute, unavailable }}>
      {children}
    </FocusAudioContext.Provider>
  )
}

/**
 * The player state, for anything that needs to know sound is running — the
 * Tools button in the top bar shows a dot while it is.
 */
export function useFocusAudio(): FocusAudioContextValue {
  const audio = useContext(FocusAudioContext)
  if (!audio) throw new Error('useFocusAudio must be called inside FocusAudioProvider')
  return audio
}

/** The sound picker, with no chrome of its own — the host frames it. */
export function FocusAudioPanel() {
  const t = useT()
  const { preference, playing, play, pause, choose, setVolume, toggleMute, unavailable } = useFocusAudio()
  const selected = SOUNDS.find((sound) => sound.id === preference.sound) ?? SOUNDS[0]
  const muted = preference.volume <= 0
  const volumeIcon = muted ? VolumeX : preference.volume < 0.35 ? Volume1 : Volume2

  return (
    <>
      <div className="p-1.5">
        {SOUNDS.map((sound) => {
          const disabled = unavailable[sound.id] === true
          return (
            <button
              key={sound.id}
              type="button"
              disabled={disabled}
              aria-pressed={sound.id === selected.id}
              aria-disabled={disabled}
              title={sound.id === 'beta' ? t('Binaural beat — headphones required') : disabled ? t('Add the audio file to enable this track') : undefined}
              onClick={() => { if (!disabled) void choose(sound.id) }}
              className={cn(
                'flex min-h-12 w-full items-center gap-3 rounded-lg px-2.5 py-2 text-start transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary',
                disabled ? 'cursor-not-allowed opacity-45' : sound.id === selected.id ? 'bg-primary-tint' : 'hover:bg-inset',
              )}
            >
              <span className={cn('grid size-8 shrink-0 place-items-center rounded-md', sound.id === selected.id && !disabled ? 'bg-primary text-on-primary' : 'bg-surface-2 text-ink-2')}><Icon icon={sound.icon} size={15} /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] font-semibold text-ink">{t(sound.label)}</span>
                <span className="mt-0.5 block truncate text-[10.5px] text-ink-3">{disabled ? t('Add the audio file to enable') : t(sound.description)}</span>
              </span>
              {sound.id === selected.id && playing && !disabled && <span className="flex h-4 items-end gap-0.5" aria-label={t('Playing')}><i className="h-2 w-0.5 animate-pulse rounded-full bg-primary motion-reduce:animate-none" /><i className="h-4 w-0.5 animate-pulse rounded-full bg-primary [animation-delay:120ms] motion-reduce:animate-none" /><i className="h-3 w-0.5 animate-pulse rounded-full bg-primary [animation-delay:240ms] motion-reduce:animate-none" /></span>}
            </button>
          )
        })}
      </div>

      <div className="border-t border-line bg-surface-2/40 p-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? t('Unmute') : t('Mute')}
            aria-pressed={muted}
            className="grid size-11 shrink-0 place-items-center rounded-md text-ink-3 transition-colors hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary sm:size-7"
          >
            <Icon icon={volumeIcon} size={15} />
          </button>
          <label className="flex min-w-0 flex-1 items-center gap-3">
            <span className="sr-only">{t('Volume')}</span>
            <input type="range" min="0" max="0.75" step="0.01" value={preference.volume} onChange={(event) => setVolume(Number(event.target.value))} className="h-6 min-w-0 flex-1 accent-primary" />
            <span className="tnum w-8 text-end font-mono text-[10.5px] text-ink-3">{Math.round(preference.volume * 100)}%</span>
          </label>
        </div>
        <button type="button" onClick={() => void (playing ? pause() : play())} className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-primary-strong/25 bg-primary text-[13px] font-semibold text-on-primary shadow-action transition-[background-color,transform] hover:bg-primary-hover active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:h-10">
          <Icon icon={playing ? Pause : Play} size={15} /> {playing ? t('Pause') : `${t('Play')} ${t(selected.label)}`}
        </button>
      </div>
    </>
  )
}
