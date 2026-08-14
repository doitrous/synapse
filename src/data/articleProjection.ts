/**
 * Pure projection rules shared by the live library.
 *
 * These live outside the hook so they can be tested without React, and so the
 * rule for "what may a student see" is stated once rather than re-implemented
 * per surface.
 */

import { normalizeProse } from '../lib/prose.ts'
import { isMediaReleased, type ManagedContentItem, type ArticleMediaRecord } from './contentControl.ts'
import type { ConceptGraph } from './conceptGraph.ts'
import type { RelatedArticleLink, ReaderAnnotation, Subtopic, LibBlock } from './library.ts'
import type { ArticleSpan, MedicalEvidenceStore } from './medicalEvidence.ts'
import { publishableCallouts } from './calloutPolicy.ts'
import { universities } from './universities.ts'

/**
 * Where an article records why it links to another.
 *
 * The reason belongs to the pair, not to either article alone, so it is keyed by
 * the other article's ID inside the linking article's `fieldNotes`.
 */
export const relatedReasonKey = (targetId: string) => `relatedArticle:${targetId}`

/**
 * Related reading a student can actually open.
 *
 * A link survives only when it points at an article this projection will render.
 * A dead ID, an archived article, or one held back by the publication mode would
 * otherwise render as a link to nothing. Self-links and duplicates are dropped.
 */
export function relatedArticleLinks(
  ids: string[] | undefined,
  readable: Map<string, ManagedContentItem>,
  selfId: string,
  reasons?: Record<string, string>,
): RelatedArticleLink[] {
  const seen = new Set<string>()
  const links: RelatedArticleLink[] = []
  for (const id of ids ?? []) {
    const key = id?.trim()
    if (!key || key === selfId || seen.has(key)) continue
    const target = readable.get(key)
    if (!target) continue
    seen.add(key)
    const reason = reasons?.[relatedReasonKey(key)]?.trim()
    links.push({ id: key, title: target.title, ...(reason ? { reason } : {}) })
  }
  return links
}

/**
 * Statement annotations a student may see.
 *
 * An annotation is an editor-side record naming a concept, a relation, and the
 * exact words it applies to. Only the quote and the concept's label reach the
 * reader — never the concept ID or the relation name — and only once the concept
 * itself is published. An annotation whose quote is not in the article is
 * dropped: it would highlight nothing.
 */
export function readerAnnotations(item: ManagedContentItem, graph: ConceptGraph): ReaderAnnotation[] {
  const out: ReaderAnnotation[] = []
  const seen = new Set<string>()
  for (const annotation of item.articleData?.annotations ?? []) {
    const quote = annotation.quote?.trim()
    if (!quote || seen.has(quote)) continue
    const concept = graph.concepts.find((entry) => entry.id === annotation.conceptId)
    if (!concept || concept.publicationStatus !== 'published') continue
    seen.add(quote)
    out.push({ quote, conceptId: concept.id, conceptLabel: concept.label, block: annotation.block })
  }
  return out
}

/**
 * Media a student is shown.
 *
 * Incomplete records are held back by default, but an admin can release any of
 * them with `releaseWithoutReview`. The admin editor states which items are
 * held back and why, so this never withholds anything silently.
 */
function publishableMedia(media?: ArticleMediaRecord[]): ArticleMediaRecord[] {
  return (media ?? []).filter(isMediaReleased)
}

/**
 * Split a section body into paragraph blocks.
 *
 * Typography is settled here rather than at render time so that every surface
 * that reads a projected article — reader, search, notebook templates, the
 * question bank's linked excerpts — shows the same text. Authored content uses
 * straight quotes while the app's own copy uses typographic ones, which is what
 * made quoted phrases look unstyled.
 */
function bodyToBlocks(body: string): LibBlock[] {
  return normalizeProse(body)
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((text) => ({ type: 'p', text }))
}

