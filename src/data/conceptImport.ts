/**
 * The complete `Concept` import contract.
 *
 * The old importer covered 14 of 54 fields, refused any ID that already existed,
 * and forced `articleIds: []`. That made the 1,718 concepts already in the
 * repository unreachable by import: they could not be enriched, only duplicated
 * under a new ID. This file is the whole contract, and it upserts.
 */

import { parseExamAppearances } from './examSignal.ts'
import type { Concept, ConceptGraph, ConceptRelation, ConceptRelationType, ConceptStatus } from './conceptGraph.ts'
import { CONCEPT_RELATIONS } from './conceptGraph.ts'
import { optionalList, importList, mapList } from './importSemantics.ts'
import type { CurriculumSystem } from './curriculumCatalog.ts'
import { mergeAuthoringData } from './importMerge.ts'

export interface ConceptImportField {
  key: string
  label: string
  required?: boolean
  help: string
}

export const CONCEPT_IMPORT_FIELDS: ConceptImportField[] = [
  { key: 'label', label: 'Concept name', required: true, help: 'The concept label students see.' },
  { key: 'id', label: 'Canonical ID', help: 'Existing ID to update, or a new one. Derived from the label when omitted.' },
  { key: 'canonical_key', label: 'Canonical key', help: 'Stable de-duplication key. Two records with the same key are the same concept.' },
  { key: 'aliases', label: 'Aliases', help: 'Alternate terms and spelling variants. An alias never creates a second concept.' },
  { key: 'arabic_label', label: 'Arabic label', help: 'Reviewed Arabic term.' },
  { key: 'arabic_aliases', label: 'Arabic aliases', help: 'Reviewed Arabic alternates.' },
  { key: 'definition', label: 'Definition', help: 'What the concept is, in one or two sentences.' },
  { key: 'explicit_objective', label: 'Explicit objective', help: 'What a student must be able to do. This is what a question tests.' },
  { key: 'pitfalls', label: 'Common pitfall', help: 'The mistake students actually make.' },
  { key: 'concept_type', label: 'Concept type', help: 'e.g. definition, mechanism, classification, clinical_feature.' },
  { key: 'status', label: 'Status', help: 'active, under review, or inactive.' },
  { key: 'subject', label: 'System / subject ID', help: 'One of cvs, resp, renal, gi, neuro, endo, msk, pharm.' },
  { key: 'topic', label: 'Topic', help: 'Topic title or TPC_ ID from Subjects & Topics.' },
  { key: 'subtopic', label: 'Subtopic', help: 'Subtopic title or SUB_ ID.' },
  { key: 'microtopic', label: 'Microtopic', help: 'Microtopic title or MIC_ ID.' },
  { key: 'nanotopic', label: 'Nanotopic', help: 'Nanotopic title or NAN_ ID.' },
  { key: 'primary_node_id', label: 'Canonical node ID', help: 'Primary placement in the canonical taxonomy, e.g. SYS-CVS-T01.' },
  { key: 'secondary_node_ids', label: 'Secondary node IDs', help: 'Other reviewed placements across the four views.' },
  { key: 'learner_years', label: 'Learner years', help: 'Numeric years this applies to, e.g. 2 | 3.' },
  { key: 'universities', label: 'University IDs', help: 'Universities this concept applies to.' },
  { key: 'modules', label: 'Module IDs', help: 'Modules this concept sits under.' },
  { key: 'article_ids', label: 'Article IDs', help: 'Articles that teach this concept. Reciprocal links are maintained on update.' },
  { key: 'related_article_ids', label: 'Related article IDs', help: 'Articles that discuss it without owning it.' },
  { key: 'related_concept_ids', label: 'Related concept IDs', help: 'The untyped neighbour list. Typed edges are imported separately.' },
  { key: 'resource_ids', label: 'Resource IDs', help: 'Resources approved for this concept.' },
  { key: 'approved_file_resource_ids', label: 'Approved file resources', help: 'File resources cleared for this concept.' },
  { key: 'approved_video_resource_ids', label: 'Approved video resources', help: 'Video resources cleared for this concept.' },
  { key: 'blueprint_weight', label: 'Blueprint weight (0–1)', help: 'Overall exam weight.' },
  { key: 'exam_weight_by_year', label: 'Exam weight by year', help: 'Per-year weight as "YEAR_ID=weight", e.g. HU_Y2=0.7 | HU_Y3=0.5.' },
  { key: 'clinical_relevance', label: 'Clinical relevance (0–1)', help: '' },
  { key: 'academic_relevance', label: 'Academic relevance (0–1)', help: '' },
  { key: 'weight_confidence', label: 'Weight confidence (0–1)', help: 'How sure the weights are. Be honest; a guess is not a 1.' },
  { key: 'exam_signal', label: 'Exam appearances', help: 'Which papers this concept came up on, one per line as "src_… | tier | year | p14". The blueprint weight is derived from these.' },
  { key: 'confidence', label: 'Confidence (0–1)', help: 'Extraction or authoring confidence. Never a substitute for verification.' },
  { key: 'support_mode', label: 'Support mode', help: 'How the concept is evidenced, e.g. direct_statement, inferred.' },
  { key: 'atomic_claim_ids', label: 'Atomic claim IDs', help: 'Evidence claims supporting this concept.' },
  { key: 'resource_occurrence_ids', label: 'Resource occurrence IDs', help: 'Where it appears in the source corpus.' },
  { key: 'source_candidate_ids', label: 'Source candidate IDs', help: 'Candidate records this concept was canonicalised from.' },
  { key: 'original_wording', label: 'Original wording', help: 'The source\'s own words, one per line. Preserves provenance through a merge.' },
  { key: 'merge_ids', label: 'Merge IDs', help: 'Merge records that folded other candidates into this one.' },
  { key: 'rejected_merge_candidate_ids', label: 'Rejected merge candidates', help: 'Candidates deliberately not merged, so the decision is not re-litigated.' },
  { key: 'conflicts', label: 'Conflicts', help: 'Where sources disagree. Record it; do not pick silently.' },
  { key: 'uncertainty', label: 'Uncertainty', help: 'What is unclear about this concept.' },
  { key: 'evidence_gaps', label: 'Evidence gaps', help: 'What is still unsupported.' },
  { key: 'owner', label: 'Owner', help: '' },
  { key: 'reviewer', label: 'Reviewer', help: '' },
  { key: 'final_publisher', label: 'Publisher', help: '' },
  { key: 'last_reviewed', label: 'Last reviewed', help: 'ISO date.' },
  { key: 'review_due', label: 'Review due', help: 'ISO date.' },
  { key: 'publication_status', label: 'Publication status', help: 'published, needs_evidence, under_review, or faculty_review.' },
  { key: 'editorial_review_status', label: 'Editorial review status', help: 'Free text describing where the record sits editorially.' },
  { key: 'exclusion_reason', label: 'Exclusion reason', help: 'Why this concept is deliberately not published.' },
  { key: 'field_notes', label: 'Field notes', help: 'Why a field is intentionally empty, one per line as "field: reason".' },
]

