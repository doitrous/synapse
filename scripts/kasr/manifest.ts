/**
 * Which manifest JSON a module's sources live in.
 *
 * One `docs/Kasr-Source-Imports/manifest/kasr-y<N>-sources.json` per intake
 * year. `manifestFor` defaults to Year 1 / `101 ISK`'s manifest, so every
 * existing bare invocation of a script that calls it with no argument keeps
 * reading exactly what it always read.
 *
 * The table covers every catalogue module across all five years
 * (`src/data/universities.ts`, `KAU_MODULES`), not only the years that
 * currently have a manifest on disk — a table scoped to "years built so far"
 * would need editing again on every new year's first script run, on a file
 * only one lane may touch.
 *
 * `manifestFor` is a pure lookup and does no I/O: it resolves a Year 3/4/5
 * path just as readily as a Year 1/2 one, whether or not that year's manifest
 * has actually been generated yet. It throws only when `module` is not a
 * catalogue module at all. The existence check — and the loud failure for "I
 * know your year, nobody has built its manifest yet" — lives in
 * `readManifest`, which is where a path is actually opened. Resolving *which*
 * manifest a module belongs to and *whether that manifest exists yet* are
 * different questions; collapsing them into `manifestFor` would make it fail
 * before a caller ever tries to read anything, including callers that only
 * want the path for a message.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const MANIFEST_DIR = 'docs/Kasr-Source-Imports/manifest'

const MODULE_YEAR: Record<string, string> = {
  // Year 1
  '101 ISK': 'y1', '102 INT': 'y1', '103 BMS': 'y1', '104 CPS': 'y1', '108 INT': 'y1',
  // Year 2
  '205 NEU': 'y2', '206 DIG': 'y2', '207 END': 'y2', '208 INT': 'y2', '210 PAT': 'y2', '213 PSY': 'y2',
  // Year 3
  '309 INF': 'y3', '310 PAT': 'y3', '314': 'y3', '319': 'y3', '327 MPE': 'y3',
  'CLIN 3': 'y3', 'COMM 3': 'y3', 'ELEC 3': 'y3',
  // Year 4
  'PEDS 4': 'y4', 'OBGYN 4': 'y4', 'SURG 4': 'y4', 'IM 4': 'y4', 'PSY 4': 'y4',
  'FM 4': 'y4', 'CM 4': 'y4', 'PALL 4': 'y4', 'RSCH 4': 'y4',
  // Year 5
  'SURG 5': 'y5', 'IM 5': 'y5', 'FM 5': 'y5',
}

/**
 * The manifest path a module's sources live in.
 *
 * A pure lookup — throws only if `module` is not a catalogue module at all.
 * Does not check whether that year's manifest has actually been built; see
 * `readManifest` for the function that opens the file and is where that
 * failure lives.
 */
export function manifestFor(module = '101 ISK'): string {
  const year = MODULE_YEAR[module]
  if (!year) throw new Error(`"${module}" has no manifest year on record — add it to scripts/kasr/manifest.ts`)
  return `${MANIFEST_DIR}/kasr-${year}-sources.json`
}

/**
 * Read and parse a module's manifest.
 *
 * Raises a message naming the module and the missing path — rather than a
 * bare `ENOENT` — when that year's manifest has not been generated yet. This
 * is the read point every Task-4 caller should go through instead of pairing
 * `manifestFor` with a raw `readFileSync`, so the same module resolves to the
 * same error everywhere it is used.
 */
export function readManifest(module = '101 ISK'): { sources: unknown[] } & Record<string, unknown> {
  const path = manifestFor(module)
  if (!existsSync(path)) {
    throw new Error(
      `"${module}" maps to ${path}, which does not exist yet. `
      + 'Build it from scripts/corpus-intake/ (see docs/Kasr-Source-Imports/manifest/README.md) before running this.')
  }
  return JSON.parse(readFileSync(path, 'utf8'))
}

/**
 * Every manifest that currently exists on disk, for tools that need the
 * whole corpus regardless of year (citation checking, the source index).
 * Silently skips a year with no manifest yet, rather than erroring — the
 * caller wants "everything there is", not "everything there will be".
 */
export function allManifestPaths(repoRoot: string = process.cwd()): string[] {
  const dir = join(repoRoot, MANIFEST_DIR)
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((name) => /^kasr-y\d+-sources\.json$/.test(name))
    .sort()
    .map((name) => `${MANIFEST_DIR}/${name}`)
    .filter((relPath) => existsSync(join(repoRoot, relPath)))
}
