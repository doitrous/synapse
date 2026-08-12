/**
 * Import contracts for the evidence store.
 *
 * Claims, citations, resources and article spans could only ever be created by
 * the generation pipeline. That made every authored concept permanently
 * `needs_evidence`: there was no way to record the source that supports it, so
 * nothing could pass its gate no matter how well authored. This is the missing
 * surface.
 *
 * The rules here are the ones the field audit already enforces at rest, applied
 * at import time instead — a citation that counts as evidence must carry an
 * exact locator, and a claim may only be `verified` when a citation that counts
 * actually resolves. Catching that before the write means the store never holds
 * an unsupported claim, even briefly.
 */

import type { EvidenceClaim, CitationLink, ResourceRecord, ArticleSpan, EvidenceLocator, MedicalEvidenceStore, VerificationState } from './medicalEvidence.ts'
import { importList } from './importSemantics.ts'

export interface EvidenceImportField {
  key: string
  label: string
  required?: boolean
  help: string
}

export type EvidenceRecordKind = 'resource' | 'claim' | 'citation' | 'span'

export const EVIDENCE_RECORD_LABEL: Record<EvidenceRecordKind, string> = {
  resource: 'Sources',
  claim: 'Claims',
  citation: 'Citations',
  span: 'Article spans',
}

/* ---- field contracts ---------------------------------------------------- */

export const EVIDENCE_IMPORT_FIELDS: Record<EvidenceRecordKind, EvidenceImportField[]> = {
  resource: [
    { key: 'id', label: 'Resource ID', required: true, help: 'Stable ID. Use the corpus source ID (src_…) for a local file, or RES-WEB-… for a web source.' },
    { key: 'title', label: 'Title', required: true, help: 'The source as it would be cited.' },
    { key: 'institution', label: 'Institution or publisher', required: true, help: 'e.g. Kasr Alainy, OpenStax, WHO.' },
    { key: 'collection_id', label: 'Collection', help: 'Which corpus collection this belongs to.' },
    { key: 'source_relative_path', label: 'Source path', help: 'Path within the corpus. Never an absolute path from an authoring machine.' },
    { key: 'source_uri', label: 'Source URL', help: 'For a web source. Record the URL you actually read.' },
    { key: 'media_type', label: 'Media type', help: 'e.g. application/pdf, text/html.' },
    { key: 'languages', label: 'Languages', help: 'e.g. en | ar.' },
    { key: 'publication_date', label: 'Publication or update date', help: 'ISO date. Required for a web source under LD-08.' },
    { key: 'accessed_at', label: 'Access date', help: 'ISO date you read it. Required for a web source.' },
    { key: 'page_count', label: 'Page count', help: '' },
    { key: 'sha256', label: 'SHA-256', help: 'Content hash of the file, where one exists.' },
    { key: 'processing_status', label: 'Processing status', required: true, help: 'The corpus state, or `authoritative_article_level_reference` for a web source.' },
    { key: 'rights', label: 'Rights', help: 'Licence or permission basis.' },
    { key: 'qualification', label: 'Qualification', help: 'Why this source is qualified to support a medical claim.' },
    { key: 'confidence', label: 'Confidence (0–1)', help: 'How much weight this source carries.' },
    { key: 'is_assessment', label: 'Is an assessment source', help: 'yes or no. An exam paper is curriculum signal, not medical authority.' },
  ],
  claim: [
    { key: 'id', label: 'Claim ID', required: true, help: 'Stable ID, e.g. CLM-FND-…' },
    { key: 'concept_id', label: 'Concept ID', required: true, help: 'The concept this claim supports. Must already exist.' },
    { key: 'subject', label: 'Subject', required: true, help: 'The thing the claim is about.' },
    { key: 'predicate', label: 'Predicate', required: true, help: 'The relation asserted, e.g. "is", "causes", "contains".' },
    { key: 'object', label: 'Object', required: true, help: 'What is asserted of the subject.' },
    { key: 'display_text', label: 'Display text', required: true, help: 'The claim as one readable sentence. This is what a student may see.' },
    { key: 'risk_class', label: 'Risk class', required: true, help: 'foundational_stable, clinical_non_treatment, or treatment_or_action.' },
    { key: 'verification_status', label: 'Verification status', help: 'verified, needs_evidence, conflicted, or excluded. Defaults to needs_evidence.' },
    { key: 'conflict_status', label: 'Conflict status', help: 'none, or a description of how sources disagree.' },
    { key: 'confidence', label: 'Confidence (0–1)', help: '' },
    { key: 'freshness', label: 'Freshness', help: 'e.g. stable_local_curriculum_fact, or a guideline cycle.' },
    { key: 'time_sensitive', label: 'Time sensitive', help: 'yes or no. Anything that moves with guideline cycles is yes.' },
    { key: 'review_due', label: 'Review due', help: 'ISO date. Required when time-sensitive.' },
    { key: 'qualifiers', label: 'Qualifiers', help: 'One "key: value" per line — polarity, laterality, population, state, numbers and units.' },
  ],
  citation: [
    { key: 'id', label: 'Citation ID', required: true, help: 'Stable ID, e.g. CIT-…' },
    { key: 'claim_id', label: 'Claim ID', required: true, help: 'The claim this supports. Must already exist.' },
    { key: 'resource_id', label: 'Resource ID', required: true, help: 'The source. Must already exist.' },
    { key: 'evidence_role', label: 'Evidence role', required: true, help: 'local_curriculum for a university source; independent_verification for an authoritative one.' },
    { key: 'support_span', label: 'Support span', required: true, help: 'The source\'s own words that support the claim. Quoted, not paraphrased.' },
    { key: 'locator_type', label: 'Locator type', help: 'page, printed_page, section, line, span, timestamp.' },
    { key: 'locator_page', label: 'Page', help: 'Page number in the file.' },
    { key: 'locator_section', label: 'Section', help: 'Named section or heading.' },
    { key: 'locator_detail', label: 'Locator detail', help: 'Anything finer — a line range, a character span, a timestamp.' },
    { key: 'context_note', label: 'Context note', help: 'What a reader needs to know to interpret the span.' },
    { key: 'confidence', label: 'Confidence (0–1)', help: '' },
    { key: 'counts_as_claim_evidence', label: 'Counts as evidence', help: 'yes or no. Only a citation with an exact locator may count.' },
  ],
  span: [
    { key: 'id', label: 'Span ID', required: true, help: 'Stable ID, e.g. SPN-…' },
    { key: 'article_id', label: 'Article ID', required: true, help: 'The article this span sits in.' },
    { key: 'section_id', label: 'Section ID', required: true, help: 'The section within that article.' },
    { key: 'text', label: 'Text', required: true, help: 'The exact sentence a student sees, which the claims below support.' },
    { key: 'text_hash', label: 'Text hash', help: 'Stable hash of the text. Derived when omitted, so a reflow cannot detach it.' },
    { key: 'claim_ids', label: 'Claim IDs', help: 'Claims supporting this sentence.' },
    { key: 'citation_ids', label: 'Citation IDs', help: 'Citations backing those claims.' },
  ],
}

