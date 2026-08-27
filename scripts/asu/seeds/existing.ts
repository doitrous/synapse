/**
 * Whether a concept ID this build is about to mint already has a home.
 *
 * `mintConceptId` (`types.ts`) is now a pure function of `(system,
 * canonicalKey)` alone — no module, no university — matching the shared
 * minting law (`tools/mint-concept-id.mjs`). So a hit here is never a
 * coincidence: the same medical idea mints the same ID everywhere, on
 * purpose. A record already carrying that ID — live, in either import-ready
 * queue, or in any university's pending Source-Imports batches — is the same
 * concept, and writing a full concept record for it would silently duplicate
 * work a reviewer would then have to notice and merge by hand. The caller
 * (`build-batches.ts`) writes a sparse update instead.
 *
 * Scanned fresh each build rather than cached: this toolchain runs once per
 * module invocation, and a stale hit list is worse than a slow one — see the
 * shared manual's "A stale registry deletes; it does not merely omit".
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'

export interface ExistingConcept {
  /**
   * Where the hit came from, for the build log — and which branch of the
   * three-outcome switch `build-batches.ts` takes. Starts `live:` for a hit
   * in `server/data/medical-library-v1.json` (a genuinely live concept — the
   * sparse update is safe to route into the normal batch, because the record
   * it updates already exists) or `pending:` for a hit only in someone's
   * not-yet-imported batch (the record does not exist yet, so a normal
   * "update" pointed at it would race the other lane's own import — routed to
   * `pending/…-PENDING-collision.md` instead, outside the kind folder's
   * import set, for a human to reconcile once the other batch lands).
   */
  where: string
  /**
   * The existing record's own label, re-emitted unchanged on an update.
   *
   * Not optional in practice: `detectBatchKind` (`src/data/batchKind.ts:44`)
   * recognises a row as a concept only by `has('label') || has('canonical_key')`
   * — verified empirically, not assumed, after a first draft of this file's
   * sparse update (id + list columns only, no label) came back `kind:
   * "unknown"` from both `medical:batch` and `medical:simulate`, which then
   * silently skipped it rather than erroring. So every update record needs
   * *a* label column to be recognised as a concept row at all, and it must be
   * the record's own existing wording — writing the newly-authored seed's
   * label instead would silently overwrite another university's phrasing of
   * the same idea purely to satisfy a detector.
   */
  label: string
  universities: string[]
  learnerYears: number[]
  moduleIds: string[]
  moduleSubjectPaths: string[]
  /** `exam_signal` lines exactly as they would be re-emitted, one per occurrence. */
  examSignal: string[]
  /** `exam_weight_by_year` lines, `KEY=weight` — a weight map, not a list column, so a leading `+` has no meaning here either; `conceptUpdateBlock` merges by key and re-emits the whole map. */
  examWeightByYear: string[]
}

/**
 * Overridable so the fixture proof (`scripts/asu/fixtures/`) can point this
 * at a throwaway directory instead of `server/data/medical-library-v1.json` —
 * the real live library must never be touched by a test, and a fixture that
 * cannot control what counts as "already live" cannot deterministically prove
 * the update-vs-full-record switch either way.
 */
const LIVE_STATE = process.env.ASU_TOOLCHAIN_LIVE_STATE ?? 'server/data/medical-library-v1.json'

/**
 * Every directory a pending or live batch could be sitting in.
 *
 * Overridable the same way and for the same reason: `ASU_TOOLCHAIN_PENDING_DIRS`
 * is a comma-separated list that, when set, replaces the real
 * `docs/import-ready`, `docs/questions-import-ready` and
 * `docs/*-Source-Imports` discovery entirely, so a fixture run cannot pick up
 * — or be defeated by — whatever real content happens to be sitting in this
 * checkout's `docs/` tree.
 */
