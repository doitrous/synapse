/**
 * Fill each article's `claim_ids` and `span_ids` from the evidence pass.
 *
 * Copied from `scripts/kasr/apply-article-evidence.ts` at commit `4033bde`
 * (`git show 4033bde:scripts/kasr/apply-article-evidence.ts`, branch
 * `claude/kasr-alainy-content-report-e0ee59`, per LANE-BRIEF.md §10/§16). Do
 * not edit `scripts/kasr/`; this is the Alexandria copy and the only one
 * this lane touches.
 *
 * Differences from the Kasr original:
 *   - The Kasr original imports `MODULES` from `./seeds/types.ts` purely to
 *     validate the module argument against Kasr's own catalogue — and
 *     `seeds/types.ts` is where `mintConceptId` / `mintQuestionId` (the
 *     `kau:`-flavoured mint) also live, which LANE-BRIEF.md §4 says this
 *     lane must not copy. There is no equivalent Alexandria module catalogue
 *     to import instead (and this lane is not asked to create one), so the
 *     module argument is validated by shape only — `AU-<CODE>-<digits>`, the
 *     id grammar LANE-BRIEF.md §1 fixes — not by membership in an
 *     enumerated list.
 *   - `ARTICLE_DIR` is `docs/Alexandria-Source-Imports/article`.
 *   - The evidence map path is `scripts/alexandria/extract/<slug>/article-evidence.json`.
 *   - Everything else, including the directory-glob discovery of "every
 *     article batch this module owns" (LANE-BRIEF.md §16: "apply-article-
 *     evidence.ts discovers every article batch a module owns"), is
 *     unchanged.
 *
 *   node --experimental-strip-types scripts/alexandria/apply-article-evidence.ts "AU-MED-102"
 *
 * Both columns are on `articlePopulated` in the shared field-coverage audit,
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

const module = process.argv[2]
// Shape check only — see file header for why there is no catalogue import to
// validate membership against. `AU-<CODE>-<digits>`: uppercase letters/digits
// for the code, then a numeric suffix, matching every id in LANE-BRIEF.md §1's
// table (`AU-MED-102`, `AU-UNI-104`, `AU-E-304`, …).
if (!module || !/^AU-[A-Z]+-\d+$/.test(module)) {
  throw new Error(`usage: apply-article-evidence.ts "<AU module id>" — e.g. "AU-MED-102", `
    + 'matching the AU-<CODE>-<digits> grammar in LANE-BRIEF.md §1')
}
const slug = module.replace(/\s+/g, '-')

const mapPath = `scripts/alexandria/extract/${slug}/article-evidence.json`
if (!existsSync(mapPath)) throw new Error(`${mapPath} does not exist — run the spans pass first`)
const evidence: Record<string, { claimIds: string[], spanIds: string[] }> =
  JSON.parse(readFileSync(mapPath, 'utf8'))

// Every article batch this module owns, not a hardcoded half-name list.
// Globbing the directory for the module's own prefix is what "this module's
// article batches" actually means: every file found still only has its
// `[clear]` claim_ids/span_ids replaced, and only for article IDs the
// evidence map names.
const ARTICLE_DIR = 'docs/Alexandria-Source-Imports/article'
const BATCHES = existsSync(ARTICLE_DIR)
  ? readdirSync(ARTICLE_DIR)
      .filter((name) => name.startsWith(`${slug}-`) && name.endsWith('.md'))
      .map((name) => `${ARTICLE_DIR}/${name}`)
      .filter(existsSync)
  : []

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
