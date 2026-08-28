/**
 * Study Rhythm colour scheme registry.
 *
 * Maps a `RhythmColorScheme` to the `var(--rhythm-<scheme>-<level>)` references
 * the UI reads; the actual hues live in `src/index.css` (6 levels × 6 schemes
 * inside each light / warm / dark theme scope), so they stay themeable from CSS
 * alone and this module never has to know which theme is active.
 *
 * The `var(...)` references are written out as LITERAL strings, not built with a
 * template — Tailwind v4 tree-shakes `@theme` custom properties whose `var()`
 * references it cannot find as literal text in the source, so a dynamically
 * assembled name (`var(--rhythm-${scheme}-${i})`) would let the ramps be pruned
 * from the compiled CSS and the cells would render transparent. Keeping the full
 * names here is what pins the tokens into the build.
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

/**
 * The 6 ramp colours (level 0..5) for each scheme, as literal CSS var()
 * references. Literal (not template-built) so the CSS build retains the tokens.
 */
const RHYTHM_RAMPS: Record<RhythmColorScheme, readonly string[]> = {
  crimson: [
    'var(--rhythm-crimson-0)', 'var(--rhythm-crimson-1)', 'var(--rhythm-crimson-2)',
    'var(--rhythm-crimson-3)', 'var(--rhythm-crimson-4)', 'var(--rhythm-crimson-5)',
  ],
  blue: [
    'var(--rhythm-blue-0)', 'var(--rhythm-blue-1)', 'var(--rhythm-blue-2)',
    'var(--rhythm-blue-3)', 'var(--rhythm-blue-4)', 'var(--rhythm-blue-5)',
  ],
  teal: [
    'var(--rhythm-teal-0)', 'var(--rhythm-teal-1)', 'var(--rhythm-teal-2)',
    'var(--rhythm-teal-3)', 'var(--rhythm-teal-4)', 'var(--rhythm-teal-5)',
  ],
  amber: [
    'var(--rhythm-amber-0)', 'var(--rhythm-amber-1)', 'var(--rhythm-amber-2)',
    'var(--rhythm-amber-3)', 'var(--rhythm-amber-4)', 'var(--rhythm-amber-5)',
  ],
  violet: [
    'var(--rhythm-violet-0)', 'var(--rhythm-violet-1)', 'var(--rhythm-violet-2)',
    'var(--rhythm-violet-3)', 'var(--rhythm-violet-4)', 'var(--rhythm-violet-5)',
  ],
  mono: [
    'var(--rhythm-mono-0)', 'var(--rhythm-mono-1)', 'var(--rhythm-mono-2)',
    'var(--rhythm-mono-3)', 'var(--rhythm-mono-4)', 'var(--rhythm-mono-5)',
  ],
}

/** The 6 ramp colours (level 0..5) for a scheme, as CSS var() references. */
export function rhythmRampVars(scheme: RhythmColorScheme): readonly string[] {
  return RHYTHM_RAMPS[scheme] ?? RHYTHM_RAMPS.crimson
}

/** The no-data / empty-cell colour for a scheme (== level 0). */
export function rhythmEmptyVar(scheme: RhythmColorScheme): string {
  return rhythmRampVars(scheme)[0]
}
