/**
 * What became of every source file in a module.
 *
 *   node --experimental-strip-types scripts/kasr/build-corpus-coverage.ts "102 INT"
 *
 * A content programme's real failure mode is not a bad item; it is a file
 * nobody opened and nobody noticed nobody opened. Seventy files went into this
 * module and the only honest way to say it is finished is to say what happened
 * to each one — including the ones that yielded nothing, and why.
 *
 * This is the module-agnostic companion to `build-coverage.ts`, which counts
 * what module 101's bespoke extractors produced. It asks a different question
 * and answers it from the shared artefacts every lane has: `pagetext.py`'s
 * cache says which files were read and how, and the batch files under the
 * import root say which were actually used. So a lane gets a ledger without
 * owning an extractor per source kind.
 *
 * The distinction it exists to preserve: **read** is not **used**. A department
 * book read cover to cover and cited twice is not a book that yielded two
 * things — it is a book whose other 165 pages are still available. Collapsing
 * the two is how a corpus looks finished while most of it is untouched.
 */
import { existsSync, readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { MODULES } from './seeds/types.ts'

const module = process.argv[2]
if (!module || !MODULES[module]) {
  throw new Error(`usage: build-corpus-coverage.ts "<module>" — one of ${Object.keys(MODULES).join(', ')}`)
}
const slug = module.replace(/\s+/g, '-')

const ROOT = 'docs/Kasr-Source-Imports'
const CACHE = 'scripts/kasr/extract/pagetext'

interface ManifestSource {
  sourceId: string
  fileName: string
  corpusRelativePath: string
  moduleId: string | null
  secondaryModule: string | null
  sourceCategory: string | null
  examType: string | null
  fileType: string
  pageCount: number | null
  examSittingYear: number | null
  sourceTier: number | null
  textLayer: string | null
  exclusionReason: string | null
}

const manifest = JSON.parse(readFileSync(join(ROOT, 'manifest/kasr-y1-sources.json'), 'utf8'))
const rows: ManifestSource[] = manifest.sources.filter((s: ManifestSource) =>
  s.moduleId === module || s.secondaryModule === module)

// One entry per file, not per manifest row: a source ID is the file's checksum,
// so the same bytes filed twice are one file with two rows.
const sources = [...new Map(rows.map((s) => [s.sourceId, s])).values()]
  .sort((a, b) => (a.sourceTier ?? 9) - (b.sourceTier ?? 9)
    || a.corpusRelativePath.localeCompare(b.corpusRelativePath))

/** What the text cache holds for a source, if it was read at all. */
interface Cached {
  mode: string
  modeReason?: string
  manifestTextLayer?: string | null
  pages: string[]
  emptyPages: number[]
  unreadablePages?: number[]
}
const cacheFor = (id: string): Cached | null => {
  const path = join(CACHE, `${id}.json`)
  return existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : null
}

/**
 * Every source ID cited anywhere under the import root, and by which file.
 *
 * This is what "used" means: a batch names the source it came from, so a
 * source that appears in no batch produced nothing that shipped. Read from the
 * batches rather than from the extractors, so it stays true no matter which
 * extractor a lane used.
 */
function citations(): Map<string, Set<string>> {
  const used = new Map<string, Set<string>>()
  const walk = (dir: string) => {
    for (const name of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, name.name)
      if (name.isDirectory()) { walk(path); continue }
      if (!name.name.endsWith('.md') && !name.name.endsWith('.json')) continue
      // Three kinds of file name every source by construction, and counting
      // them reports the whole corpus as used — which is the one thing this
      // ledger exists to be able to deny. The index is one row per file; the
      // evidence-source and catalogue batches are one record per file. None of
      // them is a source being *used*; they are the file being catalogued.
      if (name.name === 'corpus-source-index.json') continue
      if (path.includes('/manifest/')) continue
      if (/-sources\.md$|-resources\.md$/.test(name.name)) continue
      if (path.includes('/coverage/')) continue
      const text = readFileSync(path, 'utf8')
      for (const [, id] of text.matchAll(/\b(src_[0-9a-f]{20})\b/g)) {
        const held = used.get(id) ?? new Set<string>()
        held.add(path.replace(`${ROOT}/`, ''))
        used.set(id, held)
      }
    }
  }
  walk(ROOT)
  return used
}

const used = citations()

interface Row {
  source: ManifestSource
  cached: Cached | null
  usedBy: string[]
}
const ledger: Row[] = sources.map((source) => ({
  source,
  cached: cacheFor(source.sourceId),
  usedBy: [...(used.get(source.sourceId) ?? [])].sort(),
}))

