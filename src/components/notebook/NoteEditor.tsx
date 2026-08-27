import { useEffect, useMemo, useRef } from 'react'
import { FileText, Focus as FocusIcon, Image as ImageIcon, Minus, Plus, Type as WordsIcon } from 'lucide-react'
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  type EditorState,
} from 'lexical'
import { ListItemNode, ListNode } from '@lexical/list'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode'
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin'
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { Icon } from '@/components/ui/Icon'
import { IconButton } from '@/components/ui/IconButton'
import { Popover, usePopoverTrigger } from '@/components/ui/Popover'
import type { NotebookEditorJson } from '@/data/notebook'
import { editorJsonToPlainText, notebookEmbeddedMediaCount, notebookWordCount, plainTextToEditorJson } from '@/data/notebook'
import { usePersistentState } from '@/lib/usePersistentState'
import type { Updater } from '@/lib/stateStore'
import { cn } from '@/lib/cn'
import { NoteRibbon } from './NoteRibbon'

interface NoteEditorChange {
  editorJson: NotebookEditorJson
  plainText: string
}

interface NoteEditorProps {
  editorJson: NotebookEditorJson
  onChange: (next: NoteEditorChange) => void
  placeholder?: string
  onPaste?: React.ClipboardEventHandler<HTMLDivElement>
  /** Media the note carries outside the body (a pasted attachment) — folded into the status bar's media count. */
  attachedMediaCount?: number
  /** This note's 1-based position among the student's notes, for "Page X of Y". */
  notePosition?: { index: number; total: number }
  focusMode?: boolean
  onToggleFocus?: () => void
}

const ZOOM_LEVELS = [75, 90, 100, 110, 125, 150, 175, 200] as const
const ZOOM_MIN = 50
const ZOOM_MAX = 200
const BASE_FONT_PX = 15

/**
 * Registered in both this editor and the read-only `NotePreview` below, so a
 * heading, quote, checklist or horizontal line saved by one renders
 * correctly everywhere the note is shown.
 */
const NOTE_NODES = [ListNode, ListItemNode, HeadingNode, QuoteNode, HorizontalRuleNode]

const theme = {
  paragraph: 'mb-2',
  heading: {
    h1: 'mb-3 mt-1 font-serif text-[1.7em] font-semibold tracking-[-0.01em] text-ink',
    h2: 'mb-2.5 mt-1 font-serif text-[1.42em] font-semibold tracking-[-0.01em] text-ink',
    h3: 'mb-2 mt-1 font-serif text-[1.22em] font-semibold text-ink',
    h4: 'mb-2 mt-1 font-serif text-[1.08em] font-semibold text-ink',
  },
  quote: 'mb-2 border-s-[3px] border-primary-line ps-3 italic text-ink-2',
  hr: 'my-4 border-0 border-t border-line-2',
  list: {
    nested: { listitem: 'list-none' },
    ol: 'ms-5 list-decimal space-y-1',
    ul: 'ms-5 list-disc space-y-1',
    listitem: 'ps-1',
    checklist: 'ms-5 list-none space-y-1.5',
    listitemUnchecked:
      'relative cursor-pointer ps-7 before:absolute before:start-0 before:top-[0.15em] before:size-[1.15em] before:rounded-[0.3em] before:border-[1.5px] before:border-line-2 before:bg-surface before:transition-colors',
    listitemChecked:
      'relative cursor-pointer ps-7 text-ink-3 line-through decoration-ink-3/50 before:absolute before:start-0 before:top-[0.15em] before:size-[1.15em] before:rounded-[0.3em] before:border-[1.5px] before:border-primary before:bg-primary after:absolute after:start-[0.32em] after:top-[0.32em] after:h-[0.5em] after:w-[0.28em] after:rotate-45 after:border-b-2 after:border-r-2 after:border-on-primary',
  },
  text: {
    bold: 'font-semibold',
    italic: 'italic',
    strikethrough: 'line-through',
    underline: 'underline underline-offset-[3px] decoration-[1.5px]',
    underlineStrikethrough: 'underline line-through underline-offset-[3px] decoration-[1.5px]',
    subscript: 'align-sub text-[0.75em]',
    superscript: 'align-super text-[0.75em]',
  },
  hrSelected: 'outline outline-2 outline-primary/60 outline-offset-2 rounded-sm',
}

