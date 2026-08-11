/**
 * Writes reviewed narrative prose into the live content ledger, and strips the
 * generated "Components and relations" sections for good.
 *
 * Dry run is the default and prints exactly what would change:
 *
 *   node server/scripts/apply-article-narratives-v9.mjs
 *
 * A dry run can also be rehearsed against an applied migration bundle instead of
 * the database, which needs no credentials and can emit the resulting ledger:
 *
 *   node server/scripts/apply-article-narratives-v9.mjs \
 *     --source server/data/medical-library-v1.json --emit /tmp/ledger-after.json
 *
 * Writing requires BOTH the migration approval variable and an explicit --commit:
 *
 *   MEDICAL_LIBRARY_APPLY=2026-08-12-article-narrative-v9 \
 *     node server/scripts/apply-article-narratives-v9.mjs --commit
 *
 * The write runs in one transaction, takes a recovery snapshot scoped to the
 * ledger row only (the full app_state table is tens of megabytes and would breach
 * max_allowed_packet), and records the prior value in app_state_versions.
 */
import { randomUUID } from 'node:crypto'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const requiredMigrationId = '2026-08-12-article-narrative-v9'
const LEDGER_KEY = 'synapse-admin-content-ledger-v4'

const args = process.argv.slice(2)
const commit = args.includes('--commit')
const option = (name) => {
  const index = args.indexOf(`--${name}`)
  return index === -1 ? undefined : args[index + 1]
}

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..')
const narrativesDir = resolve(repoRoot, option('narratives') ?? 'server/scripts/narratives')
const sourceFile = option('source')
const emitFile = option('emit')

if (commit && sourceFile) throw new Error('--commit writes to MariaDB and cannot be combined with --source')
if (commit && process.env.MEDICAL_LIBRARY_APPLY !== requiredMigrationId) {
  throw new Error(`Refusing to mutate MariaDB. Set MEDICAL_LIBRARY_APPLY=${requiredMigrationId} after explicit owner approval.`)
}

/* ── Load and validate the authored prose before touching the database ──── */

const files = (await readdir(narrativesDir)).filter((name) => name.endsWith('.json')).sort()
if (!files.length) throw new Error(`No narrative files found in ${narrativesDir}`)

const narratives = new Map()
for (const file of files) {
  const doc = JSON.parse(await readFile(join(narrativesDir, file), 'utf8'))
  if (!doc.articleId) throw new Error(`${file} has no articleId`)
  if (narratives.has(doc.articleId)) throw new Error(`${doc.articleId} is authored twice`)
  if (!Array.isArray(doc.sections) || !doc.sections.length) throw new Error(`${doc.articleId} has no sections`)
  for (const section of doc.sections) {
    if (!section.id) throw new Error(`${doc.articleId} has a section with no id`)
    if (!section.narrative?.trim()) throw new Error(`${doc.articleId} section ${section.id} has empty narrative`)
  }
  narratives.set(doc.articleId, doc)
}

const jsonSafe = (value) => JSON.stringify(value, (_key, item) => typeof item === 'bigint' ? item.toString() : item)
const actor = `migration:${requiredMigrationId}`

/**
 * The whole mutation, as a pure function of the current ledger. The live path and
 * the offline rehearsal both call this, so a `--source` dry run exercises exactly
 * the transformation that `--commit` would write.
 */
function applyNarratives(ledger) {
  if (!Array.isArray(ledger)) throw new Error(`${LEDGER_KEY} is not an array`)

  const unknown = [...narratives.keys()].filter((id) => !ledger.some((item) => item.id === id))
  if (unknown.length) throw new Error(`Authored prose targets unknown article id(s): ${unknown.join(', ')}`)

  const changes = []
  let componentsStripped = 0

  const next = ledger.map((item) => {
    if (item.kind !== 'article' || !item.articleData) return item
    const doc = narratives.get(item.id)
    const d = item.articleData
    const hadComponents = [...(d.sections ?? []), ...(d.publishedSections ?? [])].filter((s) => s.kind === 'components').length
    if (!doc && !hadComponents) return item
    componentsStripped += hadComponents

    const isComponents = (section) => section.kind === 'components'
    const applyProse = (sections) => (sections ?? []).filter((section) => !isComponents(section)).map((section) => {
      const authored = doc?.sections.find((entry) => entry.id === section.id)
      return authored ? { ...section, narrative: authored.narrative.trim() } : section
    })

    const publishedSections = applyProse(d.publishedSections)
    const sections = applyProse(d.sections)

    if (doc) {
      // Prose must land on a real section. Landing only on the draft is allowed
      // — articles still in review have no student projection yet — but it is
      // reported, because that prose stays invisible until the article publishes.
      const targeted = doc.sections.map((entry) => entry.id)
      const inPublished = new Set(publishedSections.filter((s) => s.narrative).map((s) => s.id))
      const inDraft = new Set(sections.filter((s) => s.narrative).map((s) => s.id))
      const stranded = targeted.filter((id) => !inPublished.has(id) && !inDraft.has(id))
      if (stranded.length) throw new Error(`${item.id}: authored prose targets unknown section(s): ${stranded.join(', ')}`)
      changes.push({
        articleId: item.id,
        title: item.title,
        status: item.status,
        sectionsWithProse: inPublished.size,
        draftOnlyProse: targeted.filter((id) => !inPublished.has(id)).length,
        componentsRemoved: hadComponents,
        summaryUpdated: Boolean(doc.publishedSummary),
      })
    } else {
      changes.push({ articleId: item.id, title: item.title, status: item.status, sectionsWithProse: 0, draftOnlyProse: 0, componentsRemoved: hadComponents, summaryUpdated: false })
    }

    return {
      ...item,
      articleData: {
        ...d,
        sections,
        publishedSections,
        ...(doc?.publishedSummary ? { publishedSummary: doc.publishedSummary.trim() } : {}),
        ...(doc?.holdThese?.length ? { holdThese: doc.holdThese } : {}),
      },
    }
  })

  const survivingComponents = next.filter((item) => item.kind === 'article' && [
    ...(item.articleData?.sections ?? []),
    ...(item.articleData?.publishedSections ?? []),
  ].some((section) => section.kind === 'components'))
  if (survivingComponents.length) throw new Error(`${survivingComponents.length} article(s) still carry a Components and relations section`)

  return {
    next,
    summary: {
      migration: requiredMigrationId,
      articlesAuthored: narratives.size,
      articlesTouched: changes.length,
      componentsSectionsStripped: componentsStripped,
      changes,
    },
  }
}

