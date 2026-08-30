import { useEffect, useMemo, useState } from 'react'
import { GraduationCap, Image, Link2, Paperclip, Plus, Tags, X } from 'lucide-react'
import type { Status } from '@/data/admin'
import type { ConceptGraph } from '@/data/conceptGraph'
import {
  type AnswerLabel,
  type ManagedContentItem,
  type MediaAttachment,
  type QuestionAuthoringData,
} from '@/data/contentControl'
import { subjects } from '@/data/subjects'
import { defaultModuleId } from '@/data/universities'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Field, Select, Textarea, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { Toggle } from '@/components/ui/Toggle'
import { MediaAttachmentView, ZoomableImage } from '@/components/ui/MediaAttachmentView'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { isStoredMediaReference, removeStoredMedia, storeMediaFile } from '@/lib/mediaStorage'
import { MediaPlacementEditor } from '@/components/admin/MediaPlacementEditor'
import { StrandedMediaNotice } from '@/components/admin/StrandedMediaNotice'
import type { Question } from '@/data/qbank'
import { EntityPicker } from '@/components/admin/EntityPicker'
import { ContentSourceFields } from '@/components/admin/ContentSourceFields'
import { conceptOptions, contentOptions } from '@/components/admin/pickerOptions'
import { useTaxonomyTree } from '@/data/taxonomyStore'
import { useMedicalTaxonomy } from '@/data/medicalTaxonomyStore'
import { overlayPortal } from '@/lib/overlayPortal'
import { QUESTION_SOURCES, QUESTION_SOURCE_LABEL, type QuestionSource } from '@/data/questionSource'

const ANSWERS: AnswerLabel[] = ['A', 'B', 'C', 'D', 'E', 'F']
const STATUSES: Status[] = ['Draft', 'In review', 'Published', 'Archived']
const clamp01 = (v: string | number) => Math.min(1, Math.max(0, Number(v) || 0))
const MAX_MEDIA_BYTES = 100_000_000

function fileMediaType(file: File): MediaAttachment['type'] | null {
  if (file.type.startsWith('image/')) return 'image'
  if (file.type.startsWith('audio/')) return 'audio'
  if (file.type.startsWith('video/')) return 'video'
  const extension = file.name.split('.').pop()?.toLowerCase()
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'].includes(extension ?? '')) return 'image'
  if (['mp3', 'm4a', 'aac', 'wav'].includes(extension ?? '')) return 'audio'
  if (['mp4', 'm4v', 'mov', 'webm'].includes(extension ?? '')) return 'video'
  return null
}

function inferredMimeType(url: string, type: MediaAttachment['type']) {
  const path = url.split('?')[0].toLowerCase()
  if (type === 'audio') {
    if (path.endsWith('.mp3')) return 'audio/mpeg'
    if (path.endsWith('.m4a') || path.endsWith('.mp4')) return 'audio/mp4'
    if (path.endsWith('.wav')) return 'audio/wav'
    if (path.endsWith('.aac')) return 'audio/aac'
  }
  if (type === 'video') {
    if (path.endsWith('.mp4') || path.endsWith('.m4v')) return 'video/mp4'
    if (path.endsWith('.webm')) return 'video/webm'
    if (path.endsWith('.mov')) return 'video/quicktime'
  }
  return undefined
}

function mediaName(url: string, type: MediaAttachment['type']) {
  if (url.startsWith('data:')) return `${type} attachment`
  try {
    const pathname = new URL(url, window.location.href).pathname
    return decodeURIComponent(pathname.split('/').filter(Boolean).pop() ?? '') || `${type} attachment`
  } catch {
    return `${type} attachment`
  }
}

function blankQuestionData(): QuestionAuthoringData {
  return {
    attachments: [],
    correctAnswer: 'A',
    answers: ANSWERS.map((label) => ({ label, text: '', explanation: '' })),
    attachedImage: '',
    libraryIds: [],
    resourceIds: [],
    tags: {
      module: subjects[0]?.id ?? 'cvs',
      topic: '',
      subtopic: '',
      conceptIds: [],
      years: [],
      universityIds: [],
      cognitiveEffort: 'Medium',
      setting: 'Both',
      intendedDifficulty: 'Moderate',
      clinicalReasoningLevel: 2,
      inferredDifficulty: 50,
      examRelevance: 5,
      contextualConceptIds: [],
      questionType: '',
      mainConceptIds: [],
      moduleIds: [],
      clinicalRelevance: 0.5,
      academicRelevance: 0.5,
      cognitiveEffortScore: 0.5,
      examWeightByYear: {},
      questionOnlyFor: [],
    },
    learningObjective: '',
    authorNotes: '',
    sourceCitation: '',
    estimatedSeconds: 90,
    randomiseAnswers: true,
  }
}

