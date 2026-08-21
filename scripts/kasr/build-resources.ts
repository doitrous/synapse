/**
 * Turn the manifest into resource records.
 *
 * Every concept in this module carries `atomicClaimIds: [clear]` with a note
 * saying the evidence chain cannot be built because the Kasr sources are not in
 * the corpus source index. That was true and it was not a blocker — it was
 * simply work nobody had done. A claim cites a resource, a resource is a row
 * with an ID, a title, an institution and a processing status, and the manifest
 * already holds all four for all 76 sources.
 *
 * So the sources become resources here, generated rather than typed, and the
 * evidence pass has something to cite.
 *
 * The one judgement in this file is `is_assessment`, and it is the important
 * one. An exam paper is curriculum signal: it tells you what this faculty asks,
 * and it is authoritative about that. It is **not** medical authority — a
 * question can be wrong about anatomy and still be exactly what was asked, and
 * a claim about the human body must not rest on one. The department's own
 * textbook is the authority; the papers say what to read of it.
 *
 *   node --experimental-strip-types scripts/kasr/build-resources.ts
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { batchFile } from './emit.ts'

interface ManifestSource {
  sourceId: string
  sha256?: string
  fileName: string
  corpusRelativePath?: string
  sourceCategory: string
  fileType?: string
  pageCount?: number | null
  processingStatus?: string
  textLayer?: string
  examSittingYear?: number | null
  instructor?: string | null
  moduleId?: string
  oldSystemExcluded?: boolean
}

const MANIFEST = 'docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json'
const OUT = 'docs/Kasr-Source-Imports/resource/101-ISK-resources.md'

/** A sat paper is curriculum signal; everything else may carry medical weight. */
const ASSESSMENT = new Set(['EOY', 'EOM', 'Baqoon', 'Written Questions'])

/**
 * Why each kind of source is qualified to support a claim — or is not.
 *
 * Confidence is not a guess at how good a document is. It is how much weight a
 * claim may rest on it, and the ordering is the programme's own source
 * priority: the department's book outranks a departmental handout, which
 * outranks a student's typed notes, which outrank a question book whose answers
 * nobody has checked.
 */
const KIND: Record<string, { qualification: string, confidence: number }> = {
  'Department Book': {
    qualification: 'Written by the Histology and Anatomy Departments of the Faculty of Medicine, Cairo University, who both teach this module and set its papers. It is the authority for what this faculty holds to be true.',
    confidence: 0.95,
  },
  Orientation: {
    qualification: 'The faculty\'s own statement of how the module is examined. Authoritative about the assessment, and about nothing else.',
    confidence: 0.9,
  },
  'Instructor material': {
    qualification: 'Prepared by a named member of the teaching staff for this module. Qualified for what this faculty teaches; a question book\'s answer key is not independently verified and is weaker than the department book where the two disagree.',
    confidence: 0.7,
  },
  Notes: {
    qualification: 'Student-compiled notes on this module, unreviewed by the department. Useful as a record of what was taught and how it was phrased; not a source a claim should rest on alone.',
    confidence: 0.45,
  },
  'Important & Summaries': {
    qualification: 'A student compilation of what has come up in past sittings. Curriculum signal rather than medical authority.',
    confidence: 0.4,
  },
  EOY: {
    qualification: 'A paper this faculty actually set. Authoritative for what is examined and how it is worded; carries no weight as a source for a medical claim.',
    confidence: 0.9,
  },
}
KIND.EOM = KIND.EOY
KIND.Baqoon = KIND.EOY
KIND['Written Questions'] = KIND.EOY

