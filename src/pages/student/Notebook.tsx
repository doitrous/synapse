import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { Notebook as NotebookIcon, Plus, Trash2, BookOpen, X, FileText, ImagePlus, Link2, Star, Bell, Users, ArrowLeft } from 'lucide-react'
import { ensureNotebookEditor, initialNotes, notePlainText, plainTextToEditorJson } from '@/data/notebook'
import type { Note } from '@/data/notebook'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Icon } from '@/components/ui/Icon'
import { SearchInput } from '@/components/ui/Field'
import { EmptyState } from '@/components/ui/EmptyState'
import { cn } from '@/lib/cn'
import { subjects } from '@/data/subjects'
import { Select } from '@/components/ui/Field'
import { usePersistentState } from '@/lib/usePersistentState'
import { NoteEditor } from '@/components/notebook/NoteEditor'
import { DocumentRefs } from '@/components/notebook/DocumentRefs'
import { useLiveLibrary } from '@/lib/useLiveLibrary'
import { formatRelativeTime } from '@/lib/format'
import { resolveMediaSource } from '@/lib/mediaStorage'
import { ZoomableImage } from '@/components/ui/MediaAttachmentView'
import { ShareDialog } from '@/components/share/ShareDialog'
import { useT } from '@/lib/i18n'
import { overlayPortal } from '@/lib/overlayPortal'
import { API_MODE, apiFetchBlob } from '@/lib/api'
import { setShareFollow, setShareStar, useSharedDocuments, type ShareSummary } from '@/lib/useShares'
import { useMyDocuments, type MyDocument } from '@/lib/useMyDocuments'

type NotebookTab = 'your' | 'shared'

// Keyed on the ShareAccess enum — never render its raw values to a student.
const SHARE_ACCESS_LABEL: Record<string, string> = {
  private: 'Private',
  view: 'Can view',
  edit: 'Can edit',
}

interface NoteCapturePayload {
  quote: string
  sourceTitle?: string
  sourceUrl?: string
  articleId?: string
  topicTitle?: string
}

