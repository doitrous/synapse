import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import {
  parse, isUpdateRow, indexFullRecords, judgeConceptRow, moduleOf,
} from '../../scripts/kasr/check-concept-presence.mjs'

/**
 * `check-concept-presence.mjs` judged every `# Item` row as a full record,
 * which is right for a genuinely new concept and wrong for a SPARSE UPDATE
 * row — `## id` plus `## label` plus only the columns being changed. Fixed
 * in 7ab418f's wake by teaching the checker `isUpdateRow`'s rule, mirrored
 * from `validate-content-batch.mjs`'s `isRecognisedUpdate` (that file exports
 * nothing, so there is nothing to import and compare against directly): the
 * id must resolve — to live state, or to a full record filed under the same
 * module in another concept file of the batch — AND the row must restate its
 * `## label`. These tests exercise that rule directly, with no files on disk,
 * the same way `kasrConceptIdReuse.test.ts` exercises `resolveConceptId`.
 */

const MODULE = '101 ISK'

// A live concept with every `POPULATED`/`PRESENT` field genuinely filled —
// if a sparse row hitting this id ever gets flagged for one of these, the
// checker went back to judging it as a full record.
const LIVE_ID = 'CON-FND-LIVE00000000001'
const liveConcept = {
  id: LIVE_ID,
  label: 'A fully authored live concept',
  definition: 'd', explicitObjective: 'e', conceptType: 'definition', status: 'active',
  subjectId: 'fnd', primaryNodeId: 'DIS-FND-T01', learnerYears: [1], universityIds: ['kau'],
  articleIds: ['ART-FND-EXISTING'], blueprintWeight: 0.1, examWeightByYear: { KAU_Y1: 0.1 },
  clinicalRelevance: 0.1, academicRelevance: 0.1, relatedArticleIds: ['ART-FND-OTHER'],
  resourceIds: ['RES-1'], atomicClaimIds: ['CLM-FND-X-01'], supportMode: 'direct_statement',
  confidence: 0.8, originalWording: ['as the book says'], owner: 'x', reviewer: 'y',
  finalPublisher: 'z', publicationStatus: 'published', editorialReviewStatus: 'done',
  weightConfidence: 0.8, fieldNotes: { canonicalKey: 'stable' }, canonicalKey: 'k',
  systemId: 'SYS-FND', topicTagId: 'TPC-1', subtopicId: 'SUB-1', microtopicId: null,
  nanotopicId: null, secondaryNodeIds: ['DIS-FND-T02'], relatedConceptIds: ['CON-FND-OTHER'],
  moduleIds: [MODULE], aliases: ['alt name'], arabicLabel: 'التسمية', arabicAliases: ['بديل'],
  pitfalls: 'the usual mistake', approvedFileResourceIds: ['RES-F1'], approvedVideoResourceIds: ['RES-V1'],
  conflicts: ['none'], uncertainty: ['none'], evidenceGaps: ['none'], mergeIds: ['none'],
  rejectedMergeCandidateIds: ['none'], lastReviewed: '2026-01-01', reviewDue: '2027-01-01',
  exclusionReason: null,
}

