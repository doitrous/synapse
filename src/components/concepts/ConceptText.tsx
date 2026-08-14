import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpenText, ExternalLink, FileText, GitFork, TriangleAlert, X } from 'lucide-react'
import { CONCEPT_STORAGE_KEY, initialConceptGraph, type Concept, type ConceptGraph } from '@/data/conceptGraph'
import { MEDICAL_PUBLISHED_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore, type EvidenceLocator, type MedicalEvidenceStore } from '@/data/medicalEvidence'
import { Icon } from '@/components/ui/Icon'
import { Popover } from '@/components/ui/Popover'
import { RichText } from '@/components/ui/RichText'
import { apiOpenFile } from '@/lib/api'
import { usePersistentState } from '@/lib/usePersistentState'

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function sourceFragment(locator: EvidenceLocator | string | undefined) {
  if (!locator || typeof locator === 'string') return ''
  return locator.page ? `#page=${locator.page}` : ''
}

function sourceLocation(locator: EvidenceLocator | string | undefined) {
  if (!locator) return 'Source record'
  if (typeof locator === 'string') return locator
  return [locator.printed_page ? `printed page ${locator.printed_page}` : null, locator.page ? `PDF page ${locator.page}` : null, locator.section].filter(Boolean).join(' · ') || locator.type || 'Exact locator'
}

/** `related_concepts` is a database value, not something to show a student. */
function humanRelation(type: string) {
  const words = type.replace(/[_-]+/g, ' ').trim()
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : 'Related'
}

