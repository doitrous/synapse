/**
 * Claims for a module's concepts, and citations for the ones the book supports.
 *
 * Copied from `scripts/kasr/build-evidence.ts` at commit `c0a3709`
 * (`git show c0a3709:scripts/kasr/build-evidence.ts`, branch
 * `claude/kasr-alainy-content-report-e0ee59`, per LANE-BRIEF.md §16). Do not
 * edit `scripts/kasr/`; this is the Alexandria copy and the only one this
 * lane touches.
 *
 * Differences from the Kasr original:
 *   - This file is CLI-only. The Kasr original also has a bare-invocation
 *     branch that hard-codes the "101 ISK" pipeline (its own concept files,
 *     `deptbook-spans.json`, `deptbook.json`, `practical.json` — all
 *     Kasr-specific, none of which exist for Alexandria). That branch is not
 *     copied; running this file with no arguments is a usage error here,
 *     not a fallback to somebody else's module.
 *   - `CONCEPTS`/`OUT` point at `docs/Alexandria-Source-Imports/concept` and
 *     `docs/Alexandria-Source-Imports/evidence`.
 *   - `PAGETEXT_DIR` is `scripts/alexandria/pagetext`.
 *   - `manifestPathFor(module)` does not resolve to one hard-coded Y1
 *     manifest — it resolves a `--book` sourceId over all four Alexandria
 *     manifests (`au-{y1,y2,y3,general}-sources.json`), the same way
 *     `scripts/alexandria/extract/pagetext.py` does, because an Alexandria
 *     module's sources may be catalogued in any one of them.
 *   - `batchFile` comes from `./emit-batch.ts`, not `./emit.ts` — see that
 *     file's header for why (it is `scripts/kasr/emit.ts`'s exported
 *     `batchFile` lifted out on its own, without the `kau:`-flavoured mint
 *     machinery the rest of that file pulls in).
 *
 * USAGE
 * -----
 *
 *   node --experimental-strip-types scripts/alexandria/build-evidence.ts \
 *     --module "AU-MED-102" \
 *     --concepts docs/Alexandria-Source-Imports/concept/AU-MED-102-anatomy-concepts.md \
 *     --book src_8d6ddf874f8984be8217 --book src_3bf4527b51de57464e14 \
 *     --out-prefix AU-MED-102-anatomy-generated
 *
 * `--module` is the AU module id verbatim (`AU-MED-102`), never a slug and
 * never transformed before use. `--concepts` takes one or more hand-authored
 * concept batches — everything up to the next `--flag` is read as a file.
 * `--book` names one or more manifest `src_…` IDs to search, and may repeat;
 * each must already have a cached page text file at
 * `scripts/alexandria/pagetext/<sourceId>.json` — run
 * `python3 scripts/alexandria/extract/pagetext.py <sourceId>` first if it does
 * not. `--out-prefix` is optional and defaults to `<module id, spaces turned
 * to '-'>-generated`; output goes to
 * `docs/Alexandria-Source-Imports/evidence/<out-prefix>-{claims,citations}.md`.
 *
 * A concept whose ID already carries a claim in an existing
 * `evidence/<module-slug>-*claims.md` file (curated or a previous generated
 * pass, under any other prefix) is skipped entirely — this mechanism never
 * mints a second claim for a concept a hand-authored pass already covered.
 *
 * Page matching restricts to the concept's own chapter where the book's
 * headings can be found from its `module_subject` path; where they cannot, or
 * where more than one `--book` matches a concept's department with no clear
 * winner, matching falls back to the whole book (or every supplied book) and
 * every citation minted that way says so in its `context_note`.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { batchFile } from './emit-batch.ts'

const CONCEPTS = 'docs/Alexandria-Source-Imports/concept'
const OUT = 'docs/Alexandria-Source-Imports/evidence'
const PAGETEXT_DIR = 'scripts/alexandria/pagetext'
const MANIFEST_DIR = 'docs/Alexandria-Source-Imports/manifest'
const MANIFEST_FILES = [
  'au-y1-sources.json', 'au-y2-sources.json', 'au-y3-sources.json', 'au-general-sources.json',
]

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'))

interface ManifestSource { sourceId: string, subject?: string }

/**
 * Every Alexandria manifest source, merged, by sourceId.
 *
 * Unlike the Kasr original's `manifestPathFor(module)` — which always returns
 * the one Y1 manifest, because every module Kasr's script builds is Year 1 —
 * an Alexandria module's `--book` sources may be catalogued in any of the
 * four manifest files (y1/y2/y3/general), so this merges all four rather
 * than picking one by module id.
 */
