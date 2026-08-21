import test from 'node:test'
import assert from 'node:assert/strict'
import {
  CONCEPT_IMPORT_FIELDS, RELATION_IMPORT_FIELDS, conceptFromRow, materialiseNewConcept, mergeConcept,
  relationFromRow, relationErrors, isDuplicateRelation, relationIdFrom, conceptIdFrom,
} from './conceptImport.ts'
import { upsertRecords } from './importMerge.ts'
import type { ConceptGraph } from './conceptGraph.ts'

const FULL_CONCEPT: Record<string, string> = {
  label: 'Anion gap',
  id: 'med.concept.anion-gap',
  canonical_key: 'anion-gap',
  aliases: 'AG | Serum anion gap',
  arabic_label: 'فجوة الأنيونات',
  arabic_aliases: 'الفجوة الأنيونية',
  definition: 'The calculated difference between measured serum cations and anions.',
  explicit_objective: 'Calculate the anion gap and state what a raised gap implies.',
  pitfalls: 'Forgetting to calculate it in every metabolic acidosis.',
  concept_type: 'definition',
  status: 'active',
  subject: 'renal',
  topic: 'Acid–base balance',
  subtopic: 'Metabolic acidosis',
  microtopic: 'Anion gap',
  nanotopic: 'Delta ratio',
  primary_node_id: 'SYS-REN-T02',
  secondary_node_ids: 'DIS-PHY | KNW-DIA',
  learner_years: '2 | 3',
  universities: 'HU | ASU',
  modules: 'REN 01',
  article_ids: 'ART-REN-ACID-BASE',
  related_article_ids: 'ART-REN-TUBULAR',
  related_concept_ids: 'med.concept.metabolic-acidosis',
  resource_ids: 'r-deranged',
  approved_file_resource_ids: 'r-deranged',
  approved_video_resource_ids: 'r-video-abg',
  blueprint_weight: '0.6',
  exam_weight_by_year: 'HU_Y2=0.6 | HU_Y3=0.4',
  clinical_relevance: '0.7',
  academic_relevance: '0.8',
  weight_confidence: '0.5',
  exam_signal: 'src_1a2b3c4d5e6f | end_of_year | 2025 | p14 | 101 ISK\nsrc_9f8e7d6c5b4a | orientation | 2024',
  module_subject: '101 ISK > Anatomy > Upper Limb',
  confidence: '0.9',
  support_mode: 'direct_statement',
  atomic_claim_ids: 'claim-ag-1',
  resource_occurrence_ids: 'occ-ag-1',
  source_candidate_ids: 'cand-ag-1',
  original_wording: 'the difference between measured cations and anions',
  merge_ids: 'merge-ag-1',
  rejected_merge_candidate_ids: 'cand-ag-9',
  conflicts: 'Albumin correction taught differently by faculty',
  uncertainty: 'Whether to correct for albumin routinely',
  evidence_gaps: 'No Egyptian reference range sourced',
  owner: 'Dr Omar',
  reviewer: 'Dr Omar',
  final_publisher: 'Dr Omar',
  last_reviewed: '2026-08-11',
  review_due: '2027-08-11',
  publication_status: 'needs_evidence',
  editorial_review_status: 'editorially_reviewed_needs_independent_evidence',
  exclusion_reason: '',
  field_notes: 'moduleIds: awaiting a verified live module ID',
}

test('every concept import field is exercised by the round-trip fixture', () => {
  const missing = CONCEPT_IMPORT_FIELDS.map((field) => field.key).filter((key) => !(key in FULL_CONCEPT))
  assert.deepEqual(missing, [], `fixture does not cover: ${missing.join(', ')}`)
})

test('a fully populated concept row imports with every field present', () => {
  const concept = materialiseNewConcept(conceptFromRow(FULL_CONCEPT))
  assert.equal(concept.id, 'med.concept.anion-gap')
  assert.equal(concept.canonicalKey, 'anion-gap')
  assert.deepEqual(concept.aliases, ['AG', 'Serum anion gap'])
  assert.equal(concept.arabicLabel, 'فجوة الأنيونات')
  assert.deepEqual(concept.arabicAliases, ['الفجوة الأنيونية'])
  assert.equal(concept.explicitObjective, 'Calculate the anion gap and state what a raised gap implies.')
  assert.equal(concept.conceptType, 'definition')
  assert.equal(concept.status, 'active')
  assert.deepEqual(concept.articleIds, ['ART-REN-ACID-BASE'])
  assert.deepEqual(concept.secondaryNodeIds, ['DIS-PHY', 'KNW-DIA'])
  assert.deepEqual(concept.learnerYears, [2, 3])
  assert.deepEqual(concept.examWeightByYear, { HU_Y2: 0.6, HU_Y3: 0.4 })
  assert.equal(concept.weightConfidence, 0.5)
  assert.deepEqual(concept.atomicClaimIds, ['claim-ag-1'])
  assert.deepEqual(concept.mergeIds, ['merge-ag-1'])
  assert.deepEqual(concept.rejectedMergeCandidateIds, ['cand-ag-9'])
  assert.deepEqual(concept.conflicts, ['Albumin correction taught differently by faculty'])
  assert.deepEqual(concept.uncertainty, ['Whether to correct for albumin routinely'])
  assert.equal(concept.publicationStatus, 'needs_evidence')
  assert.equal(concept.fieldNotes?.moduleIds, 'awaiting a verified live module ID')
})

