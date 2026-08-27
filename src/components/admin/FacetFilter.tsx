import { useMemo, useState } from 'react'
import { Tags, Check, ChevronDown, X } from 'lucide-react'
import { Popover, usePopoverTrigger } from '@/components/ui/Popover'
import { SearchInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { facetKey, type Facet, type FacetGroups } from '@/data/contentFacets'

/**
 * The tag filter shared by every content catalogue: one picker over an item's
 * module, subject, and editorial tags, choosing any number at once. Selection
 * is ANY-of — an item is kept when it matches at least one chosen facet — which
 * is what an admin means picking two modules ("show CVS or Respiratory"), the
 * common case when an item has a single module.
 */
export function FacetFilter({
  groups,
  flags = [],
  selected,
  onChange,
}: {
  groups: FacetGroups
  /** Audit facets such as "Needs module", offered only when relevant. */
  flags?: Facet[]
  selected: Set<string>
  onChange: (next: Set<string>) => void
}) {
  const trigger = usePopoverTrigger()
  const [query, setQuery] = useState('')

  const sections = useMemo(() => ([
    { key: 'flags', label: 'Audit', facets: flags },
    { key: 'modules', label: 'Modules', facets: groups.modules },
    { key: 'subjects', label: 'Subjects', facets: groups.subjects },
    { key: 'tags', label: 'Tags', facets: groups.tags },
  ] as const).map((section) => ({
    ...section,
    facets: query.trim()
      ? section.facets.filter((facet) => facet.label.toLowerCase().includes(query.trim().toLowerCase()))
      : section.facets,
  })).filter((section) => section.facets.length > 0), [flags, groups, query])

  const total = groups.modules.length + groups.subjects.length + groups.tags.length + flags.length
  if (total === 0) return null

  const toggle = (facet: Facet) => {
    const next = new Set(selected)
    const key = facetKey(facet)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    onChange(next)
  }

  return (
    <>
      <button
        ref={trigger.setAnchor}
        type="button"
        onClick={trigger.toggle}
        aria-haspopup="dialog"
        aria-expanded={trigger.open}
        className={cn(
          'inline-flex h-11 items-center gap-2 rounded-md border px-3 text-[12.5px] font-medium transition-colors sm:h-9',
          selected.size > 0
            ? 'border-primary-line bg-primary-tint text-primary-strong'
            : 'border-line bg-surface text-ink-2 hover:border-line-2 hover:text-ink',
        )}
      >
        <Icon icon={Tags} size={14} />
        <span>Tags{selected.size > 0 ? ` · ${selected.size}` : ''}</span>
        <Icon icon={ChevronDown} size={14} className="text-ink-3" />
      </button>

      {trigger.open && (
        <Popover anchor={trigger.anchor} onClose={trigger.close} label="Filter by tags" className="w-[19rem]">
          <div className="border-b border-line p-2.5">
            <SearchInput aria-label="Search tags" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search modules, subjects, tags…" className="w-full" />
          </div>
          <div className="max-h-[19rem] overflow-y-auto py-1.5">
            {sections.length === 0 && <p className="px-3 py-6 text-center text-[12px] text-ink-3">No matching tags.</p>}
            {sections.map((section) => (
              <div key={section.key} className="px-1.5 pb-1.5">
                <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.07em] text-ink-3">{section.label}</p>
                {section.facets.map((facet) => {
                  const key = facetKey(facet)
                  const active = selected.has(key)
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggle(facet)}
                      className={cn(
                        'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-start text-[12.5px]',
                        active ? 'bg-primary-tint text-primary-strong' : 'text-ink-2 hover:bg-inset',
                      )}
                    >
                      <span className={cn('grid size-4 shrink-0 place-items-center rounded border', active ? 'border-primary bg-primary text-white' : 'border-line')}>
                        {active && <Icon icon={Check} size={11} />}
                      </span>
                      {facet.color && <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: facet.color }} />}
                      <span className="min-w-0 flex-1 truncate">{facet.label}</span>
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
          {selected.size > 0 && (
            <div className="flex items-center justify-between border-t border-line px-3 py-2">
              <span className="text-[11.5px] text-ink-3">{selected.size} selected</span>
              <button type="button" onClick={() => onChange(new Set())} className="text-[12px] font-semibold text-primary-strong hover:text-primary">Clear all</button>
            </div>
          )}
        </Popover>
      )}
    </>
  )
}

/** The chosen facets, shown inline so a filter is visible without reopening. */
export function FacetChips({
  selected,
  labelFor,
  onRemove,
}: {
  selected: Set<string>
  labelFor: (token: string) => string
  onRemove: (token: string) => void
}) {
  if (selected.size === 0) return null
  return (
    <>
      {[...selected].map((token) => (
        <button
          key={token}
          type="button"
          onClick={() => onRemove(token)}
          className="inline-flex h-11 items-center gap-1.5 rounded-full border border-primary-line bg-primary-tint px-3 text-[12px] font-medium text-primary-strong hover:bg-primary-tint/70 sm:h-7"
        >
          <span className="max-w-40 truncate">{labelFor(token)}</span>
          <Icon icon={X} size={12} />
        </button>
      ))}
    </>
  )
}
