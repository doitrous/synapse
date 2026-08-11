/**
 * Read-only. Exports one "work packet" per article so narrative prose can be
 * written for it, and prints a census of what live MariaDB actually holds.
 *
 * This script never writes: it issues SELECTs only. Run it before generating any
 * prose so the live census can be checked against expectations, and run it again
 * whenever the library changes.
 *
 *   node server/scripts/extract-article-prose-packets.mjs --out server/scripts/prose-packets
 *   node server/scripts/extract-article-prose-packets.mjs --census-only
 *   node server/scripts/extract-article-prose-packets.mjs --ids ART-CVS-HEART-ORIENTATION,ART-CVS-CHAMBERS-VALVES
 *   node server/scripts/extract-article-prose-packets.mjs --source server/data/medical-library-v1.json
 *
 * Scope defaults to every Published article plus every cardiovascular article, so
 * one whole system reads as narrative end to end. Override with --ids or --all.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const LEDGER_KEY = 'synapse-admin-content-ledger-v4'
const PUBLISHED_EVIDENCE_KEY = 'synapse-medical-evidence-published-v1'

const args = process.argv.slice(2)
const flag = (name) => args.includes(`--${name}`)
const option = (name) => {
  const index = args.indexOf(`--${name}`)
  return index === -1 ? undefined : args[index + 1]
}

// Resolve the default against this script's own directory, not an assumed repo
// layout: in the container the Dockerfile's build context is server/, so these
// scripts live at /app/scripts rather than <repo>/server/scripts. Paths given on
// the command line are resolved against the working directory, as expected.
const scriptDir = dirname(fileURLToPath(import.meta.url))
const outDir = option('out') ? resolve(process.cwd(), option('out')) : join(scriptDir, 'prose-packets')
const explicitIds = option('ids')?.split(',').map((id) => id.trim()).filter(Boolean)

/**
 * Live MariaDB by default. `--source <bundle.json>` reads the same two states from
 * an applied migration bundle instead, so packets can be produced (and this script
 * exercised) without database credentials. Both paths are read-only.
 */
async function openSource() {
  const sourceFile = option('source')
  if (sourceFile) {
    const bundle = JSON.parse(await readFile(resolve(process.cwd(), sourceFile), 'utf8'))
    const read = (key) => {
      const value = bundle.states?.[key]
      if (value === undefined) throw new Error(`Bundle ${sourceFile} has no state ${key}`)
      return typeof value === 'string' ? JSON.parse(value) : value
    }
    return { origin: `bundle ${sourceFile}`, read, close: async () => {} }
  }
  const { pool } = await import('../src/db.js')
  const conn = await pool.getConnection()
  const read = async (key) => {
    const [rows] = await conn.query('SELECT v FROM app_state WHERE k = ?', [key])
    if (!rows.length) throw new Error(`app_state key ${key} is absent from this database`)
    return JSON.parse(rows[0].v)
  }
  return { origin: 'live MariaDB', read, close: async () => { conn.release(); await pool.end() } }
}

const source = await openSource()
try {
  const ledger = await source.read(LEDGER_KEY)
  const evidence = await source.read(PUBLISHED_EVIDENCE_KEY)

  const spanById = new Map((evidence.articleSpans ?? []).map((span) => [span.id, span]))
  const citationById = new Map((evidence.citations ?? []).map((citation) => [citation.id, citation]))
  const resourceById = new Map((evidence.resources ?? []).map((resource) => [resource.id, resource]))
  const claimById = new Map((evidence.claims ?? []).map((claim) => [claim.id, claim]))

  const articles = ledger.filter((item) => item.kind === 'article')
  const published = articles.filter((item) => item.status === 'Published')

  const census = {
    ledgerItems: ledger.length,
    articles: articles.length,
    published: published.length,
    publishedSpans: published.reduce((total, item) => total + (item.articleData?.publishedSections ?? [])
      .filter((section) => section.kind !== 'components')
      .reduce((sum, section) => sum + (section.spanIds ?? []).length, 0), 0),
    evidenceSpans: evidence.articleSpans?.length ?? 0,
    evidenceClaims: evidence.claims?.length ?? 0,
    evidenceCitations: evidence.citations?.length ?? 0,
    evidenceResources: evidence.resources?.length ?? 0,
    componentsSectionsRemaining: articles.filter((item) => [
      ...(item.articleData?.sections ?? []),
      ...(item.articleData?.publishedSections ?? []),
    ].some((section) => section.kind === 'components')).length,
    narrativesAlreadyPresent: articles.filter((item) => (item.articleData?.publishedSections ?? [])
      .some((section) => section.narrative?.trim())).length,
  }

  const inScope = explicitIds
    ? articles.filter((item) => explicitIds.includes(item.id))
    : flag('all')
      ? articles
      : articles.filter((item) => item.status === 'Published' || item.id.startsWith('ART-CVS'))

  if (explicitIds) {
    const missing = explicitIds.filter((id) => !articles.some((item) => item.id === id))
    if (missing.length) throw new Error(`Unknown article id(s): ${missing.join(', ')}`)
  }

  const describeSpan = (spanId) => {
    const span = spanById.get(spanId)
    if (!span) return { id: spanId, missingFromEvidenceStore: true }
    return {
      id: span.id,
      text: span.text,
      verification: span.claimIds.map((id) => claimById.get(id)?.verificationStatus).filter(Boolean),
      citations: span.citationIds.map((id) => {
        const citation = citationById.get(id)
        if (!citation) return { id, missing: true }
        const resource = resourceById.get(citation.resourceId)
        return {
          id: citation.id,
          resource: resource?.title ?? citation.resourceId,
          institution: resource?.institution,
          locator: citation.locator,
          supportSpan: citation.supportSpan,
        }
      }),
    }
  }

  const packets = inScope.map((item) => {
    const d = item.articleData ?? {}
    const contentSections = (section) => section.kind !== 'components'
    return {
      articleId: item.id,
      title: item.title,
      status: item.status,
      subjectId: item.subjectId,
      topic: item.fields?.Topic,
      summary: d.publishedSummary || d.summary || item.fields?.Summary || '',
      primaryNodeId: d.primaryNodeId,
      secondaryNodeIds: d.secondaryNodeIds ?? [],
      holdThese: (d.holdThese ?? []).filter(Boolean),
      loseTheMark: (d.loseTheMark ?? []).filter(Boolean),
      // The admin draft: bulleted facts, not prose. Source material to write from.
      draftSections: (d.sections ?? []).filter(contentSections).map((section) => ({
        id: section.id,
        heading: section.heading,
        body: section.body,
        spanIds: section.spanIds ?? [],
      })),
      // The student projection. Prose must be written for exactly these sections;
      // their spans are what will be listed under Sources.
      publishedSections: (d.publishedSections ?? []).filter(contentSections).map((section) => ({
        id: section.id,
        heading: section.heading,
        hasNarrative: Boolean(section.narrative?.trim()),
        spans: (section.spanIds ?? []).map(describeSpan),
      })),
    }
  })

  console.log(JSON.stringify({ source: source.origin, census, scope: { articles: inScope.length, published: inScope.filter((i) => i.status === 'Published').length } }, null, 2))

  if (flag('census-only')) process.exit(0)

  await mkdir(outDir, { recursive: true })
  for (const packet of packets) {
    await writeFile(join(outDir, `${packet.articleId}.json`), `${JSON.stringify(packet, null, 2)}\n`)
  }
  console.log(`\nWrote ${packets.length} packet${packets.length === 1 ? '' : 's'} to ${outDir}`)
} finally {
  await source.close()
}