describe('isUpdateRow: mirrors isRecognisedUpdate — id resolves AND label is restated', () => {
  test('a live id with a restated label is an update', () => {
    const liveIds = new Set([LIVE_ID])
    const row = { id: LIVE_ID, label: 'Something' }
    assert.equal(isUpdateRow(row, { liveIds, fullRecordModules: new Map(), fileModule: MODULE, file: 'a.md' }), true)
  })

  test('a live id WITHOUT a restated label is not an update — the row does not vouch for itself', () => {
    const liveIds = new Set([LIVE_ID])
    const row = { id: LIVE_ID }
    assert.equal(isUpdateRow(row, { liveIds, fullRecordModules: new Map(), fileModule: MODULE, file: 'a.md' }), false)
  })

  test('an id nothing resolves is not an update, live or not', () => {
    const row = { id: 'CON-FND-NOBODY000000001', label: 'Something' }
    assert.equal(isUpdateRow(row, { liveIds: new Set(), fullRecordModules: new Map(), fileModule: MODULE, file: 'a.md' }), false)
  })

  test('a full record elsewhere in the same module is an update', () => {
    const fullRecordModules = new Map([['CON-FND-ELSEWHERE00001', [{ module: MODULE, file: 'other.md' }]]])
    const row = { id: 'CON-FND-ELSEWHERE00001', label: 'Something' }
    assert.equal(isUpdateRow(row, { liveIds: new Set(), fullRecordModules, fileModule: MODULE, file: 'this.md' }), true)
  })

  test('a full record in a DIFFERENT module does not count', () => {
    const fullRecordModules = new Map([['CON-FND-ELSEWHERE00001', [{ module: '104 CPS', file: 'other.md' }]]])
    const row = { id: 'CON-FND-ELSEWHERE00001', label: 'Something' }
    assert.equal(isUpdateRow(row, { liveIds: new Set(), fullRecordModules, fileModule: MODULE, file: 'this.md' }), false)
  })

  test('a full record cannot vouch for itself — same file does not count as "elsewhere"', () => {
    const fullRecordModules = new Map([['CON-FND-SELF00000001', [{ module: MODULE, file: 'this.md' }]]])
    const row = { id: 'CON-FND-SELF00000001', label: 'Something' }
    assert.equal(isUpdateRow(row, { liveIds: new Set(), fullRecordModules, fileModule: MODULE, file: 'this.md' }), false)
  })
})

describe('judgeConceptRow: a sparse update is judged only on the fields it names', () => {
  test('a sparse row hitting a live id is clean — every field it leaves out is skipped, not flagged', () => {
    const row = {
      id: LIVE_ID,
      label: 'A fully authored live concept',
      article_ids: '+ART-FND-NEW-EVIDENCE',
      canonical_key: 'k',
    }
    const liveConcepts = new Map([[LIVE_ID, liveConcept]])
    const result = judgeConceptRow(row, {
      liveConcepts, fullRecordModules: new Map(), fileModule: MODULE, file: 'sparse.md',
    })
    assert.equal(result.isUpdate, true)
    assert.deepEqual(result.absent, [])
    assert.deepEqual(result.unpopulated, [])
  })

  test('a sparse row NAMING a field and leaving it blank is still flagged, with no excuse', () => {
    const row = {
      id: LIVE_ID,
      label: 'A fully authored live concept',
      owner: '', // named, explicitly blank, no field_notes reason for it
    }
    const liveConcepts = new Map([[LIVE_ID, liveConcept]])
    const result = judgeConceptRow(row, {
      liveConcepts, fullRecordModules: new Map(), fileModule: MODULE, file: 'sparse.md',
    })
    assert.equal(result.isUpdate, true)
    assert.deepEqual(result.unpopulated, ['owner'])
  })

  test('a sparse row for an id nothing resolves is not recognised as an update, and is flagged as a create', () => {
    const row = {
      id: 'CON-FND-UNKNOWN00000001',
      label: 'Only a label and one link, nothing else',
      article_ids: 'ART-FND-SOMETHING',
    }
    const result = judgeConceptRow(row, {
      liveConcepts: new Map(), fullRecordModules: new Map(), fileModule: MODULE, file: 'sparse.md',
    })
    assert.equal(result.isUpdate, false)
    assert.ok(result.unpopulated.includes('definition'), 'a create with no definition must still be flagged')
    assert.ok(result.unpopulated.includes('explicitObjective'), 'a create with no explicit objective must still be flagged')
  })

  test('a full row missing one field is flagged for that field, unaffected by the update rule', () => {
    const row = {
      id: 'CON-FND-NEWFULL0000001',
      label: 'A brand-new, fully authored concept',
      canonical_key: 'brand-new-concept',
      definition: 'What it is.',
      explicit_objective: 'What a student must do with it.',
      concept_type: 'definition',
      status: 'under review',
      subject: 'fnd',
      primary_node_id: 'DIS-FND-T09',
      learner_years: '1',
      universities: 'kau',
      module_subject: `${MODULE} > Histology > Something > Somewhere`,
      article_ids: 'ART-FND-TEACHES-IT',
      // `weight_confidence` deliberately omitted — a real gap on a real record.
    }
    const result = judgeConceptRow(row, {
      liveConcepts: new Map(), fullRecordModules: new Map(), fileModule: MODULE, file: 'full.md',
    })
    assert.equal(result.isUpdate, false)
    assert.ok(result.unpopulated.includes('weightConfidence'))
  })
})