export function Notebook() {
  const t = useT()
  const [params] = useSearchParams()
  const location = useLocation()
  const linkedArticle = params.get('article')
  const createFromArticle = params.get('new') === '1'
  const { subtopics: allSubtopics } = useLiveLibrary()
  const [notes, setNotes] = usePersistentState<Note[]>('synapse.notebook.notes', initialNotes)
  // Was hardcoded to the demo note id `nb1`, so a student whose notes did not
  // include it opened on "No note selected" even with notes in the list.
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState<NotebookTab>('your')
  const [listOpen, setListOpen] = useState(false)
  const [tagOpen, setTagOpen] = useState(false)
  const [newTag, setNewTag] = useState('')
  const [focusMode, setFocusMode] = usePersistentState<boolean>('synapse.notebook.focusMode', false)
  const [imageError, setImageError] = useState<string | null>(null)
  const [sharing, setSharing] = useState(false)
  const [pendingCapture, setPendingCapture] = useState<NoteCapturePayload | null>(null)
  const [captureTarget, setCaptureTarget] = useState('')
  const sharedNotes = useSharedDocuments('note')
  const documents = useMyDocuments()
  const uploadDocument = documents.upload
  const handledArticle = useRef<string | null>(null)
  const handledCapture = useRef(false)
  const migratingImages = useRef(new Set<string>())

  useEffect(() => {
    if (notes.some((entry) => !entry.editorJson || entry.plainText === undefined)) {
      setNotes((current) => current.map(ensureNotebookEditor))
    }
  }, [notes, setNotes])

  // Existing notes may still carry a bounded data URL from the old editor.
  // Move it once into the managed asset ledger so it syncs, is quota-counted,
  // and is not re-uploaded with every later note edit.
  useEffect(() => {
    const legacy = notes.find((entry) => entry.imageData?.startsWith('data:') && !entry.imageDocumentId && !migratingImages.current.has(entry.id))
    if (!legacy?.imageData) return
    migratingImages.current.add(legacy.id)
    void fetch(legacy.imageData)
      .then((response) => response.blob())
      .then((blob) => uploadDocument(new File([blob], `${legacy.id}-image.${blob.type.includes('png') ? 'png' : 'jpg'}`, { type: blob.type || 'image/jpeg' }), undefined, { kind: 'notebook', id: legacy.id }))
      .then((imageDocumentId) => setNotes((current) => current.map((entry) => entry.id === legacy.id ? { ...entry, imageDocumentId, imageData: undefined, updatedAt: new Date().toISOString() } : entry)))
      .catch(() => migratingImages.current.delete(legacy.id))
  }, [notes, setNotes, uploadDocument])

  const needle = query.trim().toLowerCase()
  const filtered = notes.filter(
    (n) =>
      !needle
      || n.title.toLowerCase().includes(needle)
      || notePlainText(n).toLowerCase().includes(needle)
      // Tags are the page's most prominent affordance; not searching them was
      // the one place the search box quietly did less than it looked like.
      || n.tags.some((tag) => tag.toLowerCase().includes(needle)),
  )
  const note = notes.find((n) => n.id === selectedId) ?? null
  const editorNote = note ? ensureNotebookEditor(note) : null

  // A phrase sent here from the context menu or Library. It travels in
  // sessionStorage rather than the URL so a long quote does not end up in
  // browser history. Arrival opens a destination picker instead of silently
  // creating a new note.
  useEffect(() => {
    if (params.get('capture') !== '1' || handledCapture.current) return
    handledCapture.current = true
    let captured: string | null = null
    try {
      captured = sessionStorage.getItem('synapse.notebook.capture')
      sessionStorage.removeItem('synapse.notebook.capture')
    } catch { /* ignore */ }
    if (!captured) return
    setPendingCapture(parseCapture(captured))
  }, [params, setNotes])

  useEffect(() => {
    if (!linkedArticle) return
    const article = allSubtopics.find((item) => item.id === linkedArticle)
    if (!article) return
    if (createFromArticle && handledArticle.current !== linkedArticle) {
      handledArticle.current = linkedArticle
      const id = `nb${Date.now()}`
      const suggested = `What I need to remember\n• ${article.keyPoints[0] ?? ''}\n\nWhere I could lose the mark\n• Add the trap that would cost you a mark\n\nOne question to test myself\n• What finding changes the next step?`
      setNotes((current) => [{ id, title: `${article.title} notes`, body: suggested, editorJson: plainTextToEditorJson(suggested), plainText: suggested, legacyMarkdownSource: suggested, revision: 1, tags: [article.topicTitle], subjectId: article.subjectId, subtopicId: article.id, subtopicTitle: `${article.topicTitle} · ${article.title}`, updatedAt: new Date().toISOString() }, ...current])
      setSelectedId(id)
      return
    }
    const existing = notes.find((item) => item.subtopicId === linkedArticle)
    if (existing) setSelectedId(existing.id)
  }, [allSubtopics, createFromArticle, linkedArticle, notes, setNotes])

  function update(id: string, patch: Partial<Note>) {
    setNotes((ns) => ns.map((n) => (n.id === id ? { ...ensureNotebookEditor(n), ...patch, revision: (n.revision ?? 1) + 1, updatedAt: new Date().toISOString() } : n)))
  }
  function newNote() {
    const id = `nb${Date.now()}`
    const article = allSubtopics.find((item) => item.id === linkedArticle)
    setNotes((ns) => [{ id, title: article ? `${article.title} notes` : 'Untitled note', body: '', editorJson: plainTextToEditorJson(''), plainText: '', legacyMarkdownSource: '', revision: 1, tags: article ? [article.topicTitle] : [], subjectId: article?.subjectId, subtopicId: article?.id, subtopicTitle: article ? `${article.topicTitle} · ${article.title}` : undefined, updatedAt: new Date().toISOString() }, ...ns])
    setSelectedId(id)
    setListOpen(false)
  }
  function remove(id: string) {
    setNotes((ns) => ns.filter((n) => n.id !== id))
    setSelectedId((cur) => (cur === id ? (notes.find((n) => n.id !== id)?.id ?? null) : cur))
  }

  function addTag(value: string) {
    const tag = value.trim()
    if (!note) return
    const current = ensureNotebookEditor(note)
    if (!tag || current.tags.some((item) => item.toLowerCase() === tag.toLowerCase())) return
    const subject = subjects.find((item) => item.name.toLowerCase() === tag.toLowerCase())
    update(current.id, { tags: [...current.tags, tag], subjectId: subject?.id ?? current.subjectId })
    setNewTag('')
  }

  function removeTag(value: string) {
    if (!note) return
    const current = ensureNotebookEditor(note)
    update(current.id, { tags: current.tags.filter((tag) => tag !== value) })
  }

  function pasteImage(event: React.ClipboardEvent<HTMLDivElement>) {
    const item = [...event.clipboardData.items].find((entry) => entry.type.startsWith('image/'))
    const file = item?.getAsFile()
    if (!file || !note) return
    event.preventDefault()
    const noteId = note.id
    setImageError(null)
    documents.upload(file, undefined, { kind: 'notebook', id: noteId })
      .then((imageDocumentId) => update(noteId, { imageDocumentId, imageData: undefined }))
      .catch((error: unknown) => setImageError(error instanceof Error ? error.message : t('That image could not be attached.')))
  }

  function captureText(payload: NoteCapturePayload): string {
    const source = [
      payload.sourceTitle ? `Source: ${payload.sourceTitle}` : '',
      payload.topicTitle ? `Topic: ${payload.topicTitle}` : '',
      payload.sourceUrl ? `Link: ${payload.sourceUrl}` : '',
    ].filter(Boolean).join('\n')
    return `> ${payload.quote.replace(/\n/g, '\n> ')}${source ? `\n\n${source}` : ''}\n`
  }

  function createFromCapture(payload: NoteCapturePayload) {
    const text = captureText(payload)
    const id = `nb${Date.now()}`
    const firstLine = payload.sourceTitle || payload.quote.split('\n')[0].trim()
    const article = payload.articleId ? allSubtopics.find((item) => item.id === payload.articleId) : null
    setNotes((current) => [{
      id,
      title: firstLine.length > 56 ? `${firstLine.slice(0, 56)}…` : firstLine || t('Captured note'),
      body: text,
      editorJson: plainTextToEditorJson(text),
      plainText: text,
      legacyMarkdownSource: text,
      revision: 1,
      tags: article?.topicTitle ? [article.topicTitle] : [],
      subjectId: article?.subjectId,
      subtopicId: article?.id,
      subtopicTitle: article ? `${article.topicTitle} · ${article.title}` : payload.topicTitle,
      updatedAt: new Date().toISOString(),
    }, ...current])
    setSelectedId(id)
    setPendingCapture(null)
    setCaptureTarget('')
  }

  function appendCapture(payload: NoteCapturePayload, id: string) {
    const text = captureText(payload)
    update(id, {
      plainText: `${notePlainText(notes.find((entry) => entry.id === id) ?? { body: '', plainText: '', editorJson: undefined })}\n\n${text}`,
      editorJson: plainTextToEditorJson(`${notePlainText(notes.find((entry) => entry.id === id) ?? { body: '', plainText: '', editorJson: undefined })}\n\n${text}`),
    })
    setSelectedId(id)
    setPendingCapture(null)
    setCaptureTarget('')
  }

  const listPane = (
    <>
      <div className="space-y-2 p-3">
        <div className="grid grid-cols-2 rounded-lg border border-line bg-surface-2 p-0.5">
          {(['your', 'shared'] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setTab(value)}
              className={cn('rounded-md px-2 py-1.5 text-[12px] font-semibold transition-colors', tab === value ? 'bg-surface text-primary-strong shadow-panel' : 'text-ink-3 hover:text-ink')}
            >
              {value === 'your' ? t('Your') : t('Shared')}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tab === 'shared' ? t('Search shared notes…') : t('Search notes…')}
          />
          {tab === 'your' && <IconButton icon={Plus} label={t('New note')} variant="surface" onClick={newNote} />}
        </div>
      </div>
      {tab === 'your' ? (
        <ul className="flex-1 overflow-y-auto px-2 pb-3">
          {filtered.length === 0 && (
            <li className="px-2.5 py-6 text-center text-[12.5px] leading-relaxed text-ink-3">
              {notes.length === 0 ? t('No notes yet. Start one with the + button.') : t('No note matches that search.')}
            </li>
          )}
          {filtered.map((n) => (
            <li key={n.id}>
              <button
                onClick={() => {
                  setSelectedId(n.id)
                  setListOpen(false)
                }}
                className={cn(
                  'mb-0.5 w-full rounded-md px-2.5 py-2 text-start transition-colors',
                  selectedId === n.id ? 'bg-primary-tint' : 'hover:bg-inset',
                )}
              >
                <p className={cn('truncate text-[13.5px] font-medium', selectedId === n.id ? 'text-primary-strong' : 'text-ink')}>
                  {n.title || 'Untitled note'}
                </p>
                <p className="mt-0.5 truncate text-[12px] text-ink-3">
                  {notePlainText(n).split('\n')[0] || 'No content yet'}
                </p>
                <p className="mt-1 text-[11px] text-ink-3">{formatRelativeTime(n.updatedAt)}</p>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <SharedNotesList query={query} shared={sharedNotes} onClose={() => setListOpen(false)} />
      )}
    </>
  )

  return (
    <div className="flex h-[calc(100dvh-3.5rem-env(safe-area-inset-top))]">
      {!focusMode && (
        <aside className="hidden w-72 shrink-0 flex-col border-r border-line bg-surface lg:flex">
          <div className="flex h-12 items-center gap-2 border-b border-line px-4">
            <Icon icon={NotebookIcon} size={16} className="text-primary" />
            <span className="font-serif text-[16px] font-semibold text-ink">Notebook</span>
            <span className="tnum ml-auto font-mono text-[12px] text-ink-3">{notes.length}</span>
          </div>
          {listPane}
        </aside>
      )}

      <div className="flex-1 overflow-y-auto">
        {!focusMode && (
          <div className="flex items-center gap-2 border-b border-line px-4 py-2 lg:hidden">
            <Button variant="secondary" size="sm" iconLeft={NotebookIcon} onClick={() => setListOpen(true)}>
              All notes
            </Button>
            <Button variant="secondary" size="sm" iconLeft={Plus} onClick={newNote}>
              New
            </Button>
          </div>
        )}

        {editorNote && note ? (
          <div className="mx-auto max-w-[46rem] px-5 py-8 sm:px-8">
            <div className="mb-3 lg:hidden">
              <button
                type="button"
                onClick={() => setListOpen(true)}
                className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-[12.5px] font-medium text-ink-2 shadow-panel transition-colors hover:border-primary-line hover:text-primary-strong"
              >
                <Icon icon={ArrowLeft} size={15} className="shrink-0 rtl:-scale-x-100" />
                <span className="truncate">{t('Back to notes')}</span>
              </button>
            </div>
            <div className="mb-4 flex items-center justify-between gap-3">
              {editorNote.subtopicId ? (
                <Link
                  to={`/app/library?s=${editorNote.subtopicId}`}
                  className="inline-flex items-center gap-1.5 rounded-md border border-primary-line bg-primary-tint/60 px-2.5 py-1.5 text-[12.5px] font-medium text-primary-strong transition-colors hover:bg-primary-tint"
                >
                  <Icon icon={BookOpen} size={14} />
                  {editorNote.subtopicTitle}
                </Link>
              ) : (
                <span className="text-[12px] text-ink-3">Not linked to the library</span>
              )}
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-ink-3">{t('Edited')} {formatRelativeTime(editorNote.updatedAt)} · r{editorNote.revision ?? 1}</span>
                <IconButton icon={Link2} label={t('Share this note')} size="sm" onClick={() => setSharing(true)} />
                <IconButton icon={Trash2} label={t('Delete note')} size="sm" onClick={() => remove(editorNote.id)} />
              </div>
            </div>

            <input
              value={editorNote.title}
              onChange={(e) => update(editorNote.id, { title: e.target.value })}
              placeholder={t('Note title')}
              className="w-full bg-transparent font-serif text-[27px] font-semibold tracking-[-0.02em] text-ink outline-none placeholder:text-ink-3"
            />

            <div className="relative mt-4 flex flex-wrap items-center gap-1.5 border-y border-line py-3">
              <span className="mr-1 text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">Tags</span>
              {editorNote.tags.map((tag) => <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-line-2 bg-surface-2 py-1 pl-2.5 pr-1.5 text-[11.5px] font-medium text-ink-2">{tag}<button type="button" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`} className="rounded-full p-0.5 text-ink-3 hover:bg-inset hover:text-ink"><Icon icon={X} size={11} /></button></span>)}
              <button type="button" onClick={() => setTagOpen((open) => !open)} className="grid size-11 place-items-center rounded-full border border-dashed border-line-2 text-ink-3 transition-colors hover:border-primary hover:bg-primary-tint hover:text-primary sm:size-7" aria-label="Add a tag"><Icon icon={Plus} size={14} strokeWidth={2.4} /></button>
              {tagOpen && <div className="absolute left-10 top-[calc(100%+0.4rem)] z-20 w-72 rounded-xl border border-line bg-surface p-3 shadow-pop">
                <p className="text-[11.5px] font-bold text-ink">Tag a subject or create your own</p>
                <div className="mt-2 flex flex-wrap gap-1.5">{subjects.filter((subject) => !editorNote.tags.includes(subject.name)).map((subject) => <button type="button" key={subject.id} onClick={() => addTag(subject.name)} className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-ink-2 hover:border-primary-line hover:text-ink">{subject.name}</button>)}</div>
                <div className="mt-3 flex gap-1.5"><input value={newTag} onChange={(event) => setNewTag(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') addTag(newTag) }} placeholder="New tag…" className="h-11 min-w-0 flex-1 rounded-lg border border-line-2 bg-surface px-2.5 text-[12px] text-ink outline-none focus:border-primary sm:h-8" /><Button size="sm" variant="primary" onClick={() => addTag(newTag)} disabled={!newTag.trim()}>Add</Button></div>
                <div className="mt-3 flex justify-end border-t border-line pt-3"><Button size="sm" variant="secondary" onClick={() => setTagOpen(false)}>{t('Done')}</Button></div>
              </div>}
              <label className="ml-auto flex min-w-56 items-center gap-2 text-[11.5px] text-ink-3"><span className="shrink-0">Related article</span><Select className="h-11 sm:h-8" value={editorNote.subtopicId ?? ''} onChange={(event) => { const article = allSubtopics.find((item) => item.id === event.target.value); update(editorNote.id, { subtopicId: article?.id, subtopicTitle: article ? `${article.topicTitle} · ${article.title}` : undefined, subjectId: article?.subjectId ?? editorNote.subjectId }) }}><option value="">None</option>{allSubtopics.map((article) => <option key={article.id} value={article.id}>{article.title}</option>)}</Select></label>
            </div>

            {/* The documents this note is about — the library's and the
                student's own alike. See `DocumentRefs`. */}
            <div className="mt-3">
              <DocumentRefs
                refs={editorNote.resourceRefs ?? []}
                onChange={(next) => update(editorNote.id, { resourceRefs: next })}
                location={location}
              />
            </div>

            {(editorNote.imageDocumentId || editorNote.imageData) && <div className="relative mt-4 overflow-hidden rounded-lg border border-line bg-surface"><ManagedNotebookImage document={documents.items.find((item) => item.id === editorNote.imageDocumentId)} documentId={editorNote.imageDocumentId} legacySource={editorNote.imageData} /><IconButton icon={X} label="Remove image" size="sm" className="absolute right-2 top-2 bg-surface shadow-panel" onClick={() => update(editorNote.id, { imageDocumentId: undefined, imageData: undefined })} /></div>}

            <div className="mt-5">
              <NoteEditor
                key={editorNote.id}
                editorJson={editorNote.editorJson!}
                onChange={(next) => update(editorNote.id, { editorJson: next.editorJson, plainText: next.plainText })}
                onPaste={pasteImage}
                placeholder={t('Start writing, or paste a copied image…')}
                attachedMediaCount={editorNote.imageDocumentId || editorNote.imageData ? 1 : 0}
                notePosition={{ index: Math.max(1, notes.findIndex((entry) => entry.id === editorNote.id) + 1), total: notes.length }}
                focusMode={focusMode}
                onToggleFocus={() => setFocusMode((current) => !current)}
              />
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-[11.5px] text-ink-3"><Icon icon={ImagePlus} size={13} />{t('Paste an image from your clipboard directly into this note.')}</p>
            {imageError && <p role="status" className="mt-1.5 text-[11.5px] text-danger">{imageError}</p>}

            {/* Published as its own copy under its own link — see `ShareDialog`.
                The payload is read when the dialog publishes, so what goes out
                is what is on screen at that moment rather than whatever the
                note held when the button was first drawn. */}
            <ShareDialog
              open={sharing}
              onClose={() => setSharing(false)}
              handle={`note:${editorNote.id}`}
              kind="note"
              title={editorNote.title || t('Untitled note')}
              payload={() => ({ title: editorNote.title, editorJson: editorNote.editorJson, plainText: editorNote.plainText, legacyMarkdownSource: editorNote.legacyMarkdownSource, imageDocumentId: editorNote.imageDocumentId, imageData: editorNote.imageData, tags: editorNote.tags, subjectId: editorNote.subjectId, subtopicId: editorNote.subtopicId, revision: editorNote.revision })}
            />
          </div>
        ) : (
          <EmptyState
            icon={FileText}
            title={t('No note selected')}
            description={t('Pick a note from the list or create a new one.')}
            action={
              <Button variant="primary" size="sm" iconLeft={Plus} onClick={newNote}>
                New note
              </Button>
            }
          />
        )}
      </div>

      {pendingCapture && overlayPortal(
        <div className="fixed inset-0 z-50 grid items-end bg-ink/30 p-3 animate-fade sm:place-items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="capture-picker-title">
          <div className="w-full max-w-lg rounded-2xl border border-line bg-surface shadow-pop">
            <div className="border-b border-line px-5 py-4">
              <h2 id="capture-picker-title" className="font-serif text-[18px] font-semibold text-ink">{t('Save this note capture')}</h2>
              <p className="mt-1 text-[12.5px] leading-relaxed text-ink-2">{t('Append the quote to an existing note, or create a new note with the source context preserved.')}</p>
            </div>
            <div className="space-y-4 p-5">
              <blockquote className="max-h-32 overflow-y-auto rounded-xl border border-line bg-surface-2 px-3 py-2 text-[12.5px] leading-relaxed text-ink-2">
                {pendingCapture.quote}
              </blockquote>
              {pendingCapture.sourceTitle && <p className="text-[12px] text-ink-3">{t('Source')}: <span className="text-ink-2">{pendingCapture.sourceTitle}</span></p>}
              <label className="block">
                <span className="mb-1.5 block text-[12px] font-semibold text-ink-2">{t('Append to existing note')}</span>
                <Select value={captureTarget} onChange={(event) => setCaptureTarget(event.target.value)}>
                  <option value="">{t('Choose a note')}</option>
                  {notes.map((entry) => <option key={entry.id} value={entry.id}>{entry.title || t('Untitled note')}</option>)}
                </Select>
              </label>
            </div>
            <div className="flex flex-wrap gap-2 border-t border-line px-5 py-4">
              <Button variant="secondary" onClick={() => createFromCapture(pendingCapture)}>{t('Create new note')}</Button>
              <Button variant="primary" disabled={!captureTarget} onClick={() => appendCapture(pendingCapture, captureTarget)}>{t('Append to note')}</Button>
              <Button className="ms-auto" variant="ghost" onClick={() => { setPendingCapture(null); setCaptureTarget('') }}>{t('Cancel')}</Button>
            </div>
          </div>
        </div>
      )}

      {listOpen && overlayPortal(
        <div className="fixed inset-0 z-40 lg:hidden">
          <button type="button" aria-label="Close notes list" className="absolute inset-0 size-full cursor-default bg-ink/30 animate-fade" onClick={() => setListOpen(false)} />
          <div className="animate-slide-x absolute inset-y-0 left-0 flex w-[min(17rem,calc(100vw-3rem))] flex-col bg-surface pb-[env(safe-area-inset-bottom)] shadow-pop">
            <div className="flex h-12 items-center justify-between border-b border-line px-4">
              <span className="font-serif text-[16px] font-semibold text-ink">Notebook</span>
              <button onClick={() => setListOpen(false)} className="text-ink-3 hover:text-ink">
                <Icon icon={X} size={18} />
              </button>
            </div>
            {listPane}
          </div>
        </div>
      )}
    </div>
  )
}

function ManagedNotebookImage({ document, documentId, legacySource }: { document?: MyDocument; documentId?: string; legacySource?: string }) {
  const t = useT()
  const [source, setSource] = useState(legacySource ?? '')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    let revoke = false
    let resolvedUrl = ''
    if (legacySource) { setSource(legacySource); return undefined }
    if (!documentId) return undefined
    setSource('')
    setError('')
    void (async () => {
      try {
        if (!API_MODE && document?.ref) {
          const resolved = await resolveMediaSource(document.ref)
          resolvedUrl = resolved.url
          revoke = resolved.revoke
        } else {
          const blob = await apiFetchBlob(`/my-documents/${encodeURIComponent(documentId)}/file`)
          resolvedUrl = URL.createObjectURL(blob)
          revoke = true
        }
        if (active) setSource(resolvedUrl)
        else if (revoke) URL.revokeObjectURL(resolvedUrl)
      } catch {
        if (active) setError(t('That notebook image could not be loaded.'))
      }
    })()
    return () => {
      active = false
      if (revoke && resolvedUrl) URL.revokeObjectURL(resolvedUrl)
    }
  }, [document?.ref, documentId, legacySource, t])

  if (error) return <p role="alert" className="p-4 text-center text-[12px] text-danger">{error}</p>
  if (!source) return <p role="status" className="p-4 text-center text-[12px] text-ink-3">{t('Loading image…')}</p>
  return <ZoomableImage src={source} alt={document?.title ?? t('Pasted into this note')} className="max-h-96 w-full object-contain" />
}

function parseCapture(raw: string): NoteCapturePayload {
  try {
    const parsed = JSON.parse(raw) as Partial<NoteCapturePayload> & { text?: string }
    const quote = String(parsed.quote ?? parsed.text ?? '').trim()
    if (quote) {
      return {
        quote,
        sourceTitle: parsed.sourceTitle,
        sourceUrl: parsed.sourceUrl,
        articleId: parsed.articleId,
        topicTitle: parsed.topicTitle,
      }
    }
  } catch { /* legacy plain text capture */ }
  return { quote: raw }
}

function DemoSharedNotesList({ query }: { query: string }) {
  const needle = query.trim().toLowerCase()
  const items = [
    { title: 'Cranial nerve localisation', owner: '@neuro-nora', topic: 'Neurology', stars: 18, following: true, collaborators: 3 },
    { title: 'Heart murmurs · bedside distinctions', owner: '@cardio-karim', topic: 'Cardiovascular', stars: 12, following: false, collaborators: 2 },
    { title: 'Anaemia pattern recognition', owner: '@hema-hana', topic: 'Haematology', stars: 9, following: true, collaborators: 4 },
  ].filter((item) => !needle || `${item.title} ${item.owner} ${item.topic}`.toLowerCase().includes(needle))

  return (
    <div className="flex-1 overflow-y-auto px-2 pb-3">
      <p className="mx-2 mb-2 rounded-md bg-primary-tint px-2.5 py-2 text-[11px] font-medium text-primary-strong">Demo shared library · live access stays server-enforced</p>
      {items.map((item) => (
        <section key={item.title} className="mb-3">
          <p className="px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">{item.topic}</p>
          <div className="rounded-lg border border-line bg-surface p-2">
            <p className="truncate text-[13px] font-semibold text-ink">{item.title}</p>
            <p className="mt-0.5 truncate text-[11.5px] text-ink-3">{item.owner} · View and collaborate</p>
            <div className="mt-2 flex items-center gap-2 text-[11px] text-ink-3">
              <span className="inline-flex items-center gap-1"><Icon icon={Star} size={12} />{item.stars}</span>
              <span className="inline-flex items-center gap-1"><Icon icon={Users} size={12} />{item.collaborators}</span>
              <span className="ms-auto inline-flex items-center gap-1 font-medium text-ink-2"><Icon icon={Bell} size={12} />{item.following ? 'Following' : 'Follow'}</span>
            </div>
          </div>
        </section>
      ))}
      {!items.length && <p className="px-3 py-6 text-center text-[12px] text-ink-3">No demo shared note matches.</p>}
    </div>
  )
}

function SharedNotesList({
  query,
  shared,
  onClose,
}: {
  query: string
  shared: ReturnType<typeof useSharedDocuments>
  onClose: () => void
}) {
  const t = useT()
  const needle = query.trim().toLowerCase()
  const items = shared.items
    .filter((item) => !needle || `${item.title} ${item.ownerName ?? ''} ${(item.topics ?? []).join(' ')}`.toLowerCase().includes(needle))
    .sort((a, b) => (b.starCount ?? 0) - (a.starCount ?? 0) || new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  const groups = new Map<string, ShareSummary[]>()
  for (const item of items) {
    const key = item.topics?.[0] ?? t('Shared notes')
    groups.set(key, [...(groups.get(key) ?? []), item])
  }

  async function toggleStar(item: ShareSummary) {
    if (!API_MODE) return
    try {
      const updated = await setShareStar(item.id, !item.starred)
      shared.setItems((current) => current.map((entry) => entry.id === item.id ? updated : entry))
    } catch { /* the server keeps the truth */ }
  }

  async function toggleFollow(item: ShareSummary) {
    if (!API_MODE) return
    try {
      const updated = await setShareFollow(item.id, !item.following)
      shared.setItems((current) => current.map((entry) => entry.id === item.id ? updated : entry))
    } catch { /* the server keeps the truth */ }
  }

  if (shared.loading) return <p className="px-4 py-6 text-center text-[12.5px] text-ink-3">{t('Opening shared notes…')}</p>
  if (!API_MODE) return <DemoSharedNotesList query={query} />
  if (shared.error) return <p role="alert" className="px-4 py-6 text-center text-[12.5px] text-danger">{t(shared.error)}</p>
  if (!items.length) return <p className="px-4 py-6 text-center text-[12.5px] text-ink-3">{t('No shared notes match.')}</p>

  return (
    <div className="flex-1 overflow-y-auto px-2 pb-3">
      {[...groups.entries()].map(([group, entries]) => (
        <section key={group} className="mb-3">
          <p className="px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">{group}</p>
          <ul className="space-y-1">
            {entries.map((item) => (
              <li key={item.id} className="rounded-lg border border-line bg-surface p-2">
                <Link to={`/s/${item.id}`} onClick={onClose} className="block">
                  <p className="truncate text-[13px] font-semibold text-ink">{item.title}</p>
                  <p className="mt-0.5 truncate text-[11.5px] text-ink-3">{item.ownerName ?? t('Shared by a classmate')} · {t(SHARE_ACCESS_LABEL[item.permission ?? item.access] ?? (item.permission ?? item.access))}</p>
                </Link>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-ink-3">
                  <span className="inline-flex items-center gap-1"><Icon icon={Star} size={12} />{item.starCount ?? 0}</span>
                  {item.collaborators?.length ? <span className="inline-flex min-w-0 items-center gap-1"><Icon icon={Users} size={12} />{item.collaborators.length}</span> : null}
                  <button type="button" onClick={() => void toggleStar(item)} className="ms-auto rounded-md px-1.5 py-1 font-medium text-ink-2 hover:bg-inset">{item.starred ? t('Unstar') : t('Star')}</button>
                  <button type="button" onClick={() => void toggleFollow(item)} className="rounded-md px-1.5 py-1 font-medium text-ink-2 hover:bg-inset"><Icon icon={Bell} size={12} className="me-1 inline" />{item.following ? t('Following') : t('Follow')}</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
