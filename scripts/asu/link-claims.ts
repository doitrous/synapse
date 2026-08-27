/**
 * Write each concept's claim IDs onto a hand-authored concept batch.
 *
 *   node --experimental-strip-types scripts/asu/link-claims.ts "<path to the batch file>"
 *
 * Copied from `scripts/kasr/link-claims.ts`, retrofitted to take the target
 * file as an argument rather than the hardcoded
 * `101-ISK-practical-concepts.md`: Kasr wrote this for one specific
 * hand-authored file that `build-evidence.ts`'s emitter does not reach (a
 * generated batch gets its claim ids from `emit.ts` reading
 * `seeds/claim-links.json` directly). Ain Shams will have its own
 * hand-authored batches with unpredictable names, so the file is a parameter
 * — everything else about the edit is unchanged: additive, idempotent, and
 * touches nothing but `## atomic_claim_ids`.
 */
import { readFileSync, writeFileSync } from 'node:fs'

const FILE = process.argv[2]
if (!FILE) throw new Error('usage: link-claims.ts "<path to the hand-authored concept batch>"')
const LINKS = process.env.ASU_TOOLCHAIN_CLAIM_LINKS ?? 'scripts/asu/seeds/claim-links.json'

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

  const after = /^## resource_ids[ \t]*\n[\s\S]*?(?=\n## |$)/m
  if (after.test(block)) {
    return block.replace(after, (match) => `${match}\n## atomic_claim_ids\n${value}`)
  }
  return `${block.trimEnd()}\n## atomic_claim_ids\n${value}`
})

writeFileSync(FILE, blocks.join('\n---\n'))
console.log(`${written} concepts given their claim ids, ${unchanged} already correct, `
  + `${noClaims} with no claims -> ${FILE}`)
