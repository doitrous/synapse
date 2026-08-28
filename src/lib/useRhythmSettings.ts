import { useCallback, useMemo, useRef } from 'react'
import { useLocalJsonPreference } from './useLocalPreference'
import {
  DEFAULT_RHYTHM_SETTINGS,
  RHYTHM_SETTINGS_KEY,
  validateRhythmSettings,
  type RhythmSettings,
} from '@/data/flashcards/rhythm/rhythmSettings'
import { localDay } from '@/data/flashcards/time'

/**
 * The student's Study Rhythm preferences, read/written device-locally and always
 * returned in a fully-valid, deck-pruned shape.
 *
 * `settings` is `validateRhythmSettings` applied to the stored value against the
 * decks that currently exist, so a stale enum or a deleted excluded-deck id can
 * never reach the UI — pruning happens on every read, so a removed deck stops
 * filtering the rhythm without a destructive rewrite. Two actions are kept apart
 * on purpose (the spec is strict about this): `resetBaseline` moves only the
 * `ignoreBefore` reporting baseline to today and is undoable, preserving every
 * other preference and all cards/decks/schedules/events; `restoreDefaults`
 * returns the visual/behavioural preferences to their defaults but leaves the
 * baseline untouched.
 */
export interface RhythmSettingsApi {
  settings: RhythmSettings
  /** Merge a partial change and persist the validated result. */
  update: (patch: Partial<RhythmSettings>) => void
  /** Replace the whole settings object (validated before persisting). */
  set: (next: RhythmSettings) => void
  /** Set the reporting baseline (ignore-before) to the student's local today. */
  resetBaseline: (now: Date) => void
  /** Undo the most recent resetBaseline (restore the previous ignore-before). */
  undoReset: () => void
  /** Restore preferences to defaults, KEEPING the ignore-before baseline. */
  restoreDefaults: () => void
}

export function useRhythmSettings(liveDeckIds: ReadonlySet<string>): RhythmSettingsApi {
  const [raw, setRaw] = useLocalJsonPreference<RhythmSettings>(RHYTHM_SETTINGS_KEY, DEFAULT_RHYTHM_SETTINGS)
  const settings = useMemo(() => validateRhythmSettings(raw, liveDeckIds), [raw, liveDeckIds])
  // The ignore-before value from before the last resetBaseline, for one-step undo.
  const undoBaseline = useRef<string | null>(null)
  const hasUndo = useRef(false)

  const set = useCallback(
    (next: RhythmSettings) => setRaw(validateRhythmSettings(next, liveDeckIds)),
    [setRaw, liveDeckIds],
  )

  const update = useCallback(
    (patch: Partial<RhythmSettings>) =>
      setRaw((cur) => validateRhythmSettings({ ...validateRhythmSettings(cur, liveDeckIds), ...patch }, liveDeckIds)),
    [setRaw, liveDeckIds],
  )

  const resetBaseline = useCallback(
    (now: Date) => {
      setRaw((cur) => {
        const v = validateRhythmSettings(cur, liveDeckIds)
        undoBaseline.current = v.ignoreBefore
        hasUndo.current = true
        return { ...v, ignoreBefore: localDay(now) }
      })
    },
    [setRaw, liveDeckIds],
  )

  const undoReset = useCallback(() => {
    if (!hasUndo.current) return
    const restore = undoBaseline.current
    hasUndo.current = false
    setRaw((cur) => ({ ...validateRhythmSettings(cur, liveDeckIds), ignoreBefore: restore }))
  }, [setRaw, liveDeckIds])

  const restoreDefaults = useCallback(() => {
    setRaw((cur) => {
      const v = validateRhythmSettings(cur, liveDeckIds)
      // Preferences go back to default; the reporting baseline is a separate concern.
      return { ...DEFAULT_RHYTHM_SETTINGS, ignoreBefore: v.ignoreBefore }
    })
  }, [setRaw, liveDeckIds])

  return { settings, update, set, resetBaseline, undoReset, restoreDefaults }
}
