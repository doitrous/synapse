import { useMemo, useState } from 'react'
import { ChevronRight, Pencil, Network, X, Search } from 'lucide-react'
import type { Concept, ConceptGraph } from '@/data/conceptGraph'
import { subjects } from '@/data/subjects'
import { indexMedicalTaxonomy, MEDICAL_TAXONOMY_DIVISIONS, type MedicalTaxonomyNode } from '@/data/medicalLibraryTaxonomy'
import type { TaxSysNode } from '@/data/taxonomyStore'
import { Icon } from '@/components/ui/Icon'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { SearchInput, Select } from '@/components/ui/Field'
import { cn } from '@/lib/cn'

/** A node in the concept placement tree. */
export interface TreeNode {
  key: string
  label: string
  level: string
  nodeId: string
  children: Map<string, TreeNode>
  concepts: Concept[]
}

export function countIn(node: TreeNode): number {
  return node.concepts.length + [...node.children.values()].reduce((n, c) => n + countIn(c), 0)
}

/** Recursive collapsible branch with an editable label (topic/subtopic/…). */
export function ConceptTreeBranch({ node, depth, expanded, onToggle, selectedId, onSelect, onRename, badgeFor }: {
  node: TreeNode
  depth: number
  expanded: Record<string, boolean>
  onToggle: (key: string) => void
  selectedId: string | null
  onSelect: (c: Concept) => void
  onRename?: (level: string, nodeId: string, title: string) => void
  /** Optional trailing marker per concept — a relation count, a warning, … */
  badgeFor?: (concept: Concept) => React.ReactNode
}) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(node.label)
  const open = expanded[node.key] ?? true
  const total = countIn(node)
  const canRename = Boolean(onRename) && node.level !== 'system' && node.level !== 'canonical' && node.nodeId !== 'unassigned'
  return (
    <div style={{ paddingInlineStart: depth === 0 ? 0 : 10 }} className={depth === 0 ? '' : 'border-s border-line-2'}>
      <div className="group/branch flex items-center gap-1.5 rounded-md px-2 py-1.5 hover:bg-inset/50">
        <button onClick={() => onToggle(node.key)} className="grid size-5 place-items-center text-ink-3 hover:text-ink" aria-expanded={open} aria-label={`${open ? 'Collapse' : 'Expand'} ${node.label}`}>
          <Icon icon={ChevronRight} size={14} className={cn('transition-transform', open && 'rotate-90')} />
        </button>
        {editing && onRename ? (
          <input
            autoFocus value={value} onChange={(e) => setValue(e.target.value)}
            onBlur={() => { setEditing(false); if (value.trim() && value !== node.label) onRename(node.level, node.nodeId, value.trim()) }}
            onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); if (e.key === 'Escape') { setValue(node.label); setEditing(false) } }}
            className="flex-1 rounded border border-accent bg-surface px-1.5 py-0.5 text-[13px] font-semibold text-ink outline-none"
          />
        ) : (
          <span className={cn('flex-1 truncate font-semibold text-ink', depth === 0 ? 'text-[13px]' : 'text-[12.5px]')}>{node.label}</span>
        )}
        {canRename && !editing && (
          <button onClick={() => { setValue(node.label); setEditing(true) }} title="Rename" className="grid size-6 place-items-center rounded text-ink-3 opacity-0 hover:bg-inset hover:text-ink group-hover/branch:opacity-100"><Icon icon={Pencil} size={12} /></button>
        )}
        <span className="tnum font-mono text-[10.5px] text-ink-3">{total}</span>
      </div>
      {open && (
        <div className="ms-2.5">
          {[...node.children.values()].map((child) => (
            <ConceptTreeBranch key={child.key} node={child} depth={depth + 1} expanded={expanded} onToggle={onToggle} selectedId={selectedId} onSelect={onSelect} onRename={onRename} badgeFor={badgeFor} />
          ))}
          {node.concepts.length > 0 && (
            <ul className="ms-2 space-y-0.5 border-s border-line-2 ps-2">
              {node.concepts.map((concept) => (
                <li key={concept.id}>
                  <button
                    onClick={() => onSelect(concept)}
                    className={cn('flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-start transition-colors', selectedId === concept.id ? 'bg-accent-tint text-accent-strong' : 'text-ink-2 hover:bg-inset hover:text-ink')}
                  >
                    <span className="truncate text-[12.5px] font-medium">{concept.label}</span>
                    {badgeFor ? badgeFor(concept) : (!concept.definition && <Badge tone="warning">No definition</Badge>)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

/** Legacy taxonomy scope for concepts placed before the canonical tree existed. */
function legacyScope(concept: Concept): { subjectId: string; topicId: string } {
  const [subjectId = '', topicId = ''] = (concept.articleIds[0] ?? '').split('-')
  return { subjectId: concept.subjectId || subjectId, topicId }
}

/**
 * Group concepts into their placement tree: canonical medical taxonomy where a
 * concept has a primary node, otherwise the legacy subject → topic → … path.
 */
export function buildConceptTree({
  concepts,
  taxonomy,
  medicalTaxonomy,
  query,
  division,
}: {
  concepts: Concept[]
  taxonomy: TaxSysNode[]
  medicalTaxonomy: MedicalTaxonomyNode[]
  query: string
  division: string
}): TreeNode[] {
  const medicalIndex = indexMedicalTaxonomy(medicalTaxonomy)
  const q = query.trim().toLowerCase()

  const pathOf = (concept: Concept): TreeNode[] => {
    const blank = { children: new Map<string, TreeNode>(), concepts: [] as Concept[] }
    if (concept.primaryNodeId && medicalIndex.byId.has(concept.primaryNodeId)) {
      return medicalIndex.lineage(concept.primaryNodeId).map((node) => ({ key: `canonical:${node.id}`, label: node.title, level: 'canonical', nodeId: node.id, ...blank, children: new Map(), concepts: [] }))
    }
    const legacy = legacyScope(concept)
    const sys = taxonomy.find((s) => s.id === concept.subjectId || s.sysId === concept.systemId) || taxonomy.find((s) => s.id === legacy.subjectId)
    if (!sys) return [{ key: 'sys:unassigned', label: 'Unassigned', level: 'system', nodeId: 'unassigned', children: new Map(), concepts: [] }]
    const path: TreeNode[] = [{ key: `sys:${sys.id}`, label: sys.name, level: 'system', nodeId: sys.id, children: new Map(), concepts: [] }]
    const top = sys.topics.find((t) => t.tpcId === concept.topicTagId) || sys.topics.find((t) => t.id === legacy.topicId)
    if (top) {
      path.push({ key: `tpc:${top.id}`, label: top.title, level: 'topic', nodeId: top.id, children: new Map(), concepts: [] })
      const sub = top.subs.find((s) => s.subId === concept.subtopicId)
      if (sub) {
        path.push({ key: `sub:${sub.id}`, label: sub.title, level: 'subtopic', nodeId: sub.id, children: new Map(), concepts: [] })
        const mic = sub.micros.find((m) => m.micId === concept.microtopicId)
        if (mic) {
          path.push({ key: `mic:${mic.id}`, label: mic.title, level: 'microtopic', nodeId: mic.id, children: new Map(), concepts: [] })
          const nan = mic.nanos.find((n) => n.nanId === concept.nanotopicId)
          if (nan) path.push({ key: `nan:${nan.id}`, label: nan.title, level: 'nanotopic', nodeId: nan.id, children: new Map(), concepts: [] })
        }
      }
    }
    return path
  }

  const inDivision = (concept: Concept) => {
    if (division === 'all') return true
    const node = concept.primaryNodeId ? medicalIndex.byId.get(concept.primaryNodeId) : undefined
    if (division === 'unplaced') return !node
    return node?.division === division
  }

  const filtered = concepts
    .filter(inDivision)
    .filter((c) => !q || c.label.toLowerCase().includes(q) || c.aliases.some((a) => a.toLowerCase().includes(q)) || c.definition.toLowerCase().includes(q))

  const roots = new Map<string, TreeNode>()
  filtered.forEach((concept) => {
    let level = roots
    let node: TreeNode | undefined
    pathOf(concept).forEach((step) => {
      if (!level.has(step.key)) level.set(step.key, { ...step, children: new Map(), concepts: [] })
      node = level.get(step.key)!
      level = node.children
    })
    node?.concepts.push(concept)
  })

  const order = [...medicalIndex.roots('system'), ...medicalIndex.roots('discipline'), ...medicalIndex.roots('skills'), ...medicalIndex.roots('knowledge')].map((node) => `canonical:${node.id}`)
  order.push(...subjects.map((s) => `sys:${s.id}`), 'sys:unassigned')
  return [...roots.values()].sort((a, b) => {
    const ai = order.indexOf(a.key)
    const bi = order.indexOf(b.key)
    if (ai === -1 && bi === -1) return a.label.localeCompare(b.label)
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })
}

/**
 * The persistent left rail for concept-shaped pages.
 *
 * Modelled on the student Library's navigator: a division dropdown to narrow the
 * map, a search box, and a counted tree that stays put while the working area
 * scrolls. Concepts and Relationships both browse the same graph, so they share
 * this rather than each growing their own.
 */
export function ConceptNavigator({
  graph,
  taxonomy,
  medicalTaxonomy,
  selectedId,
  onSelect,
  onRename,
  badgeFor,
  footer,
  action,
  title = 'Concepts',
  className,
}: {
  graph: ConceptGraph
  taxonomy: TaxSysNode[]
  medicalTaxonomy: MedicalTaxonomyNode[]
  selectedId: string | null
  onSelect: (concept: Concept | null) => void
  onRename?: (level: string, nodeId: string, title: string) => void
  badgeFor?: (concept: Concept) => React.ReactNode
  footer?: React.ReactNode
  action?: React.ReactNode
  title?: string
  className?: string
}) {
  const [query, setQuery] = useState('')
  const [division, setDivision] = useState('all')
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const tree = useMemo(
    () => buildConceptTree({ concepts: graph.concepts, taxonomy, medicalTaxonomy, query, division }),
    [graph.concepts, taxonomy, medicalTaxonomy, query, division],
  )
  const shown = useMemo(() => tree.reduce((n, node) => n + countIn(node), 0), [tree])

  return (
    <aside className={cn('flex min-h-0 flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-panel', className)}>
      <div className="flex items-center gap-2 border-b border-line px-3 py-2.5">
        <Icon icon={Network} size={15} className="text-accent" />
        <span className="font-serif text-[15px] font-semibold text-ink">{title}</span>
        <span className="tnum ms-auto font-mono text-[11px] text-ink-3">{shown}</span>
      </div>

      <div className="space-y-2 border-b border-line p-2.5">
        <Select value={division} onChange={(event) => setDivision(event.target.value)} className="w-full">
          <option value="all">All divisions</option>
          {MEDICAL_TAXONOMY_DIVISIONS.map((entry) => <option key={entry.id} value={entry.id}>{entry.label}</option>)}
          <option value="unplaced">Not yet placed</option>
        </Select>
        <div className="relative">
          <SearchInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search concepts…" className="w-full ps-8" />
          <Icon icon={Search} size={14} className="pointer-events-none absolute start-2.5 top-1/2 -translate-y-1/2 text-ink-3" />
        </div>
        {(query || division !== 'all') && (
          <Button variant="ghost" size="sm" iconLeft={X} onClick={() => { setQuery(''); setDivision('all'); onSelect(null) }}>Clear filters</Button>
        )}
        {action}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {tree.length === 0 ? (
          <p className="px-2 py-10 text-center text-[13px] text-ink-3">
            {query ? `No concepts match “${query}”.` : 'No concepts in this division yet.'}
          </p>
        ) : (
          tree.map((node) => (
            <ConceptTreeBranch
              key={node.key}
              node={node}
              depth={0}
              expanded={expanded}
              onToggle={(key) => setExpanded((p) => ({ ...p, [key]: !(p[key] ?? true) }))}
              selectedId={selectedId}
              onSelect={onSelect}
              onRename={onRename}
              badgeFor={badgeFor}
            />
          ))
        )}
      </div>

      {footer && <div className="border-t border-line px-3 py-2.5 text-[11.5px] text-ink-3">{footer}</div>}
    </aside>
  )
}
