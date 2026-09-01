#!/usr/bin/env node
/**
 * Build the module library trees a student's Library reads, from content that
 * already exists — no one has to hand-author a branch before an article can be
 * found by browsing.
 *
 * `nishany-library-trees-v1` (`src/data/libraryTrees.ts`) is 100% hand-authored
 * today: a `module:<id>` tree only has structure if an editor built one in
 * Library Setup. An article can be published, correctly tagged with
 * `articleData.moduleIds` and `articleData.moduleSubjectPaths`, and still be
 * invisible to a student browsing "By module" — the module either has no tree
 * at all, or has one that was built before the article existed. This script
 * closes that gap from the data that is already there: every published,
 * publishable article's module assignment, plus the academic catalogue that
 * says which module belongs to which university and year.
 *
 * Design rules, because this writes into a document reviewers hand-edit:
 *
 *   - IDEMPOTENT: run it twice against the same input and the second run adds
 *     nothing. A node is matched by its title (case-insensitively) before one
 *     is ever created, and filing an article that is already filed is a no-op
 *     (`fileArticle` in `libraryTrees.ts` already guarantees that half).
 *   - NON-DESTRUCTIVE: an existing node is never renamed, moved, or stripped
 *     of children or articles it already carries. The merge only ever adds a
 *     sibling, a child, or an article id — never rewrites what a person wrote.
 *   - COLLISION-SAFE: every id already in the document (across every scope,
 *     not just the one being touched) is loaded before anything is generated,
 *     and a fresh id is re-rolled if it somehow lands on one already taken.
 *   - UNIVERSITY/YEAR-AWARE: a module id resolves against the academic
 *     catalogue to the university and year it belongs to. An article that
 *     names a module but whose own recorded `universityIds`/`yearIds` scope
 *     excludes that university or year is NOT filed — that combination means
 *     the tagging disagrees with itself, and guessing which one is right would
 *     plant an article under the wrong faculty's tree. It is reported instead,
 *     for a person to resolve.
 *   - AUDITABLE: every run produces a report — modules touched, nodes created,
 *     articles newly filed, articles skipped and why, scope conflicts found —
 *     whether or not anything is written to disk.
 *   - NO DATABASE: this never opens a connection and never calls a write API.
 *     It reads local JSON and, on `--apply`, writes local JSON. Getting the
 *     result live is a separate, deliberate step — see "Applying the result"
 *     below.
 *
 * ---------------------------------------------------------------------------
 * RUNNING IT
 * ---------------------------------------------------------------------------
 *
 * 1) Get a current snapshot of production state to read from (read-only; no
 *    database connection, one HTTP GET against the already-existing endpoint):
 *
 *      MEDICAL_API_BASE=https://<host> MEDICAL_API_TOKEN=<super_admin, aal2> \
 *        npm run medical:snapshot-live
 *
 *    This writes `server/data/medical-library-v1.json`, which is this script's
 *    default input. (Skip this step against a local/demo state by pointing
 *    `--state` at a different snapshot file, or supply `--ledger`/`--trees`/
 *    `--catalogue` directly — see below.)
 *
 * 2) See what the backfill would do, without writing anything:
 *
 *      node --experimental-strip-types scripts/backfill-library-trees.mjs --dry-run
 *
 *    (`--dry-run` is also the default when neither `--dry-run` nor `--apply`
 *    is passed, so plain `node --experimental-strip-types
 *    scripts/backfill-library-trees.mjs` is equally safe.)
 *
 * 3) When the report looks right, write the merged document as an artifact:
 *
 *      node --experimental-strip-types scripts/backfill-library-trees.mjs --apply
 *
 *    This writes `docs/import-ready/library-trees/library-trees-backfill-
 *    <timestamp>.json` — the same report as `--dry-run`, plus the full merged
 *    `{ trees: { … } }` document under `mergedDocument`. Nothing is sent
 *    anywhere by this script.
 *
 * ---------------------------------------------------------------------------
 * APPLYING THE RESULT
 * ---------------------------------------------------------------------------
 * `mergedDocument` in the artifact is a complete, valid `LibraryTreesDocument`
 * — the same shape the `nishany-library-trees-v1` state key already holds.
 * `server/src/stateMerge.js`'s adapter for that key treats every scope
 * (`module:<id>` / `year:<id>`) as its own mergeable item, so writing this
 * document back through the normal editor-tab state route
 * (`PUT /api/state/nishany-library-trees-v1`, `library` tab, editor+) merges
 * per scope — an untouched scope in this artifact does not erase whatever the
 * live document holds for it. That write is a separate, authorised step for
 * Opus/Omar to take (through the admin UI, or a dedicated apply step); this
 * script's job ends at producing the artifact to review and hand off.
 *
 * ---------------------------------------------------------------------------
 * OPTIONS
 * ---------------------------------------------------------------------------
 *   --state <path>       Envelope snapshot to read from (the shape
 *                         `medical:snapshot-live` writes: `{ states: { … } }`,
 *                         or a bare `{ [stateKey]: value }` map).
 *                         Default: server/data/medical-library-v1.json
 *   --ledger <path>      Override: a raw JSON array of content-ledger items
 *                         (in place of the ledger inside --state).
 *   --trees <path>       Override: a raw JSON library-trees document
 *                         (`{ trees: { … } }`) (in place of --state).
 *   --catalogue <path>   Override: a raw JSON array of universities (in place
 *                         of the catalogue inside --state).
 *   --dry-run            Report only. Default when --apply is not passed.
 *   --apply              Write the artifact under docs/import-ready/.
 *   --out <path>         Artifact path (only with --apply). Default is
 *                         timestamped, under docs/import-ready/library-trees/.
 *   --print              Also print the full merged document to stdout.
 *   --help                This text.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  LIBRARY_TREES_STATE_KEY,
  emptyLibraryTrees,
  treeScope,
  fileArticle,
  allArticleIds,
} from '../src/data/libraryTrees.ts'
import { CONTENT_LEDGER_STORAGE_KEY, isStudentPublishable } from '../src/data/contentControl.ts'
import { UNIVERSITY_CATALOGUE_STORAGE_KEY, defaultModuleId } from '../src/data/universities.ts'
import { splitModuleSubjectPath } from '../src/data/moduleSubjectPath.ts'

const DEFAULT_STATE_PATH = 'server/data/medical-library-v1.json'
const OUT_DIR = 'docs/import-ready/library-trees'
const GENERAL_TITLE = 'General'

/* ---- Pure logic (imported and exercised directly by the sibling test) --- */

