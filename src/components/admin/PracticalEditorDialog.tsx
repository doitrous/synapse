import { useEffect, useId, useMemo, useState, type ReactNode } from 'react'
import { BookOpen, Check, ClipboardList, Flag, FlaskConical, Plus, Stethoscope, Trash2, X } from 'lucide-react'
import type { Status } from '@/data/admin'
import {
  type ActorBriefSectionDraft,
  type CaseAuthoringData,
  type ClinicalDecisionDraft,
  type LabAuthoringData,
  type LabQuestionDraft,
  type ManagedContentItem,
  type OsceAuthoringData,
  type PracticalAnswerDraft,
  type PracticalAuthoringData,
  type PracticalConceptTags,
  type PracticalDifficulty,
  type PracticalMarkSectionDraft,
  emptyPracticalCommon,
} from '@/data/contentControl'
import { DIFFICULTIES } from '@/data/qbank'
import { getCaseDetail, getLabDetail, getOsceDetail } from '@/data/practicalContent'
import { subjects } from '@/data/subjects'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Field, Select, Textarea, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { Panel } from '@/components/ui/Panel'
import { cn } from '@/lib/cn'
import type { ConceptGraph } from '@/data/conceptGraph'
import { EntityPicker, type PickerOption } from '@/components/admin/EntityPicker'
import { ContentSourceFields } from '@/components/admin/ContentSourceFields'
import { conceptOptions, contentOptions } from '@/components/admin/pickerOptions'
import { useTaxonomyTree } from '@/data/taxonomyStore'
import { useMedicalTaxonomy } from '@/data/medicalTaxonomyStore'

const STATUSES: Status[] = ['Draft', 'In review', 'Published', 'Archived']
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

function newAnswer(index: number): PracticalAnswerDraft {
  return { id: `answer-${Date.now()}-${index}`, text: '', explanation: '', correct: index === 0 }
}

function ensureAnswers(answers: PracticalAnswerDraft[]) {
  return [...answers, ...Array.from({ length: Math.max(0, 4 - answers.length) }, (_, index) => newAnswer(answers.length + index))].slice(0, 6)
}

function newOsce(): OsceAuthoringData {
  return { ...emptyPracticalCommon(), format: 'osce', candidateInstructions: '', actorOpening: '', actorSections: [{ id: `section-${Date.now()}`, label: 'Who you are', content: '' }], actorFlags: [], markSections: [{ id: `marks-${Date.now()}`, title: 'Opening and structure', marks: 20, items: [{ id: `mark-${Date.now()}`, text: '' }] }] }
}

function newCase(): CaseAuthoringData {
  return { ...emptyPracticalCommon(), format: 'case', decisions: [{ id: `decision-${Date.now()}`, title: 'Immediate action', context: '', question: '', answers: ensureAnswers([]), rationale: '' }], debrief: '' }
}

function newLab(subtype: 'Lab' | 'Imaging' = 'Lab'): LabAuthoringData {
  return { ...emptyPracticalCommon(), format: 'lab', subtype, questions: [{ id: `lab-${Date.now()}`, context: '', question: '', mediaUrl: '', answers: ensureAnswers([]), explanation: '' }] }
}

function formatFromType(type = ''): PracticalAuthoringData['format'] {
  if (type.includes('Clinical case')) return 'case'
  if (type.includes('Lab') || type.includes('Imaging')) return 'lab'
  return 'osce'
}

