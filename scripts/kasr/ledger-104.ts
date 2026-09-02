/**
 * What is left to author in 104 CPS's MCQ bank — computed by bank-row `key`,
 * never by the extractor's `leaf` tag.
 *
 * Two earlier lanes each recomputed "how many are left" by hand and each got
 * it wrong ("67", "~580") — both counted by leaf tag, which is unreliable: a
 * row tagged "Conducting Portion" can already be claimed by a different
 * leaf's seed file (concepts legitimately span leaves, and a leaf's own
 * `modulePath` is not always the tag the extractor guessed). The only
 * trustworthy join is the bank row's `key` against every seed file's
 * `questions[].key`, which is exactly what `build-batches.ts` itself joins
 * on. This script does that join once and writes the answer down so no
 * authoring lane has to burn budget re-deriving it.
 *
 * A bank row is:
 *   - KEYED    — `answer` (or an authored `answerOverride`) is established.
 *   - AUTHORED — its key appears in some leaf's `questions` with `exclude`
 *                not `true`.
 *   - EXCLUDED — its key appears in some leaf's `questions` with
 *                `exclude: true` (an `excludeReason` should accompany it).
 *   - REMAINING — keyed, but neither authored nor excluded. This is the only
 *                 bucket a dispatch should hand out as new work.
 *   - UNKEYED  — no answer, not already authored (an authored row can carry
 *                its own `answerOverride` and so escape this bucket even
 *                though the bank row itself has no printed answer). Needs a
 *                cleaner scan or a solved-book match before anyone can
 *                author it, so it is never "remaining" work.
 *
 *   node --experimental-strip-types scripts/kasr/ledger-104.ts
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import type { BankRow, McqLeafSeed } from './seeds/mcq.ts'

const MODULE = '104 CPS'
const MODULE_SLUG = '104-CPS'
const BANK_PATH = `scripts/kasr/extract/${MODULE_SLUG}/mcq-bank.json`
const SEED_DIR = `scripts/kasr/seeds/mcq/${MODULE_SLUG}`
const OUT_PATH = `docs/Kasr-Source-Imports/coverage/${MODULE_SLUG}-LEDGER.md`
/**
 * Hand-authored classification for bank rows the extractor left with no
 * `leaf` tag at all — a triage pass over the `(untagged)` bucket, bucketing
 * each key into a real 104 CPS cluster (an existing leaf name where one
 * fits, a new topic name when ≥ 8 rows needed one, or `out-of-module` for
 * content that isn't 104 CPS at all). A bank row's own `leaf` always wins
 * when present; this file only fills in for rows where `row.leaf` is unset.
 * Never applies to `mcq-bank.json` or any seed file — it is a ledger-only
 * reporting aid, not authored content.
 */
const LEAF_OVERRIDES_PATH = `scripts/kasr/extract/${MODULE_SLUG}-leaf-overrides.json`

type Bank = { questions: BankRow[] }
type LeafOverride = { leaf: string; note?: string }

function loadBank(): Map<string, BankRow> {
  const bank = JSON.parse(readFileSync(BANK_PATH, 'utf8')) as Bank
  return new Map(bank.questions.map((row) => [row.key, row]))
}

function loadLeafOverrides(): Map<string, LeafOverride> {
  if (!existsSync(LEAF_OVERRIDES_PATH)) return new Map()
  const raw = JSON.parse(readFileSync(LEAF_OVERRIDES_PATH, 'utf8')) as Record<string, LeafOverride>
  return new Map(Object.entries(raw))
}

/** Every leaf seed for 104 CPS, the same way `build-batches.ts` finds them. */
async function loadLeaves(): Promise<{ leaf: McqLeafSeed, name: string }[]> {
  if (!existsSync(SEED_DIR)) return []
  const found: { leaf: McqLeafSeed, name: string }[] = []
  for (const name of readdirSync(SEED_DIR).filter((one) => one.endsWith('.ts')).sort()) {
    const leaf = (await import(`./seeds/mcq/${MODULE_SLUG}/${name}`)).LEAF as McqLeafSeed
    found.push({ leaf, name })
  }
  return found
}

const bank = loadBank()
const leafOverrides = loadLeafOverrides()
const leaves = await loadLeaves()

type Claim = { key: string; leafFile: string; leafName: string; excludeReason?: string; answerOverride?: string }

