/**
 * A corpus source index for every Kasr Al Ainy intake-year manifest present.
 *
 *   node --experimental-strip-types scripts/kasr/build-source-index.ts
 *
 * `scripts/build-corpus-source-index.mjs` walks `corpus/01-explicitly-taught/`
 * and indexes 267 sources. The Kasr corpus went through a different intake
 * (`scripts/corpus-intake/`) and lands in
 * `docs/Kasr-Source-Imports/manifest/kasr-y<N>-sources.json`, one file per
 * intake year, instead — so none of those files appear in that index. A
 * citation naming one of them therefore trips `is not a source the corpus
 * contains` — for a file that is real, checksummed and sitting on disk.
 *
 * `validate-content-batch.mjs:500` looks for `corpus-source-index.json` in the
 * `evidence/` folder beside the batch it is validating, so this writes one
 * there, in that file's own schema. It indexes **every manifest currently on
 * disk**, not one module and not one year: every module lane needs the same
 * file, and identical bytes in every branch is the one version of this that
 * does not conflict on merge. A year with no manifest yet is skipped rather
 * than erroring — this file reports what the corpus contains today.
 *
 * This mints nothing. Every ID, path and hash below is copied from a
 * manifest, which is itself generated from the files. An ID that is not in
 * any manifest is still an invented ID and still refused.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { allManifestPaths } from './manifest.ts'

const REPO = process.cwd()
const OUT = 'docs/Kasr-Source-Imports/evidence/corpus-source-index.json'

interface ManifestSource {
  sourceId: string
  corpusRelativePath: string
  sha256: string
  processingStatus: string
  pageCount: number | null
  fileType: string
  exclusionReason: string | null
}

const MANIFESTS = allManifestPaths(REPO)
const manifests = MANIFESTS.map((path) => ({
  path,
  data: JSON.parse(readFileSync(join(REPO, path), 'utf8')) as { generatedOn?: string; sources: ManifestSource[] },
}))

// All rows from every manifest, concatenated in manifest order (Year 1 first —
// `allManifestPaths` sorts by filename, and `kasr-y1-…` sorts before
// `kasr-y2-…`). Processing Year 1's rows first, in the same relative order
// they have always been in, is what keeps a Year 1-only regeneration
// byte-identical to before this file read more than one manifest.
const allSources: ManifestSource[] = manifests.flatMap((m) => m.data.sources)

const sources: Record<string, unknown> = {}

/**
 * Fourteen source IDs are on more than one manifest row within Year 1 — the
 * same bytes filed under two names, or under two modules. The ID is
 * content-addressed, so both rows are the same file and both paths are true.
 * The same can happen **across** manifests too — a Year 2 file that happens to
 * share bytes with a Year 1 one is one source with rows in two different
 * manifest files — so this map is built from every manifest's rows together,
 * not manifest by manifest.
 *
 * This used to assign row-by-row, so the **last row won** and the reported path
 * depended on manifest order. Nothing about that order is stable across a
 * regeneration, and it bit a lane for real: it corrected a record to match the
 * index, regenerated, and the same record failed again with the error reversed —
 * same file, same ID, same bytes.
 *
 * So an ambiguous ID now reports **no** single path. `sourceRelativePath` is
 * null and `sourceRelativePaths` carries all of them, sorted. A consumer that
 * wants to assert a path can assert against the set; one that wants a single
 * answer is told there isn't one, which is the truth. An arbitrary pick makes
 * every downstream assertion a coin flip, and a *stable* arbitrary pick only
 * hides that it was a flip.
 */
const paths = new Map<string, Set<string>>()
for (const source of allSources) {
  const seen = paths.get(source.sourceId) ?? new Set<string>()
  seen.add(source.corpusRelativePath)
  paths.set(source.sourceId, seen)
}

let excluded = 0
let ambiguous = 0
for (const source of allSources) {
  // An excluded file is still a file the corpus contains. The exclusion is a
  // decision about whether to extract from it, not a claim that it is absent —
  // and a citation that names one should fail on the exclusion, with a reason,
  // rather than on "this source does not exist", which would be untrue.
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

mkdirSync(dirname(join(REPO, OUT)), { recursive: true })
writeFileSync(join(REPO, OUT), `${JSON.stringify({
  note: 'Every source ID the Kasr Al Ainy corpus contains, from every intake-year manifest present '
    + 'on disk. A batch naming a src_ ID absent from here is naming a source that does not exist. '
    + 'Generated by scripts/kasr/build-source-index.ts — do not hand-edit.',
  generatedFrom: MANIFESTS,
  manifestGeneratedOn: Object.fromEntries(manifests.map((m) => [m.path, m.data.generatedOn ?? null])),
  count: Object.keys(sources).length,
  sources,
}, null, 1)}\n`)

console.log(JSON.stringify({
  manifests: MANIFESTS, sources: Object.keys(sources).length, excluded, ambiguous, out: OUT,
}, null, 1))
