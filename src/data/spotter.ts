/**
 * Spotter — the practical histology exam turned into a race.
 *
 * A slide appears with one structure pinned but unnamed; the student names it
 * before their opponent does. Like Term Grid, a Spotter game is shared as a
 * link carrying a seed rather than a row in a table, so `buildSpotter` has to
 * be a pure function of its inputs — same slides and seed, same game, down to
 * the option order — with every draw coming from `seededRandom`. A stray
 * `Math.random()` here would give two people sitting the "same" spotter round
 * different structures with no error to notice.
 *
 * Pure module: no React, no storage, no clock.
 */

import { seededRandom, shuffle } from './seededRandom.ts'
import { objectivesOf, structuresAt, type HistologySlide, type Objective, type SlideStructure } from './histology.ts'

export interface SpotterRound {
  slideId: string
  slideTitle: string
  objective: Objective
  /** The structure being asked about — its pin is shown, its label is not. */
  structureId: string
  at: { x: number; y: number }
  /** The correct label plus distractors, already shuffled. */
  options: string[]
  answer: string
}

export interface SpotterGame {
  rounds: SpotterRound[]
  /** Why there is no game, when there are no rounds. */
  refusal: 'too_few_structures' | 'too_few_labels' | null
}

export const ROUNDS = 8
export const OPTIONS_PER_ROUND = 4
export const MIN_LABELS = OPTIONS_PER_ROUND // need enough distinct labels to fill one question

/** One structure, at one objective it is actually pinned at, on one slide. */
interface Candidate {
  slide: HistologySlide
  objective: Objective
  structure: SlideStructure
}

/**
 * Every askable (slide, objective, structure) triple.
 *
 * "Askable" means pinned at that objective specifically — `structuresAt`
 * is what keeps a structure pinned only at 4× from ever being asked at 40×,
 * since the pin the student would be shown simply does not exist there.
 */
function candidatesOf(slides: HistologySlide[]): Candidate[] {
  const candidates: Candidate[] = []
  for (const slide of slides) {
    for (const objective of objectivesOf(slide)) {
      for (const structure of structuresAt(slide, objective)) {
        candidates.push({ slide, objective, structure })
      }
    }
  }
  return candidates
}

/**
 * Distractor labels for one round, same-subject first.
 *
 * A structure never offers itself as a distractor for its own question — that
 * is enforced by label rather than id, so a structure elsewhere sharing the
 * exact same label as the answer is excluded too, which is what "never equal
 * to the answer" actually requires: two options reading identically would be
 * indistinguishable to the student regardless of which structure backs them.
 */
function distractorsFor(
  answer: SlideStructure,
  subjectId: string,
  slides: HistologySlide[],
  random: () => number,
): string[] {
  const sameSubject = new Set<string>()
  const otherSubject = new Set<string>()
  for (const slide of slides) {
    const bucket = slide.subjectId === subjectId ? sameSubject : otherSubject
    for (const structure of slide.structures) {
      if (structure.label === answer.label) continue
      bucket.add(structure.label)
    }
  }

  const needed = OPTIONS_PER_ROUND - 1
  const fromSameSubject = shuffle([...sameSubject], random).slice(0, needed)
  if (fromSameSubject.length >= needed) return fromSameSubject

  const stillNeeded = needed - fromSameSubject.length
  const fromElsewhere = shuffle([...otherSubject], random).slice(0, stillNeeded)
  return [...fromSameSubject, ...fromElsewhere]
}

/**
 * Build the game.
 *
 * @param slides  the published slides the game may draw structures from
 * @param seed    the number carried in the shared link; the whole game
 *                follows from it
 * @param rounds  ceiling on how many rounds the game holds. Fewer askable
 *                structures than this shortens the game rather than repeating
 *                one.
 */
export function buildSpotter(slides: HistologySlide[], seed: number, rounds: number = ROUNDS): SpotterGame {
  const candidates = candidatesOf(slides)
  // Nothing pinned anywhere means nothing can ever be asked, whatever the
  // label count says — checked before the label floor, not after.
  if (candidates.length === 0) return { rounds: [], refusal: 'too_few_structures' }

  const distinctLabels = new Set(slides.flatMap((slide) => slide.structures.map((s) => s.label)))
  // Below the floor, every round would either repeat an option or hand back
  // fewer than OPTIONS_PER_ROUND choices — a game that reads as broken rather
  // than merely short. Refuse instead of thinning the options.
  if (distinctLabels.size < MIN_LABELS) return { rounds: [], refusal: 'too_few_labels' }

  const random = seededRandom(seed)
  const order = shuffle(candidates, random)

  const askedStructureIds = new Set<string>()
  const built: SpotterRound[] = []

  for (const candidate of order) {
    if (built.length >= rounds) break
    // The same structure can be pinned at more than one objective, which would
    // otherwise offer it as two different candidates — collapse to one ask.
    if (askedStructureIds.has(candidate.structure.id)) continue
    askedStructureIds.add(candidate.structure.id)

    const distractors = distractorsFor(candidate.structure, candidate.slide.subjectId, slides, random)
    const options = shuffle([candidate.structure.label, ...distractors], random)

    built.push({
      slideId: candidate.slide.id,
      slideTitle: candidate.slide.title,
      objective: candidate.objective,
      structureId: candidate.structure.id,
      // structuresAt already guarantees this objective is present in `at`.
      at: candidate.structure.at[candidate.objective]!,
      options,
      answer: candidate.structure.label,
    })
  }

  return { rounds: built, refusal: null }
}
