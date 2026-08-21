/**
 * A resource record for every source file this module cites.
 *
 *   node --experimental-strip-types scripts/kasr/build-resources.ts ["101 ISK"]
 *
 * A concept's `resourceIds` names the sources that support it, and the audit
 * requires it populated. It cannot be populated until the sources exist as
 * records rather than only as manifest rows — a manifest row says a file is on
 * someone's disk; a resource record says the library knows what it is.
 *
 * Two things this deliberately gets right, because both have already bitten
 * somebody in this programme:
 *
 * `id` and `source_relative_path` come from the manifest keyed by **source ID**,
 * not per row. IDs here are content-addressed, so the same bytes filed under two
 * names produce one ID and two rows; emitting per row gives `duplicate id within
 * the file` and picks one of the two paths at random.
 *
 * `is_assessment` is `yes` for every exam paper, and that is the whole point of
 * the column: **an exam paper is curriculum signal, not medical authority.** It
 * tells you what this faculty asks. It does not tell you what is true, and a
 * claim must never rest on one. The department book and the lecture notes are
 * the teaching sources; everything else here is evidence about the exam.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { batchFile } from './emit.ts'

interface Row {
  sourceId: string; sha256: string; fileName: string; corpusRelativePath: string | null
  moduleId: string; sourceCategory: string; fileType: string; pageCount: number | null
  textLayer: string | null; processingStatus: string | null; examSittingYear: number | null
  oldSystemExcluded?: boolean; exclusionReason?: string | null
}

const MODULE = process.argv[2] ?? '101 ISK'
const manifest = JSON.parse(readFileSync('docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json', 'utf8'))

/** One record per FILE. Two rows sharing an ID are one file saved twice. */
const byId = new Map<string, Row[]>()
for (const row of manifest.sources as Row[]) {
  if (row.moduleId !== MODULE) continue
  byId.set(row.sourceId, [...(byId.get(row.sourceId) ?? []), row])
}

/** Exam papers and question books are assessment; teaching material is not. */
const ASSESSMENT = new Set(['EOY', 'EOM', 'Baqoon', 'Written Questions', 'Instructor material'])

/** What the corpus did with the file, in the vocabulary the schema uses. */
const status = (row: Row) => {
  if (row.oldSystemExcluded) return 'excluded'
  if (row.fileType !== 'pdf') return 'not_extractable'
  return row.textLayer === 'none' ? 'ocr_required' : 'extracted'
}

const blocks = [...byId.entries()].map(([id, rows]) => {
  const row = rows[0]
  const alsoFiledAs = rows.slice(1).map((other) => other.fileName)
  const assessment = ASSESSMENT.has(row.sourceCategory)

  return `# Item
## id
${id}
## title
${row.fileName}
## institution
Kasr Alainy, Faculty of Medicine, Cairo University
## collection_id
kasr-y1
## source_relative_path
${row.corpusRelativePath ?? ''}
## media_type
${row.fileType === 'pdf' ? 'application/pdf' : row.fileType === 'png' ? 'image/png' : row.fileType === 'rtf' ? 'application/rtf' : ''}
## languages
${/[؀-ۿ]/.test(row.fileName) ? 'en | ar' : 'en'}
## page_count
${row.pageCount ?? ''}
## sha256
${row.sha256}
## processing_status
${status(row)}
## rights
Faculty teaching material collected by students. Held for curriculum analysis; not redistributed.
## qualification
${assessment
  ? `A ${row.sourceCategory} paper set by this faculty. It is evidence of what the department examines and of how it words a question. It is NOT evidence that any statement in it is medically true, and no claim may rest on it.`
  : 'Teaching material issued by the department. Usable as the faculty\'s own statement of what it teaches, which is what a student is examined against.'}${alsoFiledAs.length ? ` The same bytes are filed in the corpus a second time as ${alsoFiledAs.join(', ')}; one record, because the ID is the hash of the content.` : ''}
## confidence
${assessment ? 'curriculum_signal' : 'departmental_teaching'}
## is_assessment
${assessment ? 'yes' : 'no'}`
})

const assessmentCount = [...byId.values()].filter((rows) => ASSESSMENT.has(rows[0].sourceCategory)).length
const header = `Resource records for every source file in ${MODULE}.

${byId.size} records for ${[...byId.values()].reduce((n, rows) => n + rows.length, 0)} manifest rows — the
difference is one file saved twice under different names, which is one record
because the ID is the hash of its content.

${assessmentCount} are marked \`is_assessment: yes\`, and that column carries the weight here.
An exam paper is curriculum signal, not medical authority: it is evidence of
what this department examines and how it words a question, and it is not
evidence that anything in it is true. No claim may rest on one. The department
book and the lecture notes are the teaching sources.

Paths are the corpus-relative ones, never an absolute path from an authoring
machine, and every record carries the file's sha256 so a row can be resolved
back to bytes.

Generated by scripts/kasr/build-resources.ts.`

mkdirSync('docs/Kasr-Source-Imports/resource', { recursive: true })
const out = `docs/Kasr-Source-Imports/resource/${MODULE.replace(/\s+/g, '-')}-resources.md`
writeFileSync(out, batchFile(header, blocks))
console.log(`${byId.size} resource records (${assessmentCount} assessment) -> ${out}`)