const authored = new Map<string, Claim>()
const excluded = new Map<string, Claim>()
/** A key claimed live by more than one leaf — should never happen; flagged if it does. */
const collisions: { key: string; leaves: string[] }[] = []
/** A key a seed claims that the current bank no longer carries (renamed/regenerated bank). */
const staleKeys: { key: string; leafFile: string }[] = []

for (const { leaf, name } of leaves) {
  for (const q of leaf.questions) {
    if (!bank.has(q.key)) {
      staleKeys.push({ key: q.key, leafFile: name })
      continue
    }
    const claim: Claim = {
      key: q.key, leafFile: name, leafName: leaf.leaf, excludeReason: q.excludeReason, answerOverride: q.answerOverride,
    }
    if (q.exclude) {
      excluded.set(q.key, claim)
    } else {
      const already = authored.get(q.key)
      if (already && already.leafFile !== name) {
        collisions.push({ key: q.key, leaves: [already.leafFile, name] })
      }
      authored.set(q.key, claim)
    }
  }
}

// Replicate build-batches.ts's mcq() accounting: a live (non-excluded)
// question with neither a printed answer nor an authored override is held
// back from the question batch ("unanswered"), so it is not part of the
// 591-style "kept" count even though it *is* AUTHORED by this ledger's
// by-key definition. Reported separately so a delta against the build's
// console total is never a mystery.
let keptLikeBuild = 0
let heldBackUnanswered = 0
for (const claim of authored.values()) {
  const row = bank.get(claim.key)!
  if (!claim.answerOverride && !row.answer) heldBackUnanswered += 1
  else keptLikeBuild += 1
}

const isKeyed = (row: BankRow) => Boolean(row.answer)
// A bank row's own `leaf` always wins; the hand-authored override only fills
// in when the extractor left the row untagged.
const clusterOf = (row: BankRow) => row.leaf ?? leafOverrides.get(row.key)?.leaf ?? '(untagged)'

const allRows = [...bank.values()]
const totalBankRows = allRows.length
const keyedRows = allRows.filter(isKeyed)
const unkeyedRows = allRows.filter((row) => !isKeyed(row))

const remainingRows = keyedRows.filter((row) => !authored.has(row.key) && !excluded.has(row.key))
const unkeyedNeedingScans = unkeyedRows.filter((row) => !authored.has(row.key) && !excluded.has(row.key))

// Per-cluster table, by the bank row's own leaf tag — a reporting axis only.
// Authored/excluded/remaining are still joined by key against the bank, so a
// row tagged "Conducting Portion" but actually authored under a different
// leaf's seed file still counts correctly here; the table just groups by
// what the extractor tagged it, for a dispatch to hand out by topic.
type ClusterRow = { cluster: string; bankRows: number; authored: number; excluded: number; remaining: number }
const clusters = new Map<string, ClusterRow>()
for (const row of allRows) {
  const c = clusterOf(row)
  const entry = clusters.get(c) ?? { cluster: c, bankRows: 0, authored: 0, excluded: 0, remaining: 0 }
  entry.bankRows += 1
  if (authored.has(row.key)) entry.authored += 1
  if (excluded.has(row.key)) entry.excluded += 1
  if (isKeyed(row) && !authored.has(row.key) && !excluded.has(row.key)) entry.remaining += 1
  clusters.set(c, entry)
}
const clusterTable = [...clusters.values()].sort((a, b) => b.remaining - a.remaining || a.cluster.localeCompare(b.cluster))

const remainingByCluster = new Map<string, BankRow[]>()
for (const row of remainingRows) {
  const c = clusterOf(row)
  const list = remainingByCluster.get(c) ?? []
  list.push(row)
  remainingByCluster.set(c, list)
}
const remainingClusterNames = [...remainingByCluster.keys()].sort((a, b) => {
  const diff = (remainingByCluster.get(b)!.length) - (remainingByCluster.get(a)!.length)
  return diff !== 0 ? diff : a.localeCompare(b)
})

const totalsLine = `bank rows: ${totalBankRows} | keyed: ${keyedRows.length} | `
  + `unkeyed/OCR-blocked: ${unkeyedRows.length} | authored: ${authored.size} | excluded: ${excluded.size} | `
  + `remaining: ${remainingRows.length}`

