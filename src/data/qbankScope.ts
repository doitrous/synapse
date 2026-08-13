import type { LibTopic } from '@/data/library'
import type { Question } from '@/data/qbank'

/**
 * A session scope is a set of keys, each either a whole topic (`t:<topicId>`)
 * or a single subtopic (`s:<subtopicId>`). This lets a student solve questions
 * on a whole chapter, or drill into one subtopic under it.
 */
export type Scope = Set<string>

export const topicKey = (topicId: string) => `t:${topicId}`
export const subtopicKey = (subtopicId: string) => `s:${subtopicId}`

/**
 * The chapter tree is passed in, never imported.
 *
 * These functions used to read `libraryTopics` — the demo seed — directly, so
 * with a backend configured the chooser offered demo chapters and matched live
 * questions against demo chapter titles. The caller now supplies the tree from
 * `useLiveLibrary`, which is the same source the Library renders.
 */

/** The subtopic ids implied by a scope (expanding any whole-topic selections). */
export function scopeSubtopicIds(scope: Scope, libraryTopics: LibTopic[]): Set<string> {
  const ids = new Set<string>()
  const topicIds = new Set<string>()
  scope.forEach((key) => {
    if (key.startsWith('t:')) topicIds.add(key.slice(2))
    else if (key.startsWith('s:')) ids.add(key.slice(2))
  })
  libraryTopics.forEach((topic) => {
    if (topicIds.has(topic.id)) topic.subtopics.forEach((s) => ids.add(s.id))
  })
  return ids
}

/** Filter a pool of questions to those covered by the scope. Empty scope = all. */
export function questionsInScope(pool: Question[], scope: Scope, libraryTopics: LibTopic[] = []): Question[] {
  if (scope.size === 0) return pool
  const subtopicIds = scopeSubtopicIds(scope, libraryTopics)
  // Also match on topic title for whole-topic selections, so questions whose
  // library reference id differs but whose topic matches are still included.
  const topicTitles = new Set<string>()
  scope.forEach((key) => {
    if (key.startsWith('t:')) {
      const topic = libraryTopics.find((t) => t.id === key.slice(2))
      if (topic) topicTitles.add(topic.title.toLowerCase())
    }
  })
  return pool.filter(
    (q) =>
      q.libraryRefs.some((ref) => subtopicIds.has(ref.id)) || topicTitles.has(q.topic.toLowerCase()),
  )
}

/** Count questions available per topic / subtopic within a pool, for badges. */
export function scopeCounts(pool: Question[], libraryTopics: LibTopic[]): { topics: Record<string, number>; subtopics: Record<string, number> } {
  const subtopics: Record<string, number> = {}
  const topics: Record<string, number> = {}
  libraryTopics.forEach((topic) => {
    let topicTotal = 0
    topic.subtopics.forEach((s) => {
      const n = pool.filter(
        (q) => q.libraryRefs.some((ref) => ref.id === s.id) || q.topic.toLowerCase() === topic.title.toLowerCase(),
      ).length
      subtopics[s.id] = n
    })
    topicTotal = pool.filter(
      (q) =>
        q.topic.toLowerCase() === topic.title.toLowerCase() ||
        q.libraryRefs.some((ref) => topic.subtopics.some((s) => s.id === ref.id)),
    ).length
    topics[topic.id] = topicTotal
  })
  return { topics, subtopics }
}