/* ── Offline rehearsal: same transformation, no database ─────────────────── */

if (sourceFile) {
  const bundle = JSON.parse(await readFile(resolve(repoRoot, sourceFile), 'utf8'))
  const raw = bundle.states?.[LEDGER_KEY]
  if (raw === undefined) throw new Error(`Bundle ${sourceFile} has no state ${LEDGER_KEY}`)
  const ledger = typeof raw === 'string' ? JSON.parse(raw) : raw

  const { next, summary } = applyNarratives(ledger)
  const serialized = JSON.stringify(next)
  console.log(JSON.stringify({
    applied: false,
    dryRun: true,
    source: `bundle ${sourceFile}`,
    ...summary,
    ledgerBytes: { before: JSON.stringify(ledger).length, after: serialized.length },
  }, null, 2))
  if (emitFile) {
    await writeFile(resolve(repoRoot, emitFile), serialized)
    console.log(`\nWrote the resulting ledger to ${emitFile}`)
  }
  console.log('\nRehearsal against a bundle — the database was never opened.')
  process.exit(0)
}

/* ── Live path ───────────────────────────────────────────────────────────── */

const { pool } = await import('../src/db.js')
const conn = await pool.getConnection()

try {
  await conn.beginTransaction()

  const [applied] = await conn.query('SELECT id, applied_at AS appliedAt FROM schema_migrations WHERE id = ? FOR UPDATE', [requiredMigrationId])
  if (applied.length && commit) {
    await conn.rollback()
    console.log(JSON.stringify({ applied: false, alreadyApplied: true, migration: applied[0] }, null, 2))
    process.exitCode = 0
  } else {
    const [rows] = await conn.query('SELECT v, updated_at FROM app_state WHERE k = ? FOR UPDATE', [LEDGER_KEY])
    if (!rows.length) throw new Error(`${LEDGER_KEY} is absent from app_state`)

    let ledger
    try {
      ledger = JSON.parse(rows[0].v)
    } catch {
      throw new Error(`${LEDGER_KEY} is not valid JSON`)
    }

    const { next, summary: base } = applyNarratives(ledger)
    const serialized = JSON.stringify(next)
    const summary = { ...base, ledgerBytes: { before: rows[0].v.length, after: serialized.length } }

    if (!commit) {
      await conn.rollback()
      console.log(JSON.stringify({ applied: false, dryRun: true, ...summary }, null, 2))
      console.log(`\nDry run only — nothing was written. To apply:\n  MEDICAL_LIBRARY_APPLY=${requiredMigrationId} node server/scripts/apply-article-narratives-v9.mjs --commit`)
    } else {
      const snapshot = {
        schemaVersion: 1,
        createdAt: new Date().toISOString(),
        scope: [LEDGER_KEY],
        tables: { app_state: [{ k: LEDGER_KEY, v: rows[0].v, updated_at: rows[0].updated_at }] },
        note: 'Recovery point before writing narrative prose and removing Components and relations sections. Scoped to the content ledger row so the snapshot stays under max_allowed_packet.',
      }
      const snapshotId = `snapshot-${randomUUID()}`
      await conn.query(
        'INSERT INTO data_snapshots (id, label, snapshot_json, created_by) VALUES (?, ?, ?, ?)',
        [snapshotId, `Before ${requiredMigrationId}`, jsonSafe(snapshot), actor],
      )

      await conn.query('INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)', [LEDGER_KEY, rows[0].v, actor])
      await conn.query('UPDATE app_state SET v = ? WHERE k = ?', [serialized, LEDGER_KEY])
      await conn.query('INSERT INTO schema_migrations (id) VALUES (?)', [requiredMigrationId])
      await conn.commit()

      const [migration] = await conn.query('SELECT id, applied_at AS appliedAt FROM schema_migrations WHERE id = ?', [requiredMigrationId])
      console.log(JSON.stringify({ applied: true, migration: migration[0], snapshotId, ...summary }, null, 2))
    }
  }
} catch (error) {
  await conn.rollback().catch(() => {})
  throw error
} finally {
  conn.release()
  await pool.end()
}
