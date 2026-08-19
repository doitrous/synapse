import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  Bold, Clipboard, ClipboardPaste, Code, Copy, Heading1, Heading2, Italic, Info, List, ListOrdered,
  Quote, Scissors, SquareSplitHorizontal,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { RichText } from '@/components/ui/RichText'
import { continueList, parseNoteBlocks, toggleLinePrefix, toggleWrap, type NoteBlock } from '@/lib/markdownBlocks'
import { registerContextScope } from '@/lib/contextMenuScopes'
import { useLocalPreference } from '@/lib/useLocalPreference'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

/**
 * Writing and reading a note.
 *
 * The body is a plain markdown string in a single `<textarea>`, and everything
 * that makes typing feel like typing — the caret, IME composition, undo,
 * spellcheck, selection, right-to-left layout — is the browser's.
 *
 * It used to be a stack of one textarea per markdown block, with the active
 * block spliced back into the string by character offset. Every keystroke
 * re-split the whole note, and the active block was tracked by *index* into
 * that split. Any edit that changed the number of blocks — pressing Enter at
 * the end of a paragraph was enough — shifted the indices under the caret: the
 * textarea's contents changed out from under the cursor, focus jumped, and the
 * next characters typed landed in a different block from the one being written
 * in. That is the "it deselects itself and words appear on the wrong line" this
 * replaces. The string cannot get out of step with itself, so there is nothing
 * left to get out of step.
 *
 * What that model was for — seeing formatting while writing — is kept as a live
 * preview beside the text on a wide screen, and as the Read toggle everywhere.
 */

interface Action {
  id: string
  icon: LucideIcon
  label: string
  shortcut?: string
  apply: (value: string, start: number, end: number) => { value: string; start: number; end: number }
}

const ACTIONS: Action[] = [
  { id: 'bold', icon: Bold, label: 'Bold', shortcut: '⌘B', apply: (v, s, e) => toggleWrap(v, s, e, '**') },
  { id: 'italic', icon: Italic, label: 'Italic', shortcut: '⌘I', apply: (v, s, e) => toggleWrap(v, s, e, '*') },
  { id: 'code', icon: Code, label: 'Code', shortcut: '⌘E', apply: (v, s, e) => toggleWrap(v, s, e, '`') },
  { id: 'h1', icon: Heading1, label: 'Heading', shortcut: '⌘1', apply: (v, s, e) => toggleLinePrefix(v, s, e, '# ') },
  { id: 'h2', icon: Heading2, label: 'Subheading', shortcut: '⌘2', apply: (v, s, e) => toggleLinePrefix(v, s, e, '## ') },
  { id: 'bullet', icon: List, label: 'Bulleted list', apply: (v, s, e) => toggleLinePrefix(v, s, e, '- ') },
  { id: 'numbered', icon: ListOrdered, label: 'Numbered list', apply: (v, s, e) => toggleLinePrefix(v, s, e, '1. ') },
  { id: 'quote', icon: Quote, label: 'Quote', apply: (v, s, e) => toggleLinePrefix(v, s, e, '> ') },
  {
    id: 'callout',
    icon: Info,
    label: 'Callout',
    apply: (v, s) => {
      const lineStart = v.lastIndexOf('\n', s - 1) + 1
      const insert = '> [!warning] Where I could lose the mark\n> '
      return { value: v.slice(0, lineStart) + insert + v.slice(lineStart), start: lineStart + insert.length, end: lineStart + insert.length }
    },
  },
]

/** ⌘/Ctrl shortcuts, by the key that triggers them. */
const SHORTCUTS: Record<string, string> = { b: 'bold', i: 'italic', e: 'code', '1': 'h1', '2': 'h2' }

/** Tab inserts this rather than leaving the field, which is what a writer means by it. */
const INDENT = '  '

