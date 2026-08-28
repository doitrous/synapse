/**
 * The seven study flags: their order, their colour token, and their name.
 *
 * Order is Anki's, so `Cmd/Ctrl+1..7` maps straight onto it. Each flag resolves
 * to a theme-aware CSS custom property rather than a hard-coded hex, so a flag
 * follows light/warm/dark like everything else. The English name travels with
 * the flag everywhere it is shown — a flag is never signalled by colour alone,
 * which is both the accessibility rule and what makes `flag:red` searchable.
 */

import { FLAG_ORDER, type FlagColor } from './model.ts'

export interface FlagMeta {
  color: FlagColor
  label: string
  /** A CSS `var(--color-flag-*)` reference for inline colour. */
  token: string
}

export const FLAG_META: Record<FlagColor, FlagMeta> = {
  red: { color: 'red', label: 'Red', token: 'var(--color-flag-red)' },
  orange: { color: 'orange', label: 'Orange', token: 'var(--color-flag-orange)' },
  green: { color: 'green', label: 'Green', token: 'var(--color-flag-green)' },
  blue: { color: 'blue', label: 'Blue', token: 'var(--color-flag-blue)' },
  pink: { color: 'pink', label: 'Pink', token: 'var(--color-flag-pink)' },
  turquoise: { color: 'turquoise', label: 'Turquoise', token: 'var(--color-flag-turquoise)' },
  purple: { color: 'purple', label: 'Purple', token: 'var(--color-flag-purple)' },
}

export const FLAGS: FlagMeta[] = FLAG_ORDER.map((color) => FLAG_META[color])

/** The flag a `Cmd/Ctrl+1..7` press toggles (1-indexed); null outside 1..7. */
export function flagForDigit(digit: number): FlagColor | null {
  return FLAG_ORDER[digit - 1] ?? null
}

/** The 1-based position of a flag, for building its `Cmd+N` shortcut label. */
export function digitForFlag(flag: FlagColor): number {
  return FLAG_ORDER.indexOf(flag) + 1
}
