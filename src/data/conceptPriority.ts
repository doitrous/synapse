/**
 * `blueprintWeight`, said in exam language.
 *
 * The weight already exists, is already editable, and already decides what a
 * student studies next through `src/data/adaptive/priority.ts`. What it lacked
 * was any way to read it: 0.7 is not a sentence anyone says about an exam.
 *
 * So this is a vocabulary over one number, not a second number. A separate
 * priority field would be two values meaning one thing, free to disagree, with
 * nothing to say which wins.
 */

export interface PriorityBand {
  id: 'critical' | 'high' | 'standard' | 'background'
  label: string
  hint: string
  /** Inclusive. */
  min: number
  /** Exclusive, except for the top band. */
  max: number
}

export const PRIORITY_BANDS: PriorityBand[] = [
  { id: 'critical', label: 'Critical', hint: 'Comes up almost every sitting. A student who misses this loses marks.', min: 0.75, max: Infinity },
  { id: 'high', label: 'High', hint: 'Regularly examined. Worth deliberate revision time.', min: 0.5, max: 0.75 },
  { id: 'standard', label: 'Standard', hint: 'Examined sometimes. Covered by ordinary study.', min: 0.25, max: 0.5 },
  { id: 'background', label: 'Background', hint: 'Rarely examined directly. Supports understanding elsewhere.', min: 0, max: 0.25 },
]

export function bandOf(weight: number | undefined | null): PriorityBand {
  const value = typeof weight === 'number' && Number.isFinite(weight) ? weight : 0
  return PRIORITY_BANDS.find((band) => value >= band.min && value < band.max) ?? PRIORITY_BANDS[3]
}

/** The weight the middle of a band writes, so picking one is a real edit. */
export function weightForBand(id: PriorityBand['id']): number {
  const band = PRIORITY_BANDS.find((candidate) => candidate.id === id) ?? PRIORITY_BANDS[3]
  const top = band.max === Infinity ? 1 : band.max
  return Math.round(((band.min + top) / 2) * 100) / 100
}
