/**
 * Evidence spans for a module's articles — the join between what a student
 * reads and what supports it.
 *
 *   node --experimental-strip-types scripts/kasr/build-spans.ts \
 *     --module "108 INT" \
 *     --articles docs/Kasr-Source-Imports/article/108-INT-pathology.md \
 *     --articles docs/Kasr-Source-Imports/article/108-INT-pharmacology.md \
 *     --claims docs/Kasr-Source-Imports/evidence/108-INT-claims.md \
 *     --citations docs/Kasr-Source-Imports/evidence/108-INT-citations.md \
 *     --out docs/Kasr-Source-Imports/evidence/108-INT-spans.md \
 *     [--exclude-article ART-101-ANA-MUSCLES-OF-THE-BACK ...]
 *
 * A span is not a new fact. It is a pointer: this exact sentence, in this
 * exact section, is what that claim asserts and that citation supports. So
 * nothing here is written — every `text` is a substring copied out of the
 * article's own `## sections` field, split on the same sentence boundary
 * `build-evidence.ts` uses for concept definitions, and matched against a
 * claim only when the claim's own `display_text` shares most of its
 * distinctive vocabulary with that sentence. The matcher, the tokeniser and
 * the stop list are `build-evidence.ts`'s, copied rather than reinvented —
 * two independent implementations of "do these sentences agree" would drift,
 * and then a claim could pass one evidence pass and fail the other for no
 * content reason.
 *
 * Only a claim that already carries a citation is eligible. A claim without
 * one is real (the module's claims file may still assert it, at
 * `needs_evidence`) but a span pointing at it would give a student a link
 * with nothing behind it to open — worse than no span, because it looks like
 * provenance and is not.
 *
 * `section_id` is derived exactly as the importer derives it —
 * `parseSections` from `src/data/bulkImport.ts`, the same function the
 * import wizard runs, called with the same `id.toLowerCase()` prefix — so a
 * span written here addresses the section the importer will actually create,
 * not a guess at its name. (`docs/Kasr-Source-Imports/evidence/102-INT-spans.md`
 * uses bare heading text like "Key determinants" instead; that file predates
 * this derivation and does not resolve at render time. 103 and 104's spans
 * files get it right — this script follows them, not 102.)
 *
 * Span IDs are mechanical: `SPN-<domain>-<short-slug>-<NN>`, where `<domain>`
 * is the article ID's own third segment (`ART-108-PAT-…` → `PAT`) and
 * `<short-slug>` is a truncated, collision-checked cut of the rest of the
 * article's slug — not the hand-picked acronyms (`CPN`, `ODC`, `TWV`) that
 * 103/104's spans files use, which cannot be derived without judgment. `<NN>`
 * numbers a span within its article in document order.
 *
 * Also writes `scripts/kasr/extract/<module-slug>/article-evidence.json`,
 * the `{ articleId: { claimIds, spanIds } }` map `apply-article-evidence.ts`
 * reads to fill each article's own `claim_ids`/`span_ids` columns.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { parseSections, splitImportList } from '../../src/data/bulkImport.ts'
import { batchFile } from './emit.ts'

interface Args {
  module: string
  articles: string[]
  claims: string[]
  citations: string[]
  out: string
  excludeArticles: Set<string>
}

function parseArgs(argv: string[]): Args {
  const out: Partial<Args> & { articles: string[], claims: string[], citations: string[], excludeArticles: Set<string> } =
    { articles: [], claims: [], citations: [], excludeArticles: new Set() }
  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i]
    const value = argv[i + 1]
    switch (flag) {
      case '--module': out.module = value; i++; break
      case '--articles': out.articles.push(value); i++; break
      case '--claims': out.claims.push(value); i++; break
      case '--citations': out.citations.push(value); i++; break
      case '--out': out.out = value; i++; break
      case '--exclude-article': out.excludeArticles.add(value); i++; break
      default: throw new Error(`unrecognised argument ${flag}`)
    }
  }
  if (!out.module) throw new Error('--module is required, e.g. --module "108 INT"')
  if (!out.articles.length) throw new Error('at least one --articles <file> is required')
  if (!out.claims.length) throw new Error('at least one --claims <file> is required')
  if (!out.citations.length) throw new Error('at least one --citations <file> is required')
  if (!out.out) throw new Error('--out <file> is required')
  return out as Args
}

const args = parseArgs(process.argv.slice(2))
const slug = args.module.replace(/\s+/g, '-')

/* ---- the tokeniser and matcher, copied from build-evidence.ts ----------- */