export function NoteEditor({
  editorJson,
  onChange,
  onPaste,
  placeholder,
  attachedMediaCount = 0,
  notePosition,
  focusMode,
  onToggleFocus,
}: NoteEditorProps) {
  const initialState = useMemo(() => JSON.stringify(normaliseForLexical(editorJson)), [editorJson])
  const locallyEmittedStates = useRef(new Set<string>())
  const [zoom, setZoom] = usePersistentState<number>('synapse.notebook.zoom', 100)

  const wordCount = useMemo(() => notebookWordCount(editorJsonToPlainText(editorJson)), [editorJson])
  const mediaCount = useMemo(
    () => notebookEmbeddedMediaCount(editorJson) + attachedMediaCount,
    [editorJson, attachedMediaCount],
  )

  return (
    <LexicalComposer
      initialConfig={{
        namespace: 'SynapseNoteEditor',
        editorState: initialState,
        nodes: NOTE_NODES,
        theme,
        onError(error) {
          throw error
        },
      }}
    >
      <div className="rounded-xl border border-line bg-surface shadow-soft">
        <NoteRibbon />
        <div
          className="relative min-h-[42vh] px-4 py-3 sm:px-5 sm:py-4"
          style={{ fontSize: `${Math.round((BASE_FONT_PX * zoom) / 100)}px` }}
        >
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                onPaste={onPaste}
                aria-label="Note body"
                aria-placeholder={placeholder ?? 'Start writing…'}
                placeholder={<p className="pointer-events-none absolute left-5 top-4 text-[0.93em] text-ink-3">{placeholder ?? 'Start writing…'}</p>}
                className="min-h-[38vh] outline-none prose-headings:font-serif leading-[1.75] text-ink/90 focus-visible:ring-0"
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <NoteStatusBar
          wordCount={wordCount}
          mediaCount={mediaCount}
          notePosition={notePosition}
          zoom={zoom}
          onZoomChange={setZoom}
          focusMode={focusMode}
          onToggleFocus={onToggleFocus}
        />
      </div>
      <HistoryPlugin />
      <ListPlugin />
      <CheckListPlugin />
      <HorizontalRulePlugin />
      <LoadEditorStatePlugin editorJson={editorJson} locallyEmittedStates={locallyEmittedStates.current} />
      <OnChangePlugin
        ignoreSelectionChange
        onChange={(state) => {
          let plainText = ''
          const nextEditorJson = state.toJSON() as NotebookEditorJson
          state.read(() => {
            plainText = $getRoot().getTextContent()
          })
          rememberLocallyEmittedState(locallyEmittedStates.current, JSON.stringify(normaliseForLexical(nextEditorJson)))
          onChange({ editorJson: nextEditorJson, plainText })
        }}
      />
    </LexicalComposer>
  )
}

/**
 * The status bar under the editing area: page position, word and media
 * counts on the left; distraction-free Focus and Zoom on the right — the
 * corner of a word processor a student actually glances at while writing.
 */
function NoteStatusBar({
  wordCount,
  mediaCount,
  notePosition,
  zoom,
  onZoomChange,
  focusMode,
  onToggleFocus,
}: {
  wordCount: number
  mediaCount: number
  notePosition?: { index: number; total: number }
  zoom: number
  onZoomChange: (next: Updater<number>) => void
  focusMode?: boolean
  onToggleFocus?: () => void
}) {
  const page = notePosition ?? { index: 1, total: 1 }
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-4 py-1.5 text-[11.5px] text-ink-3 sm:px-5">
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="tnum inline-flex items-center gap-1.5">
          <Icon icon={FileText} size={13} />
          Page {page.index} of {page.total}
        </span>
        <span aria-hidden className="text-ink-3/50">·</span>
        <span className="tnum inline-flex items-center gap-1.5">
          <Icon icon={WordsIcon} size={13} />
          {wordCount} {wordCount === 1 ? 'word' : 'words'}
        </span>
        <span aria-hidden className="text-ink-3/50">·</span>
        <span className="tnum inline-flex items-center gap-1.5">
          <Icon icon={ImageIcon} size={13} />
          {mediaCount} media
        </span>
      </div>
      <div className="flex items-center gap-1">
        {onToggleFocus && (
          <IconButton
            icon={FocusIcon}
            label={focusMode ? 'Exit focus mode' : 'Focus mode'}
            size="sm"
            active={focusMode}
            onClick={onToggleFocus}
          />
        )}
        <ZoomControl zoom={zoom} onChange={onZoomChange} />
      </div>
    </div>
  )
}

