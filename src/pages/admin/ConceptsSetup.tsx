import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Braces, BookOpenText, Plus, Save, Trash2, Check, Upload, TriangleAlert, ExternalLink, FileText, Database } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { ConceptNavigator } from '@/components/admin/ConceptNavigator'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Field, Select, TextInput, Textarea } from '@/components/ui/Field'
import { DateField } from '@/components/ui/DateTimeField'
import { cn } from '@/lib/cn'
import { usePersistentState } from '@/lib/usePersistentState'
import {
  CONCEPT_STORAGE_KEY,
  initialConceptGraph,
  type Concept,
  type ConceptGraph,
} from '@/data/conceptGraph'
import { libraryTopics } from '@/data/library'
import { useTaxonomyTree, type TaxSysNode } from '@/data/taxonomyStore'
import { TaxonomyPlacementPicker, type TaxonomyPlacement } from '@/components/admin/TaxonomyPlacementPicker'
import { MedicalTaxonomyPlacementPicker } from '@/components/admin/MedicalTaxonomyPlacementPicker'
import { useMedicalTaxonomy } from '@/data/medicalTaxonomyStore'
import { universities } from '@/data/universities'
import { MEDICAL_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore, type CitationLink, type EvidenceLocator, type MedicalEvidenceStore, type ResourceRecord } from '@/data/medicalEvidence'
import { apiOpenFile } from '@/lib/api'

const slug = (value: string) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'concept'

/* A faithful preview of how the concept surfaces in a question after reveal. */
function AfterRevealPreview({ concept }: { concept: Concept }) {
  return (
    <div className="rounded-xl border border-line bg-surface-2/50 p-4">
      <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">
        <Icon icon={Check} size={12} className="text-success" />
        Shown in the question after the answer is revealed
      </p>
      <p className="text-[14px] leading-relaxed text-ink">
        …supports a diagnosis of{' '}
        <span className="rounded-sm border-b border-dotted border-accent-strong font-semibold text-accent-strong">{concept.label.toLowerCase()}</span>?
      </p>
      <div className="mt-3 w-[min(20rem,100%)] rounded-xl border border-line bg-surface p-3.5 shadow-panel">
        <div className="flex items-start gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-tint text-accent-strong"><Icon icon={BookOpenText} size={15} /></span>
          <div className="min-w-0 flex-1">
            <p className="text-[13.5px] font-bold text-ink">{concept.label}</p>
            <p className="font-mono text-[10px] text-ink-3">{concept.id}</p>
          </div>
        </div>
        <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink-2">
          {concept.definition || 'Definition awaiting editorial review.'}
        </p>
      </div>
    </div>
  )
}

function sourceLocatorLabel(locator: EvidenceLocator | string): string {
  if (typeof locator === 'string') return locator || 'Source location recorded'
  return [
    locator.page != null ? `Page ${locator.page}` : '',
    locator.printed_page != null ? `Printed page ${locator.printed_page}` : '',
    locator.section ? `Section ${locator.section}` : '',
    locator.line ? `Line ${locator.line}` : '',
    locator.timestamp ? `Time ${locator.timestamp}` : '',
  ].filter(Boolean).join(' · ') || locator.type || 'Source location recorded'
}

function sourcePageFragment(locator?: EvidenceLocator | string): string {
  if (!locator || typeof locator === 'string' || locator.page == null) return ''
  return `#page=${locator.page}`
}