export function ConceptText({ text, enabled = true }: { text: string; enabled?: boolean }) {
  const [open, setOpen] = useState<{ concept: Concept; anchor: HTMLElement } | null>(null)
  const active = open?.concept ?? null
  const [graph] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, initialConceptGraph)
  const [evidence] = usePersistentState<MedicalEvidenceStore>(MEDICAL_PUBLISHED_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore)
  const matches = useMemo(() => {
    if (!enabled) return [{ text, concept: null as Concept | null }]
    const lookup = new Map<string, Concept>()
    graph.concepts.filter((concept) => concept.status === 'active').forEach((concept) => [concept.label, ...concept.aliases].forEach((term) => {
      if (term.trim()) lookup.set(term.toLowerCase(), concept)
    }))
    const terms = [...lookup.keys()].sort((a, b) => b.length - a.length)
    if (!terms.length) return [{ text, concept: null as Concept | null }]
    const expression = new RegExp(`\\b(${terms.map(escapeRegExp).join('|')})\\b`, 'gi')
    const parts: Array<{ text: string; concept: Concept | null }> = []
    let cursor = 0
    for (const match of text.matchAll(expression)) {
      const index = match.index ?? 0
      if (index > cursor) parts.push({ text: text.slice(cursor, index), concept: null })
      parts.push({ text: match[0], concept: lookup.get(match[0].toLowerCase()) ?? null })
      cursor = index + match[0].length
    }
    if (cursor < text.length) parts.push({ text: text.slice(cursor), concept: null })
    return parts
  }, [graph.concepts, text, enabled])

  const relations = active ? graph.relations.filter((relation) => relation.sourceId === active.id || relation.targetId === active.id).slice(0, 5) : []
  const conceptName = (id: string) => graph.concepts.find((concept) => concept.id === id)?.label ?? id
  const activeSources = useMemo(() => {
    if (!active) return []
    const claimIds = new Set(active.atomicClaimIds ?? [])
    const conceptCitations = evidence.citations.filter((citation) => claimIds.has(citation.claimId))
    const resourceIds = active.resourceIds?.length ? active.resourceIds : [...new Set(conceptCitations.map((citation) => citation.resourceId))]
    return resourceIds.map((resourceId) => ({
      resourceId,
      resource: evidence.resources.find((resource) => resource.id === resourceId),
      citation: conceptCitations.find((citation) => citation.resourceId === resourceId),
    }))
  }, [active, evidence.citations, evidence.resources])

  async function openSource(resourceId: string, sourceUri: string | undefined, locator: EvidenceLocator | string | undefined) {
    const fragment = sourceFragment(locator)
    if (sourceUri) {
      window.open(`${sourceUri}${fragment}`, '_blank', 'noopener,noreferrer')
      return
    }
    await apiOpenFile(`/medical-resources/${encodeURIComponent(resourceId)}`, fragment)
  }

  return (
    <span className="relative">
      {matches.map((part, index) => part.concept ? (
        <button
          key={`${part.text}-${index}`}
          type="button"
          className="rounded-sm border-b border-dotted border-accent-strong font-semibold text-accent-strong transition-colors hover:bg-accent-tint focus:outline-none focus:ring-2 focus:ring-accent/20"
          onClick={(event) => setOpen({ concept: part.concept!, anchor: event.currentTarget })}
          aria-haspopup="dialog"
          aria-expanded={open?.concept.id === part.concept.id}
        >
          {part.text}
        </button>
      ) : (
        // Everything that is not a concept still goes through the inline
        // renderer, so an author's emphasis survives being split around a
        // concept name rather than being shown as raw asterisks.
        <RichText key={`${part.text}-${index}`} text={part.text} />
      ))}

      {/* Portalled rather than absolutely positioned inside the sentence: the
          panel used to be a `<span>` tree pinned under its own word, so it was
          clipped by any scrolling column it sat in and always opened downward
          even at the bottom of the window. */}
      {open && (
        <Popover
          anchor={open.anchor}
          onClose={() => setOpen(null)}
          label={`${open.concept.label} — concept details`}
          className="w-[min(23rem,calc(100vw-2rem))] font-sans font-normal leading-normal text-ink"
        >
          <div className="flex items-start gap-2.5 border-b border-line px-4 py-3">
            <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-accent-tint text-accent-strong"><Icon icon={BookOpenText} size={15} /></span>
            <div className="min-w-0 flex-1">
              <h3 className="font-serif text-[16px] font-semibold leading-snug tracking-[-0.01em] text-ink">{open.concept.label}</h3>
              <p className="mt-0.5 truncate font-mono text-[10px] text-ink-3">{open.concept.id}</p>
            </div>
            <button type="button" onClick={() => setOpen(null)} className="grid size-8 shrink-0 place-items-center rounded-md text-ink-3 hover:bg-inset hover:text-ink" aria-label="Close concept details"><Icon icon={X} size={15} /></button>
          </div>

          <div className="max-h-[min(26rem,60vh)] overflow-y-auto overscroll-contain">
            <p className="px-4 py-3 text-[13px] leading-[1.6] text-ink-2">
              {open.concept.definition || 'Definition awaiting editorial review.'}
            </p>

            {open.concept.pitfalls && (
              <div className="mx-4 mb-3 rounded-lg border border-warning/30 bg-warning-tint/50 p-3">
                <p className="mb-1 flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.06em] text-warning"><Icon icon={TriangleAlert} size={12} />Pitfall</p>
                <p className="text-[12px] leading-relaxed text-ink-2">{open.concept.pitfalls}</p>
              </div>
            )}

            {activeSources.length > 0 && (
              <section className="border-t border-line px-4 py-3">
                <h4 className="mb-2 flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-3"><Icon icon={FileText} size={12} />Sources</h4>
                <ul className="space-y-1.5">
                  {activeSources.map(({ resourceId, resource, citation }) => (
                    <li key={resourceId} className="flex items-center gap-2 rounded-lg border border-line bg-surface-2/40 p-2.5">
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[12px] font-semibold text-ink">{resource?.title ?? resourceId}</span>
                        <span className="mt-0.5 block truncate text-[10.5px] text-ink-3">{resource?.institution || 'Resource'} · {sourceLocation(citation?.locator)}</span>
                      </span>
                      <button
                        type="button"
                        className="inline-flex min-h-8 shrink-0 items-center gap-1 rounded-md px-2 text-[11px] font-semibold text-ink-2 transition-colors hover:bg-accent-tint hover:text-accent-strong focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
                        onClick={() => void openSource(resourceId, resource?.sourceUri, citation?.locator)}
                      >
                        Go <Icon icon={ExternalLink} size={11} />
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {relations.length > 0 && (
              <section className="border-t border-line px-4 py-3">
                <h4 className="mb-2 flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-3"><Icon icon={GitFork} size={12} />Relationships</h4>
                {/* These read as raw rows like "related_concepts → X", or worse,
                    "X → related_concepts" with nothing on the other side. The
                    arrow now carries the direction and the concept is named. */}
                <ul className="space-y-1">
                  {relations.map((relation) => {
                    const outgoing = relation.sourceId === open.concept.id
                    const other = conceptName(outgoing ? relation.targetId : relation.sourceId)
                    return (
                      <li key={relation.id} className="flex items-center gap-2 text-[12px] text-ink-2">
                        <Icon icon={outgoing ? ArrowRight : ArrowLeft} size={13} className="shrink-0 text-ink-3 rtl:-scale-x-100" />
                        <span className="shrink-0 rounded border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-ink-3">{humanRelation(relation.type)}</span>
                        <span className="min-w-0 flex-1 truncate text-ink">{other}</span>
                      </li>
                    )
                  })}
                </ul>
              </section>
            )}
          </div>
        </Popover>
      )}
    </span>
  )
}