/** Every module a university's catalogue teaches, keyed by its effective id. */
export function moduleCatalogueIndex(catalogue) {
  const index = new Map()
  for (const university of catalogue ?? []) {
    for (const year of university?.years ?? []) {
      ;(year.courses ?? []).forEach((course, position) => {
        const moduleId = course.moduleId?.trim() || defaultModuleId(course.name, position + 1)
        // First one wins. Two courses sharing an id inside one catalogue is a
        // data problem for Academic Setup to catch, not this script's to
        // silently resolve one way or the other.
        if (!index.has(moduleId)) {
          index.set(moduleId, {
            moduleId,
            universityId: university.id,
            universityShort: university.short,
            yearId: year.id,
            yearLabel: year.year,
            courseId: course.id,
            courseName: course.name,
          })
        }
      })
    }
  }
  return index
}

/** Every node id at any depth of a tree list. */
export function collectNodeIds(nodes) {
  const ids = new Set()
  const walk = (list) => {
    for (const node of list ?? []) {
      ids.add(node.id)
      if (node.children) walk(node.children)
    }
  }
  walk(nodes)
  return ids
}

function collectAllNodeIds(document) {
  const ids = new Set()
  for (const nodes of Object.values(document?.trees ?? {})) {
    for (const id of collectNodeIds(nodes)) ids.add(id)
  }
  return ids
}

