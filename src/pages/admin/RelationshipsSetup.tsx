import { Fragment, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Trash2, ArrowRight, Upload, FileSpreadsheet, Search, CircleCheck, TriangleAlert, Tag, Pencil, Check, X, ChevronDown, ChevronRight } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { ConceptNavigator } from '@/components/admin/ConceptNavigator'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { SubjectDot } from '@/components/ui/Subject'
import { Field, SearchInput, Select, Textarea, TextInput } from '@/components/ui/Field'
import { Table, Th, Td, Tr } from '@/components/ui/Table'
import { usePersistentState } from '@/lib/usePersistentState'
import { subjects, getSubject } from '@/data/subjects'
import { libraryTopics } from '@/data/library'
import { useTaxonomyTree, renameTaxonomyNode } from '@/data/taxonomyStore'
import { useMedicalTaxonomy } from '@/data/medicalTaxonomyStore'
import { cn } from '@/lib/cn'
import { MEDICAL_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore, type MedicalEvidenceStore } from '@/data/medicalEvidence'

/** Click-to-rename inline label. */
function EditableLabel({ value, onSave }: { value: string; onSave: (v: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [v, setV] = useState(value)
  if (editing) return (
    <input autoFocus value={v} onChange={(e) => setV(e.target.value)} onClick={(e) => e.stopPropagation()}
      onBlur={() => { setEditing(false); if (v.trim() && v !== value) onSave(v.trim()) }}
      onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); if (e.key === 'Escape') { setV(value); setEditing(false) } }}
      className="rounded border border-primary bg-surface px-1 py-0.5 text-[11px] uppercase text-ink outline-none" />
  )
  return <button type="button" onClick={(e) => { e.stopPropagation(); setV(value); setEditing(true) }} title="Rename topic" className="rounded px-1 hover:bg-inset">{value}</button>
}
import {
  CONCEPT_STORAGE_KEY,
  CONCEPT_RELATIONS,
  initialConceptGraph,
  type ConceptGraph,
  type ConceptRelationType,
} from '@/data/conceptGraph'

/** Built-in directed relationship types (source → target). */
const RELATION_TYPES: readonly ConceptRelationType[] = CONCEPT_RELATIONS
const RELATION_TYPES_KEY = 'synapse-relation-types-v1'
const slugType = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)/g, '')