const lines: string[] = []
lines.push(`# 104 CPS — MCQ authoring ledger`)
lines.push('')
lines.push('Machine-regenerable. Computed by joining every `scripts/kasr/seeds/mcq/104-CPS/*.ts` '
  + `leaf's \`questions[].key\` against \`${BANK_PATH}\` by key — never by leaf tag, which is `
  + 'known to be unreliable (a row tagged for one leaf can already be claimed by another leaf\'s '
  + 'seed). Regenerate with `npm run kasr:ledger-104` before dispatching new authoring work; do not '
  + 'hand-edit this file.')
lines.push('')
lines.push('## Totals')
lines.push('')
lines.push(totalsLine)
lines.push('')
lines.push(`Cross-check against \`build-batches.ts "${MODULE}"\`'s own accounting (its "kept" count `
  + 'excludes live-but-unanswered rows, which this ledger counts as AUTHORED since their key is '
  + 'claimed in a seed either way):')
lines.push('')
lines.push(`- authored (by key, this ledger): ${authored.size}`)
lines.push(`- of those, held back as unanswered (no printed answer, no \`answerOverride\`) the same way `
  + `\`mcq()\` in build-batches.ts does: ${heldBackUnanswered}`)
lines.push(`- authored minus held-back = build-style "kept": ${keptLikeBuild}`)
lines.push('')
if (staleKeys.length) {
  lines.push(`**${staleKeys.length} seed key(s) not found in the current bank** (stale — bank was `
    + 'regenerated since these were authored, or a typo):')
  lines.push('')
  for (const s of staleKeys.slice(0, 50)) lines.push(`- \`${s.key}\` — ${s.leafFile}`)
  if (staleKeys.length > 50) lines.push(`- … and ${staleKeys.length - 50} more`)
  lines.push('')
}
if (collisions.length) {
  lines.push(`**${collisions.length} key(s) claimed live by more than one leaf file** (should not happen):`)
  lines.push('')
  for (const c of collisions) lines.push(`- \`${c.key}\` — ${c.leaves.join(' and ')}`)
  lines.push('')
}

lines.push('## By cluster (leaf tag)')
lines.push('')
lines.push('| cluster (leaf tag) | bank rows | authored | excluded | remaining |')
lines.push('|---|---:|---:|---:|---:|')
for (const c of clusterTable) {
  lines.push(`| ${c.cluster} | ${c.bankRows} | ${c.authored} | ${c.excluded} | ${c.remaining} |`)
}
lines.push('')

lines.push('## Remaining keys by cluster')
lines.push('')
lines.push('Every KEYED bank row whose key is not yet claimed by any seed (authored or excluded). '
  + 'A dispatch can copy an exact key list straight out of a section below.')
lines.push('')
for (const c of remainingClusterNames) {
  const rows = remainingByCluster.get(c)!.sort((a, b) => a.key.localeCompare(b.key))
  lines.push(`### ${c} (${rows.length})`)
  lines.push('')
  for (const row of rows) {
    const stem = row.stem.length > 80 ? `${row.stem.slice(0, 80)}…` : row.stem
    lines.push(`- \`${row.key}\` — ${stem}`)
  }
  lines.push('')
}

lines.push('## Unkeyed (needs cleaner scans)')
lines.push('')
lines.push(`${unkeyedRows.length} bank row(s) have no printed/recovered answer at all `
  + `(\`answerConfidence: "none"\`). Of those, ${unkeyedNeedingScans.length} are still untouched — `
  + `neither authored (no \`answerOverride\` on file) nor excluded — and are not counted in "remaining" `
  + 'above because there is no establishable answer to author against yet. They need a cleaner scan, a '
  + 'solved-book match, or an editorial ruling before they can be dispatched.')
lines.push('')

const md = `${lines.join('\n')}\n`
mkdirSync('docs/Kasr-Source-Imports/coverage', { recursive: true })
writeFileSync(OUT_PATH, md)

console.log(totalsLine)
console.log(`authored (by key): ${authored.size} | held-back unanswered: ${heldBackUnanswered} `
  + `| build-style kept: ${keptLikeBuild}`)
if (staleKeys.length) console.log(`WARNING: ${staleKeys.length} seed key(s) not in current bank`)
if (collisions.length) console.log(`WARNING: ${collisions.length} key(s) claimed by more than one leaf`)
console.log('')
console.log('Top clusters by remaining:')
for (const c of clusterTable.slice(0, 10)) {
  console.log(`  ${c.cluster.padEnd(45)} remaining ${String(c.remaining).padStart(4)}  `
    + `(bank ${c.bankRows}, authored ${c.authored}, excluded ${c.excluded})`)
}
console.log('')
console.log(`written -> ${OUT_PATH}`)