test('a concept id is derived from its label when omitted', () => {
  assert.equal(conceptIdFrom('Anion gap'), 'med.concept.anion-gap')
  assert.equal(conceptFromRow({ label: 'Anion gap' }).id, 'med.concept.anion-gap')
})

test('an update keeps every field the row did not mention', () => {
  const existing = materialiseNewConcept(conceptFromRow(FULL_CONCEPT))
  const patch = conceptFromRow({ label: 'Anion gap', id: 'med.concept.anion-gap', definition: 'A revised definition.' })
  const merged = mergeConcept(existing, patch)

  assert.equal(merged.definition, 'A revised definition.')
  // The old importer forced these to empty on every row it touched.
  assert.deepEqual(merged.articleIds, ['ART-REN-ACID-BASE'])
  assert.deepEqual(merged.aliases, ['AG', 'Serum anion gap'])
  assert.deepEqual(merged.atomicClaimIds, ['claim-ag-1'])
  assert.deepEqual(merged.mergeIds, ['merge-ag-1'])
  assert.equal(merged.reviewer, 'Dr Omar')
  assert.equal(merged.weightConfidence, 0.5)
})

test('a definition survives an update that does not mention it', () => {
  const existing = materialiseNewConcept(conceptFromRow(FULL_CONCEPT))
  // A status-only patch is the real case: folding a duplicate, or moving a
  // concept between subjects, touches governance and nothing a student reads.
  const merged = mergeConcept(existing, conceptFromRow({ label: 'Anion gap', id: 'med.concept.anion-gap', status: 'inactive' }))
  assert.equal(merged.status, 'inactive')
  assert.equal(merged.definition, FULL_CONCEPT.definition)
})

test('a new concept without a definition still carries the empty string', () => {
  assert.equal(materialiseNewConcept(conceptFromRow({ label: 'Anion gap' })).definition, '')
})

test('merge lineage survives an update that does not mention it', () => {
  const existing = materialiseNewConcept(conceptFromRow(FULL_CONCEPT))
  const merged = mergeConcept(existing, conceptFromRow({ label: 'Anion gap', id: 'med.concept.anion-gap', pitfalls: 'New pitfall.' }))
  assert.deepEqual(merged.mergeIds, ['merge-ag-1'])
  assert.deepEqual(merged.rejectedMergeCandidateIds, ['cand-ag-9'])
  assert.deepEqual(merged.sourceCandidateIds, ['cand-ag-1'])
  assert.deepEqual(merged.originalWording, ['the difference between measured cations and anions'])
})

test('field notes accumulate rather than replace', () => {
  const existing = materialiseNewConcept(conceptFromRow(FULL_CONCEPT))
  const merged = mergeConcept(existing, conceptFromRow({ label: 'Anion gap', id: 'med.concept.anion-gap', field_notes: 'pitfalls: none specific to this concept' }))
  assert.equal(merged.fieldNotes?.moduleIds, 'awaiting a verified live module ID')
  assert.equal(merged.fieldNotes?.pitfalls, 'none specific to this concept')
})

test('a leading + adds to a concept list rather than replacing it', () => {
  const existing = materialiseNewConcept(conceptFromRow(FULL_CONCEPT))
  // The whole point of `+`: add one alias without having to re-type the two
  // that are already there. Replacing them is silent data loss.
  const merged = mergeConcept(existing, conceptFromRow({ label: 'Anion gap', id: 'med.concept.anion-gap', aliases: '+Delta gap' }))
  assert.deepEqual(merged.aliases, ['AG', 'Serum anion gap', 'Delta gap'])
  // A list the row did not mention is still untouched.
  assert.deepEqual(merged.articleIds, ['ART-REN-ACID-BASE'])
})

