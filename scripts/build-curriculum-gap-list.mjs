/**
 * TAX-GAP-001 — does the local curriculum teach anything the taxonomy lacks?
 *
 *   node --experimental-strip-types scripts/build-curriculum-gap-list.mjs
 *
 * The AMBOSS comparison found no gaps, but a US-oriented comparator cannot
 * reveal an Egyptian-curriculum gap. This asks the same question of the source
 * that actually is authoritative for local emphasis (LD-08): the university
 * corpus. Only files the corpus itself marks as processed are read, and every
 * candidate carries its source path, resource ID, page locator and the file's
 * own review state, so the evidence travels with the claim (LD-14).
 *
 * Extraction confidence is not medical verification. A label supported by one
 * unreviewed extraction is a candidate, never a finding.
 *
 * Writes docs/medical-library-program/evidence/curriculum-gap-list.{json,md}.
 * Read-only with respect to the taxonomy.
 */
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { norm, bestTokenMatch, canonicalByTitle, canonicalByStem, runtimeByTitle, stem, MEDICAL_TAXONOMY_SEED } from './lib/taxonomy-match.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const outDir = join(here, '..', 'docs', 'medical-library-program', 'evidence')
const CORPUS = process.env.CURRICULUM_CORPUS ?? '/Users/doitrous/Downloads/Resources Digestion Current aug 7'

/**
 * File states whose contents may be read as curriculum signal.
 *
 * Everything else — pending, blocked, retracted — is a coverage risk, not
 * evidence, and is counted rather than read.
 */
const USABLE_STATUS = new Set([
  'taxonomy_complete',
  'taxonomy_complete_review_required',
  'machine_complete_review_required',
  'taxonomy_complete_with_explicit_media_dependencies',
  'taxonomy_complete_with_explicit_page_blockers',
  'completed_with_explicit_blockers_review_required',
])

/**
 * A label that is a source heading rather than a curriculum topic.
 *
 * The extractor faithfully preserves headings like "2) Flexor digitorum brevis"
 * and "Assessed objectives". Those describe the document, not the curriculum,
 * and treating them as taxonomy candidates would bury the real signal.
 */
function isHeadingArtefact(label) {
  const value = (label ?? '').trim()
  if (!value) return true
  if (value.length > 70) return true
  if (/^[\d\W]/.test(value)) return true
  if (/^[IVXivx]{1,4}[.)]\s/.test(value)) return true
  if (/^(assessed objectives?|objectives?|introduction|contents?|references?|notes?|summary|revision|questions?|answers?|q\s*&\s*a|mcq|ilos?|case\s*\d)/i.test(value)) return true
  if (/^(page|chapter|lecture|part|section|table|figure|fig|sheet)\b/i.test(value)) return true
  if (/[.?!:;]$/.test(value)) return true
  if (value.split(/\s+/).length > 8) return true
  if (!/[a-z]/i.test(value)) return true
  // OCR run-ons: a long unbroken token, or words fused across a line break.
  if (/^\S{14,}$/.test(value) && !/\s/.test(value)) return true
  if (/[a-z][A-Z]{3,}|[A-Z]{4,}[a-z]/.test(value.replace(/\s+/g, ''))) return true
  // Chemical formulae and stray symbols the extractor kept as headings.
  if (/^[A-Za-z]{1,3}\d?[,+\-]?$/.test(value)) return true
  if (/\d/.test(value) && value.length <= 6) return true
  if (/^[A-Z]{2,5}$/.test(value)) return true
  return false
}

/**
 * Labels the ladder cannot match but a person can decide.
 *
 * Each is a course name or an abbreviation the corpus uses, not a subject the
 * taxonomy lacks. Written down rather than left as open candidates, so the next
 * session does not re-investigate the same five.
 */
const HAND_DECIDED = {
  neuroscience: ['SYS-NEU', 'The corpus\'s course name for the nervous system. Alias of SYS-NEU, with DIS-ANA and DIS-PHY as the discipline routes. Not a missing subject.'],
  'clinical medicine': ['DIS-MED', 'A course name covering internal medicine. Maps to DIS-MED.'],
  'medical education': [null, 'Curriculum administration — intended learning outcomes, timetables, assessment policy. Not medical subject matter, and deliberately outside the library.'],
  'hsv vzv': ['SYS-INF-T02', 'Two herpesviruses written as an abbreviation pair. Covered by SYS-INF-T02 Viral disease.'],
}

