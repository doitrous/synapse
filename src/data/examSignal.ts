/**
 * Why a concept is weighted the way it is.
 *
 * A concept's exam weight was a single number. It had to answer several
 * different questions at once — was this on an orientation or a department
 * quiz, has it come up four times or once, was that last year or five years
 * ago, and how sure are we — and a number that answers all of those answers
 * none of them legibly. Once the extraction programme starts folding hundreds
 * of past papers into these weights, "0.7" stops being reviewable: nobody can
 * tell a concept that appeared once on last year's final from one that appeared
 * four times a decade ago, and nobody can correct either.
 *
 * So the inputs are kept, and the number is derived from them. Every part of
 * this record is inspectable and none of it is lost when the weight is
 * recomputed — which matters because the weighting rules will change, and when
 * they do the evidence must not have to be gathered again.
 */

/** The kinds of paper a concept can turn up on, strongest first. */
export const EXAM_SOURCE_TIERS = [
  'orientation',
  'end_of_year',
  'end_of_module',
  'baqoon',
  'department_book',
  'department_questions',
  'other',
] as const

export type ExamSourceTier = (typeof EXAM_SOURCE_TIERS)[number]

/**
 * How much each tier counts.
 *
 * Orientation material is the strongest signal there is: it is the faculty
 * saying what the final will cover. End-of-year and end-of-module papers are
 * the exam itself and rank together — they differ in *which* exam they predict,
 * not in how much they are worth. Baqoon is a resit of the same paper, which
 * makes it real evidence and slightly weaker than the main sitting.
 */
export const TIER_WEIGHT: Record<ExamSourceTier, number> = {
  orientation: 1,
  end_of_year: 0.9,
  end_of_module: 0.9,
  baqoon: 0.8,
  department_book: 0.6,
  department_questions: 0.5,
  other: 0.3,
}

/** One appearance of a concept on one paper. */
export interface ExamAppearance {
  /** The manifest's `sourceId`, so an appearance resolves back to a file. */
  sourceId: string
  tier: ExamSourceTier
  /** The year the paper was sat, not the cohort that sat it. */
  sittingYear?: number
  /** Where in the file, so a reviewer can go and look. */
  page?: number
  moduleId?: string
  /** `first`, `second`, `third` — a resit is still an appearance. */
  sitting?: string
}

export interface ExamSignal {
  appearances: ExamAppearance[]
  /**
   * How much to trust this, 0 to 1. Low when the appearances came from OCR of a
   * poor scan, or when the extraction was uncertain which concept a question
   * was really about.
   */
  confidence?: number
}

/** The strongest tier a concept has appeared at, or null when it never has. */
export function bestTier(signal: ExamSignal): ExamSourceTier | null {
  let best: ExamSourceTier | null = null
  for (const appearance of signal.appearances) {
    if (!best || TIER_WEIGHT[appearance.tier] > TIER_WEIGHT[best]) best = appearance.tier
  }
  return best
}

/** The most recent year this appeared, or null when no appearance names one. */
export function mostRecentYear(signal: ExamSignal): number | null {
  const years = signal.appearances.map((a) => a.sittingYear).filter((y): y is number => typeof y === 'number')
  return years.length ? Math.max(...years) : null
}

/** How many separate papers this appeared on. */
export function appearanceCount(signal: ExamSignal): number {
  return new Set(signal.appearances.map((a) => a.sourceId)).size
}

/**
 * How much recency is worth, from 1 for this year down to a floor.
 *
 * Older material is still valid — anatomy did not change — so this decays
 * towards a floor rather than to zero. A concept last examined six years ago
 * should rank below one examined last year and should not vanish.
 */
export const RECENCY_FLOOR = 0.45

export function recencyFactor(year: number | null, currentYear: number): number {
  if (year === null) return RECENCY_FLOOR
  const age = Math.max(0, currentYear - year)
  return Math.max(RECENCY_FLOOR, 1 - age * 0.11)
}

/**
 * How much repetition is worth.
 *
 * A concept that has come up on four papers is more likely to come up again
 * than one that has come up once, but not four times as likely, so this rises
 * and flattens. Capped, or a concept on every paper in the corpus would crowd
 * out everything else in a block.
 */
