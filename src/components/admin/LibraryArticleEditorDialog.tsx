import { useEffect, useRef, useState } from 'react'
import { BookOpen, CircleAlert, Flag, GitFork, Lightbulb, Link2, ListChecks, Plus, Trash2, X } from 'lucide-react'
import type { Status } from '@/data/admin'
import {
  CONCEPT_RELATIONS,
  STATEMENT_RELATIONS,
  type Concept,
  type ConceptGraph,
  type ConceptRelationType,
  type StatementRelationType,
} from '@/data/conceptGraph'
import type { ArticleAuthoringData, ManagedContentItem } from '@/data/contentControl'
import { emptySections, newId, type ArticleSection } from '@/data/userLibrary'
import { libraryTopics } from '@/data/library'
import { subjects, getSubject } from '@/data/student'
import { universities, YEARS } from '@/data/universities'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Field, Select, Textarea, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { ChapterMark } from '@/components/ui/ChapterMark'

const STATUSES: Status[] = ['Draft', 'In review', 'Published', 'Archived']

function blankArticleData(): ArticleAuthoringData {
  return { summary: '', body: '', sections: emptySections(), holdThese: [''], loseTheMark: [''], questionIds: [], resourceIds: [], annotations: [] }
}

/** Named-section editor — the same clinical scaffold students author with. */
function SectionsEditor({ sections, onChange }: { sections: ArticleSection[]; onChange: (next: ArticleSection[]) => void }) {
  return (
    <div className="space-y-3">
      {sections.map((section, index) => (
        <div key={section.id} className="rounded-xl border border-line bg-surface-2/40 p-3">
          <div className="flex items-center gap-2">
            <input
              value={section.heading}
              onChange={(e) => onChange(sections.map((s, i) => (i === index ? { ...s, heading: e.target.value } : s)))}
              placeholder="Section heading"
              className="h-9 flex-1 rounded-md border border-line bg-surface px-2.5 text-[13.5px] font-semibold text-ink focus:border-accent focus:outline-none"
            />
            <button type="button" onClick={() => onChange(sections.filter((_, i) => i !== index))} className="grid size-9 shrink-0 place-items-center rounded-md text-ink-3 hover:bg-danger-tint hover:text-danger" aria-label={`Remove section ${index + 1}`}><Icon icon={Trash2} size={15} /></button>
          </div>
          <Textarea value={section.body} onChange={(e) => onChange(sections.map((s, i) => (i === index ? { ...s, body: e.target.value } : s)))} placeholder="Write this section…" className="mt-2 min-h-24 text-[14px] leading-relaxed" />
        </div>
      ))}
      <Button type="button" size="sm" variant="secondary" iconLeft={Plus} onClick={() => onChange([...sections, { id: newId('sec'), heading: '', body: '' }])}>Add section</Button>
    </div>
  )
}

function blankArticle(): ManagedContentItem {
  return { id: '', kind: 'article', title: '', subjectId: subjects[0]?.id ?? 'cvs', status: 'Draft', owner: 'Admin team', updatedAt: new Date().toISOString(), fields: { Topic: '', Summary: '', 'Reading time': '8', 'Key point': '' }, articleData: blankArticleData() }
}

function StringListEditor({ values, onChange, addLabel, placeholder }: { values: string[]; onChange: (values: string[]) => void; addLabel: string; placeholder: string }) {
  return (
    <div className="space-y-2">
      {values.map((value, index) => (
        <div key={index} className="flex items-start gap-1.5"><Textarea aria-label={`${addLabel} ${index + 1}`} className="min-h-16 flex-1 text-[12.5px]" value={value} onChange={(event) => onChange(values.map((item, itemIndex) => itemIndex === index ? event.target.value : item))} placeholder={placeholder} /><button type="button" className="grid size-10 shrink-0 place-items-center rounded-lg text-ink-3 hover:bg-danger-tint hover:text-danger" aria-label={`Remove ${addLabel.toLowerCase()} ${index + 1}`} onClick={() => onChange(values.filter((_, itemIndex) => itemIndex !== index))}><Icon icon={Trash2} size={15} /></button></div>
      ))}
      <Button type="button" size="sm" variant="ghost" iconLeft={Plus} onClick={() => onChange([...values, ''])}>{addLabel}</Button>
    </div>
  )
}

