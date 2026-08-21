/**
 * No field in the emitted state may hold the literal string `[clear]`.
 *
 *   npm run medical:simulate -- <batches> --emit /tmp/state.json
 *   node --experimental-strip-types scripts/kasr/check-sentinels.ts /tmp/state.json
 *
 * `[clear]` is a **list** directive. `importSemantics.ts` parses it in
 * `parseList` and nowhere else, so on any other kind of column it is stored
 * verbatim as four characters — and a field holding four characters *has a
 * value*, which is all `hasValue` asks. So `medical:batch`, `medical:simulate`
 * and `medical:audit` are all green while the value is wrong.
 *
 * That is why this checks the **state a batch would produce** rather than the
 * batch. Reading the source cannot find it either: `published_sections` is
 * neither a list nor a text column but a third parser, `parseSections`, which
 * treats the sentinel as a section *body* — so four articles gained a published
 * section whose entire text was `[clear]`, through two full green gate runs.
 *
 * The worst case found across the lanes was `exclusionReason`, which is not a
 * missing value dressed as a present one: a non-null exclusion reason **means
 * the record was excluded**. Thirty-nine concepts each asserted "do not use me
 * — reason: [clear]", and every gate agreed.
 *
 * Exits non-zero on a hit, so it can be wired into CI.
 */
import { readFileSync } from 'node:fs'

const file = process.argv[2]
if (!file) throw new Error('Usage: check-sentinels.ts <emitted-state.json>')

const SENTINEL = /^\s*\[clear\]\s*$/i

interface Hit { path: string; key: string }
const hits: Hit[] = []
/**
 * How many string values were examined.
 *
 * A checker that classifies nothing reports zero and looks clean. This one
 * refuses to: a run that inspected no strings has not proved the state is
 * clean, it has proved only that it was pointed somewhere empty. Stronger than
 * a negative control, which shows the check can fail on a case you thought of —
 * this shows it is looking at anything at all.
 */
let inspected = 0

function walk(node: unknown, path: string[]): void {
  if (typeof node === 'string') {
    inspected += 1
    if (SENTINEL.test(node)) hits.push({ path: path.join('.'), key: path[path.length - 1] ?? '?' })
    return
  }
  if (Array.isArray(node)) {
    node.forEach((value, index) => walk(value, [...path, String(index)]))
    return
  }
  if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) walk(value, [...path, key])
  }
}

walk(JSON.parse(readFileSync(file, 'utf8')), [])

if (inspected === 0) {
  console.error(`${file}: inspected 0 string values — this check cannot have failed, so it has not passed.`)
  process.exit(2)
}

if (hits.length === 0) {
  console.log(`${inspected} string values in ${file}, none holding the literal "[clear]".`)
  process.exit(0)
}

const byKey = new Map<string, number>()
for (const hit of hits) byKey.set(hit.key, (byKey.get(hit.key) ?? 0) + 1)

console.error(`${hits.length} field${hits.length === 1 ? '' : 's'} of ${inspected} hold the literal "[clear]":\n`)
for (const [key, count] of [...byKey].sort((a, b) => b[1] - a[1])) {
  console.error(`  ${key.padEnd(28)} ${count}`)
}
console.error(`\nFirst few:`)
for (const hit of hits.slice(0, 5)) console.error(`  ${hit.path}`)
console.error(`
"[clear]" empties a **list**. On a text column it is stored as four characters,
and a field holding four characters passes every value check there is. Write the
key with an empty body instead — that is what a text column's "deliberately
empty" looks like.`)
process.exit(1)
