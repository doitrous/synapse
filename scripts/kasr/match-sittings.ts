/**
 * Match the question compilations onto the concepts they corroborate.
 *
 * Three files in this corpus list what came up without giving the wording or
 * the marks: `EOY 101 exams not answerd`, `EOY ANATOMY Final anatomy 101
 * questions ( upper only )` and `EOY 196 ISK 101 - WRITTEN 2023`. They are
 * topic lists in the faculty's own shorthand — "Radial Nerve (Branches)",
 * "Flexor retinaculum (attachment and relations)" — and the same topics recur
 * across all three.
 *
 * They cannot become questions: there is no wording to sit and no marks to
 * apportion. What they can do is corroborate. A concept minted from the 2025
 * paper that also appears on two of these has been asked three times, and
 * repetition is the strongest blueprint evidence this corpus holds.
 *
 * The rule this inherits from `seeds/sittings.ts` is the important one: only
 * topics that map to an existing concept **unambiguously** are taken. Mapping a
 * topic onto a near-neighbour inflates that neighbour's weight with evidence
 * belonging to something else — and a student's revision time follows the
 * weight. So the bar is high and everything under it is printed for a person to
 * place, not guessed at.
 *
 *   node --experimental-strip-types scripts/kasr/match-sittings.ts
 */
import { readFileSync, writeFileSync } from 'node:fs'

const CONCEPTS = 'docs/Kasr-Source-Imports/concept'
const QUESTIONS = 'scripts/kasr/questions.json'
const MANIFEST = 'docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json'
const OUT = 'scripts/kasr/extract/sitting-matches.json'

/** The compilations, and how the blueprint should weigh each. */
const COMPILATIONS: Record<string, { tier: string, year: number }> = {
  'EOY 101 exams not answerd (1).pdf': { tier: 'end_of_year', year: 2025 },
  'EOY ANATOMY Final anatomy 101 questions ( upper only )  (2).pdf': { tier: 'end_of_year', year: 2025 },
  'EOY 196 ISK 101 - WRITTEN 2023 (3) (1).pdf': { tier: 'end_of_year', year: 2023 },
}

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
for (const file of ['101-ISK-concepts.md', '101-ISK-mcq-concepts.md', '101-ISK-practical-concepts.md']) {
  let text: string
  try { text = readFileSync(`${CONCEPTS}/${file}`, 'utf8') } catch { continue }
  for (const block of text.split(/^\s*---\s*$/m)) {
    const id = field(block, 'id')
    const key = field(block, 'canonical_key')
    if (!id || !key) continue
    const label = field(block, 'label')
    const path = field(block, 'module_subject').split('\n')[0]
    // The key and the label together: the key carries the anatomy, the label
    // carries the words a topic list is likely to use.
    concepts.push({ id, key, label, path, words: terms(`${key.replace(/-/g, ' ')} ${label}`) })
  }
}

const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8')) as
  { sources: { fileName: string, sourceId: string }[] }
const idFor = new Map(manifest.sources.map((source) => [source.fileName, source.sourceId]))

const rows = (JSON.parse(readFileSync(QUESTIONS, 'utf8')) as
  { questions: { file: string, page: number, number: number, text: string }[] }).questions

// A topic must carry most of a concept's vocabulary, and must beat the runner-up
// clearly. The second test is what stops "Radial Nerve (Branches)" landing on a
// concept about the radial artery because both are radial and both are in the
// forearm.
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
  // One distinctive word is not enough to place a topic. "Fascia" alone could
  // be either of two concepts and the margin test cannot separate them when
  // both score 1.0.
  if (want.size < 2) { unplaced.push({ file: row.file, topic: row.text.slice(0, 90) }); continue }

  // The share of the TOPIC's words the concept carries, not the other way
  // round. These topics are the faculty's shorthand — "Radial Nerve
  // (Branches)" is two distinctive words — while a concept label is a full
  // sentence, so measuring how much of the label the topic covers scored every
  // correct match at 0.2 and matched nothing at all.
  const scored = concepts.map((concept) => {
    let shared = 0
    for (const word of want) if (concept.words.has(word)) shared += 1
    return { concept, score: shared / want.size }
  }).sort((a, b) => b.score - a.score)

  const [best, second] = scored
  if (best && best.score >= MATCHES && best.score - (second?.score ?? 0) >= MARGIN) {
    const signal = `${sourceId} | ${compilation.tier} | ${compilation.year} | p${row.page} | 101 ISK`
    const existing = matched[best.concept.key] ?? []
    if (!existing.includes(signal)) matched[best.concept.key] = [...existing, signal]
  } else {
    unplaced.push({
      file: row.file, topic: row.text.slice(0, 90),
      best: best?.concept.key, score: Number((best?.score ?? 0).toFixed(2)),
    })
  }
}

writeFileSync(OUT, `${JSON.stringify({
  whatThisIs: 'Topics from the three question compilations, matched to the concepts they corroborate. '
    + 'Only unambiguous matches are taken; the rest are listed for a person to place.',
  threshold: { matches: MATCHES, margin: MARGIN },
  matched, unplaced,
}, null, 1)}\n`)

console.log(`${Object.keys(matched).length} concepts corroborated by the compilations`)
console.log(`${Object.values(matched).reduce((sum, list) => sum + list.length, 0)} sitting signals`)
console.log(`${unplaced.length} topics left for a person to place -> ${OUT}`)
