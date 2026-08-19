import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { Notebook as NotebookIcon, Plus, Trash2, BookOpen, X, FileText, ImagePlus, Eye, PenLine } from 'lucide-react'
import { initialNotes } from '@/data/notebook'
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
import { useLocalPreference } from '@/lib/useLocalPreference'
import { useLiveLibrary } from '@/lib/useLiveLibrary'
import { formatRelativeTime } from '@/lib/format'
import { imageFileToBoundedDataUrl } from '@/lib/mediaStorage'
import { ZoomableImage } from '@/components/ui/MediaAttachmentView'
import { useT } from '@/lib/i18n'
import { overlayPortal } from '@/lib/overlayPortal'

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
  const [listOpen, setListOpen] = useState(false)
  const [tagOpen, setTagOpen] = useState(false)
  const [newTag, setNewTag] = useState('')
  const [imageError, setImageError] = useState<string | null>(null)
  const handledArticle = useRef<string | null>(null)
  const handledCapture = useRef(false)
  // Write or read. Kept per device rather than per note: it is a preference
  // about how someone works, not a property of any one note.
  const [reading, , toggleReading] = useLocalPreference('synapse.notebook.reading', false)

  const needle = query.trim().toLowerCase()
  const filtered = notes.filter(
    (n) =>
      !needle
      || n.title.toLowerCase().includes(needle)
      || n.body.toLowerCase().includes(needle)
      // Tags are the page's most prominent affordance; not searching them was
      // the one place the search box quietly did less than it looked like.
      || n.tags.some((tag) => tag.toLowerCase().includes(needle)),
  )
  const note = notes.find((n) => n.id === selectedId) ?? null

  // A phrase sent here from the right-click menu. It travels in sessionStorage
  // rather than the URL so a long quote does not end up in browser history, and
  // it is consumed on arrival so a later visit does not re-create the note.
  useEffect(() => {
    if (params.get('capture') !== '1' || handledCapture.current) return
    handledCapture.current = true
    let captured: string | null = null
    try {
      captured = sessionStorage.getItem('synapse.notebook.capture')
      sessionStorage.removeItem('synapse.notebook.capture')
    } catch { /* ignore */ }
    if (!captured) return
    const id = `nb${Date.now()}`
    const firstLine = captured.split('\n')[0].trim()
    setNotes((current) => [{
      id,
      title: firstLine.length > 48 ? `${firstLine.slice(0, 48)}…` : firstLine || 'Captured note',
      body: `> ${captured.replace(/\n/g, '\n> ')}\n\n`,
      tags: [],
      updatedAt: new Date().toISOString(),
    }, ...current])
    setSelectedId(id)
  }, [params, setNotes])

  useEffect(() => {
    if (!linkedArticle) return
    const article = allSubtopics.find((item) => item.id === linkedArticle)
    if (!article) return
    if (createFromArticle && handledArticle.current !== linkedArticle) {
      handledArticle.current = linkedArticle
      const id = `nb${Date.now()}`
      const suggested = `What I need to remember\n• ${article.keyPoints[0] ?? ''}\n\nWhere I could lose the mark\n• Add the trap that would cost you a mark\n\nOne question to test myself\n• What finding changes the next step?`
      setNotes((current) => [{ id, title: `${article.title} notes`, body: suggested, tags: [article.topicTitle], subjectId: article.subjectId, subtopicId: article.id, subtopicTitle: `${article.topicTitle} · ${article.title}`, updatedAt: new Date().toISOString() }, ...current])
      setSelectedId(id)
      return
    }
    const existing = notes.find((item) => item.subtopicId === linkedArticle)
    if (existing) setSelectedId(existing.id)
  }, [allSubtopics, createFromArticle, linkedArticle, notes, setNotes])

  function update(id: string, patch: Partial<Note>) {
    setNotes((ns) => ns.map((n) => (n.id === id ? { ...n, ...patch, updatedAt: new Date().toISOString() } : n)))
  }
  function newNote() {
    const id = `nb${Date.now()}`
    const article = allSubtopics.find((item) => item.id === linkedArticle)
    setNotes((ns) => [{ id, title: article ? `${article.title} notes` : 'Untitled note', body: '', tags: article ? [article.topicTitle] : [], subjectId: article?.subjectId, subtopicId: article?.id, subtopicTitle: article ? `${article.topicTitle} · ${article.title}` : undefined, updatedAt: new Date().toISOString() }, ...ns])
    setSelectedId(id)
    setListOpen(false)
  }
  function remove(id: string) {
    setNotes((ns) => ns.filter((n) => n.id !== id))
    setSelectedId((cur) => (cur === id ? (notes.find((n) => n.id !== id)?.id ?? null) : cur))
  }

  function addTag(value: string) {
    const tag = value.trim()
    if (!note || !tag || note.tags.some((item) => item.toLowerCase() === tag.toLowerCase())) return
    const subject = subjects.find((item) => item.name.toLowerCase() === tag.toLowerCase())
    update(note.id, { tags: [...note.tags, tag], subjectId: subject?.id ?? note.subjectId })
    setNewTag('')
    setTagOpen(false)
  }

  function removeTag(value: string) {
    if (!note) return
    update(note.id, { tags: note.tags.filter((tag) => tag !== value) })
  }

  function pasteImage(event: React.ClipboardEvent<HTMLTextAreaElement>) {
    const item = [...event.clipboardData.items].find((entry) => entry.type.startsWith('image/'))
    const file = item?.getAsFile()
    if (!file || !note) return
    event.preventDefault()
    const noteId = note.id
    setImageError(null)
    imageFileToBoundedDataUrl(file)
      .then((imageData) => update(noteId, { imageData }))
      .catch((error: unknown) => setImageError(error instanceof Error ? error.message : t('That image could not be attached.')))
  }

  const listPane = (
    <>
      <div className="flex items-center gap-2 p-3">
        <SearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('Search notes…')}
        />
        <IconButton icon={Plus} label={t('New note')} variant="surface" onClick={newNote} />
      </div>
      <ul className="flex-1 overflow-y-auto px-2 pb-3">
        {filtered.length === 0 && (
          // An empty <ul> rendered as a blank column with no explanation once a
          // student deleted their last note.
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
              <p
                className={cn(
                  'truncate text-[13.5px] font-medium',
                  selectedId === n.id ? 'text-primary-strong' : 'text-ink',
                )}
              >
                {n.title || 'Untitled note'}
              </p>
              <p className="mt-0.5 truncate text-[12px] text-ink-3">
                {n.body.split('\n')[0] || 'No content yet'}
              </p>
              <p className="mt-1 text-[11px] text-ink-3">{formatRelativeTime(n.updatedAt)}</p>
            </button>
          </li>
        ))}
      </ul>
    </>
  )

  return (
    <div className="flex h-[calc(100dvh-3.5rem-env(safe-area-inset-top))]">
      <aside className="hidden w-72 shrink-0 flex-col border-r border-line bg-surface lg:flex">
        <div className="flex h-12 items-center gap-2 border-b border-line px-4">
          <Icon icon={NotebookIcon} size={16} className="text-primary" />
          <span className="font-serif text-[16px] font-semibold text-ink">Notebook</span>
          <span className="tnum ml-auto font-mono text-[12px] text-ink-3">{notes.length}</span>
        </div>
        {listPane}
      </aside>

      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center gap-2 border-b border-line px-4 py-2 lg:hidden">
          <Button variant="secondary" size="sm" iconLeft={NotebookIcon} onClick={() => setListOpen(true)}>
            All notes
          </Button>
          <Button variant="secondary" size="sm" iconLeft={Plus} onClick={newNote}>
            New
          </Button>
        </div>

        {note ? (
          <div className="mx-auto max-w-[46rem] px-5 py-8 sm:px-8">
            <div className="mb-4 flex items-center justify-between gap-3">
              {note.subtopicId ? (
                <Link
                  to={`/app/library?s=${note.subtopicId}`}
                  className="inline-flex items-center gap-1.5 rounded-md border border-primary-line bg-primary-tint/60 px-2.5 py-1.5 text-[12.5px] font-medium text-primary-strong transition-colors hover:bg-primary-tint"
                >
                  <Icon icon={BookOpen} size={14} />
                  {note.subtopicTitle}
                </Link>
              ) : (
                <span className="text-[12px] text-ink-3">Not linked to the library</span>
              )}
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-ink-3">{t('Edited')} {formatRelativeTime(note.updatedAt)}</span>
                <button
                  type="button"
                  onClick={toggleReading}
                  aria-pressed={reading}
                  className={cn(
                    'inline-flex min-h-9 items-center gap-1.5 rounded-lg border px-2.5 text-[12px] font-medium transition-colors sm:min-h-8',
                    reading ? 'border-primary-line bg-primary-tint text-primary-strong' : 'border-line-2 bg-surface text-ink-2 hover:bg-inset',
                  )}
                >
                  <Icon icon={reading ? PenLine : Eye} size={14} />
                  {reading ? t('Edit') : t('Read')}
                </button>
                <IconButton icon={Trash2} label={t('Delete note')} size="sm" onClick={() => remove(note.id)} />
              </div>
            </div>

            <input
              value={note.title}
              onChange={(e) => update(note.id, { title: e.target.value })}
              placeholder={t('Note title')}
              className="w-full bg-transparent font-serif text-[27px] font-semibold tracking-[-0.02em] text-ink outline-none placeholder:text-ink-3"
            />

            <div className="relative mt-4 flex flex-wrap items-center gap-1.5 border-y border-line py-3">
              <span className="mr-1 text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">Tags</span>
              {note.tags.map((tag) => <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-line-2 bg-surface-2 py-1 pl-2.5 pr-1.5 text-[11.5px] font-medium text-ink-2">{tag}<button type="button" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`} className="rounded-full p-0.5 text-ink-3 hover:bg-inset hover:text-ink"><Icon icon={X} size={11} /></button></span>)}
              <button type="button" onClick={() => setTagOpen((open) => !open)} className="grid size-11 place-items-center rounded-full border border-dashed border-line-2 text-ink-3 transition-colors hover:border-primary hover:bg-primary-tint hover:text-primary sm:size-7" aria-label="Add a tag"><Icon icon={Plus} size={14} strokeWidth={2.4} /></button>
              {tagOpen && <div className="absolute left-10 top-[calc(100%+0.4rem)] z-20 w-72 rounded-xl border border-line bg-surface p-3 shadow-pop">
                <p className="text-[11.5px] font-bold text-ink">Tag a subject or create your own</p>
                <div className="mt-2 flex flex-wrap gap-1.5">{subjects.filter((subject) => !note.tags.includes(subject.name)).map((subject) => <button type="button" key={subject.id} onClick={() => addTag(subject.name)} className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-ink-2 hover:border-primary-line hover:text-ink">{subject.name}</button>)}</div>
                <div className="mt-3 flex gap-1.5"><input value={newTag} onChange={(event) => setNewTag(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') addTag(newTag) }} placeholder="New tag…" className="h-11 min-w-0 flex-1 rounded-lg border border-line-2 bg-surface px-2.5 text-[12px] text-ink outline-none focus:border-primary sm:h-8" /><Button size="sm" variant="primary" onClick={() => addTag(newTag)} disabled={!newTag.trim()}>Add</Button></div>
              </div>}
              <label className="ml-auto flex min-w-56 items-center gap-2 text-[11.5px] text-ink-3"><span className="shrink-0">Related article</span><Select className="h-11 sm:h-8" value={note.subtopicId ?? ''} onChange={(event) => { const article = allSubtopics.find((item) => item.id === event.target.value); update(note.id, { subtopicId: article?.id, subtopicTitle: article ? `${article.topicTitle} · ${article.title}` : undefined, subjectId: article?.subjectId ?? note.subjectId }) }}><option value="">None</option>{allSubtopics.map((article) => <option key={article.id} value={article.id}>{article.title}</option>)}</Select></label>
            </div>

            {/* The documents this note is about — the library's and the
                student's own alike. See `DocumentRefs`. */}
            <div className="mt-3">
              <DocumentRefs
                refs={note.resourceRefs ?? []}
                onChange={(next) => update(note.id, { resourceRefs: next })}
                location={location}
              />
            </div>

            {note.imageData && <div className="relative mt-4 overflow-hidden rounded-lg border border-line bg-surface"><ZoomableImage src={note.imageData} alt="Pasted into this note" className="max-h-96 w-full object-contain" /><IconButton icon={X} label="Remove image" size="sm" className="absolute right-2 top-2 bg-surface shadow-panel" onClick={() => update(note.id, { imageData: undefined })} /></div>}

            <div className="mt-5">
              <NoteEditor
                value={note.body}
                onChange={(next) => update(note.id, { body: next })}
                onPaste={pasteImage}
                preview={reading}
                placeholder={t('Start writing, or paste a copied image…')}
              />
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-[11.5px] text-ink-3"><Icon icon={ImagePlus} size={13} />{t('Paste an image from your clipboard directly into this note.')}</p>
            {imageError && <p role="status" className="mt-1.5 text-[11.5px] text-danger">{imageError}</p>}
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
