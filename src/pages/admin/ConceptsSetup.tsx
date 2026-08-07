import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Braces, BookOpenText, Plus, Save, Trash2, ChevronRight, Check } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Field, SearchInput, Select, TextInput, Textarea } from '@/components/ui/Field'
import { SubjectDot } from '@/components/ui/Subject'
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

export function ConceptsSetup() {
  const [graph, setGraph] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, initialConceptGraph)
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [selectedId, setSelectedId] = useState<string | null>(graph.concepts[0]?.id ?? null)
  const [creating, setCreating] = useState(false)

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
  const [nSubject, setNSubject] = useState(subjects[0]?.id ?? '')
  const [nTopic, setNTopic] = useState('')
  const [nAliases, setNAliases] = useState('')
  const [nDef, setNDef] = useState('')

  const q = query.trim().toLowerCase()
  const groups = useMemo(() => {
    const filtered = graph.concepts.filter(
      (c) => !q || c.label.toLowerCase().includes(q) || c.aliases.some((a) => a.toLowerCase().includes(q)) || c.definition.toLowerCase().includes(q),
    )
    // subjectId -> topicId -> concepts
    const bySubject = new Map<string, Map<string, Concept[]>>()
    filtered.forEach((concept) => {
      const { subjectId, topicId } = scopeOf(concept)
      if (!bySubject.has(subjectId)) bySubject.set(subjectId, new Map())
      const topics = bySubject.get(subjectId)!
      topics.set(topicId, [...(topics.get(topicId) ?? []), concept])
    })
    return subjects
      .map((subj) => ({ subj, topics: bySubject.get(subj.id) }))
      .filter((g) => g.topics && g.topics.size > 0)
      .concat(bySubject.has('unassigned') ? [{ subj: { id: 'unassigned', name: 'Unassigned', short: '—', color: '#9c9083' }, topics: bySubject.get('unassigned') }] : [])
  }, [graph.concepts, q])

  const topicTitle = (topicId: string) => libraryTopics.find((t) => t.id === topicId)?.title ?? 'Unassigned'
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

  const topicsForSubject = libraryTopics.filter((t) => t.subjectId === nSubject)

  function createConcept() {
    const label = nLabel.trim()
    if (!label) return
    const id = `med.concept.${slug(label)}`
    if (graph.concepts.some((c) => c.id === id)) return
    const topic = libraryTopics.find((t) => t.id === nTopic)
    const concept: Concept = {
      id,
      label,
      aliases: nAliases.split(',').map((a) => a.trim()).filter(Boolean),
      definition: nDef.trim(),
      articleIds: topic ? topic.subtopics.map((s) => s.id) : [],
      subjectId: nSubject,
      topicId: nTopic || undefined,
    }
    setGraph((g) => ({ ...g, concepts: [concept, ...g.concepts] }))
    setCreating(false)
    setNLabel(''); setNAliases(''); setNDef(''); setNTopic('')
    selectConcept(concept)
    const scope = scopeOf(concept)
    setExpanded((prev) => ({ ...prev, [`${scope.subjectId}:${scope.topicId}`]: true }))
  }

  return (
    <PageContainer>
      <PageHeader
        title="Concepts"
        description="Author the definition or note for every clinical concept, by subject and topic. Definitions surface inside a question — in the stem and answers — only after the student reveals the answer."
      />

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)]">
        {/* ---- Concept tree by subject → topic ---- */}
        <Panel className="flex min-h-[24rem] flex-col">
          <div className="flex flex-wrap items-center gap-2 border-b border-line p-3">
            <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search concepts…" className="min-w-0 flex-1" />
            <Button variant="primary" size="sm" iconLeft={Plus} onClick={() => setCreating(true)}>New concept</Button>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {groups.length === 0 ? (
              <p className="px-2 py-10 text-center text-[13px] text-ink-3">No concepts match “{query}”.</p>
            ) : (
              groups.map(({ subj, topics }) => (
                <div key={subj.id} className="mb-3">
                  <div className="mb-1 flex items-center gap-2 px-2">
                    <SubjectDot id={subj.id === 'unassigned' ? 'cvs' : subj.id} />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{subj.name}</span>
                  </div>
                  {[...topics!.entries()].map(([topicId, concepts]) => {
                    const key = `${subj.id}:${topicId}`
                    const open = expanded[key] ?? true
                    return (
                      <div key={topicId} className="mb-1">
                        <button
                          onClick={() => setExpanded((p) => ({ ...p, [key]: !open }))}
                          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] font-semibold text-ink hover:bg-inset"
                          aria-expanded={open}
                        >
                          <Icon icon={ChevronRight} size={14} className={cn('text-ink-3 transition-transform', open && 'rotate-90')} />
                          <span className="flex-1 truncate">{topicTitle(topicId)}</span>
                          <span className="tnum font-mono text-[10.5px] text-ink-3">{concepts.length}</span>
                        </button>
                        {open && (
                          <ul className="ml-[1.1rem] space-y-0.5 border-l border-line-2 pl-2">
                            {concepts.map((concept) => (
                              <li key={concept.id}>
                                <button
                                  onClick={() => selectConcept(concept)}
                                  className={cn(
                                    'flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left transition-colors',
                                    selectedId === concept.id ? 'bg-accent-tint text-accent-strong' : 'text-ink-2 hover:bg-inset hover:text-ink',
                                  )}
                                >
                                  <span className="truncate text-[13px] font-medium">{concept.label}</span>
                                  {!concept.definition && <Badge tone="warning">No definition</Badge>}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )
                  })}
                </div>
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

                {/* Curriculum placement — auto-derived visible IDs */}
                <div className="rounded-lg border border-line bg-surface-2/40 p-3">
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">Curriculum placement</p>
                  <div className="grid grid-cols-2 gap-1.5 font-mono text-[10.5px] text-ink-2">
                    <span>System: <span className="text-ink">{selected.systemId ?? '—'}</span></span>
                    <span>Topic: <span className="text-ink">{selected.topicTagId ?? '—'}</span></span>
                    <span>Subtopic: <span className="text-ink">{selected.subtopicId ?? '—'}</span></span>
                    <span>Micro: <span className="text-ink">{selected.microtopicId ?? '—'}</span></span>
                  </div>
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
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Subject">
                  <Select value={nSubject} onChange={(e) => { setNSubject(e.target.value); setNTopic('') }}>
                    {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </Select>
                </Field>
                <Field label="Topic">
                  <Select value={nTopic} onChange={(e) => setNTopic(e.target.value)}>
                    <option value="">— Select topic —</option>
                    {topicsForSubject.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
                  </Select>
                </Field>
              </div>
              <Field label="Also matches (aliases)" hint="Comma-separated.">
                <TextInput value={nAliases} onChange={(e) => setNAliases(e.target.value)} placeholder="alias one, alias two" />
              </Field>
              <Field label="Definition / note">
                <Textarea value={nDef} onChange={(e) => setNDef(e.target.value)} placeholder="Write the definition or note…" />
              </Field>
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-line bg-surface-2/40 px-5 py-3">
              <Button variant="ghost" onClick={() => setCreating(false)}>Cancel</Button>
              <Button variant="primary" iconLeft={Plus} onClick={createConcept} disabled={!nLabel.trim()}>Create concept</Button>
            </div>
          </Panel>
        </div>
      )}
    </PageContainer>
  )
}
