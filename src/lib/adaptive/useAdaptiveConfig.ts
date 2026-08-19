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
import { CONCEPT_STORAGE_KEY, conceptGraphFromStorage, type ConceptGraph } from '@/data/conceptGraph'

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
    const derived = deriveBlueprint({ concepts: graph.concepts, universityId, yearId, moduleIds })
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
