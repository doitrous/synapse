/**
 * Every manifest ID cited anywhere under the import root must exist.
 *
 *   node --experimental-strip-types scripts/kasr/check-citations.ts
 *
 * The subject tree for 101 ISK cited `src_5c8bb4bf7f1b32c9f3a1` for eleven
 * days. No such row exists — the ID had been written before the manifest was
 * generated and never checked against it. Nothing failed, because nothing
 * looked: a citation is only load-bearing when someone tries to follow it, and
 * by then the person following it is a reviewer who cannot find the page.
 *
 * These IDs are content-addressed — `src_` plus the first twenty hex of the
 * file's sha256 — so a wrong one is not a near miss that a human would spot. It
 * is a plausible-looking string pointing at nothing. `src_kau_y1_101_eoy_199`
 * read like provenance for eleven days and named no file at all.
 *
 * Exits non-zero on a dangling citation, so it can be wired into CI.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = 'docs/Kasr-Source-Imports'
const MANIFEST = `${ROOT}/manifest/kasr-y1-sources.json`

const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'))
const known = new Set<string>(manifest.sources.map((source: { sourceId: string }) => source.sourceId))

/**
 * The 47 sources that are live but not in this manifest.
 *
 * They came from an earlier pipeline run and `12-resources.md` documents them
 * as a known false alarm: "a citation naming one of them trips the guard with
 * 'is not a source the corpus contains' even though the source is perfectly
 * real and live". A concept batch that *updates* a live record inherits its
 * `resource_ids`, so it inherits those IDs too — correctly, and with no way to
 * drop them without detaching the concept from a source that does exist.
 *
 * Read from live state rather than hard-coded, so the set cannot go stale: if
 * a legacy source is retired, this stops accepting it the same day.
 *
 * Live-but-unindexed is fine. Neither live nor in the manifest is the failure
 * this check exists for, and that still fails.
 */
const LIVE = 'server/data/medical-library-v1.json'
let live = new Set<string>()
try {
  const state = JSON.parse(readFileSync(LIVE, 'utf8')).states['nishany-medical-evidence-v1']
  live = new Set<string>((state?.resources ?? []).map((r: { id: string }) => r.id))
} catch {
  // No live state in this checkout — every ID is then judged against the
  // manifest alone, which is stricter rather than looser.
}

/** Every file under a directory, following subdirectories. */
function* walk(dir: string): Generator<string> {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) yield* walk(path)
    else yield path
  }
}

// Any `src_`-prefixed token, not just a well-formed one. The first version of
// this matched `src_[0-9a-f]{20}` and so walked straight past
// `src_kau_y1_101_eoy_199` — a hand-minted ID in a shipped concept batch that
// looks like provenance and resolves to nothing. A citation in the wrong SHAPE
// is the more likely mistake, not the less.
const CITATION = /\bsrc_[A-Za-z0-9_]+\b/g
const dangling: { file: string; id: string; line: number }[] = []
let checked = 0

for (const path of walk(ROOT)) {
  // The manifest defines the IDs; checking it against itself proves nothing.
  if (relative('.', path) === MANIFEST) continue
  if (!/\.(md|json|ts|txt)$/.test(path)) continue

  readFileSync(path, 'utf8').split('\n').forEach((text, index) => {
    for (const match of text.matchAll(CITATION)) {
      checked += 1
      if (!known.has(match[0]) && !live.has(match[0])) dangling.push({ file: path, id: match[0], line: index + 1 })
    }
  })
}

if (dangling.length) {
  console.error(`${dangling.length} citation${dangling.length === 1 ? '' : 's'} point at no manifest row:\n`)
  for (const bad of dangling) console.error(`  ${bad.file}:${bad.line}  ${bad.id}`)
  console.error(`\nThese IDs are the first twenty hex of a file's sha256. A wrong one is not a
typo a reader would catch — it is a plausible string pointing at nothing. Fix it
against ${MANIFEST}, or regenerate the manifest if the file is genuinely new.`)
  process.exit(1)
}

console.log(`${checked} manifest citations across ${ROOT}, all resolving to one of ${known.size} sources.`)