/** Words too common to mean anything when two texts share them. */
const STOP = new Set(['the', 'a', 'an', 'of', 'and', 'or', 'is', 'are', 'in', 'on', 'to', 'by',
  'it', 'its', 'as', 'at', 'with', 'from', 'that', 'this', 'which', 'has', 'have', 'be', 'been',
  'for', 'not', 'but', 'they', 'their', 'them', 'these', 'those', 'one', 'two', 'into', 'than',
  'while', 'where', 'when', 'each', 'both', 'other', 'more', 'most', 'some', 'any', 'no'])

const terms = (text: string) => new Set(
  text.toLowerCase().replace(/[^a-z0-9µ\s-]/g, ' ').split(/\s+/)
    .filter((word) => word.length > 3 && !STOP.has(word)))

/**
 * The share of `want`'s own distinctive words that `text` carries.
 *
 * Deliberately asymmetric, same as build-evidence.ts's `overlap`: `want` is
 * the claim's `display_text` and `text` is the article sentence being tested
 * as its evidence, so a long sentence that happens to contain the claim's
 * vocabulary counts as support, and a short sentence sharing a few words with
 * a long claim does not.
 */
function overlap(want: Set<string>, text: string): number {
  if (!want.size) return 0
  const words = terms(text)
  let shared = 0
  for (const word of want) if (words.has(word)) shared += 1
  return shared / want.size
}

// A sentence has to carry at least half of a claim's distinctive vocabulary
// before the claim is allowed to stand as its evidence. Lower than
// build-evidence.ts's 0.6 (concept definition vs. a whole department-book
// passage) because here both sides are single sentences of similar length,
// closer to a paraphrase than a span-vs-sentence match.
const SUPPORTS = 0.5

/* ---- markdown block/field helpers, same shape as build-evidence.ts ------ */

// `(?![\s\S])` rather than a bare `$` — this runs with the `m` flag (needed so
// `^## label` matches a field starting mid-block), and under `m` a bare `$`
// matches the end of *every* line, not just the end of the string. That
// truncated any multi-line field (e.g. an article's `## sections`, which
// spans many paragraphs) at its very first internal blank line. Found by
// this script: `build-evidence.ts` carries the same `$` and never tripped it
// because every field it reads (`id`, `definition`, `module_subject`) is a
// single line.
const field = (block: string, label: string) =>
  block.match(new RegExp(`^## ${label}[ \\t]*\\n([\\s\\S]*?)(?=\\n## |(?![\\s\\S]))`, 'm'))?.[1].trim() ?? ''

const blocksOf = (text: string) => text.split(/^\s*---\s*$/m).map((b) => b.trim()).filter(Boolean)

/* ---- read claims and citations ------------------------------------------ */

interface Claim { id: string, conceptId: string, displayText: string, terms: Set<string> }
const claims: Claim[] = []
for (const file of args.claims) {
  for (const block of blocksOf(readFileSync(file, 'utf8'))) {
    const id = field(block, 'id')
    const conceptId = field(block, 'concept_id')
    const displayText = field(block, 'display_text')
    if (!id || !conceptId || !displayText) continue
    claims.push({ id, conceptId, displayText, terms: terms(displayText) })
  }
}

/** claim id -> citation ids that support it. */
const citationsByClaim = new Map<string, string[]>()
for (const file of args.citations) {
  for (const block of blocksOf(readFileSync(file, 'utf8'))) {
    const id = field(block, 'id')
    const claimId = field(block, 'claim_id')
    if (!id || !claimId) continue
    citationsByClaim.set(claimId, [...(citationsByClaim.get(claimId) ?? []), id])
  }
}

// Only a claim with at least one citation gives a student something to open.
const citedClaims = claims.filter((claim) => (citationsByClaim.get(claim.id)?.length ?? 0) > 0)

/* ---- read articles -------------------------------------------------------*/

interface Article { id: string, relatedConcepts: string[], sectionsRaw: string }
const articles: Article[] = []
for (const file of args.articles) {
  for (const block of blocksOf(readFileSync(file, 'utf8'))) {
    const id = field(block, 'id')
    if (!id.startsWith('ART-')) continue
    if (args.excludeArticles.has(id)) continue
    const relatedConcepts = splitImportList(field(block, 'related_concepts'))
    const sectionsRaw = field(block, 'sections')
    if (!sectionsRaw) continue
    articles.push({ id, relatedConcepts, sectionsRaw })
  }
}

/* ---- sentence splitting, same boundary as build-evidence.ts ------------- */