const CONCEPT_STATUSES: ConceptStatus[] = ['active', 'inactive', 'under review']

const number01 = (value?: string) => {
  const parsed = Number(value)
  return value?.trim() && Number.isFinite(parsed) ? Math.min(1, Math.max(0, parsed)) : undefined
}

const text = (value?: string) => value?.trim() || undefined

function weightMap(value?: string): Record<string, number> | undefined {
  const entries = (value ?? '').split(/[\n|;]/).map((pair) => pair.split('=').map((part) => part.trim())).filter(([key, weight]) => key && weight)
  if (!entries.length) return undefined
  return Object.fromEntries(entries.map(([key, weight]) => [key, Math.min(1, Math.max(0, Number(weight) || 0))]))
}

function noteMap(value?: string): Record<string, string> | undefined {
  const out: Record<string, string> = {}
  for (const line of (value ?? '').split(/\r?\n/)) {
    const [field, ...rest] = line.split(':')
    const reason = rest.join(':').trim()
    if (field.trim() && reason) out[field.trim()] = reason
  }
  return Object.keys(out).length ? out : undefined
}

/**
 * Resolve curriculum placement from a subject plus free-text titles or IDs.
 *
 * This lives here rather than in the import page so a script can produce exactly
 * what the admin wizard produces. It used to live only in the page, which meant
 * a simulated import silently dropped `subjectId` and every placement field —
 * the kind of divergence a dry run exists to catch.
 *
 * Only what actually resolved is returned. An unmatched title must never blank
 * a placement that already exists on an update.
 */
