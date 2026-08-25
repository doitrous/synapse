import { blockingMediaRequests, type ManagedContentItem } from './contentControl.ts'

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
  /**
   * Already live, so there is nothing to publish.
   *
   * Kept apart from `blocked`: blocked means something is wrong and could be
   * fixed, while this means the job is done. Folding the two together is what
   * made re-publishing a selection of live items look like a failure and then
   * do nothing at all.
   */
  alreadyPublished?: boolean
  /** Required media is never bypassable, even when another editorial gate is. */
  hardBlocked?: boolean
}

const GATE_REASON: Record<string, string> = {
  needs_evidence: 'Needs evidence',
  faculty_review: 'Faculty review',
  conflicted: 'Conflicting sources',
  excluded: 'Excluded',
}

function reassignedAfterArchive(item: ManagedContentItem): boolean {
  if (!item.archive?.detached) return true
  if (item.kind === 'question') {
    const tags = item.questionData?.tags
    const hasModule = Boolean(tags?.moduleIds?.length || tags?.moduleSubjectPaths?.length)
    const hasAudience = Boolean(tags?.universityIds?.length || tags?.years?.length || tags?.questionOnlyFor?.length)
    return hasModule && hasAudience
  }
  if (item.kind === 'article') {
    const data = item.articleData
    const hasModule = Boolean(data?.moduleIds?.length || data?.moduleSubjectPaths?.length)
    const hasAudience = Boolean(data?.universityIds?.length || data?.yearIds?.length)
    return hasModule && hasAudience
  }
  return true
}

export function publishReadiness(item: ManagedContentItem): PublishReadiness {
  const missingMedia = blockingMediaRequests(item)
  if (missingMedia.length) {
    return {
      ready: false,
      reason: `${missingMedia.length} required media ${missingMedia.length === 1 ? 'request' : 'requests'} unresolved`,
      hardBlocked: true,
    }
  }
  if (item.status === 'Published') return { ready: false, reason: 'Already published', alreadyPublished: true }
  if (!reassignedAfterArchive(item)) {
    return {
      ready: false,
      reason: 'Assign a verified module and audience',
      hardBlocked: true,
    }
  }
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

/**
 * Split a selection three ways: what can publish now, what is already live, and
 * what is held back for a reason worth showing.
 */
export function partitionByReadiness(items: ManagedContentItem[]): {
  ready: ManagedContentItem[]
  live: ManagedContentItem[]
  blocked: Array<{ item: ManagedContentItem; reason: string; hardBlocked: boolean }>
} {
  const ready: ManagedContentItem[] = []
  const live: ManagedContentItem[] = []
  const blocked: Array<{ item: ManagedContentItem; reason: string; hardBlocked: boolean }> = []
  for (const item of items) {
    const verdict = publishReadiness(item)
    if (verdict.ready) ready.push(item)
    else if (verdict.alreadyPublished) live.push(item)
    else blocked.push({ item, reason: verdict.reason, hardBlocked: verdict.hardBlocked === true })
  }
  return { ready, live, blocked }
}