describe('indexFullRecords + moduleOf: cross-file resolution, the way medical:presence runs it', () => {
  test('moduleOf reads the first segment of a module_subject cell', () => {
    assert.equal(moduleOf('101 ISK > Histology > Connective Tissue > Fibres'), '101 ISK')
    assert.equal(moduleOf(undefined), undefined)
    assert.equal(moduleOf(''), undefined)
  })

  test('a full record (definition + explicit_objective) is indexed under its own module', () => {
    const rows = [{
      id: 'CON-FND-FULL0000000001', label: 'L', definition: 'd', explicit_objective: 'e',
      module_subject: `${MODULE} > Histology > Connective Tissue > Fibres`,
    }]
    const index = indexFullRecords([{ file: 'a.md', rows }])
    assert.deepEqual(index.get('CON-FND-FULL0000000001'), [{ module: MODULE, file: 'a.md' }])
  })

  test('a row missing either definition or explicit_objective is not "full" and is not indexed', () => {
    const rows = [{
      id: 'CON-FND-HALF0000000001', label: 'L', definition: 'd',
      module_subject: `${MODULE} > Histology > Connective Tissue > Fibres`,
    }]
    const index = indexFullRecords([{ file: 'a.md', rows }])
    assert.equal(index.has('CON-FND-HALF0000000001'), false)
  })

  test('end to end: a sparse update in one file resolves against a full record parsed from a sibling', () => {
    // Mirrors CON-FND-103DF490A6E01E: the full record lives in
    // 101-ISK-practical-concepts.md, the sparse update in
    // 101-ISK-mcq-concepts.md.
    const id = 'CON-FND-103DF490A6E01E'
    const fullFile = `# Item
## id
${id}
## label
Collagen and elastic fibres are told apart in one field by bundling and by outline
## canonical_key
collagen-versus-elastic-fibre-identification
## definition
Collagen runs as thick, wavy bundles; elastic fibres run singly, thin and branching.
## explicit_objective
Name each fibre when arrowed in a loose areolar section.
## module_subject
${MODULE} > Histology > Connective Tissue > Connective Tissue Fibres
`
    const sparseFile = `# Item
## id
${id}
## label
Collagen and elastic fibres are told apart in one field by bundling and by outline
## canonical_key
collagen-versus-elastic-fibre-identification
## article_ids
+ART-101-HIS-CONNECTIVE-TISSUE-FIBRES
## field_notes
Reused from the hand-authored record; this row records exam evidence and the teaching article only.
`
    const fileGroups = [
      { file: 'practical.md', rows: parse(fullFile) },
      { file: 'mcq.md', rows: parse(sparseFile) },
    ]
    const fullRecordModules = indexFullRecords(fileGroups)
    const sparseRow = parse(sparseFile)[0]
    const result = judgeConceptRow(sparseRow, {
      liveConcepts: new Map(), fullRecordModules, fileModule: MODULE, file: 'mcq.md',
    })
    assert.equal(result.isUpdate, true)
    // Neither definition nor explicitObjective was named on the sparse row —
    // both are skipped, not flagged, because the full record elsewhere
    // already carries them.
    assert.equal(result.unpopulated.includes('definition'), false)
    assert.equal(result.unpopulated.includes('explicitObjective'), false)
  })
})