function LinkCheckList({ items, selected, onChange }: { items: Array<{ id: string; title: string }>; selected: string[]; onChange: (ids: string[]) => void }) {
  return <div className="max-h-52 space-y-1 overflow-y-auto pr-1">{items.map((item) => <label key={item.id} className="flex min-h-10 cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-[11.5px] text-ink-2 hover:bg-inset"><input type="checkbox" checked={selected.includes(item.id)} onChange={() => onChange(selected.includes(item.id) ? selected.filter((id) => id !== item.id) : [...selected, item.id])} className="size-4 accent-[var(--color-accent)]" /><span className="line-clamp-2">{item.title}</span></label>)}</div>
}

export function LibraryArticleEditorDialog({ open, item, contentItems, graph, onGraphChange, onClose, onSave }: { open: boolean; item: ManagedContentItem | null; contentItems: ManagedContentItem[]; graph: ConceptGraph; onGraphChange: (graph: ConceptGraph) => void; onClose: () => void; onSave: (item: ManagedContentItem) => void }) {
  const [draft, setDraft] = useState<ManagedContentItem>(() => blankArticle())
  const [quote, setQuote] = useState('')
  const [annotationConcept, setAnnotationConcept] = useState('')
  const [annotationRelation, setAnnotationRelation] = useState<StatementRelationType>('definition_of')
  const [annotationBlock, setAnnotationBlock] = useState<'summary' | 'body'>('body')
  const [conceptId, setConceptId] = useState('med.concept.')
  const [conceptLabel, setConceptLabel] = useState('')
  const [conceptDefinition, setConceptDefinition] = useState('')
  const [relationSource, setRelationSource] = useState('')
  const [relationTarget, setRelationTarget] = useState('')
  const [relationType, setRelationType] = useState<ConceptRelationType>('associated_with')
  const graphRef = useRef(graph)
  graphRef.current = graph

  useEffect(() => {
    if (!open) return
    const next = item ? { ...item, fields: { ...item.fields }, articleData: item.articleData ? structuredClone(item.articleData) : blankArticleData() } : blankArticle()
    setDraft(next)
    const currentGraph = graphRef.current
    setAnnotationConcept(currentGraph.concepts[0]?.id ?? '')
    setRelationSource(currentGraph.concepts[0]?.id ?? '')
    setRelationTarget(currentGraph.concepts[1]?.id ?? currentGraph.concepts[0]?.id ?? '')
  }, [item, open])

  useEffect(() => {
    if (!open) return
    const handler = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, open])

  if (!open) return null

  const data = draft.articleData ?? blankArticleData()
  const subject = getSubject(draft.subjectId)
  const questionItems = contentItems.filter((content) => content.kind === 'question')
  const resourceItems = contentItems.filter((content) => content.kind === 'resource')
  const hasBody = (data.sections ?? []).some((s) => s.heading.trim() || s.body.trim()) || data.body.trim()
  const valid = draft.title.trim() && draft.fields.Topic?.trim() && data.summary.trim() && hasBody
  const chapterIndex = Math.max(0, libraryTopics.filter((topic) => topic.subjectId === draft.subjectId).findIndex((topic) => topic.title === draft.fields.Topic))

  function updateData(updater: (current: ArticleAuthoringData) => ArticleAuthoringData) {
    setDraft((current) => ({ ...current, articleData: updater(current.articleData ?? blankArticleData()) }))
  }

  function captureSelection(block: 'summary' | 'body') {
    const element = document.getElementById(block === 'summary' ? 'article-summary' : 'article-body') as HTMLTextAreaElement | null
    if (!element) return
    const selected = element.value.slice(element.selectionStart, element.selectionEnd).trim()
    setAnnotationBlock(block)
    if (selected) setQuote(selected)
  }

  function addAnnotation() {
    if (!quote.trim() || !annotationConcept) return
    updateData((current) => ({ ...current, annotations: [...current.annotations, { id: `annotation-${Date.now()}`, quote: quote.trim(), conceptId: annotationConcept, relation: annotationRelation, block: annotationBlock }] }))
    onGraphChange({ ...graph, concepts: graph.concepts.map((concept) => concept.id === annotationConcept && draft.id && !concept.articleIds.includes(draft.id) ? { ...concept, articleIds: [...concept.articleIds, draft.id] } : concept) })
    setQuote('')
  }

  function createConcept() {
    const id = conceptId.trim()
    const label = conceptLabel.trim()
    if (!id || !label || graph.concepts.some((concept) => concept.id === id)) return
    const concept: Concept = { id, label, aliases: [], definition: conceptDefinition.trim(), articleIds: draft.id ? [draft.id] : [] }
    onGraphChange({ ...graph, concepts: [...graph.concepts, concept] })
    setAnnotationConcept(id)
    setRelationTarget(id)
    setConceptId('med.concept.')
    setConceptLabel('')
    setConceptDefinition('')
  }

  function createRelation() {
    if (!relationSource || !relationTarget || relationSource === relationTarget) return
    onGraphChange({ ...graph, relations: [...graph.relations, { id: `relation-${Date.now()}`, sourceId: relationSource, type: relationType, targetId: relationTarget }] })
  }

  return (
    <div className="fixed inset-0 z-50 bg-paper" role="dialog" aria-modal="true" aria-labelledby="article-editor-title">
      <form className="flex h-full flex-col pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]" onSubmit={(event) => { event.preventDefault(); if (!valid) return; const base = draft.articleData ?? blankArticleData(); const sections = (base.sections ?? []).map((s) => ({ ...s, heading: s.heading.trim(), body: s.body.trim() })).filter((s) => s.heading || s.body); const finalData = { ...base, sections, body: base.body || sections.map((s) => `${s.heading}\n${s.body}`).join('\n\n') }; onSave({ ...draft, id: draft.id || `article-${Date.now()}`, title: draft.title.trim(), updatedAt: new Date().toISOString(), fields: { ...draft.fields, Summary: finalData.summary, 'Key point': finalData.holdThese[0] ?? '' }, articleData: finalData }) }}>
        <header className="flex shrink-0 flex-wrap items-center gap-2 border-b border-line bg-surface px-3 py-2.5 sm:h-16 sm:flex-nowrap sm:gap-3 sm:px-5 sm:py-0">
          <span className="grid size-9 place-items-center rounded-lg bg-accent-tint text-accent-strong"><Icon icon={BookOpen} size={17} /></span>
          <div className="min-w-0 flex-1"><h2 id="article-editor-title" className="font-serif text-[18px] font-semibold text-ink">{item ? 'Edit library article' : 'Add library article'}</h2><p className="text-[11.5px] text-ink-3">Published-layout editor · canonical concept graph</p></div>
          <button type="button" onClick={onClose} className="grid size-10 place-items-center rounded-lg text-ink-3 hover:bg-inset hover:text-ink" aria-label="Close article editor"><Icon icon={X} size={19} /></button>
          <div className="flex basis-full items-center gap-2 sm:contents"><Select value={draft.status} onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value as Status }))} className="w-32 sm:w-36">{STATUSES.map((status) => <option key={status}>{status}</option>)}</Select><Button type="button" className="ml-auto sm:ml-0" variant="ghost" onClick={onClose}>Cancel</Button><Button type="submit" variant="primary" disabled={!valid}>{item ? 'Save changes' : 'Add article'}</Button></div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:grid lg:grid-cols-[16rem_minmax(0,1fr)_21rem] lg:overflow-hidden">
          <aside className="order-2 border-b border-line bg-surface p-4 lg:order-none lg:overflow-y-auto lg:border-b-0 lg:border-r">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">Article settings</p>
            <div className="space-y-4"><Field label="Subject" htmlFor="article-subject"><Select id="article-subject" value={draft.subjectId} onChange={(event) => setDraft((current) => ({ ...current, subjectId: event.target.value }))}>{subjects.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</Select></Field><Field label="Chapter" htmlFor="article-topic"><TextInput id="article-topic" value={draft.fields.Topic ?? ''} onChange={(event) => setDraft((current) => ({ ...current, fields: { ...current.fields, Topic: event.target.value } }))} /></Field><Field label="Reading time" htmlFor="article-reading"><TextInput id="article-reading" type="number" min={1} value={draft.fields['Reading time'] ?? '8'} onChange={(event) => setDraft((current) => ({ ...current, fields: { ...current.fields, 'Reading time': event.target.value } }))} /></Field><Field label="Content owner" htmlFor="article-owner"><TextInput id="article-owner" value={draft.owner} onChange={(event) => setDraft((current) => ({ ...current, owner: event.target.value }))} /></Field></div>

            {/* Scope & concept tags */}
            <div className="mt-6 border-t border-line pt-5">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">Applies to</p>
              <p className="mb-1 text-[11px] font-medium text-ink-2">Universities</p>
              <LinkCheckList items={universities.map((u) => ({ id: u.id, title: `${u.short} · ${u.name}` }))} selected={data.universityIds ?? []} onChange={(universityIds) => updateData((current) => ({ ...current, universityIds }))} />
              <p className="mb-1 mt-3 text-[11px] font-medium text-ink-2">Years</p>
              <LinkCheckList items={YEARS.map((y) => ({ id: y, title: y }))} selected={data.yearIds ?? []} onChange={(yearIds) => updateData((current) => ({ ...current, yearIds }))} />
              <div className="mt-3 space-y-2.5">
                <Field label="Module ID(s)" htmlFor="article-modules" hint="Comma-separated."><TextInput id="article-modules" value={(data.moduleIds ?? []).join(', ')} onChange={(event) => updateData((current) => ({ ...current, moduleIds: event.target.value.split(',').map((s) => s.trim()).filter(Boolean) }))} placeholder="cvs, MOD_CVS" /></Field>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Subtopic ID" htmlFor="article-sub"><TextInput id="article-sub" value={data.subtopicId ?? ''} onChange={(event) => updateData((current) => ({ ...current, subtopicId: event.target.value }))} placeholder="SUB_*" /></Field>
                  <Field label="Microtopic ID" htmlFor="article-mic"><TextInput id="article-mic" value={data.microtopicId ?? ''} onChange={(event) => updateData((current) => ({ ...current, microtopicId: event.target.value }))} placeholder="MIC_*" /></Field>
                </div>
              </div>
            </div>

            {/* Related concepts — accepts direct selection here, or concepts that link back */}
            <div className="mt-6 border-t border-line pt-5">
              <div className="flex items-center gap-2"><Icon icon={GitFork} size={15} className="text-accent" /><p className="text-[12.5px] font-bold text-ink">Related concepts</p></div>
              <p className="mb-2 mt-1 text-[11px] leading-snug text-ink-3">Concepts this article discusses. A concept that lists this article also appears here automatically.</p>
              <LinkCheckList
                items={graph.concepts.map((c) => ({ id: c.id, title: c.label }))}
                selected={[...new Set([...(data.relatedConceptIds ?? []), ...graph.concepts.filter((c) => (c.relatedArticleIds ?? c.articleIds).includes(draft.id)).map((c) => c.id)])]}
                onChange={(relatedConceptIds) => updateData((current) => ({ ...current, relatedConceptIds }))}
              />
            </div>

            <div className="mt-6 border-t border-line pt-5"><div className="flex items-center gap-2"><Icon icon={GitFork} size={15} className="text-accent" /><p className="text-[12.5px] font-bold text-ink">Create canonical concept</p></div><div className="mt-3 space-y-2"><TextInput aria-label="Canonical concept ID" value={conceptId} onChange={(event) => setConceptId(event.target.value)} placeholder="med.concept.example" /><TextInput aria-label="Concept label" value={conceptLabel} onChange={(event) => setConceptLabel(event.target.value)} placeholder="Concept label" /><Textarea aria-label="Concept definition" className="min-h-20" value={conceptDefinition} onChange={(event) => setConceptDefinition(event.target.value)} placeholder="Canonical definition" /><Button type="button" size="sm" className="w-full" iconLeft={Plus} onClick={createConcept}>Create concept</Button></div></div>

            <div className="mt-6 border-t border-line pt-5"><p className="text-[12.5px] font-bold text-ink">Relate two concepts</p><div className="mt-3 space-y-2"><Select aria-label="Source concept" value={relationSource} onChange={(event) => setRelationSource(event.target.value)}>{graph.concepts.map((concept) => <option key={concept.id} value={concept.id}>{concept.label} · {concept.id}</option>)}</Select><Select aria-label="Concept relationship" value={relationType} onChange={(event) => setRelationType(event.target.value as ConceptRelationType)}>{CONCEPT_RELATIONS.map((relation) => <option key={relation}>{relation}</option>)}</Select><Select aria-label="Target concept" value={relationTarget} onChange={(event) => setRelationTarget(event.target.value)}>{graph.concepts.map((concept) => <option key={concept.id} value={concept.id}>{concept.label} · {concept.id}</option>)}</Select><Button type="button" size="sm" className="w-full" iconLeft={Link2} onClick={createRelation}>Add relationship</Button></div></div>
          </aside>

          <main className="order-1 border-b border-line lg:order-none lg:overflow-y-auto lg:border-b-0">
            <article className="mx-auto max-w-[50rem] px-4 py-7 sm:px-6 sm:py-10 lg:px-10">
              <nav className="flex items-center gap-2 text-[12.5px] text-ink-3"><span className="inline-flex items-center gap-1.5 font-medium text-ink-2"><ChapterMark subjectId={subject.id} index={chapterIndex + 1} compact />{subject.name}</span><span>›</span><span>{draft.fields.Topic || 'Chapter'}</span><Badge tone="warning">Editing</Badge></nav>
              <TextInput aria-label="Article title" className="mt-4 h-auto border-transparent bg-transparent px-0 font-serif text-[30px] font-semibold leading-tight tracking-[-0.02em] shadow-none focus:border-line" value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} placeholder="Article title" />
              <div className="mt-3 flex items-center gap-3 text-[12px] text-ink-3"><span>{draft.fields['Reading time'] || '8'} min read</span><span>·</span><span>{draft.status}</span></div>

              <div className="mt-7"><div className="mb-1.5 flex items-center justify-between"><label htmlFor="article-summary" className="text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">Summary</label><Button type="button" size="sm" variant="ghost" onClick={() => captureSelection('summary')}>Use selected text</Button></div><Textarea id="article-summary" className="min-h-32 border-transparent bg-transparent px-0 text-[16.5px] leading-[1.65] shadow-none focus:border-line" value={data.summary} onChange={(event) => updateData((current) => ({ ...current, summary: event.target.value }))} /></div>
              <div className="mt-5 border-t border-line pt-5"><div className="mb-2.5 flex items-center justify-between"><label className="text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">Sections</label><span className="text-[11px] text-ink-3">Rename or remove to fit this article</span></div><SectionsEditor sections={data.sections ?? []} onChange={(sections) => updateData((current) => ({ ...current, sections }))} /></div>

              {data.annotations.length > 0 && <section className="mt-8 rounded-xl border border-accent-line bg-accent-tint/35 p-4"><div className="flex items-center gap-2"><Icon icon={Flag} size={15} className="text-accent" /><h3 className="text-[13px] font-bold text-ink">Concept annotations</h3></div><ul className="mt-3 divide-y divide-accent-line">{data.annotations.map((annotation) => <li key={annotation.id} className="flex gap-3 py-2.5"><div className="min-w-0 flex-1"><p className="text-[12.5px] text-ink">“{annotation.quote}”</p><p className="mt-0.5 font-mono text-[10.5px] text-accent-strong">{annotation.relation} → {annotation.conceptId}</p></div><button type="button" className="grid size-9 place-items-center text-ink-3 hover:text-danger" aria-label="Remove annotation" onClick={() => updateData((current) => ({ ...current, annotations: current.annotations.filter((item) => item.id !== annotation.id) }))}><Icon icon={Trash2} size={14} /></button></li>)}</ul></section>}
            </article>
          </main>

          <aside className="order-3 bg-paper p-4 lg:order-none lg:overflow-y-auto lg:border-l lg:border-line">
            <section className="rounded-xl border border-line bg-surface p-4 shadow-panel"><div className="flex items-center gap-2"><Icon icon={Lightbulb} size={15} className="text-accent" /><h3 className="text-[13px] font-bold text-ink">Hold these</h3></div><div className="mt-3"><StringListEditor values={data.holdThese} onChange={(holdThese) => updateData((current) => ({ ...current, holdThese }))} addLabel="Add key point" placeholder="What must the student retain?" /></div></section>
            <section className="mt-3 rounded-xl border border-line bg-surface p-4 shadow-panel"><div className="flex items-center gap-2"><Icon icon={CircleAlert} size={15} className="text-danger" /><h3 className="text-[13px] font-bold text-ink">Where people lose the mark</h3></div><div className="mt-3"><StringListEditor values={data.loseTheMark} onChange={(loseTheMark) => updateData((current) => ({ ...current, loseTheMark }))} addLabel="Add trap" placeholder="Common error or misconception" /></div></section>
            <section className="mt-3 rounded-xl border border-line bg-surface p-4 shadow-panel"><div className="flex items-center gap-2"><Icon icon={ListChecks} size={15} className="text-accent" /><h3 className="text-[13px] font-bold text-ink">Questions that test this</h3></div><div className="mt-2"><LinkCheckList items={questionItems.map((content) => ({ id: content.id, title: content.title }))} selected={data.questionIds} onChange={(questionIds) => updateData((current) => ({ ...current, questionIds }))} /></div></section>
            <section className="mt-3 rounded-xl border border-line bg-surface p-4 shadow-panel"><h3 className="text-[13px] font-bold text-ink">Resources that teach it</h3><div className="mt-2"><LinkCheckList items={resourceItems.map((content) => ({ id: content.id, title: content.title }))} selected={data.resourceIds} onChange={(resourceIds) => updateData((current) => ({ ...current, resourceIds }))} /></div></section>

            <section className="mt-3 rounded-xl border border-accent-line bg-accent-tint/35 p-4"><div className="flex items-center gap-2"><Icon icon={Flag} size={15} className="text-accent" /><h3 className="text-[13px] font-bold text-ink">Tag selected statement</h3></div><p className="mt-1 text-[11px] leading-relaxed text-ink-3">Select text in the summary or article, press “Use selected text,” then link it to an existing canonical ID.</p><div className="mt-3 space-y-2"><Textarea aria-label="Selected statement" className="min-h-20" value={quote} onChange={(event) => setQuote(event.target.value)} placeholder="Selected word, sentence, or statement" /><Select aria-label="Statement relationship" value={annotationRelation} onChange={(event) => setAnnotationRelation(event.target.value as StatementRelationType)}>{STATEMENT_RELATIONS.map((relation) => <option key={relation}>{relation}</option>)}</Select><Select aria-label="Canonical concept" value={annotationConcept} onChange={(event) => setAnnotationConcept(event.target.value)}>{graph.concepts.map((concept) => <option key={concept.id} value={concept.id}>{concept.label} · {concept.id}</option>)}</Select><Button type="button" className="w-full" size="sm" iconLeft={Flag} disabled={!quote.trim() || !annotationConcept} onClick={addAnnotation}>Tag with canonical ID</Button></div></section>

            <section className="mt-3 rounded-xl border border-line bg-surface p-4 shadow-panel"><div className="flex items-center justify-between"><h3 className="text-[13px] font-bold text-ink">Concept relationships</h3><Badge tone="outline">{graph.relations.length}</Badge></div><ul className="mt-2 max-h-56 divide-y divide-line overflow-y-auto">{graph.relations.map((relation) => <li key={relation.id} className="py-2 font-mono text-[9.5px] leading-relaxed text-ink-2">{relation.sourceId}<br /><span className="text-accent-strong">{relation.type}</span> → {relation.targetId}</li>)}</ul></section>
          </aside>
        </div>
      </form>
    </div>
  )
}
