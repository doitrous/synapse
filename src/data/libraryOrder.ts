import type { LibTopic } from './library.ts'

/**
 * A topic's place in the module order: its first subtopic that names a
 * module, first module named wins.
 *
 * An article can name more than one module — a topic can hold more than one
 * article — so this is the one rule that turns either list into a single
 * answer: the first module the first article names.
 */
export function primaryModuleId(topic: LibTopic): string | undefined {
  for (const subtopic of topic.subtopics) {
    if (subtopic.moduleIds?.length) return subtopic.moduleIds[0]
  }
  return undefined
}

/**
 * Module, then subject, then whatever order the topics already came in.
 *
 * A topic with no module at all sorts after every topic that has one — it is
 * the "General" bucket. `subjectRank` and `subjectName` are handed in rather
 * than read from `@/data/subjects` here, so this stays a plain function of
 * its arguments: easy to unit test, and free of the path-alias imports that
 * keep the rest of the library hook out of the node test runner.
 *
 * `Array#sort`'s stability (guaranteed since ES2019) is what keeps a
 * subject's own topics in their original order without this needing to say
 * so.
 */
export function compareLibraryTopics(
  a: LibTopic,
  b: LibTopic,
  moduleRank: Map<string, number>,
  subjectRank: Map<string, number>,
  subjectName: (subjectId: string) => string,
): number {
  const moduleA = primaryModuleId(a)
  const moduleB = primaryModuleId(b)
  if ((moduleA === undefined) !== (moduleB === undefined)) return moduleA === undefined ? 1 : -1
  if (moduleA !== undefined && moduleB !== undefined && moduleA !== moduleB) {
    const rankA = moduleRank.get(moduleA) ?? Number.POSITIVE_INFINITY
    const rankB = moduleRank.get(moduleB) ?? Number.POSITIVE_INFINITY
    if (rankA !== rankB) return rankA - rankB
    return moduleA.localeCompare(moduleB)
  }
  const subjectRankA = subjectRank.get(a.subjectId) ?? Number.POSITIVE_INFINITY
  const subjectRankB = subjectRank.get(b.subjectId) ?? Number.POSITIVE_INFINITY
  if (subjectRankA !== subjectRankB) return subjectRankA - subjectRankB
  return subjectName(a.subjectId).localeCompare(subjectName(b.subjectId))
}
