/**
 * The published algorithm configuration, and the blueprints it runs against.
 *
 * Both are admin-owned catalogue documents, so both use undotted keys and reach
 * the shared store rather than the student's own record. That is deliberate: a
 * student must not be able to edit the thresholds they are judged by, and two
 * students on the same programme must be judged by the same ones.
 */

import { useCallback, useMemo } from 'react'
import { usePersistentState } from '@/lib/usePersistentState'
import {
  ADAPTIVE_CONFIG_STORAGE_KEY, defaultAdaptiveConfig,
  type AdaptiveConfig, type ConfigChangeNote,
} from '@/data/adaptive/config'
import {
  ADAPTIVE_BLUEPRINT_STORAGE_KEY, blueprintFor, deriveBlueprint, resolveBlueprint,
  type Blueprint, type BlueprintNode,
} from '@/data/adaptive/blueprint'
import { CONCEPT_STORAGE_KEY, conceptGraphFromStorage, type Concept, type ConceptGraph } from '@/data/conceptGraph'
import { CURRICULUM_CATALOG } from '@/data/curriculumCatalog'
import { subjectsById } from '@/data/subjects'

/**
 * A topic node anywhere in the catalogue, matched by its id or its `TPC_`
 * tag.
 *
 * Deliberately not `findCurriculumPath`: that helper only checks the first
 * system in the tree when a query carries a `topicId` but no `systemId`, so
 * it silently misses every topic outside whichever system happens to be
 * listed first. A concept here may carry a topic id with no system id beside
 * it, so the search has to cover every system itself.
 */
function findTopicInCatalog(topicId: string): { tpcId: string; title: string } | null {
  for (const system of CURRICULUM_CATALOG) {
    for (const topicNode of system.topics) {
      if (topicNode.id === topicId || topicNode.tpcId === topicId) {
        return { tpcId: topicNode.tpcId, title: topicNode.title }
      }
    }
  }
  return null
}

/**
 * A readable name from a raw id nothing in the curriculum catalogue
 * recognises.
 *
 * A student must never see the backend code itself — `SYS_PHARM`, `haem`,
 * `pharm-pharmacokinetics` — so an id that cannot be resolved through the
 * catalogue is still turned into words rather than printed verbatim. This is
 * a fallback, not the normal path: everything currently authored resolves
 * through `groupForConcept` below.
 */
