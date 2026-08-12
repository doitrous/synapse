/**
 * Which teaching callouts a student may see.
 *
 * "Hold these" and "Where people lose the mark" are authored, reviewed content.
 * The reader used to discard both the moment an article became evidence-gated,
 * then substitute two hardcoded sentences in the traps panel — so a student was
 * shown invented filler in place of reviewed teaching. That is fixed in two
 * halves: this module decides, per line, whether a callout is publishable and
 * says why; and the reader shows nothing rather than inventing a replacement.
 *
 * The policy never exposes unverified text. A callout on an evidence-gated
 * article publishes only when it carries its own resolving evidence chain, or
 * when the article records that a human reviewed it.
 */

import type { ArticleAuthoringData } from './contentControl.ts'
import type { MedicalEvidenceStore } from './medicalEvidence.ts'

export type CalloutKind = 'hold' | 'trap'

export interface CalloutVerdict {
  text: string
  publishable: boolean
  /** Why, in the admin's language. Shown in the editor, never to a student. */
  reason: string
}

/** An article is evidence-gated once it carries a student projection. */
export function isEvidenceGated(data: Pick<ArticleAuthoringData, 'publishedSections'> | undefined): boolean {
  return Boolean(data?.publishedSections)
}

function hasResolvingEvidence(
  evidence: Pick<MedicalEvidenceStore, 'claims' | 'citations' | 'articleSpans'>,
  entry: { claimIds?: string[]; citationIds?: string[]; spanId?: string } | undefined,
): boolean {
  if (!entry) return false
  const claims = entry.claimIds ?? []
  const citations = entry.citationIds ?? []
  if (entry.spanId && evidence.articleSpans.some((span) => span.id === entry.spanId)) return true
  if (claims.length && claims.every((id) => evidence.claims.some((claim) => claim.id === id))) return true
  if (citations.length && citations.every((id) => evidence.citations.some((citation) => citation.id === id))) return true
  return false
}

/**
 * Decide every callout of one kind for one article.
 *
 * The order of the returned verdicts matches the authored order, so the editor
 * can show them beside the lines an author is editing.
 */
export function calloutVerdicts(
  kind: CalloutKind,
  data: ArticleAuthoringData | undefined,
  evidence: Pick<MedicalEvidenceStore, 'claims' | 'citations' | 'articleSpans'>,
): CalloutVerdict[] {
  const lines = ((kind === 'hold' ? data?.holdThese : data?.loseTheMark) ?? []).filter((line) => line?.trim())
  if (!lines.length) return []

  // An article with no student projection was never evidence-gated. Its callouts
  // are the older authoring path and publish as they always did.
  if (!isEvidenceGated(data)) {
    return lines.map((text) => ({ text, publishable: true, reason: 'Article is not evidence-gated' }))
  }

  const reviewedAt = data?.lastReviewed?.trim()
  return lines.map((text) => {
    const entry = data?.calloutEvidence?.[text]
    if (hasResolvingEvidence(evidence, entry)) {
      return { text, publishable: true, reason: 'Has a resolving evidence chain' }
    }
    if (entry?.reviewedBy?.trim()) {
      return { text, publishable: true, reason: `Reviewed by ${entry.reviewedBy.trim()}` }
    }
    if (reviewedAt) {
      return { text, publishable: true, reason: `Article reviewed ${reviewedAt}` }
    }
    if (entry) {
      return { text, publishable: false, reason: 'Named evidence does not resolve in the published evidence store' }
    }
    return { text, publishable: false, reason: 'No evidence and no recorded review' }
  })
}

/** Just the text a student may see, in authored order. */
export function publishableCallouts(
  kind: CalloutKind,
  data: ArticleAuthoringData | undefined,
  evidence: Pick<MedicalEvidenceStore, 'claims' | 'citations' | 'articleSpans'>,
): string[] {
  return calloutVerdicts(kind, data, evidence).filter((verdict) => verdict.publishable).map((verdict) => verdict.text)
}
