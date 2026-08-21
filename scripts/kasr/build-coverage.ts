/**
 * What became of every source file in module 101 ISK.
 *
 *   node --experimental-strip-types scripts/kasr/build-coverage.ts
 *
 * A content programme's real failure mode is not a bad item; it is a file
 * nobody opened and nobody noticed nobody opened. Seventy-six files went into
 * this module and the only honest way to say it is finished is to say what
 * happened to each one — including the ones that yielded nothing, and why.
 *
 * Generated rather than written, so it cannot quietly go stale: rerun it and
 * the numbers are today's.
 */
import { existsSync, readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs'
import { seededBySource } from './seeds/registry.ts'
import { join } from 'node:path'

const REPO = process.cwd()
const read = (path: string) => JSON.parse(readFileSync(join(REPO, path), 'utf8'))
const maybe = (path: string) => existsSync(join(REPO, path)) ? read(path) : null

interface ManifestSource {
  sourceId: string; fileName: string; moduleId: string; sourceCategory: string
  fileType: string; pageCount: number | null; examSittingYear: number | null
  sourceTier: number; absolutePath: string
}

const manifest = read('docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json')
const rows_: ManifestSource[] = manifest.sources.filter((s: ManifestSource) => s.moduleId === '101 ISK')

/**
 * One row per FILE, not per manifest row.
 *
 * Source IDs are content-addressed, so the same bytes filed under two names get
 * one ID and two rows. 101 has one such pair — the 2025 anatomy case paper,
 * saved once as `EOY Anatomy cases…` and once as `101 ANATOMY ASSESSMENT
 * cases…` — and counting rows made this ledger claim 76 files when there are
 * 75, listing the same 44 questions twice.
 *
 * The yields were never wrong: the tally is keyed by source ID, so nothing was
 * ever double-counted. It was the file count and the duplicated table row. But
 * this document exists to be auditable, and a count that is off by one in the
 * artefact whose whole job is counting is worth more than a rounding error.
 *
 * The duplication is reported rather than hidden — a file indexed twice is a
 * fact about the corpus, and quietly collapsing it would lose it.
 */
const seen = new Set<string>()
const sources: ManifestSource[] = rows_.filter((source) => {
  if (seen.has(source.sourceId)) return false
  seen.add(source.sourceId)
  return true
})
const duplicatedRows = rows_.length - sources.length
const alsoFiledAs = new Map<string, string[]>()
for (const source of rows_) {
  const names = alsoFiledAs.get(source.sourceId) ?? []
  if (!names.includes(source.fileName)) names.push(source.fileName)
  alsoFiledAs.set(source.sourceId, names)
}

/** What each extractor found, indexed by the manifest ID it recorded. */
type Yield = 'written' | 'mcq' | 'slides' | 'radiology' | 'chapters' | 'topics' | 'answers' | 'sittings' | 'seeded'
const tally = new Map<string, Record<Yield, number> & { capped?: string }>()
const bump = (id: string, field: Yield, by = 1) => {
  const row = tally.get(id) ?? {
    written: 0, mcq: 0, slides: 0, radiology: 0, chapters: 0, topics: 0, answers: 0, sittings: 0, seeded: 0 }
  row[field] += by
  tally.set(id, row)
}

for (const q of read('scripts/kasr/questions.json').questions) bump(q.sourceId, 'written')

const mcq = maybe('scripts/kasr/extract/mcq.json')
for (const q of mcq?.questions ?? []) if (q.questionType !== 'no-options') bump(q.sourceId, 'mcq')

// An answer key is read even though it yields no questions. Four of them were
// joined onto their question books by question number, and counting only
// questions listed all four as "not yet read" — which is exactly the claim this
// ledger exists to be able to make truthfully.
const byFileName = new Map<string, string>(
  sources.map((source) => [source.fileName, source.sourceId]))
for (const q of mcq?.questions ?? []) {
  // The key names its file, not its manifest ID, so it is resolved by name.
  const keyId = q.answerKeyFile ? byFileName.get(q.answerKeyFile) : undefined
  if (keyId) bump(keyId, 'answers')
}

const practical = maybe('scripts/kasr/extract/practical.json')
for (const slide of practical?.slides ?? []) bump(slide.sourceId, 'slides')
for (const item of practical?.writtenItems ?? []) bump(item.sourceId, 'written')
for (const view of practical?.radiology ?? []) bump(view.sourceId ?? '', 'radiology')

const deptbook = maybe('scripts/kasr/extract/deptbook.json')
for (const chapter of deptbook?.chapters ?? []) if (chapter.found) bump(deptbook.sourceId, 'chapters')

// The one-page orientation sheet is the module's authoritative statement of how
// it is examined, and it yields no questions at all. Counting only questions
// called the most important document in the corpus unread.
const notes = maybe('scripts/kasr/extract/notes.json')
if (notes?.orientation?.verbatim) {
  const sheet = (notes.files ?? []).find((file: { file: string }) => /Orientation/i.test(file.file))
  if (sheet?.sourceId) bump(sheet.sourceId, 'topics')
}

// Three sources are indices OF papers rather than papers: they name what was
// asked in which sitting, without wording or marks.
const sittings = maybe('scripts/kasr/extract/sittings.json')
for (const sitting of sittings?.sittings ?? []) bump(sitting.sourceId, 'sittings', sitting.topics.length)
for (const model of sittings?.modelAnswers ?? []) bump(model.sourceId, 'answers', model.questions.length)
// A paper transcribed straight into a seed file, question by question with a
// mark scheme against each, is the most thoroughly read thing in this corpus —
// and it left no extractor JSON behind, so a tally built from those alone
// reported it as never opened. The 2023 Baqoon resit was exactly that: thirteen
// questions seeded off a clean text layer, listed here as "not yet read".
for (const [id, count] of seededBySource()) bump(id, 'seeded', count)

for (const topic of notes?.topics ?? []) bump(topic.sourceId, 'topics')
for (const past of notes?.pastQuestions ?? []) bump(past.sourceId, 'written')

/** Files an extractor stopped short on, and by how much. */
for (const file of [...(mcq?.files ?? []), ...(practical?.files ?? []), ...(notes?.files ?? [])]) {
  if (!file.capped) continue
  const row = tally.get(file.sourceId)
  if (row) row.capped = `${file.pagesRead ?? '?'}/${file.pages ?? '?'} pages`
}

/** Items authored into batches, counted from the batch files themselves. */
function authored() {
  const counts = new Map<string, number>()
  const root = 'docs/Kasr-Source-Imports'
  for (const kind of ['concept', 'question', 'article', 'practical', 'written']) {
    const dir = join(REPO, root, kind)
    if (!existsSync(dir)) continue
    for (const name of readdirSync(dir)) {
      if (!name.endsWith('.md')) continue
      const text = readFileSync(join(dir, name), 'utf8')
      const items = text.split(/^\s*---\s*$/m).filter((part) => part.includes('# Item')).length
      counts.set(`${kind}/${name}`, items)
    }
  }
  return counts
}

const CATEGORY_ORDER = ['Orientation', 'EOY', 'EOM', 'Baqoon', 'Written Questions',
  'Department Book', 'Important & Summaries', 'Notes', 'Instructor material']

const rows = [...sources].sort((a, b) => {
  const byCategory = CATEGORY_ORDER.indexOf(a.sourceCategory) - CATEGORY_ORDER.indexOf(b.sourceCategory)
  return byCategory || a.fileName.localeCompare(b.fileName)
})

const line = (source: ManifestSource) => {
  const t = tally.get(source.sourceId)
  const yields = [
    t?.written && `${t.written} written`,
    t?.mcq && `${t.mcq} MCQ`,
    t?.slides && `${t.slides} slides`,
    t?.radiology && `${t.radiology} radiology`,
    t?.chapters && `${t.chapters} chapters`,
    t?.topics && `${t.topics} topics`,
    t?.answers && `${t.answers} model answers`,
    t?.sittings && `${t.sittings} sitting topics`,
    t?.seeded && `${t.seeded} seeded`,
  ].filter(Boolean).join(', ')
  const state = yields ? (t?.capped ? `read ${t.capped}` : 'read in full') : 'not yet read'
  const names = alsoFiledAs.get(source.sourceId) ?? [source.fileName]
  const label = names.length > 1
    ? `${names[0]} <br>*also filed as ${names.slice(1).join(', ')}*`
    : source.fileName
  return `| ${label.replace(/\|/g, '\\|')} | ${source.sourceCategory} | ${source.pageCount ?? '—'} | ${yields || '—'} | ${state} |`
}

const untouched = rows.filter((source) => !tally.get(source.sourceId))
const readCount = rows.length - untouched.length
const totals = [...tally.values()].reduce((sum, t) => ({
  written: sum.written + t.written, mcq: sum.mcq + t.mcq, slides: sum.slides + t.slides,
  radiology: sum.radiology + t.radiology, topics: sum.topics + t.topics,
  sittings: sum.sittings + t.sittings,
}), { written: 0, mcq: 0, slides: 0, radiology: 0, topics: 0, sittings: 0 })

const batches = authored()
const capped = rows.filter((source) => tally.get(source.sourceId)?.capped)

const report = `# 101 ISK — source coverage

Generated by \`scripts/kasr/build-coverage.ts\`. Rerun it and the numbers are today's.

${readCount} of ${rows.length} source files have been read${duplicatedRows
  ? ` (${rows_.length} manifest rows: ${duplicatedRows} file${duplicatedRows === 1 ? ' is' : 's are'} indexed twice under different names)`
  : ''}. They yielded
**${totals.written} written questions**, **${totals.mcq} multiple-choice questions**,
**${totals.slides} practical slides**, **${totals.radiology} radiology views**,
${totals.topics} note topics and ${totals.sittings} sitting topics.

A file yields more than questions. An answer key, a one-page orientation sheet
and a student's index of what came up in which sitting all yield something, and
counting only questions listed every one of them as unread — including the
orientation, which is the module's own statement of how it is examined and the
most load-bearing document in the corpus.

A file that yielded nothing is listed as such rather than omitted. A programme
that reports only what it found cannot be audited, because a file nobody opened
looks exactly like a file with nothing in it.

## Authored so far

| Batch | Items |
| --- | --- |
${[...batches].map(([name, count]) => `| \`${name}\` | ${count} |`).join('\n') || '| — | — |'}

## Read short

${capped.length
  ? `${capped.length} file${capped.length === 1 ? '' : 's'} stopped short of the end. Each is named with how far it got, so the remainder is scheduled work rather than a silent gap.\n\n${capped.map((source) => `- **${source.fileName}** — ${tally.get(source.sourceId)!.capped}`).join('\n')}`
  : 'Nothing was capped: every file that was opened was read to the end.'}

## Not yet read

${untouched.length
  ? `${untouched.length} file${untouched.length === 1 ? '' : 's'}.\n\n${untouched.map((source) => `- **${source.fileName}** (${source.sourceCategory}, ${source.pageCount ?? '?'} pages)`).join('\n')}`
  : 'None. Every source file in the module has been read.'}

## Every source

| File | Category | Pages | Yielded | State |
| --- | --- | --- | --- | --- |
${rows.map(line).join('\n')}
`

mkdirSync(join(REPO, 'docs/Kasr-Source-Imports/coverage'), { recursive: true })
const out = 'docs/Kasr-Source-Imports/coverage/101-ISK-coverage.md'
writeFileSync(join(REPO, out), report)
console.log(`${readCount}/${rows.length} sources read, ${untouched.length} outstanding, ${capped.length} capped -> ${out}`)
