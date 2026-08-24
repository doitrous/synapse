import { IMPORT_SCHEMAS, type ImportFieldDefinition } from './bulkImport.ts'
import { CONCEPT_IMPORT_FIELDS, RELATION_IMPORT_FIELDS } from './conceptImport.ts'
import { SUBJECTS_IMPORT_FIELDS } from './subjectsImport.ts'
import { EVIDENCE_IMPORT_FIELDS } from './evidenceImport.ts'
import { MINIGAME_IMPORT_FIELDS } from './minigameImport.ts'
import { GLOSSARY_IMPORT_FIELDS } from './glossaryImport.ts'

/**
 * Canonical bulk-import contract registry.
 *
 * The importer used to have three overlapping vocabularies: schema fields in
 * `bulkImport.ts`, parity maps in `scripts/report-import-field-parity.mjs`, and
 * manual-heading tests that assembled their own idea of the contract. This file
 * is the narrow rendezvous point for those consumers. Parsers remain beside the
 * code they parse, but every external check now asks this registry which fields
 * and model mappings exist.
 */

export type ImportContractKind =
  | 'article'
  | 'question'
  | 'practical'
  | 'catalogue-resource'
  | 'deck'
  | 'essay'
  | 'histology'
  | 'minigame'
  | 'glossary'
  | 'concept'
  | 'relation'
  | 'subjects'
  | 'resource'
  | 'claim'
  | 'citation'
  | 'span'

export interface ImportContract {
  kind: ImportContractKind
  label: string
  fields: ImportFieldDefinition[]
  parserOwner: string
  manualFiles: string[]
}

export const IMPORT_CONTRACTS: Record<ImportContractKind, ImportContract> = {
  article: {
    kind: 'article',
    label: 'Library article',
    fields: IMPORT_SCHEMAS.article.fields,
    parserOwner: 'src/data/bulkImport.ts#importRowToContent(article)',
    manualFiles: ['04-library-articles.md'],
  },
  question: {
    kind: 'question',
    label: 'Question',
    fields: IMPORT_SCHEMAS.question.fields,
    parserOwner: 'src/data/bulkImport.ts#importRowToContent(question)',
    manualFiles: ['05-questions.md'],
  },
  practical: {
    kind: 'practical',
    label: 'Practical',
    fields: IMPORT_SCHEMAS.practical.fields,
    parserOwner: 'src/data/bulkImport.ts#importRowToContent(practical)',
    manualFiles: [
      '06-osce-stations.md',
      '07-clinical-cases.md',
      '08-skills-checklists.md',
      '09-lab-interpretation.md',
      '10-imaging-interpretation.md',
    ],
  },
  'catalogue-resource': {
    kind: 'catalogue-resource',
    label: 'Catalogue resource',
    fields: IMPORT_SCHEMAS.resource.fields,
    parserOwner: 'src/data/bulkImport.ts#importRowToContent(resource)',
    manualFiles: ['12-resources.md'],
  },
  deck: {
    kind: 'deck',
    label: 'Flashcard deck',
    fields: IMPORT_SCHEMAS.deck.fields,
    parserOwner: 'src/data/bulkImport.ts#importRowToContent(deck)',
    manualFiles: ['14-decks-essays-histology.md'],
  },
  essay: {
    kind: 'essay',
    label: 'Written essay',
    fields: IMPORT_SCHEMAS.essay.fields,
    parserOwner: 'src/data/bulkImport.ts#importRowToContent(essay)',
    manualFiles: ['14-decks-essays-histology.md'],
  },
  histology: {
    kind: 'histology',
    label: 'Histology slide',
    fields: IMPORT_SCHEMAS.histology.fields,
    parserOwner: 'src/data/bulkImport.ts#importRowToContent(histology)',
    manualFiles: ['14-decks-essays-histology.md'],
  },
  minigame: {
    kind: 'minigame',
    label: 'Medicine minigame pack',
    fields: MINIGAME_IMPORT_FIELDS,
    parserOwner: 'src/data/minigameImport.ts#miniGamePackFromRow',
    manualFiles: ['14-decks-essays-histology.md'],
  },
  glossary: {
    kind: 'glossary',
    label: 'Glossary term',
    fields: GLOSSARY_IMPORT_FIELDS,
    parserOwner: 'src/data/glossaryImport.ts#glossaryTermFromRow',
    manualFiles: ['11-glossary-terms.md'],
  },
  concept: {
    kind: 'concept',
    label: 'Concept',
    fields: CONCEPT_IMPORT_FIELDS,
    parserOwner: 'src/data/conceptImport.ts#conceptFromRow',
    manualFiles: ['02-concepts.md'],
  },
  relation: {
    kind: 'relation',
    label: 'Relationship',
    fields: RELATION_IMPORT_FIELDS,
    parserOwner: 'src/data/conceptImport.ts#relationFromRow',
    manualFiles: ['03-relationships.md'],
  },
  subjects: {
    kind: 'subjects',
    label: 'Subjects & topics',
    fields: SUBJECTS_IMPORT_FIELDS,
    parserOwner: 'src/data/subjectsImport.ts',
    manualFiles: ['01-subjects-and-topics.md'],
  },
  resource: {
    kind: 'resource',
    label: 'Evidence source',
    fields: EVIDENCE_IMPORT_FIELDS.resource,
    parserOwner: 'src/data/evidenceImport.ts#resourceFromRow',
    manualFiles: ['12-resources.md'],
  },
  claim: {
    kind: 'claim',
    label: 'Evidence claim',
    fields: EVIDENCE_IMPORT_FIELDS.claim,
    parserOwner: 'src/data/evidenceImport.ts#claimFromRow',
    manualFiles: ['03-relationships.md'],
  },
  citation: {
    kind: 'citation',
    label: 'Evidence citation',
    fields: EVIDENCE_IMPORT_FIELDS.citation,
    parserOwner: 'src/data/evidenceImport.ts#citationFromRow',
    manualFiles: ['03-relationships.md'],
  },
  span: {
    kind: 'span',
    label: 'Evidence article span',
    fields: EVIDENCE_IMPORT_FIELDS.span,
    parserOwner: 'src/data/evidenceImport.ts#spanFromRow',
    manualFiles: ['03-relationships.md'],
  },
}