export function resolvePlacement(subjectId: string, values: Record<string, string>, tree: CurriculumSystem[]): Partial<Concept> {
  const system = tree.find((entry) => entry.id === subjectId || entry.short.toLowerCase() === subjectId.toLowerCase())
  if (!system) return subjectId ? { subjectId } : {}
  const findBy = <T extends { title: string }>(items: T[], query: string, idOf: (item: T) => string) =>
    query ? items.find((item) => item.title.toLowerCase() === query.toLowerCase() || idOf(item).toLowerCase() === query.toLowerCase()) : undefined

  const topic = findBy(system.topics, values.topic ?? '', (item) => item.tpcId)
  const subtopic = topic && findBy(topic.subs, values.subtopic ?? '', (item) => item.subId)
  const microtopic = subtopic && findBy(subtopic.micros, values.microtopic ?? '', (item) => item.micId)
  const nanotopic = microtopic && findBy(microtopic.nanos, values.nanotopic ?? '', (item) => item.nanId)
  return {
    subjectId: system.id,
    systemId: system.sysId,
    ...(topic ? { topicTagId: topic.tpcId } : {}),
    ...(subtopic ? { subtopicId: subtopic.subId } : {}),
    ...(microtopic ? { microtopicId: microtopic.micId } : {}),
    ...(nanotopic ? { nanotopicId: nanotopic.nanId } : {}),
  }
}

export const conceptIdFrom = (label: string) =>
  `med.concept.${label.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'concept'}`

/**
 * Build the concept a row describes.
 *
 * Absent list columns come back `undefined` so `mergeConcept` can tell "not
 * mentioned" from "emptied", exactly as the article importer does.
 */
export function conceptFromRow(values: Record<string, string>, placement: Partial<Concept> = {}): Concept {
  const label = values.label?.trim() ?? ''
  const status = CONCEPT_STATUSES.includes(values.status?.trim() as ConceptStatus) ? values.status.trim() as ConceptStatus : undefined
  return {
    id: values.id?.trim() || conceptIdFrom(label),
    label,
    canonicalKey: text(values.canonical_key),
    aliases: optionalList(values.aliases) as string[],
    arabicLabel: text(values.arabic_label),
    arabicAliases: optionalList(values.arabic_aliases),
    // `undefined`, not `''`, when the row is silent — otherwise an update that
    // only meant to change a status would blank the definition it never
    // mentioned. `materialiseNewConcept` supplies the empty string a genuinely
    // new record needs, exactly as it does for `aliases` and `articleIds`.
    definition: text(values.definition) as string,
    explicitObjective: text(values.explicit_objective),
    pitfalls: text(values.pitfalls),
    conceptType: text(values.concept_type),
    status,
    articleIds: optionalList(values.article_ids) as string[],
    relatedArticleIds: optionalList(values.related_article_ids),
    relatedConceptIds: optionalList(values.related_concept_ids),
    resourceIds: optionalList(values.resource_ids),
    approvedFileResourceIds: optionalList(values.approved_file_resource_ids),
    approvedVideoResourceIds: optionalList(values.approved_video_resource_ids),
    primaryNodeId: text(values.primary_node_id),
    secondaryNodeIds: optionalList(values.secondary_node_ids),
    learnerYears: mapList(optionalList(values.learner_years), (years) => years.map(Number).filter(Number.isFinite)),
    universityIds: optionalList(values.universities),
    moduleIds: optionalList(values.modules),
    blueprintWeight: number01(values.blueprint_weight),
    examWeightByYear: weightMap(values.exam_weight_by_year),
    clinicalRelevance: number01(values.clinical_relevance),
    academicRelevance: number01(values.academic_relevance),
    weightConfidence: number01(values.weight_confidence),
    examSignal: (() => {
      const appearances = parseExamAppearances(values.exam_signal)
      // Absent rather than an empty signal, so a concept that has never been
      // seen on a paper is not confused with one weighted at zero.
      if (!appearances.length) return undefined
      return { appearances, confidence: number01(values.weight_confidence) }
    })(),
    confidence: number01(values.confidence),
    supportMode: text(values.support_mode),
    atomicClaimIds: optionalList(values.atomic_claim_ids),
    resourceOccurrenceIds: optionalList(values.resource_occurrence_ids),
    sourceCandidateIds: optionalList(values.source_candidate_ids),
    originalWording: optionalList(values.original_wording),
    mergeIds: optionalList(values.merge_ids),
    rejectedMergeCandidateIds: optionalList(values.rejected_merge_candidate_ids),
    conflicts: optionalList(values.conflicts),
    uncertainty: optionalList(values.uncertainty),
    evidenceGaps: optionalList(values.evidence_gaps),
    owner: text(values.owner),
    reviewer: text(values.reviewer),
    finalPublisher: text(values.final_publisher),
    lastReviewed: text(values.last_reviewed),
    reviewDue: text(values.review_due),
    publicationStatus: text(values.publication_status),
    editorialReviewStatus: text(values.editorial_review_status),
    exclusionReason: text(values.exclusion_reason) ?? undefined,
    fieldNotes: noteMap(values.field_notes),
    ...placement,
  }
}

