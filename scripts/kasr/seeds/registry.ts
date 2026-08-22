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
 * Order is priority order **within a module**, highest first, and
 * `build-batches.ts` relies on it: where two papers ask the same thing, the
 * first one listed supplies the concept and the rest are recorded as further
 * occurrences.
 *
 * The list itself is assembled from one file per intake year —
 * `registry-y1.ts` through `registry-y5.ts` — so a year's lane appends to its
 * own array instead of five (now potentially five-times-five) lanes
 * conflicting on one literal. Year 1 first, so nothing about its order — which
 * `build-batches.ts`'s "first listed wins" rule depends on — changes by this
 * split existing at all.
 */
import type { Paper } from './types.ts'
import { REGISTRATIONS_Y1 } from './registry-y1.ts'
import { REGISTRATIONS_Y2 } from './registry-y2.ts'
import { REGISTRATIONS_Y3 } from './registry-y3.ts'
import { REGISTRATIONS_Y4 } from './registry-y4.ts'
import { REGISTRATIONS_Y5 } from './registry-y5.ts'

/**
 * A paper, registered against its module and **not yet loaded**.
 *
 * 101's papers are hand-written TypeScript literals, which is the right shape
 * for a paper transcribed by hand. The rest arrive as JSON, because a paper is
 * read by something that produces data and hand-transcribing that into a `.ts`
 * literal is a step that can only lose fidelity. `paperFromJson` validates on
 * the way in — every `modulePath` against the module's own subject tree, every
 * scheme against its seeds — so a chapter renamed underneath a paper fails
 * there rather than resolving to nothing at import.
 *
 * The `load` thunk is the whole point of this shape. Registering the loaded
 * paper instead — `paperFromJson(…)` evaluated here — reads every module's seed
 * files at import time, before `process.argv` has been looked at. Five lanes
 * share this file and each has only its own seeds on disk, so
 * `build-batches.ts "104 CPS"` would die with `ENOENT … 102-INT/eoy-2025-199.json`:
 * a scoped build failing on a module it was explicitly told to skip. Nothing is
 * read until `build-batches.ts` has filtered on `module`.
 *
 * A missing file for a module you *did* ask for is still loud, which is the
 * behaviour worth keeping — that one means your own seeds are not where you
 * think they are.
 */
export interface Registration {
  module: string
  load: () => Paper
}

export const REGISTRATIONS: Registration[] = [
  ...REGISTRATIONS_Y1,
  ...REGISTRATIONS_Y2,
  ...REGISTRATIONS_Y3,
  ...REGISTRATIONS_Y4,
  ...REGISTRATIONS_Y5,
]

/**
 * 101's papers, loaded.
 *
 * Derived from `REGISTRATIONS` rather than listed a second time, so a paper
 * added to one cannot go missing from the other. Every 101 entry's `load` is a
 * reference to a static import, so calling them here reads nothing off disk —
 * which is what keeps this module importable by a build scoped to some other
 * module.
 *
 * 101 specifically, because its one consumer is `build-coverage.ts`, which is
 * the coverage ledger for module 101 and filters the manifest to it.
 */
export const PAPERS: Paper[] = REGISTRATIONS
  .filter((one) => one.module === '101 ISK')
  .map((one) => one.load())

/** How many questions each manifest source was seeded into. */
export function seededBySource(): Map<string, number> {
  const counts = new Map<string, number>()
  for (const paper of PAPERS) {
    counts.set(paper.source.id, (counts.get(paper.source.id) ?? 0) + paper.seeds.length)
  }
  return counts
}
