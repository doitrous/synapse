/**
 * Build every batch for one Ain Shams module from the papers registered in
 * `seeds/registry.ts`.
 *
 * Copied from `scripts/kasr/build-batches.ts`. One command per module, one
 * output root (`docs/Ain-Shams-Source-Imports`, overridable — see `OUT`
 * below), and no build-everything mode, for the same reason Kasr's copy
 * refuses a bare run: several modules share this script and a bare run
 * rewrites every registered module's output.
 *
 *   node --experimental-strip-types scripts/asu/build-batches.ts "ASU-CVS"
 *   node --experimental-strip-types scripts/asu/build-batches.ts "ASU-FIXTURE"
 *
 * ORDER CHANGE relative to Kasr's copy — concept IDs carry no module or
 * university (see `seeds/types.ts`'s `mintConceptId`), so before writing a
 * *new* concept record this build looks the minted ID up against live state
 * and every pending batch, university included, and takes one of three
 * branches:
 *
 *   1. No hit anywhere            -> a full concept record, as before.
 *   2. Hit in live state          -> a sparse update record (`+asu`,
 *                                     `+<year>`, `+<module id>` appends;
 *                                     `module_subject` and
 *                                     `exam_weight_by_year` as a full merged
 *                                     value — see `emit.ts`'s
 *                                     `conceptUpdateBlock`), written into the
 *                                     normal concept batch alongside full
 *                                     records — the importer decides
 *                                     create-vs-update per row by `id`.
 *   3. Hit only in a pending,     -> the SAME sparse update record, but
 *      not-yet-imported batch        routed to `pending-live/<module>-
 *                                     <kind>.md` — outside every import
 *                                     folder, never into `concept/` —
 *                                     because the record it updates does not
 *                                     exist yet. An update row on an absent
 *                                     id makes the importer stub a bare
 *                                     record for it, and a *full* record on
 *                                     an id this scan merely didn't find
 *                                     would evict whatever the other
 *                                     university's batch was about to attach
 *                                     to it once it lands — neither is safe.
 *                                     `pending-live/INDEX.md` names which
 *                                     file has to land first.
 *
 * Every decision is logged to stderr, one line per concept, so a reviewer can
 * see which branch every concept in the file took without re-deriving it.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import {
  MODULES, mintConceptId, moduleOf, partsKey, subjectCollisions, subjectForPath,
  type AsuSubject, type ModuleRef, type Paper, type Seed, type SourceRef,
} from './seeds/types.ts'
import {
  batchFile, blueprintWeight, conceptBlock, conceptOccurrence, conceptUpdateBlock,
  mcqBlock, mcqConceptBlock, mcqConceptWeight, writtenBlock,
} from './emit.ts'
import type { BankRow, McqLeafSeed } from './seeds/mcq.ts'
import { REGISTRATIONS } from './seeds/registry.ts'
import type { MediaRequest } from './seeds/from-json.ts'
import { loadLinks, unsupportedClaims } from './seeds/links.ts'
import { ARTICLE_FOR_CONCEPT } from './seeds/articles.ts'
import { SITTING_SIGNALS } from './seeds/sittings.ts'
import { findExistingConcept } from './seeds/existing.ts'

/**
 * Overridable so the fixture proof never lands in the real import queue —
 * see LANE-BRIEF.md's "Prove it works" step 1. Unset in every real run.
 */
const OUT = process.env.ASU_TOOLCHAIN_OUT ?? 'docs/Ain-Shams-Source-Imports'

/** A module ID as it appears in a filename. Ain Shams IDs (`ASU-CVS`, `ASU-CNS-2`) already have no spaces, but this stays in case a future module does. */
const fileSlug = (module: string) => module.replace(/\s+/g, '-')

