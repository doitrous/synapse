/**
 * Check the Kasr concept batches for two IDs that mean one concept.
 *
 *   node --experimental-strip-types scripts/kasr/check-concept-ids.ts
 *
 * `build-batches.ts` already refuses to emit a canonical key that has been given
 * two subjects, but it only sees the seeds it can import. Two sessions author
 * this module, and the other lane's seeds are not always present — its
 * *committed batches* are. So this reads the batch files themselves, which is
 * the one artefact both lanes always share.
 *
 * Four ways one idea ends up as two rows, and this finds all of them:
 *
 *   1. One canonical key carrying two IDs. Should be impossible while the mint
 *      is a pure function of the key, and is checked anyway because that is the
 *      property the whole scheme rests on.
 *   2. The same ID twice in one file. Grouping by key finds one ID here and
 *      reports nothing, which is how it went unnoticed — it came from an
 *      emitter writing a concept once per leaf without deduplicating, and the
 *      importer would apply it as a record overwriting itself.
 *   3. One ID carrying two canonical keys — a genuine hash collision, or a
 *      hand-edited batch.
 *   4. Two IDs sharing a hash body behind different subject prefixes. The mint
 *      hashes the key alone and the subject only picks the prefix, so this is
 *      the same key filed under two subjects — the failure that survives a
 *      correct mint, and the only one a reader is likely to skim past, because
 *      the IDs differ in three characters out of eighteen.
 *
 * Exits non-zero on any of them, so it can gate a merge.
 *
 * 2026-08-22 — the invariant this whole file enforces, stated once precisely:
 * ONE KEY -> ONE ID. A canonical_key may legitimately appear in several files
 * of a module as long as every row carries the same CON- id (e.g.
 * fibroblast-features-function in both 101-ISK-concepts.md and
 * 101-ISK-mcq-concepts.md, same id both places — that is an update, not a
 * duplicate, and is logged, not flagged). The failure is two different ids
 * for one key in one module, and checks #1/#4 below already catch it: they
 * group by key/hash-body with no module filter, which is a superset of the
 * module-scoped case, not a gap. Confirmed 2026-08-22 by a controlled test:
 * a scratch row added to this directory with a live key
 * (eosinophil-versus-neutrophil-light-microscopy) and a fresh id was flagged
 * within one run, then removed. Same test in reverse (a live id given a
 * second canonical_key) is also caught, by the `id -> multiple keys` check
 * further down. Nothing new was added for either direction.
 *
 * What WAS missing, and is fixed below: a record whose canonical_key is
 * blank (the field left "untouched" on an update row per the batch format)
 * was being reported as a generic parse failure regardless of whether it was
 * a legitimate update. It now only reports when the id is neither live in
 * server/data/medical-library-v1.json nor already established with a key
 * elsewhere in the same module — i.e. when the blank key cannot be explained
 * as "unchanged from an existing record" and looks like a fresh concept that
 * simply forgot its key.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Every university's concept directory.
 *
 * 2026-08-22 — this scanned `docs/Kasr-Source-Imports/concept` alone, and the
 * one-key-one-id invariant above is global: one medical idea is one concept ID,
 * and a university, year or module is an overlay on that record rather than a
 * separate namespace. So a concept under `docs/Alexandria-Source-Imports/`
 * reusing a Kasr canonical key with a *different* id passed this gate green —
 * the exact collision it exists to refuse. Proved with a fixture before the
 * change: `no rival ids`, exit 0.
 *
 * The module-scoped reading in the header still holds and is unchanged; this
 * only widens where rows are read from, and every check below already groups
 * with no module filter, which the header notes is a superset rather than a
 * gap. Widening the scan is what makes that superset actually cover the tree.
 *
 * Discovered by shape, not by name — the same rule `find-existing.mjs` uses, so
 * the tool authors run before minting and the gate that catches them when they
 * do not agree on what "everywhere" means. The next university must not need an
 * edit here to be checked.
 */
