import { coveredCount } from './essay.ts'

/**
 * "Missed" for the essay bank.
 *
 * A written answer is marked by the student who wrote it, ticking the key
 * points they actually made — so the only figure the store holds is how many of
 * the key points were ticked, and the only honest reading of "missed" is *how
 * much of the answer was not there*.
 *
 * The rule: an essay counts as missed when it **has been marked** (`ticked` is
 * an array, not null) and **fewer than half of its key points were ticked**.
 *
 * Both halves matter. `ticked: null` means written-but-not-yet-marked, or only
 * revealed — see `useEssayAnswers` — and calling that a miss would put an
 * essay the student has not judged yet into the list of ones they got wrong.
 * An essay with no key points at all is skipped rather than counted as nought
 * out of nought.
 */

/** Below this share of the key points, the answer was not there. */
export const ESSAY_PASS_SHARE = 0.5

/** The shape this needs out of the essay bank. */
export interface EssayCollectionItem {
  id: string
  keyPoints: { id: string }[]
}

/**
 * The shape this needs out of one saved answer.
 *
 * Declared here rather than imported from `useEssayAnswers`, so this module
 * stays a pure data module with no path back into React. `EssayAnswer`
 * satisfies it structurally.
 */
export interface EssayMarking {
  ticked: string[] | null
  updatedAt?: string
}

/**
 * The essays this student marked themselves down on, most recently marked first.
 *
 * An essay the bank no longer publishes is never returned — the same reason a
 * withdrawn station is left out of the practical list.
 */
export function missedEssayIds(
  answers: Record<string, EssayMarking>,
  essays: EssayCollectionItem[],
): string[] {
  const missed: { id: string; at: string }[] = []

  for (const essay of essays) {
    const answer = answers[essay.id]
    if (!answer) continue
    const covered = coveredCount(answer.ticked ?? null, essay.keyPoints.map((point) => point.id))
    // Null is "not marked yet", and nought key points is nothing to be short of.
    if (!covered || covered.total === 0) continue
    if (covered.covered / covered.total < ESSAY_PASS_SHARE) missed.push({ id: essay.id, at: answer.updatedAt ?? '' })
  }

  return missed
    .sort((a, b) => (b.at.localeCompare(a.at) || a.id.localeCompare(b.id)))
    .map((entry) => entry.id)
}
