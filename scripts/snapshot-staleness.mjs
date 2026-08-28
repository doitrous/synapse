/**
 * How far behind production the library fixture is, key by key.
 *
 *   MEDICAL_API_BASE=https://… MEDICAL_API_TOKEN=… npm run medical:snapshot-staleness
 *
 * The companion to `snapshot-live.mjs`, and much cheaper to run: this asks
 * `GET /api/state/manifest`, which returns each key's `updatedAt` and no values
 * at all. It needs only an authenticated identity — **not** super_admin, not
 * MFA — so anyone on the team can measure staleness even when nobody can take a
 * snapshot.
 *
 * Why it is worth having separately: every lane has been told "live state" means
 * the extraction bundle, which is true and unquantified. "Stale" is a warning
 * people stop reading. "The concept graph moved 11 days after this file was
 * built" is a number they can act on.
 *
 * Reports, never fails. A fixture being behind production is the normal state of
 * affairs, not a broken build, and a gate that goes red for the normal state of
 * affairs stops being read. It exits non-zero only when it could not ask.
 */
import { readFile } from 'node:fs/promises'

const FIXTURE = 'server/data/medical-library-v1.json'
const base = process.env.MEDICAL_API_BASE
const token = process.env.MEDICAL_API_TOKEN

if (!base || !token) {
  console.error('Both MEDICAL_API_BASE and MEDICAL_API_TOKEN must be set in the environment.')
  console.error(`  MEDICAL_API_BASE  ${base ? 'set' : 'MISSING'}`)
  console.error(`  MEDICAL_API_TOKEN ${token ? 'set' : 'MISSING'}`)
  console.error('')
  console.error('Set them in your own shell so they are not recorded anywhere:')
  console.error('  export MEDICAL_API_BASE=https://<production-host>')
  console.error('  export MEDICAL_API_TOKEN=<any authenticated access token>')
  console.error('  npm run medical:snapshot-staleness')
  process.exit(2)
}

let fixture
try {
  fixture = JSON.parse(await readFile(FIXTURE, 'utf8'))
} catch (reason) {
  console.error(`Could not read ${FIXTURE}: ${reason.message}`)
  process.exit(1)
}

const builtAt = fixture.generatedAt ? new Date(fixture.generatedAt) : null
const url = new URL('/api/state/manifest', base).toString()
console.log(`GET ${url}`)

let response
try {
  response = await fetch(url, { headers: { authorization: `Bearer ${token}` } })
} catch (reason) {
  console.error(`Could not reach ${url}: ${reason.message}`)
  process.exit(1)
}

if (response.status !== 200) {
  console.error(`${url} answered ${response.status} ${response.statusText}.`)
  if (response.status === 401) console.error('401 — the token is not valid, or has expired.')
  process.exit(1)
}

const body = await response.json().catch(() => null)
const keys = body?.keys
if (!keys || typeof keys !== 'object') {
  console.error('The manifest did not contain a `keys` object.')
  process.exit(1)
}

console.log('')
console.log(`fixture ${FIXTURE}`)
console.log(`  built    ${fixture.generatedAt ?? '(no generatedAt)'}`)
console.log(`  source   ${fixture.source ?? 'bundle build (build-medical-library-v1.mjs)'}`)
console.log('')

const DAY = 24 * 60 * 60 * 1000
const rows = []
for (const [key, updatedAt] of Object.entries(keys)) {
  if (!updatedAt) { rows.push({ key, note: 'not stored in production' }); continue }
  const moved = new Date(updatedAt)
  // A key production has not touched since the build is not stale, whatever its
  // date says — the two agree. Only a key that moved *after* the build is behind.
  const behind = builtAt && moved > builtAt ? moved.getTime() - builtAt.getTime() : 0
  rows.push({ key, updatedAt, behind })
}

rows.sort((a, b) => (b.behind ?? -1) - (a.behind ?? -1))
const stale = rows.filter((row) => row.behind > 0)

for (const row of rows) {
  if (row.note) { console.log(`  ${row.key.padEnd(42)} ${row.note}`); continue }
  const days = row.behind / DAY
  const how = row.behind === 0
    ? 'not changed since the fixture was built'
    : days >= 1 ? `${days.toFixed(1)} days newer than the fixture`
      : `${(row.behind / (60 * 60 * 1000)).toFixed(1)} hours newer than the fixture`
  console.log(`  ${row.key.padEnd(42)} ${how}`)
}

console.log('')
if (!builtAt) {
  console.log('The fixture carries no `generatedAt`, so nothing can be compared against it.')
} else if (!stale.length) {
  console.log(`Nothing in production has moved since ${fixture.generatedAt}.`)
} else {
  const worst = stale[0]
  console.log(`${stale.length} of ${rows.length} key(s) have moved since the fixture was built,`)
  console.log(`the furthest by ${(worst.behind / DAY).toFixed(1)} days (${worst.key}).`)
  console.log('')
  console.log('This is a measurement, not a failure. To close the gap, someone with a')
  console.log('super-admin token whose session completed MFA runs:')
  console.log('  npm run medical:snapshot-live')
}