function blankQuestion(): ManagedContentItem {
  return {
    id: '',
    kind: 'question',
    title: '',
    subjectId: subjects[0]?.id ?? 'cvs',
    status: 'Draft',
    owner: 'Admin team',
    updatedAt: new Date().toISOString(),
    fields: { Topic: '', Difficulty: 'Moderate', Vignette: '', Explanation: '' },
    questionData: blankQuestionData(),
  }
}

function CheckList({ options, selected, onChange, columns = 2 }: { options: Array<{ id: string; label: string }>; selected: string[]; onChange: (ids: string[]) => void; columns?: number }) {
  return (
    <div className={columns === 3 ? 'grid gap-1.5 sm:grid-cols-3' : 'grid gap-1.5 sm:grid-cols-2'}>
      {options.map((option) => {
        const checked = selected.includes(option.id)
        return (
          <label key={option.id} className="flex min-h-10 cursor-pointer items-center gap-2 rounded-md border border-line bg-surface px-2.5 py-2 text-[12px] text-ink-2 hover:bg-inset">
            <input type="checkbox" checked={checked} onChange={() => onChange(checked ? selected.filter((id) => id !== option.id) : [...selected, option.id])} className="size-4 accent-[var(--color-primary)]" />
            <span className="min-w-0 truncate">{option.label}</span>
          </label>
        )
      })}
    </div>
  )
}

function Section({ title, hint, icon, children }: { title: string; hint?: string; icon: typeof Paperclip; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-line bg-surface p-4 shadow-panel">
      <div className="mb-4 flex items-start gap-2.5">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-inset text-ink-2"><Icon icon={icon} size={15} /></span>
        <div><h3 className="font-sans text-[13.5px] font-bold text-ink">{title}</h3>{hint && <p className="mt-0.5 text-[11.5px] text-ink-3">{hint}</p>}</div>
      </div>
      {children}
    </section>
  )
}

