/**
 * Which article teaches each concept, and which claim supports it.
 *
 *   node --experimental-strip-types scripts/asu/build-plans.ts "ASU-CVS"
 *
 * Writes `article-plan.json` and `claim-plan.json` into the module's staging
 * folder. Those are the assignment sheets an authoring pass works from, and
 * `seeds/links.ts` reads them back to fill the concept batch's `article_ids`,
 * `atomic_claim_ids` and `resource_ids`.
 *
 * One article per subject-tree leaf, not one per concept. A leaf is a chapter
 * of the department's own book, so an article covers what the faculty teaches
 * as one thing, and two questions from the same chapter share it. That is also
 * why this is regenerated rather than hand-maintained: reading another paper
 * adds concepts to leaves that already have an article, and only some of them
 * are new.
 *
 * **Existing IDs are never re-derived.** An article or claim ID already written
 * into a batch is read back out and reused, because a concept's ID is stable
 * but a *plan* is not — renaming a chapter or re-slugging a key would otherwise
 * mint a second article for a page that already has one, and `find-existing`
 * would be the only thing that ever noticed.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { MODULES, mintConceptId, type Paper, type Seed } from './seeds/types.ts'
import { REGISTRATIONS } from './seeds/registry.ts'

const module = process.argv[2]
if (!module || !MODULES[module]) {
  throw new Error(`usage: build-plans.ts "<module>" — one of ${Object.keys(MODULES).join(', ')}`)
}
const slug = module.replace(/\s+/g, '-')
const STAGE = `${process.env.ASU_TOOLCHAIN_EXTRACT_DIR ?? 'scripts/asu/extract'}/${slug}`

/**
 * Every paper read for this module — from `seeds/registry.ts`, not a second
 * hardcoded list. Kasr's original keeps `PAPERS: Record<string, string[]>`
 * beside `build-batches.ts`'s own registry, which is the same paper listed
 * twice: `102 INT`'s five files are the only entry Kasr's copy was ever
 * given, so a sixth paper registered in `build-batches.ts` and forgotten here
 * would silently drop out of the article/claim plan. Reading `REGISTRATIONS`
 * removes the second list entirely.
 */
const papers: Paper[] = REGISTRATIONS.filter((entry) => entry.module === module).map((entry) => entry.load())
if (!papers.length) throw new Error(`no readable paper for "${module}"`)

interface Chapter {
  subjectPath: string
  bookTitle: string
  physicalStart: number
  physicalEnd: number
  printedStart?: number
  printedEnd?: number
  sourceId?: string
  cancelledForExam?: boolean
  excludedFromWrittenExam?: boolean
}
const chapters = new Map<string, Chapter>()
for (const half of ['biochem', 'physio']) {
  const file = `${STAGE}/${half}-chapters.json`
  if (!existsSync(file)) continue
  for (const chapter of JSON.parse(readFileSync(file, 'utf8')) as Chapter[]) {
    chapters.set(chapter.subjectPath, chapter)
  }
}

const DEPT_BOOK = 'src_a488633802ec053c6325'
const upper = (value: string) => value.replace(/[^A-Za-z0-9]+/g, '-').toUpperCase().replace(/^-|-$/g, '')

/**
 * IDs already written into a batch, so a regenerated plan reuses them.
 *
 * Keyed by what the ID was derived from the first time — the article by its
 * `module_subject` path, the claim by its concept. Reading them back is what
 * stops a rerun quietly minting a second record for something that exists.
 */
