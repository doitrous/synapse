/**
 * Mint a concept ID in the shape live state actually uses.
 *
 *   node "Instruction Manual for Content Creation/tools/mint-concept-id.mjs" REN kidney.filtration.gfr-autoregulation
 *
 * Every concept already in the graph is `CON-<SYSTEM>-<14 hex>`. The importer
 * does NOT default to that shape — `conceptFromRow` falls back to
 * `med.concept.<slug>`, which matches nothing in live state — so a concept
 * batch that omits `## id` quietly opens a second ID namespace. Always write
 * the ID, and get it from here.
 *
 * The first segment is a **body-system code**, not the subject ID and not the
 * canonical node. `renal` concepts are `CON-REN-…`, `resp` are `CON-RES-…`,
 * `gi` are `CON-GIT-…`, and `pharm` concepts are filed under the system whose
 * drugs they are. The valid codes are the programme's system files, listed by
 * this tool when you get one wrong.
 *
 * The historical hashes came from the upstream corpus pipeline and cannot be
 * reproduced here. This is the forward convention: SHA-256 of the canonical
 * key, uppercased, first 14 characters. It is deterministic, so the same
 * canonical key always mints the same ID and a re-run never forks the record.
 * Collisions against live state and pending batches are checked.
 */
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const [systemArg, canonicalKey] = process.argv.slice(2)

/** The system codes the programme recognises, read from its own system files. */
const SYSTEMS_DIR = 'docs/medical-library-program/systems'
const systems = existsSync(SYSTEMS_DIR)
  ? readdirSync(SYSTEMS_DIR).filter((n) => n.startsWith('SYS-') && n.endsWith('.md')).map((n) => n.slice(4, -3))
  : []

if (!systemArg || !canonicalKey) {
  console.error('Usage: mint-concept-id.mjs <SYSTEM> <canonical.key>')
  console.error('  e.g. mint-concept-id.mjs REN kidney.filtration.gfr-autoregulation')
  console.error(`\nSystem codes: ${systems.join(' ')}`)
  process.exit(2)
}

const system = systemArg.toUpperCase()
if (systems.length && !systems.includes(system)) {
  console.error(`! "${systemArg}" is not a system code.`)
  console.error(`  Valid codes: ${systems.join(' ')}`)
  console.error('  Note these are body systems, not subject IDs — renal is REN, resp is RES, gi is GIT, endo is END, neuro is NEU.')
  process.exit(2)
}
if (!/^[a-z0-9]+(\.[a-z0-9-]+)+$/.test(canonicalKey)) {
  console.error(`! "${canonicalKey}" is not a canonical key. Use dot-separated lowercase, e.g. entity.relation.qualifier`)
  process.exit(2)
}

const hash = createHash('sha256').update(canonicalKey).digest('hex').toUpperCase().slice(0, 14)
const id = `CON-${system}-${hash}`

// A collision would silently merge two different concepts on import, so this
// check is not optional politeness — it is the reason the tool exists.
const taken = new Map()
const LIVE = 'server/data/medical-library-v1.json'
if (existsSync(LIVE)) {
  const graph = JSON.parse(readFileSync(LIVE, 'utf8')).states['synapse-concept-graph-v2'] ?? { concepts: [] }
  for (const concept of graph.concepts) taken.set(concept.id, `live: ${concept.label}`)
}
for (const dir of ['docs/import-ready', 'docs/questions-import-ready']) {
  if (!existsSync(dir)) continue
  for (const name of readdirSync(dir, { recursive: true })) {
    const path = join(dir, String(name))
    if (!path.endsWith('.md')) continue
    for (const match of readFileSync(path, 'utf8').matchAll(/^## id\r?\n(.+)$/gm)) {
      if (!taken.has(match[1].trim())) taken.set(match[1].trim(), `pending: ${path}`)
    }
  }
}

if (taken.has(id)) {
  console.error(`! ${id} is already taken — ${taken.get(id)}`)
  console.error('  If that is the same concept, update it instead of creating one.')
  console.error('  If it is genuinely different, your canonical key is not specific enough. Refine it.')
  process.exit(1)
}

console.log(id)
console.error(`ok — CON-${system}- from canonical key "${canonicalKey}", checked against ${taken.size} existing IDs.`)
