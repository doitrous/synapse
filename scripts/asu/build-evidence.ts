/**
 * Copied from `scripts/kasr/build-evidence.ts`, retrofitted for `--module`:
 * that file hardcodes 101's three concept-batch filenames and its one
 * department book's extract files. This version scans the concept directory
 * for every file starting with the module's slug and reads
 * `extract/<slug>/deptbook-spans.json` / `deptbook.json`.
 *
 * Claims for every concept in one module, and citations for the ones the book supports.
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
 *   node --experimental-strip-types scripts/asu/build-evidence.ts
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { batchFile } from './emit.ts'
import { MODULES } from './seeds/types.ts'

const module = process.argv[2]
if (!module || !MODULES[module]) {
  throw new Error(`name the module: --module reads as a positional arg here, e.g. `
    + `\`build-evidence.ts "ASU-CVS"\` — one of ${Object.keys(MODULES).join(', ')}`)
}
const slug = module.replace(/\s+/g, '-')
const EXTRACT = process.env.ASU_TOOLCHAIN_EXTRACT_DIR ?? 'scripts/asu/extract'
const CONCEPTS = process.env.ASU_TOOLCHAIN_OUT ? `${process.env.ASU_TOOLCHAIN_OUT}/concept` : 'docs/Ain-Shams-Source-Imports/concept'
const SPANS = `${EXTRACT}/${slug}/deptbook-spans.json`
const CHAPTERS = `${EXTRACT}/${slug}/deptbook.json`
const OUT = process.env.ASU_TOOLCHAIN_OUT ? `${process.env.ASU_TOOLCHAIN_OUT}/evidence` : 'docs/Ain-Shams-Source-Imports/evidence'

interface Span { text: string, kind: string }
interface PageSpans { page: number, printedPage: number | null, spans: Span[] }

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'))
const spanDoc = read(SPANS) as { sourceId: string, pageSpans: PageSpans[] }
const chapters = read(CHAPTERS) as {
  chapters: { subjectPath: string, startPage?: number, endPage?: number, found?: boolean }[]
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
  try { return (read('scripts/asu/extract/practical.json').slides ?? []) as Slide[] }
  catch { return [] }
})()

/** The plates filed under a curriculum path. */
const slidesFor = (modulePath: string) =>
  slides.filter((slide) => slide.subjectPath === modulePath)

/** `## label` out of a block. `[ \t]*` so a blank value does not eat the next heading. */
const field = (block: string, label: string) =>
  block.match(new RegExp(`^## ${label}[ \\t]*\\n([\\s\\S]*?)(?=\\n## |$)`, 'm'))?.[1].trim() ?? ''

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

// `readdirSync` rather than a hardcoded three-file list — this module may have
// any number of concept batches, and a hardcoded list silently drops a fourth.
const files = (() => {
  try { return readdirSync(CONCEPTS).filter((name) => name.startsWith(`${slug}-`) && name.endsWith('-concepts.md')) }
  catch { return [] }
})()
for (const file of files) {
  let text: string
  try { text = readFileSync(`${CONCEPTS}/${file}`, 'utf8') } catch { continue }

  for (const block of text.split(/^\s*---\s*$/m)) {
    const id = field(block, 'id')
    const definition = field(block, 'definition')
    if (!id || !definition) continue

    const modulePath = field(block, 'module_subject').split('\n')[0].trim()
    const pages = pagesFor(modulePath)
    const subjectLabel = field(block, 'label')

    const sentences = definition.split(/(?<=[.])\s+(?=[A-Z])/)
      .map((one) => one.trim()).filter((one) => one.length > 25)

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

Generated by scripts/asu/build-evidence.ts from the concept batches and
../../../scripts/asu/extract/deptbook-spans.json, which holds the department
book's own lines page by page. Rerun it and the batch is today's concepts.`

mkdirSync(OUT, { recursive: true })
writeFileSync(`${OUT}/${slug}-claims.md`, batchFile(header(
  `Every assertion the ${module} concepts make, as claims.`,
  `${claims.size} claims from ${byConcept.size} concepts.

A concept asserts something and its \`definition\` is that assertion written
out, so the claims are its sentences rather than a second set of facts written
alongside — two records of one thing can disagree, and then nobody knows which
the module teaches.

${evidenced} carry a citation to the department book and stand at \`verified\`.
${unevidenced} do not, and stand at \`needs_evidence\`. That split is the point of
the file: a claim is only as good as the span under it, and the ones without a
span are the work list for the pass that finds them.`), [...claims.values()]))

writeFileSync(`${OUT}/${slug}-citations.md`, batchFile(header(
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

console.log(`${claims.size} claims (${evidenced} evidenced, ${unevidenced} not) -> ${OUT}/${slug}-claims.md`)
console.log(`${citations.size} citations -> ${OUT}/${slug}-citations.md`)

// The `atomic_claim_ids` each concept should carry, for the emitter.
const claimLinksPath = process.env.ASU_TOOLCHAIN_OUT ? `${process.env.ASU_TOOLCHAIN_OUT}/claim-links.json` : 'scripts/asu/seeds/claim-links.json'
writeFileSync(claimLinksPath,
  `${JSON.stringify(Object.fromEntries([...byConcept].sort()), null, 1)}\n`)
console.log(`claim ids for ${byConcept.size} concepts -> ${claimLinksPath}`)