export function frequencyFactor(count: number): number {
  if (count <= 0) return 0
  return Math.min(1, 0.55 + Math.log2(count) * 0.22)
}

/**
 * The single number the blueprint consumes, derived from the parts above.
 *
 * Derived on every read rather than stored: a stored copy is a second source of
 * truth for the same fact, and the moment the rules here change it becomes a
 * lie that nothing recomputes.
 */
export function derivedExamWeight(
  signal: ExamSignal,
  options: { currentYear: number },
): number {
  if (!signal.appearances.length) return 0
  const tier = bestTier(signal)
  const weight = tier ? TIER_WEIGHT[tier] : TIER_WEIGHT.other
  const value = weight
    * recencyFactor(mostRecentYear(signal), options.currentYear)
    * frequencyFactor(appearanceCount(signal))
    * (signal.confidence ?? 1)
  return Math.max(0, Math.min(1, value))
}

/**
 * The weight, and every input that produced it, for a reviewer.
 *
 * This exists so an admin looking at a surprising weight can see which papers
 * put it there without reading the code — which is the whole reason the parts
 * are kept.
 */
export function explainExamWeight(signal: ExamSignal, options: { currentYear: number }) {
  const tier = bestTier(signal)
  const year = mostRecentYear(signal)
  const count = appearanceCount(signal)
  return {
    weight: derivedExamWeight(signal, options),
    strongestTier: tier,
    tierWeight: tier ? TIER_WEIGHT[tier] : null,
    mostRecentYear: year,
    recencyFactor: recencyFactor(year, options.currentYear),
    appearanceCount: count,
    frequencyFactor: frequencyFactor(count),
    confidence: signal.confidence ?? 1,
    appearances: signal.appearances,
  }
}

/**
 * Read a concept's appearances out of an import cell.
 *
 * One per line, as the manifest already knows them:
 *
 * ```
 * src_1a2b3c | end_of_year | 2025 | p14 | 101 ISK
 * src_9f8e7d | orientation | 2024
 * ```
 *
 * The source ID comes first because it is the part that must resolve — an
 * appearance that cannot be traced back to a file is not evidence, and the
 * validator checks it against the corpus index.
 */
export function parseExamAppearances(raw: string | undefined): ExamAppearance[] {
  if (!raw?.trim()) return []
  const out: ExamAppearance[] = []
  for (const line of raw.split('\n')) {
    if (!line.trim()) continue
    const parts = line.split('|').map((part) => part.trim()).filter(Boolean)
    if (!parts.length) continue
    const [sourceId, tier, year, ...rest] = parts
    if (!sourceId) continue
    const appearance: ExamAppearance = {
      sourceId,
      tier: (EXAM_SOURCE_TIERS as readonly string[]).includes(tier) ? tier as ExamSourceTier : 'other',
    }
    const parsedYear = Number(year)
    if (Number.isFinite(parsedYear) && parsedYear > 1900) appearance.sittingYear = parsedYear
    for (const extra of rest) {
      const page = extra.match(/^p\.?\s*(\d+)$/i)
      if (page) appearance.page = Number(page[1])
      else appearance.moduleId = extra
    }
    out.push(appearance)
  }
  return out
}

/** Everything wrong with an appearance list, in words an author can act on. */
export function examSignalErrors(raw: string | undefined, appearances: readonly ExamAppearance[]): string[] {
  const errors: string[] = []
  const lines = (raw ?? '').split('\n').filter((line) => line.trim()).length
  if (lines > appearances.length) {
    const lost = lines - appearances.length
    errors.push(`${lost} exam appearance line${lost === 1 ? '' : 's'} could not be read — write each as "src_… | tier | year"`)
  }
  for (const appearance of appearances) {
    if (!/^src_[0-9a-f]+$/i.test(appearance.sourceId)) {
      errors.push(`Exam appearance "${appearance.sourceId}" is not a manifest source ID — an appearance that cannot be traced to a file is not evidence`)
    }
  }
  return errors
}
