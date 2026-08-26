import { useEffect, useRef, useState } from 'react'
import { AudioLines, ChevronDown, CloudRain, Headphones, Music2, Pause, Play, Volume2, Waves, Wind, X } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useLocalJsonPreference } from '@/lib/useLocalPreference'

type SoundId = 'lofi' | 'soft' | 'rain' | 'brown' | 'white'

interface SoundChoice {
  id: SoundId
  label: string
  description: string
  icon: typeof Music2
}

const SOUNDS: SoundChoice[] = [
  { id: 'lofi', label: 'Lo-fi study', description: 'Warm chords and soft tape texture', icon: Headphones },
  { id: 'soft', label: 'Soft keys', description: 'Sparse, gentle instrumental notes', icon: Music2 },
  { id: 'rain', label: 'Window rain', description: 'Steady rainfall with a distant hush', icon: CloudRain },
  { id: 'brown', label: 'Brown noise', description: 'Deep, smooth focus noise', icon: Waves },
  { id: 'white', label: 'White noise', description: 'Even broadband sound', icon: Wind },
]

interface AudioEngine {
  context: AudioContext
  master: GainNode
  nodes: AudioNode[]
  timers: number[]
}

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

function loopingNoise(engine: AudioEngine, gainValue: number, brown = false, filters: Array<[BiquadFilterType, number]> = []) {
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

const LOFI_CHORDS = [
  [48, 55, 59, 64], [45, 52, 57, 60], [50, 57, 60, 64], [43, 50, 55, 59],
]
const SOFT_CHORDS = [
  [60, 64, 67], [57, 60, 64], [62, 65, 69], [55, 59, 62],
]

function frequency(midi: number): number {
  return 440 * 2 ** ((midi - 69) / 12)
}

function playChord(engine: AudioEngine, notes: number[], soft: boolean) {
  const now = engine.context.currentTime
  notes.forEach((note, index) => {
    const oscillator = engine.context.createOscillator()
    const filter = engine.context.createBiquadFilter()
    const gain = engine.context.createGain()
    oscillator.type = soft ? 'sine' : 'triangle'
    oscillator.frequency.value = frequency(note + (soft && index === notes.length - 1 ? 12 : 0))
    filter.type = 'lowpass'
    filter.frequency.value = soft ? 1_700 : 1_050
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(soft ? 0.035 : 0.026, now + 0.04 + index * 0.025)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + (soft ? 3.8 : 3.2))
    oscillator.connect(filter).connect(gain).connect(engine.master)
    oscillator.start(now + index * 0.025)
    oscillator.stop(now + (soft ? 4 : 3.4))
    // These nodes stop themselves after the envelope. Keeping every finished
    // chord in the engine array would retain thousands of dead nodes during a
    // long study day; closing the AudioContext still stops any live envelope.
  })
}

function startSound(id: SoundId, volume: number): AudioEngine {
  const context = new AudioContext()
  const master = context.createGain()
  master.gain.value = volume
  master.connect(context.destination)
  const engine: AudioEngine = { context, master, nodes: [master], timers: [] }

  if (id === 'white') loopingNoise(engine, 0.18, false, [['lowpass', 12_000]])
  if (id === 'brown') loopingNoise(engine, 0.32, true, [['lowpass', 4_000]])
  if (id === 'rain') {
    loopingNoise(engine, 0.12, false, [['highpass', 1_700], ['lowpass', 9_500]])
    loopingNoise(engine, 0.075, true, [['lowpass', 1_100]])
  }
  if (id === 'lofi' || id === 'soft') {
    if (id === 'lofi') loopingNoise(engine, 0.018, false, [['highpass', 3_500], ['lowpass', 7_000]])
    const chords = id === 'soft' ? SOFT_CHORDS : LOFI_CHORDS
    let chord = 0
    playChord(engine, chords[chord], id === 'soft')
    const timer = window.setInterval(() => {
      chord = (chord + 1) % chords.length
      playChord(engine, chords[chord], id === 'soft')
    }, id === 'soft' ? 5_200 : 4_000)
    engine.timers.push(timer)
  }
  return engine
}

async function stopEngine(engine: AudioEngine | null) {
  if (!engine) return
  engine.timers.forEach(window.clearInterval)
  engine.nodes.forEach((node) => {
    try { node.disconnect() } catch { /* already disconnected */ }
  })
  await engine.context.close().catch(() => undefined)
}