export function RelationshipsSetup() {
  const [graph, setGraph] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, initialConceptGraph)
  const [evidence] = usePersistentState<MedicalEvidenceStore>(MEDICAL_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore)
  const [taxonomy, setTaxonomy] = useTaxonomyTree()
  const [medicalTaxonomy] = useMedicalTaxonomy()
  const [customTypes, setCustomTypes] = usePersistentState<string[]>(RELATION_TYPES_KEY, [])
  const allTypes = [...RELATION_TYPES, ...customTypes.filter((t) => !RELATION_TYPES.includes(t as ConceptRelationType))]
  const [query, setQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [source, setSource] = useState('')
  const [type, setType] = useState<ConceptRelationType>('associated_with')
  const [targets, setTargets] = useState<string[]>([])
  const [bidirectional, setBidirectional] = useState(false)
  const [evidenceClaimText, setEvidenceClaimText] = useState('')
  const [citationText, setCitationText] = useState('')
  const [newType, setNewType] = useState('')
  const [notice, setNotice] = useState<string | null>(null)
  const [importing, setImporting] = useState(false)
  const [importText, setImportText] = useState('')
  const [report, setReport] = useState<{ added: number; skipped: number; errors: string[] } | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editDraft, setEditDraft] = useState<{ sourceId: string; type: string; targetId: string }>({ sourceId: '', type: '', targetId: '' })
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())
  /** Concept selected in the navigator; narrows the table and seeds the form. */
  const [focusId, setFocusId] = useState<string | null>(null)
  const [sourcePickerOpen, setSourcePickerOpen] = useState(false)
  const [pickerQuery, setPickerQuery] = useState('')
  const [targetPickerOpen, setTargetPickerOpen] = useState(false)
  const [targetQuery, setTargetQuery] = useState('')
  const toggleGroup = (k: string) => setCollapsed((prev) => { const n = new Set(prev); if (n.has(k)) n.delete(k); else n.add(k); return n })

  const conceptLabel = (id: string) => graph.concepts.find((c) => c.id === id)?.label ?? id
  const conceptOptions = [...graph.concepts].sort((a, b) => a.label.localeCompare(b.label))

  // Map each concept to its System (subject) and Topic, for grouping.
  const { subjectOfArticle, topicOfArticle } = useMemo(() => {
    const s: Record<string, string> = {}
    const tp: Record<string, string> = {}
    libraryTopics.forEach((t) => t.subtopics.forEach((sub) => { s[sub.id] = t.subjectId; tp[sub.id] = t.title }))
    return { subjectOfArticle: s, topicOfArticle: tp }
  }, [])
  const knownSubjects = useMemo(() => new Set(subjects.map((s) => s.id)), [])
  const conceptSubject = (id: string): string => {
    const c = graph.concepts.find((x) => x.id === id)
    return c?.subjectId || c?.articleIds?.map((a) => subjectOfArticle[a]).find(Boolean) || ''
  }
  const conceptTopic = (id: string): string => {
    const c = graph.concepts.find((x) => x.id === id)
    if (!c) return 'General'
    // Prefer the single-source taxonomy: explicit topic tag, else the topic that
    // owns one of the concept's article/subtopic nodes.
    const sys = taxonomy.find((s) => s.id === c.subjectId || s.sysId === c.systemId)
    if (sys) {
      if (c.topicTagId) { const t = sys.topics.find((x) => x.tpcId === c.topicTagId); if (t) return t.title }
      for (const a of c.articleIds ?? []) { const t = sys.topics.find((x) => x.subs.some((su) => su.id === a)); if (t) return t.title }
    }
    return c.articleIds?.map((a) => topicOfArticle[a]).find(Boolean) || 'General'
  }

  /** Rename a topic in the single-source taxonomy (system matched by subject). */
  function renameTopic(sysSubjectId: string, oldTitle: string, newTitle: string) {
    const topic = taxonomy.find((s) => s.id === sysSubjectId)?.topics.find((t) => t.title === oldTitle)
    if (topic) setTaxonomy((tree) => renameTaxonomyNode(tree, 'topic', topic.id, newTitle))
  }

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return graph.relations
      .filter((rel) => {
        // A concept picked in the navigator narrows the table to its own
        // relations, in either direction — that is what makes a graph this size
        // workable rather than one long list.
        if (focusId && rel.sourceId !== focusId && rel.targetId !== focusId) return false
        if (filterType !== 'all' && rel.type !== filterType) return false
        if (!q) return true
        return `${conceptLabel(rel.sourceId)} ${rel.type} ${conceptLabel(rel.targetId)} ${rel.sourceId} ${rel.targetId}`.toLowerCase().includes(q)
      })
      // Sort by the system of the source concept, then by source, then target.
      .sort((a, b) => {
        const sa = conceptSubject(a.sourceId) || 'zzz'
        const sb = conceptSubject(b.sourceId) || 'zzz'
        if (sa !== sb) return sa.localeCompare(sb)
        const la = conceptLabel(a.sourceId).localeCompare(conceptLabel(b.sourceId))
        return la !== 0 ? la : conceptLabel(a.targetId).localeCompare(conceptLabel(b.targetId))
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graph.relations, query, filterType, graph.concepts, focusId])

  // Group the filtered rows into System → Topic for the collapsible list.
  const grouped = useMemo(() => {
    const bySys = new Map<string, Map<string, typeof rows>>()
    rows.forEach((rel) => {
      const sys = conceptSubject(rel.sourceId) || 'zzz'
      const top = conceptTopic(rel.sourceId)
      if (!bySys.has(sys)) bySys.set(sys, new Map())
      const tmap = bySys.get(sys)!
      tmap.set(top, [...(tmap.get(top) ?? []), rel])
    })
    const order = [...subjects.map((s) => s.id), 'zzz']
    return [...bySys.entries()]
      .sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]))
      .map(([sys, tmap]) => ({ sys, count: [...tmap.values()].reduce((n, l) => n + l.length, 0), topics: [...tmap.entries()] }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, taxonomy])

  // Concepts grouped by system for the built-in source picker.
  const conceptsBySystem = useMemo(() => {
    const bySys = new Map<string, typeof graph.concepts>()
    conceptOptions.forEach((c) => { const sys = conceptSubject(c.id) || 'zzz'; bySys.set(sys, [...(bySys.get(sys) ?? []), c]) })
    const order = [...subjects.map((s) => s.id), 'zzz']
    return [...bySys.entries()].sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graph.concepts])

  function startEdit(rel: ConceptGraph['relations'][number]) {
    setEditingId(rel.id)
    setEditDraft({ sourceId: rel.sourceId, type: rel.type, targetId: rel.targetId })
  }
  function saveEdit() {
    if (!editingId || !editDraft.sourceId || !editDraft.targetId || editDraft.sourceId === editDraft.targetId) { setEditingId(null); return }
    setGraph((g) => ({ ...g, relations: g.relations.map((r) => r.id === editingId ? { ...r, sourceId: editDraft.sourceId, type: editDraft.type as ConceptRelationType, targetId: editDraft.targetId } : r) }))
    setEditingId(null)
  }

  function addRelation() {
    const tgts = targets.filter((t) => t && t !== source)
    if (!source || tgts.length === 0) return
    const exists = new Set(graph.relations.map((r) => `${r.sourceId}|${r.type}|${r.targetId}`))
    const additions: ConceptGraph['relations'] = []
    const requestedClaims = evidenceClaimText.split(/[\s,;|]+/).map((value) => value.trim()).filter(Boolean)
    const evidenceClaimIds = requestedClaims.filter((id) => evidence.claims.some((claim) => claim.id === id))
    const requestedCitations = citationText.split(/[\s,;|]+/).map((value) => value.trim()).filter(Boolean)
    const citationIds = requestedCitations.filter((id) => evidence.citations.some((citation) => citation.id === id && evidenceClaimIds.includes(citation.claimId)))
    const supportingClaims = evidenceClaimIds.map((id) => evidence.claims.find((claim) => claim.id === id)!).filter(Boolean)
    const verificationStatus = supportingClaims.length > 0 && supportingClaims.every((claim) => claim.verificationStatus === 'verified') && citationIds.length > 0
      ? 'verified' as const
      : 'needs_evidence' as const
    const confidence = supportingClaims.length ? Math.min(...supportingClaims.map((claim) => claim.confidence)) : 0
    let dup = 0
    const push = (s: string, t: string) => {
      const key = `${s}|${type}|${t}`
      if (exists.has(key) || additions.some((a) => `${a.sourceId}|${a.type}|${a.targetId}` === key)) { dup++; return }
      additions.push({ id: `rel-${Date.now()}-${additions.length}`, sourceId: s, type, targetId: t, evidenceClaimIds, citationIds, confidence, verificationStatus, reviewer: 'Medical team, Admin team', reviewedAt: verificationStatus === 'verified' ? new Date().toISOString() : undefined })
    }
    // One source → many targets; optionally back-and-forth (both directions).
    tgts.forEach((t) => { push(source, t); if (bidirectional) push(t, source) })
    if (additions.length) setGraph((g) => ({ ...g, relations: [...additions, ...g.relations] }))
    const dir = bidirectional ? ' (both directions)' : ''
    setNotice(additions.length
      ? `Added ${additions.length} relationship${additions.length === 1 ? '' : 's'}${dir}${dup ? `, ${dup} duplicate skipped` : ''}.`
      : 'Those relationships already exist.')
    setTargets([])
    setEvidenceClaimText('')
    setCitationText('')
  }

  const addTarget = (id: string) => { if (id && !targets.includes(id)) setTargets((cur) => [...cur, id]) }

  function removeRelation(id: string) {
    setGraph((g) => ({ ...g, relations: g.relations.filter((r) => r.id !== id) }))
  }

  function addCustomType() {
    const t = slugType(newType)
    if (!t || allTypes.includes(t as ConceptRelationType)) { setNewType(''); return }
    setCustomTypes((cur) => [...cur, t])
    setType(t as ConceptRelationType)
    setNewType('')
    setNotice(`Added relationship type "${t}".`)
  }

  function runImport() {
    const byId = new Map(graph.concepts.map((c) => [c.id, c]))
    const byLabel = new Map(graph.concepts.map((c) => [c.label.toLowerCase(), c]))
    const resolve = (token: string) => byId.get(token.trim()) ?? byLabel.get(token.trim().toLowerCase())
    const validTypes = new Set<string>(allTypes)
    const existing = new Set(graph.relations.map((r) => `${r.sourceId}|${r.type}|${r.targetId}`))
    const additions: ConceptGraph['relations'] = []
    const errors: string[] = []
    let skipped = 0

    importText.split(/\r?\n/).forEach((raw, index) => {
      const line = raw.trim()
      if (!line || line.startsWith('#')) return
      const parts = line.split('|').map((p) => p.trim())
      if (parts.length < 3) { errors.push(`Line ${index + 1}: expected "source | type | target".`); return }
      const [s, ty, t] = parts
      const src = resolve(s); const tgt = resolve(t)
      if (!src) { errors.push(`Line ${index + 1}: unknown concept "${s}".`); return }
      if (!tgt) { errors.push(`Line ${index + 1}: unknown concept "${t}".`); return }
      if (!validTypes.has(ty)) { errors.push(`Line ${index + 1}: unknown relation type "${ty}".`); return }
      if (src.id === tgt.id) { errors.push(`Line ${index + 1}: a concept cannot relate to itself.`); return }
      // Optional 4th token makes the line bidirectional: both | bi | <-> | ↔
      const both = /^(both|bi|<->|↔)$/i.test(parts[3] ?? '')
      const addOne = (sId: string, tId: string) => {
        const key = `${sId}|${ty}|${tId}`
        if (existing.has(key) || additions.some((a) => `${a.sourceId}|${a.type}|${a.targetId}` === key)) { skipped++; return }
        additions.push({ id: `rel-imp-${Date.now()}-${index}-${additions.length}`, sourceId: sId, type: ty as ConceptRelationType, targetId: tId, evidenceClaimIds: [], citationIds: [], confidence: 0, verificationStatus: 'needs_evidence', reviewer: 'Medical team, Admin team' })
      }
      addOne(src.id, tgt.id)
      if (both) addOne(tgt.id, src.id)
    })

    if (additions.length) setGraph((g) => ({ ...g, relations: [...additions, ...g.relations] }))
    setReport({ added: additions.length, skipped, errors })
  }

  const template = `# One relationship per line:  source | type | target [| both]\n# source/target can be a Concept ID or its exact label\n# Add a 4th "both" to make it bidirectional (↔). Repeat a pair with a new type for multiple links.\nmed.concept.stemi | part_of | med.concept.acute-coronary-syndrome\nHeart failure | treated_by | Beta-blockade\nNSTEMI | often_confused_with | STEMI | both\nAlcohol | increases | ALT\nAlcohol | increases | AST`

  return (
    <PageContainer>
      <PageHeader
        title="Relationships"
        description="Relationships between concepts — directional (source → target) or back-and-forth (↔). One concept can link to many at once, and the same pair can hold several relations of different types."
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="md" iconLeft={Upload} onClick={() => { setImporting(true); setReport(null); setImportText('') }}>Paste relationships</Button>
            <Link to="/admin/relationships/import"><Button variant="secondary" size="md" iconLeft={FileSpreadsheet}>Import a file</Button></Link>
          </div>
        }
      />

      {notice && (
        <div role="status" className="mb-4 flex items-center gap-2 rounded-lg border border-success/25 bg-success-tint/70 px-4 py-2.5 text-[13px] text-ink">
          <Icon icon={CircleCheck} size={16} className="text-success" /><span className="flex-1">{notice}</span>
          <button onClick={() => setNotice(null)} className="text-[12px] font-medium text-ink-3 hover:text-ink">Dismiss</button>
        </div>
      )}

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(18rem,21rem)_minmax(0,1fr)]">
        {/* Navigator: pick a concept to work on its relations only. */}
        <ConceptNavigator
          title="Browse concepts"
          graph={graph}
          taxonomy={taxonomy}
          medicalTaxonomy={medicalTaxonomy}
          selectedId={focusId}
          onSelect={(concept) => {
            setFocusId(concept ? concept.id : null)
            // Working on a concept almost always means adding a relation from it.
            if (concept) setSource(concept.id)
          }}
          badgeFor={(concept) => {
            const count = graph.relations.filter((rel) => rel.sourceId === concept.id || rel.targetId === concept.id).length
            return <span className="tnum shrink-0 font-mono text-[10px] text-ink-3">{count}</span>
          }}
          footer={focusId
            ? <button type="button" onClick={() => setFocusId(null)} className="font-medium text-primary-strong hover:underline">Showing {conceptLabel(focusId)} · show all</button>
            : <><span className="tnum font-mono font-medium text-ink-2">{graph.relations.length}</span> relationships across <span className="tnum font-mono font-medium text-ink-2">{graph.concepts.length}</span> concepts</>}
          className="lg:sticky lg:top-[4.5rem] lg:max-h-[calc(100dvh-6rem)]"
        />

        <div className="min-w-0">
      {/* Add relationship */}
      <Panel className="mb-4">
        <PanelHeader title="Add a relationship" icon={Plus} hint="One source → one or more targets; optionally both directions" />
        <div className="grid items-start gap-3 p-4 lg:grid-cols-[1fr_auto_1fr]">
          <Field label="Source concept" hint="Grouped by system">
            <div className="relative">
              <button type="button" onClick={() => { setSourcePickerOpen((o) => !o); setPickerQuery('') }} className="flex h-9 w-full items-center gap-2 rounded-lg border border-line bg-surface px-3 text-start text-[13px] hover:border-line-2">
                {source ? (<>{knownSubjects.has(conceptSubject(source)) && <SubjectDot id={conceptSubject(source)} />}<span className="truncate text-ink">{conceptLabel(source)}</span></>) : <span className="text-ink-3">— Select a concept —</span>}
                <Icon icon={ChevronDown} size={15} className="ms-auto shrink-0 text-ink-3" />
              </button>
              {sourcePickerOpen && (
                <>
                  <button type="button" className="fixed inset-0 z-10" aria-label="Close" onClick={() => setSourcePickerOpen(false)} />
                  <div className="absolute z-20 mt-1 max-h-80 w-full overflow-y-auto rounded-lg border border-line bg-surface p-1.5 shadow-pop">
                    <div className="sticky top-0 mb-1 bg-surface pb-1"><SearchInput value={pickerQuery} onChange={(e) => setPickerQuery(e.target.value)} placeholder="Search concepts…" className="w-full" /></div>
                    {conceptsBySystem.map(([sys, concepts]) => {
                      const q = pickerQuery.trim().toLowerCase()
                      const list = q ? concepts.filter((c) => c.label.toLowerCase().includes(q)) : concepts
                      if (list.length === 0) return null
                      return (
                        <div key={sys} className="mb-1">
                          <div className="flex items-center gap-1.5 px-2 py-1 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">
                            {knownSubjects.has(sys) ? <><SubjectDot id={sys} />{getSubject(sys).name}</> : 'Unassigned'}
                          </div>
                          {list.map((c) => (
                            <button key={c.id} type="button" onClick={() => { setSource(c.id); setSourcePickerOpen(false) }} className={cn('block w-full truncate rounded-md px-2.5 py-1.5 text-start text-[13px]', source === c.id ? 'bg-primary-tint font-medium text-primary-strong' : 'text-ink-2 hover:bg-inset')}>{c.label}</button>
                          ))}
                        </div>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          </Field>
          <Field label="Relation & direction">
            <div className="flex items-center gap-1.5">
              <Select value={type} onChange={(e) => setType(e.target.value as ConceptRelationType)} className="min-w-[9rem]">
                {allTypes.map((rt) => <option key={rt} value={rt}>{rt}</option>)}
              </Select>
              <button
                type="button"
                onClick={() => setBidirectional((v) => !v)}
                aria-pressed={bidirectional}
                title={bidirectional ? 'Both directions (↔)' : 'One direction (→)'}
                className={cn('grid h-9 w-11 shrink-0 place-items-center rounded-lg border text-[13px] font-semibold transition-colors',
                  bidirectional ? 'border-primary-line bg-primary-tint text-primary-strong' : 'border-line bg-surface text-ink-2 hover:bg-inset')}
              >
                {bidirectional ? '↔' : '→'}
              </button>
            </div>
          </Field>
          <Field label="Target concept(s)" hint="Grouped by system — add several to connect one concept to many at once.">
            <div className="relative">
              <button type="button" onClick={() => { setTargetPickerOpen((o) => !o); setTargetQuery('') }} className="flex h-9 w-full items-center gap-2 rounded-lg border border-line bg-surface px-3 text-start text-[13px] text-ink-3 hover:border-line-2">
                <Plus size={14} /> Add target concept
                <Icon icon={ChevronDown} size={15} className="ms-auto shrink-0 text-ink-3" />
              </button>
              {targetPickerOpen && (
                <>
                  <button type="button" className="fixed inset-0 z-10" aria-label="Close" onClick={() => setTargetPickerOpen(false)} />
                  <div className="absolute z-20 mt-1 max-h-80 w-full overflow-y-auto rounded-lg border border-line bg-surface p-1.5 shadow-pop">
                    <div className="sticky top-0 mb-1 bg-surface pb-1"><SearchInput value={targetQuery} onChange={(e) => setTargetQuery(e.target.value)} placeholder="Search concepts…" className="w-full" /></div>
                    {conceptsBySystem.map(([sys, concepts]) => {
                      const tq = targetQuery.trim().toLowerCase()
                      const list = concepts.filter((c) => c.id !== source && !targets.includes(c.id) && (!tq || c.label.toLowerCase().includes(tq)))
                      if (list.length === 0) return null
                      return (
                        <div key={sys} className="mb-1">
                          <div className="flex items-center gap-1.5 px-2 py-1 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">
                            {knownSubjects.has(sys) ? <><SubjectDot id={sys} />{getSubject(sys).name}</> : 'Unassigned'}
                          </div>
                          {list.map((c) => (
                            <button key={c.id} type="button" onClick={() => addTarget(c.id)} className="block w-full truncate rounded-md px-2.5 py-1.5 text-start text-[13px] text-ink-2 hover:bg-inset">{c.label}</button>
                          ))}
                        </div>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
            {targets.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {targets.map((tid) => (
                  <span key={tid} className="inline-flex items-center gap-1 rounded-full border border-primary-line bg-primary-tint py-0.5 pe-1.5 ps-2.5 text-[12px] font-medium text-primary-strong">
                    {conceptLabel(tid)}
                    <button onClick={() => setTargets((cur) => cur.filter((x) => x !== tid))} aria-label={`Remove ${conceptLabel(tid)}`} className="text-primary/70 hover:text-primary"><Icon icon={Trash2} size={11} /></button>
                  </span>
                ))}
              </div>
            )}
          </Field>
        </div>
        <div className="grid gap-3 border-t border-line px-4 py-3 sm:grid-cols-2">
          <Field label="Evidence claim ID(s)" hint="Required for a verified relationship. Comma-separated.">
            <TextInput value={evidenceClaimText} onChange={(event) => setEvidenceClaimText(event.target.value)} placeholder="CLM-CVS-…" />
          </Field>
          <Field label="Citation ID(s)" hint="Must belong to the selected claims and point to exact source locations.">
            <TextInput value={citationText} onChange={(event) => setCitationText(event.target.value)} placeholder="CIT-…, CIT-…" />
          </Field>
          <p className="sm:col-span-2 text-[11px] leading-relaxed text-ink-3">Connect Cortex marks the relationship verified only when every supplied claim is verified and at least one matching exact citation is present. Otherwise it remains “needs evidence.”</p>
        </div>
        <div className="flex items-center justify-between gap-2 px-4 pb-4">
          <p className="text-[11.5px] text-ink-3">{source && targets.length ? `${conceptLabel(source)} ${bidirectional ? '↔' : '→'} ${type} ${bidirectional ? '↔' : '→'} ${targets.length} concept${targets.length === 1 ? '' : 's'}` : 'Pick a source and one or more targets.'}</p>
          <Button variant="primary" iconLeft={Plus} onClick={addRelation} disabled={!source || targets.length === 0}>Add {targets.length > 1 ? `${targets.length} relations` : 'relation'}</Button>
        </div>
        <div className="flex flex-wrap items-end gap-2 border-t border-line px-4 py-3">
          <Field label="Add a custom relationship type" hint="Define your own directed type — it becomes available above and in bulk import." className="min-w-[16rem] flex-1">
            <TextInput value={newType} onChange={(e) => setNewType(e.target.value)} placeholder="e.g. exacerbated_by" onKeyDown={(e) => { if (e.key === 'Enter') addCustomType() }} />
          </Field>
          <Button variant="secondary" iconLeft={Tag} onClick={addCustomType} disabled={!newType.trim()}>Add type</Button>
          {customTypes.length > 0 && (
            <div className="flex w-full flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-ink-3">Custom:</span>
              {customTypes.map((ct) => (
                <span key={ct} className="inline-flex items-center gap-1 rounded-full border border-primary-line bg-primary-tint py-0.5 pe-1.5 ps-2.5 text-[11.5px] font-medium text-primary-strong">
                  {ct}
                  <button onClick={() => setCustomTypes((cur) => cur.filter((x) => x !== ct))} aria-label={`Remove ${ct}`} className="text-primary/70 hover:text-primary"><Icon icon={Trash2} size={11} /></button>
                </span>
              ))}
            </div>
          )}
        </div>
      </Panel>

      {/* Relationship list */}
      <Panel>
        <div className="flex flex-wrap items-center gap-2 border-b border-line bg-surface-2/45 px-4 py-3">
          <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search relationships…" className="w-72" />
          <Select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="w-52">
            <option value="all">All types</option>
            {allTypes.map((rt) => <option key={rt} value={rt}>{rt}</option>)}
          </Select>
          <span className="ms-auto tnum font-mono text-[11.5px] text-ink-3">{rows.length} of {graph.relations.length}</span>
        </div>
        <Table>
          <thead><tr><Th className="pl-4">Source</Th><Th>Relation</Th><Th>Target</Th><Th align="right" className="pr-4">Actions</Th></tr></thead>
          <tbody>
            {grouped.map(({ sys, count, topics }) => {
              const sysKey = `sys-${sys}`
              const sysCollapsed = collapsed.has(sysKey)
              return (
                <Fragment key={sysKey}>
                  <tr className="border-t border-line bg-surface-2/70">
                    <td colSpan={4} className="px-2 py-0">
                      <button type="button" onClick={() => toggleGroup(sysKey)} aria-expanded={!sysCollapsed} className="flex w-full items-center gap-2 px-2 py-2 text-start">
                        <Icon icon={ChevronRight} size={15} className={cn('text-ink-3 chevron-turn')} open={!sysCollapsed} />
                        {knownSubjects.has(sys) ? <><SubjectDot id={sys} /><span className="text-[13px] font-semibold text-ink">{getSubject(sys).name}</span></> : <span className="text-[13px] font-semibold text-ink">Unassigned</span>}
                        <span className="tnum ms-1 font-mono text-[11px] text-ink-3">{count}</span>
                      </button>
                    </td>
                  </tr>
                  {!sysCollapsed && topics.map(([topic, list]) => {
                    const topKey = `${sysKey}::${topic}`
                    const topCollapsed = collapsed.has(topKey)
                    return (
                      <Fragment key={topKey}>
                        <tr className="bg-surface-2/25">
                          <td colSpan={4} className="px-4 py-1.5 ps-6">
                            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">
                              <button type="button" onClick={() => toggleGroup(topKey)} aria-expanded={!topCollapsed} className="grid size-4 place-items-center"><Icon icon={ChevronRight} size={12} className={cn('chevron-turn')} open={!topCollapsed} /></button>
                              {knownSubjects.has(sys) && topic !== 'General' ? <EditableLabel value={topic} onSave={(v) => renameTopic(sys, topic, v)} /> : topic}
                              <span className="tnum font-mono text-ink-3/70">{list.length}</span>
                            </div>
                          </td>
                        </tr>
                        {!topCollapsed && list.map((rel) => editingId === rel.id ? (
                          <Tr key={rel.id}>
                            <Td className="pl-4"><Select value={editDraft.sourceId} onChange={(e) => setEditDraft((d) => ({ ...d, sourceId: e.target.value }))} className="h-9">{conceptOptions.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}</Select></Td>
                            <Td><Select value={editDraft.type} onChange={(e) => setEditDraft((d) => ({ ...d, type: e.target.value }))} className="h-9">{allTypes.map((rt) => <option key={rt} value={rt}>{rt}</option>)}</Select></Td>
                            <Td><Select value={editDraft.targetId} onChange={(e) => setEditDraft((d) => ({ ...d, targetId: e.target.value }))} className="h-9">{conceptOptions.filter((c) => c.id !== editDraft.sourceId).map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}</Select></Td>
                            <Td align="right" className="pr-4"><div className="inline-flex gap-1"><Button variant="primary" size="sm" iconLeft={Check} onClick={saveEdit}>Save</Button><Button variant="ghost" size="sm" iconLeft={X} onClick={() => setEditingId(null)}>Cancel</Button></div></Td>
                          </Tr>
                        ) : (
                          <Tr key={rel.id} hover>
                            <Td className="pl-4 font-medium ps-10">{conceptLabel(rel.sourceId)}</Td>
                            <Td><span className="inline-flex items-center gap-1.5"><Badge tone="primary">{rel.type}</Badge><Icon icon={ArrowRight} size={13} className="text-ink-3" /></span><span className="mt-1 block"><Badge tone={rel.verificationStatus === 'verified' ? 'success' : 'warning'}>{rel.verificationStatus ?? 'needs evidence'}</Badge></span></Td>
                            <Td className="text-ink-2">{conceptLabel(rel.targetId)}</Td>
                            <Td align="right" className="pr-4"><div className="inline-flex gap-1"><Button variant="ghost" size="sm" iconLeft={Pencil} onClick={() => startEdit(rel)}>Edit</Button><Button variant="ghost" size="sm" iconLeft={Trash2} className="hover:text-danger" onClick={() => removeRelation(rel.id)}>Remove</Button></div></Td>
                          </Tr>
                        ))}
                      </Fragment>
                    )
                  })}
                </Fragment>
              )
            })}
            {rows.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-14 text-center"><Icon icon={Search} size={20} className="mx-auto text-ink-3" /><p className="mt-2 text-[13px] font-medium text-ink">No relationships</p><p className="mt-1 text-[12px] text-ink-3">Add one above or bulk-import.</p></td></tr>
            )}
          </tbody>
        </Table>
      </Panel>
        </div>
      </div>

      {/* Bulk import dialog */}
      {importing && (
        <div className="fixed inset-0 z-50 grid items-end bg-ink/30 p-0 animate-fade sm:place-items-center sm:p-4" role="dialog" aria-modal="true" aria-label="Bulk import relationships" onMouseDown={() => setImporting(false)}>
          <Panel className="animate-pop flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-b-none pb-[env(safe-area-inset-bottom)] shadow-pop sm:max-w-xl sm:rounded-xl" onMouseDown={(e) => e.stopPropagation()}>
            <PanelHeader title="Bulk import relationships" icon={Upload} />
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-5">
              <ol className="list-inside list-decimal space-y-1 text-[12.5px] text-ink-2">
                <li>Write one relationship per line: <code className="rounded bg-inset px-1 font-mono text-[11px]">source | type | target</code>.</li>
                <li>Add a 4th token <code className="rounded bg-inset px-1 font-mono text-[11px]">both</code> to make it bidirectional (↔). Repeat a pair with a different type for multiple links.</li>
                <li>Use a Concept ID or its exact label for source/target.</li>
                <li>Lines starting with <code className="font-mono text-[11px]">#</code> are ignored. Duplicates are skipped.</li>
                <li>Press <b>Import</b> — you'll get a report of what was added, skipped, and rejected.</li>
              </ol>
              <Field label="Relationships">
                <Textarea value={importText} onChange={(e) => setImportText(e.target.value)} placeholder={template} className="min-h-[12rem] font-mono text-[12px]" />
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
