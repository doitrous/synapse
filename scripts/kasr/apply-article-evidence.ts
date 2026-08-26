/**
 * Fill each article's `claim_ids` and `span_ids` from the evidence pass.
 *
 *   node --experimental-strip-types scripts/kasr/apply-article-evidence.ts "102 INT"
 *
 * Both columns are on `articlePopulated` in `scripts/audit-medical-content-fields.mjs`,
 * so they must carry a value — `[clear]` is an audit failure, not an honest
 * blank. But an article cannot know them when it is written: the claims are
 * authored afterwards, against the same book, and the spans afterwards again,
 * against the finished prose. So the articles land with `[clear]` and this
 * fills them once the evidence exists.
 *
 * It is a **targeted** rewrite, not a regeneration. The articles are hand-
 * authored prose and nothing here may touch a word of them: only the two named
 * blocks change, and only where the file currently says `[clear]`. An article
 * that already carries IDs is left alone, so running this twice is safe and so
 * is running it after somebody has edited a value by hand.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { MODULES } from './seeds/types.ts'

const module = process.argv[2]
if (!module || !MODULES[module]) {
  throw new Error(`usage: apply-article-evidence.ts "<module>" — one of ${Object.keys(MODULES).join(', ')}`)
}
const slug = module.replace(/\s+/g, '-')

const mapPath = `scripts/kasr/extract/${slug}/article-evidence.json`
if (!existsSync(mapPath)) throw new Error(`${mapPath} does not exist — run the spans pass first`)
const evidence: Record<string, { claimIds: string[], spanIds: string[] }> =
  JSON.parse(readFileSync(mapPath, 'utf8'))

// Every article batch this module owns, not a hardcoded half-name list.
//
// This used to be `['biochemistry', 'physiology', 'anatomy', 'histology']`
// mapped onto `<slug>-<half>.md`. That covers 102 INT and most of 103 BMS,
// but 103 also authors `103-BMS-mcq-*.md` article batches the list never
// named, 104 CPS's articles all live in one `104-CPS-articles.md`, and 108
// INT's are `108-INT-pathology.md` / `108-INT-pharmacology.md` — none of
// which end in a listed half, so this ran as a silent no-op (`batches: 0`)
// for 108 before this change. Globbing the directory for the module's own
// prefix is what "this module's article batches" actually means, and it is
// no less safe: every file found still only has its `[clear]` claim_ids/
// span_ids replaced, and only for article IDs the evidence map names.
const ARTICLE_DIR = 'docs/Kasr-Source-Imports/article'
const BATCHES = readdirSync(ARTICLE_DIR)
  .filter((name) => name.startsWith(`${slug}-`) && name.endsWith('.md'))
  .map((name) => `${ARTICLE_DIR}/${name}`)
  .filter(existsSync)

let filled = 0
let alreadySet = 0
const withoutEvidence: string[] = []

for (const file of BATCHES) {
  const text = readFileSync(file, 'utf8')
  // Split on the record separator rather than on `# Item`, so the separators
  // and the leading comment survive the round trip untouched.
  const records = text.split(/\n---\n/)
  const rebuilt = records.map((record) => {
    const id = record.match(/^## id\n(.+)$/m)?.[1]?.trim()
    if (!id?.startsWith('ART-')) return record
    const found = evidence[id]
    if (!found) { withoutEvidence.push(id); return record }

    let next = record
    for (const [key, ids] of [['claim_ids', found.claimIds], ['span_ids', found.spanIds]] as const) {
      if (!ids.length) continue
      // Only a `[clear]` is replaced. Anything else is somebody's decision.
      const pattern = new RegExp(`(^## ${key}\\n)\\[clear\\]$`, 'm')
      if (pattern.test(next)) {
        next = next.replace(pattern, `$1${ids.join(' | ')}`)
        filled += 1
      } else if (new RegExp(`^## ${key}\\n`, 'm').test(next)) {
        alreadySet += 1
      }
    }
    return next
  })

  const output = rebuilt.join('\n---\n')
  if (output !== text) writeFileSync(file, output)
}

console.log(JSON.stringify({
  module,
  batches: BATCHES.length,
  articlesWithEvidence: Object.keys(evidence).length,
  blocksFilled: filled,
  blocksAlreadySet: alreadySet,
  // An article the evidence pass never reached. Not an error here — it is a
  // gap, and it belongs in the report rather than in a thrown exception.
  articlesWithoutEvidence: withoutEvidence,
}, null, 1))
