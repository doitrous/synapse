import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Plus, Save, Layers, AlertTriangle, Image as ImageIcon, FileText, Brackets, Eye, Music } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { EmptyState } from '@/components/ui/EmptyState'
import { Checkbox } from '@/components/ui/Checkbox'
import { Dialog } from '@/components/ui/Dialog'
import { Tooltip } from '@/components/ui/Tooltip'
import { Kbd } from '@/components/ui/Kbd'
import { Field, TextInput, Select } from '@/components/ui/Field'
import { MediaAttachmentView } from '@/components/ui/MediaAttachmentView'
import { storeMediaFile, mediaReference, removeStoredMedia } from '@/lib/mediaStorage'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/cn'
import { useCommands } from '@/lib/shortcuts/useShortcuts'
import type { Command } from '@/lib/shortcuts/registry'
import type { FlashcardsApi } from '@/lib/useFlashcards'
import type { Note, NoteType } from '@/data/flashcards/model'
import { sanitizeRich, isRichEmpty } from '@/data/flashcards/richText'
import { newId } from '@/data/userLibrary'
import { validateCloze, clozeNumbers, renderClozeSide, type ClozeError } from '@/data/flashcards/cloze'
import { isDuplicateNote } from '@/data/flashcards/duplicate'
import { RichField, type RichFieldHandle } from './RichField'
import { TagSelect } from './TagSelect'
import { RichHtml } from './RichHtml'
import { OcclusionEditor } from './OcclusionEditor'

const NEW_DECK = '__new_deck__'

type AuthorType = 'basic' | 'cloze'

const CLOZE_ERROR_MESSAGE: Record<ClozeError, string> = {
  'no-cloze': 'Add at least one cloze deletion — select text and press the cloze button (⌘⇧C).',
  'empty-deletion': 'A cloze deletion is empty. Every {{c…}} must hide some text.',
  'zero-number': 'Cloze numbers start at 1 — c0 is not allowed.',
  unbalanced: 'Unbalanced {{ }} — a cloze deletion is not closed.',
}

/**
 * Author a new Basic or Cloze note.
 *
 * One draft, held here, that survives switching note type, creating a deck
 * inline, and "save and add another". Nothing is written until it validates:
 * a Basic note needs a front, a Cloze note needs at least one well-formed
 * deletion, and a note that would duplicate one already in the deck asks for an
 * explicit acknowledgement before it saves. The live preview renders exactly
 * what study will show — every cloze sibling included — so there is no surprise
 * between authoring and review.
 */