function ZoomControl({ zoom, onChange }: { zoom: number; onChange: (next: Updater<number>) => void }) {
  const { anchor, setAnchor, open, setOpen, close } = usePopoverTrigger()
  const step = (delta: number) => onChange((current) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, current + delta)))

  return (
    <div className="flex items-center gap-0.5">
      <IconButton icon={Minus} label="Zoom out" size="sm" onClick={() => step(-10)} disabled={zoom <= ZOOM_MIN} className="disabled:pointer-events-none disabled:opacity-40" />
      <button
        type="button"
        ref={setAnchor}
        onClick={() => setOpen(true)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Zoom level"
        className="tnum grid h-11 min-w-[3.25rem] shrink-0 place-items-center rounded-lg px-1 text-[11.5px] font-medium text-ink-2 transition-colors hover:bg-inset hover:text-ink sm:h-8"
      >
        {zoom}%
      </button>
      <IconButton icon={Plus} label="Zoom in" size="sm" onClick={() => step(10)} disabled={zoom >= ZOOM_MAX} className="disabled:pointer-events-none disabled:opacity-40" />
      {open && (
        <Popover anchor={anchor} onClose={close} role="menu" label="Zoom" className="min-w-[7rem] py-1">
          {ZOOM_LEVELS.map((level) => (
            <button
              key={level}
              type="button"
              role="menuitemradio"
              aria-checked={zoom === level}
              onClick={() => { close(); onChange(level) }}
              className={cn(
                'flex w-full items-center justify-between px-3 py-1.5 text-start text-[12.5px] transition-colors hover:bg-inset',
                zoom === level ? 'text-primary-strong' : 'text-ink-2',
              )}
            >
              {level}%
            </button>
          ))}
        </Popover>
      )}
    </div>
  )
}

function rememberLocallyEmittedState(states: Set<string>, serialised: string) {
  states.add(serialised)
  if (states.size <= 32) return
  const oldest = states.values().next().value
  if (oldest) states.delete(oldest)
}

function LoadEditorStatePlugin({ editorJson, locallyEmittedStates }: { editorJson: NotebookEditorJson; locallyEmittedStates: Set<string> }) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    const serialised = JSON.stringify(normaliseForLexical(editorJson))
    // Parent persistence can echo an earlier keystroke after the student has
    // already typed another one. Treat every recent local state as an
    // acknowledgement, never as an external document revision.
    if (locallyEmittedStates.delete(serialised)) return
    // OnChange immediately echoes the current editor JSON through the note
    // store. Re-applying that identical state resets Lexical's selection and
    // makes the editor appear to lose focus after every character. Only load a
    // state when it is genuinely external (note switch, capture append, or a
    // shared revision).
    const current = JSON.stringify(normaliseForLexical(
      editor.getEditorState().toJSON() as NotebookEditorJson,
    ))
    if (serialised === current) return
    try {
      const nextState = editor.parseEditorState(serialised) as EditorState
      editor.setEditorState(nextState)
    } catch {
      const fallback = editorJsonToPlainText(editorJson)
      editor.update(() => {
        const root = $getRoot()
        root.clear()
        const paragraph = $createParagraphNode()
        paragraph.append($createTextNode(fallback))
        root.append(paragraph)
      })
    }
  }, [editor, editorJson, locallyEmittedStates])

  return null
}

function normaliseForLexical(editorJson: NotebookEditorJson): NotebookEditorJson {
  try {
    // Every genuine Lexical block node carries an array `children` — except
    // the childless decorator nodes (a horizontal rule is the only one this
    // editor creates), which are recognised by type instead. A legacy
    // worker-era block has neither, which is what actually distinguishes it.
    if (editorJson?.root?.children?.every((child) => Array.isArray(child.children) || child.type === 'horizontalrule')) {
      return editorJson
    }
  } catch {
    // Fall through to the text-only state. The legacy markdown source remains
    // stored on the note, so this is a safe display/editing fallback.
  }
  return plainTextToEditorJson(editorJsonToPlainText(editorJson))
}

export function NotePreview({ source, editorJson }: { source?: string; editorJson?: NotebookEditorJson }) {
  const state = editorJson ?? plainTextToEditorJson(source ?? '')
  const initialState = useMemo(() => JSON.stringify(normaliseForLexical(state)), [state])
  if (!source?.trim() && !editorJson) return <p className="text-[13px] text-ink-3">No content yet.</p>
  return (
    <LexicalComposer
      initialConfig={{
        namespace: 'SynapseNoteReader',
        editable: false,
        editorState: initialState,
        nodes: NOTE_NODES,
        theme,
        onError(error) { throw error },
      }}
    >
      <RichTextPlugin
        contentEditable={<ContentEditable aria-readonly="true" className="outline-none text-[15px] leading-[1.75] text-ink/90" />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <ListPlugin />
    </LexicalComposer>
  )
}
