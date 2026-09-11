import { useMemo } from 'react'
import { useArticleIndex } from './content'
import { initialConceptGraph } from '@/data/conceptGraph'

/** A stable empty graph: this hook never reads the concept graph (see below). */
const EMPTY_GRAPH = initialConceptGraph()
import { itemInScope } from '@/data/contentControl'
import { useMedicalTaxonomy } from '@/data/medicalTaxonomyStore'
import { buildCurriculumMembership } from '@/data/curriculumMembership'
import { mergeModuleCoverage, type ProjectionModule } from '@/pages/student/universityModel'
import { useStudentCurriculum } from '@/pages/student/useStudentCurriculum'
import { useLiveLibrary, type LiveSubtopic } from './useLiveLibrary'
import { useStudentModules, type StudentModule } from './useUniversityCatalogue'
import type { CatalogueAvailability } from './catalogueAvailability'

/**
 * For the viewer's own modules, which published library articles belong to
 * each one — resolved from the admin Curriculum dialog's per-module coverage
 * (`articleIds` chosen directly, plus `topicNodeIds` naming a taxonomy subtree
 * whose articles count too).
 *
 * Two id spaces meet here and must not be confused: `coverage.articleIds`
 * already lives in the library/ledger id space (`hf-patho`, same as
 * `LiveSubtopic.id` and `Question.libraryRefs[].id`) and is used as-is;
 * `coverage.topicNodeIds` lives in the canonical taxonomy id space
 * (`SYS-CVS-...`) and is only useful once `buildCurriculumMembership(...)
 * .articlesUnder(nodeId)` has turned it into concrete article ids.
 */
export interface ModuleLibraryGroup {
  moduleId: string
  moduleName: string
  /** Published library articles/subtopics under this module, deduped. */
  articles: LiveSubtopic[]
  /** The resolved published article ids (same id space as Question.libraryRefs[].id). */
  articleIds: string[]
}

export interface ModuleLibraryContent {
  groups: ModuleLibraryGroup[]
  availability: CatalogueAvailability
}

/** Every subject-tree module in the projection, term by term — the level that actually carries coverage. */
function flattenProjectionModules(projection: ReturnType<typeof useStudentCurriculum>['projection']): ProjectionModule[] {
  return projection?.terms?.flatMap((term) => term.modules) ?? []
}

/**
 * Match a `StudentModule` (the visible id/name pair the Library and the qbank
 * chooser already show) to its projection entry.
 *
 * The visible id is usually the same string as `ProjectionModule.moduleId` —
 * both trace back to the same `CurriculumCourse.moduleId`. The one case they
 * diverge is a course with no explicit moduleId: `useStudentModules` derives a
 * display id for it (`defaultModuleId`), but the projection only ever reports
 * `moduleId: null`, so falling back to matching by module name (the other
 * field both sides copy verbatim from the same course) keeps that module from
 * silently losing its coverage.
 */
function matchProjectionModule(
  student: StudentModule,
  byModuleId: Map<string, ProjectionModule>,
  byName: Map<string, ProjectionModule>,
): ProjectionModule | undefined {
  return byModuleId.get(student.id) ?? byName.get(student.name.trim().toLowerCase())
}

/** `useLiveLibrary().availability`, made to also fail/wait on the curriculum projection it depends on. */
function combineAvailability(library: CatalogueAvailability, projection: { loading: boolean; error: string }): CatalogueAvailability {
  if (library.kind === 'error') return library
  if (library.kind === 'loading' || projection.loading) return { kind: 'loading' }
  // The projection's own error is a plain string (see useStudentCurriculum),
  // not classified the way a state-store failure is — 'network' is the
  // closest honest reading: something kept the fetch from completing.
  if (projection.error) return { kind: 'error', error: 'network' }
  return library
}

export function useModuleLibraryContent(universityId: string, yearId: string): ModuleLibraryContent {
  const studentModules = useStudentModules(universityId, yearId)
  const curriculum = useStudentCurriculum()
  const library = useLiveLibrary()
  const [index] = useArticleIndex()
  const [medicalTaxonomy] = useMedicalTaxonomy()

  // Articles are the only kind this resolves — `articlesUnder` is the whole of
  // what is read below — so the index stands in for the ledger unchanged. And
  // `articlesUnder` places articles by the article index's own node ids, never
  // by the concept graph, so an empty graph is passed instead of loading the
  // ~16 MB document: the `conceptsUnder` branch that would read it is never hit
  // from this hook. (Consumers that DO need concepts still load them directly.)
  const graph = EMPTY_GRAPH
  const membership = useMemo(
    () => buildCurriculumMembership({ items: index.items, graph, medicalTaxonomy }),
    [index, graph, medicalTaxonomy],
  )

  const projectionModules = useMemo(() => flattenProjectionModules(curriculum.projection), [curriculum.projection])
  const byModuleId = useMemo(
    () => new Map(projectionModules.filter((m) => m.moduleId?.trim()).map((m) => [m.moduleId!.trim(), m])),
    [projectionModules],
  )
  const byName = useMemo(
    () => new Map(projectionModules.map((m) => [m.name.trim().toLowerCase(), m])),
    [projectionModules],
  )

  // Articles name their own module(s) via `articleData.moduleIds`, authored
  // directly on the article. The per-module curriculum coverage above is a
  // separate, admin-authored mapping that is frequently unpopulated, so an
  // article correctly tagged for its module would otherwise never reach it.
  // Group by the article's own module tag too, scoped to this student, and union
  // it with coverage. The publish filter below (library.subtopics) still gates.
  const articleIdsByModule = useMemo(() => {
    const map = new Map<string, string[]>()
    for (const item of index.items) {
      if (item.kind !== 'article') continue
      if (!itemInScope(item, universityId || undefined, yearId || undefined)) continue
      for (const raw of item.articleData?.moduleIds ?? []) {
        const mid = raw.trim()
        if (!mid) continue
        const list = map.get(mid)
        if (list) list.push(item.id)
        else map.set(mid, [item.id])
      }
    }
    return map
  }, [index.items, universityId, yearId])

  const groups = useMemo(() => studentModules.map((module): ModuleLibraryGroup => {
    const projectionModule = matchProjectionModule(module, byModuleId, byName)
    const coverage = projectionModule ? mergeModuleCoverage(projectionModule) : { articleIds: [], topicNodeIds: [] }

    // 1–3: start from the coverage ids already in the library id space, then
    // enrich with whatever the taxonomy subtrees resolve to.
    const candidateIds = new Set(coverage.articleIds)
    coverage.topicNodeIds.forEach((nodeId) => {
      membership.articlesUnder(nodeId).forEach((item) => candidateIds.add(item.id))
    })

    ;(articleIdsByModule.get(module.id.trim()) ?? []).forEach((id) => candidateIds.add(id))

    // 4: keep only ids that resolve to a currently-published LiveSubtopic —
    // that lookup succeeding is itself the publish filter.
    const articles = library.subtopics.filter((subtopic) => candidateIds.has(subtopic.id))

    return {
      moduleId: module.id,
      moduleName: module.name,
      articles,
      articleIds: articles.map((subtopic) => subtopic.id),
    }
  }), [studentModules, byModuleId, byName, membership, library.subtopics, articleIdsByModule])

  const availability = useMemo(
    () => combineAvailability(library.availability, { loading: curriculum.loading, error: curriculum.error }),
    [library.availability, curriculum.loading, curriculum.error],
  )

  return { groups, availability }
}
