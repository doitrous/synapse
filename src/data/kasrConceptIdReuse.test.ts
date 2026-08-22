import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { mintConceptId, parseConceptIds, parseConceptModules, resolveConceptId } from '../../scripts/kasr/seeds/types.ts'

/**
 * One canonical_key -> one id, within a module — whether or not the id
 * already on record happens to be what `mintConceptId` would derive fresh.
 *
 * Two real modules exercise the two ways a hand-authored id can relate to a
 * fresh mint, and both must produce a reuse (a sparse update row), never a
 * full re-mint:
 *
 * - 103 BMS's hand-authored concept files are minted by a different tool
 *   (`Instruction Manual for Content Creation/tools/mint-concept-id.mjs`,
 *   which hashes the canonical_key alone, with no module salt), so a pinned
 *   id there reliably *disagrees* with `mintConceptId`.
 * - 104 CPS's hand-authored concept files were minted with `mintConceptId`
 *   itself, so a pinned id there reliably *agrees* — and used to be treated
 *   as "nothing to reuse" for exactly that reason, which is the bug this
 *   file's third `resolveConceptId` test now guards against: agreement was
 *   never proof that the full hand-authored record (aliases, article links,
 *   evidence) was safe from a full re-mint overwriting it.
 *
 * `resolveConceptId` is what a build checks before minting anything, and
 * `parseConceptIds`/`parseConceptModules` are how it learns what a module
 * already calls a key and which modules that record already claims, straight
 * out of a concept batch's own markdown — no file system, so all three are
 * true unit tests rather than fixtures on disk.
 */
const MODULE = '103 BMS'
const SUBJECT = 'fnd'
const KEY = 'bioenergetics.bonds.high-energy-threshold'
// The real pinned id for this key in
// docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md —
// sha256(KEY) truncated, with no module salt, which is why it can never equal
// what mintConceptId derives for the same key.
const PINNED_ID = 'CON-FND-7228237A5897B5'

// The real pinned id for this key in
// docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md — minted with
// mintConceptId itself, so it is *equal* to a fresh mint for the same
// (module, subject, key). Confirmed directly:
// `mintConceptId("104 CPS", "resp", MODULE_104_KEY)` === `MODULE_104_PINNED_ID`.
// This is the id-reuse hazard lane B9 found: build-batches.ts "104 CPS"
// referencing this same key from a written paper took the "reused: false"
// branch under the old rule and emitted a full conceptBlock(), emptying the
// hand record's aliases/relatedArticleIds and replacing its resource_ids.
const MODULE_104 = '104 CPS'
const SUBJECT_104 = 'resp'
const KEY_104 = 'typical-intercostal-nerve.course-and-branches'
const PINNED_ID_104 = 'CON-RES-0BB6BDDB3E4413'

describe('resolveConceptId: every pinned hit is a reuse', () => {
  test('a key with no entry in the pinned map mints, and says so', () => {
    const pinned = new Map<string, string>()
    const resolved = resolveConceptId(pinned, MODULE, SUBJECT, KEY)
    assert.equal(resolved.id, mintConceptId(MODULE, SUBJECT, KEY))
    assert.equal(resolved.reused, false)
  })

  test('a key whose pinned id disagrees with a fresh mint reuses the pinned id (103 BMS)', () => {
    const pinned = new Map([[KEY, PINNED_ID]])
    const resolved = resolveConceptId(pinned, MODULE, SUBJECT, KEY)
    assert.equal(resolved.id, PINNED_ID)
    assert.notEqual(PINNED_ID, mintConceptId(MODULE, SUBJECT, KEY),
      'the fixture only proves anything if the pinned id truly differs from a fresh mint')
    assert.equal(resolved.reused, true)
  })

  test('a pinned id that already agrees with a fresh mint is STILL a reuse (104 CPS)', () => {
    // This used to assert `reused: false`, on the theory that an id agreeing
    // with a fresh mint meant there was nothing to protect. That theory
    // tracked only the id and missed the record behind it: 104 CPS's hand
    // files were minted with mintConceptId throughout, so most of its keys
    // agree this way, and the old rule let every one of them through as a
    // full re-mint — which is exactly the field loss lane B9 found (aliases
    // and relatedArticleIds emptied, resource_ids replaced) on live,
    // hand-authored 104 CPS concepts. Agreement is not, and was never, a
    // reason to skip the sparse-update row.
    assert.equal(PINNED_ID_104, mintConceptId(MODULE_104, SUBJECT_104, KEY_104),
      'the fixture only proves anything if the pinned id truly agrees with a fresh mint')
    const pinned = new Map([[KEY_104, PINNED_ID_104]])
    const resolved = resolveConceptId(pinned, MODULE_104, SUBJECT_104, KEY_104)
    assert.equal(resolved.id, PINNED_ID_104)
    assert.equal(resolved.reused, true)
  })
})

