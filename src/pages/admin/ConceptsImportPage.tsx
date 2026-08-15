import { useState } from 'react'
import { ImportWizard } from '@/components/admin/ImportWizard'
import { Select } from '@/components/ui/Field'
import { usePersistentState } from '@/lib/usePersistentState'
import { CONCEPT_STORAGE_KEY, initialConceptGraph, type Concept, type ConceptGraph } from '@/data/conceptGraph'
import { CONCEPT_IMPORT_FIELDS, conceptFromRow, materialiseNewConcept, mergeConcept, resolvePlacement } from '@/data/conceptImport'
import { mapList } from '@/data/importSemantics'
import { useTaxonomyTree } from '@/data/taxonomyStore'
import { subjects } from '@/data/subjects'

const MD = `# Item
## label
Anion gap
## id
med.concept.anion-gap
## subject
renal
## topic
Acid–base balance
## subtopic
Metabolic acidosis
## primary_node_id
SYS-REN-T02
## secondary_node_ids
DIS-PHY | KNW-DIA
## definition
The calculated difference between measured serum cations and anions.
## explicit_objective
Calculate the anion gap and state what a raised gap implies.
## pitfalls
Forgetting to calculate it in every metabolic acidosis.
## concept_type
definition
## aliases
AG
## status
active
## article_ids
ART-REN-ACID-BASE
## blueprint_weight
0.6
## clinical_relevance
0.7
## academic_relevance
0.8
## weight_confidence
0.5
## exam_weight_by_year
HU_Y2=0.6 | HU_Y3=0.4
## atomic_claim_ids
claim-anion-gap-1
## support_mode
direct_statement
## confidence
0.9
## owner
Dr Omar
## reviewer
Dr Omar
## publication_status
needs_evidence
## field_notes
arabicLabel: awaiting reviewed Arabic terminology`

export function ConceptsImportPage() {
  const [graph, setGraph] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, initialConceptGraph)
  const [taxonomy] = useTaxonomyTree()
  const [mergeMode, setMergeMode] = useState<'create' | 'update'>('update')

  /**
   * Keep the article↔concept link reciprocal.
   *
   * A concept that names an article must appear in that article's related list,
   * and the reverse. The old importer forced `articleIds: []`, which broke the
   * pairing on every row it touched.
   */
  function withReciprocalArticles(concept: Concept): Concept {
    const owned = concept.articleIds ?? []
    const related = concept.relatedArticleIds ?? []
    // Through `mapList`, so a `+` on related_article_ids keeps its append intent
    // across the union — a bare array literal here would quietly downgrade it to
    // a replace and wipe the neighbours the row never mentioned.
    const merged = mapList(related, (ids) => [...ids, ...owned.filter((id) => !ids.includes(id))]) ?? related
    return merged.length === related.length ? concept : { ...concept, relatedArticleIds: merged }
  }

  function commit(rows: Array<Record<string, string>>) {
    const errors: string[] = []
    const byId = new Map(graph.concepts.map((concept) => [concept.id, concept]))
    const additions: Concept[] = []
    const updates = new Map<string, Concept>()

    rows.forEach((values, index) => {
      const row = index + 2
      const label = values.label?.trim()
      if (!label) { errors.push(`Row ${row}: missing concept name.`); return }
      const incoming = withReciprocalArticles(conceptFromRow(values, resolvePlacement(values.subject?.trim() ?? '', values, taxonomy)))
      const existing = byId.get(incoming.id) ?? updates.get(incoming.id)

      if (existing) {
        if (mergeMode === 'create') { errors.push(`Row ${row}: ${incoming.id} already exists and create-only mode is on.`); return }
        updates.set(incoming.id, mergeConcept(existing, incoming))
        return
      }
      if (additions.some((concept) => concept.id === incoming.id)) {
        errors.push(`Row ${row}: duplicate id ${incoming.id} within this file.`)
        return
      }
      additions.push(materialiseNewConcept(incoming))
    })

    if (additions.length || updates.size) {
      setGraph((current) => ({
        ...current,
        concepts: [...additions, ...current.concepts.map((concept) => updates.get(concept.id) ?? concept)],
      }))
    }
    const changed = additions.length + updates.size
    return {
      imported: changed,
      failed: errors.length,
      errors: [...errors, `Created ${additions.length} · updated ${updates.size}`],
    }
  }

  return (
    <ImportWizard
      title="Bulk import concepts"
      description="Open a spreadsheet, CSV, or Markdown file; map every column, preview each row, then commit. An existing canonical ID is updated in place — a blank column leaves that field alone, a leading + adds to a list, and [clear] empties it."
      noun="concepts"
      fields={CONCEPT_IMPORT_FIELDS}
      markdownExample={MD}
      aliases={{ name: 'label', concept: 'label', system: 'subject', subject_id: 'subject', objective: 'explicit_objective', canonical_id: 'id' }}
      previewSecondary={{ header: 'System', get: (v) => v.subject || (subjects.find((s) => s.id === v.subject)?.name ?? '—') }}
      validateRow={(v) => {
        const errors = v.label?.trim() ? [] : ['Concept name is required']
        const status = v.status?.trim()
        if (status && !['active', 'inactive', 'under review'].includes(status)) errors.push('Status must be active, inactive, or under review')
        return errors
      }}
      contextControl={
        <label className="mt-4 block rounded-lg border border-line p-3">
          <span className="mb-1.5 block text-[12.5px] font-medium text-ink-2">Existing canonical IDs</span>
          <Select value={mergeMode} onChange={(event) => setMergeMode(event.target.value as 'create' | 'update')}>
            <option value="update">Update matching concepts in place</option>
            <option value="create">Create only; reject matches</option>
          </Select>
          <span className="mt-1.5 block text-[11px] leading-relaxed text-ink-3">
            Updating keeps every field this file does not mention. Start a cell with <code>+</code> to add to a list without re-typing it, or write <code>[clear]</code> to empty one on purpose.
          </span>
        </label>
      }
      commit={commit}
      backTo="/admin/concepts"
      backLabel="Back to concepts"
    />
  )
}