function seedData(item: ManagedContentItem | null): PracticalAuthoringData {
  if (item?.practicalData) return structuredClone(item.practicalData)
  const format = formatFromType(item?.fields.Type)
  if (format === 'osce') {
    // Null for anything but the two demo stations that still carry content.
    // An author starting from nothing gets an empty station rather than a
    // generic mark scheme they might mistake for one written for this case.
    const detail = getOsceDetail(item?.id ?? '')
    if (!detail) return newOsce()
    const actorSections: ActorBriefSectionDraft[] = detail.actorBrief?.sections?.map((section) => ({ ...section })) ?? [
      { id: 'identity', label: 'Who you are', content: detail.actorBrief?.identity ?? '' },
      ...(detail.actorBrief?.prompts ?? []).map((prompt, index) => ({ id: `prompt-${index}`, label: prompt.label, content: prompt.response, group: 'Only if asked' })),
    ]
    const markSections: PracticalMarkSectionDraft[] = detail.markSections?.map((section) => structuredClone(section)) ?? [{ id: 'core', title: 'Core station skills', marks: Number(item?.fields.Marks ?? 20), items: structuredClone(detail.markScheme) }]
    return { ...emptyPracticalCommon(), format: 'osce', candidateInstructions: detail.scenario, actorOpening: detail.actorBrief?.opening ?? '', actorSections, actorFlags: detail.actorBrief?.flags ?? (detail.actorBrief?.examinerNote ? [detail.actorBrief.examinerNote] : []), markSections, references: detail.references ?? [] }
  }
  if (format === 'case') {
    const detail = getCaseDetail(item?.id ?? '')
    if (!detail) return newCase()
    return { ...emptyPracticalCommon(), format: 'case', decisions: detail.stages.map((stage, stageIndex) => ({ id: `decision-${stageIndex}`, title: stage.title, context: stage.context ?? '', question: stage.question ?? stage.prompt, answers: ensureAnswers((stage.options ?? []).map((text, index) => ({ id: `answer-${stageIndex}-${index}`, text, explanation: stage.optionExplanations?.[index] ?? (index === (stage.correctIndex ?? 0) ? stage.answer : ''), correct: index === (stage.correctIndex ?? 0) }))), rationale: stage.answer })), debrief: detail.debrief ?? '', references: detail.references ?? [] }
  }
  const detail = getLabDetail(item?.id ?? '')
  if (!detail) return newLab(item?.fields.Type?.includes('Imaging') ? 'Imaging' : 'Lab')
  return { ...emptyPracticalCommon(), format: 'lab', subtype: item?.fields.Type?.includes('Imaging') ? 'Imaging' : 'Lab', questions: detail.questions.map((question, questionIndex) => ({ id: `lab-${questionIndex}`, context: question.context ?? '', question: question.question ?? question.stem, mediaUrl: '', answers: ensureAnswers(question.options.map((option, index) => ({ id: `lab-answer-${questionIndex}-${index}`, text: option.text, explanation: option.explanation ?? (option.correct ? question.explanation : ''), correct: option.correct }))), explanation: question.explanation })) }
}

function blankItem(): ManagedContentItem {
  return { id: '', kind: 'practical', title: '', subjectId: 'cvs', status: 'Draft', owner: 'Clinical skills team', updatedAt: new Date().toISOString(), fields: { Type: 'OSCE station', Duration: '8', Marks: '20', Difficulty: 'Moderate' }, practicalData: newOsce() }
}

function StringList({ values, onChange, label, placeholder }: { values: string[]; onChange: (values: string[]) => void; label: string; placeholder: string }) {
  return <div className="space-y-2">{values.map((value, index) => <div key={index} className="flex items-start gap-2"><Textarea aria-label={`${label} ${index + 1}`} className="min-h-16" value={value} onChange={(event) => onChange(values.map((entry, entryIndex) => entryIndex === index ? event.target.value : entry))} placeholder={placeholder} /><button type="button" onClick={() => onChange(values.filter((_, entryIndex) => entryIndex !== index))} className="grid size-10 shrink-0 place-items-center rounded-lg text-ink-3 hover:bg-danger-tint hover:text-danger" aria-label={`Remove ${label.toLowerCase()} ${index + 1}`}><Icon icon={Trash2} size={14} /></button></div>)}<Button type="button" size="sm" variant="ghost" iconLeft={Plus} onClick={() => onChange([...values, ''])}>Add {label.toLowerCase()}</Button></div>
}

/**
 * The answer list, and one place that states which letter is right.
 *
 * Correctness is stored per answer, and the letter is only that answer's position,
 * so adding or removing one silently relabels the rest. The select says the letter
 * out loud and stays bound to the same underlying flag as the round buttons — it is
 * a second way to read and set one fact, not a second copy of it. It also makes an
 * unmarked set visible, which the buttons alone never did.
 */