function humanizeCatalogId(id: string): string {
  const withoutPrefix = id.replace(/^(SYS|TPC|SUB|MIC|NAN)_/, '')
  const words = withoutPrefix.replace(/[_-]+/g, ' ').trim()
  if (!words) return 'Other topics'
  return words
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * The topic a concept is grouped under, as a name a student can read.
 *
 * A concept carries several ids of different granularity — a topic tag, a
 * topic node id, a system id, a subject id — and the most specific one
 * present wins, matching the order concepts are actually authored in. Every
 * one of those ids is a catalogue code (`SYS_PHARM`, `TPC_...`, `haem`), never
 * a name, so each is resolved through the curriculum catalogue (topic titles,
 * system names) or the subject list before it reaches the screen. Only an id
 * the catalogue has never heard of falls through to a humanised guess.
 */
function groupForConcept(concept: Concept): { id: string; label: string } {
  const topicCandidate = concept.topicTagId || concept.topicId
  if (topicCandidate) {
    const topic = findTopicInCatalog(topicCandidate)
    if (topic) return { id: topic.tpcId, label: topic.title }
  }

  if (concept.systemId) {
    const system = CURRICULUM_CATALOG.find((s) => s.sysId === concept.systemId || s.id === concept.systemId)
    if (system) return { id: system.sysId, label: system.name }
  }

  if (concept.subjectId) {
    const subject = subjectsById[concept.subjectId]
    if (subject) return { id: concept.subjectId, label: subject.name }
  }

  const rawId = concept.topicTagId || concept.topicId || concept.systemId || concept.subjectId || 'ungrouped'
  return { id: rawId, label: rawId === 'ungrouped' ? 'Other topics' : humanizeCatalogId(rawId) }
}

export function useAdaptiveConfig() {
  return usePersistentState<AdaptiveConfig>(ADAPTIVE_CONFIG_STORAGE_KEY, defaultAdaptiveConfig)
}

/**
 * Publish a configuration change.
 *
 * The version bump and the dated note are not optional extras attached by a
 * conscientious admin — they happen here, on every material edit, because a
 * change that cannot be dated cannot be explained to the students whose scores
 * moved because of it.
 */
export function usePublishConfig() {
  const [, setConfig] = useAdaptiveConfig()

  return useCallback((edit: (draft: AdaptiveConfig) => AdaptiveConfig, note: string, author: string) => {
    setConfig((current) => {
      const draft = edit(structuredClone(current))
      const version = current.version + 1
      const entry: ConfigChangeNote = {
        version,
        at: new Date().toISOString().slice(0, 10),
        author,
        note: note.trim() || 'No note recorded.',
      }
      return {
        ...draft,
        version,
        updatedAt: new Date().toISOString(),
        // Newest first: the change note a reader wants is almost always the
        // most recent one, and a list that grows downward buries it.
        changeNotes: [entry, ...current.changeNotes],
      }
    })
  }, [setConfig])
}

export function useAdaptiveBlueprints() {
  return usePersistentState<Blueprint[]>(ADAPTIVE_BLUEPRINT_STORAGE_KEY, [])
}

export interface ResolvedBlueprint {
  /** The concepts on this student's blueprint, with normalised weights. */
  nodes: BlueprintNode[]
  /** The stored blueprint that governed, or null when weights were derived. */
  stored: Blueprint | null
  /** Concept id → weight, for the scoring context. */
  weights: Map<string, number>
  nodeByConcept: Map<string, BlueprintNode>
  /** True when the concept graph has nothing in scope for this student. */
  empty: boolean
}

/**
 * The blueprint that governs a scope.
 *
 * Derived weights decide *which* concepts are in scope; a published blueprint
 * only overrides *how much* each is worth. That order means a concept authored
 * after an admin last opened the blueprint editor still counts toward coverage,
 * instead of staying invisible until someone remembers to republish.
 */
export function useResolvedBlueprint(scope: {
  universityId: string
  yearId: string
  moduleIds?: string[]
}): ResolvedBlueprint {
  const [graph] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, conceptGraphFromStorage)
  const [blueprints] = useAdaptiveBlueprints()

  // Destructured to primitives before the memo. A caller that builds its scope
  // object inline would otherwise hand over a new reference every render and
  // rebuild the entire blueprint each time.
  const { universityId, yearId } = scope
  const moduleKey = scope.moduleIds?.join(',') ?? ''

  return useMemo(() => {
    const moduleIds = moduleKey ? moduleKey.split(',') : undefined
    const derived = deriveBlueprint({ concepts: graph.concepts, universityId, yearId, moduleIds, groupFor: groupForConcept })
    const stored = blueprintFor(blueprints, { universityId, yearId, moduleIds })
    const nodes = resolveBlueprint(derived, stored)

    return {
      nodes,
      stored,
      weights: new Map(nodes.map((node) => [node.conceptId, node.weight])),
      nodeByConcept: new Map(nodes.map((node) => [node.conceptId, node])),
      empty: nodes.length === 0,
    }
  }, [graph.concepts, blueprints, universityId, yearId, moduleKey])
}

/** Labels for concepts, so a table can name what it is showing. */
export function useConceptLabels(): Map<string, string> {
  const [graph] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, conceptGraphFromStorage)
  return useMemo(
    () => new Map(graph.concepts.map((concept) => [concept.id, concept.label])),
    [graph.concepts],
  )
}

/**
 * Prerequisite edges, for the crash-course ordering.
 *
 * Read from the typed relations the concept graph already carries, so nobody
 * has to author a second dependency list that would immediately drift from the
 * first.
 */
export function usePrerequisites(): Map<string, string[]> {
  const [graph] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, conceptGraphFromStorage)
  return useMemo(() => {
    const edges = new Map<string, string[]>()
    for (const relation of graph.relations) {
      if (relation.type !== 'prerequisite_of') continue
      // `source prerequisite_of target` means the source must come first, so it
      // is the target that carries the dependency.
      const existing = edges.get(relation.targetId) ?? []
      edges.set(relation.targetId, [...existing, relation.sourceId])
    }
    return edges
  }, [graph.relations])
}
