import test from 'node:test'
import assert from 'node:assert/strict'
import { AR } from '../i18n-ar.ts'
import {
  MEASUREMENT_SEPARATION, PREDICTION_CAVEAT, STATUS_EXPLANATION,
  WRONG_ATTEMPTS_VS_WEAK_CONCEPTS,
} from './explain.ts'
import { CONCEPT_STATUS_LABEL } from './masteryModel.ts'
import { NEED_LABEL, NON_NEGOTIABLE_CONSTRAINTS, RELAXABLE_CONSTRAINT_LABEL } from './config.ts'

/**
 * The "How this works" tab is the page a student opens when they disagree with
 * a status the algorithm gave them. A student studying in Arabic who finds that
 * page in English cannot do the one thing it exists for.
 *
 * These tests bind the shared constants to their translations. Editing a
 * sentence in `explain.ts` without updating `i18n-ar.ts` silently falls back to
 * English at runtime — the fallback keeps the page working, which is exactly why
 * nobody would notice. This is what notices.
 */

/** Every string the rules surface renders from a shared constant. */
const PUBLISHED_STRINGS: string[] = [
  ...Object.values(STATUS_EXPLANATION),
  WRONG_ATTEMPTS_VS_WEAK_CONCEPTS.heading,
  WRONG_ATTEMPTS_VS_WEAK_CONCEPTS.body,
  MEASUREMENT_SEPARATION.adaptive.heading,
  MEASUREMENT_SEPARATION.adaptive.body,
  MEASUREMENT_SEPARATION.readiness.heading,
  MEASUREMENT_SEPARATION.readiness.body,
  PREDICTION_CAVEAT,
  ...Object.values(CONCEPT_STATUS_LABEL),
  ...Object.values(NEED_LABEL),
  ...NON_NEGOTIABLE_CONSTRAINTS,
  ...Object.values(RELAXABLE_CONSTRAINT_LABEL),
]

test('every published rule string has an Arabic translation', () => {
  const missing = PUBLISHED_STRINGS.filter((source) => !AR[source])
  assert.deepEqual(missing, [], `untranslated: ${missing.map((s) => `\n  ${s}`).join('')}`)
})

test('no translation is left as its own English source', () => {
  // A copy-pasted entry passes the presence check above while translating
  // nothing, and reads as a finished job to anyone scanning the file.
  const untranslated = PUBLISHED_STRINGS.filter((source) => AR[source] === source)
  assert.deepEqual(untranslated, [])
})

test('every status label and its explanation are both translated', () => {
  // The pair matters: a translated label beside an English explanation is worse
  // than neither, because it looks deliberate.
  for (const status of Object.keys(CONCEPT_STATUS_LABEL) as Array<keyof typeof CONCEPT_STATUS_LABEL>) {
    assert.ok(AR[CONCEPT_STATUS_LABEL[status]], `label for ${status}`)
    assert.ok(AR[STATUS_EXPLANATION[status]], `explanation for ${status}`)
  }
})

test('the relaxation order is fully translated, so its published order is readable', () => {
  for (const label of Object.values(RELAXABLE_CONSTRAINT_LABEL)) {
    assert.ok(AR[label], `relaxable constraint: ${label}`)
  }
})

test('the non-negotiable constraints are translated', () => {
  // These are the promises the product makes about content safety. A promise a
  // student cannot read is not a promise.
  for (const rule of NON_NEGOTIABLE_CONSTRAINTS) {
    assert.ok(AR[rule], `constraint: ${rule}`)
  }
})

test('Arabic entries carry Arabic script rather than transliteration', () => {
  const arabic = /[؀-ۿ]/
  for (const source of PUBLISHED_STRINGS) {
    assert.ok(arabic.test(AR[source] ?? ''), `not Arabic script: ${source}`)
  }
})

test('the two measurement systems are described separately in Arabic too', () => {
  // The separation is the product's central claim. If the two bodies collapsed
  // to the same string in translation, the claim would disappear in Arabic
  // while still reading correctly in English.
  assert.notEqual(
    AR[MEASUREMENT_SEPARATION.adaptive.body],
    AR[MEASUREMENT_SEPARATION.readiness.body],
  )
  assert.notEqual(
    AR[MEASUREMENT_SEPARATION.adaptive.heading],
    AR[MEASUREMENT_SEPARATION.readiness.heading],
  )
})

test('translations are distinct wherever the English is distinct', () => {
  // Two different rules sharing one translation would silently merge them in the
  // relaxation order, which is published as an ordered list of distinct steps.
  const labels = Object.values(RELAXABLE_CONSTRAINT_LABEL)
  const translated = labels.map((label) => AR[label])
  assert.equal(new Set(translated).size, labels.length)
})