/**
 * Fill what a brand-new concept must carry for the field audit.
 *
 * The audit separates "this field is missing" from "this field is empty on
 * purpose", and reads the second off the key being present. A key set to
 * `undefined` does not survive `JSON.stringify`, so an optional field is written
 * as `null` — otherwise it vanishes the moment the record is persisted and the
 * audit reports it absent.
 *
 * Create-time only, and the distinction is load-bearing. Every blank this writes
 * is a concrete value, while `mergeConcept` skips only `undefined`, so running it
 * over an update replaces each field the row did not mention. Pass it to
 * `upsertRecords` as `materialise`; never map it over rows that may be updates.
 */
export function materialiseNewConcept(concept: Concept): Concept {
  const filled = { ...concept } as Record<string, unknown>
  for (const key of ['aliases', 'articleIds']) if (filled[key] === undefined) filled[key] = []
  if (filled.definition === undefined) filled.definition = ''
  if (filled.status === undefined) filled.status = 'under review'
  const present = [
    'systemId', 'topicTagId', 'subtopicId', 'microtopicId', 'nanotopicId', 'secondaryNodeIds',
    'relatedConceptIds', 'moduleIds', 'arabicLabel', 'arabicAliases', 'pitfalls',
    'approvedFileResourceIds', 'approvedVideoResourceIds', 'conflicts', 'uncertainty',
    'evidenceGaps', 'mergeIds', 'rejectedMergeCandidateIds', 'lastReviewed', 'reviewDue',
    'exclusionReason', 'resourceOccurrenceIds',
  ]
  for (const key of present) if (filled[key] === undefined) filled[key] = null
  return filled as unknown as Concept
}

/** Apply an imported row to the concept it updates, keeping what it did not mention. */
export function mergeConcept(existing: Concept, incoming: Concept): Concept {
  return mergeAuthoringData(
    existing as unknown as Record<string, unknown>,
    incoming as unknown as Record<string, unknown>,
  ) as unknown as Concept
}

/* ---- typed relations --------------------------------------------------- */

