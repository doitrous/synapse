import { useEffect, useMemo, useRef } from 'react'
import { Bold, Italic, List, ListOrdered, Redo2, Strikethrough, Undo2 } from 'lucide-react'
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  type EditorState,
} from 'lexical'
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, ListItemNode, ListNode } from '@lexical/list'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { Icon } from '@/components/ui/Icon'
import type { NotebookEditorJson } from '@/data/notebook'
import { editorJsonToPlainText, plainTextToEditorJson } from '@/data/notebook'
import { cn } from '@/lib/cn'

interface NoteEditorChange {
  editorJson: NotebookEditorJson
  plainText: string
}

interface NoteEditorProps {
  editorJson: NotebookEditorJson
  onChange: (next: NoteEditorChange) => void
  placeholder?: string
  onPaste?: React.ClipboardEventHandler<HTMLDivElement>
}

const theme = {
  paragraph: 'mb-2',
  list: {
    nested: { listitem: 'list-none' },
    ol: 'ms-5 list-decimal space-y-1',
    ul: 'ms-5 list-disc space-y-1',
    listitem: 'ps-1',
  },
  text: {
    bold: 'font-semibold',
    italic: 'italic',
    strikethrough: 'line-through',
  },
}

export function NoteEditor({ editorJson, onChange, onPaste, placeholder }: NoteEditorProps) {
  const initialState = useMemo(() => JSON.stringify(normaliseForLexical(editorJson)), [editorJson])

  return (
    <LexicalComposer
      initialConfig={{
        namespace: 'SynapseNoteEditor',
        editorState: initialState,
        nodes: [ListNode, ListItemNode],
        theme,
        onError(error) {
          throw error
        },
      }}
    >
      <div className="rounded-xl border border-line bg-surface shadow-soft">
        <Toolbar />
        <div className="relative min-h-[46vh] px-4 py-3 sm:px-5 sm:py-4">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                onPaste={onPaste}
                aria-label="Note body"
                aria-placeholder={placeholder ?? 'Start writing…'}
                placeholder={<p className="pointer-events-none absolute left-5 top-4 text-[14px] text-ink-3">{placeholder ?? 'Start writing…'}</p>}
                className="min-h-[42vh] outline-none prose-headings:font-serif text-[15px] leading-[1.75] text-ink/90 focus-visible:ring-0"
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
      </div>
      <HistoryPlugin />
      <ListPlugin />
      <LoadEditorStatePlugin editorJson={editorJson} />
      <OnChangePlugin
        ignoreSelectionChange
        onChange={(state) => {
          let plainText = ''
          state.read(() => {
            plainText = $getRoot().getTextContent()
          })
          onChange({ editorJson: state.toJSON() as NotebookEditorJson, plainText })
        }}
      />
    </LexicalComposer>
  )
}

function Toolbar() {
  const [editor] = useLexicalComposerContext()
  const buttonClass = 'grid size-10 place-items-center rounded-lg text-ink-2 transition-colors hover:bg-inset hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:size-8'

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-line px-2 py-2" aria-label="Note formatting">
      <ToolbarButton label="Bold" className={buttonClass} onPress={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')} icon={Bold} />
      <ToolbarButton label="Italic" className={buttonClass} onPress={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')} icon={Italic} />
      <ToolbarButton label="Strike through" className={buttonClass} onPress={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')} icon={Strikethrough} />
      <span className="mx-1 h-5 w-px bg-line" aria-hidden />
      <ToolbarButton label="Bulleted list" className={buttonClass} onPress={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)} icon={List} />
      <ToolbarButton label="Numbered list" className={buttonClass} onPress={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)} icon={ListOrdered} />
      <span className="mx-1 h-5 w-px bg-line" aria-hidden />
      <ToolbarButton label="Undo" className={buttonClass} onPress={() => editor.dispatchCommand(UNDO_COMMAND, undefined)} icon={Undo2} />
      <ToolbarButton label="Redo" className={buttonClass} onPress={() => editor.dispatchCommand(REDO_COMMAND, undefined)} icon={Redo2} />
    </div>
  )
}

function ToolbarButton({
  label,
  icon,
  className,
  onPress,
}: {
  label: string
  icon: typeof Bold
  className: string
  onPress: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(className)}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onPress}
    >
      <Icon icon={icon} size={15} />
    </button>
  )
}

function LoadEditorStatePlugin({ editorJson }: { editorJson: NotebookEditorJson }) {
  const [editor] = useLexicalComposerContext()
  const lastApplied = useRef('')

  useEffect(() => {
    const serialised = JSON.stringify(normaliseForLexical(editorJson))
    if (serialised === lastApplied.current) return
    try {
      const nextState = editor.parseEditorState(serialised) as EditorState
      editor.setEditorState(nextState)
      lastApplied.current = serialised
    } catch {
      const fallback = editorJsonToPlainText(editorJson)
      editor.update(() => {
        const root = $getRoot()
        root.clear()
        const paragraph = $createParagraphNode()
        paragraph.append($createTextNode(fallback))
        root.append(paragraph)
      })
      lastApplied.current = JSON.stringify(plainTextToEditorJson(fallback))
    }
  }, [editor, editorJson])

  return null
}

function normaliseForLexical(editorJson: NotebookEditorJson): NotebookEditorJson {
  try {
    if (editorJson?.root?.children?.every((child) => Array.isArray(child.children))) return editorJson
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
        nodes: [ListNode, ListItemNode],
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
