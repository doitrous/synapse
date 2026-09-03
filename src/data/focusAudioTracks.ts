import { Activity, CloudRain, Headphones, Music2, Waves, Wind } from 'lucide-react'

export type SoundId = 'lofi' | 'relaxing' | 'rain' | 'brown' | 'white' | 'beta'

interface SoundBase {
  id: SoundId
  label: string
  description: string
  icon: typeof Music2
}

/** Generated entirely by Web Audio at play time — no file needed. */
export interface SynthSound extends SoundBase {
  kind: 'synth'
}

/**
 * Backed by a looping audio file. The user drops the file into `public/audio/`
 * at `src`; until then the track is shown disabled (see `unavailable` on
 * `useFocusAudio`) rather than throwing.
 */
export interface FileSound extends SoundBase {
  kind: 'file'
  src: string
}

export type SoundChoice = SynthSound | FileSound

/**
 * The sound list. File-backed tracks need a real audio file dropped at the
 * exact path below — recommended format: mp3, seamless/loop-friendly (no
 * hard fade in/out at the boundary), a few minutes long is plenty since it
 * loops.
 *
 *   /audio/lofi.mp3      — "Lo-fi study"
 *   /audio/relaxing.mp3  — "Relaxing music"
 */
export const SOUNDS: SoundChoice[] = [
  { id: 'lofi', kind: 'file', src: '/audio/lofi.mp3', label: 'Lo-fi study', description: 'Looping lo-fi beat — drop lofi.mp3 in public/audio', icon: Headphones },
  { id: 'relaxing', kind: 'file', src: '/audio/relaxing.mp3', label: 'Relaxing music', description: 'Calm looping instrumental — drop relaxing.mp3 in public/audio', icon: Music2 },
  { id: 'rain', kind: 'synth', label: 'Window rain', description: 'Steady rainfall with a distant hush', icon: CloudRain },
  { id: 'brown', kind: 'synth', label: 'Brown noise', description: 'Deep, smooth focus noise', icon: Waves },
  { id: 'white', kind: 'synth', label: 'White noise', description: 'Even broadband sound', icon: Wind },
  { id: 'beta', kind: 'synth', label: 'Beta waves (14 Hz)', description: 'Binaural focus beat for long sessions — headphones required', icon: Activity },
]

/**
 * Old persisted `sound` ids that no longer exist, mapped to their closest
 * replacement so a stored `nishany.focusAudio.v1` pref from before this
 * change degrades gracefully instead of pointing at nothing. `lofi` needed no
 * entry: the id survived, only its engine changed from synth to file.
 */
export const SOUND_ID_MIGRATIONS: Partial<Record<string, SoundId>> = {
  soft: 'relaxing',
}
