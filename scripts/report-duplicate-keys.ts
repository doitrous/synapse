/**
 * Every concept in the tree, grouped by what it claims to be, so a duplicate is
 * visible before it splits a student's mastery.
 *
 *   node --experimental-strip-types scripts/report-duplicate-keys.ts
 *
 * Writes `docs/chief-of-staff/duplicate-keys.md`. A report nobody can
 * regenerate goes stale silently and is then believed, so this is a generator
 * and its output says so.
 *
 * Why a duplicate matters more than it looks: mastery is tracked per concept
 * ID. Two IDs for one idea means a student who has proved they know it is
 * credited on one record and still tested on the other, forever. Nothing at
 * import time notices, because both records are individually well-formed.
 *
 * TWO PASSES, because they catch different mistakes.
 *
 *   By canonical key   — an exact collision. Two rows agree on what the idea
 *                        is called and disagree on its ID. This is the one the
 *                        gates can enforce, and `check-concept-ids.ts` does.
 *   By normalised label — a suspicion, not a fault. Two rows that never
 *                        collide on a key can still be the same idea written
 *                        twice, and no mechanical check can be sure. Reported
 *                        separately and never as an error.
 *
 * The key pass includes live state; the label pass is where most of the noise
 * lives, so it is capped and sorted by how many distinct IDs are involved.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

interface Row { id: string, key: string, label: string, where: string }

const rows: Row[] = []

/* ---- live state --------------------------------------------------------- */

const LIVE = 'server/data/medical-library-v1.json'
let liveCount = 0
try {
  const live = JSON.parse(readFileSync(LIVE, 'utf8'))
  for (const concept of live?.states?.['nishany-concept-graph-v2']?.concepts ?? []) {
    if (!concept?.id) continue
    rows.push({ id: concept.id, key: (concept.canonicalKey ?? '').trim(), label: (concept.label ?? '').trim(), where: 'live state' })
    liveCount += 1
  }
} catch (reason) {
  // Said out loud rather than swallowed. A scan missing live state would report
  // far fewer duplicates and look like good news.
  console.error(`warning: could not read ${LIVE} (${(reason as Error).message}) — live concepts are NOT in this report`)
}

/* ---- unimported batches ------------------------------------------------- */

/**
 * Every root a pending batch can live under.
 *
 * The two shared roots, plus each university's own — found by shape, the same
 * rule `find-existing.mjs` and `check-concept-ids.ts` use, so a new university
 * is covered without an edit here.
 */