/** A generator of node ids that cannot collide with anything already used. */
export function createIdAllocator(seedIds) {
  const used = new Set(seedIds ?? [])
  let counter = 0
  return function allocate() {
    let id
    do {
      counter += 1
      id = `ltn-bf-${Date.now().toString(36)}${counter.toString(36)}-${Math.random().toString(36).slice(2, 8)}`
    } while (used.has(id))
    used.add(id)
    return id
  }
}

function findByTitle(nodes, title) {
  const wanted = title.trim().toLowerCase()
  return nodes.find((node) => node.title.trim().toLowerCase() === wanted) ?? null
}

function buildFreshChain(titles, allocate) {
  let node = null
  let leafId = null
  for (let i = titles.length - 1; i >= 0; i -= 1) {
    const id = allocate()
    if (leafId === null) leafId = id
    node = { id, title: titles[i], ...(node ? { children: [node] } : {}) }
  }
  return { node, leafId }
}

/**
 * Ensure a titled chain of nodes exists under `nodes`, creating only the part
 * that is missing. An existing node along the way is matched by title and
 * left exactly as it was — only a missing sibling or a missing tail of
 * children is ever added. Returns the (possibly unchanged) nodes array and
 * the id of the chain's last node.
 */
export function ensureChain(nodes, titles, allocate) {
  if (!titles.length) return { nodes, leafId: null }
  const [head, ...rest] = titles
  const existing = findByTitle(nodes, head)
  if (!existing) {
    const { node, leafId } = buildFreshChain(titles, allocate)
    return { nodes: [...nodes, node], leafId }
  }
  if (!rest.length) return { nodes, leafId: existing.id }
  const { nodes: nextChildren, leafId } = ensureChain(existing.children ?? [], rest, allocate)
  const nextNodes = nodes.map((node) => (node === existing ? { ...node, children: nextChildren } : node))
  return { nodes: nextNodes, leafId }
}

/**
 * Which of an article's modules a written `moduleSubjectPaths` line belongs
 * to, and the path beneath the module name.
 *
 * A path is usually written with the module at its head — "101 ISK > Anatomy
 * > Upper Limb" — so the head is matched against each candidate module's id
 * and catalogue name and stripped when it matches. When it matches none of
 * them the whole line is kept as the chain and filed under every module the
 * article names: on an article with exactly one module this is unambiguous;
 * on an article with several it means the line did not say which one it was
 * for, and the safe reading is "applies everywhere it is tagged", not
 * "applies nowhere".
 */
export function ownersOfPath(path, moduleIds, moduleIndex) {
  const segments = splitModuleSubjectPath(path)
  if (!segments.length) return { owners: [], rest: [] }
  const head = segments[0].trim().toLowerCase()
  const matched = moduleIds.filter((id) => {
    if (id.trim().toLowerCase() === head) return true
    const name = moduleIndex.get(id)?.courseName
    return name ? name.trim().toLowerCase() === head : false
  })
  if (matched.length) return { owners: matched, rest: segments.slice(1) }
  return { owners: moduleIds, rest: segments }
}

