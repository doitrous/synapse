import { useEffect, useMemo, useState } from 'react'
import { Check, Plus, X } from 'lucide-react'
import { Field, Select, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import {
  MEDICAL_TAXONOMY_DIVISIONS,
  indexMedicalTaxonomy,
  searchMedicalTaxonomy,
  type MedicalTaxonomyDivision,
  type MedicalTaxonomyNode,
} from '@/data/medicalLibraryTaxonomy'

function nodeLabel(node: MedicalTaxonomyNode) {
  return `${node.title} · ${node.id}`
}

export function MedicalTaxonomyPlacementPicker({
  nodes,
  primaryNodeId,
  secondaryNodeIds = [],
  onPrimaryChange,
  onSecondaryChange,
  compact,
}: {
  nodes: MedicalTaxonomyNode[]
  primaryNodeId?: string
  secondaryNodeIds?: string[]
  onPrimaryChange: (nodeId?: string) => void
  onSecondaryChange?: (nodeIds: string[]) => void
  compact?: boolean
}) {
  const index = useMemo(() => indexMedicalTaxonomy(nodes), [nodes])
  const lineage = useMemo(() => primaryNodeId ? index.lineage(primaryNodeId) : [], [index, primaryNodeId])
  const [division, setDivision] = useState<MedicalTaxonomyDivision>(lineage[0]?.division ?? 'system')
  const [secondaryQuery, setSecondaryQuery] = useState('')

  useEffect(() => {
    if (lineage[0]?.division) setDivision(lineage[0].division)
  }, [lineage])

  const levels = useMemo(() => {
    const result: Array<{ label: string; options: MedicalTaxonomyNode[]; value: string }> = []
    let parentId: string | null = null
    for (let depth = 0; depth < 8; depth += 1) {
      const options = parentId === null ? index.roots(division) : index.children(parentId)
      if (!options.length) break
      const selected = lineage[depth]?.division === division ? lineage[depth] : undefined
      result.push({ label: depth === 0 ? (MEDICAL_TAXONOMY_DIVISIONS.find((item) => item.id === division)?.rootLabel ?? 'Root') : options[0]?.level ?? `Level ${depth + 1}`, options, value: selected?.id ?? '' })
      if (!selected) break
      parentId = selected.id
    }
    return result
  }, [division, index, lineage])

  const secondaryResults = useMemo(() => secondaryQuery.trim().length < 2
    ? []
    : searchMedicalTaxonomy(nodes, secondaryQuery).filter((node) => node.id !== primaryNodeId && !secondaryNodeIds.includes(node.id)).slice(0, 10), [nodes, primaryNodeId, secondaryNodeIds, secondaryQuery])

  function selectAtDepth(depth: number, nodeId: string) {
    if (nodeId) onPrimaryChange(nodeId)
    else onPrimaryChange(depth > 0 ? lineage[depth - 1]?.id : undefined)
  }

  return (
    <div className="space-y-3">
      <div className={compact ? 'grid grid-cols-2 gap-2' : 'grid gap-2 sm:grid-cols-2'}>
        <Field label="Library view">
          <Select value={division} onChange={(event) => { setDivision(event.target.value as MedicalTaxonomyDivision); onPrimaryChange(undefined) }}>
            {MEDICAL_TAXONOMY_DIVISIONS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </Select>
        </Field>
        {levels.map((level, depth) => (
          <Field key={`${division}-${depth}`} label={level.label}>
            <Select value={level.value} onChange={(event) => selectAtDepth(depth, event.target.value)}>
              <option value="">— Select —</option>
              {level.options.map((node) => <option key={node.id} value={node.id}>{nodeLabel(node)}</option>)}
            </Select>
          </Field>
        ))}
      </div>

      {primaryNodeId && (
        <div className="rounded-lg border border-accent-line bg-accent-tint/35 px-3 py-2">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-accent-strong"><Icon icon={Check} size={12} />Primary home</p>
          <p className="mt-1 text-[12px] leading-relaxed text-ink-2">{lineage.map((node) => node.title).join(' → ')}</p>
          <p className="mt-1 font-mono text-[10px] text-ink-3">{primaryNodeId}</p>
        </div>
      )}

      {onSecondaryChange && (
        <div>
          <Field label="Also appears in" hint="Search for additional valid placements across any library view.">
            <TextInput value={secondaryQuery} onChange={(event) => setSecondaryQuery(event.target.value)} placeholder="Search systems, disciplines, skills, or knowledge…" />
          </Field>
          {secondaryResults.length > 0 && (
            <div className="mt-1 max-h-44 overflow-y-auto rounded-lg border border-line bg-surface p-1 shadow-panel">
              {secondaryResults.map((node) => (
                <button key={node.id} type="button" className="flex w-full items-start gap-2 rounded-md px-2 py-2 text-start hover:bg-inset" onClick={() => { onSecondaryChange([...secondaryNodeIds, node.id]); setSecondaryQuery('') }}>
                  <Icon icon={Plus} size={13} className="mt-0.5 shrink-0 text-accent" />
                  <span className="min-w-0"><span className="block text-[12px] text-ink">{node.title}</span><span className="block truncate font-mono text-[9.5px] text-ink-3">{node.divisionLabel} · {node.id}</span></span>
                </button>
              ))}
            </div>
          )}
          {secondaryNodeIds.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {secondaryNodeIds.map((id) => {
                const node = index.byId.get(id)
                return <span key={id} className="inline-flex max-w-full items-center gap-1 rounded-full border border-line bg-surface-2 px-2 py-1 text-[10.5px] text-ink-2"><span className="truncate">{node?.title ?? id}</span><button type="button" className="text-ink-3 hover:text-danger" aria-label={`Remove ${node?.title ?? id}`} onClick={() => onSecondaryChange(secondaryNodeIds.filter((item) => item !== id))}><Icon icon={X} size={11} /></button></span>
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
