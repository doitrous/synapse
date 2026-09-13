import { indexMedicalTaxonomy, type MedicalTaxonomyNode } from './medicalLibraryTaxonomy'
import type { Concept, ConceptGraph } from './conceptGraph'
import type { ManagedContentItem } from './contentControl'

/**
 * What belongs under a library topic.
 *
 * A module is built by naming topics, not by ticking a thousand rows, so the
 * question "everything under Cardiovascular investigations" has to have an answer.
 * Only articles and concepts carry a canonical placement; questions, practicals and
 * resources reach the tree through what they are tagged with, which is now a real
 * link rather than a typed-in ID.
 *
 *   article, concept   → its own placement, primary or secondary
 *   question           → the concepts it tests, or the articles it reads around
 *   practical          → the concepts it teaches
 *   resource           → the concepts or articles it contains
 *
 * An article with no placement at all falls back to its subject's system, which is
 * the same courtesy the student library extends to legacy records.
 */

const SUBJECT_FALLBACK_NODE: Record<string, string> = {
  cvs: 'SYS-CVS',
  resp: 'SYS-RES',
  renal: 'SYS-REN',
  gi: 'SYS-GIT',
  neuro: 'SYS-NEU',
  endo: 'SYS-END',
  msk: 'SYS-MSK',
  pharm: 'SYS-FND-T04',
}

export interface CurriculumMembership {
  conceptsUnder(nodeId: string): Concept[]
  articlesUnder(nodeId: string): ManagedContentItem[]
  questionsUnder(nodeId: string): ManagedContentItem[]
  practicalsUnder(nodeId: string): ManagedContentItem[]
  resourcesUnder(nodeId: string): ManagedContentItem[]
}

// Cached by the references of its three inputs, which are each one stable
// object per store document. A remount reads the finished membership back
// rather than re-indexing the ~2,400-node taxonomy and re-partitioning the whole
// content list every time the Library tree or the Question Bank's topic chooser
// mounts. The lazy `*Under` closures it returns keep their own per-node memos, so
// those are reused across mounts too. Weak keys drop the entry when any input is
// replaced, so stale data is never served.
const membershipCache = new WeakMap<ManagedContentItem[], WeakMap<ConceptGraph, WeakMap<MedicalTaxonomyNode[], CurriculumMembership>>>()

export function buildCurriculumMembership({ items, graph, medicalTaxonomy }: {
  items: ManagedContentItem[]
  graph: ConceptGraph
  medicalTaxonomy: MedicalTaxonomyNode[]
}): CurriculumMembership {
  let byGraph = membershipCache.get(items)
  if (!byGraph) { byGraph = new WeakMap(); membershipCache.set(items, byGraph) }
  let byTaxonomy = byGraph.get(graph)
  if (!byTaxonomy) { byTaxonomy = new WeakMap(); byGraph.set(graph, byTaxonomy) }
  const hit = byTaxonomy.get(medicalTaxonomy)
  if (hit) return hit

  const index = indexMedicalTaxonomy(medicalTaxonomy)

  // Choosing a topic means choosing everything beneath it, so each lookup walks
  // down once and remembers the answer — the dialog asks per topic, per tab.
  const subtrees = new Map<string, Set<string>>()
  function subtree(nodeId: string): Set<string> {
    const cached = subtrees.get(nodeId)
    if (cached) return cached
    const out = new Set<string>()
    const walk = (id: string) => {
      if (out.has(id)) return
      out.add(id)
      index.children(id).forEach((child) => walk(child.id))
    }
    walk(nodeId)
    subtrees.set(nodeId, out)
    return out
  }

  const articles = items.filter((item) => item.kind === 'article')
  const questions = items.filter((item) => item.kind === 'question')
  const practicals = items.filter((item) => item.kind === 'practical')
  const resources = items.filter((item) => item.kind === 'resource')

  function articlePlacements(item: ManagedContentItem): string[] {
    const data = item.articleData
    const placed = [data?.primaryNodeId, ...(data?.secondaryNodeIds ?? [])].filter(Boolean) as string[]
    if (placed.length) return placed
    const fallback = SUBJECT_FALLBACK_NODE[item.subjectId]
    return fallback ? [fallback] : []
  }

  const conceptPlacements = (concept: Concept): string[] =>
    [concept.primaryNodeId, ...(concept.secondaryNodeIds ?? [])].filter(Boolean) as string[]

  const memo = <T>(compute: (nodeId: string) => T) => {
    const cache = new Map<string, T>()
    return (nodeId: string): T => {
      const cached = cache.get(nodeId)
      if (cached !== undefined) return cached
      const value = compute(nodeId)
      cache.set(nodeId, value)
      return value
    }
  }

  const conceptsUnder = memo((nodeId: string) => {
    const scope = subtree(nodeId)
    return graph.concepts.filter((concept) => conceptPlacements(concept).some((id) => scope.has(id)))
  })

  const articlesUnder = memo((nodeId: string) => {
    const scope = subtree(nodeId)
    return articles.filter((item) => articlePlacements(item).some((id) => scope.has(id)))
  })

  const questionsUnder = memo((nodeId: string) => {
    const conceptIds = new Set(conceptsUnder(nodeId).map((concept) => concept.id))
    const articleIds = new Set(articlesUnder(nodeId).map((item) => item.id))
    return questions.filter((item) => {
      const tags = item.questionData?.tags
      const tagged = [...(tags?.mainConceptIds ?? []), ...(tags?.conceptIds ?? []), ...(tags?.contextualConceptIds ?? [])]
      if (tagged.some((id) => conceptIds.has(id))) return true
      return (item.questionData?.libraryIds ?? []).some((id) => articleIds.has(id))
    })
  })

  const practicalsUnder = memo((nodeId: string) => {
    const conceptIds = new Set(conceptsUnder(nodeId).map((concept) => concept.id))
    return practicals.filter((item) => {
      const tags = item.practicalData?.conceptTags
      const tagged = [...(tags?.mainConceptIds ?? []), ...(tags?.conceptIds ?? []), ...(tags?.contextualConceptIds ?? [])]
      return tagged.some((id) => conceptIds.has(id))
    })
  })

  const resourcesUnder = memo((nodeId: string) => {
    const conceptIds = new Set(conceptsUnder(nodeId).map((concept) => concept.id))
    const articleIds = new Set(articlesUnder(nodeId).map((item) => item.id))
    return resources.filter((item) => {
      const data = item.resourceData
      if ((data?.includedConceptIds ?? []).some((id) => conceptIds.has(id))) return true
      return (data?.includedArticleIds ?? []).some((id) => articleIds.has(id))
    })
  })

  const membership = { conceptsUnder, articlesUnder, questionsUnder, practicalsUnder, resourcesUnder }
  byTaxonomy.set(medicalTaxonomy, membership)
  return membership
}