export function QuestionEditorDialog({ open, item, concepts, contentItems, onClose, onSave }: { open: boolean; item: ManagedContentItem | null; concepts: ConceptGraph; contentItems: ManagedContentItem[]; onClose: () => void; onSave: (item: ManagedContentItem) => void }) {
  const [universityCatalogue] = useUniversityCatalogue()
  const [taxonomy] = useTaxonomyTree()
  const [medicalTaxonomy] = useMedicalTaxonomy()
  const [draft, setDraft] = useState<ManagedContentItem>(() => blankQuestion())
  const [mediaUrl, setMediaUrl] = useState('')
  const [mediaType, setMediaType] = useState<MediaAttachment['type']>('image')
  const [mediaError, setMediaError] = useState('')

  useEffect(() => {
    if (!open) return
    const base = item ? { ...item, fields: { ...item.fields }, questionData: item.questionData ? structuredClone(item.questionData) : blankQuestionData() } : blankQuestion()
    setDraft(base)
    setMediaUrl('')
    setMediaError('')
  }, [item, open])

  useEffect(() => {
    if (!open) return
    const handler = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, open])

  const data = draft.questionData ?? blankQuestionData()
  const nonEmptyAnswers = data.answers.filter((answer) => answer.text.trim())
  const correctIsFilled = Boolean(data.answers.find((answer) => answer.label === data.correctAnswer)?.text.trim())
  const valid = draft.title.trim() && nonEmptyAnswers.length >= 2 && correctIsFilled
  const inferredLabel = data.tags.inferredDifficulty >= 70 ? 'Easy' : data.tags.inferredDifficulty < 45 ? 'Hard' : 'Moderate'

  /**
   * The draft as a student would receive it.
   *
   * Built here so the proof below renders the real component against the real
   * question rather than a stand-in, which is the whole point of it.
   */
  const previewQuestion = useMemo<Question>(() => ({
    id: draft.id || 'preview',
    subjectId: draft.subjectId,
    topic: draft.fields.Topic ?? '',
    difficulty: data.tags.intendedDifficulty,
    vignette: draft.fields.Vignette ?? '',
    stem: draft.title,
    options: data.answers
      .filter((answer) => answer.text.trim())
      .map((answer) => ({ text: answer.text, correct: answer.label === data.correctAnswer, rationale: answer.explanation })),
    explanation: draft.fields.Explanation ?? '',
    libraryRefs: [],
    resourceRefs: [],
    attachedImage: isStoredMediaReference(data.attachedImage ?? '') ? '' : data.attachedImage,
    media: data.media ?? [],
  }), [draft, data])

  const conceptPicks = useMemo(() => conceptOptions({ graph: concepts, taxonomy, medicalTaxonomy }), [concepts, taxonomy, medicalTaxonomy])
  const articlePicks = useMemo(() => contentOptions(contentItems, 'article'), [contentItems])
  const resourcePicks = useMemo(() => contentOptions(contentItems, 'resource'), [contentItems])
  const selectedUniversityIds = new Set(data.tags.universityIds)
  const selectedYearIds = new Set(data.tags.years)
  const yearOptions = universityCatalogue
    .filter((university) => selectedUniversityIds.has(university.id))
    .flatMap((university) => university.years.map((year) => ({
      id: year.id,
      label: `${university.short} · ${year.year}`,
    })))
  const moduleOptions = [...new Map(universityCatalogue
    .filter((university) => selectedUniversityIds.has(university.id))
    .flatMap((university) => university.years
      .filter((year) => selectedYearIds.has(year.id))
      .flatMap((year) => year.courses.map((course, index) => ({
        id: course.moduleId?.trim() || defaultModuleId(course.name, index + 1),
        label: `${university.short} · ${year.year} · ${course.name}`,
      }))))
    .map((option) => [option.id, option] as const)).values()]

  if (!open) return null

  function updateData(updater: (current: QuestionAuthoringData) => QuestionAuthoringData) {
    setDraft((current) => ({ ...current, questionData: updater(current.questionData ?? blankQuestionData()) }))
  }

  function updateUniversities(universityIds: string[]) {
    const validYears = new Set(universityCatalogue
      .filter((university) => universityIds.includes(university.id))
      .flatMap((university) => university.years.map((year) => year.id)))
    updateData((current) => {
      const years = current.tags.years.filter((id) => validYears.has(id))
      const validModules = new Set(universityCatalogue
        .filter((university) => universityIds.includes(university.id))
        .flatMap((university) => university.years
          .filter((year) => years.includes(year.id))
          .flatMap((year) => year.courses.map((course, index) => course.moduleId?.trim() || defaultModuleId(course.name, index + 1)))))
      return {
        ...current,
        tags: {
          ...current.tags,
          universityIds,
          years,
          moduleIds: (current.tags.moduleIds ?? []).filter((id) => validModules.has(id)),
          questionOnlyFor: (current.tags.questionOnlyFor ?? []).length ? [...years, ...universityIds] : [],
        },
      }
    })
  }

  function updateYears(years: string[]) {
    const validModules = new Set(universityCatalogue
      .flatMap((university) => university.years
        .filter((year) => years.includes(year.id))
        .flatMap((year) => year.courses.map((course, index) => course.moduleId?.trim() || defaultModuleId(course.name, index + 1)))))
    updateData((current) => ({
      ...current,
      tags: {
        ...current.tags,
        years,
        moduleIds: (current.tags.moduleIds ?? []).filter((id) => validModules.has(id)),
        questionOnlyFor: (current.tags.questionOnlyFor ?? []).length ? [...years, ...current.tags.universityIds] : [],
      },
    }))
  }

  function addMedia() {
    const url = mediaUrl.trim()
    if (!url) return
    updateData((current) => ({ ...current, attachments: [...(current.attachments ?? []), { id: `media-${Date.now()}`, type: mediaType, name: mediaName(url, mediaType), url, mimeType: inferredMimeType(url, mediaType) }] }))
    setMediaUrl('')
  }

  async function attachFiles(files: FileList | null) {
    if (!files) return
    const selectedFiles = Array.from(files)
    setMediaError('')
    for (const [index, file] of selectedFiles.entries()) {
      const type = fileMediaType(file)
      if (!type) { setMediaError(`${file.name} is not a supported image, audio, or video file.`); continue }
      if (file.size > MAX_MEDIA_BYTES) { setMediaError(`${file.name} is larger than the 100 MB upload limit.`); continue }
      if (type === 'image') {
        // Images belong in the media library, where a student can reach them.
        // Sending them here instead is what made every attached image invisible
        // to everybody but its uploader.
        setMediaError(`${file.name} is an image — add it under “Placed images” above, where it is stored on the server and checked before it counts.`)
        continue
      }
      const id = `media-${Date.now()}-${index}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`
      try {
        const url = await storeMediaFile(id, file)
        updateData((current) => ({ ...current, attachments: [...(current.attachments ?? []), { id, type, name: file.name, url, mimeType: file.type || undefined, size: file.size }] }))
        setMediaError(`${file.name} is stored in this browser only. Recordings and clips are not held on the server yet, so students cannot play it.`)
      } catch {
        setMediaError(`${file.name} could not be stored. Check available browser storage and try again.`)
      }
    }
  }

  function removeAttachment(attachment: MediaAttachment) {
    void removeStoredMedia(attachment.url).catch(() => {
      setMediaError(`${attachment.name} was removed from the question, but its local file could not be cleared.`)
    })
    updateData((current) => ({ ...current, attachments: (current.attachments ?? []).filter((item) => item.id !== attachment.id) }))
  }

  return overlayPortal(
    <div className="fixed inset-0 z-50 bg-paper" role="dialog" aria-modal="true" aria-labelledby="question-editor-title">
      <form className="flex h-full flex-col pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]" onSubmit={(event) => { event.preventDefault(); if (!valid) return; const finalData = draft.questionData ?? blankQuestionData(); onSave({ ...draft, id: draft.id || `question-${Date.now()}`, title: draft.title.trim(), updatedAt: new Date().toISOString(), fields: { Topic: finalData.tags.topic, Difficulty: finalData.tags.intendedDifficulty, Vignette: draft.fields.Vignette ?? '', Explanation: draft.fields.Explanation ?? '' }, questionData: finalData }) }}>
        <header className="flex shrink-0 flex-wrap items-center gap-2 border-b border-line bg-surface px-3 py-2.5 sm:h-16 sm:flex-nowrap sm:gap-3 sm:px-5 sm:py-0">
          <span className="grid size-9 place-items-center rounded-lg bg-primary-tint text-primary-strong"><Icon icon={Tags} size={17} /></span>
          <div className="min-w-0 flex-1"><h2 id="question-editor-title" className="font-serif text-[18px] font-semibold text-ink">{item ? 'Edit question' : 'Add question'}</h2><p className="truncate text-[11.5px] text-ink-3"><span className="font-mono">{draft.id || 'Question_ID auto-generated on save'}</span> · blueprint tags and psychometric intent</p></div>
          <button type="button" onClick={onClose} className="grid size-10 place-items-center rounded-lg text-ink-3 hover:bg-inset hover:text-ink" aria-label="Close question editor"><Icon icon={X} size={19} /></button>
          <div className="flex basis-full items-center gap-2 sm:contents">
            <StatusBadgeSelect value={draft.status} onChange={(status) => setDraft((current) => ({ ...current, status }))} />
            <Button type="button" className="ml-auto sm:ml-0" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={!valid}>{item ? 'Save changes' : 'Add question'}</Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto grid max-w-[1180px] gap-4 p-3 sm:p-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(22rem,0.8fr)]">
            <div className="space-y-4">
              <Section title="Question" hint="What the student sees before the answer options." icon={Tags}>
                <div className="space-y-4">
                  <Field label="Question" htmlFor="author-question"><Textarea id="author-question" className="min-h-24 text-[15px] font-medium" value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} /></Field>
                  <Field label="Clinical vignette or lead-in" htmlFor="author-vignette"><Textarea id="author-vignette" className="min-h-28" value={draft.fields.Vignette ?? ''} onChange={(event) => setDraft((current) => ({ ...current, fields: { ...current.fields, Vignette: event.target.value } }))} /></Field>
                  <div className="grid gap-3 sm:grid-cols-2"><Field label="Attached image URL" htmlFor="author-image"><TextInput id="author-image" value={data.attachedImage} onChange={(event) => updateData((current) => ({ ...current, attachedImage: event.target.value }))} placeholder="https://…/ecg.png" /></Field><Field label="Correct answer" htmlFor="author-correct"><Select id="author-correct" value={data.correctAnswer} onChange={(event) => updateData((current) => ({ ...current, correctAnswer: event.target.value as AnswerLabel }))}>{ANSWERS.map((label) => <option key={label}>{label}</option>)}</Select></Field></div>
                  {data.attachedImage && <div className="overflow-hidden rounded-xl border border-line bg-surface-2 p-2"><ZoomableImage src={data.attachedImage} alt="Question attachment" className="max-h-64 w-full rounded-lg object-contain" /></div>}
                </div>
              </Section>

              <Section title="Answers and explanations" hint="Use A–F. Only two answers and the selected correct answer are required." icon={Image}>
                <div className="space-y-3">
                  {data.answers.map((answer, index) => (
                    <div key={answer.label} className="rounded-lg border border-line bg-surface-2/50 p-3">
                      <div className="flex items-center gap-2"><span className={answer.label === data.correctAnswer ? 'grid size-7 place-items-center rounded-full bg-success font-mono text-[12px] font-bold text-on-success' : 'grid size-7 place-items-center rounded-full border border-line-2 bg-surface font-mono text-[12px] font-bold text-ink-2'}>{answer.label}</span><span className="text-[11.5px] text-ink-3">{index < 2 ? 'Required answer slot' : 'Optional answer slot'}</span>{answer.label === data.correctAnswer && <Badge tone="success" className="ml-auto">Correct</Badge>}</div>
                      <TextInput aria-label={`Answer ${answer.label}`} className="mt-2" value={answer.text} onChange={(event) => updateData((current) => ({ ...current, answers: current.answers.map((candidate) => candidate.label === answer.label ? { ...candidate, text: event.target.value } : candidate) }))} placeholder={`Answer ${answer.label}`} />
                      <Textarea aria-label={`Explanation for answer ${answer.label}`} className="mt-2 min-h-16 text-[12.5px]" value={answer.explanation} onChange={(event) => updateData((current) => ({ ...current, answers: current.answers.map((candidate) => candidate.label === answer.label ? { ...candidate, explanation: event.target.value } : candidate) }))} placeholder="Why this answer is correct or incorrect…" />
                    </div>
                  ))}
                  <Field label="Overall worked explanation" htmlFor="author-explanation"><Textarea id="author-explanation" className="min-h-24" value={draft.fields.Explanation ?? ''} onChange={(event) => setDraft((current) => ({ ...current, fields: { ...current.fields, Explanation: event.target.value } }))} /></Field>
                </div>
              </Section>
            </div>

            <div className="space-y-4">
              {/* Images that reach a student. The attachments section below
                  predates the media library and still holds live content, so it
                  stays until that content has moved across. */}
              <Section title="Placed images" hint="Images on the stem, on an answer, or on the explanation. Each one is checked by rendering the question as the student receives it." icon={Image}>
                <MediaPlacementEditor
                  placements={data.media ?? []}
                  onChange={(media) => updateData((current) => ({ ...current, media }))}
                  previewQuestion={previewQuestion}
                />
              </Section>

              <Section title="Question attachments" hint="Upload media for reliable playback, or use a direct media-file URL. Uploaded files are stored outside the question record so audio and video are not truncated." icon={Paperclip}>
                {isStoredMediaReference(data.attachedImage ?? '') && (
                  <StrandedMediaNotice
                    reference={data.attachedImage}
                    title={draft.title}
                    onRecovered={(mediaId) => updateData((current) => ({
                      ...current,
                      attachedImage: '',
                      media: [...(current.media ?? []), { id: `plc-${mediaId}`, mediaId, slot: 'stem' as const }],
                    }))}
                  />
                )}
                <label className="mb-3 flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-line-2 bg-surface-2 px-3 text-[12.5px] font-semibold text-ink-2 hover:border-primary-line hover:bg-primary-tint/35"><Icon icon={Paperclip} size={15} />Choose audio or video<input type="file" multiple accept="audio/*,video/*,.mp3,.m4a,.aac,.wav,.mp4,.m4v,.mov,.webm" className="sr-only" onChange={(event) => { void attachFiles(event.currentTarget.files); event.currentTarget.value = '' }} /></label>
                <div className="flex flex-wrap gap-2"><Select value={mediaType} onChange={(event) => setMediaType(event.target.value as MediaAttachment['type'])} className="w-28"><option>image</option><option>audio</option><option>video</option></Select><TextInput aria-label="Attachment URL" className="min-w-0 flex-1" value={mediaUrl} onChange={(event) => setMediaUrl(event.target.value)} placeholder="Media URL" /><Button type="button" size="sm" iconLeft={Plus} onClick={addMedia}>Attach</Button></div>
                {mediaError && <p role="alert" className="mt-2 text-[11.5px] text-danger">{mediaError}</p>}
                <div className="mt-3 space-y-2">{(data.attachments ?? []).map((attachment) => <MediaAttachmentView key={attachment.id} attachment={attachment} onRemove={() => removeAttachment(attachment)} />)}</div>
              </Section>

              <Section title="Source" hint="Admin-only. Students are never shown where a question came from." icon={GraduationCap}>
                <ContentSourceFields source={draft.source} onChange={(source) => setDraft((current) => ({ ...current, source }))} />
              </Section>

              <Section title="Related evidence" hint="Where students can read around the answer." icon={Link2}>
                <EntityPicker label="Related library articles" noun="articles" options={articlePicks} selected={data.libraryIds} onChange={(libraryIds) => updateData((current) => ({ ...current, libraryIds }))} />
                <EntityPicker className="mt-4" label="Related resources" noun="resources" options={resourcePicks} selected={data.resourceIds} onChange={(resourceIds) => updateData((current) => ({ ...current, resourceIds }))} />
              </Section>

              <Section title="Question tags and blueprint" hint="Mastery evidence is awarded only to explicitly linked concepts." icon={Tags}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Related system" htmlFor="tag-module"><Select id="tag-module" value={data.tags.module} onChange={(event) => updateData((current) => ({ ...current, tags: { ...current.tags, module: event.target.value } }))}>{subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}</Select></Field>
                  <Field label="Related topic" htmlFor="tag-topic"><TextInput id="tag-topic" value={data.tags.topic} onChange={(event) => updateData((current) => ({ ...current, tags: { ...current.tags, topic: event.target.value } }))} /></Field>
                  <Field label="Related subtopic" htmlFor="tag-subtopic" className="sm:col-span-2"><TextInput id="tag-subtopic" value={data.tags.subtopic} onChange={(event) => updateData((current) => ({ ...current, tags: { ...current.tags, subtopic: event.target.value } }))} /></Field>
                  <Field label="Cognitive effort" htmlFor="tag-effort"><Select id="tag-effort" value={data.tags.cognitiveEffort} onChange={(event) => updateData((current) => ({ ...current, tags: { ...current.tags, cognitiveEffort: event.target.value as QuestionAuthoringData['tags']['cognitiveEffort'] } }))}><option>Low</option><option>Medium</option><option>High</option></Select></Field>
                  <Field label="Academic or clinical" htmlFor="tag-setting"><Select id="tag-setting" value={data.tags.setting} onChange={(event) => updateData((current) => ({ ...current, tags: { ...current.tags, setting: event.target.value as QuestionAuthoringData['tags']['setting'] } }))}><option>Academic</option><option>Clinical</option><option>Both</option></Select></Field>
                  <Field label="Intended difficulty" htmlFor="tag-intended"><Select id="tag-intended" value={data.tags.intendedDifficulty} onChange={(event) => updateData((current) => ({ ...current, tags: { ...current.tags, intendedDifficulty: event.target.value as QuestionAuthoringData['tags']['intendedDifficulty'] } }))}><option>Easy</option><option>Moderate</option><option>Hard</option><option>Challenging</option></Select></Field>
                  <Field label="Clinical-reasoning level (0–5)" htmlFor="tag-reasoning"><TextInput id="tag-reasoning" type="number" min={0} max={5} value={data.tags.clinicalReasoningLevel} onChange={(event) => updateData((current) => ({ ...current, tags: { ...current.tags, clinicalReasoningLevel: Number(event.target.value) } }))} /></Field>
                  <Field label={`Psychometric accuracy · ${inferredLabel}`} htmlFor="tag-psychometric"><TextInput id="tag-psychometric" type="number" min={0} max={100} step="any" value={data.tags.inferredDifficulty} onChange={(event) => updateData((current) => ({ ...current, tags: { ...current.tags, inferredDifficulty: Number(event.target.value) } }))} /></Field>
                  <Field label="Exam relevance (0–10)" htmlFor="tag-relevance"><TextInput id="tag-relevance" type="number" min={0} max={10} step="any" value={data.tags.examRelevance} onChange={(event) => updateData((current) => ({ ...current, tags: { ...current.tags, examRelevance: Number(event.target.value) } }))} /></Field>
                  <Field label="Question type" htmlFor="tag-qtype" hint="What the item tests."><Select id="tag-qtype" value={data.tags.questionType ?? ''} onChange={(event) => updateData((current) => ({ ...current, tags: { ...current.tags, questionType: event.target.value } }))}><option value="">— Select —</option>{['Pathophysiology', 'Diagnosis', 'Investigation', 'Treatment', 'Management', 'Mechanism', 'Classification', 'Pharmacology', 'Anatomy', 'Other'].map((qt) => <option key={qt} value={qt}>{qt}</option>)}</Select></Field>
                  <Field label="MCQ source" htmlFor="tag-source" hint="The source bucket students filter tests by."><Select id="tag-source" value={data.tags.sourceCategory ?? ''} onChange={(event) => updateData((current) => ({ ...current, tags: { ...current.tags, sourceCategory: (event.target.value || undefined) as QuestionSource | undefined } }))}><option value="">Unspecified</option>{QUESTION_SOURCES.map((s) => <option key={s} value={s}>{QUESTION_SOURCE_LABEL[s]}</option>)}</Select></Field>
                  <Field label="Clinical relevance (0–1)" htmlFor="tag-clin"><TextInput id="tag-clin" type="number" min={0} max={1} step="any" value={data.tags.clinicalRelevance ?? 0.5} onChange={(event) => updateData((current) => ({ ...current, tags: { ...current.tags, clinicalRelevance: clamp01(event.target.value) } }))} /></Field>
                  <Field label="Academic relevance (0–1)" htmlFor="tag-acad"><TextInput id="tag-acad" type="number" min={0} max={1} step="any" value={data.tags.academicRelevance ?? 0.5} onChange={(event) => updateData((current) => ({ ...current, tags: { ...current.tags, academicRelevance: clamp01(event.target.value) } }))} /></Field>
                  <Field label="Cognitive effort (0–1)" htmlFor="tag-cog"><TextInput id="tag-cog" type="number" min={0} max={1} step="any" value={data.tags.cognitiveEffortScore ?? 0.5} onChange={(event) => updateData((current) => ({ ...current, tags: { ...current.tags, cognitiveEffortScore: clamp01(event.target.value) } }))} /></Field>
                </div>
                <EntityPicker className="mt-4" label="Main concept(s) · what this question primarily tests" noun="concepts" options={conceptPicks} selected={data.tags.mainConceptIds ?? []} onChange={(mainConceptIds) => updateData((current) => ({ ...current, tags: { ...current.tags, mainConceptIds } }))} />
                <EntityPicker className="mt-4" label="Related concepts · mastery evidence" noun="concepts" options={conceptPicks} selected={data.tags.conceptIds} onChange={(conceptIds) => updateData((current) => ({ ...current, tags: { ...current.tags, conceptIds } }))} />
                <EntityPicker className="mt-4" label="Contextual concepts · no mastery evidence" noun="concepts" options={conceptPicks} selected={data.tags.contextualConceptIds} onChange={(contextualConceptIds) => updateData((current) => ({ ...current, tags: { ...current.tags, contextualConceptIds } }))} />
                <p className="mb-2 mt-4 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">Relevant universities</p><CheckList options={universityCatalogue.map((university) => ({ id: university.id, label: `${university.short} · ${university.name}` }))} selected={data.tags.universityIds} onChange={updateUniversities} />
                <p className="mb-2 mt-4 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">Relevant years</p>
                {yearOptions.length > 0
                  ? <CheckList columns={3} options={yearOptions} selected={data.tags.years} onChange={updateYears} />
                  : <p className="text-[11.5px] text-ink-3">Select a university to choose its catalogue years.</p>}
                <p className="mb-2 mt-4 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">Curriculum modules</p>
                {moduleOptions.length > 0
                  ? <CheckList options={moduleOptions} selected={data.tags.moduleIds ?? []} onChange={(moduleIds) => updateData((current) => ({ ...current, tags: { ...current.tags, moduleIds } }))} />
                  : <p className="text-[11.5px] text-ink-3">Select a university and year to choose verified modules.</p>}

                {/* Per-year exam-blueprint weight (one unique weight per selected university-year) */}
                <p className="mb-2 mt-4 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">Exam blueprint weight by year</p>
                {(() => {
                  const keys = data.tags.years
                  if (keys.length === 0) return <p className="text-[11.5px] text-ink-3">Select relevant universities and years above to set per-year weights.</p>
                  return (
                    <div className="space-y-1.5">
                      {keys.map((key) => {
                        const weight = data.tags.examWeightByYear?.[key] ?? 0.5
                        return (
                          <div key={key} className="flex items-center gap-2">
                            <span className="tnum w-24 font-mono text-[11px] text-ink-2">{key}</span>
                            <input type="range" min={0} max={1} step={0.05} value={weight} onChange={(event) => updateData((current) => ({ ...current, tags: { ...current.tags, examWeightByYear: { ...(current.tags.examWeightByYear ?? {}), [key]: clamp01(event.target.value) } } }))} className="flex-1 accent-[var(--color-primary)]" />
                            <span className="tnum w-8 text-end font-mono text-[11px] text-ink">{weight.toFixed(2)}</span>
                          </div>
                        )
                      })}
                    </div>
                  )
                })()}

                <div className="mt-4 flex items-center justify-between rounded-lg border border-line bg-surface-2 px-3 py-2.5">
                  <div className="min-w-0 pr-3">
                    <p className="text-[12.5px] font-medium text-ink">Restrict to selected years &amp; universities only</p>
                    <p className="text-[11px] leading-snug text-ink-3">When on, the question applies ONLY to the chosen years/universities — even if its subject is picked from a resource or article.</p>
                  </div>
                  <Toggle
                    label="Restrict to selected years and universities"
                    checked={(data.tags.questionOnlyFor ?? []).length > 0}
                    onChange={(on) => updateData((current) => ({ ...current, tags: { ...current.tags, questionOnlyFor: on ? [...current.tags.years, ...current.tags.universityIds] : [] } }))}
                  />
                </div>
              </Section>

              <Section title="Editorial settings" hint="Additional settings that support review and delivery." icon={Tags}>
                <div className="space-y-3"><Field label="Learning objective" htmlFor="editor-objective"><Textarea id="editor-objective" value={data.learningObjective} onChange={(event) => updateData((current) => ({ ...current, learningObjective: event.target.value }))} /></Field><Field label="Source citation" htmlFor="editor-source"><TextInput id="editor-source" value={data.sourceCitation} onChange={(event) => updateData((current) => ({ ...current, sourceCitation: event.target.value }))} /></Field><Field label="Author and reviewer notes" htmlFor="editor-notes"><Textarea id="editor-notes" value={data.authorNotes} onChange={(event) => updateData((current) => ({ ...current, authorNotes: event.target.value }))} /></Field><Field label="Estimated answer time (seconds)" htmlFor="editor-time"><TextInput id="editor-time" type="number" min={15} value={data.estimatedSeconds} onChange={(event) => updateData((current) => ({ ...current, estimatedSeconds: Number(event.target.value) }))} /></Field><div className="flex items-center justify-between rounded-lg border border-line bg-surface-2 px-3 py-2.5"><div><p className="text-[12.5px] font-medium text-ink">Randomise answer order</p><p className="text-[11px] text-ink-3">The correct-answer key follows its answer after shuffling.</p></div><Toggle checked={data.randomiseAnswers} onChange={(randomiseAnswers) => updateData((current) => ({ ...current, randomiseAnswers }))} label="Randomise answer order" /></div></div>
              </Section>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

function StatusBadgeSelect({ value, onChange }: { value: Status; onChange: (status: Status) => void }) {
  return <Select value={value} onChange={(event) => onChange(event.target.value as Status)} className="w-36">{STATUSES.map((status) => <option key={status}>{status}</option>)}</Select>
}
