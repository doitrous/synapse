import { useState } from 'react'
import { ImportWizard } from '@/components/admin/ImportWizard'
import { Select } from '@/components/ui/Field'
import { API_MODE } from '@/lib/api'
import { usePersistentState, preloadState } from '@/lib/usePersistentState'
import { CONCEPT_STORAGE_KEY, initialConceptGraph, type ConceptGraph, type ConceptRelation } from '@/data/conceptGraph'
import { RELATION_IMPORT_FIELDS, relationFromRow, relationErrors, isDuplicateRelation } from '@/data/conceptImport'
import { MEDICAL_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore, type MedicalEvidenceStore } from '@/data/medicalEvidence'

const MD = `# Item
## source
med.concept.cardiac-output
## type
prerequisite_of
## target
med.concept.ejection-fraction
## evidence_claim_ids
claim-co-1
## citation_ids
cite-co-1
## verification_status
verified
## confidence
0.9
## reviewer
Dr Omar
## reviewed_at
2026-08-12

---

# Item
## source
med.concept.stable-angina
## type
often_confused_with
## target
med.concept.unstable-angina
## verification_status
needs_evidence
## qualifiers
why: both present as exertional chest pain`

export function RelationsImportPage() {
  // Deferred: the 72 MB graph and 37.5 MB evidence store are needed only to
  // validate and upsert edges, not to paint the wizard. Both download in the
  // background once a file is chosen (`onBegin`); the write still diffs against
  // the full loaded graph, so the delta is per-item safe, never a slice.
  const [graph, setGraph, graphStatus] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, initialConceptGraph, { defer: true })
  const [evidence, , evidenceStatus] = usePersistentState<MedicalEvidenceStore>(MEDICAL_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore, { defer: true })
  const [mergeMode, setMergeMode] = useState<'create' | 'update'>('update')
  const ready = !API_MODE || (graphStatus.hydrated && evidenceStatus.hydrated)

  function commit(rows: Array<Record<string, string>>) {
    // Disabled until both stores load; last guard so a commit never validates or
    // dedupes against the empty seed.
    if (!ready) {
      return { imported: 0, failed: rows.length, errors: ['The concept graph and evidence store are still loading — wait a moment, then import again.'] }
    }
    const errors: string[] = []
    const byId = new Map(graph.relations.map((relation) => [relation.id, relation]))
    const additions: ConceptRelation[] = []
    const updates = new Map<string, ConceptRelation>()

    rows.forEach((values, index) => {
      const row = index + 2
      const incoming = relationFromRow(values)
      const rowErrors = relationErrors(incoming, graph, evidence)
      if (rowErrors.length) { errors.push(`Row ${row}: ${rowErrors.join('; ')}`); return }

      const existing = byId.get(incoming.id) ?? updates.get(incoming.id)
      if (existing) {
        if (mergeMode === 'create') { errors.push(`Row ${row}: ${incoming.id} already exists and create-only mode is on.`); return }
        updates.set(incoming.id, { ...existing, ...incoming })
        return
      }
      // A second edge with the same direction, type and endpoints is graph noise
      // even under a different ID, so it is refused rather than merged silently.
      if (isDuplicateRelation(incoming, [...graph.relations, ...additions])) {
        errors.push(`Row ${row}: ${incoming.sourceId} —${incoming.type}→ ${incoming.targetId} already exists.`)
        return
      }
      additions.push(incoming)
    })

    if (additions.length || updates.size) {
      setGraph((current) => ({
        ...current,
        relations: [...additions, ...current.relations.map((relation) => updates.get(relation.id) ?? relation)],
      }))
    }
    return {
      imported: additions.length + updates.size,
      failed: errors.length,
      errors: [...errors, `Created ${additions.length} · updated ${updates.size}`],
    }
  }

  return (
    <ImportWizard
      title="Bulk import concept relationships"
      description="Typed, directed edges between concepts. Both endpoints, the relation type, and every named claim and citation are checked before anything is written, so a broken edge never reaches the graph."
      noun="relationships"
      fields={RELATION_IMPORT_FIELDS}
      markdownExample={MD}
      aliases={{ from: 'source', to: 'target', relation: 'type', relation_type: 'type', source_id: 'source', target_id: 'target' }}
      previewSecondary={{ header: 'Edge', get: (v) => `${v.source ?? '?'} —${v.type ?? '?'}→ ${v.target ?? '?'}` }}
      validateRow={(v) => relationErrors(relationFromRow(v), graph, evidence)}
      contextControl={
        <label className="mt-4 block rounded-lg border border-line p-3">
          <span className="mb-1.5 block text-[12.5px] font-medium text-ink-2">Existing relationship IDs</span>
          <Select value={mergeMode} onChange={(event) => setMergeMode(event.target.value as 'create' | 'update')}>
            <option value="update">Update matching relationships</option>
            <option value="create">Create only; reject matches</option>
          </Select>
          <span className="mt-1.5 block text-[11px] leading-relaxed text-ink-3">
            An omitted ID is derived from source, type and target, so re-importing the same file changes nothing.
          </span>
        </label>
      }
      commit={commit}
      onBegin={() => {
        preloadState(CONCEPT_STORAGE_KEY, initialConceptGraph)
        preloadState(MEDICAL_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore)
      }}
      ready={ready}
      backTo="/admin/relationships"
      backLabel="Back to relationships"
    />
  )
}