export const RELATION_IMPORT_FIELDS: ConceptImportField[] = [
  { key: 'id', label: 'Relation ID', help: 'Existing ID to update. Derived from source/type/target when omitted, so re-import is idempotent.' },
  { key: 'source', label: 'Source concept ID', required: true, help: 'The concept the edge points from.' },
  { key: 'type', label: 'Relation type', required: true, help: `One of: ${CONCEPT_RELATIONS.join(', ')}.` },
  { key: 'target', label: 'Target concept ID', required: true, help: 'The concept the edge points to.' },
  { key: 'evidence_claim_ids', label: 'Evidence claim IDs', help: 'Claims supporting this edge. Required before it can be verified.' },
  { key: 'citation_ids', label: 'Citation IDs', help: 'Citations backing those claims.' },
  { key: 'confidence', label: 'Confidence (0–1)', help: '' },
  { key: 'verification_status', label: 'Verification status', help: 'verified, needs_evidence, or conflicted. Only a resolving evidence chain may be verified.' },
  { key: 'qualifiers', label: 'Qualifiers', help: 'Extra facts about the edge, one per line as "key: value".' },
  { key: 'reviewer', label: 'Reviewer', help: '' },
  { key: 'reviewed_at', label: 'Reviewed at', help: 'ISO date.' },
]

export const relationIdFrom = (sourceId: string, type: string, targetId: string) => `rel-${sourceId}-${type}-${targetId}`

export function relationFromRow(values: Record<string, string>): ConceptRelation {
  const sourceId = values.source?.trim() ?? ''
  const targetId = values.target?.trim() ?? ''
  const type = values.type?.trim() as ConceptRelationType
  const qualifiers: Record<string, string> = {}
  for (const line of (values.qualifiers ?? '').split(/\r?\n/)) {
    const [key, ...rest] = line.split(':')
    if (key.trim() && rest.join(':').trim()) qualifiers[key.trim()] = rest.join(':').trim()
  }
  const status = ['verified', 'needs_evidence', 'conflicted'].includes(values.verification_status?.trim() ?? '')
    ? values.verification_status.trim() as ConceptRelation['verificationStatus']
    : undefined
  return {
    id: values.id?.trim() || relationIdFrom(sourceId, type, targetId),
    sourceId,
    type,
    targetId,
    evidenceClaimIds: importList(values.evidence_claim_ids),
    citationIds: importList(values.citation_ids),
    confidence: number01(values.confidence),
    verificationStatus: status,
    ...(Object.keys(qualifiers).length ? { qualifiers } : {}),
    reviewer: text(values.reviewer),
    reviewedAt: text(values.reviewed_at),
  }
}

/**
 * Everything wrong with one relation row.
 *
 * The endpoint and evidence checks run before commit rather than after, because
 * a broken edge in the graph is far harder to find than a rejected row.
 */
export function relationErrors(
  relation: ConceptRelation,
  graph: ConceptGraph,
  evidence: { claims: Array<{ id: string }>; citations: Array<{ id: string }> },
): string[] {
  const errors: string[] = []
  const has = (id: string) => graph.concepts.some((concept) => concept.id === id)
  if (!has(relation.sourceId)) errors.push(`Source concept ${relation.sourceId || '(blank)'} does not exist`)
  if (!has(relation.targetId)) errors.push(`Target concept ${relation.targetId || '(blank)'} does not exist`)
  if (relation.sourceId && relation.sourceId === relation.targetId) errors.push('A relation cannot point a concept at itself')
  if (!(CONCEPT_RELATIONS as readonly string[]).includes(relation.type)) errors.push(`"${relation.type || '(blank)'}" is not a relation type`)
  for (const id of relation.evidenceClaimIds ?? []) {
    if (!evidence.claims.some((claim) => claim.id === id)) errors.push(`Claim ${id} does not exist`)
  }
  for (const id of relation.citationIds ?? []) {
    if (!evidence.citations.some((citation) => citation.id === id)) errors.push(`Citation ${id} does not exist`)
  }
  // The field audit already rejects a verified relation with no evidence chain.
  // Catching it at import means the graph never holds one, even briefly.
  if (relation.verificationStatus === 'verified' && !(relation.evidenceClaimIds?.length && relation.citationIds?.length)) {
    errors.push('A relation may only be verified when it names both a claim and a citation')
  }
  return errors
}

/** A duplicate is the same direction, type and endpoints — regardless of ID. */
export function isDuplicateRelation(relation: ConceptRelation, existing: ConceptRelation[]): boolean {
  return existing.some((entry) =>
    entry.id !== relation.id &&
    entry.sourceId === relation.sourceId &&
    entry.targetId === relation.targetId &&
    entry.type === relation.type)
}