function allManifestSources(): Map<string, ManifestSource> {
  const by_id = new Map<string, ManifestSource>()
  for (const name of MANIFEST_FILES) {
    const path = `${MANIFEST_DIR}/${name}`
    if (!existsSync(path)) continue
    const data = read(path) as { sources: ManifestSource[] }
    for (const source of data.sources) by_id.set(source.sourceId, source)
  }
  return by_id
}

/** Words too common to mean anything when two texts share them. */
const STOP = new Set(['the', 'a', 'an', 'of', 'and', 'or', 'is', 'are', 'in', 'on', 'to', 'by',
  'it', 'its', 'as', 'at', 'with', 'from', 'that', 'this', 'which', 'has', 'have', 'be', 'been',
  'for', 'not', 'but', 'they', 'their', 'them', 'these', 'those', 'one', 'two', 'into', 'than',
  'while', 'where', 'when', 'each', 'both', 'other', 'more', 'most', 'some', 'any', 'no'])

const terms = (text: string) => new Set(
  text.toLowerCase().replace(/[^a-z0-9µ\s-]/g, ' ').split(/\s+/)
    .filter((word) => word.length > 3 && !STOP.has(word)))

/**
 * How well a span supports a sentence, from 0 to 1.
 *
 * The share of the sentence's own distinctive words that the span carries.
 * Deliberately asymmetric: a long span that happens to contain the sentence's
 * terms IS supporting evidence, whereas a short span sharing a few words with
 * a long sentence is not, and a symmetric measure would rank the second above
 * the first.
 */
function overlap(sentence: Set<string>, span: string): number {
  if (!sentence.size) return 0
  const words = terms(span)
  let shared = 0
  for (const word of sentence) if (words.has(word)) shared += 1
  return shared / sentence.size
}

/**
 * `## label` out of a block. `[ \t]*` so a blank value does not eat the next
 * heading.
 *
 * The lookahead is `(?=\n## |(?![\s\S]))`, not `(?=\n## |$)` — see
 * LANE-BRIEF.md §10 "Evidence tooling": under the `m` flag `$` matches at
 * every line break, not just end of string, so a multi-line field's capture
 * would stop at its first blank line rather than at the next `## ` heading or
 * the real end of the block. `(?![\s\S])` matches only true end-of-string.
 */
const field = (block: string, label: string) =>
  block.match(new RegExp(`^## ${label}[ \\t]*\\n([\\s\\S]*?)(?=\\n## |(?![\\s\\S]))`, 'm'))?.[1].trim() ?? ''

const stable = (seed: string, prefix: string, width = 12) =>
  `${prefix}-${createHash('sha256').update(seed).digest('hex').toUpperCase().slice(0, width)}`

/**
 * A sentence's subject, predicate and object.
 *
 * A rough split on the first verb, which is what these definitions are shaped
 * like — "The hyalomere is the peripheral, pale zone of the platelet". Where
 * no verb is found the whole sentence becomes the object under a bare
 * `states`, rather than being dropped: the claim is still true and still
 * citable, and losing it to keep the grammar tidy would be the wrong trade.
 */
const VERBS = /\b(is|are|was|were|has|have|contains|consists|forms|arises|develops|drains|supplies|lies|runs|becomes|carries|permits|unites|gives|produces|stains|shows|appears|measures|occupies|separates|covers|opens)\b/