describe('parseConceptIds reads canonical_key -> id off batch markdown', () => {
  const block = (id: string, key: string, moduleSubject: string, modules?: string) => `# Item

## id
${id}

## label
Something

## canonical_key
${key}

## modules
${modules ?? moduleSubject.split(' > ')[0]}

## module_subject
${moduleSubject}

## field_notes
n/a
`

  test('a hit: id, canonical_key and module_subject all present, module matches', () => {
    const text = block(PINNED_ID, KEY, `${MODULE} > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds`)
    const index = parseConceptIds(text, MODULE)
    assert.equal(index.get(KEY), PINNED_ID)
  })

  test('scoped by module_subject, not by the caller\'s assumption', () => {
    const text = block(PINNED_ID, KEY, '104 CPS > Histology > Respiratory System > Conducting Portion')
    const index = parseConceptIds(text, MODULE)
    assert.equal(index.get(KEY), undefined, 'a row filed under a different module must not donate its id')
  })

  test('an update row with no canonical_key cannot be indexed and is skipped, not thrown on', () => {
    const text = `# Item

## id
${PINNED_ID}

## exam_signal
src_example | end_of_year | 2025 | p1 | ${MODULE}

## field_notes
Left as-is (untouched) — this update row does not change canonical_key.
`
    const index = parseConceptIds(text, MODULE)
    assert.equal(index.size, 0)
  })

  test('the first block wins when a corpus disagrees with itself', () => {
    const text = block('CON-FND-FIRST00000000', KEY, `${MODULE} > A > B > C`)
      + '\n---\n'
      + block('CON-FND-SECOND0000000', KEY, `${MODULE} > A > B > C`)
    const index = parseConceptIds(text, MODULE)
    assert.equal(index.get(KEY), 'CON-FND-FIRST00000000')
  })

  test('multiple files feeding one index end to end: key-hit reuses, key-miss mints', () => {
    // Mirrors what `existingConceptIds` in build-batches.ts actually does:
    // parse every hand-authored file for the module and merge into one map,
    // then resolve each concept a leaf declares against it.
    const fileOne = block(PINNED_ID, KEY, `${MODULE} > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds`)
    const otherKey = 'glycolysis.pyruvate-kinase-deficiency.haemolytic-anaemia'
    const otherPinnedId = 'CON-HEM-585B833F845F62'
    const fileTwo = block(otherPinnedId, otherKey, `${MODULE} > Biochemistry > Carbohydrate Metabolism > Glycolysis`)

    const pinned = new Map<string, string>()
    for (const text of [fileOne, fileTwo]) {
      for (const [key, id] of parseConceptIds(text, MODULE)) {
        if (!pinned.has(key)) pinned.set(key, id)
      }
    }

    // Key-hit: a leaf declaring `KEY` reuses the pinned id rather than minting.
    const hit = resolveConceptId(pinned, MODULE, SUBJECT, KEY)
    assert.equal(hit.id, PINNED_ID)
    assert.equal(hit.reused, true)

    // Key-hit, second concept, same module: also reused, its own id.
    const hitTwo = resolveConceptId(pinned, MODULE, 'haem', otherKey)
    assert.equal(hitTwo.id, otherPinnedId)
    assert.equal(hitTwo.reused, true)

    // Key-miss: a canonical_key neither file declares mints fresh.
    const miss = resolveConceptId(pinned, MODULE, SUBJECT, 'a-brand-new-key-nobody-has-authored-yet')
    assert.equal(miss.id, mintConceptId(MODULE, SUBJECT, 'a-brand-new-key-nobody-has-authored-yet'))
    assert.equal(miss.reused, false)
  })
})

describe('parseConceptModules reads canonical_key -> ## modules off batch markdown', () => {
  const block = (key: string, modules: string, moduleSubject: string) => `# Item

## id
CON-FND-AAAAAAAAAAAAAA

## canonical_key
${key}

## modules
${modules}

## module_subject
${moduleSubject}

## field_notes
n/a
`

  test('a hit carries the modules list, split the same way any ID list splits', () => {
    const text = block(KEY, `${MODULE} | 205 NEU`, `${MODULE} > Biochemistry > Bioenergetics`)
    const index = parseConceptModules(text, MODULE)
    assert.deepEqual(index.get(KEY), [MODULE, '205 NEU'])
  })

  test('scoped by module_subject the same way parseConceptIds is', () => {
    const text = block(KEY, MODULE_104, '104 CPS > Histology > Respiratory System')
    const index = parseConceptModules(text, MODULE)
    assert.equal(index.get(KEY), undefined)
  })

  test('a block with no ## modules is skipped, not thrown on', () => {
    const text = `# Item

## id
CON-FND-AAAAAAAAAAAAAA

## canonical_key
${KEY}

## module_subject
${MODULE} > Biochemistry > Bioenergetics

## field_notes
n/a
`
    const index = parseConceptModules(text, MODULE)
    assert.equal(index.size, 0)
  })

  test('agrees with parseConceptIds about which key a real 104 CPS record uses', () => {
    // The same record this file's resolveConceptId fixture reuses — module
    // already on the list, so a caller checking "is this module new here"
    // correctly gets false.
    const text = block(KEY_104, MODULE_104, `${MODULE_104} > Anatomy > Intercostal Spaces`)
    const ids = parseConceptIds(text, MODULE_104)
    const modules = parseConceptModules(text, MODULE_104)
    assert.equal(ids.get(KEY_104), 'CON-FND-AAAAAAAAAAAAAA', 'sanity: the same block is indexable by parseConceptIds too')
    assert.equal(modules.get(KEY_104)?.includes(MODULE_104), true)
  })
})
