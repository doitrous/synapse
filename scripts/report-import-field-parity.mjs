/**
 * Import field-parity report.
 *
 * Answers one question per field: can bulk import populate and update it?
 *
 * The model side is read from the TypeScript sources at run time rather than
 * from a hand-typed list, so the report cannot quietly fall out of date when a
 * field is added. A field the model has and the importer does not is a gap, and
 * the report names it.
 *
 *   node --experimental-strip-types scripts/report-import-field-parity.mjs
 *
 * Writes docs/medical-library-program/evidence/field-parity-matrix.{json,md}
 * and prints the summary. Exits non-zero if any field regresses to `missing`
 * without being listed as a known, explained exception below.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { IMPORT_SCHEMAS } from '../src/data/bulkImport.ts'
import { CONCEPT_IMPORT_FIELDS, RELATION_IMPORT_FIELDS } from '../src/data/conceptImport.ts'
import { SUBJECTS_IMPORT_FIELDS } from '../src/data/subjectsImport.ts'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const outDir = join(root, 'docs', 'medical-library-program', 'evidence')

/** Field names declared on one exported interface. */
async function interfaceFields(relativePath, name) {
  const source = await readFile(join(root, relativePath), 'utf8')
  const match = source.match(new RegExp(`export interface ${name} \\{([\\s\\S]*?)\\n\\}`))
  if (!match) throw new Error(`${name} not found in ${relativePath}`)
  return [...match[1].matchAll(/^ {2}([A-Za-z_][A-Za-z0-9_]*)\??:/gm)].map((entry) => entry[1])
}

/**
 * Model field → the import column that populates it.
 *
 * `null` means deliberately not importable, with the reason recorded. Everything
 * else must name a real column, and the script checks that it exists.
 */
const ARTICLE_MAP = {
  arabicTitle: 'arabic_title', aliases: 'aliases', templateId: 'template_id', archetype: 'archetype',
  language: 'language', learnerStage: 'learner_stage', summary: 'summary', body: 'body', sections: 'sections',
  publishedSections: 'published_sections', publishedSummary: 'published_summary',
  holdThese: 'hold_these', loseTheMark: 'lose_the_mark', questionIds: 'question_ids', resourceIds: 'resource_ids',
  annotations: 'annotations', universityIds: 'universities', yearIds: 'years', moduleIds: 'module',
  primaryNodeId: 'primary_node_id', secondaryNodeIds: 'secondary_node_ids', subtopicId: 'subtopic',
  microtopicId: 'microtopic', nanotopicId: 'nanotopic', relatedConceptIds: 'related_concepts',
  universityNotes: 'university_notes', fieldNotes: 'field_notes', reviewer: 'reviewer',
  finalPublisher: 'final_publisher', reviewDue: 'review_due', lastReviewed: 'last_reviewed',
  highYield: 'high_yield', timeSensitive: 'time_sensitive', publicationGate: 'publication_gate',
  evidenceBasis: 'evidence_basis', articleLevelSourceIds: 'article_source_ids', claimIds: 'claim_ids',
  spanIds: 'span_ids', conflicts: 'conflicts', evidenceGaps: 'evidence_gaps',
  relatedArticleIds: 'related_articles', media: 'media', imageRecommendations: 'image_recommendations',
  calloutEvidence: 'callout_evidence', notes: 'notes',
}

const QUESTION_MAP = {
  attachments: 'attachments', correctAnswer: 'correct_answer', answers: 'answer_a', attachedImage: 'attached_image',
  libraryIds: 'library_ids', resourceIds: 'resource_ids', tags: 'topic', learningObjective: 'learning_objective',
  authorNotes: 'author_notes', sourceCitation: 'source_citation', estimatedSeconds: 'estimated_seconds',
  randomiseAnswers: 'randomise_answers',
}

const QUESTION_TAGS_MAP = {
  module: 'module', topic: 'topic', subtopic: 'subtopic', conceptIds: 'concept_ids', years: 'years',
  universityIds: 'universities', cognitiveEffort: 'cognitive_effort', setting: 'setting',
  intendedDifficulty: 'difficulty', clinicalReasoningLevel: 'reasoning_level',
  inferredDifficulty: 'inferred_difficulty', examRelevance: 'exam_relevance',
  contextualConceptIds: 'contextual_concept_ids', questionType: 'question_type', mainConceptIds: 'main_concept',
  moduleIds: 'module', clinicalRelevance: 'clinical_relevance', academicRelevance: 'academic_relevance',
  cognitiveEffortScore: 'cognitive_effort_score', examWeightByYear: 'exam_weight_by_year',
  questionOnlyFor: 'question_only_for',
}