/* ---- builders ----------------------------------------------------------- */

const text = (value?: string) => value?.trim() || undefined
const number = (value?: string) => {
  const parsed = Number(value)
  return value?.trim() && Number.isFinite(parsed) ? parsed : undefined
}
const clamp01 = (value?: string) => {
  const parsed = number(value)
  return parsed === undefined ? undefined : Math.min(1, Math.max(0, parsed))
}
const yes = (value?: string) => /^(yes|true|1)$/i.test(value?.trim() ?? '')

/** A content hash, so a span survives the prose around it being reflowed. */
export function hashText(value: string): string {
  let hash = 2166136261
  for (let index = 0; index < value.length; index++) hash = Math.imul(hash ^ value.charCodeAt(index), 16777619)
  return (hash >>> 0).toString(36)
}

function keyedMap(value?: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const line of (value ?? '').split(/\r?\n/)) {
    const [key, ...rest] = line.split(':')
    if (key.trim() && rest.join(':').trim()) out[key.trim()] = rest.join(':').trim()
  }
  return out
}

export function resourceFromRow(values: Record<string, string>): ResourceRecord {
  return {
    id: values.id?.trim() ?? '',
    title: values.title?.trim() ?? '',
    institution: values.institution?.trim() ?? '',
    collectionId: text(values.collection_id),
    sourceRelativePath: text(values.source_relative_path),
    sourceUri: text(values.source_uri),
    mediaType: text(values.media_type),
    languages: importList(values.languages),
    publicationDate: text(values.publication_date) ?? null,
    pageCount: number(values.page_count) ?? null,
    sha256: text(values.sha256),
    processingStatus: values.processing_status?.trim() ?? '',
    rights: text(values.rights),
    qualification: text(values.qualification),
    confidence: clamp01(values.confidence) ?? 0,
    isAssessment: values.is_assessment?.trim() ? yes(values.is_assessment) : undefined,
    accessedAt: text(values.accessed_at) ?? null,
  }
}

