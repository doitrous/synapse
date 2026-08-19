import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Bold, Code, Heading1, Heading2, Italic, Info, List, ListOrdered, Quote } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { RichText } from '@/components/ui/RichText'
import { continueList, parseNoteBlocks, toggleLinePrefix, toggleWrap, type NoteBlock } from '@/lib/markdownBlocks'
import { appendBlock, replaceSegment, splitNote, type NoteSegment } from '@/lib/noteSegments'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

/**
 * Writing and reading a note, in the same place.
 *
 * The body stays a plain string — the same field it has always been, so nothing
 * needs migrating and an old note opens as exactly what it was. What changed is
 * that formatting is no longer something you only see afterwards: every block
 * renders as it will read, and the one block the caret is in shows its markdown
 * so the markers are there exactly when there is a reason to touch them.
 *
 * That is deliberately not a `contentEditable` surface. Editing one block's
 * substring in a real `<textarea>` keeps the caret, IME, undo, spellcheck,
 * selection and right-to-left layout native — all the things a rich-text
 * surface has to reimplement and usually gets subtly wrong. The string stays
 * the truth; see `noteSegments` for the offset arithmetic that splices an edit
 * back, and its tiling test for why the splice cannot lose text.
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
  const segments = splitNote(value)
  /** The block being written, by index into `segments`. */
  const [active, setActive] = useState<number>(() => Math.max(0, segments.length - 1))
  /** Where to put the caret once the open block's textarea exists. */
  const pendingCaret = useRef<{ start: number; end: number } | null>(null)

  const segment: NoteSegment | undefined = segments[active]

  const openBlock = useCallback((index: number, caret?: { start: number; end: number }) => {
    setActive(index)
    pendingCaret.current = caret ?? null
  }, [])

  // Sizing and caret placement both have to happen before the browser paints,
  // or the block visibly jumps as it opens.
  useLayoutEffect(() => {
    const textarea = ref.current
    if (!textarea) return
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
    const caret = pendingCaret.current
    if (caret) {
      pendingCaret.current = null
      textarea.focus()
      textarea.setSelectionRange(caret.start, caret.end)
    }
  }, [active, value])

  // A note swapped underneath the editor starts at its end, not wherever the
  // previous note's caret happened to be.
  useEffect(() => {
    setActive(Math.max(0, splitNote(value).length - 1))
    // Only when the editor is handed a different note.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview])

  /** Run a formatting action against the open block's own text. */
  const run = useCallback((action: Action) => {
    const textarea = ref.current
    if (!textarea || !segment) return
    const { selectionStart, selectionEnd } = textarea
    const next = action.apply(segment.text, selectionStart, selectionEnd)
    onChange(replaceSegment(value, segment, next.value))
    pendingCaret.current = { start: next.start, end: next.end }
  }, [onChange, segment, value])

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (!segment) return
    if (event.metaKey || event.ctrlKey) {
      const id = SHORTCUTS[event.key.toLowerCase()]
      if (id) {
        event.preventDefault()
        const action = ACTIONS.find((item) => item.id === id)
        if (action) run(action)
      }
      return
    }

    const textarea = event.currentTarget

    if (event.key === 'Enter' && !event.shiftKey) {
      const next = continueList(segment.text, textarea.selectionStart)
      if (next) {
        event.preventDefault()
        onChange(replaceSegment(value, segment, next.value))
        pendingCaret.current = { start: next.caret, end: next.caret }
        return
      }
      // Enter at the end of a block that is not a list closes it and opens the
      // next one — the reason blocks exist rather than one long field.
      if (textarea.selectionStart === segment.text.length && segment.text.trim()) {
        event.preventDefault()
        const spliced = replaceSegment(value, segment, `${segment.text}\n\n`)
        onChange(spliced)
        const after = splitNote(spliced)
        openBlock(Math.min(after.length - 1, active + 2), { start: 0, end: 0 })
      }
      return
    }

    // Backspace at the very start joins this block back onto the one above,
    // which is what deleting a block boundary has to mean.
    if (event.key === 'Backspace' && textarea.selectionStart === 0 && textarea.selectionEnd === 0 && active > 0) {
      event.preventDefault()
      const previous = segments[active - 1]
      const joined = value.slice(0, previous.start) + segment.text + value.slice(segment.end)
      onChange(joined)
      openBlock(active - 1, { start: 0, end: 0 })
      return
    }

    // Arrow keys step between blocks at their edges, so the note reads as one
    // document rather than a stack of separate fields.
    if (event.key === 'ArrowUp' && textarea.selectionStart === 0 && active > 0) {
      event.preventDefault()
      const target = previousWritable(segments, active)
      if (target !== null) openBlock(target, { start: segments[target].text.length, end: segments[target].text.length })
    }
    if (event.key === 'ArrowDown' && textarea.selectionEnd === segment.text.length && active < segments.length - 1) {
      event.preventDefault()
      const target = nextWritable(segments, active)
      if (target !== null) openBlock(target, { start: 0, end: 0 })
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

      <div className="min-h-[55vh] space-y-1 text-[15px] leading-[1.7] text-ink/90">
        {segments.map((entry, index) => {
          if (index === active) {
            return (
              <textarea
                key={`edit-${index}`}
                ref={ref}
                value={entry.text}
                onChange={(event) => onChange(replaceSegment(value, entry, event.target.value))}
                onKeyDown={onKeyDown}
                onPaste={onPaste}
                placeholder={index === 0 && segments.length === 1 ? placeholder : undefined}
                rows={1}
                dir="auto"
                className="block w-full resize-none overflow-hidden rounded-md bg-inset/40 px-2 py-1 font-sans text-[15px] leading-[1.7] text-ink/90 outline-none placeholder:text-ink-3"
              />
            )
          }
          if (entry.blank) {
            // A blank run is a real part of the note and has to be clickable, or
            // there is no way to put the caret between two blocks.
            return (
              <div
                key={`gap-${index}`}
                role="presentation"
                onClick={() => openBlock(index, { start: entry.text.length, end: entry.text.length })}
                className="h-3 cursor-text"
              />
            )
          }
          return (
            <div
              key={`read-${index}`}
              role="button"
              tabIndex={0}
              onClick={() => openBlock(index, caretFromClick(entry))}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  openBlock(index, { start: entry.text.length, end: entry.text.length })
                }
              }}
              aria-label={t('Edit this block')}
              className="cursor-text rounded-md px-2 py-1 transition-colors hover:bg-inset/40"
            >
              <NotePreview source={entry.text} />
            </div>
          )
        })}

        {/* Somewhere to click when the note ends in a rendered block. */}
        <div
          role="presentation"
          onClick={() => {
            const next = appendBlock(value, '')
            onChange(next.value)
            const after = splitNote(next.value)
            openBlock(after.length - 1, { start: 0, end: 0 })
          }}
          className="h-24 cursor-text"
        />
      </div>
    </div>
  )
}

/** Open a block with the caret at its end — where a click most often means. */
function caretFromClick(segment: NoteSegment): { start: number; end: number } {
  return { start: segment.text.length, end: segment.text.length }
}

function previousWritable(segments: readonly NoteSegment[], from: number): number | null {
  for (let index = from - 1; index >= 0; index--) if (!segments[index].blank) return index
  return null
}

function nextWritable(segments: readonly NoteSegment[], from: number): number | null {
  for (let index = from + 1; index < segments.length; index++) if (!segments[index].blank) return index
  return null
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
