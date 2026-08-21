/**
 * What became of every source file in one module.
 *
 *   node --experimental-strip-types scripts/kasr/build-coverage.ts
 *   node --experimental-strip-types scripts/kasr/build-coverage.ts --module "103 BMS"
 *
 * A content programme's real failure mode is not a bad item; it is a file
 * nobody opened and nobody noticed nobody opened. The only honest way to say a
 * module is finished is to say what happened to each of its files — including
 * the ones that yielded nothing, and why.
 *
 * Generated rather than written, so it cannot quietly go stale: rerun it and
 * the numbers are today's.
 *
 * `--module` defaults to `101 ISK`, so the command that worked before this
 * argument existed still produces exactly what it did. Six module lanes share
 * this checkout; results are read from `extract/<module-slug>/` and fall back
 * to the unprefixed paths, which are 101's until that lane moves them.
 */
import { existsSync, readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const REPO = process.cwd()
const read = (path: string) => JSON.parse(readFileSync(join(REPO, path), 'utf8'))
const maybe = (path: string) => existsSync(join(REPO, path)) ? read(path) : null

interface ManifestSource {
  sourceId: string; fileName: string; moduleId: string; sourceCategory: string
  fileType: string; pageCount: number | null; examSittingYear: number | null
  sourceTier: number; absolutePath: string; secondaryModule: string | null
}

const args = process.argv.slice(2)
const MODULE = args.includes('--module') ? args[args.indexOf('--module') + 1] : '101 ISK'
/** `103 BMS` -> `103-BMS`: a path segment and a filename stem, from the exact catalogue ID. */
const SLUG = MODULE.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
/**
 * The command that regenerates this exact file — which for the default module
 * is the bare command, because that is what actually reproduces it. 101's
 * ledger is committed, so an argument it never needed must not appear in it.
 */
const COMMAND = 'scripts/kasr/build-coverage.ts'
  + (MODULE === '101 ISK' ? '' : ` --module "${MODULE}"`)

/**
 * Where this module's extractor results live.
 *
 * `extract/<slug>/mcq.json` first; the bare `extract/mcq.json` second, because
 * that is where 101's results still sit. Reading the bare path for a module
 * that has its own directory would silently attribute 101's 3,464 MCQs to
 * somebody else's module, so the fallback is only ever a fallback.
 */
const scoped = (name: string) => {
  const own = `scripts/kasr/extract/${SLUG}/${name}`
  if (existsSync(join(REPO, own))) return own
  // The bare paths are 101's results, from before any of this was namespaced.
  // Falling back to them for another module would read one module's extraction
  // as another's, so only the module that owns them may.
  return MODULE === '101 ISK' ? `scripts/kasr/extract/${name}` : own
}

const manifest = read('docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json')
const sources: ManifestSource[] = manifest.sources.filter(
  (s: ManifestSource) => s.moduleId === MODULE || s.secondaryModule === MODULE)

/**
 * What each extractor found, indexed by the manifest ID it recorded.
 *
 * A result file may hold rows for sources outside this module — the shared
 * question dump does, and so does anything a lane ran before namespacing. A row
 * whose source is not this module's is dropped rather than counted, because the
 * headline totals are read as this module's yield and once said they are very
 * hard to unsay.
 */
const mine = new Set(sources.map((s) => s.sourceId))
const tally = new Map<string, { written: number; mcq: number; slides: number; radiology: number; chapters: number; topics: number; capped?: string }>()
const bump = (id: string, field: 'written' | 'mcq' | 'slides' | 'radiology' | 'chapters' | 'topics', by = 1) => {
  if (!mine.has(id)) return
  const row = tally.get(id) ?? { written: 0, mcq: 0, slides: 0, radiology: 0, chapters: 0, topics: 0 }
  row[field] += by
  tally.set(id, row)
}

const questions = maybe(scoped('questions.json')) ?? maybe('scripts/kasr/questions.json')
for (const q of questions?.questions ?? []) bump(q.sourceId, 'written')

const mcq = maybe(scoped('mcq.json'))
for (const q of mcq?.questions ?? []) if (q.questionType !== 'no-options') bump(q.sourceId, 'mcq')

const practical = maybe(scoped('practical.json'))
for (const slide of practical?.slides ?? []) bump(slide.sourceId, 'slides')
for (const item of practical?.writtenItems ?? []) bump(item.sourceId, 'written')
for (const view of practical?.radiology ?? []) bump(view.sourceId ?? '', 'radiology')

const deptbook = maybe(scoped('deptbook.json'))
for (const chapter of deptbook?.chapters ?? []) if (chapter.found) bump(deptbook.sourceId, 'chapters')

const notes = maybe(scoped('notes.json'))
for (const topic of notes?.topics ?? []) bump(topic.sourceId, 'topics')
for (const past of notes?.pastQuestions ?? []) bump(past.sourceId, 'written')

/** Files an extractor stopped short on, and by how much. */
for (const file of [...(mcq?.files ?? []), ...(practical?.files ?? []), ...(notes?.files ?? [])]) {
  if (!file.capped) continue
  const row = tally.get(file.sourceId)
  if (row) row.capped = `${file.pagesRead ?? '?'}/${file.pages ?? '?'} pages`
}

/**
 * Which sources have had their text pulled, and what came back.
 *
 * Extracting a file's text is not the same as reading it, and the difference
 * is the one this report exists to make visible. A source can be fully
 * extracted and still have yielded nothing, because nobody has authored from
 * it yet — that is scheduled work. A source that extracted to *nothing* is a
 * different problem: an OCR pass that returned blank pages is a file still
 * waiting to be read by eye, and it must not sit in the same bucket as a file
 * nobody has opened.
 *
 * The cache is gitignored, so a clean checkout reports no extraction rather
 * than pretending to some.
 */
function extracted() {
  const rows = new Map<string, { pages: number; empty: number; mode: string }>()
  const dir = join(REPO, 'scripts/kasr/extract/pagetext')
  if (!existsSync(dir)) return rows
  for (const name of readdirSync(dir)) {
    if (!name.endsWith('.json')) continue
    const doc = read(`scripts/kasr/extract/pagetext/${name}`)
    // One cache, every module. Another lane's extraction is not this module's.
    if (!mine.has(doc.sourceId)) continue
    rows.set(doc.sourceId, {
      pages: doc.pages.length,
      empty: (doc.emptyPages ?? []).length,
      mode: doc.mode,
    })
  }
  return rows
}
const text = extracted()

/** Items authored into batches, counted from the batch files themselves. */
function authored() {
  const counts = new Map<string, number>()
  const root = 'docs/Kasr-Source-Imports'
  for (const kind of ['concept', 'question', 'article', 'practical', 'written', 'evidence', 'resource']) {
    const dir = join(REPO, root, kind)
    if (!existsSync(dir)) continue
    for (const name of readdirSync(dir)) {
      if (!name.endsWith('.md')) continue
      // A folder holds every module's batches. Counting them all would credit
      // this module with another module's work.
      if (!name.startsWith(SLUG)) continue
      const text = readFileSync(join(dir, name), 'utf8')
      const items = text.split(/^\s*---\s*$/m).filter((part) => part.includes('# Item')).length
      counts.set(`${kind}/${name}`, items)
    }
  }
  return counts
}

/**
 * Priority order for the per-source table: the strongest scope signal first.
 *
 * The manifest uses fifteen categories and this list once held nine. The six it
 * omitted did not error — `indexOf` returned `-1`, which sorts them *ahead of*
 * `Orientation`, so a module's practical papers silently outranked its own
 * orientation. Unknown categories now sort last and are named in the report,
 * because a category nobody has ranked is a decision nobody has made, and it
 * should look like one.
 */
const CATEGORY_ORDER = ['Orientation', 'EOY', 'EOM', 'Baqoon', 'Exams', 'Questions',
  'Written Questions', 'Department Book', 'Book', 'Department Questions', 'Practical',
  'Important & Summaries', 'Notes', 'Instructor material', 'Administrative (student marks)']

const rank = (category: string) => {
  const at = CATEGORY_ORDER.indexOf(category)
  return at === -1 ? CATEGORY_ORDER.length : at
}
const unranked = [...new Set(sources.map((s) => s.sourceCategory))]
  .filter((category) => !CATEGORY_ORDER.includes(category)).sort()

const rows = [...sources].sort((a, b) =>
  rank(a.sourceCategory) - rank(b.sourceCategory) || a.fileName.localeCompare(b.fileName))

const line = (source: ManifestSource) => {
  const t = tally.get(source.sourceId)
  const yields = [
    t?.written && `${t.written} written`,
    t?.mcq && `${t.mcq} MCQ`,
    t?.slides && `${t.slides} slides`,
    t?.radiology && `${t.radiology} radiology`,
    t?.chapters && `${t.chapters} chapters`,
    t?.topics && `${t.topics} topics`,
  ].filter(Boolean).join(', ')
  const state = yields ? (t?.capped ? `read ${t.capped}` : 'read in full') : 'not yet read'
  const x = text.get(source.sourceId)
  const extractedAs = x
    ? (x.empty === 0 ? x.mode : `${x.mode}, ${x.empty}/${x.pages} blank`)
    : '—'
  // The column is omitted entirely where nothing has been extracted, rather
  // than printed as a row of dashes: a module with no extraction has nothing
  // to say here, and saying it in a column is not the same as saying nothing.
  const textCell = text.size ? ` ${extractedAs} |` : ''
  return `| ${source.fileName.replace(/\|/g, '\\|')} | ${source.sourceCategory} | ${source.pageCount ?? '—'} |${textCell} ${yields || '—'} | ${state} |`
}

const untouched = rows.filter((source) => !tally.get(source.sourceId))
const readCount = rows.length - untouched.length
const totals = [...tally.values()].reduce((sum, t) => ({
  written: sum.written + t.written, mcq: sum.mcq + t.mcq, slides: sum.slides + t.slides,
  radiology: sum.radiology + t.radiology, topics: sum.topics + t.topics,
}), { written: 0, mcq: 0, slides: 0, radiology: 0, topics: 0 })

const batches = authored()
const capped = rows.filter((source) => tally.get(source.sourceId)?.capped)

const report = `# ${MODULE} — source coverage

Generated by \`${COMMAND}\`. Rerun it and the numbers are today's.

${readCount} of ${rows.length} source files have been read. They yielded
**${totals.written} written questions**, **${totals.mcq} multiple-choice questions**,
**${totals.slides} practical slides**, **${totals.radiology} radiology views**, and
${totals.topics} note topics.

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

${text.size ? `## Text extracted

${(() => {
      const mine = rows.filter((source) => text.has(source.sourceId))
      const pages = mine.reduce((sum, s) => sum + text.get(s.sourceId)!.pages, 0)
      const blank = mine.reduce((sum, s) => sum + text.get(s.sourceId)!.empty, 0)
      const ocr = mine.filter((s) => text.get(s.sourceId)!.mode === 'ocr')
      const silent = mine.filter((s) => {
        const x = text.get(s.sourceId)!
        return x.empty === x.pages && x.pages > 0
      })
      return `Text has been pulled from ${mine.length} of ${rows.length} sources — ${pages} pages, `
        + `${ocr.length} of them by OCR because the file carries no text layer. `
        + `${blank} page${blank === 1 ? '' : 's'} came back empty.\n\n`
        + `Having text is not the same as having read it: a source below can be fully `
        + `extracted and still yield nothing, because authoring from it is scheduled `
        + `rather than done.\n`
        + (silent.length
          ? `\n${silent.length} source${silent.length === 1 ? '' : 's'} extracted to **nothing at all** — `
            + `every page blank. These need a human eye or a better OCR pass; they are not empty files.\n\n`
            + silent.map((s) => `- **${s.fileName}** (${s.sourceCategory}, ${s.pageCount ?? '?'} pages)`).join('\n') + '\n'
          : '')
    })()}
` : ''}## Not yet read

${untouched.length
  ? `${untouched.length} file${untouched.length === 1 ? '' : 's'}.\n\n${untouched.map((source) => `- **${source.fileName}** (${source.sourceCategory}, ${source.pageCount ?? '?'} pages)`).join('\n')}`
  : 'None. Every source file in the module has been read.'}

## Every source

${unranked.length
  ? `${unranked.length} categor${unranked.length === 1 ? 'y is' : 'ies are'} not in this report's priority order and sort last: ${unranked.map((c) => `\`${c}\``).join(', ')}. Rank them in \`CATEGORY_ORDER\` to place them.\n\n`
  : ''}| File | Category | Pages |${text.size ? ' Text |' : ''} Yielded | State |
| --- | --- | --- |${text.size ? ' --- |' : ''} --- | --- |
${rows.map(line).join('\n')}
`

mkdirSync(join(REPO, 'docs/Kasr-Source-Imports/coverage'), { recursive: true })
const out = `docs/Kasr-Source-Imports/coverage/${SLUG}-coverage.md`
writeFileSync(join(REPO, out), report)
console.log(`${readCount}/${rows.length} sources read, ${untouched.length} outstanding, ${capped.length} capped -> ${out}`)