/** What each article offers as further reading, read from the articles. Unchanged from Kasr's `furtherReading`. */
function furtherReading(): Map<string, string[]> {
  const dir = `${OUT}/article`
  const out = new Map<string, string[]>()
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir).filter((one) => one.endsWith('.md'))) {
    for (const block of readFileSync(`${dir}/${name}`, 'utf8').split(/^\s*---\s*$/m)) {
      const id = block.match(/## id\n(\S+)/)?.[1]
      const related = block.match(/## related_articles\n([\s\S]*?)(?=\n## |$)/)?.[1] ?? ''
      if (!id) continue
      out.set(id, [...new Set([...related.matchAll(/^(ART-[A-Z0-9-]+)/gm)].map((m) => m[1]))])
    }
  }
  return out
}

/** The line every generated batch carries, and the sweep's only licence to delete. Unchanged from Kasr's. */
const GENERATED_BY = 'Generated by scripts/asu/build-batches.ts'

/** The filename each tier gets. Unchanged from Kasr's `TIER_PREFIX` — see that file for why this refuses rather than defaulting. */
const TIER_PREFIX: Record<SourceRef['tier'], string> = {
  orientation: 'ORIENTATION',
  end_of_year: 'EOY',
  end_of_module: 'EOM',
  baqoon: 'BAQOON',
  department_book: 'DEPTBOOK',
  department_questions: 'DEPTQ',
  other: 'FORMATIVE',
}

/** `ASU-CVS-EOY-2025`. Refuses rather than producing `undefined` — see Kasr's `slug` for the incident this guards against. */
const slug = (paper: Paper) => {
  const prefix = TIER_PREFIX[paper.source.tier]
  if (!prefix) {
    throw new Error(
      `${paper.source.file}: tier "${paper.source.tier}" has no filename prefix. `
      + `Known tiers are ${Object.keys(TIER_PREFIX).join(', ')} — the vocabulary is `
      + `EXAM_SOURCE_TIERS in src/data/examSignal.ts, and a tier outside it is coerced `
      + `to "other" there, silently costing the paper its blueprint weight.`)
  }
  return `${fileSlug(moduleOf(paper.source).id)}-${prefix}-${paper.source.sittingYear}`
}

/**
 * Where a pending-collision update record goes — outside every import folder,
 * per the orchestrator's ruling: importing a sparse update whose id is not
 * live yet makes the importer create a stub for it (an update row does not
 * `materialiseNewConcept`), and importing a *full* record on an id that is
 * merely absent from THIS scan would evict whatever the other university's
 * batch was about to attach to it once it lands. Neither is safe, so this
 * output sits beside the normal kind folders rather than inside one, and an
 * INDEX.md line says which file has to land first.
 */
const PENDING_LIVE_DIR = `${OUT}/pending-live`

/**
 * Write (or append to) `pending-live/`'s block file for one module + kind,
 * plus its `INDEX.md` line — idempotent across repeated builds, so rerunning
 * this script does not grow the index with duplicate lines.
 */
function writePendingLive(module: string, kindSlug: string, blocks: string[], blockers: string[]): string | undefined {
  if (!blocks.length) return undefined
  mkdirSync(PENDING_LIVE_DIR, { recursive: true })
  const file = `${PENDING_LIVE_DIR}/${fileSlug(module)}-${kindSlug}.md`
  const header = `Sparse updates for ${module} whose id is claimed only by another lane's not-yet-imported `
    + `batch — the record they update is not live yet, so importing this now would race that lane's own `
    + `import rather than merge with it. Apply only after the blocking file(s) named in INDEX.md are live. `
    + `${GENERATED_BY}.`
  writeFileSync(file, batchFile(header, blocks))

  const indexPath = `${PENDING_LIVE_DIR}/INDEX.md`
  const relFile = file.startsWith(`${OUT}/`) ? file.slice(OUT.length + 1) : file
  const line = `- \`${relFile}\` — apply only after ${[...new Set(blockers)].sort().join(', ')} is live`
  const banner = '# pending-live — apply only after the named blocking file is live\n\n'
  const before = existsSync(indexPath) ? readFileSync(indexPath, 'utf8') : banner
  if (!before.includes(line)) writeFileSync(indexPath, `${before.trimEnd()}\n${line}\n`)
  return file
}

/**
 * Decide, for one concept, which of the three branches it takes — and log it.
 *
 * `weight` is the figure this concept would carry in `exam_weight_by_year`
 * had it been minted fresh — computed by the caller with the same formula
 * `conceptBlock`/`mcqConceptBlock` use internally, so a live/pending update
 * and a full record agree on what this occurrence is worth.
 */
function resolveConcept(
  id: string, module: ModuleRef, modulePath: string, signal: string, weight: string,
  full: () => string,
): { block: string; branch: 'full' | 'live-update' | 'pending-collision'; blocker?: string } {
  const existing = findExistingConcept(id)
  if (!existing) {
    console.error(`  ${id}: no existing record anywhere — full concept record`)
    return { block: full(), branch: 'full' }
  }
  if (existing.where.startsWith('live:')) {
    console.error(`  ${id}: hit in ${existing.where} — sparse update, into the normal batch`)
    return { block: conceptUpdateBlock(id, existing, module, modulePath, signal, weight), branch: 'live-update' }
  }
  console.error(`  ${id}: hit only in ${existing.where} (not yet imported) — routed to pending-live/, not concept/`)
  return {
    block: conceptUpdateBlock(id, existing, module, modulePath, signal, weight),
    branch: 'pending-collision',
    blocker: existing.where.replace(/^pending: /, ''),
  }
}

/**
 * Concepts, deduplicated by canonical key across every paper — and, because
 * the mint no longer salts by module, across every university that has
 * already authored the same idea. See the file header for the three-way
 * switch this now runs per concept.
 */
function concepts(module: string, papers: Paper[]) {
  const reading = furtherReading()
  const byKey = new Map<string, { paper: Paper, seed: Seed, repeats: string[] }>()

  for (const paper of papers) {
    for (const seed of paper.seeds) {
      const found = byKey.get(seed.key)
      if (!found) { byKey.set(seed.key, { paper, seed, repeats: [] }); continue }
      found.repeats.push(
        `${paper.source.id} | ${paper.source.tier} | ${paper.source.sittingYear} | p${seed.page} | ${module}`)
    }
  }

  for (const [key, signals] of Object.entries(SITTING_SIGNALS)) {
    const found = byKey.get(key)
    if (found) found.repeats.push(...signals)
  }

  const links = loadLinks(module)
  const withoutSpan = unsupportedClaims(module)
  const moduleRef = MODULES[module]

  const fullBlocks: string[] = []
  const pendingBlocks: string[] = []
  const pendingBlockers: string[] = []
  let fresh = 0, liveUpdates = 0, pendingCollisions = 0

  for (const { paper, seed, repeats } of byKey.values()) {
    const id = mintConceptId(seed.subject, seed.key, seed.system)
    const found = links.get(id)
    const articleId = found?.articleId ?? ARTICLE_FOR_CONCEPT[id]
    const signal = conceptOccurrence(paper.source, seed)
    const paperMarks = paper.seeds.reduce((sum, one) => sum + one.marks, 0)
    const weight = blueprintWeight(seed, paperMarks, repeats.length)

    const { block, branch, blocker } = resolveConcept(id, moduleRef, seed.modulePath, signal, weight, () =>
      conceptBlock(paper.source, seed, repeats, {
        paperMarks,
        articleId,
        relatedArticleIds: reading.get(articleId ?? '') ?? [],
        links: found && {
          ...found,
          articleId,
          claimIds: found.claimIds.filter((claimId) => !withoutSpan.has(claimId)),
        },
      }))

    if (branch === 'full') { fresh += 1; fullBlocks.push(block) }
    else if (branch === 'live-update') { liveUpdates += 1; fullBlocks.push(block) }
    else { pendingCollisions += 1; pendingBlocks.push(block); if (blocker) pendingBlockers.push(blocker) }
  }

  const repeated = [...byKey.values()].filter((entry) => entry.repeats.length).length
  const header = `Concepts for ${module}, from every paper read so far.

${papers.map((paper) => `  ${paper.source.file} — ${paper.source.tier.replace(/_/g, ' ')} ${paper.source.sittingYear}, ${paper.seeds.length} questions`).join('\n')}

${byKey.size} concepts from ${papers.reduce((sum, paper) => sum + paper.seeds.length, 0)} questions.
${repeated} of them were asked on more than one paper, and carry an exam_signal
line per sitting. ${fresh} minted here for the first time, ${liveUpdates} are
sparse updates to a concept already live (possibly authored at another
university — concept IDs carry no university, see seeds/types.ts), and
${pendingCollisions} collide with a concept somebody else has authored but not
yet imported — those went to pending-live/, outside every import folder, until
that batch lands.

${GENERATED_BY} — edit the seeds in scripts/asu/seeds/.`

  mkdirSync(`${OUT}/concept`, { recursive: true })
  const file = `${OUT}/concept/${fileSlug(module)}-concepts.md`
  writeFileSync(file, batchFile(header, fullBlocks))

  const pendingFile = writePendingLive(module, 'concepts', pendingBlocks, pendingBlockers)

  return { file, pendingFile, count: byKey.size, repeated, fresh, liveUpdates, pendingCollisions }
}

/** Written questions, one batch per paper: an occurrence belongs to its sitting. Unchanged from Kasr's `written` except `mintConceptId`'s dropped module argument. */
function written(paper: Paper) {
  const module = moduleOf(paper.source)
  const links = loadLinks(module.id)
  const byNumber = new Map<string, Seed[]>()
  for (const seed of paper.seeds) {
    const key = `${seed.section}-${seed.q}`
    byNumber.set(key, [...(byNumber.get(key) ?? []), seed])
  }

  const media = new Map<string, string[]>()
  for (const request of (paper as { mediaRequests?: MediaRequest[] }).mediaRequests ?? []) {
    const block = [
      `### ${request.heading}`,
      `Brief: ${request.brief}`,
      `Purpose: ${request.purpose}`,
      `Priority: ${request.priority}`,
      `Status: ${request.status}`,
      ...(request.kind ? [`Kind: ${request.kind}`] : []),
      ...(request.sourceDirection ? [`Source direction: ${request.sourceDirection}`] : []),
      ...(request.rights ? [`Rights: ${request.rights}`] : []),
    ].join('\n')
    media.set(request.forScheme, [...(media.get(request.forScheme) ?? []), block])
  }

  const skipped: string[] = []
  for (const [key, seeds] of [...byNumber.entries()]) {
    const scheme = paper.schemes[partsKey(seeds[0])]
    if (scheme?.format === 'mcq_single_best') {
      skipped.push(`${partsKey(seeds[0])} (${scheme.prompt.slice(0, 48)}…)`)
      byNumber.delete(key)
    }
  }
  if (skipped.length) {
    console.error(`  ${skipped.length} single-best-answer question(s) left out of ${slug(paper)} — they belong in the MCQ route:`)
    for (const one of skipped) console.error(`    ${one}`)
  }

  const blocks = [...byNumber.values()].map((seeds) =>
    writtenBlock(
      paper,
      seeds,
      (conceptId) => links.get(conceptId)?.articleId ?? ARTICLE_FOR_CONCEPT[conceptId],
      (schemeKey) => media.get(schemeKey) ?? [],
    ))
  const total = paper.seeds.reduce((sum, seed) => sum + seed.marks, 0)
  const bySection = paper.source.sections
    .map((section) => `${[...byNumber.keys()].filter((key) => key.startsWith(`${section}-`)).length} in ${section}`)
    .join(', ')

  const header = `${paper.source.file} as sittable written questions.

Ain Shams, module ${module.id}, ${paper.source.tier.replace(/_/g, ' ')} ${paper.source.sittingYear}.
Manifest ID ${paper.source.id}. ${byNumber.size} questions, ${total} marks: ${bySection}.

${paper.source.incomplete ? `NOT the whole paper: ${paper.source.incomplete}\n\n` : ''}Transcribed, not derived — \`derived_from\` is blank throughout.

Each question carries one part worth the paper's own total, with the elements the
examiner named as its expected points.

Status is Draft: these need a faculty reviewer to confirm the mark schemes before
students sit them.

Provenance is in \`source_citation\` and \`author_notes\`, which the student ledger
strips. A student is never told which paper a question came off.

${GENERATED_BY}.`

  mkdirSync(`${OUT}/written`, { recursive: true })
  const file = `${OUT}/written/${slug(paper)}-written.md`
  writeFileSync(file, batchFile(header, blocks))
  return { file, count: byNumber.size, marks: total }
}

/** Refuse to build if one canonical key has been given two subjects. Unchanged from Kasr's `assertOneSubjectPerKey`, `AsuSubject` in place of `KasrSubject`. */
async function assertOneSubjectPerKey(module: string, papers: Paper[]) {
  const entries: { key: string; subject: AsuSubject; where: string }[] = []
  const byPath = new Map<string, AsuSubject>()
  for (const paper of papers) {
    for (const seed of paper.seeds) {
      entries.push({ key: seed.key, subject: seed.subject, where: paper.source.file })
      const expected = subjectForPath(seed.modulePath)
      if (expected) byPath.set(seed.key, expected)
    }
  }
  for (const { leaf, name } of await mcqLeaves(module)) {
    for (const concept of leaf.concepts) {
      entries.push({ key: concept.key, subject: concept.subject, where: `seeds/mcq/${name}` })
      const expected = subjectForPath(concept.modulePath)
      if (expected) byPath.set(concept.key, expected)
    }
  }

  const offRule = entries
    .map((entry) => ({ entry, expected: byPath.get(entry.key) }))
    .filter(({ entry, expected }) => expected && expected !== entry.subject)
  if (offRule.length) {
    throw new Error(
      `${offRule.length} concept(s) take a subject the curriculum path does not give:\n`
      + offRule.map(({ entry, expected }) =>
        `  ${entry.key}: ${entry.subject}, expected ${expected}  (${entry.where})`).join('\n')
      + '\nSee subjectForPath in seeds/types.ts. Change the subject, or the rule, not one file.')
  }

  const clashes = subjectCollisions(entries)
  if (!clashes.length) return
  throw new Error(
    `${clashes.length} canonical key(s) given more than one subject, which mints a rival ID for one idea:\n`
    + clashes.map((clash) =>
      `  ${clash.key}: ${clash.subjects.join(' vs ')}  (${clash.where.join(', ')})`).join('\n')
    + '\nAgree one subject per key and rerun. The key decides the concept; the subject only picks its prefix.')
}

/** Refuse two papers that would write to the same batch file. Unchanged from Kasr's `assertNoSlugCollision`. */
function assertNoSlugCollision(papers: Paper[]) {
  const byFile = new Map<string, string[]>()
  for (const paper of papers) {
    const file = slug(paper)
    byFile.set(file, [...(byFile.get(file) ?? []), paper.source.file])
  }
  const clashes = [...byFile.entries()].filter(([, papers]) => papers.length > 1)
  if (!clashes.length) return
  throw new Error(
    `${clashes.length} batch filename(s) claimed by more than one paper — one would overwrite the other:\n`
    + clashes.map(([file, papers]) => `  ${file}: ${papers.join(' and ')}`).join('\n'))
}

/**
 * The question-book leaves belonging to one module.
 *
 * Directory overridable so the fixture proof's throwaway leaf can live under
 * `scripts/asu/fixtures/` instead of the real `seeds/mcq/`.
 */
async function mcqLeaves(module: string): Promise<{ leaf: McqLeafSeed, name: string }[]> {
  const dir = process.env.ASU_TOOLCHAIN_MCQ_DIR ?? 'scripts/asu/seeds/mcq'
  if (!existsSync(dir)) return []
  const found: { leaf: McqLeafSeed, name: string }[] = []
  for (const name of readdirSync(dir).filter((one) => one.endsWith('.ts')).sort()) {
    // An absolute file:// URL rather than a relative specifier, because `dir`
    // may not be `./seeds/mcq` any more (see the fixture override above) and
    // a relative import specifier resolves against *this file's* location,
    // not against `dir`.
    const leaf = (await import(pathToFileURL(join(process.cwd(), dir, name)).href)).LEAF as McqLeafSeed
    if (leaf.modulePath.startsWith(`${module} > `) || leaf.modulePath === module) {
      found.push({ leaf, name })
    }
  }
  return found
}

/**
 * The multiple-choice bank, one batch per subject-tree leaf.
 *
 * The bank path is module-namespaced from day one
 * (`scripts/asu/extract/<slug>/mcq-bank.json`) — LANE-BRIEF.md is explicit
 * that no per-run extraction result here is ever an unprefixed file, unlike
 * Kasr's `scripts/kasr/extract/mcq-bank.json`, which is 101's own bare path
 * kept only because 101 got there first.
 *
 * Concepts here go through the same three-way switch as `concepts()` above,
 * for the same reason: an MCQ-derived concept mints through the same
 * `mintConceptId`, so it can just as easily already be live or pending
 * elsewhere.
 */
async function mcq(module: ModuleRef) {
  const leaves = (await mcqLeaves(module.id)).map((one) => one.leaf)
  if (!leaves.length) return null

  const extractStage = process.env.ASU_TOOLCHAIN_EXTRACT_DIR ?? 'scripts/asu/extract'
  const bankPath = `${extractStage}/${fileSlug(module.id)}/mcq-bank.json`
  if (!existsSync(bankPath)) return null
  const bank = new Map<string, BankRow>(
    JSON.parse(readFileSync(bankPath, 'utf8')).questions.map((row: BankRow) => [row.key, row]))

  const conceptBlocks: string[] = []
  const pendingConceptBlocks: string[] = []
  const pendingBlockers: string[] = []
  const questionBlocks: string[] = []
  let excluded = 0
  let unanswered = 0
  let fresh = 0, liveUpdates = 0, pendingCollisions = 0

  const byKey = new Map<string, {
    concept: McqLeafSeed['concepts'][number]
    signals: Set<string>
    articleIds: Set<string>
    stems: { stem: string; timesAsked: number }[]
  }>()

  for (const leaf of leaves) {
    const live = leaf.questions.filter((one) => !one.exclude)
    excluded += leaf.questions.length - live.length

    for (const concept of leaf.concepts) {
      const signals = live
        .filter((one) => one.conceptKey === concept.key)
        .flatMap((one) => bank.get(one.key)?.occurrences ?? [])
        .map((where) => `${where.sourceId} | question_book | | p${where.page} | ${module.id}`)
      const stems = leaf.questions
        .filter((one) => one.conceptKey === concept.key)
        .map((one) => bank.get(one.key))
        .filter((row): row is NonNullable<typeof row> => Boolean(row?.stem))
        .map((row) => ({ stem: row.stem, timesAsked: row.timesAsked ?? 1 }))

      const found = byKey.get(concept.key)
      if (found) {
        for (const signal of signals) found.signals.add(signal)
        found.articleIds.add(leaf.articleId)
        found.stems.push(...stems)
      } else {
        byKey.set(concept.key, {
          concept, signals: new Set(signals), articleIds: new Set([leaf.articleId]), stems,
        })
      }
    }

    for (const authored of live) {
      const row = bank.get(authored.key)
      if (!row) throw new Error(`${leaf.leaf}: ${authored.key} is not in the bank`)
      if (!authored.answerOverride && !row.answer) { unanswered += 1; continue }
      questionBlocks.push(mcqBlock(row, authored, leaf, module))
    }
  }

  const untested = [...byKey.entries()].filter(([, entry]) => !entry.stems.length)
  for (const [key] of untested) byKey.delete(key)

  const reading = furtherReading()
  for (const { concept, signals, articleIds, stems } of byKey.values()) {
    const best = [...stems].sort((a, b) => b.timesAsked - a.timesAsked)[0]
    const asked = best ? `[asked ${best.timesAsked}x across the question books] ${best.stem}` : ''
    const id = mintConceptId(concept.subject, concept.key)
    const weight = mcqConceptWeight(signals.size)
    const { block, branch, blocker } = resolveConcept(
      id, module, concept.modulePath, [...signals][0] ?? `question_book | | | ${module.id}`, weight,
      () => mcqConceptBlock(module, concept, [...signals], [...articleIds].join(' | '), asked,
        [...new Set([...articleIds].flatMap((articleId) => reading.get(articleId) ?? []))]))
    if (branch === 'full') { fresh += 1; conceptBlocks.push(block) }
    else if (branch === 'live-update') { liveUpdates += 1; conceptBlocks.push(block) }
    else { pendingCollisions += 1; pendingConceptBlocks.push(block); if (blocker) pendingBlockers.push(blocker) }
  }

  const header = `Multiple-choice questions for ${module.id}, from the departmental question books.

${leaves.map((leaf) => `  ${leaf.leaf} — ${leaf.questions.length} questions, ${leaf.concepts.length} concepts`).join('\n')}

Extracted from ${bank.size} distinct questions and deduplicated. Every item carries
how many times it was asked, which is blueprint evidence no single sat paper can give.

Stems, options and answers are the books'. Every per-option explanation is authored.

${excluded} question${excluded === 1 ? ' was' : 's were'} excluded and ${unanswered} held back for having no
establishable answer. Both stay in the seeds with their reasons.

${fresh} concept(s) minted fresh, ${liveUpdates} are sparse updates to a concept already
live (possibly at another university), ${pendingCollisions} collide with an
unimported batch and went to pending-live/ instead.

Status is Draft throughout: these need a faculty reviewer before students sit them.

${GENERATED_BY}.`

  mkdirSync(`${OUT}/concept`, { recursive: true })
  mkdirSync(`${OUT}/question`, { recursive: true })
  const conceptFile = `${OUT}/concept/${fileSlug(module.id)}-mcq-concepts.md`
  const questionFile = `${OUT}/question/${fileSlug(module.id)}-mcq.md`
  writeFileSync(conceptFile, batchFile(header, conceptBlocks))
  writeFileSync(questionFile, batchFile(header, questionBlocks))

  const pendingFile = writePendingLive(module.id, 'mcq-concepts', pendingConceptBlocks, pendingBlockers)

  for (const [key] of untested) {
    console.error(`  skipped concept "${key}" — declared by a leaf but no question tests it`)
  }
  return {
    conceptFile, questionFile, pendingFile,
    concepts: conceptBlocks.length, questions: questionBlocks.length, excluded, unanswered,
  }
}

/** Delete this module's written batches that this run did not write. Unchanged from Kasr's `removeOrphans`. */
function removeOrphans(module: string, written: Set<string>, sweep: boolean) {
  const dir = `${OUT}/written`
  if (!existsSync(dir)) return []
  const prefix = `${fileSlug(module)}-`
  const orphans = readdirSync(dir)
    .filter((name) => name.startsWith(prefix) && name.endsWith('-written.md'))
    .filter((name) => !written.has(`${dir}/${name}`))
    .filter((name) => {
      const generated = readFileSync(`${dir}/${name}`, 'utf8').includes(GENERATED_BY)
      if (!generated) {
        console.error(`left alone (not generated by this script): written/${name}`)
      }
      return generated
    })
  if (!sweep) {
    for (const name of orphans) {
      console.error(`orphaned batch, left in place: written/${name}`)
    }
    if (orphans.length) {
      console.error(`  ${orphans.length} orphan(s) — rerun with --sweep to delete them`)
    }
    return []
  }
  for (const name of orphans) rmSync(`${dir}/${name}`)
  return orphans
}

// Grouped by module, filtered *before* loading — see `Registration` in `seeds/registry.ts`.
const only = process.argv[2]
if (!only) {
  throw new Error('name the module to build — one of '
    + `${[...new Set(REGISTRATIONS.map((entry) => entry.module))].map((id) => `"${id}"`).join(', ') || '(no papers registered yet)'}. `
    + 'There is no build-everything mode.')
}
if (!MODULES[only]) {
  throw new Error(`"${only}" is not a module in the catalogue — one of ${Object.keys(MODULES).join(', ')}`)
}
const wanted = REGISTRATIONS.filter((entry) => entry.module === only)
if (!wanted.length) throw new Error(`no registered paper belongs to "${only}"`)

const papers: Paper[] = []
for (const entry of wanted) {
  const paper = entry.load()
  const id = moduleOf(paper.source).id
  if (id !== entry.module) {
    throw new Error(`${paper.source.file}: registered under "${entry.module}" but carries "${id}"`)
  }
  papers.push(paper)
}

for (const paper of papers) {
  for (const seed of paper.seeds) {
    if (!paper.schemes[partsKey(seed)]) {
      throw new Error(`${paper.source.file}: ${partsKey(seed)} has no mark scheme`)
    }
  }
}

assertNoSlugCollision(papers)
await assertOneSubjectPerKey(only, papers)

const c = concepts(only, papers)
console.log(`${c.count} concepts (${c.fresh} fresh, ${c.liveUpdates} live updates, ${c.pendingCollisions} pending-collision) -> ${c.file}`)
if (c.pendingFile) console.log(`  ${c.pendingCollisions} pending-collision update(s) -> ${c.pendingFile}`)
const writtenFiles = new Set<string>()
for (const paper of papers) {
  const w = written(paper)
  writtenFiles.add(w.file)
  console.log(`${w.count} written questions, ${w.marks} marks -> ${w.file}`)
}
for (const orphan of removeOrphans(only, writtenFiles, process.argv.includes('--sweep'))) {
  console.error(`removed orphaned batch (no paper produces it any more): written/${orphan}`)
}

const m = await mcq(MODULES[only])
if (m) {
  console.log(`${m.concepts} MCQ concepts -> ${m.conceptFile}`)
  if (m.pendingFile) console.log(`  pending-collision MCQ concepts -> ${m.pendingFile}`)
  console.log(`${m.questions} MCQ questions (${m.excluded} excluded, ${m.unanswered} unanswered) -> ${m.questionFile}`)
}