/** Apply an admin ledger article item's edits on top of a seeded subtopic. */
export function overlaySubtopic(
  sub: Subtopic,
  item: ManagedContentItem | undefined,
  evidence: MedicalEvidenceStore,
  graph: ConceptGraph,
  readable: Map<string, ManagedContentItem>,
): Subtopic {
  if (!item) return sub
  const d = item.articleData
  const sections = (d?.sections ?? []).filter((s) => s.heading?.trim() || s.body?.trim())
  const hasEditedBody = sections.some((s) => s.body?.trim())
  const traps = publishableCallouts('trap', d, evidence)

  let blocks: LibBlock[] = sub.blocks
  if (hasEditedBody) {
    blocks = []
    sections.forEach((s) => {
      if (s.heading?.trim()) blocks.push({ type: 'h', text: s.heading.trim() })
      if (s.body?.trim()) blocks.push(...bodyToBlocks(s.body))
    })
    // Traps are returned separately, for the reader's own panel. Appending them
    // here as well is what made them appear twice — see articleToSubtopic.
  }

  // University-only notes render as a distinct accent callout wherever the article appears.
  const notes = (d?.universityNotes ?? []).filter((n) => n.text?.trim())
  if (notes.length) {
    blocks = [
      ...blocks,
      ...notes.map((n): LibBlock => {
        const short = universities.find((u) => u.id === n.universityId)?.short ?? n.universityId
        return { type: 'callout', tone: 'accent', title: `${short} only`, text: n.text.trim() }
      }),
    ]
  }

  const keyPoints = publishableCallouts('hold', d, evidence)
  return {
    ...sub,
    title: item.title?.trim() || sub.title,
    summary: (d?.summary || item.fields.Summary || sub.summary),
    readingMin: Number(item.fields['Reading time']) || sub.readingMin,
    keyPoints: keyPoints.length ? keyPoints : sub.keyPoints,
    traps,
    relatedArticles: relatedArticleLinks(d?.relatedArticleIds, readable, item.id, d?.fieldNotes),
    annotations: readerAnnotations(item, graph),
    blocks,
    media: publishableMedia(d?.media),
    updatedAt: item.updatedAt || sub.updatedAt,
  }
}

/**
 * The evidence spans that belong to one section.
 *
 * A span already records the article and section it sits in, so the reciprocal
 * `section.spanIds` is a second copy of the same fact — and copies drift. It
 * also cannot be written honestly at authoring time: spans are imported after
 * the article that contains them, so the article row would have to name ids
 * that do not exist yet. The link is therefore derived from the spans, and
 * `spanIds` is kept only as an explicit ordering hint for sections that use it.
 */
export function sectionSpans(
  articleId: string,
  section: { id?: string; spanIds?: string[] },
  evidence: MedicalEvidenceStore,
): ArticleSpan[] {
  const named = (section.spanIds ?? [])
    .map((id) => evidence.articleSpans.find((span) => span.id === id))
    .filter((span): span is ArticleSpan => Boolean(span))
  const seen = new Set(named.map((span) => span.id))
  const derived = section.id
    ? evidence.articleSpans.filter((span) => span.articleId === articleId && span.sectionId === section.id && !seen.has(span.id))
    : []
  return [...named, ...derived]
}

