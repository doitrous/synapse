/**
 * The IDs already authored for module 101 must not move.
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
