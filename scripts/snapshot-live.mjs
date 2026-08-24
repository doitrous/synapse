/**
 * Replace the library fixture with a snapshot of production.
 *
 *   MEDICAL_API_BASE=https://… MEDICAL_API_TOKEN=… npm run medical:snapshot-live
 *
 * `server/data/medical-library-v1.json` is what `medical:simulate` and
 * `find-existing.mjs` call "live". It is not live: `build-medical-library-v1.mjs`
 * builds it from `full-catalog.json`, the extraction pipeline's output. Anything
 * imported by hand through the admin UI was never in that bundle, so rebuilding
 * moves the file *away* from production rather than toward it. This is the other
 * direction — read what production actually holds and write that.
 *
 * `GET /api/state` returns `{ [stateKey]: value }` for every row of `app_state`,
 * which is exactly the shape of this file's `states` object. No transformation.
 *
 * WHY THE TOKEN IS AN ENVIRONMENT VARIABLE AND NEVER A FILE. The route needs a
 * Supabase access token for a `super_admin` whose session completed MFA
 * (`aal === 'aal2'`). That is a short-lived credential for the one endpoint that
 * returns everything. Written to a config file it would outlive its purpose, get
 * committed, and be a standing super-admin credential in the repository. It is
 * read from the environment, never echoed, and never persisted — the written
 * file records that a token was used, never which one.
 */
import { readFile, writeFile } from 'node:fs/promises'

const OUT = 'server/data/medical-library-v1.json'
const base = process.env.MEDICAL_API_BASE
const token = process.env.MEDICAL_API_TOKEN

if (!base || !token) {
  // Named separately so the reader knows which one is missing without being
  // shown either value.
  console.error('Both MEDICAL_API_BASE and MEDICAL_API_TOKEN must be set in the environment.')
  console.error(`  MEDICAL_API_BASE  ${base ? 'set' : 'MISSING'}`)
  console.error(`  MEDICAL_API_TOKEN ${token ? 'set' : 'MISSING'}`)
  console.error('')
  console.error('Set them in your own shell so they are not recorded anywhere:')
  console.error('  export MEDICAL_API_BASE=https://<production-host>')
  console.error('  export MEDICAL_API_TOKEN=<your super-admin access token, MFA completed>')
  console.error('  npm run medical:snapshot-live')
  process.exit(2)
}

const url = new URL('/api/state', base).toString()
console.log(`GET ${url}`)

let response
try {
  response = await fetch(url, { headers: { authorization: `Bearer ${token}` } })
} catch (reason) {
  // `reason.message` can contain the URL but never the header.
  console.error(`Could not reach ${url}: ${reason.message}`)
  process.exit(1)
}

// Refuse to write on anything but a 200. A 401, a 403 or an HTML error page
// parsed as JSON would otherwise overwrite the fixture with nothing, and the
// gates would report a clean, empty library.
if (response.status !== 200) {
  console.error(`Refusing to write: ${url} answered ${response.status} ${response.statusText}.`)
  if (response.status === 401) console.error('401 — the token is not valid, or has expired. They are short-lived; get a fresh one.')
  if (response.status === 403) {
    console.error('403 — the token is valid but not permitted. This route needs role super_admin')
    console.error('      AND a session that completed MFA (aal2). A password-only session is refused here.')
  }
  process.exit(1)
}

let states
try {
  states = await response.json()
} catch (reason) {
  console.error(`Refusing to write: ${url} answered 200 but not JSON (${reason.message}).`)
  process.exit(1)
}

if (!states || typeof states !== 'object' || Array.isArray(states) || !Object.keys(states).length) {
  console.error('Refusing to write: the response is not a non-empty object of state keys.')
  process.exit(1)
}

// Keep the envelope the fixture already has, so every reader of this file keeps
// working. `source` is the one addition: without it a snapshot and a bundle
// build are indistinguishable on disk, and the whole reason for this script is
// that people could not tell which one they were reading.
let previous = {}
try {
  previous = JSON.parse(await readFile(OUT, 'utf8'))
} catch {
  // A first run, or a missing file. Not a failure — the envelope defaults below.
}

const snapshot = {
  migrationId: previous.migrationId ?? 'production-snapshot',
  generatedAt: new Date().toISOString(),
  source: 'production /api/state',
  states,
  demoStudentIds: previous.demoStudentIds ?? [],
  report: previous.report ?? {},
}

await writeFile(OUT, `${JSON.stringify(snapshot, null, 2)}\n`)

console.log(`wrote ${OUT} — source: production /api/state`)
console.log(`${Object.keys(states).length} state key(s):`)
for (const [key, value] of Object.entries(states)) {
  const size = Array.isArray(value) ? `${value.length} items`
    : value && typeof value === 'object' ? `${Object.keys(value).length} field(s)`
      : typeof value
  console.log(`  ${key.padEnd(42)} ${size}`)
}
console.log('')
console.log('This file is now a production snapshot, not a bundle build.')
console.log('Rerunning `npm run medical:build` would overwrite it with bundle-derived state.')