function AnswersEditor({ answers, onChange }: { answers: PracticalAnswerDraft[]; onChange: (answers: PracticalAnswerDraft[]) => void }) {
  function update(id: string, patch: Partial<PracticalAnswerDraft>) { onChange(answers.map((answer) => answer.id === id ? { ...answer, ...patch } : answer)) }
  const correctIndex = answers.findIndex((answer) => answer.correct)
  const answerId = useId()
  return <div className="space-y-2.5">
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-lg border border-line bg-surface-2/50 px-3 py-2">
      <label htmlFor={answerId} className="text-[12.5px] font-medium text-ink-2">Correct answer</label>
      <Select
        id={answerId}
        className="w-20"
        value={correctIndex >= 0 ? LETTERS[correctIndex] : ''}
        onChange={(event) => { const next = LETTERS.indexOf(event.target.value); onChange(answers.map((answer, index) => ({ ...answer, correct: index === next }))) }}
      >
        {correctIndex < 0 && <option value="">—</option>}
        {answers.map((answer, index) => <option key={answer.id} value={LETTERS[index]}>{LETTERS[index]}</option>)}
      </Select>
      <span className={cn('min-w-0 flex-1 truncate text-[11.5px]', correctIndex < 0 ? 'text-warning' : 'text-ink-3')}>
        {correctIndex < 0 ? 'No answer is marked correct yet.' : answers[correctIndex].text.trim() || 'This answer has no text yet.'}
      </span>
    </div>
    {answers.map((answer, index) => <div key={answer.id} className={cn('rounded-lg border p-3', answer.correct ? 'border-success/35 bg-success-tint/40' : 'border-line bg-surface')}><div className="flex items-center gap-2"><button type="button" onClick={() => onChange(answers.map((candidate) => ({ ...candidate, correct: candidate.id === answer.id })))} className={cn('grid size-7 place-items-center rounded-full border font-mono text-[11px] font-bold', answer.correct ? 'border-success bg-success text-on-success' : 'border-line-2 bg-surface text-ink-2')} aria-label={`Mark answer ${LETTERS[index]} correct`}>{answer.correct ? <Icon icon={Check} size={13} /> : LETTERS[index]}</button><span className="text-[11.5px] font-medium text-ink-3">Answer {LETTERS[index]}{index > 1 ? ' · optional' : ''}</span>{answers.length > 2 && <button type="button" className="ml-auto grid size-9 place-items-center text-ink-3 hover:text-danger" onClick={() => onChange(answers.filter((candidate) => candidate.id !== answer.id))} aria-label={`Remove answer ${LETTERS[index]}`}><Icon icon={Trash2} size={14} /></button>}</div><TextInput aria-label={`Answer ${LETTERS[index]} text`} className="mt-2" value={answer.text} onChange={(event) => update(answer.id, { text: event.target.value })} placeholder="Answer text" /><Textarea aria-label={`Answer ${LETTERS[index]} explanation`} className="mt-2 min-h-16 text-[12.5px]" value={answer.explanation} onChange={(event) => update(answer.id, { explanation: event.target.value })} placeholder="Explain why this answer is correct or incorrect…" /></div>)}{answers.length < 6 && <Button type="button" size="sm" variant="ghost" iconLeft={Plus} onClick={() => onChange([...answers, newAnswer(answers.length)])}>Add answer</Button>}</div>
}

function EditorShell({ title, hint, children }: { title: string; hint: string; children: ReactNode }) {
  return <Panel className="overflow-hidden"><div className="border-b border-line px-4 py-3"><h3 className="text-[13px] font-bold text-ink">{title}</h3><p className="mt-0.5 text-[11px] text-ink-3">{hint}</p></div><div className="p-4">{children}</div></Panel>
}