const CONCEPT_DIRS = (existsSync('docs')
  ? readdirSync('docs', { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.endsWith('-Source-Imports'))
    .map((entry) => join('docs', entry.name, 'concept'))
  : []).filter((dir) => existsSync(dir)).sort()
const LIVE_LIBRARY_PATH = 'server/data/medical-library-v1.json'

interface Row { id: string; key: string; subject: string; module: string; file: string; line: number }
interface IdOnlyRow { id: string; module: string; file: string; line: number }

// Live ids, and the canonical_key each one already carries in production —
// used only to decide whether a blank canonical_key on a batch row is a
// legitimate "untouched, unchanged" update field rather than a fresh concept
// that forgot to state its key.
const liveKeyById = new Map<string, string>()
try {
  const live = JSON.parse(readFileSync(LIVE_LIBRARY_PATH, 'utf8'))
  const concepts = live?.states?.['nishany-concept-graph-v2']?.concepts ?? []
  for (const concept of concepts) {
    if (concept?.id) liveKeyById.set(concept.id, concept.canonicalKey ?? '')
  }
} catch (err) {
  console.error(`warning: could not read ${LIVE_LIBRARY_PATH} (${(err as Error).message}); `
    + 'the empty-canonical_key check will treat every id as not-live')
}

const rows: Row[] = []
const idOnly: IdOnlyRow[] = []
/**
 * Blocks that look like items but did not parse.
 *
 * This reads `## id` and `## canonical_key` with a regex and skips a block it
 * cannot read. A parser that skips what it does not recognise loses content
 * quietly — so it is paired with a count of what should have been there: every
 * block containing a `# Item` heading is an item, and one that yields no row is
 * reported rather than dropped. A field renamed upstream would otherwise make
 * this check pass by having nothing left to check.
 */
const unparsed: string[] = []

for (const dir of CONCEPT_DIRS) {
 for (const name of readdirSync(dir).filter((one) => one.endsWith('.md'))) {
  // Path rather than basename, now that more than one university is scanned:
  // two of them may each author `concepts.md`, and a message naming only the
  // basename would report one lane's collision against another lane's file.
  const where = join(dir, name).replace(/^docs\//, '')
  const text = readFileSync(join(dir, name), 'utf8')
  const lines = text.split('\n')
  // Split on the `---` delimiter like `text.split(...)` did, but keep each
  // block's starting line number so the new checks can report file:line
  // instead of just a filename.
  const blocks: { block: string; startLine: number }[] = []
  let blockStart = 0
  let current: string[] = []
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*---\s*$/.test(lines[i])) {
      blocks.push({ block: current.join('\n'), startLine: blockStart + 1 })
      blockStart = i + 1
      current = []
    } else {
      current.push(lines[i])
    }
  }
  blocks.push({ block: current.join('\n'), startLine: blockStart + 1 })

  for (const { block, startLine } of blocks) {
    const field = (label: string) =>
      // `[ \t]*` and not `\s*`: `\s` matches a newline, so a field whose value
      // is blank would swallow the blank line and return the NEXT heading as
      // its value. Same bug as `build-article-links.ts` had.
      block.match(new RegExp(`^## ${label}[ \\t]*\\n(.+)$`, 'm'))?.[1].trim() ?? ''
    // Line of the `## id` heading itself, for a precise file:line — falls
    // back to the block start when `## id` is missing entirely.
    const idHeadingOffset = block.split('\n').findIndex((l) => /^## id[ \t]*$/.test(l))
    const line = idHeadingOffset >= 0 ? startLine + idHeadingOffset : startLine
    const id = field('id')
    const key = field('canonical_key')
    const module = field('module_subject').split('>')[0].trim()
    if (id && key) { rows.push({ id, key, subject: field('subject'), module, file: where, line }); continue }
    if (id && !key) { idOnly.push({ id, module, file: where, line }); continue }
    if (/^#\s*Item\s*$/m.test(block)) {
      unparsed.push(`${where}:${line}: an item with ${key ? 'no id' : 'neither id nor canonical_key'}`)
    }
  }
}
}

// A blank canonical_key is normal on an update row (rule: "a blank block is
// untouched, not empty") — it is only a problem when nothing explains it as
// an update: the id is not live, and no other batch row in the same module
// has already given this id a key.
for (const { id, module, file, line } of idOnly) {
  const isUpdateRow = liveKeyById.has(id)
    || rows.some((row) => row.id === id && row.module === module)
  if (!isUpdateRow) {
    unparsed.push(`${file}:${line}: concept ${id} has an empty canonical_key and is not `
      + `explained as an update (not live, and no other ${module || '(no module_subject)'} `
      + 'batch row already gives it a key) — a new concept needs one')
  }
}

const group = <T>(items: T[], by: (item: T) => string) => {
  const out = new Map<string, T[]>()
  for (const item of items) out.set(by(item), [...(out.get(by(item)) ?? []), item])
  return out
}

const problems: string[] = [...unparsed]

for (const [key, seen] of group(rows, (row) => row.key)) {
  const ids = [...new Set(seen.map((row) => row.id))]
  if (ids.length > 1) {
    problems.push(`canonical key "${key}" has ${ids.length} ids: ${ids.join(', ')} `
      + `(${[...new Set(seen.map((row) => row.file))].join(', ')})`)
  }
}

// The same id twice in one file. Distinct from an id shared by two keys: here
// the key is the same too, so grouping by key finds one id and reports nothing.
// It arrived from an emitter that wrote a concept once per leaf without
// deduplicating, and the importer would apply it as a record overwriting
// itself — the later row silently winning on every field.
for (const [file, seen] of group(rows, (row) => row.file)) {
  for (const [id, rowsWithId] of group(seen, (row) => row.id)) {
    if (rowsWithId.length > 1) {
      problems.push(`${file} carries ${rowsWithId.length} rows with id ${id} `
        + `(canonical key "${rowsWithId[0].key}") — the importer would apply the last one and drop the rest`)
    }
  }
}

for (const [id, seen] of group(rows, (row) => row.id)) {
  const keys = [...new Set(seen.map((row) => row.key))]
  if (keys.length > 1) {
    problems.push(`id ${id} is used by ${keys.length} canonical keys: ${keys.join(', ')}`)
  }
}

// The subject-prefix case. `CON-DEV-B84639…` and `CON-MSK-B84639…` are one key
// filed twice, and a reader scanning a list of ids will not see it.
for (const [body, seen] of group(rows, (row) => row.id.split('-').slice(2).join('-'))) {
  const prefixes = [...new Set(seen.map((row) => row.id.split('-')[1]))]
  if (prefixes.length > 1) {
    problems.push(`one concept has been filed under ${prefixes.length} subjects: `
      + `${seen.map((row) => `${row.id} (${row.subject}, ${row.file})`).join(' and ')} `
      + `— same hash body ${body}, so this is the key "${seen[0].key}" minted twice`)
  }
}

const keys = new Set(rows.map((row) => row.key))
console.log(`${rows.length} concept rows, ${keys.size} distinct canonical keys, `
  + `${new Set(rows.map((row) => row.id)).size} distinct ids`)

if (problems.length) {
  console.error(`\n${problems.length} problem(s):`)
  for (const problem of problems) console.error(`  ${problem}`)
  console.error('\nOne idea must be one concept. Agree the subject per key and rebuild;'
    + ' the key decides the concept, the subject only picks its prefix.')

  // Whose problems are these?
  //
  // The scan is global on purpose — a rival id is by nature a thing between two
  // files, and checking one batch alone could never find one. But the exit code
  // was global too, so a lane could not tell its own files were clean while
  // another lane's were broken: every concept lane in the repo read the same
  // red gate and had no way to measure its own work. That is worse than noise,
  // because it stops the check being usable by the people it is for.
  //
  // Naming files still scans everything and still reports everything. It only
  // narrows what this exit code is *about*. With no arguments the behaviour is
  // exactly as before, which is what CI runs.
  const mine = process.argv.slice(2)
    .map((path) => path.split('/').pop() ?? path)
    .filter((name) => name.endsWith('.md'))

  if (!mine.length) process.exit(1)

  const involving = problems.filter((problem) => mine.some((name) => problem.includes(name)))
  const elsewhere = problems.length - involving.length
  if (involving.length) {
    console.error(`\n${involving.length} of these involve the file(s) you named:`)
    for (const problem of involving) console.error(`  ${problem}`)
    process.exit(1)
  }
  console.error(`\nNone of the ${elsewhere} problems above involve ${mine.join(', ')}. `
    + 'Those files are clean; the failures belong to another lane and this exit code says so.')
  process.exit(0)
}

// A key in two batch files is fine and often deliberate: same key, same id, so
// the second import updates the first rather than duplicating it.
const shared = [...group(rows, (row) => row.key)]
  .filter(([, seen]) => new Set(seen.map((row) => row.file)).size > 1)
if (shared.length) {
  console.log(`\n${shared.length} key(s) authored in more than one batch, each with one id `
    + '— these import as updates, not duplicates:')
  for (const [key, seen] of shared) {
    console.log(`  ${key}: ${[...new Set(seen.map((row) => row.file))].sort().join(', ')}`)
  }
}
console.log('\nno rival ids')