const CONCEPT_MAP = {
  id: 'id', label: 'label', aliases: 'aliases', canonicalKey: 'canonical_key', arabicLabel: 'arabic_label',
  arabicAliases: 'arabic_aliases', definition: 'definition', pitfalls: 'pitfalls', status: 'status',
  articleIds: 'article_ids', subjectId: 'subject', topicId: 'topic', systemId: 'subject', topicTagId: 'topic',
  subtopicId: 'subtopic', microtopicId: 'microtopic', nanotopicId: 'nanotopic', primaryNodeId: 'primary_node_id',
  secondaryNodeIds: 'secondary_node_ids', conceptType: 'concept_type', learnerYears: 'learner_years',
  universityIds: 'universities', moduleIds: 'modules', explicitObjective: 'explicit_objective',
  blueprintWeight: 'blueprint_weight', examWeightByYear: 'exam_weight_by_year',
  clinicalRelevance: 'clinical_relevance', academicRelevance: 'academic_relevance',
  relatedConceptIds: 'related_concept_ids', relatedArticleIds: 'related_article_ids', resourceIds: 'resource_ids',
  approvedFileResourceIds: 'approved_file_resource_ids', approvedVideoResourceIds: 'approved_video_resource_ids',
  atomicClaimIds: 'atomic_claim_ids', resourceOccurrenceIds: 'resource_occurrence_ids', supportMode: 'support_mode',
  confidence: 'confidence', conflicts: 'conflicts', uncertainty: 'uncertainty', evidenceGaps: 'evidence_gaps',
  sourceCandidateIds: 'source_candidate_ids', mergeIds: 'merge_ids',
  rejectedMergeCandidateIds: 'rejected_merge_candidate_ids', originalWording: 'original_wording',
  owner: 'owner', reviewer: 'reviewer', finalPublisher: 'final_publisher', lastReviewed: 'last_reviewed',
  reviewDue: 'review_due', publicationStatus: 'publication_status',
  editorialReviewStatus: 'editorial_review_status', exclusionReason: 'exclusion_reason',
  weightConfidence: 'weight_confidence', fieldNotes: 'field_notes',
}

const RELATION_MAP = {
  id: 'id', sourceId: 'source', type: 'type', targetId: 'target', evidenceClaimIds: 'evidence_claim_ids',
  citationIds: 'citation_ids', confidence: 'confidence', verificationStatus: 'verification_status',
  qualifiers: 'qualifiers', reviewer: 'reviewer', reviewedAt: 'reviewed_at',
}

const ANNOTATION_MAP = { id: 'annotations', quote: 'annotations', conceptId: 'annotations', relation: 'annotations', block: 'annotations' }

const IMAGE_MAP = {
  id: 'image_recommendations', articleId: 'image_recommendations', kind: 'image_recommendations',
  brief: 'image_recommendations', teachingPurpose: 'image_recommendations', section: 'image_recommendations',
  block: 'image_recommendations', anchorQuote: 'image_recommendations', priority: 'image_recommendations',
  status: 'image_recommendations', notes: 'image_recommendations', sourceDirection: 'image_recommendations',
  rightsNotes: 'image_recommendations', mediaId: 'image_recommendations',
}

const RESOURCE_MAP = {
  universityIds: 'universities', yearIds: 'years', institution: 'source', collectionId: null,
  storageKey: null, sha256: null, rights: null, processingStatus: null, reviewer: null, finalPublisher: null,
  chapters: 'chapter', moduleIds: 'module_ids', includedConceptIds: 'included_concepts',
  includedArticleIds: 'included_articles', conceptLocations: 'concept_locations',
}

/**
 * Fields deliberately outside the import contract, each with its reason.
 *
 * Everything here is set by an authenticated pipeline rather than by an author,
 * so an import column would be a way to forge provenance.
 */