function sentencesOf(paragraph: string): string[] {
  return paragraph.split(/(?<=[.?!])\s+(?=[A-Z(])/)
    .map((s) => s.trim()).filter((s) => s.length > 25)
}

/* ---- mechanical, collision-checked short slugs for span IDs ------------- */

const usedSlug = new Map<string, string>() // "<domain>-<slug>" -> article id that owns it

function articleDomainAndSlug(articleId: string): { domain: string, slug: string } {
  const parts = articleId.split('-')
  const domain = parts[2] ?? 'GEN'
  const rest = parts.slice(3)
  let wordCount = Math.min(3, rest.length) || 1
  let words = rest.slice(0, wordCount)
  let slug = words.join('-') || 'ARTICLE'
  while (slug.length > 24 && wordCount > 1) {
    wordCount -= 1
    words = rest.slice(0, wordCount)
    slug = words.join('-')
  }
  let key = `${domain}-${slug}`
  // Two articles truncating to the same short slug would collide on span IDs.
  // Grow the truncation word by word until it is unique, then fall back to
  // the untruncated slug — no acronym invention, just less truncation.
  while (usedSlug.has(key) && usedSlug.get(key) !== articleId && wordCount < rest.length) {
    wordCount += 1
    words = rest.slice(0, wordCount)
    slug = words.join('-')
    key = `${domain}-${slug}`
  }
  usedSlug.set(key, articleId)
  return { domain, slug }
}

/* ---- build spans ---------------------------------------------------------*/

interface SpanRecord {
  id: string, articleId: string, sectionId: string, text: string,
  claimIds: string[], citationIds: string[],
}
const spans: SpanRecord[] = []
const evidenceByArticle: Record<string, { claimIds: string[], spanIds: string[] }> = {}

let sentencesSeen = 0
let sentencesMatched = 0

for (const article of articles) {
  const { domain, slug } = articleDomainAndSlug(article.id)
  const eligible = citedClaims.filter((claim) => article.relatedConcepts.includes(claim.conceptId))
  if (!eligible.length) continue

  const sections = parseSections(article.sectionsRaw, article.id.toLowerCase())
  let n = 0
  const articleClaimIds = new Set<string>()
  const articleSpanIds: string[] = []

  for (const section of sections) {
    const paragraphs = section.body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
    for (const paragraph of paragraphs) {
      for (const sentence of sentencesOf(paragraph)) {
        sentencesSeen += 1
        const matched = eligible.filter((claim) => overlap(claim.terms, sentence) >= SUPPORTS)
        if (!matched.length) continue
        sentencesMatched += 1

        const claimIds = [...new Set(matched.map((c) => c.id))].sort()
        const citationIds = [...new Set(claimIds.flatMap((id) => citationsByClaim.get(id) ?? []))].sort()

        n += 1
        const id = `SPN-${domain}-${slug}-${String(n).padStart(2, '0')}`
        spans.push({ id, articleId: article.id, sectionId: section.id, text: sentence, claimIds, citationIds })
        for (const claimId of claimIds) articleClaimIds.add(claimId)
        articleSpanIds.push(id)
      }
    }
  }

  if (articleSpanIds.length) {
    evidenceByArticle[article.id] = { claimIds: [...articleClaimIds].sort(), spanIds: articleSpanIds }
  }
}

/* ---- write output ---------------------------------------------------------*/

const blocks = spans.map((span) => `# Item
## id
${span.id}
## article_id
${span.articleId}
## section_id
${span.sectionId}
## text
${span.text}
## claim_ids
${span.claimIds.join(' | ')}
## citation_ids
${span.citationIds.join(' | ')}`)

const header = `Article evidence spans for ${args.module}.

${spans.length} spans over ${articles.length} articles (of ${Object.keys(evidenceByArticle).length}
carrying at least one), from ${sentencesMatched} of ${sentencesSeen} article-section sentences
(${sentencesSeen ? ((sentencesMatched / sentencesSeen) * 100).toFixed(1) : '0.0'}%) that matched a
cited claim on at least ${SUPPORTS * 100}% of that claim's distinctive vocabulary.

A claim is eligible only if its concept is in the article's own \`related_concepts\` and it
already carries at least one citation in ${args.citations.join(', ')} — an uncited claim gives
a student nothing to open, so no span points at one.

\`section_id\` is derived by \`parseSections\` from src/data/bulkImport.ts, the same function the
import wizard runs, called with \`article_id.toLowerCase()\` — not typed by hand.

Generated by scripts/kasr/build-spans.ts from ${args.articles.join(', ')},
${args.claims.join(', ')} and ${args.citations.join(', ')}. Rerun it and the
file matches today's articles and evidence.`

mkdirSync(dirname(args.out), { recursive: true })
writeFileSync(args.out, batchFile(header, blocks))

const extractDir = `scripts/kasr/extract/${slug}`
mkdirSync(extractDir, { recursive: true })
writeFileSync(`${extractDir}/article-evidence.json`, `${JSON.stringify(evidenceByArticle, null, 1)}\n`)

console.log(JSON.stringify({
  module: args.module,
  articles: articles.length,
  articlesWithSpans: Object.keys(evidenceByArticle).length,
  sentencesSeen,
  sentencesMatched,
  spans: spans.length,
  out: args.out,
  articleEvidenceMap: `${extractDir}/article-evidence.json`,
}, null, 1))