/* ---- read the corpus ---------------------------------------------------- */

const rootDir = join(CORPUS, '01-explicitly-taught')
const collections = await readdir(rootDir, { withFileTypes: true })

const labels = new Map()
const filesRead = []
const filesSkipped = { unreadable: 0, unusableStatus: {}, noTaxonomy: 0 }

const record = (level, value, context) => {
  const text = (value ?? '').trim()
  if (isHeadingArtefact(text)) return
  const key = `${level}:${norm(text)}`
  const entry = labels.get(key) ?? { level, label: text, occurrences: 0, sources: new Map() }
  entry.occurrences += 1
  if (!entry.sources.has(context.sourceId)) entry.sources.set(context.sourceId, context)
  labels.set(key, entry)
}

for (const collection of collections) {
  if (!collection.isDirectory()) continue
  let sources
  try { sources = await readdir(join(rootDir, collection.name), { withFileTypes: true }) } catch { continue }
  for (const source of sources) {
    if (!source.isDirectory()) continue
    const path = join(rootDir, collection.name, source.name, 'taxonomy.json')
    let doc
    try { doc = JSON.parse(await readFile(path, 'utf8')) } catch { filesSkipped.noTaxonomy += 1; continue }
    const status = doc.processing_status
    if (!USABLE_STATUS.has(status)) {
      filesSkipped.unusableStatus[status] = (filesSkipped.unusableStatus[status] ?? 0) + 1
      continue
    }
    filesRead.push({ sourceId: doc.source_id, path: doc.source_relative_path, status, concepts: (doc.concepts ?? []).length })
    for (const concept of doc.concepts ?? []) {
      const firstOccurrence = (concept.occurrences ?? [])[0] ?? {}
      const context = {
        sourceId: doc.source_id,
        sourceRelativePath: doc.source_relative_path,
        sha256: doc.current_file_sha256,
        processingStatus: status,
        reviewState: status.includes('review_required') ? 'review required' : 'processed',
        locator: firstOccurrence.page_number ? `page ${firstOccurrence.page_number}` : null,
        section: firstOccurrence.section_or_heading ?? null,
        confidence: concept.confidence ?? null,
      }
      const withSubject = { ...context, corpusSubject: (concept.subject ?? '').trim() || null }
      record('subject', concept.subject, withSubject)
      record('topic', concept.topic, withSubject)
      record('subtopic', concept.subtopic, withSubject)
      record('microtopic', concept.microtopic, withSubject)
    }
  }
}

/* ---- match against the canonical taxonomy ------------------------------- */

function match(label) {
  const key = norm(label)
  const exact = canonicalByTitle.get(key) ?? []
  if (exact.length) return { node: exact[0], how: 'exact title' }
  const stemmed = canonicalByStem.get(stem(label)) ?? []
  if (stemmed.length) return { node: stemmed[0], how: 'singular/plural or spelling variant' }
  const runtime = runtimeByTitle.get(key)
  if (runtime) return { node: { id: runtime.id, title: label, division: 'runtime', level: runtime.level }, how: 'runtime curriculum tree' }
  const token = bestTokenMatch(label, null, 3, undefined)
  if (token) return { node: token.node, how: `label overlap with “${token.node.title}”` }
  return null
}

const assessed = [...labels.values()].map((entry) => {
  const hand = HAND_DECIDED[norm(entry.label)]
  const found = hand ? (hand[0] ? { node: { id: hand[0], title: hand[0], division: 'hand', level: 'hand' }, how: `decided by hand — ${hand[1]}` } : null) : match(entry.label)
  const handExcluded = Boolean(hand) && !hand[0]
  const sources = [...entry.sources.values()]
  // Where the corpus itself says which subject taught this, resolve that to a
  // canonical root — so an unmatched label still shows where it would live.
  const corpusSubjects = [...new Set(sources.map((source) => source.corpusSubject).filter(Boolean))]
  const homeMatch = corpusSubjects.map((subject) => match(subject)).find(Boolean)
  return {
    level: entry.level,
    label: entry.label,
    occurrences: entry.occurrences,
    distinctSources: sources.length,
    reviewedSources: sources.filter((source) => source.reviewState === 'processed').length,
    matched: Boolean(found) || handExcluded,
    handDecision: hand ? hand[1] : null,
    synapseNodeId: found?.node.id ?? null,
    synapseTitle: found?.node.title ?? null,
    matchedHow: found?.how ?? null,
    corpusSubjects,
    nearestCanonicalRoot: homeMatch?.node.id ?? null,
    evidence: sources.slice(0, 5).map((source) => ({
      sourceId: source.sourceId,
      sourceRelativePath: source.sourceRelativePath,
      sha256: source.sha256,
      processingStatus: source.processingStatus,
      reviewState: source.reviewState,
      locator: source.locator,
      section: source.section,
      extractionConfidence: source.confidence,
    })),
  }
})

