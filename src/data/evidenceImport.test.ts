import test from 'node:test'
import assert from 'node:assert/strict'
import {
  EVIDENCE_IMPORT_FIELDS, evidenceErrors, linkCitationsToClaims,
  resourceFromRow, claimFromRow, citationFromRow, spanFromRow, hashText,
  type EvidenceContext,
} from './evidenceImport.ts'
import type { MedicalEvidenceStore } from './medicalEvidence.ts'

const store = {
  claims: [{ id: 'CLM-EXISTING' }],
  citations: [{ id: 'CIT-EXISTING' }],
  resources: [{ id: 'src_local' }, { id: 'RES-WEB-1' }],
  articleSpans: [],
} as unknown as MedicalEvidenceStore

const context: EvidenceContext = {
  store,
  conceptIds: new Set(['med.concept.plasma-membrane']),
  articleIds: new Set(['ART-FND-1']),
}

/* ---- resources --------------------------------------------------------- */

const RESOURCE: Record<string, string> = {
  id: 'RES-WEB-NCBI-1', title: 'Molecular Biology of the Cell — The Lipid Bilayer', institution: 'NCBI Bookshelf',
  collection_id: 'web', source_relative_path: '', source_uri: 'https://www.ncbi.nlm.nih.gov/books/NBK26871/',
  media_type: 'text/html', languages: 'en', publication_date: '2002-01-01', accessed_at: '2026-08-12',
  page_count: '', sha256: '', processing_status: 'authoritative_article_level_reference',
  rights: 'Free to read', qualification: 'Standard reference textbook', confidence: '0.95', is_assessment: 'no',
}

test('every evidence import field is exercised by a fixture', () => {
  const fixtures: Record<string, Record<string, string>> = { resource: RESOURCE, claim: CLAIM, citation: CITATION, span: SPAN }
  for (const [kind, fields] of Object.entries(EVIDENCE_IMPORT_FIELDS)) {
    const missing = fields.map((field) => field.key).filter((key) => !(key in fixtures[kind]))
    assert.deepEqual(missing, [], `${kind} fixture does not cover: ${missing.join(', ')}`)
  }
})

test('a web source without a date is rejected', () => {
  const errors = evidenceErrors('resource', { ...RESOURCE, publication_date: '' }, context)
  assert.ok(errors.some((error) => /publication or update date/.test(error)), errors.join(' | '))
})

test('a web source without an access date is rejected', () => {
  const errors = evidenceErrors('resource', { ...RESOURCE, accessed_at: '' }, context)
  assert.ok(errors.some((error) => /date you read it/.test(error)), errors.join(' | '))
})

test('an absolute authoring path is rejected', () => {
  const errors = evidenceErrors('resource', { ...RESOURCE, source_relative_path: '/Users/someone/Desktop/book.pdf' }, context)
  assert.ok(errors.some((error) => /relative to the corpus/.test(error)), errors.join(' | '))
})

test('a resource round-trips', () => {
  const resource = resourceFromRow(RESOURCE)
  assert.equal(resource.id, 'RES-WEB-NCBI-1')
  assert.equal(resource.sourceUri, 'https://www.ncbi.nlm.nih.gov/books/NBK26871/')
  assert.equal(resource.accessedAt, '2026-08-12')
  assert.deepEqual(resource.languages, ['en'])
  assert.equal(resource.isAssessment, false)
})

/* ---- claims ------------------------------------------------------------ */

const CLAIM: Record<string, string> = {
  id: 'CLM-1', concept_id: 'med.concept.plasma-membrane', subject: 'The plasma membrane', predicate: 'is',
  object: 'a lipid bilayer', display_text: 'The plasma membrane is a lipid bilayer.',
  risk_class: 'foundational_stable', verification_status: 'needs_evidence', conflict_status: 'none',
  confidence: '0.95', freshness: 'stable_foundational_fact', time_sensitive: 'no', review_due: '',
  qualifiers: 'polarity: affirmative',
}

test('a claim round-trips with its qualifiers', () => {
  const claim = claimFromRow(CLAIM)
  assert.equal(claim.conceptId, 'med.concept.plasma-membrane')
  assert.deepEqual(claim.qualifiers, { polarity: 'affirmative' })
  assert.equal(claim.timeSensitive, false)
  assert.deepEqual(evidenceErrors('claim', CLAIM, context), [])
})

test('a claim on a concept that does not exist is rejected', () => {
  const errors = evidenceErrors('claim', { ...CLAIM, concept_id: 'med.concept.nope' }, context)
  assert.ok(errors.some((error) => /does not exist/.test(error)), errors.join(' | '))
})

test('a claim cannot be verified without a citation', () => {
  const errors = evidenceErrors('claim', { ...CLAIM, verification_status: 'verified' }, context)
  assert.ok(errors.some((error) => /citation that counts as evidence/.test(error)), errors.join(' | '))
})

test('a citation arriving in the same batch supports its claim', () => {
  // The claim row does not repeat its citation IDs — the citation names its
  // claim, and the reverse is filled in at commit. Without this the validator
  // would reject every verified claim in a well-formed batch.
  const together = { ...context, incoming: { claimsWithEvidence: new Set(['CLM-1']) } }
  assert.deepEqual(evidenceErrors('claim', { ...CLAIM, verification_status: 'verified' }, together), [])
})