function existingArticles(): Map<string, string> {
  const found = new Map<string, string>()
  const articleDir = process.env.ASU_TOOLCHAIN_OUT ? `${process.env.ASU_TOOLCHAIN_OUT}/article` : 'docs/Ain-Shams-Source-Imports/article'
  // Discovered by prefix, not Kasr's hardcoded ['biochemistry', 'physiology',
  // 'anatomy', 'histology'] subject-half list — Ain Shams has no fixed subject
  // set per module (see `apply-article-evidence.ts` for the same reasoning).
  const names = existsSync(articleDir)
    ? readdirSync(articleDir).filter((name) => name.startsWith(`${slug}-`) && name.endsWith('.md'))
    : []
  for (const name of names) {
    const file = `${articleDir}/${name}`
    for (const record of readFileSync(file, 'utf8').split(/^# Item$/m).slice(1)) {
      const id = record.match(/^## id\n(.+)$/m)?.[1]?.trim()
      const path = record.match(/^## module_subject\n(.+)$/m)?.[1]?.trim()
      if (id && path) found.set(path, id)
    }
  }
  return found
}

function existingClaims(): Map<string, string> {
  const found = new Map<string, string>()
  const evidenceDir = process.env.ASU_TOOLCHAIN_OUT ? `${process.env.ASU_TOOLCHAIN_OUT}/evidence` : 'docs/Ain-Shams-Source-Imports/evidence'
  const file = `${evidenceDir}/${slug}-claims.md`
  if (!existsSync(file)) return found
  for (const record of readFileSync(file, 'utf8').split(/^# Item$/m).slice(1)) {
    const id = record.match(/^## id\n(.+)$/m)?.[1]?.trim()
    const concept = record.match(/^## concept_id\n(.+)$/m)?.[1]?.trim()
    if (id && concept) found.set(concept, id)
  }
  return found
}

const knownArticles = existingArticles()
const knownClaims = existingClaims()

/** Every concept, deduplicated by canonical key exactly as the concept batch does. */
const byKey = new Map<string, { seed: Seed, id: string, paperFile: string }>()
for (const paper of papers) {
  for (const seed of paper.seeds) {
    if (byKey.has(seed.key)) continue
    byKey.set(seed.key, {
      seed,
      id: mintConceptId(seed.subject, seed.key, seed.system),
      paperFile: paper.source.file,
    })
  }
}

const byLeaf = new Map<string, { seed: Seed, id: string, paperFile: string }[]>()
for (const entry of byKey.values()) {
  byLeaf.set(entry.seed.modulePath, [...(byLeaf.get(entry.seed.modulePath) ?? []), entry])
}

const articlePlan = [...byLeaf.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([path, entries]) => {
  const chapter = chapters.get(path)
  if (!chapter) throw new Error(`${path}: no chapter in the ${module} subject tree`)
  const leaf = path.split(' > ').slice(-1)[0]
  const half = path.includes('> Biochemistry >') ? 'BIO' : 'PHY'
  const articleId = knownArticles.get(path) ?? `ART-${MODULES[module].code}-${half}-${upper(leaf)}`
  return {
    articleId,
    existing: knownArticles.has(path),
    modulePath: path,
    leaf,
    bookTitle: chapter.bookTitle,
    physicalStart: chapter.physicalStart,
    physicalEnd: chapter.physicalEnd,
    printedStart: chapter.printedStart ?? null,
    printedEnd: chapter.printedEnd ?? null,
    sourceId: chapter.sourceId ?? DEPT_BOOK,
    excluded: Boolean(chapter.cancelledForExam || chapter.excludedFromWrittenExam),
    concepts: entries.map(({ seed, id, paperFile }) => ({
      id,
      key: seed.key,
      label: seed.label,
      subject: seed.subject,
      primary: seed.primary,
      objective: seed.objective,
      definition: seed.definition,
      pitfall: seed.pitfall,
      asked: seed.asked,
      marks: seed.marks,
      type: seed.type,
      fromPaper: paperFile,
    })),
  }
})

const claimPlan = articlePlan.flatMap((article) => article.concepts.map((concept) => {
  const code = concept.id.split('-')[1]
  const stem = upper(concept.key).slice(0, 40).replace(/-$/, '')
  return {
    conceptId: concept.id,
    canonicalKey: concept.key,
    label: concept.label,
    definition: concept.definition,
    conceptType: concept.type,
    claimId: knownClaims.get(concept.id) ?? `CLM-${code}-${stem}-01`,
    citationId: `CIT-${stem}-01`,
    existing: knownClaims.has(concept.id),
    articleId: article.articleId,
    modulePath: article.modulePath,
    bookChapter: article.bookTitle,
    physicalStart: article.physicalStart,
    physicalEnd: article.physicalEnd,
    part: article.modulePath.includes('> Biochemistry >') ? 'I' : 'II',
    printedOffset: article.modulePath.includes('> Biochemistry >') ? 4 : 113,
    sourceId: article.sourceId,
    supportSpan: null,
    locatorPage: null,
    locatorSection: null,
    subject: null,
    predicate: null,
    object: null,
    riskClass: null,
  }
}))

const clash = claimPlan.map((c) => c.claimId).filter((id, i, all) => all.indexOf(id) !== i)
if (clash.length) throw new Error(`claim IDs collide: ${[...new Set(clash)].join(', ')}`)

mkdirSync(STAGE, { recursive: true })
writeFileSync(`${STAGE}/article-plan.json`, `${JSON.stringify(articlePlan, null, 1)}\n`)
writeFileSync(`${STAGE}/claim-plan.json`, `${JSON.stringify(claimPlan, null, 1)}\n`)

console.log(JSON.stringify({
  module,
  papers: papers.length,
  concepts: byKey.size,
  articles: articlePlan.length,
  articlesAlreadyWritten: articlePlan.filter((a) => a.existing).length,
  articlesToWrite: articlePlan.filter((a) => !a.existing).length,
  claims: claimPlan.length,
  claimsAlreadyWritten: claimPlan.filter((c) => c.existing).length,
  claimsToWrite: claimPlan.filter((c) => !c.existing).length,
}, null, 1))