export const IMPORT_CONTRACT_ORDER: ImportContractKind[] = [
  'subjects', 'resource', 'catalogue-resource', 'article', 'concept', 'claim',
  'citation', 'span', 'relation', 'practical', 'question', 'deck', 'essay', 'histology', 'glossary', 'minigame',
]

export function importFieldKeys(kind: ImportContractKind): Set<string> {
  return new Set(IMPORT_CONTRACTS[kind].fields.map((field) => field.key))
}

export const IMPORT_EXEMPTIONS: Record<string, string> = {
  'Concept.mediaIds': 'Assigned when rights-checked media is attached through the media library, not by concept import.',
  'QuestionAuthoringData.media': 'Question media placements are created when a fulfilled media asset is attached to a slot.',
  'MediaRequest.slot': 'Chosen during fulfillment when the reviewer places the asset into its final owner slot.',
  'MediaRequest.answerLabel': 'Only meaningful for fulfilled answer media; chosen with the final slot.',
  'MediaRequest.reviewComments': 'Created inside the reviewer workspace as anchored discussion, not by bulk authoring import.',
  'PracticalCommon.universityIds': 'Practical scope is resolved by review/tagging. Imports currently carry module-subject paths, not direct university IDs.',
  'PracticalCommon.yearIds': 'Practical scope is resolved by review/tagging. Imports currently carry module-subject paths, not direct year IDs.',
  'PracticalCommon.moduleIds': 'Practical scope is resolved by review/tagging. Imports currently carry module-subject paths, not direct module IDs.',
  'ResourceAuthoringData.icon': 'Presentation glyph chosen by the resource UI from the type unless an editor overrides it later.',
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

export const ARTICLE_MAP = {
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

export const QUESTION_MAP = {
  format: 'format', writtenParts: 'written_parts', matching: 'matching_options',
  multiResponse: 'correct_answers', labeling: 'labeling_points',
  completion: 'completion_text',
  derivedFromFormat: 'derived_from', derivedFromId: 'derived_from',
  attachments: 'attachments', correctAnswer: 'correct_answer', answers: 'answer_a', attachedImage: 'attached_image',
  libraryIds: 'library_ids', resourceIds: 'resource_ids', tags: 'topic', learningObjective: 'learning_objective',
  authorNotes: 'author_notes', sourceCitation: 'source_citation', estimatedSeconds: 'estimated_seconds',
  randomiseAnswers: 'randomise_answers', media: null, mediaRequests: 'media_recommendations',
}

export const QUESTION_TAGS_MAP = {
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

export const CONCEPT_MAP = {
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
  moduleSubjectPaths: 'module_subject', mediaIds: null,
}

export const RELATION_MAP = {
  id: 'id', sourceId: 'source', type: 'type', targetId: 'target', evidenceClaimIds: 'evidence_claim_ids',
  citationIds: 'citation_ids', confidence: 'confidence', verificationStatus: 'verification_status',
  qualifiers: 'qualifiers', reviewer: 'reviewer', reviewedAt: 'reviewed_at',
}

export const ANNOTATION_MAP = { id: 'annotations', quote: 'annotations', conceptId: 'annotations', relation: 'annotations', block: 'annotations' }

export const PRACTICAL_COMMON_MAP = {
  references: 'references', conceptTags: 'main_concept', mediaRequests: 'media_needed',
  learningObjective: 'learning_objective', moduleSubjectPaths: 'module_subject',
  universityIds: null, yearIds: null, moduleIds: null,
}

export const OSCE_MAP = {
  ...PRACTICAL_COMMON_MAP,
  format: 'type', mediaUrl: 'station_image',
  candidateInstructions: 'candidate_instructions', actorOpening: 'actor_opening',
  actorSections: 'actor_sections', actorFlags: 'actor_flags', markSections: 'mark_scheme',
  difficulty: 'difficulty',
}

export const CASE_MAP = { ...PRACTICAL_COMMON_MAP, format: 'type', decisions: 'decisions', debrief: 'debrief' }

export const LAB_MAP = { ...PRACTICAL_COMMON_MAP, format: 'type', subtype: 'lab_subtype', questions: 'lab_questions' }

export const DECISION_MAP = {
  id: 'decisions', title: 'decisions', context: 'decisions', question: 'decisions', answers: 'decisions',
  rationale: 'decisions', conceptId: 'decisions', secondaryConceptIds: 'decisions', difficulty: 'decisions',
  mediaUrl: 'decisions',
}

export const LAB_QUESTION_MAP = {
  id: 'lab_questions', context: 'lab_questions', question: 'lab_questions', mediaUrl: 'lab_questions',
  answers: 'lab_questions', explanation: 'lab_questions', conceptId: 'lab_questions',
  secondaryConceptIds: 'lab_questions', difficulty: 'lab_questions',
}

export const MEDIA_REQUEST_MAP = {
  id: 'media_recommendations', ownerId: null, ownerKind: null,
  medium: 'media_recommendations', kind: 'media_recommendations', brief: 'media_recommendations',
  teachingPurpose: 'media_recommendations', section: 'media_recommendations',
  block: 'media_recommendations', anchorQuote: 'media_recommendations',
  priority: 'media_recommendations', status: 'media_recommendations',
  notes: 'media_recommendations', sourceDirection: 'media_recommendations',
  rightsNotes: 'media_recommendations', slot: null, answerLabel: null, mediaId: 'media_recommendations',
}

export const RESOURCE_AUTHORING_MAP = {
  universityIds: 'universities', yearIds: 'years', icon: null, institution: 'source', collectionId: null,
  storageKey: null, sha256: null, rights: null, processingStatus: null, reviewer: null, finalPublisher: null,
  chapters: 'chapter', moduleIds: 'module_ids', moduleSubjectPaths: 'module_subject',
  includedConceptIds: 'included_concepts',
  includedArticleIds: 'included_articles', conceptLocations: 'concept_locations',
}

export const RESOURCE_RECORD_MAP = {
  id: 'id', institution: 'institution', collectionId: 'collection_id', collectionPriority: null,
  title: 'title', storageKey: null, sourceRelativePath: 'source_relative_path', sourceUri: 'source_uri',
  mediaType: 'media_type', languages: 'languages', publicationDate: 'publication_date', pageCount: 'page_count',
  sha256: 'sha256', processingStatus: 'processing_status', rights: 'rights', validation: null,
  confidence: 'confidence', isAssessment: 'is_assessment', qualification: 'qualification', accessedAt: 'accessed_at',
}

export const MINIGAME_BASE_MAP = {
  id: 'id', kind: 'kind', title: 'title', subjectId: 'subject', topic: 'topic', summary: 'summary',
  source: 'source_label',
}

export const MINIGAME_SOURCE_MAP = {
  label: 'source_label', reviewedBy: 'reviewed_by', url: 'source_url', reviewedAt: 'reviewed_at',
}

export const ORDERED_MINIGAME_MAP = {
  kind: 'kind', prompt: 'prompt', steps: 'steps', explanation: 'explanation',
}

export const ORDERED_STEP_MAP = {
  id: 'steps', text: 'steps',
}

export const RED_FLAG_SORT_MAP = {
  kind: 'kind', prompt: 'prompt', lanes: 'urgent_lane', findings: 'findings',
}

export const RED_FLAG_FINDING_MAP = {
  id: 'findings', text: 'findings', lane: 'findings', rationale: 'findings',
}

export const CLAIM_MAP = {
  id: 'id', conceptId: 'concept_id', subject: 'subject', predicate: 'predicate', object: 'object',
  qualifiers: 'qualifiers', displayText: 'display_text', riskClass: 'risk_class',
  verificationStatus: 'verification_status', conflictStatus: 'conflict_status', confidence: 'confidence',
  freshness: 'freshness', timeSensitive: 'time_sensitive', reviewDue: 'review_due', citationIds: 'id',
}

export const CITATION_MAP = {
  id: 'id', claimId: 'claim_id', resourceId: 'resource_id', evidenceRole: 'evidence_role',
  locator: 'locator_type', supportSpan: 'support_span', contextNote: 'context_note',
  confidence: 'confidence', countsAsClaimEvidence: 'counts_as_claim_evidence',
}

export const SPAN_MAP = {
  id: 'id', articleId: 'article_id', sectionId: 'section_id', textHash: 'text_hash',
  currentLine: null, text: 'text', claimIds: 'claim_ids', citationIds: 'citation_ids',
}

export const SUBJECT_MAP = {
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
