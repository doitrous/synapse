import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Check, Eye, LinkIcon, PencilLine, Save } from 'lucide-react'
import { Wordmark } from '@/components/brand/Wordmark'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { NoteEditor } from '@/components/notebook/NoteEditor'
import { SharedBoardView } from '@/components/share/SharedBoardView'
import { updateShare, useSharedDocument } from '@/lib/useShares'
import { useIdentity } from '@/lib/useIdentity'
import { useRelativeTime } from '@/lib/useRelativeTime'
import { useNoIndex } from '@/lib/pageMeta'
import type { BoardState } from '@/data/whiteboard'
import { useT } from '@/lib/i18n'
import { editorJsonToPlainText, plainTextToEditorJson, type NotebookEditorJson } from '@/data/notebook'
import { apiFetchBlob } from '@/lib/api'

/**
 * A note or a board somebody shared, at its own link.
 *
 * Outside `/app` on purpose so a copied link has a focused reader. The API
 * still requires a signed-in classmate in the owner's university and year.
 *
 * What the reader may do is the server's answer, carried on `canEdit`, and it
 * is never worked out here. Editing is only ever offered to somebody signed in,
 * because an edit is recorded against whoever made it.
 */

interface SharedNote {
  title: string
  body?: string
  editorJson?: NotebookEditorJson
  plainText?: string
  legacyMarkdownSource?: string
  tags?: string[]
  revision?: number
  imageDocumentId?: string
  imageData?: string
}

interface NoteDraft {
  editorJson: NotebookEditorJson
  plainText: string
}

