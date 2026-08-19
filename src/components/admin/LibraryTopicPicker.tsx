import { useMemo, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import {
  MEDICAL_TAXONOMY_DIVISIONS,
  indexMedicalTaxonomy,
  searchMedicalTaxonomy,
  type MedicalTaxonomyDivision,
  type MedicalTaxonomyNode,
} from '@/data/medicalLibraryTaxonomy'
import { Icon } from '@/components/ui/Icon'
import { SearchInput } from '@/components/ui/Field'
import { Checkbox } from '@/components/ui/Checkbox'
import { cn } from '@/lib/cn'

/**
 * The library's topic tree, with checkboxes.
 *
 * A module used to be assembled from a flat grid of article titles with two grey
 * badges, while students browsed the same content as a system → topic → subtopic →
 * microtopic tree. Choosing what a module covers should look like the thing being
 * covered, so this is that tree: same chevron, same leaf dot, same indent rule, same
 * counted rows — with a checkbox, because here a topic is picked rather than opened.
 *
 * It is a sibling of the student's `TaxonomyBranch` rather than a reuse of it: that
 * one carries a single selected node and no multi-select, and the student library is
 * not the place to find out that changing it broke something.
 */
function TopicBranch({ node, index, open, chosen, counts, onToggleOpen, onToggleChosen }: {
  node: MedicalTaxonomyNode
  index: ReturnType<typeof indexMedicalTaxonomy>
  open: Set<string>
  chosen: Set<string>
  counts: (nodeId: string) => number
  onToggleOpen: (nodeId: string) => void
  onToggleChosen: (nodeId: string) => void
}) {
  const children = index.children(node.id)
  const expanded = open.has(node.id)
  const isChosen = chosen.has(node.id)
  const count = counts(node.id)
  return (
    <li className="[content-visibility:auto]">
      <div className={cn('group flex min-h-9 items-center gap-1 rounded-md pe-1', isChosen && 'bg-primary-tint/55')}>
        {children.length > 0 ? (
          <button type="button" onClick={() => onToggleOpen(node.id)} className="grid size-8 shrink-0 place-items-center rounded text-ink-3 hover:bg-inset hover:text-ink" aria-label={`${expanded ? 'Collapse' : 'Expand'} ${node.title}`} aria-expanded={expanded}>
            <Icon icon={ChevronRight} size={13} className={cn('chevron-turn')} open={expanded} />
          </button>
        ) : (
          <span className="ms-3 me-2 size-1.5 shrink-0 rounded-full bg-line-2" />
        )}
        <Checkbox label={`Include ${node.title}`} checked={isChosen} onChange={() => onToggleChosen(node.id)} />
        <button type="button" onClick={() => onToggleChosen(node.id)} className="min-w-0 flex-1 py-2 text-start">
          <span className={cn('block truncate text-[12px]', isChosen ? 'font-semibold text-primary-strong' : 'text-ink-2 group-hover:text-ink')}>{node.title}</span>
        </button>
        {count > 0 && <span className="tnum rounded-full bg-surface px-1.5 py-0.5 font-mono text-[9px] text-ink-3">{count}</span>}
      </div>
      {expanded && children.length > 0 && (
        <ul className="ms-4 border-s border-line ps-1">
          {children.map((child) => (
            <TopicBranch key={child.id} node={child} index={index} open={open} chosen={chosen} counts={counts} onToggleOpen={onToggleOpen} onToggleChosen={onToggleChosen} />
          ))}
        </ul>
      )}
    </li>
  )
}

export function LibraryTopicPicker({ nodes, chosen, onChange, counts }: {
  nodes: MedicalTaxonomyNode[]
  chosen: string[]
  onChange: (nodeIds: string[]) => void
  /** Articles under a node, shown as the trailing tally. */
  counts: (nodeId: string) => number
}) {
  const index = useMemo(() => indexMedicalTaxonomy(nodes), [nodes])
  const [division, setDivision] = useState<MedicalTaxonomyDivision>('system')
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<Set<string>>(() => new Set())
  const chosenSet = useMemo(() => new Set(chosen), [chosen])

  const roots = useMemo(() => index.roots(division), [index, division])
  const results = useMemo(
    () => (query.trim().length < 2 ? [] : searchMedicalTaxonomy(nodes, query).slice(0, 40)),
    [nodes, query],
  )

  const toggleChosen = (nodeId: string) =>
    onChange(chosenSet.has(nodeId) ? chosen.filter((id) => id !== nodeId) : [...chosen, nodeId])

  const toggleOpen = (nodeId: string) =>
    setOpen((current) => {
      const next = new Set(current)
      if (next.has(nodeId)) next.delete(nodeId)
      else next.add(nodeId)
      return next
    })

  return (
    <div className="flex min-h-0 flex-col">
      <div className="flex flex-wrap items-center gap-1.5 border-b border-line px-1 pb-2">
        {MEDICAL_TAXONOMY_DIVISIONS.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => { setDivision(entry.id); setQuery('') }}
            className={cn('inline-flex h-8 items-center rounded-lg px-2.5 text-[12px] font-medium transition-colors', division === entry.id ? 'bg-primary-tint text-primary-strong' : 'text-ink-2 hover:bg-inset hover:text-ink')}
          >
            {entry.shortLabel}
          </button>
        ))}
        <SearchInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search this view…" className="ms-auto w-56" />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {results.length > 0 ? (
          <ul>
            {results.map((node) => (
              <li key={node.id} className="flex min-h-9 items-center gap-2 rounded-md px-1">
                <Checkbox label={`Include ${node.title}`} checked={chosenSet.has(node.id)} onChange={() => toggleChosen(node.id)} />
                <button type="button" onClick={() => toggleChosen(node.id)} className="min-w-0 flex-1 py-1.5 text-start">
                  <span className="block truncate text-[12px] text-ink-2">{node.title}</span>
                  <span className="block truncate font-mono text-[9.5px] text-ink-3">{node.divisionLabel} · {node.root}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : query.trim().length >= 2 ? (
          <p className="px-2 py-10 text-center text-[12.5px] text-ink-3">Nothing in the library matches “{query.trim()}”.</p>
        ) : (
          <ul>
            {roots.map((node) => (
              <TopicBranch key={node.id} node={node} index={index} open={open} chosen={chosenSet} counts={counts} onToggleOpen={toggleOpen} onToggleChosen={toggleChosen} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