const MEDIA: Record<string, string> = {
  pdf: 'application/pdf', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
  rtf: 'application/rtf', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8')) as { sources: ManifestSource[] }
// This module only. The manifest indexes the whole of year one — 102 INT, 104
// CPS and the rest — and a 101 ISK batch that quietly carried four hundred
// resources for other modules would be claiming to have read them.
const rows = manifest.sources.filter((source) =>
  source.moduleId === '101 ISK' && !source.oldSystemExcluded)

/**
 * One resource per file, not per manifest row.
 *
 * A resource is identified by the content hash of the file, so a file the
 * corpus holds under two names is one resource with one ID — and the manifest
 * does hold one that way, `EOY Anatomy cases 1st year 2025-1` also filed as
 * `101 ANATOMY ASSESSMENT cases 1st year 2025-1`. Emitting a row per manifest
 * row gave three errors: a duplicate ID twice over, and a path check that
 * failed because the second row's path is not the one the corpus indexes.
 *
 * The first row wins and the other names are kept on `alsoFiledAs`, because
 * "this file is filed twice" is a fact about the corpus worth carrying rather
 * than a duplicate to drop quietly.
 */
const byId = new Map<string, ManifestSource & { alsoFiledAs: string[] }>()
for (const row of rows) {
  const found = byId.get(row.sourceId)
  if (found) { if (!found.alsoFiledAs.includes(row.fileName)) found.alsoFiledAs.push(row.fileName); continue }
  byId.set(row.sourceId, { ...row, alsoFiledAs: [] })
}
const sources = [...byId.values()]

const blocks = sources.map((source) => {
  const kind = KIND[source.sourceCategory] ?? KIND.Notes
  const assessment = ASSESSMENT.has(source.sourceCategory)
  // A file with no text layer had to be read by OCR, and an OCR reading is a
  // weaker warrant than a clean one. Recorded on the resource so a claim citing
  // it inherits the doubt rather than hiding it.
  const ocr = source.textLayer === 'none'

  return `# Item
## id
${source.sourceId}
## title
${source.fileName.replace(/\.[a-z0-9]+$/i, '')}
## institution
Kasr Alainy — Faculty of Medicine, Cairo University
## collection_id
kasr-y1-101-isk
## source_relative_path
${source.corpusRelativePath ?? ''}
## media_type
${MEDIA[(source.fileType ?? '').toLowerCase()] ?? 'application/octet-stream'}
## languages
${/[؀-ۿ]/.test(source.fileName) ? 'en | ar' : 'en'}
## page_count
${source.pageCount ?? ''}
## sha256
${source.sha256 ?? ''}
## processing_status
${source.processingStatus ?? 'ocr_required'}
## rights
Faculty teaching material held by the student who supplied the corpus. Not redistributable; used here to derive what is taught and examined, never reproduced to a student.
## qualification
${kind.qualification}${ocr ? ' This copy has no text layer and was read by OCR, so any wording quoted from it is a transcription rather than the page.' : ''}${source.alsoFiledAs.length ? ` The corpus files this same file a second time as "${source.alsoFiledAs.join('", "')}".` : ''}
## confidence
${assessment ? kind.confidence : Math.min(kind.confidence, ocr ? 0.6 : kind.confidence)}
## is_assessment
${assessment ? 'yes' : 'no'}`
})

const counts = sources.reduce<Record<string, number>>((tally, source) => {
  tally[source.sourceCategory] = (tally[source.sourceCategory] ?? 0) + 1
  return tally
}, {})

const header = `Every 101 ISK source as a resource record.

${sources.length} sources, generated from ../manifest/kasr-y1-sources.json by
scripts/kasr/build-resources.ts. Nothing here is typed; rerun it and the batch
is today's manifest.

These exist so the evidence pass has something to cite. Every concept in this
module carries \`atomicClaimIds: [clear]\` with a note saying the chain cannot be
built because the Kasr sources are not in the corpus source index — true, and
not a blocker: a claim cites a resource, a resource is a row, and the manifest
already held every field one needs.

\`is_assessment\` is the judgement that matters. A sat paper is curriculum
signal — authoritative for what this faculty asks and how it words it, and no
authority at all on the human body. A question can be wrong about the anatomy
and still be exactly what was set. The department's own book is the authority a
medical claim rests on; the papers say which parts of it to read.

\`confidence\` follows the programme's source priority rather than an opinion of
each document: department book, then the faculty's orientation, then instructor
material, then student notes. A file with no text layer is capped lower again,
because everything quoted from it is an OCR transcription rather than the page.

By category: ${Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([category, n]) => `${n} ${category}`).join(', ')}.`

mkdirSync('docs/Kasr-Source-Imports/resource', { recursive: true })
writeFileSync(OUT, batchFile(header, blocks))
console.log(`${blocks.length} resources -> ${OUT}`)