const excluded = ledger.filter((r) => r.source.exclusionReason)
const live = ledger.filter((r) => !r.source.exclusionReason)
const readRows = live.filter((r) => r.cached)
const unread = live.filter((r) => !r.cached)
const usedRows = live.filter((r) => r.usedBy.length)
const readNotUsed = readRows.filter((r) => !r.usedBy.length)
const pagesRead = readRows.reduce((sum, r) => sum + (r.cached?.pages.length ?? 0), 0)
const pagesTotal = live.reduce((sum, r) => sum + (r.source.pageCount ?? 0), 0)
const ocrRows = readRows.filter((r) => r.cached?.mode === 'ocr')
const fellBack = readRows.filter((r) => r.cached?.manifestTextLayer === 'native' && r.cached?.mode === 'ocr')

const pct = (n: number, of: number) => of ? `${Math.round((n / of) * 100)}%` : '—'

const table = (rows: Row[]) => rows.map((r) => {
  const c = r.cached
  const state = !c ? '**not read**'
    : r.usedBy.length ? `read (${c.mode})`
      : `read (${c.mode}), unused`
  const yield_ = r.usedBy.length ? r.usedBy.map((f) => `\`${f}\``).join('<br>') : '—'
  const flags = [
    c?.emptyPages.length ? `${c.emptyPages.length} empty` : '',
    c?.unreadablePages?.length ? `${c.unreadablePages.length} unreadable` : '',
  ].filter(Boolean).join(', ')
  return `| \`${r.source.sourceId}\` | ${r.source.sourceCategory ?? '—'} | ${r.source.pageCount ?? '—'} | ${state} | ${flags || '—'} | ${yield_} | ${r.source.corpusRelativePath} |`
}).join('\n')

const report = `# ${module} — source coverage

What became of every file the module owns. Generated by
\`scripts/kasr/build-corpus-coverage.ts\`, so rerunning it gives today's numbers
rather than the numbers somebody typed once.

| | |
|---|--:|
| Files the module owns | ${ledger.length} |
| Excluded before extraction | ${excluded.length} |
| In scope | ${live.length} |
| **Read** | **${readRows.length}** (${pct(readRows.length, live.length)}) |
| **Cited by a content batch** | **${usedRows.length}** (${pct(usedRows.length, live.length)}) |
| Read but not yet used | ${readNotUsed.length} |
| Not read | ${unread.length} |
| Pages read | ${pagesRead} of ${pagesTotal} (${pct(pagesRead, pagesTotal)}) |
| Read by OCR | ${ocrRows.length} |
| Manifest said \`native\`, OCR was needed | ${fellBack.length} |

"Cited" here means cited by a **content** batch — a concept, article, question,
claim or citation. The evidence-source and catalogue-resource batches name every
file in the module by construction, and this ledger's whole job is to be able to
say a file produced nothing, so counting those would make it incapable of
reporting the thing it exists to report.

**Read is not used, and the two columns are kept apart on purpose.** A 167-page
department book read cover to cover and cited by four batches has not "yielded
four things" — it has 163 pages still available. Collapsing the two is how a
corpus comes to look finished while most of it is untouched.

${fellBack.length ? `## Where the manifest was wrong about the text layer

${fellBack.length} file${fellBack.length === 1 ? '' : 's'} the manifest records as \`native\`
turned out to carry no readable text, and were re-read by OCR. The manifest is a
claim about a file; the file wins.

${fellBack.map((r) => `- \`${r.source.sourceId}\` — ${r.source.corpusRelativePath}\n  ${r.cached?.modeReason ?? ''}`).join('\n')}
` : '## The manifest\'s text-layer field was right every time\n\nNo file in this module needed the native-to-OCR fallback.\n'}
${unread.length ? `## Not read

These are the honest gap. Each is a file nobody has opened.

${table(unread)}
` : '## Every file in scope was read\n'}
## Read but not yet used

Read and available; no batch cites them yet. Not a failure — a queue.

${readNotUsed.length ? `| Source | Category | Pages | State | Pages flagged | Cited by | Path |
|---|---|--:|---|---|---|---|
${table(readNotUsed)}` : 'None — every file read has produced something.'}

## Everything, in tier order

| Source | Category | Pages | State | Pages flagged | Cited by | Path |
|---|---|--:|---|---|---|---|
${table(ledger)}

${excluded.length ? `## Excluded before extraction

${excluded.map((r) => `- \`${r.source.sourceId}\` — ${r.source.corpusRelativePath}\n  ${r.source.exclusionReason}`).join('\n')}
` : ''}`

mkdirSync(join(ROOT, 'coverage'), { recursive: true })
const out = `${ROOT}/coverage/${slug}-coverage.md`
writeFileSync(out, report)
console.log(JSON.stringify({
  module,
  owned: ledger.length,
  inScope: live.length,
  read: readRows.length,
  cited: usedRows.length,
  readNotUsed: readNotUsed.length,
  notRead: unread.length,
  pagesRead,
  pagesTotal,
  out,
}, null, 1))