const ROOTS = [
  'docs/import-ready',
  'docs/questions-import-ready',
  ...(existsSync('docs')
    ? readdirSync('docs', { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && entry.name.endsWith('-Source-Imports'))
      .map((entry) => join('docs', entry.name))
    : []),
].filter((root) => existsSync(root))

/** `## label` out of one block. `[ \t]*` so a blank value cannot swallow the next heading. */
const field = (block: string, label: string) =>
  block.match(new RegExp(`^## ${label}[ \\t]*\\n(.+)$`, 'm'))?.[1].trim() ?? ''

let batchCount = 0
for (const root of ROOTS) {
  for (const name of readdirSync(root, { recursive: true })) {
    const path = join(root, String(name))
    if (!path.endsWith('.md')) continue
    for (const block of readFileSync(path, 'utf8').split(/^\s*---\s*$/m)) {
      const id = field(block, 'id')
      // A concept row, not a claim or a span: those carry `id` too. `label` or
      // `canonical_key` is what makes it a concept, matching `detectBatchKind`.
      if (!id || !id.startsWith('CON-')) continue
      const key = field(block, 'canonical_key')
      const label = field(block, 'label')
      if (!key && !label) continue
      rows.push({ id, key, label, where: path.replace(/^docs\//, '') })
      batchCount += 1
    }
  }
}

/* ---- grouping ----------------------------------------------------------- */

const group = <T>(items: T[], by: (item: T) => string) => {
  const out = new Map<string, T[]>()
  for (const item of items) {
    const at = by(item)
    if (at) out.set(at, [...(out.get(at) ?? []), item])
  }
  return out
}

/** Lowercased, punctuation stripped, whitespace collapsed — for the suspicion pass only. */
const normalise = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

const byKey = [...group(rows.filter((row) => row.key), (row) => row.key)]
  .map(([key, seen]) => ({ key, seen, ids: [...new Set(seen.map((row) => row.id))] }))
  .filter((entry) => entry.ids.length > 1)
  .sort((a, b) => b.ids.length - a.ids.length || a.key.localeCompare(b.key))

const byLabel = [...group(rows.filter((row) => row.label), (row) => normalise(row.label))]
  .map(([label, seen]) => ({ label, seen, ids: [...new Set(seen.map((row) => row.id))] }))
  .filter((entry) => entry.ids.length > 1)
  // A label collision that is also a key collision is already reported above.
  .filter((entry) => !entry.seen.every((row) => byKey.some((k) => k.key === row.key)))
  .sort((a, b) => b.ids.length - a.ids.length || a.label.localeCompare(b.label))

/**
 * The inverse of §1: one ID, more than one canonical key. The mint is
 * `sha256(key)`, so this can only happen by hand — an author reused an
 * existing ID for a key it was never minted from, instead of running
 * `mint-concept-id.mjs`. A full-record update on that ID then silently
 * overwrites whichever concept got there first. Found live 2026-09-02
 * (Helwan Y1 `CON-REN-B9E0531973510E`, reused for an unrelated fact).
 */
const byId = [...group(rows.filter((row) => row.key), (row) => row.id)]
  .map(([id, seen]) => ({ id, seen, keys: [...new Set(seen.map((row) => row.key))] }))
  .filter((entry) => entry.keys.length > 1)
  .sort((a, b) => a.id.localeCompare(b.id))

/* ---- report ------------------------------------------------------------- */

const lines: string[] = []
const say = (line = '') => lines.push(line)

say('# Duplicate concept keys and labels across the whole tree')
say()
say('Generated by `scripts/report-duplicate-keys.ts` (`npm run medical:duplicate-keys`).')
say('Rerun it and the numbers are today\'s. Do not hand-edit — a regeneration')
say('discards edits, and a stale ledger nobody can rebuild gets believed.')
say()
say(`**${rows.length} concept rows** read: ${liveCount} live, ${batchCount} in unimported batches`)
say(`across ${ROOTS.length} root(s) — ${ROOTS.map((root) => `\`${root}\``).join(', ')}.`)
say()
say('Mastery is tracked per concept ID. Two IDs for one idea means a student who')
say('has proved they know it is credited on one record and still tested on the')
say('other. Both records are individually well-formed, so nothing at import')
say('notices.')
say()
say('---')
say()
say(`## 1 · One canonical key, more than one ID — ${byKey.length} found`)
say()
say('An exact collision: two rows agree what the idea is called and disagree on')
say('its ID. This is the enforceable one, and `medical:concept-ids` fails on it.')
say()
if (!byKey.length) {
  say('None. Every canonical key in the tree maps to exactly one concept ID.')
} else {
  for (const entry of byKey) {
    say(`### \`${entry.key}\` — ${entry.ids.length} IDs`)
    say()
    for (const row of entry.seen.sort((a, b) => a.where.localeCompare(b.where))) {
      say(`- \`${row.id}\` — ${row.where}${row.label ? ` — ${row.label.slice(0, 90)}` : ''}`)
    }
    say()
  }
}
say('---')
say()
say(`## 2 · Same label, different ID, different key — ${byLabel.length} found`)
say()
say('A suspicion, not a fault. Labels are normalised (lowercased, punctuation')
say('stripped) and rows already reported in §1 are excluded. No mechanical check')
say('can decide these; they need a reader who knows the material. Two modules')
say('teaching one idea may legitimately be two concepts — that is the open')
say('product question below — so this section is never an error.')
say()
if (!byLabel.length) {
  say('None.')
} else {
  for (const entry of byLabel.slice(0, 60)) {
    say(`### ${entry.seen[0].label.slice(0, 100)} — ${entry.ids.length} IDs`)
    say()
    for (const row of entry.seen.sort((a, b) => a.where.localeCompare(b.where))) {
      say(`- \`${row.id}\`${row.key ? ` \`${row.key}\`` : ' *(no key)*'} — ${row.where}`)
    }
    say()
  }
  if (byLabel.length > 60) {
    say(`_…and ${byLabel.length - 60} more. Not truncated silently: rerun the generator`)
    say('and raise the cap in the script if the tail is wanted._')
    say()
  }
}
say('---')
say()
say(`## 3 · One ID, more than one canonical key — ${byId.length} found`)
say()
say('The mint is `sha256(key)`, so this can only happen by hand: an author')
say('reused an existing ID for a key it was never minted from, instead of')
say('running `mint-concept-id.mjs`. A full-record update on that ID silently')
say('overwrites whichever concept got there first — this is the enforceable')
say('check `medical:concept-ids` is missing today.')
say()
if (!byId.length) {
  say('None. Every ID in the tree maps to exactly one canonical key.')
} else {
  for (const entry of byId) {
    say(`### \`${entry.id}\` — ${entry.keys.length} keys`)
    say()
    for (const row of entry.seen.sort((a, b) => a.where.localeCompare(b.where))) {
      say(`- \`${row.key}\` — ${row.where}${row.label ? ` — ${row.label.slice(0, 90)}` : ''}`)
    }
    say()
  }
}
say('---')
say()
say('## Why the two minters disagree, and what is still undecided')
say()
say('Two tools mint concept IDs and they hash different things:')
say()
say('```')
say('scripts/kasr/seeds/types.ts    sha256("kau:" + module + ":" + key)')
say('tools/mint-concept-id.mjs      sha256(key)          <- no module, no university')
say('```')
say()
say('The unsalted one produced 237 of the IDs in the Kasr tree — all of 108 INT,')
say('104 CPS practical, most of 103 BMS. It is module-blind and')
say('university-blind, so two modules, or two universities, minting the same key')
say('get the same ID. The salted one deliberately keeps them distinct.')
say()
say('These encode opposite answers to one product question: **are two modules')
say('teaching the same idea one concept or two?** Until that is decided, §1 will')
say('keep reappearing wherever the two conventions meet. It is not a tooling')
say('defect to be patched — either answer is coherent, and the tools should be')
say('made to agree with whichever is chosen.')
say()

const OUT_DIR = 'docs/chief-of-staff'
mkdirSync(OUT_DIR, { recursive: true })
writeFileSync(join(OUT_DIR, 'duplicate-keys.md'), `${lines.join('\n')}\n`)

console.log(`${rows.length} concept rows (${liveCount} live, ${batchCount} pending) across ${ROOTS.length} roots`)
console.log(`${byKey.length} canonical key(s) with more than one ID`)
console.log(`${byLabel.length} label collision(s) not already explained by a key collision`)
console.log(`${byId.length} ID(s) with more than one canonical key`)
console.log(`-> ${join(OUT_DIR, 'duplicate-keys.md')}`)
