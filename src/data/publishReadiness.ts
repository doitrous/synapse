import type { ManagedContentItem } from './contentControl'

/**
 * Whether publishing an item would actually give a student something to read.
 *
 * Articles are evidence-gated: the student projection (`publishedSections`) is
 * built only from verified evidence spans, so an article whose evidence has not
 * cleared review projects to nothing. Publishing it puts a title and summary in
 * the library with no body — which looks like a broken page, not a draft. The
 * bulk actions use this to say what will happen before it happens.
 *
 * Other kinds carry no evidence gate today, so they are publishable as they are.
 */
export interface PublishReadiness {
  ready: boolean
  /** Why not, in the admin's language. Empty when ready. */
  reason: string
}

const GATE_REASON: Record<string, string> = {
  needs_evidence: 'Needs evidence',
  faculty_review: 'Faculty review',
  conflicted: 'Conflicting sources',
  excluded: 'Excluded',
}

export function publishReadiness(item: ManagedContentItem): PublishReadiness {
  if (item.status === 'Published') return { ready: false, reason: 'Already published' }
  if (item.kind !== 'article') return { ready: true, reason: '' }

  const data = item.articleData
  // No projection at all means the article was never evidence-gated — the older
  // authoring path — so fall back to whether it has any body to show.
  if (!data?.publishedSections) {
    const hasBody = (data?.sections ?? []).some((section) => section.body?.trim() || section.narrative?.trim())
    return hasBody ? { ready: true, reason: '' } : { ready: false, reason: 'No content yet' }
  }

  const visible = data.publishedSections.filter((section) => section.kind !== 'components')
  if (visible.length > 0) return { ready: true, reason: '' }

  return { ready: false, reason: GATE_REASON[data.publicationGate ?? ''] ?? 'Not ready' }
}

/** Split a selection into what can publish now and what cannot. */
export function partitionByReadiness(items: ManagedContentItem[]): {
  ready: ManagedContentItem[]
  blocked: Array<{ item: ManagedContentItem; reason: string }>
} {
  const ready: ManagedContentItem[] = []
  const blocked: Array<{ item: ManagedContentItem; reason: string }> = []
  for (const item of items) {
    const verdict = publishReadiness(item)
    if (verdict.ready) ready.push(item)
    else blocked.push({ item, reason: verdict.reason })
  }
  return { ready, blocked }
}