export function PracticalEditorDialog({ open, item, concepts, contentItems, onClose, onSave }: { open: boolean; item: ManagedContentItem | null; concepts: ConceptGraph; contentItems: ManagedContentItem[]; onClose: () => void; onSave: (item: ManagedContentItem) => void }) {
  const [draft, setDraft] = useState<ManagedContentItem>(() => blankItem())
  const [osceTab, setOsceTab] = useState<'candidate' | 'examiner'>('candidate')
  const [activeIndex, setActiveIndex] = useState(0)
  const [taxonomy] = useTaxonomyTree()
  const [medicalTaxonomy] = useMedicalTaxonomy()
  const conceptPicks = useMemo(() => conceptOptions({ graph: concepts, taxonomy, medicalTaxonomy }), [concepts, taxonomy, medicalTaxonomy])
  const resourcePicks = useMemo(() => contentOptions(contentItems, 'resource'), [contentItems])

  useEffect(() => { if (open) { const next = item ? { ...item, fields: { ...item.fields }, practicalData: seedData(item) } : blankItem(); setDraft(next); setActiveIndex(0); setOsceTab('candidate') } }, [item, open])
  useEffect(() => { if (!open) return; const handler = (event: KeyboardEvent) => event.key === 'Escape' && onClose(); window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler) }, [onClose, open])

  const data = draft.practicalData ?? newOsce()
  // A checklist is an OSCE station with no actor, so it shares the format. Read
  // the label back off the item, or saving one would relabel it a station.
  const formatLabel = data.format === 'osce' ? (draft.fields.Type === 'Skills checklist' ? 'Skills checklist' : 'OSCE station') : data.format === 'case' ? 'Clinical case' : `${data.subtype} interpretation`
  const valid = Boolean(draft.title.trim() && (data.format === 'osce' ? data.candidateInstructions.trim() : data.format === 'case' ? data.decisions.some((decision) => decision.question.trim()) : data.questions.some((question) => question.question.trim())))
  const headerIcon = data.format === 'osce' ? Stethoscope : data.format === 'case' ? ClipboardList : FlaskConical

  const updateData = (next: PracticalAuthoringData) => setDraft((current) => ({ ...current, practicalData: next }))
  const changeFormat = (value: string) => {
    const blank = value === 'Clinical case' ? newCase() : value === 'Lab interpretation' || value === 'Imaging interpretation' ? newLab(value === 'Imaging interpretation' ? 'Imaging' : 'Lab') : newOsce()
    // What the item is *about* does not change when its format does, so the
    // concept tags, media requests and references survive the swap.
    const next = { ...blank, references: data.references, conceptTags: data.conceptTags, mediaRequests: data.mediaRequests, ...(data.learningObjective ? { learningObjective: data.learningObjective } : {}) }
    setDraft((current) => ({ ...current, fields: { ...current.fields, Type: value }, practicalData: next }))
    setActiveIndex(0)
  }

  if (!open) return null

  return <div className="fixed inset-0 z-50 bg-paper" role="dialog" aria-modal="true" aria-labelledby="practical-editor-title"><form className="flex h-full flex-col pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]" onSubmit={(event) => { event.preventDefault(); if (!valid) return; onSave({ ...draft, id: draft.id || `practical-${Date.now()}`, title: draft.title.trim(), updatedAt: new Date().toISOString(), fields: { ...draft.fields, Type: formatLabel, Marks: data.format === 'osce' ? String(data.markSections.reduce((sum, section) => sum + section.marks, 0)) : data.format === 'case' ? String(data.decisions.length) : String(data.questions.length) } }) }}>
    <header className="flex shrink-0 flex-wrap items-center gap-2 border-b border-line bg-surface px-3 py-2.5 sm:h-16 sm:flex-nowrap sm:gap-3 sm:px-5 sm:py-0"><span className="grid size-9 place-items-center rounded-lg bg-accent-tint text-accent-strong"><Icon icon={headerIcon} size={17} /></span><div className="min-w-0 flex-1"><h2 id="practical-editor-title" className="truncate font-serif text-[18px] font-semibold text-ink">{item ? `Edit ${formatLabel.toLowerCase()}` : 'Add practical item'}</h2><p className="hidden text-[11.5px] text-ink-3 sm:block">Student-layout authoring · candidate and examiner material</p></div><button type="button" onClick={onClose} className="grid size-10 place-items-center rounded-lg text-ink-3 hover:bg-inset hover:text-ink" aria-label="Close practical editor"><Icon icon={X} size={19} /></button><div className="flex basis-full items-center gap-2 sm:contents"><Select aria-label="Workflow status" value={draft.status} onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value as Status }))} className="w-32 sm:w-36">{STATUSES.map((status) => <option key={status}>{status}</option>)}</Select><Button type="button" className="ml-auto sm:ml-0" variant="ghost" onClick={onClose}>Cancel</Button><Button type="submit" variant="primary" disabled={!valid}>{item ? 'Save changes' : 'Add practical'}</Button></div></header>

    <div className="max-h-[38dvh] shrink-0 overflow-y-auto border-b border-line bg-surface-2/45 px-3 py-3 sm:max-h-none sm:px-5"><div className="mx-auto grid max-w-[1180px] gap-3 sm:grid-cols-2 md:grid-cols-6"><Field label="Practical format" htmlFor="practical-format"><Select id="practical-format" value={draft.fields.Type} onChange={(event) => changeFormat(event.target.value)}><option>OSCE station</option><option>Skills checklist</option><option>Clinical case</option><option>Lab interpretation</option><option>Imaging interpretation</option></Select></Field><Field label="Title" htmlFor="practical-title" className="md:col-span-2"><TextInput id="practical-title" value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} /></Field><Field label="Subject" htmlFor="practical-subject"><Select id="practical-subject" value={draft.subjectId} onChange={(event) => setDraft((current) => ({ ...current, subjectId: event.target.value }))}>{subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}</Select></Field><Field label="Duration" htmlFor="practical-duration"><TextInput id="practical-duration" type="number" min={1} value={draft.fields.Duration} onChange={(event) => setDraft((current) => ({ ...current, fields: { ...current.fields, Duration: event.target.value } }))} /></Field><Field label="Difficulty" htmlFor="practical-difficulty"><Select id="practical-difficulty" value={draft.fields.Difficulty} onChange={(event) => setDraft((current) => ({ ...current, fields: { ...current.fields, Difficulty: event.target.value } }))}>{DIFFICULTIES.map((tier) => <option key={tier}>{tier}</option>)}</Select></Field></div></div>

    {/* What the station teaches belongs to the station, not to one of its two
        audiences — but sitting outside the tab switch it rendered under Candidate
        and again under Examiner, reading as a duplicate. It stays with the
        candidate material, which is where the item is actually authored. */}
    <div className="min-h-0 flex-1 overflow-y-auto"><div className="mx-auto max-w-[1180px] space-y-4 p-3 sm:p-5">{data.format === 'osce' ? <OsceEditor data={data} tab={osceTab} onTab={setOsceTab} onChange={updateData} resourcePicks={resourcePicks} /> : data.format === 'case' ? <CaseEditor data={data} index={activeIndex} onIndex={setActiveIndex} onChange={updateData} conceptPicks={conceptPicks} resourcePicks={resourcePicks} /> : <LabEditor data={data} index={activeIndex} onIndex={setActiveIndex} onChange={updateData} conceptPicks={conceptPicks} resourcePicks={resourcePicks} />}{(data.format !== 'osce' || osceTab === 'candidate') && <><TaggingPanel data={data} onChange={updateData} conceptPicks={conceptPicks} /><EditorShell title="Source" hint="Admin-only. Students are never shown where a practical item came from."><ContentSourceFields source={draft.source} onChange={(source) => setDraft((current) => ({ ...current, source }))} /></EditorShell></>}</div></div>
  </form></div>
}

