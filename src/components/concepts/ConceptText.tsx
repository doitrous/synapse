import { useMemo, useState } from 'react'
import { BookOpenText, GitFork, TriangleAlert, X } from 'lucide-react'
import { conceptGraphFromStorage, type Concept } from '@/data/conceptGraph'
import { Icon } from '@/components/ui/Icon'

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function ConceptText({ text, enabled = true }: { text: string; enabled?: boolean }) {
  const [active, setActive] = useState<Concept | null>(null)
  const graph = useMemo(conceptGraphFromStorage, [])
  const matches = useMemo(() => {
    if (!enabled) return [{ text, concept: null as Concept | null }]
    const lookup = new Map<string, Concept>()
    graph.concepts.forEach((concept) => [concept.label, ...concept.aliases].forEach((term) => {
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

  return (
    <span className="relative">
      {matches.map((part, index) => part.concept ? (
        <button
          key={`${part.text}-${index}`}
          type="button"
          className="rounded-sm border-b border-dotted border-accent-strong font-semibold text-accent-strong transition-colors hover:bg-accent-tint focus:outline-none focus:ring-2 focus:ring-accent/20"
          onClick={() => setActive(part.concept)}
          aria-haspopup="dialog"
        >
          {part.text}
        </button>
      ) : <span key={`${part.text}-${index}`}>{part.text}</span>)}

      {active && (
        <span role="dialog" aria-label={`${active.label} concept details`} className="absolute left-0 top-full z-40 mt-2 block w-[min(23rem,calc(100vw-3rem))] rounded-xl border border-line bg-surface p-4 text-left font-sans font-normal leading-normal text-ink shadow-float">
          <span className="flex items-start gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-tint text-accent-strong"><Icon icon={BookOpenText} size={15} /></span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-bold text-ink">{active.label}</span>
              <span className="mt-0.5 block font-mono text-[10px] text-ink-3">{active.id}</span>
            </span>
            <button type="button" onClick={() => setActive(null)} className="grid size-8 place-items-center rounded-md text-ink-3 hover:bg-inset hover:text-ink" aria-label="Close concept details"><Icon icon={X} size={15} /></button>
          </span>
          <span className="mt-3 block text-[12.5px] leading-relaxed text-ink-2">{active.definition || 'Definition awaiting editorial review.'}</span>
          {active.pitfalls && (
            <span className="mt-3 block rounded-lg border border-warning/30 bg-warning-tint/50 p-2.5">
              <span className="mb-1 flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.06em] text-warning"><Icon icon={TriangleAlert} size={12} />Pitfall</span>
              <span className="block text-[11.5px] leading-relaxed text-ink-2">{active.pitfalls}</span>
            </span>
          )}
          {relations.length > 0 && (
            <span className="mt-3 block border-t border-line pt-3">
              <span className="mb-1.5 flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-3"><Icon icon={GitFork} size={12} />Relationships</span>
              {relations.map((relation) => (
                <span key={relation.id} className="mt-1 block text-[11px] text-ink-2">
                  {relation.sourceId === active.id ? `${relation.type} → ${conceptName(relation.targetId)}` : `${conceptName(relation.sourceId)} → ${relation.type}`}
                </span>
              ))}
            </span>
          )}
        </span>
      )}
    </span>
  )
}
