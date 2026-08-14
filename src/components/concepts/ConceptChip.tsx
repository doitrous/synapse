import { CONCEPT_STORAGE_KEY, initialConceptGraph, type ConceptGraph } from '@/data/conceptGraph'
import { usePersistentState } from '@/lib/usePersistentState'
import { ConceptText } from './ConceptText'

/**
 * A named concept as a pressable chip.
 *
 * The definition popover is ConceptText's, reached by handing it the concept's
 * own label: the label is by definition a term ConceptText matches, so the chip
 * gets the existing panel — sources, pitfalls, relationships — rather than a
 * second implementation of it that would drift.
 *
 * Renders nothing when the id does not resolve to a published concept. An
 * article can reference a concept that was later retired, and a chip that opens
 * an empty panel is worse than no chip.
 */
export function ConceptChip({ conceptId }: { conceptId: string }) {
  const [graph] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, initialConceptGraph)
  const concept = graph.concepts.find((item) => item.id === conceptId && item.status === 'active')
  if (!concept) return null

  return (
    <span className="inline-flex max-w-full items-center rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[11.5px] text-ink-2">
      <ConceptText text={concept.label} />
    </span>
  )
}