function OsceEditor({ data, tab, onTab, onChange, resourcePicks }: { data: OsceAuthoringData; tab: 'candidate' | 'examiner'; onTab: (tab: 'candidate' | 'examiner') => void; onChange: (data: OsceAuthoringData) => void; resourcePicks: PickerOption[] }) {
  return <div><div className="mb-4 flex border-b border-line"><button type="button" onClick={() => onTab('candidate')} className={cn('relative px-3 py-2 text-[13px] font-medium', tab === 'candidate' ? 'text-ink' : 'text-ink-3')}>Candidate{tab === 'candidate' && <span className="absolute inset-x-2 -bottom-px h-0.5 bg-accent" />}</button><button type="button" onClick={() => onTab('examiner')} className={cn('relative px-3 py-2 text-[13px] font-medium', tab === 'examiner' ? 'text-ink' : 'text-ink-3')}>Examiner &amp; Actor{tab === 'examiner' && <span className="absolute inset-x-2 -bottom-px h-0.5 bg-accent" />}</button></div>{tab === 'candidate' ? <EditorShell title="Candidate instructions" hint="Exactly what the candidate sees before starting the timer."><Textarea aria-label="Candidate instructions" className="min-h-40 text-[14.5px] leading-relaxed" value={data.candidateInstructions} onChange={(event) => onChange({ ...data, candidateInstructions: event.target.value })} /></EditorShell> : <div className="space-y-4"><EditorShell title="Actor brief" hint="For whoever is playing the patient. Add as many custom sections as this station requires."><Field label="Open with this, then stop" htmlFor="actor-opening"><Textarea id="actor-opening" className="min-h-20 font-serif text-[16px]" value={data.actorOpening} onChange={(event) => onChange({ ...data, actorOpening: event.target.value })} /></Field><div className="mt-4 divide-y divide-line">{data.actorSections.map((section) => <div key={section.id} className="grid gap-2 py-3 sm:grid-cols-[12rem_1fr_2.5rem]"><div className="space-y-2"><TextInput aria-label="Actor section label" value={section.label} onChange={(event) => onChange({ ...data, actorSections: data.actorSections.map((candidate) => candidate.id === section.id ? { ...candidate, label: event.target.value } : candidate) })} placeholder="Section label" /><TextInput aria-label="Actor section group" value={section.group ?? ''} onChange={(event) => onChange({ ...data, actorSections: data.actorSections.map((candidate) => candidate.id === section.id ? { ...candidate, group: event.target.value } : candidate) })} placeholder="Group · optional" /></div><Textarea aria-label={`${section.label || 'Actor'} content`} className="min-h-24" value={section.content} onChange={(event) => onChange({ ...data, actorSections: data.actorSections.map((candidate) => candidate.id === section.id ? { ...candidate, content: event.target.value } : candidate) })} /><button type="button" className="grid size-10 place-items-center text-ink-3 hover:text-danger" onClick={() => onChange({ ...data, actorSections: data.actorSections.filter((candidate) => candidate.id !== section.id) })} aria-label="Remove actor section"><Icon icon={Trash2} size={15} /></button></div>)}</div><Button type="button" size="sm" variant="ghost" iconLeft={Plus} onClick={() => onChange({ ...data, actorSections: [...data.actorSections, { id: `section-${Date.now()}`, label: '', content: '' }] })}>Add actor brief section</Button><div className="mt-5"><p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3"><Icon icon={Flag} size={13} />Actor behaviour flags</p><StringList values={data.actorFlags} onChange={(actorFlags) => onChange({ ...data, actorFlags })} label="Flag" placeholder="If the candidate…, then…" /></div></EditorShell><MarkSchemeEditor sections={data.markSections} onChange={(markSections) => onChange({ ...data, markSections })} /><References values={data.references} onChange={(references) => onChange({ ...data, references })} resourcePicks={resourcePicks} /></div>}</div>
}

function MarkSchemeEditor({ sections, onChange }: { sections: PracticalMarkSectionDraft[]; onChange: (sections: PracticalMarkSectionDraft[]) => void }) {
  return <EditorShell title="Mark scheme" hint="Only visible under Examiner & Actor. Section marks determine the live percentage bar."><div className="space-y-4">{sections.map((section) => <section key={section.id} className="rounded-lg border border-line bg-surface-2/45 p-3"><div className="flex gap-2"><TextInput aria-label="Mark section title" value={section.title} onChange={(event) => onChange(sections.map((candidate) => candidate.id === section.id ? { ...candidate, title: event.target.value } : candidate))} placeholder="Section title" /><TextInput aria-label={`${section.title} marks`} className="w-28" type="number" min={1} value={section.marks} onChange={(event) => onChange(sections.map((candidate) => candidate.id === section.id ? { ...candidate, marks: Number(event.target.value) } : candidate))} /><button type="button" className="grid size-10 shrink-0 place-items-center text-ink-3 hover:text-danger" onClick={() => onChange(sections.filter((candidate) => candidate.id !== section.id))} aria-label="Remove mark section"><Icon icon={Trash2} size={15} /></button></div><div className="mt-3 space-y-2">{section.items.map((item) => <div key={item.id} className="flex gap-2"><TextInput aria-label="Mark scheme item" value={item.text} onChange={(event) => onChange(sections.map((candidate) => candidate.id === section.id ? { ...candidate, items: candidate.items.map((mark) => mark.id === item.id ? { ...mark, text: event.target.value } : mark) } : candidate))} placeholder="What the candidate must do" /><button type="button" className="grid size-9 shrink-0 place-items-center text-ink-3 hover:text-danger" onClick={() => onChange(sections.map((candidate) => candidate.id === section.id ? { ...candidate, items: candidate.items.filter((mark) => mark.id !== item.id) } : candidate))} aria-label="Remove mark item"><Icon icon={Trash2} size={13} /></button></div>)}<Button type="button" size="sm" variant="ghost" iconLeft={Plus} onClick={() => onChange(sections.map((candidate) => candidate.id === section.id ? { ...candidate, items: [...candidate.items, { id: `mark-${Date.now()}`, text: '' }] } : candidate))}>Add scoring point</Button></div></section>)}<Button type="button" size="sm" iconLeft={Plus} onClick={() => onChange([...sections, { id: `marks-${Date.now()}`, title: '', marks: 10, items: [{ id: `mark-${Date.now()}`, text: '' }] }])}>Add mark section</Button></div></EditorShell>
}


/**
 * What the item teaches, and what it still needs.
 *
 * The concept tags are what a mastery model would read, so the three buckets are
 * kept visibly apart rather than merged into one box. Media requests are shown
 * read-only: they are fulfilled by attaching real media, not by editing the
 * request.
 */
function TaggingPanel({ data, onChange, conceptPicks }: { data: PracticalAuthoringData; onChange: (data: PracticalAuthoringData) => void; conceptPicks: PickerOption[] }) {
  const tags = data.conceptTags
  const setTags = (patch: Partial<PracticalConceptTags>) => onChange({ ...data, conceptTags: { ...tags, ...patch } })
  return <div className="space-y-4">
    <EditorShell title="What this teaches" hint="Contextual concepts are mentioned but not assessed, and receive no mastery evidence.">
      <div className="grid gap-4 sm:grid-cols-3">
        <EntityPicker label="Main concept(s)" noun="concepts" options={conceptPicks} selected={tags.mainConceptIds} onChange={(mainConceptIds) => setTags({ mainConceptIds })} />
        <EntityPicker label="Also assessed" noun="concepts" options={conceptPicks} selected={tags.conceptIds} onChange={(conceptIds) => setTags({ conceptIds })} />
        <EntityPicker label="Mentioned only" noun="concepts" options={conceptPicks} selected={tags.contextualConceptIds} onChange={(contextualConceptIds) => setTags({ contextualConceptIds })} />
      </div>
      <Field label="Learning objective" htmlFor="practical-objective" className="mt-4"><Textarea id="practical-objective" className="min-h-16" value={data.learningObjective ?? ''} onChange={(event) => onChange({ ...data, learningObjective: event.target.value })} placeholder="What a student who passes this item has demonstrated." /></Field>
    </EditorShell>
    {data.mediaRequests.length > 0 && <EditorShell title="Media still needed" hint="Admin-only. Never shown to a student, and never rendered as media until real media is attached.">
      <ul className="divide-y divide-line">{data.mediaRequests.map((request) => <li key={request.id} className="flex flex-wrap items-start gap-2 py-2.5">
        <Badge tone="outline">{request.kind}</Badge>
        <div className="min-w-0 flex-1"><p className="text-[13px] font-medium text-ink">{request.brief}</p><p className="mt-0.5 text-[11.5px] text-ink-3">{!request.section || request.section === 'station' ? 'Whole item' : request.section}{request.teachingPurpose ? ` · ${request.teachingPurpose}` : ''}</p></div>
        <span className="text-[11px] text-ink-3">{request.priority} · {request.status}</span>
      </li>)}</ul>
    </EditorShell>}
  </div>
}

/** Concept and difficulty tagging for one decision or interpretation question. */
function QuestionTagFields({ conceptId, secondaryConceptIds, difficulty, onChange, idPrefix, conceptPicks }: { conceptId?: string; secondaryConceptIds?: string[]; difficulty?: PracticalDifficulty; onChange: (patch: { conceptId?: string; secondaryConceptIds?: string[]; difficulty?: PracticalDifficulty }) => void; idPrefix: string; conceptPicks: PickerOption[] }) {
  return <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_1fr_10rem]">
    {/* One concept, but the same picker — picking a second replaces the first. */}
    <EntityPicker label="Concept taught" noun="concepts" options={conceptPicks} selected={conceptId ? [conceptId] : []} onChange={(ids) => onChange({ conceptId: ids[ids.length - 1] })} />
    <EntityPicker label="Also assessed" noun="concepts" options={conceptPicks} selected={secondaryConceptIds ?? []} onChange={(secondaryConceptIds) => onChange({ secondaryConceptIds })} />
    <Field label="Intended difficulty" htmlFor={`${idPrefix}-difficulty`}><Select id={`${idPrefix}-difficulty`} value={difficulty ?? ''} onChange={(event) => onChange({ difficulty: (event.target.value || undefined) as PracticalDifficulty | undefined })}><option value="">Not set</option>{DIFFICULTIES.map((tier) => <option key={tier}>{tier}</option>)}</Select></Field>
  </div>
}

