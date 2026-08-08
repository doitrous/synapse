import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Braces, BookOpenText, Plus, Save, Trash2, ChevronRight, Check, Upload, TriangleAlert, Pencil } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Field, SearchInput, Select, TextInput, Textarea } from '@/components/ui/Field'
import { cn } from '@/lib/cn'
import { usePersistentState } from '@/lib/usePersistentState'
import {
  CONCEPT_STORAGE_KEY,
  initialConceptGraph,
  type Concept,
  type ConceptGraph,
} from '@/data/conceptGraph'
import { allSubtopics, libraryTopics } from '@/data/library'
import { subjects } from '@/data/student'
import { useTaxonomyTree, type TaxSysNode } from '@/data/taxonomyStore'
import { TaxonomyPlacementPicker, type TaxonomyPlacement } from '@/components/admin/TaxonomyPlacementPicker'

/** Resolve a concept's subject + topic — explicit fields first, else via articleIds. */
function scopeOf(concept: Concept): { subjectId: string; topicId: string } {
  if (concept.subjectId && concept.topicId) return { subjectId: concept.subjectId, topicId: concept.topicId }
  for (const articleId of concept.articleIds) {
    const sub = allSubtopics.find((s) => s.id === articleId)
    if (sub) return { subjectId: sub.subjectId, topicId: sub.topicId }
  }
  return { subjectId: concept.subjectId ?? 'unassigned', topicId: concept.topicId ?? 'unassigned' }
}

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

/** A node in the concept placement tree. */
interface TreeNode { key: string; label: string; level: string; nodeId: string; children: Map<string, TreeNode>; concepts: Concept[] }

function countIn(node: TreeNode): number {
  return node.concepts.length + [...node.children.values()].reduce((n, c) => n + countIn(c), 0)
}