export function NoteEditor({
  value,
  onChange,
  preview,
  placeholder,
  onPaste,
}: {
  value: string
  onChange: (next: string) => void
  /** True when the note should be read rather than written. */
  preview: boolean
  placeholder?: string
  onPaste?: React.ClipboardEventHandler<HTMLTextAreaElement>
}) {
  const t = useT()
  const ref = useRef<HTMLTextAreaElement>(null)
  /** Where to put the caret once the new value has been rendered. */
  const pendingCaret = useRef<{ start: number; end: number } | null>(null)
  // A preference about how someone writes, not a property of any one note, and
  // deliberately per device: a laptop has room for two columns and a phone does
  // not. `useLocalPreference` keeps it out of the synced record.
  const [split, , toggleSplit] = useLocalPreference('synapse.notebook.split', true)
  const [showToast, setShowToast] = useState('')

  // Both have to happen before paint, or the field visibly jumps: the caret
  // would land, then the box would resize under it.
  useLayoutEffect(() => {
    const textarea = ref.current
    if (!textarea) return
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.max(textarea.scrollHeight, 320)}px`
    const caret = pendingCaret.current
    if (caret) {
      pendingCaret.current = null
      textarea.focus()
      textarea.setSelectionRange(caret.start, caret.end)
    }
  }, [value, preview, split])

  /**
   * Run a formatting action against the current selection.
   *
   * The whole note is the string, so there is no offset arithmetic and no way
   * for the result to land in a different block from the one selected.
   */
  const run = useCallback((action: Action) => {
    const textarea = ref.current
    if (!textarea) return
    const { selectionStart, selectionEnd } = textarea
    const next = action.apply(value, selectionStart, selectionEnd)
    pendingCaret.current = { start: next.start, end: next.end }
    onChange(next.value)
  }, [onChange, value])

  /** Replace the selection with `text`, leaving the caret after it. */
  const insert = useCallback((text: string) => {
    const textarea = ref.current
    if (!textarea) return
    const { selectionStart, selectionEnd } = textarea
    const caret = selectionStart + text.length
    pendingCaret.current = { start: caret, end: caret }
    onChange(value.slice(0, selectionStart) + text + value.slice(selectionEnd))
  }, [onChange, value])

  const selectedText = useCallback(() => {
    const textarea = ref.current
    if (!textarea) return ''
    return value.slice(textarea.selectionStart, textarea.selectionEnd)
  }, [value])

  const cutSelection = useCallback(async () => {
    const textarea = ref.current
    if (!textarea) return
    const { selectionStart, selectionEnd } = textarea
    if (selectionStart === selectionEnd) return
    await navigator.clipboard?.writeText(value.slice(selectionStart, selectionEnd)).catch(() => undefined)
    pendingCaret.current = { start: selectionStart, end: selectionStart }
    onChange(value.slice(0, selectionStart) + value.slice(selectionEnd))
  }, [onChange, value])

  const pasteHere = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) insert(text)
    } catch {
      // Firefox refuses `readText` outright, and any browser will refuse it
      // without permission. Saying so beats a menu item that does nothing.
      setShowToast(t('Your browser will not let a page read the clipboard. Use ⌘V or Ctrl+V.'))
      window.setTimeout(() => setShowToast(''), 4000)
    }
  }, [insert, t])

  /**
   * The formatting menu, on right-click inside the note.
   *
   * The shell's context menu leaves real form controls to the browser, which is
   * the right default — replacing a textarea's menu costs spellcheck and undo
   * for nothing. A note body is the exception: the actions a writer wants there
   * are the ones in the toolbar above, and reaching for them should not mean
   * travelling to the top of the page.
   */
  useEffect(() => {
    if (preview) return
    return registerContextScope('note-body', ({ selection }) => {
      const has = Boolean(selection || selectedText())
      return [
        { id: 'cut', label: t('Cut'), icon: Scissors, disabled: !has, onSelect: () => { void cutSelection() } },
        { id: 'copy', label: t('Copy'), icon: Copy, disabled: !has, onSelect: () => { void navigator.clipboard?.writeText(selectedText()).catch(() => undefined) } },
        { id: 'paste', label: t('Paste'), icon: ClipboardPaste, onSelect: () => { void pasteHere() } },
        ...ACTIONS.map((action, index) => ({
          id: action.id,
          label: t(action.label),
          icon: action.icon,
          separated: index === 0,
          onSelect: () => run(action),
        })),
        {
          id: 'copy-all',
          label: t('Copy the whole note'),
          icon: Clipboard,
          separated: true,
          onSelect: () => { void navigator.clipboard?.writeText(value).catch(() => undefined) },
        },
      ]
    })
    // `selectedText`, `cutSelection`, `pasteHere` and `run` all close over the
    // current value, and the menu is built at click time from the registered
    // builder — so the builder has to be re-registered whenever they change.
  }, [preview, t, run, cutSelection, pasteHere, selectedText, value])

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    const textarea = event.currentTarget

    if (event.metaKey || event.ctrlKey) {
      const id = SHORTCUTS[event.key.toLowerCase()]
      if (id) {
        event.preventDefault()
        const action = ACTIONS.find((item) => item.id === id)
        if (action) run(action)
      }
      return
    }

    // A list carries on by itself, and an empty item ends it — the one piece of
    // behaviour worth intercepting, because typing "- " on every line is not
    // writing.
    if (event.key === 'Enter' && !event.shiftKey) {
      const next = continueList(value, textarea.selectionStart)
      if (next) {
        event.preventDefault()
        pendingCaret.current = { start: next.caret, end: next.caret }
        onChange(next.value)
      }
      return
    }

    // Tab indents rather than leaving the note. Shift-Tab still moves focus, so
    // the field is never a keyboard trap.
    if (event.key === 'Tab' && !event.shiftKey) {
      event.preventDefault()
      insert(INDENT)
    }
  }

  if (preview) return <NotePreview source={value} />

  return (
    <div data-context-scope="note-body">
      <div className="sticky top-0 z-10 -mx-1 mb-2 flex flex-wrap items-center gap-0.5 border-b border-line bg-paper/95 px-1 pb-2 backdrop-blur-sm">
        {ACTIONS.map((action) => (
          <button
            key={action.id}
            type="button"
            // Keeps focus in the textarea, so the selection the action needs
            // still exists by the time it runs.
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => run(action)}
            title={action.shortcut ? `${t(action.label)} · ${action.shortcut}` : t(action.label)}
            aria-label={t(action.label)}
            className="grid size-9 place-items-center rounded-md text-ink-2 transition-colors hover:bg-inset hover:text-ink sm:size-8"
          >
            <Icon icon={action.icon} size={15} />
          </button>
        ))}
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={toggleSplit}
          aria-pressed={split}
          title={t('Show formatted preview beside what you write')}
          aria-label={t('Show formatted preview beside what you write')}
          className={cn(
            'ms-auto hidden size-8 place-items-center rounded-md transition-colors lg:grid',
            split ? 'bg-primary-tint text-primary-strong' : 'text-ink-2 hover:bg-inset hover:text-ink',
          )}
        >
          <Icon icon={SquareSplitHorizontal} size={15} />
        </button>
      </div>

      {showToast && <p role="status" className="mb-2 rounded-lg border border-line bg-surface-2 px-3 py-2 text-[12px] text-ink-2">{showToast}</p>}

      <div className={cn('grid gap-5', split && 'lg:grid-cols-2')}>
        <textarea
          ref={ref}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          placeholder={placeholder}
          spellCheck
          dir="auto"
          aria-label={t('Note body')}
          className="block min-h-[55vh] w-full resize-none overflow-hidden rounded-lg bg-transparent font-sans text-[15px] leading-[1.7] text-ink/90 outline-none placeholder:text-ink-3"
        />

        {/* The formatting, live, without the caret ever leaving the text. */}
        {split && (
          <div className="hidden border-s border-line ps-5 lg:block" aria-hidden>
            {value.trim()
              ? <NotePreview source={value} />
              : <p className="text-[13px] text-ink-3">{t('Formatting appears here as you write.')}</p>}
          </div>
        )}
      </div>
    </div>
  )
}

const CALLOUT_STYLE = {
  note: 'border-primary-line bg-primary-tint/35',
  warning: 'border-warning/30 bg-warning-tint/45',
  success: 'border-success/30 bg-success-tint/45',
} as const

/** The note as it reads once written. */
export function NotePreview({ source }: { source: string }) {
  const blocks = parseNoteBlocks(source)
  if (!blocks.length) return null
  return <div className="space-y-3 text-[15px] leading-[1.7] text-ink/90">{blocks.map((block, index) => <Block key={index} block={block} />)}</div>
}

function Block({ block }: { block: NoteBlock }) {
  switch (block.kind) {
    case 'heading': {
      const size = block.level === 1 ? 'text-[22px]' : block.level === 2 ? 'text-[18px]' : 'text-[16px]'
      return <h3 className={cn('font-serif font-semibold text-ink', size, block.level === 1 ? 'mt-5' : 'mt-4')}><RichText text={block.text} /></h3>
    }
    case 'paragraph':
      return <p><RichText text={block.text} /></p>
    case 'list':
      return block.ordered
        ? <ol className="ms-5 list-decimal space-y-1">{block.items.map((item, index) => <li key={index}><RichText text={item} /></li>)}</ol>
        : <ul className="ms-5 list-disc space-y-1">{block.items.map((item, index) => <li key={index}><RichText text={item} /></li>)}</ul>
    case 'quote':
      return <blockquote className="border-s-2 border-line-2 ps-3 text-ink-2">{block.lines.map((line, index) => <p key={index}><RichText text={line} /></p>)}</blockquote>
    case 'callout':
      return (
        <aside className={cn('rounded-xl border px-4 py-3', CALLOUT_STYLE[block.tone])}>
          {block.title && <p className="mb-1 text-[13px] font-semibold text-ink">{block.title}</p>}
          <div className="space-y-1 text-[14px] leading-relaxed text-ink-2">
            {block.lines.filter((line) => line.trim()).map((line, index) => <p key={index}><RichText text={line} /></p>)}
          </div>
        </aside>
      )
    case 'code':
      return <pre className="overflow-x-auto rounded-lg border border-line bg-inset px-3 py-2 font-mono text-[12.5px] text-ink"><code>{block.lines.join('\n')}</code></pre>
    case 'divider':
      return <hr className="border-line" />
  }
}