test('a treatment claim needs two supports even when they arrive together', () => {
  const one = { ...context, incoming: { claimsWithEvidence: new Set(['CLM-1']), evidenceCountByClaim: new Map([['CLM-1', 1]]) } }
  const errors = evidenceErrors('claim', { ...CLAIM, risk_class: 'treatment_or_action', verification_status: 'verified' }, one)
  assert.ok(errors.some((error) => /two independent citations/.test(error)), errors.join(' | '))

  const two = { ...context, incoming: { claimsWithEvidence: new Set(['CLM-1']), evidenceCountByClaim: new Map([['CLM-1', 2]]) } }
  assert.deepEqual(evidenceErrors('claim', { ...CLAIM, risk_class: 'treatment_or_action', verification_status: 'verified' }, two), [])
})

test('a treatment claim needs two independent citations to be verified', () => {
  const errors = evidenceErrors('claim', { ...CLAIM, risk_class: 'treatment_or_action', verification_status: 'verified', citation_ids: 'CIT-EXISTING' }, context)
  assert.ok(errors.some((error) => /two independent citations/.test(error)), errors.join(' | '))
})

test('a time-sensitive claim needs a review-due date', () => {
  const errors = evidenceErrors('claim', { ...CLAIM, time_sensitive: 'yes' }, context)
  assert.ok(errors.some((error) => /review-due date/.test(error)), errors.join(' | '))
})

/* ---- citations --------------------------------------------------------- */

const CITATION: Record<string, string> = {
  id: 'CIT-1', claim_id: 'CLM-EXISTING', resource_id: 'src_local', evidence_role: 'local_curriculum',
  support_span: 'The cell membrane is a lipid bilayer.', locator_type: 'page', locator_page: '2',
  locator_section: '', locator_detail: '', context_note: '', confidence: '0.9', counts_as_claim_evidence: 'yes',
}

test('a citation round-trips with its locator', () => {
  const citation = citationFromRow(CITATION)
  assert.equal(citation.claimId, 'CLM-EXISTING')
  assert.deepEqual(citation.locator, { type: 'page', page: 2 })
  assert.equal(citation.countsAsClaimEvidence, true)
  assert.deepEqual(evidenceErrors('citation', CITATION, context), [])
})

test('a citation counting as evidence without a locator is rejected', () => {
  const errors = evidenceErrors('citation', { ...CITATION, locator_page: '', locator_type: '' }, context)
  assert.ok(errors.some((error) => /exact locator/.test(error)), errors.join(' | '))
})

test('a citation with no support span is rejected', () => {
  const errors = evidenceErrors('citation', { ...CITATION, support_span: '' }, context)
  assert.ok(errors.some((error) => /own words/.test(error)), errors.join(' | '))
})

test('a citation pointing at an unknown resource is rejected', () => {
  const errors = evidenceErrors('citation', { ...CITATION, resource_id: 'src_missing' }, context)
  assert.ok(errors.some((error) => /Resource src_missing does not exist/.test(error)), errors.join(' | '))
})

test('a claim arriving in the same file satisfies its citation', () => {
  const withIncoming = { ...context, incoming: { claims: new Set(['CLM-NEW']) } }
  assert.deepEqual(evidenceErrors('citation', { ...CITATION, claim_id: 'CLM-NEW' }, withIncoming), [])
})

/* ---- spans ------------------------------------------------------------- */

const SPAN: Record<string, string> = {
  id: 'SPN-1', article_id: 'ART-FND-1', section_id: 'definition',
  text: 'The plasma membrane is a lipid bilayer.', text_hash: '',
  claim_ids: 'CLM-EXISTING', citation_ids: 'CIT-EXISTING',
}

test('a span derives a stable text hash when none is given', () => {
  const span = spanFromRow(SPAN)
  assert.equal(span.textHash, hashText('The plasma membrane is a lipid bilayer.'))
  assert.equal(spanFromRow(SPAN).textHash, span.textHash)
  assert.deepEqual(evidenceErrors('span', SPAN, context), [])
})

test('a span on an article that does not exist is rejected', () => {
  const errors = evidenceErrors('span', { ...SPAN, article_id: 'ART-NOPE' }, context)
  assert.ok(errors.some((error) => /Article ART-NOPE does not exist/.test(error)), errors.join(' | '))
})

/* ---- reciprocal linking ------------------------------------------------ */

test('a claim picks up the citations that name it', () => {
  const claims = [claimFromRow(CLAIM)]
  const citations = [citationFromRow({ ...CITATION, id: 'CIT-A', claim_id: 'CLM-1' }), citationFromRow({ ...CITATION, id: 'CIT-B', claim_id: 'CLM-1' })]
  const linked = linkCitationsToClaims(claims, citations)
  assert.deepEqual(linked[0].citationIds, ['CIT-A', 'CIT-B'])
  // Idempotent: re-linking the same pair changes nothing.
  assert.deepEqual(linkCitationsToClaims(linked, citations)[0].citationIds, ['CIT-A', 'CIT-B'])
})