export function claimFromRow(values: Record<string, string>): EvidenceClaim {
  return {
    id: values.id?.trim() ?? '',
    conceptId: values.concept_id?.trim() ?? '',
    subject: values.subject?.trim() ?? '',
    predicate: values.predicate?.trim() ?? '',
    object: values.object?.trim() ?? '',
    qualifiers: keyedMap(values.qualifiers),
    displayText: values.display_text?.trim() ?? '',
    riskClass: values.risk_class?.trim() ?? 'foundational_stable',
    verificationStatus: (['verified', 'needs_evidence', 'conflicted', 'excluded'].includes(values.verification_status?.trim() ?? '')
      ? values.verification_status.trim()
      : 'needs_evidence') as VerificationState,
    conflictStatus: values.conflict_status?.trim() || 'none',
    confidence: clamp01(values.confidence) ?? 0,
    freshness: values.freshness?.trim() || 'unspecified',
    timeSensitive: yes(values.time_sensitive),
    reviewDue: text(values.review_due) ?? null,
    citationIds: importList(values.citation_ids),
  }
}

export function citationFromRow(values: Record<string, string>): CitationLink {
  const locator: EvidenceLocator = {}
  if (text(values.locator_type)) locator.type = values.locator_type.trim()
  if (text(values.locator_page)) locator.page = number(values.locator_page) ?? values.locator_page.trim()
  if (text(values.locator_section)) locator.section = values.locator_section.trim()
  if (text(values.locator_detail)) locator.span = values.locator_detail.trim()
  return {
    id: values.id?.trim() ?? '',
    claimId: values.claim_id?.trim() ?? '',
    resourceId: values.resource_id?.trim() ?? '',
    evidenceRole: values.evidence_role?.trim() ?? '',
    locator,
    supportSpan: values.support_span?.trim() ?? '',
    contextNote: text(values.context_note),
    confidence: clamp01(values.confidence) ?? 0,
    countsAsClaimEvidence: values.counts_as_claim_evidence?.trim() ? yes(values.counts_as_claim_evidence) : true,
  }
}

export function spanFromRow(values: Record<string, string>): ArticleSpan {
  const body = values.text?.trim() ?? ''
  return {
    id: values.id?.trim() ?? '',
    articleId: values.article_id?.trim() ?? '',
    sectionId: values.section_id?.trim() ?? '',
    textHash: text(values.text_hash) ?? hashText(body),
    text: body,
    currentLine: null,
    claimIds: importList(values.claim_ids),
    citationIds: importList(values.citation_ids),
  }
}

/* ---- validation --------------------------------------------------------- */

export interface EvidenceContext {
  store: Pick<MedicalEvidenceStore, 'claims' | 'citations' | 'resources' | 'articleSpans'>
  conceptIds: Set<string>
  articleIds: Set<string>
  /** Records arriving in the same file, which may satisfy each other's references. */
  incoming?: {
    claims?: Set<string>
    resources?: Set<string>
    citations?: Set<string>
    /**
     * Claim IDs that a counting citation in this batch already supports.
     *
     * A claim and the citations backing it are authored together, and the claim
     * row does not repeat the citation IDs — the citation names its claim, and
     * `linkCitationsToClaims` fills in the reverse at commit. Without this the
     * validator would reject every verified claim in a well-formed batch.
     */
    claimsWithEvidence?: Set<string>
    /** How many counting citations back each claim, for the two-source rule. */
    evidenceCountByClaim?: Map<string, number>
  }
}

const has = (id: string, existing: Array<{ id: string }>, incoming?: Set<string>) =>
  existing.some((entry) => entry.id === id) || Boolean(incoming?.has(id))