test('re-importing the same + row does not duplicate the entry', () => {
  const existing = materialiseNewConcept(conceptFromRow(FULL_CONCEPT))
  const row = { label: 'Anion gap', id: 'med.concept.anion-gap', article_ids: '+ART-REN-DELTA' }
  const once = mergeConcept(existing, conceptFromRow(row))
  const twice = mergeConcept(once, conceptFromRow(row))
  assert.deepEqual(once.articleIds, ['ART-REN-ACID-BASE', 'ART-REN-DELTA'])
  assert.deepEqual(twice.articleIds, ['ART-REN-ACID-BASE', 'ART-REN-DELTA'])
})

test('a leading + appends to a numeric list too', () => {
  const existing = materialiseNewConcept(conceptFromRow(FULL_CONCEPT))
  // `learnerYears` is parsed through a number conversion on the way out of the
  // row, which is exactly the kind of step that used to drop the append intent.
  const merged = mergeConcept(existing, conceptFromRow({ label: 'Anion gap', id: 'med.concept.anion-gap', learner_years: '+4' }))
  assert.deepEqual(merged.learnerYears, [2, 3, 4])
})

test('[clear] empties a concept list on purpose', () => {
  const existing = materialiseNewConcept(conceptFromRow(FULL_CONCEPT))
  const merged = mergeConcept(existing, conceptFromRow({ label: 'Anion gap', id: 'med.concept.anion-gap', conflicts: '[clear]' }))
  assert.deepEqual(merged.conflicts, [])
  assert.deepEqual(merged.uncertainty, ['Whether to correct for albumin routinely'])
})

/* ---- upsert: create versus update --------------------------------------- */

/**
 * These exercise the upsert rather than `mergeConcept` alone, because that is
 * where the damage happened. The merge rules were always right; the importer
 * materialised every incoming row *before* asking whether the row was a create
 * or an update, so a three-field update arrived carrying a full set of `null`s
 * and overwrote twenty fields on the live concept. Five of them — `systemId`,
 * `topicTagId`, `secondaryNodeIds`, `evidenceGaps`, `resourceOccurrenceIds` —
 * disappeared with no audit diagnostic, because a `null` still satisfies a
 * "field is present" check.
 */
const PARTIAL_UPDATE: Record<string, string> = {
  id: 'med.concept.anion-gap',
  label: 'Anion gap',
  definition: 'Probe definition change.',
}

/** The live concept as the graph holds it: created once, fully materialised. */
const liveConcept = () => materialiseNewConcept(conceptFromRow(FULL_CONCEPT, {
  subjectId: 'renal', systemId: 'SYS_RENAL', topicTagId: 'TPC_RENAL_ACID_BASE',
}))

test('a partial concept update changes only the fields it mentions', () => {
  const before = liveConcept()
  const { records, created, updated } = upsertRecords([before], [conceptFromRow(PARTIAL_UPDATE)], {
    merge: mergeConcept,
    materialise: materialiseNewConcept,
  })

  assert.equal(created, 0)
  assert.equal(updated, 1)
  assert.equal(records.length, 1)

  // Exhaustive on purpose. Listing the fields by hand is how twenty silent
  // losses hid behind a test that checked six of them.
  const after = records[0] as unknown as Record<string, unknown>
  const original = before as unknown as Record<string, unknown>
  const changed = [...new Set([...Object.keys(original), ...Object.keys(after)])]
    .filter((key) => JSON.stringify(original[key]) !== JSON.stringify(after[key]))
  assert.deepEqual(changed, ['definition'])
  assert.equal(after.definition, 'Probe definition change.')
})

test('an update never materialises the blanks a new record needs', () => {
  const [updated] = upsertRecords([liveConcept()], [conceptFromRow(PARTIAL_UPDATE)], {
    merge: mergeConcept,
    materialise: materialiseNewConcept,
  }).records

  // The exact fields the live medical library lost, named so a regression here
  // reads as the bug it is rather than as one line of a deep-equal diff.
  assert.deepEqual(updated.articleIds, ['ART-REN-ACID-BASE'])
  assert.deepEqual(updated.secondaryNodeIds, ['DIS-PHY', 'KNW-DIA'])
  assert.equal(updated.systemId, 'SYS_RENAL')
  assert.equal(updated.topicTagId, 'TPC_RENAL_ACID_BASE')
  assert.deepEqual(updated.resourceOccurrenceIds, ['occ-ag-1'])
  assert.deepEqual(updated.evidenceGaps, ['No Egyptian reference range sourced'])
  assert.equal(updated.lastReviewed, '2026-08-11')
  assert.equal(updated.arabicLabel, 'فجوة الأنيونات')
  assert.equal(updated.pitfalls, FULL_CONCEPT.pitfalls)
})

