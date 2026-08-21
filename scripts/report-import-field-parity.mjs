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
import { EVIDENCE_IMPORT_FIELDS } from '../src/data/evidenceImport.ts'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const outDir = join(root, 'docs', 'medical-library-program', 'evidence')

/** Field names declared on one exported interface. */
async function interfaceFields(relativePath, name) {
  const source = await readFile(join(root, relativePath), 'utf8')
  const match = source.match(new RegExp(`export interface ${name}(?: extends [A-Za-z, ]+)? \\{([\\s\\S]*?)\\n\\}`))
  if (!match) throw new Error(`${name} not found in ${relativePath}`)
  return [...match[1].matchAll(/^ {2}([A-Za-z_][A-Za-z0-9_]*)\??:/gm)].map((entry) => entry[1])
}

/**
 * The fields one practical format actually carries, inherited ones included.
 *
 * The three formats extend `PracticalCommon`, so reading the interface alone
 * would report a format as having no `references` or `conceptTags` and quietly
 * drop four shared fields out of the matrix.
 */
async function practicalInterfaceFields(name) {
  const own = await interfaceFields('src/data/contentControl.ts', name)
  const shared = await interfaceFields('src/data/contentControl.ts', 'PracticalCommon')
  return [...own, ...shared.filter((field) => !own.includes(field))]
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
  moduleSubjectPaths: 'module_subject',
  primaryNodeId: 'primary_node_id', secondaryNodeIds: 'secondary_node_ids', subtopicId: 'subtopic',
  microtopicId: 'microtopic', nanotopicId: 'nanotopic', relatedConceptIds: 'related_concepts',
  universityNotes: 'university_notes', fieldNotes: 'field_notes', reviewer: 'reviewer',
  finalPublisher: 'final_publisher', reviewDue: 'review_due', lastReviewed: 'last_reviewed',
  highYield: 'high_yield', timeSensitive: 'time_sensitive', publicationGate: 'publication_gate',
  evidenceBasis: 'evidence_basis', articleLevelSourceIds: 'article_source_ids', claimIds: 'claim_ids',
  spanIds: 'span_ids', conflicts: 'conflicts', evidenceGaps: 'evidence_gaps',
  relatedArticleIds: 'related_articles', media: 'media', mediaRequests: 'media_recommendations',
  calloutEvidence: 'callout_evidence', notes: 'notes',
}

const QUESTION_MAP = {
  format: 'format', writtenParts: 'written_parts', matching: 'matching_options',
  multiResponse: 'correct_answers', labeling: 'labeling_points',
  completion: 'completion_text',
  derivedFromFormat: 'derived_from', derivedFromId: 'derived_from',
  attachments: 'attachments', correctAnswer: 'correct_answer', answers: 'answer_a', attachedImage: 'attached_image',
  libraryIds: 'library_ids', resourceIds: 'resource_ids', tags: 'topic', learningObjective: 'learning_objective',
  authorNotes: 'author_notes', sourceCitation: 'source_citation', estimatedSeconds: 'estimated_seconds',
  randomiseAnswers: 'randomise_answers', mediaRequests: 'media_recommendations',
}