/** The concept's evidence ledger: real source titles, exact locators and one-click access. */
function ConceptSources({ concept, evidence }: { concept: Concept; evidence: MedicalEvidenceStore }) {
  const [openError, setOpenError] = useState<string | null>(null)
  const claimIds = new Set([
    ...(concept.atomicClaimIds ?? []),
    ...evidence.claims.filter((claim) => claim.conceptId === concept.id).map((claim) => claim.id),
  ])
  const citations = evidence.citations.filter((citation) => claimIds.has(citation.claimId))
  const resourceIds = [...new Set([...(concept.resourceIds ?? []), ...citations.map((citation) => citation.resourceId)])]
  const resources = resourceIds.map((resourceId) => evidence.resources.find((resource) => resource.id === resourceId) ?? {
    id: resourceId,
    title: resourceId,
    institution: 'Source record unavailable',
    languages: [],
    processingStatus: 'missing_record',
    confidence: 0,
  } satisfies ResourceRecord)

  async function openResource(resource: ResourceRecord, resourceCitations: CitationLink[]) {
    setOpenError(null)
    const fragment = sourcePageFragment(resourceCitations[0]?.locator)
    if (resource.sourceUri && /^https?:\/\//i.test(resource.sourceUri)) {
      window.open(`${resource.sourceUri}${fragment}`, '_blank', 'noopener,noreferrer')
      return
    }
    try {
      await apiOpenFile(`/medical-resources/${encodeURIComponent(resource.id)}`, fragment)
    } catch {
      setOpenError(resource.id)
    }
  }

  return (
    <section className="overflow-hidden rounded-lg border border-line bg-surface" aria-labelledby={`concept-sources-${concept.id}`}>
      <div className="flex items-start gap-2.5 border-b border-line bg-surface-2/50 px-3.5 py-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-tint text-accent-strong"><Icon icon={Database} size={15} /></span>
        <div className="min-w-0 flex-1">
          <p id={`concept-sources-${concept.id}`} className="text-[12px] font-bold uppercase tracking-[0.06em] text-ink">Sources that teach this concept</p>
          <p className="mt-0.5 text-[11px] leading-relaxed text-ink-3">Every source is preserved with its supporting passage and exact location when available.</p>
        </div>
        <span className="tnum rounded-full border border-line bg-surface px-2 py-0.5 font-mono text-[10px] font-semibold text-ink-2">{resources.length}</span>
      </div>

      {resources.length === 0 ? (
        <div className="px-3.5 py-4">
          <p className="text-[12px] font-medium text-warning">No source is linked yet.</p>
          <p className="mt-1 text-[11px] leading-relaxed text-ink-3">Keep this concept under review until a qualified source and locator are attached.</p>
        </div>
      ) : (
        <div className="divide-y divide-line">
          {resources.map((resource) => {
            const resourceCitations = citations.filter((citation) => citation.resourceId === resource.id)
            const exactCitations = resourceCitations.filter((citation) => citation.countsAsClaimEvidence)
            return (
              <article key={resource.id} className="p-3.5">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md bg-inset text-ink-3"><Icon icon={FileText} size={13} /></span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] font-semibold leading-snug text-ink">{resource.title}</p>
                    <p className="mt-0.5 text-[10.5px] text-ink-3">{resource.institution} · {resource.mediaType?.toUpperCase() || 'SOURCE'}</p>
                  </div>
                </div>

                <div className="mt-2.5 space-y-2">
                  {resourceCitations.length > 0 ? resourceCitations.map((citation) => (
                    <div key={citation.id} className="rounded-md border-s-2 border-accent-line bg-surface-2/45 px-2.5 py-2">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-mono text-[10px] font-semibold text-accent-strong">{sourceLocatorLabel(citation.locator)}</span>
                        <span className={cn('text-[9.5px] font-semibold uppercase tracking-[0.04em]', citation.countsAsClaimEvidence ? 'text-success' : 'text-ink-3')}>
                          {citation.countsAsClaimEvidence ? 'Exact evidence' : 'Context'}
                        </span>
                      </div>
                      {citation.supportSpan && <p className="mt-1 text-[11.5px] leading-relaxed text-ink-2">{citation.supportSpan}</p>}
                    </div>
                  )) : (
                    <p className="rounded-md bg-warning-tint px-2.5 py-2 text-[11px] leading-relaxed text-warning">Linked at concept level; an exact supporting location is still required.</p>
                  )}
                </div>

                <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] text-ink-3">{exactCitations.length} exact citation{exactCitations.length === 1 ? '' : 's'} · {resource.id}</span>
                  <Button size="sm" variant="secondary" iconLeft={ExternalLink} onClick={() => void openResource(resource, resourceCitations)}>Go to source</Button>
                </div>
                {openError === resource.id && (
                  <p role="alert" className="mt-2 rounded-md border border-warning/25 bg-warning-tint px-2.5 py-2 text-[10.5px] leading-relaxed text-warning">The citation is preserved, but this file is still awaiting secure upload to Synapse storage.</p>
                )}
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}


function ConceptAdvancedFields({ value, onPatch }: { value: Partial<Concept>; onPatch: (next: Partial<Concept>) => void }) {
  const list = (text: string) => text.split(/[\n,]/).map((item) => item.trim()).filter(Boolean)
  const numbers = (text: string) => list(text).map(Number).filter((number) => Number.isFinite(number))
  const fieldNotesText = (notes?: Record<string, string>) => Object.entries(notes ?? {}).map(([field, reason]) => `${field}: ${reason}`).join('\n')
  const fieldNotes = (text: string) => Object.fromEntries(text.split('\n').map((line) => {
    const separator = line.indexOf(':')
    return separator < 1 ? null : [line.slice(0, separator).trim(), line.slice(separator + 1).trim()]
  }).filter((entry): entry is [string, string] => Boolean(entry?.[0] && entry?.[1])))
  return (
    <details className="rounded-lg border border-line bg-surface-2/40 p-3">
      <summary className="cursor-pointer text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">Evidence, audience & governance fields</summary>
      <div className="mt-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Canonical key"><TextInput value={value.canonicalKey ?? ''} onChange={(event) => onPatch({ canonicalKey: event.target.value })} placeholder="entity.relation.qualifier" /></Field>
          <Field label="Concept type"><TextInput value={value.conceptType ?? ''} onChange={(event) => onPatch({ conceptType: event.target.value })} placeholder="mechanism, structure…" /></Field>
          <Field label="Arabic label"><TextInput dir="rtl" value={value.arabicLabel ?? ''} onChange={(event) => onPatch({ arabicLabel: event.target.value })} /></Field>
          <Field label="Arabic aliases" hint="Comma-separated"><TextInput dir="rtl" value={(value.arabicAliases ?? []).join(', ')} onChange={(event) => onPatch({ arabicAliases: list(event.target.value) })} /></Field>
          <Field label="Learner years" hint="e.g. 1, 2, 3"><TextInput value={(value.learnerYears ?? []).join(', ')} onChange={(event) => onPatch({ learnerYears: numbers(event.target.value) })} /></Field>
          <Field label="Module IDs" hint="Leave empty until verified"><TextInput value={(value.moduleIds ?? []).join(', ')} onChange={(event) => onPatch({ moduleIds: list(event.target.value) })} /></Field>
          <Field label="Evidence confidence (0–1)"><TextInput type="number" min={0} max={1} step={0.01} value={value.confidence ?? 0} onChange={(event) => onPatch({ confidence: Math.min(1, Math.max(0, Number(event.target.value) || 0)) })} /></Field>
          <Field label="Weight confidence (0–1)"><TextInput type="number" min={0} max={1} step={0.01} value={value.weightConfidence ?? 0} onChange={(event) => onPatch({ weightConfidence: Math.min(1, Math.max(0, Number(event.target.value) || 0)) })} /></Field>
        </div>
        <Field label="Universities">
          <div className="grid max-h-44 grid-cols-2 gap-1 overflow-y-auto rounded-lg border border-line bg-surface p-2">
            {universities.map((university) => <label key={university.id} className="flex items-center gap-2 rounded px-1.5 py-1 text-[11.5px] text-ink-2 hover:bg-inset"><input type="checkbox" className="accent-[var(--color-accent)]" checked={(value.universityIds ?? []).includes(university.id)} onChange={() => onPatch({ universityIds: (value.universityIds ?? []).includes(university.id) ? (value.universityIds ?? []).filter((id) => id !== university.id) : [...(value.universityIds ?? []), university.id] })} />{university.short}</label>)}
          </div>
        </Field>
        <Field label="Explicit learning objective"><Textarea value={value.explicitObjective ?? ''} onChange={(event) => onPatch({ explicitObjective: event.target.value })} className="min-h-16" /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Support mode"><TextInput value={value.supportMode ?? ''} onChange={(event) => onPatch({ supportMode: event.target.value })} /></Field>
          <Field label="Publication status"><TextInput value={value.publicationStatus ?? ''} onChange={(event) => onPatch({ publicationStatus: event.target.value })} /></Field>
          <Field label="Owner"><TextInput value={value.owner ?? ''} onChange={(event) => onPatch({ owner: event.target.value })} /></Field>
          <Field label="Reviewer"><TextInput value={value.reviewer ?? ''} onChange={(event) => onPatch({ reviewer: event.target.value })} /></Field>
          <Field label="Final publisher"><TextInput value={value.finalPublisher ?? ''} onChange={(event) => onPatch({ finalPublisher: event.target.value })} /></Field>
          <Field label="Last reviewed"><DateField value={value.lastReviewed ?? ''} onChange={(next) => onPatch({ lastReviewed: next })} /></Field>
          <Field label="Review due"><DateField value={value.reviewDue ?? ''} onChange={(next) => onPatch({ reviewDue: next })} /></Field>
        </div>
        <Field label="Atomic claim IDs" hint="One per line"><Textarea value={(value.atomicClaimIds ?? []).join('\n')} onChange={(event) => onPatch({ atomicClaimIds: list(event.target.value) })} className="min-h-16 font-mono text-[11px]" /></Field>
        <Field label="Related article IDs" hint="One per line"><Textarea value={(value.relatedArticleIds ?? value.articleIds ?? []).join('\n')} onChange={(event) => onPatch({ relatedArticleIds: list(event.target.value), articleIds: list(event.target.value) })} className="min-h-16 font-mono text-[11px]" /></Field>
        <Field label="Related concept IDs" hint="Typed links remain in Relationships"><Textarea value={(value.relatedConceptIds ?? []).join('\n')} onChange={(event) => onPatch({ relatedConceptIds: list(event.target.value) })} className="min-h-16 font-mono text-[11px]" /></Field>
        <Field label="Resource IDs" hint="Every source that teaches or verifies this concept, one per line"><Textarea value={(value.resourceIds ?? []).join('\n')} onChange={(event) => onPatch({ resourceIds: list(event.target.value) })} className="min-h-16 font-mono text-[11px]" /></Field>
        <Field label="Resource occurrence IDs" hint="Exact source occurrences, one per line"><Textarea value={(value.resourceOccurrenceIds ?? []).join('\n')} onChange={(event) => onPatch({ resourceOccurrenceIds: list(event.target.value) })} className="min-h-16 font-mono text-[11px]" /></Field>
        <Field label="Approved file resource IDs" hint="One per line"><Textarea value={(value.approvedFileResourceIds ?? []).join('\n')} onChange={(event) => onPatch({ approvedFileResourceIds: list(event.target.value) })} className="min-h-16 font-mono text-[11px]" /></Field>
        <Field label="Approved video resource IDs" hint="One per line"><Textarea value={(value.approvedVideoResourceIds ?? []).join('\n')} onChange={(event) => onPatch({ approvedVideoResourceIds: list(event.target.value) })} className="min-h-16 font-mono text-[11px]" /></Field>
        <Field label="Evidence gaps" hint="One per line"><Textarea value={(value.evidenceGaps ?? []).join('\n')} onChange={(event) => onPatch({ evidenceGaps: list(event.target.value) })} className="min-h-20" /></Field>
        <Field label="Conflicts" hint="One per line"><Textarea value={(value.conflicts ?? []).join('\n')} onChange={(event) => onPatch({ conflicts: list(event.target.value) })} className="min-h-16" /></Field>
        <Field label="Uncertainty" hint="One per line"><Textarea value={(value.uncertainty ?? []).join('\n')} onChange={(event) => onPatch({ uncertainty: list(event.target.value) })} className="min-h-16" /></Field>
        <Field label="Source candidate IDs" hint="Preserved extraction lineage"><Textarea value={(value.sourceCandidateIds ?? []).join('\n')} onChange={(event) => onPatch({ sourceCandidateIds: list(event.target.value) })} className="min-h-16 font-mono text-[11px]" /></Field>
        <Field label="Merge record IDs" hint="Reversible canonicalisation records"><Textarea value={(value.mergeIds ?? []).join('\n')} onChange={(event) => onPatch({ mergeIds: list(event.target.value) })} className="min-h-16 font-mono text-[11px]" /></Field>
        <Field label="Rejected merge candidate IDs" hint="Similar but intentionally separate"><Textarea value={(value.rejectedMergeCandidateIds ?? []).join('\n')} onChange={(event) => onPatch({ rejectedMergeCandidateIds: list(event.target.value) })} className="min-h-16 font-mono text-[11px]" /></Field>
        <Field label="Original wording" hint="Preserved source wording, one per line"><Textarea value={(value.originalWording ?? []).join('\n')} onChange={(event) => onPatch({ originalWording: list(event.target.value) })} className="min-h-20" /></Field>
        <Field label="Editorial review status"><TextInput value={value.editorialReviewStatus ?? ''} onChange={(event) => onPatch({ editorialReviewStatus: event.target.value })} placeholder="evidence_gate_passed" /></Field>
        <Field label="Intentionally blank fields" hint="field: reason, one per line"><Textarea value={fieldNotesText(value.fieldNotes)} onChange={(event) => onPatch({ fieldNotes: fieldNotes(event.target.value) })} className="min-h-20" /></Field>
        <Field label="Exclusion reason"><Textarea value={value.exclusionReason ?? ''} onChange={(event) => onPatch({ exclusionReason: event.target.value || null })} className="min-h-16" /></Field>
      </div>
    </details>
  )
}

export function ConceptsSetup() {
  const [graph, setGraph] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, initialConceptGraph)
  const [evidence] = usePersistentState<MedicalEvidenceStore>(MEDICAL_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore)
  const [taxonomy, setTaxonomy] = useTaxonomyTree()
  const [medicalTaxonomy] = useMedicalTaxonomy()
  const [selectedId, setSelectedId] = useState<string | null>(graph.concepts[0]?.id ?? null)
  const [creating, setCreating] = useState(false)
  const [importing, setImporting] = useState(false)
  const [importText, setImportText] = useState('')
  const [report, setReport] = useState<{ added: number; skipped: number; errors: string[] } | null>(null)

  const selected = graph.concepts.find((c) => c.id === selectedId) ?? null

  // Draft fields for the selected concept editor.
  const [draft, setDraft] = useState<Partial<Concept>>({})
  const [draftDef, setDraftDef] = useState(selected?.definition ?? '')
  const [draftAliases, setDraftAliases] = useState(selected?.aliases.join(', ') ?? '')
  const [savedId, setSavedId] = useState<string | null>(null)

  // Load the editor whenever a different concept is selected.
  useEffect(() => {
    const concept = graph.concepts.find((c) => c.id === selectedId)
    setDraftDef(concept?.definition ?? '')
    setDraftAliases(concept?.aliases.join(', ') ?? '')
    setDraft(concept ? { ...concept } : {})
    setSavedId(null)
    // Intentionally keyed on selectedId only, so edits survive graph updates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId])

  const patch = (next: Partial<Concept>) => setDraft((d) => ({ ...d, ...next }))
  const num01 = (v: string) => Math.min(1, Math.max(0, Number(v) || 0))

  // New-concept draft.
  const [nLabel, setNLabel] = useState('')
  const [nPlacement, setNPlacement] = useState<TaxonomyPlacement>({})
  const [nAliases, setNAliases] = useState('')
  const [nDef, setNDef] = useState('')
  const [nPitfalls, setNPitfalls] = useState('')
  const [nStatus, setNStatus] = useState<Concept['status']>('under review')
  const [nBlueprint, setNBlueprint] = useState('')
  const [nClinical, setNClinical] = useState('')
  const [nAcademic, setNAcademic] = useState('')
  const [nExtra, setNExtra] = useState<Partial<Concept>>({ owner: 'Admin team', reviewer: 'Medical team, Admin team', finalPublisher: 'Admin team', publicationStatus: 'under review', universityIds: [], learnerYears: [], moduleIds: [], evidenceGaps: ['Evidence must be attached before publication.'] })

  /** Article IDs implied by a placement's deepest node (for auto-linking). */
  const articleIdsFor = (p: TaxonomyPlacement): string[] => {
    const sys = taxonomy.find((s) => s.sysId === p.systemId)
    const top = sys?.topics.find((t) => t.tpcId === p.topicTagId)
    const sub = top?.subs.find((s) => s.subId === p.subtopicId)
    if (sub) return [sub.id]
    if (top) return top.subs.map((s) => s.id)
    return []
  }

  /** Rename a taxonomy branch (topic/subtopic/microtopic/nanotopic) live. */
  function renameBranch(level: string, nodeId: string, title: string) {
    const t = title.trim()
    if (!t) return
    setTaxonomy((tree) => structuredClone(tree).map((sys: TaxSysNode) => {
      if (level === 'system' && sys.id === nodeId) return { ...sys, name: t }
      return {
        ...sys,
        topics: sys.topics.map((tp) => {
          if (level === 'topic' && tp.id === nodeId) return { ...tp, title: t }
          return {
            ...tp,
            subs: tp.subs.map((su) => {
              if (level === 'subtopic' && su.id === nodeId) return { ...su, title: t }
              return {
                ...su,
                micros: su.micros.map((mi) => {
                  if (level === 'microtopic' && mi.id === nodeId) return { ...mi, title: t }
                  return { ...mi, nanos: mi.nanos.map((na) => (level === 'nanotopic' && na.id === nodeId ? { ...na, title: t } : na)) }
                }),
              }
            }),
          }
        }),
      }
    }))
  }

  const conceptLabel = (id: string) => graph.concepts.find((c) => c.id === id)?.label ?? id

  function selectConcept(concept: Concept) {
    setSelectedId(concept.id)
    setDraftDef(concept.definition)
    setDraftAliases(concept.aliases.join(', '))
    setDraft({ ...concept })
    setSavedId(null)
  }

  function saveConcept() {
    if (!selected) return
    const aliases = draftAliases.split(',').map((a) => a.trim()).filter(Boolean)
    setGraph((g) => ({
      ...g,
      concepts: g.concepts.map((c) => (c.id === selected.id ? {
        ...c,
        ...draft,
        id: c.id,
        label: c.label,
        definition: draftDef.trim(),
        aliases,
        pitfalls: draft.pitfalls,
        status: draft.status,
        blueprintWeight: draft.blueprintWeight,
        clinicalRelevance: draft.clinicalRelevance,
        academicRelevance: draft.academicRelevance,
        examWeightByYear: draft.examWeightByYear,
        subjectId: draft.subjectId,
        systemId: draft.systemId,
        topicTagId: draft.topicTagId,
        subtopicId: draft.subtopicId,
        microtopicId: draft.microtopicId,
        nanotopicId: draft.nanotopicId,
      } : c)),
    }))
    setSavedId(selected.id)
  }

  function deleteConcept(id: string) {
    setGraph((g) => ({
      concepts: g.concepts.filter((c) => c.id !== id),
      relations: g.relations.filter((r) => r.sourceId !== id && r.targetId !== id),
    }))
    if (selectedId === id) setSelectedId(null)
  }

  function createConcept() {
    const label = nLabel.trim()
    if (!label) return
    const id = `med.concept.${slug(label)}`
    if (graph.concepts.some((c) => c.id === id)) return
    const clamp = (v: string) => { const n = Number(v); return Number.isFinite(n) && v.trim() ? Math.min(1, Math.max(0, n)) : undefined }
    const concept: Concept = {
      id,
      label,
      aliases: nAliases.split(',').map((a) => a.trim()).filter(Boolean),
      definition: nDef.trim(),
      pitfalls: nPitfalls.trim() || undefined,
      status: nStatus,
      blueprintWeight: clamp(nBlueprint),
      clinicalRelevance: clamp(nClinical),
      academicRelevance: clamp(nAcademic),
      ...nExtra,
      articleIds: articleIdsFor(nPlacement),
      subjectId: nPlacement.subjectId,
      systemId: nPlacement.systemId,
      topicTagId: nPlacement.topicTagId,
      subtopicId: nPlacement.subtopicId,
      microtopicId: nPlacement.microtopicId,
      nanotopicId: nPlacement.nanotopicId,
    }
    setGraph((g) => ({ ...g, concepts: [concept, ...g.concepts] }))
    setCreating(false)
    setNLabel(''); setNAliases(''); setNDef(''); setNPlacement({}); setNPitfalls(''); setNStatus('under review'); setNBlueprint(''); setNClinical(''); setNAcademic(''); setNExtra({ owner: 'Admin team', reviewer: 'Medical team, Admin team', finalPublisher: 'Admin team', publicationStatus: 'under review', universityIds: [], learnerYears: [], moduleIds: [], evidenceGaps: ['Evidence must be attached before publication.'] })
    selectConcept(concept)
  }

  function runImport() {
    const blocks = importText.split(/^\s*---\s*$/m).map((b) => b.trim()).filter(Boolean)
    const existing = new Set(graph.concepts.map((c) => c.id))
    const additions: Concept[] = []
    const errors: string[] = []
    let skipped = 0
    const num01 = (v?: string) => { const n = Number(v); return Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : undefined }

    blocks.forEach((block, index) => {
      const fields: Record<string, string> = {}
      let key = ''
      block.split(/\r?\n/).forEach((line) => {
        const m = line.match(/^##\s+(.+)/)
        if (m) { key = m[1].trim().toLowerCase(); fields[key] = '' }
        else if (key) fields[key] = (fields[key] ? fields[key] + '\n' : '') + line
      })
      Object.keys(fields).forEach((k) => (fields[k] = fields[k].trim()))
      const label = fields.label
      if (!label) { errors.push(`Block ${index + 1}: missing "## label".`); return }
      const id = fields.id || `med.concept.${slug(label)}`
      if (existing.has(id) || additions.some((a) => a.id === id)) { skipped++; return }
      const topic = libraryTopics.find((t) => t.id === fields.topic || t.title.toLowerCase() === (fields.topic ?? '').toLowerCase())
      const status = (['active', 'inactive', 'under review'].includes(fields.status) ? fields.status : 'under review') as Concept['status']
      const examWeightByYear = (fields.exam_weight_by_year ?? '').split(/[|\n;]/).map((p) => p.trim()).filter(Boolean).reduce<Record<string, number>>((acc, pair) => {
        const [yr, w] = pair.split('=').map((s) => s.trim())
        const n = num01(w); if (yr && n !== undefined) acc[yr] = n
        return acc
      }, {})
      additions.push({
        id, label,
        aliases: (fields.aliases ?? '').split(/[,\n]/).map((a) => a.trim()).filter(Boolean),
        definition: fields.definition ?? '',
        pitfalls: fields.pitfalls || undefined,
        status,
        articleIds: topic ? topic.subtopics.map((s) => s.id) : [],
        subjectId: fields.subject || topic?.subjectId,
        topicId: topic?.id,
        // Single-source taxonomy placement (visible IDs), if provided.
        systemId: fields.system || undefined,
        topicTagId: fields.topic_id || undefined,
        subtopicId: fields.subtopic || undefined,
        microtopicId: fields.microtopic || undefined,
        nanotopicId: fields.nanotopic || undefined,
        blueprintWeight: num01(fields.blueprint_weight),
        clinicalRelevance: num01(fields.clinical_relevance),
        academicRelevance: num01(fields.academic_relevance),
        examWeightByYear: Object.keys(examWeightByYear).length ? examWeightByYear : undefined,
        relatedArticleIds: topic ? topic.subtopics.map((s) => s.id) : [],
      })
    })

    if (additions.length) setGraph((g) => ({ ...g, concepts: [...additions, ...g.concepts] }))
    setReport({ added: additions.length, skipped, errors })
  }

  const importTemplate = `# One concept per block, separated by ---\n## label\nAnion gap\n## subject\nrenal\n## topic\nacidbase\n## subtopic\nSUB_ACID_BASE\n## microtopic\nMIC_ANION_GAP\n## nanotopic\nNAN_DELTA_GAP\n## definition\nThe calculated difference between measured serum cations and anions, used to classify metabolic acidosis.\n## pitfalls\nForgetting to calculate the anion gap in every metabolic acidosis.\n## aliases\nAG\n## status\nactive\n## blueprint_weight\n0.6\n## clinical_relevance\n0.7\n## academic_relevance\n0.8\n## exam_weight_by_year\nHU_Y2=0.6 | HU_Y3=0.4\n---\n## label\nAnother concept\n...`

  return (
    <PageContainer>
      <PageHeader
        title="Concepts"
        description="Concepts are the smallest assessable objectives. Author each one's definition, pitfalls, curriculum placement, weighting, and relationships. Definitions surface in a question — stem and answers — only after the student reveals the answer."
        actions={<Link to="/admin/concepts/import"><Button variant="secondary" size="md" iconLeft={Upload}>Bulk import</Button></Link>}
      />

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(19rem,22rem)_minmax(0,1fr)]">
        {/* ---- Navigator: stays put while the editor scrolls ---- */}
        <ConceptNavigator
          graph={graph}
          taxonomy={taxonomy}
          medicalTaxonomy={medicalTaxonomy}
          selectedId={selectedId}
          onSelect={(concept) => concept && selectConcept(concept)}
          onRename={renameBranch}
          action={<Button variant="primary" size="sm" iconLeft={Plus} onClick={() => setCreating(true)} className="w-full">New concept</Button>}
          footer={<>
            <span className="tnum font-mono font-medium text-ink-2">{graph.concepts.length}</span> concepts ·{' '}
            <span className="tnum font-mono font-medium text-ink-2">{graph.concepts.filter((c) => !c.definition).length}</span> without a definition
          </>}
          className="lg:sticky lg:top-[4.5rem] lg:max-h-[calc(100dvh-6rem)]"
        />

        {/* ---- Editor ---- */}
        <div className="space-y-4">
          {selected ? (
            <Panel>
              <PanelHeader
                title={selected.label}
                icon={Braces}
                action={<Button variant="ghost" size="sm" iconLeft={Trash2} className="hover:text-danger" onClick={() => deleteConcept(selected.id)}>Delete</Button>}
              />
              <div className="space-y-4 p-4">
                <p className="font-mono text-[11px] text-ink-3">{selected.id}</p>
                <Field label="Definition / note" hint="This is exactly what students see in the concept card after they reveal the answer.">
                  <Textarea value={draftDef} onChange={(e) => setDraftDef(e.target.value)} placeholder="Write the definition or note…" className="min-h-[7rem]" />
                </Field>
                <Field label="Also matches (aliases)" hint="Comma-separated terms that should surface this concept, e.g. HF, HFrEF.">
                  <TextInput value={draftAliases} onChange={(e) => setDraftAliases(e.target.value)} placeholder="alias one, alias two" />
                </Field>

                <Field label="Common pitfall" hint="A trap or common mistake — shown to students as a warning in the concept card.">
                  <Textarea value={draft.pitfalls ?? ''} onChange={(e) => patch({ pitfalls: e.target.value })} placeholder="What do students get wrong here?" className="min-h-[4.5rem]" />
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Status">
                    <Select value={draft.status ?? 'active'} onChange={(e) => patch({ status: e.target.value as Concept['status'] })}>
                      <option value="active">Active</option>
                      <option value="under review">Under review</option>
                      <option value="inactive">Inactive</option>
                    </Select>
                  </Field>
                  <Field label="Blueprint weight (0–1)">
                    <TextInput type="number" min={0} max={1} step={0.05} value={draft.blueprintWeight ?? 0} onChange={(e) => patch({ blueprintWeight: num01(e.target.value) })} />
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Clinical relevance (0–1)">
                    <TextInput type="number" min={0} max={1} step={0.05} value={draft.clinicalRelevance ?? 0} onChange={(e) => patch({ clinicalRelevance: num01(e.target.value) })} />
                  </Field>
                  <Field label="Academic relevance (0–1)">
                    <TextInput type="number" min={0} max={1} step={0.05} value={draft.academicRelevance ?? 0} onChange={(e) => patch({ academicRelevance: num01(e.target.value) })} />
                  </Field>
                </div>

                {/* Canonical medical placement — shared with the Library. */}
                <div className="rounded-lg border border-line bg-surface-2/40 p-3">
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">Canonical placement (Subjects & Topics)</p>
                  <MedicalTaxonomyPlacementPicker nodes={medicalTaxonomy} primaryNodeId={draft.primaryNodeId} secondaryNodeIds={draft.secondaryNodeIds} onPrimaryChange={(primaryNodeId) => patch({ primaryNodeId })} onSecondaryChange={(secondaryNodeIds) => patch({ secondaryNodeIds })} compact />
                </div>

                <details className="rounded-lg border border-line bg-surface-2/40 p-3">
                  <summary className="cursor-pointer text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">University curriculum overlay</summary>
                  <p className="mb-2 mt-2 text-[10.5px] leading-relaxed text-ink-3">Optional compatibility placement for an existing university module.</p>
                  <TaxonomyPlacementPicker
                    tree={taxonomy}
                    compact
                    value={{ subjectId: draft.subjectId, systemId: draft.systemId, topicTagId: draft.topicTagId, subtopicId: draft.subtopicId, microtopicId: draft.microtopicId, nanotopicId: draft.nanotopicId }}
                    onChange={(p) => patch({ subjectId: p.subjectId, systemId: p.systemId, topicTagId: p.topicTagId, subtopicId: p.subtopicId, microtopicId: p.microtopicId, nanotopicId: p.nanotopicId })}
                  />
                </details>

                <ConceptAdvancedFields value={draft} onPatch={patch} />

                {/* Per-year exam blueprint weights */}
                <div className="rounded-lg border border-line bg-surface-2/40 p-3">
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">Exam blueprint weight by year</p>
                  <div className="space-y-1.5">
                    {Object.entries(draft.examWeightByYear ?? {}).map(([yearKey, weight]) => (
                      <div key={yearKey} className="flex items-center gap-2">
                        <span className="tnum w-20 font-mono text-[11px] text-ink-2">{yearKey}</span>
                        <input type="range" min={0} max={1} step={0.05} value={weight} onChange={(e) => patch({ examWeightByYear: { ...(draft.examWeightByYear ?? {}), [yearKey]: num01(e.target.value) } })} className="flex-1 accent-[var(--color-accent)]" />
                        <span className="tnum w-8 text-end font-mono text-[11px] text-ink">{Number(weight).toFixed(2)}</span>
                      </div>
                    ))}
                    {Object.keys(draft.examWeightByYear ?? {}).length === 0 && (
                      <button type="button" onClick={() => patch({ examWeightByYear: { KAU_Y2: 0.5, KAU_Y3: 0.5 } })} className="text-[12px] font-medium text-accent hover:text-accent-strong">+ Add year weights</button>
                    )}
                  </div>
                </div>

                {/* Relationships — shared with the Relationships tab */}
                <div className="rounded-lg border border-line bg-surface-2/40 p-3">
                  <div className="mb-1.5 flex items-center justify-between">
                    <p className="text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">Relationships</p>
                    <Link to="/admin/relationships" className="text-[11px] font-medium text-accent hover:text-accent-strong">Manage →</Link>
                  </div>
                  {graph.relations.filter((rel) => rel.sourceId === selected.id || rel.targetId === selected.id).slice(0, 6).map((rel) => (
                    <p key={rel.id} className="font-mono text-[10.5px] leading-relaxed text-ink-2">
                      {rel.sourceId === selected.id ? <><span className="text-accent-strong">{rel.type}</span> → {conceptLabel(rel.targetId)}</> : <>{conceptLabel(rel.sourceId)} → <span className="text-accent-strong">{rel.type}</span></>}
                    </p>
                  ))}
                  {graph.relations.filter((rel) => rel.sourceId === selected.id || rel.targetId === selected.id).length === 0 && (
                    <p className="text-[11.5px] text-ink-3">No relationships yet — add them in the Relationships tab.</p>
                  )}
                </div>

                {/* Evidence ledger — auto-maintained from the concept's atomic claims. */}
                <ConceptSources concept={selected} evidence={evidence} />

                <div className="grid grid-cols-2 gap-1.5 font-mono text-[10.5px] text-ink-2">
                  <span>Approved files: <span className="text-ink">{selected.approvedFileResourceIds?.length ?? 0}</span></span>
                  <span>Approved videos: <span className="text-ink">{selected.approvedVideoResourceIds?.length ?? 0}</span></span>
                  <span>Related articles: <span className="text-ink">{selected.relatedArticleIds?.length ?? selected.articleIds.length}</span></span>
                  <span>Atomic claims: <span className="text-ink">{selected.atomicClaimIds?.length ?? 0}</span></span>
                </div>

                <div className="flex items-center gap-2 border-t border-line pt-3">
                  <Button variant="primary" iconLeft={savedId === selected.id ? Check : Save} onClick={saveConcept}>
                    {savedId === selected.id ? 'Saved' : 'Save concept'}
                  </Button>
                </div>
                <AfterRevealPreview concept={{ ...selected, definition: draftDef, aliases: draftAliases.split(',').map((a) => a.trim()).filter(Boolean) }} />
              </div>
            </Panel>
          ) : (
            <Panel>
              <div className="p-8 text-center">
                <span className="mx-auto grid size-11 place-items-center rounded-xl bg-inset text-ink-3"><Icon icon={Braces} size={20} /></span>
                <p className="mt-3 text-[14px] font-medium text-ink">Select a concept to edit its definition</p>
                <p className="mt-1 text-[13px] text-ink-2">Or create a new one to add a definition students will see after revealing an answer.</p>
              </div>
            </Panel>
          )}
        </div>
      </div>

      {/* ---- New concept dialog ---- */}
      {creating && (
        <div className="fixed inset-0 z-50 grid items-end bg-ink/30 p-0 animate-fade sm:place-items-center sm:p-4" role="dialog" aria-modal="true" aria-label="New concept" onMouseDown={() => setCreating(false)}>
          <Panel className="animate-pop flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-b-none pb-[env(safe-area-inset-bottom)] shadow-pop sm:max-w-lg sm:rounded-xl" onMouseDown={(e) => e.stopPropagation()}>
            <PanelHeader title="New concept" icon={Plus} />
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
              <Field label="Concept name">
                <TextInput value={nLabel} onChange={(e) => setNLabel(e.target.value)} placeholder="e.g. Anion gap" autoFocus />
              </Field>
              <div>
                <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">Canonical placement (Subjects & Topics)</p>
                <MedicalTaxonomyPlacementPicker nodes={medicalTaxonomy} primaryNodeId={nExtra.primaryNodeId} secondaryNodeIds={nExtra.secondaryNodeIds} onPrimaryChange={(primaryNodeId) => setNExtra((current) => ({ ...current, primaryNodeId }))} onSecondaryChange={(secondaryNodeIds) => setNExtra((current) => ({ ...current, secondaryNodeIds }))} />
              </div>
              <details className="rounded-lg border border-line bg-surface-2/40 p-3"><summary className="cursor-pointer text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">University curriculum overlay</summary><div className="mt-3"><TaxonomyPlacementPicker tree={taxonomy} value={nPlacement} onChange={setNPlacement} /></div></details>
              <Field label="Also matches (aliases)" hint="Comma-separated.">
                <TextInput value={nAliases} onChange={(e) => setNAliases(e.target.value)} placeholder="alias one, alias two" />
              </Field>
              <Field label="Definition / note">
                <Textarea value={nDef} onChange={(e) => setNDef(e.target.value)} placeholder="Write the definition or note…" />
              </Field>
              <Field label="Common pitfall" hint="A trap shown as a warning in the concept card.">
                <Textarea value={nPitfalls} onChange={(e) => setNPitfalls(e.target.value)} placeholder="What do students get wrong here?" className="min-h-[3.5rem]" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Status">
                  <Select value={nStatus ?? 'active'} onChange={(e) => setNStatus(e.target.value as Concept['status'])}>
                    <option value="active">Active</option>
                    <option value="under review">Under review</option>
                    <option value="inactive">Inactive</option>
                  </Select>
                </Field>
                <Field label="Blueprint weight (0–1)">
                  <TextInput type="number" min={0} max={1} step={0.05} value={nBlueprint} onChange={(e) => setNBlueprint(e.target.value)} placeholder="0.5" />
                </Field>
                <Field label="Clinical relevance (0–1)">
                  <TextInput type="number" min={0} max={1} step={0.05} value={nClinical} onChange={(e) => setNClinical(e.target.value)} placeholder="0.5" />
                </Field>
                <Field label="Academic relevance (0–1)">
                  <TextInput type="number" min={0} max={1} step={0.05} value={nAcademic} onChange={(e) => setNAcademic(e.target.value)} placeholder="0.5" />
                </Field>
              </div>
              <ConceptAdvancedFields value={nExtra} onPatch={(next) => setNExtra((current) => ({ ...current, ...next }))} />
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-line bg-surface-2/40 px-5 py-3">
              <Button variant="ghost" onClick={() => setCreating(false)}>Cancel</Button>
              <Button variant="primary" iconLeft={Plus} onClick={createConcept} disabled={!nLabel.trim()}>Create concept</Button>
            </div>
          </Panel>
        </div>
      )}

      {/* ---- Bulk import dialog ---- */}
      {importing && (
        <div className="fixed inset-0 z-50 grid items-end bg-ink/30 p-0 animate-fade sm:place-items-center sm:p-4" role="dialog" aria-modal="true" aria-label="Bulk import concepts" onMouseDown={() => setImporting(false)}>
          <Panel className="animate-pop flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-b-none pb-[env(safe-area-inset-bottom)] shadow-pop sm:max-w-xl sm:rounded-xl" onMouseDown={(e) => e.stopPropagation()}>
            <PanelHeader title="Bulk import concepts" icon={Upload} />
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-5">
              <ol className="list-inside list-decimal space-y-1 text-[12.5px] text-ink-2">
                <li>One concept per block; separate blocks with a line containing only <code className="rounded bg-inset px-1 font-mono text-[11px]">---</code>.</li>
                <li>Each field is a <code className="font-mono text-[11px]">## fieldname</code> line followed by its value. <b>label</b> is required.</li>
                <li>Fields: label, id, subject, topic, subtopic (SUB_*), microtopic (MIC_*), nanotopic (NAN_*), definition, pitfalls, aliases, status, blueprint_weight, clinical_relevance, academic_relevance, exam_weight_by_year (e.g. HU_Y2=0.6 | HU_Y3=0.4).</li>
                <li>Press <b>Import</b> — you'll get a batch report of added, skipped (duplicates), and rejected blocks.</li>
              </ol>
              <Field label="Concepts">
                <Textarea value={importText} onChange={(e) => setImportText(e.target.value)} placeholder={importTemplate} className="min-h-[13rem] font-mono text-[12px]" />
              </Field>
              {report && (
                <div className="rounded-lg border border-line bg-surface-2/50 p-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge tone="success">{report.added} added</Badge>
                    <Badge tone="neutral">{report.skipped} skipped (duplicate)</Badge>
                    <Badge tone={report.errors.length ? 'danger' : 'neutral'}>{report.errors.length} rejected</Badge>
                  </div>
                  {report.errors.length > 0 && (
                    <ul className="mt-2 max-h-32 space-y-0.5 overflow-y-auto">
                      {report.errors.map((e, i) => <li key={i} className="flex items-start gap-1.5 text-[11.5px] text-danger"><Icon icon={TriangleAlert} size={12} className="mt-0.5 shrink-0" />{e}</li>)}
                    </ul>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-line bg-surface-2/40 px-5 py-3">
              <Button variant="ghost" onClick={() => setImporting(false)}>Close</Button>
              <Button variant="primary" iconLeft={Upload} onClick={runImport} disabled={!importText.trim()}>Import</Button>
            </div>
          </Panel>
        </div>
      )}
    </PageContainer>
  )
}
