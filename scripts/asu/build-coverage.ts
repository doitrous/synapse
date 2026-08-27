/**
 * What became of every source file in one module.
 *
 *   node --experimental-strip-types scripts/asu/build-coverage.ts --module "ASU-CVS"
 *
 * Copied from `scripts/kasr/build-coverage.ts`. Kasr's `--module` defaults to
 * `101 ISK`, because that module's ledger predates the argument existing.
 * Ain Shams has no such legacy — every module here is namespaced from day
 * one (LANE-BRIEF.md §2) — so `--module` is **required**, matching
 * `build-batches.ts`'s own refusal to run bare.
 *
 * Results are read from `extract/<module-slug>/` only. Kasr's copy falls back
 * to an unprefixed path for its one legacy module; there is no equivalent
 * fallback here because there is no unprefixed Ain Shams result to fall back
 * to — LANE-BRIEF.md §2 is explicit that no per-run result here is ever an
 * unprefixed file.
 *
 * A content programme's real failure mode is not a bad item; it is a file
 * nobody opened and nobody noticed nobody opened.
 *
 * Generated rather than written, so it cannot quietly go stale: rerun it and
 * the numbers are today's.
 */
import { existsSync, readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs'
import { seededBySource } from './seeds/registry.ts'
import { isAbsolute, join } from 'node:path'

/**
 * Join REPO onto a path that might already be absolute.
 *
 * `node:path`'s `join()` — unlike Python's `os.path.join` — does not
 * special-case an absolute later segment: `join('/repo', '/private/tmp/x')`
 * returns `/repo/private/tmp/x`, silently nesting an absolute env-var
 * override (`ASU_TOOLCHAIN_OUT`, `ASU_TOOLCHAIN_MANIFEST_DIR`) inside the
 * repo instead of using it as given. Found by a stray `private/tmp/...`
 * directory this script wrote into the repo root during the fixture
 * proof. `path.resolve` has the right semantics for this.
 */
const under = (base: string, target: string) => isAbsolute(target) ? target : join(base, target)

const REPO = process.cwd()
const read = (path: string) => JSON.parse(readFileSync(join(REPO, path), 'utf8'))
const maybe = (path: string) => existsSync(join(REPO, path)) ? read(path) : null

interface ManifestSource {
  sourceId: string; fileName: string; moduleId: string; sourceCategory: string
  fileType: string; pageCount: number | null; examSittingYear: number | null
  sourceTier: number; absolutePath: string; secondaryModule: string | null
}

const args = process.argv.slice(2)
const MODULE = args.includes('--module') ? args[args.indexOf('--module') + 1] : undefined
if (!MODULE) {
  throw new Error('name the module to cover: --module "ASU-CVS". Ain Shams has no default '
    + 'module — unlike Kasr\'s "101 ISK" fallback — so this refuses rather than guessing.')
}
/** `ASU-CVS` -> `ASU-CVS` (already has no spaces); kept as a transform in case a future module does. */
const SLUG = MODULE.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
const COMMAND = `scripts/asu/build-coverage.ts --module "${MODULE}"`

/** Where this module's extractor results live. Module-namespaced only — no unprefixed fallback (LANE-BRIEF.md §2). */
const scoped = (name: string) => `scripts/asu/extract/${SLUG}/${name}`

/**
 * Every `asu-y<N>-sources.json` manifest present, merged — see
 * `build-source-index.ts` for the fuller rationale. A module's rows may in
 * principle live in more than one year's manifest during a mid-year
 * curriculum move (LANE-BRIEF.md §3's CNS/Endocrine/Special Senses note), so
 * this does not assume one manifest per module.
 */
const MANIFEST_DIR = process.env.ASU_TOOLCHAIN_MANIFEST_DIR ?? 'docs/Ain-Shams-Source-Imports/manifest'
const manifestFiles = existsSync(under(REPO, MANIFEST_DIR))
  ? readdirSync(under(REPO, MANIFEST_DIR)).filter((name) => /^asu-y\d+-sources\.json$/.test(name)).sort()
  : []
if (!manifestFiles.length) {
  throw new Error(`no "asu-y<N>-sources.json" manifest found under ${MANIFEST_DIR} — nothing to cover yet.`)
}
const rows_: ManifestSource[] = manifestFiles
  .flatMap((name) => (read(`${MANIFEST_DIR}/${name}`).sources as ManifestSource[]))
  .filter((s) => s.moduleId === MODULE || s.secondaryModule === MODULE)

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
/**
 * A result file may hold rows for sources outside this module — the shared
 * question dump does, and so does anything a lane ran before namespacing. A row
 * whose source is not this module's is dropped rather than counted, because the
 * headline totals are read as this module's yield and once said they are very
 * hard to unsay.
 */
const mine = new Set(rows_.map((s) => s.sourceId))
const bump = (id: string, field: Yield, by = 1) => {
  if (!mine.has(id)) return
  const row = tally.get(id) ?? {
    written: 0, mcq: 0, slides: 0, radiology: 0, chapters: 0, topics: 0, answers: 0, sittings: 0, seeded: 0 }
  row[field] += by
  tally.set(id, row)
}

const questions = maybe(scoped('questions.json'))
for (const q of questions?.questions ?? []) bump(q.sourceId, 'written')

const mcq = maybe(scoped('mcq.json'))
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

// The end-of-module papers, re-read at 300 dpi. These are sat papers and the
// highest-priority multiple-choice source in the corpus; the first pass got 359
// mangled rows off them at 150 dpi and this one gets 360 clean questions across
// the four sittings the six files actually are. Counted here so the ledger
// reports the reading that is used rather than the one that was superseded.
const eom = maybe(scoped('eom.json'))
for (const question of eom?.questions ?? []) bump(question.sourceId, 'mcq')

const practical = maybe(scoped('practical.json'))
for (const slide of practical?.slides ?? []) bump(slide.sourceId, 'slides')
for (const item of practical?.writtenItems ?? []) bump(item.sourceId, 'written')
for (const view of practical?.radiology ?? []) bump(view.sourceId ?? '', 'radiology')

const deptbook = maybe(scoped('deptbook.json'))
for (const chapter of deptbook?.chapters ?? []) if (chapter.found) bump(deptbook.sourceId, 'chapters')

// The one-page orientation sheet is the module's authoritative statement of how
// it is examined, and it yields no questions at all. Counting only questions
// called the most important document in the corpus unread.
const notes = maybe(scoped('notes.json'))
if (notes?.orientation?.verbatim) {
  const sheet = (notes.files ?? []).find((file: { file: string }) => /Orientation/i.test(file.file))
  if (sheet?.sourceId) bump(sheet.sourceId, 'topics')
}

// Three sources are indices OF papers rather than papers: they name what was
// asked in which sitting, without wording or marks.
const sittings = maybe(scoped('sittings.json'))
for (const sitting of sittings?.sittings ?? []) bump(sitting.sourceId, 'sittings', sitting.topics.length)
for (const model of sittings?.modelAnswers ?? []) bump(model.sourceId, 'answers', model.questions.length)
// A paper transcribed straight into a seed file, question by question with a
// mark scheme against each, is the most thoroughly read thing in this corpus —
// and it left no extractor JSON behind, so a tally built from those alone
// reported it as never opened. The 2023 Baqoon resit was exactly that: thirteen
// questions seeded off a clean text layer, listed here as "not yet read".
for (const [id, count] of seededBySource(MODULE)) bump(id, 'seeded', count)

for (const topic of notes?.topics ?? []) bump(topic.sourceId, 'topics')
for (const past of notes?.pastQuestions ?? []) bump(past.sourceId, 'written')

/**
 * Papers read straight into a seed file, without an extractor.
 *
 * The Baqoon 197 paper was transcribed by reading the PDF and writing the seed
 * by hand — no extractor was involved, so nothing in `questions.json` or its
 * siblings mentions it, and this ledger called it unread while thirteen of its
 * questions were sitting in a validated batch.
 *
 * A ledger that only counts the tools it knows about will always be wrong about
 * work done another way, and being wrong in the direction of "nobody read this"
 * is the expensive direction: it invites someone to read it again.
 */
const seedDir = 'scripts/asu/seeds'
if (existsSync(join(REPO, seedDir))) {
  for (const name of readdirSync(join(REPO, seedDir))) {
    if (!name.endsWith('.ts') || name === 'types.ts') continue
    const text = readFileSync(join(REPO, seedDir, name), 'utf8')
    const id = text.match(/id:\s*'(src_[0-9a-f]{20})'/)?.[1]
    if (!id) continue
    // One `q:` per seed. Close enough to say the paper was read, which is the
    // only claim this ledger makes.
    const seeds = [...text.matchAll(/^\s+q:\s*\d+,/gm)].length
    if (seeds) bump(id, 'written', seeds)
  }
}

/** Files an extractor stopped short on, and by how much. */
for (const file of [...(mcq?.files ?? []), ...(practical?.files ?? []), ...(notes?.files ?? [])]) {
  if (!file.capped) continue
  const row = tally.get(file.sourceId)
  if (row) row.capped = `${file.pagesRead ?? '?'}/${file.pages ?? '?'} pages`
}

/**
 * Which sources have had their text pulled, and what came back.
 *
 * Extracting a file's text is not the same as reading it, and the difference is
 * the one this report exists to make visible. A source can be fully extracted
 * and still have yielded nothing, because nobody has authored from it yet —
 * that is scheduled work. A source that extracted to *nothing* is a different
 * problem: an OCR pass returning blank pages is a file still waiting to be read
 * by eye, and it must not sit in the same bucket as a file nobody has opened.
 *
 * The cache is gitignored and shared by every lane, so it is filtered to this
 * module and a clean checkout reports no extraction rather than pretending to
 * some.
 */
function extracted() {
  const found = new Map<string, { pages: number; empty: number; mode: string }>()
  const dir = join(REPO, 'scripts/asu/extract/pagetext')
  if (!existsSync(dir)) return found
  for (const name of readdirSync(dir)) {
    if (!name.endsWith('.json')) continue
    const doc = read(`scripts/asu/extract/pagetext/${name}`)
    if (!mine.has(doc.sourceId)) continue
    found.set(doc.sourceId, {
      pages: doc.pages.length,
      empty: (doc.emptyPages ?? []).length,
      mode: doc.mode,
    })
  }
  return found
}
const text = extracted()

/** Items authored into batches, counted from the batch files themselves. */
/**
 * Sources an authored batch actually cites, and how many records cite each.
 *
 * A module can be worked two ways. An extractor run leaves a result file, and
 * the tally above reads it. But a module authored by hand — reading a paper and
 * writing concepts from it — leaves no result file at all, so every one of its
 * sources reads as "not yet read" however much was written from it. `103 BMS`
 * reported 0 of 51 read while carrying 46 concepts and 29 citations drawn from
 * six of them.
 *
 * A manifest ID appearing in a batch is evidence that somebody opened that
 * file, which is exactly what this column claims to report. Counted separately
 * from the extractor tally, because "a person read this and wrote 12 records"
 * and "a script pulled 718 questions out of it" are different facts and
 * collapsing them would overstate both.
 */
function citedByBatches() {
  const counts = new Map<string, number>()
  const root = 'docs/Ain-Shams-Source-Imports'
  for (const kind of ['concept', 'question', 'article', 'practical', 'written', 'evidence', 'resource']) {
    const dir = join(REPO, root, kind)
    if (!existsSync(dir)) continue
    for (const name of readdirSync(dir)) {
      if (!name.endsWith('.md') || !name.startsWith(SLUG)) continue
      for (const record of readFileSync(join(dir, name), 'utf8').split(/^\s*---\s*$/m)) {
        if (!record.includes('# Item')) continue
        // One record may name a source several times — in a citation's
        // resource_id and again in prose. It is one record either way.
        for (const id of new Set(record.match(/src_[0-9a-f]{20}/g) ?? [])) {
          if (mine.has(id)) counts.set(id, (counts.get(id) ?? 0) + 1)
        }
      }
    }
  }
  return counts
}
const cited = citedByBatches()

function authored() {
  const counts = new Map<string, number>()
  const root = 'docs/Ain-Shams-Source-Imports'
  for (const kind of ['concept', 'question', 'article', 'practical', 'written', 'evidence', 'resource']) {
    const dir = join(REPO, root, kind)
    if (!existsSync(dir)) continue
    for (const name of readdirSync(dir)) {
      if (!name.endsWith('.md')) continue
      // This module's batches only. `docs/Ain-Shams-Source-Imports` now holds 104 CPS
      // and 108 INT as well, and a file headed "101 ISK — source coverage" that
      // counts another module's articles is not a coverage report, it is a
      // total. It was claiming 4,240 items where 101 ISK has 3,792.
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
  const citing = cited.get(source.sourceId) ?? 0
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
    citing && `${citing} authored record${citing === 1 ? '' : 's'}`,
  ].filter(Boolean).join(', ')
  const state = yields
    ? (t?.capped ? `read ${t.capped}` : 'read in full')
    : (citing ? 'read and authored from' : 'not yet read')
  const x = text.get(source.sourceId)
  const extractedAs = x ? (x.empty === 0 ? x.mode : `${x.mode}, ${x.empty}/${x.pages} blank`) : '—'
  // The column is omitted entirely where nothing has been extracted, rather than
  // printed as a row of dashes: a module with no extraction has nothing to say
  // here, and saying it in a column is not the same as saying nothing.
  const textCell = text.size ? ` ${extractedAs} |` : ''
  const names = alsoFiledAs.get(source.sourceId) ?? [source.fileName]
  const label = names.length > 1
    ? `${names[0]} <br>*also filed as ${names.slice(1).join(', ')}*`
    : source.fileName
  return `| ${label.replace(/\|/g, '\\|')} | ${source.sourceCategory} | ${source.pageCount ?? '—'} |${textCell} ${yields || '—'} | ${state} |`
}

const untouched = rows.filter((source) => !tally.get(source.sourceId) && !cited.get(source.sourceId))
const readCount = rows.length - untouched.length
const totals = [...tally.values()].reduce((sum, t) => ({
  written: sum.written + t.written, mcq: sum.mcq + t.mcq, slides: sum.slides + t.slides,
  radiology: sum.radiology + t.radiology, topics: sum.topics + t.topics,
  sittings: sum.sittings + t.sittings,
}), { written: 0, mcq: 0, slides: 0, radiology: 0, topics: 0, sittings: 0 })

const batches = authored()
const capped = rows.filter((source) => tally.get(source.sourceId)?.capped)

const report = `# ${MODULE} — source coverage

Generated by \`${COMMAND}\`. Rerun it and the numbers are today's.

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

${text.size ? `## Text extracted

${(() => {
      const have = rows.filter((source) => text.has(source.sourceId))
      const pages = have.reduce((sum, s) => sum + text.get(s.sourceId)!.pages, 0)
      const blank = have.reduce((sum, s) => sum + text.get(s.sourceId)!.empty, 0)
      const ocr = have.filter((s) => text.get(s.sourceId)!.mode === 'ocr')
      // Files and pages answer different questions. "33 of 1554 by OCR" reads as
      // a rounding error when the true figure is 750 pages across 32 files, and
      // that inverts the reliability judgement a reader makes about every number
      // below it. Print both.
      const ocrPages = ocr.reduce((sum, s) => sum + text.get(s.sourceId)!.pages, 0)
      const silent = have.filter((s) => {
        const x = text.get(s.sourceId)!
        return x.pages > 0 && x.empty === x.pages
      })
      return `Text has been pulled from ${have.length} of ${rows.length} sources — ${pages} pages, `
        + `${ocrPages} of those pages by OCR across ${ocr.length} file${ocr.length === 1 ? '' : 's'} `
        + `carrying no text layer. ${blank} page${blank === 1 ? '' : 's'} came back empty.\n\n`
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

| File | Category | Pages |${text.size ? ' Text |' : ''} Yielded | State |
| --- | --- | --- |${text.size ? ' --- |' : ''} --- | --- |
${rows.map(line).join('\n')}
`

const OUT_ROOT = process.env.ASU_TOOLCHAIN_OUT ?? 'docs/Ain-Shams-Source-Imports'
mkdirSync(under(REPO, `${OUT_ROOT}/coverage`), { recursive: true })
const out = `${OUT_ROOT}/coverage/${SLUG}-coverage.md`
writeFileSync(under(REPO, out), report)
console.log(`${readCount}/${rows.length} sources read, ${untouched.length} outstanding, ${capped.length} capped -> ${out}`)
