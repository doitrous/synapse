import { useMemo, useState } from 'react'
import { ImportWizard } from '@/components/admin/ImportWizard'
import { Select } from '@/components/ui/Field'
import { usePersistentState } from '@/lib/usePersistentState'
import {
  MEDICAL_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore, type MedicalEvidenceStore,
} from '@/data/medicalEvidence'
import {
  EVIDENCE_IMPORT_FIELDS, EVIDENCE_RECORD_LABEL, evidenceErrors, reconcileClaimEvidence,
  resourceFromRow, claimFromRow, citationFromRow, spanFromRow,
  type EvidenceContext, type EvidenceRecordKind,
} from '@/data/evidenceImport'
import { CONCEPT_STORAGE_KEY, initialConceptGraph, type ConceptGraph } from '@/data/conceptGraph'
import { useAdminArticleIndex } from '@/lib/content/adminContentClient'

const EXAMPLES: Record<EvidenceRecordKind, string> = {
  resource: `# Item
## id
RES-WEB-NCBI-CELLBIO-MEMBRANE
## title
Molecular Biology of the Cell, 4th edition — The Lipid Bilayer
## institution
NCBI Bookshelf
## source_uri
https://www.ncbi.nlm.nih.gov/books/NBK26871/
## media_type
text/html
## languages
en
## publication_date
2002-01-01
## accessed_at
2026-08-12
## processing_status
authoritative_article_level_reference
## rights
Freely available for reading on NCBI Bookshelf
## qualification
Standard reference textbook in cell biology
## confidence
0.95`,
  claim: `# Item
## id
CLM-FND-PLASMA-MEMBRANE-01
## concept_id
med.concept.plasma-membrane
## subject
The plasma membrane
## predicate
is
## object
a lipid bilayer separating the cytosol from the extracellular fluid
## display_text
The plasma membrane is a lipid bilayer that separates the cytosol from the extracellular fluid.
## risk_class
foundational_stable
## verification_status
needs_evidence
## confidence
0.95
## freshness
stable_foundational_fact
## time_sensitive
no
## qualifiers
polarity: affirmative`,
  citation: `# Item
## id
CIT-FND-PLASMA-MEMBRANE-01-LOCAL
## claim_id
CLM-FND-PLASMA-MEMBRANE-01
## resource_id
src_6b5723c9bc02068ded20
## evidence_role
local_curriculum
## support_span
The cell membrane is a lipid bilayer that separates the cell interior from its surroundings.
## locator_type
page
## locator_page
2
## confidence
0.9
## counts_as_claim_evidence
yes`,
  span: `# Item
## id
SPN-FND-MEMBRANE-01
## article_id
ART-FND-PLASMA-MEMBRANE
## section_id
definition
## text
The plasma membrane is a lipid bilayer that separates the cytosol from the extracellular fluid.
## claim_ids
CLM-FND-PLASMA-MEMBRANE-01
## citation_ids
CIT-FND-PLASMA-MEMBRANE-01-LOCAL`,
}

/**
 * The missing surface.
 *
 * Claims, citations, sources and article spans could previously only be created
 * by the generation pipeline, which meant an authored concept could never leave
 * `needs_evidence` — there was nowhere to record the source supporting it.
 */