function triple(sentence: string): { subject: string, predicate: string, object: string } {
  const match = sentence.match(VERBS)
  if (!match || match.index === undefined) {
    return { subject: sentence.split(/[,;]/)[0].trim().slice(0, 120), predicate: 'states', object: sentence }
  }
  const subject = sentence.slice(0, match.index).trim()
  const object = sentence.slice(match.index + match[1].length).trim().replace(/[.]$/, '')
  // The verb can be the last word — "…paralyses everything the nerve supplies."
  // — which leaves nothing on the right of the split and an empty `object`,
  // which the importer refuses. The sentence is a perfectly good claim; only
  // the grammatical split fails, so it falls back rather than being dropped.
  if (!subject || !object) {
    return { subject: sentence.split(/[,;—]/)[0].trim().slice(0, 120), predicate: 'states', object: sentence }
  }
  return { subject, predicate: match[1], object }
}

// A span has to carry most of a sentence's distinctive vocabulary before it is
// allowed to stand as that sentence's evidence. Set high on purpose: the cost
// of a wrong citation is a reviewer's trust in every other one.
const SUPPORTS = 0.6

/** A concept's `## definition` split into claimable sentences. */
const claimSentences = (definition: string) =>
  definition.split(/(?<=[.])\s+(?=[A-Z])/).map((one) => one.trim()).filter((one) => one.length > 25)

// ===========================================================================
// CLI — the only mode this file has. There is no bare-invocation fallback;
// see the file header for why.
// ===========================================================================

interface CliArgs {
  module: string
  conceptFiles: string[]
  bookIds: string[]
  outPrefix: string
}

function parseCli(argv: string[]): CliArgs {
  let module: string | undefined
  const conceptFiles: string[] = []
  const bookIds: string[] = []
  let outPrefix: string | undefined
  let i = 0
  while (i < argv.length) {
    const flag = argv[i]
    if (flag === '--module') {
      module = argv[i + 1]
      if (!module) throw new Error('--module requires a value, e.g. --module "AU-MED-102"')
      i += 2
    } else if (flag === '--concepts') {
      i += 1
      if (!argv[i] || argv[i].startsWith('--')) {
        throw new Error('--concepts requires at least one file path after it')
      }
      while (i < argv.length && !argv[i].startsWith('--')) { conceptFiles.push(argv[i]); i += 1 }
    } else if (flag === '--book') {
      const book = argv[i + 1]
      if (!book) throw new Error('--book requires a manifest source id, e.g. --book src_…')
      bookIds.push(book)
      i += 2
    } else if (flag === '--out-prefix') {
      outPrefix = argv[i + 1]
      if (!outPrefix) throw new Error('--out-prefix requires a value')
      i += 2
    } else if (flag === '--help') {
      console.log(`Usage: node --experimental-strip-types scripts/alexandria/build-evidence.ts \\
  --module "AU-MED-102" \\
  --concepts docs/Alexandria-Source-Imports/concept/AU-MED-102-anatomy-concepts.md \\
  --book src_… [--book src_… ...] \\
  [--out-prefix AU-MED-102-anatomy-generated]

See the header comment in this file for the full field semantics.`)
      process.exit(0)
    } else {
      throw new Error(`unrecognised argument "${flag}" — see the usage comment at the top of this file`)
    }
  }
  if (!module) throw new Error('--module is required, e.g. --module "AU-MED-102"')
  if (!conceptFiles.length) throw new Error('--concepts requires at least one concept batch file')
  if (!bookIds.length) throw new Error('--book requires at least one manifest source id')
  return { module, conceptFiles, bookIds, outPrefix: outPrefix ?? `${module.replace(/\s+/g, '-')}-generated` }
}

const cli = parseCli(process.argv.slice(2))
buildForModule(cli)