function CaseEditor({ data, index, onIndex, onChange, conceptPicks, resourcePicks }: { data: CaseAuthoringData; index: number; onIndex: (index: number) => void; onChange: (data: CaseAuthoringData) => void; conceptPicks: PickerOption[]; resourcePicks: PickerOption[] }) {
  const safeIndex = Math.min(index, data.decisions.length - 1); const decision = data.decisions[safeIndex]
  const update = (patch: Partial<ClinicalDecisionDraft>) => onChange({ ...data, decisions: data.decisions.map((candidate) => candidate.id === decision.id ? { ...candidate, ...patch } : candidate) })
  return <div className="grid gap-4 lg:grid-cols-[14rem_1fr]"><aside className="space-y-2"><p className="text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">Decisions</p>{data.decisions.map((entry, entryIndex) => <button type="button" key={entry.id} onClick={() => onIndex(entryIndex)} className={cn('w-full rounded-lg border px-3 py-2.5 text-start', entryIndex === safeIndex ? 'border-accent-line bg-accent-tint text-ink' : 'border-line bg-surface text-ink-2 hover:bg-inset')}><span className="block font-mono text-[10px] text-ink-3">Decision {entryIndex + 1}</span><span className="mt-0.5 line-clamp-2 block text-[12.5px] font-semibold">{entry.title || 'Untitled decision'}</span></button>)}<Button type="button" className="w-full" size="sm" iconLeft={Plus} onClick={() => { const next = { id: `decision-${Date.now()}`, title: '', context: '', question: '', answers: ensureAnswers([]), rationale: '' }; onChange({ ...data, decisions: [...data.decisions, next] }); onIndex(data.decisions.length) }}>Add decision</Button></aside><main className="space-y-4"><div className="flex items-center gap-3"><span className="text-[13px] font-medium text-ink-2">Decision <span className="font-mono text-ink">{safeIndex + 1}</span> of {data.decisions.length}</span><div className="h-1 flex-1 rounded-full bg-inset"><div className="h-full rounded-full bg-accent" style={{ width: `${((safeIndex + 1) / data.decisions.length) * 100}%` }} /></div>{data.decisions.length > 1 && <Button type="button" variant="ghost" size="sm" iconLeft={Trash2} onClick={() => { onChange({ ...data, decisions: data.decisions.filter((candidate) => candidate.id !== decision.id) }); onIndex(Math.max(0, safeIndex - 1)) }}>Remove</Button>}</div><EditorShell title="Student-facing decision" hint="Clinical context and the main question are deliberately separate."><Field label="Decision label" htmlFor="decision-label"><TextInput id="decision-label" value={decision.title} onChange={(event) => update({ title: event.target.value })} /></Field><Field label="Case text / clinical context" htmlFor="decision-context" className="mt-4"><Textarea id="decision-context" className="min-h-36 text-[15px] leading-[1.7]" value={decision.context} onChange={(event) => update({ context: event.target.value })} /></Field><Field label="Main question" htmlFor="decision-question" className="mt-4"><Textarea id="decision-question" className="min-h-20 text-[17px] font-semibold" value={decision.question} onChange={(event) => update({ question: event.target.value })} /></Field><div className="mt-5"><AnswersEditor answers={decision.answers} onChange={(answers) => update({ answers })} /></div><Field label="Decision rationale" htmlFor="decision-rationale" className="mt-4"><Textarea id="decision-rationale" value={decision.rationale} onChange={(event) => update({ rationale: event.target.value })} /></Field><QuestionTagFields conceptPicks={conceptPicks} idPrefix="decision" conceptId={decision.conceptId} secondaryConceptIds={decision.secondaryConceptIds} difficulty={decision.difficulty} onChange={update} /></EditorShell><EditorShell title="Case debrief" hint="Shown after the final decision."><Textarea aria-label="Case debrief" className="min-h-28" value={data.debrief} onChange={(event) => onChange({ ...data, debrief: event.target.value })} /></EditorShell><References values={data.references} onChange={(references) => onChange({ ...data, references })} resourcePicks={resourcePicks} /></main></div>
}