export function EvidenceImportPage() {
  const [store, setStore] = usePersistentState<MedicalEvidenceStore>(MEDICAL_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore)
  const [graph] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, initialConceptGraph)
  const { articles } = useAdminArticleIndex()
  const [kind, setKind] = useState<EvidenceRecordKind>('claim')

  const context = useMemo<EvidenceContext>(() => ({
    store,
    conceptIds: new Set(graph.concepts.map((concept) => concept.id)),
    articleIds: new Set(articles.map((article) => article.id)),
  }), [graph, articles, store])

  function commit(rows: Array<Record<string, string>>) {
    const errors: string[] = []
    // A file may carry claims and the citations that support them together, so
    // references are resolved against the whole file, not row by row.
    const ids = new Set(rows.map((row) => row.id?.trim()).filter(Boolean))
    // Claims already in the store count too: a citations-first import followed by
    // its claims must see the support that already landed.
    const counting = [...store.citations, ...(kind === 'citation' ? rows.map(citationFromRow) : [])]
      .filter((citation) => citation.countsAsClaimEvidence)
    const evidenceCountByClaim = new Map<string, number>()
    for (const citation of counting) evidenceCountByClaim.set(citation.claimId, (evidenceCountByClaim.get(citation.claimId) ?? 0) + 1)
    const incoming = {
      claims: ids, resources: ids, citations: ids,
      claimsWithEvidence: new Set(evidenceCountByClaim.keys()),
      evidenceCountByClaim,
    }
    const rowContext = { ...context, incoming }

    const accepted: Array<Record<string, string>> = []
    rows.forEach((values, index) => {
      const rowErrors = evidenceErrors(kind, values, rowContext)
      if (rowErrors.length) errors.push(`Row ${index + 2}: ${rowErrors.join('; ')}`)
      else accepted.push(values)
    })
    if (!accepted.length) return { imported: 0, failed: errors.length, errors }

    setStore((current) => {
      const upsert = <T extends { id: string }>(existing: T[], incomingRecords: T[]) => {
        const byId = new Map(existing.map((record) => [record.id, record]))
        for (const record of incomingRecords) byId.set(record.id, { ...byId.get(record.id), ...record })
        return [...byId.values()]
      }
      if (kind === 'resource') return { ...current, resources: upsert(current.resources, accepted.map(resourceFromRow)) }
      if (kind === 'citation') {
        const citations = upsert(current.citations, accepted.map(citationFromRow))
        return { ...current, citations, claims: reconcileClaimEvidence(current.claims, citations) }
      }
      if (kind === 'span') return { ...current, articleSpans: upsert(current.articleSpans, accepted.map(spanFromRow)) }
      const claims = upsert(current.claims, accepted.map(claimFromRow))
      return { ...current, claims: reconcileClaimEvidence(claims, current.citations) }
    })

    return {
      imported: accepted.length,
      failed: errors.length,
      errors: [...errors, `Imported ${accepted.length} ${EVIDENCE_RECORD_LABEL[kind].toLowerCase()}`],
    }
  }

  return (
    <ImportWizard
      key={kind}
      title={`Bulk import evidence · ${EVIDENCE_RECORD_LABEL[kind]}`}
      description="Sources, claims, citations and article spans. Every reference is checked before anything is written: a citation that counts as evidence must carry an exact locator, and a claim may only be verified when a citation that counts actually resolves."
      noun={EVIDENCE_RECORD_LABEL[kind].toLowerCase()}
      fields={EVIDENCE_IMPORT_FIELDS[kind]}
      markdownExample={EXAMPLES[kind]}
      previewSecondary={{ header: 'Detail', get: (v) => v.display_text || v.support_span || v.title || v.text || '—' }}
      validateRow={(values) => evidenceErrors(kind, values, context)}
      contextControl={
        <label className="mt-4 block rounded-lg border border-line p-3">
          <span className="mb-1.5 block text-[12.5px] font-medium text-ink-2">Record type</span>
          <Select value={kind} onChange={(event) => setKind(event.target.value as EvidenceRecordKind)}>
            {(Object.keys(EVIDENCE_RECORD_LABEL) as EvidenceRecordKind[]).map((value) => (
              <option key={value} value={value}>{EVIDENCE_RECORD_LABEL[value]}</option>
            ))}
          </Select>
          <span className="mt-1.5 block text-[11px] leading-relaxed text-ink-3">
            Import sources first, then claims, then the citations that link them. An existing ID is updated in place.
          </span>
        </label>
      }
      commit={commit}
      backTo="/admin/library"
      backLabel="Back to Library Setup"
    />
  )
}
