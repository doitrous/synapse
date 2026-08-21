/**
 * Every paper that has been read, in priority order.
 *
 * Its own module rather than a constant inside `build-batches.ts`, because that
 * script writes batch files the moment it is imported — so nothing else could
 * ask it what had been read without rewriting the whole of
 * `docs/Kasr-Source-Imports` as a side effect.
 *
 * The coverage ledger needs exactly that question answered. It used to build its
 * tally from the extractor JSON alone, which meant a paper read directly into a
 * seed file — transcribed question by question, with a mark scheme against each
 * — was reported as **not yet read**, while a paper the OCR pipeline had merely
 * skimmed counted as read in full. The 2023 Baqoon resit was the case in point:
 * thirteen questions seeded from a clean native text layer, and the one artefact
 * whose job is to say what has been done called it untouched.
 *
 * Order is priority order, highest first, and `build-batches.ts` relies on it:
 * where two papers ask the same thing, the first one listed supplies the concept
 * and the rest are recorded as further occurrences.
 */
import type { Paper } from './types.ts'
import { PAPER as EOY_2025 } from './101-eoy-2025.ts'
import { PAPER as EOY_2024 } from './101-eoy-2024.ts'
import { PAPER as EOY_2022 } from './101-eoy-2022.ts'
import { PAPER as EOY_2022_SECOND } from './101-eoy-2022-second.ts'
import { PAPER as CASES_2025 } from './101-eoy-2025-cases.ts'
import { PAPER as BAQOON_2024 } from './101-baqoon-2024.ts'
import { PAPER as BAQOON_2023 } from './101-baqoon-2023.ts'

export const PAPERS: Paper[] = [
  EOY_2025, EOY_2024, EOY_2022, EOY_2022_SECOND, BAQOON_2024, BAQOON_2023, CASES_2025,
]

/** How many questions each manifest source was seeded into. */
export function seededBySource(): Map<string, number> {
  const counts = new Map<string, number>()
  for (const paper of PAPERS) {
    counts.set(paper.source.id, (counts.get(paper.source.id) ?? 0) + paper.seeds.length)
  }
  return counts
}