function candidateDirs(): string[] {
  const override = process.env.ASU_TOOLCHAIN_PENDING_DIRS
  if (override) return override.split(',').map((s) => s.trim()).filter(Boolean)
  const dirs = ['docs/import-ready', 'docs/questions-import-ready']
  if (existsSync('docs')) {
    for (const entry of readdirSync('docs', { withFileTypes: true })) {
      if (entry.isDirectory() && entry.name.endsWith('-Source-Imports')) {
        dirs.push(`docs/${entry.name}`)
      }
    }
  }
  return dirs
}

/** Every `.md` file under a directory, recursively. `node:fs`'s own recursive listing (Node 20+). */
function markdownFiles(dir: string): string[] {
  if (!existsSync(dir)) return []
  return (readdirSync(dir, { recursive: true }) as string[])
    .filter((name) => name.endsWith('.md'))
    .map((name) => `${dir}/${name}`)
}

/** One `## key` block's raw text, or '' if the key is absent. */
function section(block: string, key: string): string {
  return block.match(new RegExp(`^## ${key}\\r?\\n([\\s\\S]*?)(?=\\n## |$)`, 'm'))?.[1]?.trim() ?? ''
}

/** A `## key` block read as a `|`-or-newline list. */
function list(block: string, key: string): string[] {
  const raw = section(block, key)
  if (!raw || raw === '[clear]') return []
  return raw.split(/\r?\n|\|/).map((s) => s.trim()).filter(Boolean)
}

function fromLiveState(id: string): ExistingConcept | null {
  if (!existsSync(LIVE_STATE)) return null
  let graph: { concepts?: Record<string, unknown>[] }
  try {
    const parsed = JSON.parse(readFileSync(LIVE_STATE, 'utf8'))
    graph = parsed.states?.['synapse-concept-graph-v2'] ?? { concepts: [] }
  } catch {
    return null
  }
  const hit = (graph.concepts ?? []).find((c) => c.id === id)
  if (!hit) return null
  const examSignal = hit.examSignal as { appearances?: Record<string, unknown>[] } | undefined
  const weightByYear = hit.examWeightByYear as Record<string, unknown> | undefined
  return {
    where: `live: ${String(hit.label ?? id)}`,
    label: String(hit.label ?? ''),
    universities: (hit.universityIds as string[] | undefined) ?? [],
    learnerYears: (hit.learnerYears as number[] | undefined) ?? [],
    moduleIds: (hit.moduleIds as string[] | undefined) ?? [],
    moduleSubjectPaths: (hit.moduleSubjectPaths as string[] | undefined) ?? [],
    examSignal: (examSignal?.appearances ?? []).map((a) =>
      [a.sourceId, a.tier, a.year, a.page ? `p${a.page}` : undefined, a.module]
        .filter(Boolean).join(' | ')),
    examWeightByYear: Object.entries(weightByYear ?? {}).map(([year, weight]) => `${year}=${weight}`),
  }
}

function fromPendingBatches(id: string): ExistingConcept | null {
  for (const dir of candidateDirs()) {
    for (const path of markdownFiles(dir)) {
      const text = readFileSync(path, 'utf8')
      for (const block of text.split(/^\s*---\s*$/m)) {
        if (section(block, 'id') !== id) continue
        return {
          where: `pending: ${path}`,
          label: section(block, 'label'),
          universities: list(block, 'universities'),
          learnerYears: list(block, 'learner_years').map(Number).filter(Number.isFinite),
          moduleIds: list(block, 'modules'),
          moduleSubjectPaths: section(block, 'module_subject').split('\n').map((s) => s.trim()).filter(Boolean),
          examSignal: section(block, 'exam_signal').split('\n').map((s) => s.trim()).filter(Boolean),
          examWeightByYear: section(block, 'exam_weight_by_year').split('\n').map((s) => s.trim()).filter(Boolean),
        }
      }
    }
  }
  return null
}

/** Look an ID up. Live state wins over a pending batch when both carry it — it is the fresher truth. */
export function findExistingConcept(id: string): ExistingConcept | null {
  return fromLiveState(id) ?? fromPendingBatches(id)
}