/** Build a fresh subtopic from an admin-created article that has no seed. */
export function articleToSubtopic(
  item: ManagedContentItem,
  evidence: MedicalEvidenceStore,
  graph: ConceptGraph,
  readable: Map<string, ManagedContentItem>,
): Subtopic {
  const d = item.articleData
  const isEvidenceGated = Boolean(d?.publishedSections)
  // The generated "Components and relations" section is a machine listing of
  // concepts and relations, not reading material. It never reaches the reader.
  const sections = (d?.publishedSections ?? d?.sections ?? [])
    .filter((s) => s.kind !== 'components')
    .filter((s) => s.heading?.trim() || s.narrative?.trim() || s.body?.trim())
    .filter((s) => !/^Evidence not yet available/i.test(s.body.trim()))
  const blocks: LibBlock[] = []
  // Facts are collected as we go and listed once, under Sources, at the end —
  // so the article reads as prose rather than as a column of sourced sentences.
  const sourceBlocks: LibBlock[] = []
  sections.forEach((s) => {
    if (s.heading?.trim()) blocks.push({ type: 'h', text: s.heading.trim() })
    const spans = sectionSpans(item.id, s, evidence)
    const facts: LibBlock[] = spans.map((span) => ({ type: 'fact', text: span!.text, spanId: span!.id, claimIds: span!.claimIds, citationIds: span!.citationIds }))
    if (s.narrative?.trim()) {
      // Reviewed narrative prose: read the article, then check its sources.
      blocks.push(...bodyToBlocks(s.narrative))
      sourceBlocks.push(...facts)
    } else if (facts.length) {
      // No prose written for this section yet — keep the verified facts inline
      // rather than dropping content a student can already read.
      blocks.push(...facts)
    } else if (!(s.spanIds?.length) && s.body?.trim()) {
      // Never fall back to draft prose when its named evidence spans are absent
      // from the publication-gated evidence store.
      blocks.push(...bodyToBlocks(s.body))
    }
  })
  // Reviewed traps survive the evidence gate. `publishableCallouts` decides each
  // line on its own evidence, so gating an article no longer discards teaching a
  // human already checked.
  //
  // They are returned on `traps` for the reader's "Where people lose the mark"
  // panel and deliberately NOT pushed into `blocks`: doing both printed every
  // trap twice, once as a warning callout tacked onto the end of the article and
  // again in the panel meant to hold them.
  const traps = publishableCallouts('trap', d, evidence)
  ;(isEvidenceGated ? [] : d?.universityNotes ?? []).filter((n) => n.text?.trim()).forEach((n) => {
    const short = universities.find((u) => u.id === n.universityId)?.short ?? n.universityId
    blocks.push({ type: 'callout', tone: 'accent', title: `${short} only`, text: n.text!.trim() })
  })
  if (sourceBlocks.length) blocks.push({ type: 'sources', count: sourceBlocks.length }, ...sourceBlocks)
  // Authored key points follow the same per-line evidence policy as traps.
  const authoredKeyPoints = publishableCallouts('hold', d, evidence)
  // `blocks` already contains sourceBlocks by this point — reading both would
  // repeat every fact, and key points are rendered keyed by their own text.
  const factKeyPoints = blocks.filter((block) => block.type === 'fact').map((block) => block.text ?? '').filter(Boolean).slice(0, 5)
  return {
    id: item.id,
    title: item.title,
    readingMin: Number(item.fields['Reading time']) || 6,
    summary: d?.publishedSummary || d?.summary || item.fields.Summary || '',
    blocks,
    // Reviewed key points win. Verified facts stand in only when the policy
    // publishes none, so a gated article still shows something student-safe.
    keyPoints: authoredKeyPoints.length ? authoredKeyPoints : factKeyPoints,
    traps,
    relatedArticles: relatedArticleLinks(d?.relatedArticleIds, readable, item.id, d?.fieldNotes),
    annotations: readerAnnotations(item, graph),
    questions: [],
    media: publishableMedia(d?.media),
    resources: (d?.resourceIds ?? []).filter((id) => evidence.resources.some((resource) => resource.id === id)).map((id) => evidence.resources.find((resource) => resource.id === id)?.title ?? id),
    updatedAt: item.updatedAt,
    universityIds: d?.universityIds ?? [],
    yearIds: d?.yearIds ?? [],
    moduleIds: d?.moduleIds ?? [],
    primaryNodeId: d?.primaryNodeId,
    secondaryNodeIds: d?.secondaryNodeIds ?? [],
    relatedConceptIds: (d?.relatedConceptIds ?? []).filter((id) => !isEvidenceGated || evidence.claims.some((claim) => claim.conceptId === id)),
    resourceIds: (d?.resourceIds ?? []).filter((id) => evidence.resources.some((resource) => resource.id === id)),
    evidenceState: item.fields['Evidence state'],
    publicationGate: d?.publicationGate,
  }
}
