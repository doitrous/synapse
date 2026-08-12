import test from 'node:test'
import assert from 'node:assert/strict'
import { calloutVerdicts, publishableCallouts } from './calloutPolicy.ts'
import type { ArticleAuthoringData } from './contentControl.ts'
import type { MedicalEvidenceStore } from './medicalEvidence.ts'

const TRAP = 'Ordering D-dimer when CTPA is already indicated.'
const HOLD = 'Anticoagulation should not wait in a high-probability patient.'
const DRAFT_TRAP = 'An unreviewed trap nobody has checked.'

const evidence = {
  claims: [{ id: 'claim-1' }],
  citations: [{ id: 'cite-1' }],
  articleSpans: [{ id: 'span-1' }],
} as unknown as MedicalEvidenceStore

const article = (data: Partial<ArticleAuthoringData>): ArticleAuthoringData =>
  ({ summary: '', body: '', sections: [], holdThese: [], loseTheMark: [], questionIds: [], resourceIds: [], annotations: [], ...data }) as ArticleAuthoringData

/* 1. The exact reviewed authored trap is visible after publication. */
test('a reviewed trap survives the evidence gate on a published article', () => {
  const data = article({
    publishedSections: [],
    loseTheMark: [TRAP],
    calloutEvidence: { [TRAP]: { claimIds: ['claim-1'] } },
  })
  assert.deepEqual(publishableCallouts('trap', data, evidence), [TRAP])
})

test('an article-level review publishes its callouts without per-line evidence', () => {
  const data = article({ publishedSections: [], loseTheMark: [TRAP], lastReviewed: '2026-08-11' })
  assert.deepEqual(publishableCallouts('trap', data, evidence), [TRAP])
})

/* 2. Generic fallback text is not substituted when authored traps exist. */
test('publishable traps are returned verbatim, never replaced', () => {
  const data = article({
    publishedSections: [],
    loseTheMark: [TRAP],
    calloutEvidence: { [TRAP]: { spanId: 'span-1' } },
  })
  const published = publishableCallouts('trap', data, evidence)
  // The reader renders exactly this array. Nothing generic can reach a student
  // while an authored trap is publishable.
  assert.equal(published.length, 1)
  assert.equal(published[0], TRAP)
})

/* 3. Unverified draft traps remain hidden. */
test('a trap with no evidence and no review stays hidden on a gated article', () => {
  const data = article({ publishedSections: [], loseTheMark: [DRAFT_TRAP] })
  assert.deepEqual(publishableCallouts('trap', data, evidence), [])
  assert.equal(calloutVerdicts('trap', data, evidence)[0].reason, 'No evidence and no recorded review')
})

test('a trap naming evidence that does not resolve stays hidden', () => {
  const data = article({
    publishedSections: [],
    loseTheMark: [DRAFT_TRAP],
    calloutEvidence: { [DRAFT_TRAP]: { claimIds: ['claim-missing'] } },
  })
  assert.deepEqual(publishableCallouts('trap', data, evidence), [])
  assert.match(calloutVerdicts('trap', data, evidence)[0].reason, /does not resolve/)
})

test('a mixed article publishes only the reviewed lines', () => {
  const data = article({
    publishedSections: [],
    loseTheMark: [TRAP, DRAFT_TRAP],
    calloutEvidence: { [TRAP]: { citationIds: ['cite-1'] } },
  })
  assert.deepEqual(publishableCallouts('trap', data, evidence), [TRAP])
})

/* 4. "Hold these" follows the same stated evidence policy. */
test('hold-these obeys the same policy as traps', () => {
  const gated = article({
    publishedSections: [],
    holdThese: [HOLD, 'Unreviewed key point.'],
    calloutEvidence: { [HOLD]: { claimIds: ['claim-1'] } },
  })
  assert.deepEqual(publishableCallouts('hold', gated, evidence), [HOLD])
})

test('an article that was never evidence-gated publishes its callouts as before', () => {
  const ungated = article({ holdThese: [HOLD], loseTheMark: [TRAP] })
  assert.deepEqual(publishableCallouts('hold', ungated, evidence), [HOLD])
  assert.deepEqual(publishableCallouts('trap', ungated, evidence), [TRAP])
  assert.equal(calloutVerdicts('hold', ungated, evidence)[0].reason, 'Article is not evidence-gated')
})

/* 5. The admin can see why a callout is or is not publishable. */
test('every callout carries an admin-readable reason', () => {
  const data = article({
    publishedSections: [],
    loseTheMark: [TRAP, DRAFT_TRAP],
    calloutEvidence: { [TRAP]: { reviewedBy: 'Dr Omar' } },
  })
  const verdicts = calloutVerdicts('trap', data, evidence)
  assert.equal(verdicts.length, 2)
  assert.equal(verdicts[0].publishable, true)
  assert.equal(verdicts[0].reason, 'Reviewed by Dr Omar')
  assert.equal(verdicts[1].publishable, false)
  assert.ok(verdicts[1].reason.length > 0)
  // Every verdict names its line, so the editor can show the reason beside it.
  assert.deepEqual(verdicts.map((verdict) => verdict.text), [TRAP, DRAFT_TRAP])
})

test('blank callout lines are dropped rather than published as empty rows', () => {
  const data = article({ loseTheMark: ['', '   ', TRAP] })
  assert.deepEqual(publishableCallouts('trap', data, evidence), [TRAP])
})
