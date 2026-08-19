import { useEffect, useMemo, useState } from 'react'
import { Check } from 'lucide-react'
import { Field, Select } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { EntityPicker } from '@/components/admin/EntityPicker'
import { taxonomyNodeOptions } from '@/components/admin/pickerOptions'
import {
  MEDICAL_TAXONOMY_DIVISIONS,
  indexMedicalTaxonomy,
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

  // The primary home is not a secondary placement, so it never offers itself.
  const secondaryOptions = useMemo(
    () => taxonomyNodeOptions(nodes).filter((option) => option.id !== primaryNodeId),
    [nodes, primaryNodeId],
  )

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
        <div className="rounded-lg border border-primary-line bg-primary-tint/35 px-3 py-2">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-primary-strong"><Icon icon={Check} size={12} />Primary home</p>
          <p className="mt-1 text-[12px] leading-relaxed text-ink-2">{lineage.map((node) => node.title).join(' → ')}</p>
          <p className="mt-1 font-mono text-[10px] text-ink-3">{primaryNodeId}</p>
        </div>
      )}

      {onSecondaryChange && (
        <EntityPicker
          label="Also appears in"
          hint="Additional valid placements, across any library view."
          noun="placements"
          options={secondaryOptions}
          selected={secondaryNodeIds}
          onChange={onSecondaryChange}
          placeholder="Search systems, disciplines, skills, or knowledge…"
        />
      )}
    </div>
  )
}
