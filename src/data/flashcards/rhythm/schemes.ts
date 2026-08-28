/**
 * Study Rhythm colour scheme registry.
 *
 * Pure string builders over the `--rhythm-*` CSS custom properties declared
 * in `src/index.css` (one set of 6 levels × 6 schemes inside each of the
 * light / warm / dark theme scopes). This file holds no colour values of its
 * own — it only names the schemes and maps a `RhythmColorScheme` to the
 * `var(--rhythm-<scheme>-<level>)` references the UI reads, so the actual
 * hues stay themeable from CSS alone and this module never has to know which
 * theme is active.
 */

import type { RhythmColorScheme } from './rhythmSettings.ts'

export interface RhythmSchemeMeta {
  id: RhythmColorScheme
  label: string
}

export const RHYTHM_SCHEMES: RhythmSchemeMeta[] = [
  { id: 'crimson', label: 'Cortex Crimson' },
  { id: 'blue', label: 'Cortex Blue' },
  { id: 'teal', label: 'Clinical Teal' },
  { id: 'amber', label: 'Amber' },
  { id: 'violet', label: 'Violet' },
  { id: 'mono', label: 'High-contrast mono' },
]

/** Number of intensity levels in every ramp (0 = no data … 5 = max intensity). */
const RHYTHM_RAMP_LEVELS = 6

/** The 6 ramp colours (level 0..5) for a scheme, as CSS var() references. */
export function rhythmRampVars(scheme: RhythmColorScheme): string[] {
  return Array.from({ length: RHYTHM_RAMP_LEVELS }, (_, level) => `var(--rhythm-${scheme}-${level})`)
}

/** The no-data / empty-cell colour for a scheme (== level 0). */
export function rhythmEmptyVar(scheme: RhythmColorScheme): string {
  return `var(--rhythm-${scheme}-0)`
}