function chainsForArticleModule(item, moduleId, moduleIndex, generalTitle) {
  const moduleIds = [...new Set((item.articleData?.moduleIds ?? []).map((id) => id?.trim()).filter(Boolean))]
  const rawPaths = item.articleData?.moduleSubjectPaths ?? []
  const chains = []
  for (const raw of rawPaths) {
    if (!raw?.trim()) continue
    const { owners, rest } = ownersOfPath(raw, moduleIds, moduleIndex)
    if (owners.includes(moduleId)) chains.push(rest.length ? rest : [generalTitle])
  }
  if (!chains.length) chains.push([generalTitle])
  // De-duplicate identical chains for this article+module so an article with
  // two paths that both resolve to the same branch is not filed twice for
  // nothing — `fileArticle` is a no-op either way, this just keeps the walk
  // from repeating itself.
  const seen = new Set()
  return chains.filter((chain) => {
    const key = chain.join('␟')
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/**
 * Why an article's module tag and its own recorded scope disagree, or null
 * when they do not (including when the module cannot be checked at all,
 * because it is not in the catalogue this ran against).
 */
export function scopeConflict(item, catalogueEntry) {
  if (!catalogueEntry) return null
  const universityIds = item.articleData?.universityIds ?? []
  const yearIds = item.articleData?.yearIds ?? []
  const universityMismatch = universityIds.length > 0 && !universityIds.includes(catalogueEntry.universityId)
  const yearMismatch = yearIds.length > 0 && !yearIds.includes(catalogueEntry.yearId)
  if (!universityMismatch && !yearMismatch) return null
  const parts = []
  if (universityMismatch) parts.push(`article is scoped to universit${universityIds.length === 1 ? 'y' : 'ies'} [${universityIds.join(', ')}] but module "${catalogueEntry.moduleId}" belongs to "${catalogueEntry.universityId}"`)
  if (yearMismatch) parts.push(`article is scoped to year(s) [${yearIds.join(', ')}] but module "${catalogueEntry.moduleId}" belongs to "${catalogueEntry.yearId}"`)
  return parts.join('; ')
}

/**
 * The merge itself: current trees + the content ledger + the academic
 * catalogue in, a new `LibraryTreesDocument` and a full audit report out.
 * Pure — no filesystem, no network — so the sibling test exercises it
 * directly.
 */
export function buildBackfill({ ledger, trees, catalogue }, options = {}) {
  const generalTitle = options.generalTitle ?? GENERAL_TITLE
  const moduleIndex = moduleCatalogueIndex(catalogue ?? [])
  const inputDoc = trees && typeof trees === 'object' && trees.trees ? trees : emptyLibraryTrees()
  const doc = { trees: { ...inputDoc.trees } }
  const allocate = createIdAllocator(collectAllNodeIds(inputDoc))

  const publishedArticles = (ledger ?? []).filter((item) => item?.kind === 'article' && isStudentPublishable(item))

  const skippedArticles = []
  const scopeConflicts = []
  const before = new Map() // moduleId -> { existed, nodeIds: Set, articleIds: Set }

  for (const item of publishedArticles) {
    const moduleIds = [...new Set((item.articleData?.moduleIds ?? []).map((id) => id?.trim()).filter(Boolean))]
    if (!moduleIds.length) {
      skippedArticles.push({ id: item.id, title: item.title, reason: 'no module assignment (articleData.moduleIds is empty)' })
      continue
    }

    for (const moduleId of moduleIds) {
      const scope = treeScope('module', moduleId)
      if (!before.has(moduleId)) {
        const existed = Object.prototype.hasOwnProperty.call(doc.trees, scope)
        const originalNodes = existed ? doc.trees[scope] ?? [] : []
        before.set(moduleId, {
          existed,
          nodeIds: collectNodeIds(originalNodes),
          articleIds: new Set(allArticleIds(originalNodes)),
        })
      }

      const catalogueEntry = moduleIndex.get(moduleId) ?? null
      const conflict = scopeConflict(item, catalogueEntry)
      if (conflict) {
        scopeConflicts.push({ articleId: item.id, articleTitle: item.title, moduleId, reason: conflict })
        continue
      }

      let tree = doc.trees[scope] ?? []
      for (const chain of chainsForArticleModule(item, moduleId, moduleIndex, generalTitle)) {
        const { nodes: nextTree, leafId } = ensureChain(tree, chain, allocate)
        tree = nextTree
        if (leafId) tree = fileArticle(tree, leafId, item.id)
      }
      doc.trees[scope] = tree
    }
  }

  const modules = [...before.keys()].sort().map((moduleId) => {
    const scope = treeScope('module', moduleId)
    const snapshot = before.get(moduleId)
    const finalNodes = doc.trees[scope] ?? []
    const afterNodeIds = collectNodeIds(finalNodes)
    const afterArticleIds = new Set(allArticleIds(finalNodes))
    const newNodeIds = [...afterNodeIds].filter((id) => !snapshot.nodeIds.has(id))
    const newArticleIds = [...afterArticleIds].filter((id) => !snapshot.articleIds.has(id))
    const catalogueEntry = moduleIndex.get(moduleId) ?? null
    return {
      moduleId,
      catalogue: catalogueEntry
        ? { universityId: catalogueEntry.universityId, universityShort: catalogueEntry.universityShort, yearId: catalogueEntry.yearId, yearLabel: catalogueEntry.yearLabel, courseName: catalogueEntry.courseName }
        : null,
      existedBefore: snapshot.existed,
      nodesBefore: snapshot.nodeIds.size,
      nodesAfter: afterNodeIds.size,
      nodesCreated: newNodeIds.length,
      articlesBefore: snapshot.articleIds.size,
      articlesAfter: afterArticleIds.size,
      articlesFiledNew: newArticleIds.length,
      warnings: catalogueEntry ? [] : ['Module id not found in the academic catalogue — university/year scope could not be verified.'],
    }
  })

  const report = {
    generatedAt: new Date().toISOString(),
    totals: {
      publishedArticlesConsidered: publishedArticles.length,
      articlesSkippedNoModule: skippedArticles.length,
      scopeConflicts: scopeConflicts.length,
      modulesTouched: modules.length,
      nodesCreated: modules.reduce((sum, m) => sum + m.nodesCreated, 0),
      articleFilingsAdded: modules.reduce((sum, m) => sum + m.articlesFiledNew, 0),
    },
    modules,
    skippedArticles,
    scopeConflicts,
  }

  return { document: doc, report }
}

/* ---- CLI ------------------------------------------------------------------ */

function parseArgs(argv) {
  const args = { apply: false, dryRun: false, print: false, help: false }
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === '--apply') args.apply = true
    else if (arg === '--dry-run') args.dryRun = true
    else if (arg === '--print') args.print = true
    else if (arg === '--help' || arg === '-h') args.help = true
    else if (arg === '--state') args.state = argv[(i += 1)]
    else if (arg === '--ledger') args.ledger = argv[(i += 1)]
    else if (arg === '--trees') args.trees = argv[(i += 1)]
    else if (arg === '--catalogue') args.catalogue = argv[(i += 1)]
    else if (arg === '--out') args.out = argv[(i += 1)]
    else throw new Error(`Unknown argument: ${arg} (see --help)`)
  }
  if (args.apply && args.dryRun) throw new Error('Pass either --dry-run or --apply, not both.')
  if (!args.apply) args.dryRun = true
  return args
}

function printHelp() {
  console.log(`Usage: node --experimental-strip-types scripts/backfill-library-trees.mjs [options]

  --state <path>       Envelope snapshot to read from (default: ${DEFAULT_STATE_PATH})
  --ledger <path>      Override: raw JSON array of content-ledger items
  --trees <path>       Override: raw JSON library-trees document ({ trees: { … } })
  --catalogue <path>   Override: raw JSON array of universities
  --dry-run            Report only (default)
  --apply              Write the artifact under ${OUT_DIR}/
  --out <path>          Artifact path (only with --apply)
  --print               Also print the full merged document to stdout
  --help                This text

See the file header for the full walkthrough, including how to pull a snapshot
with "npm run medical:snapshot-live" and how the result is meant to be applied.`)
}

async function loadJsonFile(path) {
  let raw
  try {
    raw = await readFile(path, 'utf8')
  } catch (reason) {
    throw new Error(`Could not read ${path}: ${reason.message}`)
  }
  try {
    return JSON.parse(raw)
  } catch (reason) {
    throw new Error(`${path} is not valid JSON: ${reason.message}`)
  }
}

async function loadInputs(args) {
  const statePath = args.state ?? DEFAULT_STATE_PATH
  const needsState = !args.ledger || !args.trees || !args.catalogue
  let states = {}
  if (needsState) {
    if (!existsSync(statePath)) {
      throw new Error(
        `No state snapshot at ${statePath}. Run "MEDICAL_API_BASE=... MEDICAL_API_TOKEN=... npm run medical:snapshot-live" first, `
        + 'or pass --ledger, --trees and --catalogue explicitly.',
      )
    }
    const parsed = await loadJsonFile(statePath)
    states = parsed?.states && typeof parsed.states === 'object' ? parsed.states : parsed
  }

  const ledger = args.ledger ? await loadJsonFile(args.ledger) : states[CONTENT_LEDGER_STORAGE_KEY]
  const trees = args.trees ? await loadJsonFile(args.trees) : states[LIBRARY_TREES_STATE_KEY]
  const catalogue = args.catalogue ? await loadJsonFile(args.catalogue) : states[UNIVERSITY_CATALOGUE_STORAGE_KEY]

  if (!Array.isArray(ledger)) {
    throw new Error(`Content ledger missing or not an array (expected state key "${CONTENT_LEDGER_STORAGE_KEY}" in ${statePath}, or pass --ledger <file>).`)
  }
  if (!Array.isArray(catalogue)) {
    throw new Error(`Academic catalogue missing or not an array (expected state key "${UNIVERSITY_CATALOGUE_STORAGE_KEY}" in ${statePath}, or pass --catalogue <file>).`)
  }

  return { ledger, trees: trees && typeof trees === 'object' ? trees : emptyLibraryTrees(), catalogue, statePath }
}

function defaultOutPath() {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  return join(OUT_DIR, `library-trees-backfill-${stamp}.json`)
}

function printReport(report, { dryRun, statePath }) {
  const { totals } = report
  console.log(`\n${dryRun ? 'DRY RUN — nothing written' : 'APPLY'} — source: ${statePath}`)
  console.log(`  published articles considered : ${totals.publishedArticlesConsidered}`)
  console.log(`  skipped, no module assignment : ${totals.articlesSkippedNoModule}`)
  console.log(`  scope conflicts (not filed)   : ${totals.scopeConflicts}`)
  console.log(`  modules touched               : ${totals.modulesTouched}`)
  console.log(`  new tree nodes                : ${totals.nodesCreated}`)
  console.log(`  new article filings           : ${totals.articleFilingsAdded}`)

  if (report.modules.length) {
    console.log('\nBy module:')
    for (const m of report.modules) {
      const where = m.catalogue ? `${m.catalogue.universityShort} · ${m.catalogue.yearLabel} · ${m.catalogue.courseName}` : '(not found in catalogue)'
      const state = m.existedBefore ? 'had a tree' : 'no tree yet'
      console.log(`  ${m.moduleId}  [${where}]  ${state}, +${m.nodesCreated} node(s), +${m.articlesFiledNew} article(s) (now ${m.articlesAfter})`)
      for (const warning of m.warnings) console.log(`    ! ${warning}`)
    }
  }

  if (report.scopeConflicts.length) {
    console.log('\nScope conflicts — NOT filed, needs a person to resolve:')
    for (const c of report.scopeConflicts) console.log(`  "${c.articleTitle}" (${c.articleId}) → ${c.moduleId}: ${c.reason}`)
  }

  if (report.skippedArticles.length) {
    console.log(`\n${report.skippedArticles.length} published article(s) skipped for having no module assignment (unaffected — they still read normally, just not through the module tree).`)
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) { printHelp(); return }

  const { ledger, trees, catalogue, statePath } = await loadInputs(args)
  const { document, report } = buildBackfill({ ledger, trees, catalogue })

  printReport(report, { dryRun: !args.apply, statePath })
  if (args.print) console.log(`\n${JSON.stringify(document, null, 2)}`)

  if (args.apply) {
    const outPath = args.out ?? defaultOutPath()
    await mkdir(dirname(outPath), { recursive: true })
    const artifact = {
      generatedAt: report.generatedAt,
      source: {
        statePath,
        ledgerOverride: args.ledger ?? null,
        treesOverride: args.trees ?? null,
        catalogueOverride: args.catalogue ?? null,
      },
      report,
      mergedDocument: document,
    }
    await writeFile(outPath, `${JSON.stringify(artifact, null, 2)}\n`)
    console.log(`\nWrote ${outPath}`)
    console.log(`Nothing was sent anywhere. "mergedDocument" is a complete "${LIBRARY_TREES_STATE_KEY}" document — see the file header for how it is meant to be applied.`)
  } else {
    console.log('\nDry run only. Re-run with --apply to write this as an artifact under docs/import-ready/library-trees/.')
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message)
    process.exit(1)
  })
}