/** Everything wrong with one evidence row, in the author's language. */
export function evidenceErrors(kind: EvidenceRecordKind, values: Record<string, string>, context: EvidenceContext): string[] {
  const errors: string[] = []
  const required = EVIDENCE_IMPORT_FIELDS[kind].filter((field) => field.required)
  for (const field of required) if (!values[field.key]?.trim()) errors.push(`${field.label} is required`)

  if (kind === 'resource') {
    const resource = resourceFromRow(values)
    // A web source without a date cannot be re-checked, and LD-08 requires both.
    if (resource.sourceUri && !resource.publicationDate) errors.push('A web source needs a publication or update date')
    if (resource.sourceUri && !resource.accessedAt) errors.push('A web source needs the date you read it')
    if (resource.sourceRelativePath?.startsWith('/')) errors.push('Source path must be relative to the corpus, not an absolute path from an authoring machine')
  }

  if (kind === 'claim') {
    const claim = claimFromRow(values)
    if (claim.conceptId && !context.conceptIds.has(claim.conceptId)) errors.push(`Concept ${claim.conceptId} does not exist`)
    if (!['foundational_stable', 'clinical_non_treatment', 'treatment_or_action'].includes(String(claim.riskClass))) {
      errors.push('Risk class must be foundational_stable, clinical_non_treatment, or treatment_or_action')
    }
    if (claim.timeSensitive && !claim.reviewDue) errors.push('A time-sensitive claim needs a review-due date')
    const supported = claim.citationIds.length > 0 || Boolean(context.incoming?.claimsWithEvidence?.has(claim.id))
    if (claim.verificationStatus === 'verified' && !supported) {
      errors.push('A claim may only be verified when a citation that counts as evidence supports it')
    }
    // Treatment content is labelled, not blocked (LD-12), but it may not claim
    // verification off a single source.
    const supportCount = Math.max(claim.citationIds.length, context.incoming?.claimsWithEvidence?.has(claim.id) ? (context.incoming.evidenceCountByClaim?.get(claim.id) ?? 1) : 0)
    if (claim.riskClass === 'treatment_or_action' && claim.verificationStatus === 'verified' && supportCount < 2) {
      errors.push('Treatment or action claims need two independent citations before they can be verified (LD-08)')
    }
  }

  if (kind === 'citation') {
    const citation = citationFromRow(values)
    if (citation.claimId && !has(citation.claimId, context.store.claims, context.incoming?.claims)) errors.push(`Claim ${citation.claimId} does not exist`)
    if (citation.resourceId && !has(citation.resourceId, context.store.resources, context.incoming?.resources)) errors.push(`Resource ${citation.resourceId} does not exist`)
    const locator = citation.locator as EvidenceLocator
    const hasLocator = Object.keys(locator).some((key) => key !== 'type' && locator[key] !== undefined)
    // The field audit rejects this at rest; rejecting it here means it never lands.
    if (citation.countsAsClaimEvidence && !hasLocator) errors.push('A citation that counts as evidence needs an exact locator — a page, section, line or timestamp')
    if (!citation.supportSpan) errors.push('A citation needs the source\'s own words, quoted rather than paraphrased')
  }

  if (kind === 'span') {
    const span = spanFromRow(values)
    if (span.articleId && !context.articleIds.has(span.articleId)) errors.push(`Article ${span.articleId} does not exist`)
    for (const id of span.claimIds) if (!has(id, context.store.claims, context.incoming?.claims)) errors.push(`Claim ${id} does not exist`)
    for (const id of span.citationIds) if (!has(id, context.store.citations, context.incoming?.citations)) errors.push(`Citation ${id} does not exist`)
  }

  return errors
}

/**
 * Re-derive `citationIds` on claims from the citations that point at them.
 *
 * A claim and its citations arrive in the same file, and asking an author to
 * keep both directions in step by hand is asking for a mismatch. The citation
 * names its claim; this fills in the reverse.
 */
export function linkCitationsToClaims(claims: EvidenceClaim[], citations: CitationLink[]): EvidenceClaim[] {
  return claims.map((claim) => {
    const found = citations.filter((citation) => citation.claimId === claim.id).map((citation) => citation.id)
    const merged = [...new Set([...claim.citationIds, ...found])]
    return merged.length === claim.citationIds.length ? claim : { ...claim, citationIds: merged }
  })
}
