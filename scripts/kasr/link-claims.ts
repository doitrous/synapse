/**
 * Write each concept's claim IDs onto a hand-authored concept batch.
 *
 * The generated batches get theirs from `emit.ts`, which reads
 * `seeds/claim-links.json` as it writes each block. `101-ISK-practical-concepts.md`
 * is not generated — it was authored by hand from the practical book — so there
 * is no emitter to teach, and its forty-three concepts were the last thing in
 * the module still failing `medical:presence` on `atomicClaimIds`.
 *
 * Their claims exist: `build-evidence.ts` read that very file to make them. Only
 * the pointer back was missing.
 *
 * The edit is additive and idempotent. It adds `## atomic_claim_ids` where the
 * field is absent and rewrites its value where it is present, and it touches
 * nothing else — none of the prose, none of the other fields, no reordering. Run
 * it twice and the second run changes nothing.
 *
 *   node --experimental-strip-types scripts/kasr/link-claims.ts
 */
import { readFileSync, writeFileSync } from 'node:fs'

const FILE = 'docs/Kasr-Source-Imports/concept/101-ISK-practical-concepts.md'
const LINKS = 'scripts/kasr/seeds/claim-links.json'

const links: Record<string, string[]> = JSON.parse(readFileSync(LINKS, 'utf8'))
const text = readFileSync(FILE, 'utf8')

/** `## label` out of a block. `[ \t]*` so a blank value does not eat the next heading. */
const field = (block: string, label: string) =>
  block.match(new RegExp(`^## ${label}[ \\t]*\\n([\\s\\S]*?)(?=\\n## |$)`, 'm'))?.[1].trim() ?? ''

let written = 0
let unchanged = 0
let noClaims = 0

const blocks = text.split(/^\s*---\s*$/m).map((block) => {
  const id = field(block, 'id')
  if (!id) return block

  const claims = links[id]
  if (!claims?.length) { noClaims += 1; return block }
  const value = claims.join(' | ')

  if (field(block, 'atomic_claim_ids') === value) { unchanged += 1; return block }
  written += 1

  const existing = new RegExp('^## atomic_claim_ids[ \\t]*\\n[\\s\\S]*?(?=\\n## |$)', 'm')
  if (existing.test(block)) return block.replace(existing, `## atomic_claim_ids\n${value}`)

  // Absent. Put it where the generated batches put it — after `resource_ids`,
  // so the two files read the same way down the page and a reviewer comparing
  // them is not hunting for a field that moved.
  const after = /^## resource_ids[ \t]*\n[\s\S]*?(?=\n## |$)/m
  if (after.test(block)) {
    return block.replace(after, (match) => `${match}\n## atomic_claim_ids\n${value}`)
  }
  return `${block.trimEnd()}\n## atomic_claim_ids\n${value}`
})

writeFileSync(FILE, blocks.join('\n---\n'))
console.log(`${written} concepts given their claim ids, ${unchanged} already correct, `
  + `${noClaims} with no claims -> ${FILE}`)
