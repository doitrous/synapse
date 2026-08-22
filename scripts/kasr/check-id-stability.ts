/**
 * Concept and question IDs already authored must not move.
 *
 * Two properties, and they are not the same one. For 101 ISK the mint is
 * checked — `mintConceptId` must still reproduce what the batches hold. For
 * every module the *committed* ID is pinned against movement, at the bottom of
 * this file, because 103, 104 and 108 do not satisfy the mint and pinning it
 * for them would fail on day one.
 *
 * `mintConceptId` and `mintQuestionId` used to spell `101 ISK` into their hash
 * templates. Five modules are being extracted at once now, so the module became
 * a parameter — and a parameter placed one character off in the template mints
 * a different hash for the same concept. Nothing would error: the batch would
 * validate, import, and quietly create a second copy of every concept 101 has
 * already authored, splitting a student's mastery across the pair.
 *
 * So the constraint is checked rather than reasoned about. These are the IDs as
 * they stand in `docs/Kasr-Source-Imports/concept/101-ISK-concepts.md` and
 * `written/101-ISK-EOY-2025-written.md`; if this file has to change, the batches
 * have already changed underneath it and somebody has to say why.
 *
 *   node --experimental-strip-types scripts/kasr/check-id-stability.ts
 */
import { readFileSync } from 'node:fs'
import { mintConceptId, mintQuestionId, type Seed, type SourceRef } from './seeds/types.ts'
import { SOURCE, SEEDS } from './seeds/101-eoy-2025.ts'

/** Concept ID per canonical key, for the first three seeds on the 2025 paper. */
const CONCEPTS: Record<string, string> = {
  'eosinophil-versus-neutrophil-light-microscopy': 'CON-HEM-5724364F46CD5A',
  'platelet-hyalomere-structure-function': 'CON-HEM-CC292B4D6CC61E',
  'mast-cell-identification': 'CON-FND-EE10AFCE944705',
}

const failures: string[] = []

for (const seed of SEEDS) {
  const expected = CONCEPTS[seed.key]
  if (!expected) continue
  const actual = mintConceptId('101 ISK', seed.subject, seed.key)
  if (actual !== expected) failures.push(`concept ${seed.key}: expected ${expected}, minted ${actual}`)
}

/**
 * A source with no `module` is 101 by default, which is what every paper seeded
 * before the parameter existed relies on. Checking the default explicitly is
 * the point: an implicit default that silently changed is the failure mode.
 */
const defaulted: SourceRef = { ...SOURCE, module: undefined }
for (const seed of SEEDS.slice(0, 3)) {
  const withModule = mintQuestionId({ ...SOURCE, module: '101 ISK' }, seed as Seed)
  const withoutModule = mintQuestionId(defaulted, seed as Seed)
  if (withModule !== withoutModule) {
    failures.push(`question ${seed.section} Q${seed.q}: default module mints ${withoutModule}, "101 ISK" mints ${withModule}`)
  }
  if (!withModule.startsWith('QW-101-')) {
    failures.push(`question ${seed.section} Q${seed.q}: ${withModule} does not carry the module code`)
  }
}

// And the opposite check: a different module must NOT mint the same ID, or the
// parameter is being ignored and every module shares one namespace.
const other = mintConceptId('102 INT', 'haem', 'eosinophil-versus-neutrophil-light-microscopy')
if (other === CONCEPTS['eosinophil-versus-neutrophil-light-microscopy']) {
  failures.push('102 INT mints the same concept ID as 101 ISK — the module is not reaching the hash')
}

if (failures.length) {
  console.error('ID stability broken:')
  for (const line of failures) console.error(`  ${line}`)
  process.exit(1)
}
console.log(`ID stability: ${Object.keys(CONCEPTS).length} concept IDs and 3 question IDs unchanged; 102 INT mints a distinct namespace.`)

/**
 * `pharm` must refuse to mint without an explicit body-system code.
 *
 * Subject and body system are decoupled in live state: all 206 `pharm`
 * concepts carry `CON-FND-` (85, general pharmacology) or `CON-INF-` (121,
 * anti-infectives), and `CON-MUL-` has zero members in the whole library. A
 * helper that defaults `pharm` to any single code mints a second namespace for
 * concepts that already exist, which is the mastery-splitting failure this
 * whole file guards against.
 */
import { mintConceptId as mint, systemFor } from './seeds/types.ts'

let refused = false
try {
  mint('108 INT', 'pharm', 'loading-dose')
} catch {
  refused = true
}
if (!refused) {
  console.error('ID stability broken: pharm minted a concept ID without an explicit system code')
  process.exit(1)
}
if (systemFor('pharm', 'FND') !== 'FND' || systemFor('haem') !== 'HEM') {
  console.error('ID stability broken: systemFor does not honour the override or the default')
  process.exit(1)
}
console.log('pharm refuses to mint without an explicit body-system code; overrides honoured.')

