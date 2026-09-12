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
 * How many *distinct* questions a set of whole topics covers.
 *
 * The per-topic `scopeCounts` map is right for a single row's badge, but
 * summing it across topics double-counts: a question filed under two topics
 * (two library refs, or a title + a ref) is added to both tallies, and a topic
 * claimed by two modules is summed under each. That is why a module could read
 * far more questions than the bank holds. Counting through `questionsInScope`
 * instead dedupes exactly the way the year total does, so the numbers reconcile.
 */
export function countTopicsQuestions(pool: Question[], topics: LibTopic[], libraryTopics: LibTopic[]): number {
  if (topics.length === 0) return 0
  const scope: Scope = new Set(topics.map((topic) => topicKey(topic.id)))
  return questionsInScope(pool, scope, libraryTopics).length
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

/**
 * Does a chooser topic belong to a module?
 *
 * A topic belongs when it (or one of its subtopics) IS one of the module's
 * published article ids, when a question filed under it cites one of those
 * articles, or — the case a bank without published library articles hits —
 * when a question filed under it is tagged directly for the module. That last
 * rule is why "all published questions under a module" show up by default: the
 * module tag the author set is honoured even when no article links them.
 */
export function topicInModule(
  topic: LibTopic,
  pool: Question[],
  articleIds: ReadonlySet<string>,
  moduleTokens: ReadonlySet<string>,
): boolean {
  if (articleIds.has(topic.id)) return true
  if (topic.subtopics.some((s) => articleIds.has(s.id))) return true
  const underTopic = (q: Question) =>
    q.topic.toLowerCase() === topic.title.toLowerCase() ||
    q.libraryRefs.some((ref) => topic.subtopics.some((s) => s.id === ref.id))
  return pool.some(
    (q) =>
      underTopic(q) &&
      (q.libraryRefs.some((ref) => articleIds.has(ref.id)) ||
        (q.moduleIds ?? []).some((m) => moduleTokens.has(m.trim().toLowerCase()))),
  )
}

/**
 * Does a title answer to a search box? Case- and whitespace-insensitive
 * substring, which is what a student typing "heart" into a chapter list means.
 * An empty query matches everything, so "no search" needs no special case.
 */
export function matchesQuery(title: string, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return title.toLowerCase().includes(q)
}

/**
 * Narrow a chapter tree to what a search names, in place.
 *
 * A chapter whose own title matches is kept whole — its subtopics come with
 * it, because the student asked for the chapter. A chapter that does not match
 * survives only through its subtopics, and then only the matching ones are
 * kept, so the tree shows the hits rather than the haystack around them. A
 * chapter with neither is dropped.
 *
 * Purely derived: it never touches the scope, and the caller keeps its own
 * open/closed state untouched, so clearing the search restores the tree the
 * student had.
 */
export function filterTopicsByQuery(topics: LibTopic[], query: string): LibTopic[] {
  const q = query.trim().toLowerCase()
  if (!q) return topics
  const kept: LibTopic[] = []
  for (const topic of topics) {
    if (matchesQuery(topic.title, q)) {
      kept.push(topic)
      continue
    }
    const subtopics = topic.subtopics.filter((sub) => matchesQuery(sub.title, q))
    if (subtopics.length > 0) kept.push({ ...topic, subtopics })
  }
  return kept
}

/**
 * Narrow a chapter tree to a search, honouring a hit on what the chapters sit
 * under.
 *
 * `containerNames` are the names of the things above these chapters — the
 * system, and in module view its module as well. If any of them answers the
 * query the container is itself the hit, so every chapter under it stays
 * whole: typing "renal" keeps the entire Renal & urinary system rather than
 * reporting no matches because no chapter happens to be called "renal", and a
 * module's own name keeps everything filed under it. Only when no container
 * matches does the search fall through to chapter and subtopic titles.
 */
export function filterTopicsInContainer(
  containerNames: string[],
  topics: LibTopic[],
  query: string,
): LibTopic[] {
  if (!query.trim()) return topics
  if (containerNames.some((name) => matchesQuery(name, query))) return topics
  return filterTopicsByQuery(topics, query)
}

/** Count questions available per topic / subtopic within a pool, for badges. */
export function scopeCounts(pool: Question[], libraryTopics: LibTopic[]): { topics: Record<string, number>; subtopics: Record<string, number> } {
  const subtopics: Record<string, number> = {}
  const topics: Record<string, number> = {}
  const byTitle = new Map<string, LibTopic[]>()
  const bySubtopic = new Map<string, string[]>()
  for (const topic of libraryTopics) {
    topics[topic.id] = 0
    const title = topic.title.toLowerCase()
    const matching = byTitle.get(title) ?? []
    matching.push(topic)
    byTitle.set(title, matching)
    for (const subtopic of topic.subtopics) {
      subtopics[subtopic.id] = 0
      const parents = bySubtopic.get(subtopic.id) ?? []
      parents.push(topic.id)
      bySubtopic.set(subtopic.id, parents)
    }
  }
  // Visit the bank once. Sets keep a title + reference match from counting the
  // same question twice, including repeated references to the same article.
  for (const question of pool) {
    const matchedTopics = new Set<string>()
    const matchedSubtopics = new Set<string>()
    for (const topic of byTitle.get(question.topic.toLowerCase()) ?? []) {
      matchedTopics.add(topic.id)
      for (const subtopic of topic.subtopics) matchedSubtopics.add(subtopic.id)
    }
    for (const ref of question.libraryRefs) {
      const parents = bySubtopic.get(ref.id)
      if (!parents) continue
      matchedSubtopics.add(ref.id)
      for (const id of parents) matchedTopics.add(id)
    }
    for (const id of matchedTopics) topics[id]++
    for (const id of matchedSubtopics) subtopics[id]++
  }
  return { topics, subtopics }
}
