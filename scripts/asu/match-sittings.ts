/**
 * Match question compilations onto the concepts they corroborate.
 *
 *   node --experimental-strip-types scripts/asu/match-sittings.ts "ASU-CVS"
 *
 * Copied from `scripts/kasr/match-sittings.ts` as a shape, emptied of Kasr's
 * `COMPILATIONS` table — those three entries name real Kasr PDFs
 * (`EOY 101 exams not answerd (1).pdf` and two others) and mean nothing for
 * this corpus. Fill `COMPILATIONS` in for a module once its own corpus
 * compilations are known — the matching algorithm and its 0.6/0.15
 * match/margin thresholds are unchanged, see Kasr's original for the full
 * rationale.
 *
 * Also retrofitted for `--module`: concept files are discovered by prefix
 * (like `build-evidence.ts`) rather than the hardcoded 101 trio, the
 * manifest is every `asu-y<N>-sources.json` present rather than one file, the
 * question dump is module-namespaced (`extract/<slug>/questions.json`, never
 * the bare `scripts/kasr/questions.json`), and the `exam_signal` grammar
 * writes `${module}` instead of the literal `101 ISK`.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { MODULES } from './seeds/types.ts'

const module = process.argv[2]
if (!module || !MODULES[module]) {
  throw new Error(`usage: match-sittings.ts "<module>" — one of ${Object.keys(MODULES).join(', ')}`)
}
const slug = module.replace(/\s+/g, '-')
const EXTRACT = process.env.ASU_TOOLCHAIN_EXTRACT_DIR ?? 'scripts/asu/extract'
const OUT_ROOT = process.env.ASU_TOOLCHAIN_OUT ?? 'docs/Ain-Shams-Source-Imports'
const MANIFEST_DIR = process.env.ASU_TOOLCHAIN_MANIFEST_DIR ?? 'docs/Ain-Shams-Source-Imports/manifest'

const CONCEPTS = `${OUT_ROOT}/concept`
const QUESTIONS = `${EXTRACT}/${slug}/questions.json`
const OUT = `${EXTRACT}/${slug}/sitting-matches.json`

/**
 * The compilations, and how the blueprint should weigh each.
 *
 * >>> FILL IN PER MODULE, once its corpus compilations are identified <<<
 * Keyed by the manifest's own `fileName`.
 */
const COMPILATIONS: Record<string, { tier: string, year: number }> = {}

const STOP = new Set(['the', 'and', 'of', 'in', 'to', 'a', 'an', 'its', 'with', 'for', 'from',
  'regarding', 'mention', 'describe', 'discuss', 'compare', 'between', 'give', 'enumerate',
  'summarize', 'summarise', 'explain', 'define', 'definition', 'types', 'type', 'parts', 'part',
  'branches', 'origin', 'course', 'end', 'action', 'actions', 'supply', 'relations', 'attachment',
  'attachments', 'function', 'functions', 'formation', 'site', 'boundaries', 'contents'])

const terms = (text: string) => new Set(
  text.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/)
    .filter((word) => word.length > 3 && !STOP.has(word)))

const field = (block: string, label: string) =>
  block.match(new RegExp(`^## ${label}[ \\t]*\\n([\\s\\S]*?)(?=\\n## |$)`, 'm'))?.[1].trim() ?? ''

interface Concept { id: string, key: string, label: string, path: string, words: Set<string> }

const concepts: Concept[] = []
const conceptFiles = existsSync(CONCEPTS)
  ? readdirSync(CONCEPTS).filter((name) => name.startsWith(`${slug}-`) && name.endsWith('-concepts.md'))
  : []
for (const file of conceptFiles) {
  const text = readFileSync(`${CONCEPTS}/${file}`, 'utf8')
  for (const block of text.split(/^\s*---\s*$/m)) {
    const id = field(block, 'id')
    const key = field(block, 'canonical_key')
    if (!id || !key) continue
    const label = field(block, 'label')
    const path = field(block, 'module_subject').split('\n')[0]
    concepts.push({ id, key, label, path, words: terms(`${key.replace(/-/g, ' ')} ${label}`) })
  }
}

const manifestFiles = existsSync(MANIFEST_DIR)
  ? readdirSync(MANIFEST_DIR).filter((name) => /^asu-y\d+-sources\.json$/.test(name)).sort()
  : []
const manifestSources = manifestFiles.flatMap((name) =>
  (JSON.parse(readFileSync(`${MANIFEST_DIR}/${name}`, 'utf8')) as { sources: { fileName: string, sourceId: string }[] }).sources)
const idFor = new Map(manifestSources.map((source) => [source.fileName, source.sourceId]))

const rows = existsSync(QUESTIONS)
  ? (JSON.parse(readFileSync(QUESTIONS, 'utf8')) as
    { questions: { file: string, page: number, number: number, text: string }[] }).questions
  : []

const MATCHES = 0.6
const MARGIN = 0.15

const matched: Record<string, string[]> = {}
const unplaced: { file: string, topic: string, best?: string, score?: number }[] = []

for (const row of rows) {
  const compilation = COMPILATIONS[row.file]
  if (!compilation) continue
  const sourceId = idFor.get(row.file)
  if (!sourceId) continue

  const want = terms(row.text)
  if (want.size < 2) { unplaced.push({ file: row.file, topic: row.text.slice(0, 90) }); continue }

  const scored = concepts.map((concept) => {
    let shared = 0
    for (const word of want) if (concept.words.has(word)) shared += 1
    return { concept, score: shared / want.size }
  }).sort((a, b) => b.score - a.score)

  const [best, second] = scored
  if (best && best.score >= MATCHES && best.score - (second?.score ?? 0) >= MARGIN) {
    const signal = `${sourceId} | ${compilation.tier} | ${compilation.year} | p${row.page} | ${module}`
    const existing = matched[best.concept.key] ?? []
    if (!existing.includes(signal)) matched[best.concept.key] = [...existing, signal]
  } else {
    unplaced.push({
      file: row.file, topic: row.text.slice(0, 90),
      best: best?.concept.key, score: Number((best?.score ?? 0).toFixed(2)),
    })
  }
}

mkdirSync(`${EXTRACT}/${slug}`, { recursive: true })
writeFileSync(OUT, `${JSON.stringify({
  whatThisIs: 'Topics from question compilations, matched to the concepts they corroborate. '
    + 'Only unambiguous matches are taken; the rest are listed for a person to place.',
  threshold: { matches: MATCHES, margin: MARGIN },
  matched, unplaced,
}, null, 1)}\n`)

console.log(`${Object.keys(matched).length} concepts corroborated by the compilations`)
console.log(`${Object.values(matched).reduce((sum, list) => sum + list.length, 0)} sitting signals`)
console.log(`${unplaced.length} topics left for a person to place -> ${OUT}`)
