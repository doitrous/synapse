/**
 * A corpus source index for the Ain Shams manifests.
 *
 *   node --experimental-strip-types scripts/asu/build-source-index.ts
 *
 * Copied from `scripts/kasr/build-source-index.ts`, which reads one manifest
 * (`kasr-y1-sources.json`) because Kasr's Year 1 toolchain has only one. Ain
 * Shams spans three years and LANE-BRIEF.md names three manifests —
 * `asu-y1-sources.json`, `asu-y2-sources.json`, `asu-y3-sources.json` — each
 * written by the intake lane, not this one. So this reads **every** manifest
 * present under the manifest directory matching `asu-y*-sources.json` and
 * merges them into one index, the same schema Kasr's writes, because
 * `validate-content-batch.mjs` looks for one `corpus-source-index.json`
 * regardless of how many years fed it.
 *
 * "Read them only if present, fail loudly when absent" (LANE-BRIEF.md §2):
 * this throws if it finds not a single manifest, rather than silently writing
 * an empty index that would make every citation in every batch fail with "not
 * a source the corpus contains" — a batch author would spend an afternoon
 * chasing a phantom bug in their own citations before finding the real cause
 * here.
 *
 * This mints nothing. Every ID, path and hash below is copied from a
 * manifest, which is itself generated from the files.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, isAbsolute, join } from 'node:path'

const REPO = process.cwd()
/**
 * Join REPO onto a path that might already be absolute.
 *
 * `node:path`'s `join()` does not special-case an absolute later segment the
 * way Python's `os.path.join` does: `join('/repo', '/private/tmp/x')` returns
 * `/repo/private/tmp/x`, silently nesting an absolute env-var override
 * (`ASU_TOOLCHAIN_OUT`, `ASU_TOOLCHAIN_MANIFEST_DIR`) inside the repo instead
 * of using it as given. Found the same bug in `build-coverage.ts` from a
 * stray `private/tmp/...` directory it wrote into the repo root during the
 * fixture proof.
 */
const under = (base: string, target: string) => isAbsolute(target) ? target : join(base, target)
/** Overridable so the fixture proof can point this at a throwaway manifest instead of the real intake output. */
const MANIFEST_DIR = process.env.ASU_TOOLCHAIN_MANIFEST_DIR ?? 'docs/Ain-Shams-Source-Imports/manifest'
const OUT = process.env.ASU_TOOLCHAIN_OUT
  ? `${process.env.ASU_TOOLCHAIN_OUT}/evidence/corpus-source-index.json`
  : 'docs/Ain-Shams-Source-Imports/evidence/corpus-source-index.json'

interface ManifestSource {
  sourceId: string
  corpusRelativePath: string
  sha256: string
  processingStatus: string
  pageCount: number | null
  fileType: string
  exclusionReason: string | null
}

const manifestFiles = existsSync(under(REPO, MANIFEST_DIR))
  ? readdirSync(under(REPO, MANIFEST_DIR)).filter((name) => /^asu-y\d+-sources\.json$/.test(name)).sort()
  : []
if (!manifestFiles.length) {
  throw new Error(
    `no "asu-y<N>-sources.json" manifest found under ${MANIFEST_DIR}. This build fails loudly rather `
    + 'than writing an empty source index — every citation in every batch would then fail with "not a '
    + 'source the corpus contains", for a reason that has nothing to do with the citation. The intake '
    + 'lane writes these; wait for at least one, or point ASU_TOOLCHAIN_MANIFEST_DIR at one for a test.')
}

const manifests = manifestFiles.map((name) => ({
  name,
  data: JSON.parse(readFileSync(under(REPO, `${MANIFEST_DIR}/${name}`), 'utf8')) as { generatedOn?: string; sources: ManifestSource[] },
}))

const sources: Record<string, unknown> = {}

/** Same ambiguous-path handling as Kasr's — see that file's comment for the incident this avoids. */
const paths = new Map<string, Set<string>>()
for (const { data } of manifests) {
  for (const source of data.sources) {
    const seen = paths.get(source.sourceId) ?? new Set<string>()
    seen.add(source.corpusRelativePath)
    paths.set(source.sourceId, seen)
  }
}

let excluded = 0
let ambiguous = 0
let crossManifestDuplicates = 0
const seenIn = new Map<string, string>()
for (const { name, data } of manifests) {
  for (const source of data.sources) {
    if (sources[source.sourceId] && seenIn.get(source.sourceId) !== name) crossManifestDuplicates += 1
    seenIn.set(source.sourceId, name)
    if (source.exclusionReason && !sources[source.sourceId]) excluded += 1
    const all = [...(paths.get(source.sourceId) ?? [])].sort()
    if (all.length > 1 && !sources[source.sourceId]) ambiguous += 1
    sources[source.sourceId] = {
      sourceRelativePath: all.length === 1 ? all[0] : null,
      sourceRelativePaths: all,
      sha256: source.sha256,
      processingStatus: source.processingStatus,
      pageCount: source.pageCount ?? null,
      languages: [],
      exclusionReason: source.exclusionReason ?? null,
    }
  }
}

mkdirSync(dirname(under(REPO, OUT)), { recursive: true })
writeFileSync(under(REPO, OUT), `${JSON.stringify({
  note: 'Every source ID the Ain Shams corpus contains, from its own manifests (one per year). '
    + 'A batch naming a src_ ID absent from here is naming a source that does not exist. '
    + 'Generated by scripts/asu/build-source-index.ts — do not hand-edit.',
  generatedFrom: manifestFiles.map((name) => `${MANIFEST_DIR}/${name}`),
  manifestGeneratedOn: Object.fromEntries(manifests.map(({ name, data }) => [name, data.generatedOn ?? null])),
  count: Object.keys(sources).length,
  sources,
}, null, 1)}\n`)

console.log(JSON.stringify({
  manifests: manifestFiles, sources: Object.keys(sources).length, excluded, ambiguous, crossManifestDuplicates, out: OUT,
}, null, 1))
