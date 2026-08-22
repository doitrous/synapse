import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { mintConceptId, parseConceptIds, resolveConceptId } from '../../scripts/kasr/seeds/types.ts'

/**
 * One canonical_key -> one id, within a module — even when the id already on
 * record was never minted by `mintConceptId` in the first place.
 *
 * 103 BMS's hand-authored concept files are minted by a different tool
 * (`Instruction Manual for Content Creation/tools/mint-concept-id.mjs`, which
 * hashes the canonical_key alone, with no module salt) and those ids are
 * pinned: a build script re-minting a live record is not its call to make.
 * `resolveConceptId` is what a build checks before minting anything, and
 * `parseConceptIds` is how it learns what a module already calls a key,
 * straight out of a concept batch's own markdown — no file system, so both
 * are true unit tests rather than fixtures on disk.
 */
const MODULE = '103 BMS'
const SUBJECT = 'fnd'
const KEY = 'bioenergetics.bonds.high-energy-threshold'
// The real pinned id for this key in
// docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md —
// sha256(KEY) truncated, with no module salt, which is why it can never equal
// what mintConceptId derives for the same key.
const PINNED_ID = 'CON-FND-7228237A5897B5'

describe('resolveConceptId: key-hit reuses, key-miss mints', () => {
  test('a key with no entry in the pinned map mints, and says so', () => {
    const pinned = new Map<string, string>()
    const resolved = resolveConceptId(pinned, MODULE, SUBJECT, KEY)
    assert.equal(resolved.id, mintConceptId(MODULE, SUBJECT, KEY))
    assert.equal(resolved.reused, false)
  })

  test('a key whose pinned id disagrees with a fresh mint reuses the pinned id', () => {
    const pinned = new Map([[KEY, PINNED_ID]])
    const resolved = resolveConceptId(pinned, MODULE, SUBJECT, KEY)
    assert.equal(resolved.id, PINNED_ID)
    assert.notEqual(PINNED_ID, mintConceptId(MODULE, SUBJECT, KEY),
      'the fixture only proves anything if the pinned id truly differs from a fresh mint')
    assert.equal(resolved.reused, true)
  })

  test('a pinned id that already agrees with a fresh mint is not a reuse', () => {
    // The common case: most hand-authored concepts were themselves minted
    // with mintConceptId, so the "pinned" id and a fresh mint usually just
    // agree — 101 ISK's own `101-ISK-practical-concepts.md` shares six
    // canonical_keys with `101-ISK-mcq-concepts.md` this way. Treating
    // agreement as a reuse would demote every one of those six to a sparse
    // update row for no reason, which is exactly the regression the 101 ISK
    // byte-identity proof exists to catch.
    const already = mintConceptId(MODULE, SUBJECT, KEY)
    const pinned = new Map([[KEY, already]])
    const resolved = resolveConceptId(pinned, MODULE, SUBJECT, KEY)
    assert.equal(resolved.id, already)
    assert.equal(resolved.reused, false)
  })
})

describe('parseConceptIds reads canonical_key -> id off batch markdown', () => {
  const block = (id: string, key: string, moduleSubject: string) => `# Item

## id
${id}

## label
Something

## canonical_key
${key}

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