export function SharedDocument() {
  // A copied link, not a page anyone should find by searching.
  useNoIndex()
  const t = useT()
  const relativeTime = useRelativeTime()
  const { id } = useParams()
  const { status } = useIdentity()
  const { share, loading, error, setShare } = useSharedDocument<SharedNote | BoardState>(id)

  const [draft, setDraft] = useState<NoteDraft>({ editorJson: plainTextToEditorJson(''), plainText: '' })
  const [boardDraft, setBoardDraft] = useState<BoardState | null>(null)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [failure, setFailure] = useState('')

  useEffect(() => {
    if (share?.kind === 'note') {
      const payload = share.payload as SharedNote
      const plainText = payload.plainText ?? payload.body ?? ''
      setDraft({ plainText, editorJson: payload.editorJson ?? plainTextToEditorJson(plainText) })
    } else if (share?.kind === 'whiteboard') {
      setBoardDraft(structuredClone(share.payload as BoardState))
    }
  }, [share])

  async function save() {
    if (!share) return
    setFailure('')
    setSaving(true)
    try {
      const payload = share.kind === 'note' ? {
        ...(share.payload as SharedNote), body: draft.plainText, plainText: draft.plainText,
        editorJson: draft.editorJson, revision: ((share.payload as SharedNote).revision ?? 1) + 1,
      } : boardDraft ?? share.payload
      const updated = await updateShare(share.id, { payload, expectedRevision: share.revision })
      setShare({ ...updated, payload })
      setSaved(true)
      setEditing(false)
    } catch {
      setFailure(t('That could not be saved. Check your connection and try again.'))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-dvh bg-paper">
      <header className="border-b border-line bg-surface/70">
        <div className="mx-auto flex min-h-16 max-w-5xl items-center gap-3 px-4 sm:px-6">
          <Link to="/" aria-label={t('Maristana home')}><Wordmark /></Link>
          <span className="ms-auto text-[12.5px] text-ink-3">{t('Shared with you')}</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        {loading && <p className="text-[13.5px] text-ink-2">{t('Opening…')}</p>}

        {!loading && error === 'offline' && (
          <p className="rounded-xl border border-line bg-surface p-6 text-[13.5px] leading-relaxed text-ink-2">
            {t('Sharing needs the connected deployment. This preview keeps everything in the browser it was written in.')}
          </p>
        )}

        {!loading && error === 'missing' && (
          <div className="rounded-xl border border-line bg-surface p-8 text-center">
            <h1 className="font-serif text-[24px] font-semibold text-ink">{status === 'anonymous' ? t('Sign in to open this shared item') : t('This link is not available')}</h1>
            <p className="mx-auto mt-2 max-w-[48ch] text-[13.5px] leading-relaxed text-ink-2">
              {status === 'anonymous'
                ? t('Shared notebooks and whiteboards are limited to classmates in the same university and year.')
                : t('It may be private, withdrawn, or shared from another cohort. Ask the owner to check the link and permission.')}
            </p>
            <Link to={status === 'anonymous' ? `/login?next=${encodeURIComponent(`/s/${id ?? ''}`)}` : '/'} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 text-[13.5px] font-semibold text-on-primary hover:bg-primary-hover">
              {status === 'anonymous' ? t('Sign in') : t('Go to Maristana')}
            </Link>
          </div>
        )}

        {!loading && share && (
          <>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
              <div className="min-w-0">
                <h1 className="font-serif text-[27px] font-semibold tracking-[-0.02em] text-ink">{share.title}</h1>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-ink-3">
                  <span className="inline-flex items-center gap-1.5">
                    <Icon icon={share.access === 'edit' ? PencilLine : Eye} size={13} />
                    {share.access === 'edit' ? t('Classmates in your university and year can edit') : t('Read only for your university and year')}
                  </span>
                  <span>{t('Updated')} {relativeTime(share.updatedAt)}</span>
                </p>
              </div>

              {share.canEdit && (
                editing ? (
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" onClick={() => {
                      const payload = share.payload as SharedNote
                      setEditing(false)
                      if (share.kind === 'note') {
                        const plainText = payload.plainText ?? payload.body ?? ''
                        setDraft({ plainText, editorJson: payload.editorJson ?? plainTextToEditorJson(plainText) })
                      } else setBoardDraft(structuredClone(share.payload as BoardState))
                    }}>{t('Cancel')}</Button>
                    <Button variant="primary" iconLeft={Save} loading={saving} onClick={() => void save()}>{t('Save changes')}</Button>
                  </div>
                ) : (
                  <Button iconLeft={PencilLine} onClick={() => { setEditing(true); setSaved(false) }}>{t('Edit')}</Button>
                )
              )}
            </div>

            {/* Somebody signed out cannot be offered editing, whatever the link
                allows: a change has to be attributable to an account. */}
            {share.kind === 'note' && share.access === 'edit' && !share.canEdit && status !== 'loading' && (
              <p className="mb-4 rounded-lg border border-line bg-surface-2 px-3.5 py-3 text-[12.5px] leading-relaxed text-ink-2">
                {t('This note is open for editing.')}{' '}
                <Link to={`/login?next=${encodeURIComponent(`/s/${share.id}`)}`} className="font-semibold text-primary-strong hover:text-primary">{t('Sign in to make changes.')}</Link>
              </p>
            )}

            {saved && <p role="status" className="mb-4 inline-flex items-center gap-1.5 rounded-lg border border-success/30 bg-success-tint px-3 py-2 text-[12.5px] text-success"><Icon icon={Check} size={14} />{t('Saved')}</p>}
            {failure && <p role="alert" className="mb-4 text-[12.5px] text-danger">{failure}</p>}

            <article className="rounded-xl border border-line bg-surface p-5 sm:p-7">
              {share.kind === 'note' ? (
                editing
                  ? <NoteEditor editorJson={draft.editorJson} onChange={setDraft} />
                  : <SharedNotePreview note={share.payload as SharedNote} shareId={share.id} />
              ) : (
                <SharedBoardView board={editing && boardDraft ? boardDraft : share.payload as BoardState} shareId={share.id} editable={editing && share.canEdit} onChange={setBoardDraft} />
              )}
            </article>

            {share.kind === 'whiteboard' && (
              <p className="mt-3 text-[12px] leading-relaxed text-ink-3">
                {t('A shared board is a copy taken when it was published. Files pinned to it stay in the owner’s own account, so they are named here rather than opened.')}
              </p>
            )}

            <p className="mt-6 flex items-center gap-1.5 text-[12px] text-ink-3">
              <Icon icon={LinkIcon} size={13} />
              {t('Shared from Maristana.')}{' '}
              <Link to="/" className="font-semibold text-primary-strong hover:text-primary">{t('What is this?')}</Link>
            </p>
          </>
        )}
      </main>
    </div>
  )
}

function SharedNotePreview({ note, shareId }: { note: SharedNote; shareId: string }) {
  const source = note.plainText ?? editorJsonToPlainText(note.editorJson) ?? note.body ?? ''
  const lines = source.split('\n')
  return (
    <div className="space-y-3 whitespace-pre-wrap text-[14.5px] leading-relaxed text-ink-2">
      {(note.imageDocumentId || note.imageData) && <SharedNoteImage shareId={shareId} documentId={note.imageDocumentId} legacySource={note.imageData} />}
      {lines.length ? lines.map((line, index) => <p key={index}>{line || '\u00a0'}</p>) : <p>{'\u00a0'}</p>}
    </div>
  )
}

function SharedNoteImage({ shareId, documentId, legacySource }: { shareId: string; documentId?: string; legacySource?: string }) {
  const t = useT()
  const [source, setSource] = useState(legacySource ?? '')
  useEffect(() => {
    if (legacySource || !documentId) return
    let active = true
    let url = ''
    void apiFetchBlob(`/shares/${encodeURIComponent(shareId)}/assets/${encodeURIComponent(documentId)}`)
      .then((blob) => { url = URL.createObjectURL(blob); if (active) setSource(url); else URL.revokeObjectURL(url) })
      .catch(() => undefined)
    return () => { active = false; if (url) URL.revokeObjectURL(url) }
  }, [documentId, legacySource, shareId])
  return source ? <img src={source} alt={t('Shared notebook attachment')} className="max-h-96 w-full rounded-lg object-contain" /> : null
}