export function FocusAudioPlayer({ railed, focusMode }: { railed: boolean; focusMode: boolean }) {
  const [preference, setPreference] = useLocalJsonPreference('synapse.focusAudio.v1', { sound: 'lofi' as SoundId, volume: 0.32 })
  const [playing, setPlaying] = useState(false)
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const engine = useRef<AudioEngine | null>(null)
  const selected = SOUNDS.find((sound) => sound.id === preference.sound) ?? SOUNDS[0]

  useEffect(() => () => { void stopEngine(engine.current) }, [])

  useEffect(() => {
    if (engine.current) engine.current.master.gain.setTargetAtTime(preference.volume, engine.current.context.currentTime, 0.04)
  }, [preference.volume])

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

  async function play(id = preference.sound) {
    await stopEngine(engine.current)
    engine.current = startSound(id, preference.volume)
    await engine.current.context.resume()
    setPlaying(true)
  }

  async function pause() {
    await stopEngine(engine.current)
    engine.current = null
    setPlaying(false)
  }

  async function choose(id: SoundId) {
    setPreference((current) => ({ ...current, sound: id }))
    if (playing) await play(id)
  }

  return (
    <div
      ref={root}
      className={cn(
        'fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] z-30 transition-[inset-inline-start] duration-200 ease-[var(--ease-out-quint)]',
        focusMode ? 'start-3 sm:start-4' : railed ? 'start-3 lg:start-[calc(var(--spacing-sidebar-collapsed)+1rem)]' : 'start-3 lg:start-[calc(var(--spacing-sidebar)+1rem)]',
      )}
    >
      {open && (
        <div role="dialog" aria-label="Focus sounds" className="animate-pop absolute bottom-[calc(100%+0.65rem)] start-0 w-[min(21rem,calc(100vw-1.5rem))] overflow-hidden rounded-xl border border-line bg-surface shadow-pop">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div><p className="text-[13.5px] font-semibold text-ink">Focus sounds</p><p className="mt-0.5 text-[10.5px] text-ink-3">Generated on your device · no streaming</p></div>
            <button type="button" className="grid size-9 place-items-center rounded-md text-ink-3 hover:bg-inset hover:text-ink" aria-label="Close focus sounds" onClick={() => setOpen(false)}><Icon icon={X} size={16} /></button>
          </div>

          <div className="p-1.5">
            {SOUNDS.map((sound) => (
              <button
                key={sound.id}
                type="button"
                aria-pressed={sound.id === selected.id}
                onClick={() => void choose(sound.id)}
                className={cn('flex min-h-12 w-full items-center gap-3 rounded-lg px-2.5 py-2 text-start transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary', sound.id === selected.id ? 'bg-primary-tint' : 'hover:bg-inset')}
              >
                <span className={cn('grid size-8 shrink-0 place-items-center rounded-md', sound.id === selected.id ? 'bg-primary text-on-primary' : 'bg-surface-2 text-ink-2')}><Icon icon={sound.icon} size={15} /></span>
                <span className="min-w-0 flex-1"><span className="block text-[12.5px] font-semibold text-ink">{sound.label}</span><span className="mt-0.5 block truncate text-[10.5px] text-ink-3">{sound.description}</span></span>
                {sound.id === selected.id && playing && <span className="flex h-4 items-end gap-0.5" aria-label="Playing"><i className="h-2 w-0.5 animate-pulse rounded-full bg-primary motion-reduce:animate-none" /><i className="h-4 w-0.5 animate-pulse rounded-full bg-primary [animation-delay:120ms] motion-reduce:animate-none" /><i className="h-3 w-0.5 animate-pulse rounded-full bg-primary [animation-delay:240ms] motion-reduce:animate-none" /></span>}
              </button>
            ))}
          </div>

          <div className="border-t border-line bg-surface-2/40 p-3">
            <label className="flex items-center gap-3">
              <Icon icon={Volume2} size={15} className="shrink-0 text-ink-3" />
              <span className="sr-only">Volume</span>
              <input type="range" min="0.05" max="0.75" step="0.01" value={preference.volume} onChange={(event) => setPreference((current) => ({ ...current, volume: Number(event.target.value) }))} className="h-6 min-w-0 flex-1 accent-primary" />
              <span className="tnum w-8 text-end font-mono text-[10.5px] text-ink-3">{Math.round(preference.volume * 100)}%</span>
            </label>
            <button type="button" onClick={() => void (playing ? pause() : play())} className="mt-2 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-primary-strong/25 bg-primary text-[13px] font-semibold text-on-primary shadow-action transition-[background-color,transform] hover:bg-primary-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <Icon icon={playing ? Pause : Play} size={15} /> {playing ? 'Pause' : `Play ${selected.label}`}
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center overflow-hidden rounded-xl border border-line bg-surface/95 shadow-pop backdrop-blur-sm">
        <button
          type="button"
          onClick={() => void (playing ? pause() : play())}
          className="grid size-11 place-items-center text-primary-strong transition-colors hover:bg-primary-tint focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
          aria-label={playing ? `Pause ${selected.label}` : `Play ${selected.label}`}
        >
          <Icon icon={playing ? Pause : Play} size={16} className={playing ? '' : 'translate-x-px'} />
        </button>
        <button type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} className="flex size-11 items-center justify-center gap-2 border-s border-line text-start transition-colors hover:bg-inset focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary sm:h-11 sm:w-auto sm:max-w-[10.5rem] sm:justify-start sm:pe-2.5 sm:ps-3">
          <Icon icon={AudioLines} size={14} className={cn('shrink-0 text-ink-3', playing && 'text-primary')} />
          <span className="hidden min-w-0 sm:block"><span className="block truncate text-[11.5px] font-semibold text-ink">{selected.label}</span><span className="block text-[9.5px] text-ink-3">{playing ? 'Playing softly' : 'Focus audio'}</span></span>
          <Icon icon={ChevronDown} size={13} className={cn('hidden shrink-0 text-ink-3 transition-transform sm:block', open && 'rotate-180')} />
        </button>
      </div>
    </div>
  )
}