/**
 * A candidate must be taught in more than one source.
 *
 * One appearance is as likely to be an extraction artefact as a curriculum
 * topic, and this ledger is read later as settled. Single-source labels are
 * counted and reported, not promoted.
 */
const MIN_SOURCES = 2

const unmatched = assessed.filter((entry) => !entry.matched)
const handDecided = assessed.filter((entry) => entry.handDecision)
const candidates = unmatched
  .filter((entry) => entry.distinctSources >= MIN_SOURCES)
  .sort((a, b) => b.distinctSources - a.distinctSources || b.occurrences - a.occurrences)
  .map((entry) => ({
    ...entry,
    confidence: entry.reviewedSources >= 2 ? 'medium' : 'low',
    // A label whose corpus subject already resolves to a canonical root is not a
    // gap: the taxonomy has a home for it, finer than its floor. That is an
    // LD-04 article-catalogue decision, not a missing node.
    status: entry.nearestCanonicalRoot ? 'covered below the taxonomy floor' : 'candidate — needs a curriculum decision',
    note: entry.nearestCanonicalRoot
      ? `Taught under a subject that maps to ${entry.nearestCanonicalRoot}. Whether it earns its own article is an LD-04 call for that system's INVENTORY task.`
      : 'Extraction confidence is not medical verification. This label was taught in the named sources; whether it earns a taxonomy node is a TAX-PATCH-001 decision.',
  }))

const singleSource = unmatched.filter((entry) => entry.distinctSources < MIN_SOURCES)
const trueCandidates = candidates.filter((entry) => entry.status.startsWith('candidate'))
const belowFloor = candidates.filter((entry) => entry.status.startsWith('covered'))

const byLevel = {}
for (const entry of assessed) {
  byLevel[entry.level] ??= { labels: 0, matched: 0 }
  byLevel[entry.level].labels += 1
  if (entry.matched) byLevel[entry.level].matched += 1
}

const summary = {
  filesRead: filesRead.length,
  filesSkipped,
  conceptRecords: filesRead.reduce((sum, file) => sum + file.concepts, 0),
  distinctLabels: assessed.length,
  matched: assessed.filter((entry) => entry.matched).length,
  unmatched: unmatched.length,
  candidates: candidates.length,
  needingACurriculumDecision: trueCandidates.length,
  coveredBelowTheFloor: belowFloor.length,
  singleSourceUnmatched: singleSource.length,
  handDecided: handDecided.length,
  byLevel,
}

await mkdir(outDir, { recursive: true })
await writeFile(join(outDir, 'curriculum-gap-list.json'), `${JSON.stringify({
  task: 'TAX-GAP-001',
  source: 'University corpus, explicitly-taught view',
  rule: 'Only files the corpus marks as processed are read. Extraction confidence is not medical verification (LD-08).',
  minimumSourcesForCandidate: MIN_SOURCES,
  summary,
  candidates,
  // Every label taught in two or more processed sources, matched or not. This is
  // the local-emphasis signal each system's INVENTORY task reads: a node the
  // corpus actually teaches is a higher priority than one that only exists in
  // the blueprint.
  taught: assessed
    .filter((entry) => entry.distinctSources >= MIN_SOURCES)
    .map((entry) => ({
      label: entry.label,
      level: entry.level,
      distinctSources: entry.distinctSources,
      occurrences: entry.occurrences,
      synapseNodeId: entry.synapseNodeId,
    }))
    .sort((a, b) => b.distinctSources - a.distinctSources),
}, null, 1)}\n`)

