import type { ManagedContentItem } from './contentControl'

export interface ContentVisibilityResetStats {
  publishedArticles: number
  publishedQuestions: number
  articleUniversityLists: number
  articleYearLists: number
  questionUniversityLists: number
  questionYearLists: number
  questionOnlyForLists: number
  preservedUniversityNotes: number
}

export interface ContentVisibilityResetResult {
  items: ManagedContentItem[]
  targetIds: string[]
  stats: ContentVisibilityResetStats
}

function populated(value: unknown): boolean {
  return Array.isArray(value) && value.length > 0
}

/**
 * Withdraw every currently published article and question from students and
 * remove only their university/year audience targeting.
 *
 * Source provenance, university-specific notes, exam weights, modules,
 * taxonomy placement, evidence, and all authored teaching content are kept.
 */
export function resetPublishedContentVisibility(
  items: ManagedContentItem[],
  updatedAt = new Date().toISOString(),
): ContentVisibilityResetResult {
  const stats: ContentVisibilityResetStats = {
    publishedArticles: 0,
    publishedQuestions: 0,
    articleUniversityLists: 0,
    articleYearLists: 0,
    questionUniversityLists: 0,
    questionYearLists: 0,
    questionOnlyForLists: 0,
    preservedUniversityNotes: 0,
  }
  const targetIds: string[] = []

  const next = items.map((item) => {
    if (item.status !== 'Published' || (item.kind !== 'article' && item.kind !== 'question')) return item
    targetIds.push(item.id)

    if (item.kind === 'article') {
      stats.publishedArticles += 1
      if (populated(item.articleData?.universityIds)) stats.articleUniversityLists += 1
      if (populated(item.articleData?.yearIds)) stats.articleYearLists += 1
      if (item.articleData?.universityNotes && Object.keys(item.articleData.universityNotes).length) stats.preservedUniversityNotes += 1
      return {
        ...item,
        status: 'In review' as const,
        updatedAt,
        ...(item.articleData ? {
          articleData: { ...item.articleData, universityIds: [], yearIds: [] },
        } : {}),
      }
    }

    stats.publishedQuestions += 1
    if (populated(item.questionData?.tags?.universityIds)) stats.questionUniversityLists += 1
    if (populated(item.questionData?.tags?.years)) stats.questionYearLists += 1
    if (populated(item.questionData?.tags?.questionOnlyFor)) stats.questionOnlyForLists += 1
    return {
      ...item,
      status: 'In review' as const,
      updatedAt,
      ...(item.questionData ? {
        questionData: {
          ...item.questionData,
          tags: {
            ...item.questionData.tags,
            universityIds: [],
            years: [],
            questionOnlyFor: [],
          },
        },
      } : {}),
    }
  })

  return { items: next, targetIds, stats }
}
