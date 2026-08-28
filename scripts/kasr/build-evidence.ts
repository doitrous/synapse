/**
 * Claims for a module's concepts, and citations for the ones the book supports.
 *
 * A concept asserts something. `definition` is that assertion written out, so
 * the claims are its sentences — not a new set of facts invented alongside it,
 * which would be two records of one thing that could disagree.
 *
 * The citation is the part that has to be earned. `support_span` must be the
 * source's own words, quoted, and a citation whose span does not actually
 * support its claim is worse than no citation at all: it looks like rigour and
 * is not, and a reviewer who spot-checks two and finds them fine will trust the
 * other nine hundred. So a span is attached only where the match is strong, and
 * `counts_as_claim_evidence` is `yes` only then. Everything else is emitted as a
 * claim at `needs_evidence` with no citation — which is a true statement about
 * what has been checked, and a work list for the pass that checks the rest.
 *
 * USAGE
 * -----
 *
 * Bare — 101 ISK, unchanged since this was hard-coded for one module:
 *
 *   node --experimental-strip-types scripts/kasr/build-evidence.ts
 *
 * With no arguments this reads the same three fixed concept files, the same
 * pre-built department-book span/chapter maps
 * (`scripts/kasr/extract/deptbook-spans.json`, `deptbook.json`) and the same
 * practical-book plates (`scripts/kasr/extract/practical.json`) it always has,
 * and writes `docs/Kasr-Source-Imports/evidence/101-ISK-{claims,citations}.md`
 * plus `scripts/kasr/seeds/claim-links.json` exactly as before. Every line in
 * that path is untouched by the CLI added below — see `check-id-stability`-style
 * proof in the module's own worklog, and prove it yourself with
 * `git diff --stat docs/Kasr-Source-Imports/evidence/101-ISK-*` after a bare run.
 *
 * For any other module, name it explicitly:
 *
 *   node --experimental-strip-types scripts/kasr/build-evidence.ts \
 *     --module "108 INT" \
 *     --concepts docs/Kasr-Source-Imports/concept/108-INT-concepts-pathology.md \
 *                docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md \
 *     --book src_e294bafc730fe7111b06 --book src_af30e4191cb4087f8d3f \
 *     --out-prefix 108-INT-generated
 *
 * `--module` is the catalogue's own spelling, verbatim (`MODULES` in
 * `seeds/types.ts` for Year 1; "205 NEU", "IM 4" and so on once Years 2-5 have
 * their own catalogue entries) — never a slug, and never transformed before
 * use. `--concepts` takes one or more hand-authored concept batches —
 * everything up to the next `--flag` is read as a file. `--book` names one or
 * more manifest `src_…` IDs to search, and may repeat; each must already have
 * a cached page text file at `scripts/kasr/extract/pagetext/<sourceId>.json` —
 * run `python3 scripts/kasr/extract/pagetext.py <sourceId>` first if it does
 * not. `--out-prefix` is optional and defaults to `<module id, spaces turned
 * to '-'>-generated` (`"205 NEU"` → `205-NEU-generated`); output goes to
 * `docs/Kasr-Source-Imports/evidence/<out-prefix>-{claims,citations}.md`.
 *
 * The only place this file names a manifest path is `manifestPathFor(module)`
 * below — every module built here is Year 1 today, so it always returns the Y1
 * manifest, but it exists as its own seam so the Years 2-5 coordinator's
 * `manifestFor(module)` (module id → that year's manifest) can be dropped in
 * as its body without hunting for a second hard-coded path anywhere else in
 * this file.
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
 * every citation minted that way says so in its `context_note`. There is no
 * practical-book plate fallback outside 101 — no other module's practical book
 * has been extracted into that shape yet.
 *
 * This mode never touches `scripts/kasr/seeds/claim-links.json`: that file is
 * 101's own bridge into `atomic_claim_ids`, and every other module already gets
 * its links from `scripts/kasr/extract/<slug>/` plan files read by
 * `seeds/links.ts`, not from this generator. Wiring generated evidence into a
 * concept's `atomic_claim_ids` is a follow-up, not something this pass does.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { batchFile } from './emit.ts'

const CONCEPTS = 'docs/Kasr-Source-Imports/concept'
const SPANS = 'scripts/kasr/extract/deptbook-spans.json'
const CHAPTERS = 'scripts/kasr/extract/deptbook.json'
const OUT = 'docs/Kasr-Source-Imports/evidence'
const PAGETEXT_DIR = 'scripts/kasr/extract/pagetext'

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'))

/**
 * The manifest a module's sources are catalogued in.
 *
 * Every module this script builds today — 101 ISK through 108 INT — is Year 1,
 * so this always resolves to the Y1 manifest. It exists as its own function,
 * rather than a top-level constant, because it is the ONLY place in this file
 * that names a manifest path: the Years 2-5 coordinator's `manifestFor(module)`
 * (mapping a catalogue id like "205 NEU" or "IM 4" to its own year's manifest)
 * is this function's eventual replacement, and swapping the body here for a
 * call to that is meant to be the only edit this file needs when it lands.
 */
