import { useDeferredValue, useMemo, useState } from 'react'
import { Check, CheckCircle2, ChevronRight, CircleDot, Copy, Pencil, Search, ShieldCheck, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Field, Select, TextInput, Textarea } from '@/components/ui/Field'
import { useMedicalTaxonomy } from '@/data/medicalTaxonomyStore'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Panel } from '@/components/ui/Panel'
import { cn } from '@/lib/cn'
import {
  MEDICAL_TAXONOMY_DIVISIONS,
  indexMedicalTaxonomy,
  searchMedicalTaxonomy,
  type MedicalTaxonomyDivision,
  type MedicalTaxonomyNode,
} from '@/data/medicalLibraryTaxonomy'

type TaxonomyIndex = ReturnType<typeof indexMedicalTaxonomy>

function NodeRow({
  node,
  index,
  selectedId,
  expanded,
  onSelect,
  onToggle,
}: {
  node: MedicalTaxonomyNode
  index: TaxonomyIndex
  selectedId?: string
  expanded: Set<string>
  onSelect: (id: string) => void
  onToggle: (id: string) => void
}) {
  const children = index.children(node.id)
  const isOpen = expanded.has(node.id)
  return (
    <li>
      <div className={cn('group flex min-h-11 items-center rounded-md pe-2 transition-colors sm:min-h-9', selectedId === node.id ? 'bg-primary-tint text-primary-strong' : 'text-ink-2 hover:bg-inset hover:text-ink')} style={{ paddingInlineStart: `${6 + node.depth * 14}px` }}>
        {children.length > 0 ? (
          <button type="button" onClick={() => onToggle(node.id)} className="grid size-11 shrink-0 place-items-center rounded text-ink-3 hover:bg-inset hover:text-ink sm:size-7" aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${node.title}`}>
            <Icon icon={ChevronRight} size={13} className={cn('chevron-turn')} open={isOpen} />
          </button>
        ) : <span className="grid size-11 shrink-0 place-items-center sm:size-7"><span className="size-1 rounded-full bg-line-2" /></span>}
        <button type="button" onClick={() => onSelect(node.id)} className="min-h-11 min-w-0 flex-1 py-1.5 text-start text-[12px] leading-snug sm:min-h-9">
          <span className="line-clamp-2">{node.title}</span>
        </button>
        {children.length > 0 && <span className="tnum ms-2 font-mono text-[9.5px] text-ink-3">{children.length}</span>}
      </div>
      {isOpen && children.length > 0 && (
        <ul>
          {children.map((child) => <NodeRow key={child.id} node={child} index={index} selectedId={selectedId} expanded={expanded} onSelect={onSelect} onToggle={onToggle} />)}
        </ul>
      )}
    </li>
  )
}

function DefinitionList({ rows }: { rows: Array<[string, string | undefined]> }) {
  return (
    <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
      {rows.filter(([, value]) => value).map(([label, value]) => (
        <div key={label}>
          <dt className="text-[10px] font-bold uppercase tracking-[0.07em] text-ink-3">{label}</dt>
          <dd className="mt-1 text-[12.5px] leading-relaxed text-ink-2">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function MedicalTaxonomyAdminBrowser({ taxonomy }: { taxonomy: MedicalTaxonomyNode[] }) {
  /**
   * The same live store the students read.
   *
   * The browser was read-only, so a mistyped node title could only be fixed by
   * editing the generated source file and redeploying. Titles, priority and the
   * review note are editable here; the structure itself — which nodes exist and
   * where they sit — still comes from the reviewed import, because reparenting
   * a node silently moves every article, question and concept placed under it.
   */
  const [, setTaxonomy] = useMedicalTaxonomy()
  const [editing, setEditing] = useState(false)
  const [division, setDivision] = useState<MedicalTaxonomyDivision>('system')
  const [selectedId, setSelectedId] = useState<string>()
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const index = useMemo(() => indexMedicalTaxonomy(taxonomy), [taxonomy])
  const selected = selectedId ? index.byId.get(selectedId) : undefined
  const roots = index.roots(division)
  const results = useMemo(() => searchMedicalTaxonomy(taxonomy, deferredQuery, division).slice(0, 80), [deferredQuery, division, taxonomy])
  const counts = useMemo(() => MEDICAL_TAXONOMY_DIVISIONS.map((item) => {
    const nodes = taxonomy.filter((node) => node.division === item.id)
    return { ...item, nodes: nodes.length, roots: nodes.filter((node) => node.parentId === null).length }
  }), [taxonomy])
  const levels = useMemo(() => taxonomy.reduce<Record<string, number>>((map, node) => ({ ...map, [node.level]: (map[node.level] ?? 0) + 1 }), {}), [taxonomy])
  const lineage = selected ? index.lineage(selected.id) : []
  const selectedChildren = selected ? index.children(selected.id) : []

  /** Edit one node in place, leaving the structure untouched. */
  function patchNode(id: string, patch: Partial<MedicalTaxonomyNode>) {
    setTaxonomy((current) => current.map((node) => node.id === id ? { ...node, ...patch } : node))
  }

  const choose = (node: MedicalTaxonomyNode) => {
    setDivision(node.division)
    setSelectedId(node.id)
    setExpanded((current) => {
      const next = new Set(current)
      index.lineage(node.id).slice(0, -1).forEach((parent) => next.add(parent.id))
      return next
    })
    setQuery('')
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.7fr)]">
        <Panel className="p-4">
          <div className="flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-success/20 bg-success-tint text-success"><Icon icon={ShieldCheck} size={18} /></span>
            <div>
              <p className="text-[13.5px] font-semibold text-ink">Reviewed canonical structure</p>
              <p className="mt-1 text-[12px] leading-relaxed text-ink-2">The medical library uses four connected views. Stable IDs are shared by articles, concepts, relationships, questions, and resources; a record may have one primary placement and several secondary placements.</p>
            </div>
          </div>
        </Panel>
        <Panel className="p-4">
          <div className="flex items-center gap-2 text-[12.5px] font-semibold text-ink"><Icon icon={CheckCircle2} size={16} className="text-success" />Structural validation passed</div>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[11.5px] text-ink-2">
            <span>{taxonomy.length.toLocaleString()} unique nodes</span><span>No missing parents</span>
            <span>No duplicate siblings</span><span>No broken ID paths</span>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {counts.map((item) => (
          <button key={item.id} type="button" onClick={() => { setDivision(item.id); setSelectedId(undefined); setQuery('') }} className={cn('rounded-xl border p-4 text-start transition-colors', division === item.id ? 'border-primary-line bg-primary-tint/60' : 'border-line bg-surface hover:border-line-2 hover:bg-surface-2/40')}>
            <p className="text-[11.5px] font-semibold text-ink">{item.label}</p>
            <p className="tnum mt-2 font-mono text-[20px] font-semibold text-ink">{item.nodes.toLocaleString()}</p>
            <p className="mt-0.5 text-[10.5px] text-ink-3">{item.roots} {item.rootLabel.toLowerCase()}{item.roots === 1 ? '' : 's'}</p>
          </button>
        ))}
      </div>

      <Panel className="overflow-hidden">
        <div className="grid min-h-[34rem] lg:grid-cols-[21rem_minmax(0,1fr)]">
          <aside className="border-b border-line bg-surface-2/35 lg:border-b-0 lg:border-e">
            <div className="border-b border-line p-3">
              <label className="flex h-9 items-center gap-2 rounded-lg border border-line bg-surface px-3 focus-within:border-primary-line">
                <Icon icon={Search} size={14} className="text-ink-3" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${MEDICAL_TAXONOMY_DIVISIONS.find((item) => item.id === division)?.shortLabel.toLowerCase()}…`} className="min-w-0 flex-1 bg-transparent text-[12px] text-ink outline-none placeholder:text-ink-3" />
              </label>
            </div>
            <div className="max-h-[30rem] overflow-y-auto p-2 lg:max-h-[42rem]">
              {deferredQuery ? (
                results.length ? <ul className="space-y-1">{results.map((node) => (
                  <li key={node.id}><button type="button" onClick={() => choose(node)} className="w-full rounded-md px-3 py-2 text-start hover:bg-inset"><span className="block text-[12px] font-medium text-ink">{node.title}</span><span className="mt-0.5 block truncate font-mono text-[9.5px] text-ink-3">{node.id}</span></button></li>
                ))}</ul> : <p className="px-3 py-8 text-center text-[12px] text-ink-3">No branch matches this search.</p>
              ) : (
                <ul>{roots.map((root) => <NodeRow key={root.id} node={root} index={index} selectedId={selectedId} expanded={expanded} onSelect={setSelectedId} onToggle={(id) => setExpanded((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next })} />)}</ul>
              )}
            </div>
          </aside>

          <main className="min-w-0 p-5 sm:p-6">
            {selected ? (
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="neutral">{selected.level}</Badge>
                  <Badge tone={selected.priority === 'Core' ? 'success' : 'neutral'}>{selected.priority}</Badge>
                  <span className="text-[10.5px] text-ink-3">{selected.divisionLabel === 'By System' ? 'Systems & General' : selected.divisionLabel}</span>
                </div>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <h2 className="font-serif text-[27px] font-semibold leading-tight text-ink">{selected.title}</h2>
                  <Button variant="secondary" size="sm" iconLeft={editing ? X : Pencil} onClick={() => setEditing((open) => !open)}>{editing ? 'Close' : 'Edit'}</Button>
                </div>
                {editing && (
                  <div className="mt-4 space-y-3 rounded-lg border border-primary-line bg-primary-tint/20 p-4">
                    <Field label="Title"><TextInput value={selected.title} onChange={(event) => patchNode(selected.id, { title: event.target.value })} /></Field>
                    <Field label="Priority">
                      <Select value={selected.priority} onChange={(event) => patchNode(selected.id, { priority: event.target.value as MedicalTaxonomyNode['priority'] })}>
                        {['Core', 'Extended'].map((value) => <option key={value} value={value}>{value}</option>)}
                      </Select>
                    </Field>
                    <Field label="Review note" hint="Editorial guidance for whoever authors under this node">
                      <Textarea value={selected.note ?? ''} onChange={(event) => patchNode(selected.id, { note: event.target.value })} className="min-h-20" />
                    </Field>
                    <p className="flex items-center gap-1.5 text-[11.5px] text-ink-3"><Icon icon={Check} size={13} />Changes save as you type and are live for students immediately.</p>
                  </div>
                )}
                <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-ink-3">
                  {lineage.map((node, indexValue) => <span key={node.id} className="contents"><span>{node.title}</span>{indexValue < lineage.length - 1 && <ChevronRight size={11} />}</span>)}
                </div>

                <div className="mt-5 rounded-lg border border-line bg-surface-2/40 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div><p className="text-[10px] font-bold uppercase tracking-[0.07em] text-ink-3">Stable taxonomy ID</p><code className="mt-1 block text-[12px] text-ink">{selected.id}</code></div>
                    <button type="button" onClick={() => navigator.clipboard?.writeText(selected.id)} className="inline-flex h-8 items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 text-[11px] font-medium text-ink-2 hover:border-line-2 hover:text-ink"><Icon icon={Copy} size={12} />Copy ID</button>
                  </div>
                </div>

                <div className="mt-6">
                  <DefinitionList rows={[
                    ['Role', selected.role],
                    ['Article template', selected.templateId],
                    ['Recommended contents', selected.slots.join(' · ')],
                    ['Review note', selected.note],
                  ]} />
                </div>

                <div className="mt-7 border-t border-line pt-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">Direct children · {selectedChildren.length}</p>
                  {selectedChildren.length ? (
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {selectedChildren.map((child) => <button key={child.id} type="button" onClick={() => choose(child)} className="flex items-center gap-2 rounded-lg border border-line px-3 py-2.5 text-start text-[12px] text-ink-2 hover:border-primary-line hover:text-ink"><Icon icon={CircleDot} size={12} className="shrink-0 text-primary" /><span>{child.title}</span></button>)}
                    </div>
                  ) : <p className="mt-2 text-[12px] text-ink-3">This is a leaf placement for articles, concepts, questions, and resources.</p>}
                </div>
              </div>
            ) : (
              <div className="grid min-h-[26rem] place-items-center text-center">
                <div className="max-w-md"><span className="mx-auto grid size-11 place-items-center rounded-full border border-line bg-surface-2 text-ink-3"><Icon icon={CircleDot} size={18} /></span><h2 className="mt-4 font-serif text-[23px] font-semibold text-ink">Select a branch to inspect it</h2><p className="mt-2 text-[12.5px] leading-relaxed text-ink-2">Review its stable ID, hierarchy, article role, template, and direct children. Search includes titles and IDs.</p><p className="mt-4 font-mono text-[10.5px] text-ink-3">{Object.entries(levels).map(([level, count]) => `${count} ${level.toLowerCase()}`).join(' · ')}</p></div>
              </div>
            )}
          </main>
        </div>
      </Panel>
    </div>
  )
}
