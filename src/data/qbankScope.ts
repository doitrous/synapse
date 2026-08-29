import type { LibTopic } from '@/data/library'
import type { Question } from '@/data/qbank'
import { bucketOf, type SourceBucket } from './questionSource.ts'

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

/**
 * Narrow a question set to the chosen MCQ source buckets. An empty selection
 * means "all sources" — the pre-feature behaviour — so an untouched builder is
 * unchanged. Untagged questions match only when the `'unspecified'` bucket is
 * explicitly selected.
 */
export function questionsInSources(
  questions: readonly Question[],
  sources: ReadonlySet<SourceBucket>,
): Question[] {
  if (sources.size === 0) return questions.slice()
  return questions.filter((q) => sources.has(bucketOf(q.source)))
}

/** The prefix that marks a topic the questions named rather than the library. */
const QUESTION_TOPIC_PREFIX = 'qt:'

export function isQuestionTopic(topicId: string): boolean {
  return topicId.startsWith(QUESTION_TOPIC_PREFIX)
}

/**
 * The chapters a student can actually choose from.
 *
 * The chooser was built from the library alone, so a bank with questions but no
 * published articles offered an empty box — which is exactly what a university
 * looks like before its library is written, and what the shipped demo looks
 * like today: twenty published questions, no published articles, and nothing to
 * pick. Any topic a question names that the library does not cover is added
 * here as a topic in its own right, so the tree describes the bank rather than
 * only the part of it the library happens to document.
 *
 * A synthetic topic has no subtopics — there is nothing finer to offer — and
 * `questionsInScope` already resolves a whole-topic selection by title, so it
 * needs no special case there.
 */
export function chooserTopics(pool: Question[], libraryTopics: LibTopic[]): LibTopic[] {
  const covered = new Set(libraryTopics.map((topic) => topic.title.trim().toLowerCase()))
  const extra = new Map<string, LibTopic>()

  for (const question of pool) {
    const title = question.topic?.trim()
    if (!title) continue
    const key = `${question.subjectId}::${title.toLowerCase()}`
    if (covered.has(title.toLowerCase()) || extra.has(key)) continue
    extra.set(key, {
      id: `${QUESTION_TOPIC_PREFIX}${key}`,
      title,
      subjectId: question.subjectId,
      subtopics: [],
    })
  }

  return [...libraryTopics, ...extra.values()]
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