/* ------------------------------------------------------------------------ *
 * Committed concept IDs, one per module, pinned against movement.
 * ------------------------------------------------------------------------ */

/**
 * One concept per module whose committed ID must not move.
 *
 * The checks above ask whether `mintConceptId` still reproduces what 101 has.
 * That is the right question for 101 and the wrong one for everybody else:
 * `id === mintConceptId(module, subject, key)` holds for all of 101 ISK and
 * 102 INT and for **none** of 103 BMS (0 of 122), 104 CPS practical (0 of 17)
 * or 108 INT (0 of 98). 237 IDs in the tree were minted by something other than
 * this function. Asserting the mint across all five modules would fail on the
 * first run and stay failing, and a gate that is red for a known reason stops
 * being read — which is how a *new* breakage gets in unnoticed.
 *
 * So this pins the weaker, true property: **the ID committed against this
 * canonical key today must be the ID committed against it tomorrow.** That is
 * what the graph actually depends on. Every claim, span, question and article
 * points at these IDs, and re-minting one forks a student's mastery across two
 * concepts with nothing at import time noticing.
 *
 * It is deliberately indifferent to *how* an ID was minted. Whether 103's IDs
 * should be re-minted to satisfy the invariant is a real question and a
 * separate one, for the lanes that own that content; until it is decided, the
 * IDs must not drift by accident in the meantime.
 *
 * Read from the committed batch rather than recomputed, so it catches both
 * failures: the ID moving under a stable key, and the key being repointed at a
 * different ID.
 *
 * **Years 2–5: add one line here as your first concept batch lands.** One
 * concept per module is enough — this guards the identity scheme, not the
 * content, and every concept in a module shares the scheme.
 *
 * If a line here has to change, the batches have already changed underneath it
 * and somebody has to say why.
 */
const PINNED: { module: string, file: string, key: string, id: string }[] = [
  { module: '101 ISK', file: '101-ISK-concepts.md', key: 'eosinophil-versus-neutrophil-light-microscopy', id: 'CON-HEM-5724364F46CD5A' },
  { module: '102 INT', file: '102-INT-concepts.md', key: 'cellulose-dietary-importance', id: 'CON-GIT-9589A7077392FD' },
  { module: '103 BMS', file: '103-BMS-biochemistry-concepts.md', key: 'bioenergetics.ros.antioxidant-defences', id: 'CON-FND-5F0DC4407DEC51' },
  { module: '104 CPS', file: '104-CPS-concepts.md', key: 'cardiac-myocyte-action-potential.phase-1-and-2-ionic-basis', id: 'CON-CVS-818EC10C20A623' },
  { module: '108 INT', file: '108-INT-concepts-pathology.md', key: 'pathology.scope.general-and-systemic', id: 'CON-FND-E9DDE81591D0A7' },
]

const CONCEPT_DIR = 'docs/Kasr-Source-Imports/concept'

/** Every `id` filed under `key` in one batch. A list, so two rows sharing a key are visible. */
function idsForKey(file: string, key: string): string[] {
  const text = readFileSync(`${CONCEPT_DIR}/${file}`, 'utf8')
  const ids: string[] = []
  for (const block of text.split(/^# Item$/m).slice(1)) {
    const rowKey = block.match(/^## canonical_key[ \t]*\n(.+)$/m)?.[1].trim()
    if (rowKey !== key) continue
    const rowId = block.match(/^## id[ \t]*\n(.+)$/m)?.[1].trim()
    if (rowId) ids.push(rowId)
  }
  return ids
}

for (const pin of PINNED) {
  let found: string[]
  try {
    found = idsForKey(pin.file, pin.key)
  } catch (reason) {
    // A batch that has been renamed or deleted is not a passing state. The
    // sweep that deletes written batches has taken three files this month, and
    // a stability check that reads a missing file as "nothing to check" would
    // report green for the exact event it exists to catch.
    failures.push(`${pin.module}: cannot read ${pin.file} (${(reason as Error).message}) — the batch this pin names is gone`)
    continue
  }
  if (!found.length) {
    failures.push(`${pin.module}: no concept in ${pin.file} carries canonical key "${pin.key}" any more`)
  } else if (found.length > 1) {
    failures.push(`${pin.module}: canonical key "${pin.key}" is on ${found.length} rows (${found.join(', ')}) — one key, one concept`)
  } else if (found[0] !== pin.id) {
    failures.push(`${pin.module}: "${pin.key}" was ${pin.id} and is now ${found[0]} — every claim, span, question and article pointing at the old ID is now pointing at nothing`)
  }
}

if (failures.length) {
  console.error('ID stability broken:')
  for (const line of failures) console.error(`  ${line}`)
  process.exit(1)
}
console.log(`committed concept IDs unchanged for ${PINNED.length} modules: ${PINNED.map((p) => p.module).join(', ')}.`)