/** Recursive collapsible branch with an editable label (topic/subtopic/…). */
function ConceptTreeBranch({ node, depth, expanded, onToggle, selectedId, onSelect, onRename }: {
  node: TreeNode
  depth: number
  expanded: Record<string, boolean>
  onToggle: (key: string) => void
  selectedId: string | null
  onSelect: (c: Concept) => void
  onRename: (level: string, nodeId: string, title: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(node.label)
  const open = expanded[node.key] ?? true
  const total = countIn(node)
  const canRename = node.level !== 'system' && node.nodeId !== 'unassigned'
  return (
    <div style={{ paddingInlineStart: depth === 0 ? 0 : 10 }} className={depth === 0 ? '' : 'border-s border-line-2'}>
      <div className="group/branch flex items-center gap-1.5 rounded-md px-2 py-1.5 hover:bg-inset/50">
        <button onClick={() => onToggle(node.key)} className="grid size-5 place-items-center text-ink-3 hover:text-ink" aria-expanded={open}>
          <Icon icon={ChevronRight} size={14} className={cn('transition-transform', open && 'rotate-90')} />
        </button>
        {editing ? (
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
            <ConceptTreeBranch key={child.key} node={child} depth={depth + 1} expanded={expanded} onToggle={onToggle} selectedId={selectedId} onSelect={onSelect} onRename={onRename} />
          ))}
          {node.concepts.length > 0 && (
            <ul className="ms-2 space-y-0.5 border-s border-line-2 ps-2">
              {node.concepts.map((concept) => (
                <li key={concept.id}>
                  <button
                    onClick={() => onSelect(concept)}
                    className={cn('flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left transition-colors', selectedId === concept.id ? 'bg-accent-tint text-accent-strong' : 'text-ink-2 hover:bg-inset hover:text-ink')}
                  >
                    <span className="truncate text-[12.5px] font-medium">{concept.label}</span>
                    {!concept.definition && <Badge tone="warning">No definition</Badge>}
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

export function ConceptsSetup() {
  const [graph, setGraph] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, initialConceptGraph)
  const [taxonomy, setTaxonomy] = useTaxonomyTree()
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
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
  const [nStatus, setNStatus] = useState<Concept['status']>('active')
  const [nBlueprint, setNBlueprint] = useState('')
  const [nClinical, setNClinical] = useState('')
  const [nAcademic, setNAcademic] = useState('')

  /** Article IDs implied by a placement's deepest node (for auto-linking). */
  const articleIdsFor = (p: TaxonomyPlacement): string[] => {
    const sys = taxonomy.find((s) => s.sysId === p.systemId)
    const top = sys?.topics.find((t) => t.tpcId === p.topicTagId)
    const sub = top?.subs.find((s) => s.subId === p.subtopicId)
    if (sub) return [sub.id]
    if (top) return top.subs.map((s) => s.id)
    return []
  }

  const q = query.trim().toLowerCase()

  /** Resolve a concept's placement path (system → … → deepest) from the taxonomy. */
  const pathOf = (concept: Concept): TreeNode[] => {
    const legacy = scopeOf(concept)
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

  const tree = useMemo(() => {
    const filtered = graph.concepts.filter(
      (c) => !q || c.label.toLowerCase().includes(q) || c.aliases.some((a) => a.toLowerCase().includes(q)) || c.definition.toLowerCase().includes(q),
    )
    const roots = new Map<string, TreeNode>()
    filtered.forEach((concept) => {
      const path = pathOf(concept)
      let level = roots
      let node: TreeNode | undefined
      path.forEach((step) => {
        if (!level.has(step.key)) level.set(step.key, { ...step, children: new Map(), concepts: [] })
        node = level.get(step.key)!
        level = node.children
      })
      node?.concepts.push(concept)
    })
    // Order roots by subjects order, unassigned last.
    const order = [...subjects.map((s) => `sys:${s.id}`), 'sys:unassigned']
    return [...roots.values()].sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graph.concepts, q, taxonomy])

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

  const withQuestions = () => graph.concepts.length
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
    setNLabel(''); setNAliases(''); setNDef(''); setNPlacement({}); setNPitfalls(''); setNStatus('active'); setNBlueprint(''); setNClinical(''); setNAcademic('')
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
      const status = (['active', 'inactive', 'under review'].includes(fields.status) ? fields.status : 'active') as Concept['status']
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

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)]">
        {/* ---- Concept tree by subject → topic ---- */}
        <Panel className="flex min-h-[24rem] flex-col">
          <div className="flex flex-wrap items-center gap-2 border-b border-line p-3">
            <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search concepts…" className="min-w-0 flex-1" />
            <Button variant="primary" size="sm" iconLeft={Plus} onClick={() => setCreating(true)}>New concept</Button>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {tree.length === 0 ? (
              <p className="px-2 py-10 text-center text-[13px] text-ink-3">No concepts match “{query}”.</p>
            ) : (
              tree.map((node) => (
                <ConceptTreeBranch
                  key={node.key}
                  node={node}
                  depth={0}
                  expanded={expanded}
                  onToggle={(key) => setExpanded((p) => ({ ...p, [key]: !(p[key] ?? true) }))}
                  selectedId={selectedId}
                  onSelect={selectConcept}
                  onRename={renameBranch}
                />
              ))
            )}
          </div>
          <div className="border-t border-line px-4 py-2.5 text-[12px] text-ink-3">
            <span className="tnum font-mono font-medium text-ink-2">{withQuestions()}</span> concepts ·{' '}
            <span className="tnum font-mono font-medium text-ink-2">{graph.concepts.filter((c) => !c.definition).length}</span> without a definition
          </div>
        </Panel>

        {/* ---- Editor ---- */}
        <div className="space-y-4 lg:sticky lg:top-[4.5rem]">
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

                {/* Curriculum placement — editable, from the single Subjects & Topics source */}
                <div className="rounded-lg border border-line bg-surface-2/40 p-3">
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">Curriculum placement (Subjects & Topics)</p>
                  <TaxonomyPlacementPicker
                    tree={taxonomy}
                    compact
                    value={{ subjectId: draft.subjectId, systemId: draft.systemId, topicTagId: draft.topicTagId, subtopicId: draft.subtopicId, microtopicId: draft.microtopicId, nanotopicId: draft.nanotopicId }}
                    onChange={(p) => patch({ subjectId: p.subjectId, systemId: p.systemId, topicTagId: p.topicTagId, subtopicId: p.subtopicId, microtopicId: p.microtopicId, nanotopicId: p.nanotopicId })}
                  />
                </div>

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
                      <button type="button" onClick={() => patch({ examWeightByYear: { OMS_Y2: 0.5, OMS_Y3: 0.5 } })} className="text-[12px] font-medium text-accent hover:text-accent-strong">+ Add year weights</button>
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

                {/* Approved resources & articles (auto-maintained) */}
                <div className="grid grid-cols-2 gap-1.5 font-mono text-[10.5px] text-ink-2">
                  <span>Approved files: <span className="text-ink">{selected.approvedFileResourceIds?.length ?? 0}</span></span>
                  <span>Approved videos: <span className="text-ink">{selected.approvedVideoResourceIds?.length ?? 0}</span></span>
                  <span className="col-span-2">Related articles: <span className="text-ink">{selected.relatedArticleIds?.length ?? selected.articleIds.length}</span></span>
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
                <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">Placement (Subjects & Topics)</p>
                <TaxonomyPlacementPicker tree={taxonomy} value={nPlacement} onChange={setNPlacement} />
              </div>
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