const EXEMPT = {
  'ResourceAuthoringData.collectionId': 'Set by the ingest pipeline from the source collection.',
  'ResourceAuthoringData.storageKey': 'Set on upload to authenticated storage; an author cannot choose it.',
  'ResourceAuthoringData.sha256': 'Computed from the uploaded binary. Typing it would forge provenance.',
  'ResourceAuthoringData.rights': 'Recorded by the rights review, not by the importer.',
  'ResourceAuthoringData.processingStatus': 'Owned by the ingest pipeline state machine.',
  'ResourceAuthoringData.reviewer': 'Set by the review workflow.',
  'ResourceAuthoringData.finalPublisher': 'Set by the publish workflow.',
}

const SUBJECT_MAP = {
  'CurriculumSystem.id': 'system_id', 'CurriculumSystem.name': 'system', 'CurriculumSystem.short': 'system_short',
  'CurriculumSystem.color': 'system_color', 'CurriculumSystem.sysId': 'system_id',
  'CurriculumSystem.topics': 'topic', 'CurriculumSystem.crossRefs': 'system_cross_refs',
  'CurriculumTopic.id': 'topic_id', 'CurriculumTopic.title': 'topic', 'CurriculumTopic.tpcId': 'topic_id',
  'CurriculumTopic.subs': 'subtopic', 'CurriculumTopic.crossRefs': 'topic_cross_refs',
  'CurriculumSubtopic.id': 'subtopic_id', 'CurriculumSubtopic.title': 'subtopic',
  'CurriculumSubtopic.subId': 'subtopic_id', 'CurriculumSubtopic.micros': 'microtopic',
  'CurriculumMicro.id': 'microtopic_id', 'CurriculumMicro.title': 'microtopic',
  'CurriculumMicro.micId': 'microtopic_id', 'CurriculumMicro.nanos': 'nanotopic',
  'CurriculumNano.id': 'nanotopic_id', 'CurriculumNano.title': 'nanotopic', 'CurriculumNano.nanId': 'nanotopic_id',
}

const keysOf = (fields) => new Set(fields.map((field) => field.key))

function assess(modelName, modelFields, map, importKeys, prefix = modelName) {
  return modelFields.map((field) => {
    const column = Object.hasOwn(map, field) ? map[field] : undefined
    const exemptReason = EXEMPT[`${prefix}.${field}`]
    if (exemptReason) return { field, column: null, state: 'n/a', reason: exemptReason }
    if (column === null) return { field, column: null, state: 'n/a', reason: 'Not author-supplied.' }
    if (column === undefined) return { field, column: null, state: 'missing', reason: 'No import column maps to this field.' }
    if (!importKeys.has(column)) return { field, column, state: 'missing', reason: `Mapped column "${column}" is not in the import schema.` }
    return { field, column, state: 'ok', reason: '' }
  })
}

const articleKeys = keysOf(IMPORT_SCHEMAS.article.fields)
const questionKeys = keysOf(IMPORT_SCHEMAS.question.fields)
const resourceKeys = keysOf(IMPORT_SCHEMAS.resource.fields)
const conceptKeys = keysOf(CONCEPT_IMPORT_FIELDS)
const relationKeys = keysOf(RELATION_IMPORT_FIELDS)
const subjectKeys = keysOf(SUBJECTS_IMPORT_FIELDS)

const groups = []

