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
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const DIR = 'docs/Kasr-Source-Imports/concept'

interface Row { id: string; key: string; subject: string; file: string }

const rows: Row[] = []
for (const name of readdirSync(DIR).filter((one) => one.endsWith('.md'))) {
  const text = readFileSync(join(DIR, name), 'utf8')
  for (const block of text.split(/^\s*---\s*$/m)) {
    const field = (label: string) =>
      block.match(new RegExp(`^## ${label}\\s*\\n(.+)$`, 'm'))?.[1].trim() ?? ''
    const id = field('id')
    const key = field('canonical_key')
    if (id && key) rows.push({ id, key, subject: field('subject'), file: name })
  }
}

const group = <T>(items: T[], by: (item: T) => string) => {
  const out = new Map<string, T[]>()
  for (const item of items) out.set(by(item), [...(out.get(by(item)) ?? []), item])
  return out
}

const problems: string[] = []

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
  process.exit(1)
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