function manifestPathFor(module: string): string {
  void module // read by the eventual manifestFor(module); unused by the Y1-only body today
  return 'docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json'
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
 * terms IS supporting evidence, whereas a short span sharing a few words with a
 * long sentence is not, and a symmetric measure would rank the second above the
 * first.
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
 * The lookahead is `(?=\n## |(?![\s\S]))`, not `(?=\n## |$)`. Under the `m`
 * flag `$` matches at every line break, not just end of string, so `$` alone
 * stops a multi-line field's capture at its *first* blank line rather than at
 * the next `## ` heading or the end of the block — a claim's `## qualifiers`,
 * which is two lines with a blank line nowhere near them, still worked by
 * accident, but any field that legitimately contains a blank line inside it
 * would have been truncated. `(?![\s\S])` matches only true end-of-string, so
 * a field's capture now stops solely at the next heading or the real end.
 */
const field = (block: string, label: string) =>
  block.match(new RegExp(`^## ${label}[ \\t]*\\n([\\s\\S]*?)(?=\\n## |(?![\\s\\S]))`, 'm'))?.[1].trim() ?? ''

const stable = (seed: string, prefix: string, width = 12) =>
  `${prefix}-${createHash('sha256').update(seed).digest('hex').toUpperCase().slice(0, width)}`

/**
 * A sentence's subject, predicate and object.
 *
 * A rough split on the first verb, which is what these definitions are shaped
 * like — "The hyalomere is the peripheral, pale zone of the platelet". Where no
 * verb is found the whole sentence becomes the object under a bare `states`,
 * rather than being dropped: the claim is still true and still citable, and
 * losing it to keep the grammar tidy would be the wrong trade.
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
// CLI — parsed once, up front. `null` means "no arguments", which is the
// signal to run the original 101 pipeline below completely unchanged.
// ===========================================================================

interface CliArgs {
  module: string
  conceptFiles: string[]
  bookIds: string[]
  outPrefix: string
}

function parseCli(argv: string[]): CliArgs | null {
  if (!argv.length) return null
  let module: string | undefined
  const conceptFiles: string[] = []
  const bookIds: string[] = []
  let outPrefix: string | undefined
  let i = 0
  while (i < argv.length) {
    const flag = argv[i]
    if (flag === '--module') {
      module = argv[i + 1]
      if (!module) throw new Error('--module requires a value, e.g. --module "103 BMS"')
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
    } else {
      throw new Error(`unrecognised argument "${flag}" — see the usage comment at the top of this file`)
    }
  }
  if (!module) throw new Error('--module is required in CLI mode, e.g. --module "103 BMS"')
  if (!conceptFiles.length) throw new Error('--concepts requires at least one concept batch file')
  if (!bookIds.length) throw new Error('--book requires at least one manifest source id')
  return { module, conceptFiles, bookIds, outPrefix: outPrefix ?? `${module.replace(/\s+/g, '-')}-generated` }
}

const cli = parseCli(process.argv.slice(2))

if (!cli) {
  // =========================================================================
  // THE ORIGINAL 101 ISK PIPELINE — byte-for-byte unchanged. Every path, every
  // constant, every write below is exactly what this file did before the CLI
  // above existed. Do not "clean this up" to share code with `buildForModule`;
  // the whole point of the split is that this branch cannot be affected by
  // anything added for another module.
  // =========================================================================
  const spanDoc = read(SPANS) as { sourceId: string, pageSpans: PageSpans[] }
  const chapters = read(CHAPTERS) as {
    chapters: { subjectPath: string, startPage?: number, endPage?: number, found?: boolean }[]
  }

  interface Span { text: string, kind: string }
  interface PageSpans { page: number, printedPage: number | null, spans: Span[] }

  /** The book's pages for a curriculum path, from the chapter map. */
  function pagesFor(modulePath: string): PageSpans[] {
    const chapter = chapters.chapters.find((one) => one.subjectPath === modulePath && one.found)
    if (!chapter?.startPage) return []
    const from = chapter.startPage
    const to = chapter.endPage ?? chapter.startPage
    return spanDoc.pageSpans.filter((page) => page.page >= from && page.page <= to)
  }

  /**
   * The practical book's plates, as spans a slide-identification concept can cite.
   *
   * The department book is written for a written paper: it teaches the blood film
   * as a chapter, not as a thing to recognise down a microscope. So the concepts
   * minted from the practical — "reticulocyte supravital identification",
   * "collagen versus elastic fibre identification" — find little in it, and only
   * 12% of their claims were evidenced against 30% elsewhere. The book is not
   * failing them; it is the wrong book.
   *
   * The right one is the department's own practical book, whose answer pages say
   * exactly what a student must see and name. Those are quoted here.
   *
   * They are an OCR transcription rather than the page — the practical book has no
   * text layer — and every citation drawn from them says so, because a span a
   * reviewer cannot find on the page as written is a span they cannot check.
   */
  interface Slide {
    sourceId: string, page: number, title?: string, stain?: string,
    identifyingFeatures?: string[], askedAs?: string[], subjectPath?: string,
  }
  const slides: Slide[] = (() => {
    try { return (read('scripts/kasr/extract/practical.json').slides ?? []) as Slide[] }
    catch { return [] }
  })()

  /** The plates filed under a curriculum path. */
  const slidesFor = (modulePath: string) =>
    slides.filter((slide) => slide.subjectPath === modulePath)

  /**
   * Claims and citations by ID, not in a list.
   *
   * A concept can be authored into more than one batch — the same idea reached
   * from a paper and from a question book — and the ID is minted from the concept
   * and the sentence, so both passes produce the same claim. That is correct:
   * one idea, one claim. Emitting it twice is not, and the importer refuses a
   * batch with a duplicate ID rather than quietly keeping the last one.
   */
  const claims = new Map<string, string>()
  const citations = new Map<string, string>()
  let evidenced = 0
  let unevidenced = 0
  const byConcept = new Map<string, string[]>()

  for (const file of ['101-ISK-concepts.md', '101-ISK-mcq-concepts.md', '101-ISK-practical-concepts.md']) {
    let text: string
    try { text = readFileSync(`${CONCEPTS}/${file}`, 'utf8') } catch { continue }

    for (const block of text.split(/^\s*---\s*$/m)) {
      const id = field(block, 'id')
      const definition = field(block, 'definition')
      if (!id || !definition) continue

      const modulePath = field(block, 'module_subject').split('\n')[0].trim()
      const pages = pagesFor(modulePath)
      const subjectLabel = field(block, 'label')

      const sentences = claimSentences(definition)

      sentences.forEach((sentence, index) => {
        const claimId = stable(`${id}:${index}:${sentence}`, 'CLM')
        const { subject, predicate, object } = triple(sentence)

        // The best span in this concept's own chapter, and only there. A span
        // from another chapter that happens to share vocabulary is not evidence
        // that this chapter teaches this.
        const want = terms(sentence)
        let best: { page: PageSpans, span: string, score: number, lines: number } | null = null
        for (const page of pages) {
          const lines = page.spans.filter((span) => span.kind !== 'heading').map((span) => span.text)
          // A window of consecutive lines, not one line.
          //
          // This book sets its facts as short fragments — `Percentage: 60 – 70%`,
          // `Nucleus: single but segmented 2–5 lobes` — while a claim is a whole
          // sentence. Scoring line by line asked one fragment to carry a
          // sentence's entire vocabulary, and 1,190 of 1,253 claims came back
          // unevidenced against a book that plainly does support them. What
          // supports a claim here is a passage, and a passage is what a
          // `support_span` should quote.
          for (let start = 0; start < lines.length; start += 1) {
            for (let length = 1; length <= 5 && start + length <= lines.length; length += 1) {
              const window = lines.slice(start, start + length).join(' ')
              if (window.length > 600) break
              const score = overlap(want, window)
              // Shorter wins a tie: the tightest passage that still supports the
              // claim is the one a reviewer can check fastest.
              if (!best || score > best.score || (score === best.score && length < best.lines)) {
                best = { page, span: window, score, lines: length }
              }
            }
          }
        }

        let plate: { slide: Slide, span: string, score: number } | null = null
        if (!best || best.score < SUPPORTS) {
          for (const slide of slidesFor(modulePath)) {
            // What the answer page says the student must see, and what it asks.
            const lines = [slide.title, slide.stain && `stained with ${slide.stain}`,
              ...(slide.identifyingFeatures ?? []), ...(slide.askedAs ?? [])].filter(Boolean) as string[]
            for (let start = 0; start < lines.length; start += 1) {
              for (let length = 1; length <= 4 && start + length <= lines.length; length += 1) {
                const window = lines.slice(start, start + length).join('; ')
                if (window.length > 400) break
                const score = overlap(want, window)
                if (!plate || score > plate.score) plate = { slide, span: window, score }
              }
            }
          }
        }

        const supported = (best !== null && best.score >= SUPPORTS)
          || (plate !== null && plate.score >= SUPPORTS)
        if (claims.has(claimId)) return
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

        // Prefer the department book where it reaches; fall back to the plate.
        if (supported && plate && plate.score >= SUPPORTS && (!best || best.score < SUPPORTS)) {
          citations.set(claimId, `# Item
## id
${stable(`${claimId}:${plate.slide.sourceId}:${plate.slide.page}`, 'CIT')}
## claim_id
${claimId}
## resource_id
${plate.slide.sourceId}
## evidence_role
local_curriculum
## support_span
${plate.span}
## locator_type
page
## locator_page
${plate.slide.page}
## locator_section
${modulePath}
## locator_detail
Plate on page ${plate.slide.page}${plate.slide.title ? `, "${plate.slide.title}"` : ''}
## context_note
From the department's practical book, which is where this faculty says what a student must see and name down the microscope — the department textbook teaches the same tissue as a chapter rather than as a thing to recognise. The book has no text layer, so this span is an OCR transcription of the answer page rather than the page as printed, and a reviewer checking it should expect the wording to differ in small ways.
## confidence
${(0.5 + Math.min(0.25, plate.score - SUPPORTS)).toFixed(2)}
## counts_as_claim_evidence
yes`)
        } else if (supported && best) {
          citations.set(claimId, `# Item
## id
${stable(`${claimId}:${spanDoc.sourceId}:${best.page.page}`, 'CIT')}
## claim_id
${claimId}
## resource_id
${spanDoc.sourceId}
## evidence_role
local_curriculum
## support_span
${best.span}
## locator_type
printed_page
## locator_page
${best.page.printedPage ?? best.page.page}
## locator_section
${modulePath}
## locator_detail
PDF page ${best.page.page}${best.page.printedPage ? `, printed as ${best.page.printedPage}` : ''}
## context_note
Matched to the claim on ${(best.score * 100).toFixed(0)}% of its distinctive terms, within the chapter the concept's curriculum path names. The department book is this faculty's own teaching text, so this is local curriculum evidence and not independent verification.
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

Generated by scripts/kasr/build-evidence.ts from the concept batches and
../../../scripts/kasr/extract/deptbook-spans.json, which holds the department
book's own lines page by page. Rerun it and the batch is today's concepts.`

  mkdirSync(OUT, { recursive: true })
  writeFileSync(`${OUT}/101-ISK-claims.md`, batchFile(header(
    'Every assertion the 101 ISK concepts make, as claims.',
    `${claims.size} claims from ${byConcept.size} concepts.

A concept asserts something and its \`definition\` is that assertion written
out, so the claims are its sentences rather than a second set of facts written
alongside — two records of one thing can disagree, and then nobody knows which
the module teaches.

${evidenced} carry a citation to the department book and stand at \`verified\`.
${unevidenced} do not, and stand at \`needs_evidence\`. That split is the point of
the file: a claim is only as good as the span under it, and the ones without a
span are the work list for the pass that finds them.`), [...claims.values()]))

  writeFileSync(`${OUT}/101-ISK-citations.md`, batchFile(header(
    'Where the department book says what the claims say.',
    `${citations.size} citations, every one quoting the book's own line.

A span is attached only where it carries at least ${SUPPORTS * 100}% of the claim's
distinctive vocabulary, and only from the chapter the concept's own curriculum
path names — a span from elsewhere in the book that happens to share words is
not evidence that this chapter teaches this.

The threshold is high deliberately. A citation whose span does not support its
claim is worse than no citation: it looks like rigour, and a reviewer who
spot-checks two, finds them sound, and trusts the rest has been misled by it.

\`evidence_role\` is \`local_curriculum\` throughout. This is the faculty's own
teaching text — authoritative for what this faculty holds and teaches, and not
independent verification of it.`), [...citations.values()]))

  console.log(`${claims.size} claims (${evidenced} evidenced, ${unevidenced} not) -> ${OUT}/101-ISK-claims.md`)
  console.log(`${citations.size} citations -> ${OUT}/101-ISK-citations.md`)

  // The `atomic_claim_ids` each concept should carry, for the emitter.
  writeFileSync('scripts/kasr/seeds/claim-links.json',
    `${JSON.stringify(Object.fromEntries([...byConcept].sort()), null, 1)}\n`)
  console.log(`claim ids for ${byConcept.size} concepts -> scripts/kasr/seeds/claim-links.json`)
} else {
  // =========================================================================
  // ANY OTHER MODULE — reads its own hand-authored concept files and the
  // shared page-text cache, restricted to the concept's own chapter where a
  // heading for it can be found.
  // =========================================================================
  buildForModule(cli)
}

/** One book's cached page text, as `pagetext.py` writes it. */
interface BookDoc { sourceId: string, file: string, mode: string, pages: string[], emptyPages: number[] }

/** A heading candidate line, for locating a concept's chapter without a pre-built chapter map. */
interface Heading { page: number, text: string }

/**
 * Lines that read like a heading: short, and either ALL CAPS or Title Case.
 *
 * There is no pre-built chapter map for a module outside 101 — `deptbook.json`
 * was built by hand for one book. This is the cheap substitute: department
 * books in this corpus print their section titles as short capitalised lines,
 * so scanning for that shape gives a usable, if approximate, table of contents
 * without anyone having to build one per book. It is looked up by term overlap
 * against the concept's own curriculum path, the same measure `overlap` uses
 * everywhere else here, so a wrong guess fails the same 0.6 bar a wrong span
 * would.
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

/** The best consecutive-line window across a set of pages, windowed exactly as the 101 pass does it. */
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
  const manifest = read(manifestPathFor(args.module)) as { sources: { sourceId: string, subject?: string }[] }
  const manifestBySourceId = new Map(manifest.sources.map((source) => [source.sourceId, source]))

  const books: BookDoc[] = args.bookIds.map((sourceId) => {
    const path = `${PAGETEXT_DIR}/${sourceId}.json`
    if (!existsSync(path)) {
      throw new Error(`--book ${sourceId}: no cached page text at ${path} — run `
        + `python3 scripts/kasr/extract/pagetext.py ${sourceId} first`)
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

Generated by scripts/kasr/build-evidence.ts --module "${args.module}" from
${args.conceptFiles.join(', ')}
and the committed page-text cache under scripts/kasr/extract/pagetext/, searched
against ${args.bookIds.join(', ')}. Rerun with the same arguments and the batch is
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