export function AddView({ api, initialDeckId, editNoteId, onDone }: { api: FlashcardsApi; initialDeckId?: string; editNoteId?: string; onDone: () => void }) {
  const t = useT()

  const ownDecks = useMemo(
    () => api.decks.filter((deck) => !deck.provided).sort((a, b) => a.name.localeCompare(b.name)),
    [api.decks],
  )
  const ownDeckIds = useMemo(() => new Set(ownDecks.map((deck) => deck.id)), [ownDecks])

  // A note being edited — only own Basic/Cloze notes are editable here (provided
  // decks are read-only; image occlusion has its own editor). The parent remounts
  // this view per edit target (keyed by note id), so seeding state once is safe.
  const editing = editNoteId ? api.collection.notes[editNoteId] : undefined
  const editingBasicOrCloze = editing && (editing.type === 'basic' || editing.type === 'cloze') ? editing : undefined

  const [type, setType] = useState<AuthorType>(editingBasicOrCloze?.type ?? 'basic')
  const [occlusion, setOcclusion] = useState(false)

  function handleTypeChange(value: NoteType) {
    if (value === 'image-occlusion') setOcclusion(true)
    else { setOcclusion(false); setType(value) }
  }
  const [deckId, setDeckId] = useState<string>(() => {
    if (editingBasicOrCloze) return editingBasicOrCloze.deckId
    if (initialDeckId && ownDeckIds.has(initialDeckId)) return initialDeckId
    return ownDecks[0]?.id ?? ''
  })
  const [tags, setTags] = useState<string[]>(editingBasicOrCloze?.tags ?? [])

  const [front, setFront] = useState(editingBasicOrCloze?.type === 'basic' ? editingBasicOrCloze.fields.front : '')
  const [back, setBack] = useState(editingBasicOrCloze?.type === 'basic' ? editingBasicOrCloze.fields.back : '')
  const [clozeText, setClozeText] = useState(editingBasicOrCloze?.type === 'cloze' ? editingBasicOrCloze.fields.text : '')
  const [extra, setExtra] = useState(editingBasicOrCloze?.type === 'cloze' ? editingBasicOrCloze.fields.extra : '')
  // Optional card audio (a `nishany-media:` reference); shared by Basic and Cloze.
  const [audio, setAudio] = useState<string | undefined>(editingBasicOrCloze?.fields.audio)
  // The audio the note already owned when editing began — never deleted on a mere
  // Remove, so Remove-then-Cancel can't orphan the still-referenced blob.
  const initialAudio = editingBasicOrCloze?.fields.audio
  // Blobs attached this session. A blob is orphaned only if it is never committed
  // by a save; deletion is deferred to save (reconcile) and unmount (discard), so
  // clearing the field is always reversible until the note is actually saved.
  const sessionBlobs = useRef<Set<string>>(new Set())
  useEffect(() => () => { sessionBlobs.current.forEach((ref) => { void removeStoredMedia(ref) }) }, [])

  const [duplicateAck, setDuplicateAck] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const [creatingDeck, setCreatingDeck] = useState(false)
  const [confirmCancel, setConfirmCancel] = useState(false)

  const firstFieldRef = useRef<RichFieldHandle>(null)
  const tagInputRef = useRef<HTMLInputElement>(null)

  // If the selected deck disappears (deleted elsewhere) or was never set, fall
  // back to the first own deck so the form always points at a valid target.
  useEffect(() => {
    if (deckId && ownDeckIds.has(deckId)) return
    setDeckId(ownDecks[0]?.id ?? '')
  }, [deckId, ownDeckIds, ownDecks])

  // ---- validation ----------------------------------------------------------

  const clozeValidation = useMemo(() => validateCloze(clozeText), [clozeText])
  const errors = useMemo<string[]>(() => {
    if (type === 'basic') {
      return isRichEmpty(front) ? ['A front is required.'] : []
    }
    return clozeValidation.ok ? [] : clozeValidation.errors.map((error) => CLOZE_ERROR_MESSAGE[error])
  }, [type, front, clozeValidation])

  const contentValid = errors.length === 0

  const dirty = useMemo(() => {
    if (audio) return true
    if (type === 'basic') return !isRichEmpty(front) || !isRichEmpty(back)
    return !isRichEmpty(clozeText) || !isRichEmpty(extra)
  }, [type, front, back, clozeText, extra, audio])

  // ---- note assembly -------------------------------------------------------

  function buildNote(id: string): Note | null {
    if (!deckId || !contentValid) return null
    const now = new Date().toISOString()
    const createdAt = editingBasicOrCloze && id === editNoteId ? editingBasicOrCloze.createdAt : now
    const base = { id, deckId, tags, createdAt, updatedAt: now }
    if (type === 'basic') {
      return { ...base, type: 'basic', fields: { front: sanitizeRich(front), back: sanitizeRich(back), ...(audio ? { audio } : {}) } }
    }
    // Cloze source text is rich too — sanitized HTML carrying the `{{cN::…}}`
    // markers as plain text, which is exactly what `tokenizeCloze` parses.
    return { ...base, type: 'cloze', fields: { text: sanitizeRich(clozeText), extra: sanitizeRich(extra), ...(audio ? { audio } : {}) } }
  }

  // buildNote reads current state directly; these inputs are the real triggers.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const candidate = useMemo(() => (contentValid && deckId ? buildNote(editNoteId ?? '__candidate__') : null), [contentValid, deckId, type, front, back, clozeText, extra, tags, editNoteId, audio])
  const isDuplicate = useMemo(() => (candidate ? isDuplicateNote(candidate, api.allNotes) : false), [candidate, api.allNotes])

  // A fresh edit is a fresh decision: any content or target change clears a
  // previous "save anyway" acknowledgement.
  useEffect(() => {
    setDuplicateAck(false)
  }, [front, back, clozeText, extra, deckId, type])

  const blockedByDuplicate = isDuplicate && !duplicateAck
  const canSave = !!deckId && contentValid && !blockedByDuplicate

  // ---- actions -------------------------------------------------------------

  function clearFields() {
    setFront('')
    setBack('')
    setClozeText('')
    setExtra('')
    setAudio(undefined)
    setShowErrors(false)
    setDuplicateAck(false)
  }

  async function onAudioFile(file: File | undefined) {
    if (!file) return
    const id = newId('card-audio')
    try {
      await storeMediaFile(id, file)
      const ref = mediaReference(id)
      sessionBlobs.current.add(ref)
      setAudio(ref)
    } catch {
      // Storage can be blocked (private mode); leave audio unattached rather than
      // saving a reference that would never resolve at study time.
      setAudio(undefined)
    }
  }

  function save(addAnother: boolean) {
    if (!contentValid || !deckId) {
      setShowErrors(true)
      return
    }
    if (blockedByDuplicate) return
    const note = buildNote(editNoteId ?? newId('note'))
    if (!note) return
    api.saveNote(note)
    // The saved note now owns `audio`. Delete any blob attached this session that
    // wasn't the one saved, and (when editing) the note's previous audio if it
    // changed — safe now because the change is committed. Stop tracking the saved
    // blob so unmount never deletes it.
    const savedAudio = audio
    sessionBlobs.current.forEach((ref) => { if (ref !== savedAudio) void removeStoredMedia(ref) })
    sessionBlobs.current = new Set()
    if (initialAudio && initialAudio !== savedAudio) void removeStoredMedia(initialAudio)
    // Editing is a single save that returns to where it was opened from;
    // "add another" only makes sense while creating.
    if (addAnother && !editingBasicOrCloze) {
      clearFields()
      requestAnimationFrame(() => firstFieldRef.current?.focus())
    } else {
      onDone()
    }
  }

  function requestCancel() {
    if (dirty) setConfirmCancel(true)
    else onDone()
  }

  function onDeckSelect(value: string) {
    if (value === NEW_DECK) setCreatingDeck(true)
    else setDeckId(value)
  }

  // ---- shortcuts (fire while typing; do not collide with editor keys) ------

  const commands = useMemo<Command[]>(
    () => [
      { id: 'add.save', title: 'Save note', group: 'Authoring', scopes: ['global'], keys: 'Mod+Enter', allowInEditable: true, run: () => save(false) },
      { id: 'add.saveAnother', title: 'Save and add another', group: 'Authoring', scopes: ['global'], keys: 'Mod+Shift+Enter', allowInEditable: true, run: () => save(true) },
      { id: 'add.focusDeck', title: 'Focus deck selector', group: 'Authoring', scopes: ['global'], keys: 'Mod+D', allowInEditable: true, run: () => document.getElementById('add-deck')?.focus() },
      { id: 'add.focusTags', title: 'Focus tags', group: 'Authoring', scopes: ['global'], keys: 'Mod+Shift+T', allowInEditable: true, run: () => tagInputRef.current?.focus() },
    ],
    // Handlers close over current state through the component; rebuilt each render is fine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [canSave, contentValid, deckId, blockedByDuplicate, type, front, back, clozeText, extra, tags],
  )
  useCommands(commands)

  const noDecks = ownDecks.length === 0

  // Asked to edit something that isn't an own Basic/Cloze note (a provided-deck
  // card, or an image-occlusion note): say so plainly rather than opening a blank
  // form that would silently create a new note.
  if (editNoteId && !editingBasicOrCloze) {
    return (
      <Panel className="p-10 text-center">
        <EmptyState
          icon={AlertTriangle}
          title={t('This card can’t be edited here')}
          description={t('Provided-deck cards are read-only, and image-occlusion cards open in the occlusion editor.')}
          action={<Button variant="secondary" size="sm" onClick={onDone}>{t('Back')}</Button>}
        />
      </Panel>
    )
  }

  // Image occlusion has its own editor; show the type + deck pickers above it.
  if (occlusion) {
    return (
      <div className="space-y-4">
        <Panel>
          <PanelHeader title={t('Add a card')} />
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <Field label={t('Note type')}>
              <TypeSelector value="image-occlusion" onChange={handleTypeChange} />
            </Field>
            <Field label={t('Deck')} htmlFor="occ-deck">
              <Select id="occ-deck" value={deckId} onChange={(e) => onDeckSelect(e.target.value)}>
                {noDecks && <option value="">{t('No decks yet')}</option>}
                {ownDecks.map((deck) => <option key={deck.id} value={deck.id}>{deck.name}</option>)}
                <option value={NEW_DECK}>{t('＋ New deck')}</option>
              </Select>
            </Field>
          </div>
        </Panel>
        {deckId ? (
          <OcclusionEditor api={api} deckId={deckId} onDone={onDone} />
        ) : (
          <Panel className="p-8 text-center">
            <p className="text-[13px] text-ink-2">{t('Create a deck to author into — provided decks are read-only.')}</p>
          </Panel>
        )}
        {creatingDeck && (
          <CreateDeckDialog onClose={() => setCreatingDeck(false)} onCreate={(name) => { const id = api.createDeck(name); setDeckId(id); setCreatingDeck(false) }} />
        )}
      </div>
    )
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="space-y-5">
        <Panel>
          <PanelHeader
            title={editingBasicOrCloze ? t('Edit card') : t('Add a card')}
            action={
              <div className="flex items-center gap-2 text-[12px] text-ink-3">
                <span className="hidden sm:inline">{t('Save')}</span>
                <Kbd>⌘↵</Kbd>
              </div>
            }
          />

          <div className="space-y-5 p-5">
            {/* Note type */}
            <Field label={t('Note type')}>
              <TypeSelector value={type} onChange={handleTypeChange} locked={!!editingBasicOrCloze} />
            </Field>

            {/* Deck + tags */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t('Deck')} htmlFor="add-deck">
                <Select
                  id="add-deck"
                  value={deckId}
                  onChange={(event) => onDeckSelect(event.target.value)}
                >
                  {noDecks && <option value="">{t('No decks yet')}</option>}
                  {ownDecks.map((deck) => (
                    <option key={deck.id} value={deck.id}>
                      {deck.name}
                    </option>
                  ))}
                  <option value={NEW_DECK}>{t('＋ New deck')}</option>
                </Select>
                {noDecks && (
                  <p className="mt-1 text-[12px] text-danger">{t('Create a deck to author into — provided decks are read-only.')}</p>
                )}
              </Field>

              <Field label={t('Tags')} htmlFor="add-tags">
                <TagSelect id="add-tags" inputRef={tagInputRef} value={tags} options={api.allTags} onChange={setTags} />
              </Field>
            </div>

            {/* Fields */}
            {type === 'basic' ? (
              <div className="space-y-4">
                <Field label={t('Front')}>
                  <RichField
                    ref={firstFieldRef}
                    ariaLabel={t('Front')}
                    value={front}
                    onChange={setFront}
                    commandPrefix="editor.front"
                    placeholder={t('The prompt — e.g. “Which artery supplies the SA node?”')}
                  />
                </Field>
                <Field label={t('Back')}>
                  <RichField
                    ariaLabel={t('Back')}
                    value={back}
                    onChange={setBack}
                    commandPrefix="editor.back"
                    placeholder={t('The answer')}
                  />
                </Field>
              </div>
            ) : (
              <div className="space-y-4">
                <Field label={t('Text')} hint={t('Select a word and press the cloze button (⌘⇧C) to hide it.')}>
                  <RichField
                    ref={firstFieldRef}
                    mode="cloze"
                    ariaLabel={t('Cloze text')}
                    value={clozeText}
                    onChange={setClozeText}
                    commandPrefix="editor.cloze"
                    placeholder={t('e.g. The {{c1::mitral}} valve lies between the left atrium and ventricle.')}
                  />
                </Field>
                <Field label={t('Extra')} hint={t('Optional — shown under the answer during review.')}>
                  <RichField
                    ariaLabel={t('Extra')}
                    value={extra}
                    onChange={setExtra}
                    commandPrefix="editor.extra"
                    minHeight="4rem"
                    placeholder={t('Mnemonic, source, or a note')}
                  />
                </Field>
              </div>
            )}

            {/* Audio (optional, both note types) */}
            <Field label={t('Audio')} hint={t('Optional — plays during study (R to replay, P to pause/resume).')}>
              {audio ? (
                <MediaAttachmentView
                  attachment={{ id: 'card-audio', type: 'audio', name: t('Card audio'), url: audio }}
                  onRemove={() => setAudio(undefined)}
                />
              ) : (
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-line bg-surface px-3 py-2 text-[13px] font-medium text-ink-2 transition-colors hover:bg-surface-2">
                  <Icon icon={Music} size={15} /> {t('Attach audio')}
                  <input
                    type="file"
                    accept="audio/*"
                    className="sr-only"
                    onChange={(event) => { const file = event.target.files?.[0]; event.target.value = ''; void onAudioFile(file) }}
                  />
                </label>
              )}
            </Field>

            {/* Validation */}
            {showErrors && errors.length > 0 && (
              <div className="rounded-md border border-danger/40 bg-danger-tint px-3 py-2.5" role="alert">
                <ul className="space-y-1 text-[12.5px] text-danger">
                  {errors.map((error) => (
                    <li key={error} className="flex items-start gap-1.5">
                      <Icon icon={AlertTriangle} size={13} className="mt-0.5 shrink-0" />
                      {t(error)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Duplicate warning */}
            {isDuplicate && (
              <div className="rounded-md border border-warning/45 bg-warning-tint px-3 py-2.5">
                <div className="flex items-start gap-2">
                  <Icon icon={AlertTriangle} size={14} className="mt-0.5 shrink-0 text-warning" />
                  <div className="space-y-2">
                    <p className="text-[12.5px] text-ink-2">
                      {t('A card with this content already exists in this deck.')}
                    </p>
                    <div
                      className="flex w-fit cursor-pointer items-center gap-2 text-[12.5px] font-medium text-ink-2"
                      onClick={() => setDuplicateAck((v) => !v)}
                    >
                      <Checkbox
                        checked={duplicateAck}
                        onChange={setDuplicateAck}
                        label={t('Save this duplicate anyway')}
                      />
                      {t('Save it anyway')}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2 border-t border-line pt-4">
              <Button variant="primary" iconLeft={Save} onClick={() => save(false)} disabled={!canSave}>
                {editingBasicOrCloze ? t('Save changes') : t('Save')}
              </Button>
              {!editingBasicOrCloze && (
                <Tooltip content={<span className="inline-flex items-center gap-1.5">{t('Save and add another')} <Kbd className="border-paper/25 bg-transparent text-paper">⌘⇧↵</Kbd></span>}>
                  <Button variant="secondary" iconLeft={Plus} onClick={() => save(true)} disabled={!canSave}>
                    {t('Save & add another')}
                  </Button>
                </Tooltip>
              )}
              <div className="ms-auto">
                <Button variant="ghost" onClick={requestCancel}>{t('Cancel')}</Button>
              </div>
            </div>
          </div>
        </Panel>
      </div>

      {/* Preview */}
      <div className="space-y-5">
        <Panel className="lg:sticky lg:top-4">
          <PanelHeader title={t('Preview')} icon={Eye} />
          <div className="p-5">
            <Preview type={type} front={front} back={back} clozeText={clozeText} extra={extra} />
          </div>
        </Panel>
      </div>

      {creatingDeck && (
        <CreateDeckDialog
          onClose={() => setCreatingDeck(false)}
          onCreate={(name) => {
            const id = api.createDeck(name)
            setDeckId(id)
            setCreatingDeck(false)
          }}
        />
      )}

      {confirmCancel && (
        <Dialog onClose={() => setConfirmCancel(false)} label={t('Discard this card?')} size="sm">
          <PanelHeader title={t('Discard this card?')} icon={AlertTriangle} />
          <div className="space-y-4 p-5">
            <p className="text-[13.5px] leading-relaxed text-ink-2">
              {t('This card has unsaved changes. Leaving now discards them.')}
            </p>
            <div className="flex justify-end gap-2 border-t border-line pt-4">
              <Button variant="ghost" onClick={() => setConfirmCancel(false)}>{t('Keep editing')}</Button>
              <Button variant="danger" onClick={() => { setConfirmCancel(false); onDone() }}>{t('Discard')}</Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  )
}

// ---- note-type selector ----------------------------------------------------

function TypeSelector({ value, onChange, locked = false }: { value: NoteType; onChange: (value: NoteType) => void; locked?: boolean }) {
  const t = useT()
  const options: { value: NoteType; label: string; icon: typeof FileText }[] = [
    { value: 'basic', label: t('Basic'), icon: FileText },
    { value: 'cloze', label: t('Cloze'), icon: Brackets },
    { value: 'image-occlusion', label: t('Image Occlusion'), icon: ImageIcon },
  ]
  // While editing, the type is fixed: changing it would regenerate the note's
  // cards and drop their schedules. Only the current type is shown.
  const shown = locked ? options.filter((o) => o.value === value) : options
  return (
    <div role="group" aria-label={t('Note type')} className="inline-flex flex-wrap items-center gap-0.5 rounded-lg border border-line bg-surface-2 p-0.5">
      {shown.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            disabled={locked}
            onClick={() => onChange(option.value)}
            className={cn(
              'inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary',
              active ? 'bg-surface text-ink shadow-panel' : 'text-ink-2 hover:text-ink',
            )}
          >
            <Icon icon={option.icon} size={15} className={active ? 'text-primary' : 'text-ink-3'} />
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

// ---- preview ---------------------------------------------------------------

function Preview({
  type,
  front,
  back,
  clozeText,
  extra,
}: {
  type: AuthorType
  front: string
  back: string
  clozeText: string
  extra: string
}) {
  const t = useT()

  if (type === 'basic') {
    if (isRichEmpty(front) && isRichEmpty(back)) return <PreviewEmpty />
    return (
      <div className="rounded-lg border border-line bg-paper p-4 text-center">
        <RichHtml html={front} className="font-serif text-[17px] font-medium text-ink" />
        {!isRichEmpty(back) && (
          <div className="mt-4 border-t border-line pt-4">
            <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Answer')}</p>
            <RichHtml html={back} className="text-[14px] text-ink" />
          </div>
        )}
      </div>
    )
  }

  const numbers = clozeNumbers(clozeText)
  if (numbers.length === 0) return <PreviewEmpty />
  return (
    <div className="space-y-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">
        {numbers.length === 1 ? t('1 card') : <>{numbers.length} {t('cards')}</>}
      </p>
      {numbers.map((number) => {
        const cells = renderClozeSide(clozeText, number, 'front')
        return (
          <div key={number} className="rounded-lg border border-line bg-paper p-4">
            <p className="mb-1 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">c{number}</p>
            {/* A `div`, not a `p`: the cells are HTML fragments that may carry
                a list or a paragraph of their own. */}
            <div className="font-serif text-[15px] leading-relaxed text-ink">
              {cells.map((cell, i) => (
                <Fragment key={i}>
                  {cell.kind === 'text' && <RichHtml html={cell.text} className="inline" />}
                  {cell.kind === 'blank' && (
                    <span className="mx-0.5 rounded bg-accent-tint px-2 py-0.5 font-mono text-[13px] text-accent-strong">
                      {cell.hint ? <>[<RichHtml html={cell.hint} className="inline" />]</> : '[…]'}
                    </span>
                  )}
                  {cell.kind === 'answer' && (
                    <span className="mx-0.5 rounded bg-primary-tint px-2 py-0.5 font-semibold text-primary-strong">
                      <RichHtml html={cell.text} className="inline" />
                    </span>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        )
      })}
      {!isRichEmpty(extra) && (
        <div className="rounded-lg border border-line bg-surface-2 p-3">
          <p className="mb-1 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t('Extra')}</p>
          <RichHtml html={extra} className="text-[13px] text-ink-2" />
        </div>
      )}
    </div>
  )
}

function PreviewEmpty() {
  const t = useT()
  return (
    <div className="grid place-items-center rounded-lg border border-dashed border-line-2 bg-surface-2 px-4 py-10 text-center">
      <Icon icon={Layers} size={22} className="mb-2 text-ink-3" />
      <p className="text-[12.5px] text-ink-3">{t('Your card will preview here as you type.')}</p>
    </div>
  )
}

// ---- inline deck creation --------------------------------------------------

function CreateDeckDialog({ onClose, onCreate }: { onClose: () => void; onCreate: (name: string) => void }) {
  const t = useT()
  const [name, setName] = useState('')
  return (
    <Dialog onClose={onClose} label={t('New deck')} size="sm">
      <PanelHeader title={t('New deck')} icon={Layers} />
      <div className="space-y-4 p-5">
        <Field label={t('Deck name')} htmlFor="add-new-deck-name">
          <TextInput
            id="add-new-deck-name"
            autoFocus
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && name.trim()) onCreate(name)
            }}
            placeholder={t('e.g. Cardiology')}
          />
        </Field>
        <div className="flex justify-end gap-2 border-t border-line pt-4">
          <Button variant="ghost" onClick={onClose}>{t('Cancel')}</Button>
          <Button variant="primary" onClick={() => onCreate(name)} disabled={!name.trim()}>{t('Create deck')}</Button>
        </div>
      </div>
    </Dialog>
  )
}
