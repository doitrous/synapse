import { moduleKey, walkSubjects, type ModuleSubject, type ModuleSubjectStore } from './moduleSubjects.ts'

/**
 * Where inside a module a piece of content belongs.
 *
 * Content could say which module it was for, and nothing more. That is too
 * coarse to be useful: a module runs for a term and covers two or more
 * disciplines, so "this question belongs to 101 ISK" does not tell a student
 * revising the brachial plexus whether it is theirs.
 *
 * A path names the way down: `101 ISK > Anatomy > Upper Limb > Brachial Plexus`.
 * It is written by a person, in the words the faculty uses, and resolved
 * against the subject tree rather than stored as an ID by whoever typed it —
 * because the tree is renamed and reorganised as department books change, and a
 * path that resolves is repairable in a way a stale ID is not.
 *
 * Paths are kept as written *and* resolved. The written form survives a
 * reorganisation that breaks resolution, so an unresolvable path can be
 * reported and fixed instead of quietly becoming an untagged item.
 */

export const MODULE_SUBJECT_PATH_SEPARATOR = '>'

/** Split `a > b > c` into its segments, dropping empties and stray whitespace. */
export function splitModuleSubjectPath(path: string): string[] {
  return path
    .split(MODULE_SUBJECT_PATH_SEPARATOR)
    .map((part) => part.trim())
    .filter(Boolean)
}

/**
 * Several paths from one cell.
 *
 * Newlines separate paths, never `|` or `;` — a subject name may legitimately
 * contain either ("Blood, Lymph & Immunity; an overview"), and the list
 * separators the rest of the importer uses would cut those in half.
 */
export function parseModuleSubjectPaths(raw: string | undefined): string[] {
  if (!raw?.trim()) return []
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => splitModuleSubjectPath(line).join(` ${MODULE_SUBJECT_PATH_SEPARATOR} `))
    .filter(Boolean)
}

export interface ResolvedModuleSubjectPath {
  /** The path exactly as written. */
  path: string
  /** The module the path starts at, when its first segment names one. */
  moduleId?: string
  /** The subject the path ends at. Absent when the path does not resolve. */
  subjectId?: string
  /** Every subject on the way down, outermost first. */
  chain: ModuleSubject[]
  /** The segment that could not be matched, when resolution stopped early. */
  unresolvedSegment?: string
}

function childrenOf(subject: ModuleSubject): ModuleSubject[] {
  return subject.children ?? []
}

function matchByName(subjects: readonly ModuleSubject[], name: string): ModuleSubject | undefined {
  const wanted = name.trim().toLowerCase()
  return subjects.find((s) => s.name.trim().toLowerCase() === wanted)
}

/**
 * Walk a written path down a module's subject tree.
 *
 * The first segment may name the module itself — paths are usually written with
 * it, since that is how a person says where something lives — and is skipped
 * when it matches the module ID or name. A path that stops matching partway
 * reports the segment it stopped on, rather than resolving to the last thing it
 * did match, which would file content one level up from where it was meant to go.
 */
export function resolveModuleSubjectPath(
  path: string,
  context: {
    store: ModuleSubjectStore
    universityId: string
    yearId: string
    courseId: string
    moduleId?: string
    moduleName?: string
  },
): ResolvedModuleSubjectPath {
  const segments = splitModuleSubjectPath(path)
  const out: ResolvedModuleSubjectPath = { path, chain: [], moduleId: context.moduleId }
  if (!segments.length) return out

  const head = segments[0].toLowerCase()
  const namesModule = head === context.moduleId?.toLowerCase()
    || head === context.moduleName?.trim().toLowerCase()
  const rest = namesModule ? segments.slice(1) : segments

  let level = context.store[moduleKey(context.universityId, context.yearId, context.courseId)] ?? []
  for (const segment of rest) {
    const found = matchByName(level, segment)
    if (!found) {
      out.unresolvedSegment = segment
      return out
    }
    out.chain.push(found)
    level = childrenOf(found)
  }

  out.subjectId = out.chain.at(-1)?.id
  return out
}

/** Render a subject's own path, for showing one back to a person. */
export function moduleSubjectPathOf(
  subjects: readonly ModuleSubject[],
  subjectId: string,
  moduleId?: string,
): string {
  const trail: string[] = []
  const walk = (level: readonly ModuleSubject[], ancestry: string[]): boolean => {
    for (const subject of level) {
      const here = [...ancestry, subject.name]
      if (subject.id === subjectId) { trail.push(...here); return true }
      if (walk(childrenOf(subject), here)) return true
    }
    return false
  }
  walk(subjects, [])
  if (!trail.length) return ''
  const parts = moduleId ? [moduleId, ...trail] : trail
  return parts.join(` ${MODULE_SUBJECT_PATH_SEPARATOR} `)
}

/** Every path in a module's tree, for offering them or checking one exists. */
export function allModuleSubjectPaths(
  subjects: readonly ModuleSubject[],
  moduleId?: string,
): string[] {
  return walkSubjects(subjects).map((s) => moduleSubjectPathOf(subjects, s.id, moduleId))
}
