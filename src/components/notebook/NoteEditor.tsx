import { useCallback, useRef } from 'react'
import { Bold, Code, Heading1, Heading2, Italic, Info, List, ListOrdered, Quote } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { RichText } from '@/components/ui/RichText'
import { continueList, parseNoteBlocks, toggleLinePrefix, toggleWrap, type NoteBlock } from '@/lib/markdownBlocks'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

/**
 * Writing and reading a note.
 *
 * The body stays a plain string — the same field it has always been, so nothing
 * needs migrating and an old note opens as exactly what it was. Formatting is
 * markdown over the top: the toolbar and shortcuts insert the markers, and the
 * preview renders them.
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

  const run = useCallback((action: Action) => {
    const textarea = ref.current
    if (!textarea) return
    const { selectionStart, selectionEnd } = textarea
    const next = action.apply(value, selectionStart, selectionEnd)
    onChange(next.value)
    // Restore the selection after React has written the new value, so the
    // caret stays where the writer expects rather than jumping to the end.
    requestAnimationFrame(() => {
      textarea.focus()
      textarea.setSelectionRange(next.start, next.end)
    })
  }, [onChange, value])

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.metaKey || event.ctrlKey) {
      const id = SHORTCUTS[event.key.toLowerCase()]
      if (id) {
        event.preventDefault()
        const action = ACTIONS.find((item) => item.id === id)
        if (action) run(action)
      }
      return
    }
    if (event.key === 'Enter') {
      const textarea = event.currentTarget
      const next = continueList(value, textarea.selectionStart)
      if (!next) return
      event.preventDefault()
      onChange(next.value)
      requestAnimationFrame(() => {
        textarea.focus()
        textarea.setSelectionRange(next.caret, next.caret)
      })
    }
  }

  if (preview) return <NotePreview source={value} />

  return (
    <div>
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
      </div>
      <textarea
        ref={ref}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        placeholder={placeholder}
        className="min-h-[55vh] w-full resize-none bg-transparent font-sans text-[15px] leading-[1.7] text-ink/90 outline-none placeholder:text-ink-3"
      />
    </div>
  )
}

const CALLOUT_STYLE = {
  note: 'border-accent-line bg-accent-tint/35',
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