test('[clear] still empties a field through the upsert', () => {
  const [updated] = upsertRecords([liveConcept()], [conceptFromRow({
    ...PARTIAL_UPDATE, conflicts: '[clear]', secondary_node_ids: '[clear]', evidence_gaps: '[clear]',
  })], { merge: mergeConcept, materialise: materialiseNewConcept }).records

  // Preserving unmentioned fields must not cost the author the ability to empty
  // one on purpose. `[clear]` is the only way to say it, so it has to survive.
  assert.deepEqual(updated.conflicts, [])
  assert.deepEqual(updated.secondaryNodeIds, [])
  assert.deepEqual(updated.evidenceGaps, [])
  // Everything adjacent is still untouched.
  assert.deepEqual(updated.uncertainty, ['Whether to correct for albumin routinely'])
  assert.deepEqual(updated.articleIds, ['ART-REN-ACID-BASE'])
})

test('a new concept is still materialised with the blanks the audit reads', () => {
  const { records, created, updated } = upsertRecords([], [conceptFromRow(PARTIAL_UPDATE)], {
    merge: mergeConcept,
    materialise: materialiseNewConcept,
  })

  assert.equal(created, 1)
  assert.equal(updated, 0)
  const concept = records[0] as unknown as Record<string, unknown>
  // Present-and-null, not absent: the audit reads the key being there as
  // "empty on purpose", and `JSON.stringify` drops `undefined`.
  for (const key of ['systemId', 'secondaryNodeIds', 'evidenceGaps', 'resourceOccurrenceIds', 'lastReviewed']) {
    assert.ok(key in concept, `${key} should be present on a created concept`)
    assert.equal(concept[key], null)
  }
  assert.deepEqual(concept.articleIds, [])
  assert.equal(concept.status, 'under review')
})

test('a batch that creates a concept then updates it keeps the created values', () => {
  // One file may carry both. The second row must find the record the first row
  // created and merge into it, not re-materialise it.
  const { records, created, updated } = upsertRecords(
    [],
    [
      conceptFromRow({ ...FULL_CONCEPT, id: 'med.concept.anion-gap' }),
      conceptFromRow(PARTIAL_UPDATE),
    ],
    { merge: mergeConcept, materialise: materialiseNewConcept },
  )

  assert.equal(created, 1)
  assert.equal(updated, 1)
  assert.equal(records[0].definition, 'Probe definition change.')
  assert.deepEqual(records[0].articleIds, ['ART-REN-ACID-BASE'])
  assert.deepEqual(records[0].evidenceGaps, ['No Egyptian reference range sourced'])
})

/* ---- relations --------------------------------------------------------- */

const graph = {
  concepts: [{ id: 'c-a', label: 'A' }, { id: 'c-b', label: 'B' }],
  relations: [],
} as unknown as ConceptGraph

const evidence = { claims: [{ id: 'claim-1' }], citations: [{ id: 'cite-1' }] }

const FULL_RELATION: Record<string, string> = {
  id: '',
  source: 'c-a',
  type: 'prerequisite_of',
  target: 'c-b',
  evidence_claim_ids: 'claim-1',
  citation_ids: 'cite-1',
  confidence: '0.9',
  verification_status: 'verified',
  qualifiers: 'why: A must be understood before B',
  reviewer: 'Dr Omar',
  reviewed_at: '2026-08-12',
}

test('every relation import field is exercised by the round-trip fixture', () => {
  const missing = RELATION_IMPORT_FIELDS.map((field) => field.key).filter((key) => !(key in FULL_RELATION))
  assert.deepEqual(missing, [], `fixture does not cover: ${missing.join(', ')}`)
})

test('a fully populated relation row imports with every field present', () => {
  const relation = relationFromRow(FULL_RELATION)
  assert.equal(relation.id, relationIdFrom('c-a', 'prerequisite_of', 'c-b'))
  assert.equal(relation.sourceId, 'c-a')
  assert.equal(relation.targetId, 'c-b')
  assert.equal(relation.type, 'prerequisite_of')
  assert.deepEqual(relation.evidenceClaimIds, ['claim-1'])
  assert.deepEqual(relation.citationIds, ['cite-1'])
  assert.equal(relation.confidence, 0.9)
  assert.equal(relation.verificationStatus, 'verified')
  assert.deepEqual(relation.qualifiers, { why: 'A must be understood before B' })
  assert.equal(relation.reviewer, 'Dr Omar')
  assert.deepEqual(relationErrors(relation, graph, evidence), [])
})

test('a derived relation id makes re-import idempotent', () => {
  assert.equal(relationFromRow(FULL_RELATION).id, relationFromRow(FULL_RELATION).id)
})