const QUESTION_TAGS_MAP = {
  module: 'module', topic: 'topic', subtopic: 'subtopic', conceptIds: 'concept_ids', years: 'years',
  universityIds: 'universities', cognitiveEffort: 'cognitive_effort', setting: 'setting',
  intendedDifficulty: 'difficulty', clinicalReasoningLevel: 'reasoning_level',
  inferredDifficulty: 'inferred_difficulty', examRelevance: 'exam_relevance',
  contextualConceptIds: 'contextual_concept_ids', questionType: 'question_type', mainConceptIds: 'main_concept',
  moduleIds: 'module', moduleSubjectPaths: 'module_subject',
  clinicalRelevance: 'clinical_relevance', academicRelevance: 'academic_relevance',
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
  blueprintWeight: 'blueprint_weight', examSignal: 'exam_signal', examWeightByYear: 'exam_weight_by_year',
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

/**
 * The three practical formats are separate interfaces that share a base, so the
 * shared block is asserted once here and each format adds only its own fields.
 */
const PRACTICAL_COMMON_MAP = {
  references: 'references', conceptTags: 'main_concept', mediaRequests: 'media_needed',
  learningObjective: 'learning_objective', moduleSubjectPaths: 'module_subject',
}

const OSCE_MAP = {
  ...PRACTICAL_COMMON_MAP,
  format: 'type', mediaUrl: 'station_image',
  candidateInstructions: 'candidate_instructions', actorOpening: 'actor_opening',
  actorSections: 'actor_sections', actorFlags: 'actor_flags', markSections: 'mark_scheme',
  difficulty: 'difficulty',
}

const CASE_MAP = { ...PRACTICAL_COMMON_MAP, format: 'type', decisions: 'decisions', debrief: 'debrief' }

const LAB_MAP = { ...PRACTICAL_COMMON_MAP, format: 'type', subtype: 'lab_subtype', questions: 'lab_questions' }

/** One decision inside `decisions`, and one question inside `lab_questions`. */
const DECISION_MAP = {
  id: 'decisions', title: 'decisions', context: 'decisions', question: 'decisions', answers: 'decisions',
  rationale: 'decisions', conceptId: 'decisions', secondaryConceptIds: 'decisions', difficulty: 'decisions',
  mediaUrl: 'decisions',
}

const LAB_QUESTION_MAP = {
  id: 'lab_questions', context: 'lab_questions', question: 'lab_questions', mediaUrl: 'lab_questions',
  answers: 'lab_questions', explanation: 'lab_questions', conceptId: 'lab_questions',
  secondaryConceptIds: 'lab_questions', difficulty: 'lab_questions',
}

/**
 * `MediaRequest` is one interface reached from three content types, so it is
 * asserted once per owner against that owner's key set. Every schema carries
 * `media_recommendations`; the article `image_recommendations` and practical
 * `media_needed` columns are legacy aliases still read by the parser, and are
 * not asserted separately because they populate the same fields.
 *
 * `ownerId` and `ownerKind` are set from the record the block appears under, not
 * from a column of their own — an author writing a request inside an article has
 * already said which article it belongs to.
 */
const MEDIA_REQUEST_MAP = {
  id: 'media_recommendations', ownerId: null, ownerKind: null,
  medium: 'media_recommendations', kind: 'media_recommendations', brief: 'media_recommendations',
  teachingPurpose: 'media_recommendations', section: 'media_recommendations',
  block: 'media_recommendations', anchorQuote: 'media_recommendations',
  priority: 'media_recommendations', status: 'media_recommendations',
  notes: 'media_recommendations', sourceDirection: 'media_recommendations',
  rightsNotes: 'media_recommendations', mediaId: 'media_recommendations',
}

const RESOURCE_MAP = {
  universityIds: 'universities', yearIds: 'years', institution: 'source', collectionId: null,
  storageKey: null, sha256: null, rights: null, processingStatus: null, reviewer: null, finalPublisher: null,
  chapters: 'chapter', moduleIds: 'module_ids', moduleSubjectPaths: 'module_subject',
  includedConceptIds: 'included_concepts',
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
  'ResourceRecord.collectionPriority': 'Ranking assigned by the ingest pipeline, not by an author.',
  'ResourceRecord.storageKey': 'Set on upload to authenticated storage.',
  'ResourceRecord.validation': 'Produced by the validation pipeline.',
  'ArticleSpan.currentLine': 'A convenience pointer recomputed on render. The durable locator is the text hash.',
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

/** Read once, asserted three times — see `MEDIA_REQUEST_MAP`. */
const mediaRequestFields = await interfaceFields('src/data/contentControl.ts', 'MediaRequest')

const articleKeys = keysOf(IMPORT_SCHEMAS.article.fields)
const questionKeys = keysOf(IMPORT_SCHEMAS.question.fields)
const practicalKeys = keysOf(IMPORT_SCHEMAS.practical.fields)
const resourceKeys = keysOf(IMPORT_SCHEMAS.resource.fields)
const conceptKeys = keysOf(CONCEPT_IMPORT_FIELDS)
const relationKeys = keysOf(RELATION_IMPORT_FIELDS)
const subjectKeys = keysOf(SUBJECTS_IMPORT_FIELDS)
const evidenceKeys = Object.fromEntries(Object.entries(EVIDENCE_IMPORT_FIELDS).map(([kind, fields]) => [kind, keysOf(fields)]))

const RESOURCE_RECORD_MAP = {
  id: 'id', institution: 'institution', collectionId: 'collection_id', collectionPriority: null,
  title: 'title', storageKey: null, sourceRelativePath: 'source_relative_path', sourceUri: 'source_uri',
  mediaType: 'media_type', languages: 'languages', publicationDate: 'publication_date', pageCount: 'page_count',
  sha256: 'sha256', processingStatus: 'processing_status', rights: 'rights', validation: null,
  confidence: 'confidence', isAssessment: 'is_assessment', qualification: 'qualification', accessedAt: 'accessed_at',
}
const CLAIM_MAP = {
  id: 'id', conceptId: 'concept_id', subject: 'subject', predicate: 'predicate', object: 'object',
  qualifiers: 'qualifiers', displayText: 'display_text', riskClass: 'risk_class',
  verificationStatus: 'verification_status', conflictStatus: 'conflict_status', confidence: 'confidence',
  freshness: 'freshness', timeSensitive: 'time_sensitive', reviewDue: 'review_due', citationIds: 'id',
}
const CITATION_MAP = {
  id: 'id', claimId: 'claim_id', resourceId: 'resource_id', evidenceRole: 'evidence_role',
  locator: 'locator_type', supportSpan: 'support_span', contextNote: 'context_note',
  confidence: 'confidence', countsAsClaimEvidence: 'counts_as_claim_evidence',
}
const SPAN_MAP = {
  id: 'id', articleId: 'article_id', sectionId: 'section_id', textHash: 'text_hash',
  currentLine: null, text: 'text', claimIds: 'claim_ids', citationIds: 'citation_ids',
}

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
  contentType: 'Library article · media request',
  model: 'MediaRequest',
  importFields: articleKeys.size,
  fields: assess('MediaRequest', mediaRequestFields, MEDIA_REQUEST_MAP, articleKeys),
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
  contentType: 'Question · media request',
  model: 'MediaRequest',
  importFields: questionKeys.size,
  fields: assess('MediaRequest', mediaRequestFields, MEDIA_REQUEST_MAP, questionKeys),
})
groups.push({
  contentType: 'Practical · OSCE and checklist',
  model: 'OsceAuthoringData',
  importFields: practicalKeys.size,
  fields: assess('OsceAuthoringData', await practicalInterfaceFields('OsceAuthoringData'), OSCE_MAP, practicalKeys),
})
groups.push({
  contentType: 'Practical · clinical case',
  model: 'CaseAuthoringData',
  importFields: practicalKeys.size,
  fields: assess('CaseAuthoringData', await practicalInterfaceFields('CaseAuthoringData'), CASE_MAP, practicalKeys),
})
groups.push({
  contentType: 'Practical · case decision',
  model: 'ClinicalDecisionDraft',
  importFields: practicalKeys.size,
  fields: assess('ClinicalDecisionDraft', await interfaceFields('src/data/contentControl.ts', 'ClinicalDecisionDraft'), DECISION_MAP, practicalKeys),
})
groups.push({
  contentType: 'Practical · interpretation set',
  model: 'LabAuthoringData',
  importFields: practicalKeys.size,
  fields: assess('LabAuthoringData', await practicalInterfaceFields('LabAuthoringData'), LAB_MAP, practicalKeys),
})
groups.push({
  contentType: 'Practical · interpretation question',
  model: 'LabQuestionDraft',
  importFields: practicalKeys.size,
  fields: assess('LabQuestionDraft', await interfaceFields('src/data/contentControl.ts', 'LabQuestionDraft'), LAB_QUESTION_MAP, practicalKeys),
})
groups.push({
  contentType: 'Practical · media request',
  model: 'MediaRequest',
  importFields: practicalKeys.size,
  fields: assess('MediaRequest', mediaRequestFields, MEDIA_REQUEST_MAP, practicalKeys),
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
groups.push({
  contentType: 'Evidence · source',
  model: 'ResourceRecord',
  importFields: evidenceKeys.resource.size,
  fields: assess('ResourceRecord', await interfaceFields('src/data/medicalEvidence.ts', 'ResourceRecord'), RESOURCE_RECORD_MAP, evidenceKeys.resource),
})
groups.push({
  contentType: 'Evidence · claim',
  model: 'EvidenceClaim',
  importFields: evidenceKeys.claim.size,
  fields: assess('EvidenceClaim', await interfaceFields('src/data/medicalEvidence.ts', 'EvidenceClaim'), CLAIM_MAP, evidenceKeys.claim),
})
groups.push({
  contentType: 'Evidence · citation',
  model: 'CitationLink',
  importFields: evidenceKeys.citation.size,
  fields: assess('CitationLink', await interfaceFields('src/data/medicalEvidence.ts', 'CitationLink'), CITATION_MAP, evidenceKeys.citation),
})
groups.push({
  contentType: 'Evidence · article span',
  model: 'ArticleSpan',
  importFields: evidenceKeys.span.size,
  fields: assess('ArticleSpan', await interfaceFields('src/data/medicalEvidence.ts', 'ArticleSpan'), SPAN_MAP, evidenceKeys.span),
})
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