groups.push({
  contentType: 'Library article',
  model: 'ArticleAuthoringData',
  importFields: articleKeys.size,
  fields: assess('ArticleAuthoringData', await interfaceFields('src/data/contentControl.ts', 'ArticleAuthoringData'), ARTICLE_MAP, articleKeys),
})
groups.push({
  contentType: 'Library article · statement annotation',
  model: 'ConceptAnnotation',
  importFields: articleKeys.size,
  fields: assess('ConceptAnnotation', await interfaceFields('src/data/conceptGraph.ts', 'ConceptAnnotation'), ANNOTATION_MAP, articleKeys),
})
groups.push({
  contentType: 'Library article · image recommendation',
  model: 'ImageRecommendation',
  importFields: articleKeys.size,
  fields: assess('ImageRecommendation', await interfaceFields('src/data/contentControl.ts', 'ImageRecommendation'), IMAGE_MAP, articleKeys),
})
groups.push({
  contentType: 'Concept',
  model: 'Concept',
  importFields: conceptKeys.size,
  fields: assess('Concept', await interfaceFields('src/data/conceptGraph.ts', 'Concept'), CONCEPT_MAP, conceptKeys),
})
groups.push({
  contentType: 'Concept relation',
  model: 'ConceptRelation',
  importFields: relationKeys.size,
  fields: assess('ConceptRelation', await interfaceFields('src/data/conceptGraph.ts', 'ConceptRelation'), RELATION_MAP, relationKeys),
})
groups.push({
  contentType: 'Question',
  model: 'QuestionAuthoringData',
  importFields: questionKeys.size,
  fields: assess('QuestionAuthoringData', await interfaceFields('src/data/contentControl.ts', 'QuestionAuthoringData'), QUESTION_MAP, questionKeys),
})
groups.push({
  contentType: 'Question · tags',
  model: 'QuestionTags',
  importFields: questionKeys.size,
  fields: assess('QuestionTags', await interfaceFields('src/data/contentControl.ts', 'QuestionTags'), QUESTION_TAGS_MAP, questionKeys),
})
groups.push({
  contentType: 'Resource',
  model: 'ResourceAuthoringData',
  importFields: resourceKeys.size,
  fields: assess('ResourceAuthoringData', await interfaceFields('src/data/contentControl.ts', 'ResourceAuthoringData'), RESOURCE_MAP, resourceKeys),
})

// Subjects & Topics spans five interfaces, so it is assessed as one group.
const subjectFields = []
for (const name of ['CurriculumSystem', 'CurriculumTopic', 'CurriculumSubtopic', 'CurriculumMicro', 'CurriculumNano']) {
  const fields = await interfaceFields('src/data/curriculumCatalog.ts', name)
  subjectFields.push(...assess(name, fields, Object.fromEntries(fields.map((field) => [field, SUBJECT_MAP[`${name}.${field}`]])), subjectKeys, name)
    .map((entry) => ({ ...entry, field: `${name}.${entry.field}` })))
}
groups.push({ contentType: 'Subjects & Topics', model: 'CurriculumSystem tree', importFields: subjectKeys.size, fields: subjectFields })

const summary = groups.map((group) => ({
  contentType: group.contentType,
  model: group.model,
  modelFields: group.fields.length,
  importFields: group.importFields,
  ok: group.fields.filter((field) => field.state === 'ok').length,
  missing: group.fields.filter((field) => field.state === 'missing').length,
  notApplicable: group.fields.filter((field) => field.state === 'n/a').length,
}))

const gaps = groups.flatMap((group) => group.fields.filter((field) => field.state === 'missing').map((field) => ({ contentType: group.contentType, ...field })))

const report = { generatedAt: null, summary, gaps, groups }

await mkdir(outDir, { recursive: true })
await writeFile(join(outDir, 'field-parity-matrix.json'), `${JSON.stringify(report, null, 2)}\n`)

const md = [
  '# Import field-parity matrix',
  '',
  'Generated by `node --experimental-strip-types scripts/report-import-field-parity.mjs`.',
  'Model fields are read from the TypeScript sources at run time, so this cannot',
  'drift when a field is added.',
  '',
  '| Content type | Model | Model fields | Import columns | Importable | Gaps | Not applicable |',
  '|---|---|---:|---:|---:|---:|---:|',
  ...summary.map((row) => `| ${row.contentType} | \`${row.model}\` | ${row.modelFields} | ${row.importFields} | ${row.ok} | ${row.missing} | ${row.notApplicable} |`),
  '',
  gaps.length ? '## Gaps' : '## Gaps\n\nNone. Every model field is reachable by bulk import, or is recorded as not author-supplied.',
  ...(gaps.length ? ['', '| Content type | Field | Why |', '|---|---|---|', ...gaps.map((gap) => `| ${gap.contentType} | \`${gap.field}\` | ${gap.reason} |`)] : []),
  '',
  '## Fields deliberately outside the import contract',
  '',
  '| Field | Reason |',
  '|---|---|',
  ...Object.entries(EXEMPT).map(([field, reason]) => `| \`${field}\` | ${reason} |`),
  '',
].join('\n')

await writeFile(join(outDir, 'field-parity-matrix.md'), md)

console.log(JSON.stringify({ summary, gapCount: gaps.length, gaps }, null, 2))
if (gaps.length) process.exitCode = 1
