import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { appendEnrichment, ENRICHMENT_HEADING, type EnrichmentClaim } from '../../scripts/kasr/emit.ts'

/**
 * `appendEnrichment` is the mechanical step that turns a correct answer's
 * bare explanation into one that also carries the department book's own
 * words: up to 3 claims, verified ones first — or, absent any locatable
 * claim, the concept's own definition sentence. A claim still needs a
 * locatable page to be trusted enough to appear at all, but per the owner's
 * rule the department book is never named to students, so the page is not
 * printed in the output. It is pure (no disk, no `ModuleRef`) precisely so
 * this file can drive it with fixture claims instead of real evidence files.
 */

const claim = (text: string, verified: boolean, page: number): EnrichmentClaim => ({ text, verified, page })

describe('appendEnrichment appends the department book\'s own words', () => {
  test('2 verified + 2 unverified claims: exactly 3 appended, verified first', () => {
    const explanation = 'This is the correct answer because of the mechanism described above.'
    const claims: EnrichmentClaim[] = [
      claim('The unverified claim stated first in the file.', false, 12),
      claim('The first verified claim in the file.', true, 40),
      claim('A second unverified claim later in the file.', false, 55),
      claim('The second verified claim in the file.', true, 61),
    ]

    const result = appendEnrichment(explanation, claims, 'Fallback definition sentence.')

    // Original text is untouched above the heading.
    assert.ok(result.startsWith(explanation))
    assert.ok(result.includes(ENRICHMENT_HEADING))

    const bulletLines = result
      .slice(result.indexOf(ENRICHMENT_HEADING) + ENRICHMENT_HEADING.length)
      .trim()
      .split('\n')
    assert.equal(bulletLines.length, 3, 'exactly 3 claims appended, not all 4')

    // Verified claims come first, in the order they appeared in the file.
    assert.equal(bulletLines[0], '- The first verified claim in the file.')
    assert.equal(bulletLines[1], '- The second verified claim in the file.')
    // The third slot is filled by an unverified claim (there are only 2 verified).
    assert.equal(bulletLines[2], '- The unverified claim stated first in the file.')

    // No line names the department book or cites a page — student-facing
    // text never surfaces the source, only the claim's own words.
    for (const line of bulletLines) {
      assert.doesNotMatch(line, /department book/)
    }
  })

  test('no locatable claims: falls back to the concept\'s definition sentence', () => {
    const explanation = 'This option is correct.'
    const result = appendEnrichment(explanation, [], 'A concept is defined here. A second sentence follows.')

    assert.ok(result.includes(ENRICHMENT_HEADING))
    assert.ok(result.includes('- A concept is defined here.'))
    // Only the first sentence of the definition is used, not the whole thing.
    assert.ok(!result.includes('A second sentence follows.'))
  })

  test('a candidate already present verbatim in the explanation is skipped', () => {
    const explanation = 'This is right. The heart has four chambers, as noted above.'
    const claims: EnrichmentClaim[] = [
      claim('The heart has four chambers', true, 8),
      claim('The aorta arises from the left ventricle.', true, 9),
    ]

    const result = appendEnrichment(explanation, claims, 'fallback')
    const appended = result.slice(explanation.length)

    // The first claim's text is already a substring of the explanation
    // (the explanation's trailing clause reads "The heart has four chambers,
    // as noted above."), so it is skipped rather than repeated verbatim.
    assert.ok(!appended.includes('The heart has four chambers'))
    assert.ok(appended.includes('The aorta arises from the left ventricle.'))
  })

  test('every candidate a duplicate: explanation returned byte-for-byte unchanged', () => {
    const explanation = 'This is right. The heart has four chambers.'
    const claims: EnrichmentClaim[] = [claim('The heart has four chambers.', true, 8)]

    const result = appendEnrichment(explanation, claims, 'fallback')
    assert.equal(result, explanation)
  })

  test('idempotent: running twice on its own output changes nothing further', () => {
    const explanation = 'This is right because of the underlying process.'
    const claims: EnrichmentClaim[] = [
      claim('A verified fact about the concept.', true, 21),
      claim('An unverified fact about the concept.', false, 34),
    ]

    const once = appendEnrichment(explanation, claims, 'fallback definition sentence.')
    const twice = appendEnrichment(once, claims, 'fallback definition sentence.')
    assert.equal(twice, once)
  })
})