/** One book's cached page text, as `pagetext.py` writes it. */
interface BookDoc { sourceId: string, file: string, mode: string, pages: string[], emptyPages: number[] }

/** A heading candidate line, for locating a concept's chapter without a pre-built chapter map. */
interface Heading { page: number, text: string }

/**
 * Lines that read like a heading: short, and either ALL CAPS or Title Case.
 *
 * There is no pre-built chapter map for any Alexandria book — department
 * books in this corpus print their section titles as short capitalised
 * lines, so scanning for that shape gives a usable, if approximate, table of
 * contents without anyone having to build one per book. It is looked up by
 * term overlap against the concept's own curriculum path, the same measure
 * `overlap` uses everywhere else here, so a wrong guess fails the same 0.6
 * bar a wrong span would.
 */
function headingCandidates(pages: string[]): Heading[] {
  const out: Heading[] = []
  pages.forEach((pageText, index) => {
    for (const raw of pageText.split('\n')) {
      const line = raw.trim()
      if (!line || line.length > 80) continue
      const words = line.split(/\s+/)
      if (words.length > 10) continue
      const isUpper = line === line.toUpperCase() && /[A-Za-z]/.test(line)
      const isTitleCase = words.every((word) => /^[(]?[A-Z0-9]/.test(word))
      if (isUpper || isTitleCase) out.push({ page: index + 1, text: line })
    }
  })
  return out
}

/** One page's non-empty lines, tagged with the book it came from. */
interface RangedPage { sourceId: string, page: number, lines: string[] }

function pagesInRange(book: BookDoc, range: { from: number, to: number } | null): RangedPage[] {
  const from = range?.from ?? 1
  const to = Math.min(range?.to ?? book.pages.length, book.pages.length)
  const out: RangedPage[] = []
  for (let p = from; p <= to; p += 1) {
    const lines = (book.pages[p - 1] ?? '').split('\n').map((line) => line.trim()).filter(Boolean)
    if (lines.length) out.push({ sourceId: book.sourceId, page: p, lines })
  }
  return out
}

/** The best consecutive-line window across a set of pages. */
function bestSpan(sentence: string, pages: RangedPage[]):
  { sourceId: string, page: number, span: string, score: number } | null {
  const want = terms(sentence)
  let best: { sourceId: string, page: number, span: string, score: number, length: number } | null = null
  for (const { sourceId, page, lines } of pages) {
    for (let start = 0; start < lines.length; start += 1) {
      for (let length = 1; length <= 5 && start + length <= lines.length; length += 1) {
        const window = lines.slice(start, start + length).join(' ')
        if (window.length > 600) break
        const score = overlap(want, window)
        if (!best || score > best.score || (score === best.score && length < best.length)) {
          best = { sourceId, page, span: window, score, length }
        }
      }
    }
  }
  return best
}

function buildForModule(args: CliArgs) {
  const manifestBySourceId = allManifestSources()

  const books: BookDoc[] = args.bookIds.map((sourceId) => {
    const path = `${PAGETEXT_DIR}/${sourceId}.json`
    if (!existsSync(path)) {
      throw new Error(`--book ${sourceId}: no cached page text at ${path} — run `
        + `python3 scripts/alexandria/extract/pagetext.py ${sourceId} first`)
    }
    return read(path) as BookDoc
  })
  const headingsByBook = new Map<string, Heading[]>(
    books.map((book) => [book.sourceId, headingCandidates(book.pages)]))

  /** The book(s) to search for one concept, and whether the pick was confident. */
  function bookFor(modulePath: string): { picked: BookDoc[], confident: boolean, department: string } {
    const segments = modulePath.split('>').map((one) => one.trim())
    const department = segments[1] ?? modulePath
    const departmentTerms = terms(department)
    const scored = books
      .map((book) => ({ book, score: overlap(departmentTerms, manifestBySourceId.get(book.sourceId)?.subject ?? '') }))
      .sort((a, b) => b.score - a.score)
    if (scored[0] && scored[0].score >= 0.5) return { picked: [scored[0].book], confident: true, department }
    return { picked: books, confident: false, department }
  }

  /** The chapter's page range in one book, from the deepest segment of the concept's path inward. */
  function chapterRange(book: BookDoc, modulePath: string):
    { from: number, to: number, matchedHeading: string, score: number } | null {
    const headings = headingsByBook.get(book.sourceId) ?? []
    if (!headings.length) return null
    const segments = modulePath.split('>').map((one) => one.trim()).slice(2)
    for (const segment of [...segments].reverse()) {
      const want = terms(segment)
      let best: { heading: Heading, score: number } | null = null
      for (const heading of headings) {
        const score = overlap(want, heading.text)
        if (!best || score > best.score) best = { heading, score }
      }
      if (best && best.score >= 0.5) {
        const laterPages = [...new Set(headings.map((one) => one.page))]
          .filter((page) => page > best!.heading.page).sort((a, b) => a - b)
        const to = (laterPages[0] ?? book.pages.length + 1) - 1
        return { from: best.heading.page, to, matchedHeading: best.heading.text, score: best.score }
      }
    }
    return null
  }

  /** Concept IDs an existing evidence file (curated, or an earlier generated pass) already claims. */
  function alreadyClaimed(module: string, ownFile: string): Set<string> {
    const ids = new Set<string>()
    if (!existsSync(OUT)) return ids
    const prefix = `${module.replace(/\s+/g, '-')}-`
    for (const name of readdirSync(OUT)) {
      if (!name.startsWith(prefix) || !name.endsWith('claims.md') || name === ownFile) continue
      const text = readFileSync(`${OUT}/${name}`, 'utf8')
      for (const match of text.matchAll(/## concept_id\n(\S+)/g)) ids.add(match[1])
    }
    return ids
  }

  const claimsFileName = `${args.outPrefix}-claims.md`
  const skip = alreadyClaimed(args.module, claimsFileName)

  const claims = new Map<string, string>()
  const citations = new Map<string, string>()
  let evidenced = 0
  let unevidenced = 0
  let skippedConcepts = 0
  let seenConcepts = 0
  const byConcept = new Map<string, string[]>()

  for (const file of args.conceptFiles) {
    if (!existsSync(file)) continue // e.g. a dry run against an empty/nonexistent concept file
    const text = readFileSync(file, 'utf8')
    for (const block of text.split(/^\s*---\s*$/m)) {
      const id = field(block, 'id')
      const definition = field(block, 'definition')
      if (!id || !definition) continue
      seenConcepts += 1
      if (skip.has(id)) { skippedConcepts += 1; continue }

      const modulePath = field(block, 'module_subject').split('\n')[0].trim()
      const subjectLabel = field(block, 'label')

      const { picked, confident, department } = bookFor(modulePath)
      let searchPages: RangedPage[]
      let chapterNote: string
      if (confident) {
        const book = picked[0]
        const range = chapterRange(book, modulePath)
        if (range) {
          searchPages = pagesInRange(book, range)
          chapterNote = `Matched within "${range.matchedHeading}" (${book.sourceId}, pages ${range.from}-${range.to}), the chapter this concept's curriculum path locates in the book's own headings.`
        } else {
          searchPages = pagesInRange(book, null)
          chapterNote = `Could not locate "${modulePath}" among ${book.sourceId}'s headings; matched across the whole book instead.`
        }
      } else {
        searchPages = picked.flatMap((book) => pagesInRange(book, null))
        chapterNote = `No supplied --book matched this concept's department ("${department}") with confidence; matched across all ${picked.length} supplied book(s) instead of one chapter.`
      }

      const sentences = claimSentences(definition)
      sentences.forEach((sentence, index) => {
        const claimId = stable(`${id}:${index}:${sentence}`, 'CLM')
        if (claims.has(claimId)) return
        const { subject, predicate, object } = triple(sentence)
        const best = bestSpan(sentence, searchPages)
        const supported = best !== null && best.score >= SUPPORTS
        if (supported) evidenced += 1; else unevidenced += 1
        byConcept.set(id, [...new Set([...(byConcept.get(id) ?? []), claimId])])

        claims.set(claimId, `# Item
## id
${claimId}
## concept_id
${id}
## subject
${subject}
## predicate
${predicate}
## object
${object}
## display_text
${sentence}
## risk_class
foundational_stable
## verification_status
${supported ? 'verified' : 'needs_evidence'}
## conflict_status
none
## confidence
${supported ? (0.6 + Math.min(0.3, best!.score - SUPPORTS)).toFixed(2) : '0.4'}
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
concept: ${subjectLabel}
curriculum: ${modulePath}`)

        if (supported && best) {
          const book = books.find((one) => one.sourceId === best.sourceId)!
          citations.set(claimId, `# Item
## id
${stable(`${claimId}:${best.sourceId}:${best.page}`, 'CIT')}
## claim_id
${claimId}
## resource_id
${best.sourceId}
## evidence_role
local_curriculum
## support_span
${best.span}
## locator_type
page
## locator_page
${best.page}
## locator_section
${modulePath}
## locator_detail
PDF page ${best.page} of ${book.file}${book.mode === 'ocr' ? ' (OCR text — check wording against the page image before treating it as verbatim)' : ''}
## context_note
Matched to the claim on ${(best.score * 100).toFixed(0)}% of its distinctive terms. ${chapterNote} The department book is this faculty's own teaching text, so this is local curriculum evidence and not independent verification.
## confidence
${(0.6 + Math.min(0.3, best.score - SUPPORTS)).toFixed(2)}
## counts_as_claim_evidence
yes`)
        }
      })
    }
  }

  const header = (what: string, body: string) => `${what}

${body}

Generated by scripts/alexandria/build-evidence.ts --module "${args.module}" from
${args.conceptFiles.join(', ')}
and the pagetext cache under scripts/alexandria/pagetext/, searched against
${args.bookIds.join(', ')}. Rerun with the same arguments and the batch is
today's concepts.`

  mkdirSync(OUT, { recursive: true })
  writeFileSync(`${OUT}/${args.outPrefix}-claims.md`, batchFile(header(
    `Claims for the ${args.module} concepts in ${args.conceptFiles.map((one) => one.split('/').pop()).join(', ')}.`,
    `${claims.size} claims from ${byConcept.size} concepts. ${skippedConcepts} of ${seenConcepts} concept(s) already
had a claim in an existing evidence/${args.module.replace(/\s+/g, '-')}-*claims.md file and were skipped, so a
curated claim is never duplicated by this pass.

${evidenced} carry a citation and stand at \`verified\`. ${unevidenced} do not, and
stand at \`needs_evidence\`.`), [...claims.values()]))

  writeFileSync(`${OUT}/${args.outPrefix}-citations.md`, batchFile(header(
    `Where the book(s) named on --book say what the ${args.module} claims say.`,
    `${citations.size} citations, every one quoting a cached page's own line.

A span is attached only where it carries at least ${SUPPORTS * 100}% of the claim's
distinctive vocabulary. Page matching is restricted to the concept's own chapter
where the book's headings could be found from its \`module_subject\` path; every
citation minted from a whole-book or multi-book fallback instead says so in its
own \`context_note\`, rather than looking as precise as a chapter-scoped one.

\`evidence_role\` is \`local_curriculum\` throughout. This is the faculty's own
teaching text — authoritative for what this faculty holds and teaches, and not
independent verification of it.`), [...citations.values()]))

  console.log(`${claims.size} claims (${evidenced} evidenced, ${unevidenced} not, ${skippedConcepts} concept(s) skipped as already-curated) -> ${OUT}/${args.outPrefix}-claims.md`)
  console.log(`${citations.size} citations -> ${OUT}/${args.outPrefix}-citations.md`)
}
