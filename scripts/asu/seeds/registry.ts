/**
 * Every paper that has been read, in priority order.
 *
 * Copied from `scripts/kasr/seeds/registry.ts`, emptied of Kasr's papers.
 * See that file for the full rationale behind the `load` thunk and the
 * priority ordering; unchanged here.
 *
 * Its own module rather than a constant inside `build-batches.ts`, because
 * that script writes batch files the moment it is imported — so nothing else
 * could ask it what had been read without rewriting the whole of
 * `docs/Ain-Shams-Source-Imports` as a side effect.
 *
 * Order is priority order **within a module**, highest first, and
 * `build-batches.ts` relies on it: where two papers ask the same thing, the
 * first one listed supplies the concept and the rest are recorded as further
 * occurrences.
 *
 * Register new papers here as `import { paperFromJson } from './from-json.ts'`
 * entries — Ain Shams has no hand-transcribed TypeScript papers the way
 * Kasr's `101 ISK` does, since none of this corpus predates `from-json.ts`
 * being the loader. A test-only fixture module is registered by the fixture
 * script itself (`scripts/asu/fixtures/`), not here — this file is real
 * papers only.
 */
import type { Paper } from './types.ts'

/**
 * A paper, registered against its module and **not yet loaded**.
 *
 * The `load` thunk is the whole point of this shape — see the Kasr original
 * for why: reading every module's seed files at import time would mean
 * `build-batches.ts "ASU-Y2-CVS"` dies on `ENOENT` for a Year 1 module's
 * files it was explicitly told to skip.
 */
export interface Registration {
  module: string
  load: () => Paper
}

export const REGISTRATIONS: Registration[] = []

/**
 * How many questions each manifest source was seeded into, for one module.
 *
 * Takes a module argument, unlike Kasr's `seededBySource`, which is
 * hardwired to `101 ISK` because Kasr's `build-coverage.ts` only ever covered
 * that one module. This toolchain's `build-coverage.ts` covers whichever
 * module it is asked about (see that file), so this filters **before**
 * calling any `load()` — reading only the module asked for, on the same
 * reasoning `REGISTRATIONS` itself is lazy: a coverage run for `ASU_Y2`'s CVS
 * module must not `ENOENT` on a Year 1 module's files it was never asked
 * about.
 */
export function seededBySource(module: string): Map<string, number> {
  const counts = new Map<string, number>()
  for (const entry of REGISTRATIONS.filter((one) => one.module === module)) {
    const paper = entry.load()
    counts.set(paper.source.id, (counts.get(paper.source.id) ?? 0) + paper.seeds.length)
  }
  return counts
}