test('an unknown endpoint is rejected before the edge reaches the graph', () => {
  const errors = relationErrors(relationFromRow({ ...FULL_RELATION, target: 'c-missing' }), graph, evidence)
  assert.ok(errors.some((error) => /Target concept c-missing does not exist/.test(error)), errors.join(' | '))
})

test('an unknown relation type is rejected', () => {
  const errors = relationErrors(relationFromRow({ ...FULL_RELATION, type: 'invented' }), graph, evidence)
  assert.ok(errors.some((error) => /is not a relation type/.test(error)), errors.join(' | '))
})

test('a self-referential edge is rejected', () => {
  const errors = relationErrors(relationFromRow({ ...FULL_RELATION, target: 'c-a' }), graph, evidence)
  assert.ok(errors.some((error) => /point a concept at itself/.test(error)), errors.join(' | '))
})

test('a verified relation must name both a claim and a citation', () => {
  const errors = relationErrors(relationFromRow({ ...FULL_RELATION, citation_ids: '' }), graph, evidence)
  assert.ok(errors.some((error) => /only be verified when it names both/.test(error)), errors.join(' | '))
})

test('a claim that does not resolve is rejected', () => {
  const errors = relationErrors(relationFromRow({ ...FULL_RELATION, evidence_claim_ids: 'claim-missing' }), graph, evidence)
  assert.ok(errors.some((error) => /Claim claim-missing does not exist/.test(error)), errors.join(' | '))
})

test('a needs_evidence relation with no evidence chain is allowed', () => {
  const relation = relationFromRow({ source: 'c-a', type: 'often_confused_with', target: 'c-b', verification_status: 'needs_evidence' })
  assert.deepEqual(relationErrors(relation, graph, evidence), [])
})

test('the same directed edge under a different id is a duplicate', () => {
  const first = relationFromRow(FULL_RELATION)
  const second = relationFromRow({ ...FULL_RELATION, id: 'rel-hand-written' })
  assert.equal(isDuplicateRelation(second, [first]), true)
  // The reverse direction is a different edge, not a duplicate.
  const reversed = relationFromRow({ ...FULL_RELATION, id: 'rel-rev', source: 'c-b', target: 'c-a' })
  assert.equal(isDuplicateRelation(reversed, [first]), false)
})

test('exam appearances survive the round trip and carry their locator', () => {
  // The weight is derived from these, so losing one silently changes what a
  // student is shown next without anything reporting it.
  const concept = conceptFromRow(FULL_CONCEPT)
  assert.equal(concept.examSignal?.appearances.length, 2)
  assert.equal(concept.examSignal?.appearances[0].sourceId, 'src_1a2b3c4d5e6f')
  assert.equal(concept.examSignal?.appearances[0].tier, 'end_of_year')
  assert.equal(concept.examSignal?.appearances[0].sittingYear, 2025)
  assert.equal(concept.examSignal?.appearances[0].page, 14, 'so a reviewer can go to the page')
  assert.equal(concept.examSignal?.appearances[0].moduleId, '101 ISK')
  assert.equal(concept.examSignal?.appearances[1].tier, 'orientation')
  assert.equal(concept.examSignal?.confidence, 0.5)
})

test('a concept with no exam appearances has no signal at all', () => {
  // Absent, not an empty signal: never seen on a paper is not the same as
  // weighted at zero, and the blueprint treats them differently.
  const { exam_signal: _omitted, ...withoutSignal } = FULL_CONCEPT
  assert.equal(conceptFromRow(withoutSignal).examSignal, undefined)
})

test('a concept keeps the curriculum position it was taught at', () => {
  // Distinct from `primaryNodeId`, which is the canonical placement. A concept
  // sits in one place in the canonical tree and in as many curricula as teach it.
  const concept = conceptFromRow(FULL_CONCEPT)
  assert.deepEqual(concept.moduleSubjectPaths, ['101 ISK > Anatomy > Upper Limb'])
})

test('a partial update does not wipe the curriculum position it says nothing about', () => {
  // The failure this prevents: an update row restating only a definition, and
  // silently clearing where the concept is taught.
  const created = materialiseNewConcept(conceptFromRow(FULL_CONCEPT))
  const patched = mergeConcept(created, conceptFromRow({
    id: FULL_CONCEPT.id, label: FULL_CONCEPT.label, definition: 'A revised definition.',
  }))
  assert.equal(patched.definition, 'A revised definition.')
  assert.deepEqual(patched.moduleSubjectPaths, ['101 ISK > Anatomy > Upper Limb'])
})
