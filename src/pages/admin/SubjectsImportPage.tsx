import { useState } from 'react'
import { ImportWizard } from '@/components/admin/ImportWizard'
import { Badge } from '@/components/ui/Badge'
import { usePersistentState } from '@/lib/usePersistentState'
import {
  useTaxonomyTree, systemId, topicIdOf, subtopicIdOf, microtopicIdOf, nanotopicIdOf,
  type TaxSysNode,
} from '@/data/taxonomyStore'
import {
  SUBJECTS_IMPORT_FIELDS, applyRow, indexTree, duplicateLabelsIn, referencesTo,
  type StructuralChange,
} from '@/data/subjectsImport'
import { CONTENT_LEDGER_STORAGE_KEY, initialManagedContent, type ManagedContentItem } from '@/data/contentControl'
import { CONCEPT_STORAGE_KEY, initialConceptGraph, type ConceptGraph } from '@/data/conceptGraph'

const MD = `# Item
## system
Immunology
## system_short
IMM
## system_color
#4a6fa5
## topic
Hypersensitivity
## subtopic
Type I hypersensitivity
## microtopic
Mast cell degranulation
## nanotopic
IgE cross-linking

---

# Item
## system_id
cvs
## system
Cardiovascular
## topic_id
cvs-cardiac-anatomy
## topic
Cardiac anatomy and imaging`

/** One line describing a structural change, for the report an admin reads. */
function describe(change: StructuralChange): string {
  if (change.action === 'create') return `Create ${change.level} “${change.to}” (${change.nodeId})`
  if (change.action === 'rename') return `Rename ${change.level} ${change.nodeId}: “${change.from}” → “${change.to}”`
  if (change.action === 'move') return `Move ${change.level} ${change.nodeId} from ${change.from} to ${change.newParentId}`
  return `Update ${change.level} ${change.nodeId}`
}

export function SubjectsImportPage() {
  const [tree, setTree] = useTaxonomyTree()
  const [ledger] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  const [graph] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, initialConceptGraph)
  const [impact, setImpact] = useState<string[]>([])

  function commit(rows: Array<Record<string, string>>) {
    const draft: TaxSysNode[] = structuredClone(tree)
    const context = { tree: draft, taken: new Set(indexTree(draft).keys()), changes: [] as StructuralChange[], errors: [] as string[] }
    const ids = { systemId, topicId: topicIdOf, subtopicId: subtopicIdOf, microtopicId: microtopicIdOf, nanotopicId: nanotopicIdOf }

    rows.forEach((values, index) => applyRow(values, context, ids, index + 2))

    // "One label, one home" is the rule the authoring validator enforces. Catch a
    // breach here, before it is written, rather than in CI afterwards.
    const duplicates = duplicateLabelsIn(draft)
    if (duplicates.length) {
      return {
        imported: 0,
        failed: duplicates.length,
        errors: duplicates.map((entry) => `“${entry.label}” would be declared in ${entry.paths.length} places: ${entry.paths.join(' · ')}. Nothing was imported.`),
      }
    }

    // Renames and moves are the changes that can strand a reference, so the
    // affected records are named before the write, not discovered after it.
    const disruptive = context.changes.filter((change) => change.action === 'rename' || change.action === 'move')
    const affected = referencesTo(
      disruptive.map((change) => change.nodeId),
      {
        articles: ledger.filter((item) => item.kind === 'article').map((item) => ({ id: item.id, ...item.articleData })),
        concepts: graph.concepts,
      },
    )

    setTree(draft)
    setImpact([
      ...context.changes.map(describe),
      ...affected.map((entry) => `${entry.recordIds.length} ${entry.kind}${entry.recordIds.length === 1 ? '' : 's'} reference ${entry.nodeId}: ${entry.recordIds.slice(0, 6).join(', ')}${entry.recordIds.length > 6 ? '…' : ''}`),
    ])

    const created = context.changes.filter((change) => change.action === 'create').length
    const renamed = context.changes.filter((change) => change.action === 'rename').length
    const moved = context.changes.filter((change) => change.action === 'move').length
    return {
      imported: context.changes.length,
      failed: context.errors.length,
      errors: [
        ...context.errors,
        `Created ${created} · renamed ${renamed} · moved ${moved}`,
        ...(affected.length ? [`${affected.length} node reference group${affected.length === 1 ? '' : 's'} affected — see the impact report below.`] : []),
      ],
    }
  }

  return (
    <>
      <ImportWizard
        title="Bulk import Subjects & Topics"
        description="Open a spreadsheet, CSV, or Markdown file; map every column, preview each row, then merge into the single-source taxonomy. Give a node ID to update or rename that exact node; omit it to match by name or create a new one."
        noun="taxonomy nodes"
        fields={SUBJECTS_IMPORT_FIELDS}
        markdownExample={MD}
        aliases={{ subject: 'system', subject_id: 'system_id', short: 'system_short', color: 'system_color', sys_id: 'system_id', tpc_id: 'topic_id', sub_id: 'subtopic_id' }}
        previewSecondary={{ header: 'Path', get: (v) => [v.system, v.topic, v.subtopic, v.microtopic, v.nanotopic].filter(Boolean).join(' › ') || '—' }}
        validateRow={(v) => {
          const errors = v.system?.trim() ? [] : ['System is required']
          if (v.system_color?.trim() && !/^#[0-9a-f]{3,8}$/i.test(v.system_color.trim())) errors.push('System colour must be a hex value such as #b4442f')
          if (v.topic_id?.trim() && !v.topic?.trim() && !v.subtopic?.trim()) errors.push('A topic ID with no topic name and no child does nothing')
          return errors
        }}
        commit={commit}
        backTo="/admin/taxonomy"
        backLabel="Back to Subjects & Topics"
      />
      {impact.length > 0 && (
        <div className="mx-auto max-w-[78rem] px-5 pb-10 sm:px-8">
          <div className="rounded-xl border border-line bg-surface p-4 shadow-panel">
            <div className="flex items-center gap-2">
              <h2 className="text-[13px] font-semibold text-ink">Impact report</h2>
              <Badge tone="neutral">{impact.length}</Badge>
            </div>
            <ul className="mt-2 space-y-1">
              {impact.map((line) => <li key={line} className="text-[12px] leading-relaxed text-ink-2">{line}</li>)}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