function LabEditor({ data, index, onIndex, onChange, conceptPicks, resourcePicks }: { data: LabAuthoringData; index: number; onIndex: (index: number) => void; onChange: (data: LabAuthoringData) => void; conceptPicks: PickerOption[]; resourcePicks: PickerOption[] }) {
  const safeIndex = Math.min(index, data.questions.length - 1); const question = data.questions[safeIndex]
  const update = (patch: Partial<LabQuestionDraft>) => onChange({ ...data, questions: data.questions.map((candidate) => candidate.id === question.id ? { ...candidate, ...patch } : candidate) })
  return <div className="grid gap-4 lg:grid-cols-[14rem_1fr]"><aside className="space-y-2"><div className="flex items-center justify-between"><p className="text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">{data.subtype} questions</p><Badge tone="outline">{data.questions.length}</Badge></div>{data.questions.map((entry, entryIndex) => <button type="button" key={entry.id} onClick={() => onIndex(entryIndex)} className={cn('w-full rounded-lg border px-3 py-2.5 text-start', entryIndex === safeIndex ? 'border-accent-line bg-accent-tint' : 'border-line bg-surface hover:bg-inset')}><span className="font-mono text-[10px] text-ink-3">Question {entryIndex + 1}</span><span className="mt-0.5 line-clamp-2 block text-[12px] font-semibold text-ink">{entry.question || 'Untitled question'}</span></button>)}<Button type="button" className="w-full" size="sm" iconLeft={Plus} onClick={() => { const next = { id: `lab-${Date.now()}`, context: '', question: '', mediaUrl: '', answers: ensureAnswers([]), explanation: '' }; onChange({ ...data, questions: [...data.questions, next] }); onIndex(data.questions.length) }}>Add question</Button></aside><main className="space-y-4"><div className="flex items-center gap-3"><span className="text-[13px] font-medium text-ink-2">Question <span className="font-mono text-ink">{safeIndex + 1}</span> of {data.questions.length}</span><div className="h-1 flex-1 rounded-full bg-inset"><div className="h-full rounded-full bg-accent" style={{ width: `${((safeIndex + 1) / data.questions.length) * 100}%` }} /></div>{data.questions.length > 1 && <Button type="button" variant="ghost" size="sm" iconLeft={Trash2} onClick={() => { onChange({ ...data, questions: data.questions.filter((candidate) => candidate.id !== question.id) }); onIndex(Math.max(0, safeIndex - 1)) }}>Remove</Button>}</div><EditorShell title={`${data.subtype} question`} hint="All fields mirror the student interpretation layout."><Field label="Clinical context or investigation values" htmlFor="lab-context"><Textarea id="lab-context" className="min-h-24" value={question.context} onChange={(event) => update({ context: event.target.value })} /></Field><Field label="Main question" htmlFor="lab-question" className="mt-4"><Textarea id="lab-question" className="min-h-20 text-[16px] font-semibold" value={question.question} onChange={(event) => update({ question: event.target.value })} /></Field><Field label="Image URL" hint="Images only — the student runner renders this as an image, so an audio or video URL shows a broken image. A recording belongs on an MCQ, which accepts audio and video attachments." htmlFor="lab-media" className="mt-4"><TextInput id="lab-media" value={question.mediaUrl} onChange={(event) => update({ mediaUrl: event.target.value })} placeholder="ECG, X-ray, CT, or waveform image URL" /></Field>{question.mediaUrl && <div className="mt-3 overflow-hidden rounded-lg border border-line bg-inset p-2"><img src={question.mediaUrl} alt="Investigation preview" className="max-h-64 w-full object-contain" /></div>}<div className="mt-5"><AnswersEditor answers={question.answers} onChange={(answers) => update({ answers })} /></div><Field label="Overall explanation" htmlFor="lab-explanation" className="mt-4"><Textarea id="lab-explanation" value={question.explanation} onChange={(event) => update({ explanation: event.target.value })} /></Field><QuestionTagFields conceptPicks={conceptPicks} idPrefix="lab" conceptId={question.conceptId} secondaryConceptIds={question.secondaryConceptIds} difficulty={question.difficulty} onChange={update} /></EditorShell><References values={data.references} onChange={(references) => onChange({ ...data, references })} resourcePicks={resourcePicks} /></main></div>
}

function References({ values, onChange, resourcePicks }: { values: string[]; onChange: (values: string[]) => void; resourcePicks: PickerOption[] }) {
  return <EditorShell title="Read around it" hint="Resources shown after the station, case, or interpretation set."><div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3"><Icon icon={BookOpen} size={13} />From the resource catalogue</div><EntityPicker label="Resources" noun="resources" options={resourcePicks} selected={values} onChange={onChange} /></EditorShell>
}
