import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpenText, ExternalLink, FileText, GitFork, TriangleAlert, X } from 'lucide-react'
import { type Concept } from '@/data/conceptGraph'
import { MEDICAL_PUBLISHED_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore, type EvidenceLocator, type MedicalEvidenceStore } from '@/data/medicalEvidence'
import { Icon } from '@/components/ui/Icon'
import { PlacedImage } from '@/components/ui/PlacedMedia'
import { useMediaRecords } from '@/lib/useMediaRecords'
import { Popover } from '@/components/ui/Popover'
import { RichText } from '@/components/ui/RichText'
import { apiOpenFile } from '@/lib/api'
import { usePersistentState } from '@/lib/usePersistentState'
import { useConceptDetail, useConceptIndex } from '@/lib/content'
import { useT } from '@/lib/i18n'

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
  const t = useT()
  const [open, setOpen] = useState<{ concept: Concept; anchor: HTMLElement } | null>(null)
  const mediaRecords = useMediaRecords()
  const active = open?.concept ?? null
  const [graph] = useConceptIndex()
  const [evidence] = usePersistentState<MedicalEvidenceStore>(MEDICAL_PUBLISHED_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore)
  // The graph the app holds is the slim concept *index* — labels, aliases and
  // relations, no prose. When a card opens, fetch that one concept's full
  // detail (definition, pitfalls, images, evidence) and lay it over the index
  // concept; until it lands the card shows the title and a loading line.
  const [detail] = useConceptDetail(open?.concept.id ?? null)
  const full: Concept | null = detail ?? active
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
    if (!full) return []
    const claimIds = new Set(full.atomicClaimIds ?? [])
    const conceptCitations = evidence.citations.filter((citation) => claimIds.has(citation.claimId))
    const resourceIds = full.resourceIds?.length ? full.resourceIds : [...new Set(conceptCitations.map((citation) => citation.resourceId))]
    return resourceIds.map((resourceId) => ({
      resourceId,
      resource: evidence.resources.find((resource) => resource.id === resourceId),
      citation: conceptCitations.find((citation) => citation.resourceId === resourceId),
    }))
  }, [full, evidence.citations, evidence.resources])

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
          // Cortex blue, not crimson: a concept term points at a definition,
          // it does not perform anything. Crimson is reserved for what the
          // reader is meant to act on, and a page of article prose where every
          // term shouted in the action colour would bury the one control that
          // matters.
          className="rounded-sm border-b border-dotted border-primary font-semibold text-primary transition-colors hover:bg-primary-tint focus:outline-none focus:ring-2 focus:ring-primary/20"
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
          label={t('{concept} — concept details').replace('{concept}', open.concept.label)}
          className="w-[min(23rem,calc(100vw-2rem))] font-sans font-normal leading-normal text-ink"
        >
          <div className="flex items-start gap-2.5 border-b border-line px-4 py-3">
            <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-primary-tint text-primary-strong"><Icon icon={BookOpenText} size={15} /></span>
            <div className="min-w-0 flex-1">
              <h3 className="font-serif text-[16px] font-semibold leading-snug tracking-[-0.01em] text-ink">{open.concept.label}</h3>
              <p className="mt-0.5 truncate font-mono text-[10px] text-ink-3">{open.concept.id}</p>
            </div>
            <button type="button" onClick={() => setOpen(null)} className="grid size-8 shrink-0 place-items-center rounded-md text-ink-3 hover:bg-inset hover:text-ink" aria-label={t('Close concept details')}><Icon icon={X} size={15} /></button>
          </div>

          <div className="max-h-[min(26rem,60dvh)] overflow-y-auto overscroll-contain">
            <div className="px-4 py-3 text-[13px] leading-[1.6] text-ink-2">
              {full?.definition
                ? full.definition.split('\n').filter((line) => line.trim()).map((para, index) => (
                    <p key={index} className={index ? 'mt-2.5' : undefined}><RichText text={para} /></p>
                  ))
                : detail
                  ? <p>{t('Definition awaiting editorial review.')}</p>
                  : <p className="text-ink-3">{t('Loading…')}</p>}
            </div>

            {/* A concept's own images, from the same library a question draws
                on — so the plate a student meets in a question is the plate
                they meet again here. */}
            {(full?.mediaIds ?? []).length > 0 && (
              <div className="px-4 pb-3">
                {(full?.mediaIds ?? []).map((mediaId) => {
                  const record = mediaRecords.get(mediaId)
                  return record ? <PlacedImage key={mediaId} record={record} className="max-h-48 w-full rounded object-contain" /> : null
                })}
              </div>
            )}

            {full?.pitfalls && (
              <div className="mx-4 mb-3 rounded-lg border border-warning/30 bg-warning-tint/50 p-3">
                <p className="mb-1 flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.06em] text-warning"><Icon icon={TriangleAlert} size={12} />{t('Pitfall')}</p>
                <p className="text-[12px] leading-relaxed text-ink-2">{full.pitfalls}</p>
              </div>
            )}

            {activeSources.length > 0 && (
              <section className="border-t border-line px-4 py-3">
                <h4 className="mb-2 flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-3"><Icon icon={FileText} size={12} />{t('Sources')}</h4>
                <ul className="space-y-1.5">
                  {activeSources.map(({ resourceId, resource, citation }) => (
                    <li key={resourceId} className="flex items-center gap-2 rounded-lg border border-line bg-surface-2/40 p-2.5">
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[12px] font-semibold text-ink">{resource?.title ?? resourceId}</span>
                        <span className="mt-0.5 block truncate text-[10.5px] text-ink-3">{resource?.institution || t('Resource')} · {sourceLocation(citation?.locator)}</span>
                      </span>
                      <button
                        type="button"
                        className="inline-flex min-h-8 shrink-0 items-center gap-1 rounded-md px-2 text-[11px] font-semibold text-ink-2 transition-colors hover:bg-primary-tint hover:text-primary-strong focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
                        onClick={() => void openSource(resourceId, resource?.sourceUri, citation?.locator)}
                      >
                        {t('Go')} <Icon icon={ExternalLink} size={11} />
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {relations.length > 0 && (
              <section className="border-t border-line px-4 py-3">
                <h4 className="mb-2 flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-3"><Icon icon={GitFork} size={12} />{t('Relationships')}</h4>
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