const md = [
  '# Local curriculum gap list',
  '',
  '`TAX-GAP-001`. Regenerate with',
  '`node --experimental-strip-types scripts/build-curriculum-gap-list.mjs`.',
  '',
  'The AMBOSS comparison found no gaps, but a US-oriented comparator cannot reveal',
  'an Egyptian-curriculum gap. This asks the same question of the source that is',
  'authoritative for local emphasis (LD-08): what the university corpus actually',
  'teaches.',
  '',
  '## What was read',
  '',
  '| | |',
  '|---|---:|',
  `| Processed files read | ${summary.filesRead} |`,
  `| Concept records in them | ${summary.conceptRecords.toLocaleString('en-GB')} |`,
  `| Distinct curriculum labels after dropping source headings | ${summary.distinctLabels.toLocaleString('en-GB')} |`,
  `| Already covered by a canonical node | ${summary.matched.toLocaleString('en-GB')} |`,
  `| Not covered | ${summary.unmatched.toLocaleString('en-GB')} |`,
  `| — taught in ${MIN_SOURCES}+ sources | ${summary.candidates} |`,
  `| &nbsp;&nbsp;— of those, already inside a canonical root (granularity, not a gap) | ${summary.coveredBelowTheFloor} |`,
  `| &nbsp;&nbsp;— of those, needing a curriculum decision | ${summary.needingACurriculumDecision} |`,
  `| — taught in one source only (not promoted) | ${summary.singleSourceUnmatched.toLocaleString('en-GB')} |`,
  '',
  'Files the corpus does not mark as processed were counted, not read:',
  ...(Object.keys(filesSkipped.unusableStatus).length
    ? Object.entries(filesSkipped.unusableStatus).map(([status, count]) => `- \`${status}\` — ${count}`)
    : ['- none']),
  '',
  '## By label level',
  '',
  '| Level | Distinct labels | Covered |',
  '|---|---:|---:|',
  ...Object.entries(byLevel).map(([level, counts]) => `| ${level} | ${counts.labels} | ${counts.matched} (${Math.round((counts.matched / counts.labels) * 100)}%) |`),
  '',
  '## Candidates',
  '',
  `${summary.coveredBelowTheFloor} of the ${candidates.length} labels taught in ${MIN_SOURCES}+ sources already sit inside a`,
  'canonical root — the taxonomy has a home for them, finer than its floor. Whether',
  'each earns its own article is an `LD-04` decision for that system, not a',
  'taxonomy change.',
  '',
  trueCandidates.length
    ? `**${trueCandidates.length} labels have no canonical home at all.** Each is a candidate for \`TAX-PATCH-001\`, not a finding.`
    : '**No label taught in two or more processed sources is missing a canonical home.**',
  '',
  ...(trueCandidates.length
    ? ['| Label | Level | Sources | Occurrences | Confidence | First evidence |', '|---|---|---:|---:|---|---|',
       ...trueCandidates.slice(0, 80).map((entry) => `| ${entry.label} | ${entry.level} | ${entry.distinctSources} | ${entry.occurrences} | ${entry.confidence} | \`${entry.evidence[0]?.sourceRelativePath ?? '—'}\`${entry.evidence[0]?.locator ? `, ${entry.evidence[0].locator}` : ''} |`),
       ...(trueCandidates.length > 80 ? ['', `*Showing the first 80 of ${trueCandidates.length}. The rest are in the JSON.*`] : [])]
    : []),
  '',
  '## Decided by hand',
  '',
  'Four labels the ladder could not match are course names or abbreviations rather',
  'than missing subjects. They are written down so the next session does not',
  're-investigate them.',
  '',
  '| Label | Resolution |',
  '|---|---|',
  ...handDecided.map((entry) => `| ${entry.label} | ${entry.handDecision} |`),
  '',
  '## Reading this honestly',
  '',
  `- Only ${summary.filesRead} of the corpus's 3,238 files are processed. A subject absent here is **not**`,
  '  evidence it is absent from the curriculum (`LD-14`).',
  '- Every processed file is in a review-required or machine-complete state. None',
  '  has been medically verified.',
  '- Labels are taken as the extractor recorded them, including source headings the',
  '  filter could not catch. A candidate list is a starting point for a curriculum',
  '  decision, never a taxonomy change.',
  '',
].join('\n')

await writeFile(join(outDir, 'curriculum-gap-list.md'), `${md}\n`)
console.log(JSON.stringify(summary, null, 1))
