#!/usr/bin/env node
/**
 * Withdraw published articles/questions and clear their university/year scope.
 *
 * Dry run (production DB, read only):
 *   node --experimental-strip-types scripts/reset-published-content-visibility.mjs \
 *     --env-file=/path/to/.env.local
 *
 * Apply (versioned API, AAL2 super-admin token required):
 *   MEDICAL_API_BASE=https://nishany.example MEDICAL_API_TOKEN=... \
 *   node --experimental-strip-types scripts/reset-published-content-visibility.mjs \
 *     --apply --confirm-digest=<digest-from-dry-run>
 *
 * If the preflight reports live student sessions, applying additionally needs
 * --allow-active-sessions to acknowledge that those sessions may be interrupted.
 */
import { createHash } from 'node:crypto'
import { mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { resetPublishedContentVisibility } from '../src/data/contentVisibilityReset.ts'

const LEDGER_KEY = 'nishany-admin-content-ledger-v4'
const args = process.argv.slice(2)
const flag = (name) => args.includes(name)
const option = (name) => args.find((entry) => entry.startsWith(`${name}=`))?.slice(name.length + 1)
const apply = flag('--apply')
const confirmDigest = option('--confirm-digest')
const envFile = option('--env-file')
const apiBase = option('--api-base') ?? process.env.MEDICAL_API_BASE
const apiToken = process.env.MEDICAL_API_TOKEN
const allowActiveSessions = flag('--allow-active-sessions')

function digest(value) {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex')
}

function stateUrl(base) {
  return new URL(`/api/state/${encodeURIComponent(LEDGER_KEY)}`, base).toString()
}

function apiUrl(path) {
  return new URL(path, apiBase).toString()
}

async function apiJson(path) {
  if (!apiBase || !apiToken) throw new Error('MEDICAL_API_BASE and MEDICAL_API_TOKEN are required for API mode')
  const response = await fetch(apiUrl(path), { headers: { authorization: `Bearer ${apiToken}` } })
  if (!response.ok) throw new Error(`${path} failed with HTTP ${response.status}`)
  return response.json()
}

async function requireApiSuperAdmin() {
  const session = await apiJson('/api/session')
  if (session.user?.role !== 'super_admin' || session.user?.aal !== 'aal2') {
    throw new Error('Apply requires an MFA-verified super-admin session (role=super_admin, aal=aal2)')
  }
}

async function readApiActivity() {
  const body = await apiJson('/api/admin/content-visibility-reset-preflight')
  const active = body.active
  if (!active || !['studyRooms', 'challenges', 'partyQuestionSessions'].every((key) => Number.isFinite(Number(active[key])))) {
    throw new Error('The content-visibility preflight returned an invalid activity summary')
  }
  return {
    studyRooms: Number(active.studyRooms),
    challenges: Number(active.challenges),
    partyQuestionSessions: Number(active.partyQuestionSessions),
  }
}

function activeSessionCount(active) {
  return active ? active.studyRooms + active.challenges + active.partyQuestionSessions : 0
}

async function readApi() {
  if (!apiBase || !apiToken) throw new Error('MEDICAL_API_BASE and MEDICAL_API_TOKEN are required for API mode')
  const response = await fetch(stateUrl(apiBase), { headers: { authorization: `Bearer ${apiToken}` } })
  if (!response.ok) throw new Error(`State read failed with HTTP ${response.status}`)
  const body = await response.json()
  if (!Array.isArray(body.value)) throw new Error('The live content ledger is not an array')
  return { value: body.value, version: body.version ?? null, source: 'versioned production API', active: null }
}

async function databaseUrl(path) {
  const source = await readFile(path, 'utf8')
  const match = source.match(/^DATABASE_URL=(.+)$/m)
  if (!match) throw new Error(`No DATABASE_URL was found in ${path}`)
  return match[1].trim()
}

async function readDatabase(path) {
  const here = dirname(fileURLToPath(import.meta.url))
  const root = join(here, '..')
  const { createConnection } = createRequire(join(root, 'server', 'package.json'))('mysql2/promise')
  const connection = await createConnection(await databaseUrl(path))
  try {
    const [rows] = await connection.query(
      `SELECT s.v, (SELECT MAX(id) FROM app_state_versions WHERE k = s.k) AS version
         FROM app_state s WHERE s.k = ?`,
      [LEDGER_KEY],
    )
    if (!rows.length) throw new Error('The live content ledger is absent')
    const value = typeof rows[0].v === 'string' ? JSON.parse(rows[0].v) : rows[0].v
    if (!Array.isArray(value)) throw new Error('The live content ledger is not an array')

    const [[rooms], [challenges], [partyRows]] = await Promise.all([
      connection.query("SELECT COUNT(*) AS count FROM study_rooms WHERE status IN ('lobby','running')"),
      connection.query("SELECT COUNT(*) AS count FROM challenges WHERE status IN ('sent','running')"),
      connection.query("SELECT item_refs AS itemRefs FROM study_party_sessions WHERE status IN ('open','scheduled')"),
    ])
    const partyQuestionSessions = partyRows.reduce((count, row) => {
      try {
        const refs = typeof row.itemRefs === 'string' ? JSON.parse(row.itemRefs) : row.itemRefs
        return count + (Array.isArray(refs) && refs.some((entry) => entry?.kind === 'question') ? 1 : 0)
      } catch { return count }
    }, 0)
    return {
      value,
      version: rows[0].version ?? null,
      source: 'production database (read only)',
      active: {
        studyRooms: Number(rooms[0]?.count ?? 0),
        challenges: Number(challenges[0]?.count ?? 0),
        partyQuestionSessions,
      },
    }
  } finally {
    await connection.end()
  }
}

function printPlan(snapshot, result, beforeDigest) {
  console.log(`source: ${snapshot.source}`)
  console.log(`ledger version: ${snapshot.version ?? 'none'}`)
  console.log(`before digest: ${beforeDigest}`)
  console.log(`published articles to withdraw: ${result.stats.publishedArticles}`)
  console.log(`published questions to withdraw: ${result.stats.publishedQuestions}`)
  console.log(`article university lists to clear: ${result.stats.articleUniversityLists}`)
  console.log(`article year lists to clear: ${result.stats.articleYearLists}`)
  console.log(`question university lists to clear: ${result.stats.questionUniversityLists}`)
  console.log(`question year lists to clear: ${result.stats.questionYearLists}`)
  console.log(`question hard allow-lists to clear: ${result.stats.questionOnlyForLists}`)
  console.log(`university-note articles preserved: ${result.stats.preservedUniversityNotes}`)
  if (snapshot.active) {
    console.log(`active study rooms that may be interrupted: ${snapshot.active.studyRooms}`)
    console.log(`active challenges that may be interrupted: ${snapshot.active.challenges}`)
    console.log(`active party question sessions that may be interrupted: ${snapshot.active.partyQuestionSessions}`)
  }
}

const snapshot = apiBase && apiToken
  ? await (async () => {
      await requireApiSuperAdmin()
      const value = await readApi()
      value.active = await readApiActivity()
      return value
    })()
  : envFile
    ? await readDatabase(envFile)
    : (() => { throw new Error('Provide MEDICAL_API_BASE + MEDICAL_API_TOKEN, or --env-file for a read-only database dry run') })()
const beforeDigest = digest(snapshot.value)
const planned = resetPublishedContentVisibility(snapshot.value)
printPlan(snapshot, planned, beforeDigest)

if (!apply) {
  console.log('\nDRY RUN. Nothing was written.')
  console.log(`To apply through the versioned API, use --apply --confirm-digest=${beforeDigest}`)
  process.exit(0)
}

if (!apiBase || !apiToken) throw new Error('Apply is refused without the versioned API and an AAL2 console token')
if (!confirmDigest || confirmDigest !== beforeDigest) throw new Error('Apply is refused because --confirm-digest does not match the current live ledger')
if (!planned.targetIds.length) {
  console.log('\nNothing to apply; no published articles or questions remain.')
  process.exit(0)
}

const backupDir = await mkdtemp(join(tmpdir(), 'nishany-content-visibility-'))
const backupPath = join(backupDir, `ledger-${beforeDigest.slice(0, 12)}.json`)
await writeFile(backupPath, `${JSON.stringify({ takenAt: new Date().toISOString(), version: snapshot.version, digest: beforeDigest, value: snapshot.value }, null, 1)}\n`, { mode: 0o600 })
console.log(`recovery snapshot: ${backupPath}`)

const current = await readApi()
if (current.version !== snapshot.version || digest(current.value) !== beforeDigest) throw new Error('The ledger moved after the plan was prepared; nothing was written')
await requireApiSuperAdmin()
const active = await readApiActivity()
if (activeSessionCount(active) > 0 && !allowActiveSessions) {
  printPlan({ ...current, source: 'versioned production API (final preflight)', active }, resetPublishedContentVisibility(current.value), beforeDigest)
  throw new Error('Active student sessions may be interrupted; rerun with --allow-active-sessions only after reviewing the counts')
}
const next = resetPublishedContentVisibility(current.value, new Date().toISOString())
const payload = JSON.stringify({ value: next.items, baseVersion: current.version })
if (Buffer.byteLength(payload) > 24 * 1024 * 1024) throw new Error('The write exceeds the safe API request size; nothing was written')

const response = await fetch(stateUrl(apiBase), {
  method: 'PUT',
  headers: { authorization: `Bearer ${apiToken}`, 'content-type': 'application/json' },
  body: payload,
})
if (!response.ok) throw new Error(`State write failed with HTTP ${response.status}: ${(await response.text()).slice(0, 240)}`)

const verified = await readApi()
const byId = new Map(verified.value.map((item) => [item.id, item]))
for (const id of next.targetIds) {
  const item = byId.get(id)
  if (!item || item.status !== 'In review') throw new Error(`Verification failed for ${id}: status did not become In review`)
  if (item.kind === 'article' && ((item.articleData?.universityIds?.length ?? 0) || (item.articleData?.yearIds?.length ?? 0))) throw new Error(`Verification failed for ${id}: article targeting remains`)
  if (item.kind === 'question' && ((item.questionData?.tags?.universityIds?.length ?? 0) || (item.questionData?.tags?.years?.length ?? 0) || (item.questionData?.tags?.questionOnlyFor?.length ?? 0))) throw new Error(`Verification failed for ${id}: question targeting remains`)
}
console.log(`\nAPPLIED AND VERIFIED. New ledger version: ${verified.version ?? 'unknown'}`)
console.log(`withdrawn articles: ${next.stats.publishedArticles}`)
console.log(`withdrawn questions: ${next.stats.publishedQuestions}`)
